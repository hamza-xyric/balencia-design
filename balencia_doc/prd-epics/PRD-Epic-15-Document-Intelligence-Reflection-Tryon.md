# Balencia Platform - Epic 15: Document Intelligence, Reflection System & Virtual Try-On

## EPIC OVERVIEW

### Epic Statement
Epic 15 extends SIA from a *conversational* coach into a *document-aware, reflective, and style-aware* coach. It bundles three functionally distinct but architecturally related capabilities shipped in the same 2026-06-21 → 2026-07-07 build window: **Document Intelligence** (upload → OCR → chunk → embed → cited Q&A over a user's own files), the **Double-Tap Reflection System** (lightweight, structured self-reflection attached to any life event), and **Virtual Try-On / AI Fashion Studio** (AI-generated outfit visualization with a real, computed style profile). All three are **integration-first builds** on top of infrastructure SIA already had — object storage, embeddings/pgvector, the chat/RAG brain, consent records, and crisis/safety escalation — rather than greenfield systems.

### Epic Goal
Turn three dead-ends into durable capability: (1) "Attach" was a dead-end input — files went nowhere durable and SIA couldn't read them; Document Intelligence makes every upload searchable, explainable, and answerable with citations. (2) Reflection was buried inside free-text journaling with no structure SIA could reason over; the Double-Tap system gives it a queryable shape (importance, emotion delta, motivation/purpose/value codes) without polluting the core journal schema. (3) "What should I wear" had no answer inside a health/coaching product; Virtual Try-On gives users a fast, private way to preview outfits and gives SIA a real (not fabricated) signal about their style preferences.

### Core Philosophy
**"Reuse before rebuild, honesty before polish" (the pattern behind all three features):**
1. **Integration-first** — ~70% of Document Intelligence's infrastructure already existed (R2 storage, pgvector embeddings, the Gemini/OpenAI RAG brain, consent records, crisis escalation, audit logging). The genuinely new work was document parsing/OCR, a citation validator, and a (partially built — see F15.5) medical safety layer.
2. **No separate OCR engine** — scanned/image-only documents are OCR'd through the *existing* vision/image-analysis pipeline (`aiProvider.callGeminiVision`), the same transport already used for photo-based coaching features. No Tesseract or third-party OCR dependency was added.
3. **Honest-null over hallucination** — Ask My Documents will not answer past what its citation validator can ground; it returns a fixed `HONEST_NULL` string ("I couldn't find that in your document(s).") rather than guessing.
4. **Schema separation over convenience** — Reflection is stored as a strict 1:1 companion table (`reflection_details`) to `journal_entries`, not new columns bolted onto the journal table, so reflection-specific fields (prompts, arcs, emotion deltas) can evolve independently of core journaling.
5. **Flag-gate first, prove later** — all three features shipped **flag-gated OFF by default**. This is not a placeholder state; it is the deliberate go-live posture until safety evals (medical), abuse/cost controls (try-on generation), and consent UX (document memory) are proven in staging.

### Strategic Importance
> "SIA securely reads your life and health documents, turns them into usable personal intelligence, explains what they mean, cites the exact source, and helps you take the next right action." — `docs/2026-06-21-sia-document-intelligence-roadmap.md`

Document Intelligence is what turns SIA from a coach that only knows what a user *tells* it into a coach that can reason over what a user *has* — lab reports, prescriptions, plans, journals-as-files. The Double-Tap Reflection System is what makes momentary self-awareness ("I felt proud after that workout") a structured, coachable signal instead of lost free text. Virtual Try-On is a smaller, self-contained bet: a distinct fashion/style use case that gives SIA a foothold in a life domain (personal style/confidence) none of the fitness/nutrition/wellbeing pillars cover, using a real computed style profile rather than an invented "style score."

### Honest Rollout Status (read this before anything else in this document)

| Layer | Status |
|---|---|
| Backend (services, tables, endpoints) | **Built and merged** for all 7 features below |
| Automated tests | Unit + integration suites green at merge time (per project delivery log) |
| Production feature flags | **OFF** for Document Intelligence (`ENABLE_DOC_INTELLIGENCE`, `ENABLE_DOC_RAG`, `ENABLE_DOC_MEDICAL`) and Virtual Try-On (`VIRTUAL_TRYON_ENABLED`) |
| Reflection System | **Live, not flag-gated** — ships as part of core journaling |
| Medical severity/red-flag classifier (F15.5) | **Designed, not implemented** — only consent-gating and basic out-of-range value flagging shipped |
| Consent UX / live end-to-end validation | **Open** — flagged as a go-live blocker in the project delivery log, not yet closed |

This epic documents real, merged code — not a proposal. Where a sub-capability is designed but not built (Life Memory Extraction, Imaging/DICOM, the medical severity classifier), this document says so explicitly rather than describing it as shipped. See "Roadmap — Deferred Waves" at the end of this document.

### Feature Scope (7 Features)

| Feature | Description | Flag | Status |
|---------|-------------|------|--------|
| **F15.1** | Document Upload & Vault | `ENABLE_DOC_INTELLIGENCE` | Shipped, flag OFF |
| **F15.2** | Ingestion Pipeline (Parse → OCR → Chunk → Embed) | `ENABLE_DOC_INTELLIGENCE` | Shipped, flag OFF |
| **F15.3** | Ask My Documents (Cited RAG) | `ENABLE_DOC_RAG` | Shipped, flag OFF |
| **F15.4** | Document → Wiki Conversion + @mention | `ENABLE_DOC_INTELLIGENCE` | Shipped, flag OFF |
| **F15.5** | Medical Report Analyzer (non-diagnostic) | `ENABLE_DOC_MEDICAL` | **Partially shipped** — consent gate + out-of-range flagging only; severity/red-flag classifier not built |
| **F15.6** | Double-Tap Reflection System | none (live) | Shipped, live |
| **F15.7** | Virtual Try-On / AI Fashion Studio | `VIRTUAL_TRYON_ENABLED` | Shipped (MVP + Wave 1+2 redesign), flag OFF |

---

## F15.1: DOCUMENT UPLOAD & VAULT

### Description
The entry point of Document Intelligence: a secure, per-user vault where users upload personal documents — medical reports, career docs, financial statements, journals-as-files, plans and routines — for SIA to later read, cite, and reason over. Reuses the platform's existing R2 object storage service rather than standing up a parallel storage path, and enforces a hard 5MB upload cap validated at both the edge (multipart middleware) and the database (a `CHECK` constraint) as a last line of defense.

### User Story
As a **Holistic Health Seeker** (P1), I want to upload my lab reports, prescriptions, and personal documents into a secure vault so that SIA can read them later and I don't have to re-type or re-explain what's already written down.

### Flexibility Modes

| Mode | Experience |
|------|------------|
| **Light** | Upload → the document appears in a flat, reverse-chronological list with a status badge (uploaded/parsing/parsed/embedded/failed). No filtering, no chunk-level detail. |
| **Deep** | Full vault view: filter by `source_kind` and status, per-document page count and chunk count, retry a failed ingest, view raw extracted text, jump straight into "Ask this document" or "Convert to wiki page." |

### Technical Foundation

**Routes** — `server/src/routes/document.routes.ts`, base `/api/v1/documents`. The entire router is wrapped in a feature-flag gate that returns a `404 Not Found` (not a `403`) when `ENABLE_DOC_INTELLIGENCE` is off — the module "doesn't exist" rather than "exists but is locked," to avoid leaking feature surface to unauthenticated probing:
```ts
router.use((_req, _res, next) => {
  if (!env.documents.enabled) return next(ApiError.notFound('Not found'));
  next();
});
```
- `POST /` — `createDocument` (multipart upload)
- `GET /` — `listDocuments` (validated query: status/source_kind filters)
- `GET /:id`, `GET /:id/file`, `GET /:id/raw` — metadata, signed file download, and a self-authenticating inline stream (`?t=` short-lived token so an `<iframe>`/`<img>` without an `Authorization` header still works — this route intentionally precedes the `authenticate` middleware)
- `POST /:id/retry` — manual re-ingest (see F15.2)
- `DELETE /:id` — soft delete (`deleted_at`)

**Upload service** — `server/src/services/documents/document-upload.service.ts`: validates size (≤5MB) and MIME/extension, uploads to R2 via the *existing* storage service (`server/src/services/r2.service.ts`, `r2Service.upload(..., { fileType: 'document' })` — no new storage integration), inserts the `documents` row, then kicks off ingestion fire-and-forget (`void ingestDocument(...).catch(...)` — upload-time failures are caught and logged, never thrown back to the HTTP response).

**Table: `documents`** (`server/src/database/tables/137-documents.sql`):

| Column | Type | Notes |
|---|---|---|
| `id` | UUID PK | |
| `user_id` | UUID FK → users, `ON DELETE CASCADE` | |
| `title` | VARCHAR(300) | |
| `source_kind` | enum: pdf, docx, txt, csv, image, xlsx, pptx, audio, video, markdown | markdown added 2026-07-07 |
| `mime_type` | VARCHAR(150) | |
| `byte_size` | INTEGER, `CHECK (byte_size <= 5242880)` | 5MB hard cap enforced in the DB |
| `page_count`, `chunk_count` | INTEGER | populated post-ingest |
| `storage_key` | TEXT | R2 object key |
| `status` | enum: uploaded, parsing, parsed, embedded, failed | |
| `parse_error` | TEXT | |
| `is_medical` | BOOLEAN | set by keyword-hint detection (see F15.5) |
| `wiki_page_id` | UUID FK → wiki_pages, `ON DELETE SET NULL` | set after doc→wiki sync (F15.4) |
| `report_date` | DATE | parsed from document body when confidently extractable; trends fall back to `created_at` |
| `deleted_at`, `created_at`, `updated_at` | | |

`UNIQUE (user_id, storage_key)`; index `idx_documents_user_status (user_id, status, created_at DESC)`.

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Upload success rate | ≥99% of valid files (≤5MB, supported type) | Upload endpoint success/failure ratio |
| Per-user isolation | 0 cross-user document reads in isolation test suite | Automated isolation tests (per Wave 3 exit criteria) |
| Time-to-list | Document appears in list within 1s of upload response | Upload → list round-trip timing |
| Vault return rate | ≥30% of uploaders return to the vault within 7 days | Product analytics (post flag-on) |

### Acceptance Criteria

- [x] Upload accepts PDF/DOCX/TXT/CSV/image/XLSX/PPTX/audio/video/markdown, rejects other types and anything >5MB (edge + DB-level enforcement)
- [x] Upload reuses the existing R2 object storage service — no new storage integration
- [x] Per-user document isolation: `user_id` scoping on every list/get/delete query
- [x] Soft delete (`deleted_at`) — a deleted document's chunks and file are never retrievable afterward (see F15.3 cascade guarantee)
- [x] Upload failures never crash the request path (ingestion is fire-and-forget with caught/logged errors)
- [x] Raw inline file view works without an `Authorization` header via short-lived signed token
- [ ] Document versioning (re-upload a newer version of the same document, diff against the prior version) — **not built**; each upload is a new, independent row
- [ ] Malware/virus scanning on upload — **not built**; listed under the plan's "Hardening" track, not yet implemented

### Error Handling Scenarios

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| **File exceeds 5MB** | Multipart middleware size check + DB `CHECK` constraint as backstop | Reject before upload starts | "This file is larger than 5MB. Please upload a smaller version." |
| **Unsupported file type** | MIME/extension whitelist check | Reject at edge | "This file type isn't supported yet." |
| **R2 upload fails mid-request** | Storage service throws | Return 5xx, no `documents` row created (upload and DB insert are sequenced, not parallel) | "Upload failed. Please try again." |
| **Ingestion fails after upload succeeds** | `ingestDocument()` throws, caught in the fire-and-forget wrapper | Document row persists with `status = 'failed'` and `parse_error` populated; visible in vault with a retry action | "We couldn't process this document. Tap to retry." |
| **User uploads the same file twice** | `UNIQUE (user_id, storage_key)` | R2 key is content-derived, so an identical re-upload conflicts cleanly rather than duplicating storage | Handled silently — existing document is returned |

### Upload & Vault Flow (High-Level)

```
Document Upload Process:

1. Client submits multipart form (file) to POST /v1/documents
2. Edge validation: MIME/extension whitelist, size <= 5MB
3. Upload to R2 via existing r2Service.upload(file, { fileType: 'document' })
4. Insert `documents` row: status = 'uploaded', is_medical = detectMedical(filename/content-hint)
5. Return 201 to client immediately (vault shows the row with status 'uploaded')
6. Fire-and-forget: void ingestDocument(documentId).catch(err => logger.error(...))
   -- errors here NEVER propagate back to the HTTP response --
7. ingestDocument() drives status: uploaded -> parsing -> parsed -> embedded (or -> failed)
8. Client polls / re-fetches GET /:id to observe status transitions
```

### Cross-Pillar Connections

**To Ingestion Pipeline (F15.2):** every successful upload triggers ingestion; vault status reflects pipeline stage in real time.

**To Ask My Documents (F15.3):** only `embedded` documents are retrievable by RAG; the vault is the entry point users return to when they want to query a specific file.

**To Personal Wiki:** a vault document can be converted into a wiki page (F15.4), after which it also appears in the wiki's `DocumentsPanel`.

**To Medical Report Analyzer (F15.5):** `is_medical` is set at upload/parse time and gates whether `/analytics` and medical-mode `/ask` are reachable.

### Dependencies
- **R2 object storage service** (`server/src/services/r2.service.ts`) — reused, not extended
- **`ENABLE_DOC_INTELLIGENCE` flag** — master gate for the entire module
- **Personal Wiki module** — target of F15.4 conversion

### MVP Status
[X] Shipped — flag-gated OFF (`ENABLE_DOC_INTELLIGENCE`)

---

## F15.2: INGESTION PIPELINE (PARSE → OCR → CHUNK → EMBED)

### Description
The background pipeline that turns an uploaded file into searchable, citable knowledge: parse the native format, OCR any scanned/image content through the *existing* vision pipeline, split into page-anchored chunks, embed each chunk, and (best-effort) extract numeric metrics and sync a wiki page. This is the piece of Document Intelligence that could not simply be reused from existing infrastructure — parsing and citation-grounded chunking were genuinely new — but it deliberately avoids adding a second OCR engine by routing scanned documents through the same Gemini vision transport (`aiProvider.callGeminiVision`) already used elsewhere in the coach.

### User Story
As an **Optimization Enthusiast** (P3), I want my uploaded documents — including scanned images and photographed lab reports — to become fully searchable and machine-readable within seconds, without me having to manually type anything out, so that SIA can immediately answer questions and extract structured data from them.

### Flexibility Modes

| Mode | Experience |
|------|------------|
| **Light** | Ingestion happens invisibly; the vault status badge is the only signal (`parsing` → `embedded`), plus a "Retry" action if it lands on `failed`. |
| **Deep** | Per-document ingestion detail: page count, chunk count, extracted metrics preview, parse error text on failure, manual re-ingest trigger. |

### Technical Foundation

**Orchestrator** — `server/src/services/documents/document-ingest.service.ts`, `ingestDocument()`: parse → chunk → embed → persist → analytics → wiki-sync, wrapped in a **hard 120-second timeout** (`INGEST_TIMEOUT_MS`) so a stalled step (e.g. a slow vision call) cannot leave a document stuck in `parsing` indefinitely — a real reliability gap found and fixed during hardening.

**Parser** — `server/src/services/documents/document-parser.service.ts`, format-specific:

| Format | Library / method |
|---|---|
| PDF | `pdfjs-dist` |
| DOCX | `mammoth` |
| XLSX / PPTX | raw OOXML/zip parsing via `jszip` |
| TXT / CSV / Markdown | native text handling |
| Scanned/image-only PDFs, images | OCR fallback via `defaultOcr` → `aiProvider.callGeminiVision()` — the *same* vision provider used by other photo-based coaching features |
| Audio / video | transcription via `defaultTranscribe`, using the same Gemini vision/multimodal transport |

**Chunker** — `server/src/services/documents/document-chunker.service.ts` — splits parsed segments into page-anchored chunks (the page number is the citation anchor used by F15.3).

**Embedding** — reuses the platform's existing `vectorEmbeddingService.embedTexts()` — no new embedding integration.

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
| `embedding` | TEXT | JSON-string fallback (mirrors the pattern used by `vector_embeddings`) |
| `embedding_vec` | `vector(1536)` | **conditionally added** — only when the `pgvector` extension is present; paired with an `ivfflat` cosine index (`lists = 100`) |

`UNIQUE (document_id, chunk_index)`; indexes on `(document_id, page)` and `(user_id, document_id)`.

**Reliability fixes shipped** (found and fixed as real production issues, not speculative hardening):
- `recoverStuckDocuments()` — boot-time recovery job that re-drives orphaned documents (stale >10 minutes) from R2, bounded to 25 at a time per boot cycle
- `POST /:id/retry` (`reingestDocument()`) — manual retry that re-downloads from R2 and re-runs the full pipeline
- Hard 120s ingest timeout — prevents indefinite `parsing` status
- Fire-and-forget upload-time ingest failures are caught and logged, never thrown to the request path (F15.1)

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Ingestion success rate | ≥95% of valid uploads reach `embedded` without manual retry | `status` distribution on ingestion completion |
| Multi-page PDF page-mapping accuracy | 100% of chunks carry the correct source page | Wave 2 exit criteria (per plan doc) |
| Scanned-document OCR yield | 0 documents land at `embedded` with 0 extracted chunks | Regression test for the "0 chunks" bug class (see reliability fixes above) |
| Ingestion latency (p95) | Complete within 120s (the hard timeout) | `duration_ms` observability on the ingest job |
| Stuck-document recovery | 100% of stale `parsing` documents recovered within one boot cycle | `recoverStuckDocuments()` sweep coverage |

### Acceptance Criteria

- [x] PDF, DOCX, XLSX, PPTX, TXT, CSV, Markdown, image, audio, video all parse into page/segment-anchored chunks
- [x] Scanned/image-only content is OCR'd via the existing vision pipeline — no separate OCR dependency added
- [x] Ingestion is bounded by a hard timeout; no permanent `parsing` state is possible
- [x] Boot-time recovery sweeps and repairs stale/orphaned in-flight documents
- [x] Manual retry endpoint re-runs the full pipeline from the original R2 file
- [x] `document_chunks` carries page-level citation anchors used by F15.3
- [x] pgvector embedding column is added conditionally (graceful degrade when the extension isn't installed — falls back to the JSON-string `embedding` column)
- [x] Best-effort numeric metric extraction (`document_analytics`, see F15.5) and wiki sync (F15.4) run as the final ingest steps, non-fatal to the pipeline if they fail
- [ ] OCR confidence scoring / low-confidence flagging surfaced to the user — **not built**; OCR output is trusted as-is

### Error Handling Scenarios

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| **Ingestion exceeds 120s** | Hard timeout wrapper (`withTimeout`) | Document marked `failed`, `parse_error` set, retry available | "This document is taking longer than expected. Tap to retry." |
| **Server restarts mid-ingest** | `recoverStuckDocuments()` finds stale (>10 min) `parsing` rows on boot | Re-drives ingestion from the R2 original, bounded to 25/boot | Silent recovery — document transitions to `embedded` without user action |
| **Scanned PDF yields 0 extractable text** | Parser returns empty segments post-OCR | Falls back to OCR on raw PDF bytes; if still empty, document lands `failed` with a specific `parse_error` | "We couldn't extract readable text from this file." |
| **pgvector extension unavailable** | Extension check at migration time | Silently skip `embedding_vec` column/index; chunk retrieval falls back to the JSON-string `embedding` + keyword ranking | No user-facing impact |
| **Embedding call fails** | Embedding service throws | Chunk persists with `content` but no embedding; excluded from vector retrieval, still eligible for keyword-based candidate search | Document may show `parsed` but not `embedded`; retry available |

### Ingestion Pipeline (High-Level)

```
ingestDocument(documentId):

1. status = 'parsing'
2. Download original file from R2 (storage_key)
3. Parse by source_kind:
     pdf/docx/xlsx/pptx/txt/csv/markdown -> native parser
     image, or PDF with no extractable text -> OCR via aiProvider.callGeminiVision
     audio/video -> transcription via the same Gemini multimodal transport
4. Chunk parsed segments (page-anchored), status = 'parsed'
5. Embed each chunk via vectorEmbeddingService.embedTexts()
   -- entire step wrapped in withTimeout(INGEST_TIMEOUT_MS = 120_000) --
6. Persist document_chunks (embedding TEXT + optional embedding_vec)
7. status = 'embedded', chunk_count/page_count updated
8. Best-effort, non-fatal:
     a. extractMetrics(segments) -> document_analytics (F15.5)
     b. detectMedical(content) -> documents.is_medical
     c. syncDocumentToWiki(documentId) -> wiki_pages (F15.4)
9. On any hard failure above step 5: status = 'failed', parse_error set

Boot-time (separate job):
  recoverStuckDocuments(): find documents WHERE status='parsing' AND updated_at < now()-10min
                            LIMIT 25 -> re-run ingestDocument() for each
```

### Cross-Pillar Connections

**To Document Upload & Vault (F15.1):** vault status badges are a direct read of pipeline stage.

**To Ask My Documents (F15.3):** `document_chunks` is the retrieval corpus; nothing is answerable until it exists.

**To Medical Report Analyzer (F15.5):** `document_analytics` metric extraction and `is_medical` detection both run as ingest steps.

**To Document → Wiki (F15.4):** wiki sync is the final, best-effort ingest step.

### Dependencies
- **F15.1 (Upload & Vault):** source of the raw file and `documents` row
- **Existing vector embedding service** (`vectorEmbeddingService`) — reused, not rebuilt
- **Existing Gemini vision provider** (`aiProvider.callGeminiVision`) — reused as the OCR/transcription path
- **pgvector extension** (optional; graceful degrade when absent)

### MVP Status
[X] Shipped — flag-gated OFF (`ENABLE_DOC_INTELLIGENCE`); reliability hardening (timeout, boot-recovery, retry) shipped 2026-07-06/2026-07-07

---

## F15.3: ASK MY DOCUMENTS (CITED RAG)

### Description
A citation-validated retrieval-augmented-generation tool that lets a user query their own uploaded documents conversationally, and — critically — never lets the model answer past what it can ground in an actual retrieved chunk. Every claim in the response must resolve to a cited page; if the citation validator can't confirm grounding, the system returns a fixed honest-null message instead of a plausible-sounding guess.

### User Story
As a **Busy Professional** (P2), I want to ask "What did my blood test say about cholesterol?" and get a direct, sourced answer from my uploaded lab report so that I don't have to reread a multi-page PDF myself.

### Flexibility Modes

| Mode | Experience |
|------|------------|
| **Light** | Ask a question in chat; get a short grounded answer with inline page citations, no visible retrieval mechanics. |
| **Deep** | Scope the question to specific `@mentioned` documents, view the exact retrieved chunks behind an answer, see the `grounded`/`usedChunks` diagnostic, and re-ask if the answer is "not found." |

### Technical Foundation

**Route** — `POST /v1/documents/:id/ask` (`server/src/routes/document.routes.ts`), gated by `ENABLE_DOC_INTELLIGENCE` (router-level) and `ENABLE_DOC_RAG` (endpoint-level, checked in the controller) — two independent flags, so RAG can stay off even after the vault itself is enabled.

**Service** — `server/src/services/documents/document-rag.service.ts`, `answerFromDocuments()`:
1. Extract keywords from the question
2. `documentRepository.searchChunkCandidates()` — pulls a candidate pool (`POOL_SIZE = 40`) scoped to the user (and, if `@mentioned`, to specific `documentIds`)
3. `rankChunks()` — ranks candidates by keyword overlap with the question, returns the top `TOP_K = 6`
4. If zero candidates match → return `HONEST_NULL` immediately, no LLM call spent
5. Build a strict grounding prompt and call Gemini:
```ts
const SYSTEM_PROMPT =
  "You answer strictly from the user's document excerpts provided below. Use ONLY " +
  'facts present in those excerpts — never outside knowledge. After each claim, cite ' +
  'the page like "(page N)". If the answer is not in the excerpts, say you could not ' +
  'find it in their documents. Be concise and factual; do not diagnose.';
```
6. `validateCitations()` (`server/src/services/documents/citation-validator.ts`) parses the raw answer against the actually-retrieved chunks and returns `{ groundedAnswer, citations, isGrounded, droppedSentences }` — sentences that can't be traced to a cited chunk are dropped, not silently kept
7. If `!isGrounded` → return `HONEST_NULL = "I couldn't find that in your document(s)."`
8. If the source document `isMedical`, append the fixed non-diagnostic disclaimer to the grounded answer:
```ts
export const MEDICAL_DISCLAIMER =
  'Note: these are the values stated in your document, not a diagnosis. Please discuss anything concerning with your doctor.';
```

**Medical-mode guard messages** (returned before any RAG call, per F15.5's consent gate):
```ts
export const MEDICAL_NOT_ENABLED =
  "This looks like a medical document. Medical document analysis isn't enabled on your account, so I can't answer questions about it.";
export const MEDICAL_CONSENT_REQUIRED =
  'This looks like a medical document. To analyze it or answer questions about it, please turn on medical analysis first.';
```

**Deletion guarantee:** because `document_chunks` cascades on `document_id` (`ON DELETE CASCADE`), a deleted document's chunks are physically gone, not just filtered out — the "deleted docs never retrievable" exit criterion (Wave 3) is a hard DB guarantee, not an application-level filter that could be bypassed by a bug.

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Citation groundedness | 0 answers ship un-cited to a source chunk (validator rejects, falls to `HONEST_NULL`) | `isGrounded` false-rate on the citation validator |
| "Not found" honesty rate | 100% of questions with no matching chunk return `HONEST_NULL`, never a fabricated answer | Unit tests on `rankChunks()` zero-candidate path |
| Cross-user isolation | 0 leakage incidents in isolation test suite | Automated isolation tests (Wave 3 exit criteria) |
| Deleted-document retrieval | 0 chunks retrievable after document deletion | `ON DELETE CASCADE` integrity + regression test |
| Answer latency (p95) | <5s from question to grounded answer | RAG service timing (retrieval + 1 LLM call) |

### Acceptance Criteria

- [x] Answers are generated strictly from retrieved chunk content — the system prompt explicitly forbids outside knowledge
- [x] Every claim is expected to carry a page citation; ungrounded claims are dropped by the citation validator, not passed through
- [x] Zero-candidate questions short-circuit to `HONEST_NULL` without spending an LLM call
- [x] Medical documents get a fixed non-diagnostic disclaimer appended to every grounded answer
- [x] Medical documents are blocked from RAG entirely until `ENABLE_DOC_MEDICAL` is on AND the user has granted consent (two independent gates)
- [x] Deleted documents' chunks are unreachable (DB cascade, not app-level filtering)
- [x] Question scope can be narrowed to specific `@mentioned` documents via `documentIds`
- [ ] Confidence score surfaced per-citation (e.g. "high/medium/low confidence") — **not built**; grounding is binary (grounded/not grounded)
- [ ] Multi-document synthesis with cross-document citation ("your March and June labs both show...") — **not explicitly tested**; the retrieval pool can span documents but no dedicated comparison logic exists

### Error Handling Scenarios

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| **Question matches no chunks** | `rankChunks()` returns empty | Skip LLM call entirely | `HONEST_NULL`: "I couldn't find that in your document(s)." |
| **LLM generation call fails** | `generate()` throws (network/provider error) | Caught, logged, falls back to `HONEST_NULL` | Same honest-null message — failure is indistinguishable from "not found" to the user, by design (no error leakage) |
| **Answer references facts not in retrieved chunks** | `validateCitations().isGrounded === false` | Entire answer discarded, `HONEST_NULL` returned | "I couldn't find that in your document(s)." — never a partially-hallucinated answer |
| **Question targets a medical document, medical mode off** | `documents.is_medical === true` AND `!env.documents.medicalEnabled` | Short-circuit before retrieval | `MEDICAL_NOT_ENABLED` message |
| **Question targets a medical document, no consent granted** | `is_medical === true` AND `medicalEnabled` AND `!hasMedicalConsent()` | Short-circuit before retrieval | `MEDICAL_CONSENT_REQUIRED` message |

### Retrieval → Answer → Validation Flow (High-Level)

```
answerFromDocuments(userId, question, { documentIds?, isMedical? }):

1. terms = extractKeywords(question)
2. candidates = searchChunkCandidates(userId, { documentIds, terms, poolSize: 40 })
3. top = rankChunks(question, candidates, topK: 6)   -- keyword-overlap scoring
4. if top.length === 0: return { answer: HONEST_NULL, grounded: false }

5. context = top.map(c => `[Page ${c.page}]\n${c.content}`).join('\n\n')
6. raw = generate(SYSTEM_PROMPT, `Excerpts:\n${context}\n\nQuestion: ${question}...`)
   -- on failure: return { answer: HONEST_NULL, grounded: false }

7. result = validateCitations(raw, top)
   -- drops any sentence that can't be traced to a retrieved chunk --
8. if !result.isGrounded: return { answer: HONEST_NULL, grounded: false }

9. answer = isMedical ? `${result.groundedAnswer}\n\n${MEDICAL_DISCLAIMER}` : result.groundedAnswer
10. return { answer, citations: result.citations, grounded: true, usedChunks: top.length }
```

### Cross-Pillar Connections

**To Ingestion Pipeline (F15.2):** `document_chunks` is the entire retrieval corpus; nothing is answerable pre-`embedded`.

**To Document → Wiki + @mention (F15.4):** `documentIds` scoping is how an `@mentioned` document in chat/journal narrows a question.

**To Medical Report Analyzer (F15.5):** medical-mode answers are gated by both flag and consent, and carry the non-diagnostic disclaimer.

**To Epic 11 (SIA Cognitive OS):** shares the crisis/safety escalation infrastructure — a red-flag finding in a medical document (once F15.5's classifier is built) would route through the same escalation path as other crisis signals in the coach.

### Dependencies
- **F15.2 (Ingestion Pipeline):** source of `document_chunks`
- **`ENABLE_DOC_RAG` flag** — independent of the master `ENABLE_DOC_INTELLIGENCE` flag
- **F15.5 (Medical consent):** gates medical-document answers specifically
- **Existing Gemini text provider** (`aiProvider.callGeminiText`) — reused, not a new LLM integration

### MVP Status
[X] Shipped — flag-gated OFF (`ENABLE_DOC_RAG`)

---

## F15.4: DOCUMENT → WIKI CONVERSION + @MENTION

### Description
Bridges Document Intelligence into the platform's existing Personal Wiki system. A parsed document can be synced into a wiki page (a "synthesis" page containing an extracted-values table and, for medical documents, a non-diagnostic note), after which it participates in the wiki's general page-mention system (`@workout`, `@nutrition`, `@a-lab-report`, etc.) inside journal entries and chat. This is a genuine cross-feature bridge: the `@mention` mechanism itself is not document-specific — it is the platform's existing wiki page-mention system — but a document only becomes mentionable once it has a wiki page.

### User Story
As an **Optimization Enthusiast** (P3), I want an uploaded document to become a linkable page in my personal wiki so that I can reference it inline while journaling or chatting with SIA — the same way I already reference workouts or meals — without re-uploading or re-explaining it.

### Flexibility Modes

| Mode | Experience |
|------|------------|
| **Light** | Document → wiki conversion happens automatically as the last ingest step; the user simply finds the document listed alongside other wiki pages. |
| **Deep** | View the generated wiki page's extracted-values table, manually trigger `@mention` from the journal/chat composer, browse the wiki's `DocumentsPanel` and `DocumentTrendsPanel` for cross-document metric trends. |

### Technical Foundation

**Doc → wiki sync** — `server/src/services/documents/document-wiki.service.ts`, `syncDocumentToWiki()`: builds a Markdown wiki page (`pageType: 'synthesis'`) via the platform's existing `wikiService.createPage()` — no parallel wiki-writing path — including an extracted-values table (from `document_analytics`, F15.5) and, for medical documents, a fixed non-diagnostic note:
```
> These values are transcribed from your document for reference only. They are
> **not** a diagnosis — discuss anything concerning with your doctor.
```
The resulting page id is written back to `documents.wiki_page_id`. This step is **best-effort and non-fatal** — a wiki-sync failure never fails the overall ingest pipeline (F15.2).

**@mention system** — `server/src/services/wellbeing/mention.service.ts`: walks a journal entry's TipTap `content_json` document tree for `type === 'mention'` nodes and persists them to `journal_entry_mentions`. This is a **derived cache**, recomputed from `content_json` on every journal create/update — the TipTap document is the single source of truth, so the mentions table can never drift from what the user actually wrote.

**Table: `journal_entry_mentions`** (`server/src/database/tables/138-journal-entry-mentions.sql`):

| Column | Type | Notes |
|---|---|---|
| `journal_entry_id` | UUID FK → journal_entries, `ON DELETE CASCADE` | |
| `user_id` | UUID FK → users, `ON DELETE CASCADE` | |
| `mention_slug` | TEXT, `CHECK (~ '^[a-z0-9]+(-[a-z0-9]+)*$')` | kebab-case @-id, e.g. `workout`, `a-lab-report` |
| `mention_label` | TEXT, 1-60 chars | |
| `mention_type` | `page` \| `sub_page` | |
| `target_href` | TEXT | route the chip links to |
| `source` | `inline` \| `page_double_tap` | how the mention entered the document — `page_double_tap` is the same source value used by the Double-Tap Reflection System (F15.6) when it auto-inserts a mention chip |

`UNIQUE (journal_entry_id, mention_slug)`.

**Separate, related capability — document keyword search:** `GET /v1/documents/intelligence/mentions?term=` (`getDocumentMentionsHandler`, backed by `findDocumentsMentioning()`) is a plain text search across document content for a keyword — it is **not** the same system as the TipTap `@mention` node mechanism above, despite the similar name. It exists to answer "which of my documents talk about X" without opening the RAG chat.

**Cross-document trends** — `document-analytics.service.ts` also powers `GET /intelligence/metrics` (`getMetricTrendsHandler`) and `GET /intelligence/metrics/:label` (`getMetricTimelineHandler`), returning `{ trends, total, hasMore }` — paginated as of the 2026-07-07 commit (`markdown source-kind, preview URLs, trends pagination`), rendered by the wiki's `DocumentTrendsPanel.tsx`.

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Wiki sync success rate | ≥98% of `embedded` documents produce a wiki page | `wiki_page_id` non-null rate on embedded documents |
| Mention accuracy | 100% of TipTap mention nodes present in `content_json` are reflected in `journal_entry_mentions` | Derived-cache consistency check (recompute-on-write invariant) |
| Trends load time | <1s for a paginated metric-trend page | `getMetricTrendsHandler` response timing |
| Cross-reference discoverability | Users who convert ≥1 document to wiki reference it via `@mention` within 7 days at ≥25% rate | Product analytics (post flag-on) |

### Acceptance Criteria

- [x] Every `embedded` document attempts a best-effort wiki sync as the final, non-fatal ingest step
- [x] Medical documents' wiki pages carry the fixed non-diagnostic note
- [x] `@mention` nodes in journal `content_json` are the single source of truth; `journal_entry_mentions` is a pure derived cache, recomputed on every write
- [x] Document keyword search (`/intelligence/mentions?term=`) is available independently of RAG (works even with `ENABLE_DOC_RAG` off, as long as `ENABLE_DOC_INTELLIGENCE` is on)
- [x] Cross-document metric trends are paginated (not a full unbounded fetch) as of the 2026-07-07 fix
- [x] Wiki `DocumentsPanel`, `DocumentViewerModal`, and `DocumentTrendsPanel` render converted documents inline in the existing Personal Wiki UI
- [ ] Bi-directional sync (editing the generated wiki page updates the source document) — **not built**; sync is one-directional, document → wiki, at ingest time only

### Error Handling Scenarios

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| **Wiki sync fails** | `wikiService.createPage()` throws | Caught inside `syncDocumentToWiki()`, logged, ingest pipeline continues to completion | Document still lands `embedded`; simply has no `wiki_page_id` (silently absent from wiki views) |
| **Mention references a page that no longer exists** | `target_href` route 404s | Chip renders but is inert on click | Chip shown with a muted/disabled visual state (frontend responsibility) |
| **User edits journal content, removes a mention** | Recompute-on-write diff | Row deleted from `journal_entry_mentions` on next save | Silent — cache follows the document |
| **Metric trends query returns >1 page** | `hasMore: true` in response | Client requests next page via cursor, not a full re-fetch | "Load more" affordance in `DocumentTrendsPanel` |

### Doc → Wiki + Mention Flow (High-Level)

```
Wiki Sync (final ingest step, best-effort):
1. syncDocumentToWiki(documentId):
     a. Build Markdown body: summary + extracted-values table (document_analytics)
     b. If is_medical: append fixed NON_DIAGNOSTIC_NOTE
     c. wikiService.createPage({ pageType: 'synthesis', ... })
     d. documents.wiki_page_id = new page id
   -- any failure here is caught and logged; ingest pipeline still completes --

@mention (independent, general wiki mechanism):
1. User types "@" in journal/chat composer -> page picker (includes doc-derived wiki pages)
2. On save: parse content_json for { type: 'mention' } nodes
3. DELETE existing journal_entry_mentions for this entry, INSERT current set
   -- pure recompute-from-source-of-truth, never an incremental patch --
4. Mention chip renders with mention_label, links to target_href
```

### Cross-Pillar Connections

**To Ingestion Pipeline (F15.2):** wiki sync is the pipeline's final step.

**To Ask My Documents (F15.3):** `@mentioned` documents narrow RAG question scope via `documentIds`.

**To Double-Tap Reflection (F15.6):** shares the `source = 'page_double_tap'` mention-origin value — a double-tap reflection can auto-insert a mention chip the same way a manual `@mention` does.

**To existing Personal Wiki module:** this feature is entirely a bridge *into* an already-shipped system, not a new wiki implementation.

### Dependencies
- **Personal Wiki module** (`wikiService`, `wiki_pages` table) — pre-existing, reused
- **F15.2 (Ingestion Pipeline):** triggers the sync
- **F15.5 (Medical Report Analyzer):** supplies `document_analytics` for the extracted-values table and the non-diagnostic note trigger

### MVP Status
[X] Shipped — flag-gated OFF (`ENABLE_DOC_INTELLIGENCE`); trends pagination fix shipped 2026-07-07

---

## F15.5: MEDICAL REPORT ANALYZER (FLAG-GATED, NON-DIAGNOSTIC)

### Description
A safety-scoped analysis mode specifically for medical documents (lab reports, prescriptions). **This feature is only partially shipped, and this document says so explicitly rather than describing the full design as built.** What shipped: keyword-hint medical-document detection, a two-layer consent gate (flag + explicit user consent), best-effort numeric metric extraction with out-of-range flagging, and fixed non-diagnostic disclaimer copy wired into both RAG answers (F15.3) and the wiki sync (F15.4). What was designed but **not implemented**: the severity-tier (e.g. green/yellow/red) classification system and a red-flag → crisis-escalation classifier described in the original Wave 5 plan.

### User Story
As a **Holistic Health Seeker** (P1), I want SIA to explain what my lab report values mean and flag anything outside the normal range, without ever telling me it has diagnosed me, so that I understand my own health data and know when to bring something up with my doctor.

### Flexibility Modes

| Mode | Experience |
|------|------------|
| **Light** | A single-consent toggle turns medical analysis on; out-of-range values are surfaced with a plain-language note and the fixed non-diagnostic disclaimer. |
| **Deep** | Per-metric view: value, unit, reference range, in/out-of-range flag, source page — plus the wiki-synced extracted-values table (F15.4) and metric trend charts across multiple reports (F15.4's `/intelligence/metrics`). |

### Technical Foundation

**Medical detection** — `detectMedical()` in `document-parser.service.ts`: a keyword-hint match (`mg/dl`, `cholesterol`, `hba1c`, `creatinine`, `blood pressure`, `diagnosis`, `patient`, `reference range`, etc.) against parsed content, sets `documents.is_medical`. This is a heuristic, not a classifier with a confidence score.

**Consent gate** — `server/src/services/documents/document-consent.service.ts` (`hasMedicalConsent()`, `grantMedicalConsent()`), exposed via `GET/POST /v1/documents/consent`. Both `/analytics` and medical-mode `/ask` require **two independent conditions**: `env.documents.medicalEnabled` (the `ENABLE_DOC_MEDICAL` flag) AND an explicit consent record for that user — flag-on alone does not unlock medical analysis for a user who hasn't consented.

**Metric extraction** — `server/src/services/documents/document-analytics.service.ts`, `extractMetrics()`: a deterministic, pure regex-based extractor over parsed text lines (pattern: `label, number, optional unit, optional (low-high) range`), explicitly documented in its own file header as "non-diagnostic: it only records values and whether they fall outside a stated reference range." Deduplicates by lowercased label (first occurrence wins), skips date-like lines and bare "label + number" prose noise (e.g. "Page 1 of 3"), requires either a unit or a reference range to accept a candidate as a real metric.

**Table: `document_analytics`**:

| Column | Type | Notes |
|---|---|---|
| `document_id`, `user_id` | UUID FK, `ON DELETE CASCADE` | |
| `metric_label` | VARCHAR(200) | e.g. "LDL Cholesterol" |
| `metric_value` | NUMERIC | never a float — matches the platform-wide money/decimal discipline |
| `metric_unit` | VARCHAR(50) | |
| `ref_low`, `ref_high` | NUMERIC | parsed reference range, if stated |
| `out_of_range` | BOOLEAN | `value < ref_low OR value > ref_high` |
| `source_page` | INTEGER | citation anchor, same convention as `document_chunks.page` |

**Non-diagnostic disclaimers (exact, fixed strings — not model-generated, so they can't drift or be argued around):**
```ts
// document-rag.service.ts
export const MEDICAL_DISCLAIMER =
  'Note: these are the values stated in your document, not a diagnosis. Please discuss anything concerning with your doctor.';

// document-wiki.service.ts
NON_DIAGNOSTIC_NOTE =
  '> These values are transcribed from your document for reference only. They are ' +
  '**not** a diagnosis — discuss anything concerning with your doctor.';
```

**Explicit implementation gap (Wave 5 partial):** the original plan (`docs/2026-06-21-sia-document-intelligence-plan.md`, Wave 5) specifies a severity-tier classifier (green/yellow/orange/red or similar) and a red-flag → escalation path routing serious findings toward a clinician-referral message, sharing infrastructure with the coach's existing crisis/safety escalation (Epic 11). **Neither exists in the codebase today.** `document_analytics.out_of_range` is a boolean derived purely from a stated numeric reference range — there is no severity weighting, no clinical-significance model, and no escalation trigger wired to any out-of-range finding, however extreme.

### Success Metrics

| Metric | Target | Measurement | Status |
|--------|--------|-------------|--------|
| Medical-document detection precision | ≥90% of true medical documents flagged `is_medical` | Manual review sample | Achievable with current keyword heuristic — untested at scale |
| Metric extraction accuracy | ≥85% of clearly-labeled lab values extracted correctly | Manual review against source PDFs | Deterministic regex — accuracy bounded by report formatting variance |
| Non-diagnosis language leakage | 0% — zero instances of diagnostic language in any medical-mode response | Eval harness (planned, not yet built) | **Not measured** — no automated eval harness exists yet |
| Red-flag detection recall | Target for a **future** classifier — not applicable to current shipped scope | N/A | **Not applicable — capability not built** |
| Consent opt-in rate | Tracked once flag is on | Consent grant rate among users who upload a medical-flagged document | Pending flag-on |

### Acceptance Criteria

- [x] Medical documents are detected via keyword heuristic and marked `is_medical`
- [x] Medical analysis requires both the `ENABLE_DOC_MEDICAL` flag AND explicit per-user consent — flag alone is insufficient
- [x] Numeric metrics are extracted deterministically with out-of-range flagging against a stated reference range
- [x] Every medical-mode RAG answer and every medical wiki page carries a fixed, non-model-generated non-diagnostic disclaimer
- [x] Medical-mode "not enabled" and "consent required" states return distinct, clear messages (not a generic error)
- [ ] Severity-tier classification (e.g. mild/moderate/severe out-of-range) — **not built**
- [ ] Red-flag detection and clinician-referral escalation — **not built**
- [ ] Wiring into Epic 11's crisis/safety escalation path for serious findings — **not built**
- [ ] Automated safety eval harness (red-flag recall, false-reassurance rate, diagnosis-language-leakage rate) — **not built**; this is also the explicit go/no-go gate (G2 in the roadmap doc) for enabling consumer medical mode, so `ENABLE_DOC_MEDICAL` should not be turned on in production until this exists

### Error Handling Scenarios

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| **Medical document, flag off** | `is_medical && !env.documents.medicalEnabled` | Block before any analysis | `MEDICAL_NOT_ENABLED` |
| **Medical document, flag on, no consent** | `is_medical && medicalEnabled && !hasMedicalConsent()` | Block before any analysis | `MEDICAL_CONSENT_REQUIRED` |
| **Metric extraction regex misparses a value** | No confidence signal exists on the extractor today | Value persists as extracted — no automated re-validation | No user warning currently surfaced; **flagged as a gap**, not a designed behavior |
| **Extreme out-of-range value (potential red flag)** | `out_of_range = true`, same as a marginal deviation | No differentiated handling — treated identically to a mild deviation | No escalation; **this is the core gap this section documents** |
| **Document misclassified as non-medical** | Keyword heuristic misses domain-specific terminology | Document proceeds through the standard (non-medical) RAG/wiki path, no disclaimer applied | No user warning; **flagged as a gap** |

### Medical Detection & Analytics Flow (High-Level — shipped portion only)

```
Medical Analysis (as actually implemented):

1. During ingest (F15.2):
     is_medical = detectMedical(parsedContent)   -- keyword-hint match, boolean only
     if is_medical: extractMetrics(segments) -> document_analytics rows
                    (metric_label, value, unit, ref_low/high, out_of_range)

2. Gate check (on /analytics and /ask for a medical document):
     if !env.documents.medicalEnabled: return MEDICAL_NOT_ENABLED
     if !hasMedicalConsent(userId):    return MEDICAL_CONSENT_REQUIRED

3. If both gates pass:
     - /analytics returns the document_analytics rows as-is (value, unit, range, out_of_range)
     - /ask (F15.3) appends MEDICAL_DISCLAIMER to every grounded answer
     - Wiki sync (F15.4) appends NON_DIAGNOSTIC_NOTE to the generated page

-- NOT IMPLEMENTED (design only, per Wave 5 of the original plan): --
   severity_tier = classifySeverity(metric, out_of_range, magnitude)  -- does not exist
   if severity_tier === 'red_flag':
     escalate_to_clinician_referral()                                 -- does not exist
     route_through_crisis_safety_layer()                              -- does not exist (would reuse Epic 11)
```

### Cross-Pillar Connections

**To Ingestion Pipeline (F15.2):** medical detection and metric extraction are ingest steps.

**To Ask My Documents (F15.3):** the two-gate consent check and disclaimer injection live in the RAG service.

**To Document → Wiki (F15.4):** the non-diagnostic note and extracted-values table are wiki-sync outputs.

**To Epic 11 (SIA Cognitive OS):** the *design* explicitly calls for sharing Epic 11's crisis/safety escalation infrastructure for red-flag findings — this integration point is real (the infrastructure exists and is reused elsewhere in the coach) but is **not yet wired up** for medical documents specifically.

### Dependencies
- **F15.2 (Ingestion Pipeline):** supplies `is_medical` and `document_analytics`
- **F15.3, F15.4:** consume disclaimers and consent gate
- **`ENABLE_DOC_MEDICAL` flag** + **per-user consent record** — both required
- **Epic 11 (SIA Cognitive OS):** intended (not yet actual) integration point for red-flag escalation

### MVP Status
[~] **Partially shipped** — flag-gated OFF (`ENABLE_DOC_MEDICAL`). Consent gate, keyword detection, and out-of-range flagging are live behind the flag; severity-tier classification and red-flag escalation are designed (Wave 5 of the original plan) but not implemented. **Do not enable in production without first building the safety eval harness** (G2 gate).

---

## F15.6: DOUBLE-TAP REFLECTION SYSTEM

### Description
A lightweight reflection capture mechanic: a reflection *is* a journal entry, with a strict 1:1 companion row (`reflection_details`) that adds structured, coachable fields — importance, emotion before/after (with intensity), motivation/purpose/value codes, and a polymorphic target (which goal/workout/meal/relationship/etc. the reflection is about) — without touching the core `journal_entries` schema. The name comes from the primary capture UX: a user double-taps a card (a completed workout, a logged meal, a goal) to trigger a fast reflection prompt, which auto-inserts a page mention (`source = 'page_double_tap'`) linking the reflection back to what it's about.

### User Story
As a **Holistic Health Seeker** (P1), I want to quickly capture how I felt about something I just did — a workout, a meal, a conversation — with a couple of taps instead of writing a full journal entry, so that SIA can learn what actually matters to me and coach around it.

### Flexibility Modes

| Mode | Experience |
|------|------------|
| **Light** | Double-tap a card → pick importance (1-10) and an emotion before/after → done. No free text required. |
| **Deep** | Full reflection editor: free-text journal body, motivation/purpose/value taxonomy codes, visibility control (`private`/`coach`/`friends`), explicit `feeds_ai` toggle to exclude a reflection from coaching context. |

### Technical Foundation

**Table: `reflection_details`** (`server/src/database/tables/131-reflection-details.sql`), a strict 1:1 companion to `journal_entries` — deliberately kept separate from the core journal schema so reflection-specific fields can evolve independently:

| Column | Type | Notes |
|---|---|---|
| `journal_entry_id` | UUID **PK**, FK → journal_entries, `ON DELETE CASCADE` | the entry *is* the reflection |
| `user_id` | UUID FK → users, `ON DELETE CASCADE` | |
| `target_type` | enum: goal, workout, meal, finance, relationship, wellbeing, prayer, achievement, career, activity, journal | what the reflection is about |
| `target_id`, `target_label` | UUID / TEXT, nullable | |
| `importance` | SMALLINT, `CHECK (1-10)` | |
| `emotion_before`, `emotion_after` | VARCHAR(20), nullable | |
| `emotion_intensity_before`, `emotion_intensity_after` | SMALLINT, `CHECK (1-10)`, nullable | the emotion *delta* is the coachable signal |
| `motivation_code`, `purpose_code` | TEXT, nullable | taxonomy codes (`reflection-taxonomy.ts`) |
| `value_codes` | TEXT[], default `{}` | |
| `feeds_ai` | BOOLEAN, default `true` | user can exclude a reflection from AI coaching context |
| `visibility` | `private` \| `coach` \| `friends`, default `private` | |
| `promoted_memory_id` | UUID, nullable | link if a reflection gets promoted into durable memory |
| `source` | VARCHAR(20), default `'double_tap'` | |

Indexes: `(user_id, target_type, target_id, created_at DESC)`, `(user_id, created_at DESC)`, and a partial index `(user_id, importance DESC) WHERE feeds_ai` — optimized for "surface my most important recent reflections that are allowed to feed the coach."

**Service layer** — `server/src/services/reflection/reflection-details.service.ts` (CRUD + coaching-context queries), `reflection-taxonomy.ts` (motivation/purpose/value code definitions, mirrored client-side in `client/lib/reflection-taxonomy.ts`), `server/src/utils/reflection-intervention.ts` and `reflection-recap.ts` (surfacing logic for proactive nudges and periodic recaps). Client capture entry point: `client/src/shared/services/reflectionCapture.ts`.

**A shipped, real production bug and its fix:** on 2026-07-01, commit `718d83bf fix(server): repair reflection_details FK cascade constraint` found that `CREATE TABLE IF NOT EXISTS reflection_details (... ON DELETE CASCADE)` **silently no-ops on environments where the table already existed pre-cascade** — meaning any environment that had the table created before the cascade clause was added kept a non-cascading foreign key. Deleting a journal entry in that state would leave an orphaned `reflection_details` row instead of cascading. The fix (`server/src/database/migrations/20260701000000_repair-reflection-details-cascade.sql`) is registered in `auto-migrate.ts`, purges pre-existing orphaned rows, and dynamically drops/re-adds the FK with the correct cascade — plus an updated integration-test schema helper so the regression can't silently reappear.

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Capture speed | Double-tap → saved reflection in ≤3 taps for the Light-mode path | UX flow instrumentation |
| Reflection completion rate | ≥50% of double-tap prompts result in a saved reflection (not abandoned) | Prompt-shown vs. prompt-completed ratio |
| Emotion-delta signal quality | ≥60% of reflections capture both `emotion_before` and `emotion_after` | Field completion rate |
| Data integrity | 0 orphaned `reflection_details` rows post-2026-07-01 fix | FK cascade regression test (in the integration suite) |
| Coaching relevance | Reflections with `feeds_ai = true` and `importance ≥ 7` are referenced in coaching responses within 48h | Coaching-context query hit-rate (requires live coaching integration to measure) |

### Acceptance Criteria

- [x] A reflection is a journal entry with an optional 1:1 `reflection_details` row — core journal schema is untouched
- [x] Double-tap capture flow supports importance, emotion before/after (with intensity), and a polymorphic target
- [x] `feeds_ai` toggle lets a user exclude a specific reflection from AI coaching context
- [x] Visibility control (`private`/`coach`/`friends`) per reflection
- [x] FK cascade correctly deletes `reflection_details` when the parent journal entry is deleted (post 2026-07-01 fix, with a regression test)
- [x] Motivation/purpose/value taxonomy codes are shared between client and server (`reflection-taxonomy.ts` mirrored)
- [x] Auto-inserted page mentions (`source = 'page_double_tap'`) link a reflection back to the thing it's about, reusing the F15.4 mention system
- [ ] Dashboard surface for reflection trends/patterns over time — **explicitly called out as remaining work** in the project's delivery tracking, not yet built
- [ ] Cross-session reflection "arcs" (e.g. tracking how emotion-after for the same `target_type` trends over weeks) — designed in the taxonomy but not surfaced in any UI yet

### Error Handling Scenarios

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| **Journal entry deleted with an attached reflection** | `ON DELETE CASCADE` on `reflection_details.journal_entry_id` | Reflection row deleted automatically (post-fix) | Silent — no orphaned data |
| **User sets `importance` out of 1-10 range** | DB `CHECK` constraint | Insert/update rejected at the DB layer | Validation error surfaced by the API before it reaches the DB in normal flow |
| **`target_id` references a deleted entity (e.g. a deleted goal)** | `target_id` has no FK constraint (polymorphic, by design) | Reflection persists with a dangling reference; `target_label` (denormalized at capture time) still renders | Reflection still displays with its captured label even if the underlying entity is gone |
| **Double-tap fires twice rapidly (double-submit)** | No explicit idempotency key on reflection capture | Two `journal_entries` (and two `reflection_details` rows) could be created | **Flagged as a gap** — no evidence of client-side debounce or server-side idempotency guard specific to double-tap capture |

### Double-Tap Capture Flow (High-Level)

```
Double-Tap Reflection Capture:

1. User double-taps a card (workout/meal/goal/etc.) in the app
2. Client (reflectionCapture.ts) opens a lightweight prompt:
     importance (1-10), emotion_before -> emotion_after, optional intensity
3. On submit:
     a. Create journal_entries row (content_json includes an auto-inserted
        mention node targeting the source card, source: 'page_double_tap')
     b. Create reflection_details row:
          journal_entry_id = new entry id
          target_type/target_id/target_label = from the double-tapped card
          importance, emotion_before/after, emotion_intensity_before/after
          source = 'double_tap'
     c. journal_entry_mentions recomputed from content_json (F15.4 mechanism)
4. Reflection appears in: journal timeline, the source card (as a mention chip),
   and — if feeds_ai=true — the coaching context assembler for future turns
```

### Cross-Pillar Connections

**To Document → Wiki + @mention (F15.4):** double-tap capture is a second producer of the same `journal_entry_mentions` mechanism (`source = 'page_double_tap'`), sharing the derived-cache invariant.

**To core journaling:** a reflection is always a real `journal_entries` row — nothing about reflection capture exists outside the journal's normal read/write/search paths.

**To AI Coach context assembly:** `feeds_ai` and `importance` are the intended signals for surfacing reflections into coaching turns (per the coaching-context query index), though live end-to-end wiring into a coaching response is not something this document independently verifies.

### Dependencies
- **Core journaling module** (`journal_entries`) — reflection is a companion, not a replacement
- **F15.4's mention mechanism** — reused for double-tap-originated mentions
- **`reflection-taxonomy.ts`** (client + server mirror) — must stay in sync per project convention

### MVP Status
[X] Shipped — **live, not flag-gated**. FK cascade bug fixed 2026-07-01 (commit `718d83bf`). Dashboard surface and cross-session "arc" views remain unbuilt.

---

## F15.7: VIRTUAL TRY-ON / AI FASHION STUDIO

### Description
A self-contained fashion/style module — its own data model (assets, sessions, preference signals), not a repurposed fitness or nutrition feature. A user uploads a photo of themselves and a photo of a garment; the system generates an AI-composited "wearing it" image. Shipped in two passes: an MVP (upload → generate → save/discard) and a Wave 1+2 redesign adding saved looks, a wardrobe view, an AI Style Coach signal (`getStyleProfile`, built from real aggregated preference data — not a fabricated "style score"), and a before/after comparison that persists the original photo so it survives a page refresh.

### User Story
As a Balencia user exploring the AI Fashion Studio (a style/confidence use case adjacent to, but distinct from, the platform's three core health personas), I want to see how an outfit would actually look on me before buying or wearing it, and have SIA learn my real style preferences over time, so that I can make faster, more confident style decisions.

*(Note: this feature does not map cleanly onto the platform's existing P1/P2/P3 persona set from Epic 01 — it is a distinct fashion/style use case. Flagged here rather than force-fit to an existing persona.)*

### Flexibility Modes

| Mode | Experience |
|------|------------|
| **Light** | Upload person photo + garment photo → generate → save or discard. No wardrobe browsing. |
| **Deep** | Saved looks / wardrobe view, favorite toggle, before/after comparison slider, AI Style Coach insight (top colors/categories, save rate) informing future garment suggestions. |

### Technical Foundation

**Feature flag** — `VIRTUAL_TRYON_ENABLED` (`server/src/config/env.config.ts`), default off; companion env vars `VIRTUAL_TRYON_PROVIDER` (default `gemini`) and `VIRTUAL_TRYON_TIMEOUT_MS` (default 45000ms). Route guard in `server/src/routes/virtual-tryon.routes.ts` mirrors the document-intelligence pattern — a 404 when the flag is off, checked *before* `authenticate`, so the module "doesn't exist" to an unauthenticated prober.

**Routes** (base `/v1/virtual-tryon`):

| Method | Path | Notes |
|---|---|---|
| GET | `/config` | client capability/limits config |
| GET | `/style` | `getStyleProfile()` — the AI Style Coach signal |
| POST | `/upload/person` | person photo upload |
| POST | `/upload/clothing` | garment photo upload |
| POST | `/generate` | **credit-metered**: `requireFeature('ai.tryon.generate')` + `consumeCredits(...)` reserves credits up-front, returns `402 CREDITS_EXHAUSTED` if the wallet is empty, auto-settles on completion of the 202-accepted async job |
| GET | `/sessions` | list (must precede `/sessions/:id` for route-matching correctness) |
| GET | `/sessions/:id` | session detail/status |
| POST | `/sessions/:id/cancel` | |
| POST | `/sessions/:id/save` | promotes a session into "saved looks" |
| POST | `/sessions/:id/favorite` | toggle favorite |
| DELETE | `/sessions/:id` | |

**Data model** — no dedicated "wardrobe" or "saved looks" table; both are views over `virtual_try_on_sessions` filtered by `status = 'SAVED'` / a favorite flag, keeping the schema minimal:

**`virtual_try_on_assets`:** `id, user_id (FK cascade), type (person_photo | clothing_image | generated_result), storage_key, mime_type, width, height, file_size, garment_category, color_tags (JSONB), is_temporary (default true), expires_at, created_at, deleted_at`.

**`virtual_try_on_sessions`:** `id, user_id (FK cascade), status (state machine: CREATED → VALIDATING → PREPROCESSING → GENERATING → POST_PROCESSING → READY → SAVED | FAILED | CANCELLED | EXPIRED), progress_stage, mode, person_asset_id, clothing_asset_id, generated_asset_id (FK → assets), idempotency_key, failure_category, error_message, model_version, prompt_version, pipeline_version, generation_version, retry_count, provider_latency_ms, duration_ms, provider, created_at, updated_at, completed_at, saved_at, expires_at, deleted_at`. A **partial unique index** enforces idempotency only among live sessions: `UNIQUE (user_id, idempotency_key) WHERE deleted_at IS NULL AND status NOT IN ('FAILED','CANCELLED','EXPIRED')` — a failed/cancelled/expired session doesn't block a legitimate retry with the same idempotency key.

**`try_on_consent_logs`:** per-generation consent record (`consent_text`, `consented_at`) — try-on generation requires an explicit, logged consent, similar in spirit to the medical-document consent gate in F15.5.

**`try_on_preference_signals`:** `action (generated | saved | discarded)`, `garment_category`, `color_tags`, `mode`, per session — the raw material for the Style Coach.

**`getStyleProfile()`** (`server/src/services/virtual-tryon/tryon-preference.service.ts`) — this is the concrete evidence that the "AI Style Coach" is **not** a fabricated score. It aggregates the user's last 50 preference signals into real computed values:
```ts
async getStyleProfile(userId: string): Promise<{
  topColors: string[]; topCategories: string[]; saveRate: number | null; sampleSize: number;
}> {
  // topColors/topCategories: frequency-ranked from actual color_tags/garment_category
  // saveRate: saved / (saved + discarded), or null if no decided sessions yet
  // sampleSize: COUNT(DISTINCT session_id) — NOT raw signal rows, because one
  //             try-on emits multiple signals (generated + saved/discarded);
  //             counting rows would inflate the "based on your last N try-ons" claim
}
```
This is consumed by `comprehensive-user-context.service.ts` (the shared coaching-context assembler) when `env.virtualTryOn.enabled` is true.

**Before/after photo persistence** — commit `a57c5b02 feat(virtual-tryon): persist original photo for before/after comparison` (2026-06-24) is an explicit bug fix: the "before" half of a comparison previously relied on the client's local preview blob URL, which does not survive a page refresh. The fix signs and returns `person_storage_key` ("original person-photo storage key") alongside `generated_storage_key` on the saved-look row, so the before/after comparison is durable across sessions, not just the current browser tab.

**Provider** — `server/src/services/virtual-tryon/providers/gemini-tryon.provider.ts`, Gemini-based image generation (provider name is configurable via `VIRTUAL_TRYON_PROVIDER` for future multi-provider support, though only Gemini ships today).

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Generation success rate | ≥90% of `generate` requests reach `READY` without `FAILED` | Session status distribution |
| Generation latency (p95) | Within `VIRTUAL_TRYON_TIMEOUT_MS` (45s default) | `provider_latency_ms` / `duration_ms` on sessions |
| Save rate | Tracked as a genuine style signal, not a vanity metric | `try_on_preference_signals` saved/(saved+discarded) — this *is* the Style Coach input, so it's measured by construction |
| Before/after retention | 100% of saved looks retain a working "before" image after a page refresh | Regression test against the 2026-06-24 fix |
| Idempotent retry safety | 0 duplicate charges for a retried generation with the same idempotency key | Partial unique index integrity + credit-consumption test |

### Acceptance Criteria

- [x] Person and garment photo upload, with generated-result compositing via Gemini
- [x] Full session state machine tracked (`CREATED` → ... → `READY`/`SAVED`/`FAILED`/`CANCELLED`/`EXPIRED`)
- [x] Credit-metered generation with up-front reservation and 402 on insufficient credits
- [x] Idempotency key prevents duplicate generation/charge on retry, scoped to non-terminal sessions only
- [x] Explicit, logged consent required for generation (`try_on_consent_logs`)
- [x] Saved looks and favorites are views over sessions, not a duplicated data model
- [x] `getStyleProfile()` is built from real aggregated preference signals — no fabricated or placeholder scoring
- [x] Original ("before") photo persists durably, independent of client-side blob URLs (2026-06-24 fix)
- [x] Feature-flag 404 guard mirrors the Document Intelligence pattern — consistent platform convention
- [ ] Multi-garment outfit composition (top + bottom + accessory in one generation) — **not built**; current model is single garment per session

### Error Handling Scenarios

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| **Generation exceeds timeout** | `VIRTUAL_TRYON_TIMEOUT_MS` (45s) exceeded | Session → `FAILED`, `failure_category` set, credits refunded (settlement logic ties to session outcome) | "Generation took too long — try again?" |
| **Insufficient credits** | `consumeCredits` middleware pre-check | Request rejected before any generation work starts | `402 CREDITS_EXHAUSTED` |
| **Duplicate generate request (same idempotency key, live session)** | Partial unique index violation | Existing live session returned instead of creating a duplicate | No duplicate charge, no duplicate generation |
| **Retry after a failed/cancelled/expired session with the same key** | Partial index excludes terminal states | New session created cleanly | Retry succeeds as expected |
| **Consent not given before generation** | `try_on_consent_logs` check | Generation blocked | Consent prompt shown before any upload proceeds |
| **Flag off, route probed directly** | `flagGuard` middleware | 404 before `authenticate` even runs | Generic "Not found" — no feature-existence leakage |

### Try-On Generation Flow (High-Level)

```
Virtual Try-On Generation:

1. POST /upload/person, POST /upload/clothing
     -> virtual_try_on_assets rows (type: person_photo / clothing_image)
     -> garment_category, color_tags extracted at validation time

2. POST /generate { personAssetId, clothingAssetId, idempotencyKey }
     - requireFeature('ai.tryon.generate') -- gate check
     - consumeCredits(...) -- reserve credits up-front
     - Check try_on_consent_logs for this user/session
     - INSERT virtual_try_on_sessions (status: CREATED, idempotency_key)
       -- partial unique index prevents duplicate live sessions --
     - Return 202 Accepted; async pipeline drives status forward:
         CREATED -> VALIDATING -> PREPROCESSING -> GENERATING
         -> POST_PROCESSING -> READY  (or FAILED/CANCELLED/EXPIRED)
     - On terminal failure: settle/refund reserved credits

3. POST /sessions/:id/save
     - status -> SAVED, saved_at set
     - Signs person_storage_key (original) + generated_storage_key ("after")
       for a durable before/after comparison
     - INSERT try_on_preference_signals (action: 'saved', garment_category, color_tags)

4. GET /style -> getStyleProfile(userId)
     - Aggregates last 50 try_on_preference_signals
     - Returns { topColors, topCategories, saveRate, sampleSize }
     - Feeds comprehensive-user-context.service.ts for coaching context
```

### Cross-Pillar Connections

**To AI Coach context assembly:** `getStyleProfile()` output is consumed by the shared `comprehensive-user-context.service.ts`, the same context assembler other pillars feed into — style preference becomes a real, if narrow, coaching signal.

**To credit/entitlement system:** `/generate` reuses the platform's existing `requireFeature`/`consumeCredits` middleware pattern — no parallel billing/metering path.

**Distinct from Document Intelligence and Reflection:** unlike F15.1-F15.6, Try-On does not share tables, services, or endpoints with the rest of this epic — it is grouped here by shipping timeframe and flag-gated-OFF posture, not by architecture.

### Dependencies
- **Existing credit/entitlement middleware** (`requireFeature`, `consumeCredits`) — reused
- **`VIRTUAL_TRYON_ENABLED` flag**
- **Gemini image-generation provider** — reused transport, feature-specific provider wrapper

### MVP Status
[X] Shipped — flag-gated OFF (`VIRTUAL_TRYON_ENABLED`). MVP shipped 2026-06-21; Wave 1+2 redesign (saved looks, wardrobe, Style Coach, look-preview sheet) shipped 2026-06-22; before/after photo-persistence fix shipped 2026-06-24.

---

## EPIC SUCCESS CRITERIA

### Launch Readiness (All Features)

- [x] Document upload, ingestion, RAG, wiki-bridge, and reflection capture are all built, merged, and covered by green unit + integration test suites
- [x] Virtual Try-On MVP and Wave 1+2 redesign are built, merged, and covered by tests
- [x] All Document Intelligence and Virtual Try-On surfaces are flag-gated and 404 (not 403) when off, preventing feature-existence leakage
- [x] Reflection's FK cascade data-integrity bug is fixed and regression-tested (2026-07-01)
- [ ] Medical Report Analyzer's safety eval harness (red-flag recall, false-reassurance rate, diagnosis-language-leakage rate) — **not built**; this is the explicit go/no-go gate before `ENABLE_DOC_MEDICAL` can be considered for production
- [ ] Medical severity-tier / red-flag classification system — **not built**
- [ ] Consent UX for document memory / medical analysis has not completed live end-to-end validation
- [ ] Malware/virus scanning on document upload — **not built** (Hardening track, not started)
- [ ] Cross-user isolation test suite for documents — described as an exit criterion in the plan; not independently confirmed complete in this document's research
- [ ] Reflection dashboard surface — explicitly remaining work per project tracking

### Quality Gates (from the original roadmap doc, `docs/2026-06-21-sia-document-intelligence-roadmap.md §12`)

| Gate | Criteria | Status |
|------|----------|--------|
| **G0 — Greenlight Level 1** | Approve scope, flags, Wave 0 start | Passed (implementation shipped) |
| **G1 — Ask-My-Documents GA** | Citation accuracy + isolation tests pass → open RAG to all users | Built, **not yet flag-enabled in production** |
| **G2 — Medical Analyzer GA** | Safety eval thresholds met (red-flag recall, false-reassurance rate) → enable consumer medical mode | **Not met — eval harness doesn't exist yet** |
| **G3 — Level 2 greenlight** | Legal + medical + regulatory sign-off before any Wave 6-7 engineering | Not started; hard gate, not a checkpoint |

### User Experience Validation

| Persona | Key Experience | Success Indicator |
|---------|---------------|-------------------|
| **P1: Holistic Health Seeker** | Uploads a lab report, asks a grounded question, gets a cited answer with a non-diagnostic disclaimer | Trusts the answer enough to bring it up with their doctor, not to self-diagnose |
| **P2: Busy Professional** | Asks "what did my finance PDF say about fees" and gets a fast, sourced answer instead of re-reading the file | Time-to-answer under 5s, citation visible |
| **P3: Optimization Enthusiast** | Converts documents into a personal wiki, cross-references via `@mention`, tracks lab metric trends over time | Uses the wiki `DocumentTrendsPanel` repeatedly across multiple reports |
| **Style/Confidence (Try-On, not an existing P-persona)** | Previews an outfit before wearing/buying it; SIA's style suggestions improve as `getStyleProfile()` accumulates real signal | Save rate trends upward over repeated sessions |

---

## CROSS-EPIC DEPENDENCIES

### Epic 08 (Cross-Domain Intelligence)
- Document-derived facts (once Wave 4 Life Memory Extraction is built) would become inputs to Epic 08's correlation and personalization engines
- Reflection's `emotion_before`/`emotion_after` deltas are a natural, currently-unexploited input to Epic 08's mood/wellbeing correlation analysis — not yet wired into F8.1's correlation pipeline
- Try-On's `getStyleProfile()` is a narrow, working example of the "real computed signal, not a fabricated score" principle Epic 08 requires platform-wide

### Epic 11 (SIA Cognitive OS)
- Shares crisis/safety escalation infrastructure — reused today by other coaching surfaces, and the *intended* (not yet wired) destination for F15.5's red-flag findings once the severity classifier is built
- Document Intelligence's consent-record pattern (`document-consent.service.ts`) follows the same consent-gating convention Epic 11 uses elsewhere in the coach

### Personal Wiki module (pre-existing, not a numbered epic in this document set)
- F15.4 is entirely a bridge into this existing system — `wikiService.createPage()`, `wiki_pages` table, `DocumentsPanel`/`DocumentViewerModal`/`DocumentTrendsPanel` UI are all extended, not duplicated
- The general `@mention` page system predates and outlives Document Intelligence specifically — it's the platform's page-reference mechanism, of which document-derived wiki pages are one participant

### Core journaling module
- F15.6 (Reflection) is structurally a companion to `journal_entries`, not a parallel system — every reflection is a real journal entry

### Credit/entitlement system
- F15.7 (Try-On) reuses `requireFeature`/`consumeCredits` middleware — no parallel billing path

---

## TECHNICAL CONSIDERATIONS

### Feature Flags (authoritative — all default OFF)

| Flag | Env var | Gates |
|---|---|---|
| Document Intelligence master | `ENABLE_DOC_INTELLIGENCE` | All `/v1/documents` routes (404 when off) |
| Ask My Documents RAG | `ENABLE_DOC_RAG` | `/ask` endpoint specifically (independent of the master flag) |
| Medical analysis | `ENABLE_DOC_MEDICAL` | Medical `/analytics` + medical-mode `/ask`, additionally gated by per-user consent |
| Virtual Try-On | `VIRTUAL_TRYON_ENABLED` | All `/v1/virtual-tryon` routes (404 when off) |
| Reflection System | *(none)* | Live, unconditional — ships as part of core journaling |

Note on naming: the original planning doc proposed a broader flag set (`ENABLE_DOC_MEMORY`, `ENABLE_MEDICAL_ANALYZER`, `ENABLE_IMAGING`, `ENABLE_CLINICIAN_MODE`) for the full Wave 0-7 scope. Only three flags actually shipped (`ENABLE_DOC_INTELLIGENCE`, `ENABLE_DOC_RAG`, `ENABLE_DOC_MEDICAL`) because only Waves 0-3 and a partial Wave 5 shipped — the memory/imaging/clinician flags were never implemented because those waves were never built (see "Roadmap — Deferred Waves" below).

### Data Model Summary (real schemas — not illustrative JSON)

**`documents`** → **`document_chunks`** (1:many, page-anchored) → **`document_analytics`** (1:many, extracted metrics). `documents.wiki_page_id` → **`wiki_pages`** (1:1, nullable until synced).

**`reflection_details`** (1:1 with **`journal_entries`**, PK = `journal_entry_id`) — separate table by design, not columns on the journal.

**`journal_entry_mentions`** — derived cache, many:1 to `journal_entries`, recomputed from `content_json` on every write. Shared between manual `@mention` and double-tap auto-insert (`source` column distinguishes origin).

**`virtual_try_on_assets`** → **`virtual_try_on_sessions`** (references up to 3 assets: person/clothing/generated) → **`try_on_preference_signals`** / **`try_on_consent_logs`** (both 1:many from sessions/users).

### API Endpoints (Real, Shipped)

```
# Document Intelligence — base /api/v1/documents (ENABLE_DOC_INTELLIGENCE gated)
POST   /                              - Upload document (multipart, <=5MB)
GET    /                              - List documents (filterable)
GET    /:id                           - Document metadata
GET    /:id/file                      - Signed file download
GET    /:id/raw                       - Inline stream (short-lived token, no auth header needed)
POST   /:id/retry                     - Manual re-ingest
GET    /:id/chunks                    - Paginated chunk view
GET    /:id/analytics                 - Extracted metrics (medical consent-gated if applicable)
POST   /:id/ask                       - Cited RAG question (ENABLE_DOC_RAG additionally gated)
DELETE /:id                           - Soft delete
GET    /consent                       - Medical consent status
POST   /consent                       - Grant medical consent
GET    /intelligence/metrics          - Cross-document metric trends (paginated)
GET    /intelligence/metrics/:label   - Single-metric timeline
GET    /intelligence/mentions         - Keyword search across document content

# Virtual Try-On — base /v1/virtual-tryon (VIRTUAL_TRYON_ENABLED gated)
GET    /config                        - Client config/limits
GET    /style                         - getStyleProfile() — AI Style Coach signal
POST   /upload/person                 - Person photo upload
POST   /upload/clothing               - Garment photo upload
POST   /generate                      - Credit-metered generation (202 async)
GET    /sessions                      - List sessions
GET    /sessions/:id                  - Session detail/status
POST   /sessions/:id/cancel           - Cancel
POST   /sessions/:id/save             - Save as a "look"
POST   /sessions/:id/favorite         - Toggle favorite
DELETE /sessions/:id                  - Delete

# Reflection — no dedicated route file; surfaces through journal endpoints
# (journal create/update carries reflection_details payload; no flag gate)
```

### Performance Requirements (Real, Enforced)

| Operation | Target / Enforced Limit | Rationale |
|-----------|---------------|-----------|
| Document ingestion (parse→OCR→chunk→embed) | Hard 120s timeout (`INGEST_TIMEOUT_MS`) | Prevents indefinite `parsing` state; a real fixed bug class |
| Stuck-document recovery sweep | Bounded to 25 documents per boot cycle | Prevents a boot-time thundering-herd re-ingest |
| Ask My Documents answer | Target <5s (retrieval + 1 LLM call) | Chat-turn responsiveness |
| Document upload size | Hard 5MB cap, enforced at edge AND DB `CHECK` | Defense in depth, not just app-layer validation |
| Virtual Try-On generation | `VIRTUAL_TRYON_TIMEOUT_MS`, default 45000ms | Async job bound; session marked `FAILED` and credits settled on breach |

### Security & Privacy

- **Per-user scoping on every query** — `document_chunks`, `document_analytics`, `virtual_try_on_*` tables all carry `user_id`, denormalized where needed to avoid a join-based isolation gap
- **Cascade deletion is a DB guarantee, not an app-layer filter** — `document_chunks ON DELETE CASCADE documents`, `reflection_details ON DELETE CASCADE journal_entries` (post 2026-07-01 fix), `try_on_preference_signals ON DELETE CASCADE virtual_try_on_sessions`
- **Two-layer medical gate** — flag AND explicit per-user consent, neither sufficient alone
- **Feature-existence non-leakage** — both Document Intelligence and Virtual Try-On return `404`, not `403`, when their flag is off, and the check runs before authentication where the route pattern allows it
- **Fixed, non-model-generated disclaimer copy** for all medical outputs — cannot drift or be reasoned around by the LLM, because it is appended by application code, not generated by the model
- **Not yet built (flagged gaps):** malware/virus scanning on upload, an automated medical-safety eval harness, OCR confidence scoring, double-tap capture idempotency guard against rapid double-submit

---

## ROADMAP — DEFERRED WAVES

The original planning documents (`docs/2026-06-21-sia-document-intelligence-plan.md` and its companion `docs/2026-06-21-sia-document-intelligence-roadmap.md`) were both dated **"Proposal — awaiting approval. No implementation started."** as of 2026-06-21. Real implementation shipped starting **2026-06-29** (`feat(documents): SIA Document Intelligence`) and continued through **2026-07-06/2026-07-07** (ingestion/wiki reliability fixes, then markdown source-kind + preview URLs + trends pagination) — actual scope moved past the original planning document, which remains useful as the "design ceiling" to track against, not as a description of current state.

| Wave | Name | Planned Scope | Status |
|---|---|---|---|
| **Wave 0** | Foundations & flags | Data model, flags, storage conventions | **Shipped** |
| **Wave 1** | Upload & Vault | F15.1 | **Shipped** |
| **Wave 2** | Ingestion pipeline | F15.2 | **Shipped**, plus reliability hardening beyond original scope |
| **Wave 3** | Ask My Documents | F15.3 | **Shipped** |
| **Wave 4** | Life Memory Extraction | Consent-gated fact extraction into coaching — "nothing persists without approval; facts reused later; deletable" | **Not built.** No document-linked memory-extraction service, no `document_memory`/medical-memory consent type exists in the codebase. |
| **Wave 5** | Medical Report Analyzer | Explain reports, flag abnormalities, escalate red flags — non-diagnostic | **Partially shipped** — see F15.5. Consent gate and out-of-range flagging shipped; severity-tier classifier and red-flag escalation not built. |
| **Wave 6** | Imaging + DICOM (Level 2, regulated) | Radiology-report explanation, then a DICOM viewer (`dcmjs` metadata parse, OHIF/Cornerstone viewer evaluation) | **Not built.** No `imaging_studies` table, no `dcmjs`/Cornerstone dependency anywhere in the codebase. |
| **Wave 7** | Regulated / clinician mode | Validated diagnostic support under clinical oversight; requires clinical validation, QMS, regulatory strategy, post-market monitoring | **Not built — and explicitly out of near-term engineering scope.** Per the roadmap doc, Level 2 (Waves 6-7) requires a hard legal/medical/regulatory sign-off gate (**G3**) before any engineering starts. This is a deliberate, documented decision, not an oversight. |
| **Hardening** (parallel track) | Malware scan, Privacy Center, encryption, eval harness, isolation tests | Runs alongside Waves 1-5, gates Level-1 GA | **Partially shipped** — cascade-delete integrity and timeout/recovery hardening shipped; malware scanning, a Privacy Center UI, and the safety eval harness have not. |

**What shipped beyond the original plan's explicit scope:** doc→wiki conversion and `@mention` integration (F15.4) are not mentioned in the Wave 0-3 plan text at all — they were added during actual implementation as a bridge into the pre-existing Personal Wiki module, beyond what the planning docs described. Markdown as a `source_kind`, signed preview URLs, and paginated cross-document trends were added 2026-07-07, after the original planning window.

**Reflection System and Virtual Try-On were not part of the Document Intelligence plan at all** — they are grouped into this epic by shipping timeframe (the same 2026-06-21 → 2026-07-07 window) and by their shared "flag-gated-OFF, integration-first" delivery posture, documented together in the project's own delivery record (`balencia_doc/milestones/M-020-document-intelligence-reflection-tryon.md`), not because they share Document Intelligence's architecture.

---

## RISKS & MITIGATIONS

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| **`ENABLE_DOC_MEDICAL` turned on before the safety eval harness exists** | Critical | Medium (flags are easy to flip) | This document explicitly states the harness is a hard prerequisite (G2 gate); no severity/red-flag classifier exists, so any out-of-range finding — however extreme — currently gets identical, non-escalated treatment |
| **Hallucinated document answers** | High | Low (mitigated) | Citation validator + `HONEST_NULL` fallback is a real, tested mechanism, not aspirational |
| **Cross-user document/chunk leakage** | Critical | Low (mitigated by design) | `user_id` denormalized on every relevant table; cascade deletes are DB-level, not app-level |
| **Reflection FK cascade regression reintroduced** | Medium | Low (regression-tested) | Integration test schema helper updated alongside the 2026-07-01 fix specifically to catch this class of bug again |
| **Document upload used as a malware vector** | High | Medium (no scanning yet) | Explicitly unmitigated today — malware scanning is listed in the plan's Hardening track and has not shipped |
| **Try-On generation cost/abuse (unbounded free generation)** | Medium | Low (mitigated) | Credit-metered via existing entitlement middleware, with up-front reservation and idempotency-key duplicate protection |
| **Medical detection heuristic misses a real medical document** | Medium | Medium (keyword-based, not ML) | Document proceeds through the standard non-medical path with no disclaimer — flagged as a gap in F15.5, not a false sense of coverage |
| **Regulatory exposure from Level 2 (imaging/clinician mode)** | Critical | Low (explicitly deferred) | Hard-gated behind G3 (legal/medical/regulatory sign-off) before any Wave 6-7 engineering starts — a deliberate scope boundary, not a missed requirement |

---

## TESTING STRATEGY

### Unit Testing
- Citation validator grounding/rejection logic (`citation-validator.ts`)
- `rankChunks()` keyword-overlap scoring and zero-candidate short-circuit
- `extractMetrics()` regex extraction, dedup, noise-line rejection (dates, bare "label + number" prose)
- `getStyleProfile()` aggregation (top colors/categories, save-rate math, distinct-session sample sizing)
- `reflection-taxonomy.ts` code validation
- `reflection-intervention.ts` / `reflection-recap.ts` surfacing logic

### Integration Testing
- Document upload → ingest → embed → ask, full round-trip against a real/transactional Postgres
- Reflection FK cascade (`reflection.integration.test.ts` — updated alongside the 2026-07-01 fix specifically to assert cascade behavior)
- Document deletion → chunk unreachability (cascade integrity, not app-level filtering)
- Try-On session state-machine transitions and idempotency-key duplicate-prevention
- Medical consent two-gate enforcement (flag off / flag on + no consent / flag on + consent)

### What's Explicitly NOT Covered Yet
- No automated medical-safety eval harness (red-flag recall, false-reassurance rate, diagnosis-language-leakage rate) — this is the stated blocker for `ENABLE_DOC_MEDICAL` going to production, not a testing nice-to-have
- No load/scale testing referenced for ingestion pipeline throughput at production volume
- No confirmed live end-to-end validation of the consent UX flow (flagged as open in the project's delivery record)

---

## DOCUMENT GOVERNANCE

**Review Schedule:** Before any of the OFF flags (`ENABLE_DOC_INTELLIGENCE`, `ENABLE_DOC_RAG`, `ENABLE_DOC_MEDICAL`, `VIRTUAL_TRYON_ENABLED`) are turned on in production, and specifically before `ENABLE_DOC_MEDICAL` pending the safety eval harness (G2 gate).
**Update Triggers:** Any flag flip to ON, the medical severity/red-flag classifier landing, Wave 4 (Life Memory Extraction) starting, or the consent UX completing live validation.
**Version Control:** All feature-status changes in this document require a version increment with rationale — this document is a record of real shipped state, not a static plan.
**Ownership:** Engineering (Document Intelligence, Reflection, Virtual Try-On) + Safety/Medical review (F15.5, blocking) + Product (flag go-live decisions).

---

*Balencia Platform - E15: Document Intelligence, Reflection System & Virtual Try-On PRD v1.0*
*Documents real, merged, flag-gated-OFF functionality as of 2026-07-08 — not a proposal*
*Sources: `docs/2026-06-21-sia-document-intelligence-plan.md`, `docs/2026-06-21-sia-document-intelligence-roadmap.md`, `balencia_doc/AUDIT-FINDINGS-AND-GAPS.md §8`, `balencia_doc/milestones/M-020-document-intelligence-reflection-tryon.md`, direct codebase inspection*

---

*Document Classification: INTERNAL USE - Product Foundation*
*Created: 2026-07-08 | Epic Specification — Post-Implementation Documentation*
*Total Features: 7 | 6 Fully Shipped (flag-gated) | 1 Partially Shipped (F15.5) | 3 Waves Explicitly Deferred*
