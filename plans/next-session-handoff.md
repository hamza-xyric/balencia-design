# Next-Session Handoff — Hi-Fi Build (104 screens)

> Status: IN PROGRESS — 26/104 complete, B2 in flight
> Branch: `hifi-build` @ `5123770` · Updated: 2026-07-08 (mid-session checkpoint)

## Lane

104-screen hi-fi build from `Balencia-New-Screens/hifi-screens/` into `balencia-screens/` (`/screens/[id]`). Plan approved at `/Users/hamza/.claude/plans/next-session-prompt-foamy-waterfall.md`. Durable truth: `Balencia-New-Screens/build-progress/BUILD-LEDGER.md` (orchestrator-only writes).

## Locked founder decisions

1. Dark glass only (warm-light spec passages = theme debt, not built).
2. GLM 5.2 primary bulk drafter (spec content to z.ai approved — supersedes W-004); sonnet repairs; Fable owns truth.
3. Branch `hifi-build`; path-scoped commits; repo-split deletions untouched.
4. Max autonomous; verified batches only.

## Done this session

- Phase 0: baseline commit `ff59f6f`, gates green, GLM ping OK, BUILD-LEDGER created, dev server :3001.
- B0 (3 commits `8bdc343`/`c4a2aba`/`5a06da7`): kit/ + screens/<family>/ + registry architecture (pixel-verified), canon tokens (glass tiers, inner glow, atmosphere, grain), Hanken Grotesk + Newsreader italic scoped `.hifi`, GlassNavBar, HifiShell.
- Pilot P (`342af65`): 03, 07, 26, 28 + pilot kit (buttons, CIA orb/insight, ProgressRing/ChargeMeter/TrendChart/HeatGrid/VolumeBars/DonutHub, StepperRail). 10 review findings fixed.
- B1 (`5123770`): 12 auth/onboarding screens. 16 review findings fixed (incl. pre-checked-consent dark pattern).

## In flight

- **B2** (workflow `wf_d7e1674c-1af`): 10, 11, 51, 74, 76, 77, 79, 99 → `screens/cia/`. Pipeline: haiku digest → GLM draft → 2 sonnet builders (4 each) → trust+a11y reviews. On completion: fix findings → register in `screens/cia/index.ts` (orchestrator does this — builders never touch index) → flip `screens.ts` statuses → `npm run check` → `node scripts/hifi-screenshots.mjs --ids ... --out ../Balencia-New-Screens/build-progress/screenshots/B2` → visual inspect → ledger rows + batch log → commit.

## Batch queue after B2

B3 today/missions (14,15,41,44,45,59,61,73,97) → B4 intel/profile (17,19,20,50,68,72,83,84,90,92,93,96) → B5a (27,29,49,56,57,70,86,87,88) → B5b mind/body (52,53,54,55,58,60,62 — safety-heaviest) → B6 domains (18,30–38) → B7a social (39,40,42,46,47,71,82,94,95) → B7b account/system (21–25,43,64,67,69,78,80,81,85,98) → sweep session.

## Method per batch (proven in P + B1)

1. Get spec filenames: grep screens.ts specFile.
2. Workflow: digest (haiku) → GLM draft (haiku wrapper shelling `scripts/glm-worker.sh -t 8192`, prompt = directive + KIT-CHEATSHEET.md + spec) → sonnet builders (packets ≤4, never touch shared files) → trust + a11y reviews.
3. Fix findings (one sonnet fixer with explicit list, or Fable direct).
4. Fable: register in family index, flip statuses, full check, screenshots, visual inspect, ledger, commit.

Key files: `Balencia-New-Screens/build-progress/KIT-CHEATSHEET.md` (feed to every agent), `balencia-screens/scripts/hifi-screenshots.mjs`, kit at `balencia-screens/src/components/hifi/kit/`.

## Known debt

- `figma-tokens-map.json` regen owed (B0 globals.css additions).
- S04 renders offline banner inside its default frame (minor state-mixing; revisit in sweep).
- Legacy SIA routes grandfathered (W-005).
- Image slots = styled placeholders (`_IMAGE-SLOTS.md` backlog).

## Verify commands

From `balencia-screens/`: `npm run check`. From root: `node Balencia-New-Screens/work/validate-redesign.mjs --json` + `rg -n "\bSIA\b" Balencia-New-Screens/hifi-screens balencia-screens/src/app/screens balencia-screens/src/components/hifi balencia-screens/src/data/screens.ts` (must be 0 in hifi paths). GLM: `scripts/glm-worker.sh --ping`.
