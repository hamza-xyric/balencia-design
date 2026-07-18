# F2 verification log

- Accepted: 2026-07-16 under DVF-19.
- Fresh production build: `7nh9Nk_hp6hS-s36ayB3Y`, served only by `next start -p 3002`.
- Hardened acceptance: PASS `123/123` isolated contexts, `113/113` distinct deterministic PNG proofs, ten actual 125% text proofs, `1341` checks, zero console/page/capability events, empty isolated storage/cookies, and stable product/API/71-file accepted-sentinel fingerprints.
- Strict harness: PASS `10/10`, zero issues, warnings, missing frames, visible SIA, or console-error screens (`f2-strict-final-v2.json`).
- `npm run check`: PASS; one unrelated pre-existing lint warning remains in `DomainDashboardHeader.figma.tsx`.
- `node Balencia-New-Screens/work/validate-redesign.mjs --json`: PASS `104/104`.
- Accepted sentinels: PASS `71/71` (61 inherited plus ten F1 additions).
- Root and `yhealth-app` read-only `git diff --check`: PASS; production submodule was not edited.
- Independent final-v2 CLEAR, design/source, and accessibility/trust reviews: APPROVE at C0/H0/M0/L0.
- Sol native-pixel inspection covered the long-form exercise-detail modal proof; opaque scrim, isolated content, legible safety/source copy, and reachable CTA were confirmed.
- Asset disposition: HIFI-70-01, HIFI-86-01, HIFI-87-01, and HIFI-88-01 are explicit code-native/no-identifiable-person treatments; no raster was added.
- Residual evidence waivers: physical-device VoiceOver/TalkBack and system Dynamic Type, broad Axe, exact worker-model provenance, dirty-worktree immutable SHA, and final serialized one-SHA R11 evidence remain downstream limits. No known Critical, High, Medium, or Low F2 defect is waived.
