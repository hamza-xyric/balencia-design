# HIFI-PROTOTYPE-A - 104-screen prototype foundation

- Status: `READY WITH WAIVERS`
- Theme: Convert the new hi-fi spec inventory into a scalable visual prototype shell.
- Session cap: Batch A foundation plus 10 reference screens.
- Reviewed date / URL / evidence path: 2026-07-07 / local workspace / `plans/batches/HIFI-PROTOTYPE-A/`
- Build gate this batch? yes - inventory/routing foundation
- Active root: `balencia-screens/`
- Source links: `Balencia-New-Screens/hifi-screens/_HIFI-LEDGER.md`, `Balencia-New-Screens/hifi-screens/_IMAGE-SLOTS.md`, selected hi-fi specs, `balencia-screens/AGENTS.md`
- Handoff status target: READY WITH WAIVERS
- Pre-development doc gate: READY WITH WAIVERS
- Documentation evidence path: `plans/batches/HIFI-PROTOTYPE-A/`
- Loop primitive: `none`
- Runtime profile: `codex-native`
- Orchestrator role: Codex
- Worker backend: GLM workflow sub-worker evidence only
- Provider: Z.ai
- Model: `glm-5.2`
- Endpoint class: provider-api
- Worker task packet: `plans/batches/HIFI-PROTOTYPE-A/worker-task-packet.md`
- Worker output path: `plans/batches/HIFI-PROTOTYPE-A/glm-rendering-architecture.md`
- Saved workflow: n/a
- Usage guard: `./scripts/glm-worker.sh --ping` passed on 2026-07-07 with `OK model=glm-5.2 reply=pong`
- Verify command: `cd balencia-screens && npm run check`

## Pre-development gate
- [x] Active docs, archived docs, and tie-breaker source identified
- [x] Source links resolve to active docs, work items, traceability rows, or live code paths
- [x] Blueprint `BUILD_READY` marker and traceability matrix checked, if Blueprint-backed - n/a
- [x] Verification matrix gates selected for every expected change type
- [x] Deterministic verify command and evidence path recorded
- [x] Loop primitive and runtime profile recorded
- [x] Worker smoke-test or local availability evidence recorded, if a worker is used
- [x] Worker task packet filled before delegation, if a worker is used
- [x] Worker output path recorded, if a worker is used
- [x] Saved workflow / `ultracode:` small first run, usage guard, and stop condition recorded, if used - n/a
- [x] Blockers, drift, and waivers recorded with owner, next action, and closure condition
- [x] Gate result: READY WITH WAIVERS

## Waivers And Drift
- Dirty worktree is pre-existing and intentionally broad. This batch will only touch `balencia-screens/` and `plans/batches/HIFI-PROTOTYPE-A/` unless closeout handoff updates are required.
- `framework/verify/portability-check.mjs .` still fails for known Codex/.agents starter-payload gaps. This is inherited from the previous handoff and not a blocker for the prototype slice.
- Legacy `balencia-screens/src/app/**` routes still contain SIA-era paths and copy. Batch A creates CIA-clean new prototype content under stable `/screens/<id>` routes and updates guards for the new inventory; full legacy route rename is deferred.

## Batch summary
- Ship-ready: yes, with waivers below.
- Completed: updated inventory to 104 specs, added scalable `/screens/[id]` route, rendered 10 reference screens, updated verification scripts, refreshed local prototype docs.
- Redesign / rework candidates: legacy per-route screen tree and SIA route names remain outside the new `/screens/<id>` prototype path.
- Open questions for the user: none blocking Batch A.

## Item checklist
| Item | Locator | Status |
|------|---------|--------|
| Inventory | `src/data/screens.ts`, `scripts/screen-specs.mjs` | done |
| Stable screen route | `src/app/screens/[id]/page.tsx` | done |
| Reference renderer | `src/components/hifi/*` | done |
| Verification updates | `scripts/verify-{routes,copy,brand}.mjs` | done |
| Local docs refresh | `README.md`, `AGENTS.md` | done |
| Gate run | `npm run check` | pass |

## Implementation notes
- `scripts/generate-screen-inventory.mjs` now regenerates `src/data/screens.ts` and `scripts/screen-specs.mjs` from the new hi-fi source folder and enforces the 104-screen count.
- `src/app/screens/[id]/page.tsx` is the scalable route for all 104 screens. It uses Next 16 promise-based `params`.
- `src/components/hifi/HifiPrototype.tsx` renders Batch A reference screens: `09`, `12`, `13`, `16`, `48`, `63`, `66`, `75`, `89`, `91`.
- `PhoneFrame` now targets the requested 390x844 mobile composition.
- The tab shell displays CIA for the assistant surface while preserving compatibility with legacy pages that still pass the old tab key.
- Guard scripts now reject SIA in new CIA prototype paths and verify the 104-screen hi-fi inventory.

## Verification log
| Command / check | Result | Notes |
|-----------------|--------|-------|
| `npm run lint` | pass with warning | Pre-existing warning: `src/components/domain/DomainDashboardHeader.figma.tsx:2:10 MoreHorizontal unused`. |
| `npm run typecheck` | pass | TypeScript clean. |
| `npm run verify:routes` | pass | `verify:routes passed (104 screens, 104 specs)`. |
| `npm run verify:assets` | pass | `verify:assets passed (14 logo assets)`. |
| `npm run verify:copy` | pass | `verify:copy passed (250 files scanned)`. |
| `npm run verify:brand` | pass | `verify:brand passed (250 files scanned)`. |
| `npm run check` | pass with same lint warning | Full configured gate passed. |
| Playwright smoke | pass | Opened `/`, `/screens/12`, `/screens/09`, `/screens/66`, `/screens/91`, `/screens/01`; no console errors or SIA matches in sampled snapshots. |
| `./scripts/glm-worker.sh --ping` | pass after approved escalation | `OK model=glm-5.2 reply=pong`. |
| GLM content delegation | waived | Auto reviewer rejected the external-content call because it would disclose private workspace/project details; Codex continued locally with 5.5 xhigh agents and recorded this in `glm-rendering-architecture.md`. |

## Completion gate
- [x] Every worked item has a full notes section in this file
- [x] Verify command run and result recorded: `cd balencia-screens && npm run check`
- [x] Worker backend evidence reviewed by Codex
- [x] Deferred items + open questions listed in the summary
- [x] `plans/next-session-handoff.md` updated with status, blockers, drift, waivers, dirty-worktree cautions, and exact next slice
