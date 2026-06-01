# Screen Design: Breathing Exercises

**Screen**: 53 of 73
**File**: 53-breathing-exercises.md
**Register**: Wellbeing Mode (wellbeing-teal #14B8A6)
**Primary action**: practice guided breathing exercises
**Tab**: Wellbeing domain (stack push from Stress [52] or Explore [18])
**Navigation**: Stack depth 2-4 from Me tab root (Me Main [17] -> Explore [18] -> Breathing Exercises, or Me -> Explore -> Stress [52] -> Breathing Exercises). Entry from Stress Dashboard [52] via "breathing" card, Explore [18] via Wellbeing module card, SIA Chat [09] deep-link ("try a breathing exercise"), or Home Screen [12] via stress-related action card. Exit via back button to previous screen, or forward to SIA Chat [09].

---

## Purpose

This screen is the user's guided breathing practice space -- a calm, meditative interface centered around an animated breathing circle that visually guides inhale-hold-exhale rhythms. It answers "how do I calm down right now?" and "which breathing technique is right for this moment?" The screen serves dual roles: as a technique library for browsing and selecting exercises, and as a full-screen active session view for immersive practice. Post-session, users rate effectiveness to help SIA learn which techniques work best for them. Breathing data feeds into the wellbeing domain's stress correlation engine, connecting practice frequency with sleep quality, mood trends, and overall calm scores. Stats tracking (sessions, minutes, streaks) provides RPG-style progress feedback. Free tier includes all breathing techniques and the session timer; SIA coaching notes and personalized recommendations require Plus.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Screen header -- "Breathing exercises" title with back navigation and wellbeing-teal domain accent
2. Stats card -- total sessions, total minutes, streak, most-used technique at a glance
3. "When to use" filter tags -- contextual tags for quick filtering ("before sleep", "during stress", "morning energy")
4. Exercise list -- cards for each breathing technique with name, rhythm pattern, duration, and description
5. Active session view (replaces list on exercise start) -- full-screen animated breathing circle with timer
6. Post-session rating (appears after session) -- effectiveness stars + optional note

**User flow**:
- **Arrives from**: Stress Dashboard [52] via "breathing" card (stack push), Explore [18] via "Breathing" module card (stack push), SIA Chat [09] via deep-link ("try box breathing", stack push), Home Screen [12] via wellbeing action card
- **Primary exit**: Back to Stress [52] or Explore [18] (stack pop)
- **Secondary exits**: SIA Chat [09] via "ask SIA" link (tab switch), Post-Session share (celebration overlay [42])

---

## Layout

**Scroll behavior**: ScrollView (exercise list view), None (active session view -- fixed full-screen)
**Tab bar visible**: Yes (exercise list view), No (active session view -- immersive mode)

### ASCII Wireframe -- Exercise List View

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  < [back]   "Breathing exercises"   │  <- Domain Header (56pt)
│     wellbeing-teal accent bar       │     Lv.N badge right
├─────────────────────────────────────┤
│                                     │  <- 16pt gap
│  ┌─────────────────────────────┐    │
│  │ 42 sessions   |  210 min   │    │  <- Stats Card (~88pt)
│  │ 8 day streak  |  box br.   │    │     2x2 stat grid
│  └─────────────────────────────┘    │
│                                     │  <- 16pt gap
│  [ before sleep ][ during stress ] │  <- "When to Use" Filter
│  [ morning energy ][ focus ][ all ]│     Tags (horizontal scroll)
│                                     │  <- 16pt gap
│  EXERCISES                          │  <- Section Eyebrow
│  ┌─────────────────────────────┐    │
│  │ [teal circle]               │    │  <- Exercise Card 1 (~96pt)
│  │ Box Breathing               │    │     "4-4-4-4"
│  │ inhale 4s hold 4s exhale 4s │    │     recommended tag
│  │ hold 4s   1/3/5/10 min     │    │
│  └─────────────────────────────┘    │
│                                     │  <- 12pt gap
│  ┌─────────────────────────────┐    │
│  │ [teal circle]               │    │     "inhale 4s hold 7s
│  │ 4-7-8 Relaxation            │    │  <- Exercise Card 2 (~96pt)
│  │ deep relaxation before sleep│    │      exhale 8s"
│  │ [before sleep]   1/3/5 min  │    │
│  └─────────────────────────────┘    │
│                                     │  <- 12pt gap
│  ┌─────────────────────────────┐    │
│  │ Deep Belly Breathing        │    │  <- Exercise Card 3
│  │ slow, grounding breath      │    │
│  └─────────────────────────────┘    │
│                                     │  <- 12pt gap
│  ┌─────────────────────────────┐    │
│  │ Wim Hof Method              │    │  <- Exercise Card 4
│  │ energy + resilience         │    │
│  └─────────────────────────────┘    │
│                                     │  <- 12pt gap
│  ┌─────────────────────────────┐    │
│  │ Coherence Breathing         │    │  <- Exercise Card 5
│  │ 5.5 breaths/min balance     │    │
│  └─────────────────────────────┘    │
│                                     │
│         (64pt bottom padding)       │
├─────────────────────────────────────┤
│  Today  |  SIA  |  Goals  |  Me    │  <- Tab Bar
├─────────────────────────────────────┤
│         Home Indicator (34pt)       │
└─────────────────────────────────────┘


=== ACTIVE SESSION VIEW (Full-Screen Immersive) ===

┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  x [close]         Box Breathing   │  <- Session Header (44pt)
│                     4-4-4-4         │     close X left, title right
├─────────────────────────────────────┤
│                                     │
│                                     │
│                                     │
│                                     │
│             .--------.              │
│          .'            '.           │  <- Breathing Circle
│        /     INHALE       \         │     (~240pt diameter)
│       |      3.2s          |        │     wellbeing-teal glow
│        \                  /         │     expands on inhale
│          '.            .'           │     contracts on exhale
│             '--------'              │     soft pulse animation
│                                     │
│           2:47 remaining            │  <- Timer Display (24pt)
│                                     │
│                                     │
│       "breathe in slowly..."        │  <- Guidance Text (16pt)
│                                     │
│                                     │
│                                     │
│     [ ||  pause ]   [ 3 min  v ]   │  <- Timer Controls (48pt)
│                                     │
├─────────────────────────────────────┤
│         Home Indicator (34pt)       │
└─────────────────────────────────────┘


=== POST-SESSION RATING (Bottom Sheet) ===

┌─────────────────────────────────────┐
│  --- (drag handle)                  │
│                                     │
│  "How did that feel?"               │  <- Title (20pt)
│                                     │
│  Box Breathing  |  3:00 min         │  <- Session Summary
│                                     │
│  *  *  *  *  *                      │  <- Effectiveness Rating
│  1  2  3  4  5                      │     (5 stars, tappable)
│                                     │
│  ┌─────────────────────────────┐    │
│  │ add a note (optional)...    │    │  <- Optional Note Input
│  └─────────────────────────────┘    │
│                                     │
│  [         save & close         ]   │  <- Orange CTA (56pt)
│                                     │
└─────────────────────────────────────┘
```

### Component Stack -- Exercise List View (top to bottom)

1. **Domain Dashboard Header** -- 56pt
   - Purpose: Domain identification with RPG level
   - Content: Back chevron, "Breathing exercises" title, wellbeing-teal accent line, RPG skill badge ("Lv.N")

2. **Stats Card** -- ~88pt
   - Purpose: Practice history at a glance -- motivational anchor
   - Content: 2x2 grid of stat tiles (sessions, minutes, streak, most-used technique)

3. **"When to Use" Filter Tags** -- ~44pt
   - Purpose: Contextual filtering for quick technique discovery
   - Content: Horizontal scroll of filter pill chips

4. **Exercise List** -- variable (ScrollView)
   - Purpose: Browse and select breathing techniques
   - Content: Exercise cards for each technique

5. **Bottom Padding** -- 64pt (clears tab bar)

### Component Stack -- Active Session View (top to bottom)

1. **Session Header** -- 44pt
   - Purpose: Exercise identification and close control
   - Content: Close X button (left), exercise name + rhythm pattern (right)

2. **Breathing Circle** -- ~320pt (circle + surrounding space)
   - Purpose: Visual breathing guide -- the screen's emotional and functional centerpiece
   - Content: Animated circle that expands/contracts with breathing rhythm, phase label, countdown

3. **Timer Display** -- ~32pt
   - Purpose: Remaining session time
   - Content: Countdown timer in MM:SS format

4. **Guidance Text** -- ~24pt
   - Purpose: Verbal breathing cue
   - Content: Phase-specific instruction text

5. **Timer Controls** -- 48pt
   - Purpose: Session management
   - Content: Play/pause button, duration selector

---

## Components

### Domain Dashboard Header
- **Purpose**: Domain identification and navigation for the wellbeing domain
- **Data source**: Static title, RPG level from user profile API
- **Visual treatment**: Standard Domain Dashboard Header pattern. 56pt height, FIXED (sticky on scroll, z-30, backdrop-blur). ink-900 background. Back chevron (left, 16pt from left edge, 44x44pt touch target). Title: "Breathing exercises" (20pt Sora Semibold, white, left-aligned 56pt from left). Wellbeing-teal accent line: 2pt height, #14B8A6, extends from title left to ~60% width, 4pt below title baseline. RPG Skill Badge: right-aligned, 16pt from right edge ("Lv.N" in wellbeing-teal).
- **Variants**: Standard (default)
- **Gestures**: Tap back chevron to pop stack, tap RPG badge to push to RPG Character Screen [19]
- **Size**: Full-width x 56pt

### Stats Card
- **Purpose**: Practice history summary -- motivational context before selecting an exercise
- **Data source**: API -- `breathing_tests` table (aggregated session counts, total duration) + `mindfulness_practices` where category = 'breathing' (completed_at, actual_duration_minutes)
- **Visual treatment**: ink-brown-800 glassmorphism card, 20pt radius, 16pt padding. 16pt horizontal margins. 2x2 grid of stat tiles with 8pt gap between tiles. Each tile is a compact metric display.
- **Content** (4 stat tiles, equal width, 2 per row):
  - **Total sessions**: Value (20pt Sora Semibold, white), label "sessions" (12pt Sora Regular, white at 50%)
  - **Total minutes**: Value (20pt Sora Semibold, white), label "minutes" (12pt Sora Regular, white at 50%)
  - **Current streak**: Value with flame icon (20pt, orange #FF5E00) + count (20pt Sora Semibold, white), label "day streak" (12pt Sora Regular, white at 50%)
  - **Most used**: Technique name (14pt Sora Semibold, white), label "most used" (12pt Sora Regular, white at 50%)
- **Variants**: Populated (default), Empty/Day 1 (all values "0" or "--", streak shows "start today")
- **Gestures**: Tap card to expand for detailed stats (weekly trend sparkline, domain breakdown)
- **Size**: Full-width minus 32pt x ~88pt

### "When to Use" Filter Tags
- **Purpose**: Contextual quick-filters based on when a technique is most effective
- **Data source**: Static tag definitions from `mindfulness_practices.when_to_use` field
- **Visual treatment**: Horizontal ScrollView of filter pill chips. 16pt leading margin. Chip specs match Filter Chip pattern: 36pt height, --r-pill corners, 8pt gap between chips.
- **Content** (filter tags):
  - "all" (default active)
  - "before sleep"
  - "during stress"
  - "morning energy"
  - "focus"
  - "anxiety relief"
- **Chip states**:
  - Inactive: ink-brown-800 bg, 1pt white at 10% border, 13pt Sora Semibold white at 60%
  - Active: wellbeing-teal (#14B8A6) bg at 20%, wellbeing-teal text, 1pt wellbeing-teal at 40% border
- **Variants**: Single-select (one active at a time, "all" is default), filtered (list below updates)
- **Gestures**: Tap chip to filter exercise list. Tap "all" to reset.
- **Size**: Full-width (scrollable) x 44pt (chip + padding)

### Exercise Card
- **Purpose**: Individual breathing technique with key information for selection
- **Data source**: API -- `mindfulness_practices` where practice_category = 'breathing'. Fields: practice_name, instructions, duration_minutes, when_to_use, why_it_helps, is_system_practice
- **Visual treatment**: ink-brown-800 glassmorphism card, 20pt radius, 16pt padding. 16pt horizontal margins. 12pt gap between cards.
- **Content per card** (~96pt tall):
  - Left column (48pt):
    - Breathing icon: 48pt circle, wellbeing-teal at 15% bg, breathing/wind icon (24pt, wellbeing-teal). Different icon per technique (circle for box, wave for 4-7-8, lungs for belly, snowflake for Wim Hof, sine wave for coherence).
  - Right column (remaining width, 12pt left of icon):
    - Technique name: 17pt Sora Semibold, white. E.g., "Box Breathing"
    - Rhythm pattern: 13pt Sora Regular, white at 60%. E.g., "inhale 4s - hold 4s - exhale 4s - hold 4s"
    - Description: 13pt Sora Regular, white at 50%, 1 line max. E.g., "equal rhythm for calm and focus"
    - Bottom row: "When to use" tag chips (mini, 20pt height, wellbeing-teal at 10% bg, 11pt Sora Regular, wellbeing-teal text) + duration options (right-aligned, 12pt Sora Regular, white at 40%)
  - SIA recommended badge (conditional): Small "recommended" pill (orange at 15% bg, 11pt Sora Semibold, orange text) if SIA suggests this technique based on current stress level
- **Exercise definitions**:
  - **Box Breathing (4-4-4-4)**: Inhale 4s, hold 4s, exhale 4s, hold 4s. Tags: "during stress", "focus". Description: "equal rhythm for calm and focus"
  - **4-7-8 Relaxation**: Inhale 4s, hold 7s, exhale 8s. Tags: "before sleep", "anxiety relief". Description: "deep relaxation technique by Dr. Andrew Weil"
  - **Deep Belly Breathing**: Inhale 6s, exhale 6s (diaphragmatic). Tags: "during stress", "morning energy". Description: "slow, grounding diaphragmatic breath"
  - **Wim Hof Method**: 30 power breaths, hold, recovery breath. Tags: "morning energy", "focus". Description: "energizing breathwork for resilience"
  - **Coherence Breathing**: Inhale 5.5s, exhale 5.5s (~5.5 breaths/min). Tags: "anxiety relief", "before sleep". Description: "heart rate variability optimization"
- **Variants**: Default, SIA-recommended (orange "recommended" badge), completed today (subtle green check overlay, card at 80% opacity), locked/premium (blur overlay with lock icon -- if applicable)
- **Gestures**: Tap card to enter active session view for that technique
- **Size**: Full-width minus 32pt x ~96pt per card

### Breathing Circle (Active Session -- Visual Centerpiece)
- **Purpose**: The meditative visual guide -- a calm, hypnotic circle that the user breathes with. This is the screen's defining element.
- **Data source**: Local timer state driven by the selected technique's rhythm pattern
- **Visual treatment**: Centered on screen. Base diameter: 160pt (contracted/exhale). Expanded diameter: 240pt (inhale). Background: ink-900. The circle itself:
  - Fill: wellbeing-teal (#14B8A6) at 8% opacity (subtle translucent)
  - Border: 3pt wellbeing-teal at 60% opacity
  - Glow: outer glow ring -- wellbeing-teal at 15% opacity, 24pt blur radius, pulses in sync with breath phase
  - Secondary glow: faint inner radial gradient from wellbeing-teal at 5% (center) to transparent (edge)
  - Phase label (centered inside circle): Current phase name ("INHALE" / "HOLD" / "EXHALE") in 14pt Sora Semibold, uppercase, white at 70%, +0.12em tracking
  - Phase countdown (below phase label, centered): Current phase timer ("3.2s") in 28pt Sora Bold, white, tabular-nums
- **Breathing phases** (color modulation):
  - INHALE: Circle expands, glow intensifies (teal at 20%), phase label "INHALE"
  - HOLD: Circle holds size, glow steady (teal at 15%), phase label "HOLD"
  - EXHALE: Circle contracts, glow dims (teal at 10%), phase label "EXHALE"
  - HOLD (box breathing only): Circle holds contracted, glow faint (teal at 8%), phase label "HOLD"
- **Variants**: Active (animating), Paused (circle frozen at current size, "paused" overlay, glow at 5%), Starting (3-2-1 countdown before first breath, circle at rest size), Complete (circle pulses gently 3 times in green #34A853 then fades)
- **Gestures**: Tap circle to pause/resume
- **Size**: 240pt x 240pt (expanded), centered in available space between header and controls (~320pt zone including margins)

### Session Header (Active Session)
- **Purpose**: Identify current exercise and provide exit control
- **Data source**: Selected exercise name + rhythm pattern
- **Visual treatment**: ink-900 background, 44pt height. Close "X" button (left, 16pt from left, 44x44pt touch target, white at 60%, 2pt stroke, 16pt icon). Exercise name (right side, 17pt Sora Semibold, white). Rhythm pattern below name (13pt Sora Regular, white at 40%).
- **Variants**: Standard (default)
- **Gestures**: Tap X to close session (with confirmation if session is in progress: "End session? Your progress will still be saved.")
- **Size**: Full-width x 44pt

### Timer Display
- **Purpose**: Show remaining total session time
- **Data source**: Local timer state (selected duration minus elapsed time)
- **Visual treatment**: Centered below breathing circle, 24pt gap. Time: 24pt Sora Semibold, white at 80%, tabular-nums, "M:SS" format. No card enclosure -- sits directly on ink-900.
- **Variants**: Running (countdown), Paused (time frozen, text at 50% opacity), Complete (shows "0:00" briefly, then transitions to post-session)
- **Gestures**: None (display only)
- **Size**: Auto-width x 32pt

### Guidance Text
- **Purpose**: Verbal breathing cue that reinforces the visual circle animation
- **Data source**: Phase-specific text from exercise definition
- **Visual treatment**: Centered below timer display, 16pt gap. 16pt Sora Regular, white at 50%. Crossfades between phase texts.
- **Content by phase**:
  - INHALE: "breathe in slowly..."
  - HOLD: "hold gently..."
  - EXHALE: "release slowly..."
  - HOLD (box): "pause..."
- **Variants**: Active (shows current phase text), Paused ("paused -- tap to resume" in white at 40%), Starting ("get ready..." then 3, 2, 1 countdown)
- **Gestures**: None (display only)
- **Size**: Full-width x 24pt

### Timer Controls
- **Purpose**: Play/pause and duration selection during active session
- **Data source**: Local session state
- **Visual treatment**: Centered row below guidance text, 32pt gap. Two controls side by side with 24pt gap between.
- **Content**:
  - Play/Pause button: 56pt circle, ink-brown-800 bg, 1pt white at 10% border. Icon: pause (two bars, 20pt, white) when playing, play (triangle, 20pt, white) when paused. 44x44pt minimum touch target.
  - Duration selector: Pill button, ink-brown-800 bg, 1pt white at 10% border, --r-pill, 44pt height. Shows current duration ("3 min") in 15pt Sora Semibold, white. Small chevron-down (10pt, white at 40%) to indicate selector. Tap opens duration picker.
- **Duration picker** (inline popover, z-40):
  - 4 options: "1 min", "3 min", "5 min", "10 min"
  - Each option: 44pt tall row, 15pt Sora Regular, white
  - Active duration: orange text
  - Background: ink-brown-800, --r-md, 1pt white at 8% border, --shadow-2
  - Selecting a new duration resets the timer
- **Variants**: Playing (shows pause icon), Paused (shows play icon), Duration picker open
- **Gestures**: Tap play/pause to toggle, tap duration to open picker, tap duration option to select
- **Size**: ~200pt wide x 56pt

### Post-Session Rating (Bottom Sheet)
- **Purpose**: Capture effectiveness feedback to train SIA's breathing recommendations
- **Data source**: User input -> writes to `mindfulness_practices.effectiveness_rating` and `mindfulness_practices.actual_duration_minutes`
- **Visual treatment**: Bottom sheet modal, slides up after session completes. ~50% screen height. ink-900 bg (solid). Corner radius: 20pt (top-left, top-right). Drag handle: 36pt wide x 4pt tall pill, white at 20%, centered, 8pt from top.
- **Content** (top to bottom):
  - Title: "How did that feel?" -- 20pt Sora Semibold, white, center-aligned, 24pt below handle
  - Session summary row: Exercise name (15pt Sora Semibold, white) + pipe separator + duration completed (15pt Sora Regular, white at 50%), center-aligned, 16pt below title
  - Effectiveness rating: 5 stars in a horizontal row, 32pt each, 12pt gap. Empty: white at 20% outline. Filled: wellbeing-teal (#14B8A6) solid fill. Stars fill left-to-right on tap. 24pt below summary.
  - Optional note input: Text Input Field (standard pattern -- 52pt, ink-brown-800, --r-md, 1pt white at 10% border). Placeholder: "add a note (optional)..." in white at 40%. 16pt Sora Regular. 24pt below stars.
  - Save button: Full-width orange CTA (Brand CTA Button pattern, 56pt, --r-pill, "save & close"). 24pt below note input.
  - Skip link: "skip" in 15pt Sora Regular, white at 50%, center-aligned, 16pt below save button. 44pt touch target.
- **Variants**: Default (stars empty), rated (stars filled), with note (text entered), saving (button shows spinner)
- **Gestures**: Tap star to rate (fills that star and all preceding), tap save to submit and dismiss, tap skip to dismiss without rating, drag handle to dismiss
- **Size**: Full-width x ~50% screen height

### Haptic Feedback Engine
- **Purpose**: Gentle vibration on breathing phase transitions to guide without looking at screen
- **Implementation**: On each phase transition (inhale -> hold -> exhale -> hold), trigger a soft haptic:
  - Inhale start: light impact
  - Hold start: no haptic (silence reinforces stillness)
  - Exhale start: light impact (slightly softer than inhale)
  - Session complete: success notification haptic
- **Configurable**: User can disable haptics in session via long-press on play/pause button (toggle indicator)

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Base -- especially important for meditative active session |
| Card surfaces | #211008 | ink-brown-800 | Glassmorphism on exercise cards, stats card |
| Domain header accent line | #14B8A6 | wellbeing-teal | Domain identification |
| RPG skill badge | #14B8A6 | wellbeing-teal | Domain level indicator |
| Breathing circle border | #14B8A6 at 60% | wellbeing-teal | Core visual element |
| Breathing circle fill | #14B8A6 at 8% | wellbeing-teal | Subtle translucent fill |
| Breathing circle glow | #14B8A6 at 15% | wellbeing-teal | Outer glow ring |
| Exercise icon circles | #14B8A6 at 15% bg | wellbeing-teal | Card identification icons |
| Filter tag (active) | #14B8A6 at 20% bg | wellbeing-teal | Active filter state |
| Effectiveness stars (filled) | #14B8A6 | wellbeing-teal | Rating -- domain-specific accent |
| "When to use" tag chips | #14B8A6 at 10% bg | wellbeing-teal | Identification tags on cards |
| Save CTA button | #FF5E00 | brand-orange | Primary CTA |
| SIA "recommended" badge | #FF5E00 at 15% bg | brand-orange | SIA suggestion indicator |
| Streak flame + count | #FF5E00 | brand-orange | Engagement indicator |
| Stats card values | #FFFFFF | white | Primary metric display |
| Play/pause icon | #FFFFFF | white | Control icon |
| Session complete circle | #34A853 | forest-green | Success state |
| Session complete glow | #34A853 at 15% | forest-green | Success glow pulse |
| SIA coaching note left bar | #7F24FF | royal-purple | SIA indicator (if SIA note present) |
| Primary text | #FFFFFF | white | Exercise names, headings |
| Secondary text | white at 60% | -- | Rhythm patterns, descriptions |
| Tertiary text | white at 50% | -- | Guidance text, durations, meta |
| Quaternary text | white at 40% | -- | Eyebrows, muted labels |

**60/30/10 verification**: This is a wellbeing-teal domain screen. The domain color (#14B8A6) appears on the breathing circle (the visual centerpiece), header accent, filter tags, exercise icons, rating stars, and "when to use" chips -- all for domain identification. Orange (#FF5E00) drives all interactive/action elements: save CTA, recommended badge, streak flame. Green (#34A853) on session completion success state only. Purple limited to SIA coaching note indicator (1 element, if present). The breathing circle uses teal as a calming ambient element -- this is identification, not interaction. All CTAs remain orange. Ratio holds.

---

## Interaction States

### Exercise Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800, standard card | -- |
| Pressed | bg lightens (white 3% overlay), scale(0.98) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Disabled | 0.4 opacity (locked/premium) | -- |
| Loading | Skeleton shimmer on card content | -- |
| Error | N/A | -- |
| Success | N/A (transitions to active session) | -- |

### Play/Pause Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default (playing) | Pause icon, ink-brown-800 bg | -- |
| Pressed | bg lightens, scale(0.93) | medium impact |
| Default (paused) | Play icon, ink-brown-800 bg | -- |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Disabled | 0.4 opacity | -- |

### Duration Selector
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Current duration text + chevron | -- |
| Pressed | bg lightens, scale(0.97) | light impact |
| Open | Picker popover visible, border brightens to white at 20% | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Effectiveness Star
| State | Visual | Haptic |
|-------|--------|--------|
| Default (empty) | White at 20% outline, 32pt | -- |
| Pressed | Scale(1.15), white at 30% outline | light impact |
| Filled | Wellbeing-teal solid fill, white at 10% glow behind | medium impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Filter Tag Chip
| State | Visual | Haptic |
|-------|--------|--------|
| Default (inactive) | ink-brown-800 bg, white at 60% text | -- |
| Pressed | bg lightens, scale(0.97) | light impact |
| Active | Wellbeing-teal 20% bg, teal text, teal 40% border | medium impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Close Button (Active Session)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | X icon, white at 60% | -- |
| Pressed | White at 40%, scale(0.93) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Save CTA Button (Post-Session)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange fill, white text | -- |
| Pressed | Darker orange (#E05500), scale(0.97) | light impact |
| Disabled | 40% opacity (no rating selected -- but rating is optional, so disabled only during save) | -- |
| Loading | White spinner replaces text | -- |
| Success | Green glow (600ms), sheet dismisses | success notification |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Breathing Circle
| State | Visual | Haptic |
|-------|--------|--------|
| Active (inhale) | Expanding, glow intensifying, teal at 20% glow | light impact (at phase start) |
| Active (hold) | Steady size, glow steady at 15% | -- |
| Active (exhale) | Contracting, glow dimming to 10% | light impact (softer, at phase start) |
| Paused | Frozen at current size, "paused" label, glow at 5% | -- |
| Starting | Rest size, 3-2-1 countdown in center | -- |
| Complete | 3 gentle green pulses, then fade | success notification |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Exercise card | Enter active session for that technique |
| Tap | Filter tag chip | Filter exercise list by "when to use" category |
| Tap | Play/pause button | Toggle session pause/resume |
| Tap | Breathing circle | Toggle session pause/resume (same as play/pause) |
| Tap | Duration selector | Open duration picker popover |
| Tap | Duration option | Select new duration, reset timer |
| Tap | Close X button | End session (confirmation dialog if in progress) |
| Tap | Effectiveness star | Rate (fills star + all preceding) |
| Tap | Save button | Save rating + note, dismiss sheet |
| Tap | Skip link | Dismiss sheet without saving rating |
| Tap | Stats card | Expand for detailed stats |
| Tap | RPG skill badge | Push to RPG Character Screen [19] |
| Tap | Back chevron | Pop stack |
| Drag down | Post-session sheet handle | Dismiss (saves automatically if rated) |
| Long-press | Play/pause button | Toggle haptic feedback on/off |
| Pull-to-refresh | Exercise list ScrollView | Refresh exercise list and stats |
| Swipe right from edge | Screen (list view only) | iOS back gesture |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Screen content | Mount | Staggered fade-in: stats card (0ms), filter tags (80ms), exercise cards (160ms stagger per card) | 280ms each | ease-out-soft |
| Breathing circle -- inhale | Phase start | Scale 160pt -> 240pt diameter + glow intensifies (15% -> 20%) | Technique-specific (e.g., 4000ms for box breathing inhale) | ease-in-out (custom: cubic-bezier(0.45, 0, 0.55, 1)) |
| Breathing circle -- exhale | Phase start | Scale 240pt -> 160pt diameter + glow dims (15% -> 10%) | Technique-specific (e.g., 4000ms for box breathing exhale) | ease-in-out (custom: cubic-bezier(0.45, 0, 0.55, 1)) |
| Breathing circle -- hold | Phase start | Glow pulse (subtle 2% opacity oscillation at current size) | Hold duration (e.g., 4000ms) | ease-in-out |
| Phase label text | Phase change | Crossfade old label -> new label (opacity 1->0, 0->1) | 280ms | ease-out-soft |
| Guidance text | Phase change | Crossfade old text -> new text | 280ms | ease-out-soft |
| Timer countdown | Each second | Digit transition (old digit slides up + fades, new digit slides in from below) | 160ms | ease-out-soft |
| 3-2-1 countdown | Session start | Number scale(1.5->1.0) + fade in, then fade out before next number | 800ms per number | ease-flow |
| Active session enter | Exercise card tap | Exercise list crossfades out (280ms), active session fades in with circle at rest size, then 3-2-1 countdown | 520ms total transition | ease-out-soft |
| Active session exit | Close tap | Active session fades out (280ms), exercise list fades back in | 280ms | ease-out-soft |
| Session complete | Timer hits 0 | Circle pulses 3x in green (#34A853, scale 1.0->1.05->1.0 each pulse), then contracts to 0 + fades | 1200ms (3x 400ms pulses) | ease-flow |
| Post-session sheet | After completion animation | Slides up from bottom + backdrop fade | 520ms | ease-flow |
| Post-session dismiss | Save/skip/drag | Slides down + backdrop fade out | 280ms | ease-out-soft |
| Star fill | Tap star | Stars fill left-to-right in sequence (40ms stagger per star), each star scale(0.8->1.2->1.0) + teal fill fade-in | 160ms per star | ease-out-soft |
| Filter tag activation | Tap chip | Active: bg color fade-in (160ms). Exercise list below: content crossfade (280ms) | 160ms chip, 280ms list | ease-out-soft |
| Stats card values | Mount | Count-up from 0 to final value | 280ms | ease-out-soft |
| Tab bar | Enter active session | Slides down + fades out | 280ms | ease-out-soft |
| Tab bar | Exit active session | Slides up + fades in | 280ms | ease-out-soft |

**Screen transition**:
- **Enter**: Stack push -- slide in from right (280ms, ease-out-soft)
- **Exit**: Stack pop -- slide out to right (280ms, ease-out-soft)

**Breathing circle easing note**: The breathing circle uses a custom symmetric ease-in-out curve rather than the standard ease-out-soft. This creates a natural, organic breathing rhythm where the expansion/contraction starts slowly, accelerates in the middle, and decelerates at the end -- mimicking the natural arc of a breath. The hold phases use subtle glow oscillation to maintain visual interest without movement.

---

## Empty States

### Day 1 (new user)
- Stats card: All values show "0" or "--". Streak: "start today". Most used: "--". Card is still visible (zeroed stats are motivational targets, not failures).
- SIA coaching note (appears above exercise list if user arrived from stress-related context): "Breathing is one of the fastest ways to shift your state. Try box breathing -- it's a great place to start." Purple dot + compact variant.
- Exercise list: Full list visible with SIA "recommended" badge on Box Breathing (the universal starter). 4-7-8 Relaxation also badged if user's context suggests sleep issues.
- Filter tags: All visible and functional even with no history.
- "When to use" context: If user navigated from Stress [52], the "during stress" filter is pre-activated and the appropriate exercises are highlighted.

### Established user (zero state -- no sessions today)
- Stats card shows historical totals (non-zero). Streak may show "0 days" if streak is broken -- SIA note adapts: "Pick up where you left off."
- All exercises visible, no "completed today" badges.
- If the user had a session recently, the last-used technique appears first in the list with a subtle "last practiced" label (12pt, white at 40%).

### Post-session (just completed)
- Stats card updates in real-time (session count increments, minutes add, streak updates).
- Completed exercise card shows green check overlay and slightly dimmed (80% opacity). Remains tappable for another session.

---

## Motivation Adaptation

- **Low motivation**: Only top 2 exercises shown (Box Breathing + Deep Belly Breathing -- the simplest). Stats card hidden. Filter tags hidden. SIA note at top: "Just 1 minute of breathing can help. Try the shortest session." Duration selector defaults to 1 min. Post-session rating simplified to thumbs up/down instead of 5 stars. Guidance text uses warmer, simpler language: "breathe in..." / "let it go..."
- **Medium motivation**: Default experience as described. All 5 exercises visible. Stats card shown. Filter tags visible. Duration defaults to 3 min. Full 5-star rating.
- **High motivation**: All exercises visible + additional advanced techniques (e.g., "Alternate Nostril", "Breath of Fire") appear below the core 5. Stats card expands to show weekly trend sparkline and breathing-to-stress-score correlation chart. SIA coaching note includes data: "Your stress scores drop 18% on days you practice breathing." Post-session shows detailed session analytics (average breath rate, phase adherence). Streak counter shows exact count with calendar heatmap preview.

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Domain header title ("Breathing exercises") | Sora | Semibold (600) | 20pt | 28pt | white |
| RPG skill badge ("Lv.N") | Sora | Semibold (600) | 13pt | 18pt | wellbeing-teal #14B8A6 |
| Stats card values | Sora | Semibold (600) | 20pt | 28pt | white |
| Stats card labels | Sora | Regular (400) | 12pt | 16pt | white at 50% |
| Stats card most-used technique | Sora | Semibold (600) | 14pt | 20pt | white |
| Filter tag chip text | Sora | Semibold (600) | 13pt | 18pt | white at 60% (inactive) / wellbeing-teal (active) |
| Section eyebrow ("EXERCISES") | Sora | Semibold (600) | 12pt | 16pt | white at 40% |
| Exercise card technique name | Sora | Semibold (600) | 17pt | 22pt | white |
| Exercise card rhythm pattern | Sora | Regular (400) | 13pt | 18pt | white at 60% |
| Exercise card description | Sora | Regular (400) | 13pt | 18pt | white at 50% |
| Exercise card "when to use" tags | Sora | Regular (400) | 11pt | 16pt | wellbeing-teal #14B8A6 |
| Exercise card duration options | Sora | Regular (400) | 12pt | 16pt | white at 40% |
| SIA "recommended" badge | Sora | Semibold (600) | 11pt | 16pt | orange #FF5E00 |
| Session header exercise name | Sora | Semibold (600) | 17pt | 22pt | white |
| Session header rhythm pattern | Sora | Regular (400) | 13pt | 18pt | white at 40% |
| Breathing circle phase label | Sora | Semibold (600) | 14pt | 20pt | white at 70% |
| Breathing circle phase countdown | Sora | Bold (700) | 28pt | 36pt | white |
| Timer display (remaining) | Sora | Semibold (600) | 24pt | 32pt | white at 80% |
| Guidance text | Sora | Regular (400) | 16pt | 24pt | white at 50% |
| Play/pause duration text | Sora | Semibold (600) | 15pt | 20pt | white |
| Duration picker options | Sora | Regular (400) | 15pt | 20pt | white (inactive) / orange #FF5E00 (active) |
| Post-session title ("How did that feel?") | Sora | Semibold (600) | 20pt | 28pt | white |
| Post-session exercise name | Sora | Semibold (600) | 15pt | 20pt | white |
| Post-session duration | Sora | Regular (400) | 15pt | 20pt | white at 50% |
| Post-session note placeholder | Sora | Regular (400) | 16pt | 22pt | white at 40% |
| Post-session save CTA | Sora | Semibold (600) | 17pt | 22pt | white |
| Post-session "skip" link | Sora | Regular (400) | 15pt | 20pt | white at 50% |
| Empty state "start today" text | Sora | Regular (400) | 12pt | 16pt | white at 50% |
| "last practiced" label | Sora | Regular (400) | 12pt | 16pt | white at 40% |

---

## Error Handling

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Exercise list fails to load | Skeleton shimmer on card placeholders for 5s, then inline error: "couldn't load exercises" with retry button | Tap retry; pull-to-refresh also retries |
| Stats data fails to load | Stats card shows "--" for all values; card still visible | Pull-to-refresh to reload stats |
| SIA recommendation fails to load | Recommendation card hidden (graceful degradation); exercise list still visible | Pull-to-refresh may surface recommendation |
| Active session timer crashes | Session auto-saves progress; toast on return to list: "session interrupted -- your progress was saved" | Tap exercise card to start a new session |
| Post-session rating save fails | Save button reverts from spinner to default; toast: "couldn't save rating. try again." | Tap "save & close" again; tap "skip" to dismiss without saving |
| Post-session note too long | Inline error below note field: "note must be under 500 characters" in 13pt Sora Regular, #F44336 | Shorten note text |
| Exercise filter returns no results | Exercise list area shows: "no exercises match this filter" in 15pt Regular, white at 40%, centered | Tap "all" filter to reset |
| Duration picker fails to update timer | Duration selector reverts to previous value; toast: "couldn't change duration" | Tap duration option again to retry |
| Pull-to-refresh fails | Spinner dismisses; toast: "couldn't refresh. check your connection." | Pull again or wait for connectivity |
| Offline state | Banner above exercise list: "you're offline -- exercises available, stats may not be current" (ink-brown-800 bg, white at 60%) | Sessions still functional offline; stats sync on reconnection |
| Session confirmation dismiss conflict | If user taps close X during session, confirmation appears: "End session? Your progress will still be saved." with "end" and "continue" options | Tap "continue" to resume or "end" to exit with partial credit |

---

## Accessibility

- Screen title "Breathing exercises" announced on focus via VoiceOver
- RPG skill badge announces: "Wellbeing level [N]. Double-tap to view character."
- Stats card announces: "[N] sessions, [N] minutes, [N] day streak, most used: [technique name]"
- Filter tags announce: "[Tag name] filter, [selected/not selected]"
- Each exercise card announces: "[Technique name]. Rhythm: [pattern]. [Description]. Duration options: [durations]. When to use: [tags]."
- SIA "recommended" badge announces: "SIA recommended" appended to exercise card label
- Active session announces on enter: "Breathing session started. [Technique name]. [Duration] minutes."
- Breathing circle phase transitions announced: "Inhale", "Hold", "Exhale" with countdown
- Timer display announces remaining time every 30 seconds (adjustable) for VoiceOver users
- Guidance text announced on each phase change
- Play/pause button announces: "Pause session" / "Resume session"
- Duration selector announces: "Session duration: [N] minutes. Double-tap to change."
- Close button announces: "End session"
- Post-session rating stars announce: "Effectiveness rating. [N] of 5 stars selected. Double-tap star [N] to rate."
- Post-session "skip" announces: "Skip rating, close session summary"
- Haptic phase transitions provide eyes-free breathing guidance; disable via long-press play/pause
- All touch targets meet 44x44pt minimum
- Focus order (list): back button -> RPG badge -> stats card -> filter tags -> exercise cards (top to bottom)
- Focus order (active session): close button -> breathing circle (pause/resume) -> timer controls -> duration selector
- Gesture alternatives: swipe-right-from-edge replaces back button in list view; tap circle replaces play/pause button; VoiceOver escape gesture ends session with confirmation

---

## Cross-References

- **Navigates to**: SIA Chat [09] (via SIA coaching note tap, tab switch), RPG Character Screen [19] (via RPG skill badge tap, stack push), Celebration Overlay [42] (on milestone achievements like 10th session or 7-day streak)
- **Navigates from**: Screen [52] -- Stress Dashboard (stack push via "breathing" card), Screen [18] -- Explore Section (stack push via Wellbeing module card), Screen [09] -- SIA Chat (deep-link, stack push), Screen [12] -- Home Screen (via stress/wellbeing action card)
- **Shared components with**: Screen [34] -- Spirituality Dashboard (Contemplation Timer Shortcut pattern reused conceptually for breathing timers), Screen [38] -- Habits (Streak tracking pattern, Stats Card layout), Screen [37] -- Journal (Post-Session Rating mirrors Writing Mode Bottom Sheet pattern), Screen [27] -- Workout Detail (Active session full-screen immersive mode, timer controls)
- **Patterns used**: Domain Dashboard Header (Screen 26 canonical), Filter Chip / Filter Tab Row (Screen 13), Brand CTA Button (Batch 1), Text Input Field (Screen 03), Bottom Sheet Modal (Screen 15), 8-State Interaction Model, Back Button, Stat Tile (Screen 26), Section Eyebrow Label (Screen 12), RPG Skill Badge (Screen 26)
- **Patterns established**: Breathing Circle (animated expand/contract circle with glow, phase labels, and symmetric easing for guided breathing), Active Session Immersive Mode (full-screen practice view with tab bar hidden, similar to but distinct from Active Workout on Screen 27), Phase Transition Haptics (light haptic on inhale/exhale transitions for eyes-free guidance), Post-Session Effectiveness Rating (5-star domain-colored rating + optional note bottom sheet), "When to Use" Contextual Filter Tags (pre-activated based on navigation source context), Breathing Exercise Card (technique name + rhythm pattern + when-to-use tags + duration options)
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-14.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U07`
**Prototype route**: `/features/breathing`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q31 breathing active sessions use a focused immersive mode without the tab bar.
- Q32 celebration route is a QA fixture; production requires event triggers.
- Q36 social V1 stays friends/private-first.
- Q37 accountability/competitions activation requires Plus and social consent.
- Q38 competitions support private/self-only challenges.
- Q40 paywall models IAP-adjacent states without live billing.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B14-F13 | critical | retention | Make exercise cards semantic buttons and wire filters, pause/resume, duration, close, completion, and save states. |
| B14-F14 | major | information-architecture | Separate library and full-screen active-session modes with no tab bar during practice. |
| B14-F15 | major | accessibility | Add accessible labels, 44px hit areas, selected filter state, and semantic exercise/session controls. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

