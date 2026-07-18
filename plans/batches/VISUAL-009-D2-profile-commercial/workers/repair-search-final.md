# VISUAL-009 D2 — Terra repair packet: search truth

- Packet status: completed; Sol verification pending.
- Packet ID: D2-REPAIR-SEARCH-FINAL.
- Role intent: Terra implementation, high effort; output remains evidence until Sol verifies it.
- Stop condition: source drift from the hash below, shared-kit/S43 edit, scope crossing, or two equivalent failures.

## Exact candidate

```text
26c7f7ccfa777ca647ec7a248e4f4d5f347b5c3e59f852476c346940ff00ac4e  S68UniversalSearch.tsx
```

The reissued hash incorporates the separately reviewed degraded-state preservation repair; retain that behavior while completing the remaining CIA-anatomy and heading work.

## Allowed edit

- `balencia-screens/src/components/hifi/screens/profile/S68UniversalSearch.tsx`

## Required outcomes

- Preserve `offline` and `error` truth across typing, stored-query activation, category changes, and clearing. Only the explicit local Retry control may leave those modes. Keep fallback rows local-only and exclude Recipes.
- Replace the hand-built CIA focal block with canonical `CIAInsightCard` anatomy: 12px screen-local eyebrow override, one restrained Tiempos/italic emphasis, domain/provenance evidence, and equivalent local open/dismiss actions.
- Remove duplicate screen-reader headings: each section must have one visible `SectionTitle` heading used by `aria-labelledby`.
- Preserve frozen roots, debounce timing outside degraded modes, result counts, routes, and local-only outcomes.

## Required sources

- `Balencia-New-Screens/hifi-screens/68-universal-search.md`
- `Balencia-New-Screens/canon/{COMPACT-CANON,COMPONENT-CATALOG}.md`
- D2 `BATCH.md` and `VERIFICATION-MATRIX.md`

## Verification and response

- Run targeted ESLint on the allowed file. Do not run/restart a server.
- Return exact changed-file hash, verification result, and concise implementation evidence. Do not edit ledgers/evidence/verifier.

Worker result is recorded in `evidence/repair-search-final.md`.
