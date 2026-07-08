# Screen Design: Knowledge Graph

**Screen**: 65 of 66
**File**: 65-knowledge-graph.md
**Register**: Intelligence Mode (royal-purple #7F24FF)
**Primary action**: explore connections across all life data
**Tab**: Intelligence tab within Dashboard (also reachable as its own nav item from Explore Section [18])
**Navigation**: Stack depth 1–2 from Dashboard. Entry from Dashboard "Intelligence" tab (persistent, sits alongside Overview/Accountability/other dashboard tabs), Explore Section [18] via "Knowledge Graph" tile, SIA Chat [09] deep-link ("here's how that connects to your sleep" → focusNodeId param), Node/entry detail screens across the app via a "view in graph" shortcut (e.g. a workout session, a goal, a journal entry). Exit via Dashboard tab switch or back button (when reached as a standalone nav item).

---

## Purpose

This screen is the platform's cross-pillar intelligence surface — it visualizes how a user's fitness, nutrition, hydration, wellbeing, biometrics, goals, coaching, finance, and documents connect to each other on a given day or range, and it lets the AI coach's own reasoning be inspected the same way. It answers "what is actually connected to what, and why does SIA believe that?" This is deliberately not a vanity chart — every node and edge traces back to a real row in a real feature table, and every relationship is either a same-day co-occurrence (temporal), a structural containment (hierarchical), a detected cause-effect pattern (causal), a statistical co-movement (correlation), or a semantic similarity (semantic). Nothing on this screen is precomputed or cached as a persisted graph; it is assembled fresh, per request, from the user's own data.

**Critical technical fact — read-time federation, not a graph database**: the Knowledge Graph has **no dedicated node/edge storage**. There is no `graph_nodes` or `graph_edges` table. Every request to `GET /api/v1/intelligence/graph` triggers a live aggregation across roughly 31 existing feature tables (workout_sessions, meals, mood_entries, sleep_sessions, recovery_scores, strain_scores, energy_logs, stress_logs, health_goals, life_goals, daily_scores, journal_entries, contradictions, correlations, habit_completions, voice_calls, water_intake, insights, daily_checkins, breathing_tests, yoga_sessions, meditation_sessions, voice_journals, emotion_detections, progress_records, daily_intentions, weekly_reports, emotional_screenings, chat_messages, activity_completions, schedule_entries, finance_transactions, achievements, finance_insights, and more), scoped to the requested date range and user, then assembled into a nodes+edges payload in memory and returned. This is why every "Data source" field below reads "API — federated read-time aggregation, not a persisted graph" rather than a single table name — there is no single table to name. The consequence for design: node/edge counts, layout, and even which categories appear at all are entirely a function of what the user actually logged in the selected window — there is no seeded or synthetic graph to fall back on, which is why the Empty Graph state (below) is a first-class, carefully designed state rather than an edge case.

A second, distinct dataset shares this same canvas: the **Architecture / Reasoning overlay** (toggled via the Data/Architecture switch in the Graph Header) replaces the user's life-data graph with a fixed hierarchy of the platform's own AI-coach feature nodes (brain → hub → leaf, e.g. "SIA Brain" → "Accountability" → "Contracts") annotated with live per-feature health scores, last-activity timestamps, and status (active/dormant/never_used). This is SIA's own self-model made visible — a distinct, smaller, mostly-static dataset (~dozens of nodes vs. up to 200 in the data view) rendered on the identical force-simulation canvas, filter sidebar hidden, legend swapped for status/edge-type keys specific to this mode.

---

## Information Architecture

**Hierarchy — Data View (default)** (what the user sees, in order of visual priority):
1. Graph Header — mode toggle (Data/Architecture), live node/edge/date-range stats, view mode toggle (Graph/Timeline/Cards), refresh, export
2. Filter Sidebar (collapsible) — search, time-range presets, 10 category toggle chips with live counts
3. Force-Directed Graph Canvas — full remaining viewport, pan/zoom/drag
4. Graph Legend (collapsible, bottom-right overlay) — node categories, edge types, size encoding
5. Node Tooltip (transient, on hover) — quick preview before committing to a click
6. Node Detail Modal (on click) — full entry list, filters, pagination, relationships

**Hierarchy — Architecture / Reasoning View**:
1. Graph Header — same chrome, Data/Architecture toggle now shows Architecture active (purple), stats show nodes/edges only (no date range — this dataset isn't date-scoped)
2. Force-Directed Graph Canvas — same canvas, different physics constants (fewer, larger nodes; brain node anchored center)
3. Node click → feature detail (route deep-link + health score + status, in a lighter-weight popover rather than the full Node Detail Modal, since there are no "entries" to page through)

**User flow**:
- **Arrives from**: Dashboard "Intelligence" tab (tab switch, no stack push), Explore Section [18] via "Knowledge Graph" tile (stack push), SIA Chat [09] deep-link with `focusNodeId` pre-set, any entry detail screen's "view in graph" shortcut (stack push with `focusNodeId` + 1-hop `focusDepth`)
- **Primary exit**: Dashboard tab switch, or back button when reached as a standalone stack push
- **Secondary exits**: Node Detail Modal "view source" deep-link (stack push to the originating screen — e.g. Workout Detail [27], Meal Detail [29]), SIA Chat [09] (tab switch, when a node's context is asked about), Export download (system file save / share sheet)

---

## Layout — Default Graph View

**Scroll behavior**: Fixed canvas (no vertical scroll); Filter Sidebar scrolls independently
**Tab bar visible**: Yes (dashboard bottom tab bar remains, since this is a Dashboard tab)

### ASCII Wireframe — Default Graph View (desktop ≥1024px, sidebar open)

```
┌───────────────────────────────────────────────────────┐
│                Status Bar (44pt)                       │
├───────────────────────────────────────────────────────┤
│ [Database][Brain] 142 nodes · 318 edges · Jul 1–8 2026 │  ← Graph Header (~52pt)
│                          [Graph][List][Grid] [↻][⬇]    │
├──────────┬────────────────────────────────────────────┤
│ Filters  │                                             │
│ ────     │        ●fitness   ╌╌╌╌╌   ●goals            │
│ [search] │       ╱   ╲──────╲       ╱                  │
│          │      ●nutr  ●bio ●intel─●coach               │
│ TIME     │       ╲    ╱  ╲   ╲    ╱                     │
│[Tdy][7d] │        ●hydr    ●wellbeing                  │  ← Force-Directed
│[30d]     │              ╲  │                            │     Graph Canvas
│ From  To │               ●finance   ●documents          │     (full remaining
│ [__][__] │                                             │      viewport)
│          │                                             │
│ SOURCES  │                                             │
│●Fitness 24│                                            │
│●Nutrition │                                             │
│  18      │                                             │
│●Hydration │                                    ┌──────┐│
│  6       │                                     │Legend││ ← Graph Legend
│●Wellbeing │                                    │ ▸    ││    (collapsed,
│  9       │                                     └──────┘│     bottom-right)
│● ...     │                                             │
├──────────┴────────────────────────────────────────────┤
│  Today  |  SIA  |  Goals  |  Career  |  Me            │  ← Tab Bar
├───────────────────────────────────────────────────────┤
│                Home Indicator (34pt)                    │
└───────────────────────────────────────────────────────┘
```

### ASCII Wireframe — Default Graph View (mobile <768px, sidebar as bottom drawer)

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│ [DB][Brain] 84·162  [Graph][⬇]      │  ← Graph Header (compact,
│                          [↻]         │     stacked/wrapped)
├─────────────────────────────────────┤
│                                     │
│        ●fitness  ╌╌╌  ●goals        │
│       ╱   ╲────╲     ╱              │
│      ●nutr  ●bio─●intel─●coach       │  ← Force-Directed Graph
│       ╲    ╱  ╲   ╲    ╱            │     Canvas (full remaining
│        ●hyd    ●wellbeing           │     viewport, pinch-zoom)
│              ╲  │                    │
│               ●finance ●docs         │
│                                     │
│                            ┌──────┐ │
│                            │Legend│ │  ← Graph Legend (bottom-
│                            │  ▸   │ │     right, more compact)
│  [SlidersHorizontal]       └──────┘ │  ← Filter FAB (bottom-left,
│                                     │     opens bottom drawer)
├─────────────────────────────────────┤
│ Today | SIA | Goals | Career | Me  │  ← Tab Bar
├─────────────────────────────────────┤
│         Home Indicator (34pt)       │
└─────────────────────────────────────┘
```

### Component Stack — Default Graph View (top to bottom / z-order)

1. **Graph Header** — ~52–64pt, FIXED, sticky, glass backdrop-blur
   - Purpose: Mode/view switching, live stats, refresh, export
   - Content: Data/Architecture toggle, node/edge/date-range stats, Graph/Timeline/Cards view toggle, refresh button, export menu
2. **Filter Sidebar** — 288pt (desktop, collapsible to 44pt icon rail) or bottom drawer up to 80vh (mobile)
   - Purpose: Search, time-range control, category filtering
   - Content: Search input, date presets + custom range, 10 category toggle rows with live counts
3. **Force-Directed Graph Canvas** — Full remaining viewport
   - Purpose: The graph itself — pan, zoom, drag, hover, click
   - Content: SVG-rendered D3 force simulation, category-colored nodes sized by entry count, category-colored/styled edges
4. **Node Tooltip** — Transient, ~140–240pt wide, follows cursor/touch position
   - Purpose: Fast preview on hover before committing to a click
   - Content: Category dot + label + category name + entry count + date
5. **Graph Legend** — Collapsible, bottom-right overlay, ~180pt wide expanded / ~120pt collapsed
   - Purpose: Decode node colors, edge line styles, and size encoding
   - Content: Node category swatches, edge-type key with line-style samples, size legend (low/mid/high)
6. **Filter Toggle FAB** (mobile only) — 48pt circle, bottom-left
   - Purpose: Open the filter bottom drawer when the sidebar is collapsed
   - Content: Sliders icon, orange fill

---

## Layout — Node Detail Open State

**Scroll behavior**: Canvas frozen behind a backdrop; modal body scrolls internally
**Tab bar visible**: Dimmed behind backdrop, not interactive

### ASCII Wireframe — Node Detail Modal Open (all breakpoints, centered overlay)

```
┌───────────────────────────────────────────────────────┐
│  ░░░░░░░░░░░░░░  (canvas dimmed behind 70% black       │
│  ░░░░░░░░░░░░░░   backdrop + blur, tap outside closes) │
│  ░░░┌─────────────────────────────────────┐░░░░░░░░░░ │
│  ░░░│ [‹] 3 / 12                      [x] │░░░░░░░░░░ │  ← Modal header:
│  ░░░│ ──────────────────────────────────  │░░░░░░░░░░ │     prev/next + close
│  ░░░│ [24]  Fitness                       │░░░░░░░░░░ │  ← Hero: entry-count
│  ░░░│       Jul 8 · 24 entries            │░░░░░░░░░░ │     avatar + label +
│  ░░░│ ──────────────────────────────────  │░░░░░░░░░░ │     category pill
│  ░░░│ [All 24][workout_session 18][meal 6]│░░░░░░░░░░ │  ← Type Filter Chips
│  ░░░│ ──────────────────────────────────  │░░░░░░░░░░ │
│  ░░░│ [Dumbbell] Morning Run    Jul 8      │░░░░░░░░░░ │  ← Entry Card 1
│  ░░░│   32 min · completed · +45 XP        │░░░░░░░░░░ │
│  ░░░│ [Dumbbell] Upper Body     Jul 8      │░░░░░░░░░░ │  ← Entry Card 2
│  ░░░│   48 min · completed · +60 XP        │░░░░░░░░░░ │
│  ░░░│  ... (up to 8 per page)              │░░░░░░░░░░ │
│  ░░░│ ──────────────────────────────────  │░░░░░░░░░░ │
│  ░░░│ Showing 1–8 of 18      [‹] 1/3 [›]  │░░░░░░░░░░ │  ← Pagination
│  ░░░│ ──────────────────────────────────  │░░░░░░░░░░ │
│  ░░░│ [Share] Relationships (7)            │░░░░░░░░░░ │  ← Relationships
│  ░░░│  ● Sleep quality      Influences 82% │░░░░░░░░░░ │     header (purple)
│  ░░░│  ● Morning mood       Same time  61% │░░░░░░░░░░ │
│  ░░░│  ● Weekly goal        Belongs to 100%│░░░░░░░░░░ │
│  ░░░└─────────────────────────────────────┘░░░░░░░░░░ │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
└───────────────────────────────────────────────────────┘
```

### Component Stack — Node Detail Open State

1. **Backdrop** — full-screen, ink-900 at 70%, backdrop-blur(4px), tap to close
2. **Node Detail Modal** — centered, max-width 512pt (32rem), --r-2xl (24pt/rounded-3xl), max-height 90vh with internal scroll
   - Purpose: Full drill-down into every raw entry composing the clicked node, plus its live relationships
   - Content: Prev/Next node navigator, close button, hero (entry-count badge + label + category pill + date), type filter chips, paginated Entry Card list (8/page), Relationships panel (up to 12, strongest-first)
3. **Entry Detail Modal** (secondary, stacks above Node Detail Modal) — opened by tapping an individual Entry Card
   - Purpose: Full raw detail of a single entry (e.g. one specific workout session)
   - Content: Type-specific full field dump, "view source" deep-link

---

## Layout — Timeline & Cards View Modes (Data mode alternates)

The Graph Header's view-mode toggle (Data mode only) does not just change a filter — it swaps the entire content region below the header for a differently-shaped read of the same federated payload. Both alternates keep the Filter Sidebar exactly as-is (same search, same date/category state) so switching views never loses the user's current filter context.

### ASCII Wireframe — Timeline View

```
┌──────────┬────────────────────────────────────────────┐
│ Filters  │ Jul 8, 2026                                  │  ← Sticky Date
│ (same    │ ┌───────────────────────────────────────┐  │     Group Header
│ sidebar) │ │[Dumbbell] Morning Run          6:45 AM │  │  ← Timeline Row
│          │ │ Fitness · 32 min · +45 XP              │  │     (chronological,
│          │ ├───────────────────────────────────────┤  │      newest first)
│          │ │[Utensils] Breakfast bowl       7:20 AM │  │
│          │ │ Nutrition · 420 kcal                   │  │
│          │ ├───────────────────────────────────────┤  │
│          │ │[Smile] Mood check-in           8:00 AM │  │
│          │ │ Wellbeing · happy · stress 2/10        │  │
│          │ └───────────────────────────────────────┘  │
│          │ Jul 7, 2026                                  │  ← next Date
│          │ ┌───────────────────────────────────────┐  │     Group Header
│          │ │ ...                                     │  │
└──────────┴────────────────────────────────────────────┘
```

- **Purpose**: A chronological, scannable read of the exact same federated entries the graph canvas renders as nodes — for users who think in "what happened when" rather than "what connects to what"
- **Data source**: Identical `GET /api/v1/intelligence/graph` payload, flattened client-side into individual entries (not nodes) and sorted by timestamp descending
- **Visual treatment**: Sticky Date Group Header per day (13pt Cabinet Grotesk SemiBold, white at 40%, uppercase — reusing the Date Group Header pattern from Screen 24), Timeline Rows below each (56–72pt, category-tinted type icon + label + category · detail chips + right-aligned time)
- **Gestures**: Tap a row opens the Entry Detail Modal directly (skips the Node Detail Modal's aggregation step, since a timeline row is already one specific entry)
- **Empty/loading states**: Shares the same Empty Graph State and Graph Loading Skeleton as the canvas view, re-labelled ("No entries in this range" / a simple list-shimmer instead of the node-lattice shimmer)

### ASCII Wireframe — Cards View

```
┌──────────┬────────────────────────────────────────────┐
│ Filters  │ ┌──────────┐ ┌──────────┐ ┌──────────┐      │  ← Card Grid
│ (same    │ │●Fitness  │ │●Nutrition│ │●Wellbeing│      │     (one card per
│ sidebar) │ │24 entries│ │18 entries│ │ 9 entries│      │      node, same
│          │ │[sparkline]│ │[sparkline]│ │[sparkline]│    │      grouping the
│          │ │view →    │ │view →    │ │view →    │      │      canvas uses)
│          │ └──────────┘ └──────────┘ └──────────┘      │
│          │ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│          │ │●Hydration│ │●Biometrics│ │●Goals    │      │
│          │ │ 6 entries│ │12 entries │ │ 4 entries│      │
│          │ └──────────┘ └──────────┘ └──────────┘      │
└──────────┴────────────────────────────────────────────┘
```

- **Purpose**: A grid summary of the same nodes the canvas renders — for users who want to scan category totals without the spatial/relational reasoning a force graph demands
- **Data source**: Identical graph payload's node list, rendered as cards instead of canvas circles (no edges shown in this view — Cards mode is intentionally relationship-free, a deliberate simplification for users who found the canvas overwhelming)
- **Visual treatment**: Responsive grid (1-col mobile, 2-col tablet, 3–4-col desktop), each card: ink-brown-800, --r-lg (20pt), 16pt padding — category-colored dot + category label (top), entry count (24pt Cabinet Grotesk Bold), a compact 7-day category-colored sparkline (activity trend), "view →" link (orange, bottom-right)
- **Gestures**: Tap a card opens the same Node Detail Modal used by the canvas view (identical component, different entry point)
- **Relationship to canvas**: Cards view is the "reduced motion, reduced complexity" escape hatch — a user who finds the physics-driven canvas disorienting (or is on a device where WebGL/SVG animation underperforms) gets the same information with zero motion and zero spatial reasoning required

---

## Components

### Graph Header
- **Purpose**: Top chrome — mode switching, live stats, view switching, refresh, export. This is the screen's control center; it never scrolls away.
- **Data source**: View state (mode/view toggles) + API response metadata (node/edge counts come from the same `buildGraph` response the canvas renders)
- **Visual treatment**: Glass surface (white at 2% bg, 1pt white 8% border, backdrop-blur-xl), full-width, wraps to 2 rows below 640pt. FIXED, z-30.
- **Content**:
  - Data/Architecture toggle: 2-segment icon-only radio group (glass-inset pill). Data (database icon) — orange active fill when selected. Architecture (brain icon) — royal-purple active fill when selected, purple focus ring.
  - Live stats: "{N} nodes" + "{N} edges" (both in Cabinet Grotesk Bold, numerals only bold, "nodes"/"edges" labels in Switzer Regular at reduced opacity) + separator dots + human-formatted date range (e.g. "Jul 1 – Jul 8, 2026"), hidden in Architecture mode (not date-scoped)
  - View mode toggle (Data mode only): 3-segment icon-only radio group — Graph (network icon), Timeline (list icon), Cards (grid icon). Orange active fill.
  - Refresh button: glass-inset pill, refresh icon, spins + disables while loading
  - Export menu: glass-inset pill, download icon + "Export" label (hidden text <sm) + chevron, opens a 2-item dropdown (JSON / CSV) on click
- **Gestures**: Tap toggles switch mode/view instantly (canvas re-renders with a crossfade); tap refresh re-fetches; tap export opens format menu, tap a format triggers download
- **Size**: Full-width x ~52–64pt (wraps to ~104pt below 640pt when both rows are needed)

### Filter Sidebar
- **Purpose**: Search, time-range control, and category filtering — the primary way a user narrows what the federated query returns
- **Data source**: View state (filter values) driving the next `GET /api/v1/intelligence/graph` call; category counts come from the current graph response
- **Visual treatment**: Warm-ink panel gradient (`linear-gradient(180deg, #120904 0%, #0A0A0F 100%)` — deliberately warm-dark, not blue-tinted, per brand §7), 288pt wide desktop, collapses to a 44pt icon rail (category dots only) when closed. On mobile (<768px), transforms into a bottom drawer (max-h 80vh, drag handle, backdrop) triggered by a Filter FAB.
- **Content**:
  - Sticky header: sliders icon in a clay-inset tile + "Filters" (14pt Cabinet Grotesk Bold) + live "{N} nodes" (10pt Switzer, white 40%) + collapse chevron
  - Search input: 40pt, glass-inset, search icon left, clear "x" right (conditional), placeholder "Search nodes...", **debounced 300ms** per the platform's server-side-search standard, cancels the in-flight request on a newer keystroke
  - Time Range section: Calendar icon + "Time Range" eyebrow (11pt Cabinet Grotesk SemiBold, uppercase, +wide tracking, white 45%). Three preset pills (Today / 7 Days / 30 Days, equal-width, orange active fill) + a 2-column custom From/To native date input row (dark color-scheme, orange focus border)
  - Divider: gradient hairline (transparent → white 6% → transparent)
  - Data Sources section: Sparkles icon (purple-tinted, signaling "these categories feed the AI") + "Data Sources" eyebrow. 10 toggle rows, one per category: glowing dot (category color, ping-animates when active) + label (12pt Switzer Medium) + count badge (Cabinet Grotesk Bold, tabular nums, pill). Inactive rows drop to 40% opacity.
  - Collapsed rail (desktop): 44pt wide, chevron-expand button + a vertical stack of 10 mini category dots (8pt), tap toggles the same filter state without opening the panel
- **Categories** (exact 10, in fixed display order): Fitness, Nutrition, Hydration, Wellbeing, Biometrics, Goals, Intelligence, Coaching, Finance, Documents
- **Gestures**: Type to search (debounced), tap preset to set date range, tap custom date inputs to override, tap a category row to toggle it (empty filter = all categories shown), tap collapse chevron to rail-ify (desktop) or swipe-down/tap-backdrop to dismiss (mobile drawer)
- **Size**: 288pt wide x full-height (desktop) / 44pt wide x full-height (collapsed) / full-width x ≤80vh (mobile drawer)

### Force-Directed Graph Canvas
- **Purpose**: The graph itself — the primary visualization surface
- **Data source**: API — `GET /api/v1/intelligence/graph?from=&to=&categories=&edgeCategories=&minEdgeStrength=&focusNodeId=&focusDepth=&searchQuery=&maxNodes=200&includeAI=` — **federated read-time aggregation across ~31 feature tables, not a persisted graph.** Architecture mode instead calls `GET /api/v1/intelligence/graph/reasoning` (fixed feature-node registry + live per-feature health-state).
- **Visual treatment**: Full-bleed SVG canvas, ink-900 background (transparent over the dashboard's own bg), no border. D3 force simulation (`d3-force`, `alphaDecay: 0.015`) drives node positions; `d3-zoom` drives pan/pinch/scroll-zoom, initial transform centers the graph at 0.65× scale desktop / 0.45× mobile.
- **Node rendering**: Circle radius scales with the node's `entryCount` (aggregated entries collapsed into one node per category+day+kind, per the size legend's low/mid/high bands). Fill is a radial gradient from a lightened category color (center) through the base category color to a darkened edge tone — this is what gives nodes their glassy, lit-from-within look rather than a flat fill. `focusNodeId`-selected node gets a persistent highlight ring.
- **Edge rendering**: Line stroke color + style per `EdgeCategory` (see Graph Legend below); stroke-width and base opacity scale with `edge.strength` (0–1). Edge labels are hidden by default (opacity 0) and reveal on hover of either endpoint.
- **Content**: Category-colored nodes + typed edges, drawn per the Category Colors and Edge Type tables below
- **Gestures**: Drag canvas to pan, scroll/pinch to zoom, drag a node to reposition it (releases back into the simulation on drop), hover a node to show Node Tooltip + highlight its connected subgraph, click a node to open Node Detail Modal + camera pan/zoom to focus it, click empty canvas to deselect
- **Size**: Full remaining viewport (100% width x [viewport height − header − tab bar])

### Node Tooltip
- **Purpose**: Fast, low-commitment preview of a node before clicking into its detail
- **Data source**: Same in-memory graph payload already rendered on canvas — no additional request
- **Visual treatment**: Fixed-position (follows cursor/touch, viewport-clamped so it never overflows at 320px or screen edges — flips to the cursor's left when cramped), 140–240pt wide, ink-950-tinted glass (`rgba(12,9,6,0.95)`), 1pt white 10% border, backdrop-blur-xl, --r-lg (12pt), category-color hairline accent along the top edge
- **Content**: Category-colored glowing dot (8pt) + node label (13pt Switzer SemiBold, white, truncated) on row 1; category name (11pt Switzer, white 55%) + separator + entry count in category color (11pt Switzer Medium) + separator + date (11pt Switzer, white 40%) on row 2
- **Gestures**: None (pointer-events: none) — purely informational, dismisses on pointer-out
- **Size**: Auto-width 140–240pt x ~64pt

### Node Detail Modal
- **Purpose**: Full drill-down into a clicked node — every raw entry it aggregates, filterable and paginated, plus its live relationships to neighboring nodes
- **Data source**: API — `GET /api/v1/intelligence/graph/node/:nodeId?type=` for the entry list; edges + label lookup are already in the canvas's in-memory graph payload (no extra request for relationships)
- **Visual treatment**: Centered overlay (not a bottom sheet — this is desktop-friendly content-dense detail, so it centers with spring entrance rather than sliding from an edge), max-width 512pt, max-height 90vh internal scroll, ink gradient bg (`linear-gradient(180deg, #1A1209 0%, #100A05 100%)`), --r-2xl (24pt), 1pt white 10% border, category-color top hairline + soft category-color ambient glow shadow
- **Content**:
  - Header row: Prev/Next node navigator (chevron buttons + "N / total" counter, tabular nums) + close button
  - Hero: entry-count badge (48pt tile, category color at 15% bg, category color text, the count itself as the glyph) + node label (18pt Cabinet Grotesk Bold) + category pill (category color at 15% bg) + date + "{N} entries" caption
  - Type Filter Chips (conditional, only when the node spans >1 entry type): "All (N)" + one chip per distinct entry type, orange active state
  - Entry Card list: up to 8 per page, each a tappable row — type icon (category-tinted tile) + entry label + date (top row) + up to 3 type-specific detail chips (bottom row, e.g. workout: duration/status/XP; meal: type/calories/macros; mood: emoji/happiness/stress; sleep: hours/provider)
  - Pagination footer (conditional, >8 entries): "Showing X–Y of N" + prev/next + page counter
  - Relationships panel (conditional, ≥1 relationship): Share icon (purple) + "Relationships (N)" eyebrow, up to 12 rows sorted strongest-first — edge-type-colored dot + neighbor label + edge-type pill (category-colored) + strength percentage (tabular nums)
- **Gestures**: Tap prev/next to navigate between all currently-rendered nodes without closing the modal, tap close or backdrop to dismiss, tap a type filter chip to narrow the entry list, tap an Entry Card to open the secondary Entry Detail Modal, tap a Relationship row to re-focus the graph on that neighbor (closes current modal, opens the neighbor's)
- **Size**: Max-width 512pt x auto-height (max 90vh, internal scroll)

### Entry Detail Modal (secondary)
- **Purpose**: Full raw detail of one specific entry (e.g. exactly one workout session), reached from the Node Detail Modal's entry list
- **Data source**: Already-loaded entry object from the parent Node Detail Modal's fetch — no additional request
- **Visual treatment**: Stacks above the Node Detail Modal (z+10), same glass-modal language, smaller footprint
- **Content**: Full type-specific field dump (all non-null, non-object fields), "view source" CTA
- **Gestures**: Tap "view source" pushes the originating feature screen (Workout Detail [27], Meal Detail [29], Goal Detail [14], etc.) with the entry pre-loaded; tap close returns to Node Detail Modal
- **Size**: Matches Node Detail Modal width, auto-height

### Graph Legend
- **Purpose**: Decode the canvas — node category colors, edge line styles, and the size-to-count encoding
- **Data source**: Static config (CATEGORY_COLORS, EDGE_CATEGORY_COLORS) — no API call
- **Visual treatment**: Collapsible glass panel, bottom-right overlay, z-10 (below modals, above canvas), --r-2xl (16pt approximated), max-height 45vh internal scroll when expanded, constrained to `calc(100% - 2rem)` so it never occludes the full canvas on narrow viewports
- **Content**:
  - Header row (always visible): "Legend" (12pt Cabinet Grotesk SemiBold) + chevron (expand/collapse)
  - Nodes section (expanded): 2-column grid, one row per category — colored dot (10pt) + label (11pt Switzer, white 70%)
  - Edges section (expanded): one row per edge type — a short line sample rendered in the edge's actual color + border-style (dashed/solid/dotted) + label (11pt Switzer, white 70%)
  - Size section (expanded): 3 dots ascending in size (8pt/14pt/20pt, white at 40%/70%/100%) labeled Low/Mid/High
- **Gestures**: Tap header to expand/collapse
- **Size**: ~180pt wide expanded / ~90pt wide collapsed x auto-height

### Filter Toggle FAB (mobile)
- **Purpose**: Reopen the filter drawer once collapsed on small screens
- **Visual treatment**: 48pt circle, orange fill, --shadow-2 + orange glow, fixed bottom-left (mirrors the Legend's bottom-right position so neither overlay collides)
- **Content**: Sliders-horizontal icon (20pt, white)
- **Gestures**: Tap opens the bottom-drawer Filter Sidebar
- **Size**: 48pt circle

### Graph Loading Skeleton
- **Purpose**: Communicate "assembling your graph" during the federated aggregation fetch — this can take longer than a typical list fetch since it's querying ~31 tables, so the skeleton is explicitly graph-shaped rather than a generic spinner
- **Visual treatment**: Centered composition, ~128pt square. A faint radial line lattice (white at 25% opacity) connects 5 outer dots to 1 larger center dot. Each dot is rendered in a real category color (fitness/nutrition/wellbeing/biometrics/hydration/goals) with a matching glow, pulsing opacity (0.75 base) on a staggered delay per dot (0/0.2/0.4/0.6/0.8/0.1s)
- **Content**: The pulsing dot lattice + "Building your knowledge graph…" (14pt Switzer Regular, white 55%, pulses in sync)
- **Motion**: `animate-pulse` opacity loop per dot, staggered — GPU-friendly (opacity only)
- **Size**: Full canvas area, content centered, min-height 500pt

### Empty Graph State
- **Purpose**: Honest, encouraging first-run state when a new user has too little logged data in the selected range to render meaningful connections — this is expected and common (Day 1), not an error
- **Visual treatment**: Centered composition, full canvas area
- **Content**:
  - Central icon: 80pt clay-inset tile, network icon (36pt, orange), with 4 small orbiting category-colored badges (fitness/nutrition/biometrics/wellbeing icons, 32pt circles at their category color 16% bg) positioned at the tile's four corners
  - Heading: "Your knowledge graph awaits" (18–20pt Cabinet Grotesk Bold, white)
  - Body: "Start logging workouts, meals, mood, and more to see how everything connects. The graph grows richer with every entry." (14pt Switzer Regular, white 55%, max-width ~28rem)
  - Suggestion grid: 4 clay-inset chips (2×2 grid ≥640px, 1-column stacked below) — "Log a workout" (fitness icon+color), "Track a meal" (nutrition), "Check in on sleep" (biometrics), "Record your mood" (wellbeing)
- **Gestures**: Tap a suggestion chip deep-links to that feature's quick-log entry point (e.g. Meal Detail / Food Logger [29])
- **Size**: Full canvas area, content max-width ~24rem centered

---

## Node Categories (Color Map — Data Mode)

| Category | Color | Hex | Rationale |
|----------|-------|-----|-----------|
| Fitness | Burnt Orange (brand) | #FF5E00 | Movement / effort — the brand's primary hue anchors the most active category |
| Nutrition | Forest Green (brand) | #34A853 | Nourishment / growth — brand's secondary hue |
| Wellbeing | Royal Purple (brand) | #7F24FF | Mind / emotion — brand's AI/insight hue, fitting for the most reflective category |
| Hydration | Teal | #22C7C7 | Water — an intuitive, distinct cool hue |
| Biometrics | Soft Blue | #5B8DEF | Body signals / sleep — calm, clinical-adjacent without being cold |
| Goals | Amber-Gold | #F5B027 | Achievement — warm, aspirational |
| Intelligence | Light Violet | #B07CFF | AI insight — purple-family, visually distinct from Wellbeing's Royal Purple while still reading as "AI" |
| Coaching | Soft Orange | #FF9E4D | Coach warmth — orange-family, distinct from Fitness's Burnt Orange |
| Finance | Emerald | #10B981 | Money — deliberately distinct from Nutrition's Forest Green despite both being green-family |
| Documents | Indigo | #6D6AF0 | Records — cool, archival |

All ten are brand-anchored or controlled warm→cool extensions, each independently AA-legible against the ink-900 canvas. This is a deliberate departure from the single-hero-color rule that governs product screens (§3 60/30/10) — a 10-category legend cannot function as a legend with only 3 hues, so the Knowledge Graph is an **approved categorical-palette exception**, precedented by the Podium Colors exception (Screen 39) and the Domain Colors table (`_shared-patterns.md`) it is built from. Register purple (#7F24FF) still governs the screen's *chrome* (Architecture mode toggle, Data Sources section icon, Relationships panel accent, Node Tooltip/Modal purple touches) even though it is only one of ten node hues on canvas.

## Edge Types (Legend)

| Edge Type | Color | Line Style | Label | Meaning |
|-----------|-------|------------|-------|---------|
| Temporal | Neutral gray `#6B6B78` | Dashed | "Same-day" | Two entries logged on the same date — the weakest, most common relationship |
| Hierarchical | Dim neutral `#4A4A55` | Solid | "Belongs to" | Structural containment (e.g. a task belongs to a goal) |
| Causal | Orange `#FF7A2E` | Solid (animated flow, data mode only) | "Influences" | A detected cause→effect pattern (e.g. poor sleep → lower next-day strain) |
| Correlation | Purple-soft `#9F5BFF` | Dashed | "Correlated" | A statistical co-movement without established causality |
| Semantic | Green-soft `#4EDB8C` | Dotted | "Similar" | Content/topic similarity (e.g. two journal entries about the same theme) |

---

## Performance & Scale

Because the graph is assembled fresh from ~31 tables on every request rather than read from a pre-built store, this screen carries scale constraints that shape the design directly:

- **`maxNodes` is clamped server-side to 10–500, defaulting to 200.** The Filter Sidebar's live "{N} nodes" counter is the user's only signal that they're looking at a capped view — when a filter combination would return more than the cap, the response is silently truncated to the highest-`entryCount` nodes first (busiest categories survive the cut), and the Graph Header's node count reflects the truncated number, not the true total. This is a deliberate simplicity-over-completeness trade-off: a 500-node force graph on a 375pt-wide phone screen is unusable regardless of how it's capped.
- **Node aggregation, not raw entry rendering.** A node is never one database row — it's already a rollup of same-category, same-day (or same-kind) entries, which is why the Node Detail Modal's job (paginating the real rows back out) exists at all. This aggregation is what keeps node counts survivable even for power users with months of dense logging.
- **Debounced search (300ms) with request cancellation** is not just a UX nicety here — given the query fans out across ~31 tables per request, an un-debounced search-as-you-type would multiply backend load by every keystroke. The client aborts the in-flight request on every new keystroke rather than letting stale responses race the latest one.
- **Date range is the primary scale lever.** The 3 presets (Today/7 Days/30 Days) are ordered from cheapest-and-safest to progressively heavier; the Empty Graph State's Day-1 guidance and the Motivation Adaptation defaults both lean on this — a new or low-activity user is nudged toward a wider range (to find *any* data), while `maxNodes` protects a long-tenured, heavily-logging user from an unusable wall of nodes on the same wide range.
- **Physics cost is bounded, not the data cost.** `alphaDecay: 0.015` is tuned so the simulation settles in roughly 2–3 seconds even near the 200-node cap, on the assumption that the aggregation step (not the client-side physics) is the actual bottleneck on slower connections — the Loading Skeleton's copy ("Building your knowledge graph…") is honest about which half of the wait it's covering.
- **Export bypasses the render cap.** `GET /api/v1/intelligence/graph/export` accepts a `maxNodes` of up to 500 independent of the on-screen cap, so a power user who wants the fuller dataset for offline analysis (JSON) or a spreadsheet (CSV) is never blocked by the canvas's own rendering limits — this is why Export lives in the Graph Header as a first-class action, not buried in a menu.

---

## Layout — Architecture / Reasoning View

**Toggle**: Graph Header's Data/Architecture radio group, brain icon, royal-purple active fill

### ASCII Wireframe — Architecture View

```
┌───────────────────────────────────────────────────────┐
│                Status Bar (44pt)                       │
├───────────────────────────────────────────────────────┤
│ [Database][Brain*] 34 nodes · 58 edges                 │  ← Graph Header
│                                            [↻]          │     (no view-mode
├───────────────────────────────────────────────────────┤     toggle, no date
│                                                         │     range — this
│                    ●SIA Brain                           │     dataset is
│                   ╱  │  ╲                                │     fixed, not
│           ●Account  ●Career  ●Knowledge                 │     date-scoped)
│           ╱  ╲         ╲        │                        │
│      ●Contracts ●Trig  ●Levels  ●Graph                  │
│                                                         │
│    (node fill = status: green=active, gray=dormant,    │
│     darkest gray=never_used. brain=48r, hub=28r,        │
│     leaf=18r)                                            │
│                                                         │
│                                    ┌──────┐             │
│                                    │Legend│              │
│                                    │ ▸    │             │
│                                    └──────┘             │
├───────────────────────────────────────────────────────┤
│  Today  |  SIA  |  Goals  |  Career  |  Me            │  ← Tab Bar
├───────────────────────────────────────────────────────┤
│                Home Indicator (34pt)                    │
└───────────────────────────────────────────────────────┘
```

### Component Stack — Architecture View (deltas from Data view)

1. **Graph Header** — identical chrome, minus the Graph/Timeline/Cards view toggle (Architecture mode is graph-canvas-only) and minus the date range stat (this dataset isn't date-scoped — it's a fixed feature registry with live status)
2. **Filter Sidebar** — hidden entirely in this mode (there is nothing to filter by category/date; the dataset is small and fixed)
3. **Force-Directed Graph Canvas** — same physics engine, different data: a hierarchy of platform feature nodes (brain → hub → leaf) with `STATIC_CROSS_EDGES` layered on top for cross-feature relationships (e.g. "Career" `feeds_data` into "Knowledge Graph")
4. **Feature Node Popover** (replaces Node Detail Modal) — lighter-weight, since there's no entry list to page through: node label + health score (0–100) + status badge (active/dormant/never_used) + last-activity timestamp + "open feature" deep-link via the node's registered `route`

### Architecture Mode — Node & Edge Semantics

| Element | Encoding |
|---------|----------|
| Node radius (brain) | 48px — the root "SIA Brain" node, always centered |
| Node radius (hub) | 28px — mid-level feature groupings (e.g. "Accountability," "Career") |
| Node radius (leaf) | 18px — individual features (e.g. "Contracts," "Levels") |
| Status: active | Forest Green `#34A853` fill — the feature has recent activity |
| Status: dormant | Muted neutral `#6B6B78` fill — registered but inactive recently |
| Status: never_used | Darkest neutral `#3A3A44` fill — the user has never touched this feature |
| Edge: coach_manages | Royal Purple `#7F24FF` — SIA directly owns/orchestrates this feature |
| Edge: feeds_data | Soft Blue `#5B8DEF` — one feature's data flows into another's context |
| Edge: user_correlates | Purple-soft `#9F5BFF` — user behavior links the two features |
| Edge: conflicts_with | Red `#F04438` (reserved, non-brand hue — used only for this diagnostic signal) — the two features have detected contradictory state |
| Edge: supports | Forest Green `#34A853` — one feature reinforces another |
| Edge: requires | Burnt Orange `#FF5E00` — one feature is a prerequisite for another |

This overlay is explicitly a diagnostic/self-awareness view (it doubles as the platform's own graph-validation surface — orphan nodes and weakly-connected features surface here first) more than a consumer-facing analytics view, so its legend and interactions are intentionally sparser than the Data view.

---

## Typography

| Element | Font | Weight | Size | Line Height | Color | Notes |
|---------|------|--------|------|-------------|-------|-------|
| Header live stat number | Cabinet Grotesk | 700 (Bold) | 13–14pt | 1.0 | White #FFFFFF | Tabular nums, "142 nodes" |
| Header live stat label | Switzer | 400 (Regular) | 13pt | 1.0 | White at 45% | "nodes", "edges" |
| Header date range | Switzer | 400 (Regular) | 13pt | 1.2 | White at 45% | "Jul 1 – Jul 8, 2026" |
| Sidebar section eyebrow | Cabinet Grotesk | 600 (SemiBold) | 11pt | 1.0 | White at 45% | Uppercase, wide tracking |
| Sidebar preset pill | Switzer | 500 (Medium) | 12pt | 1.0 | White at 45% / orange active | "Today", "7 Days", "30 Days" |
| Sidebar category label | Switzer | 500 (Medium) | 12pt | 1.3 | White at 80% active / 35% inactive | |
| Sidebar count badge | Cabinet Grotesk | 700 (Bold) | 10pt | 1.0 | White at 80% | Tabular nums, pill |
| Sidebar search placeholder | Switzer | 400 (Regular) | 14pt | 1.4 | White at 30% | |
| Node Tooltip label | Switzer | 600 (SemiBold, via Body Emphasis) | 13pt | 1.3 | White #FFFFFF | Truncated single line |
| Node Tooltip meta | Switzer | 400/500 (Regular/Medium) | 11pt | 1.3 | White 55% / category color | Category · count · date |
| Node Detail Modal counter | Cabinet Grotesk | 600 (SemiBold) | 11pt | 1.0 | White at 45% | Tabular nums, "3 / 12" |
| Node Detail Modal node label | Cabinet Grotesk | 700 (Bold) | 18pt | 1.2 | White #FFFFFF | Hero title |
| Node Detail category pill | Switzer | 500 (Medium) | 11pt | 1.0 | Category color | Pill text |
| Entry Card label | Switzer | 500 (Medium) | 14pt | 1.3 | White #FFFFFF | Single line, truncated |
| Entry Card date | Switzer | 400 (Regular) | 10pt | 1.0 | White at 35% | |
| Entry Card detail chip | Switzer | 400 (Regular) | 11pt | 1.2 | White at 55% | e.g. "32 min", "+45 XP" |
| Pagination caption | Switzer | 400 (Regular) | 11pt | 1.3 | White at 40% | "Showing 1–8 of 18" |
| Relationships eyebrow | Cabinet Grotesk | 600 (SemiBold) | 10pt | 1.0 | White at 45% | Uppercase, wide tracking |
| Relationship neighbor label | Switzer | 400 (Regular) | 11pt | 1.3 | White at 70% | Truncated |
| Relationship strength value | Cabinet Grotesk | 600 (SemiBold) | 10pt | 1.0 | White at 45% | Tabular nums, "82%" |
| Legend header | Cabinet Grotesk | 600 (SemiBold) | 12pt | 1.0 | White at 70% | "Legend" |
| Legend row label | Switzer | 400 (Regular) | 11pt | 1.3 | White at 70% | Category / edge-type names |
| Empty state heading | Cabinet Grotesk | 700 (Bold) | 18–20pt | 1.2 | White #FFFFFF | |
| Empty state body | Switzer | 400 (Regular) | 14pt | 1.5 | White at 55% | Max ~28rem width |
| Loading skeleton caption | Switzer | 400 (Regular) | 14pt | 1.4 | White at 55% | Pulses in sync with dots |

---

## Composition & Visual Hierarchy

**Squint test**:
- The Force-Directed Graph Canvas is unambiguously the screen's entire visual weight — it fills the viewport and every other element (header, sidebar, legend) is deliberately chrome-thin so the data itself dominates.
- Node color variety (10 distinct hues) is intentional visual complexity — it is the legend, not decoration. The eye should be able to spot "which category has the most nodes" (larger, denser clusters) within a second of looking.
- The Data/Architecture toggle in the header is the single most important control on the screen and gets the strongest color contrast (orange vs. purple fill) precisely because switching datasets entirely changes what's on screen — the user must never be confused about which mode they're in.
- The Filter Sidebar recedes into a warm-dark panel distinctly cooler in visual weight than the canvas — its job is utility, not spectacle, and its glowing category dots are the only saturated color inside it besides the search focus ring.
- The Node Detail Modal, when open, is the clear focal point via backdrop-dim + blur — everything behind it (canvas, sidebar, tab bar) recedes to near-invisibility, consistent with the Modal Presentation pattern's role across the app.
- Royal-purple appears sparingly outside of Architecture mode — only on the Wellbeing node color (one of ten), the Data Sources sidebar section icon, and the Relationships panel accent — never competing with the graph's own categorical palette for "which color means AI."

**Spacing breakdown (8pt grid)**:
- Graph Header height: 52pt (single row) / 104pt (wrapped, <640pt)
- Filter Sidebar width: 288pt open / 44pt collapsed (desktop); full-width bottom drawer (mobile)
- Sidebar internal section gap: 20pt (--s-5 approximated)
- Sidebar category row height: 40pt with 2pt inter-row gap
- Canvas has zero internal padding — it is edge-to-edge within its container
- Node Tooltip offset from cursor: 16pt (flips to -12pt−width when clamped)
- Node Detail Modal padding: 20–24pt horizontal, 20pt vertical sections separated by 1pt hairlines
- Graph Legend inset from viewport edge: 16pt (bottom, right)
- Filter FAB inset from viewport edge: 16pt (bottom, left)
- Last content to tab bar: N/A (canvas is edge-to-edge to the tab bar)
- Tab bar: 56pt + 34pt safe area

**Z-layers**:
- z-0: ink-900 canvas background
- z-5: Force-Directed Graph Canvas (SVG content — nodes, edges, edge labels)
- z-10: Graph Legend, Node Tooltip (transient, follows pointer)
- z-15: Filter Toggle FAB (mobile)
- z-20: Filter Sidebar (desktop panel / mobile drawer)
- z-30: Graph Header (sticky, backdrop-blur)
- z-40: Bottom Tab Bar
- z-50: Node Detail Modal + its backdrop
- z-60: Entry Detail Modal (stacks above Node Detail Modal)
- z-70: Export format dropdown (transient popover)

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Canvas + base |
| Sidebar panel | `linear-gradient(180deg, #120904, #0A0A0F)` | ink-warm | Deliberately warm, not blue |
| Modal surfaces | `linear-gradient(180deg, #1A1209, #100A05)` | ink gradient | Node Detail / Entry Detail modals |
| Data mode toggle active | #FF5E00 | orange (primary) | Database icon fill |
| Architecture mode toggle active | #7F24FF | royal-purple (register/AI) | Brain icon fill |
| View mode toggle active | #FF5E00 | orange (primary) | Graph/Timeline/Cards |
| Sidebar Data Sources icon | #7F24FF at 80% | royal-purple (register/AI) | Signals "feeds the AI" |
| Sidebar preset/filter active | #FF5E00 | orange (primary) | Time range + category interactions |
| Node: Fitness | #FF5E00 | orange (brand, category) | |
| Node: Nutrition | #34A853 | forest-green (brand, category) | |
| Node: Wellbeing | #7F24FF | royal-purple (brand, category) | |
| Node: Hydration | #22C7C7 | teal (categorical extension) | |
| Node: Biometrics | #5B8DEF | soft-blue (categorical extension) | |
| Node: Goals | #F5B027 | amber-gold (categorical extension) | |
| Node: Intelligence | #B07CFF | light-violet (categorical extension) | |
| Node: Coaching | #FF9E4D | soft-orange (categorical extension) | |
| Node: Finance | #10B981 | emerald (categorical extension) | |
| Node: Documents | #6D6AF0 | indigo (categorical extension) | |
| Edge: temporal | #6B6B78 | neutral | Dashed |
| Edge: hierarchical | #4A4A55 | dim neutral | Solid |
| Edge: causal | #FF7A2E | orange-adjacent | Solid, animated in data mode |
| Edge: correlation | #9F5BFF | purple-soft | Dashed |
| Edge: semantic | #4EDB8C | green-soft | Dotted |
| Relationships panel accent | #7F24FF | royal-purple (register/AI) | Share icon, eyebrow |
| Node Detail category pill | Category color at 15% bg | -- | Matches clicked node |
| Empty state icon | #FF5E00 | orange (primary) | Central network icon |
| Loading skeleton dots | Category colors | -- | Fitness/nutrition/wellbeing/biometrics/hydration/goals |
| Filter FAB | #FF5E00 | orange (primary) | Mobile filter re-open |
| Architecture: active status | #34A853 | forest-green | Feature node fill |
| Architecture: dormant status | #6B6B78 | neutral | Feature node fill |
| Architecture: never_used status | #3A3A44 | darkest neutral | Feature node fill |
| Architecture: conflicts_with edge | #F04438 | reserved red | Diagnostic-only, non-brand |
| Primary text | #FFFFFF | white | Node labels, modal titles |
| Secondary text | white at 55–70% | -- | Descriptions, meta |
| Tertiary text | white at 40–45% | -- | Captions, eyebrows |
| Quaternary text | white at 30–35% | -- | Placeholders, disabled |

**60/30/10 verification**: This screen is the platform's one deliberate, documented exception to the single-hero-color rule — see "Node Categories" above for the rationale. Within the screen's own *chrome* (everything that is not a graph node), the standard ratio holds: orange drives every interactive control — mode toggle default state, view toggle, filter presets, category toggle active states, refresh, the empty-state icon, and the filter FAB. Royal-purple is deliberately confined to genuine AI/register moments — the Architecture mode toggle, the sidebar's "Data Sources" section icon, and the Relationships panel — never exceeding roughly 10% of the chrome's visual weight, exactly mirroring its role on every other screen. Forest-green appears in chrome only as one of the ten node hues (Nutrition) and as the Architecture mode's "active" status color — it does not drive any control on this screen. The ten-hue node palette itself is scoped strictly to the canvas and is called out explicitly as a categorical-encoding exception, not a violation of brand discipline.

---

## Interaction States

### Graph Header Mode/View Toggles
| State | Visual | Haptic |
|-------|--------|--------|
| Inactive | Transparent bg, white at 45% icon | -- |
| Active (Data) | Orange fill, white icon, orange glow shadow | Medium impact |
| Active (Architecture) | Purple fill, white icon, purple glow shadow, purple focus ring | Medium impact |
| Focus-visible | 2pt orange/purple ring per active hue, offset 2pt | -- |

### Filter Sidebar Category Row
| State | Visual | Haptic |
|-------|--------|--------|
| Active (included in filter) | White 4% bg, full-opacity dot + label, ping-animate on the dot | -- |
| Inactive (excluded) | 40% opacity overall | -- |
| Hover | Background lightens to white 7% | -- |
| Pressed | Toggle state flips immediately | Light impact |

### Force-Directed Graph Node
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Radial-gradient fill, base opacity, connected edges at base opacity | -- |
| Hover | Node scales slightly, connected nodes/edges to full opacity, unconnected nodes fade to 8% opacity, unconnected labels fade to 4%, hovered edge labels reveal | -- (desktop only) |
| Selected/focused | Persistent highlight ring, camera pans + zooms to center it + its neighbors | Light impact (on tap) |
| Dragged | Follows pointer, simulation reheats (alphaTarget 0.3) while held, cools (alphaTarget 0) on release | -- |
| Touch (no hover) | Tap once highlights connected subgraph (same as hover), tap elsewhere clears the highlight | Light impact |

### Node Detail Modal
| State | Visual | Haptic |
|-------|--------|--------|
| Opening | Backdrop fades in, modal scales 0.92→1 + translateY 24→0 | Light impact |
| Prev/Next | New node's data crossfades in, counter updates | Light impact |
| Loading entries | Entry Card list shows skeleton rows | -- |
| Closing | Reverse of opening | -- |

### Export Menu
| State | Visual | Haptic |
|-------|--------|--------|
| Closed | Download icon + "Export" label | -- |
| Open | Chevron rotates 180deg, 2-item dropdown appears | Light impact |
| Exporting | Spinner replaces download icon, disabled | -- |

### Legend Panel
| State | Visual | Haptic |
|-------|--------|--------|
| Collapsed | Header row only, up-chevron | -- |
| Expanded | Full 3-section content, down-chevron, internal scroll if >45vh | Light impact (on toggle) |

### Timeline Row (view mode alternate)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Category-tinted icon tile, standard text weights | -- |
| Pressed | Row bg white at 5%, scale(0.99) | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Card (Cards view mode alternate)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Standard card, category dot + count + sparkline | -- |
| Hover (desktop) | Card lifts -3pt, category-color corner glow fades in | -- |
| Pressed | scale(0.98) | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Data/Architecture Toggle — Transition
| State | Visual | Haptic |
|-------|--------|--------|
| Switching to Architecture | Sidebar slides out (200ms), canvas crossfades to the fixed feature-registry dataset, header date-range stat disappears | Medium impact |
| Switching to Data | Sidebar slides back in, canvas crossfades to the federated life-data dataset, header date-range stat reappears | Medium impact |

---

## Gesture Map

| Gesture | Target | Action |
|---------|--------|--------|
| Drag | Canvas background | Pan the graph |
| Pinch / scroll wheel | Canvas | Zoom in/out |
| Drag | A node | Reposition it (simulation reheats, cools on release) |
| Hover (desktop) | A node | Highlight connected subgraph, fade unconnected to low opacity, show Node Tooltip |
| Tap/click | A node | Open Node Detail Modal, camera pans + zooms to focus it + its 1-hop neighbors |
| Tap/click | Empty canvas | Deselect / clear focus, camera returns to default framing |
| Type (debounced 300ms) | Search input | Re-query filtered graph, cancels in-flight request on newer keystroke |
| Tap | Time range preset pill | Set date range to Today/7 Days/30 Days, re-fetch |
| Tap | Custom date input | Override range with a specific from/to date, re-fetch |
| Tap | Category toggle row | Include/exclude that category, re-fetch |
| Tap | Sidebar collapse chevron (desktop) | Collapse to icon rail / expand back to full panel |
| Tap | Filter FAB (mobile) | Open bottom-drawer Filter Sidebar |
| Swipe down / tap backdrop | Filter drawer (mobile) | Dismiss |
| Tap | Data/Architecture toggle | Switch dataset + canvas physics, sidebar hides/shows accordingly |
| Tap | Graph/Timeline/Cards toggle | Switch the entire content view (Timeline and Cards views render the same federated data as a chronological list / card grid respectively, outside this screen's canvas-focused scope) |
| Tap | Refresh | Re-fetch the current filter state |
| Tap | Export → JSON/CSV | Download the current filtered graph in that format |
| Tap | Node Detail Modal prev/next | Navigate to the adjacent node in the current render order |
| Tap | Type filter chip (modal) | Narrow the entry list to one entry type |
| Tap | Entry Card | Open Entry Detail Modal (secondary) |
| Tap | Relationship row | Re-focus the graph on that neighbor node |
| Tap | "view source" (Entry Detail) | Push the originating feature screen |
| Tap | Close / backdrop | Dismiss Node Detail Modal (and any stacked Entry Detail Modal) |
| Tap | Legend header | Expand/collapse |
| Tap | Empty Graph suggestion chip | Deep-link to that feature's quick-log entry point |
| Tap | Timeline row (Timeline view mode) | Open Entry Detail Modal directly (skips node aggregation) |
| Tap | Card (Cards view mode) | Open Node Detail Modal for that category's node |
| Scroll | Timeline view | Standard vertical scroll, Date Group Headers stick |
| Scroll | Cards view | Standard vertical scroll, grid reflows at breakpoints |

---

## Data Freshness & Consistency

- **No caching layer between the user and their own data.** Every load reflects the exact current state of the ~31 source tables — log a workout, switch to this screen, and it appears on the very next fetch (subject to the standard refetch triggers below), with no stale-cache window to explain away. The trade-off is the aggregation cost described under Performance & Scale; the platform accepts that cost specifically so this screen never has to caveat "may be a few minutes behind."
- **Refetch triggers**: mount, explicit tap on Refresh, any filter change (search, date range, category toggle), mode switch (Data ↔ Architecture), and — for the Architecture overlay specifically — its own independent `featureStateService` + `graphValidationService` calls, so a feature's health score updates on the same cadence as the rest of the platform's proactive-intelligence surfaces.
- **Optimistic UI does not apply here.** Unlike a habit checkbox or a task-complete toggle elsewhere in the app, there is no local mutation this screen performs — it is a pure read surface. The one exception is node repositioning via drag, which is client-side-only physics state (not persisted) and resets to the simulation's natural layout on the next refetch.
- **Consistency across view modes**: Graph, Timeline, and Cards views are guaranteed to show the same underlying entry set for a given filter state (they share one fetch), so a user switching between them mid-session never sees a count mismatch — the only variable is presentation, never data.

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Node entrance | Graph mount / re-fetch | Staggered fade + scale-in: hub/high-entry-count nodes first (0ms), satellite/low-entry-count nodes follow (staggered ~15–20ms each) | 280–400ms | ease-out-soft |
| Simulation settling | Graph mount / re-fetch | Force simulation runs from `alpha(1)` decaying at `alphaDecay: 0.015` until nodes reach a stable layout — visually reads as a brief "settling wiggle" before the graph goes still | ~2–3s to settle | Physics-driven (not eased) |
| Node drag reheat | Drag start | Simulation `alphaTarget` jumps to 0.3, nodes around the dragged node visibly react/repel | Continuous while dragging | Physics-driven |
| Node drag cool-down | Drag release | `alphaTarget` returns to 0, simulation settles again | ~1s | Physics-driven |
| Zoom/pan | Scroll/pinch/drag | Direct 1:1 transform follow (no easing during the gesture itself) | Real-time | Linear (gesture-driven) |
| Zoom/pan reset | Mode switch / explicit reset | Transitions to the default centered transform (0.65× desktop / 0.45× mobile) | 600ms | ease-out |
| Node-hover highlight | Hover a node (desktop) | Connected nodes/edges animate to full opacity; unconnected nodes fade to 8% opacity, unconnected node labels fade to 4%, edges fade proportionally; hovered edge labels reveal (opacity 0→1) | ~200–280ms | ease-out-soft |
| Node-hover un-highlight | Pointer leaves node | Reverse of hover — all nodes/edges return to base opacity | ~200–280ms | ease-out-soft |
| Click-to-focus | Click a node | Camera pans + zooms (via the same 600ms transform transition) to center the clicked node and its 1-hop neighbors; simultaneously, the hover-highlight rule applies so non-neighbor nodes fade | 600ms | ease-out |
| Loading skeleton dots | While fetching | Per-dot opacity pulse (`animate-pulse`), staggered delay per dot (0/0.2/0.4/0.6/0.8/0.1s) | Continuous loop | ease-in-out |
| Empty state entrance | Mount (Day 1) | Central icon + orbit badges fade/scale in, suggestion chips follow staggered | 280–400ms | ease-out-soft |
| Node Detail Modal | Open | Backdrop opacity 0→1; modal scale 0.92→1 + translateY 24→0, spring | 400ms | Spring (bounce 0.15) |
| Node Detail Modal | Close | Reverse of open | 280ms | ease-out-soft |
| Node Detail Modal | Prev/Next navigation | Content crossfades (hero, entry list, relationships) | 200ms | ease-out-soft |
| Entry Card list | Page change | List crossfades | 160ms | ease-out-soft |
| Filter Sidebar | Expand/collapse (desktop) | Width animates 44pt↔288pt, content fades in/out | 250ms | ease-out-soft |
| Filter drawer (mobile) | Open | Spring slide-up from bottom (`y: '100%' → 0`) + backdrop fade | Spring (damping 25, stiffness 300) | Spring |
| Filter drawer (mobile) | Close | Reverse | 250ms | ease-out-soft |
| Category toggle dot | Toggle active | Ping-ring animation (opacity 0.2, scale pulse), respects `motion-reduce:hidden` | Continuous while active | ease-out |
| Legend expand/collapse | Tap header | Height 0↔auto + fade | 250ms | ease-out-soft |
| Mode switch (Data ↔ Architecture) | Toggle tap | Canvas crossfades old dataset out / new dataset's entrance animation in; sidebar slides out/in | 280ms | ease-out-soft |
| Export dropdown | Open/close | Fade + scale-in from trigger, fade-out on close | 160ms | ease-out-soft |

**Reduced-motion**: The simulation's physics-driven settling and drag-reheat behavior is inherent to the force layout and remains (it's functional, not decorative), but all *decorative* loops are dropped under `prefers-reduced-motion`: category-dot ping animations, loading-skeleton pulse becomes a static "Loading…" label change only, empty-state orbit-badge entrance collapses to instant opacity, and the click-to-focus zoom transition duration drops to near-instant (reduced from 600ms).

**Screen transition**:
- **Enter**: Dashboard tab switch (crossfade, no slide) when reached via the Intelligence tab; standard stack push slide-in-from-right when reached via Explore Section [18] or a deep-link
- **Exit**: Reverse of entry method

---

## Empty States

### Day 1 — No data in selected range
- Full Empty Graph State (component detailed above) replaces the canvas. Filter Sidebar remains visible and functional — changing the date range or clearing category filters can resolve the empty state without leaving the screen.
- Graph Header still shows "0 nodes · 0 edges" honestly rather than hiding the stat row.
- Legend and Filter FAB remain visible but the Legend has nothing to decode yet (still shows the static category/edge key, since that's informational regardless of current data).

### Loading (any range change, initial mount, or manual refresh)
- Graph Loading Skeleton (component detailed above) replaces the canvas content. Header stats show the previous values dimmed (50% opacity) until the new response lands, avoiding a jarring "0 nodes" flash during a refresh of an already-populated graph.

### Search yields no matches
- Canvas shows a lightweight variant of the empty state: just the central network icon + "No nodes match '{query}'" (16pt Cabinet Grotesk Bold) + "Try a different search term or clear your filters." (13pt Switzer, white 50%) + a "clear search" text link (orange). No orbit badges or suggestion chips (those are reserved for the true Day-1 empty state).

### Architecture mode — no feature-health data yet
- Extremely unlikely (the feature registry is static and always renders), but if `featureStateService` returns no states for a brand-new account, all nodes render in the `never_used` (#3A3A44) tone rather than defaulting to a misleadingly "active" green — the graph structure itself still renders so the user can see the platform's shape even with zero personal history.

### Node Detail Modal — node has zero entries (edge case, e.g. a stale focusNodeId)
- Body shows a centered message: "No entries to display" (14pt Switzer, white 40%), Relationships panel still renders if edges exist independent of entry count.

---

## Motivation Adaptation

- **Low motivation**: Empty Graph State's suggestion chips are limited to the single easiest action (e.g. just "Record your mood" rather than all 4), reducing decision fatigue. The Filter Sidebar defaults to a 7-day range instead of Today, so a low-activity user is more likely to see *something* connected rather than an immediate empty state. SIA-authored copy in the empty state leans encouraging over instructional ("Every entry adds a thread — start with whatever's easiest today").
- **Medium motivation**: Standard experience as described. Default range is 7 days, all 4 suggestion chips shown, full sidebar functionality.
- **High motivation**: Filter Sidebar defaults to 30 days to show a richer, more impressive graph immediately. Graph Header surfaces an additional stat: "N new connections this week" (a delta on edge count vs. the prior period). Node Detail Modal's Relationships panel is expanded to show up to 20 relationships instead of the capped 12. Architecture mode becomes more discoverable — a subtle purple pulse on the mode toggle the first few times this screen is opened, inviting the power-user behavior of inspecting SIA's own reasoning.

---

## Accessibility

A force-directed graph is one of the least inherently accessible UI shapes on the platform — free-floating spatial position carries meaning that a screen reader cannot infer, and precise drag/pan/zoom gestures assume fine motor control. This screen's non-negotiables (per §7.1 accessibility-is-part-of-premium):

- **Cards view is the accessible-by-default alternate**, not an afterthought bolt-on. It carries the same data with zero motion and zero spatial reasoning, and it is one tap away from the Graph Header at all times — screen-reader users and users navigating by keyboard should be steered toward it, and Timeline view offers a second, chronological-not-spatial alternate.
- **Keyboard navigation**: All header toggles (Data/Architecture, Graph/Timeline/Cards), Filter Sidebar controls, category rows, Legend header, and the mobile Filter FAB are native `<button>`/`role="radio"` elements with visible focus rings (2pt orange/purple per active hue, offset 2pt) and full Tab/Enter/Space support. The canvas itself is not meaningfully keyboard-navigable (an open problem shared by every force-graph implementation); Cards view is the prescribed keyboard-first path to the same content, and each Card is a fully focusable, Enter-activatable element.
- **Screen reader labelling**: Mode/view toggles use `role="radiogroup"` + `aria-checked`; the Loading Skeleton carries `role="status"` + `aria-live="polite"` so "Building your knowledge graph…" is announced without interrupting; the Node Detail Modal is `role="dialog"` with an `aria-label` built from the node's own label ("{label} details"); prev/next/close controls all carry explicit `aria-label`s (not icon-only silence).
- **Contrast**: All ten node hues (and all five edge-type hues) were selected to be independently AA-legible as text/UI-element color against the ink-900 canvas at their "active" opacity — not just as a color-blind-adjacent decorative palette. Category identification never relies on color alone: every node category also has a text label (Filter Sidebar row, Legend row, Node Detail Modal pill, Node Tooltip line) and every edge type also has a distinct line style (dashed/solid/dotted) independent of its color.
- **Reduced motion**: Covered in full under Motion above — physics-driven simulation settling remains (it is functional positioning, not decoration) but every purely decorative loop (ping dots, orbit-badge entrances, skeleton pulse styling) is dropped, and transition durations that remain (zoom/pan, modal open/close) are cut to near-instant.
- **Touch targets**: Every tappable control (toggle segments, category rows, chips, modal nav buttons, Legend header, FAB) meets the platform's 44×44pt minimum touch target even where the visible glyph is smaller — consistent with the Back Button and Toggle Switch precedents established across the design system.

---

## Notification & Error Feedback

This screen's actions are almost entirely read/navigate, but the handful of network-dependent actions still need designed success/failure states rather than silent success or a swallowed error:

| Action | Success feedback | Failure feedback |
|--------|-------------------|-------------------|
| Refresh | Header stats update in place, no toast (the updated numbers ARE the confirmation) | Toast: "Couldn't refresh the graph — try again" (error-red accent), previous data remains on screen (never blanks to empty on a failed refresh) |
| Export (JSON/CSV) | Toast: "Graph exported" (forest-green accent, checkmark icon), file downloads / share sheet opens | Toast: "Couldn't export — try again" (error-red accent), export menu stays available for retry |
| Search | No toast — result count updates live in the sidebar and on canvas | If the search query itself errors server-side (rare — malformed input), the sidebar search field gets a 2pt error-red border + inline caption below it, canvas keeps the last valid result set |
| Initial load / filter change | No toast — Graph Loading Skeleton communicates in-progress, then content replaces it | If the federated aggregation call fails outright, the canvas area shows a lightweight inline error card (warning icon + "Couldn't load your graph" + "retry" button) — not a full-screen error takeover, since the Filter Sidebar and Graph Header remain fully usable |
| Architecture overlay load | No toast — same skeleton pattern | Same inline error card pattern, scoped to the canvas only |

All toasts follow the platform-standard toast component (bottom-anchored, auto-dismiss ~3s, swipe-to-dismiss, one at a time — a second triggered toast replaces rather than stacks).

---

## Cross-References

- **Navigates to**: Entry Detail Modal (secondary modal from Entry Card tap), originating feature screens via "view source" (Workout Detail [27], Meal Detail [29], Goal Detail [14], Journal [37], and others per entry type), SIA Chat [09] (tab switch, when a node/relationship is asked about via an "ask SIA" affordance), Feature routes via Architecture mode's "open feature" deep-link (e.g. Screen 46 Accountability, Screen 64 Career Dashboard — the reasoning graph's own node registry literally points back at this document set)
- **Navigates from**: Dashboard "Intelligence" tab (tab switch), Explore Section [18] via "Knowledge Graph" tile, SIA Chat [09] deep-link with `focusNodeId`, any entry detail screen's "view in graph" shortcut
- **Shared components with**: Screen 46 — Accountability (Modal Presentation language, collapsible section pattern for the Legend), Screen 48 — Intelligence Dashboard (Royal Purple register precedent, SIA-authored copy tone), Screen 13 — Goals List (Filter Chip Row lineage for the sidebar preset pills and Node Detail type filter chips), Screen 25 — Help Center (Search Bar pattern, debounced-search precedent), Screen 41 — Schedule/Calendar (date-range picker lineage), Screen 39 — Leaderboard (Podium Colors precedent for this screen's categorical-palette exception)
- **Patterns used**: Modal Presentation (Batch 1, adapted to a centered spring-entrance variant rather than bottom-sheet slide, since this content is desktop-dense detail rather than a mobile-first form), Filter Chip / Filter Tab Row (Screen 13), Search Bar (Screen 25, debounced 300ms per §4.1 platform standard), Expandable/Collapsible Section (Screen 14, applied to the Legend), Section Eyebrow Label (Screen 12), Segmented Control language (adapted to icon-only radio groups for the mode/view toggles), FAB (Screen 13, adapted for the mobile Filter Toggle)
- **Patterns established**: Force-Directed Graph Canvas (D3 force-simulation + zoom/pan/drag on an SVG surface, the platform's first physics-driven visualization), Categorical Node Palette (10-hue exception to the 60/30/10 single-hero-color rule, explicitly documented as approved and scoped to graph canvases only), Node Tooltip (transient, viewport-clamped hover preview), Node Detail Modal (paginated multi-entry drill-down + live Relationships panel, centered spring-entrance variant of Modal Presentation), Graph Legend (collapsible, 3-section: nodes/edges/size), Graph Loading Skeleton (physics-shaped shimmer, distinct from the generic skeleton pattern used elsewhere), Empty Graph State (orbit-badge composition + scoped quick-log suggestions), Data/Architecture Mode Toggle (dual-dataset-same-canvas pattern — precedent for any future screen that needs to render two related but distinct datasets through one visualization), Federated Read-Time Data Source Convention (the documentation convention itself — "API — federated read-time aggregation, not a persisted graph" — for any future screen whose data has no single backing table)
