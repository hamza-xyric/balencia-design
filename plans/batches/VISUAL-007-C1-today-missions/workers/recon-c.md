# Worker packet — recon-c (read-only reconciliation, screens 59/61 + S12 sentinel map)

Same contract as recon-a (read-only, no edits, no decisions, Claude Fable-native subagent, current code wins ties, audit claims must be re-verified).

## Scope

- Specs: `59-streak-details.md`, `61-reminders-tasks.md`, `12-home-screen.md`
- Code: `S59StreakDetails.tsx`, `S61RemindersTasks.tsx`, `S12HomeScreen.tsx` (S12 = accepted pilot sentinel: map current state only, flag ONLY provable regressions, no reimplementation proposals)
- Audit rows 59/61/12; BATCH.md outcomes
- RPG authority: `RPG_SYSTEM_DESIGN.md` Appendix A XP multiplier stack + §2.7 Recovery Multiplier

## Special attention

- S59: exact current multiplier literals vs canon (42d must show 2.0×; recovery 1.3× after deliberate rest, stacks, caps 2.0×); ArcGauge role/name/value in current `kit/data.tsx`; lock treatment vs canonical PaywallLock in current `kit/paywall.tsx`.
- S61: checkbox/switch semantics (span-role vs native/button in CURRENT code); completed-row contrast stacking; domain naming (`Health`/`Fit` vs ten-domain registry); "Missions" wording in reminder roll-ups.
- S12: verify one ten-domain payload drives radar/labels/AT summary/completeness/Life Power in current code; record current MiniRadar/data source; NO change proposals unless a real regression vs pilot acceptance is provable.

## Output

Per-screen reconciliation matrix with file:line evidence, shared-kit dependency list, fixture truth, state coverage. Final message = findings.
