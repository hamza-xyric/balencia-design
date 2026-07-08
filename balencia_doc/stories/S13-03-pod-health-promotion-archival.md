---
type: story
id: S13.1.3
title: Pod Health, Promotion & Archival
epic: E13
epic_name: Social Growth OS
feature: F13.1
feature_name: Groups & Pods (Accountability Pods → Circles → Communities)
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S13.1.3: Pod Health, Promotion & Archival

## User Story

**As a** platform stakeholder responsible for community health,
**I want to** automatically snapshot pod health daily, promote healthy tenured pods to circle/community tier, and archive collapsed pods,
**So that** the group hierarchy stays alive and self-maintaining without manual triage of every pod.

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

**Daily job:** `group-health.job.ts` (also the entry point for S13.5.1's mentor promotion and, when flag-gated on, S13.8.1's orchestrator).

**Data model** (`server/src/database/migrations/20260605120000_social_growth_os.sql`, promotion link in `20260612000000_growth_group_parent_link.sql`):
```sql
group_health_snapshots (
  group_id, date, participation, accountability_effectiveness,
  retention_30d, challenge_success, health_score,
  PRIMARY KEY (group_id, date)
)
growth_groups.parent_group_id UUID REFERENCES growth_groups(id) ON DELETE SET NULL
```

**Promotion (pod → circle → community):** `community-intelligence.service.ts` — `promotePodsToCircles()` / `promoteCirclesToCommunities()`, gated by health/tenure thresholds (`POD_TO_CIRCLE`, `CIRCLE_TO_COMMUNITY` config). Promotion writes `parent_group_id` rather than migrating membership rows — **membership always stays pod-level**; circle/community "membership" is a health-based roll-up view.

**Archival:** health job detects pod collapse (`participation` below floor, effectively all-but-one member left) → `status = 'archived'` → notifies the remaining member.

**Ongoing health snapshot (daily):**
```
1. Snapshot participation / accountability_effectiveness / retention_30d / challenge_success per pod
2. Flag at_risk pods below health floor (status → 'at_risk')
3. Promote healthy, tenured pods to circle tier (parent_group_id link)
4. Archive collapsed pods
```

**Remediation:** `remediateGroup(groupId)` — notifies the pod's anchor with guidance (static fallback string by default; LLM-personalized when `ENABLE_COMMUNITY_AGENT` is on, see S13.8.1). This is the fix for the audit's "pod encouragement is fake-social (notifies only the at-risk user)" finding — real `rallyPodMates` + anchor-targeted remediation now exists.

**Client surface:** health breakdown consumed by `PodDetailModal` (S13.1.2) and `TierCards.tsx` (`CirclesPanel` / `CommunitiesPanel`, S13.5.2).

---

## Acceptance Criteria

```gherkin
Scenario: Daily health snapshot
  Given an active pod exists
  When the daily group-health job runs
  Then a group_health_snapshots row is inserted for that pod and date
  With participation, accountability_effectiveness, retention_30d, challenge_success, and a computed health_score

Scenario: At-risk pod flagged
  Given a pod's health_score drops below the health floor
  When the daily job runs
  Then growth_groups.status transitions to 'at_risk'
  And remediateGroup() notifies the pod's anchor

Scenario: Pod promotion to circle
  Given a pod has sustained health above the POD_TO_CIRCLE threshold for the required tenure window
  When the daily job runs
  Then a new/existing circle-tier growth_groups row receives this pod's id as parent_group_id
  And existing growth_group_members rows are unchanged (membership stays pod-level)

Scenario: Pod collapse and archival
  Given all but one member has left a pod
  When the daily job detects participation below the collapse floor
  Then growth_groups.status transitions to 'archived'
  And the remaining member is notified: "Your pod wound down due to low activity. We'll match you into a new one soon."

Scenario: Anchor rally on at-risk pod
  Given a pod is flagged at_risk
  When remediateGroup() runs
  Then only the pod's designated anchor receives the guidance notification — never an open broadcast to all members
```

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Pod 30-day survival | 65% of active pods still active at day 30 | `group_health_snapshots.retention_30d` |
| Pod → Circle graduation rate | 20% of healthy pods graduate to circle tier within 90 days | Promotion job output |
| Circle → Community graduation rate | 10% within 180 days | Promotion job output |

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Daily job completes within nightly window | Anchor-only notification, never a broadcast (irreversibility-free by construction) | Health scores visible only to pod members | N/A (background job) | PostgreSQL |
| `group_health_snapshots` PK `(group_id, date)` prevents duplicate snapshots | Promotion thresholds are server-side config, not client-editable | | | |

---

## Dependencies

- **Prerequisite Stories:** S13.1.1 (pods must exist), S13.1.2 (membership state)
- **Related Stories:** S13.5.1 (shares the same daily job for mentor promotion), S13.8.1 (optional LLM layer over this same job)
- **External Dependencies:** Notification service

---

## Edge Cases & Errors

| Scenario | Expected Behavior |
|----------|--------------------|
| Pod at_risk two cycles in a row without recovery | Remains `at_risk`, remediation notification re-sent (not spammed — cadence controlled by job schedule) |
| Health job failure for one pod mid-batch | Log, skip that pod for the cycle, continue processing remaining pods — no batch-wide abort |
| Promotion threshold met but pod has zero tenure history | Promotion withheld until minimum tenure window is satisfied — never immediate on join |
| Archived pod's remaining member re-matched into a new pod later | New pod formation treats them as a fresh candidate, no reference to the archived pod |
| Circle already exists as parent for a sibling pod | New qualifying pod links to the existing circle rather than creating a duplicate |

---

## Open Questions

- None outstanding for the deterministic health/promotion/archival path — fully shipped and always-on (no flag).
- **Rollout Status:** When `ENABLE_COMMUNITY_AGENT` (default off) is enabled, the anchor guidance text in `remediateGroup()` becomes LLM-personalized instead of the static fallback string — see S13.8.1. This story's deterministic behavior is unaffected either way.

---

## Definition of Done

- [x] Acceptance criteria met
- [x] Daily snapshot, at-risk flagging, promotion, and archival all tested against a real DB
- [x] Anchor-only remediation notification verified (no broadcast path exists)
- [x] Promotion writes `parent_group_id` without touching membership rows
- [x] Unit + integration tests green (server suite)

---

*Story S13.1.3 | Epic E13 | Product: Balencia Platform*
