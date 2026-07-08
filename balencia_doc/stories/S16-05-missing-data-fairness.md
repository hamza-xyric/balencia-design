---
type: story
id: S16.3.1
title: Missing-Data Fairness & Low-Recovery Guardrail
epic: E16
epic_name: Accountability Contract Hardening, Witness Verification & Analytics Engine
feature: F16.3
feature_name: Missing-Data Fairness
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S16.3.1: Missing-Data Fairness & Low-Recovery Guardrail

## User Story

**As a** user whose wearable didn't sync last night,
**I want to** the system to recognize it doesn't actually know what happened, rather than either penalizing me for "failing" a condition it can't verify or falsely congratulating me for "passing" one it never checked,
**So that** missing data is never treated as a verdict.

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

**Remediates:** C-4 (missing data scored as failure or masked as pass), R-1 (vulnerable-user harm vectors — training through fatigue, etc.)

**Problem (pre-remediation):** Missing wearable or behavior data used to be treated as a verdict rather than an absence of information — in some evaluator paths it silently scored as `0` and triggered a penalty (fail-closed), and in others it fell through the C-1 bug and silently passed regardless (fail-open). Neither is fair: a user who forgot to charge their WHOOP overnight is not the same as a user who skipped their workout.

**What shipped:** an explicit, honest-null contract running through every evaluator — **no data means no verdict**, never a substitute for one:

| Path | `evidence.reason` | Meaning |
|---|---|---|
| Ramp-in guard | `ramp_in` | Condition window hasn't fully elapsed since signing |
| Unknown condition type | `unknown_condition_type` | Evaluator dispatch found nothing to check |
| Evaluator exception | `evaluation_failed` (via `error`) | System error, never a silent pass-through disguised as success |
| Unsupported metric on `missed_activity` | `unsupported_metric` | Metric requested isn't wired to this condition type |
| **Safety guardrail** | `low_recovery_rest` | WHOOP recovery `< 34` → missed-activity evaluator explicitly SKIPS rather than penalizes a rest day the body needed |

- `metric-resolver.service.ts` returns `{ value: null, source: 'none' }` on no data in every method (never throws, never fabricates a value) — documented in its own header as existing "so callers can skip rather than penalise missing data."
- The `low_recovery_rest` guardrail is a deliberate **ethics** decision, not just a data-completeness one: if the user's most recent WHOOP recovery is critically low (`< 34`), the missed-activity evaluator never penalizes a missed workout — it prevents the contract system from pressuring a user to train through fatigue their own recovery data says they shouldn't.
- Insufficient-data days do not count toward `at_risk` escalation or the 3-clean-day recovery counter — truly neutral, neither helps nor hurts.
- Deep Mode check-history UI renders "Insufficient data" distinctly from both "Passed" and "Violated," with the structured reason surfaced.

---

## Acceptance Criteria

```gherkin
Scenario: No wearable data produces no verdict
  Given a user's wearable did not sync for the evaluation window
  When the relevant evaluator runs
  Then it returns insufficientData: true, passed: true, confidence: 0
  And evidence.reason is "no_data"
  And no violation is recorded

Scenario: Critically low recovery skips missed-activity penalty
  Given a user's latest WHOOP recovery score is below 34
  And the user has no completed workout logged for the window
  When the missed_activity evaluator runs
  Then it returns insufficientData: true with evidence.reason "low_recovery_rest"
  And no violation is recorded

Scenario: Insufficient-data day is neutral to streak/escalation math
  Given a contract has an insufficient-data day recorded
  When at_risk escalation or the 3-clean-day recovery counter is evaluated
  Then that day neither counts as a clean day nor as a violation day

Scenario: Deep Mode surfaces insufficient-data distinctly
  Given a check history entry with insufficientData: true
  When the Deep Mode contract view renders check history
  Then that entry displays as "Insufficient data", visually distinct from "Passed" and "Violated"

Scenario: Resolver never fabricates a value
  Given no data exists in any of the resolver's fallback sources for a metric
  When metricResolver.<method> is called
  Then it returns { value: null, source: 'none' } without throwing
```

---

## Success Metrics

- Missing-data days scored as a penalty: 0 (down from a fail-closed subset pre-fix)
- Missing-data days silently scored as a pass with no evidence trail: 0 (down from a fail-open subset pre-fix via C-1)
- Missed-activity violations recorded during critically low recovery (`<34`): 0
- Deep Mode check-history entries correctly labeled "Insufficient data" vs pass/fail: 100%

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Resolver fallback chain resolves within the same evaluation cycle budget | No fabricated values ever reach the enforcement path | Recovery score read only from the authenticated user's own WHOOP data | "Insufficient data" state uses text label, not color-only | Shared `EvaluationResult.evidence` shape, additive fields only |

---

## Dependencies

- **Prerequisite Stories:** S16.2.1 (shares the resolver and evaluator this fairness contract wraps)
- **Related Stories:** S16.6.2 (SIA context injection reads `insufficientData` history so it never coaches around a data gap disguised as a violation)
- **External Dependencies:** Epic 09 (Data Integrations) — WHOOP/wearable sync reliability directly determines how often the honest-null path fires
- **Remediates:** C-4, R-1

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| Wearable never synced for the evaluation window | `metric-resolver` returns `value: null` | Evaluator returns `insufficientData: true`, no verdict recorded | None — contract state unaffected |
| User's recovery is critically low (<34) on a missed-activity check | Latest recovery query | Evaluator skips, `evidence.reason: 'low_recovery_rest'` | None — no penalty message sent |
| Resolver's primary rollup table has a gap but raw data exists | `daily_health_metrics` empty for the window | Falls back to `health_data_records`/`meal_logs` before declaring `none` | None — resolved transparently |
| User disputes a violation, claiming missing data caused it | `disputeViolation` flow | Dispute reviewer can inspect `evidence.source`/`reason` on the original check to verify | Dispute response references the actual evidence trail, not a guess |

---

## Open Questions

None — the honest-null contract is fully specified and shared 1:1 with S16.2.1's resolver.

---

## Definition of Done

- [x] Every evaluator result includes `insufficientData: boolean`, and when true never sets `passed: false`
- [x] `metric-resolver` methods return `{ value: null, source: 'none' }` (never throw, never fabricate) when no data exists
- [x] `missed_activity` evaluator skips when latest WHOOP recovery is `< 34`
- [x] Every skip/insufficient-data path writes a structured `evidence.reason`
- [x] Deep Mode check-history UI renders "Insufficient data" distinctly
- [x] Insufficient-data days are neutral to `at_risk` escalation and 3-clean-day recovery counter
- [x] Regression tests passing (no-wearable-sync → no violation; low-recovery → skip)

---

*Story S16.3.1 | Epic E16 | Product: Balencia Platform*
