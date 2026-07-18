# Worker packet — recon-b (read-only reconciliation, screens 41/44/45)

Same contract as recon-a (see `recon-a.md` preamble; read-only, no edits, no decisions, Claude Fable-native subagent, current code wins ties, audit claims must be re-verified).

## Scope

- Specs: `41-schedule-calendar.md`, `44-water-intake.md`, `45-daily-checkin.md`
- Code: `S41ScheduleCalendar.tsx`, `S44WaterIntake.tsx`, `S45DailyCheckin.tsx`
- Audit rows 41/44/45 in `VISUAL-001/audit/C1-today-missions.md`
- BATCH.md required outcomes for 41/44/45

## Special attention

- S41: first-viewport timeline hierarchy vs spec §61-65; two time populations ("2h 15m scheduled" vs "4h 30m of 16h"); date strip semantics; drag/reorder alternatives.
- S44: delete affordance visibility/size; dehydration-risk evidence citation; FloatingQuickLog current operability (kit may have changed post-audit).
- S45: slider semantics (native vs role-div); two-orb duplication vs one passive orb; SafetyCard operability in CURRENT kit; mood/stress data controls (ConsentRail presence).

## Output

Per-screen reconciliation matrix (FIXED-ALREADY / STILL-OPEN / PARTIAL / SUPERSEDED-BY-DVF, file:line evidence), shared-kit dependency list, fixture truth, state coverage. Final message = findings.
