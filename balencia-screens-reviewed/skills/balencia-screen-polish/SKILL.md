---
name: balencia-screen-polish
description: Use when implementing or verifying Balencia screen iteration batches in balencia-screens-reviewed/screen-iteration-batches, especially for slow premium UX polish, route-level QA, accessibility, trust/privacy, mobile ergonomics, build readiness, and documentation closure after the audit-feedback implementation pass.
---

# Balencia Screen Polish

Use this skill for P-batch implementation and verification after the audit feedback has already been integrated into specs and prototype routes.

## Required Sources

- Active P batch: `../screen-iteration-batches/PXX-*.md`
- P batch index: `../screen-iteration-batches/index.md`
- Original audit evidence: `../batches/`
- Update-batch contract: `../update-batches/`
- Resolved decisions: `../findings/deferred-decisions.md`
- Prototype: `../../balencia-screens`
- Screen specs: `../../app_design 3`

## Workflow

1. Read the active P batch first.
2. Read only the original audit batch, update batch, specs, and route files for the assigned screens.
3. Treat `Audit Feedback Integration (2026-05-26)` as the current contract when older spec text conflicts.
4. Review and fix one route at a time.
5. Keep edits scoped to the active P batch.
6. Prefer existing Balencia components, domain data, route conventions, and dark-first styling.
7. Do not lower the premium bar to satisfy mechanical checks; record unresolved quality issues as findings.

## Quality Gates

Judge every screen on:

- five-second clarity
- primary action clarity
- premium Balencia feel
- SIA restraint and explicit consent
- mobile ergonomics and 44px target safety
- trust/privacy before sensitive action
- accessible labels, focus order, and semantic controls
- no clipped text, overlap, or bottom-action collisions

## Verification

Always run from `../../balencia-screens`:

```bash
npm run check
```

Run production build for P00, P03, P06, P09, P12, P15, and P18:

```bash
npm run build
```

Run visual audit when routes include fixed bottom actions, overlays, SIA composer, media, or high-risk layouts:

```bash
VISUAL_AUDIT_BASE_URL=http://localhost:3005 npm run verify:visual
```

If the app runs on another port, record the actual URL in the P batch.

## Closeout

Before finishing, update the active P batch with:

- status
- changed files
- findings addressed
- findings deferred with reasons
- browser QA evidence
- check/build/visual-audit results

Update `screen-iteration-batches/index.md` when the batch status changes.
