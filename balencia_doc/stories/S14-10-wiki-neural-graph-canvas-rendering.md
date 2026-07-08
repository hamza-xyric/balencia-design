---
type: story
id: S14.5.1
title: Wiki Neural Graph Canvas Rendering & Navigation
epic: E14
epic_name: Relationships CRM, Life Correlation Matrix & Knowledge Systems
feature: F14.5
feature_name: Wiki Neural Graph
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S14.5.1: Wiki Neural Graph Canvas Rendering & Navigation

## User Story

**As an** Optimization Enthusiast,
**I want to** see my Personal Wiki rendered as a connected, explorable "living brain" instead of a flat list of pages,
**So that** I can visually understand how the concepts I've documented about my own life relate to each other, and rediscover older pages through their connections rather than search alone.

---

## Story Type

- [x] Feature
- [ ] Enhancement
- [ ] Technical
- [ ] Integration

## Priority

- [x] Must Have (P0)
- [ ] Should Have (P1)

---

## Scope Description

**Placement:** 4th tab on the existing Personal Wiki module, alongside the wiki's existing tabs (documented in the Personal Wiki module's own PRD - see F14.4 cross-reference).

**API:**

| Method | Route | Purpose |
|--------|-------|---------|
| GET | `/api/v1/wiki/graph` | Returns the user's wiki pages and the links between them as a graph payload (nodes = pages, edges = detected links) |

**Rendering Engine:**
- **Pure canvas engine** (not D3, not a charting library) - purpose-built lightweight renderer, chosen specifically for a more organic, app-consistent visual feel than a general-purpose force-graph library, and to keep the render loop GPU-cheap consistent with the platform's animation performance rules (transform/opacity-only hot paths, CLAUDE.md §9)
- Deliberately distinct from F14.3's Knowledge Graph, which uses D3 for a data-exploration-tool feel: Wiki Neural Graph is scoped to just the user's personal wiki content and rendered for a "living brain" aesthetic instead
- Glass panel overlay for node detail, keeping the user inside the graph exploration context instead of navigating to a separate detail screen

**Data Source:**
- Powered end-to-end by the wiki-synthesizer service (F14.6 / S14.6.1, S14.6.2), which builds and maintains the page/link graph from real wiki content and activity-tool-driven page updates, rather than deriving links from a shallow text-scan at render time

**Render Process:**
```
1. Fetch Graph Payload:
   - GET /api/v1/wiki/graph
   - Returns: nodes (wiki pages, with metadata) + edges (detected links between pages)

3. Canvas Engine Initialization:
   - Pure canvas engine computes node positions (organic layout, not D3 force-sim)
   - Render loop restricted to transform/opacity-equivalent canvas operations
     for GPU-cheap 60fps pan/zoom

4. Interaction Layer:
   - Pan/zoom via canvas engine's own input handling
   - Click node -> glass-panel overlay with page preview, opens in-place
     (no navigation away from graph)
   - "Open page" action from overlay -> navigates to full wiki page view

5. Data Freshness:
   - Graph reflects the last wiki-synthesizer pass, not real-time text
     scanning at render time - trades a small sync lag for structural accuracy
```

**Explicitly Deferred (Not Scope Creep - Consciously Punted at Ship Time):**
- WebGL rendering path
- "Reasoning mode" overlay (visualizing SIA's own reasoning path across the graph)
- Dedicated graph toolbar (zoom controls, layout presets)

---

## Acceptance Criteria

```gherkin
Scenario: Neural Graph ships as the 4th wiki tab
  Given a user on their Personal Wiki
  When they navigate to the 4th tab
  Then the Wiki Neural Graph canvas renders

Scenario: Graph payload reflects real pages and links
  Given a user with existing wiki pages and synthesizer-detected links
  When GET /api/v1/wiki/graph is requested
  Then it returns real pages as nodes and real detected links as edges

Scenario: Pure canvas rendering, not D3
  Given the Wiki Neural Graph renders
  When the rendering approach is inspected
  Then it uses a custom lightweight canvas engine, not D3 or a third-party charting library

Scenario: Glass-panel node detail without leaving the graph
  Given a populated Neural Graph
  When the user clicks a node
  Then a glass-panel overlay shows page preview in-place
  And the user remains inside the graph exploration context

Scenario: Open page from overlay
  Given the glass-panel overlay is open for a node
  When the user selects "Open page"
  Then they navigate to the full wiki page view

Scenario: Pan/zoom performance
  Given a wiki with up to ~100 pages
  When the user pans/zooms the Neural Graph
  Then the canvas maintains 60fps sustained

Scenario: Orphaned page renders as isolated node
  Given a wiki page with zero detected edges
  When the Neural Graph renders
  Then it renders as an isolated node, still clickable/navigable, not excluded from the graph
```

---

## Success Metrics

- Render performance: canvas graph maintains 60fps pan/zoom for wikis up to ~100 pages
- Node navigation: 40% of Neural Graph sessions result in at least 1 node-to-page navigation
- Graph accuracy: rendered links match real page-to-page references with no orphaned/fabricated edges (synthesizer QA per F14.6)

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|----------------|
| 60fps sustained pan/zoom | Graph payload strictly user-scoped | Wiki content never cross-user visible | Node detail overlay keyboard-dismissible, alt navigation path for non-pointer users | Responsive 360px-1440px+ |
| Render loop restricted to transform/opacity-equivalent canvas operations (CLAUDE.md §9) | | | | |

---

## Dependencies

- **Prerequisite Stories:** S14.6.1, S14.6.2 (wiki-synthesizer reliability - primary reason this feature was prioritized), Personal Wiki module base page/link data model (F14.4 cross-reference)
- **Related Stories:** S14.5.2 (empty/error states and test coverage for this same surface)
- **External Dependencies:** `GET /api/v1/wiki/graph` endpoint

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|--------------------|----------------------|
| Orphaned page (no links) | Page exists with zero detected edges | Render as isolated node, not excluded from graph | Node renders alone, still clickable/navigable |
| Synthesizer lag (page just created) | Page created but not yet synthesized into graph | Graph reflects last-synthesized state; page appears on next synthesis pass | No error shown; page simply appears shortly after creation |
| Large wiki exceeding canvas node budget | Page count exceeds ~100-page performance target | Degrade gracefully (reduced motion / clustering) rather than dropping frames silently | Graph remains usable, pan/zoom may simplify at scale |

---

## Open Questions

- WebGL rendering, reasoning-mode overlay, and dedicated toolbar are explicitly deferred - tracked in the Epic 14 index follow-up list, not part of this story's scope.

---

## Definition of Done

- [x] Wiki Neural Graph ships as the 4th tab on the Personal Wiki module
- [x] `GET /api/v1/wiki/graph` returns real user wiki pages and detected links
- [x] Rendering uses a custom lightweight canvas engine, not D3 or a third-party charting library
- [x] Glass-panel node detail overlay keeps user inside the graph context
- [x] Graph reflects real wiki structure via the wiki-synthesizer pipeline, not a naive text-scan approximation
- [x] 60fps pan/zoom verified for wikis up to ~100 pages
- [ ] WebGL rendering path (explicitly deferred)
- [ ] "Reasoning mode" overlay (explicitly deferred)
- [ ] Dedicated graph toolbar (explicitly deferred)

---

*Story S14.5.1 | Epic E14 | Product: Balencia Platform*
