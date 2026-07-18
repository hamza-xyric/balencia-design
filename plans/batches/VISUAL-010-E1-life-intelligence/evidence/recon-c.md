# VISUAL-010 E1 — Luna reconciliation C

- Scope: screens `93`, `96`, plus the accepted-family source-sentinel set through D2.
- Posture: read-only reconciliation evidence only. This is not an acceptance or implementation-readiness decision.
- Product files were not edited; no server, browser, external service, or `yhealth-app` action was used.

## Source posture

- **Live intent:** the repaired hi-fi specs declare the product routes, 390×844 frame, behavior, state, consent, and asset contracts (`Balencia-New-Screens/hifi-screens/93-mood-trends.md:3-16,66-99`; `Balencia-New-Screens/hifi-screens/96-health-data-view.md:3-16,68-103`).
- **Live operability:** current components are the rendered truth (`balencia-screens/src/components/hifi/screens/intelligence/S93MoodTrends.tsx:29-132`; `balencia-screens/src/components/hifi/screens/intelligence/S96HealthDataView.tsx:34-156`).
- **Live shared authority:** native reference is 390×844 and AA/44px/reduced-motion are floors (`Balencia-New-Screens/canon/COMPACT-CANON.md:8,82-87`); canonical paywalls, consent, safety, provenance, charts, and stale-state behavior are specified in the catalog (`Balencia-New-Screens/canon/COMPONENT-CATALOG.md:52-66,112-124,138`).
- **Live dependency truth:** actual provider synchronization is still queued, real fetching/normalization/logging/background sync are unchecked, and OAuth token exchange is pending (`balencia_doc/work-items/NS-009-data-sync-from-health-providers.md:1-16,20-33,41-63`). Any prototype fixture must therefore be plainly illustrative/local and must not imply a working provider integration.
- **Open audit, partly stale:** E1 audit rows remain the finding baseline (`Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/audit/E1-life-intelligence.md:33-44`), but claims must be reclassified against current code below. Static/browser limitations remain applicable (`.../E1-life-intelligence.md:46-50`).
- **Asset authority:** S93 requires no image; S96 names `HIFI-96-01` (`Balencia-New-Screens/hifi-screens/93-mood-trends.md:94-95`; `Balencia-New-Screens/hifi-screens/96-health-data-view.md:98-100`), and the registry defines it as provider-neutral wearable/ring/phone-health/cloud outline icons (`Balencia-New-Screens/hifi-screens/_IMAGE-SLOTS.md:3-13`).
- **Accepted checkpoint:** D2 is recorded PASS on a fresh production build, with strict/check/104/sentinel/diff gates and 47 inherited accepted source files unchanged (`plans/batches/VISUAL-009-D2-profile-commercial/evidence/VERIFICATION-LOG.md:3-25`).

## Screen 93 — Mood trends

### Exact current fixture and behavior

- The only rendered fixture is the default 7-day view: mood `6/10`, `steady`, Jul 7, from check-in (`S93MoodTrends.tsx:62-75`); chart payload is four real values `[5,6,5,6]`, three projected values `[6,7,6]`, and **two** journal markers `[1,3]` (`S93MoodTrends.tsx:79-100`).
- The Cia card separately claims evidence from `4 check-ins` and `3 journal entries` and says mood was higher on journal days (`S93MoodTrends.tsx:103-105`). The recent rows are Jul 7 steady and Jul 6 low (`S93MoodTrends.tsx:24-27,107-120`). This is a live single-payload inconsistency: the UI exposes two markers but claims three entries.
- Actions currently present: Log mood and help glyph buttons (`S93MoodTrends.tsx:33-41`), four timeframe tabs (`S93MoodTrends.tsx:47-60`), Discuss patterns, two recent rows, Add note (`S93MoodTrends.tsx:103-120`), and shared consent controls (`S93MoodTrends.tsx:122-128`). No local state, event handlers, links, or query fixture selection exist in the component.
- The shared safety card now links to `/screens/25?support=crisis`, has a labelled ≥56px anchor, and honestly says the prototype does not call/text (`balencia-screens/src/components/hifi/kit/system.tsx:4-29`). Thus the audit's “text-only/no entry” statement is **stale**, but the spec's one-tap call/text/local-help and offline reachability contract remains **unmet** (`COMPONENT-CATALOG.md:116`; mood spec `:74-77,91`).
- The 90D/1Y controls are ad-hoc disabled tabs and never render canonical `PaywallLock` (`S93MoodTrends.tsx:47-60` versus `COMPONENT-CATALOG.md:112,138`): **live**. The tab wrapper is 44px high but has 4px padding, making visible button height 36px; at 125% text, the four equal columns also risk lock-label crowding: **live verification risk**, not proof of clipping.
- Alternative skeleton/empty/partial/error/offline/success/disabled states exist only in spec prose and the source comment (`S93MoodTrends.tsx:17-22`; mood spec `:79-92`): the audit state-coverage claim is **live**.
- Consent copy exposes revoke/export generally (`S93MoodTrends.tsx:122-128`) but does not separately expose mood, journal, voice notes, health context, journal-tone analysis, Cia inference, opt-in/out, delete, scope, freshness, or retention required by the spec (`mood spec:74-77`): **live**.
- Strong current qualities are **live and preserve-worthy**: safety precedes analytics (`S93MoodTrends.tsx:77-79`), the chart has a descriptive AT label and non-color legend (`S93MoodTrends.tsx:85-100`), and the insight states it is not a diagnosis (`S93MoodTrends.tsx:103-105`).

### Proposed deterministic fixture/state contract

Use one explicit local fixture selector (query name to be frozen by Sol) and keep states mutually exclusive:

| Fixture | Required visible truth | Actions/assertions | PNG |
|---|---|---|---|
| `default` | 7D, 6/10 steady, 4 check-ins, one source payload drives the exact journal-marker/evidence count | help, log, 30D, recent row, add note have inspectable outcomes; no locked content overlays safety | `93-default.png` |
| `crisis` | localized call, text, and local-help choices; prototype limitation explicit; no gamification | keyboard/open/close; crisis choices remain available without entitlement | `93-crisis.png` |
| `offline-crisis` | offline label plus cached/local emergency guidance; analytics may be stale but safety is not removed | help entry and local guidance remain reachable with network capability denied | `93-offline-crisis.png` |
| `log-sheet` | mood scale, optional note, skip/support copy | select 7, save, cancel/skip, focus containment/return | `93-log-sheet.png` |
| `success` | saved mood updates hero, chart, recent history, evidence count from one payload | live region/status and no celebration on safety content | `93-success.png` |
| `empty` | honest-null and Log mood CTA; safety remains above analytics; no Cia pattern claim | CTA opens log sheet | `93-empty.png` |
| `partial` | one/two real dots, no connecting line or inferred pattern | AT summary says insufficient trend data | `93-partial.png` |
| `error-cached` | failed source named, cached window/freshness visible | retry outcome; safety remains | `93-error-cached.png` |
| `consent-revoked` | journal/wearable/Cia overlays dim with reason; mood self-log and safety remain | data/evidence sheet exposes opt-in/out, scope, freshness, retention, export/revoke/delete | `93-consent-revoked.png` |
| `paywall-90d` | canonical inline `PaywallLock`, generic preview, value copy, exit and unlock | opening 90D never obscures help/safety and has no dead end | `93-paywall-90d.png` |
| `scrub` | date/value/source/confidence pill for a real point | keyboard-equivalent point selection and focus result | `93-scrub.png` |
| `reduced-motion` | complete final chart immediately | no chart draw/pulse animation | `93-reduced-motion.png` |
| `enlarged` | 125% text proof | no horizontal truncation/overlap; every perceived control ≥44×44 | `93-enlarged.png` |

Hard verifier assertions should additionally enforce: crisis route/action exists in every S93 fixture; no paywall contains crisis content; projected series is dashed and labelled; fewer than three check-ins produces no line/pattern claim; marker count equals the single evidence payload; visible copy uses `Cia`; each changed-state PNG differs from default; isolated nonce/storage/cookies and zero console/page/capability events.

## Screen 96 — Health connections

### Exact current fixture and behavior

- The sole rendered fixture is connected WHOOP default: Balencia readiness 84, “recovery is high,” and “House score, provider-neutral, via WHOOP + app” (`S96HealthDataView.tsx:47-61`). No formula, source count, freshness timestamp, or confidence is visible.
- Vitals are fixed at HRV 42 ms / WHOOP, Strain 14.2 / WHOOP, RHR 52 bpm / Health, and Sleep 7h12m / wearable (`S96HealthDataView.tsx:25-30,63-75`). Each omits timestamp/confidence, contrary to the active spec (`health spec:68-74`).
- Device-native WHOOP recovery 78 is correctly separated from the house composite (`S96HealthDataView.tsx:76-78`; health spec `:68-71`): the audit's preserve-worthy classification is **live**.
- Talk to Cia is a plain button with no visible health-context consent gate (`S96HealthDataView.tsx:58-60`), while the spec requires consent before sending health context (`health spec:76-80`): **live**.
- The Cia claim cites HRV/Sleep/Strain but does not show timestamps/confidence; the trend is seven fixed real values with generic WHOOP+app provenance (`S96HealthDataView.tsx:81-106`): health claim provenance remains **incomplete/live**.
- Source controls are visible: WHOOP primary, synced 2h ago, revoke, delete; Apple Health bridge limitation/setup; export and retention (`S96HealthDataView.tsx:109-145`). This retires any claim that these controls are wholly absent, but no handlers, conflict selector, confirmation, success, or disabled state exists: **partly stale / materially live**.
- Informational/not-diagnostic and urgent-care boundary is present (`S96HealthDataView.tsx:147-151`): **audit preserve-worthy claim live**.
- `PrimaryDeviceToggle`, `SyncFailureBanner`, skeleton, partial, stale/offline, error, and disabled variants exist only in spec/comment (`S96HealthDataView.tsx:18-23`; health spec `:63-67,82-96`): **live gap**.
- `HIFI-96-01` is registered but no provider-neutral icon row is rendered (`_IMAGE-SLOTS.md:13`; S96 component imports/whole composition `:1-16,34-156`): **live gap**. Because the registry says no image generation blocks completion (`_IMAGE-SLOTS.md:1-3`), disposition choices are: code-native/provider-neutral icons satisfying the semantic slot, or an explicit Sol waiver; no logo/provider bitmap should be introduced.
- Integration language must remain prototype/dependency honest: live sync is queued and blocked on OAuth (`NS-009:20-33,41-63`). Current “Synced 2h ago” is acceptable only as clearly local demo data, not evidence of a working provider connection.

### Proposed formula and fixture truth

Freeze one inspectable local demo payload. Suggested explicit display contract (Sol/health owner must approve; worker does not decide medical/product formula): `Balencia readiness 84 = weighted composite of 3 current signals (HRV 40%, sleep 35%, strain 25%); updated Jul 7, 8:20 AM; demo data; confidence high`. Keep `WHOOP recovery 78` separately labelled device-native. Every metric row/card must expose value, unit, provider/source, captured/last-sync timestamp, and confidence. If any input is missing/stale, do not silently reweight: show partial/low-confidence or honest-null according to the frozen rule.

| Fixture | Required visible truth | Actions/assertions | PNG |
|---|---|---|---|
| `default` | readiness formula, 3-source/signal count, timestamp, confidence; device-native 78 separate; demo/dependency label | tabs and metric detail produce visible/focused outcomes | `96-default.png` |
| `formula-detail` | weights, input values, time window, freshness, confidence method, informational boundary | open/close/focus return | `96-formula-detail.png` |
| `metric-detail-hrv` | 42 ms, WHOOP, captured/synced timestamp, confidence | chart scrub/detail keyboard equivalent | `96-metric-detail-hrv.png` |
| `cia-consent` | exact health fields, purpose, recipient, retention, revoke/delete/export paths; equal accept/decline | decline sends nothing; accept opens Cia outcome; revoke reachable | `96-cia-consent.png` |
| `empty` | connect-first honest-null; no readiness number, vitals, trend, or Cia claim | connection preview names OAuth scope/frequency/storage/retention/conflicts/revoke/delete/export | `96-empty.png` |
| `partial` | missing metrics are `Not available`, never zero; composite low-confidence or withheld per frozen rule | no unsupported Cia claim | `96-partial.png` |
| `stale-offline` | cached values, provider, exact last sync/freshness, offline banner | export/local controls truthfully dispositioned; no fake successful sync | `96-stale-offline.png` |
| `sync-error-whoop` | `SyncFailureBanner` names WHOOP and failure type; stale cached data separated | retry yields bounded visible outcome | `96-sync-error-whoop.png` |
| `bridge-limitation` | Apple/Samsung says native app bridge required; no web-sync promise | setup explains non-web dependency | `96-bridge-limitation.png` |
| `primary-conflict` | mutually exclusive primary-device selector and consequence explanation | switch/cancel; source-native history retained | `96-primary-conflict.png` |
| `revoke-confirm` | scope and consequence before revoke | cancel/confirm/focus containment | `96-revoke-confirm.png` |
| `revoke-success` | provider revoked with timestamp; new metrics no longer claimed | green status is not color-only; reconnect optional | `96-revoke-success.png` |
| `delete-confirm` | exact synced records, retention/backups, irreversible consequence | cancel/confirm | `96-delete-confirm.png` |
| `delete-success` | deletion status and timestamp; no deleted values remain | export/revoke states update consistently | `96-delete-success.png` |
| `premium-lock` | generic preview until both consent and entitlement; canonical `PaywallLock` | exit + unlock, no sensitive numbers behind blur | `96-premium-lock.png` |
| `disabled` | blocked sync/trend/Cia/revoke/delete each names reason | controls are actually disabled and explained | `96-disabled.png` |
| `skeleton` | ring/cards hold shape with no invented values | no source/confidence claims | `96-skeleton.png` |
| `reduced-motion` | final ring/chart immediately, no breathing/stagger | motion media query proof | `96-reduced-motion.png` |
| `enlarged` | 125% text proof through source controls and safety note | no overlap/truncation; all controls ≥44×44 | `96-enlarged.png` |

Hard verifier assertions should additionally enforce: composite formula arithmetic and displayed score agree; source count equals rendered eligible inputs; every numeric metric has unit/source/time/confidence; source-native 78 is never included/labeled as Balencia 84; Cia claim requires ≥2 current consented signals; no health data crosses the consent action on decline; empty/skeleton/partial/stale/error/default are mutually exclusive; provider/API capability guards observe no external calls; current NS-009 dependency label is visible wherever sync is depicted; revoke/delete success changes the underlying displayed data; generic premium preview contains no real health value; `HIFI-96-01` is shipped code-natively/asset-backed or explicitly waived; isolated contexts and pass-atomic PNG promotion.

## 390×844 / 125% risks and shared dependencies

- S93: four equal timeframe columns plus locks (`S93MoodTrends.tsx:47-60`), the chart legend (`:93-100`), long Cia action (`:103-105`), and consent copy/rail (`:122-128`) are the principal enlarged-text collision/wrap points. The 36px inner tab targets violate the catalog's 44px floor even though the outer tablist is 44px (`COMPACT-CANON.md:87`).
- S96: 92px hero ring beside long readiness copy (`S96HealthDataView.tsx:47-57`), two-column vitals (`:63-75`), three equal tabs (`:85-98`), and WHOOP revoke/delete actions in one row (`:109-125`) are the principal narrow/enlarged collision points. Long compliance content is scroll-safe only if the shell's existing vertical scroll remains intact; below-fold at 844 is not itself clipping (`E1 audit:21`).
- Shared dependencies requiring Sol serialization if changed: `SafetyCard` (`kit/system.tsx:4-29`), canonical `ProgressRing` (`kit/data.tsx:195-233`), `TrendChart`, `ConsentCard`, `SafetyResourceCard`, `OfflineBanner/SyncStatus`, and `PaywallLock` contracts (`COMPONENT-CATALOG.md:62-66,112-124`), plus `PaywallLock` implementation (`balencia-screens/src/components/hifi/kit/paywall.tsx:7-44`). Product-local composition should be preferred unless the shared contract is demonstrably insufficient; any shared edit requires the full accepted-sentinel rerun.

## Deduplicated accepted-family sentinel map through D2

The inherited manifest contains 39 unique pilot/A1/A2/B1/C1 paths and hashes (`plans/batches/VISUAL-008-D1-profile-settings-core/evidence/ACCEPTED-SENTINELS-BEFORE.sha256:1-43`). The D1 extension contains eight different profile paths (`plans/batches/VISUAL-009-D2-profile-commercial/evidence/ACCEPTED-D1-SENTINELS-BEFORE.sha256:1-11`). D2's hardened verifier parses both manifests, rejects conflicting duplicate hashes, and asserts exactly 47 unique inherited files (`balencia-screens/scripts/verify-d2-profile-commercial.mjs:142-168`); the accepted log confirms 47/47 unchanged and exact S12/S43 (`VERIFICATION-LOG.md:11-25`).

For the E1 pre-edit sentinel, add the six newly accepted mutable D2 product files below. S43 is already present in the 39-row manifest and must **not** be added twice. Therefore the deduplicated through-D2 set is **53 unique product source files = 39 inherited + 8 D1 + 6 new D2**.

| Family | Path(s) | Current accepted SHA-256 inventory |
|---|---|---|
| pilot/A1/A2/B1/C1 | exact 39 manifest rows | hashes at `ACCEPTED-SENTINELS-BEFORE.sha256:5-43` |
| D1 | exact 8 extension rows | hashes at `ACCEPTED-D1-SENTINELS-BEFORE.sha256:4-11` |
| D2 | `.../profile/S19RpgCharacter.tsx` | `4f910e3b30f8327d11024aceee838e538d4257e76923d12059b8206bb30f005e` |
| D2 | `.../profile/S42CelebrationOverlay.tsx` | `96e58f939e7713132835e314621a26f2feffb1e112032ad9a0b45c952c9ab476` |
| inherited overlap | `.../profile/S43Paywall.tsx` | `134d064bfef7d1d9a4b77f6ac4558a8c80beaa14fe42167501396797dd6e39c3` — already at inherited manifest `:42`, and D2 custody/acceptance is recorded at `VERIFICATION-LOG.md:18-25` |
| D2 | `.../profile/S68UniversalSearch.tsx` | `4382558e74cbf2da14d719cdaf3a0366c3a17e697e802eaa2190fd1f1c6c6e2d` |
| D2 | `.../profile/S71AchievementGallery.tsx` | `99ab180a2ff28297e95431f9aa68ff13e7fec66465ac6a88005bf95e844cf43f` |
| D2 | `.../profile/S83BuddyProfile.tsx` | `d7d8355e85b5980ff2d9c4c0355df1a4c5921cec12ae70010491c6877622e6a0` |
| D2 | `.../profile/S92Reputation.tsx` | `5396d02a196c1a69d1fa3cb48bbda9edf591d3ec8f261a66af792ee61edddf0a` |

The D2 files and custody split are authoritatively named at `plans/batches/VISUAL-009-D2-profile-commercial/VERIFICATION-MATRIX.md:80-95`; final acceptance is at `VERIFICATION-LOG.md:3-25`. Sol should capture these six hashes into a new immutable E1 manifest before any E1/shared edit, validate all 53 paths exist, reject conflicting duplicates, retain literal S12/S43 anchors from verifier lines `151-168`, and compare start/end fingerprints.

## Stop/escalation items

1. Direct offline crisis call/text behavior needs a product/safety decision compatible with this visual-only prototype; the current Help Center link is real but explicitly does not call/text (`kit/system.tsx:4-29`).
2. The readiness formula above is a proposed inspectable fixture contract, not health authority. Sol must freeze or replace it before implementation; no diagnostic or causal inference may be introduced (`health spec:68-80`).
3. Provider integration must remain dependency-labelled because NS-009 and its OAuth prerequisite are incomplete (`NS-009:20-33,41-63`).
4. `HIFI-96-01` requires a ship/code-native/waive disposition before the verification matrix is frozen (`_IMAGE-SLOTS.md:3-13`; E1 audit `:34,43`).
5. Any shared-kit modification must be serialized by Sol and checked against the deduplicated 53-file sentinel set; this worker makes no shared-boundary or acceptance decision.
