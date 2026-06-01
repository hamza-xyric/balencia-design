# R06 - Call Summary And Missions

- Status: `reviewed`
- Reviewed: 2026-05-27
- Prototype URL: `http://localhost:3000` (existing local Next prototype)
- Screens: `79`, `13`, `14`, `15`, `59`
- Routes: `/tabs/sia/call-summary`, `/tabs/goals`, `/tabs/goals/detail`, `/tabs/goals/create`, `/tabs/goals/streaks`
- Sources: `../batches/batch-06.md`, `../update-batches/batch-u03.md`, `../screen-iteration-batches/P06-call-summary-missions.md`
- Evidence directory: `../../balencia-screens/output/a-plus-plus-review/R06/`
- State evidence: `../../balencia-screens/output/a-plus-plus-review/R06/states/r06-state-capture.json`
- Build gate: required
- Finding IDs: `R06-F01` through `R06-F04`

## Focus

Validate call-to-action follow-through, mission clarity, creation/editing, and streak motivation. A++ requires clear goals, respectful motivation, useful SIA support, and no gamification that feels childish or noisy.

## Required Review Output

- Fresh evidence for every route and key mission/streak states.
- Five-second read, primary action clarity, emotional tone, control inventory, rubric scores, A++ grade, findings, and decision for every screen.
- `npm run check` and `npm run build` results before close.

## Batch Summary

- A++: 59 Streak details.
- A+: 14 Mission detail.
- A: 79 Call summary, 13 Mission board, 15 Create mission.
- Needs polish: Call summary visible confirmation, Mission board collapsed suggestion accessibility, Mission detail initial viewport spacing, Create mission final save handoff.
- Redesign candidates: none.
- User decisions: none.
- Verification: `npm run check` passed on 2026-05-27; `npm run build` passed on 2026-05-27 with the existing Node `DEP0205` deprecation warning.
- Evidence: baseline screenshots and JSON exist for all five R06 routes; fresh interaction evidence captured 33 state screenshots with zero console errors.

## Screen Notes

### 79 - Call summary

- Five-second read: A calm SIA debrief that turns a voice call into summary context, action items, transcript review, and a follow-up path.
- Screen purpose and journey fit: Strong fit after a SIA voice call or voice-history detail; it makes the call feel durable rather than ephemeral.
- Primary action clarity: `Schedule follow-up` is dominant and opens a scheduling sheet, but the final confirmation is not visibly acknowledged after the sheet closes.
- Emotional tone: Reassuring, focused, and appropriately private for a post-call moment.
- Screenshot: `../../balencia-screens/output/a-plus-plus-review/R06/79-tabs-sia-call-summary-phone.png`
- State evidence: `../../balencia-screens/output/a-plus-plus-review/R06/states/79-privacy-sheet.png`, `../../balencia-screens/output/a-plus-plus-review/R06/states/79-action-converted.png`, `../../balencia-screens/output/a-plus-plus-review/R06/states/79-expanded-transcript.png`, `../../balencia-screens/output/a-plus-plus-review/R06/states/79-schedule-sheet.png`, `../../balencia-screens/output/a-plus-plus-review/R06/states/79-follow-up-confirmed.png`
- Grade: A
- Grade cap: major finding R06-F01 prevents A+ or A++.
- Control inventory: Back routes to Voice call history; Transcript ready, Mood steady, and Private open the privacy sheet; action item rows toggle converted mission-task state; transcript highlight and Expand transcript reveal transcript anchors; Schedule follow-up opens the scheduling sheet; Confirm follow-up records the booked state; bottom tabs route globally.

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | The screen solves the right job: turn SIA voice coaching into reviewable action. |
| User friction | 4 | Action conversion, transcript expansion, and scheduling now work, but booking feedback is easy to miss. |
| Visual appeal | 4 | The hero and cards are premium; the fixed CTA competes with transcript content in the lower viewport. |
| Brand fit | 5 | Purple is reserved for SIA/call context, orange owns the follow-up action, and green marks converted actions. |
| Mobile ergonomics | 4 | Controls are 44px-safe, but the confirmation state is not placed where the user just acted. |
| Accessibility | 5 | Visible controls have labels and practical target sizes; privacy details use a dialog. |
| Trust/privacy | 4 | Privacy copy is present, but the scheduled-call success state is not visually trustworthy enough. |
| Industry best practice | 4 | Post-call action mechanics are present; final booking feedback needs a clearer success pattern. |

| Finding ID | Screen / Route | Severity | Category | Evidence | User Impact | Recommendation | Status | Grade cap |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| R06-F01 | 79 Call summary / `/tabs/sia/call-summary` | major | action-feedback | `states/79-schedule-sheet.png` shows the confirm step; after `Confirm follow-up`, `states/79-follow-up-confirmed.png` returns to the same visible CTA and transcript view. The JSON text contains `Friday follow-up is confirmed`, but it is not visible in the captured viewport. | Users may not know whether the follow-up was booked, which weakens trust in the screen's primary action. | After confirmation, show a visible success toast or inline booked state near the CTA, update the CTA to the booked date/time, and keep the aria-live confirmation aligned with the visible feedback. | proposed | Prevents A+ or A++ |

Decision: needs polish.

### 13 - Mission board

- Five-second read: A polished mission command center with clear filters, pinned missions, a creation FAB, and SIA suggestions.
- Screen purpose and journey fit: Correct Goals root for scanning active missions, narrowing by type/status/domain, opening mission detail, and starting creation.
- Primary action clarity: Mission cards route to detail and the FAB opens mission creation; filters and sheets are now stateful.
- Emotional tone: Motivating and organized, with mature RPG language.
- Screenshot: `../../balencia-screens/output/a-plus-plus-review/R06/13-tabs-goals-phone.png`
- State evidence: `../../balencia-screens/output/a-plus-plus-review/R06/states/13-initial.png`, `../../balencia-screens/output/a-plus-plus-review/R06/states/13-type-side.png`, `../../balencia-screens/output/a-plus-plus-review/R06/states/13-status-done.png`, `../../balencia-screens/output/a-plus-plus-review/R06/states/13-domain-sheet.png`, `../../balencia-screens/output/a-plus-plus-review/R06/states/13-domain-applied.png`, `../../balencia-screens/output/a-plus-plus-review/R06/states/13-suggestions-expanded.png`, `../../balencia-screens/output/a-plus-plus-review/R06/states/13-suggestion-accepted.png`, `../../balencia-screens/output/a-plus-plus-review/R06/states/13-fab-create.png`
- Grade: A
- Grade cap: major finding R06-F02 prevents A+ or A++.
- Control inventory: Mission Journal routes to Mission journal; domain filter opens a bottom sheet with selectable domain chips and Apply; type chips update mission scope; status tabs update list state and empty state; Life areas overview routes to Me/Life areas; mission cards route to detail; SIA suggestions expands/collapses; visible suggestion actions Accept/Modify/Dismiss work when expanded; FAB opens Create mission; bottom tabs route globally.

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | The mission board architecture is right for the Goals root. |
| User friction | 4 | Filtering, empty state, suggestions, and creation are operable; hidden collapsed suggestion actions add accessibility friction. |
| Visual appeal | 4 | Cards, filters, and FAB are composed; the lower viewport is dense but still readable. |
| Brand fit | 5 | Orange action hierarchy, domain tags, and restrained RPG framing align with Balencia. |
| Mobile ergonomics | 5 | Visible controls meet practical 44px target expectations in fresh evidence. |
| Accessibility | 3 | Collapsed SIA suggestion action controls remain in the DOM as visually hidden interactive targets. |
| Trust/privacy | 5 | No sensitive ask, and SIA suggestions are user-controlled when expanded. |
| Industry best practice | 4 | Main list behavior is strong; collapsed content should not expose hidden actions to assistive navigation. |

| Finding ID | Screen / Route | Severity | Category | Evidence | User Impact | Recommendation | Status | Grade cap |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| R06-F02 | 13 Mission board / `/tabs/goals` | major | accessibility | `states/r06-state-capture.json` records 6 hidden controls in the collapsed state: two sets of `Accept`, `Modify`, and `Dismiss` at 16-18px wide while `states/13-initial.png` shows only the collapsed SIA Suggestions header. The same hidden controls persist through type/status/domain filter states until suggestions are expanded. | Screen-reader and keyboard users can encounter suggestion actions that sighted users cannot see, and the automated target audit flags them as tiny hidden controls. | Do not render suggestion action buttons until the section is expanded, or mark the collapsed content `hidden`/`inert` with focus removed. Keep only the collapsible header in the accessibility tree while closed. | proposed | Prevents A+ or A++ |

Decision: needs polish.

### 14 - Mission detail

- Five-second read: A focused mission deep dive with hero progress, mission context, SIA coaching, next action, and expandable detail.
- Screen purpose and journey fit: Strong detail surface after a mission-card tap; it answers progress, why it matters, and what to do next.
- Primary action clarity: `Complete next action: 5K tempo run` updates the ring from 68 to 86, increases action count and XP, and reveals completion feedback.
- Emotional tone: Encouraging, practical, and coach-like without becoming noisy.
- Screenshot: `../../balencia-screens/output/a-plus-plus-review/R06/14-tabs-goals-detail-phone.png`
- State evidence: `../../balencia-screens/output/a-plus-plus-review/R06/states/14-initial.png`, `../../balencia-screens/output/a-plus-plus-review/R06/states/14-pin-toggled.png`, `../../balencia-screens/output/a-plus-plus-review/R06/states/14-action-completed.png`, `../../balencia-screens/output/a-plus-plus-review/R06/states/14-all-actions-expanded.png`, `../../balencia-screens/output/a-plus-plus-review/R06/states/14-sia-reasoning-expanded.png`, `../../balencia-screens/output/a-plus-plus-review/R06/states/14-ask-sia-navigates.png`
- Grade: A+
- Grade cap: minor finding R06-F03 prevents A++.
- Control inventory: Back returns to Mission board; pin toggles pinned/unpinned state with feedback; edit routes to Create mission; next-action checkbox completes/undoes the next action and updates progress/XP; All actions, Milestones, Mission chain, SIA's reasoning, Cross-domain links, and Progress over time expand inline; Ask SIA routes to SIA chat with mission context; bottom tabs route globally.

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | The screen has the right hierarchy for mission progress and next action. |
| User friction | 5 | Completion, pinning, disclosure, edit, and Ask SIA routes all work in fresh evidence. |
| Visual appeal | 4 | The composition is premium, but the initial viewport clips the bottom of the primary next-action card. |
| Brand fit | 5 | Orange progress, green completion, purple SIA, and domain tags are balanced. |
| Mobile ergonomics | 4 | Interactive targets are practical, but the first viewport puts supporting next-action detail under the tab bar. |
| Accessibility | 5 | Disclosures and action controls are labeled and stateful. |
| Trust/privacy | 5 | No sensitive ask; SIA reasoning is inspectable rather than mysterious. |
| Industry best practice | 5 | Matches expected detail-screen behavior for progress, disclosure, and contextual coaching. |

| Finding ID | Screen / Route | Severity | Category | Evidence | User Impact | Recommendation | Status | Grade cap |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| R06-F03 | 14 Mission detail / `/tabs/goals/detail` | minor | mobile-ergonomics | `14-tabs-goals-detail-evidence.json` flags `30 min` and `This builds the endurance base` overlapping the tab bar, and `states/14-initial.png` shows the bottom of the primary next-action card clipped in the first viewport. | The main action is still tappable, but the supporting time and SIA reason read as less polished on first load. | Lift the `NEXT UP` card slightly, reduce top spacing, or add viewport-safe scroll positioning so the full primary-action card is visible above the tab bar. | proposed | Prevents A++ |

Decision: needs polish.

### 15 - Create mission

- Five-second read: A SIA-first creation flow that starts with a natural-language intent, then expands into an editable structured plan.
- Screen purpose and journey fit: The input-first model now matches the resolved product decision and belongs behind the mission-board FAB.
- Primary action clarity: `Plan with SIA` is disabled until useful input, shows a planning state, then reveals editable results; final create navigation does not preserve the user's new mission.
- Emotional tone: Smart and helpful, with strong SIA agency and user control.
- Screenshot: `../../balencia-screens/output/a-plus-plus-review/R06/15-tabs-goals-create-phone.png`
- State evidence: `../../balencia-screens/output/a-plus-plus-review/R06/states/15-initial.png`, `../../balencia-screens/output/a-plus-plus-review/R06/states/15-intent-entered.png`, `../../balencia-screens/output/a-plus-plus-review/R06/states/15-planning.png`, `../../balencia-screens/output/a-plus-plus-review/R06/states/15-generated-result.png`, `../../balencia-screens/output/a-plus-plus-review/R06/states/15-edited-generated-plan.png`, `../../balencia-screens/output/a-plus-plus-review/R06/states/15-create-navigates-detail.png`
- Grade: A
- Grade cap: major finding R06-F04 prevents A+ or A++.
- Control inventory: Close returns to Mission board; Mission intent textarea captures the user's goal; Plan with SIA is honestly disabled/enabled and has a planning state; mission-type pills update type; domain Add and remove controls update domains; action add/remove controls update the plan; tracking switches update signals; strictness segmented control updates coaching tone; Link as chain switch updates final CTA copy; Create mission navigates to detail, but the destination does not reflect the created mission.

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | The flow begins correctly, but the final create handoff breaks the promise of creating the entered mission. |
| User friction | 4 | Input, planning, editing, and toggles work; final confirmation/detail continuity is missing. |
| Visual appeal | 5 | The input state and generated result are polished, legible, and domain-appropriate. |
| Brand fit | 5 | SIA planning, orange CTA, and domain tags align well. |
| Mobile ergonomics | 5 | Fresh evidence shows no visible small targets; controls are touch-safe. |
| Accessibility | 5 | The text area, switches, tabs, disabled CTA, and generated controls expose useful labels/states. |
| Trust/privacy | 4 | No sensitive ask, but the save mismatch can make users doubt whether their input was respected. |
| Industry best practice | 3 | Creation flows should end with the created item, a clear success state, or an honest prototype limitation. |

| Finding ID | Screen / Route | Severity | Category | Evidence | User Impact | Recommendation | Status | Grade cap |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| R06-F04 | 15 Create mission / `/tabs/goals/create` | major | conversion | `states/15-generated-result.png` and `states/15-edited-generated-plan.png` show a generated mission for `Run a 10K without injury`; after tapping `Create mission`, `states/15-create-navigates-detail.png` lands on `/tabs/goals/detail` for the static `Run a half marathon` mission. | Users cannot verify that their mission was created, and Figma handoff still needs a concrete success/detail state for the newly generated mission. | Persist the generated mission in local prototype state, route to a detail view that reflects the entered title/type/domains, or show a visible board/detail success state. If static navigation is intentional, document it as a prototype limitation instead of presenting it as a completed create action. | proposed | Prevents A+ or A++ |

Decision: needs polish.

### 59 - Streak details

- Five-second read: A warm streak trophy screen with a 42-day hero, calendar, multiplier explanation, freeze management, rewards, leaderboard, and history.
- Screen purpose and journey fit: Strong fit for Me/RPG streak motivation; the route is still `/tabs/goals/streaks`, but the live screen preserves Me tab context and backs to `/tabs/me/rpg`.
- Primary action clarity: `Use freeze` opens a confirmation sheet, `Confirm` reduces the available count, and the reserved-freeze notice is visible.
- Emotional tone: Motivating and premium without childish gamification.
- Screenshot: `../../balencia-screens/output/a-plus-plus-review/R06/59-tabs-goals-streaks-phone.png`
- State evidence: `../../balencia-screens/output/a-plus-plus-review/R06/states/59-initial.png`, `../../balencia-screens/output/a-plus-plus-review/R06/states/59-day-detail.png`, `../../balencia-screens/output/a-plus-plus-review/R06/states/59-next-month.png`, `../../balencia-screens/output/a-plus-plus-review/R06/states/59-freeze-confirmation.png`, `../../balencia-screens/output/a-plus-plus-review/R06/states/59-freeze-reserved.png`, `../../balencia-screens/output/a-plus-plus-review/R06/states/59-leaderboard-navigation.png`
- Grade: A++
- Grade cap: none.
- Control inventory: Back returns to Me/RPG; Previous/Next month update the calendar label and notice; calendar day buttons expose completed/freeze/missed/future labels and show day detail notices; Use freeze opens a confirmation sheet; Keep freeze cancels; Confirm reserves a freeze and updates count; See full leaderboard routes to Leaderboard; milestones/history are static informational rows; bottom tabs route globally with Me active.

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | The screen gives streak status, motivation, protection, rewards, and social context in one coherent place. |
| User friction | 5 | Month navigation, day detail, freeze confirmation, and leaderboard navigation all work with clear feedback. |
| Visual appeal | 5 | The hero, calendar, cards, and reward ladder feel polished and warm. |
| Brand fit | 5 | Orange streak energy, green earned states, and restrained RPG copy fit Balencia. |
| Mobile ergonomics | 5 | Fresh evidence shows practical 44px controls and reachable primary actions. |
| Accessibility | 5 | Calendar days, month controls, confirmation buttons, and leaderboard link have clear labels/states. |
| Trust/privacy | 5 | No sensitive ask; freeze use is confirmed before spending the resource. |
| Industry best practice | 5 | Meets expectations for calendar drill-in, reward clarity, confirmation, and leaderboard continuation. |

| Finding ID | Screen / Route | Severity | Category | Evidence | User Impact | Recommendation | Status | Grade cap |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| No major findings | 59 Streak details / `/tabs/goals/streaks` | none | none | Fresh evidence shows working month navigation, day detail notice, freeze confirmation/count update, leaderboard navigation, zero console errors, and no unresolved control-purpose gaps. | No user-facing issue found. | No change needed for Figma handoff. | accepted | none |

Decision: A++ / Figma-ready.

## Verification Results

| Date | Command | Result | Notes |
| --- | --- | --- | --- |
| 2026-05-27 | `node /private/tmp/capture-r06-states.mjs` | passed | Captured 33 interaction screenshots plus JSON under `../../balencia-screens/output/a-plus-plus-review/R06/states/`; console messages: 0. |
| 2026-05-27 | `npm run check` | passed | lint, typecheck, route, asset, copy, and brand verification passed. |
| 2026-05-27 | `npm run build` | passed | Production build completed successfully; emitted existing Node `DEP0205` deprecation warning. |
