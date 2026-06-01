# A++ Implementation Session Prompt

Use this as the clean prompt for future sessions. To run six agents concurrently, reuse it with one different phase value per agent: `I01`, `I02`, `I03`, `I04`, `I05`, or `I06`.

```md
We are implementing the Balencia A++ follow-up in controlled phases.

Phase:

Use the local workflow:
- `balencia-screens-reviewed/skills/balencia-a-plus-plus-implementation/SKILL.md`
- `balencia-screens-reviewed/a-plus-plus-implementation/index.md`
- active phase file under `balencia-screens-reviewed/a-plus-plus-implementation/`

Quality guardrails:
- Work only on the active phase.
- Treat the phase as the ownership boundary for this agent.
- Do not edit `app_design 3/` unless explicitly asked.
- Do not update A++ grades in `a-plus-plus-review/index.md`.
- Preserve existing user changes.
- Do not close a finding without fresh browser evidence.
- If a fix needs a product/scope/privacy decision, record it and pause that finding.
- If another concurrent agent changed a file or route you need, inspect the current state, build on it, and record the overlap in closeout.

Required context:
- `balencia-screens-reviewed/AGENTS.md`
- `balencia-screens-reviewed/a-plus-plus-review/consolidated-cross-check.md`
- `balencia-screens-reviewed/a-plus-plus-review/final-rollup.md`
- matching R review docs
- `balencia-screens-reviewed/findings/deferred-decisions.md`
- relevant route evidence under `balencia-screens/output/a-plus-plus-review/`
- relevant prototype files under `balencia-screens/`

Implementation workflow:
1. Identify exact findings in scope.
2. Read relevant R evidence and current route/component files.
3. Implement the active phase using existing Balencia patterns.
4. Browser QA every touched route/state.
5. Run `npm run check` in `balencia-screens`.
6. Run `npm run build` if required by the phase or if routing/shared runtime changed.
7. Update the active phase file with changed files, findings addressed, findings still open or deferred, evidence, verification, and any cross-agent overlap.

Return a concise summary with:
- findings addressed
- evidence captured
- checks run
- remaining risk / open phase work
```
