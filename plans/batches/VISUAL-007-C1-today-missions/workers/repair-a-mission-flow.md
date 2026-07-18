# C1 review repair A — Mission Board → Mission Detail intent

```yaml
packet_id: VISUAL-007-C1-REPAIR-A
requested_role: builder
requested_model: gpt-5.6-terra
requested_effort: high
owned_files:
  - balencia-screens/src/components/hifi/screens/today/S13MissionBoard.tsx
  - balencia-screens/src/components/hifi/screens/today/S14MissionDetail.tsx
output: plans/batches/VISUAL-007-C1-today-missions/evidence/repair-a-mission-flow.md
```

## Objective

Repair independent finding `C1-CC-01` without changing the accepted S12 sentinel, shared kit, routes/registry, or any other screen.

## Required sources

- Root and lane `AGENTS.md`
- `13-goals-list.md`, `14-goal-detail.md`, `15-create-edit-goal.md`
- C1 `BATCH.md`, `VERIFICATION-MATRIX.md`
- `evidence/review-code.md`, especially `C1-CC-01`
- Current S13/S14 sources and `src/data/screens.ts`

## Required repairs

1. Route the normal S13 `New mission` action to the dedicated S15 mission editor (`/screens/15`), never the generic `?action=new-mission` quick-note sheet. Preserve disabled/offline reasons.
2. Carry a stable mission identity from every visible S13 mission row into S14 (query parameters are allowed). S14 direct navigation with no identity must retain its canonical half-marathon fixture.
3. S14 must visibly and accessibly reflect the selected mission rather than showing a different hard-coded title. Parameterize enough visible identity/content (title, progress/action/domain/provenance/coaching copy as needed) that Career/Wellbeing missions do not leak running/Strava claims. Keep all data bundled/local and preserve the default canonical composition.
4. Keep all rows operable and internal; no backend/API/state library.
5. Bring any semantic text in these two files to the frozen `>=12px` floor and any meaning-bearing text to computed AA contrast; do not touch decorative icon opacity.

## Verification

- Run targeted ESLint on the two owned files and `npx tsc --noEmit` if time permits.
- Inspect the exact diff for only owned files.
- Do not run/stop servers or the full browser suite.

## Allowed / denied

- Edit only the two owned product files and the one output report, using `apply_patch`.
- Do not edit verifier/shared kit/CSS/registry/data docs/batch/review evidence.
- Do not touch S12, accepted A1/A2/B1 screens, `yhealth-app`, Figma, Railway, git index/history, or unrelated dirty files.

## Output contract

Write the output report with changed behavior, exact files, targeted commands/results, assumptions, and residual risks. Return a concise summary; worker output remains evidence until Sol verifies it.
