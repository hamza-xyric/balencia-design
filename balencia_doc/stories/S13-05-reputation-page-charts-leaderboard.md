---
type: story
id: S13.2.2
title: Reputation Page — Charts, Leaderboard & Transparency
epic: E13
epic_name: Social Growth OS
feature: F13.2
feature_name: Reputation System
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S13.2.2: Reputation Page — Charts, Leaderboard & Transparency

## User Story

**As an** Optimization Enthusiast,
**I want** a premium `/reputation` page with a visual breakdown of my score, a trend chart, a leaderboard, and a transparent "how is this calculated" view,
**So that** I can understand exactly what's driving my standing and trust that others' scores mean something too.

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

This story is the direct fix for the audit's finding: a fully-computed reputation score sitting in a table with no page, no chart, and no history to show trend.

**Server endpoints** (`server/src/routes/reward.routes.ts`, handlers in `reward.controller.ts`, all `authenticate` + `readLimiter`):
```
GET /api/reputation/me
GET /api/reputation/me/breakdown
GET /api/reputation/me/history
GET /api/reputation/me/rank
GET /api/reputation/leaderboard
GET /api/reputation/mentors
```

**Client surface:** `/reputation` (`ReputationPageContent.tsx`) — tabs `overview | leaderboard | mentors` via the shared `SegmentedTabs` primitive (same component used by `/groups`).

| Component | Role |
|-----------|------|
| `ReputationGauge.tsx` | Pure-SVG radial gauge — "the '3D' depth comes from layered radial gradients + a soft drop-shadow," no charting library dependency |
| `CompositionRadar.tsx` | 5-axis radar across the 5 weighted signals |
| `ReputationTrajectory.tsx` | 30-day area chart from `reputation_score_history` |
| `HowScoreWorksModal.tsx` | Transparency breakdown — exact weighted contribution of each signal |
| `ShareReputationButton.tsx` | Social sharing |

**Leaderboard tab:** excludes trust-blocked and anomaly-flagged users — shares the exact same exclusion predicate used across all 7 ranking methods in `leaderboard.service.ts` (S13.6.1).

**Mentors tab:** surfaces eligible/active mentors filtered by shared pillar and trust status (`getMentors()` — see S13.5.2).

**Client tier mirror:** `client/app/(pages)/reputation/lib/reputationTier.ts` duplicates `STATUS_TIERS` thresholds/colors for local rendering without a round trip — must stay identical to the server constants (own code comment flags this).

---

## Acceptance Criteria

```gherkin
Scenario: Overview tab renders all three charts
  Given a user with an existing reputation score
  When they open /reputation
  Then the gauge, composition radar, and 30-day trajectory chart all render using pure SVG
  And no external charting library is loaded for these components

Scenario: Score never displayed without a breakdown
  Given a user's score is displayed anywhere on the page
  Then at least a partial signal breakdown is available (never a bare number with nothing behind it)

Scenario: Transparency modal
  Given a user opens "How is this calculated?"
  Then the modal shows the exact weighted contribution of each of the 5 signals
  Matching the live SCORE_WEIGHTS used server-side

Scenario: Leaderboard excludes bad actors
  Given a user with user_trust_signals.status = 'blocked' has a high reputation score
  When the leaderboard tab is rendered
  Then that user does not appear anywhere in the ranked list

Scenario: New user with no history
  Given a user has zero rows in reputation_score_history
  When they view the trajectory chart
  Then a "Building history" state is shown instead of an empty/broken chart

Scenario: Client/server tier thresholds match
  Given the STATUS_TIERS constants in reputationTier.ts (client) and reputation.service.ts (server)
  Then an automated test asserts they are identical
```

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Page engagement | 50% of pod members visit `/reputation` within 14 days of joining a pod | Page-view analytics |
| Score comprehension | 75% correctly identify their top contributing signal after viewing breakdown | Post-view survey |
| Trust in score | 70% rate the score as "reflects real effort, not gaming" | Quarterly survey |

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Reputation breakdown fetch <300ms | `readLimiter` on all reputation endpoints | Leaderboard shows only score/rank, not raw signal internals of other users | SVG charts have appropriate `aria-label`s | Responsive 360px–ultrawide |
| No chart-library dependency (bundle-size discipline) | Leaderboard exclusion predicate applied server-side, never client-filtered | | Reduced-motion respected on gauge/radar entrance animation | |

---

## Dependencies

- **Prerequisite Stories:** S13.2.1 (score + history data source)
- **Related Stories:** S13.5.2 (Mentors tab shares this page), S13.6.1 (leaderboard exclusion predicate)
- **External Dependencies:** `SegmentedTabs` shared primitive

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|--------------------|---------------------|
| New user, no history yet | `reputation_score_history` empty for user | Trajectory chart shows "Building history" state | "Your trend chart will fill in as you build a track record." |
| All signals at zero | `unclampedScore = 0` | Show Novice tier with encouragement copy, not an empty/error state | "Everyone starts here. Complete a pledge or join a pod to start earning reputation." |
| Mentor tab empty (no eligible mentors) | `getMentors()` returns zero rows | Show empty state explaining eligibility bar | "No mentors available in your pillar yet — check back as the community grows." |
| Leaderboard query returns a blocked user (defensive check fails) | Automated integrity test | Alert admin, treat as P1 bug — should never reach a user | N/A |
| Client/server tier threshold drift | Automated test comparing `STATUS_TIERS` constants | Build-time failure, not a runtime bug | N/A — caught before ship |

---

## Open Questions

- None outstanding — reputation page is fully shipped and always-on (no flag).

---

## Definition of Done

- [x] Acceptance criteria met
- [x] Pure-SVG chart components verified (no charting library in bundle)
- [x] Leaderboard tab shares the anti-cheat exclusion predicate with S13.6.1 (not a re-implementation)
- [x] Client/server tier-threshold drift test in place
- [x] Responsive UI verified at 360/768/1024/1440
- [x] Unit + integration tests green (server + client suites)

---

*Story S13.2.2 | Epic E13 | Product: Balencia Platform*
