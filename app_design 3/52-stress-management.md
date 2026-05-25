# Screen Design: Stress Management

**Screen**: 52 of 73
**File**: 52-stress-management.md
**Register**: Wellbeing Mode (wellbeing-teal #14B8A6)
**Primary action**: log stress, identify triggers, access relief tools
**Tab**: Wellbeing domain (via Explore) or Home quick action
**Navigation**: Stack depth 2-3 from Me tab root (Me → Explore → Stress Management). Also reachable via Home Screen [12] wellbeing quick-action card, SIA deep-link [09] ("let's look at your stress"), or Wellbeing Dashboard push. Exit via back button to Explore, or forward to Breathing Exercises [53], Meditation [54], Yoga [55], SIA Chat [09].

---

## Purpose

This screen is the user's stress command center — a unified view that surfaces a composite stress score derived from biometric, sentiment, and behavioral signals, lets the user log stress manually, identifies recurring triggers, and provides fast-track access to relief tools. It answers "how stressed am I, what's causing it, and what can I do about it right now?" SIA acts as a stress coach: synthesizing data streams, surfacing patterns the user might miss, and recommending contextual interventions. The composite stress score is the deterministic analytic (biometric + behavioral + sentiment signals from `stress_logs`), while the SIA coaching note is the AI-derived layer offering interpretation and guidance. Free tier includes manual stress logging and trigger browsing; SIA-powered trend analysis, coaching notes, and AI recommendations are premium.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Domain header with teal accent — immediate domain identification
2. Current Stress Level gauge — large composite score dial, the emotional anchor of the screen
3. Quick Log card — stress rating slider + trigger multi-select chips for fast logging
4. SIA Coaching Note — AI-generated stress insight with contextual recommendation
5. Trigger Analysis — donut chart showing most frequent stress triggers
6. Stress Trend chart — 7/14/30 day line chart of composite stress score over time
7. Mental Recovery Score — recovery gauge with trend arrow and component breakdown
8. Relief Tools Quick Actions — cards linking to Breathing [53], Meditation [54], Yoga [55]
9. Biometric Integration — WHOOP HRV-based stress indicator (conditional)

**User flow**:
- **Arrives from**: Explore [18] via "Stress Management" card (stack push), Home Screen [12] via wellbeing quick-action card (stack push), SIA Chat [09] via deep-link ("let's look at your stress"), Wellbeing Dashboard via stress section tap
- **Primary exit**: Back to Explore [18] or Wellbeing Dashboard (stack pop)
- **Secondary exits**: Breathing Exercises [53] via relief tool card (stack push), Meditation [54] via relief tool card (stack push), Yoga [55] via relief tool card (stack push), SIA Chat [09] via coaching note tap (tab switch), Goal Detail [14] via stress-related goal tap (stack push)

---

## Layout

**Scroll behavior**: ScrollView (mixed content ~1400-1600pt, always scrollable)
**Tab bar visible**: Yes

### ASCII Wireframe

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤ ← STICKY
│  ← [back]   "Stress management" Lv.5│  ← Domain Header (56pt)
│  ════════════════════════════════   │  ← 2pt teal accent line
├─────────────────────────────────────┤
│                                     │  ← 16pt gap
│  ┌─────────────────────────────┐   │
│  │     CURRENT STRESS LEVEL    │   │  ← Eyebrow (teal)
│  │                             │   │
│  │         ╭───────╮           │   │  ← Stress Gauge
│  │       ╱    4.2    ╲         │   │     (semicircle dial)
│  │      ╱   moderate   ╲       │   │     composite score
│  │     ╱________________╲     │   │     center
│  │     ▼bio  ▼sent  ▼behav   │   │     3 sub-score dots
│  │      3.8    4.5    4.1     │   │
│  │                             │   │
│  │  last updated: 2 hrs ago   │   │
│  └─────────────────────────────┘   │
│                                     │  ← 16pt gap
│  QUICK LOG                          │  ← Eyebrow (teal)
│  ┌─────────────────────────────┐   │
│  │  How stressed are you?      │   │  ← Quick Log Card
│  │                             │   │
│  │  1 ─────────●───────── 10  │   │     stress slider
│  │              6              │   │     (current: 6)
│  │                             │   │
│  │  [Work] [Health] [Family]  │   │     trigger chips
│  │  [Finances] [Time pressure]│   │     (multi-select)
│  │  [Relationships] [Conflict]│   │
│  │  [Uncertainty] [Other]     │   │
│  │                             │   │
│  │  ┌──────────────────────┐  │   │
│  │  │       Log stress      │  │   │     orange CTA
│  │  └──────────────────────┘  │   │
│  └─────────────────────────────┘   │
│                                     │  ← 16pt gap
│  ┌─────────────────────────────┐   │
│  │ ┃ SIA: "Work stress has     │   │  ← SIA Coaching Note
│  │ ┃ been your top trigger this │   │     3pt purple left
│  │ ┃ week. A 5-min breathing   │   │     border
│  │ ┃ exercise after lunch could │   │
│  │ ┃ help break the pattern."  │   │
│  └─────────────────────────────┘   │
│                                     │  ← 24pt gap
│  TRIGGER ANALYSIS                   │  ← Eyebrow (teal)
│  ┌─────────────────────────────┐   │
│  │    ┌──────────┐             │   │  ← Donut Chart
│  │    │  ╭────╮  │  Work  35% │   │     + legend
│  │    │  │    │  │  Health 20%│   │
│  │    │  ╰────╯  │  Family 15%│   │
│  │    └──────────┘  Time   12%│   │
│  │                  Other  18%│   │
│  └─────────────────────────────┘   │
│                                     │  ← 24pt gap
│  STRESS TREND                       │  ← Eyebrow (teal)
│  ┌─────────────────────────────┐   │
│  │  [ 7d ][ 14d ][ 30d ]      │   │  ← Time range chips
│  │                             │   │
│  │  10│                        │   │  ← Line Chart
│  │    │     ╱╲                 │   │     orange solid
│  │   5│  ╱╱   ╲╲    ╱─        │   │     (past data)
│  │    │╱         ╲╲╱           │   │     purple dashed
│  │   0│________________________│   │     (projected)
│  │    M   T   W   T   F   S   S   │
│  │                             │   │
│  │  avg: 4.8  ↓12% vs last wk │   │  ← Summary line
│  └─────────────────────────────┘   │
│                                     │  ← 24pt gap
│  MENTAL RECOVERY                    │  ← Eyebrow (teal)
│  ┌─────────────────────────────┐   │
│  │                             │   │
│  │    ╭───╮                    │   │  ← Recovery Gauge
│  │    │72 │  ↑ improving       │   │     (circular, teal arc)
│  │    ╰───╯                    │   │     + trend arrow
│  │                             │   │
│  │  emotion: 68  sleep: 78    │   │  ← Component scores
│  │  activity: 71  social: 74  │   │
│  │                             │   │
│  │  prev: 65  (+7)             │   │  ← Previous comparison
│  └─────────────────────────────┘   │
│                                     │  ← 24pt gap
│  RELIEF TOOLS                       │  ← Eyebrow (teal)
│  ┌──────┐ ┌──────┐ ┌──────┐  →   │  ← Horizontal scroll
│  │  🫁  │ │  🧘  │ │  🧎  │       │     Relief tool cards
│  │Breath│ │Medita│ │ Yoga │       │     teal accent
│  │ [53] │ │ [54] │ │ [55] │       │
│  └──────┘ └──────┘ └──────┘       │
│                                     │  ← 16pt gap
│  BIOMETRIC STRESS                   │  ← Eyebrow (teal)
│  ┌─────────────────────────────┐   │  ← Conditional
│  │  WHOOP HRV stress  ●green  │   │     (if WHOOP connected)
│  │  HRV: 68ms  ↑ from 55ms   │   │
│  │  "Low physiological stress"│   │
│  └─────────────────────────────┘   │
│                                     │
│                          ┌────────┐│
│                          │+ log   ││ ← FAB (orange pill)
│                          └────────┘│
│                                     │  ← 48pt bottom breathing
├─────────────────────────────────────┤
│  Today  |  SIA  |  Goals  |  Me   │  ← Tab Bar
├─────────────────────────────────────┤
│         Home Indicator (34pt)       │
└─────────────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Domain Dashboard Header** — 56pt, FIXED, sticky with backdrop-blur on scroll
   - Purpose: Domain identification, back navigation, RPG level
   - Content: "Stress management", 2pt teal (#14B8A6) accent line, RPG "Lv.N" badge

2. **Current Stress Level Card** — ~200pt
   - Purpose: Composite stress score visualization — the screen's emotional anchor
   - Content: Semicircle gauge dial with composite score, severity label, 3 sub-score indicators, last-updated timestamp

3. **Quick Log Card** — ~280pt (auto-height)
   - Purpose: Fast stress check-in with rating and trigger identification
   - Content: Stress rating slider (1-10), trigger multi-select chips, "log stress" CTA

4. **SIA Coaching Note Card** — ~100pt (auto-height)
   - Purpose: AI-generated stress insight with actionable recommendation
   - Content: Purple 3pt left border + contextual SIA stress coaching message

5. **Trigger Analysis Card** — ~200pt
   - Purpose: Visualize most frequent stress triggers over time
   - Content: Donut chart + legend with trigger names and percentages

6. **Stress Trend Card** — ~240pt
   - Purpose: Stress score trend over 7/14/30 days
   - Content: Time range chips + line chart + average and comparison summary

7. **Mental Recovery Score Card** — ~180pt
   - Purpose: Show mental recovery state with component breakdown
   - Content: Recovery gauge + trend arrow + component sub-scores + previous comparison

8. **Relief Tools Section** — ~140pt
   - Purpose: Fast access to stress-relief features
   - Content: Horizontal scroll of 3 tool cards linking to [53], [54], [55]

9. **Biometric Integration Card** — ~100pt (conditional)
   - Purpose: HRV-based physiological stress indicator from WHOOP
   - Content: HRV value, trend, status label, color indicator dot

10. **Floating Action Button** — 48pt (fixed)
    - Purpose: Quick stress log shortcut
    - Content: Plus icon + "log"

---

## Components

### Domain Dashboard Header (STICKY)
- **Purpose**: Identifies Stress Management within the Wellbeing domain
- **Data source**: User's wellbeing skill level from RPG system
- **Visual treatment**: Identical to Screen 26 Domain Dashboard Header. Accent line color is wellbeing-teal (#14B8A6 at 80%), large title text is "Stress management", RPG badge uses teal (#14B8A6 text on #14B8A6 at 15% bg).
- **Size**: Full-width x 56pt

### Current Stress Level Card
- **Purpose**: The primary visual — a composite stress score derived from biometric (HRV, sleep), sentiment (journal/conversation analysis), and behavioral (activity patterns, screen time) signals. This is the screen's emotional anchor: the first thing the user absorbs.
- **Data source**: API — `GET /api/v1/wellbeing/stress/logs` (latest entry) providing `final_stress_score`, `biometric_stress_score`, `sentiment_stress_score`, `behavioral_stress_score`
- **Visual treatment**: ink-brown-800 glassmorphism card, 20pt radius, 24pt padding. 16pt horizontal margins.
- **Content**:
  - Eyebrow above card: "CURRENT STRESS LEVEL" — 12pt Sora Semibold, teal (#14B8A6), uppercase, +0.12em tracking
  - Semicircle gauge: 180pt wide x 100pt tall (half-circle arc). Centered horizontally within card.
    - Track: 8pt stroke, white at 8%
    - Arc fill: graduated from green (#34A853) at 0 degrees through teal (#14B8A6) at 90 degrees to orange (#FF5E00) at 135 degrees to red (#EF4444) at 180 degrees. Fill sweeps clockwise from left to the position corresponding to the score.
    - Needle: 2pt line, white, from arc center to current position on the arc
    - Score value: centered below arc center, 32pt Sora Bold, white. Shows composite score (e.g., "4.2")
    - Severity label: 14pt Sora Regular, white at 60%, 4pt below score. Maps to: "low" (1-3), "moderate" (4-6), "high" (7-8), "critical" (9-10)
  - Sub-score row: 16pt below gauge, horizontally spaced across card width. Three columns, each:
    - Label: 11pt Sora Regular, white at 40%, centered. "biometric" / "sentiment" / "behavioral"
    - Score: 15pt Sora Semibold, white, centered, 4pt below label. (e.g., "3.8", "4.5", "4.1")
    - Color indicator: 6pt circle below score, color-coded per severity (green <4, teal 4-6, orange 7-8, red 9-10)
  - Timestamp: 12pt Sora Regular, white at 30%, center-aligned, 12pt below sub-scores. "last updated: 2 hrs ago"
- **Variants**:
  - Populated (default): full gauge with all sub-scores
  - No biometric data: biometric sub-score shows "—" in white at 20%, other two sub-scores present
  - Day 1: gauge at 0, label "log your first check-in below", sub-scores hidden
  - Loading: skeleton shimmer on gauge and score areas
- **Gestures**: Tap card body expands to detailed score breakdown (inline expansion, 280ms ease-out-soft). Tap sub-score label shows tooltip with source explanation.
- **Size**: Full-width minus 32pt x ~200pt

### Quick Log Card
- **Purpose**: The primary interaction point — fast stress logging with rating and trigger identification. Supports both daily check-ins (`check_in_type: 'daily'`) and on-demand logs (`check_in_type: 'on_demand'`).
- **Data source**: User input → `POST /api/v1/wellbeing/stress/log` with `stress_rating`, `triggers`, `other_trigger`, `note`, `check_in_type`
- **Visual treatment**: ink-brown-800 glassmorphism card, 20pt radius, 24pt padding. 16pt horizontal margins.
- **Content**:
  - Eyebrow above card: "QUICK LOG" — standard teal eyebrow treatment
  - Prompt: "How stressed are you?" — 17pt Sora Semibold, white, left-aligned, 16pt below eyebrow
  - Stress slider: Full card width minus 48pt (24pt padding each side), 12pt below prompt
    - Track: 4pt height, --r-pill
    - Track fill (left of thumb): graduated from green (#34A853) at left to orange (#FF5E00) at center to red (#EF4444) at right
    - Unfilled track (right of thumb): white at 10%
    - Thumb: 28pt circle, white fill, --shadow-1. Active: scale(1.2), --shadow-2
    - End labels: "1" (left, 13pt Sora Regular, white at 40%) and "10" (right, 13pt Sora Regular, white at 40%)
    - Current value: centered below thumb, 20pt Sora Bold, white, floats with thumb position
    - Slider height region: 44pt (including touch target expansion)
  - Trigger chips: 16pt below slider. Horizontal wrap layout (FlexWrap), 8pt gap between chips. Multi-select — user can tap multiple.
    - Each chip: 32pt height, --r-pill corners, 12pt horizontal padding
    - Unselected: ink-900 bg, 1pt white at 10% border, 13pt Sora Semibold, white at 60%
    - Selected: teal (#14B8A6) at 15% bg, 1pt teal at 30% border, 13pt Sora Semibold, teal (#14B8A6)
    - Triggers: "Work", "Relationships", "Finances", "Health", "Family", "Uncertainty", "Time pressure", "Conflict", "Other"
    - "Other" chip: when selected, expands a 44pt text input field below the chip row (ink-brown-800 bg, --r-md, 14pt Sora Regular, white, placeholder "describe..." in white at 30%)
  - Optional note: "add a note" link — 13pt Sora Regular, white at 50%, 8pt below chips. Tapping expands a 64pt text area (same style as "Other" input).
  - "Log stress" CTA: In-Card CTA Button (48pt, full card width minus 48pt, --r-pill, orange #FF5E00, white text 16pt Sora Semibold), 16pt below triggers/note area. Disabled until slider has been moved.
- **Variants**:
  - Default: slider centered, no chips selected
  - Daily check-in mode: header reads "Daily stress check-in" with a subtle teal dot prefix
  - Partially filled: slider moved, some chips selected
  - Submitting: CTA shows white spinner, disabled
  - Success: CTA flashes green (600ms), card content resets with fade-out/fade-in (280ms), gauge above updates
- **Gestures**: Drag slider thumb. Tap chips to toggle. Tap CTA to submit. Swipe up on card to scroll past.
- **Size**: Full-width minus 32pt x ~280pt (auto-height based on chip wrapping)

### SIA Coaching Note Card
- **Purpose**: AI-generated stress insight — contextual observation connecting stress patterns to actionable recommendations. This is the AI interpretation layer that sits alongside the deterministic data.
- **Data source**: AI-generated via `GET /api/v1/wellbeing/stress/recommendations`
- **Visual treatment**: ink-brown-800 glassmorphism card, --r-xl (28pt), 24pt padding. **3pt left border in royal-purple (#7F24FF) at 40% opacity** — this is the contextual SIA variant (same pattern as Screens 14, 16, 30, 33), not the compact dot variant, because the stress coaching note is longer and includes actionable direction.
- **Content**:
  - SIA avatar: 16pt circle with purple gradient fill, top-left, 16pt from left edge, 16pt from top
  - Message text: 15pt Sora Regular, white at 80%, 40pt from card left edge, 16pt right padding, max 4 lines. Example: "Work stress has been your top trigger this week. A 5-min breathing exercise after lunch could help break the pattern."
  - "ask SIA" link: 13pt Sora Semibold, purple (#7F24FF) at 60%, right-aligned, 8pt below message. Tapping navigates to SIA Chat [09] with stress context pre-loaded.
- **Variants**:
  - With data: full coaching message
  - Day 1: "Log a few stress check-ins and I'll start spotting patterns for you."
  - Loading: skeleton shimmer on text
  - Low motivation: shorter, gentler message (1 line). "You're handling a lot. One small thing today."
- **Gestures**: Tap card body navigates to SIA Chat [09] with stress context. Tap "ask SIA" link same behavior.
- **Size**: Full-width minus 32pt x ~100pt (auto-height)

### Trigger Analysis Card
- **Purpose**: Visualize the user's most frequent stress triggers as a donut chart, enabling self-awareness of recurring patterns
- **Data source**: API — `GET /api/v1/wellbeing/stress/triggers` returning trigger name + frequency percentage
- **Visual treatment**: ink-brown-800 glassmorphism card, 20pt radius, 24pt padding
- **Content**:
  - Eyebrow above card: "TRIGGER ANALYSIS" — standard teal eyebrow treatment
  - Two-column layout inside card:
    - Left column (50% width): Donut chart
      - Outer diameter: 120pt, inner diameter: 64pt (donut hole)
      - Segments: each trigger gets a distinct color from a stress-specific palette:
        - Work: #EF4444 (red)
        - Relationships: #EC4899 (pink)
        - Finances: #10B981 (emerald)
        - Health: #14B8A6 (teal)
        - Family: #F59E0B (amber)
        - Uncertainty: #6366F1 (indigo)
        - Time pressure: #FF5E00 (orange)
        - Conflict: #A855F7 (purple)
        - Other: white at 30%
      - Center text: total log count, 16pt Sora Semibold, white. "28 logs" below in 11pt Regular, white at 40%.
      - Segment hover/tap: selected segment scales out 4pt, label appears above chart
    - Right column (50% width): Legend
      - Each row: 8pt color circle + trigger name (13pt Sora Regular, white at 70%) + percentage (13pt Sora Semibold, white), right-aligned
      - Max 5 triggers shown; remaining grouped as "Other"
      - 8pt vertical gap between legend rows
  - Time range: "last 30 days" — 12pt Sora Regular, white at 30%, center-aligned below chart, 8pt below
- **Variants**:
  - Populated: donut with 3-9 segments + legend
  - Sparse (<5 logs): simplified bar chart instead of donut (horizontal bars with trigger names)
  - Empty: "log stress a few times to see your trigger patterns" in 15pt Regular, white at 40%, centered
  - Loading: skeleton shimmer on chart area
- **Gestures**: Tap donut segment to highlight and show detail. Tap legend row to highlight corresponding segment.
- **Size**: Full-width minus 32pt x ~200pt

### Stress Trend Card
- **Purpose**: Visualize stress score trajectory over 7, 14, or 30 days to reveal patterns and improvement
- **Data source**: API — `GET /api/v1/wellbeing/stress/trends` with period parameter
- **Visual treatment**: ink-brown-800 glassmorphism card, 20pt radius, 24pt padding
- **Content**:
  - Eyebrow above card: "STRESS TREND" — standard teal eyebrow treatment
  - Time range chips (inside card, top): Three pill chips — "7d" / "14d" / "30d"
    - Active: teal (#14B8A6) at 15% bg, teal text, 1pt teal border
    - Inactive: transparent, 1pt white at 10% border, white at 60% text
    - Chip height: 28pt, --r-pill, 12pt horizontal padding, 8pt gap
  - Line chart: Standard Line Chart pattern (established Screen 14)
    - Chart area: full card width minus 48pt x 140pt
    - X-axis: dates (12pt Regular, white at 30%)
    - Y-axis: stress score 0-10 (12pt Regular, white at 30%), 2-unit increments
    - Past data line: 2pt solid, orange (#FF5E00), dot markers (6pt circles, orange fill) at each data point
    - Projected line (AI): 2pt dashed, purple (#7F24FF) at 60% — extends 3 days ahead
    - Fill area below past line: orange at 5% opacity
    - Grid lines: 1pt, white at 3%, horizontal only
    - "Safe zone" band: green (#34A853) at 3% fill from Y=0 to Y=3, subtle visual anchor showing low-stress region
  - Summary row: 12pt below chart. Left: "avg: 4.8" (15pt Sora Semibold, white). Right: trend comparison — "↓12% vs last wk" in green (#34A853) if improving, "↑8% vs last wk" in orange (#FF5E00) if worsening, "same as last wk" in white at 50% if stable.
- **Variants**:
  - Populated: full chart with data points
  - Sparse (<3 data points): shows available points connected, "log more to see trends" helper text
  - Empty: "no data yet" centered in chart area
  - Loading: skeleton shimmer
- **Gestures**: Tap time range chip to switch period (chart crossfades, 280ms). Touch-and-drag on chart shows value tooltip at touch point. Tap data point dot shows date + score tooltip.
- **Size**: Full-width minus 32pt x ~240pt

### Mental Recovery Score Card
- **Purpose**: Show the user's mental recovery score — a composite measure of how well they are bouncing back from stress, drawn from `mental_recovery_scores` table
- **Data source**: API — `mental_recovery_scores` table providing `recovery_score`, `components`, `emotion_contribution`, `factors`, `trend`, `previous_score`
- **Visual treatment**: ink-brown-800 glassmorphism card, 20pt radius, 24pt padding
- **Content**:
  - Eyebrow above card: "MENTAL RECOVERY" — standard teal eyebrow treatment
  - Recovery gauge: Centered, 96pt diameter circular gauge
    - Track: 6pt stroke, white at 8%
    - Arc fill: teal (#14B8A6), clockwise from 12 o'clock, to percentage of 100. Color shifts: teal (>60%), orange (#FF5E00) at 30-60%, red (#EF4444) below 30%
    - Center score: 28pt Sora Bold, white. (e.g., "72")
    - Center label: 12pt Sora Regular, white at 40%, 4pt below score. "of 100"
  - Trend indicator: Right of gauge, vertically centered
    - Arrow: 16pt, green (#34A853) "↑" if improving, orange (#FF5E00) "↓" if declining, white at 40% "→" if stable
    - Label: 14pt Sora Semibold, matching arrow color. "improving" / "declining" / "stable"
  - Component scores: 16pt below gauge, 2x2 grid layout, 8pt gaps
    - Each cell: label (11pt Sora Regular, white at 40%) + score (15pt Sora Semibold, white)
    - Components: "emotion: 68", "sleep: 78", "activity: 71", "social: 74" (sourced from `components` JSON field)
  - Previous comparison: 8pt below components, center-aligned
    - "prev: 65 (+7)" — 13pt Sora Regular, white at 50%. The delta "(+7)" is green if positive, orange if negative.
- **Variants**:
  - Populated: full gauge + components
  - Day 1: gauge empty, "recovery score builds over time" centered in card
  - Loading: skeleton shimmer
- **Gestures**: Tap card for expanded breakdown (inline expansion showing emotion contribution details from `emotion_contribution` and `factors` fields)
- **Size**: Full-width minus 32pt x ~180pt

### Relief Tools Quick Actions Section
- **Purpose**: Fast-track access to stress relief features — the user's escape hatch when stress is high
- **Data source**: Static navigation cards + AI recommendation ordering via `GET /api/v1/wellbeing/stress/recommendations`
- **Visual treatment**: Horizontal ScrollView, no enclosing card — cards sit directly on ink-900 background
- **Content**:
  - Eyebrow: "RELIEF TOOLS" — standard teal eyebrow treatment
  - Three cards in horizontal scroll, each:
    - Size: 120pt wide x 100pt tall
    - Background: ink-brown-800 glassmorphism, 16pt radius
    - Icon: 32pt, centered, white at 80%. Breathing: lungs icon. Meditation: lotus icon. Yoga: yoga pose icon.
    - Label: 14pt Sora Semibold, white, centered, 8pt below icon. "Breathing", "Meditation", "Yoga"
    - Teal accent: 2pt bottom border, teal (#14B8A6) at 30%
    - If SIA-recommended: subtle teal glow (teal at 5% radial gradient from top-center), small "SIA pick" badge (11pt Sora Semibold, purple #7F24FF at 60%, top-right of card)
    - Gap: 12pt between cards
    - Leading margin: 16pt
  - Optional 4th card: "More" with ellipsis icon, same dimensions, linking to a full relief tools list
- **Variants**:
  - Default: 3 tool cards
  - SIA-prioritized: cards reorder based on AI recommendation (e.g., if stress is physical, Yoga card moves first)
  - High stress override: cards show urgent styling — teal border brightens to full opacity, subtle pulse animation on the SIA-recommended card (800ms, ease-flow)
- **Gestures**: Horizontal scroll. Tap card navigates to respective screen ([53], [54], [55]).
- **Size**: Full-width x ~140pt (card height + eyebrow + gaps)

### Biometric Integration Card (Conditional)
- **Purpose**: Show HRV-based physiological stress indicator when WHOOP is connected, bridging subjective and objective stress data
- **Data source**: WHOOP API via Connected Services, mapped to `biometric_stress_score` in `stress_logs`
- **Visual treatment**: ink-brown-800 glassmorphism card, --r-xl (28pt), 24pt padding
- **Content**:
  - Eyebrow above card: "BIOMETRIC STRESS" — standard teal eyebrow treatment
  - Row layout:
    - Left: "WHOOP HRV stress" — 15pt Sora Semibold, white
    - Right: color indicator dot (8pt circle). Green (#34A853) = low physiological stress (HRV high), amber (#F59E0B) = moderate, red (#EF4444) = high physiological stress (HRV low)
  - Detail row: 8pt below header row
    - "HRV: 68ms" — 16pt Sora Semibold, white
    - Trend: "↑ from 55ms" — 13pt Sora Regular, green (#34A853) if improving, orange if declining
  - Status label: 13pt Sora Regular, white at 50%. "Low physiological stress" / "Moderate physiological stress" / "High physiological stress"
- **Variants**:
  - Connected + data: full display as above
  - Connected + syncing: "Syncing with WHOOP..." with inline spinner
  - Not connected: compact 64pt prompt — "Connect WHOOP for biometric stress insights" + right chevron. Tapping navigates to Connected Services [22].
  - Error: "Could not load WHOOP data" + "retry" link
- **Gestures**: Tap card (when connected) for expanded HRV detail. Tap (when not connected) navigates to Connected Services [22].
- **Size**: Full-width minus 32pt x ~100pt (connected) or ~64pt (not connected)

### Floating Action Button
- **Purpose**: Quick stress log shortcut — always accessible
- **Visual treatment**: Extended Pill FAB pattern (established Screen 35). Orange (#FF5E00) fill. Label: "log".
- **Content**: Plus icon (16pt, white) + 8pt gap + "log" (15pt Sora Semibold, white)
- **Scroll behavior**: Fades out on scroll down (opacity 0 + translateY +20pt, 160ms). Fades back in on scroll up or stop.
- **Gestures**: Tap scrolls to Quick Log card and focuses the slider (smooth scroll, 280ms). If Quick Log card is already in viewport, pulse-highlights its border (teal at 30% flash, 600ms).
- **Size**: Auto-width (~90pt) x 48pt

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Base |
| Card surfaces | #211008 | ink-brown-800 | Glassmorphism |
| Header accent line | #14B8A6 at 80% | wellbeing-teal | Domain identification |
| Header title dot | #14B8A6 | wellbeing-teal | — |
| RPG skill badge text + bg | #14B8A6 at 100% / 15% | wellbeing-teal | Domain color on badge |
| Section eyebrow text | #14B8A6 | wellbeing-teal | Domain eyebrow labels |
| Gauge arc (low zone) | #34A853 | forest-green | Safe stress range |
| Gauge arc (moderate zone) | #14B8A6 | wellbeing-teal | Mid-range |
| Gauge arc (high zone) | #FF5E00 | brand-orange | Elevated stress |
| Gauge arc (critical zone) | #EF4444 | error-red | Critical stress |
| Trigger chip selected bg | #14B8A6 at 15% | wellbeing-teal | Selected trigger state |
| Trigger chip selected border | #14B8A6 at 30% | wellbeing-teal | Selected trigger border |
| Trigger chip selected text | #14B8A6 | wellbeing-teal | Selected trigger label |
| Recovery gauge arc | #14B8A6 | wellbeing-teal | Recovery fill |
| Relief tool card bottom border | #14B8A6 at 30% | wellbeing-teal | Tool card accent |
| SIA coaching note left border | #7F24FF at 40% | royal-purple | 10% rule — AI indicator |
| SIA avatar circle | #7F24FF gradient | royal-purple | 10% rule — AI avatar |
| "ask SIA" link | #7F24FF at 60% | royal-purple | 10% rule — AI link |
| Projected trend line | #7F24FF at 60% | royal-purple | AI-projected data |
| "SIA pick" badge text | #7F24FF at 60% | royal-purple | AI recommendation |
| "Log stress" CTA | #FF5E00 | brand-orange | Primary CTA |
| FAB background | #FF5E00 | brand-orange | CTA |
| Trend chart past line | #FF5E00 | brand-orange | Actual data |
| Trend chart fill area | #FF5E00 at 5% | brand-orange | Subtle area fill |
| Trend improving indicator | #34A853 | forest-green | Positive trend |
| Recovery improving arrow | #34A853 | forest-green | Positive change |
| WHOOP good indicator | #34A853 | forest-green | Low physiological stress |
| WHOOP moderate indicator | #F59E0B | amber | Moderate physiological stress |
| WHOOP high indicator | #EF4444 | error-red | High physiological stress |
| Donut segments | Various (see Trigger Analysis) | — | Each trigger has distinct color |
| Primary text | #FFFFFF | white | Scores, headings |
| Secondary text | white at 70% | — | Legend labels, body |
| Tertiary text | white at 50% | — | Status labels, descriptions |
| Quaternary text | white at 40% | — | Eyebrows, sub-labels, timestamps |
| Disabled text | white at 30% | — | Timestamps, placeholder hints |

**60/30/10 verification**: Orange on CTA buttons, FAB, trend line, stress gauge high zone, and slider fill — the primary action color. Green on positive trends, recovery improvements, low-stress indicators, and safe-zone band. Purple limited to SIA coaching note border, SIA avatar, "ask SIA" link, projected trend line, and "SIA pick" badge — five small elements, within the 10% rule. Domain teal (#14B8A6) on header accent, eyebrow labels, RPG badge, trigger chip selection states, recovery gauge, and relief tool accents — identification only, never on CTAs. Ratio holds.

---

## Interaction States

### Stress Slider Thumb
| State | Visual | Haptic |
|-------|--------|--------|
| Default | 28pt white circle, --shadow-1 | — |
| Pressed/Dragging | scale(1.2), --shadow-2, value label appears below | light impact on first touch |
| At integer boundary | Snaps to integer, value label pulses | light impact |
| Released | scale(1.0), --shadow-1, value persists | — |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Trigger Chip
| State | Visual | Haptic |
|-------|--------|--------|
| Default (unselected) | ink-900 bg, white 10% border, white 60% text | — |
| Pressed | bg darkens, scale(0.97) | light impact |
| Selected | teal 15% bg, teal 30% border, teal text | medium impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### "Log stress" CTA Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange fill, white text, --r-pill | — |
| Pressed | darker orange (#E55400), scale(0.97) | light impact |
| Disabled | 50% opacity (slider not moved) | — |
| Loading | white spinner replaces text | — |
| Success | green glow (600ms), text "logged" | success notification |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### SIA Coaching Note Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800, purple left border | — |
| Pressed | scale(0.97), bg darkens to #1a0c06 | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Loading | skeleton shimmer on text area | — |

### Donut Chart Segment
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Normal arc segment | — |
| Pressed/Selected | Segment scales outward 4pt, label tooltip appears | light impact |
| Focus-visible | 2pt orange ring around segment | — |

### Stress Trend Chart Data Point
| State | Visual | Haptic |
|-------|--------|--------|
| Default | 6pt orange dot | — |
| Pressed | scale(1.5), tooltip with date + score appears | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Time Range Chip (Trend)
| State | Visual | Haptic |
|-------|--------|--------|
| Default (inactive) | transparent bg, white 10% border, white 60% text | — |
| Pressed | bg white 5%, scale(0.97) | light impact |
| Active | teal 15% bg, teal text, teal border | medium impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Relief Tool Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800, teal bottom border at 30% | — |
| Pressed | scale(0.95), bg lightens (white 3% overlay) | medium impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Recovery Gauge
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Teal arc fill | — |
| Pressed | Card expands to show component detail | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### RPG Skill Badge
| State | Visual | Haptic |
|-------|--------|--------|
| Default | teal text, 15% opacity pill bg | — |
| Pressed | scale(0.95), bg opacity 25% | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Floating Action Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange bg, white icon+text, --shadow-2 | — |
| Pressed | darker orange (#E55400), scale(0.95), --shadow-1 | medium impact |
| Focus-visible | 2pt orange ring, offset 4pt | — |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Pull down | ScrollView | Pull-to-refresh (reload all stress data) |
| Drag | Stress slider thumb | Adjust stress rating (1-10) |
| Tap | Trigger chip | Toggle chip selection (multi-select) |
| Tap | "Log stress" CTA | Submit stress log |
| Tap | SIA coaching note card | Navigate to SIA Chat [09] with stress context |
| Tap | "ask SIA" link | Navigate to SIA Chat [09] |
| Tap | Donut segment | Highlight segment, show label |
| Tap | Legend row | Highlight corresponding donut segment |
| Touch-drag | Stress trend chart | Show value tooltip at touch point |
| Tap | Time range chip | Switch trend period (7d/14d/30d) |
| Tap | Recovery gauge card | Expand component breakdown |
| Tap | Relief tool card | Stack push to Breathing [53] / Meditation [54] / Yoga [55] |
| Tap | WHOOP card (not connected) | Stack push to Connected Services [22] |
| Tap | FAB | Scroll to Quick Log card |
| Tap | Back button | Pop stack |
| Swipe right from edge | Screen | iOS back gesture |
| Horizontal swipe | Relief Tools section | Scroll cards |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Screen content | Mount | Staggered fade-in: stress gauge (0ms), quick log (80ms), SIA note (160ms), trigger analysis (240ms), trend (320ms), recovery (400ms), relief tools (480ms) | 280ms each | ease-out-soft |
| Header collapse | Scroll past 40pt | Sticky header engages, backdrop-blur fades in | 160ms | ease-out-soft |
| Stress gauge arc | Mount / data update | Arc sweeps from 0 to current score position | 520ms | ease-flow |
| Stress gauge sub-scores | Mount | Count-up from 0 to value, 80ms stagger per sub-score | 280ms each | ease-out-soft |
| Slider thumb drag | User interaction | Value label follows thumb in real-time | continuous | — |
| Slider value display | Integer snap | Scale pulse (1.0 → 1.1 → 1.0) | 160ms | ease-out-soft |
| Trigger chip select | Tap | Background fades to teal, border appears, text color transitions | 160ms | ease-out-soft |
| Trigger chip deselect | Tap | Reverse of select | 160ms | ease-out-soft |
| "Other" text input | "Other" chip selected | Height expands from 0 to 44pt, fade-in | 280ms | ease-out-soft |
| Log success | CTA tap | CTA green glow (600ms), gauge updates with arc sweep (520ms), Quick Log resets with crossfade (280ms) | combined ~800ms | ease-out-soft / ease-flow |
| Donut chart segments | Enter viewport | Segments draw in clockwise from 12 o'clock, 60ms stagger per segment | 280ms each | ease-flow |
| Donut segment select | Tap | Selected segment translates outward 4pt, others dim to 40% opacity | 280ms | ease-out-soft |
| Trend chart line | Enter viewport | Line draws left to right (stroke-dashoffset) | 520ms | ease-flow |
| Trend chart fill | After line draws | Area fill fades in below line | 280ms | ease-out-soft |
| Projected line | After past line | Dashed line draws from last real data point forward | 280ms | ease-out-soft |
| Time range switch | Chip tap | Chart crossfades to new data | 280ms | ease-out-soft |
| Recovery gauge arc | Enter viewport | Arc draws from 0 to current percentage | 520ms | ease-flow |
| Recovery score count | Enter viewport | Count-up from 0 to value | 280ms | ease-out-soft |
| Component scores | After gauge | Staggered fade-in, 60ms stagger per component | 160ms each | ease-out-soft |
| Relief tool cards | Enter viewport | Staggered scale-in (0.8→1) + fade-in, 80ms stagger | 280ms each | ease-out-soft |
| FAB | Mount | scale(0.8→1) + opacity(0→1), 500ms delay | 280ms | ease-out-soft |
| FAB scroll hide | Scroll down | fade out + translateY(+20pt) | 160ms | ease-out-soft |
| FAB scroll show | Scroll up/stop | fade in + translateY(0) | 160ms | ease-out-soft |

**Screen transition**:
- **Enter**: Standard stack push — slides in from right (280ms, ease-out-soft)
- **Exit**: Stack pop — slides out to right (280ms, ease-out-soft)

---

## Data Model

### stress_logs table
| Field | Type | Notes |
|-------|------|-------|
| stress_rating | integer (1-10) | User-provided subjective rating |
| triggers | text[] | Array: Work, Relationships, Finances, Health, Family, Uncertainty, Time pressure, Conflict, Other |
| other_trigger | text | Free-text when "Other" selected |
| note | text | Optional user note |
| check_in_type | enum | 'daily' or 'on_demand' |
| biometric_stress_score | decimal | HRV-derived from WHOOP (null if not connected) |
| sentiment_stress_score | decimal | Derived from journal/conversation sentiment analysis |
| behavioral_stress_score | decimal | Derived from activity patterns, screen time, sleep |
| final_stress_score | decimal | Weighted composite of biometric + sentiment + behavioral |

### mental_recovery_scores table
| Field | Type | Notes |
|-------|------|-------|
| recovery_score | integer (0-100) | Composite recovery score |
| components | jsonb | Sub-scores: emotion, sleep, activity, social |
| emotion_contribution | jsonb | Breakdown of emotional factors |
| factors | jsonb | Contributing factors to recovery |
| trend | enum | 'improving', 'declining', 'stable' |
| previous_score | integer | Last period's recovery score for comparison |

### API Endpoints
| Method | Path | Purpose |
|--------|------|---------|
| POST | /api/v1/wellbeing/stress/log | Submit a stress log entry |
| GET | /api/v1/wellbeing/stress/logs | Retrieve stress history (paginated) |
| GET | /api/v1/wellbeing/stress/trends | Stress trends with period parameter (7d/14d/30d) |
| GET | /api/v1/wellbeing/stress/triggers | Aggregated trigger frequency data |
| GET | /api/v1/wellbeing/stress/recommendations | AI-generated stress relief recommendations |

---

## Empty States

### Day 1 (new user)
- **Stress Gauge**: Arc at 0 position, score displays "—", severity label replaced with "log your first check-in below" in 15pt Sora Regular, white at 50%. Sub-scores hidden.
- **Quick Log**: Fully visible and functional — this is the primary onboarding action. Slider centered at 5. Prompt text warmer: "How are you feeling right now?" Helper text below: "your stress data stays private" in 12pt Regular, white at 30%.
- **SIA Coaching Note**: "Log a few stress check-ins and I'll start spotting patterns for you. No rush — even one a day helps." Purple border present but message is introductory.
- **Trigger Analysis**: Hidden entirely until 5+ logs exist. Space reclaimed by content above shifting down.
- **Stress Trend**: Card visible but chart area shows centered message: "your trend will appear after a few check-ins" in 15pt Regular, white at 40%. Time range chips disabled (50% opacity).
- **Mental Recovery**: Card visible, gauge at 0. "recovery score builds over time" centered in card.
- **Relief Tools**: Fully visible — these don't require data. SIA-recommended badge absent until enough data exists. Cards show full interactivity.
- **Biometric Integration**: compact 64pt prompt "Connect WHOOP for biometric stress insights" if not connected. Hidden entirely if wearable integration isn't relevant (no WHOOP in Connected Services).
- **FAB**: Visible and functional.

### Established user (zero stress state)
- **Stress Gauge**: Arc at low position (1-2 range), green zone. Score displays actual value. Label: "low".
- **SIA Coaching Note**: Celebratory but not excessive: "Your stress levels have been consistently low this week. Whatever you're doing, it's working."
- **All sections**: Populated with historical data. Trend chart may show a downward trajectory (which is positive). Recovery score likely high.

---

## Motivation Adaptation

- **Low motivation**: SIA coaching note is shorter and gentler (1 line): "One check-in is enough today." Quick Log card is the only section below the gauge. Trigger Analysis, Stress Trend, and Mental Recovery cards hidden. Relief Tools remain visible but simplified (shows only the SIA-recommended tool, not all three). Biometric Integration hidden. Goal: the screen fits in one viewport — gauge + quick log + one relief tool. No data overwhelm.

- **Medium motivation**: Full screen as described above. All sections visible. Quick Log shows all 9 trigger chips. Trend chart defaults to 7d view. Recovery gauge shows full component breakdown. Three relief tool cards visible.

- **High motivation**: Additional analytics appear below Mental Recovery:
  - **Weekly stress heatmap**: 7x4 calendar heatmap (same pattern as Screen 38) showing daily average stress levels, graduated teal-to-orange fill based on stress severity
  - **Trigger correlation card**: SIA-generated insight connecting triggers to time-of-day or day-of-week patterns ("your work stress peaks on Mondays and Wednesdays between 2-4pm")
  - **Comparative stats**: "this week vs last week" mini-stat row showing avg stress, log count, top trigger comparison
  - Trend chart defaults to 30d view with AI projection visible
  - Recovery card auto-expanded to show full factor breakdown
  - SIA coaching note is longer (3-4 lines) with specific data references

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Header title | Sora | Semibold 600 | 20pt | 28pt | #FFFFFF |
| RPG skill badge | Sora | Semibold 600 | 13pt | 18pt | #14B8A6 |
| Section eyebrow | Sora | Semibold 600 | 12pt | 16pt | #14B8A6 |
| Stress gauge score | Sora | Bold 700 | 32pt | 40pt | #FFFFFF |
| Stress gauge severity label | Sora | Regular 400 | 14pt | 20pt | #FFFFFF at 60% |
| Sub-score label | Sora | Regular 400 | 11pt | 16pt | #FFFFFF at 40% |
| Sub-score value | Sora | Semibold 600 | 15pt | 20pt | #FFFFFF |
| Gauge timestamp | Sora | Regular 400 | 12pt | 16pt | #FFFFFF at 30% |
| Quick log prompt | Sora | Semibold 600 | 17pt | 24pt | #FFFFFF |
| Slider endpoint labels | Sora | Regular 400 | 13pt | 18pt | #FFFFFF at 40% |
| Slider current value | Sora | Bold 700 | 20pt | 28pt | #FFFFFF |
| Trigger chip (unselected) | Sora | Semibold 600 | 13pt | 18pt | #FFFFFF at 60% |
| Trigger chip (selected) | Sora | Semibold 600 | 13pt | 18pt | #14B8A6 |
| "Other" text input | Sora | Regular 400 | 14pt | 20pt | #FFFFFF |
| Optional note link | Sora | Regular 400 | 13pt | 18pt | #FFFFFF at 50% |
| Log CTA text | Sora | Semibold 600 | 16pt | 22pt | #FFFFFF |
| SIA coaching message | Sora | Regular 400 | 15pt | 22pt | #FFFFFF at 80% |
| "ask SIA" link | Sora | Semibold 600 | 13pt | 18pt | #7F24FF at 60% |
| Donut center count | Sora | Semibold 600 | 16pt | 22pt | #FFFFFF |
| Donut center label | Sora | Regular 400 | 11pt | 16pt | #FFFFFF at 40% |
| Legend trigger name | Sora | Regular 400 | 13pt | 18pt | #FFFFFF at 70% |
| Legend percentage | Sora | Semibold 600 | 13pt | 18pt | #FFFFFF |
| Chart time range label | Sora | Regular 400 | 12pt | 16pt | #FFFFFF at 30% |
| Trend chart axis labels | Sora | Regular 400 | 12pt | 16pt | #FFFFFF at 30% |
| Trend summary average | Sora | Semibold 600 | 15pt | 20pt | #FFFFFF |
| Trend summary comparison | Sora | Regular 400 | 15pt | 20pt | #34A853 or #FF5E00 |
| Recovery gauge score | Sora | Bold 700 | 28pt | 36pt | #FFFFFF |
| Recovery gauge label | Sora | Regular 400 | 12pt | 16pt | #FFFFFF at 40% |
| Recovery trend label | Sora | Semibold 600 | 14pt | 20pt | per trend color |
| Component score label | Sora | Regular 400 | 11pt | 16pt | #FFFFFF at 40% |
| Component score value | Sora | Semibold 600 | 15pt | 20pt | #FFFFFF |
| Previous comparison | Sora | Regular 400 | 13pt | 18pt | #FFFFFF at 50% |
| Relief tool label | Sora | Semibold 600 | 14pt | 20pt | #FFFFFF |
| "SIA pick" badge | Sora | Semibold 600 | 11pt | 16pt | #7F24FF at 60% |
| Biometric header | Sora | Semibold 600 | 15pt | 20pt | #FFFFFF |
| Biometric HRV value | Sora | Semibold 600 | 16pt | 22pt | #FFFFFF |
| Biometric trend text | Sora | Regular 400 | 13pt | 18pt | per trend color |
| Biometric status label | Sora | Regular 400 | 13pt | 18pt | #FFFFFF at 50% |
| FAB label | Sora | Semibold 600 | 15pt | 20pt | #FFFFFF |

---

## Accessibility

- **Stress gauge**: VoiceOver reads "Current stress level: 4.2 out of 10, moderate. Biometric: 3.8, Sentiment: 4.5, Behavioral: 4.1"
- **Slider**: Accessible slider role with min=1, max=10, step=1. VoiceOver announces current value on change.
- **Trigger chips**: Toggle button role. VoiceOver announces "Work, selected" or "Work, not selected"
- **Donut chart**: Each segment has accessible label with trigger name and percentage. Total is announced first.
- **Line chart**: Summary text provided for screen readers: "Stress trend over 7 days, average 4.8, down 12% from last week"
- **Recovery gauge**: VoiceOver reads "Mental recovery score: 72 of 100, improving"
- **Color**: All stress severity states use both color AND text labels (never color alone). Gauge severity labels ("low", "moderate", "high", "critical") are always visible.
- **Touch targets**: All interactive elements meet 44x44pt minimum. Slider thumb expanded touch target is 44pt.
- **Reduced motion**: Gauge arc appears at final position without sweep. Chart lines appear without draw animation. Donut segments appear without staggered draw. All transitions reduce to simple fade (160ms).

---

## Error Handling

| Error Scenario | Visual Treatment | Recovery Action |
|----------------|------------------|-----------------|
| Stress log submission fails | CTA shows error state (red border flash, 280ms), "could not log — try again" toast (top, 3s auto-dismiss) | CTA returns to default state, user data preserved in form |
| Trend data load fails | Chart area shows "could not load trends" in 15pt Regular, white at 40%, centered + "retry" link in orange | Tap retry re-fetches |
| Trigger data load fails | Donut area shows "could not load triggers" + "retry" | Tap retry re-fetches |
| Recovery score load fails | Card shows "could not load recovery data" + "retry" | Tap retry re-fetches |
| WHOOP connection error | Card shows "could not load WHOOP data" + "retry" link | Tap retry re-syncs |
| SIA note load fails | Card shows "could not load SIA note" as placeholder text in 15pt Regular, white at 40% | Auto-retries on next pull-to-refresh |
| Network offline | All API-dependent sections show last cached data with "offline — showing cached data" banner (48pt, ink-brown-800, white at 50% text, top of scroll area). Quick Log remains functional — logs queue locally and sync when online. | Banner includes "tap to retry" when connectivity returns |
| Stress log rate limit | "You've already logged recently. Next check-in available in Xm." Toast message, Quick Log CTA disabled with countdown. | CTA re-enables when cooldown expires |

---

## Cross-References

- **Navigates to**: Screen [53] — Breathing Exercises (via relief tool card, stack push), Screen [54] — Meditation (via relief tool card, stack push), Screen [55] — Yoga (via relief tool card, stack push), Screen [09] — SIA Chat (via coaching note tap, tab switch with stress context), Screen [14] — Goal Detail (via stress-related goal tap, stack push), Screen [22] — Connected Services (via WHOOP connect prompt, stack push)
- **Navigates from**: Screen [18] — Explore Section (stack push), Screen [12] — Home Screen (via wellbeing quick-action card, stack push), Screen [09] — SIA Chat (deep-link when SIA references stress data)
- **Shared components with**: Screen [26] — Fitness Dashboard (Domain Dashboard Header, Domain Dashboard Template slot structure, WHOOP Integration Card pattern, FAB), Screen [35] — Learning Dashboard (SIA Coaching Note Card contextual variant, Active Goals Section pattern, Streak Tracker), Screen [36] — Creativity Dashboard (Practice Heatmap pattern reused as weekly stress heatmap in high-motivation variant), Screen [38] — Habits (Calendar Heatmap in high-motivation variant), Screen [14] — Goal Detail (Line Chart pattern for stress trend)
- **Patterns used**: Domain Dashboard Template (established Screen 26), Domain Dashboard Header (Screen 26), SIA Coaching Note Card — Contextual Variant (Screen 30), Line Chart (Screen 14), In-Card CTA Button (Screen 26), FAB Extended Pill (Screen 35), Section Eyebrow Label (Screen 12), 8-State Model, Content Entry Animation (staggered fade-in), Pull-to-Refresh
- **Patterns established**: Stress Gauge (semicircle dial with graduated severity arc + sub-score row), Stress Slider (graduated track with floating value label), Trigger Multi-Select Chips (domain-colored multi-select chip row with "Other" expansion), Trigger Donut Chart (color-coded donut with interactive segments and legend), Mental Recovery Gauge (circular gauge with component breakdown grid and trend arrow), Relief Tool Quick Action Cards (icon + label navigation cards with SIA recommendation badges)
