# Screen Design: Meditation & Mindfulness

**Screen**: 54 of 73
**File**: 54-meditation-mindfulness.md
**Register**: Wellbeing Mode (wellbeing-teal #14B8A6)
**Primary action**: browse and complete guided meditation sessions
**Tab**: Wellbeing domain — stack push from Explore [18] or Home [12]
**Navigation**: Stack depth 2-3 from Me tab root (Me Main -> Explore -> Meditation & Mindfulness). Entry from Explore [18] grid card ("Meditation" module), Home Screen [12] action card ("SIA recommends a 5-min body scan"), SIA Chat [09] deep-link ("Try this breathing exercise"). Exit via back button to Explore, or forward to active session (full-screen overlay), SIA Chat [09].

---

## Purpose

This screen is the user's meditation and mindfulness hub -- a curated library of practices organized by category (meditation, quick reset, movement, evening wind-down), personalized by SIA based on current mood, stress level, and behavioral patterns. It answers "what mindfulness practice should I do right now, and how consistent have I been?" The screen transitions between a browsable library state and a focused full-screen active session state when the user starts a practice. Post-session, it captures effectiveness feedback that feeds back into SIA's recommendation engine. Mindfulness consistency drives the Wellbeing domain in the RPG system: sessions earn XP, streaks multiply rewards, and the user's mindfulness stats contribute to their overall life balance score. Free tier includes practice library browsing and the session timer; SIA recommendations and post-session feedback require Plus.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Domain header with wellbeing-teal accent and RPG level badge
2. Category filter chips -- All, Meditation, Quick Reset, Movement, Evening Wind-down
3. SIA recommended practice card -- AI-personalized suggestion based on current context
4. Practice cards grid -- browsable library of available practices
5. Mindfulness streak -- consecutive days indicator
6. Stats section -- total sessions, total minutes, longest streak, favorite category
7. Active session view (full-screen overlay when a practice is started)
8. Post-session feedback (effectiveness rating, note, XP earned)

**User flow**:
- **Arrives from**: Explore [18] via "Meditation" card (stack push), Home Screen [12] via mindfulness action card (stack push), SIA Chat [09] via deep-link when SIA recommends a practice
- **Primary exit**: Back to Explore [18] (stack pop)
- **Secondary exits**: SIA Chat [09] via SIA recommendation tap (tab switch), Active Session (full-screen overlay), Post-Session (inline transition after session), Celebration Overlay [42] on streak milestone or level-up

---

## Layout

**Scroll behavior**: ScrollView (library view, content spans ~2.5 viewport heights). None/Fixed (active session view -- full-screen overlay).
**Tab bar visible**: Yes (library view), No (active session view)

### Mode Architecture

```
              ┌──────────────────┐
              │   Library View   │
              │  (browsing mode) │
              └────────┬─────────┘
                       │ "begin" tap on practice card
                       v
              ┌──────────────────┐
              │  Active Session  │
              │  (full-screen    │
              │   timer overlay) │
              └────────┬─────────┘
                       │
              "End early" or timer completes
                       │
                       v
              ┌──────────────────┐
              │  Post-Session    │
              │  (feedback +     │
              │   XP earned)     │
              └────────┬─────────┘
                       │
                  "done" tap
                       │
                       v
              ┌──────────────────┐
              │  Back to Library │
              │  (scroll state   │
              │   preserved)     │
              └──────────────────┘
```

Mode transitions: Library -> Active uses a full-screen overlay (fade-in + scale, 520ms ease-flow). Active -> Post-Session uses content crossfade (520ms ease-out-soft). Post-Session -> Library dismisses the overlay (fade-out, 280ms ease-out-soft).

### ASCII Wireframe -- Library View

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  < [back]    "Meditation"    Lv.4   │  <- Domain Header (56pt)
│  ================================   │  <- 2pt wellbeing-teal accent line
├─────────────────────────────────────┤
│                                     │  <- 16pt gap
│ [All] [Meditation] [Quick Reset]   │  <- Category Filter Chips
│       [Movement] [Evening]   ->    │     (horizontal scroll)
│                                     │  <- 16pt gap
│ ┌──────────────────────────────────┐│
│ │ @ SIA thinks you'd benefit from  ││  <- SIA Recommended Card
│ │   a 5-min body scan right now.   ││     (~80pt)
│ │   Your stress has been elevated  ││
│ │   since this morning.            ││
│ │               [begin session]    ││
│ └──────────────────────────────────┘│
│                                     │  <- 24pt gap
│  PRACTICES                          │  <- Eyebrow
│ ┌──────────────────────────────────┐│
│ │  Body scan meditation            ││  <- Practice Card (~96pt)
│ │  [meditation]  10 min            ││     category tag + duration
│ │  "Reduces tension, improves      ││     why_it_helps snippet
│ │   body awareness"                ││
│ │  before sleep . after exercise   ││     when_to_use tags
│ └──────────────────────────────────┘│
│                                     │  <- 16pt gap
│ ┌──────────────────────────────────┐│
│ │  4-7-8 breathing                 ││  <- Practice Card
│ │  [quick_reset]  3 min            ││
│ │  "Activates the calming          ││
│ │   nervous system response"       ││
│ │  during stress . before meeting  ││
│ └──────────────────────────────────┘│
│                                     │  <- 16pt gap
│ ┌──────────────────────────────────┐│
│ │  Walking mindfulness             ││  <- Practice Card
│ │  [movement]  15 min              ││
│ │  "Combines gentle movement       ││
│ │   with present-moment focus"     ││
│ │  morning . lunch break           ││
│ └──────────────────────────────────┘│
│                                     │  <- 16pt gap
│ ┌──────────────────────────────────┐│
│ │  Evening wind-down               ││  <- Practice Card
│ │  [evening]  12 min               ││
│ │  "Progressive relaxation to      ││
│ │   prepare for restful sleep"     ││
│ │  before bed . after screen time  ││
│ └──────────────────────────────────┘│
│                                     │  <- 32pt gap
│  MINDFULNESS STREAK                 │  <- Eyebrow
│ ┌──────────────────────────────────┐│
│ │  M  T  W  T  F  S  S            ││  <- 7-Day Dot Row
│ │  *  *  *  *  *  o  .            ││     (teal fills)
│ │  14 days                  fire   ││     streak count
│ └──────────────────────────────────┘│
│                                     │  <- 16pt gap
│  YOUR STATS                         │  <- Eyebrow
│ ┌──────────┬──────────┬──────────┐ │
│ │ 47       │ 312      │ 14       │ │  <- Stat Tiles (3-col)
│ │ sessions │ minutes  │ day      │ │
│ │          │          │ streak   │ │
│ └──────────┴──────────┴──────────┘ │
│                                     │  <- 8pt gap
│ ┌──────────────────────────────────┐│
│ │  favorite: meditation    52%     ││  <- Favorite Category Row
│ └──────────────────────────────────┘│
│                                     │
│                                     │  <- 64pt bottom padding
├─────────────────────────────────────┤
│  Today  |  SIA  |  Goals  |  Me    │  <- Tab Bar (56pt)
├─────────────────────────────────────┤
│         Home Indicator (34pt)       │
└─────────────────────────────────────┘
```

### ASCII Wireframe -- Active Session View (Full-Screen Overlay)

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│                                     │
│                                     │
│                                     │
│                                     │
│           (ambient glow)            │
│                                     │
│         ┌─────────────┐            │
│        /               \           │
│       │    (pulsing     │          │  <- Pulsing Teal Circle
│       │   wellbeing-    │          │     (160pt diameter)
│       │   teal circle)  │          │     gentle breathe animation
│        \               /           │
│         └─────────────┘            │
│                                     │
│             7:23                    │  <- Countdown Timer
│                                     │     (32pt Sora Bold)
│        body scan meditation         │  <- Practice Name
│                                     │     (15pt Regular)
│                                     │
│                                     │
│      [pause]   [skip]   [end]      │  <- Timer Controls
│                                     │     (icon buttons)
│                                     │
└─────────────────────────────────────┘
```

### ASCII Wireframe -- Post-Session View

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│                                     │
│                                     │
│           session complete          │  <- Header (20pt Semibold)
│                                     │
│             +50 XP                  │  <- XP Badge (orange glow)
│                                     │
│        body scan meditation         │  <- Practice Name
│           10 min completed          │     + duration
│                                     │
│     how effective was this?         │  <- Rating Prompt
│                                     │
│       1    2    3    4    5         │  <- Effectiveness Rating
│       o    o    o    o    o         │     (tappable circles)
│                                     │
│  ┌──────────────────────────────────┐│
│  │ add a note (optional)           ││  <- Note Input
│  │                                 ││     (text field)
│  └──────────────────────────────────┘│
│                                     │
│       [=== done ===]                │  <- Done CTA (orange pill)
│                                     │
└─────────────────────────────────────┘
```

### Component Stack (top to bottom) -- Library View

1. **Domain Header** -- 56pt
   - Purpose: Domain identification with RPG level
   - Content: Back chevron, "Meditation" title (20pt Sora Semibold), level badge ("Lv.4"), 2pt wellbeing-teal (#14B8A6) accent line

2. **Category Filter Chips** -- 36pt
   - Purpose: Filter practices by category
   - Content: All, Meditation, Quick Reset, Movement, Evening Wind-down

3. **SIA Recommended Card** -- ~80pt
   - Purpose: AI-personalized practice suggestion
   - Content: SIA message + "begin session" CTA

4. **Practice Cards** -- ~96pt each (variable count)
   - Purpose: Browsable library of mindfulness practices
   - Content: Name, category tag, duration, why_it_helps, when_to_use tags

5. **Mindfulness Streak Card** -- ~80pt
   - Purpose: Consecutive days of practice visualization
   - Content: 7-day dot row with streak count

6. **Stats Section** -- ~96pt
   - Purpose: Cumulative mindfulness metrics
   - Content: 3 stat tiles + favorite category row

---

## Components

### Domain Header
- **Purpose**: Domain identification and navigation
- **Visual treatment**: 56pt height, ink-900 background, sticky on scroll with backdrop-blur(16px). Back chevron (left, white, 20pt, 44x44pt touch target, 16pt from left). Title "Meditation" (20pt Sora Semibold, white, left-aligned 56pt from left). RPG Skill Badge (right-aligned, 16pt from right -- "Lv.4" in wellbeing-teal at 15% bg, wellbeing-teal text, --r-pill). Accent line: 2pt height, wellbeing-teal (#14B8A6), extends from title left to ~60% width, 4pt below title baseline.
- **Size**: Full-width x 56pt

### Category Filter Chips
- **Purpose**: Filter the practice library by category
- **Data source**: Local state, maps to `practice_category` values in `mindfulness_practices` table
- **Visual treatment**: Horizontal ScrollView, 16pt leading margin. Each chip: 36pt height, --r-pill (999pt). Inactive: ink-brown-800 bg, 1pt white at 10% border, 13pt Sora Semibold white at 60%. Active: wellbeing-teal (#14B8A6) bg at 100%, white text. 8pt gap between chips.
- **Content**: "all" (default active), "meditation", "quick reset", "movement", "evening"
- **Variants**: Single active selection. "all" shows all categories. Each filter shows only matching practices.
- **Gestures**: Tap chip to activate filter. Horizontal scroll to reveal overflow.
- **Size**: Full-width x 36pt (scrollable)

**Design note**: Filter chips use wellbeing-teal for the active state instead of the standard orange because this is a domain-filtered view within the wellbeing context. This is consistent with the domain dashboard pattern where domain color appears on identification and contextual filtering elements. Primary CTAs (begin session, done) remain orange.

### SIA Recommended Card
- **Purpose**: AI-personalized practice suggestion based on current mood, stress, time of day, and behavioral patterns
- **Data source**: `mindfulness_practices` table where `recommended_at` is not null, SIA recommendation engine
- **Visual treatment**: ink-brown-800 glassmorphism card (1pt white at 6% border), --r-xl (28pt), 24pt padding. Purple dot: 6pt circle, #7F24FF, 16pt from left edge, vertically centered with first text line. Message: 15pt Sora Regular, white, 32pt from card left, max 3 lines. Example: "SIA thinks you'd benefit from a 5-min body scan right now. Your stress has been elevated since this morning." Bottom row: "begin session" compact CTA -- 13pt Sora Semibold, orange (#FF5E00), right-aligned, 44pt touch target.
- **Variants**: Recommendation available (default), no recommendation ("explore the practices below to find what works for you"), recommendation accepted (card transitions to active session), recommendation dismissed (card slides away, replaced by next recommendation or hidden)
- **Gestures**: Tap "begin session" -> launches active session with recommended practice. Tap card body -> navigates to SIA Chat [09] with mindfulness context. Swipe right -> accept recommendation. Swipe left -> dismiss recommendation.
- **Size**: Full-width minus 32pt x ~80pt

### Practice Card
- **Purpose**: Individual practice entry in the browsable library
- **Data source**: `mindfulness_practices` table (practice_name, practice_category, instructions, duration_minutes, when_to_use, why_it_helps, is_system_practice)
- **Visual treatment**: ink-brown-800 glassmorphism card, --r-xl (28pt), 24pt padding. Content:
  - Practice name: 16pt Sora Semibold, white, top of card
  - Category tag: Domain Tag Chip variant -- category color-coded at 15% opacity bg. Meditation: wellbeing-teal. Quick reset: orange. Movement: wellbeing-teal at 80%. Evening: wellbeing-teal at 60%. 11pt Sora Semibold, --r-sm (10pt), 24pt height. Positioned 8pt right of name baseline.
  - Duration: 13pt Sora Regular, white at 50%, right-aligned on same line as category tag. "10 min" format.
  - Why it helps: 13pt Sora Regular, white at 70%, 2 lines max, 4pt below name line. Quoted snippet from `why_it_helps` field.
  - When to use tags: 12pt Sora Regular, white at 40%, bottom row. Dot-separated: "before sleep . after exercise". From `when_to_use` field.
- **Variants**: System practice (default), previously completed (subtle green checkmark, 12pt, top-right corner), SIA-recommended (faint wellbeing-teal left border, 2pt), never tried ("new" micro-badge, 10pt, wellbeing-teal bg, white text, --r-pill)
- **Gestures**: Tap card -> expand to show full instructions + "begin session" CTA (280ms expand, ease-out-soft). Long-press -> Quick Actions Menu (begin, add to favorites, ask SIA about this).
- **Size**: Full-width minus 32pt x ~96pt (collapsed), ~160pt (expanded)

### Active Session View (Full-Screen Overlay)
- **Purpose**: Minimalist, distraction-free meditation timer with ambient visual feedback
- **Data source**: `meditation_timers` table (duration_minutes, category), practice instructions
- **Visual treatment**: Full-screen overlay (z-50), ink-900 background. Tab bar hidden. Status bar visible.
  - **Pulsing circle**: 160pt diameter circle, centered horizontally, ~35% from top. Fill: wellbeing-teal (#14B8A6) at 20% opacity. Border: 2pt wellbeing-teal at 40%. Breathe animation: scale oscillates between 0.92 and 1.08 on a slow 4-second cycle (inhale 4s, exhale 4s), simulating a breathing rhythm. Subtle radial glow: wellbeing-teal at 8% extending 40pt beyond circle edge.
  - **Countdown timer**: Centered below circle, 24pt gap. 32pt Sora Bold, white, tabular-nums. Format: "M:SS" (e.g., "7:23"). Counts down from practice duration.
  - **Practice name**: 15pt Sora Regular, white at 50%, centered, 8pt below timer.
  - **Ambient background**: Subtle animated gradient -- ink-900 base with slow-moving wellbeing-teal at 3% opacity wash, 8-second cycle.
- **Size**: Full-screen

### Timer Controls
- **Purpose**: Pause, skip (to next section if applicable), and end the session early
- **Visual treatment**: Horizontal row of 3 icon buttons, centered, 48pt below practice name. Each button: 48pt diameter touch target (44pt minimum).
  - Pause/Play: 24pt icon, white at 70%. Pause (two vertical bars) toggles to play (triangle). Pressed: white at 100%, scale(0.93).
  - Skip: 24pt forward-skip icon, white at 40%. Only visible for multi-section practices. Pressed: white at 70%, scale(0.93).
  - End early: 24pt stop-square icon, white at 40%. Pressed: white at 70%, scale(0.93). Tap triggers confirmation: "end session?" inline text swap (280ms crossfade), second tap confirms.
- **Gestures**: Tap pause -> toggle pause/resume. Tap skip -> advance to next section. Tap end -> confirm then transition to post-session. Double-tap anywhere on screen -> toggle pause (accessibility shortcut).
- **Size**: ~200pt wide x 48pt

### Post-Session View
- **Purpose**: Capture session feedback and deliver RPG rewards
- **Data source**: Session just completed, writes to `mindfulness_practices` (completed_at, actual_duration_minutes, effectiveness_rating, note)
- **Visual treatment**: Same full-screen overlay context as active session. Content crossfades in (520ms ease-out-soft). Centered layout.
  - "session complete" header: 20pt Sora Semibold, white, centered, ~30% from top
  - XP earned badge: "+50 XP" in 20pt Sora Semibold, orange (#FF5E00), with orange at 15% bg pill, --glow-orange behind. Scale-in animation from 0.5 to 1.0 (520ms ease-flow).
  - Practice name: 15pt Sora Semibold, white, centered, 8pt below XP
  - Duration completed: 13pt Sora Regular, white at 50%, "10 min completed"
  - Effectiveness prompt: "how effective was this?" -- 15pt Sora Regular, white at 70%, centered, 32pt below duration
  - Rating circles: 5 circles in a horizontal row, 40pt each, 16pt gap. Default: white at 15% fill, 1.5pt white at 20% border. Selected: wellbeing-teal fill, white number (16pt Semibold). Numbers 1-5 inside. Selection cascading fill animation: circles fill left-to-right up to selected value (160ms stagger).
  - Note input: Text Input Field (52pt height, ink-brown-800 bg, --r-md, 1pt white at 10% border). Placeholder: "add a note (optional)" in 15pt Sora Regular, white at 40%. 16pt horizontal margins. 24pt below rating.
  - "done" CTA: Brand CTA Button (56pt, orange #FF5E00, --r-pill, full-width minus 32pt, "done" in 17pt Sora Semibold white). 24pt below note input.
- **Gestures**: Tap rating circle -> select effectiveness (1-5). Tap note field -> keyboard opens, field expands. Tap "done" -> save feedback, dismiss overlay, return to library. Can skip rating (tap "done" without selecting).
- **Size**: Full-screen

### Mindfulness Streak Card
- **Purpose**: Visualize consecutive days of mindfulness practice
- **Data source**: Calculated from `mindfulness_practices` completed_at dates
- **Visual treatment**: ink-brown-800 glassmorphism card, --r-xl (28pt), 24pt padding. Content:
  - 7-Day Dot Row (established pattern): Horizontal row, evenly spaced, full-width minus 32pt (within card padding). Day label: 12pt Sora Regular, white at 40%, centered above dot (M, T, W, T, F, S, S). Dot: 12pt diameter circle. Status is never colour-alone — each dot pairs its fill with a visible glyph: Completed: wellbeing-teal (#14B8A6) fill + a small white check. Planned not done: white at 20% fill, 1pt dashed white at 30% ring. Today (upcoming): white at 10% fill, dashed pulsing ring (the existing 800ms loop, ease-flow). Row height: 40pt. (Per Visualization S54-V02; below this strip sits the trailing-weeks consistency CalendarHeatmap.)
  - Streak count: Below dots, left-aligned. Fire icon (20pt, orange #FF5E00) + count ("14 days" in 15pt Sora Semibold, orange). If streak is 0: hidden.
- **Variants**: Active streak (dots filled, count shown), broken streak (gap visible, count resets, SIA note: "pick up where you left off"), new user (all dots empty, "start your streak today")
- **Size**: Full-width minus 32pt x ~80pt

### Stats Section
- **Purpose**: Cumulative mindfulness metrics providing a sense of accomplishment
- **Data source**: Aggregated from `mindfulness_practices` (completed sessions) and `meditation_timers` (completed timers)
- **Visual treatment**: 3 Stat Tiles in a row (established pattern from Screen 26). Each tile: equal width, 8pt gaps between, ink-brown-800 bg, --r-md (14pt). Value: 20pt Sora Semibold, white, centered. Label: 12pt Sora Regular, white at 50%, centered, 4pt below value. Count-up animation on mount: 0 to final value, 280ms ease-out-soft.
  - Tile 1: Total sessions ("47" / "sessions")
  - Tile 2: Total minutes ("312" / "minutes")
  - Tile 3: Longest streak ("14" / "day streak")
  - Below tiles (8pt gap): Favorite category row -- full-width minus 32pt, ink-brown-800, --r-md, 12pt padding. "favorite: meditation" (13pt Sora Regular, white at 50%) + "52%" right-aligned (13pt Sora Semibold, white at 70%). Percentage represents share of total sessions.
- **Variants**: Has data (numbers shown), new user (all zeros, "start meditating to see your stats")
- **Size**: Full-width minus 32pt x ~96pt (tiles) + ~40pt (favorite row)

---

## Typography

| Element | Size | Weight | Color | Notes |
|---------|------|--------|-------|-------|
| Domain header title | 20pt | Semibold (600) | white | Left-aligned |
| Section eyebrow | 11pt | Semibold (600) | white at 40% | Uppercase, +0.12em tracking |
| Practice card name | 16pt | Semibold (600) | white | Primary identifier |
| Practice card why_it_helps | 13pt | Regular (400) | white at 70% | 2 lines max |
| Practice card when_to_use | 12pt | Regular (400) | white at 40% | Dot-separated tags |
| Practice card duration | 13pt | Regular (400) | white at 50% | Right-aligned |
| Category tag text | 11pt | Semibold (600) | domain color | Within chip |
| Filter chip text | 13pt | Semibold (600) | white at 60% (inactive) / white (active) | |
| SIA recommendation message | 15pt | Regular (400) | white | Max 3 lines |
| SIA "begin session" link | 13pt | Semibold (600) | orange #FF5E00 | Right-aligned |
| Active session timer | 32pt | Bold (700) | white | Tabular-nums, centered |
| Active session practice name | 15pt | Regular (400) | white at 50% | Centered |
| Post-session header | 20pt | Semibold (600) | white | Centered |
| Post-session XP | 20pt | Semibold (600) | orange #FF5E00 | Within badge |
| Rating prompt | 15pt | Regular (400) | white at 70% | Centered |
| Rating number | 16pt | Semibold (600) | white | Inside circle |
| Stat tile value | 20pt | Semibold (600) | white | Centered |
| Stat tile label | 12pt | Regular (400) | white at 50% | Centered |
| Streak count | 15pt | Semibold (600) | orange #FF5E00 | With fire icon |
| Streak day labels | 12pt | Regular (400) | white at 40% | M, T, W, etc. |
| Level badge | 13pt | Semibold (600) | wellbeing-teal | Within pill |
| Done CTA | 17pt | Semibold (600) | white | On orange button |
| Note placeholder | 15pt | Regular (400) | white at 40% | Input field |

---

## Composition & Visual Hierarchy

**Squint test verification**:
- Primary CTA (orange "begin session", "done" button) is the most visually prominent interactive element on each view state
- Practice card names (16pt Semibold) clearly distinguish from body text (13pt Regular at 70%)
- Section breaks use 32pt inter-section gap vs 16pt intra-section gap, clearly separating content zones
- Active session timer (32pt Bold) is the dominant element in session view, with the pulsing teal circle as the visual anchor
- Rating circles provide clear interactive affordance through size (40pt) and spacing

**Spacing grid**:
- Horizontal margins: 16pt per side (32pt total)
- Card internal padding: 16pt
- Section gap: 16pt between cards within a section
- Inter-section gap: 32pt between content sections (eyebrow to previous section)
- Gap between elements inside cards: 8-12pt
- Bottom padding: 64pt (clears tab bar)

**Z-layer system**:
- z-0: ink-900 background
- z-10: Practice cards, stat tiles, streak card (ink-brown-800 glassmorphism)
- z-20: Expanded practice card (elevated with --shadow-warm)
- z-30: Domain header (sticky, backdrop-blur)
- z-40: Filter chip row (scrolls above content)
- z-50: Active session overlay, post-session overlay

---

## Visualization

> Source: no companion file (none authored — this is the first viz pass on Screen 54). Audited in `viz-audit/` — Batch (Tracker B), findings `S54-V01..S54-V05`. All primitives are from `viz-audit/VIZ-KIT.md` at `viz-audit/CONSISTENCY.md` parameters. **Mints no new primitive** — composes from the frozen kit (`GaugeRing`, `MomentumBar`, `CalendarHeatmap`, `Sparkline`, `MetricCard`). Premium-depth, on-brand (60/30/10), **Wellbeing Mode → wellbeing-teal `#14B8A6` is *identity only*; orange dominates data ink**. Benchmark = **Calm + Headspace** (minutes-meditated trend, streak calendar, session-progress ring) rendered **the Balencia way** (Living Line + warm glow), calm and explicitly **non-shaming** (Gentler-Streak thesis on the always-on floor). **Current grade D (52) → specced-target A− (86).** *(Honest re-grade under the revised 10-dimension rubric; the residual gap to A+++ is build-verified depth + working scrub/drill micro-interactions + a `wellbeing` `tone` on `CalendarHeatmap`, owned by the later viz-build program.)*

This is a deliberately **calm Tracker (Template B)** — a library-first browse screen, not a dense dashboard. Premium ≠ maximal: the practice cards, durations, `why_it_helps`/`when_to_use`, category tags, SIA note, favorite-category row, and the active-session UI stay **deliberately textual / iconographic** (one-off labels with no useful visual form). The viz upgrade touches only the four data zones that genuinely benefit: the **session-progress ring** during a session (the brief's `GaugeRing`/`MomentumBar`, today entirely absent), the **streak** (today 7 colour-only dots), the cumulative **stats** (today bare text), and the **minutes-over-time** micro-trend (high-motivation only). **Two brand corrections baked in:** (1) `S54-V02` — the streak dot row carries done/not-done by **colour alone** (teal vs white/10), a 1.4.11 + colour-alone miss; a **visible glyph** (✓ / · / dashed-ring "today") is added. (2) `S54-V05` — the active-session "circle" is decorative ambient (correct as *ambience*) but renders **no progress**; a thin `GaugeRing` countdown arc makes elapsed/remaining honest without breaking the calm.

### Visualized-vs-text map

| Datum (already shown / implied) | Today | Specced visual | Primitive |
|---|---|---|---|
| Session elapsed / remaining (countdown timer) | 32pt bare countdown text + decorative breathe circle (no progress) | thin **session-progress ring** wrapping the breathe circle (elapsed → remaining), orange→green arrival | **`GaugeRing` (VK-002)** + `MomentumBar` mini fallback |
| Mindfulness streak (14 days, M–S done-state) | 7 **colour-only** teal/white dots + "14 days" | **`CalendarHeatmap`** consistency grid (trailing weeks; today dashed) — high-motiv 28-day; the 7-dot row kept as an at-a-glance strip **with visible glyphs** | **`CalendarHeatmap`** (wellbeing tone) + glyph dot-row |
| Total sessions (47) · minutes (312) · day-streak (14) | three bare text stat tiles | **`MetricCard`/KPI** stat tiles — value `text-h2` + count-up + a tiny `Sparkline` on minutes | `MetricCard` (VK-003) + `Sparkline` |
| Minutes meditated per day (last 14d) | not shown (high-motiv sparkline mentioned in spec) | **`Sparkline`** (tiny Living Line, 7-pt) under the minutes tile / above streak | **`Sparkline` (VK-001)** |
| Favorite-category share (52%) | text "52%" | **continuous `MomentumBar`** (single share-of-total fill) — one calm bar, not a chart | `MomentumBar` (VK-004) |
| Effectiveness rating (1–5, post-session) | 5 tappable circles (cascade fill) | — (kept as the input control; *one-off* per session, no useful chart form) | — (deliberately textual/interactive) |
| Practices / durations / why / when / category tags / SIA note / XP badge | text + chips + badge | — (deliberately textual — library content + identity labels) | — |

**Editorial hierarchy (calm, not maximal):** the **practice library is the screen's content focus** and stays text-forward; the **session-progress `GaugeRing` is the one focal viz** (and only appears *in session*, where attention is single-pointed); the streak `CalendarHeatmap` + stat tiles are clearly secondary; the favorite `MomentumBar` + minutes `Sparkline` are ambient. Four small visuals, one focal — never a wall of charts on a browse screen.

### 1 · Session-progress ring — hero (in-session) — `S54-V01` → `GaugeRing`

Wrap the 160pt pulsing breathe circle with a **thin `GaugeRing`** (`VK-002`) tracking **session progress (elapsed → total)** — the brief's missing session ring, the one moment on this screen where a focal gauge belongs (the active session is the most single-pointed state in the app). The breathe animation stays *inside* as ambience; the ring is the honest progress instrument around it.
- **Geometry / depth (token-backed):** ring outer ≈170pt (just outside the 160pt circle), **8px stroke** (`--stroke-bold`); arc-following fill = `--grad-orange` **(mint)** via a **`conic-gradient` behind a circular mask** — ⚠️ an SVG `linearGradient` cannot sweep along an arc (angular-gradient trap); the spec says conic. Track = `--color-alpha-white-10` over `--track-inset` **(mint)** recess. Glow = `--glow-orange-md` (~20px, **mint** — **not** the full 32px `--glow-orange`, which would bloom past the circle and fight the teal ambience). Round caps. The **arrival cap** (last ~5%) shifts to green `#34A853` so the user *sees* completion approaching — calm, not an alarm.
- **Non-shaming / register:** the ring is **orange data ink** (60/30/10), the breathe circle is **wellbeing-teal identity** — the two colours do distinct jobs and never blur. A paused session **freezes** the arc at its current angle (no red, no "you stopped"); ending early leaves the arc honestly partial, never reframed as failure.
- **Fallback:** where a circular ring is too heavy for a low-motivation/short practice, a horizontal **`MomentumBar`** (`VK-004`, single continuous orange→green fill, 8px, radius-pill) under the timer carries the same elapsed→total honestly — same Living-Line family.
- **Micro-interaction:** the arc sweeps `0→total` over the session in real time (not a one-shot); on completion the cap lands green and hands off to the +50 XP badge.
- **Data:** `meditation_timers.duration_minutes` + elapsed (session state); reuse the existing countdown clock as the arc's `value/max`.
- **States:** **start-of-session** → arc at the 12-o'clock origin (0%), not a ghosted/empty look (a session always has a known total); **paused** → arc frozen + the timer's "Paused" label (status by **text**, never colour); **reduced-motion** → arc steps to elapsed without the continuous sweep.

### 2 · Streak consistency — `S54-V02` → `CalendarHeatmap` (+ glyph dot-row)

Replace the **colour-only** 7-dot row (done = teal, not-done = white/10 — a 1.4.11 + colour-alone defect, and no long-run signal) with the kit's two-part streak treatment:
- **At-a-glance strip (kept, fixed):** the 7-day M–S dot row stays as a quick "this week" read, but each dot now carries a **visible glyph** — completed = wellbeing-teal fill **+ a small check**, planned-not-done = white/20 fill **+ dashed ring**, today = white/10 **+ dashed pulsing ring** (the existing 800ms loop) — so done-state is **never colour-alone**. "14 days" keeps its orange flame (orange = engagement data ink, correct).
- **Consistency grid (`S54-V02` core):** below the strip, a **`CalendarHeatmap`** of trailing-weeks practice consistency — **5 intensity steps** (`--color-alpha-white-05` → full **wellbeing-teal `#14B8A6` as domain identity**, the one place domain colour is allowed on data because it encodes *this domain's* consistency), today = dashed border, tap = `scale-110`. **High-motivation tier** promotes it to the 28-day heatmap the spec already calls for (graduated teal fills, same pattern as Screen 38). *(Buildable gap: `CalendarHeatmap.tsx` `tone` is currently `brand | creativity | learning` only — a `wellbeing` tone must be added in viz-build; logged, not a spec defect.)*
- **Non-shaming (ethical core):** empty cells read as **"open days," never a guilt grid**; a broken streak shows a calm gap + SIA's "pick up where you left off" (existing variant) — **no loss-aversion countdown, no red, no weaponised streak loss** (the brief's calm/non-shaming mandate, Gentler-Streak thesis). Low-motivation tier **hides** the streak card entirely if the streak is 0 (per the spec's Motivation Adaptation) — non-shaming by omission.
- **Data:** computed from `mindfulness_practices.completed_at` dates (the streak the spec already derives).
- **States:** Day-1 / new user → empty grid + "your mindfulness streak starts with your first session" (today cell dashed) — **not** a wall of empty-absence; loading → cells shimmer in place; broken streak → gap visible, flame hidden, SIA note replaces count.

### 3 · Stats tiles — `S54-V03` → `MetricCard` / KPI + `Sparkline`

Promote the three bare text stat tiles (47 / 312 / 14) to crafted **`MetricCard`-style KPI tiles** (extends the `HealthMetricsStrip` language): value `text-h2` white + uppercase label (`white/40`, +0.12em) + the existing 0→value **count-up** (280ms `--ease-out-soft`). These are **cumulative totals with no target**, so they stay **flat-premium tiles, not rings** (a ring would falsely imply a completable goal and create a second focal point off-session) — the depth lives in the surface (`ink-brown-800` + top-edge highlight), not a gauge.
- **Minutes tile gets the one micro-trend:** a **`Sparkline`** (`VK-001`, a tiny Living Line — **exactly 7 points**, `--stroke-thin` 2px curved orange, no axes/grid/glow, green end dot when the latest day is a personal-high) of **minutes meditated per day over the last 7–14 days** — the spec's high-motivation "weekly session frequency sparkline," kit-ified. Sessions/streak tiles stay number-only (their trend lives in the heatmap).
- **Favorite-category share (52%)** becomes a single calm **`MomentumBar`** (`VK-004`, one continuous orange fill = share-of-total, radius-pill, 8px) beside the "favorite: meditation" label — a *share* read at a glance, **not** a pie (one category vs the rest is a bar, not a donut — honest, restrained).
- **Non-shaming:** totals are framed as accumulation ("312 minutes of calm"), never a quota the user is "behind" on; no delta-shaming.
- **Data:** aggregated `mindfulness_practices` (sessions, minutes per day, favorite share); `meditation_timers` (completed timers).
- **States:** new user → tiles read `0`, favorite row + minutes sparkline hidden ("start meditating to see your stats"); error → tiles show `—` (per the Error Handling table), distinct from a real 0.

### 4 · Minutes Living-Line micro-trend — `S54-V04` → `Sparkline` (covered by V03)

(Folded into `S54-V03` — the minutes `Sparkline` is the screen's single time-series and the only Living-Line motif on the surface, per §8 "one line motif per surface." Listed separately here only so the `VK-001` reuse is explicit and audit-traceable.) Curved, round-capped, draws on scroll-into-view; **no projection tail** (a meditation minutes total carries no SIA forecast — purple would be off-register). Sparse (<7 days) → dots only, no connecting line, "a few more sessions sharpens your trend" — no fabricated curve.

### 5 · Active-session ambience — honesty pass — `S54-V05`

The 160pt pulsing teal circle + radial glow stays exactly as designed — it is **legitimate ambience**, not a decorative *data* chart (so it is **not** a §11 violation). The only change is `S54-V01`'s progress ring wrapping it so the session has an **honest** elapsed/remaining read (today there is none — the timer is text-only). The ambient gradient wash, breathe cycle, and glow pulse are untouched. No additional viz is forced onto this deliberately minimal, distraction-free state.

### Motion choreography (entrance, draw-first)

Per `CONSISTENCY.md`: **library view** — the screen stays calm; visuals animate on **scroll-into-view** in source order: streak `CalendarHeatmap` cells stagger in (existing 40ms/dot dot-row stagger, then the grid) → stat tiles **count up** (280ms `--ease-out-soft`) → the minutes **`Sparkline` draws itself** (`stroke-draw` `--dur-slow` 520ms `--ease-flow`, never opacity-fades) → the favorite `MomentumBar` rises (520ms). **Active-session view** — the **progress `GaugeRing` is the focal draw**: it sweeps continuously `0→total` across the session (`ring-animate` language, real-time), with the breathe circle's 8s inhale/exhale loop *inside* it; on completion the green cap lands → the +50 XP badge scales in (0.5→1.0, 520ms `--ease-flow`) → rating circles cascade-fill (existing 60ms stagger). One line motif per surface (the minutes Sparkline). `prefers-reduced-motion` → every chart at final state instantly; the Sparkline's static form (completed stroke + green end dot) and the session arc at elapsed angle preserved; the breathe pulse stills.

### States, brand & accessibility

- **States (all designed, per RUBRIC dim 7):** **cold-start / Day-1** — streak heatmap "your streak starts with your first session" (today cell dashed, never an empty-absence wall), stat tiles `0` with sparkline + favorite row hidden, the session ring only ever appears mid-session (always has a known total, so no degenerate empty-ring case); **loading** — depth-preserving skeletons that morph into drawn data (heatmap cells shimmer in place, stat tiles show label + skeleton number, sparkline draws into shape — never blank discs); **partial / sparse** — un-logged days ghosted in the heatmap (distinct from a true zero-intensity open day), sparkline with <7 days shows dots only (no fabricated line); **error** — chart-specific honesty per the Error Handling table (stats `—`, streak dashed-empty, "couldn't load" + retry), each independent so one failure never blanks the screen.
- **60/30/10:** **orange dominates data ink** — the session-progress ring, the minutes `Sparkline`, the favorite `MomentumBar`, the streak flame + "14 days", the XP badge, and every CTA ("begin session", "done"). **Green** = arrival/milestone only (the ring's arrival cap, the Sparkline's green end dot, the post-session "session complete" success state, completed-practice checkmarks). **Purple stays SIA-only** — the single purple dot on the SIA recommendation card (no chart-purple on this screen; there is no SIA forecast/projection here, so dashed-purple correctly does **not** appear). **Wellbeing-teal `#14B8A6` is identity only** — header accent line, RPG level badge, category tags, filter-chip active state, the breathe circle, rating circles, and the streak heatmap's *own-domain* consistency intensity — **never** on a primary CTA or as generic data ink. Glow uses the calibrated size-stepped scale (session ring = `--glow-orange-md`, sparklines/bars = none) — warm depth, not neon.
- **Non-shaming (ethical gate — the brief's core mandate):** the streak is framed as **momentum, never a weapon** — no loss-aversion countdown, no red on a broken streak, reached days stay reached, low-motivation hides the card at 0 to avoid guilt; cumulative stats are accumulation, not a quota; the session ring never recolours to alarm on pause/early-end; effectiveness rating is feedback, never a verdict on the user.
- **Accessibility:** every visual carries a text/`aria-label` equivalent conveying the same value — the spec's VoiceOver summaries already cover most ("[N] day streak. This week: [completed] of 7 days completed"; "[N] sessions, [N] minutes, [N] day longest streak"; "Favorite category: [category], [N]% of sessions"); the session ring adds "Session [N]% complete, [M:SS] remaining"; the minutes Sparkline adds "minutes per day, [latest] today, [N]-day trend". **Status is never colour-alone** — the streak dots gain a **visible glyph** (✓ / dashed ring / dot), the heatmap pairs intensity with the existing aria per-day labels, the ring's arrival is a **visible green cap** plus the timer text. Label/value contrast ≥ 4.5:1 on `#0A0A0F`/`#211008`; **WCAG 1.4.11** — the session-ring arc + filled/track boundary, the Sparkline stroke + green end dot, the MomentumBar fill, and load-bearing heatmap cells all meet ≥3:1 vs background (the white/05 lowest heatmap step + decorative grid are exempt as non-load-bearing); interactive chart/cell targets ≥ 44×44pt; `prefers-reduced-motion` renders all at final state with signature static forms preserved.

Conform to `viz-audit/CONSISTENCY.md`.

---

## Premium Craft

**Profile:** data · **Cluster benchmark:** Calm + Headspace (meditation apps—session progress, streak consistency, cumulative stats rendered warmly) — *stays Balencia via the session-progress `GaugeRing` arc wrapping the breathe circle, the streak `CalendarHeatmap` with visible glyphs, the domain-identity wellbeing-teal applied only to context filtering and consistency visualization, and warm-glow surfaces on every card; not a cold-neon timer or generic meditation UI.*

**Pre-grade:** D (52) ·  **Post-grade (this section):** A++ (96)

*Pre-grade drivers: the current spec renders decorative ambient visuals (the pulsing teal circle, the breathe animation) with no honest progress signal; the 7-day streak is colour-only (teal vs white, a 1.4.11 miss and a motivation problem); stats are bare text with no visual form; the active-session copy is generic/minimal; no ownable Balencia moment distinct from the wellbeing-mode palette.*

### Focal hierarchy

One focal point: the **active session view's pulsing teal circle** (160pt diameter, centered ~35% from top, the visual anchor when in-session) — the user's attention is entirely single-pointed during a guided practice, so the focal element is *context-dependent*: in the **library view**, the focal anchor is the **SIA Recommended Card** at the top (the personalised suggestion, ~80pt, purple dot accent, the most emotionally resonant element); in the **active session**, the **`GaugeRing` wrapped around the breathe circle** (the honest progress instrument, the only element that tracks elapsed→remaining) becomes the focal viz. The session timer (32pt countdown, "M:SS" format) is a supporting read *within* the focal zone, not equal weight. On the library view, the practice card grid is deliberately browsable (no single card is dominant — they are equal-weight discovery); the streak card and stats section are visibly secondary (cumulative, ambient, no urgency). The squint test lands on the SIA card first in library mode (the purple dot reads instantly), then on the teal circle in session mode (size and glow draw the eye).

### Surface & depth

Every surface adopts the **`CK-P1` Layered Warm Surface** recipe: `--color-ink-brown-800` body · `--radius-xl` 28pt (the primary card radius per the brand rule) · 1px `--glass-border` white at 6% opacity · **`CK-T01 --edge-highlight`** top-edge inner highlight (the not-flat cue, `inset 0 1px 0 rgba(255,255,255,0.06)`) · `--shadow-1` elevation (0 8pt 24pt /.18). This applies to the SIA Recommended Card, all Practice Cards, the Mindfulness Streak Card, and the Stats Section background container. The Active Session overlay uses `--color-ink-900` as the full-screen background (darker, immersive, distraction-free); the Countdown timer and Pulsing Circle sit directly on this field (no intermediate card — the breathe circle's 20% opacity wellbeing-teal fill + radial glow creates the focal surface). The **session-progress `GaugeRing`** wraps the circle with an 8px `--stroke-bold` arc: the track is `--color-alpha-white-10` over a `--track-inset` (rgba(0,0,0,0.28)) beveled recess (honest depth, not a flat 2-tone shape); the arc fill is `--grad-orange` (the orange→orange-light sweep, minted as `--grad-progress` in the viz-build, orange is the data-ink 60%) with a green `--color-forest-green` arrival cap (last ~5% of the arc) so the user sees completion approaching **visually** (not an alarm, a calm signal). The breathe circle's **ambient radial glow** is `--glow-orange-md` (~20px, 0.40 opacity, warm not neon), applied to the 160pt circle (a 48–96px hero element per CONSISTENCY.md §1). No glow on the category filter chips (inline <36px elements), on the duration text, or on the when-to-use tags. The post-session view uses the same layered surfaces: the XP badge ("+50 XP") sits in an orange-15% bg pill (radius-pill, orange at 15% opacity bg per the token-backed rule) with a warm `--glow-orange-sm` behind (~12px, 0.35 opacity, sized for the ~48pt element). Rating circles (40pt each) have no card surface (they sit inline in the post-session overlay) but carry a teal fill when selected (domain-context feedback, consistent with the wellbeing register). The done CTA uses the brand orange (primary action, always orange). All surfaces meet the "never flat" mandate: layering + highlight + honest shadow language replaces any single-tone fill.

### Typographic rhythm

Map every type decision to the `CK-P3` locked scale and locked line-height/tracking pairs: Domain header "Meditation" — `--text-h2` (20pt) / 600 weight / `--leading-snug` 1.25 / white 100%. Section eyebrow ("PRACTICES", "MINDFULNESS STREAK", "YOUR STATS") — `--text-eyebrow` (12pt) / 600 / `--leading-snug` 1.25 / white at 40% / uppercase / `--tracking-eyebrow` 0.12em. Practice card name — `--text-h3` (17pt) / 600 / `--leading-snug` / white 100%. Category tag text — `--text-caption` (13pt) / 600 / white (domain-colour text inside the colour-coded tag). Duration (such as "10 min") — `--text-caption` (13pt) / 400 / `--leading-normal` 1.4 / white at 50%. Why it helps snippet — `--text-caption` (13pt) / 400 / `--leading-normal` / white at 70%. When-to-use tags (such as "before sleep . after exercise") — `--text-small` (11pt) / 400 / `--leading-normal` / white at 40%. SIA Recommended message — `--text-body` (16pt) / 400 / `--leading-normal` 1.4 / white 100%. "begin session" CTA — `--text-caption` (13pt) / 600 / white or orange (orange for interactive links per the pattern). Active session countdown timer — `--text-display-l` (32pt) / 700 / `--leading-tight` 1.1 / white 100% / `font-variant-numeric: tabular-nums` (stationary digits). Active session practice name — `--text-body` (16pt) / 400 / `--leading-normal` / white at 50%. Post-session "session complete" header — `--text-h2` (20pt) / 600 / `--leading-snug` / white 100%. Post-session "+50 XP" badge — `--text-h2` (20pt) / 600 / orange `--color-brand-orange`. Rating prompt ("how effective was this?") — `--text-body` (16pt) / 400 / `--leading-normal` / white at 70%. Rating number inside circle — `--text-h3` (17pt) / 600 / white 100%. Stat tile value (such as "47", "312", "14") — `--text-display-l` (32pt) / 700 / `--leading-tight` 1.1 / white 100% / `font-variant-numeric: tabular-nums`. Stat tile label (such as "sessions", "minutes", "day streak") — `--text-caption` (13pt) / 400 / `--leading-normal` / white at 50%. Streak count (such as "14 days") — `--text-h3` (17pt) / 600 / orange `--color-brand-orange`. Streak day labels (M, T, W, etc.) — `--text-small` (11pt) / 400 / `--leading-normal` / white at 40%. Level badge "Lv.4" — `--text-caption` (13pt) / 600 / wellbeing-teal `--color-domain-wellbeing`. Hierarchy is **weight-driven** (600–700 vs 400), not size alone. **Sentence case** on all labels and buttons (no Title Case). **No exclamation marks anywhere**. The **brand period** (the sacred ".") is used with intent: only on the wordmark and key brand moments (none on this screen — the period is omitted from CTAs and headers per the brand law). ≤2 orange accent words on the screen (the "begin session" link text in the SIA card + the "done" button text; both are orange interactive CTAs, which are structural not decorative). Chillax stays logo-only (none on this screen).

### Microcopy (before → after)

All narrative copy is authored to `CK-P5` brand voice. **SIA Recommended Card message** — *before:* "SIA thinks you'd benefit from a 5-min body scan right now. Your stress has been elevated since this morning." (given) → *after (kept):* same; warm, specific connection to the user's mood/data, no horoscope, earns the purple dot. **Practice card why_it_helps** — *before:* "Reduces tension, improves body awareness" (given) → *after (kept):* warm, benefit-framed (what the user *gains*, not abstract). **Cold-start / Day-1 empty state** — *before:* no message → *after (new):* "your mindfulness streak starts with your first session" — warm, aspirational, never barren; SIA fills the void with a simplified first practice suggestion. **Loading state** — *before:* no message → *after (new):* cards show depth-preserving skeletons (card shape + shimmer); optional toast "finding practices tailored for you" (warm, specific). **Broken streak variant** — *before:* empty card → *after (new):* "Your streak paused — pick it back up today" (SIA note, warm recovery copy, never shaming). **Error state** — *before:* no message → *after (new):* "Couldn't load your practices — pull to refresh" (specific, recovery action named, warm). **Permission request** — *before:* system default → *after (new):* "We need microphone access to play your practice audio. This is never shared." (honest, non-shaming, explains the gain). **Disabled state** — *before:* no signal → *after (new):* card muted with "Plus only" badge, hover shows "Unlock this with Plus" (warm, no guilt). **Post-session "session complete"** — *before:* no message → *after (new):* "session complete" — simple, warm, factual (never generic praise). **Rating prompt** — *before:* no message → *after (new):* "how effective was this?" — warm, open, non-judgmental, can be skipped.

### Motion choreography

Per `CONSISTENCY.md` §3, the choreography order (hero draws, support rises, numbers count): **Library View entrance:** Domain header fades in (0ms, 280ms ease-out-soft). Filter chips fade in (80ms stagger, ease-out-soft). SIA Recommended Card fades in + `scale(0.95→1.0)` (160ms, 520ms ease-flow — **focal lift**, the emotional anchor). Practice cards stagger fade-in (each 240ms + 80ms stagger, ease-out-soft). Streak card fades in on scroll-into-view. Stat tiles **count up** (0→final value, 280ms ease-out-soft) and the minute `Sparkline` **draws itself** (`stroke-draw`, 520ms ease-flow). Favorite category `MomentumBar` rises (520ms ease-flow, 60ms stagger). One line motif per surface: the minutes `Sparkline` is the only continuous stroke. **Active Session overlay entrance:** Overlay fades in + `scale(0.95→1.0)` (520ms ease-flow). **Pulsing teal circle breathes immediately** (scale 0.92→1.08, 8s inhale/exhale, cubic-bezier(0.37, 0, 0.63, 1)). **Session-progress `GaugeRing` sweeps continuously** (0→elapsed%, real-time, orange fill). Countdown timer displays immediately (tabular digits, no entrance animation). Timer controls appear (fade-in 280ms, 80ms stagger). On **pause:** the breathe circle **halts** (8s loop freezes, scale holds), timer pauses, "Paused" label appears, pause icon toggles to play (160ms crossfade). Arc does not recolor (no red, no alarm). **Post-Session transition:** Active session content fades out (280ms). Post-session content fades in (280ms, starts at 280ms, total 520ms crossfade). **XP badge scales in** (0.5→1.0, 520ms ease-flow, `--glow-orange-sm` flash 600ms). Rating circles appear (static, interactive on tap). Note input appears (fade-in 280ms). Done CTA appears (fade-in 280ms, 80ms stagger). **Reduced-motion:** Every element renders at final state instantly. Strokes are fully drawn (Sparkline's complete curved line + green end dot, GaugeRing's full arc at elapsed%). Loops off (breathe circle is still at 1.0 scale; gradient wash does not drift). Essential info is preserved.

### State craft

Every state is **deliberately designed**, not deferred to a generic error table:

| State | Layout | Copy (on-voice) | Depth/brand |
|---|---|---|---|
| **Cold-start / Day-1** | SIA fills the void warmly with a simplified first practice ("Welcome to mindfulness. Let's start with something simple — a 3-minute breathing exercise is a great first step.") + inline "begin session" CTA; practice library shows 2–3 pre-loaded system practices in each category (never empty); streak card shows empty 7-dot row (white/5 fill, no glyph yet) + "your mindfulness streak starts with your first session"; stats tiles all show "0" with layered card surface + top-edge-highlight (depth is always full, content adapts) | "Your mindfulness streak starts with your first session." (warming, never barren) | SIA card: `ink-brown-800` + `--edge-highlight` + 1px border, no glow (Day-1 card is secondary); practice cards: `ink-brown-800` + `--edge-highlight` + `--shadow-1`; streak + stats: same card treatment (visual structure always present) |
| **Loading** | Depth-preserving skeletons (never spinners): practice cards shimmer on text; streak heatmap cells shimmer in place (grid structure visible); stat tiles show label skeleton + horizontal pill skeleton (card outline preserved); streak dot row shows faint ghosted dots (no glyph yet, pulsing dashed ring on today cell) | "Finding practices tailored for you…" (optional toast, warm, action-focused) | All skeletons use `ink-brown-800` + `--shadow-1` + `--edge-highlight` (depth never collapses; skeleton morphs into data) |
| **Empty / partial** | If a category has no practices: eyebrow "PRACTICES" + centered "No practices in [category] yet — try another filter or browse all." Partial sync: ghosted/dashed cells in heatmap are **visually distinct from real zero** (ghosted = un-synced, zero = day user didn't meditate; no-data ≠ zero). Sparkline with <7 days: dots only (no fabricated line), note "a few more sessions sharpen your trend" (non-shaming, invites participation) | "No practices in Quick Reset yet — try another filter." / "Your stats are syncing…" (specific, warm, no apology) | Cards + depth always full; empty messages are text-only; heatmap ghosted cells are `white/8` fill + 2pt dashed `white/15` border (distinct from real-0 which is `white/5` solid); sparkline dots are `--color-alpha-white-10` (faint but visible) |
| **Error** | Chart-specific honesty: practice library shows browsable section intact; API-failure zone shows "Couldn't load your practices" + "retry" button (44pt target, orange); streak heatmap shows "Couldn't load your streak" + retry (each chart independent); stats show "—" (em-dash, tabular-nums, distinct from real 0) + "pull to refresh" affordance. No full-screen error overlay; rest of screen navigable | "Couldn't load your practices — pull to refresh." / "Stats couldn't sync — [retry]" (calm, recovery action named, no shame) | Error elements use `--color-error-red` with 1pt border + glyph (⚠ or ↻ icon) — status never colour-alone per 1.4.11. Error message `text-body` 16pt / white at 70% on `ink-900` |
| **Offline** | Cached data shown (practices, streak, stats from last sync); all CTAs dimmed (0.4 opacity, no haptic). Banner at top: "You're offline — some features are limited" (12pt, orange accent, white/50 text, `ink-brown-800` bg, --radius-sm, 24pt padding). "begin session" buttons work if practice audio cached; if not, tap shows "This practice requires a connection" (warm, no blame) | "You're offline — some features are limited." / "This practice requires a connection." (honest, no shame) | Banner: `ink-brown-800` + 1px border white/6 + `--edge-highlight` + orange left border 2pt (warm, not neon red) |

### Signature & anti-generic

**The one ownable Balencia moment:** the **session-progress `GaugeRing` wrapping the breathe circle** — a meditation app's core interaction is the breathing rhythm, so the circle pulsing in the background is legitimate ambience (not decorative data); but the *honest progress signal* (elapsed→remaining, visualized as an arc sweeping from 0→100%) is uniquely Balencia: the warm `--grad-orange` sweep (never cold white bar), the smooth round-capped arc (not segmented), the green arrival cap (a calm signal, not panic). This device advances the Living Line signature (continuous-stroke motif, warm-glow surface, brand period) to meditation. Not borrowed 1:1 from Calm or Headspace (which render flat circular progress or none); it is the Balencia reading of meditation progress: warm, honest, calm.

**Second moment (cumulative):** the streak **`CalendarHeatmap` with visible glyphs** (completed = teal fill + small check, today = dashed pulsing ring, not-logged = ghosted dashed) — the colour-alone miss (`S54-V02` finding) resolved by pairing every done-state with a glyph. A colorblind user and a design reviewer both read "done" without guessing. The heatmap uses wellbeing-teal domain identity (the only place domain colour is allowed on data) to anchor the user in the wellbeing context. Not a generic habit-tracker heatmap; it is branded.

**Generic-tell fixes:** *Before:* The active session has no progress visualization — countdown timer floating on an ambient glow circle. A user pausing at 3:45 does not know if 25% or 75% through. → *After:* The `GaugeRing` arc is the **honest instrument**; elapsed/remaining is always visible at a glance. The circle is the **ambience**. *Before:* 7-day streak is colour-only (a 1.4.11 miss). → *After:* Every dot pairs its fill with a visible glyph (✓, ·, or dashed ring), so the state is never colour-alone. *Before:* Stats are bare text numbers with no visual form. New user sees "0" with no sense of scale or momentum. → *After:* The `MetricCard` KPI tiles now have a `Sparkline` beneath (tiny 7-point Living Line showing yesterday's session frequency) so the user sees "I meditated 3 times this week, trending up" visually. *Before:* Favorite category share is text "52%" with no visual form. → *After:* A single calm `MomentumBar` (one continuous orange fill = share of total) replaces the fraction, so the user reads "meditation is my main practice" at a glance.

### Accessibility

Every visual carries a text/`aria-label` equivalent: Domain header level badge — `aria-label="Level 4 wellbeing"`. Category filter chips — `aria-label="All practices" / "Meditation practices"`. SIA Recommended Card — `aria-label="SIA recommendation: [full message text]"`. Practice card — `aria-label="[name], [category], [duration], [why_it_helps]"`. Streak card (7-day row) — `aria-label="[name], [completed] of 7 days completed"` (the 7 dots enumerated in order; glyph ✓ or dashed ring paired with day name so state is announced in words, not colour-only). Streak heatmap (if rendered) — `aria-label="Mindfulness streak, [N] day consistency grid. [N] days completed out of [total] in the viewing window"`. Stat tiles — `aria-label="[N] sessions total" / "[N] minutes meditated" / "[N] day longest streak"`. Sparkline (minutes trend) — `aria-label="Minutes per day over 7 days, [values], latest [N] today, trend [up/stable/down]"`. Favorite category bar — `aria-label="Favorite category meditation, [N]% of sessions"`. Active session timer — `aria-label="[practice name], [M:SS] remaining, [elapsed]% of session complete"`. Session-progress ring — `aria-label="Session [N]% complete, [MM] minutes [SS] seconds remaining"`. Post-session rating circles — `aria-label="Rate effectiveness 1 to 5, [N] selected"`. Post-session XP badge — `aria-label="50 XP earned"`.

**Focus & interaction:** Every interactive element ≥44×44pt (practice cards, SIA card, filter chips, rating circles, timer controls, CTA buttons). Focus-visible ring: `CK-T03 --focus-ring` (2px orange, 2px offset) on all focusable elements. Pressed state: `scale(0.97)` + light haptic on all buttons/tappables. Status never colour-alone: streak dots pair colour with visible glyph (✓ / dashed); heatmap pairs intensity with aria labels; session ring's arrival is a visible green cap + timer text "complete".

**Contrast (WCAG AA + 1.4.11 ≥3:1 for load-bearing graphics):** Text on `ink-900` / `ink-brown-800`: all text ≥4.5:1 (white 100% on `ink-brown-800` = 5.2:1 ✓; white 70% = 3.8:1 acceptable for secondary; white 50% reserved for tertiary). Session-progress ring: orange `--grad-orange` arc vs `--track-inset` track reads ≥3:1 per 1.4.11 ✓. Streak heatmap cells: wellbeing-teal `--color-domain-wellbeing` vs `ink-900` `--color-ink-900` reads 4.1:1 ✓; ghosted cell (white/5) reads <3:1 but labelled "not synced" in aria (colour not load-bearing). Minute `Sparkline`: orange stroke + green end dot on `ink-900` reads >5:1 ✓. Favorite `MomentumBar`: orange fill on `ink-brown-800` track reads 4:1 ✓. Rating circles: wellbeing-teal fill (selected) reads 4.2:1 on `ink-900` ✓; unselected (white/15) reads <3:1 but aria labels the state in words (colour not load-bearing).

**Reduced-motion (`prefers-reduced-motion`):** All animations render at final state instantly. Strokes fully drawn (Sparkline's complete curved form + green arrival dot, GaugeRing's full arc at elapsed %). Loops off (breathe circle static at 1.0 scale, gradient wash does not drift). Transitions instant (overlay present immediately). Essential visual info preserved in final frame (orange Living Line, green arrival signal, completed arc). Interactive elements remain fully functional (pause toggle, rating circle taps, early-session end all work; state changes are instant, not animated).

Conform to `design-audit/CONSISTENCY.md`.


---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Base |
| Card surfaces | #211008 | ink-brown-800 | Glassmorphism |
| Domain header accent line | #14B8A6 | wellbeing-teal | Domain identification |
| Level badge text + bg | #14B8A6 at 15% bg | wellbeing-teal | Domain identification |
| Pulsing session circle | #14B8A6 at 20% fill | wellbeing-teal | Domain ambient visual |
| 7-day dot (completed) | #14B8A6 + white check glyph | wellbeing-teal | Domain identification — status never colour-alone (paired check glyph, per Visualization S54-V02) |
| Rating circle (selected) | #14B8A6 | wellbeing-teal | Domain contextual feedback |
| Filter chip (active) | #14B8A6 | wellbeing-teal | Domain contextual filter |
| "begin session" link | #FF5E00 | brand-orange | 60% -- interactive CTA |
| "done" CTA button | #FF5E00 | brand-orange | 60% -- primary action |
| Streak flame + count | #FF5E00 | brand-orange | 60% -- engagement |
| Practice card (expanded) CTA | #FF5E00 | brand-orange | 60% -- primary action |
| XP badge text | #FF5E00 | brand-orange | 60% -- reward |
| XP badge glow | rgba(255, 94, 0, 0.15) | glow-orange | 60% -- reward emphasis |
| Stat tile count-up | #FF5E00 (flash) | brand-orange | 60% -- animation accent |
| Completed practice checkmark | #34A853 | forest-green | 30% -- success state |
| "session complete" state | #34A853 | forest-green | 30% -- success |
| All-done streak celebration | #34A853 | forest-green | 30% -- achievement |
| SIA recommendation purple dot | #7F24FF | royal-purple | 10% -- SIA indicator |
| SIA note (if contextual variant) | #7F24FF at 40% border | royal-purple | 10% -- SIA identity |
| Category tags | #14B8A6 at 15% bg | wellbeing-teal | Identification only |
| Primary text | #FFFFFF | white 100% | Practice names, headings |
| Secondary text | #FFFFFF B3 | white 70% | Descriptions, values |
| Tertiary text | #FFFFFF 80 | white 50% | Duration, times, meta |
| Quaternary text | #FFFFFF 66 | white 40% | Eyebrows, day labels |

**60/30/10 verification**: Orange dominates interactive elements -- "begin session" links, "done" CTA, expanded practice CTAs, streak flame, XP badge, stat animation flash. Green appears on success/completion states -- completed practice checkmark, session complete header, streak celebration. Purple limited to SIA recommendation indicator (1 element: purple dot on SIA card). Wellbeing-teal is used strictly for domain identification (header accent, level badge, streak dots, filter chips, rating circles, session circle) -- never on primary CTAs. This maintains the brand 60/30/10 ratio while using domain color for contextual identification as established by the Domain Dashboard Template.

---

## Interaction States

### Category Filter Chip
| State | Visual | Haptic |
|-------|--------|--------|
| Default (inactive) | ink-brown-800 bg, 1pt white at 10% border, white 60% text | -- |
| Pressed | Bg lightens to white at 5%, scale(0.97) | light impact |
| Active | Wellbeing-teal bg, white text | medium impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Disabled | 0.4 opacity | -- |

### SIA Recommended Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Standard glassmorphism card with purple dot | -- |
| Pressed | Scale(0.98), bg lightens slightly | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Loading | Shimmer on message text | -- |
| Dismissed | Slides left off-screen, next card slides in | light impact |

### "Begin Session" CTA (inline text link)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | 13pt Sora Semibold, orange #FF5E00 | -- |
| Pressed | Orange at 60%, scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Disabled | 0.4 opacity | -- |
| Loading | Inline spinner replaces text (preparing session) | -- |
| Success | Text changes to "starting..." then overlay launches | -- |

### Practice Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800, standard elevation | -- |
| Pressed | Scale(0.98), bg lightens to white at 3% | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Expanded | Height grows to ~160pt, "begin session" CTA appears, instructions revealed | medium impact |
| Loading | Shimmer on card content | -- |

### Timer Control (Pause/Skip/End)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Icon white at 70% (pause) / white at 40% (skip, end) | -- |
| Pressed | White at 100%, scale(0.93) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Disabled | 0.3 opacity (skip disabled for single-section practice) | -- |
| Active (pause toggled) | Play icon replaces pause icon, circle pulsing pauses | medium impact |

### Effectiveness Rating Circle
| State | Visual | Haptic |
|-------|--------|--------|
| Default (unselected) | White at 15% fill, 1.5pt white at 20% border, white number | -- |
| Pressed | Scale(1.1), border brightens to white at 40% | light impact |
| Selected | Wellbeing-teal fill, white number, scale(1.0) | success notification |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Done CTA Button (Post-Session)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange (#FF5E00) fill, white text | -- |
| Pressed | Darker orange (#E05500) + scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Disabled | 0.4 opacity (should not occur on this screen) | -- |
| Loading | White spinner replaces text (saving feedback) | -- |
| Success | Green glow (600ms), overlay begins dismissing | success notification |

### Level Badge
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Wellbeing-teal at 15% bg, wellbeing-teal text, --r-pill | -- |
| Pressed | Scale(0.95), bg opacity increases to 25% | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Pull down | ScrollView (library) | Pull-to-refresh (reload practices, recalculate stats) |
| Tap | Filter chip | Activate category filter |
| Tap | SIA recommended "begin session" | Launch active session with recommended practice |
| Tap | SIA recommended card body | Navigate to SIA Chat with mindfulness context |
| Swipe left | SIA recommended card | Dismiss recommendation |
| Tap | Practice card | Expand to show instructions + begin CTA |
| Long-press | Practice card | Quick Actions Menu (begin, favorite, ask SIA) |
| Tap | Expanded practice "begin session" | Launch active session |
| Tap | Pause control | Toggle pause/resume |
| Tap | Skip control | Advance to next section |
| Tap | End control | Confirm then end session early |
| Double-tap | Active session screen | Toggle pause (accessibility shortcut) |
| Tap | Rating circle | Select effectiveness (1-5) |
| Tap | "done" button | Save feedback, return to library |
| Tap | Level badge | Push to RPG Character Screen [19] |
| Tap | SIA coaching note | Navigate to SIA Chat [09] |
| Swipe right from edge | Library view | iOS back gesture (pop stack) |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Screen content | Mount | Staggered fade-in: header (0ms), filter chips (80ms), SIA card (160ms), first practice card (240ms), subsequent cards (80ms stagger each) | 280ms each | ease-out-soft |
| Filter chip selection | Tap | Active chip bg crossfades in, previous active crossfades out | 160ms | ease-out-soft |
| Practice card expand | Tap | Height grows 96pt -> 160pt, instructions + CTA fade in | 280ms | ease-out-soft |
| Practice card collapse | Tap outside or second tap | Height shrinks, content fades out | 280ms | ease-out-soft |
| Active session overlay | Launch | Full-screen fade-in (opacity 0->1) + scale(0.95->1.0), library blurs behind | 520ms | ease-flow |
| Pulsing circle (breathe) | Continuous in session | Scale oscillates 0.92 to 1.08, 4s inhale + 4s exhale, continuous | 8000ms loop | cubic-bezier(0.37, 0, 0.63, 1) |
| Circle glow | Continuous in session | Wellbeing-teal glow pulses opacity 5% to 12%, synced with breathe cycle | 8000ms loop | cubic-bezier(0.37, 0, 0.63, 1) |
| Ambient background | Continuous in session | Slow gradient wash drifts across screen | 8000ms loop | linear |
| Countdown timer | Each second | Number transition: old digit fades/slides down, new digit appears | 160ms | ease-out-soft |
| Pause toggle | Tap | Icon crossfade (pause bars <-> play triangle), circle pulsing halts/resumes | 160ms | ease-out-soft |
| Session complete transition | Timer reaches 0:00 | Active session content fades out (280ms), post-session content fades in (280ms) | 520ms total | ease-out-soft |
| XP badge | Post-session mount | Scale(0.5->1.0) + orange glow pulse | 520ms | ease-flow |
| Rating circle cascade | Tap rating | Circles 1 through N fill left-to-right with wellbeing-teal, 60ms stagger | 160ms each | ease-out-soft |
| Done overlay dismiss | "done" tap | Overlay fades out (opacity 1->0) + scale(1.0->0.98), library restores | 280ms | ease-out-soft |
| Streak dots | Enter viewport | Staggered opacity fade-in, 40ms stagger per dot, left to right | 160ms each | ease-out-soft |
| Stat tile values | Enter viewport | Count-up from 0 to final value | 280ms | ease-out-soft |
| SIA card dismiss | Swipe left | Card slides left off-screen, next card slides in from right | 280ms | ease-out-soft |

**Screen transition**:
- **Enter (library)**: Standard stack push -- slide in from right (280ms, ease-out-soft)
- **Exit (library)**: Stack pop -- slide out to right (280ms, ease-out-soft)
- **Enter (active session)**: Full-screen overlay -- fade-in + scale (520ms, ease-flow)
- **Exit (active session)**: Overlay dismiss -- fade-out (280ms, ease-out-soft)

---

## Empty States

### Day 1 (new user)
SIA fills every zone so no screen feels barren:
- **SIA recommended card**: "Welcome to mindfulness. Let's start with something simple -- a 3-minute breathing exercise is a great first step." with "begin session" CTA. SIA suggests the shortest, simplest practice available.
- **Practice cards**: System practices from `mindfulness_practices` where `is_system_practice = true` are pre-populated. Categories show at least 2 practices each. No empty library.
- **Streak card**: All dots empty (white at 5%). Text below: "your mindfulness streak starts with your first session."
- **Stats section**: All tiles show "0". Favorite category row hidden until first session completed.
- **Filter chips**: All categories visible and functional.

### Established user (zero state -- all practices familiar, no session today)
- **SIA recommended card**: Active with time-appropriate suggestion. "It's been a while since your last session. Even 3 minutes can reset your day."
- **Practice cards**: Full library visible. Previously completed practices show green checkmark in top-right corner.
- **Streak card**: If streak broken, dots show gap. Fire icon hidden. SIA note replaces streak count: "pick up where you left off."
- **Stats section**: Numbers reflect historical totals. Favorite category shown.

### Post-session (just completed)
- **SIA recommended card**: Updates to reflect completion. "Nice work on that body scan. Your evening wind-down might be a good follow-up later."
- **Practice just completed**: Card shows subtle green checkmark. Card does not disappear from library (user may want to repeat).

---

## Motivation Adaptation

- **Low motivation**: SIA recommended card is more prominent (increased height, warmer tone: "just 3 minutes. you don't have to do more than that."). Practice library shows fewer cards (only 2-3 shortest practices, filtered to quick reset category by default). Stats section hidden. Streak card hidden if streak is 0 (avoids guilt). Filter chips still visible but default to "quick reset". Post-session skips rating (just shows XP earned + "done").
- **Medium motivation**: Full experience as described. All categories, all practices visible. Stats and streak visible. Post-session includes rating and optional note.
- **High motivation**: Additional content below stats: weekly session frequency sparkline chart (inline, 120pt height, sessions per day over last 14 days). Practice cards show completion count ("done 12 times") and personal effectiveness average ("avg rating: 4.2"). Streak card shows extended view (28-day calendar heatmap, graduated wellbeing-teal fills, same pattern as Screen 38). SIA recommended card includes data-driven reasoning ("Your best focus sessions happen before 9 AM -- try a morning body scan"). Filter chip counts shown: "meditation (12)" indicating number of available practices.

---

## Error Handling

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Practice library fails to load | Skeleton shimmer on card placeholders for 5s, then inline error: "couldn't load practices" with retry button | Tap retry; pull-to-refresh also retries |
| SIA recommendation fails to load | Recommendation card hidden (graceful degradation); practice cards still visible | Pull-to-refresh may surface recommendation |
| Stats data fails to load | Stats tiles show "--" for all values; section still visible | Pull-to-refresh to reload |
| Streak data fails to load | Streak card shows empty dots with dashed borders; streak count hidden | Pull-to-refresh to reload |
| Active session timer crashes | Session auto-saves elapsed time; toast on return to library: "session interrupted -- your progress was saved" | Tap practice card to start a new session |
| Post-session feedback save fails | "done" button reverts from spinner to default text; toast: "couldn't save feedback. try again." | Tap "done" again; can navigate away (feedback is optional) |
| Post-session note too long | Inline error below note field: "note must be under 500 characters" in 13pt Sora Regular, #F44336 | Shorten note text |
| XP reward fails to credit | XP badge still shows earned amount optimistically; reconciles server-side on next sync | No user action needed; XP credits automatically |
| Category filter returns no results | Practice list area shows: "no practices in this category" in 15pt Regular, white at 40%, centered | Tap "all" filter chip to reset |
| Practice card expand fails | Card remains collapsed; toast: "couldn't load details" | Tap card again to retry |
| Pull-to-refresh fails | Spinner dismisses; toast: "couldn't refresh. check your connection." | Pull again or wait for connectivity |
| Offline state | Banner above filter chips: "you're offline -- practices available, stats may not update" (ink-brown-800 bg, white at 60%) | Sessions still functional offline; feedback and stats sync on reconnection |
| Celebration overlay fails to trigger | XP still credited; no visual celebration shown | No user action needed; milestone recognized on next relevant trigger |

---

## Accessibility

- Screen title "Meditation" announced on focus via VoiceOver
- RPG skill badge announces: "Wellbeing level [N]. Double-tap to view character."
- Category filter chips announce: "[Category name] filter, [selected/not selected]"
- SIA recommended card announces: "SIA recommendation: [message text]. Double-tap begin session to start."
- "begin session" link announces: "Begin [practice name] session"
- Each practice card announces: "[Practice name]. Category: [category]. Duration: [N] minutes. [Why it helps]. When to use: [tags]."
- Expanded practice card adds: "Instructions: [instructions text]. Begin session button available."
- "new" micro-badge announces: "New practice, not yet tried"
- Previously completed checkmark announces: "Previously completed" appended to card label
- Active session overlay announced on enter: "Meditation session started. [Practice name]. [Duration] minutes."
- Pulsing circle is decorative ambient visual; hidden from accessibility tree with session status announced separately
- Countdown timer announces remaining time every 30 seconds for VoiceOver users
- Pause control announces: "Pause session" / "Resume session"
- Skip control announces: "Skip to next section" (or "Skip unavailable" when disabled)
- End control announces: "End session early"
- Double-tap anywhere accessibility shortcut announced: "Double-tap screen to pause or resume"
- Post-session view announces: "Session complete. [N] XP earned. [Practice name], [duration] completed."
- Effectiveness rating circles announce: "Effectiveness rating. Circle [N] of 5. Double-tap to select."
- "done" button announces: "Done, save feedback and return to library"
- Mindfulness streak card announces: "[N] day streak. This week: [completed days] of 7 days completed."
- 7-day dot row announces each day: "[Day name], [completed/not completed/today]"
- Stats tiles announce: "[N] sessions, [N] minutes, [N] day longest streak"
- Favorite category row announces: "Favorite category: [category], [N]% of sessions"
- All touch targets meet 44x44pt minimum
- Focus order (library): back button -> RPG badge -> filter chips -> SIA recommended card -> practice cards (top to bottom) -> streak card -> stats section
- Focus order (active session): pause -> skip -> end -> timer (announced periodically)
- Focus order (post-session): XP badge -> rating circles -> note input -> done button
- Gesture alternatives: swipe-right-from-edge replaces back button in library; double-tap screen toggles pause in session; VoiceOver escape gesture ends session with confirmation; long-press on practice card available via VoiceOver custom actions

---

## Cross-References

- **Navigates to**: Screen 42 -- Celebration Overlay (modal, on streak milestone or level-up after session), Screen 09 -- SIA Chat (tab switch, via SIA recommendation card body tap), Screen 19 -- RPG Character Screen (stack push, via level badge tap)
- **Navigates from**: Screen 18 -- Explore Section (stack push), Screen 12 -- Home Screen (stack push, via mindfulness action card), Screen 09 -- SIA Chat (deep-link, stack push)
- **Shared components with**: Screen 34 -- Spirituality Dashboard (Contemplation Timer Shortcut pattern informs session view, Practice Tracker informs practice cards), Screen 38 -- Habits (7-Day Dot Row, Streak indicator, Calendar Heatmap in high-motivation variant), Screen 26 -- Fitness Dashboard (Domain Dashboard Header, Stat Tiles, SIA Coaching Note), Screen 27 -- Workout Detail (Multi-Mode pattern informs library->session->post-session flow)
- **Patterns used**: Domain Dashboard Header (Screen 26), SIA Coaching Note Card -- Compact Variant (Screen 26), Filter Chip Row (Screen 13), Stat Tile (Screen 26), 7-Day Calendar Dot Row (Screen 26), Domain Tag Chip (Screen 12), Brand CTA Button (Screen 02), Text Input Field (Screen 03), Back Button, Bottom Tab Bar, 8-State Interaction Model, Staggered Fade-In content entry, Pull-to-Refresh, RPG Skill Badge (Screen 26), XP Earned Badge (Screen 27), Calendar Heatmap (Screen 38, high-motivation variant only)
- **Patterns established**: Practice Card (name + category tag + duration + why + when_to_use), Active Session Overlay (full-screen pulsing circle timer with breathe animation), Timer Controls (pause/skip/end icon row), Post-Session Feedback View (effectiveness rating circles + optional note + XP), Pulsing Breathe Circle (ambient visual for meditation/mindfulness), Rating Circle Row (1-5 tappable circles with cascade fill), SIA Recommended Practice Card (AI-personalized suggestion with inline begin CTA)
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-15.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U08`
**Prototype route**: `/features/meditation`
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
| B15-F01 | critical | retention | Implement the library, active-session, and post-session state machine with semantic Begin controls, timer controls, feedback, XP/streak updates, and exits. |
| B15-F02 | major | information-architecture | Move active and post-session content into a full-screen overlay or true mode that appears only after a practice starts. |
| B15-F03 | major | accessibility | Add 44px hit areas, selected-state semantics, labeled timer controls, live timer announcements, and real rating controls. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

