# R14 - Accountability And Recovery Tools

- Status: `reviewed`
- Screens: `46`, `47`, `48`, `52`, `53`
- Routes: `/features/accountability`, `/features/competitions`, `/features/intelligence`, `/features/stress`, `/features/breathing`
- Sources: `../batches/batch-14.md`, `../update-batches/batch-u07.md`, `../screen-iteration-batches/P14-accountability-recovery-tools.md`
- Reviewed: 2026-05-27
- Prototype URL: `http://localhost:3000`
- Evidence directory: `../../balencia-screens/output/a-plus-plus-review/R14/`
- State evidence: `../../balencia-screens/output/a-plus-plus-review/R14/states/r14-state-capture.json`
- Build gate: no
- Finding IDs: `R14-F01` through `R14-F07`

## Focus

Validate accountability, competitions, intelligence, stress support, and breathing. A++ requires emotionally safe accountability, explainable insights, and calm recovery tools with clear active states.

## Batch Summary

- Grade count: `A++: 0`, `A+: 0`, `A: 5`, `Below A: 0`
- A++ screens: none.
- Screens capped below A++: all five R14 screens.
- Must-fix before A++: consent gating on Accountability, real filtering and final actions on Competitions, recent-insight feedback on Intelligence, stale Undo state on Stress, real context filtering and post-session rating on Breathing.
- Console/runtime: fresh R14 state capture reported `0` console errors.
- Verification: `npm run check` passed.

## Screen Notes

### 46 - Accountability

- Status: reviewed
- Route: `/features/accountability`
- Five-second read: A consent-first accountability surface with partner previews, tabs for contracts/triggers, and a clear consent setup banner.
- Screen purpose and journey fit: This belongs in the social/accountability layer and correctly frames accountability as opt-in, Plus-adjacent, and privacy-sensitive.
- Primary action clarity: `Configure` is the right first step, but other pre-consent controls still look and behave active before consent is complete.
- Emotional tone: Serious and safety-oriented; the warm orange consent surface fits the gravity of partner visibility.
- Screenshot/evidence paths: `../../balencia-screens/output/a-plus-plus-review/R14/46-features-accountability-phone.png`; state evidence in `states/46-consent-dialog.png`, `states/46-consent-configured.png`, `states/46-manage-before-consent.png`, `states/46-contracts-tab.png`, `states/46-triggers-tab.png`.

| Visible control | Intended user value | State / evidence |
| --- | --- | --- |
| Back | Return to the prior Me/Explore context. | 44x44 header button in route evidence. |
| Configure | Open consent setup before accountability features activate. | Opens consent dialog; `46-consent-dialog.png`; Save removes the banner. |
| Partners / Contracts / Triggers tabs | Switch between accountability sub-areas. | Tabs switch state; contracts and triggers evidence captured after consent. |
| Add partner | Add a new accountability partner. | Honestly disabled before consent; enabled after consent setup. |
| Manage | Manage the Morning crew group. | Opens a dialog even before consent; see `R14-F01`. |
| Review contract / Configure trigger | Start contract and trigger setup flows. | Opens prototype dialogs after tab switch. |
| Save / Cancel in sheets | Confirm or dismiss setup sheets. | Working modal controls in captured state evidence. |

| Dimension | Score | Notes |
| --- | ---: | --- |
| Product sense | 4 | The consent-first accountability model is right, but the pre-consent interaction model is not fully aligned with the spec. |
| User friction | 4 | Core setup and tabs now work; the remaining problem is state gating, not basic navigation. |
| Visual appeal | 4 | Strong dark surfaces and clear orange consent hierarchy. |
| Brand fit | 5 | Social-mode orange and restrained SIA/Plus language fit Balencia. |
| Mobile ergonomics | 4 | Targets meet the 44px bar in fresh route evidence. |
| Accessibility | 4 | Semantic tabs and buttons are present; disabled/active state needs stronger alignment with consent semantics. |
| Trust/privacy | 3 | Group management and partner details remain active/visible before consent. |
| Industry best practice | 3 | Sensitive social accountability surfaces must hard-gate actions before consent is saved. |

- A++ grade: `A`
- Grade cap: `R14-F01` is an unresolved `major`, so the screen cannot receive `A+` or `A++`.

| Finding ID | Severity | Category | Evidence | User impact | Recommendation | Status | Grade cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R14-F01 | major | trust-privacy | Initial evidence shows `Contracts`, `Triggers`, and `Manage` enabled before consent. Clicking `Manage` opens `states/46-manage-before-consent.png` with a working `Manage group` sheet while the banner still says accountability features require consent. | Users can attempt group management and view partner/group context before explicitly configuring accountability consent, weakening trust in the privacy gate. | Make the pre-consent state a true locked preview: keep only `Configure` active, disable or explain all partner/group/contract/trigger actions, and hide sensitive partner/group details until consent is saved. | proposed | Prevents A+ / A++ |

Decision: `needs polish`

### 47 - Competitions

- Status: reviewed
- Route: `/features/competitions`
- Five-second read: A premium competition discovery page with a featured challenge, filters, invitations, AI suggestions, and browsable competition cards.
- Screen purpose and journey fit: The screen fits the optional social-motivation layer and keeps the tone mature rather than childish.
- Primary action clarity: `Join now` is visually dominant, but the join/reminder controls inside the resulting sheet do not complete or change state.
- Emotional tone: Motivating, social, and polished, with good orange competition energy.
- Screenshot/evidence paths: `../../balencia-screens/output/a-plus-plus-review/R14/47-features-competitions-phone.png`; state evidence in `states/47-active-filter.png`, `states/47-join-dialog.png`, `states/47-join-private-after-click.png`, `states/47-remind-after-click.png`, `states/47-my-competitions-filter.png`.

| Visible control | Intended user value | State / evidence |
| --- | --- | --- |
| Back | Return to Explore/previous stack. | 44x44 header button in route evidence. |
| Join now | Start participation in the featured competition. | Opens detail sheet; final join button is inert, see `R14-F02`. |
| View details | Inspect featured competition details. | Opens detail sheet. |
| All / Active / Upcoming / Past / My competitions | Filter competition list. | Selected label changes; list contents do not filter, see `R14-F03`. |
| Invitation card | Review pending invitations. | Opens detail sheet. |
| AI suggestion cards | Review SIA-recommended competitions. | Open detail sheets. |
| Row CTAs: View details / Join / View results | Inspect, join, or review specific competitions. | Open detail sheets; final sheet actions need completion behavior. |
| Join private / Remind me / Close | Choose privacy-first participation, set reminder, or dismiss. | `Close` works; `Join private` and `Remind me` do not change text, route, dialog state, or selected state. |

| Dimension | Score | Notes |
| --- | ---: | --- |
| Product sense | 4 | The social challenge model is right, but private/self-only participation is not actually executable yet. |
| User friction | 3 | Users can open sheets, but cannot complete join/reminder decisions and filters misrepresent list contents. |
| Visual appeal | 4 | Featured card, chips, and invitation card feel premium and readable. |
| Brand fit | 5 | Orange-led competition styling fits Social Mode. |
| Mobile ergonomics | 4 | Fresh evidence shows primary and secondary targets at 44px or larger. |
| Accessibility | 4 | Targets are large enough, but filter semantics need truthful result changes. |
| Trust/privacy | 4 | The sheet names private/self-only participation, but the actual privacy path is not completed. |
| Industry best practice | 3 | Challenge apps need filters and join/reminder states to behave predictably. |

- A++ grade: `A`
- Grade cap: `R14-F02` and `R14-F03` are unresolved `major` findings, so the screen cannot receive `A+` or `A++`.

| Finding ID | Severity | Category | Evidence | User impact | Recommendation | Status | Grade cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R14-F02 | major | retention | `states/r14-state-capture.json` records `joinPrivateChangedText: false` and `remindChangedText: false`; screenshots `47-join-private-after-click.png` and `47-remind-after-click.png` remain on the same sheet. | Users reach the crucial join/reminder moment but receive no confirmation, state change, or next step, so competition participation still feels unfinished. | Wire `Join private` and `Remind me` to visible processing/success/selected states, and include the promised self-only participation path. | proposed | Prevents A+ / A++ |
| R14-F03 | major | information-architecture | `47-active-filter.png` and `47-my-competitions-filter.png` show the selected filter label changing while the list still includes active, upcoming, and past rows together. | Users cannot trust filters to narrow competition choices or show only their competitions. | Make every filter change the visible list, empty state, count, and selected semantics; keep past/unjoined rows out of Active/My filtered states. | proposed | Prevents A+ / A++ |

Decision: `needs polish`

### 48 - Intelligence Dashboard

- Status: reviewed
- Route: `/features/intelligence`
- Five-second read: A polished SIA intelligence briefing with score, contradictions, trend controls, correlations, report, predictions, and recent insights.
- Screen purpose and journey fit: This is a strong cross-domain AI analytics surface and clearly belongs in Balencia's differentiated SIA layer.
- Primary action clarity: Reviewing/dismissing contradictions is clear and now functional; recent insight feedback remains below the bar.
- Emotional tone: Analytical, premium, confident, and appropriately SIA-purple.
- Screenshot/evidence paths: `../../balencia-screens/output/a-plus-plus-review/R14/48-features-intelligence-phone.png`; state evidence in `states/48-range-14d.png`, `states/48-dismiss-contradiction.png`, `states/48-resolve-dialog.png`, `states/48-more-dialog.png`, `states/48-recent-insights-before-feedback.png`, `states/48-recent-insights-after-feedback.png`.

| Visible control | Intended user value | State / evidence |
| --- | --- | --- |
| Back | Return to Explore. | Link to `/tabs/me/explore`. |
| More options | Open intelligence settings/export/about options. | Opens bottom sheet; `48-more-dialog.png`. |
| Dismiss | Remove a contradiction. | Count drops from 2 to 1; `48-dismiss-contradiction.png`. |
| Resolve | Review contradiction sources and save a resolution. | Opens source review sheet; Save removes the item. |
| 7d / 14d / 30d | Change score-trend range. | Selected state changes; `48-range-14d.png`. |
| See all | Open all correlations. | Opens detail sheet. |
| See full report | Open report detail. | Opens detail sheet. |
| Prediction helpful / not helpful | Provide feedback on prediction quality. | 44x44 controls; pressed state changes. |
| Recent insight thumbs | Provide feedback on individual insights. | 32x44 and no pressed/state change; see `R14-F04`. |
| Explore your health knowledge graph | Navigate to graph view. | Link to `/tabs/me/knowledge-graph`. |

| Dimension | Score | Notes |
| --- | ---: | --- |
| Product sense | 5 | The screen strongly expresses Balencia's cross-domain intelligence promise. |
| User friction | 4 | Most drilldowns work; recent insight feedback breaks the learning loop. |
| Visual appeal | 5 | Purple hierarchy, score ring, and card density are polished. |
| Brand fit | 5 | This is the right place for a SIA-heavy purple treatment. |
| Mobile ergonomics | 4 | Most targets are 44px; recent insight thumbs are only 32px wide. |
| Accessibility | 3 | Recent insight feedback controls are both small and inert. |
| Trust/privacy | 4 | Contradiction source review is present; feedback provenance still needs completion. |
| Industry best practice | 4 | Strong analytics surface, capped by incomplete feedback controls. |

- A++ grade: `A`
- Grade cap: `R14-F04` is an unresolved `major`, so the screen cannot receive `A+` or `A++`.

| Finding ID | Severity | Category | Evidence | User impact | Recommendation | Status | Grade cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R14-F04 | major | accessibility | Route evidence lists four recent-insight feedback buttons at `32x44`. State capture shows `recentInsightAriaPressedBefore: null` and `recentInsightAriaPressedAfter: null` after clicking the first recent insight feedback control. | Users cannot reliably tap or confirm feedback on recent insights, and SIA appears unable to learn from those controls. | Expand each recent insight feedback target to at least 44x44 and wire visible `aria-pressed`/selected state plus success or undo feedback. | proposed | Prevents A+ / A++ |

Decision: `needs polish`

### 52 - Stress Management

- Status: reviewed
- Route: `/features/stress`
- Five-second read: A calm stress command center with a clear gauge, quick-log flow, SIA note, trend controls, recovery, relief tools, and biometric context.
- Screen purpose and journey fit: This is a strong wellbeing recovery screen and fits the "what is happening and what can I do now?" moment.
- Primary action clarity: Stress logging is clear, with semantic slider, trigger chips, note field, submit, success, and undo evidence; the status Undo control becomes stale in non-log states.
- Emotional tone: Calm, supportive, and less intense than social/competition surfaces.
- Screenshot/evidence paths: `../../balencia-screens/output/a-plus-plus-review/R14/52-features-stress-phone.png`; state evidence in `states/52-quick-log-filled.png`, `states/52-logged-success.png`, `states/52-undo.png`, `states/52-ask-sia.png`, `states/52-range-14d.png`, `states/52-fab-log.png`.

| Visible control | Intended user value | State / evidence |
| --- | --- | --- |
| Back | Return to Explore. | Link to `/tabs/me/explore`. |
| Lv.5 | Open RPG character/progress context. | Link to `/tabs/me/rpg`. |
| Stress level slider | Set stress rating. | Semantic range input in route evidence. |
| Trigger chips | Select stress triggers. | Multi-select state captured in `52-quick-log-filled.png`. |
| Optional note | Add context to the log. | Textarea captured in filled state. |
| Log stress | Submit a stress log. | Shows success with undo; `52-logged-success.png`. |
| Undo | Reverse the latest stress log. | Works immediately after logging, but remains stale in later non-log status states. |
| Ask SIA | Open or document stress-context SIA follow-up. | Shows stress-context status; `52-ask-sia.png`. |
| 7d / 14d / 30d | Change stress trend range. | Selected state captured in `52-range-14d.png`. |
| Relief tool cards | Navigate to Breathing, Meditation, or Yoga. | Links present with 104px card targets. |
| Floating Log | Bring attention back to quick logging. | Shows `Quick log ready`, but carries stale Undo state; see `R14-F05`. |

| Dimension | Score | Notes |
| --- | ---: | --- |
| Product sense | 5 | Stress score, quick log, SIA note, and relief routing all belong here. |
| User friction | 4 | Core logging works, but stale Undo state creates a confusing recovery/control loop. |
| Visual appeal | 4 | Calm teal gauge and warm surfaces are strong; the quick-log viewport is dense with the FAB overlay. |
| Brand fit | 5 | Wellbeing teal, orange action, and purple SIA note follow the brand gates. |
| Mobile ergonomics | 4 | Targets meet size requirements; floating and in-card log controls need final state polish. |
| Accessibility | 4 | Semantic inputs/buttons are present; stale status action needs clearer state semantics. |
| Trust/privacy | 4 | Sensitive stress logging is transparent and does not overclaim. |
| Industry best practice | 4 | Solid stress-tool structure, capped by status/action cleanup. |

- A++ grade: `A`
- Grade cap: `R14-F05` is an unresolved `major`, so the screen cannot receive `A+` or `A++`.

| Finding ID | Severity | Category | Evidence | User impact | Recommendation | Status | Grade cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R14-F05 | major | interaction-state | `states/r14-state-capture.json` shows `undoText: "Log undoneUndo"`, `askSiaText: "SIA opened with stress contextUndo"`, and `fabText: "Quick log readyUndo"`. Screenshots `52-undo.png`, `52-ask-sia.png`, and `52-fab-log.png` preserve the stale Undo button after non-log statuses. | Users see an Undo action when there is no clear stress log left to undo, which creates confusion in a sensitive wellbeing flow. | Scope Undo only to the submitted-log success state, remove it after undo/non-log statuses, and make Ask SIA/FAB statuses use their own relevant next actions. | proposed | Prevents A+ / A++ |

Decision: `needs polish`

### 53 - Breathing Exercises

- Status: reviewed
- Route: `/features/breathing`
- Five-second read: A calm breathing library with stats, context chips, exercise cards, and a focused active-session mode.
- Screen purpose and journey fit: The library-to-practice flow is on target for immediate stress recovery and wellbeing practice.
- Primary action clarity: Exercise cards clearly start a session, and active mode hides the tab bar; filters and post-session learning are incomplete.
- Emotional tone: Calm, spacious, and premium in active mode.
- Screenshot/evidence paths: `../../balencia-screens/output/a-plus-plus-review/R14/53-features-breathing-phone.png`; state evidence in `states/53-during-stress-filter.png`, `states/53-active-session.png`, `states/53-paused-session.png`, `states/53-duration-toggled.png`, `states/53-completed-saved.png`.

| Visible control | Intended user value | State / evidence |
| --- | --- | --- |
| Back | Return to previous Explore/Stress context. | Link to `/tabs/me/explore`. |
| Lv.5 | Open RPG progress context. | Link to `/tabs/me/rpg`. |
| Context filters | Narrow breathing techniques by use case. | Selected state changes, but list is unchanged; see `R14-F06`. |
| Exercise cards | Start a breathing session. | Start active session; `53-active-session.png`. |
| Close | Exit active session. | Returns to library. |
| Pause / Resume | Pause or resume breathing guidance. | Paused state captured in `53-paused-session.png`. |
| Duration selector | Change session duration. | Toggles duration; `53-duration-toggled.png`. |
| Complete and save | Finish session and record progress. | Returns to library with saved status; no rating sheet appears. |

| Dimension | Score | Notes |
| --- | ---: | --- |
| Product sense | 4 | The library and immersive session fit the recovery journey, but post-session learning is missing. |
| User friction | 4 | Starting, pausing, and saving are easy; filters do not actually help users choose. |
| Visual appeal | 5 | Active-session composition is calm, focused, and polished. |
| Brand fit | 5 | Wellbeing teal, dark-first atmosphere, and restrained orange action fit Balencia. |
| Mobile ergonomics | 5 | Exercise cards and session controls have generous touch targets; active mode hides the tab bar as required. |
| Accessibility | 4 | Controls are semantic and labeled, but filter truthfulness and post-session state need completion. |
| Trust/privacy | 5 | No sensitive data or permission risk in the visible flow. |
| Industry best practice | 3 | Breathing tools need functional context filters and a post-session rating/learning loop. |

- A++ grade: `A`
- Grade cap: `R14-F06` is an unresolved `major`, so the screen cannot receive `A+` or `A++`; `R14-F07` also prevents `A++`.

| Finding ID | Severity | Category | Evidence | User impact | Recommendation | Status | Grade cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R14-F06 | major | information-architecture | State capture records `duringStressFilterChangedList: false`; `53-during-stress-filter.png` shows the chip selected while the full exercise list remains unchanged. | Users cannot rely on contextual filters to find the right technique during stress, before sleep, or for focus. | Make each filter narrow or reorder the exercise list, update counts/empty states, and preserve selected semantics. | proposed | Prevents A+ / A++ |
| R14-F07 | minor | Figma-handoff | After `Complete and save`, state capture records `postSessionDialogCount: 0` and `53-completed-saved.png` shows only a saved status. The spec calls for a post-session effectiveness rating bottom sheet. | Figma still needs the rating/learning state that teaches SIA which breathing techniques work for the user. | Add or document the post-session rating sheet with stars, optional note, save, skip, and dismissed states. | proposed | Prevents A++ |

Decision: `needs polish`

## Verification

| Command | Result | Notes |
| --- | --- | --- |
| `/opt/homebrew/bin/node scripts/capture-r14-states.mjs` | passed | Captured fresh R14 initial and interaction evidence with `0` console errors. |
| `npm run check` from `balencia-screens` | passed | `eslint`, `tsc --noEmit`, `verify:routes`, `verify:assets`, `verify:copy`, and `verify:brand` passed. |
