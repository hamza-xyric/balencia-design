# Screen Design: Energy Tracking

**Screen**: 63 of 73
**File**: 63-energy-tracking.md
**Register**: Wellbeing Mode (wellbeing-teal #14B8A6)
**Primary action**: log and analyze energy levels throughout the day
**Tab**: Wellbeing domain (stack push from Explore [18] or Home [12] quick action)
**Navigation**: Stack depth 2-3 from Me tab root (Me Main [17] -> Explore [18] -> Energy Tracking). Also reachable via Home Screen [12] quick action card ("log your energy"), SIA Chat [09] deep-link ("let's look at your energy patterns"), or Wellbeing domain dashboard. Exit via back button to Explore or previous screen.

---

## Purpose

This screen is the user's energy observatory -- a place to log how they feel throughout the day, discover when their energy peaks and dips, and understand what factors (sleep, meals, workouts, stress) drive those patterns. It answers "how is my energy right now, and what can I do about it?" SIA acts as an energy coach: detecting chronotype, identifying peak productive hours, and surfacing correlations between energy and other life domains. The quick-log interaction is designed to be frictionless (under 5 seconds) so users build a habit of frequent check-ins, creating the data density needed for meaningful pattern detection. Energy logs feed into SIA's cross-domain correlation engine, enriching coaching across fitness, nutrition, and career scheduling. Free tier includes manual energy logging and basic timeline; SIA coaching notes, chronotype detection, and correlations require Plus.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Current energy display -- large rating with context tag, the emotional anchor
2. Quick log controls -- energy slider + context tag chips, the primary action
3. Today's energy timeline -- sparkline showing the day's energy arc
4. Energy trend chart -- 7/14/30 day patterns by time of day
5. Peak hours card -- AI-detected optimal energy windows
6. Chronotype badge -- personalized chronotype identification
7. Correlations card -- what affects energy (cross-domain insights)
8. SIA insight card -- coaching note about energy optimization

**User flow**:
- **Arrives from**: Explore [18] via "Energy Tracking" module card (stack push), Home Screen [12] via energy quick action card (stack push), SIA Chat [09] via deep-link ("let's check your energy", stack push), Wellbeing domain dashboard via "energy" section tap (stack push)
- **Primary exit**: Back to Explore [18] or previous screen (stack pop)
- **Secondary exits**: SIA Chat [09] via SIA insight card tap (tab switch with energy context pre-loaded), Goal Detail [14] via energy-related goal tap (stack push), Fitness Dashboard [26] via correlation card workout link (stack push), Nutrition Dashboard [28] via correlation card meal link (stack push)

---

## Layout

**Scroll behavior**: ScrollView (mixed content, moderate length ~1200-1400pt, not a homogeneous list)
**Tab bar visible**: Yes

### ASCII Wireframe

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  <- [back]   "Energy tracking"      │  <- Domain Header (56pt)
│      ================================│  <- 2pt wellbeing-teal accent line
├─────────────────────────────────────┤
│                                     │  <- 16pt gap
│  ┌───────────────────────────────┐  │
│  │  * SIA: "Your energy peaks    │  │  <- SIA Coaching Note
│  │    at 9-11am. Schedule deep   │  │     purple dot (*)
│  │    work then."                │  │
│  └───────────────────────────────┘  │
│                                     │  <- 16pt gap
│  ┌───────────────────────────────┐  │
│  │          [ 7 ]                │  │  <- Current Energy Display
│  │       afternoon               │  │     large rating + context
│  │    "feeling good"             │  │
│  └───────────────────────────────┘  │
│                                     │  <- 16pt gap
│  QUICK LOG                          │  <- Eyebrow
│  ┌───────────────────────────────┐  │
│  │  1 [====O===========] 10     │  │  <- Energy Slider
│  │                               │  │
│  │  [morning] [afternoon]        │  │  <- Context Tag Chips
│  │  [evening] [post-workout]     │  │     (selectable)
│  │  [post-meal]                  │  │
│  │                               │  │
│  │  ┌───────────────────────────┐│  │
│  │  │  optional note...         ││  │  <- Context Note Input
│  │  └───────────────────────────┘│  │
│  │                               │  │
│  │  [       log energy       ]   │  │  <- CTA Button
│  └───────────────────────────────┘  │
│                                     │  <- 24pt gap
│  TODAY'S ENERGY                     │  <- Eyebrow
│  ┌───────────────────────────────┐  │
│  │  6am    9am   12pm  3pm  now │  │  <- Energy Timeline
│  │      .--*--.                  │  │     sparkline chart
│  │  .--'       '--..--'         │  │     with dot markers
│  │  avg: 6.2                     │  │
│  └───────────────────────────────┘  │
│                                     │  <- 24pt gap
│  ENERGY TREND                       │  <- Eyebrow
│  [ 7d ][ 14d ][ 30d ]              │  <- Segmented Control
│  ┌───────────────────────────────┐  │
│  │  ^8                           │  │  <- Trend Chart
│  │  |   .**-.                    │  │     (avg energy by
│  │  |  *    '.*-*               │  │      time of day)
│  │  |.*          '*             │  │
│  │  +--6am--9am--12--3pm--9pm--│  │
│  │  avg: 6.4  best: 9am-11am    │  │
│  └───────────────────────────────┘  │
│                                     │  <- 24pt gap
│  ┌───────────────────────────────┐  │
│  │  PEAK HOURS            [Lv.8]│  │  <- Peak Hours Card
│  │  Morning  9:00-11:00   ****  │  │     with RPG badge
│  │  Afternoon 3:00-4:00   ***   │  │
│  │  "Schedule deep work here"    │  │
│  └───────────────────────────────┘  │
│                                     │  <- 16pt gap
│  ┌───────────────────────────────┐  │
│  │  YOUR CHRONOTYPE              │  │  <- Chronotype Badge Card
│  │  [early bird icon]            │  │
│  │  "early bird"                 │  │
│  │  Peak creative hours: 9-11am │  │
│  └───────────────────────────────┘  │
│                                     │  <- 24pt gap
│  WHAT AFFECTS YOUR ENERGY           │  <- Eyebrow
│  ┌───────────────────────────────┐  │
│  │  sleep  [========] +1.8       │  │  <- Correlations Card
│  │  meals  [======]   +1.2       │  │     horizontal bars
│  │  workout [=====]   +0.9       │  │     showing impact
│  │  stress  [====]    -1.4       │  │
│  └───────────────────────────────┘  │
│                                     │  <- 24pt gap
│  ┌───────────────────────────────┐  │
│  │  * SIA: "Your post-workout    │  │  <- SIA Insight Card
│  │    energy is 30% higher than  │  │
│  │    average. Morning workouts  │  │
│  │    give the biggest boost."   │  │
│  │            [ask SIA more]     │  │
│  └───────────────────────────────┘  │
│                                     │
│                                     │  <- 64pt bottom padding
├─────────────────────────────────────┤
│  Today  |  SIA  |  Goals  |  Me   │  <- Tab Bar
├─────────────────────────────────────┤
│         Home Indicator (34pt)       │
└─────────────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Domain Header** -- 56pt, FIXED, sticky with backdrop-blur on scroll
   - Purpose: Domain identification, back navigation, RPG level display
   - Content: Back chevron + "Energy tracking" title + 2pt wellbeing-teal accent line + RPG Skill Badge

2. **SIA Coaching Note Card** -- ~72pt
   - Purpose: Personalized energy coaching insight from SIA
   - Content: Purple dot + SIA observation about energy patterns

3. **Current Energy Display Card** -- ~120pt
   - Purpose: Show the most recent energy rating at a glance
   - Content: Large energy number + context tag + optional note

4. **Quick Log Card** -- ~240pt
   - Purpose: Frictionless energy logging (the screen's primary action)
   - Content: Energy slider (1-10) + context tag chips + optional note input + log CTA

5. **Today's Energy Timeline Card** -- ~120pt
   - Purpose: Visualize energy fluctuations throughout today
   - Content: Sparkline chart with dot markers at each log entry

6. **Energy Trend Section** -- ~200pt
   - Purpose: Multi-day energy patterns by time of day
   - Content: Segmented control (7d/14d/30d) + area chart

7. **Peak Hours Card** -- ~100pt
   - Purpose: AI-detected optimal energy windows
   - Content: Time ranges with energy intensity bars + SIA recommendation

8. **Chronotype Badge Card** -- ~100pt
   - Purpose: Personalized chronotype identification
   - Content: Chronotype icon + label + peak hours summary

9. **Correlations Card** -- ~140pt
   - Purpose: Cross-domain energy impact analysis
   - Content: Horizontal bars showing sleep, meals, workout, stress impact on energy

10. **SIA Insight Card** -- ~100pt
    - Purpose: Deeper coaching insight about energy optimization
    - Content: Purple dot + insight text + "ask SIA more" chip

---

## Components

### Domain Header (STICKY)
- **Purpose**: Identifies Wellbeing/Energy domain and provides back navigation
- **Data source**: Static + API (RPG level)
- **Visual treatment**: Identical to Domain Dashboard Template (Screen 26 canonical). ink-900 background, 56pt height, sticky on scroll (z-30, backdrop-blur 16px).
- **Content**:
  - Back button: standard (left chevron, white, 20pt, 44x44pt touch target, 16pt from left)
  - Title: "Energy tracking" -- 20pt Sora Semibold, white, left-aligned, 56pt from left
  - Domain accent line: 2pt height, wellbeing-teal (#14B8A6) at 80%, extends from title left to ~60% width, 4pt below title baseline
  - RPG Skill Badge: right-aligned, 16pt from right edge. "Lv.N" in 13pt Sora Semibold, teal text on teal at 15% bg, --r-pill
- **Size**: Full-width x 56pt

### SIA Coaching Note Card
- **Purpose**: Personalized energy coaching insight
- **Data source**: AI-generated based on energy log history and cross-domain data
- **Visual treatment**: Identical to SIA Coaching Note Card -- Compact Variant (Screen 26 canonical). ink-brown-800 glassmorphism card (1pt white at 6% border), --r-xl (28pt), 24pt padding.
- **Content**:
  - Purple dot: 6pt circle, #7F24FF, 16pt from left edge, vertically centered with first text line
  - Message: 15pt Sora Regular, white, 32pt from card left, max 3 lines
  - Example copy: "Your energy peaks between 9-11am. That's your golden window for deep work."
- **Variants**: With coaching note (default), Loading (skeleton shimmer), No data yet ("Log a few energy readings and SIA will spot your patterns.")
- **Gestures**: Tap navigates to SIA Chat [09] with energy context pre-loaded
- **Size**: Full-width minus 32pt x 56-80pt (variable)

### Current Energy Display Card
- **Purpose**: Show the most recent energy rating prominently -- the screen's emotional anchor
- **Data source**: API -- most recent entry from `energy_logs` for today
- **Visual treatment**: ink-brown-800 glassmorphism card, 20pt radius, 24pt padding. Center-aligned content.
- **Content**:
  - **ArcGauge hero** (Visualization S63-V01, mints `VK-015`): an open 240deg arc dial (160px outer, 8px arc), 0 at the left foot -> 10 at the right foot; the current value is the dominant center number (`text-display`, white, faint `--glow-orange-sm`). Arc fill = arc-following `--grad-orange` (conic-mask), always orange - a low reading is NEVER recoloured red/amber. Status is carried by number + glyph (moon/rest for 1-3, spark for 8-10) + label, never an alarm colour. Glow = `--glow-orange-md` (~20px). The plain 48pt bare number is superseded by the gauge center value.
  - Context tag: 13pt Sora Semibold, wellbeing-teal (#14B8A6), centered below number, 8pt gap. Example: "afternoon"
  - Context note (if present): 14pt Sora Regular, white at 50%, centered, 4pt below tag. Example: "feeling good after lunch walk"
  - Timestamp: 12pt Sora Regular, white at 30%, centered, 4pt below note. "logged 20 min ago"
- **Variants**: Has recent log (default), No log today (shows "--" in place of number, "no energy logged today" in white at 40%)
- **Gestures**: Tap opens Quick Log card with smooth scroll animation
- **Size**: Full-width minus 32pt x ~120pt

### Quick Log Card
- **Purpose**: Frictionless energy logging -- the primary action, designed for under-5-second completion
- **Data source**: Local state (writes to API on submit)
- **Visual treatment**: ink-brown-800 glassmorphism card, 20pt radius, 24pt padding, 16pt horizontal margins. Slight emphasis: 1pt wellbeing-teal at 10% border (distinguishes from other cards as the primary action area).
- **Content (top to bottom)**:
  - Eyebrow above card: "QUICK LOG" -- 12pt Sora Semibold, wellbeing-teal (#14B8A6), uppercase, +0.12em tracking (domain-colored eyebrow per dashboard convention)
  - **Energy Slider**:
    - Full-width inside card minus 32pt padding
    - Height: 44pt touch target area (track is 8pt tall)
    - Track: white at 8% fill, --r-pill
    - Fill (left of thumb): a single continuous orange (#FF5E00) fill — the energy value is carried by the in-thumb number + 1/10 endpoints, never a red/amber/teal level recolour (non-shaming — a low reading is never alarm-coded). Per Visualization S63-V07.
    - Thumb: 28pt circle, white fill, --shadow-2. Current value displayed inside thumb: 14pt Sora Bold, ink-900.
    - Endpoints: "1" left, "10" right -- 13pt Sora Semibold, white at 40%
    - Snap: discrete 1-10 integers only (no decimals)
    - Default value: 5 (center position)
    - Haptic: light impact on each integer snap
  - **Context Tag Chips** (16pt below slider):
    - Horizontal wrap layout (not scroll -- all visible)
    - Chips: "morning", "afternoon", "evening", "post-workout", "post-meal"
    - Chip height: 36pt, --r-pill
    - Inactive: ink-900 bg, 1pt white at 10% border, 13pt Sora Semibold, white at 60%
    - Active (selected): wellbeing-teal (#14B8A6) at 15% bg, wellbeing-teal text, 1pt wellbeing-teal at 30% border
    - Gap: 8pt between chips, 8pt row gap if wrapping
    - Auto-select based on current time: morning (5am-12pm), afternoon (12pm-5pm), evening (5pm-12am), post-workout (if workout logged within 2 hours), post-meal (if meal logged within 1 hour)
    - Only one active at a time (single-select)
  - **Context Note Input** (12pt below chips):
    - Text Input Field (52pt, standard pattern). Placeholder: "how are you feeling? (optional)" in white at 30%
    - Background: ink-900 (darker than card surface for contrast), --r-md (14pt), 1pt white at 10% border
    - Text: 15pt Sora Regular, white
    - Focused border: 2pt wellbeing-teal
    - Optional field -- user can skip
  - **Log CTA Button** (16pt below note input):
    - Full card content width
    - Height: 48pt, In-Card CTA Button pattern
    - Background: Burnt Orange (#FF5E00) -- always orange for CTAs, never domain color
    - Text: "log energy" -- 16pt Sora Semibold, white, center-aligned
    - Border radius: --r-pill
- **Variants**: Default (slider at 5, auto-selected context), Editing (user adjusting slider), Submitting (spinner replaces button text)
- **Gestures**: Drag slider thumb, tap context chips, tap input field, tap CTA
- **Size**: Full-width minus 32pt x ~240pt

### Today's Energy Timeline Card
- **Purpose**: Visualize energy fluctuations throughout the current day as a sparkline
- **Data source**: API -- all entries from `energy_logs` for today, ordered by `logged_at`
- **Visual treatment**: ink-brown-800 glassmorphism card, 20pt radius, 24pt padding
- **Content**:
  - Eyebrow above card: "TODAY'S ENERGY" -- standard domain-colored treatment (wellbeing-teal)
  - Sparkline chart area: Full card width minus 48pt (padding), 64pt height
    - X-axis: time of day (6am to current time), 11pt Sora Regular, white at 30%. Tick marks at 6am, 9am, 12pm, 3pm, 6pm, 9pm (only if within range).
    - Y-axis: implied (1-10 scale), no visible axis labels (minimalist)
    - Line: a curved (monotone), round-capped `Sparkline` (a tiny Living Line) at `--stroke-thin` 2px, **orange #FF5E00** (data ink) - exactly 7 points (today's logs resampled to 7). Visualization S63-V04.
    - Dot markers: the 'now' dot carries `--glow-orange-sm`; a **green #34A853** end dot when the latest log is the day's high (milestone/arrival).
    - Fill area below line: `--grad-orange` fade at <=25% opacity
    - No axes/grid; the line interpolates between log points with smooth curves
  - Below chart (8pt gap):
    - Left: "avg: 6.2" -- 13pt Sora Semibold, white at 60%
    - Right: "5 logs today" -- 13pt Sora Regular, white at 40%
- **Variants**: Multiple logs (full sparkline), Single log (single dot, no line), No logs today (flat dashed line at y=5, "log your first energy reading")
- **Gestures**: Tap dot marker shows tooltip with exact rating + time + context tag (lightweight popover, ink-brown-800 bg, --r-sm, 280ms fade-in)
- **Size**: Full-width minus 32pt x ~120pt

### Energy Trend Chart Section
- **Purpose**: Multi-day energy patterns showing average energy by time of day
- **Data source**: API -- aggregated `energy_logs` over 7/14/30 days, grouped by time-of-day buckets
- **Visual treatment**: No enclosing card -- chart sits directly within a section on ink-900. Segmented control above.
- **Content**:
  - Eyebrow: "ENERGY TREND" -- standard domain-colored treatment
  - **Segmented Control** (12pt below eyebrow):
    - 3-segment: "7d" | "14d" | "30d"
    - Identical to established Segmented Control pattern (Screen 38). Container: ink-brown-800, --r-pill, 40pt height.
    - Active segment: orange (#FF5E00) fill, white text (always orange for interactive controls)
    - Inactive: transparent, white at 50%
  - **Area Chart** (16pt below segmented control, inside ink-brown-800 card, 20pt radius, 16pt padding):
    - Chart area: Full-width minus 64pt x 140pt
    - X-axis: time-of-day labels -- "6am", "9am", "12pm", "3pm", "6pm", "9pm" -- 11pt Sora Regular, white at 30%
    - Y-axis: scale 1-10 -- 11pt Sora Regular, white at 30%, 3 grid lines at 3, 5, 8
    - Grid lines: 1pt, white at 3%, horizontal only
    - Data line: a data-driven `TrendChart` Living Line - 2px solid, curved, round-capped, running **orange #FF5E00 (effort) -> green #34A853 (arrival)** via `--grad-progress`. Visualization S63-V03 (replaces the prior hardcoded decorative SVG path, which represented no real data - a section 11 violation).
    - Fill area: `--grad-orange` vertical fade, <=25% top
    - Milestone markers: **green #34A853** dot at the day's peak (r=3px)
    - AI-projected 'ideal energy' curve (if 14d/30d): 2px dashed, royal-purple #7F24FF - the brand-sanctioned SIA forecast (section 11)
    - Scale: zero-baselined y (1-10), shared across 7/14/30d (honest window-switching); sparse (<7 pts) -> dots only, no fabricated curve
  - Below chart (8pt gap):
    - Left: "avg: 6.4" -- 13pt Sora Semibold, white
    - Right: "best: 9am-11am" -- 13pt Sora Regular, wellbeing-teal
- **Variants**: Populated (smooth curve), Sparse data (fewer than 7 points -- show dots without connecting line, "more data needed for trends"), Loading (skeleton shimmer)
- **Gestures**: Tap segmented control to switch range. Horizontal drag on chart for scrubbing (shows tooltip at finger position with exact average).
- **Size**: Full-width x ~200pt (control + chart + labels)

### Peak Hours Card
- **Purpose**: AI-detected peak energy windows -- the most actionable insight on the screen
- **Data source**: API -- `timing_profile.peak_hours` and `timing_profile.low_hours`, AI-computed from energy log history
- **Visual treatment**: ink-brown-800 glassmorphism card, 20pt radius, 24pt padding. Subtle wellbeing-teal at 3% top gradient (same treatment as Creativity Inspiration Card's domain gradient -- extremely subtle).
- **Content**:
  - Section label row: "PEAK HOURS" in 12pt Sora Semibold, wellbeing-teal, uppercase, +0.12em tracking (left) + RPG Skill Badge (right, mirrors header badge)
  - Peak time rows (12pt below label):
    - Each row: 48pt height, 16pt vertical padding
    - Left: Time label -- "morning" in 13pt Sora Regular, white at 50%
    - Center: Time range -- "9:00 - 11:00" in 16pt Sora Semibold, white
    - Right: Energy intensity indicator -- a small continuous `MomentumBar`-style fill (orange `--grad-progress`, radius-pill, in the Living-Line family) sized to the intensity level. Visualization S63-V06.
    - Separator between rows: 1pt white at 5%
  - Low energy row (if detected): same continuous-fill format with a distinct **rest/moon glyph** + label (never an alarm colour). Label: "low energy". Example: "2:00 - 3:00 pm"
  - SIA recommendation (12pt below last row): 14pt Sora Regular, white at 60%, italic style. Example: "Schedule deep work in your peak hours, routine tasks in the dip."
- **Variants**: Detected peaks (default), Insufficient data ("keep logging -- SIA needs ~2 weeks of data to detect your peak hours"), Single peak (one row only)
- **Gestures**: Tap card navigates to SIA Chat [09] with scheduling context
- **Size**: Full-width minus 32pt x ~100-140pt

### Chronotype Badge Card
- **Purpose**: Personalized chronotype identification -- a sticky, memorable identity element
- **Data source**: API -- `timing_profile.chronotype`, AI-computed from energy log timing patterns
- **Visual treatment**: ink-brown-800 glassmorphism card, 20pt radius, 24pt padding. Center-aligned content.
- **Content**:
  - Label: "YOUR CHRONOTYPE" -- 12pt Sora Semibold, white at 40%, uppercase, center-aligned
  - Chronotype icon: 48pt, center-aligned, 12pt below label. Outlined style, wellbeing-teal stroke.
    - Early bird: sunrise icon
    - Night owl: moon/owl icon
    - Third bird (intermediate): sun icon
    - Undetected: question mark icon, white at 20%
  - Chronotype name: 20pt Sora Bold, white, center-aligned, 8pt below icon. Example: "early bird"
  - Description: 14pt Sora Regular, white at 50%, center-aligned, 4pt below name. Example: "Peak creative hours: 9-11am. Wind down starts at 8pm."
- **Variants**: Detected (default with icon + name + description), Not yet detected (question mark icon, "SIA is still learning your chronotype. Keep logging." in 14pt, white at 40%)
- **Gestures**: Tap card for expanded chronotype detail (inline expand or SIA Chat deep-link)
- **Size**: Full-width minus 32pt x ~100-120pt

### Correlations Card
- **Purpose**: Cross-domain energy impact analysis -- what factors affect the user's energy most
- **Data source**: API -- AI-computed correlations from `energy_logs` cross-referenced with sleep, meals, workouts, and stress data
- **Visual treatment**: ink-brown-800 glassmorphism card, 20pt radius, 24pt padding
- **Content**:
  - Eyebrow above card: "WHAT AFFECTS YOUR ENERGY" -- standard domain-colored treatment
  - Correlation rows (each 40pt height, 8pt gap between):
    - Left: Factor label -- 15pt Sora Regular, white. Examples: "sleep", "meals", "workouts", "stress"
    - Center: Horizontal impact bar:
      - Width: proportional to correlation strength (normalized to strongest factor = full width)
      - Height: 8pt, --r-pill
      - Reinforcing impact: **orange #FF5E00** fill, with a leading `+` + up-arrow glyph (direction by sign, never colour-alone)
      - Draining impact: a **desaturated cool tint** (sleep-blue family, low chroma), with a leading `-` + down-arrow glyph
      - Track: `--color-alpha-white-08`; normalized to strongest |impact| = full width, one shared zero-anchored scale
    - Right: Impact score -- 13pt Sora Semibold, same orange (`+1.8`) / cool tint (`-1.4`) with the sign glyph. Visualization S63-V05.
  - Rows sorted by absolute impact (strongest first)
  - Domain icon (optional): 16pt, domain color, left of factor label. Sleep uses sleep-indigo (#818CF8), meals uses nutrition-lime (#84CC16), workouts uses fitness-red (#EF4444), stress uses white at 50%.
  - Tap hint: Right chevron (12pt, white at 20%) on each row for drill-down
- **Variants**: Full correlations (4+ factors), Partial (2-3 factors detected), Insufficient data ("SIA needs more cross-domain data to find correlations. Try logging meals and sleep too.")
- **Gestures**: Tap row navigates to the relevant domain dashboard (sleep -> Wellbeing, meals -> Nutrition [28], workouts -> Fitness [26]) via stack push
- **Size**: Full-width minus 32pt x ~140pt

### SIA Insight Card
- **Purpose**: Deeper coaching insight about energy optimization, distinct from the top coaching note (which is observational -- this one is prescriptive)
- **Data source**: AI-generated based on energy patterns and cross-domain analysis
- **Visual treatment**: SIA Coaching Note Card -- Contextual Variant (Screen 30 canonical). ink-brown-800 card, --r-xl (28pt), 24pt padding. Purple (#7F24FF) left border: 3pt wide, 40% opacity.
- **Content**:
  - Purple dot: 6pt, #7F24FF, inline-left
  - Insight text: 15pt Sora Regular, white at 80%, max 4 lines. Example: "Your post-workout energy is 30% higher than your daily average. Morning workouts specifically give the biggest boost -- consider moving your workout to before 10am."
  - "ask SIA more" chip: 12pt below text. ink-brown-800 bg darker variant, 1pt white at 10% border, 13pt Sora Semibold, white at 70%, --r-pill, 32pt height.
- **Variants**: With insight (default), Loading (skeleton), No insight yet ("keep logging and SIA will share personalized energy insights")
- **Gestures**: Tap chip navigates to SIA Chat [09] with energy optimization context. Tap card body also navigates.
- **Size**: Full-width minus 32pt x ~100pt

---

## Visualization

> Source: `app_design 3/63-energy-tracking-visualization-recommendations.md`. Audited in `viz-audit/` — Batch 3, findings `S63-V01..V07`. All primitives are from `viz-audit/VIZ-KIT.md` at `viz-audit/CONSISTENCY.md` parameters. **This screen mints `VK-015 ArcGauge`** (the energy hero) and **reuses `VK-011 ScatterPlot`** (the time-of-day cloud minted on Sleep [58]). Premium-depth, on-brand (60/30/10); no new data — every visual derives from data the screen already shows. **Current grade D (54) → specced-target A− (87).** *(Honest re-grade under the revised 10-dimension rubric; the residual gap to A+++ is build-verified depth + working scrub/drill micro-interactions, owned by the later viz-build program.)*

Template = Domain-Dashboard / Tracker (cluster benchmark **Oura + WHOOP + Gentler Streak**, register **Wellbeing Mode** → wellbeing-teal *identity*). This section upgrades *how the energy data reads* — from a number + segmented polylines + a decorative non-data path to a crafted, calm observatory — by adding **one** focal hero (the ArcGauge), the time-of-day ScatterPlot differentiator, the Living-Line trend/sparkline, and an honest correlation pass. **Brand correction baked in (`S63-V07`):** data ink moves **wellbeing-teal → orange** (orange dominates data ink at 60/30/10; teal stays *identity* only).

### Visualized-vs-text map

| Datum (already shown) | Today | Specced visual | Primitive |
|---|---|---|---|
| Current energy (7 / 10) + context | 48pt bare number in flat card | **open 240° arc dial** (charge metaphor) + center value + ticks + glow | **`ArcGauge` (VK-015, minted here)** |
| Energy × time-of-day (every log) | not shown | **time-of-day star-dot cloud** (x=hour, y=energy; cluster tightness = rhythm) | **`ScatterPlot` (VK-011, reuse 58)** |
| Multi-day avg by time-of-day | hardcoded **decorative** SVG path (no real data) | **Living Line** (orange→green) + **dashed-purple SIA projected** ideal curve | `TrendChart` (Living Line) |
| Today's energy arc | segmented `polyline` (equalizer) | **curved 7-pt Living Line** + green end dot on day-high | `Sparkline` |
| What affects energy (sleep/meals/workout/stress) | teal/amber bars (2 domain colours) | **signed strength bars** (orange + `+↑` / cool + `−↓`), never colour-alone | correlation bars (VK-009 encoding) |
| Peak-hour intensity (4 dots/row) | discrete circle dots | **continuous mini orange fills** (Living-Line family) | `MomentumBar` mini |
| Chronotype / context tags / note / timestamps | text | — (deliberately textual — identity labels, no useful visual form) | — |

### 1 · ArcGauge — energy hero — `S63-V01`  *(mints `VK-015`)*

Replace the Current Energy Display card with the **ArcGauge** (`VK-015`): an **open arc sweeping 240°** (gap centered at the bottom foot — it must never close into a ring), 0 at the left foot → 10 at the right foot, current value as the dominant center number. Energy is a *charge level*, so an open dial reads more honestly than a full ring (which implies a completable 100%).
- **Geometry:** hero **160px** outer, **8px arc** (`--stroke-bold`); filled portion = `(value/10)·240°`.
- **Depth (token-backed):** arc fill = arc-following `--grad-orange` **(mint)** via a **`conic-gradient` behind a circular mask** — ⚠️ an SVG `linearGradient` cannot sweep along an arc (angular-gradient trap); the spec says conic. Track = `--color-alpha-white-10` over `--track-inset` **(mint)** inset (carved recess). Glow = `--glow-orange-md` (~20px, **mint** — **not** the full 32px `--glow-orange`, which blooms past a 160px gauge). 12 radial ticks (6px, `--color-alpha-white-25`) behind the arc for instrument precision. Center value `text-display` white + faint `--glow-orange-sm` (mint).
- **Non-shaming colour (replaces the spec's red/amber/teal glow):** the arc is **always orange** (brand data ink); a low reading is **not** recoloured red. Low (1–3) shows a **moon/rest glyph** + constructive micro-copy; high (8–10) a **spark glyph**. Status is carried by **number + glyph + label**, never an alarm colour. *(This is the `S63-V07` brand+non-shaming correction applied to the hero.)*
- **Micro-interaction:** logging re-sweeps the arc to the new value + count-ups the center number; tap the gauge → scroll to Quick Log.
- **Data:** `energyTracking.current.value/context/note` (`mock.ts`).
- **States:** no-log-today → arc at rest on a **ghosted** 0-foot (faint full track, **not** a filled 0 reading "energy is zero"), center "—" + "no energy logged today"; loading → track + ticks visible, shimmer sweep morphs into the fill.

### 2 · ScatterPlot — energy × time-of-day cloud — `S63-V02`  *(reuse `VK-011`)*

Below the multi-day trend, the **`ScatterPlot` / ConsistencyCloud** (`VK-011`, the **same primitive minted on Sleep [58]**): **x = hour (6am→11pm), y = energy (1–10)**, one **orange star dot per log** across the window. A **tight vertical cluster** at an hour = a reliable rhythm; **wide scatter** = volatile energy — the chronotype made visible. SIA's peak window = a faint `--color-brand-orange` ~8% vertical band behind the cluster (teal "best: 9–11am" *identity* label beside it).
- **Encoding:** dots `--color-brand-orange`, r=3px; the "now" dot carries `--glow-orange-sm`. No mean line here (that's `S63-V03`) — this is deliberately the *spread*.
- **Honesty:** x/y zero-anchored at true range (6am, energy 1); sparse (<7 logs) → dots **without** the peak band + "more logs sharpen your pattern" (no inferred cluster from thin data — no-data ≠ a fabricated peak).
- **Motion:** dots stagger-in (`radar-dot` 420+index·40ms) after the trend draws; tap a dot → tooltip (energy + time + tag); tap the band → SIA scheduling.
- **States:** loading → axis ticks + shimmer dots; empty → axes only + "log to see your daily rhythm."

### 3 · TrendChart — multi-day Living Line + SIA projection — `S63-V03`

Replace the **hardcoded decorative SVG path** (`M0 112 C38 90 …` — represents *no real data*, a §11 violation) with the **`TrendChart` Living Line**: average energy by time-of-day across 7/14/30d as one continuous **curved, round-capped** stroke running **orange (effort) → green (arrival)**, with the **SIA "ideal energy" curve as a dashed-purple `#7F24FF` projection** — the brand-sanctioned forecast colour (§11), exactly what the screen already gestures at.
- **Locked params (CONSISTENCY TrendChart):** actual = solid orange Living Line 2px curved; projected = dashed purple `#7F24FF` 2px; area = `--grad-orange` **(mint)** vertical fade ≤25%; **zero-baselined y (1–10), shared scale across 7/14/30d** (honest window-switching); green milestone dot at the day's peak. Segmented control active = orange (interactive), inactive white/50.
- **Motion:** line **draws itself** (`stroke-draw`, `--dur-flow` 1200ms) on enter / segment change — **not** a fade; horizontal scrub reveals the value at the finger.
- **States:** sparse (<7 points) → dots only, no connecting line, "more data needed for trends" (no fabricated curve); loading → skeleton axis + flat line that draws into shape.
- **Data:** aggregated `energy_logs` by time-of-day bucket.

### 4 · Sparkline — today's energy arc — `S63-V04`

The Today's Energy Timeline `polyline` (straight segments — the equalizer anti-pattern) becomes a **`Sparkline`** (a tiny Living Line): **exactly 7 points** (today's logs resampled to 7), `--stroke-thin` 2px **curved** orange, no axes/grid, **green end dot** when the latest log is the day's high; the "now" dot keeps `--glow-orange-sm`. Avg + log-count caption stays.
- **States:** single log → one dot, no line; no logs → flat **ghosted** dashed line at y=5 (no-data ≠ a real 5) + "log your first energy reading."
- **Data:** `energyTracking.timeline`.

### 5 · Correlation strength bars — honest + signed — `S63-V05`

The Correlations card keeps the horizontal-bar form but adopts kit honesty + the `VK-009` encoding law:
- **Direction by sign, not colour:** reinforcing (sleep +1.8, meals +1.2, workout +0.9) = **orange** bars, leading **`+`** + up-arrow glyph; draining (stress −1.4) = a **desaturated cool tint**, leading **`−`** + down-arrow glyph — **always paired with a sign/arrow, never colour-alone** (replaces the current teal/amber pair, two domain colours doing semantic work).
- **Honest scale:** normalize to strongest |impact| = full width, **one shared scale**, zero-anchored; rows sorted by |impact|.
- **Non-shaming:** a draining factor is a *lever* ("manage stress → reclaim ~1.4 points"), never a failure; the row drills to Stress [52] / Sleep / Nutrition [28] / Fitness [26].
- **Data:** `energyTracking.correlations` (`positive` + `impact` + `width`).

### 6 · Peak Hours intensity — Living-Line mini fills — `S63-V06`

Peak-hour intensity (currently 4 discrete circles) becomes small **continuous** `MomentumBar`-style fills (orange `--grad-progress`, radius-pill) — "intensity" as a filled level, in the Living-Line family. Low-energy windows keep a distinct **rest glyph** (not an alarm colour). Removes the last dotted-equalizer on the screen.

### Motion choreography (entrance, draw-first)

Per `CONSISTENCY.md`: **ArcGauge hero draws first** (arc fills `0→value` `ring-animate` 520ms + center counts up) → **then** the trend **Living Line draws itself** (`stroke-draw` 1200ms) → **then** the ScatterPlot dots stagger in (`radar-dot` 420+index·40ms) → **then** the today sparkline draws + correlation bars rise (`--dur-slow` 520ms) → peak mini-fills last. One line motif per surface; below-fold visuals animate on scroll-into-view. `prefers-reduced-motion` → all at final state, with the Living Line's static form (completed stroke + green end dot) and the arc at rest preserved.

### States, brand & accessibility

- **States (all designed, per RUBRIC dim 7):** **cold-start / Day-1** — ArcGauge ghosted 0-foot ("—"/"no energy logged"), ScatterPlot + TrendChart show "more logs needed" (dots only, no fabricated curve/band), sparkline ghosted dashed at y=5, Peak Hours/Chronotype/Correlations show their detection-threshold prompts; **loading** — depth-preserving skeletons that morph into drawn data (arc track + ticks, trend axis + flat line, scatter axis), never blank discs; **partial / sparse** — distinct from loading and from zero (ghosted, not filled-zero); **error** — chart-specific per the Error Handling table (which series failed + a retry affordance).
- **60/30/10 (corrected — `S63-V07`):** **orange dominates data ink** — ArcGauge arc, both Living Lines, ScatterPlot dots, positive correlation bars, peak fills, Log CTA + active segment. **Green** = arrival/milestone only (Living-Line arrival, green end/milestone dots, log-success flash). **Purple** stays SIA-only — coaching-note dot, insight border/dot, **and the brand-sanctioned dashed-purple projection** on the TrendChart (§11 — correct, the only chart-purple). **Wellbeing-teal is now identity only** (header line, eyebrows, RPG badge, "best window" label, chronotype icon) — it no longer carries primary data ink. **Amber retires** from data semantics (replaced by signed direction + rest glyph). Glow uses the calibrated size-stepped scale — warm depth, not neon.
- **Non-shaming:** a low energy reading is framed as **state + a lever** (walk / water / rest), never a verdict (the arc never turns alarm-red); correlations frame draining factors as reclaimable; no streak/loss-aversion pressure.
- **Accessibility:** the spec's VoiceOver summaries already give each chart a text equivalent (ArcGauge → "Current energy 7 of 10"; ScatterPlot → "5 logs, average 6.2, peak 9:30am"; TrendChart → "average 6.4, best 9–11am"); status uses a **visible** glyph/sign (✦/moon, +/−↑↓), never colour alone; load-bearing strokes/arcs/dots and the filled/track boundary meet **WCAG 1.4.11 ≥3:1** on `#0A0A0F`/`#211008` (white/3 grid is decorative-only); interactive targets ≥44×44 (carries B16-F12); `prefers-reduced-motion` renders all visuals at final state.

Conform to `viz-audit/CONSISTENCY.md`.

---

## Premium Craft

**Profile:** data · **Cluster benchmark:** Oura + WHOOP (ArcGauge; orange, not alarm-red) — *stays Balencia via the warm-glow ArcGauge hero, the Living-Line sparkline + TrendChart, and orange data-ink dominance (no alarm colours, non-shaming).*

**Pre-grade:** B+ (76) · **Post-grade (this section):** A++ (96)

Pre-grade drivers (the gap to A++): the Visualization section is solid (A−), but (1) non-chart surfaces (cards, buttons) are flat `--color-ink-brown-800` with no top-edge highlight or layered depth; (2) the focal point wavers between the ArcGauge hero and the Quick Log card (both claim visual primacy, breaking focal hierarchy); (3) microcopy is partly generic/templated (empty-state "needs N days", "log one to begin"; loading "SIA is preparing"; permission rationale on post-meal context chip unstated); (4) type leading/tracking are ad-hoc pixel values, no token pairing; (5) the Quick Log button is CTA-orange but context chips are teal (domain colour on a primary action), violating the 60/30/10 rule; (6) state-craft matrix is absent (cold-start, loading, empty, error are textual, not designed); (7) contrast pairs are asserted but not tabulated.

### Focal hierarchy

One focal point: the **Current Energy Display ArcGauge** (`CK-P2`, data hero) — the 160px open-arc dial minted in Visualization S63-V01, sitting visibly above the fold. The **SIA Coaching Note Card sits above it as a warm preamble, not a competing hero**: emotionally distinct (the lone purple dot) but visually quieter than the gauge (no glow, body type, three-line cap). The **Quick Log Card below the gauge is the primary action zone**, sized as a tall card (240pt), but reads secondary to the gauge by spatial hierarchy (the gauge is read first in <2s on squint test, then the Quick Log as "here's how to change that"). Everything below (Today's Energy Timeline, Trend Chart, Peak Hours, Chronotype, Correlations, SIA Insight) is visibly secondary by size, glow, and density.

### Surface & depth

Every card adopts the `CK-P1` Layered Warm Surface — `--color-ink-brown-800` body · `--radius-xl` (28pt for hero/primary cards; `--radius-lg` 20pt for secondary cards) · 1pt `--glass-border` · **`--edge-highlight` top-edge highlight** (`CK-T01`) · `--shadow-1`. The Current Energy Display Card (hero, ≥96px ArcGauge) adds `--surface-backplate` (`CK-T02`). The ArcGauge carries `--glow-orange-md` (~20px) — sized for the 160px gauge per CONSISTENCY.md §1. Slider thumb carries `--shadow-2`. Energy Slider track recesses over `--track-inset` (beveled recess, not flat). Context chips inactive: ink-900 bg, 1pt white/10 border, `--radius-pill`; active: teal 15% bg, teal text/border (domain-colour-as-identity, correct use). Log CTA is Burnt Orange, `--radius-pill`, always orange for actions. All interactive elements carry `--focus-ring` (`CK-T03`). No glow on <36px elements.

### Typographic rhythm

Map to `CK-P3` tokens: Current energy number `--text-display` (40pt) / 700 / `--leading-tight` / white 100% + faint `--glow-orange-sm`; context tag `--text-h3` (17pt) / 600 / `--leading-snug` / wellbeing-teal; context note `--text-body` (16pt) / 400 / `--leading-normal` / white 50%; timestamp `--text-caption` (13pt) / 400 / white 30%; slider endpoints `--text-caption` / white 40%; slider thumb `--text-h3` / 700; Quick Log eyebrow the `.eyebrow` recipe (12pt / 600 / `--tracking-eyebrow` 0.12em / uppercase / wellbeing-teal); section labels `--text-eyebrow`; chart axis labels `--text-caption`; Peak Hours/Correlations/Chronotype all follow the scale with weight contrast carrying hierarchy. Stat figures use tabular-nums. Hierarchy by weight (600–700 vs 400), not size alone. Sentence case throughout; no exclamation marks. ≤2 `--color-brand-orange` accent words (CTA "log energy" + active segment). Chillax logo-only.

### Microcopy (before → after)

- **Quick Log button** — *before:* "log energy" → *after:* kept (concise, action-oriented).
- **Context note hint text** — *before:* "optional note..." → *after:* "how are you feeling. (optional)" (warm; no ellipsis).
- **Current energy, no log today** — *before:* no message → *after:* "--" + "no energy logged today" (13pt white 40%) + SIA note "log your first reading and SIA will start spotting your patterns" (warm invitation).
- **Peak Hours, insufficient data** — *before:* unstated → *after:* "Keep logging — SIA needs ~2 weeks of data to detect your peak hours" (frames discovery, not deficit; non-shaming).
- **Chronotype, not detected** — *before:* unstated → *after:* "SIA is still learning your chronotype. Keep logging" (warm; never "insufficient").
- **Correlations, insufficient data** — *before:* unstated → *after:* "SIA needs more cross-domain data to find correlations. Try logging meals and sleep too" (specific, constructive, non-shaming).
- **SIA Coaching Note, loading** — *before:* "SIA is preparing insights..." → *after:* "SIA is reading your week — one moment" (warmer, specific).
- **Timeline, no logs** — *before:* unstated → *after:* dashed ghosted line at y=5 + "log your first energy reading" (no-data ≠ zero).
- **Trend Chart, sparse** — *before:* unstated → *after:* dots only, no fabricated curve, "more data needed for trends" (honest).
- **Day-1 SIA note** — *before:* unstated → *after:* "Welcome to energy tracking. Log how you feel a few times today and SIA will start spotting your patterns" (warm, zero-pressure).

No exclamation marks; brand period with intent; every SIA string specific to user data, never a horoscope.

### Motion choreography

Locked to `CK-P4` order: **ArcGauge draws first** (arc fills `0 → value` `ring-animate` 520ms `--ease-flow` + counts up) → **TrendChart Living Line draws** (`stroke-draw` 1200ms, not fade) → **ScatterPlot dots stagger in** (40ms) → **Sparkline draws** (520ms) + dots → **Correlation bars rise** (60ms stagger) → **Peak Hours rows fade** (40ms stagger) → **Chronotype settles** (no purple flourish) → **SIA Insight fades** (280ms, last). Below-fold on scroll-into-view. `prefers-reduced-motion` → final state instantly; strokes fully drawn + end dots; no loops.

### State craft

| State | Layout | Copy (on-voice) | Depth / brand |
|---|---|---|---|
| Cold-start / Day-1 | ArcGauge "--" + ghosted 0-foot arc (faint full track visible), SIA invites first log, Quick Log is visual anchor, Timeline dashed ghosted at y=5, Trend/Peak/Chronotype/Correlations show "more data needed" skeletons (no fabricated curves) | "no energy logged today"; SIA: "Log how you feel a few times today and SIA will start spotting your patterns"; Peak Hours: "keep logging"; Chronotype: "SIA is still learning"; Correlations: "try logging meals and sleep too" | arc track + ticks visible, ghosted not filled; all viz show structure (axes, grids, labels) but no data |
| Loading | ArcGauge: track + ticks + shimmer sweep; Number: skeleton; Quick Log: skeleton fields; Timeline: axis + skeleton line; Trend: axis + skeleton area; Peak: label + skeleton bar; Correlations: label + skeleton bar | "SIA is reading your week — one moment" | skeletons on `ink-brown-800`, radial/linear shimmer, morph into data (never swap) |
| Empty / partial | un-synced renders ghosted/dashed (no-data ≠ zero); such as no meals → dashed meal row; no peak → skeleton | per-zone, on-voice (such as "try logging meals to see how they affect your energy") | ghosted/dashed visually distinct from real low; never silent |
| Error | "Couldn't sync your energy logs — pull to refresh" banner; sections show cached or skeleton; API failure specific | specific failure named; "pull to refresh" recovery action | `--color-error-red` only on genuine failure (text + icon, never colour-alone); glyph + word |
| Offline | cached data retained + "You're offline — showing your last sync" banner; pull-to-refresh dimmed ("offline") | "you're offline — pull to refresh when online" | actions dimmed 50% opacity, no haptic; cached data shown |

### Signature & anti-generic

Ownable moments: the **ArcGauge hero** (open 240° arc, orange, brand charge-level metaphor — the alternative to competitors' circular gauges) and the **Living-Line family** (sparkline + TrendChart, continuous stroke, draws itself not fades, same signature as Home's momentum bar) and the **warm-glow-on-ink surfaces** (`--edge-highlight`, `--surface-backplate`, size-calibrated glow, not cold/flat/neon). Anti-generic fix: the card stack is broken from flat monotony by the oversized ArcGauge hero (~160px, dominant) + the tall Quick Log card (240pt, focal action block) + section eyebrows + varied card heights (100–140pt range), so the screen never reads as an undifferentiated stack. The context-tag chips are a premium interaction detail (selectable, warmly teal, single-select) — a craft level generic trackers skip. The staggered dot-entry on ScatterPlot and the scrub interaction on TrendChart (horizontal drag for exact values) are micro-interactions that reward engagement.

### Accessibility

Tabulated load-bearing contrast pairs (on `--color-ink-brown-800` / `--color-ink-900`):

| Element | Color | Contrast |
|---------|-------|----------|
| Current energy number (white 100%) | `--color-alpha-white-100` | ≥12:1 |
| Context tag (teal) | wellbeing-teal (`--color-domain-wellbeing`) | 3.5:1 |
| SIA message / timestamps (white 50/30) | white opacity | ≥4.5:1 |
| Slider endpoints (white 40) | white/40 | 3.8:1 |
| Log button (white on orange) | orange + white | ≥4.5:1 |
| ArcGauge arc (orange) | `--color-brand-orange` | 3.2:1 |
| Sparkline (orange) | `--color-brand-orange` | 3.2:1 |
| TrendChart (orange→green) | gradient | ≥3:1 both ends |
| Correlation bars (orange/cool) | orange / desaturated cool | ≥3:1 |
| Chronotype icon (teal) | wellbeing-teal | 3.5:1 |
| Section eyebrows (white 40) | white/40 | ≥4.5:1 |

Status never colour-alone: ArcGauge pairs number + glyph (moon/spark) + label; Correlations pairs value + direction glyph (+↑/−↓) + word + domain label; Peak Hours low-energy pairs moon glyph + label, never alarm colour; SliderTrack always orange (never red at 1), status by number + glyph. All interactive elements carry `--focus-ring` (`CK-T03`, 2pt orange, 2pt offset). Slider thumb ≥44×44pt. Context chips 36pt height, ≥44pt wide. Log button 48pt height x full width. Chart tap zones ≥44pt. Reduced-motion: ArcGauge at final fill instantly, number at final value; sparklines fully drawn with green end dots; TrendChart complete; no loops. VoiceOver: ArcGauge reads "Current energy 7 of 10, feeling good, logged 20 minutes ago"; ScatterPlot: "5 logs today, average 6.2, peak 9:30am"; TrendChart: "average 6.4 over 7 days, best hours 9am–11am."

Conform to `design-audit/CONSISTENCY.md`.


---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Base |
| Card surfaces | #211008 | ink-brown-800 | Glassmorphism |
| Header accent line | #14B8A6 at 80% | wellbeing-teal (domain) | Domain identification |
| RPG Skill Badge | #14B8A6 at 15% bg, #14B8A6 text | wellbeing-teal (domain) | Level badge |
| Energy slider fill | #FF5E00 | brand-orange | Single orange graduated fill; value carried by the in-thumb number + 1/10 endpoints, never a red/amber/teal level recolour (non-shaming - a low reading is never alarm-coded) |
| Slider thumb | #FFFFFF | white | With shadow |
| Context tag chip (active) | #14B8A6 at 15% bg, #14B8A6 text | wellbeing-teal (domain) | Selection indicator |
| Context tag chip (inactive) | ink-900 bg, white at 60% text | -- | Neutral state |
| Log CTA button | #FF5E00 | orange (primary) | CTA -- always orange |
| Sparkline / trend line | #FF5E00 -> #34A853 | brand-orange -> forest-green (`--grad-progress`) | Living Line data ink (effort -> arrival); see Visualization S63-V03/V04 |
| Sparkline / trend fill area | #FF5E00 at <=25% | brand-orange (`--grad-orange` fade) | Area fill under the Living Line |
| Peak / milestone dot markers | #34A853 | forest-green | Green milestone/end dot (day-high / arrival) |
| AI projected line | #7F24FF | royal-purple (SIA) | Brand-sanctioned dashed-purple projection (SIA forecast, section 11) - the only chart-purple |
| Peak hours intensity fill | #FF5E00 -> #34A853 | brand-orange (`--grad-progress`) | Continuous MomentumBar-style fill (Living-Line family) - Visualization S63-V06 |
| Low-energy window indicator | (no colour) | -- | Carried by a rest/moon glyph + label, never an alarm colour |
| Correlation reinforcing bars / score | #FF5E00 | brand-orange | Reinforcing factor, always paired with a leading `+` + up-arrow glyph (never colour-alone) - Visualization S63-V05 |
| Correlation draining bars / score | desaturated cool tint (sleep-blue family, low chroma) | -- | Draining factor, always paired with a leading `-` + down-arrow glyph; amber retired from data semantics |
| ArcGauge hero arc fill | #FF5E00 -> #FF8A3D | brand-orange (`--grad-orange`, conic-mask) | Always orange - a low reading is NEVER recoloured red/amber (Visualization S63-V01/V07) |
| ArcGauge hero glow | `--glow-orange-md` (~20px, mint) | brand-orange | Size-calibrated warm glow on the 160px hero (not the 32px `--glow-orange`) |
| ArcGauge status cue | (no colour) | -- | Carried by number + glyph (moon/spark) + label, never an alarm colour |
| Chronotype icon | #14B8A6 | wellbeing-teal (domain) | Identity element |
| Segmented active | #FF5E00 | orange (primary) | Interactive control |
| SIA purple dot (coaching) | #7F24FF | purple (accent) | 10% rule -- element 1 |
| SIA purple border (insight) | #7F24FF at 40% | purple (accent) | 10% rule -- element 2 |
| SIA purple dot (insight) | #7F24FF | purple (accent) | 10% rule -- element 3 |
| "ask SIA more" chip | white at 70% on ink-brown-800 | -- | Neutral action chip |
| Domain eyebrow labels | #14B8A6 | wellbeing-teal (domain) | Section identification |
| Primary text | #FFFFFF | white | Titles, energy number, body |
| Secondary text | white at 60% | -- | Averages, labels |
| Tertiary text | white at 50% | -- | Descriptions, context notes |
| Quaternary text | white at 40% | -- | Timestamps, axis labels |

**60/30/10 verification (corrected - Visualization S63-V07)**: **Orange #FF5E00 dominates data ink** - the ArcGauge arc, both Living Lines (today sparkline + multi-day trend), ScatterPlot dots, reinforcing correlation bars, peak-hour intensity fills, plus the Log CTA and active segment. **Green #34A853** for arrival/milestone only - Living-Line arrival, green end/milestone dots, log-success flash. **Purple #7F24FF** stays SIA-only - coaching-note dot, insight border/dot, and the brand-sanctioned dashed-purple projection on the trend (section 11, the only chart-purple). **Wellbeing-teal is identity only** - header accent line, eyebrows, RPG Skill Badge, 'best window' label, chronotype icon - it no longer carries data ink. **Amber retires** from data semantics (replaced by signed direction + rest glyph). Ratio holds with orange as the clear data-ink driver and teal as the domain-identity layer.

---

## Interaction States

### Energy Slider
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Thumb at center (5), graduated track fill | -- |
| Pressed (thumb) | Thumb scale(1.2), value label appears above thumb (28pt Sora Bold, white, floating 24pt above) | light impact |
| Dragging | Thumb follows finger, track fill updates, value label follows | light impact on each integer snap |
| Released | Thumb scale back to 1.0, value label fades out | -- |
| Disabled | 0.4 opacity | -- |

### Context Tag Chip
| State | Visual | Haptic |
|-------|--------|--------|
| Default (inactive) | ink-900 bg, white at 10% border, white at 60% text | -- |
| Pressed | White 5% overlay on bg, scale(0.97) | light impact |
| Selected (active) | Teal 15% bg, teal 30% border, teal text | medium impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Log CTA Button (In-Card)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange fill, white text | -- |
| Pressed | Darker orange (#E55400), scale(0.97) | light impact |
| Disabled | 40% opacity (no slider interaction yet) | -- |
| Loading | White spinner replaces text | -- |
| Success | Green glow flash (600ms), text changes to "logged" with checkmark | success notification |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Segmented Control Segment
| State | Visual | Haptic |
|-------|--------|--------|
| Default (inactive) | Transparent bg, white at 50% text | -- |
| Pressed | White 5% bg flash | light impact |
| Active | Orange fill slides in, white text | medium impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Sparkline Dot Marker
| State | Visual | Haptic |
|-------|--------|--------|
| Default | 8pt orange circle (most recent: 10pt with `--glow-orange-sm`; green end dot when the latest log is the day's high) | -- |
| Pressed | Scale(1.4), tooltip appears above with rating + time + tag | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Peak Hours Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800, standard glassmorphism border | -- |
| Pressed | bg lightens (white 3% overlay), scale(0.99) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Chronotype Badge Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800, standard glassmorphism border | -- |
| Pressed | bg lightens (white 3% overlay), scale(0.99) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Correlation Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Normal text and bar | -- |
| Pressed | Row bg white at 5%, scale(0.99) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### SIA Insight Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800, purple left border | -- |
| Pressed | bg lightens (white 3% overlay), scale(0.99) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### "ask SIA more" Chip
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, white at 70% text | -- |
| Pressed | bg lightens, scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Domain Header Back Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | White chevron, 100% opacity | -- |
| Pressed | White at 60%, scale(0.95) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Pull down | ScrollView | Pull-to-refresh (reload energy logs, refresh SIA insights) |
| Drag | Energy slider thumb | Adjust energy rating (1-10) |
| Tap | Context tag chip | Select/deselect context tag |
| Tap | Log CTA | Submit energy log entry |
| Tap | Sparkline dot | Show tooltip with entry detail |
| Tap | Segmented control | Switch trend range (7d/14d/30d) |
| Horizontal drag | Trend chart | Scrub for exact values at time position |
| Tap | Peak Hours card | Navigate to SIA Chat [09] |
| Tap | Chronotype card | Expand detail or navigate to SIA Chat [09] |
| Tap | Correlation row | Navigate to relevant domain dashboard |
| Tap | SIA coaching note | Navigate to SIA Chat [09] |
| Tap | "ask SIA more" chip | Navigate to SIA Chat [09] |
| Tap | Back button | Pop stack |
| Swipe right from edge | Screen | iOS back gesture |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Screen content | Mount | Staggered fade-in: coaching note (0ms), current energy (80ms), quick log (160ms), timeline (240ms), trend (320ms), peak hours (400ms), chronotype (480ms), correlations (560ms), SIA insight (640ms) | 280ms each | ease-out-soft |
| Header collapse | Scroll past 40pt | Title remains stable (no large-title variant on this screen -- fixed 56pt header) | -- | -- |
| Energy slider thumb | Drag | Thumb follows finger, value label tracks above, track fill recolors in real-time | Continuous | -- |
| Energy slider snap | Release at integer | Thumb snaps to nearest integer position | 160ms | ease-out-soft |
| Context chip select | Tap | Previous chip: bg fades out (160ms). New chip: bg fades in + border color transition | 160ms | ease-out-soft |
| Log success | CTA tap | Button text crossfades to "logged" with checkmark, green glow flash, ArcGauge re-sweeps + center counts up to the new value, new dot appears on the timeline Sparkline (scale 0 to 1 + orange glow pulse, green if it is the day's high) | 600ms button, 520ms gauge re-sweep / 280ms dot | ease-out-soft (button), ease-flow (gauge) |
| Sparkline draw | Enter viewport | Line draws left-to-right (stroke-dashoffset), dots scale in as line reaches them | 520ms | ease-flow |
| Trend chart draw | Segment change or enter viewport | Line morphs from old data to new data (or draws from left on first entry) | 520ms | ease-flow |
| Peak hours rows | Enter viewport | Staggered fade-in, 80ms stagger per row | 280ms each | ease-out-soft |
| Chronotype reveal | Enter viewport (first detection) | Icon scale(0.5 to 1.0) + fade-in, name fades in 160ms later | 520ms | ease-flow |
| Correlation bars | Enter viewport | Bars grow from 0 width to target width, staggered 60ms per row | 280ms each | ease-out-soft |
| Tooltip (sparkline) | Tap dot | Fade-in + translateY(-8 to 0) | 160ms | ease-out-soft |
| Tooltip dismiss | Tap elsewhere | Fade-out | 160ms | ease-out-soft |

**Screen transition**:
- **Enter**: Standard iOS stack push -- slides in from right (280ms, ease-out-soft)
- **Exit**: Stack pop -- slides out to right (280ms, ease-out-soft)

---

## Empty States

### Day 1 (new user)
- **SIA Coaching Note**: Warm introduction -- "Welcome to energy tracking. Log how you feel a few times today and SIA will start spotting your patterns."
- **Current Energy Display**: Shows "--" in place of number. Subtext: "no energy logged yet" in 14pt, white at 40%, centered.
- **Quick Log**: Fully functional immediately -- this is the starting point. Slider defaults to 5. Context tag auto-selected based on time of day. The card is visually the most prominent element, drawing the user to their first log.
- **Today's Energy Timeline**: Flat dashed line at y=5 (white at 10%), centered text: "your energy timeline will appear here" in 14pt, white at 40%.
- **Energy Trend**: Hidden entirely (no historical data). Section space collapses.
- **Peak Hours Card**: Replaced by a softer prompt card: "SIA needs about 2 weeks of energy logs to detect your peak hours. Log a few times daily to help." with a small progress indicator showing "3 of ~30 logs" toward detection threshold.
- **Chronotype Badge**: Question mark icon, "SIA is learning your chronotype" text.
- **Correlations Card**: Hidden until sufficient cross-domain data exists (at least 7 days of energy logs + data in one other domain).
- **SIA Insight Card**: Generic tip: "Try logging your energy at least 3 times daily -- morning, afternoon, and evening. The more consistent you are, the better SIA's insights become."

### Established user (zero state -- no logs today)
- **Current Energy Display**: "--" with "no energy logged today" subtext. Subtle pulse animation on the Quick Log card to draw attention.
- **Today's Energy Timeline**: Empty with "log your first energy reading" text.
- **All other sections**: Populated with historical data from previous days. Energy Trend, Peak Hours, Chronotype, and Correlations all show their normal state based on accumulated data.

---

## Motivation Adaptation

- **Low motivation**: SIA coaching note is shorter and gentler: "Just one quick check-in today. How's your energy?" Quick Log card is extra prominent (slight scale bump, teal border brightens). Hides: Energy Trend chart, Correlations card, SIA Insight card. Shows: Current Energy, Quick Log, Today's Timeline, Peak Hours (if detected), Chronotype badge. Goal: fit entire visible screen in one viewport without scrolling past the Quick Log. FAB-style floating "log energy" button appears if user scrolls past Quick Log.
- **Medium motivation**: Full screen as described. All 8 sections visible. Default experience with standard SIA insights.
- **High motivation**: Additional analytics section appears below Correlations: "Energy Analytics" with detailed breakdown -- average energy by day of week (mini bar chart), energy variance over time, longest streak of high-energy days, personal energy records ("your highest average week was May 5-11: 7.8"). SIA Insight card is more detailed with specific recommendations and data points. Trend chart shows a confidence band (orange at 3% fill around the Living Line). Chronotype card shows expanded detail with sleep-energy correlation graph.

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Header title | Sora | Semibold 600 | 20pt | 28pt | #FFFFFF |
| RPG skill badge | Sora | Semibold 600 | 13pt | 18pt | #14B8A6 |
| Section eyebrow | Sora | Semibold 600 | 12pt | 16pt | #14B8A6 |
| SIA coaching message | Sora | Regular 400 | 15pt | 22pt | #FFFFFF |
| Current energy number | Sora | Bold 700 | 48pt | 56pt | #FFFFFF |
| Current energy context tag | Sora | Semibold 600 | 13pt | 18pt | #14B8A6 |
| Current energy note | Sora | Regular 400 | 14pt | 20pt | #FFFFFF at 50% |
| Current energy timestamp | Sora | Regular 400 | 12pt | 16pt | #FFFFFF at 30% |
| Slider endpoint labels | Sora | Semibold 600 | 13pt | 18pt | #FFFFFF at 40% |
| Slider thumb value | Sora | Bold 700 | 14pt | 20pt | #0A0A0F |
| Context tag chip (inactive) | Sora | Semibold 600 | 13pt | 18pt | #FFFFFF at 60% |
| Context tag chip (active) | Sora | Semibold 600 | 13pt | 18pt | #14B8A6 |
| Context note placeholder | Sora | Regular 400 | 15pt | 20pt | #FFFFFF at 30% |
| Context note input text | Sora | Regular 400 | 15pt | 20pt | #FFFFFF |
| Log CTA text | Sora | Semibold 600 | 16pt | 22pt | #FFFFFF |
| Timeline X-axis labels | Sora | Regular 400 | 11pt | 16pt | #FFFFFF at 30% |
| Timeline average text | Sora | Semibold 600 | 13pt | 18pt | #FFFFFF at 60% |
| Timeline log count | Sora | Regular 400 | 13pt | 18pt | #FFFFFF at 40% |
| Trend chart axis labels | Sora | Regular 400 | 11pt | 16pt | #FFFFFF at 30% |
| Trend average value | Sora | Semibold 600 | 13pt | 18pt | #FFFFFF |
| Trend best time text | Sora | Regular 400 | 13pt | 18pt | #14B8A6 |
| Peak hours section label | Sora | Semibold 600 | 12pt | 16pt | #14B8A6 |
| Peak time label | Sora | Regular 400 | 13pt | 18pt | #FFFFFF at 50% |
| Peak time range | Sora | Semibold 600 | 16pt | 22pt | #FFFFFF |
| SIA recommendation (peak) | Sora | Regular 400 | 14pt | 20pt | #FFFFFF at 60% (italic) |
| Chronotype label | Sora | Semibold 600 | 12pt | 16pt | #FFFFFF at 40% |
| Chronotype name | Sora | Bold 700 | 20pt | 28pt | #FFFFFF |
| Chronotype description | Sora | Regular 400 | 14pt | 20pt | #FFFFFF at 50% |
| Correlation factor label | Sora | Regular 400 | 15pt | 20pt | #FFFFFF |
| Correlation impact score (reinforcing) | Sora | Semibold 600 | 13pt | 18pt | #FF5E00 (+ sign + up-arrow glyph; never colour-alone) |
| Correlation impact score (draining) | Sora | Semibold 600 | 13pt | 18pt | desaturated cool tint (− sign + down-arrow glyph; never colour-alone) |
| SIA insight text | Sora | Regular 400 | 15pt | 22pt | #FFFFFF at 80% |
| "ask SIA more" chip | Sora | Semibold 600 | 13pt | 18pt | #FFFFFF at 70% |
| Segmented control text | Sora | Semibold 600 | 13pt | 18pt | #FFFFFF or #FFFFFF at 50% |

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Energy log submission fails | Log CTA shows error state (red border flash, 280ms), "could not log — try again" toast (3s). Slider and chip selections preserved. | CTA re-enables, user can retry |
| Today's timeline load fails | Timeline card shows "could not load today's data" + "retry" link in orange | Tap retry re-fetches |
| Energy trend chart load fails | Chart area shows "could not load trends" + "retry" link | Tap retry re-fetches for selected period |
| Peak hours detection fails | Peak hours card shows "SIA needs more data to detect your peak hours" placeholder | Non-blocking; card appears when data sufficient |
| Chronotype detection fails | Chronotype card shows question mark icon + "SIA is still learning your chronotype. Keep logging." | Non-blocking; updates when detected |
| Correlations load fails | Correlations card shows "could not load correlations" + "retry" link | Tap retry re-fetches cross-domain data |
| SIA coaching note load fails | Card shows "could not load SIA note" placeholder in 15pt Regular, white at 40% | Auto-retries on next pull-to-refresh |
| SIA insight card load fails | Card shows "could not load insight" placeholder | Auto-retries on next refresh |
| Network offline | Quick Log remains functional — logs queue locally and sync when online. All chart sections show cached data with "offline — showing cached data" banner (48pt). | Banner includes "tap to retry" on reconnect |
| Rate limit on logging | "You logged recently. Next log available in Xm." toast. Log CTA disabled with countdown. | CTA re-enables when cooldown expires |

---

## Accessibility

Accessibility follows global standards from `_shared-patterns.md`. Screen-specific notes:

- **Current energy display**: VoiceOver reads "Current energy level: 7 out of 10. Afternoon. Feeling good after lunch walk. Logged 20 minutes ago."
- **Energy slider**: Accessible slider role with min=1, max=10, step=1. VoiceOver announces value on each snap: "Energy level: 7." Endpoints announced in description.
- **Context tag chips**: Toggle role with state: "Afternoon, selected" / "Post-workout, not selected." Auto-selection announced: "Afternoon auto-selected based on current time."
- **Today's timeline sparkline**: Summary for screen readers: "Today's energy timeline. 5 logs. Average 6.2. Peak at 9:30 AM." Individual dots not focusable — summary conveys the insight.
- **Energy trend chart**: Summary announced: "Energy trend over 7 days. Average 6.4. Best hours: 9 AM to 11 AM." Segmented control accessible as tab group.
- **Peak hours card**: VoiceOver reads each peak row: "Morning peak, 9:00 to 11:00, very high energy." Low energy row: "Low energy window, 2:00 to 3:00 PM."
- **Chronotype badge**: VoiceOver reads "Your chronotype: early bird. Peak creative hours: 9 to 11 AM."
- **Correlations card**: VoiceOver reads each factor: "Sleep impacts energy plus 1.8. Stress impacts energy minus 1.4." Tap hint: "Double tap to view sleep details."
- **Touch targets**: All interactive elements meet 44x44pt minimum. Slider thumb has 44pt expanded touch area. Context chips have 36pt visible with 44pt touch target.
- **Color contrast**: All text meets WCAG AA. Slider graduated color paired with numeric value (never color-only). Energy glow is decorative.
- **Reduced motion**: Slider value label appears without float animation. Sparkline appears without draw animation. Chart data appears without staggered entry. Segmented control transition is instant.

---

## Cross-References

- **Navigates to**: Screen [09] -- SIA Chat (via coaching note tap, SIA insight tap, "ask SIA more" chip, peak hours card tap -- tab switch with energy context), Screen [14] -- Goal Detail (via energy-related goal tap, if shown -- stack push), Screen [26] -- Fitness Dashboard (via correlation row "workouts" tap -- stack push), Screen [28] -- Nutrition Dashboard (via correlation row "meals" tap -- stack push)
- **Navigates from**: Screen [18] -- Explore Section (stack push via "Energy Tracking" module card), Screen [12] -- Home Screen (stack push via energy quick action card), Screen [09] -- SIA Chat (deep-link via "let's check your energy"), Wellbeing domain dashboard (stack push via "energy" section)
- **Shared components with**: Screen [26] -- Fitness Dashboard (Domain Dashboard Header, SIA Coaching Note Card -- Compact Variant, RPG Skill Badge), Screen [35/36] -- Learning/Creativity Dashboards (Domain Dashboard Template structure, Streak-style data viz, domain-colored eyebrows), Screen [38] -- Habits (Segmented Control pattern), Screen [30] -- Finance Dashboard (SIA Coaching Note Card -- Contextual Variant on insight card)
- **Patterns used**: Domain Dashboard Header (Screen 26), SIA Coaching Note Card -- Compact Variant (Screen 26), SIA Coaching Note Card -- Contextual Variant (Screen 30), Segmented Control (Screen 38), In-Card CTA Button (Screen 26), Text Input Field (Screen 03), Section Eyebrow Label (Screen 12), Back Button, 8-State Model, Content Entry Animation, Pull-to-Refresh
- **Patterns established**: Energy Slider (graduated color 1-10 with discrete snapping + floating value label), Current Energy Display (large number + color-coded glow bg), Energy Sparkline Timeline (horizontal time-based sparkline with tappable dot markers), Chronotype Badge Card (center-aligned identity card with icon + name + description), Correlations Bar Chart (horizontal impact bars with positive/negative coloring + domain drill-down), Context Tag Auto-Select (time-aware default chip selection)
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-16.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U08`
**Prototype route**: `/features/energy`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q04 health logging needs visible in-session state, not persistence.
- Q41 recipes and shopping list support lightweight real mutations; sharing is review-first.
- Q45 meditation/yoga need library-to-active-to-complete modes.
- Q46 quick notes prioritize global bottom-sheet capture.
- Q47 report/block keeps also-block default off.
- Q49 sleep accent is canonical sleep-indigo.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B16-F10 | critical | retention | Replace visual controls with semantic inputs, enabled submit, success/reset, undo, and persisted or local prototype state. |
| B16-F11 | major | information-architecture | Wire trend state and SIA follow-up, and make the bottom Log scroll to Quick log or remove the duplicate action. |
| B16-F12 | major | accessibility | Use a labeled range input, 44px segmented controls, selected states, and live confirmation after logging. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

