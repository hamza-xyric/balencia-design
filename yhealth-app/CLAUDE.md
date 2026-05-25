# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

yHealth is an AI-powered fitness & wellness SaaS platform. Monorepo with three main packages:

- **`client/`** — Next.js 16 frontend (App Router, React 19, TailwindCSS 4, Turbopack)
- **`server/`** — Express 5 backend API (TypeScript, PostgreSQL, Redis, BullMQ)
- **`shared/`** — Shared TypeScript types (duplicated: `client/shared/` and `server/shared/` each contain their own `types/` directory)

## Common Commands

### Client (from `client/`)
```bash
npm run dev          # Start Next.js dev server (port 3000)
npm run build        # Production build
npm run lint         # ESLint
npm test             # Jest (jsdom, SWC transform)
npm run test:watch   # Jest watch mode
```

### Server (from `server/`)
```bash
npm run dev          # Start with nodemon + tsx (port from .env, default 9090)
npm run build        # tsc + tsc-alias
npm run start        # Run compiled JS
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
npm test             # Jest (requires NODE_OPTIONS=--experimental-vm-modules)
npm run test:unit    # Unit tests only (tests/unit/)
npm run test:integration  # Integration tests (tests/integration/)
npm run test:watch   # Jest watch mode
```

### Database (from `server/`)
```bash
npm run db:setup     # Initial database setup
npm run db:migrate   # Run migrations
npm run db:migrate:auto   # Auto-detect and run pending migrations
npm run db:migrate:verify # Verify migration state
```
There are many domain-specific migration scripts (`db:migrate:chat`, `db:migrate:schedule`, etc.) — check `server/package.json` for the full list.

### Docker
```bash
docker-compose up    # Runs client (3000) + server (5000)
```

## Architecture

### Server Structure

The server follows a layered MVC pattern: **Routes → Controllers → Services → Database**

- `src/routes/` — Express route definitions (90+ route files covering every domain)
- `src/controllers/` — Request handling, input validation, response formatting
- `src/services/` — Business logic (200+ service files — the bulk of the codebase)
- `src/database/` — PostgreSQL migrations, raw SQL. Uses `pg` directly with connection pooling (no ORM for queries despite Prisma being a dependency)
- `src/config/` — Environment config (`env.config.ts`), database pool (`database.config.ts`), BullMQ queues (`queue.config.ts`), entitlements (`tool-entitlements.config.ts`)
- `src/middlewares/` — Auth (JWT), rate limiting, entitlement checks, error handling, file uploads (multer/S3)
- `src/jobs/` — Cron/scheduled jobs (45+ jobs: daily analysis, proactive messaging, WHOOP sync, streak validation, memory extraction, wiki synthesis, etc.)
- `src/workers/` — BullMQ queue workers (email, AI coach calls, embeddings, exercise ingestion, activity events)
- `src/lib/` — Utility modules
- `src/validators/` — Zod validation schemas

Path aliases are configured in `tsconfig.json`: `@/`, `@config/`, `@controllers/`, `@services/`, `@utils/`, etc. Build uses `tsc-alias` to resolve them.

The server is an ESM project (`"type": "module"` in package.json). All imports use `.js` extensions.

### AI/LLM Stack

The server heavily uses LangChain + LangGraph for AI features:
- `@langchain/anthropic`, `@langchain/openai`, `@langchain/google-genai` — Multi-provider LLM support
- `@langchain/langgraph` — Agent orchestration for the AI Coach
- `src/services/ai-coach/` — AI Coach service directory
- `src/services/langgraph-tools/` — LangGraph tool definitions
- `src/services/reasoning-graph/` — Reasoning graph services
- Vector embeddings via `pgvector` for semantic search
- TensorFlow.js for on-server sentiment analysis and sentence encoding

### Client Structure

Next.js App Router with route groups:
- `app/(pages)/` — All authenticated/main pages (dashboard, workouts, nutrition, wellbeing, ai-coach, chat, community, etc.)
- `app/api/` — Next.js API routes (auth, integrations, weather)
- `app/auth/` — Authentication pages
- `components/` — Organized by domain (dashboard, ai-coach, chat, wellbeing, admin, landing, etc.) plus `ui/` for shadcn/ui primitives
- `hooks/` — Custom hooks (auth, fetch, notifications, animations, subscriptions, etc.)
- `lib/` — API client (`api-client.ts`), auth utilities, socket client, analytics, push notifications
- `app/providers/` — React context providers (AlarmProvider, ChatCallProvider)

Styling: TailwindCSS 4 with Framer Motion, GSAP, and Lenis for animations. Dark mode default. Uses shadcn/ui + Radix UI primitives.

State management: TanStack Query for server state, Redux Toolkit for client state.

### Key Integrations

- **WHOOP** — Wearable data sync (sleep, HRV, strain, recovery)
- **Stripe** — Subscriptions and billing (webhook at `src/routes/webhooks/stripe.routes.ts`)
- **Spotify** — Music/soundscape features
- **Google Calendar** — Schedule sync
- **Firebase Admin** — Push notifications
- **Cloudflare R2** — File/image storage (via AWS S3 SDK)
- **Socket.IO** — Real-time chat, leaderboards, competition streams

### Deployment

- **Server**: Railway (Dockerfile, `railway.toml` with health check at `/api/health`)
- **Client**: Vercel or Railway (standalone Next.js output)
- **CI**: GitHub Actions (`ci.yml`)

## Branching & Commits

- Git Flow: `main` (prod), `develop` (staging), `feature/*`, `fix/*`, `hotfix/*`
- Conventional Commits: `feat(scope): message`, `fix(scope): message`, etc.

## Design Philosophy

The frontend targets a premium SaaS aesthetic — glassmorphism, gradient backgrounds, GPU-accelerated animations, dark mode. When building UI, use the existing design system (shadcn/ui components in `components/ui/`) and follow the patterns in `components/landing/` and `components/dashboard/` for visual style.

## Environment Variables

Server requires: `NODE_ENV`, `PORT`, `DATABASE_URL`, `JWT_SECRET`, `JWT_REFRESH_SECRET`. See `server/.env.example` for the full list.

Client uses `NEXT_PUBLIC_API_URL` to point to the backend.
