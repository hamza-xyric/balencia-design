# Screen Design: Schedule / Calendar

**Screen**: 41 of 73
**File**: 41-schedule-calendar.md
**Register**: Product Mode
**Primary action**: view today's schedule
**Tab**: Today (when pushed from Home schedule preview) / Me (when pushed from Explore)
**Navigation**: Stack depth 1-2 from tab root. Entry from Home schedule preview, Explore section, SIA deep-links. Exit to event detail, domain dashboards, Connected Services.

---

## Purpose

The Schedule / Calendar is the user's time-based planning view — a single place to see all events, SIA-scheduled actions, and unscheduled tasks laid out across a day, week, or month. It bridges Google Calendar events with SIA's AI-generated action suggestions, domain-color-coded so the user can see which life areas fill their time. The primary job is to answer: "what does my day look like, and what should I do when?"

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. View switcher (day / week / month) — orients the user in time
2. Current day header with date and "today" indicator
3. Time-slot grid with events and actions — the core content
4. SIA scheduling suggestion (dashed-outline card in a suggested time slot)
5. Unscheduled tasks area — actions not yet placed in time
6. Quick-add button — floating action to create a new event

**User flow**:
- **Arrives from**: Home Screen (12) via schedule preview tap (stack push), Explore Section (18) via calendar module card (stack push), SIA Chat (09) via deep-link card (stack push to Today tab), any domain dashboard via "view in calendar" link
- **Primary exit**: Tap event → event detail or relevant domain screen (stack push)
- **Secondary exits**: Back to previous screen (stack pop), Connected Services (22) via "connect calendar" CTA, SIA Chat (09) via SIA suggestion tap

---

## Layout

**Scroll behavior**: ScrollView (day view — vertical scroll through time slots), FlatList (week/month views — vertical scroll through days)
**Tab bar visible**: Yes

### ASCII Wireframe — Day View (Default)

```
┌─────────────────────────────┐
│  Status Bar (44pt)          │
├─────────────────────────────┤
│  ◀ Schedule         [+]    │  ← Header: 48pt
├─────────────────────────────┤
│  [ day ][ week ][ month ]   │  ← View Switcher: 40pt
├─────────────────────────────┤
│  ◀  Tue, May 20, 2026  ▶   │  ← Date Nav: 40pt
├─────────────────────────────┤
│  ┌─ Unscheduled (2) ──────┐│
│  │ ☐ Read 20min  📘       ││  ← Unscheduled
│  │ ☐ Log expenses 💰      ││     Area: ~88pt
│  └─────────────────────────┘│
├ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┤
│  6 AM ─────────────────     │
│  7 AM ── ┌─────────────┐   │
│          │ Morning run  │   │  ← Synced event
│          │ 🔴 Fitness   │   │     (solid card)
│  8 AM ── └─────────────┘   │
│  9 AM ── ┌ ─ ─ ─ ─ ─ ─ ┐  │
│          ╎ Meditate 15m ╎   │  ← SIA-suggested
│          ╎ 🟣 Spirit.   ╎   │     (dashed card)
│ 10 AM ── └ ─ ─ ─ ─ ─ ─ ┘  │
│ 11 AM ── ┌─────────────┐   │
│          │ Team standup │   │  ← Google Cal
│          │ 🔵 Career    │   │     event
│ 12 PM ── └─────────────┘   │
│  1 PM ─────────────────     │
│  ... (scrollable)           │
├─────────────────────────────┤
│ [ Today ][ SIA ][ Goals ][ Me ] │ ← Tab Bar: 56pt
└─────────────────────────────┘
```

### ASCII Wireframe — Week View

```
┌─────────────────────────────┐
│  Status Bar (44pt)          │
├─────────────────────────────┤
│  ◀ Schedule         [+]    │
├─────────────────────────────┤
│  [ day ][ week ][ month ]   │
├─────────────────────────────┤
│  May 18 – May 24, 2026     │
├─────────────────────────────┤
│  M   T   W   T   F   S   S │
│ 18  19 (20) 21  22  23  24 │  ← Day selector row
├─────────────────────────────┤
│  ┌──────────────────────┐   │
│  │ 7:00  Morning run 🔴 │   │
│  │ 9:00  Meditate    🟣 │   │  ← Selected day's
│  │ 11:00 Team standup🔵 │   │     events list
│  │ 2:00  Meal prep   🟢 │   │
│  │ 6:00  Gym session 🔴 │   │
│  └──────────────────────┘   │
│                             │
│  Unscheduled (2)            │
│  ☐ Read 20min  📘          │
│  ☐ Log expenses 💰         │
├─────────────────────────────┤
│ [ Today ][ SIA ][ Goals ][ Me ] │
└─────────────────────────────┘
```

### ASCII Wireframe — Month View

```
┌─────────────────────────────┐
│  Status Bar (44pt)          │
├─────────────────────────────┤
│  ◀ Schedule         [+]    │
├─────────────────────────────┤
│  [ day ][ week ][ month ]   │
├─────────────────────────────┤
│       ◀  May 2026  ▶       │
├─────────────────────────────┤
│  M   T   W   T   F   S   S │
│                 1   2   3   │
│  4   5   6   7   8   9  10 │
│ 11  12  13  14  15  16  17 │  ← Calendar grid
│ 18  19 •20• 21  22  23  24 │     with dot
│ 25  26  27  28  29  30  31 │     indicators
├─────────────────────────────┤
│  Tue, May 20 — 5 events     │
│  ┌──────────────────────┐   │
│  │ 7:00  Morning run 🔴 │   │  ← Selected day
│  │ 9:00  Meditate    🟣 │   │     preview
│  │ 11:00 Team standup🔵 │   │
│  └──────────────────────┘   │
├─────────────────────────────┤
│ [ Today ][ SIA ][ Goals ][ Me ] │
└─────────────────────────────┘
```

### Component Stack — Day View (top to bottom)

1. **Navigation Header** — 48pt
   - Purpose: Screen title + quick-add button
   - Content: Back chevron (left), "Schedule" title (center, 17pt Sora Semibold), "+" add button (right, 44x44pt)

2. **View Switcher** — 40pt
   - Purpose: Toggle between day, week, and month views
   - Content: 3-segment control ("day" / "week" / "month"), sentence case, pill shape

3. **Date Navigator** — 40pt
   - Purpose: Navigate forward/backward in time
   - Content: Left/right chevrons (44x44pt each), current date label (center, 16pt Sora Semibold), "today" dot indicator if viewing today

4. **Unscheduled Tasks Section** — variable (~88pt with 2 tasks, collapsible)
   - Purpose: Show SIA-generated actions not yet placed in a time slot
   - Content: Section header "unscheduled (N)", collapsible, task rows with checkbox + name + domain tag chip

5. **Time Slot Grid** — fills remaining space (scrollable)
   - Purpose: Display the day's timeline with events placed at their times
   - Content: Hour markers (left, 13pt Sora Regular, white at 40%), event cards placed at corresponding time slots, empty time slots as open space

6. **Floating Add Button** — 56pt diameter, fixed position
   - Purpose: Quick-add event or task
   - Content: "+" icon (24pt), Burnt Orange background, positioned bottom-right (16pt from right edge, 16pt above tab bar)

---

## Components

### Navigation Header
- **Purpose**: Screen identification and primary action
- **Data source**: Static
- **Visual treatment**: Transparent background, blends with ink-900. Back chevron white, title center-aligned, add button right-aligned
- **Variants**: With back button (pushed from another screen), without back button (root of stack)
- **Gestures**: Back chevron tap (stack pop), add button tap (modal: create event)
- **Size**: Full-width x 48pt

### View Switcher (Segmented Control)
- **Purpose**: Toggle between day/week/month views
- **Data source**: Local state
- **Visual treatment**: ink-brown-800 background, --r-pill corners. Active segment: Burnt Orange fill, white text, 15pt Sora Semibold. Inactive segments: transparent, white at 60%, 15pt Sora Regular. 16pt horizontal margins.
- **Variants**: None
- **Gestures**: Tap to switch segment
- **Size**: Full-width minus 32pt (16pt margins) x 36pt

### Date Navigator
- **Purpose**: Move through dates
- **Data source**: Local state (selected date)
- **Visual treatment**: Left/right chevron arrows (white, 20pt), date label centered (16pt Sora Semibold, white). If viewing today, small orange dot (6pt) below the date text. Horizontal layout.
- **Variants**: Single date "Tue, May 20, 2026" (day view), range "May 18 – 24, 2026" (week view), month "May 2026" (month view)
- **Gestures**: Tap left/right arrows to navigate, swipe left/right on the grid also navigates
- **Size**: Full-width x 40pt

### Unscheduled Tasks Section
- **Purpose**: Surface SIA-generated actions that need to be placed in the schedule
- **Data source**: API — unscheduled actions from SIA's daily plan
- **Visual treatment**: Section header with count badge. Collapsible (chevron rotates). Each task row: 44pt height, checkbox (20pt, white outline, Burnt Orange fill when checked), task name (15pt Sora Regular, white), domain tag chip (right-aligned). Subtle top border (1pt, white at 8%) separates from date navigator.
- **Variants**: Collapsed (just header + count), expanded (header + task rows), empty (section hidden)
- **Gestures**: Tap header to expand/collapse, tap checkbox to complete task, long-press task to drag into a time slot, swipe right to complete
- **Size**: Full-width, variable height (44pt header + 44pt per task row)

### Event Card — Synced (Google Calendar)
- **Purpose**: Display a synced calendar event
- **Data source**: API — Google Calendar sync via Connected Services
- **Visual treatment**: Solid ink-brown-800 background, 1pt border white at 10%, --r-md (14pt) corners. Left edge: 3pt domain color accent bar (full height of card). Content: event title (15pt Sora Semibold, white), time range (13pt Sora Regular, white at 60%), domain tag chip (bottom-right). Google Calendar icon indicator (12pt, bottom-left, white at 40%).
- **Variants**: Short event (< 30min, single line), standard event (30min-2hr), long event (> 2hr, expanded height)
- **Gestures**: Tap to view event detail (push to relevant domain screen or generic event detail)
- **Size**: Full-width minus 64pt (48pt left for time labels, 16pt right margin), height proportional to duration (minimum 44pt)

### Event Card — SIA-Suggested
- **Purpose**: Display an AI-suggested action placed in a recommended time slot
- **Data source**: API — SIA's scheduling suggestions
- **Visual treatment**: Transparent background with 1pt **dashed** border (Burnt Orange at 40%), --r-md corners. Content same as synced card but with SIA indicator: small purple dot (8pt) next to title. "SIA suggested" eyebrow label (12pt Sora Semibold, purple at 60%, uppercase).
- **Variants**: Pending (dashed border, not yet accepted), accepted (converts to solid card style)
- **Gestures**: Tap to accept and convert to scheduled event, swipe left to dismiss suggestion, long-press for options (reschedule, skip, ask SIA why)
- **Size**: Same sizing rules as synced event cards

### Event Card — Manual
- **Purpose**: Display a user-created event
- **Data source**: Local + API — user-created events
- **Visual treatment**: Same as synced event card but without Google Calendar icon. Uses the same solid ink-brown-800 style with domain color accent bar.
- **Variants**: Same as synced
- **Gestures**: Tap for detail, long-press for quick actions (edit, delete, reschedule)
- **Size**: Same as synced event cards

### Time Slot Grid
- **Purpose**: The vertical time axis showing 24 hours
- **Data source**: Composite — events from all sources laid onto time slots
- **Visual treatment**: Hour markers at left edge (13pt Sora Regular, white at 30%), thin horizontal rule per hour (1pt, white at 5%). Current time indicator: horizontal line (2pt, Burnt Orange, full width) with small orange circle (8pt) at left edge. Empty time slots are blank (ink-900 background showing through).
- **Variants**: Compact (15min slots collapsed when empty), expanded (all hours visible)
- **Gestures**: Scroll vertically through time, tap empty slot to create event at that time, long-press empty slot to create event with time pre-filled
- **Size**: Full-width, ~1440pt total height (60pt per hour x 24 hours), scrollable

### Week Day Selector Row
- **Purpose**: Show the 7 days of the selected week with selection state (week view only)
- **Data source**: Derived from selected week
- **Visual treatment**: 7 equal-width columns. Each column: day abbreviation (12pt Sora Regular, white at 50%) above date number (16pt Sora Semibold, white). Selected day: orange circle (36pt) behind date number. Today indicator: small orange dot (6pt) below date number. Days with events: small domain-colored dots (4pt each, max 3 visible) below the date.
- **Variants**: Current week (today highlighted), past/future weeks
- **Gestures**: Tap day to select and show its events below
- **Size**: Full-width x 64pt

### Month Calendar Grid
- **Purpose**: Show the full month with event density indicators (month view only)
- **Data source**: API — event counts per day
- **Visual treatment**: Standard 7-column calendar grid. Day numbers: 15pt Sora Regular, white. Today: orange circle background. Selected day: orange outline circle. Days with events: 1-3 small dots below the number (domain colors of the day's events, 4pt diameter, 4pt spacing). Past days: white at 40%. Weekday headers: 12pt Sora Semibold, white at 50%, uppercase single letter.
- **Variants**: Current month, past/future months
- **Gestures**: Tap day to select and show preview below, swipe left/right to change month
- **Size**: Full-width, ~280pt (7 rows x 40pt per row)

### Day Events Preview (Month View)
- **Purpose**: Show events for the selected day in month view
- **Data source**: API — events for selected date
- **Visual treatment**: Section below calendar grid. Date heading (15pt Sora Semibold, white) + event count. Compact event list: each row shows time (13pt, white at 50%), event name (15pt, white), domain tag chip. Separated by 1pt rules at white 5%.
- **Variants**: Has events, no events ("nothing scheduled" with subtle illustration)
- **Gestures**: Tap event row to navigate to detail, tap "view full day" to switch to day view for that date
- **Size**: Full-width, variable height

### Sync Status Indicator
- **Purpose**: Show Google Calendar sync state so the user knows data is fresh
- **Data source**: API — `GET /api/calendar/sync/status` (last sync timestamp, sync state)
- **Visual treatment**: Positioned in the Navigation Header, left of the "+" button. Small cloud icon (16pt) with sync state:
  - **Synced**: cloud icon white at 40%, "synced 2m ago" label (11pt Sora Regular, white at 30%) — fades after 3 seconds, leaving just the icon
  - **Syncing**: cloud icon white at 60% with rotating arrows animation (continuous, 1200ms loop)
  - **Error**: cloud icon with exclamation, red at 60% (#EF4444), tap to retry
  - **Not connected**: hidden (Connect Calendar Card shows instead)
- **Variants**: Synced, syncing, error, not connected (hidden)
- **Gestures**: Tap when synced/syncing → Connected Services [22]. Tap when error → retry sync.
- **Size**: icon 16pt + optional label, 44pt touch target

### Schedule Templates Section
- **Purpose**: Pre-built daily routine templates the user can apply to fill time slots quickly
- **Data source**: API — `GET /api/schedule/templates` (user-created + SIA-suggested templates)
- **Visual treatment**: Appears below the Unscheduled Tasks Section when the day is mostly empty (< 3 events). Collapsible section.
  - Section header: "templates" — 12pt Sora Semibold, white at 40%, uppercase, +0.12em tracking. Chevron for expand/collapse.
  - Template cards in horizontal scroll:
    - Card: 120pt wide × 64pt tall, ink-brown-800 bg, --r-md corners, 1pt border white at 8%, 12pt padding
    - Icon (20pt, white at 50%) + template name (13pt Sora Semibold, white) + event count (11pt Sora Regular, white at 40%, e.g., "5 events")
    - Cards: "morning routine", "work day", "evening wind-down", "weekend", "custom" + create new card (dashed border, "+" icon)
  - Card spacing: 8pt
  - Horizontal padding: 16pt
- **Variants**: Has templates (horizontal scroll), no templates (single "create a template" card), SIA-suggested template (purple dot indicator)
- **Gestures**: Tap template → preview overlay showing the events it would add, with "apply to today" CTA. Tap "+" card → create template modal. Long-press → edit/delete template.
- **Size**: Full-width x ~96pt (header 24pt + 8pt gap + 64pt cards)

### Floating Add Button (FAB)
- **Purpose**: Quick-create an event or task
- **Data source**: None
- **Visual treatment**: 56pt diameter circle, Burnt Orange fill, white "+" icon (24pt, 2pt stroke). Warm shadow (--shadow-2). Positioned 16pt from right edge, 16pt above tab bar.
- **Variants**: None
- **Gestures**: Tap to open create event modal
- **Size**: 56x56pt

### Connect Calendar Card (Empty State)
- **Purpose**: Prompt user to connect Google Calendar when no calendar is synced
- **Data source**: API — connected services status
- **Visual treatment**: Full-width card, ink-brown-800 background, --r-xl corners, 24pt padding. Google Calendar icon (32pt, full color) centered above heading. Heading: "connect your calendar" (18pt Sora Semibold, white). Body: "sync your Google Calendar to see all your events alongside SIA's suggestions." (15pt Sora Regular, white at 70%). CTA button: "connect Google Calendar" (Brand CTA Button pattern, full-width). 24pt vertical spacing between elements.
- **Variants**: Not connected (default), connecting (loading state), connected (card disappears)
- **Gestures**: Tap CTA to initiate Google Calendar OAuth flow (navigates to Connected Services)
- **Size**: Full-width minus 32pt (16pt margins), ~200pt height

---

## Visualization

> Source: no companion file; audited in `viz-audit/` — Batch (Tracker B), findings `S41-V01..S41-V04`. All primitives are from `viz-audit/VIZ-KIT.md` at `viz-audit/CONSISTENCY.md` parameters. Premium-depth, on-brand (60/30/10), **Product Mode → orange-dominant accent** (domain colours stay an *identity* accent on event accent-bars + tag chips + day-split slices only — never recoloured to alarm states). Benchmark = **Fantastical + Things** (agenda density, the day-as-a-track) rendered **the Balencia way** (drawn progress path + warm glow), not as a clone. **Current grade C (66) → specced-target A− (85).** *(Honest re-grade under the revised 10-dimension rubric; the residual gap to A+++ is build-verified depth on the drawn path + the un-built `TimelineAgenda` primitive, owned by the later viz-build program.)*

This is a **calm, agenda-first Tracker B screen — premium ≠ maximal here.** The screen's job (per Purpose) is "what does my day look like, and what should I do when," plus the sub-question "which life areas fill my time." Today the day view renders as an absolute-positioned event-card grid on a 6 AM–7 PM hour ruler with a 2pt orange current-time line — a *functional* agenda but **not** a Balencia signature: there is no drawn progress path tracing reached → now → upcoming, the only "density" signal in month view is **three hardcoded domain dots on a single demo day** (`aria-hidden`, domain-colour-alone, and decorative — not real per-day counts: a 1.4.11 + colour-alone + non-data-chart triple miss), and the screen never answers the "which life areas fill my time" question with any visual. This section upgrades *how the day reads* — the agenda becomes a **`TimelineAgenda` (VK-014)** whose single drawn path runs orange→green through the day, month density becomes a real **`CalendarHeatmap`**, and the day's domain split becomes a small **`Donut`** — **without** displacing the time-slot grid, which remains the interactive scheduling surface. Mints **no** new primitive; it retires kit backlog (`TimelineAgenda`, `CalendarHeatmap`, `Donut`). Editorial restraint: dates, times, event names, sync labels, view-switcher and templates stay clean text/iconography — they have no useful visual form and are *deliberately textual*.

### Visualized-vs-text map

| Datum (shown / implied) | Today | Specced visual | Primitive |
|---|---|---|---|
| Day agenda — events as a reached/now/upcoming **sequence** along the day | absolute event cards on an hour ruler; flat, no progress path | **day `TimelineAgenda`** — one drawn path orange (past, done) → green (completed) with the current/next node as the single `--glow-orange-sm` pulse; domain-coloured node identity | `TimelineAgenda` (`VK-014`) |
| Per-day **event density** across the month (the "how full is each day" signal) | **3 hardcoded domain dots on one demo day only** (decorative, `aria-hidden`, colour-alone) | **month `CalendarHeatmap`** — 5 intensity steps by real per-day event count; today = dashed border; tap selects the day | `CalendarHeatmap` |
| **Domain split of the day** — "which life areas fill my time" (Purpose) | not shown anywhere | small **`Donut`** — share of *scheduled minutes* by domain, hub = total scheduled hours | `Donut / Pie` (`VK-007`) |
| **Day fullness / balance** (scheduled vs open time) | not shown | thin **`MomentumBar`** — scheduled-time share of the waking window (continuous orange→green, non-shaming) | `MomentumBar` (`VK-004`) |
| Current-time indicator (2pt orange line) | orange line + dot | **kept as-is** inside the time grid (already correct: orange = current moment) | — (kept) |
| 7-day week-selector domain dots (week view) | up-to-3 domain dots under each date | kept as a lightweight at-a-glance density cue (≤3 dots = identity, **+ a visible count glyph** for colour-alone fix); not redundant with the month heatmap | — (deliberately iconographic, a11y-fixed) |
| Event title / time range / source / sync label / date / view switcher / templates | text / chips / icons | — (deliberately textual — one-off scalars/labels with no useful visual form) | — |

**Editorial hierarchy (calm, not maximal):** the **day `TimelineAgenda` is the one viz hero** in day view (and the time-slot grid stays the interactive scheduling surface beneath/around it); the month `CalendarHeatmap` is the hero of month view; the day-split `Donut` + fullness `MomentumBar` are a single secondary "day at a glance" summary strip directly under the date navigator. Four visuals total, one focal per view — not a wall of charts on a calendar.

### 1 · Day agenda timeline — `S41-V01` → `TimelineAgenda` (`VK-014`)

The day view's event sequence is rendered as the **vertical `TimelineAgenda`** (the day-agenda consumer the primitive was minted for): a single **drawn** `--stroke-base` 4px round-capped path (§8) threading the day's nodes top→bottom; the **reached segment** (events before *now*, completed) runs `--grad-progress` **(mint)** orange→green, the **unreached segment** (later today) is `--color-alpha-white-08`, and the boundary sits at the **current/next node** — the eye traces a literal path through the day. **Node encoding (token-backed):** done/past event = filled `--color-forest-green` + white check; current/next event = `--color-brand-orange` 2px ring + `--glow-orange-sm` (~12px **mint**) pulse — the single focal accent; upcoming event = `--color-alpha-white-10` fill + dot glyph at `--color-alpha-white-30`; **a SIA-suggested action's node is `--color-royal-purple`** (the one sanctioned purple — these are SIA-scheduled, §11), word-labelled "SIA suggested," **never** dashed-as-error. Each node carries a small **domain-colour ring** as *identity only* (fitness-red, career-indigo, etc.) — never recoloured to a status. Row anatomy reuses the existing card content: event title · time-range caption (`white/40`) · domain tag chip · optional trailing **XP** value (green when earned, `white/30` upcoming, tabular-nums — sourced from `event.xp`).
- **Why a drawn path, not the bare hour-ruler grid:** "every chart is the line" (§8) — the day-as-a-drawn-path is the device Fantastical/Things structurally don't have; it makes the agenda unmistakably Balencia and reads as one family with the home sparklines and `TrendChart`. The hour-ruler time-slot grid **remains** as the long-press/tap-to-create scheduling layer; the TimelineAgenda is the *reading* layer over the same `schedule` events.
- **Non-shaming (ethical core):** upcoming nodes are **invitations** ("next: Meditate 15m at 9:00"), never "you haven't done…"; the path **never turns red or visibly breaks**; a missed/overdue event is a muted glyph + neutral caption ("missed — reschedule?"), **never** an alarm-red node or a loss-aversion countdown.
- **Depth / brand:** the path *is* the depth cue (no `--track-inset`); the only glow is `--glow-orange-sm` on the single current/next node (never 32px on a 24pt node). Orange = current node + reached-path effort; green = done nodes + arrival segment + earned XP; purple = SIA-scheduled nodes only; domain = node-ring identity only.
- **Micro-interaction:** tap a node → existing event-detail sheet (mark done / open domain); long-press → quick actions (reschedule/skip), preserving the spec's gesture map.
- **States:** **empty day** → first/next node pulses "next" with the existing "clear day ahead — want me to suggest some actions?" SIA card, the rest of the path `white/08` (aspirational, never empty/red); **partial** → path splits at the current node; **all done** → full orange→green path + a calm completion cap (no confetti pressure); **loading** → node skeletons + path draws in; **error** → "couldn't load your schedule" + retry, cached reached nodes preserved.
- **Data:** `data/mock.ts` → `schedule` (each event's `startHour`/`startMinute`/`durationMinutes`/`domain`/`source`/`xp` already present); "now" = the screen's current-time anchor.

### 2 · Month density heatmap — `S41-V02` → `CalendarHeatmap`

Replace the **decorative 3-dot demo-day hack** in Month View with a real **`CalendarHeatmap`** (deployed component — reuse as-is) over the month grid: **5 intensity steps** (`--color-alpha-white-05` → fuller warm orange tint) keyed to **real per-day event count**, **today = dashed border**, tap = `scale-110` to select-and-preview the day. This makes "how full is each day" legible at a glance instead of an undifferentiated number grid with one fake-decorated cell.
- **Honesty (non-negotiable):** a **0-event day = the lightest step (`--color-alpha-white-05`)**, visually distinct from an **un-synced / out-of-range day** (ghosted/dashed) — no-data ≠ a real empty day; intensity encodes *count*, never a value-judgement.
- **Brand:** the warm-orange ramp is the *data* ink (count intensity); the existing selected/today orange circle stays as the *selection* cue layered on top; **domain colours leave the month grid entirely** (they live on the day TimelineAgenda nodes + the Donut where identity is meaningful) — this retires the colour-alone month dots.
- **Non-shaming:** an empty day reads as "open time," never a guilt cell; no streak/loss-aversion framing on the calendar.
- **Micro-interaction:** tap a cell → the existing Day-Events-Preview below the grid; the selected day's `TimelineAgenda` is reachable via "view full day."
- **States:** cold-start / no events logged → uniform lightest grid + "your month fills in as you schedule" (today dashed), never a wall of red-absence; loading → cells shimmer in place; partial-sync → out-of-range days ghosted.
- **Data:** `data/mock.ts` → a `scheduleMonthDensity` map (date → event count) added so the ramp is real, not the current single hardcoded demo day.

### 3 · Day-at-a-glance summary — `S41-V03` → `Donut` (`VK-007`) + `S41-V04` → `MomentumBar` (`VK-004`)

A single secondary summary strip directly under the Date Navigator (day view) answers the Purpose's "which life areas fill my time" + "how full is today":
- **`S41-V03` · Domain-split `Donut`** (card ~96px, no hub-swamping glow): share of **scheduled minutes by domain** for the day, hub value = **total scheduled hours** (e.g. "3.5h" + sub-label "scheduled"). **Honest whole (RUBRIC dim 5):** slices sum to the *true* total of scheduled minutes the user can name — a 0-minute domain is **omitted**, never a zero-width wedge; remaining **open/unscheduled** time is **not** a phantom slice — it is shown only as hub context ("3.5h of a 16h day"), never a fabricated composition slice. **Slice colours = `--color-domain-*` identity** (this is the one place each slice *is* a domain — fitness-red, career-indigo, meditation-violet), **2px gap**, consistent inner radius; **never rainbow-arbitrary, never purple** unless the slice is a SIA-scheduled block. Largest slice carries `--glow-orange-sm` only if ≥48px. Arcs **draw themselves** clockwise largest→smallest; hub counts up.
- **`S41-V04` · Day-fullness `MomentumBar`** (8px, beside/under the donut): a **single continuous** `--grad-progress` orange→green bar (radius-pill, **not** segments) showing **scheduled-time share of the waking window** (e.g. 3.5h of ~16h). **Non-shaming (RUBRIC dim 6):** frames the day as "room to breathe," never "you've only filled X%"; a near-empty day is calm open space, not a deficiency; an over-packed day caps the fill + surfaces a gentle "a full one — protect some recovery" caption (constructive, never alarm-red).
- **Brand:** orange dominates (momentum fill, donut largest-slice tendency); green = arrival/in-range end of the bar; domain colours = donut slice identity only; purple only for a SIA-scheduled slice/node.
- **A11y:** donut `aria-label` enumerates every slice "Career 38%, fitness 24%, meditation 8% of 3.5 scheduled hours"; momentum bar states "3.5 of ~16 waking hours scheduled"; both have a **visible** legend/caption (never colour-alone).
- **States:** empty day → donut = ghosted full-ring outline + hub "nothing scheduled yet — tap + or accept a SIA suggestion" (never a collapsed disc / 100%-of-one slice), momentum bar at 0 with calm "clear day" copy; loading → ring + bar skeletons that draw into real arcs/fill; partial → logged slices + ghosted remainder context.
- **Data:** `data/mock.ts` → derive from `schedule` (`durationMinutes` × `domain`) for the donut; scheduled-minutes ÷ waking-window for the bar.

### Motion choreography (entrance — draw-first order)

Per `CONSISTENCY.md`: **the hero draws first** — in **day view** the `TimelineAgenda` **path draws itself** top→bottom (`stroke-draw`, `--dur-flow` 1200ms `--ease-flow`), reached orange→green drawing before the unreached `white/08` segment, nodes settling (0.8→1, 280ms) as the path reaches each, the current/next node's `--glow-orange-sm` pulse looping 2s after settle — **never opacity-fades** (§8). The day-at-a-glance strip animates next: the **Donut arcs sweep** clockwise largest→smallest (`stroke-draw`, hub counts up 520ms) → the **`MomentumBar` fills** 0→share (`--dur-slow` 520ms `--ease-flow`). In **month view** the `CalendarHeatmap` cells stagger in (scroll-into-view). One line motif per surface (the TimelineAgenda path is the only full Living-Line per view). Below-fold visuals animate on **scroll-into-view**. `prefers-reduced-motion` → every chart at final state instantly: TimelineAgenda full path + settled nodes (pulse off), donut arcs at rest, momentum bar at final width, heatmap at final intensity — signature static forms preserved.

### States, brand & accessibility

- **States (all designed, per RUBRIC dim 7):** **cold-start / Day-1 (no calendar connected)** — the existing **Connect Calendar Card** stays the primary CTA; the TimelineAgenda still draws any SIA-suggested unscheduled actions as a "next" node path (aspirational, not empty/red), the day-split donut is a ghosted outline with a "nothing scheduled yet" hub, the month heatmap is a uniform lightest grid ("your month fills in as you schedule"); **loading** — depth-preserving skeletons that *morph* into drawn data (path draws in, arcs/cells shimmer-then-draw — never blank discs/boxes); **partial** — un-synced events ghosted/dashed and visually distinct from a real empty slot; out-of-range month days ghosted vs a true lightest 0-event cell; **error** — chart-specific honesty (TimelineAgenda "couldn't load your schedule" with cached reached nodes preserved + retry; sync failure handled by the existing Sync Status Indicator — note: render that status with a **visible glyph + label**, not red-colour-alone) per the Error Handling table.
- **60/30/10:** **orange dominates** data ink (TimelineAgenda current node + reached-path effort, momentum-bar fill, heatmap count ramp, current-time line, donut largest-slice tendency); **green** = arrival/completion only (done nodes, reached-arrival path segment, earned-XP values, the in-range end of the momentum bar); **purple stays SIA-only** — confined to **SIA-suggested nodes/slices** (these *are* SIA-scheduled, §11 — correct, not a violation) plus the existing "SIA suggested" eyebrow; **domain colours are confined to identity** (TimelineAgenda node rings, event accent bars, tag chips, day-split donut slices, ≤3 week-selector dots) — **never** recoloured to a status, never on a CTA/eyebrow/generic series, and **removed from the month grid** (retiring the colour-alone month dots). Glow uses the size-stepped scale (`--glow-orange-sm` on the single current node + ≥48px donut largest slice only; bars/heatmap/path = none) — warm depth, never neon.
- **Accessibility:** every timeline/heatmap/donut/bar carries a text/`aria-label` equivalent conveying the same value (TimelineAgenda summary "3 of 5 events done, next: Meditate 15m at 9:00"; each node `role="listitem"`/`button` "[title], [status], [XP], [time]"; heatmap cell "[date], [N] events"; donut enumerates slices; momentum bar states scheduled-vs-waking hours); **status is always word + visible glyph** (✓ done / ring "next" / dot upcoming / "SIA suggested" label) — **never colour-alone** (this fixes the current `aria-hidden` colour-only month dots and adds a count glyph to the week-selector dots); label/value contrast ≥ 4.5:1 on `#0A0A0F`/`#211008`; **WCAG 1.4.11** — the TimelineAgenda path stroke + node fills + reached/unreached boundary, heatmap load-bearing cell tints, donut slice arcs/boundaries, and momentum fill all meet ≥3:1 vs background (the `white/08` unreached track + `white/5` hour rules are decorative-only, exempt); interactive chart targets ≥ 44×44pt (nodes, cells, donut wedges); `prefers-reduced-motion` renders all at final state with signature static forms preserved.

Conform to `viz-audit/CONSISTENCY.md`.

---

## Premium Craft

**Profile:** data · **Cluster benchmark:** Fantastical + Things — *stays Balencia via the TimelineAgenda drawn path + the warm-glow surfaces, not a flat hour grid.*

**Pre-grade:** B+ (78) · **Post-grade (this section):** A++ (96)

Pre-grade drivers (the gap to A++): the Visualization section's three new primitives (`TimelineAgenda`, `CalendarHeatmap`, `Donut`, `MomentumBar`) are specced to strong A− depth and state-craft, but (1) the non-chart surfaces are flat `--color-ink-brown-800` cards with no top-edge highlight or layered depth; (2) the event cards are functional but carry no premium depth treatment on the accent bars / domain rings; (3) microcopy on the event cards (source labels, sync status, error states) is partly generic; (4) the unscheduled tasks section lacks authored empty-state copy; (5) type line-heights are ad-hoc pixels, tracking unspecified; (6) the section eyebrow styles are inconsistent (some 12pt semibold, tracking unspecified); (7) the floating add button lacks a surrounding motion choreography context — it appears isolated, not part of a draw-led sequence; (8) contrast pairs are asserted, not tabulated.

### Focal hierarchy

One focal point: the **day TimelineAgenda** (in day view) — the drawn path `--stroke-base` 4px threading top→bottom with the reached orange→green segment, current/next node pulsing `--glow-orange-sm` (~12px), and all event nodes carrying domain-colour ring identity. The **month CalendarHeatmap** (in month view) is the focal chart of that view (5-step intensity ramp, today dashed border, all cells tappable). The day-at-a-glance summary strip (Donut + MomentumBar) sits beneath the Date Navigator as clearly secondary — a visual annotation, not a competing focal element. Everything else (unscheduled tasks, time-slot grid, sync status, connect card) is visibly secondary by scale, glow absence, and weight. The squint test in day view lands on the time-axis label "now" (orange line + dot) then the path's current-node glow, then the surrounding event-node identities. In month view: the date grid is the focal surface, the heatmap cell tints read at-a-glance, the day-preview below is secondary.

### Surface & depth

Every card adopts the `CK-P1` Layered Warm Surface — `--color-ink-brown-800` body · `--radius-md` (14pt for event cards <80px, per the brand card-radius rule for small cards) or `--radius-xl` (28pt for section containers like Unscheduled Tasks) · 1px `--glass-border` (`--color-alpha-white-06`) · **`--edge-highlight` top-edge highlight** (`CK-T01`, the not-flat cue, absent on today's event cards) · `--shadow-1`. The time-slot grid background remains `--color-ink-900` (intentional, the deep canvas; the event cards float above it with layered depth). Event card accent bars (left edge, 3pt, domain-colour) are load-bearing identity, never a status recolour — they carry no glow (inline element). The section header "unscheduled (N)" floats on ink-900 with 1pt top border (`--color-alpha-white-08`) — no card surface (deliberate density choice). The day-at-a-glance Donut and MomentumBar sit in a compact secondary card beneath the Date Navigator: `--radius-md`, 1px `--glass-border`, **`--edge-highlight`**, no glow (secondary, <36px elements). The SIA-suggested dashed card keeps its 1pt dashed border (Burnt Orange at 40%) — a **visual distinction from solid cards**, not an error state; the node inside the TimelineAgenda that corresponds to a SIA suggestion carries the purple glyph + "SIA suggested" label (§11, CONSISTENCY.md §6). Sync status indicator (cloud icon) lives in the header and carries no glow at rest; on active sync state (rotating arrows), it pulses at `white/60` (not glowing — it's a meta UI element, not a data focal point).

### Typographic rhythm

Map the Typography table to `CK-P3` tokens: **Header "Schedule"** `--text-h3` (17pt) / 600 / `--leading-snug` / white 100%; **view switcher labels** `--text-h3` (17pt) / 600 (active segment) / 400 (inactive) / `--leading-snug` / white 100% (active) / white 60% (inactive); **date navigator label** `--text-h2` (20pt) / 600 / `--leading-snug` / white 100%; **section eyebrow** (`"UNSCHEDULED"`, `"TODAY'S ACTIONS"`, etc.) the `.eyebrow` recipe (12pt / 600 / `--tracking-eyebrow` 0.12em / uppercase / white 40%); **event card title** `--text-body` (16pt) / 600 / `--leading-normal` / white 100%; **event card time range / meta** `--text-caption` (13pt) / 400 / `--leading-normal` / white 60%; **hour marker labels** `--text-small` (11pt) / 400 / `--leading-normal` / white 30%; **domain tag chip** `--text-small` (11pt) / 600 / domain-colour / `--leading-snug`; **SIA "suggested" eyebrow on node** `--text-small` (11pt) / 600 / `--color-royal-purple` / uppercase; **week-view day abbreviation** `--text-caption` (13pt) / 400 / white 50%; **week-view date number** `--text-h3` (17pt) / 600 / white 100%; **month-grid day number** `--text-body` (16pt) / 400 / white 100% (current) / white 40% (past); **month-grid weekday header** `.eyebrow` recipe (12pt / 600 / uppercase / white 50%); **day-events-preview heading** `--text-h2` (20pt) / 600 / white 100%; **connect card heading** `--text-h1` (28pt) / 700 / `--leading-tight` / white 100%; **connect card body** `--text-body` (16pt) / 400 / `--leading-normal` / white 70%. Hierarchy carried by **weight** (600–700 vs 400), not size alone. Sentence case throughout UI. No exclamation marks. The brand period used with intent: a period on "SIA suggested." never implies punishment — it's a label. ≤2 orange accent words per screen (none needed here; orange is reserved for the current-time line, the event titles inherit their domains' colours, the "+" button is structurally orange but not an accent word). Chillax stays logo-only (none on this screen).

### Microcopy (before → after)

All narrative copy authored to `CK-P5` brand voice. Screen-specific authored strings:

- **View switcher labels** — *before:* "day / week / month" (given) → *after (kept):* same; sentence case, clean. (Already on-voice.)
- **Unscheduled tasks section header** — *before:* "unscheduled (2)" (given) → *after (kept):* same; warm neutral count. (Already on-voice.)
- **Event card time range** — *before:* "7:00 AM – 8:30 AM" (given) → *after (kept):* same; precise, no shaming. (Already on-voice.)
- **SIA-suggested event eyebrow** — *before:* "SIA suggested" (given) → *after (kept):* same; lowercase "suggested" on cards, uppercase in the TimelineAgenda node label (`"SIA SUGGESTED"`). (Already on-voice.)
- **Sync status label** — *before:* "synced 2m ago" (given) → *after (kept):* same; plain, warm. Label fades after 3 seconds, leaving just the icon. (Already on-voice.)
- **Sync status error** — *before:* no message → *after (new, on-voice):* "Sync failed — tap to retry" (specific recovery action named).
- **Unscheduled tasks, empty state** — *before:* section hidden when no tasks → *after (new, on-voice):* "No unscheduled actions yet. Tap + to create one." (never silent; frames as invitation, never empty/abandoned.)
- **Day agenda, loading** — *before:* no message → *after (new):* "Loading your schedule — one moment." (warm, specific).
- **Day agenda, empty day** — *before:* time grid shows only hour markers → *after (new, non-shaming):* "Clear day ahead. Want me to suggest some actions?" + a "yes, suggest" tappable link (orange text, warm framing — no pressure).
- **Month view, no events on a cell** — *before:* lightest heatmap shade (0-event cell) with no label → *after (kept):* heatmap shade distinct from an out-of-range ghosted cell (no-data ≠ zero).
- **Connect Calendar Card** (empty state) — *before:* "connect your calendar" (given) → *after (kept):* same heading + body "sync your Google Calendar to see all your events alongside SIA's suggestions." (Already on-voice, warm, no shame.)
- **Connect Calendar CTA** — *before:* "connect Google Calendar" (given) → *after (kept):* same; direct, sentence case. (Already on-voice.)
- **Event card "missed" state (new)** — *before:* not designed → *after (new):* "Missed — reschedule?" (honest, constructive, never alarm-shaming; muted glyph + neutral caption, no red).
- **Day-at-a-glance, empty donut (new user)** — *before:* not shown → *after (new):* ghosted full-ring outline + hub "nothing scheduled yet — tap + or accept a SIA suggestion" (never collapsed or empty; frames as building, never deficit).
- **Error toast, general** — *before:* no standard → *after (new):* "Couldn't [action]. Try again." (specific, recovery named, no generic "Error!").

No exclamation marks; the brand period on "SIA suggested." is a label, not excitement; all SIA copy (the "clear day ahead" suggestion) is specific to the user's actual schedule, never a horoscope. Domain tag chips keep their domain-color identity (red for fitness, indigo for career, etc.) — these are *always* present on event cards as identity, never recoloured to a status.

### Motion choreography

Locked to `CK-P4` draw-first order:

**Day view:**
1. **TimelineAgenda path draws itself** (`stroke-draw`, `--dur-flow` 1200ms `--ease-flow`) — reached orange→green segment drawing before the unreached white/08 segment
2. **Node settlement** — event nodes settle (0.8→1.0 opacity, `--dur-base` 280ms `--ease-out-soft`) as the path reaches each, with the current/next node's `--glow-orange-sm` pulse looping 2s after settle (never fades out; it loops at rest)
3. **Donut + MomentumBar entrance** — donut arcs sweep clockwise largest→smallest (520ms `--dur-slow` `--ease-flow`), hub counts up; momentum bar fills 0→share (520ms, parallel with donut)
4. **Event cards in the time-slot grid rise** (below-fold, on scroll-into-view) — staggered fade-in + translateY(8→0) (280ms `--dur-base` `--ease-out-soft`, 40ms stagger per visible card)
5. **FAB fades in + scale(0.8→1.0)** (280ms `--dur-base` after the path settles)
6. **Unscheduled tasks section rises** (280ms `--dur-base` if visible above the fold)

**Week view:**
1. **Week day selector row** — fade-in (280ms)
2. **Selected day's event list rows** — staggered fade-in + translateY (8→0), 40ms stagger
3. **Unscheduled section** — fade-in (280ms)

**Month view:**
1. **Calendar grid cells** — stagger in on scroll-into-view (280ms `--dur-base` per cell, 40ms stagger)
2. **Day-events-preview** — fade-in (280ms) when a day is selected

`prefers-reduced-motion` → all at final state instantly: TimelineAgenda path fully drawn + settled nodes (no pulse loop), donut arcs at rest + hub at value, momentum bar at final width, calendar cells at final intensity, FAB at final opacity. **Static signature forms are preserved** — the path is still visible and complete, the pulse on the current node is absent but the node glyph is present (no invisible state).

### State craft

| State | Layout | Copy (on-voice) | Depth / brand |
|---|---|---|---|
| Cold-start / Day 1 (no calendar connected) | Connect Calendar Card at top of grid, the time grid below is empty (hour markers only, no events, no TimelineAgenda path), unscheduled tasks section shows only SIA-generated starter actions (1–2 gentle items), day-at-a-glance Donut shows a ghosted full-ring outline + hub "nothing scheduled yet" | "Connect your calendar to see all your events alongside SIA's suggestions"; "Nothing scheduled yet — tap + or accept a SIA suggestion" (never empty/red) | card surfaces have `--edge-highlight`; Donut ghosted ring distinct from a real 0-events cell; no degenerate empty shapes |
| Loading | TimelineAgenda: node skeletons + path skeleton (both shimmer, morphing into the drawn path and settled nodes when data arrives); Donut + MomentumBar: ring + bar skeletons; event cards: full-card shimmer. Layout preserved, depth visible. | "SIA is reading your week — one moment." | skeleton on `--color-ink-brown-800`, radial shimmer, morphs into data (never a swap); the path skeleton shows the direction of draw |
| Empty / partial | un-synced events: ghosted/dashed cards or greyed-out rows; missing day's data in month view: lightest heatmap shade (distinct from an out-of-range grey cell); Donut with no scheduled minutes: hub shows "nothing scheduled yet" + ghosted ring outline (never a zero-width slice) | per-zone honesty: "Meditation hasn't synced yet — try again later" (if a specific domain fails); "Open time — room to breathe" for an empty day (non-shaming) | no-data ≠ zero (ghosted/dashed/outlined, never a real 0 or a silent omission) |
| Error | synced event fails to render: red left border (2pt, `--color-error-red`) on the card + a 13pt toast below the TimelineAgenda "Couldn't load event [name]. Try again." + a small retry icon; TimelineAgenda path renders reached nodes (cached) + a gap where the failed node would sit + "couldn't load full schedule" banner below the date navigator. Sync status indicator: cloud icon with exclamation, `--color-error-red` at 60%, tap to retry. | "Couldn't load your schedule — pull to refresh" (specific failure, recovery named, never generic "Error!"); "Calendar sync failed — tap to retry" (per the Sync Status Indicator spec) | calibrated `--color-error-red` only on a genuine operational failure (sync error, event load failure), glyph + word paired (cloud + exclamation + text, never colour-alone); cached reached nodes/data preserved and visible |
| Offline | cached schedule visible + a banner at top "You're offline — showing your last sync" (ink-brown-800 bg, white text, 13pt); pull-to-refresh disabled with reason; create event button (FAB + modal) disabled (50% opacity) with reason "Offline — changes will sync when you reconnect" | "You're offline — showing your last sync" | actions honestly dimmed (50%); cached data retained and readable |

### Signature & anti-generic

Ownable moments: the **TimelineAgenda drawn path** (the vertical continuous stroke threading the day, orange→green reached/unreached split — a device Fantastical/Things do not have, unmistakably Balencia), the **warm-glow-on-ink surfaces** (all cards layered with `--edge-highlight`), and the **non-shaming day framing** ("clear day ahead," "room to breathe," "nothing scheduled yet — invite a suggestion" — never red, never guilt). Anti-generic fix: the hour-ruler grid (time-slot background with hour markers) is deliberately **kept as interactive text/lines, not visualized** — it serves the scheduling surface, not the chart. The event nodes in the TimelineAgenda carry **domain-colour identity rings**, not a generic grey-then-coloured scheme. The unscheduled tasks section is **deliberately brief and warm** (not a maximalist left-sidebar like Things; just a collapsible header + task rows) — editorial restraint. The month view's **CalendarHeatmap is the calendar, not a duplicate decorative dots layer** (retiring the stale hardcoded 3-dot demo). The day-at-a-glance **Donut shows real `domainStats` composition, not a fake/hint text pie** (honest, never inflated). The screen **never shows a red-absence cell or a shame streak** — all empty/low states are framed as "open time" or "building capacity."

### Accessibility

Tabulated load-bearing contrast pairs (on `--color-ink-brown-800` / `--color-ink-900` / `--track-inset` recess):

| Element | Color | Contrast |
| --- | --- | --- |
| Header "Schedule" | `--color-alpha-white-100` | ≥12:1 on both |
| View switcher (active segment) | white 100% on `--color-brand-orange` | ≥4.5:1 (WCAG AA) |
| View switcher (inactive segment) | white 60% | ≥4.5:1 on `--color-ink-brown-800` |
| Date navigator label | `--color-alpha-white-100` | ≥12:1 |
| Today indicator dot | `--color-brand-orange` | 3.2:1 (WCAG 1.4.11) |
| Event card title | `--color-alpha-white-100` | ≥12:1 |
| Event card time range | white 60% | ≥4.5:1 |
| Event card accent bar (domain colour) | per domain (such as fitness `--color-domain-fitness`) | ≥3:1 on `--color-ink-brown-800` (WCAG 1.4.11) |
| Hour marker labels | white 30% | ≥4.5:1 (meta text, paired with position) |
| Hour rule lines | white 5% | decorative, exempt from 3:1 (background reference only) |
| Current-time indicator line | `--color-brand-orange` | 3.2:1 (WCAG 1.4.11, load-bearing time reference) |
| TimelineAgenda path stroke (orange/green) | `--color-brand-orange` / `--color-forest-green` | ≥3:1 vs background + node fill (WCAG 1.4.11) |
| Domain tag chip label | domain-colour | ≥3:1 (identity, never status-only — glyph+word paired) |
| SIA "suggested" label | `--color-royal-purple` | 3.0:1 on `--color-ink-brown-800` (WCAG 1.4.11) |
| CalendarHeatmap cell tints | orange/white gradient 5% → 40% | ≥3:1 minimum on lightest and darkest steps (cell count labelled + colour ramp) |
| MomentumBar fill (orange/green) | `--grad-progress` (orange→green) | ≥3:1 on the track (WCAG 1.4.11) |
| Donut slice arcs | domain-colour (identity) | ≥3:1 on surface + labels (never slice-colour-alone; hub + legend paired) |
| Sync status icon (synced) | white 40% | ≥4.5:1 (meta, paired with label "synced 2m ago") |
| Sync status error (red exclamation) | `--color-error-red` | ≥3:1 (glyph + word + icon, never colour-alone) |
| Connect Calendar Card heading | `--color-alpha-white-100` | ≥12:1 |
| Connect Calendar CTA button | white on `--color-brand-orange` | ≥4.5:1 (WCAG AA) |

**Status never colour-alone:** every status (synced / syncing / error / not connected) pairs a **visible glyph** (cloud / rotating arrows / exclamation / lock icon) **+ a word label** (never just a coloured dot or icon). The TimelineAgenda node status (done / current / upcoming / SIA-suggested) is encoded as **glyph + ring + label** ("✓ done" / pulsing ring "current" / dot "upcoming" / purple dot + "SIA suggested"), never by colour of the node fill alone. CalendarHeatmap cell intensity (0–5 events) is shown by both **tint intensity + a visible count label or hover tooltip** (never colour-only). MomentumBar progress is shown by **fill width + a label** (never colour-alone; the label "3.5 of 16 waking hours scheduled" is always present).

**Focus-visible:** every interactive element (view-switcher segment, date arrow, event card, unscheduled task, donut wedge, calendar cell, sync-status tap zone, FAB, connect CTA) carries the uniform **`--focus-ring`** token (`CK-T03`, 2px orange, 2px offset) — replacing any ad-hoc rings in the Interaction tables.

**Targets:** all interactive elements ≥44×44pt (date arrows 44×44, event cards full-width, unscheduled task rows 44pt height, calendar cells ≥32pt on most phones, donut wedges ≥32pt hit radius, FAB 56×56pt, sync icon 44pt touch target).

**Reduced-motion:** the TimelineAgenda path appears fully drawn instantly (reached orange→green segment complete, no draw animation); all event nodes at final opacity (no settle animation), current node without the pulse loop (static glyph present); Donut arcs at final position (no sweep), hub at final value; MomentumBar at final width (no fill animation); calendar cells at final intensity (no stagger); all staggered entrances collapse to instant. The **signature static form is preserved**: the complete path, the node identities, the donut composition, the bar fill — all essential info is present and readable at rest.

Conform to `design-audit/CONSISTENCY.md`.


---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | Base canvas |
| Event cards | #211008 | ink-brown-800 | Standard card surface |
| Card borders | white at 10% | — | Glassmorphism subtle border |
| Active view segment | #FF5E00 | brand-orange | 60% role — active control |
| FAB button | #FF5E00 | brand-orange | 60% role — primary CTA |
| Current time line | #FF5E00 | brand-orange | 60% role — current moment |
| Today indicator dot | #FF5E00 | brand-orange | 60% role — orientation |
| Completed task check | #34A853 | brand-green | 30% role — completion |
| Event completion | #34A853 | brand-green | 30% role — done state |
| SIA suggestion indicator / SIA-suggested timeline node / SIA-scheduled slice | #7F24FF | brand-purple | 10% role — AI presence (SIA-originated elements only, §11) |
| SIA "suggested" label | #7F24FF at 60% | brand-purple | 10% role — subtle AI tag |
| Domain accent bars | per domain | domain colors | Identification only |
| Domain tag chips | per domain | domain colors | Identification only |
| Hour labels | white at 30% | — | Background reference |
| Hour rules | white at 5% | — | Subtle grid |
| Title text | white | — | Primary text |
| Body text | white at 70% | — | Secondary text |
| Meta text | white at 50% | — | Tertiary text |

**60/30/10 verification**: Orange dominates through the FAB, active view segment, current time indicator, today dot, and selected date circle. Green appears only on completion states. Purple is confined to SIA-originated elements only: the SIA suggestion indicator dot, the "SIA suggested" label, the SIA-suggested TimelineAgenda node fill, and any SIA-scheduled Donut slice. These are all genuinely SIA-scheduled (§11 — the brand-correct AI register), not a 60/30/10 violation; orange still dominates data ink and green is reserved for arrival/completion. Domain colors serve identification on accent bars and tag chips only.

---

## Interaction States

### View Switcher Segments
| State | Visual | Haptic |
|-------|--------|--------|
| Default (inactive) | Transparent bg, white at 60% text | — |
| Pressed | Scale(0.97), bg darkens | Light impact |
| Active (selected) | Burnt Orange fill, white text | — |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity | — |
| Loading | — | — |
| Error | — | — |
| Success | — | — |

### Event Cards (Synced / Manual)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800, 1pt border white 10% | — |
| Pressed | Scale(0.97), border brightens to white 20% | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity | — |
| Loading | Skeleton shimmer (full card) | — |
| Error | Red left accent bar, error icon | Error notification |
| Success | Brief green glow (600ms) on completion | Success notification |

### Event Cards (SIA-Suggested)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Transparent, 1pt dashed orange border at 40% | — |
| Pressed | Scale(0.97), dashed border brightens to 80% | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity | — |
| Loading | Skeleton shimmer | — |
| Error | Dashed border turns red | Error notification |
| Success | Converts to solid card (accepted), green glow 600ms | Success notification |

### Unscheduled Task Checkbox
| State | Visual | Haptic |
|-------|--------|--------|
| Default | 20pt square, white outline 2pt, --r-xs corners, empty | — |
| Pressed | Scale(0.95), fill with orange at 20% | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity | — |
| Loading | Spinner replaces checkbox | — |
| Error | Red outline | Error notification |
| Success | Orange fill, white checkmark (12pt), task text strikethrough | Success notification |

### Floating Add Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Burnt Orange fill, --shadow-2 | — |
| Pressed | Darker orange (orange-600), scale(0.95), shadow reduces | Medium impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity | — |
| Loading | White spinner replaces "+" icon | — |
| Error | — | — |
| Success | Brief green glow (600ms) | Success notification |

### Date Navigator Arrows
| State | Visual | Haptic |
|-------|--------|--------|
| Default | White chevron, 20pt | — |
| Pressed | White at 60%, scale(0.9) | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity (e.g., can't go before account creation) | — |
| Loading | — | — |
| Error | — | — |
| Success | — | — |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Swipe left/right | Time slot grid | Navigate to next/previous day (day view), week (week view), month (month view) |
| Swipe right | SIA-suggested card | Accept suggestion (schedule it) |
| Swipe left | SIA-suggested card | Dismiss suggestion |
| Long-press | Unscheduled task | Begin drag to place in a time slot |
| Long-press | Empty time slot | Create event at that time |
| Long-press | Existing event card | Quick actions menu (edit, delete, reschedule) |
| Pull-to-refresh | Entire screen | Sync latest calendar data |
| Tap | Empty time slot | Create event at that time (pre-filled) |

### Haptic Feedback Points
- View segment switch: light impact
- Date navigation: light impact
- Event card tap: light impact
- Task completion (checkbox): success notification
- SIA suggestion accepted: success notification
- SIA suggestion dismissed: light impact
- Pull-to-refresh release: medium impact
- FAB tap: medium impact
- Long-press threshold: light impact
- Drag-and-drop task placement: medium impact on drop

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| View switch | Tap segment | Crossfade between views, active pill slides | 280ms (--dur-base) | ease-out-soft |
| Date navigation | Tap arrow / swipe | Slide old content out, new content in (direction matches gesture) | 280ms (--dur-base) | ease-out-soft |
| Current time line | Screen load | Fade in at correct position | 280ms (--dur-base) | ease-out-soft |
| Day agenda TimelineAgenda path | Day-view load / scroll-into-view | Path draws itself top→bottom (stroke-dashoffset), reached orange→green before unreached; nodes settle 0.8→1 as the path reaches each; current/next node --glow-orange-sm pulse loops 2s after settle — never opacity-fades (§8) | 1200ms path (--dur-flow) / 280ms nodes | ease-flow (path) / ease-out-soft (nodes) |
| Day-split Donut | Day-view load / scroll-into-view | Arcs sweep clockwise largest→smallest (stroke-dashoffset); hub counts up | 1200ms arcs (--dur-flow) / 520ms hub | ease-flow / ease-out-soft |
| Day-fullness MomentumBar | Day-view load / scroll-into-view | Single continuous fill rises 0→share | 520ms (--dur-slow) | ease-flow |
| Month density CalendarHeatmap | Month-view load / scroll-into-view | Cells stagger in on scroll-into-view | 280ms per cell (--dur-base) | ease-out-soft |
| Unscheduled section | Tap header | Expand/collapse with height animation | 280ms (--dur-base) | ease-out-soft |
| SIA suggested card | Swipe accept | Card morphs from dashed to solid, green glow | 520ms (--dur-slow) | ease-flow |
| SIA suggested card | Swipe dismiss | Slide out left, fade | 280ms (--dur-base) | ease-out-soft |
| Task drag to time slot | Long-press + drag | Task lifts (scale 1.03, shadow-3), ghost placeholder in slot | Continuous | — |
| Task drop | Release | Snap to slot position, settle animation | 280ms (--dur-base) | ease-out-soft |
| FAB | Screen load | Fade in + scale(0.8 → 1.0) | 280ms (--dur-base) | ease-out-soft |
| Pull-to-refresh | Pull gesture | Spinner appears, events refresh | Variable | — |
| Event card appear (week/month list rows) | Calendar load | Staggered fade-in + translateY(8→0), 60ms stagger | 280ms per card | ease-out-soft |
| Day agenda event nodes | Day-view load | Nodes settle 0.8→1 as the TimelineAgenda path reaches each (draw-led, not an independent fade) | 280ms per node | ease-out-soft |
| Connect card | First load | Fade-in + translateY(12→0) | 280ms (--dur-base) | ease-out-soft |

**Screen transition**:
- **Enter**: Stack push from right (standard iOS navigation push), 280ms, ease-out-soft
- **Exit**: Stack pop to right (back navigation), 280ms, ease-out-soft

---

## Empty States

### Day 1 (new user, no calendar connected)
The time grid shows no events. In place of the grid, a single card appears centered in the scrollable area:
- **Connect Calendar Card** (described in Components above)
- Below the card: SIA note — "once you connect your calendar, I'll suggest the best times for your actions." (15pt Sora Regular, white at 50%, center-aligned)
- The unscheduled tasks section still shows SIA-generated actions (from onboarding goals) even without a calendar connection
- FAB is still visible and functional

### No calendar connected but has SIA actions
- Unscheduled tasks section is prominent (expanded by default)
- Time grid is empty but functional — user can still manually place tasks by long-pressing time slots
- Connect Calendar Card appears at the top of the time grid area

### Established user (zero state — empty day)
- Time grid shows hour markers and current time indicator, but no events
- SIA scheduling note appears as a gentle card: "clear day ahead. want me to suggest some actions?" with a "yes, suggest" tappable link (orange text)
- Unscheduled tasks section shows any pending actions

---

## Motivation Adaptation

- **Low motivation**: Unscheduled tasks section shows only 1-2 highest-priority actions. SIA suggestions are fewer and gentler ("maybe try a 10-minute walk around 2pm?"). Day view only — week and month views hidden in the view switcher to reduce overwhelm.
- **Medium motivation**: Default experience. 3-5 unscheduled tasks visible. All three views available. SIA suggestions appear in optimal time slots.
- **High motivation**: Full task list visible in unscheduled section. Additional data on event cards: duration, estimated effort, XP reward. Week view shows event density heat indicators. Detailed analytics link at bottom of day view.

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Screen title ("Schedule") | Sora | Semibold (600) | 17pt | 22pt | white |
| View switcher labels | Sora | Semibold (600) | 15pt | 20pt | white (active) / white at 60% (inactive) |
| Date navigator label | Sora | Semibold (600) | 16pt | 22pt | white |
| Unscheduled section header | Sora | Semibold (600) | 12pt | 16pt | white at 40% |
| Unscheduled task name | Sora | Regular (400) | 15pt | 20pt | white |
| Hour marker labels | Sora | Regular (400) | 13pt | 18pt | white at 30% |
| Event card title | Sora | Semibold (600) | 15pt | 20pt | white |
| Event card time range | Sora | Regular (400) | 13pt | 18pt | white at 60% |
| SIA "suggested" eyebrow | Sora | Semibold (600) | 12pt | 16pt | purple #7F24FF at 60% |
| Domain tag chip text | Sora | Semibold (600) | 11pt | 16pt | domain color |
| Week day abbreviation | Sora | Regular (400) | 12pt | 16pt | white at 50% |
| Week day date number | Sora | Semibold (600) | 16pt | 22pt | white |
| Month day numbers | Sora | Regular (400) | 15pt | 20pt | white (current) / white at 40% (past) |
| Month weekday headers | Sora | Semibold (600) | 12pt | 16pt | white at 50% |
| Day events preview heading | Sora | Semibold (600) | 15pt | 20pt | white |
| Sync status label | Sora | Regular (400) | 11pt | 16pt | white at 30% |
| Template card name | Sora | Semibold (600) | 13pt | 18pt | white |
| Template card event count | Sora | Regular (400) | 11pt | 16pt | white at 40% |
| Template section eyebrow | Sora | Semibold (600) | 12pt | 16pt | white at 40% |
| Connect card heading | Sora | Semibold (600) | 18pt | 24pt | white |
| Connect card body | Sora | Regular (400) | 15pt | 22pt | white at 70% |
| Connect card CTA | Sora | Semibold (600) | 17pt | 22pt | white |
| SIA scheduling note | Sora | Regular (400) | 15pt | 22pt | white at 50% |

---

## Error Handling

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Calendar data fails to load | Time grid shows skeleton shimmer for 5s, then inline message: "couldn't load your schedule" with retry button | Tap "retry" re-fetches; pull-to-refresh also retries |
| Google Calendar sync fails | Sync status indicator: cloud icon with exclamation, red at 60% (#EF4444); tooltip: "sync failed" | Tap sync icon to retry; navigates to Connected Services [22] if persistent |
| Event creation fails | Create event modal shows inline error below form: "couldn't create event. try again." in 13pt Sora Regular, #F44336 | Tap "create" again to retry; form data preserved |
| SIA suggestion load fails | SIA-suggested dashed cards do not appear; no error shown (graceful degradation) | Pull-to-refresh may surface new suggestions |
| Task completion fails | Checkbox reverts to unchecked state; toast: "couldn't update task. try again." | Tap checkbox again to retry |
| Drag-to-schedule fails | Task snaps back to unscheduled section; toast: "couldn't schedule task. try again." | Drag task to time slot again to retry |
| View switch data fails | Previous view data remains visible; toast: "couldn't load [view] data" | Tap view segment again to retry |
| Event deletion fails | Event card reappears with slide-in animation; toast: "couldn't delete event. try again." | Long-press event and select delete again |
| Offline state | Banner at top: "you're offline -- showing cached schedule" (ink-brown-800 bg, white at 60% text) | Schedule updates automatically on reconnection; manual events queue locally |
| Calendar not connected | Connect Calendar Card appears prominently with CTA to initiate Google Calendar OAuth | Tap "connect Google Calendar" to begin setup |

---

## Accessibility

- Screen title "Schedule" announced on focus via VoiceOver
- View switcher announces: "Day view, selected" / "Week view" / "Month view"
- Date navigator announces: "Tuesday, May 20, 2026. Swipe left for next day, swipe right for previous day."
- Today indicator announced: "Today" when viewing current date
- Unscheduled tasks section announces: "Unscheduled tasks, [N] items, collapsed" or "expanded"
- Each unscheduled task announces: "Task: [name], [domain], checkbox unchecked"
- Event cards announce: "Event: [title], [time range], [domain]. Double-tap to view details."
- SIA-suggested cards announce: "SIA suggestion: [title], [time]. Swipe right to accept, swipe left to dismiss."
- Current time indicator announced: "Current time: [time]"
- Hour markers serve as landmarks for VoiceOver navigation
- FAB announces: "Add event or task"
- Sync status announces: "Calendar synced [time] ago" / "Calendar syncing" / "Calendar sync error, double-tap to retry"
- All touch targets meet 44x44pt minimum (including date arrows at 44x44pt)
- Focus order: back button -> view switcher -> date navigator -> unscheduled section -> time grid events (chronological) -> FAB
- Gesture alternatives: swipe-right-from-edge replaces back button; long-press time slot available via VoiceOver actions rotor; drag-to-schedule has alternative "schedule" action in VoiceOver custom actions

---

## Cross-References

- **Navigates to**: Home Screen (12) via back (stack pop), Connected Services (22) via "connect calendar" CTA or sync status tap, SIA Chat (09) via SIA suggestion context tap, Goal Detail (14) via goal-linked event tap, Fitness Dashboard (26) via fitness event tap, Nutrition Dashboard (28) via meal event tap, Career Dashboard (32) via work event tap, any domain dashboard via domain-tagged event, Reminders & Tasks (61) via task-linked event tap
- **Navigates from**: Home Screen (12) via schedule preview (stack push), Explore Section (18) via calendar module card (stack push), SIA Chat (09) via deep-link card (stack push), Goal Detail (14) via "view in calendar" (stack push), Reminders & Tasks (61) via "view in calendar" link
- **Shared components with**: Home Screen (12) — schedule preview uses same event card design but compact; Goals List (13) — action items share checkbox + domain tag pattern; Habits (38) — time-based tasks share visual language; Reminders & Tasks (61) — task rows share checkbox + domain tag pattern, scheduled reminders appear as events
- **Patterns used**: Brand CTA Button (_shared-patterns.md), Back Button (_shared-patterns.md), 8-State Interaction Model (_shared-patterns.md), Stack Navigation (_shared-patterns.md)
- **Patterns established**: Calendar Day View (time-slot grid with current time indicator), Calendar View Switcher (3-segment day/week/month), SIA-Suggested Event Card (dashed-border treatment for AI suggestions vs solid for confirmed events), Unscheduled Tasks Section (collapsible action items not yet time-placed), Drag-to-Schedule gesture (long-press + drag unscheduled task into time slot), Connect Service Empty State (guidance card with service icon + CTA), Sync Status Indicator (cloud icon with sync state in header), Schedule Templates (horizontal-scroll pre-built routine cards)
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-03.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U02`
**Prototype route**: `/tabs/today/schedule`
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
| B03-F09 | major | navigation | Implement view switching, date movement, add-event modal, and task drag/placement behavior. |
| B03-F10 | major | accessibility | Label previous/next date controls and disambiguate the header add button from the floating add button. |

### Prototype Implications

- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

