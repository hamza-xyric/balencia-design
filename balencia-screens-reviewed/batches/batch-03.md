# Batch 03 - Guest, SIA Onboarding, Today Entry

- Status: `reviewed`
- Screens: 5
- Reviewed: 2026-05-26
- Prototype URL: `http://localhost:3001` (`3000` was already in use)
- Visual evidence: `/private/tmp/balencia-b02-b03-focused/*-phone.png`

| ID | Screen | Route | Spec | Status |
| --- | --- | --- | --- | --- |
| 06 | Guest preview | `/auth/guest-preview` | `../app_design 3/06-guest-mode-preview.md` | `reviewed` |
| 07 | SIA onboarding | `/auth/sia-onboarding` | `../app_design 3/07-sia-onboarding-conversation.md` | `reviewed` |
| 08 | Initial plan | `/auth/initial-plan` | `../app_design 3/08-initial-plan-summary.md` | `reviewed` |
| 12 | Home screen | `/tabs/today` | `../app_design 3/12-home-screen.md` | `reviewed` |
| 41 | Schedule / calendar | `/tabs/today/schedule` | `../app_design 3/41-schedule-calendar.md` | `reviewed` |

## Batch Focus

Validate guest value, SIA introduction, plan credibility, and the first authenticated Today experience.

## Batch Summary

- Ship-ready: None.
- Must-fix: 06 Guest preview, 07 SIA onboarding, 08 Initial plan, 12 Home screen, 41 Schedule / calendar.
- Redesign candidates: 07 SIA onboarding should get a stronger first-SIA "wow" pass; 06 Guest preview can remain an entry-form placeholder for this prototype if it is clearly labeled as preview/demo.
- Resolved decisions:
  - Guest preview can remain an entry-form placeholder for this prototype, labeled as preview/demo.
  - SIA onboarding should be interactive enough to reach Initial plan; a full conversational simulation is not required for this pass.
  - Track static no-op controls as production findings while keeping design-audit acceptance focused on visual quality and UX flow.

## Screen Notes

### 06 - Guest preview

- Five-second read: Lightweight demo personalization before account creation.
- Primary action clarity: Explore is clear, but it does not enter the demo.
- Emotional tone: Welcoming and low-pressure; a good idea for hesitant users.
- Screenshot: `/private/tmp/balencia-b02-b03-focused/auth-guest-preview-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | Guest preview directly answers the pre-signup question: what will Balencia feel like for me? |
| User friction | 2 | The entry form is simple, but it is static and never reaches the promised demo browsing phase. |
| Visual appeal | 4 | Good auth-screen composition with controlled domain color. |
| Brand fit | 4 | Tone is friendly and the domain chips reinforce the one-life/many-areas concept. |
| Mobile ergonomics | 3 | Domain chips are 36px tall, below the 44px touch target gate. |
| Accessibility | 3 | Chip state is visual only; selected/unselected state is not announced. |
| Trust/privacy | 3 | Asking only name and interests is low-risk, but prefilled mock data makes the screen feel less personal. |
| Industry best practice | 2 | A try-before-signup flow must actually transition into a browsable demo. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | conversion | Clicking `Explore` leaves `/auth/guest-preview` unchanged. The live route never enters the spec's phase-2 demo browsing mode or any clearly labeled placeholder/demo continuation. | Hesitant users cannot preview the product before creating an account, and the current placeholder does not honestly set expectations. | For this prototype, keep the entry-form placeholder if needed, but label it as preview/demo and provide a clear continuation; full browsable demo tabs can wait. | proposed |
| major | onboarding-friction | The form starts with `Amira` prefilled and `Fitness` / `Wellbeing` already selected; chip taps do not visibly change state. | The preview feels like a canned mock instead of a lightweight customization step. | Start empty, require a name and 1-3 domain choices, expose selected state accessibly, and enforce the max selection count. | proposed |

Decision: Must fix before launch; for this prototype, an entry-form placeholder is acceptable if clearly labeled as preview/demo.

### 07 - SIA onboarding

- Five-second read: SIA-led goal conversation with a visual brainstorming panel above the chat.
- Primary action clarity: Suggestion chips and the send button are clear, but there is no real text input or progression.
- Emotional tone: Warm, but not yet the "it gets me" moment described by the spec.
- Screenshot: `/private/tmp/balencia-b02-b03-focused/auth-sia-onboarding-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | This is the right moment for SIA to become the product's emotional center. |
| User friction | 1 | Users cannot converse, choose answers, type, or complete onboarding. |
| Visual appeal | 3 | The split visual/chat concept works, but the top visual area feels small and static. |
| Brand fit | 4 | SIA's copy is calm and aligned with the coach-not-tool positioning. |
| Mobile ergonomics | 4 | Visible controls are reachable and appropriately sized. |
| Accessibility | 2 | The composer is a styled div, not an input, so text entry is not available. |
| Trust/privacy | 3 | SIA claims are calm, but static behavior weakens the promise of personalized coaching. |
| Industry best practice | 2 | AI onboarding needs responsive chips, real input, state progression, and a clear completion path. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | conversion | The route has no input or textarea; clicking `Run a half marathon` or `Send message` leaves route and text unchanged. | Users cannot provide goals, answer SIA, or reach the initial plan summary. | Replace the static composer with a real input, wire suggestion chips into conversation state, and transition to `/auth/initial-plan` when onboarding is complete. | proposed |
| major | brand-fit | The spec calls for 9 animated domain bubbles and a roughly 40% visual brainstorming area; the live route shows 5 small initial-letter bubbles in a 232px panel plus static goal cards. | Balencia's most important first-SIA moment may feel like a form preview rather than a creative collaboration. | Expand the visual area, include all core domains, and add stage-based motion/content changes that mirror the conversation. | proposed |

Decision: Must fix before launch; redesign candidate for the first-SIA visual experience.

### 08 - Initial plan

- Five-second read: SIA presents a structured starter plan with RPG status and mission cards.
- Primary action clarity: Start your journey is strong, but the CTA and customize path are inert.
- Emotional tone: Encouraging and credible at a glance.
- Screenshot: `/private/tmp/balencia-b02-b03-focused/auth-initial-plan-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | The plan reveal is valuable and well placed after SIA onboarding. |
| User friction | 2 | Users cannot accept, edit, or move past the plan. |
| Visual appeal | 4 | Clear card stack, good domain tags, and a strong final CTA. |
| Brand fit | 4 | SIA, RPG, and domain color are present without overwhelming the screen. |
| Mobile ergonomics | 4 | Scroll behavior and CTA size work well. |
| Accessibility | 3 | Edit affordances are icon-only and do not expose clear action names. |
| Trust/privacy | 2 | The plan appears generic because it conflicts with the previous onboarding route. |
| Industry best practice | 2 | Plan acceptance and customization must be interactive. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | conversion | Clicking `Start your journey` or `Customize` leaves `/auth/initial-plan` unchanged. Domain chips and edit icons do not enter edit mode. | Users cannot finish onboarding or adjust SIA's proposed plan. | Wire plan acceptance to root-reset into `/tabs/today`, and make customize/edit controls expose inline editing. | proposed |
| major | product-sense | The previous live onboarding message says the user chose fitness, finance, and wellbeing; this plan includes fitness, finance, and learning, with no wellbeing goal. | The reveal can feel generic instead of "SIA got me." | Keep the plan consistent with collected onboarding inputs, or clearly explain why SIA added/replaced a life area. | proposed |

Decision: Must fix before launch.

### 12 - Home screen

- Five-second read: Polished Today command center with SIA greeting, actions, missions, schedule, insight, and activity.
- Primary action clarity: Today's actions are obvious, but completion and shortcuts do not respond.
- Emotional tone: Premium, motivating, and product-mode appropriate.
- Screenshot: `/private/tmp/balencia-b02-b03-focused/tabs-today-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | The screen answers "what is worth my attention today?" well. |
| User friction | 2 | Primary task completion and shortcuts are inert. |
| Visual appeal | 4 | Strong information hierarchy despite high content density. |
| Brand fit | 4 | Good use of SIA, orange action hierarchy, and restrained purple. |
| Mobile ergonomics | 2 | Frequent controls fall below the 44px touch target gate. |
| Accessibility | 3 | Many controls are labeled, but small hit areas remain hard to operate. |
| Trust/privacy | 3 | SIA insight is useful, but static data/interactions reduce confidence. |
| Industry best practice | 2 | A daily task hub needs real completion, shortcut, and navigation behavior. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | retention | Clicking `Mark Meditate 10 min as complete`, `Breathe`, or mood chip `Good` leaves route and visible text unchanged. | The daily command center cannot support the core habit loop of completing or opening today's actions. | Wire action completion state, shortcut navigation, mood capture, and action-card expansion/deep-link behavior. | proposed |
| major | mobile-ergonomics | Completion checkboxes render at 24x24; mood chips are 32px tall; health metric pills are 36px tall; quick action pills are 40px tall. | The most frequent controls are below the 44px touch target gate and may be hard to tap reliably. | Increase hit areas to at least 44x44 without necessarily enlarging every visual glyph. | proposed |

Decision: Must fix before launch; visual composition is promising once the core loop works.

### 41 - Schedule / calendar

- Five-second read: Day calendar with unscheduled tasks, event cards, SIA suggestion, sync icon, and add affordances.
- Primary action clarity: Viewing the day is clear; changing views and adding are not functional.
- Emotional tone: Practical, calm, and product-mode appropriate.
- Screenshot: `/private/tmp/balencia-b02-b03-focused/tabs-today-schedule-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | A time-based planning view is valuable from Today and SIA deep links. |
| User friction | 3 | Day view is readable, but controls do not support planning yet. |
| Visual appeal | 4 | Calendar cards, domain tags, and SIA suggestion treatment are clear. |
| Brand fit | 4 | Domain colors and SIA styling are restrained and useful. |
| Mobile ergonomics | 3 | Header and FAB targets are good; calendar controls need behavior and clearer labels. |
| Accessibility | 2 | Date chevrons are unlabeled and duplicate add controls share the same label. |
| Trust/privacy | 3 | Sync icon is present, but status detail and recovery are not exposed. |
| Industry best practice | 2 | Calendar views should switch, date nav should move, and add should open a modal. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| major | navigation | Clicking `Week`, `Month`, or `Day` leaves the same day-view text in place; add controls do not open a modal, and `Drag into day` has no drag behavior. | Users cannot use the calendar modes or planning actions promised by the UI. | Implement local view state for day/week/month, date navigation, add-event modal, and task drag/placement behavior. | proposed |
| major | accessibility | The previous/next date buttons have no accessible names, while two separate buttons share `Add schedule item`. | Screen reader users cannot distinguish date navigation from other unnamed buttons or choose the right add control. | Label date controls (`Previous day`, `Next day`) and disambiguate header add versus floating add if both remain. | proposed |

Decision: Must fix before launch.
