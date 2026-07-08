---
type: story
id: S15.3.1
title: Ask My Documents (Cited RAG)
epic: E15
epic_name: Document Intelligence, Reflection System & Virtual Try-On
feature: F15.3
feature_name: Ask My Documents (Cited RAG)
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S15.3.1: Ask My Documents (Cited RAG)

## User Story

**As a** Busy Professional (P2),
**I want to** ask "What did my blood test say about cholesterol?" and get a direct, sourced answer from my uploaded lab report,
**So that** I don't have to reread a multi-page PDF myself.

---

## Story Type

- [x] Feature
- [ ] Enhancement
- [ ] Technical
- [ ] Integration

## Priority

- [x] Must Have (P0)
- [ ] Should Have (P1)
- [ ] Could Have (P2)
- [ ] Won't Have (P3)

---

## Scope Description

**Flexibility Modes:**

| Mode | Experience |
|------|------------|
| Light | Ask a question in chat; get a short grounded answer with inline page citations, no visible retrieval mechanics. |
| Deep | Scope the question to specific `@mentioned` documents, view the exact retrieved chunks behind an answer, see the `grounded`/`usedChunks` diagnostic, re-ask if the answer is "not found." |

**Technical Foundation:**

- **Route** — `POST /v1/documents/:id/ask`, gated by `ENABLE_DOC_INTELLIGENCE` (router-level) AND `ENABLE_DOC_RAG` (endpoint-level, checked in the controller) — two independent flags, so RAG can stay off even after the vault itself is enabled.
- **Service** — `server/src/services/documents/document-rag.service.ts`, `answerFromDocuments()`:
  1. Extract keywords from the question
  2. `documentRepository.searchChunkCandidates()` — pulls a candidate pool (`POOL_SIZE = 40`) scoped to the user (and, if `@mentioned`, to specific `documentIds`)
  3. `rankChunks()` — ranks candidates by keyword overlap, returns top `TOP_K = 6`
  4. Zero candidates → return `HONEST_NULL` immediately, no LLM call spent
  5. Build a strict grounding prompt and call Gemini (system prompt forbids outside knowledge, requires page citations)
  6. `validateCitations()` (`server/src/services/documents/citation-validator.ts`) parses the raw answer against actually-retrieved chunks, returns `{ groundedAnswer, citations, isGrounded, droppedSentences }` — ungrounded sentences are dropped, not silently kept
  7. `!isGrounded` → return `HONEST_NULL = "I couldn't find that in your document(s)."`
  8. If source document `isMedical` → append the fixed `MEDICAL_DISCLAIMER` to the grounded answer

**Medical-mode guard messages (returned before any RAG call, per F15.5's consent gate):**
```
MEDICAL_NOT_ENABLED = "This looks like a medical document. Medical document
  analysis isn't enabled on your account, so I can't answer questions about it."
MEDICAL_CONSENT_REQUIRED = "This looks like a medical document. To analyze it
  or answer questions about it, please turn on medical analysis first."
```

**Deletion guarantee:** `document_chunks` cascades on `document_id` (`ON DELETE CASCADE`) — a deleted document's chunks are physically gone, not just filtered out.

---

## Acceptance Criteria

```gherkin
Scenario: Grounded answer with citation
  Given a user has an embedded document with a chunk stating a lab value
  When they ask a question the chunk can answer
  Then the response cites the source page (e.g. "(page 3)") and every claim resolves to a retrieved chunk

Scenario: Zero-candidate short-circuit
  Given a user asks a question with no matching chunks
  When rankChunks() returns an empty candidate set
  Then the system returns HONEST_NULL ("I couldn't find that in your document(s).") without calling the LLM

Scenario: Ungrounded answer is discarded
  Given the LLM generates an answer referencing facts not present in the retrieved chunks
  When validateCitations().isGrounded evaluates false
  Then the entire answer is discarded and HONEST_NULL is returned — never a partially-hallucinated answer

Scenario: Medical document, flag off
  Given a question targets a document with is_medical = true
  When ENABLE_DOC_MEDICAL is off
  Then the request short-circuits before retrieval with MEDICAL_NOT_ENABLED

Scenario: Medical document, flag on, no consent
  Given a question targets a document with is_medical = true and ENABLE_DOC_MEDICAL is on
  When the user has not granted medical consent
  Then the request short-circuits before retrieval with MEDICAL_CONSENT_REQUIRED

Scenario: Medical disclaimer appended
  Given a grounded, cited answer is produced for a medical document with consent granted
  When the answer is returned
  Then the fixed MEDICAL_DISCLAIMER is appended verbatim, not model-generated

Scenario: Deleted document unreachable
  Given a document has been soft-deleted
  When a question is asked that would have matched its chunks
  Then no chunks from that document are retrievable (ON DELETE CASCADE, a DB guarantee not an app-level filter)

Scenario: LLM call fails
  Given the generate() call throws (network/provider error)
  When the failure is caught
  Then HONEST_NULL is returned — indistinguishable from "not found" to the user, by design, no error leakage
```

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Citation groundedness | 0 answers ship un-cited to a source chunk | `isGrounded` false-rate on the citation validator |
| "Not found" honesty rate | 100% of questions with no matching chunk return `HONEST_NULL`, never fabricated | Unit tests on `rankChunks()` zero-candidate path |
| Cross-user isolation | 0 leakage incidents in isolation test suite | Automated isolation tests |
| Deleted-document retrieval | 0 chunks retrievable after document deletion | `ON DELETE CASCADE` integrity + regression test |
| Answer latency (p95) | <5s from question to grounded answer | RAG service timing (retrieval + 1 LLM call) |

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| <5s p95 answer latency (retrieval + 1 LLM call) | `ENABLE_DOC_RAG` is independent of the master `ENABLE_DOC_INTELLIGENCE` flag — RAG can stay off separately | Cross-user isolation via `user_id`-scoped candidate search | Citations are plain-text page markers, screen-reader readable | Reuses existing Gemini text provider (`aiProvider.callGeminiText`) — no new LLM integration |
| Zero-candidate questions skip the LLM call entirely (cost control) | Medical documents blocked from RAG until flag AND consent both pass | Fixed, non-model-generated disclaimer copy cannot drift or be reasoned around | | |

---

## Dependencies

- **Prerequisite Stories:** S15.2.1 (Ingestion Pipeline) — source of `document_chunks`
- **Related Stories:** S15.4.2 (`documentIds` scoping via `@mention`), S15.5.1 (medical consent gate + disclaimer)
- **External Dependencies:** `ENABLE_DOC_RAG` flag, existing Gemini text provider

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| Question matches no chunks | `rankChunks()` returns empty | Skip LLM call entirely | `HONEST_NULL` |
| LLM generation call fails | `generate()` throws | Caught, logged, falls back to `HONEST_NULL` | Same honest-null message, no error leakage |
| Answer references facts not in retrieved chunks | `validateCitations().isGrounded === false` | Entire answer discarded | `HONEST_NULL`, never a partially-hallucinated answer |
| Question targets medical document, medical mode off | `is_medical && !medicalEnabled` | Short-circuit before retrieval | `MEDICAL_NOT_ENABLED` |
| Question targets medical document, no consent | `is_medical && medicalEnabled && !hasMedicalConsent()` | Short-circuit before retrieval | `MEDICAL_CONSENT_REQUIRED` |

---

## Open Questions

- Confidence score per-citation ("high/medium/low confidence") is **not built** — grounding is currently binary. Confirm whether this is required before G1 (Ask-My-Documents GA).
- Multi-document synthesis with cross-document citation ("your March and June labs both show...") is **not explicitly tested** — the retrieval pool can span documents but no dedicated comparison logic exists.

---

## Definition of Done

- [x] Answers are generated strictly from retrieved chunk content — system prompt explicitly forbids outside knowledge
- [x] Every claim carries a page citation; ungrounded claims are dropped by the citation validator, not passed through
- [x] Zero-candidate questions short-circuit to `HONEST_NULL` without spending an LLM call
- [x] Medical documents get a fixed non-diagnostic disclaimer appended to every grounded answer
- [x] Medical documents are blocked from RAG until `ENABLE_DOC_MEDICAL` is on AND the user has granted consent
- [x] Deleted documents' chunks are unreachable (DB cascade, not app-level filtering)
- [x] Question scope can be narrowed to specific `@mentioned` documents via `documentIds`
- [ ] Confidence score surfaced per-citation — not built
- [ ] Multi-document synthesis with cross-document citation — not explicitly tested/built

---

*Story S15.3.1 | Epic E15 | Product: Balencia Platform*
