---
portfolio_status: active-development
---

# Balencia Platform: Progress Tracker

> **Purpose**: Track product planning, epics, features, and story breakdowns
> **Last Updated**: 2026-07-08
> **Execution Queue**: See [NEXT-STEPS.md](./NEXT-STEPS.md)
> **Development Status**: See [PROGRESS-DEV.md](./PROGRESS-DEV.md)
> **Module inventory**: See [MODULES-AND-FEATURES.md](./MODULES-AND-FEATURES.md)
> **Recent feature log**: See [CHANGELOG-2026-05-07.md](./CHANGELOG-2026-05-07.md)
> **Engineering audit findings**: See [AUDIT-FINDINGS-AND-GAPS.md](./AUDIT-FINDINGS-AND-GAPS.md) (consolidated from `docs/` — commitment-contract, social-intelligence, finance, WhatsApp, proactive-coaching, SIA Wave-2 API suite, cost management)

---

## QUICK START: Copy This Prompt

```markdown
# Balencia Planning Session

## Session Context
I'm continuing product planning for Balencia Platform - AI health coach.

**Reference This Document:** @PRODUCTS/yhealth-platform/PROGRESS.md
**Reference PRD:** @PRODUCTS/yhealth-platform/Product-Requirements-Document.md

## Active Skills
EXPERT-10 (Product Manager), EXPERT-03 (Architect), EXPERT-13 (Story Generator)

## Current Focus
[Current epic or feature being planned]

## Session Goal
[Describe what you want to accomplish this session]
```

---

> **Last Reviewed**: 2026-07-08: Major doc refresh. E03 (WhatsApp) **un-deferred** — Baileys-primary intelligence layer built (flag-gated). Large post-MVP module wave shipped May→Jul: Career + Execution OS, Social Growth OS, Relationships CRM, Document Intelligence, Knowledge Graph, Wiki Neural Graph, Reputation, LCM, Virtual Try-On, Reflection, Accountability hardening + Witness, and the SIA AI-coach overhaul (Provenance v2, Confidence Engine, ARE reasoning, EI, Wave 0-2). See [CHANGELOG-2026-05-07.md](./CHANGELOG-2026-05-07.md) + [MODULES-AND-FEATURES.md](./MODULES-AND-FEATURES.md). Product in active Development stage.

## MILESTONES

### Completed

| ID | Title | Completed | Link |
|----|-------|-----------|------|
| M-001 | Product Vision Established | Dec 2025 | [View](./milestones/M-001-product-vision-established.md) |
| M-002 | PRD Complete | Dec 2025 | [View](./milestones/M-002-prd-complete.md) |
| M-003 | MVP Epic Stories Complete (E01-E07) | 2025-12-11 | [View](./milestones/M-003-mvp-epic-stories-complete.md) |
| M-004 | Development Environment Setup | 2025-12-20 | [View](./milestones/M-004-development-environment-setup.md) |
| M-005 | Core App UI Complete | 2025-12-23 | [View](./milestones/M-005-core-app-ui-complete.md) |
| M-006 | Backend API Framework | 2025-12-23 | [View](./milestones/M-006-backend-api-framework.md) |
| M-007 | Onboarding Framework Complete | 2025-12-27 | [View](./milestones/M-007-onboarding-framework-complete.md) |
| M-008 | Voice Coaching System | 2026-01-12 | [View](./milestones/M-008-voice-coaching-system.md) |
| M-009 | Wellbeing Pillar Implementation | 2026-01-12 | [View](./milestones/M-009-wellbeing-pillar-implementation.md) |
| M-010 | Chat & Messaging System | 2026-01-12 | [View](./milestones/M-010-chat-messaging-system.md) |
| M-011 | LangGraph AI Integration | 2026-01-12 | [View](./milestones/M-011-langgraph-ai-integration.md) |
| M-012 | WHOOP Integration | 2026-01-14 | [View](./milestones/M-012-whoop-integration.md) |
| M-013 | Nutrition System Enhanced | 2026-01-13 | [View](./milestones/M-013-nutrition-system-enhanced.md) |
| M-014 | Workout & Fitness System | 2026-01-13 | [View](./milestones/M-014-workout-fitness-system.md) |
| M-015 | Automation & Background Jobs | 2026-02-04 | [View](./milestones/M-015-automation-background-jobs.md) |
| M-016 | SIA vNext — Cognitive OS & Provenance | 2026-07-03 | [View](./milestones/M-016-sia-vnext-cognitive-os.md) |
| M-017 | Career Module & Execution OS | 2026-07-03 | [View](./milestones/M-017-career-module-execution-os.md) |
| M-018 | Social Growth OS | 2026-07-07 | [View](./milestones/M-018-social-growth-os.md) |
| M-019 | Relationships CRM, LCM, Knowledge Graph & Wiki Neural Graph | 2026-07-07 | [View](./milestones/M-019-knowledge-relationships-wiki.md) |
| M-020 | Document Intelligence, Reflection, Virtual Try-On & Witness | 2026-07-07 | [View](./milestones/M-020-document-intelligence-reflection-tryon.md) |
| M-021 | Accountability Contract Hardening & Analytics Engine | 2026-06-15 | [View](./milestones/M-021-accountability-hardening-analytics-engine.md) |

---

## EPIC STATUS TABLE

> **Note**: "Status" column reflects story generation completion. "Dev Status" reflects code implementation progress.

| Epic | Name | Priority | Stories Status | Stories | Dev Status |
|------|------|----------|----------------|---------|------------|
| E01 | Onboarding & Assessment | P0 | ✅ Complete | 15 | ✅ Done (15/15) — all 15 implemented; 2 AI stubs remain at `assessment.controller.ts:367,412` |
| E02 | Voice Coaching | P0 | ✅ Complete | 16 | ✅ Done (16/16) — in-app fully complete (P8, P29, P47); outbound PSTN pending (Twilio TODO) |
| E03 | WhatsApp Integration | 🚩 Flag-gated (built) | ✅ Complete | 16 | 🚩 **Un-deferred + built (flag-gated, OFF)** — Baileys-primary behavioral-intelligence layer (gateway, consent, mirror, preflight), Cloud API fallback blueprint, inbox persisted to `whatsapp_mirror_messages`, phone-number account linking, privacy/retention pruning. Not yet live in prod. |
| E04 | Mobile App (Web) | P0 | ✅ Complete | 20 | ✅ Done (20/20) — web pivot complete; PWA + web-push pending |
| E05 | Fitness Pillar | P0 | ✅ Complete | 17 | ✅ Done (17/17) — WHOOP + exercise library + plate calculator + execution drawer + rescheduling |
| E06 | Nutrition Pillar | P0 | ✅ Complete | 18 | ✅ Done (18/18) — photo AI + macro cascade + adaptive calorie + hydration + shopping list + meal plans; Nutritionix external API pending |
| E07 | Wellbeing Pillar | P0 | ✅ Complete | 18 | ✅ Done (18/18) — mood/energy/stress + journal + habits + vision + yoga + meditation + mindfulness |
| E08 | Cross-Domain Intelligence | P1 | ⏳ Not Started | - | ✅ Implemented (P31) — 22 contradiction rules, 6 correlation detectors, best-day formula, predictions, weekly reports, voice journaling, theme detection, LLM model factory. Stories pending. |
| E09 | Data Integrations | P1 | ⏳ Not Started | - | 🟡 Partial — WHOOP ✅, Spotify ✅, Google Calendar ✅ (P47), prayer-times ✅, holiday-calendar ✅; Fitbit partial; Apple Health / Garmin / Oura not started |
| E10 | Analytics Dashboard | P2 | ⏳ Not Started | - | ✅ Implemented — 8-tab dashboard + Intelligence Tab (5 sub-tabs) + 4 overview widgets + analytics/reporting + scoring + admin analytics. Stories pending. |
| E11 | SIA Cognitive OS & Provenance | P0 | ✅ Complete | 11 | ✅ Done (9/11) — whole-life scope, Provenance v2, evidence/answerability gate, context assembler, turn intelligence contract, 8 prompt controllers, 6 intelligence APIs, client dashboard. 2 stories flagged with rollout-safety gaps (unflagged controllers, `ENABLE_LCM_ROOT_CAUSE` default-ON). |
| E12 | Career Pillar & Execution OS | P1 | ✅ Complete | 14 | ✅ Done (12/14) — 5-level progression, weekly execution engine, task editor, focus areas, analytics, obstacle plan, AI coach tools. 2 Should-Have stories (resume review, application tracker) unverified/not started. |
| E13 | Social Growth OS | P1 | ✅ Complete | 16 | ✅ Done (16/16) — groups/pods, reputation, feed, mentors, matching, trust & safety, autonomous orchestrator. 9 features flag-gated for staged rollout (code shipped, flags default OFF). |
| E14 | Relationships CRM, Life Correlation Matrix & Knowledge Systems | P1 | ✅ Complete | 13 | ✅ Done (13/13) — personal-relationship CRM, 10-node LCM directed graph, platform-wide Knowledge Graph (read-time federated, no dedicated storage), Wiki Neural Graph, wiki-synthesizer reliability fixes. |
| E15 | Document Intelligence, Reflection & Virtual Try-On | P2 | ✅ Complete | 12 | 🟡 Done (11/12) — upload/OCR/RAG pipeline, doc→wiki, reflection system, try-on/AI style coach all shipped (flag-gated). Medical severity classifier (F15.5.2) designed but NOT built — In Progress. |
| E16 | Accountability Contract Hardening, Witness & Analytics Engine | P0 | ✅ Complete | 15 | ✅ Done (15/15) — full audit remediation (8 Critical + 7 Risk/Ethics + 5 Architectural, all resolved), witness peer-verification (flag-gated OFF), ECharts analytics engine. |

**Status Legend**: ✅ Complete | 🔄 In Progress | ⏳ Not Started | 🚫 Blocked

**Total Stories Generated:** 120 (across E01-E07) + 81 (across E11-E16) = **201**

**E01 Implementation Note:** Framework complete with full DB persistence. 2 stories blocked on external integrations:
- OAuth token exchange (WHOOP done, remaining providers pending)
- AI stubs in onboarding controllers (plan generation, goal suggestions, deep assessment — LangGraph exists but original stubs remain)

**E04 Platform Note:** E04 was designed for React Native mobile app but implementation pivoted to Next.js web application. All 20 stories assessed against web implementation.

**E03 Deferral Note:** WhatsApp integration deferred — web-first focus. Only voice command functionality exists from E03 stories. All WhatsApp Business API features (message templates, group coaching, etc.) not needed for current product direction.

**E08-E10 Development Note:** These epics have no stories generated yet, but substantial implementation exists:
- **E08**: Full cross-domain intelligence system (P31) — contradiction detection, correlations, best day formula, predictions, weekly reports, voice journaling, theme detection, LLM model factory
- **E09**: WHOOP fully integrated (OAuth+PKCE, webhooks, analytics, data normalization), Fitbit partial
- **E10**: 8-tab dashboard, Intelligence Tab (5 sub-tabs), 4 overview widgets, analytics/reporting views

**E11-E16 Post-MVP Note (added 2026-07-08):** These 6 epics document the May→Jul 2026 module wave — full PRD-Epic docs + story breakdowns written retroactively against already-shipped code, cross-verified via codebase research agents (not assumption-based). Two important honesty corrections surfaced during this process and are reflected in the epic docs:
- **E14/Knowledge Graph**: has NO dedicated node/edge storage tables — it's a read-time federated projection over ~31 existing feature tables, computed fresh on every request. Corrected from an initial assumption of persisted graph storage.
- **E15/Medical Report Analyzer**: the severity-tier/red-flag classifier is designed but NOT actually implemented — only consent-gating and basic out-of-range flagging shipped. Story S15.5.2 explicitly marks this "In Progress" with unmet acceptance criteria rather than claiming completion.

---

## POST-MVP MODULES (shipped May → Jul 2026)

Beyond the original E01–E10 epics, a large wave of **net-new modules** shipped after P52 (2026-04-28). Full detail in [MODULES-AND-FEATURES.md](./MODULES-AND-FEATURES.md) + [CHANGELOG-2026-05-07.md](./CHANGELOG-2026-05-07.md).

| Module | Status | Highlights |
|---|---|---|
| **SIA AI-Coach overhaul** | ✅ | Cia→SIA rebrand; whole-life scope; Provenance v2 (honesty); Evidence/Answerability gate (Wave 0); Context assembler (Wave 1); Intelligence controllers (Wave 2); Confidence Engine; ARE reasoning & discovery; Emotional Intelligence (10 personas); Semantic Memory. |
| **Career + Execution OS** | ✅ | Full pillar: schema, services, AI tools, jobs, API, UI; weekly engine, scheduling, scoring, accountability, focus areas, analytics heatmap, badges, resources. |
| **Social Growth OS** | ✅ | Groups/Pods, reputation, rewards, feed, mentors, circles, reporting, opt-in matching. |
| **Relationships CRM** | ✅ | Personal-relationship pillar; connection graph; follow; personal contacts. |
| **Life Correlation Matrix (LCM)** | ✅ | Cross-pillar directed PG graph (10 nodes); MT1 orchestrator. |
| **Document Intelligence** | 🚩 | Upload→OCR→embed→RAG `/ask`; doc→wiki; `@mention`; medical gate. Flag-gated OFF. |
| **Knowledge Graph** | ✅ | Graph builder, typed nodes, filters, D3 force-graph, detail modals. |
| **Wiki + Neural Graph** | ✅ | `.md` first-class; 4th "Graph" tab (living-brain canvas); reliability; paginated trends. |
| **Reputation** | ✅ | Score history + breakdown + premium page (pure-SVG clay charts). |
| **Virtual Try-On / AI Fashion Studio** | 🚩 | Wave 1+2: saved looks, wardrobe, AI Style Coach, before/after. Flag-gated. |
| **Reflection (double-tap)** | ✅ | Journal entry + `reflection_details` across journal, dashboard & coaching. |
| **Accountability (hardened) + Witness** | ✅ / 🚩 | Full contract lifecycle, enforcer handshake, consent-gated SOS, variable-reward; witness peer-verification flag-gated OFF. |
| **Analytics Engine** | ✅ | ECharts (Balencia dark) + AnalyticsEngine + CrossDomainCorrelator + BehavioralIntelligenceService + MetricRegistry. |
| **Churn + Trust ML** | ✅ | Logistic-regression models + admin consoles. |
| **Community / Moderation** | ✅ | Content moderation, orchestration, feed governance. |
| **Newsletter** | ✅ | Lifecycle, welcome email, admin. |
| **Overview v2 ("Life-OS")** | ✅ | Life Pulse, vitals rings, Journey, Balance Wheel, Momentum, Relationship Hub; dark-clay tokens; honest-null. |
| **Premium pillar rebuilds** | ✅ | Leaderboard, Competitions, Pods/Groups, Feed, Life Areas, Money Map, Wellbeing, Achievements → Brand v2.1 clay/glass + real data. |
| **Cinematic landing** | ✅ | Acts I–V + CinematicSplash preloader + perf-tier (low-end PC fix). |

### Infrastructure scale (2026-07-08)

| Metric | Count |
|---|---|
| Server services | **365** |
| Server controllers | **122** |
| Server routes | **120** |
| Background jobs | **69** |
| DB tables | **154** |
| DB migrations | **205** |
| Client pages | **130** |
| LangGraph tool domains | **47** |
| Dashboard tabs | **21** |

---

## PRODUCT DECISIONS

| Decision | Rationale | Date |
|----------|-----------|------|
| Stories define WHAT not HOW | Implementation deferred to tasks | 2025-12-07 |
| Flexible story sizing | Natural scope determines size | 2025-12-07 |
| All E01-E07 MVP Core | P0 Must Have per PRD | 2025-12-07 |
| Technical foundation stories | S0X.0.1 for API/platform setup | 2025-12-08 |
| 4-phase implementation | Foundation → Core → Intelligence → Enhancement | 2025-12-07 |
| Dual Recovery Score | Physical + Mental separate (not combined) | 2025-12-09 |
| Bootstrap AI approach | Research-based prompts first, AI personalizes over time | 2025-12-11 |
| PostgreSQL over SQLite | Production-grade, concurrent access, JSON types | 2025-12-20 |
| Express 5 separate backend | API flexibility, clustering support | 2025-12-20 |
| Client/server monorepo split | Next.js frontend + Express API in apps/yhealth-app/ | 2025-12-20 |
| Socket.io for real-time | Reliable WebSocket with automatic fallback | 2026-01-12 |
| BullMQ for background jobs | Redis-backed, reliable job processing | 2026-02-04 |
| Web app over React Native | E04 pivoted - web-first for faster iteration | 2025-12-23 |
| WhatsApp integration deferred | Web-first focus — WhatsApp Business API not needed for MVP | 2026-03-10 |

---

## STORY PATTERNS

| Pattern | Example | Guidance |
|---------|---------|----------|
| Technical foundation | S03.0.1 (WhatsApp API Config) | Create S0X.0.1 for external API setup |
| Media split 2-way | Photo: pipeline + confirmation | Split input from output/confirmation |
| Proactive split 3-way | Nudges: engine, timing, policy | Engine + timing + policy compliance |
| Dashboard split 3-way | Core layout + content + adaptation | Structure + dynamic + personalization |
| Accessibility split 3-way | Visual + motor/cognitive + auditory | WCAG compliance categories |

---

## STORY FILES

| Epic | File | Stories |
|------|------|---------|
| E01 | `stories/Epic-01-Stories.md` | 15 |
| E02 | `stories/Epic-02-Stories.md` | 16 |
| E03 | `stories/Epic-03-Stories.md` | 16 |
| E04 | `stories/Epic-04-Stories.md` | 20 |
| E05 | `stories/Epic-05-Stories.md` | 17 |
| E06 | `stories/Epic-06-Stories.md` | 18 |
| E07 | `stories/Epic-07-Stories.md` | 18 |
| E11 | `stories/Epic-11-Stories-Index.md` | 11 |
| E12 | `stories/Epic-12-Stories-Index.md` | 14 |
| E13 | `stories/Epic-13-Stories-Index.md` | 16 |
| E14 | `stories/Epic-14-Stories-Index.md` | 13 |
| E15 | `stories/Epic-15-Stories-Index.md` | 12 |
| E16 | `stories/Epic-16-Stories-Index.md` | 15 |

---

## SESSION LOG

| Date | Focus | Outcome |
|------|-------|---------|
| 2025-12-07 | Setup | Created PROGRESS.md, global decisions |
| 2025-12-07 | E01, E02 | 15 + 16 stories generated |
| 2025-12-08 | E03 | 16 stories with WhatsApp API foundation |
| 2025-12-09 | E04, E05 | 20 + 17 stories, competitive research |
| 2025-12-10 | E06 | 18 stories, Nutritionix integration |
| 2025-12-11 | E07 | 18 stories, bootstrap AI approach |
| 2025-12-21 | Format Migration | Migrated to Tier 2 format |
| 2025-12-27 | Progress Sync | Mapped code to stories, added M-005/M-006/M-007, identified implementation gaps |
| 2025-01-27 | E02 Implementation | S02.1.1 (User-Initiated Voice Calls) completed - CallCoachButton, VoiceCallTab, voice-call.service implemented |
| 2026-01-09 | E02 Voice System | Emotion detection, mental recovery scoring, report generation, AssemblyAI transcription, crisis detection, session orchestration |
| 2026-01-12 | E02 Voice Coaching Complete | S02-09 to S02-15 implemented - Emotion integration, session flows, call summaries, action tracking, voice customization |
| 2026-01-12 | E07 Wellbeing Pillar Implementation | Complete wellbeing pillar implementation - Mood, Energy, Stress tracking, Journal system, Habit tracking, Mindfulness recommendations, Schedule service, Full backend API and database schema |
| 2026-01-13 | Workout & Nutrition | Workout rescheduling, constraints, nutrition enhancements, meal history |
| 2026-01-14 | WHOOP Integration | Full OAuth 2.0 + PKCE, webhooks, analytics, data normalization |
| 2026-02-04 | Automation System | Schedule/activity automation, reminder processor, BullMQ background jobs |
| 2026-03-10 | Cross-Domain Intelligence (E08) | P31: Full E08 implementation — contradiction detection (22 rules, 6 pillars), health correlations (6 SQL detectors), best day formula, prediction accuracy, weekly reports, voice journaling, theme detection, LLM model factory. Intelligence Tab + 4 overview widgets. 9 services, 14 endpoints, 3 tables, 15 components. |
| 2026-03-09 | Journaling Inspiration | P30: Cross-pollinated Story Writer patterns — expanded mood states (13 emojis), mood arc tracking, behavioral pattern detection, morning/evening check-in loop, lessons learned system, intentions enhancement. 14 new API endpoints, 2 DB tables, 7 components, 3 services. |
| 2026-02-08 | Documentation Audit | Epic status reconciliation, 8 milestones backfilled (M-008-M-015), doc consolidation |
| 2026-03-12 | AI Yoga Coach + Life History (P33) | Gemini Vision real-time pose coaching with MediaPipe, Life History embeddings (semantic search over 13 data sources), YouTube tutorial integration, PoseDetailSidebar, proactive messaging yoga integration. 71 files, +6,945 lines. |
| 2026-03-31 | Vision Wellness, Intelligent Data Extraction & Yoga Expansion (P41) | Vision wellness module: Ishihara color test (8 plates, SVG dot-matrix, confusion palettes), 6 eye exercises, VisionProgress with streaks. Intelligent data extraction: AI auto-logs meals/water/mood/energy from every message with macro estimation. Smart embedding gate (isWorthEmbedding) + storeMessagePair batch INSERT. 3 data-gap proactive message types. Chat AI response pipeline with typing indicators. 4 new yoga types (eye/face/desk/breathwork), DemoVideoModal, EyeExerciseAnimation. Spotify 403 circuit breaker. Landing cinematic system (parallax hooks, 3D hero). 78 files, +6,513/-1,062 lines. |
| 2026-03-27 | AI Music Control, Vision Coaching & Multimodal Chat (P40) | musicManager semantic tool (Spotify+Jamendo, 4 actions). AI-to-player bridge (ActionCommand→CustomEvent→MusicPlayerProvider). Vision coaching (Gemini Vision, Socket.IO, exercise/rep/posture/food detection). VisionCoachingOverlay. Multimodal chat (imageBase64, HumanMessage arrays). Life history table guard. LangChain upgrade (langgraph→1.2.6). 21 files, +1,458/-125 lines. |
| 2026-03-27 | Journal Intelligence, Competition Redesign & LLM Resilience (P39) | Shared parseLlmJson<T>() utility (5 services). Journal+voiceJournal semantic tools with enum alias mapping. Fuzzy keyword routing. CompetitionsPageContent minimal rewrite. Journal schema (checkin_id, journaling_mode, date picker). MindCore refinement. Emotion detection Gemini-first. Life history pgvector guards. 31 files, +1,170/-1,071 lines. |
| 2026-03-25 | Premium Circular Metrics, Food Photo AI & Dashboard Polish (P38) | 7 SVG arc variants (DoubleRing, GlowEndpoint, MultiRing, Segmented, ThickGradient, TickMarked, Wave) with PremiumCircularMetric system. Food photo dish-level AI identification (10 rules). ProgressTab redesign (accent bars, glow). PhotoComparison ScoreRing + history. ExerciseExecution fullscreen overlay. Constellation nebula backgrounds. LLM auth error 24h blacklist. Health metrics cache (60s TTL). Null coalescing migration. 50 files, +3,298/-1,796 lines. |
| 2026-03-24 | Coaching Intelligence & Wellbeing Redesign (P37) | Semantic tool consolidation (163+ CRUD → ~10 managers, 60% reduction). WHOOP rich context (7d/30d trends, sleep stages, biometrics). Coaching styles (brutal_honesty, fired_up_pride). Async embedding pipeline. LLM provider rate-limiting. 14 wellbeing pages redesigned (React Flow workflows, drag-drop goals, charts, trends). On-demand insight compute API. 56 files, +10,085/-6,016 lines. |
| 2026-03-19 | Email & Notification Engine (P36) | Full email pipeline: EmailEngine (5 categories, preferences, queue/inline), BullMQ worker (rate-limited, RFC headers), AI content generator (weekly digests, coaching, re-engagement). NotificationEngine (Socket.IO real-time, deduplication). Email digest job. NotificationDropdown, NotificationToast, useNotifications hook. 3 DB tables, 4 services, 1 job, 6 routes. 32 files, +3,223 lines. |
| 2026-03-18 | Life Goals & Motivation Ecosystem (P35) | Multi-domain life coaching: 13 goal categories, AI goal decomposition (motivation-tier calibrated), milestones/checkins/streak tracking, motivation tier system (declared+computed+blended), engagement scoring job, Life Score metric (5-component). 6 new proactive message types. LifeGoalsStep onboarding, DailySuggestionsWidget, AISuggestionCard, 3 landing sections, FAQ/Preferences pages. 3 new services, 19 routes, 4 DB tables, 1 job. 93 files, +8,318 lines. |
| 2026-03-13 | Gemini Vision & Multi-Model AI (P34) | Gemini-first AI provider strategy (direct REST, no SDK). Vision, embeddings (1536-dim), text completions all Gemini-primary with DeepSeek/OpenAI fallbacks. JSON salvage for truncated outputs. Bug fixes: lip-sync, meal query, stress arrays. 19 files, +910/-514 lines. |
| 2026-03-11 | Spotify/Music + Yoga (P32) | Spotify OAuth+PKCE integration with Jamendo fallback, activity-based music recommendations, PersistentPlayer, MusicTab. Yoga & Meditation module: 100+ poses, sessions, meditation, streaks. 59 files, +13,711 lines. |
| 2026-03-10 | Documentation Overhaul | E03 deferred, E08/E09/E10 status updated, Missing-Features.md created, infrastructure counts refreshed |
| 2026-04-07 | Feature Review — Hamza & Salman | Founder review against North Star ("Balencia is a life coach, not a health app"). Status confirmed ✅ Done for Streak System, Activity Status Awareness, Social Accountability, Accountability Contracts, and Accountability Buddy Matching (all P45). 17 action items logged. See `reviews/2026-04-07-feature-review-hamza-salman.md`. |
| 2026-04-21 | Entitlements System, Schedule Workflow, Journal Constellation Redesign & Mood Rating (P48) | Subscription/entitlement plumbing: 6 new migrations (entitlement catalogs, extended subscription plans, plan-scoped tables, credit tables, entitlement cache, Starter/Pro/Premium seed). New `entitlement.service.ts` and `credit.service.ts` with REST endpoints (`entitlements.controller.ts`, `entitlements.routes.ts`). Client: `EntitlementsContext`, FeatureGate/PlanGate/CreditGate with hooks (useFeature, useCredits, usePaywall), PaywallCard, UpgradeModal, PaywallErrorBoundary, Zustand paywall/wallet stores, analytics event helper, icon-map. Schedule Workflow Builder: canvas-based `ScheduleWorkflow` + `WorkflowNode` + `lib/schedule/time-conflict.ts`; `schedule_items` gains `source` column for provenance. Journal mind-constellation redesign (MindConstellation, MindCore, SVGLines, EntryModal, ObservatoryHeader, FilterBar, MoodLegend, StarLayer, EmptyState). `mood_logs` gains `mood_rating` column with apply-migration helper. OAuth callback hardening (Google/Spotify). Dashboard/settings/whoop polish. 72 files touched (+~7k lines). |
| 2026-04-23 | Subscription Enforcement & Billing UI (P49) | Full server-side enforcement: `entitlement.middleware.ts` (requireTier/requireFeature/requireCredits with shadow/enforce-new/enforce-all rollout), 5 migrations (wallet backfill, Stripe hardening, subscription extensions, admin overrides, promo/audit/abuse), `graceExpirationJob.ts`, `abuse.service.ts` (velocity/fingerprint/stacking), `stripe-webhook.service.ts` (checkout/invoice/lifecycle), `credit.service.ts` expanded (full ledger), `tokenCounter.ts` (tiktoken metering). Route wiring on 8 premium route files. Client: 9 subscription components (CheckoutButton, PlanComparisonTable, CreditLedgerTable, CancelSubscriptionDialog, LockedFeatureScreen, PromoCodeInput, RemainingCreditsChip, TrialCountdownBanner, WalletSummaryCard), PageAccessGate, EntitlementsSocketBridge, useNavEntitlement. 6 admin sub-pages (abuse/analytics/features/overrides/promotions/usage). New pages: /upgrade, /settings/billing, /locked. Dashboard entitlement-aware nav, SettingsPageContent billing integration. Exercise ImportExercisesModal. 155 files, +12,300/-700 lines. |
| 2026-04-24 | Database Consolidation, Leaderboard Redesign & Test Suite (P50) | DB config consolidation (`config/database.config.ts` single source, 280+ files updated), configurable pool settings. LangGraph 16 domain modules extracted. Leaderboard SVG nav, OrbitalBackground, ScoreBreakdownBars, paginated competitions, all-time Around Me. Admin customer subscriptions. 52+ new test files (controllers, middlewares, services, validators, integration). |
| 2026-04-28 | Reasoning Graph, Tool Transactions, AI Coach Agent UI & Proactive Events (P52) | Reasoning graph system (8 modules: feature-node-registry, feature-state, graph-context, event-emitter, validation, next-best-action, state-propagation). Tool-transaction service (atomic multi-step execution with rollback). User-files service. Proactive-event-triggers service. 3 new LangGraph domains (artifacts, files, finance). AI coach UI: AgentTimeline, ArtifactCard, CheckInCard, FilesPanel. GraphHealthCard. 5 migrations (reasoning_graph, tool_operations, coach_personas, user_files, proactive_check_ins). Dockerfile.db-migrate-seed + script. 230+ client component updates. ~618 files, +27K/-22K lines. |
| 2026-04-27 | AI Tool Governance, Calendar Domain & Test Expansion (P51) | Tool governance: `tool-entitlements.config.ts`, `tool-audit.service.ts`, `tool-execution-wrapper.service.ts`, `tool-metrics.service.ts`, `admin-tools.routes.ts`. 5 migrations (chat perf indexes, entitlement shadow log, tool audit log, sleep_logs, user_medications). Calendar semantic tool domain. Service hardening (model-factory, subscription, comprehensive-user-context, coaching profile, vector-embedding, competitions, plan-generation, rag-chatbot, reminder-processor). Client: auth improvements, admin premium panel (6 components), invoice PDF, admin-tokens. 16 new controller tests, 14 job tests, 4 tool-governance tests. ~110 files, +4,400/-3,200 lines. |
| 2026-04-21 | Documentation Truth Sync | CTO-grade reality audit published at `balencia_result.md`. Epic Status Table updated (E01–E07 all ✅ Done, E03 deferred, E09 partial, E08/E10 implemented-docs-pending). PROGRESS-DEV.md received 60+ new P47 component entries covering ALL code-verified services/routes/jobs/tables — coach persona, mental-health guardrails, push notifications, data sources, timing profiles, Google Calendar OAuth, finance module, knowledge graph, life areas, subscription/Stripe, RBAC, blog/webinar/community/help/testimonial/newsletter/visitor admin surfaces, goal reconnection, obstacle detection, intelligent intervention, commitment tracker, daily pledge, micro-wins, variable reward, personality mode, user classification, inconsistency detection, life-area intent router, smart/team competition, shared challenges, dynamic/tree achievements, nutrition learning/analysis/adaptive calorie, activity ingestion/automation/events, health-profile access, safety service, reminder scheduler, embedding queue, alarm sync, task management, schedule context, special days, competition chat, follow/connections, OAuth service, summary delivery, R2 storage, correlation engine, scoring/daily-scores, report generation. Missing-Features.md rewritten to mark every completed item ✅ Done with code references; outstanding items downgraded to behavioural/polish gaps. Infra counts corrected: 177 services, 92 routes, 72 controllers, 34 jobs, 138 tables, 85 migrations, 95 pages, 999 client TSX files, 258 client tests. |
| 2026-05 → 2026-07 | **Post-MVP module wave + doc refresh** | Massive build-out after P52. E03 WhatsApp **un-deferred** (Baileys intelligence layer, flag-gated). New modules: **SIA AI-coach overhaul** (Cia→SIA, whole-life, Provenance v2, Confidence Engine, ARE reasoning, EI 10-persona, Waves 0-2), **Career + Execution OS**, **Social Growth OS**, **Relationships CRM**, **Life Correlation Matrix (LCM)**, **Document Intelligence** (🚩), **Knowledge Graph**, **Wiki + Neural Graph**, **Reputation**, **Virtual Try-On / AI Fashion Studio** (🚩), **Reflection (double-tap)**, **Accountability hardening + Witness** (🚩), **Analytics Engine**, **Churn + Trust ML**, **Community/Moderation**, **Newsletter**. Premium rebuilds across Leaderboard/Competitions/Pods/Feed/Life Areas/Money Map/Wellbeing/Achievements → Brand v2.1 clay/glass. Overview v2 "Life-OS" + dark-clay tokens + honest-null. Cinematic landing + perf-tier preloader. Security: AES-256-GCM OAuth, HttpOnly cookies, CSP; SchedulerRegistry; job-fleet gating; Socket.IO cluster adapter; WebRTC TURN. Global timezone fix (`COALESCE(user_preferences.tz, users.tz, UTC)` + backfill trigger). See [CHANGELOG-2026-05-07.md](./CHANGELOG-2026-05-07.md) + [MODULES-AND-FEATURES.md](./MODULES-AND-FEATURES.md). Infra: **365 services, 122 controllers, 120 routes, 69 jobs, 154 tables, 205 migrations, 130 pages, 47 langgraph domains, 21 dashboard tabs.** |
| 2026-07-08 | Documentation Refresh (pass 1 — git log) | Created `CHANGELOG-2026-05-07.md` (comprehensive May→Jul feature log) + `MODULES-AND-FEATURES.md` (master inventory). Updated PROGRESS.md epic status (E03 un-deferred+built), Missing-Features.md (dozens marked Done), `progress/CHANGELOG.md`. Design/wireframe/story reference artifacts intentionally left unchanged. |
| 2026-07-08 | Documentation Refresh (pass 2 — `docs/` engineering audit archive) | Cross-checked pass-1 claims against ~150 files in `docs/` (audits, SIA Wave-2 API specs, cost-management, career/whatsapp/finance/social/proactive-coaching audits, superpowers plans). Created `AUDIT-FINDINGS-AND-GAPS.md` (consolidated numbered findings + SIA Wave-2 19-feature API suite + Cost Management section). **Corrections applied**: Finance/Money Map downgraded from "hardening ✅ Done" to 2.7/10 maturity (AI-insights writer doesn't exist, no LLM consent gate, plaintext-at-rest); WhatsApp go-live reframed from "flag-flip away" to "10 Critical audit findings open" (identity conflation, no image pipeline, ban-risk fleet bug). **New sections added**: Career MVP-tier gaps (Should-Have/Advanced-Later unconfirmed), proactive-coaching 2026-07-06 follow-up (in-app schedule reminders silent, health-biased domain taxonomy, fragmented goals), SIA Wave-2 rollout-safety gap (2 unflagged controllers, 1 wrong-default). |
| 2026-07-08 | Documentation Refresh (pass 3 — milestones, epics, stories, app_design, Brand v2.1) | Full formal-doc build-out for the 6 post-MVP module groups (E11-E16), plus a platform-wide typography migration. **Milestones**: M-016 through M-021 added (SIA vNext, Career, Social Growth OS, Relationships/LCM/Knowledge/Wiki-Graph, Doc Intelligence/Reflection/Try-On/Witness, Accountability Hardening + Analytics Engine). **PRD-Epics**: 6 new full formal epics (`prd-epics/PRD-Epic-11` through `-16`, ~7,400 lines total), code-verified against the live codebase and `docs/` audit archive rather than assumption-based — corrected 2 material inaccuracies mid-write (Knowledge Graph has no dedicated storage tables — read-time federated projection over 31 tables; the correct WhatsApp/Doc-Intelligence flag is `ENABLE_DOC_MEDICAL` not `ENABLE_MEDICAL`, and the medical severity classifier is designed but not built). **Stories**: 81 new story files + 6 index files (`stories/Epic-11` through `-16-Stories-Index.md`) at the same fidelity as the original E01-E07 breakdown, honestly tracking gaps (Should-Have tiers marked "Not Started," unflagged rollout-safety controllers left unchecked in Definition of Done). **app_design**: 9 new screen-design docs (64-72, ~8,410 lines) covering Career Dashboard, Knowledge Graph, Social Groups/Pods, Reputation, Wiki Neural Graph, SIA Cognitive OS Dashboard, Relationships CRM, Reflection, Virtual Try-On — all written natively in Brand Guidelines v2.1 typography. **Brand v2.1 typography migration**: `_shared-patterns.md` (the master pattern reference) and all 63 pre-existing screen docs (01-63) migrated from the deprecated Sora font to Cabinet Grotesk (headings/UI) + Switzer (body) — ~1,514 individual replacements, verified zero remaining Sora references across all live docs. Two additional live reference docs (`Balencia-Design-Direction.md`, `_session-prompt.md`) also migrated; two dated historical snapshot docs (`_inconsistency-report.md`, `competitor-analysis.md`) intentionally left as point-in-time artifacts. Total story count now **201** (120 original + 81 new). |

---

## SKILLS REFERENCE

| Skill | Use Case |
|-------|----------|
| EXPERT-10 | MoSCoW prioritization, PRD structure |
| EXPERT-03 | Technical feasibility, scalability |
| EXPERT-13 | Story generation with full template |
| DEV-02 | Acceptance criteria, test cases |

---

*PROGRESS.md Tier 2 (Product Planning) | Balencia Platform*
*Template: FRAMEWORKS/templates/progress-tier2-product.md*
*Created: 2025-12-07 | Migrated: 2025-12-21*
