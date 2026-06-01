# Creative Production Batch Index

Canonical opportunities: [../registry/opportunities.json](../registry/opportunities.json)  
Source matrix: [../../balencia-screens-reviewed/findings/creative-opportunities.md](../../balencia-screens-reviewed/findings/creative-opportunities.md)

Production batches are grouped by **package and priority**, not UX audit batches 01–18.

## Recommended first slice

**CP-00 → CP-01 → CP-01 controlled iteration → CP-02/CP-06/CP-03 as quality allows**.

Revised on 2026-05-26: the first production focus is onboarding confidence, not the broad P0 list. Prioritize the carousel flow, SIA onboarding canvas, and controlled domain visual language before leading with AI-generated SIA avatar work.
Product decisions resolved 2026-05-26 — see [../decisions/creative-decisions.md](../decisions/creative-decisions.md).

## Batch plan

| Batch | Theme | Priority | Screens | File | Higgsfield |
| --- | --- | --- | --- | --- | --- |
| CP-00 | Foundations | — | Prompt style, model routing, export naming | [CP-00-foundations.md](CP-00-foundations.md) | Preflight only |
| CP-01 | Onboarding signature | P0 | 01, 02, 07 | [CP-01-onboarding-signature.md](CP-01-onboarding-signature.md) | Image + motion loops + controlled icon kit |
| CP-02 | SIA identity | P0 + P1 | 09, 10, 11 | [CP-02-sia-identity.md](CP-02-sia-identity.md) | Deferred as lead item until quality/reference direction can support premium trust |
| CP-03 | Media and trust | P0 | 49, 67, 80, 81 | [CP-03-media-trust.md](CP-03-media-trust.md) | Thumbnails, posters, album art |
| CP-04 | Domain body and food | P0 | 70, 55, 56 | [CP-04-domain-body-food.md](CP-04-domain-body-food.md) | Illustration + photo-style |
| CP-05 | Gamification | P0 + P1 | 42, 59, 71 | [CP-05-gamification.md](CP-05-gamification.md) | Badges, celebration |
| CP-06 | Knowledge graph | P0 | 72 | [CP-06-knowledge-graph.md](CP-06-knowledge-graph.md) | Concept frames |
| CP-07 | P1 domain credibility | P1 | 38 screens — see batch file | [CP-07-p1-domain-credibility.md](CP-07-p1-domain-credibility.md) | Mixed — split across sessions |
| CP-08 | P2 empty and system | P2 | 24 screens — see batch file | [CP-08-p2-empty-system.md](CP-08-p2-empty-system.md) | Illustration-first |
| CP-09 | Provider marks | P2/P3 | 03, 03e, 04, 22, 84 | [CP-09-provider-marks.md](CP-09-provider-marks.md) | **Official assets only** |
| CP-10 | P3 restraint | P3 | 03b, 03c, 03d, 05b, 21, 50, 64, 69 | [CP-10-p3-restraint.md](CP-10-p3-restraint.md) | Document minimal / no asset |

## Session rules

- Maximum **6 asset briefs** per session unless the user changes the process.
- CP-07 and CP-08 are large; take **one domain or feature cluster** per session.
- Mark batch `session-closed` only when the completion gate in the active batch file is satisfied.

## Batch completion criteria

- Active CP batch file is the durable artifact (not only ledger rows).
- Every generated job is in `ledger/generation-ledger.md`.
- Accepted finals are in `ledger/accepted-assets.md` with `outputs/` paths.
