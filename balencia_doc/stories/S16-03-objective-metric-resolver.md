---
type: story
id: S16.2.1
title: Objective Metric Resolver & Evaluator Correctness
epic: E16
epic_name: Accountability Contract Hardening, Witness Verification & Analytics Engine
feature: F16.2
feature_name: Objective Metric Resolution
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S16.2.1: Objective Metric Resolver & Evaluator Correctness

## User Story

**As a** user with a signed accountability contract,
**I want to** a violation only ever be recorded if I actually failed the condition — using the same canonical data the rest of the app already tracks about me,
**So that** a workout I actually logged doesn't get treated as a no-show and my contract verdict is trustworthy.

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

**Remediates:** C-1 (evaluators silently pass regardless of behavior), C-2 (enforcement reads near-empty `activity_events`, not canonical `workout_logs`), Arch-3 (no shared objective-first metric-resolution module)

**Problem (pre-remediation):** Three of five condition evaluators always resolved "pass" regardless of actual user behavior: sleep evaluation queried the wrong JSON column (`data->>'duration_hours'` instead of the real `value` field), calorie evaluation averaged per-meal rather than per-day, "missed goal" conditions were never falsifiable by construction, and non-gym-session activity types were cast against the wrong enum. Separately, the enforcement path read from `activity_events` — a near-empty table whose only writer was a manual leaderboard form — while the real workout-logging flow wrote to `workout_logs`, meaning users who logged workouts normally could still be falsely violated.

**What shipped:**
- A new shared resolver, `server/src/services/metric-resolver.service.ts` (singleton `metricResolver`), with methods `avgSleepHours`, `latestRecovery`, `avgDailyCalories`, each returning `{ value: number | null; source: 'daily_health_metrics' | 'health_data_records' | 'meal_logs' | 'none' }`.
- Resolution order is rollup-first: deterministic `daily_health_metrics` analytics rollup → raw `health_data_records`/`meal_logs` fallback → `none`. The resolver deliberately never reads `daily_analysis_reports` (LLM-derived narrative) — deterministic enforcement is never backed by an LLM's summary.
- Rewritten `evaluateMissedActivity` (`accountability-contract.service.ts:737-789`) now sums completed workouts from **both** the canonical `workout_logs` table (`status = 'completed'`) and the manual `activity_events` stream.
- Sleep evaluation now reads the correct value field; calorie evaluation now averages per calendar day, not per meal.
- `metric-resolver.service.ts` is the single call path for sleep/recovery/calorie data in both the contract evaluator and the trigger service — no divergent parallel resolution.

---

## Acceptance Criteria

```gherkin
Scenario: Missed-activity evaluator fails correctly on genuine no-show
  Given a user with no completed workouts and no activity_events for the evaluation window
  When the missed_activity evaluator runs
  Then it returns passed: false with evidence naming the source it checked

Scenario: Workout logged via canonical flow is not falsely violated
  Given a user who logged a completed workout via workout_logs only (not activity_events)
  When the missed_activity evaluator runs
  Then it returns passed: true

Scenario: Sleep evaluator reads the real value field
  Given a daily_health_metrics row with sleep hours stored under the actual "value" field
  When the sleep_deficit evaluator runs
  Then it correctly reads that value, not a nonexistent JSON key

Scenario: Calorie evaluator averages per day, not per meal
  Given a user logged 3 meals in one day totaling 2400 calories
  When the calorie_exceeded evaluator runs against a 2000-calorie daily threshold
  Then it evaluates against the 2400 daily total, not an average of 3 individual meal totals

Scenario: Evaluator never sources deterministic enforcement from LLM narrative
  Given a user has both daily_health_metrics rows and daily_analysis_reports rows for the window
  When any evaluator resolves a metric
  Then it never reads daily_analysis_reports as its source
```

---

## Success Metrics

- Evaluators that always resolve "pass" regardless of input: 0 (down from 3 of 5)
- False violations for users logging via the canonical workout flow: 0 (down from systematic false positives)
- Evaluation source correctly attributed in `evidence`: 100% (every evaluator result includes `source` field from `metric-resolver`)

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Contract evaluation cycle completes within the 2h job window for the full active-contract set | Resolver never trusts client-supplied metric values | Reads only the authenticated user's own health/behavior rows | N/A (backend fix) | No breaking change to `EvaluationResult` shape |

---

## Dependencies

- **Prerequisite Stories:** None (foundational to enforcement correctness)
- **Related Stories:** S16.2.2 (dedup on top of this evaluator output), S16.3.1 (shares the resolver's honest-null contract)
- **External Dependencies:** Epic 05 (Fitness Pillar) `workout_logs`, Epic 09 (Data Integrations) `daily_health_metrics`
- **Remediates:** C-1, C-2, Arch-3

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| Evaluator throws mid-evaluation | try/catch around evaluator call | `evidence: { error: 'evaluation_failed' }`, `passed: true` (fail-safe, never penalize on a system error) | None — silent fail-safe, logged for engineering |
| Unknown/unsupported condition type reaches evaluator | Switch/dispatch falls through | `evidence: { reason: 'unknown_condition_type' }`, no violation recorded | None — contract remains in current state |
| Condition window hasn't elapsed since signing ("ramp-in") | Elapsed time check | `evidence: { reason: 'ramp_in' }`, skipped | None — contract not yet evaluable |
| Resolver's primary rollup table has a gap but raw data exists | `daily_health_metrics` empty for the window | Falls back to `health_data_records`/`meal_logs` before declaring `none` | None — resolved transparently |

---

## Open Questions

- The Analytics Engine (F16.9)'s `MetricRegistry` intentionally reads the same canonical tables through a separate code path — confirm in code review this never merges with `metric-resolver` to keep enforcement and exploratory analytics structurally isolated (see S16.9.1).

---

## Definition of Done

- [x] All five condition evaluators produce a real `passed: false` on a genuine failure case in tests, not just success cases
- [x] Sleep evaluation reads the correct value field
- [x] Calorie evaluation averages per calendar day, not per meal
- [x] `missed_activity` sums both `workout_logs` (canonical) and `activity_events` (manual)
- [x] `metric-resolver.service.ts` is the single call path for sleep/recovery/calorie data
- [x] Evaluator never reads `daily_analysis_reports` as a deterministic enforcement source
- [x] Evaluator unit-test matrix: fail case produces `passed: false` for every condition type
- [x] Integration tests passing against real Postgres

---

*Story S16.2.1 | Epic E16 | Product: Balencia Platform*
