---
type: story
id: S15.6.2
title: Reflection Taxonomy, Visibility & Coaching Signal
epic: E15
epic_name: Document Intelligence, Reflection System & Virtual Try-On
feature: F15.6
feature_name: Double-Tap Reflection System
product: yhealth-platform
priority: P1
status: Done
created: 2026-07-08
---

# S15.6.2: Reflection Taxonomy, Visibility & Coaching Signal

## User Story

**As a** Holistic Health Seeker (P1),
**I want to** tag a reflection with what motivated me, what purpose/values it touched, control who can see it, and decide whether it feeds my AI coach,
**So that** my reflections stay structured and private on my terms, while still giving SIA a real signal to coach around when I want it to.

---

## Story Type

- [x] Feature
- [ ] Enhancement
- [ ] Technical
- [ ] Integration

## Priority

- [ ] Must Have (P0)
- [x] Should Have (P1)
- [ ] Could Have (P2)
- [ ] Won't Have (P3)

---

## Scope Description

**Flexibility Modes:**

| Mode | Experience |
|------|------------|
| Light | Reflections default `feeds_ai = true`, `visibility = private` — no extra decisions required. |
| Deep | Full reflection editor: motivation/purpose/value taxonomy codes, visibility control (`private`/`coach`/`friends`), explicit `feeds_ai` toggle to exclude a reflection from coaching context. |

**Technical Foundation:**

- **Table: `reflection_details`** (continuation of S15.6.1's schema) — the fields this story covers:

| Column | Type | Notes |
|---|---|---|
| `motivation_code`, `purpose_code` | TEXT, nullable | taxonomy codes (`reflection-taxonomy.ts`) |
| `value_codes` | TEXT[], default `{}` | |
| `feeds_ai` | BOOLEAN, default `true` | user can exclude a reflection from AI coaching context |
| `visibility` | `private` \| `coach` \| `friends`, default `private` | |
| `promoted_memory_id` | UUID, nullable | link if a reflection gets promoted into durable memory |

Partial index `(user_id, importance DESC) WHERE feeds_ai` — optimized for "surface my most important recent reflections that are allowed to feed the coach."

- **Service layer** — `server/src/services/reflection/reflection-details.service.ts` (CRUD + coaching-context queries), `reflection-taxonomy.ts` (motivation/purpose/value code definitions, **mirrored client-side** in `client/lib/reflection-taxonomy.ts` — must stay in sync per project convention), `server/src/utils/reflection-intervention.ts` and `reflection-recap.ts` (surfacing logic for proactive nudges and periodic recaps).

---

## Acceptance Criteria

```gherkin
Scenario: feeds_ai toggle excludes a reflection from coaching context
  Given a user marks a reflection feeds_ai = false
  When the coaching-context assembler queries reflections for this user
  Then this reflection is excluded from the query results (the partial index WHERE feeds_ai filters it out)

Scenario: Visibility defaults to private
  Given a user captures a reflection without changing the visibility setting
  When the reflection is saved
  Then visibility defaults to "private"

Scenario: Taxonomy codes shared client/server
  Given reflection-taxonomy.ts defines a motivation_code value on the server
  When the client renders the taxonomy picker
  Then the same code set is available in client/lib/reflection-taxonomy.ts (mirrored, not independently defined)

Scenario: High-importance reflections surfaced for coaching
  Given a user has multiple reflections with feeds_ai = true
  When the coaching-context assembler queries "most important recent reflections"
  Then the partial index (user_id, importance DESC) WHERE feeds_ai returns them ordered by importance without a full table scan

Scenario: Reflection promoted into durable memory
  Given a reflection is selected for promotion
  When promoted_memory_id is set
  Then the reflection carries a durable link to the resulting memory record
```

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Coaching relevance | Reflections with `feeds_ai = true` and `importance ≥ 7` are referenced in coaching responses within 48h | Coaching-context query hit-rate (requires live coaching integration to measure) |
| Taxonomy sync integrity | 0 drift incidents between `server/.../reflection-taxonomy.ts` and `client/lib/reflection-taxonomy.ts` | Code review / shared-constant convention |
| Visibility control adoption | Tracked once flag-relevant UI is in front of users | `visibility` distribution across captured reflections |

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Partial index `(user_id, importance DESC) WHERE feeds_ai` keeps the coaching-context query index-backed, not a full scan | `visibility = friends` scoping enforced at the query layer, not just UI-hidden | `feeds_ai = false` is a hard exclusion from AI coaching context, not just a UI hint | Taxonomy picker (motivation/purpose/value codes) is keyboard navigable | `reflection-taxonomy.ts` must be mirrored, not diverged, between client and server per project convention |

---

## Dependencies

- **Prerequisite Stories:** S15.6.1 (Double-Tap Reflection Capture — this story's fields live on the same `reflection_details` row)
- **Related Stories:** AI Coach context assembly (consumes `feeds_ai`/`importance` — live end-to-end wiring into a coaching response is not independently verified by this epic)
- **External Dependencies:** `reflection-taxonomy.ts` (client + server mirror)

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| `motivation_code`/`purpose_code` left unset | Nullable columns | Reflection persists without taxonomy tagging; still coachable via importance/emotion fields | No error — taxonomy tagging is optional, not required |
| `feeds_ai` toggled off after a reflection previously fed coaching context | No retroactive purge from prior coaching turns' context (context is per-turn, not cached) | Future coaching turns respect the updated `feeds_ai = false`; past turns are unaffected | Silent — matches the per-turn context-assembly model |
| Client and server taxonomy files drift | No automated sync check identified | Client could offer a code the server taxonomy doesn't recognize, or vice versa | **Flagged as a gap** — no CI check confirmed to enforce mirror parity |

---

## Open Questions

- Is there (or should there be) an automated CI check enforcing that `server/.../reflection-taxonomy.ts` and `client/lib/reflection-taxonomy.ts` stay in sync, given the project convention explicitly calls out the risk of drift?
- Dashboard surface for reflection trends/patterns over time is **not built** — explicitly called out as remaining work in project delivery tracking. Confirm priority for a future sprint.
- Cross-session reflection "arcs" (tracking how `emotion_after` for the same `target_type` trends over weeks) is designed in the taxonomy but **not surfaced in any UI yet**. Confirm whether this belongs in this story's scope or a future one.

---

## Definition of Done

- [x] `feeds_ai` toggle lets a user exclude a specific reflection from AI coaching context
- [x] Visibility control (`private`/`coach`/`friends`) per reflection, defaulting to `private`
- [x] Motivation/purpose/value taxonomy codes are shared between client and server (`reflection-taxonomy.ts` mirrored)
- [x] Partial index supports index-backed "most important recent reflections" coaching-context queries
- [ ] Dashboard surface for reflection trends/patterns over time — not built, explicitly remaining work
- [ ] Cross-session reflection "arcs" UI — not built, designed in taxonomy only

---

*Story S15.6.2 | Epic E15 | Product: Balencia Platform*
