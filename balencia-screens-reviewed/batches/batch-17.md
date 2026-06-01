# Batch 17 - System Overlays And Search

- Status: `reviewed`
- Screens: 5
- Reviewed: 2026-05-26
- Prototype URL: `http://localhost:3001`
- Visual evidence: `/private/tmp/balencia-b17/*-phone.png`

| ID | Screen | Route | Spec | Status |
| --- | --- | --- | --- | --- |
| 65 | Force update | `/features/force-update` | `../app_design 3/65-force-update.md` | `reviewed` |
| 66 | Notification permission | `/features/notification-permission` | `../app_design 3/66-notification-permission.md` | `reviewed` |
| 67 | Image viewer | `/features/image-viewer` | `../app_design 3/67-image-viewer.md` | `reviewed` |
| 68 | Universal search | `/features/universal-search` | `../app_design 3/68-universal-search.md` | `reviewed` |
| 69 | App rating | `/features/app-rating` | `../app_design 3/69-app-rating.md` | `reviewed` |

## Batch Focus

Validate interrupts, permissions, media controls, search usefulness, and rating timing.

## Batch Summary

- Ship-ready: None.
- Must-fix: 65 Force update, 66 Notification permission, 67 Image viewer, 68 Universal search, 69 App rating.
- Redesign candidates: 67 Image viewer needs to become a true immersive media viewer without progress-photo sharing in V1; 68 Universal search needs the real search/deep-link model before polish; 69 App rating needs full prompt-state fixtures.
- Resolved decisions:
  - Static overlay visuals are acceptable for prototype acceptance; full native trigger, dismiss, and API state machines are implementation backlog.
  - Do not allow progress-photo sharing in V1; later sharing needs a decrypted-copy warning and explicit confirmation.
  - Create App Rating fixtures for initial, positive/native prompt, negative feedback, submitted, cooldown, and suppressed states; avoid manipulative pre-gating.

## Screen Notes

### 65 - Force update

- Five-second read: Calm, premium hard-update gate with a clear Balencia brand anchor and bottom CTA.
- Primary action clarity: Update now is visually unmistakable, but it does not open a store link or change state.
- Emotional tone: Warm and reassuring; the inert CTA turns the forced pause into a dead end.
- Screenshot: `/private/tmp/balencia-b17/features-force-update-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | A non-dismissible version-floor gate belongs at root level for API/security compatibility. |
| User friction | 1 | The only exit is inert, so the user cannot complete the required update task. |
| Visual appeal | 4 | The composition is polished, readable, and thumb-zone CTA placement is strong. |
| Brand fit | 4 | Orange, dark surfaces, wordmark, and warm copy align with Brand Mode. |
| Mobile ergonomics | 4 | The single CTA is 325x56 and content fits the phone frame cleanly. |
| Accessibility | 4 | The CTA is a semantic labeled button; no alternate path is expected for a forced gate. |
| Trust/privacy | 4 | No sensitive data ask; trust risk comes from the required action being nonfunctional. |
| Industry best practice | 2 | Forced update gates must reliably deep-link to the correct App Store or Play Store listing. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | navigation | Evidence report found one button and no links. Clicking `Update now` left `/features/force-update` unchanged, opened no popup, and changed no text. | Users trapped behind a force-update gate cannot reach the store to resolve the blocker. | Wire the CTA to platform-specific store deep links with loading, external-return, unavailable-store, and retry/error states while keeping the overlay non-dismissible. | proposed |

Decision: Must fix before launch.

### 66 - Notification permission

- Five-second read: Benefit-led notification pre-permission screen with a strong bell visual and clear value rows.
- Primary action clarity: Enable notifications and Not now are easy to find, but neither advances the permission flow.
- Emotional tone: Warm and respectful; the no-op skip breaks the promised non-blocking permission pattern.
- Screenshot: `/private/tmp/balencia-b17/features-notification-permission-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | A pre-permission interstitial is the right way to protect the one-shot system prompt. |
| User friction | 1 | Both the primary permission CTA and escape hatch are static. |
| Visual appeal | 4 | The icon, benefit stack, and bottom CTA are composed and polished. |
| Brand fit | 4 | Orange, green, and purple map cleanly to action, partner updates, and SIA. |
| Mobile ergonomics | 4 | Primary and secondary controls meet 44px height, and the screen fits comfortably. |
| Accessibility | 4 | Buttons are text-labeled and the content hierarchy is straightforward. |
| Trust/privacy | 3 | The screen explains benefits, but does not represent allow, deny, skip, or settings recovery states. |
| Industry best practice | 1 | Permission pre-prompts need a working request/skip/re-entry state machine before launch. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | conversion | Click checks showed `Enable notifications` and `Not now` both left `/features/notification-permission` unchanged with no text, popup, or dialog change. | Users cannot enable push notifications, preserve the one-time system prompt by skipping, or enter the app from this interstitial. | Implement the pre-permission flow: Enable triggers the native prompt, records allow/deny, dismisses to the correct destination, and Not now skips without burning the system prompt. | proposed |
| major | trust-privacy | The route exposes only the initial ask; no denied, skipped, already-enabled, Settings recovery, or re-entry modal state is represented. | Users who decline or revisit from Settings/Reminders will not get clear recovery guidance, which is especially risky for a one-shot permission. | Add explicit states for allowed, denied, skipped, already enabled, and blocked-with-settings instructions, with analytics/cooldown behavior. | proposed |

Decision: Must fix before launch.

### 67 - Image viewer

- Five-second read: A full-screen dark overlay with close/share chrome, a gallery counter, and a centered progress-photo placeholder.
- Primary action clarity: Viewing the image is not possible because the main content is a placeholder; close and share are visible but inert.
- Emotional tone: Quiet and immersive in layout, but the missing photo makes it feel like a wireframe.
- Screenshot: `/private/tmp/balencia-b17/features-image-viewer-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | A dedicated viewer is necessary for progress photos and journal attachments. |
| User friction | 1 | Users cannot inspect a real image, zoom, pan, dismiss, share, or move through the gallery. |
| Visual appeal | 2 | The chrome is clean, but the large brown placeholder defeats the immersive media purpose. |
| Brand fit | 3 | The dark surface fits System Mode; the orange glow/placeholder feels less utility-native than the spec. |
| Mobile ergonomics | 3 | Close/share are 44px targets, but the required gestures are missing. |
| Accessibility | 1 | Close and share expose generic `BUTTON` labels, and the image has no semantic alt/context. |
| Trust/privacy | 2 | Progress-photo sharing is visible with no encrypted-photo warning, confirmation, or privacy status. |
| Industry best practice | 1 | Image viewers require actual media, dismiss/share controls, zoom/pan, gallery navigation, loading, and error states. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | retention | Evidence found `imageElementCount: 0`; the screenshot shows a camera placeholder inside a 275x430 card while the route text is only `2 of 7`, `May 21`, and `Progress photo`. | Users cannot inspect the full-resolution photo, which is the screen's primary job. | Render the passed image with low-res placeholder loading, high-res crossfade, error/retry state, pinch-to-zoom, double-tap zoom, pan, and left/right gallery swipe. | proposed |
| critical | navigation | Close and Share are the only two buttons, both exposed as generic `BUTTON`. Clicking each left `/features/image-viewer` unchanged with no text, popup, or dialog change. | Users cannot leave the overlay through the visible close control, share a photo, or understand the controls with assistive tech. | Wire close, swipe-down, and Android back dismissal; wire share to the native share sheet and add accessible labels for Close image viewer and Share image. | proposed |
| major | trust-privacy | The spec requires an encrypted Progress Photos share warning, but the live viewer shows a share affordance with no confirmation, warning, or disabled privacy state. | Users may accidentally share sensitive body/progress photos without understanding the decrypted export. | Add a confirmation/toast such as "Photo will be shared unencrypted" before the system share sheet, or disable share until the photo privacy policy is finalized. | proposed |

Decision: Must fix before launch; redesign candidate because the core media surface is still placeholder-level.

### 68 - Universal search

- Five-second read: Polished search results surface with a static protein query, SIA suggestion, filters, and grouped results.
- Primary action clarity: The surface looks searchable, but there is no real text field and results do not deep-link.
- Emotional tone: Smart and useful at a glance; static behavior makes the command center feel decorative.
- Screenshot: `/private/tmp/balencia-b17/features-universal-search-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | Universal search is essential for a large, SIA-routed app. |
| User friction | 1 | The query cannot be typed, cleared, filtered meaningfully, canceled, or opened from a result. |
| Visual appeal | 4 | The result hierarchy, SIA card, and dark surfaces are attractive and scannable. |
| Brand fit | 4 | Orange search focus and restrained purple SIA suggestion fit the system. |
| Mobile ergonomics | 2 | Filter chips are 36px tall and horizontal overflow hides categories in the first viewport. |
| Accessibility | 1 | Evidence found zero inputs and zero links; result rows are not semantic controls. |
| Trust/privacy | 4 | Search history is visible but not yet sensitive; history deletion must work before launch. |
| Industry best practice | 1 | Search overlays need auto-focused input, live results, filters, deep links, history management, and empty/error states. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | information-architecture | Evidence found `inputCount: 0`, `linkCount: 0`, and `roleSearchCount: 0`. Clicking `Cancel`, `Protein pancakes`, and `morning routine` left `/features/universal-search` unchanged with no visible text change. | Users cannot search, dismiss the overlay, repeat a recent search, or navigate to a result. | Replace the static query surface with an auto-focused input, controlled clear button, cancel dismissal, semantic result rows, and deep-link navigation with target pre-focus. | proposed |
| major | design-system-consistency | The live filters are `All, Missions, Habits, Recipes, Notes, Journal, Settings`; the spec calls for `All, Goals, Habits, Recipes, Notes, Journal, Settings, Screens, Community`. Recent searches also remain below active `protein` results. | The search taxonomy does not match the app's mission language and the initial/recent/results states are blended together. | Align filters with product taxonomy, include Screens and Community, and show recent searches only in the empty-query state. | proposed |
| major | accessibility | Filter chips measure 36px high and do not expose selected/pressed radio semantics; result rows are plain divs rather than links or buttons. | Keyboard, screen-reader, and motor users cannot reliably filter or open search results. | Use 44px semantic filter controls with `aria-pressed`/single-select state and make every result/recent row a labeled button or link. | proposed |

Decision: Must fix before launch; redesign candidate until search is a real command surface.

### 69 - App rating

- Five-second read: Bottom-sheet rating prompt appears over dimmed content, but it shows both the initial question and a four-star positive path at once.
- Primary action clarity: Stars, Rate on App Store, Not now, and Do not ask again are visible, but none changes state or exits.
- Emotional tone: Friendly and personal via SIA; the preselected positive state feels coercive and unfinished.
- Screenshot: `/private/tmp/balencia-b17/features-app-rating-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | A non-blocking rating prompt after positive events is a valid growth surface. |
| User friction | 1 | Rating, review, dismissal, suppression, and negative feedback flows are all inert. |
| Visual appeal | 3 | The sheet is attractive, but simultaneous initial and positive states create visual and behavioral confusion. |
| Brand fit | 4 | SIA avatar, dark sheet, and orange stars fit the Balencia tone. |
| Mobile ergonomics | 2 | Stars are 44px, but Not now is 36px and Do not ask again is 32px. |
| Accessibility | 1 | Star buttons expose generic `BUTTON` labels and no selected rating semantics. |
| Trust/privacy | 2 | Preselected four-star state and absent negative feedback path weaken the non-coercive rating promise. |
| Industry best practice | 1 | Rating prompts need trigger gating, unselected state, rating branch, native review, feedback, cooldown, and suppression behavior. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | retention | Click checks showed the first star, `Rate on App Store`, `Not now`, and `Do not ask again` all left `/features/app-rating` unchanged with no popup or text change. | Users cannot rate, leave feedback, dismiss the sheet, or permanently suppress future prompts. | Implement the rating state machine: star selection, positive StoreKit/Play Review path, negative feedback path, not-now cooldown, suppression confirmation, drag/backdrop dismissal, and analytics. | proposed |
| major | product-sense | The initial route text includes both `Enjoying Balencia?` and `Thank you`; four stars are already filled from mock state, and evidence found `inputCount: 0`. | Users see the app assume a positive rating before they respond, and dissatisfied users have no private feedback channel. | Start unselected, show only the initial prompt first, then transition to positive CTA for 4-5 stars or a real feedback textarea for 1-3 stars. | proposed |
| major | accessibility | All five star controls are reported as generic `BUTTON`, and the dismissal links measure 36px and 32px high. | Assistive-tech users cannot tell which star they are choosing, and mobile users have reduced accuracy on dismissal/suppression actions. | Label each star as `Rate N out of 5 stars`, expose selected state, and give Not now / Do not ask again 44px touch targets with the two-tap suppression confirmation. | proposed |

Decision: Must fix before launch; redesign candidate for complete state fixtures.

## Verification

- Targeted visual/interaction report: `/private/tmp/balencia-b17/report.json`.
- Captured screenshots: `/private/tmp/balencia-b17/features-force-update-phone.png`, `/private/tmp/balencia-b17/features-notification-permission-phone.png`, `/private/tmp/balencia-b17/features-image-viewer-phone.png`, `/private/tmp/balencia-b17/features-universal-search-phone.png`, `/private/tmp/balencia-b17/features-app-rating-phone.png`.
- `npm run verify:routes`: passed, `90 screens, 90 specs`.
- `npm run check`: failed during lint on pre-existing generated file `balencia-screens/dev/types/routes.d.ts` for two `@typescript-eslint/no-empty-object-type` errors.
