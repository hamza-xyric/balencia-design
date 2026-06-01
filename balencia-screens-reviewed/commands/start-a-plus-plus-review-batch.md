# Start A++ Review Batch

Use this command for one audit-only re-review batch.

```md
Batch: R01

Please review the A++ batch named above.

Derived paths:
- Active batch: `balencia-screens-reviewed/a-plus-plus-review/R01-*.md`
- A++ index: `balencia-screens-reviewed/a-plus-plus-review/index.md`
- Final rollup: `balencia-screens-reviewed/a-plus-plus-review/final-rollup.md`
- Original audit batches: `balencia-screens-reviewed/batches/`
- Update batches: `balencia-screens-reviewed/update-batches/`
- P-batch notes: `balencia-screens-reviewed/screen-iteration-batches/`
- Resolved decisions: `balencia-screens-reviewed/findings/deferred-decisions.md`
- Design specs: `app_design 3/`
- Prototype app: `balencia-screens/`

Workflow:
1. Read the active R batch, matching old batch, update batch, P-batch notes, source specs, shared patterns, design direction, and route files.
2. Start the prototype and record the actual base URL.
3. Capture fresh evidence under `balencia-screens/output/a-plus-plus-review/RXX/`.
4. Review one route at a time for screen purpose, five-second clarity, visible control purpose, visual/UI quality, UX, accessibility, trust/privacy, mobile ergonomics, and Figma readiness.
5. Record the grade, grade cap, findings, and decision before moving to the next screen.
6. Do not edit `balencia-screens` or `app_design 3` during this audit-only pass.

Verification:
- Run `npm run check` from `balencia-screens` before closing each R batch.
- Run `npm run build` for R03, R06, R09, R12, R15, and R18.
- Use `verify:visual` as supplemental evidence for high-risk layouts; it does not replace per-screen evidence.
```
