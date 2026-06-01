# Screen Design: Life Areas Overview

**Screen**: 16 of 73
**File**: 16-life-areas-overview.md
**Register**: Product Mode
**Primary action**: assess life balance and navigate to domain dashboards
**Tab**: Goals
**Navigation**: Stack depth 1 from Goals tab root (Goals List [13]). Also reachable from Home Screen [12] and domain-tagged elements throughout the app.

---

## Purpose

Life Areas Overview gives users a holistic visual snapshot of their progress across all 10 life domains. The 10-axis radar chart answers "where am I strong and where do I need attention?" in a single glance — the shape of the polygon IS the story. Life Power (the single competitive number) summarizes overall life proficiency below the chart. It's the entry point to every domain dashboard — tap any axis or list row to drill into that domain. SIA provides coaching insight about balance. Comparison views (vs last week / vs last month) let users see the polygon shift over time, making growth tangible.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Life wheel radar chart — large, center, 10 domain-colored axes (primary visual — the shape tells the story)
2. Life Power score — single competitive number below chart (holistic proficiency)
3. SIA insight card — brief coaching note about balance ("Your fitness and sleep are thriving. Career could use attention.")
4. Time range selector — current / vs last week / vs last month toggle
5. Domain list — scrollable rows with domain color, name, stat score (0-99), progress bar, active goal count

**User flow**:
- **Arrives from**: Goals List [13] (tap life areas preview), Home Screen [12] (tap domain tags), SIA Chat [09] (deep-link), bottom of various screens with domain tags
- **Primary exit**: Tap domain (chart axis or list row) → Domain dashboard (stack push)
- **Secondary exits**: Tap SIA insight → SIA Chat [09] (tab switch with context), back → Goals List [13] (stack pop)

---

## Layout

**Scroll behavior**: ScrollView (content extends beyond viewport with all 10 domains)
**Tab bar visible**: Yes (Goals tab active)

### ASCII Wireframe

```
┌─────────────────────────────────┐
│  Status Bar (44pt)              │
├─────────────────────────────────┤
│                                 │
│  ← Life areas          16pt    │  ← Back + title row (44pt)
│                                 │
│              FIT                │
│          MED ╱ ╲ SLP            │
│         ╱  ●     ●  ╲          │
│    WEL ●  ╱ ╲   ╱ ╲  ● CAR    │  ← 10-axis radar chart
│         ╲●   ╲ ╱   ●╱          │    280pt canvas
│    REL ● ╲   ╱ ╲   ╱ ● NUT    │    5 concentric rings
│         ╲  ● ╱   ╲ ╱           │    (20/40/60/80/99)
│          PRO ╲ ╱ FIN            │
│              FAI                │
│                                 │
│          ◆ 487 Life Power       │  ← Life Power score
│                                 │
│  ┌─────────────────────────┐   │
│  │ 💬 SIA: your body       │   │  ← SIA insight card
│  │ domains are strong.     │   │    ~72pt
│  │ career could use        │   │
│  │ attention.              │   │
│  └─────────────────────────┘   │
│                                 │
│  [Current] [vs Week] [vs Month]│  ← Time range selector (40pt)
│                                 │
│  ┌─────────────────────────┐   │
│  │ ● Fitness      72  ━━░░│3g │  ← Domain rows w/ stat score
│  │ ● Sleep        65  ━━░░│2g │    ~56pt each
│  │ ● Career       31  ━░░░│1g │    10 domains
│  │ ● Nutrition    58  ━━░░│2g │
│  │ ● Finance      44  ━░░░│1g │
│  │ ● Faith        52  ━━░░│4g │
│  │ ● Productivity 48  ━░░░│1g │
│  │ ● Relationships 55 ━━░░│2g │
│  │ ● Wellbeing    61  ━━░░│3g │
│  │ ● Meditation   39  ━░░░│1g │
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
   - Purpose: holistic life balance visualization — "the shape of who you are becoming"
   - Content: 10-axis spider/radar chart with domain-colored vertices

3. **Life Power display** — ~48pt
   - Purpose: single competitive number summarizing overall life proficiency
   - Content: diamond icon + Life Power score + "life power" label

4. **SIA insight card** — ~72pt
   - Purpose: coaching context for the visualization
   - Content: SIA's balance assessment, references radar shape

5. **Time range selector** — ~40pt
   - Purpose: switch between current view and temporal comparisons
   - Content: segmented control (current / vs last week / vs last month)

6. **Domain list** — ~56pt per row × 10 domains
   - Purpose: detailed per-domain breakdown with navigation
   - Content: domain color dot, name, stat score (0-99), progress bar, active goal count

7. **Bottom spacing** — 32pt

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
- **Purpose**: Visual "shape of your life" — shows relative strength across all 10 life domains. A circle = balanced. A spiky star = specialist. Neither is wrong, but balance is rewarded through Life Power.
- **Data source**: Domain stat scores API (0-99 per domain, auto-calculated from consistency/depth/trend)
- **Visual treatment**: 10-axis spider/radar chart on transparent background (no card surface — floats on ink-900). Per `_shared-patterns.md` Radar Chart spec.
- **Specifications**:
  - Chart canvas: 280pt (fits within 300pt vertical space with labels)
  - Centered horizontally
  - Axes: 10 (one per life domain). Labels: FIT, SLP, CAR, NUT, FIN, FAI, PRO, REL, WEL, MED. Axes radiate from center at equal angles (36 degrees apart).
  - Grid rings: 5 concentric rings at stat values 20, 40, 60, 80, 99 — white at 5% opacity, 1pt stroke
  - Axis lines: white at 8% opacity, 1pt stroke, from center to edge
  - Data polygon: filled with orange (#FF5E00) at 15% opacity, stroked with orange at 80%, 2pt stroke. Vertices sit on axes at the domain's stat score (0-99 mapped to 0-100% of axis length).
  - Vertex dots: 8pt circles, filled with respective domain color, positioned at data point on each axis
  - Domain labels: 11pt Sora Semibold, white at 70%, positioned 12pt beyond the chart edge along each axis, abbreviated (FIT, SLP, CAR, etc.)
  - Tappable zones: each axis label + surrounding 44x44pt area is a touch target → domain dashboard
  - Growth animation: when a stat increases from new activity, vertex dot pulses (scale 1.0→1.6→1.0, 400ms) and adjacent polygon edge glows in domain color (280ms fade)
- **Comparison views** (triggered by time range selector):
  - **"vs last week"**: Current polygon (solid, orange at 15% fill) overlaid with last week's polygon (dashed 2pt stroke, white at 30%, no fill). Growth areas: vertices that moved outward glow green at 20%. Decline areas: vertices that moved inward tint red at 20%.
  - **"vs last month"**: Same overlay treatment, broader delta.
  - Comparison polygon animates in from center (520ms ease-flow), matching the current polygon mount animation.
- **Variants**:
  - Populated (most domains with data) — full 10-axis radar
  - Early stage (new user) — all 10 axes show, polygon is small/close to center. All vertices at baseline.
  - Comparison active — dual polygon overlay as described above
- **Gestures**: Tap domain label or vertex dot → domain dashboard (stack push). Chart does not rotate or pinch-zoom.
- **Size**: full-width x ~280pt

### Life Power Display
- **Purpose**: Single competitive number summarizing overall life proficiency. Rewards balanced development.
- **Data source**: Calculated from domain stats: `sum(all active domain stats) * balance_multiplier` where `balance_multiplier = 1.0 + (0.15 * (1 - coefficient_of_variation(active_stats)))`. Perfectly balanced stats get up to 15% bonus.
- **Visual treatment**: Centered below radar chart, 16pt gap above
  - Diamond icon: 16pt, orange (#FF5E00), inline before number
  - Score: 28pt Sora Bold, orange (#FF5E00), center-aligned. Count-up animation on mount (0 → current, 800ms ease-flow).
  - Label: "life power" — 12pt Sora Regular, white at 50%, center-aligned, 4pt below score
- **Variants**: New user (shows "0" with diamond icon). Established user (3-digit number typical).
- **Gestures**: Not tappable (read-only summary).
- **Size**: full-width x ~48pt

### SIA Insight Card
- **Purpose**: Contextual coaching about life balance
- **Data source**: SIA analysis API (generated based on radar chart data)
- **Visual treatment**: ink-brown-800 card, border-radius 28pt, 1pt border white at 8%, 24pt padding. Subtle purple (#7F24FF) left border (3pt) as SIA indicator.
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
- **Purpose**: Switch between current view and temporal comparisons — "watch your polygon shift over time"
- **Data source**: Controls the radar chart overlay and domain list comparison data
- **Visual treatment**: Segmented control (3 segments), centered horizontally
  - Container: ink-brown-800 pill (border-radius 999pt), 1pt border white at 8%, height 36pt
  - Segment width: equal thirds of container (~100pt each on standard screen)
  - Active segment: orange (#FF5E00) fill, border-radius 999pt, white text 14pt Sora Semibold
  - Inactive segments: transparent, white at 50% text 14pt Sora Regular
  - Options: "current" | "vs week" | "vs month" (sentence case)
  - Container width: full-width minus 64pt (32pt margins each side)
- **Behavior**:
  - "current": Radar shows current polygon only. Domain list shows current stat scores.
  - "vs week": Radar overlays current + last week's polygon (dashed ghost). Domain list rows show delta arrow + change amount (e.g., "+3" in green or "-2" in red).
  - "vs month": Same as vs week but compared to 30 days ago.
- **Tier gating**: "vs week" and "vs month" require Plus tier. Free tier sees "current" only with locked indicator on comparison segments.
- **Gestures**: Tap segment → updates chart overlay and list deltas. Active segment slides with 280ms ease-out-soft animation.
- **Size**: ~280pt wide x 36pt

### Domain List
- **Purpose**: Detailed per-domain breakdown with stat scores and drill-down navigation. Shows all 10 domains.
- **Data source**: Domain stat scores API (0-99, auto-calculated from consistency/depth/trend)
- **Visual treatment**: Flat list of rows, no card surface (directly on ink-900). Thin dividers between rows (1pt, white at 5%).
- **Row specification**:
  - Height: 56pt (minimum touch target)
  - Left: Domain color dot (10pt circle, filled with domain hex) + 12pt gap
  - Domain name: 15pt Sora Semibold, white, left-aligned
  - Stat score: 20pt Sora Semibold, white, right of name (8pt gap). Shows 0-99 value.
  - Progress bar: horizontal, 100pt wide, 4pt height, pill shape. Track: white at 8%. Fill: domain's color at 80%. Bar percentage = stat score / 99.
  - Active goal count: right-aligned, 13pt Sora Regular, white at 50%. Format: "3 goals" or "no goals"
  - Right chevron: 10pt, white at 20%, 4pt after goal count
  - Padding: 16pt left, 16pt right
  - **Comparison mode** (when "vs week" or "vs month" selected): delta indicator appears between stat score and progress bar. Green arrow up + "+3" (12pt Semibold, green) or red arrow down + "-2" (12pt Semibold, red) or "—" (12pt Regular, white at 30%) for no change.
- **Row order**: Sorted by stat score descending (strongest domains first)
- **Variants**:
  - Domain with no goals: progress bar reflects stat score (may still be >0 from activity logging), "no goals" text
  - Domain with 0 activity in last 90 days: row appears dimmer (white at 30% for all text), stat shows "—", "tap to explore" replaces goal count
- **Gestures**: Tap row → domain dashboard (stack push)
- **Size**: full-width x 56pt per row × 10 rows

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
| Life Power diamond icon | #FF5E00 | Burnt Orange | 60% — progression anchor |
| Life Power score text | #FF5E00 | Burnt Orange | 60% — primary number |
| Life Power label | white at 50% | — | Tertiary text |
| Comparison polygon stroke | white at 30% | — | Comparison ghost |
| Growth glow (comparison) | #34A853 at 20% | Forest Green | Positive change |
| Decline tint (comparison) | #EF4444 at 20% | Red | Negative change |

**60/30/10 verification**: Orange dominates through the radar polygon, active segmented control, and Life Power score. Green is absent in default view (no success states — appropriate); appears only in comparison overlays as growth glow. Purple limited to exactly 2 elements (SIA card left border + SIA icon). Domain colors used strictly for identification (dots, vertices, progress fills) — never for actions. Ratio holds.

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
| Disabled | 0.4 opacity | — |
| Loading | text replaced with 2-line skeleton shimmer | — |
| Error | N/A | — |
| Success | N/A | — |

### Life Power Display
| State | Visual | Haptic |
|-------|--------|--------|
| Default | diamond icon 16pt orange, score 28pt orange, label white at 50% | — |
| Disabled | N/A (always visible when data loads) | — |
| Loading | score shows skeleton shimmer, diamond icon visible | — |
| Error | score shows "—", tooltip "couldn't calculate" on long press | — |

*Not tappable — read-only display.*

### Time Range Segment
| State | Visual | Haptic |
|-------|--------|--------|
| Default (active) | orange fill, white text Semibold | — |
| Default (inactive) | transparent, white at 50% text Regular | — |
| Pressed (inactive) | bg white at 5%, text brightens to 70% | light impact |
| Focus-visible | 2pt orange ring inside segment | — |
| Disabled | 0.4 opacity | — |
| Locked (Free tier) | transparent, white at 40% text, lock icon 10pt white at 40% inline after label | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### Domain List Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | row on ink-900, text and bar visible | — |
| Pressed | bg briefly flashes ink-brown-800, scale(0.98) horizontal | light impact |
| Focus-visible | 2pt orange ring around entire row | — |
| Disabled | 0.4 opacity (for unactivated domains) | — |
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
| Life Power count-up | Screen mount | 0 → current value count-up | 800ms | ease-flow (starts after radar completes) |
| Comparison polygon | Time range change | Vertices grow from center to comparison values | 520ms | ease-flow |
| Growth/decline glow | Time range change | Affected vertices glow green (#34A853) or tint red (#EF4444) | 280ms fade-in + 600ms hold | ease-out-soft |

**Screen transition**:
- **Enter**: Stack push from right (280ms, ease-out-soft). Content stagger begins after slide completes.
- **Exit (to dashboard)**: Stack push to right — this screen slides left, dashboard slides in from right.
- **Exit (back)**: Stack pop — this screen slides right and out.

---

## Empty States

### Day 1 (new user)
- Radar chart shows all 10 domains as axes, but the polygon is very small (near center, ~10% on all axes).
- No vertex dots glow — all are at baseline.
- Life Power shows "0" (diamond icon visible, count-up animation skipped).
- SIA insight: "welcome to your life overview. as you set goals and track progress across all 10 domains, your Life Power will grow to reflect your journey."
- Domain list: all 10 domains visible, progress bars empty, "no goals" on each row. Rows are still tappable ("tap to explore" text instead of goal count).
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

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Nav bar title ("life areas") | Sora | Semibold (600) | 17pt | 22pt | #FFFFFF |
| Radar chart domain labels | Sora | Semibold (600) | 11pt | 14pt | #FFFFFF at 70% |
| SIA insight text | Sora | Regular (400) | 14pt | 18pt | #FFFFFF at 80% |
| Time range segment (active) | Sora | Semibold (600) | 14pt | 18pt | #FFFFFF |
| Time range segment (inactive) | Sora | Regular (400) | 14pt | 18pt | #FFFFFF at 50% |
| Domain list name | Sora | Semibold (600) | 15pt | 20pt | #FFFFFF |
| Domain list goal count | Sora | Regular (400) | 13pt | 18pt | #FFFFFF at 50% |
| "tap to explore" hint | Sora | Regular (400) | 13pt | 18pt | #FFFFFF at 30% |
| Empty state SIA insight | Sora | Regular (400) | 14pt | 18pt | #FFFFFF at 80% |
| Life Power score | Sora | Bold (700) | 28pt | 34pt | #FF5E00 |
| Life Power label ("life power") | Sora | Regular (400) | 12pt | 16pt | #FFFFFF at 50% |
| Comparison delta | Sora | Semibold (600) | 12pt | 16pt | #34A853 (positive) / #EF4444 (negative) |
| Domain stat score | Sora | Semibold (600) | 20pt | 26pt | #FFFFFF |
| High motivation trend text | Sora | Regular (400) | 12pt | 16pt | #FFFFFF at 50% |

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Network failure (radar data fetch) | Radar chart shows grid rings and axis lines only (no data polygon). Domain list rows show skeleton shimmer on progress bars. | Pull-to-refresh retries all data fetches. Back navigation still functional. |
| API timeout (domain progress) | After 8s, radar shows empty polygon at center (~5% on all axes). Toast: "Couldn't load latest data." | Pull-to-refresh retries. Cached data displayed if available. |
| SIA insight API failure | SIA insight card shows skeleton shimmer briefly, then hides (section collapses). Radar chart and domain list unaffected. | Insight loads on next visit or pull-to-refresh. |
| Time range switch failure | Active segment moves visually but data doesn't update. Brief error toast: "Couldn't load [time range] data." Previous data remains visible. | Tap segment again to retry. Pull-to-refresh also retries. |
| Partial domain data failure | Radar shows available domain vertices. Missing domains shown at 0% with dimmed labels. Domain list shows "data unavailable" for affected rows. | Pull-to-refresh retries all domains. |
| Life Power calculation failure | Score shows "—" instead of number, diamond icon remains visible. Long-press tooltip: "couldn't calculate". | Pull-to-refresh retries. Recalculates when domain data becomes available. |

---

## Accessibility

Accessibility follows global standards from `_shared-patterns.md`. Screen-specific notes:

- **Screen reader labels**:
  - Back button: "Back, return to goals list"
  - Radar chart: "Life areas radar chart showing progress across [count] domains" (summary announcement)
  - Radar domain label: "[domain name], [percentage] percent, tap to view dashboard"
  - SIA insight card: "SIA insight: [insight text], tap to discuss with SIA"
  - Time range segment: "[range name], [selected/not selected]"
  - Domain list row: "[domain name], [percentage] percent progress, [count] active goals, tap to view dashboard"
- **Focus order**: Back button -> Radar chart (as a group, with individual domain labels accessible via swipe) -> SIA insight card -> Time range segments (left to right) -> Domain list rows (top to bottom)
- **Gesture alternatives**: Radar chart domains accessible via domain list rows (identical navigation targets). Pull-to-refresh also available via accessibility rotor action.
- **Reduced motion**: Radar polygon appears at final shape immediately (no grow animation). Domain list progress bars appear at final width. Vertex dots appear without stagger. Time range segment indicator moves instantly.
- **Chart alternative text**: When VoiceOver is active, a text summary is available: "Strongest area: [domain] at [percentage]. Weakest area: [domain] at [percentage]. [count] domains active."

---

## Cross-References

- **Navigates to**: Domain dashboards [26-36] via chart tap or list row (stack push), SIA Chat [09] via SIA insight card (tab switch with context)
- **Navigates from**: Goals List [13] via life areas preview (stack push), Home Screen [12] via domain tags (stack push), SIA Chat [09] via deep-link (tab switch + push)
- **Shared components with**: Screen [19] — RPG Character (domain stat scores, radar chart pattern, Life Power display), Screen [13] — Goals List (back button, Goals tab active)
- **Life Power note**: Life Power is displayed on both Screen [16] (Life Areas Overview) and Screen [19] (RPG Character)
- **Patterns used**: Back Button (Batch 1), Bottom Tab Bar (_shared-patterns.md), Product Mode header (established in this batch)
- **Patterns established**: Radar chart (life wheel), Domain list row, Time range segmented control, SIA insight card (with purple left border), Domain color dot (10pt identification circle)
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-07.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U04`
**Prototype route**: `/tabs/me/life-areas`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q20 OAuth flows must preview scopes, purpose, sync cadence, storage, disconnect, delete, and revocation.
- Q33 Life Areas comparison is Plus-gated only after enough history exists.
- Q34 Explore tier labels distinguish included vs locked states.
- Q35 billing follows mobile-store purchase, restore, trial, cancellation, error, and entitlement patterns.
- Q50 obstacle reconnection uses per-blocker accept/dismiss controls before accept-all.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B07-F05 | major | information-architecture | Add accessible 44x44 radar tap zones and link the SIA insight to contextual SIA chat. |
| B07-F06 | major | mobile-ergonomics | Implement segmented state with aria-pressed, comparison overlays/deltas, and clear Plus explanation or upsell for locked modes. |
| B07-F07 | major | navigation | Render a labeled 44x44 back button/link with stack-pop behavior. |

### Prototype Implications

- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

