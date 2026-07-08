---
type: story
id: S13.7.3
title: Churn Prediction & Re-engagement Nudges
epic: E13
epic_name: Social Growth OS
feature: F13.7
feature_name: Trust & Safety
product: yhealth-platform
priority: P1
status: Done
created: 2026-07-08
---

# S13.7.3: Churn Prediction & Re-engagement Nudges

## User Story

**As a** platform stakeholder,
**I want** at-risk-of-churning users identified deterministically (and optionally via a trained model), with re-engagement nudges gated as an independently-toggleable layer,
**So that** enabling scoring alone never surprise-notifies users, and nudge send behavior can be A/B-validated before full rollout.

---

## Story Type

- [x] Feature
- [ ] Enhancement
- [ ] Technical
- [ ] Integration

## Priority

- [ ] Must Have (P0)
- [x] Should Have (P1)

---

## Scope Description

**Deterministic scorer** (`churn-risk.service.ts`): 4-signal scorer (recency, activity trend, tracking gap, streak loss) → status bands `healthy < 0.4 ≤ cooling < 0.6 ≤ at_risk < 0.8 ≤ critical`, persisted to `user_churn_risk`. This scoring path always runs regardless of any flag.

**ML model swap** (`ENABLE_CHURN_ML`, default off): swaps in a trained logistic-regression model (`churn-model.service.ts`, weights in `churn_model_weights`) for the score itself — the *prediction*, not the action. Training: `POST /churn-risk/model/train` (admin-triggered). Monitoring: `GET /churn-risk/model`, `/admin/churn`.

**Re-engagement nudges** (`ENABLE_CHURN_NUDGES`, default off, **fully independent** of `ENABLE_CHURN_ML`): gates `maybeNudge()` — the actual re-engagement notification, 7-day cooldown, measured via A/B experiment `churn_reengagement`. Job comment confirms the deliberate decoupling: *"Scoring always runs...; the user-facing re-engagement nudge inside the service is separately gated by `ENABLE_CHURN_NUDGES` (default off) so enabling this job alone never surprise-notifies users."*

---

## Acceptance Criteria

```gherkin
Scenario: Deterministic scoring always runs
  Given ENABLE_CHURN_ML and ENABLE_CHURN_NUDGES are both false
  When the daily churn-risk job runs
  Then user_churn_risk is still updated for every active user via the deterministic 4-signal scorer

Scenario: ENABLE_CHURN_ML swaps only the score source
  Given ENABLE_CHURN_ML is true
  When the churn score is computed
  Then the trained logistic-regression model produces the score instead of the deterministic scorer
  But no nudge is sent unless ENABLE_CHURN_NUDGES is also independently true

Scenario: ENABLE_CHURN_NUDGES is independent of ENABLE_CHURN_ML
  Given ENABLE_CHURN_ML is false and ENABLE_CHURN_NUDGES is true
  When a user's deterministic score crosses into 'at_risk' or 'critical'
  Then maybeNudge() sends a re-engagement notification
  Demonstrating the two flags can be toggled independently without either implying the other

Scenario: Nudge cooldown respected
  Given a user received a re-engagement nudge within the last 7 days
  When maybeNudge() evaluates them again
  Then no duplicate notification is sent — the cooldown is checked before send

Scenario: A/B experiment measurement
  Given ENABLE_CHURN_NUDGES is true
  Then nudge-vs-no-nudge is measured via the sticky A/B experiment 'churn_reengagement'
```

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Churn nudge lift (once `ENABLE_CHURN_NUDGES` on) | +8% 14-day re-engagement vs. control | A/B experiment `churn_reengagement` |
| Scoring completeness | 100% of active users scored within the nightly window regardless of flag state | Job instrumentation |

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Daily churn-risk job completes within nightly window | Model training is admin-triggered only (`POST /churn-risk/model/train`), never automatic | Churn risk score visible only to the user's own account context and admins | Nudge notification meets standard accessibility copy guidelines | N/A |
| Nudge cooldown: 7 days (`NUDGE_COOLDOWN_MS`) | | | | |

---

## Dependencies

- **Prerequisite Stories:** None (independent trust/safety sub-layer)
- **Related Stories:** S13.7.2 (shares the trust/safety admin surface pattern)
- **External Dependencies:** `churn_training_samples`, A/B experiment infrastructure (`experimentService`), admin dashboard (`/admin/churn`)

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|--------------------|---------------------|
| Churn nudge would fire twice within cooldown | `NUDGE_COOLDOWN_MS` (7 days) check | Skip send, no duplicate notification | Silent — user simply doesn't get a second nudge |
| `ENABLE_CHURN_ML` enabled without a trained model yet | `churn_model_weights` empty/untrained | Falls back to the deterministic scorer rather than an undefined model output | No user-facing impact |
| `ENABLE_CHURN_NUDGES` enabled while `ENABLE_CHURN_ML` is off | Independent flag evaluation | Deterministic score still drives nudge eligibility correctly — the two flags never implicitly couple | User receives nudges based on the deterministic score, as intended |
| User re-engages between scoring and nudge send | Score recomputed nightly; nudge check re-evaluates current status | If status has improved past the risk band by nudge time, no nudge sent | No user-facing impact — nudge simply doesn't fire |

---

## Open Questions

- **Rollout Status:** `ENABLE_CHURN_ML` and `ENABLE_CHURN_NUDGES` both default `false`. Per the PRD's recommended sequencing, `ENABLE_CHURN_NUDGES` (paired with starting the `churn_reengagement` A/B experiment) is scheduled to flip before `ENABLE_CHURN_ML`, since the deterministic scorer already produces usable risk bands and the priority is validating the user-facing nudge behavior first. `ENABLE_CHURN_ML` is lower-urgency, following once nudge behavior is validated.
- No open build questions — code for all flag combinations (00, 01, 10, 11) is complete and tested.

---

## Definition of Done

- [x] Acceptance criteria met
- [x] Deterministic scoring verified to always run regardless of flag state
- [x] `ENABLE_CHURN_ML` and `ENABLE_CHURN_NUDGES` independence verified in tests (decoupled, neither implies the other)
- [x] 7-day nudge cooldown tested
- [x] A/B experiment stickiness (`churn_reengagement`) tested
- [x] Unit + integration tests green (server suite)
- [ ] Flags flipped in production (pending staged rollout — operational, not a build task)

---

*Story S13.7.3 | Epic E13 | Product: Balencia Platform*
