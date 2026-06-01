# Batch 08 - Identity, Settings, Billing

- Status: `reviewed`
- Screens: 5
- Reviewed: 2026-05-26
- Prototype URL: `http://localhost:3001`
- Visual evidence: `/private/tmp/balencia-qa/tabs-me-*-phone.png`

| ID | Screen | Route | Spec | Status |
| --- | --- | --- | --- | --- |
| 19 | RPG character | `/tabs/me/rpg` | `../app_design 3/19-rpg-character-screen.md` | `reviewed` |
| 20 | Personal wiki | `/tabs/me/personal-wiki` | `../app_design 3/20-personal-wiki-sia-memory.md` | `reviewed` |
| 21 | Settings | `/tabs/me/settings` | `../app_design 3/21-settings.md` | `reviewed` |
| 22 | Connected services | `/tabs/me/connected-services` | `../app_design 3/22-connected-services.md` | `reviewed` |
| 23 | Subscription & billing | `/tabs/me/subscription` | `../app_design 3/23-subscription-billing.md` | `reviewed` |

## Batch Focus

Validate identity systems, SIA memory transparency, settings clarity, integration trust, and monetization.

## Batch Summary

- Ship-ready: None.
- Must-fix: 19 RPG character, 20 Personal wiki, 21 Settings, 22 Connected services, 23 Subscription & billing.
- Redesign candidates: 20 Personal wiki needs a real memory-control model; 22 Connected services needs per-integration consent/scope handling; 23 Subscription & billing needs a platform-compliant purchase-state model before it can be trusted.
- Resolved decisions:
  - Treat visual-only back chevrons as a known prototype limitation while keeping production navigation/accessibility findings.
  - Every OAuth flow must preview scopes, purpose, sync frequency, storage, disconnect, delete-synced-data, and revocation behavior before connect.
  - Mobile billing should follow Apple IAP/StoreKit and Google Play Billing: localized pricing, restore, trial eligibility, cancellation, downgrade/upgrade, errors, and entitlement sync.

## Screen Notes

### 19 - RPG character

- Five-second read: Premium character sheet with a clear avatar, level, Life Power, and domain stat grid.
- Primary action clarity: Reviewing progress is clear; domain drill-down and back navigation are not available in the live route.
- Emotional tone: Celebratory, mature, and on-brand without feeling childish.
- Screenshot: `/private/tmp/balencia-qa/tabs-me-rpg-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | A character/progression screen belongs in Me and answers "how far have I come?" well. |
| User friction | 3 | Read-only progress is easy to scan, but the expected domain sub-stat drill-down is missing. |
| Visual appeal | 4 | Strong hero card, good Life Power emphasis, and domain-color restraint. |
| Brand fit | 4 | Premium dark RPG language fits Balencia; the screen stays mature. |
| Mobile ergonomics | 3 | The screen scrolls correctly, but small/visual-only controls reduce native feel. |
| Accessibility | 3 | Domain cards have aria labels but are noninteractive divs; the stack back control is not exposed as a button/link. |
| Trust/privacy | 5 | No sensitive ask or data-sharing action. |
| Industry best practice | 3 | Competitive profile cards usually support drill-down and reliable stack exits. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| major | navigation | The visible back chevron is rendered by the shared header as a static `div`; the captured control list for `/tabs/me/rpg` has no back button or link. | Users on a stack-pushed Me screen cannot use the expected native back affordance. | Make `showBack` render a 44x44 labeled button/link that pops history or routes to the previous Me screen. | proposed |
| major | navigation | The domain skill cards are rendered as `div` elements with aria labels, and the live route reports `buttonCount: 0`; no bottom sheet or dashboard link appears for domain stats. | Users cannot inspect sub-stats or understand what is driving a domain score. | Make each domain card a semantic button that opens the Domain Sub-Stats sheet and provides a "View dashboard" path. | proposed |
| minor | mobile-ergonomics | The `View all` rewards link measures 52x18 in the evidence pass. | A small text-only target is easy to miss on touch devices. | Keep the visual text treatment if desired, but expand the hit area to at least 44px high. | proposed |

Decision: Must-fix before launch because the RPG drill-down and stack exit are missing.

### 20 - Personal wiki

- Five-second read: SIA memory is visible and emotionally intriguing, with clear source labels and confidence badges.
- Primary action clarity: The intended controls are obvious, but search, chapter browsing, edit, and correction do not work.
- Emotional tone: Trust-building in concept; trust-damaging once the user tries to control a memory.
- Screenshot: `/private/tmp/balencia-qa/tabs-me-personal-wiki-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | Making SIA's memory visible is a strong trust feature. |
| User friction | 2 | The user cannot actually search, switch chapters, edit, delete, or flag a memory. |
| Visual appeal | 4 | The card hierarchy and warm dark styling are polished. |
| Brand fit | 4 | The "Book of life" framing fits SIA's role and Balencia's premium tone. |
| Mobile ergonomics | 2 | Chapter and entry actions are 32px tall, and the active tab can sit partly offscreen. |
| Accessibility | 2 | Search is a `role="search"` div rather than an input, and action targets are below the touch target gate. |
| Trust/privacy | 1 | The screen promises control over AI memory but provides no working control. |
| Industry best practice | 2 | AI memory surfaces need reliable view, edit, correction, deletion, and provenance controls. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | trust-privacy | Evidence shows `inputCount: 0`; clicking `Preferences (16)` leaves the same entries/meta visible, and clicking `Edit` leaves the page unchanged with no inputs or modal. | Users are shown sensitive AI-held memories but cannot search, browse categories, correct, or remove them. | Implement a real search input, chapter state, inline edit mode, delete confirmation, and "This is wrong" review/removal flow. | proposed |
| major | mobile-ergonomics | Chapter tabs are 32px tall; `Edit` measures 27x32 and `This is wrong` measures 88x32 in the evidence pass. | Frequent trust-control actions are harder to tap and fail the mobile target gate. | Give tabs and entry actions at least 44px touch height while preserving compact visual styling. | proposed |
| major | accessibility | The search surface renders as a styled div with placeholder text rather than a focusable text input. | Keyboard, screen-reader, and assistive users cannot search memories. | Replace the faux search bar with an input, clear button, focus state, and search result semantics. | proposed |

Decision: Must-fix before launch; this is a trust-control screen, not just a display screen.

### 21 - Settings

- Five-second read: Comprehensive settings list with strong grouping and familiar row patterns.
- Primary action clarity: Rows read as adjustable controls, but most of them do not open or save anything.
- Emotional tone: Calm and utilitarian, appropriate for settings.
- Screenshot: `/private/tmp/balencia-qa/tabs-me-settings-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | A centralized settings control panel belongs in Me and the grouping is sensible. |
| User friction | 2 | The screen is long and most adjustment rows are static buttons with no resulting flow. |
| Visual appeal | 4 | Grouped cards, icons, spacing, and hierarchy are polished. |
| Brand fit | 4 | Dark utility styling fits product mode and keeps SIA copy restrained. |
| Mobile ergonomics | 3 | Rows are large, but toggle hit behavior is smaller than the visible row. |
| Accessibility | 2 | Toggle inputs measure 1x1 in the DOM, and the shared back control is not semantic. |
| Trust/privacy | 2 | Privacy, legal, sign-out, and delete-account rows do not expose real review or confirmation states. |
| Industry best practice | 2 | Settings rows are expected to persist changes, navigate, or open a picker/confirmation. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| major | navigation | The visible back chevron is static on `/tabs/me/settings`; the shared header does not expose a button or link. | Users cannot rely on the standard stack exit from a utility screen. | Make the back affordance a labeled 44x44 semantic control with stack-pop behavior. | proposed |
| critical | settings-control | Clicking `Change password` and `Delete account` left the route text, URL, and modal count unchanged; most preference/privacy/legal rows are plain buttons without subflows. | Users cannot perform the primary settings task, and destructive actions appear tappable without a confirmation model. | Wire each row to its picker, sheet, confirmation, legal view, or navigation target; add no-op-disabled states where a row is not available. | proposed |
| major | mobile-ergonomics | Toggle rows are rendered as non-clickable `div` rows with only the small switch label; evidence records switch inputs as 1x1 while the visual track is 34x20. | Users must tap a tiny control instead of the expected full row, making settings feel non-native. | Make the full 52px row toggle the setting, keep switch semantics, and persist the changed value. | proposed |

Decision: Must-fix before launch.

### 22 - Connected services

- Five-second read: Clear integration management screen with a useful SIA note and scannable service cards.
- Primary action clarity: Connect/disconnect actions are visible, but all tested actions are inert.
- Emotional tone: Professional and trustworthy at first glance, but sensitive-data consent is too thin.
- Screenshot: `/private/tmp/balencia-qa/tabs-me-connected-services-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | External services are central to Balencia's cross-domain intelligence. |
| User friction | 2 | Users can see services but cannot connect, force sync, or disconnect. |
| Visual appeal | 4 | Cards, status badges, and SIA context are composed and easy to scan. |
| Brand fit | 4 | Purple is limited to SIA context; orange is reserved for connect actions. |
| Mobile ergonomics | 3 | Cards scroll well, but integration action buttons are 36px tall. |
| Accessibility | 3 | Buttons have text labels, but targets are under the mobile gate and back is not semantic. |
| Trust/privacy | 2 | Health, calendar, and listening data connections need explicit scopes and revoke/delete guidance. |
| Industry best practice | 2 | Integration screens should launch OAuth, show loading/error states, and confirm destructive disconnects. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| major | navigation | The visible back chevron is static on `/tabs/me/connected-services`; the shared header does not expose a button or link. | Users cannot reliably return to Settings or Me using the expected stack control. | Make the shared back affordance semantic and route-aware. | proposed |
| critical | integration-control | Clicking Apple Health `Connect` and WHOOP `Disconnect` left the route text, URL, and modal count unchanged; Force sync is also a button without state. | Users cannot connect data sources or revoke an existing service, blocking the screen's primary purpose. | Implement OAuth launch/loading/error states, force-sync state, and disconnect confirmation with status updates. | proposed |
| major | trust-privacy | The screen uses one generic SIA note and per-card descriptions, but does not state requested scopes, retention, revocation, or what happens to already-synced data. | Users may hesitate to share sensitive health, calendar, and listening data or misunderstand what SIA can access. | Add per-service scope previews and a concise disconnect/deletion policy before OAuth and in disconnect confirmation. | proposed |
| major | mobile-ergonomics | Connect, Force sync, and Disconnect buttons measure 36px tall in the evidence pass. | Primary integration actions are below the 44px touch target gate. | Increase hit areas to at least 44px height while keeping the visual button compact if needed. | proposed |

Decision: Must-fix before launch.

### 23 - Subscription & billing

- Five-second read: Current plan, usage, plan comparison, and billing controls are easy to understand.
- Primary action clarity: Upgrade and billing actions are visible, but annual pricing, upgrade, downgrade, restore, and cancellation do not work.
- Emotional tone: Clear and premium, though the inert purchase controls would quickly erode trust.
- Screenshot: `/private/tmp/balencia-qa/tabs-me-subscription-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | A post-value subscription management screen belongs in Me. |
| User friction | 2 | The user can read plans but cannot switch pricing or complete any billing task. |
| Visual appeal | 4 | The current-plan card and tier cards feel polished and commercial. |
| Brand fit | 4 | Orange highlights the active billing state and upgrade actions appropriately. |
| Mobile ergonomics | 3 | Horizontal plan cards match the spec, but segmented controls are under target height. |
| Accessibility | 3 | Text labels are readable; current plan is still an enabled button and the back control is not semantic. |
| Trust/privacy | 2 | Billing, cancellation, and upgrade flows need real confirmations and platform rules. |
| Industry best practice | 2 | Subscription screens need disabled current-plan controls, pricing toggles, IAP/restore behavior, and cancellation safeguards. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| major | navigation | The visible back chevron is static on `/tabs/me/subscription`; the shared header does not expose a button or link. | Users cannot use the expected stack exit from a billing screen. | Make the shared back affordance semantic and route-aware. | proposed |
| critical | billing | Clicking `Annual`, `Upgrade to Pro`, and `Current plan` left the route text, URL, and modal count unchanged; billing rows and destructive rows are also static buttons. | Users cannot compare annual pricing, upgrade, restore purchases, view billing history, downgrade, or cancel. | Implement billing-period state, disabled current plan, upgrade/downgrade/cancel modals, restore flow, and payment/history handling. | proposed |
| major | accessibility | `Current plan` is an enabled button even though it represents a disabled/current state, and Monthly/Annual tabs measure 34px tall. | Users may think the current plan can be activated, and the pricing toggle is below mobile target size. | Render current plan as disabled/aria-disabled and expand the segmented control hit area to at least 44px. | proposed |

Decision: Must-fix before launch.

## Completion Gate

- every reviewed screen has a complete screen note in this file
- every screen has all eight rubric scores with notes
- every finding has evidence, user impact, recommendation, and status
- every finding is also represented in `../findings/findings-ledger.md`
- unresolved product questions are represented in `../findings/deferred-decisions.md`
- screenshot paths are recorded for all five reviewed screens
