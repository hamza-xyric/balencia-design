---
type: story
id: S13.5.1
title: Mentor Eligibility & Promotion
epic: E13
epic_name: Social Growth OS
feature: F13.5
feature_name: Mentors & Community Tiers
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S13.5.1: Mentor Eligibility & Promotion

## User Story

**As a** Holistic Health Seeker six months into consistent tracking,
**I want** the platform to automatically recognize my track record by offering me mentor status,
**So that** my consistency translates into real community standing, not just a number on a page.

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

This story closes the audit's "mentor role never assigned" finding: mentor *eligibility* was already computed, but nothing ever flipped a user's actual `role` to `mentor` or `mentor_status` to `active`.

**Eligibility computation** (`reputation.service.ts`, inside `recomputeReputation()`, shared with S13.2.1):
```
mentorStatus = mentorRoles > 0 ? 'active'
             : (score >= 250 AND consistency >= 20) ? 'eligible'
             : 'none'
```
(`score >= 250` = Champion tier and above.)

**The actual assignment fix** (`community-intelligence.service.ts`):
- `identifyEmergingMentors()` — finds `growth_group_members` with `role='member'` in an active pod whose `user_reputation.mentor_status = 'eligible'`.
- `promoteEligibleMentors()` — *"Closes the loop on `identifyEmergingMentors` (previously unconsumed)"*: runs `UPDATE growth_group_members SET role='mentor' WHERE ... AND role='member'`, then `UPDATE user_reputation SET mentor_status='active' WHERE mentor_status='eligible'`, then sends a notification to the newly promoted mentor. Called from the daily `group-health.job.ts` (shared with S13.1.3), and (when `ENABLE_COMMUNITY_ORCHESTRATOR` is on) dispatchable from the LLM plan's `promoteMentors` flag — see S13.8.1.

**Mentor promotion process (high-level):**
```
Daily Group Health Job:

1. identifyEmergingMentors():
   SELECT growth_group_members.user_id, group_id
   FROM growth_group_members
   JOIN user_reputation ON user_reputation.user_id = growth_group_members.user_id
   WHERE growth_group_members.role = 'member'
     AND growth_group_members.left_at IS NULL
     AND user_reputation.mentor_status = 'eligible'
     AND growth_groups.status = 'active'

2. promoteEligibleMentors():
   FOR EACH emerging mentor:
     UPDATE growth_group_members SET role = 'mentor' WHERE group_id, user_id match
     UPDATE user_reputation SET mentor_status = 'active' WHERE user_id matches
     notify(user_id, "You've been recognized as a pod mentor")

3. (If ENABLE_COMMUNITY_ORCHESTRATOR):
   LLM plan may include promoteMentors: true/false as one of 4 allowed plan keys
   -> if true, runs as part of the orchestrated cycle instead of the fixed sequence
   -> if false or flag off, this step still runs (deterministic fallback is identical)
```

---

## Acceptance Criteria

```gherkin
Scenario: Automated promotion, no manual step
  Given a pod member has mentor_status='eligible' and role='member' in an active pod
  When the daily group-health job runs
  Then their growth_group_members.role is updated to 'mentor'
  And their user_reputation.mentor_status is updated to 'active'
  And no manual admin action was required

Scenario: Never overwrites an existing anchor
  Given a user is currently the anchor of a pod and also becomes mentor-eligible
  When promoteEligibleMentors() runs
  Then their role is NOT changed away from 'anchor'
  (only role='member' rows are eligible for promotion to 'mentor')

Scenario: Promoted mentor is notified
  Given promoteEligibleMentors() promotes a user
  Then that user receives a notification confirming their new mentor status

Scenario: Eligible user has left all pods before promotion runs
  Given a user's mentor_status is 'eligible' but they have left every pod (left_at IS NOT NULL everywhere)
  When promoteEligibleMentors() runs
  Then no growth_group_members row is found to promote
  And mentor_status remains 'eligible' (not falsely set to 'active')

Scenario: Mentor demoted by attrition, not punishment
  Given a promoted mentor later leaves their pod (left_at is set)
  Then their role naturally lapses with membership
  And mentor_status remains 'active' until the next reputation recompute reflects reduced mentorRoles
  And no punitive messaging is shown
```

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Eligible → active mentor conversion | 50% of `eligible` mentors get promoted within one weekly health-job cycle | `promoteEligibleMentors()` output tracking |

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Promotion runs as part of the existing daily group-health job window | Promotion is server-only, no client-triggerable promotion endpoint | Mentor status change is visible only to the user and their pod | Notification meets standard accessibility copy guidelines | PostgreSQL |
| `mentor_status` transitions are idempotent (`eligible → active` only fires once) | | | | |

---

## Dependencies

- **Prerequisite Stories:** S13.2.1 (eligibility computation), S13.1.1/S13.1.2 (pod membership/role storage)
- **Related Stories:** S13.5.2 (surfaces promoted mentors), S13.8.1 (optional LLM-directed dispatch of this same primitive)
- **External Dependencies:** `group-health.job.ts` (shared daily job, also runs S13.1.3)

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|--------------------|---------------------|
| Eligible user has left all pods before promotion runs | `promoteEligibleMentors()` finds no `growth_group_members` row | Skip promotion for that user this cycle, status stays `eligible` | Silent — status is honest, no false "active" |
| Mentor demoted (leaves pod after promotion) | `left_at` set on `growth_group_members` | Role naturally lapses with membership; `mentor_status` stays `active` until next recompute reflects reduced `mentorRoles` | Silent status decay, no punitive messaging |
| Two eligible members in the same pod promoted in the same cycle | Batch update processes both independently | Both promoted to `mentor` in the same pod, no conflict (multiple mentors per pod is allowed) | Both receive individual notifications |
| Promotion runs twice in a day (job retry) | `mentor_status` already 'active' | Second run finds zero `eligible` rows for that user, no-ops | N/A |

---

## Open Questions

- None outstanding for the deterministic promotion path — fully shipped and always-on (no flag).
- **Rollout Status:** When `ENABLE_COMMUNITY_ORCHESTRATOR` (default off) is enabled, `promoteEligibleMentors()` may instead be dispatched via the LLM plan's `promoteMentors` boolean rather than always running unconditionally — see S13.8.1. The underlying primitive and its guarantees are unchanged either way.

---

## Definition of Done

- [x] Acceptance criteria met
- [x] Anchor-never-overwritten invariant tested
- [x] Notification-on-promotion verified
- [x] Left-pod-before-promotion edge case tested (status stays honest, not falsely active)
- [x] Unit + integration tests green (server suite)

---

*Story S13.5.1 | Epic E13 | Product: Balencia Platform*
