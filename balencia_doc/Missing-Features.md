# Balencia Platform - Missing Features

> **Purpose**: Requirements documented in PRD/Epic stories but NOT yet implemented in code
> **Last Updated**: 2026-07-08
> **Source**: Cross-reference of `prd-epics/`, `stories/`, and `PRODUCTS/yhealth-app/` codebase
> **Related**: [PROGRESS.md](./PROGRESS.md) | [MODULES-AND-FEATURES.md](./MODULES-AND-FEATURES.md) | [CHANGELOG-2026-05-07.md](./CHANGELOG-2026-05-07.md) | [AUDIT-FINDINGS-AND-GAPS.md](./AUDIT-FINDINGS-AND-GAPS.md) (numbered engineering-audit findings) | [PROGRESS-DEV.md](./PROGRESS-DEV.md) | [Audit](./balencia_result.md) | [Reviews](./reviews/)

---

## Summary

> **2026-07-08 refresh**: Most cross-cutting items shipped in the May→Jul wave (see [CHANGELOG-2026-05-07.md](./CHANGELOG-2026-05-07.md)). E03 (WhatsApp) is now **un-deferred + built (flag-gated)**. Several original P0 infra items remain.

| Epic | Missing Features | Severity |
|------|-----------------|----------|
| E01 | 2 | P0 (legacy AI stubs only — superseded by LangGraph) |
| E02 | 1 | P1 (outbound PSTN / Twilio) |
| E03 | 🚩 Built, flag-gated (OFF) | Baileys intelligence layer built; go-live pending (consent UI + live E2E) |
| E04 | 1 | P2 (PWA / offline only — web-push done) |
| E05 | 2 | P2 (AI adaptation depth) |
| E06 | 2 | P2 (Nutritionix + barcode) |
| E07 | 1 | P2 (AI wellbeing protocol depth) |
| E08 | 0 | ✅ Ahead of docs + LCM added (stories pending) |
| E09 | 4 | P2 (non-WHOOP/Spotify/GCal providers) |
| E10 | 2 | P3 (cohort + A/B) |
| **Post-MVP** | 🚩 Go-live readiness | WhatsApp, Document Intelligence, Witness, Virtual Try-On (flag-flip + consent + E2E) |

---

## E01: Onboarding & Assessment

| Feature | Story | Status | Notes |
|---------|-------|--------|-------|
| AI-Powered Plan Generation | S01.2.x | ✅ Done | P35 Life Goals decomposition + Gemini/Claude plan generation are live. Original controller stub still present at `plan.controller.ts:1114` but downstream LangGraph path supersedes it — scheduled for stub removal. |
| AI Goal Suggestions | S01.1.x | ✅ Done | Life-goals AI suggestions (P35 `goal-decomposition.service.ts`) and onboarding AI (`onboarding-ai.service.ts`, 1,752 lines) cover this. Legacy stub at `assessment.controller.ts:516` pending cleanup. |
| AI Deep Assessment Analysis | S01.1.x | 🟡 Stub | `assessment.controller.ts:367,412` — placeholder conversation + insights extraction. LangGraph wiring pending. |
| Assessment Persistence | — | ✅ Done | Tables 07–08; full responses + scoring |
| Integration Discovery & OAuth Selection | S01.9–10 | ✅ Done | WHOOP + Spotify + Google Calendar OAuth (P47) |
| Plan Generation Engine | S01.14 | ✅ Done | `plan.controller.ts` + LangGraph plan tool |
| Plan Presentation & Adjustment | S01.15 | ✅ Done | `/plans/[id]` page + reschedule workflow |

---

## E02: Voice Coaching

| Feature | Story | Status | Notes |
|---------|-------|--------|-------|
| User-Initiated Voice Calls | S02.01 | ✅ Done | P8 |
| AI-Initiated Proactive Calls | S02.02 | ✅ Done | `checkin-call.job.ts` + proactive messaging routing |
| Scheduled Coaching Sessions | S02.03 | ✅ Done | `voice-schedule.service.ts` |
| Voice Conversation Engine | S02.04 | ✅ Done | WebRTC + LangGraph + ElevenLabs/Google TTS |
| Context Memory | S02.05 | ✅ Done | Life-history embeddings (P33) + comprehensive context |
| Real-time Transcription | S02.06 | ✅ Done | AssemblyAI |
| Emotion Detection | S02.07–09 | ✅ Done | Camera + text + audio emotion; crisis detection |
| Quick Check-in Sessions | S02.10 | ✅ Done | QuickCheckInFlow |
| Emergency Support Session | S02.11 | ✅ Done | EmergencySessionFlow + mental-health guardrails (P47) |
| Goal Review Session | S02.12 | ✅ Done | GoalReviewFlow |
| Summary Generation & Delivery | S02.13–14 | ✅ Done | `call-summary.service.ts` + `summary-delivery.service.ts` |
| Voice Schedule Customization | S02.15 | ✅ Done | VoiceCustomizationPanel |
| Accessibility Preferences | S02.16 | ✅ Done | P29 modal responsiveness + screen-reader support |
| **Outbound PSTN Calling** | — | ❌ Not Started | `sms.service.ts:68` has literal `// TODO: Integrate with Twilio`. All Twilio env vars declared but no SDK calls. **P1** |

---

## E03: WhatsApp Intelligence (UN-DEFERRED + BUILT, flag-gated)

**Status changed 2026-06**: WhatsApp was un-deferred and a **Baileys-primary behavioral-intelligence layer** is built (flag-gated, OFF by default). NOT a simple Business-API integration — it's an intelligence mirror.

Implemented:
- ✅ Baileys gateway, consent, mirror, preflight (`whatsapp.controller.ts`, `server/src/services/whatsapp`)
- ✅ Inbox persistence → `whatsapp_mirror_messages` (col `body`) + async merge + on-demand backfill
- ✅ Cloud API fallback blueprint
- ✅ Searchable phone-number field for account linking
- ✅ Raw-data retention pruning + privacy service
- ✅ Agent Studio design (n8n-like workflow builder + per-chat Autopilot) — design only

**⚠️ Go-live blockers (🚩) — corrected 2026-07-08**: The 2026-06-17 integration audit found **10 Critical + 5 High findings**, none confirmed fixed. This is more than a flag-flip. Full list: [AUDIT-FINDINGS-AND-GAPS.md §4](./AUDIT-FINDINGS-AND-GAPS.md#4-whatsapp-intelligence--go-live-blockers). Highlights:
- **Transport identity conflation** — coach messages could route through the user's own Baileys account instead of Balencia's Cloud API
- **Image/vision pipeline not implemented at all**
- Raw message text persisted before redaction; voice-note bytes downloaded before consent check
- Fleet liveness bug — duplicate Baileys sockets risk a WhatsApp ban
- Feature flags not enforced server-side at route level; automation can bypass consent
- Legacy public `/webhooks/whatsapp/voice-command` route has no signature verification
- Right-to-erasure doesn't cascade to derived data (memories, commitments, baselines)
- `@lid↔phone` mismatch UNFIXED (Baileys LID vs phone-number identity)
- Launch Gate (preflight + build + Cloud API fallback + restart survival + 1 real E2E send) not confirmed passed

| Feature | Story | Status |
|---------|-------|--------|
| WhatsApp Intelligence Layer | S03.0.1 | 🚩 Built, **10 Critical findings open** |
| Message Templates | S03.1.x | 🚩 Built (mirror) |
| Group Coaching via WhatsApp | S03.2.x | ⏳ Agent Studio design only |
| WhatsApp Onboarding Flow | S03.3.x | ⏳ Pending |
| Rich Media Messages | S03.4.x | 🚩 Built (mirror); image/vision NOT implemented |
| WhatsApp Notifications | S03.5.x | 🚩 Built (mirror) |
| SMS Verification | S01.1.3 | ⏳ Pending |

---

## E04: Mobile App (Web Pivot)

| Feature | Story | Status | Notes |
|---------|-------|--------|-------|
| Dashboard & Navigation | S04.01–05 | ✅ Done | 8-tab dashboard + bottom nav + channel switching |
| Charts & Visualizations | S04.06–08 | ✅ Done | Recharts + d3 + chart.js + Premium Circular Metrics (P38) |
| Notification Infrastructure | S04.09–11 | ✅ Done | P36 Notification Engine + Web Push (P47) + Desktop Notifications / DesktopNotificationPrompt + NotificationSocketBridge (P48) |
| Accessibility | S04.18–20 | ✅ Done | Radix UI + keyboard nav + focus trap (P19) |
| Settings & Preferences | S04.16–17 | ✅ Done | Settings page + Preferences page + Privacy controls |
| **PWA / Offline Mode** | S04.x | ❌ Not Started | No service worker, no offline caching. **P2** |
| Web Push + Desktop Notification Opt-in | S04.x | ✅ Done | VAPID (P47) + DesktopNotificationPrompt opt-in UI + NotificationSocketBridge (P48) complete the stack. |

---

## E05: Fitness Pillar

| Feature | Story | Status | Notes |
|---------|-------|--------|-------|
| Wearable Integration | S05.01–02 | ✅ Done | WHOOP + Spotify activity signals |
| Activity Logging | S05.03 | ✅ Done | `activity-ingestion.service.ts` + events |
| Sleep Metrics | S05.04–05 | ✅ Done | WHOOP sleep + cross-pillar insights |
| Dual Recovery Score | S05.06 | ✅ Done | Physical (WHOOP) + Mental Recovery (P8) |
| Recovery Recommendations & Alerts | S05.07–08 | ✅ Done | Basic done |
| Goal Creation & Progress | S05.09–10 | ✅ Done | Life goals + daily check-ins |
| Workout Recommendation Engine | S05.11 | ✅ Done | LangGraph workout manager |
| Exercise Library | S05.12 | ✅ Done | 400+ exercises + admin CRUD (P20) |
| Workout Feedback | S05.13 | ✅ Done | Execution drawer + history (P21) |
| Strain Score & Balance | S05.14–15 | ✅ Done | `whoop-stress.service.ts` + analytics |
| Strain Alerts | S05.16 | ✅ Done | Proactive messaging integration |
| **AI Workout Adaptation (deep personalization)** | S05.x | 🟡 Partial | Basic plans exist; cross-session progressive-overload AI pending. **P2** |
| **Personalized Recovery Protocols** | S05.x | 🟡 Partial | Generic recovery recommendations; personalized protocols pending. **P2** |

---

## E06: Nutrition Pillar

| Feature | Story | Status | Notes |
|---------|-------|--------|-------|
| Food Database | S06.01 | ✅ Done | ~400+ items, Indian/South-Asian matching (P28) |
| Photo AI Meal Recognition | S06.02 | ✅ Done | Dish-level identification + 10 rules (P38) |
| Manual Search | S06.03 | ✅ Done | Search in client |
| Voice / Chat Logging | S06.04 | ✅ Done | LangGraph meal manager + intelligent extraction (P41) |
| Calorie & Macro Dashboard | S06.05 | ✅ Done | Dashboard + UnifiedHealthDashboard (P38) |
| Personalized Targets | S06.06 | ✅ Done | `adaptive-calorie.service.ts` |
| Hydration Logging & Reminders | S06.07–08 | ✅ Done | `water-intake.service.ts` |
| Nutrition Goal Setting | S06.09 | ✅ Done | Life goals + nutrition-user-preferences |
| AI Meal Plan Generation | S06.10 | ✅ Done | Diet-plans routes + LLM |
| Meal Plan Progress | S06.11 | ✅ Done | MealHistoryTab + progress tracking |
| Realtime Nutrition Guidance | S06.12 | ✅ Done | Auto-logging from chat messages (P41) |
| Nutrition Q&A | S06.13 | ✅ Done | LangGraph meal manager |
| Proactive Interventions | S06.14 | ✅ Done | Data-gap meals/water proactive messages (P41) |
| Educational Content | S06.15 | ✅ Done | Blog system + help articles |
| Custom Food & Recipes | S06.16 | ✅ Done | Recipes table 27 |
| Emotional Eating Detection | S06.17–18 | ✅ Done | `nutrition-learning.service.ts` patterns |
| **Nutritionix External API** | S06.0.1 | ❌ Not Connected | Local DB covers MVP; external API for broader catalog pending. **P2** |
| **Barcode / UPC Scanning** | S06.x | ❌ Not Started | Camera scan for packaged foods. **P2** |

--- 

## E07: Wellbeing Pillar

| Feature | Story | Status | Notes |
|---------|-------|--------|-------|
| Mood / Energy / Stress Tracking | S07.01–12 | ✅ Done | P15 + P30 + expanded 13 emojis + arc timeline + behavioral patterns |
| Habit Creation & Tracking | S07.05–07 | ✅ Done | HabitDashboard + habit_logs |
| Journaling | S07.08–10 | ✅ Done | Entry form + AI prompts + voice journal (P31) + Mind Constellation |
| Self-Report Stress | S07.11 | ✅ Done | StressCheckIn |
| Multi-Signal Stress Detection | S07.12 | ✅ Done | Multi-source: WHOOP + calendar + journal + self-report |
| Stress Alerts & Interventions | S07.13 | ✅ Done | `stress-reminder.job.ts` + crisis detection |
| Wellbeing Goals & Routines | S07.14–16 | ✅ Done | Routines + completions + daily schedules |
| Schedule Workflow Builder | S07.x | ✅ Done | P48 — ScheduleWorkflow node-graph UI + WorkflowNode component + service layer + time-conflict helper + schedule-item source migration |
| Mindfulness Library | S07.17 | ✅ Done | MindfulnessRecommendation + yoga + meditation (P32) |
| Context-Aware Recommendations | S07.18 | ✅ Done | WellbeingContextService + question engine |
| **Advanced AI Wellbeing Protocols** | S07.x | 🟡 Partial | Basic recommendations live; deep AI-personalized protocols (e.g., anxiety-specific micro-protocols) pending. **P2** |

---

## E08: Cross-Domain Intelligence

**✅ Ahead of docs** — implementation (P31) is complete. Stories still need generation (NS-002).

Implemented:
- Contradiction detection (22 rules across 6 pillars)
- Health correlations (6 SQL detectors)
- Best Day Formula + daily achievement score
- Prediction accuracy tracking
- Weekly aggregated reports (LLM narrative)
- Voice journaling end-to-end
- Theme detection (15 tags)
- LLM model factory (4-provider cascade: Gemini → Anthropic → DeepSeek → OpenAI)
- Intelligence Tab (5 sub-tabs) + 4 overview widgets
- Cross-domain correlator (P47) with data sources (Spotify/Calendar/Prayer/Finance)

**Action needed:** Generate E08 stories to document what's already built (NS-002).

---

## Post-MVP: Career Module — MVP Scope Gaps

Career module shipped (schema/services/AI-tools/jobs/API/UI, 2026-06-23 → 2026-07-03), but the master spec (`docs/career-module.md` §22) splits scope into tiers. Only **Must-Have** is confirmed built. Full detail: [AUDIT-FINDINGS-AND-GAPS.md §5](./AUDIT-FINDINGS-AND-GAPS.md#5-career-module--mvp-scope-gaps-docscareer-modulemd).

| Feature | Status | Notes |
|---------|--------|-------|
| Weekly Execution Engine, scheduling, scoring, accountability | ✅ Done | Must-Have tier |
| Focus areas, analytics heatmap, badges, resource links | ✅ Done | Must-Have tier |
| **Skill gap analysis, Resume review, Portfolio tracker, Application tracker, Calendar, AI weekly review** | 🟡 Unconfirmed | Should-Have tier (Phase 7-8) — named tools `career.resume.review`, `career.portfolio.review`, `career.application.*`, `career.calendar.create_event` need verification against shipped code |
| **AI interview simulation, Job matching, LinkedIn optimization, Salary negotiation coach, Mentor matching** | ❌ Not built | Advanced Later tier |
| Career Risk Detection, Undo/Activity Log, Deep Links from AI Chat, Voice Mode Support | 🟡 Unconfirmed | Improvements layer (§3 of spec) |

---

## Post-MVP: Proactive Coaching — 2026-07-06 Follow-up Findings

The 2026-06-19 proactive-coaching audit's Waves 0-3.1 are largely ✅ complete (see [AUDIT-FINDINGS-AND-GAPS.md §6](./AUDIT-FINDINGS-AND-GAPS.md#6-proactive-coaching--two-audits)). A **follow-up audit on 2026-07-06** found 3 new defects, none fixed as of that date:

| Defect | Status | Phase |
|---------|--------|-------|
| In-app Schedule tasks generate no reminders (only Google Calendar events do) | ❌ Not fixed | Phase 0 (in progress) |
| Coach is health-biased by design — no career/learning/productivity in `CoachDomain` taxonomy; only top-1 candidate sent per cycle | ❌ Not fixed | Phase 1 (not started) |
| Goals fragmented across 4 disjoint tables — auto-generation only works for career + health | ❌ Not fixed | Phase 2 (not started) |
| Proactive voice calls are time-scheduled only, no event-driven trigger (`AI_COACH_CALL_BULLMQ_ENABLED` default OFF) | ❌ Not fixed | Phase 3 (not started) |
| LCM cross-domain narrative built but richest surface (`ENABLE_LCM_COACH_BLOCK`) still default-OFF | 🚩 Flag-gated | — |

---

## E09: Data Integrations

| Feature | Story | Status | Notes |
|---------|-------|--------|-------|
| WHOOP | — | ✅ Done | OAuth+PKCE + webhooks + analytics + stress derivation |
| Spotify | — | ✅ Done | PKCE + Jamendo fallback + listening history (P47) |
| Google Calendar | — | ✅ Done | Per-user OAuth, multi-calendar sync (P47) |
| Prayer Times | — | ✅ Done | `prayer-times.service.ts` + table 124 |
| Holiday Calendar | — | ✅ Done | `holiday-calendar.service.ts` + table 119 |
| Finance Data Source | — | ✅ Done | `finance-tracking.service.ts` + table 125 (data feed only — see Money Map intelligence gap below) |
| YouTube (tutorials) | — | ✅ Done | 24h cache + nocookie embeds |
| **Money Map / Finance Intelligence** | — | ❌ **2.7/10 maturity** | AI insights writer doesn't exist (`finance_ai_insights` zero writers); no LLM consent gate; plaintext-at-rest. Correctness-patched only (budget reconciliation, Zod validators, soft-delete fixed). See [AUDIT-FINDINGS-AND-GAPS.md §3](./AUDIT-FINDINGS-AND-GAPS.md#3-finance--money-map-audit). **P1** |
| **Fitbit Full Sync** | S09.x | 🟡 Partial | OAuth started; full data sync incomplete. **P2** |
| **Apple Health (HealthKit)** | S09.x | ❌ Not Started | **P2** |
| **Garmin Connect** | S09.x | ❌ Not Started | **P2** |
| **Oura Ring** | S09.x | ❌ Not Started | **P2** |

---

## E10: Analytics Dashboard

| Feature | Story | Status | Notes |
|---------|-------|--------|-------|
| 8-Tab Dashboard | — | ✅ Done | Overview, Activity, Goals, Achievements, Notifications, Profile, Preferences, Settings |
| Intelligence Tab (5 sub-tabs) | — | ✅ Done | Insights, Correlations, Predictions, Reports, Health Score (P31) |
| Overview Widgets | — | ✅ Done | HealthScoreHero, BestDayProgress, PredictionsCard, ContradictionsBanner (P31) + Life Areas + Smart Timing + Proactive Coach (P47) |
| Analytics & Reporting Views | — | ✅ Done | AnalyticsTab + ReportingTab + ScoringTab |
| Admin Analytics | — | ✅ Done | `admin-analytics.service.ts` + routes |
| Leaderboard & Scoring | — | ✅ Done | Dual-track competitions + daily scoring job + snapshots |
| Chart Library | — | ✅ Done | Recharts + chart.js + d3 + Premium Circular Metrics (P38) |
| **Predictive Health Models (advanced ML)** | S10.x | 🟡 Partial | P31 basic predictions live; deep ML models pending. **P3** |
| **Cohort Analysis / Benchmarking** | S10.x | ❌ Not Started | **P3** |
| **A/B Testing Dashboard** | S10.x | ❌ Not Started | **P3** |

---

## Cross-Cutting Missing Features

| Feature | Source | Status | Notes |
|---------|--------|--------|-------|
| Subscription Paywall Enforcement | PRD / Monetization | ✅ Done (P48+P49) | P48: entitlement plumbing (service, credit service, context, gates, stores, seed plans). P49: `entitlement.middleware.ts` (requireTier/requireFeature/requireCredits) wired on ai-coach, journal, rag-chatbot, transcription, TTS, voice-calls, emotional-checkin, call-summaries routes. Shadow→enforce rollout modes. Billing UI: CheckoutButton, PlanComparisonTable, CreditLedgerTable, CancelSubscriptionDialog, LockedFeatureScreen, /upgrade, /settings/billing pages. Admin: 6 subscription sub-pages + abuse detection. Stripe webhook service. Grace expiration job. Full credit ledger with promo codes. |
| **Hardcoded AssemblyAI API key** | Security | ❌ Must Fix | `assemblyai.service.ts:10`. **P0 — rotate & purge.** |
| **JWT/Session default secrets** | Security |  ✅ Done Must Fix | `env.config.ts:64-65` fallback strings; dev insecure. **P0** |
| **Duplicate migration filenames** | Infra |  ✅ Done | `113-*.sql`, `116-*.sql`, `27-*.sql`, `30-*.sql` duplicates. **P0** |
| **Auto-migrate race at boot** | Infra |  ✅ Done | No advisory lock; multi-pod risk. **P0** |
| **Web + Worker split** | Infra | ❌ Must Fix | 34 jobs share HTTP process. **P0** |
| **APM / Error Tracking (Sentry etc.)** | Ops | ❌ Not Started | **P0** |
| **OpenAPI / Swagger Spec** | Docs | ❌ Not Started | 92 route files undocumented. **P1** |
| **HIPAA-grade PHI Audit Log** | Compliance | ❌ Not Started | App collects mental-health data; no access log. **P1** |
| **PHI Field-Level Encryption** | Compliance | ❌ Not Started | **P1** |
| **GDPR Data Export / Deletion** | PRD | ❌ Not Started | **P1** |
| **Email Verification on Signup** | PRD |  ✅ Done  | **P1** |
| **Two-Factor Authentication** | PRD | ❌ Not Started | **P1** |
| **Multi-language Support (i18n)** | PRD | 🟡 Partial | English/Urdu only, no i18n framework. **P2** |
| **Referral System / Viral Loop** | Growth | ❌ Not Started | **P1 revenue lever** |
| **Automated Dunning / Refund** | Billing | ❌ Not Started | **P1** |
| **Content Moderation for Group Chats** | Trust & Safety |  ✅ Done (2026-06) | Community moderation + orchestration shipped. **P1** |
| **OAuth Token Encryption** | Security | ✅ Done (2026-05-22) | AES-256-GCM at rest. |
| **Auth Hardening (HttpOnly cookies, hashed refresh, CSP, reset tracking)** | Security | ✅ Done (2026-05-22) | |
| **SchedulerRegistry / Job Lifecycle** | Ops | ✅ Done (2026-05-22) | Centralized lifecycle + health/failure alerts. |
| **Background-Job Fleet Gating** | Ops | ✅ Done (2026-06-03) | Activity-gated; idle API storm quieted. |
| **Socket.IO Cluster Adapter** | Ops | ✅ Done (2026-07-02) | Redis pub/sub bridge (`CLUSTER_MODE`). |
| **WebRTC TURN Fallback** | Ops | ✅ Done (2026-07-06) | Env-driven ICE + `/webrtc/ice-servers`. |
| **Delete-Account Flow** | Compliance | ✅ Done (2026-07-03) | + user country + self routes. |
| **Deploy Self-Heal (migration checksum drift)** | Infra | ✅ Done (2026-06-03) | |
| **Global Timezone Fix (reminder drift)** | Infra | ✅ Done (2026-07-07) | `COALESCE(user_preferences.tz, users.tz, UTC)` + backfill trigger. |
| **Auto-migrate Race at Boot** | Infra | ✅ Done | Advisory lock added. |
| **Duplicate Migration Filenames** | Infra | ✅ Done | Renamed. |
| **Incident Response Runbook** | Ops | ❌ Not Started | **P0 for launch** |
| **Backup / DR Plan** | Ops | ❌ Not Started | **P0 for launch** |
| **Load Testing Baseline (10k concurrent)** | Ops | ❌ Not Started | **P1** |
| **WCAG 2.2 AA Full Audit** | Accessibility | 🟡 Partial | Radix + keyboard nav present; full audit pending. **P1** |

---

## 2026-04-07 Founder Review — Outstanding Items

From [`reviews/2026-04-07-feature-review-hamza-salman.md`](./reviews/2026-04-07-feature-review-hamza-salman.md).

**Confirmed ✅ Done (tracked in PROGRESS-DEV.md):**
- Streak System (P45)
- Status Awareness AI (P45)
- Social Accountability (P45)
- Accountability Contracts (P45)
- Accountability Buddy Matching (P45)
- Google Calendar Integration (P47 — OAuth + multi-calendar sync)
- Coach Persona / Personality Modes (P47)
- Push Notifications (P47)
- Obstacle Detection scaffolding (P47)
- Goal Reconnection engine (P47)
- Timing Profile (P47)
- Life Areas / Universal Scope (P47)
- Mental Health Guardrails (P47 — `mental-health-guardrail.service.ts` + screening events table)
- Life Goals Ecosystem — 13 categories including career/finance/relationships (P35)

**Still outstanding:**

| Feature | Source | Status | Notes |
|---------|--------|--------|-------|
| Friction Reduction Check-ins | Review §1 | ❌ Not Started | "2-min check-in after 3 days absence" |
| AI-Generated Personalized Achievements (notification tie-in) | Review §3 | 🟡 Partial | `achievement-ai.service.ts` + `dynamic-achievements.service.ts` exist; push/email wiring pending |
| SOS Feature for Isolated Users | Review §5 | ❌ Not Started | Accountability infra ready, SOS escalation path missing |
| Goal-Similarity Shared Challenges (AI-created) | Review §7 | 🟡 Partial | `smart-competition.service.ts` + `shared-challenge.service.ts` live; AI-creation prompt chain pending |
| Spotify Mood Correlation | Review §8 | ✅ Done (2026-06) | LCM + cross-domain correlator wired (Spotify/Calendar/Prayer/Finance sources). |
| Calendar Stress Correlation | Review §8 | ✅ Done (2026-06) | LCM correlator ingests meeting-density → stress. |
| Prayer / Finance Signal Correlation | Review §8 | ✅ Done (2026-06) | LCM cross-pillar graph. |
| Career Follow-up Loops | Review §9 | ✅ Done (2026-06) | Career module + Execution OS (scheduling, accountability, proactive flag-OFF). |
| Relationship Commitment Follow-ups | Review §9 | ✅ Done (2026-06) | Relationships CRM pillar built. |
| AI Outbound PSTN Calling | Review §10 | ❌ Not Started | Twilio TODO. |
| Obstacle Root-Cause Diagnosis (AI prompts) | Review §12 | ✅ Done (2026-06) | Career Obstacle Plan + `/obstacles` page live. |
| Silent Goal Revisit | Review §13 | 🟡 Partial | `goal-reconnection.service.ts` + job live; explicit 3-week-untouched rule pending. |
| Contextual-Timing Pattern Learning | Review §14 | 🟡 Partial | `timing-profile.service.ts` live; most-talkative-hour learning pending. |
| Clinical Depression Guardrails | Review §15 | 🟡 Partial | Guardrail + lane classifier + screening events live; full clinical review pending. |
| "Pillars as Infrastructure" Vision Reframe | Review — key reframe | ✅ Done (2026-07-08) | Reframe documented in [MODULES-AND-FEATURES.md §0](./MODULES-AND-FEATURES.md); Product-Vision.md/PRD edit still pending. |

---

## SIA Wave-2 Rollout Safety Gap

The SIA vNext intelligence-controller suite (Confidence Controller, Transparency Prompt Controller, and others — 19 sub-features, see [AUDIT-FINDINGS-AND-GAPS.md §10](./AUDIT-FINDINGS-AND-GAPS.md#10-sia-vnext--wave-2-intelligence-api-suite)) is code-complete and reviewed, but **two controllers ship without a feature flag** (Confidence Controller, Transparency Prompt Controller) and one **defaults ON when the reviewer recommended default-OFF** (Root-Cause Prompt Controller, `ENABLE_LCM_ROOT_CAUSE`). This is a rollout-safety gap worth closing before wider exposure — **P1**.

---

## 2026-07-08 Status Note

The May→Jul build-out closed most of the original gaps. Remaining work clusters into:
1. **🚩 Flag-gated go-live** — WhatsApp (**10 Critical audit findings**, not just a flag-flip), Document Intelligence, Witness, Virtual Try-On (flag-flip + consent UI + live E2E).
2. **❌ Launch-readiness infra** — APM/Sentry, Web+Worker split, OpenAPI spec, HIPAA PHI audit + field encryption, GDPR export, 2FA, Backup/DR, load testing.
3. **❌ Outbound PSTN** (Twilio).
4. **❌ PWA / offline**.
5. **❌ Finance intelligence layer** — AI insights writer doesn't exist, no LLM consent gate, plaintext-at-rest (2.7/10 maturity).
6. **🟡 Depth polish** — AI workout adaptation, Nutritionix, Fitbit/Apple Health/Garmin/Oura, deep ML predictions, cohort/A-B.
7. **🟡 Career Should-Have/Advanced-Later tiers** — resume review, interview simulation, job matching, mentor matching unconfirmed/not built.
8. **❌ Proactive coaching gaps (2026-07-06 follow-up)** — in-app schedule reminders silent, health-biased domain taxonomy, fragmented goal tables.
9. **🟡 SIA Wave-2 rollout-safety gap** — 2 controllers unflagged, 1 default-ON that should default-OFF.

See [CHANGELOG-2026-05-07.md](./CHANGELOG-2026-05-07.md) · [MODULES-AND-FEATURES.md](./MODULES-AND-FEATURES.md) · [AUDIT-FINDINGS-AND-GAPS.md](./AUDIT-FINDINGS-AND-GAPS.md) for full detail.

---

*Missing-Features.md | Balencia Platform*
*Created: 2026-03-10 · Last updated: 2026-07-08*
