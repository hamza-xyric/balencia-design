# VISUAL-007 C1 repair B — Schedule, Water, Daily Check-in

- Packet: `VISUAL-007-C1-REPAIR-B`
- Role: bounded builder (`gpt-5.6-terra`, high requested; runtime model provenance remains covered by `W-MODEL`)
- Date: 2026-07-11 PKT
- Write scope: S41, S44, S45, and this report only

## Finding dispositions

| Finding | Disposition | Changed behavior |
|---|---|---|
| `AT-01` | Resolved | S41 now keys the day population to the selected date. Thursday retains the real/projection/missed fixture; every selected non-Thursday date renders an explicit in-viewport honest-null panel and does not reuse Thursday events. |
| `AT-02` | Resolved | S41 cold-start Connect and Not now actions now use the same 52px full-width secondary treatment. Scope, purpose, retention, revoke, and delete truth remains visible. |
| `AT-03` | Resolved | S44 delete confirmation is now a phone-bound `aria-modal` dialog supplied through `HifiShell.overlay`, making the underlying screen inert. Cancel receives initial focus; Tab and Shift+Tab cycle inside; Escape cancels; Cancel restores the connected delete trigger; confirm moves focus to the surviving Undo control with a named log-heading fallback. Exact amount and time remain in the dialog. |
| `AT-04` | Resolved in owned files | Meaning-bearing low-opacity text was raised to readable paper tokens, and local semantic labels now render at 12px or larger. Screen-local overrides cover nav labels, display/consent chips, CIA eyebrow/provenance, and ring/donut labels without changing decorative icon opacity. |
| `C1-CC-02` | Resolved | S41 Day, Week, and Month are content-bearing tab panels. Week and Month render distinct, truthful bundled populations; selection changes the rendered population and announcement. Tabs now expose roving focus plus `aria-controls`/`tabpanel` relationships. |
| `C1-CC-03` | Resolved | S45 empty initializes mood, context, energy, and stress as unset. It renders dashed/ghost direct-input treatments and prompts, omits every `You logged` claim, and keeps Save disabled with a visible reason until mood selection. |
| `C1-CC-04` | Resolved | S45 Cancel is a same-origin Next `Link` exit to Today using history replacement. Save and error retry now transition the authoritative screen state to one exclusive success branch, so an error surface cannot coexist with success. Offline saves retain local-only/sync-later truth. |
| `C1-DS-002` | Resolved | The S45 cold-start fixture no longer fabricates Good, Career, Energy 7, Stress 4, or provenance. Optional reflection and history-derived insight remain empty/omitted. |
| `C1-DS-003` | Resolved | S44 weekly data is one day-keyed structure with Wednesday as the honest-null day. Bar placement, accessible chart summary, and visible explanation all derive from that structure. |

## Screen-level behavior

### S41 Schedule

- Default Thursday still exposes the current Team sync in the initial timeline and keeps synced, CIA-projected, and missed populations visually distinct.
- Monday–Wednesday and Friday–Sunday show an honest-null day panel when selected.
- Week and Month use compact fixture summaries and state explicitly which dates are populated or null.
- Calendar consent exits have equivalent geometry and visual weight.

### S44 Water intake

- Delete moved from an inline disclosure into a canonical inert-overlay confirmation dialog with a complete keyboard/focus lifecycle.
- Confirmed deletion focuses Undo; undo still restores the exact entry and order.
- Weekly gap truth is derived from the keyed Wednesday fixture.
- Empty all-time stats no longer display a fabricated `You logged` provenance chip.

### S45 Daily check-in

- Energy and stress are controlled nullable range states; unset renders a dashed track, no fill/thumb, `Not set`, a visible slide prompt, and an unset `aria-valuetext` while preserving native range semantics.
- Mood/context/provenance are conditional on actual direct input.
- Success is an exclusive branch with one passive CIA orb, local data controls, and safety resources.
- Error retry succeeds locally into that branch; Cancel exits to `/screens/12` without an external capability.

## Verification

Run from `balencia-screens/` unless noted:

| Command | Result |
|---|---|
| `npx eslint src/components/hifi/screens/today/S41ScheduleCalendar.tsx src/components/hifi/screens/today/S44WaterIntake.tsx src/components/hifi/screens/today/S45DailyCheckin.tsx` | PASS on final run. The first run correctly rejected a raw internal anchor; S45 was changed to Next 16 `Link`, then the command passed. |
| `npx tsc --noEmit` | PASS, zero diagnostics. |
| `git diff --check -- <three owned product files>` (workspace root) | PASS, no whitespace errors. |

No server was started or stopped. Per the worker boundary, the production build, screenshots, hardened verifier, and full family gates are left to Sol.

## Residual risks / handoff

- Fresh rendered verification is still required for computed contrast, 390x844 placement, the S44 focus trap/return sequence, and the S41/S45 interaction transitions.
- Week/Month are intentionally fixture-bounded summaries rather than fabricated calendars; no external calendar or health capability was added.
- No shared kit, CSS, verifier, registry, batch authority, accepted-family screen, `yhealth-app`, Figma, Railway, or git state was edited.
