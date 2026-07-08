# Balencia Platform - Epic 13: Social Growth OS

## EPIC OVERVIEW

### Epic Statement
Social Growth OS is the layer that turns Balencia/Balencia from a solitary AI coach into a **self-running social ecosystem** — accountability pods that form and graduate on their own, a reputation economy that rewards consistency over vanity metrics, a feed that actually has something to say, and a matching/trust substrate that keeps all of it safe, consensual, and gaming-resistant. It answers the question competitors with pure 1:1 coaching cannot: *"Who else is in this with me, and can I trust them?"*

### Epic Goal
Close the "compute-but-discard" gap that defined this system before this Epic: replace a backend that silently computed compatibility scores, formed pods, and tallied reputation into tables nobody read, with a fully-wired product surface — client pages, consent gates, learning loops, and safety rails — so that every social primitive the platform already had the intelligence to build is now something a real user can see, join, trust, and benefit from.

### Core Philosophy
**"Orchestrate, Don't Rebuild" (from `SOCIAL-GROWTH-SYSTEM-DESIGN.md`, 2026-06-05):**
1. **No new gamification system** — XP, streaks, competitions, and follow/chat already existed and worked. The gap was never algorithms; it was *wiring*.
2. **Consent is sovereign** — every social/accountability surface routes through an explicit opt-in gate. Silence is never treated as consent.
3. **Learning loops close, not dead-end** — every score, weight, or classifier that ships must have a path from *outcome* back into *the next decision* (accept-rate → matching weight; pod health → remediation; report → admin queue).
4. **AI proposes, deterministic code disposes** — every LLM-touched surface in this Epic (matching copy, anchor guidance, community-agent planning, trust/churn scoring) has a byte-identical deterministic fallback and cannot, by construction, take an irreversible action (block a user, delete data, broadcast free text) without a human in the loop.

### Strategic Importance
> "Balancia does not need a new gamification system. It needs an orchestration layer that turns its already-excellent social/gamification primitives into a self-running AI social-growth ecosystem." — `SOCIAL-GROWTH-SYSTEM-DESIGN.md`

Every other Epic in this platform (Fitness, Nutrition, Wellbeing, Cross-Domain Intelligence) is built around a single user and their AI coach. Social Growth OS is what makes the *product* social without turning it into a generic social network bolted onto a health app: pods form around shared goals and real compatibility signals, reputation is earned through consistency and pledge-keeping (not likes), and every matching/ranking surface is opt-in, trust-gated, and anti-cheat-hardened by default. This is the layer that produces retention through belonging, not through dopamine loops — and it is explicitly engineered so that none of its AI-driven pieces can act on a user without either their consent or a human admin's review.

### Origin: The Audit That Built This Epic
This Epic exists because of a single document: **`docs/2026-06-10-social-intelligence-audit.md`** (1,650 lines, ~188KB), a pre-implementation adversarial audit of the social/community system as it stood on 2026-06-10. Its verdict, quoted verbatim:

> *"The social system is a near-complete backend with almost no user-facing surface and no learning loop. The services compute compatibility scores, form pods, snapshot group health, detect emerging mentors, and tally reputation — then deposit the results in tables that no client page reads and no tuning job consumes. The dominant failure mode is not bugs; it is **decoupling**: services that run correctly in isolation with no orchestration connecting them, no UI exposing them, and no feedback closing the loop."*

The audit itself was adversarially self-verified — 8 of its own severity-critical claims were put through a refutation pass, and 1 (notification-spam) was fully retracted, 4 were downgraded from "total absence" to "partial" (e.g., join-codes *do* expire; chat uploads *do* have a size cap). This rigor is why the audit's remaining findings — roughly **40 distinct issues** across matching quality, group formation, accountability, and privacy/security/anti-abuse — carried weight as a build backlog rather than speculation.

Every one of those findings was subsequently shipped, verified, or explicitly dispositioned in **`docs/2026-06-12-social-intelligence-implementation-status.md`**, whose closing line is the honesty bar this Epic is held to:

> *"The entire social-intelligence audit is implemented, tested, and verified. What remains is purely operational (commit · deploy · flip the 9 flags as data warrants) — no remaining build work."*

That work shipped across **9 migrations**, **3 new background jobs**, **2 trained ML models** (churn, trust — both admin-review-only, never auto-acting), **1 schema-bounded autonomous LLM orchestrator**, and 5 new client route surfaces (`/groups`, `/feed`, `/reputation`, admin moderation/trust/churn panels) — verified at **309/309 server test suites (5,390+ tests)** and **46/46 client suites (668 tests)**, both green, with zero typecheck/lint errors. See Appendix A for the full finding-by-finding disposition ledger.

### Social Growth OS Scope (8 Features)

| Feature | Description | MVP Status |
|---------|-------------|------------|
| **F13.1** | Groups & Pods (Accountability Pods → Circles → Communities) | Core — Shipped |
| **F13.2** | Reputation System | Core — Shipped |
| **F13.3** | Social Feed | Core — Shipped; 2 scale optimizations flag-gated |
| **F13.4** | Rewards & Gamification Bridge | Core — Shipped |
| **F13.5** | Mentors & Community Tiers | Core — Shipped |
| **F13.6** | Matching & Anti-Cheat | Core — Shipped; 2 advanced layers flag-gated |
| **F13.7** | Trust & Safety | Core — Shipped; 3 ML layers flag-gated |
| **F13.8** | Autonomous Community Orchestrator | Shipped; fully flag-gated (2 flags) |

---

## F13.1: GROUPS & PODS (ACCOUNTABILITY PODS → CIRCLES → COMMUNITIES)

### Description
A three-tier group hierarchy — **Accountability Pod** (3-8 members) → **Growth Circle** (10-20 members) → **Challenge/Interest Community** (50-500+ members) — implemented on a single unified `growth_groups` table distinguished by a `tier` column and a `parent_group_id` promotion chain. Pods are auto-formed weekly by a clustering job over consent-gated, compatibility-scored candidates; membership itself always lives at the pod level, and circles/communities are a health-based roll-up, not a separate membership model. This directly remediates the audit's highest-severity client-surface finding: pods were forming silently with **zero UI to see, accept, or leave one**.

### User Story
As a **Holistic Health Seeker** (P1), I want to be automatically grouped with 3-7 people who share my goals and schedule so that I have real accountability partners without having to recruit and vet them myself — and I want full visibility and control to leave if the group isn't working for me.

### Flexibility Modes

| Mode | Experience |
|------|------------|
| **Light** | See "My Pods" tab only, join/leave with one tap, minimal health signal (a color dot), no member-level detail beyond names and avatars. |
| **Deep** | Full tier-progression view (Pods → Circles → Communities as they graduate), pod health breakdown (participation, accountability effectiveness, retention, challenge success), member roster with roles (anchor/member/mentor), pod chat and pod-scoped challenges. |

### Technical Foundation

**Data model** (`server/src/database/migrations/20260605120000_social_growth_os.sql`, promotion link in `20260612000000_growth_group_parent_link.sql`):

```sql
growth_groups (
  id UUID PK, tier VARCHAR(20) CHECK (tier IN ('pod','circle','community')),
  goal_domain, name, chat_id, competition_id,
  health_score, status VARCHAR(20) CHECK (status IN ('forming','active','at_risk','archived')),
  formation_run_id, parent_group_id UUID REFERENCES growth_groups(id) ON DELETE SET NULL,
  created_at, updated_at
)
growth_group_members (
  group_id, user_id, role VARCHAR(20) CHECK (role IN ('anchor','member','mentor')) DEFAULT 'member',
  compatibility_score, joined_at, left_at, PRIMARY KEY (group_id, user_id)
)
group_formation_runs (id, goal_domain, tier, candidates, groups_formed, avg_cohesion, params, created_at)
group_health_snapshots (group_id, date, participation, accountability_effectiveness, retention_30d, challenge_success, health_score, PRIMARY KEY (group_id, date))
```

**Consent-gated candidate pool:** every formation query requires an explicit `buddy_discovery_consent.allow_suggestions = true` row (strict opt-in — see F13.6) and excludes blocked/trust-flagged users (`user_trust_signals.status != 'blocked'`, see F13.7).

**Explicit join/accept/leave surface** (the direct fix for the audit's "pods form silently, no accept gate" finding): `POST /api/groups/:id/join` (idempotent, tier-capacity enforced) and `POST /api/groups/:id/leave`, both calling `groupFormationService.joinGroup()` / `leaveGroup()`, which sync `chat_participants` on both directions.

**Server routes** (`server/src/routes/groups.routes.ts`, mounted at `/api/groups`, all behind `authenticate`):
```
GET  /api/groups/mine
GET  /api/groups/circles
GET  /api/groups/circles/:id
GET  /api/groups/communities
GET  /api/groups/communities/:id
GET  /api/groups/:id
GET  /api/groups/:id/members
GET  /api/groups/:id/health
POST /api/groups/:id/join
POST /api/groups/:id/leave
```
Write endpoints: `writeLimiter` (20 req/min/user). Read endpoints: `readLimiter` (60 req/min/user). Params validated via `groupIdParamSchema = z.object({ id: z.string().uuid() })`.

**Client surface:** `/groups` (`GroupsPageContent.tsx`) — 4 tabs (`pods | circles | communities | partners`) via a shared `SegmentedTabs` primitive; Circles/Communities tabs render conditionally only once the user actually belongs to one (tier progression is earned, not always visible). `PodsEmptyState.tsx` is **consent-aware**: if the user has already opted in, it shows "You're in the matching queue" (no re-nagging); if not, it shows an inline "Enable buddy discovery" CTA that flips consent directly, no bounce to Settings. `PodModals.tsx` provides `LeavePodDialog` (Radix-based leave-confirmation modal) and `PodDetailModal` (health breakdown + roster + "Open chat" / "Pod challenge" / "Leave").

**Promotion (pod → circle → community):** `community-intelligence.service.ts` — `promotePodsToCircles()` / `promoteCirclesToCommunities()` — run inside the daily `group-health.job.ts`, gated by health/tenure thresholds (`POD_TO_CIRCLE`, `CIRCLE_TO_COMMUNITY` config), writing `parent_group_id` rather than migrating membership rows.

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Pod formation → active rate | 80% of formed pods reach `active` status within 7 days | `growth_groups.status` transition tracking |
| Pod 30-day survival | 65% of active pods still active at day 30 | `group_health_snapshots.retention_30d` |
| Voluntary leave rate | <15% of members leave within first 14 days | `growth_group_members.left_at` cohort analysis |
| Pod → Circle graduation rate | 20% of healthy pods graduate to circle tier within 90 days | Promotion job output |
| Consent opt-in rate | 40% of active users enable buddy discovery within 30 days of prompt | `buddy_discovery_consent` conversion tracking |

### Acceptance Criteria
- [ ] Weekly formation job clusters only consent-opted-in, non-blocked candidates into pods (3-8 members)
- [ ] Newly formed pod starts in `forming` status; provisioning creates pod chat and flips to `active`
- [ ] Members receive an opt-in invite notification on pod provisioning — no silent auto-drop into an unseen group
- [ ] `/groups` page renders My Pods, Circles, Communities (conditional), and Partners tabs
- [ ] `PodsEmptyState` reflects live consent state (no CTA shown if already opted in)
- [ ] `POST /groups/:id/join` enforces tier capacity and is idempotent
- [ ] `POST /groups/:id/leave` shows a confirmation dialog before executing and syncs chat membership
- [ ] Pod detail view shows health breakdown (participation, accountability effectiveness, retention, challenge success) and member roster with roles
- [ ] Circles and Communities tabs appear only once the user has at least one group at that tier
- [ ] Anchor/mentor roles are visibly distinguished in the member roster
- [ ] All list endpoints paginated and rate-limited (20/min writes, 60/min reads)

### Error Handling Scenarios

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|--------------------|
| **User not opted in to matching** | `buddy_discovery_consent.allow_suggestions` missing/false | Show empty state with inline opt-in CTA, no auto-enrollment | "You're not in the matching pool yet. Enable buddy discovery to get matched with a pod." |
| **Pod at capacity on join** | `growth_group_members` count ≥ tier max | Reject join with 409, suggest alternate pod/circle | "This pod is full. We'll suggest another group that fits your goals." |
| **Pod collapses (all but one member leave)** | Health job detects `participation` below floor | Auto-archive pod (`status = 'archived'`), notify remaining member | "Your pod wound down due to low activity. We'll match you into a new one soon." |
| **Insufficient candidates for formation** | Formation job finds <3 opted-in matches for a goal domain | Skip formation for that domain this run, requeue next week | Silent — no user-facing message until a pod actually forms |
| **User leaves a pod they anchor** | `role = 'anchor'` leaves | Reassign anchor to next-longest-tenured member | Silent reassignment, notify new anchor |

### Group Formation Algorithm (High-Level)

```
Weekly Pod Formation Process:

1. Candidate Pool:
   - Query users with buddy_discovery_consent.allow_suggestions = true
   - Exclude users with user_trust_signals.status = 'blocked'
   - Exclude users already in an active pod for this goal_domain
   - Retrieve via default LIMIT pool OR embedding KNN shortlist (F13.6, flag-gated)

2. Compatibility Scoring (per candidate pair):
   - Goal alignment, activity-level similarity, streak-state similarity,
     timezone-band, freshness — weighted per matching-weights.service.ts

3. Clustering:
   - Seed anchors from highest-compatibility, least-recently-anchored users
     (rotation applied to avoid deterministic re-election of the same anchors)
   - Greedily assign remaining candidates to the anchor cluster with
     highest average pairwise compatibility, capped at tier max (8 for pods)

4. Formation Run Record:
   - Log candidates, groups_formed, avg_cohesion, params to group_formation_runs
     (feeds the matching-weight learning loop, F13.6)

5. Provisioning:
   - Insert growth_group_members rows (status: forming)
   - Create pod chat, sync chat_participants
   - Flip growth_groups.status → 'active'
   - Send opt-in invite notification to each member

6. Ongoing Health (daily, group-health.job.ts):
   - Snapshot participation / accountability_effectiveness / retention_30d / challenge_success
   - Flag at_risk pods below health floor
   - Promote healthy, tenured pods to circle tier (parent_group_id link)
   - Archive collapsed pods
```

### Cross-Pillar Connections
**To Reputation (F13.2):** Anchor/mentor role in a pod is one of the weighted signals (`mentorship × 10`) in reputation score computation.
**To Social Feed (F13.3):** Pod join emits a `join_pod` feed event; tier promotion emits a `tier_promotion` feed event.
**To Rewards (F13.4):** Pod formation and challenge participation are XP-eligible trigger events.
**To Matching (F13.6):** Formation candidate pool and compatibility scoring are shared infrastructure with buddy matching.
**To Accountability (E21):** Pods are one of the delivery surfaces for accountability nudges and shared-challenge encouragement.

### Dependencies
- **F13.6 (Matching & Anti-Cheat):** Consent gate, compatibility scoring, trust exclusion
- **F13.2 (Reputation System):** Mentor-role eligibility and status tiers
- **F13.3 (Social Feed):** `join_pod` / `tier_promotion` event emission
- **F13.7 (Trust & Safety):** Trust-signal exclusion from candidate pool
- **F13.8 (Autonomous Community Orchestrator):** Health-driven remediation/archival/promotion of pods

### MVP Status
[X] Core — Shipped, always-on (no flag)

---

## F13.2: REPUTATION SYSTEM

### Description
A single per-user reputation score (0–999.99, clamped) computed from five weighted, real behavioral signals — consistency, week-over-week improvement, pledge adherence, active mentorship, and kudos — surfaced on its own premium `/reputation` page with pure-SVG clay-styled charts (radial gauge, composition radar, 30-day trajectory), a public leaderboard, and mentor discovery. This replaces what the audit found: a fully-computed score sitting in a table with no page, no chart, and no history to show trend.

### User Story
As an **Optimization Enthusiast** (P3), I want a transparent, hard-to-game reputation score that reflects real consistency and follow-through — not likes or vanity metrics — so that I can see my standing, understand exactly what's driving it, and trust that others' scores mean something too.

### Flexibility Modes

| Mode | Experience |
|------|------------|
| **Light** | Single gauge with status title ("Champion") and one-line "what's helping / what's hurting." |
| **Deep** | Full breakdown: composition radar across all 5 signals, 30-day trajectory chart, leaderboard tab, "How is this calculated?" transparency modal, mentor discovery tab. |

### Technical Foundation

**Score model** (`server/src/services/reputation.service.ts`):
```
SCORE_WEIGHTS = { consistency: 2, improvement: 1, pledgeAdherence: 20, mentorship: 10, kudosReceived: 0.5, kudosGiven: 0.25 }
MAX_ACCOUNTABILITY_SCORE = 999.99  (clamp)

Signals:
  consistency      = active days in last 30 (from daily_user_scores)
  improvement      = week-over-week total_score delta, floored at 0
  pledgeRatio       = completion ratio from daily_pledges over 30 days
  mentorRoles       = count of growth_group_members rows (role='mentor', left_at IS NULL)
  kudosReceived/Given = from user_reputation (fed by activity_feed_reactions)

STATUS_TIERS: Novice(0) → Rising(40) → Committed(120) → Champion(250) → Legend(400)
eliteTier = min(5, floor(score / 200))
```

**Dual-DDL tables** — both `growth_groups`-family `user_reputation` and the standalone `reputation_score_history` table follow the platform's "dual-DDL" pattern: the migration file (`20260605120000_social_growth_os.sql` for the base table, `20260707000000_reputation_score_history.sql` for history) is the version-tracked source of truth, and `reputation.service.ts`'s `ensureTable()` / `ensureHistoryTable()` self-heal the *byte-identical* DDL at runtime.
```sql
reputation_score_history (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  date DATE DEFAULT CURRENT_DATE,
  accountability_score NUMERIC(6,2) DEFAULT 0,
  status_title VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, date)
)
```
Recomputed and appended to daily by `server/src/jobs/reputation-recompute.job.ts`.

**Server endpoints** (`server/src/routes/reward.routes.ts`, handlers in `reward.controller.ts`, all `authenticate` + `readLimiter`):
```
GET /api/reputation/me
GET /api/reputation/me/breakdown
GET /api/reputation/me/history
GET /api/reputation/me/rank
GET /api/reputation/leaderboard
GET /api/reputation/mentors
```

**Client surface:** `/reputation` (`ReputationPageContent.tsx`) — tabs `overview | leaderboard | mentors` via the shared `SegmentedTabs` primitive (same component used by `/groups`). Pure-SVG chart components (no charting library dependency): `ReputationGauge.tsx` (radial gauge — "the '3D' depth comes from layered radial gradients + a soft drop-shadow, the clay recipe"), `CompositionRadar.tsx` (5-axis radar), `ReputationTrajectory.tsx` (30-day area chart). `HowScoreWorksModal.tsx` provides the transparency breakdown; `ShareReputationButton.tsx` for social sharing.

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Page engagement | 50% of pod members visit `/reputation` within 14 days of joining a pod | Page-view analytics |
| Score comprehension | 75% correctly identify their top contributing signal after viewing breakdown | Post-view survey |
| Tier progression | 30% of active users advance at least one status tier within 60 days | `status_title` transition tracking |
| Trust in score | 70% rate the score as "reflects real effort, not gaming" | Quarterly survey |

### Acceptance Criteria
- [ ] Score computed from 5 real signals, clamped to 999.99, recomputed daily
- [ ] `reputation_score_history` appends one row/user/day, powering the 30-day trajectory chart
- [ ] Status tier and elite tier both derived deterministically from score, never hand-set
- [ ] Overview tab renders gauge + radar + trajectory using pure SVG (no chart-library dependency)
- [ ] Leaderboard tab excludes trust-blocked and anomaly-flagged users (shared exclusion logic with F13.6)
- [ ] Mentor tab surfaces eligible/active mentors filtered by shared pillar and trust status
- [ ] "How is this calculated?" modal shows the exact weighted contribution of each signal
- [ ] Score never displayed without at least a partial breakdown available

### Error Handling Scenarios

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|--------------------|---------------------|
| **New user, no history yet** | `reputation_score_history` empty for user | Show current score only, trajectory chart shows "Building history" state | "Your trend chart will fill in as you build a track record." |
| **All signals at zero** | `unclampedScore = 0` | Show Novice tier with encouragement copy, not an empty/error state | "Everyone starts here. Complete a pledge or join a pod to start earning reputation." |
| **Recompute job failure** | `reputation-recompute.job.ts` throws for a batch | Log, skip user for that day, retry next cycle — stale score shown, not blank | Silent — score simply doesn't update that day |
| **Mentor tab empty (no eligible mentors)** | `getMentors()` returns zero rows | Show empty state explaining eligibility bar | "No mentors available in your pillar yet — check back as the community grows." |

### Score Composition Algorithm (High-Level)

```
Daily Reputation Recompute (per user):

1. Gather Raw Signals (30-day window):
   consistency      = COUNT(DISTINCT date) FROM daily_user_scores WHERE active
   improvement      = MAX(0, this_week.total_score - last_week.total_score)
   pledgeRatio       = completed_pledges / total_pledges FROM daily_pledges
   mentorRoles       = COUNT(*) FROM growth_group_members WHERE role='mentor' AND left_at IS NULL
   kudosReceived/Given = FROM user_reputation (fed by feed reactions)

2. Weighted Sum:
   unclampedScore = consistency*2 + improvement*1 + pledgeRatio*20
                   + mentorRoles*10 + kudosReceived*0.5 + kudosGiven*0.25

3. Clamp & Classify:
   score = MIN(unclampedScore, 999.99)
   statusTitle = tier lookup (Novice/Rising/Committed/Champion/Legend)
   eliteTier   = MIN(5, FLOOR(score / 200))
   mentorStatus = mentorRoles > 0 ? 'active'
                : (score >= 250 AND consistency >= 20) ? 'eligible'
                : 'none'

4. Persist:
   UPSERT user_reputation (score, statusTitle, eliteTier, mentorStatus, ...)
   INSERT reputation_score_history (user_id, date, accountability_score, status_title)

5. Downstream Effects:
   - mentorStatus = 'eligible' feeds identifyEmergingMentors() (F13.5)
   - score feeds leaderboard ranking (with anti-cheat exclusion, F13.6)
```

### Cross-Pillar Connections
**To Groups & Pods (F13.1):** Mentor role in a pod is a weighted input; reputation-eligible mentors are promoted into pods via the community intelligence job.
**To Social Feed (F13.3):** Kudos given/received on feed items directly feed `user_reputation.kudos_*`.
**To Mentors (F13.5):** Reputation status tier ≥ Champion + consistency ≥ 20 is the mentor-eligibility gate.
**To Matching & Anti-Cheat (F13.6):** Leaderboard queries share the same trust/anomaly exclusion predicate used across all ranking surfaces.
**To Rewards (F13.4):** Pledge completion (which drives `pledgeRatio`) is itself an XP + variable-reward trigger.

### Dependencies
- **E5, E6, E7 (Three Pillars):** `daily_user_scores` as the consistency/improvement input
- **F13.1 (Groups & Pods):** Mentor-role signal source
- **F13.3 (Social Feed):** Kudos signal source
- **F13.4 (Rewards):** Pledge adherence signal source

### MVP Status
[X] Core — Shipped, always-on (no flag)

---

## F13.3: SOCIAL FEED

### Description
A real activity feed — `/feed` — with a server-side "humanizer" that turns raw structured events into natural-language copy, six live event writers wired to real user actions, and two flag-gated scale optimizations (fan-out-on-write, hot-page cache). This directly fixes the audit's finding that the feed had only 2 of ~6 declared event types ever actually written, and no client page existed to read it at all.

### User Story
As a **Busy Professional** (P2), I want to see a lightweight, tasteful stream of my pod's and friends' real wins — a streak milestone, a competition win, a pod join — so that I feel part of something without being pulled into a noisy, addictive social feed.

### Flexibility Modes

| Mode | Experience |
|------|------------|
| **Light** | Compact list, own + pod events only, no reactions UI shown by default. |
| **Deep** | Full cinematic timeline with filter tabs by category, day-grouped infinite scroll, kudos/reactions, live-update pill (flag-gated realtime). |

### Technical Foundation

**Writers → table:** `social-feed.service.ts` (`socialFeedService.publish()`) writes to `activity_feed` (companion `activity_feed_reactions` for kudos). Six live callers, each firing on a real user action:

| Event Type | Caller | Trigger |
|---|---|---|
| `achievement` | `jobs/achievement-check.job.ts` | Achievement unlocked |
| `pledge` | `services/reward-economy.service.ts` (`completePledge`) | Daily pledge completed |
| `streak_tier` | `services/streak.service.ts` | Streak reaches a new tier |
| `competition_win` | `jobs/competition-auto-create.job.ts` | Competition concludes with a winner |
| `join_pod` | `services/group-formation.service.ts` | User joins a pod |
| `tier_promotion` | `services/community-intelligence.service.ts` | Pod graduates to circle/community |

**Humanizer** (client, `client/app/(pages)/feed/lib/feed-content.ts`): a Zod-validated boundary (`FeedItemSchema`, dropping malformed rows rather than throwing) feeding an `EVENT_META` map keyed by `FeedEventType`, each entry carrying `headline`, a payload-aware `detail()` extractor, and a `describe()` sentence builder. Unknown event types degrade to an honest `fallbackMeta()` rather than a raw enum leak or a crash.

**Fan-out-on-write** (flag `ENABLE_FEED_FANOUT`, default off): on `publish()`, resolves entitled recipients by visibility (friends via `user_follows`, pod via `growth_group_members`) and pushes the new feed id onto each recipient's Redis list `feed:fanout:<userId>` (capped 200 items, 30-day TTL, via `redisCacheService.listPushTrim`). Read path falls back to the normal keyset query automatically if the Redis list is empty.

**Hot-page cache** (flag `ENABLE_FEED_CACHE`, default off): caches only the first canonical feed page (no cursor/filter) under `feed:p1:<userId>`, 45-second TTL; invalidated immediately on a fresh kudos reaction so counts never go visibly stale.

**Client surface:** `/feed` (`FeedExperience.tsx`) — "cinematic live-stat hero, dynamic filter tabs, keyset-paginated day-grouped timeline with seamless infinite scroll," backed by `useFeed.ts`.

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Feed events per active user/week | ≥1 real event surfaced per pod member/week | `activity_feed` write-rate by event type |
| Kudos engagement | 25% of feed viewers react to at least one item | `activity_feed_reactions` / page views |
| Page-1 cache hit rate (once `ENABLE_FEED_CACHE` on) | ≥70% at rollout scale | Redis hit/miss counters |
| Fan-out write amplification (once `ENABLE_FEED_FANOUT` on) | <5 recipient writes/publish at pod scale (3-8 members) | `fanOut()` call instrumentation |

### Acceptance Criteria
- [ ] All six declared event types have a live writer wired to a real trigger (no dead `FeedEventType`s among the wired set)
- [ ] Humanizer never displays raw enum values or crashes on an unrecognized event type
- [ ] Feed payload validated via Zod at the client boundary before humanizing; malformed rows silently dropped, not rendered broken
- [ ] Kudos reaction is idempotent per user/feed-item and invalidates the hot-page cache when `ENABLE_FEED_CACHE` is on
- [ ] Fan-out write is best-effort and non-blocking — a Redis failure never blocks `publish()`
- [ ] Read path (`getFeedFanout`) gracefully falls back to keyset query if the fan-out list is empty, regardless of flag state
- [ ] Visibility respected end-to-end: friends-only and pod-only events never leak to unrelated users
- [ ] Feed page paginated via keyset (never offset), day-grouped, infinite-scroll

### Error Handling Scenarios

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|--------------------|---------------------|
| **Unknown/future event type reaches client** | `EVENT_META` lookup miss | Render `fallbackMeta()` generic card | Neutral, non-technical copy — no raw enum shown |
| **Redis unavailable (fan-out/cache flags on)** | Connection error on `listPushTrim`/`get` | Skip cache/fan-out silently, fall through to DB query | No user-visible impact, feed still loads |
| **Malformed feed row from DB** | `FeedItemSchema.safeParse` fails | Drop the row, log, continue rendering the rest | Feed simply has one fewer item, no error banner |
| **Kudos double-tap (race)** | Unique constraint on `activity_feed_reactions` | Second insert no-ops, returns existing state | Reaction count stays correct, no error shown |

### Feed Publish & Fan-Out Process (High-Level)

```
On Real User Action (e.g., pledge completed):

1. Triggering service calls socialFeedService.publish(actorUserId, {
     eventType, visibility, payload
   })

2. Write:
   INSERT INTO activity_feed (actor_id, event_type, visibility, payload, created_at)

3. If ENABLE_FEED_FANOUT:
   recipients = resolveRecipients(actorUserId, visibility)  // friends / pod members
   FOR EACH recipient:
     redisCacheService.listPushTrim('feed:fanout:' + recipient, feedId, 200, 30d)
   (best-effort, failure does not block publish)

4. If ENABLE_FEED_CACHE:
   DELETE 'feed:p1:' + actorUserId  // own page-1 cache invalidated on new activity

5. Read (GET /feed):
   IF ENABLE_FEED_CACHE AND canonical first page requested:
     TRY Redis 'feed:p1:<userId>' (45s TTL) → return if hit
   IF ENABLE_FEED_FANOUT:
     TRY Redis 'feed:fanout:<userId>' list → merge with own/public events
     IF empty → fall back to keyset DB query
   ELSE:
     keyset DB query (getFeedRows), day-grouped

6. Client humanizes each row via feed-content.ts EVENT_META map
   before rendering — server never ships pre-rendered prose
```

### Cross-Pillar Connections
**To Groups & Pods (F13.1):** `join_pod` and `tier_promotion` events.
**To Reputation (F13.2):** Kudos reactions feed `user_reputation.kudos_*`.
**To Rewards (F13.4):** `pledge`, `achievement`, `streak_tier` events are downstream of XP/reward triggers.
**To Trust & Safety (F13.7):** Message sanitization pattern (`sanitizeUserText`) is shared infrastructure; feed content is itself a `content_reports` reportable type.

### Dependencies
- **F13.1, F13.2, F13.4 (Groups, Reputation, Rewards):** Event sources
- **Redis infrastructure:** Required for both flag-gated optimizations (graceful no-op if absent)
- **F13.7 (Trust & Safety):** Report/moderation surface for feed content

### MVP Status
[X] Core (writers + humanizer) — Shipped, always-on
[ ] Hot-page cache — Shipped, flag-gated: `ENABLE_FEED_CACHE` (default off)
[ ] Fan-out-on-write — Shipped, flag-gated: `ENABLE_FEED_FANOUT` (default off)

---

## F13.4: REWARDS & GAMIFICATION BRIDGE

### Description
The connective tissue between social actions and the platform's existing XP/variable-reward economy: pledge completion, pod joins, referrals, streak milestones, and achievement unlocks all flow through a canonical XP ledger and a probabilistic variable-reward roll, and are broadcast to the social feed in the same step. This resurrects two tables the audit found sitting dead (`variable_rewards`, `daily_pledges`) into live mechanics with their first real triggers.

### User Story
As a **Busy Professional** (P2), I want completing a daily pledge or joining a pod to visibly and immediately reward me — XP, an occasional bonus drop, and a small moment of social recognition — so that consistency feels good in the moment, not just in a monthly report.

### Flexibility Modes

| Mode | Experience |
|------|------------|
| **Light** | Simple XP toast on trigger; no drop-rate visibility. |
| **Deep** | Full `/rewards/drops` history, referral tracking, pledge streak view, transparent trigger-to-reward mapping. |

### Technical Foundation

**Canonical XP ledger:** `gamification.service.ts` → `awardXP()` — every social-triggered reward funnels through this single path, writing to `user_xp_transactions` (`server/src/database/tables/24-xp-transactions.sql`).

**Variable-reward engine:** `reward-economy.service.ts` (`RewardEconomyService`, "Wave 3 of the Social Growth OS — resurrects the dead `variable_rewards` and `daily_pledges` tables into working mechanics"). Weighted drop pool: `bonus_xp` 50%/25% split, `streak_freeze` 15%, `badge` 10%, at `DROP_PROBABILITY = 0.15`. (A second, earlier implementation, `variable-reward.service.ts`, defines a fixed-tier table — rare_title 1%, streak_freeze 2%, badge 7%, xp_bonus 20%, xp_standard 70% — both persist to `variable_rewards`.)

**Social trigger points (verified live callers):**

| Trigger | Service | XP | Social/Reward Effect |
|---|---|---|---|
| Pledge completed | `reward-economy.service.ts:completePledge()` | +10 XP (`bonus`) | Publishes `pledge` feed event + rolls variable reward (`rollVariableReward('pledge_completed')`) — *"this is its first real trigger, so `/rewards/drops` finally populates"* |
| Referral redeemed | `referral.service.ts:redeem()` | +100 XP both parties (`bonus`) | `referrals` table updated (`status`, `reward_granted`) |
| Pod joined | `group-formation.service.ts` | — | `join_pod` feed event (social proof) |
| Tier promotion | `community-intelligence.service.ts` | — | `tier_promotion` feed event |
| Streak milestone | `streak.service.ts` | XP via `awardXP` | `streak_tier` feed event |
| Achievement unlocked | `achievement-check.job.ts` | XP via `awardXP` | `achievement` feed event |
| Reflection/journal saved | `journal.controller.ts` | — | `rollVariableReward('reflection_saved')` |

**Tables:** `variable_rewards` (id, user_id, reward_type, reward_value JSONB, trigger_event, probability, created_at), `daily_pledges` (pledge CRUD), `referrals` (referrer_id, referee_id, status, reward_granted), `user_xp_transactions` (canonical ledger, `source_type` includes `bonus`/`streak`/`achievement`).

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Pledge completion rate | 60% of created daily pledges completed | `daily_pledges` completion ratio |
| Variable-reward drop engagement | 40% of users who receive a drop view `/rewards/drops` within 24h | Page-view correlation |
| Referral conversion | 15% of sent referral codes redeemed within 14 days | `referrals.status` funnel |
| Reward-to-social latency | Feed event published within 2s of triggering action | Job/service instrumentation |

### Acceptance Criteria
- [ ] Every social trigger point awards XP through the single canonical `awardXP()` path (no parallel XP writers)
- [ ] Pledge completion atomically: awards XP, publishes feed event, and rolls variable reward — all three or the transaction is retried
- [ ] Referral redemption grants XP to both referrer and referee exactly once per redemption
- [ ] `variable_rewards` drops are queryable via `/rewards/drops` with trigger-event provenance visible
- [ ] Drop probability and tier weights are configuration, not scattered magic numbers, and documented in-code
- [ ] No double-reward on retry/replay (idempotent per triggering event id)

### Error Handling Scenarios

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|--------------------|---------------------|
| **Pledge completion partially fails (XP awarded, feed publish fails)** | Feed write throws after XP commit | XP stands (already committed), feed publish retried async, never rolled back silently losing the reward | User still sees XP toast; feed item may appear with slight delay |
| **Referral code redeemed twice** | Unique constraint on `referrals` redemption | Second attempt no-ops, no double XP | "This invite has already been used." |
| **Variable reward roll fails (RNG/DB error)** | Exception in `rollVariableReward` | Log and skip — pledge completion itself still succeeds | No user-facing error; drop simply doesn't occur that time |
| **Referral self-redemption attempt** | `referrer_id === referee_id` check | Reject before XP grant | "You can't refer yourself." |

### Social Reward Trigger Process (High-Level)

```
On Pledge Completion:

1. Validate pledge belongs to requesting user and is not already completed
2. UPDATE daily_pledges SET status='completed', completed_at=NOW()
3. gamificationService.awardXP(userId, 'bonus', 10, pledgeId, 'Pledge completed')
4. socialFeedService.publish(userId, {
     eventType: 'pledge', visibility: 'friends',
     payload: { title: pledge.pledgeText }
   })
5. rewardEconomyService.rollVariableReward(userId, 'pledge_completed')
   -> weighted random draw from DROP_POOL at DROP_PROBABILITY
   -> IF hit: INSERT variable_rewards, apply effect (bonus XP / streak freeze / badge)
6. Return combined result to client for the completion toast
```

### Cross-Pillar Connections
**To Groups & Pods (F13.1):** Pod joins and tier promotions are reward-adjacent triggers.
**To Reputation (F13.2):** `pledgeRatio` (a reputation input) is directly the completion rate this feature tracks.
**To Social Feed (F13.3):** Every reward-bearing action is also a feed event — reward and social visibility ship together.
**To Cross-Domain Intelligence (E08):** XP/streak data feeds the Holistic Health Score's activity components.

### Dependencies
- **`gamification.service.ts` (pre-existing XP ledger):** Canonical reward path
- **F13.3 (Social Feed):** Publish target for every reward-bearing social action
- **F13.1 (Groups & Pods):** Pod-join trigger source

### MVP Status
[X] Core — Shipped, always-on (no flag)

---

## F13.5: MENTORS & COMMUNITY TIERS

### Description
Two related but distinct tier systems, both fully wired: a **user reputation/status tier** (Novice → Rising → Committed → Champion → Legend, plus a 0-5 elite tier) that gates mentor eligibility, and a **group hierarchy tier** (pod → circle → community, covered in F13.1) that graduates communities as they mature. This feature closes the audit's "mentor role never assigned" finding: mentor *eligibility* was already computed, but nothing ever flipped a user's actual `role` to `mentor` or `mentor_status` to `active`.

### User Story
As a **Holistic Health Seeker** (P1) six months into consistent tracking, I want the platform to recognize my track record by offering me mentor status and surfacing me to newer members in my pillar, so that my consistency translates into real community standing, not just a number on a page.

### Flexibility Modes

| Mode | Experience |
|------|------------|
| **Light** | See own mentor-eligibility badge if applicable; browse up to 3 suggested mentors. |
| **Deep** | Full mentor directory filtered by pillar/tier, "How mentors are chosen" transparency, ability to message a mentor directly from their card. |

### Technical Foundation

**Eligibility computation** (`reputation.service.ts`, inside `recomputeReputation()`):
```
mentorStatus = mentorRoles > 0 ? 'active'
             : (score >= 250 AND consistency >= 20) ? 'eligible'
             : 'none'
```
(`score >= 250` = Champion tier and above — see status-tier table in F13.2.)

**The actual assignment fix** (`community-intelligence.service.ts`):
- `identifyEmergingMentors()` — finds `growth_group_members` with `role='member'` in an active pod whose `user_reputation.mentor_status = 'eligible'`.
- `promoteEligibleMentors()` — *"Closes the loop on `identifyEmergingMentors` (previously unconsumed)"*: runs `UPDATE growth_group_members SET role='mentor' WHERE ... AND role='member'`, then `UPDATE user_reputation SET mentor_status='active' WHERE mentor_status='eligible'`, then sends a notification to the newly promoted mentor. Called from the daily `group-health.job.ts`, and (when `ENABLE_COMMUNITY_ORCHESTRATOR` is on) dispatchable from the LLM plan's `promoteMentors` flag — see F13.8.

**Mentor discovery** (`reputation.service.ts:getMentors()`): queries `user_reputation` for `mentor_status IN ('active','eligible')`, opt-in gated, trust-gated (excludes flagged/blocked), shared-pillar-first ordering, excludes self and existing connections. Endpoint: `GET /reputation/mentors`. Client: `MentorsSection.tsx`, rendered inside `/reputation`. Also exposed as an AI-coach agentic tool (`getMentorSuggestions`, `server/src/services/langgraph-tools/domains/social.ts`).

**Group hierarchy tier** (recap from F13.1): `growth_groups.tier IN ('pod','circle','community')` + `parent_group_id`, promoted by `promotePodsToCircles()` / `promoteCirclesToCommunities()`. Membership always stays pod-level; circle/community "membership" is a roll-up view, not a separate join table. Client: `TierCards.tsx` (`CirclesPanel` / `CommunitiesPanel`).

**Client tier mirror** (must stay in sync per its own code comment): `client/app/(pages)/reputation/lib/reputationTier.ts` — duplicates `STATUS_TIERS` thresholds/colors for local rendering without a round trip.

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Eligible → active mentor conversion | 50% of `eligible` mentors get promoted within one weekly health-job cycle | `promoteEligibleMentors()` output tracking |
| Mentor discovery engagement | 30% of new pod members view the Mentors tab within 14 days | Page-view analytics |
| Mentor-initiated contact rate | 20% of mentor-card views result in a message/connection | Client interaction tracking |
| Pod → Circle → Community graduation | 20% pod→circle within 90 days, 10% circle→community within 180 days | Promotion job output (shared with F13.1) |

### Acceptance Criteria
- [ ] `mentor_status` transitions `none → eligible → active` are fully automated, no manual admin step required for the happy path
- [ ] `promoteEligibleMentors()` only promotes users already `role='member'` in an active pod — never overwrites an existing anchor
- [ ] Promoted mentor receives a notification confirming the new status
- [ ] Mentor discovery excludes trust-flagged/blocked accounts and respects buddy-discovery consent
- [ ] Mentor cards are shared-pillar-first ordered, not global-random
- [ ] Pod → Circle → Community promotion is health/tenure gated, never immediate on join
- [ ] Client and server status-tier thresholds are identical (no drift between `reputationTier.ts` and `reputation.service.ts`)

### Error Handling Scenarios

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|--------------------|---------------------|
| **Eligible user has left all pods before promotion runs** | `promoteEligibleMentors()` finds no `growth_group_members` row | Skip promotion for that user this cycle, status stays `eligible` | Silent — status is honest, no false "active" |
| **No mentors available in a pillar** | `getMentors()` returns zero rows for the filter | Show empty state, not an error | "No mentors in this area yet — check back as the community grows." |
| **Client/server tier threshold drift** | Automated test comparing `STATUS_TIERS` constants | Build-time failure, not a runtime user-facing bug | N/A — caught before ship |
| **Mentor demoted (leaves pod after promotion)** | `left_at` set on `growth_group_members` | Role naturally lapses with membership; `mentor_status` stays `active` until next recompute reflects reduced `mentorRoles` | Silent status decay, no punitive messaging |

### Mentor Promotion Process (High-Level)

```
Daily Group Health Job:

1. identifyEmergingMentors():
   SELECT growth_group_members.user_id, group_id
   FROM growth_group_members
   JOIN user_reputation ON user_reputation.user_id = growth_group_members.user_id
   WHERE growth_group_members.role = 'member'
     AND growth_group_members.left_at IS NULL
     AND user_reputation.mentor_status = 'eligible'
     AND growth_groups.status = 'active'

2. promoteEligibleMentors():
   FOR EACH emerging mentor:
     UPDATE growth_group_members SET role = 'mentor' WHERE group_id, user_id match
     UPDATE user_reputation SET mentor_status = 'active' WHERE user_id matches
     notify(user_id, "You've been recognized as a pod mentor")

3. (If ENABLE_COMMUNITY_ORCHESTRATOR):
   LLM plan may include promoteMentors: true/false as one of 4 allowed plan keys
   -> if true, this step runs as part of the orchestrated cycle instead of
      the fixed deterministic sequence; if false or flag off, this step
      still runs (deterministic fallback is identical to the base sequence)
```

### Cross-Pillar Connections
**To Reputation (F13.2):** Mentor status is both an *input* (mentorRoles → score) and an *output* (score gate → eligibility) — a closed loop.
**To Groups & Pods (F13.1):** Mentor role lives on the same `growth_group_members` row as anchor/member.
**To Autonomous Community Orchestrator (F13.8):** Mentor promotion is one of exactly 3 actions the LLM orchestrator is allowed to trigger.
**To Trust & Safety (F13.7):** Mentor discovery excludes trust-flagged accounts.

### Dependencies
- **F13.2 (Reputation System):** Eligibility computation
- **F13.1 (Groups & Pods):** Role storage and pod-tier promotion mechanics
- **F13.7 (Trust & Safety):** Trust exclusion in discovery

### MVP Status
[X] Core — Shipped, always-on (no flag)

---

## F13.6: MATCHING & ANTI-CHEAT

### Description
The consent-gated, trust-filtered, quality-ranked candidate-generation layer underneath buddy suggestions, pod formation, and reputation leaderboards — plus two flag-gated advanced layers (pgvector embedding retrieval, a self-tuning matching-weight learning loop) that upgrade candidate quality and matching-weight accuracy without changing the safety guarantees underneath them. This feature closes three of the audit's most severe findings in one place: an inverted consent default, a fabricated hardcoded acceptance-rate constant wired into live scoring, and unvalidated leaderboard rankings.

### User Story
As a **Busy Professional** (P2), I want matching to be genuinely opt-in — never something that happens to me by default — and I want leaderboards and mentor suggestions to reliably exclude cheaters and bots, so that every social ranking I see actually means something.

### Flexibility Modes

| Mode | Experience |
|------|------------|
| **Light** | Simple opt-in toggle, top 3 buddy suggestions shown, no score visibility. |
| **Deep** | Full match-score transparency, feature-level breakdown (goal/activity/streak alignment), embedding-powered "more like this" candidate pool once `ENABLE_EMBEDDING_MATCHING` is on. |

### Technical Foundation

**True opt-in consent (fixing the inverted default):** `buddy_discovery_consent.allow_suggestions BOOLEAN DEFAULT false`. The audit-era bug was that missing-row consent was treated as consent (`OR bdc.user_id IS NULL`); the fix strips that branch entirely — all four candidate-generation queries (`buddy-suggestion.service.ts`, `group-formation.service.ts`, `accountability-partner.service.ts`, `reputation.service.ts`) now require an explicit `allow_suggestions = true` join. A backfill migration (`20260611000000_backfill_buddy_discovery_consent.sql`) grandfathered previously-matchable existing users into an explicit `true` row so the strict fix didn't silently zero out the matching pool; every user from that point forward defaults to `false`/no row until they actively opt in via Settings → Privacy or the `/groups` empty-state CTA.

**Leaderboard anti-cheat exclusion** — applied identically across all 7 ranking methods in `leaderboard.service.ts` (`materializeLeaderboard`, `getLeaderboard`, `getFriendsLeaderboard`, `getConsistencyLeaderboard`, `getImprovementLeaderboard`, `getAggregatedLeaderboard`, `getAroundMe`, `updateRanks`):
```sql
AND (dus.flags->>'anomaly_detected')::boolean IS NOT TRUE
AND NOT EXISTS (
  SELECT 1 FROM user_trust_signals uts
  WHERE uts.user_id = dus.user_id AND uts.status = 'blocked'
)
```
Two independent gates: per-day score anomaly detection (`daily_user_scores.flags`) and account-level trust status (`user_trust_signals`, see F13.7). Competition-level anti-cheat is separate and now enforced (previously stored-but-unused): `competitions.anti_cheat_policy` JSONB supports `max_daily_cap`, `min_confidence`, `require_verification`, all applied in `competition.service.ts:updateCompetitionScores()`.

**Embedding retrieve-then-rank matching** (flag `ENABLE_EMBEDDING_MATCHING`, default off) — `match-embedding.service.ts`: `user_match_embeddings(user_id PK, embedding vector(768), profile_text)` via pgvector; `retrieveSimilarUserIds()` does cosine-KNN (`ORDER BY embedding <=> ... LIMIT 60`) to shortlist candidates before the existing deterministic scorer ranks them. Falls back automatically and silently to the default `LIMIT`-based pool if pgvector is unavailable, embeddings are missing, or fewer than 10 neighbors are returned (`useKnn = knnIds.length >= 10`). Consent and trust filters apply identically to both paths.

**Matching-weight learning loop** (flag `ENABLE_MATCH_WEIGHT_TUNING`, default off) — replaces the audit-flagged fabricated constant:
```
Audit-era bug: const suggestionAcceptRate = 50.0;  // hardcoded placeholder,
               weighted 30% into motivation-tier engagement scoring
Fix: motivation-tier.service.ts now queries goal_action_responses for real
     accept/edit counts in a rolling window; if a user has zero responses,
     the term is DROPPED and remaining weights RENORMALIZED (not defaulted
     to a fabricated midpoint).
```
The actual matching-weight tuner is a separate, deeper mechanism: `matching-weights.service.ts` stores live weights (`DEFAULT_WEIGHTS = { goal:0.4, activity:0.25, streak:0.15, freshness:0.1, matrix:0.15 }`) in a singleton DB row (`matching_weights`) plus an audit trail (`matching_weight_history`, source `tuner|admin|reset`). `matching-weight-tuner.service.ts:tuneWeights()` computes `lift(feature) = mean(strength | accepted) − mean(strength | not accepted)` from `buddy_suggestions_cache`, nudges each weight by `STEP·tanh(lift/SCALE)` clamped to `[0.02, 0.6]`, and **refuses to act** below guardrail thresholds (`MIN_SHOWN=50`, `MIN_ACCEPTED=5`). Runs daily via `matching-weight-tuner.job.ts`, gated on `ENABLE_MATCH_WEIGHT_TUNING`, measured via a sticky A/B experiment (`matcher_tuned_weights`).

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Consent opt-in accuracy | 100% of matched users have an explicit `allow_suggestions=true` row (zero implicit matches) | Query audit / automated test |
| Leaderboard integrity | 0 blocked/anomaly-flagged users visible in top-100 across all boards | Automated nightly check |
| Buddy-suggestion accept rate (baseline, weight-tuning off) | Establish real baseline (replacing the fabricated 50.0) | `buddy_suggestions_cache` accept-rate telemetry |
| Buddy-suggestion accept rate lift (once `ENABLE_MATCH_WEIGHT_TUNING` on) | +10% relative to baseline within 60 days | A/B experiment `matcher_tuned_weights` |
| Embedding-matching candidate quality (once `ENABLE_EMBEDDING_MATCHING` on) | Accept rate ≥ baseline pool (no regression) | A/B comparison |

### Acceptance Criteria
- [ ] Zero code path treats a missing consent row as consent — verified by grep/test across all 4 candidate queries
- [ ] Backfill migration correctly preserved matchability for users who were previously matched under the old default
- [ ] Every leaderboard method applies both the anomaly-flag and trust-blocked exclusion predicates
- [ ] Competition `anti_cheat_policy` (`max_daily_cap`, `min_confidence`, `require_verification`) is actually enforced in score aggregation, not just stored
- [ ] Embedding retrieval degrades gracefully (no error surfaced to user) when pgvector/embeddings are unavailable
- [ ] Weight tuner never adjusts weights below the `MIN_SHOWN`/`MIN_ACCEPTED` data-sufficiency guardrail
- [ ] Weight changes are logged to `matching_weight_history` with source attribution (tuner/admin/reset)
- [ ] A/B experiment assignment is sticky per user for the duration of an experiment

### Error Handling Scenarios

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|--------------------|---------------------|
| **User revokes consent mid-matching-cycle** | `allow_suggestions` flips to false | Excluded from next candidate query; existing matches unaffected retroactively | "You've opted out of new matches. Existing connections are unaffected." |
| **pgvector extension unavailable** | `CREATE EXTENSION IF NOT EXISTS vector` fails or embedding table absent | Silent fallback to default `LIMIT`-based candidate pool | No user-facing difference |
| **Weight tuner has insufficient data** | `shown < 50 OR accepted < 5` | `tuneWeights()` returns `{changed:false, reason:'insufficient_data'}`, no write | Silent — weights simply don't change that cycle |
| **Leaderboard query returns a blocked user (defensive check fails)** | Automated integrity test | Alert admin, treat as a P1 bug (violates the core anti-cheat guarantee) | N/A — should never reach a user |

### Matching Candidate Generation Process (High-Level)

```
Buddy/Pod Candidate Generation:

1. Consent & Trust Filter (always applied, both retrieval paths):
   WHERE buddy_discovery_consent.allow_suggestions = true
     AND user_trust_signals.status != 'blocked'

2. Candidate Retrieval:
   IF ENABLE_EMBEDDING_MATCHING AND pgvector available:
     knnIds = cosine_KNN(user_embedding, limit=60)
     IF knnIds.length >= 10: candidatePool = knnIds
     ELSE: candidatePool = default_pool (fallback)
   ELSE:
     candidatePool = default LIMIT-based scan

3. Deterministic Scoring (applies to either pool):
   score = goal*W.goal + activity*W.activity + streak*W.streak
         + freshness*W.freshness + matrix*W.matrix
   (W = live weights from matching_weights table, tuner-adjustable)

4. A/B Assignment (if ENABLE_MATCH_WEIGHT_TUNING):
   variant = experimentService.getVariant(userId, 'matcher_tuned_weights')
   control -> pin DEFAULT_WEIGHTS; treatment -> use live tuned weights

5. Rank & Return top-N shortlist

6. Nightly (if ENABLE_MATCH_WEIGHT_TUNING):
   FOR EACH feature:
     lift = mean(strength | accepted) - mean(strength | not accepted)
     newWeight = clamp(oldWeight + 0.03*tanh(lift/0.15), 0.02, 0.6)
   IF shown >= 50 AND accepted >= 5:
     UPDATE matching_weights; INSERT matching_weight_history(source='tuner')
   ELSE:
     no-op, log 'insufficient_data'
```

### Cross-Pillar Connections
**To Groups & Pods (F13.1):** Shared candidate pool and consent gate.
**To Reputation (F13.2):** Shared leaderboard anti-cheat exclusion predicate.
**To Trust & Safety (F13.7):** `user_trust_signals.status` is the shared exclusion key across matching, mentors, pods, and leaderboards.
**To Cross-Domain Intelligence (E08):** `motivation-tier.service.ts` engagement scoring (the fabricated-constant fix) feeds into the same personalization signals E08 consumes.

### Dependencies
- **F13.7 (Trust & Safety):** Trust-signal exclusion
- **F13.1 (Groups & Pods):** Consumer of candidate generation for pod formation
- **F13.2 (Reputation System):** Consumer of the anti-cheat leaderboard predicate

### MVP Status
[X] Core (consent gate, anti-cheat exclusion) — Shipped, always-on
[ ] Embedding retrieve-then-rank — Shipped, flag-gated: `ENABLE_EMBEDDING_MATCHING` (default off)
[ ] Matching-weight learning loop — Shipped, flag-gated: `ENABLE_MATCH_WEIGHT_TUNING` (default off)

---

## F13.7: TRUST & SAFETY

### Description
The safety substrate underneath every social surface in this Epic: message sanitization, lightweight content screening with auto-report, a full report/review pipeline, follow-request rate limiting, and a deterministic bot/sybil trust scorer with an optional ML overlay — plus a separate churn-prediction model with an independently-gated nudge system. The trust scorer's ML layer is built with a hard architectural guarantee: it can only ever *flag an account for human review*, never auto-block it.

### User Story
As a **Holistic Health Seeker** (P1) joining a pod of strangers, I want confidence that the platform actively filters out bots, harassment, and fake accounts — and a simple way to report anything that slips through — so that a social feature never becomes the reason I feel unsafe using the app.

### Flexibility Modes

| Mode | Experience |
|------|------------|
| **Light** | Report button available everywhere social content appears; no visibility into trust scores or moderation internals. |
| **Deep** | (Admin-only, not user-facing) full moderation queue, trust-flag review, churn/trust ML training panels. |

### Technical Foundation

**Message sanitization** (`server/src/utils/sanitize.ts`, `sanitizeUserText()`): strips dangerous block tags (`script`, `style`, `iframe`, `object`, `embed`, `noscript`, `template`), void tags (`link`, `meta`, `base`), inline `on*=` handlers, and `javascript:`/`vbscript:`/`data:text/html` URIs. Applied on both message creation and edit in `message.service.ts`.

**Lightweight content screening** (`server/src/utils/content-screen.ts`, `screenText()`): regex-based severity classifier — `high` for threat/self-harm/harassment patterns, `low` for a mild profanity list. Explicitly documented as non-blocking by design: *"it intentionally does NOT block content on its own... For production-grade moderation, swap in a hosted toxicity model behind this interface."* Wired via `content-moderation.service.ts:screenAndAutoReport()`, which auto-inserts a system report (`reporter_id = NULL`, `reason='auto_screen'`) into `content_reports` when flagged.

**Report pipeline** (`content_reports` table, migration `20260611002000_content_reports.sql`): `contentType IN (message | community_post | community_reply | feed | user | group)`, `severity` auto-escalated to `high` for `harassment/hate/threat/self_harm/violence` reasons. Client: reusable `<ReportButton contentType contentId>` component, present on feed items, community content, and chat messages. Server: `POST /moderation/report` (any authenticated user), `GET /moderation/reports` / `PATCH /moderation/reports/:id` (admin-only), `status IN (pending|reviewed|actioned|dismissed)`. Admin UI: `/admin/moderation`.

**Follow-request rate limit**: `followRequestLimiter` in `follow.routes.ts` — 30 requests/hour/user, applied to `POST /follow/:userId`.

**Bot/sybil trust scorer — two layers, admin-review-only by construction:**
- **Deterministic base** (`bot-signal.service.ts`): 5 weighted signals — `reports 0.3, velocity 0.25, emptyShell 0.2, email 0.15, age 0.1` — blended into `bot_risk_score`, thresholded `FLAG_AT=0.5`, `BLOCK_AT=0.8` → `status IN (ok|flagged|blocked)` on `user_trust_signals`. Migration comment: *"Conservative by design — only the 'blocked' status gates social surfaces; 'flagged' is a review signal, not a punishment."*
- **ML overlay** (`trust-model.service.ts`, flag `ENABLE_TRUST_ML`, default off): trained only on `manual_override=true` **admin-blocked** accounts as the positive label (`trust_training_samples`). Serving path, verified in `bot-signal.service.ts`:
  ```ts
  if (ENABLE_TRUST_ML && status === 'ok') {
    p = trustModelService.predict(signals)
    if (p !== null && p >= 0.6) status = 'flagged'   // never 'blocked'
  }
  ```
  This only ever moves `ok → flagged`; there is no code path from the ML model to `blocked`. Admin review surface: `GET /moderation/trust-flags`, `PATCH /moderation/trust-flags/:userId` (human sets `blocked`), `POST /moderation/trust-flags/recompute`, plus `POST /moderation/trust-model/{build,train}` and `GET /moderation/trust-model`.

**Churn prediction — two independently-gated flags:**
- `churn-risk.service.ts`: deterministic 4-signal scorer (recency, activity trend, tracking gap, streak loss) → status bands `healthy < 0.4 ≤ cooling < 0.6 ≤ at_risk < 0.8 ≤ critical`, persisted to `user_churn_risk`.
- `ENABLE_CHURN_ML` (default off): swaps in a trained logistic-regression model (`churn-model.service.ts`, weights in `churn_model_weights`) for the score itself — the *prediction*, not the action.
- `ENABLE_CHURN_NUDGES` (default off, fully independent): gates `maybeNudge()` — the actual re-engagement notification, 7-day cooldown, measured via A/B experiment `churn_reengagement`. Job comment confirms the deliberate decoupling: *"Scoring always runs...; the user-facing re-engagement nudge inside the service is separately gated by `ENABLE_CHURN_NUDGES` (default off) so enabling this job alone never surprise-notifies users."*

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Report resolution time | 90% of `high`-severity reports reviewed within 24h | `content_reports` timestamp delta |
| False-block rate (trust scorer) | 0 auto-blocks ever originate from the ML layer | Code-level invariant, verified by test |
| Bot-account leaderboard leakage | 0 blocked accounts visible in any ranking surface | Shared with F13.6 integrity check |
| Churn nudge lift (once `ENABLE_CHURN_NUDGES` on) | +8% 14-day re-engagement vs. control | A/B experiment `churn_reengagement` |

### Acceptance Criteria
- [ ] All user-generated message content passes through `sanitizeUserText()` on both create and edit
- [ ] `screenAndAutoReport()` never blocks content synchronously — it is fire-and-forget, non-blocking on the message path
- [ ] Report button available on every reportable content type (message, community post/reply, feed, user, group)
- [ ] High-severity report reasons (harassment/hate/threat/self_harm/violence) auto-escalate `severity` without waiting for admin triage
- [ ] Follow-request limiter enforces 30/hour/user with a clear rejection message
- [ ] Trust ML overlay is architecturally incapable of setting `status='blocked'` — verified by a dedicated test asserting the only write path to `blocked` is the deterministic threshold or `setStatus()` (admin)
- [ ] `manual_override=true` accounts are the only positive training label for the trust model (no self-reinforcing loop from unreviewed flags)
- [ ] `ENABLE_CHURN_ML` and `ENABLE_CHURN_NUDGES` can be toggled independently without either implying the other

### Error Handling Scenarios

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|--------------------|---------------------|
| **Duplicate report on same content by same user** | Unique index on `content_reports` | Second insert no-ops | "You've already reported this." |
| **Trust model unavailable/errors during predict()** | Exception in `trustModelService.predict()` | `p = null`, deterministic status stands unchanged | No user-facing impact |
| **Content screen misses a genuinely harmful message** | User report after the fact | Manual report path still available and takes priority over auto-screen | Standard report flow, reviewed by admin |
| **Follow-request limiter hit** | Rate limiter rejects | 429 with clear message, request not queued or silently dropped | "Too many follow requests. Please slow down and try again later." |
| **Churn nudge would fire twice within cooldown** | `NUDGE_COOLDOWN_MS` (7 days) check | Skip send, no duplicate notification | Silent — user simply doesn't get a second nudge |

### Trust Evaluation Process (High-Level)

```
On-Demand / Nightly Sweep (trust-sweep.job.ts):

1. Compute Deterministic Signals:
   reports_signal, velocity_signal, empty_shell_signal, email_signal, age_signal
   (each normalized 0-1)

2. Blend:
   bot_risk_score = reports*0.3 + velocity*0.25 + emptyShell*0.2
                   + email*0.15 + age*0.1

3. Threshold:
   status = bot_risk_score >= 0.8 ? 'blocked'
          : bot_risk_score >= 0.5 ? 'flagged'
          : 'ok'

4. IF ENABLE_TRUST_ML AND status == 'ok':
     p = trustModelService.predict(signals)
     IF p >= 0.6: status = 'flagged'   // ceiling: can only add scrutiny, never block

5. UPSERT user_trust_signals (unless manual_override = true, which is sticky)

6. Downstream Effects (status = 'blocked' only):
   - Excluded from all leaderboard rankings (F13.6)
   - Excluded from buddy/pod matching candidate pools (F13.1, F13.6)
   - Excluded from mentor discovery (F13.5)
   - Excluded from outbound follow suggestions

7. status = 'flagged' Effects:
   - Surfaces in /admin/trust review queue only
   - No functional restriction on the account itself (review signal, not punishment)
```

### Cross-Pillar Connections
**To Matching & Anti-Cheat (F13.6):** `user_trust_signals.status` is the shared exclusion key.
**To Groups & Pods (F13.1):** Trust-blocked users excluded from pod candidate pools.
**To Mentors (F13.5):** Trust-blocked/flagged accounts excluded from mentor discovery.
**To Social Feed (F13.3):** Feed content is a reportable type; sanitization applies to any user-generated text entering the feed.

### Dependencies
- **F13.6 (Matching & Anti-Cheat):** Consumer of trust status for exclusion
- **F13.1, F13.5 (Groups, Mentors):** Consumers of trust exclusion
- **Admin dashboard infrastructure:** Review queues for reports, trust flags, churn/trust ML training

### MVP Status
[X] Core (sanitization, reporting, rate limits, deterministic bot scorer) — Shipped, always-on
[ ] Trust ML overlay — Shipped, flag-gated: `ENABLE_TRUST_ML` (default off, flag-only, never auto-blocks)
[ ] Churn ML model — Shipped, flag-gated: `ENABLE_CHURN_ML` (default off)
[ ] Churn re-engagement nudges — Shipped, flag-gated: `ENABLE_CHURN_NUDGES` (default off, independent of `ENABLE_CHURN_ML`)

---

## F13.8: AUTONOMOUS COMMUNITY ORCHESTRATOR

### Description
A schema-bounded, flag-gated LLM layer sitting on top of the deterministic community-health engine (F13.1/F13.5's `community-intelligence.service.ts`). It does not introduce any new capability — it only decides, per daily cycle, *which* at-risk pods to remediate, whether to archive collapsed pods, and whether to promote eligible mentors, dispatching exclusively into three pre-existing, already-safe primitives. It cannot invoke anything else, and any failure — parse error, LLM error, circuit breaker open — falls back byte-for-byte to the same deterministic sequence that runs when the feature is off entirely.

### User Story
As a **Product/Community Operations stakeholder**, I want the platform's daily pod-health cycle to make smarter, context-aware decisions about which at-risk pods most need intervention right now — without ever giving an LLM the ability to take an irreversible or unscoped action — so that community health scales without either manual triage or unbounded AI autonomy.

### Flexibility Modes

*This feature is operational infrastructure, not a user-facing mode. There is no Light/Deep toggle for end users — the orchestrator operates identically regardless of a user's mode preference, and its only visible effect (to end users) is the same anchor guidance notification and mentor promotion that already exist in the deterministic path.*

| Layer | Behavior |
|------|------|
| **Flag off (both)** | Fixed deterministic sequence every cycle: remediate all at-risk pods → archive all collapsed pods → promote all eligible mentors. |
| **`ENABLE_COMMUNITY_AGENT` on** | Anchor-guidance notification text is LLM-personalized (metric-aware) instead of a static fallback string. Does not change which pods get remediated. |
| **`ENABLE_COMMUNITY_ORCHESTRATOR` on** | An LLM plans *which* at-risk pod IDs to remediate this cycle (from a pre-computed at-risk set), whether to archive collapsed pods, and whether to promote mentors — replacing the fixed sequence with a reasoned selection. |

### Technical Foundation

**Two independent, composable flags** (not nested — confirmed in code):
- `ENABLE_COMMUNITY_AGENT` — gates the lower-level single action inside `community-intelligence.service.ts:generateAnchorGuidance()` (private method): `if (process.env['ENABLE_COMMUNITY_AGENT'] !== 'true') return fallback;`. Only changes wording of a notification sent to a pod's anchor.
- `ENABLE_COMMUNITY_ORCHESTRATOR` — gates the higher-level sequencing layer, checked in `group-health.job.ts`: `if (process.env['ENABLE_COMMUNITY_ORCHESTRATOR'] === 'true')`, routing archive/promote/remediate decisions through `communityOrchestratorService.orchestrate()` instead of the fixed order.
- Both default `false`. Either can be on independently; both can be on simultaneously (orchestrator picks the pods, agent writes the anchor copy).

**"Schema-bounded" — hand-rolled, not a declarative schema artifact** (`community-orchestrator.service.ts:parseAndValidate()`):
- LLM asked for JSON; markdown fences stripped, first `{...}` blob extracted, `JSON.parse`d, then manually coerced to a fixed 4-key shape: `{ remediateGroupIds: string[], archiveCollapsed: boolean, promoteMentors: boolean, reasoning: string }`.
- `remediateGroupIds` filtered against a pre-computed `Set` of actually-at-risk pod IDs — hallucinated/arbitrary IDs are silently dropped, never executed.
- Hard cap: `MAX_REMEDIATE = 30` per run.
- Boolean coercion is strict `=== true` only — any non-boolean-true value (including truthy strings like `'yes'`) is treated as `false`.
- `reasoning` truncated to 300 characters (logged, not shown to end users).

**Guardrails:**
- **Allowlist-only dispatch** (`executePlan()`): can only call `remediateGroup()`, `archiveCollapsedPods()`, `promoteEligibleMentors()` — the exact same three deterministic-path primitives, no generic tool-call mechanism exists. There is no capability to delete users, ban accounts, or broadcast free text — `remediateGroup` only notifies a pod's designated anchor, never an open broadcast.
- **Volume cap:** 30 remediations/run, plus the job itself runs at most once daily.
- **Shared circuit breaker:** `llm-circuit-breaker.service.ts` (CLOSED/OPEN/HALF_OPEN with cooldown/backoff, shared across all LLM calls platform-wide) — both `planWithLLM()` and `generateAnchorGuidance()` check `isCallAllowed()` before calling out and skip to fallback if not allowed.
- **Fail-safe fallback everywhere:** any parse failure, LLM error, or breaker-block routes `orchestrate()` to `runDeterministic()` — byte-identical to the always-on fixed sequence. `generateAnchorGuidance()` similarly falls back to a static string on any failure or implausible output (`text.length < 20 || text.length > 600`).
- **No human-approval gate:** unlike the trust ML model (F13.7), which can only ever *flag* for human review, this feature *does* execute automatically once its flag is on — its safety model is scope/allowlist-based (bounded action set), not approval-gated. This is an explicit design tradeoff: the allowed action set is itself provably safe (status/role updates and anchor-only notifications), so no irreversible or user-facing-broadcast action is possible regardless of what the LLM outputs.
- **Logging, not a dedicated audit table:** every executed plan and every deterministic fallback is logged via the standard application logger (`'[CommunityOrchestrator] Executed LLM plan'`, `'[CommunityOrchestrator] Ran deterministic sequence (fallback)'`). Unlike the AI-coach's general tool-call layer (which has a dedicated `tool_audit_log` table), this feature does not currently have a queryable audit trail beyond structured logs — flagged as a known gap, not a blocker for shipping behind a flag.

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Plan validity rate | ≥95% of LLM outputs parse and validate without falling back | `parseAndValidate()` success/failure instrumentation |
| Remediation targeting quality (orchestrator vs. deterministic) | Orchestrated remediation improves pod recovery rate vs. fixed-order baseline | Cohort comparison, `group_health_snapshots` post-remediation |
| Fallback rate | Deterministic fallback rate stays a visible, monitored number, not silently masked | Log-based dashboard |
| Zero unsafe actions | 0 instances of an ID outside the at-risk set being remediated, ever | Automated test + production log audit |

### Acceptance Criteria
- [ ] `remediateGroupIds` from the LLM plan is always filtered against the true at-risk set before execution — no exceptions
- [ ] `MAX_REMEDIATE` cap is enforced even if the LLM proposes more than 30 valid IDs
- [ ] Boolean plan fields never execute on a falsy/ambiguous value (strict `=== true` only)
- [ ] `orchestrate()` falls back to `runDeterministic()` on: circuit breaker open, LLM throw, unparseable JSON, and validation failure — all four paths tested
- [ ] `executePlan()` can only ever call the three allowlisted primitives — no dynamic dispatch, no generic tool invocation
- [ ] `ENABLE_COMMUNITY_AGENT` and `ENABLE_COMMUNITY_ORCHESTRATOR` are verified independently toggleable in tests (4 combinations covered)
- [ ] `generateAnchorGuidance()` output length-validated (20-600 chars) before use; implausible output falls back
- [ ] Every orchestrated run and every fallback run is logged with enough context to reconstruct what happened

### Error Handling Scenarios

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|--------------------|---------------------|
| **LLM returns valid JSON with a fabricated group ID** | ID not in the pre-computed at-risk `Set` | ID silently dropped from `remediateGroupIds`, rest of plan proceeds | No user-facing impact — that pod simply isn't remediated this cycle |
| **LLM returns malformed/non-JSON output** | `JSON.parse` throws or no `{...}` blob found | `runDeterministic()` fallback, full fixed sequence executes instead | No visible difference to end users vs. flag-off behavior |
| **Circuit breaker open (LLM provider degraded)** | `isCallAllowed()` returns false | Skip LLM call entirely, `runDeterministic()` fallback | No visible difference |
| **LLM proposes >30 remediation targets** | `remediateGroupIds.length > MAX_REMEDIATE` | `.slice(0, 30)`, remainder ignored (not queued for next run) | Silent — excess targets simply wait for the next daily cycle's own at-risk computation |
| **Anchor guidance text is implausible (too short/long)** | Length check outside 20-600 chars | Fall back to static guidance string | Anchor sees standard, non-personalized copy instead |

### Orchestration Process (High-Level)

```
Daily Group Health Job (group-health.job.ts):

1. Deterministic Pre-Computation (always runs, both flags off or on):
   atRiskGroups = detectAtRiskPods()        // health_score below floor
   collapsedGroups = detectCollapsedPods()  // participation near zero
   emergingMentors = identifyEmergingMentors()

2. IF ENABLE_COMMUNITY_ORCHESTRATOR:
   IF llmCircuitBreaker.isCallAllowed():
     rawPlan = planWithLLM({ atRiskGroups, collapsedGroups, emergingMentors })
     plan = parseAndValidate(rawPlan, atRiskIds=Set(atRiskGroups.map(id)))
     IF plan is valid:
       executePlan(plan)   // dispatches ONLY to remediateGroup/archiveCollapsedPods/promoteEligibleMentors
       log('Executed LLM plan', plan.reasoning)
       RETURN
   // any failure above falls through to:
   runDeterministic()
   log('Ran deterministic sequence (fallback)')
ELSE:
   runDeterministic()   // identical fixed sequence, always

3. runDeterministic():
   FOR EACH pod IN atRiskGroups: remediateGroup(pod.id)
   IF collapsedGroups.length > 0: archiveCollapsedPods(collapsedGroups)
   IF emergingMentors.length > 0: promoteEligibleMentors()

4. remediateGroup(groupId) [same primitive, either path]:
   anchor = getAnchor(groupId)
   IF ENABLE_COMMUNITY_AGENT AND llmCircuitBreaker.isCallAllowed():
     text = generateAnchorGuidance(groupId, metrics)  // 20-600 char validated
   ELSE:
     text = staticFallbackGuidance(groupId)
   notify(anchor.userId, text)   // anchor-only, never a broadcast
```

### Cross-Pillar Connections
**To Groups & Pods (F13.1):** Dispatches into the exact same remediation/archival primitives the deterministic path uses.
**To Mentors (F13.5):** `promoteMentors` is one of the 3 allowed plan actions.
**To Trust & Safety (F13.7):** Shares the platform-wide LLM circuit breaker; contrasts intentionally with the trust ML model's stricter "never auto-act" posture — worth surfacing to stakeholders as a documented design choice, not an oversight.

### Dependencies
- **F13.1 (Groups & Pods):** `remediateGroup()`, `archiveCollapsedPods()` primitives
- **F13.5 (Mentors):** `promoteEligibleMentors()` primitive
- **Shared LLM circuit breaker infrastructure:** Required for safe degradation
- **`group-health.job.ts`:** The only caller of this feature; no other entry point exists

### MVP Status
[ ] Shipped, fully flag-gated: `ENABLE_COMMUNITY_AGENT` (anchor-guidance LLM copy, default off) + `ENABLE_COMMUNITY_ORCHESTRATOR` (LLM plan sequencing, default off) — deterministic fallback is the always-on default behavior

---

## EPIC SUCCESS CRITERIA

### Launch Readiness (All Features)
- [ ] All 8 features functional in their "core" (always-on) configuration
- [ ] All 9 staged-rollout flags default OFF in every environment until explicitly enabled per the sequencing plan below
- [ ] Consent is verifiably opt-in end-to-end: zero code path treats missing consent as consent
- [ ] Every leaderboard and mentor-discovery surface excludes trust-blocked and anomaly-flagged users
- [ ] Every LLM-touched surface (matching copy, anchor guidance, community orchestrator, trust/churn ML) has a tested deterministic fallback
- [ ] Trust ML and churn ML models are demonstrably incapable of auto-blocking or auto-acting without a human/flag boundary
- [ ] Server test suite green: 309/309 suites, 5,390+ tests; client: 46/46 suites, 668 tests; both typecheck/lint clean
- [ ] `/groups`, `/feed`, `/reputation` client surfaces live and navigable from the dashboard
- [ ] Admin surfaces (`/admin/moderation`, `/admin/trust`, `/admin/churn`, `/admin/matching`, `/admin/experiments`) functional for staged-rollout monitoring

### Quality Gates

| Gate | Criteria | Measurement |
|------|----------|-------------|
| **Consent Integrity** | 100% of matched/pod-formed users have explicit `allow_suggestions=true` | Automated query audit |
| **Anti-Cheat Integrity** | 0 blocked/flagged users visible in any ranking or discovery surface | Automated nightly check |
| **Safety Invariant (Trust ML)** | 0 instances of the ML layer setting `status='blocked'` | Code-level test + log audit |
| **Safety Invariant (Community Orchestrator)** | 0 instances of an out-of-scope action (non-allowlisted primitive, ID outside at-risk set, >30 remediations) | Automated test + production log audit |
| **Fallback Reliability** | 100% of LLM failures (parse/throw/breaker-open) resolve to the deterministic path with no user-facing error | Test suite + log-based monitoring |
| **Test Coverage** | 309/309 server suites, 46/46 client suites green | CI |

### User Experience Validation

| Persona | Key Experience | Success Indicator |
|---------|---------------|--------------------|
| **P1: Holistic Health Seeker** | Gets matched into an accountability pod with real, visible control to join/leave | 65%+ 30-day pod survival |
| **P2: Busy Professional** | Sees a lightweight, trustworthy feed and reliable, gaming-resistant leaderboards | 0 anti-cheat integrity violations |
| **P3: Optimization Enthusiast** | Uses transparent reputation breakdown to track and improve standing | 30%+ tier progression within 60 days |

---

## STAGED ROLLOUT: THE 9 FLAGS

Every AI/ML-driven or scale-sensitive piece of this Epic shipped complete, tested, and **flag-gated off**. This is a deliberate operational posture, not incomplete work — per the implementation-status doc: *"What remains is purely operational (commit · deploy · flip the 9 flags as data warrants) — no remaining build work."*

| Flag | Feature | Default | What it gates |
|------|---------|---------|----------------|
| `ENABLE_FEED_CACHE` | F13.3 | `false` | 45s Redis cache of the first feed page |
| `ENABLE_FEED_FANOUT` | F13.3 | `false` | Write-time push of events to recipients' precomputed feed lists |
| `ENABLE_EMBEDDING_MATCHING` | F13.6 | `false` | pgvector cosine-KNN candidate retrieval for matching |
| `ENABLE_MATCH_WEIGHT_TUNING` | F13.6 | `false` | Daily learning loop that nudges matching feature weights toward what converts |
| `ENABLE_TRUST_ML` | F13.7 | `false` | ML overlay on the bot/sybil scorer — flag-only, can only raise `ok → flagged`, never auto-blocks |
| `ENABLE_CHURN_ML` | F13.7 | `false` | Trained logistic-regression churn-prediction model (replaces the deterministic score) |
| `ENABLE_CHURN_NUDGES` | F13.7 | `false` | Sending the actual re-engagement notification to at-risk users (independent of `ENABLE_CHURN_ML`) |
| `ENABLE_COMMUNITY_AGENT` | F13.8 | `false` | LLM-personalized anchor-guidance notification text |
| `ENABLE_COMMUNITY_ORCHESTRATOR` | F13.8 | `false` | LLM-planned selection of which at-risk pods to remediate this cycle |

**Recommended sequencing** (per the implementation-status doc): `ENABLE_FEED_CACHE` → `ENABLE_EMBEDDING_MATCHING` → start `matcher_tuned_weights` experiment + `ENABLE_MATCH_WEIGHT_TUNING` → create/start `churn_reengagement` experiment + `ENABLE_CHURN_NUDGES` → `ENABLE_COMMUNITY_AGENT`. `ENABLE_FEED_FANOUT`, `ENABLE_TRUST_ML`, `ENABLE_CHURN_ML`, and `ENABLE_COMMUNITY_ORCHESTRATOR` are lower-urgency (scale-triggered or highest-autonomy) and should follow once the earlier flags have validated their respective learning loops on real data.

**Why flip flags instead of shipping them on by default:** each flag gates either (a) a scale optimization with no functional difference at low scale (`ENABLE_FEED_CACHE`, `ENABLE_FEED_FANOUT`), (b) a learning loop that needs real acceptance/outcome data before its output can be trusted (`ENABLE_MATCH_WEIGHT_TUNING`, `ENABLE_CHURN_ML`, `ENABLE_TRUST_ML`), or (c) a user-facing behavior change that should be A/B-validated before full rollout (`ENABLE_CHURN_NUDGES`, `ENABLE_EMBEDDING_MATCHING`, `ENABLE_COMMUNITY_AGENT`, `ENABLE_COMMUNITY_ORCHESTRATOR`). None of them gate a missing safety control — every flag's "off" state is the fully-safe deterministic baseline, and every flag's "on" state degrades gracefully back to that baseline on any failure.

---

## CROSS-EPIC DEPENDENCIES

### E08: Cross-Domain Intelligence
- `motivation-tier.service.ts` engagement scoring (fixed in F13.6) feeds the same personalization signal pool E08 consumes for prediction/insight generation
- Reputation/pod data is a candidate future input for E08's correlation engine (not yet wired as of this Epic's scope)

### E14: Relationships CRM (separate but related)
- Distinct from in-app pods/circles — E14 covers external relationship tracking. Social Growth OS pods are peer accountability groups formed by the platform; E14 relationships are user-curated. No shared tables; both surface on the user's social graph conceptually.

### E21: Accountability Hardening (shares trust/safety patterns)
- Shares the consent-sovereignty pattern (`accountability-consent.service.ts`, called out in the Social Growth design doc as "the reference implementation the rest of the platform should copy")
- Shares the sanitization/reporting infrastructure (F13.7) for any accountability-partner messaging surfaces
- Pod-based accountability (F13.1) and 1:1 accountability contracts (E21) both feed into the same `daily_pledges`/reward triggers (F13.4)

### E5, E6, E7 (Fitness, Nutrition, Wellbeing Pillars)
- `daily_user_scores` is the shared input for reputation consistency/improvement signals and leaderboard rankings
- Goal domains (`goal_domain` on `growth_groups`, matching candidates) are pillar-scoped

---

## TECHNICAL CONSIDERATIONS

### Data Models (Social Growth OS)

**Growth Group Record:**
```json
{
  "id": "uuid",
  "tier": "pod|circle|community",
  "goal_domain": "fitness",
  "name": "Morning Movers",
  "chat_id": "uuid",
  "competition_id": "uuid|null",
  "health_score": 78,
  "status": "forming|active|at_risk|archived",
  "formation_run_id": "uuid",
  "parent_group_id": "uuid|null",
  "created_at": "2026-06-20T00:00:00Z"
}
```

**User Reputation Record:**
```json
{
  "user_id": "uuid",
  "accountability_score": 267.5,
  "kudos_received": 42,
  "kudos_given": 18,
  "mentor_status": "eligible",
  "status_title": "Champion",
  "elite_tier": 1,
  "updated_at": "2026-07-07T06:00:00Z"
}
```

**Trust Signal Record:**
```json
{
  "user_id": "uuid",
  "bot_risk_score": 0.12,
  "status": "ok",
  "signals": { "reports": 0, "velocity": 0.1, "emptyShell": 0.05, "email": 0, "age": 0.2 },
  "manual_override": false,
  "computed_at": "2026-07-07T03:00:00Z"
}
```

**Activity Feed Record:**
```json
{
  "id": "uuid",
  "actor_id": "uuid",
  "event_type": "pledge|achievement|streak_tier|competition_win|join_pod|tier_promotion",
  "visibility": "public|friends|pod",
  "payload": { "title": "Completed today's movement pledge" },
  "created_at": "2026-07-07T14:32:00Z"
}
```

### API Endpoints (Social Growth OS)

```
# Groups & Pods
GET  /api/groups/mine
GET  /api/groups/circles
GET  /api/groups/circles/:id
GET  /api/groups/communities
GET  /api/groups/communities/:id
GET  /api/groups/:id
GET  /api/groups/:id/members
GET  /api/groups/:id/health
POST /api/groups/:id/join
POST /api/groups/:id/leave

# Reputation
GET  /api/reputation/me
GET  /api/reputation/me/breakdown
GET  /api/reputation/me/history
GET  /api/reputation/me/rank
GET  /api/reputation/leaderboard
GET  /api/reputation/mentors

# Feed
GET  /api/feed
POST /api/feed/:id/react

# Moderation / Trust & Safety
POST  /api/moderation/report
GET   /api/moderation/reports              (admin)
PATCH /api/moderation/reports/:id          (admin)
GET   /api/moderation/trust-flags          (admin)
PATCH /api/moderation/trust-flags/:userId  (admin)
POST  /api/moderation/trust-flags/recompute (admin)
POST  /api/moderation/trust-model/build    (admin)
POST  /api/moderation/trust-model/train    (admin)
GET   /api/moderation/trust-model          (admin)

# Matching admin
GET  /api/admin/matching                   (admin, weights + history)

# Churn
POST /api/churn-risk/model/train           (admin)
GET  /api/churn-risk/model                 (admin)

# Follow (rate-limited)
POST /api/follow/:userId
```

### Performance Requirements

| Operation | Target Latency | Rationale |
|-----------|---------------|-----------|
| Weekly pod formation job | Complete within processing window per goal domain | Runs off-peak, results ready before weekly review |
| Feed page load (cache off) | <500ms keyset query | Acceptable for infinite-scroll UX |
| Feed page load (`ENABLE_FEED_CACHE` on) | <50ms on cache hit | Redis-served, 45s TTL |
| Reputation breakdown fetch | <300ms | Single-row read + computed breakdown |
| Daily reputation recompute (batch) | Complete within nightly window | All active users, before morning access |
| Daily group health job | Complete within nightly window | Snapshot + promotion + remediation |
| Trust sweep (1,000 users/batch) | Complete within nightly window | Advisory-locked, single-instance |
| Embedding KNN retrieval (`ENABLE_EMBEDDING_MATCHING`) | <200ms per query | pgvector cosine index |

### Machine Learning Infrastructure

**Model Requirements:**
- **Trust ML overlay:** Logistic-style classifier on admin-blocked-only labels — lightweight, flag-served, review-only output
- **Churn ML model:** Trained logistic regression on `churn_training_samples` — replaces deterministic score when flagged on
- **Matching-weight tuner:** Not a model per se — a lift-based gradient nudge on a fixed 5-weight vector, guardrailed by minimum sample sizes
- **Embedding matching:** 768-dim profile embeddings via the platform's existing vector-embedding service, cosine-KNN retrieval via pgvector
- **Community orchestrator:** LLM-based planner, not a trained model — schema-bounded output, allowlist-dispatched

**ML Pipeline (Trust & Churn):**
1. **Labeling:** Trust — admin-blocked accounts only; Churn — historical disengagement outcomes
2. **Training:** `POST /moderation/trust-model/{build,train}`, `POST /churn-risk/model/train` (admin-triggered, not automatic)
3. **Serving:** Behind their respective flags, both models only ever *adjust a score or status toward more scrutiny/risk* — never take an autonomous blocking or messaging action
4. **Monitoring:** Admin panels (`/admin/trust`, `/admin/churn`) surface score distributions and flag rates

### Security & Privacy

**Social Growth OS Privacy Safeguards:**
- **True opt-in only:** No social matching, pod formation, or leaderboard inclusion occurs without an explicit `allow_suggestions=true` consent row
- **Trust-model training data isolation:** Only human-reviewed, admin-confirmed blocked accounts train the ML overlay — no self-reinforcing loop from unreviewed automated flags
- **No auto-punitive AI action anywhere in this Epic:** every AI/ML surface (trust, churn, community orchestrator) either requires a human action to have real effect (trust ML: flag only) or is scope-limited to already-safe, reversible primitives (community orchestrator: pod status/role updates and anchor-only notifications)
- **Report data access:** `content_reports` visible only to the reporter (their own reports) and admins
- **Leaderboard component-score privacy:** per-pillar health-derived component scores are redacted from leaderboard views that previously leaked them (audit finding #9, fixed in H1)

---

## COMPETITIVE ANALYSIS

### Feature Parity Matrix

| Feature | Strava | WHOOP | Peloton | Balencia | Differentiation |
|---------|--------|-------|---------|---------|-----------------|
| **Auto-formed accountability groups** | ❌ (clubs are user-created) | ❌ | ❌ | ✅ **CORE USP** | AI-clustered by real compatibility, not manual club search |
| **Reputation beyond kudos/likes** | Kudos only | ❌ | ❌ | ✅ **CORE USP** | Consistency + pledge-adherence weighted, transparent, gaming-resistant |
| **True opt-in matching** | N/A | N/A | N/A | ✅ | Explicit consent gate, not opt-out-by-default |
| **Anti-cheat leaderboards** | Limited | ❌ | Limited | ✅ | Dual anomaly + trust-status exclusion on every ranking surface |
| **Bot/sybil trust scoring** | ❌ | ❌ | ❌ | ✅ **CORE USP** | Deterministic + ML overlay, admin-review-only by construction |
| **Autonomous community management** | ❌ | ❌ | ❌ | ✅ **CORE USP** | Schema-bounded LLM orchestration with deterministic fallback |

### Balencia's Social Growth Moat

**What Makes This Hard to Replicate:**
1. **Compatibility-based auto-formation, not manual club-joining** — pods form from real behavioral compatibility signals, not user self-selection into whatever club has the best marketing.
2. **Reputation that resists gaming by construction** — every ranking surface shares one anti-cheat exclusion predicate; reputation weights consistency and pledge-keeping over vanity actions.
3. **Safety-by-construction AI** — every AI/ML layer in this Epic is architecturally incapable of an unreviewed punitive action (trust ML: flag-only; community orchestrator: allowlist-only, deterministic-fallback).
4. **Consent sovereignty as a design invariant, not a policy** — enforced at the query level across every candidate-generation path, not just a settings toggle that's ignored downstream.

---

## TESTING STRATEGY

### Unit Testing
- Reputation score computation (weighted signal blending, clamping, tier classification)
- Consent-gate query construction (no missing-row-as-consent regression)
- Leaderboard anti-cheat predicate applied across all 7 ranking methods
- Trust scorer threshold logic and the ML-overlay ceiling (`ok → flagged` only)
- Matching-weight tuner guardrail thresholds (`MIN_SHOWN`, `MIN_ACCEPTED`)
- Community orchestrator plan validation (ID whitelisting, boolean coercion, cap enforcement)
- Feed humanizer fallback behavior for unknown event types

### Integration Testing
- Full pod formation → provisioning → join/leave lifecycle against a real DB
- Reputation recompute job → history append → breakdown API consistency
- Feed publish → fan-out (flag on) → read-path fallback (flag on, Redis unavailable)
- Report submission → auto-escalation → admin review action
- Community orchestrator: circuit-breaker-open, LLM-throw, malformed-JSON, and valid-plan paths all resolve correctly

### User Acceptance Testing
- Consent-aware empty state correctly reflects live opt-in status
- Leave-pod confirmation flow (no accidental leaves)
- "How is this calculated?" reputation transparency comprehension
- Report button availability and submission flow across all reportable content types

### Performance Testing
- Weekly formation job at scale (candidate pool sizing, clustering cost)
- Feed page load with and without `ENABLE_FEED_CACHE`/`ENABLE_FEED_FANOUT`
- Nightly trust sweep batch throughput (1,000 users/batch)
- Leaderboard materialization at increasing user counts

### A/B Testing
- `matcher_tuned_weights` — tuned vs. default matching weights, measuring acceptance-rate lift
- `churn_reengagement` — nudge vs. no-nudge, measuring 14-day re-engagement lift

---

## RISKS & MITIGATIONS

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| **Consent regression reintroduces implicit opt-in** | Critical | Low | Dedicated automated test asserting no candidate query treats a missing row as consent |
| **Trust ML overlay drifts toward auto-blocking behavior in a future change** | Critical | Low | Architectural test asserting the only writers to `status='blocked'` are the deterministic threshold and admin `setStatus()` |
| **Community orchestrator LLM proposes unsafe action outside allowlist** | Critical | Low | `executePlan()` has no dynamic dispatch — only 3 hardcoded method calls exist to call into |
| **Flag-gated feature enabled in production before data-sufficiency guardrails validated** | Medium | Medium | Recommended sequencing documented; weight tuner and churn model both self-gate on minimum sample sizes regardless of flag state |
| **Pod formation quality degrades at scale (candidate pool too small)** | High | Medium | `ENABLE_EMBEDDING_MATCHING` widens effective candidate pool via KNN retrieval; falls back gracefully if unavailable |
| **Reputation gaming via coordinated kudos exchange** | Medium | Medium | Kudos weighted low (0.5/0.25) relative to consistency/pledge signals (2/20); leaderboard anti-cheat exclusion is a separate, independent gate |
| **No dedicated audit table for community orchestrator actions** | Medium | Low | Documented as a known gap; structured logging captures every plan execution and fallback; can be promoted to a dedicated audit table (mirroring `tool_audit_log`) if compliance requirements demand it |
| **Users perceive pod auto-formation as invasive despite consent** | Medium | Low | Consent-aware empty state and explicit join/leave control ensure visibility and agency at every step |

---

## ROADMAP & FUTURE ENHANCEMENTS

### Current Scope (Shipped)
All 8 features (F13.1-13.8) as defined above — core functionality always-on, 9 advanced/scale/ML layers flag-gated for staged rollout.

### Immediate Next (Operational, not build work)
- Flip the 9 flags per the recommended sequencing as data validates each stage
- Monitor `matcher_tuned_weights` and `churn_reengagement` experiments to inform full rollout decisions
- Consider promoting community-orchestrator logging to a dedicated audit table if usage scales or compliance requires it

### Post-MVP v1.1 (+3 months)
- Dedicated `community_agent_log` audit table (parity with `tool_audit_log`)
- Extend the community orchestrator's allowlist (still bounded) if operational experience shows the current 3 primitives are too narrow
- Circle/Community-level chat and challenge surfaces beyond pod-level

### Post-MVP v1.2 (+6 months)
- Cross-pillar reputation weighting informed by E08 correlation findings
- Predictive pod-survival modeling (proposed in the original audit's "Agentic Opportunities" section, not yet built)
- Diversity/novelty re-ranking in matching to counter echo-chamber effects (audit finding Q4, not yet addressed)

### Post-MVP v2.0 (+12 months)
- Multi-agent community management (Matcher, Moderator, Engagement, Accountability, Health agents) as proposed in the audit's Wave 6 — the current orchestrator is a first, narrowly-scoped step toward this
- Cross-user anonymized benchmarking ("your pod's consistency is top 10%")

---

## DOCUMENT GOVERNANCE

**Review Schedule:** After each staged-rollout flag flip, reviewing the corresponding success metric before proceeding to the next flag
**Update Triggers:** Flag rollout outcomes, A/B experiment results, new audit findings, trust/churn model retraining cycles
**Version Control:** All feature/flag-state changes require a version increment with rationale
**Ownership:** Product Team + Backend/Platform Team + Trust & Safety review (for F13.7/F13.8 flag flips specifically)

---

## APPENDIX A: AUDIT DISPOSITION LEDGER

Selected high-severity findings from `docs/2026-06-10-social-intelligence-audit.md`, mapped to their disposition in `docs/2026-06-12-social-intelligence-implementation-status.md`. Full ledger (40+ findings) available in the source documents; this table covers the findings most load-bearing for this Epic's feature set.

| Audit Finding | Severity | Disposition | Feature |
|---|---|---|---|
| Activity feed write-sparse + read-unreachable (2 of 6 event types wired, no client page) | Critical | ✅ Shipped — 6 writers wired, `/feed` page live | F13.3 |
| No learning loop; matching weights hardcoded | Critical | ✅ Shipped — `matching_weights` + tuner, flag `ENABLE_MATCH_WEIGHT_TUNING` | F13.6 |
| `suggestion_accept_rate = 50.0` fabricated constant weighted into live scoring | Critical | ✅ Shipped — real `goal_action_responses` query, weight renormalization on zero data | F13.6 |
| Consent default inversion (missing row treated as consent) | High | ✅ Shipped — strict `allow_suggestions=true` join, all 4 queries + backfill migration | F13.6 |
| Pod membership auto-enrollment, no accept gate | High | ✅ Shipped — `/groups` client surface + explicit join/leave endpoints | F13.1 |
| Leaderboards rank unvalidated (anomaly/cheat) scores | High | ✅ Shipped — anomaly + trust-blocked exclusion on all 7 ranking methods | F13.6 |
| Leaderboards leak per-pillar component scores | High | ✅ Shipped — component-score redaction | F13.2/F13.6 |
| No message sanitization, rate limit, moderation, or toxicity detection | High | ✅ Shipped — `sanitizeUserText`, `screenAndAutoReport`, `content_reports`, follow-request limiter | F13.7 |
| Mentor role never assigned despite eligibility being computed | Medium | ✅ Shipped — `promoteEligibleMentors()` closes the loop | F13.5 |
| AI coach has zero social tools | Medium | ✅ Shipped — 8 social tools (`getMyPods`, `getMentorSuggestions`, etc.) | Cross-cutting |
| No bot/sybil prevention | Medium | ✅ Shipped — deterministic + ML trust scorer, flag `ENABLE_TRUST_ML` | F13.7 |
| No predictive churn/at-risk detection | — (opportunity, not a finding) | ✅ Shipped — deterministic + ML model, flags `ENABLE_CHURN_ML`/`ENABLE_CHURN_NUDGES` | F13.7 |
| Candidate `LIMIT` sampling causes recall collapse at scale | Critical | ✅ Shipped — embedding retrieve-then-rank, flag `ENABLE_EMBEDDING_MATCHING` | F13.6 |
| No multi-agent/autonomous community management | — (opportunity) | ✅ Shipped — schema-bounded orchestrator, flags `ENABLE_COMMUNITY_AGENT`/`ENABLE_COMMUNITY_ORCHESTRATOR` | F13.8 |
| Circle/Community tiers stubbed, only pod tier ever forms | Medium | ✅ Shipped — `parent_group_id` promotion chain | F13.1/F13.5 |
| Pod "encouragement" is fake-social (notifies only the at-risk user) | High | ✅ Shipped — real `rallyPodMates` + anchor-targeted remediation | F13.1 |

**Migrations shipped in support of this Epic:** `20260611000000` (consent backfill), `20260611001000` (suggestion instrumentation), `20260611002000` (content_reports), `20260612000000` (growth-group parent link), `20260612001000` (user_trust_signals), `20260612002000` (matching weights), `20260612003000` (experiments), `20260612004000` (user_churn_risk), `20260612005000` (user_match_embeddings, pgvector-conditional), `20260613001000` (churn_model_weights), `20260613002000` (trust_ml), `20260707000000` (reputation_score_history).

**New background jobs:** `match-weight-tuner` (daily), `churn-risk` (daily), `trust-sweep` (daily), `reputation-recompute` (daily), `group-health` (daily, includes tier promotion + mentor promotion + LLM guidance/orchestration).

**Verification state:** Server 309/309 suites (5,390+ tests), typecheck+lint clean. Client 46/46 suites (668 tests), typecheck 0 errors.

---

## APPENDIX B: FLAG REFERENCE (QUICK LOOKUP)

```
# server/.env.example — Social Growth OS staged-rollout flags (all default false)

ENABLE_FEED_CACHE=false               # F13.3 — 45s Redis cache of first feed page
ENABLE_FEED_FANOUT=false              # F13.3 — write-time fan-out to recipient feed lists
ENABLE_EMBEDDING_MATCHING=false       # F13.6 — pgvector cosine-KNN candidate retrieval
ENABLE_MATCH_WEIGHT_TUNING=false      # F13.6 — daily matching-weight learning loop
ENABLE_TRUST_ML=false                 # F13.7 — ML overlay on bot/sybil scorer (flag-only, never blocks)
ENABLE_CHURN_ML=false                 # F13.7 — trained churn-prediction model
ENABLE_CHURN_NUDGES=false             # F13.7 — re-engagement notification send (independent of ENABLE_CHURN_ML)
ENABLE_COMMUNITY_AGENT=false          # F13.8 — LLM-personalized anchor guidance text
ENABLE_COMMUNITY_ORCHESTRATOR=false   # F13.8 — LLM-planned pod remediation/archive/promote selection
```

---

*Balencia Platform - E13: Social Growth OS PRD v1.0*
*From Computed-But-Discarded to Shipped, Verified, and Staged for Rollout*
*Origin: `docs/2026-06-10-social-intelligence-audit.md` → `docs/2026-06-12-social-intelligence-implementation-status.md`*

---

*Document Classification: INTERNAL USE - Product Foundation*
*Created: 2026-07-08 | Epic Specification, Retroactive to Shipped Work (2026-06-05 through 2026-07-07)*
*Total Features: 8 | All Core-Shipped | 9 Flags Staged for Rollout*
