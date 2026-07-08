---
type: story
id: S14.1.2
title: Relationship Hub Network Visualization
epic: E14
epic_name: Relationships CRM, Life Correlation Matrix & Knowledge Systems
feature: F14.1
feature_name: Relationships CRM (Social Health Pillar)
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S14.1.2: Relationship Hub Network Visualization

## User Story

**As a** Holistic Health Seeker,
**I want to** see an animated network visualization of the people I've logged, with my in-app connections unified in the same view,
**So that** I can see the shape of my relationship world at a glance instead of scanning a flat list.

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

**User Experience:**
- Dashboard surfaces a "Relationship Hub": force-directed network visualization, user as the center/root node, contacts as satellite nodes
- Node size and color encode relationship type (family/friend/romantic/professional/in-app) and recency of interaction
- Hover a node -> lightweight tooltip (name, relationship type, last contact)
- Click a node -> opens the person detail view
- Filter controls toggle relationship-type visibility
- **Light mode:** simple list of tracked relationships with a one-line health indicator per person ("Connected", "Drifting", "Needs attention") - no graph required
- **Deep mode:** full animated Relationship Hub graph, per-person detail views, follow-relationship management

**Data Source:**
- Reads `personal_contacts` (user-entered relationships) merged with follow-relationship edges from the same connection-graph tables that back in-app follow relationships elsewhere on the platform (Epic 13)
- Payload is tagged by source (`personal` \| `in_app`) so personal-contact data and in-app social-graph data are visually unified in one hub without conflating the two underlying data models

**API:**

| Method | Route | Purpose |
|--------|-------|---------|
| GET | `/api/people/health` | Deterministic relationship-health summary (cadence adherence + recency + chat engagement — real signal only, never fabricated) |
| GET | `/api/people` | Personal contacts feeding the hub's network nodes |

**Honest Empty State:**
- When total connection count == 0, render the `EmptyGraph` honest empty-state component instead of the graph canvas - no fabricated nodes, no "here's 5 sample contacts" filler, consistent with the platform's honest-null discipline (established in the Overview dashboard rework)

**Render Process (High-Level):**
```
1. Fetch Connection Data:
   - Query personal_contacts for user (relationship type, closeness, last-contact)
   - Query follow-relationship edges for user (in-app connections, opt-in only)
   - Merge into a single connection-graph payload, tagged by source

2. Empty-State Check:
   - IF total connection count == 0: render EmptyGraph, STOP
   - ELSE: proceed to layout

3. Force-Directed Layout:
   - User = center/root node
   - Contacts = satellite nodes, positioned via force simulation
   - Node size = weighted by closeness/interaction recency
   - Node color = relationship type

4. Interaction Layer:
   - Click node -> person detail view
   - Hover node -> tooltip (name, relationship type, last contact)
   - Filter controls -> toggle relationship-type visibility
```

---

## Acceptance Criteria

```gherkin
Scenario: Zero connections renders honest empty state
  Given a user with zero personal contacts and zero in-app follows
  When they open the Relationship Hub
  Then the EmptyGraph honest empty-state component renders
  And no synthetic/sample nodes are shown
  And the user sees "No connections logged yet. Add the people who matter to you."

Scenario: Populated graph renders within performance budget
  Given a user with up to 50 logged connections
  When they open the Relationship Hub
  Then the force-directed graph renders in under 500ms
  And the user node is the visual center

Scenario: In-app and personal connections unified
  Given a user has both personal_contacts entries and opted-in in-app follow relationships
  When they open the Relationship Hub
  Then both connection types render in the same graph, source-tagged
  And in-app connections only include relationships both parties consented to

Scenario: Node interaction
  Given a populated Relationship Hub
  When the user hovers a node
  Then a lightweight tooltip shows name, relationship type, and last contact
  When the user clicks a node
  Then the person detail view opens

Scenario: Large graph exceeds render budget
  Given a user with a node count exceeding the render budget
  When they open the Relationship Hub
  Then visible nodes are capped and the remainder is paginated/clustered
  And the user sees "Showing your closest connections. View all in the list."

Scenario: Light mode fallback
  Given a user in Light flexibility mode
  When they open Relationships
  Then they see a simple list with a one-line health indicator per person
  And no graph canvas is required to render
```

---

## Success Metrics

- Empty-state honesty: 100% of zero-connection users see genuine empty state, never fabricated network data
- Graph render performance: <500ms for graphs up to 50 nodes
- Relationship logging adoption: 40% of active users log at least 1 relationship within 14 days

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|----------------|
| Graph render <500ms up to 50 nodes | Graph payload strictly user-scoped | In-app edges only rendered where both parties opted in | Keyboard-navigable node list fallback | Responsive 360px-1440px+ |
| Node count capped with clustering beyond render budget | No cross-user data in any graph payload | Personal contact data never exposed to other users | Focus-visible ring on interactive nodes | |

---

## Dependencies

- **Prerequisite Stories:** S14.1.1 (contacts must exist to render)
- **Related Stories:** S14.1.3 (health signal derived from this same data), Epic 13 (shared follow-relationship tables)
- **External Dependencies:** Force-directed layout rendering library, `EmptyGraph` shared component

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|--------------------|----------------------|
| Zero connections logged | Connection count = 0 | Render EmptyGraph, no fabricated nodes | "No connections logged yet. Add the people who matter to you." |
| Graph render with large node count | Node count exceeds render budget | Cap visible nodes, cluster/paginate remainder | "Showing your closest connections. View all in the list." |
| Graph fetch failure | API error on `/relationships/graph` | Error state with retry, no stale render treated as valid | "Couldn't load your Relationship Hub. Try again?" |
| In-app follow not yet consented by other party | Edge missing consent flag | Edge excluded from render entirely | No node shown for unconsented relationship |

---

## Open Questions

- None outstanding; relationship-strain-driven proactive interventions are explicitly flagged as a follow-up (see S14.1.3).

---

## Definition of Done

- [x] Acceptance criteria met
- [x] Honest empty state renders for zero-connection users
- [x] Force-directed graph renders within <500ms budget up to 50 nodes
- [x] In-app and personal connections merge into one source-tagged payload
- [x] Light-mode list fallback implemented
- [x] Responsive UI verified 360px-1440px+
- [x] Component-level snapshot tests for empty vs. populated states

---

*Story S14.1.2 | Epic E14 | Product: Balencia Platform*
