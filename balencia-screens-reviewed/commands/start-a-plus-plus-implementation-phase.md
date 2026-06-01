# Start A++ Implementation Phase

Use this prompt to start one A++ implementation phase. To run six agents concurrently, reuse this prompt and change only the `Phase:` value.

```md
Phase: I01

Please implement the A++ implementation phase named above.

Use this local skill first:
- `balencia-screens-reviewed/skills/balencia-a-plus-plus-implementation/SKILL.md`

Required context:
- `balencia-screens-reviewed/AGENTS.md`
- `balencia-screens-reviewed/a-plus-plus-implementation/index.md`
- active phase file in `balencia-screens-reviewed/a-plus-plus-implementation/`
- `balencia-screens-reviewed/a-plus-plus-review/consolidated-cross-check.md`
- `balencia-screens-reviewed/a-plus-plus-review/final-rollup.md`
- matching `balencia-screens-reviewed/a-plus-plus-review/R*.md`
- `balencia-screens-reviewed/findings/deferred-decisions.md`
- relevant evidence under `balencia-screens/output/a-plus-plus-review/`
- relevant app files under `balencia-screens/`

Workflow:
1. Read the active phase file and identify every open finding in scope.
2. Treat the phase as the ownership boundary for this agent.
3. Implement only the active phase.
4. Preserve existing user changes and avoid unrelated refactors.
5. Do not edit `app_design 3/` unless the user explicitly asks.
6. Do not update A++ grades in `a-plus-plus-review/index.md`.
7. If a product/scope/privacy decision is needed, record it in the active phase file and pause that finding.
8. If another concurrent agent changed a file or route you need, inspect the current state, build on it, and record the overlap in closeout.

Verification:
- Browser-review every touched route and state.
- Run `npm run check` inside `balencia-screens`.
- If the phase file says `Build gate: required`, run `npm run build`.
- If shared routing/runtime or high-risk layout changed, run `npm run build` even when only recommended.

When done, update the active phase file with:
- phase name
- phase work completed
- changed files
- findings addressed
- findings still open or deferred
- evidence paths
- verification results
- any cross-agent overlap
```
