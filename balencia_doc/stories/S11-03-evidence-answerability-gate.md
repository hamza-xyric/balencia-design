---
type: story
id: S11.3.1
title: Evidence & Answerability Gate (Cross-System Axes)
epic: E11
epic_name: SIA Cognitive OS & Provenance
feature: F11.3
feature_name: Evidence & Answerability Gate (Wave 0)
product: yhealth-platform
priority: P0
status: In Progress
created: 2026-07-08
---

# S11.3.1: Evidence & Answerability Gate (Cross-System Axes)

## User Story

**As a** Trust-First User,
**I want to** have the coach blocked from sounding confident about something it has no real cross-system evidence for,
**So that** its confident answers are always backed by actual agreement across my data, not by one engine's optimistic guess that another engine would have scored differently.

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

**What shipped:** cross-system axis unification. Before this feature, the confidence engine and the pre-response answerability gate each computed their own version of three shared confidence axes — multi-system agreement, historical pattern strength, and predictive reliability — from the same underlying signals (LCM edges, cross-pillar contradictions, prediction accuracy). Wave 0 extracts one pure, deterministic helper both engines now call, so evidentiary strength is scored identically everywhere it matters.

**Single source of truth** (`server/src/services/confidence/cross-system-axes.util.ts`) — pure, no I/O, no `Date.now`, extracted verbatim from what previously lived inline in both `confidence-engine.service.ts` and `answerability-engine.service.ts`:

```typescript
export interface CrossSystemSignals {
  lcm: { edges: Array<{ domainA: string; domainB: string; confidence: number; evidenceCount: number }>;
         nodesWithData: string[] };
  contradictions: Array<{ pillarA: string; pillarB: string; severity: string }>;
  prediction: { overallAccuracy: number; totalTracked: number };
}

export interface CrossSystemAxes {
  multiSystemAgreement: ConfidenceAxis;
  historicalPattern: ConfidenceAxis;
  predictiveReliability: ConfidenceAxis;
}
```

**Real thresholds:**
- `multiSystemAgreement`: scored only when **≥2 of 3 systems** (LCM edges, LCM nodes-with-data, contradictions) are present in the touched-domain scope; otherwise `score: null` with `reason: "Fewer than 2 systems have cross-domain data here"`. When scored, it's edge-confidence average minus a 0.25 penalty per high/critical-severity contradiction.
- `historicalPattern`: scored only when touched LCM edges exist; each edge contributes `evidenceCount / 10` (clamped 0-1); otherwise `null` with `reason: "Not enough cross-domain history learned yet"`.
- `predictiveReliability`: scored only when **≥7 tracked predictions** exist (`totalTracked >= 7`); otherwise `null` with `reason: "Fewer than 7 tracked predictions"`.

**Consumers:** `confidence/confidence-engine.service.ts`, `confidence/confidence-signals.service.ts` (post-response confidence), `reasoning/answerability-engine.service.ts`, `reasoning/discovery-gate.service.ts` (pre-response gate), `intelligence/turn-intelligence.service.ts` (per-turn memoized provider feeding both).

**Rollout flag:** `ENABLE_GATE_CROSS_SYSTEM` — **defaults OFF**. The axis unification is live (both engines already call the same helper), but feeding the unified axes into the pre-response answerability gate's **blocking decision** is gated behind this flag — the gate does not yet block live answers on cross-system evidence in production.

**Flexibility modes:**

| Mode | Experience |
|------|------------|
| Light | Entirely invisible — the axis unification runs identically regardless of user tier; effect experienced only once the gate-feed flag is enabled. |
| Deep | Axes (with reasons for `null`) inspectable via the confidence breakdown in coaching responses and the Memory Explorer's confidence/provenance fields (F11.7) once `ENABLE_GATE_CROSS_SYSTEM` is enabled. |

---

## Acceptance Criteria

```gherkin
Scenario: Confidence engine and answerability gate agree on axis scores
  Given the same touched-domain scope and underlying signals for one turn
  When both the confidence engine and the answerability gate compute their axes
  Then they produce byte-identical scores by construction (same shared helper)

Scenario: Multi-system agreement returns honest null with too few systems
  Given fewer than 2 of [LCM edges, LCM nodes-with-data, contradictions] have data in scope
  When crossSystemAxes() is computed
  Then multiSystemAgreement.score is null with reason "Fewer than 2 systems have cross-domain data here"

Scenario: Historical pattern returns honest null with no touched edges
  Given zero LCM edges touch the turn's domains
  When crossSystemAxes() is computed
  Then historicalPattern.score is null with reason "Not enough cross-domain history learned yet"

Scenario: Predictive reliability returns honest null below the tracking threshold
  Given fewer than 7 tracked predictions exist
  When crossSystemAxes() is computed
  Then predictiveReliability.score is null with reason "Fewer than 7 tracked predictions"

Scenario: Axes are memoized once per turn
  Given multiple stages within one turn need the cross-system axes
  When the turn-intelligence service provides them
  Then they are computed once and reused, not recomputed per consumer

Scenario: Gate-feed remains dormant until explicitly enabled
  Given ENABLE_GATE_CROSS_SYSTEM defaults to OFF
  When a live turn is processed
  Then axis computation still runs, but the answerability gate does not yet block the answer based on it
```

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Axis-scoring consistency | 100% agreement between confidence engine and answerability gate axis scores for the same turn | Unit test (`cross-system-axes.util.test.ts`) — same input, same output by construction |
| Null-honesty rate | Axes correctly return `null` (not a fabricated low score) when evidence thresholds aren't met | Boundary tests at `presentSystems<2`, `totalTracked<7`, zero touched edges |
| Gate-feed readiness | Live-PG E2E latency/mode check passes before flag flip | Tracked as exit criterion T9 in the SIA vNext tracker |
| Answer-blocking precision (once enabled) | Gate blocks confident answers only when axes are genuinely absent, not merely low | Post-enable A/B on answer-block rate vs. user-reported "coach seemed unsure without reason" |

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| <5ms axis computation (pure, no I/O) | Server-side only; no client-exposed axis internals unless via authorized Memory Explorer | No new PII | N/A | Backend only; consumed by confidence engine + gate |
| Per-turn memoization avoids redundant compute | | | | |

---

## Dependencies

- **Prerequisite Stories:** S11.1.1 (whole-life domains this axis scope reasons over), S11.4.1 (contradictions data shared with `multiSystemAgreement`)
- **Related Stories:** S11.5.1 (`answerabilityAnalysis`/`confidenceAnalysis` stages audited against this feature's axes), S11.6.1 (Confidence Controller consumes axis output), S11.6.2 (Answerability Recovery Controller consumes gate degradation)
- **External Dependencies:** LCM / Epic 14 (edges/nodes/evidence counts), E08 F8.1 (Pattern Correlation), E08 F8.2 (Predictive Insights)

---

## Edge Cases & Errors

| Scenario | Expected Behavior |
|----------|-------------------|
| Fewer than 2 cross-system data sources present | `multiSystemAgreement.score = null`, explicit reason recorded; no confidence claim implied |
| No LCM edges touched for this turn's domains | `historicalPattern.score = null`; coach doesn't cite "historical pattern" as evidence |
| Fewer than 7 tracked predictions | `predictiveReliability.score = null`; coach doesn't cite prediction-accuracy confidence |
| Gate-feed flag enabled without live-PG E2E validation | Flag remains OFF by default; enabling requires the T9 exit criterion — operational safeguard |

---

## Open Questions

- Live-PG E2E latency/mode validation (tracker item T9) has not yet been executed — required before flipping `ENABLE_GATE_CROSS_SYSTEM` to `true` in any environment.

---

## Definition of Done

- [x] `crossSystemAxes()` extracted as pure function with no duplicated logic remaining inline in either engine
- [x] Both confidence engine and answerability gate call the identical helper for A2/A3/A4 axes
- [x] Each axis returns `score: null` with an explicit human-readable `reason` when its evidence threshold isn't met (never a fabricated placeholder score)
- [x] Per-turn memoized provider (`turn-intelligence.service.ts`) avoids recomputing axes multiple times within one turn
- [x] `ENABLE_GATE_CROSS_SYSTEM` flag gates the gate-feed behavior specifically (not the axis computation itself, which is always live)
- [ ] Live-PG E2E latency/mode validation completed before flipping `ENABLE_GATE_CROSS_SYSTEM` to `true` anywhere (tracked, not yet executed — T9)

---

*Story S11.3.1 | Epic E11 | Product: Balencia Platform*
