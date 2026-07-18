# G1 builder A — S30/S31 implementation evidence

Role: Terra bounded writer. This output is implementation evidence only; Sol remains the final verifier and acceptor.

## Owned writes

- `balencia-screens/src/components/hifi/screens/domains/S30FinanceMoneyMap.tsx`
- `balencia-screens/src/components/hifi/screens/domains/S31BudgetDetail.tsx`
- this evidence file

No shared kit, route, registry, verifier, accepted-family, production-app, or other worker-owned file was edited.

## Implemented contracts

### S30 Finance / Money Map

- Added the exact 14-state query allowlist and fail-safe `default-real` fallback with `data-g1-state="30-<fixture>"`.
- Reconciled the complete category payload: Dining `$650`, Transit `$400`, Groceries `$300`, Other `$800`, totaling `$2,150`; income `$5,000`; net `+$2,850`; emergency fund `$6,000 / $10,000` at incomplete 60% orange treatment.
- Added an accessible donut summary, keyboard category selection, matching `aria-pressed` state, four visible category rows, deterministic outcomes, budget and transaction actions, trend scrub, manual add, scan-disabled explanation, posted deletion confirmation, pending/offline restrictions, and local success feedback.
- Replaced provider-readiness implications with bundled-demo, local-only, freshness, confidence, and association-not-causation language. No API, provider, file, camera, storage, or external mutation is invoked.
- Added skeleton, honest-null, low-confidence, cached-error, offline, pending, selected, sheet, success, and data-control representations.
- Added the full nine-control privacy rail via `FULL_DATA_CONTROLS`; destructive preview names `Trader Joe’s · $42.10` and cannot mutate before confirmation.

### S31 Transaction / Budget Detail

- Added the exact 16-state query allowlist and fail-safe `budget-default` fallback with `data-g1-state="31-<fixture>"`.
- Implemented exclusive Budget and Transaction tabs with named tab panels and deterministic local switching.
- Budget mode displays `$480 / $620`, nearest-integer `78%`, the underlying `77.42%` rounding disclosure, 12 days, pace, freshness/source/confidence, and a richer accessible ring label.
- Transaction mode is no longer concatenated with the budget hero. It shows a defensible Trader Joe’s Groceries payload; Spotify and unsupported level copy are removed.
- Repaired copy to `Allocated this month` and replaced the broken sleep sentence with hedged bundled-demo association language.
- Added local outcomes for Edit, Ask CIA, See all, activity rows, edit budget, recategorize, receipt options, add note, and data controls.
- Posted deletion names `Trader Joe’s · $42.10`, requires confirmation, and stays local. Pending/offline states disable edit/delete with a visible reason. Delete-failure preserves the named item.
- Provider language explicitly says there is no Plaid connection; receipt options do not invoke file/camera capability.
- Added full nine-control privacy rail via `FULL_DATA_CONTROLS`.

## Asset and scope disposition

Both screens remain code-native and add no raster, generated, personal, provider, or external assets. All state and interaction behavior uses component-local deterministic React/query state.

## Verification run

From `balencia-screens/`:

```text
npx prettier --write <S30> <S31>                         PASS
npm run typecheck                                        PASS
npx eslint <S30> <S31>                                  PASS
git diff --check -- <S30> <S31>                         PASS
```

The scoped diff contains only the two assigned product files. Production acceptance, hardened verifier coverage, focus-trap behavior supplied by the existing shared modal, screenshot uniqueness, 390×844/125% proofs, and accepted-family sentinels remain Sol-owned downstream gates.
