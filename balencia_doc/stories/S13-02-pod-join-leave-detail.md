---
type: story
id: S13.1.2
title: Pod Join, Leave & Detail View
epic: E13
epic_name: Social Growth OS
feature: F13.1
feature_name: Groups & Pods (Accountability Pods → Circles → Communities)
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S13.1.2: Pod Join, Leave & Detail View

## User Story

**As a** pod member,
**I want to** see my pods with full visibility into who's in them and why, and be able to join or leave with explicit confirmation,
**So that** I always have control over my accountability group and it never feels like something that happened to me silently.

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

This story is the direct fix for the audit's highest-severity client-surface finding: *"pods form silently, no accept gate, no UI to see, accept, or leave one."*

**Server routes** (`server/src/routes/groups.routes.ts`, mounted at `/api/groups`, all behind `authenticate`):
```
GET  /api/groups/mine
GET  /api/groups/circles
GET  /api/groups/circles/:id
GET  /api/groups/communities
GET  /api/groups/communities/:id
GET  /api/groups/:id
GET  /api/groups/:id/members
GET  /api/groups/:id/health
POST /api/groups/:id/join
POST /api/groups/:id/leave
```
- Write endpoints: `writeLimiter` (20 req/min/user). Read endpoints: `readLimiter` (60 req/min/user).
- Params validated via `groupIdParamSchema = z.object({ id: z.string().uuid() })`.
- `POST /api/groups/:id/join` — idempotent, tier-capacity enforced, calls `groupFormationService.joinGroup()`, syncs `chat_participants`.
- `POST /api/groups/:id/leave` — calls `groupFormationService.leaveGroup()`, syncs `chat_participants` in the reverse direction.

**Client surface:** `/groups` (`GroupsPageContent.tsx`) — 4 tabs (`pods | circles | communities | partners`) via the shared `SegmentedTabs` primitive (same component used by `/reputation`).

| Component | Behavior |
|-----------|----------|
| `PodsEmptyState.tsx` | **Consent-aware**: if the user already opted in, shows "You're in the matching queue" (no re-nagging); if not, shows an inline "Enable buddy discovery" CTA that flips consent directly — no bounce to Settings |
| `PodModals.tsx` → `LeavePodDialog` | Radix-based leave-confirmation modal — no accidental leaves |
| `PodModals.tsx` → `PodDetailModal` | Health breakdown + member roster (with anchor/member/mentor roles visibly distinguished) + "Open chat" / "Pod challenge" / "Leave" actions |

Circles/Communities tabs render conditionally — only once the user actually belongs to a group at that tier (tier progression is earned, not always visible).

---

## Acceptance Criteria

```gherkin
Scenario: /groups page renders all tabs
  Given a logged-in user navigates to /groups
  Then the "My Pods" tab is always visible
  And "Circles" and "Communities" tabs are shown only if the user belongs to a group at that tier
  And a "Partners" tab is available

Scenario: Empty state reflects live consent state
  Given a user has not opted in to buddy discovery
  When they view the Pods tab with no pods
  Then an inline "Enable buddy discovery" CTA is shown
  And tapping it flips consent directly without navigating to Settings

Scenario: Empty state for an already-opted-in user
  Given a user has buddy_discovery_consent.allow_suggestions = true but no pod yet
  When they view the Pods tab
  Then the empty state reads "You're in the matching queue" with no opt-in CTA

Scenario: Joining a pod
  Given a user views an eligible open pod
  When they tap "Join"
  Then POST /api/groups/:id/join is called
  And a repeated call with the same pod id is a no-op (idempotent)
  And chat_participants is synced so the user can access the pod chat

Scenario: Pod at capacity
  Given a pod already has 8 members
  When a user attempts to join
  Then the server returns 409
  And the client suggests an alternate pod/circle

Scenario: Leaving a pod requires confirmation
  Given a user taps "Leave" on a pod they belong to
  Then LeavePodDialog is shown before any request is sent
  When the user confirms
  Then POST /api/groups/:id/leave is called
  And chat_participants is synced to remove the user from the pod chat

Scenario: Pod detail view
  Given a user opens a pod they belong to
  Then the modal shows health breakdown (participation, accountability effectiveness, retention, challenge success)
  And the member roster with anchor/member/mentor roles visibly distinguished
```

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Voluntary leave rate | <15% of members leave within first 14 days | `growth_group_members.left_at` cohort analysis |
| Consent opt-in rate | 40% of active users enable buddy discovery within 30 days of prompt | `buddy_discovery_consent` conversion tracking |
| Join endpoint error rate | <1% non-capacity errors | API instrumentation |

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| List endpoints paginated, keyset preferred | `authenticate` on every route | Roster shows only pod-scoped member info | Radix dialog is keyboard-navigable, focus-trapped | Responsive 360px–ultrawide |
| Writes: 20 req/min/user rate limit | `groupIdParamSchema` validates all `:id` params as UUID | No cross-pod member data leakage | Visible focus rings on tab/join/leave controls | |
| Reads: 60 req/min/user rate limit | Join/leave idempotent to prevent double-submit exploits | | | |

---

## Dependencies

- **Prerequisite Stories:** S13.1.1 (pods must exist to join/view)
- **Related Stories:** S13.1.3 (health data shown in `PodDetailModal`), S13.6.1 (consent flip wiring shared with matching settings)
- **External Dependencies:** `SegmentedTabs` shared primitive (also used by `/reputation`), Radix UI, chat infrastructure

---

## Edge Cases & Errors

| Scenario | Expected Behavior |
|----------|--------------------|
| User not opted in to matching | Empty state with inline opt-in CTA, no auto-enrollment |
| Pod at capacity on join | Reject join with 409, suggest alternate pod/circle: "This pod is full. We'll suggest another group that fits your goals." |
| Double-tap "Join" (race) | Idempotent server handling — second call no-ops, no duplicate membership row |
| User leaves a pod they anchor | Server reassigns anchor to next-longest-tenured member; UI shows silent reassignment, notifies the new anchor |
| Network failure mid-leave confirmation | Dialog stays open with an inline error, no partial leave state |
| Circles/Communities tab requested by a user with no group at that tier | Tab is hidden entirely, not shown-then-empty |

---

## Open Questions

- None outstanding — join/leave/detail surface is fully shipped and always-on (no flag).

---

## Definition of Done

- [x] Acceptance criteria met
- [x] Error scenarios handled gracefully (409 capacity, idempotent join, confirmation-gated leave)
- [x] `PodsEmptyState` reflects live consent state with no re-nagging
- [x] Anchor reassignment on anchor-leave verified
- [x] Rate limits enforced (20/min writes, 60/min reads)
- [x] Responsive UI verified at 360/768/1024/1440
- [x] Unit + integration tests green (server + client suites)

---

*Story S13.1.2 | Epic E13 | Product: Balencia Platform*
