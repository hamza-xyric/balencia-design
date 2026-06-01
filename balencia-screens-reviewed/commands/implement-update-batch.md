# Implement Update Batch

Copy this prompt into a new session and change only the batch number on the first line.

```md
Batch: U01

Please implement the update batch named above.

Derive all paths from the batch value:
- Batch tracker: `balencia-screens-reviewed/update-batches/batch-u01.md`
- Source audit ledger: `balencia-screens-reviewed/findings/findings-ledger.md`
- Resolved decisions: `balencia-screens-reviewed/findings/deferred-decisions.md`
- Design specs: `app_design 3/`
- Prototype app: `balencia-screens/`

Important: replace the lowercase tracker path suffix from the `Batch:` value. For example, `Batch: U07` means `batch-u07.md`.

Workflow:
1. Read the batch tracker first, then the referenced audit batches, ledger findings, resolved decisions, and matching `app_design 3` specs.
2. Treat each spec's `Audit Feedback Integration (2026-05-26)` section as the current implementation contract. If older spec text conflicts with that section, the audit integration section wins.
3. Update `app_design 3` only if the batch tracker or audit evidence reveals missing, stale, or unclear contract details.
4. Implement the matching `balencia-screens` prototype routes for this batch. Work in smaller route groups when interaction logic is heavy.
5. Prioritize critical conversion, navigation, retention, trust/privacy, accessibility, and mobile ergonomics findings before visual polish.
6. Do not touch unrelated batches or revert existing user changes.
7. Preserve the existing Balencia visual system, route registry, and component patterns.
8. If a finding is too large for this pass, mark it explicitly as deferred in the batch tracker with the reason.

Verification:
- Run `npm run check` inside `balencia-screens`.
- Use browser QA for affected routes.
- Verify primary actions, disabled/enabled states, touch targets, privacy/consent states, and route transitions.

When done, update the batch tracker with:
- implementation status
- changed prototype routes/files
- findings addressed
- findings deferred, if any
- verification results
```

