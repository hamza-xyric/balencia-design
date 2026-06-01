# Close creative production session

## 1. Batch file

In the active `batches/CP-XX-*.md`:

- Fill **Session summary** (accepted, iterate, deferred, credit total)
- Complete every worked brief’s `### Brief ID` section with QA table and decision
- Run completion gate checklist

## 2. Ledgers

- [../ledger/generation-ledger.md](../ledger/generation-ledger.md) — all jobs from this session
- [../ledger/accepted-assets.md](../ledger/accepted-assets.md) — only `accepted` finals, with metadata path, source, alt text, and fallback note

## 3. Registry (optional)

Set `status` on worked opportunities in `registry/opportunities.json`:

- `in_progress` | `accepted` | `deferred` | `not_started`

## 4. Open questions

Move unresolved CQ items or new questions to [../decisions/creative-decisions.md](../decisions/creative-decisions.md).

## 5. Status

- Sub-session complete → note in CP-07/CP-08 file; set `session-closed` for that sub-session label
- Entire batch complete → batch status `session-closed`
- Partial → keep `in_progress` and list remaining brief IDs in session summary

## 6. Handoff

If assets are accepted and user wants prototype integration:

- Copy files to `balencia-screens/public/` per paths in accepted-assets
- Confirm each accepted asset has `metadata.json` with source/license, alt text, reduced-motion fallback where applicable, and final integration path
- Run `npm run check` in `balencia-screens` after integration (user-requested only)

## 7. Next session

Point to next batch or sub-session in [../batches/index.md](../batches/index.md).
