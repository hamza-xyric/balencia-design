# Creative decisions

Synced with [../../balencia-screens-reviewed/findings/creative-opportunities.md](../../balencia-screens-reviewed/findings/creative-opportunities.md) (Resolved Product Decisions) and [../../balencia-screens-reviewed/questions-for-user.md](../../balencia-screens-reviewed/questions-for-user.md) (answered 2026-05-26).

Answer new items with `CQ##: …` in chat or edit the open table below.

## Resolved (2026-05-26)

| ID | Decision | Resolution | Blocks | UX source |
| --- | --- | --- | --- | --- |
| CQ01 | SIA avatar direction | **3D SIA avatar first**; polished reactive 2D only if 3D is infeasible for V1 | — (CP-02 unblocked) | creative-opportunities; produce 3D package with 2D fallback states |
| CQ02 | Progress-photo privacy and sharing | Encrypted in transit/at rest, private by default, no human review/model training, user-deletable; AI body analysis premium opt-in; **no progress-photo sharing in V1** | — | Q17, Q18 |
| CQ03 | Real photography vs generated illustration vs stock | **Best asset wins** by surface: real/licensed/owned or non-identifiable demo fixtures for sensitive people/body/trust; generated or licensed allowed for food, posters, abstract, empty/system, gamification, and demo content when credible and QA-passed | — (CP-03/CP-04/CP-07 unblocked) | follow-up answer 2026-05-26 |
| CQ04 | V1 report export scope | **No data export for V1**; in-app reports with screenshot-level sharing only | — | Q42 |
| CQ05 | Provider integration depth | Spotify/YouTube: **honest demo recommendations**; Data Sources: visual trust placeholder, clearly marked demo/no live sync | — | Q05, Q21 |
| CQ06 | Guest preview scope | Entry-form **preview/demo** placeholder OK; do not overproduce full guest-shell montage | CP-07a (06) | Q10 |
| CQ07 | Social exposure V1 | **Friends/private-first**; no global/country ranking or public-room default; locked previews OK | CP-07e | Q36 |
| CQ08 | Competitions modes | Include **self-only/private challenge** modes; locked previews for non-Plus | CP-07e (47) | Q37, Q38 |
| CQ09 | Knowledge Graph shape | **Guided interactive insight-map**, not raw force graph; explainability over dense freeform canvas | CP-06 | Q43 |
| CQ10 | Achievement visibility | Low-motivation: **earned + near-next only**; hide most locked badges | CP-05 (71) | Q39 |
| CQ11 | Spirituality demo | **Belief-adaptive**; Muslim configured demo plus unconfigured/other-belief states | CP-07d (34) | Q44 |
| CQ12 | Paywall prototype | Model **IAP-adjacent visual states** (trial, restore, errors) without live billing | CP-07a (43) | Q40 |

## Open

| ID | Decision | Why it matters | Blocks batches | Status | Leaning |
| --- | --- | --- | --- | --- | --- |
| CQ13 | First production slice order | Session planning after CP-00 | CP-00+ | resolved 2026-05-26 | Onboarding-first: finish CP-01 carousel flow, SIA onboarding canvas, and controlled domain visual kit before leading with generated SIA avatar, CP-03 trust media, or CP-06 Knowledge Graph |

## Reprioritized (2026-05-26)

- CP-01 remains the active creative production focus because it is the first-user confidence moment.
- SIA avatar remains a resolved 3D-first direction (CQ01), but is not the next lead creative because AI-generated identity can reduce perceived quality/trust if it is not exceptional.
- Splash reveal stays mostly coded/composited from official logo files; no generated marks.
- Progress photos/viewer and Knowledge Graph remain important, but they follow onboarding-first creative confidence.

## Registry cross-reference

Machine-readable constraints per screen: `constraints[]` in [../registry/opportunities.json](../registry/opportunities.json).  
Summary table: [../registry/product-decisions.json](../registry/product-decisions.json).
