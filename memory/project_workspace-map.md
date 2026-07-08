---
name: project-workspace-map
description: Balencia is a multi-workspace monorepo — each subdirectory has its own purpose and often its own CLAUDE.md/AGENTS.md
metadata:
  type: project
---

Balencia is a premium AI life-coaching mobile app with deep RPG gamification. This repo is the design workspace, not a single app. Key lanes:

- `app_design 3/` — 90 screen spec markdown files (source of truth for IA/layout/components/states/motion).
- `balencia-screens/` — Next.js 16 visual-only prototype (iPhone frame), no backend/state.
- `balencia-screens-reviewed/` — UX audit workspace (batches, findings, rubric).
- `balencia-creatives-production/` — asset generation (Higgsfield AI), briefs + QA rubric + ledger.
- `figma-build-audit/` — living grade report for the Figma DS build.
- `Wireframes/` — 17-batch HTML wireframes, shared CSS.
- `Balencia/` — brand reference (Design-System-Overview.md, official logo assets).
- `framework/` — Forgeflow (this project's own method/process framework, vendored from `xyric-solutions/xyric-frameworks`).

`yhealth-app/` (production Next.js client + Express server) has **moved to its own repo** as of 2026-07-06 — confirmed with the founder. The ~3.2k tracked-but-deleted git entries under that path in this repo's worktree are expected drift from the split, not accidental data loss; leave them uncommitted/untouched unless the founder asks to finalize the split with a commit.

**Why:** each lane has different edit rules (e.g. audit lanes are read-only unless the user explicitly asks to edit) — see [[project-source-hierarchy]].
**How to apply:** before editing inside a lane, check for that lane's own AGENTS.md/CLAUDE.md; its rules override generic guidance.
