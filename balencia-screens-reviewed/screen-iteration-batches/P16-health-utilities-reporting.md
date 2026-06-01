# P16 - Health Utilities And Reporting

- Status: `closed`
- Screens: `60`, `61`, `62`, `63`, `64`
- Routes: `/features/medication`, `/features/reminders`, `/features/quick-notes`, `/features/energy`, `/features/report-block`
- Sources: `../batches/batch-16.md`, `../update-batches/batch-u08.md`
- Build gate: no

## Focus

Verify health utilities have real semantic controls and report/block remains safety-first.

## Review Checklist

- Confirm medication, reminders, quick notes, and energy logging are stateful enough in-session.
- Confirm Quick Notes prioritizes capture-first UX.
- Confirm Report/Block keeps blocking default off and uses real radio/textarea/success/error states.

## Required Close Evidence

- Browser QA for health utility mutations and report/block flow.
- `npm run check` result.

## Close Summary (Wave 3, 2026-05-27)

R16-F01 through R16-F05 inspected against current source — all addressed in prior implementation passes:

- 60 Medication (R16-F05): `add`, `list`, and `detail` sheets in `MedicationSheetFrame` are now distinct, with the Add sheet exposing real form inputs + reminder offset chips, the list sheet showing tracked count and adherence, and the detail sheet showing schedule, reminder switch, dose history, interaction note, and privacy lock.
- 61 Reminders (R16-F01/F02): React keys are namespaced (`${section}-${item.title}`) and `completed` is deduped on init. Add CTA opens a real task/reminder dialog with title + time/cadence inputs and disabled-save validation. `nextReminderCopy()` keeps reminder row copy synchronized when toggled (the paused medication reminder now switches to `next: 9:00 PM tonight`).
- 62 Quick notes: confirmed A++ — search, tag filters, disabled-empty send, save flow all intact.
- 63 Energy (R16-F03): trend tabs now use a single `<SegmentedControl>` with one tablist (`Energy trend range`); no duplicate overlay.
- 64 Report/block (R16-F04): radio rows now expose `role="radiogroup"` + `role="radio"`, the block switch is full-row tappable, the sheet anchors to `inset-x-0 bottom-0` with safe header, and `dismissed`/`success` replace the sheet with explicit status panels.

Verification: `npm run check` passed (lint, typecheck, verify:routes, verify:assets, verify:copy, verify:brand). Headless Playwright capture (`scripts/capture-p16-p18-states.mjs`, evidence at `balencia-screens/output/p16-p18-states/evidence.json`) navigated all five P16 routes against `http://localhost:3000` with **0 page errors and 0 console warnings** across the batch. Targeted state evidence: reminder toggled copy now reads `Medication daily 9:00 PM - next: 9:00 PM tonight` (R16-F02); energy `tablist-count = 1` (R16-F03); report/block submit is disabled by default, enables after radio selection, block switch `aria-checked = "false"` at start, and success state replaces the sheet (R16-F04).
