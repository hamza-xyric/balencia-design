# Balencia Design Workspace - Next-Session Handoff

- Last updated: 2026-07-07
- Status: READY WITH WAIVERS
- Current lane: 104-screen hi-fi prototype conversion
- Active implementation root: `balencia-screens/`
- Exact next recommended slice: Batch B auth/onboarding screens from `Balencia-New-Screens/hifi-screens/`, building on the new `/screens/<id>` renderer.

## Read-First Order

1. Root `AGENTS.md`
2. `balencia-screens/AGENTS.md`
3. `balencia-screens/README.md`
4. `plans/batches/HIFI-PROTOTYPE-A/batch.md`
5. `Balencia-New-Screens/hifi-screens/_HIFI-LEDGER.md`
6. `Balencia-New-Screens/hifi-screens/_IMAGE-SLOTS.md`
7. Target hi-fi specs for the next batch

## Start By

```bash
cd /Users/hamza/Desktop/balencia-design
git status --short
cd balencia-screens
npm run check
npm run dev
```

Expected state:
- Worktree is intentionally dirty from older project work. Do not revert unrelated files.
- `yhealth-app/` tracked deletions are expected drift from the repo split and are not part of this prototype batch.
- New prototype routes live at `/screens/<id>`.
- Dev server may choose `http://localhost:3001` if port 3000 is occupied.

## Current State

- Batch A completed the scalable 104-screen foundation and 10 reference screens.
- The new source of truth is `Balencia-New-Screens/hifi-screens/`.
- `balencia-screens` should be treated as the visual shell and component library, not the source truth.
- Use CIA in new visible UI and new code/data. Do not introduce SIA in new prototype content.

## Completed In Batch A

| ID | Work completed | Evidence/source | Files/areas touched |
|----|----------------|-----------------|---------------------|
| HIFI-A-01 | Generated 104-screen inventory from the new hi-fi ledger and filenames | `scripts/generate-screen-inventory.mjs`; `npm run verify:routes` | `balencia-screens/src/data/screens.ts`, `balencia-screens/scripts/screen-specs.mjs` |
| HIFI-A-02 | Added stable dynamic route for all prototype screens | `/screens/<id>` smoke-tested with Playwright | `balencia-screens/src/app/screens/[id]/page.tsx` |
| HIFI-A-03 | Built reusable hi-fi renderer and completed 10 reference screens | Batch A IDs: `09`, `12`, `13`, `16`, `48`, `63`, `66`, `75`, `89`, `91` | `balencia-screens/src/components/hifi/HifiPrototype.tsx` |
| HIFI-A-04 | Updated review shell details for the new target | 390x844 frame; CIA tab label | `PhoneFrame.tsx`, `ScreenShell.tsx`, `TabBar.tsx` |
| HIFI-A-05 | Updated route, copy, and brand verification for the 104-screen CIA prototype path | `npm run check` passed | `scripts/verify-routes.mjs`, `scripts/verify-copy.mjs`, `scripts/verify-brand.mjs` |
| HIFI-A-06 | Refreshed local repo guidance to point future work at the new hi-fi source | README/AGENTS updated | `balencia-screens/README.md`, `balencia-screens/AGENTS.md` |

## Verification Log

| Command / check | Result | Notes |
|-----------------|--------|-------|
| `npm run lint` | pass with warning | Pre-existing warning: `DomainDashboardHeader.figma.tsx` has unused `MoreHorizontal`. |
| `npm run typecheck` | pass | TypeScript clean. |
| `npm run verify:routes` | pass | `104 screens, 104 specs`. |
| `npm run verify:assets` | pass | `14 logo assets`. |
| `npm run verify:copy` | pass | `250 files scanned`. |
| `npm run verify:brand` | pass | `250 files scanned`. |
| `npm run check` | pass with same lint warning | Full configured gate passed. |
| Playwright smoke | pass | `/`, `/screens/12`, `/screens/09`, `/screens/66`, `/screens/91`, `/screens/01`; no sampled console errors or SIA matches. |
| `./scripts/glm-worker.sh --ping` | pass after approved escalation | `OK model=glm-5.2 reply=pong`. |

## Waivers And Drift

| ID | Waiver / drift | Owner | Next action |
|----|----------------|-------|-------------|
| W-001 | Dirty worktree predates this batch and includes broad unrelated changes. | Hamza | Ignore unless explicitly asked to clean or commit. |
| W-002 | `yhealth-app/` tracked deletions are expected from the repo split. | Hamza | Do not stage/commit without explicit approval. |
| W-003 | `framework/verify/portability-check.mjs .` still reports known Codex/.agents starter gaps. | Hamza | Not blocking the visual prototype lane. |
| W-004 | GLM ping works, but content delegation was blocked by the approval reviewer due private workspace/project disclosure risk. | Codex/Hamza | Use local multi-agent workers for private repo details unless a safer redacted packet is prepared. |
| W-005 | Legacy per-screen routes still contain SIA-era names/copy. | Codex | Continue implementing the new CIA-clean `/screens/<id>` route tree; legacy route cleanup is a separate batch. |
| W-006 | Lint has a pre-existing unused import warning in a Figma Code Connect file. | Codex | Fix in a separate cleanup slice if desired. |

## Next Slice

Goal: implement Batch B auth/onboarding screens in the new renderer.

Suggested screen cluster:
- `01` Splash screen
- `02` Welcome screen
- `03` Sign up
- `03b` Google sign in details
- `03c` Apple sign in details
- `03d` Facebook sign in details
- `03e` Phone sign in details
- `04` Log in
- `05` Choose plan
- `05b` Start trial details
- `06` Onboarding stack intro
- `07` Life wheel assessment
- `08` Mission creation

Done when:
- Each target spec has been read and rendered as a polished 390x844 composition.
- CIA naming is preserved.
- Consent, provenance, honest-null states, and safety language are present where the specs call for them.
- `cd balencia-screens && npm run check` passes.
- Playwright smoke covers the batch’s representative routes.
