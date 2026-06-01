# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Repo Is

**Balencia** is a premium AI life coaching mobile app with deep RPG gamification. This repository is the **design workspace** — it contains screen specifications, a visual prototype, HTML wireframes, creative asset production, UX audit artifacts, and the production app codebase. It is not a single-app repo; it is a multi-workspace monorepo where each subdirectory has its own purpose, CLAUDE.md, and agent rules.

## Workspace Map

| Directory | Purpose | Has own CLAUDE.md / AGENTS.md |
|-----------|---------|-------------------------------|
| `app_design 3/` | 99 screen specification markdown files (85 numbered + sub-screens + meta docs). Source of truth for every screen's IA, layout, components, states, and motion. | `_session-prompt.md` governs design sessions |
| `balencia-screens/` | Next.js 16 visual prototype — renders each screen inside an iPhone frame for review. Visual-only, no backend. | Yes — see `AGENTS.md` there |
| `balencia-screens-reviewed/` | UX audit workspace — batch-based screen reviews, findings, scoring rubrics, A++ re-review pass, team roles. | Yes — `AGENTS.md` + `teams/` |
| `balencia-creatives-production/` | Asset production (Higgsfield AI generation) — briefs, QA rubric, generation ledger, accepted outputs. | Yes — `AGENTS.md` |
| `figma-build-audit/` | Living grade report for the Figma DS build (premium A+++ bar): `RUBRIC.md`, `REPORT.md`, `findings-ledger.md`, `methodology.md`, `history/`, `scripts/consistency-check.mjs`. Audit (read-only) via `/figma-build-auditor`; remediate findings via `/figma-build-fixer` (plan-then-apply; writes to Figma + globals.css/maps + prototype). | `methodology.md` |
| `Wireframes/` | HTML wireframes organized in 17 batches, rendered via `balencia-foundation.css`. Browser-viewable reference for Figma. | `WIREFRAME-PROMPT.md` |
| `Balencia/` | Brand reference — `Design-System-Overview.md`, `Balencia-Creatives-Reference/` (logos, brand assets, `CREATIVE-REFERENCE.md`). | No |
| `yhealth-app/` | Production app codebase (Next.js 16 client + Express 5 server). Has its own CLAUDE.md with full architecture docs. | Yes |
| `Archive/` | Historical drafts, meeting transcripts, earlier design versions. Read-only reference. | No |

## Key Design Documents

- **Screen specs**: `app_design 3/NN-screen-name.md` (85 screens, numbered 01–85)
- **Shared patterns**: `app_design 3/_shared-patterns.md` — canonical component specs, design tokens, motion, interaction models, accessibility standards. Read this before any screen work.
- **Tier matrix**: `app_design 3/_tier-matrix.md` — free vs. premium feature gates
- **XP reward table**: `app_design 3/_xp-reward-table.md`
- **Design system**: `Balencia/Design-System-Overview.md` — brand foundation, color system, typography, spacing, component primitives
- **RPG system**: `RPG_SYSTEM_DESIGN.md` — full gamification spec (WoW-inspired, 10 life domains, stat system, quest chains, progression)
- **Life Correlation Matrix**: `LIFE_CORRELATION_MATRIX.md` — cross-domain correlation engine (Balencia's core differentiator)
- **Feature audit**: `Features.md` — complete inventory comparing yHealth production features to Balencia rebrand
- **Creative reference**: `Balencia/Balencia-Creatives-Reference/CREATIVE-REFERENCE.md` — current creative authority for asset work

## RPG Terminology (Used in All UI Copy)

Goals are **Missions**. The goals list is the **Mission Board**. Types: Life Mission (gold), Main Mission (silver), Side Mission (bronze), Weekly Mission (steel), Daily Mission (sage), Group Mission (copper). Overall score is **Life Power**. Per-domain scores are **Domain Stats** (0–99). Social groups are **Squads** (temporary, 2–5 people) and **Communities** (persistent).

## Brand Color System (60/30/10)

- `brand-orange` #FF5E00 — primary CTA, active states, progress fills (60%)
- `forest-green` #34A853 — success, completion, health metrics (30%)
- `royal-purple` #7F24FF — SIA/AI indicators only (10%)
- `ink-900` #0A0A0F — screen background
- `ink-brown-800` #211008 — card surfaces (glassmorphism)
- `paper-100` #FEFAF3 / `paper-50` #FDFDFB — text on dark

## Prototype Commands (from `balencia-screens/`)

```bash
npm run dev              # Start Next.js dev server
npm run build            # Production build
npm run lint             # ESLint
npm run typecheck        # tsc --noEmit
npm run check            # lint + typecheck + verify:routes + verify:assets + verify:copy + verify:brand
npm run verify:routes    # Validate all screen routes exist
npm run verify:assets    # Check required assets are present
npm run verify:copy      # Verify UI copy matches specs
npm run verify:brand     # Check brand token compliance
npm run verify:visual    # Visual regression (use with VISUAL_AUDIT_BASE_URL)
```

Run `npm run check` before marking any batch complete.

## Production App Commands (from `yhealth-app/`)

See `yhealth-app/CLAUDE.md` for full details. Key commands:
```bash
# Client (from yhealth-app/client/)
npm run dev              # Next.js dev (port 3000)
npm run build && npm test

# Server (from yhealth-app/server/)
npm run dev              # Express dev (port from .env)
npm run typecheck && npm test
npm run db:migrate       # Run database migrations
```

## Source Hierarchy (When Documents Conflict)

1. `CREATIVE-REFERENCE.md`, official logo files, and current `balencia-screens` CSS tokens are canonical
2. `app_design 3/_shared-patterns.md` is canonical for component specs
3. `Balencia/Design-System-Overview.md` is supplemental
4. If any older file describes a teal-primary or three-pillar health palette, ignore it — the current system is warm ink / burnt orange / forest green / royal purple

## Agent Workflow Rules

- **Prototype is visual-only**: no API calls, auth logic, backend state, or state management libraries in `balencia-screens/`
- **Screen reviews are audit-only**: do not edit `balencia-screens/` or `app_design 3/` during audit sessions unless the user explicitly asks
- **Creative production**: do not AI-generate or approximate the Balencia logo — use official assets from `Balencia/Balencia-Creatives-Reference/logos/`
- **Batch discipline**: review/implement screens in batches (typically 3–12 screens per session). Always read the screen spec and `_shared-patterns.md` before working on a screen
- Each sub-workspace has its own AGENTS.md — read it before starting work in that directory

## Tech Stack Summary

| Layer | Stack |
|-------|-------|
| Prototype | Next.js 16, React 19, Tailwind CSS 4, Framer Motion, Recharts, Lucide React |
| Wireframes | Static HTML + shared CSS (`balencia-foundation.css`) |
| Production client | Next.js 16, React 19, TailwindCSS 4, shadcn/ui, TanStack Query, Redux Toolkit |
| Production server | Express 5, TypeScript (ESM), PostgreSQL, Redis, BullMQ, LangChain/LangGraph |
| Creative production | Higgsfield MCP (image/video generation), manual QA pipeline |
| Deployment | Railway (server), Vercel or Railway (client) |
