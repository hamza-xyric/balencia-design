# R09 - Me Utilities And Achievements

- Status: `reviewed`
- Screens: `24`, `25`, `49`, `50`, `71`
- Routes: `/tabs/me/notifications`, `/tabs/me/help`, `/tabs/me/progress-photos`, `/tabs/me/profile-edit`, `/tabs/me/achievements`
- Sources: `../batches/batch-09.md`, `../update-batches/batch-u05.md`, `../screen-iteration-batches/P09-me-utilities-achievements.md`
- Evidence directory: `../../balencia-screens/output/a-plus-plus-review/R09/`
- Fresh state evidence: `../../balencia-screens/output/a-plus-plus-review/R09/states/r09-state-capture.json`
- Reviewed: 2026-05-27
- Prototype URL: `http://localhost:3000`
- Build gate: required, passed
- Finding IDs: `R09-F01` - `R09-F05`

## Focus

Validate support utilities, profile editing, photo privacy, and achievement motivation. A++ requires quiet utility quality, privacy before sensitive media, and achievement framing that motivates without demoralizing.

## Batch Summary

| Grade | Count | Screens |
| --- | ---: | --- |
| A++ | 2 | 24 Notification history, 25 Help center |
| A+ | 0 | - |
| A | 3 | 49 Progress photos, 50 Profile edit, 71 Achievement gallery |
| Below A | 0 | - |

- Ship-ready / Figma-ready: 24 Notification history, 25 Help center.
- Needs polish before A++: 49 Progress photos, 50 Profile edit, 71 Achievement gallery.
- Redesign candidates: None. The remaining work is focused interaction/layout polish, not a product rethink.
- Deferred decisions: None. Existing privacy and low-motivation achievement decisions are sufficient.

## Evidence And Verification

- Initial route evidence: `../../balencia-screens/output/a-plus-plus-review/R09/*-phone.png`
- Interaction-state evidence: `../../balencia-screens/output/a-plus-plus-review/R09/states/*.png`
- State capture JSON: `../../balencia-screens/output/a-plus-plus-review/R09/states/r09-state-capture.json`
- Console/runtime output: state capture recorded `consoleErrors: []`.
- `npm run check` from `balencia-screens`: passed.
- `npm run build` from `balencia-screens`: passed; build emitted the existing Node `DEP0205` deprecation warning from tooling and exited 0.

## Screen Notes

### 24 - Notification history

- Status: reviewed
- Route: `/tabs/me/notifications`
- Five-second read: A calm notification archive grouped by time, with unread state, readable categories, and a clear read-management action.
- Screen purpose and journey fit: Strong. It gives Me-tab users a low-friction way to revisit missed SIA, reminder, check-in, and social prompts.
- Primary action clarity: Strong. Rows read as tappable deep links; `Mark all read` visibly changes state and exposes undo.
- Emotional tone: Quiet, useful, and not nagging. Purple is limited to SIA origin, orange to attention/action, and green to check-in state.
- Screenshot/evidence paths: `../../balencia-screens/output/a-plus-plus-review/R09/states/24-notifications-initial.png`, `24-notifications-mark-all-read.png`, `24-notifications-undo.png`, `24-notifications-sia-deeplink.png`, `r09-state-capture.json`.

| Visible control | Purpose | Observed state / behavior |
| --- | --- | --- |
| Back | Return to prior Me stack screen | Labeled 44x44 button. |
| Mark all read | Clear unread state | Active initially; after tap all rows become read, button disables, and undo feedback appears. |
| Notification rows | Deep-link to relevant destination | Seven 80-85px buttons with read/unread, category, preview, timestamp, and href targets. SIA insight navigated to `/tabs/me/knowledge-graph`. |
| Undo toast | Restore unread state | 300x44 button restored unread rows. |
| Tab bar | Primary app navigation | Standard Today/SIA/Missions/Me tab controls visible. |

| Dimension | Score | Notes |
| --- | ---: | --- |
| Product sense | 5 | The screen cleanly solves notification recovery without becoming a destination. |
| User friction | 5 | Read-state management and deep-linking work with clear feedback. |
| Visual appeal | 5 | Grouped cards, icons, and hierarchy are premium and restrained. |
| Brand fit | 5 | Orange, green, and purple follow the brand roles exactly. |
| Mobile ergonomics | 5 | Rows and header actions meet practical touch targets. |
| Accessibility | 5 | Rows expose read state, category, title, preview, and timestamp through labels. |
| Trust/privacy | 5 | Personal insight previews are brief, controlled, and navigable. |
| Industry best practice | 5 | The route supports deep links, read-state mutation, disabled state, and undo. |

- A++ grade: `A++`
- Grade cap reason: None.

| Finding | Severity | Category | Evidence | User impact | Recommendation | Status | Grade cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| No major findings | - | - | Fresh state capture shows working deep link, mark-all-read, disabled state, undo, and zero console errors. | - | Keep current behavior for Figma handoff. | - | None |

Decision: `A++`

### 25 - Help center

- Status: reviewed
- Route: `/tabs/me/help`
- Five-second read: A SIA-first help surface with search, expandable FAQs, and human support fallback.
- Screen purpose and journey fit: Strong. It correctly lets users solve issues via SIA, self-service FAQ, or support form without leaving Me.
- Primary action clarity: Strong. `Ask SIA` is dominant, search is clearly editable, and support escalation is available.
- Emotional tone: Reassuring and utility-focused; SIA feels helpful rather than intrusive.
- Screenshot/evidence paths: `../../balencia-screens/output/a-plus-plus-review/R09/states/25-help-initial.png`, `25-help-search-privacy.png`, `25-help-support-form.png`, `25-help-support-queued.png`, `25-help-ask-sia-route.png`, `r09-state-capture.json`.

| Visible control | Purpose | Observed state / behavior |
| --- | --- | --- |
| Back | Return to Me stack | Labeled 44x44 button. |
| Search help topics | Filter FAQ content | Real input; `privacy` narrowed FAQ to Privacy & data and exposed a clear button. |
| Clear search | Reset FAQ query | Appears after typing and returns the FAQ list to default. |
| Ask SIA | Route to SIA support context | Link navigated to `/tabs/sia`. |
| FAQ rows | Expand/collapse help answers | Buttons expose expanded/collapsed state and reveal answer copy inline. |
| Contact support | Open support fallback | Opens in-app message form. |
| Support message textarea | Capture support request | Editable field with placeholder. |
| Send request | Submit support request | Disabled until message is long enough; after submit shows queued feedback. |
| Tab bar | Primary app navigation | Standard Today/SIA/Missions/Me tab controls visible. |

| Dimension | Score | Notes |
| --- | ---: | --- |
| Product sense | 5 | SIA, FAQ, and support fallback are in the right order for Balencia. |
| User friction | 5 | Search, FAQ expansion, support validation, and Ask SIA all work. |
| Visual appeal | 5 | Clean cards, strong hierarchy, and restrained support density. |
| Brand fit | 5 | Purple identifies SIA only; orange remains the action color. |
| Mobile ergonomics | 5 | Controls meet 44px target expectations. |
| Accessibility | 5 | Semantic input, buttons, link, disabled state, and FAQ expansion are exposed. |
| Trust/privacy | 5 | Support path is reliable and does not over-collect information. |
| Industry best practice | 5 | Includes search, FAQ, escalation, validation, and confirmation feedback. |

- A++ grade: `A++`
- Grade cap reason: None.

| Finding | Severity | Category | Evidence | User impact | Recommendation | Status | Grade cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| No major findings | - | - | Fresh state capture shows working search, FAQ state, disabled/enabled support submission, queued feedback, Ask SIA routing, and zero console errors. | - | Keep current behavior for Figma handoff. | - | None |

Decision: `A++`

### 49 - Progress photos

- Status: reviewed
- Route: `/tabs/me/progress-photos`
- Five-second read: A strong body-composition dashboard with weight trend, stats, measurements, private-photo copy, progress-photo controls, and Add progress CTA.
- Screen purpose and journey fit: Strong directionally. The screen belongs in Me/Fitness and explains privacy before sensitive photo actions.
- Primary action clarity: Mostly clear, but the modal presentation and subactions are not yet Figma-ready.
- Emotional tone: Premium and data-rich; the privacy copy is calmer than the earlier audit, but clipped sheets weaken trust.
- Screenshot/evidence paths: `../../balencia-screens/output/a-plus-plus-review/R09/states/49-progress-initial.png`, `49-progress-range-1m.png`, `49-progress-add-sheet.png`, `49-progress-empty-weight.png`, `49-progress-saved-toast.png`, `49-progress-compare-sheet.png`, `49-progress-photo-detail.png`, `49-progress-delete-photo-copy.png`, `r09-state-capture.json`.

| Visible control | Purpose | Observed state / behavior |
| --- | --- | --- |
| Back | Return to Me | Link to `/tabs/me`, 44x44. |
| Lv.12 | Open RPG character | Link to `/tabs/me/rpg`, 55x44. |
| Time range pills | Change chart range | `3M` starts pressed; `1M` becomes `aria-pressed=true` after tap. |
| See all | Reach full measurement/add state | Opens Add progress sheet in prototype. |
| Compare | Compare selected photos | Opens compare sheet; `Use these photos` produces feedback. |
| Photo thumbnails | Open encrypted photo detail | Buttons open encrypted-photo sheet. |
| Add progress FAB | Log progress | Opens Add progress sheet. |
| Weight input | Log weight | Editable; empty value disables Save progress. |
| Save progress | Save progress entry | Enabled when weight exists; closes sheet and shows toast. |
| Take photo / Add measurements | Start photo or measurement subflow | Visible active buttons, but current route implementation does not attach follow-up behavior. |
| Delete photo | Start deletion path | Shows copy that deletion would remove backups too, but sheet remains clipped. |
| Tab bar | Primary app navigation | Standard controls visible behind sheet states. |

| Dimension | Score | Notes |
| --- | ---: | --- |
| Product sense | 5 | The dashboard connects trend data, photos, and privacy in a coherent body-composition hub. |
| User friction | 3 | Core range/save/compare/photo states exist, but two sheet subactions are inert and sheets are hard to read. |
| Visual appeal | 3 | Initial dashboard is strong; sheet clipping breaks premium presentation. |
| Brand fit | 4 | Fitness red, orange, purple, and privacy copy are mostly correct. |
| Mobile ergonomics | 2 | Modal/sheet positioning is visibly broken inside the phone frame. |
| Accessibility | 3 | Main controls are labeled, but clipped sheets and inert subactions weaken assistive and touch confidence. |
| Trust/privacy | 3 | Good privacy copy exists, but sensitive photo/delete states are visually compromised. |
| Industry best practice | 3 | Needs robust photo, measurement, comparison, deletion, and modal behavior before handoff. |

- A++ grade: `A`
- Grade cap reason: Unresolved major mobile-ergonomics and retention findings prevent `A+` or `A++`.

| Finding | Severity | Category | Evidence | User impact | Recommendation | Status | Grade cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R09-F01 | major | mobile-ergonomics | `49-progress-add-sheet.png` and `49-progress-photo-detail.png` show bottom sheets clipped horizontally inside the phone frame, with titles/content partially off-screen and the tab/FAB visible behind the sheet. | Users may miss sensitive copy, form labels, and photo-delete context; the screen feels broken at the highest-trust moment. | Anchor sheets to the phone frame/screen shell instead of the browser viewport, add a full scrim, and verify add/compare/photo/delete sheets at 390px width. | proposed | Prevents A+ / A++ |
| R09-F02 | major | retention | `r09-state-capture.json` lists active `Take photo` and `Add measurements` controls in the Add progress sheet; current route implementation renders them as buttons without follow-up state, route, dialog, or disabled treatment. | Users can tap visible primary subactions and receive no outcome, undermining the point of the progress-photo command center. | Wire both controls to documented prototype states, or mark unavailable states honestly with disabled copy and Figma notes for native camera/measurement behavior. | proposed | Prevents A+ / A++ |

Decision: `needs polish`

### 50 - Profile edit

- Status: reviewed
- Route: `/tabs/me/profile-edit`
- Five-second read: A clean personal-data form with avatar, identity fields, disabled Save until dirty, and a typed account-deletion guard.
- Screen purpose and journey fit: Strong. It is focused, quiet, and belongs directly under Me.
- Primary action clarity: Good. Save stays disabled until edits and returns to Me after submit.
- Emotional tone: Calm and utilitarian; destructive action is visually separated, but the confirmation presentation needs more trust polish.
- Screenshot/evidence paths: `../../balencia-screens/output/a-plus-plus-review/R09/states/50-profile-initial.png`, `50-profile-avatar-options.png`, `50-profile-dirty-save-enabled.png`, `50-profile-save-return.png`, `50-profile-delete-disabled.png`, `50-profile-delete-enabled.png`, `50-profile-delete-cancelled.png`, `r09-state-capture.json`.

| Visible control | Purpose | Observed state / behavior |
| --- | --- | --- |
| Back | Return to previous stack screen | Labeled 44x44 button. |
| Avatar / Change photo | Start avatar update | Opens inline `Take photo` / `Choose photo` options. |
| First name / Last name | Edit identity | Text inputs are editable. |
| Email | Show verified email | Read-only value with verified badge. |
| Date of birth | Edit DOB | Numeric input with calendar affordance. |
| Gender | Edit gender | Native select with four options. |
| Phone number | Edit phone | Text input with +971 prefix. |
| Timezone | Edit timezone | Text input; editing enables Save. |
| Save changes | Submit profile changes | Disabled when clean; enabled after timezone edit; routes back to `/tabs/me` after save. |
| Delete account | Open destructive confirmation | Opens inline confirmation with typed `DELETE` guard; Delete disabled until exact text is entered; Cancel closes it. |

| Dimension | Score | Notes |
| --- | ---: | --- |
| Product sense | 5 | The field set and hierarchy are right for profile editing. |
| User friction | 4 | Main editing works, but photo/selectors are simplified compared with the spec. |
| Visual appeal | 4 | Form rhythm is clean, though destructive confirmation appears awkwardly below the fold. |
| Brand fit | 5 | Orange, green, and red are used appropriately with no unnecessary SIA/purple presence. |
| Mobile ergonomics | 3 | The inline delete confirmation and simplified selector flows are not yet native-feeling. |
| Accessibility | 4 | Inputs and disabled states work, but modal/focus trapping is absent for deletion. |
| Trust/privacy | 3 | Typed delete guard exists, but the confirmation presentation is not strong enough for account removal. |
| Industry best practice | 3 | Needs modal/sheet confirmation, picker flows, loading/error states, and clearer system-photo handling. |

- A++ grade: `A`
- Grade cap reason: Unresolved major destructive-flow finding prevents `A+` or `A++`; a minor picker/action-sheet handoff gap also prevents A++.

| Finding | Severity | Category | Evidence | User impact | Recommendation | Status | Grade cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R09-F03 | major | trust-privacy | `50-profile-delete-disabled.png` shows the delete confirmation rendered inline below the current viewport/home indicator instead of as the documented modal/sheet; `r09-state-capture.json` reports `dialogs: 0` for delete confirmation states. | Users may miss the destructive confirmation context, and keyboard/screen-reader focus is not contained for account deletion. | Present account deletion as a modal/bottom sheet with scrim, focus trapping, visible typed-confirmation field, disabled/enabled CTA, cancel path, loading/error states, and root reset on success. | proposed | Prevents A+ / A++ |
| R09-F04 | minor | interaction-handoff | `50-profile-avatar-options.png` shows avatar options as inline buttons, while the spec calls for a system action sheet; Gender and Timezone are implemented as native/input controls rather than documented bottom sheets. | Figma handoff still needs a decision/translation pass for the final native picker and action-sheet behavior. | Either implement the documented sheets in prototype or add explicit Figma behavior notes for avatar, gender, country code, and timezone selectors. | proposed | Prevents A++ |

Decision: `needs polish`

### 71 - Achievement gallery

- Status: reviewed
- Route: `/tabs/me/achievements`
- Five-second read: A premium trophy room with a compact summary, domain filters, low-motivation framing, badge grid, and earned/progress/locked details.
- Screen purpose and journey fit: Strong. It closes the reward loop and adapts locked-badge density for lower motivation.
- Primary action clarity: Filters and cards are clearly tappable, and detail states exist.
- Emotional tone: Motivating without shaming; locked badges are sparse and gently framed.
- Screenshot/evidence paths: `../../balencia-screens/output/a-plus-plus-review/R09/states/71-achievements-initial.png`, `71-achievements-fitness-filter.png`, `71-achievements-earned-detail.png`, `71-achievements-progress-detail.png`, `71-achievements-locked-detail.png`, `71-achievements-empty-filter.png`, `r09-state-capture.json`.

| Visible control | Purpose | Observed state / behavior |
| --- | --- | --- |
| Back | Return to previous stack screen | Labeled 44x44 button. |
| Filter chips | Narrow achievement grid | `All` starts pressed; `Fitness` and `General` become `aria-pressed=true` when selected. |
| Achievement cards | Open badge detail | Earned, progress, and locked cards are buttons with stateful labels. |
| Detail Close | Dismiss detail sheet | Works in earned/progress/locked states. |
| Detail Ask SIA | Ask for next action/context | Link is visible in detail state. |
| Empty filter state | Explain no badges for a domain | `General` filter shows "No general badges yet." |
| Tab bar | Primary app navigation | Standard controls visible. |

| Dimension | Score | Notes |
| --- | ---: | --- |
| Product sense | 5 | Low-motivation display and near-next framing are appropriate. |
| User friction | 4 | Filtering and details work, but detail presentation is hard to read. |
| Visual appeal | 3 | Initial grid is polished; clipped detail sheet damages the premium moment. |
| Brand fit | 5 | Gamification remains restrained and brand-consistent. |
| Mobile ergonomics | 2 | Detail sheet is visibly mispositioned inside the phone frame. |
| Accessibility | 3 | Cards and filters are labeled, but the sheet clipping undermines readable detail access. |
| Trust/privacy | 5 | Low sensitivity and no privacy issues found. |
| Industry best practice | 3 | Needs reliable modal positioning and fuller detail handoff before Figma. |

- A++ grade: `A`
- Grade cap reason: Unresolved major mobile/detail-sheet finding prevents `A+` or `A++`.

| Finding | Severity | Category | Evidence | User impact | Recommendation | Status | Grade cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R09-F05 | major | mobile-ergonomics | `71-achievements-earned-detail.png`, `71-achievements-progress-detail.png`, and `71-achievements-locked-detail.png` show the detail bottom sheet clipped horizontally and vertically, with title/body content partially outside the phone frame and tab chrome still exposed. | Users cannot comfortably read earned/progress/locked badge details, so the trophy-room reward moment feels broken. | Anchor the achievement detail sheet to the phone screen shell, add a proper scrim, keep detail content above the home indicator/tab bar, and retest earned/progress/locked variants. | proposed | Prevents A+ / A++ |

Decision: `needs polish`
