# 38-habits - A+++ hi-fi mobile spec

## Header
- **Source ID:** 38
- **Source spec:** `Balencia-New-Screens/screens/38-habits.md`
- **Evidence:** screens/38-habits.md, work/briefs/38.md, work/drafts/38.md, Functional Content Brief 38, habit dashboard source notes, Balencia Glass Canon v1
- **Route(s):** `/wellbeing/habits`
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Gives the user a daily habit command center that answers "what do I do today, and how consistent am I?" It turns small repeated actions into a clear, non-shaming checklist, then lets CIA connect habit consistency to energy, sleep, stress, and goal progress.
- **Premium Visual Director:** make Habits hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Habits uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+---------------------------------------------+
|  <  Habits                         bell gear |
|                                             |
|  +---------------------------------------+  |
|  | momentum today                        |  |
|  | 5 of 8 habits                 21 days |  |
|  | ##################  62%               |  |
|  | you logged  synced locally           |  |
|  +---------------------------------------+  |
|                                             |
|  [ today ] [ week ] [ month ]              |
|                                             |
|  Morning                                    |
|  +---------------------------------------+  |
|  | [x] drink water        07:30  health   |  |
|  | [x] stretch            08:00  fitness  |  |
|  +---------------------------------------+  |
|  Afternoon                                  |
|  +---------------------------------------+  |
|  | [ ] walk 10 min        due now         |  |
|  | [ ] deep work block    14:00  career   |  |
|  +---------------------------------------+  |
|                                             |
|  +---------------------------------------+  |
|  | consistency                            |  |
|  | # # # # # # #   # # # # # # #         |  |
|  +---------------------------------------+  |
|  +---------------------------------------+  |
|  | CIA: sleep is strongest on stretch...  |  |
|  | [ ask CIA why ]                        |  |
|  +---------------------------------------+  |
|                         (+)                 |
|        Today      CIA      Goals      Me    |
+---------------------------------------------+

Route handling: `/wellbeing/habits`
```

## Focal Hierarchy
- **Dominant focal moment:** Habits hero; it should be visually singular, not one tile among many.
- **Secondary layer:** Atmosphere with CIA only when the source supports a synthesized read.
- **Operational layer:** TopBar, Hero Momentum Card, View Switcher, Today Checklist.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*habits*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar** - transparent, gains `.glass-pill` backing after scroll.
- **GlassStatCard** - hero momentum card with `--glow-you` while work remains and `--glow-done` when complete.
- **MomentumBar** - completion bar using fixed height and tabular numbers.
- **SegmentedTabs** - today, week, month view switcher.
- **SolidCard** - grouped checklist containers and analytics block.
- **NEW: HabitRowCard** - compact row with checkbox, schedule, domain chip, drag handle, and skipped state. The catalog list row is too general for recurrence and streak metadata.
- **NEW: WeeklyBarChart** - seven fixed bars for completed habits per day; used inside the week tab.
- **CalendarHeatmap** - four-week consistency map.
- **CIAInsightCard** - pattern read with evidence chips.
- **ChipProvenance** and **ChipDomainTag** - source and domain labels.
- **FABQuickLog** and **GlassNavBar** - global add/navigation controls.

## Data Honesty
- **Completion count**
- - **Real:** `5 of 8 habits` with `you logged`.
- - **Low-confidence:** `about 5 of 8 habits` with `estimated - low confidence` when sync is incomplete.
- - **Honest-null:** `No habits yet` with the add action.
- **Current streak**
- - **Real:** `21 day streak` with `calculated locally`.
- - **Low-confidence:** `21 day streak` muted with `sync pending`.
- - **Honest-null:** Hidden until at least two completed days exist.
- **Heatmap**
- - **Real:** Filled blocks from local completions.

## Consent and Safety
- Habits uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- Keep navigation targets aligned to `/wellbeing/habits`. Do not add alternate vanity routes.

## States
- **Default:** Hero, tabs, grouped checklist, heatmap, and CIA card render with real or honest-null data.
- **Skeleton:** Hero count, segmented tabs, and checklist rows use geometry-matched shimmer. No placeholder numbers.
- **Empty:** Checklist collapses into the low-friction prompt `Pick one. That's enough.` with `Add habit`.
- **Error:** Cached habit rows remain interactive when safe. Failed sync shows an inline `ErrorState` above the first group.
- **Success:** Checked row fills the mark, mutes the row, updates the hero count, and flashes green only if all habits are complete.
- **Disabled:** Reminder controls and add button dim to 40% with a screen-reader reason when permissions or entitlement block them.
- **Offline:** Local checks queue with an orange cloud chip and reconcile after sync.

## Motion
- **Load:** Hero rises 8px and fades over 200ms; groups cascade at 60ms intervals.
- **Check action:** Check stroke draws in 180ms, row content shifts to completed styling, and haptic feedback fires once.
- **Reorder:** Long-press exposes drag handles; rows lift into a glass-pill shadow while the list keeps fixed row heights.
- **Tabs:** Today, week, and month crossfade charts without changing the top hero geometry.
- **Glow behavior:** Hero breathes subtly while there are unchecked habits. Completion flash is a single 600ms green pulse.
- **Reduced-motion:** Row checks become instant state changes; cascades and glow breathing are disabled.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/wellbeing/habits`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** Paper text on dark solid and glass surfaces meets AA+; completion is shown by check state and text, not color alone.; **Targets:** Habit rows, checkboxes, chips, FAB, and tabs maintain 44px minimum targets.; **Screen-reader labels:** Checkbox rows announce habit name, due time, completion state, and streak impact.
