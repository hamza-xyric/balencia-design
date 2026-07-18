# C1 review repair C — Type floor, tabs, focus, plans, local data truth

```yaml
packet_id: VISUAL-007-C1-REPAIR-C
requested_role: builder
requested_model: gpt-5.6-terra
requested_effort: high
owned_files:
  - balencia-screens/src/components/hifi/screens/today/S15CreateEditMission.tsx
  - balencia-screens/src/components/hifi/screens/today/S59StreakDetails.tsx
  - balencia-screens/src/components/hifi/screens/today/S61RemindersTasks.tsx
  - balencia-screens/src/components/hifi/screens/today/S73MissionJournal.tsx
  - balencia-screens/src/components/hifi/screens/today/S97PlansLibrary.tsx
output: plans/batches/VISUAL-007-C1-today-missions/evidence/repair-c-type-tabs-plans.md
```

## Objective

Repair `AT-04/05/07`, `C1-CC-05/06/07`, `C1-DS-004/005/006/007`, plus Sol's measured S97 PaywallLock clipping defect, only in the five owned screens.

## Required sources

- Root/lane `AGENTS.md`
- Specs `15-create-edit-goal.md`, `59-streak-details.md`, `61-reminders-tasks.md`, `73-mission-journal.md`, `97-plans-library.md`
- C1 batch/matrix and all three independent review reports
- Current owned sources; kit components may be read but not edited

## Required repairs

1. In all five files, raise every semantic/meaning-bearing label to the frozen `>=12px` floor. Replace meaning-bearing `text-white/40` / equivalent sub-AA opacity with a paper token that computes to >=4.5:1 on its actual surface. Preserve muted hierarchy through spacing/weight, not failing opacity.
2. S59 empty/day-one: hide the Recovery multiplier or render an unmistakable not-yet-applicable locked/honest-null state; never present active `1.3x` before deliberate-rest eligibility. Keep default 42d=`2.0x`, recovery=`1.3x` next active day, combined cap=`2.0x`. Weekday headers must be >=12px and day targets remain >=44px.
3. S61 success: the 100% progress bar must use canonical green/done tone, consistent with success KPI/card.
4. S73/S97 filter strips are filters, not document tabs. Prefer native buttons in `role="group"` with `aria-pressed` and no incomplete tab roles; otherwise implement the complete ARIA tabs pattern. Keep arrow interaction only if its semantics remain valid.
5. S73 destructive completion: if the opener is removed, focus a surviving Undo or named section/status fallback; restore opener only when connected. Hide removal should also avoid dropping focus.
6. S97 destructive Archive/Delete completion: restore to opener only when connected; otherwise focus the surviving Undo/fallback.
7. S97 CIA adjustment Accept must create a real reachable Undo/Revert path using the existing undo model and truthful copy; undo restores the prior suggestion state and announces it.
8. S97 PaywallLock: use canonical `BtnPrimary` for `Unlock with premium`, retain a quiet equal-reach `Not now`, and add a screen-local `min-h-[310px]` (measured requirement) so both actions are fully contained/visible. Do not edit shared `paywall.tsx`.

## Verification / boundaries

- Run targeted ESLint for owned files and `npx tsc --noEmit` if time permits; do not run/stop servers.
- Edit only the five owned product files plus output report, using `apply_patch`.
- Do not edit verifier/shared kit/CSS/registry/batch/review evidence, S12, other screens, `yhealth-app`, Figma, Railway, or git state.

## Output contract

Write the output report with per-finding disposition, exact files, commands/results, and residual risks. Return a concise summary; Sol independently verifies.
