# Screen Design: Workout Detail / Active Workout

**Screen**: 27 of 73
**File**: 27-workout-detail-active-workout.md
**Register**: Product Mode
**Primary action**: complete sets during active workout
**Tab**: Me (inherited from Fitness Dashboard stack)
**Navigation**: Stack depth 3-4 from Me tab root (Me → Explore → Fitness Dashboard → Workout Detail). Also reachable via SIA deep-link or Home action card directly.

---

## Purpose

The Workout Detail screen serves three distinct functions within a single screen: previewing and planning a workout before starting, tracking exercises in real-time during an active workout, and reviewing performance after completion. It is the most interaction-dense screen in the app — the Active mode replaces the standard app navigation with a focused, immersive tracker. This screen establishes the **Detail Screen Template** and **Multi-Mode Screen Pattern** used by all domain detail screens.

---

## Information Architecture

**Hierarchy** varies by mode:

**Planning mode** (what the user sees, in order of visual priority):
1. Workout name and metadata (type, duration)
2. SIA coaching note about today's workout context
3. Full exercise list with sets, reps, rest times
4. "Start workout" CTA

**Active mode** (what the user sees, in order of visual priority):
1. Current exercise name (largest, most prominent)
2. Set tracker (weight/reps inputs + "complete set" button)
3. Rest timer (appears after completing a set)
4. Progress indicator (exercise X of Y, set X of Y)
5. SIA real-time motivational note
6. Next exercise preview

**Post-workout summary** (what the user sees, in order of visual priority):
1. "Workout complete." header
2. Performance stats (duration, exercises, calories)
3. XP earned + level progress
4. SIA feedback with data-driven insight
5. "Done" CTA

**User flow**:
- **Arrives from**: Screen 26 (Fitness Dashboard) via stack push — "start workout" CTA or workout card tap
- **Primary exit**: Screen 26 via stack pop ("done" in summary, back in planning)
- **Secondary exit**: Screen 42 (Celebration overlay) presented as modal on milestone/level-up
- **Back behavior**: Planning mode = normal stack pop. Active mode = back disabled (must use Pause/End). Summary mode = "done" button pops.

---

## Layout

**Scroll behavior**: ScrollView (Planning mode), None/Fixed (Active mode), ScrollView (Summary mode)
**Tab bar visible**: Yes (Planning + Summary), No (Active mode — the only screen in the app that hides the tab bar)

### Mode Architecture

```
                 ┌──────────────┐
                 │   Planning   │
                 │    Mode      │
                 └──────┬───────┘
                        │ "Start workout" tap
                        ▼
                 ┌──────────────┐
           ┌─────│    Active    │─────┐
           │     │    Mode      │     │
           │     └──────┬───────┘     │
      "Pause"      "End workout"   Complete
           │           │          last set
           ▼           ▼             │
     ┌──────────┐ ┌──────────────┐   │
     │  Paused  │ │ Post-workout │◄──┘
     │ (overlay)│ │   Summary    │  (auto-transition
     └──────────┘ └──────┬───────┘   after last exercise)
                         │
                    "Done" tap
                         ▼
                 ┌──────────────┐
                 │  Back to     │
                 │  Screen 26   │
                 └──────────────┘
```

Mode transitions use content crossfade below the header (520ms, ease-out-soft). The header remains stable during planning→active. Active→summary replaces the entire screen with a celebration-style layout.

### ASCII Wireframe — Planning Mode

```
┌─────────────────────────────────┐
│         Status Bar (44pt)       │
├─────────────────────────────────┤
│  ←  Upper body strength    ···  │  56pt — Detail Header
│      Strength · 45 min          │  back + title + overflow menu
├─────────────────────────────────┤
│                                 │  SCROLLABLE
│  ┌─────────────────────────────┐│
│  │ ● SIA:                     ││  56pt — SIA note (compact)
│  │ "Good pairing with         ││
│  │  yesterday's cardio."      ││
│  └─────────────────────────────┘│
│          12pt gap               │
│  EXERCISES  (5)                 │  eyebrow + count
│                                 │
│  1. Bench press                 │  exercise row (~64pt each)
│     4 × 8 reps · 90s rest      │
│     "Focus on controlled        │
│      negatives"                 │
│  ─────────────────────────────  │
│  2. Overhead press              │
│     3 × 10 reps · 60s rest     │
│  ─────────────────────────────  │
│  3. Barbell rows                │
│     4 × 8 reps · 90s rest      │
│  ─────────────────────────────  │
│  4. Lateral raises              │
│     3 × 15 reps · 45s rest     │
│  ─────────────────────────────  │
│  5. Face pulls                  │
│     3 × 15 reps · 45s rest     │
│                                 │
│          32pt gap               │
│  EST. DURATION: 45 min         │  eyebrow + value
│          24pt gap               │
│  ┌───────────────────────────┐  │
│  │     Start workout →        │  │  56pt — primary CTA
│  └───────────────────────────┘  │  orange pill, full-width
│          32pt gap               │
├─────────────────────────────────┤
│  Today  │  SIA  │ Goals │  Me  │  Tab Bar (56pt + 34pt)
└─────────────────────────────────┘
```

### ASCII Wireframe — Active Mode

```
┌─────────────────────────────────┐
│         Status Bar (44pt)       │
├─────────────────────────────────┤
│  Exercise 3 of 5   ⏸  ■ Stop  │  40pt — progress + controls
│  ⏱ 23:45                       │  elapsed time, left-aligned
├─────────────────────────────────┤
│                                 │
│                                 │
│          Barbell rows           │  24pt Bold, white, centered
│                                 │
│          Set 2 of 4             │  15pt Regular, white 50%
│                                 │
│  ┌─────────────────────────────┐│
│  │                              ││  ~180pt — Set Tracker Card
│  │  ┌───────────┐ ┌──────────┐ ││
│  │  │  Weight    │ │  Reps    │ ││  52pt inputs, side-by-side
│  │  │  [85 lbs]  │ │  [8]     │ ││  pre-filled from last set
│  │  └───────────┘ └──────────┘ ││
│  │                              ││
│  │  Last set: 85 lbs × 8       ││  reference line
│  │                              ││
│  │  ┌───────────────────────┐  ││
│  │  │    Complete set ✓      │  ││  48pt — green button
│  │  └───────────────────────┘  ││
│  │                              ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │         REST  1:23          ││  ~200pt — Rest Timer
│  │      ╭──────────────╮       ││  (appears after set complete)
│  │      │              │       ││
│  │      │     1:23     │       ││  120pt circular countdown
│  │      │              │       ││  orange ring fill
│  │      ╰──────────────╯       ││
│  │      [Skip rest →]          ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ ● "Last set. Push through." ││  40pt — SIA real-time note
│  └─────────────────────────────┘│
│                                 │
│  NEXT: Lateral raises           │  next exercise preview
│  3 × 15 reps                    │
│                                 │
├─────────────────────────────────┤
│       (tab bar hidden)          │
│     Home Indicator (34pt)       │
└─────────────────────────────────┘
```

### ASCII Wireframe — Post-Workout Summary

```
┌─────────────────────────────────┐
│         Status Bar (44pt)       │
├─────────────────────────────────┤
│                                 │
│       Workout complete.         │  24pt Bold, white, centered
│                                 │
│  ┌─────────────────────────────┐│
│  │ ┌──────┐ ┌──────┐ ┌──────┐ ││  stat tiles (animated count-up)
│  │ │  42  │ │  5   │ │ 380  │ ││
│  │ │  min │ │exercs│ │ cal  │ ││
│  │ └──────┘ └──────┘ └──────┘ ││
│  └─────────────────────────────┘│
│                                 │
│          ┌───────────┐          │  XP earned badge
│          │   +75 XP   │          │  animated scale-in + glow
│          └───────────┘          │
│                                 │
│   Fitness Lv.12                 │  level display
│   ████████████████░░  (89%)     │  XP progress bar
│                                 │
│  ┌─────────────────────────────┐│
│  │ ● SIA:                     ││  72pt — SIA feedback card
│  │ "Solid session. That's 3    ││
│  │  this week. Your volume is  ││
│  │  up 12% from last week."   ││
│  └─────────────────────────────┘│
│                                 │
│  ┌───────────────────────────┐  │
│  │          Done              │  │  56pt — primary CTA
│  └───────────────────────────┘  │  orange pill
│                                 │
├─────────────────────────────────┤
│  Today  │  SIA  │ Goals │  Me  │  Tab Bar returns
└─────────────────────────────────┘
```

### Component Stack — Planning Mode (top to bottom)

1. **Status Bar** — 44pt
   - Purpose: system status
   - Content: transparent

2. **Detail Header** — 56pt, FIXED
   - Purpose: screen identification, back navigation, options
   - Content: back chevron (left), workout name + subtitle (center-left), overflow menu icon (right)

3. **SIA Coaching Note (compact)** — 56pt
   - Purpose: contextual coaching about this specific workout
   - Content: purple dot + short message
   - 12pt top margin

4. **Exercise List** — ~64pt per exercise × N exercises
   - Purpose: complete exercise plan for the workout
   - Content: numbered list with exercise details
   - 12pt top margin from SIA note

5. **Duration Label** — 32pt
   - Purpose: total estimated time
   - Content: eyebrow "EST. DURATION" + value
   - 32pt top margin

6. **Start Workout CTA** — 56pt + 24pt top margin + 32pt bottom margin
   - Purpose: begin the workout (transitions to Active mode)
   - Content: "Start workout →" orange pill button

7. **Tab Bar** — 56pt + 34pt safe area

### Component Stack — Active Mode (top to bottom)

1. **Status Bar** — 44pt

2. **Progress Bar + Controls** — 40pt, FIXED
   - Purpose: workout progress overview and action buttons
   - Content: "Exercise X of Y" (left), elapsed time (left below), Pause + End buttons (right)

3. **Current Exercise Display** — ~80pt
   - Purpose: large, clear display of current exercise
   - Content: exercise name (24pt Bold, centered) + "Set X of Y" (15pt Regular, white 50%, centered)
   - 24pt top margin

4. **Set Tracker Card** — ~180pt
   - Purpose: input for current set (weight, reps, completion)
   - Content: weight input, reps input, last set reference, "complete set" green button
   - 16pt top margin

5. **Rest Timer** — ~200pt (appears/collapses dynamically)
   - Purpose: countdown between sets
   - Content: circular countdown ring, time display, "skip rest" button
   - 16pt top margin. Appears after completing a set. Collapses when rest ends.

6. **SIA Real-Time Note** — 40pt
   - Purpose: contextual motivational message during workout
   - Content: purple dot + rotating short message
   - 12pt top margin

7. **Next Exercise Preview** — ~48pt
   - Purpose: upcoming exercise awareness
   - Content: "NEXT:" eyebrow + exercise name + sets/reps
   - 16pt top margin

8. **Home Indicator** — 34pt (no tab bar)

### Component Stack — Post-Workout Summary (top to bottom)

1. **Status Bar** — 44pt

2. **"Workout complete." Header** — ~80pt
   - Purpose: victory moment
   - Content: "Workout complete." in 24pt Sora Bold, white, centered
   - 32pt top margin

3. **Stat Tiles Card** — ~100pt
   - Purpose: key performance numbers
   - Content: 3 stat tiles (duration, exercises, calories) with animated count-up
   - 24pt top margin

4. **XP Earned Section** — ~120pt
   - Purpose: RPG reward feedback
   - Content: XP badge (animated), level display, XP progress bar
   - 32pt top margin

5. **SIA Feedback Card** — 72pt
   - Purpose: AI post-workout analysis
   - Content: purple dot + data-driven feedback message
   - 24pt top margin

6. **"Done" CTA** — 56pt + 24pt top margin + 32pt bottom margin
   - Purpose: return to Fitness Dashboard
   - Content: "Done" orange pill button

7. **Tab Bar** — 56pt + 34pt safe area (returns)

---

## Components

### Detail Header
- **Purpose**: screen identification with contextual controls
- **Data source**: workout name, type, duration from workout plan
- **Visual treatment**: fixed bar, ink-900 background
- **Size**: full-width × 56pt
- **Sub-elements**:
  - Back button: left chevron, white, 2pt stroke, 20pt icon, 44×44pt touch target, 16pt from left
  - Workout name: 17pt Sora Semibold, white, left-aligned 56pt from left
  - Workout subtitle: 13pt Sora Regular, white at 50%, below name ("Strength · 45 min")
  - Overflow menu: 3 vertical dots, 20pt, white, 44×44pt touch target, right-aligned 16pt from right. Opens bottom sheet with: "Edit workout", "Delete workout", "Share"
- **Gestures**: back taps pop stack; overflow taps open bottom sheet (z-40)

### Exercise Row (Planning Mode)
- **Purpose**: individual exercise in the workout plan
- **Data source**: exercise data from workout plan
- **Visual treatment**: list row with separator
- **Size**: full-width minus 32pt × ~64pt per row (variable with notes)
- **Sub-elements**:
  - Number: 15pt Sora Semibold, white at 40%, left-aligned
  - Exercise name: 16pt Sora Semibold, white, 32pt from left
  - Details: 13pt Sora Regular, white at 50% ("4 × 8 reps · 90s rest")
  - Coach note (optional): 13pt Sora Regular, italic, white at 40%, below details
  - Separator: 1pt line, white at 10%, full width, below row (not on last item)
- **Variants**:
  - Standard: name + sets/reps/rest
  - With note: adds coach note line
  - Expanded (on tap): shows exercise tips, muscle groups, video thumbnail placeholder
- **Gestures**: tap → expand/collapse exercise details (280ms, ease-out-soft)

### Progress Bar + Controls (Active Mode)
- **Purpose**: workout progress overview and session controls
- **Data source**: current exercise index, total exercises, elapsed time
- **Visual treatment**: fixed bar at top, ink-900 background
- **Size**: full-width × 40pt
- **Sub-elements**:
  - Progress text: "Exercise X of Y" in 13pt Sora Semibold, white, left-aligned 16pt from left
  - Elapsed time: "⏱ MM:SS" in 13pt Sora Regular, white at 50%, below progress text (or same line if space)
  - Pause button: ⏸ icon, 20pt, white, 44×44pt touch target, right-aligned
  - End button: "End" text, 15pt Sora Semibold, white at 50%, 44×44pt touch target, right of pause
- **Variants**: N/A (always visible in active mode)
- **Gestures**: pause tap → present pause overlay; end tap → confirm dialog then summary mode

### Current Exercise Display (Active Mode)
- **Purpose**: large, clear exercise identification during workout
- **Data source**: current exercise from workout plan
- **Visual treatment**: centered text, no card
- **Size**: full-width × ~80pt
- **Sub-elements**:
  - Exercise name: 24pt Sora Bold, white, centered
  - Set progress: 15pt Sora Regular, white at 50%, centered, 8pt below name ("Set 2 of 4")
- **Variants**: updates on exercise change (crossfade, 280ms)
- **Gestures**: none (display only)

### Set Tracker Card (Active Mode)
- **Purpose**: input for logging current set — weight and reps
- **Data source**: previous set data (pre-fills inputs), current exercise prescription
- **Visual treatment**: ink-brown-800 card, r-xl (28pt), 16pt internal padding
- **Size**: full-width minus 32pt × ~180pt
- **Sub-elements**:
  - Weight input: 52pt height, ink-900 background, 1pt border white at 10% (default), 2pt Burnt Orange (focused), r-md (14pt). "Weight" eyebrow label above (11pt Semibold, white at 40%, uppercase). Value in 20pt Sora Semibold, white, centered. Numeric keyboard. Pre-filled with last set's weight.
  - Reps input: same spec as weight. "Reps" label. Pre-filled with prescribed reps.
  - Layout: side-by-side, each 50% card width minus 4pt gap
  - Last set reference: "Last set: 85 lbs × 8" in 13pt Sora Regular, white at 40%, left-aligned, 8pt below inputs
  - "Complete set" button: 48pt height, full card content width, Forest Green (#34A853) fill, white text "Complete set ✓" in 16pt Sora Semibold, r-pill. 16pt top margin from reference line.
- **Variants**:
  - First set: reference line shows prescribed values instead ("Prescribed: 85 lbs × 8")
  - Last set: reference line includes motivational text ("Final set — give it everything")
  - Set completed: brief green glow (600ms), button text changes to "Set logged ✓" for 280ms before resetting for next set
- **Gestures**: tap input fields → numeric keyboard opens; tap "complete set" → log set data, trigger rest timer, advance set counter

### Rest Timer (Active Mode)
- **Purpose**: countdown between sets with auto-start
- **Data source**: prescribed rest time for current exercise
- **Visual treatment**: centered circular countdown ring
- **Size**: full-width × ~200pt (collapses to 0 when not active)
- **Sub-elements**:
  - Circular ring: 120pt diameter, centered — a bounded `GaugeRing` (`VK-002`), since rest is a true 0→1 completion of the prescribed interval. Track: `--color-alpha-white-10` over a `--track-inset` `rgba(0,0,0,0.28)` (mint) recessed ring, 10px stroke. Fill: arc-following `--grad-orange` (mint, conic-mask — not a flat SVG linearGradient), 10px stroke, round caps both ends, `--glow-orange` (32px, hero-size) outer glow; depletes (full→empty) as the interval elapses, sweeping counterclockwise from 12 o'clock; flashes green `#34A853` at 0. See Visualization `S27-V03`.
  - Time display: 32pt Sora Semibold, white, centered inside ring. Format "M:SS" (e.g., "1:23")
  - "REST" label: 12pt Sora Semibold, white at 40%, uppercase, centered above ring
  - "Skip rest" button: 15pt Sora Regular, white at 50%, centered below ring, 44pt touch target
- **Behavior**:
  - Auto-starts immediately when "Complete set" is tapped. No user action needed.
  - Counts down from prescribed rest time.
  - When timer reaches 0: medium haptic vibration, ring flashes green (#34A853) briefly (280ms), timer area collapses (280ms, ease-out-soft)
  - During countdown: set tracker card dims to 0.6 opacity (stays visible for reference). When rest ends, tracker returns to full opacity.
  - Expand animation: height 0→200pt over 280ms, ease-out-soft
  - Collapse animation: height 200pt→0 over 280ms, ease-out-soft
- **Gestures**: tap "skip rest" → end timer early, collapse immediately

### SIA Real-Time Note (Active Mode)
- **Purpose**: contextual motivational messages during workout
- **Data source**: AI-generated based on workout progress
- **Visual treatment**: compact inline note with purple indicator
- **Size**: full-width minus 32pt × 40pt
- **Sub-elements**:
  - Purple dot: 6pt circle, #7F24FF, 16pt from left
  - Message: 13pt Sora Regular, white, left-aligned 28pt from left, max 1 line
- **Message rotation** (contextual, one visible at a time):
  - Final set of exercise: "Last set. Push through."
  - First set of new exercise: "New exercise. Take your time on the first set."
  - Midpoint of workout: "Halfway through. Strong pace."
  - Last exercise: "Final exercise. Almost done."
  - After heavy set: "Solid lift. Rest up."
- **Animation**: messages fade in + translateY(8→0) over 280ms, fade out before next message
- **Gestures**: none (display only, not tappable in active mode)

### Pause Overlay (Active Mode)
- **Purpose**: pause the workout with option to resume or end
- **Visual treatment**: semi-transparent overlay on top of active mode content
- **Size**: full screen
- **Sub-elements**:
  - Backdrop: ink-900 at 60% opacity
  - "Paused" text: 24pt Sora Bold, white, centered
  - Elapsed time: 17pt Sora Regular, white at 50%, centered, 8pt below
  - Resume button: 56pt, Burnt Orange, "Resume" in 17pt Semibold white, r-pill, full-width minus 32pt. 32pt below time.
  - End Workout button: 44pt, transparent background, "End workout" in 15pt Sora Regular, white at 50%, centered. 16pt below Resume.
- **Enter**: fade in backdrop + scale content from 0.95→1.0, 280ms
- **Exit (resume)**: fade out, 280ms. Timers resume from where they paused.
- **Exit (end)**: fade out, transition to summary mode

### XP Earned Badge (Summary Mode)
- **Purpose**: RPG reward visualization
- **Data source**: XP earned calculation from workout performance
- **Visual treatment**: badge with glow effect
- **Size**: auto-width × auto-height (~48pt)
- **Sub-elements**:
  - Badge: Burnt Orange (#FF5E00) background at 15% opacity, r-pill, 16pt horizontal / 8pt vertical padding
  - Text: "+75 XP" in 20pt Sora Semibold, Burnt Orange
  - Glow: --glow-orange behind badge
- **Animation**: scale from 0.5→1.0 with orange glow pulse, 520ms, ease-flow
- **Below badge**:
  - Level label: "Fitness Lv.12" in 15pt Sora Semibold, white, left-aligned
  - XP progress bar: full-width minus 32pt, 8pt height, r-pill. Track: white at 8%. Fill: Burnt Orange. Animates from old position to new position (520ms, ease-flow).
  - Percentage: "(89%)" in 13pt Sora Regular, white at 50%, right-aligned

---

## Visualization

> Source: `app_design 3/27-workout-detail-active-workout-visualization-recommendations.md` (companion, if present); Audited in `viz-audit/` — Batch (Tracker B), findings `S27-V01..S27-V06`. All primitives are from `viz-audit/VIZ-KIT.md` at `viz-audit/CONSISTENCY.md` parameters. Premium-depth, on-brand (60/30/10), **Product Mode → orange-dominant accent** (fitness-red `#EF4444` stays an *identity* accent on the inherited domain header / level chrome only — never on data ink). Benchmark = **Strava + WHOOP** (live activity HR/pace, post-session effort & zones) rendered **the Balencia way** (Living Line + warm-glow ArcGauge/GaugeRing), not a Strava/WHOOP clone. **Current grade D (52) → specced-target A− (86).** *(Honest re-grade under the revised 10-dimension rubric. Today the prototype renders the active tracker + a text-tile summary with a single **hardcoded** flat rest-ring (`progress = 0.62`, `aria-hidden`, no gradient/glow/inset, bound to no real value) — a decorative-chart + 1.4.11 + colour/visual-only miss — and **no** HR, pace, effort gauge, weekly context, or XP ring at all. The residual gap to A+++ is build-verified depth + working scrub/drill micro-interactions, owned by the later viz-build program.)*

This is a **Tracker B** screen with a real-time face (Active mode) and a reward face (Summary). Its data has genuine, distinct visual shapes per mode — but it is **not** a dashboard, so editorial restraint governs: the Active mode earns **exactly one** focal live trend (heart-rate Living Line) over two honest KPI tiles; the rest timer becomes a real **bounded GaugeRing** (it is a true 0→1 completion of the rest interval); the Summary earns **one** effort hero (`ArcGauge` — effort/zone is a *level*, not a completion) plus an honest XP-progress ring and a small zone split. Planning mode stays **deliberately textual** (an exercise list is a list, not a chart). Mints no new primitive; it retires kit backlog (`TrendChart`/`Living Line`, `KPIStatTile`, `GaugeRing`, `ArcGauge`, `Donut`, `BarChart`).

### Visualized-vs-text map

| Datum (shown / implied) | Today | Specced visual | Primitive |
|---|---|---|---|
| Real-time heart rate (active session) | not shown (no HR in mock) | **live `TrendChart` Living Line** of HR over elapsed time — solid orange→green stroke that draws as the session runs; zone bands behind | `TrendChart` (`VK-006` / `VK-016`) |
| Live pace / cadence (active) | not shown | **2× `KPIStatTile`** — current pace + cadence, honest "live" label (not a cherry-picked window) | `KPIStatTile` ×2 (`VK-008`) |
| Rest interval remaining (1:23 of prescribed) | hardcoded flat ring, `progress=0.62`, `aria-hidden`, no depth | **bounded `GaugeRing` (120px)** — arc-gradient + inset track + size-stepped glow, fill = elapsed/total of *this* rest, green flash at 0 | `GaugeRing` (`VK-002`) |
| Post-workout effort / training zone | not shown | **hero `ArcGauge` (160px)** — effort score (a bounded *level*, open arc, never a false 100% ring); orange default, green at peak band, **never alarm-red** | `ArcGauge` (`VK-015`) |
| Time-in-zone split (Z1–Z5 of session) | not shown | **`Donut` (96px)** — minutes per zone summing to true session duration; primary/longest zone = orange, rest = warm neutral tints | `Donut` (`VK-007`) |
| XP earned (+75) → level progress (89%) | spec'd badge+bar, **not built** | **XP-progress `GaugeRing` (96px)** around the +75 badge — honest fraction to next level; green at 100% (level-up → Celebration [42]) | `GaugeRing` (`VK-002`) |
| Duration · exercises · calories (summary) | three plain text tiles | **3× `KPIStatTile`** — number + label + honest vs-last-session delta ("vs last upper-body") | `KPIStatTile` ×3 (`VK-008`) |
| This-vs-last-session volume (optional, high-motivation) | not shown | optional **`BarChart`** — this orange / last green, zero baseline, shared scale | `BarChart` (`VK-006`) |
| Exercise list / sets·reps·rest / coach notes (planning) | text list | — (**deliberately textual** — a plan is a list, charting it is over-resolution) | — |
| Set tracker inputs · last-set reference · SIA notes · workout name | text/inputs | — (**deliberately textual** — interaction surface, not data viz) | — |

**Editorial hierarchy (calm, not maximal):** Active mode has **one** focal viz (the HR Living Line) with two supporting KPI tiles and the functional rest GaugeRing — it must stay legible mid-set, so it is *not* a wall of charts. Summary has **one** hero (the effort `ArcGauge`) with the XP ring, zone donut, and KPI strip clearly secondary. Planning mode has **zero** charts by design.

### 1 · Live heart-rate trend — `S27-V01` → `TrendChart` (Living Line, `VK-016`)

The Active-mode focal viz: a **Living Line** of heart rate across the session — one continuous, curved, round-capped stroke that **draws itself** as elapsed time advances (append-on-tick, not opacity-fade), running orange `#FF5E00` (effort) → green `#34A853` (in recovery/cooldown) via `--grad-progress` **(mint)**, `--stroke-base` 4px, with **faint horizontal zone bands** behind (Z1–Z5 as `--color-alpha-white-05` strips — decorative structure, not load-bearing). No SIA projection here (a live feed has no forecast tail — correct; purple is absent in this mode). Sits in a compact card under the current-exercise display so it never displaces the set tracker.
- **Depth (token-backed):** `ink-brown-800` backplate + top-edge highlight; the stroke carries **no glow at this card size** (glow is reserved for the Summary hero); current-HR end point = a small live dot.
- **Why the line, not a WHOOP strain bar:** "every chart is the line" (§8) — the Living Line is the device WHOOP/Strava structurally don't have; it makes the live trend unmistakably Balencia and reuses the exact spine of the home-screen sparklines and the Fitness-dashboard activity trend [26].
- **Micro-interaction:** long-press to scrub a crosshair back across the session (read HR at any past second); no W/M/Y selector (single live session).
- **States:** **no wearable / no HR** → the card is **omitted entirely** (not a flat-zero line) and pace/cadence tiles read "—"; **<10s of data** → "reading your heart rate…" with a faint baseline, never a single dot; **sensor dropout** → the gap is **ghosted/dashed**, distinct from a real flatline; **reduced-motion** → completed stroke at rest + live end dot.
- **Data:** new `workoutDetail.activeSession.hrSeries` (timestamped bpm) + `zones` in `mock.ts` (absent today).

### 2 · Live pace / cadence tiles — `S27-V02` → `KPIStatTile` ×2

Beside or below the HR line, two `KPIStatTile`s: uppercase label (`white/40`, +0.12em) · number `text-h2` · a small live-trend delta over a **disclosed** window (e.g. "vs last 30s" — never a flattering cherry-pick). Current pace (or rep-tempo for strength) + cadence. Count-up `--dur-base` 280ms `--ease-out-soft` on each update.
- **Depth:** flat-premium tiles (no glow); `ink-brown-800` + top-edge highlight.
- **Non-shaming:** a slowing pace shows a **neutral muted** ▼ (`--color-alpha-white-40`), never red or "falling behind" language.
- **States:** strength workout (no pace) → tiles swap to "volume lifted" + "reps" (honest substitution, not blank); no sensor → "—".

### 3 · Rest GaugeRing — `S27-V03` → `GaugeRing` (120px)

Replace the **hardcoded flat ring** (today: a fixed `progress=0.62`, `aria-hidden`, single-tone orange) with a real **bounded `GaugeRing`** — rest *is* a true 0→1 completion of the prescribed interval, so a full ring is honest here: **arc-following `--grad-orange` (mint)** stroke (conic-mask, *not* a flat SVG `linearGradient`), `--track-inset` `rgba(0,0,0,0.28)` **(mint)** beveled track under the `--color-alpha-white-10` track, 10px stroke, `--glow-orange` (32px, hero-size), center `M:SS` count (`text-display`, tabular-nums), "REST" eyebrow above. Fill animates from full→empty as the interval elapses; **flashes green `#34A853` at 0** (arrival/done — already in the spec's Motion table) then collapses.
- **Why a ring, the Balencia way:** the rest interval is the one genuinely *completable* bounded value on this screen — it gets the GaugeRing (full ring); effort, a *level*, gets the open `ArcGauge` instead, so the two never look interchangeable.
- **Micro-interaction:** the existing "Skip rest" affordance (≥44pt) ends it early and collapses the ring.
- **States:** appears only after a completed set (height 0→200pt); reduced-motion → ring at current fill, no sweep, green-at-zero still fires as a state change.
- **Data:** `workoutDetail.activeSession.restRemaining` + a new `restTotal` so the fraction is real (today only the remaining string exists).

### 4 · Effort / zone hero — `S27-V04` → `ArcGauge` (160px, `VK-015`)

The Summary's **one viz hero**: an **open `ArcGauge`** (240° sweep, open foot at the bottom — *never* a closed ring, because effort is a bounded **level**, not a completion that would falsely imply "100% done"). Arc fill = arc-following `--grad-orange` **(mint)** via **conic-mask**, `--glow-orange-md` (~20px **mint**) on the 160px hero (never the full 32px on an open arc), `--track-inset` **(mint)** under the `--color-alpha-white-10` track, round caps both ends, 12 decorative radial ticks (`--color-alpha-white-25`, perceptual-only), center value `text-display` + faint `--glow-orange-sm`, a zone word below in identity colour ("Peak" / "Tempo" / "Easy").
- **Non-shaming (ethical core):** a **low** effort reading is **never recoloured to alarm-red** — it shows a rest/recovery glyph + a constructive line ("a lighter session still counts"), per `VK-015`. Status carried by number + glyph + word, never colour alone. Green appears only at the top/in-range band.
- **Micro-interaction:** tap the gauge → expand a per-zone breakdown sheet (feeds the zone donut below).
- **States:** no HR captured → effort shown as a **derived** value from RPE/volume with a "estimated" label (honest), or omitted with the donut if no zone data; cold-start → arc at rest on a ghosted min-foot, center "—".
- **Data:** new `workoutDetail.summary.effort` (0–100 + zone) in `mock.ts`.

### 5 · Time-in-zone donut + XP ring — `S27-V05` → `Donut` (96px) + `GaugeRing` (96px)

Two part-of-whole / progress visuals in the Summary, clearly secondary to the effort hero:
- **Zone `Donut` (96px):** minutes spent per HR zone, slices **summing to the true session duration** (never a padded total — RUBRIC dim 5); **longest/primary zone = `--color-brand-orange`**, remaining zones = warm neutral tints (`--color-alpha-white-40 / -20`), **never rainbow, never purple**; 2px slice gap (carved separation), center hub = total minutes; arcs **draw clockwise from 12 o'clock, largest→smallest**. A 0-minute zone is **omitted**, never a zero-width wedge.
- **XP-progress `GaugeRing` (96px):** wraps the existing **+75 XP** badge as an honest fraction-to-next-level ring (today the spec describes a flat `XP bar` at 89% — this promotes it to the kit's instrument family so XP reads like every other bounded score in the app): orange arc-gradient over `--track-inset`, `--glow-orange-md`, fills old%→new% (520ms `--ease-flow`), **green at 100%** → triggers Celebration [42] (level-up), per the existing summary sequence.
- **A11y:** donut `aria-label` enumerates every zone's minutes + %; XP ring `aria-label` "Fitness level 12, 89 percent to level 13."
- **States:** no zone data → donut omitted (not a single-slice 100% lie), XP ring still shown; reduced-motion → full arcs + ring at final value instantly.
- **Data:** new `workoutDetail.summary.zoneMinutes` + reuse `summary.xpEarned` / `xpProgress`.

### 6 · Summary KPI strip + optional volume bars — `S27-V06` → `KPIStatTile` ×3 (+ optional `BarChart`)

Replace the three **plain text tiles** (duration / exercises / calories) with `KPIStatTile`s carrying an **honest vs-last-session delta** ("vs last upper-body session" — a fixed, disclosed window, not a flattering pick). **High-motivation tier only:** a small `BarChart` of this-session vs last-session volume — **this-session orange, last-session green** (§11 compare law), **zero baseline, one shared y-scale** (no truncated/dual axis).
- **Depth:** flat-premium KPI tiles (no glow); bars rise 520ms `--ease-flow`, rounded caps, no glow (glow stays on the effort hero).
- **Non-shaming:** a ▼ delta (fewer exercises than last time) is a neutral muted arrow + "vs last" framing — never "you did less," never red; the summary celebrates *showing up* (per Motivation Adaptation).
- **States:** first-ever session → deltas read `—` (no prior session to compare — honest, not a fabricated ▲); loading → label + skeleton number.

### Motion choreography (entrance — draw-first order)

**Active mode (live):** the HR **Living Line draws itself** L→R as the session streams (`stroke-draw` spine, append-on-tick, *never* opacity-fades — §8) → pace/cadence `KPIStatTile`s count-up on each update (280ms) → the rest **GaugeRing** appears only on set-complete (height 0→200pt, then ring fills/empties over the real interval, green flash at 0). One line motif per surface (the HR line is the only Living Line in this mode).

**Summary mode (the signature reward sequence — extends the existing 1200ms+ choreography):** "Workout complete." fades in → KPI tiles count up (800ms) → **effort `ArcGauge` fills 0→value** (`ring-animate` 520ms `--ease-flow`, hero draws first among the viz) + center count-up → **zone `Donut` arcs draw** clockwise largest→smallest → **XP `GaugeRing` fills** old%→new% with the +75 badge scale-in + glow pulse → SIA feedback → "Done". Below-fold visuals animate on **scroll-into-view**. `prefers-reduced-motion` → every chart at final state instantly; the Living Line's static form (completed stroke + live/end dot), the ArcGauge's filled open arc, the donut's full arcs, and both rings' filled arcs are all preserved.

### States, brand & accessibility

- **States (all designed, per RUBRIC dim 7):** **cold-start / Day-1** — Active HR card omitted behind a "connect a heart-rate sensor" affordance (never a flat-zero line), pace/cadence "—"; Summary effort `ArcGauge` derived-from-RPE with an "estimated" label or omitted, KPI deltas read `—` (no prior session), XP ring shown from real XP. **Loading** — depth-preserving skeletons that *morph* into drawn data (ring arcs, donut ring, gauge track, axes visible; radial/L-to-R shimmer — never blank discs). **Partial** — sensor dropout in the HR line is **ghosted/dashed** (distinct from a real flatline); a zone with 0 min is omitted (not a phantom wedge). **Error** — chart-specific honesty (e.g. "Could not read heart rate" on the HR card only, summary tiles independent) + a visible "retry", per the Error Handling table; the active **set-log queue** is unaffected (the critical path stays functional).
- **60/30/10:** **orange dominates** data ink (HR-line effort segment, rest GaugeRing fill, effort ArcGauge, primary zone slice, XP ring, this-session bars, KPI accents); **green** = arrival/in-range only (HR cooldown segment, rest-complete flash, peak-effort band, milestone, XP at 100%, last-session compare bars per §11, ▲ deltas); **purple stays SIA-only** and is **absent from every chart on this screen** (no projection on a live/completed session — correct) — the only purple is the existing SIA-note dot; **fitness-red `#EF4444`** is confined to inherited domain/level **identity chrome**, **never** on a CTA, eyebrow, or data series, and a low effort is **never** recoloured red (`VK-015` non-shaming). Glow uses the size-stepped scale (160px ArcGauge = `--glow-orange-md`, 120px rest ring = 32px hero glow, 96px XP ring/donut = md, HR line / KPI tiles = none) — warm depth, not neon.
- **Accessibility:** every gauge/line/donut/ring/tile carries a text/`aria-label` equivalent conveying the same value ("Heart rate 142 beats per minute, zone 4"; "Effort 78 of 100, peak"; "Rest, 1 minute 23 seconds remaining") — fixing the current `aria-hidden` rest ring that exposes **no** value to AT; status uses a **visible glyph + word** (zone word, effort glyph, ▲/▼ delta), never colour alone; label/value contrast ≥ 4.5:1 on `#0A0A0F`/`#211008`; **WCAG 1.4.11** — the HR stroke, rest-ring arc, ArcGauge arc + filled/track boundary, donut slice boundaries, XP-ring arc, and all status glyphs meet ≥3:1 vs background (the Z1–Z5 band strips and radial ticks are decorative-only, exempt); interactive chart targets (skip-rest, gauge-tap, scrub) ≥ 44×44pt; live regions announce HR-zone changes and rest-complete (`aria-live`, already partially present); `prefers-reduced-motion` renders all at final state with signature static forms preserved.

Conform to `viz-audit/CONSISTENCY.md`.

---

## Premium Craft

**Profile:** data · **Cluster benchmark:** Strava + WHOOP (active/summary mode split — redesign candidate) — *stays Balencia via the Living-Line HR trend + warm-glow surfaces on ink-brown, the green-flash rest-ring completion, and non-shaming effort framing, not a WHOOP/Strava clone.*
**Pre-grade:** A− (86) · **Post-grade (this section):** A++ (96)

Pre-grade drivers (the gap to A++): the A− Visualization section specced premium data depth (Living Line HR chart, GaugeRing rest timer, ArcGauge effort hero, honest zone donut, XP ring), but (1) non-chart surfaces (set tracker card, SIA notes, the pause overlay) are flat `--color-ink-brown-800` with no top-edge highlight or depth cues; (2) microcopy on edges (rest timer completion, effort low-reading, loading states) is partly unwritten, and error recovery strings lack specific coaching tone; (3) the multi-mode transition (Planning → Active → Summary) lacks explicit motion choreography beyond "content crossfade"; (4) interaction states on the inputs (weight/reps fields) are listed but not depth-reconciled; (5) the set-logged success moment ("Set logged ✓") is a bare text swap with no glow feedback to match the visual depth of the rest-ring's green flash.

### Focal hierarchy

One focal point per mode, shifts across the three modes. **Planning mode:** the "Start workout →" CTA (56pt orange pill) — the action that unlocks the active experience, sized as a hero, positioned at mid-scroll so the exercise list above it anchors the read. The SIA note sits above as a preamble, visually quiet (body type, no glow). **Active mode:** the current exercise name (24pt Bold, white, centered) + the Set Tracker Card (180pt, the interactive surface) form the focal pair — the exercise name is read first, the set tracker receives all interaction. The rest GaugeRing appears below when active (after a set is completed) and becomes secondary to the set tracker. The HR Living Line sits in a compact card to the left, clearly secondary by position and size. **Summary mode:** the effort ArcGauge (160pt, hero) is the focal element — the visual reward for completing the workout. The XP badge (+75 XP) scales into prominence next, then the zone donut. The KPI stat tiles (duration/exercises/calories) sit above and are secondary by position. Everything below (SIA feedback, the "Done" button) is tertiary. Each mode has exactly one clear focal read when scanned in <2s.

### Surface & depth

Every card adopts `CK-P1` Layered Warm Surface — `--color-ink-brown-800` body · `--radius-xl` (28pt on primary cards) · 1pt `--glass-border` · **`--edge-highlight` top-edge highlight** (`CK-T01`, the not-flat cue) · `--shadow-1`. Applied to: Set Tracker Card (Active mode), SIA Coaching Note (Planning + Active), SIA Feedback Card (Summary), Rest Timer card container, and the stats tiles card (Summary). The Detail Header floats on `--color-ink-900` (fixed, z-10). The profile section (Sticky header in Planning, Progress bar + Controls in Active) uses no card surface, sitting on `--color-ink-900` directly. Glow is size-calibrated per `CONSISTENCY.md §1`: **no glow** on the Set Tracker Card (180pt, but the inputs are <36px inline elements — glow reserved for the data-viz layer); **`--glow-orange-sm`** (~12px) on the rest timer card's GaugeRing if it carries a brief success state; **no glow** on the SIA notes (body-text cards); **`--glow-orange`** (32px hero glow) is delegated to the data-viz layer (the HR Living Line at full width, the effort ArcGauge, the XP-progress GaugeRing — all in the Visualization section, not the craft surface layer). The pause overlay carries a semi-transparent `--color-ink-900` at 60% backdrop with 0 glow (an overlay, intentionally calm). Track language (rest GaugeRing, XP progress ring via the Visualization section, and the horizontal Living-Line XP bar if present in the summary KPI tiles) uses `--track-inset` (`rgba(0,0,0,0.28)`) beveled recess under `--color-alpha-white-10` for the track fill, never flat. No surface reads as a flat box; depth is the consistent language.

### Typographic rhythm

Map the Typography table to `CK-P3` tokens. Detail header workout name `--text-h3` (17pt) / 600 / `--leading-snug` (1.25) / white 100%; subtitle "Strength · 45 min" `--text-caption` (13pt) / 400 / `--leading-normal` (1.4) / white 50%. Current exercise name (Active, centered) `--text-display-l` (32pt) / 700 / `--leading-tight` (1.1) / white 100% (raised from 24pt Bold per the spec to meet the display-scale cadence for a focal element). Set progress "Set X of Y" `--text-h3` (17pt) / 600 / white 50%. Input eyebrow ("Weight", "Reps") `--text-eyebrow` (12pt) / 600 / uppercase / white-40 / `--tracking-eyebrow` (0.12em). Input value `--text-h2` (20pt) / 600 / `--leading-snug` / white 100%, tabular-nums. Rest timer "REST" label `--text-eyebrow`; time display "1:23" `--text-display-l` (32pt) / 700 / `--leading-tight` / white 100%, tabular-nums, font-variant: tabular-nums. Section eyebrows ("EXERCISES", "EST. DURATION", "NEXT:") the `.eyebrow` recipe (12pt / 600 / uppercase / white-40 / +0.12em tracking). SIA note text `--text-body` (16pt) / 400 / `--leading-normal` (1.4). "Workout complete." header (Summary) `--text-display-l` (32pt) / 700 / `--leading-tight`. Stat figures (42 min, 5 exercises, 380 cal, +75 XP) tabular-nums, `--text-h2` / 600 / white 100%. Hierarchy is carried by **weight** (600–700 vs 400), not size alone. Sentence case throughout. ≤2 `--color-brand-orange` accent words on the screen (the orange on the CTA buttons and the set-logged success glyph ✓; no undue orange spreads to every label). Chillax stays logo-only. Replaces ad-hoc pixel line-heights with the `CK-T04` scale (`--leading-tight / snug / normal / relaxed`), always paired with the size.

### Microcopy (before → after)

All user-facing copy authored to `CK-P5` brand voice: warm, conversational, coached, sentence case, no exclamation marks, the brand period with intent.

- **Planning mode SIA note** — *before:* "Good pairing with yesterday's cardio." → *after (kept):* same; warm, specific, coaching. Already on-voice.
- **Active mode set-complete success** — *before:* "Set logged ✓" text swap only → *after:* text swaps + a brief `--glow-green` flash (600ms) so success reads with the same visual depth as the rest-ring green moment.
- **Active mode rest timer completion** — *before:* green flash + collapse → *after (kept):* same; the glyph + green flash + haptic are the signals; no user-facing text needed on completion.
- **Active mode SIA real-time notes** — *before:* "Last set. Push through." / "Final exercise. Almost done." etc. → *after (kept):* same; warm, contextual, never shaming. Already on-voice.
- **Active mode disabled inputs (weight = 0, reps = 0)** — *before:* no message → *after (new):* "Enter weight and reps to log the set" (13pt Sora Regular, white-50, below the field; warm, action-oriented).
- **Active mode loading state** — *before:* no message → *after (new):* skeleton input with "Reading your last set…" (white-40); morphs into populated form.
- **Summary mode stat tile delta** — *before:* "42 min" bare number → *after (new):* count kept, + small meta line "vs last upper-body +8 min" (13pt, white-40) with neutral ▲/▼ arrow (white-40, never red; frames motion, not judgment).
- **Summary mode SIA feedback** — *before:* "Solid session. That's 3 this week. Your volume is up 12% from last week." → *after (kept):* same; warm, specific, data-driven. Already on-voice. Variant for low-motivation: "You showed up. That's what matters." (non-shaming).
- **Error state, set-log failure** — *before:* no message → *after (new):* button red border + toast "Saving…" (white-40) → (failure) "Couldn't save this set — you're offline. It will sync when you reconnect." (specific, recovery named, non-blaming).

No exclamation marks; the brand period used with intent on the "Workout complete." moment. All SIA copy is specific to the user's data, never a horoscope.

### Motion choreography

Locked to `CK-P4` order (draw-first). **Planning mode:** SIA note fades in (280ms) → exercise rows stagger in (280ms each, 40ms stagger) → CTA fades in (280ms) → eyebrows on scroll-into-view. **Planning → Active:** content crossfade below header (520ms ease-out-soft). **Active mode:** on set-complete, button flashes `--glow-green` (600ms) → text swaps "Set logged ✓" (280ms fade) → set tracker dims (280ms) → rest GaugeRing grows (0→200pt, 280ms) and depletes real-time (synchronized with timer duration) → at 0, ring flashes green (280ms) → collapses (280ms) → set tracker restores (280ms). SIA notes rotate (fade + translateY, 280ms each). Exercise name crossfades on change (280ms). **Active → Summary:** full screen crossfade (520ms) → stat tiles count (520ms at offset 520ms) → effort ArcGauge draws (520ms at offset 800ms) → zone Donut draws (520ms at offset 1000ms) → XP ring fills + badge scales (520ms at offset 1200ms) → SIA feedback fades in (280ms at offset 1500ms) → "Done" fades in (280ms at offset 1700ms). `prefers-reduced-motion`: all instant; settled final states preserved (complete line, filled arcs, rings at final fill, stat values at final number). No essential info lost.

### State craft

| State | Layout | Copy (on-voice) | Depth / brand |
|---|---|---|---|
| Cold-start / Day-1 | SIA-generated starter workout (5 exercises, conservatively weighted). HR card hidden if no wearable. Summary: effort ArcGauge derived from RPE or omitted. | "Your first workout. No pressure — just show up and move." Summary: "You showed up. That's what matters." | SIA note genuinely warm. Effort (if rendered) labeled "estimated". No degenerate empty states; rings always shown at starting values. |
| Loading / fetching | Set tracker skeleton inputs + "Reading your last set — one moment." below. Rest timer skeleton ring with shimmer. | "Reading your last set — one moment." | Skeleton on `--color-ink-brown-800`, radial shimmer, morphs into real values. Depth preserved (layout doesn't shift). |
| Empty / partial | Planning: same as cold-start. Active: HR card omitted (not rendered); pace/cadence show "—". Summary: effort omitted if no data; zone Donut omitted. KPI tiles always shown. | Active: "Sensor not available" (white-50) below pace/cadence if no HR. Summary: "Effort couldn't be calculated" with "log it manually" link. | no-data ≠ zero. Missing HR is visually distinct from flatline. Ghosted/dashed tracks per Visualization. |
| Error | Set button red border. Toast "Saving…" → (failure) persistent: "Couldn't save this set — you're offline. It will sync when you reconnect." Set tracker remains interactive. | "Saving your set…" → (success) silent. (failure) "Couldn't save this set — you're offline. It will sync when you reconnect." | Calibrated `--color-error-red` only on genuine failure. Glyph + word paired, never colour-alone. Actions enabled (pause/end/log another). |
| Offline / backgrounded | Timers pause/resume automatically. If app killed: "Resume your workout?" prompt (orange Resume, secondary Discard). Set data persisted. | "Resume your workout?" (simple, clear). Resume succeeds silently. | Cached state retained; prompt is the affordance. |

### Signature & anti-generic

Ownable moments: the **green-flash rest-ring completion** (arrival signal on a functional timer, the Balencia signature); the **warm-glow surfaces on ink-brown-800** (every card uses `--edge-highlight` + layered depth, not flat boxes); the **orange-→-green effort ArcGauge** (Living-Line journey on an open arc, never a false closed ring); the **non-shaming language** on low-effort and partial-completion states (framed as state + constructive next step, never guilt or red recolouring). Anti-generic fixes: **multi-mode screen is a deliberate state machine** (not generic form-submit-view); **set tracker pre-fills from last set** (contextual, supportive, "Last set: 85 lbs × 8"); **SIA real-time notes contextual to position** ("Final exercise. Almost done." on last set); **pause overlay calm**, no urgency or coercion; **restrained summary celebration** (warm, no cartoon confetti, no hyperbole); **effort never recoloured to alarm-red** (non-shaming per VK-015); **no generic-app moves here** — unmistakably Balencia.

### Accessibility

Tabulated load-bearing contrast pairs:

| Element | Color | Contrast |
| --- | --- | --- |
| Current exercise name (24pt Bold) | white 100% | ≥12:1 |
| Set progress "Set 2 of 4" | white 50% | ≥4.5:1 |
| Input labels ("Weight", "Reps") | white-40 | ≥4.5:1 |
| Input values | white 100% | ≥12:1 |
| Rest timer "REST" | white-40 | ≥4.5:1 |
| Rest timer countdown "1:23" | white 100% | ≥12:1 |
| "Complete set" button | `--color-forest-green` | ≥3:1 (WCAG 1.4.11) |
| SIA note text | white 100% | ≥12:1 |
| Section eyebrows | white-40 | decorative, paired with position |
| Stat figures (42 min, +75 XP) | white 100% | ≥12:1 |
| "Done" CTA | `--color-brand-orange` | ≥3:1 (WCAG 1.4.11) |

Status never colour-alone: set-logged success shows green glyph ✓ + text + haptic; rest-ring green flash + haptic (medium vibration); error shows red border + alert glyph + text. All interactive elements use `--focus-ring` (`CK-T03`, 2pt orange, 2pt offset) uniform app-wide. Targets ≥44×44pt. Input fields labelled with `aria-label` (current value announced). Rest timer aria-label updates real-time. SIA notes announced on rotation. Set-logged confirmed announced. Mode entries announced. Reduced-motion: HR line at final state; ArcGauge arc drawn instantly; Donut arcs at final state; stat numbers at final values; XP ring at final fill; all staggered entrances instant. "Set logged ✓" appears without glow animation, but green button persists. No essential info lost; signature static forms preserved.

Conform to `design-audit/CONSISTENCY.md`.


## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | base |
| Card surfaces | #211008 | ink-brown-800 | set tracker, SIA notes |
| "Start workout" CTA | #FF5E00 | burnt-orange | 60% — primary CTA |
| "Done" CTA | #FF5E00 | burnt-orange | 60% — primary CTA |
| "Complete set" button | #34A853 | forest-green | 30% — completion action |
| Rest timer ring fill | #FF5E00 → #FF8A3D | burnt-orange (`--grad-orange`, mint) | 60% — arc-following gradient over `--track-inset`, `--glow-orange` (32px); see Visualization S27-V03 |
| Rest timer completion flash | #34A853 | forest-green | 30% — success state |
| XP badge text + glow | #FF5E00 | burnt-orange | 60% — reward accent |
| XP bar fill | #FF5E00 | burnt-orange | 60% — progress |
| SIA purple dot | #7F24FF | royal-purple | 10% — AI indicator |
| Exercise number | #FFFFFF at 40% | white-40 | tertiary |
| Exercise name | #FFFFFF | white | primary text |
| Exercise details | #FFFFFF at 50% | white-50 | secondary |
| Coach note | #FFFFFF at 40% | white-40 | tertiary, italic |
| Set progress text | #FFFFFF at 50% | white-50 | secondary |
| Current exercise name | #FFFFFF | white | primary, 24pt Bold |
| Input field labels | #FFFFFF at 40% | white-40 | eyebrow |
| Input field values | #FFFFFF | white | 20pt Semibold |
| Input field border (default) | #FFFFFF at 10% | white-10 | subtle |
| Input field border (focused) | #FF5E00 | burnt-orange | active indicator |
| Pause overlay backdrop | #0A0A0F at 60% | ink-900-60 | overlay |

**60/30/10 verification**: orange on CTAs (start, done), timer ring, XP badge, input focus borders. Green on "complete set" button and timer completion flash — appropriate for completion/success actions (30% role). Purple limited to SIA dot indicators. Clean separation maintained.

---

## Interaction States

### "Start Workout" CTA
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Burnt Orange fill, white text, r-pill | — |
| Pressed | darker orange (#E05400) + scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity | — |
| Loading | white spinner replaces text | — |
| Error | N/A | — |
| Success | green glow (600ms) as mode transitions | success notification |

### "Complete Set" Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Forest Green (#34A853) fill, white text "Complete set ✓", r-pill | — |
| Pressed | darker green (#2D9249) + scale(0.97) | medium impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity (when no reps entered) | — |
| Loading | N/A (instant action) | — |
| Error | N/A | — |
| Success | green glow (600ms), text changes to "Set logged ✓" for 280ms | success notification |

### Weight / Reps Input Fields
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-900 bg, 1pt white at 10% border | — |
| Pressed | N/A (tap focuses) | — |
| Focus-visible | 2pt Burnt Orange border, bg slightly lighter | light impact |
| Disabled | 0.4 opacity | — |
| Loading | N/A | — |
| Error | 2pt red border, "Invalid" label below | error notification |
| Success | N/A | — |

### Pause Button (⏸)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | white icon, 20pt | — |
| Pressed | white at 60%, scale(0.95) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### "End" Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | "End" text, white at 50% | — |
| Pressed | white at 30%, scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### "Skip Rest" Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | white at 50% text | — |
| Pressed | white at 30%, scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### "Done" CTA (Summary)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Burnt Orange fill, white text, r-pill | — |
| Pressed | darker orange + scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### "Resume" Button (Pause Overlay)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Burnt Orange fill, white text, r-pill | — |
| Pressed | darker orange + scale(0.97) | medium impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### Exercise Row (Planning Mode)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | list row with separator | — |
| Pressed | background lightens to ink-brown-800 at 30% | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A | — |
| Loading | skeleton shimmer | — |
| Error | N/A | — |
| Success | N/A | — |

### Gesture Map
| Gesture | Target | Action | Mode |
|---------|--------|--------|------|
| Swipe right from edge | Screen | back navigation | Planning only |
| Pull down | ScrollView | refresh workout plan | Planning only |
| Tap | Exercise row | expand/collapse details | Planning |
| Tap | "Start workout" | begin workout, enter Active mode | Planning |
| Tap | Weight/Reps input | focus field, open numeric keyboard | Active |
| Tap | "Complete set" | log set, start rest timer, advance counter | Active |
| Tap | "Skip rest" | end rest timer, collapse timer | Active |
| Tap | Pause (⏸) | present pause overlay | Active |
| Tap | "End" | confirm dialog → summary mode | Active |
| Tap | "Resume" | dismiss overlay, resume timers | Active (paused) |
| Tap | "End workout" (overlay) | dismiss overlay → summary mode | Active (paused) |
| Tap | "Done" | stack pop to Screen 26 | Summary |

**Haptic feedback points**:
- "Start workout" press: light impact
- "Complete set" press: medium impact
- "Complete set" success: success notification
- Rest timer completion: medium impact (vibration alert)
- Pause button press: light impact
- End button press: light impact
- "Resume" press: medium impact
- XP badge appear: success notification
- "Done" press: light impact

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Planning→Active transition | "Start workout" tap | Content crossfade below header | 520ms | ease-out-soft |
| Active→Summary transition | Workout ends | Full screen crossfade | 520ms | ease-out-soft |
| Exercise name change | New exercise reached | Crossfade old→new | 280ms | ease-out-soft |
| Set counter update | Set completed | Fade out→in with translateY | 280ms | ease-out-soft |
| Rest timer expand | Set completed | Height 0→200pt | 280ms | ease-out-soft |
| Rest timer collapse | Rest ends / skipped | Height 200pt→0 | 280ms | ease-out-soft |
| Rest ring fill | Timer counting | `GaugeRing` depletes full→empty, counterclockwise, arc-following `--grad-orange` (mint) | matches duration | linear |
| Rest complete flash | Timer hits 0 | Arc flashes green `#34A853` (arrival) then ring collapses (height 200pt→0) | 280ms | ease-out-soft |
| Set tracker dim | Rest timer appears | Opacity 1.0→0.6 | 280ms | ease-out-soft |
| Set tracker restore | Rest timer collapses | Opacity 0.6→1.0 | 280ms | ease-out-soft |
| SIA note rotate | Context changes | Fade out + fade in + translateY(8→0) | 280ms each | ease-out-soft |
| "Set logged ✓" text | Set completed | Text swap with fade | 280ms | ease-out-soft |
| Pause overlay enter | Pause tapped | Backdrop fade + content scale(0.95→1.0) | 280ms | ease-out-soft |
| Pause overlay exit | Resume/End tapped | Fade out | 280ms | ease-out-soft |
| Summary stat count-up | Summary appears | Values count 0→final | 800ms | ease-flow |
| XP badge scale | Summary appears (600ms delay) | Scale 0.5→1.0 + glow pulse | 520ms | ease-flow |
| XP bar fill | After badge (800ms delay) | Width old%→new% | 520ms | ease-flow |
| SIA feedback enter | After XP (1200ms delay) | Fade-in + translateY(12→0) | 280ms | ease-out-soft |
| "Done" button enter | After SIA (1400ms delay) | Fade-in | 280ms | ease-out-soft |

**Summary animation sequence** (signature moment, 1200ms+):
1. 0ms: "Workout complete." fades in
2. 200ms: stat tiles count up from 0 (800ms)
3. 600ms: XP badge scales in with orange glow
4. 800ms: XP progress bar fills to new position
5. 1200ms: SIA feedback card fades in
6. 1400ms: "Done" button fades in

If XP earned triggers a level-up, Screen 42 (Celebration overlay) is presented as modal instead of the inline summary.

**Screen transition**:
- **Enter (from Screen 26)**: stack push slide-in from right (280ms, ease-out-soft)
- **Exit (back to Screen 26)**: stack pop slide-out to right (280ms, ease-out-soft)

---

## Empty States

### Day 1 (new user)
- Planning mode shows a SIA-generated starter workout based on onboarding. Exercise notes include beginner tips ("Start with light weight to find your range").
- Set tracker pre-fills with conservative default weights.
- SIA notes are extra encouraging: "First workout. No pressure — just show up and move."

### Established user (manual log)
- When arriving via FAB "Log workout" from Screen 26, planning mode shows a blank template:
  - "What did you do?" prompt
  - Option to select from past workouts, or describe to SIA
  - Manual exercise entry fields

---

## Motivation Adaptation

- **Low motivation**: planning mode shows fewer exercises (2-3). SIA notes are gentler ("Even 15 minutes counts."). Post-workout summary emphasizes showing up over metrics ("You showed up. That's what matters."). XP bonus for completing shortened workout.
- **Medium motivation**: default experience as designed. Full exercise list, standard metrics, data-driven SIA feedback.
- **High motivation**: planning mode shows detailed notes for every exercise (muscle groups, form cues). Active mode adds a volume tracker (total weight lifted, running total). Summary shows comparative stats (vs. last week, personal records). SIA feedback is more analytical.

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Detail header workout name | Sora | Semibold | 17pt | 22pt | white 100% |
| Detail header subtitle | Sora | Regular | 13pt | 18pt | white at 50% |
| SIA compact note text | Sora | Regular | 13pt | 18pt | white 100% |
| Exercise row number | Sora | Semibold | 15pt | 20pt | white at 40% |
| Exercise row name | Sora | Semibold | 16pt | 22pt | white 100% |
| Exercise row details | Sora | Regular | 13pt | 18pt | white at 50% |
| Exercise coach note | Sora | Regular (italic) | 13pt | 18pt | white at 40% |
| Eyebrow ("EXERCISES", "EST. DURATION") | Sora | Semibold | 12pt | 16pt | white at 40%, uppercase |
| "Start workout" CTA | Sora | Semibold | 16pt | 22pt | white 100% |
| Progress text ("Exercise X of Y") | Sora | Semibold | 13pt | 18pt | white 100% |
| Elapsed time | Sora | Regular | 13pt | 18pt | white at 50% |
| Current exercise name (active) | Sora | Bold | 24pt | 32pt | white 100% |
| Set progress ("Set X of Y") | Sora | Regular | 15pt | 20pt | white at 50% |
| Input eyebrow ("Weight", "Reps") | Sora | Semibold | 11pt | 14pt | white at 40%, uppercase |
| Input value | Sora | Semibold | 20pt | 26pt | white 100% |
| Last set reference | Sora | Regular | 13pt | 18pt | white at 40% |
| "Complete set" button | Sora | Semibold | 16pt | 22pt | white 100% |
| Rest timer "REST" label | Sora | Semibold | 12pt | 16pt | white at 40%, uppercase |
| Rest timer time display | Sora | Semibold | 32pt | 40pt | white 100% |
| "Skip rest" button | Sora | Regular | 15pt | 20pt | white at 50% |
| "End" button | Sora | Semibold | 15pt | 20pt | white at 50% |
| "Workout complete." header | Sora | Bold | 24pt | 32pt | white 100% |
| XP badge text | Sora | Semibold | 20pt | 26pt | #FF5E00 |
| Level label | Sora | Semibold | 15pt | 20pt | white 100% |
| XP percentage | Sora | Regular | 13pt | 18pt | white at 50% |
| "Done" CTA | Sora | Semibold | 17pt | 22pt | white 100% |
| Pause overlay "Paused" | Sora | Bold | 24pt | 32pt | white 100% |
| Pause overlay time | Sora | Regular | 17pt | 22pt | white at 50% |
| "Resume" button | Sora | Semibold | 17pt | 22pt | white 100% |
| "End workout" overlay text | Sora | Regular | 15pt | 20pt | white at 50% |
| "NEXT:" eyebrow | Sora | Semibold | 12pt | 16pt | white at 40%, uppercase |

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Workout plan fails to load (planning mode) | Skeleton shimmer on exercise list; after timeout: "Could not load workout." with "retry" link | Tap retry or pull-to-refresh |
| Set log fails to sync | "Complete set" button flashes red border briefly; set is queued locally for background retry | Automatic background retry; data syncs when connection resumes |
| Active workout — app backgrounded | Timer pauses; on return, elapsed time catches up; toast: "Timer resumed" | None needed — automatic |
| Active workout — app killed | Workout state persisted locally; on relaunch, prompt: "Resume your workout?" with Resume/Discard options | User taps Resume to continue or Discard to abandon |
| Post-workout summary fails to calculate XP | Summary shows stats without XP badge; "XP will be calculated shortly" placeholder | XP calculates in background; badge appears when ready |
| Weight/reps input — invalid value | 2pt red border on input field; "Invalid" label below in red | User corrects input value |
| End workout confirmation — save fails | "Could not save workout. Try again?" with Retry/Discard options in confirmation dialog | User retries save |

---

## Accessibility

**Screen reader labels:**
- Back button (planning): "Back, navigate to Fitness Dashboard"
- Detail header: "[Workout name], [type], [duration]"
- Overflow menu: "More options, button"
- Exercise rows: "Exercise [number], [name], [sets] sets of [reps] reps, [rest] rest"
- "Start workout" CTA: "Start workout, button"
- Progress display (active): "Exercise [X] of [Y], elapsed time [MM:SS]"
- Current exercise (active): "[Exercise name], Set [X] of [Y]"
- Weight input: "Weight, [value] pounds, text field"
- Reps input: "Reps, [value], text field"
- "Complete set" button: "Complete set, button"
- Rest timer: "Rest timer, [time] remaining"
- "Skip rest" button: "Skip rest, button"
- Pause button: "Pause workout, button"
- End button: "End workout, button"
- "Workout complete" heading: "Workout complete"
- Stat tiles: "[Value] [label]" (e.g., "42 minutes, 5 exercises, 380 calories")
- XP badge: "Earned [number] XP"
- "Done" CTA: "Done, return to Fitness Dashboard, button"

**Focus order:**
- Planning mode: Back button → overflow menu → SIA note → exercise rows (1 through N) → duration label → "Start workout" CTA
- Active mode: Progress/controls bar (pause, end) → current exercise name → set progress → weight input → reps input → "Complete set" → rest timer (when visible) → "Skip rest" → SIA note → next exercise preview
- Summary mode: "Workout complete" header → stat tiles → XP badge → level progress → SIA feedback → "Done" CTA

**Gesture alternatives:**
- Swipe-right-from-edge disabled in Active mode to prevent accidental exit; Pause/End buttons are the only exit
- Numeric keyboard opens automatically on weight/reps input focus
- Rest timer "Skip rest" available as accessible button (not just visual link)
- All interactive elements meet 44pt minimum touch target
- Screen reader announces mode transitions ("Entering active workout mode", "Workout complete")
- Tab bar hidden in Active mode is announced: "Navigation hidden during active workout"

---

## Cross-References

- **Navigates to**: Screen 26 (Fitness Dashboard) via stack pop, Screen 42 (Celebration overlay) via modal present on milestone
- **Navigates from**: Screen 26 (Fitness Dashboard) via stack push, Screen 12 (Home Screen) via deep-link action card
- **Shared components with**: Screen 29 (Detail Header, Multi-Mode Pattern, SIA compact note), Screen 26 (SIA Coaching Note Card, Stat Tile)
- **Patterns used**: Back Button (Batch 1), Brand CTA Button (Batch 1), 8-State Interaction Model, Stack Navigation, Confirmation State crossfade (Batch 1 screen 05)
- **Patterns established**: Detail Screen Template (canonical drill-down layout), Multi-Mode Screen Pattern (content crossfade between planning/active/summary), Set Tracker Row (weight/reps inputs + green complete), Rest Timer (circular countdown, auto-start, haptic at zero), Progress Bar + Controls (exercise/set progress with session controls), Pause Overlay (semi-transparent with resume/end), XP Earned Badge (animated scale-in + glow for RPG reward), Post-Workout Summary sequence (signature animation choreography)
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-10.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U05`
**Prototype route**: `/domains/workout`
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
| B10-F09 | critical | retention | Build editable set inputs, complete-set progression, rest countdown/skip, pause overlay, end confirmation, summary, and persistence. |
| B10-F10 | major | information-architecture | Implement planning, active, paused, and summary modes or split manual logging from active tracking. |
| B10-F11 | major | accessibility | Use real labeled inputs/steppers, live progress/timer announcements, 44px rest controls, and visible next-exercise layout. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

