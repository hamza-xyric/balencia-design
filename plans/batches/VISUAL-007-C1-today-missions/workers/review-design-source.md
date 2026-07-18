# C1 independent review packet — design and source fidelity

```yaml
packet_id: VISUAL-007-C1-REVIEW-DESIGN
requested_role: design-reviewer
requested_model: gpt-5.6-terra
requested_effort: high
execution_mode: read-only independent review
output: plans/batches/VISUAL-007-C1-today-missions/evidence/review-design-source.md
```

## Objective

Independently review C1 for premium visual quality, canonical component use, information hierarchy, source/spec fidelity, RPG truth, and cross-screen coherence. Use the repository `design-auditor` and `ux-ui-designer` lenses. You are fresh and were not a C1 builder.

## Required sources

- `AGENTS.md`, `balencia-screens/AGENTS.md`
- `Balencia-New-Screens/canon/COMPACT-CANON.md`
- `Balencia-New-Screens/canon/COMPONENT-CATALOG.md`
- `Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/REFERENCE-DIRECTION.md`
- `Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/DECISIONS.md`
- `RPG_SYSTEM_DESIGN.md` sections governing streak/recovery multipliers
- All eleven C1 specs under `Balencia-New-Screens/hifi-screens/` named in the code-review packet
- Current eleven C1 screen components
- Final renders in `plans/batches/VISUAL-007-C1-today-missions/evidence/states/`, emphasizing `41-default.png`, `59-default.png`, `73-default.png`, `73-media-hidden.png`, `97-default.png`, and `97-plan-actions.png`
- `evidence/c1-interactions.json` and `evidence/c1-strict.json`

## Review requirements

- Judge the 390x844 rendered evidence, not static code alone.
- Check focal hierarchy, viewport composition, typography floors, spacing, density, canonical glass/solid usage, semantic orange/green/purple use, native mobile affordances, and state coherence.
- Verify each screen's required composition and data-honesty/provenance contract, including S59 42-day `2.0×` and deliberate-rest recovery `1.3×` capped at `2.0×`, S73 privacy-safe media, and S97 canonical PaywallLock plus full plan controls.
- Treat accepted decisions/waivers as authority; do not revive stale `SIA`, teal-primary, or retired-value guidance.
- S12 is verify-only and byte-locked; do not propose aesthetic churn on it.
- Report only evidence-backed defects. Acceptance is blocked by any unresolved Critical/High/Medium.

## Allowed / denied

- Read sources and inspect images/read-only artifacts.
- Write **only** the output file named above, using `apply_patch`.
- Do not edit product/verifier/batch/shared docs or any other evidence.
- Do not start/stop servers, build, commit/stage/reset/clean, touch `yhealth-app`, Figma, or Railway.

## Output contract

Write a standalone Markdown report with provenance, sources/renders inspected, findings table (`ID | severity | screen | evidence | required repair`), counts by severity, and verdict (`PASS`, `CONDITIONAL`, or `FAIL`). Explicitly say `No Critical/High/Medium findings` when true; separate optional polish from acceptance defects.
