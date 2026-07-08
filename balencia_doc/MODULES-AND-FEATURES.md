# Balencia Platform — Modules & Features (Master Inventory)

> **Purpose**: Single source of truth for **every module and feature** in the Balencia platform as of **2026-07-08** — what exists, where it lives, and its implementation status.
> **Status legend**: ✅ Live · 🟡 Partial · 🚩 Flag-gated (built, OFF in prod) · ⏳ Pending · ❌ Not started
> **Counts**: 365 services · 122 controllers · 120 routes · 69 jobs · 154 tables · 205 migrations · 130 client pages · 47 LangGraph domains
> **Related**: [CHANGELOG-2026-05-07.md](./CHANGELOG-2026-05-07.md) · [PROGRESS.md](./PROGRESS.md) · [Missing-Features.md](./Missing-Features.md) · [AUDIT-FINDINGS-AND-GAPS.md](./AUDIT-FINDINGS-AND-GAPS.md) (detailed audit findings + SIA Wave-2 API suite + Cost Management)
> **Last Updated**: 2026-07-08 (cross-checked against `docs/` engineering audit archive)

---

## 0. Product Thesis

Balencia is an **AI life coach** ("SIA"), not a health app. Pillars (fitness, nutrition, wellbeing, finance, career, relationships, spirituality, growth, creativity) are **sensors feeding one coach**, not standalone products. The coach reasons across the whole life, surfaces contradictions, and drives action through accountability. This reframe ("pillars as infrastructure") is the North Star.

---

## 1. The Coach — SIA (the product)

The AI coach is the center of the platform. Everything else feeds it.

| Capability | Status | Key files / notes |
|---|---|---|
| **Whole-life scope** | ✅ | System prompt broadened to all life domains (2026-06). Health/finance/career/relationships all in scope. |
| **Rebrand Cia → SIA** | ✅ | All server prompts/defaults + all client UI (2026-05-20). |
| **LangGraph tool routing** | ✅ | 47 tool domains; batched personalization + tool routing (2026-07). |
| **Provenance v2 (honesty)** | ✅ | Estimates never narrated as measured; device-vs-derived WHOOP; de-laundered daily-score narration. |
| **Evidence & Answerability gate** | ✅ | Wave 0: evidence-first; answerability discovery gate; anti-canned-empathy. |
| **Context assembler (Wave 1)** | ✅ | Accountability risk + critical contradictions + personal baselines surfaced per turn. |
| **Intelligence controllers (Wave 2)** | ✅ | 8 prompt/behavior controllers + turn-intelligence contract. |
| **Confidence Engine** | ✅ | Evidence-based 4-axis deterministic scorer; honest-null; confidence-trend analytics. |
| **Adaptive Reasoning & Discovery (ARE)** | ✅ | Progressive discovery engine + hypothesis tree; discovery card UI. |
| **Emotional Intelligence** | ✅ | Per-turn EI analysis; 10 coaching-mode persona selector; dynamic persona prompt builder; confirmation-feedback calibration. |
| **Semantic Memory** | ✅ | Retrieval + observability + tracker sync; `findSimilarMemories` dedup; pending-signals table. |
| **Crisis detection & safety** | ✅ | Mental-health guardrails; clinical-lane classifier; fail-closed escalation. |
| **Coach personas / personality modes** | ✅ | brutal_honesty, fired_up_pride, etc. |
| **Chat artifacts** | ✅ | Charts persist across refresh (`rag_messages.metadata.artifacts`). |
| **Image attachments** | ✅ | AI coach accepts image attachments (2026-06-30). |
| **Provider cascade** | ✅ | Gemini → Anthropic → DeepSeek → OpenAI; per-turn memo + retry guards + 30s timeout. |
| **Daily analysis** | ✅ | Model-factory timeout + race backstop; honest-null for empty accounts. |

**Coach channels**: in-app chat · voice calls (WebRTC) · WhatsApp (🚩) · proactive messaging · email.

---

## 2. Pillars (sensors / domains)

### 2.1 Fitness / Workouts
- ✅ WHOOP integration (OAuth+PKCE, webhooks, analytics, stress derivation)
- ✅ Exercise library (400+ ExerciseDB + 32 curated seed + admin CRUD)
- ✅ Workout plans + rescheduling + execution drawer + history
- ✅ Daily consistency/heatmap endpoint
- ✅ Dual Recovery Score (physical WHOOP + mental)
- ✅ Strain score & balance; strain alerts
- ✅ AI Yoga Coach (Gemini Vision pose analysis, MediaPipe)
- 🟡 AI workout adaptation (deep progressive-overload personalization) — pending

### 2.2 Nutrition
- ✅ Food DB (~400+ items, Indian/South-Asian matching)
- ✅ Photo AI meal recognition (dish-level + 10 rules)
- ✅ Manual search · voice/chat logging · barcode
- ✅ Calorie & macro dashboard + Premium Circular Metrics
- ✅ Adaptive calorie targets
- ✅ Hydration logging + smart reminders
- ✅ AI meal plans + progress
- ✅ Realtime nutrition guidance (auto-log from chat)
- ✅ Custom food & recipes (recipe URL handling)
- ✅ Emotional-eating detection
- 🟡 Nutritionix external API — not connected (local DB covers MVP)

### 2.3 Wellbeing
- ✅ Mood / energy / stress tracking (13 emojis, arc timeline, behavioral patterns)
- ✅ Habits (creation, tracking, streaks, correlation insights)
- ✅ Journaling (LLM coach, voice journal, Mind Constellation, quick-capture, mentions)
- ✅ Multi-signal stress detection (WHOOP + calendar + journal + self-report)
- ✅ Stress alerts & interventions
- ✅ Routines & daily schedules
- ✅ Schedule Workflow Builder (node-graph UI)
- ✅ Mindfulness library + yoga + meditation (100+ poses)
- ✅ Context-aware recommendations
- ✅ Mental recovery & stress provenance (honest-null sourcing)
- 🟡 Advanced AI wellbeing protocols (anxiety-specific micro-protocols) — pending

### 2.4 Finance (Money Map)
> ⚠️ **Correction (2026-07-08)**: The 2026-06-17 finance audit scored this system **2.7/10 maturity**. Prior doc revisions overstated status as "hardening ✅ Done." See [AUDIT-FINDINGS-AND-GAPS.md §3](./AUDIT-FINDINGS-AND-GAPS.md#3-finance--money-map-audit) for the full G1-G14 finding list.

- ✅ Transactions + budgets
- ✅ Statement scanner (AI parsing)
- ✅ Spending orbit + month comparison
- ❌ **AI insights writer does not exist** (`finance_ai_insights` has zero writers — G1, deferred)
- ❌ No consent gate before sending financial data to LLMs (G2, deferred)
- ❌ Plaintext-at-rest despite existing AES helper (G3, deferred)
- ✅ Budget reconciliation on transaction edit (F4, fixed)
- 🟡 Two unsynced ledgers (`finance_transactions` vs `spending_transactions`) — minimal bridge only, not unified (G5)
- ✅ Spending→stress correlation pipeline bug fixed + auto-provisioned (F2)
- ✅ Zod validators mounted (F3, fixed)
- ❌ Zero proactive finance messaging (G8, deferred)
- ❌ Naive forecasts, no export/erasure, no categorization learning, no audit trail (G9-G11, G14, deferred)
- ✅ Soft-delete filter leaks fixed (F5)
- ✅ Overclaim copy removed — "AI"/"anonymized"/"auto-generated" labels stripped from non-AI features (F1)
- ✅ Finance data source in cross-pillar correlator (LCM)
- ✅ Currency dynamic (`useCurrency().formatAmount`; billing stays USD)

**Status: correctness-patched, not intelligence-complete.**

### 2.5 Career *(NEW — 2026-06)*
- ✅ Full module: schema, services, AI tools, jobs, API, UI (`/career`)
- ✅ Career Execution OS: weekly engine, scheduling, scores, accountability
- ✅ Per-level task editor (creation + in-plan editing)
- ✅ Focus areas (per-goal scoped trackers)
- ✅ Analytics consistency heatmap & momentum chart
- ✅ Badges · resource links · live-coach extras (Obstacle Plan, Recovery/Restart)
- 🚩 Proactive career nudges (flag OFF)

### 2.6 Relationships *(NEW — 2026-06)*
- ✅ Personal-relationship CRM (Social Health pillar)
- ✅ Connection graph + follow + personal contacts
- ✅ Relationship Hub (animated network, honest empty state)

### 2.7 Spirituality
- ✅ Prayer times + holiday calendar data sources
- ✅ Spirituality dashboard

### 2.8 Learning / Growth
- ✅ Growth dashboard
- ✅ Blogs · webinars · help articles · FAQ

### 2.9 Creativity
- ✅ Creativity dashboard

---

## 3. Cross-Pillar Intelligence

| Capability | Status | Notes |
|---|---|---|
| **Life Correlation Matrix (LCM)** *(NEW)* | ✅ | Cross-pillar directed PG graph (10 nodes); MT1 orchestrator. |
| **Cross-domain correlator** | ✅ | Spotify/Calendar/Prayer/Finance sources; lag-based correlation. |
| **Contradiction detection** | ✅ | 22 rules across 6 pillars. |
| **Health correlations** | ✅ | 6 SQL detectors + behavioral intelligence. |
| **Best Day Formula** | ✅ | + daily achievement score. |
| **Prediction accuracy tracking** | ✅ | Basic ML; deep models pending. |
| **Weekly / monthly reports** | ✅ | LLM narrative; report viewer. |
| **Theme detection** | ✅ | 15 tags. |
| **Analytics Engine** *(NEW)* | ✅ | ECharts (Balencia dark) + AnalyticsEngine + OutputFormatter + CrossDomainCorrelator + BehavioralIntelligenceService + MetricRegistry; runAnalyticsQuery / getBehavioralProfile / getLifestyleBalanceRadar tools. |
| **Scoring (canonical)** | ✅ | Single domain source → life score + wheel; pure 0-100 mappers across 8 domains. |
| **Knowledge Graph** *(NEW)* | ✅ | Graph builder, typed nodes, filters, D3 force-graph, detail modals. |

---

## 4. Accountability & Social Commitment

| Capability | Status | Notes |
|---|---|---|
| **Commitment Contracts** | ✅ | Full lifecycle state machine; informed review-and-sign; unenforceable options rejected. |
| **Enforcer handshake** | ✅ | No consent → no alert; per-contact consent UI; alerts reach real enforcer account. |
| **SOS wellness-check** | ✅ | Two-stage, consent-gated (revived). |
| **Coach contract tools** | ✅ | `proposeContract` from chat; inject active contracts into context; first-slip reach-out. |
| **Variable-reward engine** | ✅ | Wired into pledge completion. |
| **Enforcement hardening** | ✅ | Anti-gaming; honest audit records; user-local day boundary + violation dedup; machine messages attributed. |
| **Witness / peer-verification** *(NEW)* | 🚩 | Contract peer-verification lifecycle (flag-gated, OFF). |
| **Accountability buddy matching** | ✅ | Opt-in matching + anti-cheat + accept-rate. |

---

## 5. Social / Community

| Capability | Status | Notes |
|---|---|---|
| **Social Growth OS** *(NEW)* | ✅ | Groups/Pods, reputation, rewards, feed, mentors, circles, reporting. |
| **Reputation** *(NEW)* | ✅ | Score history + breakdown + premium page (pure-SVG clay charts). |
| **Feed** | ✅ | Premium rebuild + server-side humanizer (Zod + plain copy). |
| **Pods / Groups** | ✅ | `/groups`; premium tabbed; consent-aware empty states; Radix modal. |
| **Leaderboard** | ✅ | Brand v2.1; real aggregation backend; trends/pillars; trust/privacy. |
| **Competitions** | ✅ | Premium clay/glass; real `component_scores` (LATERAL join); 6-pillar chart. |
| **Achievements** | ✅ | Dynamic tree journeys; real-source rewards (UPSERT catalog + sync-prune); XP leaderboard. |
| **Community moderation** | ✅ | Content moderation + orchestration + feed governance. |
| **Churn + Trust ML** *(NEW)* | ✅ | Logistic-regression churn & trust models; admin consoles. |

---

## 6. Documents, Wiki & Knowledge

| Capability | Status | Notes |
|---|---|---|
| **Personal Wiki** | ✅ | `.md` first-class; coaching + meta taxonomy; synthesizer across all activity tools. |
| **Wiki reliability** | ✅ | Evidence tracking + page updates (6 gaps repaired). |
| **Wiki Neural Graph** *(NEW)* | ✅ | 4th "Graph" tab — living-brain canvas viz; `GET /v1/wiki/graph`. |
| **Document Intelligence** *(NEW)* | 🚩 | Upload→OCR→chunk→embed→analytics; RAG `/ask`; doc→wiki; `@mention`; medical gate; markdown source-kind; trends pagination. |
| **Document trends** | ✅ | Paginated at label-group SQL + tz/casing/sparkline fixes. |

---

## 7. Voice & Calling

| Capability | Status | Notes |
|---|---|---|
| **In-app voice calls** | ✅ | WebRTC + LangGraph + ElevenLabs/Google TTS; ringtone, scheduling, audio stream. |
| **Voice scheduling** | ✅ | BullMQ-based + WebRTC signaling. |
| **Voice assistant** | ✅ | Modular hooks + UI; barge-in VAD; camera facing; vision coaching. |
| **Emotion detection** | ✅ | Camera + text + audio; crisis detection. |
| **Transcription** | ✅ | AssemblyAI. |
| **Call summaries** | ✅ | Generation + delivery. |
| **ICE / TURN** | ✅ | Env-driven ICE + `/webrtc/ice-servers`; TURN fallback (prod must set creds). |
| **Voice call flag** | 🚩 | `ENABLE_VOICE_CALLS` / `ENABLE_CHAT_CALLS`. |
| **Outbound PSTN (Twilio)** | ❌ | Not started. |

---

## 8. WhatsApp Intelligence *(E03 un-deferred)* 🚩

> ⚠️ **Correction (2026-07-08)**: The 2026-06-17 integration audit found **10 Critical + 5 High findings**, none confirmed fixed in that doc. Go-live is NOT just a flag-flip — see [AUDIT-FINDINGS-AND-GAPS.md §4](./AUDIT-FINDINGS-AND-GAPS.md#4-whatsapp-intelligence--go-live-blockers) for the full list. Highlights: coach messages could route through the user's own Baileys account instead of Balencia's Cloud API (identity conflation); raw message text persisted before redaction; **image/vision pipeline not implemented at all**; duplicate-socket ban risk; feature flags not enforced server-side.

| Capability | Status | Notes |
|---|---|---|
| **Baileys-primary mirror** | ✅ (flagged) | Gateway, consent, mirror, preflight; inbox → `whatsapp_mirror_messages`. |
| **Cloud API fallback** | ✅ (flagged) | Blueprint. |
| **Async merge + backfill** | ✅ | On-demand backfill; `@lid↔phone` mismatch still unfixed. |
| **Phone-number account linking** | ✅ | Searchable field. |
| **Privacy / retention pruning** | ✅ | Raw-data pruning + privacy service. |
| **Image/vision pipeline** | ❌ | Not implemented. |
| **Agent Studio** | ⏳ | n8n-like workflow builder + per-chat Autopilot — design only. |
| **Launch Gate** | ⏳ | Preflight + build pass + Cloud API fallback + session-restart survival + 1 real E2E send — not confirmed passed. |

---

## 9. Try-On / AI Fashion Studio *(NEW)* 🚩

- ✅ MVP (client + server, flag-gated)
- ✅ Wave 1+2 redesign: saved looks, wardrobe, AI Style Coach (real `getStyleProfile`), before/after comparison, look preview sheet.

---

## 10. Reflection *(NEW)*

- ✅ Double-tap reflection system (journal entry + `reflection_details`) across journal, dashboard & coaching. Waves 0/1/2/4 done + tested.

---

## 11. Emotional Check-in *(reworked)*

- ✅ Deterministic scoring (was fabricated — invalid `UPDATE…ORDER BY…LIMIT`).
- ✅ Fail-closed crisis detection.
- ✅ Idempotency-Key requirement.

---

## 12. Onboarding & Assessment

- ✅ Multi-domain goals + unified assessment v2
- ✅ Goal setup, life-goals, assessment ordering
- ✅ Batched MCQ quick-assessment flow
- ✅ Free onboarding coach (bounded by turn cap, no spoofable bypass) — `skipWhenOnboarding()`
- ✅ Integrations welcome modal → `/settings`
- ✅ Multi-domain unified assessment + dynamic suggested prompts
- 🟡 AI deep-assessment stubs (legacy controllers) — LangGraph path supersedes.

---

## 13. Proactive / Engagement

- ✅ Proactive messaging engine + notification outbox + safety escalation
- ✅ Event triggers, scheduling anchors, workout alarms
- ✅ Schedule-reminders service + domain-balanced messaging
- ✅ Activity-status messaging + timezone-aware coaching directives
- ✅ Email engine (5 categories, queue/inline, AI content, digest job)
- ✅ Notifications (Socket.IO real-time + dedup + web push + desktop)
- ✅ Variable-reward engine
- ✅ Timezone fix: `COALESCE(user_preferences.tz, users.tz, UTC)` + backfill trigger

---

## 14. Entitlements / Billing / Paywall

- ✅ Entitlement service + credit service + gates (FeatureGate/PlanGate/CreditGate)
- ✅ Server-side enforcement middleware (requireTier/requireFeature/requireCredits; shadow→enforce)
- ✅ Stripe webhook service + grace expiration job + abuse detection
- ✅ Full credit ledger + promo codes
- ✅ Reason-aware credit gating + reason-aware upgrade prompts
- ✅ Billing management UI + branded invoice PDF
- ✅ Pages: `/upgrade`, `/settings/billing`, `/locked`
- ✅ Token metering (tiktoken)
- ✅ Admin: 6 subscription sub-pages + abuse/analytics/features/overrides/promotions/usage

---

## 15. Platform / Dashboard

- ✅ Overview v2 ("Life-OS"): Life Pulse hero, vitals rings, Today's Journey, Life Balance Wheel, Momentum Center, Relationship Hub, Goals Overview, Finance Snapshot
- ✅ Dark-claymorphism token system + primitive adoption
- ✅ Honest-null throughout (no fabricated 0s)
- ✅ Brand v2 / v2.1 re-theme (burnt-orange + Sora)
- ✅ Intelligence Tab (5 sub-tabs) + 4 overview widgets
- ✅ Analytics / Reporting / Scoring tabs
- ✅ Life World ("who you're becoming")
- ✅ Life Matrix (LCM) + Social Growth tabs (shared nav)
- ✅ 21 dashboard tabs total (see §17)
- ✅ Admin analytics + admin consoles (moderation, trust, churn, matching, experiments)

---

## 16. Landing & Brand

- ✅ Cinematic landing (Acts I–V): void emergence, SIA intro, interactive questions, 12-week timeline, Today Screen
- ✅ CinematicCanvas + ConstellationScene + shared SiaMark
- ✅ Preloader: CinematicSplash + RouteLoader (GPU-cheap clay DOM; three.js removed)
- ✅ Performance tier hook (usePerformanceTier) — fixed GPU jank on low-end PCs
- ✅ Brand Guidelines v2.1
- ✅ Custom-illustration error/status pages
- ✅ Newsletter (lifecycle, welcome email, admin)

---

## 17. Dashboard Tab Inventory (21 tabs)

`AICoach` · `Overview` · `Activity` · `Goals` · `Plans` · `Progress` · `Achievements` · `Intelligence` · `LifeWorld` · `LifeMatrix` · `Nutrition` · `Workouts` · `Wellbeing` · `Finance` · `VoiceAssistant` · `VoiceCall` · `ChatHistory` · `Notifications` · `Preferences` · `Profile` · `Settings`

Sub-tab modules: `accountability/` · `achievements/` · `activity/` · `alarms/` · `analytics/` · `intelligence/` · `knowledge-graph/` · `life-matrix/` · `music/` · `nutrition/` · `overview/` · `plans/` · `progress/` · `social/` · `voice-assistant/` · `workouts/`

---

## 18. Top-Level Pages (130 total)

Key surfaces beyond the dashboard: `/ai-coach` · `/chat` · `/career` · `/money-map` · `/wellbeing` · `/nutrition` · `/workouts` · `/exercises` · `/yoga` · `/wiki` · `/knowledge-graph` · `/life-areas` · `/life-world` · `/goals` · `/plans` · `/schedule` · `/journal` (via wellbeing) · `/quick-notes` · `/progress` · `/achievements` · `/leaderboard` · `/competitions` · `/groups` · `/feed` · `/reputation` · `/people` · `/community` · `/whatsapp` · `/whoop` · `/soundscape` · `/voice-assistant` · `/voice-call` · `/messages` · `/notifications` · `/onboarding` · `/obstacles` · `/contracts` · `/activity-status` · `/subscription` · `/upgrade` · `/locked` · `/settings` · `/preferences` · `/profile` · `/admin` · `/blogs` · `/webinars` · `/help` · `/faq` · `/newsletter` · `/about` · `/contact` · `/press` · `/security` · `/privacy` · `/terms` · `/hipaa` · status pages (`/maintenance`, `/offline`, `/forbidden`, `/unauthorized`, `/coming-soon`)

---

## 19. Security, Ops & Infrastructure

| Area | Status | Notes |
|---|---|---|
| OAuth token encryption | ✅ | AES-256-GCM at rest. |
| Auth hardening | ✅ | HttpOnly cookies; hashed refresh tokens; password-reset tracking; key redaction; CSP hardened. |
| SchedulerRegistry | ✅ | Centralized job lifecycle + health/failure alerts. |
| Job fleet gating | ✅ | Activity-gated (`ENABLE_BACKGROUND_JOBS`). |
| Socket.IO cluster adapter | ✅ | Redis pub/sub bridge (gated `CLUSTER_MODE`). |
| Redis resilience | ✅ | MISCONF storm throttled. |
| Deploy self-heal | ✅ | Migration checksum drift auto-heal; duplicate-version rename. |
| RBAC + roles | ✅ | Role controller + admin surfaces. |
| Audit logging | ✅ | Tool audit log + admin. |
| Delete-account flow | ✅ | + user country + self routes. |
| PHI audit log / field encryption | ❌ | Not started (compliance). |
| GDPR export/deletion | ❌ | Not started. |
| 2FA | ❌ | Not started. |
| APM / Sentry | ❌ | Not started. |
| Web + Worker split | ❌ | 69 jobs share HTTP process. |
| OpenAPI / Swagger | ❌ | 120 routes undocumented. |

---

## 20. Data Sources / Integrations

✅ WHOOP · Spotify (PKCE + Jamendo fallback) · Google Calendar (per-user OAuth, multi-calendar) · Prayer times · Holiday calendar · Finance · YouTube (tutorials) · 🟡 Fitbit (partial) · ❌ Apple Health / Garmin / Oura

---

## 21. Still Pending (highlights)

See [Missing-Features.md](./Missing-Features.md) for the full list. Top items:
- ❌ Outbound PSTN calling (Twilio)
- ❌ PWA / offline mode
- ❌ HIPAA PHI audit log + field encryption; GDPR export; 2FA; APM/Sentry
- ❌ Web + Worker process split
- ❌ OpenAPI spec
- 🟡 Deep AI workout adaptation; Nutritionix; Fitbit full sync; advanced ML predictions; cohort/A-B analytics
- 🚩 **WhatsApp go-live requires closing 10 Critical audit findings** (identity conflation, no image pipeline, ban-risk fleet bug) — NOT just a flag-flip. See [AUDIT-FINDINGS-AND-GAPS.md §4](./AUDIT-FINDINGS-AND-GAPS.md#4-whatsapp-intelligence--go-live-blockers).
- 🚩 Go-live readiness for Doc Intelligence, Witness, Try-On (flag-flip + consent UI + live E2E)
- ❌ Finance intelligence layer — AI insights writer doesn't exist, no consent gate, plaintext-at-rest (2.7/10 maturity). See [AUDIT-FINDINGS-AND-GAPS.md §3](./AUDIT-FINDINGS-AND-GAPS.md#3-finance--money-map-audit).

---

## 22. Cost Management (planning docs — mostly not yet built)

> Full detail: [AUDIT-FINDINGS-AND-GAPS.md §11](./AUDIT-FINDINGS-AND-GAPS.md#11-cost-management-docscost-managementmd--new-section). Source: `docs/cost-management/` (6 docs, dated 2026-05-25).

| Area | Status |
|---|---|
| Model tiering (Gemini 3 primary, tiered by task) | ✅ Implemented via env vars |
| Cost monitoring (usage logging, dashboards, spike alerts) | ❌ Proposed only — no dashboard/alerting infra confirmed live |
| Cost optimization playbook | 🟡 Only "templated messages" shipped, as the Response Optimization Layer (message library + hybrid response, OFF by default, shadow→canary→on rollout) |
| Pricing strategy (subscription tiers, credit meters) | 🟡 Draft/iterating — figures differ between source docs |

---

## 23. Newly-Surfaced Planned/Confirmed Modules (from `docs/superpowers/`)

Full detail: [AUDIT-FINDINGS-AND-GAPS.md §12](./AUDIT-FINDINGS-AND-GAPS.md#12-previously-unknown-plannedconfirmed-modules-docssuperpowers). Headline items not previously tracked:

| Item | Status |
|---|---|
| LLM Wiki Layer (5-phase) | ✅ Became the shipped Wiki module — Phase 4 (lint/backfill) unconfirmed |
| Agentic Journal Editor (TipTap) | ✅ Likely shipped as journal quick-capture/editor modal — verify TipTap specifically |
| Unified Goals Page | ✅ Shipped (`goals-unified.controller.ts` confirmed) |
| Financial Report Auto-Charts / Universal AI Coach Charts | 🟡 Unconfirmed — plan docs only |
| Workout Module Redesign Blueprint | ❌ Proposal only — found fabricated sparkline data + off-brand colors in current module, not yet fixed |
| WhatsApp voice-command + home-screen-widget calling channels | ❌ Planned, not built (only WebRTC mobile-app calling shipped) |
| Enterprise Subscription Tier | 🟡 Schema exists (`admin_overrides`, `enterprise_contracts`), overlay wiring pending |

---

*MODULES-AND-FEATURES.md | Balencia Platform | Snapshot 2026-07-08, cross-checked against `docs/` engineering audit archive.*
