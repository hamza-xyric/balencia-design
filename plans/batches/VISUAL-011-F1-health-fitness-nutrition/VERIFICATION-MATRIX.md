# VISUAL-011 F1 frozen verification matrix

- Frozen: 2026-07-16 before F1 product edits
- Scope: exactly `26,27,28,29,49,52,53,54,55,56`
- Required output: **101 deterministic PNGs + 10 screenshot-free 125% proofs = 111 isolated contexts/nonces**
- Every state is query-addressable through `?state=...`, mutually exclusive, storage/cookie clean, deterministic, reduced-motion safe, and visual-only.

## Authority and asset adjudications

- All health metrics expose unit/source/freshness/confidence or honest-null. CIA wording is observational and never diagnoses or infers from one isolated sensor value.
- S27 uses metric units: 185 lb is rendered as 83.9 kg, never silently relabelled. Offline persistence is a local preview/dependency claim only.
- S28 freezes 120g carbs, 40g fat, 95g protein = 1,220 macro kcal and rounded shares 39/30/31; target 2,200, consumed 750, left 1,450; seven days show 5/7.
- S29 freezes 520 total kcal, 435 macro kcal, and an explicit 85 kcal unattributed gap; the ingredient excerpt is clearly incomplete. Scanner outputs require confirmation and are disabled offline.
- S49 precise data is explicitly demo until personal consent; analysis is independently opt-in. Code-native neutral checkpoints fulfill HIFI-49-01 without body imagery.
- S52 trend values/display must reconcile and a native 1–10 range input is required. Crisis/help is a qualified local prototype route.
- S53 has an accessible reduced-motion breathing pacer and technique-specific acknowledgement before higher-risk breath-hold/hyperventilation content. Exactly 5/8 blocks are filled. Ten minutes is the frozen locked preview per current spec.
- S54 actual weekly minutes equal the displayed actual series; projections are separate purple/dashed low-confidence data. Practice CTA and catalog duration match.
- S55 includes a weekly trend and sourced RPG level. Beginner content is not paywalled; HIFI-55-01 is a code-native tutorial-unavailable fallback with instructions and no person imagery.
- S56 inherits Nutrition/Recipes IA, distinguishes preferences from confirmed allergies, and applies restrictions before CIA ranking. HIFI-56-01 is a code-native food/chef placeholder; no raster or private/home imagery.
- HIFI-26-01 uses the existing privacy-safe asset. HIFI-27-01 and HIFI-29-01 use explicit code-native instructional dispositions. Screens 28, 52, 54 require no image.

## Exact PNG cases

| Screen | Required PNG names |
|---|---|
| 26 | `26-default`, `26-low-confidence`, `26-empty`, `26-error`, `26-offline`, `26-data-controls`, `26-success`, `26-disabled`, `26-asset` |
| 27 | `27-active`, `27-input-edit`, `27-paused`, `27-stopped`, `27-summary`, `27-sensor-null`, `27-offline`, `27-data-controls`, `27-safety` |
| 28 | `28-default`, `28-data-controls`, `28-water-success`, `28-water-disabled`, `28-empty`, `28-offline`, `28-error`, `28-tab-empty`, `28-allergy` |
| 29 | `29-detail`, `29-logger`, `29-scanner-unavailable`, `29-tab-change`, `29-success`, `29-offline`, `29-empty`, `29-media-consent`, `29-error` |
| 49 | `49-default-demo`, `49-personal-consented`, `49-empty-unconsented`, `49-low-confidence`, `49-privacy-revoked`, `49-delete-confirm`, `49-error-upload`, `49-offline`, `49-privacy-controls` |
| 52 | `52-default`, `52-empty`, `52-low-confidence`, `52-error-whoop`, `52-offline`, `52-log-success`, `52-log-disabled`, `52-safety-open`, `52-privacy-controls` |
| 53 | `53-default`, `53-empty`, `53-library-error`, `53-active-inhale`, `53-active-hold-paused`, `53-session-success`, `53-rating-error`, `53-duration-locked`, `53-risky-technique-gate`, `53-offline` |
| 54 | `54-default-real`, `54-low-confidence`, `54-honest-null`, `54-filter-quick`, `54-active-session`, `54-paused`, `54-post-disabled`, `54-post-success`, `54-error-retry`, `54-offline`, `54-data-controls`, `54-premium-preview` |
| 55 | `55-default-real`, `55-low-confidence`, `55-honest-null`, `55-filter-advanced`, `55-session-active`, `55-session-paused`, `55-pose-fallback`, `55-summary-disabled`, `55-summary-success`, `55-section-error`, `55-data-controls`, `55-premium-preview` |
| 56 | `56-default-parent`, `56-search-results`, `56-no-match`, `56-allergy-conflict`, `56-recipe-detail`, `56-favorite-toggle`, `56-create-empty`, `56-create-validation`, `56-create-success`, `56-offline-disabled`, `56-error-retry`, `56-data-controls`, `56-premium-disposition` |

Each screen also receives one actual 125% font-size proof. CSS transform-only scaling is forbidden.

## Harness invariants and gates

- Fresh `next start -p 3002`; product/API/accepted start/end fingerprints stable; accepted sentinel set is 61 files (52 inherited non-F1 + nine E1).
- Unique context/nonce per case; empty local/session/IndexedDB/cache/cookies; two RAFs; reduced motion; no external request or device/browser capability.
- Guard fetch/XHR/WebSocket/EventSource/sendBeacon, geolocation, notifications, payment, credentials, clipboard, share, file/media picker, vibration, and external navigation.
- Native controls >=44×44, visible focus, no horizontal overflow, no console/page/capability events, mutually exclusive states, deterministic accessible labels, and pass-atomic PNG promotion.
- Acceptance: fresh build; dedicated F1 verifier exact 111 contexts/101 PNGs; strict 10/10 zero issues/warnings; `npm run check`; root 104/104; 61/61 sentinels; root/submodule diff checks; Sol native-pixel inspection; three independent reviews at `0 Critical / 0 High / 0 Medium`.
