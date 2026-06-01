# Balencia Figma DS — Audit Methodology

How the grade in `REPORT.md` is produced. The `/figma-build-auditor` skill automates this; this file is the human-readable spec (and the fallback if the skill is unavailable).

## Principles
1. **Read-only on Figma.** Only `get_metadata`, `get_screenshot`, `get_variable_defs`, `get_design_context`, `search_design_system`. Never `use_figma` or any write. The audit must never mutate the DS file.
2. **Grade against the source of truth, not against the docs.** The React prototype + `globals.css` define correct; the live Figma file defines actual; the gap is the finding. Docs (`figma-*-map.json`) are a build aid and are themselves audited for drift.
3. **Every finding is actionable.** A finding without a `fix-pointer` (the exact remedy + node id + token) is not done.
4. **Honest premium bar.** A+++ is rare by design. Do not inflate. See `RUBRIC.md` bands.

## Pipeline

### Step 0 — Load context
- Read `RUBRIC.md`, the prior `REPORT.md`, and `findings-ledger.md` (to compute deltas and carry open findings forward).
- Capture the current commit: `git rev-parse --short HEAD`.

### Step 1 — Consistency pre-pass (MCP-free)
- Run `node figma-build-audit/scripts/consistency-check.mjs --json`.
- Use it to (a) get the authoritative built/unbuilt list per phase, (b) seed Dimension 8 findings (index drift, token-map issues), and (c) decide scope.

### Step 2 — Resolve scope
- A batch token (`3A`, `3B`, `3C`, `C4`, `foundations`), a component name (`TierCard`), `--all`, or default = components touched since the last audited SHA (`git log <lastSha>..HEAD -- balencia-screens/scripts/figma-components-map.json figma-mapping.json`).
- Map names → `figma_node_id` via `figma-components-map.json` / `figma-mapping.json`.

### Step 3 — Per-component evidence gathering (MCP)
For each component node:
1. `get_metadata` — variant set vs component, axis names, variant count, child structure → **Dimensions 2, 4**.
2. `get_variable_defs` — which paints/radii/spacing/effects are bound vs raw → **Dimension 1** (the premium gate). Flag every bare `#hex`, `rgba(...)`, and bare numeric radius/spacing.
3. `get_screenshot` — render for **Dimension 3** fidelity vs the prototype. (Use `enableBase64Response: true` only when you must inspect inline; otherwise the URL is enough for the record.)
4. `get_design_context` (selective) — confirm text styles, auto-layout modes, effect styles → **Dimensions 5, 6, 7**.
5. Read the React source (`figma-components-map.json[name].source`) → derive the *expected* prop/state/variant matrix and compare.

### Step 4 — Score
- Score each of the 9 dimensions 0–100 using the `RUBRIC.md` checklists; record deductions as ledger findings with severity + fix-pointer.
- Compute the weighted overall, apply the band caps (no A− with an open High, etc.), assign the letter.

### Step 5 — Foundations sub-audit (when in scope / `--all`)
- Confirm `globals.css` tokens are represented as variables/text-styles/effect-styles (the consistency script does the mechanical part; spot-check binding correctness in Figma).
- Note the alpha-tint token gap and any missing-token-style.

### Step 6 — Write artifacts (the only writes the audit performs — all local files)
- Update `REPORT.md` (header, exec summary, scorecard, phase rollups, foundations, cross-cutting, trend).
- Append/update `findings-ledger.md` (carry open findings; mark resolved ones; set `first-seen-sha`).
- Write `history/<date>-<sha>.md` snapshot (overall grade + scorecard) for trend lines.
- Print a short summary to the user.

## Remediation (`/figma-build-fixer`)
The audit is read-only. Its companion, the `/figma-build-fixer` skill, consumes `REPORT.md` + `findings-ledger.md` and **fixes** open findings — two-phase (plan → approve → apply), writing to the Figma DS file, the source-of-truth docs (`globals.css`, `figma-tokens-map.json`, `figma-mapping.json`), and the React prototype, then re-running this auditor to confirm and mark findings `resolved`. Verify live Figma state before fixing — the alpha-white variables and `radius/xs` already exist, so token-leakage fixes are rebinds, not mints.

## Deep mode (`--deep`)
For full re-grades, fan out one auditor agent per component via the `Workflow` tool (template embedded in the skill): each agent runs Step 3–4 for its component and returns a schema-validated scorecard; a synthesis stage assembles `REPORT.md`; a completeness-critic stage confirms no built component was skipped and every High finding was verified. Token-heavy and intentional — use for periodic full sweeps, not routine batch checks.

## Notes / known nuances
- Type tokens (`--text-*`, `--font-*`) live as **text styles**; shadow/glow (`--shadow-*`, `--glow-*`) as **effect styles**. The consistency script accounts for this — they are not variable gaps.
- Alpha-white tints (`rgba(255,255,255,0.x)`) currently have **no canonical token** in `globals.css`; the token-map points them at themselves. This is the structural cause of per-component leakage and is tracked as a standing Cross-Cutting finding until real `--color-alpha-white-*` tokens are minted.
- The live file is occasionally *ahead* of the handoff docs (e.g. SiaChatTopBar built before the doc said). Always trust `get_metadata` over the markdown.
