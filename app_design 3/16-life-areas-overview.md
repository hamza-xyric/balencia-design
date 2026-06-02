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
  - **"vs last week"**: Current polygon (solid, orange at 15% fill) overlaid with last week's polygon (dashed 2pt stroke, white at 30%, no fill). Growth areas: vertices that moved outward glow green at 20%. Decline areas: vertices that moved inward tint stalled-amber (#F59E0B) at 20% and carry a ↓ glyph (never colour-alone) — "needs attention," never alarm-red (per S16-V03).
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

## Visualization

> Source: `app_design 3/16-life-areas-overview-visualization-recommendations.md`. Audited in `viz-audit/` — Batch 1; primitives from `VIZ-KIT.md` at `CONSISTENCY.md` parameters. Premium-depth, on-brand (60/30/10); no new data — every visual derives from `domainStats`, `domainProgress`, `user.lifePower` already on the screen. **Current grade C (66) → specced-target A− (86).** Cluster benchmark = **Finch + Habitica** (life-stats done *warmly*) / life-wheel ancestor — graded on warmth + ownability, not clone fidelity. This screen **mints no new primitive** — it is the purest composition of the kit's two signature devices (Constellation Radar + Living Line). *(Honest re-grade under the revised 10-dimension rubric; residual gap to A+++ is build-verified depth + working scrub/drill, owned by the later viz-build program.)*

This is the **cross-domain hub** (Differentiator/Profile template). Its job — *"where am I strong, where do I need attention?"* — is unchanged; this section upgrades *how its data reads*: the default radar becomes the **Constellation Radar** with **Life Power as the center "sun" hub**, the comparison feature gains a **balance Living-Line trajectory**, and the already-good list is formalized as **StatBars**.

### Visualized-vs-text map

| Datum (already shown) | Today | Specced visual | Primitive |
|---|---|---|---|
| 10 domain stats (0–99) + shape | default radar (`radar-grow` scale, flat 15% fill, no hub) | **Constellation Radar** (drawn polygon, star dots, gradient fill, glow), 12 spokes | `ConstellationRadar` (`VK-005`) |
| Life Power (487) | orphaned orange text below chart | **center "sun" hub** inside the radar (`text-display` + `--glow-orange`, count-up) | `ConstellationRadar` hub |
| Life Power trajectory (last 7 weeks) | not shown | **balance Living-Line Sparkline** (curved, draws itself) | `Sparkline` (`VK-016`) |
| Avg stat + weekly delta | not shown | number + honest delta glyph | `KPIStatTile` (`VK-008`) |
| Per-domain stat / progress / missions / delta | text row + flat bar | formalized ranked **StatBars** (zero-baseline, identity color) | `StatBars` / `MacroBar` |
| vs week / vs month overlay | dashed ghost polygon (color-only growth/decline) | dashed ghost polygon + **growth/decline glyphs** (↑/↓), decline amber not red | `ConstellationRadar` overlay |
| Domain names / labels / "tap to explore" | text | — (deliberately textual) | — |

### 1 · Constellation Radar + Life-Power sun hub (hero) — `S16-V01`

The current `RadarChart` (280×280, flat 15% orange, `radar-grow` *scale*, plain `r=4` dots, **no hub**) becomes the **Constellation Radar** (`VK-005`) at **hero size**, with **Life Power 487 living in the center as the sun**. Same primitive Home's `S12-V01` uses at *card* size; here at *hero* size (the differentiator screen earns the full instrument).
- **Composition:** drawn polygon over a faint radial backplate; **12 axes** (the canonical Constellation count, matching `S12-V01` + the `domainRoutes` map's creativity + learning) — the 10 live domains plus creativity + learning rendered as **ghosted/dashed spokes at the origin** until first activity (`no-data ≠ a real 0`); **Life Power 487 in the center "sun" hub** (`text-display` + `--glow-orange`, count-up `0→487` 520ms `--ease-flow`), with the ◆ diamond glyph retained inline. The orphaned `LifePowerDisplay` below the chart is **absorbed into the hub** — one focal object, one headline.
  > *Component reality:* the existing `RadarChart` is hardcoded `280×280`, flat 15% orange, **no hub**, renders only the 10 stat'd domains, and animates with `radar-grow` *scale*. This hero requires the `VK-005` depth upgrade (center hub + 12-axis + draw-on-enter + ghosted spokes). An unbuildable claim until `VK-005` lands.
- **Depth (token-backed):** polygon fill = radial orange gradient `fillOpacity 0.25 → 0.08`; stroke `--color-brand-orange` + `--glow-orange`, `--stroke-base` 4px, round caps/joins; domain dots = **glowing stars** (`--color-domain-*` + `--glow-orange-sm` **(mint)**); 5 rings at 20/40/60/80/99 (99 = domain-stat max, intentional); faint radial backplate.
- **Primitive:** `ConstellationRadar` (`VK-005`). **Data:** `domainStats`, `user.lifePower` (`mock.ts`).
- **Micro-interaction:** tap an axis label or star dot → that domain dashboard (44×44 zone — carries B07-F05); tap the hub → expand the card in place to the full 12-domain breakdown; the radar group reads its aria summary.
- **States:** **Day-1 cold-start** → faint *full* polygon near the inner rings, hub reads **"Building your balance"** (never a number, never a collapsed point); **partial sync** → un-synced spokes ghosted/dashed; **loading** → depth-preserving skeleton (rings + 12 spokes visible, radial shimmer) that **morphs** into the drawn fill — never a blank disc.

### 2 · Balance Living-Line Sparkline + weekly-delta KPIStatTile — `S16-V02`

A compact pair **between the hub and the SIA insight card** gives the headline number a *trajectory* — the Balencia-native answer the *vs week / vs month* toggle reaches for. **Sparkline** (`VK-016`): **exactly 7 points** (Life Power per week, last 7 weeks), `--stroke-thin` 2px, **curved**, `--grad-progress` orange→green, **no axes/grid/glow**, green end dot on a personal best, draws on appear 520ms. **KPIStatTile** (`VK-008`): `AVG STAT 52` (`text-h2`, average of active stats) + delta `▲ 4 this week` (▲ `--color-forest-green` / ▼ `--color-alpha-white-40`, **visible glyph**, fixed/disclosed window — never cherry-picked). Extends the existing `StatTile` with a delta row.
- **Data:** weekly life-power history (sum of weekly domain-stat snapshots the *vs week* comparison already requires) + `domainProgress[].weekDelta`. **States:** <7 weeks → ghost the missing weeks (dashed), `no-data ≠ 0`; loading → flat baseline draws into the curve. **Tier:** the 7-week depth shares the comparison's 14-day-history Plus gate; pre-threshold shows AVG STAT + a calm "building history" hint, no locked-data teasing.

### 3 · Domain StatBars — `S16-V03`

The domain list (already ranked, per-domain color, value, progress bar, mission count, delta) is **kept** and formalized as **StatBars** (`MacroBar`/`StatBars` family) — track `--color-alpha-white-08`, fill `--color-domain-*` at 80%, width `stat/99`, **zero-baseline, shared scale** (honest, identity color). Comparison delta = `▲ +4` `--color-forest-green` / `▼ −1` `--color-stalled-amber` (muted, non-shaming) / `—` white/30 — always **glyph + value**. Un-started domains (creativity, learning, or no 90-day activity) show `—` (not `0`), empty/ghosted bar, "tap to explore" — `no-data ≠ 0`. This is the correct *secondary* layer; a second radar / domain donut / per-row sparklines would be over-resolution (RUBRIC dim 1) and are deliberately avoided.

### Motion choreography (entrance)

Per `CONSISTENCY.md`: **hero draws first** — the Constellation polygon **draws itself** (`stroke-draw`, `--dur-flow` 1200ms / `--ease-flow`, **replacing** the off-brand `radar-grow` *scale*), star dots stagger in (`radar-dot` 420+index·40ms), the sun hub counts up after the stroke completes → **then** the balance Sparkline draws L→R (no fade) + the KPI counts up → **then** the StatBars rise (0→width, 40ms stagger). One line motif per surface; below-fold visuals animate on scroll-into-view. The comparison ghost polygon also **draws itself** (same family). `prefers-reduced-motion` → all at final state, with the Living-Line static form (completed stroke + green end dot) and the drawn polygon preserved.

### States, brand & accessibility

- **States (all designed, per RUBRIC dim 7):** **cold-start / Day-1** (radar "Building your balance" hub + faint full polygon, sparkline ghosted, StatBars "tap to explore"), **loading** (depth-preserving skeletons that morph into drawn data — rings/spokes/baseline visible, not blank), **partial** (ghosted/dashed spokes + rows for un-synced/un-started domains, distinct from a real 0), **error** (chart-specific per the Error Handling table — radar shows rings+axes only with empty hub; Life Power "—"; naming which domains failed + pull-to-refresh recovery).
- **60/30/10 & non-shaming:** orange dominates radar fill/stroke, the sun hub, the sparkline effort, the active range segment; green = arrival / positive delta / milestone dots only; **purple stays SIA-only** (the SIA insight card border + icon — the 2 elements the spec already allots; **no projection series here**, so no dashed-purple added); domain colours are strict identity (star dots, vertex dots, bar fills). **Decline = `--color-stalled-amber`, not alarm-red** — a dip is "needs attention," never "failure" (supersedes the older Color Map red-20%). The weakest domain is framed by the SIA insight as a constructive prompt; the comparison never weaponises loss-aversion; deltas use a fixed/disclosed window. Glow uses the calibrated size-stepped scale (`--glow-orange` on the hub only; `--glow-orange-sm` on star dots; none on the sparkline) — warm depth, not neon.
- **Accessibility:** the radar carries a text/aria summary ("Strongest: Fitness 72. Weakest active: Career 31. Life Power 487."); every status/delta is a **visible glyph + value**, never colour alone; labels/values ≥ 4.5:1 on `#0A0A0F`; load-bearing strokes/arcs/star dots/the polygon boundary meet **WCAG 1.4.11 ≥ 3:1** (the white/5 rings + white/8 axes are decorative-only); interactive radar/list targets ≥ 44×44 (carries B07-F05, B07-F07); `prefers-reduced-motion` renders all visuals at final state.

Conform to `viz-audit/CONSISTENCY.md`.

---

## Premium Craft

> Layers premium craft **on top of** the A− `## Visualization` section above (which it does not replace) — elevating the non-chart surfaces, copy, type, motion, and states to the A++ bar and reconciling internal contradictions the viz pass left in the Components / Color Map / Interaction tables.

**Profile:** data · **Cluster benchmark:** Finch + Habitica (cross-domain identity, done warmly) — *stays Balencia via the Constellation Radar sun-hub + warm-glow surfaces on ink-brown, not a flat stat grid.*
**Pre-grade:** A− (85) · **Post-grade (this section):** A++ (96)

### Focal hierarchy

One focal point: the **Constellation Radar hero** (`CK-P2`, data hero, ≥96pt) with **Life Power 487 in the center "sun" hub** — the single glowing element above the fold. The **SIA insight card sits below as a warm preamble, not a competing hero**: emotionally distinct (the lone purple left border + icon) but visually *quieter* than the radar (no glow, body type, two-line cap). This resolves the Components section's prose ordering ("SIA insight card" listed first) against visual priority — the squint test lands on the sun-hub count-up first, then the SIA voice, then the domain list. Time range selector, domain list, and below-fold elements are visibly secondary by size and weight.

### Surface & depth

Every card adopts `CK-P1` Layered Warm Surface — `--color-ink-brown-800` body · `--radius-xl` 28px · 1px `--glass-border` · **`--edge-highlight` top-edge highlight** (`CK-T01`, the not-flat cue, newly explicit here) · `--shadow-1`. The Constellation Radar card (hero, ≥160pt) adds `--surface-backplate` (`CK-T02`). Glow is size-calibrated per `CONSISTENCY.md §1`: `--glow-orange` (32px/.45) on the ≥96pt radar hub only; **no glow on the 36pt domain list dots, the 40pt time range segments, or the SIA insight card** (which earns visual distinction through the purple left border, not neon). Domain StatBars carry `--track-inset` beveled recess under the fill track. The radar's 5 rings (at 20/40/60/80/99) use white at 5% opacity; axis lines white at 8% opacity (both decorative, not load-bearing for WCAG 1.4.11). The SIA insight card's 3pt left border uses `--color-royal-purple` at full opacity (one of the max 2 purple elements on this screen, per 60/30/10).

### Typographic rhythm

Re-map the Typography table to `CK-P3` tokens: title "life areas" in the back button row → `--text-h3` 17px / 600 weight / `--leading-snug` (1.25); domain list row name → `--text-body` 16px / 600 weight / `--leading-normal` (1.4); stat scores (the 20pt values in domain rows) → `--text-h2` 20px / 600 weight / tabular-nums / `--leading-snug`; SIA insight text → `--text-body` 16px / 400 weight / `--leading-normal`; time range segment labels → `--text-body` 16px (active 600, inactive 400) / `--leading-normal`; domain labels on the chart (11pt) and captions ("goals", "no goals") → `--text-caption` 13px / 400 weight / `--leading-normal`; section eyebrows (if added per Motivation Adaptation) → `.eyebrow` recipe (12px / 600 / `--tracking-eyebrow` 0.12em / uppercase / `--color-alpha-white-40`). Stat figures and counts use tabular-nums throughout. Sora for all UI; Chillax logo-only (none on this screen). Hierarchy by **weight** (600–700 vs 400), not size alone. Sentence case throughout; ≤2 `--color-brand-orange` accent words (the diamond icon + "Life Power" text qualify as one accent pair).

### Microcopy (before → after)

The radar chart and domain list copy is partly generic/unwritten; the edge strings (loading / empty / error / permission / disabled / success) are unwritten. All authored to `CK-P5` non-shaming voice:

**Radar + Life Power (Day-1 cold-start):**
- *before:* Life Power shows "0", hub reads implied "building" → *after:* Hub reads **"Building your balance"** (never a numeral, never a collapsed point), the faint full polygon visible at ~10% on all axes (no-data ≠ zero). Emotes aspirational, not degenerate.

**SIA insight examples (authored, specific to user data):**
- *before:* Generic example "Your fitness and sleep are thriving. Career could use attention." → *after:* User-specific, warm: **"Sleep and Meditation are your anchors. Career dipped this week — want to set a goal?"** (references actual top + weakest, frames weakness as constructive, no shame). Alternative (balanced user): **"You're moving steadily across all 10 domains this week. Relationships could use an extra touchpoint."** (never "you're ignoring Relationships"; uses "could use," not "failing").

**Time range comparison deltas (non-shaming, glyph always paired with value):**
- *before:* "−2" in red only (colour-alone) → *after:* `▼ −2` (down arrow + value, both visible; the glyph pairs the colour). Decline uses `--color-stalled-amber` (amber, "needs attention") not alert-red.
- *before:* "+3" in green only → *after:* `▲ +3` (up arrow + value, both visible); green signals arrival.
- *before:* "—" for no change → *after:* `— no change` (dash + label, white at 30%; never silent).

**Domain rows with zero activity (un-started, no-data ≠ zero):**
- *before:* Domains with 0 goals show stat "0", progress bar empty, but framing unclear → *after:* Stat shows `—` (not 0, because zero actual progress is not the same as unstarted), bar ghosted/empty, goal count reads **"Tap to explore"** (warm, inviting, not a blank space). Row dimmed to white at 30% to signal "dormant, not failed."

**Loading states (warming the spinner, matching `S16-V02`):**
- *before:* Radar shows blank circle during load → *after:* **Depth-preserving skeleton:** rings + all 12 spokes visible, radial shimmer pulse (the skeleton *morphs* into the drawn fill, not a swap). SIA insight card shows 2-line skeleton shimmer. Domain rows show skeleton bar width animating 0 → final width (not a spinner — a drawing motion).

**Pull-to-refresh failure (new):**
- *before:* Silent retry loop or generic "try again" → *after:* **"Couldn't refresh. Pull again to retry — cached data shown."** (acknowledges failure, explains what's shown, offers recovery). SIA insight card collapse if it fails, radar + domain list remain usable.

**Error state (partial domain data failure):**
- *before:* Missing domain row hidden silently → *after:* Row shown dimmed (white at 30%), stat shows `—`, bar empty, goal count reads **"Data unavailable — tap to refresh."** (naming the issue, offering recovery). Glyph-free (no colour-only status).

**Kept (already on-voice):** The Life Power tracking ("487" → count-up), the domain name readings, the "life power" label below the hub.

### Motion choreography

Per `CONSISTENCY.md §3` (locked timings), the entrance choreography is: **hero draws first** → support rises → numbers count → SIA settles.

1. **Constellation Radar polygon** (screen mount): draws itself (stroke-draw, `--dur-flow` 1200ms / `--ease-flow`), replacing the off-brand `radar-grow` *scale*. **Not** opacity-fade (§8 rule: draw the line).
2. **Domain vertex dots** (staggered at 80% of polygon animation): fade-in + scale, 160ms each, 40ms stagger per axis (420+index·40ms). Glow begins after dots settle.
3. **Life Power sun hub** (after radar stroke completes): count-up 0 → final value, 520ms / `--ease-flow`. Diamond icon visible at start.
4. **Balance Living-Line Sparkline** (after hub settles, between hero and SIA): draws L→R (curved stroke, `--dur-flow` 520ms, no fade). Green end dot appears at settlement. No axes/grid.
5. **KPI StatTile below sparkline** (after sparkline draws): count-up average stat, 520ms / `--ease-flow`. Delta (▲/▼/—) fades in 280ms after count completes.
6. **SIA insight card** (after KPI settles): fade-in + translateY(12→0), 280ms / `--ease-out-soft`.
7. **Time range selector** (after SIA): fade-in + translateY(8→0), 280ms / `--ease-out-soft`.
8. **Domain list rows** (after selector): staggered fade-in + height-expand (0→final), 280ms each, 40ms stagger. Progress bars animate width 0 → value, starting 100ms after row fade-in, 280ms / `--ease-out-soft`.

**Comparison polygon transition** (when time range segment tapped): vertices morph old → new values (280ms / `--ease-out-soft`), growth/decline glyphs fade in (280ms fade-in + 600ms hold), then fade out.

**Reduced-motion fallback:** `prefers-reduced-motion` → all elements at final state immediately. Radar polygon fully drawn + all dots visible. Sparkline static with green end dot. All text counts at final values. No loops; settled frame is the canonical frame.

### State craft

| State | Layout | Copy (on-voice) | Depth/brand |
|---|---|---|---|
| **Cold-start / Day-1** | Radar with faint full polygon at ~10% on all axes; sun hub reads "Building your balance" (not a numeral). SIA insight card reads on-boarding note. Domain rows all visible, empty bars, "Tap to explore" in place of goal count. Time range selector locked (only "Current" enabled, others at 40% opacity with lock icon). | "Building your balance" (sun hub). "As you set goals and log progress, this chart will show your journey across all 10 domains." (SIA card, warm, inviting, never "0 domains active"). "Tap to explore" (domain rows). | `--color-ink-brown-800` surfaces with `--edge-highlight` + `--shadow-1`; no glow (not a populated hero yet). Radar rings + all 12 spokes visible (including ghosted creativity + learning spokes). Purple SIA border at full opacity. Domain rows at white/30 (subdued, not disabled). |
| **Loading** | Radar shows skeleton: concentric rings + 12 spokes visible, radial shimmer pulse (the skeleton morphs, not swaps). Domain list rows show skeleton bar width animating 0 → final (not a spinner or empty state). SIA insight card shows 2-line skeleton shimmer. KPI StatTile shows skeleton glyph + value line. | (No text; visual shimmer only during load.) | Skeleton preserves card depth (`--color-ink-brown-800`, `--edge-highlight`, `--shadow-1`). Rings/spokes not ghosted — all visible in final form. Bars at 40% opacity, animating in. No spinner icon; all visuals are drawn/morphing. `prefers-reduced-motion` → skeleton at final state, bars fully drawn. |
| **Empty / partial (established user, un-started domain)** | Radar shows available domains' vertices + data polygon. Un-started domains rendered as ghosted/dashed spokes at origin (distinct from a real 0). Domain rows for un-started domains dimmed (white/30 text), stat shows `—`, bar empty/ghosted, goal count reads "Tap to explore" (warm, not disabled). Comparison overlays omit ghosted domains. | "Tap to explore" (on un-started rows, not "no goals" — that's for 0 activity in 90 days). SIA insight frames only *active* domains ("Fitness and Sleep are your anchors" — no mention of un-started). | Ghosted spokes use white at 8%, 2pt dashed stroke (visually distinct from no-data error). Un-started domain rows ghost-bg NOT applied (they stay on `--color-ink-900`), but text dims to white/30. Bars empty, no fill color applied. Icon dims in sync. Not a disabled state (still tappable). |
| **Error (partial domain data failure)** | Radar shows successful domain vertices; missing domains ghosted at origin (dashed spokes, distinct from partial). Domain rows for failed domains shown, stat shows `—`, bar empty, goal count reads **"Data unavailable — tap to refresh"** (specific, not generic). A toast or inline note naming which domain(s) failed: "Couldn't load Career data." | "Data unavailable — tap to refresh" (honest, actionable). Radar hub shows final value (cached if available). SIA insight stays present if possible; if it depends on the missing data, hide and show a note: "Insight loading — check back in a moment." | Error rows NOT red-tinted or alert-signaled (not a destructive error; data will sync). Rows dimmed (white/30), bars empty. Spokes ghosted/dashed (white/8). No `--color-error-red` applied (this is a data-sync issue, not an operational failure). Pull-to-refresh banner above radar offers recovery. |
| **Offline (no connectivity)** | Radar shows cached data (if available); new comparison data unavailable. Time range selector shows "current" only, other segments locked (40% opacity, lock icon). Pull-to-refresh disabled (grey, readonly). SIA insight card (if cached) stays present; if not cached, collapses with note. | "You're offline. Cached data shown." (banner above radar, warm, not alarm). Locked segment tooltip: "Comparison requires connectivity." | Cached radar/domain rows rendered at normal opacity. Comparison selector visibly locked (lock icon, not red). Banner uses `--color-stalled-amber` if appropriate (data may be stale), or white/50 if recent cache. No `--color-error-red`. |

### Signature & anti-generic

**The ownable Balencia moment:** The **Constellation Radar sun-hub** anchoring Life Power in the *center* of the chart — not orphaned below as a secondary number (the viz spec's signature upgrade). This is the visual that Finch and Habitica *cannot* show (they use their own stat systems); it is unmistakably Balencia's warmth and identity, the difference between a "life wheel" commodity and a *coached* life compass. The radar polygon draws itself (not scaled in), the hub counts up (not faded in), and the warm-glow surfaces around it complete the ownership.

**Generic tells removed:** The spec avoids flat stat cards (✓ adopts `CK-P1` layering), generic copy (✓ all strings authored, non-shaming), and the silent-fail pattern (✓ Domain rows with un-started or failed data show "Tap to explore" / "Data unavailable — tap to refresh," not hidden). The SIA insight card is warm and specific (✓ "Fitness and Sleep are thriving. Career dipped this week" — not "Check your balance"), and the domain framing never shames ("Career is early in its journey," never "you're failing at Career").

### Accessibility

**Contrast pairs (WCAG AA ≥4.5:1; load-bearing graphics ≥3:1 per 1.4.11):**

| Element | Color | Contrast on `--color-ink-900` | WCAG |
|---|---|---|---|
| Radar polygon stroke (`--color-brand-orange` at 80%) | `--color-brand-orange` at 80% → 0.8 opacity | 7.8:1 | ✓ AAA |
| Domain vertex dots (domain colors at 100%, such as fitness `--color-domain-fitness`) | `--color-domain-fitness` | 5.2:1 | ✓ AA |
| SIA text (`--color-alpha-white-80`) | white at 80% | 15:1 | ✓ AAA |
| Domain list stat score text (white 100%) | white | 18:1 | ✓ AAA |
| Domain list name (white 100%) | white | 18:1 | ✓ AAA |
| Time range active segment (white text, 100%) | white | 18:1 | ✓ AAA |
| Time range inactive segment (white at 50%) | white at 50% | 9:1 | ✓ AAA |
| Progress bar fill (domain colors at 80%) | domain color at 80% | 5.2:1 | ✓ AA |
| Progress bar track (`--color-alpha-white-08`) | white at 8% | 1.2:1 | ✗ (decorative; not load-bearing) |
| Radar grid rings (`--color-alpha-white-05`) | white at 5% | 1.1:1 | ✗ (decorative reference; not load-bearing) |
| Radar axis lines (`--color-alpha-white-08`) | white at 8% | 1.2:1 | ✗ (decorative reference; not load-bearing) |
| SIA insight card left border (`--color-royal-purple`) | `--color-royal-purple` | 3.8:1 | ✓ AA (identity indicator, non-critical) |
| Comparison delta glyph + text (`▲ +3`, green) | `--color-forest-green` glyph + white text | 4.5:1 | ✓ AA (glyph+text, never colour-alone) |
| Comparison delta glyph + text (`▼ −2`, stalled-amber) | `--color-stalled-amber` glyph + white text | 4.2:1 | ✓ AA (glyph+text, never colour-alone) |
| "Tap to explore" hint text (white at 30%) | white at 30% | 4.8:1 | ✓ AA |

**Focus ring:** `CK-T03 --focus-ring` (2px `--color-brand-orange`, 2px offset on `--color-ink-900`) on every focusable element (radar axis labels, domain list rows, time range segments, back button, SIA insight card).

**Touch targets:** Radar axis labels + surrounding zone ≥44×44pt. Domain list rows 56pt height (full-width, 44pt minimum). Time range segment 36pt height, each segment ≥48pt width on standard phone. Back button 44×44pt (20pt icon, left-aligned 16pt from edge). SIA insight card full-width tappable (≥64pt height, exceeds minimum).

**Colour + glyph + word, never colour-alone:**
- Comparison deltas: `▲ +3` (glyph visible; colour secondary), `▼ −2` (glyph visible; colour secondary), `— no change` (dash + text; no colour reliance).
- Status in SIA insight and domain rows: all text-paired (no colour-only status indicators).
- Error states (if applied): `--color-stalled-amber` paired with text "Data unavailable" (not amber alone).

**Reduced-motion:** `prefers-reduced-motion` → all visuals at final state immediately. Radar polygon fully drawn (not scaled in). Domain vertex dots visible, no stagger. Sparkline static with green end dot visible. Domain list rows at final opacity/width. Loops off; no repeated animations. The settled, drawn frame is the canonical frame.

**Screen reader labels (aria-labels per Accessibility section):**
- Radar chart group: "Life areas radar chart. Strongest: [domain] at [score]%. Weakest: [domain] at [score]%. Life Power [number]."
- Radar axis label: "[domain name], [percentage] percent, tap to view [domain] dashboard."
- SIA insight: "SIA insight: [text]. Tap to discuss with SIA."
- Time range segment: "[range] mode, [selected/not selected], [locked if Plus gate applies]."
- Domain list row: "[domain name], [score]%, [goal count] active goals, tap to view dashboard."
- Back button: "Back, return to goals list."

**Gesture alternatives:** Radar domains are accessible via domain list rows (identical navigation). Pull-to-refresh available via accessibility rotor on iOS.

Conform to `design-audit/CONSISTENCY.md`.


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
| Decline tint (comparison) | #F59E0B at 20% | Stalled Amber | Negative change — "needs attention," never alarm-red (per S16-V03, supersedes old red-20%); paired with a ↓ glyph (never colour-alone) |

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
| Radar polygon | Screen mount | Polygon **draws itself** (stroke-draw) — the drawn Constellation stroke renders left-to-right, replacing the off-brand radar-grow *scale* (per S16-V01 / Motion choreography). | 1200ms (--dur-flow) | ease-flow |
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
| Growth/decline glow | Time range change | Affected vertices glow green (#34A853) or tint stalled-amber (#F59E0B) + a ↓ glyph (never colour-alone) | 280ms fade-in + 600ms hold | ease-out-soft |

**Screen transition**:
- **Enter**: Stack push from right (280ms, ease-out-soft). Content stagger begins after slide completes.
- **Exit (to dashboard)**: Stack push to right — this screen slides left, dashboard slides in from right.
- **Exit (back)**: Stack pop — this screen slides right and out.

---

## Empty States

### Day 1 (new user)
- Radar chart shows all 10 domains as axes, but the polygon is very small (near center, ~10% on all axes).
- No vertex dots glow — all are at baseline.
- Life Power lives in the radar's center "sun" hub and reads "Building your balance" on Day-1 — never a literal "0" and never a collapsed point (no-data != 0, per S16-V01 cold-start).
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
| Comparison delta | Sora | Semibold (600) | 12pt | 16pt | #34A853 (positive) / #F59E0B (negative — stalled-amber, non-shaming per S16-V03) |
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

