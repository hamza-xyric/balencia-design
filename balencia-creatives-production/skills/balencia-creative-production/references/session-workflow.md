# Session workflow

## Start

1. Confirm batch in `batches/index.md` recommended order (CP-00 → CP-01 → …).
2. Open `batches/CP-XX-*.md`; verify decision gates.
3. Select ≤6 briefs; copy template to `briefs/{id}.md`.
4. Optional: `npm run dev` in `balencia-screens` for placement check.

## Per-brief loop

1. Complete brief (placement, prompt, model, ratio).
2. `get_cost: true` preflight.
3. Generate 1–4 variants.
4. Poll `job_status` until terminal state.
5. Save to `outputs/<package>/<brief-id>/`.
6. Score creative rubric + brand gates.
7. Update batch `### Brief ID` section.
8. If accepted → `ledger/accepted-assets.md`.

## Close

1. Session summary in batch file.
2. Ledger complete.
3. Batch status `session-closed` or sub-session note for CP-07/08.
4. Flag open CQ items.

## Large batches

CP-07 (P1) and CP-08 (P2) use **sub-session labels** (e.g. CP-07a). One close per sub-session; whole CP batch may stay `in_progress` until all sub-sessions done.
