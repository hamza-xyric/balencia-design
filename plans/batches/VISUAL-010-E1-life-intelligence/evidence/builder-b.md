# VISUAL-010 E1 — Terra builder B evidence

- Scope: screens `72`, `84`, `90` only.
- Allowed product files rewritten in place; no shared kit, globals, registry, verifier, other product file, browser/server, external service, or `yhealth-app` action.
- Implementation remains a bundled, deterministic, visual-only prototype. Every perceived external action reports a visible local-only outcome.

## Behavior and state map

### S72 Knowledge graph

- Query surface: `?state=default|empty|error|offline` and `?panel=node-detail|legend|document|citation-medical`, with optional `?node=sleep|workout|zen|productivity|deep-sleep|hrv|strain|calories`.
- Frozen PNG mapping:
  - `72-default` → default.
  - `72-node-detail` → `panel=node-detail&node=workout`.
  - `72-legend` → `panel=legend`.
  - `72-document` → `panel=document`.
  - `72-citation-medical` → `panel=citation-medical`.
  - `72-empty|error|offline` → same-named `state`.
- Eight visible ≥44px node buttons and an equivalent linear eight-button representation share the same payload, names, counts, source labels, selection state, and detail action.
- Zoom in/out/reset, legend, node selection, sheet close/focus, document evidence, citations, medical boundary, document→wiki preview, history delete, and offline-disabled Ask Cia all have native controls and local-only outcomes.
- Edge/detail fixture distinguishes confirmed orange from estimated purple; every detail exposes 30-day window, 47 paired days, freshness, confidence, all sources, and explicit co-variation/not-causation language. Empty/error suppress values.

### S84 Data sources

- Query surface: `?state=default|sync-failure|reconnect|consent|empty|offline|revoke|delete`.
- Frozen PNG mapping is one-to-one with the eight state names.
- Rendered counts are explicit and reconciled: default/sync-failure `connected=2, live=1, healthy=1, failed=1`; reconnect `2,2,2,0`; offline `2,0,1,1`; revoke `1,0,0,1`; empty/delete `0,0,0,0`.
- Exactly one cadence is claimed: daily source-health check. Provider capability is labelled bundled dependency demo only.
- Sleep↔Music is rewritten as non-causal co-variation and cites WHOOP + Spotify, 14 paired days, 30-day window, per-source freshness, medium confidence, and stale Spotify disclosure. Calendar↔Wellbeing likewise includes both sources/sample/window/freshness/confidence.
- Spotify recovery action is orange/action semantic, ≥44px, named, and produces visible reconnect success without OAuth/network. WHOOP consent shows all nine `FULL_DATA_CONTROLS`; revoke/delete confirmations produce visible count/state outcomes.

### S90 Progress measurements

- Query surface: `?state=default|monthly|yearly-lock|photo-consent|photo-detail|empty|offline|history-detail`.
- Frozen PNG mapping is one-to-one with the eight state names.
- Both timeframe and metric segmented controls use native tabs with `min-h-11` on each target. Monthly changes the chart payload and labels. Yearly renders canonical shared `PaywallLock` with blurred non-sensitive preview and orange unlock CTA.
- Photo summary and history are native operable rows. Dialogs restore focus to their invoking control. History detail exposes date/source/freshness/confidence.
- `HIFI-90-01` is dispositioned in code as a consent-gated pair of neutral, non-identifiable CSS silhouettes. `data-asset-disposition="HIFI-90-01-code-native-no-raster"`; no bitmap, face, device file, or image access exists. Before consent the dialog renders honest-null copy only.
- Photo privacy names local/cloud scope, backups, 30-day post-revoke retention, export, revoke, delete, training, human review, and default-sharing state. All actions are reversible local previews.
- BMI publishes exact `176.4 lb ÷ 70in² × 703`, sources/date/confidence; waist publishes manual source/date/confidence. Cia claim publishes both sources, 42 paired nights, six-week window, freshness, medium confidence, and non-causal/medical boundary.
- Responsive changes replace the brittle unconditional two-column measurement layout with one-column below 360px, allow flex wrapping, and preserve scroll-based access at 390×844/125%.

## Verification

Targeted ESLint command:

```text
npx eslint src/components/hifi/screens/intelligence/S72KnowledgeGraph.tsx src/components/hifi/screens/intelligence/S84DataSources.tsx src/components/hifi/screens/intelligence/S90ProgressMeasurements.tsx
```

Result: **PASS — zero errors, zero warnings**.

Supplemental `npx tsc --noEmit`: the three assigned files produced no reported diagnostics, but the project command exited `2` on two concurrent/out-of-scope `ref` typing errors in `S20CiaMemory.tsx` at `(40,213)` and `(61,410)`. Builder B did not edit that file; Sol/builder A owns reconciliation.

## SHA-256

```text
376ba6f311a958f620123870338d635fc27c393f5465bee8da91062ada4bfb9d  balencia-screens/src/components/hifi/screens/intelligence/S72KnowledgeGraph.tsx
7294905449b8f4aadfb3bc73619a06a05bbd58823de8902994f84d8fe9feeeb9  balencia-screens/src/components/hifi/screens/intelligence/S84DataSources.tsx
3a1552de129e1fd3b4cd11dfdc20285727bbff45eecf2309454557e90f097568  balencia-screens/src/components/hifi/screens/intelligence/S90ProgressMeasurements.tsx
```

These hashes were captured after the clean targeted ESLint run.
