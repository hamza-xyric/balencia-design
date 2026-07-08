# Balencia Platform - Epic 14: Relationships CRM, Life Correlation Matrix & Knowledge Systems

## EPIC OVERVIEW

### Epic Statement
Epic 14 bundles the four knowledge-and-relationship surfaces that let SIA (Balencia's AI coach) reason about a user's life as an interconnected system rather than a pile of disconnected logs: a **Relationships CRM** that treats personal connections as a first-class sensor domain, a **Life Correlation Matrix (LCM)** that models *directed* cause-and-effect between life domains, a platform-wide **Knowledge Graph** that lets users visually explore how the entities in their life data relate to each other, and a **Wiki Neural Graph** that turns a user's own Personal Wiki into a living, explorable "second brain." A fifth, smaller feature - the wiki-synthesizer reliability hardening - is documented alongside the Neural Graph because it is the engineering investment that made that feature trustworthy.

### Epic Goal
Give SIA (and the user) a structural map of "how everything connects" - who matters to the user, which life domains drive which outcomes, and how the concepts, goals, and relationships in a user's data link together - so that coaching can move from "here's a data point" to "here's how this fits into your whole life."

### Core Philosophy
**"Structure, Not Just Signal":**
1. **Relationships are a health signal, not an afterthought** - social connection is tracked with the same rigor as sleep or macros, because isolation and relationship strain measurably affect every other pillar.
2. **Correlation isn't enough - direction matters.** Epic 08's Pattern Correlation Engine tells you *that* sleep and mood move together. LCM tells you *which way the arrow points* so root-cause reasoning is possible, not just co-occurrence trivia.
3. **Users should be able to SEE their own data structure.** A graph a user can pan, zoom, and click into builds trust that the AI's reasoning is grounded in real, inspectable data - not a black box.
4. **Honesty over decoration.** Every graph in this epic ships with a genuine empty state. No synthetic nodes, no placeholder edges, no fabricated network density when a user hasn't logged anything yet.

### Strategic Importance
Cross-Domain Intelligence (Epic 08) proved Balencia can find *that* two things correlate. Epic 14 is the structural layer underneath and around that: it supplies the **directed graph model** cross-domain reasoning needs to talk about root causes and ripple effects (LCM), the **relationship data** that no fitness or nutrition competitor tracks at all (Relationships CRM), and the **visual, explorable representation** of a user's own knowledge (Knowledge Graph, Wiki Neural Graph) that turns "the AI knows things about me" into "I can see what the AI knows, and it's actually right."

### Feature Scope (6 Features)

| Feature | Description | Status |
|---------|-------------|--------|
| **F14.1** | Relationships CRM (Social Health Pillar) | Shipped |
| **F14.2** | Life Correlation Matrix (LCM) | Shipped (Wave 0) |
| **F14.3** | Knowledge Graph | Shipped |
| **F14.4** | Personal Wiki (cross-reference only) | Documented elsewhere |
| **F14.5** | Wiki Neural Graph | Shipped |
| **F14.6** | Cross-System Data Integrity (Wiki Synthesizer Reliability) | Shipped |

**Shipping window:** 2026-06-05 through 2026-07-07.

---

## F14.1: RELATIONSHIPS CRM (SOCIAL HEALTH PILLAR)

### Description
A dedicated life pillar for the user's personal relationships - family, friends, romantic partners, and professional contacts - treated as a sensor domain exactly like Fitness, Nutrition, and Wellbeing. Rather than living as an isolated "contacts" feature bolted onto the app, it feeds relationship-health signal into the same coaching pipeline that consumes sleep, macros, and mood. It is architecturally and conceptually distinct from Epic 13's Social Growth OS (buddy matching, accountability pods, activity feed): this pillar is about the user's own real-world relationship graph, not in-app social features with other Balencia users.

The pillar surfaces in the dashboard as the **"Relationship Hub"**: an animated network visualization of the user's logged connections, plus list/detail views for individual people. When a user has no connections logged, the Hub renders a genuine empty state - no fabricated nodes, no sample data dressed up as real - consistent with the platform-wide honest-null discipline established in the Overview dashboard rework.

### User Story
As a **Holistic Health Seeker** (P1), I want my personal relationships - family, friends, romantic partner, close colleagues - tracked as part of my overall health picture so that the AI coach can recognize when relationship strain or isolation is affecting my energy, mood, or motivation, the same way it recognizes poor sleep.

### Flexibility Modes

| Mode | Experience |
|------|------------|
| **Light** | See a simple list of tracked relationships with a one-line health indicator per person ("Connected", "Drifting", "Needs attention"). No graph required. |
| **Deep** | Full animated connection-graph visualization (Relationship Hub), per-person detail views, follow-relationship management, and relationship data surfaced directly inside coaching conversations. |

### Technical Foundation

**Data Model:**
- Personal contacts: user-entered relationship records (name, relationship type - family/friend/romantic/professional, closeness signal, last-contact tracking)
- Connection graph: edges between the user and each contact, plus (where applicable) follow relationships between platform users who have opted in to be connected
- Relationship Hub reads the same connection-graph tables that back follow relationships elsewhere in the platform, so a user's in-app social graph (Epic 13) and their personal-contact graph are visually unified in one hub without conflating the two data models

**Rendering:**
- Animated network visualization (force-directed node layout, user as center node, contacts as satellite nodes sized/colored by relationship type and recency of interaction)
- Honest empty state component renders instead of the graph canvas when zero connections exist - explicitly avoids the "here's 5 sample contacts to show you what it could look like" anti-pattern

**Coaching Integration:**
- Relationship-health signal (connection frequency, logged relationship strain/warmth) is exposed to the AI coach's context assembler alongside the other three original pillars, making "who matters to you and how that's going" answerable in conversation the same way "how did you sleep" is

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Empty-state honesty | 100% of zero-connection users see genuine empty state, never fabricated network data | Component-level audit / snapshot tests |
| Relationship logging adoption | 40% of active users log at least 1 relationship within first 14 days | Feature adoption tracking |
| Coach relevance | Relationship signal referenced in coaching responses when relevant (isolation, strain patterns) | Manual QA sampling |
| Graph render performance | Network visualization renders in <500ms for graphs up to 50 nodes | Frontend performance profiling |

### Acceptance Criteria

- [x] Relationships CRM ships as a distinct pillar alongside Fitness, Nutrition, Wellbeing
- [x] Relationship Hub dashboard surface renders an animated connection-graph visualization
- [x] Personal contacts can be added, edited, and categorized by relationship type
- [x] Follow relationships (in-app connections) render within the same Hub visualization
- [x] Honest empty state renders when a user has zero logged connections (no synthetic data)
- [x] Relationship signal is architecturally distinct from Epic 13's Social Growth OS (buddy matching / pods / feed) while sharing the underlying connection-graph tables where relevant
- [ ] Relationship-strain detection actively feeds proactive coaching interventions (flagged as follow-up - see Dependencies)

### Error Handling Scenarios

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|---------------------|
| **Zero connections logged** | Connection count = 0 for user | Render honest empty state, no fabricated nodes | "No connections logged yet. Add the people who matter to you." |
| **Contact data incomplete** | Required fields missing on save | Reject save at validation boundary (Zod) | "Add a name and relationship type to save this contact." |
| **Graph render with large node count** | Node count exceeds render budget | Cap visible nodes, paginate/cluster remainder | "Showing your closest connections. View all in the list." |
| **Duplicate contact entry** | Name + relationship-type collision on create | Reject with typed 409, suggest merge | "You already have a contact like this - want to update it instead?" |

### Relationship Hub Render Process (High-Level)

```
Relationship Hub Load Process:

1. Fetch Connection Data:
   - Query personal contacts for user (relationship type, closeness, last-contact)
   - Query follow-relationship edges for user (in-app connections, opt-in only)
   - Merge into a single connection-graph payload, tagged by source (personal | in-app)

2. Empty-State Check:
   - IF total connection count == 0:
       Render EmptyGraph honest empty-state component
       STOP (no further graph computation)
   - ELSE: proceed to layout

3. Force-Directed Layout:
   - User = center/root node
   - Contacts = satellite nodes, positioned via force simulation
   - Node size = weighted by closeness/interaction recency
   - Node color = relationship type (family/friend/romantic/professional/in-app)

4. Interaction Layer:
   - Click node -> open person detail view
   - Hover node -> lightweight tooltip (name, relationship type, last contact)
   - Filter controls -> toggle relationship-type visibility

5. Coach Context Export:
   - Aggregate relationship-health signal (connection frequency, logged strain)
   - Expose to AI context assembler as Social Health pillar input
```

### Cross-Pillar Connections

**To Wellbeing:**
- Relationship strain and isolation signal feed mood/stress reasoning, since social disconnection is a known driver of both.

**To Life Correlation Matrix (F14.2):**
- "Relationships" is one of the 10 LCM nodes; this pillar is the data source that populates it.

**To Epic 13 (Social Growth OS):**
- Shares the underlying connection-graph/follow-relationship tables for in-app connections, but remains conceptually separate: F14.1 is the user's real-world relationship CRM, Epic 13 is in-app buddy matching, pods, and social gamification. LCM and buddy-suggestion refinements in Epic 13 consume Relationships CRM signal, not the reverse.

**To Epic 11 (SIA Cognitive OS):**
- Relationship-health signal is exposed to the coach's context assembler as a first-class pillar input, alongside Fitness/Nutrition/Wellbeing.

### Dependencies
- **E5, E6, E7 (Fitness/Nutrition/Wellbeing Pillars):** Relationships CRM is architected as a peer pillar to these three; shares the same "sensor domain feeding the coach" pattern.
- **Epic 08 (Cross-Domain Intelligence):** Pattern Correlation Engine can now include relationship signal as a correlation variable once sufficient data exists.
- **Epic 11 (SIA Cognitive OS):** Context assembler consumes relationship-health signal.
- **Epic 13 (Social Growth OS):** Shares connection-graph/follow tables for in-app connections; buddy-suggestion logic in Epic 13 reads LCM (F14.2), which is in turn informed by this pillar.

### MVP Status
[X] Shipped

---

## F14.2: LIFE CORRELATION MATRIX (LCM)

### Description
A cross-pillar **directed** PostgreSQL graph engine modeling relationships between 10 life-domain nodes: **fitness, nutrition, wellbeing, career, finance, relationships, spirituality, growth, creativity, and sleep/recovery.** Where Epic 08's Pattern Correlation Engine (F8.1) finds *flat, symmetric* correlations ("sleep and mood move together, r=0.68"), LCM models *directed* edges between domains so the coach can reason about root causes and downstream ripple effects: not just "sleep and career stress correlate," but "career stress tends to *precede* sleep degradation, which then *precedes* fitness decline three days later."

LCM powers the **"Life Matrix" dashboard tab** where users can see their own directed domain graph, and feeds two other systems by cross-reference: SIA's **Life Correlation Controller** (part of Epic 11's Cognitive OS, which uses directed edges to decide what to bring up and in what causal framing during coaching), and **buddy-suggestion refinements** in Epic 13's Social Growth OS (matching users whose domain-graphs show complementary strengths/weaknesses).

### User Story
As an **Optimization Enthusiast** (P3), I want the AI to understand not just that my career stress and sleep are related, but which one tends to drive the other, so that when I'm coached on a problem, the AI addresses the actual root cause instead of the symptom that happened to be logged most recently.

### Flexibility Modes

| Mode | Experience |
|------|------------|
| **Light** | Coach mentions directional relationships conversationally when relevant: "Your career stress this week seems to be driving your sleep trouble, not the other way around." No graph UI required. |
| **Deep** | Full "Life Matrix" tab: interactive directed graph of all 10 domain nodes, edge-strength visualization, drill-down into which specific data points support a given directed edge, and historical evolution of the matrix over time. |

### Technical Foundation

**Graph Model (PostgreSQL, directed):**
- 10 domain nodes: `fitness`, `nutrition`, `wellbeing`, `career`, `finance`, `relationships`, `spirituality`, `growth`, `creativity`, `sleep_recovery`
- Directed edges stored with source domain, target domain, edge weight/strength, and supporting evidence pointers (which underlying data points justify the directionality)
- Unlike Epic 08's flat correlation records (symmetric `variable_1` <-> `variable_2`), LCM edges are asymmetric: an edge `career -> sleep_recovery` is a distinct graph object from `sleep_recovery -> career`, and both may coexist with different weights
- Directionality inferred via temporal lag analysis: does domain A's movement reliably *precede* domain B's movement, or do they move together with no consistent lead/lag?

**Wave 0 Scope (shipped):**
- Core 10-node graph schema and directed-edge storage
- Domain-signal ingestion from the four original pillars plus Relationships CRM (F14.1), Career module, Finance module
- "Life Matrix" dashboard tab rendering the directed graph
- Known gotcha fixed during Wave 0: a persona-shadow bug where edge weights were being computed against a stale/shadow persona snapshot instead of live domain signal - identified and corrected before ship

**Integration Points:**
- Life Correlation Controller (Epic 11): reads LCM directed edges to decide causal framing in coaching responses ("X is driving Y" vs. "X and Y just happen to move together")
- Buddy-suggestion refinement (Epic 13): reads a user's LCM domain-strength profile to suggest accountability partners with complementary domain patterns

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Directed-edge accuracy | 70%+ of high-confidence directed edges validated by user as "that direction feels right" | Post-insight feedback |
| Matrix population time | 10-node graph populated with at least 1 directed edge within 30 days of active multi-pillar logging | Cohort tracking |
| Coach causal framing adoption | Life Correlation Controller cites directed edges in >50% of root-cause coaching responses where an edge exists | Conversation sampling |
| Buddy-match relevance (Epic 13 cross-ref) | Suggested buddies backed by LCM complementary-domain signal rated more relevant than non-LCM baseline | A/B comparison |

### Acceptance Criteria

- [x] 10-node directed graph schema implemented in PostgreSQL
- [x] Domain nodes cover: fitness, nutrition, wellbeing, career, finance, relationships, spirituality, growth, creativity, sleep/recovery
- [x] Edges are directed (asymmetric), not flat pairwise correlations
- [x] "Life Matrix" dashboard tab renders the user's directed domain graph
- [x] Persona-shadow edge-weight bug identified and fixed prior to Wave 0 ship
- [x] LCM signal is queryable by Epic 11's Life Correlation Controller
- [x] LCM domain-strength profile is queryable by Epic 13's buddy-suggestion logic
- [ ] Multi-hop causal chain reasoning ("A drives B drives C") - flagged as post-Wave-0 follow-up
- [ ] User-facing "why this direction?" evidence drill-down in Deep Mode - partially implemented, full UI polish pending

### Error Handling Scenarios

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|---------------------|
| **Insufficient data for a domain node** | Domain has <14 days of signal | Node renders as "learning" state, no edges computed from it yet | "Still learning your [domain] patterns." |
| **Ambiguous directionality** | Temporal lag analysis inconclusive between two domains | Store as undirected/bidirectional weak edge, do not assert direction | Coach avoids causal framing, falls back to correlational language |
| **Persona-shadow / stale-snapshot drift** | Edge weights computed against out-of-date persona snapshot | Force recompute against live signal (Wave 0 fix) | Silent correction, no user-facing disruption |
| **Domain node with zero signal** | No data logged for a pillar at all (e.g., no Finance data) | Node renders as inactive/dormant, excluded from edge computation | Node shown greyed-out in Life Matrix with "not connected yet" |

### LCM Directed-Edge Computation Process (High-Level)

```
Life Correlation Matrix Computation Process:

1. Domain Signal Aggregation (Nightly, per user):
   - Pull daily aggregate signal for all 10 domains from their source pillars
   - Fitness/Nutrition/Wellbeing/Sleep-Recovery: existing pillar data
   - Relationships: F14.1 connection-health signal
   - Career, Finance, Spirituality, Growth, Creativity: respective module signal

2. Temporal Lag Analysis (Per Domain Pair):
   - For each ordered pair (A, B) where A != B:
     a. Test whether movement in A at time T predicts movement in B at time T+lag
        for lag in [0, 1, 2, 3] days
     b. Compute lagged correlation strength for each lag offset
     c. If strongest signal at lag > 0 AND exceeds direction-confidence threshold:
          Assert directed edge A -> B with that lag and strength
     d. If strongest signal at lag == 0 (simultaneous, no clear lead/lag):
          Store as weak bidirectional edge, no directionality asserted

3. Edge Weight & Evidence:
   - Weight = normalized lagged-correlation strength
   - Evidence pointer = the specific data points/date ranges that justify the edge
   - Store edge with source, target, weight, lag, evidence pointer, last-computed date

4. Graph Assembly:
   - Assemble all 10 nodes + computed directed edges into the user's Life Matrix
   - Nodes with insufficient data render in "learning" or "dormant" state
   - Prune edges that have decayed below minimum weight threshold on recompute

5. Downstream Exposure:
   - Life Correlation Controller (Epic 11) queries directed edges for causal framing
   - Buddy-suggestion logic (Epic 13) queries domain-strength profile (node weights)
   - "Life Matrix" dashboard tab renders the full directed graph for Deep Mode users
```

### Cross-Pillar Connections

**To Epic 08 (Cross-Domain Intelligence):**
- LCM extends F8.1's Pattern Correlation Engine from flat/symmetric correlation to directed, causally-framed relationships. The two systems are complementary: F8.1 discovers *that* a relationship exists; LCM (once sufficient data exists) determines *which way it runs*.

**To Epic 11 (SIA Cognitive OS):**
- Feeds the Life Correlation Controller directly - this is LCM's primary coaching-facing consumer, enabling root-cause framing instead of correlation-only framing in conversation.

**To Epic 13 (Social Growth OS):**
- Feeds buddy-suggestion refinements: users are matched partly on complementary LCM domain-strength profiles.

**To F14.1 (Relationships CRM):**
- Relationships CRM is the direct data source for the `relationships` LCM node.

### Dependencies
- **F8.1 (Pattern Correlation Engine):** Conceptual and statistical foundation LCM extends.
- **F14.1 (Relationships CRM):** Data source for the `relationships` node.
- **Career module, Finance module:** Data sources for the `career` and `finance` nodes respectively.
- **Epic 11 (SIA Cognitive OS):** Life Correlation Controller is the primary downstream consumer.
- **Epic 13 (Social Growth OS):** Buddy-suggestion refinement is a secondary downstream consumer.

### MVP Status
[X] Shipped (Wave 0) - multi-hop causal chains and full evidence drill-down UI flagged as follow-up

---

## F14.3: KNOWLEDGE GRAPH

### Description
A platform-wide, typed-entity graph builder that lets users visually explore how the entities in their life data - people, goals, habits, topics, and other tracked concepts - connect to one another. Surfaced as a dedicated Knowledge Graph tab, it renders a D3 force-graph visualization with a filter sidebar for narrowing by entity type, plus click-through node and entry detail modals so a user can drill from "here's a cluster of connected concepts" down to "here's the specific journal entry or log that created this link."

This is distinct from F14.5 (Wiki Neural Graph): the Knowledge Graph is platform-wide, spanning all typed entities across the whole app (not just wiki pages), rendered with D3 for a data-exploration-tool feel, whereas the Wiki Neural Graph is scoped specifically to a user's Personal Wiki content and rendered with a custom canvas engine for a more organic "living brain" aesthetic.

### User Story
As a **Holistic Health Seeker** (P1), I want to see a visual map of how the people, goals, habits, and topics in my life data connect to each other so that I can discover relationships I didn't consciously notice - the same way the AI does - instead of only reading isolated summaries.

### Flexibility Modes

| Mode | Experience |
|------|------------|
| **Light** | View a simplified graph limited to the most-connected entities, with basic filter (entity type) and click-to-view-details. |
| **Deep** | Full force-graph with all entity types, multi-filter sidebar, node/entry detail modals, search-within-graph, and legend explaining node/edge encoding. |

### Technical Foundation

**Rendering Architecture:**
- D3 force-directed graph (`D3ForceGraph.tsx`) - physics-based node layout distinct from the Wiki Neural Graph's custom canvas engine
- Filter sidebar (`FilterSidebar.tsx`) - whitelisted entity-type filters (people, goals, habits, topics, etc.), applied client-side against the already-fetched typed-entity payload
- Graph header and legend (`GraphHeader.tsx`, `GraphLegend.tsx`) - node/edge type encoding explanation so the visualization is self-documenting
- Loading state (`GraphLoadingSkeleton.tsx`) - skeleton loading per the platform's "skeletons, not spinners" premium-UI standard
- Empty state (`EmptyGraph.tsx`) - honest empty state when a user has no linkable entities yet, consistent with F14.1's empty-state discipline
- Node interaction: hover tooltip (`NodeTooltip.tsx`) for lightweight preview, click opens full detail modal
- Detail modals: `NodeDetailModal.tsx` (entity-level detail - what this node is, its connections) and `EntryDetailModal.tsx` (drills into the specific underlying data entry that created a given node or edge)

**Data Model:**
- Typed entities (people, goals, habits, topics, and other tracked concepts) extracted from across the platform's data surfaces
- Edges represent detected relationships between entities (co-occurrence, explicit linkage, shared context)

**Component Consolidation Note:** the current implementation replaced an earlier generation of graph components (`GraphCanvas.tsx`, `GraphControls.tsx`, `GraphFilters.tsx`, `GraphSearch.tsx`, `NodeDetailPanel.tsx`) with the current D3-based set above, consolidating filter/search/control responsibilities into `FilterSidebar.tsx` and detail responsibilities into the modal pair.

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Empty-state honesty | 100% of users with zero linkable entities see genuine empty state | Component audit |
| Graph render performance | Force-graph settles/renders in <1s for graphs up to 100 nodes | Frontend performance profiling |
| Discovery engagement | 50% of users who open Knowledge Graph click into at least 1 node detail modal | Usage analytics |
| Filter usage | 30% of Knowledge Graph sessions use at least 1 filter | Usage analytics |

### Acceptance Criteria

- [x] D3 force-graph renders typed entities and their detected relationships
- [x] Filter sidebar allows narrowing the graph by entity type
- [x] Node hover shows lightweight tooltip; node click opens full detail modal
- [x] Entry detail modal drills from a node/edge into the underlying data entry
- [x] Honest empty state renders when a user has no linkable entities
- [x] Loading skeleton renders during graph data fetch (no bare spinner)
- [x] Legend explains node/edge type encoding
- [x] Responsive across 360px-1440px+ viewport range

### Error Handling Scenarios

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|---------------------|
| **Zero linkable entities** | Entity count = 0 for user | Render EmptyGraph honest empty state | "Nothing to map yet. Keep logging and your graph will grow." |
| **Graph fetch failure** | API error on entity/edge fetch | Show error state, offer retry | "Couldn't load your graph. Try again?" |
| **Large graph performance degradation** | Node count exceeds render budget | Apply clustering or filter-forced narrowing before render | "Your graph is large - use filters to explore a section at a time." |
| **Filter combination yields zero results** | All entities excluded by active filters | Show empty-filtered state distinct from true empty state | "No entities match these filters. Try adjusting them." |

### Knowledge Graph Load Process (High-Level)

```
Knowledge Graph Tab Load Process:

1. Fetch Typed Entities & Edges:
   - Request user's typed entities (people, goals, habits, topics, ...) and detected
     relationship edges between them

2. Empty-State Check:
   - IF entity count == 0: render EmptyGraph, STOP
   - ELSE: proceed

3. Force-Graph Layout:
   - Initialize D3 force simulation with entities as nodes, relationships as edges
   - Node size/color encode entity type (per GraphLegend)
   - Run simulation to stable layout, render via D3ForceGraph

4. Filter Application:
   - FilterSidebar exposes entity-type toggles
   - Filtering re-runs simulation against the reduced node/edge set (client-side)

5. Interaction Layer:
   - Hover node -> NodeTooltip (lightweight preview)
   - Click node -> NodeDetailModal (entity detail, connections list)
   - From NodeDetailModal, drill into a specific connection -> EntryDetailModal
     (the underlying data entry that created this node/edge)

6. Loading & Error States:
   - GraphLoadingSkeleton renders during initial fetch
   - Error state with retry on fetch failure
```

### Cross-Pillar Connections

**To F14.5 (Wiki Neural Graph):**
- Sibling visualization at a different scope: Knowledge Graph is platform-wide across all typed entities; Wiki Neural Graph is scoped to a user's Personal Wiki pages only. They intentionally use different rendering engines (D3 vs. custom canvas) to reinforce that distinct scope visually.

**To Epic 08 (Cross-Domain Intelligence):**
- Entity relationships surfaced in the graph can originate from correlations and insights discovered by F8.1/F8.4.

**To F14.2 (Life Correlation Matrix):**
- Domain-level entities in the Knowledge Graph may reference the same underlying pillars LCM models, though Knowledge Graph operates at entity granularity (a specific goal, a specific person) rather than domain granularity (all of "fitness").

### Dependencies
- **Platform-wide entity extraction:** Typed entities must be identified and linked across data surfaces before the graph has content to render.
- **E10-equivalent Analytics surfaces:** Knowledge Graph is one of several exploratory visualization surfaces alongside dashboard analytics.

### MVP Status
[X] Shipped

---

## F14.4: PERSONAL WIKI (CROSS-REFERENCE ONLY)

### Description
The Personal Wiki module itself - page creation, `.md`-first-class editing, tab navigation, trends, and document/knowledge tabs - is an existing feature documented in its own PRD/epic and is **not** re-documented here. It is referenced in this epic only as the parent surface that hosts the new Wiki Neural Graph tab (F14.5) and as the beneficiary of the wiki-synthesizer reliability work (F14.6).

### Scope Note
Per scope discipline (CLAUDE.md §0), this epic does exactly what was asked: document the two *new* wiki-adjacent capabilities (Neural Graph visualization and synthesizer reliability), not restate the wiki's existing feature set. Readers looking for the full Personal Wiki feature specification (page types, tab structure, trends pagination, document intelligence integration) should consult the Personal Wiki module's own documentation.

### What This Epic Adds to the Wiki
- **F14.5 Wiki Neural Graph:** a 4th tab on the existing wiki, turning static pages into an explorable network.
- **F14.6 Cross-System Data Integrity:** the reliability fixes to the wiki-synthesizer pipeline that made the Neural Graph's underlying data trustworthy enough to visualize.

### Dependencies
- **Personal Wiki module (documented elsewhere):** F14.5 and F14.6 both build directly on top of it; neither is buildable without the existing wiki's page/link data model.

### MVP Status
N/A - reference only, not a new feature in this epic.

---

## F14.5: WIKI NEURAL GRAPH

### Description
A 4th tab on the existing Personal Wiki module, rendering a "living-brain" canvas visualization of a user's own wiki pages and the links between them. Backed by `GET /api/v1/wiki/graph`, it is deliberately scoped to just the user's personal wiki content (distinct from F14.3's platform-wide Knowledge Graph) and deliberately rendered with a custom, lightweight canvas engine rather than D3 - a stylistic choice to give it a more organic, app-consistent "second brain" aesthetic rather than a generic data-exploration-tool look.

The visualization is synthesized via a wiki-synthesizer service that is wired into all activity-tool handlers across the platform (see F14.6), which is what allows the graph to reflect the *real* structure of a user's wiki - real pages, real links - rather than a naive "connect everything to everything" approximation.

### User Story
As an **Optimization Enthusiast** (P3), I want to see my Personal Wiki rendered as a connected, explorable "living brain" instead of a flat list of pages so that I can visually understand how the concepts I've documented about my own life relate to each other, and rediscover older pages through their connections rather than search alone.

### Flexibility Modes

| Mode | Experience |
|------|------------|
| **Light** | View the Neural Graph as a glanceable overview - most-connected pages visually prominent, tap a node to open that wiki page directly. |
| **Deep** | Full canvas exploration: pan/zoom, glass-panel node detail overlay without leaving the graph, link-strength visualization, and navigation history through the graph itself. |

### Technical Foundation

**API:**
- `GET /api/v1/wiki/graph` - returns the user's wiki pages and the links between them as a graph payload (nodes = pages, edges = detected links)

**Rendering Engine:**
- **Pure canvas engine** (not D3, not a charting library) - purpose-built lightweight renderer chosen specifically for a more organic, app-consistent visual feel than a general-purpose force-graph library would give, and to keep the render loop GPU-cheap and consistent with the platform's animation performance rules (transform/opacity-only hot paths, per CLAUDE.md §9)
- Glass panel overlay for node detail, keeping the user inside the graph exploration context instead of navigating away to a separate detail screen
- Deferred (explicitly out of scope for this ship): WebGL rendering, a "reasoning mode" overlay, and a dedicated graph toolbar - these were identified during build and consciously deferred rather than scope-crept in

**Data Source:**
- Powered by the wiki-synthesizer service (see F14.6), which builds and maintains the page/link graph from real wiki content and activity-tool-driven page updates, rather than deriving links from a shallow text-scan at render time

**Test Coverage:**
- Shipped with 37 unit-level tests and 31 component-level tests, all green, covering the graph engine and canvas renderer independently of each other (engine logic is testable without a DOM/canvas context; renderer is tested via component tests)

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Graph accuracy | Rendered links match real page-to-page references with no orphaned/fabricated edges | Synthesizer QA (see F14.6) |
| Render performance | Canvas graph maintains 60fps pan/zoom for wikis up to ~100 pages | Frontend performance profiling |
| Node navigation | 40% of Neural Graph sessions result in at least 1 node-to-page navigation | Usage analytics |
| Test stability | 37 unit + 31 component tests remain green across subsequent wiki changes | CI suite |

### Acceptance Criteria

- [x] Wiki Neural Graph ships as the 4th tab on the Personal Wiki module
- [x] `GET /api/v1/wiki/graph` returns real user wiki pages and detected links
- [x] Rendering uses a custom lightweight canvas engine, not D3 or a third-party charting library
- [x] Glass-panel node detail overlay keeps user inside the graph context
- [x] Graph reflects real wiki structure via the wiki-synthesizer pipeline (F14.6), not a naive text-scan approximation
- [x] 37 unit tests + 31 component tests green
- [ ] WebGL rendering path - explicitly deferred, not part of this ship
- [ ] "Reasoning mode" overlay - explicitly deferred, not part of this ship
- [ ] Dedicated graph toolbar (zoom controls, layout presets) - explicitly deferred, not part of this ship

### Error Handling Scenarios

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|---------------------|
| **Zero wiki pages** | Page count = 0 for user | Render honest empty state distinct from the loading state | "Your wiki is empty. Create your first page to see it here." |
| **Wiki graph fetch failure** | `GET /api/v1/wiki/graph` errors | Show error state with retry, do not silently render stale/empty graph as if valid | "Couldn't load your Neural Graph. Try again?" |
| **Orphaned page (no links)** | Page exists with zero detected edges | Render as isolated node, not excluded from graph | Node renders alone, still clickable/navigable |
| **Synthesizer lag (page just created)** | Page created but not yet synthesized into graph | Graph reflects last-synthesized state; page appears on next synthesis pass | No error shown; page simply appears shortly after creation |

### Wiki Neural Graph Render Process (High-Level)

```
Wiki Neural Graph Load Process:

1. Fetch Graph Payload:
   - GET /api/v1/wiki/graph
   - Returns: nodes (wiki pages, with metadata) + edges (detected links between pages)

2. Empty-State Check:
   - IF page count == 0: render empty state, STOP
   - ELSE: proceed

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
   - Graph reflects the last wiki-synthesizer pass (F14.6), not real-time text
     scanning at render time - trades a small sync lag for structural accuracy
```

### Cross-Pillar Connections

**To F14.3 (Knowledge Graph):**
- Sibling visualization, different scope and engine: platform-wide typed entities (D3) vs. personal-wiki-only pages (custom canvas). Users encountering both should understand them as two lenses on connected-but-distinct data, not duplicate features.

**To F14.6 (Cross-System Data Integrity):**
- Directly dependent on the wiki-synthesizer reliability fixes; the Neural Graph is the primary reason those fixes were prioritized.

**To Epic 11 (SIA Cognitive OS):**
- A trustworthy wiki graph is a precondition for SIA reasoning conversationally about "how your wiki connects" without contradicting what the user can see for themselves.

### Dependencies
- **Personal Wiki module (F14.4 cross-reference):** Base page/link data model.
- **F14.6 (Cross-System Data Integrity):** Wiki-synthesizer reliability fixes this feature depends on.
- **`GET /api/v1/wiki/graph` endpoint:** Primary data contract.

### MVP Status
[X] Shipped - WebGL, reasoning-mode overlay, and dedicated toolbar explicitly deferred (not scope creep, consciously punted)

---

## F14.6: CROSS-SYSTEM DATA INTEGRITY (WIKI SYNTHESIZER RELIABILITY)

### Description
The wiki-synthesizer service is the pipeline responsible for building and maintaining the page/link graph that powers the Wiki Neural Graph (F14.5): it watches activity across the platform, synthesizes new/updated wiki content and linkages from that activity, and tracks the evidence backing each synthesized link. Before this hardening pass, the pipeline had six identified reliability gaps that would have made the Neural Graph visually convincing but structurally dishonest - exactly the kind of "looks real but isn't" failure mode the platform's honest-null discipline exists to prevent. All six gaps were repaired: evidence tracking was made complete (every synthesized link traces back to the activity that created it) and page updates were made reliable (synthesized pages stay in sync with the activity-tool handlers that feed them), with the synthesizer wired into all activity-tool handlers platform-wide rather than a subset.

This is documented as its own feature entry, distinct from F14.5, because it represents a meaningful, self-contained engineering investment: a correctness pass on a shared pipeline, not a UI feature.

### User Story
As a **Holistic Health Seeker** (P1) using the Wiki Neural Graph, I want the connections shown between my wiki pages to reflect real activity I actually logged, so that when I explore my "second brain" visually, I can trust it as an honest reflection of my own data rather than a graph that looks impressive but is quietly wrong.

### Flexibility Modes

| Mode | Experience |
|------|------------|
| **Light** | Entirely invisible - this is backend pipeline reliability work with no direct user-facing UI. The user experiences it as "the graph in F14.5 is trustworthy," not as a feature they configure. |
| **Deep** | N/A - no user-facing configuration surface. Reliability is a precondition for F14.5's Deep Mode, not a separate mode of its own. |

### Technical Foundation

**Wiki-Synthesizer Service:**
- Central service responsible for converting platform activity (journal entries, goal updates, habit logs, and other activity-tool-driven events) into synthesized wiki page content and inter-page links
- Wired into **all activity-tool handlers** across the platform (not a subset) - meaning any activity surface that can produce wiki-relevant content routes through the same synthesis path, eliminating the class of bug where "some activity types update the wiki graph and others silently don't"

**The Six Reliability Gaps (Repaired):**
1. **Evidence tracking completeness** - every synthesized link now carries a pointer back to the specific activity/data entry that justified it, rather than links existing without traceable provenance
2. **Page update reliability** - synthesized pages reliably reflect the latest activity state instead of silently going stale after the page's initial synthesis
3. **Activity-tool handler coverage** - synthesis is wired into all activity-tool handlers platform-wide, closing gaps where certain activity types bypassed synthesis entirely
4. **Duplicate/race handling** - concurrent activity events targeting the same page no longer produce duplicate or conflicting synthesis passes
5. **Orphaned-link cleanup** - links whose underlying evidence has since been deleted/edited are cleaned up rather than persisting as stale, unverifiable edges
6. **Cross-handler consistency** - synthesis behavior is now consistent regardless of which activity-tool handler triggered it, rather than varying subtly by code path

**Why This Matters for F14.5 Specifically:**
- A visually polished Neural Graph built on an unreliable synthesizer would be strictly worse than no graph at all: it would present fabricated-feeling structure with the *appearance* of ground truth, directly violating the "honest over decoration" philosophy this epic is built on.

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Evidence traceability | 100% of synthesized links carry a valid evidence pointer | Data integrity audit |
| Page staleness | 0 pages showing activity older than the last synthesis pass under normal operation | Pipeline monitoring |
| Handler coverage | 100% of activity-tool handlers route through the shared synthesis path | Code-path audit |
| Orphaned edges | 0 links persisting after their evidence is deleted/edited | Cleanup job verification |

### Acceptance Criteria

- [x] All 6 identified wiki-synthesizer reliability gaps repaired
- [x] Evidence tracking: every synthesized link traces to real activity data
- [x] Page updates reliably reflect current activity state (no silent staleness)
- [x] Synthesizer wired into all activity-tool handlers, not a subset
- [x] Duplicate/race conditions in concurrent synthesis resolved
- [x] Orphaned links (evidence deleted/edited) are cleaned up rather than persisting
- [x] Cross-handler synthesis behavior is consistent regardless of trigger path

### Error Handling Scenarios

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|---------------------|
| **Activity event with no matching handler path** | Activity type not covered by synthesis wiring | Falls back to shared default handler rather than silently dropping | Silent to user; internal logging for pipeline monitoring |
| **Concurrent synthesis race on same page** | Two activity events target the same page near-simultaneously | Serialized/locked synthesis pass, last-consistent-write wins | Silent to user; no duplicate/conflicting page state |
| **Evidence source deleted after synthesis** | Underlying activity entry later deleted/edited | Orphaned link cleanup removes the now-unverifiable edge | Link silently disappears from graph on next sync |
| **Synthesizer failure mid-pipeline** | Exception during synthesis pass | Fail closed on that page's update (do not persist partial/corrupt state) | Page graph reflects last-good synthesis; retried on next activity event |

### Wiki Synthesizer Reliability Pipeline (High-Level)

```
Wiki Synthesizer Activity-to-Graph Pipeline:

1. Activity Event Ingestion:
   - ALL activity-tool handlers (journal, goals, habits, and other activity
     surfaces) route through the shared wiki-synthesizer entry point
   - No handler-specific bypass paths (Gap #3, #6 fix)

2. Synthesis Pass:
   - Determine whether the activity event should create/update a wiki page,
     create/update a link, or both
   - Attach evidence pointer: which specific activity/data entry justifies
     this synthesized content or link (Gap #1 fix)

3. Concurrency Safety:
   - Lock/serialize synthesis passes targeting the same page to prevent
     duplicate or conflicting writes from concurrent activity events (Gap #4 fix)

4. Page State Update:
   - Apply synthesized content/link changes to the page's canonical state
   - Reliable update path ensures pages do not silently go stale (Gap #2 fix)

5. Evidence Lifecycle Maintenance:
   - Periodic cleanup pass identifies links whose evidence source has since
     been deleted or edited, and removes the now-unverifiable edge (Gap #5 fix)

6. Downstream Exposure:
   - GET /api/v1/wiki/graph reads the maintained, evidence-backed page/link
     state - this is the data F14.5's canvas renderer consumes
```

### Cross-Pillar Connections

**To F14.5 (Wiki Neural Graph):**
- Direct dependency: this pipeline is the sole data source for the Neural Graph's visualization. Every reliability property here becomes a trust property in the rendered graph.

**To F14.4 (Personal Wiki):**
- Reliability fixes apply to the wiki's underlying content pipeline generally, not just the Neural Graph's rendering path - meaning wiki page accuracy improves platform-wide, with the Neural Graph as the most visible beneficiary.

**To CLAUDE.md §0 (Prime Directives - honest by default):**
- This feature is a direct application of the platform's "honest-null over fabricated data" discipline applied to a graph/pipeline context rather than a dashboard-metric context.

### Dependencies
- **Personal Wiki module (F14.4 cross-reference):** Base content model the synthesizer operates on.
- **Activity-tool handlers (platform-wide):** All must route through the shared synthesis path for coverage to be complete.
- **F14.5 (Wiki Neural Graph):** Primary consumer and the reason this work was prioritized.

### MVP Status
[X] Shipped - all 6 identified gaps repaired

---

## EPIC SUCCESS CRITERIA

### Launch Readiness (All Features)

- [x] Relationships CRM ships as a peer pillar to Fitness/Nutrition/Wellbeing with honest empty state
- [x] Life Correlation Matrix Wave 0 ships with 10-node directed graph and persona-shadow bug fixed
- [x] Knowledge Graph ships with D3 force-graph, filters, and node/entry detail modals
- [x] Wiki Neural Graph ships as 4th wiki tab, backed by `GET /api/v1/wiki/graph`, 37 unit + 31 component tests green
- [x] Wiki-synthesizer reliability pass repairs all 6 identified gaps
- [ ] LCM multi-hop causal chain reasoning (post-Wave-0 follow-up)
- [ ] Wiki Neural Graph WebGL rendering, reasoning-mode overlay, dedicated toolbar (explicitly deferred)
- [ ] Relationship-strain-driven proactive coaching interventions (flagged follow-up on F14.1)

### Quality Gates

| Gate | Criteria | Measurement |
|------|----------|-------------|
| **Honest-Empty-State Coverage** | 100% of graph surfaces (Relationship Hub, Knowledge Graph, Wiki Neural Graph) render genuine empty states, zero fabricated data | Component audit |
| **Directed-Edge Confidence** | LCM only asserts directionality when temporal lag signal clears the confidence threshold; ambiguous pairs stay undirected | Statistical audit |
| **Graph Data Traceability** | 100% of Wiki Neural Graph edges carry a valid evidence pointer post-synthesizer hardening | Data integrity audit |
| **Test Coverage** | Wiki Neural Graph ships with 37 unit + 31 component tests green; no feature in this epic ships red or skipped | CI suite |
| **Cross-System Consistency** | Relationships CRM and Epic 13 Social Growth OS remain conceptually and architecturally distinct despite shared tables | Architecture review |

### User Experience Validation

| Persona | Key Experience | Success Indicator |
|---------|-----------------|--------------------|
| **P1: Holistic Health Seeker** | Sees relationships treated as a real health signal; trusts the Knowledge/Neural graphs because empty states are honest | Adopts Relationship Hub logging within 14 days |
| **P2: Busy Professional** | Coach explains root causes ("career stress is driving your sleep trouble") instead of vague correlation trivia | Reports coaching feels more precise/actionable |
| **P3: Optimization Enthusiast** | Explores the Life Matrix, Knowledge Graph, and Wiki Neural Graph in Deep Mode to visually map their own life data | Uses at least one graph surface 2+ times/week |

---

## CROSS-EPIC DEPENDENCIES

### Epic 08: Cross-Domain Intelligence
- LCM (F14.2) extends F8.1's Pattern Correlation Engine from flat/symmetric correlation into directed, causally-framed graph relationships
- Relationships CRM (F14.1) becomes a new correlation input variable for F8.1 once sufficient longitudinal data exists

### Epic 11: SIA Cognitive OS
- LCM directed edges feed the Life Correlation Controller, enabling root-cause causal framing in coaching conversations
- Relationships CRM signal is exposed to the coach's context assembler as a first-class pillar input
- A trustworthy Wiki Neural Graph (dependent on F14.6) is a precondition for SIA reasoning conversationally about a user's own wiki without contradicting what the user can see

### Epic 13: Social Growth OS
- LCM domain-strength profiles feed buddy-suggestion refinement (complementary-domain matching)
- Relationships CRM shares underlying connection-graph/follow-relationship tables with Epic 13's in-app social features, while remaining conceptually distinct (real-world relationships vs. in-app social gamification)

### E5, E6, E7 (Fitness/Nutrition/Wellbeing Pillars)
- Relationships CRM is architected as a peer pillar following the same "sensor domain feeding the coach" pattern
- All three pillars are LCM domain-node data sources

### Career Module, Finance Module
- Data sources for the `career` and `finance` LCM domain nodes

### Personal Wiki Module
- Parent surface for the Wiki Neural Graph (F14.5) and the direct beneficiary of wiki-synthesizer reliability work (F14.6)

---

## TECHNICAL CONSIDERATIONS

### Data Models

**LCM Directed Edge Record:**
```json
{
  "edge_id": "uuid",
  "user_id": "uuid",
  "source_domain": "career",
  "target_domain": "sleep_recovery",
  "weight": 0.61,
  "lag_days": 2,
  "directionality_confidence": "high|medium|low",
  "evidence_pointers": ["activity_id_1", "activity_id_2"],
  "last_computed_date": "2026-07-01",
  "status": "active|dormant|pruned"
}
```

**Relationship Connection Record:**
```json
{
  "connection_id": "uuid",
  "user_id": "uuid",
  "contact_id": "uuid",
  "source": "personal_contact | in_app_follow",
  "relationship_type": "family|friend|romantic|professional",
  "closeness_signal": 0.72,
  "last_contact_date": "2026-06-30",
  "created_at": "2026-06-05T00:00:00Z"
}
```

**Knowledge Graph Entity/Edge Record:**
```json
{
  "entity_id": "uuid",
  "user_id": "uuid",
  "entity_type": "person|goal|habit|topic",
  "label": "Morning Run Habit",
  "edges": [
    {"target_entity_id": "uuid", "relationship": "co_occurrence", "strength": 0.55}
  ]
}
```

**Wiki Neural Graph Node/Edge Record:**
```json
{
  "node_id": "uuid",
  "user_id": "uuid",
  "page_id": "uuid",
  "title": "Sleep & Stress Notes",
  "edges": [
    {
      "target_page_id": "uuid",
      "evidence_pointer": "activity_id",
      "last_synced": "2026-07-05T00:00:00Z"
    }
  ]
}
```

### API Endpoints

```
# Relationships CRM (mounted at /api/people, per personal-contacts.routes.ts)
GET    /api/people                                 - List personal contacts (excludes archived)
POST   /api/people                                 - Create contact
GET    /api/people/reach-out                       - Prioritized "who to contact" ranker
GET    /api/people/health                          - Deterministic social-health summary
POST   /api/people/command                         - NL/voice command bar
GET    /api/people/:id                              - Contact detail (+ notes + interactions)
PATCH  /api/people/:id                              - Update contact
DELETE /api/people/:id                              - Archive contact (soft delete)
POST   /api/people/:id/notes                        - Add note
POST   /api/people/:id/interactions                  - Log interaction (advances cadence)

# Life Correlation Matrix (mounted under /api/v1/intelligence, per intelligence.routes.ts)
GET    /api/v1/intelligence/lcm                    - Effective matrix (base ⊕ personal ⊕ temporal) for the user
GET    /api/v1/intelligence/lcm/base                - Global base matrix + domain-priority ordering (onboarding)
GET    /api/v1/intelligence/root-cause/:domain      - Deterministic root-cause explorer (upstream causes)

# Knowledge Graph (mounted under /api/v1/intelligence/graph — a sub-router of intelligence.routes.ts,
# NOT a standalone /api/v1/knowledge-graph path; this is a read-time federated aggregator, not a
# persisted node/edge store — see F14.3 Technical Foundation)
GET    /api/v1/intelligence/graph                  - Federated graph data (filtered by date range/category/edge type/search)
GET    /api/v1/intelligence/graph/node/:nodeId      - Single-node detail + 1-hop neighbors
POST   /api/v1/intelligence/graph/search            - Text search across nodes
GET    /api/v1/intelligence/graph/reasoning         - Architecture/reasoning overlay (SIA feature-health graph, distinct dataset)
GET    /api/v1/intelligence/graph/next-actions      - AI-recommended next-best-actions via graph traversal
GET    /api/v1/intelligence/graph/export             - Export current filtered graph (JSON/CSV)

# Wiki Neural Graph (mounted under /api/v1/wiki, per wiki.routes.ts)
GET    /api/v1/wiki/graph                          - Wiki pages + detected links
```

### Performance Requirements

| Operation | Target Latency | Rationale |
|-----------|------------------|-----------|
| LCM nightly recomputation | Complete within nightly batch window | Runs alongside other nightly intelligence jobs |
| Relationship Hub graph render | <500ms for up to 50 nodes | Dashboard-embedded surface, must feel instant |
| Knowledge Graph render | <1s for up to 100 nodes | Exploratory tool, brief wait tolerable |
| Wiki Neural Graph pan/zoom | 60fps sustained | Canvas engine must stay GPU-cheap per CLAUDE.md §9 |
| Wiki synthesizer per-event pass | <2s per activity event | Keeps graph near-real-time without blocking activity logging |

### Security & Privacy

- **User-scoped graphs only:** LCM, Relationships CRM, Knowledge Graph, and Wiki Neural Graph are all strictly per-user; no cross-user data appears in any graph payload
- **In-app connection opt-in:** Follow-relationship edges rendered in the Relationship Hub only include connections both parties have consented to
- **Evidence pointers are internal:** Evidence pointers backing LCM edges and wiki links are used for integrity/traceability, not exposed as raw IDs to end users beyond what's needed for the "why this link?" UI
- **No fabricated data, ever:** All four graph surfaces in this epic (Relationship Hub, Life Matrix, Knowledge Graph, Wiki Neural Graph) are held to the platform's honest-null standard - genuine empty states, no synthetic nodes/edges under any circumstance

---

## TESTING STRATEGY

### Unit Testing
- LCM directed-edge computation (temporal lag analysis, confidence thresholding)
- Relationship connection-graph merge logic (personal contacts + in-app follows)
- Knowledge Graph entity/edge extraction and filtering logic
- Wiki Neural Graph engine logic (node/edge computation, independent of canvas rendering) - 37 unit tests green

### Integration Testing
- LCM edge exposure to Life Correlation Controller (Epic 11) and buddy-suggestion logic (Epic 13)
- Wiki-synthesizer activity-tool handler coverage across all activity surfaces
- `GET /api/v1/wiki/graph` end-to-end (activity event -> synthesis -> graph payload)

### Component Testing
- Wiki Neural Graph canvas renderer - 31 component tests green
- Knowledge Graph D3 force-graph rendering, filter sidebar, detail modals
- Relationship Hub empty-state vs. populated-state rendering

### Data Integrity Testing
- Evidence-pointer completeness audit across all synthesized wiki links
- Orphaned-link cleanup verification after evidence deletion/edit
- Honest-empty-state audit across all four graph surfaces (zero-data users)

---

## RISKS & MITIGATIONS

| Risk | Impact | Probability | Mitigation |
|------|--------|--------------|------------|
| **LCM asserts false directionality** | High | Medium | Confidence thresholding; ambiguous pairs stored as undirected weak edges, never forced into a direction |
| **Graph surfaces feel fabricated if sparse** | High | Medium | Honest empty states everywhere; no synthetic filler data under any circumstance |
| **Relationships CRM conflated with Epic 13 social features** | Medium | Medium | Clear architectural and documentation separation; shared tables only where genuinely appropriate (in-app follows) |
| **Wiki synthesizer race conditions reappear as new activity-tool handlers are added** | Medium | Low | Shared synthesis entry point wired into all handlers (Gap #3/#6 fix), not per-handler bespoke logic |
| **Knowledge Graph and Wiki Neural Graph confused by users as duplicate features** | Low | Medium | Distinct rendering engines and clear scope framing (platform-wide vs. wiki-only) in-product |

---

## ROADMAP & FUTURE ENHANCEMENTS

### Shipped (This Epic)
F14.1-F14.3, F14.5, F14.6 as defined above (F14.4 is a reference entry only)

### Near-Term Follow-Ups (Flagged, Not Yet Built)
- **LCM multi-hop causal chains:** "A drives B drives C" reasoning beyond single-hop directed edges
- **LCM evidence drill-down UI polish:** full Deep Mode "why this direction?" explorer
- **Relationship-strain-driven proactive interventions:** wiring F14.1 signal into Epic 08's F8.6 Proactive Interventions
- **Wiki Neural Graph toolbar:** zoom controls, layout presets (explicitly deferred at ship time)

### Later Enhancements
- **Wiki Neural Graph reasoning-mode overlay:** visualize SIA's own reasoning path across the graph during a coaching conversation
- **Wiki Neural Graph WebGL rendering:** for larger wikis where the canvas engine's node budget becomes limiting
- **Cross-graph unification view:** an optional combined lens across Knowledge Graph + Life Matrix + Wiki Neural Graph for power users in Deep Mode

---

## DOCUMENT GOVERNANCE

**Review Schedule:** After LCM Wave 1 (multi-hop causal chains) planning, and after any further wiki-synthesizer pipeline changes
**Update Triggers:** LCM directionality accuracy feedback, Wiki Neural Graph performance data at scale, Relationships CRM adoption metrics
**Version Control:** All feature changes require version increment with rationale
**Ownership:** Product Team + AI/ML Team (LCM directionality) + Platform Team (wiki synthesizer pipeline)

---

*Balencia Platform - E14: Relationships CRM, Life Correlation Matrix & Knowledge Systems PRD v1.0*
*Structural layer beneath Cross-Domain Intelligence - directed reasoning, real relationships, honest graphs*

---

*Document Classification: INTERNAL USE - Product Foundation*
*Created: 2026-07-08 | Retrospective Epic Specification for Shipped Functionality (2026-06-05 - 2026-07-07)*
*Total Features: 6 (5 documented in full, 1 cross-reference only) | All Shipped or Wave 0 Shipped*
