# VISUAL-004 A1 verification matrix

| Change type | Deterministic gate | Manual lens | Evidence | Stop condition |
|---|---|---|---|---|
| Code/shared compatibility | `npm run check` | no shared consumer regression | command log | lint/type/route/asset/copy/brand error |
| Production build | `npm run build` | static route/Suspense integrity | build log | compile/type/prerender failure |
| A1 composition | strict capture `01,02,03,03b,03c,03d,03e,04` | 390×844 hierarchy, clipping, one primary, warm-dark direction | JSON + PNGs | issue/warning/console error |
| Native controls | A1 interaction verifier | keyboard order, labels, 44px targets, 16px input floor, focus | JSON + state PNGs | dead/fake control or missing focus |
| Consent/trust | A1 interaction verifier + source review | unchecked defaults, equal skip/decline, policy separation, no provider overclaim | JSON + states | pre-grant, coercion, false capability |
| Security/state craft | OTP/sign-in state assertions | masked destination, cooldown, offline/429/error separation, no enumeration | JSON + states | contradictory or fabricated state |
| Motion | reduced-motion context | final still remains legible/distinct | JSON + PNGs | looping motion or lost meaning |
| Independent acceptance | different read-only reviewer | quiet-orbit/burnished-ember, ethics, accessibility | review evidence | unwaived High/Critical |

Commands from `balencia-screens/`:

```bash
npm run check
npm run build
node scripts/verify-visual-104.mjs --strict --screenshots --only 01,02,03,03b,03c,03d,03e,04 --base http://localhost:3001 --out ../plans/batches/VISUAL-004-A1-auth-entry/evidence/a1-after.json --shots-dir ../plans/batches/VISUAL-004-A1-auth-entry/evidence/after
node scripts/verify-a1-auth.mjs http://localhost:3001 ../plans/batches/VISUAL-004-A1-auth-entry/evidence/a1-interactions.json ../plans/batches/VISUAL-004-A1-auth-entry/evidence/states
```

From root:

```bash
node Balencia-New-Screens/work/validate-redesign.mjs --json
git diff --check
git -C yhealth-app diff --check
```

## Final result — 2026-07-10

Every matrix row passes on current evidence. See `evidence/VERIFICATION-LOG.md`, `review-design-accessibility.md` and `ASSET-DISPOSITION.md`. Strict capture is `8/8` with zero issues/warnings; the isolated interaction suite records 42 state/focus frames with zero console/page errors; three independent reviewers return `ACCEPT`. Device AT/enlarged-text, broad Axe, exact runtime provenance and final one-SHA 104-screen certification remain owned downstream waivers.
