---
type: story
id: S14.3.3
title: Knowledge Graph Node/Entry Detail Drill-Down
epic: E14
epic_name: Relationships CRM, Life Correlation Matrix & Knowledge Systems
feature: F14.3
feature_name: Knowledge Graph
product: yhealth-platform
priority: P1
status: Done
created: 2026-07-08
---

# S14.3.3: Knowledge Graph Node/Entry Detail Drill-Down

## User Story

**As a** Holistic Health Seeker,
**I want to** click into a node in my Knowledge Graph and drill down to the actual data entry that created it,
**So that** I can go from "here's a cluster of connected concepts" to "here's the specific journal entry or log that created this link" and trust the graph is grounded in real data.

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

**Interaction Layer:**
- Hover node -> `NodeTooltip.tsx` lightweight preview (entity label, type, connection count)
- Click node -> `NodeDetailModal.tsx` (entity-level detail: what this node is, its connections)
- From `NodeDetailModal`, drill into a specific connection -> `EntryDetailModal.tsx` (the underlying data entry - e.g. a specific journal entry or log - that created this node or edge)

**API:**

| Method | Route | Purpose |
|--------|-------|---------|
| GET | `/api/v1/intelligence/graph/node/:nodeId?type=` | Entity detail (federated read against the source table the entity was projected from) + 1-hop neighbors |

**Detail Modal Consolidation:** replaced the earlier `NodeDetailPanel.tsx` with the current `NodeDetailModal.tsx` + `EntryDetailModal.tsx` pair - a two-level drill (entity -> specific entry) rather than a single flat panel.

**Interaction Flow:**
```
5. Interaction Layer:
   - Hover node -> NodeTooltip (lightweight preview)
   - Click node -> NodeDetailModal (entity detail, connections list)
   - From NodeDetailModal, drill into a specific connection -> EntryDetailModal
     (the underlying data entry that created this node/edge)
```

---

## Acceptance Criteria

```gherkin
Scenario: Node hover shows lightweight tooltip
  Given a populated Knowledge Graph
  When the user hovers a node
  Then NodeTooltip renders entity label, type, and connection count without a network request

Scenario: Node click opens detail modal
  Given a populated Knowledge Graph
  When the user clicks a node
  Then NodeDetailModal opens showing entity-level detail and its list of connections
  And GET /api/v1/intelligence/graph/node/:nodeId?type= is called to fetch full detail

Scenario: Drill from entity detail to underlying entry
  Given NodeDetailModal is open showing a specific connection
  When the user drills into that connection
  Then EntryDetailModal opens
  And GET /api/v1/intelligence/graph/node/:nodeId?type=entry returns the specific underlying data entry
    (e.g. the journal entry or log) that created the node/edge

Scenario: Entity detail fetch failure
  Given a node click triggers an entity-detail fetch that fails
  When the error occurs
  Then NodeDetailModal shows an error state with retry, not a blank/broken modal
```

---

## Success Metrics

- Discovery engagement: 50% of users who open Knowledge Graph click into at least 1 node detail modal
- Drill-through depth: track ratio of NodeDetailModal opens that proceed to EntryDetailModal (signals genuine "go to source" trust behavior)

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|----------------|
| Entity detail fetch <300ms | Entity/entry detail fetches scoped strictly to `user_id` | Underlying entry detail never exposes another user's data even if an edge is cross-referenced conceptually | Modals trap focus, dismissible via Escape and close button | Responsive 360px-1440px+, modal usable at 360px |

---

## Dependencies

- **Prerequisite Stories:** S14.3.1 (graph and node payload must exist before detail can be requested)
- **Related Stories:** S14.3.2 (filtered graph state feeds which nodes are clickable/visible)
- **External Dependencies:** Source feature tables the entity/entry detail is federated from

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|--------------------|----------------------|
| Entity detail fetch failure | API error on `/api/v1/intelligence/graph/node/:nodeId` | Modal shows error state with retry | "Couldn't load this connection. Try again?" |
| Underlying entry deleted after graph render | Entry fetch returns not-found | EntryDetailModal shows "This entry is no longer available" rather than a broken/blank modal | "This entry is no longer available." |
| Node with zero connections | Entity has no edges | NodeDetailModal renders with an empty connections list, not an error | "No connections found for this entity yet." |

---

## Open Questions

- None outstanding for this story.

---

## Definition of Done

- [x] Node hover shows lightweight tooltip; node click opens full detail modal
- [x] Entry detail modal drills from a node/edge into the underlying data entry
- [x] Error states handled for both entity-detail and entry-detail fetch failures
- [x] Modals responsive and accessible (focus trap, Escape-to-close)
- [x] Component tests for tooltip, detail modal, and entry modal states

---

*Story S14.3.3 | Epic E14 | Product: Balencia Platform*
