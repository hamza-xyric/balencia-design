# Batch 14 - Accountability And Recovery Tools

- Status: `reviewed`
- Screens: 5
- Reviewed: 2026-05-26
- Prototype URL: `http://localhost:3001`
- Visual evidence: `/private/tmp/balencia-b14/*-phone.png`

| ID | Screen | Route | Spec | Status |
| --- | --- | --- | --- | --- |
| 46 | Accountability | `/features/accountability` | `../app_design 3/46-accountability.md` | `reviewed` |
| 47 | Competitions | `/features/competitions` | `../app_design 3/47-competitions.md` | `reviewed` |
| 48 | Intelligence dashboard | `/features/intelligence` | `../app_design 3/48-intelligence-dashboard.md` | `reviewed` |
| 52 | Stress management | `/features/stress` | `../app_design 3/52-stress-management.md` | `reviewed` |
| 53 | Breathing exercises | `/features/breathing` | `../app_design 3/53-breathing-exercises.md` | `reviewed` |

## Batch Focus

Validate accountability safety, competition tone, intelligence explainability, and stress recovery UX.

## Batch Summary

- Ship-ready: None.
- Must-fix: 46 Accountability, 47 Competitions, 48 Intelligence dashboard, 52 Stress management, 53 Breathing exercises.
- Redesign candidates: 46 Accountability needs Plus/social-consent activation; 47 Competitions should support self-only/private challenge modes; 53 Breathing exercises needs the active-session experience separated from the library view.
- Resolved decisions:
  - Show accountability and competitions as visible locked previews for non-Plus; activation requires Plus and social consent.
  - Include self-only/private challenge modes for users who want motivation without public comparison.
  - Breathing active sessions should use a dedicated immersive sub-route/mode with no tab bar.

## Screen Notes

### 46 - Accountability

- Five-second read: A consent-first accountability partner screen with clear partner roles and permission dots.
- Primary action clarity: The consent setup and partner management actions are visible, but the core actions do not change state.
- Emotional tone: Serious, safety-oriented, and on-brand; the unresolved consent state makes it feel unfinished.
- Screenshot: `/private/tmp/balencia-b14/features-accountability-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | The screen belongs in the Me/social stack and the partner/contract/trigger model matches the spec. |
| User friction | 2 | Contracts and Triggers tabs do not open, so two thirds of the screen are unreachable. |
| Visual appeal | 4 | Strong dark card work, orange warning hierarchy, and clear partner rows. |
| Brand fit | 4 | Social mode orange is appropriate and SIA/purple is restrained. |
| Mobile ergonomics | 2 | Configure is 32px tall, segmented tabs are 34px tall, Manage is 53x18, and Back is only visual. |
| Accessibility | 2 | Header Back is not a semantic control; several tappable-looking controls are under 44px or inert. |
| Trust/privacy | 2 | Consent is explicitly unconfigured, but partner permissions and add/manage controls remain active-looking. |
| Industry best practice | 2 | Accountability features need consent configuration, auditability, and working tab state before launch. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | retention | Live click checks found Configure, Contracts, Triggers, Add partner, and Manage all left URL, visible text, and dialog count unchanged. The implementation hardcodes `activeValue="partners"`. | Users cannot configure consent, add partners, manage groups, or reach contracts/triggers from the screen. | Add real tab state plus consent, add-partner, group-management, contract, and trigger flows with loading/success/error states. | proposed |
| major | trust-privacy | The banner says consent must be configured before features activate, while existing partner permissions, emergency contact data, Add partner, and Manage are still visible and active-looking. | Users may believe sensitive accountability sharing is already configured or active before they have granted consent. | Gate partner actions and sensitive permission details behind consent setup, and show a disabled/explanatory state until configured. | proposed |
| major | accessibility | The Header back affordance renders as a `div`; evidence shows no Back control inside the phone frame. Configure is 90x32 and Manage is 53x18. | Keyboard, screen-reader, and motor-impaired users lose reliable navigation and small secondary controls are hard to activate. | Render Back as a labeled 44x44 link/button and expand compact action hit areas to at least 44px high. | proposed |

Decision: Must fix before launch.

### 47 - Competitions

- Five-second read: Premium challenge discovery page with an obvious featured competition and social invitation energy.
- Primary action clarity: Join now is prominent, but join, filter, detail, and result actions are static.
- Emotional tone: Motivating and polished without becoming childish.
- Screenshot: `/private/tmp/balencia-b14/features-competitions-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | Optional competition discovery fits the social layer and the hero/list structure is sensible. |
| User friction | 2 | The primary join and browse actions do not work. |
| Visual appeal | 4 | The featured card and horizontal suggestions feel premium and readable. |
| Brand fit | 4 | Orange-led competition energy is aligned with Social Mode. |
| Mobile ergonomics | 3 | Hero CTA is strong, but row CTAs are 18px tall and filters are 36px tall. |
| Accessibility | 2 | Filter buttons lack selected-state semantics, row CTAs are tiny, and Back is not semantic. |
| Trust/privacy | 4 | No sensitive data ask in the list view; competition fairness details are deferred to detail. |
| Industry best practice | 2 | Challenge apps need functional join/detail/filter flows and clear rules before users can trust participation. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | retention | Click checks found Join now, Active, View details, Join, and View results all left `/features/competitions` unchanged with no text or dialog change. | Users cannot join, filter, inspect, or review competition outcomes. | Implement filter state, join/remind/view-details/result flows, and competition detail navigation with rules, progress, leaderboard, and leave states. | proposed |
| major | mobile-ergonomics | Evidence measured View details at 80x18, Join at 30x18, View results at 79x18, and filter chips at 36px height. | Frequent competition actions are difficult to tap reliably on mobile. | Expand row CTA hit areas to 44px high and make filters a semantic selected segmented/filter control. | proposed |
| major | navigation | The invitation card and AI suggestion cards are visually tappable, but the implementation renders them as static cards; Header Back is also a noninteractive `div`. | Users see social invitations and recommendations but cannot act on them or navigate back via the in-phone header. | Make invitations, suggestions, hero body, and Back semantic links/buttons with clear destinations and focus labels. | proposed |

Decision: Must fix before launch.

### 48 - Intelligence dashboard

- Five-second read: Strong SIA intelligence briefing with a clear daily score, contradictions, and AI-mode purple hierarchy.
- Primary action clarity: Viewing insights is clear; resolving or drilling into them is not functional.
- Emotional tone: Analytical, premium, and confident.
- Screenshot: `/private/tmp/balencia-b14/features-intelligence-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | A cross-domain intelligence screen is core to Balencia's differentiated promise. |
| User friction | 3 | The dashboard reads well, but most drill-down and feedback actions are inert. |
| Visual appeal | 4 | The score hero is polished, the purple accent is controlled, and the data density is manageable. |
| Brand fit | 4 | Royal purple is justified because this is SIA's own analytics surface. |
| Mobile ergonomics | 3 | The first viewport is readable, but contradiction and range chips are 32px tall. |
| Accessibility | 3 | Back and overflow are semantic, but feedback icons are not controls and chart range chips need selected semantics. |
| Trust/privacy | 3 | Sources and accuracy are present, but contradiction resolution and feedback do not work. |
| Industry best practice | 3 | Advanced analytics need explainable drill-down, dismissal, correction, and feedback loops. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| major | trust-privacy | Dismiss and Resolve on contradictions left URL, visible text, and dialog count unchanged. The contradiction count remained `(2)`. | Users cannot correct, explain, or dismiss potentially sensitive AI/data conflicts. | Add contradiction resolution and dismissal flows with source review, correction options, undo, and persisted state. | proposed |
| major | information-architecture | More options, 7d/14d/30d, See all, and See full report render as buttons but click checks found no route, text, or dialog change. | The dashboard becomes a static briefing rather than an explorable intelligence tool. | Wire overflow settings/export/about, time-range state, all-correlations drill-down, and weekly report detail. | proposed |
| major | accessibility | Contradiction chips and report CTA are 32px high, range chips are 32px high, and thumbs up/down feedback in predictions/recent insights is rendered as icons rather than buttons. | Users have reduced touch accuracy and cannot provide accessible feedback that SIA is supposed to learn from. | Expand controls to 44px hit areas, add aria-pressed/selected semantics, and make insight feedback buttons operable. | proposed |

Decision: Must fix before launch.

### 52 - Stress management

- Five-second read: Clear stress command center with a calming teal gauge and an obvious quick-log area.
- Primary action clarity: Log stress is visible, but the slider, triggers, and submit actions are not real inputs.
- Emotional tone: Calm, supportive, and appropriately less intense than fitness/social screens.
- Screenshot: `/private/tmp/balencia-b14/features-stress-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | Stress score, quick logging, SIA coaching, trends, and relief tools fit the wellbeing journey. |
| User friction | 2 | The main quick-log task cannot be completed. |
| Visual appeal | 4 | The gauge and teal accent are attractive and emotionally aligned. |
| Brand fit | 4 | Wellbeing teal carries the screen while orange stays reserved for action. |
| Mobile ergonomics | 3 | Primary CTAs are large, but several control surfaces are static or below 44px. |
| Accessibility | 2 | Evidence found zero inputs; slider, trigger chips, and trend ranges are not semantic controls. |
| Trust/privacy | 3 | Sensitive stress data is shown clearly, but logging and SIA follow-up are not controllable. |
| Industry best practice | 2 | Stress tools need real logging, relief navigation, correction, and feedback loops. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | retention | Evidence found `inputs: 0`; the stress slider is visual markup, trigger chips are spans, and clicking Log stress or the bottom Log FAB changed no URL, text, or dialog state. | Users cannot log stress, select triggers, or submit the screen's primary action. | Build a real range input/slider, multi-select trigger buttons, optional note/other input, enabled submit, success/reset, undo, and failure states. | proposed |
| major | navigation | The SIA coaching card shows `Ask SIA` as static text, and trend range chips are spans rather than controls. | Users cannot ask follow-up questions about a stress insight or change the trend window. | Make Ask SIA a contextual link/button and implement 7d/14d/30d trend state with selected semantics. | proposed |
| major | accessibility | The Lv.5 badge is 50x28, trend chips are non-buttons, and the main slider has no range semantics or keyboard/screen-reader behavior. | Users relying on assistive tech cannot perceive or change stress input state. | Use semantic range, button, and link controls with 44px hit areas and live status announcements after logging. | proposed |

Decision: Must fix before launch.

### 53 - Breathing exercises

- Five-second read: A calm breathing library with stats, use-case filters, and exercise cards.
- Primary action clarity: The likely primary action is tapping an exercise, but the exercise cards are not interactive.
- Emotional tone: Calm and premium, though the always-present active-session preview makes the state feel confused.
- Screenshot: `/private/tmp/balencia-b14/features-breathing-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 3 | The library is useful, but active-session state is mixed into the list rather than replacing it. |
| User friction | 2 | Users cannot start a breathing practice from the exercise cards. |
| Visual appeal | 4 | Stats and cards feel polished, warm, and wellbeing-aligned. |
| Brand fit | 4 | Teal, orange recommendation, and dark surfaces fit the recovery mode. |
| Mobile ergonomics | 3 | Exercise cards are readable, but filter chips are 36px tall and the primary card tap target is absent. |
| Accessibility | 2 | Exercise cards are static, filters are inert, and the icon-only pause control has no accessible label. |
| Trust/privacy | 4 | No sensitive permission or sharing issue in this first pass. |
| Industry best practice | 2 | Breathing apps need a focused full-screen session, working pause/duration/close, and post-session rating. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | retention | Exercise cards render as static `Card` components; click checks found All, During Stress, Pause, and 3 min all left URL, text, and dialog count unchanged. | Users cannot filter techniques, start a session, pause/resume, or change duration. | Make exercise cards semantic buttons that enter active session state; wire filters, pause/resume, duration selection, close, completion, and save states. | proposed |
| major | information-architecture | The spec says active session view replaces the list and hides the tab bar, but the live route shows a compact active-session preview below the library with the tab bar still visible. | The screen reads like a demo panel rather than a dedicated calming practice space. | Separate library and active-session modes, using an immersive full-screen session with no tab bar once a technique starts. | proposed |
| major | accessibility | Evidence shows an icon-only pause button with empty text, filter chips at 36px height, and no semantic controls for exercise selection. | Screen-reader and motor-impaired users cannot identify or activate the breathing controls reliably. | Add accessible labels, 44px hit areas, selected filter state, and semantic button roles for every exercise/session control. | proposed |

Decision: Must fix before launch; redesign candidate for the active-session mode.
