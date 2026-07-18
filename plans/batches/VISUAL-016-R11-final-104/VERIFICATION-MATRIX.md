# R11 final verification matrix

## Immutable configuration

| Axis | Required value |
|---|---|
| Runtime | fresh production `next start -p 3002`; never dev `:3001` |
| Viewport | `390 × 844` CSS pixels |
| DPR | `1` |
| Motion | reduced motion enabled for deterministic capture; explicit motion checks where applicable |
| Capture order | serialized registry order, all 104 route IDs |
| Context isolation | new browser/context contract defined by the R11 verifier; storage/cookies empty before each proof |
| Strict thresholds | current `verify-visual-104.mjs` strict configuration, hashed before execution; no weakening after authorization |
| Acceptance | `104/104`, zero issues, zero unwaived warnings, zero console/page/capability/external-request events |
| Reproduction | two complete captures at the same staged tree/SHA and config with exact manifest agreement |

## Deterministic command gates

Run from `balencia-screens/` unless stated otherwise:

1. `npm run check`
2. `npm run build`
3. fresh `next start -p 3002`; record production build ID and readiness log
4. `VISUAL_AUDIT_BASE_URL=http://localhost:3002 npm run verify:visual`
5. `R11_CONTRACT_BASE_URL=http://localhost:3002 npm run verify:r11-contracts`; require a real SafetyCard click to focused crisis guidance and focus-safe return, an in-screen WHOOP index-to-detail transition with Tab containment and opaque modal separation, plus all nine ConsentRail links to focused named panels, explicit destructive confirmations, no-file export truth, and zero console/page/external-request/storage events
6. require `/robots.txt` to disallow `/` and rendered metadata to contain `noindex, nofollow, nocache`; this mitigates accidental indexing but is not access control
7. `node scripts/verify-visual-104.mjs --strict --screenshots --base http://localhost:3002 --out <r11>/r11-strict-pass-1.json --shots-dir <r11>/strict-pass-1`
8. repeat step 7 into `r11-strict-pass-2.json` / `strict-pass-2` without product, server, browser, scanner, or config changes
9. compare route order, issue/warning counts, screenshot inventory, per-file SHA-256, dimensions, scanner/config hashes, and aggregate manifest digest exactly
10. run `node scripts/verify-r11-final.mjs --base http://localhost:3002 --evidence-root <r11>/evidence --expected-sha <candidate> --expected-parent <fetched-origin-main>` for cross-family source/capture integrity; manual W-007/reference/challenge/trust closure remains separate named evidence
11. require the current-source route/spec gates: `npm run verify:routes` (`104 screens, 104 specs`) plus the dedicated R11 verifier's exact 104 unique `src/data/screens.ts` ↔ hi-fi registry equality. The legacy `Balencia-New-Screens/work/validate-redesign.mjs` targets retired `Balencia-New-Screens/screens/**` and `Archive/2026-07-06/routes.csv`; diagnose it only in the preserved source worktree and do not transplant those retired dependencies into `main`.
12. run `npm run verify:assets`, `npm run verify:copy`, and `npm run verify:brand` explicitly
13. `git diff --check`; require `git diff --quiet HEAD^ HEAD -- yhealth-app` and identical `git ls-tree HEAD^ yhealth-app` / `git ls-tree HEAD yhealth-app`. In the original dirty worktree only, the read-only `git -C yhealth-app diff --check` diagnostic may also be recorded without touching the submodule.

Run these gates only after the one local certified-source commit. Every generated artifact records the resulting SHA and its own manifest hashes; it is not falsely claimed as contained in the commit it certifies. A failure that requires product or verifier repair invalidates the SHA; do not amend or create another commit without renewed authorization.

## Cross-family audit gates

| Gate | Required evidence |
|---|---|
| W-007 | Explicit per-screen verdicts for the original 40-screen W-007 set, plus a 104-row final coverage/disposition matrix; no inherited family-level shortcut |
| Affordance | Native/semantic control inventory; disabled reasons; focus, hover/pressed/selected/non-color cues; 44px targets and 16px editable text |
| Glass | Quiet orbit / burnished ember hierarchy, readable glass layering, no accidental nested glass, safe-area and bottom-clearance checks |
| Capability honesty | No unapproved API/provider/OS/network action; local simulation and dependency language remain explicit |
| Canon and color | Visible `CIA`; exactly ten starting domains; Life Power and Mission taxonomy; purple CIA-only; green success/health-only; hardcoded-color audit |
| Trust | Consent, audience, retention, revoke/delete/export, provider/source/freshness/confidence, crisis and higher-risk equality |
| Assets | Official logo immutable; accepted asset hashes; every image slot fulfilled code-natively, by approved raster, honest-null, or explicit waiver |
| Text resilience | 125% evidence, safe reflow, and explicit W-TRUNC-40/80 reaffirmation or supersession |
| States | Loading/empty/error/offline/disabled/success/modals are isolated, truthful, operable, and focus-correct where applicable |

## Mandatory challenge and reference sets

- Adversarial challenge: `30,31,03e,99,98`
- Reference re-certification: `12,75,80,83,89,90,91,93,96,97`
- Accepted asset sentinels: `HIFI-26-01`, `HIFI-75-01`, `HIFI-80-01`, plus the official logo set
- Accepted product sentinels: the final 104-file/product manifest derived from DVF-10 through DVF-22

## Frozen manual-audit populations

- Original W-007 set (40): `18,21,22,23,24,25,30,31,32,33,34,35,36,37,38,39,40,42,43,46,47,52,53,54,55,58,60,62,64,67,69,71,78,80,81,82,85,94,95,98`
- Affordance-inventory superset (21, resolving the historical plan's 19-count drift): `03c,04,15,22,23,30,34,39,40,41,45,49,51,57,60,61,80,81,90,93,97`, plus shared chrome/CIA/data/chip/system kit
- Glass-tier audit (20): `01,03e,07,09,12,15,17,20,26,30,39,40,43,47,60,67,75,80,91,98`
- Honesty-state audit (20): `03e,07,20,22,29,30,31,49,60,64,67,75,78,84,86,89,90,93,98,99`

The 21-screen affordance superset is intentionally conservative: `R0/affordance-inventory.md` enumerates 21 screen sections while RW-037's summary says 19. R11 reviews all 21 rather than silently dropping two.

## Independent review gates

Fresh non-author reviewers must independently return:

- CLEAR correctness/architecture: C0/H0/M0
- cross-screen design/source/canon: C0/H0/M0
- accessibility/privacy/safety/provider/capability trust: C0/H0/M0
- unfamiliar-engineer dry-run: every handoff locator resolves and the package can be used without chat history

`HANDOFF-PACKET.md` is the readable entrypoint. It must answer the final screen/route/spec/source mapping, design-system decisions, visible `CIA` convention, backend/compliance dependency boundaries, asset dispositions, verification evidence, and waivers without relying on chat history.

Any product or verifier repair invalidates prior R11 captures and reviews; rebuild and rerun the full one-tree evidence. Low findings must be fixed or explicitly recorded in the final finding/waiver status.

## Certification gate

R11 may close only when:

- explicit founder authorization exists for the exact scope;
- every deterministic gate and both complete captures pass at one tree/SHA/config;
- all final outputs exist and cross-link to actual evidence;
- no unwaived Critical, High, or Medium finding remains;
- residual limits are resolved or explicitly founder-waived;
- one local candidate commit and its post-commit immutable confirmation succeed;
- the certificate contains the mandated A+++ limitation sentence verbatim.
