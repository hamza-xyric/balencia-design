---
type: story
id: S15.6.1
title: Double-Tap Reflection Capture
epic: E15
epic_name: Document Intelligence, Reflection System & Virtual Try-On
feature: F15.6
feature_name: Double-Tap Reflection System
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S15.6.1: Double-Tap Reflection Capture

## User Story

**As a** Holistic Health Seeker (P1),
**I want to** quickly capture how I felt about something I just did — a workout, a meal, a conversation — with a couple of taps instead of writing a full journal entry,
**So that** SIA can learn what actually matters to me and coach around it.

---

## Story Type

- [x] Feature
- [ ] Enhancement
- [ ] Technical
- [ ] Integration

## Priority

- [x] Must Have (P0)
- [ ] Should Have (P1)
- [ ] Could Have (P2)
- [ ] Won't Have (P3)

---

## Scope Description

**No feature flag** — this feature ships live as part of core journaling, unlike the rest of this epic.

**Flexibility Modes:**

| Mode | Experience |
|------|------------|
| Light | Double-tap a card → pick importance (1-10) and an emotion before/after → done. No free text required. |
| Deep | Full reflection editor: free-text journal body, visibility control, explicit `feeds_ai` toggle (see S15.6.2). |

**Technical Foundation:**

- A reflection *is* a journal entry — a strict 1:1 companion row (`reflection_details`) adds structured fields without touching the core `journal_entries` schema.

**Table: `reflection_details`** (`server/src/database/tables/131-reflection-details.sql`):

| Column | Type | Notes |
|---|---|---|
| `journal_entry_id` | UUID **PK**, FK → journal_entries, `ON DELETE CASCADE` | the entry *is* the reflection |
| `user_id` | UUID FK → users, `ON DELETE CASCADE` | |
| `target_type` | enum: goal, workout, meal, finance, relationship, wellbeing, prayer, achievement, career, activity, journal | what the reflection is about |
| `target_id`, `target_label` | UUID / TEXT, nullable | polymorphic, no FK constraint on `target_id` by design |
| `importance` | SMALLINT, `CHECK (1-10)` | |
| `emotion_before`, `emotion_after` | VARCHAR(20), nullable | |
| `emotion_intensity_before`, `emotion_intensity_after` | SMALLINT, `CHECK (1-10)`, nullable | the emotion *delta* is the coachable signal |
| `source` | VARCHAR(20), default `'double_tap'` | |

Indexes: `(user_id, target_type, target_id, created_at DESC)`, `(user_id, created_at DESC)`.

**Client capture entry point:** `client/src/shared/services/reflectionCapture.ts`.

**A shipped, real production bug and its fix:** on 2026-07-01, commit `718d83bf fix(server): repair reflection_details FK cascade constraint` found that `CREATE TABLE IF NOT EXISTS reflection_details (... ON DELETE CASCADE)` **silently no-ops on environments where the table already existed pre-cascade** — any environment with the table created before the cascade clause kept a non-cascading foreign key. Deleting a journal entry in that state left an orphaned `reflection_details` row instead of cascading. The fix (`server/src/database/migrations/20260701000000_repair-reflection-details-cascade.sql`) is registered in `auto-migrate.ts`, purges pre-existing orphaned rows, dynamically drops/re-adds the FK with the correct cascade, and updated the integration-test schema helper so the regression can't silently reappear.

**Double-Tap Capture Flow (High-Level):**
```
1. User double-taps a card (workout/meal/goal/etc.) in the app
2. Client (reflectionCapture.ts) opens a lightweight prompt:
     importance (1-10), emotion_before -> emotion_after, optional intensity
3. On submit:
     a. Create journal_entries row (content_json includes an auto-inserted
        mention node targeting the source card, source: 'page_double_tap')
     b. Create reflection_details row:
          journal_entry_id = new entry id
          target_type/target_id/target_label = from the double-tapped card
          importance, emotion_before/after, emotion_intensity_before/after
          source = 'double_tap'
     c. journal_entry_mentions recomputed from content_json (S15.4.2 mechanism)
4. Reflection appears in: journal timeline, the source card (as a mention chip)
```

---

## Acceptance Criteria

```gherkin
Scenario: Light-mode double-tap capture
  Given a user double-taps a completed workout card
  When they select importance and emotion_before -> emotion_after and submit
  Then a journal_entries row and a 1:1 reflection_details row are created in a single flow, in <=3 taps

Scenario: Auto-inserted mention chip
  Given a user completes a double-tap reflection targeting a workout
  When the reflection is saved
  Then content_json includes a mention node with source "page_double_tap" targeting the workout, and it appears as a mention chip on the source card

Scenario: FK cascade deletes the reflection
  Given a journal entry has an attached reflection_details row
  When the journal entry is deleted
  Then the reflection_details row is deleted automatically via ON DELETE CASCADE (post 2026-07-01 fix), with no orphaned row remaining

Scenario: Importance out of range rejected
  Given a user attempts to set importance to 0 or 11
  When the value is submitted
  Then the database CHECK constraint (1-10) rejects the write

Scenario: Dangling target_id still renders
  Given a reflection's target_id references a goal that has since been deleted
  When the reflection is viewed
  Then it still displays using its captured target_label, even though the underlying entity no longer exists (polymorphic target, no FK constraint on target_id by design)
```

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Capture speed | Double-tap → saved reflection in ≤3 taps for the Light-mode path | UX flow instrumentation |
| Reflection completion rate | ≥50% of double-tap prompts result in a saved reflection (not abandoned) | Prompt-shown vs. prompt-completed ratio |
| Emotion-delta signal quality | ≥60% of reflections capture both `emotion_before` and `emotion_after` | Field completion rate |
| Data integrity | 0 orphaned `reflection_details` rows post-2026-07-01 fix | FK cascade regression test (in the integration suite) |

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Capture completes in ≤3 taps for the Light-mode path | `reflection_details.user_id` FK cascade on user deletion | Reflection is a journal entry — subject to the same journal privacy model | Emotion picker is keyboard/screen-reader navigable | Live, unflagged — no feature-flag dependency, unlike the rest of this epic |
| No dedicated idempotency guard on rapid double-submit (flagged gap below) | `importance` CHECK constraint enforced at the DB layer | `target_id` has no FK constraint (polymorphic by design) — dangling references are expected, not a data-integrity bug | | |

---

## Dependencies

- **Prerequisite Stories:** None (entry point for Track B); requires core journaling module (`journal_entries`) as a foundation
- **Related Stories:** S15.4.2 (`journal_entry_mentions` mechanism reused for `source = 'page_double_tap'`), S15.6.2 (taxonomy/visibility/coaching-signal fields layered on top)
- **External Dependencies:** Core journaling module

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| Journal entry deleted with an attached reflection | `ON DELETE CASCADE` on `reflection_details.journal_entry_id` | Reflection row deleted automatically (post-fix) | Silent — no orphaned data |
| User sets `importance` out of 1-10 range | DB `CHECK` constraint | Insert/update rejected at the DB layer | Validation error surfaced by the API before it reaches the DB in normal flow |
| `target_id` references a deleted entity (e.g. a deleted goal) | No FK constraint (polymorphic, by design) | Reflection persists with a dangling reference; `target_label` (denormalized at capture time) still renders | Reflection still displays with its captured label even if the underlying entity is gone |
| Double-tap fires twice rapidly (double-submit) | No explicit idempotency key on reflection capture | Two `journal_entries` (and two `reflection_details` rows) could be created | **Flagged as a gap** — no evidence of client-side debounce or server-side idempotency guard specific to double-tap capture |

---

## Open Questions

- No client-side debounce or server-side idempotency guard exists for rapid double-submit on the double-tap capture flow — should this be added before wider rollout, given it can create duplicate journal entries?

---

## Definition of Done

- [x] A reflection is a journal entry with an optional 1:1 `reflection_details` row — core journal schema is untouched
- [x] Double-tap capture flow supports importance, emotion before/after (with intensity), and a polymorphic target
- [x] FK cascade correctly deletes `reflection_details` when the parent journal entry is deleted (post 2026-07-01 fix, with a regression test)
- [x] Auto-inserted page mentions (`source = 'page_double_tap'`) link a reflection back to the thing it's about, reusing the S15.4.2 mention system
- [ ] Idempotency guard against rapid double-submit — not built, flagged gap

---

*Story S15.6.1 | Epic E15 | Product: Balencia Platform*
