# Worker packet — Luna strict-harness readiness audit

- Parent batch: `VISUAL-001`
- Role intent: read-only mechanical verifier; requested Luna-class work.
- Authority: evidence only; Sol/root owns baseline execution and conclusions.
- Scope: determine exactly how the current strict visual harness and app scripts behave before Sol starts the server or captures evidence.
- Read first: `balencia-screens/AGENTS.md`, `balencia-screens/package.json`, `balencia-screens/scripts/verify-visual-104.mjs`, related visual scripts/config, current historical strict JSON/summary, and relevant installed Next.js 16 docs for dev-server or framework-sensitive assumptions.
- Allowed actions: read-only file inspection and non-mutating shell commands such as `node --check`, `--help`, or source searches that do not start a server or write artifacts.
- Denied actions: no edits; no dev server; no screenshots; no network; no Figma; no `yhealth-app`; no git mutation; no child agents.
- Required findings:
  1. Exact supported CLI flags/defaults, especially `--base`, `--only`, `--screenshots`, output paths, viewport, device scale, reduced motion, font/animation settling, and exit conditions.
  2. Whether the prompt's proposed local and Railway commands are valid as written.
  3. Determinism gaps or risks that must be controlled before capture.
  4. Historical evidence schema/counts available for comparison.
  5. Package/runtime prerequisites, including `npx`/Playwright availability, without installing anything.
  6. Runtime provenance if exposed; otherwise state it is unavailable.
- Output shape: sources read; exact commands; supported/unsupported flags; determinism findings; baseline execution recommendation; blockers.
- Stop condition: any required write/network/install action or unresolved source conflict.
- Verify: Sol independently inspects the script and runs the accepted commands.
