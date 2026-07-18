# VISUAL-007 C1 repair C — type floor, filters, focus, plans, local truth

## Provenance and scope

- Packet: `VISUAL-007-C1-REPAIR-C`
- Requested route: Terra builder, high effort
- Actual spawned-worker model/effort: not independently exposed by the runtime (`W-MODEL` applies)
- Product scope: the five packet-owned Today/Missions screens only
- Shared kit, verifier, CSS, registries, batch authority, servers, Figma, `yhealth-app`, Railway, and git state were not changed

## Finding dispositions

| Finding | Disposition | Exact implementation |
|---|---|---|
| `AT-04`, owned-source portion of `C1-CC-07` | **Repaired** | In all five owned files, direct semantic `10px`/`11px` labels were raised to `12px`; meaning-bearing `text-white/40` and marginal semantic opacity were replaced with readable paper tokens. Screen-local important overrides lift shared CIA eyebrows, provenance/consent chips, S15's ring label, and S97's nav labels without editing the kit. The remaining low-opacity hits are aria-hidden/decorative icons or a separator. |
| `AT-05` | **Repaired** | `S73MissionJournal.tsx` and `S97PlansLibrary.tsx` now expose filter strips as native button groups with `role="group"` and `aria-pressed`. Incomplete `tablist`/`tab`/`aria-selected` semantics and arrow-only tab handling were removed from these filters. |
| `C1-CC-05` | **Repaired** | S73 delete completion restores focus only when the opener remains connected; otherwise it focuses the surviving Undo, named media region, or live-status fallback. S73 hide also moves focus to surviving Undo, and Undo moves focus to the named media region. S97 Archive/Delete and other row-removing completions use the same connected-opener check, then surviving Undo, named plan shelf, or live status. |
| `C1-CC-06`, `AT-07` | **Repaired** | Accepting S97's CIA schedule adjustment now stores the prior suggestion state in `lastUndo`, updates the visible local schedule, renders a reachable named Undo, restores the prior visible suggestion/schedule on Undo, and announces both apply and revert through the live status. Accepted copy now truthfully names the real recovery path. |
| `C1-DS-004` | **Repaired** | S59's empty/day-one state no longer presents an active `1.3x`. It renders an explicit honest-null `Not active yet` state tied to deliberate-rest eligibility. Default remains derived as 42 days = `2.0x`; eligible recovery remains `1.3x` next active day with the `2.0x` combined cap. |
| `C1-DS-005` | **Repaired** | S59 weekday headers, calendar numerals, legend labels, and other semantic microcopy are at least `12px`; day controls retain `min-h-11` (44px). |
| `C1-DS-006` | **Repaired** | S61 passes `tone={allDone ? 'done' : 'you'}` to `ProgressBar`, so the 100% success fixture uses canonical green consistently with the KPI/card. |
| `C1-DS-007` and measured S97 PaywallLock clipping | **Repaired** | S97 uses canonical `BtnPrimary` for `Unlock with premium`, retains a quiet full-width 52px `Not now`, and applies the required screen-local `!min-h-[310px]` to `PaywallLock`. |

## Files changed

- `balencia-screens/src/components/hifi/screens/today/S15CreateEditMission.tsx`
- `balencia-screens/src/components/hifi/screens/today/S59StreakDetails.tsx`
- `balencia-screens/src/components/hifi/screens/today/S61RemindersTasks.tsx`
- `balencia-screens/src/components/hifi/screens/today/S73MissionJournal.tsx`
- `balencia-screens/src/components/hifi/screens/today/S97PlansLibrary.tsx`
- `plans/batches/VISUAL-007-C1-today-missions/evidence/repair-c-type-tabs-plans.md`

## Commands and results

Working directory for product checks: `balencia-screens/`.

1. `npx eslint src/components/hifi/screens/today/S15CreateEditMission.tsx src/components/hifi/screens/today/S59StreakDetails.tsx src/components/hifi/screens/today/S61RemindersTasks.tsx src/components/hifi/screens/today/S73MissionJournal.tsx src/components/hifi/screens/today/S97PlansLibrary.tsx`
   - **PASS** — exit 0, zero errors, zero warnings.
2. `npx tsc --noEmit`
   - **PASS** — exit 0.
3. `git diff --check -- src/components/hifi/screens/today/S15CreateEditMission.tsx src/components/hifi/screens/today/S59StreakDetails.tsx src/components/hifi/screens/today/S61RemindersTasks.tsx src/components/hifi/screens/today/S73MissionJournal.tsx src/components/hifi/screens/today/S97PlansLibrary.tsx`
   - **PASS** — exit 0.
4. `rg -n "text-\[(?:[0-9]|1[01])px\]" <five owned files>`
   - **PASS** — exit 1 with no matches; no direct sub-12px source utility remains.
5. `rg -n "role=\"tablist\"|role=\"tab\"|aria-selected" S73MissionJournal.tsx S97PlansLibrary.tsx`
   - **PASS** — exit 1 with no matches; both filter strips use pressed-button group semantics.

## Residual risks / handoff

- Per packet boundary, no server, browser, screenshot, fresh production build, or hardened interaction verifier was run. Sol should re-render S59 empty/enlarged, S61 success, S73 hide/delete focus, S97 accept/undo and Archive/Delete focus, and S97's 310px PaywallLock at 390x844.
- `C1-CC-07` also identifies the verifier's `<11px` threshold. The owned product sources are repaired, but verifier hardening is root/serialized scope and was intentionally not edited here.
