# C1 review repair B — Schedule, Water, Daily Check-in

```yaml
packet_id: VISUAL-007-C1-REPAIR-B
requested_role: builder
requested_model: gpt-5.6-terra
requested_effort: high
owned_files:
  - balencia-screens/src/components/hifi/screens/today/S41ScheduleCalendar.tsx
  - balencia-screens/src/components/hifi/screens/today/S44WaterIntake.tsx
  - balencia-screens/src/components/hifi/screens/today/S45DailyCheckin.tsx
output: plans/batches/VISUAL-007-C1-today-missions/evidence/repair-b-schedule-water-checkin.md
```

## Objective

Repair `AT-01/02/03/04`, `C1-CC-02/03/04`, and `C1-DS-002/003` within three owned screens. No shared-kit or verifier edits.

## Required sources

- Root/lane `AGENTS.md`
- `41-schedule-calendar.md`, `44-water-intake.md`, `45-daily-checkin.md`
- C1 `BATCH.md`, `VERIFICATION-MATRIX.md`
- `evidence/review-code.md`, `review-design-source.md`, `review-accessibility-trust.md`
- Current owned sources and relevant read-only kit patterns (S59/S73 dialogs may be inspected, not edited)

## Required repairs

### S41

1. Make Day/Week/Month content-bearing and truthful. A selected non-Thursday date must not retain Thursday's timeline under a contradictory heading: key day content to the selected date, or show an explicit in-viewport honest-null fixture for days without events. Week/Month may use compact bundled summaries, but selection must change the rendered population.
2. Cold-start calendar consent must give Connect and Not now equivalent geometry and comparable secondary visual weight; neither path may be visually coerced. Preserve consent scope/retention copy.
3. Keep schedule/current event in the initial default viewport, existing provenance/population distinctions, and reduced-motion behavior.

### S44

4. Replace/upgrade delete confirmation to a canonical phone-bound modal dialog: exact target, `aria-modal`, initial Cancel focus, contained Tab/Shift+Tab, Escape cancels, Cancel restores connected trigger, confirming deletion focuses a surviving Undo/fallback when the trigger disappears.
5. Reconcile the weekly honest-null day: current data puts `null` at Thursday, while visible/AT copy says Wednesday. Derive or align all three.

### S45

6. Empty/cold-start must contain no fabricated direct input: no pressed mood, no selected context, energy/stress unset with honest-null prompts/ghost treatment, no `You logged` provenance, Save disabled with a visible reason until a mood is selected.
7. Cancel must perform the approved same-origin sheet exit (not merely change status). Successful save/retry must transition to an exclusive success state and remove the error surface; a continuing failure must never coexist with success.
8. Preserve one passive CIA orb, safety/data controls, range semantics, local-only/offline truth, and existing S45 valid/default behavior.

### Family local typography

9. Raise every meaning-bearing text token in these files to AA contrast and every semantic label to `>=12px` per the frozen matrix. Do not change decorative icon-only opacity.

## Verification / boundaries

- Run targeted ESLint for owned files and `npx tsc --noEmit` if time permits; do not run/stop servers.
- Edit only the three owned product files plus the output report, using `apply_patch`.
- Do not edit verifier/shared kit/CSS/registry/batch/review files, S12, accepted-family screens, `yhealth-app`, Figma, Railway, or git state.

## Output contract

Write the output report with per-finding disposition, changed behavior, commands/results, and residual risks. Return a concise summary; Sol independently verifies.
