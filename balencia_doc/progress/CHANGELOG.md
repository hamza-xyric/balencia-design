# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

> **2026-05 → 2026-07 build-out**: A large post-MVP module wave shipped after the 2026-04-28 freeze (P52).
> Full per-commit detail: [`CHANGELOG-2026-05-07.md`](../CHANGELOG-2026-05-07.md) · master inventory: [`MODULES-AND-FEATURES.md`](../MODULES-AND-FEATURES.md).
> Infra grew to **365 services / 122 controllers / 120 routes / 69 jobs / 154 tables / 205 migrations / 130 pages / 47 LangGraph domains**.

### Added — New Major Modules (May → Jul 2026)
- **SIA AI-coach overhaul** — Cia→SIA rebrand; whole-life scope; Provenance v2 (estimates never narrated as measured); Evidence & Answerability gate (Wave 0); Context assembler — accountability risk + contradictions + personal baselines (Wave 1); 8 intelligence controllers + turn-intelligence contract (Wave 2); Confidence Engine (4-axis deterministic scorer); Adaptive Reasoning & Discovery engine (ARE); Emotional Intelligence (per-turn, 10 coaching-mode personas); Semantic Memory retrieval + observability.
- **Career Module + Execution OS** — schema, services, AI tools, jobs, API, UI (`/career`); weekly execution engine, per-level task editor, scheduling, scoring, accountability, focus areas, analytics consistency heatmap & momentum chart, badges, resource links.
- **Social Growth OS** — Groups/Pods, reputation, rewards, social feed, mentors, circles, reporting, opt-in matching, score validation.
- **Relationships CRM** — personal-relationship pillar (Social Health); connection graph, follow, personal contacts.
- **Life Correlation Matrix (LCM)** — cross-pillar directed PG graph (10 nodes), MT1 orchestrator.
- **Document Intelligence** (🚩 flag-gated) — upload→OCR→chunk→embed→analytics, RAG `/ask`, doc→wiki, `@mention`, medical gate, markdown source-kind, trends pagination.
- **Knowledge Graph** — graph builder, typed nodes, filters, D3 force-graph, node/entry detail modals.
- **Wiki + Neural Graph** — `.md` first-class documents, 4th "Graph" tab (living-brain canvas), reliability scoring, paginated trends.
- **Reputation** — score history + breakdown endpoints + premium page rebuild (pure-SVG clay charts).
- **Virtual Try-On / AI Fashion Studio** (🚩) — Wave 1+2: saved looks, wardrobe, AI Style Coach (real `getStyleProfile`), before/after comparison.
- **Reflection (double-tap)** — journal entry + `reflection_details` across journal, dashboard & coaching.
- **Accountability hardening + Witness** — full contract lifecycle state machine, enforcer acceptance handshake + per-contact consent, revived consent-gated SOS wellness-check, variable-reward wiring; witness/peer-verification (🚩 flag-gated, OFF).
- **Analytics Engine** — ECharts renderer (Balencia dark theme) + AnalyticsEngine orchestrator + OutputFormatter + CrossDomainCorrelator + BehavioralIntelligenceService + MetricRegistry; runAnalyticsQuery / getBehavioralProfile / getLifestyleBalanceRadar tools.
- **Churn + Trust ML models** — logistic regression; admin consoles.
- **Community / Moderation** — content moderation, community orchestration, social feed governance.
- **Newsletter** — subscription lifecycle, welcome email, admin management.

### Added — Pillar Premium Rebuilds (Brand v2.1 clay/glass + real data)
- Leaderboard (real aggregation backend, trends, pillars, trust/privacy).
- Competitions (real `component_scores` via LATERAL join, 6-pillar chart).
- Pods / Groups (`/groups`, tabbed, consent-aware).
- Feed (server-side humanizer).
- Life Areas (`life_area_checkins` + momentum engine, honest-null).
- Money Map / Finance (statement scanner, spending orbit, deterministic AI insights, soft-delete filters).
- Wellbeing (brand-v2 UI + wellbeing-summary API; mental-recovery & stress provenance).
- Achievements (dynamic tree journeys, real-source rewards via UPSERT catalog + sync-prune, XP leaderboard).

### Added — Platform / Overview / Onboarding
- Overview v2 "Life-OS" — Life Pulse hero, health-vitals rings, Today's Journey clay timeline, Life Balance Wheel, Momentum Center, Relationship Hub, dark-claymorphism token system + primitive adoption, honest-null throughout.
- Brand v2 / v2.1 re-theme (teal → burnt-orange + Sora); typography migration (legacy-token aliasing).
- Scoring canonicalization — single domain source → life score + wheel; pure 0-100 mappers across 8 domains.
- Cinematic landing (Acts I–V) + CinematicSplash/RouteLoader preloader (GPU-cheap clay DOM; three.js removed; `usePerformanceTier` for low-end PCs).
- Onboarding — multi-domain goals + unified assessment v2, batched MCQ quick-assessment, free onboarding coach (turn-cap, no spoofable bypass), integrations welcome modal.
- Emotional check-in reworked — deterministic scoring (was fabricated), fail-closed crisis detection, Idempotency-Key.

### Added — Security / Ops / Infra
- OAuth tokens encrypted at rest (AES-256-GCM).
- Auth: HttpOnly cookie tokens, hashed refresh tokens, password-reset tracking, sensitive-key redaction, hardened CSP.
- SchedulerRegistry — centralized job lifecycle + health/failure alerts; `Promise.allSettled` batch hardening.
- Background-job fleet activity-gated (`ENABLE_BACKGROUND_JOBS`); Redis MISCONF storm throttled.
- Socket.IO cluster adapter (Redis pub/sub bridge, `CLUSTER_MODE`).
- WebRTC env-driven ICE + TURN fallback + `/webrtc/ice-servers`.
- Deploy self-heal (migration checksum drift), duplicate-version rename, `DATABASE_URL` provisioning.
- Global timezone fix — `COALESCE(user_preferences.tz, users.tz, UTC)` + backfill trigger migration `20260707160000`.
- Response Optimization Layer (message library + hybrid response).
- Delete-account flow + user country + self routes.

### Added — Voice / WhatsApp / Calling
- AI coach calling system — voice call UI (ringtone, scheduling, audio stream), BullMQ scheduling + WebRTC signaling, `ENABLE_VOICE_CALLS`/`ENABLE_CHAT_CALLS` flags.
- WhatsApp intelligence layer (E03 un-deferred, 🚩) — Baileys-primary gateway/consent/mirror/preflight, Cloud API fallback, inbox → `whatsapp_mirror_messages`, phone-number linking, privacy/retention pruning.
- Voice barge-in VAD, camera facing, AI coach image attachments.

### Changed
- Updated leaderboard layout to include DashboardSidebar navigation (2026-02-16)
- Updated DashboardLayout to handle leaderboard and competitions routes (2026-02-16)
- Enhanced active route detection to support leaderboard and competitions views (2026-02-16)
- Changed competitions from query parameter (`/leaderboard?view=competitions`) to separate page (`/competitions`) (2026-02-16)
- Premium AAA arm/hand tuning: absolute target poses, parent-space channels, subtle micro-pulse gestures (2026-02-26)
- Chat UI: replaced spinner with WhatsApp-style skeleton loading (2026-02-26)
- Nutrition tab: enhanced MealCard and TodayTab components (2026-02-26)
- Server: improved AI coach, LangGraph chatbot, daily analysis, message, and automation services (2026-02-26)
- Rebranded AI coach **Cia → SIA** across server + all client UI (2026-05-20).
- Broadened coach scope from health-only to whole-life (2026-06-23).

### Fixed
- Avatar arms rotating backward behind torso: switched from multiply to slerp absolute targets (2026-02-26)
- Avatar arms spread wide like T-pose: corrected Z-rotation from -35deg to -62deg for natural positioning (2026-02-26)
- Emotional-check-in fabricated scores (invalid `UPDATE…ORDER BY…LIMIT`) — now deterministic (2026-06-18).
- DailyAnalysis unbounded Gemini timeout — model-factory timeout + race backstop (2026-06).
- chatStream slow recursive provider-cascade replays — per-turn memo + retry guards + 30s timeout (2026-06).
- Landing GPU jank on low-end PCs — `usePerformanceTier` + blur caps (2026-06).
- Timezone reminder drift (stale `users.timezone` vs authoritative `user_preferences.timezone`) — global COALESCE fix (2026-07-07).
- Reputation/recovery/stats subscription honesty (provenance, no fabricated values) (2026-06-25).

### Initial project setup (earlier)
- Initial project setup
- Git workflow and CI/CD pipeline
- Documentation structure
- Leaderboard and Competitions menu items to main navigation sidebar (2026-02-16)
- Menu structure documentation in `progress/MENU_STRUCTURE.md`
- 3D Avatar animation system: procedural VRM animation pipeline with 12-step RAF loop (2026-02-26)
- Eye movement system: saccadic shifts, gaze patterns, state-linked behavior (2026-02-26)
- Emotion-modulated animation: per-emotion amplitude/frequency/posture/blink parameters (2026-02-26)
- Frequency-weighted lip sync: audio frequency analysis replacing time-based viseme cycling (2026-02-26)
- Enhanced blink system: emotion-modulated intervals, double-blink support (2026-02-26)
- Backend emotion connection: AI emotion detection drives avatar expression + body language (2026-02-26)
- New server services: achievement-tree, commitment-tracker, cross-pillar-intelligence, daily-pledge, inconsistency-detection, intelligent-intervention, personality-mode, team-competition, user-classification, variable-reward (2026-02-26)
- New database migrations: cross-pillar contradictions, gamification upgrade, user classification, user interventions (2026-02-26)

### Changed
- Updated leaderboard layout to include DashboardSidebar navigation (2026-02-16)
- Updated DashboardLayout to handle leaderboard and competitions routes (2026-02-16)
- Enhanced active route detection to support leaderboard and competitions views (2026-02-16)
- Changed competitions from query parameter (`/leaderboard?view=competitions`) to separate page (`/competitions`) (2026-02-16)
- Premium AAA arm/hand tuning: absolute target poses, parent-space channels, subtle micro-pulse gestures (2026-02-26)
- Chat UI: replaced spinner with WhatsApp-style skeleton loading (2026-02-26)
- Nutrition tab: enhanced MealCard and TodayTab components (2026-02-26)
- Server: improved AI coach, LangGraph chatbot, daily analysis, message, and automation services (2026-02-26)

### Fixed
- Avatar arms rotating backward behind torso: switched from multiply to slerp absolute targets (2026-02-26)
- Avatar arms spread wide like T-pose: corrected Z-rotation from -35deg to -62deg for natural positioning (2026-02-26)

## [1.0.0] - TBD

### Added
- Initial release

---

## Types of Changes

- **Added** for new features
- **Changed** for changes in existing functionality
- **Deprecated** for soon-to-be removed features
- **Removed** for now removed features
- **Fixed** for any bug fixes
- **Security** for vulnerability fixes

