# Worker packet — recon-a (read-only reconciliation, screens 13/14/15)

- Parent goal: C1 family closure (VISUAL-007-C1-today-missions)
- Batch items: S13, S14, S15
- Role: read-only spec↔code reconciliation. NO edits. NO architecture/privacy/readiness decisions.
- Provenance: Claude Fable-native subagent (GLM unavailable, HTTP 429 recorded in BATCH.md)
- Tie-breaker: current code > spec > canon > audit (audit is 2026-07-10 intake, predates shared-foundation work; re-verify every claim)

## Sources to read

1. `plans/batches/VISUAL-007-C1-today-missions/BATCH.md` (required outcomes + overrides)
2. Specs: `Balencia-New-Screens/hifi-screens/13-goals-list.md`, `14-goal-detail.md`, `15-create-edit-goal.md`
3. Code: `balencia-screens/src/components/hifi/screens/today/S13MissionBoard.tsx`, `S14MissionDetail.tsx`, `S15CreateEditMission.tsx`
4. Shared kit consumed by these files (read what they import from `../kit/`)
5. Audit rows for 13/14/15 in `VISUAL-001/audit/C1-today-missions.md`

## Required output

For EACH screen, a reconciliation matrix:
- Audit/outcome requirement → current code status (FIXED-ALREADY / STILL-OPEN / PARTIAL / SUPERSEDED-BY-DVF) with exact file:line evidence
- Every still-open defect mapped to the BATCH.md required outcome it violates
- List of shared-kit dependencies that would need Fable-serialized changes (vs screen-local fixes)
- Data/fixture truth: what payload drives Life Power/domain/mission values; whether hardcoded literals conflict with ten-domain registry or RPG rules
- State coverage: which of default/loading/empty/error/offline/disabled/success/pending states exist now

Overrides in force: visible coach name is all-caps `CIA` (DVF-07 voids audit 'Cia' recommendations); ten starting domains; Missions taxonomy; warm-dark accepted.

## Denied

Any file write; any fix recommendation beyond defect classification; any acceptance claim.

## Output path

Return findings as your final message (Fable persists to `evidence/worker-recon-a.md`).
