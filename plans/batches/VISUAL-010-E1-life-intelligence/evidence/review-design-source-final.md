# E1 final design/source review

- Reviewer: fresh independent non-builder design/source reviewer; worker output is evidence only
- Build ID reviewed: `NZU66Z6x8BUWSEXI1uOF2`
- Inferred audit posture: full dev-handoff audit, WCAG AA
- Scope: screens `16,20,48,72,84,90,93,96`; frozen E1 contract, active hi-fi specs/canon, asset disposition, final source, 73 acceptance captures, eight strict-final captures, and acceptance JSON
- Framework/design system: Next.js + React + Tailwind CSS with the Balencia hi-fi kit
- Runtime evidence observed: dedicated verifier reports 81/81 isolated contexts and 73/73 promoted PNGs; strict-final evidence reports 8/8 screens with zero issues/warnings. These green results do not override the source/action mismatches below.

## Severity counts

| Critical | High | Medium | Low |
|---:|---:|---:|---:|
| 0 | 5 | 3 | 2 |

## High findings

1. **S16 low-confidence Life Power contradicts its disclosed arithmetic.** `balencia-screens/src/components/hifi/screens/intelligence/S16LifeAreas.tsx:52` and `:83` display `46` while the same fixture describes weighted average `43.3` plus balance bonus `5.5`, which rounds to `49` under the frozen formula. This violates the E1 requirement that the Life Power formula and display agree. Derive the display from the fixture payload/formula or provide a payload that resolves to 46.

2. **S16 error is not exclusive from real data.** `S16LifeAreas.tsx:77`, `:83`, `:91`, and `:103` show the load error while retaining the complete ten-domain values and sources in the radar accessible name, `10/10` reporting, populated rows, and actionable real-data detail. The active contract requires real/low/null/error/offline exclusivity. Suppress the unavailable payload and its actions, or explicitly define and label a cached-error state with freshness throughout.

3. **S48 error still presents authoritative intelligence data and actions.** `balencia-screens/src/components/hifi/screens/intelligence/S48Intelligence.tsx:44`, `:48`, and `:54` keep score `87`, formula/provenance, and the actionable WHOOP/log contradiction under an error banner. This conflicts with the frozen exclusivity and honest-null requirements. Suppress data-dependent content for an unavailable error, or label every retained element consistently as cached and stale.

4. **S96 metric details are mapped to the wrong source payload.** Every vital button at `balencia-screens/src/components/hifi/screens/intelligence/S96HealthDataView.tsx:143-151` opens the same dialog, whose title/content at `:198-201` is permanently `HRV evidence / HRV 42 ms`. Selecting Strain, RHR, or Sleep therefore returns the wrong metric, unit, source, timestamp, confidence, and readiness input. Store the selected vital and render its exact evidence payload; verify all four mappings.

5. **The promoted evidence does not substantiate required native-action completeness.** `balencia-screens/scripts/verify-e1-life-intelligence.mjs:159-183` and `:196-230` primarily load query-addressed fixtures and check static text/layout. It does not exercise and verify the frozen native outcomes for S20 edit/delete/upload, S48 Manage/Resolve/Dismiss, S72 zoom/reset, S84 reconnect/revoke/delete, S90 consent/privacy controls, S93 enabled tabs/crisis choices, or S96 each metric and source confirmation. The fact that the acceptance evidence passes despite findings 1–4 and the inert zoom below demonstrates an evidence/provenance gap. Add deterministic click/outcome/focus assertions for each required action, plus formula/exclusivity and per-vital mapping assertions.

## Medium findings

1. **S72 zoom is visually inert.** `balencia-screens/src/components/hifi/screens/intelligence/S72KnowledgeGraph.tsx:50`, `:85`, and `:93` update only React bookkeeping and `data-zoom`; the graph viewport consumes no scale/viewBox/layout value. Apply bounded visible zoom, announce the resulting percentage, and verify zoom-in, zoom-out, and reset outcomes.

2. **S93 timeframe selection is incomplete and visually inconsistent.** `balencia-screens/src/components/hifi/screens/intelligence/S93MoodTrends.tsx:99-103` leaves the enabled 30D tab without an outcome and hard-codes the selected styling to 7D even when the 90D fixture is selected. Model one selected timeframe, derive both styling and `aria-selected` from it, and give every enabled tab a deterministic result.

3. **S16/S20/S48 focus restoration is not bound to the actual opener.** `S16LifeAreas.tsx:47`, `:64-71`, `:103`; `S20CiaMemory.tsx:17`, `:32-37`, `:52`, `:69`; and `S48Intelligence.tsx:21`, `:38-40`, `:54-58` reuse one ref across multiple triggers, so the last mounted assignment can receive focus instead of the activating control. Capture `event.currentTarget` per open action and restore focus only when that node remains connected.

## Low findings

1. The S72 default graph uses many saturated domain colors simultaneously. The colors are token-backed and labels/linear controls prevent a semantic failure, but the visual focal field is noisier than the 60/30/10 system. A later polish pass could reduce non-selected node saturation while preserving domain identity and orange/purple edge semantics.
2. Several screens compress state transitions and major JSX regions into single lines (`S48Intelligence.tsx:54-58`, `S84DataSources.tsx:39-55`, `S96HealthDataView.tsx:180-206`), which makes source/state review materially harder. Extract named panels and rows after acceptance-blocking behavior is fixed.

## Source, terminology, and asset checks that pass

- Visible terminology consistently uses **CIA**, **Missions**, **Life Power**, and **Domain Stats**; no new visible `Cia`, `SIA`, CP-label substitution, or retired Goals terminology was observed in the reviewed surfaces.
- S20/S48/S72/S84 correlations use non-causal wording and expose source/sample/window/freshness/confidence where the frozen contract requires it.
- S93 keeps crisis resources above the chart, outside the paywall, available offline, non-diagnostic, and represented as local-only preview actions.
- S96 keeps Balencia readiness `84` separate from device-native WHOOP recovery `78`, labels demo/provider dependencies honestly, and does not approximate provider logos.
- `HIFI-90-01` is fulfilled with consent-gated, neutral code-native silhouettes; `HIFI-96-01` is fulfilled with provider-neutral code-native glyphs. No external raster is needed, and both dispositions remain traceable to the registry rows.
- The strict-final compositions have coherent focal hierarchy, consistent warm-dark surfaces, selective orange/green/purple semantics, legible mobile density, and no obvious clipping in the eight native 390×844 defaults.

## Scores

- Design/source readiness score: `100 − (5 × 8) − (3 × 4) − (2 × 1) = 46/100`.
- Accessibility note: automated layout/target evidence is green, but focus restoration remains a Medium handoff defect; accessibility is therefore not acceptance-ready.
- Ethics/trust: no deceptive pattern observed. Consent, decline, revoke, delete, offline, health-boundary, and local-preview language are generally strong.

## Verdict

**REQUEST CHANGES — not ready for Sol acceptance.** The rendered defaults are visually strong and the terminology/assets align with current authority, but the five High and three Medium findings leave formula truth, state exclusivity, health-evidence mapping, native-action behavior, focus continuity, and evidence completeness below the required `0 Critical / 0 High / 0 Medium` gate.
