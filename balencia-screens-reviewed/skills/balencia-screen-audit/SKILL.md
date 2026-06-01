---
name: balencia-screen-audit
description: Use when reviewing Balencia mobile prototype screens one by one or in small batches for UX quality, brand fit, mobile ergonomics, trust, accessibility, and industry best practice. Applies to the 90-screen audit workspace in balencia-screens-reviewed and the live prototype in balencia-screens.
---

# Balencia Screen Audit

Use this skill for Balencia screen review sessions. Review up to 12 screens in one session, but judge one screen at a time.

`batches/batch-01.md` is the canonical quality bar. Future completed batch files must be compiled audits, not short summaries.

## Required Sources

- Live prototype: `../balencia-screens`
- Screen registry: `../balencia-screens/src/data/screens.ts`
- Screen specs: `../app_design 3/`
- Shared patterns: `../app_design 3/_shared-patterns.md`
- Design direction: `../app_design 3/Balencia-Design-Direction.md`
- Audit workspace: `../balencia-screens-reviewed`

## Workflow

1. Read the active batch file in `batches/`.
2. Start the prototype server if needed with `npm run dev` from `../balencia-screens`.
3. Open one route at a time.
4. Compare live UI, screen spec, shared patterns, and brand direction.
5. Score the screen with the rubric.
6. Record evidence-backed findings before suggesting redesign.
7. Add a complete screen note directly to the active batch file before moving on.
8. Add each finding to `findings/findings-ledger.md`.
9. Update deferred decisions when a valid product/legal/scope question remains.
10. Update the batch summary after all selected screens are reviewed.

## Required Batch Output

The active batch file must include, for each reviewed screen:

- five-second read
- primary action clarity
- emotional tone
- screenshot path or other visual evidence
- visible control inventory and purpose notes
- full 8-dimension rubric table
- A++ grade and grade-cap reason when not A++
- findings table with severity, category, evidence, user impact, recommendation, and status
- decision line

Separate per-screen files may support the work, but they do not replace the compiled batch file.

## References

- Use `references/session-workflow.md` for the step-by-step session loop.
- Use `references/rubric.md` for scoring.
- Use `references/finding-taxonomy.md` for severity and category labels.
- Use `references/brand-ux-gates.md` for Balencia-specific quality gates.

## Rules

- Do not review all 90 screens in one pass.
- Do not redesign during the audit pass unless the user explicitly switches to improvement work.
- Do not mark a batch `reviewed` unless its batch file meets the compiled audit standard above.
- Treat user observations as hypotheses until validated against the live screen and flow.
- Prefer progressive disclosure when a field or permission is not needed immediately.
- Protect the premium Balencia feel while removing friction.
- In the A++ re-review pass, do not award A++ without fresh evidence and no unresolved findings above `nit`.
