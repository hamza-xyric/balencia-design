# Screen Design: Life Areas Overview

**Screen**: 16 of 43
**File**: 16-life-areas-overview.md
**Register**: Product Mode
**Primary action**: assess life balance and navigate to domain dashboards
**Tab**: Goals
**Navigation**: Stack depth 1 from Goals tab root (Goals List [13]). Also reachable from Home Screen [12] and domain-tagged elements throughout the app.

---

## Purpose

Life Areas Overview gives users a holistic visual snapshot of their progress across all active life domains. The radar chart answers "where am I strong and where do I need attention?" in a single glance. It's the entry point to every domain dashboard — tap any axis or list row to drill into that domain. SIA provides a brief coaching insight about overall life balance, reinforcing the "one life, not modules" philosophy. No unified "Life Score" number — the shape of the radar tells the story.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Life wheel radar chart — large, center, domain-colored axes (primary visual — the shape tells the story)
2. SIA insight card — brief coaching note about balance ("Your fitness and nutrition are thriving. Career could use attention.")
3. Time range selector — week / month / all-time toggle
4. Domain list — scrollable rows with domain color, name, progress bar, active goal count (detail view)

**User flow**:
- **Arrives from**: Goals List [13] (tap life areas preview), Home Screen [12] (tap domain tags), SIA Chat [09] (deep-link), bottom of various screens with domain tags
- **Primary exit**: Tap domain (chart axis or list row) → Domain dashboard (stack push)
- **Secondary exits**: Tap SIA insight → SIA Chat [09] (tab switch with context), back → Goals List [13] (stack pop)

---

## Layout

**Scroll behavior**: ScrollView (content may extend beyond viewport on smaller devices when all 9 domains are active)
**Tab bar visible**: Yes (Goals tab active)

### ASCII Wireframe

```
┌─────────────────────────────────┐
│  Status Bar (44pt)              │
├─────────────────────────────────┤
│                                 │
│  ← Life areas          16pt    │  ← Back + title row (44pt)
│                                 │
│         ┌─────────────┐         │
│        ╱   Fitness     ╲        │
│       ╱       ●         ╲       │
│      ╱      ╱   ╲        ╲     │
│  Crea│tiv ●─ ─ ─ ─●Nutri  │   │  ← Radar chart
│      ╲  ●  ╲   ╱  ●  ╱     │  │    ~280pt
│       ╲      ╲╱        ╱    │  │
│        ╲   ●    ●    ╱      │  │
│         └──Learn──Fin──┘    │  │
│            Spirit  Career      │
│            Relat   Wellbe      │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 💬 SIA: your fitness    │   │  ← SIA insight card
│  │ and nutrition are       │   │    ~72pt
│  │ thriving. career could  │   │
│  │ use attention.          │   │
│  └─────────────────────────┘   │
│                                 │
│  [Week] [Month] [All-time]     │  ← Time range selector (40pt)
│                                 │
│  ┌─────────────────────────┐   │
│  │ ● Fitness        ━━━░░ │3g │  ← Domain rows
│  │ ● Nutrition      ━━░░░ │2g │    ~56pt each
│  │ ● Finance        ━░░░░ │1g │
│  │ ● Career         ░░░░░ │0g │
│  │ ● Relationships  ━━░░░ │2g │
│  │ ● Spirituality   ━━━░░ │4g │
│  │ ● Learning       ━░░░░ │1g │
│  │ ● Creativity     ░░░░░ │0g │
│  │ ● Wellbeing      ━━░░░ │3g │
│  └─────────────────────────┘   │
│                                 │
│  32pt bottom padding            │
├─────────────────────────────────┤
│  [Today] [ SIA ] [Goals] [ Me ]│  ← Tab bar (56pt)
├─────────────────────────────────┤
│  Home Indicator (34pt)          │
└─────────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Navigation header** — 44pt
   - Purpose: back button + screen title
   - Content: back chevron (left) + "life areas" (center, 17pt Sora Semibold)

2. **Radar chart** — ~280pt
   - Purpose: holistic life balance visualization
   - Content: spider/radar chart with domain-colored axes

3. **SIA insight card** — ~72pt
   - Purpose: coaching context for the visualization
   - Content: SIA's balance assessment

4. **Time range selector** — ~40pt
   - Purpose: switch between time windows
   - Content: segmented control (week / month / all-time)

5. **Domain list** — ~56pt per row × number of active domains
   - Purpose: detailed per-domain breakdown with navigation
   - Content: domain color dot, name, progress bar, active goal count

6. **Bottom spacing** — 32pt

---

## Components

### Navigation Header
- **Purpose**: Back navigation and screen identification
- **Data source**: Static
- **Visual treatment**: Standard Product Mode header — 44pt row, back chevron left, title center
- **Content**:
  - Back button: per Batch 1 pattern (left chevron, white, 2pt stroke, 20pt icon, 44x44pt target, 16pt from left)
  - Title: "life areas" — 17pt Sora Semibold, white, center-aligned
- **Variants**: None
- **Gestures**: Tap back → stack pop. iOS swipe-from-left-edge → stack pop.
- **Size**: full-width x 44pt

### Radar Chart (Life Wheel)
- **Purpose**: Visual "shape of your life" — shows relative strength across domains
- **Data source**: Domain progress aggregation API (per time range)
- **Visual treatment**: Spider/radar chart on transparent background (no card surface — floats on ink-900)
- **Specifications**:
  - Chart diameter: 240pt (fits within 280pt vertical space with labels)
  - Centered horizontally
  - Axes: one per active domain (minimum 3, maximum 9+). Axes radiate from center.
  - Grid rings: 3 concentric rings (33%, 66%, 100%) drawn with white at 5% opacity, 1pt stroke
  - Axis lines: white at 8% opacity, 1pt stroke, from center to edge
  - Data polygon: filled with orange (#FF5E00) at 15% opacity, stroked with orange at 80%, 2pt stroke. Vertices sit on axes at the domain's progress percentage.
  - Vertex dots: 6pt circles, filled with respective domain color, positioned at data point on each axis
  - Domain labels: 11pt Sora Semibold, white at 70%, positioned 12pt beyond the chart edge along each axis, center-aligned relative to axis endpoint
  - Tappable zones: each axis label + surrounding 44x44pt area is a touch target → domain dashboard
- **Variants**:
  - Populated (3+ domains with data) — full radar
  - Early stage (fewer data points) — axes still show, polygon is small/close to center. Unfilled areas labeled "potential" in white at 30%
  - Single time range active (week / month / all-time changes the data points)
- **Gestures**: Tap domain label or vertex dot → domain dashboard (stack push). Chart does not rotate or pinch-zoom.
- **Size**: full-width x ~280pt

### SIA Insight Card
- **Purpose**: Contextual coaching about life balance
- **Data source**: SIA analysis API (generated based on radar chart data)
- **Visual treatment**: ink-brown-800 card, border-radius 16pt, 1pt border white at 8%, 16pt padding. Subtle purple (#7F24FF) left border (3pt) as SIA indicator.
- **Content**:
  - SIA icon: 16pt circle with purple gradient fill, 4pt right margin (inline with text start)
  - Text: 14pt Sora Regular, white at 80%, 3 lines max. Sentence case, no exclamation marks.
  - Example: "your fitness and nutrition are thriving. career could use some attention — want to set a goal?"
  - Tap affordance: right chevron, 12pt, white at 30%, right-aligned vertically centered
- **Variants**:
  - New user: "welcome to your life overview. as you set goals and track progress, this chart will show your journey across all areas."
  - Balanced user: positive reinforcement about balance
  - Imbalanced user: gentle suggestion about neglected areas
- **Gestures**: Tap → SIA Chat [09] (tab switch with context pre-loaded). Tap is on entire card.
- **Size**: full-width minus 32pt (16pt margins) x ~72pt

### Time Range Selector
- **Purpose**: Switch between week / month / all-time data views
- **Data source**: Controls the radar chart and domain list data
- **Visual treatment**: Segmented control (3 segments), centered horizontally
  - Container: ink-brown-800 pill (border-radius 999pt), 1pt border white at 8%, height 36pt
  - Segment width: equal thirds of container (~100pt each on standard screen)
  - Active segment: orange (#FF5E00) fill, border-radius 999pt, white text 14pt Sora Semibold
  - Inactive segments: transparent, white at 50% text 14pt Sora Regular
  - Options: "week" | "month" | "all-time" (sentence case)
  - Container width: full-width minus 64pt (32pt margins each side, more compact than full-width)
- **Variants**: None (always 3 options)
- **Gestures**: Tap segment → updates chart and list data. Active segment slides with 280ms ease-out-soft animation.
- **Size**: ~280pt wide x 36pt

### Domain List
- **Purpose**: Detailed per-domain breakdown with drill-down navigation
- **Data source**: Domain progress aggregation API (same as radar, per time range)
- **Visual treatment**: Flat list of rows, no card surface (directly on ink-900). Thin dividers between rows (1pt, white at 5%).
- **Row specification**:
  - Height: 56pt (minimum touch target)
  - Left: Domain color dot (10pt circle, filled with domain hex) + 12pt gap
  - Domain name: 15pt Sora Semibold, white, left-aligned
  - Progress bar: horizontal, 120pt wide, 4pt height, pill shape. Track: white at 8%. Fill: domain's color at 80%.
  - Active goal count: right-aligned, 13pt Sora Regular, white at 50%. Format: "3 goals" or "no goals"
  - Right chevron: 10pt, white at 20%, 4pt after goal count
  - Padding: 16pt left, 16pt right
- **Row order**: Sorted by progress percentage descending (strongest domains first) within the selected time range
- **Variants**:
  - Domain with no goals: progress bar empty, "no goals" text, still tappable
  - Domain not yet activated: row appears dimmer (white at 30% for all text), "tap to explore" replaces goal count
- **Gestures**: Tap row → domain dashboard (stack push)
- **Size**: full-width x 56pt per row

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Base |
| SIA insight card surface | #211008 | ink-brown-800 | z-10 |
| SIA insight card left border | #7F24FF | Royal Purple | 10% — SIA indicator (1 of max 2 purple elements) |
| SIA icon circle | #7F24FF gradient | Royal Purple | 10% — SIA identity (2 of max 2 purple elements) |
| Radar data polygon fill | #FF5E00 at 15% | Burnt Orange | 60% — primary data |
| Radar data polygon stroke | #FF5E00 at 80% | Burnt Orange | 60% — primary data |
| Active time range segment | #FF5E00 | Burnt Orange | 60% — active control |
| Active tab (Goals) icon | #FF5E00 | Burnt Orange | 60% — tab indicator |
| Grid rings | white at 5% | — | Subtle reference lines |
| Axis lines | white at 8% | — | Subtle reference lines |
| Domain vertex dots | per-domain hex | Domain colors | Identification on chart |
| Domain list color dots | per-domain hex | Domain colors | Identification in list |
| Domain list progress fills | per-domain hex at 80% | Domain colors | Per-domain bars |
| Domain labels (chart) | white at 70% | — | Secondary text |
| Domain names (list) | white 100% | — | Primary text |
| Goal count text | white at 50% | — | Tertiary text |
| Divider lines | white at 5% | — | Subtle separators |

**60/30/10 verification**: Orange dominates through the radar polygon and active segmented control. Green is absent (no success states on this screen — appropriate). Purple limited to exactly 2 elements (SIA card left border + SIA icon). Domain colors used strictly for identification (dots, vertices, progress fills) — never for actions. Ratio holds.

---

## Interaction States

### Radar Chart Domain Label / Vertex (Tap to Dashboard)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | label at white 70%, vertex dot 6pt filled | — |
| Pressed | label brightens to white 100%, vertex dot scales to 10pt, domain color glow around dot | light impact |
| Focus-visible | 2pt orange ring around label text | — |
| Disabled | N/A (always interactive) | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### SIA Insight Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800, purple left border, right chevron at 30% | — |
| Pressed | scale(0.97), bg lightens, right chevron brightens to 60% | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.5 opacity | — |
| Loading | text replaced with 2-line skeleton shimmer | — |
| Error | N/A | — |
| Success | N/A | — |

### Time Range Segment
| State | Visual | Haptic |
|-------|--------|--------|
| Default (active) | orange fill, white text Semibold | — |
| Default (inactive) | transparent, white at 50% text Regular | — |
| Pressed (inactive) | bg white at 5%, text brightens to 70% | light impact |
| Focus-visible | 2pt orange ring inside segment | — |
| Disabled | 0.5 opacity | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### Domain List Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | row on ink-900, text and bar visible | — |
| Pressed | bg briefly flashes ink-brown-800, scale(0.98) horizontal | light impact |
| Focus-visible | 2pt orange ring around entire row | — |
| Disabled | 0.5 opacity (for unactivated domains) | — |
| Loading | domain name visible, progress bar shows skeleton shimmer | — |
| Error | N/A | — |
| Success | N/A | — |

### Back Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | white chevron, 2pt stroke | — |
| Pressed | white at 60%, scale(0.95) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Domain label on chart | Push domain dashboard |
| Tap | Domain vertex dot on chart | Push domain dashboard |
| Tap | Domain list row | Push domain dashboard |
| Tap | SIA insight card | Switch to SIA tab with context |
| Tap | Time range segment | Switch data time range |
| Tap | Back button | Stack pop to Goals List [13] |
| Swipe right (from edge) | Screen | Stack pop (iOS native) |
| Pull-to-refresh | Screen top | Refresh radar data + SIA insight |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Radar polygon | Screen mount | Vertices animate from center (0%) to actual values. Polygon "grows" outward. | 520ms | ease-flow |
| Radar polygon | Time range change | Vertices morph from old values to new values | 280ms | ease-out-soft |
| Domain vertex dots | Screen mount | Fade-in at 80% of polygon animation (staggered per axis) | 160ms each | ease-out-soft |
| SIA insight card | Screen mount | Fade-in + translateY(12→0), starts after radar completes | 280ms | ease-out-soft |
| Time range selector | Screen mount | Fade-in + translateY(8→0) | 280ms | ease-out-soft |
| Active segment indicator | Segment tap | Slides horizontally to new position | 280ms | ease-out-soft |
| Domain list rows | Screen mount | Staggered fade-in, 40ms per row, starts after selector | 280ms each | ease-out-soft |
| Domain list progress bars | Screen mount | Width animates 0 → value, starts 100ms after row fade-in | 280ms | ease-out-soft |
| Domain vertex (pressed) | Tap | Scale 6pt → 10pt → 6pt | 160ms | ease-out-soft |

**Screen transition**:
- **Enter**: Stack push from right (280ms, ease-out-soft). Content stagger begins after slide completes.
- **Exit (to dashboard)**: Stack push to right — this screen slides left, dashboard slides in from right.
- **Exit (back)**: Stack pop — this screen slides right and out.

---

## Empty States

### Day 1 (new user)
- Radar chart shows all active domains as axes, but the polygon is very small (near center, ~10% on all axes).
- No vertex dots glow — all are at baseline.
- SIA insight: "welcome to your life overview. as you set goals and make progress, this chart will grow to show your strengths across all areas."
- Domain list: all domains visible, progress bars empty, "no goals" on each row. Rows are still tappable ("tap to explore" text instead of goal count).
- Time range selector: "month" selected by default. "week" may show even less data.

### Established user, zero progress this week
- Radar chart shows data (from cumulative progress), but may be unchanged from prior week.
- SIA insight adapts: "looks like a quiet week so far. sometimes rest is productive too."
- Domain list shows current progress (never zero for established users with history).

---

## Motivation Adaptation

- **Low motivation**: Radar chart shows the same data but SIA insight focuses on the strongest domain ("you're doing great with fitness — keep that momentum"). Domain list may hide domains with 0 goals to reduce overwhelm, showing a "show all domains" toggle.
- **Medium motivation**: Default experience as described above.
- **High motivation**: Domain list shows additional data: trend arrow (up/down/flat) next to progress bar, and a secondary line of 12pt text showing percentage change from prior period. SIA insight is more analytical ("fitness up 12% this month, career down 8% — the correlation may be time allocation").

---

## Cross-References

- **Navigates to**: Domain dashboards [26-36] via chart tap or list row (stack push), SIA Chat [09] via SIA insight card (tab switch with context)
- **Navigates from**: Goals List [13] via life areas preview (stack push), Home Screen [12] via domain tags (stack push), SIA Chat [09] via deep-link (tab switch + push)
- **Shared components with**: Screen [19] — RPG Character (domain-level rows, progress bar pattern), Screen [13] — Goals List (back button, Goals tab active)
- **Patterns used**: Back Button (Batch 1), Bottom Tab Bar (_shared-patterns.md), Product Mode header (established in this batch)
- **Patterns established**: Radar chart (life wheel), Domain list row, Time range segmented control, SIA insight card (with purple left border), Domain color dot (10pt identification circle)
