# Craft-Audit → Craft-Build Handoff

Input contract for the later **craft-build** program (the `figma-build-fixer` analog to this spec-first audit). Populated as batches complete; finalized at DoD.

## What this program delivers (spec-first) — COMPLETE

- A **`## Premium Craft`** section on every one of the 90 specs — A++ design intent across all 14 craft dimensions (**A++ ×90, mean 95.9, 0 below-bar**; honest re-grade with a focused lift pass on 02/21/46/77).
- An honest **pre→post** grade trail (`REPORT.md`) + `findings-ledger.md`.
- A locked **`CRAFT-KIT.md`** (8 `CK-P` patterns + 5 `CK-T` token gaps — held across all 90 screens) + **`CONSISTENCY.md`** (locked params + section template). Determinism gate clean (90 sections, 0 fails).

> **Reconciliation residual (build input, not a silent gap):** the `## Premium Craft` section is the **authoritative craft layer** for each screen and closes with *"Conform to `design-audit/CONSISTENCY.md`."* Where a screen's legacy Color-Map / Typography / Interaction / Components tables still describe the pre-craft treatment (raw hex, ad-hoc line-heights, the old focal order), **the section supersedes them** and the per-screen ledger entry flags the count of table-level reconciliations deferred. The build rebuilds those tables/visuals from the section + `globals.css` tokens, so the lag resolves at build time. The Home pilot (12) shows the fully-reconciled end state (its 2 contradictions were fixed in-place).

## What the build program must do

1. **Mint the missing tokens in `balencia-screens/src/app/globals.css`:**
   - This program's `CK-T##`: `--edge-highlight`, `--surface-backplate`, `--focus-ring`, `--leading-*`, `--tracking-*` (values in `CRAFT-KIT.md`).
   - The viz-audit's `VK-017` depth tokens (`--orange-light`, `--grad-orange`, `--grad-progress`, `--track-inset`, `--glow-orange-md/-sm` + green/purple siblings, `--stroke-thin/base/bold/poster`).
   - Resolve `CK-F00`: retire the stale teal `--grad-progress` from `_shared-patterns.md`; use the `VK-017` orange→green definition.
2. **Build the kit:** the `CRAFT-KIT` patterns (`CK-P1`–`CK-P8`) + the 19 `VIZ-KIT` primitives.
3. **Implement each screen's `## Premium Craft` + `## Visualization`** in `balencia-screens/`, composing the kit; author the named copy strings.
4. **Keep `npm run check` green** — `verify:brand` (60/30/10 + tokens) and `verify:copy` (UI copy matches spec) especially; add `verify:visual` snapshots where useful.
5. **Re-run this methodology** to advance findings `specced → built → resolved` and re-grade toward a rendered A+++.

## Guardrails (inherited + craft)

- Conform to `CONSISTENCY.md` locked params (a drift is a finding).
- The viz-audit's consolidated rules hold (calibrated red; orange data-ink / domain-identity; purple = SIA; draw-not-fade; no-data ≠ zero; non-shaming; no dark patterns; AA + 1.4.11 + 44pt).
- Glow calibrated by size (never neon); warm-on-warm depth; one ownable Balencia moment per screen.

## Inputs

`design-audit/REPORT.md` · `findings-ledger.md` · `CRAFT-KIT.md` + `CONSISTENCY.md` · the `## Premium Craft` + `## Visualization` sections per spec · `viz-audit/` (the data layer + `VK-017`).
