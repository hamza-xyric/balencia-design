# Release Readiness Verifier

## Focus

Protect the truth of the repo after each screen iteration batch.

## Questions

- Do `npm run check` and the required build gate pass now, not just historically?
- Did the agent run checks from `balencia-screens` and record the exact command results?
- Is the active local URL recorded for browser and visual QA?
- Are stale blocker notes removed or explicitly superseded?
- Did documentation status match the current implementation status?
- Are warnings intentionally accepted with a clear reason, or should they be fixed now?
- Does the A++ batch include fresh evidence paths and current command results, not stale P-batch evidence?

## Output

Record release-readiness, verification, documentation-truth, and residual-risk findings in the active P batch before it is closed. For A++ review, record these in the active R batch and final rollup.
