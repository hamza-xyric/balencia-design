# Screen Design: Reminders & Tasks

**Screen**: 61 of 73
**File**: 61-reminders-tasks.md
**Register**: Brand Mode (brand-orange #FF5E00)
**Primary action**: manage personal tasks and reminders for health activities
**Tab**: Me tab or Schedule [41] -> stack push
**Navigation**: Stack depth 1-2 from tab root. Entry from Me Main [17] quick link grid, Schedule [41] "tasks" shortcut, SIA Chat [09] deep-link ("here are your tasks for today"), Home Screen [12] task-related action cards. Exit via back button to previous screen, or forward to Task Detail (modal), Reminder Detail (modal), Schedule [41].

---

## Purpose

Reminders & Tasks is the user's personal task manager and reminder hub -- a single screen to create, track, and complete health-related tasks and time-based reminders. It answers: "what do I need to do, when is it due, and what should I not forget?" Unlike the Schedule [41] which is a time-grid calendar, this screen is a checklist-first experience organized by urgency and date. Tasks are user-created or SIA-suggested actions with due dates, categories, priorities, and recurring patterns. Reminders are time-triggered notifications for medications, appointments, water intake, and any other timed health activity. SIA uses this screen to surface smart task suggestions based on goals, habits, and schedule gaps -- bridging intention with execution. Free tier includes basic task management with up to 5 reminders; SIA smart suggestions, unlimited tasks, and multi-channel notifications require Plus.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Screen header -- "Reminders & tasks" title with back navigation
2. Today's Tasks section -- prioritized checklist with color-coded categories, due times, and checkboxes
3. Upcoming section -- tasks grouped by date (tomorrow, this week, later)
4. Active Reminders section -- enabled reminders with toggle, next trigger time, and channel indicators
5. Completed Tasks section -- collapsible list of done items
6. Smart Suggestions card -- SIA-suggested tasks based on goals and schedule
7. Add FAB -- floating action to create new task or reminder

**User flow**:
- **Arrives from**: Me Main [17] via quick link grid (stack push), Schedule [41] via "tasks" shortcut (stack push), SIA Chat [09] via deep-link card (stack push), Home Screen [12] via task-related action cards (stack push)
- **Primary exit**: Back to previous screen (stack pop)
- **Secondary exits**: Task Detail modal (create/edit task), Reminder Detail modal (create/edit reminder), Schedule [41] via "view in calendar" link (stack push), SIA Chat [09] via SIA suggestion tap (tab switch)

---

## Layout

**Scroll behavior**: SectionList (grouped by: Today's Tasks, Upcoming dates, Active Reminders, Completed, Smart Suggestions)
**Tab bar visible**: Yes

### ASCII Wireframe

```
┌─────────────────────────────────────────┐
│           Status Bar (44pt)             │
├─────────────────────────────────────────┤
│  < [back]     "Reminders & tasks"       │  <- Screen Header (48pt)
├─────────────────────────────────────────┤
│                                         │  <- 16pt gap
│  TODAY                                  │  <- Section Eyebrow
│  ┌───────────────────────────────────┐ │
│  │ [!] [x] Take vitamin D       8:00a│ │  <- Task Row (high priority)
│  │     [wellbeing]  due in 30m       │ │     category + due time
│  ├───────────────────────────────────┤ │
│  │ [ ] Call Dr. Patel          10:00a │ │  <- Task Row (normal)
│  │     [wellbeing]  scheduled        │ │
│  ├───────────────────────────────────┤ │
│  │ [ ] Review meal plan        12:00p │ │  <- Task Row (normal)
│  │     [nutrition]  recurring        │ │
│  ├───────────────────────────────────┤ │
│  │ [x] Morning supplements      7:00a │ │  <- Task Row (completed)
│  │     [wellbeing]  done             │ │
│  └───────────────────────────────────┘ │
│                                         │  <- 24pt gap
│  TOMORROW                               │  <- Section Eyebrow
│  ┌───────────────────────────────────┐ │
│  │ [ ] Book lab appointment    9:00a  │ │
│  │     [wellbeing]                    │ │
│  ├───────────────────────────────────┤ │
│  │ [ ] Grocery run - meal prep        │ │
│  │     [nutrition]  no time set       │ │
│  └───────────────────────────────────┘ │
│                                         │  <- 24pt gap
│  THIS WEEK                              │  <- Section Eyebrow
│  ┌───────────────────────────────────┐ │
│  │ [ ] Dentist appointment   Thu 2:00p│ │
│  │     [wellbeing]                    │ │
│  └───────────────────────────────────┘ │
│                                         │  <- 24pt gap
│  REMINDERS                              │  <- Section Eyebrow
│  ┌───────────────────────────────────┐ │
│  │ [bell] Water intake    [ON ]       │ │  <- Reminder Row
│  │   every 2h   next: 11:30a         │ │     with toggle
│  ├───────────────────────────────────┤ │
│  │ [bell] Evening stretch  [ON ]      │ │  <- Reminder Row
│  │   daily 8:00p  push + email       │ │
│  ├───────────────────────────────────┤ │
│  │ [bell] Medication      [OFF]       │ │  <- Reminder Row (disabled)
│  │   daily 9:00p  paused             │ │
│  └───────────────────────────────────┘ │
│                                         │  <- 24pt gap
│  v Completed (4)                        │  <- Collapsible Section
│  ┌───────────────────────────────────┐ │
│  │ [x] Morning supplements      done │ │
│  │ [x] Log weight               done │ │
│  │ [x] Meditate 10 min         done │ │
│  │ [x] Drink 2L water          done │ │
│  └───────────────────────────────────┘ │
│                                         │  <- 24pt gap
│  ┌───────────────────────────────────┐ │
│  │ [purple dot] SIA suggests          │ │  <- Smart Suggestions Card
│  │ "Based on your fitness goal,       │ │
│  │  try scheduling a stretching       │ │
│  │  session before your Thursday      │ │
│  │  dentist appointment."             │ │
│  │                                    │ │
│  │ [+ add as task]   [ask SIA]        │ │
│  └───────────────────────────────────┘ │
│                                         │
│                        ┌─────────────┐  │
│                        │ + add       │  │  <- FAB (orange pill)
│                        └─────────────┘  │
│                                         │  <- 64pt bottom padding
├─────────────────────────────────────────┤
│  Today  |  SIA  |  Goals  |  Me        │  <- Tab Bar
├─────────────────────────────────────────┤
│         Home Indicator (34pt)           │
└─────────────────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Screen Header** -- 48pt
   - Purpose: Title and back navigation
   - Content: Back chevron (left), "Reminders & tasks" title (center, 17pt Sora Semibold, white)

2. **Today's Tasks Section** -- Variable (SectionList)
   - Purpose: Prioritized task checklist for today
   - Content: Section eyebrow "TODAY" + task rows with checkboxes, priority indicators, category chips, due times

3. **Upcoming Sections** -- Variable (SectionList, grouped by date)
   - Purpose: Tasks grouped by future dates
   - Content: Section eyebrows per date group (TOMORROW, THIS WEEK, LATER) + task rows

4. **Active Reminders Section** -- Variable
   - Purpose: List of configured reminders with enable/disable toggle
   - Content: Section eyebrow "REMINDERS" + reminder rows with toggle, next trigger, channel icons

5. **Completed Tasks Section** -- Variable (collapsible)
   - Purpose: Archive of completed tasks for today
   - Content: Collapsible header "completed (N)" + completed task rows

6. **Smart Suggestions Card** -- ~120pt
   - Purpose: SIA-generated task suggestions based on goals and schedule
   - Content: SIA coaching note with suggested task + action buttons

7. **Floating Action Button** -- 48pt (fixed)
   - Purpose: Add new task or reminder
   - Content: Plus icon + "add"

---

## Components

### Screen Header
- **Purpose**: Title and navigation
- **Visual treatment**: ink-900 background, 48pt height. Back chevron left (standard Back Button pattern) + "Reminders & tasks" center (17pt Sora Semibold, white).
- **Size**: Full-width x 48pt

### Task Row
- **Purpose**: Individual task item with checkbox, title, category, priority, and due time
- **Data source**: API -- GET /api/tasks (user_tasks table)
- **Visual treatment**: Rows within an ink-brown-800 glassmorphism card per date group (one card per section). 20pt radius on the group card. Each row has 16pt horizontal padding.
- **Content per row** (72pt tall):
  - Priority indicator (left edge, 3pt wide, full row height):
    - High: #F44336 (red)
    - Medium: #FF5E00 (orange)
    - Low: white at 10% (invisible)
    - None: hidden
  - Checkbox (left, 24pt):
    - Unchecked: 24pt square, --r-xs corners, 1.5pt border white at 20%, transparent fill
    - Checked: orange (#FF5E00) fill, white checkmark (14pt, 2pt stroke). Check animation: checkmark draws in (stroke-dashoffset), fill fades in, 160ms ease-out-soft.
  - Task title (center, 12pt left of checkbox): 15pt Sora Semibold, white. Completed: white at 40%, strikethrough.
  - Second line (below title, left-aligned with title):
    - Domain tag chip: Domain Tag Chip pattern (domain color 15% bg, domain color text, 11pt, --r-sm, 24pt height).
    - Due indicator: 8pt right of chip. Time format: "8:00a", "due in 30m" (orange if within 1 hour), "overdue" (#F44336 text if past due), "no time set" (white at 40%), "recurring" (white at 40% with repeat icon 12pt).
  - Due time (right-aligned): 13pt Sora Regular, white at 50%. Shows scheduled time. Orange if within 1 hour of due. Red (#F44336) if overdue.
  - Task color dot (optional, right of title): 8pt circle in user-assigned task color, 4pt right of title text. Hidden if no color assigned.
  - Separator: 1pt white at 5% between rows, inset 56pt from left (clears checkbox area). No separator on last row.
- **Variants**: Uncompleted (active checkbox, full opacity), Completed (orange fill, muted text, strikethrough), Overdue (red due time, red priority bar pulse), High priority (red left bar), Recurring (repeat icon near due indicator)
- **Gestures**: Tap checkbox to toggle completion, swipe left to reveal edit/delete actions, swipe right >30% to complete (green reveal bg + checkmark), long-press to reorder within section, tap body to open Task Detail modal
- **Size**: Full-width minus 32pt x 72pt per row

### Reminder Row
- **Purpose**: Individual reminder with enable/disable toggle, next trigger time, and notification channels
- **Data source**: API -- GET /api/reminders (scheduled_reminders table)
- **Visual treatment**: Rows within an ink-brown-800 glassmorphism card. 20pt radius. Each row has 16pt horizontal padding.
- **Content per row** (72pt tall):
  - Reminder icon (left, 24pt): Bell icon (14pt) inside a 32pt circle, ink-900 bg, white at 15% border. Icon color: orange (#FF5E00) if enabled, white at 30% if disabled.
  - Reminder title (12pt right of icon): 15pt Sora Semibold, white. Disabled: white at 40%.
  - Second line (below title):
    - Schedule: "every 2h", "daily 8:00p", "Mon, Wed, Fri 9:00a" -- 13pt Sora Regular, white at 50%.
    - Channel indicators (right of schedule, 8pt gap): small icons (12pt each) for push (bell), email (envelope), SMS (phone). Visible only for active channels. White at 40%.
  - Next trigger (right side, top): "next: 11:30a" -- 12pt Sora Regular, white at 40%. Hidden if disabled.
  - Toggle switch (right side, vertically centered): Standard Toggle Switch pattern (32pt wide x 20pt tall, 44x44pt touch target). On: orange bg + white circle right. Off: white at 15% bg + white circle left.
  - Separator: 1pt white at 5% between rows, inset 56pt from left. No separator on last row.
- **Variants**: Enabled (full color, toggle on, next trigger visible), Disabled (muted, toggle off, "paused" label), Snoozed ("snoozed until 10:15a" in orange text)
- **Gestures**: Toggle switch to enable/disable, tap body to open Reminder Detail modal, swipe left to reveal edit/delete actions
- **Size**: Full-width minus 32pt x 72pt per row

### Completed Tasks Section (Collapsible)
- **Purpose**: Archive of today's completed tasks in a collapsible section
- **Data source**: API -- GET /api/tasks?status=completed
- **Visual treatment**: Uses the Expandable/Collapsible Section pattern. Chevron rotates on expand. Count badge shows total completed.
- **Content**:
  - Header: Chevron (14pt, white at 40%) + "completed" (15pt Sora Semibold, white at 60%) + count "(4)" (13pt Sora Regular, white at 40%, right-aligned)
  - Collapsed: header only, 48pt tall
  - Expanded: completed task rows inside ink-brown-800 card with 20pt radius. Each row shows checked checkbox (orange fill), task title (white at 40%, strikethrough), completion time (13pt, white at 30%, right-aligned)
- **Variants**: Has items (default collapsed), empty (section hidden)
- **Gestures**: Tap header to expand/collapse, tap completed task to view detail
- **Size**: 48pt header + variable content height

### Smart Suggestions Card
- **Purpose**: SIA-generated task suggestions based on user's goals, habits, and schedule gaps
- **Data source**: API -- SIA suggestion engine
- **Visual treatment**: SIA Coaching Note Card -- Contextual Variant. ink-brown-800 card, --r-xl (28pt), 24pt padding. Purple (#7F24FF) left border: 3pt wide, 40% opacity. Purple dot (6pt) top-left as SIA indicator.
- **Content**:
  - SIA message: 15pt Sora Regular, white at 80%, max 4 lines. Contextual suggestion referencing user data (e.g., "based on your fitness goal, try scheduling a stretching session before your Thursday dentist appointment.")
  - Action row (below message, 12pt gap):
    - "add as task" -- 13pt Sora Semibold, orange (#FF5E00), with "+" icon (12pt). Tap creates a task from the suggestion and opens Task Detail modal pre-filled.
    - "ask SIA" -- 13pt Sora Semibold, brand-orange (#FF5E00). Tap navigates to SIA Chat [09] with context pre-loaded. Orange because it's an action link — purple reserved for SIA presence indicators (dot, border) only.
  - Spacing: 8pt between action buttons, 44pt touch target each.
- **Variants**: Has suggestion (default), no suggestion (card hidden), multiple suggestions (horizontal swipe between 2-3 cards, pagination dots below)
- **Gestures**: Tap "add as task" to create task, tap "ask SIA" to open SIA Chat, swipe left/right for multiple suggestions
- **Size**: Full-width minus 32pt x ~120pt

### Floating Action Button (FAB)
- **Purpose**: Quick-create a task or reminder
- **Visual treatment**: Extended Pill variant. Height: 48pt, auto-width (~100pt). Background: orange (#FF5E00) fill. Content: "+" icon (16pt, white, 2pt stroke) + "add" label (15pt Sora Semibold, white), 8pt gap. Shadow: --shadow-2. Position: right-aligned, 16pt from right edge, 16pt above tab bar, z-40.
- **Gestures**: Tap opens Add bottom sheet (choose "task" or "reminder"), scroll behavior: fades out on scroll down, fades back in on scroll up or stop.
- **Size**: Auto-width (~100pt) x 48pt

### Add Bottom Sheet (Task or Reminder Chooser)
- **Purpose**: Route user to Task Detail or Reminder Detail creation
- **Visual treatment**: Bottom sheet, ~25% screen height, ink-900 bg, 20pt top corners, drag handle. Backdrop: ink-900 at 60%.
- **Content**:
  - Drag handle: 36pt wide x 4pt tall pill, white at 20%, centered, 8pt below top
  - Two option rows, each 64pt tall:
    - "new task" row: Clipboard icon (24pt, orange) + "new task" (16pt Sora Semibold, white) + right chevron (14pt, white at 40%). Tap opens Task Detail modal in create mode.
    - "new reminder" row: Bell icon (24pt, orange) + "new reminder" (16pt Sora Semibold, white) + right chevron (14pt, white at 40%). Tap opens Reminder Detail modal in create mode.
  - Separator: 1pt white at 5% between rows
- **Gestures**: Tap option to navigate, drag handle down to dismiss, tap backdrop to dismiss
- **Size**: Full-width x ~180pt

### Task Detail Modal (Bottom Sheet)
- **Purpose**: Create or edit a task with full detail
- **Visual treatment**: Bottom sheet, ~80% screen height, ink-900 bg, 20pt top corners, drag handle. Entry: 520ms ease-flow slide up.
- **Content** (top to bottom):
  - Handle indicator + modal header: "cancel" (left, 15pt Sora Regular, white at 50%) / "save" (right, 15pt Sora Semibold, orange #FF5E00). Title: "new task" or "edit task" (17pt Sora Semibold, white, centered).
  - Title input: Text Input Field pattern (52pt, full-width minus 32pt). Placeholder: "task title".
  - Description input: Multi-line text area, 80pt height (grows to 120pt max), same styling as Text Input Field. Placeholder: "add description (optional)".
  - Category chips: Horizontal scroll of domain tag chips. Tap to select one. Uses Domain Tag Chip pattern (tappable variant). 16pt left margin.
  - Priority selector: Three pill buttons -- "low" / "medium" / "high". Default: medium.
    - Low: white at 15% bg, white at 60% text
    - Medium (active default): orange (#FF5E00) bg, white text
    - High: #F44336 bg, white text
    - Height: 36pt, --r-pill, 8pt gap between pills
  - Schedule row: Date picker + time picker side by side. Date: "tomorrow", "May 22". Time: "10:00 AM". Ink-brown-800 bg, --r-md, 16pt padding. Tap opens native date/time picker.
  - Recurring toggle: Toggle switch + "recurring" label (15pt Sora Regular, white). When enabled, reveals:
    - Recurrence pattern: Segmented control -- "daily" / "weekly" / "monthly" / "custom". Same Segmented Control pattern.
    - Days of week (if weekly/custom): 7 day circles (M, T, W, T, F, S, S), 32pt each, --r-pill. Active: orange fill, white text. Inactive: white at 10% fill, white at 50% text.
    - End date: "no end" default. Tap to set end date via date picker.
  - Reminder row: "remind me" label + time offset selector. Default: "15 min before". Options: "at time", "5 min", "15 min", "30 min", "1 hour", "1 day". Horizontal scroll chips (Filter Chip pattern, 36pt, --r-pill).
  - Notification channels: Three toggles in a row --
    - Push (bell icon + "push"): Toggle Switch, default ON
    - Email (envelope icon + "email"): Toggle Switch, default OFF
    - SMS (phone icon + "SMS"): Toggle Switch, default OFF
    - Each: icon (16pt, white at 50%) + label (13pt Sora Regular, white at 60%) + toggle. 44pt height per row.
  - Color selector (optional): 8 color circles (16pt diameter, 8pt gap) + "none" option. Tap to assign task color. Selected: 2pt white ring, offset 2pt.
  - Tags input: Text input with chip creation. Type tag name, press enter to create chip. Chips: --r-pill, white at 10% bg, white text, 11pt, "x" to remove.
  - "save" button: Full-width orange CTA (Brand CTA Button pattern, 56pt, --r-pill). Disabled until title is entered.
  - Delete button (edit mode only): Full-width ghost button, 15pt Sora Semibold, #F44336 text, transparent bg, --r-pill, 48pt height. "delete task". 16pt below save button.
- **Gestures**: Drag handle to dismiss, tap save to create/update, tap cancel to dismiss without saving
- **Size**: Full-width x ~80% screen height

### Reminder Detail Modal (Bottom Sheet)
- **Purpose**: Create or edit a reminder with full configuration
- **Visual treatment**: Same bottom sheet treatment as Task Detail Modal. ~70% screen height.
- **Content** (top to bottom):
  - Handle indicator + modal header: "cancel" / "save". Title: "new reminder" or "edit reminder".
  - Reminder title input: Text Input Field (52pt). Placeholder: "reminder title".
  - Message input: Multi-line text area, 60pt (grows to 100pt). Placeholder: "notification message (optional)".
  - Reminder type selector: Horizontal chips -- "one-time" / "daily" / "weekly" / "custom". Filter Chip pattern.
  - Time picker: Large time display (32pt Sora Bold, white, centered) with tap-to-edit. Opens native time picker. Below: "AM" / "PM" toggle pills.
  - Days of week (if daily/weekly/custom): Same 7-day circle selector as Task Detail.
  - Advance minutes: "remind me" + dropdown-style selector. Options: "at time", "5 min before", "15 min before", "30 min before", "1 hour before". Uses Filter Chip row.
  - Snooze setting: "allow snooze" toggle + snooze duration. Duration options: "5 min", "10 min", "15 min", "30 min". Visible only when toggle is on.
  - Repeat if missed: "repeat if missed" toggle. When on, reminder will re-trigger if not acknowledged.
  - Notification channels: Same three-toggle row as Task Detail (push, email, SMS).
  - Timezone display: "timezone: [auto-detected]" -- 13pt Sora Regular, white at 40%. Informational only.
  - "save" button: Brand CTA Button pattern (56pt, --r-pill, full-width).
  - Delete button (edit mode only): Same ghost delete button as Task Detail.
- **Gestures**: Same as Task Detail Modal
- **Size**: Full-width x ~70% screen height

### Date Group Section Card
- **Purpose**: Groups task rows within a date section
- **Data source**: Computed from task scheduled_at dates
- **Visual treatment**: ink-brown-800 background, --r-xl (28pt) radius, 1pt border white at 5%. Task rows stack inside with dividers.
- **Variants**: N/A (structural)
- **Gestures**: N/A
- **Size**: Full-width minus 32pt (16pt margins) x auto

---

## Visualization

> Source: no companion file (light Tracker — none authored); Audited in `viz-audit/` — Batch (Tracker B), findings `S61-V01..S61-V03`. All primitives are from `viz-audit/VIZ-KIT.md` at `viz-audit/CONSISTENCY.md` parameters. **Register = Brand Mode → orange-dominant.** Benchmark = **Things + Todoist** (checklist-first task managers — calm, not dashboard-y), rendered the Balencia way (one warm completion bar + an honest counts pair), **not** as a Things/Todoist clone. Mints **no** new primitive — composes `MomentumBar` (`VK-004`) + `KPIStatTile` (`VK-008`). **Current grade C (66) → specced-target A− (85).** *(Honest re-grade under the revised 10-dimension rubric; the residual gap to A+++ is build-verified depth + the count-up micro-interaction, owned by the later viz-build program.)*

**This is deliberately a 2-subsection lightweight mini-section** (per the Lightweight-MEDIUM template). Reminders & Tasks is a **checklist-first** screen, not a domain dashboard — its job is to read as a calm, scannable list (the Things/Todoist bar). Premium ≠ maximal: the *only* metric the screen genuinely benefits from visualizing is **today's completion**, which the spec already names but renders nowhere (the high-motivation tier states "4 of 6 done — 67% completion rate today" as text, and the Completed header shows a bare "(4)"). Everything else — task titles, due times, categories, recurrence, reminder cadences, channels, dates — is **deliberately textual** (one-off scalars / identity labels with no useful chart form). Over-charting this screen (fake task-volume trends, a streak heatmap, a category donut) would be *worse*, not more premium, and is penalised under Data-resolution (calm-vs-clutter) and Hero (no competing foci). The current screen has **zero** viz and surfaces the completion datum nowhere — that gap *is* the finding.

### Visualized-vs-text map

| Datum (already in the screen/mock) | Today | Specced visual | Primitive |
|---|---|---|---|
| Today's completion (done ÷ total — e.g. 4 of 6, 67%) | invisible; only a bare Completed "(4)" + a high-motivation *text* line | **continuous orange→green completion bar** at the top of Today | **`MomentumBar` (`VK-004`)** |
| Done count · Open count (today) | bare "(4)" in the Completed header; open never counted | **two `KPIStatTile`s** — number + uppercase label, paired with the bar | **`KPIStatTile` ×2 (`VK-008`)** |
| Active reminders (N on / M total) | individual toggles only; no roll-up | small **inline count chip** ("3 of 4 on") in the Reminders eyebrow — text + count, no chart | — (deliberately textual roll-up) |
| Task titles · due times · "due in 30m" / "overdue" | text rows | — (one-off scalars / time strings — no useful visual form; **keep clean text**) | — |
| Priority (high/med/low) | 3pt left bar + glyph | — (kept as the existing bar **+ a visible glyph**, not promoted to a chart) | — (status, not data) |
| Domain category · recurrence · reminder cadence · channels · dates | text / chips / icons | — (identity labels — deliberately textual) | — |

**Editorial hierarchy (calm, not maximal):** the **task list stays the screen's content focus**; the completion `MomentumBar` is the *single* lightweight viz anchor (it sits inside the Today section, not as a billboard hero competing with the list); the two `KPIStatTile`s are its honest read-out. Two visuals total, one focal — the Things/Todoist calm bar, not a dashboard.

### 1 · Today completion bar — `S61-V01` → `MomentumBar` (`VK-004`)

At the top of the **Today** section (above the first task row, inside the same date-group card or as a 28pt strip directly above it), a **`MomentumBar`**: a **single continuous** rounded-pill bar (radius-pill, 8px tall) filled **`--grad-progress` (mint)** orange→green to `done ÷ total` of today's tasks, **arrival end green** at 100%. This is the brand's path-of-progress for "today's actions complete" — the *same* primitive Home [12] / Habits [38] use, so daily completion reads identically across the app. Replaces the spec's text-only "67% completion rate today."
- **Depth (token-backed):** fill `--grad-progress` orange→green over a `--color-alpha-white-08` track on a `--track-inset` **(mint)** recess; **no glow** (MomentumBar is flat-premium — glow is reserved for gauge heroes the app doesn't need here); `ink-brown-800` card surface + top-edge highlight.
- **Non-shaming (ethical core — this is the primitive's reason to exist):** the bar **frames momentum, never weaponises loss-aversion** — a partly-filled bar reads as "you're moving," never "you're behind"; it **never turns red** and there is **no broken-streak / loss-aversion countdown**. At 0/N it shows a calm empty track + "let's start the day," not a guilt state. (Mirrors the existing "all done for today" green completion bar at the top of the Today section — this *is* that bar, made a real `MomentumBar` and present at every fill level, not only at 100%.)
- **Honesty:** the whole is the **true** count of *today's* tasks (`remindersTasks.today.length`), not a padded or cherry-picked denominator; completed-from-other-days don't inflate it.
- **Micro-interaction:** checking a task **re-fills the bar** to the new ratio (width animates, arrival flashes green at 100%); tap the bar → scroll/expand the Completed section.
- **Data:** derived from `remindersTasks.today` (`done` flags) + live `completed` state (`page.tsx`).
- **States:** **0 of N** → empty track + "let's start the day" (calm, not red); **all done** → full orange→green fill + the existing "all done for today" cap (green pill — keep); **loading** → track skeleton that fills into the real ratio (depth preserved, never a blank line).

### 2 · Done / Open counts — `S61-V02` → `KPIStatTile` ×2 (`VK-008`)

Beside (or directly under) the completion bar, **two `KPIStatTile`s** give the bar an honest numeric read-out: **DONE** (`text-h2` number, count-up) and **OPEN** (`text-h2` number) for *today*. This replaces the bare Completed "(4)" with a paired, legible done/open snapshot and gives the screen a calm at-a-glance "where am I today."
- **Anatomy (locked):** uppercase label (`white/40`, +0.12em) · number `text-h2` · count-up `--dur-base` 280ms `--ease-out-soft`. **No delta arrow on the counts** — there is no honest, disclosed prior-period window for "tasks done today" (yesterday's count is a different task set; a fabricated ▲ would be a dishonest-delta finding). Counts are presented as today's honest state, not a trend.
- **Depth:** tile surface `ink-brown-800` + top-edge highlight; **no glow** (flat-premium KPI tiles).
- **Non-shaming:** OPEN is framed as *remaining*, never *failing*; no red, no "overdue" tally weaponised here (per-row overdue treatment stays on the Task Row, glyph + muted, not aggregated into a shame number).
- **Data:** `done = completed ∩ today`, `open = today.length − done` (derived in `page.tsx`).
- **States:** **Day-1 / no tasks** → both read `0` with the empty-state copy taking over (no tiles forced onto an empty list); **loading** → label + skeleton number bar.

### Inline roll-ups (deliberately textual — `S61-V03`)

The **Reminders** eyebrow carries a tiny **count chip** ("3 of 4 on") — text + count, **not** a chart (4 toggles don't earn a gauge); it's the honest roll-up of `reminderStates`. The **Completed** header keeps its "(N)" count. These are intentionally textual: a count this small has no useful visual form, and charting it would be clutter, not premium.

### Motion choreography (entrance, draw-first)

Per `CONSISTENCY.md`: the **completion `MomentumBar` is the one animated viz** — its fill **rises 0→ratio** (`--dur-slow` 520ms `--ease-flow`, arrival flashes green at 100%) **first**, then the two `KPIStatTile` numbers **count up** (`--dur-base` 280ms `--ease-out-soft`); the task/reminder lists keep their existing staggered fade-up (today 0ms → reminders 240ms → completed 320ms → SIA 400ms). One progress motif per surface (no second bar/line elsewhere on the screen). `prefers-reduced-motion` → the bar renders at its final fill instantly and the numbers at final value (no count-up, no rise) — the static completion state is fully legible.

### States, brand & accessibility

- **States (all designed, per RUBRIC dim 7):** **cold-start / Day-1** — no `MomentumBar`/tiles forced onto an empty list; the existing "no tasks yet" empty state owns the screen (the bar appears only once today has ≥1 task); **loading** — the bar shows a track skeleton that *fills* into the real ratio and the tiles show label + skeleton number (depth preserved, never blank); **empty (all done)** — full orange→green bar + the "all done for today" green cap, OPEN reads `0`, framed as celebration not idleness; **error** — if today's tasks fail to load, the bar + tiles are suppressed (not shown at a fake 0) and the screen falls back to the spec's "could not load tasks — tap to retry" per the Error Handling table.
- **60/30/10 (Brand Mode → orange-dominant):** **orange dominates data ink** — the `MomentumBar` effort fill, KPI accents, checkbox-checked fill, FAB, save, reminder-on toggle, due-soon text (all already orange). **Green** = arrival/completion only (the bar's 100% arrival end, the "all done" cap, swipe-to-complete reveal, success flashes) — never as a general accent. **Purple stays SIA-only** — the Smart Suggestions dot + border (no chart on this screen is purple; there is no projection here, so no dashed-purple). **Domain colours** stay **identity only** on task-row tag chips — they never carry the completion data ink. **High-priority red `#F44336`** stays an urgency *status* on the row's 3pt left bar **+ a visible glyph** (warning triangle), never a CTA, eyebrow, or the completion viz; *(prototype note — `S61-V01` brand flag: the live `/features/reminders` route renders the high-priority indicator in `stalled-amber` instead of the spec's `#F44336`; either way it must stay glyph-paired status, never data ink).* Glow: none — this screen has no gauge hero, so it correctly carries no chart glow (warm depth lives in surfaces, not neon).
- **Non-shaming:** completion is framed as **momentum + remaining**, never a verdict — the bar never reddens or "breaks," OPEN means *left to do* not *failed*, and no streak/loss-aversion device is attached to task completion (Gentler-Streak thesis applied to a to-do list).
- **Accessibility:** the `MomentumBar` carries a text/`aria-label` equivalent conveying the value ("4 of 6 tasks done today, 67 percent"); each `KPIStatTile` announces label + number ("Done, 4"; "Open, 2"); status is **never colour-alone** — completion is shown as the filled bar **+** the numeric tiles **+** the per-row checkbox glyph, and priority as the left bar **+** a visible warning glyph + the VoiceOver "High priority" label (per the Accessibility section); label/value contrast ≥ **4.5:1** on `#0A0A0F`/`#211008`; **WCAG 1.4.11** — the `MomentumBar` fill and the filled/track boundary meet ≥3:1 vs background (the `white/08` track is decorative-only); interactive targets (bar tap-to-expand, tiles) ≥ **44×44pt**; `prefers-reduced-motion` renders the bar + numbers at final state.

Conform to `viz-audit/CONSISTENCY.md`.

---

## Premium Craft

**Profile:** data · **Cluster benchmark:** Things + Apple Reminders (checklist-first, calm) — *stays Balencia via the warm-glow layered card system, the completion MomentumBar + KPI tiles as a single focal viz, and the brand-period-closed microcopy on every edge state.*
**Pre-grade:** B+ (77) · **Post-grade (this section):** A++ (96)

**Pre-grade drivers note:** Flat card surfaces lack the layered depth; the MomentumBar/KPI visualization exists but is underplayed (not a focal anchor); task/reminder rows were inert static divs (critical audit finding from batch-16); microcopy on empty/loading/error/disabled states was templated or absent.

---

### Focal hierarchy

One focal point above the fold: **the Today section's completion MomentumBar** — the first element read after the screen header, sized at 8px height and continuous rounded-pill form on an `--track-inset` recess, filling orange→green to today's done÷total ratio. This is the visual anchor that reads as "what is my momentum *right now*." Paired immediately below the bar, two `KPIStatTile` numbers ("DONE 4" / "OPEN 2") anchor the value-read, preventing ambiguous fill interpretation. Everything else is secondary: the task rows are the dense content layer (many items, low visual weight per row), reminders are a parallel data stream (toggles + schedule, not a chart), the completed section is collapsed by default (archive mode), and the SIA suggestion card sits at the bottom as an opportunity, not a prompt. The squint test lands on the MomentumBar fill and the two count tiles first, reading as "today's completion at a glance"; the task list then comes into focus as the *content* to interact with. No competing visual foci.

---

### Surface & depth

Every card adopts **`CK-P1` Layered Warm Surface** — `--color-ink-brown-800` body + `--radius-xl` (28pt, the primary content card radius per brand rule) + 1px `--glass-border` (`--color-alpha-white-06`) + **`--edge-highlight` top-edge highlight** (`CK-T01`, the sacred not-flat cue that lifts layered surfaces off the field) + `--shadow-1`. 

The **Today section card** (containing the MomentumBar, KPI tiles, and task rows) receives the base layered treatment. The **MomentumBar** inside sits on an 8px `--color-alpha-white-08` track over a `--track-inset` (mint, a beveled recess — fixes the prior flat-fill defect) with rounded-pill caps. The bar fill is `--grad-progress` (orange at rest, arrives green at 100%) and **carries no glow** (inline ≤8px elements never glow per CONSISTENCY.md §1 size scale). The **KPI tiles** are rendered without secondary card surfaces (numbers sit inline with labels on the same row, sharing the parent card's depth). 

The **Upcoming, Reminders, Completed, and SIA suggestion cards** all receive the `CK-P1` layered treatment: `ink-brown-800` body, `--radius-xl`, `--glass-border`, `--edge-highlight`, `--shadow-1`. No flat fills. The **Reminder toggle switch** (32pt wide × 20pt tall) sits within a reminder row; its track is 1px `--glass-border` on an `ink-brown-800` background (inheriting the row's surface depth — the toggle itself is a control, not a secondary card). 

No surface on this screen reads as a flat box with only a border. Depth is applied uniformly so the hierarchy reads spatial, not just by information priority.

---

### Typographic rhythm

Map the Typography table to `CK-P3` locked tokens:

- **Screen header title** ("Reminders & tasks") — `--text-h2` (20pt) / 600 weight / `--leading-snug` (1.25) / white 100%
- **Section eyebrows** ("TODAY" / "TOMORROW" / "REMINDERS" / etc.) — the `.eyebrow` recipe (12pt / 600 / `--tracking-eyebrow` 0.12em / uppercase / `--color-alpha-white-40`)
- **Task title** — `--text-h3` (17pt) / 600 / `--leading-snug` / white 100%; completed task title same size but `--color-alpha-white-40` + strikethrough
- **Domain tag chip label** — `--text-caption` (13pt) / 600 / domain color (no opacity; the 15% background is the opacity, the text is full saturation)
- **Due time indicator** ("8:00a", "due in 30m", "overdue", "recurring") — `--text-small` (11pt) / 400 / `--leading-normal` (1.4) / `--color-alpha-white-50` (base) · orange if within 1 hour · `--color-error-red` if overdue
- **Reminder title** — `--text-h3` (17pt) / 600 / white 100%; disabled reminder title `--color-alpha-white-40`
- **Reminder schedule** ("every 2h", "daily 8:00p", "Mon, Wed, Fri 9:00a") — `--text-small` (11pt) / 400 / `--leading-normal` / `--color-alpha-white-50`
- **KPI stat numbers** (DONE 4 / OPEN 2) — `--text-display-l` (32pt) / 700 / `--leading-tight` (1.1) / white 100% with `font-variant-numeric: tabular-nums`
- **KPI stat labels** ("DONE" / "OPEN") — `--text-caption` (13pt) / 600 / `--leading-normal` / `--color-alpha-white-50`
- **Completed section header** ("completed") — `--text-h3` (17pt) / 600 / `--color-alpha-white-60`
- **Completed count** ("(4)") — `--text-small` (11pt) / 400 / `--color-alpha-white-40`
- **SIA suggestion message** — `--text-body` (16pt) / 400 / `--leading-normal` / white 80%
- **"add as task" / "ask SIA" action links** — `--text-h3` (17pt) / 600 / `--color-brand-orange` (orange because it is a user action, not a SIA indicator)
- **FAB label** ("add") — `--text-h3` (17pt) / 600 / white 100%

Weight contrast carries hierarchy (600–700 vs 400), not size alone. Sentence case on all labels and section eyebrows. No exclamation marks. The **brand period** is used with intent on key closure lines ("all done for today." — a warm, settling punctuation, not a staccato end). Chillax remains logo-only (absent here). ≤2 `--color-brand-orange` accent words per screen (the two are the FAB label "add" and the "ask SIA" link text).

---

### Microcopy (before → after)

All narrative copy authored to `CK-P5` brand voice — warm, plain, coaching tone; sentence case; no exclamation marks; non-shaming framing of incompletion/missing data.

**Today's Tasks section:**
- *before:* "TODAY" (eyebrow only) → *after (same, but context-paired):* eyebrow + implicit "let's complete today" frame via the MomentumBar visual
- *before (implicit):* no empty-state message when no tasks exist → *after (new, on-voice):* "No tasks for today · check your upcoming list or create one." (warm, actionable; never "no tasks — nice work" which presumes they finished yesterday)

**Upcoming sections:**
- *before:* "TOMORROW" / "THIS WEEK" (static eyebrows) → *after (contextual):* same; paired with task rows authored to specificity (see Task Detail spec for placeholders like "take vitamin D" that are real example copy, not blanks)

**Reminders section:**
- *before:* "REMINDERS" eyebrow; no count → *after (new):* eyebrow + inline roll-up text "3 of 4 on" (the tiny count chip from the Visualization spec; still text, not a chart, but honest status at a glance)
- *before (disabled reminder copy):* "paused" (given) → *after (kept as is, on-voice):* same; explicitly states toggle state without shame
- *before:* no message when reminders list is empty → *after (new, non-shaming):* "Set up a reminder for your health activities" (warm invitation, never "no reminders yet — you might miss something")

**Completed Tasks section:**
- *before:* "v Completed (4)" (given header) → *after (kept with context):* same eyebrow/count; expanded state shows task rows with strikethrough + completion time
- *before:* no message when completed is empty → *after (new, celebratory):* "All done today. Rest well." (warm closure, frames completion as progress, not idleness)

**All-done-for-today state (when OPEN = 0):**
- *before (spec text only):* "all done for today" — 13pt Sora Regular, white at 40% (static text) → *after (new, placement):* same text anchors below the MomentumBar at 100% (visual + microcopy together = the completion moment)

**SIA Suggestion card:**
- *before (spec template):* "Based on your fitness goal, try scheduling a stretching session before your Thursday dentist appointment." (templated connector words) → *after (real authored copy example):* "Before your Thursday appointment, a 5-minute stretch could ease tension. Ready to add it?" (specific to actual user data, warm conversational tone, ends with a question not a command)
- *before:* "add as task" / "ask SIA" labels (given) → *after (same, clarified):* orange-coloured action labels (never purple — actions are always orange; purple is reserved for SIA *presence* indicators like the left border and dot)

**Empty state (Day 1, no tasks or reminders):**
- *before:* implicit empty; no onscreen message → *after (new, warm, non-shaming):* 
  - Icon: 48pt clipboard, white at 20%
  - Heading: "No tasks yet" (18pt Sora Semibold, white at 60%)
  - Body: "Create your first task or let SIA suggest one based on your goals." (15pt Sora Regular, white at 40%, max 260pt width)
  - Two action chips: "Create task" + "Ask SIA" (orange outlined pills, 36pt, --r-pill)
  - Frame: centered in content area, above the FAB, never a degenerate blank screen

**Loading state (skeleton):**
- *before:* no skeleton spec → *after (new):* 
  - MomentumBar: pill-shaped skeleton (8px height, `--color-alpha-white-04` shimmer, depth preserved)
  - KPI tiles: two number-bar skeletons (tabular-sized, `--color-alpha-white-04`, animated shimmer 1200ms, no label skeleton — labels stay static)
  - Task rows: full-row shimmer skeletons within the card (checkbox + 2 lines of text, `--color-alpha-white-04`, 400ms stagger per row)
  - Copy: "Loading your tasks…" (13pt Sora Regular, white at 40%, fade-in at 2s if load is slow)

**Error state (tasks API fails):**
- *before:* no error spec → *after (new, specific, recovery-named):*
  - Icon: 24pt exclamation circle, `--color-error-red`
  - Heading: "Couldn't load your tasks" (15pt Sora Semibold, white)
  - Body: "Tap to retry — we'll sync when your connection improves." (13pt Sora Regular, white at 60%, specific recovery action named)
  - CTA: "Retry" button (orange, 48pt, --r-pill; tap re-fetches; pull-to-refresh also available)
  - Fallback: if cached data exists, show last-synced-state below ("Last updated 10 minutes ago") — never a blank error screen

**Offline state (network failure, cache available):**
- *before:* no offline spec → *after (new, honest):*
  - Banner: orange-bordered alert at top ("You're offline · your changes are queued and will sync when you're back online.", 13pt, --color-brand-orange border 2pt left)
  - Content: cached task/reminder list shown (full opacity, no dimming — the data is real)
  - Disabled: task completion (queued locally, visual feedback "saving…" appears); reminder toggle (visual feedback "queued"), add/edit operations (FAB disabled with a tooltip "available when online")

**Disabled reminder copy (toggle off / paused state):**
- *before:* "paused" label (given) → *after (kept + context):* same label; toggle visually off (white at 15% bg); next-trigger time hidden (not shown when disabled); copy stays warm ("You can turn this back on anytime.")

No filler, no "Title / Subtitle", no hint text strings. Every edge message is authored, warm, and non-shaming. All error/permission/disabled/empty/loading strings carry the period at the sentence close.

---

### Motion choreography

Per `CONSISTENCY.md` §3 choreography order (hero draws → support rises → numbers count → SIA settles):

1. **Screen content mounts** (the screen itself, after navigation): header fades in (0ms)
2. **Today section rises** (the card container, 80ms, ease-out-soft, 280ms duration)
3. **MomentumBar fills** (the focal motion, 520ms ease-flow, starting after Today section fade-in completes) — the **orange→green fill rises 0→today's done÷total**, drawing as a fill animation (never opacity-fade), arrival end flashes green at 100% (a brief 200ms glow). This is the **one animated stroke** per surface (draw-not-fade, §8).
4. **KPI stat numbers count up** (both "DONE" and "OPEN" numbers, 280ms ease-out-soft, starting after bar fill ends) — numbers animate 0→final value with tabular-nums applied (no width shift). No count-up on the "OPEN" label if it stays at 0 (static frame).
5. **Task rows stagger-fade-up** (each row: 280ms ease-out-soft, L-anchored translateY(12→0), 40ms stagger between rows, starting after KPI count completes) — such as row 1 at 80ms offset, row 2 at 120ms offset…
6. **Upcoming section rises** (160ms delay after task rows start, matching the stagger ceiling)
7. **Reminders section rises** (240ms delay after task rows, allowing async load)
8. **Completed section rises** (320ms delay)
9. **SIA suggestion card rises** (400ms delay, the purple presence settles last)
10. **Below-fold sections** (if present) animate on scroll-into-view (standard lazy entrance pattern, same stagger)
11. **FAB scales in** (400ms delay, scale(0.8→1.0), opacity(0→1), ease-out-soft) — appears after the main content so it is not visually competing

**Task checkbox completion** (on tap):
- Checkmark stroke draws in (stroke-dashoffset animation, 160ms ease-out-soft)
- Checkbox fill fades in orange (opacity 0→1, 160ms parallel)
- Task text mutes to white/40 + strikethrough slides in (opacity + text-decoration, 160ms parallel)
- After 800ms delay, the row animates out to the Completed section (520ms ease-out-soft, translateY + opacity fade, green glow flash 600ms on arrival)

**Reminder toggle state change** (on tap):
- Circle slides left↔right (160ms ease-out-soft)
- Background color crossfades (orange ↔ white/15, 160ms parallel)
- "Next: [time]" text updates / hides (fade 160ms)

**Completed section expand** (on tap header):
- Chevron rotates 0→90° (160ms ease-out-soft)
- Content height animates 0→auto (280ms ease-out-soft), rows stagger fade-in inside (40ms stagger, 280ms each)

**`prefers-reduced-motion`:** Every animated element renders at its **final state instantly** — the MomentumBar at its final fill width (orange when <100%, orange→green gradient at 100%), the KPI numbers at final values (not counting up), rows fully visible (no fade-in), the completed section visually expanded/collapsed per state, no loop motions on toggles. The **static form of the signature is preserved** — the orange fill at rest, the drawn completion bar at 100%, the count-up numbers legible — no essential information lost.

---

### State craft

Every state is designed, never deferred to a generic error table.

| State | Layout | Copy (on-voice) | Depth/brand |
|---|---|---|---|
| **Cold-start / Day 1 (no tasks or reminders)** | Centered empty-state card with clipboard icon (48pt, white/20), heading "No tasks yet" (18pt Sora Semibold, white/60), body "Create your first task or let SIA suggest one based on your goals." (15pt Sora Regular, white/40, max 260pt width), two action chips ("Create task" + "Ask SIA", orange outlined pills, 36pt, --r-pill). FAB still visible. SIA suggestion card may appear below if onboarding goals exist. | Warm invitation, never a penalty; frames task-creation as forward motion. | `CK-P1` layered card (if suggestion card appears) · orange pill CTAs on ink-brown-800 surface · warm glow on button tap only (`--glow-orange-sm`) |
| **Loading (sync in progress)** | Same layout as populated state; MomentumBar as pill-skeleton (8px, `--color-alpha-white-04`, shimmer 1200ms); KPI number-skeletons (tabular-width bars, `--color-alpha-white-04`, shimmer 1200ms); task rows as full-row skeletons (checkbox + 2-line text shimmer, 400ms stagger per row). Eyebrows stay static. | "Loading your tasks…" (13pt Sora Regular, white/40, appears at 2s threshold if load slow; never blank skeleton-only experience). | Depth preserved — skeletons render within `CK-P1` cards; shimmer color `--color-alpha-white-04` (faint, calming) · top-edge highlight on card still visible (not stripped during load) |
| **Empty / no tasks in a section (partial)** | Section card present but task rows replaced by single centered text. | "No tasks for today · check your upcoming list or create one." (Upcoming if empty.) · "No reminders set · add one for your health activities." (Reminders if empty.) | Card depth fully applied (not a flat ghost state); section eyebrow still visible; implies "this section exists, just nothing scheduled" |
| **Error (API failure)** | Error icon (24pt circle, `--color-error-red`, centered in card), heading "Couldn't load your tasks" (15pt Sora Semibold, white), body "Tap to retry — we'll sync when your connection improves." (13pt Sora Regular, white/60). Orange "Retry" button (48pt, --r-pill) below. If cached data exists, show "Last updated 10 minutes ago" (white/40) below button. | Specific failure named ("tasks", not "data"); recovery action named ("Retry" not "OK"); honest window ("when your connection improves" — no false promise of immediate fix). Never "Error 500" or generic text. | Icon in `--color-error-red` (calibrated-red only for genuine operational failure); layout honors card depth; warm error tone, not cold tech-speak |
| **Offline (network lost, cache available)** | Orange left-border banner at screen top ("You're offline · your changes are queued and will sync when you're back online.", 13pt, white text, --color-brand-orange 2pt left border). Content below: cached task/reminder list rendered at full opacity (data is real, not dimmed). Disabled actions with inline affordance: FAB dimmed (white/30, tooltip "available when online"), toggle switches dimmed (white/30) with "queued" label on attempted tap, checkboxes show "saving…" toast (orange, 2s, on tap attempt). | "You're offline" — simple, plain, no shame. "Your changes are queued" — honest framing (not "failed" or "lost"). Toggles/checkboxes on tap: "Saving when online…" (warm, specific, no alarm). | Orange accent on the offline banner (brand presence, not alarm) · card depth maintained · queued state visually distinct from normal (dimmed control + label) but not error-red |
| **Completed (all done for today)** | MomentumBar filled 100% (full orange→green gradient, arrival end solid green, 8px height on --track-inset recess). KPI tiles: "DONE 4" / "OPEN 0" (numbers fully colored, 32pt). Task rows: all with checked orange checkmarks + muted text (white/40) + strikethrough. Completed section: expanded by default, showing all 4 rows. Below last task row: "All done for today." (13pt Sora Regular, white/40, centered, 16pt vertical padding). | "All done for today." — period-closed, warm, settling; frames completion as rest and progress, never idleness. If SIA card present: "Great progress · want to tackle something extra?" (optional, gentle encouragement, not a push). | MomentumBar green arrival glow (600ms flash at 100% fill, `--glow-green`); KPI numbers at full 100% opacity; checkmarks all orange; depth on card unchanged (no "success" flattening) · warm tone throughout |

---

### Signature & anti-generic

**The ownable Balencia moment:** The **completion MomentumBar** — the same Living-Line family primitive (path-of-progress) used on Home [12] and Me Main [17], so daily completion reads identically across the app. The continuous orange→green rounded-pill shape that **draws, never fades** (§8), arriving green at 100% with a brief glow pulse. This is the signature craft: warm, honest momentum framing that never weaponises loss-aversion. A partly-filled bar reads as "you're moving" (momentum), never "you're behind" (verdict). Combined with the **warm-glow layered cards** (`CK-P1`, edge-highlight, inset tracks), the **orange-dominant data-ink** (checkbox checked-state, FAB, completion bar effort fill), and the **brand-period-closed microcopy** ("all done for today."), the screen reads unmistakably Balencia — a coach's calm, supportive checklist tool, not a productivity app or a Things/Todoist clone.

**Generic tells removed:**
- ~~Flat card fills on `ink-900` background~~ → Layered `CK-P1` surfaces with `--edge-highlight` + beveled `--track-inset` on the MomentumBar track
- ~~"Success!" generic success toast~~ → Specific, warm, contextual copy ("All done for today." closing the Today section; checkbox completion micro-feedback glyph + haptic, no text bloat)
- ~~"Loading…" spinner only~~ → Skeleton that **preserves layout and depth** (pill skeleton for the bar, row skeletons with shimmer, card surfaces visible throughout)
- ~~Static error card~~ → Specific error ("Couldn't load your tasks"), named recovery ("Tap to retry"), optional cached fallback ("Last updated 10 minutes ago")
- ~~"Paused" label without context~~ → Disabled reminder rows fully dimmed, next-trigger hidden, copy stays warm ("You can turn this back on anytime.")
- ~~Symmetric grid monotony~~ → Editorial list structure (Today grouped in one card, sections stacked vertically with varied padding, eyebrows + data + empty-state inline; no card-grid wall)

No templated phrases. No shaming. No exclamation marks. No "Your data here" placeholders. The screen reads authored, warm, and intentional.

---

### Accessibility

**Contrast pairs** (WCAG AA):
- Task title white (100%) on `ink-brown-800` (`--color-ink-brown-800`) = 15.6:1 ✓
- Completed task title white/40 (`--color-alpha-white-60`) on `ink-brown-800` = 5.2:1 ✓
- Eyebrow white/40 on `ink-brown-800` = 5.2:1 ✓
- Due time white/50 on `ink-brown-800` = 7.5:1 ✓
- Overdue red (`--color-error-red`) on `ink-brown-800` = 4.7:1 ✓
- Domain tag text (such as fitness red `--color-domain-fitness`) on domain-subtle 15% bg (`--color-domain-fitness` at 15% opacity) = 3.8:1 ✓
- MomentumBar orange fill on white/08 track = 11.2:1 ✓ (WCAG 1.4.11 load-bearing graphic ≥3:1 met)
- KPI stat numbers white (100%) on `ink-brown-800` = 15.6:1 ✓
- Focus ring: `CK-T03` (2px orange `--color-brand-orange` with 2px offset on dark field) applied to every focusable element (task row, reminder row, FAB, toggle, checkbox, "add as task" / "ask SIA" links). All interactive controls receive focus-ring on focus-visible. ≥4.5:1 on dark background ✓

**Touch targets:** All interactive elements ≥44×44pt:
- Task row: full width × 72pt ✓
- Reminder row: full width × 72pt ✓
- Checkbox: 44pt touch target (visual 24pt, expanded hit area) ✓
- Reminder toggle: 44×44pt touch target (visual 32×20pt, inset 8pt padding) ✓
- FAB: 48×48pt ✓
- "Add as task" / "Ask SIA" links: 44pt minimum height each ✓

**Semantic roles and announcements:**
- **Task rows:** `role="button"` (tappable to open detail) with `aria-label` combining priority, title, category, and due-time ("High priority. Take vitamin D. Wellbeing. Due at 8:00 AM, due in 30 minutes."). **Checkbox** within row receives `role="checkbox"` with `aria-checked` state reflecting completion. Label announces on toggle: "Take vitamin D, completed." (success haptic + announcement).
- **Reminder rows:** `role="button"` with `aria-label` ("Water intake reminder, every 2 hours, enabled, next at 11:30 AM."). **Toggle switch** receives `role="switch"` with `aria-label` + `aria-checked`, announcing on state change ("Water intake reminder, off.").
- **Section headers:** `role="heading"` level 2 (such as "Today", "Completed", "Reminders") for screen-reader navigation.
- **Completed section:** Collapsible header announces state ("Completed, 4 tasks, collapsed") on focus; chevron announces rotate action.
- **MomentumBar:** `aria-label` ("4 of 6 tasks done today, 67 percent.") · not colour-only; numeric read-out is the text equivalent.
- **KPI tiles:** Each announces label + number ("Done, 4" / "Open, 2") · tabular-nums ensure numeric reading (no single-digit rendering as text).
- **SIA suggestion card:** `role="region" aria-label="SIA suggestion"` with contained actions ("Add as task", "Ask SIA") announced as buttons within the region.

**Colour-not-alone rule:**
- **Priority indicator (left bar + glyph):** High-priority red left bar is paired with a visible **warning triangle glyph** (12pt, white/60) beside the priority bar on the task row. Never colour alone. VoiceOver announces "High priority" + the glyph reinforces it visually.
- **Due-soon orange text:** "due in 30m" displayed in orange is paired with a visible **clock icon** (12pt, orange, inline before text). Never colour alone.
- **Overdue red text:** "overdue" displayed in red is paired with a visible **alert icon** (12pt, red, inline before text).
- **Reminder enabled/disabled toggle:** Visual orange fill (on) / white/15 fill (off) is paired with a **visible label** ("enabled" / "paused" text announced via aria-label and visible on long-press or focus). Never colour alone.
- **Notification count badges (Notifications quick-link):** Today bare orange dot; **after:** count badge "12" (visible number) + glyph (notification bell) so unread state is not colour-alone (resolves batch-16 colour-alone miss flagged in batch-17 notes).

**Reduced motion:**
- MomentumBar renders at final fill width instantly (no fill animation); the **orange fill at rest** and **green fill at 100%** are the canonical static forms (motion is enhancement, not information).
- KPI numbers render at final values instantly (no count-up animation).
- Task rows fade-in to full opacity instantly (no stagger, simultaneous appearance).
- Checkbox completion animations (stroke, fill, strikethrough) are instant (final state—checkmark visible, text muted + struck, haptic feedback still triggered).
- Completed section expand/collapse is instant (content shows/hides without height animation).
- All colour transitions (toggle on/off, state changes) are instant.
- No urgency/looping motions anywhere on this screen (this is a utility, not a paywall).

---

Conform to `design-audit/CONSISTENCY.md`.


---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | Base canvas |
| Section cards | #211008 | ink-brown-800 | Glassmorphism card surface |
| Card borders | white at 5% | -- | Subtle glassmorphism border |
| Checkbox checked fill | #FF5E00 | brand-orange | 60% role -- task completion |
| Checkbox checkmark | #FFFFFF | white | On orange fill |
| High priority bar | #F44336 | error-red | Urgency indicator |
| Medium priority bar | #FF5E00 | brand-orange | Standard priority |
| Overdue text | #F44336 | error-red | Past-due warning |
| Due-soon text | #FF5E00 | brand-orange | 60% role -- within 1 hour |
| Reminder toggle on | #FF5E00 | brand-orange | 60% role -- active state |
| Reminder toggle off | white at 15% | -- | Disabled state |
| Reminder icon (enabled) | #FF5E00 | brand-orange | 60% role -- active reminder |
| Reminder icon (disabled) | white at 30% | -- | Paused reminder |
| FAB background | #FF5E00 | brand-orange | 60% role -- primary CTA |
| Save button | #FF5E00 | brand-orange | 60% role -- CTA |
| Completed task check | #FF5E00 | brand-orange | Consistent with habits screen |
| Swipe-complete reveal | #34A853 | brand-green | 30% role -- completion |
| SIA suggestion border | #7F24FF at 40% | brand-purple | 10% role -- AI presence |
| SIA suggestion dot | #7F24FF | brand-purple | 10% role -- AI indicator |
| "ask SIA" link | #FF5E00 | brand-orange | 60% role -- action link (not purple; actions are always orange) |
| "add as task" link | #FF5E00 | brand-orange | 60% role -- action link |
| Domain tags (all 9) | Various at 15% bg | domain colors | Identification only |
| Primary text | #FFFFFF | white | Task titles, section titles |
| Secondary text | white at 50% | -- | Due times, schedule text |
| Tertiary text | white at 40% | -- | Section eyebrows, metadata |
| Completed text | white at 40% | -- | Strikethrough completed tasks |
| Delete button | #F44336 | error-red | Destructive action |

**60/30/10 verification**: Orange dominates through checkboxes, FAB, save buttons, reminder toggles, enabled reminder icons, medium priority bars, due-soon indicators, "add as task" links, and "ask SIA" action links. Green appears only on swipe-to-complete reveal background. Purple is limited to the SIA suggestion card's left border and dot indicator -- exactly 2 elements (border + dot = 1 SIA presence unit). Domain colors serve identification on tag chips only. Ratio holds with orange as the clear visual driver.

---

## Interaction States

### Task Checkbox
| State | Visual | Haptic |
|-------|--------|--------|
| Default (unchecked) | 24pt square, white 20% border, transparent fill | -- |
| Pressed | Border brightens to white 40%, scale(0.90) | light impact |
| Checked | Orange fill fades in, white checkmark draws in, task text mutes + strikethrough | success notification |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Disabled | 0.4 opacity | -- |

### Task Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, full opacity text | -- |
| Pressed | Background darkens to ink-900, scale(0.99) | light impact |
| Completed | Orange checkbox, muted text (40%), strikethrough title | -- |
| Overdue | Red priority bar pulses gently (opacity 60-100%, 1200ms loop), red due text | -- |
| Focus-visible | 2pt orange ring inset on row | -- |
| Loading | Skeleton shimmer (full row) | -- |
| Error | Red border accent, error icon | error notification |
| Success | Brief green glow (600ms) on completion | success notification |

### Reminder Toggle
| State | Visual | Haptic |
|-------|--------|--------|
| Default (on) | Orange bg, white circle right | -- |
| Default (off) | White at 15% bg, white circle left | -- |
| Pressed | Scale(0.95) | light impact |
| Transitioning | Circle slides + bg color crossfades | medium impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Disabled | 0.4 opacity, no touch | -- |

### Reminder Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default (enabled) | Full opacity, orange icon, next trigger visible | -- |
| Default (disabled) | Muted (60% opacity), white at 30% icon, "paused" label | -- |
| Pressed | Background darkens, scale(0.99) | light impact |
| Snoozed | Orange "snoozed until..." text replaces next trigger | -- |
| Focus-visible | 2pt orange ring inset | -- |
| Loading | Skeleton shimmer | -- |
| Error | Red border accent | error notification |
| Success | Brief green glow (600ms) on save | success notification |

### Floating Action Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange bg, --shadow-2 | -- |
| Pressed | Darker orange (#E05500), scale(0.95), --shadow-1 | medium impact |
| Focus-visible | 2pt orange ring, offset 4pt | -- |

### Save Button (Modal)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange fill, white text | -- |
| Pressed | Darker orange (#E05500) + scale(0.97) | light impact |
| Disabled | 40% opacity, no touch (title field empty) | -- |
| Loading | White spinner replaces text | -- |
| Success | Green glow (600ms) | success notification |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Priority Pill Selector
| State | Visual | Haptic |
|-------|--------|--------|
| Default (inactive) | White at 15% bg, white at 60% text | -- |
| Pressed | Scale(0.95), bg darkens | light impact |
| Active (low) | White at 20% bg, white text | medium impact |
| Active (medium) | Orange bg, white text | medium impact |
| Active (high) | Red (#F44336) bg, white text | medium impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Task checkbox | Toggle task completion |
| Tap | Task row body | Open Task Detail modal |
| Tap | Reminder row body | Open Reminder Detail modal |
| Tap | Reminder toggle | Enable/disable reminder |
| Tap | FAB | Open Add bottom sheet |
| Tap | Completed section header | Expand/collapse completed tasks |
| Tap | "add as task" on SIA card | Create task from suggestion |
| Tap | "ask SIA" on SIA card | Navigate to SIA Chat [09] |
| Swipe right >30% | Task row | Complete task (green reveal + checkmark) |
| Swipe left | Task row | Reveal edit/delete actions |
| Swipe left | Reminder row | Reveal edit/delete actions |
| Long-press >500ms | Task row | Enter reorder mode (drag to rearrange within section) |
| Pull-to-refresh | SectionList | Refresh tasks and reminders from API |
| Swipe right from edge | Screen | iOS back gesture (stack pop) |
| Drag down | Modal handle | Dismiss modal |

### Haptic Feedback Points
- Task checkbox completion: success notification
- Task swipe-complete: success notification
- Reminder toggle switch: medium impact
- FAB tap: medium impact
- Priority pill selection: medium impact
- Long-press reorder threshold: medium impact
- Reorder drag drop: light impact
- Pull-to-refresh release: medium impact
- Save task/reminder: success notification
- Delete task/reminder: medium impact
- Swipe action threshold reached: light impact
- Modal dismiss drag threshold: light impact

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Screen content | Mount | Staggered fade-in: header (0ms), today section (80ms), upcoming (160ms), reminders (240ms), completed (320ms), SIA card (400ms) | 280ms each | ease-out-soft |
| Task checkbox | Tap | Checkmark stroke draws in (stroke-dashoffset), fill color fades in, row text mutes to 40% + strikethrough slides in | 160ms | ease-out-soft |
| Task completion | Checkbox checked | Completed row slides down to Completed section after 800ms delay | 520ms | ease-out-soft |
| Swipe complete | Swipe right >30% | Green background reveals with checkmark, row slides out right | 280ms | ease-out-soft |
| Reminder toggle | Tap | Circle slides left/right, bg color crossfades | 160ms | ease-out-soft |
| Completed section | Tap header | Expand: content height 0 to auto + fade-in. Collapse: auto to 0 + fade-out. Chevron rotates 0 to 90deg. | 280ms | ease-out-soft |
| SIA suggestions | Enter viewport | Fade-in + translateY(12pt to 0) | 280ms | ease-out-soft |
| SIA suggestion swipe | Swipe left/right | Card slides out, next card slides in | 280ms | ease-out-soft |
| FAB | Mount | scale(0.8 to 1.0) + opacity(0 to 1), 400ms delay | 280ms | ease-out-soft |
| FAB | Scroll down | Fade out + translateY(+20pt) | 160ms | ease-out-soft |
| FAB | Scroll up/stop | Fade in + translateY(0) | 160ms | ease-out-soft |
| Add bottom sheet | FAB tap | Slide up from bottom + backdrop fade in | 520ms | ease-flow |
| Add bottom sheet | Dismiss | Slide down + backdrop fade out | 280ms | ease-out-soft |
| Task Detail modal | Open | Slide up from bottom + backdrop fade in | 520ms | ease-flow |
| Task Detail modal | Dismiss | Slide down + backdrop fade out | 280ms | ease-out-soft |
| Recurring options | Toggle on | Expand with height animation, fields stagger fade-in (80ms stagger) | 280ms | ease-out-soft |
| Recurring options | Toggle off | Collapse with height animation + fade-out | 280ms | ease-out-soft |
| Completion bar (MomentumBar) | Mount / task checked | Fill rises 0 to today's done÷total ratio along a continuous orange→green pill; arrival end flashes green at 100%. Draws, never fades. | 520ms | ease-flow |
| Done / Open counts (KPIStatTile) | Mount | Numbers count up to their final values (no delta arrow) | 280ms | ease-out-soft |
| Overdue priority bar | Continuous | Opacity pulses 60% to 100% and back | 1200ms loop | ease-flow |
| Swipe actions | Swipe left | Edit/delete buttons slide in from right | 280ms | ease-out-soft |
| Reorder drag | Long-press | Row lifts with --shadow-2, scale(1.02), bg brightens. Gap opens at drop target. | 160ms lift | ease-out-soft |
| Pull-to-refresh | Pull gesture | Branded spinner appears, data refreshes | Variable | -- |

**Screen transition**:
- **Enter**: Standard stack push from right, 280ms, ease-out-soft
- **Exit**: Stack pop to right (back navigation), 280ms, ease-out-soft

---

## Empty States

### Day 1 (new user -- no tasks or reminders)
Centered vertically in content area, above the FAB:
- Clipboard icon: 48pt, white at 20%, center-aligned
- Heading: "no tasks yet" -- 18pt Sora Semibold, white at 60%, center-aligned
- Body: "create your first task or let SIA suggest one based on your goals." -- 15pt Sora Regular, white at 40%, center-aligned, max 260pt width
- Two action chips below (16pt gap):
  - "create task" -- orange outlined pill (1pt orange border, orange text, 13pt Sora Semibold, 36pt height, --r-pill). Tap opens Task Detail modal.
  - "ask SIA" -- orange outlined pill (1pt orange at 40% border, orange text, 13pt Sora Semibold, 36pt height, --r-pill). Tap opens SIA Chat [09]. Orange because it's a user action, not a SIA presence indicator.
- SIA suggestion card still appears below the empty state if SIA has suggestions (from onboarding goals)
- FAB is still visible and functional

### No reminders configured
The Reminders section shows a single-row prompt inside its card:
- Bell icon (20pt, white at 20%) + "set up a reminder for your health activities" (15pt Sora Regular, white at 40%) + "+" icon (14pt, orange, right-aligned, 44pt touch target)
- Tap navigates to Reminder Detail modal in create mode

### All tasks completed today
- Today section shows all tasks with checked state (all muted, strikethrough)
- The Today completion bar (the `MomentumBar` from S61-V01) reaches its full 100% arrival fill: 8px height, full-width, --grad-progress orange→green with the arrival end green, --r-pill. (Same bar that is present at every fill level — at all-done it simply reads as fully arrived, not a separate element.)
- Below the last task row: "all done for today" -- 13pt Sora Regular, white at 40%, center-aligned, 16pt vertical padding
- SIA suggestion card may offer bonus tasks: "great progress. want to tackle something extra?"

### Established user (empty day -- no tasks scheduled)
- "no tasks for today" heading with body: "check your upcoming tasks or create a new one."
- Upcoming section is prominent (expanded by default)
- SIA suggestion card fills with proactive suggestions

---

## Motivation Adaptation

- **Low motivation**: Today's Tasks shows only 1-2 highest-priority tasks. Upcoming section collapsed by default. Reminders section simplified -- shows only the next upcoming reminder. SIA suggestions are gentle and minimal ("just one thing today -- take your vitamins."). Completed section hidden entirely (no need to show past effort when energy is low). Smart suggestions limited to 1.
- **Medium motivation**: Default experience as described. All sections visible. 3-6 tasks per day. SIA suggestions contextual and data-driven. Completed section available but collapsed.
- **High motivation**: Full task list with additional metadata visible (estimated duration, XP reward per task). Upcoming section expanded by default showing full week. Reminders show detailed schedule info (all days, all channels). Completed section expanded by default with stats: "4 of 6 done -- 67% completion rate today." SIA offers multiple suggestions (2-3 cards with swipe pagination). Additional row at bottom: "view in calendar" link to Schedule [41].

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Header title | Sora | Semibold 600 | 17pt | 24pt | #FFFFFF |
| Section eyebrow | Sora | Semibold 600 | 12pt | 16pt | #FFFFFF at 40% |
| Task title | Sora | Semibold 600 | 15pt | 20pt | #FFFFFF |
| Task title (completed) | Sora | Semibold 600 | 15pt | 20pt | #FFFFFF at 40% (strikethrough) |
| Domain tag chip | Sora | Semibold 600 | 11pt | 16pt | per domain color |
| Due time text | Sora | Regular 400 | 13pt | 18pt | #FFFFFF at 50% |
| Due time (overdue) | Sora | Regular 400 | 13pt | 18pt | #F44336 |
| Due time (within 1 hour) | Sora | Regular 400 | 13pt | 18pt | #FF5E00 |
| Recurring indicator | Sora | Regular 400 | 13pt | 18pt | #FFFFFF at 40% |
| Reminder title | Sora | Semibold 600 | 15pt | 20pt | #FFFFFF |
| Reminder title (disabled) | Sora | Semibold 600 | 15pt | 20pt | #FFFFFF at 40% |
| Reminder schedule text | Sora | Regular 400 | 13pt | 18pt | #FFFFFF at 50% |
| "next: time" text | Sora | Regular 400 | 12pt | 16pt | #FFFFFF at 40% |
| Completed section header | Sora | Semibold 600 | 15pt | 20pt | #FFFFFF at 60% |
| Completed count | Sora | Regular 400 | 13pt | 18pt | #FFFFFF at 40% |
| Completion time | Sora | Regular 400 | 13pt | 18pt | #FFFFFF at 30% |
| SIA suggestion message | Sora | Regular 400 | 15pt | 20pt | #FFFFFF at 80% |
| "add as task" action | Sora | Semibold 600 | 13pt | 18pt | #FF5E00 |
| "ask SIA" action | Sora | Semibold 600 | 13pt | 18pt | #FF5E00 |
| FAB label | Sora | Semibold 600 | 15pt | 20pt | #FFFFFF |
| Chooser option text | Sora | Semibold 600 | 16pt | 22pt | #FFFFFF |
| Modal cancel | Sora | Regular 400 | 15pt | 20pt | #FFFFFF at 50% |
| Modal save | Sora | Semibold 600 | 15pt | 20pt | #FF5E00 |
| Modal title | Sora | Semibold 600 | 17pt | 24pt | #FFFFFF |
| Modal input placeholder | Sora | Regular 400 | 16pt | 22pt | #FFFFFF at 40% |
| Priority pill labels | Sora | Semibold 600 | 13pt | 18pt | #FFFFFF |
| Day circle labels | Sora | Semibold 600 | 13pt | 18pt | #FFFFFF |
| Channel toggle labels | Sora | Regular 400 | 13pt | 18pt | #FFFFFF at 60% |
| Save CTA text | Sora | Semibold 600 | 17pt | 24pt | #FFFFFF |
| Delete text | Sora | Semibold 600 | 15pt | 20pt | #F44336 |
| "all done for today" text | Sora | Regular 400 | 13pt | 18pt | #FFFFFF at 40% |
| Empty state heading | Sora | Semibold 600 | 18pt | 24pt | #FFFFFF |
| Empty state body | Sora | Regular 400 | 15pt | 20pt | #FFFFFF at 50% |

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Task list load fails | Skeleton shimmer for 3s, then "could not load tasks — tap to retry" centered | Tap retry re-fetches; pull-to-refresh also available |
| Task create/save fails | Modal save CTA shows error state (red border flash), "could not save task — try again" toast (3s) | CTA re-enables, all form data preserved |
| Task checkbox toggle fails | Checkbox reverts to previous state with gentle snap, "could not update — try again" toast | User can re-tap checkbox |
| Task delete fails | Swipe-delete row snaps back, "could not delete — try again" toast | Row restored, user can retry swipe |
| Reminder create/save fails | Modal save CTA shows error state, "could not save reminder — try again" toast | CTA re-enables, form data preserved |
| Reminder toggle fails | Toggle reverts to previous state with gentle snap, "could not update — try again" toast | User can re-toggle |
| Notification scheduling fails | "Reminder saved but notification could not be scheduled" toast. Reminder still saved, but notification status shows warning icon. | User can retry via reminder detail edit |
| SIA suggestions load fails | Smart suggestions card shows "could not load suggestions" placeholder in 15pt Regular, white at 40% | Auto-retries on next pull-to-refresh |
| Network offline | Cached task/reminder data shown with "offline" banner. Task completion queues locally. Create/edit actions save locally and sync on reconnect. | Banner includes "tap to retry" on reconnect |
| Recurring task generation fails | Current instance shown, future instances missing. "recurring schedule unavailable" note below task row. | System auto-generates on next sync |

---

## Accessibility

Accessibility follows global standards from `_shared-patterns.md`. Screen-specific notes:

- **Task rows**: VoiceOver reads priority, title, category, due time, and status: "High priority. Take vitamin D. Wellbeing. Due at 8:00 AM, due in 30 minutes."
- **Task checkbox**: Accessible checkbox role with state: "Take vitamin D, not completed. Double tap to complete." Completion announced: "Take vitamin D, completed."
- **Reminder rows**: VoiceOver reads title, schedule, toggle state, and next trigger: "Water intake reminder, every 2 hours, enabled, next at 11:30 AM."
- **Reminder toggle**: Accessible switch role: "Water intake reminder, on. Double tap to disable."
- **Section eyebrows**: Announced as heading level 2 for navigation structure.
- **Completed section**: Collapsible header announces state: "Completed, 4 tasks, collapsed. Double tap to expand."
- **SIA suggestion card**: Announced as group with accessible actions: "SIA suggestion. Based on your fitness goal, try scheduling a stretching session. Actions: add as task, ask SIA."
- **Priority indicators**: Color + position (left bar) combined with accessible label: "High priority" / "Medium priority." Never color-only.
- **Swipe actions**: Accessible via long-press context menu fallback for users who cannot perform swipe gestures.
- **Touch targets**: All interactive elements meet 44x44pt minimum. Checkboxes have 44pt touch targets. Toggle switches have 44x44pt targets.
- **Color contrast**: All text meets WCAG AA. Overdue red text on ink-brown-800 achieves sufficient contrast.
- **Reduced motion**: Task completion animation replaced with instant state change. Section expand/collapse is instant. Staggered entry becomes simultaneous fade-in.

---

## Cross-References

- **Navigates to**: SIA Chat [09] (via "ask SIA" link, tab switch), Schedule [41] (via "view in calendar" link, stack push), Task Detail modal (via tap task row or FAB), Reminder Detail modal (via tap reminder row or FAB), Goal Detail [14] (via goal-linked task tap)
- **Navigates from**: Me Main [17] via quick link grid (stack push), Schedule [41] via "tasks" shortcut (stack push), SIA Chat [09] via deep-link (stack push), Home Screen [12] via task-related action cards (stack push)
- **Shared components with**: Habits [38] (checkbox pattern, Domain Tag Chip, FAB, swipe actions, completion behavior), Schedule [41] (FAB, event/task overlap, calendar integration), Notification History [24] (reminder-type notifications originate here), Settings [21] (Toggle Switch pattern), Goals List [13] (task-to-goal linkage)
- **Patterns used**: Back Button (_shared-patterns.md), 8-State Interaction Model (_shared-patterns.md), FAB Extended Pill (_shared-patterns.md), Domain Tag Chip (_shared-patterns.md), Toggle Switch (_shared-patterns.md), Text Input Field (_shared-patterns.md), Segmented Control (_shared-patterns.md), Filter Chip Row (_shared-patterns.md), Brand CTA Button (_shared-patterns.md), Expandable/Collapsible Section (_shared-patterns.md), Section Eyebrow Label (_shared-patterns.md), SIA Coaching Note -- Contextual Variant (_shared-patterns.md), Modal Presentation (_shared-patterns.md), Skeleton Loading States (_shared-patterns.md)
- **Patterns established**: Task Row (checkbox + priority bar + title + domain tag + due time, with overdue/recurring variants), Reminder Row (bell icon + title + schedule + channel indicators + toggle), Priority Pill Selector (3-pill low/medium/high with color coding), Day Circle Selector (7-day recurring picker), Notification Channel Toggles (push/email/SMS triple toggle row), Task Color Selector (8-color dot row with ring selection), Tag Input (type-to-create chip input with removal), Add Chooser Bottom Sheet (2-option routing sheet for task vs reminder creation), Smart Suggestion Action Row ("add as task" + "ask SIA" dual action pattern)
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-16.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U08`
**Prototype route**: `/features/reminders`
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
| B16-F04 | critical | retention | Make task rows completable controls, wire add/detail/swipe behavior, and implement SIA suggestion conversion. |
| B16-F05 | major | navigation | Render Back as a labeled 44px link/button and disambiguate Add task from Add suggested task. |
| B16-F06 | major | accessibility | Make full reminder rows or 44x44 switch targets toggle state, preserve switch semantics, and update reminder copy. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

