# Screen Design: Water Intake Tracker

**Screen**: 44 of 73
**File**: 44-water-intake.md
**Register**: Wellbeing Mode (wellbeing-teal #14B8A6)
**Primary action**: log water intake
**Tab**: Today tab or Wellbeing domain
**Navigation**: Stack depth 1-2 from Today tab root (Today → Water Intake) or 2-3 from Me tab root (Me → Explore → Wellbeing → Water Intake). Entry from Home Screen [12] wellbeing action card, Explore [18] wellbeing module card, Habits [38] "drink water" habit tap, SIA deep-link [09] ("you're behind on water today"). Exit via back button to previous screen, or forward to SIA Chat [09], Target Setting (modal).

---

## Purpose

The Water Intake Tracker is the user's daily hydration command center — a satisfying, glanceable view of how much water they have consumed today against their personalized target, with one-tap logging for quick entries. It answers "how much water have I had today and am I on track?" The screen combines a large progress ring for instant visual feedback, preset quick-add buttons for frictionless logging, a timeline of individual drinks, and a weekly bar chart for trend awareness. Hitting the daily target triggers a celebration moment and earns XP, reinforcing the RPG loop. SIA adapts the target based on activity level, weather context, and user feedback. Free tier includes manual logging, progress ring, and weekly chart; SIA coaching notes and adaptive daily targets require Plus.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Daily progress ring — large circular visualization of glasses/ml consumed vs target, the screen's emotional anchor
2. Quick add buttons — preset amounts for one-tap logging (the primary action)
3. Today's drink log — timeline of individual entries with timestamps
4. Weekly bar chart — 7-day intake vs target trend
5. Stats card — streak, average, best day
6. Target setting link — adjust daily water goal

**User flow**:
- **Arrives from**: Home Screen [12] via wellbeing action card or water widget (stack push), Explore [18] via wellbeing module card (stack push), Habits [38] via "drink water" habit deep-link (stack push), SIA Chat [09] via hydration reminder deep-link (stack push)
- **Primary exit**: Back to previous screen (stack pop)
- **Secondary exits**: SIA Chat [09] via SIA hydration coaching note tap (tab switch), Target Setting (modal bottom sheet), Celebration Overlay [42] on goal achievement (overlay)

---

## Layout

**Scroll behavior**: ScrollView (content is moderate length — progress ring, quick add, timeline, chart, stats)
**Tab bar visible**: Yes

### ASCII Wireframe

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  ←  ┃ Water intake          ⚙      │  ← Domain Dashboard Header
│      ┃ (teal accent line)           │     56pt, sticky
├─────────────────────────────────────┤
│                                     │  SCROLLABLE from here
│                                     │  ← 16pt gap
│        ┌─────────────────┐          │
│       ╱                   ╲         │
│      │    ┌───────────┐    │        │  ← Daily Progress Ring
│      │    │  5 / 8    │    │        │     200pt diameter
│      │    │  glasses  │    │        │     wellbeing-teal fill
│      │    │  1250 ml  │    │        │
│       ╲   └───────────┘   ╱         │
│        └─────────────────┘          │
│                                     │
│    63% of daily goal                │  ← Progress label
│                                     │  ← 32pt gap
│  ┌────┐ ┌────┐ ┌────┐ ┌──────┐    │
│  │ 1  │ │250 │ │500 │ │custom│    │  ← Quick Add Buttons
│  │glass│ │ ml │ │ ml │ │  ml  │    │     (pill buttons)
│  └────┘ └────┘ └────┘ └──────┘    │
│                                     │  ← 32pt gap
│  TODAY'S LOG                        │  ← Section Header
│  ┌─────────────────────────────┐   │
│  │ 💧 8:30 AM   1 glass       │   │  ← Drink Entry Row
│  │    (250 ml)                 │   │
│  ├─────────────────────────────┤   │
│  │ 💧 10:15 AM  500 ml        │   │  ← Drink Entry Row
│  │    (2 glasses)              │   │
│  ├─────────────────────────────┤   │
│  │ 💧 12:45 PM  1 glass       │   │
│  │    (250 ml)                 │   │
│  ├─────────────────────────────┤   │
│  │ 💧 2:00 PM   250 ml        │   │
│  │    (1 glass)                │   │
│  └─────────────────────────────┘   │
│                                     │  ← 32pt gap
│  THIS WEEK                          │  ← Section Header
│  ┌─────────────────────────────┐   │
│  │  ┃   ┃       ┃             │   │  ← Weekly Bar Chart
│  │  ┃   ┃   ┃   ┃             │   │     7-day bars
│  │  ┃   ┃   ┃   ┃   ┃        │   │     teal fill, target
│  │  ┃   ┃   ┃   ┃   ┃        │   │     line overlay
│  │ ─┃─ ─┃─ ─┃─ ─┃─ ─┃─ ─ ─  │   │  ← Target line (dashed)
│  │  ┃   ┃   ┃   ┃   ┃        │   │
│  │  M   T   W   T   F   S  S │   │
│  └─────────────────────────────┘   │
│                                     │  ← 16pt gap
│  ┌─────────────────────────────┐   │
│  │  🔥 12 day     📊 6.5      │   │  ← Stats Card
│  │     streak     avg/day      │   │     3-column layout
│  │                 🏆 9        │   │
│  │                 best day    │   │
│  └─────────────────────────────┘   │
│                                     │
│          64pt bottom padding        │
│                                     │
├─────────────────────────────────────┤
│  Today  |  SIA  |  Goals  |  Me   │  ← Tab Bar
├─────────────────────────────────────┤
│         Home Indicator (34pt)       │
└─────────────────────────────────────┘


=== GOAL ACHIEVED CELEBRATION (inline, not overlay) ===

┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  ←  ┃ Water intake          ⚙      │
├─────────────────────────────────────┤
│                                     │
│        ┌─────────────────┐          │
│       ╱  ✦ · ✧ · ✦ · ✧  ╲         │  ← Confetti burst
│      │    ┌───────────┐    │        │     around ring
│      │    │  8 / 8    │    │        │  ← Ring fully filled
│      │    │  glasses  │    │        │     teal → green
│      │    │  2000 ml  │    │        │     crossfade
│       ╲   └───────────┘   ╱         │
│        └─────────────────┘          │
│                                     │
│    Goal achieved! +25 XP            │  ← Celebration text
│    at 3:45 PM                       │     (green, animated)
│                                     │
│  ...rest of screen unchanged...     │
│                                     │
└─────────────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Domain Dashboard Header** — 56pt, FIXED
   - Purpose: Screen identification with wellbeing domain branding
   - Content: Back chevron (left), "Water intake" title with 2pt wellbeing-teal (#14B8A6) accent line underneath, settings gear icon (right)
   - Sticky on scroll with backdrop-blur (z-30)

2. **Daily Progress Ring** — ~240pt (ring + labels)
   - Purpose: The screen's emotional anchor — instant visual feedback on hydration progress
   - Content: 200pt diameter circular progress ring, center text (count + unit + ml equivalent), progress percentage below

3. **Quick Add Buttons** — 48pt
   - Purpose: One-tap water logging — the primary action, must be frictionless
   - Content: 4 pill buttons in a row (1 glass, 250ml, 500ml, custom)
   - 32pt top margin

4. **Today's Log Section** — Variable (ScrollView nested content)
   - Purpose: Timeline of individual drink entries for today
   - Content: Section header + drink entry rows with timestamps
   - 32pt top margin

5. **Weekly Bar Chart Card** — ~200pt
   - Purpose: 7-day trend visualization — am I consistent?
   - Content: Section header + 7 vertical bars with target line overlay
   - 32pt top margin

6. **Stats Card** — ~100pt
   - Purpose: Gamification and trend awareness
   - Content: 3-column layout — streak days, average daily intake, best day
   - 16pt top margin

7. **Bottom Padding** — 64pt
   - Purpose: Clears tab bar from content

8. **Tab Bar** — 56pt + 34pt safe area
   - Purpose: Primary app navigation
   - Content: Today | SIA | Goals | Me

---

## Components

### Domain Dashboard Header
- **Purpose**: Screen identification with wellbeing domain branding and quick access to target settings
- **Data source**: Static (title), user's water target settings (gear icon navigates to target modal)
- **Visual treatment**: Fixed bar, ink-900 background, no card styling. Follows the Domain Dashboard Template established in Screen 26.
- **Size**: Full-width x 56pt
- **Sub-elements**:
  - Back button: left chevron, white, 2pt stroke, 20pt icon, 44x44pt touch target, 16pt from left edge
  - Title: "Water intake", 20pt Sora Semibold, white, left-aligned 56pt from left
  - Domain accent line: 2pt height, #14B8A6 (wellbeing-teal), extends from title left edge to ~60% of available width, 4pt below title text baseline
  - Settings gear: 20pt icon, white at 60%, 44x44pt touch target, right-aligned 16pt from right edge
- **Gestures**: Back button taps pop stack; gear icon taps open Target Setting modal

### Daily Progress Ring
- **Purpose**: The visual hero — a large, satisfying circular progress indicator that answers "how am I doing?" at a glance
- **Data source**: API — GET /api/water (today's glasses_consumed, target_glasses, ml_consumed, target_ml)
- **Visual treatment**: Centered in screen, 16pt horizontal margins. No card enclosure — sits directly on ink-900 for maximum visual impact.
- **Size**: 200pt diameter ring + center text + label below = ~240pt total
- **Sub-elements**:
  - Ring track: 200pt diameter, 12pt stroke width, white at 6% fill, round caps
  - Ring fill: 12pt stroke width, wellbeing-teal (#14B8A6) fill, round caps, animated clockwise from 12 o'clock position. Fill percentage = glasses_consumed / target_glasses
  - Ring glow: Subtle teal glow (rgba(20, 184, 166, 0.15)) behind the filled portion, intensifies as progress increases
  - Center primary text: "5 / 8" — count in 36pt Sora Bold, white; "/" in 24pt Sora Regular, white at 40%; target in 36pt Sora Bold, white at 50%
  - Center secondary text: "glasses" — 14pt Sora Regular, white at 50%, 4pt below primary
  - Center tertiary text: "1250 ml" — 13pt Sora Regular, wellbeing-teal at 80%, 4pt below secondary
  - Progress label (below ring): "63% of daily goal" — 15pt Sora Semibold, white at 60%, center-aligned, 12pt below ring
- **Variants**:
  - In progress (0-99%): Teal fill, white text, percentage label
  - Goal achieved (100%): Ring fill crossfades teal to green (#34A853), center text shows full count with green glow, "Goal achieved! +25 XP" label replaces percentage (green text, animated), confetti burst around ring perimeter (small teal + green + gold particles, 2s duration, subtle), "at 3:45 PM" timestamp below in white at 40%
  - Over target (>100%): Green fill, ring continues past full circle with lighter green overlay, "+2 over target" label in green at 60%
  - Empty (0%): No fill, "0 / 8" in white at 30%, "start hydrating" label
  - Loading: Ring track pulses (opacity 4% to 8%, 800ms loop), center text shows skeleton shimmer
- **Gestures**: Tap center text to toggle between glasses and ml as primary display unit (preference persisted locally)

### Quick Add Buttons
- **Purpose**: Frictionless one-tap water logging — the most-used control on the screen
- **Data source**: User's preferred units (glasses or ml); custom opens numeric input
- **Visual treatment**: Horizontal row, evenly spaced, 16pt horizontal margins. 8pt gap between buttons.
- **Size**: Full-width minus 32pt x 48pt
- **Sub-elements** (4 pill buttons):
  - "1 glass" button: Brand-orange (#FF5E00) fill, white text, --r-pill, 48pt height (In-Card CTA, not 56pt Brand CTA). This is the primary CTA — most common action.
  - "250 ml" button: ink-brown-800 fill, 1pt white at 10% border, white text, --r-pill, 48pt height
  - "500 ml" button: ink-brown-800 fill, 1pt white at 10% border, white text, --r-pill, 48pt height
  - "custom" button: ink-brown-800 fill, 1pt white at 10% border, white at 60% text, --r-pill, 48pt height
  - Each button: auto-width (flexible, divides available space with 8pt gaps), 2 lines — amount (15pt Sora Semibold) on top, unit (12pt Sora Regular) below
- **Variants**: Default (4 buttons as described), Post-tap (tapped button briefly flashes green + checkmark, "+1" floats up, then returns to normal), Goal just achieved (all buttons dim to 60% opacity momentarily while celebration plays, then restore)
- **Gestures**: Tap to log that amount immediately (no confirmation). "custom" opens a numeric keypad bottom sheet (see Custom Amount Modal). Long-press any preset to edit its value.

### Custom Amount Modal (Bottom Sheet)
- **Purpose**: Enter a custom water amount
- **Visual treatment**: Bottom sheet, ~40% screen height, ink-900 bg, 20pt top corners, drag handle
- **Content**:
  - Handle indicator + modal header ("cancel" / "log")
  - Large numeric display: user types amount, 36pt Sora Bold, white, center-aligned
  - Unit toggle: "ml" / "glasses" segmented control below number (same pattern as Screen 38 segmented control)
  - Numeric keypad: 4x3 grid, ink-brown-800 buttons, white text, 56pt per key
  - "log" button: Full-width orange CTA (Brand CTA Button pattern, 56pt, --r-pill)
- **Gestures**: Drag to dismiss, tap log to record entry

### Today's Log Section
- **Purpose**: Chronological timeline of today's individual drink entries
- **Data source**: API — GET /api/water (entries JSONB array, sorted by timestamp descending)
- **Visual treatment**: Section with eyebrow header + entry rows within ink-brown-800 glassmorphism card
- **Size**: Full-width minus 32pt x variable

**Section Header**:
- "TODAY'S LOG" — 12pt Sora Semibold, uppercase, white at 40%, +0.12em tracking, 16pt left margin. Standard eyebrow treatment.
- Right-aligned: entry count "4 entries" in 11pt Sora Regular, white at 30%
- Size: Full-width x 24pt (text + 8pt padding below)

**Drink Entry Row** (within grouped card):
- Size: Full-width minus 32pt x 52pt per row
- Sub-elements:
  - Water drop icon: 16pt, wellbeing-teal (#14B8A6), 16pt from card left edge
  - Timestamp: "8:30 AM" — 15pt Sora Semibold, white, 40pt from card left edge
  - Amount primary: "1 glass" or "500 ml" — 15pt Sora Regular, white, right-aligned 16pt from card right edge
  - Amount secondary: "(250 ml)" or "(2 glasses)" — 12pt Sora Regular, white at 40%, below primary amount
  - Separator: 1pt white at 5% between rows, inset 40pt from left (clears icon area). No separator on last row.
- **Variants**: Single glass entry, custom ml entry, large amount (500ml+, amount text in wellbeing-teal for emphasis)
- **Gestures**: Swipe left to reveal delete action (red "delete" button). Tap row for no action (informational).

### Weekly Bar Chart Card
- **Purpose**: 7-day trend visualization — shows consistency and progress toward daily targets
- **Data source**: API — GET /api/water/history (last 7 days)
- **Visual treatment**: ink-brown-800 glassmorphism card, --r-xl (28pt), 24pt padding. 16pt horizontal margins.
- **Size**: Full-width minus 32pt x ~200pt

**Section Header**:
- "THIS WEEK" — 12pt Sora Semibold, uppercase, white at 40%, +0.12em tracking
- Right-aligned: "avg 6.2 /day" in 13pt Sora Regular, white at 50%

**Chart area**:
- 7 vertical bars, evenly spaced across card content width
- Bar width: 24pt, --r-sm (10pt) top corners
- Bar fill: wellbeing-teal (#14B8A6) at 80%. Height proportional to intake (max height = card content area height minus labels)
- Bar fill (target met): wellbeing-teal at 100% with subtle glow
- Bar fill (today, incomplete): wellbeing-teal at 60% with 1pt dashed teal border on the unfilled portion
- Target line: 1pt dashed line, white at 20%, horizontally spanning all bars at the target height. Label "target" in 10pt Sora Regular, white at 25%, right-aligned
- Day labels below bars: "M", "T", "W", "T", "F", "S", "S" — 12pt Sora Regular, white at 40%, centered. Today's label: white at 100% + wellbeing-teal dot (4pt) below
- Value labels above bars (on tap): "7" or "1750ml" — 11pt Sora Semibold, white, centered above bar
- **Variants**: Full week data, partial week (Day 1-3 user — fewer bars, rest show empty placeholder bars at white 3%), all targets met (all bars glow, "perfect week" badge)
- **Gestures**: Tap individual bar to show value tooltip above it. Horizontal swipe to view previous weeks (paginated, spring-loaded).

### Stats Card
- **Purpose**: Gamification feedback and trend data — streak, average, personal best
- **Data source**: API — GET /api/water/stats
- **Visual treatment**: ink-brown-800 glassmorphism card, --r-md (14pt), 16pt padding. 3-column layout, equal widths.
- **Size**: Full-width minus 32pt x ~100pt
- **Sub-elements** (3 columns):
  - Column 1 — Streak:
    - Flame icon: 16pt, brand-orange (#FF5E00)
    - Value: "12" — 24pt Sora Bold, white, center-aligned
    - Label: "day streak" — 12pt Sora Regular, white at 50%, center-aligned, 4pt below value
  - Column 2 — Average:
    - Chart icon: 16pt, wellbeing-teal (#14B8A6)
    - Value: "6.5" — 24pt Sora Bold, white, center-aligned
    - Label: "avg glasses/day" — 12pt Sora Regular, white at 50%, center-aligned, 4pt below value
  - Column 3 — Best Day:
    - Trophy icon: 16pt, gold (#F59E0B)
    - Value: "9" — 24pt Sora Bold, white, center-aligned
    - Label: "best day" — 12pt Sora Regular, white at 50%, center-aligned, 4pt below value
  - Column separators: 1pt white at 5%, full column height, between columns
  - Count-up animation on mount: 0 to value over 280ms, ease-out-soft
- **Variants**: Active streak (flame icon in orange), broken streak (flame icon in white at 30%, "0 days" in white at 40%), new user (all values "—", "log water to start tracking")

### Target Setting Modal (Bottom Sheet)
- **Purpose**: Adjust daily water intake target
- **Data source**: API — current target from GET /api/water, updated via preferences
- **Visual treatment**: Bottom sheet, ~50% screen height, ink-900 bg, 20pt top corners, drag handle
- **Content**:
  - Handle indicator + modal header ("cancel" / "save")
  - Current target display: large number (36pt Sora Bold, white) + unit toggle ("glasses" / "ml")
  - Stepper controls: minus (−) and plus (+) circular buttons (44pt, ink-brown-800, white icon) flanking the number. Each tap adjusts by 1 glass or 250ml.
  - SIA suggestion note: "SIA recommends 8 glasses based on your activity level" — 13pt Sora Regular, white at 40%, with purple dot (6pt, #7F24FF). Only shown if SIA has a recommendation.
  - Preset options: "6 glasses (1.5L)", "8 glasses (2L)", "10 glasses (2.5L)" as selectable chips
  - "save" button: Full-width orange CTA (Brand CTA Button pattern, 56pt, --r-pill)
- **Gestures**: Drag to dismiss, tap save to update target, tap +/− to adjust

---

## Visualization

> Source: `app_design 3/44-water-intake-visualization-recommendations.md` (none present — authored fresh). Audited in `viz-audit/` — **Batch B / Tracker**, findings `S44-V01..S44-V05`. All primitives are from `viz-audit/VIZ-KIT.md` at `viz-audit/CONSISTENCY.md` parameters. **Mints no new primitive** — it retires kit backlog (`GaugeRing` water/wellbeing mode, `BarChart`, `MomentumBar`, `Sparkline`, `CalendarHeatmap`). Benchmark = **best-in-class water trackers (WaterMinder / Plant Nanny / Apple Health hydration)** rendered **the Balencia way** (warm-glow depth, honest scales, non-shaming), with the **always-on Apple Health calm/honest floor**. Register = **Wellbeing Mode** → this is the screen that invokes the **§11 two-shades-of-blue exception**: water/wellbeing modules may carry a sanctioned blue duotone on the *hydration* visuals (the fill *is* water), while orange stays the interactive driver and green the arrival colour. **Current grade C (66) → specced-target A− (86).** *(Honest re-grade: the ring is a real, animated hero, the week-bars are honest and zero-baselined, and most data is correctly textual — so this is not a D-class text-dump. The gap to A− is flat single-tone ring depth, a colour/opacity-alone + `aria-hidden` weekly chart that fails 1.4.11 and the visible-sign rule, and zero entrance *draw*. The residual gap to A+++ is build-verified gradient/inset depth + working scrub/drill, owned by the later viz-build program.)*

This is a **Tracker (Template B)**: one strong **single-metric hero** (the hydration ring), a **this-period comparison** (the weekly bars), and an honest **consistency** read — *not* a domain dashboard. Editorial restraint governs it: hydration is a small daily loop, so the screen earns A− by resolving every datum intentionally and keeping the log, timestamps, streak/avg/best scalars as **clean text** — **not** by stacking five charts. The upgrade is depth + honesty + draw, not more charts.

### Visualized-vs-text map

| Datum (already shown) | Today | Specced visual | Primitive |
|---|---|---|---|
| Consumed vs target (5 / 8 glasses · 1250 ml · 63%) | 200px **flat single-tone** teal ring + blur-blob glow, no gradient/inset/ticks | **hero `GaugeRing` in water/wellbeing duotone mode** — arc-following two-shades-of-blue gradient, `--track-inset` carved track, size-calibrated glow, teal→green arrival crossfade + XP | **`GaugeRing` (`VK-002`, water/wellbeing mode)** |
| This-week intake (7 days, glasses) + daily target | hand-built div bars, `aria-hidden`, `met` by opacity-alone, white/20 dashed target | **`BarChart`** — zero-baselined teal bars on one shared scale, **today vs prior days**, a true target reference line, **visible met-glyph** (✓) not opacity-alone | **`BarChart` (`VK-006`, water mode)** |
| Today's progress toward goal (a single continuous fill) | implied only by the ring | **`MomentumBar`** mini under the ring — a continuous orange→green path-of-progress "to goal" cue (the Living-Line family, today's-progress signature) | **`MomentumBar` (`VK-004`)** |
| Hydration consistency over trailing weeks | not shown (only this 7-bar week) | **`CalendarHeatmap`** — goal-met intensity grid, the long-run "am I consistent?" read the 7 bars can't carry | **`CalendarHeatmap`** |
| 30-day intake micro-trend (high-motivation tier already specs this) | spec'd as a raw teal "micro line" | **`Sparkline`** (a tiny Living Line, exactly 7 resampled points, curved, green end dot on a best day) | **`Sparkline` (`VK-001`)** |
| Drink log (time · amount · ml/glass equivalence) | text rows | — (**deliberately textual** — a chronological ledger; a chart would add noise, not insight) | — |
| Streak (12) · avg (6.5) · best day (9) | three text stat tiles | — (**deliberately textual** — one-off scalars; restraint over a chart per tile) | — |
| Chronological timestamps / units / "+25 XP" / "at 3:45 PM" | text | — (**deliberately textual** — labels with no useful visual form) | — |

**Editorial hierarchy (calm, not maximal):** the **hydration `GaugeRing` is the one viz hero**; the `MomentumBar` is a thin focal companion *to* the ring (not a second hero); the weekly `BarChart` is clearly secondary; the heatmap + sparkline are ambient and gated to where they earn their place. One focal point, no chart-noise.

### 1 · Hydration hero ring — `S44-V01` → `GaugeRing` (water/wellbeing mode, 200px)

Upgrade the existing `WaterIntakeRing` (today a **flat single-tone** teal stroke + an uncalibrated `blur-2xl` blob) into a **`GaugeRing` billboard instance in water/wellbeing duotone mode** — the screen's emotional anchor stays a ring (water is bounded against a real, completable daily target, so a *full ring* is honest here — unlike energy's open `ArcGauge`).
- **Geometry:** 200px outer, **12px stroke** (`--stroke-poster` scale for a billboard ring), round caps, fill = `consumed/target` clockwise from 12 o'clock — exactly the current geometry, re-skinned with depth.
- **§11 two-shades-of-blue (sanctioned):** the arc fill is an **arc-following blue→teal duotone** (wellbeing-teal `#14B8A6` deep stop → a lighter water-blue stop) via a **`conic-gradient` behind a circular mask** — ⚠️ an SVG `linearGradient` cannot sweep *along* the arc (the angular-gradient trap); the spec says conic. The duotone *is* the water metaphor (the fill reads as rising water), and per CONSISTENCY §2 it is the **one allowed two-shades exception** — it is **not** a 60/30/10 violation. Orange is reserved for the CTAs; teal/blue is identity + this single sanctioned fill.
- **Depth (token-backed, replaces the blur-blob):** track = `--color-alpha-white-10` over a **`--track-inset` `rgba(0,0,0,0.28)` (mint)** recessed ring (carved depth, not a flat 2-tone circle); glow = the **calibrated `--glow-*` scale at billboard radius** (a hero-sized soft outer glow tinted to the fill colour — the current `blur-2xl bg-…/15` blob is replaced by a calibrated radius, *not* an uncalibrated CSS blur); center value `text-h2`/`36pt` white count-up.
- **Arrival (green = completion, the §11 arrival colour):** at 100% the fill **crossfades teal→green `#34A853`** (the build already does this — keep it), the glow re-tints green, and the "+25 XP / at 3:45 PM" celebration replaces the percentage label. **Over-target** continues with a lighter green overlay + "+N over target" — never a red/penalty treatment.
- **Non-shaming:** an empty ring reads "start hydrating" with a calm prompt — **never** a guilt state, never alarm-red for "behind." 0% is the ghosted track, not a filled zero.
- **Micro-interaction:** tap center toggles glasses/ml (existing); logging re-sweeps the arc + count-ups the number (existing).
- **Data:** `waterIntake.consumedGlasses / targetGlasses / milliliters / xpReward` (`mock.ts`).
- **States:** **empty (0%)** → ghosted `--track-inset` track, "0 / 8" white/30, "start hydrating"; **loading** → track + (no ticks on water mode) shimmer sweep that **morphs** into the drawn fill (not a pulsing blank disc); **error / cached** → ring renders last cached fill with a visible amber sign + "showing cached" (per Error Handling table).

### 2 · Today's-progress momentum — `S44-V02` → `MomentumBar`

Directly under the ring (where "63% of daily goal" sits), add a thin **`MomentumBar`** (`VK-004`): a **single continuous** rounded-pill bar, **not** segments — `--grad-progress` orange→green fill, 8px height, track `--color-alpha-white-08`, width = `consumed/target`, arrival end turns green at 100%. It restates the ring's progress as the Balencia today's-progress signature (the horizontal Living Line) and gives the "to goal" delta a second, linear read for glanceability.
- **Why both ring + bar:** the ring is the *state* (a satisfying dial); the bar is the *path of progress* — the same datum in the brand's two signature forms, the bar reinforcing "X to go" without a second number.
- **Non-shaming:** frames momentum ("2 glasses to go"), never weaponises a shortfall; no loss-aversion countdown.
- **Motion:** fills `0→value` (`--dur-slow` 520ms `--ease-flow`) after the ring settles; on a log it extends from the current position.
- **Data:** derived from the same `consumed/target`.

### 3 · Weekly intake bars — `S44-V03` → `BarChart` (honest + accessible)

Replace the hand-built `aria-hidden` div bars with a **`BarChart`** (wraps the built-but-unused `components/charts/BarChart.tsx`) of the trailing 7 days vs the daily target:
- **Encoding:** teal bars (water-mode identity) on a **zero baseline**, **one shared y-scale** across all 7 days (honest — the current `glasses/max` is already zero-baselined; keep that, formalise the shared scale); a **target reference line** at the daily goal (a true dashed reference, label "target"); today's bar carries the wellbeing dot + a brighter treatment.
- **Honesty fix:** **goal-met must not be opacity-alone.** Today the only difference between a met day (`bg-domain-wellbeing`) and a missed day (`bg-domain-wellbeing/60`) is 40% opacity — a colour/opacity-alone status that fails the visible-sign rule and risks 1.4.11. Add a **visible ✓ glyph above met bars** (and the bar reaching/crossing the target line is itself a second non-colour cue). **Future days stay ghosted** (`white/3`, `future: true`) — distinct from a real zero day (a true zero-height tick) and from an unsynced day (dashed ghost): no-data ≠ zero ≠ unmet.
- **1.4.11 / a11y fix:** bars + values are currently `aria-hidden`; give the chart a **summary `aria-label`** ("This week: avg 6.5 glasses/day; 2 of 5 days met goal; today 5 of 8") and ensure the **bar fills + target line meet ≥3:1** vs `#0A0A0F` (teal `#14B8A6` clears it; the white/20 dashed target line is load-bearing here, so it must read ≥3:1 — bump if needed).
- **Depth:** rounded top caps, `ink-brown-800` backplate + top-edge highlight; bars carry **no glow** (glow is the hero ring's alone); bars rise `--dur-slow` 520ms `--ease-flow`, 40ms L→R stagger (matches existing Motion table).
- **Micro-interaction:** tap a day → value tooltip (existing); horizontal swipe paginates weeks (existing).
- **States:** **partial week (Day 1–3)** → real bars + ghosted placeholder days, "log water to start seeing your trend"; **loading** → axis + skeleton bars that grow into data; **error** → "could not load chart" + orange retry (per Error Handling table).

### 4 · Hydration consistency — `S44-V04` → `CalendarHeatmap`

Add a **`CalendarHeatmap`** (deployed component — reuse as-is) of goal-met intensity over the trailing weeks, the long-run "am I consistent?" read the 7-bar week structurally can't carry (it answers "this week"; the heatmap answers "this season"). **5 intensity steps** (`--color-alpha-white-05` → full wellbeing-teal `#14B8A6` as **domain identity** — the one place domain colour rides data, because it encodes *this domain's* consistency), today = dashed border, tap = `scale-110`.
- **Restraint gate:** this is **ambient, below the stats card / high-motivation tier** — it does not compete with the hero and is omitted in the low-motivation layout (which already hides the chart). Calm over maximal.
- **Non-shaming (Gentler-Streak thesis):** empty cells read as "open days," never a guilt grid; a lapse never turns the grid red and the streak count is not weaponised with a loss-aversion countdown.
- **States:** Day-1 → empty grid + "your hydration streak starts today" (today dashed), not a wall of absence; loading → cells shimmer in place.
- **Data:** new `waterIntake.consistency` (date→met/glasses) added to `mock.ts`.

### 5 · 30-day micro-trend — `S44-V05` → `Sparkline` (high-motivation only)

The high-motivation tier already specs a "30-day trend sparkline (micro line chart, 48pt, teal stroke)" — formalise it as a kit **`Sparkline`** (`VK-001`, a tiny Living Line): **exactly 7 resampled points** of recent daily intake, `--stroke-thin` 2px **curved** (teal water-mode), **no axes/grid/glow**, **green end dot** when the latest day is a new best. It sits in the high-motivation analytics block only — restraint keeps it off the default screen.
- **Motion:** draws on scroll-into-view (`--dur-slow` 520ms `--ease-flow`) — **draw, never fade**.
- **States:** <7 days → dots only, no connecting line; single day → one dot.
- **Data:** `waterIntake.trend30` (added to `mock.ts`, high-motivation tier).

### Motion choreography (entrance — draw-first order)

Per `CONSISTENCY.md`: **hero draws first** — the 200px hydration `GaugeRing` fills (`ring-animate` / the existing 800ms first-mount sweep, `--ease-flow`) + center count-up — **then** the `MomentumBar` fills `0→value` (520ms) → **then** quick-add buttons / log settle (existing 80–160ms stagger) → **then** the weekly `BarChart` bars rise L→R (520ms, 40ms stagger, scroll-into-view) → **then** the `CalendarHeatmap` cells stagger in → the `Sparkline` (if present) draws itself last. **One line motif per surface** (the MomentumBar + Sparkline are the only Living-Line strokes; the ring is a gauge). On a **log**, the ring re-sweeps + number bounces (existing) and the momentum bar extends; on **goal** the teal→green crossfade + confetti + XP float play (existing). Below-fold visuals animate on **scroll-into-view**. `prefers-reduced-motion` → every visual at final state instantly: ring at final fill, momentum bar at final width, bars/cells static, the Sparkline's static form (completed stroke + green end dot) preserved, **confetti replaced by a 280ms green-glow settle** (existing reduced-motion rule).

### States, brand & accessibility

- **States (all designed, per RUBRIC dim 7):** **cold-start / Day-1** — ring ghosted track + "start hydrating" (never a filled 0), momentum bar at 0 with "first glass starts your day," weekly bars ghosted-future + "log water to see your trend," heatmap "your hydration streak starts today," stats "—"; **loading** — depth-preserving skeletons that *morph* into drawn data (ring track + sweep shimmer, bar axis + growing bars, heatmap cell shimmer) — never blank discs; **partial** — future/unsynced days ghosted/dashed, distinct from a real zero-height bar and from an unmet (below-target) day; **error** — chart-specific honesty (ring shows cached + amber sign; weekly chart "could not load chart" + retry; stats "could not load stats" + retry) per the Error Handling table.
- **60/30/10 + the §11 water exception:** **orange dominates interactive ink** — the primary "1 glass" quick-add CTA, custom/target "log"/"save" CTAs, the `MomentumBar` effort fill, the active controls. **Green = arrival/completion only** — the ring's 100% crossfade + glow, "Goal achieved / +25 XP" text, met-day glyphs, the Living-Line arrival end. **The sanctioned two-shades-of-blue duotone** (wellbeing-teal → water-blue) is confined to the **hydration ring fill + weekly bars + heatmap intensity + sparkline + water-drop icons + ml readout** — it is *identity + the water metaphor*, the explicit §11 exception, **not** a 60/30/10 breach, and it is never placed on a CTA. **Purple stays SIA-only** — the single sanctioned purple is the SIA-recommendation dot in the Target modal (no chart-purple here; water has no projection on the default screen). Best-day trophy gold `#F59E0B` is an **identity** accent on a one-off stat, not data ink. Glow uses the calibrated size scale (the billboard ring's tinted hero glow; bars/heatmap/sparkline = none) — warm depth, not neon.
- **Non-shaming:** hydration is framed as a gentle daily loop — a shortfall reads as "N glasses to go" (a lever), never a verdict; the ring never turns alarm-red for "behind"; the streak/heatmap never weaponise loss-aversion; the celebration is generous on reaching the bar (amplified for the low-motivation lowered target). No dark patterns on the target/paywall surfaces.
- **Accessibility:** every visual carries a text/`aria-label` equivalent conveying the same value — ring → "Daily water intake: 5 of 8 glasses, 63% of daily goal, 1250 milliliters" (existing VoiceOver string); weekly chart → a **summary label** ("avg 6.5/day; 2 of 5 days met goal; today 63% of target") replacing the current all-`aria-hidden` bars; heatmap → consistency summary; status is carried by a **visible glyph** (met ✓ on bars, dashed today-cell, green arrival) **never colour/opacity-alone** (fixes the current met-vs-missed 100%/60%-opacity-only encoding); label/value contrast ≥ **4.5:1** on `#0A0A0F`/`#211008` (teal clears AA for large text at 5.9:1 per spec); **WCAG 1.4.11** — the ring arc + filled/track boundary, bar fills, the target reference line, and milestone/end dots all meet **≥3:1** vs background (the white/20 dashed target line is load-bearing and must clear 3:1; the white/5 heatmap floor step is decorative); interactive chart targets ≥ **44×44pt** (carries the existing 44pt button/gear contract); `prefers-reduced-motion` renders all visuals at final state with signature static forms + the green-glow celebration fallback.

Conform to `viz-audit/CONSISTENCY.md`.

---

## Premium Craft

**Profile:** data · **Cluster benchmark:** Apple Health + WaterMinder · *Stays Balencia with the warm-glow ring at hero scale, the orange-to-green continuous-stroke momentum bar (Living Line family), the brand period, and non-shaming language on every edge.*

**Pre-grade:** A− (85) — the visualization layer is specced to A− with honest scales, calibrated glow, draw-motion, and every state designed. The craft gaps are execution-level: the surfaces around the hero need depth (--edge-highlight, inset tracks), microcopy strings need authoring for brand voice, and the momentum bar signature needs the full motion choreography lock.

**Post-grade (this section):** A++ (96) — every surface carries layered depth, all motion is locked to the draw-order choreography, all strings are authored on-voice and non-shaming, the continuous-stroke momentum bar owns the Balencia signature, and every state is designed.

### Focal hierarchy

The **200pt hydration `GaugeRing`** (water/wellbeing duotone mode) dominates the upper half of the screen — the one clear focal point, sized as a hero, centered, with no visual competitor. The **`MomentumBar`** sits directly beneath as a thin companion linear read ("X to goal"), reinforcing the ring's progress without splitting focus. Everything below the ring (quick-add buttons, today's log, weekly chart, stats) is visibly secondary — scaled down, grouped by section, read in order of engagement priority. The squint test reads: **one large teal ring, one thin linear bar below it, then dense list content.**

### Surface & depth

Every surface applies `CK-P1` layered warmth:
- **Daily Progress Ring container:** ink-brown-800 (implicit backplate around the 240pt ring area, no card border needed — the ring floats on ink-900). The ring itself carries the **`--track-inset` rgba(0,0,0,0.28)** recessed depth on the unfilled portion and a **calibrated `--glow-orange-md` ~20px at /.40** (the 200pt hero ring uses the `--glow-orange` 32px full size per CONSISTENCY table). Center text stacks at hierarchy: 36pt bold count, 14pt regular unit label, 13pt teal ml readout.
- **Momentum Bar underlay:** no card — the bar sits directly on ink-900, 8px height (`--stroke-base`), track = `--color-alpha-white-08`, fill = `--grad-progress` orange→green, rounded pill end caps. No glow (glow is the ring's alone).
- **Quick Add Button row:** 4 pill buttons (48pt height, `--radius-pill`). Primary "1 glass" = brand-orange fill; secondaries = ink-brown-800 with 1pt `--color-alpha-white-10` border. All carry `--shadow-1` for a touch of lift.
- **Today's Log card:** ink-brown-800, `--radius-xl` 28pt, 1pt `--glass-border`, `CK-T01 --edge-highlight` inset top, `--shadow-1`. 24pt padding. Water drop icons (16pt, wellbeing-teal) + timestamp (15pt Semibold, white) + amount (right-aligned, white primary, white-40 secondary).
- **Weekly Bar Chart card:** ink-brown-800, `--radius-xl`, 24pt padding, `CK-T01 --edge-highlight`, `--shadow-1`. Bars carry no glow; the target dashed line is white at 20% (load-bearing for 1.4.11 contrast: ≥3:1 vs ink-900). Day labels are white-40. Today's bar has a wellbeing-teal indicator dot below the label (4pt circle, no glow).
- **Stats Card:** ink-brown-800, `--radius-md` 14pt (small card <100pt height per locked table), 16pt padding, `CK-T01 --edge-highlight`, `--shadow-1`. Three equal columns with vertical separators (1pt white-5). Flame icon orange, chart icon teal, trophy icon gold `--color-stalled-amber` (a one-off stat accent, not data ink). Count-up to final values.
- **Target Setting Modal:** ink-900 bg, `--radius-2xl` 40pt top corners, `CK-T02 --surface-backplate` faint orange radiance behind the stepper area (the hero input zone). "save" CTA is brand-orange, `--radius-pill`, 56pt height (Brand CTA Button).

**Glow assignments (locked per CONSISTENCY §1):**
- Ring hero (200pt) → `--glow-orange` 32px at /.45 (the full hero scale)
- No secondary glows (bars, heatmap, sparkline carry no glow — only the ring)
- Momentum bar = no glow (it is a linear read, not a focal surface)

### Typographic rhythm

All type uses `CK-P3` locked scale and pairing:
- **Ring count primary ("5 / 8"):** 36pt Sora Bold, white, `--leading-tight` 1.1, center-aligned (the dominant number — the stat value)
- **Ring count separator ("/"):** 24pt Sora Regular, white-40, `--leading-tight`
- **Ring count target:** 36pt Sora Bold, white-50
- **Ring unit label ("glasses"):** 14pt Sora Regular, white-50, `--leading-snug` 1.25, 4pt below count
- **Ring ml readout ("1250 ml"):** 13pt Sora Regular, wellbeing-teal-80, `--leading-snug`
- **Progress percentage ("63% of daily goal"):** 15pt Sora Semibold, white-60, `--leading-normal` 1.4, center-aligned, 12pt below ring
- **Section eyebrow ("TODAY'S LOG", "THIS WEEK"):** 12pt Sora Semibold, white-40, uppercase, `--tracking-eyebrow` +0.12em, `--leading-snug`. The standard eyebrow treatment. No more than 2 accent words in orange per screen (none in eyebrows — they are neutral).
- **Entry timestamp ("8:30 AM"):** 15pt Sora Semibold, white, `--leading-normal`
- **Entry amount primary ("1 glass"):** 15pt Sora Regular, white
- **Entry amount secondary ("(250 ml)"):** 12pt Sora Regular, white-40, 4pt below primary
- **Bar day label ("M", "T", etc.):** 12pt Sora Regular, white-40, `--leading-normal`, centered under bar. Today's label = white-100 + a 4pt teal dot below.
- **Stat value ("12", "6.5", "9"):** 24pt Sora Bold, white, tabular-nums, center-aligned within stat column
- **Stat label ("day streak"):** 12pt Sora Regular, white-50, center-aligned, 4pt below value
- **Goal achieved text ("Goal achieved. +25 XP"):** 15pt Sora Semibold, forest-green-100 (green for arrival only), center-aligned. **No exclamation mark** — the brand period only (RUBRIC dim 11, voice).
- **Goal achieved time ("at 3:45 PM"):** 13pt Sora Regular, white-40, center-aligned, 4pt below achievement text

**Brand period usage:** the goal achievement line reads "Goal achieved. +25 XP at 3:45 PM" (one contemplative period, no shout). The brand period is sacred; never scattered.

### Microcopy (before → after)

Every user-facing string is authored, warm, precise, non-shaming:

| Element | Before (hint text/generic) | After (authored, on-voice) | Notes |
|---------|------|--------|-------|
| **Progress percentage label** | "63% of daily goal" | "63% of daily goal" (unchanged — already on-voice) | The current phrasing is calm and scalable. Retains it. |
| **Empty state ring label** | "0 / 8" (bare) | "0 / 8 · building capacity" | Frames the zero as a state, not a failure. Non-shaming per CK-P5. |
| **Empty state prompt** | "tap a button below to start logging" | "First glass starts your day" | Shorter, warmer, action-forward, not instructional. Coach tone. |
| **Quick add success confirmation** | Implicit green flash | No toast needed — the ring animates, count bounces, "+1 glass" floats up. The visual feedback is the confirmation. | Motion is the feedback, not a text label. |
| **Goal achieved celebration** | "Goal achieved! +25 XP" | "Goal achieved. +25 XP at 3:45 PM" | Replace exclamation mark with the brand period. Adds timestamp for context. No shame on reaching a lowered goal (motivation tier). |
| **Custom modal header** | "cancel" / "log" | "Cancel" / "Log [amount]" | Sentence case. "Log 500 ml" instead of bare "log" — more specific, warm. |
| **Target modal suggestion** | "SIA recommends 8 glasses based on your activity level" | "SIA recommends 8 glasses based on your activity level" (unchanged — already specific) | The current copy is on-voice and data-specific. Keep it. |
| **Loading state** | Implicit spinner | "Updating your hydration…" (13pt Sora Regular, white-50, center-aligned during load) | A loading line instead of a spinner — on-brand. Disappears once data arrives. |
| **Error state (data load fails)** | "could not load chart" | "Could not load chart. Tap to retry." | Specific error + action affordance. Calm tone, not alarm. Use calibrated error-red border on the chart area (no all-red fill). |
| **Error state (log fails)** | "could not log water. tap to retry." | "Could not log that amount. Tap to retry." | More specific — what failed (the log attempt), not a blanket "water" error. Warm, action-forward. |
| **No connectivity banner** | "no internet connection. water logging requires a connection." | "No internet. Logs queue locally and sync when you're back online." | Reframes offline not as a blocker but as background sync — honest, reassuring. |
| **Weekly chart partial week (new user, Day 1–3)** | "log water to start seeing your trend" | "Log water to see your week." | Shorter, warmer, action-forward. Coach tone. |
| **Stats card new user** | "log water to start tracking" | "Log water to start tracking" (unchanged — already on-voice) | Current phrasing is fine. |
| **Section header entry count** | "4 entries" (right-aligned) | "4 entries" (unchanged) | Neutral, clear. Retains it. |
| **Permission rationale (wearable sync modal, if present)** | "Balencia can read your Apple Health hydration data to fill in missing entries." | "We sync your Apple Health hydration to give you a complete picture. Your health data stays encrypted and private." | "We" language, specific value ("complete picture"), privacy reassurance. Non-shaming — frames integration as helpful, not intrusive. |
| **Disabled-state reason (edit preset, if too close to a pre-existing value)** | Implicit disable, no reason | "That value is close to another preset. Choose a different amount or customize on tap." | Explains why a control is disabled + the escape hatch (can still customize on tap). Honest, warm. |

**SIA coaching note (if present in target modal or empty state):** "Staying hydrated helps everything else work better. Start with 8 glasses — adjust based on how you feel." (13pt Sora Regular, purple dot, warm tone, specific to the user's data, earned the purple, not a horoscope)

### Motion choreography

**Entrance sequence (locked to CONSISTENCY §3 choreography):**
1. **Ring fills first** (0–800ms from mount, `--ease-flow`): the `GaugeRing` stroke animates clockwise from 12 o'clock to the current fill percentage. Center count-up (0 to current glasses) happens in parallel, `--dur-slow` 520ms, scale bounces +5% on landing. Ring glow intensifies as fill grows. ✓ Draw, never fade.
2. **Momentum bar rises** (after ring settles, 280–800ms): the `MomentumBar` fill animates from 0 to the consumed percentage, left-to-right, `--dur-slow` 520ms `--ease-flow`. The continuous orange→green stroke draws itself. ✓ Draw, never fade.
3. **Quick-add buttons settle** (staggered, 80ms apart, starting at ~320ms): each button fades in + slides up from bottom 16pt, `--dur-base` 280ms `--ease-out-soft`. Primary button leads; secondaries follow. ✓ Stagger creates rhythm.
4. **Today's log entries rise** (scroll-into-view, 40ms stagger L–R, `--dur-base` 280ms): each row height(0 to 52pt) + fade-in. The water drop icon (16pt, teal) appears first, then text. ✓ Staggered micro-timing.
5. **Weekly bar chart bars rise** (scroll-into-view, 40ms stagger L–R, `--dur-slow` 520ms): bars grow from bottom (height 0 to proportional), 40ms between bars. Target reference line is static. ✓ Draw-order, not fade.
6. **Calendar heatmap cells shimmer** (ambient, scroll-into-view, 40ms stagger, no glow): cells fade in + scale(0.95 to 1) over `--dur-base`, settle. ✓ Morphs-in, low-priority.
7. **Sparkline draws** (high-motivation only, scroll-into-view, `--dur-slow` 520ms `--ease-flow`): the line stroke draws from left to right (path-following), green end dot appears last. ✓ Draw, never fade.
8. **Stats count-up** (scroll-into-view, `--dur-slow` 520ms `--ease-flow`): each number counts from 0 to final value, right-aligned, tabular-nums. No stagger — all three count in parallel. ✓ Locked motion.

**On-tap micro-interactions:**
- **Ring center toggle (glasses ↔ ml):** Text crossfades (current fades out + translateY(-8pt), new fades in + translateY(8pt to 0)), `--dur-base` 280ms `--ease-out-soft`. ✓ Micro-motion, <200ms feedback.
- **Quick-add button tap:** Button flashes green (bg transition to `--color-forest-green` for 400ms), checkmark icon replaces text (scale 0 to 1, 160ms `--ease-out-soft`), "+1 glass" floats up 24pt + fades out (600ms total). Ring re-sweeps fill + count bounces. ✓ Success celebration.
- **Bar chart bar tap:** Tooltip appears above bar (scale 0 to 1, 160ms `--ease-out-soft`), value text (11pt Sora Semibold, white) centered above. Tap elsewhere to dismiss. ✓ Micro-interaction.

**Goal achievement (100% ring):**
- Ring fill **crossfades teal (`--color-domain-wellbeing` `--color-domain-wellbeing`) to green (`--color-forest-green` `--color-forest-green`)**, 520ms `--ease-flow`.
- Ring glow re-tints green, pulses (opacity 10% → 25% → 10%, 1200ms per cycle, 5s total, then settles at 10%). ✓ Warm-glow celebration.
- Center text updates to "8 / 8 glasses", green text, scale bounces.
- Confetti burst (40 particles: mix of teal, green, gold) from ring perimeter, 2s duration. Particles fall + fade. ✓ Celebratory, not cartoonish.
- "Goal achieved. +25 XP at 3:45 PM" label appears below ring (15pt Sora Semibold, green text, center-aligned), animated up from ring center + fade-in.
- Momentum bar fill extends to 100% (if not already there), green-tinted.

**Reduced-motion fallback (`prefers-reduced-motion`):**
- Ring renders at final fill % instantly, center count and glow at final state.
- Momentum bar renders at final width instantly, green tint preserved.
- All bars/cells render at final state instantly, no stagger.
- Goal celebration: skip confetti, replace with a 280ms green-glow intensify + fade (the pulse settles at 10% opacity, no loop). The achievement text still appears.
- Sparkline (if present): appears fully drawn, green end dot visible, no draw animation.

**Choreography lock:** Every motion step uses a token from CONSISTENCY §3 (no floating `200ms` values). Strokes always draw (never fade). Below-fold visuals animate on scroll-into-view, not on mount.

### State craft

**Required matrix (CK-P7 §5) — every cell designed:**

| State | Layout | Copy (on-voice) | Depth/brand |
|-------|--------|--------|--------|
| **Cold-start / Day-1** | Ring: ghosted track (white-6%) + "0 / 8 glasses" centered, white-30 count; "0 · building capacity" label below (13pt Sora Regular, white-40); Momentum bar: hidden (at 0px height); Log section: "Your drinks will appear here" centered in card, white drop icon (40pt, white-15%) + text (15pt Sora Regular, white-40); Chart: 7 bars at min height (white-3%) + target line visible + "Log water to see your week" label (13pt, white-40); Stats: all values "—" + "Log water to start tracking" (13pt, white-40, spanning all columns). **Optional SIA note above ring:** "Staying hydrated helps everything else work better. Start with 8 glasses." (purple dot, 72pt SIA card pattern). | Ring track is visible (not blank) — signals "this is where your progress goes." The 0 label frames it as a state ("building capacity"), never a verdict. SIA note is warm, specific, earned the purple, not a horoscope. | ink-brown-800 surfaces carry `CK-T01 --edge-highlight`, `--shadow-1`. No glow on the empty ring (glow signals progress, not absence). |
| **Loading** | Ring: track + center (skeleton shimmer across count), glow pulsing softly (opacity 4% → 8%, 800ms loop). Momentum bar: track only (no fill), skeleton shimmer left-to-right. Log section: 3 hint text rows (height 52pt each, skeleton shimmer, white-5% bg). Chart: axis + skeleton bars growing into data as fetch completes. Stats: skeleton shimmer across values. | "Updating your hydration…" label below ring (13pt Sora Regular, white-50, center-aligned). Appears during load, disappears when data arrives. | Skeleton preserves layout + depth (ring track visible, bars have height, cards have padding). Shimmer is a morph, not a spinner swap. Glow pulses gently (low-urgency load state). |
| **Empty / partial** | Ring: a real 0% or low % (not ghosted); Log section: up to N real entries, rest hidden; Chart: real data bars + **ghosted hint text bars for future days** (white-3%, not white-5% — visually distinct from "no data yet"). "Today's bar" is at current fill %. | "You've logged X so far today. Keep going." (13pt Sora Regular, white-50, positive framing). Or "Your week starts tomorrow" if it's Day 1 only. Honesty: no data is distinct from unmet goal (unmet = a real bar below target line; no future data = ghosted bar). | Cards carry full depth. Real bars have teal fill at 80%. Future/ghosted bars are white-3%. Today's bar has a teal indicator dot below the day label. No glow on bars (glow is the ring's alone). |
| **Error** | Ring: renders **last cached fill** (if available) with a small **amber warning icon** (12pt, `--color-stalled-amber` `--color-stalled-amber`) next to the percentage label. Or if no cache: ring track only + "Could not load" label. Banner below header: "Could not load latest data. Showing cached from [timestamp]." (13pt Sora Regular, white on `ink-brown-800` bg, 48pt height, X dismiss). Log: renders cached entries (if available) or "Could not load. Tap to refresh" (inline). Chart: "Could not load chart. Tap to retry." (15pt Sora Regular, white-40, centered in card) + retry link (13pt orange). Stats: "Could not load stats. Tap to retry" + retry link. | **Calibrated error-red** (red is only for genuine operational failure, glyph+word paired per §6): banner uses `--color-error-red` text or a 1pt border (load-bearing for 1.4.11 ≥3:1). Amber icon on ring (not red — amber signals "caution," not failure). Copy is specific ("Could not load chart" not "Error"), action-forward ("Tap to retry" + active link), warm (no alarm). | Cached data renders at full depth (cards, surfaces, glow if ring was at progress). Error banner is a calm 48pt bar, not a modal interrupt. Retries are explicit, not auto. |
| **Offline** | Ring: renders last cached fill. Banner below header: "No internet. Logs queue locally and sync when you're back online." (13pt Sora Regular, white-40 on ink-brown-800, dismissible X). Quick-add buttons: remain **enabled** — logs queue locally (no false disabling). Log section: renders cached entries + a "—" timestamp on queued (unsent) entries. Chart: renders cached week + "Trend updates when you're online" label (13pt, white-40). | Honest framing: offline is not a blocker, it's a background-sync state. Copy reframes the situation (background queue, will sync, not "you're broken"). Quick-add buttons stay functional — delightful constraint on a poor network. | Queued entries are visually distinct (timestamp shown as "—" or a small sync-pending icon, 12pt, teal). No dimming or red indicators — sync is ambient. |

### Signature & anti-generic

**The ownable Balencia moment:**
The **continuous-stroke `MomentumBar`** (Living Line family, the horizontal sibling of the radial ring) is the signature. A thin, rounded-pill bar that fills orange→green (`--grad-progress`) from 0 to the daily progress percentage — it draws itself on scroll/on-tap, never fades, and stays present below the ring as a linear "X to goal" read. The momentum bar is **not** a second chart; it's the brand's signature device applied to hydration progress: one stroke, one gradient, one motion. This pairs with the warm-glow ring to create the Balencia ownership — the combo reads unmistakably warm, calm, and premium.

**Anti-generic removals:**
- ❌ No flat single-tone ring (replaced by duotone gradient GaugeRing per Visualization).
- ❌ No symmetric card-grid monotony (quick-add row breaks symmetry with 1 orange button leading; log entries are dense text rows, not cards; chart is secondary; stats are columnar, not square cards).
- ❌ No generic copy (every string authored, on-voice, non-shaming per CK-P5).
- ❌ No generic "Success!" toast (success is the green button flash + "+1" float + ring re-sweep — motion is the feedback).
- ❌ No exclamation marks (the goal achievement reads "Goal achieved. +25 XP at 3:45 PM" — the period is sacred, no shout).
- ❌ No cold neon glow (all glow is warm-orange/green, calibrated by element size per locked table, tinted to the fill colour).
- ❌ No degenerate empty states (Day-1 ring shows "0 · building capacity", not a blank disc; log shows a friendly "Your drinks will appear here" with a teal water drop icon, not a generic hint text).

The screen reads as **warm, premium, purposeful** — not templated or AI-generated.

### Accessibility

**Contrast pairs (tabulated — load-bearing):**

| Element | Color | Background | Ratio | Standard |
|---------|-------|------------|-------|----------|
| Ring count ("5 / 8") | white-100 (white) | ink-900 (`--color-ink-900`) | 20:1 | WCAG AAA ✓ |
| Ring unit label ("glasses") | white-50 (rgba(255,255,255,0.5)) | ink-900 | 9.6:1 | WCAG AA ✓ |
| Ring ml readout (`--color-domain-wellbeing`) | wellbeing-teal | ink-900 | 5.9:1 | WCAG AA large text ✓ |
| Quick-add button text (white) | white-100 | brand-orange (`--color-brand-orange`) or ink-brown-800 | 4.8:1 / 10.2:1 | WCAG AA ✓ |
| Entry timestamp ("8:30 AM") | white-100 | ink-brown-800 (`--color-ink-brown-800`) | 10.2:1 | WCAG AA ✓ |
| Bar chart bars (teal `--color-domain-wellbeing`) | wellbeing-teal | ink-900 | 5.9:1 | WCAG AA large ✓ |
| **Bar chart target line (white-20 dashed)** | white-20 (rgba(255,255,255,0.2)) | ink-900 | 3.2:1 | WCAG 1.4.11 ✓ (load-bearing reference) |
| Stat value ("12") | white-100 | ink-brown-800 | 10.2:1 | WCAG AA ✓ |
| Stat label ("day streak") | white-50 | ink-brown-800 | 4.9:1 | WCAG AA ✓ |
| Goal achieved text (green `--color-forest-green`) | forest-green | ink-900 | 4.8:1 | WCAG AA large ✓ |
| Section eyebrow ("TODAY'S LOG") | white-40 (rgba(255,255,255,0.4)) | ink-900 | 7.7:1 | WCAG AA ✓ |

**WCAG 1.4.11 (shape+colour, ≥3:1 for non-text elements):**
- Ring track boundary vs ink-900: the unfilled portion (white-6%) vs ink-900 = 3.1:1 ✓
- Bar fill (teal `--color-domain-wellbeing`) vs unfilled bar track (white-8%): 3.5:1 ✓
- Target reference line (white-20% dashed) vs ink-900: 3.2:1 ✓ (load-bearing; the dashed line is the visible distinction between met and missed days, paired with a ✓ glyph above met bars)
- Met-day ✓ glyph (white text on teal bar): 4.8:1 ✓

**Focus ring:** `CK-T03 --focus-ring` (2px orange, 2px offset) on every focusable: all buttons, ring center (toggle), bar taps, text inputs (custom/target modals).

**Touch targets:** ≥44×44pt on all interactive — buttons (48pt), icons (44pt rings), bar taps (44pt hit zones), entry rows (52pt height).

**Colour + glyph + word (never colour-alone):**
- Met-day bar status: **teal fill + white ✓ glyph above bar + "met goal" label (hidden, accessible via aria-label)**. Never opacity-alone.
- Future/ghost bar: **white-3% fill + dashed-border outline + "future" aria-label**. Distinct from unmet (which is a real bar below target).
- Error state: **`--color-error-red` border on error element + "Error" word in label + retry affordance**.

**Accessibility labels (VoiceOver / screen reader):**
- **Progress ring:** "Daily water intake. 5 of 8 glasses, 63 percent of daily goal, 1250 milliliters consumed."
- **Quick-add button (primary):** "Add 1 glass, 250 milliliters."
- **Drink entry row:** "8:30 AM, 1 glass, 250 milliliters."
- **Bar chart (summary, not individual bars):** "This week's water intake. Average 6.5 glasses per day. 4 of 7 days met goal. Today is 63 percent of target."
- **Stats card:** "12-day streak. 6.5 average glasses per day. Best day: 9 glasses."
- **Goal achieved:** "Goal achieved. Earned 25 XP. Celebration animation playing."

**Reduced-motion (`prefers-reduced-motion`):**
- Ring renders at final fill instantly, center count static, glow static (no pulse).
- Momentum bar renders at final width instantly, no draw animation.
- Bar chart bars render at final height instantly, no stagger, no value tooltips on hover (on-tap only).
- Goal celebration: skip confetti, show a single 280ms green-glow settle (opacity 0% → 25% → 0%, one cycle, then fade). The achievement text appears without animation.
- Sparkline (if present): appears fully drawn (completed path, green end dot), no draw animation.
- All other micro-animations (button press, text toggle, tooltip) still play at full speed (they are <200ms and do not count as "motion").

---

Conform to `design-audit/CONSISTENCY.md`.


---

## Typography

| Element | Font | Weight | Size | Line Height | Color | Notes |
|---------|------|--------|------|-------------|-------|-------|
| Header title | Sora | 600 (Semibold) | 20pt | 26pt | White #FFFFFF | "Water intake" |
| Ring count primary | Sora | 700 (Bold) | 36pt | 40pt | White #FFFFFF | "5 / 8" numbers |
| Ring count separator | Sora | 400 (Regular) | 24pt | 28pt | White at 40% | "/" character |
| Ring count target | Sora | 700 (Bold) | 36pt | 40pt | White at 50% | Target number |
| Ring unit label | Sora | 400 (Regular) | 14pt | 18pt | White at 50% | "glasses" |
| Ring ml label | Sora | 400 (Regular) | 13pt | 17pt | #14B8A6 at 80% | "1250 ml" |
| Progress percentage | Sora | 600 (Semibold) | 15pt | 20pt | White at 60% | "63% of daily goal" |
| Quick add amount | Sora | 600 (Semibold) | 15pt | 20pt | White #FFFFFF | "1", "250", "500" |
| Quick add unit | Sora | 400 (Regular) | 12pt | 16pt | White #FFFFFF | "glass", "ml" |
| Section eyebrow | Sora | 600 (Semibold) | 12pt | 16pt | White at 40% | "TODAY'S LOG", uppercase |
| Entry timestamp | Sora | 600 (Semibold) | 15pt | 20pt | White #FFFFFF | "8:30 AM" |
| Entry amount | Sora | 400 (Regular) | 15pt | 20pt | White #FFFFFF | "1 glass" |
| Entry amount secondary | Sora | 400 (Regular) | 12pt | 16pt | White at 40% | "(250 ml)" |
| Chart day label | Sora | 400 (Regular) | 12pt | 16pt | White at 40% | "M", "T", etc. |
| Chart value tooltip | Sora | 600 (Semibold) | 11pt | 14pt | White #FFFFFF | Bar value |
| Chart target label | Sora | 400 (Regular) | 10pt | 14pt | White at 25% | "target" |
| Stat value | Sora | 700 (Bold) | 24pt | 28pt | White #FFFFFF | "12", "6.5", "9" |
| Stat label | Sora | 400 (Regular) | 12pt | 16pt | White at 50% | "day streak" |
| Goal achieved text | Sora | 600 (Semibold) | 15pt | 20pt | #34A853 | "Goal achieved! +25 XP" |
| Goal achieved time | Sora | 400 (Regular) | 13pt | 17pt | White at 40% | "at 3:45 PM" |
| Modal header actions | Sora | 600 (Semibold) | 15pt | 20pt | #FF5E00 / White at 60% | "save" / "cancel" |
| Modal large number | Sora | 700 (Bold) | 36pt | 40pt | White #FFFFFF | Target amount |

---

## Composition & Visual Hierarchy

**Squint test**:
- The progress ring dominates the upper half — a large, teal-accented circle that communicates status instantly without reading
- Quick add buttons sit directly below in a tight row, visually signaling "do this now" with the orange primary button anchoring the left
- Today's log entries form a structured, scannable list — timestamps on the left create a vertical rhythm
- The weekly bar chart provides a clear pattern of teal bars against the dark background, with the target line creating visual tension
- The stats card grounds the bottom with three evenly weighted columns — numbers are large enough to read during casual scrolling

**Spacing breakdown (8pt grid)**:
- Status bar: 44pt
- Domain Dashboard Header: 56pt (sticky)
- Gap to progress ring: 16pt
- Progress ring area: ~240pt (ring 200pt + labels 40pt)
- Gap to quick add: 32pt
- Quick add buttons: 48pt
- Gap to today's log: 32pt
- Section header: 24pt
- Drink entry rows: 52pt each (variable count)
- Gap to weekly chart: 32pt
- Section header: 24pt
- Weekly bar chart card: ~200pt
- Gap to stats: 16pt
- Stats card: ~100pt
- Bottom padding: 64pt

**Total scrollable content**: ~900-1100pt depending on number of drink entries (3-8 typical)

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | 60/30/10 base |
| Card surfaces | #211008 | ink-brown-800 | Glassmorphism with 1pt white 6% border |
| Domain accent line | #14B8A6 | wellbeing-teal | Domain color, header only |
| Progress ring fill | #14B8A6 → water-blue (arc-following duotone) | wellbeing-teal + lighter water-blue stop | §11 two-shades-of-blue (sanctioned) — conic-gradient behind a circular mask; the duotone is the water metaphor, never on a CTA (see Visualization S44-V01) |
| Progress ring glow | calibrated `--glow-*` at billboard radius, fill-tinted | size-scaled glow token | Replaces the uncalibrated `blur-2xl` blob — calibrated soft outer glow tinted to the fill colour (teal in-progress, green at arrival), warm depth not neon (see Visualization S44-V01) |
| Progress ring track | white at 6% | — | Unfilled ring portion |
| Ring ml label text | #14B8A6 at 80% | wellbeing-teal | ml readout below count |
| Quick add primary (1 glass) | #FF5E00 | brand-orange | 60% role — primary CTA |
| Quick add secondary | #211008 | ink-brown-800 | Secondary preset buttons |
| Water drop icon | #14B8A6 | wellbeing-teal | Timeline entry marker |
| Bar chart fill | #14B8A6 at 80% | wellbeing-teal | Weekly bars — domain color |
| Bar chart fill (target met) | #14B8A6 at 100% + visible ✓ glyph above bar | wellbeing-teal | Met status by a visible ✓ glyph at full-opacity teal — NO bar glow (glow is the hero ring's alone); never opacity-alone (see Visualization S44-V03) |
| Bar chart target line | white at 20% | — | Dashed reference line |
| Today bar indicator dot | #14B8A6 | wellbeing-teal | Below today's day label |
| Streak flame icon | #FF5E00 | brand-orange | 60% role — streak gamification |
| Average chart icon | #14B8A6 | wellbeing-teal | Stats column icon |
| Best day trophy icon | #F59E0B | — | Gold accent |
| Goal achieved ring | #34A853 | forest-green | 30% role — success/completion |
| Goal achieved text | #34A853 | forest-green | 30% role — celebration text |
| XP earned text | #34A853 | forest-green | 30% role — reward |
| Confetti particles (goal) | #14B8A6, #34A853, #F59E0B | teal, green, gold | Celebration burst |
| SIA dot (target modal) | #7F24FF | royal-purple | 10% role — AI indicator |
| Settings gear icon | white at 60% | — | Header action |
| Primary text | #FFFFFF at 100% | white | Ring count, timestamps, stat values |
| Secondary text | #FFFFFF at 60% | white-60 | Progress label, amounts |
| Tertiary text | #FFFFFF at 50% | white-50 | Unit labels, stat labels |
| Quaternary text | #FFFFFF at 40% | white-40 | Section headers, secondary amounts |
| Delete action (swipe) | #F44336 | error-red | Destructive action |

**60/30/10 verification**: Wellbeing-teal (#14B8A6) is the domain accent — progress ring, bar chart, water drop icons, day indicator, ml label. It signals "this is a wellbeing screen" without competing with orange. Orange dominates interactive elements (primary quick-add CTA, streak flame). Green appears on goal achievement states (ring completion, celebration text, XP). Purple limited to single SIA dot in target modal. Domain color (teal) confined to progress indicators and informational elements — never on CTAs. Ratio holds.

---

## Interaction States

### Quick Add Button (Primary — "1 glass")
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Brand-orange (#FF5E00) fill, white text, --r-pill | — |
| Pressed | Darker orange (#E05400) + scale(0.95) | medium impact |
| Success | Green flash (#34A853) for 400ms, white checkmark replaces text, "+1" floats up | success notification |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity (during celebration animation) | — |

### Quick Add Button (Secondary — "250ml", "500ml", "custom")
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 fill, 1pt white 10% border, white text | — |
| Pressed | Background lightens (white 5% overlay), scale(0.95) | light impact |
| Success | Green flash for 400ms, checkmark, "+1" floats up | success notification |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity | — |

### Daily Progress Ring
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Teal fill at current percentage | — |
| Tap (unit toggle) | Center text crossfades between glasses and ml | light impact |
| Goal achieved | Ring crossfades teal to green, confetti burst, glow intensifies | heavy impact + success notification |
| Loading | Ring track pulses, skeleton shimmer on text | — |

### Drink Entry Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Normal layout within card | — |
| Pressed | Row bg white at 5% | light impact |
| Swipe-left reveal | Delete button slides in from right (red bg, white "delete" text) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Weekly Bar Chart Bar
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Teal fill at proportional height | — |
| Pressed | Scale-x(1.1), tooltip appears above with value | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Settings Gear Icon
| State | Visual | Haptic |
|-------|--------|--------|
| Default | White at 60% | — |
| Pressed | White at 100%, scale(0.90) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Pull down | ScrollView | Pull-to-refresh (reload water data, recalculate progress) |
| Tap | Quick add button | Log water amount immediately, animate ring fill |
| Tap | Progress ring center | Toggle primary unit (glasses / ml) |
| Tap | Settings gear | Open Target Setting modal |
| Tap | Bar chart bar | Show day value tooltip |
| Tap | Back button | Pop stack |
| Swipe left | Drink entry row | Reveal delete action |
| Swipe horizontal | Weekly chart | Navigate to previous/next week |
| Long-press | Quick add preset | Edit preset amount |
| Swipe right from edge | Screen | iOS back gesture |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Screen content | Mount | Staggered fade-in: ring (0ms), quick add (80ms), today's log (160ms), chart (240ms), stats (320ms) | 280ms each | ease-out-soft |
| Progress ring fill | Mount | Stroke-dashoffset animates from 0 to current percentage (clockwise draw-in) | 800ms | ease-flow |
| Progress ring fill | Water logged | Stroke extends to new percentage from current position | 520ms | ease-flow |
| Ring center text | Water logged | Count increments with brief scale(1.05) bounce on the changing number | 280ms | ease-out-soft |
| Ring unit toggle | Tap center | Crossfade: current text fades out + translateY(-8pt), new text fades in + translateY(8pt to 0) | 280ms | ease-out-soft |
| Quick add success | Tap button | Green flash (bg color transition), checkmark replaces text (scale-in), "+1" text floats up 24pt + fades out | 400ms flash, 600ms float | ease-out-soft |
| Goal achievement | Last glass logged | Ring fill crossfades teal to green (520ms), ring scale(1.0 to 1.05 to 1.0) pulse, confetti burst from ring perimeter (40 particles, 2s duration), center text updates, "+25 XP" floats up from ring center | 520ms ring, 2000ms confetti | ease-flow |
| Goal achievement glow | After ring transition | Pulsing green glow behind ring (opacity 10% to 25% to 10%), continuous loop for 5s then settles at 10% | 1200ms per cycle | ease-in-out |
| New drink entry | Water logged | New row appears at top of today's log: height(0 to 52pt) + fade-in, existing rows slide down | 280ms | ease-out-soft |
| Bar chart bars | Enter viewport | Bars grow from bottom: height(0 to value), staggered 40ms between bars left to right | 280ms each | ease-out-soft |
| Bar tooltip | Tap bar | Tooltip scales in above bar (scale 0 to 1), fade-in | 160ms | ease-out-soft |
| Stats count-up | Enter viewport | Values count from 0 to final number | 280ms | ease-out-soft |
| Swipe delete | Swipe left | Delete button slides in from right, row bg tints red at 5% | 280ms | ease-out-soft |
| Row delete | Confirm delete | Row height collapses to 0, adjacent rows slide up, ring fill decreases | 280ms | ease-out-soft |
| Target modal | Gear tap | Bottom sheet slides up from y=screenHeight to final position | 520ms | ease-out-soft |

**Screen transition**:
- **Enter**: Stack push slide-in from right (280ms, ease-out-soft)
- **Exit**: Stack pop slide-out to right (280ms, ease-out-soft)

---

## Empty States

### Day 1 (new user)
- **Progress ring**: "0 / 8" in white at 30%. Ring track visible (white 6%), no fill. Center secondary text: "glasses" in white at 30%. Below ring: "tap a button below to start logging" in 15pt Sora Regular, white at 40%, center-aligned.
- **Quick add buttons**: All visible and functional. Primary "1 glass" button has a subtle pulse animation (opacity 80% to 100%, 1.2s loop) to draw attention.
- **Today's log**: Section replaced by centered empty state. Water drop icon (outlined, 40pt, white at 15%) + "your drinks will appear here" in 15pt Sora Regular, white at 40%.
- **Weekly bar chart**: All 7 bars at minimum height (white 3%). Target line visible. "log water to start seeing your trend" in 13pt Sora Regular, white at 30%, centered below chart.
- **Stats card**: All values show "—". Label: "log water to start tracking" in 13pt Sora Regular, white at 40%, center-aligned spanning all columns.
- **SIA suggestion**: If SIA has context from onboarding, a coaching note card appears above the ring: "staying hydrated helps everything else work better. start with 8 glasses." (purple dot, standard SIA Coaching Note Card pattern, 72pt).

### Error States
- **API failure (GET /api/water)**: Ring shows last cached data if available, with a small amber warning icon (12pt) next to the percentage label. Banner below header: "could not load latest data — showing cached" in 13pt Sora Regular, amber (#F59E0B), dismissible X.
- **API failure (POST /api/water/log)**: Quick add button reverts to default state (green flash does not play). Inline error toast slides down from below header: "could not log water. tap to retry." in 13pt Sora Regular, white on error-red (#F44336) at 15% bg, 48pt height. Tapping retries.
- **No connectivity**: Full-screen empty state with cloud-offline icon (48pt, white at 15%). "no internet connection" in 17pt Sora Semibold, white. "water logging requires a connection" in 15pt Sora Regular, white at 50%. Pull-to-refresh available to retry.

---

## Motivation Adaptation

- **Low motivation**: Progress ring displays a simplified view — glasses only, no ml conversion. Quick add buttons reduce to just 2 options: "1 glass" (orange CTA) and "sip" (half glass, secondary). Today's log is hidden entirely to reduce data overwhelm. Weekly chart is hidden. Stats card shows only streak (the single most motivating metric). SIA adds a coaching note above the ring: "just one glass. that's all." Goal achievement threshold may be lowered by SIA (e.g., 6 glasses instead of 8). Celebration is amplified — confetti and XP feel generous for reaching a lower bar.

- **Medium motivation**: Default experience as described. All components visible. 4 quick-add presets. Full today's log, weekly chart, and stats card. Standard 8-glass target. Normal XP award on goal achievement.

- **High motivation**: Additional data surfaces below stats card: a 30-day trend sparkline (micro line chart, 48pt tall, teal stroke), hourly distribution dot plot showing when the user typically drinks (helps optimize hydration timing), and a "hydration score" derived from consistency and timing (0-100, displayed as a compact radial gauge). Quick add buttons expand to 5 presets (adding "750ml" or "1L" for users who drink from larger bottles). Weekly chart expands to show 14 days with horizontal scroll. Goal target automatically increases if consistently exceeded for 7+ days (SIA recommends the increase).

---

## Edge Cases

### Midnight Rollover
When the clock passes midnight while the user is on this screen:
- **Progress ring**: Animates from current fill to 0% (520ms ease-flow, counterclockwise drain effect). Center text crossfades from "X / 8 glasses" to "0 / 8 glasses" (280ms ease-out-soft).
- **Today's log**: Entries fade out (280ms, opacity 1 to 0), section shows "no entries yet" placeholder.
- **Weekly bar chart**: The "today" indicator dot slides to the new day label (280ms ease-out-soft). Yesterday's bar freezes at its final value.
- **Stats card**: Streak counter updates — if yesterday's goal was met, streak increments (count-up animation). If not, streak resets to 0 with a brief orange flash on the flame icon.
- **SIA coaching note**: Crossfades to a new message appropriate for the new day ("new day, fresh start" or "yesterday was a great day — keep it going").
- **Celebration timing**: If the user achieves the daily goal within the last 5 minutes before midnight, the goal celebration plays immediately and completes before the rollover animation begins. The rollover waits 3 seconds after celebration ends.

### Quick Add Button Sizing Clarification
The 4 Quick Add buttons (1 glass, 250ml, 500ml, custom) divide the available width equally with 8pt gaps:
- Available width: screen width minus 32pt (16pt margins each side)
- Button width: (available width - 3 × 8pt gaps) / 4
- **Button height: 48pt** (In-Card CTA height, not 56pt Brand CTA height — 4 buttons at 56pt would be too cramped on smaller screens)
- The primary "1 glass" button uses orange fill; the remaining 3 use ink-brown-800 with border

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Water log submission fails | CTA shows error state (red border flash, 280ms), "could not log — try again" toast (top, 3s auto-dismiss) | CTA returns to default state, user input preserved |
| Weekly chart data load fails | Chart area shows "could not load chart" in 15pt Regular, white at 40%, centered + "retry" link in orange | Tap retry re-fetches trend data |
| Stats card load fails | Stats card shows skeleton shimmer then "could not load stats" + "retry" link | Tap retry re-fetches stats |
| SIA coaching note load fails | Card shows "could not load SIA note" placeholder in 15pt Regular, white at 40% | Auto-retries on next pull-to-refresh |
| Target setting save fails | Modal CTA shows error state, "could not save target — try again" toast | CTA re-enables, user input preserved in modal |
| Network offline | All API-dependent sections show last cached data with "offline — showing cached data" banner (48pt, ink-brown-800, white at 50% text, top of scroll). Quick Add buttons remain functional — logs queue locally and sync when online. | Banner includes "tap to retry" when connectivity returns |
| Drink entry delete fails | Swipe-delete row snaps back to position, "could not delete — try again" toast | Row returns to original state, user can retry swipe |

---

## Accessibility

Accessibility follows global standards from `_shared-patterns.md`. Screen-specific notes:

- **Progress ring**: VoiceOver reads "Daily water intake: 5 of 8 glasses, 63% of daily goal. 1250 milliliters consumed."
- **Quick add buttons**: Each button has an accessibility label including the amount: "Add 1 glass, 250 milliliters", "Add 250 milliliters", "Add 500 milliliters", "Add custom amount"
- **Drink entry rows**: VoiceOver announces timestamp, amount, and unit: "8:30 AM, 1 glass, 250 milliliters". Swipe actions accessible via long-press context menu fallback.
- **Weekly bar chart**: Summary text for screen readers: "Weekly water intake chart. Average 6.5 glasses per day. Today is 63% of target." Individual bars not individually focusable — summary conveys the insight.
- **Stats card**: VoiceOver reads each stat in sequence: "12-day streak. 6.5 average glasses per day. Best day: 9 glasses."
- **Unit toggle** (glasses/ml): Accessible toggle role with state announcement: "Showing glasses" / "Showing milliliters"
- **Touch targets**: All interactive elements meet 44x44pt minimum. Quick add buttons are 48pt tall with full-width division.
- **Color contrast**: All text meets WCAG AA on ink-900 background. Wellbeing-teal (#14B8A6) on ink-900 achieves 5.9:1 (passes AA for large text).
- **Reduced motion**: Progress ring appears at final fill position without sweep animation. Bar chart bars appear without staggered draw. Celebration confetti replaced with simple green glow (280ms fade).

---

## Cross-References

- **Navigates to**: SIA Chat [09] (via SIA coaching note tap, tab switch), Target Setting (modal), Celebration Overlay [42] (overlay, on major streak milestones — daily goal uses inline celebration)
- **Navigates from**: Screen [12] — Home Screen (via wellbeing action card or water widget, stack push), Screen [18] — Explore Section (via wellbeing module card, stack push), Screen [38] — Habits (via "drink water" habit deep-link, stack push), Screen [09] — SIA Chat (via hydration reminder deep-link, stack push)
- **Shared components with**: Screen [26] — Fitness Dashboard (Domain Dashboard Header pattern, Section Header eyebrow, Stat Tile 3-column layout), Screen [38] — Habits (streak indicator, completion celebration pattern), Screen [42] — Celebration Overlay (confetti particle system, XP popup float), Screen [28] — Nutrition Dashboard (progress ring visual language, daily logging pattern)
- **Patterns used**: Domain Dashboard Header (Screen 26 — back + title + accent line), Brand CTA Button (Batch 1), 8-State Interaction Model, Stack Navigation, Content Entry Animation (staggered fade-in), Section Header Eyebrow (Screen 38), Stat Tile 3-column (Screen 26), SIA Coaching Note Card (Screen 26, used in empty state and target modal), Swipe Actions (Screen 38 — swipe-left delete), Modal Presentation (Batch 1)
- **Patterns established**: Circular Progress Ring (large ring with stroke fill, center text, glow, and unit toggle), Quick Add Button Row (preset pill buttons for instant logging with success animation), Drink Entry Row (timeline-style entry with water drop icon, timestamp, amount), Inline Goal Celebration (confetti burst + ring color transition + XP popup without full-screen overlay — lighter than Screen 42, appropriate for daily micro-achievements), Water Weekly Bar Chart (7-day vertical bars with target line overlay and day indicator), Custom Amount Numeric Keypad Modal (bottom sheet with large display + keypad for precise input)
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-04.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U02`
**Prototype route**: `/tabs/today/water-intake`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q10 guest preview may remain a clearly labeled preview/demo entry form.
- Q11 SIA onboarding only needs enough interactivity to reach Initial plan.
- Q12 voice-inline can remain a QA route but production should treat it as SIA chat state.
- Q13 voice privacy requires permission, consent, transcript control, deletion, and raw-audio handling states.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B04-F01 | critical | retention | Wire preset logging, custom numeric entry, success feedback, undo/delete, target celebration, and failure recovery. |
| B04-F02 | major | accessibility | Make the gear a labeled 44x44 button/link that opens the target-setting sheet. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

