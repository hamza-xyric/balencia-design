# F2 frozen verification matrix

- Production-only base: `http://localhost:3002`, bound to the current `.next/BUILD_ID`.
- Frame: 390×844; reduced motion; isolated context per fixture; deterministic consecutive phone-frame captures.
- Exact total: **113 PNG fixtures + 10 screenshot-free true 125% proofs = 123 contexts**.
- Every fixture: one exact screen marker, no horizontal overflow, named native controls, visible controls >=44px, all-caps `CIA`, no console/page/capability events, no storage/cookies, and state-specific hard assertions.
- Each screen's first state receives an additional actual 125% font-size proof.

| ID | Marker | Frozen states |
|---|---|---|
| 57 | `data-f2-state="57-<state>"` | `default`, `low-confidence`, `honest-null`, `skeleton`, `error-cached`, `offline`, `check-undo`, `all-done`, `sync-disabled`, `edit-item`, `data-controls` |
| 58 | `data-f2-state="58-<state>"` | `default-real`, `low-confidence`, `honest-null`, `manual-only`, `skeleton`, `sync-error-cached`, `offline`, `range-14d`, `manual-disabled`, `manual-success`, `data-controls`, `safety-open` |
| 60 | `data-f2-state="60-<state>"` | `default-real`, `roster-low-confidence`, `honest-null`, `skeleton`, `heatmap-error-cached`, `dose-success`, `all-doses-complete`, `add-disabled`, `add-valid`, `free-paywall`, `data-controls` |
| 62 | `data-f2-state="62-<state>"` | `default-real`, `low-confidence`, `honest-null`, `skeleton`, `empty`, `search-empty`, `error`, `success`, `offline`, `disabled`, `data-controls` |
| 63 | `data-f2-state="63-<state>"` | `premium-real`, `free-preview`, `low-confidence`, `honest-null`, `skeleton`, `error`, `success`, `offline`, `disabled`, `data-controls` |
| 70 | `data-f2-state="70-<state>"` | `default`, `skeleton`, `empty`, `error-list`, `offline`, `detail`, `error-detail`, `success`, `disabled`, `media-low-confidence`, `media-null`, `data-controls` |
| 86 | `data-f2-state="86-<state>"` | `default-consented`, `empty-unconsented`, `skeleton`, `safety-unclear`, `render-error`, `success`, `consent-revoked`, `offline-disabled`, `delete-confirm`, `data-controls` |
| 87 | `data-f2-state="87-<state>"` | `default`, `filter-shared`, `filter-deleting`, `empty`, `skeleton`, `low-confidence`, `offline-cached`, `error`, `reuse-success`, `delete-confirm`, `delete-pending`, `data-controls` |
| 88 | `data-f2-state="88-<state>"` | `default`, `eye-test-null`, `exercise-active`, `exercise-success`, `strain-low-confidence`, `empty`, `skeleton`, `error`, `disabled`, `offline`, `consent-off`, `data-controls` |
| 89 | `data-f2-state="89-<state>"` | `default-real`, `low-confidence`, `honest-null`, `skeleton`, `source-error`, `offline`, `mood-success`, `breathing-success`, `module-disabled`, `low-motivation`, `what-this-logs`, `data-controls` |

## Sol-owned fixed safety/truth decisions

- 60 uses an explicitly fictional neutral fixture: `Daily support A`, `Daily support B`, `Daily support C`; amounts are `Dose A/B/C` and never clinical units. Copy: `Demo schedule only. Follow your prescribed label and clinician guidance; Balencia does not recommend changing or skipping a dose.` The default schedule has four dose events, three complete, derived 75%; medication count and dose-event count are labeled separately.
- 58 missing night is a semantic and visual gap, never zero/interpolated; manual-only hides stages and recovery.
- 63 correlation language is observational and explicitly says `not causation` with source/sample/freshness/confidence.
- 86 consent, source image, generated image, scrubber, CIA, and action availability derive from one state model. No scrubber before two valid panes.
- 87 group/hero counts derive from the same fixture data or explicitly say `3 shown of 7`.
- 88 remains non-diagnostic; urgent guidance is always available and reduced motion is behavior, not visible implementation-note copy.
- 89 uses one canonical two-session fixture everywhere; crisis resources remain available in every state including skeleton/offline/error/disabled.

## Required interaction proof

- 57 native add and item checkbox/Space/undo/edit; 58 range tabs, manual-log validation/success, data and safety dialogs; 60 dose completion math, add validation, Paywall information, data controls.
- 62 controlled capture/filter/error retry; 63 native range/context/note/submit plus entitlement; 70 search/filter and focus-managed detail Add/retry.
- 86 consent/action/delete and success comparison keyboard behavior; 87 filters/reuse/delete; 88 tabs/timer/consent/urgent guidance; 89 module/source, breathing/mood, what-this-logs and data controls.
- Enabled controls must have a deterministic local outcome. Device/account/network features remain local previews or disabled with reasons.
