# Worker Task Packet - HIFI-PROTOTYPE-A GLM Rendering Architecture

- Batch ID: HIFI-PROTOTYPE-A
- Worker profile and harness: GLM workflow sub-worker via `scripts/glm-worker.sh`
- Source hierarchy: `Balencia-New-Screens/hifi-screens/` is the new source of truth; existing `balencia-screens/` is shell and component reference only.
- Tie-breaker: new hi-fi specs and `_HIFI-LEDGER.md` win over legacy `app_design 3/` and SIA-era routes.
- Exact scope: propose a compact reusable rendering architecture for Batch A only.
- Allowed files for worker to inspect conceptually: `_HIFI-LEDGER.md`, `_IMAGE-SLOTS.md`, four representative specs, existing layout component names.
- Denied actions: no file edits, no final readiness decisions, no secrets, no production/backend assumptions, no SIA visible-copy recommendations.
- Task prompt: draft a short architecture note for a `/screens/[id]` visual-only renderer with 10 reference screens and source-specific fallback inventory cards.
- Verify command: `cd balencia-screens && npm run check`
- Evidence path: `plans/batches/HIFI-PROTOTYPE-A/glm-rendering-architecture.md`
- Stop condition: stop after one concise draft; Codex reviews before implementation.
- Output format: Markdown with architecture bullets, risks, and screen-batch recommendation.
- Orchestrator review checklist: source fidelity, CIA naming, visual-only, route scalability, verification impact.
