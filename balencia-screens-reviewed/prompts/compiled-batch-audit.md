# Compiled Batch Audit Prompt

Use this prompt for every future Balencia audit session.

````md
We are starting the next Balencia UX audit session.

Use the audit workspace at `balencia-screens-reviewed/` and follow:
- `balencia-screens-reviewed/AGENTS.md`
- the active batch file in `balencia-screens-reviewed/batches/`
- `balencia-screens-reviewed/skills/balencia-screen-audit/SKILL.md`
- `balencia-screens-reviewed/skills/balencia-screen-audit/references/session-workflow.md`

Important output requirement:
- Treat `balencia-screens-reviewed/batches/batch-01.md` as the canonical quality bar.
- For the A++ re-review, use `balencia-screens-reviewed/a-plus-plus-review/RXX-*.md` as the active batch file.
- The active batch file must become the compiled audit artifact.
- Do not leave the batch as a thin summary with separate notes elsewhere.
- For every reviewed screen, write directly into the active batch file:
  - five-second read
  - primary action clarity
  - emotional tone
  - screenshot path
  - visible control inventory with purpose and state
  - all eight rubric scores with notes
  - A++ grade and grade-cap reason when not A++
  - findings table with evidence, user impact, recommendation, status
  - decision line
- Add every new A++ finding to the active R batch and the A++ rollup. Use fresh IDs like `R01-F01`; do not overwrite historical `Bxx` or `Pxx` evidence.
- Add unresolved product/legal/scope questions to `findings/deferred-decisions.md`.
- Only mark the batch `reviewed` after the compiled audit matches Batch 01-level depth and every screen has fresh evidence.

Start the `balencia-screens` server with:

```bash
cd balencia-screens
npm run dev
```

If port 3000 is in use, use the URL printed by Next.js and record it in the batch file.
````
