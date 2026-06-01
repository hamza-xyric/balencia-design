---
name: balencia-a-plus-plus-implementation
description: Use when implementing Balencia A++ follow-up phases under balencia-screens-reviewed/a-plus-plus-implementation, especially for cross-cutting quality fixes, phased multi-session work, route/control honesty, mobile overlay quality, trust/privacy, accessibility, and evidence-backed closeout.
---

# Balencia A++ Implementation

Use this skill for controlled implementation after the R01-R18 A++ audit and consolidated cross-check.

## Required Sources

- Phase index: `../a-plus-plus-implementation/index.md`
- Active phase file: `../a-plus-plus-implementation/IXX-*.md`
- Consolidated cross-check: `../a-plus-plus-review/consolidated-cross-check.md`
- Final rollup: `../a-plus-plus-review/final-rollup.md`
- A++ index: `../a-plus-plus-review/index.md`
- Relevant R docs: `../a-plus-plus-review/R*.md`
- Resolved decisions: `../findings/deferred-decisions.md`
- Rubric: `../skills/balencia-screen-audit/references/rubric.md`
- Brand/UX gates: `../skills/balencia-screen-audit/references/brand-ux-gates.md`
- Prototype app: `../../balencia-screens`
- Route evidence: `../../balencia-screens/output/a-plus-plus-review/`

## Workflow

1. Read the active phase file first.
2. Identify the exact R finding IDs in scope.
3. Read only the R docs, evidence, route files, and components needed for the active phase.
4. Implement the active phase as the agent's ownership boundary.
5. Prefer existing Balencia components, route patterns, mock data, and dark-first mobile styling.
6. Keep edits scoped to the active phase and avoid unrelated refactors.
7. Do not edit `app_design 3/` unless explicitly asked.
8. Do not update final A++ grades during implementation.
9. Record any unresolved product/scope/privacy decision before moving on.
10. If another concurrent agent changed a file or route you need, inspect the current state, build on it, and record the overlap in closeout.

## Quality Gates

Every touched screen must preserve or improve:

- five-second clarity
- primary action clarity
- premium Balencia feel
- mobile safe areas and 44px target safety
- accessible names, semantics, focus order, and modal isolation
- trust/privacy before sensitive action
- SIA restraint and explicit invocation
- route/control honesty
- no new console/runtime errors
- no clipped text, hidden controls, or bottom-action collisions

## Verification

Always run from `../../balencia-screens`:

```bash
npm run check
```

Run production build when the phase says required or when routing/shared runtime changes:

```bash
npm run build
```

Run visual audit when overlays, dense mobile layouts, media, charts, bottom actions, or shared components change:

```bash
VISUAL_AUDIT_BASE_URL=http://localhost:3005 npm run verify:visual
```

If a different local URL is active, record it in the phase file.

## Closeout

Before finishing, update the active phase file with:

- phase name
- phase work completed
- changed files
- findings addressed
- findings still open or deferred with reasons
- browser evidence paths
- `npm run check` result
- build/visual-audit result when run
- any cross-agent overlap

Only update `a-plus-plus-implementation/index.md` when a phase status truly changes. Do not change A++ grades until a later A++ re-review pass confirms the result.
