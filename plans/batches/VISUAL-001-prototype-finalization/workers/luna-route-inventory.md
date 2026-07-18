# Worker packet — Luna route and consumer inventory

- Parent batch: `VISUAL-001`
- Role intent: read-only scope scout; requested project profile `.codex/agents/scope-scout.toml` (`gpt-5.6-luna`, medium).
- Authority: evidence only; Sol/root decides truth and readiness.
- Scope: reconcile the canonical screen/route set and mechanically inventory shared visual-system consumers.
- Read first: `balencia-screens/AGENTS.md`, `balencia-screens/src/data/screens.ts`, current `/screens/[id]` route/registry, `Balencia-New-Screens/hifi-screens/_HIFI-LEDGER.md`, `Balencia-New-Screens/_MASTER-LEDGER.md`, `Balencia-New-Screens/build-progress/BUILD-LEDGER.md`.
- Allowed actions: read-only file inspection and non-mutating shell commands.
- Denied actions: no edits; no dev server; no network; no Figma; no `yhealth-app`; no git mutation; no readiness/art-direction decision; no child agents.
- Required findings:
  1. Counts and exact IDs from `screens.ts`, screen modules, route registry, hifi ledger, master ledger, and build ledger.
  2. Duplicate, missing, unreachable, local-only, or metadata-divergent IDs.
  3. Screen-family grouping with module/file paths.
  4. Consumers of `CIAPresenceOrb`, shared button components, raw `<button>`/button-like controls, shared Cia kit, and icon imports/registries.
  5. Exact reproducible commands and file:line evidence.
  6. Runtime provenance if the collaboration surface exposes it; otherwise state that it is unavailable.
- Output shape: concise evidence report with scope checked, sources read, commands, counts, discrepancies, consumer lists, uncertainties, and recommended Sol follow-up.
- Stop condition: source conflict that the declared hierarchy cannot resolve, or any required write/network action.
- Verify: Sol independently re-runs all closure-relevant counts.
