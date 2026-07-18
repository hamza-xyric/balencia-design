# VISUAL-009 D2 verification log

- Closed: 2026-07-16
- Result: **PASS — Sol accepted with evidence-only waivers**
- Production build: `BkBidMSJRPC2-G9ymoOyL`, served by fresh `next start -p 3002`
- Product digest: `dc366e3ceea9d970bf9d9008cbc06367aac61458cfc5e43f276ac107147d9696`
- API/verifier digest: `6141a3a67cfa4c60437a696da589bc439229437791cfd1628de92397d056dc8a`
- Authority digest at runtime: `67241362f43f0c77d4fe385e5625a57ee5915064073010d632fee4999b6fb4fa`
- Accepted-family digest: `8246f1b05399366c41e37a499c64fbaba5b8510b4037be8b48f5c54beab33541`

## Deterministic gates

- `npm run build`: PASS.
- `node scripts/verify-d2-profile-commercial.mjs http://localhost:3002 .../d2-verifier-final.json .../after-final`: PASS; `80/80` isolated contexts/nonces, `106` checks, exactly `73/73` pass-atomically promoted 390×844 PNGs, seven 125% text proofs, zero console/page/capability events, empty storage/cookies, and unchanged start/end integrity.
- `node scripts/verify-visual-104.mjs --strict --only 19,42,43,68,71,83,92 --base http://localhost:3002 ...`: PASS `7/7`, zero issues/warnings/missing frames/console errors.
- `npm run check`: PASS; the existing unrelated `DomainDashboardHeader.figma.tsx` unused-import warning remains non-blocking.
- `node Balencia-New-Screens/work/validate-redesign.mjs --json`: PASS `104/104`.
- accepted-family manifest: all eight D1 rows PASS; the hardened verifier independently validates exactly `47/47` accepted pilot/A1/A2/B1/C1/D1 files. S12 and S43 remain exact.
- root and read-only submodule `git diff --check`: PASS.

## Independent and visual review

- Final-v2 CLEAR, design/source, and accessibility/trust reviews: each ACCEPT at `0 Critical / 0 High / 0 Medium` in `review-{clear,design-source,a11y-trust}.md` after the recorded repair cycles.
- Sol inspected the final default PNGs for S19, S42, S68, S71, S83, and S92 at native pixels and accepted the family. S43 was verifier-only and remained byte-locked at `134d064bfef7d1d9a4b77f6ac4558a8c80beaa14fe42167501396797dd6e39c3`.
- No raster was added. S42 is code-native; S83 retains the consent-safe `AK` initials fallback.

## Waivers carried

`W-MODEL`, `W-AT` / `AXE-01`, `W-SHA` / `RW-VF-06`, `W-PROGRESS`, `W-TRUNC-40`, and `W-TRUNC-80` remain evidence/release waivers. No Critical, High, or Medium D2 product or evidence defect is waived.
