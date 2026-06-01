# Session Workflow

## Start

1. Open the active batch file.
2. Confirm the active session has no more than 12 screens.
3. Start the prototype:

```bash
cd balencia-screens
npm run dev
```

4. Keep the relevant spec file open beside the live route.
5. Use `batches/batch-01.md` as the output reference for depth and structure.

## Per-Screen Loop

For each screen:

1. Read the spec purpose and information architecture.
2. Open the live route.
3. Do a five-second read:
   - What is this screen?
   - What should the user do?
   - Is the next step obvious?
4. Review product sense before visual polish.
5. Score each rubric dimension from 1 to 5.
6. Inventory visible controls and record whether each control works, is honestly disabled, is decorative/static, or needs documented Figma behavior.
7. Assign the A++ re-review grade when applicable, including a grade-cap reason when the grade is not A++.
8. Record findings with evidence and a recommendation.
9. Add the complete screen note to the active batch file immediately:
   - five-second read
   - primary action clarity
   - emotional tone
   - screenshot path
   - visible control inventory and purpose
   - full rubric table
   - grade and grade cap
   - findings table
   - decision line
10. Add ledger rows for every finding.
11. Decide: A++, needs polish, redesign candidate, or needs user decision.

## Close

1. Confirm every reviewed screen has a complete compiled section in the active batch file.
2. Confirm all issues are represented in `findings/findings-ledger.md`.
3. Move accepted work to `findings/accepted-improvements.md`.
4. Move unresolved questions to `findings/deferred-decisions.md`.
5. Summarize the batch.
6. For A++ batches, update `a-plus-plus-review/index.md` and `a-plus-plus-review/final-rollup.md`.
7. Only then mark the batch `reviewed`.
8. Run checks if implementation files were touched:

```bash
cd balencia-screens
npm run verify:routes
npm run check
```
