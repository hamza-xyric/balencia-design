# BIOS-002 Evidence — Local Backend Up (Item BIOS-002-01)

Date: 2026-07-08 (night). All commands from `yhealth-app/server`.

## Infrastructure

| Piece | Value |
| --- | --- |
| Postgres | Docker `balencia-postgres`, image `pgvector/pgvector:pg16`, port **5433**, db `balencia_dev`, user `balencia` (dev password `balencia_dev_local` — local container only) |
| Redis | Docker `balencia-redis`, image `redis:7`, port **6380** |
| Server | `npm run dev`, port **9090**, host 127.0.0.1 |
| Isolation | Deliberately NOT the medplum containers on 5432/6379 (different project) |

## Server env (`server/.env`, gitignored, values never printed)

Names only: NODE_ENV, PORT, HOST, DATABASE_URL, JWT_SECRET, JWT_REFRESH_SECRET, ENCRYPTION_KEY,
SESSION_SECRET, REDIS_URL, ENABLE_BACKGROUND_JOBS=false, CORS_ORIGIN, LOG_LEVEL, plus
ANTHROPIC_ENABLED / ANTHROPIC_API_KEY / ANTHROPIC_BASE_URL / ANTHROPIC_MODEL (see LLM note).
JWT/encryption/session secrets are freshly generated local-dev values (openssl rand), not shared with any real environment.

## LLM provider for local dev (key finding)

- The server **cannot boot with zero LLM providers**: `user-coaching-profile.service.ts:2862`
  instantiates its service at module scope; the constructor calls `modelFactory.getModel()` which
  throws → nodemon crash loop. (Scout claim "no hard boot failure without AI keys" was wrong at
  module-import level — corrected here.)
- Config-only fix (no server code touched): `ANTHROPIC_ENABLED=true` + `ANTHROPIC_API_KEY=<ZAI key>`
  + `ANTHROPIC_BASE_URL=https://api.z.ai/api/anthropic` + `ANTHROPIC_MODEL=glm-5.2`.
  The Anthropic SDK honors `ANTHROPIC_BASE_URL`; Z.ai's Anthropic-compatible endpoint serves GLM.
  Boot log: `[ModelFactory] Primary provider: anthropic`. GLM is the approved external worker;
  only synthetic seeded-test-user data flows through it. **Local dev only — never a production posture.**
- Caveat: MODEL_MAP `light`/`nano` tiers hardcode `claude-haiku-4-5-20251001`; those per-request
  calls may fail against Z.ai. Chat (`default`/`reasoning` tiers) verified working.

## Database setup sequence (fresh DB)

1. `npm run db:setup` — base schema in FK order. Requires **pgvector** (plain `postgres:16` fails with `type "vector" does not exist`).
2. `npm run db:migrate` — patch migrations. Fails on a fresh DB if run BEFORE db:setup (`user_plans does not exist`).
3. `npm run db:migrate:auto` — timestamped migrations (creates `life_areas`, `life_area_links`, …). Emits statement-splitter warnings (see findings).
4. `src/database/tables/139-life-area-checkins.sql` applied **manually via psql** — no runner applied it and `/life-areas/summary` 500s without it.
5. `npm run db:seed:test-users` — 15 users (`john.doe@balancia.test` … password `Test1234!`, bcrypt, email pre-verified, onboarding completed). Local dev DB only; production QA account decision remains Hamza's (waiver W4).

## Endpoint exercise (mobile token, samples in `endpoint-samples/`)

| Endpoint | Result |
| --- | --- |
| POST /api/auth/login (X-Client: mobile) | 200 — body includes `data.tokens.{accessToken,refreshToken,expiresIn:900}` + PublicUserProfile (`auth-login-mobile.json`, tokens redacted) |
| GET /api/auth/me | 200 (`auth-me.json`) |
| POST /api/auth/refresh | 200, full rotation — new pair issued; **replay of old refresh token → 401 "Refresh token mismatch"** (single stored token per user confirmed) |
| GET /api/v1/goals/unified | 200 — `{goals:[], summary{total,active,inProgress,paused,completed,avgProgress,bySource}}` |
| GET /api/life-areas/summary | 200 after fixes — `{activeAreaCount,totalLinks,averageMomentum,areas[]}` (snake_case rows) |
| GET /api/gamification/stats | 200 — `{stats{totalXP,currentLevel,currentStreak,longestStreak,lastActivityDate,levelProgress}}` |
| GET /api/workouts/plans | 200 — `{plans:[]}` |
| GET /api/v1/overview/dashboard | 200 — full typed Today payload (`v1-overview-dashboard.json`) |
| GET /api/auth/onboarding-status | 200 (`auth-onboarding-status.json`) |
| GET /api/preferences | 200 (`preferences.json`) |
| POST /api/ai-coach/chat | 200 — **real LLM completion** via GLM provider; `{sessionId,message,...}`; honest "no sleep logs yet" coaching reply (`ai-coach-chat.json`) |

Fresh-account empty states captured deliberately — they are the DTO truth for loading/empty/error design states.

## Findings (upstream server issues, not fixed in this batch)

1. **Migration runners incomplete for fresh installs**: three overlapping systems (`db:setup` table list, `db:migrate` SQL set, `db:migrate:auto`), none covers `139-life-area-checkins.sql`; fresh-install order is undocumented (setup → migrate → migrate:auto → manual 139). Owner: server backlog.
2. **Statement splitter bugs**: `db:migrate:auto` mis-splits SQL comments (`31-voice-calls.sql`, `45/46/47/50-*.sql`, `107-finance.sql`, `111/112/127-*.sql`) producing noisy pseudo-errors; also `58-goal-daily-tracking.sql` + `add-achievement-constraints.sql` reference relations that don't exist on fresh DBs. Owner: server backlog.
3. **Boot requires an LLM provider** (module-scope singleton) — should degrade gracefully. Owner: server backlog.
