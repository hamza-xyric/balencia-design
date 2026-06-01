# Batch 11 - Core Domain Details

- Status: `reviewed`
- Screens: 5
- Reviewed: 2026-05-26
- Prototype URL: `http://localhost:3001`
- Visual evidence: `/private/tmp/balencia-b11/*-phone.png`

| ID | Screen | Route | Spec | Status |
| --- | --- | --- | --- | --- |
| 29 | Meal detail | `/domains/meal` | `../app_design 3/29-meal-detail-food-logger.md` | `reviewed` |
| 30 | Finance dashboard | `/domains/finance` | `../app_design 3/30-finance-money-map-dashboard.md` | `reviewed` |
| 31 | Budget detail | `/domains/budget` | `../app_design 3/31-transaction-budget-detail.md` | `reviewed` |
| 32 | Career dashboard | `/domains/career` | `../app_design 3/32-career-work-dashboard.md` | `reviewed` |
| 33 | Relationships dashboard | `/domains/relationships` | `../app_design 3/33-relationships-dashboard.md` | `reviewed` |

## Batch Focus

Validate logging friction, money clarity, career usefulness, and emotional safety in relationships.

## Batch Summary

- Ship-ready: None.
- Must-fix: 29 Meal detail, 30 Finance dashboard, 31 Budget detail, 32 Career dashboard, 33 Relationships dashboard.
- Redesign candidates: 29 Meal detail needs explicit meal-detail and food-logging modes backed by a shared component; 31 Budget detail needs explicit transaction-vs-budget context before polish.
- Resolved decisions:
  - Split meal detail and food logging into separate explicit routes or route modes backed by one shared component.
  - Keep a shared finance detail component, but pass explicit `type` plus ID/context from the dashboard.
  - Relationship nudges need per-person/data-category consent, snooze/dismiss, intensity controls, and no contact-pattern inference without opt-in.

## Screen Notes

### 29 - Meal detail

- Five-second read: A compact food logger with search, meal tabs, recent/frequent foods, and an expanded quick-add item.
- Primary action clarity: The logging intent is clear, but search is not an input and every logging/scanning/manual-entry button is inert.
- Emotional tone: Efficient and premium at first glance, but it feels staged once tapped.
- Screenshot: `/private/tmp/balencia-b11/domains-meal-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 3 | Food logging belongs after Nutrition, but the live route only renders logging mode and omits the meal-detail view promised by the spec. |
| User friction | 1 | The core task cannot be performed: there are 0 inputs and 13 visible buttons all leave route/text unchanged. |
| Visual appeal | 4 | The dark card stack, segmented meal selector, and expanded item are composed and on-brand. |
| Brand fit | 4 | Nutrition remains calm and task-focused; green completion color is used appropriately. |
| Mobile ergonomics | 2 | Scan buttons are 40x40, meal tabs are 83x30, plus buttons are 32x32, and the expanded add button is 40px tall. |
| Accessibility | 1 | Search is static text, portion is a div, and quick-add buttons lack sufficient target size/state. |
| Trust/privacy | 4 | No sensitive permission is requested yet, but barcode/receipt capture needs a real permission/error flow. |
| Industry best practice | 1 | Food loggers need fast search, editable portions, scanner/manual fallbacks, and visible log confirmation. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | retention | Live report found `0` inputs and `13` buttons; Scan barcode, Scan receipt, meal tabs, plus buttons, Add to lunch, and Add manually all left `/domains/meal` unchanged with no text/state update. | Users cannot search, scan, select a meal type, quick-add, confirm a portion, or manually add food. | Build a real logging state machine: searchable input, meal-type state, barcode/receipt flows, expandable food rows, portion editing, manual-entry form, add confirmation, undo, and error/offline states. | proposed |
| major | information-architecture | The Screen 29 spec defines Meal View and Food Logging modes, but the live route opens only `Log food` and does not show meal photo, macro breakdown, ingredients, or SIA meal insight. | Users tapping a logged/planned meal cannot inspect what they ate or why SIA is commenting on it. | Support entry-point-driven modes with stable header transitions, or split meal detail and food logging into separate clear routes. | proposed |
| major | accessibility | The search surface is static text rather than an input; scanner buttons are 40x40, segmented tabs are 30px tall, quick-add buttons are 32x32, and Add to lunch is 40px tall. | Keyboard, screen-reader, and motor users cannot operate the primary food logging path reliably. | Use semantic inputs/selectors/buttons with accessible names, selected/expanded states, and at least 44x44 hit areas. | proposed |

Decision: Must fix before launch; redesign candidate until the dual-mode food logging architecture is real.

### 30 - Finance dashboard

- Five-second read: A strong finance overview with SIA insight, monthly KPIs, budgets, recent transactions, savings, and a trend chart.
- Primary action clarity: Review is clear, but add transaction and drill-down behavior collapse into the same budget detail route.
- Emotional tone: Calm and credible visually; trust weakens where financial data cannot be inspected or verified.
- Screenshot: `/private/tmp/balencia-b11/domains-finance-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | The money-map dashboard structure is right for a finance domain surface. |
| User friction | 2 | Links exist, but transaction, budget, and add intents all route to the same generic `/domains/budget` detail. |
| Visual appeal | 4 | SIA note, KPI cards, and budget rows are polished and easy to scan. |
| Brand fit | 4 | Emerald is contained to domain identity while orange/green/purple keep their system roles. |
| Mobile ergonomics | 3 | Primary rows are comfortable, but level and secondary text links are below the 44px touch-height gate. |
| Accessibility | 3 | Many drill-downs are semantic links, but KPI cards, savings targets, chart toggle, and chart inspection are not operable controls. |
| Trust/privacy | 2 | The screen makes sensitive cross-domain spending claims without showing source, confidence, permission, or explanation detail. |
| Industry best practice | 2 | Finance dashboards need distinct transaction detail, add/scan flows, filters, and explorable trend data. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| major | navigation | Live controls show `Add transaction`, all three budget rows, all four transaction rows, and both View all links route to `/domains/budget`; no add-transaction modal, scan-receipt option, or transaction-specific destination appears. | Users cannot add a transaction, scan a receipt, inspect a transaction, or tell whether they are opening a budget category or a transaction record. | Route budget rows to budget detail context, transaction rows to transaction detail context, and the FAB to an add transaction/scan receipt sheet with loading, cancel, success, and error states. | proposed |
| major | retention | The route reports `0` buttons; KPI cards, savings targets, and the 7d/30d trend toggle are visual-only despite the spec requiring KPI drill-down, savings expansion, chart toggle, and tooltips. | Users can see finance data but cannot answer follow-up questions or adjust the view. | Make KPI cards, savings targets, trend toggles, and chart points semantic controls with stateful filtering, expansion, and accessible chart summaries. | proposed |
| major | trust-privacy | The SIA card says dining spend rises after high-stress workdays, but only exposes an `Ask SIA` link; there is no expanded source/confidence/data-use explanation on the finance surface. | Sensitive financial and stress inferences may feel ungrounded or invasive. | Add tap-to-expand source/confidence/context, show which connected signals informed the insight, and provide a path to manage data use. | proposed |

Decision: Must fix before launch; the visual dashboard direction is good, but finance control and trust behavior are incomplete.

### 31 - Budget detail

- Five-second read: A polished Dining budget detail with allocation, spend, remaining budget, SIA insight, transactions, and edit buttons.
- Primary action clarity: Edit budget is obvious, but both edit controls are no-ops.
- Emotional tone: Focused and clear, though the static interaction model makes the money-management promise feel shallow.
- Screenshot: `/private/tmp/balencia-b11/domains-budget-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 3 | A budget category detail is useful, but the shared transaction/budget detail route is only half implemented. |
| User friction | 1 | Users cannot edit, open transaction detail, add notes, recategorize, delete, or inspect receipts. |
| Visual appeal | 4 | Budget amount hierarchy, progress, and SIA card are strong. |
| Brand fit | 4 | Orange progress, green remaining, and purple SIA cue fit the system. |
| Mobile ergonomics | 3 | Main controls are sized well; secondary Ask SIA is only 32px tall. |
| Accessibility | 2 | Edit buttons are semantic but inert, while transaction rows are static divs with no detail actions. |
| Trust/privacy | 3 | The financial status is readable, but editing/deleting safeguards and receipt privacy states are absent. |
| Industry best practice | 1 | Finance detail screens need edit sheets, transaction drill-down, delete confirmation, receipt handling, and validation. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | retention | Live report found `0` inputs and both `Edit budget` controls left `/domains/budget` unchanged with no text/state update or bottom sheet. | Users cannot perform the screen's primary edit task or correct a budget allocation. | Implement the edit budget bottom sheet with amount input, SIA suggestion, save/cancel, validation, loading, success, and error states. | proposed |
| major | information-architecture | Screen 31 is specified as a dual Transaction Detail/Budget Detail shell, but the live route only renders Dining budget detail; transaction rows are static non-link rows. | Users arriving from a finance transaction cannot review merchant/date/notes/receipt, recategorize, delete, or navigate from budget transactions to transaction detail. | Implement transaction and budget modes driven by route/query context, and make filtered transaction rows navigate to transaction detail within the finance stack. | proposed |
| major | trust-privacy | Delete, receipt photo, add receipt, add note, recategorize, and confirmation states from the transaction spec are absent. | Financial records cannot be safely corrected or removed, and destructive/receipt behavior has no privacy guardrails. | Add transaction metadata editing, receipt image viewer/add/replace/delete, recategorization, delete confirmation, and clear recovery/error behavior. | proposed |

Decision: Must fix before launch; redesign candidate until the transaction/budget detail architecture is implemented.

### 32 - Career dashboard

- Five-second read: A useful career dashboard with SIA timing advice, active missions, suggested actions, skills, deadlines, and add mission.
- Primary action clarity: Career actions are visible, but the suggested-action checkboxes are not controls.
- Emotional tone: Motivating and practical, with a good professional-growth tone.
- Screenshot: `/private/tmp/balencia-b11/domains-career-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | Career goals, suggested actions, skills, and deadlines match the domain's action-oriented purpose. |
| User friction | 1 | The primary inline completion task is blocked because suggested actions are static rows. |
| Visual appeal | 4 | First viewport hierarchy is polished and readable. |
| Brand fit | 4 | Indigo stays in the domain role; orange is reserved for action/progress/XP. |
| Mobile ergonomics | 3 | Mission rows are comfortable, but See all, Ask SIA, and the level badge are below 44px high. |
| Accessibility | 2 | Checkbox visuals are spans, not inputs/buttons, and skill/deadline rows are not semantic controls. |
| Trust/privacy | 4 | No sensitive permission ask, and the coaching claim is modest. |
| Industry best practice | 2 | Work dashboards need actionable task completion, reschedule/skip, skill detail, and deadline navigation. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | retention | Live report found `0` buttons on `/domains/career`; suggested action checkboxes are visual spans and there are no controls for completing, skipping, modifying, or asking why. | Users cannot complete the domain's primary career action or earn XP from SIA suggestions. | Render suggested actions as semantic checkbox/button rows with completion, XP feedback, undo, skip/reschedule, failure recovery, and SIA explanation states. | proposed |
| major | navigation | The only content links are Back, Lv.5, Ask SIA, See all, two mission rows, and Add career mission; skill pills and upcoming deadlines are static. | Users cannot inspect skill growth, open deadline details, reschedule work events, or follow the SIA timing suggestion into a concrete plan. | Make skill pills and deadline rows semantic controls with detail/expand states, goal links, edit/reschedule actions, and contextual SIA routing. | proposed |
| minor | mobile-ergonomics | Evidence shows `See all` at 43x32, `Ask SIA` at 50x32, and `Lv.5` at 50x28. | Secondary navigation is less forgiving on touch devices. | Expand hit areas for compact text links and level badges to at least 44px high while preserving the compact visual treatment. | proposed |

Decision: Must fix before launch; the composition is strong, but the career action model must become operable.

### 33 - Relationships dashboard

- Five-second read: A people-centered relationships dashboard with SIA insight, reminders, key people, recent quality time, suggestions, and dates.
- Primary action clarity: Log quality time is prominent, but it opens nothing; add, view all, do it, and skip are also no-ops.
- Emotional tone: Warm and human, but relationship nudges need more control and privacy context to feel emotionally safe.
- Screenshot: `/private/tmp/balencia-b11/domains-relationships-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | The people-first dashboard is the right structure for the relationships domain. |
| User friction | 1 | The primary log/add/suggestion actions are blocked and there are 0 inputs. |
| Visual appeal | 4 | Pink domain accents, SIA card, and check-in rows feel premium and readable. |
| Brand fit | 4 | Domain pink is controlled and SIA purple is limited to coaching. |
| Mobile ergonomics | 2 | The FAB covers the first key-person row in the first viewport, and compact Do/Skip/View all controls are below 44px high. |
| Accessibility | 2 | Chevron rows for reminders and people are static divs, not semantic expandable/action rows. |
| Trust/privacy | 2 | Sensitive relationship nudges appear without data-source explanation, dismiss/snooze, or visibility controls. |
| Industry best practice | 1 | Relationship tracking needs easy logging, add-person flow, reminder controls, person detail, and emotionally safe opt-outs. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | retention | Live report found `0` inputs; Add person, View all, Do it, Skip, and Log quality time all left `/domains/relationships` unchanged with no text/state update or sheet. | Users cannot log quality time, add a person, act on SIA's suggestion, skip a suggestion, or view full history. | Implement add-person and quality-time bottom sheets, suggestion do/skip states, full log navigation, validation, save/cancel, success, and error states. | proposed |
| major | accessibility | Reminder/person/quality-time rows show chevrons and row styling but are static `div` elements; the controls report exposes only 3 links and 5 buttons in the phone frame. | Users cannot open person details, dismiss reminders, log from a reminder, inspect quality-time entries, or operate those rows with assistive tech. | Make rows semantic buttons/links with expand/detail behavior, swipe/dismiss alternatives, clear labels, and 44px touch targets. | proposed |
| major | trust-privacy | SIA says the user has not seen anyone socially in 10 days and reminders identify specific people, but there is no source/confidence, snooze/dismiss, privacy setting, or explanation of how relationship data is used. | Relationship coaching can feel intrusive or guilt-inducing without user control over the signal and reminder cadence. | Add source/explanation affordances, snooze/dismiss/log paths, per-person visibility controls, and settings for relationship tracking/reminder intensity. | proposed |
| minor | design-system-consistency | The Screen 33 spec calls for `Lv.6`, while the live header shows `Lv.7`. | Domain progression can feel inconsistent across specs, fixtures, and RPG surfaces. | Align the fixture/spec level or document why the relationships level changed. | proposed |

Decision: Must fix before launch; keep the people-first layout, but make logging, person detail, and emotional-safety controls real.

## Verification

- `npm run verify:routes`: passed, `90 screens, 90 specs`.
- `npm run check`: failed during lint on pre-existing generated file `balencia-screens/dev/types/routes.d.ts` for two `@typescript-eslint/no-empty-object-type` errors.
- Targeted visual/interaction report: `/private/tmp/balencia-b11/report.json`.
