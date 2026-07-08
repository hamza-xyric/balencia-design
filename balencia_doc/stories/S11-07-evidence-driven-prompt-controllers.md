---
type: story
id: S11.6.1
title: Evidence-Driven Prompt Controllers (Confidence, Transparency, Answerability Recovery)
epic: E11
epic_name: SIA Cognitive OS & Provenance
feature: F11.6
feature_name: Intelligence Prompt Controllers (Wave 2)
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S11.6.1: Evidence-Driven Prompt Controllers

## User Story

**As a** Whole-Life Optimizer,
**I want to** have the coach's confidence and claim language visibly change based on real evidence strength turn-by-turn,
**So that** its behavior earns my trust instead of sounding uniformly assertive regardless of how much it actually knows.

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

**What shipped:** three of the eight Wave 2 controllers — the ones that turn evidence-strength signals directly into pre-generation behavioral directives before the LLM call, not post-hoc annotations.

| Controller | File | Behavior |
|---|---|---|
| **Confidence Controller** | `server/src/services/confidence/confidence-controller.service.ts` | Appends a calibration caveat to low-confidence answers instead of letting the response read as uniformly certain |
| **Transparency Prompt Controller** | `server/src/services/intelligence/transparency-prompt-controller.service.ts` | Governs claim language (measured / derived / stale) pre-generation — the live enforcement arm of Provenance v2 (F11.2) |
| **Answerability Recovery Controller** | `server/src/services/intelligence/answerability-recovery-prompt-controller.service.ts` | Injects a cautious directive when the answerability gate can't confidently score a turn (fail-open via `onDegraded`) |

**Wiring:** all three are wired into `langgraph-chatbot.service.ts` (~335-line diff shared across all 8 controllers) and, for the Answerability Recovery Controller specifically, into `reasoning/discovery-gate.service.ts`'s `onDegraded` hook.

**Flag-gating status (as-shipped):**

| Controller | Flag | Default |
|---|---|---|
| Confidence Controller | *(none)* | **Always on — not flag-gated** |
| Transparency Prompt Controller | *(none)* | **Always on — not flag-gated** |
| Answerability Recovery Controller | *(fires on gate degradation, not a standalone flag)* | Always on when gate degrades |

This is a tracked rollout-safety gap: Confidence and Transparency ship with no runtime kill-switch — a regression in either requires a code deploy to roll back, not a flag flip (`balencia_doc/Missing-Features.md` — "SIA Wave-2 Rollout Safety Gap").

**Flexibility modes:**

| Mode | Experience |
|------|------------|
| Light | Controllers operate invisibly — the user experiences the effect (a hedge when evidence is thin, honest claim language) without any visible controller UI. |
| Deep | Confidence caveats and claim-language distinctions are directly visible in the response text itself — inherently a "Deep" feature since its output is the coaching language. |

---

## Acceptance Criteria

```gherkin
Scenario: Low-confidence answer gets a calibration caveat
  Given the confidence engine scores a turn's confidence as low
  When the Confidence Controller composes its directive
  Then a calibration caveat is appended so the response does not read as uniformly certain

Scenario: Transparency controller governs claim language live
  Given a claim in the response is derived (app-computed) rather than measured
  When the Transparency Prompt Controller composes its directive
  Then the pre-generation directive enforces measured/derived/stale language per F11.2's labeling rules

Scenario: Answerability gate degradation triggers a cautious directive
  Given the answerability gate cannot confidently score a turn (discovery-gate onDegraded fires)
  When the Answerability Recovery Controller runs
  Then it injects a cautious directive and the coach hedges explicitly rather than answering with false confidence

Scenario: Controllers are fault-isolated
  Given one controller throws during composition
  When the turn proceeds
  Then the turn is not aborted — the failure is recorded on that stage only

Scenario: Flags-off behavior is byte-identical to baseline
  Given no Wave 2 controller flags are set
  When a turn is processed
  Then the observable response behavior matches the pre-Wave-2 baseline exactly (independently re-verified by Opus review)
```

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Directive reach rate | Provenance directives provably present in prompt-facing text when preconditions are met | `turn-intelligence-pipeline.integration.test.ts` |
| Byte-identical flags-off behavior | 0 behavior change when a controller's flag is OFF vs. pre-Wave-2 baseline | Opus-reviewed re-verification: "byte-identical when flags off" |
| Fail-open on gate degradation | Answerability Recovery Controller injects a directive on every `onDegraded` fire, never silently no-ops | `answerability-recovery-prompt-controller.service.test.ts` |

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Each controller fault-isolated — cannot cascade-fail the turn | No runtime kill-switch for Confidence/Transparency (tracked gap) | No new PII | N/A | Stream-vs-non-stream parity verified |

---

## Dependencies

- **Prerequisite Stories:** S11.3.1 (confidence/answerability signal source), S11.2.1 (transparency labeling rules this feature enforces live)
- **Related Stories:** S11.5.1 (the auditor validating this feature's participation), S11.6.2 (sibling controllers composed in the same Wave 2 pipeline)
- **External Dependencies:** None beyond the above

---

## Edge Cases & Errors

| Scenario | Expected Behavior |
|----------|-------------------|
| Gate degrades mid-turn (can't score answerability) | Answerability Recovery Controller injects cautious directive; coach hedges explicitly |
| Confidence Controller throws | Fault-isolated; turn continues, stage marked `failed` |
| Confidence/Transparency controllers ship unflagged and a regression appears | Requires a code deploy to roll back (no runtime kill-switch) — tracked as rollout-safety gap |

---

## Open Questions

- Confidence Controller and Transparency Prompt Controller are not shipped behind a feature flag (currently unflagged) — tracked rollout-safety gap, not yet resolved.

---

## Definition of Done

- [x] Confidence, Transparency, and Answerability Recovery controllers implemented and unit-tested
- [x] Answerability Recovery controller wired to `discovery-gate.service.ts`'s `onDegraded` hook
- [x] Provenance and confidence-caveat directives verified present in prompt-facing text via integration test (not just unit-level)
- [x] Stream-vs-non-stream parity verified for controller directives (present at both call sites)
- [x] Flags-off behavior independently re-verified as byte-identical to pre-Wave-2 baseline
- [ ] Confidence Controller and Transparency Prompt Controller shipped behind a feature flag (currently unflagged — tracked rollout-safety gap)

---

*Story S11.6.1 | Epic E11 | Product: Balencia Platform*
