# Visualization Upgrade — Roadmap

Prioritized batches. Each batch = **audit → grade → fold visualization design into the screen specs** (`app_design 3/NN-screen.md`). Sequenced by differentiation + leverage, so the highest-impact, most-Balencia screens come first. We are not building the prototype/Figma here — that's the later viz-build program.

| Batch | Scope | Screens | Why this order | Status |
|---|---|---|---|---|
| **0** | Visualization Kit spec | `VIZ-KIT.md` | Prerequisite — every screen references kit primitives by name | ✅ done |
| **1** | Home pilot (exemplar) | 12 | Proves the spec-fold pattern; highest-traffic screen | ✅ done (re-graded D 52 → A− 87) |
| **A** | **Foundation hardening** | `RUBRIC` / `VIZ-KIT` / `CONSISTENCY` + Home re-grade | Adversarial critique found the foundation itself flawed (single benchmark, coverage-maximalism, missing dims/primitives, projection-colour contradiction). Fix before scaling. | ✅ done |
| **2** | Differentiator dashboards | 16, 19, 48, 72 | The USP visuals no health app can show (Constellation Radar, correlation matrix, knowledge graph) | ✅ done (specced A−; minted VK-009, VK-010) |
| **3** | Health dashboards | 26, 28, 58, 63 | Most direct Oura/WHOOP/Bevel comparison; biggest "subpar" gap today | ✅ done (specced A−; minted VK-007, VK-011, VK-015) |
| **↺** | **Reassess gate** | — | Present the 8 exemplars + corrected foundation; confirm direction before the long tail | ⬜ **next** |
| **4** | Life dashboards | 30, 32, 33, 34, 35, 36 | Broad domain coverage; finance + career most data-rich | ✅ done (specced A−; frozen-kit reuse, no new VK-###) |
| **5** | Progress & social | 13, 14, 39, 47, 59, 71, 78 | Rings, leaderboards, streaks, awards, reports (minted VK-012/013/014). *64 dropped — reclassified LOW (moderation modal).* | ✅ done (specced A−; **kit now fully specced**) |
| **6** | Onboarding/chat/call HIGH | 08, 09, 79 | Embedded viz on chat/summary surfaces | ✅ done (specced A−) |
| **7** | Tracker MEDIUM | 27, 29, 31, 38, 41, 44, 45, 52, 53, 54, 55, 60, 61 | Single-metric trackers / detail screens | ✅ done (specced A−) |
| **8** | Lightweight MEDIUM | 15, 17, 18, 20, 23, 24, 43, 46, 49, 50, 51, 56, 62, 70, 73, 84 | Supporting-metric / mini-section screens | ✅ done (specced A−; restraint-led) |
| **—** | LOW screens | 30 screens | Logged `N/A`; no work | n/a |

## Batch sequencing notes
- **Foundation (Phase A) first:** the rubric/kit/CONSISTENCY are corrected and Home re-graded *before* Batch 2, so the rollout doesn't scale known flaws to 55 screens.
- **Batch 2 first (not health):** the Constellation Radar (16/19), correlation matrix (48), and knowledge graph (72) are the differentiators — they make "whole-life coaching" legible and are unmistakably Balencia. Lead with identity, then close the health gap in Batch 3.
- **Kit dependencies (now logged):** Batch 2 needs `VK-005` Constellation Radar depth-upgrade, `VK-016` Living Line, `VK-009` CorrelationMatrix (48), `VK-010` NetworkGraph (72). Batch 3 needs `VK-001` Sparkline, `VK-003` MetricCard, `VK-007` Donut, `VK-006` TrendChart/BarChart, `VK-011` Scatter (58/63), `VK-015` ArcGauge (63). All depend on `VK-017` depth tokens.
- **Front-load kit-minting in Batches 2–3** so Batches 4+ are pure composition (and safely parallelizable).
- **Cadence:** one batch per working session; re-grade in `REPORT.md` + drop a `history/` snapshot each pass; **reassess gate after Batch 3** before the long tail.

## Definition of done (per screen)
1. Graded in `REPORT.md` (Current + Specced-target, all 10 dimensions).
2. `S##-V##` findings logged with kit fix-pointers; any new shape minted as `VK-###` first.
3. A `## Visualization` section folded into `app_design 3/NN-screen.md`, conforming to `CONSISTENCY.md`, with a designed states matrix (cold-start/loading/empty/partial/error).
4. Findings marked `specced`; Specced-target ≥ A−.

## Definition of done (program — this phase)
All **54** HIGH + MEDIUM screens carry a `## Visualization` section (conforming to `CONSISTENCY.md`) and a Specced-target grade ≥ A−; all kit `VK-###` primitives are specced; the screen-set grade + band distribution computed in `REPORT.md`. Hand off to the viz-build program.
