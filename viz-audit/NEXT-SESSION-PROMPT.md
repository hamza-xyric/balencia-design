# Next-session kickoff prompt — Balencia viz-audit: per-screen quality review & remediation

> Paste the block below into a fresh session. It asks the model to **plan first** (plan mode), then run a rigorous screen-by-screen quality review of the visualization audit and fix any subpar sections — without building the prototype.

---

You are working in the **Balencia design workspace** at `/Users/hamza/Desktop/balencia-design` — a premium AI life-coaching mobile app (warm dark UI, deep RPG gamification). Read `CLAUDE.md` first for the workspace map and brand system.

## What already exists (do not redo it — review it)
A **spec-first visualization audit** lives in `viz-audit/`. A prior program already:
- Hardened the foundation: a 10-dimension **`RUBRIC.md`** (data *resolution* not coverage-maximalism; Signature Ownability + State Craft dims; non-shaming + WCAG 1.4.11 gates; a per-cluster benchmark matrix; grade caps), a fully-specced 18-primitive **`VIZ-KIT.md`** (incl. the Balencia signature — the **Living Line** + **Constellation Radar**; projection = dashed **purple**), a **`CONSISTENCY.md`** locked-parameter drift contract + section templates, **`methodology.md`**, **`screen-classification.md`**, **`findings-ledger.md`**, **`REPORT.md`**, and a build **`HANDOFF.md`**.
- Wrote a **`## Visualization` section into all 54 HIGH+MEDIUM screen specs** under `app_design 3/NN-*.md` (placed after the component stack, before `## Color Map`), plus **9 companion `…-visualization-recommendations.md` files** (Home + the 8 exemplars). 30 LOW screens are N/A.
- Graded the app: Current ~D → Specced-target **A−** across all 54. The audit is **read-only on the prototype/Figma** — building is a separate program (`HANDOFF.md`).

## The problem to solve this session
Coverage is complete but **quality is uneven**, because the sections were produced by many parallel agents across batches. We must make sure **every screen gets a genuine quality review and none ships a subpar visualization spec.** Known weak spots to scrutinize hardest (verify, don't assume):
1. **The tail (Batches 6–8)** — onboarding/chat/call (08, 09, 79), tracker MEDIUM (27, 29, 31, 38, 41, 44, 45, 52–55, 60, 61), and **lightweight MEDIUM** (15, 17, 18, 20, 23, 24, 43, 46, 49, 50, 51, 56, 62, 70, 73, 84). These are thinner than the early exemplars.
2. **7 sections were hand-authored quickly** during a workflow failure — **43, 46, 51, 62, 70, 73, 84** — re-review these for depth + grounding against the real screen/prototype.
3. **Stale Color Maps / spec conflicts:** several specs' older `## Color Map` or copy still carry **alarm-red** or off-brand tokens that the new `## Visualization` section supersedes but hasn't reconciled (e.g. Sleep [58] teal vs sleep-indigo; Relationships [33] / mission difficulty alarm-red; Energy [63] teal data-ink). Reconcile each spec internally so it's not self-contradictory.
4. **Tail ledger entries are condensed** (one row per screen). Expand to per-finding rows where a screen warrants it.
5. **Determinism + conformance drift:** confirm every section's depth values are token-backed (no `e.g.`), uses the exact `CONSISTENCY.md` locked parameters, names real `VIZ-KIT.md` primitives, and that any spec claim is buildable against the actual prototype components.

## Your task
A rigorous, **screen-by-screen review-and-remediate** pass over the viz-audit output. For each HIGH+MEDIUM screen:
1. **Read** the screen spec end-to-end + its `## Visualization` section; note its Register (Product/AI/Wellbeing/System Mode) and cluster benchmark.
2. **Re-ground** against reality: diff the section's claims against the actual prototype route/components in `balencia-screens/` (catch unbuildable claims, e.g. component sizes/capabilities), and against the live render (what's a chart vs text today).
3. **Judge** it honestly against `RUBRIC.md` (all 10 dims), `CONSISTENCY.md` (locked params + 60/30/10 + non-shaming + 1.4.11), and `VIZ-KIT.md` (signature, kit-only, no bespoke one-offs). Decide: is this section genuinely premium, or subpar/thin/inconsistent?
4. **Remediate** anything subpar: deepen thin sections to the exemplar bar (Home / Fitness [26] / Knowledge Graph [72] are the reference shapes); make depth deterministic; ensure the Balencia signature (Living Line / Constellation Radar, warm glow — not a competitor clone); design every state (cold-start/loading/empty/partial/error); enforce non-shaming + honest + accessible; reconcile any stale Color Map / token conflicts in the same spec.
5. **Log**: update `findings-ledger.md` (expand condensed tail rows to per-finding where warranted; keep statuses honest), refresh the screen's `REPORT.md` scorecard row + grade, and drop a `history/` snapshot per review batch.

Stay **spec-first / read-only on the prototype** (this is review + spec remediation, not build). Do not regrade screens upward without a real reason; **editorial restraint scores up** (premium ≠ maximal — a calm/lightweight screen done well is A−, not a failure).

## Definition of "not subpar" (the per-screen quality bar)
A section passes review only if: it has a clear focal hero (or a deliberate, justified restraint choice); every datum is *resolved* (visualized / deferred / deliberately textual) with a legible hierarchy; depth is token-backed and matches `CONSISTENCY.md`; it advances the Balencia signature, not a Bevel/competitor clone; charts are honest (no-data ≠ zero, honest scales, no decorative non-data charts); framing is non-shaming and brand-compliant (60/30/10; purple = SIA only); all states are designed; it's accessible (text equivalents, visible signs never colour-alone, WCAG 1.4.11 ≥3:1, ≥44pt); motion draws (never fades); and the spec has no internal contradiction (Color Map ↔ Visualization).

## How to work (batch discipline — there are a lot of screens)
- Work in **review batches of ~6–10 screens**; give each screen a real read, not a rubber-stamp. Prioritize the weak spots above first.
- You may use parallel sub-agents/workflows to review in fan-out, but **you (the main thread) must verify each result and own the shared-file writes** (REPORT/ledger/history) to avoid the drift/contention seen before. If you delegate, have agents return findings + a proposed upgraded section; spot-check before accepting.
- After each batch, update REPORT + ledger + a history snapshot, and **checkpoint with me** before the next batch.

## Key files
`viz-audit/RUBRIC.md`, `viz-audit/VIZ-KIT.md`, `viz-audit/CONSISTENCY.md`, `viz-audit/methodology.md`, `viz-audit/screen-classification.md`, `viz-audit/REPORT.md`, `viz-audit/findings-ledger.md`, `viz-audit/HANDOFF.md`; the screen specs `app_design 3/NN-*.md` and their `## Visualization` sections; exemplars to match: `12-home-screen.md`, `26-fitness-workouts-dashboard.md`, `72-knowledge-graph.md` (+ their companion files); prototype reality in `balencia-screens/src/components/` and `…/src/app/`; brand law in `Balencia/Design-System-Overview.md` §8 + §11.

## Start here
**Do NOT edit yet. First enter plan mode**, explore the current viz-audit state and a representative sample of strong vs weak sections, then **produce a plan** for the review-and-remediation program: the per-screen review procedure, the batch order (weak spots first), how you'll judge "subpar," the artifact/ledger policy, parallelization + single-writer discipline, the checkpoint cadence, and the Definition of Done (every section meets the quality bar; REPORT + ledger reflect honest re-grades; spec conflicts reconciled). Ask me any clarifying questions, then present the plan for approval before remediating.
