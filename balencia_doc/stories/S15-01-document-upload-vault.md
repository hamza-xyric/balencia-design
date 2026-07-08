---
type: story
id: S15.1.1
title: Document Upload & Vault
epic: E15
epic_name: Document Intelligence, Reflection System & Virtual Try-On
feature: F15.1
feature_name: Document Upload & Vault
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S15.1.1: Document Upload & Vault

## User Story

**As a** Holistic Health Seeker (P1),
**I want to** upload my lab reports, prescriptions, and personal documents into a secure vault,
**So that** SIA can read them later and I don't have to re-type or re-explain what's already written down.

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

**User Experience:**
- User uploads a file (multipart form) and it appears in the vault immediately with status `uploaded`
- Status badge tracks pipeline progress in real time: `uploaded → parsing → parsed → embedded` (or `failed`)
- A deleted document is soft-deleted (`deleted_at`) and never retrievable again, including its chunks (F15.2/F15.3 cascade)

**Flexibility Modes:**

| Mode | Experience |
|------|------------|
| Light | Upload → flat, reverse-chronological list with a status badge. No filtering, no chunk-level detail. |
| Deep | Full vault view: filter by `source_kind` and status, per-document page count and chunk count, retry a failed ingest, view raw extracted text, jump into "Ask this document" or "Convert to wiki page." |

**Technical Foundation:**

- **Routes** — `server/src/routes/document.routes.ts`, base `/api/v1/documents`. The entire router returns `404 Not Found` (never `403`) when `ENABLE_DOC_INTELLIGENCE` is off, checked before `authenticate`, so the module "doesn't exist" to an unauthenticated prober.
- `POST /` — `createDocument` (multipart upload)
- `GET /` — `listDocuments` (validated query: status/source_kind filters)
- `GET /:id`, `GET /:id/file`, `GET /:id/raw` — metadata, signed file download, and a self-authenticating inline stream (`?t=` short-lived token so `<iframe>`/`<img>` works without an `Authorization` header)
- `POST /:id/retry` — manual re-ingest
- `DELETE /:id` — soft delete (`deleted_at`)
- **Upload service** — `server/src/services/documents/document-upload.service.ts`: validates size (≤5MB) and MIME/extension, uploads to R2 via the *existing* storage service (`server/src/services/r2.service.ts`, `r2Service.upload(..., { fileType: 'document' })` — no new storage integration), inserts the `documents` row, then kicks off ingestion fire-and-forget (`void ingestDocument(...).catch(...)`).

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
| `is_medical` | BOOLEAN | set by keyword-hint detection (F15.5) |
| `wiki_page_id` | UUID FK → wiki_pages, `ON DELETE SET NULL` | set after doc→wiki sync (F15.4) |
| `report_date` | DATE | parsed when confidently extractable; trends fall back to `created_at` |
| `deleted_at`, `created_at`, `updated_at` | | |

`UNIQUE (user_id, storage_key)`; index `idx_documents_user_status (user_id, status, created_at DESC)`.

---

## Acceptance Criteria

```gherkin
Scenario: Successful upload
  Given a user on the vault screen
  When they upload a PDF, DOCX, TXT, CSV, image, XLSX, PPTX, audio, video, or markdown file <= 5MB
  Then a `documents` row is created with status "uploaded" and the row appears in the vault within 1s

Scenario: File exceeds 5MB
  Given a user selects a file larger than 5MB
  When they attempt to upload it
  Then the upload is rejected before it starts with "This file is larger than 5MB. Please upload a smaller version."

Scenario: Unsupported file type
  Given a user selects a file type outside the whitelist
  When they attempt to upload it
  Then the upload is rejected at the edge with "This file type isn't supported yet."

Scenario: Duplicate upload
  Given a user uploads the exact same file content twice
  When the second upload is submitted
  Then the existing document is returned silently (UNIQUE (user_id, storage_key)) with no duplicate storage or row

Scenario: Ingestion fails after upload succeeds
  Given a document has been uploaded successfully
  When ingestDocument() throws during the fire-and-forget pipeline run
  Then the document row persists with status "failed" and parse_error populated, visible with a retry action, and the HTTP upload response is never affected

Scenario: Soft delete
  Given a user deletes a document from the vault
  When the delete completes
  Then deleted_at is set and the document and its chunks are never retrievable again (see S15.3.1 cascade guarantee)

Scenario: Raw inline view without auth header
  Given a document is embedded
  When the client requests GET /:id/raw?t=<short-lived-token> without an Authorization header
  Then the raw content streams successfully via the short-lived signed token
```

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Upload success rate | ≥99% of valid files (≤5MB, supported type) | Upload endpoint success/failure ratio |
| Per-user isolation | 0 cross-user document reads in isolation test suite | Automated isolation tests |
| Time-to-list | Document appears in list within 1s of upload response | Upload → list round-trip timing |
| Vault return rate | ≥30% of uploaders return to the vault within 7 days | Product analytics (post flag-on) |

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Document appears in list <1s post-upload | 5MB cap enforced at edge (multipart middleware) AND DB `CHECK` (defense in depth) | Feature returns 404 (not 403) when flag off — no feature-existence leakage | Status badges have text + icon, not color-only | iOS/Android app + web |
| Upload/DB insert sequenced, not parallel — no orphaned R2 objects on DB failure | `user_id` scoping on every list/get/delete query | Raw inline stream uses a short-lived signed token, not a long-lived credential | Retry action is keyboard/screen-reader reachable | |

---

## Dependencies

- **Prerequisite Stories:** None (entry point for Track A)
- **Related Stories:** S15.2.1 (Ingestion Pipeline — triggered on every upload), S15.4.1 (Document → Wiki, downstream consumer)
- **External Dependencies:** R2 object storage service (`server/src/services/r2.service.ts`, reused not extended), `ENABLE_DOC_INTELLIGENCE` flag

---

## Edge Cases & Errors

| Scenario | Expected Behavior |
|----------|-------------------|
| File exceeds 5MB | Reject before upload starts: "This file is larger than 5MB. Please upload a smaller version." |
| Unsupported file type | Reject at edge: "This file type isn't supported yet." |
| R2 upload fails mid-request | Return 5xx; no `documents` row created (upload and DB insert are sequenced, not parallel); "Upload failed. Please try again." |
| Ingestion fails after upload succeeds | Document row persists with `status = 'failed'` and `parse_error` populated; retry action visible; "We couldn't process this document. Tap to retry." |
| User uploads the same file twice | `UNIQUE (user_id, storage_key)` conflicts cleanly; existing document returned, handled silently |
| Flag off, route probed directly | `404 Not Found` before `authenticate` runs — no feature-existence leakage |

---

## Open Questions

- Malware/virus scanning on upload is listed under the plan's Hardening track but **not implemented** — confirm whether this is a hard blocker for `ENABLE_DOC_INTELLIGENCE` go-live or a fast-follow.
- Document versioning (re-upload a newer version, diff against prior) is **not built** — confirm whether this is in scope for a future wave.

---

## Definition of Done

- [x] Upload accepts PDF/DOCX/TXT/CSV/image/XLSX/PPTX/audio/video/markdown, rejects other types and anything >5MB (edge + DB-level enforcement)
- [x] Upload reuses the existing R2 object storage service — no new storage integration
- [x] Per-user document isolation: `user_id` scoping on every list/get/delete query
- [x] Soft delete (`deleted_at`) — a deleted document's chunks and file are never retrievable afterward
- [x] Upload failures never crash the request path (ingestion is fire-and-forget with caught/logged errors)
- [x] Raw inline file view works without an `Authorization` header via short-lived signed token
- [x] Router-level 404 (not 403) when `ENABLE_DOC_INTELLIGENCE` is off, checked before `authenticate`
- [ ] Document versioning (re-upload a newer version, diff against prior) — not built
- [ ] Malware/virus scanning on upload — not built

---

*Story S15.1.1 | Epic E15 | Product: Balencia Platform*
