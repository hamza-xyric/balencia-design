---
name: figma-build-fixer
version: 1.0.0
description: "Remediate Balencia Figma DS audit findings — read figma-build-audit/REPORT.md + findings-ledger.md and FIX the open issues to a premium A+++ bar across the Figma DS file (XF2diepp3IfcWuDWHwL4ez), the source-of-truth docs (globals.css, figma-tokens-map.json, figma-mapping.json), and the React prototype. Two-phase: produces a FIX-PLAN.md dry run first, then applies on approval with before/after screenshots, re-audit, and a FIX-LOG. Triggers on: fix the figma audit findings, remediate the design system, apply the audit fixes, fix the DS issues, /figma-build-fixer, resolve the audit findings, fix the figma components."
---

# Figma Build Fixer

The **write** companion to `/figma-build-auditor` (which is read-only). You read the audit findings and fix them to the premium **A+++** bar — no corner-cutting, no watering-down. You write to three layers: the **Figma DS file**, the **source-of-truth docs**, and the **React prototype**.

## Operating contract
- **Plan before you write.** Default run is a **dry run** that produces `figma-build-audit/FIX-PLAN.md`. Make **zero** changes until the user approves and re-invokes with `--apply`. Never write in plan mode.
- **Verify before you fix.** The ledger is a pointer, not gospel. Before touching anything, re-read the **live** Figma state (`get_variable_defs` / `get_metadata`) and the current `figma-mapping.json` IDs. Drop findings already resolved. *(The audit once claimed alpha-white tokens needed minting — they already exist; always check.)*
- **Decide + document.** On judgment calls, make the premium-best decision from the React source + `app_design 3/_shared-patterns.md`, apply it, and log the rationale in `FIX-LOG.md` so it's reversible.
- **Close the loop.** After applying, re-run `/figma-build-auditor` on the touched scope, confirm the grade rose and the finding is gone, mark the ledger `resolved`, update `REPORT.md` + `history/`.
- **Never** fix the empty Screens consumer file (`jxoChLrvjIdHQh9Q95SHpi`, Phase 4) or components not yet built.

## Key facts
- **DS file:** `XF2diepp3IfcWuDWHwL4ez`. Pages: Atoms `17:11`, Molecules `17:12`, Organisms `17:13`, Foundations `17:3`.
- **Existing variables (verify in `figma-mapping.json.ds_variables`):** alpha-white family `color/alpha/white-{05,06,08,10,15,20,25,30,35,40,50,60,70,80,100}` (Primitives collection, intrinsic-alpha); radius `radius/{xs,sm,md,lg,xl,2xl,pill}` (`xs`=`VariableID:9:2`, 6px); `--color-paper-100` = warm white. So most token-leakage fixes are **rebinds to existing vars**, not new tokens.
- **Inputs:** `figma-build-audit/REPORT.md`, `findings-ledger.md`, `RUBRIC.md`.

## Arguments
`<finding-id | component | batch>` (e.g. `X-001`, `TierCard`, `3C`) · `--all` · `--plan` (default, dry run) · `--apply` (execute the approved plan).

---

## Phase A — PLAN (default; zero writes)

1. Load `RUBRIC.md`, `REPORT.md`, `findings-ledger.md`; collect open findings in scope (`status: open`).
2. **Verify each against live Figma** (read-only): confirm the raw value / missing state still exists; capture the exact node ids + paint indices. Re-read target variable IDs from `figma-mapping.json.ds_variables`. Discard stale findings (note them).
3. **Classify** each finding:
   - **mechanical** — rebind a raw paint to an existing variable; rebind a raw radius; `#fff`→`paper-100`.
   - **structural** — add a missing variant/state (clone + patch).
   - **source-of-truth** — globals.css token add, token-map regen, mapping reconcile.
   - **judgment** — needs a design decision (propose it + rationale).
4. **Order by dependency** (see below).
5. Write `figma-build-audit/FIX-PLAN.md`: a table of `finding-id → layer(s) → exact write op (node, property, source value → target variable + VariableID) → mechanical/judgment tag → proposed decision (if judgment)`. Print a summary. **Do not change anything.** Recommend the user **name a Figma version checkpoint** before approving.

## Phase B — APPLY (`--apply`, after approval)

Execute in this dependency order, verifying as you go:

### B1 · Source of truth first
- Add the alpha-white tokens (+ any other Figma-only tokens) to `balencia-screens/src/app/globals.css` so the CSS matches the Figma family (additive; preserves existing values).
- Regenerate `balencia-screens/scripts/figma-tokens-map.json` so the self-referential `rgba(...)` entries become real token mappings.
- Reconcile `figma-mapping.json` naming drift (X-002: pick one canonical name for `ScreenShell` / template + `PhoneFrame`).
- Run `node figma-build-audit/scripts/consistency-check.mjs` → must show no token-map / index drift before proceeding.

### B2 · Figma DS rebinds (mechanical) — **load `/figma-use` skill first**
For every `use_figma` call, **`fileKey: XF2diepp3IfcWuDWHwL4ez`**. Apply:
- Raw `rgba(255,255,255,0.x)` paint → bind the matching `color/alpha/white-NN` variable. These are **intrinsic-alpha → NO paint-multiplier fix-up** needed.
- Raw `6px` corner → `radius/xs`; raw `10px` → `radius/sm` (`setBoundVariable` on the corner properties).
- Pure `#ffffff` text where the spec wants warm white → `color/paper-100` (X-005, decide+document).
Re-read each node's `boundVariables` after binding to confirm it took.

### B3 · Figma structural fixes (judgment)
- Where the React source is interactive but the Figma component is a single `[doc]` variant, add the missing state variant (X-004 / C-007: HealthMetricsStrip Pressed = `scale-95`). Use **clone + patch** then `combineAsVariants`; re-apply `primaryAxisSizingMode='AUTO'` after any `resize()`.

### B4 · Prototype refactor
- Replace arbitrary `white/[0.0x]`-style Tailwind values in `balencia-screens/src/components/**` with the new token utilities.
- `cd balencia-screens && npm run check` (lint, typecheck, verify:routes/assets/copy/brand) — **must pass**. Fix until green.

### B5 · Verify + close the loop
- `get_screenshot` before/after each touched component (record URLs in the log).
- Re-run `/figma-build-auditor <scope>` → confirm the dimension grade rose and the finding no longer appears.
- Mark resolved findings `resolved` in `findings-ledger.md` (add resolving SHA). Update `REPORT.md` (trend delta) + write `history/<date>-<sha>.md`.
- Write `figma-build-audit/FIX-LOG.md`: every write (layer, node, before → after), every judgment decision + rationale, before/after screenshot URLs, and the re-audit result.

---

## Write-API guardrails (verified project gotchas — follow exactly)
- `fileKey` on **every** Figma MCP call (omitting → `-32602`, no-op).
- `getVariableByIdAsync` needs the **`VariableID:`** prefix; use a defensive helper. Re-read IDs from `figma-mapping.json` — don't trust a static list.
- Fills/strokes bind via **`figma.variables.setBoundVariableForPaint(paint,'color',v)`** then reassign `node.fills=[paint]` — **never** `setBoundVariable('fills',…)` (throws).
- **Intrinsic-alpha whites need NO opacity fix-up.** Only full-opacity colours tinted (e.g. domain @0.15) need the read-modify-write `node.fills=node.fills.map(p=>({...p,opacity:0.15}))` fix-up.
- Radius/spacing bind via **`setBoundVariable`** directly (`topLeftRadius`/…/`cornerRadius`, `itemSpacing`, `padding*`).
- Re-apply `primaryAxisSizingMode='AUTO'` after `resize()` on HUG containers; set `minHeight`/`maxHeight` **after** `appendChild`.
- Don't set `fontName` after `setTextStyleIdAsync` (breaks the style link).
- Inner blocks via `createAutoLayout()` (FRAME), not nested `createComponent()`. `combineAsVariants` needs all-COMPONENT children, then layout manually.
- Gradient stops + page backgrounds take raw RGB (can't bind variables) — resolve via `var.resolveForMode(modeId)`.

## Tone
Premium and exacting. Fix the root cause, not the symptom (rebind to the real token; reconcile the source of truth so the audit stops re-flagging). Every write is reversible and logged. If a fix would lower quality or is ambiguous beyond the source's guidance, leave it open with a clear note rather than guess destructively.
