# Next session — A++ Premium-Craft Elevation

**STATUS: PROGRAM COMPLETE (2026-06-02).** All 90 specs carry a `## Premium Craft` section — **A++ ×90, mean ≈ 95.9, 0 below-bar**. Foundation + Batch H + B01–B18 rollout + QA lift pass all done. Determinism gate clean (90 sections, 0 fails). Plan: `/Users/hamza/.claude/plans/zippy-moseying-sutherland.md`. Full status: `design-audit/REPORT.md`.

**Do next — the craft-build program** (`design-audit/HANDOFF.md` is the input contract):
1. Mint the `CK-T##` (edge-highlight, surface-backplate, focus-ring, leading-*, tracking-*) + `VK-017` depth tokens in `balencia-screens/src/app/globals.css`; resolve `CK-F00` (retire the stale teal `--grad-progress`).
2. Build the kit — the 8 `CK-P` patterns + the 19 `VIZ-KIT` primitives.
3. Implement each screen's `## Premium Craft` + `## Visualization` in `balencia-screens/`; **rebuild the lagging Color-Map / Typography / Interaction tables from the authoritative section** (this resolves the reconciliation residual); author the named copy strings.
4. Keep `npm run check` green (`verify:brand` + `verify:copy`); re-run the methodology to advance findings `specced → built → resolved` and re-grade toward a rendered A+++.

**Optional spec-side cleanup pass (if desired before build):** a dedicated reconciliation pass that, per spec, rewrites the legacy tables to match the `## Premium Craft` section (the Home spec [12] is the fully-reconciled exemplar). Bounded; the build absorbs it otherwise.

**Tooling left in place (reusable):** `/tmp/commit_chunk.py` (draft→clean→gate→insert), `/tmp/update_report.py` (REPORT+ledger), `/tmp/replace_section.py` (section swap), and `design-audit/scripts/consistency-check.mjs` (determinism gate). The reviewer→single-writer workflow script persists under the session's `workflows/scripts/`.
