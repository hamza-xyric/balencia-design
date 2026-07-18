# D1-BUILD-B — Terra implementation evidence

- Assigned files only: `S21Settings.tsx`, `S22ConnectedServices.tsx`
- Runtime intent: Terra builder, high; exact thread attestation covered by `W-MODEL`
- Forbidden/shared files touched: none reported
- Targeted ESLint: PASS, zero output
- Assigned-file `git diff --check`: PASS

## Resulting source hashes

- S21: `f1f394f5e1850b6c8ff2b2c9a134974ce1d4e2ed95224ce4a6c67b3824d4cece`
- S22: `0bc9a4f869ed1c45ef20c352a38c693660154f37bfbfe84d7d919d0da5624bd9`

## Implemented contract

- S21 exposes the exact state/hardware/panel roots, one H1, native labelled checkbox switches for Notifications/Background sync/Face ID, explicit unsupported-hardware truth, local saving/error/offline/success behavior, preference provenance/null states, exact eight local data controls, real D1 routes/local sheets, and the existing honest no-call/no-text SafetyCard.
- S22 uses the frozen 11-provider roster and 6+3+1+1 grouping, per-provider atomic status attributes, WHOOP fresh-connected truth, Fitbit retry-pending truth, Garmin native-disabled reason, exact eight local controls, connect/disconnect overlays with equal exits, 44px focusable actions, reduced-motion-safe static progress, no internal route copy, no paywall, and no global Save.
- Both files use `HifiShell.overlay` with labelled dialog/alertdialog semantics, inert background, initial focus, Tab trap, Escape/focus restoration, and explicit visual-only capability truth.
- Query-settlement effects defer state mutation through `queueMicrotask` to satisfy React hooks lint without losing deterministic fixtures.

Worker output is evidence only. Sol independently diff-inspects and runs the frozen verifier/gates.
