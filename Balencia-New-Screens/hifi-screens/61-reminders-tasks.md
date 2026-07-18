# 61-reminders-tasks - A+++ hi-fi mobile spec

## Header
- **Source ID:** 61
- **Source spec:** `Balencia-New-Screens/screens/61-reminders-tasks.md`
- **Evidence:** screens/61-reminders-tasks.md, work/briefs/61.md, work/drafts/61.md, Functional Content Brief: Reminders & Tasks
- **Route(s):** No live route; stack-pushed task and reminder hub opened from Home, Schedule, Me, or CIA Chat.
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Reminders & Tasks is the execution ledger for promises the member does not want to lose.
- **Premium Visual Director:** make reminders-tasks command surface the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** reminders-tasks uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+--------------------------------------+
|   Reminders & tasks              +  |
| synced 10m ago                       |
+--------------------------------------+
| +----------------------------------+ |
| | Today              6 of 9 done   | |
| | ########## 67%                  | |
| | done 6       open 3              | |
| +----------------------------------+ |
| TODAY                                |
| +----------------------------------+ |
| | o  9:30  Take medication [Health]| |
| | o 12:45  Walk after lunch [Fit]  | |
| | x  8:00  Check resting HRV       | |
| +----------------------------------+ |
| UPCOMING                           |
|   Tomorrow  book lab follow-up      |
| ACTIVE REMINDERS                 3/4 |
|   medication reminder        on  o   |
|   wind-down reminder         off o   |
| COMPLETED TODAY                    |
|  CIA suggestion                     |
|   A five-minute stretch fits before  |
|   your appointment. [Add] [Ask CIA]  |
+--------------------------------------+

Route handling: No live route; stack-pushed task and reminder hub opened from Home, Schedule, Me, or CIA Chat.
```

## Focal Hierarchy
- **Dominant focal moment:** reminders-tasks command surface; it should be visually singular, not one tile among many.
- **Secondary layer:** TopBar with CIA only when the source supports a synthesized read.
- **Operational layer:** Today completion band, Today's checklist, Upcoming groups, Active reminders.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*tasks*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
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

## Data Honesty
- **Today completion ratio:** real = done divided by total, ChipProvenance "via tasks sync"; low-confidence = ratio muted with "estimated  low confidence" when cached rows are still reconciling; honest-null = completion band hidden until at least one task exists.
- **Done and open counts:** real = exact live counts, provenance "via tasks sync"; low-confidence = muted cached counts while offline reconciliation is pending; honest-null = "--" with "No tasks for today yet."
- **Task rows:** real = title, due time, recurrence, and domain tag from user task data; low-confidence = due time label "time may shift" when timezone is unresolved; honest-null = missing due time shown as "unscheduled" rather than invented.
- **Active reminders roll-up:** real = "3 of 4 on" from reminder toggles; low-confidence = "syncing reminder states"; honest-null = "No active reminders yet."
- **Reminder channels:** real = Push, Email, or SMS chip only after channel consent is granted, with ChipProvenance "you allowed"; low-confidence = not applicable because permission is binary; honest-null = chip hidden and row copy "choose a delivery channel."
- **CIA suggestion:** real = suggestion with ChipProvenance "via schedule + goals"; low-confidence = card dimmed with ConfidenceMeter; honest-null = suggestion card omitted, not replaced with filler.

## Consent and Safety
- reminders-tasks uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- This is documented as a modal, overlay, utility, or source-only surface; do not invent a live route.

## States
- **Default:** completion band, today checklist, upcoming groups, reminders, completed collapse, and optional CIA suggestion render in order.
- **Skeleton:** completion bar, two KPI blocks, and list rows shimmer in their final geometry.
- **Empty:** cold-start card replaces completion band and lists, with New task and Ask CIA actions.
- **Error:** cached data stays visible when available; ErrorState offers Retry and preserves queued changes.
- **Success:** checkbox stroke draws, row mutes, completion bar updates, and the done count increments with a short glow-done arrival.
- **Disabled:** save buttons in create/edit sheets sit at 40% opacity until required fields are valid; offline-only blocked actions explain why inline.
- **Offline:** cached lists remain interactive; writes queue and rows show "saving when online" until sync completes.

## Motion
- Tap checkbox to complete. Swipe right completes. Swipe left reveals edit and delete. Long-press lifts a task for reordering. Pull-to-refresh requests a sync.
- Completion bar fills with draw-first motion over 520ms; checkmark strokes draw before the row slides to Completed.
- FAB/plus sheet enters with physical easing. CIA suggestion actions press-scale to .98 in 150-250ms.
- Haptics: light on completion, medium on reorder drop, success notification when an offline queue syncs.
- **Reduced-motion path:** all row slides, bar fills, and reorder springs snap to final static states; status changes still update text and haptics.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: No live route; stack-pushed task and reminder hub opened from Home, Schedule, Me, or CIA Chat..
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: All checkbox, toggle, plus, back, and drag targets meet the 44px minimum.; Checkbox state is announced as "not done", "done", or "syncing", never by color alone.; Reminder toggles announce channel and next trigger time.
