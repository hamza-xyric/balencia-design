# Batch 13 - Habits, Social, Rewards, Paywall

- Status: `reviewed`
- Screens: 5
- Reviewed: 2026-05-26
- Prototype URL: `http://localhost:3001`
- Visual evidence: `/private/tmp/balencia-b13/*-phone.png`

| ID | Screen | Route | Spec | Status |
| --- | --- | --- | --- | --- |
| 38 | Habits | `/features/habits` | `../app_design 3/38-habits.md` | `reviewed` |
| 39 | Leaderboard | `/features/leaderboard` | `../app_design 3/39-leaderboard.md` | `reviewed` |
| 40 | Community | `/features/community` | `../app_design 3/40-community-chat-rooms.md` | `reviewed` |
| 42 | Celebration overlay | `/features/celebration` | `../app_design 3/42-celebration-achievement-overlay.md` | `reviewed` |
| 43 | Paywall | `/features/paywall` | `../app_design 3/43-paywall-upgrade-prompt.md` | `reviewed` |

## Batch Focus

Validate habit loops, social motivation, reward tone, and paywall fairness.

## Batch Summary

- Ship-ready: None.
- Must-fix: 38 Habits, 39 Leaderboard, 40 Community, 42 Celebration overlay, 43 Paywall.
- Redesign candidates: 40 Community should stay friends/private-first until safety tooling is wired; 43 Paywall needs IAP-adjacent prototype states before conversion polish.
- Resolved decisions:
  - Social V1 stays friends/private-first until report, block, moderation, and visibility controls are wired.
  - Paywall prototype should model IAP-adjacent visual states now, without live billing.
  - Direct Celebration route is fine as a QA fixture; production acceptance requires event-triggered overlays.

## Screen Notes

### 38 - Habits

- Five-second read: A polished habit dashboard with clear daily progress, grouped checklist rows, heatmap, XP summary, and Add habit action.
- Primary action clarity: Checkboxes look tappable, but habit completion is not operable in the live route.
- Emotional tone: Motivating and warm, with the right habit-loop and XP language.
- Screenshot: `/private/tmp/balencia-b13/features-habits-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | The screen belongs in the motivation loop and answers the right daily question. |
| User friction | 1 | The primary task - checking off a habit - cannot be completed. |
| Visual appeal | 4 | Strong dark composition, clear orange progress, and readable grouped cards. |
| Brand fit | 4 | Orange, domain tags, and XP are used appropriately without becoming childish. |
| Mobile ergonomics | 2 | FAB is comfortable, but habit checkboxes are visual-only and segmented controls are 34px tall. |
| Accessibility | 1 | Habit rows are nonsemantic, the visible back chevron is not a control, and the checklist has no input/button state. |
| Trust/privacy | 4 | Low privacy risk; the issue is functional confidence rather than sensitive data. |
| Industry best practice | 1 | Habit products must support instant completion, undo, state updates, view switching, and habit creation. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | retention | Live report found `0` inputs and only four phone-frame buttons: Today, Week, Month, and Add habit. `HabitRow` renders visual checkbox spans with `aria-hidden`, not buttons or inputs. | Users cannot complete habits, earn XP, update progress, or trust the checklist as a tracker. | Make each habit checkbox/row a semantic controlled action with completion animation, progress/XP updates, undo, offline failure handling, and screen-reader state. | proposed |
| major | navigation | Clicking Week, Month, and Add habit left `/features/habits` unchanged with no text, selected-tab, route, or dialog change. The visible back chevron had `backSemanticCount: 0`. | Users cannot inspect weekly/monthly consistency, create a new habit, or reliably leave via the visible stack affordance. | Implement Today/Week/Month view state, Add Habit bottom sheet, and a labeled 44x44 back button/link. | proposed |
| major | accessibility | The segmented tab buttons measure 110x34, below the 44px touch target gate; habit checkboxes are 24px visuals with no focus target. | Motor and assistive-tech users cannot operate the screen's main task safely. | Preserve compact visuals but add 44x44 hit areas, `aria-checked`/pressed state, focus order, and labeled controls. | proposed |

Decision: Must fix before launch; visually close, but the habit loop is static.

### 39 - Leaderboard

- Five-second read: A clear social ranking screen with personal rank anchoring, time filters, global/friends toggle, and top ranked users.
- Primary action clarity: Viewing the default ranking is clear, and the own-rank card links to RPG, but filters and user rows are static.
- Emotional tone: Competitive but not harsh; the personal rank card helps avoid pure comparison pressure.
- Screenshot: `/private/tmp/balencia-b13/features-leaderboard-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | Optional social motivation fits the RPG system, especially with the user's own rank prominent. |
| User friction | 2 | The default list is readable, but leaderboard type, time, friends filter, and profiles do not work. |
| Visual appeal | 4 | The rank card, podium colors, and list density are composed and premium. |
| Brand fit | 4 | Uses orange, domain tags, and RPG language in the right proportions. |
| Mobile ergonomics | 2 | Filter controls are compact at 34px/32px tall, and rank rows are not operable. |
| Accessibility | 2 | Filters have tab/button semantics but no state changes; rank rows are static articles; back is not semantic. |
| Trust/privacy | 2 | Public social rows lack profile, report, block, and visibility safety controls. |
| Industry best practice | 2 | Social ranking screens need working filters, profile drill-ins, safety actions, and clear public-data boundaries. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| major | information-architecture | Clicking Competitions, This month, and Friends left `/features/leaderboard` unchanged with no text, selected state, route, or dialog change. | Users cannot compare the time period or social scope they intended to view. | Implement leaderboard type, time-period, country, global/friends state, loading/empty/error states, and API-backed refresh. | proposed |
| major | trust-privacy | The own-rank card is the only content link; the 10 ranked rows are static `article` elements, so no limited profile, report, block, or public-profile sheet is reachable. | Users cannot understand who is visible, inspect another user's public stats, or protect themselves from unwanted social exposure. | Make rank rows semantic buttons that open limited profiles with report/block controls and clear visibility rules. | proposed |
| major | accessibility | Leaderboard tabs measure 110x34 and Global/Friends buttons measure 48x32/53x32; the visible back chevron is not exposed as a button or link. | Frequent controls are smaller than the mobile target gate and stack navigation is not available to screen readers. | Expand hit areas to 44px, expose selected/pressed state, and make the shared back affordance semantic. | proposed |

Decision: Must fix before launch; the default visual works, but social ranking is not yet a usable or safe feature.

### 40 - Community

- Five-second read: A friendly community hub with discover cards, joined rooms, unread badges, active indicators, and a clear Create room CTA.
- Primary action clarity: Join or enter a room is visually implied, but discover cards and room rows do not navigate or open previews.
- Emotional tone: Warm and social without overpowering the solo-coach product.
- Screenshot: `/private/tmp/balencia-b13/features-community-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | A community layer fits the optional social motivation strategy. |
| User friction | 1 | The primary room entry, discovery, join, and create-room tasks are blocked. |
| Visual appeal | 4 | Discover cards, unread badges, and room rows are compact and polished. |
| Brand fit | 4 | Social tone is restrained, and orange stays reserved for unread/action states. |
| Mobile ergonomics | 3 | Create room is a good 48px target, but the main rows/cards are not operable controls. |
| Accessibility | 1 | Room rows and discover cards are static content, and back is not semantic. |
| Trust/privacy | 2 | Public/private room visibility, join context, settings, and safety controls are absent. |
| Industry best practice | 1 | Community surfaces require room preview, join/enter, create, moderation, and messaging state. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | navigation | Phone-frame evidence found only one real button, Create room. Clicking Create room, Fitness lovers, and Morning crew left `/features/community` unchanged with no text, dialog, or route change. | Users cannot join a discovered room, enter an existing room, or create a room, blocking the screen's primary purpose. | Make discover cards and room rows semantic controls, open room preview or room interior, and wire Create room to its bottom sheet. | proposed |
| major | trust-privacy | The create-room modal, private/public selector, room preview, join confirmation, member list, settings, and report/block paths from the spec are absent. | Users are asked into social spaces without visibility, safety, or moderation context. | Add room visibility defaults, preview/join copy, member/settings sheets, and report/block or moderation entry points before launch. | proposed |
| major | accessibility | The three joined rooms render as `article` elements, discover cards are nonsemantic cards, and the visible back chevron has no semantic control. | Screen-reader and keyboard users cannot tell which room surfaces are actionable. | Use links/buttons with labels that include room name, member count, unread count, active status, and destination. | proposed |

Decision: Must fix before launch; redesign candidate until the room-list, room-interior, and create-room flow is implemented.

### 42 - Celebration overlay

- Five-second read: A cinematic mission-completion moment with badge, XP, title, SIA stroke, Share CTA, and dismiss hint.
- Primary action clarity: The hint says tap anywhere to continue, but tapping it does not dismiss the overlay.
- Emotional tone: Premium and mature, though the static state weakens the payoff.
- Screenshot: `/private/tmp/balencia-b13/features-celebration-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | Celebration is the right emotional payoff for missions, streaks, and XP loops. |
| User friction | 1 | The overlay cannot be dismissed or shared in the live route. |
| Visual appeal | 4 | The badge, XP treatment, and dark glow feel on-brand. |
| Brand fit | 4 | Uses orange and the continuous stroke well; the tone avoids cartoonish reward language. |
| Mobile ergonomics | 4 | The visible Share target is 160x44, and the fixed layout fits the phone frame. |
| Accessibility | 2 | No semantic dismiss control, focus trap, live-region announcement, or return-focus behavior is visible. |
| Trust/privacy | 4 | Low sensitive-data risk, though sharing should still preview what leaves the app. |
| Industry best practice | 2 | Overlays must have reliable dismissal, reduced-motion behavior, queued trigger behavior, and optional share flow. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | navigation | Clicking Share and tapping the `tap anywhere to continue` hint left `/features/celebration` unchanged with no text, route, or dialog change. | A user can get stuck in the reward overlay, and the success moment becomes a blocker. | Implement overlay state with tap-anywhere dismissal after entrance, explicit fallback close behavior, return to the triggering screen, and queued overlay handling. | proposed |
| major | accessibility | The route exposes only the Share button inside the phone frame; the tap-anywhere dismissal hint is static text, not a control, and the overlay is not modeled as a focus-trapped dialog/live region. | Assistive-tech users may not learn the achievement or how to exit it. | Announce the achievement as a live region or dialog, add a labeled dismiss action, support focus return, and honor reduced motion. | proposed |

Decision: Must fix before launch; the visual direction is good, but the overlay needs a real dismissal/share state model.

### 43 - Paywall

- Five-second read: A contextual upgrade modal with blurred premium preview, benefits, Plus pricing, primary trial CTA, easy-out, and all-plans link.
- Primary action clarity: Start free trial is dominant, and easy-out is visible, but all three actions are inert.
- Emotional tone: Premium and direct; it feels fair visually because the value and exit are both visible.
- Screenshot: `/private/tmp/balencia-b13/features-paywall-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | Contextual paywalling fits the premium feature strategy. |
| User friction | 1 | Upgrade, dismiss, and plan comparison do not work. |
| Visual appeal | 4 | Modal hierarchy, blurred preview, and tier card are polished. |
| Brand fit | 4 | Orange accenting is strong without overwhelming the modal. |
| Mobile ergonomics | 3 | Primary CTA is 56px, but secondary links are 36px and drag/backdrop dismissal is not available. |
| Accessibility | 2 | Modal semantics, focus trap, dismiss behavior, and 44px easy-out targets are missing. |
| Trust/privacy | 2 | A paywall without a working easy-out or plan details can feel coercive even when the layout appears fair. |
| Industry best practice | 1 | Monetization prompts must support purchase processing, cancellation, restore/errors, dismissal, and plan comparison. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | monetization | Clicking Start free trial left `/features/paywall` unchanged with no loading, purchase sheet, success, error, or unlock state. | Users cannot convert, and the main monetization path is untestable. | Wire trial eligibility, native IAP/payment entry, processing, success unlock, failure/cancel, restore, and post-purchase dismissal states. | proposed |
| major | conversion | Clicking Maybe later and See all plans left the route unchanged. The modal backdrop/drag handle is visual only, so there is no reliable dismiss or plan-comparison path. | Users lose the promised easy-out and cannot make an informed plan choice. | Make Maybe later/backdrop/drag dismiss the modal and route See all plans to Subscription & billing or an in-modal comparison. | proposed |
| major | accessibility | Maybe later and See all plans measure 339x36, below the 44px target gate; the modal is not exposed as a focus-trapped dialog. | The lowest-pressure exit and plan details are harder to operate, especially for motor and screen-reader users. | Use 44px secondary action targets, dialog semantics, focus trapping, escape/back dismissal, and return focus to the gated trigger. | proposed |

Decision: Must fix before launch; redesign candidate until the monetization and dismissal state model is defined.

## Verification

- Fresh screenshots and interaction report: `/private/tmp/balencia-b13/report.json`.
- `npm run verify:routes`: passed, `90 screens, 90 specs`.
- `npm run check`: failed during lint on pre-existing generated file `balencia-screens/dev/types/routes.d.ts` for two `@typescript-eslint/no-empty-object-type` errors.
