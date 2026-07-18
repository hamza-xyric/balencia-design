# VISUAL-001 pilot foundation — shared visual-system contract

- Status: `closed 2026-07-10 — PF-01…PF-06 accepted by Sol; VISUAL-003 pilot passed`
- Parent goal: finalize the complete 104-screen Balencia visual prototype.
- Active lane: `Balencia visual prototype finalization`
- Active root: `balencia-screens/`
- Excluded lane/root: `yhealth-app/`, Figma writes, Railway deployment, backend/auth/state-management work.
- Existing finding/status authority: `Balencia-New-Screens/build-progress/remediation-2026-07/REMEDIATION-LEDGER.md`.
- Reference authority: `VISUAL-001/REFERENCE-DIRECTION.md`, DVF-01..08 and current canon.
- Goal lifecycle: `/goal`
- Execution mode: `multi-agent`
- Wait policy: `monitor`
- Runtime profile: `codex-native`
- Model-routing policy: `gpt56-tiered`
- Orchestrator: Sol/root; sole writer/acceptor for shared files, ledgers and handoff.
- Explorers/reviewers: Luna read-only inventories; Terra independent read-only review. Worker evidence is non-authoritative until Sol verifies it.
- Session cap: six shared-foundation items plus deterministic sentinel evidence. No broad family rollout in this batch.

## Scope and ownership

Sol/root exclusively owns:

- `balencia-screens/src/app/globals.css`
- `balencia-screens/src/components/hifi/kit/{HifiShell,buttons,chips,chrome,cia,core,data,index,paywall}.tsx`
- narrow client-only `cia-orb.tsx`, `cia-composer.tsx`, `glass-pill-input.tsx`, `prototype-action-sheet.tsx` and `back-control.tsx`
- code-native `signature-icons.tsx`
- current screen-12 spec reconciliation
- VISUAL-001 evidence, existing remediation ledger, batch state and handoff

`src/components/design-system/Button.tsx` is deferred from this foundation slice: it has zero pilot consumers, roughly 100 call sites and a separate Code Connect gate. It will be aligned in its own serialized rollout slice after the hi-fi contract passes.

## Pre-development gate

- [x] User-authorized references generated and visually inspected.
- [x] VISUAL-002 Image 1/Image 2 accepted under the Quiet orbit / burnished ember contract; supplemental explorations are non-governing.
- [x] The separate factual pilot contact sheet is non-governing comparison evidence; its seven uniformly resized screenshot crops verify at zero differing pixels.
- [x] DVF-08/09 and `REFERENCE-DIRECTION.md` accepted; REF-01 resolved.
- [x] Warm-dark authority, all-caps `CIA`, official-logo immutability and ten-domain/Life Power decisions are current.
- [x] Installed Next.js 16 client-component, CSS and accessibility docs read before code.
- [x] Framer Motion guidance read; any interactive motion uses a narrow client boundary and reduced-motion path.
- [x] Shared blast radii and sentinel routes inventoried.
- [x] Screen-12 current spec reconciled to DVF-01/DVF-06 before radar code.

## Bounded items

| Item | Scope | Owner | Gate | Status |
|---|---|---|---|---|
| PF-01 action and focus tokens | deep ember/paper default-hover-pressed; completion/destructive; disabled/loading/focus; no `--grad-orange` reuse | Sol | computed AA matrix + brand verifier | completed |
| PF-02 hi-fi controls and semantic chrome | backward-compatible buttons/input/footer; native TopBar/nav/quick-log/composer/icon controls | Sol | lint/type + keyboard/focus inspection on sentinels | completed |
| PF-03 CIA presence system | narrow client SVG/Motion component; idle/listening/thinking/speaking/success; 24/32/hero; reduced motion | Sol | state grid + orb sentinels 07/11/19/45/69/85 | completed |
| PF-04 signature icon registry | Mission, Life Power, Correlation, Progression, CIA intelligence, domain nodes; commodity Lucide retained | Sol | monochrome recognition at 16/20/24; no logo derivation | completed |
| PF-05 ten-domain Life Power radar | one data payload, computed DVF-06 aggregate, ten axes/labels/accessibility; no shared literal 487 | Sol | fixture recomputation + screens 12/13/16/19 | completed |
| PF-06 foundation sentinels | exact before/after and real-browser inspection before screen migration | independent Terra review; Sol accept | checks below | completed |

## Deterministic verification

From `balencia-screens/`:

```bash
npm run check
npm run build
node scripts/verify-foundation-sentinels.mjs \
  http://localhost:3001 \
  ../Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/pilot/foundation-interactions.json
node scripts/verify-visual-104.mjs --strict --screenshots \
  --only 03,07,11,12,13,16,19,26,43,45,69,80,85,98 \
  --base http://localhost:3001 \
  --out ../Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/pilot/foundation-sentinels.json \
  --shots-dir ../Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/pilot/foundation-sentinels
```

From root:

```bash
node Balencia-New-Screens/work/validate-redesign.mjs --json
git diff --check
```

Manual gates: 390×844 clipping/safe area, keyboard order, visible focus, 44px targets, actual label-pixel contrast, orb state recognition at 24/32/hero, reduced motion, all-caps `CIA`, official assets untouched, console/page errors and no reference PNG imported by product source.

## Closeout

- Sol decision: **ACCEPT** PF-01…PF-06 as the locked rollout foundation.
- `npm run check`: PASS with zero errors and one pre-existing unused-import warning.
- `npm run build`: PASS; all 200 static pages generated after adding the required `/tabs/today` Suspense boundary.
- Strict foundation sentinels: `14/14`, 0 issues, 0 warnings, no console-error or missing-frame screen (`VISUAL-001/pilot/foundation-sentinels.json`).
- Interaction sentinels: PASS for 15 CIA state/size fixtures, 36 signature variants, zero reduced-motion animations/transitions, non-reduced visibility pause/resume, action hover/focus, Quick Log focus trap/Escape/restore, S45 native slider focus/range mapping, four Life Power routes, S43 equal-exit ethics and the privacy-safe default ConsentRail contract (`VISUAL-001/pilot/foundation-interactions.json`).
- Current `after/98-states.png` and `after/98-icons.png` visibly exercise the complete grids; current `after/12-quick-log.png` records the solid safe-area action sheet.
- Independent adversarial reviews found no remaining PF implementation blocker. VISUAL-003 then accepted screens `03,07,11,12,26,43,80` and opened only the bounded A1 family wave.
- Final one-SHA 104-screen evidence, broad Axe and manual device AT/enlarged-text remain downstream closure evidence, not a foundation rejection.
