---
type: story
id: S16.1.1
title: Contract Lifecycle State Machine
epic: E16
epic_name: Accountability Contract Hardening, Witness Verification & Analytics Engine
feature: F16.1
feature_name: Contract Lifecycle State Machine
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S16.1.1: Contract Lifecycle State Machine

## User Story

**As a** user who has signed a binding accountability contract with real stakes (social alerts, XP, streak freezes),
**I want to** the contract's status to always accurately reflect reality — never stuck, never silently wrong, never deletable to dodge a live penalty,
**So that** I can trust the system's verdicts and the people I've looped in can trust what they're told about me.

---

## Story Type

- [ ] Feature
- [x] Enhancement
- [ ] Technical
- [ ] Integration

## Priority

- [x] Must Have (P0)
- [ ] Should Have (P1)

---

## Scope Description

**Remediates:** Arch-4 (lifecycle state machine incomplete — dead ends, orphans), R-4 (weak informed consent at signing, backend-primary scope)

**Problem (pre-remediation):** `violated` was a terminal dead end with no path forward, `at_risk` never recovered back to `active`, paused contracts could orphan past their `end_date` with no sweep to close them, and auto-renew silently created inert unsigned drafts that dropped the original `condition_details`.

**What shipped:**
- Canonical `ContractStatus` enum in `server/shared/types/domain/accountability.ts`: `draft | active | at_risk | violated | completed | cancelled | paused`.
- Server-side transition guards in `accountability-contract.service.ts`, enforced exclusively via `WHERE status = ...` predicates — no client-trusted state changes:

| Action | Precondition | Resulting State |
|---|---|---|
| `sign` | `status = 'draft'` | `active` |
| `pause` | `status = 'active'` AND `pause_count < 2` | `paused` |
| `resume` | `status = 'paused'` | `active` |
| `cancel` | `status IN ('draft','active','paused','at_risk','violated')` | `cancelled` |
| `recordCheck` (3 consecutive clean days) | `status = 'at_risk'` | `active` (recovery) |
| `recordViolation` (violation_count ≥ 3) | `status IN ('active','at_risk')` | `violated` |
| `checkExpiredContracts` sweep | `status IN ('active','at_risk','violated')` AND `end_date` reached | `completed` |
| `checkExpiredContracts` sweep | `status = 'paused'` AND `end_date` reached | `cancelled` |
| `deleteContract` / `bulkDeleteContracts` | `status IN ('draft','cancelled','completed')` ONLY | hard-deleted |

- `cancel` deliberately accepts `violated` as a source state, closing the original dead end — a user can close out a "zombie" violated contract instead of it sitting unresolved forever.
- Hard delete is deliberately **blocked** on any live state (`active`, `at_risk`, `paused`, `violated`) so a contract cannot be deleted to erase a violation history mid-flight.
- Auto-renew carries forward `condition_details` verbatim into the new draft rather than dropping them, and the new draft requires re-sign before it becomes active.
- Every controller endpoint under `/contracts` re-derives `userId` from the authenticated session and filters every query by it — confirmed airtight by the 2026-06-10 audit; no cross-user contract access path exists.

**Known, tracked (not this story's blocker):** F16.8 (witness verification) introduces three additional service-level statuses (`pending_witnesses`, `pending_verification`, `witness_rejected`) used in query/sort logic but not yet reflected in the shared `ContractStatus` TypeScript union. This is a type-definition cleanup, not a runtime risk — the database column is free-text/enum, not TypeScript-checked at the query boundary. Tracked as a pre-F16.8-rollout blocker.

---

## Acceptance Criteria

```gherkin
Scenario: Violated contract is not a dead end
  Given a contract in status "violated"
  When the owner calls cancel
  Then the contract transitions to "cancelled" and is closed out

Scenario: At-risk contract recovers
  Given a contract in status "at_risk"
  When the user records 3 consecutive clean daily checks
  Then the contract transitions back to "active"

Scenario: Paused contract past end_date is swept, never orphaned
  Given a contract in status "paused" with end_date in the past
  When the nightly checkExpiredContracts sweep runs
  Then the contract transitions to "cancelled"

Scenario: Live contract cannot be hard-deleted
  Given a contract in status "active", "at_risk", "paused", or "violated"
  When deleteContract or bulkDeleteContracts is called
  Then the request is rejected and the contract remains untouched

Scenario: Auto-renew preserves condition_details
  Given a contract eligible for auto-renew reaches its end_date
  When the renewal job creates the next-cycle draft
  Then the new draft's condition_details exactly match the original contract's condition_details
  And the new draft requires an explicit re-sign before becoming active

Scenario: Ownership scoping is enforced on every endpoint
  Given an authenticated user A and a contract owned by user B
  When user A calls any /contracts/:id endpoint with B's contract id
  Then the request is rejected as not found (no cross-user data leak)
```

---

## Success Metrics

- Contracts stuck outside the defined lifecycle: 0 (nightly sweep audit query)
- Hard-delete attempts on live contracts: 100% rejected (controller/service test coverage + prod error-rate monitoring)
- `at_risk → active` recovery rate: tracked, informational only
- Cross-user contract access attempts succeeding: 0

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Nightly sweep completes without overrunning its own job window | Server-side-only transition guards; no client-trusted state | Contract detail scoped strictly to owner | Status badges carry accessible text labels, not color-only | Existing `/contracts` REST API, no breaking route changes |

---

## Dependencies

- **Prerequisite Stories:** None (entry point for the epic)
- **Related Stories:** S16.1.2 (shares the notification/ID-resolution query), S16.2.1/S16.2.2 (evaluator verdicts drive transitions), S16.7.1 (grace sweep reads this state machine)
- **External Dependencies:** PostgreSQL (contract tables), authenticated session middleware
- **Remediates:** Arch-4, R-4 (partial — backend precondition enforcement; UX consent copy is out of this doc's backend-primary scope)

---

## Edge Cases & Errors

| Scenario | Expected Behavior |
|----------|-------------------|
| User tries to delete an active contract | 409/422 rejection: "This contract is still active. Cancel it first if you want to close it out." |
| Contract straddles `end_date` while paused | Auto-transitioned to `cancelled` by nightly sweep: "Your paused contract expired without being resumed and was closed." |
| Auto-renew fires on a contract with rich `condition_details` | New draft copies `condition_details` verbatim, requires re-sign: "Your contract is up for renewal — review and re-sign to continue." |
| User attempts a client-forged status transition (e.g. directly requesting `violated → active`) | Rejected server-side; no transition matches an undefined precondition |
| Contract reaches `end_date` while in `violated` state | Swept to `completed`, not silently deleted — violation history preserved for audit |

---

## Open Questions

- `ContractStatus` shared TypeScript union needs a follow-up update to include `pending_witnesses` / `pending_verification` / `witness_rejected` before F16.8 rollout (tracked, not blocking this story).
- Arch-1 (three divergent DDL sources for contract tables — inline `ensureTables()` DDL kept alongside canonical migration) was explicitly **declined**: removing it would reintroduce a hard boot-time dependency on auto-migrate having run.

---

## Definition of Done

- [x] Acceptance criteria met
- [x] `ContractStatus` transitions enforced exclusively server-side via `WHERE status = ...` guards
- [x] `violated` is not a dead end (cancel accepted from violated)
- [x] `at_risk → active` recovery after 3 consecutive clean checks
- [x] Paused contracts past `end_date` swept to `cancelled`, never orphaned
- [x] `deleteContract` / `bulkDeleteContracts` reject any non-`draft`/`cancelled`/`completed` contract
- [x] Auto-renew carries forward `condition_details`
- [x] Every `/contracts` endpoint re-derives `userId` from session and filters by it
- [x] Unit + integration tests passing (`server/tests/integration/accountability-contract.integration.test.ts`)

---

*Story S16.1.1 | Epic E16 | Product: Balencia Platform*
