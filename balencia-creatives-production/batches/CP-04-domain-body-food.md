# CP-04 — Domain body and food

- Status: `not started`
- Package: `domain-content`
- Session cap: 6 asset briefs
- Prototype URL: `http://localhost:3000`
- Registry filter: `production_batch = CP-04`

## Screens in scope

| ID | Screen | Route | Priority |
| --- | --- | --- | --- |
| 70 | Exercise library | `/domains/exercise-library` | P0 |
| 55 | Yoga sessions | `/features/yoga` | P0 |
| 56 | Recipes | `/features/recipes` | P0 |

## Decision gates

- [x] **CQ03** resolved: best asset wins by surface; exercise/yoga prefer real or professional form illustration, recipes may use generated or licensed food imagery if credible and QA-passed

## Brief checklist

| Brief ID | Screen | Route | Asset type | Status |
| --- | --- | --- | --- | --- |
| CRE-70-exercise-thumbnails | 70 | `/domains/exercise-library` | thumbnail | not_started |
| CRE-55-yoga-poses | 55 | `/features/yoga` | illustration | not_started |
| CRE-56-recipe-heroes | 56 | `/features/recipes` | photo | not_started |
| CRE-56-recipe-fallback | 56 | `/features/recipes` | illustration | not_started |

## Session summary

- Accepted:
- Iterate:
- Deferred:
- Credit preflight (session total):

## Brief notes

_Add per-brief sections when the session starts._

## Completion gate

- [ ] Exercise library has representative thumbnail set (starter set, not all 532)
- [ ] Recipe no-photo fallback defined
- [ ] Status → `session-closed`
