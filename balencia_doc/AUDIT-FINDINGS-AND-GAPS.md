# Balencia Platform — Audit Findings & Gaps (Consolidated)

> **Purpose**: Consolidates every numbered audit finding from `docs/` (the engineering audit archive) into one DONE/PENDING reference, plus the detailed SIA Wave-2 API suite and the Cost Management planning docs that had no home in the prior product-planning docs.
> **Source**: `docs/*.md` (18 audits/plans) + `docs/sia-coach/` (22 files) + `docs/superpowers/` (specs+plans) + `docs/cost-management/` (6 files) — all cross-checked against `git log`.
> **Related**: [MODULES-AND-FEATURES.md](./MODULES-AND-FEATURES.md) · [Missing-Features.md](./Missing-Features.md) · [CHANGELOG-2026-05-07.md](./CHANGELOG-2026-05-07.md)
> **Last Updated**: 2026-07-08

---

## 1. Commitment-Contract Audit (`docs/2026-06-10-commitment-contract-system-audit.md`)

Audit dated 2026-06-10; the doc's own "Remediation Status" section (added 2026-06-14) marks **all Critical, Risk/Ethics, and Architectural findings resolved**.

### Critical (C-1…C-8) — all ✅ resolved
| ID | Finding |
|---|---|
| C-1 | 3 of 5 condition evaluators always resolved `pass` (schema mismatch / bad math) |
| C-2 | Enforcement read `activity_events` (near-empty) instead of the canonical workout table |
| C-3 | No per-day dedup — one bad day triggered penalty/notification every 2h |
| C-4 | Missing wearable data scored as 0 — penalized instrumentation gaps, not behavior |
| C-5 | AI coach had zero contract awareness/tools — "AI enforces" premise was false |
| C-6 | Conversational-commitment loop never closed; coach scripted tough-love on fabricated failures |
| C-7 | Social-enforcer/SOS alerts structurally undeliverable (consent + ID-space bug) |
| C-8 | Grace-period penalties never executed while user was told they did |

### Risk/Ethics (R-1…R-7) — all ✅ resolved
R-1 vulnerable-user harm framing · R-2 coach gaslighting script · R-3 dead SOS safety net · R-4 weak signing consent (no recap) · R-5 no recourse for wrongful penalties · R-6 non-consenting alert recipients · R-7 false audit records/messaging.

### Architectural (Arch-1…5) — all ✅ resolved
Arch-1 triple-DDL drift (silent-outage harm fixed; cosmetic dedupe declined) · Arch-2 three disconnected commitment layers unified · Arch-3 shared objective-metric resolver built · Arch-4 lifecycle completed (pause-extend-`end_date` declined) · Arch-5 dead schema fields honored (`custom`/`manual` removed).

### High/Medium — individually flagged ✅
E-11 fabricable compliance (spoof path closed) · E-12 in-app-only delivery (push shipped; **email deferred**) · E-17 timezone/day-boundary (day-boundary + settlement gate shipped; **rolling-window sliver deferred**) · AG-6 `custom`-type no-op removed · G-44 day-of-week scheduling.

### 🟡 Explicitly deferred / declined (still open)
- SOS cron registration — job built, **not wired**
- E-12 email delivery channel
- E-17 intra-window sliver
- AG-8 pause-to-dodge exploit
- Arch-4 pause-extend-`end_date`
- Arch-1 / Arch-3 cosmetic dedupe (declined by design)
- AG★-1…8 (forward roadmap items, never in remediation scope)
- Not individually confirmed: E-9/E-10/E-13/E-14/E-15/E-16/E-18/E-19, AG-1/2/3/4/5/7/9/10

---

## 2. Social Intelligence Audit → Implementation Status

**Audit** (`2026-06-10-social-intelligence-audit.md`, 188KB): thesis was "near-complete backend, almost no client surface, no learning loop" — dead activity feed, fabricated `suggestion_accept_rate` constant (50.0), consent inverted (opt-out by default), pod auto-enrollment with no accept gate, `LIMIT`-sampling recall collapse at scale, unvalidated leaderboard scores, no message moderation/reporting, no bot/sybil prevention, mentor role never assigned, zero AI-coach social tools.

**Implementation status** (`2026-06-12-social-intelligence-implementation-status.md`) — ✅ **every audit item shipped, verified, or explicitly dispositioned.** Verification snapshot: server 309/309 suites (5,390+ tests), client 46/46 suites (668 tests), typecheck/lint clean.

**Remaining work is purely operational** — flip these 9 feature flags as data warrants:

| Flag | Gates |
|---|---|
| `ENABLE_FEED_CACHE` | Feed hot-page cache |
| `ENABLE_EMBEDDING_MATCHING` | Embedding retrieve-then-rank |
| `ENABLE_MATCH_WEIGHT_TUNING` | Matching-weight tuning loop |
| `ENABLE_CHURN_NUDGES` | Predictive churn scorer → nudges |
| `ENABLE_COMMUNITY_AGENT` | Autonomous LLM community orchestrator (schema-bounded) |
| `ENABLE_FEED_FANOUT` | Feed fan-out-on-write |
| `ENABLE_CHURN_ML` | Churn ML training pipeline (trained LR model) |
| `ENABLE_TRUST_ML` | Trust ML model (admin-block-labeled, never auto-blocks) |
| `ENABLE_COMMUNITY_ORCHESTRATOR` | Community orchestrator |

---

## 3. Finance / Money Map Audit (`docs/2026-06-17-finance-goal-tracking-audit.md` + `-immediate-fixes-plan.md`)

**Composite maturity at audit time: 2.7/10.** This is materially worse than the "Done" framing this system previously received — correct going forward.

### Findings (G1–G14)
| ID | Finding | Fixed by "Immediate Fixes" plan? |
|---|---|---|
| G1 | `finance_ai_insights` has **zero writers** — feature is vaporware | ❌ Deferred (Medium/Long-term) |
| G2 | No consent gate before sending financial data to LLMs | ❌ Deferred |
| G3 | Plaintext-at-rest despite existing AES helper | ❌ Deferred |
| G4 | `updateTransaction` never reconciles budgets | ✅ Fixed (F4) |
| G5 | Two unsynced ledgers: `finance_transactions` vs `spending_transactions` | 🟡 Minimal bridge only, not unified |
| G6 | Spending→stress correlation pipeline bug-disabled + dead-by-default | ✅ Fixed (F2 — source_type bug + auto-provision + minimal bridge) |
| G7 | Zod validators defined but never mounted | ✅ Fixed (F3) |
| G8 | Zero proactive finance messaging | ❌ Deferred |
| G9 | Naive forecasts (no real modeling) | ❌ Deferred |
| G10 | No export/erasure (GDPR gap) | ❌ Deferred |
| G11 | No categorization learning | ❌ Deferred |
| G12 | Soft-delete leaks | ✅ Fixed (F5 — filter in 2 readers) |
| G13 | (overclaim copy — "AI"/"anonymized"/"auto-generated" labels on non-AI features; dead PDF/export buttons) | ✅ Fixed (F1) |
| G14 | No audit trail | ❌ Deferred |

### What "Immediate Fixes" actually shipped (F1–F6)
F1 overclaim-copy removal · F2 stress-pipeline bridge · F3 mount Zod validators · F4 budget reconciliation on edit · F5 soft-delete filter · F6 date-range analytics refetch fix.

**Correction to prior docs**: `progress/CHANGELOG.md` and `Missing-Features.md` previously described finance work as "hardening — soft-delete filters, validation & AI insights ✅ Done." That overstates it: the **AI insights writer does not exist** (G1) and **consent/encryption gaps are open** (G2/G3). Treat Money Map as **correctness-patched, not intelligence-complete.**

---

## 4. WhatsApp Intelligence — Go-Live Blockers (`docs/2026-06-17-whatsapp-baileys-integration-audit.md` + `-live-runbook.md`)

**Correction to prior docs**: previously framed as "built, flag-gated — go-live blockers are just flag-flip + consent UI + live E2E." The audit found **10 Critical + 5 High findings, none confirmed fixed in that doc.** This is a materially bigger gap than previously stated.

### Critical findings (not confirmed fixed)
1. **Transport identity conflation** — coach messages could route through the user's own Baileys account instead of Balencia's Cloud API
2. Account-level consent not enforced as a ceiling over per-chat scopes
3. Raw message text persisted to `whatsapp_event_outbox` **before** redaction
4. Voice-note bytes downloaded before consent check
5. **Image/vision pipeline not implemented at all**
6. Fleet liveness bug — 2-min stale threshold can spin up duplicate Baileys sockets (**ban risk**)
7. Feature flags (`ENABLE_BAILEYS_FLEET` etc.) not enforced server-side at route level
8. Mirror inbox: revocation doesn't clear cache; sends bypass consent/rate pacing
9. Automation can bypass consent/approval controls
10. Consumer idempotency is in-memory only — duplicates on restart/multi-worker

### High findings
- Legacy public `/webhooks/whatsapp/voice-command` route unsafe (no signature verification, trusts body `userId`)
- Chat/group discovery not wired (picker can be empty)
- Right-to-erasure doesn't cascade to derived data (memories, commitments, baselines)
- (2 more High findings not itemized by the auditing agent — see source doc)

### Launch Gate (from the live runbook, not yet confirmed passed)
1. `whatsapp:preflight` passes
2. Typecheck/build pass
3. Cloud API fallback configured
4. One Baileys session survives restart without re-pairing
5. One real inbound + mirror + governed outbound succeeds

**Bottom line**: WhatsApp go-live requires closing the 10 Criticals above, not just a flag flip.

---

## 5. Career Module — MVP Scope Gaps (`docs/career-module.md`)

The Career module shipped (schema/services/AI-tools/jobs/API/UI per git log), but the master spec (§22 "MVP Scope") splits scope into tiers. Only the **Must-Have** tier is confirmed built; **Should-Have** and **Advanced Later** are unconfirmed.

### 🟡 "Should-Have" (Phase 7-8 — likely partial/unbuilt)
Skill gap analysis · Resume review · Portfolio tracker · Application tracker · Calendar · AI weekly review · Badges · Advanced analytics.
Named tools to verify: `career.resume.review`, `career.portfolio.review`, `career.interview.*`, `career.application.*`, `career.ai.skill_gap_analysis`, `career.calendar.create_event`.

### ❌ "Advanced Later" (very likely not built)
AI interview simulation · Job matching · LinkedIn optimization · Salary negotiation coach · Mentor matching · Community leaderboard · Career templates marketplace · Freelance client tracker · Certification tracker.

### Improvements layer (§3, unconfirmed status)
Career Risk Detection (3.6) · Undo & Activity Log (3.7) · Deep Links from AI Chat (3.8) · Voice Mode Support (3.9).

---

## 6. Proactive Coaching — Two Audits

### 2026-06-19 audit (243KB, 4.5/10 at time of audit) — Wave tracker (as of 2026-06-25)
| Wave | Theme | Status |
|---|---|---|
| Wave 0 | Stop the bleeding | ✅ Complete (8 items) |
| Wave 1 | Wire up what's already computed (memory recall, LCM injection, EI 10-persona parity, feedback loop, safety gate, intervention engine revived, crisis fail-open fix, region-aware crisis resources) | ✅ Complete |
| Wave 2 | Real-time + differentiation (real-time events, fairness floor, anti-repetition, strength/PR triggers, WHOOP forecasting/sleep-debt/illness-warning) | ✅ Complete |
| Wave 2.5–2.8 | Extended coverage batches | ✅ Mostly complete |
| Wave 3 | Whole-life expansion + unified delivery fabric (**Notification Outbox**, see §7) | 🟡 Phases 0-2 shipped flag-gated OFF; Phase 3 (flip flag) pending prod validation |
| Wave 3.1 | Safety/multi-agent foundation (WHOOP staleness gate, crisis→safety-team escalation, career/spirituality framing, multi-agent graph engine) | ✅ Complete (graph engine built, not yet on hot path) |

Top original findings (for context): proactive coach had zero memory/LCM access; no deterministic safety gate on proactive path; Intelligent Intervention Engine "doubly dead" (job unregistered + zero readers); 5 dead event-trigger hooks; `recovery_trend_alert` queried a non-existent `score` column; half the message catalog fired with empty context; no read/ignore feedback loop; notification fan-out bypassed quiet hours + had an IDOR; accountability breaches never reached coach chat; Finance/Relationships/Career/Mental-wellbeing domains had near-zero proactive coverage.

### 🆕 2026-07-06 follow-up audit — 3 new defects (NOT yet fixed as of 2026-07-06)
| Defect | Detail | Fix phase |
|---|---|---|
| **In-app Schedule tasks generate no reminders** | Only Google Calendar events trigger reminders; in-app `schedule_items` are silent | Phase 0 (in progress) |
| **Coach is health-biased by design** | `CoachDomain` taxonomy has no career/learning/productivity categories; only top-1 candidate sent per cycle, so health (40/80 triggers, highest scores) structurally crowds out other domains | Phase 1 (not started) |
| **Goals fragmented across 4 disjoint tables** | Goal→coaching auto-generation only works for career (inline) and health (onboarding-only) | Phase 2 (not started) |

Additional capability gaps: LCM cross-domain narrative built but richest surface (`ENABLE_LCM_COACH_BLOCK`) still default-OFF; proactive **voice calls** are time-scheduled only — `AI_COACH_CALL_BULLMQ_ENABLED` default OFF, no event-driven trigger exists (Phase 3, not started).

---

## 7. Notification Outbox (`docs/2026-06-21-notification-outbox-design.md`)

**Problem**: delivery fragmented across ≥3 independent subsystems (coach-chat insert, `notificationEngine.send`, push, coaching email), each with its own gating/dedup — divergent quiet-hours logic, no unified audit trail, fire-and-forget push with no retry, double-email risk.

**Design**: generalizes the existing `whatsapp_event_outbox` transactional-outbox pattern to all channels (`notification_outbox` + `notification_deliveries` tables, single `enqueue` funnel, relay job with unified `evaluateDelivery` gating).

**Status**: Design-only as of 2026-06-21 doc date; per the proactive-coaching Wave 3 tracker, **built through Phase 2** — tables + enqueue + relay job (✅), push/email routed through outbox (✅), coach_chat adapter (✅) — all flag-gated OFF (`ENABLE_NOTIFICATION_OUTBOX`). **Phase 3 (flip flag, delete dead inline fan-out, fold in lapsed-user email) is the only remaining piece.**

---

## 8. Document Intelligence — Wave Roadmap (`docs/2026-06-21-sia-document-intelligence-plan.md` + `-roadmap.md`)

Both docs dated "Proposal — awaiting approval, no implementation started" as of 2026-06-21. Git log shows real implementation shipped 2026-06-29 ("SIA Document Intelligence") and 2026-07-07 ("markdown source-kind, preview URLs, trends pagination"), so actual scope has moved past this planning doc — but the wave structure is the design ceiling to track against.

| Wave | Scope |
|---|---|
| Wave 0 | Foundations & flags |
| Wave 1 | Upload & Vault |
| Wave 2 | Ingestion pipeline (parse → OCR → chunk → embed) |
| Wave 3 | Ask My Documents (cited RAG) |
| Wave 4 | Life Memory Extraction (consent-gated) |
| Wave 5 | Medical Report Analyzer (flag-gated, non-diagnostic) |
| Wave 6 | Imaging/DICOM (Level 2, regulated) |
| Wave 7 | Regulated/clinician mode |
| (parallel) | Hardening track, runs alongside Waves 1-5 |

**Reuse/extend (infra already existed)**: object storage (R2), embeddings/vector search (Gemini/OpenAI + pgvector), chat/RAG pipeline, consent records, crisis/safety escalation, audit logging, image/vision analysis (used as the OCR path for scanned docs — no Tesseract needed).

**Note**: the plan doc does not mention "doc→wiki" or "@mention" — those sub-features (confirmed in git log / CHANGELOG-2026-05-07.md) were added during actual implementation, beyond this specific planning doc's scope.

---

## 9. Life World Redesign Audit (`docs/2026-06-22-life-world-redesign-audit.md`)

Pre-redesign score: **2/10 brand compliance** (zero brand tokens, off-brand rainbow colors, hardcoded cyan) despite the page being structurally healthy and data-honest (no fabricated data). Also found: fetches a 120-point snapshot history (`getTimeline(120)`) but discards it, rendering only `.length`.

Sub-scores: UX/hierarchy 4/10 · accessibility 3.5/10 · micro-interactions 3.5/10 · performance 6.5/10 · reuse potential 8.5/10.

| Wave | Scope | Status |
|---|---|---|
| Wave 0 | Color-debt fixes | ✅ Shipped 2026-06-22 (same day as audit) |
| Wave 1 | Premium re-skin + surface snapshot history (flagship, presentational-only) | ✅ Shipped 2026-06-22 |
| Wave 2 | Expose raw `LifeClassSignals` | ⏳ Pending |
| Wave 3 | XP/streak + AI coach summary | ⏳ Pending |
| Wave 4 | Snapshot-signal persistence | ⏳ Pending |
| Wave 5 | Gameplay enrichment (optional) | ⏳ Pending |

---

## 10. SIA vNext — Wave-2 Intelligence API Suite

Detailed sub-feature inventory beyond the Wave 0/1/2 summary already in [MODULES-AND-FEATURES.md](./MODULES-AND-FEATURES.md). Source: `docs/sia-coach/` (Wave docs + `SIA-VNEXT-MASTER-TRACKER.md` + `CLIENT-COGNITIVE-OS-DASHBOARD.md`).

| Feature | What it does | Status (per docs, 2026-06-25) | Endpoint |
|---|---|---|---|
| Cross-System Axis Unification (Wave 0) | Merges duplicated confidence-axis math into one helper feeding both the confidence engine and the answerability gate | ✅ Built + tested, committed (`24022021`); gate-feed behind `ENABLE_GATE_CROSS_SYSTEM` (default OFF) | — |
| Provenance v2 | Labels Daily Health Score as app-computed; tags RiskFlags with source; neutralizes wearable-greeting language with no fresh reading | ✅ Built + tested, committed (`66ce64d6`) | — |
| Context Assembler Slice 1 | Surfaces disengagement-risk tier + top critical/high contradictions into the system prompt | ✅ Built + tested, committed (`b98d4aa1`) | — |
| Personal Baselines (Wave 1 slice 2) | Renders user's own 30-day mood/energy/stress/anxiety + WHOOP baseline vs. today | ✅ Built + tested, committed (`25322f82`) | — |
| Turn Intelligence Contract | Per-turn auditor asserting every computed signal played a real role or is flagged discarded | ✅ Built + tested; wired into chat/stream | — |
| Confidence Controller | Appends calibration caveat to low-confidence answers | ✅ Complete, reviewed APPROVE; **not flag-gated** (rollout-safety gap) | — |
| Accountability Prompt Controller | Converts due-commitment reminders into blocker-oriented coaching | ✅ Complete; needs fault-isolation fix + flag decision | — |
| Answerability Recovery Controller | Injects cautious directive when the answerability gate can't score a turn | ✅ Complete, fail-open | — |
| Life Correlation Controller | Converts high-confidence LCM edges + contradictions into root-cause reasoning directive | ✅ Complete, 700ms fail-open | — |
| Predictive Response Controller | Governs confident-forecast vs. hedge based on prediction-accuracy telemetry | ✅ Complete | — |
| Transparency Prompt Controller | Governs claim language (measured/derived/stale) pre-generation | ✅ Complete; **not flag-gated** | — |
| Root-Cause Prompt Controller | Composes LCM + predictive controllers into one directive | ✅ Complete; `ENABLE_LCM_ROOT_CAUSE` **defaults ON** (reviewer suggested default-OFF) | — |
| Executive Daily Briefing API | Deterministic cross-pillar daily report (energy forecast, top risk/opportunity, accountability, workout readiness, recovery, goal drift, prediction reliability, recommended actions) | ✅ Implemented | `GET /api/v1/intelligence/briefing` |
| Executive Briefing — WhatsApp Surface | Reuses briefing contract for the proactive WhatsApp daily message | ✅ Implemented, unit-tested | — |
| Life Operating Map API | Curated view of all LCM life-domain nodes, current signals, strongest relationships, leverage points | ✅ Implemented | `GET /api/v1/intelligence/life-map` |
| Root Cause Explorer API | Per-domain upstream root-causes + downstream ripple forecast from LCM graph paths | ✅ Implemented | `GET /api/v1/intelligence/root-cause/:domain` |
| Ripple Simulator API | "What-if" simulator — projects ranked downstream effects of a delta on one domain | ✅ Implemented | `GET /api/v1/intelligence/ripple/:domain?delta=` |
| Future Self Timeline API | 7/30/90/365-day trajectory projections | ✅ Implemented | `GET /api/v1/intelligence/future-self` |
| Memory Explorer API | Inspectable, editable view of SIA's memories/profile facts/report intelligence with confidence + provenance | ✅ Implemented | `GET /api/v1/intelligence/memory-explorer` |
| CognitiveOperatingSystem (frontend) | First-screen client tab unifying all 6 APIs above via `Promise.allSettled` graceful degradation | ✅ Built; reviewed FIX-THEN-LAND (4 fixes applied) | — |

All items were "code-complete, reviewed, not yet committed" per the 2026-06-25 tracker snapshot — git log shows `feat(ai-coach): SIA provenance/intelligence tools, langgraph domains, crisis and memory hardening` and `feat(intelligence): monthly/weekly reports, report viewer, life-world surfacing` landing 2026-07-03, which appears to be this batch's actual commit.

---

## 11. Cost Management (`docs/cost-management/*.md`) — NEW SECTION

**This is primarily a planning/strategy doc set, not a built monitoring system.** All 6 docs dated "Last updated 2026-05-25," written around a Gemini 3 model migration.

### Model tiering (implemented via env vars)
| Tier | Model | Use |
|---|---|---|
| Default chat | `gemini-3.5-flash` (`GEMINI_MODEL`) | — |
| Deep reasoning | `gemini-3.1-pro-preview` (`GEMINI_REASONING_MODEL`) | Onboarding/profile |
| Light/classification | `gemini-3.1-flash-lite` (`GEMINI_LIGHT_MODEL`/`GEMINI_EMOTION_MODEL`) | Routing/classification |
| Vision | `gemini-3.5-flash` (`GEMINI_VISION_MODEL`) | Camera |
| Image | `gemini-3.1-flash-image-preview` (`GEMINI_IMAGE_MODEL`) | — |
| Embeddings | `gemini-embedding-2` | — |

Fallback chain moves within Gemini tiers before falling to OpenAI. `GEMINI_LIVE_MODEL` configured but **production voice paths still need a real Gemini Live integration** per the doc.

### Cost monitoring — ❌ proposed, not built
`COST-MONITORING-GUIDE.md` specifies (as a plan): `PRICING_USD_PER_1M` constants table, `AiUsageEntry` logging schema, alerts (daily spike >2x 14-day avg, Gemini fallback drift >10-15%, per-user abuse), 3-phase rollout (capture → dashboards → plan-aware caps). **No dashboard or alerting infra confirmed live.**

### Cost optimization — 🟡 partially shipped
Playbook (P0-P2 prioritized): compact/cached chat context, light-tier routing, data-change gating for scheduled jobs, Gemini Live session caps, Flash-first camera routing, templated proactive messages, embedding dedupe. **Only the templated-messages item shipped**, as the **Response Optimization Layer** (message library + hybrid response, `RESPONSE_OPT_MODE=shadow→canary→on`, OFF by default) — see `server/src/services/response-optimization/README.md` and `GET /api/admin/response-optimization/metrics`. Target savings modeled: $3,200–$6,400/month at 1,000 users.

### Pricing strategy — draft/iterating
Subscription tiers (Free/Trial → Essential/Basic $9.99-30 → Plus/Pro $19.99-69 → Elite/Coach Pro $34.99-99.99), sized for 70-91% AI-COGS gross margin. Overage packs + credit-meter scheme (1 credit/chat turn, 1 credit/voice min, 2-8 credits/camera analysis). Figures differ slightly between `PRICING-STRATEGY.md` and `AI-COST-REPORT.md` — treat as still iterating, not final.

---

## 12. Previously-Unknown Planned/Confirmed Modules (`docs/superpowers/`)

| Item | Purpose | Status |
|---|---|---|
| **LLM Wiki Layer** (5-phase: 0-4) | Persistent, compounding wiki knowledge layer for the AI Coach — 6 DB tables, ingest/index/compiler/synthesis/lint services, LangGraph tools, Wiki Browser UI | ✅ Became the shipped Wiki module (per git log + prior CHANGELOG) — Phase 0-3 core confirmed; Phase 4 (lint/health-check + backfill seeding for existing users) status unconfirmed |
| **Agentic Journal Editor** (TipTap) | Replaces plain-textarea journal editor with rich-text editor (audio/drawing/video/file/callout blocks, slash menu, AI suggestions, dictation) in Observatory dark theme | ✅ Likely shipped as "journal quick-capture, page mentions, editor modal" (2026-06-30 commit) — verify TipTap adoption specifically |
| **Unified Goals Page** | Aggregates goals from 4 domain tables (health/life/career/finance) into one endpoint/page | ✅ Shipped — `goals-unified.controller.ts` confirmed in codebase |
| **Financial Report Auto-Charts** | `getFinancialReport` AI tool auto-generates 4-6 chart artifacts inline | 🟡 Unconfirmed — small scoped plan, check against finance chart code |
| **Universal AI Coach Charts** | Extends auto-chart pattern to nearly every domain tool (workout/nutrition/wellbeing/health/water/habits/goals/streak/progress) | 🟡 Unconfirmed — plan only |
| **Persistent AI Memory & Analytics Layer** | Post-processing insight-extraction mining each conversation turn into structured, persistent intelligence | 🟡 Possibly overlaps with shipped Intelligence Memory (2026-05-13) — verify overlap vs. gap |
| **AI Assistant Document Upload UX** | Premium purple animated upload/analyze modal for `/ai-coach`, wired to the flag-gated Document Intelligence backend | 🟡 Frontend-only plan; backend exists, flag OFF |
| **AI Assistant Purple Responsive** | Rethemes `/ai-coach` to Royal Purple, responsive to 320px | ✅ Likely shipped as "chat brand reskin" (2026-06-29 commit) |
| **Workout Module Redesign Blueprint** | UX audit + redesign spec (collapse 5 tabs→3, new components, semantic color system) — found fabricated sine-wave sparkline data, off-brand colors, no ARIA | ❌ **Proposal only, not built** |
| **Voice Call System — broader design** | 3 channels: `mobile_app` (shipped, WebRTC), `whatsapp` (voice commands via Business API), `widget` (iOS/Android home-screen widget) | 🟡 Only `mobile_app`/WebRTC shipped; WhatsApp-voice-command and home-screen-widget channels are **planned, not built** |
| **Enterprise Subscription Tier** | `admin_overrides` (suspend/comp_plan/extend_trial) + `enterprise_contracts` seats | 🟡 Schema exists, **overlay wiring pending** |

---

## 13. Platform Audit Recurring Themes (cross-audit synthesis)

From `2026-05-22-codebase-audit.md`, `2026-05-25-full-stack-quality-audit.md`, `2026-06-04-*-audit*.md`, `2026-06-05-ai-coach-analytics-audit.md`, `2026-06-16-ai-intelligence-architecture-audit.md`, `high-level-10-10-quality-roadmap.md`:

| Audit | Date | Score/Verdict |
|---|---|---|
| Codebase Audit | 2026-05-22 | "100% complete" (resolved same day) |
| Full-Stack Quality Audit | 2026-05-25 | Server 8.8/10, Client 8.1/10, **Overall 8.4/10** |
| Platform Audit (12-agent) | 2026-06-04 | Verdict: **IMPROVE** (not rebuild) |
| AI Coach Analytics Audit | 2026-06-05 | 44-agent audit, 19 fixes shipped |
| AI Intelligence Architecture Audit (7-agent) | 2026-06-16 | **5.0/10** (design ceiling ~8/10) |

**Recurring themes across audits:**
- **"Compute-but-discard" / last-mile integration gap** — the single most repeated finding: sophisticated engines (cross-pillar correlations, nutrition adaptation, LCM, emotional context) built and persisted but never wired into the live coaching conversation. *(This is the exact gap the Wave 0-2 SIA work in §10 above was built to close.)*
- **Safety-critical gating bugs** — crisis/safety logic repeatedly gated behind the wrong condition (WHOOP webhook fail-open, text-chat crisis detection voice-only, live-chat safety restrictions not reaching the coach).
- **Fabricated/fictional sophistication** — "semantic" memory that was substring ILIKE matching; deterministic-looking tables silently polluted with LLM content — a provenance/honesty gap between claimed and actual architecture. *(This is what the Provenance v2 work in §10 was built to fix.)*
- **Thin/uneven test coverage** — flagged in every quality audit even as CI gates turned green.
- **Claims of "done" that weren't** — the 2026-06-04 reconciliation doc caught earlier "fixed" claims that were never actually committed — a reminder to verify status against git log, not just doc claims (which is why this doc exists).

---

*AUDIT-FINDINGS-AND-GAPS.md | Balencia Platform | Consolidated from `docs/` engineering archive, 2026-07-08.*
