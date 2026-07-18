# C1 independent review packet — accessibility and trust

```yaml
packet_id: VISUAL-007-C1-REVIEW-A11Y-TRUST
requested_role: design-reviewer
requested_model: gpt-5.6-terra
requested_effort: high
execution_mode: read-only independent review
output: plans/batches/VISUAL-007-C1-today-missions/evidence/review-accessibility-trust.md
```

## Objective

Independently review C1 accessibility, consent, privacy, data honesty, safety, and ethical interaction behavior using the repository `design-auditor` and `ux-ui-designer` lenses. You are fresh and were not a C1 builder.

## Required sources

- `AGENTS.md`, `balencia-screens/AGENTS.md`
- `Balencia-New-Screens/canon/COMPACT-CANON.md`, `COMPONENT-CATALOG.md`
- All eleven C1 specs and current eleven C1 screen components named in the code-review packet
- Relevant kit controls, `balencia-screens/src/app/globals.css`, and `balencia-screens/scripts/verify-c1-today.mjs`
- Final evidence: `evidence/c1-interactions.json`, `evidence/c1-strict.json`, and promoted PNGs under `evidence/states/`

## Review requirements

- Check native semantics, accessible names, duplicate names, keyboard order, arrow-key tab behavior, visible focus, dialog/menu focus trap and focus return, Escape behavior, 44px targets, 16px editable text, 125% text robustness, disabled reasons, error identification, and contrast.
- Check destructive confirmation/undo, equal exits, non-coercive paywall treatment, privacy-safe media, consent/revoke/export/delete controls, source/freshness/confidence disclosure, offline/cached truth, and prototype-local action wording.
- Confirm no API/network/storage/file/clipboard/notification/purchase side effects are implied or performed in the evidence.
- Check S45 safety/data controls, S59 freeze consequences and recovery language, S73 photo privacy/hide/delete, and S97 consent/entitlement/paywall/action controls particularly closely.
- S12 is byte-locked and verify-only.
- Report only evidence-backed defects. Acceptance is blocked by any unresolved Critical/High/Medium.

## Allowed / denied

- Read sources and inspect images/read-only artifacts.
- Write **only** the output file named above, using `apply_patch`.
- Do not edit product/verifier/batch/shared docs or any other evidence.
- Do not start/stop servers, build, commit/stage/reset/clean, touch `yhealth-app`, Figma, or Railway.

## Output contract

Write a standalone Markdown report with provenance, evidence inspected, findings table (`ID | severity | screen/file | evidence | required repair`), counts by severity, and verdict (`PASS`, `CONDITIONAL`, or `FAIL`). Explicitly say `No Critical/High/Medium findings` when true and distinguish low-risk notes from acceptance defects.
