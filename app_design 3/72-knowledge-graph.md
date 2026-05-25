# Screen Design: Knowledge Graph

**Screen**: 72 of 77
**File**: 72-knowledge-graph.md
**Register**: AI Mode (royal-purple #7F24FF)
**Primary action**: Explore cross-domain health correlations visually (tap nodes, pinch to zoom)
**Tab**: Me (within Intelligence stack)
**Navigation**: Stack depth 3+ (pushed from Intelligence Dashboard [48] via "Explore your health knowledge graph" link card). Back button returns to Intelligence Dashboard.

---

## Purpose

The Knowledge Graph is Balencia's commercial differentiator — the visual, interactive representation of SIA's understanding of the user's life. It renders the Life Correlation system as an explorable network of interconnected health metrics, behaviors, and outcomes across all 9 domains. Users can see how sleep affects their workout performance, how meditation correlates with lower stress, how finances relate to anxiety levels — connections they'd never discover on their own. This screen transforms abstract AI intelligence into something tangible, beautiful, and deeply personal. Royal-purple (#7F24FF) is the dominant accent because this is SIA's analytical brain made visible.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Graph visualization — the interactive network of nodes and edges (the hero)
2. Node detail panel — information about a selected node and its connections
3. Graph controls — zoom, reset, filter overlay
4. Legend — what colors and sizes mean

**User flow**:
- **Arrives from**: Intelligence Dashboard [48] via "Explore your health knowledge graph" link card (stack push)
- **Primary exit**: Back to Intelligence Dashboard [48] (stack pop)
- **Secondary exits**: SIA Chat [09] via "ask SIA about this" (tab switch with context), Domain Dashboards [26-36] via node tap → "go to [domain]" in detail panel

---

## Layout

**Scroll behavior**: None (graph is pannable/zoomable via gesture, not ScrollView)
**Tab bar visible**: Yes

### ASCII Wireframe

```
+-------------------------------+
|       Status Bar (44pt)       |
|-------------------------------|
|  [<-]  Knowledge Graph  [?]  |  <- nav header, 44pt
|  ═══════════════════════════  |  <- 3pt purple accent line
|-------------------------------|
|                               |
|     ○───○                     |
|    / \   \         ○          |  <- Graph canvas
|   ○   ○───○───────/           |     (full viewport)
|   |       |     ○             |
|   ○───○   ○    / \            |
|        \  |   ○   ○           |
|         ○─○       |           |
|             \     ○            |
|              ○                 |
|                               |
|  [Legend]              [⊕][↺] |  <- controls, bottom-left
|                               |     & bottom-right
|-------------------------------|
|  Today   SIA   Goals   Me    |
+-------------------------------+

--- Node Detail Panel (on tap) ---
+-------------------------------+
| ─── drag handle ───           |
| [Sleep Quality]        [close]|  <- node name + close
| Wellbeing domain              |  <- domain tag
|                               |
| Connected to:                 |
| ● Workout Performance  85%   |  <- connection list
| ● Stress Level         72%   |
| ● Morning Energy       68%   |
| ● Meditation           61%   |
|                               |
| "Better sleep strongly        |
|  correlates with higher       |
|  workout performance"         |  <- SIA insight
|                               |
| [ask SIA]    [go to domain]  |  <- action buttons
+-------------------------------+
```

### Component Stack (top to bottom)

1. **Navigation Header** — 44pt + 3pt accent line = 47pt
   - Back chevron (left), "Knowledge Graph" title (center), help icon (right)

2. **Graph Canvas** — fills remaining viewport (screen height minus header minus tab bar)
   - Interactive force-directed network visualization
   - Pannable and zoomable via gestures

3. **Graph Controls** — floating, bottom-right, 16pt from edges
   - Zoom in/out buttons, reset view button

4. **Legend Toggle** — floating, bottom-left, 16pt from edges
   - Expandable legend overlay

5. **Node Detail Panel** — bottom sheet, slides up on node tap
   - ~45% screen height, shows selected node info and connections

---

## Components

### Navigation Header
- **Purpose**: Screen identification with AI-mode branding
- **Visual treatment**: Same pattern as Intelligence Dashboard [48] header. ink-900 bg, fixed.
  - Back button: standard (left chevron, white, 20pt, 44x44pt, 16pt from left)
  - Title: "Knowledge Graph" in 17pt Sora Semibold, white, center-aligned
  - Accent line: 3pt height, royal-purple (#7F24FF) at 80%, full-width, directly below header
  - Help icon: question-circle, 20pt, white at 50%, right-aligned, 16pt from right, 44x44pt touch target. Tap → info bottom sheet explaining the graph.
- **Size**: full-width x 47pt

### Graph Canvas
- **Purpose**: The hero — interactive visualization of the user's health knowledge network
- **Data source**: `GET /api/v1/intelligence/knowledge-graph` — returns nodes (metrics/behaviors) and edges (correlations with strength)
- **Visual treatment**: Full viewport minus header and tab bar. ink-900 background. No card surface — the graph floats on the dark background for maximum visual impact.
- **Node rendering**:
  - Each node is a circle representing a health metric or behavior
  - **Size**: proportional to how many connections the node has. Range: 24pt (1-2 connections) to 56pt (8+ connections). Most nodes: 32-40pt.
  - **Color**: domain color of the node's primary domain. Filled at 80% opacity.
  - **Label**: node name in 10pt Sora Semibold, white, centered below node. Max 2 lines, ellipsis. Label appears when zoom level > 0.7x (hides at very zoomed-out views to reduce clutter).
  - **Glow**: nodes with strong correlations (3+ edges above 70% strength) get a subtle glow — domain color at 12%, 8pt radial blur beyond circle.
  - **Selected state**: node scales to 1.2x, border becomes 2pt white, glow intensifies to 20%, all non-connected nodes dim to 30% opacity.
- **Edge rendering**:
  - Lines connecting correlated nodes
  - **Width**: proportional to correlation strength. Range: 1pt (weak, <40%) to 3pt (strong, >75%).
  - **Color**: royal-purple (#7F24FF). Opacity proportional to strength: 15% (weak) to 60% (strong).
  - **Selected state**: edges connected to the selected node brighten to 80% opacity and animate with a subtle pulse (opacity oscillates 60%→80%→60% over 2s).
  - **Unrelated edges** (when a node is selected): dim to 5% opacity.
- **Layout algorithm**: Force-directed graph (simplified for mobile). Nodes cluster by domain — same-domain nodes attract slightly. Cross-domain connections create bridges between clusters. Initial layout is computed server-side; client applies force simulation for settling animation.
- **Initial view**: Zoomed to fit all nodes with 32pt padding. Centers on the most-connected node cluster.
- **Gestures**:
  - Pan: single-finger drag moves the viewport
  - Zoom: pinch to zoom (0.3x to 3.0x range)
  - Tap node: select node, show detail panel, highlight connections
  - Tap empty area: deselect node, dismiss detail panel
  - Double-tap: zoom to 1.5x centered on tap point (or reset to fit if already zoomed)

### Graph Controls
- **Purpose**: Zoom and reset controls for users who prefer buttons to gestures
- **Visual treatment**: Floating button stack, bottom-right, 16pt from right edge, 16pt above tab bar area. Vertical stack of 2 buttons, 8pt gap.
  - Each button: 44x44pt, ink-brown-800 bg, --r-md (14pt), 1pt border white at 10%, backdrop-blur(8px)
  - Zoom in: "+" icon (20pt, white at 70%)
  - Zoom out: "−" icon (20pt, white at 70%)
  - Reset: circular arrow icon (20pt, white at 70%). Appears only when view has been moved from initial state.
- **Gestures**: Tap to zoom in 0.5x / zoom out 0.5x / reset to initial view

### Legend Toggle
- **Purpose**: Explain what the visual encoding means
- **Visual treatment**: Floating pill, bottom-left, 16pt from left edge, 16pt above tab bar area.
  - Collapsed (default): ink-brown-800 pill, --r-pill, 36pt height, 16pt horizontal padding. "Legend" text (12pt Sora Semibold, white at 60%) + chevron-up icon (12pt, white at 40%).
  - Expanded: ink-brown-800 card, --r-xl (28pt), 1pt border white at 8%, backdrop-blur(16px). 16pt padding. Content:
    - "Node size" row: small circle (16pt) → large circle (32pt) with "fewer ← connections → more" label
    - "Edge thickness" row: thin line → thick line with "weak ← correlation → strong" label
    - "Colors" row: 9 domain color dots with abbreviated names
    - All text: 11pt Sora Regular, white at 50%
  - Size (expanded): ~200pt wide x ~160pt tall
- **Gestures**: Tap to toggle expanded/collapsed. Tap outside to collapse.

### Node Detail Panel
- **Presentation**: Bottom sheet (ink-brown-800 bg, --r-lg top corners, drag handle). ~45% screen height. Slides up when a node is tapped.
- **Content**:
  - Node name: 18pt Sora Semibold, white, left-aligned, 16pt from left
  - Close button: "×" icon (20pt, white at 50%), top-right, 44x44pt touch target
  - Domain pill: domain color at 15% bg, domain color text, 12pt Sora Semibold, --r-pill, 28pt height. 8pt below name.
  - "Connected to:" header: 12pt Sora Semibold, white at 50%, uppercase, +0.12em tracking, 16pt above connection list
  - Connection list (scrollable if >4): each row 44pt height
    - Left: domain color dot (8pt) + connected node name (14pt Sora Semibold, white)
    - Right: correlation strength percentage (14pt Sora Bold, color-coded). Strong (>75%): white. Moderate (50-74%): white at 70%. Weak (<50%): white at 50%.
    - Strength bar: thin (2pt) bar below each row, same encoding as Intelligence Dashboard correlations. Fill: royal-purple, width proportional to strength.
    - Tap row → selects that node (panel updates, graph re-centers)
  - SIA insight quote: ink-900 bg card inset, --r-md, 12pt padding. Purple dot (4pt, #7F24FF) + insight text in 14pt Sora Regular, white at 70%, italic. Example: "Better sleep strongly correlates with higher workout performance in your data."
  - Action buttons row: 16pt below insight, two buttons side by side, 8pt gap
    - "ask SIA": purple (#7F24FF) at 15% bg, purple text, 14pt Sora Semibold, --r-pill, 40pt height. Navigates to SIA Chat [09] with node context.
    - "go to [domain]": orange (#FF5E00) at 15% bg, orange text, 14pt Sora Semibold, --r-pill, 40pt height. Navigates to the domain dashboard.
- **Gestures**: Drag-to-dismiss, tap close, tap connection row, tap action buttons

### Help Bottom Sheet
- **Presentation**: Standard bottom sheet, ~50% screen height, triggered by help icon tap
- **Content**:
  - Title: "About Your Knowledge Graph" — 18pt Sora Semibold, white
  - Body paragraphs (15pt Sora Regular, white at 70%, 22pt line height):
    - "This graph shows how different aspects of your life connect and influence each other, based on your personal data."
    - "Larger nodes have more connections. Thicker lines show stronger correlations. Tap any node to explore its connections."
    - "The more you track, the richer your graph becomes."
  - "Got it" button: full-width minus 32pt, orange pill, 48pt, "Got it" white text 16pt Sora Semibold
- **Gestures**: Drag-to-dismiss, tap "Got it"

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Nav title | Sora | 600 (Semibold) | 17pt | 22pt | White |
| Node label | Sora | 600 (Semibold) | 10pt | 14pt | White |
| Detail node name | Sora | 600 (Semibold) | 18pt | 24pt | White |
| Detail section header | Sora | 600 (Semibold) | 12pt | 16pt | White at 50% |
| Connection name | Sora | 600 (Semibold) | 14pt | 18pt | White |
| Connection strength | Sora | 700 (Bold) | 14pt | 18pt | White (strong) / white at 70% (mod) |
| SIA insight | Sora | 400 (Regular) | 14pt | 20pt | White at 70% |
| Legend text | Sora | 400 (Regular) | 11pt | 16pt | White at 50% |
| Help body | Sora | 400 (Regular) | 15pt | 22pt | White at 70% |
| Action button text | Sora | 600 (Semibold) | 14pt | 18pt | Purple / Orange |

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | Dark canvas for maximum graph visibility |
| Header accent line | #7F24FF at 80% | royal-purple | AI-mode identification |
| Node fills | per-domain hex at 80% | domain colors | Domain identification |
| Node glow (strong) | per-domain hex at 12% | domain colors | Highlights important nodes |
| Node selected border | white 100% | | Clear selection indicator |
| Edge lines | #7F24FF at 15-60% | royal-purple | SIA-discovered correlations |
| Edge pulse (selected) | #7F24FF at 60-80% | royal-purple | Animated connection highlight |
| Detail panel surface | #211008 | ink-brown-800 | Standard bottom sheet |
| Detail domain pill | per-domain hex at 15% bg | domain colors | Domain identification |
| SIA insight dot | #7F24FF | royal-purple | SIA attribution |
| "ask SIA" button | #7F24FF at 15% bg, #7F24FF text | royal-purple | AI action |
| "go to domain" button | #FF5E00 at 15% bg, #FF5E00 text | brand-orange | Navigation action |
| Strength bar fill | #7F24FF | royal-purple | Correlation strength |
| Graph controls bg | #211008 | ink-brown-800 | Floating controls |
| Legend bg | #211008 | ink-brown-800 | Floating legend |
| Help "Got it" CTA | #FF5E00 bg, white text | brand-orange | Dismissal action |
| Dimmed nodes (unrelated) | original color at 30% | | De-emphasis |
| Dimmed edges (unrelated) | #7F24FF at 5% | royal-purple | De-emphasis |

**60/30/10 verification**: This screen follows the same AI-mode exception as Intelligence Dashboard [48]. Purple dominates edges, strength bars, insight dots, and "ask SIA" buttons because this IS SIA's analytical visualization. Orange appears on the "go to domain" action button and help CTA. Green absent (no success states on this screen). Domain colors on nodes only — identification, not decoration. The purple here represents SIA's discovered knowledge, making the color choice semantic, not aesthetic.

---

## Interaction States

### Node
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Domain color fill at 80%, label below | — |
| Pressed | Scale(1.1), slight brighten | Light impact |
| Selected | Scale(1.2), 2pt white border, glow 20%, non-connected nodes dim | Medium impact |
| Unrelated (another node selected) | 30% opacity, label hidden | — |

### Edge (selected node's connections)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Purple at strength-proportional opacity | — |
| Highlighted | Purple at 80%, pulsing animation | — |
| Unrelated | Purple at 5% | — |

### Graph Control Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800, icon at 70% | — |
| Pressed | Scale(0.95), bg lightens | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Connection Row (in detail panel)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Normal text, strength bar | — |
| Pressed | Row bg white at 5% | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Action Buttons (in detail panel)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Colored bg at 15%, colored text | — |
| Pressed | Bg at 25%, scale(0.97) | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Gesture Map

| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Back button | Stack pop to Intelligence Dashboard [48] |
| Tap | Help icon | Open help bottom sheet |
| Pan (single finger) | Graph canvas | Move viewport |
| Pinch | Graph canvas | Zoom in/out (0.3x–3.0x) |
| Tap | Node | Select node, show detail panel, highlight connections |
| Tap | Empty canvas area | Deselect node, dismiss detail panel |
| Double-tap | Canvas | Zoom to 1.5x at tap point (or reset if zoomed) |
| Tap | Zoom in button | Zoom in 0.5x step |
| Tap | Zoom out button | Zoom out 0.5x step |
| Tap | Reset button | Reset to initial fit-all view |
| Tap | Legend toggle | Expand/collapse legend |
| Tap | Connection row | Select that node, update graph + panel |
| Tap | "ask SIA" | Navigate to SIA Chat [09] with node context |
| Tap | "go to [domain]" | Navigate to domain dashboard |
| Drag down | Detail panel | Dismiss panel |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Graph settling | Screen mount | Force simulation — nodes drift to positions | 800ms | ease-flow |
| Node fade-in | Screen mount | Staggered opacity 0→1, 20ms per node | 280ms each | ease-out-soft |
| Edge fade-in | After nodes settle | Lines draw (stroke-dashoffset) from center outward | 520ms | ease-flow |
| Node selection | Tap | Selected: scale 1→1.2. Unrelated: opacity→30%. Connected edges: opacity→80% | 280ms | ease-out-soft |
| Node deselection | Tap empty | All nodes restore opacity→80%. Edges restore normal. | 280ms | ease-out-soft |
| Edge pulse | Node selected | Opacity oscillates 60%→80%→60% on connected edges | 2000ms loop | ease-in-out |
| Detail panel | Open | Slide up from bottom | 520ms | ease-flow |
| Detail panel | Close | Slide down | 280ms | ease-out-soft |
| Legend expand | Tap | Height 0→auto + fade-in | 280ms | ease-out-soft |
| Legend collapse | Tap | Height auto→0 + fade-out | 280ms | ease-out-soft |
| Zoom (gesture) | Pinch | Continuous transform, 60fps | — | — |
| Zoom (button) | Tap | Smooth zoom step | 280ms | ease-out-soft |
| Reset view | Tap reset | Zoom + pan animates to fit-all | 520ms | ease-flow |

---

## Empty States

### Day 1 (insufficient data)
- Graph canvas shows 3-5 placeholder nodes (domain circles at 20% opacity) in a loose arrangement, no edges
- Center text overlay: "Your knowledge graph is growing" (17pt Sora Semibold, white) + "As SIA learns your patterns, connections between your health data will appear here." (14pt Sora Regular, white at 50%) + purple dot pulse animation (subtle, 3 dots, pulsing scale 0.8→1.2)
- Controls and legend still functional

### Early data (1-2 weeks, sparse graph)
- Fewer nodes (5-15), fewer edges
- Graph still renders and is interactive
- Motivational text at bottom of graph area: "Keep tracking to discover more connections" (13pt Sora Regular, white at 30%, center-aligned)

### Rich data (3+ weeks)
- Full graph with 20-50+ nodes and many edges
- No empty state messaging
- Graph density reflects real engagement

---

## Performance Considerations

- **Node limit**: Client renders max 60 nodes. Backend pre-filters to most relevant/connected.
- **Edge limit**: Max 120 edges rendered. Weakest correlations (<25% strength) hidden by default.
- **Canvas rendering**: Use react-native-skia or similar GPU-accelerated 2D library for smooth 60fps pan/zoom on 500+ draw calls.
- **Layout computation**: Initial force-directed layout computed server-side. Client applies light settling animation only (reduces CPU load).
- **Label hiding**: Node labels hide below 0.7x zoom to reduce text rendering overhead.
- **Detail panel**: Pre-fetches connection data for adjacent nodes to enable instant panel updates when tapping connections.

---

## Accessibility

- Graph canvas: accessibility label "Health knowledge graph showing [N] health metrics and [M] connections between them"
- Nodes: role "button", accessibility label "[metric name], [domain], [N] connections, tap to explore"
- Graph controls: accessibility labels "Zoom in", "Zoom out", "Reset view"
- Legend: accessibility label "Graph legend" with full text description of encoding
- Detail panel: full content readable by screen reader in order
- Alternative view for screen reader users: when VoiceOver is active, the graph renders as a flat list of nodes (sorted by connection count), each expandable to show connections. This ensures the data is accessible even without visual graph comprehension.

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Graph data fails to load (network) | Graph canvas shows centered error state: network-graph icon (48pt, white at 15%) + "Couldn't load your knowledge graph" (17pt Sora Semibold, white) + "Check your connection and try again" (14pt Sora Regular, white at 50%) + "retry" orange text link (14pt Sora Semibold, 44pt touch target). Header and controls remain visible. | Tap "retry" to re-fetch graph data. Back button remains functional. |
| Graph data times out (>10s) | Loading state shows 3 purple dots pulsing (scale 0.8 to 1.2, staggered) centered on canvas + "Loading your graph..." (14pt Sora Regular, white at 40%). After 10 seconds, transitions to network error state above. | Same as network error — "retry" link available. |
| Node detail panel fails to load | Detail panel opens with skeleton shimmer for connection list and insight quote. After 5 seconds: "Couldn't load connections" (14pt Sora Regular, white at 50%) + "retry" link (orange). Node name and domain pill still show from cached graph data. | Tap "retry" in the panel. Dismiss and re-tap node also works. |
| "Ask SIA" navigation fails | Button briefly flashes at 25% bg (400ms). Toast: "Couldn't open SIA Chat. Try again." (14pt Sora Regular, white, ink-brown-800 bg, auto-dismiss 4s). | Tap button again. If persistent, navigate to SIA Chat [09] manually via tab bar. |
| "Go to [domain]" navigation fails | Button briefly flashes at 25% bg (400ms). Toast: "Couldn't open [domain]. Try again." (14pt Sora Regular, white, ink-brown-800 bg, auto-dismiss 4s). | Tap button again. Dismiss panel and navigate manually via tab bar. |
| Partial graph data (some nodes/edges missing) | Graph renders available nodes and edges. Missing data is invisible — the graph simply appears sparser. No error UI shown for partial data since the user has no frame of reference for "complete." | Data refreshes on next screen visit. No explicit user action. |
| Force simulation fails (layout error) | Nodes render at server-provided initial positions without force settling animation. Graph is still interactive (pan, zoom, tap). Slightly less aesthetically arranged. | No user action needed. Silent error logged. |
| Offline mode | Banner below header accent line: "You're offline — showing cached graph" (13pt Sora Regular, white at 40%, cloud-offline icon 14pt). Graph renders from last cached API response. Node detail panels may show stale data. "ask SIA" button disabled (40% opacity). | Banner dismisses when connection restores. Graph refreshes silently. |

---

## Motivation Adaptation

| Level | Adaptation |
|-------|------------|
| **Low** | Simplified 2D list view instead of force-directed graph — nodes shown as a domain-grouped list with connection counts as secondary text. Avoids cognitive overload from complex network visualization. "ask SIA to explain" CTA appears beside each node for guided exploration. Graph view available via toggle but not default. |
| **Medium** | Default force-directed graph with standard visual complexity. Legend expanded by default on first visit, collapsed on subsequent visits. Node detail panel includes SIA insight quote for context. |
| **High** | Full graph with enhanced detail — edge labels visible (correlation type), node sizes scaled by data-point count (more data = larger node), cluster density indicators visible. "Deep dive" link in node detail panel opens SIA Chat with advanced analytical prompt. Legend collapsed by default (assumes familiarity). |

---

## Cross-References

- **Navigates to**: SIA Chat [09] via "ask SIA" button (tab switch with node context pre-loaded), Domain Dashboards [26-36] via "go to [domain]" button (stack push), Help bottom sheet (modal present)
- **Navigates from**: Intelligence Dashboard [48] via "Explore your health knowledge graph" link card (stack push)
- **Shared components with**: Screen [48] — Intelligence Dashboard (purple accent line, eyebrow style, correlation strength encoding, SIA insight pattern), Screen [09] — SIA Chat (context pre-loading for "ask SIA")
- **Patterns used**: Back Button (Batch 1), Bottom Sheet (_shared-patterns.md), AI-Mode Header (Screen 48), Strength Indicator Bar (Screen 48)
- **Patterns established**: **Knowledge Graph Canvas** — force-directed interactive network visualization with domain-colored nodes, purple correlation edges, pinch-to-zoom, tap-to-select. Mobile-optimized for 60fps with GPU-accelerated rendering. **Node Detail Panel** — compact bottom sheet (~45%) showing selected node's connections with strength bars, SIA insight quote, and dual action buttons (ask SIA / go to domain). **Graph Controls** — floating button stack for zoom/reset with backdrop-blur. **Graph Legend** — expandable floating card explaining visual encoding. **VoiceOver Alternative View** — accessible list fallback for graph visualization.
