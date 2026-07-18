# G1 verification log

- Accepted: 2026-07-16 under DVF-20.
- Fresh production build: `wFfEvX-H_FYiSIyxbwKIT`, served only by `next start -p 3002`.
- Hardened acceptance: PASS `123/123` isolated contexts, `114/114` distinct deterministic PNG proofs, nine actual 125% text proofs, `1494` checks, zero console/page/capability/external-request events, empty isolated storage/cookies, and stable product/API/81-file accepted-sentinel fingerprints (`g1-acceptance-final-v7.json`).
- One preceding run (`g1-acceptance-final-v6.json`) stopped on a first Playwright screenshot-stability timeout after 36 clean contexts. The single allowed retry passed all 123 contexts; no equivalent second strike occurred.
- Strict harness: PASS `9/9`, zero issues, warnings, missing frames, visible SIA, or console-error screens (`g1-strict-final-v5.json`).
- `npm run check`: PASS with zero warnings or errors.
- `node Balencia-New-Screens/work/validate-redesign.mjs --json`: PASS `104/104`.
- Accepted sentinels: PASS `81/81` (71 inherited plus ten F2 additions); all hashes match.
- Root and `yhealth-app` read-only `git diff --check`: PASS; production submodule was not edited.
- Independent final-v4 CLEAR, design/source, and accessibility/financial/privacy-trust reviews: APPROVE at C0/H0/M0/L0.
- Review repair history: S31 `$480 / $620` was corrected from false nearest-integer `78%` to `77%`; ring and bar geometry now also encode 77, the ring uses concise visible copy, and the verifier independently asserts text, computed ring percentage, and rendered bar width.
- Sol native-pixel inspection covered finance, journal data controls, habit creation, and the corrected S31 budget proof; layouts, modal isolation, focus presentation, and lower-view reachability were confirmed.
- Asset disposition: all nine G1 screens are code-native; no raster, provider logo, personal photo, or generated asset was added.
- Residual evidence waivers: physical-device VoiceOver/TalkBack and system Dynamic Type, broad Axe, exact worker-model provenance, dirty-worktree immutable SHA, and final serialized one-SHA R11 evidence remain downstream limits. No known Critical, High, Medium, or Low G1 defect is waived.
