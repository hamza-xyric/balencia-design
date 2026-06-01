# R13 - Habits, Social, Rewards, Paywall

- Status: `reviewed`
- Reviewed: 2026-05-27
- Prototype URL: `http://localhost:3000`
- Screens: `38`, `39`, `40`, `42`, `43`
- Routes: `/features/habits`, `/features/leaderboard`, `/features/community`, `/features/celebration`, `/features/paywall`
- Sources: `../batches/batch-13.md`, `../update-batches/batch-u07.md`, `../screen-iteration-batches/P13-habits-social-rewards-paywall.md`
- Evidence directory: `../../balencia-screens/output/a-plus-plus-review/R13/`
- State evidence: `../../balencia-screens/output/a-plus-plus-review/R13/states/r13-state-capture.json`
- Build gate: no
- Finding IDs: `R13-F01` through `R13-F06`

## Focus

Validate habits, competition/social surfaces, celebration intensity, and monetization. A++ requires motivation without shame, clear social boundaries, premium reward treatment, and non-manipulative paywall logic.

## Batch Summary

- A++: 42 Celebration overlay.
- A+: 38 Habits.
- A: 39 Leaderboard, 43 Paywall.
- Below A: 40 Community.
- Needs polish: Habits needs visible add-habit confirmation/result; Leaderboard needs real scoped ranking states and visible report/block outcomes; Paywall needs selectable plan rows and safer bottom spacing.
- Redesign candidates: 40 Community remains a redesign candidate until room entry, creation, and safety/settings flows are visible.
- User decisions: none.
- Console/runtime: fresh R13 state capture recorded only dev-server messages (`React DevTools`, HMR) and `0` page errors; baseline route evidence recorded `0` console errors for all R13 routes.
- Verification: `npm run check` passed from `balencia-screens` on 2026-05-27; R13 has no production build gate.

## Screen Notes

### 38 - Habits

- Five-second read: A polished daily habit checklist with progress, grouped rows, streak/domain metadata, heatmap, XP summary, and a clear Add habit FAB.
- Screen purpose and journey fit: Fits the Me/Explore motivation loop; it answers what is left today and ties completion to XP without making the screen feel childish.
- Primary action clarity: Habit completion is now clear and functional; tapping `Morning journal` changed the count from `5 of 8` to `6 of 8`, updated XP from `+75` to `+87`, and flipped the row to checked.
- Emotional tone: Warm, satisfying, and gently motivating.
- Screenshot: `../../balencia-screens/output/a-plus-plus-review/R13/38-features-habits-phone.png`
- State evidence: `../../balencia-screens/output/a-plus-plus-review/R13/states/38-habit-completed.png`, `../../balencia-screens/output/a-plus-plus-review/R13/states/38-week-view.png`, `../../balencia-screens/output/a-plus-plus-review/R13/states/38-add-habit-sheet.png`, `../../balencia-screens/output/a-plus-plus-review/R13/states/38-add-habit-selected.png`
- Grade: A+
- Grade cap: minor finding R13-F01 prevents A++.
- Control inventory: Back is a 44px semantic button; Today/Week/Month are 46px semantic tabs with selected state and documented Figma behavior for richer period views; each habit row is a semantic pressed-state button that toggles completion and XP; heatmap and XP card are static summary elements; Add habit opens a bottom sheet; preset habit choices close the sheet but do not produce a visible created row or visible toast; tab bar is standard global navigation.

| Dimension | Score | Notes |
| --- | ---: | --- |
| Product sense | 5 | Habits belong in the daily motivation loop and connect cleanly to XP/streaks. |
| User friction | 4 | The core checkbox loop is low-friction, but secondary creation lacks visible completion. |
| Visual appeal | 5 | The progress bar, grouped cards, orange checks, and domain tags feel composed. |
| Brand fit | 5 | Orange leads action/reward; green is reserved for reward semantics; no excessive SIA/purple. |
| Mobile ergonomics | 5 | Captured controls meet 44px targets and the primary FAB is reachable. |
| Accessibility | 5 | Habit rows expose pressed state and labels; tabs expose selected state. |
| Trust/privacy | 5 | No sensitive data or social exposure. |
| Industry best practice | 4 | Habit completion is strong, but creation should show a visible result before Figma handoff. |

| Finding ID | Severity | Category | Evidence | User Impact | Recommendation | Status | Grade Cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R13-F01 | minor | retention | `38-add-habit-sheet.png` shows preset habit choices; `38-add-habit-selected.png` returns to the checklist with no visible new habit row or visible confirmation, while the captured text only contains hidden live-region copy: `Evening walk added`. | Users may not know whether habit creation succeeded, and Figma lacks a visible saved/validation state for the add-habit flow. | Show the created habit in the appropriate section or present a visible success toast, and document/create field validation, save, cancel, and disabled states for the bottom sheet. | proposed | Prevents A++ |

Decision: needs polish.

### 39 - Leaderboard

- Five-second read: A premium social ranking screen with own-rank anchoring, type/time filters, visibility toggle, and tappable rank rows.
- Screen purpose and journey fit: The screen fits optional social motivation, but the scoped ranking controls and safety actions are not yet strong enough for A++.
- Primary action clarity: Viewing and opening a limited profile is clear; own rank links to RPG, but changing ranking scope does not materially change the list.
- Emotional tone: Competitive but not shaming; the own-rank card helps keep the comparison grounded.
- Screenshot: `../../balencia-screens/output/a-plus-plus-review/R13/39-features-leaderboard-phone.png`
- State evidence: `../../balencia-screens/output/a-plus-plus-review/R13/states/39-competitions-tab.png`, `../../balencia-screens/output/a-plus-plus-review/R13/states/39-country-tab.png`, `../../balencia-screens/output/a-plus-plus-review/R13/states/39-friends-filter.png`, `../../balencia-screens/output/a-plus-plus-review/R13/states/39-profile-sheet.png`, `../../balencia-screens/output/a-plus-plus-review/R13/states/39-profile-report.png`, `../../balencia-screens/output/a-plus-plus-review/R13/states/39-profile-block.png`, `../../balencia-screens/output/a-plus-plus-review/R13/states/39-own-rank-link.png`
- Grade: A
- Grade cap: major findings R13-F02 and R13-F03 prevent A+ or A++.
- Control inventory: Back is semantic; Global/Competitions/Country and This week/This month/All time are semantic tabs, but type/visibility changes mostly update helper text while the same list remains; own-rank card links to `/tabs/me/rpg`; Global/Friends toggle changes helper copy but not list membership; rank rows open limited profile sheets; Report and Block add status text but do not open report flow, confirmation, or remove a blocked user; Done closes the sheet; tab bar is standard global navigation.

| Dimension | Score | Notes |
| --- | ---: | --- |
| Product sense | 5 | Optional ranking belongs as a motivational layer when it stays scoped and safe. |
| User friction | 3 | The main list is readable, but filters do not produce distinct useful states. |
| Visual appeal | 5 | Own-rank card, podium accents, and row density are polished. |
| Brand fit | 5 | Uses orange, podium accents, and domain tags appropriately. |
| Mobile ergonomics | 4 | Targets are large, though lower rows sit close to the tab/home area in baseline evidence. |
| Accessibility | 4 | Controls are semantic, but report/block outcomes are not clear task states. |
| Trust/privacy | 3 | Limited profile copy helps, but report/block behavior is not trustworthy enough. |
| Industry best practice | 3 | Social ranking needs meaningful scoped lists and visible safety flows. |

| Finding ID | Severity | Category | Evidence | User Impact | Recommendation | Status | Grade Cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R13-F02 | major | information-architecture | `39-competitions-tab.png`, `39-country-tab.png`, and `39-friends-filter.png` show the helper copy changing to competitions/country/friends, but the same global top-10 ranking list and own-rank card remain visible. | Users cannot trust which population or competition they are viewing, weakening the social comparison and privacy boundary. | Render distinct competition, country, and friends data states with loading/empty/error states, or mark unavailable scopes honestly disabled until they exist. | proposed | Prevents A+ |
| R13-F03 | major | trust-privacy | `39-profile-report.png` and `39-profile-block.png` show only inline status text (`Sarah K. reported/blocked`) while the profile remains open, the row remains in the leaderboard, and no report flow or block confirmation appears. | Safety controls feel performative; users cannot confirm consequences or recover from/report social exposure. | Route Report to the Report/Block flow, show block confirmation with consequences, remove or hide blocked users, and provide visible confirmation/undo states. | proposed | Prevents A+ |

Decision: needs polish.

### 40 - Community

- Five-second read: A friendly community hub with discover cards, joined rooms, unread badges, privacy copy, and a Create room CTA.
- Screen purpose and journey fit: The screen fits the optional social layer, but the primary join/enter/create-room journey still stops at previews and status text.
- Primary action clarity: Discover cards and room rows open previews, but Join, Settings, and Create do not complete a visible social task.
- Emotional tone: Warm and private-first; the copy avoids noisy social pressure.
- Screenshot: `../../balencia-screens/output/a-plus-plus-review/R13/40-features-community-phone.png`
- State evidence: `../../balencia-screens/output/a-plus-plus-review/R13/states/40-discover-preview.png`, `../../balencia-screens/output/a-plus-plus-review/R13/states/40-discover-join.png`, `../../balencia-screens/output/a-plus-plus-review/R13/states/40-discover-settings.png`, `../../balencia-screens/output/a-plus-plus-review/R13/states/40-room-preview.png`, `../../balencia-screens/output/a-plus-plus-review/R13/states/40-create-room-sheet.png`, `../../balencia-screens/output/a-plus-plus-review/R13/states/40-create-room-private-selected.png`
- Grade: B
- Grade cap: critical finding R13-F04 caps the screen below A.
- Control inventory: Back is semantic; discover cards open room-preview sheets with privacy/moderation copy; joined room rows open previews rather than room interiors; Join only adds status text and does not visibly join/navigate; Settings only adds status text and does not open moderation/settings; Close dismisses previews; Create room opens a private-first sheet; preset create choices close the sheet with status text but no created room or invite/settings flow; tab bar is standard global navigation.

| Dimension | Score | Notes |
| --- | ---: | --- |
| Product sense | 4 | A private-first community hub fits the strategy, but the room-interior promise is not fulfilled. |
| User friction | 2 | Users cannot complete the join, enter-room, settings, or create-room task visibly. |
| Visual appeal | 5 | Discover cards, room rows, badges, and sheets are polished. |
| Brand fit | 5 | Social tone is restrained and privacy-forward. |
| Mobile ergonomics | 4 | Targets are large and sheets fit, but primary flows stop too early. |
| Accessibility | 4 | Controls are semantic, but outcomes are status-only rather than navigable states. |
| Trust/privacy | 3 | Privacy copy is good, but safety/settings paths are not reachable. |
| Industry best practice | 2 | Community surfaces need actual room entry, join confirmation, settings, and moderation paths. |

| Finding ID | Severity | Category | Evidence | User Impact | Recommendation | Status | Grade Cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R13-F04 | critical | navigation | `40-discover-join.png` shows Join only adding `Joined Fitness lovers` status text while the preview remains open; `40-discover-settings.png` only adds `Opened settings...`; `40-create-room-private-selected.png` closes the sheet with `Private habit pod draft created` but no new room; room rows open preview sheets rather than room interiors. | Users cannot join, enter, create, or manage a room, blocking the screen's primary social purpose and leaving moderation promises untestable. | Wire room rows to room interior, Join to joined/navigated state, Create to a visible room/invite flow, and Settings to member/moderation/report/block controls; if those are out of scope, label the screen as preview-only and disable action buttons honestly. | proposed | Caps below A |

Decision: redesign candidate.

### 42 - Celebration overlay

- Five-second read: A cinematic achievement moment with badge, XP, mission context, SIA warmth, Share, and Continue.
- Screen purpose and journey fit: Correctly acts as a QA fixture for the system-triggered celebration overlay; existing decision Q32 documents production event triggering.
- Primary action clarity: Continue dismisses the overlay to a completion/queue state; Share changes visibly to Shared; Replay supports QA evidence.
- Emotional tone: Premium, mature, and celebratory without cartoonish excess.
- Screenshot: `../../balencia-screens/output/a-plus-plus-review/R13/42-features-celebration-phone.png`
- State evidence: `../../balencia-screens/output/a-plus-plus-review/R13/states/42-share-state.png`, `../../balencia-screens/output/a-plus-plus-review/R13/states/42-dismissed-state.png`, `../../balencia-screens/output/a-plus-plus-review/R13/states/42-replay-state.png`
- Grade: A++
- Grade cap: none.
- Control inventory: Badge, confetti, glow, and continuous stroke are decorative/static; Share is a 44px secondary action with visible Shared state and documented native-share behavior; Continue is a 44px dismiss control that returns to a completion/queue state; Replay overlay is a QA fixture control in the dismissed state.

| Dimension | Score | Notes |
| --- | ---: | --- |
| Product sense | 5 | Celebration is the right payoff for missions, streaks, and XP loops. |
| User friction | 5 | Dismiss, replay, and share evidence are clear for a QA fixture. |
| Visual appeal | 5 | Badge, XP, particles, and stroke treatment feel premium. |
| Brand fit | 5 | Orange/green/purple roles are controlled and on-brand. |
| Mobile ergonomics | 5 | Controls meet target size and the overlay avoids tab/home collisions. |
| Accessibility | 5 | The overlay is modeled as a dialog/live region with labeled controls. |
| Trust/privacy | 5 | Share is optional and low-pressure; production trigger behavior is documented. |
| Industry best practice | 5 | Matches reward-overlay expectations with dismiss/share/replay states. |

| Finding ID | Severity | Category | Evidence | User Impact | Recommendation | Status | Grade Cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| No major findings | none | none | Fresh evidence shows Share, Continue, and Replay working with no console errors, small-target flags, nested controls, or overlap flags. | No user-facing issue found. | No change needed for Figma handoff. | accepted | none |

Decision: A++.

### 43 - Paywall

- Five-second read: A contextual premium prompt with blurred feature preview, benefits, recommended Plus card, trial CTA, easy-out, plan comparison, and restore affordance.
- Screen purpose and journey fit: The paywall fits premium feature gating and feels non-coercive in the default state, but the all-plans branch is not yet conversion-ready.
- Primary action clarity: Start free trial shows processing and success; Maybe later/backdrop dismiss work; See all plans opens a comparison branch with inert plan buttons.
- Emotional tone: Premium and direct; fair in the default state because value and exits are visible.
- Screenshot: `../../balencia-screens/output/a-plus-plus-review/R13/43-features-paywall-phone.png`
- State evidence: `../../balencia-screens/output/a-plus-plus-review/R13/states/43-initial.png`, `../../balencia-screens/output/a-plus-plus-review/R13/states/43-all-plans.png`, `../../balencia-screens/output/a-plus-plus-review/R13/states/43-plan-button-click.png`, `../../balencia-screens/output/a-plus-plus-review/R13/states/43-purchase-processing.png`, `../../balencia-screens/output/a-plus-plus-review/R13/states/43-purchase-success.png`, `../../balencia-screens/output/a-plus-plus-review/R13/states/43-restore-success.png`, `../../balencia-screens/output/a-plus-plus-review/R13/states/43-maybe-later-dismissed.png`, `../../balencia-screens/output/a-plus-plus-review/R13/states/43-backdrop-dismissed.png`
- Grade: A
- Grade cap: major finding R13-F05 prevents A+; minor finding R13-F06 prevents A++.
- Control inventory: Backdrop button and Maybe later dismiss to a returned-trigger state; Start free trial enters disabled processing and success states; See all plans toggles an in-modal comparison branch; all-plan rows are enabled buttons but do not change selected plan, CTA, or details; Back to recommended plan returns to the Plus card; Restore purchases shows the same success state; lower actions need safe-area/scroll refinement.

| Dimension | Score | Notes |
| --- | ---: | --- |
| Product sense | 5 | Contextual premium gating belongs here and avoids manipulative urgency. |
| User friction | 3 | Core trial and dismissal work, but plan comparison is not actionable. |
| Visual appeal | 5 | Modal hierarchy, preview, benefits, and CTA treatment are polished. |
| Brand fit | 5 | Orange leads conversion while copy remains calm. |
| Mobile ergonomics | 3 | Lower actions are clipped or too close to the home indicator in comparison/success states. |
| Accessibility | 4 | Dialog/button semantics are present, but clipped actions and inert plan buttons hurt operability. |
| Trust/privacy | 4 | Easy-out and restore are present, but plan selection feedback is missing. |
| Industry best practice | 3 | Monetization prompts need selectable plans, restore visibility, cancellation/error, and safe-area handling. |

| Finding ID | Severity | Category | Evidence | User Impact | Recommendation | Status | Grade Cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R13-F05 | major | monetization | `43-all-plans.png` exposes `Plus monthly`, `Pro monthly`, and `Annual` as enabled buttons; `43-plan-button-click.png` shows clicking `Plus monthly - $9.99` leaves the same text, CTA, and selection state unchanged. | Users cannot tell which plan is selected or proceed with an informed comparison, weakening conversion and trust. | Make plan rows selectable with a visible active state, price/CTA update, and plan-specific trial/purchase behavior, or render them as static comparison rows and route plan choice to Subscription & billing. | proposed | Prevents A+ |
| R13-F06 | minor | mobile-ergonomics | `43-all-plans.png` shows `Back to recommended plan` clipped at the bottom and `Restore purchases` off-screen; baseline evidence also flags `Restore purchases overlaps home-indicator`. | Users may miss plan recovery/comparison exits or have trouble tapping them on smaller devices. | Add bottom safe-area padding, reduce modal height/content density, or scroll-position the comparison branch so all secondary actions remain visible and tap-safe. | proposed | Prevents A++ |

Decision: needs polish.

## Verification

- Fresh state evidence: `../../balencia-screens/output/a-plus-plus-review/R13/states/r13-state-capture.json`.
- Baseline route evidence: `../../balencia-screens/output/a-plus-plus-review/R13/`.
- `npm run check` from `balencia-screens`: passed on 2026-05-27. Lint, typecheck, route, asset, copy, and brand verification completed; `verify:routes passed (90 screens, 90 specs)`.
- `npm run build`: not required for R13.
