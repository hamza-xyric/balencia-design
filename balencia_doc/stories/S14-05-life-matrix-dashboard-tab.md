---
type: story
id: S14.2.2
title: Life Matrix Dashboard Tab
epic: E14
epic_name: Relationships CRM, Life Correlation Matrix & Knowledge Systems
feature: F14.2
feature_name: Life Correlation Matrix (LCM)
product: yhealth-platform
priority: P1
status: Done
created: 2026-07-08
---

# S14.2.2: Life Matrix Dashboard Tab

## User Story

**As an** Optimization Enthusiast,
**I want to** see my own directed domain graph on a dedicated "Life Matrix" dashboard tab,
**So that** I can visually understand which life domains are driving which outcomes for me, not just read a text summary.

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

**User Experience:**
- **Light mode:** coach mentions directional relationships conversationally when relevant ("Your career stress this week seems to be driving your sleep trouble, not the other way around") - no graph UI required
- **Deep mode:** full "Life Matrix" tab - interactive directed graph of all 10 domain nodes, edge-strength visualization, drill-down into which specific data points support a given directed edge, and historical evolution of the matrix over time

**API:**

| Method | Route | Purpose |
|--------|-------|---------|
| GET | `/api/v1/intelligence/lcm` | Full 10-node directed graph for the authenticated user |

**Rendering:**
- 10 domain nodes rendered with visual state per data sufficiency: active (sufficient signal, edges computed), learning (<14 days of signal), dormant/inactive (zero signal for that pillar)
- Directed edges rendered with arrow direction (source -> target) and visual weight/strength encoding
- Nodes with insufficient data render greyed-out with "not connected yet" / "still learning" labeling rather than being silently omitted - keeps the graph honest about what it does and doesn't know yet

**Honest Empty/Partial States:**
- A user with no multi-pillar logging sees all 10 nodes in dormant/learning state and zero edges - never a fabricated "starter" edge set
- This follows the same honest-null discipline as F14.1's Relationship Hub and F14.3's Knowledge Graph

---

## Acceptance Criteria

```gherkin
Scenario: Life Matrix tab renders the directed graph
  Given a user with computed LCM edges
  When they open the Life Matrix dashboard tab in Deep Mode
  Then GET /api/v1/intelligence/lcm returns their 10-node directed graph
  And the tab renders all 10 nodes with directed edges between them

Scenario: Dormant node rendering
  Given a user with zero logged Finance data
  When they view the Life Matrix
  Then the finance node renders greyed-out/dormant
  And is excluded from edge computation
  And is labeled "not connected yet"

Scenario: Learning-state node rendering
  Given a domain with fewer than 14 days of signal
  When the user views the Life Matrix
  Then that node renders in "learning" state
  And no edges originate from it

Scenario: Light-mode conversational fallback
  Given a user in Light flexibility mode
  When a directed edge exists between two domains relevant to their conversation
  Then the coach can mention the directional relationship conversationally
  And no graph UI is required for this to work

Scenario: No fabricated starter data
  Given a brand-new user with no multi-pillar logging yet
  When they open the Life Matrix
  Then all 10 nodes render dormant/learning and zero edges are shown
  And no synthetic/sample edges are rendered
```

---

## Success Metrics

- Matrix population time: 10-node graph populated with at least 1 directed edge within 30 days of active multi-pillar logging
- Coach causal framing adoption: Life Correlation Controller cites directed edges in >50% of root-cause coaching responses where an edge exists (measured via S14.2.3's integration, surfaced here as the Deep Mode UI proof point)

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|----------------|
| Tab render reads precomputed graph (no on-demand recomputation in the request path) | Graph payload strictly user-scoped | Evidence pointers not exposed as raw IDs beyond "why this link?" UI needs | Node/edge state communicated with text labels, not color alone | Responsive 360px-1440px+ |

---

## Dependencies

- **Prerequisite Stories:** S14.2.1 (graph schema and nightly computation must exist before there is anything to render)
- **Related Stories:** S14.2.3 (evidence drill-down extends this tab)
- **External Dependencies:** `GET /api/v1/intelligence/lcm` endpoint

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|--------------------|----------------------|
| Domain node with zero signal | No data logged for a pillar at all | Node renders inactive/dormant, excluded from edge computation | Node shown greyed-out with "not connected yet" |
| Insufficient data for a domain node | <14 days of signal | Node renders "learning" state, no edges computed | "Still learning your [domain] patterns." |
| Matrix fetch failure | `GET /api/v1/intelligence/lcm` errors | Error state with retry, no stale data rendered as current | "Couldn't load your Life Matrix. Try again?" |
| Graph with zero edges (new user) | Zero computed edges | Render all 10 nodes with no edges - honest, not an error | No error shown; nodes render learning/dormant |

---

## Open Questions

- Full Deep Mode "why this direction?" evidence explorer is partially implemented; full UI polish is tracked in S14.2.3 as a flagged follow-up.

---

## Definition of Done

- [x] "Life Matrix" dashboard tab renders the user's directed domain graph
- [x] Dormant/learning node states rendered honestly (no fabricated starter edges)
- [x] Light-mode conversational fallback verified independent of graph UI
- [x] Responsive UI verified 360px-1440px+
- [x] Component tests for node-state rendering (active/learning/dormant)

---

*Story S14.2.2 | Epic E14 | Product: Balencia Platform*
