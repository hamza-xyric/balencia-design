# CP-00 — Foundations

- Status: `session-closed`
- Package: all (global)
- Session cap: documentation only — no generation
- Registry filter: none (infrastructure)
- Closed: 2026-05-26

## Objectives

1. Finalize [../prompts/prompt-style-guide.md](../prompts/prompt-style-guide.md) Balencia tokens for every Higgsfield prompt.
2. Finalize [../prompts/model-routing.md](../prompts/model-routing.md) defaults per asset type.
3. Confirm export naming: `outputs/<package-id>/<asset-id>/variant-NN.ext`
4. Run Higgsfield preflight once: `balance`, `models_explore` — record workspace in session summary.
5. Confirm resolved items in [../decisions/creative-decisions.md](../decisions/creative-decisions.md) and [../registry/product-decisions.json](../registry/product-decisions.json). CQ03 was later resolved by follow-up guidance: best asset wins by surface.

## Deliverables checklist

| Item | Path | Status |
| --- | --- | --- |
| Prompt style guide reviewed | `prompts/prompt-style-guide.md` | done |
| Model routing reviewed | `prompts/model-routing.md` | done |
| Registry validated (90 rows) | `registry/opportunities.json` | done |
| Credit preflight logged | `ledger/generation-ledger.md` | done |

## Session summary

- **Accepted:** prompt-style-guide and model-routing approved for CP-01+; export layout `outputs/<package-id>/<asset-id>/variant-NN.ext` (+ optional `metadata.json`) per `outputs/README.md`.
- **Deferred:** none (no assets generated this session).
- **Workspace / credits note:** default workspace; **719 credits** available; subscription **plus**. No billing recovery needed.

### Decisions cross-check

| Source | Status |
| --- | --- |
| `decisions/creative-decisions.md` | CQ01–CQ12 resolved after follow-up; **CQ13** open (slice order) |
| `registry/product-decisions.json` | 9 entries; all product gates resolved |

### CQ03 resolution (follow-up applied)

- **Sensitive people / body / trust surfaces:** real/licensed/owned or clearly non-identifiable demo fixtures.
- **Food, posters, abstract demos, empty/system, gamification, insight maps:** generated or licensed allowed when credible and QA-passed.
- **Official marks:** Balencia/provider marks use source files only; never generated.

## Completion gate

- [x] Prompt and model docs approved for CP-01
- [x] CQ01 resolved (3D SIA first) — CP-02 unblocked
- [x] CQ03 resolved and documented (CP-03/CP-04/CP-07 unblocked)
- [x] Status → `session-closed`

## Next session

**CP-01 — Onboarding signature** (screens 01, 02, 07). Up to 6 briefs; use `commands/write-briefs.md` and `commands/higgsfield-generate.md` after briefs are written.
