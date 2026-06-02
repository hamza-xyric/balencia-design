# Balencia Visualization Audit — Methodology

How the grade in `REPORT.md` is produced and how a screen's visualization design is remediated. This is the human-readable spec; a future `/viz-auditor` skill may automate it (analogous to `/figma-build-auditor`).

## Principles
1. **Read-only audit.** The audit never edits the prototype or Figma. It reads specs + renders, grades, and points.
2. **Spec-first remediation.** Per the program's locked scope, the fix is to **write the visualization design into `app_design 3/NN-screen.md`** — design intent, not code. Prototype + Figma implementation is a later, separately-requested "viz-build" program (the `figma-build-fixer` to this auditor's `figma-build-auditor`).
3. **Kit-first.** Every proposed visualization must resolve to a `VIZ-KIT.md` primitive. If it doesn't exist, the gap is logged as a `VK-###` finding and added to the kit spec — never invented per-screen.
4. **Grade against the premium bar, not the current draft.** A metric shown as text where a chart belongs is the finding, even if "it's clear enough."
5. **Honest premium bar.** A+++ is rare by design. Do not inflate. LOW screens are `N/A`, not failures.

## Pipeline

### Step 0 — Load context
- Read `RUBRIC.md`, `VIZ-KIT.md`, the prior `REPORT.md`, and `findings-ledger.md` (carry open findings forward, compute deltas).
- Capture the current commit: `git rev-parse --short HEAD`.

### Step 1 — Resolve scope
- A roadmap batch (`Batch 2`, `Batch 3`…), a single screen (`12`, `30`), or `--all`.
- Use `screen-classification.md` to skip LOW screens (grade `N/A`) and pull the HIGH/MEDIUM set for the batch.

### Step 2 — Per-screen evidence gathering
For each screen in scope:
1. Read `app_design 3/NN-screen.md` — enumerate **every data point / metric / series the screen shows**. Note the screen's Register (Product / AI / Wellbeing Mode) — it sets the dominant accent.
2. Screenshot the prototype route (and/or Figma `get_screenshot`) — see what is actually rendered.
3. **Diff spec claims against component reality.** When the spec asserts a capability (a size, a center hub, a 200px ring), verify it against the actual component before scoring — an unbuildable claim is itself a finding. (E.g. `ProgressRing` is locked to 36/48/96; `RadarChart` is 280×280 with no hub.)
4. **Name the benchmark.** State which cluster benchmark (RUBRIC per-cluster matrix) this screen is graded against, and one sentence on how it stays Balencia (not a clone of it).
5. Build a **visualized-vs-text table**: each datum marked `chart` / `text` / `absent`, with the chart type if visualized — or `deferred` (to a tap) / `deliberately textual` where that's the intentional resolution.

### Step 3 — Score
- Score the **10 `RUBRIC.md` dimensions** 0–100 using the checklists; record each deduction as a ledger finding with severity + fix-pointer.
- **Ethics pass:** explicitly check non-shaming framing (no metric as a verdict; weakest-domain framed constructively; streaks don't weaponise loss-aversion; honest delta windows). A shaming/dark-pattern framing is a Critical.
- Compute the weighted overall, apply band caps (no A− with an open High; nothing above B+ with an open Critical; no A+++ with a degenerate cold-start or Signature < B; data-honesty/shaming Criticals cap at B), assign the letter.
- Record both a **Current** grade (what renders today) and, once specced, a **Specced-target** grade (what the folded-in viz design would earn).

### Step 4 — Log findings
- Append to `findings-ledger.md`. IDs: `S##-V##` (screen + viz finding); `VK-###` (kit-level / cross-cutting).
- Each finding's `fix-pointer` names the kit primitive + the target spec section.
- Status lifecycle: `open` → `specced` (written into the screen spec) → `built` → `resolved` (built in the later program) / `deferred`.

### Step 5 — Remediate spec-first
- Add (or update) a **`## Visualization`** section in `app_design 3/NN-screen.md`, using the cluster template in `CONSISTENCY.md §6` and the shape proven on Home:
  - **What's visualized** (the resolution table, every datum visualized / deferred / deliberately textual).
  - **Primitives used** (named `VIZ-KIT.md` entries + data source in `mock.ts`).
  - **Layout** (where each viz sits; one hero placement).
  - **States matrix** (cold-start / loading / empty / partial / error per viz — a required artifact, not a one-line deferral to a pre-existing error table).
  - **Motion choreography** (draw-not-fade order) + **Brand / 60·30·10 / non-shaming** + **Accessibility** (text equivalents, visible signs, 1.4.11).
  - Close with *"Conform to `viz-audit/CONSISTENCY.md`."*
- **Determinism gate:** a section is not `specced` until every gradient stop, glow radius, stroke width, point count, tick count, and motion timing is a concrete token-backed value (no "e.g."). Tokens absent from `globals.css` are referenced by their intended name and logged under `VK-017`.
- Mark the corresponding `S##-V##` findings `specced`.

### Step 6 — Write artifacts (the only writes the audit performs — all local files)
- Update `REPORT.md` (header, exec summary, scorecard row(s), roadmap rollup).
- Append/update `findings-ledger.md`.
- Write `history/<date>-<sha>.md` snapshot (overall grade + scorecard) for trend lines.
- Print a short summary.

## Remediation boundary (future `viz-build` program)
This program stops at **specced**. A future build program consumes `REPORT.md` + `findings-ledger.md` + the specs and implements the visualizations in `balencia-screens/` (composing `VIZ-KIT.md` primitives) and propagates to Figma, then re-runs this auditor to mark findings `built` → `resolved`. Build must keep `npm run check` (esp. `verify:brand`) green.

## Notes
- The prototype already owns `RadarChart`, `CalendarHeatmap`, `ProgressRing`, `MacroBar`, `WaterIntakeRing` (deployed) and `LineChart`, `BarChart`, `XPBar` (built-but-unused). Most "new" charts are **wiring up existing components**, not net-new infra. Recharts 3.8 is installed.
- Glow/gradient/domain-colour tokens already exist in `globals.css`; depth is a token-application problem, not a token-mint problem.
