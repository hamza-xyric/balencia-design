# R17 - System Overlays And Search

- Status: `reviewed`
- Reviewed: 2026-05-27
- Prototype URL: `http://localhost:3000`
- Screens: `65`, `66`, `67`, `68`, `69`
- Routes: `/features/force-update`, `/features/notification-permission`, `/features/image-viewer`, `/features/universal-search`, `/features/app-rating`
- Sources: `../batches/batch-17.md`, `../update-batches/batch-u09.md`, `../screen-iteration-batches/P17-system-overlays-search.md`
- Evidence directory: `../../balencia-screens/output/a-plus-plus-review/R17/`
- Interaction evidence: `../../balencia-screens/output/a-plus-plus-review/R17/R17-interaction-evidence.json`
- Build gate: no
- Finding IDs: `R17-F01+`

## Focus

Validate system overlays, permissions, image viewing, universal search, and rating. A++ requires native-pattern clarity, non-manipulative prompts, strong search utility, and correct overlay focus behavior.

## Required Review Output

- Fresh evidence for every route and key permission, search, image, and rating states.
- Five-second read, primary action clarity, emotional tone, control inventory, rubric scores, A++ grade, findings, and decision for every screen.
- `npm run check` result before close.

## Batch Summary

- A++: 65 Force update.
- A+: 67 Image viewer.
- A: 66 Notification permission, 68 Universal search, 69 App rating.
- Needs polish: 67 Image viewer needs gallery/media-state and small touch-target polish before A++.
- Must-fix before A++: 66 notification permission state model, 68 search filtering/state reset, 69 rating dismissal/suppression behavior.
- Redesign candidates: none; 68 needs interaction repair, not a visual reset.
- User decisions: none.
- Runtime output: fresh R17 interaction capture recorded only React DevTools and HMR info logs in dev mode; no console errors or page errors.
- Verification: `npm run check` passed.

## Screen Notes

### 65 - Force update

- Five-second read: Clear hard-update gate with a strong Balencia brand anchor, update explanation, release highlights, and one dominant update action.
- Screen purpose and journey fit: Correct root-level blocking surface for a deprecated or unsafe app version; it removes all unrelated navigation.
- Primary action clarity: `Update now` enters a store-handoff fixture, then supports unavailable-store and retry states.
- Emotional tone: Calm, official, and reassuring without feeling punitive.
- Screenshot: `../../balencia-screens/output/a-plus-plus-review/R17/65-features-force-update-phone.png`
- State evidence: `../../balencia-screens/output/a-plus-plus-review/R17/65-force-update-r17-initial.png`, `../../balencia-screens/output/a-plus-plus-review/R17/65-force-update-r17-store-handoff.png`, `../../balencia-screens/output/a-plus-plus-review/R17/65-force-update-r17-store-unavailable.png`
- Grade: A++
- Grade cap: none.
- Control inventory: `Update now` starts the store handoff; disabled `Opening store...` honestly indicates handoff in progress; `Simulate store unavailable` is a clearly labeled prototype state switch for the unavailable-store frame; `Retry update` restarts the handoff. Branding, release notes, icon, and version footer are static information.

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | A non-dismissible version-floor gate is appropriate for compatibility and security. |
| User friction | 5 | The user gets one obvious required action plus clear retry recovery. |
| Visual appeal | 5 | The wordmark, icon cluster, release card, and CTA feel premium and composed. |
| Brand fit | 5 | Orange action language, warm dark surfaces, and calm copy match Balencia. |
| Mobile ergonomics | 5 | Primary controls are thumb-zone and 56px/44px safe in captured states. |
| Accessibility | 5 | The CTA and recovery controls are labeled buttons with no small-target or overlap flags. |
| Trust/privacy | 5 | No sensitive ask; the required update reason and recovery state are honest. |
| Industry best practice | 5 | Models store handoff, unavailable-store, and retry/error behavior expected for force-update gates. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| none | none | Fresh initial, store-handoff, unavailable-store, and retry evidence show working controls, 0 console errors, and no target/nesting/overlap flags. | No user-facing issue found. | Keep production Figma frames separate from prototype-only state switching. | accepted |

Decision: A++ / Figma-ready.

### 66 - Notification permission

- Five-second read: Benefit-led notification pre-permission screen with clear reasons to opt in.
- Screen purpose and journey fit: Correctly sits before the one-shot native permission prompt and includes allow, deny, skip, settings, and enabled fixtures.
- Primary action clarity: Initial `Enable notifications`, native `Allow`/`Deny`, `Open Settings`, and `Not now` are visible, but post-denial/already-enabled primary CTA behavior becomes contradictory.
- Emotional tone: Warm and respectful in the default state; less trustworthy in denied/enabled states because the bottom CTA keeps asking.
- Screenshot: `../../balencia-screens/output/a-plus-plus-review/R17/66-features-notification-permission-phone.png`
- State evidence: `../../balencia-screens/output/a-plus-plus-review/R17/66-notification-permission-r17-native-fixture.png`, `../../balencia-screens/output/a-plus-plus-review/R17/66-notification-permission-r17-denied.png`, `../../balencia-screens/output/a-plus-plus-review/R17/66-notification-permission-r17-already-enabled.png`, `../../balencia-screens/output/a-plus-plus-review/R17/66-notification-permission-r17-skipped.png`
- Grade: A
- Grade cap: major finding R17-F01 prevents A+ or A++.
- Control inventory: `Enable notifications` opens the native-permission fixture; `Allow` records enabled; `Deny` records blocked; `Open Settings` models recovery; `Not now` records skip; benefit rows and bell badges are informational.

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | A pre-permission screen is the right pattern for preserving the one-shot prompt. |
| User friction | 3 | The recovery states exist, but the persistent bottom CTA adds confusing re-ask friction. |
| Visual appeal | 4 | Default composition is polished; dense state cards compress the lower CTA area. |
| Brand fit | 5 | Orange, purple, and green map cleanly to action, SIA, and partner updates. |
| Mobile ergonomics | 3 | Denied state evidence shows the bottom CTA clipped near the home indicator. |
| Accessibility | 4 | Main controls are labeled and touch-safe, but contradictory CTA state hurts assistive comprehension. |
| Trust/privacy | 3 | Denied/already-enabled states imply the prompt can be repeated even while copy says it cannot. |
| Industry best practice | 3 | Permission recovery should switch the primary action to Settings or dismiss once enabled/skipped. |

| Finding | Severity | Category | Evidence | User Impact | Recommendation | Status | Grade cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R17-F01 | major | trust-privacy / mobile-ergonomics | `66-notification-permission-r17-denied.png` shows `Notifications are blocked` and `Open Settings`, while the bottom CTA still says `Enable notifications` and is clipped by the phone bottom. `66-notification-permission-r17-already-enabled.png` shows `Already enabled. No prompt needed.` while still presenting `Enable notifications`. | Users can be misled about one-shot permission behavior and may think the system prompt can be retried after denial or after permission is already enabled. | In denied/settings/already-enabled/skipped states, replace the bottom CTA with the correct single action (`Open Settings`, `Done`, or dismissed state), and ensure all state cards fit above the home indicator. | proposed | Prevents A+ and A++ |

Decision: needs polish.

### 67 - Image viewer

- Five-second read: Immersive dark media viewer with close/share controls, gallery counter, zoom affordance, and V1 privacy-safe sharing disabled state.
- Screen purpose and journey fit: Correct terminal overlay for inspecting progress photos or journal images from a gallery context.
- Primary action clarity: Close, next/previous, zoom, and share-warning paths are understandable and work in the prototype.
- Emotional tone: Quiet, focused, privacy-protective.
- Screenshot: `../../balencia-screens/output/a-plus-plus-review/R17/67-features-image-viewer-phone.png`
- State evidence: `../../balencia-screens/output/a-plus-plus-review/R17/67-image-viewer-r17-next-image.png`, `../../balencia-screens/output/a-plus-plus-review/R17/67-image-viewer-r17-zoomed.png`, `../../balencia-screens/output/a-plus-plus-review/R17/67-image-viewer-r17-share-disabled-warning.png`, `../../balencia-screens/output/a-plus-plus-review/R17/67-image-viewer-r17-closed.png`
- Grade: A+
- Grade cap: minor finding R17-F02 prevents A++.
- Control inventory: Close dismisses to a closed fixture; Share opens the V1 disabled/privacy warning; Previous/Next change gallery position; image tap toggles zoom in/out; `Got it` dismisses the share warning; pagination dots are static position indicators.

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | The viewer now serves a real media-inspection job and keeps editing/deletion out of the overlay. |
| User friction | 4 | Core controls work, but gallery state fidelity is still thin. |
| Visual appeal | 4 | The dark chrome and image surface are composed; the mock image is still stylized rather than photo-real. |
| Brand fit | 5 | System-mode restraint and the orange privacy warning fit the brand. |
| Mobile ergonomics | 5 | Main chrome controls are 44px-safe and easy to reach. |
| Accessibility | 4 | Main controls are labeled; one warning dismissal is slightly narrow. |
| Trust/privacy | 5 | V1 sharing is disabled with explicit encrypted-photo language. |
| Industry best practice | 4 | Zoom and navigation are represented, but gallery navigation should alter media/date metadata. |

| Finding | Severity | Category | Evidence | User Impact | Recommendation | Status | Grade cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R17-F02 | minor | accessibility / media-state | `R17-interaction-evidence.json` shows `Next image` changes text from `2 of 7` to `3 of 7`, but image alt/date remain `Progress photo from May 21`; `Got it` in the share warning measures `38x44`. | The gallery feels like a counter-only fixture rather than distinct photo states, and one text-only dismissal is slightly below the preferred 44px width. | Provide at least two distinct gallery images/date metadata for Figma state evidence and widen the `Got it` hit area to 44px minimum. | proposed | Prevents A++ |

Decision: needs polish.

### 68 - Universal search

- Five-second read: A polished search command surface with focused input, category chips, recents, SIA suggestion, and grouped results.
- Screen purpose and journey fit: Correct global overlay concept for finding goals, habits, recipes, notes, screens, and community content.
- Primary action clarity: Typing and result opening work, but filters and state resets are not reliable enough for A++.
- Emotional tone: Smart and utility-forward until stale state and ineffective filters make it feel unfinished.
- Screenshot: `../../balencia-screens/output/a-plus-plus-review/R17/68-features-universal-search-phone.png`
- State evidence: `../../balencia-screens/output/a-plus-plus-review/R17/68-universal-search-r17-query-protein.png`, `../../balencia-screens/output/a-plus-plus-review/R17/68-universal-search-r17-query-protein-goals-filter.png`, `../../balencia-screens/output/a-plus-plus-review/R17/68-universal-search-r17-cancel-clears.png`, `../../balencia-screens/output/a-plus-plus-review/R17/68-universal-search-r17-recent-selected.png`
- Grade: A
- Grade cap: major finding R17-F03 prevents A+ or A++.
- Control inventory: Search input accepts text and auto-focuses; Clear clears the query; Cancel currently clears to recents rather than dismissing; category chips set selected state; recent rows populate the input; result rows show an opening fixture; SIA suggestion card is informational in the current prototype.

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | Universal search is essential for a broad AI life-coach app. |
| User friction | 2 | Users can search, but selected filters do not scope results and stale state persists. |
| Visual appeal | 4 | The UI is attractive, legible, and clearly organized. |
| Brand fit | 5 | Orange focus, warm surfaces, and one purple SIA cue are aligned. |
| Mobile ergonomics | 4 | Primary controls are touch-safe; horizontal chip row is expected. |
| Accessibility | 4 | Input and result rows are semantic; the SIA suggestion is not currently a button. |
| Trust/privacy | 5 | No sensitive data is exposed; search history is visible and local-fixture safe. |
| Industry best practice | 2 | Search filters and cancel/state reset behavior do not yet meet command-palette expectations. |

| Finding | Severity | Category | Evidence | User Impact | Recommendation | Status | Grade cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R17-F03 | major | information-architecture | In `68-universal-search-r17-query-protein-goals-filter.png`, the `Goals` chip is selected but `RECIPES (3)` and `QUICK NOTES (2)` remain visible. The active filter list omits the spec-required `Settings` chip. `68-universal-search-r17-cancel-clears.png` also keeps the stale `Opening Protein pancakes detail...` banner after clearing to recents. | Users cannot trust filters to narrow search scope, may miss settings deep links, and see stale navigation feedback after changing intent. | Make chips true single-scope filters, add `Settings`, clear result-open banners on query/filter/cancel changes, and reset or intentionally preserve filter state with visible rationale. | proposed | Prevents A+ and A++ |

Decision: needs polish.

### 69 - App rating

- Five-second read: Friendly bottom-sheet rating prompt with unselected stars, private feedback branch, positive review branch, cooldown, and suppression fixtures.
- Screen purpose and journey fit: Correct non-blocking growth surface after positive moments, with a private low-rating path.
- Primary action clarity: Star branching works, but dismissal/suppression states do not fully honor the expected exit behavior.
- Emotional tone: Warm and non-coercive initially; suppressed/cooldown states feel unresolved because the prompt remains active.
- Screenshot: `../../balencia-screens/output/a-plus-plus-review/R17/69-features-app-rating-phone.png`
- State evidence: `../../balencia-screens/output/a-plus-plus-review/R17/69-app-rating-r17-positive-path.png`, `../../balencia-screens/output/a-plus-plus-review/R17/69-app-rating-r17-negative-path-empty-feedback.png`, `../../balencia-screens/output/a-plus-plus-review/R17/69-app-rating-r17-cooldown-state.png`, `../../balencia-screens/output/a-plus-plus-review/R17/69-app-rating-r17-suppressed-state.png`
- Grade: A
- Grade cap: major finding R17-F04 prevents A+ or A++; minor finding R17-F05 prevents A++.
- Control inventory: Star radios select 1-5 ratings and branch to positive/negative paths; `Rate on App Store` closes to a dismissed fixture; feedback textarea collects private feedback and gates `Submit feedback`; `Not now` shows cooldown copy; `Do not ask again` reveals confirmation; `Confirm` sets suppressed state.

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | The happy-path-first rating prompt belongs after positive events and avoids pre-gating. |
| User friction | 3 | Star branching works, but dismissal and suppression do not actually resolve the modal state. |
| Visual appeal | 4 | The sheet is polished, though positive/negative copy hierarchy repeats itself. |
| Brand fit | 4 | SIA avatar and orange star language fit; repeated generic subtitle weakens tone in branches. |
| Mobile ergonomics | 5 | Main controls are 44px-safe and fit in captured states. |
| Accessibility | 4 | Star radios are semantic, but labels are less descriptive than the spec's `Rate N out of 5 stars`. |
| Trust/privacy | 3 | Suppression/autonomy copy is present, but controls remain active after suppression. |
| Industry best practice | 3 | Rating prompts should dismiss or deactivate after cooldown/suppression and provide stronger feedback validation. |

| Finding | Severity | Category | Evidence | User Impact | Recommendation | Status | Grade cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R17-F04 | major | trust-privacy / autonomy | `69-app-rating-r17-cooldown-state.png` shows `We'll wait 30 days before asking again` while the full rating prompt remains active. `69-app-rating-r17-suppressed-state.png` shows `Rating prompts suppressed` but still exposes all five stars, `Not now`, and `Do not ask again`. | Users who dismiss or permanently suppress the prompt do not see a clear completed exit, undermining the autonomy promise. | Make `Not now`, backdrop/drag dismissal, and confirmed suppression close the sheet or switch to a resolved non-interactive confirmation before dismissal. | proposed | Prevents A+ and A++ |
| R17-F05 | minor | content / validation | `69-app-rating-r17-positive-path.png` shows `Thank you` twice and keeps the generic subtitle `We'd love to hear how you feel.` after a rating is selected. Negative feedback has no character counter and enables submit after `4` characters in implementation, while the spec requires at least `10`. | Branch states feel less polished and may accept low-quality private feedback. | Use branch-specific subtitles, remove duplicate positive heading, add the 200-character counter, and align submit enablement to the documented 10-character minimum. | proposed | Prevents A++ |

Decision: needs polish.

## Verification

- Fresh interaction evidence: `../../balencia-screens/output/a-plus-plus-review/R17/R17-interaction-evidence.json`.
- Captured screenshots: `../../balencia-screens/output/a-plus-plus-review/R17/*-r17-*.png`.
- `npm run check`: passed; eslint, typecheck, route, asset, copy, and brand verification completed successfully.
- R17 build gate: not required.
