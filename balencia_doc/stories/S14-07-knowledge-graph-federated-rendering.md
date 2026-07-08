---
type: story
id: S14.3.1
title: Knowledge Graph Federated Fetch & D3 Rendering
epic: E14
epic_name: Relationships CRM, Life Correlation Matrix & Knowledge Systems
feature: F14.3
feature_name: Knowledge Graph
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S14.3.1: Knowledge Graph Federated Fetch & D3 Rendering

## User Story

**As a** Holistic Health Seeker,
**I want to** see a visual map of how the people, goals, habits, and topics in my life data connect to each other,
**So that** I can discover relationships I didn't consciously notice, the same way the AI does, instead of only reading isolated summaries.

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

**IMPORTANT - Architecture Correction:** the platform-wide Knowledge Graph has **no dedicated storage tables**. It is a **read-time federated projection** computed on request over the platform's existing feature tables (people, goals, habits, journal/topic data, and other tracked concepts across ~31 existing feature tables), not a persisted graph with its own node/edge schema. This is a deliberate architectural choice consistent with the platform's "don't build a parallel data model when the source tables already exist" discipline - the graph is derived, not stored.

**Rendering Architecture:**
- D3 force-directed graph (`D3ForceGraph.tsx`) - physics-based node layout, distinct from the Wiki Neural Graph's (F14.5) custom canvas engine
- Loading state (`GraphLoadingSkeleton.tsx`) - skeleton loading per the platform's "skeletons, not spinners" premium-UI standard
- Empty state (`EmptyGraph.tsx`) - honest empty state when a user has no linkable entities yet, consistent with F14.1's empty-state discipline

**API:**

| Method | Route | Purpose |
|--------|-------|---------|
| GET | `/api/v1/intelligence/graph` | Typed entities + detected edges, federated at read-time across the platform's existing feature tables |

**Component Consolidation Note:** the current implementation replaced an earlier generation of graph components (`GraphCanvas.tsx`, `GraphControls.tsx`, `GraphFilters.tsx`, `GraphSearch.tsx`, `NodeDetailPanel.tsx`) with the current D3-based set, consolidating filter/search/control responsibilities into `FilterSidebar.tsx` (S14.3.2) and detail responsibilities into the modal pair (S14.3.3).

**Load Process (High-Level):**
```
1. Fetch Typed Entities & Edges:
   - Request user's typed entities (people, goals, habits, topics, ...) and
     detected relationship edges between them, federated at request time
     across existing feature tables - no separate graph storage layer read

2. Empty-State Check:
   - IF entity count == 0: render EmptyGraph, STOP
   - ELSE: proceed

3. Force-Graph Layout:
   - Initialize D3 force simulation with entities as nodes, relationships as edges
   - Node size/color encode entity type (per GraphLegend, see S14.3.2)
   - Run simulation to stable layout, render via D3ForceGraph

6. Loading & Error States:
   - GraphLoadingSkeleton renders during initial fetch
   - Error state with retry on fetch failure
```

---

## Acceptance Criteria

```gherkin
Scenario: Knowledge Graph is a federated projection, not a stored graph
  Given a user's typed entities exist across multiple existing feature tables
  When GET /api/v1/intelligence/graph is requested
  Then the response is computed at read-time from those existing tables
  And no dedicated knowledge-graph node/edge table is read or written

Scenario: D3 force-graph renders typed entities and relationships
  Given a user with linkable entities across people, goals, habits, and topics
  When they open the Knowledge Graph tab
  Then a D3 force-directed graph renders those entities as nodes with detected edges

Scenario: Zero linkable entities
  Given a user with no linkable entities
  When they open the Knowledge Graph tab
  Then the EmptyGraph honest empty-state component renders
  And the user sees "Nothing to map yet. Keep logging and your graph will grow."

Scenario: Loading skeleton, not a bare spinner
  Given the Knowledge Graph tab is fetching data
  When the fetch is in-flight
  Then GraphLoadingSkeleton renders instead of a bare spinner

Scenario: Graph fetch failure
  Given a fetch error occurs on GET /api/v1/intelligence/graph
  When the tab attempts to load
  Then an error state renders with a retry action
  And the user sees "Couldn't load your graph. Try again?"

Scenario: Render performance budget
  Given a user with up to 100 linkable entities
  When the Knowledge Graph renders
  Then the force-graph settles/renders in under 1 second
```

---

## Success Metrics

- Empty-state honesty: 100% of users with zero linkable entities see genuine empty state
- Graph render performance: force-graph settles/renders in <1s for graphs up to 100 nodes
- Discovery engagement: 50% of users who open Knowledge Graph click into at least 1 node detail modal

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|----------------|
| Force-graph render <1s up to 100 nodes | Federated fetch scoped strictly to `user_id` across all source tables | No cross-user entities in any graph payload | Skeleton loading state announced to screen readers | Responsive 360px-1440px+ |
| Read-time federation, no N+1 query pattern across the ~31 source tables | | | | |

---

## Dependencies

- **Prerequisite Stories:** None (entry point for F14.3)
- **Related Stories:** S14.3.2 (filter sidebar/legend), S14.3.3 (node/entry detail drill-down)
- **External Dependencies:** Platform-wide typed-entity extraction across existing feature tables; D3 force-graph rendering library

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|--------------------|----------------------|
| Zero linkable entities | Entity count = 0 for user | Render EmptyGraph honest empty state | "Nothing to map yet. Keep logging and your graph will grow." |
| Graph fetch failure | API error on entity/edge fetch | Show error state, offer retry | "Couldn't load your graph. Try again?" |
| Large graph performance degradation | Node count exceeds render budget | Apply clustering or filter-forced narrowing before render | "Your graph is large - use filters to explore a section at a time." |
| Federation query across many source tables times out | Read-time federation exceeds latency budget | Partial result with narrowing prompt rather than hard failure | "Showing part of your graph - narrow with filters for the rest." |

---

## Open Questions

- None outstanding for this story.

---

## Definition of Done

- [x] D3 force-graph renders typed entities and their detected relationships
- [x] Confirmed as a read-time federated projection with no dedicated storage tables
- [x] Honest empty state renders when a user has no linkable entities
- [x] Loading skeleton renders during graph data fetch (no bare spinner)
- [x] Responsive across 360px-1440px+ viewport range
- [x] Component tests for empty, loading, error, and populated states

---

*Story S14.3.1 | Epic E14 | Product: Balencia Platform*
