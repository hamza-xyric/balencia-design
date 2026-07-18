# VISUAL-005 A2 verification matrix

| Change type | Deterministic gate | Manual lens | Stop condition |
|---|---|---|---|
| Code/shared compatibility | `npm run check` | no shared/pilot regression | any error |
| Production build | `npm run build` | all 200 static pages/prerender integrity | compile/type/prerender failure |
| A2 composition | strict `--only 05,05b,06,07,08,65,66` | 390×844 hierarchy, warm-dark, one primary, clipping | issue/warning/console error |
| Native controls | A2 interaction verifier | keyboard order, labels, 44px effective targets, 16px input floor, focus | fake/dead action or missing state |
| Recovery/security | A2 verifier + source review | enumeration safety, token secrecy, timer honesty, mutually exclusive states | fabricated delivery/validation/countdown |
| Guest/plan truth | A2 verifier + source review | illustrative provenance, 1–3 cap, single milestone truth | measured-data or progression contradiction |
| Permission/system trust | A2 verifier + ethics review | equal decline, optional/revocable copy, OS/store unavailability | coercion or false capability |
| Motion | reduced-motion context | final still retains meaning | looping/leaked motion or lost state |
| Independent acceptance | separate read-only reviewers | source, accessibility, ethics, hierarchy | unwaived Critical/High/Medium |

Commands from `balencia-screens/`:

```bash
npm run check
npm run build
node scripts/verify-visual-104.mjs --strict --screenshots --only 05,05b,06,07,08,65,66 --base http://localhost:3001 --out ../plans/batches/VISUAL-005-A2-auth-recovery/evidence/a2-after.json --shots-dir ../plans/batches/VISUAL-005-A2-auth-recovery/evidence/after
node scripts/verify-a2-auth.mjs http://localhost:3001 ../plans/batches/VISUAL-005-A2-auth-recovery/evidence/a2-interactions.json ../plans/batches/VISUAL-005-A2-auth-recovery/evidence/states
```

From root:

```bash
node Balencia-New-Screens/work/validate-redesign.mjs --json
git diff --check
git -C yhealth-app diff --check
```

## Final result — 2026-07-10

- `npm run check`: PASS; zero errors and one unrelated pre-existing unused-import warning.
- `npm run build`: PASS; `200/200` static pages, existing Node deprecation warning only.
- Strict family capture: PASS `7/7`, zero issues/warnings/missing frames/console errors.
- Hardened interaction verifier: PASS seven groups plus integrity, exactly `61/61` PNGs, `62` storage-cleared query/hash nonces, zero console/page/capability events, current source/API hashes unchanged.
- Root validator: PASS `104/104`; no false pass, defect, missing or uncovered route.
- Root/submodule diff checks: PASS.
- Independent reviews: ACCEPT code/verifier; ACCEPT design/source; ACCEPT accessibility/trust.
- Final disposition: Sol accepted A2 with evidence-only waivers; B1 is the only next family.
