---
type: story
id: S11.5.1
title: Turn Intelligence Contract
epic: E11
epic_name: SIA Cognitive OS & Provenance
feature: F11.5
feature_name: Turn Intelligence Contract
product: yhealth-platform
priority: P0
status: In Progress
created: 2026-07-08
---

# S11.5.1: Turn Intelligence Contract

## User Story

**As a** Product/Engineering Owner,
**I want to** have an automated, per-turn structural check that proves every computed intelligence signal either did something real in the response or is explicitly flagged as not participating,
**So that** the "compute-but-discard" failure mode can never silently reappear as the system grows.

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

**What shipped:** a pure, deterministic per-turn auditor that tracks every computed intelligence stage (intent detection, memory/profile retrieval, life-correlation analysis, answerability, confidence, risk, prediction, opportunity detection, adaptive planning, recommendation generation, transparency, memory update) and asserts each stage either played a real, attributable role in the response — `controller` (drove a decision), `prompt_evidence` (appeared in the text sent to the LLM), `provenance` (labeled a claim's source), or `learner` (fed memory/profile updates) — or is explicitly recorded as `discarded`, `degraded`, or intentionally `disabled` (with a reason).

**Core contract shape** (`server/src/services/intelligence/turn-intelligence-contract.service.ts`):
```typescript
export const TURN_INTELLIGENCE_STAGES = [
  'intentDetection', 'memoryRetrieval', 'profileRetrieval', 'lifeCorrelationAnalysis',
  'answerabilityAnalysis', 'confidenceAnalysis', 'riskAnalysis', 'predictionGeneration',
  'opportunityDetection', 'adaptivePlanning', 'recommendationGeneration',
  'transparencyObject', 'memoryUpdate',
] as const;

export type TurnSignalStatus = 'not_run' | 'ran' | 'degraded' | 'failed';
export type TurnSignalRole = 'controller' | 'prompt_evidence' | 'provenance' | 'learner';
export type TurnContractStatus = 'ready' | 'degraded' | 'failed_contract';
```
A stage is only counted as genuinely participating (`participatesInReasoning: true`) when its recorded `roles` cover its `REQUIRED_ROLES`; otherwise it is listed in `discardedSignals`. `TurnContractStatus` degrades from `ready` → `degraded` → `failed_contract` based on `STATUS_SEVERITY` merging across all stages.

**Supporting service cluster** (`server/src/services/intelligence/`):

| Service | Purpose |
|---------|---------|
| `turn-contract-runtime-policy.service.ts` | Maps live env flags to `disabledStages` reasons (e.g., `ENABLE_CONFIDENCE_CONTROLLER !== "true"` → `confidenceAnalysis`/`opportunityDetection` disabled) so deliberately dormant controllers are never misclassified as accidental discarded intelligence |
| `turn-contract-metadata-persistence.service.ts` | Writes the assessed contract to `rag_messages.metadata.turnIntelligenceContract` on the scoped assistant message only; non-blocking, degrades silently on DB write failure |
| `turn-contract-observability.service.ts` | Bounded aggregate stage/status/action health with no user/conversation/message/prompt identifiers, exposed via `GET /api/health/premium-intelligence`; alert-routing variant at `GET /api/health/premium-intelligence/alerts` (HTTP 503 reserved for paging-worthy states) |
| `premium-intelligence-rollout-preflight.service.ts` | `npm run intelligence:preflight` checks answerability flags, controller rollout state, semantic-memory readiness, DB schema prerequisites, and recent turn-contract metadata evidence before any flag is flipped ON |
| `turn-contract-live-verifier.service.ts` | `npm run intelligence:verify-turn-contract`, a token-required authenticated live verifier that sends one real RAG chat turn and polls `rag_messages` for the resulting contract metadata |

**Flexibility modes:**

| Mode | Experience |
|------|------------|
| Light | Fully invisible to end users — internal reliability mechanism, runs on every turn regardless of user tier. |
| Deep | Operationally inspectable via `GET /api/health/premium-intelligence` and `/alerts` for engineering/on-call use. |

---

## Acceptance Criteria

```gherkin
Scenario: A stage that fulfills all required roles participates
  Given a stage runs and records roles covering its REQUIRED_ROLES
  When assess() evaluates the turn
  Then participatesInReasoning is true and missingRoles is empty

Scenario: A stage that ran but missed a required role is discarded
  Given a stage's status is 'ran' but its recorded roles do not cover REQUIRED_ROLES
  When assess() evaluates the turn
  Then the stage is added to discardedSignals, not silently ignored

Scenario: A deliberately disabled stage is not misclassified
  Given ENABLE_CONFIDENCE_CONTROLLER is not "true"
  When runtime policy resolves disabled stages
  Then confidenceAnalysis (and opportunityDetection) are marked disabled with an explicit reason and excluded from discardedSignals

Scenario: Contract persistence never blocks the response
  Given the DB write to rag_messages.metadata throws
  When the turn completes
  Then the error is logged and swallowed, and the response is still returned to the user

Scenario: Aggregate observability is PII-free
  Given GET /api/health/premium-intelligence is called
  When the aggregate is returned
  Then it contains no user/conversation/message/prompt identifiers

Scenario: Alert endpoint only pages for genuine problems
  Given GET /api/health/premium-intelligence/alerts is called
  When the underlying state is routine degradation (not paging-worthy)
  Then it does not return HTTP 503

Scenario: Preflight checks all five rollout prerequisites
  Given npm run intelligence:preflight is executed
  When it runs
  Then it checks flags, controller rollout state, semantic-memory readiness, DB schema prerequisites, and recent turn-contract metadata evidence
```

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Discarded-signal detection | 100% of stages missing a required role are flagged, 0 false "discarded" on intentionally-disabled stages | Contract unit tests + runtime-policy tests |
| Contract persistence reliability | Metadata write failures never block the user-facing response | `turn-contract-metadata-persistence.service.test.ts` |
| Rollout-preflight coverage | Preflight catches all 5 rollout prerequisites before flag-flip | `premium-intelligence-rollout-preflight.service.test.ts` |
| Prompt-evidence guard | Root-cause, predictive-outcome, accountability, and provenance directives provably present in prompt-facing text | `turn-intelligence-pipeline.integration.test.ts` |

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Non-blocking metadata persistence | Health endpoints internal/engineering-facing | Zero PII in aggregate observability | N/A | Wired into both LangGraph chat and stream paths |
| No added latency on the user-facing response path | Alert endpoint reserved 503 only for paging states | | | |

---

## Dependencies

- **Prerequisite Stories:** S11.3.1 (axes this contract's `confidenceAnalysis`/`answerabilityAnalysis` stages reference)
- **Related Stories:** S11.6.1, S11.6.2 (the controllers whose participation this contract audits)
- **External Dependencies:** E08 F8.1/F8.2 (source signals for `lifeCorrelationAnalysis`/`predictionGeneration` stages)

---

## Edge Cases & Errors

| Scenario | Expected Behavior |
|----------|-------------------|
| A computed signal never gets a required role fulfilled | Stage added to `discardedSignals`; contract status degrades |
| Controller deliberately disabled via flag | Stage marked `disabled` with explicit reason string, excluded from `discardedSignals` |
| Metadata persistence write fails | Logged, swallowed, response still returned to user |
| Contract reaches `failed_contract` status | Recorded in metadata + observability aggregate; response still generated (contract is an auditor, not a blocker) |

---

## Open Questions

- Live verifier (`npm run intelligence:verify-turn-contract`) has not yet been executed with a real JWT in the target deployment environment.
- Alert endpoint (`/api/health/premium-intelligence/alerts`) is not yet wired into production monitoring/on-call routing.
- DB-backed preflight has not yet been run in the target deployment environment.

---

## Definition of Done

- [x] All 13 turn-intelligence stages defined with explicit required-role sets
- [x] `assess()` correctly computes `participatesInReasoning`, `missingRoles`, `discardedSignals`, `degradedStages` per stage
- [x] Runtime policy distinguishes intentionally-disabled stages (flag OFF) from genuinely discarded intelligence
- [x] Contract metadata persisted to the correct scoped assistant message only, non-blocking on failure
- [x] Aggregate observability endpoint exposes stage/status/action health with zero PII
- [x] Alert endpoint returns HTTP 503 only for genuinely paging-worthy states, not routine degradation
- [x] `npm run intelligence:preflight` checks flags, controller rollout, semantic-memory readiness, DB schema, and recent turn-contract evidence
- [x] `npm run intelligence:verify-turn-contract` provides an authenticated, token-required live verification path
- [ ] Live verifier executed with a real JWT in the target deployment environment (tracked, not yet executed)
- [ ] Alert endpoint wired into the actual production monitoring/on-call routing system (tracked, not yet executed)

---

*Story S11.5.1 | Epic E11 | Product: Balencia Platform*
