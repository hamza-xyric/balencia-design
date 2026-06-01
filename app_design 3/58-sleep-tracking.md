# Screen Design: Sleep Tracking

**Screen**: 58 of 73
**File**: 58-sleep-tracking.md
**Register**: Wellbeing Mode (wellbeing-teal #14B8A6)
**Primary action**: log and analyze sleep patterns
**Tab**: Wellbeing domain or Home → stack push
**Navigation**: Stack depth 2-3 from Me tab root (Me Main → Explore → Sleep Tracking), or stack push from Home Screen [12] via sleep-related action card. Entry from Explore [18] grid card, SIA deep-link [09] ("let's look at your sleep"), Home Screen [12] sleep insight card, or Wellbeing Dashboard via "sleep" section tap. Exit via back button to previous screen, or forward to SIA Chat [09].

---

## Purpose

This screen is the user's sleep command center -- a comprehensive view of sleep patterns, quality trends, and AI-driven coaching to improve rest. It answers "how well am I sleeping and what can I do better?" The screen surfaces last night's sleep data front and center, then reveals longer-term patterns through trend charts and consistency visualizations. Manual logging is always available for users without wearables, while WHOOP/Oura integration auto-populates data with a visible sync badge. SIA analyzes patterns across sleep and other life domains (workout intensity, stress, nutrition) to deliver genuinely useful coaching -- not generic tips. Sleep data feeds into the RPG system: consistent quality sleep earns XP and maintains streaks. Free tier includes manual sleep logging and basic last-night summary; SIA trend analysis requires Plus, and cross-domain sleep correlations require Pro.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Domain Dashboard Header -- "Sleep" title with wellbeing-teal accent line and RPG skill badge
2. Last Night Summary Card -- the hero element: hours slept, quality stars, bedtime/wake, recovery
3. Sleep Trend Chart -- 7/14/30 day bar chart with target line
4. Bedtime Consistency -- visual showing bedtime and wake time regularity
5. Quality Trend -- line chart of sleep quality over time
6. SIA Sleep Insights -- AI coaching note about sleep patterns
7. Wearable Integration Badge -- "Synced from WHOOP" or connect prompt
8. Sleep Hygiene Tips -- expandable section with personalized tips
9. Manual Sleep Log FAB -- always visible for manual entry

**User flow**:
- **Arrives from**: Explore [18] via "Sleep" card (stack push), Home Screen [12] via sleep action card (stack push), SIA Chat [09] via deep-link (stack push), Wellbeing Dashboard via sleep section tap (stack push)
- **Primary exit**: Back to previous screen (stack pop)
- **Secondary exits**: SIA Chat [09] via SIA insight card tap (tab switch), Manual Sleep Log (bottom sheet modal), Connected Services [22] via wearable connect prompt (stack push)

---

## Layout

**Scroll behavior**: ScrollView (mixed content sections, not a homogeneous list)
**Tab bar visible**: Yes

### ASCII Wireframe

```
┌─────────────────────────────────────────┐
│           Status Bar (44pt)             │
├─────────────────────────────────────────┤
│  <  │ Sleep                     Lv.8   │  56pt -- Domain Dashboard Header
│     │ (wellbeing-teal accent line)      │  FIXED, sticky on scroll
├─────────────────────────────────────────┤
│                                         │  SCROLLABLE from here
│  ┌───────────────────────────────────┐ │
│  │ * SIA says:                        │ │  72pt -- SIA Coaching Note
│  │ "You sleep 45min longer on         │ │
│  │  weekends -- try more consistency" │ │
│  └───────────────────────────────────┘ │
│          16pt gap                       │
│  ┌───────────────────────────────────┐ │
│  │ LAST NIGHT                         │ │  ~200pt -- Last Night Summary
│  │                                    │ │
│  │          7.2 hrs                   │ │  large hero number
│  │       ****-  quality               │ │  star rating (4/5)
│  │                                    │ │
│  │  bedtime       wake time           │ │
│  │  11:15 PM  ->  6:28 AM            │ │
│  │                                    │ │
│  │  recovery   [Synced from WHOOP]    │ │  conditional badge
│  │    78%                             │ │
│  └───────────────────────────────────┘ │
│          16pt gap                       │
│  ┌───────────────────────────────────┐ │
│  │ SLEEP TREND          [ 7 | 14 | 30]│ │  ~200pt -- Sleep Trend Chart
│  │                                    │ │
│  │  |## |   |###|   |## |   |###|   │ │  bar chart
│  │  |## |   |###|   |## |   |###|   │ │  with target line
│  │  |## |###|###|## |## |###|###|   │ │
│  │  -------- 7.5h target ----------- │ │
│  │  M   T   W   T   F   S   S       │ │
│  │                                    │ │
│  │  avg: 7.1 hrs    goal: 7.5 hrs    │ │
│  └───────────────────────────────────┘ │
│          16pt gap                       │
│  ┌───────────────────────────────────┐ │
│  │ BEDTIME CONSISTENCY                │ │  ~160pt -- Consistency Viz
│  │                                    │ │
│  │  bedtime range: 10:45p - 11:30p   │ │
│  │  |  ...*...**..*..*..             │ │  scatter/range plot
│  │  |  .........*........            │ │
│  │  wake range:    6:00a - 6:45a     │ │
│  │  |  ..**...*..**...*..           │ │
│  │  M  T  W  T  F  S  S  M  T  W    │ │
│  └───────────────────────────────────┘ │
│          16pt gap                       │
│  ┌───────────────────────────────────┐ │
│  │ QUALITY TREND                      │ │  ~160pt -- Quality Line Chart
│  │                                    │ │
│  │  5 |         *                     │ │
│  │  4 |   *  *     *  *              │ │  line chart
│  │  3 |  *        *                  │ │
│  │  2 |                              │ │
│  │  1 |                              │ │
│  │    M  T  W  T  F  S  S           │ │
│  └───────────────────────────────────┘ │
│          16pt gap                       │
│  ┌───────────────────────────────────┐ │
│  │ Sleep hygiene tips           v     │ │  ~48pt collapsed
│  └───────────────────────────────────┘ │  expandable section
│                                         │
│          64pt bottom padding            │
│                                         │
│         ┌──────────────────┐            │  FAB, floating, z-40
│         │ + Log sleep       │            │  48pt, above tab bar
│         └──────────────────┘            │
├─────────────────────────────────────────┤
│  Today  |  SIA  |  Goals  |  Me        │  Tab Bar (56pt + 34pt safe)
└─────────────────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Status Bar** -- 44pt
   - Purpose: system status bar
   - Content: transparent, system-managed

2. **Domain Dashboard Header** -- 56pt, FIXED
   - Purpose: screen identification, back navigation, RPG level display
   - Content: back chevron (left), "Sleep" title with 2pt wellbeing-teal (#14B8A6) accent line underneath, "Lv.8" RPG badge (right)
   - Sticky on scroll with backdrop-blur (z-30)

3. **SIA Coaching Note Card** -- 72pt (variable: min 56pt, max 96pt)
   - Purpose: AI coaching voice -- contextual sleep insight as the first thing the user reads
   - Content: purple dot indicator (6pt, #7F24FF) + contextual SIA message about sleep patterns
   - 16pt top margin from header

4. **Last Night Summary Card** -- ~200pt
   - Purpose: hero element -- last night's sleep data at a glance
   - Content: eyebrow label, hours slept (large number), quality stars, bedtime/wake times, recovery score, wearable sync badge
   - 16pt top margin

5. **Sleep Trend Chart Card** -- ~200pt
   - Purpose: visualize sleep duration patterns over time
   - Content: segmented control (7/14/30 days), bar chart with target line, average + goal stats
   - 16pt top margin

6. **Bedtime Consistency Card** -- ~160pt
   - Purpose: show regularity of sleep/wake schedule
   - Content: bedtime range band, wake time range band, day-by-day scatter dots
   - 16pt top margin

7. **Quality Trend Card** -- ~160pt
   - Purpose: track sleep quality rating over time
   - Content: 1-5 scale line chart with day labels
   - 16pt top margin

8. **Sleep Hygiene Tips Section** -- ~48pt collapsed, ~240pt expanded
   - Purpose: AI-personalized tips for better sleep
   - Content: expandable/collapsible section with tip rows
   - 16pt top margin

9. **Bottom Padding** -- 64pt
   - Purpose: clears FAB and tab bar from content

10. **FAB (Log Sleep)** -- 48pt height, floating
    - Purpose: manual sleep logging shortcut
    - Content: "+ Log sleep" text
    - Positioned 16pt above tab bar, centered, z-40

11. **Tab Bar** -- 56pt + 34pt safe area
    - Purpose: primary app navigation
    - Content: Today | SIA | Goals | Me (Me active)

---

## Components

### Domain Dashboard Header
- **Purpose**: screen identification with wellbeing domain branding and RPG integration
- **Data source**: user's wellbeing skill level from RPG system
- **Visual treatment**: fixed bar, ink-900 background, no card styling. Follows canonical Domain Dashboard Header pattern established in Screen 26.
- **Size**: full-width x 56pt
- **Sub-elements**:
  - Back button: left chevron, white, 2pt stroke, 20pt icon, 44x44pt touch target, 16pt from left edge
  - Title: "Sleep", 20pt Sora Semibold, white, left-aligned 56pt from left
  - Domain accent line: 2pt height, #14B8A6 (wellbeing-teal), extends from title left edge to ~60% of available width, 4pt below title text baseline
  - RPG skill badge: "Lv.8", 13pt Sora Semibold, #14B8A6 text, background #14B8A6 at 15% opacity, r-pill shape, 8pt horizontal / 4pt vertical padding, right-aligned 16pt from right edge
- **Gestures**: back button taps pop stack; RPG badge taps push to RPG Character [19]

### SIA Coaching Note Card
- **Purpose**: contextual AI coaching message about sleep patterns -- the first thing the user reads
- **Data source**: AI-generated based on sleep_logs, daily_health_metrics (wearable data), and cross-domain correlation analysis
- **Visual treatment**: ink-brown-800 card with glassmorphism (1pt border, white at 6% opacity), r-xl (28pt), 24pt padding. Follows SIA Coaching Note Card -- Compact Variant pattern.
- **Size**: full-width minus 32pt (16pt margins) x 72pt (variable)
- **Sub-elements**:
  - Purple dot: 6pt circle, #7F24FF, 16pt from left edge of card, vertically centered with first text line
  - Message text: 15pt Sora Regular, white, left-aligned 32pt from card left edge, 16pt right padding, max 3 lines
- **Variants**:
  - Pattern insight: "You sleep 45min longer on weekends -- try more consistency for better recovery." (references cross-domain data)
  - Positive reinforcement: "Four nights in a row above 7 hours. Your recovery scores reflect it."
  - Wearable-aware: "Your HRV dipped last night. SIA noticed you had a late workout -- try earlier sessions."
  - Day 1: "Start tracking your sleep to unlock patterns SIA can coach you on."
- **Gestures**: tap entire card navigates to SIA Chat [09] with sleep context pre-loaded

### Last Night Summary Card
- **Purpose**: the hero element -- comprehensive snapshot of last night's sleep
- **Data source**: `sleep_logs` (most recent entry by sleep_date), `daily_health_metrics` (recovery_score, provider), `users` (daily_sleep_hours, daily_recovery_score)
- **Visual treatment**: ink-brown-800 card with glassmorphism, r-xl (28pt), 24pt internal padding. This is the screen's emotional anchor.
- **Size**: full-width minus 32pt x ~200pt
- **Sub-elements**:
  - Eyebrow: "LAST NIGHT", 12pt Sora Semibold, #14B8A6 (wellbeing-teal), uppercase, +0.12em tracking
  - Hours slept (hero number): 36pt Sora Bold, white, centered. Format: "7.2 hrs". This is the single largest text element on screen.
  - Quality stars row: 5 stars, 20pt each, 4pt gap. Filled: #FF5E00 (burnt orange). Empty: white at 15%. Centered below hours. Reflects `quality` field (1-5).
  - Bedtime/wake row: two columns, evenly spaced. Left column: "bedtime" label (12pt Sora Regular, white at 40%) + time value (16pt Sora Semibold, white, "11:15 PM"). Right column: "wake time" label + time value ("6:28 AM"). Arrow between columns: 14pt, white at 30%, pointing right.
  - Recovery row (conditional): "recovery" label (12pt Sora Regular, white at 40%) + score (20pt Sora Semibold, white, "78%"). Color-coded dot: 8pt circle, green (#34A853) > 70%, yellow (#F59E0B) 40-70%, red (#EF4444) < 40%. Right-aligned: wearable sync badge.
  - Wearable sync badge (conditional): "Synced from WHOOP" or "Synced from Oura" -- 11pt Sora Semibold, white at 50%, ink-900 bg, r-pill, 8pt horizontal / 4pt vertical padding. Provider icon (12pt) to the left of text.
- **Variants**:
  - Full data (wearable connected): all sub-elements visible including recovery and sync badge
  - Manual entry only: hours, quality stars, bedtime/wake visible. Recovery row hidden. No sync badge.
  - No data yet (today): "No sleep logged for last night" in 15pt Sora Regular, white at 50%, centered. "Log now" text link in Burnt Orange below.
  - Loading: skeleton shimmer on all text elements
- **Gestures**: tap card body opens a detail tooltip or expands to show additional metrics (sleep stages if wearable provides them). No navigation -- data is self-contained.

### Sleep Trend Chart Card
- **Purpose**: visualize sleep duration patterns over 7, 14, or 30 days with a target reference line
- **Data source**: `sleep_logs.duration_hours` aggregated by `sleep_date` over selected period; user's sleep target from goals or default 7.5hrs
- **Visual treatment**: ink-brown-800 card with glassmorphism, r-xl (28pt), 24pt internal padding
- **Size**: full-width minus 32pt x ~200pt
- **Sub-elements**:
  - Eyebrow: "SLEEP TREND", 12pt Sora Semibold, #14B8A6, uppercase, +0.12em tracking
  - Segmented control (right of eyebrow): 3-segment, "7d" / "14d" / "30d". Standard Segmented Control pattern: 36pt height, ink-brown-800 container, r-pill. Active: #FF5E00 fill, white text. Inactive: transparent, white at 50%.
  - Bar chart area (~120pt height):
    - Bars: 16pt wide (7d), 8pt wide (14d), 4pt wide (30d), r-sm top corners
    - Bar fill: #14B8A6 (wellbeing-teal) at 80% for bars meeting target, #14B8A6 at 40% for bars below target
    - Target line: 1pt dashed, #FF5E00, horizontal at target hours value. Label: "7.5h" in 11pt Sora Regular, #FF5E00, right-aligned
    - X-axis labels: day abbreviations (7d) or date numbers (14d/30d), 11pt Sora Regular, white at 30%
    - Y-axis: implicit (bars scale relative to max), no visible axis labels to keep clean
  - Stats row (below chart, 8pt gap):
    - "avg: 7.1 hrs" -- 13pt Sora Regular, white at 50%, left-aligned
    - "goal: 7.5 hrs" -- 13pt Sora Regular, #FF5E00, right-aligned
- **Variants**:
  - Populated: full bar chart as described
  - Partial data (<7 days): show available bars, empty positions show 1pt white at 5% placeholder bars
  - Day 1: single bar for today (if logged). "Keep logging to see your trend" in 13pt Regular, white at 40%, centered below chart area.
  - Loading: skeleton shimmer on chart area
- **Gestures**: tap segmented control to switch period; tap individual bar for day detail tooltip (date + exact hours + quality rating)

### Bedtime Consistency Card
- **Purpose**: visualize how consistent the user's bedtime and wake time are across days -- consistency is a key sleep hygiene metric
- **Data source**: `sleep_logs.bedtime` and `sleep_logs.wake_time` over the past 14 days
- **Visual treatment**: ink-brown-800 card with glassmorphism, r-xl (28pt), 24pt internal padding
- **Size**: full-width minus 32pt x ~160pt
- **Sub-elements**:
  - Eyebrow: "BEDTIME CONSISTENCY", 12pt Sora Semibold, #14B8A6, uppercase, +0.12em tracking
  - Bedtime band:
    - Label: "bedtime range: 10:45p - 11:30p" -- 13pt Sora Regular, white at 50%
    - Visualization: horizontal band representing the time range across days. Band fill: #14B8A6 at 15%. Individual night dots: 6pt circles, #14B8A6, positioned on the time axis. Tight clustering = good consistency. Outliers visually stand out.
    - Band height: 24pt. Width: full card content width.
  - Wake time band (same treatment):
    - Label: "wake range: 6:00a - 6:45a" -- 13pt Sora Regular, white at 50%
    - Same dot + band visualization
  - Day labels below: 11pt Sora Regular, white at 30%, evenly spaced
  - Consistency score (optional, right of eyebrow): "82%" in 16pt Sora Semibold, white. Represents standard deviation inverted to a 0-100% score.
- **Variants**:
  - Consistent (score > 80%): tight band, SIA may reference this positively
  - Inconsistent (score < 50%): wide band, dots scattered, SIA coaching note likely addresses this
  - Weekend drift: weekend dots visually separate from weekday cluster -- naturally visible without extra annotation
  - Insufficient data (<5 days): "Log a few more nights to see your consistency pattern" in 13pt Regular, white at 40%, centered
- **Gestures**: tap individual dot for that night's bedtime/wake time tooltip

### Quality Trend Card
- **Purpose**: track sleep quality rating (1-5 scale) over time to identify patterns
- **Data source**: `sleep_logs.quality` over past 7-30 days
- **Visual treatment**: ink-brown-800 card with glassmorphism, r-xl (28pt), 24pt internal padding. Follows Line Chart pattern established in Screen 14.
- **Size**: full-width minus 32pt x ~160pt
- **Sub-elements**:
  - Eyebrow: "QUALITY TREND", 12pt Sora Semibold, #14B8A6, uppercase, +0.12em tracking
  - Chart area (~100pt height):
    - Y-axis: 1-5 scale, labels on left (12pt Sora Regular, white at 30%). Grid lines: 1pt, white at 3%, horizontal at each integer.
    - Line: 2pt solid, #14B8A6 (wellbeing-teal), with dot markers (6pt circles, #14B8A6 fill) at each data point
    - Fill area below line: #14B8A6 at 5% opacity
    - X-axis: day labels (12pt Regular, white at 30%)
  - Average line: 1pt dashed, white at 20%, horizontal at mean quality value. Label: "avg 3.8" in 11pt Sora Regular, white at 30%, right-aligned.
- **Variants**:
  - Populated: full line chart
  - Improving trend: SIA may reference this in coaching note
  - Declining trend: SIA may flag concern and suggest tips
  - Insufficient data (<3 days): "Rate your sleep quality each night to see trends" in 13pt Regular, white at 40%
- **Gestures**: tap data point for day detail tooltip (date + quality rating + any notes from that entry)

### Sleep Hygiene Tips Section
- **Purpose**: AI-personalized sleep improvement tips, collapsed by default to keep the screen scannable
- **Data source**: SIA-generated based on user's sleep patterns, behavioral data, and cross-domain analysis
- **Visual treatment**: Expandable/Collapsible Section pattern (established Screen 14). No card enclosure when collapsed -- row sits on ink-900.
- **Size**: full-width x 48pt collapsed, ~240pt expanded (variable based on tip count)
- **Sub-elements**:
  - Collapsed row:
    - Chevron: 14pt, white at 40%, rotates 0 to 90deg on expand
    - Title: "Sleep hygiene tips" -- 15pt Sora Semibold, white at 80%, 8pt right of chevron
    - Tip count badge: "5 tips" -- 12pt Sora Regular, white at 40%, right-aligned
  - Expanded content (ink-brown-800 card, r-md, 16pt padding, 8pt below header):
    - Tip rows: each tip is a single row with a teal dot (6pt, #14B8A6) + tip text (14pt Sora Regular, white at 70%, max 2 lines). 12pt gap between rows.
    - Example tips:
      - "Your late workouts correlate with lower sleep quality -- try finishing exercise by 7pm"
      - "Screen time after 10pm has increased this week -- consider a wind-down routine"
      - "Caffeine after 2pm may be affecting your sleep onset -- SIA noticed coffee logs in the afternoon"
      - "Your best sleep nights follow evening meditation sessions"
      - "Weekend sleep-ins disrupt your circadian rhythm -- aim for the same wake time daily"
    - "Ask SIA for more" link: 13pt Sora Semibold, #7F24FF at 60%, bottom of tip list. Taps navigate to SIA Chat [09] with sleep hygiene context.
- **Gestures**: tap header row to expand/collapse (280ms ease-out-soft). Tap "ask SIA" link to navigate to SIA Chat.

### Manual Sleep Log (Bottom Sheet Modal)
- **Purpose**: manually log a sleep session when no wearable data is available or to supplement auto-tracked data
- **Data source**: writes to `sleep_logs` table (sleep_date, bedtime, wake_time, duration_hours, quality, notes, tags)
- **Visual treatment**: bottom sheet modal, ~70% screen height, ink-900 bg, 20pt top corners, drag handle. Follows Modal Presentation pattern.
- **Size**: full-width x ~70% screen height
- **Sub-elements**:
  - Drag handle: 36pt wide x 4pt tall pill, white at 20%, centered, 8pt below modal top
  - Header row: "cancel" (left, 15pt Sora Regular, white at 50%) + "Log sleep" title (center, 17pt Sora Semibold, white) + "save" (right, 15pt Sora Semibold, #FF5E00, disabled until valid data entered)
  - Date selector: "Last night" default with date displayed (13pt Sora Regular, white at 50%). Tappable to change date. Chevron right.
  - Bedtime picker: label "bedtime" (12pt Regular, white at 40%) + time value (20pt Sora Semibold, white). Tapping opens native time picker with scroll wheels. Default: 11:00 PM.
  - Wake time picker: same treatment as bedtime. Default: 7:00 AM.
  - Duration display (calculated): "8h 0m" -- 13pt Sora Regular, white at 50%, auto-calculated from bedtime/wake time. Not editable.
  - Quality rating: "how did you sleep?" label (14pt Sora Regular, white at 60%) + 5 tappable stars (28pt each, 8pt gap). Empty: white at 15%. Filled: #FF5E00. Tap fills up to that star.
  - Tags row: horizontal scroll of tag chips. Available tags: "restless", "dreaming", "snoring", "light sleep", "deep sleep", "woke up refreshed", "woke up tired". Each tag: ink-brown-800 bg, 1pt white at 10% border, r-pill, 32pt height, 12pt horizontal padding. Selected: #14B8A6 at 15% bg, #14B8A6 text, 1pt #14B8A6 at 30% border. Text: 13pt Sora Semibold. Multiple selection allowed.
  - Notes input: text area, 80pt height (grows to 120pt max). Placeholder: "anything else to note?" in white at 30%. Standard Text Input Field styling (ink-brown-800 bg, r-md, 2pt orange border on focus).
  - "Save" CTA button: full-width minus 48pt, 56pt height, Burnt Orange (#FF5E00), white text 17pt Sora Semibold, r-pill. Disabled (40% opacity) until bedtime and wake time are set. Brand CTA Button pattern.
- **Gestures**: drag handle to dismiss, tap cancel to dismiss, tap save to log entry

### Wearable Sync Badge
- **Purpose**: indicate that sleep data was auto-tracked from a connected wearable device
- **Data source**: `daily_health_metrics.provider` field
- **Visual treatment**: inline badge, no standalone card -- lives within Last Night Summary Card
- **Size**: auto-width x 24pt
- **Sub-elements**:
  - Provider icon: 12pt, white at 60%
  - Text: "Synced from WHOOP" or "Synced from Oura" -- 11pt Sora Semibold, white at 50%
  - Background: ink-900, r-pill, 8pt horizontal / 4pt vertical padding
- **Variants**:
  - Connected + synced: badge visible with provider name
  - Connected + syncing: "Syncing..." with inline spinner (12pt, white at 50%)
  - Not connected: badge replaced with "Connect a wearable" text link (13pt Sora Regular, #FF5E00) + right chevron. Taps navigate to Connected Services [22].

### FAB (Log Sleep)
- **Purpose**: quick access to manual sleep logging
- **Data source**: N/A (navigational)
- **Visual treatment**: Extended Pill FAB variant. ink-brown-800 with glassmorphism, --shadow-2. Follows FAB pattern from Screen 26.
- **Size**: 48pt height x auto-width (24pt horizontal padding)
- **Sub-elements**:
  - Icon: "+" in 16pt, white
  - Label: "Log sleep" in 15pt Sora Semibold, white
  - 8pt gap between icon and label
- **Gestures**: tap opens Manual Sleep Log bottom sheet modal
- **Scroll behavior**: fades out on scroll down (opacity 0 + translateY +20pt, 160ms). Fades back in on scroll up or scroll stop.

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | 60/30/10 base |
| Card surfaces | #211008 | ink-brown-800 | glassmorphism with 1pt white 6% border |
| Domain accent line | #14B8A6 | wellbeing-teal | domain color, header only |
| Domain eyebrow text | #14B8A6 | wellbeing-teal | "LAST NIGHT", "SLEEP TREND", etc. |
| RPG badge text + bg | #14B8A6 at 100% / 15% | wellbeing-teal | domain color on badge |
| Hero hours number | #FFFFFF | white | 36pt, screen's visual anchor |
| Quality stars (filled) | #FF5E00 | burnt-orange | 60% primary -- star rating |
| Quality stars (empty) | white at 15% | -- | unfilled stars |
| Bar chart fills (at target) | #14B8A6 at 80% | wellbeing-teal | bars meeting sleep target |
| Bar chart fills (below target) | #14B8A6 at 40% | wellbeing-teal | bars below target |
| Target line | #FF5E00 | burnt-orange | dashed target reference |
| Quality trend line | #14B8A6 | wellbeing-teal | line chart stroke |
| Quality trend fill | #14B8A6 at 5% | wellbeing-teal | area below line |
| Consistency dots | #14B8A6 | wellbeing-teal | bedtime/wake scatter dots |
| Consistency band | #14B8A6 at 15% | wellbeing-teal | time range band fill |
| Recovery good indicator | #34A853 | forest-green | recovery > 70% |
| Recovery moderate | #F59E0B | amber | recovery 40-70% |
| Recovery low indicator | #EF4444 | error-red | recovery < 40% |
| SIA purple dot | #7F24FF | royal-purple | 10% accent -- AI indicator |
| "Save" / "Log sleep" CTA | #FF5E00 | burnt-orange | 60% primary -- main CTA |
| Tag chip selected bg | #14B8A6 at 15% | wellbeing-teal | selected tag state |
| Tag chip selected text | #14B8A6 | wellbeing-teal | selected tag label |
| Tag chip default bg | #211008 | ink-brown-800 | unselected tag |
| Wearable connect link | #FF5E00 | burnt-orange | interactive text |
| "Ask SIA" link | #7F24FF at 60% | royal-purple | SIA navigation |
| Primary text | #FFFFFF at 100% | white | headings, hero values |
| Secondary text | #FFFFFF at 70% | white-70 | body text |
| Tertiary text | #FFFFFF at 50% | white-50 | labels, captions |
| Quaternary text | #FFFFFF at 40% | white-40 | axis labels, hints |
| FAB background | #211008 | ink-brown-800 | glassmorphism |
| FAB text | #FFFFFF | white | label |

**60/30/10 verification**: orange dominates interactive elements (quality stars, CTA buttons, target line, wearable link, segmented control active state). Green appears only in recovery good-state indicator. Purple limited to single SIA dot and "ask SIA" link. Domain teal (#14B8A6) confined to eyebrow labels, accent line, RPG badge, chart data fills, and consistency dots -- never on CTAs or UI chrome. All interactive actions remain orange. Ratio holds.

---

## Interaction States

### Quality Star Rating
| State | Visual | Haptic |
|-------|--------|--------|
| Default (empty) | 20pt star outline, white at 15% fill | -- |
| Pressed | scale(0.90), star brightens | light impact |
| Filled | #FF5E00 fill, white stroke | light impact per star |
| Focus-visible | 2pt orange ring around star row | -- |

### "Save" CTA Button (Modal)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Burnt Orange (#FF5E00) fill, white text, r-pill | -- |
| Pressed | darker orange (#E05400) + scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Disabled | 0.4 opacity, no touch response | -- |
| Loading | white spinner replaces text, orange bg | -- |
| Success | brief green glow (600ms) as modal dismisses | success notification |

### SIA Coaching Note Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 card, purple dot, white text | -- |
| Pressed | scale(0.97), background darkens to #1a0c06 | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Loading | skeleton shimmer on text area | -- |
| Error | "Could not load SIA note" placeholder text | -- |

### Segmented Control (Sleep Trend)
| State | Visual | Haptic |
|-------|--------|--------|
| Default (inactive) | Transparent bg, white 50% text | -- |
| Pressed | White 5% bg flash | light impact |
| Active | Orange (#FF5E00) fill slides in, white text | medium impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Tag Chip (Manual Log)
| State | Visual | Haptic |
|-------|--------|--------|
| Default (unselected) | ink-brown-800 bg, white at 10% border, white at 60% text | -- |
| Pressed | scale(0.95), bg darkens | light impact |
| Selected | #14B8A6 at 15% bg, #14B8A6 text, #14B8A6 at 30% border | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Bar Chart Bar
| State | Visual | Haptic |
|-------|--------|--------|
| Default | teal fill at graduated opacity | -- |
| Pressed | scale(1.05) vertically, tooltip appears above | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Expandable Section (Sleep Hygiene Tips)
| State | Visual | Haptic |
|-------|--------|--------|
| Default (collapsed) | chevron at 0deg, title visible | -- |
| Pressed | row bg brightens to white at 3% | light impact |
| Expanded | chevron rotates to 90deg, content slides down | -- |

### FAB (Log Sleep)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 glassmorphism, white text, --shadow-2 | -- |
| Pressed | scale(0.95), background darkens | medium impact |
| Focus-visible | 2pt orange ring, offset 4pt | -- |

### RPG Skill Badge
| State | Visual | Haptic |
|-------|--------|--------|
| Default | teal text, 15% opacity pill bg | -- |
| Pressed | scale(0.95), bg opacity increases to 25% | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Swipe right from edge | Screen | back navigation (iOS native) |
| Pull down | ScrollView | refresh all sleep data (last night, trends, wearable sync) |
| Tap | SIA note card | tab switch to SIA Chat [09] with sleep context |
| Tap | Segmented control | switch trend period (7d/14d/30d) |
| Tap | Bar chart bar | show day detail tooltip |
| Tap | Quality trend dot | show day detail tooltip |
| Tap | Consistency dot | show that night's bedtime/wake tooltip |
| Tap | RPG badge | stack push to RPG Character [19] |
| Tap | FAB | open Manual Sleep Log bottom sheet |
| Tap | "Connect a wearable" link | stack push to Connected Services [22] |
| Tap | Sleep hygiene tips header | expand/collapse section |
| Tap | "Ask SIA for more" link | tab switch to SIA Chat [09] with sleep hygiene context |
| Tap | "Log now" link (empty state) | open Manual Sleep Log bottom sheet |
| Tap | Back button | pop stack |
| Drag down | Modal handle | dismiss sleep log modal |

**Haptic feedback points**:
- CTA button press: light impact
- FAB press: medium impact
- Star rating tap: light impact per star
- Tag chip toggle: light impact
- Segmented control change: medium impact
- Pull-to-refresh release: medium impact
- RPG badge press: light impact
- Section expand/collapse: light impact

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| SIA note card | Screen mount | fade-in + translateY(12 to 0) | 280ms | ease-out-soft |
| Last Night Summary card | Screen mount | fade-in + translateY(12 to 0) | 280ms | ease-out-soft |
| Sleep Trend card | Screen mount | fade-in + translateY(12 to 0) | 280ms | ease-out-soft |
| Consistency card | Screen mount | fade-in + translateY(12 to 0) | 280ms | ease-out-soft |
| Quality Trend card | Screen mount | fade-in + translateY(12 to 0) | 280ms | ease-out-soft |
| All content entry | Screen mount | staggered: 80ms between elements | 280ms each | ease-out-soft |
| Hero hours number | Mount | count-up from 0.0 to final value | 520ms | ease-flow |
| Quality stars | Mount | sequential fill: 80ms stagger per star, scale 0.5 to 1.0 | 160ms each | ease-out-soft |
| Bar chart bars | Scroll into view | height grows from 0 to final, 40ms stagger per bar (left to right) | 280ms each | ease-out-soft |
| Target line | After bars complete | opacity 0 to 1, draws left to right | 280ms | ease-out-soft |
| Quality trend line | Scroll into view | line draws left to right (stroke-dashoffset) | 520ms | ease-flow |
| Consistency dots | Scroll into view | scale-in from 0.5, 30ms stagger per dot | 160ms each | ease-out-soft |
| Segmented control | Tap segment | active indicator slides horizontally | 280ms | ease-out-soft |
| Chart view switch | Segment change | content crossfade | 280ms | ease-out-soft |
| Sleep hygiene expand | Tap header | content height 0 to auto + fade-in | 280ms | ease-out-soft |
| Sleep hygiene collapse | Tap header | content height auto to 0 + fade-out | 280ms | ease-out-soft |
| FAB | Mount | scale(0.8 to 1) + opacity(0 to 1), 400ms delay | 280ms | ease-out-soft |
| FAB | Scroll down | fade out + translateY(+20pt) | 160ms | ease-out-soft |
| FAB | Scroll up/stop | fade in + translateY(0) | 160ms | ease-out-soft |
| Modal (Log sleep) | Open | slide up from bottom + backdrop fade in | 520ms | ease-flow |
| Modal (Log sleep) | Dismiss | slide down + backdrop fade out | 280ms | ease-out-soft |
| Star fill (modal) | Tap star | scale(0.8 to 1.2 to 1.0) + orange fill fade-in | 160ms | ease-out-soft |
| Tag chip select | Tap | bg color crossfade + border color crossfade | 160ms | ease-out-soft |
| Save success | Tap save | button green glow (600ms), modal slides down | 280ms | ease-out-soft |
| Pull-to-refresh | Pull release | standard iOS refresh indicator | system | system |
| Recovery dot | Mount | scale(0 to 1) + color fade-in | 280ms | ease-out-soft |

**Screen transition**:
- **Enter**: stack push slide-in from right (280ms, ease-out-soft)
- **Exit**: stack pop slide-out to right (280ms, ease-out-soft)

---

## Empty States

### Day 1 (new user)
- SIA note: "Start tracking your sleep to unlock patterns SIA can coach you on."
- Last Night Summary: "No sleep logged yet" in 15pt Sora Regular, white at 50%, centered within card. "Log your first night" text link in Burnt Orange. Card maintains visual weight (r-xl, 24pt padding) with centered content.
- Sleep Trend Chart: empty chart area with faint grid lines (white at 3%). "Log a few nights to see your trend" in 13pt Regular, white at 40%, centered. Target line visible as a reference. Segmented control interactive but all periods show the same empty state.
- Bedtime Consistency: "More data needed" in 13pt Regular, white at 40%, centered. Empty band visualization (white at 5% fill).
- Quality Trend: empty chart with faint grid. "Rate your sleep quality to see this chart" in 13pt Regular, white at 40%.
- Sleep Hygiene Tips: section present but contains 2-3 generic starter tips (not personalized yet): "Keep a consistent bedtime", "Avoid screens 30 minutes before bed", "Keep your bedroom cool and dark".
- Wearable badge: "Connect a wearable for automatic tracking" text link in Burnt Orange with right chevron, navigates to Connected Services [22].
- FAB remains visible and functional -- primary way to begin.

### Established user (last night logged, full data)
- All components populated as designed.
- SIA coaching note references specific patterns.
- Sleep Hygiene Tips personalized to user's actual behavior.

### Established user (missed last night)
- Last Night Summary: "No data for last night" in 15pt Regular, white at 50%. "Log now" link in Burnt Orange. Previous night's data available via date selector in the log modal.
- Trend charts: gap in the data rendered as missing bar / missing dot (no interpolation). Gap is visible but not alarming.
- SIA note may reference the gap: "Missed a night? Log it from memory or let it go -- one night does not break a streak."

---

## Motivation Adaptation

- **Low motivation**: SIA note is short and warm ("You slept. That matters."). Only Last Night Summary card and FAB shown. Trend charts hidden. Sleep Hygiene Tips hidden. Fewer data points reduce overwhelm. Goal: one-viewport experience with the sleep log FAB as the sole call to action.
- **Medium motivation**: default experience as designed above. All sections visible. SIA provides pattern-based coaching. Tips collapsed by default. Full trend charts with segmented controls.
- **High motivation**: additional data surfaces below Quality Trend: sleep stage breakdown (if wearable provides it), correlation insights ("your sleep quality is 23% higher on days you exercise"), week-over-week comparison sparklines, sleep debt calculator ("you are 2.3hrs behind this week"). Sleep Hygiene Tips auto-expanded. SIA coaching note is longer and more data-specific with cross-domain references.

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Header title | Sora | Semibold 600 | 20pt | 28pt | #FFFFFF |
| RPG skill badge | Sora | Semibold 600 | 13pt | 18pt | #14B8A6 |
| Section eyebrow | Sora | Semibold 600 | 12pt | 16pt | #14B8A6 |
| SIA coaching message | Sora | Regular 400 | 15pt | 22pt | #FFFFFF |
| Hero hours slept | Sora | Bold 700 | 36pt | 44pt | #FFFFFF |
| Bedtime/wake label | Sora | Regular 400 | 12pt | 16pt | #FFFFFF at 40% |
| Bedtime/wake value | Sora | Semibold 600 | 16pt | 22pt | #FFFFFF |
| Recovery label | Sora | Regular 400 | 12pt | 16pt | #FFFFFF at 40% |
| Recovery score | Sora | Semibold 600 | 20pt | 28pt | #FFFFFF |
| Wearable sync badge | Sora | Semibold 600 | 11pt | 16pt | #FFFFFF at 50% |
| Chart bar target label | Sora | Regular 400 | 11pt | 16pt | #FF5E00 |
| Chart X-axis labels | Sora | Regular 400 | 11pt | 16pt | #FFFFFF at 30% |
| Chart stats average | Sora | Regular 400 | 13pt | 18pt | #FFFFFF at 50% |
| Chart stats goal | Sora | Regular 400 | 13pt | 18pt | #FF5E00 |
| Consistency range label | Sora | Regular 400 | 13pt | 18pt | #FFFFFF at 50% |
| Consistency score | Sora | Semibold 600 | 16pt | 22pt | #FFFFFF |
| Quality Y-axis labels | Sora | Regular 400 | 12pt | 16pt | #FFFFFF at 30% |
| Quality average label | Sora | Regular 400 | 11pt | 16pt | #FFFFFF at 30% |
| Tips section title | Sora | Semibold 600 | 15pt | 20pt | #FFFFFF at 80% |
| Tip count badge | Sora | Regular 400 | 12pt | 16pt | #FFFFFF at 40% |
| Tip body text | Sora | Regular 400 | 14pt | 20pt | #FFFFFF at 70% |
| "Ask SIA" link (tips) | Sora | Semibold 600 | 13pt | 18pt | #7F24FF at 60% |
| Modal cancel | Sora | Regular 400 | 15pt | 20pt | #FFFFFF at 50% |
| Modal title | Sora | Semibold 600 | 17pt | 24pt | #FFFFFF |
| Modal save | Sora | Semibold 600 | 15pt | 20pt | #FF5E00 |
| Bedtime/wake picker value | Sora | Semibold 600 | 20pt | 28pt | #FFFFFF |
| Duration display | Sora | Regular 400 | 13pt | 18pt | #FFFFFF at 50% |
| Quality prompt label | Sora | Regular 400 | 14pt | 20pt | #FFFFFF at 60% |
| Tag chip text | Sora | Semibold 600 | 13pt | 18pt | per state color |
| Notes placeholder | Sora | Regular 400 | 15pt | 20pt | #FFFFFF at 30% |
| Save CTA text | Sora | Semibold 600 | 17pt | 24pt | #FFFFFF |
| FAB label | Sora | Semibold 600 | 15pt | 20pt | #FFFFFF |
| "No data" empty text | Sora | Regular 400 | 15pt | 20pt | #FFFFFF at 50% |
| Wearable connect link | Sora | Regular 400 | 13pt | 18pt | #FF5E00 |

---

## Accessibility

- **Contrast**: all text meets WCAG 2.1 AA contrast ratios on ink-900 background. White at 100% (primary text) on #0A0A0F exceeds 18.5:1. White at 40% (quaternary) on #0A0A0F achieves ~5.7:1 for large text.
- **Screen reader**: hero hours number reads as "7 point 2 hours slept last night". Quality stars read as "sleep quality: 4 out of 5 stars". Chart sections announce summary data ("sleep trend: average 7 point 1 hours over 7 days, target 7 point 5 hours") rather than attempting to describe visual chart shape.
- **Touch targets**: all interactive elements meet 44x44pt minimum. Star rating stars have 28pt visual size with 44pt touch targets (overlapping hitboxes with priority to nearest star). Tag chips have 32pt visual height with 44pt touch targets.
- **Dynamic type**: hero hours number, labels, and body text scale with system font size preferences. Charts maintain fixed dimensions but axis labels scale.
- **Reduced motion**: when system prefers reduced motion, all chart draw animations are replaced with instant opacity fade-in (280ms). Staggered entry becomes simultaneous fade-in. Star fill animation becomes instant color change.
- **Color independence**: chart bars convey information through height, not color alone. Recovery status is indicated by both color dot and numerical value. Quality rating uses both star count and accessible label.

---

## Data Dependencies

| Component | API Endpoint / Table | Required Fields | Fallback |
|-----------|---------------------|-----------------|----------|
| Last Night Summary | `sleep_logs` (latest by sleep_date) | sleep_date, bedtime, wake_time, duration_hours, quality | "No data" empty state with log prompt |
| Recovery Score | `daily_health_metrics` | sleep_hours, recovery_score, provider | Hidden if no wearable connected |
| Sleep Trend Chart | `sleep_logs` (aggregated over period) | sleep_date, duration_hours | Empty chart with "log more nights" message |
| Bedtime Consistency | `sleep_logs` (past 14 days) | bedtime, wake_time | "More data needed" if < 5 entries |
| Quality Trend | `sleep_logs` (past 7-30 days) | sleep_date, quality | "Rate your quality" prompt if no ratings |
| SIA Coaching Note | SIA engine (AI-generated) | User's sleep_logs + daily_health_metrics + cross-domain context | Static fallback: "Log your sleep to unlock personalized insights." |
| Sleep Hygiene Tips | SIA engine (AI-generated) | User behavior patterns | Generic starter tips (hardcoded) |
| Wearable Sync Badge | `daily_health_metrics.provider` | provider field | "Connect a wearable" prompt |
| Manual Sleep Log (write) | `sleep_logs` (INSERT) | sleep_date, bedtime, wake_time, duration_hours, quality, notes, tags | N/A (user input) |
| RPG Skill Badge | User RPG profile | wellbeing skill level | "Lv.1" default |

---

## Error Handling

| Scenario | User-Facing Behavior |
|----------|---------------------|
| Network failure on load | Cached data displayed (if available) with subtle "offline" indicator (12pt, white at 30%, top of scroll area). Pull-to-refresh available. If no cached data: full empty state with "Could not load sleep data. Check your connection." + "retry" text link in Burnt Orange. |
| Wearable sync failure | Last Night Summary shows manual data (if available) or "Sync failed" text replacing badge. "Retry sync" text link in Burnt Orange. Does not block the rest of the screen. |
| Save sleep log failure | "Save" button returns to default state (orange fill, "save" text). Error toast slides down from top: "Could not save. Try again." in 15pt Regular, white, on ink-brown-800 bg with 3pt #F44336 left border. Auto-dismisses after 4 seconds. Form data preserved. |
| SIA coaching note failure | Card shows static fallback: "Log your sleep to unlock personalized insights." No error indicator -- fails silently to a useful default. |
| Partial data (some fields null) | Components render available data and hide fields with null values. Duration auto-calculated from bedtime/wake if present. Quality shown as empty stars if unrated. |

---

## Cross-References

- **Navigates to**: SIA Chat [09] via SIA note tap or "ask SIA" link (tab switch), Connected Services [22] via wearable connect prompt (stack push), RPG Character [19] via RPG badge tap (stack push), Manual Sleep Log (modal presentation from FAB or "log now" links)
- **Navigates from**: Explore [18] via "Sleep" card (stack push), Home Screen [12] via sleep action card (stack push), SIA Chat [09] via deep-link ("let's look at your sleep"), Wellbeing Dashboard via sleep section tap (stack push)
- **Shared components with**: Screen 26 (Domain Dashboard Header, SIA Coaching Note Card, FAB pattern, Segmented Control), Screen 38 (Calendar Heatmap concept adapted to scatter/band visualization), Screen 14 (Line Chart pattern for quality trend, Expandable Section), Screen 22 (Wearable Integration Badge)
- **Patterns used**: Domain Dashboard Header (Screen 26), SIA Coaching Note Card -- Compact Variant (Screen 26), Segmented Control (Screen 15/38), Expandable/Collapsible Section (Screen 14), Line Chart (Screen 14), Section Eyebrow Label (Screen 12), Brand CTA Button (Screen 02), Text Input Field (Screen 03), FAB Extended Pill (Screen 26), Modal Presentation (Screen 15), Back Button (Screen 04), 8-State Interaction Model, Content Entry Animation (staggered fade-in), Pull-to-Refresh (Screen 12)
- **Patterns established**: Last Night Summary Card (hero sleep data with hours, stars, bedtime/wake, recovery), Sleep Trend Bar Chart (duration bars with target line and period selector), Bedtime Consistency Visualization (time-range bands with scatter dots), Quality Star Rating (5-star tappable rating with orange fill), Sleep Tag Chip (multi-select domain-colored tag for sleep characteristics), Wearable Sync Badge (inline provider attribution badge)
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-15.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U08`
**Prototype route**: `/features/sleep`
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
| B15-F13 | critical | retention | Wire Log sleep, period state, chart detail tooltips, validation, saved states, and empty/offline fallbacks. |
| B15-F14 | major | accessibility | Use 44px tab hit areas, semantic tips disclosure, accessible chart summaries/data tables, and focusable day-detail controls. |
| B15-F15 | minor | design-system-consistency | Use `sleep-indigo` as the canonical sleep accent and align the spec, domain registry, and implementation; wellbeing teal remains for broader wellbeing/stress surfaces. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

