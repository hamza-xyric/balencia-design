# Screen Design: Workout Detail / Active Workout

**Screen**: 27 of 43
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
  - Circular ring: 120pt diameter, centered. Track: white at 10%, 6pt stroke width. Fill: Burnt Orange (#FF5E00), 6pt stroke, sweeps counterclockwise from 12 o'clock position.
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

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | base |
| Card surfaces | #211008 | ink-brown-800 | set tracker, SIA notes |
| "Start workout" CTA | #FF5E00 | burnt-orange | 60% — primary CTA |
| "Done" CTA | #FF5E00 | burnt-orange | 60% — primary CTA |
| "Complete set" button | #34A853 | forest-green | 30% — completion action |
| Rest timer ring fill | #FF5E00 | burnt-orange | 60% — progress indicator |
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
| Disabled | 0.5 opacity | — |
| Loading | white spinner replaces text | — |
| Error | N/A | — |
| Success | green glow (600ms) as mode transitions | success notification |

### "Complete Set" Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Forest Green (#34A853) fill, white text "Complete set ✓", r-pill | — |
| Pressed | darker green (#2D9249) + scale(0.97) | medium impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.5 opacity (when no reps entered) | — |
| Loading | N/A (instant action) | — |
| Error | N/A | — |
| Success | green glow (600ms), text changes to "Set logged ✓" for 280ms | success notification |

### Weight / Reps Input Fields
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-900 bg, 1pt white at 10% border | — |
| Pressed | N/A (tap focuses) | — |
| Focus-visible | 2pt Burnt Orange border, bg slightly lighter | light impact |
| Disabled | 0.5 opacity | — |
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
| Rest ring sweep | Timer counting | Continuous counterclockwise | matches duration | linear |
| Rest complete flash | Timer hits 0 | Ring fill orange→green→fade | 280ms | ease-out-soft |
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

## Cross-References

- **Navigates to**: Screen 26 (Fitness Dashboard) via stack pop, Screen 42 (Celebration overlay) via modal present on milestone
- **Navigates from**: Screen 26 (Fitness Dashboard) via stack push, Screen 12 (Home Screen) via deep-link action card
- **Shared components with**: Screen 29 (Detail Header, Multi-Mode Pattern, SIA compact note), Screen 26 (SIA Coaching Note Card, Stat Tile)
- **Patterns used**: Back Button (Batch 1), Brand CTA Button (Batch 1), 8-State Interaction Model, Stack Navigation, Confirmation State crossfade (Batch 1 screen 05)
- **Patterns established**: Detail Screen Template (canonical drill-down layout), Multi-Mode Screen Pattern (content crossfade between planning/active/summary), Set Tracker Row (weight/reps inputs + green complete), Rest Timer (circular countdown, auto-start, haptic at zero), Progress Bar + Controls (exercise/set progress with session controls), Pause Overlay (semi-transparent with resume/end), XP Earned Badge (animated scale-in + glow for RPG reward), Post-Workout Summary sequence (signature animation choreography)
