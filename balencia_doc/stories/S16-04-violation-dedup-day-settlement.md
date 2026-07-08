---
type: story
id: S16.2.2
title: Per-Day Violation Dedup & Day-Settlement Gate
epic: E16
epic_name: Accountability Contract Hardening, Witness Verification & Analytics Engine
feature: F16.2
feature_name: Objective Metric Resolution
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S16.2.2: Per-Day Violation Dedup & Day-Settlement Gate

## User Story

**As a** user with a signed accountability contract,
**I want to** a single bad day to produce at most one violation, and to have my whole local day to correct course before anything becomes final,
**So that** one missed morning doesn't spiral into five violations by dinner and I'm never penalized before I've had a fair chance to fix it.

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

**Remediates:** C-3 (no per-day dedup — repeat violations/penalties every 2h)

**Problem (pre-remediation):** The evaluation job re-scanned the same rolling window on every cycle (`JOB_INTERVAL_MS = 2 * 60 * 60 * 1000`), so one genuine bad day could produce up to ~12 duplicate violations — and re-execute the associated penalty — over a single 24-hour period.

**What shipped:**
- Atomic, race-safe per-day dedup in `recordViolation` (`accountability-contract.service.ts:920-954`), guarded by a `NOT EXISTS` subquery scoped to the same user-local calendar day:
```sql
INSERT INTO accountability_contract_violations (...)
SELECT ...
WHERE NOT EXISTS (
  SELECT 1 FROM accountability_contract_violations
  WHERE contract_id = $1
    AND [same user-local calendar day, timezone-aware via $7]
)
```
- The evaluation job (`contract-evaluation.job.ts`) still runs every 2 hours, but a companion **day-settlement gate** (`getUserTimezone` + `getLocalHour` + `isDaySettled`, default settlement threshold 21:00 local) means checks are still written intra-day for visibility, but a violation only becomes **final** once the user's local day has settled — an early-morning miss can't lock in a penalty before the user has had the whole day to correct course.
- The dedup guard is timezone-aware (`$7` parameter), not a naive UTC-day boundary, so the "same day" comparison matches the user's actual lived day.

---

## Acceptance Criteria

```gherkin
Scenario: One bad day produces exactly one violation
  Given a contract that fails its condition on a given local calendar day
  When the evaluation job runs its full set of 2-hour cycles across that day
  Then exactly one violation row is recorded for that contract for that day

Scenario: Same-day re-evaluation is a no-op
  Given a violation was already recorded for a contract on the current local day
  When the 2-hour evaluation cycle re-evaluates the same failing condition
  Then the INSERT no-ops via the NOT EXISTS guard and no duplicate violation is created
  And no repeat penalty execution occurs

Scenario: Early-morning failure is not finalized before the day settles
  Given a condition check fails at 6am local time
  And the day-settlement threshold is 21:00 local
  When the evaluation job runs at 6am
  Then a visible intra-day check is recorded but no violation is finalized
  When the same condition still fails after 21:00 local
  Then the violation is finalized at that point

Scenario: User corrects course before day settlement
  Given a condition check failed earlier in the local day
  When the user's behavior satisfies the condition before the 21:00 local settlement threshold
  Then no violation is finalized for that day
```

---

## Success Metrics

- Violations per bad day per contract: ≤ 1 (down from up to ~12 in a 24h cycle at 2h intervals)
- Duplicate-violation insert attempts blocked by `NOT EXISTS` guard: verified via constraint test
- Race condition between concurrent job workers producing duplicate violations: 0 (atomic insert)

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| `sweepExpiredGrace`/violation insert path stays within the 2h job window | Dedup guard is atomic at the SQL level, not application-level (race-safe across concurrent workers) | Timezone resolution reads only the authenticated user's own preference row | N/A (backend fix) | Job cadence (`JOB_INTERVAL_MS = 2h`) unchanged |

---

## Dependencies

- **Prerequisite Stories:** S16.2.1 (evaluator must produce a correct verdict before dedup matters)
- **Related Stories:** S16.7.1 (grace sweep reads this same violation record), S16.1.1 (violation_count drives lifecycle transitions)
- **External Dependencies:** `contract-evaluation.job.ts` scheduler, user timezone preference (see `project_timezone_split_users_vs_prefs`)
- **Remediates:** C-3

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| Same-day re-evaluation on the 2h cycle | `NOT EXISTS` dedup guard | Insert no-ops, no duplicate violation, no repeat penalty execution | None — user already notified once for that day |
| Two evaluation-job workers race on the same contract in the same cycle | Atomic `INSERT ... WHERE NOT EXISTS` at the DB level | Only one insert succeeds; the other is a no-op, not an error | None — resolved transparently |
| User's timezone preference is missing/stale | `getUserTimezone` fallback | Falls back to a safe default rather than crashing the job cycle | None — day-settlement still proceeds with best-available timezone |
| Condition still failing exactly at the 21:00 local boundary | `isDaySettled` boundary check | Deterministic: settlement is evaluated on the next cycle that observes local time ≥ threshold | Violation finalized on that next cycle, not retroactively |

---

## Open Questions

- Known, unfixed gap (explicitly deferred, not an oversight): evaluation windows are still UTC-rolling (`NOW() - N days`), not user-local calendar-day boundaries, for the underlying metric window itself (distinct from the day-settlement gate, which IS local-timezone-aware). Tracked as Post-MVP v1.1 rework.

---

## Definition of Done

- [x] `recordViolation` is idempotent per user-local calendar day per contract (atomic `NOT EXISTS` guard)
- [x] Day-settlement gate delays violation finalization until the user's local day has settled (default 21:00 local)
- [x] Intra-day checks still recorded and visible even when not yet finalized
- [x] `recordViolation` dedup constraint test passing
- [x] Prod violation-rate monitoring confirms ≤1 violation/day/contract
- [x] No dead code, no console logs

---

*Story S16.2.2 | Epic E16 | Product: Balencia Platform*
