---
type: story
id: S12.6.2
title: Career Badges & Milestone Rewards
epic: E12
epic_name: Career Pillar & Execution OS
feature: F12.6
feature_name: Career Obstacle Plan + Resources
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S12.6.2: Career Badges & Milestone Rewards

## User Story

**As a** career-goal user hitting a meaningful milestone (first level complete, first portfolio piece, resume finalized),
**I want to** receive a recognizable badge tied to that achievement,
**So that** progress feels celebrated and visible, not just a silent database row update.

---

## Story Type

- [x] Feature
- [ ] Enhancement
- [ ] Technical
- [ ] Integration

## Priority

- [x] Must Have (P0)
- [ ] Should Have (P1)

---

## Scope Description

**User Experience:**
- Milestone badges (Career Starter, Resume Ready, Portfolio Builder, etc.) are awarded on level/goal completion events already emitted by F12.1/F12.2
- Badge unlock triggers a celebration moment (consistent with F12.1's level-completion celebration)

**Technical Foundation:**
- Badge catalog is **code-seeded via upsert** (matching the platform's existing achievements-catalog pattern) rather than hand-inserted rows, so it can be extended without a data migration per badge
- Catalog **sync-prunes** phantom/no-data entries nightly — but pruning is scoped to **unearned, no-data catalog rows only**; an already-awarded badge is never revoked from a user's history, even if the catalog definition changes or is removed
- Badge evaluation runs in parallel with every level/goal completion event (F12.1) and obstacle resolution (F12.6.1)

**Badge Evaluation (High-Level):**
```
On every level/goal completion event:
1. Check badge catalog for newly-qualifying badges
2. Award + celebrate
3. Sync-prune catalog nightly for removed/no-data badge types
   (never revoking already-earned badges)
```

**Badge Tier (Must-Have scope):** milestone-tier badges only (e.g., Career Starter, Resume Ready, Portfolio Builder). Advanced-tier badges (Interview Warrior, Networking Pro, First Client, etc.) are **not confirmed built beyond milestone-tier** — see Open Questions.

---

## Acceptance Criteria

```gherkin
Scenario: Badge catalog is code-seeded via upsert
  Given the badge catalog is deployed/updated
  When the seed process runs
  Then catalog rows are upserted from code, never hand-inserted directly into the database

Scenario: Milestone badge awarded on level completion
  Given a user completes Level 1 (Clarity) of a career goal for the first time
  When the level-completion event fires
  Then the "Career Starter" badge (or equivalent milestone badge) is evaluated and awarded if criteria are met

Scenario: Sync-prune removes only unearned, no-data catalog rows
  Given the badge catalog is updated and a previously-defined badge type is removed
  When the nightly sync-prune runs
  Then only unearned/no-data rows for that badge type are pruned — no user's already-awarded badge history is touched

Scenario: Already-earned badge survives catalog changes
  Given a user has already earned "Resume Ready"
  When the catalog later drops or redefines the "Resume Ready" badge type
  Then the user still retains "Resume Ready" in their history, unaffected by the catalog change

Scenario: Badge unlock triggers celebration
  Given a badge's award criteria are newly met
  When the award is processed
  Then a celebration event (badge view, confetti, or equivalent UI moment) is emitted
```

---

## Success Metrics

- Badge unlock engagement (view/share): 50%+ (client event tracking)
- Badge catalog non-regression: 0 incidents of earned-badge revocation via sync-prune (regression test on prune logic)

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Badge evaluation runs inline with level/goal completion, no added latency budget beyond the existing <500ms progress-recalculation target | Badge awards scoped to authenticated `user_id` | Badge history is user-visible personal achievement data, not shared cross-user by default | Badge celebration respects `prefers-reduced-motion` (no forced confetti animation) | Reuses the code-seeded-catalog + sync-prune pattern already built for the platform-wide achievements/badges system, no parallel badge mechanism |

---

## Dependencies

- **Prerequisite Stories:** S12.1.1 (level/goal completion events are the award trigger)
- **Related Stories:** S12.6.1 (obstacle resolution also feeds badge evaluation)
- **External Dependencies:** Platform-wide Achievements/Badges system (code-seeded-catalog + sync-prune pattern reused as-is, prior work)

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|---------------------|
| Badge catalog upsert removes a badge the user already earned | Sync-prune runs against catalog that dropped a previously valid badge type | Prune only removes unearned, no-data catalog rows — never revokes an already-awarded badge from a user's history | Silent — user keeps earned badges regardless of catalog changes |
| Badge evaluation triggered by a duplicate completion event (idempotency edge) | Level/goal transitions `completed → completed` | Same idempotency guard as XP double-award prevention (S12.1.1) applies to badge award checks | Silent — no duplicate badge award |

---

## Open Questions

- Advanced-tier badges (Interview Warrior, Networking Pro, First Client, etc.) beyond the milestone tier are **unconfirmed beyond milestone-tier badges** per the source PRD — needs a direct catalog audit before assuming they exist. Not treated as a defect against this story, which scopes to milestone-tier badges only.

---

## Definition of Done

- [x] Acceptance criteria met
- [x] Badges are code-seeded via upsert (never hand-inserted), consistent with the existing achievements-catalog pattern
- [x] Badge catalog sync-prunes phantom entries rather than accumulating dead rows over time
- [x] Sync-prune logic verified to never revoke an already-earned badge
- [x] Milestone-tier badges (Career Starter, Resume Ready, Portfolio Builder, etc.) award correctly on qualifying events
- [x] Regression test covers prune-logic non-regression on earned badges

---

*Story S12.6.2 | Epic E12 | Product: Balencia Platform*
