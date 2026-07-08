# Reviewer Personas (Audit Team)

Each file is **one reviewer persona = one risk lens** (FRAMEWORK.md Verify (A6)). Personas are audit-only by default: they surface evidence-backed findings, blockers, and recommendations; they do not edit.

The six generic personas here are generalized from a UI/UX build. Rename or retarget them to your domain's real risk lenses, or copy optional domain packs from `packs/`, but keep this contract in every persona:

- Mission.
- Review focus.
- Evidence required.
- Output format.
- What this role can block.
- What this role cannot decide alone.

| Persona file | The lens | Non-UI analogue |
|--------------|----------|-----------------|
| `strategist.md` | does this make sense / belong here? | product/architecture fit |
| `competitive.md` | is it best-in-class? | prior-art / benchmark |
| `content-trust.md` | clear, honest, safe? | docs clarity / security / privacy |
| `brand-guardian.md` | consistent and on-system? | API/style consistency |
| `interaction-qa.md` | does it work mechanically? | correctness / operability QA |
| `release-readiness.md` | is the build true? | CI/build verification sign-off |

All personas share one finding format: ID, status, severity, finding, evidence/source, owner, blocked work, next action, closure condition.

## Optional Domain Packs

These packs are audit-only starting points. Copy the ones that match the project into the active team/rubric setup, then tune them to the project's source hierarchy and verification matrix.

| Pack | Use when |
|------|----------|
| `packs/backend-api.md` | APIs, services, jobs, contracts, persistence, or migrations changed. |
| `packs/frontend-product.md` | User-facing UI, flows, accessibility, or product behavior changed. |
| `packs/ai-data-provenance.md` | AI outputs, datasets, retrieval, citations, evals, or provenance changed. |
| `packs/security-privacy.md` | Auth, permissions, secrets, tenant boundaries, logs, or sensitive data changed. |
| `packs/health-safety.md` | Health, safety, regulated, emergency, or high-risk user-impacting behavior changed. |
| `packs/docs-research.md` | Docs, research, framework, citations, handoffs, or source hierarchy changed. |
