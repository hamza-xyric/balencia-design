---
type: story
id: S13.1.1
title: Pod Formation & Consent-Gated Matching
epic: E13
epic_name: Social Growth OS
feature: F13.1
feature_name: Groups & Pods (Accountability Pods → Circles → Communities)
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S13.1.1: Pod Formation & Consent-Gated Matching

## User Story

**As a** Holistic Health Seeker who has opted in to buddy discovery,
**I want to** be automatically clustered into a 3-8 person accountability pod with people who share my goal domain, activity level, and schedule,
**So that** I get real accountability partners without having to recruit and vet them myself.

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

**Weekly formation job** (`group-formation.service.ts`, invoked by a scheduled job) clusters candidates into pods once per week per goal domain.

**Candidate pool (strict opt-in, no implicit consent):**
- Requires an explicit `buddy_discovery_consent.allow_suggestions = true` row — a missing row is **never** treated as consent (this is the direct fix for the audit's inverted-default finding, shared infrastructure with S13.6.1)
- Excludes users with `user_trust_signals.status = 'blocked'`
- Excludes users already in an active pod for the same `goal_domain`
- Retrieved via default `LIMIT`-based pool, or embedding KNN shortlist when `ENABLE_EMBEDDING_MATCHING` is on (S13.6.2)

**Compatibility scoring (per candidate pair):** goal alignment, activity-level similarity, streak-state similarity, timezone-band, freshness — weighted per `matching-weights.service.ts` (`DEFAULT_WEIGHTS = { goal:0.4, activity:0.25, streak:0.15, freshness:0.1, matrix:0.15 }`).

**Clustering:**
- Seed anchors from highest-compatibility, least-recently-anchored users (rotation applied — no deterministic re-election of the same anchors every week)
- Greedily assign remaining candidates to the anchor cluster with the highest average pairwise compatibility, capped at 8 members per pod

**Data model** (`server/src/database/migrations/20260605120000_social_growth_os.sql`):

| Table | Key Columns |
|-------|-------------|
| `growth_groups` | `id`, `tier` (`pod`/`circle`/`community`), `goal_domain`, `name`, `chat_id`, `competition_id`, `health_score`, `status` (`forming`/`active`/`at_risk`/`archived`), `formation_run_id`, `parent_group_id` |
| `growth_group_members` | `group_id`, `user_id`, `role` (`anchor`/`member`/`mentor`, default `member`), `compatibility_score`, `joined_at`, `left_at` — PK `(group_id, user_id)` |
| `group_formation_runs` | `id`, `goal_domain`, `tier`, `candidates`, `groups_formed`, `avg_cohesion`, `params` — feeds the matching-weight learning loop (S13.6.2) |

**Provisioning:** insert `growth_group_members` rows (pod starts `forming`) → create pod chat, sync `chat_participants` → flip `growth_groups.status` to `active` → send an opt-in invite notification to each member (no silent auto-drop into an unseen group).

---

## Acceptance Criteria

```gherkin
Scenario: Weekly formation clusters only consented, non-blocked candidates
  Given 12 users have buddy_discovery_consent.allow_suggestions = true for goal_domain "fitness"
  And 2 of those users have user_trust_signals.status = 'blocked'
  When the weekly formation job runs for the "fitness" domain
  Then only the 10 non-blocked, consented users are eligible candidates
  And no pod contains more than 8 members

Scenario: Missing consent row is never treated as consent
  Given a user has no row in buddy_discovery_consent
  When the formation job builds its candidate pool
  Then that user is excluded from the candidate pool entirely

Scenario: New pod provisioning
  Given a cluster of 5 compatible candidates has been formed
  When the formation job provisions the pod
  Then growth_groups is inserted with status='forming'
  And a pod chat is created and chat_participants is synced for all 5 members
  And growth_groups.status flips to 'active'
  And each member receives an opt-in invite notification

Scenario: Insufficient candidates for a goal domain
  Given fewer than 3 consented, non-blocked candidates exist for goal_domain "career"
  When the weekly formation job runs
  Then no pod is formed for "career" this run
  And no user-facing message is shown
  And the domain is requeued for the next weekly run

Scenario: Anchor rotation avoids re-electing the same anchors
  Given a user was anchor of a pod in the prior formation run
  When a new formation run selects anchors
  Then that user is deprioritized in anchor selection in favor of a less-recently-anchored, comparably-compatible candidate
```

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Pod formation → active rate | 80% of formed pods reach `active` status within 7 days | `growth_groups.status` transition tracking |
| Pod 30-day survival | 65% of active pods still active at day 30 | `group_health_snapshots.retention_30d` |
| Voluntary leave rate | <15% of members leave within first 14 days | `growth_group_members.left_at` cohort analysis |
| Consent opt-in rate | 40% of active users enable buddy discovery within 30 days of prompt | `buddy_discovery_consent` conversion tracking |

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Formation job completes within its off-peak processing window per goal domain | Candidate query is parameterized, no string-concat SQL | Zero implicit consent — verified by automated query audit | N/A (background job) | PostgreSQL, optional pgvector for S13.6.2 |
| Pod cap enforced at 8 members, hard-coded tier max | Trust-blocked users excluded before scoring, not after | `buddy_discovery_consent` respected end-to-end | | |

---

## Dependencies

- **Prerequisite Stories:** S13.6.1 (consent gate + trust exclusion predicate), S13.7.2 (trust signal source)
- **Related Stories:** S13.1.2 (join/leave surface), S13.1.3 (ongoing health/promotion)
- **External Dependencies:** `buddy_discovery_consent` table, `user_trust_signals` table, chat infrastructure (`chat_participants`)

---

## Edge Cases & Errors

| Scenario | Expected Behavior |
|----------|-------------------|
| User revokes consent mid-cycle, after being placed in the candidate pool but before provisioning | Excluded at the next query re-evaluation; already-provisioned pods are unaffected retroactively |
| Two candidates have identical compatibility scores | Deterministic tiebreak by user id to keep formation runs reproducible for the learning-loop record |
| Formation job crashes mid-run | Partial provisioning is not committed outside its own transaction; job retries the full domain on next scheduled run, no duplicate pods created |
| User already in an active pod for the same goal_domain | Excluded from the candidate pool for that domain; still eligible for other goal domains |
| Candidate pool has exactly 3 members (minimum viable pod) | A single 3-member pod is formed rather than being skipped |

---

## Open Questions

- None outstanding — formation logic, consent gate, and provisioning are fully shipped and always-on (no flag).
- **Rollout Status:** The candidate-retrieval path optionally uses `ENABLE_EMBEDDING_MATCHING` (S13.6.2, default off) to widen the pool via pgvector KNN; formation itself has no flag and runs identically regardless of that flag's state.

---

## Definition of Done

- [x] Acceptance criteria met
- [x] Consent-gate query verified to never treat a missing row as consent (dedicated automated test)
- [x] Anchor rotation logic tested to avoid deterministic re-election
- [x] Pod cap (8 members) enforced in clustering
- [x] Provisioning creates chat, syncs `chat_participants`, and sends invite notifications
- [x] `group_formation_runs` records candidates/groups_formed/avg_cohesion for the learning loop
- [x] Unit + integration tests green (server suite)

---

*Story S13.1.1 | Epic E13 | Product: Balencia Platform*
