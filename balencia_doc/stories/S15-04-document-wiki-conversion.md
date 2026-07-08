---
type: story
id: S15.4.1
title: Document → Wiki Conversion
epic: E15
epic_name: Document Intelligence, Reflection System & Virtual Try-On
feature: F15.4
feature_name: Document → Wiki Conversion + @mention
product: yhealth-platform
priority: P1
status: Done
created: 2026-07-08
---

# S15.4.1: Document → Wiki Conversion

## User Story

**As an** Optimization Enthusiast (P3),
**I want** an uploaded document to become a linkable page in my personal wiki,
**So that** I can reference it inline while journaling or chatting with SIA — the same way I already reference workouts or meals — without re-uploading or re-explaining it.

---

## Story Type

- [x] Feature
- [ ] Enhancement
- [ ] Technical
- [x] Integration

## Priority

- [ ] Must Have (P0)
- [x] Should Have (P1)
- [ ] Could Have (P2)
- [ ] Won't Have (P3)

---

## Scope Description

**Flexibility Modes:**

| Mode | Experience |
|------|------------|
| Light | Document → wiki conversion happens automatically as the last ingest step; the user simply finds the document listed alongside other wiki pages. |
| Deep | View the generated wiki page's extracted-values table, browse the wiki's `DocumentsPanel` for converted documents. |

**Technical Foundation:**

- **Doc → wiki sync** — `server/src/services/documents/document-wiki.service.ts`, `syncDocumentToWiki()`: builds a Markdown wiki page (`pageType: 'synthesis'`) via the platform's existing `wikiService.createPage()` — no parallel wiki-writing path — including an extracted-values table (from `document_analytics`, F15.5) and, for medical documents, a fixed non-diagnostic note:
```
> These values are transcribed from your document for reference only. They are
> **not** a diagnosis — discuss anything concerning with your doctor.
```
- The resulting page id is written back to `documents.wiki_page_id`.
- This step is **best-effort and non-fatal** — a wiki-sync failure never fails the overall ingest pipeline (S15.2.1).
- `documents.wiki_page_id` is nullable until synced: `documents` → `wiki_pages` is 1:1.

**Sync flow (final ingest step, best-effort):**
```
1. syncDocumentToWiki(documentId):
     a. Build Markdown body: summary + extracted-values table (document_analytics)
     b. If is_medical: append fixed NON_DIAGNOSTIC_NOTE
     c. wikiService.createPage({ pageType: 'synthesis', ... })
     d. documents.wiki_page_id = new page id
   -- any failure here is caught and logged; ingest pipeline still completes --
```

---

## Acceptance Criteria

```gherkin
Scenario: Successful wiki sync
  Given a document reaches status "embedded"
  When syncDocumentToWiki() runs as the final ingest step
  Then a wiki page of pageType "synthesis" is created via wikiService.createPage() and documents.wiki_page_id is set

Scenario: Medical document wiki note
  Given an embedded document has is_medical = true
  When its wiki page is generated
  Then the page body includes the fixed NON_DIAGNOSTIC_NOTE verbatim

Scenario: Wiki sync failure is non-fatal
  Given wikiService.createPage() throws during sync
  When the error is caught inside syncDocumentToWiki()
  Then it is logged, the ingest pipeline still completes, and the document lands "embedded" with wiki_page_id left null

Scenario: Extracted-values table included
  Given a document has document_analytics rows (extracted metrics)
  When its wiki page is generated
  Then the page body includes a table of those extracted values
```

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Wiki sync success rate | ≥98% of `embedded` documents produce a wiki page | `wiki_page_id` non-null rate on embedded documents |
| Sync non-fatality | 0 ingest pipeline failures caused by a wiki-sync error | Ingest completion rate unaffected by sync failures |
| Cross-reference discoverability | Users who convert ≥1 document to wiki reference it via `@mention` within 7 days at ≥25% rate | Product analytics (post flag-on) |

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Sync runs as the final, non-blocking ingest step — no added latency to the user-facing upload response | Reuses existing `wikiService.createPage()` — no parallel wiki-writing path | Medical wiki pages always carry the fixed non-diagnostic note, never model-generated | Wiki page renders through the existing, already-accessible Personal Wiki UI | Extends the pre-existing Personal Wiki module — no new rendering surface |

---

## Dependencies

- **Prerequisite Stories:** S15.2.1 (Ingestion Pipeline — triggers the sync), S15.5.1 (supplies `document_analytics` for the table and the non-diagnostic note trigger)
- **Related Stories:** S15.4.2 (@mention — depends on the wiki page existing)
- **External Dependencies:** Personal Wiki module (`wikiService`, `wiki_pages` table) — pre-existing, reused

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| Wiki sync fails | `wikiService.createPage()` throws | Caught inside `syncDocumentToWiki()`, logged, ingest pipeline continues to completion | Document still lands `embedded`; simply has no `wiki_page_id` (silently absent from wiki views) |
| Document has no extracted metrics | `document_analytics` empty | Wiki page generated without a values table | Page still created with summary content only |

---

## Open Questions

- Bi-directional sync (editing the generated wiki page updates the source document) is **not built** — sync is one-directional, document → wiki, at ingest time only. Confirm whether this is a permanent design decision.

---

## Definition of Done

- [x] Every `embedded` document attempts a best-effort wiki sync as the final, non-fatal ingest step
- [x] Medical documents' wiki pages carry the fixed non-diagnostic note
- [x] Wiki `DocumentsPanel` and `DocumentViewerModal` render converted documents inline in the existing Personal Wiki UI
- [x] Wiki sync failure never fails the overall ingest pipeline
- [ ] Bi-directional sync (wiki edits flow back to the source document) — not built, one-directional by design

---

*Story S15.4.1 | Epic E15 | Product: Balencia Platform*
