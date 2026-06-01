# Run Checks

Run route and quality checks before closing a batch.

```bash
cd balencia-screens
npm run verify:routes
npm run check
```

`npm run check` includes lint, typecheck, route verification, asset verification, copy verification, and brand verification.

For the A++ re-review:

- Run `npm run verify:routes` and `npm run check` before R01.
- Run `npm run check` before closing every R batch.
- Run `npm run build` before closing R03, R06, R09, R12, R15, and R18.
- Record exact command results in the active R batch.
