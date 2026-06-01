# R10 - Data And First Domain Dashboards

- Status: `reviewed`
- Reviewed: 2026-05-27
- Prototype URL: `http://localhost:3000`
- Screens: `72`, `84`, `26`, `27`, `28`
- Routes: `/tabs/me/knowledge-graph`, `/tabs/me/data-sources`, `/domains/fitness`, `/domains/workout`, `/domains/nutrition`
- Sources: `../batches/batch-10.md`, `../update-batches/batch-u05.md`, `../screen-iteration-batches/P10-data-first-domains.md`
- Evidence directory: `../../balencia-screens/output/a-plus-plus-review/R10/`
- State evidence: `../../balencia-screens/output/a-plus-plus-review/R10/states/r10-state-capture.json`
- Build gate: no
- Finding IDs: `R10-F01` through `R10-F08`

## Focus

Validate explainable intelligence, demo data honesty, and first domain dashboards. A++ requires guided insight, credible fitness/workout/nutrition actions, source transparency, and no overpromised live sync.

## Batch Summary

- A++: none.
- A+: 28 Nutrition dashboard.
- A: 72 Knowledge graph, 84 Data sources, 26 Fitness dashboard, 27 Workout detail.
- Needs polish: all five screens have at least one unresolved A++ blocker or handoff gap.
- Redesign candidates: 27 Workout detail remains a redesign candidate until active/pause/end/summary mode architecture is visually stable in the phone frame.
- User decisions: none. Findings are implementation and handoff quality issues, not unresolved product/legal decisions.
- Verification: `npm run check` result recorded in the Verification section.

## Baseline Preflight Findings

| Finding | Screen | Route | Severity | Category | Evidence | Recommendation | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R10-F01 | 26 Fitness dashboard | `/domains/fitness` | major | release-readiness | A++ baseline evidence and fresh state capture both recorded duplicate-key console output for `T-complete`. | Resolve duplicate keys before awarding A+ or A++; confirm with a clean route capture. | proposed |

## Screen Notes

### 72 - Knowledge graph

- Status: reviewed
- Five-second read: A premium SIA-brain graph is immediately understandable as a cross-domain insight map, but the lower summary panel crowds the legend/control zone.
- Screen purpose and journey fit: Strong fit for Me/Intelligence because it makes Balencia's correlation engine tangible and gives SIA a visual proof point.
- Primary action clarity: Node tapping works and opens a detail panel with Ask SIA and Go to domain actions; the visible Legend/help controls are not reliable enough for A++.
- Emotional tone: Analytical, cinematic, and personal, with some trust debt from blocked controls and the 404 domain exit.
- Screenshot/evidence paths: `../../balencia-screens/output/a-plus-plus-review/R10/72-tabs-me-knowledge-graph-phone.png`; `../../balencia-screens/output/a-plus-plus-review/R10/states/72-initial.png`; `../../balencia-screens/output/a-plus-plus-review/R10/states/72-legend-attempt.png`; `../../balencia-screens/output/a-plus-plus-review/R10/states/72-node-detail.png`; `../../balencia-screens/output/a-plus-plus-review/R10/states/72-ask-sia-navigation.png`; `../../balencia-screens/output/a-plus-plus-review/R10/states/72-go-to-domain-navigation.png`
- Grade: A
- Grade cap: unresolved major findings R10-F02 and R10-F03 prevent A+ and A++.
- Control inventory: Back links to Me; header help icon appears as an unlabeled button and has no observed sheet; insight nodes select graph details; Legend is visible but click attempt was blocked by the summary overlay; zoom in/out/reset are 44px graph controls but visually compete with the bottom summary/detail layers; Ask SIA routes to `/tabs/sia?context=sleep`; Go to domain from Sleep quality routes to missing `/domains/sleep`; tab bar links remain visible.

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | A guided insight map is a strong manifestation of Balencia's core connected-life proposition. |
| User friction | 3 | Node selection and Ask SIA work, but legend/help discoverability is blocked and one domain exit goes to 404. |
| Visual appeal | 3 | The graph language is appealing, but overlay layers collide with controls and labels in the first viewport. |
| Brand fit | 4 | Purple AI mode and domain colors are semantically right; control polish is below A++ brand trust. |
| Mobile ergonomics | 3 | Most targets are large, but the bottom summary/detail surfaces cover visible controls. |
| Accessibility | 3 | Nodes now have labels, but the help icon is unlabeled and Legend cannot be activated in the captured state. |
| Trust/privacy | 4 | The screen says correlations are insights, but routing a detail action to 404 damages confidence. |
| Industry best practice | 3 | Insight maps need dependable legend/help, node exits, and route-safe detail actions. |

| Finding | Screen | Route | Severity | Category | Evidence | User Impact | Recommendation | Status | Grade Cap |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| R10-F02 | 72 Knowledge graph | `/tabs/me/knowledge-graph` | major | control-purpose | `72-legend-attempt.png` and `r10-state-capture.json` record `Legend` click as blocked by the bottom accessible-summary panel; baseline evidence also exposes the header help icon as generic `BUTTON`, and route implementation shows no help handler. | Users cannot learn what graph encodings mean from the visible controls, and assistive tech users get a generic button with unclear purpose. | Move the summary so it does not intercept controls, wire Legend and Help to real sheets, and provide accessible names for all icon controls. | proposed | Prevents A+ and A++ |
| R10-F03 | 72 Knowledge graph | `/tabs/me/knowledge-graph` | major | navigation | `72-go-to-domain-navigation.png` shows Sleep quality `Go to domain` navigating to `http://localhost:3000/domains/sleep`, which renders the prototype index plus `404 This page could not be found`; state capture records a 404 console error. | A visible domain CTA sends users out of the polished phone flow into a broken route. | Map graph nodes to existing destination routes such as `/features/sleep`, `/domains/fitness`, or a documented domain-detail placeholder; add route-safe fallbacks. | proposed | Prevents A+ and A++ |

Decision: needs polish.

### 84 - Data sources

- Status: reviewed
- Five-second read: A clear data trust surface explains that sources become coaching signals, with source health and detected correlations visible.
- Screen purpose and journey fit: Good fit for Me/Intelligence because it supports source transparency and demo/no-live-sync honesty.
- Primary action clarity: Connect source opens a provider picker and provider selection returns a demo OAuth success message; source rows open details; correlation rows do not actually open Knowledge Graph.
- Emotional tone: Trust-building in copy and color, weakened by cropped bottom sheets and non-navigating correlation rows.
- Screenshot/evidence paths: `../../balencia-screens/output/a-plus-plus-review/R10/84-tabs-me-data-sources-phone.png`; `../../balencia-screens/output/a-plus-plus-review/R10/states/84-initial.png`; `../../balencia-screens/output/a-plus-plus-review/R10/states/84-provider-picker.png`; `../../balencia-screens/output/a-plus-plus-review/R10/states/84-provider-success.png`; `../../balencia-screens/output/a-plus-plus-review/R10/states/84-source-detail.png`; `../../balencia-screens/output/a-plus-plus-review/R10/states/84-refresh-requested.png`; `../../balencia-screens/output/a-plus-plus-review/R10/states/84-correlation-feedback.png`
- Grade: A
- Grade cap: unresolved major findings R10-F04 and R10-F05 prevent A+ and A++.
- Control inventory: Back returns to prior stack; source rows open detail sheets; Refresh records a request; Disconnect is visible but not fully verified because the sheet is cropped; correlation rows show a status message instead of navigating; Connect source opens provider picker; provider buttons record demo OAuth success; Close dismisses sheets; tab bar links remain visible.

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | The trust/control surface is exactly right for SIA's data context. |
| User friction | 3 | Core connect/detail actions exist, but cropped sheets make provider/source work hard to read and use. |
| Visual appeal | 3 | The hero and rows are premium; the fixed sheet rendering breaks the mobile composition. |
| Brand fit | 4 | Cyan, green, purple, and orange are semantically assigned. |
| Mobile ergonomics | 2 | Provider/detail sheets are anchored outside the phone frame and cut off in evidence. |
| Accessibility | 3 | Rows and buttons are semantic, but cropped sheets compromise focus/readability and confirmation clarity. |
| Trust/privacy | 4 | Demo OAuth and no-live-sync copy are honest; fake correlation navigation weakens trust. |
| Industry best practice | 3 | Integration screens need readable provider sheets and real correlation/source detail destinations. |

| Finding | Screen | Route | Severity | Category | Evidence | User Impact | Recommendation | Status | Grade Cap |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| R10-F04 | 84 Data sources | `/tabs/me/data-sources` | major | mobile-ergonomics | `84-provider-picker.png`, `84-source-detail.png`, and `84-refresh-requested.png` show the bottom sheet fixed to the browser viewport and cropped at the left/bottom of the phone frame. | Users cannot comfortably read provider choices, source permissions, refresh, disconnect, or close states on the actual mobile frame. | Anchor sheets inside `PhoneFrame`/screen shell or use the shared bottom-sheet primitive so sheet width, bottom inset, and backdrop are phone-relative. | proposed | Prevents A+ and A++ |
| R10-F05 | 84 Data sources | `/tabs/me/data-sources` | major | navigation | `84-correlation-feedback.png` and state capture show tapping `Sleep affects tempo pace 85` leaves `/tabs/me/data-sources` unchanged and only adds the text `opened in Knowledge Graph`. | Correlation rows look like drill-down controls but do not open the promised graph/detail, creating a false sense of action. | Route correlation rows to `/tabs/me/knowledge-graph` with selected correlation context, or open a documented correlation-detail sheet. | proposed | Prevents A+ and A++ |

Decision: needs polish.

### 26 - Fitness dashboard

- Status: reviewed
- Five-second read: A strong first domain dashboard with SIA recovery advice, today's workout, WHOOP recovery, active missions, weekly stats, and a Log workout entry.
- Screen purpose and journey fit: Strong canonical domain dashboard; it demonstrates Balencia's domain template well.
- Primary action clarity: Start workout routes to `/domains/workout`; Log workout opens a manual-vs-planned sheet and Manual log records a success message, but the sheet is visibly mispositioned.
- Emotional tone: Motivating and premium, with high trust in the main dashboard and lower trust in the broken modal layer.
- Screenshot/evidence paths: `../../balencia-screens/output/a-plus-plus-review/R10/26-domains-fitness-phone.png`; `../../balencia-screens/output/a-plus-plus-review/R10/states/26-initial.png`; `../../balencia-screens/output/a-plus-plus-review/R10/states/26-log-workout-sheet.png`; `../../balencia-screens/output/a-plus-plus-review/R10/states/26-manual-log-saved.png`
- Grade: A
- Grade cap: unresolved major findings R10-F01 and R10-F06 prevent A+ and A++; small-target evidence also prevents A++.
- Control inventory: Back links to Explore; level badge links to RPG; SIA note links to `/tabs/sia?context=fitness-workouts`; Start workout links to `/domains/workout`; goal rows link to goal detail; `See all` links route to Goals and Exercise Library but measure 43x32 in baseline evidence; Log workout opens a sheet; Manual log saves a local success; Start planned links to active workout; tab bar links remain visible.

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | The dashboard prioritizes recovery-informed workout action and supports manual logging. |
| User friction | 4 | Main exits work, but the Log workout sheet is cropped and secondary text links are small. |
| Visual appeal | 4 | Main dashboard composition is polished; the modal layer is not. |
| Brand fit | 5 | Fitness red, orange action, SIA purple, and green recovery states are restrained and clear. |
| Mobile ergonomics | 3 | Primary targets are comfortable, but the manual-log sheet and `See all` targets miss the mobile bar. |
| Accessibility | 4 | Most controls are semantic, with remaining risk from small secondary links and the cropped sheet. |
| Trust/privacy | 4 | WHOOP and SIA context are clear; duplicate-key runtime output is release-readiness debt. |
| Industry best practice | 4 | Strong dashboard pattern; modal and runtime polish keep it from handoff-ready. |

| Finding | Screen | Route | Severity | Category | Evidence | User Impact | Recommendation | Status | Grade Cap |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| R10-F01 | 26 Fitness dashboard | `/domains/fitness` | major | release-readiness | Baseline `26-domains-fitness-evidence.json` and fresh `r10-state-capture.json` record duplicate-key console errors for `T-complete` on `/domains/fitness`. | Duplicate keys can produce unstable rendered children and should not ship into Figma handoff as a known runtime warning. | Fix the duplicate key source in the weekly day/stat rendering and rerun route evidence with zero console errors. | proposed | Prevents A+ and A++ |
| R10-F06 | 26 Fitness dashboard | `/domains/fitness` | major | mobile-ergonomics | `26-log-workout-sheet.png` shows the Log workout sheet cropped outside the phone frame, with only the right portion readable; `26-manual-log-saved.png` confirms the action works after the clipped sheet. | Users can miss or mis-tap manual logging options because the sheet is not positioned within the mobile viewport. | Render the sheet within the phone frame/shared bottom-sheet layer and keep close/manual/start controls fully visible above the home indicator. | proposed | Prevents A+ and A++ |

Decision: needs polish.

### 27 - Workout detail

- Status: reviewed
- Five-second read: An active workout tracker is clear at first glance, with editable weight/reps, Complete set, rest timer, pause/end controls, and summary flow.
- Screen purpose and journey fit: Active workout belongs here, but the screen still does not present a planning mode and the pause/end/summary layers are not visually stable enough for a high-commitment workout moment.
- Primary action clarity: Complete set works and starts rest; Skip rest works; Pause and End trigger overlays; Save end reaches summary. The overlays and summary are clipped/misaligned inside the phone evidence.
- Emotional tone: Focused and energetic in the active state; the cropped overlays make it feel unfinished during high-stakes session control.
- Screenshot/evidence paths: `../../balencia-screens/output/a-plus-plus-review/R10/27-domains-workout-phone.png`; `../../balencia-screens/output/a-plus-plus-review/R10/states/27-initial-active.png`; `../../balencia-screens/output/a-plus-plus-review/R10/states/27-inputs-edited.png`; `../../balencia-screens/output/a-plus-plus-review/R10/states/27-rest-started.png`; `../../balencia-screens/output/a-plus-plus-review/R10/states/27-rest-skipped.png`; `../../balencia-screens/output/a-plus-plus-review/R10/states/27-paused-overlay.png`; `../../balencia-screens/output/a-plus-plus-review/R10/states/27-end-confirm.png`; `../../balencia-screens/output/a-plus-plus-review/R10/states/27-summary.png`
- Grade: A
- Grade cap: unresolved major finding R10-F07 prevents A+ and A++.
- Control inventory: Pause opens/resumes a pause overlay; End opens an end-confirm overlay; Weight/Reps fields are editable and labeled; Complete set advances set count and starts rest; Skip rest ends rest; Resume returns to active state; Cancel returns to active state; Save end reaches summary; Back to fitness is visible in summary; tab bar is intentionally hidden during active mode, but it does not return in summary evidence.

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | Active tracking is valuable, but planning and summary mode behavior remain incomplete relative to the spec. |
| User friction | 3 | Core set/rest actions work; session-control overlays are hard to use because they are cropped. |
| Visual appeal | 3 | Active state is strong; pause/end/summary states look broken and summary contrast is weak. |
| Brand fit | 4 | Green completion, orange timer/action, and SIA purple are semantically correct. |
| Mobile ergonomics | 2 | Pause/end overlays are anchored outside the phone frame and the summary keeps the active header. |
| Accessibility | 3 | Inputs and buttons are semantic, but clipped overlays and missing summary tab return are not handoff-ready. |
| Trust/privacy | 4 | Low privacy risk; the issue is session-control confidence. |
| Industry best practice | 3 | Workout apps need dependable pause/end confirmation and a clear completion state. |

| Finding | Screen | Route | Severity | Category | Evidence | User Impact | Recommendation | Status | Grade Cap |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| R10-F07 | 27 Workout detail | `/domains/workout` | major | mobile-ergonomics | `27-paused-overlay.png` and `27-end-confirm.png` show pause/end overlays clipped off the left/right of the phone frame; `27-summary.png` shows summary content dimmed under the active header with no returned tab bar. | Users may misread or miss critical session controls such as Resume, Cancel, Save end, and Back to fitness during an active workout. | Anchor overlays within the phone frame, add a proper backdrop, keep all session-control buttons fully visible, and render summary as its own post-workout mode with correct header/tab behavior. | proposed | Prevents A+ and A++ |

Decision: redesign candidate.

### 28 - Nutrition dashboard

- Status: reviewed
- Five-second read: A dense but understandable nutrition dashboard with SIA macro advice, meal plan, macros, water tracking, quick actions, missions, food log, and Log food.
- Screen purpose and journey fit: Strong second domain dashboard and good validation of continuous daily tracking.
- Primary action clarity: Log food and meal/log rows route to Meal; Add water increments immediately and exposes undo; SIA note routes to contextual SIA chat.
- Emotional tone: Supportive, practical, and calmer than fitness while still feeling like Balencia.
- Screenshot/evidence paths: `../../balencia-screens/output/a-plus-plus-review/R10/28-domains-nutrition-phone.png`; `../../balencia-screens/output/a-plus-plus-review/R10/states/28-initial.png`; `../../balencia-screens/output/a-plus-plus-review/R10/states/28-water-added.png`; `../../balencia-screens/output/a-plus-plus-review/R10/states/28-water-undone.png`; `../../balencia-screens/output/a-plus-plus-review/R10/states/28-sia-navigation.png`
- Grade: A+
- Grade cap: unresolved minor finding R10-F08 prevents A++.
- Control inventory: Back links to Explore; level badge links to RPG; SIA note routes to `/tabs/sia?context=nutrition`; meal rows route to Meal; macro bars are informational; Add water increments count and exposes Undo; Undo decrements count; quick action cards route to Shopping List, Recipes, and Intelligence; goals and food-log rows route to detail/list destinations; Log food routes to Meal; tab bar links remain visible.

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | The dashboard solves daily meal, macro, and hydration awareness well. |
| User friction | 5 | Water and SIA actions are fast, with undo for the inline tracker. |
| Visual appeal | 4 | Premium and readable; first viewport is dense and some secondary rows are tight. |
| Brand fit | 4 | Lime is well-contained, though the level mismatch versus spec creates handoff inconsistency. |
| Mobile ergonomics | 4 | Primary actions are strong; secondary `See all` and recent log rows are below the 44px target gate. |
| Accessibility | 4 | Most controls are semantic and labeled; small secondary targets remain. |
| Trust/privacy | 5 | No new sensitive permission ask; nutrition data is presented as user-owned tracking. |
| Industry best practice | 4 | Meets dashboard expectations, with minor polish needed before Figma-ready status. |

| Finding | Screen | Route | Severity | Category | Evidence | User Impact | Recommendation | Status | Grade Cap |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| R10-F08 | 28 Nutrition dashboard | `/domains/nutrition` | minor | mobile-ergonomics | Baseline `28-domains-nutrition-evidence.json` records two `See all` links at 43x32 and two recent log rows at 307x40; screenshot and spec also disagree on Nutrition level (`Lv.9` live vs `Lv.8` spec). | Secondary navigation is slightly less forgiving on mobile and the RPG/domain level is ambiguous for Figma handoff. | Expand the tap areas without changing the compact visual style, and align or document the nutrition level fixture before handoff. | proposed | Prevents A++ |

Decision: needs polish.

## Verification

- `npm run check`: passed on 2026-05-27. Lint, typecheck, route, asset, copy, and brand verification all passed; `verify:routes passed (90 screens, 90 specs)`.
- Build gate: not required for R10.
- State capture: `/opt/homebrew/bin/node /private/tmp/capture-r10-states.mjs` captured 20 interaction states to `../../balencia-screens/output/a-plus-plus-review/R10/states/` and recorded 5 console warnings/errors, including `/domains/sleep` 404 and duplicate-key output on `/domains/fitness`.
