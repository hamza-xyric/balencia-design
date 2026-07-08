---
type: story
id: S15.5.1
title: Medical Detection, Consent Gate & Metric Extraction
epic: E15
epic_name: Document Intelligence, Reflection System & Virtual Try-On
feature: F15.5
feature_name: Medical Report Analyzer (non-diagnostic)
product: yhealth-platform
priority: P1
status: Done
created: 2026-07-08
---

# S15.5.1: Medical Detection, Consent Gate & Metric Extraction

## User Story

**As a** Holistic Health Seeker (P1),
**I want** SIA to detect that my document is medical, require my explicit consent before analyzing it, and surface the values it extracts,
**So that** I stay in control of whether my sensitive medical documents are analyzed and understand what SIA extracted from them.

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

**This is the shipped portion of the Medical Report Analyzer.** The severity-tier classification and red-flag escalation designed alongside it are a separate story (S15.5.2, status: In Progress — not built) — this story covers only what actually exists in the codebase today: keyword-hint detection, the two-layer consent gate, and deterministic out-of-range metric extraction.

**Flexibility Modes:**

| Mode | Experience |
|------|------------|
| Light | A single-consent toggle turns medical analysis on; out-of-range values are surfaced with a plain-language note and the fixed non-diagnostic disclaimer. |
| Deep | Per-metric view: value, unit, reference range, in/out-of-range flag, source page. |

**Technical Foundation:**

- **Medical detection** — `detectMedical()` in `document-parser.service.ts`: a keyword-hint match (`mg/dl`, `cholesterol`, `hba1c`, `creatinine`, `blood pressure`, `diagnosis`, `patient`, `reference range`, etc.) against parsed content, sets `documents.is_medical`. This is a heuristic, not a classifier with a confidence score.
- **Consent gate** — `server/src/services/documents/document-consent.service.ts` (`hasMedicalConsent()`, `grantMedicalConsent()`), exposed via `GET/POST /v1/documents/consent`. Both `/analytics` and medical-mode `/ask` require **two independent conditions**: `env.documents.medicalEnabled` (the `ENABLE_DOC_MEDICAL` flag) AND an explicit consent record for that user — flag-on alone does not unlock medical analysis for a user who hasn't consented.
- **Metric extraction** — `server/src/services/documents/document-analytics.service.ts`, `extractMetrics()`: a deterministic, pure regex-based extractor over parsed text lines (pattern: `label, number, optional unit, optional (low-high) range`), explicitly documented in its own file header as "non-diagnostic: it only records values and whether they fall outside a stated reference range." Deduplicates by lowercased label (first occurrence wins), skips date-like lines and bare "label + number" prose noise (e.g. "Page 1 of 3"), requires either a unit or a reference range to accept a candidate as a real metric.

**Table: `document_analytics`:**

| Column | Type | Notes |
|---|---|---|
| `document_id`, `user_id` | UUID FK, `ON DELETE CASCADE` | |
| `metric_label` | VARCHAR(200) | e.g. "LDL Cholesterol" |
| `metric_value` | NUMERIC | never a float — matches platform-wide money/decimal discipline |
| `metric_unit` | VARCHAR(50) | |
| `ref_low`, `ref_high` | NUMERIC | parsed reference range, if stated |
| `out_of_range` | BOOLEAN | `value < ref_low OR value > ref_high` |
| `source_page` | INTEGER | citation anchor, same convention as `document_chunks.page` |

**Fixed, non-model-generated disclaimers:**
```ts
// document-rag.service.ts
export const MEDICAL_DISCLAIMER =
  'Note: these are the values stated in your document, not a diagnosis. Please discuss anything concerning with your doctor.';

// document-wiki.service.ts
NON_DIAGNOSTIC_NOTE =
  '> These values are transcribed from your document for reference only. They are ' +
  '**not** a diagnosis — discuss anything concerning with your doctor.';
```

---

## Acceptance Criteria

```gherkin
Scenario: Medical document detected
  Given a document's parsed content contains medical keyword hints (e.g. "mg/dl", "hba1c", "reference range")
  When detectMedical() runs during ingest
  Then documents.is_medical is set to true

Scenario: Flag off blocks analysis
  Given a document has is_medical = true
  When env.documents.medicalEnabled (ENABLE_DOC_MEDICAL) is false
  Then GET /:id/analytics and medical-mode /:id/ask are both blocked before any analysis, returning MEDICAL_NOT_ENABLED

Scenario: Flag on but no consent blocks analysis
  Given ENABLE_DOC_MEDICAL is true
  When the user has not granted medical consent (no row from grantMedicalConsent())
  Then GET /:id/analytics and medical-mode /:id/ask are both blocked, returning MEDICAL_CONSENT_REQUIRED

Scenario: Flag on and consent granted unlocks analysis
  Given ENABLE_DOC_MEDICAL is true and the user has granted consent
  When GET /:id/analytics is called for a medical document
  Then document_analytics rows are returned as-is (value, unit, range, out_of_range)

Scenario: Out-of-range flagging
  Given a parsed line states "LDL Cholesterol 165 mg/dL (0-130)"
  When extractMetrics() processes it
  Then a document_analytics row is created with metric_value=165, ref_high=130, out_of_range=true

Scenario: Noise-line rejection
  Given a parsed line reads "Page 1 of 3" or a bare date
  When extractMetrics() processes it
  Then no document_analytics row is created for that line — it requires either a unit or a reference range to be accepted

Scenario: Deduplication by label
  Given a document contains "Cholesterol" mentioned twice with different values
  When extractMetrics() processes it
  Then only the first occurrence is persisted (lowercased-label dedup, first occurrence wins)
```

---

## Success Metrics

| Metric | Target | Measurement | Status |
|--------|--------|-------------|--------|
| Medical-document detection precision | ≥90% of true medical documents flagged `is_medical` | Manual review sample | Achievable with current heuristic — untested at scale |
| Metric extraction accuracy | ≥85% of clearly-labeled lab values extracted correctly | Manual review against source PDFs | Deterministic regex — accuracy bounded by report formatting variance |
| Consent opt-in rate | Tracked once flag is on | Consent grant rate among users who upload a medical-flagged document | Pending flag-on |

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Metric extraction is deterministic regex — no LLM call, no added latency to ingest | Two independent gates required (flag AND consent) — flag-on alone never unlocks analysis for a non-consenting user | Consent is an explicit, per-user record, not an implicit opt-in | Non-diagnostic disclaimer language is plain, non-clinical | `metric_value` stored as `NUMERIC`, never `FLOAT` — platform-wide money/decimal discipline |
| | Disclaimer copy is fixed application code, never model-generated | | | |

---

## Dependencies

- **Prerequisite Stories:** S15.2.1 (Ingestion Pipeline — `is_medical` and `document_analytics` are ingest steps)
- **Related Stories:** S15.3.1 (consumes disclaimer + consent gate), S15.4.1 (consumes `document_analytics` for the wiki table and non-diagnostic note), S15.5.2 (the not-yet-built severity layer on top of this story)
- **External Dependencies:** `ENABLE_DOC_MEDICAL` flag, per-user consent record

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| Medical document, flag off | `is_medical && !env.documents.medicalEnabled` | Block before any analysis | `MEDICAL_NOT_ENABLED` |
| Medical document, flag on, no consent | `is_medical && medicalEnabled && !hasMedicalConsent()` | Block before any analysis | `MEDICAL_CONSENT_REQUIRED` |
| Metric extraction regex misparses a value | No confidence signal exists on the extractor today | Value persists as extracted — no automated re-validation | No user warning currently surfaced — flagged as a gap, not a designed behavior |
| Document misclassified as non-medical | Keyword heuristic misses domain-specific terminology | Document proceeds through the standard (non-medical) RAG/wiki path, no disclaimer applied | No user warning — flagged as a gap |

---

## Open Questions

- Metric extraction has no confidence signal or automated re-validation — should misparsed values surface a user-facing warning, or is manual review out of scope?
- Should the medical-keyword heuristic be upgraded to a classifier with a confidence score before scaling beyond the current flag-OFF posture?

---

## Definition of Done

- [x] Medical documents are detected via keyword heuristic and marked `is_medical`
- [x] Medical analysis requires both the `ENABLE_DOC_MEDICAL` flag AND explicit per-user consent — flag alone is insufficient
- [x] Numeric metrics are extracted deterministically with out-of-range flagging against a stated reference range
- [x] Every medical-mode RAG answer and every medical wiki page carries a fixed, non-model-generated non-diagnostic disclaimer
- [x] Medical-mode "not enabled" and "consent required" states return distinct, clear messages
- [ ] Confidence signal / automated re-validation on extracted metrics — not built (flagged gap, out of scope for this story)

---

*Story S15.5.1 | Epic E15 | Product: Balencia Platform*
