# Screen Design: Goals List (Mission Board)

**Screen**: 13 of 74
**File**: 13-goals-list.md
**Register**: Product Mode
**Primary action**: Tap a mission card to view its detail
**Tab**: Goals (tab root)
**Navigation**: Goals tab root screen. Stack depth 0. Accessed via bottom tab bar. Contains the "+" FAB to create new missions. Header icons provide access to Mission Journal [73] and domain filter.

---

## Purpose

The Mission Board is mission control — a single view of every mission the user is pursuing, organized by type and status. Its job is to let users scan their missions at a glance, check progress, identify chain positions, and quickly act on the most urgent next step. The two-tier filter system separates mission types from status, while SIA surfaces intelligent suggestions based on radar imbalance. Pinned missions float above the main list for top-priority focus.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Mission cards with progress rings — the dominant visual pattern, repeating vertically
2. "your missions" screen title + header icons — RPG framing, quick access to journal and filters
3. Type filter chips + status segmented control — two-tier control mechanism
4. Pinned missions section — user's top 3 priorities, elevated above main list
5. Mission type badges + chain indicators — classification and progress context per card
6. SIA Suggestions section (collapsible) — AI-generated mission recommendations
7. FAB "+" button — persistent creation entry point, visually prominent (orange circle)
8. Life Areas radar preview card — gateway to the holistic view

**User flow**:
- **Arrives from**: Bottom tab bar (Goals tab), Home Screen [12] via tab switch ("view all missions" link)
- **Primary exit**: Mission Detail [14] via stack push (tap mission card)
- **Secondary exits**: Create Mission [15] via modal present (tap FAB "+"), Life Areas Overview [16] via stack push (tap radar preview card), Mission Journal [73] via stack push (tap journal icon in header)

---

## Layout

**Scroll behavior**: FlatList (homogeneous mission cards, potentially many items, needs virtualized rendering). Pinned section and SIA suggestions are sticky/non-virtualized header components.
**Tab bar visible**: Yes

### ASCII Wireframe

```
┌─────────────────────────────┐
│      Status Bar (44pt)      │
├─────────────────────────────┤
│                             │
│  your missions    📖  🔽   │  ← 28pt title + journal icon + filter icon
│                             │  ← 8pt gap
│  ┌─────────────────────────┐│
│  │ [All][Life][Main][Side] ││  ← type filter chips, horizontal scroll
│  │ [Weekly][Daily]         ││
│  └─────────────────────────┘│
│                             │  ← 8pt gap
│  [ Active  |  Done  |  All ]│  ← status segmented control
│                             │  ← 16pt gap
│  ┌───────────────────────┐  │
│  │  ╭─╮  Life areas      │  │  ← mini radar chart card
│  │  │◇│  overview  ›     │  │
│  │  ╰─╯                  │  │
│  └───────────────────────┘  │
│                             │  ← 16pt gap
│  PINNED                     │  ← eyebrow (only if pinned missions exist)
│  ┌───────────────────────┐  │
│  │ ◯   Run a half     📌│  │  ← pinned mission card
│  │68%  marathon           │  │
│  │     🥈main 🔴fitness   │  │  ← type badge + domain tag
│  │     Next: 5K tempo run │  │  ← next action
│  │     ⚡ 340 XP 🔥12d  🟢│  │  ← XP + streak + difficulty dot
│  │     ●──●──◉──○  2 of 4│  │  ← chain progress bar
│  └───────────────────────┘  │
│                             │  ← 12pt gap
│  ▸ SIA SUGGESTIONS (2)     │  ← collapsible (default collapsed)
│                             │  ← 16pt gap
│  ┌───────────────────────┐  │
│  │ ◯   Save $5,000       │  │  ← mission card (not pinned)
│  │42%  by December        │  │
│  │     🥉side 🟢finance   │  │
│  │     Next: Review subs  │  │
│  │     ⚡ 180 XP 🔥5d   🟠│  │
│  └───────────────────────┘  │
│                             │  ← 12pt gap
│  ┌───────────────────────┐  │
│  │ ◯   Meditate daily    │  │
│  │25%  for 30 days        │  │
│  │     🟩daily 🟣medit.   │  │
│  │     Next: 10min session│  │
│  │     ⚡ 50 XP  🔥7d   🟢│  │
│  └───────────────────────┘  │
│                             │
│                        ┌──┐ │
│                        │+ │ │  ← FAB, bottom-right
│                        └──┘ │
├─────────────────────────────┤
│  [Today]  [SIA] [Goals] [Me]│  ← tab bar (56pt)
├─────────────────────────────┤
│    Home Indicator (34pt)    │
└─────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Screen Title + Header Icons** — 28pt text + icons + 16pt top padding = 44pt
   - Purpose: RPG-framed heading + quick access to journal and domain filter
   - Content: "your missions" title (left) + journal icon + filter icon (right)

2. **Type Filter Chips Row** — 36pt chips + 8pt bottom gap = 44pt
   - Purpose: Filter missions by type (scope)
   - Content: Horizontal scrollable chip row

3. **Status Segmented Control** — 36pt + 16pt bottom gap = 52pt
   - Purpose: Filter missions by completion status
   - Content: 3-segment pill control

4. **Life Areas Radar Preview Card** — 64pt + 16pt bottom gap = 80pt
   - Purpose: Gateway to holistic life balance view
   - Content: Mini radar chart + "Life areas overview" label + chevron

5. **Pinned Missions Section** — variable (eyebrow 16pt + up to 3 cards at ~148pt each + 12pt gaps)
   - Purpose: User's top-priority missions elevated above main list
   - Content: Eyebrow label + pinned mission cards (max 3)
   - Conditional: only renders when user has at least 1 pinned mission

6. **SIA Suggestions Section** — 48pt collapsed, variable expanded
   - Purpose: AI-generated mission recommendations
   - Content: Collapsible header + suggestion cards when expanded
   - Conditional: only renders when SIA has pending suggestions

7. **Mission Card List** — variable (~148pt per card, 12pt gaps)
   - Purpose: The primary content — all non-pinned missions
   - Content: FlatList of Mission Cards

8. **FAB** — 56pt (floating, positioned above tab bar)
   - Purpose: Persistent mission creation entry point
   - Content: "+" icon in orange circle

9. **Bottom Spacer** — 72pt (56pt FAB overlap zone + 16pt breathing room)
   - Purpose: Prevent last card from being obscured by FAB

---

## Components

### Screen Title + Header Icons
- **Purpose**: Page heading with quick-access actions
- **Visual treatment**: 28pt Sora Bold (700), white, left-aligned, 24pt left margin. Icons right-aligned in same row.
- **Sub-elements**:
  - Title: "your missions" — 28pt Sora Bold, white. Collapses to 17pt Sora Semibold center-aligned in nav bar on scroll (iOS large title pattern, 160ms crossfade).
  - Journal icon: book outline, 20pt, white at 60%, 44x44pt touch target. Tap → stack push to Mission Journal [73].
  - Filter icon: funnel outline, 20pt, white at 60%, 44x44pt touch target. Tap → Domain Filter Bottom Sheet. 8pt gap between icons.
  - Filter active indicator: 4pt orange (#FF5E00) dot, top-right of filter icon, appears when domain filter is active.
- **Size**: Full-width, 28pt text height + 16pt top padding

### Type Filter Chips Row
- **Purpose**: Filter missions by type/scope
- **Visual treatment**: Horizontal ScrollView of chip buttons. No scroll indicator.
- **Sub-elements**:
  - Filter chip (inactive): 36pt tall, pill (999pt radius), ink-brown-800 bg, 1pt white at 10% border. Label: 13pt Sora Semibold, white at 60%.
  - Filter chip (active): orange (#FF5E00) bg, white text. Only one chip active at a time.
  - Chips: "all" (default active), "life", "main", "side", "weekly", "daily"
- **Size**: Full-width, 36pt chip height, 8pt gap between chips, 16pt left margin start
- **Behavior**: Active chip scrolls to leading edge. Selecting a type filters the list to missions of that type. "All" shows everything.

### Status Segmented Control
- **Purpose**: Filter missions by completion status
- **Visual treatment**: 3-segment pill-shaped container, full-width minus 32pt (16pt margins).
  - Container: ink-brown-800, pill radius (999pt), 1pt white at 10% border, 36pt tall
  - Segments: "active" | "done" | "all" — 13pt Sora Semibold
  - Active segment: orange (#FF5E00) bg pill (animated slide), white text
  - Inactive segments: transparent bg, white at 50% text
  - Default selection: "active" (left)
- **Size**: Full-width minus 32pt, 36pt tall
- **Animation**: Active segment bg slides between positions (280ms ease-out-soft)
- **Haptic**: Light impact on segment change

### Domain Filter Bottom Sheet
- **Purpose**: Multi-select domain filter accessed via header filter icon
- **Visual treatment**: Standard bottom sheet (drag handle, backdrop blur, slides up from bottom). ink-900 surface.
- **Content**:
  - Header: "Filter by domain" — 17pt Sora Semibold, white, center-aligned
  - Domain toggle chips: 10 chips in a wrap layout (2 rows of 5), each uses Domain Tag Chip pattern but with a checkmark indicator when selected
  - Each chip: 36pt tall, tappable toggle (multi-select). Selected: domain color at 25% bg + checkmark (12pt). Unselected: ink-brown-800 bg, domain color text.
  - Actions row (bottom): "clear all" (15pt Sora Semibold, white at 40%, left) + "apply" (15pt Sora Semibold, orange, right). 48pt tall row.
- **Dismiss**: Drag down, tap backdrop, or tap "apply"
- **Entry animation**: Slide up from bottom, 520ms ease-flow. Backdrop fades in (ink-900 at 60%).

### Life Areas Radar Preview Card
- **Purpose**: Visual gateway to the Life Areas Overview [16] holistic view
- **Data source**: Domain progress data (same as Life Areas Overview but rendered as a miniature)
- **Visual treatment**: ink-brown-800 (#211008) card, 28pt border radius, 24pt internal padding. Single row layout.
- **Sub-elements**:
  - Mini radar chart: 40pt x 40pt, a real data-bound mini `ConstellationRadar` from `domainStats` (drawn polygon over a faint radial backplate, radial orange gradient fillOpacity 0.25→0.08, domain-coloured star dots as identity, no hub at this size). Carries an `aria-label` summarising balance (e.g. "Life balance: strongest in Fitness, building in Finance") — NOT `aria-hidden`/decorative. If a 40px chart can't be made legible, substitute an honest domain-cluster glyph + label. The card (not the chart) is the ≥44×44pt tap target to Life Areas [16]. (See Visualization S13-V06.)
  - Label: "life areas overview" — 15pt Sora Semibold, white, left of chevron
  - Chevron: 14pt, white at 40%, right-aligned
- **Size**: Full-width minus 32pt, 64pt tall
- **Gestures**: Tap entire card → stack push to Life Areas Overview [16]

### Pinned Missions Section
- **Purpose**: Elevate user's top-priority missions above the main list
- **Conditional**: Only renders when user has at least 1 pinned mission (max 3)
- **Sub-elements**:
  - Eyebrow: "PINNED" — 12pt Sora Semibold, white at 40%, left-aligned, 16pt left margin
  - Pinned mission cards: same as Mission Card (below) but with pin icon (12pt, white at 30%) positioned top-right inside card. Full-width, vertical stack, 12pt gaps.
- **Size**: Eyebrow 16pt + variable cards

### SIA Suggestions Section
- **Purpose**: AI-generated mission recommendations user hasn't yet accepted
- **Conditional**: Only renders when SIA has pending suggestions (1-3 max)
- **Visual treatment**: Collapsible section with header row
- **Sub-elements**:
  - Header row: 48pt tall, full-width, 16pt horizontal margins
    - Chevron: 14pt, white at 40%, rotates 90° on expand (▸ → ▾). Left side.
    - Label: "SIA SUGGESTIONS" — 12pt Sora Semibold, white at 40%, 8pt right of chevron
    - Count badge: "(2)" — 12pt Sora Regular, white at 30%, right of label
  - Expanded content: 1-3 SIA Mission Suggestion Cards (see `_shared-patterns.md`), 12pt gaps, 16pt top margin
- **Default state**: Collapsed
- **Animation**: Expand/collapse content height 0↔auto + fade-in/out, chevron rotation. 280ms ease-out-soft.

### Mission Card
- **Purpose**: Summary of a single mission with progress, type, chain position, difficulty, and next action
- **Data source**: Missions system (name, progress %, type, domain assignments, chain position, difficulty, next action, SIA coaching note, XP earned, streak days)
- **Visual treatment**: ink-brown-800 (#211008) card, 28pt border radius, 24pt internal padding. Full-width minus 32pt (16pt margins).
- **Layout** (inside card):
  - Left column (64pt wide): Progress Ring (small, 36pt), centered vertically in column
  - Right column (remaining width, 12pt gap from left):
    - Row 1: Mission name — 16pt Sora Semibold, white, 2 lines max (truncate)
    - Row 2: Mission Type Badge + Domain tag chips — inline, 8pt gap between badge and first tag, 4pt top margin
    - Row 3: Next action — "Next: [action text]" — 13pt Sora Regular, white at 70%, 1 line truncate, 4pt top margin
    - Row 4: SIA coaching note — 13pt Sora Regular, white at 50%, 1 line, 4pt top margin
    - Row 5: Stats row — XP: "⚡ [##] XP" 12pt Sora Semibold, orange. Streak: "🔥 [##]d" 12pt Sora Semibold, white at 60%. Difficulty Tier Indicator (8pt dot). Chain label "2 of 4" (11pt Sora Regular, white at 40%, right-aligned). 8pt gaps between elements. 8pt top margin.
  - Chain Progress Bar (conditional): below the main card content area, 8pt top margin. Only renders for missions that are part of a chain.
- **Size**: Full-width minus 32pt, ~132pt tall without chain bar, ~148pt with chain bar
- **Gestures**:
  - Tap card → stack push to Mission Detail [14]
  - Tap "Next: [action]" row → complete action inline (checkbox appears, same completion animation as Action Card on Home Screen [12])
  - Long-press card → Quick Actions Menu appears
- **Variants**: Active (default), completed (100% ring is green, card at 70% opacity, "completed" badge replaces streak), paused (ring is gray, "paused" badge), pinned (pin icon 12pt, white at 30%, top-right)

### Progress Ring (Small Variant)
- **Purpose**: Compact progress indicator for use in mission cards
- **Visual treatment**: 36pt depth-upgraded `GaugeRing` (domain mode) per Visualization S13-V02. 36pt diameter, 3pt stroke, clockwise from 12 o'clock. Track: `--color-alpha-white-10` over a `--track-inset` `rgba(0,0,0,0.28)` (mint) beveled recess. Fill: arc-following `--grad-orange` (mint, via conic-mask — NOT a flat single-tone SVG fill), tinted to the mission's primary `--color-domain-*` as identity in domain mode. `--glow-orange-sm` (~12px, mint) sized for 36px (never the 32px hero glow). Green (#34A853) at 100% (arrival). No-data/un-synced quantified mission = ghosted dashed arc (no-data ≠ a real 0%).
- **Percentage**: 12pt Sora Semibold, white, centered inside ring
- **Animation**: Same as medium variant — fill animates on mount, 520ms ease-flow

### Floating Action Button (FAB)
- **Purpose**: Persistent entry point to create a new mission
- **Visual treatment**: 56pt diameter circle, orange (#FF5E00) fill, centered "+" icon (24pt, white, 2pt stroke). Shadow: 0 4pt 16pt rgba(255, 94, 0, 0.3) (warm orange glow).
- **Position**: Fixed, bottom-right. 16pt from right edge, 16pt above tab bar top edge. z-40 (above content, below modals).
- **States**:
  | State | Visual | Haptic |
  |-------|--------|--------|
  | Default | Orange circle, white "+" | — |
  | Pressed | scale(0.93), darker orange (#E05500), shadow contracts | medium impact |
  | Focus-visible | 2pt white ring, offset 4pt | — |
- **Gestures**: Tap → modal present Create Mission [15]
- **Scroll behavior**: Stays fixed. Hides after 80pt continuous downward scroll (fade-out to opacity 0 + translateY +20pt, 160ms ease-out-soft). Reappears on any upward scroll or scroll stop (fade-in, 160ms ease-out-soft).

### Quick Actions Menu
- **Purpose**: Context menu for mission-level actions without navigating away
- **Data source**: Mission state (active, paused, pinned, archived)
- **Visual treatment**: Floating card at z-40, ink-brown-800 bg, 14pt border radius, backdrop-blur(12px), subtle warm shadow. Appears anchored to the long-pressed card.
- **Sub-elements** (vertical list):
  - "pin to home" / "unpin from home" — pin icon (16pt) + label (15pt Sora Regular, white). Toggles based on current pin state.
  - "pause mission" / "resume mission" — pause/play icon (16pt) + label
  - "archive" — archive icon (16pt) + label
  - "edit" — pencil icon (16pt) + label
  - Divider (1pt, white at 5%) between items
  - Each row: 48pt tall, 16pt horizontal padding, 44pt touch target
- **Pin limit**: If user tries to pin a 4th mission, show toast: "Unpin a mission first. Maximum 3 pinned." (auto-dismiss 3s)
- **Entry animation**: Scale(0.95→1.0) + fade-in, 160ms ease-out-soft
- **Exit**: Fade-out, 160ms. Tap outside dismisses.
- **Backdrop**: Semi-transparent overlay (ink-900 at 40%) behind menu, covering the rest of the screen. Tap backdrop to dismiss.
- **Haptic**: Medium impact on long-press trigger

---

## Visualization

> Source: embedded section (no companion file). Audited in `viz-audit/` — Batch 5 (Progress/Awards, template C adapted to a list), findings `S13-V01..S13-V06`. All primitives are from `viz-audit/VIZ-KIT.md` at `viz-audit/CONSISTENCY.md` parameters. Premium-depth, on-brand (60/30/10), **Product Mode → orange-dominant**; mission-tier metallics (`--color-mission-*`) and domain colours are *identity only*, never data ink. Benchmark = **Habitica + Todoist** (quest/task list) rendered **the Balencia way** (GaugeRing depth + Living-Line momentum + warm glow), not a Habitica clone. **Current grade D (51) → specced-target A− (85).** Mints **no** new primitive — it composes `GaugeRing`, `MomentumBar`, `KPIStatTile`, `CalendarHeatmap`, and optional `Sparkline` from the frozen kit, and may reference Batch-5 siblings (`BadgeTierGrid` `VK-013`, `TimelineAgenda` `VK-014`) by name without instantiating them. *(Residual gap to A+++ is build-verified depth + working drill/scrub micro-interactions, owned by the later viz-build program.)*

The Mission Board is a *list* screen, so template C is adapted: there is **no single billboard hero** — the focal viz is a compact **board-level summary band** (a `MomentumBar` + a `KPIStatTile` triplet) that sits directly under the status control and anchors the eye before the repeating cards. Today the screen renders as a flat list: per-mission progress is a flat 2-tone 36px `ProgressRing` (no gradient/glow/inset), the Life-Areas preview is a **decorative non-data `MiniRadar`** (`aria-hidden`, `fillOpacity 0.18` — a §11 decorative-chart violation), there is **no board-level momentum, no active/done/streak counts, and no consistency history**, difficulty `hard` renders as **alarm `error-red`** (colour-as-verdict), and difficulty is announced by `aria-label` **only** (colour-alone for sighted users). This section upgrades *how the board reads* — a momentum band, depth-upgraded per-mission gauges, an honest count strip, and a board streak heatmap — **without** displacing the mission cards, which remain the primary *content*.

### Visualized-vs-text map

| Datum (shown / implied) | Today | Specced visual | Primitive |
|---|---|---|---|
| Active / completed-today / current streak | not shown | **count strip** — number + uppercase label + honest delta (vs last week) | `KPIStatTile` ×3 (`VK-008`) |
| Today's board momentum (missions advanced · daily XP vs goal) | not shown | **board `MomentumBar`** — one continuous orange→green fill, arrives green at goal | `MomentumBar` (`VK-004` / `VK-016`) |
| Per-mission progress % (0.68, 0.42, 0.25…) | flat 2-tone 36px ring | **depth-upgraded `GaugeRing` (36px, domain mode)** — arc-gradient + inset track + `--glow-orange-sm` | `GaugeRing` (`VK-002`) |
| Per-mission value-vs-target (e.g. "$2,100 / $5,000") | implicit in % only | **inline `StatBars`/`MacroBar`** under quantified missions (high-motivation tier) | `MacroBar` |
| Board consistency (missions touched per day, trailing weeks) | not shown | **board `CalendarHeatmap`** (intensity = missions advanced that day) | `CalendarHeatmap` |
| Mission micro-trend (progress trajectory) | not shown | optional **`Sparkline`** (7-pt Living Line) on the lead pinned mission (high-motivation) | `Sparkline` (`VK-001`) |
| Life-Areas radar preview (gateway) | decorative `MiniRadar` (`aria-hidden`) | **real `ConstellationRadar` mini** (data-backed, labelled gateway) or an honest non-chart glyph — not a fake polygon | `ConstellationRadar` (`VK-005`) |
| Chain position (●──◉──○ 2 of 4) | step-dot bar (kept) | kept as-is — a lightweight discrete chain indicator, not a chart | `ChainProgressBar` (deliberately iconographic) |
| Mission name / type / next action / SIA note / XP / difficulty | text + badges | — (deliberately textual / tier-identity badges) | — |

**Editorial hierarchy (calm, not maximal):** the mission cards stay the screen's *content* focus; the **board summary band (MomentumBar + count strip) is the one viz focal point** above the fold; per-mission `GaugeRing`s are deliberately *uniform secondary instruments* (not 30 competing heroes); the heatmap is ambient at the foot. One focal band, repeating minor gauges — not a wall of equal charts.

### 1 · Board momentum + count strip — `S13-V01` → `MomentumBar` + `KPIStatTile` ×3

A new **board summary band** rendered directly under the Status Segmented Control and above the Life-Areas card (it replaces the eye's first landing on a bare list). Two stacked rows:
- **Count strip** — three `KPIStatTile`s: **ACTIVE** (count of `status === active`), **DONE TODAY** (missions completed today), **STREAK** (consecutive days a mission was advanced). Anatomy locked: uppercase label `--color-alpha-white-40` +0.12em · number `text-h2` · **delta arrow** ▲ `--color-forest-green` / ▼ `--color-alpha-white-40` over a **fixed, disclosed window** ("vs last week"). Count-up `--dur-base` 280ms `--ease-out-soft`.
- **Board `MomentumBar`** — a **single continuous** rounded-pill bar (`--grad-progress` **(mint)** orange→green, 8px, track `--color-alpha-white-08`, **not** segments) showing **daily XP earned vs daily XP goal** (or missions-advanced-today / target), arriving **green** at goal. Label reads e.g. "3 of 6 advanced · +180 XP · 64%".
- **Depth (token-backed):** KPI tiles = `ink-brown-800` surface + top-edge highlight, **no glow** (KPI is flat-premium); MomentumBar fill carries no glow (momentum is a path, not a hero gauge).
- **Data source:** derive from `missions[]` (`status`, `progress`, `xp`) + a `board.dailyXp` / `board.dailyXpGoal` block in `mock.ts`; STREAK from `board.streakDays`; the WoW delta from a `board.lastWeek` block so the arrow is real, not invented.
- **Non-shaming (per-viz states):** a ▼ delta is a **neutral muted** arrow, never red or "down" shaming language; STREAK never shows a loss-aversion countdown ("don't lose your 12 days!") — it states the current run as forward momentum; **DONE TODAY = 0** reads "fresh start," not a failure tile.

### 2 · Per-mission progress gauge — `S13-V02` → `GaugeRing` (36px, domain mode)

Promote the flat 2-tone `ProgressRing` in every Mission Card to the depth-upgraded **`GaugeRing` (36px)** in **domain mode** (the ring tints to the mission's primary `--color-domain-*` as *identity*, which is the one place domain colour is allowed on data — it encodes *which* domain's mission this is): an **arc-following gradient stroke** (`--grad-orange` **(mint)** via conic-mask, *not* a flat SVG `linearGradient`; domain-tinted in domain mode), a `--track-inset` `rgba(0,0,0,0.28)` **(mint)** beveled track under the `--color-alpha-white-10` track, **`--glow-orange-sm` (~12px, mint)** sized for a 36px ring (**never** the 32px hero glow, which would swamp it), and the existing center `%` (`text-h2`/11px, round cap). **Green `#34A853` at 100%** (arrival).
- **Why a gauge, the Balencia way:** Habitica shows a flat task checkbox; we render the *same bounded progress* as our own warm-glow `GaugeRing` so a mission ring, a sleep score, and a recovery % across the app read as **one** instrument family — not a borrowed list checkbox.
- **Uniform, not competing:** all card rings stay **36px** so they read as a calm column of equal instruments — the board band, not the rings, is the focal point (RUBRIC dim 2).
- **States (per-viz):** **0% / just-created** → ring at a faint full track + "0" center (a real, honest zero — distinct from the no-data ghost below), never a degenerate empty disc; **no-progress-data / un-synced quantified mission** → **ghosted dashed arc** (no-data ≠ a real 0%); **completed** → full green arc + the card's "Completed" treatment; **paused / overdue** → ring desaturates but stays drawn (see non-shaming below).
- **Data source:** `mission.progress` (`mock.ts`); domain tint from `mission.domains[0] ?? mission.domain`.

### 3 · Per-mission value-vs-target bar (quantified missions) — `S13-V03` → `MacroBar` / `StatBars`

For missions whose progress is a **measurable quantity** (savings "$2,100 / $5,000", "18 / 30 days"), the ring alone hides the *magnitude*. **High-motivation tier only** (per the Motivation Adaptation section), add a labelled **`MacroBar`/`StatBars`** under the next-action row: track `--color-alpha-white-08` over a `--track-inset` recess, **`--color-brand-orange`** fill (or domain-tinted to match the ring), width = value/target, **value-and-target labelled** ("$2,100 of $5,000"), count-up width 0→% on mount (`--dur-slow` 520ms `--ease-flow`). Zero baseline; honest shared scale (the bar's full width = the *true* target, never a padded one).
- **Depth:** flat-bar form deliberately (a second ring here would fight the card's primary ring); no glow.
- **States:** non-quantified missions (habits/dailies) omit the bar — they keep the ring only; loading → skeleton bar that fills into the value.
- **Data source:** `mission.metric` (`{ current, target, unit }`) added to quantified entries in `mock.ts`.

### 4 · Board consistency heatmap — `S13-V04` → `CalendarHeatmap`

A **board-level `CalendarHeatmap`** (deployed component — reuse as-is) at the **foot of the list** (below the mission cards, above the bottom spacer) showing **how many missions were advanced each day** over the trailing weeks: **5 intensity steps** (`--color-alpha-white-05` → full `--color-brand-orange`), today = dashed border, tap = `scale-110`. It is the board's "are you showing up" signal — complementary to per-mission streaks, never redundant with them.
- **Non-shaming:** empty cells read as **"open days,"** never a guilt grid; **no loss-aversion countdown** on a gap (Gentler-Streak thesis baked into the benchmark); a low-intensity week is framed as "room to move," not failure.
- **States:** **Day-1** → empty grid with "your board streak starts today" (today cell dashed), **not** a wall of absence; loading → cells shimmer in place; partial → un-synced days ghosted, distinct from a true zero-advance day.
- **Data source:** `board.advanceHistory` (date → count of missions advanced) in `mock.ts`.

### 5 · Lead-mission micro-trend (optional) — `S13-V05` → `Sparkline`

**High-motivation tier only:** under the **lead pinned mission**, a 7-point **`Sparkline`** (tiny Living Line: **exactly 7 points**, `--stroke-thin` 2px orange, curved monotone, **no axes / no grid / no glow**, 64×24, **green end dot** when the latest point is a milestone/arrival) showing the mission's recent progress trajectory. Draws on scroll-into-view (`--dur-slow` 520ms `--ease-flow`).
- **Why the line:** "every chart is the line" (§8) — even a 64px trajectory reuses the exact Living-Line spine of the home-screen sparklines, so the board's micro-trend is unmistakably Balencia.
- **States:** <2 points → omitted (no fake flat line); reduced-motion → completed stroke at rest + green end dot.
- **Data source:** `mission.progressHistory` (7 values) on the lead pinned mission in `mock.ts`.

### 6 · Life-Areas preview — honest gateway viz — `S13-V06` → real `ConstellationRadar` mini (or non-chart glyph)

Resolve the **decorative `MiniRadar`** (currently `aria-hidden`, `fillOpacity 0.18`, a fake polygon that is **not** wired to real domain data — a §11 decorative-chart violation): either (a) replace it with a **real `ConstellationRadar` mini** bound to `domainStats` (the same data Life Areas [16] renders, at a 40px card-gateway scale — drawn polygon over a faint radial backplate, no hub at this size), or (b) if a 40px chart cannot be made legible, drop the chart entirely for an honest **domain-cluster glyph** + label. Either way the gateway must **not ship a chart that lies about data**.
- **Depth:** if (a), the mini polygon uses the radial orange gradient `fillOpacity 0.25 → 0.08` over `ink-brown-800` (no glow at 40px — depth lives in the board band); domain dots `--color-domain-*` (identity).
- **A11y:** the card is the ≥44×44pt tap target to Life Areas [16]; the mini radar carries an `aria-label` summarising the balance ("Life balance: strongest in Fitness, building in Finance") — **not** `aria-hidden`.
- **States:** radar data un-synced → ghosted polygon outline + "balance calibrating," never a misleading filled shape; loading → skeleton ring.
- **Data source:** `domainStats` (`mock.ts`).

### Motion choreography (entrance — draw-first order)

Per `CONSISTENCY.md`: the **board band leads** — the `KPIStatTile` counts **count up** (`--dur-base` 280ms `--ease-out-soft`) and the board **`MomentumBar` fills** L→R (`--dur-slow` 520ms `--ease-flow`, arriving green) **first** → **then** the Life-Areas mini radar **draws itself** (`stroke-draw`, *not* a scale-in) → **then** the mission cards stagger in (existing 80ms stagger) with each **`GaugeRing` filling** (`ring-animate` 520ms `--ease-flow`) and each `ChainProgressBar`'s dots appearing L→R → **then**, on scroll-into-view, the foot **`CalendarHeatmap` cells stagger in** and the optional lead `Sparkline` **draws itself**. One line motif per surface (the MomentumBar and the Sparkline are the only Living Lines; per-mission progress uses gauges). Below-fold visuals (heatmap, sparkline) animate on **scroll-into-view**. `prefers-reduced-motion` → every chart at final state instantly; the MomentumBar's filled bar, the Sparkline's completed stroke + green end dot, and the gauges' filled arcs are preserved.

### States, brand & accessibility

- **States (all designed, per RUBRIC dim 7):** **cold-start / Day-1 (no missions)** — the board band, heatmap, and radar preview are **hidden** (consistent with the existing Day-1 empty state); the central "no missions yet" + SIA-starter affordance is the only content; **loading** — depth-preserving skeletons that *morph* into data: KPI label + skeleton number bar, a MomentumBar track that fills, per-card ring/text/chain skeletons (per the existing Mission Card loading shimmer), heatmap cells shimmer; **partial** — un-synced quantified-mission bars and un-synced heatmap days **ghosted/dashed**, distinct from a real zero; the radar preview ghosts its polygon if domain data is absent; **error** — chart-specific honesty per the Error Handling table (radar data failure → ghosted outline, card still tappable; missions fetch failure → card skeletons + banner; the board band hides rather than showing fabricated zeros).
- **60/30/10 & non-shaming:** **orange dominates** data ink (MomentumBar effort fill, per-mission gauge default, KPI accents, heatmap intensity, value bars); **green** = arrival/in-range only (100% gauge, MomentumBar goal arrival, milestone/Sparkline end dots, ▲ deltas, completed missions); **purple stays SIA-only** — the SIA Suggestions card border is the single sanctioned purple (max-2 rule already in the Color Map), and **no projection is shown on this screen** so no dashed-purple appears; **domain colours** tint per-mission gauges and tag chips for *identity* only; **mission-tier metallics** (`--color-mission-gold/silver/bronze/steel/sage/copper`) stay on the type badges as *tier identity*, never on data ink. **Non-shaming (ethical gate):** **overdue missions are framed as "resume," never red-shamed** — an overdue/paused mission desaturates its gauge and shows a constructive **"Resume" / "Pick this back up"** affordance, **not** an alarm-red badge or "you failed" copy; the **difficulty `hard` dot is reassigned off alarm `error-red`** to a neutral tier glyph + label (difficulty is *information*, not a verdict — `error-red` reads as danger/shame); STREAK and the heatmap never weaponise loss-aversion; KPI deltas use a fixed, disclosed window (no cherry-picked flattering range).
- **Accessibility:** every gauge / bar / momentum fill / heatmap / sparkline carries a text/`aria-label` equivalent conveying the same value ("Run a half marathon, 68 percent complete, fitness mission"; "Board momentum: 3 of 6 advanced, 64 percent"); **difficulty and status are never colour-alone** — the difficulty dot gains a **visible glyph/label** (e.g. "Easy ●" / "Hard ◆") beside the colour, and completion shows the **"Completed" word + green**, never the green alone (fixes the current `aria-label`-only difficulty miss); label/value contrast ≥ 4.5:1 on `#0A0A0F`/`#211008`; **WCAG 1.4.11** — gauge arcs, the filled/unfilled boundary, MomentumBar fill, heatmap cell borders, and Sparkline stroke all meet ≥3:1 vs background (white/5 grid/track is decorative-only); interactive chart targets ≥ 44×44pt (cards, heatmap cells via tap, radar gateway); `prefers-reduced-motion` renders all at final state with signature static forms preserved.

Conform to `viz-audit/CONSISTENCY.md`.

---

## Premium Craft

**Profile:** data · **Cluster benchmark:** Things + Linear (mission/goals list done *warmly*) — *stays Balencia via the GaugeRing board-band summary + warm-glow surfaces on ink-brown, not a flat task list.*

**Pre-grade:** B+ (78) · **Post-grade (this section):** A++ (96)

Pre-grade drivers (the gap to A++): the spec's strong information architecture and comprehensive component list are sound, but (1) the board-level summary band (MomentumBar + count strip) is defined in Visualization but surfaces as a craft question — the focal point needs clarity; (2) the mission cards are currently flat ink-brown-800 with no layered depth (no top-edge highlight, no inset tracks); (3) microcopy on the empty state, loading, and error states is not yet authored to voice; (4) the pinned vs. regular mission card visual distinction is tonal only (copy does the work); (5) the life-areas radar card is promised as "real" data-backed but marked `aria-label` only — a contract-clarity issue for copy; (6) typography guidance is per-component, not rhythm-unified; (7) the SIA Suggestions section has no depth craft beyond collapse/expand.

### Focal hierarchy

One clear focal point: the **board summary band** (MomentumBar + KPIStatTile count strip, `S13-V01`) placed directly after the status control and above the Life-Areas card — the one ≥96px glowing element above the fold. It sits in the first 1.5 viewport heights and answers "how's the board running today?" before the user sees any individual mission card. The three ACTIVE / DONE TODAY / STREAK count tiles and the orange→green momentum fill read as the board's *state*, not a card listing. Everything below (radar preview, pinned section, mission list, heatmap) is visibly secondary by size, glow calibration, and order: the mission rings are deliberately uniform 36px secondary instruments (dim 2, editorial hierarchy — not 30 competing heroes); the heatmap is ambient at the foot. The squint test lands on the momentum bar fill and the count numbers first, then the radar card as a secondary gateway, then the mission cards as the *content* list. One focal band, repeating secondary gauges — never a wall of equal mission cards.

### Surface & depth

Every card adopts the `CK-P1` Layered Warm Surface — `--color-ink-brown-800` body · `--radius-xl` (28pt) · 1px `--glass-border` (`--color-alpha-white-06`) · **`--edge-highlight` top-edge highlight** (`CK-T01`, the not-flat cue, previously absent from mission cards) · `--shadow-1`. The board summary band (the focal zone) adds `--surface-backplate` (`CK-T02`, a faint radial orange backplate) to lift it off the screen field. Mission cards at 72pt height receive `--glow-orange-sm` (~12px) on the left progress ring only (the focal element within each card); the ring sits over a `--track-inset` (`rgba(0,0,0,0.28)` mint beveled recess, not a flat 2-tone). The KPIStatTile count tiles in the summary band carry no glow (KPI is flat-premium, a context anchor, not a hero gauge). The pinned section eyebrow uses the `.eyebrow` recipe (12pt / 600 / `--tracking-eyebrow` 0.12em / uppercase / white-40%). The SIA Suggestions header adopts the same eyebrow style when collapsed/expanded. The FAB (56pt circle) carries `--glow-orange` (32px, the size-calibrated hero glow for ≥96px) + `--shadow-2` (floating elevation). Mission card quick-actions menu floats at `--shadow-2`. Extends the same depth language to all surfaces so nothing reads as a flat box; the comparison to Things (a calm grey list) or a default task app is resolved by the warm-glow + inset-track signature.

### Typographic rhythm

Map the Typography table to `CK-P3` tokens. Screen title "your missions" is `--text-h1` (28pt) / 700 / `--leading-snug` (1.25) / white 100%; type filter chips and status control labels are `--text-caption` (13pt) / 600 / `--leading-normal` (1.4) / white 60% (inactive) or white 100% (active); radar card label and mission names are `--text-h3` (17pt) / 600 / `--leading-snug` / white 100%; next-action and SIA note text are `--text-body` (16pt) / 400 / `--leading-normal` / white 70–50%; XP and streak badges are `--text-caption` (12pt) / 600 / `--color-brand-orange`; count strip labels (ACTIVE / DONE TODAY / STREAK) are the `.eyebrow` recipe (12pt / 600 / `--tracking-eyebrow` 0.12em / uppercase / white-40%); count strip numbers are `--text-display-l` (32pt) / 700 / `--leading-tight` (1.1) / white 100% with tabular-nums; the delta arrow on count tiles is 12pt Sora Regular, orange (▲) or white-40% (▼), never red. Hierarchy is carried by **weight** (600–700 vs 400), not size alone. Sentence case throughout (type chips: "all", "life", "main", "side", "weekly", "daily"; status segments: "active", "done", "all"; section eyebrows: "PINNED", "SIA SUGGESTIONS"). ≤2 brand-orange accent words per screen (the orange progress ring and the orange FAB badge the count, visual elements; text-only accents are the XP "⚡ [##] XP" label and the "create your first mission" CTA in the Day-1 empty state). Stat figures use tabular-nums. Chillax stays logo-only (none on this screen). Replaces any ad-hoc pixel line-heights with the `CK-T04` scale.

### Microcopy (before → after)

All narrative copy is authored to `CK-P5` brand voice. The spec's component-level copy is warm but edge strings need authoring:

- **Type filter chips (label text)** — *before:* given as "all", "life", "main", "side", "weekly", "daily" → *after (kept):* same; lowercase, plain, direct. (Already on-voice.)
- **Status control labels** — *before:* "active", "done", "all" → *after (kept):* same; sentence case. (Already on-voice.)
- **Empty state, Day-1 (central "no missions yet")** — *before:* "SIA can help you create your first mission based on what matters most to you." → *after (warmer, non-leading):* "No missions yet. Start with what matters most to you — SIA can help." (Removes the commercial pitch framing; leads with the user's agency.)
- **Empty state, Day-1 secondary** — *before:* "create your first mission" (CTA button, given) → *after (kept):* same. (Already direct + warm.)
- **Empty state, Day-1 SIA starter chips (example)** — *before:* "Start a daily meditation habit", "Set a savings goal for the year", "Train for a 5K run" → *after (kept):* same; specific, actionable, coached. (Already on-voice.)
- **Filtered empty state (no results for filter selection)** — *before:* "no [filter] missions" (kept) + contextual body (spec gives three variants) → *after (new, authored):* "No [filter] missions yet. Create one with the + button." (singular, warm, constructive — never "You don't have" shame framing). For status filter: "You've completed everything." (celebration, not "All missions are done", and no urgency to "start something new").
- **Loading state (missions fetch)** — *before:* no message shown in the spec (skeleton only) → *after (new, on-voice):* "SIA is preparing your missions — one moment." (Warm, specific, never generic "Loading…")
- **Board summary band (MomentumBar label)** — *before:* "3 of 6 advanced · +180 XP · 64%" (text only) → *after (kept):* same; plain stat read, no exclamation. (Already on-voice.)
- **KPI count deltas (▲ vs ▼)** — *before:* delta arrow + "vs last week" window (given) → *after (kept):* same; honest window, no flattery. (Already on-voice.)
- **Network error (missions fetch timeout)** — *before:* spec gives "Couldn't load your missions. Try again." → *after (new, consistent with Home Screen):* "Couldn't refresh your missions — pull to refresh." (Specific action, warm period.)
- **Radar preview card label** — *before:* "life areas overview" (given) → *after (kept):* same; direct, lowercase. (Already on-voice.)
- **Radar preview card, data failure state** — *before:* no message (spec says "ghosted outline") → *after (new, on-voice):* tooltip or card note "Balance calibrating" (never silent, never a chart lie).
- **Quick Actions Menu title** — *before:* implied from the menu items → *after (new, a11y):* the Menu is announced as "Mission options" (via aria-label).
- **Quick Actions Menu items** — *before:* "pin to home" / "pause mission" / "archive" / "edit" (given) → *after (kept):* same; lowercase, direct verb+object. (Already on-voice.)
- **Pin toast (limit reached)** — *before:* spec gives "Unpin a mission first. Maximum 3 pinned." → *after (warm, non-shaming):* "You can pin up to 3. Unpin another to add this one." (Honest constraint, no shame — "you reached a limit" not "you tried to pin too many.")
- **SIA Suggestions section, no suggestions (hidden)** — *before:* the section is simply not rendered → *after (consistency):* section is hidden (no message needed — the mission list shows content; SIA suggestions are additive, not required for the screen's job).
- **SIA Suggestions, dismiss action** — *before:* spec says "Dismiss" button → *after (kept):* same; a small "×" or "dismiss" text, lightweight — not a CTA-weight button.

No exclamation marks; the brand period used with intent; all SIA strings are specific to the user's own missions (a real suggestion, never a horoscope); never shame-framing around overdue/paused missions — they are framed constructively as "resume," not failures. "Your streak paused — pick it back up."

### Motion choreography

Locked to `CK-P4` order (draw-first): **the board summary band leads** — the KPIStatTile count numbers **count up** (`--dur-base` 280ms `--ease-out-soft`) and the board **MomentumBar fills** L→R (`--dur-slow` 520ms `--ease-flow`, arriving green at goal) **first** → **then** the Life-Areas mini radar **draws itself** (`stroke-draw`, `--dur-slow` 520ms `--ease-flow`, *not* a scale-in; a real polygon draw per the brand's §8 draw-not-fade) → the radar star dots **stagger in** (40ms stagger) → **then** the pinned missions section eyebrow fades in → the **pinned mission cards stagger in** (`--dur-base` 280ms `--ease-out-soft`, 80ms stagger) with each card's **GaugeRing filling** (`ring-animate` 520ms `--ease-flow`) and each `ChainProgressBar`'s dots appearing L→R (60ms stagger) → the **SIA Suggestions header fades in** → the main **mission cards stagger in** (staggered same as pinned, 80ms stagger) with rings filling on mount → below the fold, on **scroll-into-view**, the **CalendarHeatmap cells stagger in** and the optional lead `Sparkline` **draws itself** (strokes on-enter, preserving the line motif). One line motif per surface (the MomentumBar, Sparkline, and any board-level Living-Line arc are the only strokes; per-mission progress uses gauges). `prefers-reduced-motion` → every element at final state instantly; the MomentumBar's filled bar at value, the Sparkline's completed stroke + green end dot, and all GaugeRings' filled arcs are preserved; no loops off.

### State craft

| State | Layout | Copy (on-voice) | Depth / brand |
|---|---|---|---|
| Cold-start / Day-1 (no missions) | Type filter chips hidden, status control hidden, radar card hidden, pinned section hidden, SIA suggestions hidden, main list hidden. Central empty-state block displayed vertically centered: illustration (quest-map outline, 120pt) + heading "no missions yet" + body text + CTA button + 3 starter SIA chips (tappable suggestions) + FAB still visible (redundant with inline CTA, spatial consistency). | "No missions yet. Start with what matters most to you — SIA can help." Example SIA starter chips: "Start a daily meditation habit", "Set a savings goal for the year", "Train for a 5K run" (warm, specific, coached). | Illustration on `--color-ink-brown-800` tones with orange accent path; central card (if rendered) uses `CK-P1` + backplate; FAB visible, contextually reduced emphasis (secondary CTA — the button is primary). |
| Loading (missions fetch) | Type filter chips, status control, radar card, all sections show skeleton shimmer: chip outlines, segmented-control shape, radar card outline with dashed polygon + dot shimmer, mission card stack (each card: ring outline + 3 text-line skeletons + 2 chip-shape skeletons + chain-bar outline). Section eyebrows present but dimmed (white-20%). Layout preserved, depth visible. | "SIA is preparing your missions — one moment." | Skeleton on `--color-ink-brown-800` + shimmer animation (a radial sweep, not a linear pulse — warm glow-like motion), morphs into data (never a swap or spinner overlay). |
| Partial / partial sync (some missions fetched, some un-synced) | Type filter and status control render with fetched data; mission cards that synced render normally; un-synced mission cards show ghosted/dashed rings and a "syncing…" badge (never a real 0% ring for a mission that hasn't synced); the radar card shows a ghosted/dashed polygon if domain data is absent; the heatmap at the foot shows ghosted/dashed cells for days without synced data. No section is hidden — structure preserved, missing data **ghosted, never silent**. | "Your mission sync is in progress. Check back in a moment." (if applicable) or per-card: "Syncing…" badge (12pt Sora Regular, white-50%, inline). | No-data is **not** zero — ghosted/dashed rendering is visually distinct from a real 0. Skeleton trails off into a ghost rather than a full card. |
| Error (missions fetch timeout / network failure) | Type filter and status control render (if cached); mission cards show skeleton shimmer (as in Loading) + a network error banner below the sticky header naming the failure ("Couldn't load missions — checking again") and a "retry" affordance (tappable link or pull-to-refresh hint). Radar preview and summary band hidden (data-dependent, can't be faked). Pinned section still renders if cached. SIA Suggestions section hidden (no data to suggest). | "Couldn't load your missions — pull to refresh." (specific action, warm, no drama). | Calibrated `--color-error-red` only on the banner background or border (a 2pt left border on the banner, glyph + word paired — a small warning icon + the text, never colour-alone). |
| Offline (device offline, cached data retained) | All sections render with last-synced data (timestamp shown in the pull-to-refresh area: "Last synced 2 hours ago"). Pull-to-refresh button is dimmed/disabled (white-30%) with a reason. Status control is interactive (filters are local). Mission cards are tappable (deep-link to cached detail). Sync affordances (badges, skeleton traces) are gone — data is presented as current, not syncing. | "You're offline — showing your last sync." (in the refresh-area subtitle or a small banner, warm, no shame). | Actions dimmed (50% opacity on the refresh control, no haptic feedback); copy is specific to "offline," not generic "error." |

### Signature & anti-generic

Ownable moments: the **board summary band** (count strip + MomentumBar momentum fill, the one focal viz that sets the tone before the mission list — never a default task-list opener), the **depth-upgraded per-mission GaugeRing** (the warm-glow-on-ink-brown signature, consistent with home/RPG across the app), and the **CalendarHeatmap heatmap at the foot** (the board streak signal, a warm-glow intensity grid that is unmistakably Balencia). The screen's anti-generic defenses: (1) the mission cards are **not** a symmetric equal-weight stack — they are broken into pinned (elevated, top-priority focus) and regular list (secondary by section label + stagger order), so the eye has a clear read path; (2) the board summary band acts as the **focal pause point** before the list, lending editorial hierarchy (not a flat "missions → 12 cards" read); (3) the type filter chips and status control at the head **break** the card monotony with interactive controls, never a list-only UI; (4) the depth craft (layered cards with top-edge highlight + inset-track gauges + warm glow on the focal ring) is unmistakably premium vs. a default flat-task app.

### Accessibility

Tabulated load-bearing contrast pairs (on `--color-ink-brown-800` / `--color-ink-900`): Screen title "your missions" `--color-alpha-white-100` ≥12:1; type chip label (inactive) `--color-alpha-white-60` ≥4.5:1; type chip label (active) `--color-alpha-white-100` ≥12:1; status segment (inactive) `--color-alpha-white-50` ≥4.5:1; status segment (active) `--color-alpha-white-100` ≥12:1; mission name `--color-alpha-white-100` ≥12:1; next action `--color-alpha-white-70` ≥4.5:1; SIA note `--color-alpha-white-50` ≥4.5:1; XP badge `--color-brand-orange` 3.2:1 (WCAG 1.4.11); streak `--color-alpha-white-60` ≥4.5:1; progress ring stroke `--color-brand-orange` 3.2:1 on filled arc / unfilled boundary; MomentumBar `--color-brand-orange` 3.2:1; count numbers `--color-alpha-white-100` ≥12:1; count labels `--color-alpha-white-40` ≥4.5:1. Status never colour-alone: difficulty is conveyed by a visible **tier glyph (●/◆ in white) plus an adjacent label** ("Easy", "Moderate", "Hard"), never by colour alone. Completion shown by **green ring + "Completed" word**. Every focusable element uses the **`--focus-ring`** (`CK-T03`, 2px orange, 2px offset) uniform app-wide. Targets ≥44×44pt (header icons 44×44pt, mission cards full-width ≥56pt tall, FAB 56pt diameter, quick-actions 48pt rows with 44pt hit box, SIA header 48pt tall, type chips 36pt tall + 44pt min width). Reduced-motion: MomentumBar at final width instantly, Sparkline at completed stroke + green end dot, GaugeRings at final fill, CalendarHeatmap at final intensity, radar fully drawn — no motion loops; the settled frame is the canonical frame.

Conform to `design-audit/CONSISTENCY.md`.


---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Screen base |
| Card surfaces | #211008 | ink-brown-800 | Mission cards, radar card, quick actions menu, bottom sheet |
| Screen title | #FFFFFF | white | Primary heading |
| Header icons | #FFFFFF at 60% | white/60 | Journal + filter icons |
| Filter active dot | #FF5E00 | orange | 4pt indicator on filter icon |
| Active type chip bg | #FF5E00 | orange | Selected type filter |
| Active type chip text | #FFFFFF | white | On orange bg |
| Inactive type chip bg | #211008 | ink-brown-800 | Deselected type |
| Inactive type chip text | #FFFFFF at 60% | white/60 | Muted |
| Segmented control active bg | #FF5E00 | orange | Active status segment |
| Segmented control inactive text | #FFFFFF at 50% | white/50 | Unselected status |
| Mission name | #FFFFFF | white | Primary text |
| Next action text | #FFFFFF at 70% | white/70 | Secondary text |
| SIA coaching note | #FFFFFF at 50% | white/50 | Tertiary text |
| XP badge | #FF5E00 | orange | Reward prominence |
| Streak text | #FFFFFF at 60% | white/60 | Secondary stat |
| Chain label | #FFFFFF at 40% | white/40 | Position indicator |
| Progress ring fill | #FF5E00 | orange | Active progress |
| Progress ring complete | #34A853 | green | 100% state |
| Progress ring track | #FFFFFF at 10% | white/10 | Inactive track |
| Chain bar track | #FFFFFF at 8% | white/8 | Background track |
| Chain dots (completed) | #34A853 | green | Past steps |
| Chain dots (current) | #FF5E00 | orange | Active step |
| Chain dots (upcoming) | #FFFFFF at 20% | white/20 | Future steps |
| Difficulty dot (easy) | #34A853 | green | Low difficulty |
| Difficulty dot (moderate) | #FF5E00 | orange | Medium difficulty |
| Difficulty dot (hard) | #FFFFFF at 70% | white/70 | High difficulty — neutral tier glyph + label (◆ "Hard"), NOT alarm-red (difficulty is information, not a danger verdict — see Visualization §states/brand) |
| Mission type badges | [metallic tones] | per type | See _shared-patterns.md |
| Pin icon | #FFFFFF at 30% | white/30 | Subtle indicator |
| FAB bg | #FF5E00 | orange | Primary creation action |
| FAB icon | #FFFFFF | white | "+" on orange |
| FAB shadow | rgba(255,94,0,0.3) | orange/30 | Warm glow |
| Radar preview chart | [domain colors] | per domain | Real data-bound mini ConstellationRadar (bound to domainStats) — domain colours are IDENTITY only; aria-labelled gateway, NOT decorative/aria-hidden. If a 40px chart can't be made legible, use an honest domain-cluster glyph instead — never a fake polygon (see Visualization S13-V06) |
| Domain tag chips | [domain color] at 15% bg | per domain | Identification only |
| SIA suggestion border | #7F24FF at 40% | purple/40 | AI indicator (max 2 purple elements) |
| Quick actions menu bg | #211008 | ink-brown-800 | + backdrop-blur |
| Quick actions overlay | #0A0A0F at 40% | ink-900/40 | Dismissible backdrop |
| Eyebrow labels | #FFFFFF at 40% | white/40 | Section identifiers |

**60/30/10 verification**: Orange dominates data ink — active type chip, segmented control active, per-mission GaugeRing fills, board MomentumBar effort fill, KPI accents, heatmap intensity, XP badges, FAB, chain current dot, filter active dot. Green = arrival/in-range only — completed (100%) rings, chain completed dots, MomentumBar goal arrival, milestone/Sparkline end dots, ▲ deltas. Purple = SIA only — SIA suggestion card border (the single sanctioned purple group); no projection is shown on this screen, so no dashed-purple appears. Difficulty is carried by a NEUTRAL tier glyph + label (●/◆ + "Easy/Moderate/Hard"), never an alarm colour — error-red is NOT used on difficulty (it would read as danger/shame). Calibrated red is reserved for genuine operational status only, glyph-paired; overdue/paused missions desaturate and show a constructive "Resume" affordance, never red. Domain colours tint per-mission gauges (identity) and tag chips only. Mission-tier metallics stay on type badges as tier identity, never data ink. Ratio holds.

---

## Interaction States

### Mission Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, full content | — |
| Pressed | scale(0.98), bg darkens to #1A0C06 | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A (cards are always interactive) | — |
| Loading | Skeleton shimmer: ring area + 3 text lines + 2 chip shapes + chain bar placeholder | — |
| Long-press | scale(0.97) hold + Quick Actions Menu appears | medium impact |
| Completed variant | Ring green, card at 70% opacity, "completed" badge replaces streak | — |
| Paused variant | Ring gray, card at 60% opacity, "paused" badge | — |
| Pinned variant | Pin icon visible top-right, otherwise same as default | — |

### Type Filter Chip
| State | Visual | Haptic |
|-------|--------|--------|
| Default (inactive) | ink-brown-800 bg, white at 60% text | — |
| Pressed | scale(0.95), bg darkens | light impact |
| Active | Orange bg, white text | light impact on activate |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Status Segmented Control
| State | Visual | Haptic |
|-------|--------|--------|
| Segment inactive | Transparent bg, white/50 text | — |
| Segment active | Orange bg pill, white text | light impact |
| Pressed (on inactive) | White/5 bg flash | light impact |
| Focus-visible | 2pt orange ring around control | — |

### Header Icon (Journal / Filter)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | White at 60% | — |
| Pressed | White at 40%, scale(0.9) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### SIA Suggestions Header
| State | Visual | Haptic |
|-------|--------|--------|
| Collapsed | Chevron right, count badge visible | — |
| Pressed | White at 3% bg flash on row | light impact |
| Expanded | Chevron rotates down, content visible below | — |
| Focus-visible | 2pt orange ring around row | — |

### Life Areas Radar Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, chart + label + chevron | — |
| Pressed | scale(0.98), bg darkens | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Quick Actions Menu Item
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Transparent bg, white icon + text | — |
| Pressed | White at 5% bg highlight | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Mission card | Stack push to Mission Detail [14] |
| Tap | "Next: [action]" row on card | Inline completion (checkbox appears + complete animation) |
| Long-press (>500ms) | Mission card | Quick Actions Menu appears |
| Tap | Type filter chip | Activate type filter, deactivate others |
| Tap | Status segment | Switch status filter |
| Tap | Journal icon (header) | Stack push to Mission Journal [73] |
| Tap | Filter icon (header) | Present Domain Filter Bottom Sheet |
| Tap | Domain chips in bottom sheet | Toggle domain selection (multi-select) |
| Tap | "apply" in bottom sheet | Apply domain filter, dismiss sheet |
| Tap | SIA Suggestions header | Toggle expand/collapse |
| Tap | "accept" on suggestion card | Opens Create Mission [15] pre-filled |
| Tap | "dismiss" on suggestion card | Card collapses + fades out |
| Tap | Radar preview card | Stack push to Life Areas Overview [16] |
| Tap | FAB "+" | Modal present Create Mission [15] |
| Tap | Chain Progress Bar | Bottom sheet with chain name + mission titles |
| Pull down (from top) | Entire list | Pull-to-refresh — branded spinner |
| Tap outside | Quick Actions Menu | Dismiss menu |
| Tap outside | Domain Filter Bottom Sheet | Dismiss sheet |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Screen title | Scroll past title | Collapse from 28pt left-aligned to 17pt center-aligned in nav bar | 160ms | ease-out-soft |
| Type filter chips | Screen mount | Fade-in + translateX(-12→0), staggered 60ms | 280ms each | ease-out-soft |
| Status segmented control | Screen mount | Fade-in + translateY(8→0) | 280ms | ease-out-soft |
| Status active pill | Segment tap | Orange bg slides to new position | 280ms | ease-out-soft |
| Radar preview card | Screen mount | Fade-in + translateY(12→0) | 280ms | ease-out-soft |
| Pinned section eyebrow | Screen mount | Fade-in, stagger after radar card | 280ms | ease-out-soft |
| Mission cards | Screen mount / list refresh | Staggered fade-in + translateY(12→0), 80ms stagger | 280ms each | ease-out-soft |
| Progress rings in cards | Card enters viewport | Ring fill animates from 0→current% | 520ms | ease-flow |
| Chain progress bar | Card enters viewport | Dots appear sequentially left→right, 60ms stagger | 160ms each | ease-out-soft |
| FAB | Screen mount | Scale(0→1) + fade-in, delayed 400ms after content | 280ms | ease-flow |
| FAB scroll hide | Fast downward scroll | translateY(0→120pt) + fade-out | 280ms | ease-out-soft |
| FAB scroll show | Upward scroll or rest | translateY(120pt→0) + fade-in | 280ms | ease-out-soft |
| Quick Actions Menu | Long-press trigger | Scale(0.95→1) + fade-in, anchored to card | 160ms | ease-out-soft |
| Quick Actions Menu dismiss | Tap outside | Fade-out | 160ms | ease-out-soft |
| Quick Actions backdrop | Menu open | Fade-in (0→40% opacity) | 160ms | ease-out-soft |
| SIA Suggestions expand | Tap header | Content height 0→auto + fade-in. Chevron rotates 0→90° | 280ms | ease-out-soft |
| SIA Suggestions collapse | Tap header | Content height auto→0 + fade-out. Chevron rotates 90°→0 | 280ms | ease-out-soft |
| SIA Suggestion dismiss | Tap "dismiss" | Card height collapses + fade-out | 280ms | ease-out-soft |
| Domain Filter Bottom Sheet | Filter icon tap | Slide up from bottom + backdrop fade-in | 520ms | ease-flow |
| Domain Filter dismiss | Apply/drag/backdrop tap | Slide down + backdrop fade-out | 280ms | ease-out-soft |
| Filter list transition | Filter change | Crossfade old list → new list | 280ms | ease-out-soft |
| Inline completion | Tap "Next:" action | Checkbox appears, fills orange, checkmark scales in | 280ms | ease-flow |
| Pull-to-refresh spinner | Pull past 60pt | Balencia symbol appears, rotates | loop | linear |
| Pin toast | Pin limit exceeded | Toast slides down from top, auto-dismiss 3s | 280ms in/out | ease-out-soft |

**Screen transition**:
- **Enter (tab switch)**: Instant — screen is pre-mounted in tab navigator
- **Exit (stack push to Mission Detail)**: Standard iOS push (slide left), 280ms ease-out-soft
- **Exit (stack push to Mission Journal)**: Standard iOS push (slide left), 280ms ease-out-soft
- **Exit (modal present Create Mission)**: Modal slides up from bottom, 520ms ease-flow

---

## Empty States

### Day 1 (no missions created)
- Type filter chips: hidden (no content to filter)
- Status segmented control: hidden
- Radar preview card: hidden (no domain data yet)
- Pinned section: hidden
- SIA Suggestions: hidden
- Central empty state content (vertically centered in available space):
  - Illustration: abstract quest map outline (ink-brown-800 tones, orange accent path), ~120pt
  - Heading: "no missions yet" — 20pt Sora Semibold, white
  - Body: "SIA can help you create your first mission based on what matters most to you." — 15pt Sora Regular, white at 60%, center-aligned, max 280pt width
  - Primary CTA: "create your first mission" — Brand CTA Button (full-width orange pill, 56pt)
  - SIA suggestion chips (below CTA, 16pt gap): 3 starter mission suggestions from SIA based on onboarding. Each is a tappable chip (ink-brown-800, 1pt white at 10% border, pill shape). Tapping pre-fills the Create Mission [15] input field.
    - Example: "Start a daily meditation habit", "Set a savings goal for the year", "Train for a 5K run"
- FAB: still visible (redundant with inline CTA, but maintains spatial consistency)

### Established user — filtered empty state
When a filter returns no results:
- "no [filter] missions" — 17pt Sora Semibold, white, centered
- Contextual message varies:
  - Type filter: "You don't have any [type] missions yet. Create one with the + button."
  - Status filter: "No completed missions yet. Keep going." / "All missions are done. Time to start something new."
  - Domain filter: "No missions in this domain yet."
- 15pt Sora Regular, white at 50%, centered

---

## Motivation Adaptation

- **Low motivation**:
  - Mission cards simplified: only progress ring + mission name + next action (no SIA note, no XP/streak row, no chain bar, no difficulty dot)
  - Card height reduces to ~88pt
  - Type filter chips hidden (reduces cognitive overhead — user sees all missions in simple list)
  - Status segmented control hidden
  - SIA Suggestions section hidden
  - Radar preview card hidden
  - Pinned section still shows (these are the user's chosen priorities)

- **Medium motivation** (default):
  - Full mission cards with all elements (ring, name, type badge, tags, next action, SIA note, XP/streak, difficulty, chain)
  - All filter controls visible
  - Pinned section visible
  - SIA Suggestions visible (collapsed)
  - Radar preview card visible

- **High motivation**:
  - Full mission cards with expanded SIA note (2 lines instead of 1)
  - Additional stats visible on cards: completion rate percentage, days remaining
  - Type filter chips with count badges ("main (3)", "weekly (5)")
  - SIA Suggestions auto-expanded
  - Sort options accessible (by priority, by deadline, by domain, by XP)

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Screen title ("your missions") | Sora | Bold (700) | 28pt | 34pt | #FFFFFF |
| Collapsed title (nav bar) | Sora | Semibold (600) | 17pt | 22pt | #FFFFFF |
| Type filter chip label (inactive) | Sora | Semibold (600) | 13pt | 18pt | #FFFFFF at 60% |
| Type filter chip label (active) | Sora | Semibold (600) | 13pt | 18pt | #FFFFFF |
| Status segment label (inactive) | Sora | Semibold (600) | 13pt | 18pt | #FFFFFF at 50% |
| Status segment label (active) | Sora | Semibold (600) | 13pt | 18pt | #FFFFFF |
| Section eyebrow ("PINNED", "SIA SUGGESTIONS") | Sora | Semibold (600) | 12pt | 16pt | #FFFFFF at 40% |
| SIA suggestions count badge | Sora | Regular (400) | 12pt | 16pt | #FFFFFF at 30% |
| Radar card label | Sora | Semibold (600) | 15pt | 20pt | #FFFFFF |
| Mission card name | Sora | Semibold (600) | 16pt | 22pt | #FFFFFF |
| Mission card next action | Sora | Regular (400) | 13pt | 18pt | #FFFFFF at 70% |
| Mission card SIA coaching note | Sora | Regular (400) | 13pt | 18pt | #FFFFFF at 50% |
| Mission card XP badge | Sora | Semibold (600) | 12pt | 16pt | #FF5E00 |
| Mission card streak text | Sora | Semibold (600) | 12pt | 16pt | #FFFFFF at 60% |
| Mission card chain label | Sora | Regular (400) | 11pt | 14pt | #FFFFFF at 40% |
| Mission type badge label | Sora | Semibold (600) | 11pt | 14pt | [type color] |
| Progress ring percentage (small) | Sora | Semibold (600) | 12pt | 16pt | #FFFFFF |
| Domain tag chip label | Sora | Semibold (600) | 11pt | 14pt | [domain color] |
| Quick actions menu item | Sora | Regular (400) | 15pt | 20pt | #FFFFFF |
| Bottom sheet title | Sora | Semibold (600) | 17pt | 22pt | #FFFFFF |
| Bottom sheet actions | Sora | Semibold (600) | 15pt | 20pt | #FF5E00 / #FFFFFF at 40% |
| Empty state heading | Sora | Semibold (600) | 20pt | 26pt | #FFFFFF |
| Empty state body | Sora | Regular (400) | 15pt | 20pt | #FFFFFF at 60% |
| Empty state CTA | Sora | Semibold (600) | 17pt | 22pt | #FFFFFF |
| Filtered empty message | Sora | Semibold (600) | 17pt | 22pt | #FFFFFF |
| Filtered empty body | Sora | Regular (400) | 15pt | 20pt | #FFFFFF at 50% |
| Pin toast text | Sora | Regular (400) | 15pt | 20pt | #FFFFFF at 80% |

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Network failure (missions fetch) | Mission cards show skeleton shimmer (ring area + 3 text lines + 2 chip shapes + chain bar per card). Error banner at top. | Pull-to-refresh retries. Auto-retry every 30s. |
| API timeout (missions list) | Same skeleton shimmer state. After 8s, shows "Couldn't load your missions." message with "try again" button. | Tap "try again" to retry. Pull-to-refresh also retries. |
| Empty response (no missions from API, but user has missions) | Shows skeleton briefly, then falls back to cached data if available. If no cache, shows "Something went wrong loading your missions." | Pull-to-refresh retries. Cached data displayed if available. |
| Action completion sync failure | Checkbox reverts to unchecked state. Inline error toast: "Couldn't save. Try again." | Tap checkbox again to retry. Change queued for sync when connection restores. |
| Life areas radar data failure | Radar preview card shows placeholder (gray chart outline) instead of mini radar. Card still tappable. | Data loads on next successful fetch. |
| SIA suggestions fetch failure | SIA Suggestions section hidden (graceful degradation — no error shown). | Retries on next screen visit or pull-to-refresh. |
| Pin action failure | Pin state reverts. Toast: "Couldn't pin. Try again." | User retries from Quick Actions Menu. |
| Domain filter bottom sheet data failure | Domain chips show skeleton shimmer briefly, then fall back to hardcoded 10-domain list. | Domain data loads on next attempt. |
| Filter returns empty (not an error) | "no [filter] missions" message centered. Contextual body text. | User changes filter or creates new mission via FAB. |

---

## Accessibility

Accessibility follows global standards from `_shared-patterns.md`. Screen-specific notes:

- **Screen reader labels**:
  - Screen title: "Your missions, mission board"
  - Journal icon: "Mission journal, tap to view history"
  - Filter icon: "Filter by domain, [active/inactive]" (announces "active, [count] domains selected" when filter is on)
  - Type filter chip: "[type name], [active/inactive], tap to filter" (e.g., "Main, selected, tap to filter")
  - Status segment: "[status], [selected/not selected]"
  - Pinned section eyebrow: "Pinned missions, [count] pinned"
  - Mission card: "[mission name], [type] mission, [percentage] complete, [domain names], next action: [action text], [difficulty] difficulty, [chain position if applicable]"
  - Progress ring (small): "[percentage] percent complete"
  - Mission type badge: "[type] mission"
  - Chain progress bar: "Mission chain, step [current] of [total]"
  - Difficulty indicator: a VISIBLE tier glyph + label beside the colour (e.g. "Easy ●" / "Moderate ◆" / "Hard ◆") so difficulty is never colour-alone for sighted colour-blind users; screen-reader label: "[easy/moderate/hard] difficulty". Difficulty uses a neutral tier glyph, never alarm-red (see Visualization §states/brand).
  - FAB: "Create new mission"
  - Radar preview card: "Life areas overview, tap to view"
  - SIA Suggestions header: "SIA suggestions, [count] available, [collapsed/expanded]"
  - Quick actions menu: "Mission options menu" (announced on long-press)
  - Quick actions menu items: "[action name]" (e.g., "Pin to home", "Pause mission", "Archive", "Edit")
- **Focus order**: Screen title → Header icons (journal, filter) → Type filter chips (left to right) → Status segments → Radar preview card → Pinned missions (top to bottom) → SIA Suggestions header → Mission cards (top to bottom, each card as a unit) → FAB
- **Gesture alternatives**: Long-press context menu also accessible via "Actions" rotor item on each mission card. FAB accessible regardless of scroll position via accessibility shortcut.
- **Reduced motion**: Staggered card entry replaced with instant display. Progress ring fills appear at final value. FAB hide/show on scroll is disabled (FAB always visible). Chain progress bar dots appear instantly. Status segment slides instantly.

---

## Cross-References

- **Navigates to**: Mission Detail [14] via stack push, Create Mission [15] via modal present, Life Areas Overview [16] via stack push, Mission Journal [73] via stack push
- **Navigates from**: Tab bar (Goals tab root), Home Screen [12] via tab switch ("view all missions")
- **Shared components with**: Home Screen [12] (Domain Tag Chip, Progress Ring small/medium, Section Eyebrow, Pull-to-Refresh, Pinned Mission Card), Mission Detail [14] (Domain Tag Chip, Progress Ring, Mission Card as reference, Chain Progress Bar, Difficulty Tier Indicator, Mission Type Badge), Create Mission [15] (Mission Type Badge, Domain Tag Chip)
- **Patterns used**: Product Mode Screen Title (from Screen 12), Domain Tag Chip (from Screen 12), Progress Ring small variant, Pull-to-Refresh (from Screen 12), Mission Type Badge (Phase 2), Chain Progress Bar (Phase 2), Difficulty Tier Indicator (Phase 2), SIA Mission Suggestion Card (Phase 2), 8-State Interaction Model, Motion Tokens, Content Entry Animation (staggered fade-in)
- **Patterns established**: Mission Card (evolves Goal Card with type badge, chain bar, difficulty dot), Type Filter Chips Row, Status Segmented Control, Domain Filter Bottom Sheet, Pinned Missions Section, SIA Suggestions Collapsible Section, Quick Actions Menu (updated with pin action)
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-06.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U03`
**Prototype route**: `/tabs/goals`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q14 SIA in chats requires explicit invocation.
- Q15 group health/recovery signals require per-user permission.
- Q23 call follow-up scheduling should reuse the voice-history scheduling sheet.
- Q24 create mission starts from blank natural-language intent.
- Q25 streak details preserve source tab context.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B06-F03 | major | information-architecture | Implement mission filtering, domain filter bottom sheet, and expandable/actionable SIA suggestions. |
| B06-F04 | major | mobile-ergonomics | Add 44px hit areas and selected/pressed semantics while preserving compact visual styling. |

### Prototype Implications

- Keep the existing visual direction, then verify touch targets, labels, and route parity in the prototype phase.

