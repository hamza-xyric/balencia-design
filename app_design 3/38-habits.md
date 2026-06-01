# Screen Design: Habits

**Screen**: 38 of 73
**File**: 38-habits.md
**Register**: Product Mode
**Primary action**: check off habit
**Tab**: Me (pushed from Explore)
**Navigation**: Stack depth 2-3 from Me tab root (Me Main → Explore → Habits). Entry from Explore [18] grid card, SIA deep-link [09] ("your morning routine is ready"), or Home Screen [12] action cards. Exit via back button to Explore, or forward to SIA Chat [09], Add Habit (modal).

---

## Purpose

This screen is the user's daily habit dashboard — a satisfying checklist of recurring behaviors grouped by time of day, with streak tracking and a calendar heatmap showing long-term consistency. It answers "what do I need to do today and how consistent have I been?" Habits feed directly into the RPG system: each completion earns XP, streaks multiply rewards, and habit consistency is a major driver of the user's leaderboard rank. SIA suggests starter habits for new users and adapts the list as user behavior patterns emerge.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Screen header — "Habits" title with back navigation
2. Daily completion rate — visual progress bar showing today's habit completion
3. Segmented control — Today / Week / Month view toggle
4. Habits checklist — grouped by time of day, each with checkbox, name, streak, domain tag
5. Calendar heatmap — long-term consistency visualization
6. XP summary — total XP earned from habits today
7. Add habit FAB — always visible

**User flow**:
- **Arrives from**: Explore [18] via "Habits" card (stack push), SIA Chat [09] via deep-link, Home Screen [12] via habit-related action card
- **Primary exit**: Back to Explore [18] (stack pop)
- **Secondary exits**: SIA Chat [09] via SIA suggestion tap (tab switch), Add/Edit Habit (modal), Habit Analytics (stack push for Week/Month views)

---

## Layout

**Scroll behavior**: SectionList (grouped by time of day with section headers)
**Tab bar visible**: Yes

### ASCII Wireframe

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  ← [back]        "Habits"          │  ← Screen Header (44pt)
├─────────────────────────────────────┤
│                                     │  ← 16pt gap
│  5 of 8 today                       │  ← Completion Rate
│  ▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░  62%        │     (orange progress bar)
│                                     │  ← 16pt gap
│  [ Today ][ Week ][ Month ]        │  ← Segmented Control
│                                     │  ← 24pt gap
│  MORNING                            │  ← Section Header
│  ┌─────────────────────────────┐   │
│  │ [✓] Drink water             │   │  ← Habit Row (checked)
│  │     🔥 21 days  [wellbeing] │   │     streak + domain tag
│  ├─────────────────────────────┤   │
│  │ [✓] 10 min meditation       │   │  ← Habit Row (checked)
│  │     🔥 14 days  [meditation]│   │
│  ├─────────────────────────────┤   │
│  │ [ ] Morning journal          │   │  ← Habit Row (unchecked)
│  │     🔥 7 days   [wellbeing] │   │
│  └─────────────────────────────┘   │
│                                     │  ← 16pt gap
│  AFTERNOON                          │  ← Section Header
│  ┌─────────────────────────────┐   │
│  │ [✓] 30 min reading          │   │
│  │     🔥 12 days  [product.]  │   │
│  ├─────────────────────────────┤   │
│  │ [ ] Review finances          │   │
│  │     🔥 3 days   [finance]   │   │
│  └─────────────────────────────┘   │
│                                     │  ← 16pt gap
│  EVENING                            │  ← Section Header
│  ┌─────────────────────────────┐   │
│  │ [✓] Log meals               │   │
│  │     🔥 9 days   [nutrition] │   │
│  ├─────────────────────────────┤   │
│  │ [✓] Gratitude list          │   │
│  │     🔥 5 days   [faith]     │   │
│  ├─────────────────────────────┤   │
│  │ [ ] Screen off by 10pm      │   │
│  │     🔥 2 days   [wellbeing] │   │
│  └─────────────────────────────┘   │
│                                     │  ← 24pt gap
│  ┌─────────────────────────────┐   │
│  │  M  T  W  T  F  S  S       │   │  ← Calendar Heatmap
│  │ [▓][▓][▓][░][▓][▓][ ]      │   │     (4-week view)
│  │ [▓][░][▓][▓][▓][░][▓]      │   │     graduated orange
│  │ [▓][▓][▓][▓][░][▓][▓]      │   │
│  │ [▓][▓][░][▓][▓][ ][ ]      │   │
│  │  May 2026                    │   │
│  └─────────────────────────────┘   │
│                                     │  ← 16pt gap
│  ┌─────────────────────────────┐   │
│  │  +75 XP earned today        │   │  ← XP Summary Card
│  │  keep going — 3 habits left │   │
│  └─────────────────────────────┘   │
│                                     │
│                     ┌──────────────┐│
│                     │ + add habit  ││ ← FAB (orange pill)
│                     └──────────────┘│
│                                     │
├─────────────────────────────────────┤
│  Today  |  SIA  |  Goals  |  Me   │  ← Tab Bar
├─────────────────────────────────────┤
│         Home Indicator (34pt)       │
└─────────────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Screen Header** — 44pt
   - Purpose: Title and back navigation
   - Content: Back chevron + "Habits" title

2. **Completion Rate Bar** — ~56pt
   - Purpose: Today's progress at a glance
   - Content: "5 of 8 today" text + full-width orange progress bar + percentage

3. **Segmented Control** — 40pt
   - Purpose: Switch between Today / Week / Month views
   - Content: Three segments with active state

4. **Habit Sections** — Variable (SectionList)
   - Purpose: Habit checklist grouped by time of day
   - Content: Morning / Afternoon / Evening section headers + habit rows

5. **Calendar Heatmap Card** — ~160pt
   - Purpose: Long-term consistency visualization
   - Content: 4-week grid + month label

6. **XP Summary Card** — ~64pt
   - Purpose: RPG reward feedback
   - Content: XP earned today + encouragement from SIA

7. **Floating Action Button** — 48pt (fixed)
   - Purpose: Add new habit
   - Content: Plus icon + "add habit"

---

## Components

### Screen Header
- **Purpose**: Title and navigation
- **Visual treatment**: ink-900 background, 44pt height. Back chevron left + "Habits" center (17pt Sora Semibold, white).
- **Size**: Full-width x 44pt

### Completion Rate Bar
- **Purpose**: Shows daily habit completion at a glance — the screen's emotional anchor
- **Data source**: Calculated from today's habit completion count
- **Visual treatment**: 16pt horizontal margins. No card enclosure — sits directly on ink-900.
- **Content**:
  - Label: "5 of 8 today" — 16pt Sora Semibold, white. Left-aligned. The count is the most prominent text.
  - Progress bar: Full-width minus 32pt, 8pt tall, --r-xs corners. Track: white at 8%. Fill: burnt orange (#FF5E00). Animated on data change.
  - Percentage: Right-aligned inline with label, 16pt Sora Semibold, white at 70%.
- **Variants**: Partial (orange fill), Complete (green #34A853 fill, "all done" label with green checkmark), Empty (no fill, "0 of 8")
- **Size**: Full-width minus 32pt x ~56pt (label + bar + padding)

### Segmented Control
- **Purpose**: Toggle between Today (checklist), Week (daily completion bars), Month (calendar overview)
- **Data source**: View state (local)
- **Visual treatment**: 16pt horizontal margins
- **Content**:
  - Container: Full-width minus 32pt, 40pt tall, ink-brown-800 bg, --r-pill corners
  - Three segments: "today" / "week" / "month" (13pt Sora Semibold, sentence case)
  - Active segment: Burnt orange (#FF5E00) fill, white text, --r-pill corners, 2pt inset from container edge
  - Inactive segments: Transparent bg, white at 60% text
  - Transition: Active indicator slides to new position (280ms, ease-out-soft)
- **Variants**: Today (default, shows checklist below), Week (shows 7-day completion bars), Month (shows full calendar heatmap)
- **Gestures**: Tap segment to switch view
- **Size**: Full-width minus 32pt x 40pt

### Section Header (Morning / Afternoon / Evening)
- **Purpose**: Groups habits by time of day
- **Data source**: Habit's assigned time-of-day property
- **Visual treatment**: No card — plain text on ink-900 background
- **Content**: "MORNING" / "AFTERNOON" / "EVENING" — 12pt Sora Semibold, uppercase, white at 40%, +0.12em tracking, 16pt left margin. Standard eyebrow treatment.
- **Size**: Full-width x 24pt (text + 8pt padding below)

### Habit Row
- **Purpose**: Individual habit item with checkbox, name, streak, and domain tag
- **Data source**: API — user's habits for current time-of-day group
- **Visual treatment**: Rows within an ink-brown-800 glassmorphism card per section group (one card per time-of-day group). 20pt radius on the group card. Each row has 16pt horizontal padding.
- **Content per row** (64pt tall):
  - Checkbox (left, 24pt):
    - Unchecked: 24pt square, --r-xs corners, 1.5pt border white at 20%, transparent fill
    - Checked: orange (#FF5E00) fill, white checkmark (14pt, 2pt stroke). Check animation: checkmark draws in (stroke-dashoffset), fill fades in, 160ms ease-out-soft.
  - Habit name (center, 12pt left of checkbox): 16pt Sora Regular, white. Checked: white at 50%, no strikethrough (keeps readability).
  - Second line (below name, left-aligned with name):
    - Streak: Flame icon (14pt, orange #FF5E00) + count ("21 days") in 12pt Sora Semibold, white at 60%. If streak is 0: hidden.
    - Domain tag chip: 8pt right of streak. Domain Tag Chip as defined in Screen 37 (domain color 15% bg, domain color text, 11pt, --r-sm, 24pt height).
  - Separator: 1pt white at 5% between rows, inset 56pt from left (clears checkbox area). No separator on last row.
- **Variants**: Checked (orange fill, muted name), Unchecked (empty checkbox), Streak active (flame visible), No streak (flame hidden), Reordering (drag handles visible in edit mode)
- **Gestures**: Tap checkbox to toggle completion, long-press to reorder (edit mode), swipe left to reveal edit/delete actions
- **Size**: Full-width minus 32pt x 64pt per row

### Calendar Heatmap Card
- **Purpose**: Visualize habit completion consistency over the past 4 weeks
- **Data source**: API — daily completion rate aggregated over 28 days
- **Visual treatment**: ink-brown-800 glassmorphism card, 20pt radius, 24pt padding
- **Content**:
  - Day-of-week labels (top row): M, T, W, T, F, S, S — 11pt Sora Regular, white at 30%, centered above each column
  - 4 rows x 7 columns grid:
    - Cell size: 28pt square, --r-xs corners
    - No habits completed: white at 5% fill
    - 1-33% completed: orange (#FF5E00) at 20% opacity
    - 34-66% completed: orange at 50% opacity
    - 67-99% completed: orange at 75% opacity
    - 100% completed: orange at 100% opacity
    - Future days: white at 3% fill (barely visible)
    - Today: 1.5pt orange border (dashed if incomplete, solid if complete)
    - Gap between cells: 4pt
  - Month label: "May 2026" — 13pt Sora Regular, white at 40%, left-aligned below grid, 8pt below last row
- **Variants**: Active (graduated fills), Empty month (all white 5%, "start building your streak")
- **Gestures**: Tap cell for that day's completion detail (lightweight tooltip showing "6 of 8 completed")
- **Size**: Full-width minus 32pt x ~160pt

### XP Summary Card
- **Purpose**: RPG gamification feedback — how much XP habits have earned today
- **Data source**: Calculated from today's completed habits
- **Visual treatment**: ink-brown-800 glassmorphism card, 20pt radius, 16pt padding. Compact card.
- **Content**:
  - XP line: "+75 XP earned today" — 15pt Sora Semibold, green (#34A853). The "+75" is the visual anchor.
  - Encouragement: "keep going — 3 habits left" — 13pt Sora Regular, white at 50%. Or if all done: "all habits complete. solid day." in green.
- **Variants**: Partial completion (orange-tinted encouragement), Full completion (green celebration), No XP yet (hidden or "start checking off habits to earn XP")
- **Size**: Full-width minus 32pt x ~64pt

### Floating Action Button
- **Purpose**: Add a new habit
- **Visual treatment**: Identical FAB pattern. Label: "add habit".
- **Gestures**: Tap opens Add Habit modal (bottom sheet with habit name, domain selector, time-of-day selector, frequency options)
- **Size**: Auto-width (~140pt) x 48pt

### Add Habit Modal (Bottom Sheet)
- **Purpose**: Create a new habit
- **Visual treatment**: Bottom sheet, ~60% screen height, ink-900 bg, 20pt top corners, drag handle
- **Content**:
  - Handle indicator + modal header ("cancel" / "save")
  - Habit name input: Text Input Field (52pt, established pattern from Batch 1). Placeholder: "habit name"
  - Domain selector: Horizontal scroll of domain chips. Tap to select one.
  - Time-of-day selector: Three pill buttons — "morning" / "afternoon" / "evening". Default: based on current time.
  - Frequency: "daily" default. Optional: "weekdays only" / "custom days" selector.
  - "save" button: Full-width orange CTA (Brand CTA Button pattern, 56pt, --r-pill)
- **Gestures**: Drag to dismiss, tap save to create

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Base |
| Section cards | #211008 | ink-brown-800 | Glassmorphism |
| Completion bar fill | #FF5E00 | orange (primary) | Progress toward daily total |
| Completion bar (all done) | #34A853 | green (secondary) | Full completion celebration |
| Segmented active | #FF5E00 | orange (primary) | Active segment fill |
| Checkbox checked fill | #FF5E00 | orange (primary) | Habit completion — the satisfying tap |
| Checkbox checkmark | #FFFFFF | white | On orange fill |
| Streak flame | #FF5E00 | orange (primary) | Streak emphasis |
| FAB background | #FF5E00 | orange (primary) | CTA |
| XP text | #34A853 | green (secondary) | Reward/success |
| Heatmap fills | #FF5E00 at 20-100% | orange (primary) | Graduated consistency |
| Heatmap today border | #FF5E00 | orange (primary) | Today indicator |
| Domain tags (all 10) | Various at 15% bg | domain colors | Identification only — see `_shared-patterns.md` domain color table |
| Primary text | #FFFFFF | white | Habit names, counts |
| Secondary text | white at 60% | — | Streak counts, muted checked names |
| Tertiary text | white at 50% | — | Encouragement text |
| Quaternary text | white at 40% | — | Section headers, day labels |

**60/30/10 verification**: Orange dominates — completion bar, checkboxes, segmented control, streak flames, FAB, heatmap fills. Green on XP earned and full completion state. No purple on this screen (habits are user-driven, not SIA-driven; SIA presence is only in empty states). Domain colors on tags only. Ratio holds with orange as the clear visual driver.

---

## Interaction States

### Habit Checkbox
| State | Visual | Haptic |
|-------|--------|--------|
| Default (unchecked) | 24pt square, white 20% border, transparent fill | — |
| Pressed | Border brightens to white 40%, scale(0.90) | light impact |
| Checked | Orange fill fades in, white checkmark draws in, "+10 XP" floats up | success notification |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity (e.g., future habit) | — |

### Segmented Control Segment
| State | Visual | Haptic |
|-------|--------|--------|
| Default (inactive) | Transparent bg, white 60% text | — |
| Pressed | White 5% bg flash | light impact |
| Active | Orange fill slides in, white text | medium impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Calendar Heatmap Cell
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Graduated orange fill | — |
| Pressed | Scale(1.15), tooltip appears above | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Habit Row (Long-press)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Normal layout | — |
| Long-pressed | Row lifts with --shadow-2, scale(1.02), bg brightens slightly | heavy impact |
| Dragging (reorder) | Row follows finger, gap appears at drop target | — |
| Swipe-left reveal | Edit/delete buttons slide in from right (neutral "edit" on white at 10% bg, red "delete" on error-red bg) | light impact |

### Floating Action Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange bg, --shadow-2 | — |
| Pressed | Darker orange, scale(0.95), --shadow-1 | medium impact |
| Focus-visible | 2pt orange ring, offset 4pt | — |

### Loading States
Habit cards follow the skeleton loading pattern from `_shared-patterns.md` — card outlines at ink-brown-800 with animated shimmer (1.2s loop). Cards load independently — resolved cards render immediately while remaining cards continue shimmer. Streak calendar loads skeleton row first, then populates day cells (staggered 30ms per cell, left to right). Habit ring in header shows empty ring outline during load, fills on data resolve (400ms ease-out-soft).

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Pull down | SectionList | Pull-to-refresh (reload habits, recalculate completion) |
| Tap | Checkbox | Toggle habit completion, earn XP |
| Tap | Segmented control | Switch view (Today/Week/Month) |
| Tap | Heatmap cell | Show day detail tooltip |
| Tap | FAB | Open Add Habit modal |
| Long-press | Habit row | Enter reorder mode (drag to rearrange) |
| Swipe left | Habit row | Reveal edit/delete actions |
| Tap | Back button | Pop stack |
| Swipe right from edge | Screen | iOS back gesture |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Screen content | Mount | Staggered fade-in: completion bar (0ms), segmented control (80ms), morning section (160ms), afternoon (240ms), evening (320ms), heatmap (400ms) | 280ms each | ease-out-soft |
| Checkbox check | Tap | Checkmark stroke draws in (stroke-dashoffset), fill color fades in, row text mutes to 50% | 160ms | ease-out-soft |
| XP popup | Habit checked | "+10 XP" text appears at checkbox, floats up 24pt, fades out | 600ms | ease-out-soft |
| Completion bar fill | Habit checked/unchecked | Bar width animates to new percentage | 280ms | ease-out-soft |
| Completion bar green | Last habit checked | Fill crossfades orange → green, "all done" label fades in | 280ms | ease-out-soft |
| Segmented control | Tap segment | Active indicator slides horizontally to new segment | 280ms | ease-out-soft |
| View switch | Segment change | Content crossfades between Today/Week/Month views | 280ms | ease-out-soft |
| Heatmap cells | Enter viewport | Staggered opacity fade-in, 20ms stagger per cell, top-left to bottom-right | 160ms each | ease-out-soft |
| Reorder drag | Long-press | Row lifts with shadow, scales up. Gap opens at drop target. | 160ms lift | ease-out-soft |
| Swipe actions | Swipe left | Edit (white at 10% bg, white text) / delete (error-red bg, white text) buttons slide in from right. Follows Swipe Action Color Convention from _shared-patterns.md. | 280ms | ease-out-soft |
| FAB | Mount | scale(0.8→1) + opacity(0→1), 400ms delay | 280ms | ease-out-soft |

**Screen transition**:
- **Enter**: Standard stack push
- **Exit**: Stack pop

---

## Empty States

### Day 1 (new user)
- Completion bar: "0 of 0 today" — but this shouldn't happen if SIA suggests starters.
- SIA suggestion card replaces the habits list: "SIA has some ideas based on your goals. Want to start with a few habits?" with "let SIA suggest" chip (orange-outlined). Tapping sends user to SIA Chat [09] or auto-populates 3-5 starter habits.
- Starter suggestions (if auto-populated): "drink water" (wellbeing), "10 min reading" (productivity), "gratitude list" (faith/wellbeing). Each pre-tagged with appropriate domain.
- Calendar heatmap: All cells white 5%. "your consistency story starts today."
- XP summary: Hidden until first habit completion.

### Established user (zero state — all habits done today)
- Completion bar: Green fill, "all done" with green checkmark.
- All checkboxes filled with orange checks.
- XP summary: "+75 XP earned today. solid day." in green.
- SIA doesn't add extra messaging here — the green completion state speaks for itself.

---

## Motivation Adaptation

- **Low motivation**: Fewer habits shown (SIA auto-hides low-priority habits, shows only 2-3 most important). Completion bar shows "2 of 3 today" (achievable). XP rewards are amplified visually. SIA adds a low-pressure note at the top: "just pick one. that's enough."
- **Medium motivation**: Full experience as described. All habits visible. Standard XP.
- **High motivation**: Additional analytics appear below heatmap: weekly completion trend chart (sparkline), domain breakdown of habit consistency, comparison to previous weeks. More habits may be auto-suggested by SIA. Streaks show exact day counts instead of rounded numbers.

---

## Error Handling

| Error Scenario | Visual Treatment | Recovery Action |
|----------------|------------------|-----------------|
| Habit list load fails | Habit sections show "could not load habits" in 15pt Regular, white at 40%, centered + "retry" link in orange | Tap retry re-fetches habit list |
| Habit completion toggle fails | Checkbox reverts to unchecked state (280ms bounce-back animation), "could not save — try again" toast (top, 3s auto-dismiss, error-red left border). XP popup does not trigger. | Tap checkbox retries. User streak and XP are not affected until server confirms. |
| Calendar heatmap data unavailable | Heatmap shows empty grid at 5% opacity with "no data" centered in 13pt Regular, white at 40% | Auto-retries on next pull-to-refresh |
| Add habit submission fails | Modal CTA shows error state (red border flash, 280ms), "could not create habit — try again" toast. Modal stays open with form data preserved. | User taps CTA again to retry |
| Habit delete fails | Habit row slides back into place (reverse of swipe-delete animation, 280ms), "could not delete — try again" toast | User can retry swipe-delete |
| Completion bar sync error | Completion count shows stale data with subtle warning icon (14pt, amber #F59E0B) next to count | Auto-syncs on next successful API call |
| SIA suggestion load fails | Empty state SIA section shows "could not load suggestions" in 15pt Regular, white at 40% | Pull-to-refresh retries |
| Network offline | All sections show last cached data with "offline — showing cached data" banner (48pt, ink-brown-800, white at 50% text, top of scroll area). Habit completions queue locally with pending indicator (small clock icon, 12pt, white at 30%, next to checkbox). Queued completions sync when online — XP awarded on sync confirmation. | Banner includes "tap to retry" when connectivity returns. Queued items show "syncing..." state on reconnection. |

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Screen header title | Sora | 600 (Semibold) | 17pt | 22pt | White #FFFFFF |
| Completion rate label ("5 of 8 today") | Sora | 600 (Semibold) | 16pt | 22pt | White #FFFFFF |
| Completion rate percentage | Sora | 600 (Semibold) | 16pt | 22pt | White at 70% |
| Segmented control labels | Sora | 600 (Semibold) | 13pt | 16pt | White #FFFFFF (active) / White at 60% (inactive) |
| Section headers ("MORNING", etc.) | Sora | 600 (Semibold) | 12pt | 14pt | White at 40% |
| Habit name | Sora | 400 (Regular) | 16pt | 22pt | White #FFFFFF (unchecked) / White at 50% (checked) |
| Streak count | Sora | 600 (Semibold) | 12pt | 16pt | White at 60% |
| Domain tag chip | Sora | 600 (Semibold) | 11pt | 14pt | [domain color] |
| Heatmap day labels | Sora | 400 (Regular) | 11pt | 14pt | White at 30% |
| Heatmap month label | Sora | 400 (Regular) | 13pt | 18pt | White at 40% |
| XP summary text | Sora | 600 (Semibold) | 15pt | 20pt | #34A853 (green) |
| XP encouragement text | Sora | 400 (Regular) | 13pt | 18pt | White at 50% |
| FAB label | Sora | 600 (Semibold) | 14pt | 18pt | White #FFFFFF |
| Add habit modal heading | Sora | 600 (Semibold) | 17pt | 22pt | White #FFFFFF |
| Add habit modal input placeholder | Sora | 400 (Regular) | 16pt | 22pt | White at 40% |
| Add habit modal input value | Sora | 400 (Regular) | 16pt | 22pt | White #FFFFFF |
| XP popup ("+10 XP") | Sora | 600 (Semibold) | 13pt | 16pt | #34A853 (green) |
| "all done" label | Sora | 600 (Semibold) | 16pt | 22pt | #34A853 (green) |

---

## Accessibility

Accessibility follows global standards from `_shared-patterns.md`. Screen-specific notes:

- Screen reader announces "Habits" on mount as the screen identity, followed by completion summary ("5 of 8 habits complete today")
- Focus order: Back button -> Screen header -> Completion rate bar (summary) -> Segmented control (Today / Week / Month) -> Section headers and habit rows in reading order -> Calendar heatmap (summary, then cells) -> XP summary card -> FAB
- Completion rate bar: accessible label "5 of 8 habits complete today, 62 percent"
- Segmented control: accessible role "tab bar"; each segment is a "tab" with selected state
- Section headers: accessible role "heading" level 2 (e.g., "Morning")
- Habit checkbox: accessible role "checkbox"; label includes habit name and streak (e.g., "Drink water, 21-day streak, checked"); state change announced via live region ("+10 XP earned")
- Streak flame icon: decorative, hidden from screen reader; streak count conveys the information via text
- Domain tag chips on habit rows: accessible role "text"; announced after habit name and streak
- Calendar heatmap cells: accessible label per cell (e.g., "Monday May 18, 6 of 8 habits completed"); grouped as "4-week habit consistency"
- XP summary card: accessible label includes XP amount and encouragement text
- FAB: accessible label "Add new habit"
- Long-press reorder: accessible alternative via edit mode with "Move up" / "Move down" actions
- Swipe-left actions: accessible alternative via context menu on long-press
- Reduced motion: skip checkbox draw animation, XP popup float, heatmap staggered fade-in, and completion bar green crossfade; show final states immediately

---

## Cross-References

- **Navigates to**: SIA Chat [09] (via SIA suggestion in empty state, tab switch), Add Habit modal (via FAB)
- **Navigates from**: Screen [18] — Explore Section (stack push), Screen [09] — SIA Chat (deep-link), Screen [12] — Home Screen (via habit action cards)
- **Shared components with**: Screen [37] — Journal (Domain Tag Chip, FAB pattern), Screen [35/36] — Dashboards (Streak Indicator), Screen [39] — Leaderboard (Segmented Control, XP/RPG elements)
- **Patterns used**: Back Button, 8-State Model, FAB (Screen 35), Domain Tag Chip (Screen 37), Text Input Field (Batch 1), Brand CTA Button (Batch 1)
- **Patterns established**: Habit Row (checkbox + name + streak + domain tag), Completion Rate Bar (count + orange progress bar), Calendar Heatmap (4-week graduated grid), XP Summary Card (RPG feedback), Time-of-Day Section Headers (Morning/Afternoon/Evening grouping), Habit Swipe Actions (swipe-left edit/delete), Add Habit Modal
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-13.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U07`
**Prototype route**: `/features/habits`
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
| B13-F01 | critical | retention | Make habit rows/checkboxes semantic controlled actions with completion, progress/XP updates, undo, and failure handling. |
| B13-F02 | major | navigation | Implement Today/Week/Month state, Add Habit bottom sheet, and a labeled 44x44 back control. |
| B13-F03 | major | accessibility | Add 44x44 hit areas, accessible checked state, focus order, and semantic controls. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

