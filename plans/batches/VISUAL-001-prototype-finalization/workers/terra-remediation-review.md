# Worker packet — Terra remediation/evidence review

- Parent batch: `VISUAL-001`
- Role intent: independent read-only design reviewer; requested project profile `.codex/agents/design-reviewer.toml` (`gpt-5.6-terra`, high).
- Authority: evidence only; this worker does not accept the batch or set art direction.
- Scope: reconcile current remediation truth and propose bounded audit priorities before fresh rendered evidence is captured.
- Read first: the 2026-07-08 audit `REPORT.md`, `REMEDIATION-PLAN.md`, `SCREEN-COVERAGE-MATRIX.md`, current `REMEDIATION-LEDGER.md`, `WAIVERS.md`, `R0/new-rw-items.md`, current canon, component catalog, and representative current shared files (`globals.css`, `kit/cia.tsx`, button components, kit exports).
- Allowed actions: read-only file/code inspection and non-mutating shell commands.
- Denied actions: no edits; no network; no browser; no Figma; no `yhealth-app`; no git mutation; no art-direction or readiness decision; no child agents.
- Required findings:
  1. Verify historical B+/84, 104/0/21, R0 59H/101M/70L, ledger/waiver status against files that exist now.
  2. Identify stale, superseded, duplicated, or unowned remediation items.
  3. Reproduce or refute the starting hypotheses for the Cia orb, shared CTA treatment, raw one-off CTAs, and icon system using current code evidence.
  4. Propose severity-ranked systemic roots and a 5–7-screen pilot set, but explicitly defer final art direction because Image 1 and Image 2 are absent.
  5. Map the proposed audit batches to the existing A24/RW authority; do not create new durable IDs.
  6. Runtime provenance if exposed; otherwise state it is unavailable.
- Output shape: sources read; verified facts; drift; severity-ranked systemic risks with file:line evidence; pilot candidates; uncertainties; recommended Sol follow-up.
- Stop condition: source conflict that cannot be resolved from the hierarchy, or any required write/network action.
- Verify: Sol independently inspects cited code/evidence and owns all durable ledger updates.
