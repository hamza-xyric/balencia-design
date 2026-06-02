# Snapshot — 2026-06-01 · Phase A (Foundation hardening)

**Commit:** `2ebab30` + foundation pass · **Screens specced:** 1 / 55 (Home, re-graded)

## What changed
Triggered by an adversarial critique of the audit foundation. Corrected the rubric/kit/exemplar *before* rolling out to 55 screens.

- **RUBRIC.md** → 10 dimensions. Coverage(20) reframed to **Data resolution(14)**; added **Signature ownability(10)** + **State craft(7)**; split micro-interaction from motion; added **non-shaming** + **WCAG 1.4.11** checks; replaced the single-Bevel bar with a **per-cluster benchmark matrix**; harder caps (no A+++ for a clone or a degenerate cold-start; honesty/shaming Criticals cap at B).
- **VIZ-KIT.md** → added **Living Line (VK-016)** + **Constellation Radar** signature; resolved the **projection-colour contradiction** (dashed purple = SIA forecast, §11 — `VK-018` Critical); fixed determinism holes (token-backed gradients, glow-by-size, conic-gradient trap, round-cap standard); logged net-new primitives **VK-009** matrix, **VK-010** graph, **VK-011** scatter, **VK-012** podium, **VK-013** badge/tier, **VK-014** timeline, **VK-015** arc gauge, **VK-017** depth tokens; reprioritised VK-006 as plumbing.
- **CONSISTENCY.md** (new) → per-primitive locked parameters, 60/30/10 invariants + AI-Mode purple exception, motion vocabulary, a11y invariants, single colour table, and the 7 cluster `## Visualization` templates.
- **methodology.md** → added determinism gate, required states matrix, diff-claims-vs-component step, name-the-benchmark step, ethics pass.
- **Home [12]** → honestly re-graded **D (52) → A− (87)** (was an inflated A 90); `S12-V01..04` hardened: deterministic depth, Living-Line/Constellation signature, cold-start/partial/skeleton states, visible status sign, draw-not-scale motion; Motion table + Day-1 empty state updated.

## Findings opened
`VK-009..018` (10 new kit-level), of which `VK-016/017/018` are `specced`. `VK-009/010` gate Batch 2.

## Grade movement
| Screen | Was | Now (Cur → Tgt) |
|---|---|---|
| 12 Home | A (90) specced (old rubric) | **D (52) → A− (87)** (revised rubric, honest) |

## Next
Batch 2 — Differentiators (16, 19, 48, 72): Constellation Radar + Living Line + CorrelationMatrix (48) + NetworkGraph (72). Then Batch 3 health dashboards, then reassess gate.
