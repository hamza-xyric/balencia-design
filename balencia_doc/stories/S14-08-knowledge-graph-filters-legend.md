---
type: story
id: S14.3.2
title: Knowledge Graph Filter Sidebar & Legend
epic: E14
epic_name: Relationships CRM, Life Correlation Matrix & Knowledge Systems
feature: F14.3
feature_name: Knowledge Graph
product: yhealth-platform
priority: P1
status: Done
created: 2026-07-08
---

# S14.3.2: Knowledge Graph Filter Sidebar & Legend

## User Story

**As a** Holistic Health Seeker,
**I want to** narrow the Knowledge Graph down to specific entity types and understand what each node/edge color means,
**So that** I can explore a focused slice of my data instead of an overwhelming full graph, and trust that the visualization is self-explanatory.

---

## Story Type

- [x] Feature
- [ ] Enhancement
- [ ] Technical
- [ ] Integration

## Priority

- [ ] Must Have (P0)
- [x] Should Have (P1)

---

## Scope Description

**Filter Sidebar (`FilterSidebar.tsx`):**
- Whitelisted entity-type filters (people, goals, habits, topics, and other tracked concept types)
- Applied client-side against the already-fetched typed-entity payload (the federated fetch in S14.3.1 returns the full user-scoped payload once; filtering re-runs the D3 simulation against the reduced node/edge set without a new network round-trip)
- Consolidates the filter/search/control responsibilities that an earlier generation of components (`GraphControls.tsx`, `GraphFilters.tsx`, `GraphSearch.tsx`) previously split across multiple files

**Graph Header & Legend (`GraphHeader.tsx`, `GraphLegend.tsx`):**
- Node/edge type encoding explanation so the visualization is self-documenting - color and size mappings for each entity type are spelled out, not left for the user to infer
- Header surfaces graph-level context (entity/edge counts, active filter summary)

**Filter Application Flow:**
```
4. Filter Application:
   - FilterSidebar exposes entity-type toggles
   - Filtering re-runs the simulation against the reduced node/edge set (client-side)
```

---

## Acceptance Criteria

```gherkin
Scenario: Filter sidebar narrows the graph
  Given a populated Knowledge Graph with multiple entity types
  When the user toggles off one or more entity-type filters in FilterSidebar
  Then the graph re-renders showing only the remaining entity types
  And no new network request is made (client-side re-filter of the already-fetched payload)

Scenario: Filter combination yields zero results
  Given the user has active filters that exclude every entity
  When the filtered graph would render
  Then an empty-filtered state renders, distinct from the true zero-entity empty state
  And the user sees "No entities match these filters. Try adjusting them."

Scenario: Legend explains node/edge encoding
  Given any populated Knowledge Graph view
  When the user views GraphLegend
  Then node color/size and edge encoding are explained for every entity type present

Scenario: Filter usage tracked
  Given a user interacts with FilterSidebar during a Knowledge Graph session
  When at least 1 filter is toggled
  Then the session is counted toward filter-usage analytics
```

---

## Success Metrics

- Filter usage: 30% of Knowledge Graph sessions use at least 1 filter
- Discovery engagement: filtered exploration contributes to the 50% node-detail-click target (shared metric with S14.3.1)

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|----------------|
| Client-side filter re-render <100ms (no network round-trip) | Filter whitelist enforced - only known entity types are filterable, no arbitrary field filtering | N/A (client-side only, no new data exposure) | Filter toggles keyboard-operable, legend text-based not color-only | Responsive 360px-1440px+ |

---

## Dependencies

- **Prerequisite Stories:** S14.3.1 (federated fetch must supply the entity/edge payload this filters)
- **Related Stories:** S14.3.3 (detail modals triggered from filtered graph state)
- **External Dependencies:** None beyond the S14.3.1 payload contract

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|--------------------|----------------------|
| Filter combination yields zero results | All entities excluded by active filters | Show empty-filtered state distinct from true empty state | "No entities match these filters. Try adjusting them." |
| Filter toggled on an entity type with 0 instances | Entity-type count = 0 for that filter | Filter still shown but visibly inert/disabled-styled | Filter shows "(0)" count, no crash on toggle |
| Rapid filter toggling | Multiple toggles in quick succession | Debounced re-simulation to avoid layout thrash | Smooth transition, no flicker |

---

## Open Questions

- None outstanding for this story.

---

## Definition of Done

- [x] Filter sidebar allows narrowing the graph by entity type
- [x] Legend explains node/edge type encoding
- [x] Empty-filtered state distinct from true empty state
- [x] Filtering operates client-side against already-fetched payload (no redundant network fetch)
- [x] Component tests for filter sidebar and legend rendering

---

*Story S14.3.2 | Epic E14 | Product: Balencia Platform*
