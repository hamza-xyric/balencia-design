---
type: story
id: S13.6.1
title: Consent-Gated Matching & Anti-Cheat Leaderboards
epic: E13
epic_name: Social Growth OS
feature: F13.6
feature_name: Matching & Anti-Cheat
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S13.6.1: Consent-Gated Matching & Anti-Cheat Leaderboards

## User Story

**As a** Busy Professional,
**I want** matching to be genuinely opt-in — never something that happens to me by default — and leaderboards to reliably exclude cheaters and bots,
**So that** every social ranking I see actually means something.

---

## Story Type

- [x] Feature
- [ ] Enhancement
- [x] Technical
- [ ] Integration

## Priority

- [x] Must Have (P0)
- [ ] Should Have (P1)

---

## Scope Description

This story closes three of the audit's most severe findings in one place: an inverted consent default, a fabricated hardcoded acceptance-rate constant wired into live scoring, and unvalidated leaderboard rankings.

**True opt-in consent (fixing the inverted default):** `buddy_discovery_consent.allow_suggestions BOOLEAN DEFAULT false`. The audit-era bug was that missing-row consent was treated as consent (`OR bdc.user_id IS NULL`); the fix strips that branch entirely — all four candidate-generation queries (`buddy-suggestion.service.ts`, `group-formation.service.ts`, `accountability-partner.service.ts`, `reputation.service.ts`) now require an explicit `allow_suggestions = true` join. A backfill migration (`20260611000000_backfill_buddy_discovery_consent.sql`) grandfathered previously-matchable existing users into an explicit `true` row so the strict fix didn't silently zero out the matching pool; every user from that point forward defaults to `false`/no row until they actively opt in via Settings → Privacy or the `/groups` empty-state CTA.

**Leaderboard anti-cheat exclusion** — applied identically across all 7 ranking methods in `leaderboard.service.ts` (`materializeLeaderboard`, `getLeaderboard`, `getFriendsLeaderboard`, `getConsistencyLeaderboard`, `getImprovementLeaderboard`, `getAggregatedLeaderboard`, `getAroundMe`, `updateRanks`):
```sql
AND (dus.flags->>'anomaly_detected')::boolean IS NOT TRUE
AND NOT EXISTS (
  SELECT 1 FROM user_trust_signals uts
  WHERE uts.user_id = dus.user_id AND uts.status = 'blocked'
)
```
Two independent gates: per-day score anomaly detection (`daily_user_scores.flags`) and account-level trust status (`user_trust_signals`, S13.7.2).

**Competition-level anti-cheat** (previously stored-but-unused, now enforced): `competitions.anti_cheat_policy` JSONB supports `max_daily_cap`, `min_confidence`, `require_verification`, all applied in `competition.service.ts:updateCompetitionScores()`.

**Fabricated-constant fix:** `motivation-tier.service.ts` used to hardcode `const suggestionAcceptRate = 50.0`, weighted 30% into motivation-tier engagement scoring. It now queries `goal_action_responses` for real accept/edit counts in a rolling window; if a user has zero responses, the term is dropped and remaining weights renormalized (never defaulted to a fabricated midpoint).

---

## Acceptance Criteria

```gherkin
Scenario: Missing consent row is never treated as consent
  Given a user has no row in buddy_discovery_consent
  When any of the four candidate-generation queries (buddy suggestion, pod formation, accountability partner, reputation mentor discovery) evaluate that user
  Then the user is excluded from candidates in all four

Scenario: Backfill preserved existing matchability
  Given a user was matchable under the old (inverted-default) behavior before the fix shipped
  Then the backfill migration granted them an explicit allow_suggestions=true row
  So they remained matchable without needing to re-opt-in

Scenario: Leaderboard excludes anomaly-flagged and blocked users
  Given a user has daily_user_scores.flags->>'anomaly_detected' = true, or user_trust_signals.status = 'blocked'
  When any of the 7 leaderboard ranking methods runs
  Then that user is excluded from the results in every method, not just some

Scenario: Competition anti-cheat policy enforced
  Given a competition has anti_cheat_policy = { max_daily_cap: 500, require_verification: true }
  When updateCompetitionScores() aggregates scores
  Then submissions exceeding max_daily_cap are capped
  And unverified submissions are excluded if require_verification is set

Scenario: No fabricated constants in live scoring
  Given a user has zero goal_action_responses in the rolling window
  When motivation-tier engagement scoring runs
  Then the suggestionAcceptRate term is dropped entirely and remaining weights are renormalized
  Rather than defaulting to a fabricated 50.0 midpoint

Scenario: User revokes consent mid-cycle
  Given a user's allow_suggestions flips from true to false
  Then they are excluded from the next candidate query
  And existing matches/pods are unaffected retroactively
```

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Consent opt-in accuracy | 100% of matched users have an explicit `allow_suggestions=true` row (zero implicit matches) | Query audit / automated test |
| Leaderboard integrity | 0 blocked/anomaly-flagged users visible in top-100 across all boards | Automated nightly check |
| Buddy-suggestion accept rate (baseline) | Establish real baseline (replacing the fabricated 50.0) | `buddy_suggestions_cache` accept-rate telemetry |

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| All 4 candidate queries parameterized, no string-concat SQL | Consent is enforced at the query level, not a settings toggle that's ignored downstream | Zero implicit consent — verified by grep/test across all 4 candidate queries | N/A (backend/data layer) | PostgreSQL |
| Anti-cheat predicate applied identically across all 7 leaderboard methods | | | | |

---

## Dependencies

- **Prerequisite Stories:** S13.7.2 (`user_trust_signals` as the shared exclusion key)
- **Related Stories:** S13.1.1 (consumer of the candidate pool), S13.2.2 (leaderboard consumer)
- **External Dependencies:** `daily_user_scores`, `goal_action_responses`, `competitions.anti_cheat_policy`

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|--------------------|---------------------|
| User revokes consent mid-matching-cycle | `allow_suggestions` flips to false | Excluded from next candidate query; existing matches unaffected retroactively | "You've opted out of new matches. Existing connections are unaffected." |
| Leaderboard query returns a blocked user (defensive check fails) | Automated integrity test | Alert admin, treat as a P1 bug (violates the core anti-cheat guarantee) | N/A — should never reach a user |
| Competition anti_cheat_policy is malformed/missing keys | JSONB parse/validation | Fall back to no additional cap/verification requirement (base scoring only), log the malformed policy | N/A — competition still functions |
| One of the four candidate queries is modified in a future change to reintroduce implicit consent | Dedicated automated test asserting no candidate query treats a missing row as consent | CI failure blocks merge | N/A — caught before ship |

---

## Open Questions

- None outstanding — consent gate and anti-cheat exclusion are fully shipped and always-on (no flag).

---

## Definition of Done

- [x] Acceptance criteria met
- [x] Zero-implicit-consent invariant verified by dedicated automated test across all 4 candidate queries
- [x] All 7 leaderboard methods verified to apply both anomaly and trust-blocked exclusion
- [x] Competition `anti_cheat_policy` enforcement tested (`max_daily_cap`, `min_confidence`, `require_verification`)
- [x] `motivation-tier.service.ts` fabricated-constant fix verified (drop + renormalize, not fabricated default)
- [x] Backfill migration verified to preserve prior matchability
- [x] Unit + integration tests green (server suite)

---

*Story S13.6.1 | Epic E13 | Product: Balencia Platform*
