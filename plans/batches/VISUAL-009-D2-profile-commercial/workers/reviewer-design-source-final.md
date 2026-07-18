# D2 final independent review packet — design/source fidelity

- Packet: `D2-REVIEW-DESIGN-SOURCE-FINAL`
- Status: `issued`
- Role intent: fresh non-builder Terra design/source reviewer, high effort (`W-MODEL` applies)
- Execution: read-only; no edits, builds, browsers, servers, verifier execution, git operations, evidence writes, or acceptance authority
- Output channel: agent response only; Sol verifies and persists any accepted finding

## Objective

Review all seven D2 screens and the frozen matrix against the active Balencia source hierarchy and embedded Design Auditor/UX rules. Find any Critical, High, or Medium source-fidelity, visual-system, hierarchy, responsiveness, or design-handoff defect in the current code candidate.

## Candidate binding

Use the exact hashes in `workers/reviewer-clear-final.md`. Recompute start/end hashes for the seven product files and report drift; review current bytes even if drift occurs, but do not accept them.

## Required inputs

- Root and `balencia-screens/` guidance
- D2 `BATCH.md`, frozen `VERIFICATION-MATRIX.md`, reconciliation and builder evidence
- `VISUAL-001/audit/D2-profile-commercial.md` and `audit-sheets/D2-profile-commercial-social.png`
- Current specs `19,42,43,68,71,83,92`
- `COMPACT-CANON.md`, `COMPONENT-CATALOG.md`, `REFERENCE-DIRECTION.md`, `RPG_SYSTEM_DESIGN.md`, and current globals/tokens
- Seven current product files and relevant imported primitives
- Existing D2 `before/` PNGs for regression context; current `after/` evidence only if present and complete

## Review focus

- Premium Quiet-orbit / burnished-ember hierarchy, one focal moment, spacing rhythm, typography, domain tokens, surface/elevation discipline, and code-native iconography
- Exact 390×844 and real 125% reflow feasibility; sticky/nav/scroll boundaries; no clipped CTA, title, chips, dialogs, or comparison/paywall exits
- Current ten-domain/Life Power and Achievement terminology; visible `CIA` casing; no stale RPG/ring/domain taxonomy
- Source-specific copy, values, provenance/confidence/honest-null presentation, and distinct degraded states
- S42 neutral code-native emblem, S43 accepted pilot fidelity, S83 initials/no-raster disposition, and S92 canonical PaywallLock
- React/Tailwind design handoff quality: reusable tokens/primitives where appropriate without flattening screen-specific composition

## Output contract

Return severity-ranked findings with absolute `file:line` plus the exact spec/canon/audit source. For visual evidence, name the relevant PNG/state when available. State candidate drift separately. If no blocking defect remains, explicitly report `0 Critical / 0 High / 0 Medium`; Low polish notes may follow.

## Stop conditions

Stop and report if a required authority source is missing, a conflict cannot be resolved by the declared hierarchy, or completing review would require any write/runtime/Figma action.
