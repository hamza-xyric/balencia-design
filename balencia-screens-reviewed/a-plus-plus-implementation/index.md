# Balencia A++ Implementation Phases

This folder is the execution runway after the full R01-R18 A++ audit and the consolidated cross-check.

The goal is to improve the prototype without letting screen quality drift. Work is divided into six phase ownership units by repeated blocker themes, not by original screen order, so six agents can run concurrently by taking one different phase each.

- Created: 2026-05-27
- Prototype app: `../../balencia-screens`
- Review source: `../a-plus-plus-review/final-rollup.md`
- Consolidated source: `../a-plus-plus-review/consolidated-cross-check.md`
- A++ index: `../a-plus-plus-review/index.md`
- R-batch reviews: `../a-plus-plus-review/R*.md`
- Resolved decisions: `../findings/deferred-decisions.md`
- Skill: `../skills/balencia-a-plus-plus-implementation/SKILL.md`
- Commands: `../commands/start-a-plus-plus-implementation-phase.md`, `../commands/qa-a-plus-plus-implementation-phase.md`, `../commands/close-a-plus-plus-implementation-phase.md`

## Working Rules

- Work one complete phase per agent. Start six agents with one different phase name each: `I01`, `I02`, `I03`, `I04`, `I05`, or `I06`.
- Keep implementation scoped to the active phase findings.
- Do not edit `app_design 3/` unless the user explicitly asks for source-spec changes.
- Do not update final A++ grades in `a-plus-plus-review/index.md` during implementation. Record fixes and evidence in the active implementation phase file; grade changes belong to a later A++ re-review.
- Do not mark a finding closed unless the route was browser-reviewed and the evidence path is recorded.
- If a fix creates a product/scope/privacy question, stop and record it as a decision need instead of guessing.
- Preserve existing user changes. Do not revert unrelated dirty files.
- If another concurrent agent changes a file or route in your phase, inspect the current state and build on it. Record any overlap in the active phase closeout.

## Concurrent Phase Roster

| Phase | Theme | Primary outcome | File | Status |
| --- | --- | --- | --- | --- |
| I01 | Foundation cleanup | Shared overlay, runtime, accessibility, and target primitives are stable. | `I01-foundation-cleanup.md` | completed |
| I02 | Routing and control honesty | Visible controls route, open states, disable honestly, or document Figma behavior. | `I02-routing-control-honesty.md` | completed |
| I03 | Sensitive trust and safety | Voice, emotional data, deletion, report/block, rating, and permission flows are trustworthy. | `I03-sensitive-trust-safety.md` | completed |
| I04 | Domain task modes | Mixed browse/logging/active/summary utility modes become clear and operable. | `I04-domain-task-modes.md` | completed |
| I05 | Social, monetization, providers | Social scope, billing, paywall, integrations, and provider consent are coherent. | `I05-social-monetization-providers.md` | complete |
| I06 | A+ polish sprint | Minor-only A+ screens get final A++ polish and re-review readiness. | `I06-a-plus-polish-sprint.md` | completed |

## Agent Assignments

Use the same implementation prompt for every agent. Only change the `Phase:` value.

| Phase | Agent ownership boundary | Must read |
| --- | --- | --- |
| I01 | Shared components, runtime warnings, overlay anchoring, semantic primitives, reusable target treatment. | I01 file, relevant component files, route evidence JSON. |
| I02 | Route maps, dead controls, query/result honesty, and visible follow-through states. | I02 file, affected R docs, route files. |
| I03 | Sensitive flows, consent, voice/permission states, deletion, report/block, rating, privacy copy. | I03 file, `deferred-decisions.md`, brand/UX gates. |
| I04 | Meal, workout, sleep, meditation, yoga, medication, reminders, recipes, shopping workflow modes. | I04 file, matching R docs and route files. |
| I05 | Billing, paywall, leaderboard, community, competitions, buddy, providers, social safety. | I05 file, resolved decisions Q20, Q35-Q42. |
| I06 | A+ polish findings, final evidence capture, check/build/visual gates, re-review readiness. | I06 file, A++ index, final rollup, rubric, brand/UX gates. |

## Standard Session Loop

1. Read `AGENTS.md`, this index, the active I phase file, `consolidated-cross-check.md`, and `final-rollup.md`.
2. Read only the R docs, evidence JSON/screenshots, route files, and components needed for the active phase.
3. Identify all open findings in the active phase, including already completed evidence in the phase file.
4. Implement the active phase using existing Balencia components and patterns.
5. Browser-review each touched route before broad checks.
6. Run `npm run check` from `../../balencia-screens`.
7. Run `npm run build` when the active phase has a build gate or touches routing/runtime-heavy shared code.
8. Update the active I phase file with changed files, findings addressed, findings still open or deferred, evidence paths, verification results, and any cross-agent overlap.

## Quality Gate

No implementation phase is complete until:

- every addressed finding has fresh evidence
- no new console/runtime errors are introduced
- no new clipped text, unsafe bottom action, or hidden focusable control is introduced
- primary actions remain clear within five seconds
- sensitive actions explain scope before asking
- any product decision remains explicit rather than buried in implementation

## Handoff Template

Use this in every phase file closeout:

```md
## Closeout - YYYY-MM-DD

### Phase Work

- Phase:
- Phase work completed:
- Findings addressed:
- Routes touched:

### Changed Files

- `path`

### Evidence

- `path/to/screenshot-or-json`

### Verification

- `npm run check`: pass/fail, notes
- `npm run build`: pass/fail/not required, notes
- Browser QA: routes and states reviewed

### Deferred

- Finding or question:
- Reason:
- Recommended owner/phase:

### Open Phase Work

- Finding:
- Recommended next action:
```
