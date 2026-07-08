# Balencia Platform — Changelog: May → July 2026

> **Purpose**: A comprehensive log of every new feature and module shipped between **2026-05-01 and 2026-07-08** — the window *after* the previous doc freeze (P52 / 2026-04-28) and before this update.
> **Source of truth**: `git log` (commit subjects + dates) cross-checked against the live codebase (`server/src`, `client/app`).
> **Related**: [PROGRESS.md](./PROGRESS.md) · [MODULES-AND-FEATURES.md](./MODULES-AND-FEATURES.md) · [Missing-Features.md](./Missing-Features.md) · [AUDIT-FINDINGS-AND-GAPS.md](./AUDIT-FINDINGS-AND-GAPS.md) (numbered engineering-audit findings from `docs/`, incl. unresolved WhatsApp/Finance gaps behind some of the entries below)
> **Last Updated**: 2026-07-08

---

## Platform Growth at a Glance (before → after this window)

| Metric | At 2026-04-28 (P52) | At 2026-07-08 | Δ |
|---|---|---|---|
| Server services | 177 | **365** | +188 |
| Server controllers | 72 | **122** | +50 |
| Server routes | 92 | **120** | +28 |
| Background jobs | 34 | **69** | +35 |
| DB tables | 138 | **154** | +16 |
| DB migrations | 85 | **205** | +120 |
| Client pages (`page.tsx`) | 95 | **130** | +35 |
| LangGraph tool domains | ~16 | **47** | +31 |

---

## Headline: New Major Modules Shipped

These are **net-new product surfaces**, not refinements of existing ones:

| Module | First shipped | Status | What it is |
|---|---|---|---|
| **WhatsApp Intelligence Layer** | 2026-06-12 | Built, flag-gated (OFF) | Baileys-primary behavioral-intelligence mirror + Cloud API fallback. E03 *un-deferred*. Inbox persisted to Postgres, consent, preflight, privacy/pruning, Agent Studio design. |
| **Career Module + Execution OS** | 2026-06-23 | Built, flag-gated | Full Career pillar: schema, services, AI tools, jobs, API & UI. Weekly execution engine, per-level task editor, scheduling, scoring, accountability, focus areas, analytics heatmap, badges, resource links. |
| **Social Growth OS** | 2026-06-05 | Built | Groups/Pods, reputation, rewards, social feed, mentors, circles, reporting, opt-in matching, score validation. |
| **Relationships CRM (Social Health)** | 2026-06-15 | Built | Personal-relationship CRM pillar — connection graph, follow, personal contacts. |
| **Life Correlation Matrix (LCM)** | 2026-06-05 | Built | Cross-pillar directed graph engine (MT1); 10-node PG graph; health/buddy-suggestion correlations. |
| **Document Intelligence** | 2026-06-29 | Built, flag-gated (OFF) | Upload → OCR → chunk → embed → analytics; RAG `/ask`; doc→wiki; `@mention`; medical gate; markdown source-kind; trends pagination. |
| **Knowledge Graph** | 2026-07-06 | Built | Graph builder, typed nodes, filters, D3 force-graph viz, node/entry detail modals. |
| **Wiki (with Neural Graph)** | 2026-05 (pipeline) → 2026-07 | Built | `.md` first-class documents, workout-style tabs, 4th "Graph" tab (living-brain canvas viz), paginated trends, reliability scoring. |
| **Reputation System** | 2026-07-07 | Built | Score history + breakdown endpoints + premium page rebuild (pure-SVG clay charts, dual-DDL history table). |
| **Virtual Try-On / AI Fashion Studio** | 2026-06-21 | Built, flag-gated | MVP (client+server) → Wave 1+2 redesign: saved looks, wardrobe, AI Style Coach (real `getStyleProfile`), before/after comparison. |
| **Double-Tap Reflection System** | 2026-06-21 | Built | Reflection = journal entry + `reflection_details`; across journal, dashboard & coaching. |
| **Accountability Contracts (hardened)** | 2026-06-11 → 2026-07-07 | Built | Wave-0 hardening + full lifecycle state machine; informed review-and-sign; enforcer acceptance handshake + per-contact consent; revived consent-gated SOS wellness-check; variable-reward wiring; witness peer-verification (flag-gated, OFF). |
| **Analytics Engine** | 2026-05-21 | Built | ECharts renderer (Balancia dark theme), `AnalyticsEngine` orchestrator, `CrossDomainCorrelator`, `BehavioralIntelligenceService`, `MetricRegistry`, `OutputFormatter`, behavioral-profile + lifestyle-balance + analytics-query tools. |
| **Churn + Trust ML Models** | 2026-06-15 | Built | Logistic-regression churn model + trust model; training/risk services + admin consoles. |
| **Community / Moderation** | 2026-06-15 | Built | Content moderation, community orchestration, social feed governance. |
| **Newsletter** | 2026-06-10 | Built | Subscription lifecycle, welcome email, admin management. |
| **Witness / Peer-Verification** | 2026-07-07 | Built, flag-gated (OFF) | Contract peer-verification lifecycle for accountability contracts. |

---

## Theme-by-Theme Detail

### 🧠 AI Coach — "SIA" overhaul (the largest workstream)
- **Rebrand**: AI coach renamed **Cia → SIA** across all server prompts/defaults and all client UI/components (2026-05-20).
- **Identity & scope**: Coach broadened from health-only to **whole-life** (all life domains) in the system prompt (2026-06-23). Fake strain/recovery fallbacks documented and gated.
- **Provenance v2 (honesty)**: Stop narrating estimates as measured; honest device-vs-derived WHOOP provenance; de-launder proactive daily-score narration; frame cross-domain intelligence as *inferred*, not *measured* (2026-06-24 → 2026-06-25).
- **Answerability / Evidence gate (Wave 0)**: Evidence & answerability unification; evidence-first discovery rule; answerability discovery gate + anti-canned-empathy prompts (2026-06-24).
- **Wave 1 — Context assembler**: Surface accountability risk + critical contradictions (slice 1); personal baselines vs. their own normal (slice 2) (2026-06-24 → 2026-06-25).
- **Wave 2 — Intelligence controllers**: 8 prompt/behavior controllers + turn-intelligence contract (2026-06-25).
- **Adaptive Reasoning & Discovery (ARE)**: Adaptive reasoning + progressive discovery engine wired into the coach pipeline; progressive discovery UI; resolve discovery answers & expand hypothesis tree (2026-06-23).
- **Confidence Engine**: SIA confidence — evidence-based 4-axis deterministic scorer extending transparency service; honest-null; confidence-trend analytics endpoint (2026-06-19).
- **Emotional Intelligence**: Per-turn EI analysis engine + 10 coaching-mode persona selector + dynamic persona prompt builder wired into chat pipeline; confirmation-feedback routing for calibration learning (2026-05-20).
- **Semantic Memory & Observability**: Semantic-memory retrieval + tracker sync; intelligence-state timeline UI; semantic memory observability (2026-05-13 → 2026-06-25).
- **Intelligence memory**: `intelligence_pending_signals` table, conversation insight extractor, `findSimilarMemories` dedup, TurnInsights/IntelligenceContext types (2026-05-13).
- **Proactive coach**: EI-persona parity, domain expertise, semantic recall; proactive-messaging audit remediation Waves 0-2 (2026-06-19).
- **DailyAnalysis**: Unbounded Gemini timeout fixed (model-factory timeout + race backstop); "Confidence 0" = honest-null for empty account.
- **chatStream**: Per-turn memo + retryCount guards + 30s timeout fix for slow recursive provider-cascade replays.
- **Hardening**: Vision provider fallback + provider hardening (2026-07-07); batched personalization + langgraph tool routing (2026-07-06); chart-emitting tools forced for analytics/progress; reply synthesized from tool results on empty model content; chat artifacts persisted (survive refresh).

### 🏠 Platform / Overview / Dashboard
- **Overview v2 dashboard** ("Life-OS"): Life Pulse hero + health-vitals rings; Today's Journey clay timeline + time-based status badges; Life Balance Wheel; Momentum Center; Relationship Hub; Goals Overview; Finance Snapshot; **dark-claymorphism token system + primitive adoption** (2026-06-16 → 2026-06-26). Honest-null throughout (orb shows "—" not fabricated 0; no fake pulse/savings).
- **Life World redesign**: "Who you're becoming" API-driven; health-vitals rings; intelligence monthly/weekly reports + report viewer + life-world surfacing (2026-06-22 → 2026-07-03).
- **Scoring canonicalization**: Single canonical domain source for life score + wheel; pure 0-100 domain mappers (fitness/nutrition/wellbeing/goals/health/career); renormalized-mean life-score helper; `getDomainScores` DB aggregator over 8 life domains; nutrition adherence uses active diet plan; finance applies budget penalty (2026-06-26).
- **Brand v2 / v2.1 re-theme**: Dashboard re-themed to Brand v2 (teal → burnt-orange + Sora); typography migration (legacy-token aliasing); remaining off-brand shell colors converted; sidebar trimmed (2026-06-16 → 2026-06-18).
- **Integrations welcome modal**: First-run post-onboarding modal → `/settings`.
- **Sidebar**: Active-state helper + UI polish; unfinished nav sections hidden (2026-07-06).
- **Dashboard nav wiring**: Life Matrix + Social Growth tabs wired with shared page nav (2026-06-05).

### 🥗 Pillar Premium Rebuilds (UI → Balencia clay/glass + real data)
- **Leaderboard**: Brand v2.1 rebuild with trends, pillars, real aggregation backend (`getAggregatedLeaderboard`); `@balencia` client fake removed; trust/privacy/score-breakdown redesign; lib/pillars+score source of truth (2026-06-12 → 2026-07-03).
- **Competitions**: Premium clay/glass rebuild with real `component_scores` via LATERAL join; premium 6-pillar chart (2026-07-03).
- **Pods / Groups** (`/groups`): Premium tabbed redesign; consent-aware empty state; Radix modal + leave-confirm; `groupIdParamSchema` Zod (2026-07-06).
- **Feed** (`/feed`): Premium rebuild with server-side humanizer (Zod + plain copy) (2026-07-06).
- **Life Areas** (`/life-areas`): Functional module — `life_area_checkins` + momentum engine (honest-null), real Connections, Brand v2.1 clay+glass, `?prompt=` deep-link (2026-07-03).
- **Money Map / Finance**: Finance redesign pilot (themed charts + overview); hardening (soft-delete filters, validation, AI insights); deterministic insights writer with unique-index dedupe; statement scanner, spending orbit, month comparison; money-map/finance polish batch; finance snapshot clay restyle (2026-05-20 → 2026-07-02).
- **Wellbeing**: Brand-v2 module UI + wellbeing-summary API; mental-recovery & stress provenance with honest-null sourcing; brand-v2.1 restyle (2026-06-18 → 2026-07-03).
- **Nutrition**: Adaptive analysis route + meal modal coverage; recipe URL handling + meal-logging refinements; meal-modal Sia-brand label alignment (2026-07-03 → 2026-07-07).
- **Workouts**: Plan view refresh + workout/diet route wiring; daily consistency/heatmap endpoint (2026-06-16 → 2026-06-19).
- **Progress**: Claymorphism UI redesign (2026-06-30).
- **Journal**: LLM-backed coach (`/v1/journal/coach`, unmetered); premium image (public uploads + `rehydratePublicImageUrls` to survive presigned expiry); observatory editor; quick-capture (header + page mentions + editor modal); mentions + progress analytics; voice/scoring hardening (2026-06-19 → 2026-06-30).
- **Achievements**: Dynamic tree journeys (`/achievements/trees`); real-source rewards (code-seeded UPSERT catalog, sync-prune); XP leaderboard replaces placeholder; `zen_master` real mindfulness; +6 real-source trees; removed 11 no-data rewards (2026-07-03).

### 🤝 Social / Community / Reputation
- **Social Growth OS**: Groups, reputation, rewards, social feed, mentors, circles, reporting (2026-06-05 → 2026-07-07).
- **Relationships CRM**: Personal-relationship CRM pillar; connection graph; follow; personal contacts (2026-06-15).
- **Reputation**: Score history + breakdown endpoints + premium page rebuild (2026-07-07).
- **Social intelligence services (server)**: Trust, churn, experiments, matching; opt-in matching; anti-cheat; accept-rate; pod rally; feed; rate-limits; growth service expansion (mentors, pods, score validation) (2026-06-12 → 2026-07-07).
- **Admin consoles** (client): Moderation, trust, churn, matching, experiments (2026-06-12).

### 📞 Voice / Calling
- **AI Coach Calling System**: Voice call UI (ringtone, scheduling settings, audio stream); BullMQ-based voice call scheduling + WebRTC signaling; voice-call routes guarded by `ENABLE_VOICE_CALLS` flag; voice assistant modular refactor (hooks + UI components) (2026-05-14 → 2026-05-19).
- **Voice hardening**: Call flows, streaming, vision coaching, customization; chat/voice/AI-coach call hardening; honest connected-data status card (2026-06-24 → 2026-07-03).
- **Voice barge-in VAD**, camera facing, AI coach image attachments (2026-06-30).
- **WebRTC**: Env-driven ICE servers with TURN fallback + call flows (2026-07-06).
- *(Outbound PSTN / Twilio still not started — see Missing-Features.md.)*

### 💬 WhatsApp Intelligence (E03 un-deferred)
- **Baileys-primary** behavioral-intelligence layer: gateway, consent, mirror, preflight (2026-06-17).
- **Inbox persistence**: Mirror inbox → `whatsapp_mirror_messages`; async merge + on-demand backfill; searchable phone-number field for account linking (2026-06-18 → 2026-06-19).
- **Cloud API fallback** blueprint; raw-data retention pruning + privacy service (2026-06-12 → 2026-06-16).
- **Agent Studio** design (n8n-like workflow builder + per-chat AI Autopilot) — design only (2026-06-19).
- *Flag-gated; not yet live in prod.*

### 📄 Documents / Knowledge Graph / Wiki
- **Document Intelligence pipeline** (flag-gated): upload → OCR → chunk → embed → analytics; RAG `/ask`; doc→wiki; `@mention`; medical gate; markdown source-kind; preview URLs; trends pagination (2026-06-22 → 2026-07-07).
- **Wiki reliability**: Wiki synthesizer wired into all activity-tool handlers; 6 pipeline gaps repaired (evidence tracking, page updates) (2026-05-20).
- **Wiki page taxonomy**: Coaching + meta categories added (2026-05-14).
- **Knowledge Graph**: Graph builder, filters, typed nodes, D3 force-graph, node/entry detail modals (2026-07-06).
- **Wiki Neural Graph**: 4th "Graph" tab — SIA living-brain canvas viz; `GET /v1/wiki/graph`; pure engine + canvas renderer + glass panel (per memory, ~Jul).

### 🎯 Accountability / Commitment Contracts
- **Wave-0 hardening** + social/community platform work (2026-06-11).
- **Lifecycle state machine**: Completed; IDOR closed (Arch-4 + security) (2026-06-14).
- **Unify the 3 commitment layers**: Suggestion signal + coach toolset (Arch-2) (2026-06-14).
- **Informed review-and-sign** before activating a contract (R-4); stop accepting unenforceable options (AG-6, Arch-5) (2026-06-14).
- **Enforcer acceptance handshake** — no consent, no alert (C-7/R-6); per-contact consent UI; enforcer alerts reach the enforcer's real account (2026-06-13).
- **SOS wellness-check** revived — two-stage, consent-gated (R-3) (2026-06-14).
- **Coach contract tools**: `proposeContract` from chat; inject active contracts into coach context; supportive coach reach-out on first slip (`ai_intervene_first`) (2026-06-13).
- **Variable-reward engine** wired into pledge completion (2026-06-12).
- **Enforcement hardening**: Wave-1 anti-gaming; honest audit records (no false praise, no phantom alerts); machine-sent trigger messages attributed as automated; user-local day boundary for checks + violation dedup; settle violations at end of local day (2026-06-11 → 2026-06-14).
- **Witness / peer-verification lifecycle** (flag-gated, OFF by default) (2026-07-07).

### 💼 Career Module + Execution OS
- **Foundation**: Schema, services, AI tools, jobs, API & UI (2026-06-23).
- **Execution OS**: Weekly engine, scheduling, scores & accountability; in-plan per-level task editing; per-level task editor for goal creation; focus-areas (per-goal scoped trackers + UI); analytics consistency heatmap & momentum chart; resource links; execution metadata; chat tools; label sync; live-coach extras (level names, Obstacle Plan, Recovery/Restart, proactive flag-OFF) (2026-06-23 → 2026-07-03).
- *GOTCHA fixed: LLM cadence overflow → `normalizeCadence` clamp + migration 030000.*

### 🔒 Security / Compliance / Ops
- **OAuth tokens encrypted at rest** (AES-256-GCM) (2026-05-22).
- **Auth hardening**: Tokens via HttpOnly cookies; refresh tokens hashed; password-reset attempt tracking; sensitive-key redaction in logger; CSP `unsafe-inline`/`unsafe-eval` removed (2026-05-22 → 2026-06-03).
- **SchedulerRegistry**: Centralized job lifecycle + timer tracking + health monitoring + failure alerts; batch processing hardened with `Promise.allSettled` + error boundaries (2026-05-22).
- **Background-job fleet gating**: Jobs gated to active users; idle API storm quieted (`ENABLE_BACKGROUND_JOBS`) (2026-06-03).
- **Redis MISCONF storm**: BullMQ poll-loop on write-locked Redis throttled (2026-06).
- **Socket.IO cluster adapter**: Redis pub/sub bridge for `emitToUser` cross-worker (gated on `CLUSTER_MODE`) (2026-07-02).
- **WebRTC TURN**: Env-driven ICE + `/webrtc/ice-servers`; prod must set TURN creds (2026-07-06).
- **Deploy hardening**: Self-heal migration checksum drift; rename duplicate migration versions; provision DB via `DATABASE_URL`; relative import for helper/encryption (prod startup crash fix); keep server scripts in upload; include migration scripts in image (2026-06-02 → 2026-06-08).
- **Delete-account flow** + user country + self routes (2026-07-03).
- **Health/safety**: Free-text conditions note in the safety profile (2026-06-24).

### 🎬 Landing / Brand / Onboarding
- **Premium landing redesign**: Cinematic experience (Acts I–V: void emergence, SIA introduction, interactive questions, 12-week timeline, Today Screen); CinematicCanvas + ConstellationScene; shared SiaMark brand mark; subscription UX; auth experience redesign; newsletter welcome (2026-05-20 → 2026-06-10).
- **Preloader**: CinematicSplash + RouteLoader (mini 3D core); nebula shaders (2026-05-14 → 2026-05-21).
- **Brand Guidelines v2.1** bumped; role guides relocated to `.cursor` (2026-06-18).
- **Onboarding**: Multi-domain goals + unified assessment v2; goal setup, life-goals, assessment ordering, free coach (bounded by turn cap, no spoofable bypass); batched MCQ quick-assessment flow; multi-domain unified assessment + dynamic suggested prompts; onboarding credit waiver (all onboarding AI free) (2026-06-05 → 2026-07-06).
- **Response Optimization Layer**: Message library + hybrid response (2026-06-01).
- **Error/status pages**: Custom-illustration redesign (2026-05-15).

### 🏆 Gamification / Proactive / Engagement
- **Variable-reward engine** wired into pledge completion (2026-06-12).
- **Proactive engine**: Proactive messaging engine + notification outbox + safety escalation; event triggers, notifications, scheduling anchors, workout alarms; schedule-reminders service + domain-balanced messaging; activity-status messaging + timezone-aware coaching directives (2026-05-14 → 2026-07-06).
- **Timezone fix (global)**: `users.timezone` (stale) vs `user_preferences.timezone` (authoritative) — backfill + trigger migration 20260707160000; schedule-reminders/reminder-processor `COALESCE(up,u,UTC)` (2026-07-07).
- **Engagement expansion**: Leaderboard, competition, gamification, achievements expansion (2026-06-05).
- **Streak-grouping**: Interval-regression fix (2026-07-07).

### 📊 Analytics
- **AnalyticsDashboard** tab + **ECharts** renderer (Balencia dark theme) + `ArtifactCard` ECharts engine dispatch (2026-05-21).
- **AnalyticsEngine** orchestrator (LLM insight generation + fallback); `OutputFormatter` (chart-selection rules + response assembly); `CrossDomainCorrelator` (lag-based); `BehavioralIntelligenceService` (trend/decay/loop/consistency); `MetricRegistry` (WHOOP/biometrics/nutrition/habits/wellbeing/finance/fitness/goals); `runAnalyticsQuery` + `getBehavioralProfile` + `getLifestyleBalanceRadar` tools (2026-05-21).

---

## Dated Commit Log (chronological)

### July 2026
| Date | Commit summary |
|---|---|
| 2026-07-07 | `feat(ai-coach)` vision provider fallback + provider hardening |
| 2026-07-07 | `feat(email)` shared template-defaults util + coachingInsight CTA hardening |
| 2026-07-07 | `feat(social)` growth service expansion, mentors, pods, score validation |
| 2026-07-07 | `feat(nutrition)` recipe URL handling + meal-logging refinements |
| 2026-07-07 | `feat(documents)` markdown source-kind, preview URLs, trends pagination |
| 2026-07-07 | `feat(witness)` contract peer-verification lifecycle (flag-gated, OFF) |
| 2026-07-07 | `feat(reputation)` score history, breakdown endpoints + premium page rebuild |
| 2026-07-07 | `fix(db)` sync users.timezone from user_preferences (root tz backfill + trigger) |
| 2026-07-07 | `fix(reward-economy)` streak-grouping interval regression |
| 2026-07-06 | `feat(knowledge-graph)` graph builder, filters and typed nodes |
| 2026-07-06 | `feat(documents)` document intelligence pipeline & wiki reliability |
| 2026-07-06 | `feat(feed)` premium feed rebuild with server-side humanizer |
| 2026-07-06 | `feat(social)` premium Pods & Groups redesign with consent-aware states |
| 2026-07-06 | `feat(webrtc)` env-driven ICE servers with TURN fallback & call flows |
| 2026-07-06 | `feat(proactive)` schedule reminders service & domain-balanced messaging |
| 2026-07-06 | `feat(goals)` domain-aware goal decomposition & user-context fields |
| 2026-07-06 | `feat(ai-coach)` batched personalization & langgraph tool routing |
| 2026-07-06 | `feat(onboarding)` batched MCQ quick-assessment flow |
| 2026-07-06 | `feat(correlation)` LCM, health correlation & buddy suggestion refinements |
| 2026-07-06 | `feat(dashboard)` sidebar active-state helper & UI polish |
| 2026-07-03 | `feat(life-areas)` functional module with check-ins, momentum engine, connections |
| 2026-07-03 | `feat(leaderboard)` Brand v2.1 rebuild — trends, pillars, real aggregation backend |
| 2026-07-03 | `feat(competitions)` premium clay/glass rebuild with real component scores |
| 2026-07-03 | `feat(achievements)` dynamic tree journeys, real-source rewards, XP leaderboard |
| 2026-07-03 | `feat(career)` resource links, execution metadata, chat tools and label sync |
| 2026-07-03 | `feat(ai-coach)` SIA provenance/intelligence tools, langgraph domains, crisis & memory hardening |
| 2026-07-03 | `feat(intelligence)` monthly/weekly reports, report viewer, life-world surfacing |
| 2026-07-03 | `feat(finance)` deterministic insights writer with unique-index dedupe |
| 2026-07-03 | `feat(wellbeing)` mental-recovery & stress provenance with honest-null sourcing |
| 2026-07-03 | `feat(proactive)` event triggers, notifications, scheduling anchors, workout alarms |
| 2026-07-03 | `feat(settings)` account settings, delete-account flow, user country & self routes |
| 2026-07-03 | `feat(voice-assistant)` call flows, streaming, vision coaching and customization |
| 2026-07-03 | `feat(nutrition)` adaptive analysis route and meal modal coverage |
| 2026-07-02 | `feat(client,server)` money-map/finance polish batch |
| 2026-07-01 | `feat(client,server)` chat, voice assistant, and AI coach call hardening |

### June 2026
| Date | Commit summary |
|---|---|
| 2026-06-30 | `feat(client)` voice barge-in VAD, camera facing, AI coach image attachments |
| 2026-06-30 | `feat(client)` progress tab claymorphism UI redesign |
| 2026-06-30 | `feat(client)` journal quick-capture, page mentions, editor modal |
| 2026-06-30 | `feat(server)` journal mentions, progress analytics, voice/scoring hardening |
| 2026-06-29 | `feat(documents)` SIA Document Intelligence |
| 2026-06-29 | `feat(chat)` brand reskin + relationship hub wiring |
| 2026-06-26 | `feat(onboarding+ai-coach)` multi-domain unified assessment + dynamic suggested prompts |
| 2026-06-26 | `feat(overview)` dark-claymorphism token system + primitive adoption (+ 8 overview-section restyles) |
| 2026-06-26 | `feat(scoring)` canonical domain source — pure mappers, getDomainScores, life-score helper |
| 2026-06-25 | `feat(ai-coach)` SIA vNext Wave 2 intelligence controllers + turn-intelligence contract |
| 2026-06-25 | `feat(ai-coach)` Wave 1 — personal baselines; surface accountability risk + contradictions |
| 2026-06-25 | `feat(ai-coach)` Provenance v2 — stop narrating estimates as measured |
| 2026-06-25 | `feat(ai-coach)` Wave 0 — evidence & answerability unification |
| 2026-06-25 | `feat(onboarding)` multi-domain goals + unified assessment (v2) |
| 2026-06-25 | `feat(server)` provenance & honesty fixes across recovery, stats, subscription |
| 2026-06-25 | `feat(dashboard)` scoring/WHOOP overview refresh + integrations welcome modal |
| 2026-06-24 | `feat(career)` Career Execution OS — weekly engine, scheduling, scores & accountability |
| 2026-06-24 | `feat(ai-coach)` answerability discovery gate + anti-canned-empathy prompts |
| 2026-06-24 | `feat(ai-coach)` evidence-first discovery rule + reasoning refinements |
| 2026-06-24 | `feat(paywall)` reason-aware credit gating across AI feature endpoints |
| 2026-06-24 | `feat(subscription)` billing management UI and branded invoice PDF |
| 2026-06-24 | `feat(virtual-tryon)` persist original photo for before/after comparison |
| 2026-06-24 | `feat(health-safety)` free-text conditions note in the safety profile |
| 2026-06-23 | `feat(reasoning)` adaptive reasoning & progressive discovery engine (ARE) |
| 2026-06-23 | `feat(career)` career module foundation — schema, services, AI tools, jobs, API & UI |
| 2026-06-23 | `feat(ai-coach)` broaden coach scope to all life domains in system prompt |
| 2026-06-23 | `feat(money-map)` finance redesign pilot — themed charts & overview |
| 2026-06-23 | `feat(dashboard)` Overview v2 polish — orb, hero, SIA panel & metrics |
| 2026-06-23 | `feat(virtual-tryon)` look preview sheet & wardrobe theme |
| 2026-06-23 | `feat(whoop)` WHOOP data section redesign & service refresh |
| 2026-06-22 | `feat(virtual-tryon)` AI Fashion Studio redesign (Wave 1 + 2) |
| 2026-06-22 | `feat(dashboard)` Overview health-vitals rings & Life World redesign |
| 2026-06-22 | `feat(coaching)` proactive messaging engine, notification outbox & safety escalation |
| 2026-06-21 | `feat(reflection)` double-tap reflection system across journal, dashboard & coaching |
| 2026-06-21 | `feat(virtual-tryon)` AI virtual try-on MVP (client + server, flag-gated) |
| 2026-06-19 | `feat(ai-coach)` SIA confidence engine — evidence-based 4-axis scorer |
| 2026-06-19 | `feat(ai-coach)` SIA intelligence-state timeline UI |
| 2026-06-19 | `feat(ai-coach)` proactive coach EI-persona parity, domain expertise, semantic recall |
| 2026-06-19 | `feat(ai-coach)` confidence-trend analytics endpoint + relationships index |
| 2026-06-19 | `feat(journal)` LLM-backed coach, premium image, observatory editor |
| 2026-06-19 | `feat(whatsapp)` persist mirror inbox to Postgres + Agent Studio design |
| 2026-06-19 | `feat(dashboard)` Overview v2 journey timeline + real-data wiring |
| 2026-06-19 | `feat(workouts)` plan view refresh + workout/diet route wiring |
| 2026-06-18 | `feat(overview)` wire Overview v2 to real metrics with honest nulls |
| 2026-06-18 | `feat(whatsapp)` persist inbox to Postgres and harden Baileys mirror |
| 2026-06-18 | `feat(emotional-checkin)` deterministic scoring and fail-closed crisis detection |
| 2026-06-18 | `feat(wellbeing)` brand-v2 module UI and wellbeing-summary API |
| 2026-06-18 | `feat(schedule)` sync plan activities into the daily schedule |
| 2026-06-17 | `feat(overview)` redesign Overview dashboard to Brand v2 with Life Pulse |
| 2026-06-17 | `feat(whatsapp)` Baileys intelligence layer — gateway, consent, mirror & preflight |
| 2026-06-17 | `feat(finance)` Money Map hardening — soft-delete filters, validation & AI insights |
| 2026-06-17 | `feat(plan)` add coach activity update & delete endpoints |
| 2026-06-16 | `feat(brand)` apply Brand Guidelines v2 re-theme across dashboard |
| 2026-06-16 | `feat(overview)` add Life-OS overview v2 dashboard |
| 2026-06-16 | `feat(ai)` semantic memory retrieval, crisis detection & intelligence wiring |
| 2026-06-16 | `feat(whatsapp)` raw-data retention pruning & privacy service |
| 2026-06-16 | `feat(workouts)` daily consistency/heatmap endpoint |
| 2026-06-15 | `feat(relationships)` personal-relationship CRM (Social Health pillar) |
| 2026-06-15 | `feat(whatsapp)` WhatsApp behavioral intelligence layer |
| 2026-06-15 | `feat(churn)` churn + trust ML models (logistic regression) |
| 2026-06-15 | `feat(community)` content moderation, community orchestration & social feed |
| 2026-06-14 | `feat(accountability)` unify the three commitment layers — suggestion signal + coach toolset |
| 2026-06-14 | `feat(contracts)` informed review-and-sign before activating a contract |
| 2026-06-14 | `feat(accountability)` revive the SOS wellness-check, two-stage and consent-gated |
| 2026-06-13 | `feat(accountability)` enforcer acceptance handshake — no consent, no alert |
| 2026-06-13 | `feat(accountability)` client UI for the enforcer handshake + per-contact consent |
| 2026-06-13 | `feat(coach)` proposeContract — draft a contract from chat, safely |
| 2026-06-13 | `feat(contracts)` supportive coach reach-out on the first slip (`ai_intervene_first`) |
| 2026-06-13 | `feat(coach)` inject active contracts into the coach's context |
| 2026-06-13 | `feat(coach)` wire accountability contract tools into the live coach |
| 2026-06-12 | `feat(server)` trust, churn, experiments and matching intelligence services |
| 2026-06-12 | `feat(server)` harden and extend the existing social layer |
| 2026-06-12 | `feat(server)` wire social-intelligence jobs, routes and opt-in flags |
| 2026-06-12 | `feat(client)` social surfaces — feed, reputation, circles, mentors, reporting |
| 2026-06-12 | `feat(client)` leaderboard trust, privacy and score-breakdown redesign |
| 2026-06-12 | `feat(client)` admin consoles for moderation, trust, churn, matching, experiments |
| 2026-06-12 | `feat(whatsapp)` behavioral intelligence layer — Baileys-primary, Cloud API fallback |
| 2026-06-12 | `feat(rewards)` wire the variable-reward engine into pledge completion |
| 2026-06-12 | `feat(contracts)` Batch 3 client UX + R-1 recovery guardrail + dead-code cleanup |
| 2026-06-11 | `feat` commitment-contract Wave-0 hardening + social/community platform work |
| 2026-06-10 | `feat(landing)` premium landing + auth experience redesign |
| 2026-06-10 | `feat(newsletter)` subscription lifecycle, welcome email, admin management |
| 2026-06-09 | `feat` premium landing redesign, subscription UX, and platform polish |
| 2026-06-08 | `feat` ship life world and platform updates |
| 2026-06-05 | `feat(social-growth)` Social Growth OS — groups, reputation, rewards, feed |
| 2026-06-05 | `feat(life-matrix)` Life Correlation Matrix cross-pillar engine |
| 2026-06-05 | `feat(engagement)` expand leaderboard, competition, gamification, achievements |
| 2026-06-05 | `feat(onboarding)` goal setup, life-goals, assessment ordering, free coach |
| 2026-06-05 | `feat(dashboard)` wire Life Matrix and Social Growth tabs with shared page nav |
| 2026-06-05 | `feat(ai-coach)` wave 0-2 hardening, last-mile wiring, observability, C1 safety |
| 2026-06-01 | `feat(server)` Response Optimization Layer (message library + hybrid response) |

### May 2026
| Date | Commit summary |
|---|---|
| 2026-05-22 | `feat(security)` encrypt OAuth tokens at rest with AES-256-GCM |
| 2026-05-22 | `feat(security)` deliver auth tokens via HttpOnly cookies, hash refresh tokens |
| 2026-05-22 | `feat(ops)` SchedulerRegistry — centralized job lifecycle + health/failure alerts |
| 2026-05-22 | `feat(scoring)` score history endpoint with Zod validation |
| 2026-05-22 | `feat(controllers)` extract domain controllers from route files |
| 2026-05-22 | `feat(security)` sensitive key redaction in logger |
| 2026-05-21 | `feat(analytics)` AnalyticsEngine orchestrator + ECharts renderer + OutputFormatter + CrossDomainCorrelator + BehavioralIntelligenceService + MetricRegistry |
| 2026-05-21 | `feat(preloader)` cinematic splash with nebula background and refined shaders |
| 2026-05-20 | `feat` rebrand AI coach from Cia to SIA (server defaults + prompts) |
| 2026-05-20 | `feat(client)` rebrand Cia to SIA across all client UI components and defaults |
| 2026-05-20 | `feat` emotional intelligence engine with per-turn analysis + 10-mode persona selector |
| 2026-05-20 | `feat(client)` CinematicExperience landing (Acts I–V) + shared cinematic components |
| 2026-05-20 | `feat(client)` money map — statement scanner, spending orbit, month comparison |
| 2026-05-19 | `feat(voice)` guard voice call routes with ENABLE_VOICE_CALLS feature flag |
| 2026-05-19 | `feat(client)` refactor voice assistant with modular hooks and UI components |
| 2026-05-14 | `feat(ai-coach)` BullMQ-based voice call scheduling and WebRTC signaling |
| 2026-05-14 | `feat(client)` voice call UI with ringtone, scheduling settings, audio stream |
| 2026-05-14 | `feat(preloader)` CinematicSplash + RouteLoader |
| 2026-05-14 | `feat(proactive)` activity-status messaging + timezone-aware coaching directives |
| 2026-05-14 | `feat(wiki)` extend page taxonomy with coaching and meta categories |
| 2026-05-13 | `feat(intelligence)` conversation insight extractor + memory engine dedup + pending signals table |
| 2026-05-13 | `feat(intelligence)` wire insight extractor into LangGraph chat pipeline |
| 2026-05-01 | `feat(controllers)` domain-controller extraction (ongoing) |

---

## Flag-Gated Features (built, OFF by default in prod)

These are fully implemented but dark in production pending readiness/consent:

| Feature | Flag | Notes |
|---|---|---|
| WhatsApp Intelligence Layer | `ENABLE_WHATSAPP_*` | Baileys mirror + Cloud API fallback |
| Document Intelligence + RAG | `ENABLE_DOC_RAG` / `ENABLE_MEDICAL` | Upload→OCR→embed→RAG; medical gate |
| Witness / Contract peer-verification | (flag-gated) | Accountability contract peer-verification lifecycle |
| Virtual Try-On / AI Fashion Studio | (flag-gated) | Client + server |
| Voice Calls | `ENABLE_VOICE_CALLS` / `ENABLE_CHAT_CALLS` | In-app fully live; outbound PSTN still not started |
| Background job fleet | `ENABLE_BACKGROUND_JOBS` | Activity-gated to quiet idle API storm |
| Cluster mode Socket.IO | `CLUSTER_MODE` | Redis pub/sub adapter bridge |

---

*CHANGELOG-2026-05-07.md | Balencia Platform | Generated 2026-07-08 from `git log` + codebase verification.*
