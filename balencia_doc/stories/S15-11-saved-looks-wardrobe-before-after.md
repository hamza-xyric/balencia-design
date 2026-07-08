---
type: story
id: S15.7.2
title: Saved Looks, Wardrobe & Before/After Comparison
epic: E15
epic_name: Document Intelligence, Reflection System & Virtual Try-On
feature: F15.7
feature_name: Virtual Try-On / AI Fashion Studio
product: yhealth-platform
priority: P2
status: Done
created: 2026-07-08
---

# S15.7.2: Saved Looks, Wardrobe & Before/After Comparison

## User Story

**As a** Balencia user exploring the AI Fashion Studio,
**I want to** save the looks I like, browse them later in a wardrobe view, and compare the before/after even after I've closed the app and come back,
**So that** a good try-on result isn't lost the moment I navigate away.

---

## Story Type

- [ ] Feature
- [x] Enhancement
- [ ] Technical
- [ ] Integration

## Priority

- [ ] Must Have (P0)
- [ ] Should Have (P1)
- [x] Could Have (P2)
- [ ] Won't Have (P3)

---

## Scope Description

**Flexibility Modes:**

| Mode | Experience |
|------|------------|
| Light | Save or discard after generation. |
| Deep | Saved looks / wardrobe view, favorite toggle, before/after comparison slider persisted across sessions. |

**Technical Foundation:**

- **No dedicated "wardrobe" or "saved looks" table** — both are **views** over `virtual_try_on_sessions` filtered by `status = 'SAVED'` / a favorite flag, keeping the schema minimal. This is a deliberate architectural choice, not a shortcut: it avoids a duplicated data model for what is fundamentally a filtered read of session state.

**Routes (base `/v1/virtual-tryon`):**

| Method | Path | Notes |
|---|---|---|
| GET | `/sessions` | list (must precede `/sessions/:id` for route-matching correctness) |
| POST | `/sessions/:id/save` | promotes a session into "saved looks" |
| POST | `/sessions/:id/favorite` | toggle favorite |

**Before/after photo persistence** — commit `a57c5b02 feat(virtual-tryon): persist original photo for before/after comparison` (2026-06-24) is an explicit bug fix: the "before" half of a comparison previously relied on the client's local preview blob URL, which does not survive a page refresh. The fix signs and returns `person_storage_key` ("original person-photo storage key") alongside `generated_storage_key` on the saved-look row, so the before/after comparison is durable across sessions, not just the current browser tab.

**Save Flow (High-Level):**
```
POST /sessions/:id/save
     - status -> SAVED, saved_at set
     - Signs person_storage_key (original) + generated_storage_key ("after")
       for a durable before/after comparison
     - INSERT try_on_preference_signals (action: 'saved', garment_category, color_tags)
```

---

## Acceptance Criteria

```gherkin
Scenario: Save a session as a look
  Given a session has reached status READY
  When the user calls POST /sessions/:id/save
  Then status transitions to SAVED, saved_at is set, and a try_on_preference_signals row is inserted with action "saved"

Scenario: Wardrobe is a filtered view, not a duplicated table
  Given a user has multiple sessions with status SAVED
  When they open the wardrobe view
  Then the results are read directly from virtual_try_on_sessions filtered by status = 'SAVED', with no separate wardrobe table involved

Scenario: Favorite toggle
  Given a saved look exists
  When the user calls POST /sessions/:id/favorite
  Then the favorite flag on that session toggles, with no change to its SAVED status

Scenario: Before/after survives a page refresh
  Given a user saved a look before the 2026-06-24 fix landed
  When they refresh the page and reopen the saved look
  Then the "before" image renders from the signed person_storage_key, not a client-side blob URL that no longer exists

Scenario: Discard is also a preference signal
  Given a user discards a READY session instead of saving it
  When the discard action completes
  Then a try_on_preference_signals row is inserted with action "discarded" (feeding S15.7.3's saveRate calculation)
```

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Before/after retention | 100% of saved looks retain a working "before" image after a page refresh | Regression test against the 2026-06-24 fix |
| Save rate | Tracked as a genuine style signal, not a vanity metric | `try_on_preference_signals` saved/(saved+discarded) |

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| `GET /sessions` route ordering must precede `/sessions/:id` for correct route matching | Signed storage keys, not raw public URLs, for both person and generated images | Saved looks remain scoped to `user_id` — no cross-user wardrobe leakage | Before/after slider has a non-drag alternative (e.g. tap-to-toggle) for motor-accessibility | Wardrobe/saved-looks views require no schema migration beyond `virtual_try_on_sessions` (deliberately minimal data model) |

---

## Dependencies

- **Prerequisite Stories:** S15.7.1 (Photo Upload & Generation) — a session must reach `READY` before it can be saved
- **Related Stories:** S15.7.3 (AI Style Coach — consumes `try_on_preference_signals` produced by save/discard)
- **External Dependencies:** None beyond `virtual_try_on_sessions`/`try_on_preference_signals` tables and R2 signed URLs

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| Save called on a non-READY session | Status guard on `/sessions/:id/save` | Request rejected | Error indicating the look isn't ready to save yet |
| Before-photo storage key missing (pre-2026-06-24 saved look) | `person_storage_key` null on legacy rows | Before/after comparison falls back to unavailable state for legacy rows only | "Before" image not available for looks saved before this fix |
| Favorite toggled on a non-saved session | Status guard | Request rejected or no-op | Favorite is only meaningful on `SAVED` sessions |

---

## Open Questions

- Multi-garment outfit composition (top + bottom + accessory in one generation) is **not built** — current model is single garment per session. Confirm whether wardrobe/saved-looks UI should anticipate this as a future data-model change.

---

## Definition of Done

- [x] Saved looks and favorites are views over sessions, not a duplicated data model
- [x] Original ("before") photo persists durably, independent of client-side blob URLs (2026-06-24 fix)
- [x] Save and discard actions both produce `try_on_preference_signals` rows
- [ ] Multi-garment outfit composition — not built, single garment per session only

---

*Story S15.7.2 | Epic E15 | Product: Balencia Platform*
