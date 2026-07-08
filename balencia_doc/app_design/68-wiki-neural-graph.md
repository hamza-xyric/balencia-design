# Screen Design: Wiki Neural Graph

**Screen**: 68 of 69
**File**: 68-wiki-neural-graph.md
**Register**: Intelligence Mode (royal-purple #7F24FF accent — SIA's own space)
**Primary action**: explore your personal wiki as a living neural network — watch SIA's understanding of you render as a breathing, connected brain
**Tab**: Me → Personal Wiki [20] → **Graph** (4th sub-tab, alongside Knowledge / Documents / Trends)
**Navigation**: Stack depth 2 from Me tab root (Me Main [17] → Personal Wiki [20] → Graph sub-tab). Entry via tapping "Graph" in the Wiki sub-tab bar established on Screen [20]. Node taps open the Intelligence Panel in-place (no navigation) or deep-link into the Knowledge tab [20] entry detail (stack-adjacent tab switch). Exit via back button to Wiki root, or sub-tab switch to Knowledge / Documents / Trends.

---

## Purpose

The Wiki Neural Graph is the "living brain" visualization of everything SIA has learned about the user — the same knowledge that lives as flat entry cards on the Knowledge tab [20], rendered instead as an explorable neural network. Where the Knowledge tab is the *filing cabinet*, the Graph tab is the *nervous system*: it makes SIA's memory feel alive, connected, and worth being proud of, not just a database dump. A pulsing **SIA Core Node** sits at the visual and conceptual center, radiating out to **domain hub nodes** (About You, Preferences, Patterns, Correlations, Goals History, Life Events — the same six chapters from Screen [20]), which in turn connect to individual **wiki page nodes**. Glowing neural pathways carry traveling energy pulses along real connections between pages, visualizing correlation and reference relationships that are otherwise invisible. This is a trust-and-delight surface first, a navigation surface second: users come here to *feel* how much SIA knows and how interconnected their life is, then drill into any node for the underlying entry.

Technically, this is a **hand-rolled Canvas 2D renderer** driven by a `requestAnimationFrame` loop — not D3.js, not a WebGL/Three.js scene. All node positions, spring-physics on drag, camera pan/zoom, particle motion, and the SIA core "breathing" pulse are computed in plain JavaScript against a `<canvas>` 2D context, matching the lightweight-first mandate used elsewhere in the app (see the WebGL splash screen replaced by GPU-cheap clay DOM). Data is sourced from a single endpoint, `GET /api/v1/wiki/graph`, which returns the full node/edge graph (SIA core, domain hubs, page nodes, and their weighted connections) in one payload — there is no incremental fetch-on-pan; the graph is small enough (dozens to low hundreds of nodes) to hold entirely in memory and re-layout is a hierarchical 3-tier force approximation computed once on load.

This screen sits deliberately outside the standard Domain Dashboard Template — like the Intelligence Dashboard [48], it has its own layout grammar because it is not a list-of-content screen, it is a spatial one. There is no ScrollView; the canvas is a persistent viewport the user navigates with pan/zoom rather than scroll. All chrome (search, stats, filters, timeline, zoom controls) is styled as floating glass elements rather than full-width bars specifically so the canvas reads as boundless, not boxed — reinforcing the "living network" framing over a "windowed data view" framing. The `requestAnimationFrame` loop is paused whenever the Graph sub-tab is not the active/visible tab (on tab switch away, or app backgrounding) to protect battery life, and resumed with the graph's last camera position preserved on return.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. **Neural Graph Canvas** — full-bleed, edge-to-edge behind all chrome. The graph itself is the screen.
2. **SIA Core Node** — visually dominant, center-anchored, breathing glow. The conceptual root of everything.
3. **Glass Chrome Overlay** — floating stat chips (page/connection counts), search bar, domain filter legend — all glass-panel elements that float above the canvas without boxing it in.
4. **Domain Hub Nodes** — the six chapter clusters, color-coded, mid-size, orbit the core.
5. **Wiki Page Nodes** — leaf nodes, sized by evidence/source count, orbit their domain hub.
6. **Neural Pathways** — curved connection lines between related pages, with traveling energy-pulse particles.
7. **Intelligence Panel** (desktop right rail) / **Bottom Sheet** (mobile) — selected-node detail, appears only on selection.
8. **Timeline Scrubber** — bottom-anchored, filters the graph by date range. Lowest priority, used occasionally.

**User flow**:
- **Arrives from**: Personal Wiki [20] via "Graph" sub-tab tap (in-place tab switch, no stack push)
- **Primary exit**: Sub-tab switch back to Knowledge [20], Documents, or Trends (in-place)
- **Secondary exits**: Node tap → Intelligence Panel (in-screen state, no navigation) → "open page" link inside panel → Knowledge tab [20] entry detail (tab switch with node context), SIA Chat [09] via "ask SIA about this" panel action (tab switch with context)
- **Back button**: Pops the full Wiki module [20] stack back to Me Main [17]

---

## Layout — State A: Desktop Explorer (default, populated graph)

**Scroll behavior**: None — the canvas is a fixed viewport; navigation is pan/zoom, not scroll.
**Tab bar visible**: Yes (Me tab active)

### ASCII Wireframe — Desktop Explorer

```
┌───────────────────────────────────────────────────────────┐
│                  Status Bar (44pt)                         │
├───────────────────────────────────────────────────────────┤
│  ← "Book of Life"                                          │  ← Wiki Header (44pt)
├───────────────────────────────────────────────────────────┤
│  [Knowledge] [Graph] [Documents] [Trends]                  │  ← Wiki Sub-tabs (40pt)
├───────────────────────────────────────────────────────────┤
│ ┌──────────────────────────┐        ┌──────────────────┐  │
│ │ 🔍 search the graph...   │        │ 47 pages · 128    │  │  ← Search bar (glass)
│ └──────────────────────────┘        │ connections        │  │    + Stat chip (glass)
│                                       └──────────────────┘  │
│  [●fitness][●nutrition][●finance][●career][●relationships] │  ← Domain filter legend
│  [●spirituality][●learning][●creativity][●wellbeing]       │    (glass chip row)
│                                                              │
│                    ╭─────────────╮                          │
│              ·  ·  │             │  ·  ·                    │
│          ·         │  ╭───────╮  │         ·                │  ← Neural Graph Canvas
│       ·      ╭──○──┼──┤ SIA   ├──┼──○──╮      ·             │    (full-bleed, pan/zoom)
│      ·      /│ Fin │  │ CORE  │  │ Rel │\      ·            │
│     ·      ○ │ Hub │  ╰───────╯  │ Hub │ ○      ·           │
│      ·      \│  ·  │  ╱   |   ╲  │  ·  │/      ·            │
│       ·      ╰──○──┼─○─────○───┼──○──╯      ·               │
│          ·      ·  │ Fitness   │  ·      ·                  │
│              ·  ·  ╰─Hub───────╯  ·  ·                       │
│                    ·      ·      ·                           │
│                                              ┌──────────────┐│
│                                              │ SELECTED NODE ││  ← Intelligence
│                                              │ "Morning      ││    Panel (desktop,
│                                              │  person"      ││    right rail,
│                                              │ Fitness domain││    380pt wide)
│                                              │ 3 sources     ││
│                                              │ [open page →] ││
│                                              └──────────────┘│
│  ─────●────────────────────────────────────────────────    │  ← Timeline Scrubber
│  Jan          Mar          May          Jul (today)         │    (bottom-anchored)
├───────────────────────────────────────────────────────────┤
│  Today  |  SIA  |  Goals  |  Me                             │  ← Tab Bar
├───────────────────────────────────────────────────────────┤
│                Home Indicator (34pt)                        │
└───────────────────────────────────────────────────────────┘
```

### Component Stack — Desktop Explorer (z-order, back to front)

1. **Neural Graph Canvas** — full-bleed, fills entire viewport below the sub-tab bar and above the tab bar
   - Purpose: The living-brain visualization itself
   - Content: SIA Core Node, domain hub nodes, page nodes, neural pathways, energy particles, orbiting memory particles

2. **Glass Chrome Overlay** — floats above canvas, no full-width containers
   - Purpose: Search, stats, filters — without boxing in the graph
   - Content: Instant search bar (top-left), animated stat chip (top-right), domain filter legend row (below search)

3. **Intelligence Panel** — 380pt wide right rail (desktop only), appears on node selection
   - Purpose: Detail on the selected node without leaving the graph
   - Content: Node title, domain badge, summary, evidence count, source list, "open page" link

4. **Timeline Scrubber** — 56pt, bottom-anchored above the tab bar
   - Purpose: Filter the graph to a date range
   - Content: Horizontal track, draggable handle, month labels

5. **Wiki Sub-tab Bar** — 40pt, inherited from Screen [20], now with 4th "Graph" tab active
6. **Wiki Header** — 44pt, back chevron + "Book of Life" title
7. **Bottom Tab Bar** — 56pt, Me tab active

---

## Layout — State B: Mobile Focused Node (bottom sheet open)

**Scroll behavior**: None on canvas; the Bottom Sheet itself scrolls if content overflows.
**Tab bar visible**: Dimmed behind the bottom sheet backdrop, not interactive while sheet is open.

### ASCII Wireframe — Mobile Focused Node

```
┌─────────────────────────────────┐
│      Status Bar (44pt)          │
├─────────────────────────────────┤
│  ← "Book of Life"               │  ← Wiki Header
├─────────────────────────────────┤
│ [Know.][Graph][Docs][Trends]    │  ← Wiki Sub-tabs
├─────────────────────────────────┤
│ ┌─────────────────────────┐     │
│ │ 🔍 search the graph...  │     │  ← Search bar (glass, compact)
│ └─────────────────────────┘     │
│ [●fit][●nut][●fin][●car] →      │  ← Filter chips (horiz scroll)
│                                  │
│         ·    ╭───────╮   ·      │
│      ·      │ SIA   │      ·    │  ← Canvas dimmed to 40%
│    ·   ╭─○──┤ CORE  ├──○─╮  ·   │    opacity behind sheet,
│   ·    │Hub │╰───────╯│Hub│ ·   │    camera focused + pan
│    ·   ╰─○──┼─◉───────┼──○╯ ·   │    -locked on selected node
│      ·      │selected │     ·   │    (◉, glowing ring)
│         ·   ╰─────────╯    ·    │
│  ═══════════════════════════    │  ← drag handle
│ ┌─────────────────────────────┐ │
│ │ ●fitness domain              │ │  ← Bottom Sheet
│ │ "Morning person"              │ │    (Intelligence Panel,
│ │                               │ │    mobile variant,
│ │ You tend to be most           │ │    ~50% screen height)
│ │ productive between 6-10am.    │ │
│ │                               │ │
│ │ 3 sources · high confidence   │ │
│ │ 📝 conversation  🔍 pattern   │ │
│ │ ⚠ contradicted by 1 entry     │ │
│ │                               │ │
│ │ [open page in Knowledge →]    │ │
│ │ [ask SIA about this →]        │ │
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│  Today  |  SIA  |  Goals  |  Me │  ← Tab Bar (dimmed, inactive)
├─────────────────────────────────┤
│      Home Indicator (34pt)      │
└─────────────────────────────────┘
```

### Component Stack — Mobile Focused Node

1. **Neural Graph Canvas** — full-bleed, dimmed to 40% opacity and camera-locked on the focused node + its immediate neighbors while the sheet is open
2. **Glass Chrome Overlay (compact)** — search bar + horizontally-scrolling filter chip row (legend collapses to scroll on mobile width)
3. **Bottom Sheet (Intelligence Panel, mobile variant)** — ~50% screen height, slides up from bottom, drag handle, node detail content
4. **Wiki Sub-tab Bar** — 40pt
5. **Wiki Header** — 44pt
6. **Bottom Tab Bar** — 56pt, dimmed/non-interactive while sheet is open (standard modal-over-tab-bar behavior)

---

## Layout — State C: Domain Isolated / Filtered View

**Scroll behavior**: None — canvas viewport, pan/zoom only.
**Tab bar visible**: Yes

This state occurs when a user long-presses a single domain filter chip (isolating it) or manually deselects all but one domain — the most common "I just want to see my fitness knowledge" exploration pattern. Documented separately because the composition changes meaningfully: most of the graph recedes, and the stat chip, path-tracing, and remaining nodes become the entire visual story.

### ASCII Wireframe — Domain Isolated

```
┌───────────────────────────────────────────────────────────┐
│                  Status Bar (44pt)                          │
├───────────────────────────────────────────────────────────┤
│  ← "Book of Life"                                           │  ← Wiki Header
├───────────────────────────────────────────────────────────┤
│  [Knowledge] [Graph] [Documents] [Trends]                   │  ← Wiki Sub-tabs
├───────────────────────────────────────────────────────────┤
│ ┌──────────────────────────┐        ┌──────────────────┐   │
│ │ 🔍 search the graph...   │        │ 12 pages · 30     │   │  ← Stat chip reflects
│ └──────────────────────────┘        │ connections        │   │    filtered counts
│                                       └──────────────────┘   │    (re-plays count-up)
│  [●fitness ✓ isolated] [nutrition][finance][career] ...     │  ← Isolated chip glows,
│                                                                │    others auto-dimmed
│                    ╭─────────────╮                            │
│                    │  ╭───────╮  │                            │  ← All other domain
│                    │  │ SIA   │  │                            │    hubs + pages fade
│               ╭────┼──┤ CORE  ├──┼────╮                       │    to 15% opacity —
│               │    │  ╰───────╯  │    │                       │    spokes to core still
│           ╭───┼────┼─────┼──────┼────┼───╮                    │    visible but dim
│           │   │    │ Fitness   │    │   │                     │
│           │ ○─┼────┤   Hub     ├────┼─○ │   ← Fitness cluster
│           │/│\│    ╰───┬───┬───╯    │/│\│      at full opacity,
│           ○ │ ○        │   │        ○ │ ○      pathways pulsing
│           │\│/│    ╭───┴───┴───╮    │\│/│      between fitness
│           │ ○      │  ○     ○  │      ○ │      pages only
│           ╰────────┴───────────┴────────╯                    │
│                                                                │
│  ─────●────────────────────────────────────────────────      │  ← Timeline Scrubber
│  Jan          Mar          May          Jul (today)           │
├───────────────────────────────────────────────────────────┤
│  Today  |  SIA  |  Goals  |  Me                              │  ← Tab Bar
├───────────────────────────────────────────────────────────┤
│                Home Indicator (34pt)                          │
└───────────────────────────────────────────────────────────┘
```

### Component Stack — Domain Isolated (delta from State A)

- **Domain Filter Legend Chip Row** — the isolated chip gains a glow ring + checkmark ("✓ isolated"); all other chips visually recede (40% opacity) without needing individual taps
- **Neural Graph Canvas** — non-matching hub/page nodes and their pathways fade to 15% opacity and become non-interactive (no hover/tap response) rather than disappearing entirely — this preserves spatial context ("there's more here, just hidden") rather than making the graph feel smaller than it is
- **Stat Chip** — recalculates and re-plays its count-up animation against the filtered subset only
- Everything else (header, sub-tabs, search, timeline, tab bar) is unchanged from State A

---

## Components

### Neural Graph Canvas
- **Purpose**: The core deliverable — a hand-rolled Canvas 2D `requestAnimationFrame` renderer that draws SIA's knowledge as a living, explorable 3-tier hierarchical network (SIA core → domain hubs → wiki pages).
- **Data source**: API — `GET /api/v1/wiki/graph`, single payload on mount (`{ core, hubs[], nodes[], edges[] }`), no pagination or incremental fetch
- **Rendering engine**: Custom Canvas 2D (`<canvas>` + 2D context), **not** D3.js, **not** WebGL/Three.js. Layout is a one-time hierarchical 3-tier force approximation computed on load (core fixed at logical center; hubs ring-arranged around the core at a fixed radius; page nodes ring-arranged around their parent hub at a smaller radius, with light force-directed jitter to avoid overlap). Camera state (pan offset, zoom scale) is applied as a single transform on the 2D context per frame — nodes and edges are not re-computed per frame, only redrawn.
- **Visual treatment**: Full-bleed canvas, ink-900 (#0A0A0F) background bleeding through as the "void" the graph floats in. A faint radial vignette (rgba(127,36,255,0.06) at center, fading to transparent at 60% radius) suggests depth without competing with node color. No grid lines, no axes — this is atmosphere, not a chart.
- **Content**: SIA Core Node, Domain Hub Nodes, Wiki Page Nodes, Neural Pathways (edges), traveling energy-pulse particles, orbiting memory particles per page node, status rings on flagged nodes.
- **Variants**: Populated (default), Filtered (domain legend chips deselected → matching nodes fade to 15% opacity, non-matching edges hidden), Focused (camera pans + zooms to a node + its 1-hop neighbors on selection, background nodes dim to 25%), Search-active (path-tracing highlight — see Instant Search Bar), Reduced-motion (see Motion section), Empty (Day 1 — see Empty States)
- **Gestures**:
  - Pan: one-finger drag (mobile) / click-drag (desktop) moves the camera
  - Pinch-to-zoom (mobile) / scroll-wheel or trackpad pinch (desktop) zooms the camera, clamped 0.4x–3.0x
  - Hover (desktop only): connected edges of the hovered node brighten to full opacity + width, unconnected nodes and edges fade to 20% opacity ("illumination" effect)
  - Tap/click a node: click-to-focus — camera smoothly pans + zooms to center the node with its direct neighbors in view, opens Intelligence Panel / Bottom Sheet
  - Long-press/click-drag a node: drag the node itself; on release, spring-back physics returns it toward its natural layout position (critically-damped spring, ~600ms settle) unless the user has "pinned" it (double-tap to pin, node gets a small pin icon overlay and stops spring-back)
  - Double-tap empty canvas: reset camera to default framing (core centered, full graph in view)
- **Size**: 100% viewport width x (100vh − header − sub-tabs − tab bar)

### SIA Core Node
- **Purpose**: Special rendering for the graph's root — represents SIA itself, the "brain" the whole visualization emanates from. Always present, never filterable out.
- **Data source**: Static (identity node), always rendered at the logical center regardless of camera state
- **Visual treatment**: 64pt diameter circle (largest node in the graph), solid royal-purple (#7F24FF) fill at 85% opacity, with a soft outer glow ring (`--glow-purple`, 0 0 32pt rgba(127,36,255,0.40)) that **pulses** — the "breathing" animation (see Motion). A thin 2pt white-at-40% ring sits just inside the glow, giving the core a crisp edge under the soft glow. Center icon: a minimal SIA glyph (16pt, white, the same mark used for the SIA avatar elsewhere in the app) rendered at 100% opacity regardless of zoom level (never shrinks below legibility).
- **Content**: No label by default (icon is self-explanatory at a glance); on hover/tap, a small caption fades in below the node: "SIA · your coach" (11pt Cabinet Grotesk SemiBold, white).
- **Variants**: Idle (steady breathing pulse, ~3.2s cycle), Active-thinking (rare — pulse speeds up to ~1.6s cycle for ~2s when a background sync just added new nodes, signaling "SIA just learned something"), Reduced-motion (static glow at 60% intensity, no pulse animation)
- **Gestures**: Tap/click → opens a lightweight info card (not the full Intelligence Panel): "SIA · the root of everything it knows about you. 47 pages across 6 domains." No "open page" link (there's no underlying wiki entry for the core itself).
- **Size**: 64pt diameter (fixed regardless of zoom — the core never shrinks past a legible floor, though its position scales with camera pan/zoom like any node)

### SIA Core Info Card
- **Purpose**: A lightweight, distinct-from-the-Intelligence-Panel popover for the SIA Core Node — the core has no underlying wiki entry, so it needs its own compact detail surface rather than reusing the page-node panel layout.
- **Data source**: API — aggregate counts already present in the graph payload header (`totalPages`, `totalConnections`, `domainCount`)
- **Visual treatment**: Small glass card, appears centered just below the core node (desktop) or as a compact peek-height bottom sheet (mobile), ink-brown-800 at 85% + blur, --r-lg corners, 1pt white-at-8% border, `--shadow-2`, 20pt padding.
- **Content**: "SIA · your coach" — 16pt Cabinet Grotesk Bold, white. Below: "47 pages across 6 domains, 128 connections" — 14pt Switzer Regular, white at 70%. A single-line note: "everything here is built from your conversations, your data, and what SIA has learned — nothing is shared without your say." — 12pt Switzer Regular, white at 45%. Close (×) top-right.
- **Variants**: Default (as above), Loading (skeleton while aggregate counts resolve — rare, since these numbers are already in the initial payload)
- **Gestures**: Tap × or tap outside → dismiss, deselect core, camera stays at current framing (unlike page nodes, selecting the core does not trigger a click-to-focus camera move since it's already centered by default)
- **Size**: 280pt wide x ~140pt tall (desktop popover) / full-width x ~35% screen height (mobile peek sheet)

### Domain Hub Node
- **Purpose**: Represents one of the six wiki chapters from Screen [20] (About You, Preferences, Patterns, Correlations, Goals History, Life Events) as a mid-tier cluster anchor between the SIA core and individual page nodes.
- **Data source**: API — `hubs[]` array in the graph payload, one entry per chapter with `pageCount`
- **Visual treatment**: 36pt diameter circle, domain color fill at 70% opacity (using the app's established 9-domain palette where the chapter maps to a life domain, e.g. Patterns discovered from fitness data render fitness-red; chapters that span multiple domains like "About You" use a neutral warm-white fill at 50% opacity instead of a single domain color). 1pt white-at-15% ring border. A short curved "spoke" pathway connects every hub to the SIA Core Node — always rendered at full opacity regardless of filter/hover state (the hub-to-core connection is structural, not filterable).
- **Content**: Label below the node (13pt Cabinet Grotesk SemiBold, white, only rendered when zoom ≥ 0.8x to avoid clutter at wide zoom): chapter name + page count, e.g. "Patterns (12)"
- **Variants**: Default, Illuminated (hover — spokes to child page nodes brighten), Filtered-out (domain legend deselected — fades to 15% opacity, its child page nodes hide entirely), Empty chapter (0 pages — rendered at 30% opacity with a dashed ring, no children)
- **Gestures**: Tap/click → camera focuses to frame the hub + all its child page nodes; opens a compact panel: chapter name, page count, "view in Knowledge tab" link (deep-links to Screen [20] with that chapter tab pre-selected)
- **Size**: 36pt diameter, label area ~80pt wide x 16pt below node

### Wiki Page Node
- **Purpose**: The leaf-level node — one per wiki entry (the same entries shown as Entry Cards on the Knowledge tab [20]). This is where most user interaction happens.
- **Data source**: API — `nodes[]` array, one entry per wiki page with `title`, `domain`, `evidenceCount`, `sourceCount`, `status` (fresh / contradicted / stale)
- **Visual treatment**: Circle sized on a 10pt–24pt diameter scale proportional to `evidenceCount + sourceCount` (more corroborating sources/evidence = a visually "heavier," more established node). Fill: domain color at 55% opacity. 1pt border: white at 10% (default) — see Status Ring variant for flagged states. Orbiting **memory particles**: 2–5 tiny dots (2pt each) that slowly orbit the node at a fixed radius proportional to source count (more sources = more orbiting particles, up to a cap of 5, each representing one corroborating source), rotating continuously at a slow, constant angular velocity independent of camera movement.
- **Content**: Label appears only when zoomed in (≥1.2x) or when the node is hovered/selected: title text (12pt Switzer Medium, white, truncated to ~18 characters with ellipsis), positioned just below the node.
- **Variants**:
  - **Standard**: fresh, uncontradicted entry — as described above
  - **Contradicted**: a thin pulsing amber-orange (#FF5E00 at 70%) status ring around the node (3pt, offset 2pt outside the border), indicating the entry conflicts with another data point — mirrors the "Active Contradictions" concept from Screen [48]
  - **Stale**: a thin dashed white-at-30% ring, indicating the entry hasn't been corroborated or referenced in 60+ days — invites a refresh
  - **Correlation node** (chapter = Correlations): additionally rendered with a subtle royal-purple (#7F24FF at 20%) inner glow, since correlations are SIA-synthesized rather than directly observed
  - **Selected**: node scales to 1.3x, gains a bright white-at-60% focus ring (2pt, offset 3pt), and its direct edges brighten to 100% opacity while all non-connected nodes/edges dim to 25%
  - **Filtered-out**: domain legend chip deselected → 15% opacity, non-interactive
- **Gestures**: Tap/click → click-to-focus (camera pans/zooms to center node + 1-hop neighbors) + opens Intelligence Panel/Bottom Sheet. Hover (desktop) → illumination effect on connected edges. Long-press/drag → move node with spring-back on release; double-tap → pin in place.
- **Size**: 10pt–24pt diameter (data-driven), label area ~120pt wide x 16pt below node when visible

### Neural Pathway (Edge)
- **Purpose**: Visualize a real connection between two wiki pages — shared topic, cross-reference, or a correlation SIA has drawn between them. This is the "neural" in Neural Graph: it's what turns a node list into a network.
- **Data source**: API — `edges[]` array, each with `sourceNodeId`, `targetNodeId`, `strength` (0–1, drives visual weight)
- **Visual treatment**: A gently curved bezier line (never a straight line — the curve is what reads as "organic" rather than "flowchart"), stroke width 1pt–3pt proportional to `strength`, color: a soft gradient between the two connected nodes' domain colors, capped at 35% opacity at rest (kept subtle so the nodes remain the visual focus). Hub-to-core spokes are the exception — always full opacity, solid royal-purple.
- **Content**: No label at rest. On hover/selection of either endpoint node, the edge brightens to 90% opacity and widens by 1pt.
- **Traveling energy-pulse particles**: A small glowing dot (4pt, white core with a domain-colored 8pt halo) travels along the bezier path from source to target at a constant speed (~1.5s per full traversal), looping continuously. Only the strongest ~30% of edges (by `strength`) carry a visible pulse at rest, to avoid visual noise — all edges gain a pulse temporarily when either endpoint is selected/hovered (illumination extends to edges, not just brightening).
- **Variants**: Ambient (dim, no pulse — the ~70% weaker edges), Active (dim baseline + traveling pulse — the ~30% strongest edges), Illuminated (hover/selection — full opacity, pulse forced on), Filtered-out (either endpoint filtered — edge hidden entirely), Reduced-motion (static line, no traveling particle)
- **Gestures**: None directly (edges are not independently tappable); illumination is driven by node hover/selection
- **Size**: Variable (bezier path between two node positions), stroke 1pt–3pt

### Glass Chrome Overlay — Stat Chip
- **Purpose**: Surface the scale of the graph at a glance ("47 pages · 128 connections") without a heavy header bar competing with the canvas.
- **Data source**: API — derived from the graph payload (`nodes.length`, `edges.length`)
- **Visual treatment**: Floating glass pill, top-right, ink-brown-800 at 70% opacity + backdrop-blur(16px), 1pt white-at-8% border, --r-pill corners, 8pt vertical / 16pt horizontal padding, `--shadow-1`.
- **Content**: "47 pages · 128 connections" — 13pt Cabinet Grotesk SemiBold, white, single line. Numbers animate with a **count-up** effect on mount (0 → final value over 800ms, ease-out-soft) — the first thing that happens when the graph loads, reinforcing "this is alive and growing."
- **Variants**: Default (both counts), Filtered (updates live to reflect only visible/filtered nodes and edges, e.g. "12 pages · 30 connections" when a domain filter is active — count-up replays on filter change), Loading (skeleton pill, shimmer, no numbers)
- **Gestures**: None (informational only)
- **Size**: Auto-width (~220pt) x 32pt

### Instant Search Bar
- **Purpose**: Jump directly to a wiki page by keyword without visually hunting through the graph — search results trace the path from the SIA core through the matching node.
- **Data source**: Client-side filter over the already-loaded graph payload (titles + content snippets), instant-as-typed (no debounce needed — the full dataset is already in memory, this is not a server round-trip)
- **Visual treatment**: Floating glass pill, top-left, same glass treatment as the Stat Chip (ink-brown-800 at 70% + blur, 1pt white-at-8% border, --r-pill, `--shadow-1`). 44pt height. Magnifying glass icon (16pt, white at 40%) left-inset. Placeholder: "search the graph..." (14pt Switzer Regular, white at 40%).
- **Content**: As the user types, matching nodes on the canvas get a bright white-at-80% focus ring, non-matching nodes dim to 15% opacity, and the **path-tracing highlight** activates: the shortest path of edges from the SIA Core Node through the relevant domain hub to each matching page node lights up in solid royal-purple (2pt, 100% opacity, animated dash-offset suggesting flow direction) — visually answering "how does SIA know this."
- **Variants**: Empty (idle), Typing (live filter + path-trace active), No results ("no pages match" caption appears below the bar, all nodes dim to 15%), Cleared (X button appears when text entered, tap to clear and restore full graph)
- **Gestures**: Tap → focus + keyboard. Type → live filter + path-trace. Tap a highlighted node → same click-to-focus behavior as any node. Tap X → clear search.
- **Size**: 280pt (desktop) / full-width minus filter-row overflow (mobile, compact) x 44pt

### Domain Filter Legend Chip Row
- **Purpose**: Toggle visibility of domain clusters — declutter the graph to focus on one or a few life areas at a time.
- **Data source**: Static list of the 9 app-wide domain colors (fitness-red, nutrition-lime, finance-emerald, career-indigo, relationships-pink, spirituality-purple, learning-cyan, creativity-amber, wellbeing-teal) intersected with domains actually present in the user's graph (domains with 0 pages are omitted)
- **Visual treatment**: Row of small glass pill chips, each 28pt tall, 10pt horizontal padding, --r-pill. Each chip: a small color dot (8pt, domain color) + domain name (12pt Cabinet Grotesk SemiBold, white). Active (all domains selected by default): full opacity. Deselected: 40% opacity, dot desaturates to white-at-20%.
- **Content**: One chip per present domain; horizontal scroll on mobile (row overflows past ~4 chips at 360pt width), wraps or stays single-row with more room on desktop.
- **Variants**: All active (default), Partial selection (some domains dimmed on canvas), Single domain isolated (long-press a chip → "isolate" — all other domains hide entirely, useful for a focused explore session)
- **Gestures**: Tap chip → toggle that domain's nodes/edges visibility on canvas (instant, no confirmation). Long-press chip → isolate that domain only. Tap an already-isolated chip again → restore all.
- **Size**: Full-width (wraps or scrolls) x 28pt per row

### Timeline Scrubber
- **Purpose**: Filter the graph to show only pages/connections active within a date range — lets a user "rewind" and see what SIA knew at an earlier point, or focus on recent additions.
- **Data source**: API — each node carries a `createdAt`/`lastReferencedAt` timestamp; scrubber range is client-side filtered against the already-loaded graph
- **Visual treatment**: Bottom-anchored glass bar, full-width minus 32pt margins, 56pt tall, ink-brown-800 at 70% + blur, --r-lg top corners only (flush with bottom safe area). Horizontal track (2pt, white at 15%) spans the full width with month tick labels below (11pt Switzer Regular, white at 30%). Two draggable handles (12pt circles, royal-purple fill, white ring) define a range; default range is the full history (handles at each end). A highlighted track segment (royal-purple at 25%) shows the active range.
- **Content**: Range labels above the handles when dragging: "Jan 2026 → Jul 2026 (today)" (12pt Cabinet Grotesk SemiBold, white)
- **Variants**: Full range (default, no filtering), Custom range (subset of nodes shown, others fade to 10% opacity), Dragging (handle enlarges to 16pt, live label follows finger/cursor)
- **Gestures**: Drag either handle → adjusts range, canvas updates filtering live (debounced ~100ms during drag, final settle on release). Tap the track (not on a handle) → snaps nearest handle to that point. Double-tap the bar → reset to full range.
- **Size**: Full-width minus 32pt x 56pt

### Intelligence Panel (Desktop Right Rail)
- **Purpose**: Show full detail on the selected node without leaving the graph view — desktop has room for a persistent side panel rather than a modal.
- **Data source**: API — node detail is already present in the loaded graph payload (title, domain, summary, evidenceCount) plus a lazy-loaded `sourceList` fetched on selection via `GET /api/v1/wiki/graph/nodes/:id` for full source attribution (avoids bloating the initial graph payload with every source's full detail).
- **Visual treatment**: 380pt wide, full-height right rail, ink-brown-800 glassmorphism panel, --r-xl on the left edge only (flush with screen right edge), 1pt white-at-8% border, 24pt padding, `--shadow-2`. Slides in from the right when a node is selected.
- **Content** (top to bottom):
  - Domain badge: small pill, domain color at 15% bg, domain color text, 11pt Cabinet Grotesk SemiBold, e.g. "fitness"
  - Page title: 20pt Cabinet Grotesk Bold, white
  - Summary: 14pt Switzer Regular, white at 80%, up to 4 lines (matches the entry content on Screen [20])
  - Evidence/source count row: "3 sources · high confidence" — 13pt Switzer Medium, white at 60% (confidence badge styled per the Confidence Badge pattern from Screen [20]: high=green, medium=orange, low=neutral)
  - Source list: up to 5 rows, each with a small source-type icon (conversation / data-detection / user-edited, same icon set as Screen [20]) + short label + date, 12pt Switzer Regular, white at 50%
  - Status callout (conditional): if contradicted, an amber inline banner: "⚠ contradicted by 1 other entry" (12pt Cabinet Grotesk SemiBold, #FF5E00); if stale, a muted callout: "not referenced in 62 days" (12pt Switzer Regular, white at 40%)
  - "open page in Knowledge tab" — 14pt Cabinet Grotesk SemiBold, orange (#FF5E00), right chevron, 44pt touch target
  - "ask SIA about this" — 14pt Cabinet Grotesk SemiBold, royal-purple (#7F24FF), chat-bubble icon, 44pt touch target
  - Close (×) — top-right of panel, 44x44pt touch target
- **Variants**: Page node selected (full detail as above), Hub node selected (compact variant: chapter name, page count, "view chapter" link only), SIA Core selected (compact info card, no source list), Loading (skeleton shimmer for title/summary/sources while source list lazy-loads), Empty selection (panel hidden, canvas full-width)
- **Gestures**: Tap "open page" → tab switch to Knowledge [20] with that entry pre-scrolled-to. Tap "ask SIA" → tab switch to SIA Chat [09] with node context pre-loaded. Tap × or click canvas empty space → deselect, panel slides out.
- **Size**: 380pt wide x 100% viewport height (below sub-tab bar)

### Bottom Sheet (Mobile Intelligence Panel)
- **Purpose**: Mobile equivalent of the Intelligence Panel — same content, bottom-sheet presentation to preserve canvas real estate on narrow viewports.
- **Data source**: Same as Intelligence Panel
- **Visual treatment**: Slides up from bottom, ~50% screen height (expandable to ~85% via drag), ink-900 bg, --r-lg top corners, drag handle (36pt x 4pt, white at 20%, centered, 12pt from top). Canvas behind dims to 40% opacity and locks camera on the focused node while the sheet is open.
- **Content**: Identical structure to the Intelligence Panel content list above, laid out for a narrower column.
- **Variants**: Same as Intelligence Panel, plus Peek (initial ~50% height, shows domain badge + title + summary + primary actions) and Expanded (drag up to ~85%, reveals full source list)
- **Gestures**: Drag handle up/down to resize between Peek and Expanded. Drag down past a velocity/distance threshold, or tap the dimmed canvas outside the sheet, to dismiss (canvas returns to 100% opacity, camera free again).
- **Size**: Full-width x ~50% screen height (Peek) to ~85% (Expanded)

### Zoom Control Cluster
- **Purpose**: An explicit, discoverable alternative to pinch/scroll-wheel zoom — accessibility and desktop-precision affordance for users who prefer buttons over gestures.
- **Data source**: View state (local camera scale)
- **Visual treatment**: Small vertical glass control stack, bottom-right of canvas (above the timeline scrubber's right edge), ink-brown-800 at 70% + blur, --r-lg corners, 1pt white-at-8% border, `--shadow-1`. Three stacked 36pt buttons: "+" (zoom in), current zoom percentage readout (e.g. "120%", non-interactive, 11pt Cabinet Grotesk SemiBold, white at 60%), "−" (zoom out). A fourth button below a 1pt divider: a small "recenter" compass-style icon (resets camera to default framing, same effect as double-tapping empty canvas).
- **Content**: "+", zoom %, "−", recenter icon
- **Variants**: Default, Min zoom reached ("−" disabled, 30% opacity), Max zoom reached ("+" disabled, 30% opacity)
- **Gestures**: Tap "+"/"−" → step zoom by 0.2x increments, animated 160ms ease-out-soft. Tap recenter → same as double-tap empty canvas (520ms ease-flow reset).
- **Size**: 40pt wide x 160pt tall (4 stacked controls)

### Node Context Menu (Long-Press)
- **Purpose**: Surface secondary node actions (pin, copy title, hide) without cluttering the Intelligence Panel's primary action set.
- **Data source**: Selected node's current state (pinned/unpinned, hidden/visible)
- **Visual treatment**: Small glass popover, anchored to the node's screen position, ink-brown-800 at 90% + blur, --r-md corners, 1pt white-at-10% border, `--shadow-2`. Appears after a long-press (500ms) that does not initiate a drag (a long-press that moves beyond a 4pt threshold is treated as a drag instead, per standard touch disambiguation).
- **Content**: Three rows, each 40pt tall, 12pt padding: "pin node" / "unpin node" (icon toggles, 13pt Cabinet Grotesk SemiBold white), "copy title" (13pt Cabinet Grotesk SemiBold white), "hide from graph" (13pt Cabinet Grotesk SemiBold, white at 60% — a soft-hide that can be restored via the domain filter reset, not a destructive delete)
- **Variants**: Page node (all three actions), Domain hub node ("view chapter" instead of pin/hide — hubs cannot be pinned or hidden), SIA Core (no context menu — core is immutable)
- **Gestures**: Tap a row → executes action, popover dismisses. Tap outside popover → dismiss without action.
- **Size**: 160pt wide x ~120pt tall (auto per row count)

### New Connection Toast
- **Purpose**: A light, non-blocking notification when SIA discovers a new connection while the user is actively viewing the graph (e.g., a background sync completes mid-session) — reinforces the "living" framing without interrupting exploration.
- **Data source**: Realtime — WebSocket event on the user's channel when a new edge/node is written to the graph during an active session
- **Visual treatment**: Small glass toast, top-center, slides down from above the header, ink-brown-800 at 85% + blur, --r-pill, 1pt white-at-8% border, `--shadow-2`, 8pt vertical / 16pt horizontal padding.
- **Content**: Royal-purple dot (6pt, pulsing once) + "SIA just connected 2 new pages" — 13pt Switzer Medium, white. Auto-dismisses after 4s, or tap to jump directly (click-to-focus camera pan to the new connection).
- **Variants**: Single new node, Multiple new connections, New contradiction detected (uses orange dot instead of purple, copy: "SIA flagged a contradiction")
- **Gestures**: Tap → click-to-focus on the new node/edge. Swipe up → dismiss early. Auto-dismiss after 4s if untouched.
- **Size**: Auto-width (~280pt max) x 36pt

### Graph Loading Skeleton
- **Purpose**: Loading state for the initial `GET /api/v1/wiki/graph` fetch — the canvas should never show a hard blank frame.
- **Data source**: Loading state (pre-payload)
- **Visual treatment**: SIA Core Node renders immediately at a dimmed 40% opacity with a slow, non-breathing shimmer (no full pulse until real data confirms the graph structure). No hub/page nodes render yet. A thin circular progress indicator (24pt, royal-purple at 60%, indeterminate spin) sits just below the dimmed core.
- **Content**: Caption below the spinner: "waking up your graph..." — 13pt Switzer Regular, white at 50%.
- **Variants**: Initial load (as described), Slow load (past 4s — caption changes to "still loading — your graph is growing fast" to reframe latency as a positive signal rather than an error)
- **Gestures**: None (non-interactive during load; search/filter/timeline chrome is hidden until load completes)
- **Size**: Full canvas viewport

### Reduced-Motion Fallback
- **Purpose**: Respect `prefers-reduced-motion` — the graph remains fully functional and legible without any of its signature motion.
- **Visual treatment**: Layout is computed once and rendered **static** — no continuous `requestAnimationFrame` idle loop. Specifically:
  - SIA Core breathing pulse → replaced with a static glow at a fixed 60% intensity (no scale/opacity oscillation)
  - Orbiting memory particles → rendered as static dots at their current position (no rotation)
  - Traveling energy-pulse particles on edges → removed entirely; the strongest ~30% of edges instead render at a fixed higher opacity (55%) to preserve the "important connection" signal without motion
  - Pan/zoom → camera moves apply instantly (no eased transition) rather than smoothly animating; click-to-focus snaps to the target framing in one frame
  - Node drag spring-back → snaps to rest position instantly rather than a damped spring animation
  - Count-up stat chip → renders final numbers immediately, no counting animation
  - All hover/press micro-interactions (illumination, scale-on-select) remain, since those are direct manipulation feedback rather than ambient motion, but transition instantly rather than easing
- **Gestures**: Identical to the standard graph — reduced motion changes only the rendering, never the interaction model.

---

## Typography

| Element | Font | Weight | Size | Line Height | Color | Notes |
|---------|------|--------|------|-------------|-------|-------|
| Wiki header title | Cabinet Grotesk | 700 (Bold) | 17pt | 22pt | White #FFFFFF | "Book of Life" |
| Sub-tab label (active) | Cabinet Grotesk | 600 (SemiBold) | 13pt | 18pt | White #FFFFFF | "Graph" active pill |
| Sub-tab label (inactive) | Cabinet Grotesk | 600 (SemiBold) | 13pt | 18pt | White at 50% | Knowledge / Documents / Trends |
| Stat chip text | Cabinet Grotesk | 600 (SemiBold) | 13pt | 18pt | White #FFFFFF | "47 pages · 128 connections" |
| Search placeholder | Switzer | 400 (Regular) | 14pt | 18pt | White at 40% | "search the graph..." |
| Search input text | Switzer | 500 (Medium) | 14pt | 18pt | White #FFFFFF | User query |
| Domain filter chip | Cabinet Grotesk | 600 (SemiBold) | 12pt | 16pt | White #FFFFFF | Domain name |
| SIA core caption | Cabinet Grotesk | 600 (SemiBold) | 11pt | 14pt | White #FFFFFF | "SIA · your coach" |
| Domain hub label | Cabinet Grotesk | 600 (SemiBold) | 13pt | 18pt | White #FFFFFF | "Patterns (12)" |
| Page node label | Switzer | 500 (Medium) | 12pt | 16pt | White #FFFFFF | Truncated title |
| Timeline range label | Cabinet Grotesk | 600 (SemiBold) | 12pt | 16pt | White #FFFFFF | "Jan 2026 → Jul 2026" |
| Timeline tick labels | Switzer | 400 (Regular) | 11pt | 14pt | White at 30% | Month markers |
| Panel domain badge | Cabinet Grotesk | 600 (SemiBold) | 11pt | 14pt | Domain color | Inside pill |
| Panel page title | Cabinet Grotesk | 700 (Bold) | 20pt | 26pt | White #FFFFFF | Node title |
| Panel summary | Switzer | 400 (Regular) | 14pt | 21pt | White at 80% | Entry content |
| Panel evidence line | Switzer | 500 (Medium) | 13pt | 18pt | White at 60% | "3 sources · high confidence" |
| Panel source row | Switzer | 400 (Regular) | 12pt | 16pt | White at 50% | Source label + date |
| Panel contradiction callout | Cabinet Grotesk | 600 (SemiBold) | 12pt | 16pt | #FF5E00 | "⚠ contradicted by..." |
| Panel stale callout | Switzer | 400 (Regular) | 12pt | 16pt | White at 40% | "not referenced in 62 days" |
| Panel "open page" link | Cabinet Grotesk | 600 (SemiBold) | 14pt | 18pt | #FF5E00 | Navigational CTA |
| Panel "ask SIA" link | Cabinet Grotesk | 600 (SemiBold) | 14pt | 18pt | #7F24FF | AI CTA |
| Empty state title | Cabinet Grotesk | 700 (Bold) | 17pt | 22pt | White #FFFFFF | "your brain is still forming" |
| Empty state body | Switzer | 400 (Regular) | 14pt | 21pt | White at 55% | Explanation copy |
| Zoom % readout | Cabinet Grotesk | 600 (SemiBold) | 11pt | 14pt | White at 60% | "120%" |
| Context menu row | Cabinet Grotesk | 600 (SemiBold) | 13pt | 18pt | White #FFFFFF | "pin node", "copy title" |
| Context menu row (soft action) | Cabinet Grotesk | 600 (SemiBold) | 13pt | 18pt | White at 60% | "hide from graph" |
| New Connection toast | Switzer | 500 (Medium) | 13pt | 18pt | White #FFFFFF | "SIA just connected..." |
| Loading skeleton caption | Switzer | 400 (Regular) | 13pt | 18pt | White at 50% | "waking up your graph..." |
| Isolated chip checkmark label | Cabinet Grotesk | 600 (SemiBold) | 11pt | 14pt | #7F24FF | "✓ isolated" |
| Load-failure title | Cabinet Grotesk | 600 (SemiBold) | 16pt | 22pt | White #FFFFFF | "couldn't load your graph" |
| Load-failure body | Switzer | 400 (Regular) | 14pt | 20pt | White at 55% | "check your connection..." |
| Retry CTA | Cabinet Grotesk | 600 (SemiBold) | 15pt | 20pt | White #FFFFFF (on orange fill) | "retry" pill button |

---

## Composition & Visual Hierarchy

**Squint test**:
- The SIA Core Node's purple breathing glow is the single brightest, most saturated point on the entire screen — the eye lands there first and it reads immediately as "alive"
- Domain hub nodes form a clear ring around the core, color-coded enough to scan "which life areas are represented" at a glance without reading labels
- Page nodes fade into a soft field of smaller colored dots — individually unremarkable until hovered/searched, collectively communicating "there's a lot here"
- Neural pathways stay dim at rest (35% max opacity) so they read as texture/atmosphere, not competing lines — only the traveling pulses catch the eye, and only on the strongest ~30% of connections
- Glass chrome overlays (search, stats, filters) float clearly above the canvas without ever boxing it into a "dashboard" feel — generous transparency keeps the graph as the dominant visual layer
- The Intelligence Panel, when open, is the only fully-opaque rectangular surface on the screen — its solidity is intentional, marking a shift from "exploring" to "reading"
- No element on this screen is a straight-edged rectangle competing with the organic curves of the graph except the Intelligence Panel and glass chips — even those keep the --r-xl/--r-pill soft-radius language so nothing reads as a hard technical instrument panel bolted onto a living visualization
- At rest (no selection, no search, default zoom) the composition is symmetric-ish but not rigid — hub nodes ring the core at slightly uneven angles (driven by actual chapter page-counts, not a perfect geometric circle) so the graph reads as grown, not templated

**Spacing breakdown (8pt grid)**:
- Wiki header height: 44pt
- Sub-tab bar height: 40pt
- Header/sub-tabs to canvas: 0pt (canvas is full-bleed immediately below chrome)
- Search bar / stat chip inset from top edge of canvas: 16pt (--s-4)
- Search bar to filter chip row: 8pt (--s-2)
- Filter chip row leading/trailing inset: 16pt (--s-4)
- Timeline scrubber inset from bottom edge (above tab bar): 16pt (--s-4)
- Intelligence Panel internal padding: 24pt (--s-5)
- Between panel content blocks (badge → title → summary → evidence → sources): 8pt (--s-2)
- Bottom sheet internal padding: 24pt (--s-5), drag handle 12pt from top
- Canvas to tab bar: 0pt (canvas fills to tab bar edge)
- Tab bar: 56pt + 34pt safe area

**Z-layers**:
- z-0: ink-900 background (bleeds through canvas voids)
- z-5: Neural pathways (edges) + particles
- z-10: Domain hub nodes, wiki page nodes
- z-15: SIA Core Node (always renders on top of overlapping nodes/edges)
- z-20: Node labels (rendered as canvas text, always above their node)
- z-25: Glass Chrome Overlay (search bar, stat chip, filter legend) — floats above canvas
- z-30: Wiki header, sub-tab bar (backdrop-blur on any scroll, though canvas itself doesn't scroll)
- z-35: Timeline Scrubber
- z-40: Tab bar
- z-50: Intelligence Panel (desktop) / Bottom Sheet (mobile)
- z-60: Any confirmation/error toast (e.g., graph load failure retry)

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Canvas void |
| Canvas vignette | rgba(127,36,255,0.06) | royal-purple, faint | Radial, center-out |
| SIA Core fill | #7F24FF at 85% | royal-purple | Dominant node |
| SIA Core glow | rgba(127,36,255,0.40) | `--glow-purple` | Breathing pulse |
| Chrome overlay bg | #211008 at 70% + blur | ink-brown-800 | Glass panels |
| Chrome overlay border | white at 8% | — | Glass edge |
| Stat chip / search text | #FFFFFF | white | Primary |
| Search focus indicator | #FF5E00 | orange (primary) | Path-trace highlight base |
| Path-trace highlight | #7F24FF | royal-purple | Search result path |
| Domain: Fitness | #EF4444 | fitness-red | Hub + page nodes |
| Domain: Nutrition | #84CC16 | nutrition-lime | Hub + page nodes |
| Domain: Finance | #10B981 | finance-emerald | Hub + page nodes |
| Domain: Career | #6366F1 | career-indigo | Hub + page nodes |
| Domain: Relationships | #EC4899 | relationships-pink | Hub + page nodes |
| Domain: Spirituality | #A855F7 | spirituality-purple | Hub + page nodes |
| Domain: Learning | #06B6D4 | learning-cyan | Hub + page nodes |
| Domain: Creativity | #F59E0B | creativity-amber | Hub + page nodes |
| Domain: Wellbeing | #14B8A6 | wellbeing-teal | Hub + page nodes |
| Contradicted status ring | #FF5E00 at 70% | orange (primary) | Pulsing ring |
| Stale status ring | white at 30% | — | Dashed ring |
| Correlation node inner glow | #7F24FF at 20% | royal-purple | SIA-synthesized marker |
| Neural pathway (ambient) | domain-to-domain gradient at 35% | — | Rest state |
| Neural pathway (illuminated) | domain-to-domain gradient at 90% | — | Hover/select |
| Energy-pulse particle | white core + domain-color halo | — | Traveling dot |
| Timeline track fill | #7F24FF at 25% | royal-purple | Active range |
| Timeline handle | #7F24FF | royal-purple | Draggable |
| Confidence: high | #34A853 at 15% bg, text | forest-green | Panel badge |
| Confidence: medium | #FF5E00 at 15% bg, text | orange (primary) | Panel badge |
| Confidence: low | white at 10% bg, 40% text | — | Panel badge |
| Panel "open page" link | #FF5E00 | orange (primary) | Navigational |
| Panel "ask SIA" link | #7F24FF | royal-purple | AI action |
| Zoom control bg | #211008 at 70% + blur | ink-brown-800 | Glass |
| Zoom control disabled | white at 30% | — | Min/max reached |
| Context menu bg | #211008 at 90% + blur | ink-brown-800 | Glass popover |
| Context menu destructive-adjacent ("hide") | white at 60% | — | Soft, non-destructive |
| New Connection toast dot (normal) | #7F24FF | royal-purple | New link found |
| New Connection toast dot (contradiction) | #FF5E00 | orange (primary) | New conflict found |
| Loading skeleton core | #7F24FF at 40% | royal-purple | Dimmed pre-data |
| Loading spinner | #7F24FF at 60% | royal-purple | Indeterminate |
| Isolated chip glow | #7F24FF | royal-purple | Long-press isolate |
| Load-failure core outline | white at 20% | — | Static, unglowing |
| Retry button bg | #FF5E00 | orange (primary) | Error recovery CTA |
| Primary text | #FFFFFF | white | Titles |
| Secondary text | white at 60-80% | — | Summaries |
| Tertiary text | white at 40-50% | — | Meta, sources |

**60/30/10 verification**: This is a **Register exception by design**, matching the precedent of Screen [48] Intelligence Dashboard: because the entire surface *is* SIA's own space (its memory, rendered as its brain), royal-purple is the primary visual driver here rather than the usual 10% accent role — the SIA Core, path-tracing, timeline, correlation glow, and "ask SIA" action all use purple deliberately. Domain colors (9 total) are identification-only across hub/page nodes and never appear on CTAs or chrome — they exist purely to answer "which life area is this." Orange appears only on the search focus state, contradiction status rings, and the "open page" navigational link — a clearly secondary role here, inverted from its usual 60% dominance elsewhere in the app. Green is confined to the high-confidence badge in the Intelligence Panel. This inversion is intentional and scoped to this single screen (and Screen [48]) — it does not change the app-wide 60/30/10 system.

---

## Interaction States

### Wiki Page Node
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Domain color at 55%, orbiting particles at normal speed | — |
| Hover (desktop) | Node scales to 1.15x, connected edges illuminate, unconnected fade to 20% | — |
| Pressed | Scale(0.95), brief flash to 80% opacity | Light impact |
| Selected | Scale(1.3x), white focus ring (2pt, offset 3pt), connected edges at 100% | Medium impact |
| Focus-visible (keyboard) | 2pt orange ring, offset 3pt | — |
| Dragging | Node follows pointer/finger, connected edges stretch live | Light impact (on pickup) |
| Drag released (unpinned) | Spring-back animation to rest position, ~600ms | Light impact (on settle) |
| Pinned | Small pin icon overlay, no spring-back on future drags | Medium impact (on pin) |
| Loading (graph fetch) | Node rendered as a pulsing gray placeholder circle | — |

### SIA Core Node
| State | Visual | Haptic |
|-------|--------|--------|
| Idle (default) | Breathing pulse, ~3.2s cycle | — |
| Active-thinking | Pulse speeds to ~1.6s cycle for ~2s (new nodes just synced) | Light impact (on trigger) |
| Hover (desktop) | Glow brightens 20%, all hub spokes illuminate | — |
| Selected | Info card opens, glow holds at brightened state | Medium impact |
| Reduced-motion | Static glow, 60% intensity, no pulse | — |

### Domain Filter Chip
| State | Visual | Haptic |
|-------|--------|--------|
| Active (all selected, default) | Full opacity, saturated dot | — |
| Pressed | Scale(0.95), brief bg flash | Light impact |
| Deselected | 40% opacity, desaturated dot | Light impact (on toggle) |
| Isolated (long-press) | This chip full opacity + glow ring, all others auto-deselect | Medium impact |

### Instant Search Bar
| State | Visual | Haptic |
|-------|--------|--------|
| Empty (idle) | Placeholder visible, magnifying icon at 40% | — |
| Focused | Border brightens to white at 20%, cursor visible | — |
| Typing | Live filter + path-trace animate on canvas | — |
| No results | "no pages match" caption below bar, all nodes at 15% | — |
| Cleared | X fades out, full graph restored, count-up replays on stat chip | Light impact |

### Timeline Scrubber Handle
| State | Visual | Haptic |
|-------|--------|--------|
| Default | 12pt circle, royal-purple, white ring | — |
| Dragging | Enlarges to 16pt, live range label follows | Light impact (continuous tick every ~10% of track) |
| Released | Settles to final position, canvas filter applies | Light impact |
| Focus-visible (keyboard) | 2pt orange ring, arrow keys nudge by 1 day | — |

### Intelligence Panel / Bottom Sheet
| State | Visual | Haptic |
|-------|--------|--------|
| Opening | Slides in from right (desktop) / up from bottom (mobile) | Light impact |
| Loaded | Full content visible | — |
| Loading (source list lazy-fetch) | Title/summary visible immediately, source rows skeleton-shimmer | — |
| Error (source fetch failed) | Source list area shows "couldn't load sources" + retry link, rest of panel intact | Error notification |
| Closing | Slides out to right / down, canvas camera unlocks and returns to full opacity | Light impact |

### Zoom Control Cluster
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Both +/− enabled, zoom % readout live | — |
| Pressed (+/−) | Scale(0.9), brief bg flash | Light impact |
| Min zoom reached | "−" at 30% opacity, disabled | — |
| Max zoom reached | "+" at 30% opacity, disabled | — |
| Recenter pressed | Icon scale(0.9), triggers camera reset | Medium impact |
| Focus-visible | 2pt orange ring per button | — |

### Node Context Menu
| State | Visual | Haptic |
|-------|--------|--------|
| Appearing | Fades in + scales from 0.9→1.0, anchored to node | Medium impact (on long-press trigger) |
| Row pressed | Row bg white at 8% flash | Light impact |
| Dismissing (outside tap) | Fades out, scales to 0.95 | — |
| Action confirmed (pin/hide) | Popover closes, node updates visual state immediately | Light impact |

### New Connection Toast
| State | Visual | Haptic |
|-------|--------|--------|
| Appearing | Slides down from above header, dot pulses once | Light impact |
| Idle (visible) | Static, dot at rest | — |
| Tapped | Toast dismisses, camera click-to-focuses on new node/edge | Medium impact |
| Auto-dismissing | Fades out + slides up after 4s | — |
| Swiped up | Dismisses immediately | Light impact |

---

## Gesture Map

| Gesture | Target | Action |
|---------|--------|--------|
| Drag (one-finger / click-drag) | Canvas empty space | Pan camera |
| Pinch / scroll-wheel / trackpad-pinch | Canvas | Zoom camera (0.4x–3.0x clamp) |
| Tap/click | Wiki page node | Click-to-focus + open Intelligence Panel / Bottom Sheet |
| Tap/click | Domain hub node | Focus hub + children, open compact hub panel |
| Tap/click | SIA Core node | Open compact SIA info card |
| Hover (desktop only) | Any node | Illuminate connected edges, dim unconnected |
| Long-press / click-drag | Wiki page node | Move node (spring-back on release unless pinned) |
| Double-tap | Wiki page node | Pin node in place (stops spring-back) |
| Double-tap | Canvas empty space | Reset camera to default full-graph framing |
| Tap | Search bar | Focus + keyboard |
| Type | Search bar | Live filter + path-trace highlight |
| Tap | Search clear (X) | Clear query, restore full graph |
| Tap | Domain filter chip | Toggle that domain's visibility |
| Long-press | Domain filter chip | Isolate that domain only |
| Drag | Timeline handle | Adjust date range filter |
| Tap | Timeline track (off-handle) | Snap nearest handle to tapped point |
| Double-tap | Timeline bar | Reset to full date range |
| Tap | "open page" link (panel) | Tab switch to Knowledge [20], scroll to entry |
| Tap | "ask SIA about this" link (panel) | Tab switch to SIA Chat [09] with node context |
| Tap | Panel close (×) / dimmed canvas outside sheet | Deselect node, close panel/sheet |
| Drag | Bottom sheet handle | Resize between Peek and Expanded |
| Drag down (past threshold) | Bottom sheet | Dismiss sheet |
| Tap | Sub-tab (Knowledge/Documents/Trends) | Switch Wiki sub-view (in-place) |
| Tap | Back button | Pop Wiki module stack to Me Main [17] |
| Swipe right from edge | Screen | iOS back gesture |
| Tap | Zoom "+" / "−" | Step zoom by 0.2x |
| Tap | Recenter icon | Reset camera to default framing |
| Long-press (500ms, no drag) | Node | Open Node Context Menu |
| Tap | Context menu row | Execute action (pin / copy title / hide / view chapter) |
| Tap | Outside context menu | Dismiss without action |
| Tap | New Connection Toast | Click-to-focus on the new node/edge |
| Swipe up | New Connection Toast | Dismiss early |
| Tap | Retry (load-failure state) | Re-fetch `GET /api/v1/wiki/graph` |

### Keyboard Navigation (desktop, accessibility)

A canvas-rendered graph has no native DOM nodes for a screen reader or keyboard user to land on, so the Neural Graph Canvas maintains a parallel, visually-hidden, focusable node list (`role="listbox"`, one `role="option"` per node) synced 1:1 with the canvas render. This is the accessible path through the same data, not a second experience.

| Key | Target | Action |
|-----|--------|--------|
| Tab | Screen | Moves focus into the graph's hidden node list, starting at SIA Core |
| Arrow keys | Focused node in hidden list | Moves focus to the nearest connected node in that direction (up/down/left/right relative to canvas layout position) |
| Enter / Space | Focused node | Same as tap/click — click-to-focus camera + opens Intelligence Panel |
| Escape | Open panel/sheet/menu | Closes it, returns focus to the triggering node |
| `+` / `-` | Screen (graph focused) | Zoom in/out (same as Zoom Control Cluster) |
| `/` | Screen | Focuses the Instant Search Bar |
| Arrow keys (on Timeline handle, focused) | Timeline Scrubber | Nudges the focused handle by 1 day per press, 7 days with Shift held |

Each node's accessible label (read by screen readers via the hidden list, and used as the visible label at high zoom) follows the pattern: "[title], [domain] domain, [evidence count] sources[, contradicted / stale if applicable]" — e.g. "Morning person, fitness domain, 3 sources, high confidence." The SIA Core's accessible label is static: "SIA, your coach — the center of your knowledge graph, 47 pages across 6 domains" (count is live-updated). Focus-visible rings (2pt orange, per the app-wide focus-ring token) render on the canvas at the focused node's screen position, keeping visual and keyboard focus in sync even though the underlying element is off-screen.

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| SIA Core breathing pulse | Idle (continuous) | Glow radius + opacity oscillate (scale 1.0→1.12→1.0, glow 30%→45%→30%) | 3200ms loop | ease-in-out |
| SIA Core active-thinking | New nodes synced | Pulse cycle speeds to 1600ms for ~2 cycles, then returns to idle rate | 1600ms x2 | ease-in-out |
| Memory particle orbit | Idle (continuous) | Particles rotate around parent node at fixed radius | Continuous, ~6-12s per revolution (varies by node) | linear |
| Energy-pulse particle travel | Continuous (top ~30% edges) | Dot travels source→target along bezier path, loops | ~1500ms per traversal | linear |
| Graph initial layout | Mount | Nodes fade in + scale from 0.6→1.0, staggered outward from SIA core (core first, hubs at 80ms, pages at 160-400ms staggered by hub) | 280ms each | ease-out-soft |
| Stat chip count-up | Mount / filter change | Numbers animate 0→final value | 800ms | ease-out-soft |
| Camera pan (drag) | User drag | Direct 1:1 follow, no easing (matches finger/cursor) | Instant | linear |
| Camera pan (click-to-focus) | Node tap | Smooth pan + zoom to frame node + neighbors | 520ms | ease-flow |
| Camera reset | Double-tap empty canvas | Smooth pan + zoom back to default full-graph framing | 520ms | ease-flow |
| Node hover illumination | Hover enter/exit | Connected edges opacity 35%→90%, unconnected nodes/edges 100%→20% | 160ms | ease-out-soft |
| Node select scale | Tap/click | Node scales 1.0→1.3x, focus ring fades in | 280ms | ease-out-soft |
| Node drag spring-back | Drag release (unpinned) | Critically-damped spring to rest position | ~600ms settle | spring (damping ~0.85) |
| Domain filter toggle | Chip tap | Matched nodes/edges fade 100%↔15% opacity | 280ms | ease-out-soft |
| Search path-trace | Query typed | Path edges animate dash-offset (flowing-line effect) + fade in | 280ms fade-in, continuous flow while active | ease-out-soft (fade), linear (flow) |
| Timeline range filter | Handle drag/release | Out-of-range nodes fade to 10% opacity | 160ms (debounced during drag), 280ms on release | ease-out-soft |
| Intelligence Panel | Node selected | Slides in from right edge | 280ms | ease-out-soft |
| Intelligence Panel | Deselected/closed | Slides out to right edge | 280ms | ease-out-soft |
| Bottom Sheet | Node selected (mobile) | Slides up from bottom + canvas dims to 40% | 280ms | ease-out-soft |
| Bottom Sheet | Dismissed | Slides down + canvas returns to 100% opacity | 280ms | ease-out-soft |
| Contradiction status ring | Idle (continuous, contradicted nodes only) | Ring opacity pulses 50%→90%→50% | 1800ms loop | ease-in-out |
| Domain isolate (long-press chip) | Chip long-press | Isolated chip glows + scales 1.1x, all other domains fade on canvas | 280ms | ease-out-soft |
| Zoom step | Zoom control tap | Camera scale animates to new step value | 160ms | ease-out-soft |
| Node Context Menu | Long-press trigger | Popover scales 0.9→1.0 + fades in, anchored to node position | 200ms | ease-out-soft |
| New Connection Toast | Realtime event | Slides down from above header, dot pulses once on arrival | 280ms | ease-out-soft |
| New Connection Toast auto-dismiss | 4s elapsed | Fades out + slides up | 240ms | ease-out-soft |
| Loading skeleton core | Mount (pre-data) | Slow shimmer sweep across dimmed core | 1600ms loop | linear |
| Load-failure retry | Tap retry | Core outline briefly flashes white before re-fetch begins | 160ms | ease-out-soft |

**Screen transition**:
- **Enter (sub-tab switch from Knowledge)**: Crossfade, 280ms (--dur-base), canvas mounts and runs initial layout animation
- **Exit (sub-tab switch away)**: Crossfade out, 160ms — canvas `requestAnimationFrame` loop pauses when off-screen to conserve battery/CPU

**Reduced-motion overrides**: breathing pulse, memory particle orbit, energy-pulse travel, camera pan/zoom easing, node spring-back, and count-up are all disabled or made instant per the Reduced-Motion Fallback component above. Illumination, selection scale, and panel slide-in/out remain (direct feedback, not ambient motion) but transition instantly rather than easing.

---

## Empty States

### Day 1 (new user, sparse wiki)
- SIA Core Node renders alone at center, full breathing pulse — establishing "this will grow" even with nothing around it yet.
- Domain hub nodes render for chapters that already have onboarding-seeded entries (typically "About You" only), each with 1-3 tiny page nodes.
- Empty chapters render as dim, dashed-ring hub nodes with no children (per the Domain Hub Node "Empty chapter" variant).
- Centered caption below the core (appears once, doesn't repeat): "your brain is still forming" — 17pt Cabinet Grotesk Bold, white. Below: "as you talk with SIA, this graph will grow — more pages, more connections, more of you." — 14pt Switzer Regular, white at 55%, center-aligned, max 2 lines.
- Stat chip shows honest low counts: "3 pages · 0 connections" (count-up still plays, just to small numbers).
- Timeline Scrubber is hidden entirely (no meaningful date range with <7 days of history).

### Sparse graph, no connections yet (some pages, zero edges)
- Nodes render normally around their domain hubs, but no neural pathways exist between them — the graph reads as disconnected clusters.
- A subtle inline caption near the stat chip: "SIA hasn't found connections between these yet — check back after a week or two." No CTA (growth is automatic, matches the tone established on Screen [20]'s empty Correlations chapter).

### Search with no results
- All nodes dim to 15% opacity, no path-trace. Centered caption near the search bar: "no pages match '[query]'" — 14pt Switzer Regular, white at 40%.

### Graph load failure (API error)
- Canvas area shows a centered state (not a blank void): SIA Core rendered in a static, unglowing gray outline (16pt line weight, white at 20%), no other nodes. Caption: "couldn't load your graph" — 16pt Cabinet Grotesk SemiBold, white. Below: "check your connection and try again." — 14pt Switzer Regular, white at 55%. "retry" button: orange pill CTA, 44pt height, centered below caption.
- Search bar, filter legend, and timeline scrubber are hidden until the graph successfully loads (there is nothing to search/filter/scrub).

### Offline
- Same treatment as Graph load failure, with copy adjusted: "SIA needs a connection to show your graph." (14pt Switzer Regular, white at 55%). Stat chip and header remain visible but static.

### Single domain, zero pages after filter (edge case)
- If a user isolates a domain via long-press and that domain currently has 0 pages (rare — only possible if a domain hub exists in the taxonomy but no entries have been written to it yet), the canvas shows just the SIA Core and that domain's empty, dashed-ring hub floating alone, with a caption near the stat chip: "nothing here yet in [domain] — talk with SIA about it and this will start filling in." The isolate auto-releases after 3s of no interaction, restoring the full graph, so the user isn't stuck staring at an empty isolate.

### Very large graph (established power user, 300+ nodes)
- The single-payload fetch model holds up to roughly 300-400 nodes comfortably on mid-tier mobile hardware; beyond that, the initial layout animation (per-node staggered fade-in) is capped to only animate the first ~120 nodes individually — the remainder fade in as a single batched group to avoid a multi-second stagger tail. Camera default framing on load zooms out further (down to ~0.6x) so the full graph is visible at once rather than clipped, with the Zoom Control Cluster's "recenter" becoming the primary way back to that framing after exploring.
- Node labels are hidden by default at this density even at zoom levels that would normally show them (≥1.2x threshold shifts to ≥1.8x) to prevent label overlap soup — search and hover remain the primary ways to identify a specific node.

---

## Motivation Adaptation

- **Low motivation**: Initial layout animation is gentler and faster (staggered fade-in compresses to ~600ms total instead of full outward cascade) to avoid feeling like "one more thing to sit through." Empty-chapter messaging leans encouraging rather than data-forward: caption emphasizes "this grows the more you talk with SIA" over specific counts. Contradiction status rings are visually softened (lower pulse amplitude) to reduce anything that reads as an alert or a task.
- **Medium motivation**: Standard experience as described throughout this document.
- **All tiers**: The core framing ("SIA's living memory of you") never changes across motivation tiers — only density, pacing, and emphasis shift. The graph is never gated behind a motivation threshold; it is always fully explorable regardless of engagement level, since it functions as a trust-building surface as much as an engagement one.
- **High motivation**: Stat chip includes a secondary line on tap: growth-over-time context ("+8 pages this month · 3 new connections this week"). Timeline Scrubber gets a "compare" affordance (drag both handles independently to compare two snapshots side-by-side, rendered as a brief ghost-overlay of the earlier state at 30% opacity). Search bar surfaces a "trending connections" suggestion chip row below it when idle (SIA's most novel recent correlations, tappable to jump straight to that node). Panel's evidence section expands by default (no "show more" truncation on summaries).

---

## Cross-References

- **Navigates to**: Knowledge tab [20] via "open page" panel link (in-place tab switch with entry pre-scrolled), SIA Chat [09] via "ask SIA about this" panel link (tab switch with node context), Documents / Trends sub-tabs (in-place tab switch)
- **Navigates from**: Personal Wiki [20] via "Graph" sub-tab tap (in-place, no stack push)
- **Shared components with**: Screen [20] — Personal Wiki (Confidence Badge pattern, source-type icons, chapter/domain taxonomy, "book of life" framing), Screen [48] — Intelligence Dashboard (royal-purple-as-primary Register exception, Contradiction visual language, glow token usage), Screen [17] — Me Main (back navigation target)
- **Patterns used**: Back Button, Sub-tab Bar (extended from Screen [20]'s Chapter Tabs concept), Search Bar (Screen [18]/[20] pattern, adapted to instant client-side filtering), Bottom Sheet / Modal Presentation (Batch 1), Confidence Badge (Screen [20]), Glow Tokens `--glow-purple` (Design Tokens), Bottom Tab Bar
- **Patterns established**: **Neural Graph Canvas** (hand-rolled Canvas 2D `requestAnimationFrame` renderer, 3-tier hierarchical layout, pan/zoom/hover/drag with spring-back), **SIA Core Node** (breathing-pulse root node, always-present identity anchor), **Domain Hub Node** (mid-tier cluster anchor, chapter-to-domain color mapping), **Wiki Page Node** (evidence-sized leaf node with orbiting memory particles + status rings), **Neural Pathway** (bezier edge with traveling energy-pulse particle, illumination on hover), **Glass Chrome Overlay** (floating, non-boxing search/stat/filter chrome over a full-bleed canvas), **Instant Search with Path-Tracing Highlight** (client-side search that visually traces the SIA-core-to-node path), **Timeline Scrubber** (dual-handle date-range filter for a graph/network view), **Click-to-Focus Camera** (tap a node → smooth pan/zoom framing), **Zoom Control Cluster** (explicit +/−/recenter buttons as a gesture-alternative), **Node Context Menu** (long-press popover for secondary node actions: pin/copy/hide), **New Connection Toast** (realtime, non-blocking "SIA just connected..." notification), **Graph Loading Skeleton** (dimmed, non-breathing core + indeterminate spinner for a canvas-based visualization's pre-data state), **Reduced-Motion Graph Fallback** (static-layout, no-particle, instant-transition variant of a living-graph visualization) — this last pattern should be reused by any future canvas-based data visualization in the app.

**Note on screen numbering**: this file is authored as Screen 68 of 69 per the current design-system expansion plan; `_progress.md` reflects the state through Screen 63 as of the last full-batch update (2026-05-21). Screens 64-67 are reserved/pending in the broader roadmap and are out of scope for this file.
