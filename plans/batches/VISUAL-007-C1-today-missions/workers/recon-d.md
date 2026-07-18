# Worker packet — recon-d (read-only reconciliation, screens 73/97 + shared-kit current-state sweep)

Same contract as recon-a (read-only, no edits, no decisions, Claude Fable-native subagent, current code wins ties, audit claims must be re-verified).

## Scope

- Specs: `73-mission-journal.md`, `97-plans-library.md`
- Code: `S73MissionJournal.tsx`, `S97PlansLibrary.tsx`
- Audit rows 73/97; BATCH.md outcomes
- Shared-kit sweep: current `balencia-screens/src/components/hifi/kit/` — chrome.tsx (TopBar/nav), HifiShell.tsx, glass-pill-input.tsx, buttons.tsx, chips.tsx, data.tsx, paywall.tsx, system.tsx (SafetyCard/ConsentRail), cia.tsx/cia-orb.tsx

## Special attention

- S73: 12-week vs six-week copy conflict; "Via missions ledger" metric sourcing; progress-photo tiles (privacy-safe thumbnail vs honest-null — record CURRENT rendering); "private on this device" claim vs actual behavior; SafetyCard operability.
- S97: filter tab target sizes; inert plan-row claims vs current code; premium gate vs canonical PaywallLock (`kit/paywall.tsx` current API); required actions edit/pause/stop/archive/delete/export/share/revoke presence.
- Kit sweep: for each audit "systemic inert" claim (TopBar back, nav divs, FloatingQuickLog, GlassPillInput, focus-ring no-consumer, buttons state contract, ArcGauge role) report CURRENT truth with file:line — these were likely repaired during pilot/A1/A2/B1.

## Output

Per-screen reconciliation matrix + kit-claim truth table with file:line evidence, fixture truth, state coverage. Final message = findings.
