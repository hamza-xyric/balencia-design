### 1. Header
- **Screen ID:** 61
- **Name:** reminders-tasks
- **Route(s) covered:** No live route; stack-pushed task and reminder hub opened from Home, Schedule, Me, or CIA Chat.
- **Tab:** Utility stack over the origin tab
- **Source:** Functional Content Brief: Reminders & Tasks
- **Batch:** 5

### 2. Purpose
Reminders & Tasks is the execution ledger for promises the member does not want to lose. It answers what is due today, which reminders are active, what has already been handled, and what CIA can suggest from goals, schedule gaps, and wellbeing routines. The screen is checklist-first, not analytics-first: the dominant surface is today's actionable list with a clear completion read.

### 3. Entry & exit
- **Entry paths:** Home action card, Schedule task shortcut, Me quick-link, CIA Chat deep-link, and notification tap. All entries use a standard stack push over the origin tab.
- **Exit paths:** Back returns to origin. Task row opens task detail sheet. Reminder row opens reminder detail sheet. View in calendar pushes Schedule [41]. Ask CIA opens CIA Chat [09] with the selected task context.
- **Create paths:** TopBar plus opens an action sheet with New task and New reminder. The same sheets serve edit mode.
- **Consent paths:** first use of push, email, or SMS delivery opens a channel-specific consent row in the reminder sheet; channel scope, delivery source, revoke path, and retention are visible before save.

### 4. Layout anatomy
**Regions top-to-bottom:**
1. **TopBar:** back chevron, title "Reminders & tasks", plus glyph.
2. **Today completion band:** one SolidCard with completion bar, done count, open count, and last sync.
3. **Today's checklist:** prioritized rows with checkbox, due time, domain tag, and priority glyph.
4. **Upcoming groups:** Tomorrow, This week, Later, collapsed as needed.
5. **Active reminders:** roll-up "3 of 4 on" plus reminder rows with toggles and channel chips.
6. **Completed tasks:** collapsible archive for the day.
7. **CIA suggestion card:** optional contextual task suggestion with add and ask actions.

**ASCII wireframe (390x844):**
```text
┌──────────────────────────────────────┐
│ ‹  Reminders & tasks              +  │
│ synced 10m ago                       │
├──────────────────────────────────────┤
│ ┌──────────────────────────────────┐ │
│ │ Today              6 of 9 done   │ │
│ │ ███████░░░ 67%                  │ │
│ │ done 6       open 3              │ │
│ └──────────────────────────────────┘ │
│ TODAY                                │
│ ┌──────────────────────────────────┐ │
│ │ ○  9:30  Take medication [Health]│ │
│ │ ○ 12:45  Walk after lunch [Fit]  │ │
│ │ ✓  8:00  Check resting HRV       │ │
│ └──────────────────────────────────┘ │
│ UPCOMING                         ⌄  │
│   Tomorrow · book lab follow-up      │
│ ACTIVE REMINDERS                 3/4 │
│   medication reminder        on  ●   │
│   wind-down reminder         off ○   │
│ COMPLETED TODAY                  ⌄  │
│ ✦ CIA suggestion                     │
│   A five-minute stretch fits before  │
│   your appointment. [Add] [Ask CIA]  │
└──────────────────────────────────────┘
```

### 5. Components
- **TopBar** with 44px back and plus targets.
- **SolidCard** for the completion band and dense task groups.
- **ProgressBar** for today's completion ratio.
- **KPIRow** for Done and Open counts.
- **ListRow** for tasks, upcoming items, completed items, and reminders.
- **CheckboxControl** (NEW) for large checklist taps; 44px hit area, green success check only after completion persists.
- **Toggle** for active reminders.
- **ChipDomainTag** for category labels.
- **ChipProvenance** for sync and CIA suggestion evidence.
- **CIAInsightCard** for the suggestion engine.
- **Sheet** for create/edit task and create/edit reminder forms.
- **OfflineBanner, ErrorState, SkeletonState, HonestNullState, BtnSecondary, BtnGhost, BtnCoach** for states and actions.

### 6. Visual treatment
- **Atmosphere:** warm dark base with the standard top radial glow and soft grain.
- **Glass tiers:** TopBar uses glass-pill after scroll; CIA suggestion uses glass-card with glow-cia; completion band and task lists use SolidCard because checkboxes, times, and toggles need crisp legibility.
- **Semantic glow:** completion band uses glow-you while work remains, then glow-done at 100%. CIA suggestion uses glow-cia because it is AI-derived. Reminder toggles do not glow; on/off state is functional chrome, not a reward.
- **Color discipline:** orange for effort and current work, green only for saved completions, purple only for CIA-suggested tasks. Priority never relies on red alone; it pairs a glyph with a label.

### 7. Content & copy
- **Title:** Reminders & tasks
- **Completion label:** 6 of 9 done
- **Today empty:** No tasks for today. Check your upcoming list or create one.
- **Cold start:** No tasks yet. Create your first task or let CIA suggest one based on your goals.
- **All done:** All done for today.
- **Paused reminder:** paused. You can turn this back on anytime.
- **CIA suggestion:** Before your Thursday appointment, a five-minute stretch could ease tension.
- **Actions:** New task, New reminder, Add as task, Ask CIA, Save, Delete task.
- **Offline:** offline - your changes are queued and will sync when you are back online.
- **Error:** Couldn't load your tasks.
- **Disabled helper:** Add a task title to save.

### 8. Data & honesty states
- **Today completion ratio:** real = done divided by total, ChipProvenance "via tasks sync"; low-confidence = ratio muted with "estimated · low confidence" when cached rows are still reconciling; honest-null = completion band hidden until at least one task exists.
- **Done and open counts:** real = exact live counts, provenance "via tasks sync"; low-confidence = muted cached counts while offline reconciliation is pending; honest-null = "--" with "No tasks for today yet."
- **Task rows:** real = title, due time, recurrence, and domain tag from user task data; low-confidence = due time label "time may shift" when timezone is unresolved; honest-null = missing due time shown as "unscheduled" rather than invented.
- **Active reminders roll-up:** real = "3 of 4 on" from reminder toggles; low-confidence = "syncing reminder states"; honest-null = "No active reminders yet."
- **Reminder channels:** real = Push, Email, or SMS chip only after channel consent is granted, with ChipProvenance "you allowed"; low-confidence = not applicable because permission is binary; honest-null = chip hidden and row copy "choose a delivery channel."
- **CIA suggestion:** real = suggestion with ChipProvenance "via schedule + goals"; low-confidence = card dimmed with ConfidenceMeter; honest-null = suggestion card omitted, not replaced with filler.

### 9. All states
- **Default:** completion band, today checklist, upcoming groups, reminders, completed collapse, and optional CIA suggestion render in order.
- **Skeleton:** completion bar, two KPI blocks, and list rows shimmer in their final geometry.
- **Empty:** cold-start card replaces completion band and lists, with New task and Ask CIA actions.
- **Error:** cached data stays visible when available; ErrorState offers Retry and preserves queued changes.
- **Success:** checkbox stroke draws, row mutes, completion bar updates, and the done count increments with a short glow-done arrival.
- **Disabled:** save buttons in create/edit sheets sit at 40% opacity until required fields are valid; offline-only blocked actions explain why inline.
- **Offline:** cached lists remain interactive; writes queue and rows show "saving when online" until sync completes.

### 10. Motion & interaction
- Tap checkbox to complete. Swipe right completes. Swipe left reveals edit and delete. Long-press lifts a task for reordering. Pull-to-refresh requests a sync.
- Completion bar fills with draw-first motion over 520ms; checkmark strokes draw before the row slides to Completed.
- FAB/plus sheet enters with physical easing. CIA suggestion actions press-scale to .98 in 150-250ms.
- Haptics: light on completion, medium on reorder drop, success notification when an offline queue syncs.
- **Reduced-motion path:** all row slides, bar fills, and reorder springs snap to final static states; status changes still update text and haptics.

### 11. Motivation-tier adaptation
- **Low:** show only one or two tasks for today, hide completed, collapse upcoming and CIA suggestions.
- **Medium:** default layout with all main sections visible and completed collapsed.
- **High:** show priority, recurrence, channel chips, linked goal, and detailed sync/provenance captions on rows.

### 12. Accessibility
- All checkbox, toggle, plus, back, and drag targets meet the 44px minimum.
- Checkbox state is announced as "not done", "done", or "syncing", never by color alone.
- Reminder toggles announce channel and next trigger time.
- Swipe actions have equivalent overflow menu actions.
- Completion ratio announces as "6 of 9 tasks done, 3 open."
- Contrast uses paper text over dark solid cards; disabled text remains readable with an explicit reason nearby.

### 13. Premium checklist
1. Checklist-first, not generic dashboard.
2. Real task, reminder, recurrence, channel, and sync data are named.
3. Completion uses honest provenance and does not fake zeros.
4. CIA suggestions are optional and evidence-labeled.
5. Notification channels name scope, retention, revoke, and delete before save.
6. No shame language for overdue or missed tasks.
7. One primary creation entry, not duplicate chrome.
8. Selective glass: CIA and top chrome only.
9. Solid cards handle dense rows.
10. Semantic glow is tied to effort, completion, or CIA synthesis.
11. Full Default, Skeleton, Empty, Error, Success, Disabled, and Offline states exist.
12. Reduced-motion path exists.
13. 44px targets and non-color status labels are specified.
14. Premium gating is explicit: free keeps basic tasks; premium unlocks unlimited reminders and multi-channel delivery.
