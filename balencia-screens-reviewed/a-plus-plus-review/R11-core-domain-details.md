# R11 - Core Domain Details

- Status: `reviewed`
- Reviewed: 2026-05-27
- Prototype URL: `http://localhost:3000`
- Screens: `29`, `30`, `31`, `32`, `33`
- Routes: `/domains/meal`, `/domains/finance`, `/domains/budget`, `/domains/career`, `/domains/relationships`
- Sources: `../batches/batch-11.md`, `../update-batches/batch-u06.md`, `../screen-iteration-batches/P11-core-domain-details.md`
- Evidence directory: `../../balencia-screens/output/a-plus-plus-review/R11/`
- State evidence: `../../balencia-screens/output/a-plus-plus-review/R11/states/r11-state-capture.json`
- Build gate: no
- Finding IDs: `R11-F01` through `R11-F12`

## Focus

Validate meal logging, finance, budget, career, and relationships. A++ requires domain credibility, respectful copy, clear actions, and trust-safe handling of money and relationship context.

## Required Review Output

- Fresh evidence for every route and key logging, filter, coaching, and detail states.
- Five-second read, primary action clarity, emotional tone, control inventory, rubric scores, A++ grade, findings, and decision for every screen.
- `npm run check` result before close.

## Batch Summary

- A++: none.
- A+: none.
- A: 29 Meal detail, 30 Finance dashboard, 31 Budget detail, 32 Career dashboard, 33 Relationships dashboard.
- Needs polish: all five screens need interaction, accessibility, or handoff fixes before A++.
- Redesign candidates: 29 Meal detail remains a redesign candidate because the route still lacks the distinct meal-view mode required by the spec and P11 checklist.
- User decisions: none. Existing U06 decisions are enough; no new deferred product/legal decisions were added.
- New R11 findings: 12 total: 8 major, 4 minor.
- Verification: `npm run check` passed on 2026-05-27; R11 has no production-build gate.

## Confirmed Preflight Findings

| Finding | Screen | Route | Severity | Category | Evidence | Recommendation | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R11-F01 | 30 Finance dashboard | `/domains/finance` | major | accessibility | Baseline and state capture both recorded nested `<a>` hydration output in the SIA coaching note. | Remove nested anchors by making either the SIA card or the inline Ask SIA affordance the single interactive target. | proposed |
| R11-F02 | 32 Career dashboard | `/domains/career` | major | accessibility | Baseline and state capture both recorded nested `<a>` hydration output in the SIA coaching note. | Remove nested anchors by making either the SIA card or the inline Ask SIA affordance the single interactive target. | proposed |
| R11-F03 | 33 Relationships dashboard | `/domains/relationships` | major | accessibility | Baseline and state capture both recorded nested `<a>` hydration output in the SIA coaching note. | Remove nested anchors by making either the SIA card or the inline Ask SIA affordance the single interactive target. | proposed |

## Screen Notes

### 29 - Meal detail

- Five-second read: A fast food logger with search, scanner shortcuts, meal selector, quick-add rows, and manual entry.
- Screen purpose and journey fit: Food logging now works much better than B11, but the route still represents only logging mode; the planned/logged meal detail view is absent even when queried as a view mode.
- Primary action clarity: Search, quick-add, scan, and manual entry are understandable; `Done` returns to Nutrition.
- Emotional tone: Efficient and premium, with a calm nutrition-task feel.
- Screenshot/evidence: `../../balencia-screens/output/a-plus-plus-review/R11/29-domains-meal-phone.png`; state evidence includes `states/29-meal-search-results.png`, `states/29-meal-dinner-expanded.png`, `states/29-meal-manual-entry.png`, `states/29-meal-barcode-scanner.png`, and `states/29-meal-query-view-still-logger.png`.
- Grade: A
- Grade cap: major information-architecture finding R11-F04 prevents A+ or A++; minor touch-target finding R11-F05 prevents A++.
- Control inventory: Back returns to Nutrition; `Done` returns to Nutrition; search filters foods; barcode/receipt buttons open scanner sheets; meal chips change add target; quick-add buttons expand portion rows; `Add to [meal]` shows success/undo toast; `Add manually` opens editable food fields; scanner sheet exposes close and detected-item actions.

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 3 | Logging is useful, but the spec requires both Meal View and Food Logging modes. |
| User friction | 4 | Search, quick-add, scanner sheet, and manual form now reduce logging friction. |
| Visual appeal | 4 | The card stack, warm dark surfaces, and green confirmation state are polished. |
| Brand fit | 5 | Nutrition color and success semantics stay controlled. |
| Mobile ergonomics | 4 | Primary flows are reachable, but several visible controls remain under the 44px target gate. |
| Accessibility | 4 | Search and buttons are semantic, but compact controls and missing meal-view state block A++. |
| Trust/privacy | 5 | Scanner sheet explains camera access would be requested only after the action. |
| Industry best practice | 3 | A food logger needs both quick logging and meal inspection from prior meals. |

| Finding | Severity | Category | Evidence | User Impact | Recommendation | Status | Grade Cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R11-F04 | major | information-architecture | `states/29-meal-query-view-still-logger.png` shows `/domains/meal?mode=view` still renders `Log food`; no meal photo, macro breakdown, ingredients-only meal detail, or edit transition appears. | Users arriving from a logged/planned meal cannot inspect what they ate or why SIA is commenting on that meal. | Implement distinct entry-point modes or routes for Meal View and Food Logging, with stable header state and documented transitions. | proposed | Prevents A+ and A++ |
| R11-F05 | minor | mobile-ergonomics | Baseline evidence flags meal chips at `83x30`, `Add to lunch` at `283x40`, search input text area at `163x24`, and `Done` at `41x44`. | Food logging remains usable, but compact controls are less forgiving for touch and accessibility handoff. | Increase effective hit areas for segments, compact CTAs, and header text actions to at least 44px while preserving the visual density. | proposed | Prevents A++ |

Decision: redesign candidate.

### 30 - Finance dashboard

- Five-second read: A credible finance overview with SIA insight, data-source disclosure, KPI cards, budgets, transactions, savings, trend chart, and add CTA.
- Screen purpose and journey fit: The financial-health dashboard structure matches the spec, and several secondary data states now work.
- Primary action clarity: Reviewing financial health is clear; adding a transaction is not, because the CTA routes to a Dining budget detail instead of an add/scan flow.
- Emotional tone: Calm and financially credible, but the hydration error and misrouted add path create trust debt.
- Screenshot/evidence: `../../balencia-screens/output/a-plus-plus-review/R11/30-domains-finance-phone.png`; state evidence includes `states/30-finance-data-controls.png`, `states/30-finance-kpi-selected.png`, `states/30-finance-savings-expanded.png`, `states/30-finance-trend-30d-forecast.png`, and `states/30-finance-add-transaction-destination.png`.
- Grade: A
- Grade cap: major findings R11-F01 and R11-F06 prevent A+ or A++; minor finding R11-F07 prevents A++.
- Control inventory: Back returns to Explore; level badge links to RPG; SIA card/Ask SIA route to SIA but currently nest anchors; data disclosure expands and links to Connected Services; KPI cards update filter text; budget and transaction rows route with explicit type/id; savings target expands; chart period and chart points update copy; `Add transaction` routes to `/domains/budget` rather than an add flow.

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | The dashboard contains the right finance sections and privacy disclosure. |
| User friction | 3 | Review flows work, but add/full-list paths are misleading. |
| Visual appeal | 5 | KPI hierarchy, SIA card, and finance color use are premium. |
| Brand fit | 5 | Emerald is limited to domain identity; orange, green, and purple keep their system roles. |
| Mobile ergonomics | 4 | Main controls are comfortable; chart dots and text links are compact. |
| Accessibility | 2 | Nested anchors trigger hydration errors and invalid interactive markup. |
| Trust/privacy | 4 | Data-source disclosure is strong, but invalid markup and misrouting weaken confidence. |
| Industry best practice | 3 | Finance dashboards need reliable add, scan, full-list, and detail paths. |

| Finding | Severity | Category | Evidence | User Impact | Recommendation | Status | Grade Cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R11-F01 | major | accessibility | `30-domains-finance-evidence.json` and `states/r11-state-capture.json` record nested `<a>` console output and hydration mismatch for the SIA note. | Assistive tech and browser hydration can receive an invalid interactive tree before the client repairs it. | Make the whole SIA card a single link, or make only the inline Ask SIA action interactive. | proposed | Prevents A+ and A++ |
| R11-F06 | major | navigation | `states/30-finance-add-transaction-destination.png` shows tapping `Add transaction` lands on the Dining budget detail; baseline controls also show both `View all budgets` and `View all transactions` route to generic `/domains/budget`. | Users cannot start add transaction, scan receipt, or view full budget/transaction lists from the controls that promise those jobs. | Route the FAB to an add transaction/scan sheet and route view-all links to explicit list states. | proposed | Prevents A+ and A++ |
| R11-F07 | minor | mobile-ergonomics | Baseline flags `Ask SIA` at `50x32`, view-all links at `32px` high, 7d/30d toggles at `28px` high, and chart points at `16x16`. | Secondary finance controls are harder to hit and chart controls may be missed on mobile. | Preserve compact visuals but expand hit areas for text links, toggles, and SVG chart points. | proposed | Prevents A++ |

Decision: needs polish.

### 31 - Budget detail

- Five-second read: A polished Dining budget detail with budget health, SIA insight, filtered transactions, and edit controls.
- Screen purpose and journey fit: Budget edit, transaction detail, receipt, recategorization, delete, and validation states now exist, but transaction amount formatting is not finance-safe.
- Primary action clarity: `Edit budget` is clear and saves with validation; transaction edit/delete paths are discoverable.
- Emotional tone: Focused and practical, though the transaction amount display undermines money trust.
- Screenshot/evidence: `../../balencia-screens/output/a-plus-plus-review/R11/31-domains-budget-phone.png`; state evidence includes `states/31-budget-edit-sheet.png`, `states/31-budget-save-toast.png`, `states/31-transaction-initial.png`, `states/31-transaction-edit-sheet.png`, `states/31-transaction-delete-confirm.png`, `states/31-add-mode-entry.png`, and `states/31-add-mode-sheet.png`.
- Grade: A
- Grade cap: major financial-clarity finding R11-F08 prevents A+ or A++; minor Ask SIA target issue is covered by the evidence but not split into a separate finding because R11-F08 is the grade cap.
- Control inventory: Back returns to Finance; header edit opens edit sheet; `Ask SIA` links to SIA; filtered transactions open transaction detail; `Edit budget` opens a sheet with monthly amount, SIA suggestion, disabled empty save, and success toast; transaction detail exposes edit category, add/replace receipt, SIA rationale, recategorize, and delete confirmation; `?type=add` exists but initially renders budget content before opening the add sheet.

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | Budget and transaction modes are present, but add mode and transaction display need tightening. |
| User friction | 4 | Edit, validation, receipt, recategorize, and delete states are available. |
| Visual appeal | 4 | The budget view is composed; transaction view has strong hierarchy but problematic amount text. |
| Brand fit | 5 | Orange, green, red, and purple roles are appropriate. |
| Mobile ergonomics | 4 | Main actions are reachable; bottom CTA competes with the tab bar in transaction view. |
| Accessibility | 4 | Most controls are semantic and labeled; Ask SIA remains compact. |
| Trust/privacy | 3 | Transaction detail explains demo bank source, but the visible amount lacks currency/sign formatting. |
| Industry best practice | 3 | Financial detail screens must make amount, sign, currency, and mode impossible to misread. |

| Finding | Severity | Category | Evidence | User Impact | Recommendation | Status | Grade Cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R11-F08 | major | trust-privacy | `states/31-transaction-initial.png` shows the transaction hero amount as `32.5` without a dollar sign, negative sign, or two decimal places; `states/31-add-mode-entry.png` shows `Add transaction` title above Dining budget content before the sheet is opened. | Users can misread expense direction or amount, and add-transaction mode does not immediately match its title. | Format transaction hero amounts as signed currency, and make add mode open or render a true add-transaction form immediately. | proposed | Prevents A+ and A++ |

Decision: needs polish.

### 32 - Career dashboard

- Five-second read: A motivating career dashboard with SIA timing advice, active missions, suggested actions, skills, deadlines, and add mission.
- Screen purpose and journey fit: Career now has useful inline action completion, skip, why, skill, and deadline states.
- Primary action clarity: Completing a suggested action is clear and gives XP/undo feedback.
- Emotional tone: Professional, motivating, and not childish.
- Screenshot/evidence: `../../balencia-screens/output/a-plus-plus-review/R11/32-domains-career-phone.png`; state evidence includes `states/32-career-action-complete.png`, `states/32-career-why-toast.png`, `states/32-career-skip-state.png`, `states/32-career-skill-selected.png`, and `states/32-career-deadline-expanded.png`.
- Grade: A
- Grade cap: major finding R11-F02 prevents A+ or A++; minor touch-target finding R11-F09 prevents A++.
- Control inventory: Back returns to Explore; level links to RPG; SIA card/Ask SIA route to SIA but currently nest anchors; See all and mission cards route to Goal Detail; action checkboxes complete with XP/undo; Skip marks an action skipped; Why shows SIA rationale; skill pills update detail copy; deadline rows expand with reschedule text; Add career mission routes to Create Goal.

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | The screen solves the right action-oriented career problem. |
| User friction | 4 | Core action states work, though secondary controls are cramped. |
| Visual appeal | 5 | The first viewport and card hierarchy feel premium. |
| Brand fit | 5 | Career indigo stays informational; orange drives action and progress. |
| Mobile ergonomics | 4 | Primary controls pass; Skip/Why/See all are compact. |
| Accessibility | 2 | Hydration errors create invalid nested interactive markup. |
| Trust/privacy | 5 | Career claims are modest and not privacy-sensitive. |
| Industry best practice | 4 | Inline actions, feedback, skills, and deadlines are directionally strong. |

| Finding | Severity | Category | Evidence | User Impact | Recommendation | Status | Grade Cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R11-F02 | major | accessibility | `32-domains-career-evidence.json` and `states/r11-state-capture.json` record nested `<a>` console output and hydration mismatch for the SIA note. | Assistive tech and hydration can receive invalid nested interactive markup before repair. | Make the SIA note a single interactive target or keep the inline Ask SIA link without wrapping the card in another link. | proposed | Prevents A+ and A++ |
| R11-F09 | minor | mobile-ergonomics | Baseline flags `Ask SIA` at `50x32`, `See all` at `43x32`, and each `Skip`/`Why` action at `32px` high. | Secondary actions are useful but less forgiving on mobile and harder to audit for Figma. | Expand hit areas to 44px while preserving the compact pill presentation. | proposed | Prevents A++ |

Decision: needs polish.

### 33 - Relationships dashboard

- Five-second read: A warm relationship dashboard with SIA insight, reminders, key people, quality-time logging, suggestion controls, dates, and privacy settings.
- Screen purpose and journey fit: The screen now exposes add person, log quality time, settings, reminder handling, and suggestion states, but key people/detail behavior and first-viewport ergonomics are not A++ ready.
- Primary action clarity: `Log quality time` is obvious; `Add person`, `Do it`, `Skip`, and settings have visible state paths.
- Emotional tone: Human and warm, with better privacy language than B11.
- Screenshot/evidence: `../../balencia-screens/output/a-plus-plus-review/R11/33-domains-relationships-phone.png`; state evidence includes `states/33-relationships-reminder-handled.png`, `states/33-relationships-person-tapped.png`, `states/33-relationships-add-person-disabled.png`, `states/33-relationships-log-quality-sheet.png`, `states/33-relationships-settings-sheet.png`, `states/33-relationships-view-all-quality.png`, `states/33-relationships-suggestion-done.png`, and `states/33-relationships-suggestion-skipped.png`.
- Grade: A
- Grade cap: major findings R11-F03, R11-F10, and R11-F11 prevent A+ or A++; minor finding R11-F12 prevents A++.
- Control inventory: Back returns to Explore; level links to RPG; SIA card/Ask SIA route to SIA but currently nest anchors; reminder rows mark handled; person rows visually look tappable but do not reveal visible detail; Add person opens validated sheet; tracking settings opens consent toggles; View all expands quality-time list; quality entries open the log sheet; Do it/Skip update suggestion state; Log quality time FAB opens validated sheet; upcoming dates are static read-only rows.

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | People-first relationship tracking fits the domain and now includes privacy controls. |
| User friction | 4 | Add/log/suggestion flows work, but key person detail does not visibly respond. |
| Visual appeal | 4 | Warm and premium, but the FAB/content collision harms the first viewport. |
| Brand fit | 5 | Pink domain accents, orange actions, and purple SIA cues are well contained. |
| Mobile ergonomics | 3 | The bottom action overlaps key content and compact suggestion buttons are under target. |
| Accessibility | 2 | Nested anchors remain, and person row expansion is not visible for sighted users. |
| Trust/privacy | 4 | Tracking settings and opt-in copy are strong, but the settings sheet can be covered by a stale toast. |
| Industry best practice | 3 | Relationship dashboards need clear person detail and non-overlapping privacy controls. |

| Finding | Severity | Category | Evidence | User Impact | Recommendation | Status | Grade Cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R11-F03 | major | accessibility | `33-domains-relationships-evidence.json` and `states/r11-state-capture.json` record nested `<a>` console output and hydration mismatch for the SIA note. | Assistive tech and hydration can receive invalid nested interactive markup before repair. | Make the SIA note a single interactive target or keep the inline Ask SIA link without wrapping the card in another link. | proposed | Prevents A+ and A++ |
| R11-F10 | major | interaction-design | `states/33-relationships-person-tapped.png` shows tapping a key-person row leaves no visible expanded details, actions, or confirmation despite chevrons and button semantics. | Users cannot tell whether person detail opened, where to log time for that person, or how to manage per-person visibility. | Add visible inline expansion or navigate to a person detail state with recent interactions, log shortcut, edit, and visibility controls. | proposed | Prevents A+ and A++ |
| R11-F11 | major | mobile-ergonomics | `33-domains-relationships-phone.png` and `states/33-relationships-person-tapped.png` show the orange Log quality time FAB overlapping the first key-person row. | A primary relationship row is visually and functionally crowded by the persistent action, making the first viewport feel unstable. | Add sufficient bottom/content padding or reserve the bottom action area so rows cannot sit beneath the FAB. | proposed | Prevents A+ and A++ |
| R11-F12 | minor | overlay-state | `states/33-relationships-settings-sheet.png` shows a previous `Quality time logged` toast covering the settings sheet CTA area. | Users opening privacy/tracking settings immediately after logging can see stale success feedback over the next action. | Clear stale toasts when opening sheets or reposition toasts above active sheets without covering controls. | proposed | Prevents A++ |

Decision: needs polish.

## Verification

- 2026-05-27: `npm run check` from `balencia-screens` passed.
  - `eslint` passed.
  - `tsc --noEmit` passed.
  - `verify:routes` passed: `90 screens, 90 specs`.
  - `verify:assets` passed: `14 logo assets`.
  - `verify:copy` passed: `170 files scanned`.
  - `verify:brand` passed: `170 files scanned`.
- Build gate: not required for R11.
