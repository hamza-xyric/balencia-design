---
type: story
id: S15.5.2
title: Medical Severity Classification & Red-Flag Escalation
epic: E15
epic_name: Document Intelligence, Reflection System & Virtual Try-On
feature: F15.5
feature_name: Medical Report Analyzer (non-diagnostic)
product: yhealth-platform
priority: P1
status: In Progress
created: 2026-07-08
---

# S15.5.2: Medical Severity Classification & Red-Flag Escalation

## User Story

**As a** Holistic Health Seeker (P1),
**I want** SIA to distinguish a mildly out-of-range lab value from a potentially serious one, and to point me toward a doctor when something looks urgent,
**So that** I don't mistake a dangerous finding for routine noise, and I don't get a false sense of safety from a system that treats every out-of-range value identically.

---

## Story Type

- [x] Feature
- [ ] Enhancement
- [ ] Technical
- [ ] Integration

## Priority

- [ ] Must Have (P0)
- [x] Should Have (P1)
- [ ] Could Have (P2)
- [ ] Won't Have (P3)

---

## Scope Description

**Status: NOT IMPLEMENTED.** This story documents the designed-but-unbuilt half of the Medical Report Analyzer (Wave 5 of the original plan, `docs/2026-06-21-sia-document-intelligence-plan.md`). Do not mark this story Done and do not enable `ENABLE_DOC_MEDICAL` in production on the assumption this capability exists — **it does not.** S15.5.1 (detection, consent, deterministic out-of-range flagging) is the only part of the Medical Report Analyzer that has shipped.

**What is designed but does not exist in the codebase today:**
- A severity-tier classifier (e.g. green/yellow/orange/red or similar) that weighs *how far* out-of-range a value is, not just a boolean
- A red-flag → clinician-referral escalation path for serious findings
- Any wiring from a medical-document finding into Epic 11's existing crisis/safety escalation infrastructure
- An automated safety eval harness (red-flag recall, false-reassurance rate, diagnosis-language-leakage rate)

**Current (shipped) behavior this story replaces:** `document_analytics.out_of_range` is a boolean derived purely from a stated numeric reference range. A value 1% outside its range and a value 500% outside its range receive **identical, non-escalated treatment**. There is no severity weighting, no clinical-significance model, and no escalation trigger wired to any out-of-range finding, however extreme.

**Designed (not built) flow, per the original Wave 5 plan:**
```
severity_tier = classifySeverity(metric, out_of_range, magnitude)  -- does not exist
if severity_tier === 'red_flag':
  escalate_to_clinician_referral()                                 -- does not exist
  route_through_crisis_safety_layer()                              -- does not exist (would reuse Epic 11)
```

**Why this is gated separately from S15.5.1:** this is the explicit **G2 go/no-go gate** in the roadmap doc (`docs/2026-06-21-sia-document-intelligence-roadmap.md §12`) — the safety eval harness must exist and pass thresholds before `ENABLE_DOC_MEDICAL` can be considered for production, independent of whether the flag-OFF, consent-gated, out-of-range-only version (S15.5.1) is otherwise ready.

---

## Acceptance Criteria

```gherkin
# NONE OF THE FOLLOWING ARE CURRENTLY MET — this block documents the target
# behavior for when this story is actually built, not current shipped state.

Scenario: Severity tier assigned to an out-of-range value
  Given a document_analytics row is out_of_range = true
  When classifySeverity(metric, out_of_range, magnitude) runs
  Then the row is assigned a severity_tier (e.g. mild/moderate/severe or a color tier), not just a boolean

Scenario: Red-flag finding escalates
  Given a metric's severity_tier evaluates to "red_flag"
  When the finding is persisted
  Then escalate_to_clinician_referral() fires and the finding is routed through Epic 11's existing crisis/safety escalation layer

Scenario: Non-red-flag out-of-range value does not escalate
  Given a metric is out_of_range = true but severity_tier is "mild"
  When the finding is persisted
  Then no escalation fires, and the existing non-diagnostic disclaimer flow (S15.5.1) applies unchanged

Scenario: Safety eval harness gate
  Given the severity classifier and escalation path are implemented
  When ENABLE_DOC_MEDICAL is proposed for a production flip
  Then an automated safety eval harness must report red-flag recall, false-reassurance rate, and diagnosis-language-leakage rate against defined thresholds before the flag can go on (G2 gate)
```

---

## Success Metrics

| Metric | Target | Measurement | Status |
|--------|--------|-------------|--------|
| Non-diagnosis language leakage | 0% — zero instances of diagnostic language in any medical-mode response | Eval harness (planned, not yet built) | **Not measured** — no automated eval harness exists |
| Red-flag detection recall | Target for this **future** classifier | N/A | **Not applicable — capability not built** |
| False-reassurance rate | Target for this **future** classifier | Eval harness (planned, not yet built) | **Not applicable — capability not built** |

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Not yet designed at the implementation level (severity model, thresholds, latency budget all TBD) | Must reuse, not duplicate, Epic 11's existing crisis/safety escalation infrastructure per the original design intent | Escalation must not leak medical findings outside the user's own consented, gated channel | Escalation messaging must meet the same non-diagnostic, plain-language bar as S15.5.1's fixed disclaimers | Must not require enabling `ENABLE_DOC_MEDICAL` in production before the safety eval harness passes (G2 gate) |

---

## Dependencies

- **Prerequisite Stories:** S15.5.1 (Medical Detection, Consent Gate & Metric Extraction) — this story extends its `document_analytics.out_of_range` boolean into a graded severity model
- **Related Stories:** S15.3.1, S15.4.1 (both consume disclaimers today and would consume severity/escalation output once built)
- **External Dependencies:** Epic 11 (SIA Cognitive OS) crisis/safety escalation infrastructure — exists and is reused elsewhere in the coach, but **is not yet wired up for medical documents specifically**
- **Blocking Gate:** G2 (Medical Analyzer GA) — safety eval harness must exist and pass before `ENABLE_DOC_MEDICAL` can go to production, regardless of this story's completion status

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| Extreme out-of-range value (potential red flag), current state | `out_of_range = true`, same as a marginal deviation | No differentiated handling — treated identically to a mild deviation | No escalation — **this is the core gap this story exists to close** |
| Metric extraction regex misparses a value that would otherwise be a red flag | No confidence signal exists on the extractor (S15.5.1 gap) | A severity classifier built on unverified extraction inherits that uncertainty | Compounds the S15.5.1 extraction-confidence gap — must be addressed together, not independently |

---

## Open Questions

1. **What severity model/thresholds should `classifySeverity()` use** — clinical reference tables, magnitude-of-deviation heuristics, or an LLM-assisted classifier? This has not been decided; the original plan names the capability but not its algorithm.
2. **What does "escalate_to_clinician_referral()" actually do** — an in-app message, a flagged notification to the user only, or something that could imply clinical triage? This needs product + medical/safety review before any implementation, given the non-diagnostic constraint the rest of F15.5 is built around.
3. **What are the target thresholds for the safety eval harness** (red-flag recall, false-reassurance rate, diagnosis-language-leakage rate) that gate G2? None are defined yet in any source document reviewed.
4. **Who owns building the eval harness** — is it Engineering, Safety/Medical review, or a joint deliverable? The PRD assigns ownership at the epic level (Safety/Medical review is blocking for F15.5) but not at the harness-deliverable level.

---

## Definition of Done

- [ ] `classifySeverity()` implemented, assigning a severity tier (not just a boolean) to every `document_analytics.out_of_range` finding
- [ ] Red-flag findings trigger `escalate_to_clinician_referral()`
- [ ] Red-flag escalation is wired into Epic 11's existing crisis/safety escalation infrastructure (reused, not duplicated)
- [ ] Automated safety eval harness built and reporting red-flag recall, false-reassurance rate, and diagnosis-language-leakage rate
- [ ] Safety eval harness thresholds defined and agreed with Safety/Medical review
- [ ] Eval harness run and passing thresholds before any recommendation to flip `ENABLE_DOC_MEDICAL` on in production (G2 gate satisfied)
- [ ] Regression tests cover: mild vs. red-flag classification boundary, escalation firing exactly once per red-flag finding, no escalation for non-red-flag findings

**None of the above are complete as of 2026-07-08.** This story is tracked as In Progress (not started at the implementation level) specifically so the gap is visible in project tracking rather than silently absent.

---

*Story S15.5.2 | Epic E15 | Product: Balencia Platform*
