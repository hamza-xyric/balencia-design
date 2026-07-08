# Balencia — Product Vision

> **The whole-life AI coach.** One intelligence that sees your health, mind, money, career, and relationships as a single connected life — and coaches you across all of them.

- **Document:** Product Vision & Feature Compendium
- **Product:** Balencia (internal/legacy: *yHealth*)
- **AI Coach persona:** **SIA** (a.k.a. *Cia*)
- **Status:** Living document — reflects the shipped and in-flight product surface
- **Last updated:** 2026-07-06

---

## 1. The Vision

### 1.1 One sentence

Balencia is a whole-life operating system with an AI coach at its center — it ingests everything about your life (workouts, meals, sleep, mood, money, career, relationships), understands how those domains *affect each other*, and proactively coaches you toward the person you're trying to become.

### 1.2 The problem we exist to solve

Every "health app" today is a **silo**. A fitness app doesn't know your sleep debt caused your bad workout. A finance app doesn't know your money stress is wrecking your recovery. A meditation app doesn't know you skipped it because a work deadline blew up your evening. The user is left holding a dozen disconnected dashboards and doing the correlation math in their own head — which nobody does.

Real life is not siloed. **Money stress raises cortisol. Poor sleep tanks decision quality. A missed workout streak erodes the identity you're building.** The signal that matters most lives *between* the domains, and no product reads it.

### 1.3 The insight

The value isn't more tracking — it's **connection + accountability + honesty**:

1. **Connection** — a cross-pillar intelligence (the *Life Correlation Matrix*) that models how each domain drives the others, so the coach can say *"your sleep dropped the three nights after your spending spiked — let's look at the money stress."*
2. **Accountability** — a coach that remembers your commitments, notices when you drift, and follows up *before* you fail — not a passive chatbot that waits to be asked.
3. **Honesty** — the system **never fabricates a number**. If it doesn't have the data, it says so ("Confidence: not enough data yet") instead of inventing a score. Every surfaced metric is attributable to a real source or shown as an honest null.

### 1.4 What "done" looks like (the bar)

From the operating contract: move from *"works but generic"* to *"shipped, premium, proven."* Every surface should look like **a product people pay for** — a funded, premium experience, not a component-library template. The design language is **Claymorphism** (soft, tactile, "clay" surfaces) under the **Brand v2.1** system (Burnt-Orange / green / purple accents, Cabinet Grotesk + Switzer type — Sora deprecated as of v2.1).

---

## 2. Who It's For

| Persona | Core need | How Balencia serves it |
|---|---|---|
| **The overwhelmed optimizer** | Tracks 5 apps, connects nothing | One brain that unifies every domain and does the correlation for them |
| **The accountability-seeker** | Knows *what* to do, fails to *keep* doing it | A coach that remembers commitments and proactively follows up |
| **The quantified-self user** | Wants depth, distrusts fake insights | Provenance-attributed metrics, honest nulls, real wearable data |
| **The whole-life grower** | Health *and* money *and* career *and* relationships | Six life pillars under one roof with a shared identity model |
| **Emerging-market / mobile-first user** | Lives in chat, low friction | WhatsApp-native intelligence layer + voice-first coaching |

---

## 3. The SIA Coaching Brain (the heart of the product)

SIA ("Cia") is not a chatbot bolted onto a tracker. It is the **connective intelligence** the whole product is organized around. Design reference: `AI-Coach-System-Design.md` at repo root.

### 3.1 Persona

A single coach with four blended modes, tuned per moment:

- **Commander** — direct, decisive, pushes you when you need pushing
- **Friend** — warm, emotionally attuned, celebrates and consoles
- **Data nerd** — reads your numbers, spots the pattern, shows the evidence
- **Guardian** — protective, safety-first, catches crisis and scope-of-practice boundaries

The prompt ("Coaching Soul v3") is **emotion-first**: it separates *logistics* from *feelings*, runs an emotional-intelligence protocol, adapts across 9 conversational modes, and enforces crisis + scope safety (fail-closed on crisis detection).

### 3.2 What makes the brain different

| Capability | What it does |
|---|---|
| **Whole-life context** | Every turn is assembled from all six pillars, not just the one you're chatting about |
| **Life Correlation Matrix (LCM)** | A directed graph of how domains drive each other (e.g. *money → stress → sleep → workout quality*); the coach reasons over cross-pillar cause & effect |
| **Contradiction detection** | Flags when your data disagrees with your words ("you said you're sleeping fine, but recovery is down 20%") |
| **Answerability / confidence gate** | Before answering, checks whether it *actually has the data* to answer; refuses to fabricate, surfaces an honest confidence score |
| **Provenance & attribution** | Every value carries where it came from; an auto-fail honesty gate blocks fabricated numbers from ever reaching the user |
| **Accountability tiers** | Classifies your risk of dropping off and adjusts tone/proactivity accordingly |
| **Proactive follow-ups** | Notices missed commitments, at-risk streaks, and drifting goals — and reaches out first |
| **Baselines** | Learns *your* normal, so "high stress" means high *for you* |

### 3.3 How you talk to SIA

- **Text chat** (`/ai-coach`, `/chat`) — streaming, tool-using, with rich in-line **artifacts** (charts, plans, cards) persisted to the conversation
- **Voice assistant & live calls** (`/voice-assistant`, `/voice-call`) — real-time streaming voice coaching, vision coaching (camera), and call summaries
- **WhatsApp** — a full intelligence layer (Baileys-based) that mirrors chats, resolves identities, and lets SIA coach you in the channel you already live in
- **Proactive push / notifications** — scheduled, timezone-correct reminders and nudges via a full reminder taxonomy + notification outbox

### 3.4 Intelligence transparency

SIA shows its work. An **IntelligenceTimeline** surfaces live tool-status ("checking your sleep data… cross-referencing spending…"), and a **confidence engine** (4-axis deterministic scorer) tells you how sure it is — including when the honest answer is *"not sure, not enough data."*

---

## 4. The Six Life Pillars

Balencia organizes life into six connected domains. Each is a real, functional module — and each feeds the shared intelligence.

### 4.1 🏋️ Health & Fitness

- **Workouts** (`/workouts`, `/exercises`) — curated exercise library, workout plans, logging, rescheduling, workout-audit
- **Wearables** — **WHOOP** integration (OAuth, recovery, strain, sleep, HRV via webhooks + analytics), with honest handling when not connected
- **Yoga & movement** (`/yoga`), **activity tracking** (`/activity`, `/activity-status`)
- **Recovery & strain scoring** — real wearable-backed, never fabricated
- **Progress** (`/progress`) — body images, measurements, trends

### 4.2 🥗 Nutrition

- **Meal logging & analysis** (`/nutrition`) — adaptive meal analysis, meal modal with brand persona
- **Diet plans** — AI-generated, personalized
- **Water tracking**, **shopping lists**, **hydration reminders**
- **Retrieval tools** — SIA can read your actual meal history (date-correct, post-midnight-safe)

### 4.3 🧠 Wellbeing & Mind

The richest module (`/wellbeing`):

- **Emotional check-ins** — deterministic, evidence-backed scoring (no fabricated mood scores); crisis fail-closed
- **Journal** (`/wellbeing/journal`) — LLM-backed journal coach, image support, reflections
- **Double-tap reflection** — a reflection *is* a journal entry with structured detail
- **Mood, stress, energy** tracking — stress source priority (WHOOP → self-report → honest null)
- **Breathing** exercises (`/wellbeing/breathing`), **soundscape** (`/soundscape`)
- **Habits** (`/wellbeing/habits`), **vision board** (`/wellbeing/vision`)
- **Virtual Try-On — "AI Fashion Studio"** (`/wellbeing/virtual-tryon`) — upload → try-on studio, saved looks, wardrobe, favorites, and an **AI Style Coach** built on a real style profile (no fabricated scores)
- **Schedule** (`/wellbeing/schedule`) — unified with the life journey/plan activities
- **Insights** (`/wellbeing/insights`) — personalized wellbeing intelligence

### 4.4 💰 Finance

- **Money Map** (`/money-map`) — spending, budgets, financial goal tracking
- **Multi-currency** — every amount rendered in the user's currency (narrow symbol), AI prompts currency-aware; billing stays USD
- **Cross-pillar link** — spending → stress → recovery is a first-class correlation, not a dead metric
- **Goal tracking** with honest, real-source insights

### 4.5 💼 Career

A full career-growth OS (`/careers`):

- **Curriculum → execution engine** — turns career goals into structured, executable commitments
- **Live career coaching** — friendly level names, obstacle plans, recovery/restart flows, proactive missed-day flags
- **24 career-specific SIA tools**, premium gating, badges, proactive jobs, multi-tab workspace
- **Career resources** and Tier-4 CRUD actions

### 4.6 🤝 Social & Relationships

- **Feed** (`/feed`) — premium activity feed with humanized copy, filter tabs, day-timeline
- **Pods / Circles / Communities / Partners** (`/groups`) — consent-aware social matching, at-risk "rally" support
- **Chat & messaging** (`/chat`, `/messages`) — social modals, calls, view-once messages
- **Leaderboards** (`/leaderboard`) — weekly / monthly / all-time, real pillar scoring, XP
- **Competitions** (`/community`, admin competitions) — real 6-pillar component scores, anti-cheat, premium UI
- **Follow / connections**, **personal contacts**, **reconnection** nudges

---

## 5. Cross-Cutting Intelligence & Data

These systems sit *above* the pillars and are the reason the product is more than the sum of its trackers.

- **Life Correlation Matrix (MT1)** — the 10-node directed cross-pillar graph; the engine of "how your domains affect each other"
- **Overview / Life Score** (`/dashboard`, `/life-areas`) — a canonical life score and per-domain scores, with a purge of all dummy data (real-source-or-honest-null enforced across 24+ former fabrications)
- **Knowledge Graph** (`/knowledge-graph`) — a visual graph of the user's life entities, filters, and relationships
- **Analytics** — cross-pillar, timezone-correct, radar/heatmap visualizations, brand-colored, auto-refreshing
- **Life World** (`/life-areas`) — "who you're becoming": identity, timeline snapshots, trends
- **Document Intelligence** (`/wiki`) — upload → OCR → chunk → embed → RAG "ask your documents" with a citation validator; medical-document gating; document→wiki + chart generation; `@mention` documents in chat
- **Goals & Obstacles** (`/goals`, `/obstacles`) — goal tracking with obstacle plans and reconnection flows
- **Accountability Contracts** (`/contracts`) — commitment contracts the coach tracks and evaluates, with grace windows and proactive follow-up when you drift
- **Achievements** (`/achievements`) — dynamic, real-source achievement trees + XP; no phantom rewards
- **Onboarding** (`/onboarding`) — multi-domain unified assessment; all onboarding AI is free/unmetered; welcome integrations modal
- **Quick notes** (`/quick-notes`), **plans** (`/plans`), **reports**

---

## 6. Integrations

| Integration | Purpose |
|---|---|
| **WHOOP** | Recovery, strain, sleep, HRV (OAuth + webhooks + analytics) |
| **WhatsApp** (Baileys primary, Cloud API fallback) | Chat mirroring, identity resolution, in-channel AI coaching |
| **Google Calendar** | Schedule sync |
| **Spotify** | Soundscape / music context |
| **Stripe / PayPal** | Subscriptions & billing |
| **LLM providers** | Anthropic Claude, Google Gemini, OpenAI (via LangChain / LangGraph, provider-cascade with timeouts) |
| **Firebase** | Push notifications |
| **AWS S3 / Cloudflare** | Media & document storage |

---

## 7. Monetization

- **Freemium + premium tiers** (`/subscription`, `/upgrade`) with **feature entitlements** and **credit-based AI usage**
- **Onboarding is free** — no per-user AI caps during onboarding; the goal is activation, not metering
- **Premium gating** — advanced intelligence tools, career OS depth, competitions, and premium UI surfaces are entitlement-gated
- **Billing** (`/settings/billing`, credits) — Stripe/PayPal, promotions, overrides, usage analytics, abuse detection
- **Admin subscription suite** — customers, features, overrides, promotions, usage, abuse, analytics

---

## 8. Admin & Operations

A full admin console (`/admin`) covers: users & roles (RBAC), subscriptions & billing, competitions & analytics, community moderation, exercises catalog, blogs/CMS, help center, webinars, testimonials, contacts, newsletter, and WHOOP/integration admin. Content moderation, churn-risk, and experiment (A/B) infrastructure back the growth loop.

---

## 9. Design & Experience Principles

- **Claymorphism, consistently** — soft tinted surfaces, large radii, the signature dual-shadow + inner-highlight recipe, inset "pressed" states. Never mix flat + clay.
- **Brand v2.1** — Burnt-Orange primary with green/purple accents; Cabinet Grotesk (headings/UI) + Switzer (body) type; one design language across every page, not per-page randomness.
- **Premium by default** — designed states (loading skeletons, empty, error, success, disabled, hover, focus-visible), intentional hierarchy, generous whitespace.
- **Responsive & accessible** — fluid 360px → ultrawide; semantic HTML, keyboard nav, visible focus, AA+ contrast, `prefers-reduced-motion` respected.
- **Purposeful motion** — animate only `transform`/`opacity` on hot paths; 150–250ms UI feedback; 60fps or cut it; performance-tier aware (GPU layers throttled on weaker devices).
- **Perceived performance** — optimistic UI on safe actions, <100ms feedback, code-split by route, virtualized lists.

---

## 10. Architecture (how it's built)

| Layer | Choice |
|---|---|
| **Frontend** | Next.js 16 · React 19 · TypeScript (strict) · Tailwind v4 · Radix · Framer Motion · TanStack Query/Table · Redux Toolkit · ECharts/Recharts/Chart.js · Three.js/R3F · TipTap |
| **Backend** | Node.js (ESM) · Express 5 · TypeScript (strict) · layered `route → controller → service → repository` |
| **AI orchestration** | LangGraph / LangChain · Anthropic + Gemini + OpenAI · pgvector embeddings · TensorFlow (on-device face/pose) |
| **Database** | PostgreSQL (migrations as source of truth) · pgvector · Redis (cache/queues) |
| **Realtime** | Socket.IO (WebSocket) with Redis pub/sub cluster bridge · WebRTC for voice/video (STUN + env-driven TURN) |
| **Jobs** | BullMQ + node-cron (activity-gated background jobs, off-peak UTC anchors) |
| **Payments** | Stripe · PayPal |
| **Infra** | Railway (server + pgvector + client), S3-compatible object storage, web-push/Firebase |

### 10.1 Engineering principles (the operating contract)

- **Phase-gated delivery** — `PLAN → CONTRACT → BUILD → TEST → PROVE → INTEGRATE → CLOSE`; a slice isn't done until it's tested and proven green.
- **Prove it or it didn't happen** — every feature ships with unit + integration tests that run and pass.
- **Server-side everything** — pagination (keyset/cursor), filtering (whitelisted, parameterized), search (Postgres FTS/trigram), never "fetch-all-then-filter-on-client."
- **Honesty as an invariant** — real source or honest null; an auto-fail gate blocks fabricated values.
- **Scope discipline** — do exactly what's asked; no speculative features or drive-by refactors.
- **Agent orchestration** — features are built research-first by a roster of specialized sub-agents that hand off through a shared spec and cross-verify (Researcher → Architect → Backend/Frontend/DB → Test → Red-team → Integrator).

---

## 11. Feature Index (page map)

<details>
<summary><b>Core & AI</b></summary>

`/dashboard` · `/ai-coach` · `/chat` · `/chat-history` · `/voice-assistant` · `/voice-call` · `/knowledge-graph` · `/life-areas` · `/overview` · `/goals` · `/obstacles/[id]` · `/contracts` · `/plans` · `/quick-notes` · `/schedule`
</details>

<details>
<summary><b>Health, Fitness & Nutrition</b></summary>

`/workouts` · `/exercises` · `/exercises/[id]` · `/yoga` · `/activity` · `/activity-status` · `/progress` · `/nutrition` · `/whoop`
</details>

<details>
<summary><b>Wellbeing</b></summary>

`/wellbeing` · `/wellbeing/emotional-checkin` · `/wellbeing/journal` · `/wellbeing/mood` · `/wellbeing/stress` · `/wellbeing/energy` · `/wellbeing/breathing` · `/wellbeing/habits` · `/wellbeing/vision` · `/wellbeing/virtual-tryon` · `/wellbeing/insights` · `/wellbeing/schedule` · `/wellbeing/schedule/[date]` · `/soundscape`
</details>

<details>
<summary><b>Finance & Career</b></summary>

`/money-map` · `/careers`
</details>

<details>
<summary><b>Social & Community</b></summary>

`/feed` · `/groups` · `/community` · `/messages` · `/chat` · `/leaderboard` · `/achievements` · `/profile` · `/profile/[id]` · `/notifications`
</details>

<details>
<summary><b>Documents & Knowledge</b></summary>

`/wiki` · `/knowledge-graph` · `/blogs` · `/webinars` · `/help`
</details>

<details>
<summary><b>Account, Billing & Onboarding</b></summary>

`/onboarding` · `/settings` · `/settings/billing` · `/settings/billing/credits` · `/subscription` · `/subscription/success` · `/upgrade` · `/preferences` · `/profile/edit`
</details>

<details>
<summary><b>Admin</b></summary>

`/admin` · users · roles (RBAC) · subscriptions (customers, features, overrides, promotions, usage, abuse, analytics) · competitions · community · exercises · blogs · help · webinars · testimonials · contacts · newsletter · analytics · WHOOP
</details>

---

## 12. Guiding North Star

> **Balencia wins when a user stops opening five apps** — because the one coach that sees their whole life is more useful than any single-domain tool, and honest enough to trust with all of it.

Every feature is judged against three questions:
1. **Does it connect?** — Does it feed or use the cross-pillar intelligence, or is it another silo?
2. **Is it honest?** — Real source or honest null; no fabricated numbers, ever.
3. **Is it premium?** — Does it look and feel like a funded product people pay for?

If a feature fails all three, it doesn't ship.
