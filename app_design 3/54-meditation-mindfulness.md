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
  - 7-Day Dot Row (established pattern): Horizontal row, evenly spaced, full-width minus 32pt (within card padding). Day label: 12pt Sora Regular, white at 40%, centered above dot (M, T, W, T, F, S, S). Dot: 12pt diameter circle. Completed: wellbeing-teal (#14B8A6) fill. Planned not done: white at 20%, 1pt dashed white at 30% border. Today (upcoming): white at 10%, subtle pulse (800ms loop, ease-flow). Row height: 40pt.
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

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Base |
| Card surfaces | #211008 | ink-brown-800 | Glassmorphism |
| Domain header accent line | #14B8A6 | wellbeing-teal | Domain identification |
| Level badge text + bg | #14B8A6 at 15% bg | wellbeing-teal | Domain identification |
| Pulsing session circle | #14B8A6 at 20% fill | wellbeing-teal | Domain ambient visual |
| 7-day dot (completed) | #14B8A6 | wellbeing-teal | Domain identification |
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

