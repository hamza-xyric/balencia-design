# VISUAL-003 worker packet — Today and health

- Packet status: `completed; Sol accepted after integrated verification and root-owned HIFI-26 repair`
- Parent batch: `VISUAL-003-seven-screen-pilot`
- Packet ID: `PILOT-TODAY-HEALTH`
- Issued by: Codex root / Sol
- Worker profile: native Codex collaboration worker
- Worker harness: Codex agent thread
- Model-routing policy: `gpt56-tiered`
- Worker agent type: implementation worker
- Worker model / effort: requested `gpt-5.6-terra` / high; actual model is not selectable or exposed
- Runtime intake source: `../BATCH.md`
- Source hierarchy: root/lane guidance plus `VISUAL-001/REFERENCE-DIRECTION.md` and DVF-06
- Tie-breaker: latest decisions/reference contract → live screen code → current hifi spec/canon/RPG contract
- Active root: `balencia-screens/`
- Verify command: `npm run typecheck` after the shared foundation is present
- Evidence path: `plans/batches/VISUAL-003-seven-screen-pilot/evidence/worker-today-health.md`
- Timeout / stop condition: one bounded turn; stop on shared API conflict, data-contract conflict, or need for an unlisted file

## Exact scope

Implement only pilot screens 12 and 26 against the Sol-owned shared foundation.

## Required sources

- `VISUAL-001/REFERENCE-DIRECTION.md`, DVF-06
- `hifi-screens/{12-home-screen,26-fitness-workouts-dashboard}.md`
- audits `C1-today-missions.md`, `F1-health-fitness-nutrition.md`
- current two screen files and current shared kit APIs

## Allowed files

| Path | Operation |
|---|---|
| `balencia-screens/src/components/hifi/screens/today/S12HomeScreen.tsx` | edit |
| `balencia-screens/src/components/hifi/screens/health/S26FitnessDashboard.tsx` | edit |
| `plans/batches/VISUAL-003-seven-screen-pilot/evidence/worker-today-health.md` | write evidence |

Stage only these files under `/Users/hamza/Marketing Portal/.codex-staging/balencia-design/`, edit via `apply_patch`, and copy back with approved `rsync -aR`. Do not touch another staging file.

## Required outcomes

- S12: use Sol's data-bound ten-domain Life Power component; one payload drives axes/polygon/score/count/summary; no hardcoded `487`; all mood, quick actions, tasks, Quick Log and nav surfaces are native controls; provenance names every visible metric source; nav says Missions.
- S26: resolve 78%-versus-8/10 inconsistency with exact or explicitly approximate presentation; full-width shared CTA; chart/metric source and freshness remain explicit; Data sources reaches the full consent/control rail; health boundary remains visible.
- Preserve warm-dark 390×844 authority, all-caps `CIA`, no diagnostic overclaim, and no media/photo fabrication.

## Denied actions

- No shared kit, token, formula implementation, registry, spec, ledger, handoff, asset, Figma, Railway, API/backend, or `yhealth-app` edit.
- No final data/safety/readiness decision.
- Do not commit, stage, reset, stash, clean, format unrelated files, or spawn another worker.

## Output

Write a concise evidence file naming files read/changed, requirements addressed, verify result, remaining issues, and stop conditions. Worker output is evidence until Sol reviews it.
