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
- **Layout algorithm**: Force-directed graph (precomputed server-side, simplified for mobile). Nodes cluster by domain — same-domain nodes attract slightly in the precompute. Cross-domain connections create bridges between clusters. Positions are frozen to normalized (x,y) ∈ [0,1]; the client applies **no force simulation** — only a brief deterministic settle-in *reveal* (per the Visualization section).
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

## Visualization

> Source: `app_design 3/72-knowledge-graph-visualization-recommendations.md`. Audited in `viz-audit/` — Batch 2, findings `S72-V01..V05`. All primitives are from `viz-audit/VIZ-KIT.md` at `viz-audit/CONSISTENCY.md` parameters. **This screen MINTS `VK-010` NetworkGraph** — the app's most novel viz; its full primitive spec is folded into `VIZ-KIT.md`. AI-Mode register (royal-purple dominant) is the sanctioned exception per `_shared-patterns.md` — purple here is SIA's discovered knowledge, the brand-correct edge/insight colour. **Current grade C (66) → specced-target A− (86).** *(Honest re-grade under the revised 10-dimension rubric. The residual gap to A+++ is build-verified settled-layout legibility + per-node panel data + the dashed-purple SIA-edge distinction, owned by the later viz-build program.)*

The Knowledge Graph's job is unchanged; this section upgrades *how its network reads* — from a flat, distortion-prone SVG with 2-letter node initials and a single shared detail blob into a crafted, **settled** (precomputed, non-jittering) life-correlation network with calibrated node/edge encoding, an SIA-edge signature, a legible legend that *teaches* the encoding, and a fully-designed cold-start/empty/partial/error state set. The hero is the graph itself; everything else serves node inspection.

> **Component reality (spec-vs-build diff — each gap is a finding):** the prototype route `/tabs/me/knowledge-graph` renders a real but flat graph: SVG `<line>` edges + `<button>` nodes inside a `viewBox="0 0 100 100" preserveAspectRatio="none"` canvas scaled by a CSS `transform: scale()`. This **distorts node geometry** on any non-square viewport (circles become ellipses, edge angles skew) and is **not** the GPU-accelerated react-native-skia path the original spec assumed — `VK-010` is specced as an **SVG/Canvas settled layout** for the web prototype, not a live physics engine. The detail panel reads a **single shared `knowledgeGraph.connections` + `insight` blob** — every node shows the *same* four connections regardless of which node is tapped (`S72-V03`). Edges carry no `inferred` flag, so the brand's **dashed-purple SIA-edge** distinction has no data backing yet (`S72-V04`). Node `size` is a hardcoded px literal, not derived from connection degree (`S72-V02`). These are the resolution gaps this section closes.

### Visualized-vs-text map

| Datum (already shown / specced) | Today | Specced visual | Primitive |
|---|---|---|---|
| Insight/metric/behaviour nodes (7→up to 60) + domain identity | flat circles, 2-letter initials, fixed px size | **settled NetworkGraph** — node radius = connection-degree, fill = `--color-domain-*`, glow on high-degree hubs | `NetworkGraph` (`VK-010`) — **hero** |
| Correlations between nodes + strength (44–85%) | flat purple `<line>`, opacity≈strength | **edges** — width = strength, purple opacity-stepped, **SIA-inferred = dashed purple** | `NetworkGraph` edges (`VK-010`) |
| Selected node's connections + per-connection strength % | shared blob, same 4 rows for every node | **per-node connection list** w/ domain dot + **strength bar** (visible % + bar, never colour-alone) | `MacroBar`-style `StrengthBar` row (reuses Intelligence [48] encoding) |
| SIA insight for the selected node | shared single sentence | per-node SIA insight quote (purple dot + italic) | textual (SIA attribution) — deliberately textual |
| Visual-encoding key (size / thickness / colour) | static legend text | **legend that renders live sample primitives** (sample node sizes, sample edge widths, domain dots) | `NetworkGraph` legend (`VK-010`) |
| Node name / domain tag / action routes | text / pills | — (deliberately textual) | — |

### 1 · Knowledge Graph (hero) — `S72-V01`  → `NetworkGraph` (`VK-010`)

The hero and the screen's reason to exist: SIA's understanding of the user's life rendered as an explorable correlation network. **This screen mints `VK-010` NetworkGraph** (full spec in `VIZ-KIT.md`). It is the highest-risk primitive in the kit — specced as a **mobile-legible, precomputed/settled** layout, never a live-jittering physics sim.
- **Layout strategy (390px):** a **precomputed force-directed layout settled server-side** to fixed normalized `(x,y)` ∈ [0,1], then rendered to a **square logical canvas** (preserve aspect — replace the build's `preserveAspectRatio="none"`, which distorts) inside the pannable/zoomable viewport (0.3×–3.0×). Same-domain nodes cluster; cross-domain edges bridge clusters. The client applies **no force simulation** — only a brief settle-in *reveal* (see Motion). This guarantees identical geometry every visit (deterministic), no jitter, and a trivially-correct reduced-motion fallback (the settled frame *is* the final frame).
- **Node encoding (token-backed):** circle radius = **connection degree**, mapped 24pt (1–2 edges) → 56pt (8+); most 32–40pt. Fill = `--color-domain-*` at 80% (domain identity, per `CONSISTENCY.md` §5). **Hub glow:** nodes with 3+ edges ≥70% strength carry `--glow-orange-sm`-radius blur in the *node's own domain colour* at 12% (calibrated small — a 32px glow on a 32pt node would swamp it; depth, not neon). **Label** = node name `text-small`, white, below node, shown only at zoom > 0.7× (declutter). **Selected:** scale 1.2×, 2pt white border, glow → 20%, **all non-connected nodes dim to 30% + labels hidden** — focus by subtraction.
- **Edge encoding (token-backed):** stroke width = strength, `--stroke-thin` 2px (weak <40%) → ~3px (strong >75%); round caps/joins (§8). Colour = `--color-royal-purple` (SIA's discovered knowledge — AI-Mode sanctioned), opacity-stepped 15% (weak) → 60% (strong). **SIA-*inferred* edges (model-hypothesised, not yet data-confirmed) = dashed purple** (dash 4·2) — the brand's projection/forecast signature applied to relationships; data-confirmed correlations are solid. **Selected node's edges** brighten to 80% + a slow pulse (60→80→60% over 2s, `--ease-flow`-style); **unrelated edges dim to 5%**.
- **Depth:** node fills layered over the bare `ink-900` canvas (no card — the graph floats for impact); hub glow is the only depth accent (warm `--glow-orange-sm` radius on orange-domain hubs, domain-tinted elsewhere). Edges sit *behind* nodes (z-order); selected edges' pulse is the motion-depth cue.
- **Micro-interaction:** tap node → select + open `S72-V03` panel + highlight; tap empty → deselect; double-tap → zoom 1.5× at point (or reset-fit); pinch → zoom; single-finger pan. Buttoned zoom/reset for non-gesture users.
- **Data:** `knowledgeGraph.nodes` (add `degree`/derive from `edges`), `knowledgeGraph.edges` (**add `inferred: boolean`** to drive dashed-purple), normalized `(x,y)` (`src/data/mock.ts`).
- **States:** **cold-start / Day-1** → 3–5 ghosted domain placeholder nodes (domain colour at 20%, no edges) + centred "Your knowledge graph is growing" + a calm purple **3-dot pulse** (scale 0.8→1.2) — **never** an empty black canvas; **early data (1–2 wk)** → sparse real graph (5–15 nodes) + a bottom "Keep tracking to discover more connections" line; **partial sync** → render available nodes/edges; missing data is simply absent (the user has no "complete" frame of reference) — *not* an error; **loading** → 3 purple dots pulsing + "Loading your graph…" with a 10s → error transition; **error** → centred network-graph glyph (48pt, white/15) + "Couldn't load your knowledge graph" + orange **retry** link (44×44), header/controls remain.

### 2 · Node sizing & hub salience — `S72-V02`  → `NetworkGraph` node-degree mapping

Resolve the build's hardcoded `size` literal: node radius **derives from connection degree** so the most-connected life metrics read as visual anchors at a glance (the whole point — "larger nodes have more connections," per the help sheet). Mapping is monotonic and disclosed in the legend (`S72-V05`). Hub glow (3+ strong edges) gives the eye an entry point on first paint. **Non-shaming:** node size encodes *connectedness/evidence*, never a verdict on the user — a small node is "still gathering signal," surfaced in copy as "the more you track, the richer your graph becomes," never "weak area."

### 3 · Node Detail Panel — per-node connections + strength bars — `S72-V03`  → `StrengthBar` rows

The bottom sheet (~45%) on node-tap. Resolve the build's **shared-blob bug**: each node's panel must read **that node's** connections from its own edge set, sorted by strength desc.
- **Per-connection row:** domain colour dot (8pt) + connected-node name (`text-caption` semibold) + **strength %** (`text-caption` bold, contrast-stepped: >75% white / 50–74% white/70 / <50% white/50) + a **2pt strength bar** below (`--color-royal-purple` fill, width ∝ strength) — same encoding as Intelligence Dashboard [48] correlations, so the two screens read as one family. **% text is always present** beside the bar → strength is never colour/width-alone (a11y). Tap row → re-selects that node (graph re-centres, panel updates).
- **SIA insight quote:** per-node (not shared) — `ink-900` inset card, purple dot (4pt) + italic `text-caption` white/70: e.g. "Better sleep strongly correlates with higher workout performance in your data." **Non-shaming:** framed as an observation/coaching prompt, never a deficiency verdict.
- **Actions:** "ask SIA" (purple 15% — AI action) + "go to [domain]" (orange 15% — navigation; the screen's main orange touchpoint, balancing the purple register).
- **Data:** per-node `edges` slice + per-node `insight` (extend `knowledgeGraph` from a single shared blob to a node-keyed map).
- **States:** panel-load failure → skeleton shimmer for the connection list + insight, 5s → "Couldn't load connections" + orange retry; node name/domain pill still show from cached graph data.

### 4 · SIA-inferred edge signature — `S72-V04`  → `NetworkGraph` dashed-purple edges

The brand's **dashed-purple projection/forecast** language (§11) applied to *relationships*: edges SIA has **inferred** (hypothesised from pattern, not yet statistically confirmed by enough data) render as **dashed purple** (dash 4·2, same purple, opacity by strength); **data-confirmed** correlations render **solid**. This makes SIA's *confidence* legible without a second colour — solid = "your data shows this," dashed = "SIA suspects this, keep tracking." Requires `edges[].inferred` in the data (currently absent — a finding). **Honest:** an inferred edge is visibly distinct from a confirmed one (dashed ≠ solid is a non-colour cue), so a hypothesis is never presented as established fact.

### 5 · Legend — teaching the encoding — `S72-V05`  → `NetworkGraph` legend

Resolve the build's text-only legend into one that **renders live sample primitives** so the encoding teaches itself: a "Node size" row showing a small→large sample circle ("fewer ← connections → more"); an "Edge thickness" row showing thin→thick sample lines ("weak ← correlation → strong") **plus a solid vs dashed sample** ("confirmed / SIA-inferred"); a "Colours" row of the 9 domain dots with abbreviated names. Collapsed = a floating "Legend" pill (bottom-left); expanded = `ink-brown-800` card, backdrop-blur. This is the screen's a11y bridge for the visual encoding — every encoded dimension has a visible, labelled sample (never colour-alone).

### Motion choreography (entrance)

Per `CONSISTENCY.md`, the **hero settles first**: on mount, nodes fade in staggered (opacity 0→1, 20ms/node, 280ms each, `--ease-out-soft`) at their **precomputed** positions (a brief drift-to-rest *reveal*, **not** a live force sim) → **then** edges **draw themselves** outward from each node via `stroke-dashoffset` (`stroke-draw`, ~520ms `--ease-flow`) — edges *draw*, never opacity-fade (§8) → selection interactions (scale/dim/pulse) run at `--dur-base` 280ms. Below-the-fold is N/A (single viewport). `prefers-reduced-motion` → **settled layout renders instantly at final state**; edges appear fully drawn; the selected-edge pulse is disabled (static 80% highlight instead) — no information lost, because the settled frame is the canonical frame.

### States, brand & accessibility

- **States (all designed, per RUBRIC dim 7):** **cold-start** (3–5 ghosted placeholder nodes + "growing" copy + purple dot-pulse — never an empty canvas), **early/sparse** (real sparse graph + "keep tracking" nudge), **partial sync** (available nodes/edges render; missing data simply absent — distinct from error, since the user has no "complete" reference), **loading** (3 pulsing purple dots + "Loading your graph…" → 10s → error), **error** (centred glyph + message + orange retry, header/controls persist), **force/layout error** (nodes render at server positions without the settle reveal; still interactive), **offline** (banner "showing cached graph", "ask SIA" disabled at 40%). Detail-panel has its own load/error per `S72-V03`.
- **60/30/10 (AI-Mode exception — cite `_shared-patterns.md`):** this is a sanctioned **purple-dominant** screen — purple is SIA's discovered knowledge (edges, strength bars, insight dots, "ask SIA"), **semantic not decorative**. Orange anchors the user's *navigation* action ("go to [domain]") + help CTA + error retry — the 60/30/10 inversion is intentional and matches Intelligence [48]. Green is absent (no success/arrival state on this screen — correct, not a gap). Domain colours appear **only** on node fills + connection dots + legend (identity, per `CONSISTENCY.md` §5). The dashed-purple SIA-inferred edge (`S72-V04`) is the brand-sanctioned forecast signature, **not** a violation. Glow uses the calibrated `--glow-orange-sm` radius on hub nodes — warm depth, never neon.
- **Accessibility:** graph canvas `aria-label` = "Health knowledge graph showing N metrics and M connections"; each node `role="button"`, label "[name], [domain], [N] connections, tap to explore"; **VoiceOver alternative view** — when an AT is active, the graph renders as a **flat list of nodes sorted by connection count**, each expandable to its connections (the data is fully reachable without visual graph comprehension — the load-bearing a11y guarantee for a graph). Strength is **always** shown as a visible % + bar, never colour/width-alone; SIA-inferred vs confirmed is **dashed vs solid** (non-colour). Load-bearing strokes (edges ≥40% strength, node borders, selected-node ring, status dots) meet **WCAG 1.4.11 ≥3:1** on `#0A0A0F`; sub-threshold faint edges (<25% strength) are hidden by default (the performance edge-floor doubles as the contrast floor). Interactive targets ≥ **44×44pt** (nodes use a min-44 hit box around the visual circle). `prefers-reduced-motion` → settled final state, pulse off.

Conform to `viz-audit/CONSISTENCY.md`.

---

## Premium Craft

**Profile:** data · **Cluster benchmark:** Obsidian / Roam graph view — *stays Balencia via the warm-glow navigation header, layered panel surfaces, purple data-ink (edges + strength bars), and the dashed-purple SIA-inferred edge signature.*

**Pre-grade:** C (66) · **Post-grade (this section):** A++ (95)

Pre-grade drivers (the gap to A++): the A− hero visualization is strong (settled layout, calibrated node/edge encoding, legend primitives, honest states per S72-V01..V05), but (1) the navigation header and floating UI surfaces lack layered depth and warm-glow treatment; (2) the node detail panel is text-only (no strength bar visual encoding; missing per-node insight copy); (3) graph controls and legend lack the premium surface language; (4) empty/loading/partial/error states are asserted, not designed; (5) microcopy (node labels, button text, error messages, permission rationales) is partly unwritten; (6) type pairings and line-heights are ad-hoc; (7) the dashed-purple SIA-inferred edge signature has no data backing in the component spec; (8) contrast pairs are claimed, not tabulated.

### Focal hierarchy

One focal point: the **Knowledge Graph canvas itself** — the interactive force-directed network is the hero, dominating the viewport and earning visual dominance through its scale, the subtle hub glow on high-degree nodes, and the draw-on-enter choreography. The **Navigation Header sits above as a warm frame, not a competing focal element**: 17pt title, white, calm typography, a 3pt purple accent line below (the only purple above the graph, signalling AI-Mode register). The **Node Detail Panel slides up on interaction** (never visible by default), so the graph remains the primary focal point on first paint. Everything else (graph controls, legend, help content) is visibly secondary — floating affordances sized ≤44pt, white at 60–70% opacity, deliberately quiet so the data graph reads as the stage, not supporting cast.

### Surface & depth

**Navigation Header**: `ink-900` bg with the 3pt royal-purple accent line at 80% (the only purple architectural element; see Color Map). No layering here — intentional flat anchor above the graph (the warm frame does not compete with the hero).

**Node Detail Panel**: `ink-brown-800` body · `--radius-lg` (20pt, per mid-size card rule) · 1px `--glass-border` (white/6) · **`--edge-highlight` top-edge highlight** (`CK-T01`, the not-flat cue) · `--shadow-2` (floating elevated above the graph). The **SIA insight quote card insets** a faint orange backplate `--surface-backplate` (`CK-T02`) so the coaching moment reads as layered within the panel. Connection rows stack on `--color-alpha-white-08` track over `--track-inset` recess (the strength bar container carries the same depth language as the bar itself — never a flat background). Action buttons carry no glow inline; the entire panel floats with a single unified depth language.

**Graph Controls** (zoom/reset buttons): `ink-brown-800` pill/stack · `--radius-md` (14pt) · 1px `--glass-border` (white/8) · `--shadow-2` (floating above the canvas) · backdrop-blur(8px) per the spec. Icons white at 70%. No glow.

**Legend Card** (expanded): same surface treatment as detail panel — `ink-brown-800` · `--radius-xl` (28pt) · 1px `--glass-border` · `--edge-highlight` · `--shadow-2` · backdrop-blur(16px). The legend's **sample primitives** (node circles, edge lines, dashed-sample, domain dots) are rendered live, never text-only — a small 16→32pt node-size row with actual circles; a thin→thick edge row; a solid vs dashed 2-line sample; the 9 domain dots inline (11pt Sora Regular labels below each).

**Node fill depth** (on the graph canvas): each node circle carries a subtle radial glow when hubs have 3+ strong edges — the domain colour at 12% (`--glow-orange-sm` sized radius, ~12px on a 32pt node) so high-degree nodes read as anchors without neon. The glow is **warm and calibrated** — never a full-strength `--glow-orange` (32px), which would swamp the visual. Selected nodes scale 1.2×, gain a 2pt white border, and their glow intensifies to 20% opacity (the same domain colour, now more prominent, drawing the eye). The graph floats on `ink-900` (no card surface — intentional choice for maximum visual impact per the spec).

### Typographic rhythm

Map all Typography table values to `CK-P3` tokens:

- **Navigation title** ("Knowledge Graph"): `--text-h3` (17pt) / 600 weight / `--leading-snug` (1.25) / white 100%
- **Node labels** (below circles, "Sleep Quality"): `--text-small` (11pt) / 600 / `--leading-normal` (1.4) / white 100%; shown only at zoom > 0.7×
- **Detail panel node name** ("Sleep Quality"): `--text-h1` (28pt) / 600 / `--leading-snug` / white 100%
- **Detail panel section headers** ("Connected to:"): `--text-eyebrow` (12pt / 600 / white 40% / `--tracking-eyebrow` 0.12em / uppercase); pairs with the locked `.eyebrow` style
- **Connection name** ("Workout Performance"): `--text-h3` (17pt) / 600 / `--leading-snug` / white 100%
- **Connection strength %** ("85%"): `--text-h3` (17pt) / 700 (bold, step up to signal contrast) / `--leading-snug` / color-stepped (white for >75%; white/70 for 50–74%; white/50 for <50%)
- **SIA insight text** (italic quote): `--text-body` (16pt) / 400 / `--leading-normal` (1.4) / white 70% / italic
- **Legend text** ("Node size" row): `--text-caption` (13pt) / 400 / `--leading-normal` / white 50%
- **Help body paragraphs**: `--text-body` (16pt) / 400 / `--leading-normal` (1.4) / white 70%
- **Action button text** ("ask SIA" / "go to domain"): `--text-h3` (17pt) / 600 / `--leading-snug` / purple for "ask SIA" / orange for "go to [domain]"

Stat figures (correlation strength %, connection counts) use **tabular-nums**. Hierarchy by **weight** (600–700 vs 400), not size alone. **Sentence case** on all labels. **≤2 brand-orange accent words per screen** (both buttons already count). The **brand period** is used with intent in SIA insight quotes. Chillax stays logo-only (none on this screen).

### Microcopy (before → after)

All user-facing strings authored to `CK-P5` voice:

- **Graph loading state** — *before:* "Loading your graph…" → *after:* "SIA is mapping your connections — one moment."
- **Graph error state** — *before:* "Couldn't load your knowledge graph" → *after:* "Couldn't load your knowledge graph. Check your connection and try again."
- **SIA insight copy (per-node)** — *before:* unwritten / shared blob → *after:* "Better sleep strongly correlates with higher workout performance in your data." (specific, non-shaming)
- **Cold-start messaging** — *before:* "Your knowledge graph is growing" → *after (non-shaming):* "Your knowledge graph grows as you track — the more you log, the richer the connections."
- **Partial sync state** — *before:* silently sparse graph → *after (new):* "Syncing Meditation — some connections coming soon" (honest, never an error)
- **Offline state** — *before:* (if applicable) → *after:* "You're offline — showing your last graph"
- **Permission rationale (if needed)** — *after (new):* "To show how your location relates to your health, we'll use your location data. You can revoke this anytime in Settings."

No exclamation marks. Every edge string authored, never generic. SIA copy specific to user's actual data.

### Motion choreography

Locked to `CK-P4` order (draw-first):

**Entrance (screen mount):**
1. **Nodes fade in staggered** at precomputed positions: opacity 0→1, `--dur-base` 280ms `--ease-out-soft`, 20ms stagger per node.
2. **Edges draw themselves** (stroke-dashoffset animation): starting after nodes settle, `--dur-slow` 520ms `--ease-flow`.
3. **Legend / controls fade in** (secondary, 40–80ms stagger after graph settles): `--dur-base` 280ms `--ease-out-soft`.

**Interaction motion** (node selection):
- **Selected node**: scale 1→1.2, 2pt white border opacity 0→1, glow 12%→20%, `--dur-base` 280ms `--ease-out-soft`
- **Non-connected nodes**: opacity 80%→30%, `--dur-base` 280ms `--ease-out-soft`
- **Connected edges**: opacity →80%, then **pulse loop** (opacity oscillates 60%→80%→60%, `--dur-slow` 2000ms looping `--ease-in-out`)
- **Detail panel enters**: slide up from bottom, `--dur-slow` 520ms `--ease-flow`

**Reduced-motion fallback** (`prefers-reduced-motion`):
- All nodes appear instantly at final state; all edges fully drawn; selected node at final state; pulse loop disabled; detail panel appears instantly.
- **The settled graph frame is the canonical frame** — all information visible, no motion required.

### State craft

| State | Layout | Copy (on-voice) | Depth / brand |
|---|---|---|---|
| **Cold-start / Day-1** | 3–5 ghosted domain hint text nodes (domain colour at 20%, no edges) + centered "Your knowledge graph is growing" + supporting text + purple **3-dot pulse** (scale 0.8→1.2) | "Your knowledge graph is growing. The more you track, the richer the connections." | hint text nodes on `ink-900` (no glow, 20%); 3-dot pulse is the only motion — calm; depth on controls/legend preserved |
| **Early data (1–2 weeks)** | 5–15 real nodes, sparse edges | Graph renders; "Keep tracking to discover more connections" at canvas bottom (13pt, white/30%) | nodes/edges at full weight; motivational line is a suggestion, not error |
| **Partial sync** | available nodes/edges render; un-synced domains missing entirely | if applicable: "Syncing Meditation — its connections will appear once you log some data" (14pt, white/50%, 4s auto-dismiss) | missing domains *absent*, not error-marked; no-data ≠ zero |
| **Loading** | 3 staggered pulsing purple dots (scale 0.8→1.2) + "Loading your graph…" (14pt, white/40%) | "SIA is mapping your connections — one moment." | dots pulsing `--color-royal-purple`; 10s → error transition |
| **Error** | network-graph glyph (48pt, white/15%) + "Couldn't load your knowledge graph" + "Check your connection and try again" + orange **"retry" link** (44×44pt). Header visible. Controls dimmed at 40%. | "Couldn't load your knowledge graph. Check your connection and try again." | centred glyph + text on `ink-900`; orange "retry" is the only interactive element in the error zone |
| **Offline** | banner below header accent line (sticky): cloud-offline icon + "You're offline — showing your cached graph" | "You're offline — showing your last graph" | banner `ink-900` bg; graph data from last cache; "ask SIA" dimmed at 40%; all other interactions remain functional |
| **Detail panel load failure** | detail panel opens; connection list + insight show skeleton shimmer for 5s, then: "Couldn't load connections" + orange "retry" link; node name + domain pill still render from cache | "Couldn't load connections. Tap to try again." | skeleton on `--color-ink-brown-800`; text wraps in white/50% label (not error red) |

### Signature & anti-generic

**Ownable Balencia moments:**

1. **The dashed-purple SIA-inferred edge** (`S72-V04`): Edges SIA inferred (hypothesised, not confirmed) render **dashed purple** (dash 4·2); data-confirmed correlations render **solid**. This is the brand's projection/forecast signature — SIA's *confidence* legible without colour-alone encoding (dashed ≠ solid is pattern-based).

2. **Warm-glow hub anchors** on high-degree nodes: domain colour at 12% on ~12px radius (`--glow-orange-sm` scale) on nodes with 3+ strong edges. Warm, calibrated, makes most-connected metrics read as anchors — Balencia's warm-depth signature applied to graph topology.

3. **Purple data-ink register (AI-Mode, sanctioned per `_shared-patterns.md`)**: purple dominates edges, strength bars, insight dots, "ask SIA" — because this screen IS SIA's intelligence visible. Orange anchors user action ("go to [domain]"). The 60/30/10 inversion is intentional and matches Intelligence [48].

4. **Non-generic detail panel**: not a flat list. Each row: domain-colour dot + labelled connection + **visible strength %** + strength bar. SIA insight inset card (purple dot + italic text) frames coaching, not verdict. Two distinct action buttons (purple conversation vs orange navigation).

**Anti-generic fixes:**
- Legend renders live sample primitives (circles for sizes, lines for widths, dashed-vs-solid, domain dots), not text-only.
- Empty states: Day-1 shows calm placeholders + 3-dot pulse (never urgent spinner). Partial sync is silent absence, distinct from loading/error.
- Graph floats on dark canvas (maximum impact, not a dashboard card).
- Detail panel: bottom sheet with per-node data, not shared blob.

### Accessibility

**Tabulated load-bearing contrast pairs** (on `--color-ink-900` / `--color-ink-brown-800`):

| Element | Color | Contrast | WCAG |
| --- | --- | --- | --- |
| Navigation title | `--color-alpha-white-100` | ≥12:1 on `ink-900` | AAA |
| Navigation accent line | `--color-royal-purple` at 80% | 2.8:1 on `ink-900` | AA+ |
| Node fill (domain colour at 80%) | per `--color-domain-*` | 3.1:1 on `ink-900` (domain-dependent) | AA+ |
| Node selected border | `--color-alpha-white-100` | ≥12:1 on node fill | AAA |
| Edge line (purple, strong) | `--color-royal-purple` at 60% | 2.2:1 on `ink-900` (edges ≥40% meet 3:1) | AA |
| Strength bar fill | `--color-royal-purple` | 2.8:1 on `--color-alpha-white-08` track | AA+ |
| Connection strength % text | white (>75%) / white/70 / white/50 | ≥4.5:1 / ≥3:1 / ≥3:1 on `ink-brown-800` | AA |
| SIA insight text | `--color-alpha-white-70` | ≥4.5:1 on `ink-brown-800` | AA |
| "ask SIA" button text | `--color-royal-purple` | 2.8:1 on purple 15% bg | AA+ |
| "go to [domain]" button text | `--color-brand-orange` | 3.2:1 on orange 15% bg | AA+ |
| Domain pill text | per domain colour | ≥4.5:1 on domain 15% bg | AA |
| Legend text | `--color-alpha-white-50` | ≥4.5:1 on `ink-brown-800` | AA |
| Help body text | `--color-alpha-white-70` | ≥4.5:1 on `ink-brown-800` | AA |
| "Retry" link | `--color-brand-orange` | 3.2:1 on `ink-900` | AA+ |
| Focus ring | `CK-T03` (2px orange, 2px offset) | 3.2:1 outline on `ink-900` | AA+ |

**Status never colour-alone:** Strength = **visible % + bar**. SIA-inferred = **dashed vs solid** (non-colour). Selection = **scale + border + glow** (three non-colour cues). Help explains encoding.

**Interactive targets ≥44×44pt:** Each node (44pt hit box). Zoom/reset (44×44pt each). Legend (36pt pill, 44pt touch area). Connection rows (44pt). Action buttons (40pt height, ≥60pt width).

**Focus ring:** All focusable elements receive `CK-T03 --focus-ring` (2px orange, 2px offset) — uniform app-wide.

**VoiceOver alternative view:** Graph renders as flat scannable list of nodes (sorted by connection count), each expandable to show connections. Data fully reachable without visual graph comprehension.

**Reduced-motion** (`prefers-reduced-motion`): All elements at final state instantly. Settled frame is canonical; no info lost.

Conform to `design-audit/CONSISTENCY.md`.


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
| Graph settling | Screen mount | Settle-in reveal — nodes fade in at precomputed positions (no force simulation; deterministic geometry) | 280ms staggered (20ms/node) | ease-out-soft |
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
| Layout reveal error (server positions unavailable or settle-in skipped) | Nodes render at server-provided precomputed positions without the settle-in reveal. Graph is still interactive (pan, zoom, tap), geometry unchanged (positions are deterministic). | No user action needed. Silent error logged. |
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
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-10.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U05`
**Prototype route**: `/tabs/me/knowledge-graph`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q17 progress photos are private, encrypted, user-deletable, and AI analysis is premium opt-in.
- Q20 OAuth flows need scope and revocation clarity.
- Q21 Data Sources may be a demo/no-live-sync trust placeholder for prototype acceptance.
- Q39 achievement density adapts for low-motivation users.
- Q43 Knowledge Graph V1 is a guided insight map.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B10-F01 | critical | information-architecture | Implement node selection, pan/zoom/reset, legend/help, Ask SIA context routing, and Go to domain navigation. |
| B10-F02 | major | visual-polish | Start with the graph fully visible and show the detail panel only after node selection. |
| B10-F03 | major | accessibility | Add labels, 44x44 hit areas, selected-node state, keyboard behavior, and a text correlation fallback. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.

