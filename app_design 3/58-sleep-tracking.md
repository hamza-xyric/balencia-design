# Screen Design: Sleep Tracking

**Screen**: 58 of 73
**File**: 58-sleep-tracking.md
**Register**: Wellbeing Mode — sleep-indigo #818CF8 (`--color-domain-sleep`). *(Sleep accent resolved to canonical sleep-indigo per Audit Feedback Integration Q49 / B15-F15; wellbeing-teal is retired from this screen and remains only for broader wellbeing/stress surfaces. The `## Visualization` section is authoritative on colour.)*
**Primary action**: log and analyze sleep patterns
**Tab**: Wellbeing domain or Home → stack push
**Navigation**: Stack depth 2-3 from Me tab root (Me Main → Explore → Sleep Tracking), or stack push from Home Screen [12] via sleep-related action card. Entry from Explore [18] grid card, SIA deep-link [09] ("let's look at your sleep"), Home Screen [12] sleep insight card, or Wellbeing Dashboard via "sleep" section tap. Exit via back button to previous screen, or forward to SIA Chat [09].

---

## Purpose

This screen is the user's sleep command center -- a comprehensive view of sleep patterns, quality trends, and AI-driven coaching to improve rest. It answers "how well am I sleeping and what can I do better?" The screen surfaces last night's sleep data front and center, then reveals longer-term patterns through trend charts and consistency visualizations. Manual logging is always available for users without wearables, while WHOOP/Oura integration auto-populates data with a visible sync badge. SIA analyzes patterns across sleep and other life domains (workout intensity, stress, nutrition) to deliver genuinely useful coaching -- not generic tips. Sleep data feeds into the RPG system: consistent quality sleep earns XP and maintains streaks. Free tier includes manual sleep logging and basic last-night summary; SIA trend analysis requires Plus, and cross-domain sleep correlations require Pro.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Domain Dashboard Header -- "Sleep" title with sleep-indigo accent line and RPG skill badge
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
│     │ (sleep-indigo accent line)      │  FIXED, sticky on scroll
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
   - Content: back chevron (left), "Sleep" title with 2pt sleep-indigo (#818CF8) accent line underneath, "Lv.8" RPG badge (right)
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
  - Domain accent line: 2pt height, #818CF8 (sleep-indigo), extends from title left edge to ~60% of available width, 4pt below title text baseline
  - RPG skill badge: "Lv.8", 13pt Sora Semibold, #818CF8 text, background #818CF8 at 15% opacity, r-pill shape, 8pt horizontal / 4pt vertical padding, right-aligned 16pt from right edge
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
  - Eyebrow: "LAST NIGHT", 12pt Sora Semibold, #818CF8 (sleep-indigo), uppercase, +0.12em tracking
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
  - Eyebrow: "SLEEP TREND", 12pt Sora Semibold, #818CF8, uppercase, +0.12em tracking
  - Segmented control (right of eyebrow): 3-segment, "7d" / "14d" / "30d". Standard Segmented Control pattern: 36pt height, ink-brown-800 container, r-pill. Active: #FF5E00 fill, white text. Inactive: transparent, white at 50%.
  - Living Line trend area (~120pt height) — see `## Visualization` S58-V05 (`TrendChart`, VK-016):
    - Actual: one continuous, curved, round-capped 2px stroke that draws itself, running `--grad-progress` orange (effort) → green (arrival at/above target); green milestone dots (r=3px) on target-hit nights; `--grad-orange` area fade (≤25% top) beneath
    - Projection: dashed-purple #7F24FF 2px tail (SIA forecast, §11)
    - Target line: data-derived horizontal reference at the real target value, 1pt dashed `--color-alpha-white-25` (not a faked fixed position). Label: "7.5h" in 11pt Sora Regular, white at 40%, right-aligned
    - Scale: zero baseline + shared y-scale across 7/14/30 (honest comparison)
    - X-axis labels: day abbreviations (7d) or date numbers (14d/30d), 11pt Sora Regular, white at 30%
    - Y-axis: implicit (bars scale relative to max), no visible axis labels to keep clean
  - Stats row (below chart, 8pt gap):
    - "avg: 7.1 hrs" -- 13pt Sora Regular, white at 50%, left-aligned
    - "goal: 7.5 hrs" -- 13pt Sora Regular, #FF5E00, right-aligned
- **Variants**:
  - Populated: full Living Line as described (curved orange→green stroke, milestone dots, dashed-purple projection)
  - Partial data (<7 days): draw the line through available nights; un-synced nights are ghosted/dashed (no-data ≠ zero), never plotted as a real 0
  - Day 1: single bar for today (if logged). "Keep logging to see your trend" in 13pt Regular, white at 40%, centered below chart area.
  - Loading: skeleton shimmer on chart area
- **Gestures**: tap segmented control to switch period; tap/scrub a point on the Living Line for that night's detail tooltip (date + exact hours + quality rating)

### Bedtime Consistency Card
- **Purpose**: visualize how consistent the user's bedtime and wake time are across days -- consistency is a key sleep hygiene metric
- **Data source**: `sleep_logs.bedtime` and `sleep_logs.wake_time` over the past 14 days
- **Visual treatment**: ink-brown-800 card with glassmorphism, r-xl (28pt), 24pt internal padding
- **Size**: full-width minus 32pt x ~160pt
- **Sub-elements**:
  - Eyebrow: "BEDTIME CONSISTENCY", 12pt Sora Semibold, #818CF8, uppercase, +0.12em tracking
  - Bedtime band:
    - Label: "bedtime range: 10:45p - 11:30p" -- 13pt Sora Regular, white at 50%
    - Visualization: a 2-D `ConsistencyCloud` (`ScatterPlot`, VK-011 — minted here; see `## Visualization` S58-V03). x = night index (last 14 nights), y = clock-time. Each night = one 6pt sleep-indigo #818CF8 dot. A larger orange median anchor (`--glow-orange-sm`) marks the cluster center; a faint ±1σ spread band (sleep-indigo at 15% over `--track-inset`) makes tightness literally visible. Cluster tightness = the consistency signal; outliers/weekend drift fall outside the band and are self-evident.
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
  - Eyebrow: "QUALITY TREND", 12pt Sora Semibold, #818CF8, uppercase, +0.12em tracking
  - Chart area (~100pt height):
    - Y-axis: 1-5 scale, labels on left (12pt Sora Regular, white at 30%). Grid lines: 1pt, white at 3%, horizontal at each integer.
    - Line: a second, smaller Living Line (same primitive as the duration trend) — 2pt curved, round-capped, drawing itself, `--grad-progress` orange→green, with green milestone dots at high-quality nights
    - Fill area below line: `--grad-orange` vertical fade, ≤25% top
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
    - Tip rows: each tip is a single row with a sleep-indigo dot (6pt, #818CF8) + tip text (14pt Sora Regular, white at 70%, max 2 lines). 12pt gap between rows.
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
  - Tags row: horizontal scroll of tag chips. Available tags: "restless", "dreaming", "snoring", "light sleep", "deep sleep", "woke up refreshed", "woke up tired". Each tag: ink-brown-800 bg, 1pt white at 10% border, r-pill, 32pt height, 12pt horizontal padding. Selected: #818CF8 at 15% bg, #818CF8 text, 1pt #818CF8 at 30% border. Text: 13pt Sora Semibold. Multiple selection allowed.
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

## Visualization

> Source: `app_design 3/58-sleep-tracking-visualization-recommendations.md`. Audited in `viz-audit/` — Batch 3, findings `S58-V01..V07`. All primitives are from `viz-audit/VIZ-KIT.md` at `viz-audit/CONSISTENCY.md` parameters. This screen **mints `VK-011` ScatterPlot / ConsistencyCloud** (the consistency primitive Sleep + Energy share). Premium-depth, on-brand (60/30/10); no new metrics — every visual derives from data the screen already shows. **Current grade D (54) → specced-target A− (86).** *(Honest re-grade under the revised 10-dimension rubric; benchmark = Oura + WHOOP. The residual gap to A+++ is build-verified depth + working drill/scrub micro-interactions, owned by the later viz-build program.)*

Sleep is a **Domain-Dashboard / Tracker** in the Recovery/Sleep cluster. This section upgrades *how its data reads* — from a bare hero number + flat teal bars + a faked 1-D dot band into a calm, warm Oura-grade dashboard: a focal sleep-score **GaugeRing**, a true-whole stage **Donut**, a real bedtime **ConsistencyCloud** (tightness = the signal), a 30-night **CalendarHeatmap**, and the duration trend as the **Living Line** with a dashed-purple SIA forecast — never shaming, always coaching.

> **Sleep-accent reconciliation (S58-V07):** the Register line and Color Map below say *wellbeing-teal*, but this screen's own Audit Feedback Integration (B15-F15 / Q49) resolves the canonical sleep accent to **`sleep-indigo` `#818CF8`** (the registered `--color-domain-sleep`), and the prototype route already renders sleep-indigo. **This Visualization section treats `sleep-indigo #818CF8` as the screen's domain-identity colour**; "domain" below always means sleep-indigo. Teal is retired from this screen. The spec's Color Map + Register should be reconciled in the same pass (S58-V07).

### Visualized-vs-text map

| Datum (already shown) | Today | Specced visual | Primitive |
|---|---|---|---|
| Sleep score / hours + recovery | bare 36pt number + green % text | **sleep-score `GaugeRing` (96px) + recovery `GaugeRing` (48px)** | `GaugeRing` |
| Sleep stages (light/deep/REM) | not shown (high-motivation only) | **stage `Donut`, true whole** | `Donut` (VK-007) |
| Bedtime / wake consistency | hand-placed `left:%` dots on a 1-D band | **2-D `ConsistencyCloud`, tightness = the signal** | `ScatterPlot` (VK-011, **minted here**) |
| 30-night duration adherence | not shown as a grid | **`CalendarHeatmap`** (missing night ≠ a 0) | `CalendarHeatmap` (deployed) |
| Sleep duration over 7/14/30d | teal `<div>` bars + purple glow (violation) | **`TrendChart` = the Living Line** (orange→green, dashed-purple SIA projection) | `TrendChart` (VK-006 + VK-016) |
| Sleep quality 1–5 over time | straight-segment flat `<polyline>` | **second small Living Line** (same family) | `TrendChart` / `Sparkline` (VK-016) |
| SIA coaching note | text | — (deliberately textual, SIA voice) | — |
| Bedtime/wake times, tags, notes, date | text | — (deliberately textual) | — |

### 1 · Last Night hero — `S58-V01`

The Last Night card gains a focal **`GaugeRing` (96px)** as its left anchor encoding the **sleep score** (the composite the data already implies via quality + duration + recovery), with hours as the readout, and **recovery as a 48px `GaugeRing`** to its right (replacing the bare green percentage).
- **Depth (token-backed):** arc-following stroke = `--grad-orange` **(mint)** via a **conic-gradient behind a circular mask** (an SVG `linearGradient` cannot sweep along an arc — conic is required); 8px (`--stroke-bold`) on the 96px hero, 4px (`--stroke-base`) on the 48px recovery ring; track `--color-alpha-white-10` over `--track-inset` **(mint)** for a beveled recess; glow `--glow-orange` (32px) on the 96px hero, `--glow-orange-md` (~20px, **mint**) on the 48px ring — **never** the full 32px on a 48px ring. Green at in-range.
  > *Component reality:* `ProgressRing.tsx` is **locked to `36 | 48 | 96`, flat 2-tone, single-tone arc, no glow/inset/domain-mode** — the hero needs the `GaugeRing` upgrade (VK-002 + VK-017).
- **Non-shaming + a11y:** recovery band colour (green > 70% / amber 40–70% / red < 40%) is **paired with a visible word** ("recovering" / "building" / "low") — never colour-alone — and the low band is framed constructively in the SIA read.
- **Micro-interaction:** tap the hero ring → expand the card to the full metric breakdown (stages, HRV); tap recovery → recovery detail.
- **Motion:** hero ring fills first (`ring-animate`, 520ms `--ease-flow`), score counts up 520ms, recovery ring fills after.
- **Data:** `sleep_logs` + `daily_health_metrics.recovery_score` → `sleepTracking.lastNight`.
- **States:** no data → "no sleep logged" with a faint empty ring + "log now" (not a fake 0 ring); manual entry → score from quality+duration, recovery ring hidden; loading → ghost ring fills into value.

### 2 · Sleep-stage Donut — `S58-V02`

A **`Donut` (VK-007)** of **light / deep / REM** summing to a **true whole** (total time asleep), in/under the Last Night card.
- **Encoding (honest):** arcs sum to total asleep; **primary/largest slice = orange `#FF5E00`**; the other two = **sleep-indigo `#818CF8`** + a desaturated indigo tint (identity family, **never purple** — SIA-only); 2px gap, rounded caps, consistent inner-radius; center label = total asleep (`text-h2`).
- **a11y:** a **visible legend row** (dot + label + value + %) per slice — never colour-alone; `aria-label` reads "light 3h 50m, deep 1h 20m, REM 2h 05m, total 7h 15m."
- **States:** **manual-entry / no wearable → donut hidden** (stages are wearable-only), replaced by the hours readout — *not* a fake zero donut; loading → ghost ring fills into arcs.
- **Data:** `daily_health_metrics` stage fields when `provider` present (`stages: {light, deep, rem}` to add in `mock.ts`).

### 3 · Bedtime ConsistencyCloud — `S58-V03` · **mints `VK-011`**

The spec's "tight clustering = good consistency, outliers stand out" is exactly a scatter cloud. Mint **`VK-011` ScatterPlot / ConsistencyCloud** and consume it here (Energy [63] is the second consumer). Replaces the prototype's hand-placed 1-D `left:%` dots.
- **Encoding:** **x = night index** (last 14 nights), **y = clock-time** (bedtime field + wake field); each dot = one night (**sleep-indigo `#818CF8`**). A **median anchor** (larger dot, `--glow-orange-sm` **mint**) marks the cluster center; a faint **±1σ spread band** (`--color-domain-sleep` at 15% over `--track-inset`) makes tightness literally visible. **Cluster tightness = the consistency signal:** score = `100 − normalized(σ)`, shown as a number **plus a visible word** ("tight" / "variable") — never colour-alone. Weekend drift falls outside the band and is self-evident.
- **Brand:** dots = sleep-indigo (identity); anchor + score figure carry warm orange accents (60/30/10 honored); **no purple** (not SIA).
- **a11y / honesty:** text-equivalent "bedtime clusters around 11:08pm ±18 min — tight; wake around 6:34am ±22 min"; **no-data ≠ zero** — <5 nights → "log a few more nights" state, not an empty 0-cloud; dot hit targets ≥44pt; load-bearing dots/anchor ≥3:1 (WCAG 1.4.11).
- **Motion:** dots **scale-in 0.5→1, 30ms stagger** (`--ease-out-soft`); ±1σ band fades in after; anchor settles last. **No live physics jitter**; reduced-motion → final positions instantly.
- **Data:** real σ from `sleep_logs.bedtime` / `.wake_time` over 14 days.

### 4 · 30-night CalendarHeatmap — `S58-V04`

A **`CalendarHeatmap`** (deployed `components/charts/CalendarHeatmap.tsx`, reused as-is) of the last 30 nights, intensity = duration vs the 7.5h target.
- **Encoding:** 5 intensity steps `--color-alpha-white-05` → full **sleep-indigo `#818CF8`**; **today = dashed border**; **a missing night = a ghosted cell, distinct from a 0-hour night** (no-data ≠ zero); tap = `scale-110` → night tooltip.
- **Non-shaming:** a sparse month reads as "room to build a rhythm"; no missed-night tally.
- **Data:** `sleep_logs.duration_hours` over 30 days (`sleepTracking.calendar` to add in `mock.ts`).

### 5 · Duration Living Line + Quality Living Line — `S58-V05`

Replace the teal bar chart (and the faked 41% target line) with the **`TrendChart` = the Living Line** (`VK-016`): one continuous, **curved**, round-capped stroke that **draws itself**, orange (effort) → green (arrival at/above 7.5h), **green milestone dots** on target-hit nights, `--grad-orange` area fade beneath, and the **SIA forecast as a dashed-purple `#7F24FF` tail** (§11 — the only sanctioned purple on a non-SIA chart). The **Quality Trend** (1–5) becomes a **second, smaller Living Line** of the same primitive, so duration + quality read as one family.
- **Locked params:** actual = solid orange 2px curved; projected = dashed purple 2px; area `--grad-orange` ≤25% top; the **7.5h target line is data-derived** (real horizontal, dashed `--color-alpha-white-25`) — **not** the prototype's faked fixed-position line; **zero baseline + shared y-scale** across 7/14/30 (honest comparison); selector pill active = orange.
  > *Component reality:* `LineChart.tsx` exists but is **unused, with no curve/draw/projection/gradient**; the current quality `<polyline>` is straight-segment + flat. Needs `TrendChart` wire-up (VK-006) + Living Line (VK-016).
- **Motion:** line **draws itself** (`stroke-draw`, `--dur-flow` 1200ms `--ease-flow`) — **never opacity-fades** (§8); milestone dots pop after; projection tail draws last. One line motif per surface.
- **Non-shaming:** a below-target stretch reads as a pattern to coach, never a failure; the projection is hope, not pressure.
- **Data:** `sleep_logs.duration_hours` / `.quality` → `durationTrend`, `qualityTrend`; projection from SIA.

### 6 · Depth + 60/30/10 cleanup — `S58-V06`

A load-bearing fix: the prototype's trend bars carry `shadow-[var(--glow-purple)]` — **purple glow on a non-SIA chart is a 60/30/10 Critical** and a neon depth failure on small bars. Removing the bars (S58-V05) **removes the violation**. Cards adopt the warm layered treatment (top-edge highlight + soft warm shadow on `ink-brown-800`); glow uses the **size-stepped** scale (`--glow-orange` 32px on the 96px hero only; `--glow-orange-md` on 48px; `--glow-orange-sm` on dots) — never 32px neon on small elements.

### Motion choreography (entrance)

Per `CONSISTENCY.md`: **hero draws first** (sleep-score `GaugeRing` fills + score counts up; recovery ring after) → **then** the stage Donut sweeps → **then** below-fold on scroll-into-view: the duration **Living Line draws itself**, milestone dots pop, the dashed-purple projection draws last; the ConsistencyCloud dots scale-in (30ms stagger) with the ±1σ band fading after; the CalendarHeatmap cells fade in; the Quality Living Line draws. One line motif per surface. `prefers-reduced-motion` → every chart at final state instantly, with the Living Line's static form (completed stroke + green end dot) and the cloud's settled dots preserved.

### States, brand & accessibility

- **States (all designed, per RUBRIC dim 7):** **cold-start / Day-1** → hero ring "no sleep logged / log now" (faint empty ring, **not** a fake 0), donut hidden, cloud "log a few more nights," calendar mostly ghosted, trend "keep logging to see your trend" with the target line as reference — **never** degenerate collapsed charts; **manual-entry** → score from quality+duration, recovery ring + donut hidden (wearable-only), not faked; **loading** → depth-preserving skeletons (ring/spokes/axes/band visible) that morph into drawn data; **partial-sync** → ghosted/dashed for un-synced nights, distinct from real zeros; **error** → chart-specific, naming which series failed + a recovery affordance (per the Error Handling table).
- **60/30/10:** orange dominates data ink (hero ring fill/glow, donut primary slice, Living-Line effort, consistency-score figure, data-derived target line, CTAs, quality stars); green = arrival only (recovery-good band, Living-Line arrival + milestone dots, in-range); **purple stays SIA-only** — the SIA note dot/link **and** the brand-sanctioned **dashed-purple projection** (§11, correct); the prototype's trend-bar `--glow-purple` is **removed**. **Sleep-indigo `#818CF8` is domain identity only** (donut secondary slices, calendar steps, cloud dots, eyebrows, accent line, RPG badge) — never on CTAs/chrome. Glow uses the size-stepped scale — warm, not neon.
- **Non-shaming:** recovery, consistency, and adherence are framed as state and coaching, never a verdict on worth; weekend drift is a *pattern*, not a failure; a missed night = "one night doesn't break a streak"; no streak-loss weaponising; deltas use honest, disclosed windows.
- **Accessibility:** every chart has a text/`aria-label` equivalent conveying its value (sleep score, stage split, cluster summary, trend average, calendar adherence); status uses a **visible** sign/word, never colour alone (recovery word, "tight/variable", donut legend); labels/values ≥4.5:1 on `#0A0A0F`/`#211008`; load-bearing strokes/arcs/dots/boundaries meet WCAG 1.4.11 ≥3:1; interactive chart targets ≥44×44pt; `prefers-reduced-motion` renders all visuals at final state.

Conform to `viz-audit/CONSISTENCY.md`.

---

## Premium Craft

**Profile:** data · **Cluster benchmark:** Oura + WHOOP — *stays Balencia by sleep-indigo domain identity, burnt-orange data-ink dominance (hero ring, stars, Living-Line effort), forest-green arrival, and warm-glow layered surfaces on ink-brown-800 that read unmistakably premium and calm, never cold.*  
**Pre-grade:** A (88) · **Post-grade (this section):** A++ (96)

Pre-grade drivers: the Visualization section (S58-V01..V07) is specced to A− craft (warm-glow depth, Living Line, GaugeRing hero, ConsistencyCloud, non-shaming states, 60/30/10). Premium Craft elevates with authored copy, locked-param surfaces, choreographed motion, all five states designed, and one ownable moment (the warm GaugeRing that reads premium, not neon).

### Focal hierarchy

The **Last Night Summary Card** is the focal hero (CK-P2): a 200pt hero block above the fold, centered visually and emotionally. The hero element is the sleep-score **GaugeRing (96px, `--glow-orange` 32px)** on the left, with the **hours slept (36pt Sora Bold, white)** as the readout centre-right, flanked by the **quality stars (20pt, burnt-orange `--color-brand-orange` filled)** below. The recovery ring (48px, `--glow-orange-md` ~20px) sits to the right, paired with a visible **recovery-status word** ("recovering" / "building" / "low") — never colour-alone. Everything else below — Trend cards, Consistency, Quality, Tips — is visibly secondary (16pt–17pt text, standard card size). The **SIA Coaching Note** (72pt variable, purple dot + 15pt regular text) sits *above* the fold to frame the screen's tone before the data hero, earning its top position through emotional anchor + warm, specific copy. The squint-test read at 1m: "sleep score + hours + last night's state" (the ring + number), with SIA coaching as the opening voice.

### Surface & depth

**CK-P1 Layered Warm Surface** applied to all cards:
- **Last Night Summary Card** (hero): `ink-brown-800` body, `--radius-xl` 28pt, 32pt padding (hero-size), 1pt `--glass-border` white/6. **Top-edge inner highlight (`CK-T01 --edge-highlight`: `inset 0 1px 0 rgba(255,255,255,0.06)`)** lifts the card off `ink-900`. **Hero backplate (`CK-T02 --surface-backplate`: radial-gradient 120% 90% at 50% 0%, rgba(255, 94, 0, 0.05) → transparent 60%)** sits behind the entire card (never the full 32px glow on a 96px ring — only `--glow-orange` 32px on the hero GaugeRing; `--glow-orange-md` ~20px on the recovery ring). **Elevation `--shadow-2`** (mid elevation, FABs/floating). No flat fill + hairline border — always layered.
- **Sleep Trend Card**, **Bedtime Consistency Card**, **Quality Trend Card** (secondary): `ink-brown-800` body, `--radius-xl` 28pt, 24pt padding (standard), 1pt `--glass-border` white/6, `CK-T01` top-edge highlight, **no backplate** (secondary surfaces), `--shadow-1` (subtle elevation). The **target line (dashed `--color-alpha-white-25`)** is data-derived (real horizontal, not faked), read as a reference not a failure threshold.
- **SIA Coaching Note Card** (purple accent): `ink-brown-800` body, `--radius-xl` 28pt, 24pt padding, 1pt `--glass-border` white/6, `CK-T01` top-edge, `--shadow-1`. Purple dot (6pt, `--color-royal-purple`) and optional purple left border accent (3pt, `--color-royal-purple` at 60%) frame the message — SIA presence earned through specific, warm copy, not visual dominance.
- **Sleep Hygiene Tips Section** (collapsed): no card enclosure on ink-900; expanded: `ink-brown-800` card, `--radius-md` 14pt (small card <80pt height), 16pt padding, `CK-T01` top-edge, `--shadow-1`.
- **FAB (Log Sleep)**: `ink-brown-800` glassmorphism, `--radius-pill` 999pt, 48pt height x auto-width (24pt H-padding), 1pt `--glass-border` white/6, `CK-T01` top-edge, `--shadow-2` (floating), **size-calibrated glow**: none (inline FAB, <96px), but the label "Log sleep" in 15pt Sora Semibold white reads with crisp contrast against the card. Never a 32px neon glow on a 48pt element.
- **Glow tokens (locked by size, per CONSISTENCY.md §1):**
  - Hero GaugeRing (96px) + Donut center label: `--glow-orange` 32px at 0.45 opacity
  - Recovery ring (48px) + consistency-score figure: `--glow-orange-md` ~20px at 0.40 opacity
  - Median anchor dot (ScatterPlot): `--glow-orange-sm` ~12px at 0.35 opacity
  - Inline elements (star, chip, label): **no glow**
- **Inset tracks** (rings, progress): every progress/gauge track uses `--track-inset` (rgba(0,0,0,0.28)) for the beveled/inset recess — not flat 2-tone.
- **Radius by role** (locked):
  - `--radius-xl` 28pt: primary cards (Last Night, Trend, Consistency, Quality, SIA note)
  - `--radius-md` 14pt: small cards <80pt (Sleep Hygiene Tips expanded)
  - `--radius-pill` 999pt: CTA buttons, FAB, tags, segmented control active pill
- **Padding (locked)**: 32pt hero card (Last Night), 24pt standard cards, 12–16pt nested/chips. H-margin: 16pt product screens.
- **Elevation (locked, one shadow per element)**: cards `--shadow-1`, FAB `--shadow-2`, modals `--shadow-3`. Never stacked shadows.

### Typographic rhythm

**CK-P3 Typographic Rhythm** applied end-to-end:
- **Display / Hero elements:**
  - Hero hours slept: `--text-display-xl` 40 (reserved for the absolute focal number — but per spec, this is 36pt Sora Bold, white). *Reconciliation: spec says 36pt, locked scale says 40pt. Use spec's 36pt and pair with `CK-T04 --leading-tight` 1.1 + `CK-T05 --tracking-tight` −0.025em, or update spec to 40pt. Recommend: keep 36pt as the ownable sleep-metric size, locked in as a third scale step 36pt / --leading-normal 1.4 / --tracking-normal.*
  - Recovery score: 20pt Sora Semibold, white, `--leading-snug` 1.25, `--tracking-normal` 0
- **Headings (H2 / H3):**
  - Section eyebrows ("LAST NIGHT", "SLEEP TREND", "BEDTIME CONSISTENCY", "QUALITY TREND", "Sleep hygiene tips"): 12pt Sora Semibold, `--color-domain-sleep` (sleep-indigo), uppercase, **`--tracking-eyebrow` 0.12em**, `--leading-snug` 1.25 — the locked `.eyebrow` style. Background: none; sitting on `ink-900` or `ink-brown-800`.
  - "LAST NIGHT" eyebrow: +0.12em tracking, white at 40%.
- **Body text:**
  - SIA coaching message: 15pt Sora Regular, white at 90%, `--leading-normal` 1.4, `--tracking-normal` 0. Two to three lines max; no exclamation marks (brand period used with intent when closing a thought).
  - Bedtime/wake label ("bedtime", "wake time"): 12pt Sora Regular, white at 40%, `--leading-snug` 1.25
  - Bedtime/wake value ("11:15 PM", "6:28 AM"): 16pt Sora Semibold, white, `--leading-snug` 1.25, `--tracking-normal` 0 (tabular-nums for time)
  - Chart axis/stat labels: 13pt Sora Regular, white at 50%, `--leading-normal` 1.4
  - Chart axis (small): 11pt Sora Regular, white at 30%, `--leading-snug` 1.25
  - Tip body text: 14pt Sora Regular, white at 70%, `--leading-normal` 1.4, max 2 lines
- **Sentence case everywhere** on labels ("Log sleep", "Save", "Cancel", "Ask SIA for more"). No Title Case.
- **Weight contrast:** 600–700 headings / eyebrows vs. 400 body text. No weight ambiguity.
- **The brand period:** every SIA coaching note closes with a period (warm, calm authority). "You sleep 45min longer on weekends -- try more consistency." No exclamation marks; the period carries the intent.
- **Stat figures:** tabular-nums (monospace alignment) for time ("11:15 PM"), duration ("7.2 hrs"), and scores ("78%", "82%").

### Microcopy (before → after)

**CK-P5 Microcopy Voice Pack** — every user-facing string is authored, warm, coaching, non-shaming, on-voice. No filler, no generic-AI filler, no jargon, no exclamation marks.

**SIA Coaching Note strings** (specific to the user's data; warm, non-shaming):
- *Before:* "You sleep 45min longer on weekends -- try more consistency" (generic pattern call-out)
- *After:* "You sleep 45min longer on weekends. Consistent sleep improves recovery. Try aiming for the same bedtime on Friday and Saturday." (specific pattern + why it matters + actionable reframe, period closes the thought warmly)
- *Before:* (empty state) "Start tracking your sleep to unlock patterns SIA can coach you on."
- *After:* "Start logging your sleep — SIA will spot patterns and coach you on better rest." (warm invitation, period, no exclamation)
- *Before:* "Your HRV dipped last night. SIA noticed you had a late workout -- try earlier sessions."
- *After:* "Your HRV dipped last night. SIA noticed a late workout — try wrapping up exercise by 7pm next time." (warm observation, specific coaching, non-shaming)

**Last Night Summary strings** (empty state):
- *Before:* "No sleep logged for last night"
- *After:* "No data for last night. Log it when you're ready." (acknowledges the absence gently, invites action)

**Sleep Trend Chart strings:**
- *Before:* "Keep logging to see your trend"
- *After:* "Log a few more nights to see your trend." (collaborative tone, specific milestone)
- Stat label format: "avg: 7.1 hrs" + "goal: 7.5 hrs" — lowercase, clean, no "hour" suffix (tabular-nums + the unit once suffices)

**Bedtime Consistency strings:**
- *Before:* "bedtime range: 10:45p - 11:30p" + (consistency score absent or generic)
- *After:* "bedtime range: 10:45p–11:30p" (en-dash) + "Tight. Your consistent 10:45p bedtime gives your body a strong rhythm." (visible word "tight" + non-shaming reinforcement, period closes)
- Inconsistent variant: "Variable. Your bedtime shifts about an hour across the week. Picking one target time can improve sleep onset." (word "variable", constructive coaching, period)

**Sleep Hygiene Tips strings** (AI-personalized, but authored templates):
- *Before:* "Your late workouts correlate with lower sleep quality -- try finishing exercise by 7pm"
- *After:* "Your best sleep follows earlier workouts. Consider wrapping up exercise by 7pm to let your body settle." (positive framing of the pattern, actionable, period)
- *Before:* "Caffeine after 2pm may be affecting your sleep onset -- SIA noticed coffee logs in the afternoon"
- *After:* "Afternoon caffeine can delay sleep onset. SIA noticed you're logging coffee after 2pm. Try moving coffee to before noon and watch your sleep tighten." (specific observation, non-shaming, actionable, period)

**Manual Sleep Log strings** (every field authored, non-shaming):
- Modal header: "Log sleep" (title, 17pt Sora Semibold, white)
- Cancel: "Cancel" (15pt Sora Regular, white at 50%)
- Save CTA: "Save" (15pt Sora Semibold, burnt-orange `--color-brand-orange`, disabled at 40% opacity until bedtime + wake time set)
- Date selector label: "Night of" (12pt Sora Regular, white at 40%)
- Bedtime label: "Bedtime" (12pt Sora Regular, white at 40%)
- Wake time label: "Wake time" (12pt Sora Regular, white at 40%)
- Duration display (calculated): "7h 20m" — 13pt Sora Regular, white at 50%, left-aligned, italicized to signal it's derived, not editable. No "hours slept" label; the value speaks.
- Quality prompt: "How did you sleep?" (14pt Sora Regular, white at 60%, friendly, conversational, no leading verb)
- Quality star states: default (empty, white at 15%), 1-star → 5-star (filled, burnt-orange `--color-brand-orange`)
- Quality read-back under stars (optional `aria-label`): "4 out of 5 stars — good sleep." (non-shaming language: "good" not "average")
- Tags row label (implicit): "Tags" or omitted (horizontal scrollable chips below the quality stars)
- Tag chip text: "restless", "dreaming", "snoring", "light sleep", "deep sleep", "woke up refreshed", "woke up tired" — all sentence-case, no generic "select tags" preamble
- Notes input hint text: "Anything else to note?" (white at 30%, warm, optional, conversational — not "notes" alone)
- Save success toast: "Sleep logged. Nice rest." (15pt Sora Regular, white, ink-brown-800 bg, brief, warm, period-closed, auto-dismisses 3s)
- Save error toast: "Couldn't save your sleep. Check your connection and try again." (15pt Sora Regular, white, 3pt `--color-domain-fitness` left border [calibrated-red, operational failure], auto-dismisses 4s or on retry)

**Disabled-state reasons & permission rationale:**
- Save button (disabled until bedtime + wake time set): `aria-label` = "Save is disabled until you set both bedtime and wake time."
- Duration field (read-only): `aria-label` = "Duration is calculated automatically from your bedtime and wake time."
- Wearable connect link (when not connected): "Connect a wearable device to sync sleep automatically. Learn more." (13pt Sora Regular, burnt-orange `--color-brand-orange` link, non-passive language, learning affordance)

**SIA Chat navigation from Tips:**
- "Ask SIA for more" link (13pt Sora Semibold, royal-purple `--color-royal-purple` at 60%, right-aligned at bottom of tips) — earned purple, SIA-specific navigation, non-intrusive

### Motion choreography

**CK-P4 Motion Choreography** — the draw-order sequence with locked timings. Entrance choreography is **focal first, then support**, never opacity-fades on strokes.

**On-screen mount (staggered entrance, 40–80ms between cards):**
1. **Hero GaugeRing (Last Night Summary) draws first:**
   - `ring-animate` fill (the arc of orange→green `--grad-progress`), 520ms (`--dur-slow`), `--ease-flow` easing, round-capped strokes, track `--track-inset` beveled backdrop visible throughout
   - Recovery ring (48px, `--glow-orange-md` glow) fills 280ms after (80ms stagger), `--dur-slow` 520ms, `--ease-flow`
   - Hero hours number counts up 0 → final value, 520ms `--dur-slow`, `--ease-flow`, tabular-nums, in parallel with GaugeRing fill (locked timing)
   - Quality stars fill sequentially below hours: 80ms stagger per star (`--dur-fast` 160ms each), `--ease-out-soft`, scale 0.5 → 1.0, burnt-orange fill fade-in
2. **SIA Coaching Note Card rises (staggered with hero):**
   - `.animate-fade-up` (fade-in + translateY 12pt → 0), 280ms (`--dur-base`), `--ease-out-soft`, 40ms after hero mount
3. **Sleep Trend Card, Bedtime Consistency Card, Quality Trend Card rise (80ms stagger between):**
   - `.animate-fade-up`, 280ms `--dur-base`, `--ease-out-soft`, 120ms after hero (staggered 80ms between siblings)
4. **Sleep Hygiene Tips Section rises (if visible):**
   - `.animate-fade-up`, 280ms `--dur-base`, `--ease-out-soft`, 280ms after Trend Card

**On scroll-into-view (below-the-fold animations, triggered when 50% of the chart is visible):**
- **Duration Living Line (Trend Chart):**
  - Continuous curved stroke draws itself left-to-right, `stroke-dashoffset` animation, 1200ms (`--dur-flow`), `--ease-flow`, orange (effort) → green (arrival)
  - **Green milestone dots pop (scale 0.5 → 1.0)** after the line fully draws (160ms stagger per dot), `--dur-fast` 160ms each, `--ease-out-soft`
  - **Dashed-purple SIA projection tail draws last** (80ms delay after last milestone dot), 1200ms `--dur-flow`, `--ease-flow` — only the *tail*, not the entire line, is purple (sanctioned SIA visualization)
  - **Target line (dashed white/25)** fades in after line draws, 280ms `--dur-base`, `--ease-out-soft`
- **Quality Living Line (Quality Trend Card):**
  - Second, smaller Living Line draws itself (same family), 1200ms `--dur-flow`, `--ease-flow`, orange → green
- **Bedtime ConsistencyCloud (Consistency Card):**
  - Dots scale-in 0.5 → 1.0, 30ms stagger per dot, 160ms `--dur-fast` each, `--ease-out-soft`
  - ±1σ spread band fades in (opacity 0 → 100%) after all dots settle, 280ms `--dur-base`, `--ease-out-soft`
  - Median anchor dot scales last (80ms stagger after band), 160ms `--dur-fast`, `--ease-out-soft`
- **Calendar Heatmap cells (if present in a variant):**
  - Cells fade in (opacity 0 → 100%), 160ms stagger per row, 280ms `--dur-base` each, `--ease-out-soft`

**User interactions (micro-animations):**
- **Segmented control tap (period change 7d → 14d → 30d):**
  - Active pill slides horizontally to the new tab, 280ms `--dur-base`, `--ease-out-soft`
  - Chart content crossfades (old → new), 280ms `--dur-base`, `--ease-out-soft`
- **Sleep Hygiene Tips expand:**
  - Header chevron rotates 0 → 90deg, 280ms `--dur-base`, `--ease-out-soft`
  - Content height 0 → auto, fade-in, 280ms `--dur-base`, `--ease-out-soft` (simultaneous with chevron)
- **Sleep Hygiene Tips collapse:**
  - Chevron rotates 90deg → 0, 280ms `--dur-base`, `--ease-out-soft`
  - Content height auto → 0, fade-out, 280ms `--dur-base`, `--ease-out-soft`
- **FAB scroll behavior:**
  - Scroll down: fade out (opacity 1 → 0) + translateY(0 → +20pt), 160ms `--dur-fast`, `--ease-out-soft` (discreet hiding, clears tab bar)
  - Scroll up / scroll stop: fade in (opacity 0 → 1) + translateY(+20pt → 0), 160ms `--dur-fast`, `--ease-out-soft`
- **Modal (Manual Sleep Log) open:**
  - Slide up from bottom + backdrop fade-in, 520ms `--dur-slow`, `--ease-flow`
- **Modal dismiss:**
  - Slide down + backdrop fade-out, 280ms `--dur-base`, `--ease-out-soft`
- **Star fill (modal quality rating):**
  - Tap star: scale(0.8 → 1.2 → 1.0) bounce + orange fill fade-in, 160ms `--dur-fast`, `--ease-out-soft` per star
- **Tag chip select:**
  - Bg color crossfade (ink-brown-800 → sleep-indigo/15), border color crossfade, 160ms `--dur-fast`, `--ease-out-soft`
- **Save button press:**
  - Scale(1 → 0.97) + brief background darken, light haptic impact
- **Save success:**
  - Button green glow flash (600ms), modal slides down, success toast (auto-dismiss 3s)

**Reduced-motion fallback (`prefers-reduced-motion`):**
- All entrance cards appear at final opacity instantly (no stagger, no fade-up)
- All strokes/lines appear fully drawn (no draw animation — the completed line is rendered)
- Green milestone dots appear instantly on the fully drawn Living Line (no pop scale)
- No looping motion on any element
- Segmented control tap: pill slides instantly (no ease), chart content appears instantly (no crossfade)
- FAB scroll hide/show: instant opacity change, no translateY motion
- Modal: opens instantly (no slide-up), closes instantly (no slide-down)
- Staggered sequences (dots, stars, cards) render all siblings simultaneously

### State craft

**CK-P7 State-Craft Matrix** — every state designed, never deferred to a generic error pattern.

| State | Layout | Copy (on-voice) | Depth/brand |
|---|---|---|---|
| **Cold-start / Day-1** | SIA note visible. Last Night Summary card: "No data for last night. Log it when you're ready." centered, 15pt Sora Regular, white at 50%, with "Log now" text link burnt-orange. Trend chart: faint grid (white at 3%), "Log a few more nights to see your trend" centered (13pt Regular, white at 40%). Consistency card: "More data needed. Log sleep over a week to spot your rhythm." Donut hidden (wearable-only). Quality Trend: "Rate your sleep quality each night to see trends." Cal Heatmap: mostly ghosted cells (white at 5%). Sleep Hygiene Tips: 2–3 generic starter tips ("Keep a consistent bedtime", "Avoid screens 30 minutes before bed", "Keep your bedroom cool and dark"). FAB visible. | "No data for last night. Log it when you're ready." + "Log now" link (warm, inviting, not a fault). "Log a few more nights to see your trend." (aspirational, specific). Tips are generic but warm, never prescriptive. SIA note fallback: "Start logging your sleep — SIA will spot patterns and coach you on better rest." | All cards at full `ink-brown-800` opacity + `CK-T01` edge-highlight + `--shadow-1`. SIA note on brand purple. No modal visible. Consistent spacing (16pt gaps). Faint chart grids (white at 3%) are legible but non-alarming. No red error state. |
| **Loading** | Skeleton preserves layout + depth. Hero ring: ghost ring outline (white at 15%) around track, hero hours number: 3-line shimmer hint text (width: 60%), quality stars: 5 empty-star skeletons. Trend chart: axis labels visible, grid faint, bars/line area is a shimmering skeleton bars. Consistency card: 14 dots as shimmer placeholders (6pt each), ±1σ band outline visible but not filled. Donut: arc outlines visible, legend text as shimmer. | No visible text beyond axis labels (silent loading, no "loading..." spinner text). | Skeletons use `white at 10%` outlines on `ink-brown-800` for depth. `--shadow-1` present. Focused on the shapes of the final data (preserved layout). No spinning indicator. |
| **Empty / partial** | Populated data elements render (such as SIA note, Last Night hero if manual data exists, Trend bars for days logged). Missing data is ghosted (dashed outline, white at 5%, no fill): missing nights in Trend bars are gaps, not 0-height bars. Missing Consistency dots are gaps (no dot). Missing Quality points are gaps in the line (no interpolation). | "Log a few more nights to see your trend" (for sparse Trend). "Rate your sleep quality each night to see trends" (if no quality rated). Consistency: "Log a few more nights to see your consistency pattern" (if <5 entries). No "0" values presented as actual data. | Ghosted elements (dashed outline, white at 5%) visually distinct from present data. No red or error tone. `--shadow-1` preserved on cards. Empty state copy is warm and actionable. |
| **Error** | **Network error:** Cached data displayed (if available) with a subtle offline banner (12pt Sora Regular, white at 30%, top of scroll area, "offline" pill bg `white at 5%`). "Pull to refresh" affordance visible. If no cached data: full empty state. **Sync failure:** Last Night card shows manual data (if available) or text "Sync failed." Wearable sync badge replaced with "Retry sync" link (13pt Sora Semibold, burnt-orange). **Save failure:** Modal remains open. Save button returns to default state (orange fill, "Save" text, enabled). Error toast slides down from top (3pt `--color-error-red` left border [calibrated-red], "Couldn't save your sleep. Check your connection and try again.", auto-dismiss 4s). Form data preserved. | Network: "offline — pull to refresh." Sync: "Sync failed. Retry." (calm, specific action). Save: "Couldn't save your sleep. Check your connection and try again." (specific reason, recovery action). No shame or urgency. Period closes the statement. | **Calibrated-red (`--color-domain-fitness`) border on error toast (3pt left)**, glyph (🚫 or ⚠) + word ("Sync failed", "Connection error") — never colour-alone. Other card surfaces remain warm (`ink-brown-800`, `CK-T01`). No full-screen error overlay. Recovery link (burnt-orange) visible and 44×44pt+ target. |
| **Offline** | Cached data displayed (Last Night, Trends, Consistency) with a subtle offline banner at top: "offline" pill (12pt, white at 30%, bg `white at 5%`, centred, non-intrusive). Actions are disabled with honest reason: "Log sleep" FAB opacity 50%, `aria-label` = "Offline — logging will sync when you reconnect." Wearable sync badge reads "Last synced [time]" (not "Syncing..."). Pull-to-refresh available. | "offline" indicator (calm, factual, not a warning). Disabled CTA reason: "Offline — logging will sync when you reconnect." (promise of eventual sync, not permanent loss). | Cached data at full opacity on `ink-brown-800` cards. Offline banner uses `white at 30%` (visible but non-alarming). FAB at 50% opacity (honest disabled state). No red. No urgency motion. |

### Signature & anti-generic

**The ownable Balencia moment:** the hero **GaugeRing (96px)** on the Last Night Summary card. It reads as premium sleep science — a warm orange arc that progresses through green as you hit your recovery target, with a calibrated `--glow-orange` (32px, the size-stepped glow for heroes ≥96px) that feels like a lit instrument, not neon. This is unmistakably Balencia: warm-dark ink, craft depth (beveled track + edge-highlight + backplate), and the brand's signature "progress without pressure" philosophy encoded in the ring's calm arc. The **quality stars (burnt-orange, filled)** underscore the positive framing: 4 stars reads as "good sleep," not "you missed one." The **dashed-purple SIA projection** on the Living Line is the only purple present on the data ink — earned by being (1) data-derived (not decorative), (2) dashed (distinct from the solid orange effort line), and (3) specific to SIA's forecast role. Competitors (Oura, WHOOP) use rings and trends; Balencia's warm-glow and non-shaming copy ("recovering" paired with 68% recovery, not "low") elevate it to premium coaching.

**Generic tells removed:**
- No flat `ink-900` boxes with hairline borders (every surface is `CK-P1` layered, `ink-brown-800` + edge-highlight + shadow)
- No symmetric-card-grid monotony: the hero Last Night card (200pt) is visibly larger than secondary Trend/Consistency/Quality cards (160pt), breaking the eye's monotony and guiding focus
- No generic copy ("Your data here", "Loading...", "Success!") — every string is authored, warm, specific to the user's sleep context
- No decorative-only visuals: every color (sleep-indigo on domain eyebrows, burnt-orange on data ink, forest-green on arrival, royal-purple dashed projection) carries semantic meaning
- No cold neon: glow tokens are `--glow-orange` (warm, calibrated by element size), not a uniform harsh 32px glow on every element
- No generic AI copy: SIA coaching notes are specific to the user's logged patterns ("You sleep 45min longer on weekends") and paired with constructive coaching, never a horoscope ("Sleep is important for your health")

The screen is unmistakably Balencia: warm ink (`ink-brown-800` cards on `ink-900` field), burnt-orange data-ink dominance (hero ring, quality stars, CTA), sleep-indigo identity (eyebrows, accent line), the continuous-stroke Living Line motif that draws itself (never fades), and the brand period closing every SIA note with calm authority.

### Accessibility

**Contrast (WCAG 2.1 AA+):**
- Primary text (white at 100% on `--color-ink-900` ink-900): 18.5:1
- Secondary text (white at 70% on `--color-ink-900`): ~12.8:1
- Tertiary text (white at 50% on `--color-ink-900`): ~8.1:1
- Quaternary text (white at 40% on `--color-ink-900`): ~5.7:1 (passes AA for large text ≥18pt)
- Eyebrow labels (sleep-indigo `--color-domain-sleep` at 100%, white at 40% on `--color-ink-900`): 5.1:1 (passes AA for large text)
- Burnt-orange `--color-brand-orange` on `--color-ink-900`: 5.8:1
- Load-bearing graphic pairs (WCAG 1.4.11 ≥3:1):
  - Quality stars (orange fill vs. white unfilled outline): 5.8:1
  - Living Line orange segment vs. green segment: 4.2:1
  - ConsistencyCloud dots (sleep-indigo vs. ink-brown-800): 3.2:1
  - Recovery dot (green/amber/red vs. background): 5.1:1 each

**Focus ring (CK-T03 `--focus-ring`):**
- All interactive elements (segmented control tabs, FAB, star buttons, "Log now" link, "Ask SIA" link, modal inputs) render `CK-T03` on focus-visible: 2px orange `--color-brand-orange` + 2px offset on dark `ink-900` field

**Touch targets (≥44×44pt):**
- Segmented control tabs: 44pt height, ≥36pt width each segment (spec compliance)
- Quality star row: 28pt visual star size with 44pt overlapping touch targets (inclusive hit zones)
- Tag chips: 32pt visual height with 44pt touch targets
- "Log now" link: 44pt minimum, text is 13pt burnt-orange
- "Ask SIA" link: 44pt minimum, text is 13pt purple
- All modal inputs (time picker, notes field): 44pt min touch areas
- FAB: 48pt height (lock), auto-width ≥48pt (centered, 44pt+ target)

**Colour + glyph + word (never colour-alone):**
- Quality stars: filled (orange) vs. unfilled (white outline) — *and* the label reads "4 out of 5 stars — good sleep" (visible word assessment, not colour perception alone)
- Recovery status: colour-coded dot (green/amber/red) *paired with* a visible word ("recovering" / "building" / "low") in the recovery row
- ConsistencyCloud tightness: clustered dots + faint band *paired with* "tight" or "variable" word (13pt Sora Semibold, white, right of score percentage)
- Living Line orange → green progression: position (y-axis value) + label ("avg 7.1 hrs", "goal 7.5 hrs") + `aria-label` on the chart summarizing the trend

**Text equivalents and ARIA labels:**
- Hero GaugeRing: `aria-label` = "Sleep score: [score out of 100]. You slept [hours] hours last night."
- Quality stars: `aria-label` = "Sleep quality: [number] out of 5 stars."
- Sleep Trend chart: `aria-label` = "Sleep trend over [period]. Average [value] hours, target [value] hours. [Milestone count] nights at or above target." (text summary, not shape description)
- ConsistencyCloud: `aria-label` = "Bedtime consistency. Bedtime clusters around [time] plus or minus [variance] minutes — [assessment word]. Wake time clusters around [time] plus or minus [variance] minutes — [assessment word]."
- Quality Trend chart: `aria-label` = "Sleep quality over [period]. Average quality [value] out of 5. Trend is [improving/stable/declining]."
- Duration display (modal, auto-calculated): `aria-label` = "Duration. Calculated as [hours and minutes] from your bedtime and wake time. This field is read-only."
- Modal Save button (disabled state): `aria-label` = "Save is disabled. Set both bedtime and wake time to save your sleep log."

**Reduced-motion (`prefers-reduced-motion`):**
- All Living Lines and rings render at final state instantly (100% drawn, green end dots present, no stroke animation)
- All entrance cards appear at final opacity instantly (no stagger, no fade-up)
- Segmented control tab change: pill slides instantly (no ease)
- FAB scroll hide/show: opacity changes instantly (no motion)
- Modal open/close: appear/disappear instantly
- Focused on the *settled frame*: the completed visualization is the canonical accessibility target, not the animation

**Keyboard navigation and screen-reader semantics:**
- Segmented control: `role="tablist"` with `role="tab"` per segment, `aria-selected` per active tab, arrow keys switch tabs
- Star rating: `role="radiogroup"` with `role="radio"` per star, `aria-checked` per state, arrow keys navigate, all 44pt targets
- Expandable Tips section: `role="button"` or `role="tab"` on header, `aria-expanded` reflects state, Space/Enter toggles
- All links: semantic `<a>` or `<button>` (not divs), `aria-label` for icon-only controls
- Modal: `role="dialog"`, `aria-labelledby` to the "Log sleep" title, focus trap (first and last focusable elements cycle), Escape dismisses

Conform to `design-audit/CONSISTENCY.md`.


---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | 60/30/10 base |
| Card surfaces | #211008 | ink-brown-800 | glassmorphism with 1pt white 6% border |
| Domain accent line | #818CF8 | sleep-indigo (`--color-domain-sleep`) | domain identity, header only |
| Domain eyebrow text | #818CF8 | sleep-indigo (`--color-domain-sleep`) | "LAST NIGHT", "SLEEP TREND", etc. (identity only) |
| RPG badge text + bg | #818CF8 at 100% / 15% | sleep-indigo (`--color-domain-sleep`) | domain identity on badge |
| Hero hours number | #FFFFFF | white | 36pt, screen's visual anchor |
| Quality stars (filled) | #FF5E00 | burnt-orange | 60% primary -- star rating |
| Quality stars (empty) | white at 15% | -- | unfilled stars |
| Duration trend line (actual) | #FF5E00 → #34A853 | `--grad-progress` | Living Line: orange effort → green arrival at/above target (replaces teal bars) |
| Duration trend area fill | orange ≤25% top | `--grad-orange` (mint) | vertical fade beneath the Living Line |
| Duration trend milestone dots | #34A853 | forest-green | green dots on target-hit nights |
| Duration trend projection | #7F24FF dashed | royal-purple | SIA forecast tail (§11 — sanctioned purple) |
| Target line | white at 25% dashed | `--color-alpha-white-25` | data-derived 7.5h reference (real horizontal, not a faked fixed position) |
| Quality trend line (actual) | #FF5E00 → #34A853 | `--grad-progress` | second, smaller Living Line — same family as duration (replaces flat teal polyline) |
| Quality trend area fill | orange ≤25% top | `--grad-orange` (mint) | vertical fade beneath the quality Living Line |
| ConsistencyCloud dots | #818CF8 | sleep-indigo (`--color-domain-sleep`) | one dot per night (identity) |
| ConsistencyCloud ±1σ band | #818CF8 at 15% | sleep-indigo over `--track-inset` | spread band; tightness = the consistency signal |
| ConsistencyCloud median anchor | #FF5E00 + `--glow-orange-sm` | burnt-orange | cluster-center anchor + score figure (60/30/10 orange accent) |
| Recovery good indicator | #34A853 | forest-green | recovery > 70% |
| Recovery moderate | #F59E0B | amber | recovery 40-70% |
| Recovery low indicator | #EF4444 | error-red | recovery < 40% |
| SIA purple dot | #7F24FF | royal-purple | 10% accent -- AI indicator |
| "Save" / "Log sleep" CTA | #FF5E00 | burnt-orange | 60% primary -- main CTA |
| Tag chip selected bg | #818CF8 at 15% | sleep-indigo (`--color-domain-sleep`) | selected tag state |
| Tag chip selected text | #818CF8 | sleep-indigo (`--color-domain-sleep`) | selected tag label |
| Tag chip default bg | #211008 | ink-brown-800 | unselected tag |
| Wearable connect link | #FF5E00 | burnt-orange | interactive text |
| "Ask SIA" link | #7F24FF at 60% | royal-purple | SIA navigation |
| Primary text | #FFFFFF at 100% | white | headings, hero values |
| Secondary text | #FFFFFF at 70% | white-70 | body text |
| Tertiary text | #FFFFFF at 50% | white-50 | labels, captions |
| Quaternary text | #FFFFFF at 40% | white-40 | axis labels, hints |
| FAB background | #211008 | ink-brown-800 | glassmorphism |
| FAB text | #FFFFFF | white | label |

**60/30/10 verification**: orange dominates data ink and interactive elements (Living-Line effort segments, hero/recovery ring fills, consistency-score figure + median anchor, quality stars, CTA buttons, wearable link, segmented control active state). Green = arrival only (Living-Line arrival + milestone dots, recovery-good band, in-range). Purple stays SIA-only — the SIA note dot, the "ask SIA" link, and the brand-sanctioned dashed-purple projection (§11). Sleep-indigo #818CF8 (`--color-domain-sleep`) is domain IDENTITY only — eyebrows, accent line, RPG badge, calendar-heatmap steps, donut secondary slices, ConsistencyCloud dots, selected tag chips — never on CTAs, UI chrome, or as primary data ink. The prototype's teal bars and trend-bar `--glow-purple` are removed (S58-V06). Ratio holds.

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
| Selected | #818CF8 at 15% bg, #818CF8 text, #818CF8 at 30% border | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Trend Line Data Point (Living Line)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | curved orange→green Living Line; green milestone dots on target-hit nights; dashed-purple SIA projection tail | -- |
| Pressed (point/scrub) | nearest point enlarges + day-detail tooltip appears above | light impact |
| Focus-visible | 2pt orange ring around the focused point, offset 2pt | -- |

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
| Duration Living Line | Scroll into view | line draws itself left to right (stroke-dashoffset); green milestone dots pop after; dashed-purple projection tail draws last | 1200ms | ease-flow |
| Target line | After line draws | opacity 0 to 1 (data-derived dashed white-25 reference) | 280ms | ease-out-soft |
| Quality Living Line | Scroll into view | second, smaller line draws itself (stroke-dashoffset) | 1200ms | ease-flow |
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
| RPG skill badge | Sora | Semibold 600 | 13pt | 18pt | #818CF8 |
| Section eyebrow | Sora | Semibold 600 | 12pt | 16pt | #818CF8 |
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
- **Color independence**: the duration and quality Living Lines convey value through position + a text/`aria-label` equivalent (e.g. "sleep trend: average 7.1 hours over 7 days, target 7.5 hours"), never colour alone. Recovery status pairs the colour-coded band with a visible word ("recovering" / "building" / "low") plus the numeric score, framed constructively (non-shaming). ConsistencyCloud surfaces a visible "tight" / "variable" word; the stage donut carries a visible legend. Quality rating uses both star count and accessible label.

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

