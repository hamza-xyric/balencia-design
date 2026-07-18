# C1 focused review — hardened verifier integrity

## Assignment

- Role intent: Terra-high independent test-verifier reviewer (spawned runtime remains W-MODEL).
- Read only. Do not edit product, verifier, docs, screenshots, servers, or git state.
- Review `balencia-screens/scripts/verify-c1-today.mjs` as currently integrated.

## Required checks

1. Exact 89-PNG pass-atomic manifest/promotion remains intact while 11 assertion-only text contexts correctly bring the run to 100 isolated contexts/nonces.
2. Product/API/authority fingerprints, S12 exact SHA, storage/capability/console guards, fresh-origin navigation, and failure atomicity remain sound.
3. New static contrast, 12px mutable floor/explicit S12 11px exception, actual 125% scaling/clipping, meaningful screenshot-distinctness, identity/view/focus/paywall assertions test the intended contract without obvious selector bugs or false-positive logic.
4. Identify any assertion that can pass while the product is wrong, cannot pass while the product is right, or mutates evidence/state unsafely.

## Output

Send Sol concise PASS/FAIL with Critical/High/Medium findings and exact verifier line evidence. No edits.
