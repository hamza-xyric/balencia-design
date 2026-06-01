# Screen Design: Water Intake Tracker

**Screen**: 44 of 73
**File**: 44-water-intake.md
**Register**: Wellbeing Mode (wellbeing-teal #14B8A6)
**Primary action**: log water intake
**Tab**: Today tab or Wellbeing domain
**Navigation**: Stack depth 1-2 from Today tab root (Today → Water Intake) or 2-3 from Me tab root (Me → Explore → Wellbeing → Water Intake). Entry from Home Screen [12] wellbeing action card, Explore [18] wellbeing module card, Habits [38] "drink water" habit tap, SIA deep-link [09] ("you're behind on water today"). Exit via back button to previous screen, or forward to SIA Chat [09], Target Setting (modal).

---

## Purpose

The Water Intake Tracker is the user's daily hydration command center — a satisfying, glanceable view of how much water they have consumed today against their personalized target, with one-tap logging for quick entries. It answers "how much water have I had today and am I on track?" The screen combines a large progress ring for instant visual feedback, preset quick-add buttons for frictionless logging, a timeline of individual drinks, and a weekly bar chart for trend awareness. Hitting the daily target triggers a celebration moment and earns XP, reinforcing the RPG loop. SIA adapts the target based on activity level, weather context, and user feedback. Free tier includes manual logging, progress ring, and weekly chart; SIA coaching notes and adaptive daily targets require Plus.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Daily progress ring — large circular visualization of glasses/ml consumed vs target, the screen's emotional anchor
2. Quick add buttons — preset amounts for one-tap logging (the primary action)
3. Today's drink log — timeline of individual entries with timestamps
4. Weekly bar chart — 7-day intake vs target trend
5. Stats card — streak, average, best day
6. Target setting link — adjust daily water goal

**User flow**:
- **Arrives from**: Home Screen [12] via wellbeing action card or water widget (stack push), Explore [18] via wellbeing module card (stack push), Habits [38] via "drink water" habit deep-link (stack push), SIA Chat [09] via hydration reminder deep-link (stack push)
- **Primary exit**: Back to previous screen (stack pop)
- **Secondary exits**: SIA Chat [09] via SIA hydration coaching note tap (tab switch), Target Setting (modal bottom sheet), Celebration Overlay [42] on goal achievement (overlay)

---

## Layout

**Scroll behavior**: ScrollView (content is moderate length — progress ring, quick add, timeline, chart, stats)
**Tab bar visible**: Yes

### ASCII Wireframe

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  ←  ┃ Water intake          ⚙      │  ← Domain Dashboard Header
│      ┃ (teal accent line)           │     56pt, sticky
├─────────────────────────────────────┤
│                                     │  SCROLLABLE from here
│                                     │  ← 16pt gap
│        ┌─────────────────┐          │
│       ╱                   ╲         │
│      │    ┌───────────┐    │        │  ← Daily Progress Ring
│      │    │  5 / 8    │    │        │     200pt diameter
│      │    │  glasses  │    │        │     wellbeing-teal fill
│      │    │  1250 ml  │    │        │
│       ╲   └───────────┘   ╱         │
│        └─────────────────┘          │
│                                     │
│    63% of daily goal                │  ← Progress label
│                                     │  ← 32pt gap
│  ┌────┐ ┌────┐ ┌────┐ ┌──────┐    │
│  │ 1  │ │250 │ │500 │ │custom│    │  ← Quick Add Buttons
│  │glass│ │ ml │ │ ml │ │  ml  │    │     (pill buttons)
│  └────┘ └────┘ └────┘ └──────┘    │
│                                     │  ← 32pt gap
│  TODAY'S LOG                        │  ← Section Header
│  ┌─────────────────────────────┐   │
│  │ 💧 8:30 AM   1 glass       │   │  ← Drink Entry Row
│  │    (250 ml)                 │   │
│  ├─────────────────────────────┤   │
│  │ 💧 10:15 AM  500 ml        │   │  ← Drink Entry Row
│  │    (2 glasses)              │   │
│  ├─────────────────────────────┤   │
│  │ 💧 12:45 PM  1 glass       │   │
│  │    (250 ml)                 │   │
│  ├─────────────────────────────┤   │
│  │ 💧 2:00 PM   250 ml        │   │
│  │    (1 glass)                │   │
│  └─────────────────────────────┘   │
│                                     │  ← 32pt gap
│  THIS WEEK                          │  ← Section Header
│  ┌─────────────────────────────┐   │
│  │  ┃   ┃       ┃             │   │  ← Weekly Bar Chart
│  │  ┃   ┃   ┃   ┃             │   │     7-day bars
│  │  ┃   ┃   ┃   ┃   ┃        │   │     teal fill, target
│  │  ┃   ┃   ┃   ┃   ┃        │   │     line overlay
│  │ ─┃─ ─┃─ ─┃─ ─┃─ ─┃─ ─ ─  │   │  ← Target line (dashed)
│  │  ┃   ┃   ┃   ┃   ┃        │   │
│  │  M   T   W   T   F   S  S │   │
│  └─────────────────────────────┘   │
│                                     │  ← 16pt gap
│  ┌─────────────────────────────┐   │
│  │  🔥 12 day     📊 6.5      │   │  ← Stats Card
│  │     streak     avg/day      │   │     3-column layout
│  │                 🏆 9        │   │
│  │                 best day    │   │
│  └─────────────────────────────┘   │
│                                     │
│          64pt bottom padding        │
│                                     │
├─────────────────────────────────────┤
│  Today  |  SIA  |  Goals  |  Me   │  ← Tab Bar
├─────────────────────────────────────┤
│         Home Indicator (34pt)       │
└─────────────────────────────────────┘


=== GOAL ACHIEVED CELEBRATION (inline, not overlay) ===

┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  ←  ┃ Water intake          ⚙      │
├─────────────────────────────────────┤
│                                     │
│        ┌─────────────────┐          │
│       ╱  ✦ · ✧ · ✦ · ✧  ╲         │  ← Confetti burst
│      │    ┌───────────┐    │        │     around ring
│      │    │  8 / 8    │    │        │  ← Ring fully filled
│      │    │  glasses  │    │        │     teal → green
│      │    │  2000 ml  │    │        │     crossfade
│       ╲   └───────────┘   ╱         │
│        └─────────────────┘          │
│                                     │
│    Goal achieved! +25 XP            │  ← Celebration text
│    at 3:45 PM                       │     (green, animated)
│                                     │
│  ...rest of screen unchanged...     │
│                                     │
└─────────────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Domain Dashboard Header** — 56pt, FIXED
   - Purpose: Screen identification with wellbeing domain branding
   - Content: Back chevron (left), "Water intake" title with 2pt wellbeing-teal (#14B8A6) accent line underneath, settings gear icon (right)
   - Sticky on scroll with backdrop-blur (z-30)

2. **Daily Progress Ring** — ~240pt (ring + labels)
   - Purpose: The screen's emotional anchor — instant visual feedback on hydration progress
   - Content: 200pt diameter circular progress ring, center text (count + unit + ml equivalent), progress percentage below

3. **Quick Add Buttons** — 48pt
   - Purpose: One-tap water logging — the primary action, must be frictionless
   - Content: 4 pill buttons in a row (1 glass, 250ml, 500ml, custom)
   - 32pt top margin

4. **Today's Log Section** — Variable (ScrollView nested content)
   - Purpose: Timeline of individual drink entries for today
   - Content: Section header + drink entry rows with timestamps
   - 32pt top margin

5. **Weekly Bar Chart Card** — ~200pt
   - Purpose: 7-day trend visualization — am I consistent?
   - Content: Section header + 7 vertical bars with target line overlay
   - 32pt top margin

6. **Stats Card** — ~100pt
   - Purpose: Gamification and trend awareness
   - Content: 3-column layout — streak days, average daily intake, best day
   - 16pt top margin

7. **Bottom Padding** — 64pt
   - Purpose: Clears tab bar from content

8. **Tab Bar** — 56pt + 34pt safe area
   - Purpose: Primary app navigation
   - Content: Today | SIA | Goals | Me

---

## Components

### Domain Dashboard Header
- **Purpose**: Screen identification with wellbeing domain branding and quick access to target settings
- **Data source**: Static (title), user's water target settings (gear icon navigates to target modal)
- **Visual treatment**: Fixed bar, ink-900 background, no card styling. Follows the Domain Dashboard Template established in Screen 26.
- **Size**: Full-width x 56pt
- **Sub-elements**:
  - Back button: left chevron, white, 2pt stroke, 20pt icon, 44x44pt touch target, 16pt from left edge
  - Title: "Water intake", 20pt Sora Semibold, white, left-aligned 56pt from left
  - Domain accent line: 2pt height, #14B8A6 (wellbeing-teal), extends from title left edge to ~60% of available width, 4pt below title text baseline
  - Settings gear: 20pt icon, white at 60%, 44x44pt touch target, right-aligned 16pt from right edge
- **Gestures**: Back button taps pop stack; gear icon taps open Target Setting modal

### Daily Progress Ring
- **Purpose**: The visual hero — a large, satisfying circular progress indicator that answers "how am I doing?" at a glance
- **Data source**: API — GET /api/water (today's glasses_consumed, target_glasses, ml_consumed, target_ml)
- **Visual treatment**: Centered in screen, 16pt horizontal margins. No card enclosure — sits directly on ink-900 for maximum visual impact.
- **Size**: 200pt diameter ring + center text + label below = ~240pt total
- **Sub-elements**:
  - Ring track: 200pt diameter, 12pt stroke width, white at 6% fill, round caps
  - Ring fill: 12pt stroke width, wellbeing-teal (#14B8A6) fill, round caps, animated clockwise from 12 o'clock position. Fill percentage = glasses_consumed / target_glasses
  - Ring glow: Subtle teal glow (rgba(20, 184, 166, 0.15)) behind the filled portion, intensifies as progress increases
  - Center primary text: "5 / 8" — count in 36pt Sora Bold, white; "/" in 24pt Sora Regular, white at 40%; target in 36pt Sora Bold, white at 50%
  - Center secondary text: "glasses" — 14pt Sora Regular, white at 50%, 4pt below primary
  - Center tertiary text: "1250 ml" — 13pt Sora Regular, wellbeing-teal at 80%, 4pt below secondary
  - Progress label (below ring): "63% of daily goal" — 15pt Sora Semibold, white at 60%, center-aligned, 12pt below ring
- **Variants**:
  - In progress (0-99%): Teal fill, white text, percentage label
  - Goal achieved (100%): Ring fill crossfades teal to green (#34A853), center text shows full count with green glow, "Goal achieved! +25 XP" label replaces percentage (green text, animated), confetti burst around ring perimeter (small teal + green + gold particles, 2s duration, subtle), "at 3:45 PM" timestamp below in white at 40%
  - Over target (>100%): Green fill, ring continues past full circle with lighter green overlay, "+2 over target" label in green at 60%
  - Empty (0%): No fill, "0 / 8" in white at 30%, "start hydrating" label
  - Loading: Ring track pulses (opacity 4% to 8%, 800ms loop), center text shows skeleton shimmer
- **Gestures**: Tap center text to toggle between glasses and ml as primary display unit (preference persisted locally)

### Quick Add Buttons
- **Purpose**: Frictionless one-tap water logging — the most-used control on the screen
- **Data source**: User's preferred units (glasses or ml); custom opens numeric input
- **Visual treatment**: Horizontal row, evenly spaced, 16pt horizontal margins. 8pt gap between buttons.
- **Size**: Full-width minus 32pt x 48pt
- **Sub-elements** (4 pill buttons):
  - "1 glass" button: Brand-orange (#FF5E00) fill, white text, --r-pill, 48pt height (In-Card CTA, not 56pt Brand CTA). This is the primary CTA — most common action.
  - "250 ml" button: ink-brown-800 fill, 1pt white at 10% border, white text, --r-pill, 48pt height
  - "500 ml" button: ink-brown-800 fill, 1pt white at 10% border, white text, --r-pill, 48pt height
  - "custom" button: ink-brown-800 fill, 1pt white at 10% border, white at 60% text, --r-pill, 48pt height
  - Each button: auto-width (flexible, divides available space with 8pt gaps), 2 lines — amount (15pt Sora Semibold) on top, unit (12pt Sora Regular) below
- **Variants**: Default (4 buttons as described), Post-tap (tapped button briefly flashes green + checkmark, "+1" floats up, then returns to normal), Goal just achieved (all buttons dim to 60% opacity momentarily while celebration plays, then restore)
- **Gestures**: Tap to log that amount immediately (no confirmation). "custom" opens a numeric keypad bottom sheet (see Custom Amount Modal). Long-press any preset to edit its value.

### Custom Amount Modal (Bottom Sheet)
- **Purpose**: Enter a custom water amount
- **Visual treatment**: Bottom sheet, ~40% screen height, ink-900 bg, 20pt top corners, drag handle
- **Content**:
  - Handle indicator + modal header ("cancel" / "log")
  - Large numeric display: user types amount, 36pt Sora Bold, white, center-aligned
  - Unit toggle: "ml" / "glasses" segmented control below number (same pattern as Screen 38 segmented control)
  - Numeric keypad: 4x3 grid, ink-brown-800 buttons, white text, 56pt per key
  - "log" button: Full-width orange CTA (Brand CTA Button pattern, 56pt, --r-pill)
- **Gestures**: Drag to dismiss, tap log to record entry

### Today's Log Section
- **Purpose**: Chronological timeline of today's individual drink entries
- **Data source**: API — GET /api/water (entries JSONB array, sorted by timestamp descending)
- **Visual treatment**: Section with eyebrow header + entry rows within ink-brown-800 glassmorphism card
- **Size**: Full-width minus 32pt x variable

**Section Header**:
- "TODAY'S LOG" — 12pt Sora Semibold, uppercase, white at 40%, +0.12em tracking, 16pt left margin. Standard eyebrow treatment.
- Right-aligned: entry count "4 entries" in 11pt Sora Regular, white at 30%
- Size: Full-width x 24pt (text + 8pt padding below)

**Drink Entry Row** (within grouped card):
- Size: Full-width minus 32pt x 52pt per row
- Sub-elements:
  - Water drop icon: 16pt, wellbeing-teal (#14B8A6), 16pt from card left edge
  - Timestamp: "8:30 AM" — 15pt Sora Semibold, white, 40pt from card left edge
  - Amount primary: "1 glass" or "500 ml" — 15pt Sora Regular, white, right-aligned 16pt from card right edge
  - Amount secondary: "(250 ml)" or "(2 glasses)" — 12pt Sora Regular, white at 40%, below primary amount
  - Separator: 1pt white at 5% between rows, inset 40pt from left (clears icon area). No separator on last row.
- **Variants**: Single glass entry, custom ml entry, large amount (500ml+, amount text in wellbeing-teal for emphasis)
- **Gestures**: Swipe left to reveal delete action (red "delete" button). Tap row for no action (informational).

### Weekly Bar Chart Card
- **Purpose**: 7-day trend visualization — shows consistency and progress toward daily targets
- **Data source**: API — GET /api/water/history (last 7 days)
- **Visual treatment**: ink-brown-800 glassmorphism card, --r-xl (28pt), 24pt padding. 16pt horizontal margins.
- **Size**: Full-width minus 32pt x ~200pt

**Section Header**:
- "THIS WEEK" — 12pt Sora Semibold, uppercase, white at 40%, +0.12em tracking
- Right-aligned: "avg 6.2 /day" in 13pt Sora Regular, white at 50%

**Chart area**:
- 7 vertical bars, evenly spaced across card content width
- Bar width: 24pt, --r-sm (10pt) top corners
- Bar fill: wellbeing-teal (#14B8A6) at 80%. Height proportional to intake (max height = card content area height minus labels)
- Bar fill (target met): wellbeing-teal at 100% with subtle glow
- Bar fill (today, incomplete): wellbeing-teal at 60% with 1pt dashed teal border on the unfilled portion
- Target line: 1pt dashed line, white at 20%, horizontally spanning all bars at the target height. Label "target" in 10pt Sora Regular, white at 25%, right-aligned
- Day labels below bars: "M", "T", "W", "T", "F", "S", "S" — 12pt Sora Regular, white at 40%, centered. Today's label: white at 100% + wellbeing-teal dot (4pt) below
- Value labels above bars (on tap): "7" or "1750ml" — 11pt Sora Semibold, white, centered above bar
- **Variants**: Full week data, partial week (Day 1-3 user — fewer bars, rest show empty placeholder bars at white 3%), all targets met (all bars glow, "perfect week" badge)
- **Gestures**: Tap individual bar to show value tooltip above it. Horizontal swipe to view previous weeks (paginated, spring-loaded).

### Stats Card
- **Purpose**: Gamification feedback and trend data — streak, average, personal best
- **Data source**: API — GET /api/water/stats
- **Visual treatment**: ink-brown-800 glassmorphism card, --r-md (14pt), 16pt padding. 3-column layout, equal widths.
- **Size**: Full-width minus 32pt x ~100pt
- **Sub-elements** (3 columns):
  - Column 1 — Streak:
    - Flame icon: 16pt, brand-orange (#FF5E00)
    - Value: "12" — 24pt Sora Bold, white, center-aligned
    - Label: "day streak" — 12pt Sora Regular, white at 50%, center-aligned, 4pt below value
  - Column 2 — Average:
    - Chart icon: 16pt, wellbeing-teal (#14B8A6)
    - Value: "6.5" — 24pt Sora Bold, white, center-aligned
    - Label: "avg glasses/day" — 12pt Sora Regular, white at 50%, center-aligned, 4pt below value
  - Column 3 — Best Day:
    - Trophy icon: 16pt, gold (#F59E0B)
    - Value: "9" — 24pt Sora Bold, white, center-aligned
    - Label: "best day" — 12pt Sora Regular, white at 50%, center-aligned, 4pt below value
  - Column separators: 1pt white at 5%, full column height, between columns
  - Count-up animation on mount: 0 to value over 280ms, ease-out-soft
- **Variants**: Active streak (flame icon in orange), broken streak (flame icon in white at 30%, "0 days" in white at 40%), new user (all values "—", "log water to start tracking")

### Target Setting Modal (Bottom Sheet)
- **Purpose**: Adjust daily water intake target
- **Data source**: API — current target from GET /api/water, updated via preferences
- **Visual treatment**: Bottom sheet, ~50% screen height, ink-900 bg, 20pt top corners, drag handle
- **Content**:
  - Handle indicator + modal header ("cancel" / "save")
  - Current target display: large number (36pt Sora Bold, white) + unit toggle ("glasses" / "ml")
  - Stepper controls: minus (−) and plus (+) circular buttons (44pt, ink-brown-800, white icon) flanking the number. Each tap adjusts by 1 glass or 250ml.
  - SIA suggestion note: "SIA recommends 8 glasses based on your activity level" — 13pt Sora Regular, white at 40%, with purple dot (6pt, #7F24FF). Only shown if SIA has a recommendation.
  - Preset options: "6 glasses (1.5L)", "8 glasses (2L)", "10 glasses (2.5L)" as selectable chips
  - "save" button: Full-width orange CTA (Brand CTA Button pattern, 56pt, --r-pill)
- **Gestures**: Drag to dismiss, tap save to update target, tap +/− to adjust

---

## Typography

| Element | Font | Weight | Size | Line Height | Color | Notes |
|---------|------|--------|------|-------------|-------|-------|
| Header title | Sora | 600 (Semibold) | 20pt | 26pt | White #FFFFFF | "Water intake" |
| Ring count primary | Sora | 700 (Bold) | 36pt | 40pt | White #FFFFFF | "5 / 8" numbers |
| Ring count separator | Sora | 400 (Regular) | 24pt | 28pt | White at 40% | "/" character |
| Ring count target | Sora | 700 (Bold) | 36pt | 40pt | White at 50% | Target number |
| Ring unit label | Sora | 400 (Regular) | 14pt | 18pt | White at 50% | "glasses" |
| Ring ml label | Sora | 400 (Regular) | 13pt | 17pt | #14B8A6 at 80% | "1250 ml" |
| Progress percentage | Sora | 600 (Semibold) | 15pt | 20pt | White at 60% | "63% of daily goal" |
| Quick add amount | Sora | 600 (Semibold) | 15pt | 20pt | White #FFFFFF | "1", "250", "500" |
| Quick add unit | Sora | 400 (Regular) | 12pt | 16pt | White #FFFFFF | "glass", "ml" |
| Section eyebrow | Sora | 600 (Semibold) | 12pt | 16pt | White at 40% | "TODAY'S LOG", uppercase |
| Entry timestamp | Sora | 600 (Semibold) | 15pt | 20pt | White #FFFFFF | "8:30 AM" |
| Entry amount | Sora | 400 (Regular) | 15pt | 20pt | White #FFFFFF | "1 glass" |
| Entry amount secondary | Sora | 400 (Regular) | 12pt | 16pt | White at 40% | "(250 ml)" |
| Chart day label | Sora | 400 (Regular) | 12pt | 16pt | White at 40% | "M", "T", etc. |
| Chart value tooltip | Sora | 600 (Semibold) | 11pt | 14pt | White #FFFFFF | Bar value |
| Chart target label | Sora | 400 (Regular) | 10pt | 14pt | White at 25% | "target" |
| Stat value | Sora | 700 (Bold) | 24pt | 28pt | White #FFFFFF | "12", "6.5", "9" |
| Stat label | Sora | 400 (Regular) | 12pt | 16pt | White at 50% | "day streak" |
| Goal achieved text | Sora | 600 (Semibold) | 15pt | 20pt | #34A853 | "Goal achieved! +25 XP" |
| Goal achieved time | Sora | 400 (Regular) | 13pt | 17pt | White at 40% | "at 3:45 PM" |
| Modal header actions | Sora | 600 (Semibold) | 15pt | 20pt | #FF5E00 / White at 60% | "save" / "cancel" |
| Modal large number | Sora | 700 (Bold) | 36pt | 40pt | White #FFFFFF | Target amount |

---

## Composition & Visual Hierarchy

**Squint test**:
- The progress ring dominates the upper half — a large, teal-accented circle that communicates status instantly without reading
- Quick add buttons sit directly below in a tight row, visually signaling "do this now" with the orange primary button anchoring the left
- Today's log entries form a structured, scannable list — timestamps on the left create a vertical rhythm
- The weekly bar chart provides a clear pattern of teal bars against the dark background, with the target line creating visual tension
- The stats card grounds the bottom with three evenly weighted columns — numbers are large enough to read during casual scrolling

**Spacing breakdown (8pt grid)**:
- Status bar: 44pt
- Domain Dashboard Header: 56pt (sticky)
- Gap to progress ring: 16pt
- Progress ring area: ~240pt (ring 200pt + labels 40pt)
- Gap to quick add: 32pt
- Quick add buttons: 48pt
- Gap to today's log: 32pt
- Section header: 24pt
- Drink entry rows: 52pt each (variable count)
- Gap to weekly chart: 32pt
- Section header: 24pt
- Weekly bar chart card: ~200pt
- Gap to stats: 16pt
- Stats card: ~100pt
- Bottom padding: 64pt

**Total scrollable content**: ~900-1100pt depending on number of drink entries (3-8 typical)

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | 60/30/10 base |
| Card surfaces | #211008 | ink-brown-800 | Glassmorphism with 1pt white 6% border |
| Domain accent line | #14B8A6 | wellbeing-teal | Domain color, header only |
| Progress ring fill | #14B8A6 | wellbeing-teal | Domain color — progress indicator |
| Progress ring glow | rgba(20, 184, 166, 0.15) | wellbeing-teal glow | Subtle glow behind filled portion |
| Progress ring track | white at 6% | — | Unfilled ring portion |
| Ring ml label text | #14B8A6 at 80% | wellbeing-teal | ml readout below count |
| Quick add primary (1 glass) | #FF5E00 | brand-orange | 60% role — primary CTA |
| Quick add secondary | #211008 | ink-brown-800 | Secondary preset buttons |
| Water drop icon | #14B8A6 | wellbeing-teal | Timeline entry marker |
| Bar chart fill | #14B8A6 at 80% | wellbeing-teal | Weekly bars — domain color |
| Bar chart fill (target met) | #14B8A6 at 100% | wellbeing-teal | Full bar with glow |
| Bar chart target line | white at 20% | — | Dashed reference line |
| Today bar indicator dot | #14B8A6 | wellbeing-teal | Below today's day label |
| Streak flame icon | #FF5E00 | brand-orange | 60% role — streak gamification |
| Average chart icon | #14B8A6 | wellbeing-teal | Stats column icon |
| Best day trophy icon | #F59E0B | — | Gold accent |
| Goal achieved ring | #34A853 | forest-green | 30% role — success/completion |
| Goal achieved text | #34A853 | forest-green | 30% role — celebration text |
| XP earned text | #34A853 | forest-green | 30% role — reward |
| Confetti particles (goal) | #14B8A6, #34A853, #F59E0B | teal, green, gold | Celebration burst |
| SIA dot (target modal) | #7F24FF | royal-purple | 10% role — AI indicator |
| Settings gear icon | white at 60% | — | Header action |
| Primary text | #FFFFFF at 100% | white | Ring count, timestamps, stat values |
| Secondary text | #FFFFFF at 60% | white-60 | Progress label, amounts |
| Tertiary text | #FFFFFF at 50% | white-50 | Unit labels, stat labels |
| Quaternary text | #FFFFFF at 40% | white-40 | Section headers, secondary amounts |
| Delete action (swipe) | #F44336 | error-red | Destructive action |

**60/30/10 verification**: Wellbeing-teal (#14B8A6) is the domain accent — progress ring, bar chart, water drop icons, day indicator, ml label. It signals "this is a wellbeing screen" without competing with orange. Orange dominates interactive elements (primary quick-add CTA, streak flame). Green appears on goal achievement states (ring completion, celebration text, XP). Purple limited to single SIA dot in target modal. Domain color (teal) confined to progress indicators and informational elements — never on CTAs. Ratio holds.

---

## Interaction States

### Quick Add Button (Primary — "1 glass")
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Brand-orange (#FF5E00) fill, white text, --r-pill | — |
| Pressed | Darker orange (#E05400) + scale(0.95) | medium impact |
| Success | Green flash (#34A853) for 400ms, white checkmark replaces text, "+1" floats up | success notification |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity (during celebration animation) | — |

### Quick Add Button (Secondary — "250ml", "500ml", "custom")
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 fill, 1pt white 10% border, white text | — |
| Pressed | Background lightens (white 5% overlay), scale(0.95) | light impact |
| Success | Green flash for 400ms, checkmark, "+1" floats up | success notification |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity | — |

### Daily Progress Ring
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Teal fill at current percentage | — |
| Tap (unit toggle) | Center text crossfades between glasses and ml | light impact |
| Goal achieved | Ring crossfades teal to green, confetti burst, glow intensifies | heavy impact + success notification |
| Loading | Ring track pulses, skeleton shimmer on text | — |

### Drink Entry Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Normal layout within card | — |
| Pressed | Row bg white at 5% | light impact |
| Swipe-left reveal | Delete button slides in from right (red bg, white "delete" text) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Weekly Bar Chart Bar
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Teal fill at proportional height | — |
| Pressed | Scale-x(1.1), tooltip appears above with value | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Settings Gear Icon
| State | Visual | Haptic |
|-------|--------|--------|
| Default | White at 60% | — |
| Pressed | White at 100%, scale(0.90) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Pull down | ScrollView | Pull-to-refresh (reload water data, recalculate progress) |
| Tap | Quick add button | Log water amount immediately, animate ring fill |
| Tap | Progress ring center | Toggle primary unit (glasses / ml) |
| Tap | Settings gear | Open Target Setting modal |
| Tap | Bar chart bar | Show day value tooltip |
| Tap | Back button | Pop stack |
| Swipe left | Drink entry row | Reveal delete action |
| Swipe horizontal | Weekly chart | Navigate to previous/next week |
| Long-press | Quick add preset | Edit preset amount |
| Swipe right from edge | Screen | iOS back gesture |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Screen content | Mount | Staggered fade-in: ring (0ms), quick add (80ms), today's log (160ms), chart (240ms), stats (320ms) | 280ms each | ease-out-soft |
| Progress ring fill | Mount | Stroke-dashoffset animates from 0 to current percentage (clockwise draw-in) | 800ms | ease-flow |
| Progress ring fill | Water logged | Stroke extends to new percentage from current position | 520ms | ease-flow |
| Ring center text | Water logged | Count increments with brief scale(1.05) bounce on the changing number | 280ms | ease-out-soft |
| Ring unit toggle | Tap center | Crossfade: current text fades out + translateY(-8pt), new text fades in + translateY(8pt to 0) | 280ms | ease-out-soft |
| Quick add success | Tap button | Green flash (bg color transition), checkmark replaces text (scale-in), "+1" text floats up 24pt + fades out | 400ms flash, 600ms float | ease-out-soft |
| Goal achievement | Last glass logged | Ring fill crossfades teal to green (520ms), ring scale(1.0 to 1.05 to 1.0) pulse, confetti burst from ring perimeter (40 particles, 2s duration), center text updates, "+25 XP" floats up from ring center | 520ms ring, 2000ms confetti | ease-flow |
| Goal achievement glow | After ring transition | Pulsing green glow behind ring (opacity 10% to 25% to 10%), continuous loop for 5s then settles at 10% | 1200ms per cycle | ease-in-out |
| New drink entry | Water logged | New row appears at top of today's log: height(0 to 52pt) + fade-in, existing rows slide down | 280ms | ease-out-soft |
| Bar chart bars | Enter viewport | Bars grow from bottom: height(0 to value), staggered 40ms between bars left to right | 280ms each | ease-out-soft |
| Bar tooltip | Tap bar | Tooltip scales in above bar (scale 0 to 1), fade-in | 160ms | ease-out-soft |
| Stats count-up | Enter viewport | Values count from 0 to final number | 280ms | ease-out-soft |
| Swipe delete | Swipe left | Delete button slides in from right, row bg tints red at 5% | 280ms | ease-out-soft |
| Row delete | Confirm delete | Row height collapses to 0, adjacent rows slide up, ring fill decreases | 280ms | ease-out-soft |
| Target modal | Gear tap | Bottom sheet slides up from y=screenHeight to final position | 520ms | ease-out-soft |

**Screen transition**:
- **Enter**: Stack push slide-in from right (280ms, ease-out-soft)
- **Exit**: Stack pop slide-out to right (280ms, ease-out-soft)

---

## Empty States

### Day 1 (new user)
- **Progress ring**: "0 / 8" in white at 30%. Ring track visible (white 6%), no fill. Center secondary text: "glasses" in white at 30%. Below ring: "tap a button below to start logging" in 15pt Sora Regular, white at 40%, center-aligned.
- **Quick add buttons**: All visible and functional. Primary "1 glass" button has a subtle pulse animation (opacity 80% to 100%, 1.2s loop) to draw attention.
- **Today's log**: Section replaced by centered empty state. Water drop icon (outlined, 40pt, white at 15%) + "your drinks will appear here" in 15pt Sora Regular, white at 40%.
- **Weekly bar chart**: All 7 bars at minimum height (white 3%). Target line visible. "log water to start seeing your trend" in 13pt Sora Regular, white at 30%, centered below chart.
- **Stats card**: All values show "—". Label: "log water to start tracking" in 13pt Sora Regular, white at 40%, center-aligned spanning all columns.
- **SIA suggestion**: If SIA has context from onboarding, a coaching note card appears above the ring: "staying hydrated helps everything else work better. start with 8 glasses." (purple dot, standard SIA Coaching Note Card pattern, 72pt).

### Error States
- **API failure (GET /api/water)**: Ring shows last cached data if available, with a small amber warning icon (12pt) next to the percentage label. Banner below header: "could not load latest data — showing cached" in 13pt Sora Regular, amber (#F59E0B), dismissible X.
- **API failure (POST /api/water/log)**: Quick add button reverts to default state (green flash does not play). Inline error toast slides down from below header: "could not log water. tap to retry." in 13pt Sora Regular, white on error-red (#F44336) at 15% bg, 48pt height. Tapping retries.
- **No connectivity**: Full-screen empty state with cloud-offline icon (48pt, white at 15%). "no internet connection" in 17pt Sora Semibold, white. "water logging requires a connection" in 15pt Sora Regular, white at 50%. Pull-to-refresh available to retry.

---

## Motivation Adaptation

- **Low motivation**: Progress ring displays a simplified view — glasses only, no ml conversion. Quick add buttons reduce to just 2 options: "1 glass" (orange CTA) and "sip" (half glass, secondary). Today's log is hidden entirely to reduce data overwhelm. Weekly chart is hidden. Stats card shows only streak (the single most motivating metric). SIA adds a coaching note above the ring: "just one glass. that's all." Goal achievement threshold may be lowered by SIA (e.g., 6 glasses instead of 8). Celebration is amplified — confetti and XP feel generous for reaching a lower bar.

- **Medium motivation**: Default experience as described. All components visible. 4 quick-add presets. Full today's log, weekly chart, and stats card. Standard 8-glass target. Normal XP award on goal achievement.

- **High motivation**: Additional data surfaces below stats card: a 30-day trend sparkline (micro line chart, 48pt tall, teal stroke), hourly distribution dot plot showing when the user typically drinks (helps optimize hydration timing), and a "hydration score" derived from consistency and timing (0-100, displayed as a compact radial gauge). Quick add buttons expand to 5 presets (adding "750ml" or "1L" for users who drink from larger bottles). Weekly chart expands to show 14 days with horizontal scroll. Goal target automatically increases if consistently exceeded for 7+ days (SIA recommends the increase).

---

## Edge Cases

### Midnight Rollover
When the clock passes midnight while the user is on this screen:
- **Progress ring**: Animates from current fill to 0% (520ms ease-flow, counterclockwise drain effect). Center text crossfades from "X / 8 glasses" to "0 / 8 glasses" (280ms ease-out-soft).
- **Today's log**: Entries fade out (280ms, opacity 1 to 0), section shows "no entries yet" placeholder.
- **Weekly bar chart**: The "today" indicator dot slides to the new day label (280ms ease-out-soft). Yesterday's bar freezes at its final value.
- **Stats card**: Streak counter updates — if yesterday's goal was met, streak increments (count-up animation). If not, streak resets to 0 with a brief orange flash on the flame icon.
- **SIA coaching note**: Crossfades to a new message appropriate for the new day ("new day, fresh start" or "yesterday was a great day — keep it going").
- **Celebration timing**: If the user achieves the daily goal within the last 5 minutes before midnight, the goal celebration plays immediately and completes before the rollover animation begins. The rollover waits 3 seconds after celebration ends.

### Quick Add Button Sizing Clarification
The 4 Quick Add buttons (1 glass, 250ml, 500ml, custom) divide the available width equally with 8pt gaps:
- Available width: screen width minus 32pt (16pt margins each side)
- Button width: (available width - 3 × 8pt gaps) / 4
- **Button height: 48pt** (In-Card CTA height, not 56pt Brand CTA height — 4 buttons at 56pt would be too cramped on smaller screens)
- The primary "1 glass" button uses orange fill; the remaining 3 use ink-brown-800 with border

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Water log submission fails | CTA shows error state (red border flash, 280ms), "could not log — try again" toast (top, 3s auto-dismiss) | CTA returns to default state, user input preserved |
| Weekly chart data load fails | Chart area shows "could not load chart" in 15pt Regular, white at 40%, centered + "retry" link in orange | Tap retry re-fetches trend data |
| Stats card load fails | Stats card shows skeleton shimmer then "could not load stats" + "retry" link | Tap retry re-fetches stats |
| SIA coaching note load fails | Card shows "could not load SIA note" placeholder in 15pt Regular, white at 40% | Auto-retries on next pull-to-refresh |
| Target setting save fails | Modal CTA shows error state, "could not save target — try again" toast | CTA re-enables, user input preserved in modal |
| Network offline | All API-dependent sections show last cached data with "offline — showing cached data" banner (48pt, ink-brown-800, white at 50% text, top of scroll). Quick Add buttons remain functional — logs queue locally and sync when online. | Banner includes "tap to retry" when connectivity returns |
| Drink entry delete fails | Swipe-delete row snaps back to position, "could not delete — try again" toast | Row returns to original state, user can retry swipe |

---

## Accessibility

Accessibility follows global standards from `_shared-patterns.md`. Screen-specific notes:

- **Progress ring**: VoiceOver reads "Daily water intake: 5 of 8 glasses, 63% of daily goal. 1250 milliliters consumed."
- **Quick add buttons**: Each button has an accessibility label including the amount: "Add 1 glass, 250 milliliters", "Add 250 milliliters", "Add 500 milliliters", "Add custom amount"
- **Drink entry rows**: VoiceOver announces timestamp, amount, and unit: "8:30 AM, 1 glass, 250 milliliters". Swipe actions accessible via long-press context menu fallback.
- **Weekly bar chart**: Summary text for screen readers: "Weekly water intake chart. Average 6.5 glasses per day. Today is 63% of target." Individual bars not individually focusable — summary conveys the insight.
- **Stats card**: VoiceOver reads each stat in sequence: "12-day streak. 6.5 average glasses per day. Best day: 9 glasses."
- **Unit toggle** (glasses/ml): Accessible toggle role with state announcement: "Showing glasses" / "Showing milliliters"
- **Touch targets**: All interactive elements meet 44x44pt minimum. Quick add buttons are 48pt tall with full-width division.
- **Color contrast**: All text meets WCAG AA on ink-900 background. Wellbeing-teal (#14B8A6) on ink-900 achieves 5.9:1 (passes AA for large text).
- **Reduced motion**: Progress ring appears at final fill position without sweep animation. Bar chart bars appear without staggered draw. Celebration confetti replaced with simple green glow (280ms fade).

---

## Cross-References

- **Navigates to**: SIA Chat [09] (via SIA coaching note tap, tab switch), Target Setting (modal), Celebration Overlay [42] (overlay, on major streak milestones — daily goal uses inline celebration)
- **Navigates from**: Screen [12] — Home Screen (via wellbeing action card or water widget, stack push), Screen [18] — Explore Section (via wellbeing module card, stack push), Screen [38] — Habits (via "drink water" habit deep-link, stack push), Screen [09] — SIA Chat (via hydration reminder deep-link, stack push)
- **Shared components with**: Screen [26] — Fitness Dashboard (Domain Dashboard Header pattern, Section Header eyebrow, Stat Tile 3-column layout), Screen [38] — Habits (streak indicator, completion celebration pattern), Screen [42] — Celebration Overlay (confetti particle system, XP popup float), Screen [28] — Nutrition Dashboard (progress ring visual language, daily logging pattern)
- **Patterns used**: Domain Dashboard Header (Screen 26 — back + title + accent line), Brand CTA Button (Batch 1), 8-State Interaction Model, Stack Navigation, Content Entry Animation (staggered fade-in), Section Header Eyebrow (Screen 38), Stat Tile 3-column (Screen 26), SIA Coaching Note Card (Screen 26, used in empty state and target modal), Swipe Actions (Screen 38 — swipe-left delete), Modal Presentation (Batch 1)
- **Patterns established**: Circular Progress Ring (large ring with stroke fill, center text, glow, and unit toggle), Quick Add Button Row (preset pill buttons for instant logging with success animation), Drink Entry Row (timeline-style entry with water drop icon, timestamp, amount), Inline Goal Celebration (confetti burst + ring color transition + XP popup without full-screen overlay — lighter than Screen 42, appropriate for daily micro-achievements), Water Weekly Bar Chart (7-day vertical bars with target line overlay and day indicator), Custom Amount Numeric Keypad Modal (bottom sheet with large display + keypad for precise input)
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-04.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U02`
**Prototype route**: `/tabs/today/water-intake`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q10 guest preview may remain a clearly labeled preview/demo entry form.
- Q11 SIA onboarding only needs enough interactivity to reach Initial plan.
- Q12 voice-inline can remain a QA route but production should treat it as SIA chat state.
- Q13 voice privacy requires permission, consent, transcript control, deletion, and raw-audio handling states.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B04-F01 | critical | retention | Wire preset logging, custom numeric entry, success feedback, undo/delete, target celebration, and failure recovery. |
| B04-F02 | major | accessibility | Make the gear a labeled 44x44 button/link that opens the target-setting sheet. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

