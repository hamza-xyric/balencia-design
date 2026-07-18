# VISUAL-003 verification matrix

Tie-breaker: latest user instruction, then `VISUAL-001/REFERENCE-DIRECTION.md` and `DECISIONS.md`, then live pilot code/current hifi specs/current canon.

| Change type | Deterministic gates | Manual lens | Evidence | Stop condition |
|---|---|---|---|---|
| Docs/readiness | source-link resolution; batch/packet field check; `git diff --check` | Fresh agent can continue without chat | batch and packets | unresolved authority, scope, or verify path |
| Shared UI kit | lint, typecheck, brand/copy/assets/routes via `npm run check` | API compatibility; no unintended consumer regression | command log + sentinel routes | compile failure, invalid props, brand-token regression |
| Production build | `npm run build` | static-route and Suspense integrity | 200/200 build log | compile/type/prerender failure |
| Pilot screens | targeted strict capture `--only 03,07,11,12,26,43,80` | 390×844 safe areas, hierarchy, state honesty, exits, no clipped actions | before/after PNGs + JSON | issue/warning or unwaived High/Critical defect |
| Foundation blast radius | strict 14-screen capture + foundation interaction verifier | full orb/icon grids, action sheet, slider and compatibility consumers | foundation JSON + state PNGs | warning, console error or contract mismatch |
| Accessibility | strict target/role instrumentation; native control scan; contrast calculations | keyboard/focus order, 44px targets, one h1, labels, non-color state | JSON + manual notes | fake/dead critical control, failing CTA text, missing focus |
| Motion | reduced-motion browser context and CSS review | states remain distinct with animation disabled | reduced-motion screenshots/notes | state collapses or looping motion persists |
| Data/RPG | Life Power formula assertion; ten-domain count; visible/accessibility source check | one payload drives polygon/value/count/summary | assertion output + screen 12 | hardcoded aggregate or axis/count mismatch |
| Monetization | screen 43 structural/source review | truthful entitlements, eligibility-aware CTA, equal exit | before/after + notes | hidden value, dead end, false trial, coercive exit hierarchy |
| Health/media/privacy | screen 26/80 source and control review | no diagnostic overclaim; provider/source/retention/export/revoke/delete reachable | screenshots + notes | unsafe claim or missing privacy/provider action |
| Worker delegation | packet/allowed-file/diff/evidence checks | disjoint ownership and evidence-only worker role | worker outputs | unlisted/shared write or worker readiness decision |

## Commands

```bash
cd balencia-screens
npm run check
npm run build
node scripts/verify-visual-104.mjs --strict --screenshots --only 03,07,11,12,26,43,80 --base http://localhost:3001 --out ../Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/pilot/pilot-after.json --shots-dir ../Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/pilot/after
node scripts/verify-pilot-seven.mjs http://localhost:3001 ../Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/pilot/pilot-interactions.json
node scripts/verify-foundation-sentinels.mjs http://localhost:3001 ../Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/pilot/foundation-interactions.json
node scripts/verify-visual-104.mjs --strict --screenshots --only 03,07,11,12,13,16,19,26,43,45,69,80,85,98 --base http://localhost:3001 --out ../Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/pilot/foundation-sentinels.json --shots-dir ../Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/pilot/foundation-sentinels
cd ..
node Balencia-New-Screens/work/validate-redesign.mjs --json
git diff --check
git diff --name-only -- yhealth-app
```

## Final result

- `npm run check`: PASS.
- `npm run build`: PASS, 200/200 static pages.
- Final strict seven-screen capture: PASS, `0` issues and `0` warnings.
- Final strict 14-screen foundation capture: PASS, `0` issues and `0` warnings.
- Dedicated interaction/state verifier: PASS on all seven in reduced-motion context with no console/page errors.
- Foundation interaction verifier: PASS on all eight shared contracts, including active-animation visibility pause/resume, S45 range semantics and the privacy-safe ConsentRail default.
- Eighteen exercised-state PNGs (17 pilot states plus the S45 slider sentinel), the Quick Log modal capture and both S98 orb/icon grids were inspected at original resolution.
- Root redesign validator: PASS at 104/104.
- Independent design and accessibility/trust reviews: ACCEPT after targeted repairs; no open Critical/High/Medium pilot finding.
- `git diff --check`: PASS. `yhealth-app` remains the pre-existing dirty `+4799ed1…` lane recorded by the incoming handoff and was not touched.
- Manual device AT/enlarged-text and broad Axe remain explicit R11 evidence waivers; this checkpoint makes no production-readiness claim.
