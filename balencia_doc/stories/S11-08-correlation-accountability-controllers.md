---
type: story
id: S11.6.2
title: Correlation & Accountability Prompt Controllers
epic: E11
epic_name: SIA Cognitive OS & Provenance
feature: F11.6
feature_name: Intelligence Prompt Controllers (Wave 2)
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S11.6.2: Correlation & Accountability Prompt Controllers

## User Story

**As a** Whole-Life Optimizer,
**I want to** have the coach's root-cause reasoning, forecasts, and accountability nudges visibly change based on real cross-pillar evidence and my due commitments,
**So that** its behavior earns my trust instead of offering generic encouragement or fabricated causal claims.

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

**What shipped:** the remaining four of the eight Wave 2 controllers — the ones that compose cross-pillar reasoning and accountability signals into concrete pre-generation directives.

| Controller | File | Behavior |
|---|---|---|
| **Accountability Prompt Controller** | `server/src/services/intelligence/accountability-prompt-controller.service.ts` | Converts due-commitment reminders into blocker-oriented coaching directives ("what's actually in the way?") instead of generic nagging |
| **Life Correlation Controller** | `server/src/services/intelligence/life-correlation-controller.service.ts` | Converts high-confidence LCM edges + contradictions into root-cause reasoning directives — hypotheses, never fabricated causal claims |
| **Predictive Response Controller** | `server/src/services/intelligence/predictive-response-controller.service.ts` | Governs confident-forecast vs. hedge language based on live prediction-accuracy telemetry (needs ≥7 tracked predictions to speak confidently) |
| **Root-Cause Prompt Controller** | `server/src/services/intelligence/root-cause-prompt-controller.service.ts` | Composes the Life Correlation + Predictive controllers into one unified directive, with a 700ms fail-open timeout |

**Root-Cause composition and fail-open:**
```typescript
// server/src/services/intelligence/root-cause-prompt-controller.service.ts
enabled = process.env.ENABLE_LCM_ROOT_CAUSE !== 'false',   // defaults ON
timeoutMs = 700,                                            // fail-open bound
```
Composes Life Correlation + Predictive Response controller output into one directive; if composition exceeds 700ms, it fails open (returns no directive) rather than blocking the turn.

**Flag-gating status (as-shipped):**

| Controller | Flag | Default |
|---|---|---|
| Accountability Prompt Controller | `ENABLE_ACCOUNTABILITY_CONTROLLER` | OFF |
| Root-Cause Prompt Controller | `ENABLE_LCM_ROOT_CAUSE` | **ON** (reviewer recommended OFF) |
| Life Correlation Controller | *(gated indirectly via Root-Cause composition)* | Follows `ENABLE_LCM_ROOT_CAUSE` |
| Predictive Response Controller | *(gated indirectly via Root-Cause composition)* | Follows `ENABLE_LCM_ROOT_CAUSE` |

`ENABLE_LCM_ROOT_CAUSE` defaulting ON is a tracked rollout-safety gap against the reviewer's explicit recommendation of default-OFF for a dark first deploy.

**Fault isolation:** the Accountability Prompt Controller call is fault-isolated from the rest of the turn (a failure there cannot take down the whole response) — an explicit fix applied during the Wave 2 review pass.

**Flexibility modes:**

| Mode | Experience |
|------|------------|
| Light | Controllers operate invisibly — the user experiences a confident forecast when the coach has a track record, or a hedge when it doesn't. |
| Deep | Root-cause hypothesis framing and prediction-reliability language are directly visible in the response text itself. |

---

## Acceptance Criteria

```gherkin
Scenario: Accountability controller converts due commitments into blocker-oriented directives
  Given a user has a due or overdue accountability commitment
  When the Accountability Prompt Controller composes its directive (flag ON)
  Then the coach asks about the actual blocker, not a generic reminder

Scenario: Life Correlation controller frames root causes as hypotheses
  Given high-confidence LCM edges and contradictions exist for the touched domains
  When the Life Correlation Controller composes its directive
  Then the resulting reasoning is framed as a hypothesis, never a fabricated causal claim

Scenario: Predictive Response controller gates confident forecasts on track record
  Given fewer than 7 tracked predictions exist for the user
  When the Predictive Response Controller composes its directive
  Then it falls back to hedge language instead of a confident forecast

Scenario: Root-Cause controller composes within its fail-open bound
  Given Life Correlation and Predictive Response composition normally completes quickly
  When composition exceeds 700ms
  Then the Root-Cause controller fails open — no directive is added, and the turn proceeds normally

Scenario: Accountability controller failure does not cascade
  Given the Accountability Prompt Controller throws during composition
  When the turn proceeds
  Then it is not marked failed_contract for this alone, and no visible degradation reaches the user

Scenario: Root-Cause default is ON against reviewer recommendation
  Given ENABLE_LCM_ROOT_CAUSE has not been explicitly set
  When the controller pipeline runs
  Then the Root-Cause, Life Correlation, and Predictive Response controllers are live by default (tracked rollout-safety gap)
```

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Predictive confidence gating | Predictive Response Controller never issues a confident forecast with <7 tracked predictions | `predictive-response-controller.service.test.ts` |
| Fail-open latency bound | Root-Cause composition never blocks a turn beyond 700ms | `root-cause-prompt-controller.service.test.ts` |
| Fault isolation | Accountability controller failure never produces a `failed_contract` or blocks the response | Turn-contract regression test on plain stream turns |
| Directive reach rate | Root-cause and accountability directives provably present in prompt-facing text when preconditions are met | `turn-intelligence-pipeline.integration.test.ts` |

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Root-Cause composition ≤700ms fail-open bound | Accountability controller fault-isolated | No new PII | N/A | Stream-vs-non-stream parity verified for accountability directive |

---

## Dependencies

- **Prerequisite Stories:** S11.4.1 (accountability risk + due commitment data source), S11.3.1 (confidence/answerability signal source for Predictive Response)
- **Related Stories:** S11.5.1 (the auditor validating this feature's participation), S11.6.1 (sibling controllers composed in the same Wave 2 pipeline)
- **External Dependencies:** LCM / Epic 14 (root-cause/life-correlation data source), Commitment Contract system (accountability/due-commitment source)

---

## Edge Cases & Errors

| Scenario | Expected Behavior |
|----------|-------------------|
| Root-cause composition exceeds 700ms | Fails open — no root-cause directive added, turn proceeds normally |
| Accountability controller throws | Fault-isolated call boundary catches the error; turn continues without the accountability directive |
| Confidence <7 tracked predictions but forecast requested | Falls back to hedge language: "Early days on prediction accuracy for you — take this as a rough estimate" |

---

## Open Questions

- `ENABLE_LCM_ROOT_CAUSE` defaults to ON against the reviewer's explicit recommendation of default-OFF for a dark first deploy — flag-default decision not yet finalized.

---

## Definition of Done

- [x] Accountability, Life Correlation, Predictive Response, and Root-Cause controllers implemented and unit-tested (Accountability: 4+; Life Correlation: 4; Predictive Response: 4; Root-Cause: 5)
- [x] Root-Cause controller composes Life Correlation + Predictive Response with 700ms fail-open bound
- [x] Accountability, root-cause directives verified present in prompt-facing text via integration test (not just unit-level)
- [x] Accountability controller call fault-isolated (cannot cascade-fail the turn)
- [x] Stream-vs-non-stream parity verified for accountability directive (present at both call sites)
- [ ] `ENABLE_LCM_ROOT_CAUSE` default changed to OFF per reviewer recommendation (currently defaults ON — tracked rollout-safety gap)

---

*Story S11.6.2 | Epic E11 | Product: Balencia Platform*
