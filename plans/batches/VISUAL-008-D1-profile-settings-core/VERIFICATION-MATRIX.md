# VISUAL-008-D1 — verification matrix (frozen before implementation)

- Frozen: 2026-07-11 by Sol after three Luna read-only reconciliations
- Family: `17,18,21,22,23,24,25,50`
- Strict gate: `node scripts/verify-visual-104.mjs --strict --only 17,18,21,22,23,24,25,50 --screenshots` => 8/8, zero issues/warnings
- Dedicated verifier: `balencia-screens/scripts/verify-d1-profile.mjs`
- Screenshot contract: exactly **91** canonical 390x844 PNGs
- Context contract: exactly **99** fresh contexts/nonces = 91 canonical PNG cases + 8 screenshot-free 125% text-only proofs
- Evidence: `plans/batches/VISUAL-008-D1-profile-settings-core/evidence/`

## Stable state contracts

Every `?state=` fixture must settle into the matching root value after first paint. Skeleton roots also expose `aria-busy="true"`; state modules are mutually exclusive.

| Screen | Root attribute | Exact states |
|---|---|---|
| 17 | `data-me-state` | `default`, `skeleton`, `empty`, `error`, `offline`, `success`, `disabled` |
| 18 | `data-explore-state` | `default`, `partial`, `empty`, `error`, `offline`, `locked` |
| 21 | `data-settings-state` | `default`, `skeleton`, `partial`, `saving`, `error`, `offline`, `success` |
| 22 | `data-services-state` | `default`, `skeleton`, `unconnected`, `error`, `offline`, `success`, `disabled` |
| 23 | `data-billing-state` | `default`, `skeleton`, `empty`, `error`, `offline`, `success`, `disabled`, `payment-final-day`, `payment-post-grace` |
| 24 | `data-notifications-state` | `default`, `skeleton`, `empty`, `sparse`, `error`, `offline`, `success`, `disabled` |
| 25 | `data-help-state` | `default`, `skeleton`, `empty`, `error`, `offline`, `success` |
| 50 | `data-profile-state` | `default`, `partial`, `skeleton`, `error`, `offline`, `success`, `invalid` |

## Stable substate attributes

| Screen | Required stable substates |
|---|---|
| 17 | `data-me-panel="closed|data-controls|avatar-consent"` |
| 18 | `data-search-state="idle|results|empty"`; `data-radar-state="real|partial|null"`; `data-explore-panel="closed|data-controls|module"` |
| 21 | `data-hardware-state="supported|unsupported"`; `data-settings-panel="closed|password|data-controls"` |
| 22 | `data-provider`; `data-provider-status="connected|pending|unconnected|error|disabled"`; `data-services-panel="closed|controls|connect|disconnect"` |
| 23 | `data-usage-used="800"`; `data-usage-limit="1000"`; `data-billing-panel="closed|compare|cancel|update|credits"` |
| 24 | `data-notification-filter="all|cia|reminders|social"`; `data-notification-total`; `data-period="7d"`; `data-notifications-panel="closed|row-menu|controls"` |
| 25 | `data-search-state="idle|results|empty"`; `data-help-panel="closed|cia-consent|contact|article"`; `data-handoff-context="none|query-only"`; `data-ticket-state="none|local-preview"` |
| 50 | `data-form-dirty="true|false"`; `data-form-valid="true|false"`; `data-photo-consent="unknown|declined|accepted|revoked"`; `data-profile-panel="closed|photo-consent|picker-preview|discard|delete|demographic"` |

## Exact screenshot manifest

- **17 (9):** `17-default.png`, `17-skeleton.png`, `17-empty.png`, `17-error.png`, `17-offline.png`, `17-success.png`, `17-disabled.png`, `17-data-controls.png`, `17-avatar-consent.png`
- **18 (10):** `18-default.png`, `18-partial.png`, `18-empty.png`, `18-error.png`, `18-offline.png`, `18-locked.png`, `18-search-results.png`, `18-search-empty.png`, `18-paywall-locks.png`, `18-data-controls.png`
- **21 (11):** `21-default.png`, `21-skeleton.png`, `21-partial.png`, `21-saving.png`, `21-error.png`, `21-offline.png`, `21-success.png`, `21-hardware-unsupported.png`, `21-password-modal.png`, `21-data-controls.png`, `21-notifications-toggled.png`
- **22 (11):** `22-default.png`, `22-skeleton.png`, `22-unconnected.png`, `22-error.png`, `22-offline.png`, `22-success.png`, `22-disabled.png`, `22-provider-controls.png`, `22-connect-consent.png`, `22-disconnect-confirm.png`, `22-reduced-motion.png`
- **23 (13):** `23-default.png`, `23-skeleton.png`, `23-empty.png`, `23-error.png`, `23-offline.png`, `23-success.png`, `23-disabled.png`, `23-payment-final-day.png`, `23-payment-post-grace.png`, `23-compare-table.png`, `23-cancel-confirm.png`, `23-update-payment.png`, `23-reduced-motion.png`
- **24 (13):** `24-default.png`, `24-skeleton.png`, `24-empty.png`, `24-sparse.png`, `24-error.png`, `24-offline.png`, `24-success.png`, `24-disabled.png`, `24-filter-cia.png`, `24-row-menu.png`, `24-controls.png`, `24-mark-read-undone.png`, `24-reduced-motion.png`
- **25 (11):** `25-default.png`, `25-skeleton.png`, `25-empty.png`, `25-error.png`, `25-offline.png`, `25-success.png`, `25-search-results.png`, `25-search-empty.png`, `25-cia-consent.png`, `25-contact-no-ticket.png`, `25-article.png`
- **50 (13):** `50-default.png`, `50-partial.png`, `50-skeleton.png`, `50-error.png`, `50-offline.png`, `50-success.png`, `50-invalid.png`, `50-dirty-valid.png`, `50-dirty-invalid.png`, `50-photo-consent.png`, `50-unsaved-exit.png`, `50-delete-confirm.png`, `50-enlarged-bottom.png`

Total: 9 + 10 + 11 + 11 + 13 + 13 + 11 + 13 = **91 PNGs**.

## Frozen product/data decisions

- Visible coach name is `CIA` in all caps under DVF-07; stale `Cia` audit recommendations are void.
- S17: `3 connected providers` and `84 imported records` are different scoped units; current persona level 12 wins. Book of Life routes to S20.
- S18: one screen-local five-domain radar and legend share `Fitness 30`, `Sleep 25`, `Meditation 20`, `Wellbeing 15`, `Career 10` = exactly 100. Partial/null states are explicit. No shared radar edit.
- S22: exact 11-provider roster is WHOOP, Apple Health, Fitbit, Garmin, Oura Ring, Samsung Health, MyFitnessPal, Cronometer, Lumen, Google Calendar, Spotify; group totals 6+3+1+1. Connection management is free; no paywall belongs on S22.
- S23: usage is exactly 800/1,000 = 80% = 8/10 ticks. Renewal is separate from usage labelling.
- S24: one seven-day payload `[1,0,2,1,0,1,1]` totals 6; categories are `CIA 3`, `Reminders 2`, `Social 1`; six rendered rows use that same scope. Zero categories are omitted. Sleep uses `domain-sleep`; Social uses the defined Relationships token while retaining the visible category label.
- S50: default is populated 6/8 = 75%; Day-1 partial is 2/8. Global tab bar is hidden. `HIFI-50-01` uses the privacy-first honest-null avatar disposition; no synthetic identity raster is required.

## Exact contextual data-control set

Where the screen touches member/provider/billing/notification/help/profile data, the contextual control surface exposes exactly these eight controls as real buttons: **Category, Source, Scope, Freshness, Retention, Export, Revoke, Delete**. `Confidence` may appear as non-action provenance where relevant but is not a ninth control.

## Hard assertions

1. **Family-wide:** all visible enabled controls produce a local state, same-origin route, or focus-trapped contextual overlay; no enabled actionless button remains. Targets are >=44x44, editable text >=16px, mutable semantic text >=12px, normal text >=4.5:1, UI/focus >=3:1. Visible focus, keyboard operation, logical headings, reduced motion, 125% text-only enlargement, scroll clearance, modal inertness/trap/Escape/restoration, equal exits, and non-color state cues pass.
2. **Capability honesty:** zero console/page errors and zero forbidden capability events: no external/API mutation, real auth/OAuth, storage, cookies, clipboard, media/file picker, share, download, WebSocket, OS biometric/notification action, call, text, or external navigation. Prototype results state what did not occur.
3. **S17:** exact provider/record wording; honest initials avatar; exact eight controls; Search→68, Settings→21, avatar→50, Life Power→16, journal→73, Book of Life→20, connected services→22, photos→49, achievements→71.
4. **S18:** one five-domain payload drives radar, legend, accessible summary, count, and exact 100 total; partial/null are truthful; exactly two canonical `PaywallLock` sections with inert preview and operable S43 actions; search and per-suggestion provenance pass.
5. **S21:** one H1; supported fixture exposes native Notifications, Background sync, and Face ID switches; unsupported fixture omits Face ID and states why; save/error-revert/offline truth; exact controls; safety reaches S25 and explicitly does not place calls or send texts.
6. **S22:** exactly 11 provider cards/group total; one atomic provider status each; WHOOP fresh-connected never says retrying; Fitbit pending explains retry; exact controls; connect/disconnect equal exits; native disabled reason; no visible route/path; no running reduced-motion spinner.
7. **S23:** meter exposes exactly 8 full and 2 empty ticks and accessible name `800 of 1,000 used`; semantic comparison table has plan headers and Included/Not included text; four plan actions/current state; billing provenance/null/stale variants; all actions >=44px; equal-exit update/cancel flows.
8. **S24:** heading text is exactly `Activity history` with no markup leakage; native pressed filters and independent row/overflow controls; exact totals/period/source; `Check-ins 0` absent; Notifications API provenance; solid ledger; mark-read/undo restores state; exact controls.
9. **S25:** one labelled `input[type=search]`; Clear is conditional, >=44px, restores six categories and focus; result count announced; no-match retains exits; CIA handoff shares query-only after explicit equal-exit consent; default is exactly `No ticket yet`/`No current SLA`; support outcome states no request/network/ticket was created; footer/article actions work.
10. **S50:** controlled labelled first/last text, phone `type=tel`, About `textarea[maxlength=160]`; clean Save disabled because unchanged, valid dirty Save enabled irrespective of optional completeness, invalid dirty state has text error; consent precedes picker preview and no media/file capability fires; dirty Back opens equal-exit discard alert; offline preserves edits; accessible completeness/progress and You logged provenance; no tab bar.
11. **Visual evidence:** every named interaction/state capture that should change pixels differs from its default; `50-enlarged-bottom.png` shows profile controls, status/reason, and sticky Save without clipping/overlap at 125% text.

## Integrity fingerprints

- Product files: the eight D1 screen files plus `src/components/hifi/screens/profile/index.ts`.
- Shared/API files: package/Next config, layout/globals, HifiPrototype, HifiShell, BackControl, buttons/chips/chrome/core/data/glass input/paywall/surfaces/system/signature icons, profile registry, combined registry, PhoneFrame/ScreenShell, persona, screen metadata, dynamic screen route, and verifier self.
- Authority files: D1 audit, current eight specs, compact canon, component catalog, REFERENCE-DIRECTION, DECISIONS, this batch/matrix, all recon/builder/review packets, and accepted worker/review evidence present at run time.
- Accepted-family sentinels: the 39 exact source hashes in `evidence/ACCEPTED-SENTINELS-BEFORE.sha256` must remain byte-identical at D1 close. S12 additionally remains exact SHA `107b59b58bca73a05045dfd90a68cdf4219176f72aa7e6dcf48b59165f75df67`.
- Start/end product/API/authority/accepted-sentinel digests must match within the verifier run; local `.next/BUILD_ID` must bind every product/API source timestamp to the fresh production build.

## Frozen ownership

| Owner | Files |
|---|---|
| Terra A | `S17MeMain.tsx`, `S18Explore.tsx` |
| Terra B | `S21Settings.tsx`, `S22ConnectedServices.tsx` |
| Terra C | `S23SubscriptionBilling.tsx`, `S24NotificationHistory.tsx` |
| Terra D | `S25HelpCenter.tsx`, `S50ProfileEdit.tsx` |
| Sol only | shared kit/globals/registries/routes, `verify-d1-profile.mjs`, batch/evidence/ledger/decision/handoff files |

## Freeze checklist

- [x] Current state/query/root surface inventoried
- [x] Current controls/forms/modals/routes and stale shared-audit roots reconciled
- [x] Exact 91-PNG/99-context contract recorded
- [x] Interaction and 125% cases recorded
- [x] Product/API/authority/accepted-sentinel fingerprint sets recorded
- [x] Builder ownership frozen and disjoint
- [x] Sol decisions resolve every source ambiguity
- [x] Matrix frozen before any D1 product edit
