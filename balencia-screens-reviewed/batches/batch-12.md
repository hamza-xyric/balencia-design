# Batch 12 - More Domains And Journal

- Status: `reviewed`
- Screens: 5
- Reviewed: 2026-05-26
- Prototype URL: `http://localhost:3001`
- Visual evidence: `/private/tmp/balencia-b12/*-phone.png`

| ID | Screen | Route | Spec | Status |
| --- | --- | --- | --- | --- |
| 34 | Spirituality dashboard | `/domains/spirituality` | `../app_design 3/34-spirituality-dashboard.md` | `reviewed` |
| 35 | Learning dashboard | `/domains/learning` | `../app_design 3/35-learning-growth-dashboard.md` | `reviewed` |
| 36 | Creativity dashboard | `/domains/creativity` | `../app_design 3/36-creativity-dashboard.md` | `reviewed` |
| 70 | Exercise library | `/domains/exercise-library` | `../app_design 3/70-exercise-library.md` | `reviewed` |
| 37 | Journal | `/features/journal` | `../app_design 3/37-journal.md` | `reviewed` |

## Batch Focus

Validate domain differentiation, exercise browsing, and journal emotional quality.

## Batch Summary

- Ship-ready: None.
- Must-fix: 34 Spirituality dashboard, 35 Learning dashboard, 36 Creativity dashboard, 70 Exercise library, 37 Journal.
- Redesign candidates: 70 Exercise library needs its utility model rebuilt around real search/filter/detail states while preserving source context; 37 Journal needs the writing, archive, privacy, and premium AI boundary model before polish.
- Resolved decisions:
  - Spirituality must be belief-adaptive; include a Muslim configured demo state, but also unconfigured and other-belief states.
  - Exercise Library should preserve source context; canonical owner is Fitness/Today, with Goals workout-planning entry supported.
  - Free journaling includes write/read/edit/delete/basic search; premium gates SIA prompts, analysis, memory ingestion, and voice transcription.

## Screen Notes

### 34 - Spirituality dashboard

- Five-second read: A warm, polished spirituality dashboard centered on prayer consistency, Quran reading, a Ramadan fast, reflection, prayer times, and contemplation shortcuts.
- Primary action clarity: The primary practice-tracking task is visually obvious, but practice rows and timer shortcuts are static; only Ask SIA navigates.
- Emotional tone: Calm and reverent, but the hard-coded faith state needs stronger personalization and trust framing.
- Screenshot: `/private/tmp/balencia-b12/domains-spirituality-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | A spirituality domain belongs in Balencia and the card stack matches the spec, but the live state reads as one fixed Islamic configuration rather than an adaptive model. |
| User friction | 1 | The main practice, reading, reflection, and timer actions do not update state or open the specified sheets/modals. |
| Visual appeal | 4 | The first viewport is composed, premium, and readable with strong purple/orange hierarchy. |
| Brand fit | 3 | Faith purple is controlled and SIA is restrained, but the live level shows `Lv.4` while the spec calls for `Lv.3`. |
| Mobile ergonomics | 2 | Primary rows are large, but Log reading and Write reflection are 20px tall, Ask SIA is 32px tall, and the streak button is 36px tall. |
| Accessibility | 2 | Practice checkmarks and timer cards are nonsemantic, and the screen reports 0 inputs despite multiple logging tasks. |
| Trust/privacy | 2 | Faith content, prayer location, and religious text references appear without belief setup, source qualification, or privacy framing. |
| Industry best practice | 1 | Daily practice trackers need toggleable rows, logging sheets, timer launch, schedule settings, and saved completion feedback. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | retention | Live report found `0` inputs, `3` buttons, and `3` links. Clicking `Fajr` left `/domains/spirituality` unchanged with no text or completion-state change; the practice checkboxes are rendered as spans, not controls. | Users cannot complete the screen's most frequent daily task, so the spirituality dashboard becomes decorative instead of useful. | Make every practice row a semantic 44px toggle with completion, undo, missed/late states, XP feedback, persistence, and accessible labels. | proposed |
| major | navigation | `Log reading`, `Write reflection`, and `Meditate` clicks left the route unchanged with no dialog; the report measured Log reading and Write reflection at 20px tall. | Users cannot log reading, write a reflection, or start contemplation from the visible CTAs. | Wire log-reading and reflection bottom sheets, timer modals, loading/saved/error states, and 44px hit areas for compact text actions. | proposed |
| major | trust-privacy | The live screen hard-codes Fajr/Dhuhr/Asr/Maghrib/Isha, Quran progress, Ramadan fasting, and `Dubai, UAE`; the spec says spirituality adapts to stated beliefs and authenticated religious references. | Users outside this configuration may feel unseen or may distrust SIA's religious handling, especially around source authority and location-sensitive prayer times. | Add belief/unconfigured states, explicit source and location provenance, qualified-reference rules, and adaptive labels before treating the route as the general spirituality dashboard. | proposed |
| minor | design-system-consistency | The live header shows `Lv.4`; the Screen 34 spec calls for `Lv.3`. | RPG/domain fixture mismatch can make the domain system feel inconsistent across dashboards. | Align the fixture/spec level or document why the spirituality level changed. | proposed |

Decision: Must fix before launch; the emotional direction is strong, but the practice, logging, and belief-adaptive state model need implementation.

### 35 - Learning dashboard

- Five-second read: A clear learning dashboard with SIA pace insight, active book progress, suggested actions, goals, library, activity, and a bottom Log session CTA.
- Primary action clarity: Log session is prominent but does nothing; Reflect and active mission links navigate, but most learning controls are inert.
- Emotional tone: Productive, calm, and on-brand for a study coach.
- Screenshot: `/private/tmp/balencia-b12/domains-learning-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | The dashboard answers what to study and how progress is going; the structure is a good domain-template variant. |
| User friction | 2 | Core learning tasks cannot be completed from the dashboard even though navigation to Journal and goals works. |
| Visual appeal | 4 | Strong cyan domain identity, readable book card, and good first-viewport hierarchy. |
| Brand fit | 4 | Cyan, orange, and purple stay in the intended roles. |
| Mobile ergonomics | 3 | Log session is reachable at 48px, but Reflect is 32px tall and suggestion checkboxes are visual-only 24px squares. |
| Accessibility | 2 | Suggested actions are static rows, the SIA note is not a control, and several progress/state visuals lack alternate interaction. |
| Trust/privacy | 4 | Low sensitive-data risk; SIA's pace claim is understandable from the visible reading data. |
| Industry best practice | 2 | Learning trackers should allow session logging, action completion, book/course detail, library browsing, and SIA follow-up. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | retention | Live report found `0` inputs and `0` dialogs. Clicking `Log session` left `/domains/learning` unchanged with no text or state change. | Users cannot record the study session that the screen names as its primary action. | Implement a log-session sheet with activity type, duration, book/course selection, notes, save/cancel, validation, and saved-state feedback. | proposed |
| major | retention | Clicking `Read chapter 7` left the route and text unchanged; the SIA suggested-action checkboxes are spans rather than semantic controls. | SIA's recommended next steps cannot become progress, weakening the coaching loop and XP feedback. | Render suggestions as 44px buttons/checkboxes with completion state, XP animation, undo, and refresh/ask-for-more behavior when all are complete. | proposed |
| major | navigation | Clicking the SIA pace note and `See all` left `/domains/learning` unchanged; only active mission cards and `Reflect` navigate. | Users cannot ask SIA about the pace insight, open the active book/course, or browse the full library from the dashboard. | Make the SIA note link to contextual SIA chat, make the current item and library rows open details, and wire See all to the full library view. | proposed |

Decision: Must fix before launch; the static visual structure is close, but learning session logging and SIA/action completion must work.

### 36 - Creativity dashboard

- Five-second read: A polished creativity hub with a coaching note, active projects, an inspiration prompt, weekly practice, goals, streak, timeline, and Log session CTA.
- Primary action clarity: Log session is clear, but the CTA and Start creating do not start a creative session.
- Emotional tone: Encouraging and warm, with enough creative specificity to feel distinct from Learning.
- Screenshot: `/private/tmp/balencia-b12/domains-creativity-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | Creativity has a useful differentiated dashboard pattern with projects, prompts, practice heatmap, and journey history. |
| User friction | 2 | The visible creation and project-management actions are mostly static. |
| Visual appeal | 3 | The first viewport is attractive, but the bottom action partially covers the next prompt card on the phone evidence. |
| Brand fit | 4 | Amber domain color, orange action color, and small purple SIA indicators are well balanced. |
| Mobile ergonomics | 2 | Log session is reachable, but See all is 36px, Reflect on this is 32px, and Start creating is not a real target. |
| Accessibility | 2 | Active projects and Start creating are nonsemantic; timeline and heatmap are visual summaries without operable details. |
| Trust/privacy | 4 | Creative data is personal but not highly sensitive; no risky permission or AI authority claim appears. |
| Industry best practice | 2 | Creative practice tools need project detail, session logging, prompt start/reflection flows, and browsable history. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | retention | Clicking `Log session` left `/domains/creativity` unchanged with `0` dialogs; clicking `Start creating` also changed no route or text, and Start creating is rendered as a span. | Users cannot record creative work or act on the inspiration prompt, blocking the dashboard's main loop. | Wire Log session and Start creating to a session logging modal prefilled with prompt/project context, plus save/cancel/error states. | proposed |
| major | navigation | Clicking `Short film script` and `See all` left the route unchanged; active project rows are divs and See all is a no-op button. | Users cannot inspect project milestones, update progress, or browse the full project list. | Make project rows semantic links/buttons, add project detail or inline expansion, and wire See all to the project library. | proposed |
| major | navigation | The SIA coaching note is static; only `Reflect on this` navigates to Journal, while the spec says the coaching note should open contextual SIA and prompt reflection should arrive preloaded. | Users lose the strongest coaching paths: asking why a pattern matters and carrying the creative prompt into reflection. | Link the coaching note to SIA with creativity context, make prompt chips semantic 44px controls, and pass prompt context into Journal. | proposed |

Decision: Must fix before launch; domain differentiation is good, but the creative practice loop is not yet functional.

### 70 - Exercise library

- Five-second read: A compact exercise browse screen with search styling, filter chips, a 532-exercise count, and a two-column exercise grid.
- Primary action clarity: Search/filter/select intent is obvious, but search is not an input, filters do not filter, and exercise cards do not open details.
- Emotional tone: Practical and utilitarian; less premium than the domain dashboards because cards rely on generic dumbbell placeholders.
- Screenshot: `/private/tmp/balencia-b12/domains-exercise-library-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | A searchable exercise database belongs in the fitness stack and supports workout planning. |
| User friction | 1 | Search, filters, exercise selection, detail sheets, and add-to-workout behavior are unavailable. |
| Visual appeal | 3 | The layout is clean, but generic placeholders and visible mismatch between 532 count and six rendered cards weaken credibility. |
| Brand fit | 3 | Orange filter/difficulty roles are correct, but the route uses Me tab context instead of the specified Fitness/Today or Goals workout stack. |
| Mobile ergonomics | 2 | Two-column grid scans well, but filter chips are 36px tall and the visible back control is not interactive. |
| Accessibility | 1 | The search surface is a div, filters lack selected semantics, and exercise cards are nonsemantic cards. |
| Trust/privacy | 4 | Low privacy risk; the main trust issue is accuracy/completeness of the exercise database. |
| Industry best practice | 1 | Exercise libraries need real search, filters, virtualized results, exercise detail, instruction content, and optional add-to-workout. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | information-architecture | Live report found `0` inputs. Clicking `Search exercises...`, `Upper body`, and `Dumbbells` left the route, text, and `532 exercises` count unchanged; only six exercise cards are rendered from the mock data. | Users cannot search or narrow the library, and the 532-count promise feels untrustworthy. | Replace the static search bar with a debounced input, implement filter state and result-count updates, and back the grid with virtualized full exercise data plus empty/loading/error states. | proposed |
| critical | navigation | Clicking `Bench press` left `/domains/exercise-library` unchanged with `0` dialogs; exercise cards are rendered as cards, not buttons or links. | Users cannot inspect form instructions, muscles, equipment, mistakes, variations, or add an exercise to a workout. | Make exercise cards semantic 44px targets that open the Exercise Detail bottom sheet, with conditional Add to workout behavior when entered from planning. | proposed |
| major | information-architecture | The screen uses `activeTab="me"` and the shared `Header` back chevron is a static div; the spec places this screen in the Today/Fitness or Goals workout stack with a stack-pop back action. | Users may lose context and cannot use the visible back affordance to return to the workout or fitness flow. | Preserve source stack context, set the correct active tab, and render Back as a labeled 44px link/button. | proposed |
| major | accessibility | Filter chips are 36px tall and do not expose selected state; there are no accessible labels for search or exercise cards. | Keyboard, screen-reader, and motor users cannot reliably operate or understand the library. | Add `aria-pressed`/selected semantics, 44px hit areas, search label, card labels like name/muscle/difficulty, and focus states. | proposed |

Decision: Must fix before launch; redesign candidate until the search/filter/detail model is functional.

### 37 - Journal

- Five-second read: A calm private journal surface with a strong SIA prompt, entries/check-ins toggle, recent entries, mood/tags, and a bottom Write CTA.
- Primary action clarity: Write is obvious but does not open the editor; the prompt chip is also inert.
- Emotional tone: Warm, reflective, and appropriately private in visual tone.
- Screenshot: `/private/tmp/balencia-b12/features-journal-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | A private reflection space is a strong fit for Balencia and supports SIA memory across domains. |
| User friction | 1 | The user cannot write, open, edit, or switch journal modes from the live screen. |
| Visual appeal | 4 | The prompt, entries list, mood, and tags are polished and emotionally appropriate. |
| Brand fit | 4 | Purple marks SIA, orange marks creation, and domain tag colors are restrained. |
| Mobile ergonomics | 2 | The bottom Write CTA is comfortable, but Write about this is 32px and tab buttons are 26px tall. |
| Accessibility | 1 | Entry rows are static articles, Back is not semantic, and no editor inputs or modal semantics exist. |
| Trust/privacy | 3 | The screen feels private visually, but journal privacy, SIA memory use, and voice-entry retention are not explained. |
| Industry best practice | 1 | Journaling tools need editable text entry, draft/save, entry detail, archive browsing, mode switching, and delete/edit flows. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | retention | Live report found `0` inputs and `0` dialogs. Clicking `Write` and `Write about this` left `/features/journal` unchanged with no text or dialog change. | Users cannot perform the primary journal-writing task. | Implement the writing bottom sheet with textarea/rich text, prompt prefill, domain tags, mood selector, save/cancel, drafts, unsaved-change confirmation, and error states. | proposed |
| major | navigation | Clicking `May 20, 2026` left the route unchanged; a precise role-tab check showed clicking `Check-ins` left `aria-selected="false"` and did not change text. | Users cannot read full entries or switch to daily check-in history, so the archive is not usable. | Make entry rows semantic links/buttons to full entry view and wire the Entries/Check-ins segmented state with read-only check-in details. | proposed |
| major | accessibility | The shared header renders Back as a static div; Write about this is 32px tall, tab buttons are 26px tall, and journal entry rows are noninteractive articles. | Navigation and archive use are unreliable for keyboard, screen-reader, and motor users. | Render Back as a labeled 44px control, expand compact action/tab hit areas, and expose entry row labels, mood, tags, and voice indicators. | proposed |
| major | trust-privacy | The spec includes SIA prompts/analysis and voice transcription, but the live screen does not explain whether entries feed SIA memory, whether voice audio is retained, or what is free vs premium. | Users may hesitate to write sensitive reflections without understanding privacy and AI use. | Add concise journal privacy and SIA-memory controls, voice retention guidance, and clear free/premium boundaries for prompts and analysis. | proposed |

Decision: Must fix before launch; redesign candidate until writing, archive, privacy, and mode states exist.

## Verification

- `npm run verify:routes`: passed, `90 screens, 90 specs`.
- `npm run check`: failed during lint on pre-existing generated file `balencia-screens/dev/types/routes.d.ts` for two `@typescript-eslint/no-empty-object-type` errors.
- Focused visual/interaction report: `/private/tmp/balencia-b12/report.json`.
