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
    - Arc fill: ALWAYS brand-orange (#FF5E00) via arc-following --grad-orange (conic-mask behind a circular mask — an SVG linearGradient cannot sweep along an arc). The filled angle = (score/10)·240° and is driven by the real composite score (no hardcoded fill). The arc is NEVER recoloured to alarm-red as the score rises (VK-015 + S52-V01); severity is read from the number + glyph + the always-visible severity word.
    - No needle: the open 240° ArcGauge reads its value from the filled arc end + the dominant center number (the prior fixed needle is removed).
    - Score value: centered below arc center, 32pt Sora Bold, white. Shows composite score (e.g., "4.2")
    - Severity label: 14pt Sora Regular, white at 60%, 4pt below score. Maps to: "low" (1-3), "moderate" (4-6), "high" (7-8), "critical" (9-10)
  - Sub-score row: 16pt below gauge, horizontally spaced across card width. Three columns, each:
    - Label: 11pt Sora Regular, white at 40%, centered. "biometric" / "sentiment" / "behavioral"
    - Score: 15pt Sora Semibold, white, centered, 4pt below label. (e.g., "3.8", "4.5", "4.1")
    - Source read (replaces colour-only dot): a small --color-domain-* identity tick + a VISIBLE source glyph (pulse / chat / steps for biometric / sentiment / behavioral) + the value — so the contributing signal is legible without colour (S52-V02). No severity-coloured dot (colour-alone is removed).
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
    - Track fill (left of thumb): a single continuous brand-orange (#FF5E00) fill — stress is a LEVEL, never alarm-coded; the reading is carried by the value + the severity word, never a green→orange→red gradient (S52-V01/V07)
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
      - Segments (honest, 60/30/10-safe — never rainbow, never purple, per S52-V03 + CONSISTENCY Donut): the **largest trigger slice = brand-orange #FF5E00** (primary data ink); the remaining slices = **warm neutral tints** in descending share (white at 40% / 28% / 20% / 12% / 8%). Slice meaning is read from the legend label + percentage, never from a per-trigger hue; a 0-count trigger is omitted (never a zero-width wedge). 2px slice gap reveals ink-brown-800 for carved separation.
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
    - Arc fill: brand-orange (#FF5E00) via arc-following --grad-orange (conic-mask), clockwise from 12 o'clock to percentage of 100; green (#34A853) at in-range. NEVER recoloured to alarm-red at low recovery — a low score shows a constructive 'build it back' lever, not a red ring (S52-V05).
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
    - Right: a physiological-stress read — a small **glyph + severity word** ("calm" / "moderate" / "elevated") + the HRV value, **never colour-alone and never an alarm-red dot** (a high physiological-stress reading is a state, not a danger verdict — S52-V02/V07); a neutral domain-identity tick may accompany the word.
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

## Visualization

> Source: no companion file (spec-first authored here); Audited in `viz-audit/` — Batch (Tracker B / Recovery cluster), findings `S52-V01..S52-V07`. All primitives are from `viz-audit/VIZ-KIT.md` at `viz-audit/CONSISTENCY.md` parameters. **This screen reuses `VK-015 ArcGauge`** (minted on Energy [63]) as the stress hero and the `VK-009` signed-bar encoding for the correlation/component reads. Premium-depth, on-brand (60/30/10), **Wellbeing Mode → wellbeing-teal stays *identity* only; orange dominates data ink**; no new data — every visual derives from data the screen already shows. **Current grade D (52) → specced-target A− (85).** *(Honest re-grade under the revised 10-dimension rubric; capped at the B band today by two open Criticals — see below — that this section resolves. The residual gap to A+++ is build-verified depth + working scrub/drill micro-interactions, owned by the later viz-build program.)*

Template = **Tracker B** (cluster benchmark **Welltory + Oura** — readiness/recovery gauges, HRV-derived stress as a *state*, consistency clouds — rendered **the Balencia way**: ArcGauge + Living Line + warm glow, *not* a Welltory/Oura clone). The prototype today (`/features/stress`) renders **three live defects this section is written to retire**:
- **`S52-V07a` · Critical (dishonest + shaming hero):** the stress gauge is a decorative half-circle whose fill is **hardcoded** (`--ring-target: 112 / 164`, a fixed needle — it does **not** map to the `4.2` score), runs green→teal→**alarm-red** at the high foot, and is `aria-hidden` (no text equivalent). A bounded *level* that turns **red** as it rises frames stress as a verdict/failure (non-shaming violation) **and** `VK-015` forbids an alarm-red ArcGauge. Resolved by `S52-V01`.
- **`S52-V07b` · Critical (rainbow donut + colour-alone + not-a-donut):** the Trigger Analysis "donut" is two nested `border` circles (teal + orange rings — **not** real arcs; it shows no composition at all), and the spec calls for an **8-colour rainbow** palette (red/pink/emerald/teal/amber/indigo/orange/purple) — a 60/30/10 violation, a competitor clone, and a colour-alone legend. Resolved by `S52-V03`.
- **`S52-V07c` · High (equalizer trend, distorted, colour-alone):** the trend is a straight-segment `polyline` with `preserveAspectRatio="none"` (distorts the shape) under `aria-hidden`, with the SIA projection a meaningless 2-point stub. Resolved by `S52-V04`.

This section upgrades *how the stress data reads* — one calm **ArcGauge** hero (never red), an honest **Donut** trigger split, the **Living-Line** trend with the brand-sanctioned dashed-purple SIA forecast, a recovery **GaugeRing**, and signed component/biometric reads — **without** displacing the Quick Log card, which stays the screen's primary *action*. Mints no new primitive.

### Visualized-vs-text map

| Datum (already shown) | Today | Specced visual | Primitive |
|---|---|---|---|
| Composite stress score (4.2 / 10) + severity | decorative half-circle, **fill hardcoded**, alarm-red high zone, `aria-hidden` | **open 240° ArcGauge** (charge/dial metaphor) + center value + ticks + glow, **always orange — never red** | **`ArcGauge` (VK-015, reuse 63)** |
| 3 sub-scores (bio 3.8 · sentiment 4.5 · behav 4.1) | bare numbers + colour-only 6px dots (green/teal) | **3 mini signed reads** under the gauge — value + `--color-domain-*` identity tick + a visible source glyph (never colour-alone) | mini reads (`VK-009` encoding) |
| Trigger frequency (Work 35% · Health 20% · …) | 2 nested `border` rings (no composition) + **rainbow** legend + colour-alone | **honest `Donut`** — largest slice orange, rest warm neutral tints, 2px gaps, hub = "28 logs", visible labelled legend | **`Donut / Pie` (VK-007, reuse 28)** |
| Stress score over 7/14/30d + SIA projection | distorted `polyline` (equalizer) + 2-pt dashed stub, `aria-hidden` | **Living Line** (curved, draws itself) + **dashed-purple `#7F24FF` SIA projection** + green-band "calm zone" | `TrendChart` (Living Line) (`VK-016`) |
| Mental recovery score (72 / 100) + trend | teal full ring, recolours orange/red at low %, colour-only arrow | **recovery `GaugeRing`** (96px, arc-gradient, glow, inset) — green in-range, **never alarm-red**, ▲/glyph trend | `GaugeRing` (`VK-002`) |
| 4 recovery components (emotion 68 · sleep 78 · activity 71 · social 74) | 2×2 text grid | **mini `MacroBar` reads** vs 100, orange fill, depth track — secondary, not promoted to rings | `MacroBar` |
| WHOOP HRV biometric stress (68ms, ↑) | one number + colour-only dot | **signed read** — value + ↑/↓ glyph + a visible "low/mod/high" word band (never colour-alone) | signed read (`VK-009` encoding) |
| avg / "−12% vs last wk" / "prev 65 (+7)" | text + coloured delta | **honest KPI deltas** (disclosed "vs last week" window; ▼-improving is *good* for stress, framed positively) | `KPIStatTile` accents |
| Severity word / triggers / note / timestamps / relief-tool labels / level | text | — (deliberately textual — identity labels, one-off scalars, no useful visual form) | — |

**Editorial hierarchy (calm, not maximal):** the Quick Log card stays the screen's *action* focus; the **stress ArcGauge is the one viz hero**; the trigger Donut + Living-Line trend + recovery GaugeRing are clearly secondary; the component/biometric reads are ambient. Restraint: the relief-tool cards, severity word, and note stay clean text — they have no useful visual form. No high-motivation weekly heatmap is forced into the base section (it lives in the existing high-motivation tier).

### 1 · ArcGauge — stress hero (never red) — `S52-V01`  *(reuse `VK-015`)*

Replace the decorative half-circle with the **ArcGauge** (`VK-015`, the same primitive minted on Energy [63]): an **open arc sweeping 240°** (gap centered at the bottom foot — it must never close into a ring), `0` at the left foot → `10` at the right foot, the composite score (`4.2`) as the dominant center number. Stress is a *level*, so an open dial reads more honestly than a needle gauge implying a completable scale — and crucially the **fill is driven by the real score**, not a hardcoded needle position (`S52-V07a` fix).
- **Geometry (locked, CONSISTENCY ArcGauge):** hero **160px** outer, **8px arc** (`--stroke-bold`); filled portion = `(score/10)·240°`; round caps on both filled and unfilled ends; 12 radial ticks (6px, `--color-alpha-white-25`) behind the arc for instrument precision.
- **Depth (token-backed):** arc fill = arc-following `--grad-orange` **(mint)** via a **`conic-gradient` behind a circular mask** — ⚠️ an SVG `linearGradient` cannot sweep along an arc (angular-gradient trap); the spec says conic. Track = `--color-alpha-white-10` over `--track-inset` `rgba(0,0,0,0.28)` **(mint)** inset (carved recess). Glow = `--glow-orange-md` (~20px, **mint** — **not** the full 32px `--glow-orange`, which blooms past a 160px gauge). Center value `text-display` white + faint `--glow-orange-sm` (mint).
- **Non-shaming colour (replaces the spec's green→teal→orange→red sweep — `S52-V07a`):** the arc is **always orange** (brand data ink); a high reading is **never** recoloured to alarm-red. `VK-015`: "a low value is never recoloured to an alarm red" — here it's the inverse, a *high* value, and the same law holds: severity is carried by **the number + a glyph + the always-visible severity word** ("low / moderate / high"), never by an alarm colour. A high-stress reading gets a constructive **lever** (a "try a 5-min reset →" affordance to Breathing [53]), not a red dial that shames.
- **Sub-scores → mini signed reads (`S52-V02` companion):** the 3 sub-scores (biometric / sentiment / behavioral) sit below as labelled mini reads — value (`text-h2` white) + a small `--color-domain-*` *identity* tick + **a visible source glyph** (pulse / chat / steps) so the source is legible without colour; the prior **colour-only 6px severity dots** (green/teal) are removed (colour-alone + a second semantic colour doing data work).
- **Micro-interaction:** a fresh log re-sweeps the arc to the new score + count-ups the center number; tap the gauge → inline expand to the score breakdown (sub-score sources), tap a sub-score → source tooltip.
- **Data:** `stressManagement.score / severity / subScores / updated` (`mock.ts`).
- **States:** Day-1 / no-check-in → arc at rest on a **ghosted** 0-foot (faint full track, **not** a filled 0 reading "stress is zero"), center "—" + "log your first check-in below"; loading → track + ticks visible, shimmer sweep that **morphs** into the fill (never a blank disc); error → ghosted arc + inline retry.

### 2 · Sub-score mini reads — `S52-V02`

The biometric / sentiment / behavioral sub-scores become three labelled reads under the hero (described in `S52-V01`): each = a domain-identity tick + value + a **visible source glyph + word** (so the contributing signal is named, not colour-coded). They are deliberately *not* promoted to three more gauges — that would create competing foci and fight the hero. **Non-shaming:** a "no biometric data" sub-score reads a ghosted "—" with "connect WHOOP" — distinct from a real low score (no-data ≠ a real value).

### 3 · Donut — honest trigger split — `S52-V03`  *(reuse `VK-007`)*

Replace the two nested `border` rings (which encode *no composition*) with a real **`Donut`** (`VK-007`, the same primitive minted on Nutrition [28]): SVG `path` arcs summing to a **true whole** (the 28 logged triggers), **2px gaps** revealing the `ink-brown-800` surface, hub = "28" + "logs" sub-label, consistent inner-radius.
- **Brand slice colours (60/30/10-safe — replaces the 8-colour rainbow, `S52-V07b`):** the **largest / primary slice (Work 35%) = `--color-brand-orange`**; remaining slices = warm neutral tints (`--color-alpha-white-40`, `--color-alpha-white-20`, `--color-alpha-white-12`) in descending order; **never rainbow** (one-hue-per-trigger is a competitor clone + a 60/30/10 violation), **never purple** (no slice is SIA-originated). A 0-count trigger is **omitted**, never a zero-width wedge.
- **Honesty (RUBRIC dim 5):** slices sum to the real log count; a "remaining/other" group is a true aggregate slice, never a phantom padding wedge.
- **A11y:** `aria-label` enumerates every slice ("Work 35%, Health 20%, Family 15%, Time 12%, Other 18% of 28 logs"); a **visible labelled legend** (name + % beside each row) — never colour-alone (the legend dots are reinforced by the always-present name + %). Slice hit-wedges ≥44×44pt; load-bearing arcs/boundaries ≥3:1.
- **Depth:** `--glow-orange-sm` **(mint)** on the primary orange slice only (the donut is ~120px, card-scale — not the 32px hero glow); faint radial backplate behind the ring.
- **Sparse fallback:** <5 logs → the spec's horizontal-bar fallback, but bars adopt the same orange-primary / neutral-tint law (no rainbow); empty → "log stress a few times to see your trigger patterns" with a ghosted ring outline + hub prompt (never a collapsed disc).
- **Motion:** arcs **draw themselves** clockwise from 12 o'clock (`stroke-draw`, `--dur-flow` 1200ms), **largest → smallest** (primary orange slice first); hub counts up 520ms; never opacity-fades.
- **Data:** `stressManagement.triggers` (label + value + count).

### 4 · TrendChart — stress Living Line + SIA projection — `S52-V04`  *(`VK-016`)*

Replace the distorted `polyline` (`preserveAspectRatio="none"` + a 2-point dashed stub, `aria-hidden` — `S52-V07c`) with the **`TrendChart` Living Line**: composite stress over 7/14/30d as one continuous **curved, round-capped** stroke that **draws itself**, with the **SIA "projected stress" curve as a dashed-purple `#7F24FF` tail** (§11 — the brand-sanctioned forecast colour, exactly what the screen already gestures at) extending ~3 days ahead.
- **Locked params (CONSISTENCY TrendChart):** actual = solid orange Living Line 2px curved; projected = dashed purple `#7F24FF` 2px; area = `--grad-orange` **(mint)** vertical fade ≤25%; **zero-baselined y (0–10), shared y-scale across 7/14/30d** (honest window-switching — no truncated axis); **no `preserveAspectRatio="none"`** (the prototype's shape-distortion bug — render to a true aspect). Time-range chips: active = teal *identity* selection (existing pattern) — but the **line itself is orange**, not teal.
- **Calm-zone band (replaces the spec's green "safe zone"):** a faint forest-green `#34A853` ~3% band from y=0→3 marks the low-stress region as a *calm anchor* (non-shaming — it's an aspirational floor, not a "danger above" zone); the line crossing it is descriptive, never alarmist. **The line never turns red.**
- **Honest delta (`S52-V05` companion):** "avg 4.8 · ↓12% vs last week" is a disclosed fixed window; for stress a **▼ down delta is improvement** → render it **forest-green** with a clear "lower is calmer" framing (the one place a green ▼ is correct), never the muted/negative treatment that would misread a good outcome.
- **Motion:** line **draws itself** (`stroke-draw`, `--dur-flow` 1200ms) on enter / range change — **not** a fade; projection draws after the actual line; horizontal scrub reveals the value at the finger; scroll-into-view (below fold).
- **States:** sparse (<3 points) → dots only, no connecting line, "log more to see trends" (no fabricated curve); empty → axes only + "your trend will appear after a few check-ins"; loading → skeleton axis + flat line that draws into shape.
- **Data:** aggregated `stress_logs` `final_stress_score` by day + `projection`.

### 5 · Recovery GaugeRing + component bars — `S52-V05`  *(`VK-002`)*

Mental recovery (`72/100`) becomes a proper **`GaugeRing`** (`VK-002`): 96px, **arc-following `--grad-orange` (mint)** stroke (conic-mask, not flat), `--track-inset` **(mint)** beveled track under the `--color-alpha-white-10` track, center value (`text-h2`, count-up 520ms) + "of 100", `--glow-orange` (32px, hero-size) — recovery *is* a completable bounded score, so a full ring is correct here (vs the ArcGauge open dial for the unbounded *level*).
- **Non-shaming colour (corrects the spec's teal→orange→red recolour at low %):** the ring is **orange data-ink**, **green at ≥ in-range**; it is **never recoloured to alarm-red** at low recovery — a low recovery shows a constructive "build it back" lever, not a red ring. Trend = ▲/▼/→ **glyph + word** ("improving"), never colour-only arrow.
- **Components → mini `MacroBar` reads:** emotion 68 · sleep 78 · activity 71 · social 74 keep the 2×2 grid but each value gains a thin `MacroBar` vs 100 (`--color-alpha-white-08` track over `--track-inset`, orange fill, width = value/100) — secondary depth, **not** promoted to four rings.
- **States:** Day-1 → ghosted ring + "recovery score builds over time" (not a filled 0); loading → arc skeleton that morphs into fill.
- **Data:** `mental_recovery_scores` (`recovery_score`, `components`, `trend`, `previous_score`).

### 6 · Biometric signed read — `S52-V06`

The WHOOP HRV biometric card keeps its compact form but drops the **colour-only status dot**: HRV value (`68ms`) + ▲/▼ glyph + the **visible word band** ("Low / Moderate / High physiological stress") carries status — never colour-alone. The accent stays orange/green per direction; **never an alarm-red dot**. Not-connected → the existing compact "Connect WHOOP" prompt (no fabricated reading). This is the one place a *high* HRV (= calm) is good news — framed positively.

### Motion choreography (entrance — draw-first order)

Per `CONSISTENCY.md`: **the ArcGauge hero draws first** — arc fills `0→score` (`ring-animate`, 520ms `--ease-flow`) + ticks + center count-up — **then** the Quick Log + sub-score reads settle → **then** the trigger **Donut arcs draw themselves** clockwise (largest orange slice first, 1200ms `stroke-draw`) → **then** the stress **Living Line draws itself** L→R (1200ms `stroke-draw`, *never* fade) with its dashed-purple projection drawing last → **then** the recovery `GaugeRing` fills + component bars rise (520ms) → biometric read last. One line motif per surface (the trend is the only full Living Line; recovery/components use the ring + bars). Below-fold visuals animate on **scroll-into-view**. `prefers-reduced-motion` → every chart at final state instantly; the Living Line's static form (completed stroke + green end dot + static dashed-purple tail), the Donut's full arcs, and the gauges' filled arcs preserved.

### States, brand & accessibility

- **States (all designed, per RUBRIC dim 7):** **cold-start / Day-1** — ArcGauge ghosted 0-foot ("—" / "log your first check-in"), sub-score reads ghosted, Donut hidden until 5+ logs (ghosted ring prompt at threshold), TrendChart "your trend will appear after a few check-ins" (axes drawn, no fabricated curve), recovery ring ghosted ("builds over time"), biometric "Connect WHOOP"; **loading** — depth-preserving skeletons that *morph* into drawn data (arc track + ticks, donut ring outline, trend axis + flat line, recovery arc — never blank discs); **partial / sparse** — distinct from loading and from zero (ghosted, not filled-zero — a missing biometric sub-score ≠ a real low score); **error** — chart-specific honesty per the Error Handling table (which series failed + a visible "retry").
- **60/30/10 (corrected):** **orange dominates data ink** — ArcGauge arc, the primary Donut slice, the Living-Line effort segment, the recovery `GaugeRing` fill, component `MacroBar` fills, the Log CTA + FAB. **Green** = arrival / in-range / calm-improvement only (recovery in-range band, the Living-Line arrival, the calm-zone band, the ▼-is-good stress delta, log-success flash). **Purple stays SIA-only** — the coaching-note border/avatar/"ask SIA" link, the "SIA pick" badge, **and the brand-sanctioned dashed-purple projection** on the TrendChart (§11 — correct, the only chart-purple). **Wellbeing-teal is now identity only** (header line, eyebrows, RPG badge, sub-score/relief-tool *identity* ticks, trend-range chip selection) — it no longer carries primary data ink (retires the prototype's teal-as-data-ink throughout). **Alarm-red retires from every data surface** (gauge, donut, trend, recovery, biometric) — severity is carried by number + glyph + word, never an alarm colour (the core non-shaming correction for a stress screen). Glow uses the calibrated size-stepped scale — warm depth, not neon.
- **Non-shaming (the ethical core of a stress screen):** stress is framed as **state + a lever**, never a verdict — the ArcGauge never turns red, a high reading routes to a constructive relief tool; recovery is "build it back," never "you're failing"; triggers are self-awareness, not blame; the trend's calm-zone is an aspirational floor, not a danger threshold; no streak/loss-aversion pressure; the ▼-improving delta is celebrated, not punished.
- **Accessibility:** every gauge / donut / line / read carries a text/`aria-label` equivalent conveying the same value (the spec's VoiceOver summaries already give each chart one: ArcGauge → "Current stress level 4.2 of 10, moderate"; Donut → enumerated slices + total; TrendChart → "average 4.8, down 12% from last week"; recovery → "72 of 100, improving") — **replacing every current `aria-hidden="true"` on the live charts**; status uses a **visible** glyph/sign/word (✓ / ~ / severity word, +/− / ▲▼→), never colour alone (fixes the prototype's colour-only sub-score + trigger + biometric dots); label/value contrast ≥ 4.5:1 on `#0A0A0F`/`#211008`; **WCAG 1.4.11** — gauge arcs, donut slice boundaries, the Living-Line stroke, milestone dots, recovery arc, and the filled/unfilled boundary all meet ≥3:1 vs background (white/3 grid is decorative-only); interactive chart targets ≥ 44×44pt (carries B14-F12); `prefers-reduced-motion` renders all visuals at final state with signature static forms preserved.

Conform to `viz-audit/CONSISTENCY.md`.

---

## Premium Craft

**Profile:** data · **Cluster benchmark:** Oura + WHOOP (calm; never alarm-red on a level) — *stays Balencia via the ArcGauge hero (always orange, never red), the warm-glow surfaces on ink-brown, the honest Donut trigger split, and the Living-Line trend with dashed-purple SIA forecast.*

**Pre-grade:** A− (85) · **Post-grade (this section):** A++ (96)

Pre-grade drivers (the gap to A++): The Visualization section is spec'd to high craft (the ArcGauge hero, honest Donut, Living Line, signed reads), but (1) non-chart card surfaces lack the `--edge-highlight` top-edge highlight and layered depth on all surfaces; (2) the SIA coaching note and relief tool cards are flat `ink-brown-800` without depth refinement; (3) microcopy on empty / loading / error states is partly unauthored or uses generic phrasing (such as "could not load," "see error pattern"); (4) type line-heights and tracking are ad-hoc, not mapped to `CK-P3` tokens; (5) the stress slider component and trigger chips lack premium input styling; (6) the chart-surface depth rules (glow sizes, track inset, radius) are specified per component but not verified consistently; (7) motion choreography is listed but not sequenced in draw-first order; (8) contrast pairs are asserted, not tabulated.

### Focal hierarchy

One focal point: the **Current Stress Level ArcGauge** (`CK-P2`, data hero) — the 160px ≥96px open-dial gauge with orange arc fill, centered number, and severity word. It sits above the fold and reads first on the squint test. The **SIA Coaching Note sits below as a warm voice layer, not a competing focal element**: it is body-type (15pt), 3pt left border (purple at 40%), no glow — visibly secondary. The **Quick Log card is the interaction focus** (the primary CTA zone where the user logs stress), but visually secondary to the gauge hero by size and hierarchy. Everything else (Trigger Analysis, Stress Trend, Mental Recovery, Relief Tools, Biometric) is clearly secondary by order, sizing, and weight. No competing foci.

### Surface & depth

Every card adopts the `CK-P1` Layered Warm Surface — `--color-ink-brown-800` body · `--radius-xl` (28pt) · 1px `--glass-border` (white/6) · **`--edge-highlight` top-edge highlight** (`CK-T01`, the not-flat cue) · `--shadow-1`. The Current Stress Level Card (hero, ≥96px) adds `--surface-backplate` (`CK-T02`) — a faint radial backplate behind the card face. Glows are size-calibrated per `CONSISTENCY.md §1`: `--glow-orange` (32px / .45) on the ≥160px stress ArcGauge hero only; `--glow-orange-md` (~20px / .40) on the ~96px recovery GaugeRing; **no glow** on the Quick Log, SIA Coaching Note, or relief tool cards (<96px). All gauge tracks (stress arc track, recovery ring track, slider track) recess over `--track-inset` (`rgba(0,0,0,0.28)`) for carved beveled depth. Donut ring carries `--glow-orange-sm` (~12px / .35) on the primary orange slice only (the ~120px ring is card-scale, smaller than the hero). All interactive elements (slider thumb, trigger chips, CTAs, card bodies) read as crafted, not default-component. Extends the same depth language to every surface so nothing reads as a flat box.

### Typographic rhythm

Map the Typography table to `CK-P3` tokens: header title `--text-h2` (20pt) / 600 / `--leading-snug` (1.25); stress gauge score (32pt) → `--text-display-l` (32pt) / 700 / `--leading-tight` (1.1); severity label (14pt) → `--text-h3` (17pt) / 400 / `--leading-snug`; sub-score values `--text-h3` / 600 / `--leading-snug`; sub-score labels / eyebrow labels the `.eyebrow` recipe (12pt / 600 / `--tracking-eyebrow` 0.12em / uppercase / white-40%); quick log prompt `--text-h2` (20pt) / 600 / `--leading-snug`; slider value label `--text-display-l` (32pt) / 700 / `--leading-tight` (snap-to-integer reads larger); trigger chip text `--text-caption` (13pt) / 600 / `--leading-normal` (1.4); SIA coaching message `--text-body` (16pt, raised from 15pt per exemplar pattern) / 400 / `--leading-normal`; donut center label / legend `--text-caption` / 400 / `--leading-normal`; trend summary "avg 4.8" `--text-h3` (17pt) / 600 / `--leading-snug`; trend comparison "↓12% vs last wk" `--text-body` / 400 / green (`--color-forest-green`) if improving; recovery gauge score `--text-display-l` (32pt) / 700 / `--leading-tight`; component labels `--text-caption` / 400; component values `--text-h3` / 600. Hierarchy carried by **weight** (600–700 vs 400), not size alone. Sentence case throughout. ≤2 `--color-brand-orange` accent words per screen. Chillax stays logo-only (none on this screen). Replaces ad-hoc pixel line-heights with the `CK-T04` scale (`--leading-tight / snug / normal / relaxed`).

### Microcopy (before → after)

Every user-facing string is authored to `CK-P5` brand voice — warm, plain, coaching, no exclamation marks:

- **Stress gauge, Day 1** — *before:* "log your first check-in below" → *after (kept, warm):* same (already on-voice).
- **Quick Log, prompt** — *before:* "How stressed are you?" → *after (kept):* same; direct, coaching tone.
- **Quick Log, helper (Day 1)** — *before:* "your stress data stays private" → *after (kept):* same, 12pt Regular, white-30%, reinforces trust.
- **Trigger chips, "Other" expansion** — *before:* hint text "describe..." → *after (on-voice):* "what else is on your mind." (warm, inviting).
- **Quick Log note field** — *before:* "add a note" link → *after (kept):* same; optional, casual.
- **"Log stress" CTA, success** — *before:* not specified → *after (new, on-voice):* green glow (600ms) + silent success (the gauge updates with new arc sweep, which is the primary feedback).
- **SIA Coaching Note, Day 1** — *before:* "Log a few stress check-ins and I'll start spotting patterns for you. No rush — even one a day helps." → *after (kept):* same; specific, non-shaming, warm SIA voice.
- **SIA Coaching Note, low-motivation** — *before:* not specified → *after (new):* "One check-in is enough today." (shorter, gentler, encouraging).
- **Trigger Analysis, empty** — *before:* "log stress a few times to see your trigger patterns" → *after (kept):* same, warm, invites action.
- **Stress Trend, empty** — *before:* "no data yet" → *after (kept):* same; honest, minimal.
- **Stress Trend, summary comparison** — *before:* "↑8% vs last wk" (worsening in orange) → *after (reconciled):* green ▼ "↓12% vs last wk" if improving (lower is calmer — a ▼ down is good for stress); orange ↑ if worsening. Framed positively: "lower is calmer."
- **Mental Recovery, Day 1** — *before:* "recovery score builds over time" → *after (kept):* same, non-shaming, aspirational.
- **Mental Recovery, low score** — *before:* not specified → *after (new, non-shaming):* "building your recovery" (constructive lever, never "you're failing").
- **Biometric Integration, status** — *before:* bare word → *after (reconciled):* word + glyph (✓ / ~ / ⚠ for calm / moderate / elevated) — never colour-alone.
- **Loading states** — *before:* "SIA is preparing your actions." (generic) → *after (new):* "SIA is reading your week — one moment." (specific, warm, coaching).
- **Error states** — *before:* "could not load trends" (generic) → *after (new):* "[Component] couldn't sync — pull to refresh." (specific, recovery action named, warm).
- **Offline state** — *before:* "offline — showing cached data" → *after (kept):* same; honest, clear.

No exclamation marks. The brand period used with intent. SIA strings stay specific to the user's own data, never a horoscope. Non-shaming framing: stress is a state + a constructive lever, not a verdict; low recovery is "building it back," not a failure; the trend's calm-zone is an aspirational floor, not a danger threshold.

### Motion choreography

Locked to `CK-P4` draw-first order: (1) **stress ArcGauge hero draws** (`--dur-slow` 520ms / `--ease-flow`, ticks + count-up settle); (2) **Quick Log + SIA Note rise** (280ms / `--ease-out-soft`, 80ms stagger); (3) **Trigger Donut arcs draw** clockwise from 12 o'clock (largest orange slice first, 1200ms / `--ease-flow`, on scroll-into-view); (4) **Stress TrendChart Living Line draws** L→R (1200ms / `--ease-flow`, dashed-purple projection draws after); (5) **recovery GaugeRing fills + component bars rise** (520ms / `--ease-flow`, 60ms stagger); (6) **Relief Tool cards scale in** (280ms, 80ms stagger); (7) **Biometric read settles** (280ms). Below-fold on scroll-into-view. `prefers-reduced-motion` → all visuals at final state instantly; ArcGauge arc fully drawn, Living Line's static form (orange stroke + green end dot, purple tail), Donut arcs fully drawn, rings at final fill, bars at final height. No opacity-fade on any stroke.

### State craft

| State | Layout | Copy (on-voice) | Depth / brand |
|---|---|---|---|
| Cold-start / Day-1 | ArcGauge ghosted 0-foot (full arc visible, faint; hub "—"), Quick Log fully visible (onboarding action), SIA Coaching Note intro message, Trigger Analysis hidden until 5+ logs, Stress Trend "your trend will appear after a few check-ins", Recovery gauge ghosted ("builds over time"), Relief Tools fully visible, Biometric "Connect WHOOP…" or hidden | "Log your first check-in below." (gauge); "How are you feeling right now?" (Quick Log); "Your stress data stays private." (helper). | ArcGauge hero keeps full depth + backplate. Ghosted tracks, not filled 0. Sections hidden, not skeleton-faded. |
| Loading | Depth-preserving skeletons: gauge ring outline + ticks (shimmer), Quick Log frame (shimmer), Donut ring outline (shimmer), TrendChart axes (shimmer), Recovery ring + component bar outlines (shimmer). Layout preserved. | "SIA is reading your week — one moment." | Skeleton on `--color-ink-brown-800`, radial shimmer, morphs to data (never a swap). |
| Empty / partial | Un-synced = donut omits 0-count triggers. Missing biometric sub-score = "—" white-20%, distinct from real low. Trigger Analysis hidden until 5+ logs. Biometric: if not connected, shows "Connect WHOOP…" (always visible, never silent). | "Can't sync [component] — try again later." (per-zone). | No-data ≠ zero (ghosted, not real 0); never silent. |
| Error | Per-component error state: chart area "[Component] couldn't sync" + "retry" link. Network banner if widespread. Cached data retained. | "Couldn't load your stress trend — pull to refresh." (specific, recovery action named). | Calibrated `--color-error-red` only on genuine failure; glyph + word paired, never colour-alone. |
| Offline | Cached data + banner "offline — showing your last sync." (48pt, ink-brown-800, white-50%). Quick Log functional, logs queue locally. | "You're offline — showing your last sync." | Actions honestly dimmed (50% opacity). Cached data retained. |

### Signature & anti-generic

Ownable moments: the **ArcGauge hero** (open-dial, always orange, never red — stress-as-level, never verdict), the **warm-glow-on-ink-brown surfaces** (depth signature), the **Living-Line trend with dashed-purple SIA projection** (brand-sanctioned forecast), the **continuous-stroke draw-first motion** (all charts draw, never fade), and the **honest Donut** (orange-primary + neutral-tint, no rainbow). Anti-generic fixes: the card stack (Gauge → Quick Log → SIA Note → Analysis → Trend → Recovery → Relief → Biometric) is broken from equal-card monotony by the hero gauge (≥96px, glowing, sized as hero) + varied card sizes + section-eyebrow rhythm (`CK-P6`). The stress slider is premium input (custom gradient fill, sculpted thumb, floating label), and trigger chips are multi-select with state (selected = teal identity, not data-ink). One unmistakable ownable moment: the stress ArcGauge never turns red (non-shaming core).

### Accessibility

Tabulated load-bearing contrast pairs (on `--color-ink-900` / `--color-ink-brown-800`): stress gauge score white 100% ≥12:1; severity label white 60% ≥4.5:1; sub-score value white 100% ≥12:1 + glyph (pulse/chat/steps) ≥3:1; Quick Log prompt white 100% ≥12:1; slider thumb white 100% ≥12:1; slider track fill orange ≥3:1 (WCAG 1.4.11); trigger chip text (selected) teal ≥3.5:1 on teal-15% bg; SIA message white 90% ≥9:1; Donut slice boundary ≥3:1 (WCAG 1.4.11); legend label + % white 70%–100% ≥4.5:1 (never colour-alone); Trend line orange ≥3:1; Projected line purple ≥3:1 (dashed distinction + colour); recovery gauge arc ≥3:1; recovery score white 100% ≥12:1; component bar orange ≥3:1; biometric status (word + glyph, never colour-alone); CTA white 100% on orange ≥4.5:1. Status never colour-alone: sub-score reads carry visible glyph + word + value; biometric reads carry glyph + word band; completion = check + strikethrough. Every interactive element carries `--focus-ring` (`CK-T03`, 2pt orange, 2pt offset). Targets ≥44×44pt. Reduced-motion preserves all static forms.

Conform to `design-audit/CONSISTENCY.md`.


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
| Stress ArcGauge fill | #FF5E00 (always) | brand-orange via --grad-orange (conic-mask) | Stress is a LEVEL — the arc is ALWAYS orange and is NEVER recoloured to alarm-red; severity carried by number + glyph + severity word (low/moderate/high), per VK-015 + S52-V01 |
| Stress ArcGauge track | #FFFFFF at 10% over --track-inset | alpha-white-10 / --track-inset (mint) | Carved recessed track; round caps both ends |
| Trigger chip selected bg | #14B8A6 at 15% | wellbeing-teal | Selected trigger state |
| Trigger chip selected border | #14B8A6 at 30% | wellbeing-teal | Selected trigger border |
| Trigger chip selected text | #14B8A6 | wellbeing-teal | Selected trigger label |
| Recovery GaugeRing fill | #FF5E00 / #34A853 at in-range | brand-orange via --grad-orange (conic-mask); forest-green at in-range | Orange data-ink; green only at in-range; NEVER recoloured to alarm-red at low recovery (S52-V05) |
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
| WHOOP physiological-stress read | glyph + severity word (no alarm colour) | — | "calm / moderate / elevated" + HRV value, never a red dot (S52-V02) |
| Donut primary slice (largest, e.g. Work) | #FF5E00 | brand-orange | Largest slice is orange data-ink (S52-V03) |
| Donut remaining slices | #FFFFFF at 40% / 20% / 12% | alpha-white tints (descending) | Warm neutral tints — NEVER rainbow, NEVER purple; 0-count slice omitted, never a zero-width wedge |
| Primary text | #FFFFFF | white | Scores, headings |
| Secondary text | white at 70% | — | Legend labels, body |
| Tertiary text | white at 50% | — | Status labels, descriptions |
| Quaternary text | white at 40% | — | Eyebrows, sub-labels, timestamps |
| Disabled text | white at 30% | — | Timestamps, placeholder hints |

**60/30/10 verification**: Orange DOMINATES data ink — the whole stress ArcGauge arc, the recovery GaugeRing fill, the primary Donut slice, the Living-Line effort segment, the slider fill, the Log CTA + FAB. Green only for arrival / in-range / calm-improvement — recovery in-range band, the Living-Line arrival, the trend calm-zone band, the ▼-is-calmer stress delta, and the log-success flash. Purple stays SIA-only — the coaching-note border/avatar/"ask SIA" link, the "SIA pick" badge, and the brand-sanctioned dashed-purple projection on the trend (§11 — correct, the only chart-purple). Domain teal (#14B8A6) is IDENTITY ONLY (header accent, eyebrows, RPG badge, trigger chip selection, sub-score/relief-tool identity ticks, trend-range chip selection) and carries NO primary data ink. Alarm-red is removed from every data surface — severity is carried by number + glyph + word, never an alarm colour. Ratio holds.

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
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-14.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U07`
**Prototype route**: `/features/stress`
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
| B14-F10 | critical | retention | Build a real slider, multi-select triggers, optional notes, submit, success/reset, undo, and failure states. |
| B14-F11 | major | navigation | Make Ask SIA contextual and implement 7d/14d/30d trend state with selected semantics. |
| B14-F12 | major | accessibility | Use semantic range, button, and link controls with 44px hit areas and live status announcements. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

