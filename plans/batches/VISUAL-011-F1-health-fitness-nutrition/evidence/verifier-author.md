# VISUAL-011 F1 — hardened verifier author evidence

Created `balencia-screens/scripts/verify-f1-health.mjs` as the dedicated F1 acceptance harness.

## Frozen enforcement

- Exact matrix: 96 named PNG cases plus one real 125% font-size proof for each of ten screens = 106 isolated contexts/nonces. Counts fail closed on source drift.
- Fresh production only: rejects every port except `3002` and verifies served HTML contains the current `.next/BUILD_ID`.
- Isolation: new reduced-motion browser context per case, empty local/session/IndexedDB/cache/cookies, two RAFs, and unique `__f1audit` nonce.
- Capability guards: external fetch/XHR/WebSocket/EventSource/beacon/navigation, geolocation, media, share, clipboard, credentials, vibration, payment, notification, and file picker are blocked and recorded.
- Layout/accessibility floor: exact 390×844 phone, no horizontal overflow, visible native controls at least 44×44, deterministic accessible names, visible coach copy constrained to all-caps `CIA`, and actual font-size mutation for 125% proofs (no transform scaling).
- State integrity: every query fixture must expose its exact screen-specific marker. Frozen state-specific semantic assertions cover formulas, units, safety, consent, assets, privacy, locks, IA, and allergy precedence.
- Interaction proof: default screens 26–29 exercise local start, pause, hydration increment, and logger-open outcomes before restoring the frozen capture URL.
- Integrity: start/end SHA-256 fingerprints cover all ten F1 product files, API/router/package surfaces including the verifier, and a fail-closed 61-file accepted sentinel manifest.
- Visual determinism: consecutive phone captures must be byte-identical. Screenshots remain in a candidate directory and are promoted atomically only after all assertions and zero console/page/capability events.

## Static verification

- `node --check scripts/verify-f1-health.mjs` — PASS.
- `eslint scripts/verify-f1-health.mjs` — PASS, zero warnings/errors.
- Server/browser execution was explicitly denied by the packet and was not attempted.

## Required runtime input

The harness intentionally expects `plans/batches/VISUAL-011-F1-health-fitness-nutrition/evidence/ACCEPTED-E1-SENTINELS-BEFORE.sha256` with exactly 61 unique verified rows. Sol must freeze that accepted manifest before running the verifier; absence or drift fails closed.
