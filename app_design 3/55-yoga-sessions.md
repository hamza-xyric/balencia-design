# Screen Design: Yoga Sessions

**Screen**: 55 of 73
**File**: 55-yoga-sessions.md
**Register**: Wellbeing Mode (wellbeing-teal #14B8A6)
**Primary action**: browse yoga poses, start guided yoga sessions
**Tab**: Wellbeing domain (stack push from Explore [18] or Fitness [26])
**Navigation**: Stack depth 2-3 from Me tab root (Me Main > Explore > Yoga Sessions). Entry from Explore [18] grid card, Fitness [26] cross-domain link, SIA Chat [09] deep-link ("try a yoga session today"), or Home Screen [12] wellbeing action card. Exit via back button to Explore or Fitness, or forward to Active Session (in-screen mode transition), Pose Detail (modal), SIA Chat [09].

---

## Purpose

The Yoga Sessions screen is the user's gateway to guided yoga practice within Balencia. It surfaces the user's current yoga streak to motivate consistency, provides a filterable library of guided sessions by difficulty, offers a searchable pose library with instructional detail and YouTube video integration, and manages the full lifecycle of a yoga session from browsing through active practice to post-session summary. SIA personalizes session recommendations based on the user's fitness level, recovery data, and wellbeing goals. This screen drives physical and mental wellbeing engagement and earns XP through session completion and streak maintenance. Free tier includes the session library, pose library, and timer; SIA coaching notes and personalized difficulty require Plus.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Yoga Streak Banner -- the motivational hook, immediately below the header
2. Difficulty filter chips -- quick narrowing of content
3. Session cards -- guided yoga sessions as the primary browsable content
4. Pose library -- searchable grid of individual poses for reference and learning
5. Stats summary -- total sessions, hours, poses mastered, streak
6. SIA coaching note -- contextual encouragement woven into the flow
7. "Start session" CTA -- the primary action on each session card

**User flow**:
- **Arrives from**: Explore Section [18] via "Yoga" card (stack push), Fitness & Workouts [26] via cross-domain "yoga" link (stack push), SIA Chat [09] via deep-link (stack push), Home Screen [12] via wellbeing action card (stack push)
- **Primary exit**: Active Session mode (in-screen transition) -- triggered by "start session" CTA on a session card
- **Secondary exits**: Pose Detail (modal presentation) via tapping a pose in the library, SIA Chat [09] via tab switch (tapping SIA coaching note), Explore [18] via stack pop (back button), Fitness [26] via stack pop if entered from there, Post-Session Summary (in-screen transition after session completes)

---

## Layout

**Scroll behavior**: ScrollView (mixed content types: banner, horizontal filter chips, vertical session cards, grid of poses, stats tiles -- not a homogeneous list)
**Tab bar visible**: Yes (hidden during Active Session mode)

### ASCII Wireframe -- Browse Mode (Default)

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  <  │ Yoga sessions         Lv.8   │  56pt -- Domain Dashboard Header
│     │ (teal accent line)            │  FIXED, sticky on scroll
├─────────────────────────────────────┤
│                                     │  SCROLLABLE from here
│  ┌───────────────────────────────┐  │
│  │ FLAME  12-day streak          │  │  64pt -- Yoga Streak Banner
│  │ "your longest streak: 18"    │  │
│  └───────────────────────────────┘  │
│          16pt gap                   │
│  ┌───────────────────────────────┐  │
│  │ * SIA says:                   │  │  72pt -- SIA Coaching Note
│  │ "Your body needs a stretch    │  │
│  │  after yesterday's workout."  │  │
│  └───────────────────────────────┘  │
│          16pt gap                   │
│  [Beginner] [Intermediate] [Adv.]  │  36pt -- Difficulty Filter Chips
│          16pt gap                   │
│  GUIDED SESSIONS                    │  Eyebrow label
│  ┌───────────────────────────────┐  │
│  │ Morning Flow          30 min  │  │  ~160pt -- Session Card 1
│  │ Beginner  *  12 poses         │  │
│  │ [thumbnail image area]        │  │
│  │ ┌─────────────────────────┐   │  │
│  │ │    Start session  ->    │   │  │  48pt orange pill CTA
│  │ └─────────────────────────┘   │  │
│  └───────────────────────────────┘  │
│          12pt gap                   │
│  ┌───────────────────────────────┐  │
│  │ Power Vinyasa        45 min   │  │  ~160pt -- Session Card 2
│  │ Advanced  *  18 poses         │  │
│  │ [thumbnail image area]        │  │
│  │ ┌─────────────────────────┐   │  │
│  │ │    Start session  ->    │   │  │
│  │ └─────────────────────────┘   │  │
│  └───────────────────────────────┘  │
│          24pt gap                   │
│  POSE LIBRARY              see all  │  Section Heading Row
│  ┌────────┐ ┌────────┐ ┌────────┐  │
│  │        │ │        │ │        │  │  ~120pt -- Pose Grid (2x3 visible)
│  │ [img]  │ │ [img]  │ │ [img]  │  │
│  │ Tree   │ │ Warrior│ │ Cobra  │  │
│  └────────┘ └────────┘ └────────┘  │
│  ┌────────┐ ┌────────┐ ┌────────┐  │
│  │ [img]  │ │ [img]  │ │ [img]  │  │
│  │ Bridge │ │ Pigeon │ │ Lotus  │  │
│  └────────┘ └────────┘ └────────┘  │
│          24pt gap                   │
│  YOUR STATS                         │  Eyebrow label
│  ┌────────┐ ┌────────┐ ┌────────┐  │
│  │   24   │ │  8.5   │ │   42   │  │  72pt -- Stat Tiles
│  │sessions│ │ hours  │ │ poses  │  │
│  └────────┘ └────────┘ └────────┘  │
│  ┌───────────┐ ┌────────────────┐  │
│  │    12     │ │      18        │  │  72pt -- Stat Tiles Row 2
│  │  streak   │ │ longest streak │  │
│  └───────────┘ └────────────────┘  │
│                                     │
│          64pt bottom padding        │
│                                     │
├─────────────────────────────────────┤
│  Today  |  SIA  | Goals |   Me    │  Tab Bar (56pt + 34pt safe)
└─────────────────────────────────────┘
```

### ASCII Wireframe -- Active Session Mode

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  X  │ Yoga session        03:42    │  56pt -- Session Header
│     │ pose 4 of 12                 │  FIXED
├─────────────────────────────────────┤
│                                     │
│  ┌───────────────────────────────┐  │
│  │                               │  │  ~200pt -- Current Pose Display
│  │       [Pose illustration      │  │
│  │        or YouTube embed]      │  │
│  │                               │  │
│  │      Warrior II               │  │
│  │   Hold for 45 seconds         │  │
│  └───────────────────────────────┘  │
│                                     │
│        ┌──────────────────┐         │  120pt -- Pose Timer Ring
│        │                  │         │
│        │      0:32        │         │  Circular countdown
│        │                  │         │
│        └──────────────────┘         │
│                                     │
│  ┌───────────────────────────────┐  │
│  │ Instructions:                 │  │  ~100pt -- Instructions Card
│  │ Stand with feet wide apart.   │  │
│  │ Extend arms parallel to       │  │
│  │ the floor. Bend front knee    │  │
│  │ to 90 degrees.                │  │
│  └───────────────────────────────┘  │
│          16pt gap                   │
│  ┌───────────────────────────────┐  │
│  │ NEXT UP: Triangle pose        │  │  64pt -- Next Pose Preview
│  │ [small thumb]  Hold 30s       │  │
│  └───────────────────────────────┘  │
│          16pt gap                   │
│  ┌───────────────────────────────┐  │
│  │       Skip pose  │  Pause     │  │  48pt -- Control Row
│  └───────────────────────────────┘  │
│                                     │
│          24pt gap                   │
│  * "breathe deeply -- you're      │  40pt -- SIA Real-Time Note
│    doing great"                     │
│                                     │
├─────────────────────────────────────┤
│         (Tab bar hidden)            │
└─────────────────────────────────────┘
```

### ASCII Wireframe -- Post-Session Summary

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  <  │ Session complete              │  56pt -- Header
├─────────────────────────────────────┤
│                                     │
│  ┌───────────────────────────────┐  │
│  │    SESSION COMPLETE           │  │  ~200pt -- Summary Card
│  │                               │  │
│  │    30:00        12/12         │  │
│  │    duration     poses         │  │
│  │                               │  │
│  │    Beginner     +45 XP        │  │
│  │    difficulty   earned        │  │
│  └───────────────────────────────┘  │
│          16pt gap                   │
│  ┌───────────────────────────────┐  │
│  │ How did that feel?            │  │  ~80pt -- Difficulty Rating
│  │ [1] [2] [3] [4] [5]          │  │
│  │  too     just     too         │  │
│  │  easy    right    hard        │  │
│  └───────────────────────────────┘  │
│          16pt gap                   │
│  ┌───────────────────────────────┐  │
│  │ Session notes (optional)      │  │  ~100pt -- Notes Input
│  │ [text area]                   │  │
│  └───────────────────────────────┘  │
│          16pt gap                   │
│  ┌───────────────────────────────┐  │
│  │ STREAK UPDATE                 │  │  ~72pt -- Streak Card
│  │ FLAME 13-day streak           │  │
│  │ "new personal best!"          │  │
│  └───────────────────────────────┘  │
│          24pt gap                   │
│  ┌───────────────────────────────┐  │
│  │         Done  ->              │  │  56pt -- CTA
│  └───────────────────────────────┘  │
│                                     │
├─────────────────────────────────────┤
│  Today  |  SIA  | Goals |   Me    │  Tab Bar
└─────────────────────────────────────┘
```

### Component Stack -- Browse Mode (top to bottom)

1. **Status Bar** -- 44pt
   - Purpose: system status bar
   - Content: transparent, system-managed

2. **Domain Dashboard Header** -- 56pt, FIXED
   - Purpose: screen identification, back navigation, RPG level display
   - Content: back chevron (left), "Yoga sessions" title with 2pt wellbeing-teal (#14B8A6) accent line underneath, "Lv.8" RPG badge (right)
   - Sticky on scroll with backdrop-blur (z-30)

3. **Yoga Streak Banner** -- 64pt
   - Purpose: motivational streak display -- the emotional anchor of the screen
   - Content: flame icon, current streak count, longest streak reference
   - 16pt top margin from header

4. **SIA Coaching Note Card** -- 72pt (variable: min 56pt, max 96pt)
   - Purpose: AI coaching voice -- contextual yoga recommendation
   - Content: purple dot indicator (6pt, #7F24FF) + contextual SIA message
   - 16pt top margin

5. **Difficulty Filter Chips** -- 36pt
   - Purpose: filter sessions by difficulty level
   - Content: Beginner / Intermediate / Advanced chips (horizontal row)
   - 16pt top margin

6. **Guided Sessions Section** -- variable (~340pt for 2 cards)
   - Purpose: primary browsable content -- guided yoga session cards
   - Content: eyebrow label + vertically stacked session cards
   - 16pt top margin

7. **Pose Library Section** -- ~180pt (2 rows of 3)
   - Purpose: searchable reference grid of individual yoga poses
   - Content: section heading row + 3-column grid of pose thumbnail cards
   - 24pt top margin

8. **Stats Section** -- ~160pt
   - Purpose: aggregate yoga metrics and streak data
   - Content: eyebrow label + stat tiles (2 rows)
   - 24pt top margin

9. **Bottom Padding** -- 64pt
   - Purpose: clears tab bar from content

10. **Tab Bar** -- 56pt + 34pt safe area
    - Purpose: primary app navigation
    - Content: Today | SIA | Goals | Me (Me active)

---

## Components

### Domain Dashboard Header
- **Purpose**: screen identification with wellbeing domain branding and RPG integration
- **Data source**: user's wellbeing skill level from RPG system
- **Visual treatment**: fixed bar, ink-900 background, no card styling
- **Size**: full-width x 56pt
- **Sub-elements**:
  - Back button: left chevron, white, 2pt stroke, 20pt icon, 44x44pt touch target, 16pt from left edge
  - Title: "Yoga sessions", 20pt Sora Semibold, white, left-aligned 56pt from left
  - Domain accent line: 2pt height, #14B8A6 (wellbeing-teal), extends from title left edge to ~60% of available width, 4pt below title text baseline
  - RPG skill badge: "Lv.8", 13pt Sora Semibold, #14B8A6 text, background #14B8A6 at 15% opacity, r-pill shape, 8pt horizontal / 4pt vertical padding, right-aligned 16pt from right edge
- **Gestures**: back button taps pop stack; RPG badge taps push to RPG Character [19]

### Yoga Streak Banner
- **Purpose**: motivational streak display -- the first thing the user sees, designed to drive daily return behavior
- **Data source**: `yoga_streaks` table -- `current_streak`, `longest_streak`
- **Visual treatment**: ink-brown-800 card with glassmorphism (1pt border, white at 6% opacity), r-xl (28pt), 20pt internal padding. Subtle wellbeing-teal gradient glow at top edge (teal at 8% opacity, 40pt height, fading to transparent).
- **Size**: full-width minus 32pt x 64pt
- **Sub-elements**:
  - Flame icon: 24pt, animated flame in Burnt Orange (#FF5E00), left-aligned 20pt from card edge
  - Streak count: "12-day streak" -- 20pt Sora Bold, white, 12pt right of flame icon
  - Longest streak: "your longest streak: 18" -- 13pt Sora Regular, white at 50%, below streak count, 4pt gap
- **Variants**:
  - Active streak (>0 days): full display as described, flame animates with subtle flicker (scale 0.95-1.05, 600ms loop)
  - No streak (0 days): "start your yoga streak today" in 15pt Sora Regular, white at 50%. Flame icon gray (white at 20%). No longest streak line.
  - New personal best: streak count text turns wellbeing-teal (#14B8A6), "new personal best" badge appears in 11pt Sora Semibold, teal text on teal at 15% bg, r-pill, right-aligned
- **Gestures**: tap entire banner -- no-op (informational only), light haptic feedback

### SIA Coaching Note Card
- **Purpose**: contextual AI coaching message specific to yoga and physical wellbeing
- **Data source**: AI-generated based on workout history, recovery data, yoga session frequency, time of day
- **Visual treatment**: ink-brown-800 card with glassmorphism (1pt border, white at 6% opacity), r-xl (28pt), 24pt padding
- **Size**: full-width minus 32pt x 72pt (variable)
- **Sub-elements**:
  - Purple dot: 6pt circle, #7F24FF, 16pt from left edge of card, vertically centered with first text line
  - Message text: 15pt Sora Regular, white, left-aligned 32pt from card left edge, 16pt right padding, max 3 lines
- **Variants**:
  - Post-workout: "Your body needs a stretch after yesterday's workout. Try a gentle flow."
  - Morning: "Morning yoga sets the tone for your day. 15 minutes is enough."
  - Streak-focused: "12 days in a row. Your flexibility is improving."
  - Day 1: "Yoga builds strength and calm. Start with a beginner session."
- **Gestures**: tap entire card -- navigates to SIA Chat [09] with yoga/wellbeing context pre-loaded

### Difficulty Filter Chips
- **Purpose**: filter guided sessions by difficulty level
- **Data source**: local state (selected filter)
- **Visual treatment**: horizontal row of 3 filter chips, 16pt horizontal margins, 8pt gap between chips
- **Size**: full-width x 36pt
- **Sub-elements** (per chip):
  - Height: 36pt, r-pill (999pt)
  - Inactive: ink-brown-800 bg, 1pt white at 10% border, 13pt Sora Semibold, white at 60%
  - Active: Burnt Orange (#FF5E00) bg, white text
  - Labels: "beginner", "intermediate", "advanced"
  - An additional "all" chip can precede the three, selected by default
- **Variants**: single-select (only one difficulty active at a time), or "all" showing unfiltered
- **Gestures**: tap chip to activate filter, tap active chip to deselect (returns to "all")

### Session Card
- **Purpose**: primary content card representing a guided yoga session the user can start
- **Data source**: `yoga_sessions` table -- `session_date`, `poses` (JSONB), `duration_minutes`, `difficulty`
- **Visual treatment**: ink-brown-800 card with glassmorphism, r-xl (28pt), 20pt internal padding
- **Size**: full-width minus 32pt x ~160pt
- **Sub-elements**:
  - Thumbnail area: 80pt height, full card content width, r-md (14pt) corners, image from session thumbnail or first pose image. Fallback: teal (#14B8A6) gradient placeholder at 15% opacity.
  - Session name: 17pt Sora Semibold, white ("Morning Flow"), 12pt below thumbnail
  - Meta row: 13pt Sora Regular, white at 50% -- "[duration] min  *  [pose count] poses", 4pt below name
  - Difficulty badge: r-pill, 24pt height, 8pt horizontal padding. Beginner: wellbeing-teal (#14B8A6) text on teal at 15% bg. Intermediate: creativity-amber (#F59E0B) text on amber at 15% bg. Advanced: fitness-red (#EF4444) text on red at 15% bg. Positioned inline with meta row, right-aligned.
  - "Start session" CTA: 48pt height, full card content width, Burnt Orange (#FF5E00), white text 16pt Sora Semibold, r-pill. 12pt top margin from meta row.
- **Variants**:
  - Populated: full session card as described
  - Completed today: subtle green (#34A853) checkmark badge (16pt) top-right of thumbnail area, "completed" label replaces CTA in 13pt green text
  - Loading: skeleton shimmer on thumbnail, text lines, and CTA area
- **Gestures**: tap card body (not CTA) -- expand to see full pose list preview; tap "start session" -- transitions to Active Session mode (in-screen mode change)

### Pose Library Grid
- **Purpose**: searchable reference grid of all yoga poses for learning and practice
- **Data source**: `yoga_poses` table -- `name`, `description`, `difficulty`, `instructions`, `image_url`
- **Visual treatment**: section heading row + 3-column grid of pose thumbnail cards, 8pt gap between cards
- **Size**: full-width minus 32pt x variable (each pose card ~110pt height)
- **Sub-elements**:
  - Section heading row: "Pose library" in 18pt Sora Semibold, white, left-aligned + "see all" in 13pt Sora Regular, Burnt Orange (#FF5E00), right-aligned. 44pt touch target on "see all". Row height 32pt.
  - Search bar (appears on "see all" tap or scroll to section): full-width minus 32pt, 44pt tall, ink-brown-800 bg, r-md (14pt), search icon (16pt, white at 40%) left, placeholder "search poses" 15pt Sora Regular white at 40%
  - Pose card (each): ink-brown-800 bg, r-md (14pt), 8pt internal padding
    - Pose image: square aspect, full card width, r-sm (10pt) top corners. Fallback: silhouette illustration on teal at 10% bg.
    - Pose name: 13pt Sora Semibold, white, centered, 8pt below image, max 1 line truncated
    - Difficulty dot: 6pt circle below name, 4pt gap. Beginner: teal, Intermediate: amber, Advanced: red.
  - Default view shows 6 poses (2 rows x 3 columns). "see all" expands to full pose library (modal or stack push).
- **Variants**:
  - Populated: pose cards with images and names
  - Search active: search bar focused, grid filters in real-time, no results state: "no poses found" in 15pt Regular, white at 50%, centered
  - Empty (Day 1): pose library is pre-populated with default poses -- this section is never truly empty
- **Gestures**: tap pose card -- opens Pose Detail modal; tap "see all" -- expands to full searchable pose library; pull to refresh reloads pose data

### Pose Detail Modal
- **Purpose**: detailed view of a single yoga pose with instructions, difficulty, and optional YouTube video
- **Data source**: `yoga_poses` table (single record) + YouTube integration (`/api/youtube` search for pose name)
- **Visual treatment**: bottom sheet modal, ~85% screen height, ink-900 bg, r-lg (20pt) top corners, drag handle at top
- **Size**: ~85% screen height
- **Sub-elements**:
  - Drag handle: 36pt wide x 4pt tall pill, white at 20%, centered, 12pt below modal top
  - Pose image: full-width, 200pt height, r-md bottom corners
  - Pose name: 20pt Sora Semibold, white, left-aligned, 16pt margins, 16pt below image
  - Difficulty badge: same as Session Card difficulty badge spec, inline right of name
  - Instructions section: "INSTRUCTIONS" eyebrow (12pt Sora Semibold, white at 40%, uppercase, +0.12em tracking) + step-by-step text (15pt Sora Regular, white at 70%, numbered list, 8pt gap between steps), 16pt below name
  - YouTube video embed: "WATCH VIDEO" eyebrow (12pt Sora Semibold, white at 40%, uppercase, +0.12em tracking) + 16:9 aspect ratio video player area (ink-brown-800 bg with play button overlay if not loaded). 24pt below instructions. Data from `/api/youtube` search for "[pose name] yoga tutorial".
  - "Add to session" CTA: 48pt height, full-width minus 32pt, Burnt Orange, white text 16pt Semibold, r-pill. 24pt below video area. Only visible when browsing outside an active session.
- **Gestures**: drag handle down to dismiss, tap outside modal on backdrop to dismiss, tap play on video embed to play YouTube video inline

### Active Session View (In-Screen Mode)
- **Purpose**: step-by-step guided yoga session with pose timer, instructions, and video support
- **Data source**: `yoga_sessions.poses` (JSONB array of pose references), `yoga_poses` for each pose detail, `yoga_session_logs` for real-time logging
- **Visual treatment**: full-screen takeover (tab bar hidden), ink-900 background, immersive focus mode
- **Size**: full screen
- **Sub-elements**:
  - Session header (FIXED, 56pt): close button (X icon, left, white, 20pt, 44x44pt touch target) + "Yoga session" title (17pt Sora Semibold, white, center) + elapsed time (15pt Sora Semibold, Burnt Orange, right-aligned) + "pose N of M" subtitle (13pt Regular, white at 50%, below title)
  - Current pose display (~200pt): pose image or YouTube video embed (full-width minus 32pt, r-xl corners, 16:9 aspect). Pose name: 20pt Sora Semibold, white, centered below image. Hold duration: 15pt Sora Regular, white at 50%, "hold for 45 seconds", centered.
  - Pose timer ring (120pt diameter): circular countdown. Ring: 6pt stroke. Track: white at 10%. Fill: wellbeing-teal (#14B8A6), counterclockwise sweep from 12 o'clock. Center: time remaining (32pt Sora Semibold, white, "0:32"). Completion: ring flashes green (280ms), medium haptic.
  - Instructions card (~100pt): ink-brown-800 card, r-md, 16pt padding. "Instructions:" label 13pt Sora Semibold, white at 50%. Body: 14pt Sora Regular, white at 70%, max 4 lines, scrollable if longer.
  - Next pose preview (64pt): ink-brown-800 card, r-md, 16pt padding. "NEXT UP" eyebrow (12pt Sora Semibold, wellbeing-teal, uppercase) + small thumbnail (40pt square, r-sm) + pose name (15pt Sora Semibold, white) + hold duration (13pt Regular, white at 50%). If last pose: "SESSION COMPLETE" in green.
  - Control row (48pt): two buttons side by side, 8pt gap, each half-width minus margins.
    - "Skip pose": ink-brown-800 bg, 1pt white at 10% border, r-pill, white at 60% text, 15pt Sora Semibold
    - "Pause": ink-brown-800 bg, 1pt white at 10% border, r-pill, white text, 15pt Sora Semibold. Toggles to "Resume" when paused (text changes, bg remains).
  - SIA real-time note (40pt): purple dot (6pt, #7F24FF) + rotating motivational message (13pt Sora Regular, white, 1 line). Messages rotate every 30 seconds with fade transition.
- **Variants**:
  - Active: timer counting down, pose displayed
  - Paused: timer frozen, "Resume" button, overlay dims slightly (ink-900 at 40%)
  - Transitioning between poses: current pose fades out, next pose fades in (280ms crossfade), chime sound + light haptic
  - Session complete: transitions to Post-Session Summary mode
- **Gestures**: tap close (X) -- confirmation dialog ("End session? Progress will be saved."), tap skip -- advances to next pose, tap pause/resume -- toggles timer state

### Post-Session Summary View (In-Screen Mode)
- **Purpose**: session recap with metrics, difficulty rating, notes capture, streak update, and XP reward
- **Data source**: `yoga_session_logs` (session record just completed), `yoga_streaks` (updated streak)
- **Visual treatment**: standard scrollable content on ink-900, tab bar visible again
- **Size**: full screen, ScrollView
- **Sub-elements**:
  - Header (56pt): back chevron (left) + "Session complete" title (17pt Sora Semibold, white, center)
  - Summary card (~200pt): ink-brown-800 card, r-xl (28pt), 24pt padding.
    - "SESSION COMPLETE" eyebrow: 12pt Sora Semibold, wellbeing-teal (#14B8A6), uppercase, +0.12em tracking (already compliant)
    - Stat grid (2x2): each cell equal width, 12pt gap.
      - Duration: value (20pt Sora Bold, white, "30:00") + label (12pt Regular, white at 50%, "duration")
      - Poses: value (20pt Bold, white, "12/12") + label (12pt Regular, white at 50%, "poses")
      - Difficulty: value (15pt Semibold, white, "Beginner") + label (12pt Regular, white at 50%, "difficulty")
      - XP: value (20pt Bold, green #34A853, "+45 XP") + label (12pt Regular, white at 50%, "earned")
    - XP value has glow-orange effect on mount (scale 0.5 to 1.0, 520ms ease-flow)
  - Difficulty rating card (~80pt): ink-brown-800 card, r-md, 16pt padding.
    - "How did that feel?" -- 16pt Sora Semibold, white
    - 5 rating circles in a row: 40pt each, 12pt gap, numbered 1-5. Default: white at 10% fill, 1pt white at 20% border. Selected: wellbeing-teal (#14B8A6) fill, white number. Labels below extremes: "too easy" (below 1), "just right" (below 3), "too hard" (below 5) -- 11pt Sora Regular, white at 40%.
  - Notes input card (~100pt): ink-brown-800 card, r-md, 16pt padding.
    - Placeholder: "session notes (optional)" -- 15pt Sora Regular, white at 40%
    - Text area: 80pt height, grows to 160pt max. 15pt Sora Regular, white.
    - Focused border: 2pt Burnt Orange
  - Streak update card (~72pt): ink-brown-800 card, r-md, 16pt padding.
    - "STREAK UPDATE" eyebrow: 12pt Sora Semibold, wellbeing-teal, uppercase
    - Flame icon (20pt, orange) + "13-day streak" (17pt Sora Semibold, white). If new personal best: additional line "new personal best" in wellbeing-teal, 13pt Semibold.
  - "Done" CTA: 56pt height, full-width minus 32pt, Burnt Orange (#FF5E00), white text 17pt Sora Semibold, r-pill. 24pt top margin. Navigates back to Browse Mode.
- **Gestures**: tap rating circle to select difficulty, tap notes area to type, tap "Done" to return to browse mode and save session data

### Stats Section
- **Purpose**: aggregate yoga metrics providing a sense of progress
- **Data source**: aggregated from `yoga_session_logs`, `yoga_streaks`, `yoga_poses` (mastered count)
- **Visual treatment**: eyebrow label + 2 rows of stat tiles
- **Size**: full-width x ~160pt
- **Sub-elements**:
  - Eyebrow: "YOUR STATS" -- 12pt Sora Semibold, white at 40%, uppercase, +0.12em tracking
  - Row 1 (3 tiles, equal width, 8pt gaps):
    - Total sessions: value (20pt Sora Semibold, white, "24") + label (12pt Sora Regular, white at 50%, "sessions")
    - Total hours: value (20pt Semibold, white, "8.5") + label (12pt Regular, white at 50%, "hours")
    - Poses mastered: value (20pt Semibold, white, "42") + label (12pt Regular, white at 50%, "poses")
  - Row 2 (2 tiles, equal width, 8pt gap, 8pt below row 1):
    - Current streak: value (20pt Semibold, white, "12") + label (12pt Regular, white at 50%, "streak")
    - Longest streak: value (20pt Semibold, white, "18") + label (12pt Regular, white at 50%, "longest streak")
  - All tiles: ink-brown-800 bg, r-md (14pt), 72pt height
  - Count-up animation on mount: 0 to value over 280ms, ease-out-soft

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | 60/30/10 base |
| Card surfaces | #211008 | ink-brown-800 | glassmorphism with 1pt white 6% border |
| Domain accent line | #14B8A6 | wellbeing-teal | domain color, header only |
| Domain eyebrow text | #14B8A6 | wellbeing-teal | "SESSION COMPLETE", "STREAK UPDATE" labels |
| RPG badge text + bg | #14B8A6 at 100% / 15% | wellbeing-teal | domain color on badge |
| "Start session" CTA | #FF5E00 | burnt-orange | 60% primary -- main CTA |
| "Done" CTA | #FF5E00 | burnt-orange | 60% primary -- post-session CTA |
| "see all" links | #FF5E00 | burnt-orange | 60% primary -- interactive text |
| Active filter chip bg | #FF5E00 | burnt-orange | 60% primary -- selected filter |
| Streak flame icon | #FF5E00 | burnt-orange | 60% primary -- motivational |
| Elapsed session time | #FF5E00 | burnt-orange | 60% primary -- active timer |
| Stat tile count-up | #FFFFFF | white | values animate in |
| Pose timer ring fill | #14B8A6 | wellbeing-teal | domain-appropriate timer (not orange, to distinguish from fitness) |
| Timer completion flash | #34A853 | forest-green | 30% secondary -- pose complete |
| XP earned text | #34A853 | forest-green | 30% secondary -- reward |
| Session completed badge | #34A853 | forest-green | 30% secondary -- completed indicator |
| Rating circle selected | #14B8A6 | wellbeing-teal | domain indicator on interactive (exception: not a CTA) |
| SIA purple dot | #7F24FF | royal-purple | 10% accent -- AI indicator |
| SIA projected note | #7F24FF | royal-purple | 10% accent -- real-time coaching |
| Difficulty badge (beginner) | #14B8A6 at 15% bg / 100% text | wellbeing-teal | identification |
| Difficulty badge (intermediate) | #F59E0B at 15% bg / 100% text | creativity-amber | identification |
| Difficulty badge (advanced) | #EF4444 at 15% bg / 100% text | fitness-red | identification |
| Primary text | #FFFFFF at 100% | white | headings, values, pose names |
| Secondary text | #FFFFFF at 70% | white-70 | body text, instructions |
| Tertiary text | #FFFFFF at 50% | white-50 | captions, meta, durations |
| Quaternary text | #FFFFFF at 40% | white-40 | hints, eyebrow labels |
| Streak banner teal glow | #14B8A6 at 8% | wellbeing-teal | subtle gradient glow |

**60/30/10 verification**: Orange dominates interactive elements (CTAs, active filter chip, streak flame, elapsed time). Green appears on completion indicators (XP earned, session complete badge, timer flash). Purple limited to SIA dot and real-time coaching note. Wellbeing-teal (#14B8A6) confined to domain identification elements: header accent line, RPG badge, eyebrow labels, timer ring fill, difficulty badges, and streak banner glow -- never on primary CTAs or UI chrome. The pose timer ring uses teal rather than orange to visually distinguish yoga from fitness workouts, maintaining the wellbeing register throughout the experience.

---

## Interaction States

### "Start Session" CTA Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Burnt Orange (#FF5E00) fill, white text, r-pill | -- |
| Pressed | darker orange (#E05400) + scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Disabled | 0.4 opacity, no touch response | -- |
| Loading | white spinner replaces text, orange bg | -- |
| Error | N/A (navigation action) | -- |
| Success | brief green glow (600ms) as session loads | success notification |

### Difficulty Filter Chip
| State | Visual | Haptic |
|-------|--------|--------|
| Default (inactive) | ink-brown-800 bg, white 10% border, white 60% text | -- |
| Pressed | bg darkens, scale(0.95) | light impact |
| Active | orange (#FF5E00) bg, white text | medium impact on activation |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Disabled | 0.4 opacity | -- |
| Loading | N/A | -- |
| Error | N/A | -- |
| Success | N/A | -- |

### Session Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 card, full content | -- |
| Pressed | scale(0.97), background darkens to #1a0c06 | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Disabled | N/A | -- |
| Loading | skeleton shimmer on all elements | -- |
| Error | "Could not load session" placeholder | -- |
| Success | N/A | -- |

### Pose Card (Library Grid)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, pose image + name | -- |
| Pressed | scale(0.95), bg darkens | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Disabled | N/A | -- |
| Loading | skeleton shimmer on image + text | -- |
| Error | placeholder silhouette, "image unavailable" | -- |
| Success | N/A | -- |

### SIA Coaching Note Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 card, purple dot, white text | -- |
| Pressed | scale(0.97), background darkens to #1a0c06 | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Disabled | N/A (always tappable) | -- |
| Loading | skeleton shimmer on text area | -- |
| Error | "Could not load SIA note" placeholder text | -- |
| Success | N/A | -- |

### Pose Timer Ring (Active Session)
| State | Visual | Haptic |
|-------|--------|--------|
| Default (counting) | teal fill sweeping counterclockwise, white time text | -- |
| Paused | ring fill freezes, time text pulses (opacity 0.5-1.0, 800ms) | -- |
| Completed | ring flashes green (#34A853) for 280ms | medium impact |
| Transitioning | ring resets to full for next pose | light impact |

### Skip Pose / Pause Buttons
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, white border, text | -- |
| Pressed | bg darkens, scale(0.95) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Disabled | 0.4 opacity (e.g., cannot skip last pose) | -- |
| Loading | N/A | -- |
| Error | N/A | -- |
| Success | N/A | -- |

### Difficulty Rating Circle (Post-Session)
| State | Visual | Haptic |
|-------|--------|--------|
| Default (unselected) | white at 10% fill, 1pt white at 20% border, white number | -- |
| Pressed | scale(0.90), border brightens | light impact |
| Selected | teal (#14B8A6) fill, white number, scale bounce (1.0 > 1.1 > 1.0, 160ms) | medium impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### RPG Skill Badge
| State | Visual | Haptic |
|-------|--------|--------|
| Default | teal text, 15% opacity pill bg | -- |
| Pressed | scale(0.95), bg opacity increases to 25% | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Yoga Streak Banner
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 card, flame icon, streak text | -- |
| Pressed | scale(0.98), bg darkens | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Loading | skeleton shimmer | -- |

### "Done" CTA Button (Post-Session)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Burnt Orange (#FF5E00) fill, white text, r-pill | -- |
| Pressed | darker orange (#E05400) + scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Disabled | 0.4 opacity (until rating selected) | -- |
| Loading | white spinner replaces text | -- |
| Error | red border flash, error text below | error notification |
| Success | green glow (600ms), navigates back | success notification |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Swipe right from edge | Screen (Browse) | back navigation (iOS native) |
| Pull down | ScrollView (Browse) | refresh sessions, poses, streak data |
| Tap | Session card body | expand to see full pose list preview |
| Tap | "Start session" CTA | transition to Active Session mode |
| Tap | Pose card (library) | open Pose Detail modal |
| Tap | "see all" (poses) | expand to full searchable pose library |
| Tap | SIA note card | tab switch to SIA Chat [09] with yoga context |
| Tap | RPG badge | stack push to RPG Character [19] |
| Tap | Difficulty filter chip | filter session cards by difficulty |
| Tap | Close (X) in Active Session | confirmation dialog, then end session |
| Tap | Skip pose (Active Session) | advance to next pose |
| Tap | Pause/Resume (Active Session) | toggle timer state |
| Tap | Rating circle (Post-Session) | select difficulty rating |
| Tap | "Done" CTA (Post-Session) | save session, return to Browse |
| Drag down | Pose Detail modal handle | dismiss modal |
| Tap | Backdrop behind modal | dismiss Pose Detail modal |

**Haptic feedback points**:
- "Start session" press: light impact
- "Done" press: light impact
- Filter chip activation: medium impact
- Pose card press: light impact
- SIA card press: light impact
- Pose timer completion: medium impact
- Pose transition: light impact
- Rating circle selection: medium impact
- Pull-to-refresh release: medium impact
- Session complete transition: success notification
- RPG badge press: light impact
- Close session confirmation: light impact

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Streak banner | Screen mount | fade-in + translateY(12>0) | 280ms | ease-out-soft |
| SIA note card | Screen mount | fade-in + translateY(12>0) | 280ms | ease-out-soft |
| Filter chips | Screen mount | fade-in + translateY(12>0) | 280ms | ease-out-soft |
| Session cards | Screen mount | fade-in + translateY(12>0) | 280ms | ease-out-soft |
| Pose library grid | Screen mount | fade-in + translateY(12>0) | 280ms | ease-out-soft |
| Stats section | Screen mount | fade-in + translateY(12>0) | 280ms | ease-out-soft |
| All content entry | Screen mount | staggered: 80ms between elements | 280ms each | ease-out-soft |
| Stat tile values | Scroll into view | count-up from 0 | 280ms | ease-out-soft |
| Streak flame icon | Continuous | subtle flicker scale(0.95-1.05) | 600ms loop | ease-flow |
| Filter chip activation | Tap | bg color crossfade | 160ms | ease-out-soft |
| Session card CTA | Press | scale(0.97) + darken | 160ms | ease-out-soft |
| Browse > Active mode | "Start session" tap | content crossfade below header | 520ms | ease-flow |
| Pose timer ring | Active session | counterclockwise fill sweep | per-pose duration | linear |
| Pose timer completion | Timer reaches 0 | ring flash green + reset | 280ms | ease-out-soft |
| Pose transition | Pose complete | current fades out, next fades in | 280ms | ease-out-soft |
| SIA real-time note | Every 30 seconds | fade in + translateY(8>0) | 280ms | ease-out-soft |
| Next pose preview | Pose advance | slide content left, new slides in | 280ms | ease-out-soft |
| Active > Post mode | Last pose complete | content crossfade | 520ms | ease-flow |
| XP earned badge | Post-session mount | scale(0.5>1.0) + glow pulse | 520ms | ease-flow |
| Streak update | Post-session mount | fade-in + flame grows | 280ms | ease-out-soft |
| Rating circle select | Tap | scale bounce (1.0>1.1>1.0) + fill | 160ms | ease-out-soft |
| Pose Detail modal | Open | slide up from bottom + backdrop fade | 520ms | ease-flow |
| Pose Detail modal | Dismiss | slide down + backdrop fade out | 280ms | ease-out-soft |
| Pose grid cards | Scroll into view | staggered scale-in from 0.9, 40ms stagger | 280ms each | ease-out-soft |
| Pull-to-refresh | Pull release | standard iOS refresh indicator | system | system |

**Screen transition**:
- **Enter (Browse)**: stack push slide-in from right (280ms, ease-out-soft)
- **Exit (Browse)**: stack pop slide-out to right (280ms, ease-out-soft)
- **Browse to Active**: content crossfade below header (520ms, ease-flow), tab bar slides down and hides (280ms)
- **Active to Post-Session**: content crossfade (520ms, ease-flow), tab bar slides back up (280ms)
- **Post-Session to Browse**: content crossfade (280ms, ease-out-soft)

---

## Empty States

### Day 1 (new user)
- **Streak banner**: "start your yoga streak today" in 15pt Sora Regular, white at 50%. Flame icon gray (white at 20%). No longest streak reference. Card maintains full height and visual weight.
- **SIA coaching note**: "Yoga builds strength and calm. Let's start with a beginner session." Warm, encouraging, no data references.
- **Difficulty filter chips**: all visible, "beginner" pre-selected (auto-filtered to show easiest sessions first).
- **Session cards**: pre-populated with 2-3 default beginner sessions from the system. "Morning Flow" (15 min, 8 poses), "Evening Stretch" (10 min, 6 poses), "Gentle Flexibility" (20 min, 10 poses). These are not empty -- SIA ensures there is always something to start.
- **Pose library**: fully populated with system default poses. Grid shows 6 foundational poses (Mountain, Downward Dog, Warrior I, Tree, Child's Pose, Cobra). Never empty.
- **Stats section**: all stat tiles show "0" -- visible but zeroed, not hidden. Labels remain to set expectations: "0 sessions", "0 hours", "0 poses", "0 streak".

### Established user (zero state -- all sessions completed today)
- **Streak banner**: shows current streak with flame animation. No change.
- **SIA coaching note**: "You already practiced today. Rest is part of the process." or "Great session earlier. Your body thanks you."
- **Session cards**: all cards show green completed badge. "Start session" CTA replaced with "completed" label in green text. User can still tap to repeat a session (secondary action).
- **Stats section**: reflects updated totals from today's session(s).

### Network error state
- **Session cards**: "Could not load sessions" in 15pt Sora Regular, white at 50%, centered in card area. "Retry" text link in Burnt Orange below. Tap retries the API call.
- **Pose library**: cached poses shown if available, otherwise same error pattern.
- **Stats section**: cached data shown with "last updated [time]" in 11pt Regular, white at 30%.

---

## Motivation Adaptation

- **Low motivation**: SIA note is gentler and shorter ("Just 10 minutes. You'll feel better."). Only 1 session card visible (shortest/easiest). Pose library hidden entirely. Stats section hidden. Difficulty filter pre-set to "beginner" with other chips hidden. Streak banner shows only current streak (no longest streak comparison to avoid pressure). The screen fits in one viewport without scrolling. Goal: reduce cognitive load and make starting easy.

- **Medium motivation**: default experience as designed above. All sections visible. 2-3 session cards. 6-pose library preview. Full stats. All difficulty filter options available. SIA note references recent activity and suggests appropriate difficulty.

- **High motivation**: additional session cards visible (4-6, including advanced sessions). Pose library expanded to show 9 poses (3x3 grid) by default. Stats section adds an extra row: "this week" mini chart (sparkline of session durations, 7 data points, orange line, 40pt height). SIA note includes data-specific insights ("Your flexibility has improved 15% this month. Try an advanced flow."). Streak banner shows streak vs. longest streak comparison prominently. Additional stat: "total minutes this week" tile added. Difficulty filter shows count badges ("advanced (3)").

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Header title | Sora | Semibold 600 | 20pt | 28pt | #FFFFFF |
| RPG skill badge | Sora | Semibold 600 | 13pt | 18pt | #14B8A6 |
| Section eyebrow | Sora | Semibold 600 | 12pt | 16pt | per context |
| Streak count | Sora | Bold 700 | 20pt | 28pt | #FFFFFF |
| Streak longest reference | Sora | Regular 400 | 13pt | 18pt | #FFFFFF at 50% |
| SIA coaching message | Sora | Regular 400 | 15pt | 22pt | #FFFFFF |
| Difficulty filter chip (inactive) | Sora | Semibold 600 | 13pt | 18pt | #FFFFFF at 60% |
| Session card name | Sora | Semibold 600 | 17pt | 24pt | #FFFFFF |
| Session card meta | Sora | Regular 400 | 13pt | 18pt | #FFFFFF at 50% |
| Session CTA text | Sora | Semibold 600 | 16pt | 22pt | #FFFFFF |
| Pose library heading | Sora | Semibold 600 | 18pt | 24pt | #FFFFFF |
| "see all" link | Sora | Regular 400 | 13pt | 18pt | #FF5E00 |
| Pose card name | Sora | Semibold 600 | 13pt | 18pt | #FFFFFF |
| Search bar placeholder | Sora | Regular 400 | 15pt | 20pt | #FFFFFF at 40% |
| Stat tile value | Sora | Semibold 600 | 20pt | 28pt | #FFFFFF |
| Stat tile label | Sora | Regular 400 | 12pt | 16pt | #FFFFFF at 50% |
| Pose detail name | Sora | Semibold 600 | 20pt | 28pt | #FFFFFF |
| Pose instructions text | Sora | Regular 400 | 15pt | 22pt | #FFFFFF at 70% |
| Instructions eyebrow | Sora | Semibold 600 | 12pt | 16pt | #FFFFFF at 40% |
| "Add to session" CTA | Sora | Semibold 600 | 16pt | 22pt | #FFFFFF |
| Active session title | Sora | Semibold 600 | 17pt | 24pt | #FFFFFF |
| Active session elapsed | Sora | Semibold 600 | 15pt | 20pt | #FF5E00 |
| Pose subtitle ("pose N of M") | Sora | Regular 400 | 13pt | 18pt | #FFFFFF at 50% |
| Current pose name | Sora | Semibold 600 | 20pt | 28pt | #FFFFFF |
| Hold duration text | Sora | Regular 400 | 15pt | 20pt | #FFFFFF at 50% |
| Timer countdown | Sora | Semibold 600 | 32pt | 40pt | #FFFFFF |
| Instructions card label | Sora | Semibold 600 | 13pt | 18pt | #FFFFFF at 50% |
| Instructions card body | Sora | Regular 400 | 14pt | 20pt | #FFFFFF at 70% |
| Next pose name | Sora | Semibold 600 | 15pt | 20pt | #FFFFFF |
| Next pose duration | Sora | Regular 400 | 13pt | 18pt | #FFFFFF at 50% |
| Control button text | Sora | Semibold 600 | 15pt | 20pt | #FFFFFF or #FFFFFF at 60% |
| SIA real-time note | Sora | Regular 400 | 13pt | 18pt | #FFFFFF |
| Post-session stat value | Sora | Bold 700 | 20pt | 28pt | #FFFFFF or #34A853 |
| Post-session stat label | Sora | Regular 400 | 12pt | 16pt | #FFFFFF at 50% |
| Difficulty rating labels | Sora | Regular 400 | 11pt | 16pt | #FFFFFF at 40% |
| "How did that feel?" label | Sora | Semibold 600 | 16pt | 22pt | #FFFFFF |
| Notes placeholder | Sora | Regular 400 | 15pt | 20pt | #FFFFFF at 40% |
| Streak update count | Sora | Semibold 600 | 17pt | 24pt | #FFFFFF |
| "Done" CTA text | Sora | Semibold 600 | 17pt | 24pt | #FFFFFF |

---

## Accessibility

- **Screen reader**: all interactive elements have descriptive accessibility labels. Session cards announce: "[Session name], [difficulty], [duration] minutes, [pose count] poses. Double tap to start." Pose timer announces time remaining every 15 seconds during active session. Streak banner announces: "[N]-day yoga streak. Longest streak: [M] days."
- **Pose timer**: in addition to visual countdown, VoiceOver announces "15 seconds remaining", "10 seconds remaining", "5 seconds remaining", "pose complete" at key intervals.
- **Reduce motion**: all animations replaced with instant state changes. Flame icon static. Timer ring fill is instant (no sweep). Content crossfades replaced with instant swaps. Stat tile count-ups show final value immediately.
- **Dynamic type**: text scales up to 200% with layout reflow. Session cards expand vertically. Pose grid switches from 3-column to 2-column at largest type sizes.
- **Color contrast**: all text meets WCAG AA contrast on ink-900 background. White at 50% on #0A0A0F = 7.8:1 ratio. Wellbeing-teal (#14B8A6) on ink-900 = 5.9:1 ratio (passes AA for large text; rating circles use 40pt size). Difficulty badge text on 15% bg tint passes AA.
- **Touch targets**: all interactive elements minimum 44x44pt. Difficulty filter chips: 36pt visible height with extended touch target to 44pt. Rating circles: 40pt visible with 44pt touch target. Close button (X): 44x44pt.

---

## Backend API Integration

### Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/yoga/poses` | GET | Fetch all yoga poses (paginated, filterable by difficulty) |
| `/api/yoga/poses/:id` | GET | Fetch single pose detail |
| `/api/yoga/sessions` | GET | Fetch available guided sessions (filterable by difficulty) |
| `/api/yoga/sessions/:id` | GET | Fetch single session with full pose list |
| `/api/yoga/session-logs` | POST | Log a completed session (duration, poses completed, difficulty rating, notes) |
| `/api/yoga/session-logs/:id` | PATCH | Update session log (add notes, update rating) |
| `/api/yoga/streaks` | GET | Fetch current and longest streak |
| `/api/yoga/stats` | GET | Fetch aggregate stats (total sessions, hours, poses mastered) |
| `/api/youtube?q=[pose name] yoga` | GET | Search YouTube for pose tutorial videos |

### Database Tables

| Table | Key Columns | Notes |
|-------|-------------|-------|
| `yoga_poses` | name, description, difficulty, instructions, image_url | System-seeded with ~50 default poses. Difficulty enum: beginner, intermediate, advanced. |
| `yoga_sessions` | session_date, poses (JSONB), duration_minutes, difficulty | JSONB `poses` field contains ordered array of pose IDs with hold durations. |
| `yoga_session_logs` | session_id, pose_id, duration_seconds, notes | One row per pose per completed session. Aggregated for stats. |
| `yoga_streaks` | streak_start_date, current_streak, longest_streak | Updated on session completion. Resets if a calendar day is missed. |

### Data Flow
- **Browse mode load**: parallel fetch of `/api/yoga/sessions`, `/api/yoga/poses` (first 6), `/api/yoga/streaks`, `/api/yoga/stats`
- **Start session**: client reads session's `poses` JSONB, fetches full pose details for each
- **Active session**: client manages timer locally, logs each pose completion to local state
- **Post-session save**: single POST to `/api/yoga/session-logs` with full session data; server updates `yoga_streaks` atomically
- **YouTube integration**: lazy-loaded when Pose Detail modal opens; `/api/youtube` called with pose name; results cached for session duration

---

## Error Handling

| Scenario | User Experience |
|----------|-----------------|
| Sessions fail to load | Skeleton shimmer for 3 seconds, then "Could not load sessions. Tap to retry." centered in session area. Retry triggers new API call with loading state. |
| Poses fail to load | Grid shows placeholder silhouette cards with "loading..." text. After timeout: "Could not load poses. Pull down to refresh." |
| Streak data unavailable | Streak banner shows skeleton shimmer, then falls back to "streak data unavailable" in 13pt Regular, white at 30%. Does not block session browsing. |
| YouTube video unavailable | Video area in Pose Detail modal shows "Video not available" text on ink-brown-800 bg. Pose detail remains fully functional without video. |
| Session save fails (post-session) | Session data cached locally. "Done" CTA shows error state (red border flash). Error message below: "Could not save session. We'll try again automatically." Background retry with exponential backoff. Toast notification on eventual success. |
| Mid-session network loss | Active session continues (timer is client-side). Pose images use cached versions. Session log saved locally and synced when connectivity returns. |
| Streak reset dispute | If server returns a different streak than expected, SIA note addresses it: "Your streak data has been updated." No jarring UI change -- streak banner crossfades to new value (280ms). |

---

## Cross-References

- **Navigates to**: Screen 19 (RPG Character) via stack push (RPG badge tap), Screen 09 (SIA Chat) via tab switch (SIA note tap, with yoga/wellbeing context), Pose Detail modal (in-screen modal presentation)
- **Navigates from**: Screen 18 (Explore Section) via stack push, Screen 26 (Fitness & Workouts Dashboard) via stack push, Screen 09 (SIA Chat) via deep-link stack push, Screen 12 (Home Screen) via wellbeing action card stack push
- **Shared components with**: Screen 26 (Domain Dashboard Header -- same component, wellbeing-teal domain color instead of fitness-red), Screen 26 (SIA Coaching Note Card -- compact variant), Screen 26 (Stat Tile), Screen 27 (Circular Countdown / Pose Timer Ring -- adapted from rest timer), Screen 38 (Streak Tracker / Calendar Heatmap pattern -- could be added in high motivation variant), Screen 13 (Filter Chip Row), Screen 29 (Search Bar -- in pose library "see all" view)
- **Patterns used**: Back Button (Batch 1), In-Card CTA Button (Screen 26), 8-State Interaction Model, Stack Navigation, Content Entry Animation (staggered fade-in), Domain Dashboard Header (Screen 26), SIA Coaching Note Card -- Compact Variant (Screen 26), Filter Chip / Filter Tab Row (Screen 13), Section Heading Row (Screen 26), Stat Tile (Screen 26), Circular Countdown (Screen 27 -- adapted for pose timer), Multi-Mode Screen Pattern (Screen 27 -- Browse > Active > Post-Session), Modal Presentation (Screen 15), Search Bar (Screen 25), Pull-to-Refresh (Screen 12)
- **Patterns established**: Yoga Streak Banner (flame icon + current/longest streak, reusable for any streak-driven feature), Pose Timer Ring (teal variant of circular countdown for wellbeing domain), Session Card (thumbnail + meta + difficulty badge + CTA -- reusable for any guided activity: meditation sessions, breathing exercises), Pose Grid Card (compact image + name + difficulty dot -- reusable for any instructional library: exercise library, recipe library), Difficulty Rating Row (1-5 circle selector with extremity labels -- reusable for any post-activity rating), Post-Session Summary Card (2x2 stat grid with XP -- reusable for any activity completion recap), Active Session View (full-screen immersive mode with timer, instructions, next preview, controls -- reusable for guided meditation, breathing exercises), YouTube Integration Card (lazy-loaded video embed in modal -- reusable for any instructional content)
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-15.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U08`
**Prototype route**: `/features/yoga`
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
| B15-F04 | critical | retention | Implement filter state plus browse, active-session, pause/skip, completion, and post-session summary behavior. |
| B15-F05 | major | information-architecture | Make active yoga a true focused mode with tab bar hidden, close/pause paths, next-pose preview, and summary state. |
| B15-F06 | major | accessibility | Expand hit areas, add selected semantics, make pose cards open details, and route SIA coaching to contextual chat. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

