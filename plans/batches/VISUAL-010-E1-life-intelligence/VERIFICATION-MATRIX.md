# VISUAL-010 E1 frozen verification matrix

- Frozen: 2026-07-16 before E1 product edits
- Scope: exactly `16,20,48,72,84,90,93,96`
- Required output: **73 PNGs + 8 screenshot-free 125% proofs = 81 isolated contexts/nonces**
- Every state is query-addressable, mutually exclusive, storage/cookie clean, deterministic, and visual-only.

## Authority adjudications

- S16 uses the canonical ten-domain registry. Old nine-domain/8-of-9 spec prose is stale. Life Power is locally computed as `round(weighted_average + (min/max)*10)` and must not use the CP `sum * balance_multiplier` helper or modify accepted D2 shared radar bytes.
- Personal correlations are non-causal and require sources, sample/window, freshness, and confidence; honest-null suppresses definitive claims.
- S93 crisis actions are local prototype previews: Call/Text/Local help are reachable offline and outside paywalls, but no device/external action fires.
- S96 freezes illustrative demo inputs `HRV readiness 86`, `sleep readiness 82`, `strain readiness 84`; `0.40*86 + 0.35*82 + 0.25*84 = 84.1`, displayed as Balencia readiness `84`. WHOOP recovery `78` remains separate and never enters the house score. Provider sync is labelled demo/dependency-only.
- `HIFI-90-01` is fulfilled by consent-gated code-native neutral silhouette placeholders/honest-null; no body bitmap. `HIFI-96-01` is fulfilled by code-native provider-neutral wearable/ring/phone/cloud icons; no provider logo or raster.

## Exact PNG cases

| Screen | Required PNG names |
|---|---|
| 16 | `16-default`, `16-low-confidence`, `16-empty`, `16-error`, `16-offline`, `16-compare-week`, `16-domain-detail`, `16-data-controls` |
| 20 | `20-default`, `20-search`, `20-node-detail`, `20-edit`, `20-delete-confirm`, `20-success`, `20-error`, `20-offline`, `20-upload`, `20-citation-medical` |
| 48 | `48-default`, `48-low-confidence`, `48-empty`, `48-error`, `48-offline`, `48-contradiction`, `48-legend`, `48-timeframe` |
| 72 | `72-default`, `72-node-detail`, `72-legend`, `72-document`, `72-citation-medical`, `72-empty`, `72-error`, `72-offline` |
| 84 | `84-default`, `84-sync-failure`, `84-reconnect`, `84-consent`, `84-empty`, `84-offline`, `84-revoke`, `84-delete` |
| 90 | `90-default`, `90-monthly`, `90-yearly-lock`, `90-photo-consent`, `90-photo-detail`, `90-empty`, `90-offline`, `90-history-detail` |
| 93 | `93-default`, `93-crisis`, `93-offline-crisis`, `93-log-sheet`, `93-success`, `93-empty`, `93-error-cached`, `93-paywall-90d` |
| 96 | `96-default`, `96-formula-detail`, `96-metric-detail`, `96-cia-consent`, `96-empty`, `96-partial`, `96-stale-offline`, `96-sync-error`, `96-bridge`, `96-primary-conflict`, `96-revoke-confirm`, `96-delete-confirm`, `96-premium-lock`, `96-disabled`, `96-skeleton` |

Each screen also receives one 125% text-scale context with no promoted PNG. S42/D1 precedent governs actual reflow proof; CSS transform-only scaling is forbidden.

## Hard assertions

- **16:** ten exact domains/order; one payload drives rows/radar/AT; Life Power formula/display agree; 10/10 reporting; no CP label confusion; comparison pressed state; domain/control dialogs and focus restoration; real/low/null/error/offline exclusivity.
- **20:** native search with clear/results; chapter selection; graph/detail AT; edit/flag/delete confirmation and success/error; upload→processing/citation/medical-boundary preview; both-source/sample/window/freshness/confidence and non-causal wording; no claim in honest-null.
- **48:** gauge fully contained at 390 and 125%; 87 fixture exposes formula/source count/freshness/confidence; named 5×5 matrix axes/cells plus non-color legend; native Manage/Resolve/Dismiss/timeframe actions; real/low/null/error/offline exclusivity.
- **72:** visible selectable nodes have ≥44px targets and equivalent linear native controls; zoom/reset/legend/sheet focus; document/citation/medical preview; edges expose type/window/sample/freshness/confidence and non-causal wording; empty/error/offline honest.
- **84:** connected/live/healthy/failed counts reconcile rendered rows; one explicit check cadence; WHOOP+Spotify co-variation is non-causal with both sources/window/sample/freshness/confidence; recovery action is not purple; source controls/consent/reconnect/revoke/delete have visible outcomes; dependency/demo honesty.
- **90:** all segmented targets ≥44px; canonical PaywallLock; photo/history rows operable; consent-gated code-native silhouette or honest-null; privacy sheet names local/cloud, backup, retention, export/revoke/delete; metric formulas/provenance/confidence; no sensitive image without consent.
- **93:** marker count equals evidence payload; ≥44px tabs; canonical PaywallLock; crisis Call/Text/Local Help local previews remain reachable in every state/offline/outside entitlement; no gamification/diagnosis; mood/journal/inference consent and delete/export/revoke; sparse/null suppresses patterns.
- **96:** composite arithmetic/source count/display agree; every metric has unit/source/time/confidence; WHOOP 78 remains device-native/separate; health-context consent decline sends nothing; provider dependency/demo label; empty/partial/stale/error/default exclusive; source controls and confirmations update visible state; premium preview has no sensitive values; code-native provider-neutral slot disposition.

## Harness invariants

- Fresh `next start -p 3002` build ID/timestamps; product/API/authority/accepted start/end fingerprints stable.
- Exactly 53 accepted-family sentinel files unchanged, with literal S12 and S43 anchors.
- New context + unique nonce per case; empty local/session/IndexedDB/cache/cookies; two RAFs; reduced motion; no external requests or device/browser capabilities.
- Guard fetch/XHR/WebSocket/EventSource/sendBeacon, geolocation, notifications, payment, credentials, clipboard, share, file picker/chooser, media, vibration, navigation outside local review origin.
- Pass-atomic promotion only after all assertions; zero console/page/capability events.

## Acceptance gates

Fresh build/runtime PASS; dedicated E1 verifier PASS exact 81 contexts/73 PNGs; strict 8/8 zero issues/warnings; `npm run check`; root 104/104; 53/53 sentinels; root/submodule diff checks; Sol native-pixel inspection; three independent final reviews at `0 Critical / 0 High / 0 Medium`.
