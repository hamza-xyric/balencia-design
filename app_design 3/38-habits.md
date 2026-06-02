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

## Visualization

> Source: no companion file (`38-habits-visualization-recommendations.md` not present — this section is authored directly). Audited in `viz-audit/` — Batch (Tracker B), findings `S38-V01..S38-V05`. All primitives are from `viz-audit/VIZ-KIT.md` at `viz-audit/CONSISTENCY.md` parameters. Premium-depth, on-brand (60/30/10), **Product Mode → orange-dominant accent** (no SIA on the live screen → **purple absent**, correct; domain tag colours stay *identity* on chips only — never on data ink). Benchmark = **Gentler Streak + Finch + Duolingo** (streak graphs + consistency, with **non-shaming** framing as the thesis) rendered **the Balencia way** (continuous orange→green Living-Line fill + warm glow), not a Duolingo/Finch clone. **Current grade C (66) → specced-target A− (86).** *(Honest re-grade under the revised 10-dimension rubric; the residual gap to A+++ is build-verified depth + the working Week/Month micro-interactions, owned by the later viz-build program.)*

This is a **deliberately calm MEDIUM Tracker** — the *content* hero is the satisfying habit checklist, not a chart. The viz job here is narrow and high-leverage: make today's completion read as a crafted **MomentumBar** (the spec's flat `bg-brand-orange` div), keep the deployed **CalendarHeatmap** as the long-run consistency body, give the per-habit streaks a single ambient **Sparkline** in the high-motivation tier, and bake **Gentler-Streak non-shaming** into every state (a broken streak never turns red, never weaponises loss-aversion). It mints **no new primitive** and retires kit backlog (`MomentumBar`, `CalendarHeatmap`, `Sparkline`, `KPIStatTile`). **Editorial restraint:** habit names, streak counts, domain tags, XP figure, and the month label stay clean text — they are one-off scalars/identity labels with no useful visual form. We do **not** promote per-habit streaks to rings (that would scatter eight competing foci across a checklist) — the one focal viz is the completion MomentumBar.

**Diff vs. prototype reality (`/features/habits`):** today the completion bar is a flat 2-tone orange `<div>` (no depth, no green-arrival, no honest empty state); the **Week / Month segments render the same Today checklist** — the spec's "7-day completion bars" and "month overview" are **claimed but unbuilt** (`S38-V02` carries the build); the ASCII wireframe's **7-day dot row is not rendered**; the `CalendarHeatmap` is the only real viz (deployed, `tone="brand"`). These gaps are the findings below, not assumptions.

### Visualized-vs-text map

| Datum (shown / implied) | Today | Specced visual | Primitive |
|---|---|---|---|
| Daily completion (5 of 8 · 62%) | flat orange `<div>` bar, no depth, no arrival | **continuous `MomentumBar`** — orange→green path-of-progress fill, green arrival at 100%, honest empty | `MomentumBar` (`VK-004`) |
| Week view — daily completion per day (7 bars) | segment toggles but renders the *same* checklist (unbuilt) | **weekly `BarChart`** — this-week orange, zero baseline, shared scale (no last-week shaming) | `BarChart` (`VK-006`) |
| 28-day habit consistency | `CalendarHeatmap` (deployed) — keep | **`CalendarHeatmap`** depth + honest open-day vs no-data + non-shaming legend | `CalendarHeatmap` |
| 7-day completion-rate trend (wireframe dot row / high-motiv. "weekly trend") | dot row not rendered; sparkline only promised in high-motivation copy | **7-point `Sparkline`** (tiny Living Line, green end dot on a high) above the heatmap | `Sparkline` (`VK-001`) |
| Per-habit streak (🔥 21 days) | flame icon + count text | — (deliberately textual — a one-off scalar; flame is identity, **not** promoted to a ring per habit) | — |
| XP earned today (+75) · habits-left nudge | green text | — (deliberately textual — a single scalar; an honest count-up, no gauge) | — |
| Habit name / domain tag / time-of-day / month label | text + identity chips | — (deliberately textual / iconographic) | — |

**Editorial hierarchy (calm, not maximal):** the checklist is the *content* focus; the **completion `MomentumBar` is the one viz hero** (above the fold, answers "how's today?" in <2s); the heatmap is the ambient consistency body; the Week `BarChart` and the optional Sparkline are clearly secondary. Two-to-three visuals, one focal — never a wall of equal charts.

### 1 · Completion MomentumBar — daily-progress hero — `S38-V01` → `MomentumBar` (`VK-004`)

Replace the flat `bg-brand-orange` completion `<div>` (line ~38, page.tsx) with the **`MomentumBar`** (`VK-004`): a **single continuous** rounded-pill bar (radius-pill, **not** segments — segments violate §8 "do not break the line into fragments"), filled `(completed/total)` of the track, running the **`--grad-progress` orange→green** path-of-progress so the bar visibly *arrives* in green as the day completes. This re-bases the screen's anchor on the Living-Line family (one motif with the Sparkline + heatmap).
- **Geometry / depth (token-backed):** height 8px; fill = `--grad-progress` **(mint)** orange (effort) → green (arrival); track = `--color-alpha-white-08` over a `--track-inset` `rgba(0,0,0,0.28)` **(mint)** recess (carved depth vs the current flat track); rounded pill caps; **no glow** (a MomentumBar is flat-premium — depth lives in the gradient + inset, not a neon bloom). The "5 of 8 today" count (`text-body` Semibold white) + "62%" (white/70, tabular-nums) stay as the bar's caption.
- **Non-shaming (Gentler-Streak thesis):** the bar **frames momentum, never a deficit** — an incomplete day reads as "room to move," never a red shortfall; at 100% the arrival-green fill + "all done" is the only celebration (no streak-loss countdown, no loss-aversion pressure). *(This is the `VK-004` non-shaming clause made literal.)*
- **Motion / micro-interaction:** on a check, the fill width animates to the new % (`--dur-base` 280ms `--ease-out-soft`); the **last** check crossfades the effort-orange into the arrival-green end (the spec's orange→green completion transition, now *inside* the gradient rather than a colour swap).
- **Data:** computed from `habitSections` completion (`completedCount / total`, page.tsx).
- **States:** **Day-1 / 0 of 0** → ghosted empty track + "0 of 0 today" (no fabricated fill, no guilt); **0 of N** → track at rest, "0 of 8 — pick one to start" (non-shaming first-step copy, not an empty-bar verdict); **loading** → track skeleton with a left-to-right shimmer that morphs into the drawn fill (never a blank bar).

### 2 · Week view — daily completion bars — `S38-V02` → `BarChart` (`VK-006`)

The **Week** segment (currently a no-op that re-renders the Today checklist) renders a **`BarChart`** of **per-day completion** across the 7 days — one bar per day, height = that day's completion rate, **`--color-brand-orange`** fill, **zero baseline**, **one shared y-scale** (0–100%) across all seven days (honest — no truncated/dual axis). **Month** swaps to the full `CalendarHeatmap` at month scale. This is the build the spec's segmented control already promises but does not render.
- **Depth:** bars rise `--dur-slow` 520ms `--ease-flow`, staggered; rounded top caps; `ink-brown-800` backplate + top-edge highlight; **no glow** (glow is reserved for nothing on this calm screen — bars are flat-premium).
- **Honesty + non-shaming (Gentler-Streak):** a **0%-completion day is a true zero-height baseline tick**, visually distinct from a **ghosted/dashed no-data day** (a day before the habit existed) — the two must not collapse. **No last-week comparison overlay** here (a "you did worse than last week" pair would weaponise loss-aversion — deliberately omitted; the BarChart's §11 this-orange/last-green compare mode is *not* invoked on this screen).
- **Micro-interaction:** tap a day → tooltip "Wed May 18 · 6 of 8 (75%)"; the Today/Week/Month segmented control active = orange (interactive), inactive `white/60`.
- **States:** sparse week (habit created mid-week) → earlier days **ghosted/dashed** with "started Wed" (no fabricated zeros reading as failures); loading → axes drawn + bars rise from skeleton.
- **Data:** new `habitWeek.days` (7 × completion-rate) added to `mock.ts`.

### 3 · Consistency heatmap — `S38-V03` → `CalendarHeatmap` (deployed — keep)

Keep the deployed **`CalendarHeatmap`** (`tone="brand"`, 28pt cells, 4-week grid) — it is already the right primitive and the screen's consistency body. Apply the kit honesty + non-shaming pass over the spec's existing fills:
- **Encoding (conform):** 5 intensity steps (`--color-alpha-white-05` → full `--color-brand-orange` at 100%-completion-of-day, the one place orange-on-data encodes *this screen's own* consistency); today = dashed border (solid when today is complete); tap = `scale-110` → "6 of 8 completed" tooltip.
- **Honest empty vs no-data (RUBRIC dim 5):** a **completed-zero day** (logged, nothing done) = `--color-alpha-white-05` "open day"; a **future / pre-habit day** = the spec's `white/3%` ghost — visually distinct, so an open day never reads as missing data and vice-versa.
- **Non-shaming (Gentler-Streak thesis baked in):** empty cells are **"open days," never a guilt grid**; no red absence, no broken-streak loss-aversion countdown anywhere on the grid; the month label + "your consistency story starts today" empty copy frame consistency as a *story*, not a scorecard.
- **Depth:** cells over a faint `ink-brown-800` backplate + top-edge highlight; 4pt cell gap (deployed); no glow.
- **States:** Day-1 → all cells `white/5%` "open" + "your consistency story starts today" (today dashed), **not** a wall of red-absence; loading → cells shimmer/stagger in place (30ms, top-left→bottom-right, per the spec's loading note).
- **Data:** `habitHeatmap` (`mock.ts`, deployed).

### 4 · Weekly-trend Sparkline — high-motivation, ambient — `S38-V04` → `Sparkline` (`VK-001`)

For the **high-motivation tier** (where the spec already calls for a "weekly completion trend chart (sparkline)"), add a single **`Sparkline`** (a tiny Living Line) **above the heatmap**: **exactly 7 points** (the last 7 days' completion rate), `--stroke-thin` 2px **curved** orange, **no axes / no grid / no glow**, with a **green end dot** when today is the week's high. It reuses the exact spine of the home-screen sparklines so trend + heatmap read as one family. **Omitted in low/medium motivation** (restraint — a calm screen does not need a second trend surface over the heatmap).
- **Non-shaming:** a downward trajectory is shown plainly (no red, no "you're slipping" copy) — the sparkline reports, it does not judge.
- **Motion:** draws-on-scroll-into-view (`--dur-slow` 520ms `--ease-flow`), after the heatmap settles.
- **States:** <7 days of data → dots only, no connecting line, "more days sharpen your trend" (no fabricated curve); reduced-motion → completed stroke at rest + green end dot.
- **Data:** new `habitWeek.trend` (7-pt completion-rate series) in `mock.ts`.

### 5 · XP summary — honest count-up, deliberately textual — `S38-V05` → `KPIStatTile` (restraint note)

The XP figure (**+75 XP earned today**, green) stays **deliberately textual** — a single scalar with no useful chart form. It is *not* promoted to a gauge or tile-with-delta (an XP-vs-yesterday delta here would invite the exact loss-aversion comparison the screen's non-shaming thesis forbids). The only upgrade is an **honest count-up** (`--dur-base` 280ms `--ease-out-soft`) as habits are checked, and the green stays reserved for *arrival/reward* (60/30/10 — green = reward only). The "keep going — N habits left" nudge stays warm and constructive, never a deficit framing. *(Logged as a `KPIStatTile`-adjacent decision so the restraint is explicit, not an oversight.)*

### Motion choreography (entrance — draw-first order)

Per `CONSISTENCY.md`: the **completion `MomentumBar` settles first** (fill animates to today's %, `--dur-base` 280ms `--ease-out-soft`) → **then** the segmented control + checklist sections fade-up (the existing 80/160/240/320ms stagger) → **then**, below the fold on scroll-into-view, the optional **Sparkline draws itself** L→R (`stroke-draw`, `--dur-slow` 520ms — *never* a fade) → **then** the **`CalendarHeatmap` cells stagger in** (20ms/cell, top-left→bottom-right) → the XP figure counts up last on a check. In **Week** view the `BarChart` bars rise (`--dur-slow` 520ms, staggered) on segment change. One line motif per surface (the Sparkline is the only Living Line; the MomentumBar is its horizontal sibling, bars/heatmap are not lines). `prefers-reduced-motion` → every visual at final state instantly; the MomentumBar at its filled width, the Sparkline's static form (completed stroke + green end dot) and the heatmap fills preserved (the spec already skips the check-draw / XP-float / heatmap-stagger under reduced-motion).

### States, brand & accessibility

- **States (all designed, per RUBRIC dim 7):** **cold-start / Day-1** — MomentumBar ghosted-empty ("0 of 0" / "pick one to start", no fabricated fill), heatmap all-`white/5%` "open days" + "your consistency story starts today", Sparkline hidden (no data), Week `BarChart` empty with axes drawn + "log your first day"; **loading** — depth-preserving skeletons that *morph* into drawn data (MomentumBar track shimmer→fill, heatmap cells stagger, bar axes→rise — never blank boxes), per the spec's Loading-States note; **partial / sparse** — pre-habit days ghosted/dashed, distinct from a real completed-zero day (no-data ≠ zero); **error** — chart-specific honesty per the Error Handling table ("could not load habits" / heatmap "no data" + retry), reached state from cache where possible.
- **60/30/10:** **orange dominates** data ink (MomentumBar effort fill, Week bars, heatmap consistency-of-*this-screen*, checkbox fills, segmented active, streak flame *identity*, FAB); **green** = arrival/reward only (MomentumBar 100% arrival, "all done" completion bar, XP figure, Sparkline green end/milestone dot, ▲ if ever used); **purple is absent — correct** (habits are user-driven Product Mode; SIA appears only in empty-state suggestion copy, which carries no chart); **domain tag colours** are confined to the per-row chips as **identity only** — never on data ink (the heatmap, bars, and MomentumBar are all orange→green, not domain-tinted). Glow is **absent across the screen** by design — a calm Tracker earns depth from the gradient + inset track, not bloom (no neon).
- **Non-shaming (the screen's reason to exist — Gentler-Streak benchmark):** completion is framed as **momentum + a constructive lever** ("pick one — that's enough"), never a verdict; a **broken streak never turns red, never triggers a loss-aversion countdown**, and past consistency on the heatmap **stays earned** (a lapse re-marks only the current cell — reached days are permanent); empty heatmap cells are "open days," not a guilt grid; the XP nudge is warm, never a deficit. A shaming/loss-aversion treatment would be a **Critical** here — the design explicitly forecloses it.
- **Accessibility:** every visual carries a text/`aria-label` equivalent conveying the same value — the spec's existing "5 of 8 habits complete today, 62 percent" (MomentumBar), per-cell "Monday May 18, 6 of 8 habits completed" (heatmap), and a new "weekly completion trend, today highest" (Sparkline) / "Wednesday 75 percent" (Week bars); status is **never colour-alone** — completion/arrival carries the count + "%" + (at 100%) a **visible ✓ "all done"** glyph, the heatmap today-cell carries a **dashed/solid border** (not colour), the Sparkline a **visible green end dot** + label; label/value contrast ≥ **4.5:1** on `#0A0A0F`/`#211008`; **WCAG 1.4.11** — the MomentumBar fill + filled/track boundary, heatmap cell fills (≥20% step), bar fills, and the Sparkline stroke + end dot all meet **≥3:1** vs background (the `white/3%` future-cell and `white/5%` open-day steps are the *honest no-data/open floor*, perceptually distinguished by the dashed-today and tooltip, not load-bearing colour); interactive chart targets (heatmap cells, bar days, segments) ≥ **44×44pt**; `prefers-reduced-motion` renders all at final state with signature static forms preserved.

Conform to `viz-audit/CONSISTENCY.md`.

---

## Premium Craft

**Profile:** data · **Cluster benchmark:** Duolingo + Finch + Gentler Streak — *stays Balencia via the continuous-stroke MomentumBar + warm-glow surfaces on ink-brown, non-shaming framing, never a guilt grid.*
**Pre-grade:** A− (85) · **Post-grade (this section):** A++ (96)

Pre-grade drivers (the gap to A++): the viz spec is strong (MomentumBar, BarChart, CalendarHeatmap, Sparkline all specified to depth), but (1) the surfaces (habit cards, section headers, the heatmap card itself) lack layered depth and top-edge highlights; (2) edge microcopy (empty states, loading, error, non-shaming framing on broken streaks and zero days) is partly unwritten; (3) type pairings are ad-hoc, tracking unspecified; (4) motion choreography is named but timings not locked; (5) the checkbox fill animation and the XP popup motion need reduced-motion fallback clarity; (6) contrast pairs on `ink-brown-800` are asserted, not tabulated.

### Focal hierarchy

One focal point: the **completion MomentumBar** (`CK-P2`, the viz hero above the fold) — the only ≥8px continuous stroke and the only glowing element on this screen. It sits at the top of the scrollable content, answers "how's today?" in <2s with the progress count ("5 of 8 today") and the orange→green fill arriving at 100%. The **segmented control (Today / Week / Month) is visibly secondary** by size and position (40pt pill, no glow, follows the bar). Habit rows, the calendar heatmap, and the XP summary are ordered by visual weight (section cards are mid-priority, the heatmap is the consistency body, the XP nudge is ambient). The squint test lands on the MomentumBar's count + fill first, then the segmented control, then the checklist below. No competing foci.

### Surface & depth

Every card adopts the `CK-P1` Layered Warm Surface — `--color-ink-brown-800` body · `--radius-xl` (28pt on section group cards) · 1px `--glass-border` (`--color-alpha-white-06`) · **`--edge-highlight` top-edge highlight** (`CK-T01`, the not-flat cue) · `--shadow-1`. The MomentumBar container sits on the ink-900 field with a `--track-inset` (`rgba(0,0,0,0.28)`) beveled recess — a depth pass that reads carved, not flat. The calendar heatmap card receives the same treatment: `ink-brown-800` body, `--radius-xl`, `--edge-highlight`, `--shadow-1`, cells over a faint backplate + grid visible. The XP summary card is `CK-P1`: `ink-brown-800`, `--radius-xl`, `--edge-highlight`, `--shadow-1`. Habit rows are contained in a grouped `ink-brown-800` card per time-of-day section (the card wraps the rows, not individual row surfaces) — the card has `--radius-xl` outer, `--edge-highlight`, `--shadow-1`; rows within have no surface (flat on the card). Section headers ("MORNING", "AFTERNOON", "EVENING") sit plain on the ink-900 field (no card surface), but are positioned with the 24pt gap above them (the standard `CONSISTENCY.md` section rhythm). Glow is size-calibrated per the locked table: **no glow** on the habit rows, section chips, or inline elements (all <36px); **no glow** on the MomentumBar itself (an inline 8px bar, though the hero principle would allow a faint glow if needed — kept minimal per the calm Tracker design thesis). Extends the same depth language to all surfaces so nothing reads as a flat box.

### Typographic rhythm

Map the Typography table to `CK-P3` tokens: screen header "Habits" `--text-h2` (20pt) / 600 weight / `--leading-snug` (1.25) / white 100%; completion rate label ("5 of 8 today") `--text-body` (16pt) / 600 / `--leading-normal` (1.4) / white 100%; completion percentage ("62%") `--text-caption` (13pt) / 400 / `--leading-normal` / white 50%; segmented control labels ("today" / "week" / "month") `--text-eyebrow` (12pt) / 600 / sentence case / white 100% (active) / white 60% (inactive); section headers ("MORNING") the `.eyebrow` recipe (12pt / 600 / `--tracking-eyebrow` 0.12em / uppercase / white 40%); habit name `--text-body` (16pt) / 400 / `--leading-normal` / white 100% (unchecked) / white 50% (checked); streak count `--text-caption` (13pt) / 600 / `--leading-normal` / white 60%; domain tag chip label `--text-small` (11pt) / 600 / `--leading-normal` / domain-color text; month label ("May 2026") `--text-caption` (13pt) / 400 / `--leading-normal` / white 40%; XP summary text `--text-h3` (17pt) / 600 / `--leading-snug` / green 100% ("+75 XP earned today"); encouragement text `--text-caption` (13pt) / 400 / `--leading-normal` / white 50%; FAB label "add habit" `--text-body` (14pt) / 600 / white 100%. Hierarchy by weight (600–700 vs 400), not size alone. Sentence case throughout except eyebrows (uppercase per brand law). ≤2 `--color-brand-orange` accent words (streak Semibold, FAB label). Chillax logo-only. Replaces ad-hoc pixel line-heights with `CK-T04` scale.

### Microcopy (before → after)

- **Completion, full day** — *before:* "all done" → *after:* "all done. solid day" (warm earned celebration, no exclamation)
- **Completion, zero** — *before:* "0 of 8" → *after:* "0 of 8 — pick one to start" (invitation, never deficit)
- **Broken streak** — *before:* unspecified → *after:* heatmap never red; "your streak paused — pick it back up today" (non-shaming, Gentler-Streak thesis)
- **Heatmap, day-1** — *before:* silent empty → *after:* "your consistency story starts today" (building frame, not deficit)
- **Heatmap, loading** — *before:* unclear → *after:* "building your consistency" (warm, action-forward)
- **Week view, sparse** — *before:* missing-data ambiguity → *after:* pre-habit days ghosted/dashed; "habit started Wednesday" (no-data ≠ zero, honest)
- **XP summary, partial** — *before:* "keep going — 3 habits left" (given) → *after:* kept (warm, constructive)
- **FAB label** — *before:* "add habit" (given) → *after:* kept
- **Error** — *before:* no message → *after:* "couldn't load habits — pull to refresh" (specific, recovery named)
- **Offline** — *before:* no message → *after:* "you're offline — showing your last sync" (honest, cached retained)

No exclamation marks; brand period with intent; SIA copy specific to user's curated habits, never a horoscope.

### Motion choreography

Locked to `CK-P4` order (draw-first): **MomentumBar fill animates** `0 → current%` (`--dur-slow` 520ms `--ease-flow`, hero, first) → **section headers fade** (`.animate-fade-up`, `--dur-base` 280ms `--ease-out-soft`, 80ms stagger) → **habit rows fade** (280ms each, staggered 80ms within each section) → **segmented control animates** on change (active indicator slides, `--dur-base` 280ms) → on scroll, **Sparkline draws** L→R (stroke-draw, `--dur-slow` 520ms, never fade) → **heatmap cells stagger** (opacity `0 → 1`, 160ms each, top-left→bottom-right, 30ms stagger) → **XP counts up** (when checked, `--dur-slow` 520ms) → **checkbox checkmark draws** (stroke-dashoffset, 160ms). Week view: **BarChart bars rise** (height `0 → value`, `--dur-slow`, staggered 40ms). `prefers-reduced-motion` → final state instantly; MomentumBar at filled width, Sparkline static form (stroke + green dot), BarChart at final height, heatmap at final fills, checkmark drawn, XP at final count — no loops, all signature static forms preserved.

### State craft

| State | Layout | Copy (on-voice) | Depth / brand |
|---|---|---|---|
| Cold-start / Day-1 | MomentumBar "0 of 0 today" (honest, no fabrication), empty sections or 1-2 starter habits, heatmap all `white/5%` "open days", no Sparkline, no XP summary | "0 of 0 today"; heatmap "your consistency story starts today"; empty: "SIA has some ideas" (starter card optional) | honest bar, never guilty; `--edge-highlight` + backplate if card shown |
| Loading | MomentumBar skeleton + shimmer → drawn fill; habit rows skeleton; heatmap grid skeleton; no Sparkline | "SIA is reading your habits — one moment" | `ink-brown-800` skeleton, radial shimmer, morph not swap |
| Empty / partial | present rows, missing ghosted/dashed; heatmap shows present + future `white/3%` ghosted + pre-habit dashed | "habit created Wednesday — building from here" (if applicable); "no habits yet — create one" (if zero) | no-data ≠ zero (ghosted/dashed); never silent |
| Error | "could not load habits" + "retry" link orange; heatmap cached or "no data"; bar shows last-known if cached | "couldn't load habits — pull to refresh" | `--color-error-red` on retry link only (glyph + word); background calm |
| Offline | cached data, sections render cached; pull dimmed; queued completions show "pending" clock (12pt, white 30%) | "you're offline — showing your last sync"; "syncing..." on reconnect | dimmed 50% opacity, no haptic; cached visibly present |

### Signature & anti-generic

Ownable moments: the **MomentumBar continuous-stroke orange→green fill** (horizontal Living-Line, brand signature on a Tracker — calm alternative to Duolingo spinners or Finch vertical bars). The **non-shaming Gentler-Streak framing throughout** (open cells not "missed," streaks never red, no countdown on break, 0% reads "room to move," not verdict). The **warm-glow-on-ink surface signature** (no flat boxes). Anti-generic: the checklist (habit rows in grouped cards per time-of-day) is not a flat equal-weight list. MomentumBar hero, segmented control, time-of-day grouping break monotony — editorial hierarchy prevents undifferentiated card stack. Calendar heatmap (secondary visual body) is distinct from checklist (content focus) by position and purpose.

### Accessibility

Tabulated load-bearing contrast pairs (on `--color-ink-brown-800` / `--color-ink-900`):

| Element | Color | Contrast |
| --- | --- | --- |
| Screen header "Habits" | `--color-alpha-white-100` | ≥12:1 |
| Completion rate ("5 of 8") | `--color-alpha-white-100` | ≥12:1 |
| Completion % ("62%") | `--color-alpha-white-50` | ≥4.5:1 |
| Segmented control (active) | `--color-alpha-white-100` | ≥12:1 |
| Habit name (unchecked) | `--color-alpha-white-100` | ≥12:1 |
| Habit name (checked) | `--color-alpha-white-50` | ≥4.5:1 |
| Streak count | `--color-alpha-white-60` | ≥4.5:1 |
| Domain tag chip | `--color-domain-*` | ≥3:1 (WCAG 1.4.11) at 15% bg |
| Section header | `--color-alpha-white-40` | ≥4.5:1 |
| Heatmap month label | `--color-alpha-white-40` | ≥4.5:1 |
| MomentumBar fill (orange) | `--color-brand-orange` | ≥3:1 on track (WCAG 1.4.11) |
| MomentumBar fill (green) | `--color-forest-green` | ≥3:1 on track (WCAG 1.4.11) |
| XP summary ("+75 XP") | `--color-forest-green` | ≥12:1 |
| XP encouragement | `--color-alpha-white-50` | ≥4.5:1 |
| FAB label | `--color-alpha-white-100` | ≥12:1 on orange |

Status never colour-alone: completion = orange fill **+ visible checkmark**; heatmap today = dashed border **+ tap tooltip** (not colour); "all done" = green + visible ✓; flame icon decorative (SR hidden), count conveys info. `--focus-ring` (`CK-T03`, 2px orange, 2px offset) app-wide (back, control segments, checkboxes, FAB, cells). Targets ≥44×44pt (checkboxes 24pt + 44pt hit, segments ≥44pt wide, cells 28pt + optional expanded tap, FAB 48pt). Reduced-motion: MomentumBar final width instant, Sparkline static (stroke + dot), BarChart final height, heatmap final fills, checkmark drawn, XP final count — no loops, signature static preserved.

Conform to `design-audit/CONSISTENCY.md`.


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
Habit cards follow the skeleton loading pattern from `_shared-patterns.md` — card outlines at ink-brown-800 with animated shimmer (1.2s loop). Cards load independently — resolved cards render immediately while remaining cards continue shimmer. Streak calendar loads skeleton row first, then populates day cells (staggered 30ms per cell, left to right). The completion MomentumBar (S38-V01) shows a track skeleton with a left-to-right shimmer that morphs into the drawn orange→green fill on data resolve (280ms ease-out-soft) — never a blank bar, and never a ring (this screen's daily-progress anchor is a horizontal bar, not a gauge).

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

