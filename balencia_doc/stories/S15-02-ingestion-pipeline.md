---
type: story
id: S15.2.1
title: Ingestion Pipeline (Parse → OCR → Chunk → Embed)
epic: E15
epic_name: Document Intelligence, Reflection System & Virtual Try-On
feature: F15.2
feature_name: Ingestion Pipeline
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S15.2.1: Ingestion Pipeline (Parse → OCR → Chunk → Embed)

## User Story

**As an** Optimization Enthusiast (P3),
**I want** my uploaded documents — including scanned images and photographed lab reports — to become fully searchable and machine-readable within seconds,
**So that** SIA can immediately answer questions and extract structured data from them without me manually typing anything out.

---

## Story Type

- [ ] Feature
- [ ] Enhancement
- [x] Technical
- [x] Integration

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
| Light | Ingestion happens invisibly; the vault status badge is the only signal (`parsing` → `embedded`), plus "Retry" on `failed`. |
| Deep | Per-document ingestion detail: page count, chunk count, extracted metrics preview, parse error text on failure, manual re-ingest trigger. |

**Technical Foundation:**

- **Orchestrator** — `server/src/services/documents/document-ingest.service.ts`, `ingestDocument()`: parse → chunk → embed → persist → analytics → wiki-sync, wrapped in a **hard 120-second timeout** (`INGEST_TIMEOUT_MS`) so a stalled step (e.g. a slow vision call) cannot leave a document stuck in `parsing` indefinitely.
- **Parser** — `server/src/services/documents/document-parser.service.ts`, format-specific:

| Format | Library / method |
|---|---|
| PDF | `pdfjs-dist` |
| DOCX | `mammoth` |
| XLSX / PPTX | raw OOXML/zip parsing via `jszip` |
| TXT / CSV / Markdown | native text handling |
| Scanned/image-only PDFs, images | OCR fallback via `defaultOcr` → `aiProvider.callGeminiVision()` — the same vision provider used by other photo-based coaching features, no new OCR dependency |
| Audio / video | transcription via `defaultTranscribe`, same Gemini multimodal transport |

- **Chunker** — `server/src/services/documents/document-chunker.service.ts` — splits parsed segments into page-anchored chunks (page number is the citation anchor used by F15.3).
- **Embedding** — reuses the existing `vectorEmbeddingService.embedTexts()` — no new embedding integration.

**Table: `document_chunks`** (`server/src/database/tables/137-documents.sql`):

| Column | Type | Notes |
|---|---|---|
| `id` | UUID PK | |
| `document_id` | UUID FK → documents, `ON DELETE CASCADE` | |
| `user_id` | UUID FK → users, `ON DELETE CASCADE` | denormalized for fast user-scoped retrieval without a join |
| `page` | INTEGER, default 1 | 1-based; the citation anchor |
| `chunk_index` | INTEGER | |
| `content` | TEXT | |
| `content_kind` | enum: text, table, image_caption | |
| `token_count` | INTEGER | |
| `embedding` | TEXT | JSON-string fallback (mirrors `vector_embeddings` pattern) |
| `embedding_vec` | `vector(1536)` | conditionally added — only when the `pgvector` extension is present; paired with an `ivfflat` cosine index (`lists = 100`) |

`UNIQUE (document_id, chunk_index)`; indexes on `(document_id, page)` and `(user_id, document_id)`.

**Reliability fixes shipped (real production issues, not speculative hardening):**
- `recoverStuckDocuments()` — boot-time recovery job re-drives orphaned documents (stale >10 minutes) from R2, bounded to 25/boot cycle
- `POST /:id/retry` (`reingestDocument()`) — manual retry, re-downloads from R2, re-runs the full pipeline
- Hard 120s ingest timeout — prevents indefinite `parsing` status
- Fire-and-forget upload-time ingest failures are caught and logged, never thrown to the request path

---

## Acceptance Criteria

```gherkin
Scenario: Native-format parse
  Given a PDF, DOCX, XLSX, PPTX, TXT, CSV, or Markdown document has been uploaded
  When ingestDocument() runs
  Then it parses into page/segment-anchored chunks without invoking OCR

Scenario: Scanned document OCR fallback
  Given a scanned/image-only PDF or an image document has been uploaded
  When native parsing yields no extractable text
  Then OCR runs via aiProvider.callGeminiVision() and the resulting text is chunked and embedded

Scenario: Ingestion timeout enforcement
  Given ingestDocument() has been running for 120 seconds
  When the hard timeout (INGEST_TIMEOUT_MS) is reached
  Then the document is marked "failed" with parse_error set, and retry is available — it never remains stuck in "parsing"

Scenario: Boot-time stuck-document recovery
  Given a document has status "parsing" with updated_at older than 10 minutes
  When the server boots
  Then recoverStuckDocuments() re-drives ingestion from the original R2 file, bounded to 25 documents per boot cycle

Scenario: pgvector unavailable
  Given the pgvector extension is not installed in an environment
  When the document_chunks table is created
  Then embedding_vec and its ivfflat index are silently skipped, and chunk retrieval falls back to the JSON-string embedding column with no user-facing impact

Scenario: Zero-chunk regression guard
  Given a scanned document yields extractable text via OCR
  When ingestion completes
  Then the document never lands at status "embedded" with 0 chunk_count
```

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Ingestion success rate | ≥95% of valid uploads reach `embedded` without manual retry | `status` distribution on ingestion completion |
| Multi-page PDF page-mapping accuracy | 100% of chunks carry the correct source page | Regression coverage |
| Scanned-document OCR yield | 0 documents land at `embedded` with 0 extracted chunks | Regression test for the "0 chunks" bug class |
| Ingestion latency (p95) | Complete within 120s (the hard timeout) | `duration_ms` observability on the ingest job |
| Stuck-document recovery | 100% of stale `parsing` documents recovered within one boot cycle | `recoverStuckDocuments()` sweep coverage |

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Hard 120s timeout on the full parse→chunk→embed sequence | `document_chunks.user_id` denormalized for scoped retrieval, no join-based isolation gap | Chunks cascade-delete with the parent document (`ON DELETE CASCADE`) | Parse error text is plain-language, not raw stack traces | Runs against the same Gemini vision/multimodal transport already used elsewhere — no new provider dependency |
| Stuck-document sweep bounded to 25/boot to avoid thundering-herd re-ingest | | | | pgvector optional — graceful degrade when absent |

---

## Dependencies

- **Prerequisite Stories:** S15.1.1 (Upload & Vault) — source of the raw file and `documents` row
- **Related Stories:** S15.3.1 (Ask My Documents — consumes `document_chunks`), S15.4.1 (Document → Wiki — final ingest step), S15.5.1 (Medical Detection — ingest step)
- **External Dependencies:** Existing vector embedding service (`vectorEmbeddingService`), existing Gemini vision provider (`aiProvider.callGeminiVision`), pgvector extension (optional)

---

## Edge Cases & Errors

| Scenario | Expected Behavior |
|----------|-------------------|
| Ingestion exceeds 120s | Document marked `failed`, `parse_error` set, retry available; "This document is taking longer than expected. Tap to retry." |
| Server restarts mid-ingest | `recoverStuckDocuments()` finds stale (>10 min) `parsing` rows on boot, re-drives from R2, bounded to 25/boot; silent recovery |
| Scanned PDF yields 0 extractable text | Falls back to OCR on raw PDF bytes; if still empty, document lands `failed` with a specific `parse_error`; "We couldn't extract readable text from this file." |
| pgvector extension unavailable | Silently skip `embedding_vec` column/index; fallback to JSON-string `embedding` + keyword ranking; no user-facing impact |
| Embedding call fails | Chunk persists with `content` but no embedding; excluded from vector retrieval, still eligible for keyword-based candidate search; document may show `parsed` but not `embedded`, retry available |

---

## Open Questions

- OCR confidence scoring / low-confidence flagging surfaced to the user is **not built** — confirm whether this is required before scaling scanned-document volume, since OCR output is currently trusted as-is.

---

## Definition of Done

- [x] PDF, DOCX, XLSX, PPTX, TXT, CSV, Markdown, image, audio, video all parse into page/segment-anchored chunks
- [x] Scanned/image-only content is OCR'd via the existing vision pipeline — no separate OCR dependency added
- [x] Ingestion is bounded by a hard timeout; no permanent `parsing` state is possible
- [x] Boot-time recovery sweeps and repairs stale/orphaned in-flight documents
- [x] Manual retry endpoint re-runs the full pipeline from the original R2 file
- [x] `document_chunks` carries page-level citation anchors used by F15.3
- [x] pgvector embedding column is added conditionally (graceful degrade when extension isn't installed)
- [x] Best-effort numeric metric extraction and wiki sync run as final, non-fatal ingest steps
- [ ] OCR confidence scoring / low-confidence flagging surfaced to the user — not built

---

*Story S15.2.1 | Epic E15 | Product: Balencia Platform*
