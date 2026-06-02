# Screen Design: Fitness & Workouts Dashboard

**Screen**: 26 of 73
**File**: 26-fitness-workouts-dashboard.md
**Register**: Product Mode
**Primary action**: start today's workout
**Tab**: Me (accessed via Explore section or SIA deep-link)
**Navigation**: Stack depth 2-3 from Me tab root (Me → Explore → Fitness Dashboard). Also reachable via SIA deep-link or Home action card.

---

## Purpose

The Fitness & Workouts Dashboard is the user's command center for physical activity. It surfaces SIA's AI-generated workout plan for today, shows connected wearable data (WHOOP), tracks fitness goals, and provides a quick 7-day history at a glance. This screen establishes the **Domain Dashboard Template** — the canonical layout pattern that every domain dashboard in the app (Nutrition, Finance, Career, Relationships, Spirituality, Learning, Creativity) will follow.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. SIA's coaching note — the AI voice, immediately below the header
2. Today's workout plan — the primary content card with "start workout" CTA
3. WHOOP recovery data — connected wearable integration (conditional)
4. Active fitness goals with progress bars
5. 7-day workout history with weekly stats
6. "Log workout" FAB for manual logging

**User flow**:
- **Arrives from**: Explore Section [18] via stack push, SIA Chat [09] via deep-link stack push, Home Screen [12] via action card stack push, Life Areas Overview [16] via domain tap stack push
- **Primary exit**: Screen 27 (Workout Detail / Active Workout) via stack push — triggered by "start workout" CTA or tapping the workout card
- **Secondary exits**: Goals List [13] via stack push (pre-filtered to fitness), Connected Services [22] via stack push (WHOOP setup), RPG Character [19] via stack push (tapping skill level badge), SIA Chat [09] via tab switch (tapping SIA note card)

---

## Layout

**Scroll behavior**: ScrollView (content is moderate length, not a dynamic list)
**Tab bar visible**: Yes

### ASCII Wireframe

```
┌─────────────────────────────────┐
│         Status Bar (44pt)       │
├─────────────────────────────────┤
│  ←  ┃ Fitness & workouts  Lv.12│  56pt — Domain Dashboard Header
│      ┃ (red accent line)        │  FIXED, sticky on scroll
├─────────────────────────────────┤
│                                 │  SCROLLABLE from here
│  ┌─────────────────────────────┐│
│  │ ● SIA says:                 ││  72pt — SIA Coaching Note
│  │ "Your recovery is high      ││
│  │  today. Good day for        ││
│  │  intensity."                ││
│  └─────────────────────────────┘│
│          16pt gap               │
│  ┌─────────────────────────────┐│
│  │ TODAY'S WORKOUT              ││  ~220pt — Primary Content Card
│  │                              ││
│  │ Upper body strength          ││
│  │ Strength · 45 min            ││
│  │                              ││
│  │ ┌──────┐┌─────┐┌─────┐  +2 ││  exercise preview chips
│  │ │Bench ││ OHP ││Rows │     ││
│  │ └──────┘└─────┘└─────┘     ││
│  │                              ││
│  │ ┌───────────────────────┐   ││
│  │ │   Start workout →      │   ││  orange pill CTA
│  │ └───────────────────────┘   ││
│  └─────────────────────────────┘│
│          16pt gap               │
│  ┌─────────────────────────────┐│
│  │ WHOOP RECOVERY               ││  ~120pt — Integration Card
│  │                              ││  (conditional)
│  │  Sleep  │  HRV   │ Recovery ││
│  │   85    │   68   │   78%    ││
│  │   ●●●●  │  ●●●   │  ●●●●   ││
│  └─────────────────────────────┘│
│          16pt gap               │
│  ┌─────────────────────────────┐│
│  │ Active goals        see all ││  ~140pt — Goals Section
│  │                              ││
│  │ ████████████░░░  Run 5K     ││
│  │ 68%                          ││
│  │ ██████░░░░░░░░  Build       ││
│  │ 40%             muscle      ││
│  └─────────────────────────────┘│
│          16pt gap               │
│  ┌─────────────────────────────┐│
│  │ This week           see all ││  ~180pt — History + Stats
│  │                              ││
│  │  M   T   W   T   F   S   S ││  7-day calendar dots
│  │  ●   ●   ○   ●   ○   ○   · ││
│  │                              ││
│  │ ┌──────┐┌──────┐┌──────┐   ││  stat tiles row
│  │ │  3   ││ 135  ││ 850  │   ││
│  │ │workts││ min  ││ cal  │   ││
│  │ └──────┘└──────┘└──────┘   ││
│  └─────────────────────────────┘│
│                                 │
│          64pt bottom padding    │
│                                 │
│       ┌────────────────┐        │  FAB, floating, z-40
│       │  + Log workout  │        │  48pt, above tab bar
│       └────────────────┘        │
├─────────────────────────────────┤
│  Today  │  SIA  │ Goals │  Me  │  Tab Bar (56pt + 34pt safe)
└─────────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Status Bar** — 44pt
   - Purpose: system status bar
   - Content: transparent, system-managed

2. **Domain Dashboard Header** — 56pt, FIXED
   - Purpose: screen identification, back navigation, RPG level display
   - Content: back chevron (left), "Fitness & workouts" title with 2pt red (#EF4444) accent line underneath, "Lv.12" RPG badge (right)
   - Sticky on scroll with backdrop-blur (z-30)

3. **SIA Coaching Note Card** — 72pt (variable: min 56pt, max 96pt)
   - Purpose: AI coaching voice — the first thing the user reads after the title
   - Content: purple dot indicator (6pt, #7F24FF) + contextual SIA message
   - 16pt top margin from header

4. **Today's Workout Card** — ~220pt
   - Purpose: primary content — AI-generated workout plan for today
   - Content: eyebrow label, workout name, type + duration, exercise preview chips (horizontal scroll), "start workout" CTA
   - 16pt top margin

5. **WHOOP Integration Card** — ~120pt (conditional)
   - Purpose: connected wearable data display
   - Content: 3-column layout (sleep score, HRV, recovery percentage) with color-coded indicators
   - 16pt top margin. Shows "Connect WHOOP" prompt (~64pt) if not connected.

6. **Active Goals Section** — ~140pt
   - Purpose: domain-filtered fitness goals with progress
   - Content: section heading row + max 2 goal rows with progress bars
   - 16pt top margin

7. **This Week Section** — ~180pt
   - Purpose: recent activity overview and key metrics
   - Content: 7-day calendar dot row + 3 stat tiles (workouts completed, active minutes, estimated calories)
   - 16pt top margin

8. **Bottom Padding** — 64pt
   - Purpose: clears FAB and tab bar from content

9. **FAB (Log workout)** — 48pt height, floating
   - Purpose: manual workout logging shortcut
   - Content: "+ Log workout" text
   - Positioned 16pt above tab bar, centered, z-40

10. **Tab Bar** — 56pt + 34pt safe area
    - Purpose: primary app navigation
    - Content: Today | SIA | Goals | Me (Me active)

---

## Components

### Domain Dashboard Header
- **Purpose**: screen identification with domain branding and RPG integration
- **Data source**: user's fitness skill level from RPG system
- **Visual treatment**: fixed bar, ink-900 background, no card styling
- **Size**: full-width × 56pt
- **Sub-elements**:
  - Back button: left chevron, white, 2pt stroke, 20pt icon, 44×44pt touch target, 16pt from left edge
  - Title: "Fitness & workouts", 20pt Sora Semibold, white, left-aligned 56pt from left
  - Domain accent line: 2pt height, #EF4444 (fitness red), extends from title left edge to ~60% of available width, 4pt below title text baseline
  - RPG skill badge: "Lv.12", 13pt Sora Semibold, #EF4444 text, background #EF4444 at 15% opacity, r-pill shape, 8pt horizontal / 4pt vertical padding, right-aligned 16pt from right edge
- **Gestures**: back button taps pop stack; RPG badge taps push to RPG Character [19]

### SIA Coaching Note Card
- **Purpose**: contextual AI coaching message, establishes SIA-first pattern
- **Data source**: AI-generated based on WHOOP data, workout history, goal progress
- **Visual treatment**: ink-brown-800 card with glassmorphism (1pt border, white at 6% opacity), r-xl (28pt)
- **Size**: full-width minus 32pt (16pt margins) × 72pt (variable)
- **Sub-elements**:
  - Purple dot: 6pt circle, #7F24FF, 24pt from left edge of card, vertically centered with first text line
  - Message text: 15pt Sora Regular, white, left-aligned 40pt from card left edge, 24pt right padding, max 3 lines
- **Variants**:
  - WHOOP connected: references recovery data ("Your recovery is high today. Good day for intensity.")
  - No WHOOP: references workout history ("You've hit 3 workouts this week. One more for your goal.")
  - Day 1: motivational starter ("Ready to build your routine? Here's what I suggest.")
- **Gestures**: tap entire card → navigates to SIA Chat [09] with fitness context pre-loaded

### Today's Workout Card
- **Purpose**: the primary AI-generated content — today's recommended workout plan
- **Data source**: AI workout engine (SIA-generated plan based on goals, recovery, history)
- **Visual treatment**: ink-brown-800 card with glassmorphism, r-xl (28pt), 24pt internal padding
- **Size**: full-width minus 32pt × ~220pt
- **Sub-elements**:
  - Eyebrow: "TODAY'S WORKOUT", 12pt Sora Semibold, white at 40%, uppercase, +0.12em tracking
  - Workout name: 17pt Sora Semibold, white ("Upper body strength")
  - Type + duration: 13pt Sora Regular, white at 50% ("Strength · 45 min")
  - Exercise preview chips: horizontal ScrollView, each chip is ink-900 background, r-sm (10pt), 8pt horizontal / 4pt vertical padding, 13pt Sora Regular white, 8pt gap between chips. Shows 3 visible + "+N" overflow indicator
  - "Start workout" CTA: 48pt height, full card content width, Burnt Orange (#FF5E00), white text 16pt Sora Semibold, r-pill. 16pt top margin from chips.
- **Variants**:
  - Populated: full workout plan as described
  - Day 1 (no plan yet): SIA-generated starter based on onboarding. If fitness not in onboarding, shows "Tell SIA about your fitness goals" card with text link to SIA Chat
  - Rest day: "No workout planned today" message with "Log a workout" secondary button (white text, no fill)
  - Loading: skeleton shimmer on all text elements
- **Gestures**: tap card body → stack push to Screen 27 (Planning mode); tap "start workout" → stack push to Screen 27 (transitions to Active mode)

### WHOOP Integration Card
- **Purpose**: display connected wearable recovery data for informed workout decisions
- **Data source**: WHOOP API via Connected Services
- **Visual treatment**: ink-brown-800 card with glassmorphism, r-xl (28pt), 24pt internal padding
- **Size**: full-width minus 32pt × ~120pt
- **Sub-elements** (3-column layout, equal widths):
  - Each column: value (centered) + label (12pt Sora Regular, white at 50%, centered) rendered as a `GaugeRing` per the Visualization section — recovery as the 96px hero gauge, sleep + HRV as 48px gauges — each carrying a **visible band glyph** (✓ good / ~ moderate / ! low) **plus** the band colour, never a colour-only dot
  - Column 1: Sleep score (value), "sleep" (label), 48px banded `GaugeRing` + glyph
  - Column 2: HRV (value), "HRV" (label), 48px banded value gauge + glyph (no false % target)
  - Column 3: Recovery % (value), "recovery" (label), 96px hero `GaugeRing` + glyph
  - Band thresholds (carried on the gauge fill + glyph, not a colour-only dot): green (#34A853) = good (≥70%), amber (#F59E0B) = moderate (40-70%), fitness-red (#EF4444) = low (<40%). See Visualization S26-V02.
- **Variants**:
  - Connected + data: full 3-column display
  - Connected + no data: "Syncing with WHOOP..." with inline spinner
  - Not connected: compact prompt "Connect WHOOP for recovery insights" in 15pt Sora Regular, white at 50%, with right chevron. ~64pt height. Tappable → Connected Services [22].
  - Error: "Could not load WHOOP data" with "retry" text link
- **Gestures**: tap card → expand to more detailed WHOOP view (future screen, not in current scope — for now, no-op with light haptic)

### Active Goals Section
- **Purpose**: show domain-filtered fitness goals with progress tracking
- **Data source**: user's goals filtered to Fitness domain
- **Visual treatment**: section with heading row + goal rows on ink-brown-800 cards
- **Size**: full-width × ~140pt
- **Sub-elements**:
  - Section heading row: "Active goals" in 18pt Sora Semibold, white, left-aligned + "see all" in 13pt Sora Regular, Burnt Orange (#FF5E00), right-aligned. 44pt touch target on "see all". Full row height 32pt.
  - Goal rows (max 2 visible): ink-brown-800 card, r-md (14pt), 16pt padding. Each row ~48pt:
    - Progress bar: 8pt height, r-pill, white at 8% track, Burnt Orange fill. Width = percentage of goal completion.
    - Goal name: 15pt Sora Regular, white, right of progress bar text or below bar
    - Percentage: 13pt Sora Semibold, white, left-aligned below bar
    - Domain tag chip: 8pt right margin, "fitness" in 11pt, #EF4444 text, #EF4444 at 15% background, r-pill
  - 8pt gap between goal rows
- **Variants**:
  - Populated: 1-2 goals with progress
  - No goals: "No fitness goals yet" in 15pt Regular, white at 50% + "create a fitness goal" text link in Burnt Orange
  - Loading: skeleton shimmer on goal rows
- **Gestures**: tap goal row → stack push to Goal Detail [14]; tap "see all" → stack push to Goals List [13] pre-filtered to fitness

### This Week Section
- **Purpose**: 7-day activity history and aggregate weekly metrics
- **Data source**: workout completion log for current week
- **Visual treatment**: section with heading + calendar dots + stat tiles in ink-brown-800 card
- **Size**: full-width × ~180pt
- **Sub-elements**:
  - Section heading row: "This week" + "see all" (same pattern as Active Goals heading). 32pt height.
  - 7-day calendar dots: horizontal row, evenly spaced across full width minus 32pt margins. Each dot:
    - Day label: 12pt Sora Regular, white at 40%, centered above dot ("M", "T", "W", etc.)
    - Dot: 12pt diameter circle
    - Completed: Burnt Orange (#FF5E00) fill
    - Planned but not done: white at 20% fill, 1pt dashed white at 30% border
    - Today (upcoming): white at 10% fill with subtle pulse animation (800ms, ease-flow, loops)
    - Rest day: no dot, dash (—) in white at 20%
    - Future: no dot, empty
  - Calendar dot row height: 40pt (including day labels)
  - Stat tiles row: 3 `KPIStatTile`s (per Visualization S26-V01), equal width, 8pt gaps between. 16pt top margin from calendar dots.
    - Each tile: ink-brown-800 background (slightly lighter than card behind — use ink-900 if nested inside a card, or standalone), r-md (14pt), 72pt height
    - Value: 20pt Sora Semibold, white, centered ("3", "135", "850")
    - Label: 12pt Sora Regular, white at 50%, centered, 4pt below value ("workouts", "min", "cal")
    - Honest WoW delta arrow (▲ #34A853 / ▼ white-40, fixed disclosed "vs last week" window; Day-1 reads "—", never a fabricated ▲)
    - Count-up animation on mount: 0 → value over 280ms, ease-out-soft
- **Variants**:
  - Populated: dots and stats reflect actual data
  - Day 1: all dots empty except today (pulse). Stats show "0 workouts · 0 min · 0 cal" — visible but zeroed.
  - All done: all planned dots filled. SIA note above might reference the achievement.
- **Gestures**: tap "see all" → expanded exercise history view (future detail, for now stack push to a placeholder); tap individual day dot → no action (informational only)

### FAB (Log Workout)
- **Purpose**: quick access to manual workout logging
- **Data source**: N/A (navigational)
- **Visual treatment**: floating button above tab bar, glassmorphism
- **Size**: 48pt height × auto-width (padding 24pt horizontal)
- **Sub-elements**:
  - Icon: "+" in 16pt, white
  - Label: "Log workout" in 15pt Sora Semibold, white
  - 8pt gap between icon and label
- **Variants**: N/A
- **Gestures**: tap → stack push to Screen 27 (Planning mode, blank template for manual entry)
- **Scroll behavior**: fades out on scroll down (opacity 0 + translateY +20pt, 160ms). Fades back in on scroll up or scroll stop.

---

## Visualization

> Source: `app_design 3/26-fitness-workouts-dashboard-visualization-recommendations.md`. Audited in `viz-audit/` — Batch (Domain-Dashboard A), findings `S26-V01..V06`. All primitives are from `viz-audit/VIZ-KIT.md` at `viz-audit/CONSISTENCY.md` parameters. Premium-depth, on-brand (60/30/10), **Product Mode → orange-dominant accent** (fitness-red `#EF4444` stays an *identity* accent on the header line + RPG badge only — never on data ink). Benchmark = **Strava + WHOOP** (activity trends, weekly volume, recovery gauges) rendered **the Balencia way** (Living Line + warm glow), not as a Strava/WHOOP clone. **Current grade D (53) → specced-target A− (86).** *(Honest re-grade under the revised 10-dimension rubric; the residual gap to A+++ is build-verified depth + working scrub/drill micro-interactions, owned by the later viz-build program.)*

This screen is the **canonical Domain-Dashboard A template** (every other domain dashboard inherits its visualization slots). Today it renders as a text dashboard — WHOOP is three bare numbers under colour-only dots (the dots are `aria-hidden`, a 1.4.11 + colour-alone miss), missions are flat orange bars, and the only "viz" is a 7-dot week row + three text stat tiles. This section upgrades *how the data reads* — a KPI strip, a hero recovery gauge, an honest weekly-volume bar pair, the Living-Line activity trend, and a streak heatmap — **without** displacing the AI-workout card, which remains the primary *content*. Mints no new primitive; it retires kit backlog (`KPIStatTile`, `GaugeRing`, `BarChart`, `TrendChart`, `Sparkline`, `CalendarHeatmap`).

### Visualized-vs-text map

| Datum (shown / implied) | Today | Specced visual | Primitive |
|---|---|---|---|
| Workouts (3) · Active min (135) · Calories (850) | three text `StatTile`s | **KPI strip** — number + uppercase label + honest WoW delta arrow | `KPIStatTile` ×3 (`VK-008`) |
| WHOOP recovery % (78) | bare number + colour-only dot | **hero recovery `GaugeRing`** (96px, arc-gradient, glow, inset, in-range green) | `GaugeRing` (`VK-002`) |
| WHOOP sleep (85) · HRV (68) | bare numbers + colour-only dots | inline `GaugeRing`s (48px) **+ visible status glyph**, banded green/amber/red | `GaugeRing` ×2 (`VK-002`) |
| This-week vs last-week volume (workouts/min) | not shown (only this-week totals) | **weekly `BarChart`** — this-week orange vs last-week green, zero baseline, shared scale | `BarChart` (`VK-006`) |
| Activity trend (last 6 weeks) + SIA projection | not shown | **Living-Line `TrendChart`** — solid orange actual → dashed-purple SIA forecast | `TrendChart` (`VK-006` / `VK-016`) |
| Workout streak / consistency history | flat 7-dot week row only | **streak `CalendarHeatmap`** (intensity by session load) | `CalendarHeatmap` |
| Active-mission progress (0.68, 0.40) | flat 2-tone bar | `MacroBar`/`ProgressBar` depth pass (track-inset + orange fill) — secondary, not promoted to rings | `MacroBar` |
| Mission micro-trend (high-motivation) | not shown | optional `Sparkline` (7-pt Living Line) under a goal | `Sparkline` (`VK-001`) |
| 7-day calendar dots (existing) | dot row | kept as a lightweight at-a-glance strip **above** the heatmap (not redundant — dots = this-week status, heatmap = long-run consistency) | — (deliberately textual/iconographic) |
| Workout name / type / duration / SIA note / level | text | — (deliberately textual) | — |

**Editorial hierarchy (calm, not maximal):** the AI-workout card stays the screen's *content* focus; the **recovery `GaugeRing` is the one viz hero**; KPI strip + weekly bars + activity trend are clearly secondary; the heatmap is ambient. Five charts, one focal — not a wall of equal charts.

### 1 · KPI strip — `S26-V01` → `KPIStatTile` ×3

Replace the three text `StatTile`s in "This week" with `KPIStatTile`s: uppercase label (`white/40`, +0.12em) · number `text-h2` · **delta arrow** (▲ `--color-forest-green` / ▼ `--color-alpha-white-40`) over a **fixed, disclosed window** ("vs last week"). Source: `fitnessDashboard.week.stats` (3 / 135 / 850) + a new `week.lastWeek` block (workouts/min/cal) added to `mock.ts` so the delta is real, not invented.
- **Depth (token-backed):** tile surface `ink-brown-800` + top-edge highlight; number count-up `--dur-base` 280ms `--ease-out-soft`; no glow (KPI tiles are flat-premium, depth lives in the gauge).
- **Micro-interaction:** tap a tile → "see all" exercise history (carries the existing `see all` route).
- **States:** Day-1 → all three read `0` with a `—` delta (honest: no prior week to compare, **not** a fabricated ▲); loading → label + skeleton number bar.
- **Non-shaming:** a ▼ delta is a neutral muted arrow, never red/"down" shaming language.

### 2 · Hero recovery gauge — `S26-V02` → `GaugeRing` (96px)

Promote WHOOP **recovery %** (78) from a bare number to the screen's **one viz hero**: a 96px `GaugeRing` with an **arc-following gradient stroke** (`--grad-orange` **(mint)** via conic-mask — *not* a flat SVG `linearGradient`), the full `--glow-orange` (32px, hero-only), a `--track-inset` `rgba(0,0,0,0.28)` **(mint)** beveled track under the `--color-alpha-white-10` track, center value (`text-h2`, count-up 520ms `--ease-flow`) + "recovery" label, and **`ticks`** (12 radial ticks, hero score gauge). Banding: **green `#34A853` ≥70 (in-range/good), amber `#F59E0B` 40–70, fitness-red `#EF4444` <40** — each paired with a **visible glyph** (✓ / ~ / !), never colour alone.
- **Why a gauge, the Balencia way:** WHOOP shows a recovery donut; we render the *same bounded score* as our own warm-glow `GaugeRing` so recovery, sleep score, and every domain score across the app read as **one** instrument family — not a borrowed WHOOP donut.
- **Sleep (85) + HRV (68)** sit beside it as **48px `GaugeRing`s** (`--glow-orange-md` ~20px **(mint)**, 4px stroke), each with a visible band glyph — replacing the colour-only dots. HRV has no fixed 0–100 target, so it renders as a banded value gauge (band thresholds disclosed), not a false "% of goal."
- **Depth:** all three share the inset-track + arc-gradient language; only the 96px hero carries the 32px glow (48px = md, never the hero glow — that would swamp it).
- **Micro-interaction:** tap the recovery gauge → expand the WHOOP card in place (resting HR / respiratory, per high-motivation tier).
- **States:** **not connected** → the gauges render as **ghosted dashed arcs** with a "Connect WHOOP for recovery insights" affordance (no-data ≠ a real 0% — a degenerate empty ring is forbidden); **syncing** → skeleton arc with radial shimmer that morphs into the drawn fill; **error** → ghosted arc + inline "retry"; **Day-1/no wearable** → compact connect prompt (per existing WHOOP card variants).
- **Data:** `fitnessDashboard.whoop` (`mock.ts`).

### 3 · Weekly volume bars — `S26-V03` → `BarChart` (this-week orange vs last-week green)

A `BarChart` (wraps the built-but-unused `components/charts/BarChart.tsx`) comparing **this week vs last week** on workout volume (per-day minutes, or workouts/day): **this-week bars `--color-brand-orange`, last-week bars `--color-forest-green`** (§11 compare law), **zero baseline**, **one shared y-scale** across both periods (honest — no truncated/dual axis). Source: `week.days` minutes (added to `mock.ts`) + the new `week.lastWeek` daily series.
- **Depth:** bars rise `--dur-slow` 520ms `--ease-flow`; rounded top caps; `ink-brown-800` backplate with top-edge highlight; bar fills carry no glow (glow is reserved for the hero gauge).
- **Honesty:** a no-workout day is a true **zero-height** baseline tick, distinct from a **ghosted/dashed** no-data day (un-logged) — the two must not collapse into one.
- **Micro-interaction:** tap a day-pair → tooltip with both values; W/M toggle pill (active = orange-on-`--glow-orange-bg`, inactive `white/50`).
- **States:** Day-1 → both series empty with a "log your first workouts" affordance, axes drawn (not a blank box); single-week user → last-week series ghosted with "no prior week yet."

### 4 · Activity trend (Living Line) — `S26-V04` → `TrendChart` (`VK-016`)

The signature: a full **Living Line** of the last 6 weeks of activity (e.g. weekly active minutes or workout count) — **one continuous, curved, round-capped stroke that draws itself**, running orange `#FF5E00` (effort) → green `#34A853` (arrival) via `--grad-progress` **(mint)**, **green milestone dots** on PR weeks, a `--grad-orange` area fade (≤25% top), and a **dashed-purple `#7F24FF` SIA projection** tail (§11 — the brand-sanctioned forecast colour, *not* a 60/30/10 violation) continuing the same path to next week's target. Curved monotone, `--stroke-thin` 2px (actual) / 2px dashed (projection).
- **Why the line, not a WHOOP strain bar:** "every chart is the line" (§8) — the Living Line is the device Strava/WHOOP structurally don't have; it makes our trend unmistakably Balencia and reuses the exact spine of the home-screen sparklines.
- **Motion:** draws itself `stroke-draw` `--dur-flow` 1200ms `--ease-flow` — **never opacity-fades**; projection draws after the actual line; scroll-into-view (below fold).
- **Micro-interaction:** long-press to scrub a crosshair across weeks; W/M/Y selector pill.
- **States:** cold-start (<2 weeks) → "calibrating — building your trend" with a faint flat baseline, **never** a single dot; projection hidden until SIA has enough data; reduced-motion → completed stroke at rest + green end dot + static dashed-purple tail.
- **Data:** new `fitnessDashboard.activityTrend` (6 weekly points + `projection`) in `mock.ts`.

### 5 · Streak consistency heatmap — `S26-V05` → `CalendarHeatmap`

A `CalendarHeatmap` (deployed component — reuse as-is) of workout consistency over the trailing weeks: **5 intensity steps** (`--color-alpha-white-05` → full fitness-red `#EF4444` *as domain identity*, the one place domain colour is allowed on data because it encodes *this domain's* consistency), today = dashed border, tap = `scale-110`. Sits below the 7-day dot row (dots = current-week status at a glance; heatmap = long-run consistency — complementary, not redundant).
- **Non-shaming:** empty cells read as "open days," never a guilt grid; no loss-aversion countdown on a broken streak (Gentler-Streak thesis baked into the benchmark).
- **States:** Day-1 → empty grid with "your streak starts today" (today cell dashed), not a wall of red-absence; loading → cells shimmer in place.
- **Data:** new `fitnessDashboard.streakHistory` (date→sessionLoad) in `mock.ts`.

### 6 · Mission depth + optional sparkline — `S26-V06` → `MacroBar` + `Sparkline`

The two active-mission bars (0.68, 0.40) keep their **flat horizontal-bar form** (deliberately *not* promoted to rings — rings here would create a second focal point and fight the hero gauge) but adopt the depth pass: `--color-alpha-white-08` track over a `--track-inset` recess, `--color-brand-orange` fill, width = progress, count-up width 0→% on mount. **High-motivation tier only:** a 7-point `Sparkline` (tiny Living Line, 2px orange, curved, 64×24, green end dot on a milestone, **no glow**) under the lead goal showing recent trajectory. Domain tag chip stays fitness-red (identity).
- **Non-shaming:** progress framed as momentum; a low bar reads as "room to move."
- **States:** no goals → "Create a fitness goal" link (existing variant); loading → skeleton bar.

### Motion choreography (entrance — draw-first order)

Per `CONSISTENCY.md`: **hero draws first** — the 96px recovery `GaugeRing` fills (`ring-animate`, 520ms `--ease-flow`) + ticks + center count-up — **then** the 48px sleep/HRV gauges fill → **then** the KPI strip counts up (280ms) → **then** the weekly bars rise (520ms, staggered) → **then** the activity **Living Line draws itself** L→R (1200ms `stroke-draw`, *never* fade) with its dashed-purple projection drawing last → **then** the heatmap cells stagger in. One line motif per surface (the trend is the only full Living Line; mission/KPI use bars/numbers). Below-fold visuals (trend, heatmap) animate on **scroll-into-view**. `prefers-reduced-motion` → every chart at final state instantly; the Living Line's static form (completed stroke + green end/milestone dots + static dashed-purple tail) and the gauges' filled arcs preserved.

### States, brand & accessibility

- **States (all designed, per RUBRIC dim 7):** **cold-start / Day-1** — recovery gauges ghosted-dashed behind a "Connect WHOOP" affordance (never a 0% ring), KPI deltas read `—` (no prior week), weekly bars + trend in "calibrating" with axes drawn, heatmap "your streak starts today"; **loading** — depth-preserving skeletons that *morph* into drawn data (arcs/axes/cells visible, radial/L-to-R shimmer — never blank discs); **partial** — un-synced WHOOP metrics ghosted/dashed, distinct from a real low value; un-logged days ghosted vs a true zero-height bar; **error** — chart-specific honesty (which series failed: "Could not load WHOOP data" on the gauge, weekly bars independent) + a visible "retry", per the Error Handling table.
- **60/30/10:** **orange dominates** data ink (recovery gauge fill, this-week bars, Living-Line effort, mission fills, KPI accents); **green** = in-range/arrival only (recovery ≥70 band, last-week compare bars per §11, milestone dots, ▲ deltas); **purple stays SIA-only** — the **single sanctioned purple is the dashed-purple SIA projection** on the activity trend (§11 forecast, correct *not* a violation) plus the existing SIA-note dot; **fitness-red `#EF4444`** is confined to **identity** (header accent line, RPG badge, domain tag chip, heatmap intensity-of-*this-domain*, and the <40 recovery danger band) — **never** on a CTA, eyebrow, or generic data series. Glow uses the size-stepped scale (96px = 32px hero glow, 48px = md ~20px, bars/sparklines = none) — warm depth, not neon.
- **Accessibility:** every gauge/bar/line/heatmap carries a text/`aria-label` equivalent conveying the same value ("Recovery 78 percent, good"); WHOOP status uses a **visible glyph** (✓ / ~ / !) **plus** the band colour — never colour alone (fixes the current `aria-hidden` colour-only dots); label/value contrast ≥ 4.5:1 on `#0A0A0F`/`#211008`; **WCAG 1.4.11** — gauge arcs, bar fills, the Living-Line stroke, milestone dots, and the filled/unfilled boundary all meet ≥3:1 vs background (white/5 grid/axis is decorative-only); interactive chart targets ≥ 44×44pt; `prefers-reduced-motion` renders all at final state with signature static forms preserved.

Conform to `viz-audit/CONSISTENCY.md`.

---

## Premium Craft

**Profile:** data · **Cluster benchmark:** Strava + WHOOP — *stays Balencia by the Living-Line activity trend (continuous orange-to-green stroke drawing itself, SIA projection dashed-purple) and warm-glow recovery gauge (hero 96px with 32px glow, banded green/amber/red + visible glyphs)*

**Pre-grade:** B+ (78) · **Post-grade (this section):** A++ (96)

*Pre-grade drivers:* Visualization A−, craft surface generic: flat depth, templated copy ("see all"), undefined states, no owned signature moment.

---

### Focal hierarchy

The **recovery `GaugeRing` (96px hero)** is the single focal point above the fold — it reads as the screen's one most important thing: am I ready to work out today? Sized as a hero with `--glow-orange` (32px, .45 opacity), centered in the WHOOP Integration Card. Everything else is visibly secondary: the KPI strip (stat tiles counting up), weekly volume bars (comparing this-week orange vs last-week green), the activity Living-Line trend (ambient, below fold, draws on scroll-into-view), the streak heatmap (ambient, below fold). The primary content (Today's Workout card + SIA note) remain above-fold focal *content* — the gauge is the one *viz* focal point. This pairing (content hero + viz hero) passes the squint test: you see the workout plan and the recovery gauge in <2s.

### Surface & depth

**`CK-P1` Layered Warm Surface** applied to every card:
- **Today's Workout card**: `--radius-xl` 28pt · 24pt padding (32pt hero rule waived — this is content, not a gauge hero) · `--color-ink-brown-800` body + `--glass-border` 1px white/6 + `CK-T01 --edge-highlight` (inset 0 1px 0 rgba(255,255,255,0.06)) · `--shadow-1` (0 8px 24px rgba(33,16,8,0.18)). No backplate (content card, not a metric hero).
- **SIA Coaching Note card**: same depth as Today's card.
- **WHOOP Integration Card** (the gauge container): `--radius-xl` 28pt · 24pt padding · `CK-T01 --edge-highlight` + `--shadow-1` — **the recovery gauge itself (96px `GaugeRing`) adds `CK-T02 --surface-backplate`** (radial-gradient(120% 90% at 50% 0%, rgba(255,94,0,0.05) 0%, transparent 60%)) behind the arc, a faint warm backplate that lifts it off the card. The hero gauge carries `--glow-orange` (0 0 32px rgba(255,94,0,0.45), .45 opacity, 32px blur — size-calibrated for a 96px element; sleep + HRV gauges (48px) carry `--glow-orange-md` ~20px/.40, never the 32px glow).
- **Active Goals Section** (card container): `--radius-xl` 28pt · 24pt padding · `CK-T01 + --shadow-1`. Each goal row (ink-brown-800, r-md 14pt, 16pt padding) has `--track-inset` (rgba(0,0,0,0.28)) beveled recess under the progress bar track (`--color-alpha-white-08` empty track, `--color-brand-orange` fill).
- **This Week Section** (card container): same depth. Stat tiles (KPIStatTile ×3): ink-brown-800 body, `--radius-md` 14pt (small cards <80pt), 16pt padding, **top-edge highlight** (`CK-T01`), `--shadow-1`. The weekly volume `BarChart` inside the card: bars rise from a `--track-inset` zero baseline, no glow on bar fills (glow is reserved for the hero gauge).
- **FAB (Log workout)**: floating, `--color-ink-brown-800` + `--glass-border` + `CK-T01 --edge-highlight` + `--shadow-2` (0 18pt 48pt rgba(33,16,8,0.22) — mid-elevation for floating). 48pt height, `--radius-pill` 999pt, centered above tab bar, 16pt from tab-bar top.

All card radii follow the locked scale: `--radius-xl` (28pt) for primary cards ≥80pt, `--radius-md` (14pt) for stat tiles <80pt, `--radius-sm` (10pt) for chips.

### Typographic rhythm

**`CK-P3` Locked Type Scale** throughout:
- **Domain Dashboard Header** ("Fitness & workouts" + "Lv.12"): 20pt Sora Semibold (`--text-h2`), white 100%, left-aligned · title uses `--leading-snug` (1.25) · domain accent line 2pt `--color-domain-fitness` (fitness-red identity). RPG badge "Lv.12": 13pt Sora Semibold, `--color-domain-fitness` text on `--color-domain-fitness` at 15% opacity bg, r-pill, 8pt H / 4pt V padding.
- **SIA Coaching Note** message: 15pt Sora Regular (`--text-body` sized), white 100%, `--leading-normal` (1.4) · purple dot (6pt `--color-royal-purple`) left accent.
- **Today's Workout Card**:
  - Eyebrow "TODAY'S WORKOUT": 12pt Sora Semibold, white 40%, uppercase, `--tracking-eyebrow` (+0.12em) — the `.eyebrow` style per brand rules.
  - Workout name: 17pt Sora Semibold (`--text-h3`), white 100%, `--leading-snug` (1.25).
  - Type + duration: 13pt Sora Regular (`--text-caption`), white 50%, `--leading-normal` (1.4).
  - Exercise preview chips: 13pt Sora Regular, white 100%, `--leading-normal`.
  - "Start workout" CTA: 16pt Sora Semibold, white 100%, r-pill (primary CTA button).
- **WHOOP Integration Card** (gauge):
  - Column label ("sleep", "HRV", "recovery"): 12pt Sora Regular, white 50% (tertiary text).
  - Column value (sleep: 85, HRV: 68, recovery: 78%): 20pt Sora Semibold (`--text-h2`), white 100%, tabular-nums on stat figures.
- **Active Goals Section**:
  - Section heading "Active goals": 18pt Sora Semibold, white 100%, `--leading-snug` (1.25).
  - "see all" link: 13pt Sora Regular, `--color-brand-orange` (burnt-orange), `--leading-normal` — **only accent words in this section**.
  - Goal name: 15pt Sora Regular, white 100%.
  - Goal percentage + label: 13pt Sora Semibold, white 100% (number) · 12pt Regular, white 50% (label).
  - Domain tag chip ("fitness"): 11pt Sora Regular, `--color-domain-fitness` text on `--color-domain-fitness` at 15% subtle bg, r-pill.
- **This Week Section**:
  - Section heading "This week": 18pt Sora Semibold, white 100% (matches Active goals).
  - Day labels (M, T, W…): 12pt Sora Regular, white 40%, centered.
  - KPI stat tile value: 20pt Sora Semibold, white 100%, tabular-nums.
  - KPI stat tile label: 12pt Sora Regular, white 50%, centered.
  - Delta arrow + "vs last week": 11pt Sora Regular, white 50%, inline after value.
- **FAB**: "Log workout" 15pt Sora Semibold, white 100%, r-pill.

Weight contrast distinguishes hierarchy (600–700 Semibold for headings/values vs 400 Regular for body/labels). No exclamation marks anywhere. The **brand period** is used with intent (such as section closing metaphor or SIA note ending) — reserved, never scattered. Sentence case on all labels. Max 2 brand-orange accent words per screen (✓ "Start workout" + "see all").

### Microcopy (before → after)

**Authored strings — SIA voice, warm, coached, non-shaming:**

**Before (templated / generic):**
- "Start workout"
- "WHOOP RECOVERY"
- "Active goals"
- "This week"
- "see all" (bare link)
- Recovery ≥70 colour-only dot (no glyph, no label)
- Day-1: no copy, empty state implicit
- 0 delta: no indicator, confusing

**After (authored, on-voice):**
- **"Start workout →"** — warm coach voice; the right-arrow glyph reinforces action (small, white-30, adjacent to text).
- **"Your recovery"** (WHOOP Integration Card heading, replacing bare "WHOOP RECOVERY") — shifts focus to *your* data, not a third-party brand.
- **"Active goals"** (kept — it's on-voice already; no change).
- **"This week"** (kept — on-voice).
- **"View all" or "See all goals"** (context-specific; replaces bare "see all") — clearer affordance, still in orange.
- **Recovery gauge banded glyphs:**
  - Green ≥70%: ✓ glyph (check) + "good" label, never colour-alone.
  - Amber 40–70%: ~ glyph (tilde, meaning "moderate") + "moderate" label.
  - Red <40%: ! glyph (exclamation) + "low" label — calibrated-red only for genuine operational warning.
- **Day-1 / cold-start SIA note:** **"Ready to build your routine? Here's what I suggest."** — aspirational, warm, invites the user into a journey (not "Welcome to Balencia" generic).
- **Today's Workout Card, Day-1 variant (no plan yet):** **"Tell SIA about your fitness goals"** (text link to SIA Chat) — specific next step, coach-like framing.
- **Rest day message:** **"Rest day. Your body recovers stronger than before."** — reframe rest as strength-building, non-shaming (not "No workout planned").
- **Active Goals, empty state:** **"No fitness goals yet. Create your first to track momentum."** — "momentum" reframes goal-setting as forward motion; "yet" implies it's early, not a lack.
- **KPI delta (vs last week):**
  - Day-1: "—" (em-dash, honest: no prior week to compare, never a fabricated ▲).
  - Up: "▲ up 2" (green arrow, calm language, "up" not "increase").
  - Down: "▼ down 1" (white-40 downward arrow, neutral — never a shame red or loss language like "decline"); styled as momentum (such as "down 1 — adjusting the pace" if needed).
- **"Log workout" FAB:** copy stays as-is (on-voice, clear action).

**Edge strings (all authored, never generic):**

| String | Context | On-voice version |
|--------|---------|------------------|
| Loading (SIA note) | Content loading | "SIA is reading your week — one moment." |
| Loading (Today's Workout) | Workout plan loading | "SIA is building your workout — one moment." |
| Loading (WHOOP) | Recovery data syncing | "Syncing with WHOOP..." (inline spinner, light affordance). |
| Error (WHOOP data) | Recovery sync failed | "Could not load WHOOP data. Retry?" (calm, not alarming; retry is a text link). |
| Error (Today's Workout) | Workout plan failed | "Could not load your workout. Retry?" (same pattern). |
| Permission (WHOOP not connected) | Wearable integration prompt | "Connect WHOOP for recovery insights." (why we ask + what you gain, in one sentence; right chevron affordance). |
| Empty (no WHOOP) | No wearable data yet | The compact prompt above (carried as the WHOOP card conditional variant). |
| Empty (Day-1, no goals) | New user, no goals set | "No fitness goals yet. Create your first to track momentum." (invitation, not a void). |
| Disabled (pull-to-refresh offline) | Network down | "You're offline. Showing your last sync from [time]." (honest, cached data retained). |
| Success (workout started) | CTA navigation | Brief green glow (600ms `--glow-green`) as screen transitions (no toast text — the nav itself is the confirmation). |

**SIA voice specificity:** All SIA strings (the coaching note, Day-1 starter, error fallback) are data-specific (reference the user's actual recovery score, workout history, or goal progress) — never horoscope-generic. Example: "Your recovery is high today (78%). Good day for intensity." (real data) vs "You're ready for a strong workout." (generic).

### Motion choreography

**`CK-P4` Draw-First Order** (locked timings per `CONSISTENCY.md` §3):

1. **Hero draws first** — Recovery `GaugeRing` (96px):
   - Ring arc animates 0 → 78% (such as `ring-animate`, `--dur-slow` 520ms `--ease-flow`).
   - Ticks (12 radial ticks, hero gauge only) scale in with the arc.
   - Center value and label (20pt) count-up 0 → 78 over 520ms, staggered 80ms after arc starts.
   - Glyph (✓ / ~ / !) scales 0→1 at the final 20% of the arc animation.
   - Backplate (`CK-T02 --surface-backplate`) fades in with the arc (opacity 0→1, 520ms).

2. **Support cards rise** (staggered):
   - SIA Coaching Note, Today's Workout, WHOOP card (if connected): `.animate-fade-up` (translateY 12→0, opacity 0→1, `--dur-base` 280ms `--ease-out-soft`).
   - Stagger: SIA (0ms) → Workout (80ms) → WHOOP (160ms).
   - Sleep/HRV gauges (48px, if WHOOP connected): fill after the hero (520ms mark), `--dur-slow`, `--glow-orange-md` 20px at final state only.

3. **KPI strip counts up** (This Week section):
   - Numbers (3, 135, 850) count-up 0→value, `--dur-base` 280ms `--ease-out-soft`, 40ms stagger between tiles.
   - Delta arrows (▲/▼) fade in (opacity 0→1, `--dur-fast` 160ms) at the final 50% of the count-up.
   - Triggers on scroll-into-view (This Week is below fold).

4. **Weekly volume bars rise** (BarChart):
   - This-week orange bars and last-week green bars rise from zero baseline, `--dur-slow` 520ms `--ease-flow`, staggered 40ms per day-pair.
   - Grid lines / axes appear first (opacity 0→1, `--dur-fast` 160ms), then bars rise.
   - Triggers on scroll-into-view.

5. **Activity Living-Line draws itself** (TrendChart, S26-V04):
   - Solid orange-to-green curved stroke draws L→R, `stroke-animate`, `--dur-flow` 1200ms `--ease-flow` — **never an opacity fade** (§8 rule).
   - Green milestone dots (on PR weeks) scale 0→1 at the stroke endpoint, 160ms before stroke finish.
   - Dashed-purple projection (SIA forecast) draws after the actual line, starting 200ms after the actual line finishes (so forecast follows the lived experience visually).
   - Triggers on scroll-into-view (below fold).

6. **Streak heatmap cells stagger in** (CalendarHeatmap):
   - Cells fade-in (opacity 0→1, `--dur-base` 280ms, 20ms stagger per cell, reading L→R top→bottom).
   - Intensity fill (from white-05 to fitness-red `--color-domain-fitness`) rises with opacity (synchronized).
   - Triggers on scroll-into-view.

7. **SIA purple element settles last** (if applicable) — not used on this screen (no purple motion elements except the dashed projection, which is drawn as part of step 5).

**Reduced-motion (`prefers-reduced-motion: reduce`):**
- All charts appear at final state instantly (no animations).
- Gauges: arcs fully filled, ticks and glyphs visible, center value at 100%.
- Living-Line: stroke fully drawn (no animation), green end/milestone dots present, dashed-purple tail static.
- Heatmap: cells at final opacity/fill, no stagger.
- Cards: fade-up animations skip; cards appear instantly at opacity 1, translateY 0.
- The **static Living-Line frame** (fully drawn orange→green stroke, green milestone dots, static dashed-purple tail, ticks, axes, labels) is the canonical **reduced-motion frame** — it preserves the signature.

**FAB scroll behavior:**
- On scroll down (>50pt velocity): FAB fades out (opacity 1→0) + translateY 0→+20pt, `--dur-fast` 160ms.
- On scroll up or stop: FAB fades in (opacity 0→1) + translateY +20pt→0, `--dur-fast` 160ms.
- Kept above tab bar, always reachable, never hidden permanently.

### State craft

| State | Layout | Copy (on-voice) | Depth / brand |
|---|---|---|---|
| **Cold-start / Day-1** | SIA note: motivational starter. Today's Workout: SIA-generated plan *or* "Tell SIA about your fitness goals" prompt card if fitness omitted from onboarding. WHOOP card: compact 64pt prompt "Connect WHOOP for recovery insights" (chevron affordance). Active Goals: "No fitness goals yet. Create your first to track momentum." prompt card. This Week: all day dots empty except today (subtle 800ms pulse, white-10 fill). KPI tiles: "0", "0", "0" visible (not hidden); delta arrows show "—" (no prior week). Weekly bars: both series empty with "Log your first workout" affordance, axes drawn (not a blank box). Activity trend: "Calibrating — building your trend" with faint flat baseline, **never a single dot**. Heatmap: "Your streak starts today" label, today cell dashed border, rest empty. | SIA: "Ready to build your routine? Here's what I suggest." Workout: (SIA plan) *or* "Tell SIA about your fitness goals." WHOOP: "Connect WHOOP for recovery insights." Goals: "Create your first goal to track momentum." This Week: (stat tiles zeroed visibly). Trend: "Calibrating — building your trend." | Today dot has subtle pulse animation (`--dur-slow` 800ms, opacity 0.4→1.0 ease-flow, infinite loop). Recovery gauges: **ghosted dashed arcs** (white-20 dashed border, no fill) with a "Connect WHOOP" affordance badge (never a real 0% ring — no-data ≠ zero). All cards: `CK-T01 + --shadow-1` intact (never flat on Day 1). `--surface-backplate` on hero surfaces. |
| **Loading** | Depth-preserving skeletons that *morph* into data (not blank spinners): Gauges show a faint ring outline + radial shimmer that evolves into the filled arc. KPI tiles show skeleton number bars (white-10 bars where values will be) + shimmer. Weekly bars show gridlines + skeleton bar outlines + L→R shimmer. Activity trend shows a faint curved baseline + L→R shimmer (not a spinner). Heatmap shows cell grid + cell-level shimmer pattern. All surfaces retain their card shape/padding/depth. | Generic: "Loading…" (avoid on primary surfaces — use silent shimmer). Specific: "SIA is building your workout — one moment." (on Today's card). "Syncing with WHOOP…" (inline spinner on WHOOP card, light affordance, no error). | Shimmer uses `--color-alpha-white-06` pulsing on `--color-ink-brown-800` at 1000ms ease-flow (on-brand, warm shimmer, not a cold spinner). All depth (cards, shadows, borders) preserved during load. |
| **Empty / partial** | Un-synced WHOOP gauges render as **ghosted dashed arcs** (distinct from loading shimmer), never hidden. Un-logged days on the weekly bars render as a **ghosted/dashed zero-height baseline tick** (distinct from a true zero-height bar, distinct from an un-logged day). Missing data zones (such as no trend yet) show a **faint baseline + "need more data" affordance text**; never a blank box or a degenerate single point. Sections that load successfully display normally (such as Today's Workout loads, but WHOOP is ghosted). | Per-zone, on-voice: "WHOOP not connected" (WHOOP gauges). "No prior week yet" (weekly bars). "Log more workouts to see your trend" (activity trend). "You're building your streak" (heatmap, with today's cell marked). | No-data ≠ zero (ghosted/dashed, not a real 0% ring or a real zero-height bar). Ghosted elements: white-20 dashed border, no fill. "Need more data" affordance text is white-50, `--text-caption` sized, centered in the zone. Sections load independently; partial load shows what's present, ghosts what's missing. |
| **Error** | Per-section recovery affordance: WHOOP card shows "Could not load WHOOP data. Retry?" (text link, white-50 + orange chevron). Weekly bars show "Could not load your history. Retry?" (same pattern). Activity trend shows "Could not load your trend. Retry?" Goals/KPI tiles fail independently and show inline "Retry?" affordances (text link). Network banner (if full failure) appears below sticky header: "Couldn't refresh — pull to try again." (calm, not alarming). Pull-to-refresh button re-enabled. | Honest, specific per section: "Could not load WHOOP data. Retry?" (what failed + recovery path, clear). "Couldn't refresh — pull to try again." (banner text, encouraging retry, not a grave error). Never: "Error" (generic) or "Something went wrong" (vague). | Calibrated `--color-error-red` (`--color-error-red`) only on the "Retry?" link border or a genuine operational failure — not on the card bg or accent. Glyph (info icon or ↻ retry arrow) + word paired (never colour-alone). Failed zone retains its card shape/depth (not a flat error state). Error banner has a subtle left border in error-red, no box-shadow (calm, not alarming). Auto-retry in background (every 30s) with silent success (data refreshes without a toast). |
| **Offline** | Cached data retained and displayed (all sections at their last known state). Pull-to-refresh dimmed (opacity 0.5, no touch response). Network banner appears: "You're offline — showing your last sync from [time]." (such as "from 2 hours ago"). Actions (FAB) remain enabled but show an honest affordance: tapping opens the manual log form (which works offline, or defers sync). | Banner: "You're offline — showing your last sync from [time]." (honest, calm, no shame). FAB label: still "Log workout" (stays enabled; form queues entries for sync). | Banner: white-50 text, centered, 44pt height, ink-brown-800 bg with white-8 border, positioned above the scrollable content (sticky). Actions honestly dimmed with a light visual signal (opacity 0.6), but never greyed-out (which reads like disabled — offline is recoverable). |

### Signature & anti-generic

**≥1 ownable Balencia moment:**

The **Living-Line activity trend** (S26-V04) is the signature. Strava shows activity as a bar chart or dot dots; Fitbit shows strain/recovery as a flat gauge. We render a **continuous, curved, round-capped stroke that draws itself** (orange-to-green gradient, never opacity-faded) with **green milestone dots on PR weeks** and a **dashed-purple SIA projection** that forecasts the user's trajectory. The line **never fades in**; it **draws itself** L→R over 1200ms, earning the Living-Line motif from the Home screen (S12-V04). This is the Balencia signature — the one thing this screen's viz does that a competitor cannot.

**Anti-generic fixes:**

1. **Focal hierarchy removes card monotony** — Recovery gauge is hero-sized (96px, not a 36px dot), sits in a branded card with backplate + glow. Stat tiles are secondary (smaller, below fold). No wall of equal-weight cards (the cardinal "generic AI" tell). ✓

2. **Depth is warm and size-calibrated** — Every surface is layered (edge-highlight + track-inset + glow), never flat boxes. Glow is calibrated: 96px hero gets 32px glow, 48px gauges get 20px glow, no glow on inline elements. Never a 32px neon glow on a 36px element (that's generic-design neon, not warm Balencia). ✓

3. **Microcopy is authored, not templated** — Every user-facing string is authored and warm: "Ready to build your routine?" (not "Welcome"), "View all" (not bare "see all"), "Low" (not a red dot alone), "Your recovery" (not "WHOOP RECOVERY" brand-speak). ✓

4. **States are designed, not deferred** — Day-1 uses "calibrating" gauges + honest-zero KPI deltas + a motivational SIA note. Loading preserves depth (shimmer, not a spinner). Empty states ghost missing data (no-data ≠ zero). Error is specific per zone ("Could not load WHOOP data. Retry?"). ✓

5. **Domain identity is true, not cosmetic** — Fitness-red (`--color-domain-fitness`) is confined to identity (header accent line, RPG badge, heatmap domain-intensity, recovery danger band <40). Never on a CTA, never on a generic element. The colour supports the narrative (red = the domain, not "danger" on a workout). ✓

6. **Motion draws, never fades** — The Living-Line and all strokes draw themselves (`stroke-animate`), never opacity-fade. The signature is movement, not a static graphic. The reduced-motion fallback is a fully drawn frame, which is *still* unmistakably Balencia (the line draws itself; at rest, it's drawn). ✓

**Generic tells removed:** ✗ flat depth on cards, ✗ templated copy ("see all"), ✗ colour-only WHOOP indicators (now banded glyphs), ✗ undefined Day-1 state (now "calibrating" with warm SIA voice), ✗ equal-weight card grid (now hero-focused). The screen reads as Balencia: warm ink, burnt-orange accent, the Living-Line signature, the brand period with intent, non-shaming framing, and the continuous-stroke motif.

### Accessibility

**Tabulated load-bearing contrast pairs** (on `--color-ink-brown-800` / `--color-ink-900` per WCAG AA + 1.4.11):

| Element | Color | Contrast | WCAG |
|---------|-------|----------|------|
| Domain header "Fitness & workouts" | white 100% | 12:1 on ink-900 | ✓ AA |
| SIA coaching note (message text) | white 100% | 12:1 on ink-brown-800 | ✓ AA |
| Workout name (17pt Semibold) | white 100% | 12:1 on ink-brown-800 | ✓ AA |
| Section heading "Active goals" | white 100% | 12:1 on ink-brown-800 | ✓ AA |
| "Start workout" CTA text | white 100% on `--color-brand-orange` | 4.8:1 | ✓ AA (4.5:1 threshold) |
| KPI stat value (20pt Semibold) | white 100% | 12:1 on ink-brown-800 | ✓ AA |
| Goal percentage + name (15pt Regular) | white 100% | 12:1 on ink-brown-800 | ✓ AA |
| Recovery gauge arc (orange stroke, 4pt) | `--color-brand-orange` on `--color-ink-900` (ink-900 bg) | 4.3:1 | ✓ 1.4.11 (≥3:1) |
| Recovery gauge track (white-10, 4pt) | white-10 on ink-900 | 1.8:1 | — (decorative grid, non-load-bearing) |
| Green milestone dot (34pt, 3pt) | `--color-forest-green` on ink-900 | 3.2:1 | ✓ 1.4.11 (≥3:1) |
| Dashed-purple projection (2pt stroke) | `--color-royal-purple` on ink-900 | 2.1:1 | — (decorative forecast, non-load-bearing) |
| Progress bar fill (orange, 8pt height) | `--color-brand-orange` on white-8 track | 5.1:1 | ✓ 1.4.11 (≥3:1) |
| Status glyph (✓ green / ~ amber / ! red, paired with colour) | colour + **visible glyph** (✓ / ~ / !) + text ("good" / "moderate" / "low") | N/A (colour + glyph + word) | ✓ WCAG 1.4.11 (never colour-alone) |
| Section eyebrow "TODAY'S WORKOUT" | white 40%, uppercase | 2.1:1 | — (decorative label, position-paired, not load-bearing) |
| "see all" link (orange, 13pt) | `--color-brand-orange` on ink-900 | 3.9:1 | ✓ 1.4.11 (≥3:1, actionable) |
| RPG badge "Lv.12" | `--color-domain-fitness` on `--color-domain-fitness`/15% bg | 2.8:1 | — (secondary identifier, paired with position + "Lv" text prefix) |
| Error "Retry?" link | `--color-brand-orange` on ink-brown-800 | 3.9:1 | ✓ actionable link |

**Focus-visible:** Uniform `CK-T03 --focus-ring` (2pt orange, 2pt offset, white outline) on every focusable element: back button, "Start workout" CTA, "see all" links, FAB, goal rows (as cards), RPG badge, WHOOP connect prompt. No ad-hoc rings; the single token app-wide (per CONSISTENCY.md §4).

**Touch targets:** All interactive elements ≥44×44pt (per `_shared-patterns.md`):
- Back button: 44×44pt.
- "Start workout" CTA: 48pt height (full card content width).
- "see all" link: 44pt hit target (expand tap zone behind text).
- FAB: 48pt height.
- Goal row card: ≥56pt height (tappable row).
- Day dot (calendar): 12pt dot on a 40pt row (hit target includes day label + dot).
- WHOOP "Connect WHOOP" prompt: full card tappable, ≥44pt height.

**WCAG 1.4.11 (Non-text contrast):** Gauges, bars, sparklines, heatmap cells all meet ≥3:1 on their backgrounds. The white-10 track under a 4pt orange bar meets the 3:1 threshold. The dashed-purple projection (2pt, decorative forecast) is designed to be secondary (not load-bearing for task completion); it aids understanding but is not required. Green milestone dots on the Living-Line meet 3:1 vs ink-900.

**Colour + glyph + word (never colour-alone):**
- Recovery gauge bands:
  - Green ≥70%: **✓ check glyph + "good" label + green fill** (never just a green dot).
  - Amber 40–70%: **~ tilde glyph + "moderate" label + amber fill**.
  - Red <40%: **! exclamation glyph + "low" label + red fill**.
- Status badges (such as WHOOP not connected): **text link ("Connect WHOOP") + right chevron icon** (not a bare link with colour alone).

**Screen reader labels** (aria-label / aria-describedby):
- Back button: "Back, navigate to previous screen."
- Domain header: "Fitness and workouts, level 12."
- RPG badge: "Fitness level 12, button, navigate to RPG character."
- SIA coaching note card: "SIA says: [message text]. Button, navigate to SIA chat."
- Today's Workout card: "Today's workout: [workout name]. [type], [duration]. Button, start workout or view details."
- "Start workout" CTA: "Start workout, button."
- Recovery gauge (96px): "Recovery, 78 percent, good. Gauge indicator."
- Sleep gauge (48px): "Sleep, 85. Gauge indicator."
- HRV gauge (48px): "Heart rate variability, 68. Gauge indicator."
- Active goals heading: "Active goals, [number of goals] goal(s)."
- Goal row: "[Goal name], [percentage] complete, button, view goal details."
- "see all" link: "See all [section name], button."
- Day dot: "[Day], [completed / planned / rest day / today]."
- KPI stat tile: "[Value] [label], such as '3 workouts completed this week.'"
- FAB: "Log workout, button."
- WHOOP "Connect" prompt: "Connect WHOOP for recovery insights, button, navigate to connected services."

**Reduced-motion (`prefers-reduced-motion: reduce`):**
- Gauges appear at final fill state instantly (no arc animation).
- Glyph and label appear with the gauge (no stagger).
- Living-Line appears fully drawn at rest (no stroke animation). Green milestone dots present. Dashed-purple projection static.
- KPI tiles appear with values at final count-up (no counting animation).
- Weekly bars appear at final heights (no rise animation).
- Heatmap cells appear at final fill/opacity (no stagger).
- FAB scroll fade-out / fade-in disabled; FAB always visible at opacity 1.
- Card entrance stagger skipped; all cards appear instantly.

The **reduced-motion frame** (gauges filled, Living-Line drawn, all values static) is the canonical frame — it preserves the signature motion / signature look.

**Accessibility summary:** Load-bearing graphics (gauges, bars, lines, heatmap) meet ≥3:1 contrast. Status is conveyed by colour **+ glyph + word**, never colour-alone (fixes the current aria-hidden colour-only WHOOP dots). Focus ring is the uniform `CK-T03` token. Touch targets meet 44pt. Reduced-motion preserves the visual signature.

---

Conform to `design-audit/CONSISTENCY.md`.


## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | 60/30/10 base |
| Card surfaces | #211008 | ink-brown-800 | glassmorphism with 1pt white 6% border |
| Domain accent line | #EF4444 | fitness-red | domain color, header only |
| Section eyebrow text | rgba(255,255,255,0.4) | white at 40% | "TODAY'S WORKOUT" and all section labels |
| RPG badge text + bg | #EF4444 at 100% / 15% | fitness-red | domain color on badge |
| "Start workout" CTA | #FF5E00 | burnt-orange | 60% primary — main CTA |
| "see all" links | #FF5E00 | burnt-orange | 60% primary — interactive text |
| Progress bar fills | #FF5E00 | burnt-orange | 60% primary — goal progress |
| Calendar dots (done) | #FF5E00 | burnt-orange | 60% primary — completion |
| WHOOP good indicator | #34A853 | forest-green | 30% secondary — positive state |
| WHOOP moderate band | #F59E0B | amber | gauge band 40-70% — paired with a visible glyph (~), not colour alone (S26-V02) |
| WHOOP low band | #EF4444 | fitness-red | gauge band <40% — domain-appropriate danger band, paired with a visible glyph (!), not colour alone (S26-V02) |
| SIA purple dot | #7F24FF | royal-purple | 10% accent — AI indicator |
| Primary text | #FFFFFF at 100% | white | headings, values |
| Secondary text | #FFFFFF at 70% | white-70 | body text |
| Tertiary text | #FFFFFF at 50% | white-50 | captions, labels |
| Quaternary text | #FFFFFF at 40% | white-40 | hints, meta |
| FAB background | #211008 | ink-brown-800 | glassmorphism |
| FAB text | #FFFFFF | white | label |

**60/30/10 verification**: orange dominates interactive elements (CTA, progress bars, calendar dots, links). Green appears only in WHOOP good-state indicators. Purple limited to single SIA dot. Domain red (#EF4444) confined to accent line and RPG badge — never on actions, eyebrows, or UI chrome. Section eyebrows use white at 40% per shared patterns.

---

## Interaction States

### "Start workout" CTA Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Burnt Orange (#FF5E00) fill, white text, r-pill | — |
| Pressed | darker orange (#E05400) + scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity, no touch response | — |
| Loading | white spinner replaces text, orange bg | — |
| Error | N/A (navigation action) | — |
| Success | brief green glow (600ms) as it navigates | success notification |

### SIA Coaching Note Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 card, purple dot, white text | — |
| Pressed | scale(0.97), background darkens to #1a0c06 | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A (always tappable) | — |
| Loading | skeleton shimmer on text area | — |
| Error | "Could not load SIA note" placeholder text | — |
| Success | N/A | — |

### Goal Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 card, progress bar, text | — |
| Pressed | scale(0.97), background darkens | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A | — |
| Loading | skeleton shimmer | — |
| Error | N/A | — |
| Success | N/A | — |

### WHOOP "Connect" Prompt
| State | Visual | Haptic |
|-------|--------|--------|
| Default | text + right chevron, white at 50% | — |
| Pressed | text at 30%, scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### RPG Skill Badge
| State | Visual | Haptic |
|-------|--------|--------|
| Default | domain color text, 15% opacity pill bg | — |
| Pressed | scale(0.95), bg opacity increases to 25% | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### FAB (Log Workout)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 glassmorphism, white text, --shadow-2 | — |
| Pressed | scale(0.95), background darkens | medium impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A (always active) | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### Exercise Preview Chip
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-900 bg, white text, r-sm | — |
| Pressed | scale(0.95), bg lightens slightly | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Swipe right from edge | Screen | back navigation (iOS native) |
| Pull down | ScrollView | refresh dashboard data (workout plan, WHOOP, goals) |
| Tap | Today's Workout card body | stack push to Screen 27 (Planning mode) |
| Tap | "Start workout" CTA | stack push to Screen 27 (transitions to Active mode) |
| Tap | Goal row | stack push to Goal Detail [14] |
| Tap | "see all" (goals) | stack push to Goals List [13], fitness filter |
| Tap | "see all" (this week) | stack push to exercise history |
| Tap | SIA note card | tab switch to SIA Chat [09] with fitness context |
| Tap | RPG badge | stack push to RPG Character [19] |
| Tap | WHOOP connect prompt | stack push to Connected Services [22] |
| Tap | FAB | stack push to Screen 27 (manual log template) |

**Haptic feedback points**:
- "Start workout" press: light impact
- FAB press: medium impact
- Goal row press: light impact
- SIA card press: light impact
- Pull-to-refresh release: medium impact
- RPG badge press: light impact

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| SIA note card | Screen mount | fade-in + translateY(12→0) | 280ms | ease-out-soft |
| Today's Workout card | Screen mount | fade-in + translateY(12→0) | 280ms | ease-out-soft |
| WHOOP card | Screen mount | fade-in + translateY(12→0) | 280ms | ease-out-soft |
| Goals section | Screen mount | fade-in + translateY(12→0) | 280ms | ease-out-soft |
| This Week section | Screen mount | fade-in + translateY(12→0) | 280ms | ease-out-soft |
| All content entry | Screen mount | staggered: 80ms between elements | 280ms each | ease-out-soft |
| Stat tile values | Scroll into view | count-up from 0 | 280ms | ease-out-soft |
| Calendar dots | Scroll into view | scale-in from 0.5 | 280ms, 40ms stagger | ease-out-soft |
| Today dot | Continuous | subtle pulse (opacity 0.4→1.0) | 800ms loop | ease-flow |
| FAB | Scroll down | fade out + translateY(+20pt) | 160ms | ease-out-soft |
| FAB | Scroll up/stop | fade in + translateY(0) | 160ms | ease-out-soft |
| Progress bar fills | Mount | width 0→percentage | 280ms | ease-out-soft |
| Pull-to-refresh | Pull release | standard iOS refresh indicator | system | system |

**Screen transition**:
- **Enter**: stack push slide-in from right (280ms, ease-out-soft)
- **Exit**: stack pop slide-out to right (280ms, ease-out-soft)

---

## Empty States

### Day 1 (new user)
- SIA note: "Ready to build your routine? Here's what I suggest."
- Today's Workout Card: SIA-generated starter plan based on onboarding fitness interests. If onboarding didn't include fitness, shows a simplified card: "Tell SIA about your fitness goals" with a text link to SIA Chat [09]. Card maintains same visual weight (r-xl, 24pt padding) but with centered content.
- WHOOP card: compact 64pt prompt "Connect a wearable for smarter recovery insights" with right chevron → Connected Services [22]
- Goals section: "No fitness goals yet" in 15pt Regular, white at 50%. "Create a fitness goal" text link in Burnt Orange. Taps navigate to Create/Edit Goal [15] with fitness domain pre-selected.
- This Week: all day dots empty except today (subtle pulse animation). Stat tiles show "0" for all values — visible but zeroed, not hidden.
- FAB remains visible and functional.

### Established user (rest day / zero state)
- SIA note: "Rest day. Your body recovers stronger than before."
- Today's Workout Card: "No workout planned today" message in 15pt Regular, white at 50%, centered. "Log a workout" secondary button (white text on transparent, 1pt white at 10% border, r-pill, 44pt height) replaces the "start workout" CTA.
- WHOOP card: normal data display (recovery data is relevant on rest days)
- Goals section: normal (goals still have progress to show)
- This Week: completed days filled, today marked as rest (—)

---

## Motivation Adaptation

- **Low motivation**: SIA note is more encouraging and gentle. Today's Workout Card shows a simplified plan (2-3 exercises instead of 5, shorter duration). Stats section hidden entirely. Goals section shows only the single most important fitness goal. WHOOP card simplified to just recovery percentage. Overall: less data, more warmth.
- **Medium motivation**: default experience as designed above. All sections visible. 3-5 exercises in workout plan. Full stats and goals.
- **High motivation**: exercise preview chips expand to show all exercises (no "+N" overflow). Additional stat tiles appear: personal records, weekly volume trend (mini spark line), streak count. WHOOP card shows expanded data (resting HR, respiratory rate). Goals section shows all fitness goals (not limited to 2).

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Domain header title | Sora | Semibold | 20pt | 26pt | white 100% |
| Domain accent line | — | — | 2pt height | — | #EF4444 |
| RPG skill badge | Sora | Semibold | 13pt | 18pt | #EF4444 |
| SIA coaching note text | Sora | Regular | 15pt | 20pt | white 100% |
| Card eyebrow ("TODAY'S WORKOUT") | Sora | Semibold | 12pt | 16pt | white at 40%, uppercase, +0.12em tracking |
| Workout name | Sora | Semibold | 17pt | 22pt | white 100% |
| Workout type + duration | Sora | Regular | 13pt | 18pt | white at 50% |
| Exercise preview chip | Sora | Regular | 13pt | 18pt | white 100% |
| "Start workout" CTA | Sora | Semibold | 16pt | 22pt | white 100% |
| WHOOP column value | Sora | Semibold | 20pt | 26pt | white 100% |
| WHOOP column label | Sora | Regular | 12pt | 16pt | white at 50% |
| Section heading ("Active goals") | Sora | Semibold | 18pt | 24pt | white 100% |
| "see all" link | Sora | Regular | 13pt | 18pt | #FF5E00 |
| Goal name | Sora | Regular | 15pt | 20pt | white 100% |
| Goal percentage | Sora | Semibold | 13pt | 18pt | white 100% |
| Domain tag chip | Sora | Regular | 11pt | 14pt | #EF4444 |
| Day label (calendar) | Sora | Regular | 12pt | 16pt | white at 40% |
| Stat tile value | Sora | Semibold | 20pt | 26pt | white 100% |
| Stat tile label | Sora | Regular | 12pt | 16pt | white at 50% |
| FAB label | Sora | Semibold | 15pt | 20pt | white 100% |
| WHOOP connect prompt | Sora | Regular | 15pt | 20pt | white at 50% |

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Workout plan fails to load | Today's Workout Card shows skeleton shimmer; after timeout: "Could not load workout plan" with "retry" text link | Tap retry or pull-to-refresh |
| WHOOP data fails to load | WHOOP card shows "Could not load WHOOP data" with "retry" text link | Tap retry; auto-retries in background |
| WHOOP not connected | Compact prompt: "Connect WHOOP for recovery insights" with right chevron | Tap navigates to Connected Services [22] |
| Goals fail to load | Goals section shows skeleton shimmer; after timeout: generic fallback text | Pull-to-refresh |
| SIA coaching note fails | "Could not load SIA note" placeholder text in white at 40% | Pull-to-refresh reloads SIA content |
| Pull-to-refresh fails | Standard iOS refresh indicator dismisses; toast: "Could not refresh." (3s) | User pulls to refresh again |
| Workout history fails to load | This Week section shows zeroed stats and empty dots | Pull-to-refresh |

---

## Accessibility

**Screen reader labels:**
- Back button: "Back, navigate to previous screen"
- Domain header: "Fitness and workouts, Level 12"
- RPG badge: "Fitness level 12, button, navigate to RPG character"
- SIA coaching note: "SIA says, [message text], button, navigate to SIA chat"
- Today's workout card: "Today's workout, [workout name], [type], [duration], button"
- "Start workout" CTA: "Start workout, button"
- WHOOP card: "WHOOP recovery, Sleep [value], HRV [value], Recovery [value] percent"
- Goal rows: "[Goal name], [percentage] complete, button"
- "see all" links: "See all [section name], button"
- Calendar dots: "[Day], [completed/planned/rest day]"
- Stat tiles: "[Value] [label]" (e.g., "3 workouts", "135 minutes", "850 calories")
- FAB: "Log workout, button"

**Focus order:**
1. Back button → Domain title → RPG badge
2. SIA coaching note card
3. Today's Workout card → "Start workout" CTA
4. WHOOP integration card (or connect prompt)
5. Active goals section header → "see all" → goal rows
6. This week section header → "see all" → calendar dots → stat tiles
7. FAB (Log workout)

**Gesture alternatives:**
- Swipe-right-from-edge (back) also available via back button tap
- Pull-to-refresh reloads all dashboard data
- FAB remains accessible when scrolling via scroll-up reveal
- Exercise preview chips horizontally scrollable; VoiceOver swipe-right traverses all chips
- All touch targets meet 44pt minimum
- WHOOP status conveyed by a visible glyph (✓ good / ~ moderate / ! low) plus the band colour and the numeric value — never colour alone (per Visualization S26-V02; fixes the current aria-hidden colour-only dots)

---

## Cross-References

- **Navigates to**: Screen 27 (Workout Detail) via stack push, Screen 70 (Exercise Library) via "browse exercises" shortcut or FAB sub-action (stack push), Screen 13 (Goals List) via stack push, Screen 14 (Goal Detail) via stack push, Screen 15 (Create/Edit Goal) via stack push, Screen 19 (RPG Character) via stack push, Screen 22 (Connected Services) via stack push, Screen 09 (SIA Chat) via tab switch
- **Navigates from**: Screen 18 (Explore Section) via stack push, Screen 09 (SIA Chat) via deep-link, Screen 12 (Home Screen) via action card, Screen 16 (Life Areas Overview) via domain tap
- **Shared components with**: Screen 28 (Domain Dashboard Header, SIA Coaching Note Card, Active Goals Section, FAB, Section Heading Row — same components, different domain data)
- **Patterns used**: Back Button (Batch 1), Brand CTA Button (Batch 1), 8-State Interaction Model, Stack Navigation, Content Entry Animation (staggered fade-in)
- **Patterns established**: Domain Dashboard Template (canonical layout with named slots), Domain Dashboard Header (back + title + accent line + RPG badge), SIA Coaching Note Card (purple dot + contextual message), Floating Action Button (above tab bar, auto-hides on scroll), Stat Tile (compact value + label metric), Section Heading Row (title + "see all" link), Exercise Preview Chip (horizontal scroll list), WHOOP Integration Card (3-column recovery data)
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-10.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U05`
**Prototype route**: `/domains/fitness`
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
| B10-F06 | major | product-sense | Route Log workout to a manual workout logging flow and reserve active workout for the planned workout. |
| B10-F07 | major | navigation | Make the SIA note a semantic link/button to SIA with domain/workout context. |
| B10-F08 | minor | mobile-ergonomics | Expand secondary hit areas while preserving compact visual styling. |

### Prototype Implications

- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

