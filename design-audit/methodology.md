# Methodology — A++ Premium-Craft Elevation

How a screen's grade in `REPORT.md` is produced and how its craft is remediated. Mirrors `viz-audit/methodology.md`, broadened from visualization to **all** craft dimensions.

## Principles

1. **Spec-first.** The fix is written into the screen's **`## Premium Craft`** section in `app_design 3/NN-*.md` — design intent, not code. The rendered build is a later **craft-build** program (`HANDOFF.md`).
2. **Build on the prior work, don't redo it.** A data screen's existing `## Visualization` section (A−) stays; we build *up*. The R-pass readiness fixes (I01–I06, done) are assumed; we add the craft layer they didn't measure. The original spec sections are elevated and **reconciled**, not rewritten from scratch.
3. **Kit-first.** Every craft move resolves to a `CRAFT-KIT.md` pattern (or `VIZ-KIT` for data). If it doesn't exist, log a `CK-P##` / `CK-T##` and add it to the kit — never invent per-screen.
4. **Grade against the premium bar, not the current draft.** Placeholder copy / a flat surface / a missing focal point is the finding, even if "it's clear enough."
5. **Honest premium bar.** A++ is rare by design. **Do not inflate.** Record an honest **pre**-grade and only the **post**-grade the written section actually earns.
6. **Single writer.** Read-only reviewer agents may pre-grade and surface findings; **the writer owns every spec edit and verifies on disk** (not just agent returns). This is what kept the viz-audit QA pass from drifting.

## Per-screen pipeline

For each screen in a batch:

1. **Read fully:** the spec end-to-end + `_shared-patterns.md` (the patterns it cites) + `Design-System-Overview.md` §3/§5/§6/§8/§9 + the screen's prior **R-finding** (`balencia-screens-reviewed/a-plus-plus-review/`) + (data screens) its `## Visualization` section.
2. **Profile + benchmark:** confirm the profile (`screen-classification.md`); name the cluster benchmark (`benchmark-matrix.md`) + one line on how it stays Balencia.
3. **Honest pre-grade:** score all 14 `RUBRIC.md` dimensions under the profile's weights; compute the weighted overall; apply caps; record the letter. Log each deduction as a `S##-C##` finding (severity + fix-pointer → kit pattern/token + target spec section).
4. **Ethics + anti-generic pass:** explicitly check non-shaming framing / no dark patterns, then read the copy aloud and squint-test the layout (the anti-generic gate, dim 14).
5. **Write `## Premium Craft`** (the `CONSISTENCY.md §6` template) + **reconcile** the existing sections it changes (Color Map, Motion, Typography, Interaction States, Empty States, Components) so the spec stays internally self-consistent — the viz-audit's ~300-reconciliation lesson.
6. **Determinism gate:** the section is not `specced` until every craft value is concrete + token-backed (`CONSISTENCY.md §8`). Absent tokens → `CK-T##` / cited `VK-017`.
7. **Post-grade:** re-score; record pre→post in `REPORT.md`; mark `S##-C##` findings `specced`.

## Honest re-grade rules

- **Pre** = the screen as it stands *before* this section (the original spec + any `## Visualization`), graded against the full A++ bar — not the readiness-A++ the R-pass gave it.
- **Post** = what the written `## Premium Craft` section + reconciled spec earns at the **spec level** (target A++ 95–97; A+++ is the build residual).
- Caps bite: no A++ with anti-generic or signature < B, with an open High, or with a degenerate cold-start; copy/shaming Criticals cap at B.
- If a screen genuinely can't reach A++ spec-level without a product/scope decision (e.g. 40 Community's room flows), record the **decision need** and grade honestly — don't stretch.

## Batch procedure

1. Pre-grade all screens in the batch (read-only reviewers may fan out; writer verifies).
2. Write + reconcile each `## Premium Craft` section (single writer).
3. **Cross-screen consistency check** within the batch (shared components/copy/depth described identically; `scripts/consistency-check.mjs`).
4. Update `REPORT.md` (scorecard rows, pre→post, band distribution), append `findings-ledger.md`, write a `history/<date>-<sha>.md` snapshot.
5. **Checkpoint** with the founder (a real gate after Batch H; lightweight after each cluster batch).

## Artifacts (the only writes — all local files)

`app_design 3/NN-*.md` (the `## Premium Craft` section + reconciliations) · `design-audit/REPORT.md` · `findings-ledger.md` · `history/<date>-<sha>.md` · the kit files when a `CK-##` is minted.

## Remediation boundary (the later craft-build program)

This program stops at `specced`. The build program mints `CK-T##` + `VK-017` tokens in `globals.css`, builds the kit patterns/primitives, implements each `## Premium Craft` section in `balencia-screens/`, keeps `npm run check` green (esp. `verify:brand` / `verify:copy`), and re-runs this methodology to advance findings `specced → built → resolved` and re-grade toward a rendered A+++. See `HANDOFF.md`.
