# Screen Design: Schedule / Calendar

**Screen**: 41 of 43
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
- **Visual treatment**: Transparent background with 1pt **dashed** border (Burnt Orange at 40%), --r-md corners. Content same as synced card but with SIA indicator: small purple dot (8pt) next to title. "SIA suggested" eyebrow label (11pt Sora Semibold, purple at 60%, uppercase).
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
| SIA suggestion indicator | #7F24FF | brand-purple | 10% role — AI presence |
| SIA "suggested" label | #7F24FF at 60% | brand-purple | 10% role — subtle AI tag |
| Domain accent bars | per domain | domain colors | Identification only |
| Domain tag chips | per domain | domain colors | Identification only |
| Hour labels | white at 30% | — | Background reference |
| Hour rules | white at 5% | — | Subtle grid |
| Title text | white | — | Primary text |
| Body text | white at 70% | — | Secondary text |
| Meta text | white at 50% | — | Tertiary text |

**60/30/10 verification**: Orange dominates through the FAB, active view segment, current time indicator, today dot, and selected date circle. Green appears only on completion states. Purple is limited to the SIA suggestion indicator dot and "SIA suggested" label — exactly 2 elements. Domain colors serve identification on accent bars and tag chips only.

---

## Interaction States

### View Switcher Segments
| State | Visual | Haptic |
|-------|--------|--------|
| Default (inactive) | Transparent bg, white at 60% text | — |
| Pressed | Scale(0.97), bg darkens | Light impact |
| Active (selected) | Burnt Orange fill, white text | — |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.5 opacity | — |
| Loading | — | — |
| Error | — | — |
| Success | — | — |

### Event Cards (Synced / Manual)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800, 1pt border white 10% | — |
| Pressed | Scale(0.97), border brightens to white 20% | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.5 opacity | — |
| Loading | Skeleton shimmer (full card) | — |
| Error | Red left accent bar, error icon | Error notification |
| Success | Brief green glow (600ms) on completion | Success notification |

### Event Cards (SIA-Suggested)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Transparent, 1pt dashed orange border at 40% | — |
| Pressed | Scale(0.97), dashed border brightens to 80% | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.5 opacity | — |
| Loading | Skeleton shimmer | — |
| Error | Dashed border turns red | Error notification |
| Success | Converts to solid card (accepted), green glow 600ms | Success notification |

### Unscheduled Task Checkbox
| State | Visual | Haptic |
|-------|--------|--------|
| Default | 20pt square, white outline 2pt, --r-xs corners, empty | — |
| Pressed | Scale(0.95), fill with orange at 20% | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.5 opacity | — |
| Loading | Spinner replaces checkbox | — |
| Error | Red outline | Error notification |
| Success | Orange fill, white checkmark (12pt), task text strikethrough | Success notification |

### Floating Add Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Burnt Orange fill, --shadow-2 | — |
| Pressed | Darker orange (orange-600), scale(0.95), shadow reduces | Medium impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.5 opacity | — |
| Loading | White spinner replaces "+" icon | — |
| Error | — | — |
| Success | Brief green glow (600ms) | Success notification |

### Date Navigator Arrows
| State | Visual | Haptic |
|-------|--------|--------|
| Default | White chevron, 20pt | — |
| Pressed | White at 60%, scale(0.9) | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.5 opacity (e.g., can't go before account creation) | — |
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
| Unscheduled section | Tap header | Expand/collapse with height animation | 280ms (--dur-base) | ease-out-soft |
| SIA suggested card | Swipe accept | Card morphs from dashed to solid, green glow | 520ms (--dur-slow) | ease-flow |
| SIA suggested card | Swipe dismiss | Slide out left, fade | 280ms (--dur-base) | ease-out-soft |
| Task drag to time slot | Long-press + drag | Task lifts (scale 1.03, shadow-3), ghost placeholder in slot | Continuous | — |
| Task drop | Release | Snap to slot position, settle animation | 280ms (--dur-base) | ease-out-soft |

### Drag-to-Schedule Ghost Placeholder

When a user long-presses an unscheduled task and drags it to a time slot:

**Lifted task:**
- Scale: 1.03x
- Shadow: --shadow-3 (0 32px 80px rgba(33, 16, 8, 0.28))
- Opacity: 90% (slight transparency indicates it's being moved)
- Haptic: medium impact on lift

**Ghost placeholder (in target time slot):**
- A semi-transparent preview of the task card appears in the slot the user is hovering over
- Background: domain color at 8% (barely visible tint matching the task's domain)
- Border: 1pt dashed, domain color at 30%
- Border radius: --r-md (14pt)
- Height: matches the task card's height (typically 48-64pt depending on content)
- Content: task name only, 14pt Sora Regular, white at 30%
- No checkbox, no time label, no domain tag — simplified to indicate "this is where it will land"
- The ghost follows the user's drag position vertically, snapping to the nearest 15-minute increment

**Drop:**
- Ghost solidifies: dashed border → solid 1pt white at 8%, background → ink-brown-800, content fades to full opacity (280ms, ease-out-soft)
- Lifted task animates to the drop position (280ms, ease-out-soft)
- Haptic: light impact on drop
- Time slot auto-assigns based on drop position

**Cancel:**
- If user drags back to the unscheduled area or releases outside a valid time slot, the task animates back to its original position (280ms, ease-out-soft) and the ghost fades out (160ms)
| FAB | Screen load | Fade in + scale(0.8 → 1.0) | 280ms (--dur-base) | ease-out-soft |
| Pull-to-refresh | Pull gesture | Spinner appears, events refresh | Variable | — |
| Event card appear | Calendar load | Staggered fade-in + translateY(8→0), 60ms stagger | 280ms per card | ease-out-soft |
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

## Cross-References

- **Navigates to**: Home Screen (12) via back (stack pop), Connected Services (22) via "connect calendar" CTA, SIA Chat (09) via SIA suggestion context tap, Goal Detail (14) via goal-linked event tap, Fitness Dashboard (26) via fitness event tap, Nutrition Dashboard (28) via meal event tap, Career Dashboard (32) via work event tap, any domain dashboard via domain-tagged event
- **Navigates from**: Home Screen (12) via schedule preview (stack push), Explore Section (18) via calendar module card (stack push), SIA Chat (09) via deep-link card (stack push), Goal Detail (14) via "view in calendar" (stack push)
- **Shared components with**: Home Screen (12) — schedule preview uses same event card design but compact; Goals List (13) — action items share checkbox + domain tag pattern; Habits (38) — time-based tasks share visual language
- **Patterns used**: Brand CTA Button (_shared-patterns.md), Back Button (_shared-patterns.md), 8-State Interaction Model (_shared-patterns.md), Stack Navigation (_shared-patterns.md)
- **Patterns established**: Calendar Day View (time-slot grid with current time indicator), Calendar View Switcher (3-segment day/week/month), SIA-Suggested Event Card (dashed-border treatment for AI suggestions vs solid for confirmed events), Unscheduled Tasks Section (collapsible action items not yet time-placed), Drag-to-Schedule gesture (long-press + drag unscheduled task into time slot), Connect Service Empty State (guidance card with service icon + CTA)
