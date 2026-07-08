---
type: story
id: S15.4.2
title: "@Mention System & Cross-Document Trends"
epic: E15
epic_name: Document Intelligence, Reflection System & Virtual Try-On
feature: F15.4
feature_name: Document → Wiki Conversion + @mention
product: yhealth-platform
priority: P1
status: Done
created: 2026-07-08
---

# S15.4.2: @Mention System & Cross-Document Trends

## User Story

**As an** Optimization Enthusiast (P3),
**I want to** `@mention` a document-derived wiki page inline while journaling or chatting, and track how a lab metric trends across multiple reports,
**So that** I can cross-reference my documents naturally and see change over time without opening each report individually.

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
| Light | Type "@" in the composer, pick a page, done — the chip renders inline. |
| Deep | Manually trigger `@mention` from journal/chat composer, browse the wiki's `DocumentsPanel` and `DocumentTrendsPanel` for cross-document metric trends, use keyword search across document content independently of RAG. |

**Technical Foundation:**

- **@mention system** — `server/src/services/wellbeing/mention.service.ts`: walks a journal entry's TipTap `content_json` document tree for `type === 'mention'` nodes and persists them to `journal_entry_mentions`. This is a **derived cache**, recomputed from `content_json` on every journal create/update — the TipTap document is the single source of truth, so the mentions table can never drift from what the user actually wrote. This mechanism is the platform's general page-mention system (`@workout`, `@nutrition`, `@a-lab-report`); a document only becomes mentionable once it has a wiki page (S15.4.1).

**Table: `journal_entry_mentions`** (`server/src/database/tables/138-journal-entry-mentions.sql`):

| Column | Type | Notes |
|---|---|---|
| `journal_entry_id` | UUID FK → journal_entries, `ON DELETE CASCADE` | |
| `user_id` | UUID FK → users, `ON DELETE CASCADE` | |
| `mention_slug` | TEXT, `CHECK (~ '^[a-z0-9]+(-[a-z0-9]+)*$')` | kebab-case @-id, e.g. `workout`, `a-lab-report` |
| `mention_label` | TEXT, 1-60 chars | |
| `mention_type` | `page` \| `sub_page` | |
| `target_href` | TEXT | route the chip links to |
| `source` | `inline` \| `page_double_tap` | how the mention entered the document — `page_double_tap` is the same source value used by the Double-Tap Reflection System (S15.6.1) when it auto-inserts a mention chip |

`UNIQUE (journal_entry_id, mention_slug)`.

**Document keyword search (separate, related capability):** `GET /v1/documents/intelligence/mentions?term=` (`getDocumentMentionsHandler`, backed by `findDocumentsMentioning()`) is a plain text search across document content for a keyword — **not** the same system as the TipTap `@mention` node mechanism above, despite the similar name. Works independently of RAG (functions even with `ENABLE_DOC_RAG` off, as long as `ENABLE_DOC_INTELLIGENCE` is on).

**Cross-document trends** — `document-analytics.service.ts` powers `GET /intelligence/metrics` (`getMetricTrendsHandler`) and `GET /intelligence/metrics/:label` (`getMetricTimelineHandler`), returning `{ trends, total, hasMore }` — paginated as of the 2026-07-07 commit (`markdown source-kind, preview URLs, trends pagination`), rendered by the wiki's `DocumentTrendsPanel.tsx`.

---

## Acceptance Criteria

```gherkin
Scenario: Mention recompute on save
  Given a user types "@a-lab-report" in a journal composer and saves the entry
  When the save completes
  Then journal_entry_mentions is recomputed from content_json: existing rows for this entry are deleted and the current mention set is inserted

Scenario: Mention removed on edit
  Given a journal entry has a saved mention
  When the user edits the entry and removes the mention node from content_json
  Then the corresponding journal_entry_mentions row is deleted on the next save

Scenario: Document keyword search independent of RAG
  Given ENABLE_DOC_INTELLIGENCE is on and ENABLE_DOC_RAG is off
  When a user searches GET /intelligence/mentions?term=cholesterol
  Then matching documents are returned without invoking any RAG/LLM call

Scenario: Paginated cross-document trends
  Given a user has multiple documents with the same extracted metric_label
  When they request GET /intelligence/metrics
  Then the response returns { trends, total, hasMore } and, if hasMore is true, a subsequent page is requested via cursor rather than a full re-fetch

Scenario: Single-metric timeline
  Given a user has multiple reports containing "LDL Cholesterol"
  When they request GET /intelligence/metrics/LDL%20Cholesterol
  Then the timeline of that metric's values across reports is returned, source_page cited per value
```

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Mention accuracy | 100% of TipTap mention nodes present in `content_json` are reflected in `journal_entry_mentions` | Derived-cache consistency check (recompute-on-write invariant) |
| Trends load time | <1s for a paginated metric-trend page | `getMetricTrendsHandler` response timing |
| Cross-reference discoverability | Users who convert ≥1 document to wiki reference it via `@mention` within 7 days at ≥25% rate | Product analytics (post flag-on) |

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Trends endpoint is paginated, never an unbounded fetch (fixed 2026-07-07) | `journal_entry_mentions` scoped by `user_id` | Mentions only ever resolve to the user's own wiki pages | Mention chips are keyboard-navigable, not hover-only | Reuses the platform's existing general `@mention` page system — not document-specific |
| Recompute-on-write is O(mentions in this entry), not O(all entries) | | | Chip shows a muted/disabled visual state when its target no longer resolves | |

---

## Dependencies

- **Prerequisite Stories:** S15.4.1 (Document → Wiki Conversion — a document must have a wiki page to be mentionable)
- **Related Stories:** S15.3.1 (`documentIds` scoping via `@mention`), S15.6.1 (shares `source = 'page_double_tap'`)
- **External Dependencies:** Personal Wiki module, core journaling module (TipTap `content_json`)

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| Mention references a page that no longer exists | `target_href` route 404s | Chip renders but is inert on click | Chip shown with a muted/disabled visual state (frontend responsibility) |
| User edits journal content, removes a mention | Recompute-on-write diff | Row deleted from `journal_entry_mentions` on next save | Silent — cache follows the document |
| Metric trends query returns >1 page | `hasMore: true` in response | Client requests next page via cursor, not a full re-fetch | "Load more" affordance in `DocumentTrendsPanel` |

---

## Open Questions

- None outstanding for the shipped scope; the derived-cache design is intentionally rigid (delete-and-reinsert on every write) rather than an incremental patch, and this is documented as deliberate, not a gap.

---

## Definition of Done

- [x] `@mention` nodes in journal `content_json` are the single source of truth; `journal_entry_mentions` is a pure derived cache, recomputed on every write
- [x] Document keyword search (`/intelligence/mentions?term=`) is available independently of RAG
- [x] Cross-document metric trends are paginated (not a full unbounded fetch)
- [x] Wiki `DocumentTrendsPanel` renders converted documents' metric trends inline
- [x] `journal_entry_mentions` cascades on `journal_entry_id` (`ON DELETE CASCADE`)

---

*Story S15.4.2 | Epic E15 | Product: Balencia Platform*
