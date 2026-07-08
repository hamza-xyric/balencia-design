# Epic 15: Document Intelligence, Reflection System & Virtual Try-On - Story Index

> **Epic:** E15 - Document Intelligence, Reflection System & Virtual Try-On
> **Source:** `prd-epics/PRD-Epic-15-Document-Intelligence-Reflection-Tryon.md`
> **Created:** 2026-07-08
> **Stories:** 12 (4 Must Have, 6 Should Have, 2 Could Have)
> **Note:** This index documents real, merged code shipped 2026-06-21 → 2026-07-07, retroactively. Document Intelligence (F15.1-F15.5) and Virtual Try-On (F15.7) are flag-gated **OFF** in production pending go-live review; Reflection (F15.6) is live, unflagged.

---

## Story Index

| Story ID | Title | Feature | Priority | Status | File |
|----------|-------|---------|----------|--------|------|
| S15.1.1 | Document Upload & Vault | F15.1 | P0 | Done | [View](S15-01-document-upload-vault.md) |
| S15.2.1 | Ingestion Pipeline (Parse → OCR → Chunk → Embed) | F15.2 | P0 | Done | [View](S15-02-ingestion-pipeline.md) |
| S15.3.1 | Ask My Documents (Cited RAG) | F15.3 | P0 | Done | [View](S15-03-ask-my-documents-cited-rag.md) |
| S15.4.1 | Document → Wiki Conversion | F15.4 | P1 | Done | [View](S15-04-document-wiki-conversion.md) |
| S15.4.2 | @Mention System & Cross-Document Trends | F15.4 | P1 | Done | [View](S15-05-mention-system-cross-document-trends.md) |
| S15.5.1 | Medical Detection, Consent Gate & Metric Extraction | F15.5 | P1 | Done | [View](S15-06-medical-detection-consent-metric-extraction.md) |
| S15.5.2 | Medical Severity Classification & Red-Flag Escalation | F15.5 | P1 | In Progress | [View](S15-07-medical-severity-classification-escalation.md) |
| S15.6.1 | Double-Tap Reflection Capture | F15.6 | P0 | Done | [View](S15-08-double-tap-reflection-capture.md) |
| S15.6.2 | Reflection Taxonomy, Visibility & Coaching Signal | F15.6 | P1 | Done | [View](S15-09-reflection-taxonomy-coaching-signal.md) |
| S15.7.1 | Virtual Try-On Photo Upload & Generation | F15.7 | P1 | Done | [View](S15-10-tryon-photo-upload-generation.md) |
| S15.7.2 | Saved Looks, Wardrobe & Before/After Comparison | F15.7 | P2 | Done | [View](S15-11-saved-looks-wardrobe-before-after.md) |
| S15.7.3 | AI Style Coach (`getStyleProfile`) | F15.7 | P2 | Done | [View](S15-12-ai-style-coach.md) |

**Status Summary:** Done: 11 | In Progress: 1
**Priority Summary:** P0 (Must Have): 4 | P1 (Should Have): 6 | P2 (Could Have): 2

**Rollout note:** "Done" here means built, merged, and covered by green unit + integration test suites at merge time — **not** live in production. `ENABLE_DOC_INTELLIGENCE`, `ENABLE_DOC_RAG`, `ENABLE_DOC_MEDICAL`, and `VIRTUAL_TRYON_ENABLED` all default OFF. Only F15.6 (Reflection) ships unconditionally as part of core journaling.

### Implementation Gaps (In Progress Stories)

| Story | Gap | Required Action |
|-------|-----|-----------------|
| S15.5.2 | Severity-tier (green/yellow/red) classifier and red-flag → clinician-referral escalation are designed (Wave 5 of the original plan) but **do not exist in the codebase**. `document_analytics.out_of_range` is a boolean only — an extreme value gets identical treatment to a marginal one. | Build the classifier + escalation path, wire it to Epic 11's existing crisis/safety escalation infrastructure, and build the automated safety eval harness (red-flag recall, false-reassurance rate, diagnosis-language-leakage rate) — this harness is the explicit **G2 go/no-go gate** before `ENABLE_DOC_MEDICAL` can be considered for production |

### Tracked Rollout-Safety Gaps (Done Stories, Flagged Not Hidden)

| Story | Gap | Required Action |
|-------|-----|-----------------|
| S15.1.1 | No malware/virus scanning on document upload; no document versioning | Add to the Hardening track before `ENABLE_DOC_INTELLIGENCE` go-live |
| S15.2.1 | No OCR confidence scoring — OCR output is trusted as-is with no low-confidence flag surfaced to the user | Add confidence scoring to `document-parser.service.ts` OCR path |
| S15.3.1 | No per-citation confidence score (grounding is binary); no dedicated multi-document synthesis/comparison logic | Track as enhancement, not a blocker for G1 (Ask-My-Documents GA) |
| S15.4.1 | Doc → wiki sync is one-directional only — editing the generated wiki page does not update the source document | Not currently planned; documented as a permanent design choice unless revisited |
| S15.6.1 | No client-side debounce or server-side idempotency guard on double-tap capture — a rapid double-submit can create two `journal_entries`/`reflection_details` rows | Add idempotency key to the double-tap capture endpoint |
| S15.6.2 | No dashboard surface for reflection trends/patterns; cross-session emotion "arcs" designed in the taxonomy but not surfaced in any UI | Explicitly called out as remaining work in project delivery tracking |
| S15.7.1 | No cross-user isolation test suite independently confirmed complete for Try-On assets/sessions | Confirm isolation coverage before `VIRTUAL_TRYON_ENABLED` go-live |
| S15.7.2 | No multi-garment outfit composition (top + bottom + accessory in one generation) — current model is single garment per session | Track as a future enhancement, not a launch blocker |

---

## Dependency Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    EPIC 15 STORY DEPENDENCIES                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  TRACK A: DOCUMENT INTELLIGENCE (shared schema/services, sequential)         │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                                                                      │  │
│  │  PHASE 1: VAULT FOUNDATION                                          │  │
│  │  S15.1.1 (Upload & Vault) ──────────▶ S15.2.1 (Ingestion Pipeline) │  │
│  │                                              │                      │  │
│  │                                              ▼                      │  │
│  │  PHASE 2: INTELLIGENCE SURFACES                                     │  │
│  │  S15.3.1 (Ask My Documents — Cited RAG)                            │  │
│  │  S15.4.1 (Doc → Wiki) ──▶ S15.4.2 (@Mention & Cross-Doc Trends)    │  │
│  │                                              │                      │  │
│  │                                              ▼                      │  │
│  │  PHASE 3: MEDICAL SAFETY LAYER                                      │  │
│  │  S15.5.1 (Detection, Consent, Metric Extraction)                   │  │
│  │        └──────────────▶ S15.5.2 (Severity/Red-Flag — IN PROGRESS)  │  │
│  │                                                                      │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  TRACK B: DOUBLE-TAP REFLECTION (independent — companion to journaling)      │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                                                                      │  │
│  │  S15.6.1 (Double-Tap Capture) ──▶ S15.6.2 (Taxonomy, Visibility,    │  │
│  │                                    Coaching Signal)                 │  │
│  │                                                                      │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  TRACK C: VIRTUAL TRY-ON / AI FASHION STUDIO (independent — own schema)      │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                                                                      │  │
│  │  S15.7.1 (Upload & Generation) ──┬──▶ S15.7.2 (Saved Looks,         │  │
│  │                                   │     Wardrobe, Before/After)     │  │
│  │                                   └──▶ S15.7.3 (AI Style Coach)     │  │
│  │                                                                      │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  Tracks A, B, and C do not share tables/services/endpoints — grouped in     │
│  this epic by shipping window (2026-06-21 → 2026-07-07) and shared          │
│  "flag-gated-OFF, integration-first" delivery posture, not by architecture. │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Feature → Story Coverage Matrix

| Epic Feature | Story ID(s) | Coverage |
|--------------|-------------|----------|
| F15.1: Document Upload & Vault | S15.1.1 | 100% |
| F15.2: Ingestion Pipeline (Parse → OCR → Chunk → Embed) | S15.2.1 | 100% |
| F15.3: Ask My Documents (Cited RAG) | S15.3.1 | 100% |
| F15.4: Document → Wiki Conversion + @mention | S15.4.1 - S15.4.2 | 100% |
| F15.5: Medical Report Analyzer (non-diagnostic) | S15.5.1 - S15.5.2 | 100% of shipped scope; severity classifier/escalation (S15.5.2) not built — this is the honest gap, not a coverage error |
| F15.6: Double-Tap Reflection System | S15.6.1 - S15.6.2 | 100% of shipped scope; dashboard/arc surfacing not built |
| F15.7: Virtual Try-On / AI Fashion Studio | S15.7.1 - S15.7.3 | 100% |

---

## Implementation Sequence

### Sprint 1: Document Vault Foundation
| Order | Story | Rationale |
|-------|-------|-----------|
| 1 | S15.1.1 | Document Upload & Vault — entry point; everything else in Track A depends on a `documents` row existing |
| 2 | S15.2.1 | Ingestion Pipeline — turns an uploaded file into the searchable `document_chunks` corpus every downstream surface reads |

### Sprint 2: Document Intelligence Surfaces
| Order | Story | Rationale |
|-------|-------|-----------|
| 3 | S15.3.1 | Ask My Documents (Cited RAG) — primary "why this exists" user value; depends on `document_chunks` |
| 4 | S15.4.1 | Document → Wiki Conversion — bridges into the existing Personal Wiki module as the final ingest step |
| 5 | S15.4.2 | @Mention System & Cross-Document Trends — depends on wiki pages existing to be mentionable |

### Sprint 3: Medical Safety Layer
| Order | Story | Rationale |
|-------|-------|-----------|
| 6 | S15.5.1 | Medical Detection, Consent Gate & Metric Extraction — two-layer gate other medical surfaces (RAG disclaimer, wiki note) depend on |
| 7 | S15.5.2 | Medical Severity Classification & Red-Flag Escalation — **not started**; hard prerequisite (G2 gate) before `ENABLE_DOC_MEDICAL` can go to production |

### Sprint 4: Reflection System
| Order | Story | Rationale |
|-------|-------|-----------|
| 8 | S15.6.1 | Double-Tap Reflection Capture — core capture mechanic, live unflagged as part of core journaling |
| 9 | S15.6.2 | Reflection Taxonomy, Visibility & Coaching Signal — motivation/purpose/value codes and `feeds_ai` gating layered on top of capture |

### Sprint 5: Virtual Try-On / AI Fashion Studio
| Order | Story | Rationale |
|-------|-------|-----------|
| 10 | S15.7.1 | Photo Upload & Generation — core credit-metered generation pipeline; independent of Tracks A/B |
| 11 | S15.7.2 | Saved Looks, Wardrobe & Before/After Comparison — Wave 1+2 redesign, views over `virtual_try_on_sessions` |
| 12 | S15.7.3 | AI Style Coach (`getStyleProfile`) — depends on accumulated `try_on_preference_signals` from saved/discarded sessions |

---

*Epic 15: Document Intelligence, Reflection System & Virtual Try-On | Balencia Platform | 2026-07-08*
