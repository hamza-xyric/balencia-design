# R16 - Health Utilities And Reporting

- Status: `reviewed`
- Reviewed: 2026-05-27
- Prototype URL: `http://localhost:3000`
- Screens: `60`, `61`, `62`, `63`, `64`
- Routes: `/features/medication`, `/features/reminders`, `/features/quick-notes`, `/features/energy`, `/features/report-block`
- Sources: `../batches/batch-16.md`, `../update-batches/batch-u08.md`, `../screen-iteration-batches/P16-health-utilities-reporting.md`
- Evidence directory: `../../balencia-screens/output/a-plus-plus-review/R16/`
- Interaction evidence: `../../balencia-screens/output/a-plus-plus-review/R16/r16-interaction-evidence.json`
- Build gate: no
- Finding IDs: `R16-F01` through `R16-F05`

## Focus

Validate health logging, reminders, quick notes, energy, and safety/reporting. A++ requires respectful health copy, clear in-session state, privacy clarity, and safe moderation/report flows.

## Batch Summary

- A++: 62 Quick notes.
- A+: 60 Medication tracking, 63 Energy tracking.
- A: 61 Reminders & tasks, 64 Report / block.
- Needs polish: 60, 61, 63, 64.
- Redesign candidates: none.
- User decisions: none.
- Fresh evidence: baseline route screenshots plus 25 interaction-state screenshots under `../../balencia-screens/output/a-plus-plus-review/R16/states/`.
- Verification: `npm run check` passed on 2026-05-27; R16 build gate is not required.

## Screen Notes

### 60 - Medication tracking

- Five-second read: A premium medication adherence hub with a clear wellbeing header, SIA reassurance, today's progress, safety copy, checklist rows, medication list, history, privacy note, and fixed Add medication action.
- Screen purpose and journey fit: Strong fit for a wellbeing utility reached from Explore, Today reminders, or SIA. It now supports the primary daily adherence loop in-session.
- Primary action clarity: Dose rows are clearly tappable and update `3 of 4 today` to `4 of 4 today`; Add medication opens a route-local prototype sheet.
- Emotional tone: Calm, responsible, health-aware, and not alarmist.
- Screenshot/evidence: `../../balencia-screens/output/a-plus-plus-review/R16/states/60-initial.png`; state evidence `60-dose-toggle-complete.png`, `60-add-medication-sheet.png`, `60-see-all-sheet.png`; baseline `../../balencia-screens/output/a-plus-plus-review/R16/60-features-medication-phone.png`.
- Grade: A+
- Grade cap: minor prototype-fidelity finding R16-F05 prevents A++.
- Control inventory: Back link returns to Explore; Lv.7 badge links to RPG; SIA note is informational; medication dose rows toggle taken state and progress; See all opens medication detail/history prototype sheet; medication list rows open route-local detail sheet; adherence heatmap and warning/privacy cards are static informational evidence; Add medication opens a prototype sheet; Done closes sheets; bottom tabs route to primary tabs.

| Dimension | Score | Notes |
| --- | ---: | --- |
| Product sense | 5 | Medication adherence is clearly placed as a wellbeing utility and the hierarchy answers what is due today. |
| User friction | 4 | Primary dose toggling is fast, but Add medication/detail flows stop at a generic prototype sheet. |
| Visual appeal | 5 | Teal wellbeing hierarchy, warm cards, and safety banner are polished and readable. |
| Brand fit | 5 | Teal is domain support, orange owns Add medication, and SIA purple is restrained. |
| Mobile ergonomics | 5 | Captured controls are large enough; dose rows and bottom CTA are reachable. |
| Accessibility | 5 | Main checklist rows are semantic buttons with clear labels and no small-target flags in baseline evidence. |
| Trust/privacy | 5 | Safety and privacy copy are visible and medication data is framed carefully. |
| Industry best practice | 4 | Adherence works, but medication add/edit/history still needs distinct form behavior for final handoff. |

| Finding | Severity | Category | Evidence | User Impact | Recommendation | Status | Grade Cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R16-F05 | minor | prototype-fidelity | `60-add-medication-sheet.png` and `60-see-all-sheet.png` show Add medication, See all, and detail entry all resolving to the same generic sheet copy: "Reminder settings, dose history, interaction notes, and privacy details are available here in prototype state." | Users and Figma handoff still cannot distinguish add form, all-medication list, medication detail, reminder settings, or history behavior from this route alone. | Split Add medication into a distinct form/sheet state with fields and disabled/save behavior, and give See all/detail separate documented states or route-specific sheets. | proposed | Prevents A++ |

Decision: needs polish.

### 61 - Reminders & tasks

- Five-second read: A clean checklist-first reminder hub with today/tomorrow/this-week task groups, active reminder rows, completed tasks, SIA suggestion, and fixed Add CTA.
- Screen purpose and journey fit: Useful task/reminder utility for Today, Schedule, Me, and SIA deep links; the main task completion loop now works.
- Primary action clarity: Task rows toggle completion and SIA suggestion actions produce state feedback, but Add does not open the promised task sheet and reminder toggles can leave contradictory copy.
- Emotional tone: Practical and supportive, but release-readiness issues reduce confidence.
- Screenshot/evidence: `../../balencia-screens/output/a-plus-plus-review/R16/states/61-initial.png`; state evidence `61-task-completed.png`, `61-add-feedback.png`, `61-reminder-toggle.png`, `61-suggested-task-added.png`, `61-ask-sia-feedback.png`; baseline `../../balencia-screens/output/a-plus-plus-review/R16/61-features-reminders-phone.png`.
- Grade: A
- Grade cap: major findings R16-F01 and R16-F02 prevent A+ and A++.
- Control inventory: Back button returns through history/fallback; task rows toggle completed state; reminder rows toggle visual switch state; hidden switch inputs provide switch semantics but are 1x1; Completed list is static evidence; Add suggested task adds the suggestion and status feedback; Ask SIA shows contextual feedback; Add CTA shows an "Add task sheet opened" status only; bottom tabs route to primary tabs.

| Dimension | Score | Notes |
| --- | ---: | --- |
| Product sense | 5 | Checklist-first task/reminder management belongs here and is distinct from Schedule. |
| User friction | 3 | Completing tasks works, but creating a new task/reminder is not actually available from Add. |
| Visual appeal | 5 | Grouped task cards, domain chips, and fixed CTA are composed and premium. |
| Brand fit | 5 | Orange action/completion states and domain tags follow the system. |
| Mobile ergonomics | 5 | Visible row targets and action buttons are comfortably sized. |
| Accessibility | 4 | The duplicate-key runtime issue and 1x1 switch inputs keep the implementation below the A++ accessibility bar. |
| Trust/privacy | 4 | Reminder switches change visuals, but the medication reminder still reads "paused" after being turned on. |
| Industry best practice | 3 | Task apps need stable list identity, real add/edit creation, and consistent reminder state copy. |

| Finding | Severity | Category | Evidence | User Impact | Recommendation | Status | Grade Cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R16-F01 | major | release-readiness | Baseline `61-features-reminders-evidence.json` and fresh `r16-interaction-evidence.json` both record repeated React console errors: duplicate key `Morning supplements`. The visible list also shows Morning supplements in Today and Completed. | Non-unique keys can duplicate, omit, or mis-associate task rows during updates, which is risky for a task/reminder list. | Give Today and Completed rows stable unique IDs or namespace keys by section before Figma handoff. | proposed | Prevents A+ and A++ |
| R16-F02 | major | interaction-fidelity | `61-add-feedback.png` shows only a status message, "Add task sheet opened", with no actual task/reminder sheet. `61-reminder-toggle.png` shows Medication switched on while its copy still says `daily 9:00 PM - paused`. | Users cannot create a task/reminder from the visible Add CTA, and reminder state can become contradictory. | Wire Add to the documented task/reminder chooser or creation sheet, and update each reminder row's next-trigger/status copy when toggled. | proposed | Prevents A+ and A++ |

Decision: needs polish.

### 62 - Quick notes

- Five-second read: A capture-first notes archive with real search, tag filters, note cards, SIA follow-up actions, and a pinned quick-add input.
- Screen purpose and journey fit: Strong fit as the full-screen archive/capture variant for fast health observations; the documented bottom-sheet variant remains covered by the spec.
- Primary action clarity: The pinned quick-add input and send button are obvious; empty send is disabled, and saving inserts a new note with confirmation.
- Emotional tone: Lightweight, calm, and low-friction.
- Screenshot/evidence: `../../balencia-screens/output/a-plus-plus-review/R16/states/62-initial.png`; state evidence `62-search-filtered.png`, `62-health-filter.png`, `62-note-saved.png`, `62-ask-sia-feedback.png`; baseline `../../balencia-screens/output/a-plus-plus-review/R16/62-features-quick-notes-phone.png`.
- Grade: A++
- Grade cap: none.
- Control inventory: Back button returns through history/fallback; search field filters note text; All/Health/Workout/Nutrition/Mood/Idea/Reminder chips filter the archive with selected state; note cards are readable static content; Ask SIA buttons show contextual SIA handoff feedback; bottom quick-add field captures new note text; Save quick note is honestly disabled when empty and creates a note when filled; bottom tabs route to primary tabs.

| Dimension | Score | Notes |
| --- | ---: | --- |
| Product sense | 5 | Fast capture plus archive search solves the quick-note job without turning into long-form journaling. |
| User friction | 5 | Search, filters, quick-add, disabled empty send, and saved-note feedback are all low friction. |
| Visual appeal | 5 | Warm note cards, clear chips, and pinned composer feel premium and focused. |
| Brand fit | 5 | Orange action states, domain tag colors, and SIA purple are balanced. |
| Mobile ergonomics | 5 | Search, chips, Ask SIA, input, and send all meet practical touch expectations. |
| Accessibility | 5 | Inputs and buttons are semantic and labeled, with no console errors. |
| Trust/privacy | 5 | Personal notes are not shared or over-claimed; SIA handoff is explicit. |
| Industry best practice | 5 | Meets expected notes search, filtering, capture, disabled send, and confirmation behavior. |

| Finding | Severity | Category | Evidence | User Impact | Recommendation | Status | Grade Cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| none | none | Fresh interaction evidence shows working search, filter, quick-add save, disabled empty send, Ask SIA feedback, and zero console errors. | No user-facing issue found. | No change needed for Figma handoff. | accepted | none |

Decision: A++.

### 63 - Energy tracking

- Five-second read: A polished energy dashboard with SIA coaching, current energy score, quick-log controls, energy timeline, trend range, peak hours, chronotype, correlations, SIA follow-up, and fixed Log shortcut.
- Screen purpose and journey fit: Strong wellbeing utility; it supports the under-five-second energy logging loop and downstream SIA pattern detection.
- Primary action clarity: Range, context chips, note, Log energy, trend period, Ask SIA more, and bottom Log all produce observable state changes.
- Emotional tone: Insightful, motivating, and not clinical.
- Screenshot/evidence: `../../balencia-screens/output/a-plus-plus-review/R16/states/63-initial.png`; state evidence `63-energy-logged.png`, `63-trend-30d.png`, `63-ask-sia-feedback.png`, `63-bottom-log-scroll.png`; baseline `../../balencia-screens/output/a-plus-plus-review/R16/63-features-energy-phone.png`.
- Grade: A+
- Grade cap: minor accessibility finding R16-F03 prevents A++.
- Control inventory: Back link returns to Explore; Lv.8 badge links to RPG; SIA coaching note is informational; range input changes energy level; context chips set a single selected context; optional note accepts text; Log energy updates current score and confirmation; trend segmented control changes period and average copy; peak/chronotype/correlation cards are static insight evidence; Ask SIA more shows contextual feedback; bottom Log scrolls back to Quick log; bottom tabs route to primary tabs.

| Dimension | Score | Notes |
| --- | ---: | --- |
| Product sense | 5 | Energy logging and trend interpretation are a strong wellbeing/SIA utility. |
| User friction | 5 | Current value, context, note, submit, and confirmation are fast and direct. |
| Visual appeal | 5 | The teal/orange energy system, hero card, and charts feel premium. |
| Brand fit | 5 | Teal supports wellbeing, orange drives action, and purple remains SIA-only. |
| Mobile ergonomics | 5 | Visible controls are reachable, and bottom Log provides a useful shortcut back to logging. |
| Accessibility | 4 | Trend range is implemented as duplicate focusable tab controls, including a transparent overlay layer. |
| Trust/privacy | 5 | No sensitive sharing ask appears, and logged state is clear in-session. |
| Industry best practice | 4 | Core logging works, but the duplicate trend control implementation needs cleanup before Figma/engineering handoff. |

| Finding | Severity | Category | Evidence | User Impact | Recommendation | Status | Grade Cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R16-F03 | minor | accessibility | Baseline `63-features-energy-evidence.json` lists two sets of `7d`, `14d`, and `30d` tab controls. Fresh interaction text also repeats `7d 14d 30d` twice; the visible segmented control is paired with a transparent overlay that handles the actual state change in `63-trend-30d.png`. | Keyboard and screen-reader users may encounter duplicate tabs or an inert-looking control model, even though pointer interaction changes the trend. | Use one semantic segmented control with a real `onValueChange` handler and remove the transparent overlay tablist. | proposed | Prevents A++ |

Decision: needs polish.

### 64 - Report / block

- Five-second read: A serious report/block sheet with entity summary, reason list, optional details, block opt-in, disabled submit, and success/dismiss status feedback.
- Screen purpose and journey fit: Essential safety flow for community/content contexts; the default-off block decision is now respected.
- Primary action clarity: Submit is disabled until a reason is selected, reason selection enables submit, block is opt-in, and submission shows success feedback.
- Emotional tone: Protective and direct, though the sheet presentation currently feels too cramped under the phone top area.
- Screenshot/evidence: `../../balencia-screens/output/a-plus-plus-review/R16/states/64-initial-disabled-submit.png`; state evidence `64-reason-selected.png`, `64-block-opt-in-details.png`, `64-submit-success.png`, `64-cancel-feedback.png`; baseline `../../balencia-screens/output/a-plus-plus-review/R16/64-features-report-block-phone.png`.
- Grade: A
- Grade cap: major accessibility/mobile finding R16-F04 prevents A+ and A++.
- Control inventory: Cancel and close show dismissed status in the standalone route; entity card is static confirmation; reason rows select one reason and enable Submit; textarea accepts optional details; Also block this user row toggles block state from default off; hidden switch input is present but 1x1; Submit report is honestly disabled until a reason is selected, then shows loading/success status; no tab bar is shown, consistent with modal mode.

| Dimension | Score | Notes |
| --- | ---: | --- |
| Product sense | 5 | Reporting and optional blocking are necessary safety actions. |
| User friction | 4 | Reason, details, block opt-in, and submit are straightforward, but dismiss/success closure is incomplete. |
| Visual appeal | 3 | The sheet is readable below the header, but top controls are clipped under the dynamic island/status area. |
| Brand fit | 4 | System mode is appropriately restrained and orange is used for selection/submit. |
| Mobile ergonomics | 3 | Header/cancel placement is unsafe at the top of the phone frame. |
| Accessibility | 3 | Reason rows are buttons rather than a radiogroup, the switch input is 1x1, and top dismiss controls are visually clipped. |
| Trust/privacy | 4 | Block defaults off and submit is gated, but cancel/dismiss does not actually close the modal route. |
| Industry best practice | 3 | Safety sheets need reliable safe-area layout, semantic reasons, true dismissal, and a distinct success state. |

| Finding | Severity | Category | Evidence | User Impact | Recommendation | Status | Grade Cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R16-F04 | major | accessibility | `64-initial-disabled-submit.png` and baseline `64-features-report-block-phone.png` show Cancel/Report/Close clipped under the dynamic island/top edge. `64-cancel-feedback.png` shows Cancel leaves the sheet visible with only `Report dismissed.` status. Baseline evidence also flags the block switch as a 1x1 target, and the reason options are button rows rather than a semantic radiogroup. | Users in a safety flow may struggle to dismiss, understand report reason semantics, or trust that cancel/success completed the flow cleanly. | Add safe-area top spacing or lower the sheet, implement true standalone dismiss/success replacement states, and use semantic radio-group rows plus a full-row switch target. | proposed | Prevents A+ and A++ |

Decision: needs polish.

## Verification

- Fresh interaction capture: passed on 2026-05-27 with `25` state screenshots and JSON at `../../balencia-screens/output/a-plus-plus-review/R16/r16-interaction-evidence.json`.
- `npm run check` from `balencia-screens`: passed on 2026-05-27.
  - `eslint`: passed.
  - `tsc --noEmit`: passed.
  - `verify:routes`: passed, `90 screens, 90 specs`.
  - `verify:assets`: passed, `14 logo assets`.
  - `verify:copy`: passed, `170 files scanned`.
  - `verify:brand`: passed, `170 files scanned`.
- `npm run build`: not required for R16.
