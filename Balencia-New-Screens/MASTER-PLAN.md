# Balencia Glass Redesign — Master Plan v2 (full coverage)

> Supersedes the inventory + process sections of `Balencia-Glass-Redesign-Plan (1).md` (kept untouched as the founding document — its §1 design language remains authoritative, distilled into `canon/COMPACT-CANON.md`). This v2 extends scope from 66 to **104 screens** (founder decision 2026-07-06: full member-facing coverage of the live app, admin + public web excluded) and swaps the gated 5-by-5 loop for a **fully autonomous multi-agent pipeline** with internal QA.

## Locked decisions (delta from v1)

| Decision | Value |
|---|---|
| Scope | **104 member-facing mobile screens** — 90 from `app_design 3/` (v1 missed 03e, 05b, 64–85) + 14 net-new from the live-app inventory (`Archive/2026-07-06/`). Admin (32 routes) + public/legal (29 routes) out of scope. |
| Coach name | **CIA** in every new spec. Source specs say "SIA" — renamed on sight. |
| Process | Fully autonomous: GLM drafts → Claude craft-repair → checklist gate → ledger. No per-batch founder gates; founder reviews the finished set. |
| Inventory + status | `_MASTER-LEDGER.md` (sole tracker, orchestrator-only writes). |
| Style sources | `canon/COMPACT-CANON.md` + `canon/COMPONENT-CATALOG.md` — the only style inputs downstream stages read. |
| Deliverable | One hi-fi markdown spec per screen in `screens/NN-name.md`, per the template below. Plus coded reference comp `reference/07-cia-onboarding.html`. |

## Per-screen spec template (inherited from v1 §3 — order fixed)

1. **Header** — ID · name · route(s) covered · tab · source · batch.
2. **Purpose** — 1–2 lines.
3. **Entry & exit** — arrival paths; destinations.
4. **Layout anatomy** — top→bottom regions + ASCII wireframe (390×844).
5. **Components** — catalog names with variants (`NEW:` flag for anything not in catalog).
6. **Visual treatment** — glass tier per region · glow color + meaning per card · atmosphere · hero type moment.
7. **Content & copy** — real strings, CIA voice, one Tiempos-italic emphasis word per moment.
8. **Data & honesty states** — every metric: real / low-confidence / honest-null + provenance chip.
9. **All states** — default · skeleton · empty · error · success · disabled.
10. **Motion & interaction** — gestures, transitions, glow behavior, haptics, reduced-motion.
11. **Motivation-tier adaptation** — low / medium / high density.
12. **Accessibility** — contrast, 44px targets, screen-reader labels.
13. **Premium checklist** — self-assessment against the 14-point gate.

## The 14-point gate (stage-D rubric; pass ≥ 12 with all 3 north-stars)

North star: **1** Connects (cross-pillar intelligence present) · **2** Honest (no fabricated numbers; provenance) · **3** Premium (funded-product hierarchy, generous space).
Craft: **4** warm-dark atmosphere, glass reads as glass · **5** semantic glow one-per-card, meaning stated · **6** 60/30/10 + one hero color per surface · **7** type rules (NM everywhere, one Tiempos-italic emphasis, tabular-nums on data) · **8** all six states designed · **9** motivation-tier variants · **10** AA+ contrast + 44px + reduced-motion · **11** honesty triple per metric · **12** catalog component names (no unflagged one-offs) · **13** CIA voice copy (sentence case, no exclamations, never "SIA") · **14** anatomy + 390×844 ASCII wireframe present.

## Production pipeline (per screen)

```
A GLM brief    cat source spec(s) [+ ascii wireframe] | scripts/glm-worker.sh  → work/briefs/NN.md
B GLM draft    cat brief + canon | glm-worker.sh (template + gen-prompt)      → work/drafts/NN.md
C Craft-repair sonnet agent: draft+canon+catalog → rewrite to premium bar     → screens/NN.md
D Gate         haiku agent: 14-point rubric verdict                           → ledger grade
   fail ≤4 defects → C repairs (max 2) · >4 → B regenerates (max 1) · still failing → ESCALATED (Fable hand-crafts)
E Ledger       orchestrator writes the row
```

New screens (86–99): stage A briefs from `Archive/2026-07-06/features.md` + `design-context-overview.md` + screenshots instead of a source spec.

**Consistency barriers** every ~15 screens: grep sweep (no "SIA", no off-canon hexes, 13 sections present) + drift report; mechanical fixes applied before continuing. **Completeness sweeps** after production: critic diffs the 130 live routes + design-context features against ledger PASS + documented merges; uncovered items become new rows; repeat until 2 consecutive dry sweeps.

## Batch map

See `_MASTER-LEDGER.md` — 21 thematic batches; Batch 1 (onboarding hero) runs alone as pilot for prompt calibration; batches 2–21 flow as one pipeline.

## Definition of done (run level)

- Ledger: only genuinely reviewed/repaired rows may be PASS; rows marked `repair` remain audit-needed and must not be treated as complete.
- Zero "SIA" hits in `screens/`; zero off-canon hex values; all specs 13-section complete.
- Every member-facing live-app route maps to a PASS screen or a documented merge.
- 2 consecutive dry completeness sweeps.
- Founder review pack: ledger summary + 5 exemplar specs + reference comp.

## Next phase handoff

Use `NEXT-SESSION-PROMPT.md` for the next Codex session. It instructs the next agent to review the created wireframe/spec screens first, then run a multi-agent Codex + GLM workflow to convert selected specs into A+++ high-fidelity mobile wireframes/screens under `hifi-screens/`.
