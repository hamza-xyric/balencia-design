# P00 - Foundation Readiness

- Status: `implemented`
- Scope: repo-wide readiness before screen polish begins
- Sources: `../update-batches/batch-u01.md` through `batch-u09.md`, `../findings/deferred-decisions.md`, `../../balencia-screens/package.json`
- Build gate: required

## Goals

- Fix the production build blocker on `/auth/reset-password`.
- Resolve the image-viewer raw `<img>` lint warning by using `next/image` while preserving accessible real-media output.
- Reconcile stale update-batch verification notes so future agents start from today's truth.
- Establish the command baseline for every later P batch.

## Implementation Tasks

- Move `useSearchParams()` in `src/app/auth/reset-password/page.tsx` behind a Suspense boundary with a small branded fallback.
- Convert `src/app/features/image-viewer/page.tsx` to `next/image` with `unoptimized` data-URI rendering and preserved alt text.
- Update update-batch docs where they still report old blockers that are no longer true after P00 verification.
- Keep existing broad user changes intact.

## Acceptance Gates

- `npm run check` passes from `../../balencia-screens`.
- `npm run build` passes from `../../balencia-screens`.
- `VISUAL_AUDIT_BASE_URL=http://localhost:3005 npm run verify:visual` passes against the active local prototype, or the actual active local URL is recorded.
- `../update-batches/index.md` points future work to this slow iteration layer.

## Verification Results

- `npm run check` in `../../balencia-screens`: passed on 2026-05-26.
  - Lint passed with no image-viewer `<img>` warning after conversion to `next/image`.
  - Typecheck, route verification, asset verification, copy verification, and brand verification passed.
- `npm run build` in `../../balencia-screens`: passed on 2026-05-26.
  - `/auth/reset-password` now prerenders after moving `useSearchParams()` behind Suspense.
  - Build emitted only the Node `module.register()` deprecation warning from the toolchain.
- `VISUAL_AUDIT_BASE_URL=http://localhost:3005 npm run verify:visual`: passed on 2026-05-26 after allowing headless Chrome.
  - Visual audit covered 41 high-risk and bottom-action routes.

## Close Notes

- Changed `src/app/auth/reset-password/page.tsx` to wrap the query-param-dependent reset UI in a Suspense boundary with a branded fallback.
- Changed `src/app/features/image-viewer/page.tsx` from raw `<img>` to `next/image` with `unoptimized` data-URI rendering and preserved alt text.
- Normalized update-batch statuses to `prototype-implemented` and superseded stale blocked-check notes with P00 verification results.
- P01/P02 should still do full auth browser traversal; P00 only cleared the foundation gates.

## Final Audit Follow-up - 2026-05-26

- Final cross-batch audit revalidated the P00 foundation gates after P01-P09 screen polish and follow-up fixes.
- `npm run check` passed from `balencia-screens`, including lint, typecheck, route/spec verification, asset verification, copy verification, and brand verification.
- `npm run build` passed from `balencia-screens`; the build emitted only the existing Node `DEP0205` deprecation warning from the toolchain.
- `VISUAL_AUDIT_BASE_URL=http://localhost:3005 npm run verify:visual` passed after the sandbox-blocked Chrome run was rerun with browser permissions.
- Final report and evidence are recorded in `../final-cross-batch-audit.md` and `../../balencia-screens/output/final-audit/`.
