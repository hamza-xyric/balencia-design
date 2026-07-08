---
type: story
id: S16.7.1
title: Grace Period Expiry Sweep & Real Penalty Execution
epic: E16
epic_name: Accountability Contract Hardening, Witness Verification & Analytics Engine
feature: F16.7
feature_name: Grace Periods & Honest Audit Trail
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S16.7.1: Grace Period Expiry Sweep & Real Penalty Execution

## User Story

**As a** user in a grace period after a violation,
**I want to** actually be able to use that window to get back on track, with the penalty only firing for real if I don't,
**So that** grace periods mean what they say instead of being a promise the system never keeps.

---

## Story Type

- [ ] Feature
- [ ] Enhancement
- [x] Technical
- [ ] Integration

## Priority

- [x] Must Have (P0)
- [ ] Should Have (P1)

---

## Scope Description

**Remediates:** C-8 (grace-period penalties never execute; false "penalty applied" messaging)

**Problem (pre-remediation):** `grace_expires_at` was written to the violation row but never read by anything, so a user could be told a grace period had lapsed and a penalty applied when, in reality, nothing happened.

**What shipped:** a real grace-expiry sweep, `sweepExpiredGrace` (`accountability-contract.service.ts`, ~lines 1250-1300), that queries violations `WHERE grace_expires_at IS NOT NULL AND grace_expires_at < NOW()` and, for each:

- If the user got back on track during the grace window → `penalty_status = 'waived', grace_used = true, resolved_at = NOW()`
- Otherwise → `executePenalty()` runs for real, then `grace_used = true` is set

`executePenalty` (line ~1168) now has multiple call sites: immediate execution when no grace window applies, this grace sweeper, and the dispute-reversal path. The sweep is invoked from `contract-evaluation.job.ts` on every 2-hour cycle: `const grace = await accountabilityContractService.sweepExpiredGrace();` — this closes C-8 directly, since the sweep is stateless and re-runs every cycle, self-healing on the next successful run if a cycle is missed (no state is lost by a missed cycle).

---

## Acceptance Criteria

```gherkin
Scenario: Grace sweep resolves every expired grace window
  Given a violation with grace_expires_at in the past and penalty_status still pending
  When sweepExpiredGrace runs
  Then the violation reaches a terminal penalty_status of either "waived" or "executed"

Scenario: User back on track during grace gets waived, not penalized
  Given a violation in an open grace window
  And the user's behavior since the violation satisfies the condition again
  When sweepExpiredGrace processes the expired window
  Then penalty_status is set to "waived"
  And grace_used is set to true
  And resolved_at is set to the current time
  And no penalty executes

Scenario: User still non-compliant after grace gets a real penalty
  Given a violation in an expired grace window
  And the user's behavior since the violation still fails the condition
  When sweepExpiredGrace processes the expired window
  Then executePenalty runs for real (donation/XP-loss/social_alert/streak_freeze_loss as configured)
  And penalty_status is set to "executed"
  And grace_used is set to true

Scenario: Missed sweep cycle self-heals
  Given the evaluation job did not run for one cycle due to downtime
  When the job resumes on its next cycle
  Then sweepExpiredGrace still correctly resolves any violations whose grace expired during the downtime window
```

---

## Success Metrics

- Grace-expired violations with no recorded outcome (never waived, never executed): 0 (down from 100% pre-fix)
- Every expired-grace violation reaches a terminal `penalty_status`: 100% (`sweepExpiredGrace` coverage)

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| `sweepExpiredGrace` completes in <5 seconds for typical grace-violation volume, runs inline within the 2h evaluation cycle | `executePenalty` reuses the same authorized call path regardless of trigger (immediate, sweep, or dispute-reversal) | N/A | N/A (backend job) | Sweep is stateless and idempotent — safe to re-run every cycle |

---

## Dependencies

- **Prerequisite Stories:** S16.1.1 (shares violation/settlement state), S16.2.2 (violation record this sweep resolves)
- **Related Stories:** S16.7.2 (audit-honesty fields written alongside this sweep), S16.4.1 (`enforcers_notified` honesty depends on this)
- **External Dependencies:** `contract-evaluation.job.ts` scheduler
- **Remediates:** C-8

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| Grace window expires while user is offline | `sweepExpiredGrace` cron pass | Resolves to waived/executed based on last-known compliance state, no manual trigger needed | User sees resolved outcome next time they open the app |
| Grace-period sweep misses a violation due to job downtime | Stateless query re-run every cycle (`grace_expires_at < NOW()`) | Self-healing on next successful run — no state is lost by a missed cycle | Outcome resolved on next successful sweep, same as if no downtime occurred |
| Two evaluation-job workers race on the same expired-grace violation | Terminal-state write is idempotent (once `waived`/`executed`, sweep query no longer selects it) | Second worker's pass is a no-op | None — resolved transparently |

---

## Open Questions

None — sweep logic and its self-healing property are fully specified and tested.

---

## Definition of Done

- [x] `sweepExpiredGrace` runs every evaluation cycle and resolves every violation with an expired `grace_expires_at` to a terminal state (`waived` or `executed`)
- [x] `grace_used` is set to `true` on both waive and execute outcomes, never left `null`
- [x] `executePenalty` reused across all call sites (immediate, sweep, dispute-reversal) — no duplicated penalty logic
- [x] Sweep is stateless and self-healing across missed cycles
- [x] `sweepExpiredGrace` coverage: every expired-grace violation reaches a terminal `penalty_status` (unit + integration tests)

---

*Story S16.7.1 | Epic E16 | Product: Balencia Platform*
