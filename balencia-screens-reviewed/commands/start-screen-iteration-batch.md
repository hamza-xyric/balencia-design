# Start Screen Iteration Batch

Use this prompt to start one slow polish batch.

```md
Batch: P01

Please implement the screen iteration batch named above.

Derive all paths from the batch value:
- Batch tracker: `balencia-screens-reviewed/screen-iteration-batches/P01-auth-entry-consent.md`
- Batch index: `balencia-screens-reviewed/screen-iteration-batches/index.md`
- Original audit batches: `balencia-screens-reviewed/batches/`
- Update batches: `balencia-screens-reviewed/update-batches/`
- Resolved decisions: `balencia-screens-reviewed/findings/deferred-decisions.md`
- Design specs: `app_design 3/`
- Prototype app: `balencia-screens/`

Workflow:
1. Read the active P batch first, then its original audit batch, update batch, matching screen specs, and current route files.
2. Treat each spec's `Audit Feedback Integration (2026-05-26)` section as the implementation contract when older spec text conflicts.
3. Browser-review one route at a time for premium feel, five-second clarity, primary action clarity, touch targets, copy, trust/privacy, accessibility, and route behavior.
4. Implement only fixes for this P batch. Do not touch unrelated batches or revert existing user changes.
5. Prefer existing Balencia components, route patterns, mock data, and dark-first visual language.
6. Record any finding too large for the pass as deferred with a concrete reason.

Verification:
- Run targeted browser QA for the included routes.
- Run `npm run check` inside `balencia-screens`.
- If the active P batch has `Build gate: required`, run `npm run build`.

When done, update the active P batch with:
- implementation status
- changed files
- findings addressed
- findings deferred
- browser QA evidence
- verification results
```

For P00, use `P00-foundation-readiness.md` and run all required gates before starting any polish batch.
