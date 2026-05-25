# Screen Design: Progress Photos & Body Composition

**Screen**: 49 of 73
**File**: 49-progress-photos.md
**Register**: Fitness Mode (fitness-red #EF4444)
**Primary action**: view body transformation timeline, log weight/measurements, take progress photos
**Tab**: Me (accessed via Me Main → Progress section)
**Navigation**: Stack depth 2-3 from Me tab root (Me Main → Explore → Fitness Dashboard → Progress Photos). Also reachable via SIA deep-link ("your body composition update is ready"), Home Screen [12] action card, or Fitness Dashboard [26] "progress" section link.

---

## Purpose

This screen is the user's body transformation command center — a private, encrypted space where weight trends, body measurements, and progress photos converge into a single timeline. It answers "how is my body changing over time?" with data-driven clarity: a weight trend chart with target line, current stats at a glance, measurement tracking with directional trends, and a photo timeline that lets users visually compare their body across dates. AI body composition analysis provides automated insights from uploaded photos, while encrypted storage ensures photos never leave the user's control. SIA contextualizes the data: connecting weight changes to sleep, nutrition, workout patterns, and stress — revealing the *why* behind the numbers. Free tier includes photo capture, weight logging, and manual measurements; SIA trend analysis requires Plus, and AI body composition analysis requires Pro.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. SIA coaching note — contextual insight connecting body changes to lifestyle patterns
2. Weight trend chart — line chart with target line, the screen's visual anchor
3. Current stats row — weight, BMI, body fat % (three key numbers at a glance)
4. Measurements section — chest, waist, hips, arms, thighs with trend arrows
5. Photo timeline — horizontal scrollable before/after comparison strip
6. AI analysis badge — body composition analysis result from photo AI
7. Privacy notice — encrypted storage indicator for photos
8. Add Progress FAB — bottom sheet launcher with Log Weight, Take Photo, Add Measurements

**User flow**:
- **Arrives from**: Fitness Dashboard [26] via "progress" link (stack push), SIA Chat [09] via deep-link (stack push), Home Screen [12] via body composition action card (stack push), Explore Section [18] via Fitness grid card (stack push)
- **Primary exit**: Photo Comparison Mode (modal overlay) — triggered by tapping a photo pair or "compare" action
- **Secondary exits**: Fitness Dashboard [26] (stack pop via back), SIA Chat [09] (tab switch via SIA note tap), Connected Services [22] (stack push via wearable body fat prompt), Create/Edit Goal [15] (stack push via weight goal tap)

---

## Layout

**Scroll behavior**: ScrollView (content is moderate-to-long depending on measurement history and photo count)
**Tab bar visible**: Yes

### ASCII Wireframe

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  ←  ┃ Progress & body comp   Lv.12 │  56pt — Domain Dashboard Header
│     ┃ (red accent line)             │  FIXED, sticky on scroll
├─────────────────────────────────────┤
│                                     │  SCROLLABLE from here
│  ┌─────────────────────────────────┐│
│  │ ● SIA says:                     ││  72pt — SIA Coaching Note
│  │ "Your weight dropped 1.2kg this ││
│  │  month. Sleep improvement may   ││
│  │  be driving it."                ││
│  └─────────────────────────────────┘│
│          16pt gap                   │
│  ┌─────────────────────────────────┐│
│  │ WEIGHT TREND                    ││  ~200pt — Weight Chart Card
│  │                                 ││
│  │     ╭──╮    ╭─╮                 ││  line chart with dots
│  │  ╭──╯  ╰──╮╯  ╰──╮             ││
│  │  ╯        ╰╯      ╰─── target  ││  dashed target line
│  │  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─   ││
│  │  Jan  Feb  Mar  Apr  May       ││
│  │                                 ││
│  │  [1M] [3M] [6M] [1Y] [All]    ││  time range pills
│  └─────────────────────────────────┘│
│          16pt gap                   │
│  ┌─────────────────────────────────┐│
│  │  ┌──────┐ ┌──────┐ ┌──────┐   ││  ~100pt — Current Stats Row
│  │  │ 72.4 │ │ 23.1 │ │ 18%  │   ││
│  │  │  kg  │ │  BMI │ │ body │   ││
│  │  │  ↓▼  │ │  ──  │ │ fat  │   ││  trend arrows
│  │  └──────┘ └──────┘ └──────┘   ││
│  └─────────────────────────────────┘│
│          16pt gap                   │
│  ┌─────────────────────────────────┐│
│  │ MEASUREMENTS          see all → ││  ~180pt — Measurements Card
│  │                                 ││
│  │  Chest    96 cm          ↓ -2  ││  measurement rows
│  │  ─────────────────────────────  ││
│  │  Waist    82 cm          ↓ -3  ││  with trend indicators
│  │  ─────────────────────────────  ││
│  │  Hips     98 cm          ── 0  ││
│  │  ─────────────────────────────  ││
│  │  Arms     34 cm          ↑ +1  ││
│  │  ─────────────────────────────  ││
│  │  Thighs   56 cm          ↓ -1  ││
│  │                                 ││
│  │  Last updated: 3 days ago      ││
│  └─────────────────────────────────┘│
│          16pt gap                   │
│  ┌─────────────────────────────────┐│
│  │ PROGRESS PHOTOS        compare ││  ~200pt — Photo Timeline
│  │                                 ││
│  │  ┌──────┐ ┌──────┐ ┌──────┐   ││  horizontal scroll
│  │  │ front│ │ front│ │ front│   ││
│  │  │ photo│ │ photo│ │ photo│   ││
│  │  │      │ │      │ │      │   ││
│  │  │May 21│ │Apr 15│ │Mar 01│   ││
│  │  └──────┘ └──────┘ └──────┘   ││
│  │                                 ││
│  │  ┌─────────────────────────┐   ││
│  │  │ 🤖 AI Analysis: 18% BF  │   ││  AI badge
│  │  │    Muscle gain detected  │   ││
│  │  └─────────────────────────┘   ││
│  └─────────────────────────────────┘│
│          16pt gap                   │
│  ┌─────────────────────────────────┐│
│  │ 🔒 Photos encrypted end-to-end ││  ~40pt — Privacy Notice
│  │    Only visible to you          ││
│  └─────────────────────────────────┘│
│                                     │
│          64pt bottom padding        │
│                                     │
│       ┌────────────────────┐        │  FAB, floating, z-40
│       │  + Add progress     │        │  48pt, above tab bar
│       └────────────────────┘        │
├─────────────────────────────────────┤
│  Today  │  SIA  │ Goals │  Me      │  Tab Bar (56pt + 34pt safe)
└─────────────────────────────────────┘
```

### Photo Comparison Mode (Modal Overlay)

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  ✕ close       Compare       done  │  modal header
├─────────────────────────────────────┤
│                                     │
│  ┌───────────────┬────────────────┐│
│  │               │                ││  side-by-side photos
│  │   Mar 01      │    May 21      ││  with date labels
│  │               │                ││
│  │    BEFORE     │     AFTER      ││
│  │               │                ││
│  │               │                ││
│  │               │                ││
│  └───────────────┴────────────────┘│
│                                     │
│  ◄═══════════╪═══════════════════► │  slider divider
│                                     │
│  ┌──────┐ ┌──────┐ ┌──────┐      │  date selector
│  │Mar 01│ │Apr 15│ │May 21│      │  horizontal scroll
│  └──────┘ └──────┘ └──────┘      │
│                                     │
│  [front]  [side]  [back]           │  view type toggle
│                                     │
└─────────────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Status Bar** — 44pt
   - Purpose: system status bar
   - Content: transparent, system-managed

2. **Domain Dashboard Header** — 56pt, FIXED
   - Purpose: screen identification, back navigation, RPG level display
   - Content: back chevron (left), "Progress & body comp" title with 2pt red (#EF4444) accent line underneath, "Lv.12" RPG badge (right)
   - Sticky on scroll with backdrop-blur (z-30)

3. **SIA Coaching Note Card** — 72pt (variable: min 56pt, max 96pt)
   - Purpose: AI coaching voice connecting body changes to lifestyle data
   - Content: purple dot indicator (6pt, #7F24FF) + contextual SIA message
   - 16pt top margin from header

4. **Weight Trend Chart Card** — ~200pt
   - Purpose: primary data visualization — weight over time with target
   - Content: line chart, target line, time range selector pills
   - 16pt top margin

5. **Current Stats Row** — ~100pt
   - Purpose: three key body metrics at a glance
   - Content: weight, BMI, body fat % with trend arrows
   - 16pt top margin

6. **Measurements Card** — ~180pt
   - Purpose: detailed body measurements with change tracking
   - Content: measurement rows (chest, waist, hips, arms, thighs) with values and trend indicators
   - 16pt top margin

7. **Photo Timeline Card** — ~200pt
   - Purpose: visual body transformation history
   - Content: horizontal scrollable photo strip + AI analysis badge
   - 16pt top margin

8. **Privacy Notice** — ~40pt
   - Purpose: user trust — encrypted storage reassurance
   - Content: lock icon + encryption message
   - 16pt top margin

9. **Bottom Padding** — 64pt
   - Purpose: clears FAB and tab bar from content

10. **FAB (Add Progress)** — 48pt height, floating
    - Purpose: quick access to log weight, take photo, or add measurements
    - Content: "+ Add progress" text
    - Positioned 16pt above tab bar, centered, z-40

11. **Tab Bar** — 56pt + 34pt safe area
    - Purpose: primary app navigation
    - Content: Today | SIA | Goals | Me (Me active)

---

## Components

### Domain Dashboard Header
- **Purpose**: screen identification with fitness domain branding and RPG integration
- **Data source**: user's fitness skill level from RPG system
- **Visual treatment**: fixed bar, ink-900 background, no card styling
- **Size**: full-width x 56pt
- **Sub-elements**:
  - Back button: left chevron, white, 2pt stroke, 20pt icon, 44x44pt touch target, 16pt from left edge
  - Title: "Progress & body comp", 20pt Sora Semibold, white, left-aligned 56pt from left
  - Domain accent line: 2pt height, #EF4444 (fitness red), extends from title left edge to ~60% of available width, 4pt below title text baseline
  - RPG skill badge: "Lv.12", 13pt Sora Semibold, #EF4444 text, background #EF4444 at 15% opacity, r-pill shape, 8pt horizontal / 4pt vertical padding, right-aligned 16pt from right edge
- **Gestures**: back button taps pop stack; RPG badge taps push to RPG Character [19]

### SIA Coaching Note Card
- **Purpose**: contextual AI coaching message connecting body composition changes to cross-domain lifestyle patterns
- **Data source**: AI-generated based on weight trend, measurement deltas, workout history, sleep data, nutrition logs
- **Visual treatment**: ink-brown-800 card with glassmorphism (1pt border, white at 6% opacity), r-xl (28pt), 24pt padding
- **Size**: full-width minus 32pt (16pt margins) x 72pt (variable)
- **Sub-elements**:
  - Purple dot: 6pt circle, #7F24FF, 16pt from left edge of card, vertically centered with first text line
  - Message text: 15pt Sora Regular, white, left-aligned 32pt from card left edge, 16pt right padding, max 3 lines
- **Variants**:
  - Weight trending down toward goal: "Your weight dropped 1.2kg this month. Sleep improvement may be driving it."
  - Weight plateau: "Weight holding steady this week. Your muscle-to-fat ratio is shifting — measurements tell the story better."
  - New measurement logged: "Waist down 3cm since you started. That correlates with your consistent evening workouts."
  - No recent data: "It's been 2 weeks since your last weigh-in. Want to log today?"
  - Day 1: "Start tracking and I'll connect the dots between your body, habits, and goals."
- **Gestures**: tap entire card navigates to SIA Chat [09] with fitness/body composition context pre-loaded

### Weight Trend Chart Card
- **Purpose**: primary data visualization — weight plotted over time with target weight line
- **Data source**: `GET /api/progress` — progress_records where record_type = 'weight'
- **Visual treatment**: ink-brown-800 card with glassmorphism, r-xl (28pt), 24pt internal padding
- **Size**: full-width minus 32pt x ~200pt
- **Sub-elements**:
  - Eyebrow: "WEIGHT TREND", 12pt Sora Semibold, #EF4444, uppercase, +0.12em tracking
  - Chart area: ~130pt height
    - Weight line: 2pt stroke, burnt orange (#FF5E00), smooth bezier interpolation between data points
    - Data points: 6pt circles, burnt orange fill, at each recorded weight
    - Target line: 1pt dashed stroke, white at 30%, horizontal across chart at target weight value
    - Target label: "target: 70 kg", 11pt Sora Regular, white at 30%, right-aligned at target line end
    - Y-axis labels: weight values in 12pt Sora Regular, white at 30%, left-aligned
    - X-axis labels: month abbreviations in 12pt Sora Regular, white at 30%, evenly spaced
    - Fill area: gradient from burnt orange at 15% (at the line) to transparent (at the bottom), creating a soft area chart effect
    - Tap interaction: touch-and-hold on chart reveals a vertical crosshair with tooltip showing exact weight + date at that point
  - Time range pills: horizontal row below chart, 12pt gap. Each pill: 32pt height, r-pill, 12pt horizontal padding
    - Options: "1M", "3M", "6M", "1Y", "All"
    - Active pill: burnt orange fill, white text (13pt Sora Semibold)
    - Inactive pills: transparent bg, white at 50% text (13pt Sora Regular)
    - Default selection: "3M"
- **Variants**:
  - Populated (3+ data points): full chart with smooth line
  - Sparse (1-2 data points): dots only, no line, message "log a few more to see your trend"
  - No target set: target line hidden, "set a weight goal" text link in burnt orange below chart
  - Loading: skeleton shimmer across chart area
- **Gestures**: tap time range pill to change view; touch-and-hold on chart for crosshair tooltip; tap "set a weight goal" pushes to Create/Edit Goal [15] with fitness domain + weight metric pre-selected

### Current Stats Row
- **Purpose**: three key body metrics at a glance with directional trends
- **Data source**: latest progress_record (weight), calculated BMI (from weight + height in profile), body fat % (from wearable via Connected Services or AI photo analysis)
- **Visual treatment**: ink-brown-800 card with glassmorphism, r-md (14pt), 16pt internal padding
- **Size**: full-width minus 32pt x ~100pt
- **Sub-elements** (3-column layout, equal widths):
  - Each column: value (24pt Sora Bold, white, centered, tabular-nums) + label (12pt Sora Regular, white at 50%, centered, 4pt below value) + trend indicator (8pt below label)
  - Column 1: Weight — value (e.g., "72.4"), label "kg", trend arrow
  - Column 2: BMI — value (e.g., "23.1"), label "BMI", trend arrow
  - Column 3: Body fat — value (e.g., "18%"), label "body fat", trend arrow
  - Trend indicators:
    - Down (improving for weight/waist): green (#34A853) downward arrow + delta text (e.g., "-1.2")
    - Up (improving for muscle): green (#34A853) upward arrow + delta text
    - Neutral/unchanged: white at 30% dash "—"
    - Up (not improving for weight): #EF4444 upward arrow + delta text
    - Down (not improving for muscle): #EF4444 downward arrow + delta text
  - Trend direction interpretation is context-aware: SIA determines whether up/down is positive or negative based on user's goals
- **Variants**:
  - Full data: all three columns populated
  - No body fat: third column shows "—" with "connect wearable" text link in 11pt, burnt orange, tapping pushes to Connected Services [22]
  - No BMI (missing height): second column shows "—" with "add height" text link, tapping opens profile edit
  - Day 1: all dashes, "log your first weigh-in" below the row in 13pt Sora Regular, white at 50%
  - Loading: skeleton shimmer on values
- **Gestures**: tap weight column pushes to weight history detail (scrollable list); tap body fat column when showing "connect wearable" pushes to Connected Services [22]

### Measurements Card
- **Purpose**: detailed body measurements with change tracking over time
- **Data source**: `GET /api/progress` — progress_records where record_type = 'measurement'
- **Visual treatment**: ink-brown-800 card with glassmorphism, r-xl (28pt), 24pt internal padding
- **Size**: full-width minus 32pt x ~180pt
- **Sub-elements**:
  - Section heading row: "MEASUREMENTS" in 12pt Sora Semibold, #EF4444, uppercase, +0.12em tracking (left) + "see all" in 13pt Sora Regular, burnt orange (#FF5E00), right-aligned, 44pt touch target
  - Measurement rows (5 visible): each row 36pt height
    - Label: 15pt Sora Regular, white, left-aligned ("Chest", "Waist", "Hips", "Arms", "Thighs")
    - Value: 15pt Sora Semibold, white, tabular-nums, right of center ("96 cm")
    - Trend indicator: right-aligned
      - Decreased: green (#34A853) down arrow + delta ("-2") for waist/hips (goal-relative), or red (#EF4444) if decrease is undesired
      - Increased: green (#34A853) up arrow + delta ("+1") for arms/chest (muscle growth), or red (#EF4444) if increase is undesired
      - Unchanged: white at 30% dash + "0"
      - Trend values are delta from previous measurement in same body area
    - Separator: 1pt white at 5% between rows
  - Last updated: "last updated: 3 days ago" — 12pt Sora Regular, white at 30%, left-aligned, 8pt below last row
- **Variants**:
  - Populated: all 5 measurement areas with values and trends
  - Partial: some measurements filled, others show "—" with "add" text link in burnt orange
  - Day 1: "No measurements yet" in 15pt Regular, white at 50%, centered. "Measure now" text link in burnt orange below.
  - Loading: skeleton shimmer on rows
- **Gestures**: tap "see all" pushes to full measurement history with per-area trend charts; tap individual measurement row expands inline to show mini sparkline of that measurement over time (280ms expand, ease-out-soft)

### Photo Timeline Card
- **Purpose**: visual body transformation timeline with AI analysis
- **Data source**: `GET /api/progress/photos` — progress photos timeline; `GET /api/onboarding/body-images` — body images with analysis results
- **Visual treatment**: ink-brown-800 card with glassmorphism, r-xl (28pt), 24pt internal padding
- **Size**: full-width minus 32pt x ~200pt (variable based on AI badge visibility)
- **Sub-elements**:
  - Section heading row: "PROGRESS PHOTOS" in 12pt Sora Semibold, #EF4444, uppercase, +0.12em tracking (left) + "compare" in 13pt Sora Regular, burnt orange (#FF5E00), right-aligned, 44pt touch target
  - Photo strip: horizontal ScrollView, 16pt below heading
    - Each photo thumbnail: 100pt wide x 140pt tall, r-md (14pt), object-fit cover
    - Date label below each photo: 11pt Sora Regular, white at 50%, centered ("May 21")
    - Photo type indicator: small icon overlay (top-left corner, 8pt inset) — front/side/back silhouette icon, white at 60%, 16pt, on ink-900 at 60% backdrop circle (24pt)
    - Photo spacing: 12pt between thumbnails
    - Left padding: 0pt (aligned with card internal padding)
    - Right: scrolls off-screen, last photo has 24pt trailing padding
    - Selected photo: 2pt burnt orange border
    - Encrypted indicator: small lock icon (10pt, white at 30%) bottom-right corner of each photo
  - AI Analysis Badge: 16pt below photo strip
    - Background: ink-900 at 80%, r-md (14pt), 12pt padding, 1pt border #7F24FF at 20% (purple tint for AI)
    - Content: robot icon (14pt, #7F24FF) + "AI Analysis: 18% BF" in 14pt Sora Semibold, white + "Muscle gain detected" in 13pt Sora Regular, white at 60%, on second line
    - Badge only appears when analysis_status = 'completed' for the most recent photo set
    - "Analyzing..." state: purple dot pulse animation + "Analyzing your photos..." in 13pt, white at 50%
  - If no AI analysis available: badge hidden, card height reduces accordingly
- **Variants**:
  - Populated (3+ photos): full horizontal scroll with AI badge
  - Sparse (1-2 photos): photos shown, "take more to unlock comparison" below in 13pt, white at 50%
  - Day 1 (no photos): centered illustration (simple body silhouette outline, white at 10%, 80pt), "Take your first progress photo" in 15pt Sora Regular, white at 50%, "Your photos are encrypted and private" in 13pt, white at 30%. "Take photo" text link in burnt orange.
  - AI analyzing: badge shows pulsing purple dot + "analyzing" text
  - AI unavailable: badge hidden
  - Loading: skeleton shimmer on photo areas
- **Gestures**: tap photo thumbnail to view full-screen with pinch-to-zoom; tap "compare" opens Photo Comparison Mode (modal); horizontal scroll through photos; long-press photo shows "delete" option with confirmation dialog

### Photo Comparison Mode (Modal)
- **Purpose**: side-by-side slider comparing body photos from two different dates
- **Data source**: user's progress photos filtered by selected dates and view type
- **Visual treatment**: full-screen modal, ink-900 background, z-50
- **Size**: full screen
- **Sub-elements**:
  - Modal header: 56pt, "Compare" title centered (17pt Sora Semibold, white), close button (x) left (44x44pt touch), "done" right (14pt Sora Semibold, burnt orange, 44x44pt touch)
  - Photo comparison area: ~65% of screen height
    - Two photos displayed side by side
    - "BEFORE" label on left photo: 12pt Sora Semibold, white at 50%, uppercase, +0.12em tracking, centered below photo
    - "AFTER" label on right photo: same styling
    - Date labels on each photo: 13pt Sora Semibold, white, centered at top of each photo, on ink-900 at 50% backdrop pill
    - Slider divider: vertical line (2pt, white) with a circular drag handle (32pt diameter, white fill, --shadow-2) at center. User drags horizontally to reveal more of one photo and less of the other.
  - Date selector: horizontal ScrollView below comparison area, 16pt gap
    - Date pills: each 64pt wide x 44pt tall, r-md (14pt)
    - Active (selected for comparison): burnt orange border (2pt), white text
    - Inactive: ink-brown-800 bg, white at 50% text
    - Two pills can be active simultaneously (before date + after date)
    - First tap selects "before" date, second tap selects "after" date
  - View type toggle: horizontal row of 3 pills below date selector
    - Options: "front", "side", "back"
    - Active: burnt orange fill, white text (13pt Sora Semibold)
    - Inactive: transparent bg, white at 50% text (13pt Sora Regular)
    - Filters photos to show only matching image_type
- **Gestures**: drag slider handle horizontally; tap date pills to select before/after dates; tap view type toggle; pinch-to-zoom on individual photos; tap close or "done" to dismiss; drag modal down to dismiss

### Privacy Notice
- **Purpose**: reassure users that progress photos are stored with encryption
- **Data source**: static (reflects is_encrypted flag in body_images table)
- **Visual treatment**: ink-brown-800 card with glassmorphism, r-md (14pt), 12pt internal padding. Subtle — not attention-grabbing.
- **Size**: full-width minus 32pt x ~40pt
- **Sub-elements**:
  - Lock icon: 14pt, white at 40%, left-aligned
  - Primary text: "Photos encrypted end-to-end" — 13pt Sora Semibold, white at 50%, 8pt right of icon
  - Secondary text: "Only visible to you" — 12pt Sora Regular, white at 30%, 4pt right of primary text (inline) or below on narrow screens
- **Variants**: always visible when user has at least one photo. Hidden if no photos exist (empty state handles messaging).
- **Gestures**: tap opens a brief tooltip explaining the encryption: "Your photos are encrypted on your device before upload. Not even Balencia can see them." Tooltip dismisses on tap-outside or after 4 seconds.

### FAB (Add Progress)
- **Purpose**: quick access to logging weight, taking a progress photo, or adding measurements
- **Data source**: N/A (navigational)
- **Visual treatment**: floating button above tab bar, glassmorphism with burnt orange background
- **Size**: 48pt height x auto-width (padding 24pt horizontal)
- **Sub-elements**:
  - Icon: "+" in 16pt, white
  - Label: "Add progress" in 15pt Sora Semibold, white
  - 8pt gap between icon and label
- **Variants**: N/A
- **Gestures**: tap opens Add Progress Bottom Sheet
- **Scroll behavior**: fades out on scroll down (opacity 0 + translateY +20pt, 160ms). Fades back in on scroll up or scroll stop.

### Add Progress Bottom Sheet
- **Purpose**: present options for logging different types of progress data
- **Visual treatment**: bottom sheet, ~40% screen height, ink-900 bg, 20pt top corners, drag handle
- **Size**: full-width x ~40% screen height
- **Sub-elements**:
  - Handle indicator: centered, 36pt wide x 4pt, white at 15%, r-pill, 8pt top margin
  - Title: "Log progress" — 17pt Sora Semibold, white, left-aligned, 16pt horizontal margins, 16pt below handle
  - Three option cards in vertical stack, 12pt gap between:
    - **Log Weight**: ink-brown-800 card, r-md (14pt), 16pt padding, 64pt height
      - Left icon: scale icon, 24pt, burnt orange
      - Label: "Log weight" — 16pt Sora Semibold, white
      - Subtitle: "Quick weigh-in entry" — 13pt Sora Regular, white at 50%
      - Right: chevron, white at 30%
      - Tap: opens inline weight entry (numeric keypad with unit toggle kg/lbs, "save" CTA)
    - **Take Photo**: ink-brown-800 card, r-md (14pt), 16pt padding, 64pt height
      - Left icon: camera icon, 24pt, burnt orange
      - Label: "Take photo" — 16pt Sora Semibold, white
      - Subtitle: "Front, side, or back view" — 13pt Sora Regular, white at 50%
      - Right: chevron, white at 30%
      - Tap: opens camera with pose guide overlay (silhouette outline for front/side/back) via `POST /api/progress/photos` or `POST /api/onboarding/body-images`
    - **Add Measurements**: ink-brown-800 card, r-md (14pt), 16pt padding, 64pt height
      - Left icon: ruler icon, 24pt, burnt orange
      - Label: "Add measurements" — 16pt Sora Semibold, white
      - Subtitle: "Chest, waist, hips, arms, thighs" — 13pt Sora Regular, white at 50%
      - Right: chevron, white at 30%
      - Tap: opens measurement entry form (5 numeric fields with body area labels, "save" CTA) via `POST /api/progress`
  - "cancel" text link: 14pt Sora Regular, white at 50%, centered, 16pt below cards
- **Gestures**: tap option card to proceed; drag down to dismiss; tap "cancel" to dismiss; tap scrim (darkened area above sheet) to dismiss

---

## Typography

| Element | Font | Size | Weight | Color | Notes |
|---------|------|------|--------|-------|-------|
| Header title | Sora | 20pt | Semibold | white | "Progress & body comp" |
| Domain eyebrow labels | Sora | 12pt | Semibold | #EF4444 | Uppercase, +0.12em tracking |
| SIA coaching note | Sora | 15pt | Regular | white | Max 3 lines |
| Chart weight values (Y-axis) | Sora | 12pt | Regular | white at 30% | Tabular-nums |
| Chart month labels (X-axis) | Sora | 12pt | Regular | white at 30% | Evenly spaced |
| Time range pills (active) | Sora | 13pt | Semibold | white | On orange bg |
| Time range pills (inactive) | Sora | 13pt | Regular | white at 50% | Transparent bg |
| Stats row values | Sora | 24pt | Bold | white | Tabular-nums |
| Stats row labels | Sora | 12pt | Regular | white at 50% | Below values |
| Trend delta text | Sora | 12pt | Semibold | #34A853 or #EF4444 | Context-aware color |
| Measurement labels | Sora | 15pt | Regular | white | Left-aligned |
| Measurement values | Sora | 15pt | Semibold | white | Tabular-nums |
| Section "see all" / "compare" | Sora | 13pt | Regular | #FF5E00 | Interactive text |
| Photo date labels | Sora | 11pt | Regular | white at 50% | Below thumbnails |
| AI badge title | Sora | 14pt | Semibold | white | Robot icon prefix |
| AI badge subtitle | Sora | 13pt | Regular | white at 60% | Second line |
| Privacy notice primary | Sora | 13pt | Semibold | white at 50% | Lock icon prefix |
| Privacy notice secondary | Sora | 12pt | Regular | white at 30% | Inline or below |
| FAB label | Sora | 15pt | Semibold | white | "+ Add progress" |
| Bottom sheet title | Sora | 17pt | Semibold | white | "Log progress" |
| Bottom sheet option label | Sora | 16pt | Semibold | white | Card titles |
| Bottom sheet option subtitle | Sora | 13pt | Regular | white at 50% | Card descriptions |
| "Last updated" timestamp | Sora | 12pt | Regular | white at 30% | Below measurements |
| RPG badge | Sora | 13pt | Semibold | #EF4444 | In header |

---

## Composition

The screen follows the **Domain Dashboard Template** established in Screen 26, with fitness-red as the domain accent color. The composition centers on the weight trend chart as the visual hero, flanked by supporting data (stats and measurements) and the photo timeline as the emotional anchor.

**Visual weight distribution**:
- Top 40%: SIA note + weight chart (data-driven, analytical)
- Middle 30%: stats row + measurements (reference data, scannable)
- Bottom 30%: photo timeline + privacy notice (emotional, visual, trust-building)

**Reading flow**: The eye enters at the SIA note (coaching voice), moves to the chart (quantitative trend), then scans the stats row (current snapshot), reviews measurements (detail), and lands on photos (visual proof). The FAB at the bottom invites action after review.

**Spacing rhythm**: 16pt gaps between all cards maintain consistent vertical rhythm. Card internal padding is 16pt standard, 24pt for hero cards (weight chart, photo timeline).

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | 60/30/10 base |
| Card surfaces | #211008 | ink-brown-800 | Glassmorphism with 1pt white 6% border |
| Domain accent line | #EF4444 | fitness-red | Header only |
| Domain eyebrow text | #EF4444 | fitness-red | "WEIGHT TREND", "MEASUREMENTS", "PROGRESS PHOTOS" |
| RPG badge text + bg | #EF4444 at 100% / 15% | fitness-red | Domain color on badge |
| Weight chart line | #FF5E00 | burnt-orange | Primary data line |
| Weight chart fill | #FF5E00 at 15% → transparent | burnt-orange gradient | Area chart effect |
| Weight chart data dots | #FF5E00 | burnt-orange | At each recorded value |
| Chart target line | #FFFFFF at 30% | white-30 | Dashed, goal reference |
| Time range active pill | #FF5E00 | burnt-orange | Active selection |
| "see all" / "compare" links | #FF5E00 | burnt-orange | Interactive text |
| FAB background | #FF5E00 | burnt-orange | Primary CTA |
| Trend arrow (positive) | #34A853 | forest-green | Improving direction |
| Trend arrow (negative) | #EF4444 | fitness-red | Non-improving direction |
| Trend neutral | #FFFFFF at 30% | white-30 | Unchanged |
| AI analysis badge border | #7F24FF at 20% | royal-purple | AI indicator |
| AI badge icon | #7F24FF | royal-purple | Robot icon |
| SIA purple dot | #7F24FF | royal-purple | Coaching note indicator |
| Photo selected border | #FF5E00 | burnt-orange | Selected thumbnail |
| Slider handle | #FFFFFF | white | Comparison mode divider |
| Primary text | #FFFFFF at 100% | white | Values, headings |
| Secondary text | #FFFFFF at 60% | white-60 | AI badge subtitle |
| Tertiary text | #FFFFFF at 50% | white-50 | Labels, captions |
| Quaternary text | #FFFFFF at 30% | white-30 | Timestamps, hints |
| Privacy lock icon | #FFFFFF at 40% | white-40 | Subtle trust indicator |

**60/30/10 verification**: Orange dominates interactive elements (chart line, data dots, chart fill, time range pills, FAB, photo selection borders, "see all"/"compare" links). Green appears only on positive trend arrows. Purple limited to SIA dot, AI badge icon, and AI badge border. Domain red (#EF4444) confined to eyebrow labels, accent line, RPG badge, and negative trend arrows — never on actions or UI chrome. Ratio holds.

---

## Interaction States

### Weight Trend Chart
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Line chart with dots and gradient fill | — |
| Touch-hold | Vertical crosshair appears, tooltip shows weight + date | light impact on initial touch |
| Drag (on chart) | Crosshair follows finger horizontally | selection tick on each data point crossed |
| Release | Crosshair fades out (160ms) | — |
| Loading | Skeleton shimmer across chart area | — |
| Error | "Could not load weight data" + "retry" text link | — |

### Time Range Pill
| State | Visual | Haptic |
|-------|--------|--------|
| Default (inactive) | Transparent bg, white 50% text | — |
| Pressed | White 5% bg flash | light impact |
| Active | Orange fill slides in, white text | — |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Current Stats Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | 3-column values with trend arrows | — |
| Pressed (column) | scale(0.97), column bg lightens slightly | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Loading | Skeleton shimmer on values | — |
| Error | Dash values, "retry" text link | — |

### Measurement Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Label + value + trend indicator | — |
| Pressed | Background lightens slightly, scale(0.98) | light impact |
| Expanded | Mini sparkline slides open below row (120pt height reveal) | medium impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Loading | Skeleton shimmer | — |

### Photo Thumbnail
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Photo with date label, r-md corners | — |
| Pressed | scale(0.95), --shadow-2 appears | light impact |
| Selected | 2pt burnt orange border | — |
| Long-pressed | slight lift + "delete" option appears as floating pill above | medium impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Loading | Skeleton shimmer, ink-brown-800 placeholder | — |

### Comparison Slider Handle
| State | Visual | Haptic |
|-------|--------|--------|
| Default | 32pt white circle, --shadow-2, centered on divider | — |
| Pressed | scale(1.1), --shadow-warm | light impact |
| Dragging | Follows finger horizontally, left/right photos reveal/hide | selection tick at 25%/50%/75% positions |
| Released | Handle stays at release position | — |

### FAB (Add Progress)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Burnt orange bg, --shadow-2, white text | — |
| Pressed | Darker orange (#E05400), scale(0.95), --shadow-1 | medium impact |
| Focus-visible | 2pt orange ring, offset 4pt | — |
| Disabled | N/A (always active) | — |

### Bottom Sheet Option Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800, icon + text + chevron | — |
| Pressed | scale(0.97), bg lightens slightly | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity | — |

### Privacy Notice
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Lock icon + text, subdued | — |
| Pressed | Tooltip appears above with encryption explanation | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Swipe right from edge | Screen | Back navigation (iOS native) |
| Pull down | ScrollView | Refresh all data (weight, measurements, photos) |
| Touch-hold | Weight chart | Crosshair with value tooltip |
| Tap | Time range pill | Change chart time range |
| Tap | Stats row column | Push to weight history detail |
| Tap | Measurement row | Expand inline sparkline |
| Tap | "see all" (measurements) | Push to full measurement history |
| Tap | "compare" (photos) | Open Photo Comparison Mode modal |
| Tap | Photo thumbnail | Full-screen photo view with pinch-to-zoom |
| Long-press | Photo thumbnail | Show delete option |
| Horizontal scroll | Photo strip | Scroll through timeline |
| Tap | FAB | Open Add Progress bottom sheet |
| Tap | SIA note card | Tab switch to SIA Chat [09] with body comp context |
| Tap | RPG badge | Push to RPG Character [19] |
| Drag | Comparison slider handle | Reveal/hide before/after photos |
| Tap | Privacy notice | Show encryption tooltip |
| Tap | Bottom sheet option | Proceed to log weight / take photo / add measurements |
| Drag down | Bottom sheet | Dismiss |

**Haptic feedback points**:
- FAB press: medium impact
- Bottom sheet option press: light impact
- Chart touch-hold: light impact on initial contact
- Chart drag across data point: selection tick
- Photo thumbnail press: light impact
- Photo long-press: medium impact
- Measurement row expand: medium impact
- Comparison slider drag at 25%/50%/75%: selection tick
- Pull-to-refresh release: medium impact
- Back button press: light impact

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| SIA note card | Screen mount | fade-in + translateY(12 to 0) | 280ms | ease-out-soft |
| Weight chart card | Screen mount | fade-in + translateY(12 to 0) | 280ms | ease-out-soft |
| Stats row | Screen mount | fade-in + translateY(12 to 0) | 280ms | ease-out-soft |
| Measurements card | Screen mount | fade-in + translateY(12 to 0) | 280ms | ease-out-soft |
| Photo timeline card | Screen mount | fade-in + translateY(12 to 0) | 280ms | ease-out-soft |
| Privacy notice | Screen mount | fade-in + translateY(12 to 0) | 280ms | ease-out-soft |
| All content entry | Screen mount | staggered: 80ms between elements | 280ms each | ease-out-soft |
| Weight chart line | Mount/range change | line draws from left to right (stroke-dashoffset) | 520ms | ease-flow |
| Weight chart fill | After line draw | gradient fades in from 0 to 15% opacity | 280ms | ease-out-soft |
| Chart data dots | After line draw | scale-in from 0.5, 40ms stagger per dot | 160ms each | ease-out-soft |
| Stats row values | Scroll into view | count-up from 0 | 280ms | ease-out-soft |
| Trend arrows | After value count-up | fade-in + translateY(4 to 0) | 160ms | ease-out-soft |
| Measurement row expand | Tap row | height 0 to 120pt, sparkline fades in | 280ms | ease-out-soft |
| Measurement row collapse | Tap expanded row | height 120pt to 0, sparkline fades out | 280ms | ease-out-soft |
| Photo strip thumbnails | Mount | staggered fade-in, 60ms per photo | 280ms each | ease-out-soft |
| AI badge | After photos mount | fade-in + scale(0.95 to 1) | 280ms | ease-out-soft |
| AI badge analyzing dot | Continuous | purple dot pulse (opacity 0.4 to 1.0) | 800ms loop | ease-flow |
| Chart crosshair | Touch-hold | opacity 0 to 1, vertical line appears | 160ms | ease-out-soft |
| Chart crosshair | Release | opacity 1 to 0 | 160ms | ease-out-soft |
| FAB | Scroll down | fade out + translateY(+20pt) | 160ms | ease-out-soft |
| FAB | Scroll up/stop | fade in + translateY(0) | 160ms | ease-out-soft |
| Bottom sheet | FAB tap | slide up from bottom, scrim fades in (ink-900 at 50%) | 280ms | ease-out-soft |
| Bottom sheet | Dismiss | slide down, scrim fades out | 280ms | ease-out-soft |
| Comparison modal | Open | slide up from bottom, full screen | 280ms | ease-out-soft |
| Comparison modal | Dismiss | slide down | 280ms | ease-out-soft |
| Time range pill change | Tap pill | Active indicator slides horizontally to new pill | 280ms | ease-out-soft |
| Pull-to-refresh | Pull release | Standard iOS refresh indicator | system | system |

**Screen transition**:
- **Enter**: stack push slide-in from right (280ms, ease-out-soft)
- **Exit**: stack pop slide-out to right (280ms, ease-out-soft)

---

## Empty States

### Day 1 (new user)
- SIA note: "Start tracking and I'll connect the dots between your body, habits, and goals."
- Weight chart: empty chart area with centered message: "Log your first weigh-in to see your trend" in 15pt Sora Regular, white at 50%. A single "Log weight" text link in burnt orange below. Chart axes still visible (establishes the visual container).
- Stats row: all three columns show "—" dash values. Below the row: "log your first weigh-in" in 13pt Sora Regular, white at 50%.
- Measurements card: "No measurements yet" in 15pt Regular, white at 50%, centered. "Measure now" text link in burnt orange. Card maintains structural height (~100pt) so the screen doesn't feel collapsed.
- Photo timeline: centered body silhouette outline illustration (simple line art, white at 10%, 80pt). "Take your first progress photo" in 15pt Regular, white at 50%. "Your photos are encrypted and private" in 13pt, white at 30%. "Take photo" text link in burnt orange. AI badge hidden.
- Privacy notice: hidden (no photos to reassure about)
- FAB: remains visible and functional — the primary call to action in empty state
- Overall: screen never feels broken. Structural cards are present, content adapts to invite first action. Each empty section has a single, clear CTA.

### Established user (partial data)
- Weight chart: populated with data. Measurements may be empty — shows "add measurements for the full picture" prompt. Photo timeline may be empty — shows photo CTA. Each section is independently emptied/populated.
- SIA note adapts: "You've been tracking weight consistently. Adding measurements would show the full picture."

### Established user (everything populated)
- Full experience as designed. All sections show data. SIA note provides cross-domain insights.
- If photos have been analyzed: AI badge prominent.
- If all measurements trending in goal direction: SIA note celebrates.

---

## Motivation Adaptation

- **Low motivation**: SIA note is warm and encouraging ("You showed up. That's what matters."). Weight chart simplified — only shows last 1 month with fewer grid lines. Stats row shows only weight (BMI and body fat columns hidden to reduce overwhelm). Measurements section collapsed to show only waist (the single most impactful metric). Photo timeline remains but AI analysis badge hidden (reduces data pressure). FAB label changes to "Quick log" for lower friction. Overall: less data, more warmth, fewer numbers.

- **Medium motivation**: Default experience as designed above. All sections visible. Full stats row, all 5 measurements, photo timeline with AI badge when available. SIA provides balanced coaching notes connecting body data to lifestyle.

- **High motivation**: Additional data surfaces:
  - Weight chart adds a secondary line showing lean mass estimate (if wearable provides body composition data), rendered in forest green (#34A853) at 60% opacity
  - Stats row expands to include a 4th column: "lean mass" or "muscle %" if available
  - Measurements section shows all-time min/max ranges as subtle horizontal bars behind current values
  - Photo timeline shows date range labels grouping photos into phases ("Cutting phase", "Maintenance", "Building")
  - Below AI badge: "Body composition trend" mini-chart showing BF% over time (sparkline, 40pt height)
  - Detailed weekly/monthly comparison stats appear as expandable section below measurements
  - SIA note references specific correlations: "Your waist measurement correlates 0.8 with your meal logging consistency."

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Photo upload fails | Upload progress indicator turns red, "could not upload — try again" toast (3s auto-dismiss). Thumbnail shows retry icon overlay. | Tap retry icon on thumbnail to re-upload; photo cached locally |
| Photo encryption fails | Upload halted, "encryption error — try again" toast | Retry re-encrypts and re-uploads; photo remains in local cache |
| Weight trend data load fails | Chart area shows "could not load weight data" + "retry" link in orange | Tap retry re-fetches; pull-to-refresh also available |
| Measurement save fails | Save CTA shows error state (red border flash), "could not save — try again" toast | CTA re-enables, user input preserved in form |
| AI body analysis fails | AI analysis badge shows "analysis unavailable" in 13pt Regular, white at 40% | Auto-retries on next photo upload; non-blocking |
| Photo timeline load fails | Timeline area shows skeleton shimmer then "could not load photos" + "retry" link | Tap retry re-fetches encrypted thumbnails |
| Camera permission denied | Bottom sheet shows "camera access needed" message with "open settings" link | Tapping link opens system settings; returns to screen on back |
| Photo comparison mode fails to load | Comparison overlay shows "could not load photos for comparison" + "close" button | User dismisses overlay and retries from timeline |
| Network offline | All read sections show cached data with "offline" banner (48pt). Photo uploads queue locally with "will upload when connected" status. Measurements save locally. | Banner updates on reconnect; queued uploads process automatically |
| Storage full (device) | "Not enough storage to save photo" alert with "OK" dismissal | User frees device storage; no data loss |

---

## Accessibility

Accessibility follows global standards from `_shared-patterns.md`. Screen-specific notes:

- **Weight trend chart**: Summary for screen readers: "Weight trend over 30 days. Current: 78.2 kg. Target: 75 kg. Down 1.3 kg from 30 days ago."
- **Body stats row**: VoiceOver reads each stat: "Weight 78.2 kilograms, down 0.4 from last week. Body fat 18.2 percent. BMI 24.1."
- **Measurement rows**: VoiceOver reads label, value, and trend: "Waist: 82 centimeters, down 1.5 from last month."
- **Photo timeline**: Each thumbnail announces date and any AI badge: "Progress photo, March 15, 2026, AI analysis available."
- **Photo comparison mode**: VoiceOver announces "Comparing March 15 and May 20 photos. Slider at 50 percent." Slider accessible with standard slider role.
- **Privacy notice**: Announced as informational alert: "Your photos are encrypted and stored only on your device."
- **Add progress bottom sheet**: Each option clearly labeled: "Take new photo", "Choose from library", "Add measurement."
- **FAB**: Accessible label "Add progress entry, button."
- **Touch targets**: All interactive elements meet 44x44pt minimum. Photo thumbnails have expanded touch targets for timeline scrolling.
- **Color contrast**: All text meets WCAG AA. Trend arrows paired with numeric deltas (never color-only).
- **Reduced motion**: Chart line appears without draw animation. Photo timeline scrolls without parallax effects. Comparison slider moves without spring physics.

---

## Cross-References

- **Navigates to**: Photo Comparison Mode (modal overlay, within this screen), Image Viewer [67] (modal presentation via photo thumbnail tap for full-screen viewing), SIA Chat [09] (tab switch via SIA note tap), RPG Character [19] (stack push via RPG badge), Connected Services [22] (stack push via "connect wearable" link in stats row), Create/Edit Goal [15] (stack push via "set a weight goal" link in chart), Camera (system, via "Take photo" in bottom sheet), Full measurement history (stack push via "see all"), Weight history detail (stack push via stats row weight column tap)
- **Navigates from**: Fitness Dashboard [26] (stack push via "progress" link), SIA Chat [09] (deep-link stack push), Home Screen [12] (action card stack push), Explore Section [18] (stack push via fitness grid card)
- **Shared components with**: Screen [26] — Fitness Dashboard (Domain Dashboard Header, SIA Coaching Note Card, FAB pattern), Screen [28] — Nutrition Dashboard (stats row pattern, trend indicators), Screen [38] — Habits (Calendar Heatmap concept adapted as photo timeline), all domain dashboards (Domain Dashboard Header, SIA Coaching Note Card)
- **Patterns used**: Domain Dashboard Header (Screen 26), SIA Coaching Note Card (Screen 26), Back Button (Batch 1), Brand CTA Button (Batch 1), 8-State Interaction Model, Stack Navigation, Content Entry Animation (staggered fade-in), FAB (Screen 26), Section Heading Row (Screen 26), Bottom Sheet (Screen 38), Stat Tile (Screen 26)
- **Patterns established**: Weight Trend Chart (line chart + target line + time range pills + touch crosshair), Body Stats Row (3-column metrics with context-aware trend arrows), Measurement Row (label + value + trend delta with expandable inline sparkline), Photo Timeline Strip (horizontal scroll with encrypted thumbnails + AI badge), Photo Comparison Mode (side-by-side slider with date selector and view type toggle), Privacy Notice (lock icon + encryption assurance), Add Progress Bottom Sheet (3-option card stack for multi-type data entry), AI Analysis Badge (purple-bordered card with robot icon for ML results)

---

## API Integration Notes

### Endpoints Used

| Endpoint | Method | Purpose | Component |
|----------|--------|---------|-----------|
| `/api/progress` | GET | Fetch weight + measurement records | Weight chart, Stats row, Measurements card |
| `/api/progress` | POST | Create weight or measurement record | Add Progress bottom sheet |
| `/api/progress/photos` | GET | Fetch progress photos timeline | Photo Timeline card |
| `/api/progress/photos` | POST | Upload new progress photo | Camera flow from bottom sheet |
| `/api/onboarding/body-images` | POST | Upload body image with type | Alternative photo upload path |
| `/api/onboarding/body-images` | GET | List body images with analysis results | Photo Timeline card, AI Analysis badge |
| `/api/onboarding/body-images/:id` | DELETE | Delete a body image | Long-press delete action |

### Database Table Mapping

- **progress_records**: `record_date`, `record_type` (weight/measurement), `value`, `photo_keys`, `source` (manual/wearable), `source_device`, `notes` — powers weight chart, stats row, and measurements card
- **body_images**: `image_type` (front/side/back), `image_key`, `capture_context`, `analysis_status` (pending/analyzing/completed/failed), `analysis_result` (AI body composition JSON), `analyzed_at`, `is_encrypted` — powers photo timeline, AI analysis badge, comparison mode, and privacy notice

### Data Flow
- Weight chart pulls `record_type = 'weight'` from progress_records, plots `value` against `record_date`
- Stats row derives BMI from latest weight + user profile height; body fat from latest body_images `analysis_result` or wearable source_device data
- Measurements pull `record_type = 'measurement'` records, grouped by body area (stored in `notes` or a sub-type field)
- Photo timeline fetches body_images ordered by creation date, filtered by `image_type` for comparison mode
- AI Analysis badge reads `analysis_status` and `analysis_result` from the most recent body_images set
- Photos respect `is_encrypted` flag — decryption happens client-side only
