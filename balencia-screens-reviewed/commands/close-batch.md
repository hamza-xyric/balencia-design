# Close Batch

Before a batch is complete:

1. Use `batches/batch-01.md` as the concrete quality reference.
2. Confirm every reviewed screen has a full compiled section in the active batch file:
   - five-second read
   - primary action clarity
   - emotional tone
   - screenshot path or visual evidence note
   - visible control inventory and purpose note
   - all eight rubric scores with notes
   - A++ grade and grade-cap reason when the screen is not A++
   - findings table, or a deliberate `No major findings` row
   - decision line
3. Add all issues to `../findings/findings-ledger.md`.
4. Move accepted items to `../findings/accepted-improvements.md`.
5. Move unresolved but valid questions to `../findings/deferred-decisions.md`.
6. Add a batch summary with:
   - ship-ready screens
   - must-fix screens
   - redesign candidates
   - questions for the user
7. Mark the batch `reviewed` only after the compiled audit is complete.

Do not start improvements until the batch review is closed.

## A++ Re-Review Close Gate

For files in `a-plus-plus-review/`, do not mark a screen `A++` unless:

- all eight dimensions score `5`
- fresh evidence is linked
- every visible control has a clear purpose and acceptable state
- no unresolved `critical`, `major`, or `minor` findings remain
- Figma handoff notes do not contain unresolved product, privacy, navigation, or monetization decisions
