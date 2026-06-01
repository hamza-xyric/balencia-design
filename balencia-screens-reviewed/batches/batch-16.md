# Batch 16 - Health Utilities And Reporting

- Status: `reviewed`
- Screens: 5
- Reviewed: 2026-05-26
- Prototype URL: `http://localhost:3001`
- Visual evidence: `/private/tmp/balencia-b16/*-phone.png`

| ID | Screen | Route | Spec | Status |
| --- | --- | --- | --- | --- |
| 60 | Medication tracking | `/features/medication` | `../app_design 3/60-medication-tracking.md` | `reviewed` |
| 61 | Reminders & tasks | `/features/reminders` | `../app_design 3/61-reminders-tasks.md` | `reviewed` |
| 62 | Quick notes | `/features/quick-notes` | `../app_design 3/62-quick-notes.md` | `reviewed` |
| 63 | Energy tracking | `/features/energy` | `../app_design 3/63-energy-tracking.md` | `reviewed` |
| 64 | Report / block | `/features/report-block` | `../app_design 3/64-report-block.md` | `reviewed` |

## Batch Focus

Validate medication safety, reminder clarity, lightweight capture, energy tracking, and report/block trust.

## Batch Summary

- Ship-ready: None.
- Must-fix: 60 Medication tracking, 61 Reminders & tasks, 62 Quick notes, 63 Energy tracking, 64 Report / block.
- Redesign candidates: 62 Quick notes should be rebuilt around the global bottom-sheet capture experience; 64 Report / block needs a true modal state machine for selection, submit, success, dismissal, and default-off block consent.
- Resolved decisions:
  - Quick Notes V1 should prioritize global bottom-sheet capture; full archive is secondary.
  - Report/Block must keep "also block this user" default off.
  - Medication and energy logs only need in-session front-end state for audit acceptance; no local persistence is required for this pass.

## Screen Notes

### 60 - Medication tracking

- Five-second read: A polished medication adherence hub with SIA reassurance, today's progress, a safety banner, grouped medications, history, and privacy copy.
- Primary action clarity: Marking a medication taken is visually implied, but medication rows are not controls; Add medication and See all are visible but inert.
- Emotional tone: Responsible, calm, and health-aware, with strong teal wellbeing hierarchy.
- Screenshot: `/private/tmp/balencia-b16/features-medication-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | A medication hub belongs in wellbeing and the information hierarchy matches the spec. |
| User friction | 1 | The primary checklist task cannot be performed, and adding medication opens no modal. |
| Visual appeal | 4 | The screen is composed, premium, and readable in the first viewport. |
| Brand fit | 4 | Wellbeing teal and restrained SIA purple are used well; orange is reserved for the primary CTA. |
| Mobile ergonomics | 3 | The Add medication CTA is comfortable, but row checkboxes are visual-only and compact secondary targets are small. |
| Accessibility | 1 | Evidence found no inputs or checkbox roles for the medication checklist. |
| Trust/privacy | 2 | Safety and privacy copy exist, but medication detail, reminder, interaction, and history controls are not available. |
| Industry best practice | 1 | Medication tracking requires reliable taken/not-taken state, add/edit flows, history, reminders, and safety detail. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | retention | Evidence found `0` inputs/switches and `checklistControlCount: 0`; Metformin, Vitamin D, Lisinopril, and Magnesium rows render as static div/span content. Clicking Add medication left `/features/medication` unchanged with no modal or text change. | Users cannot mark a dose taken, correct adherence, or add the medications this screen manages. | Render medication rows as semantic checkbox/buttons with persisted taken state, undo, missed-dose handling, and wire Add medication to the full medication form. | proposed |
| major | trust-privacy | Clicking See all left `/features/medication` unchanged; the warning banner and medication cards do not expose interaction details, reminder settings, medication detail, or privacy controls. | Users see sensitive medical information but cannot inspect safety context, reminder configuration, or historical data provenance. | Add medication detail/history/reminder routes or sheets, make See all functional, and link safety/privacy copy to explanatory detail. | proposed |
| minor | mobile-ergonomics | Evidence measured See all at 43x18 and the Lv.7 badge at 49x28; checklist visuals are 24x24 without a 44px semantic hit area. | Secondary controls and checklist targets are less forgiving on mobile. | Expand compact hit areas to at least 44px while preserving the visual size. | proposed |

Decision: Must fix before launch.

### 61 - Reminders & tasks

- Five-second read: A clean checklist-first task manager with today, tomorrow, this week, reminders, completed tasks, and a SIA suggestion.
- Primary action clarity: Add is visible and task completion looks obvious, but task rows are not operable and suggestion actions are no-ops.
- Emotional tone: Practical and supportive, though the static checklist makes the promise feel unfinished.
- Screenshot: `/private/tmp/balencia-b16/features-reminders-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | A checklist-first reminder hub is useful and distinct from the calendar. |
| User friction | 1 | Users cannot complete tasks, open task detail, or add a new reminder from the visible controls. |
| Visual appeal | 4 | The grouped cards are readable and fit Balencia's dark mobile surface. |
| Brand fit | 4 | Orange, wellbeing, and nutrition tags support the task hierarchy without visual noise. |
| Mobile ergonomics | 2 | Several visible actions are 36px or smaller, and switches expose 1x1 native inputs. |
| Accessibility | 1 | Back is not semantic, task rows are static, and switches require hidden input handling rather than full-row toggles. |
| Trust/privacy | 3 | Reminder content is clear, but toggles and completion state do not behave like reliable scheduling controls. |
| Industry best practice | 1 | Task apps need completion, edit/detail, add, recurrence, reminder toggles, and state persistence. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | retention | Evidence found `taskSemanticControls: 0`; Take vitamin D, Call Dr. Patel, Review meal plan, and Morning supplements are static rows. Add as task and Ask SIA left `/features/reminders` unchanged with no text change. | Users cannot complete, edit, create, or convert tasks from the screen's main checklist. | Make task rows semantic controls with checkbox completion, body tap to detail, swipe actions, Add task/reminder sheet, and SIA suggestion conversion. | proposed |
| major | navigation | The visible back chevron comes from the shared Header `div`; evidence found `backLinks: 0`. The Add locator also matched two controls because Add and Add as task are not clearly disambiguated. | Users lose reliable stack navigation and assistive tech gets ambiguous command names. | Render Back as a labeled 44px link/button and use distinct labels such as Add task and Add suggested task. | proposed |
| major | accessibility | Switches are exposed as 1x1 hidden inputs with a 34x20 visual track; a normal pointer click on Toggle Water intake was intercepted by the visual span before forced state setting. Add as task and Ask SIA measure 36px high. | Reminder toggles and secondary actions are difficult or unreliable for motor and assistive-tech users. | Make the full reminder row or a 44x44 switch target toggle state, preserve switch semantics, and update next-trigger/channel copy after changes. | proposed |

Decision: Must fix before launch.

### 62 - Quick notes

- Five-second read: A notes archive with search, filters, recent note cards, Ask SIA actions, and a pinned quick-add surface.
- Primary action clarity: The capture affordance is visible at the bottom, but it is not a real input or send button.
- Emotional tone: Lightweight and calm, but slower than the spec's capture-first promise.
- Screenshot: `/private/tmp/balencia-b16/features-quick-notes-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | Fast health-note capture is valuable and fits SIA's cross-domain memory layer. |
| User friction | 1 | The primary capture and search tasks cannot be performed because the route has no inputs. |
| Visual appeal | 3 | The archive cards look decent, but neutral note tags and cramped first-viewport filtering reduce polish. |
| Brand fit | 3 | The dark/orange system is present, but domain tags do not inherit their intended colors. |
| Mobile ergonomics | 3 | Filters are thumb-friendly enough horizontally, but Ask SIA links are tiny and the quick-add bar is display-only. |
| Accessibility | 1 | Search and quick add are not semantic fields, and Ask SIA buttons are 43x14. |
| Trust/privacy | 3 | Note content is personal, but no privacy controls are asked for on this archive route. |
| Industry best practice | 1 | Notes apps need focused text input, send/save states, search, filters, delete/edit, and reliable AI follow-up. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | retention | Evidence found `inputLikeControls: 0`, `searchIsInput: false`, and `quickAddButtons: []`; the search bar and bottom quick-add bar are static div/span content. | Users cannot capture a quick note, search notes, or send the thought that this feature exists to preserve. | Build a real auto-focused quick-add input with send/save, keyboard behavior, empty/error states, and a real search input for archive mode. | proposed |
| major | navigation | Clicking Ask SIA on the first note and clicking the Health filter both left `/features/quick-notes` unchanged with no text change. | Users cannot filter the archive or turn a note into a coaching conversation. | Make filters stateful with selected semantics and route Ask SIA to `/tabs/sia` with note context. | proposed |
| minor | design-system-consistency | Note tags such as Nutrition, Workout, Health, Mood, and Idea render with `bg-white/[0.06] text-white/50` because the implementation's tag color map expects lowercase keys while mock tags are title case. | Tags lose domain-color scanning value and feel lower fidelity than other domain surfaces. | Normalize tag keys before lookup or store tags in canonical lowercase plus display labels. | proposed |

Decision: Must fix before launch; redesign candidate if the global bottom-sheet capture model is still the intended primary experience.

### 63 - Energy tracking

- Five-second read: A premium energy dashboard with SIA coaching, current score, quick-log controls, charts, peak hours, chronotype, correlations, and a bottom Log CTA.
- Primary action clarity: Log energy is visible, but slider, context tags, optional note, chart range, and SIA follow-up are mostly static.
- Emotional tone: Insightful and encouraging; the static controls undercut the habit-building premise.
- Screenshot: `/private/tmp/balencia-b16/features-energy-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | Energy logging and pattern detection are a strong wellbeing utility for SIA. |
| User friction | 1 | The under-five-second log flow cannot be completed. |
| Visual appeal | 4 | The current energy hero and teal wellbeing hierarchy feel polished and premium. |
| Brand fit | 4 | Teal owns the wellbeing state and purple stays limited to SIA insight. |
| Mobile ergonomics | 2 | First viewport controls are visible, but range/tags/note are non-controls and 7d/14d/30d tabs are 26px tall. |
| Accessibility | 1 | The slider has no range semantics, context tags are spans, note is a div, and Ask SIA more is static text. |
| Trust/privacy | 3 | Energy data is sensitive enough to need reliable logging and correction, but no sharing ask appears here. |
| Industry best practice | 1 | Energy trackers need real range input, context selection, note entry, submit confirmation, trend filters, and coaching follow-up. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | retention | Evidence found `rangeInputs: 0`, `textInputs: 0`, and `contextTagButtons: 0`; clicking Log energy left `/features/energy` unchanged with no visible state change. | Users cannot record the current energy signal, which blocks the screen's habit loop and downstream SIA insights. | Replace the visual slider/tags/note with semantic controlled inputs, enabled submit, success/reset, undo, and persistence or local prototype state. | proposed |
| major | information-architecture | Clicking the 30d tab left the route/text unchanged; `siaInsightButtons: 0` even though the card shows Ask SIA more. The bottom Log locator matched two controls because the fixed CTA duplicates Log energy language. | Users cannot change trend scope, follow up with SIA, or understand whether the bottom Log is distinct from the inline Log energy button. | Wire trend segmented-control state, make Ask SIA more a contextual link/button, and either scroll the bottom Log to Quick log or remove the duplicate action. | proposed |
| major | accessibility | The 7d/14d/30d tab buttons measure 110x26, the Lv.8 badge is 50x28, and the core slider has no keyboard or screen-reader range behavior. | Users relying on assistive tech cannot set or understand the energy value reliably. | Use a labeled range input, 44px segmented controls, accessible selected states, and live confirmation after logging. | proposed |

Decision: Must fix before launch.

### 64 - Report / block

- Five-second read: A report sheet over a dimmed background with entity summary, reasons, an optional detail field, block toggle, and submit button.
- Primary action clarity: Submit report is clear, but report reason, text entry, cancel, submit, and success/dismiss behavior are not functional.
- Emotional tone: Serious and protective, though preselecting Other and block-on creates avoidable trust risk.
- Screenshot: `/private/tmp/balencia-b16/features-report-block-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | A fast report/block sheet is essential for community safety. |
| User friction | 1 | The report cannot be submitted, dismissed, or edited. |
| Visual appeal | 3 | The sheet is readable and direct, but it sits high under the dynamic island and lacks the default-state clarity from the spec. |
| Brand fit | 3 | Orange action treatment is consistent, but system/safety mode should feel more neutral and careful around destructive blocking. |
| Mobile ergonomics | 2 | Submit is strong, but Cancel is only 46x18 and form controls are not real touch controls. |
| Accessibility | 1 | Evidence found no radio inputs, no textarea, and only a 1x1 switch input for blocking. |
| Trust/privacy | 1 | Other and Also block this user are preselected, and Submit does nothing. |
| Industry best practice | 1 | Reporting flows need explicit reason selection, optional details, disabled/enabled submit, block opt-in, success, error, and dismiss states. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | trust-privacy | Evidence found `radioInputs: 0`, `textareaCount: 0`, and `reasonButtons: 0`; Other is visually selected from mock data and Submit report is enabled. Clicking Submit report left `/features/report-block` unchanged with no success or error state. | Users cannot accurately report harmful content, and the UI implies a report can be submitted when no real selection/submission flow exists. | Build a real modal state machine with radio inputs, optional textarea, disabled submit until reason selection, loading, success, error, auto-dismiss, and source-screen return. | proposed |
| major | trust-privacy | The block switch is on by default in the live route, while the spec says the optional block toggle defaults off. Forced switch state changed the hidden input but did not update copy or show confirmation. | Users may unintentionally block someone while reporting, which is a sensitive moderation action. | Default block off unless explicitly justified, require clear opt-in, persist the block state, and show conditional success copy only after submission. | proposed |
| major | accessibility | Cancel measures 46x18, report reasons are static rows, the optional details field is a div, and the switch input is 1x1. | Keyboard, screen-reader, and motor users cannot choose a reason, add context, or reliably cancel/block. | Use semantic radio rows, textarea, 44px cancel/close target, full-row switch target, focus trapping, and Escape/backdrop dismissal. | proposed |

Decision: Must fix before launch; redesign candidate for the reporting modal state model.

## Verification

- Targeted visual/interaction evidence: `/private/tmp/balencia-b16/report.json`.
- Screenshots captured for all five routes under `/private/tmp/balencia-b16/`.
- `npm run verify:routes`: passed, `90 screens, 90 specs`.
- `npm run check`: failed during lint on pre-existing generated file `balencia-screens/dev/types/routes.d.ts` for two `@typescript-eslint/no-empty-object-type` errors.
