# Epic 13: Social Growth OS - Story Index

> **Epic:** E13 - Social Growth OS
> **Source:** `prd-epics/PRD-Epic-13-Social-Growth-OS.md`
> **Created:** 2026-07-08
> **Stories:** 16 (11 Must Have, 5 Should Have)

---

## Story Index

| Story ID | Title | Feature | Priority | Status | File |
|----------|-------|---------|----------|--------|------|
| S13.1.1 | Pod Formation & Consent-Gated Matching | F13.1 | P0 | Done | [View](S13-01-pod-formation-consent-matching.md) |
| S13.1.2 | Pod Join, Leave & Detail View | F13.1 | P0 | Done | [View](S13-02-pod-join-leave-detail.md) |
| S13.1.3 | Pod Health, Promotion & Archival | F13.1 | P0 | Done | [View](S13-03-pod-health-promotion-archival.md) |
| S13.2.1 | Reputation Score Computation & History | F13.2 | P0 | Done | [View](S13-04-reputation-score-computation.md) |
| S13.2.2 | Reputation Page — Charts, Leaderboard & Transparency | F13.2 | P0 | Done | [View](S13-05-reputation-page-charts-leaderboard.md) |
| S13.3.1 | Activity Feed Writers & Humanizer | F13.3 | P0 | Done | [View](S13-06-activity-feed-writers-humanizer.md) |
| S13.3.2 | Feed Scale Optimizations (Fan-Out & Cache) | F13.3 | P1 | Done | [View](S13-07-feed-scale-optimizations.md) |
| S13.4.1 | Social Rewards & XP Bridge | F13.4 | P0 | Done | [View](S13-08-social-rewards-xp-bridge.md) |
| S13.5.1 | Mentor Eligibility & Promotion | F13.5 | P0 | Done | [View](S13-09-mentor-eligibility-promotion.md) |
| S13.5.2 | Mentor Discovery & Group Hierarchy Tiers | F13.5 | P0 | Done | [View](S13-10-mentor-discovery-group-tiers.md) |
| S13.6.1 | Consent-Gated Matching & Anti-Cheat Leaderboards | F13.6 | P0 | Done | [View](S13-11-consent-matching-anticheat-leaderboards.md) |
| S13.6.2 | Embedding Matching & Weight Tuning | F13.6 | P1 | Done | [View](S13-12-embedding-matching-weight-tuning.md) |
| S13.7.1 | Message Sanitization, Content Screening & Reporting | F13.7 | P0 | Done | [View](S13-13-sanitization-screening-reporting.md) |
| S13.7.2 | Bot/Sybil Trust Scoring | F13.7 | P0 | Done | [View](S13-14-bot-sybil-trust-scoring.md) |
| S13.7.3 | Churn Prediction & Re-engagement Nudges | F13.7 | P1 | Done | [View](S13-15-churn-prediction-nudges.md) |
| S13.8.1 | Autonomous Community Orchestrator | F13.8 | P1 | Done | [View](S13-16-autonomous-community-orchestrator.md) |

**Status Summary:** Done: 16 | In Progress: 0
**Priority Summary:** P0 (Must Have): 11 | P1 (Should Have): 5

> **Staged-Rollout Callout:** All 16 stories are code-complete, tested, and merged (server 309/309 suites / 5,390+ tests, client 46/46 suites / 668 tests, both green). However, **9 feature flags gate advanced/scale/ML layers and default OFF in every environment** pending data-driven staged rollout — this is a deliberate operational posture, not incomplete work. A story being "Done" means the shipped code includes both the flag-on and flag-off (deterministic fallback) code paths, both tested. See each affected story's "Rollout Status" note under Open Questions.
>
> The 9 flags: `ENABLE_FEED_CACHE` · `ENABLE_FEED_FANOUT` · `ENABLE_EMBEDDING_MATCHING` · `ENABLE_MATCH_WEIGHT_TUNING` · `ENABLE_TRUST_ML` · `ENABLE_CHURN_ML` · `ENABLE_CHURN_NUDGES` · `ENABLE_COMMUNITY_AGENT` · `ENABLE_COMMUNITY_ORCHESTRATOR`

---

## Dependency Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    EPIC 13 STORY DEPENDENCIES                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  PHASE 1: TRUST & CONSENT FOUNDATION                                        │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                                                                      │  │
│  │  S13.6.1 (Consent Gate + Anti-Cheat) ──┬──▶ S13.7.1 (Sanitize/Report)│  │
│  │                                        └──▶ S13.7.2 (Bot/Sybil Trust)│  │
│  │                                                                      │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                   │                                         │
│                                   ▼                                         │
│  PHASE 2: GROUPS & PODS                                                     │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                                                                      │  │
│  │  S13.1.1 (Formation) ──▶ S13.1.2 (Join/Leave/Detail) ──▶            │  │
│  │                                              S13.1.3 (Health/Promo)  │  │
│  │                                                                      │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                   │                                         │
│                                   ▼                                         │
│  PHASE 3: REPUTATION                                                        │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                                                                      │  │
│  │  S13.2.1 (Score Computation) ──────▶ S13.2.2 (Page/Charts/Leaderboard)│ │
│  │                                                                      │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                   │                                         │
│                                   ▼                                         │
│  PHASE 4: SOCIAL FEED                                                       │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                                                                      │  │
│  │  S13.3.1 (Writers + Humanizer) ────▶ S13.3.2 (Fan-Out + Cache, P1)  │  │
│  │                                                                      │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                   │                                         │
│                                   ▼                                         │
│  PHASE 5: REWARDS BRIDGE                                                    │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                                                                      │  │
│  │  S13.4.1 (Social Rewards & XP Bridge)                                │  │
│  │                                                                      │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                   │                                         │
│                                   ▼                                         │
│  PHASE 6: MENTORS & COMMUNITY TIERS                                         │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                                                                      │  │
│  │  S13.5.1 (Eligibility & Promotion) ──▶ S13.5.2 (Discovery & Tiers)   │  │
│  │                                                                      │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                   │                                         │
│                                   ▼                                         │
│  PHASE 7: ADVANCED MATCHING (flag-gated)                                    │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                                                                      │  │
│  │  S13.6.2 (Embedding Retrieval + Weight Tuning)                       │  │
│  │                                                                      │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                   │                                         │
│                                   ▼                                         │
│  PHASE 8: CHURN PREDICTION (flag-gated)                                     │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                                                                      │  │
│  │  S13.7.3 (Churn Prediction & Re-engagement Nudges)                   │  │
│  │                                                                      │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                   │                                         │
│                                   ▼                                         │
│  PHASE 9: AUTONOMOUS COMMUNITY ORCHESTRATOR (fully flag-gated)              │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                                                                      │  │
│  │  S13.8.1 (LLM Plan → Allowlisted Dispatch → Deterministic Fallback) │  │
│  │                                                                      │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Feature → Story Coverage Matrix

| Epic Feature | Story ID(s) | Coverage |
|--------------|-------------|----------|
| F13.1: Groups & Pods | S13.1.1 - S13.1.3 | 100% |
| F13.2: Reputation System | S13.2.1 - S13.2.2 | 100% |
| F13.3: Social Feed | S13.3.1 - S13.3.2 | 100% |
| F13.4: Rewards & Gamification Bridge | S13.4.1 | 100% |
| F13.5: Mentors & Community Tiers | S13.5.1 - S13.5.2 | 100% |
| F13.6: Matching & Anti-Cheat | S13.6.1 - S13.6.2 | 100% |
| F13.7: Trust & Safety | S13.7.1 - S13.7.3 | 100% |
| F13.8: Autonomous Community Orchestrator | S13.8.1 | 100% |

---

## Implementation Sequence

### Sprint 1: Trust & Consent Foundation
| Order | Story | Rationale |
|-------|-------|-----------|
| 1 | S13.6.1 | Consent gate + anti-cheat predicate — every downstream candidate query and ranking surface depends on this |
| 2 | S13.7.1 | Message sanitization + report pipeline — safety substrate required before any social surface goes live |
| 3 | S13.7.2 | Bot/sybil trust scoring — `user_trust_signals.status` is the shared exclusion key used everywhere below |

### Sprint 2: Groups & Pods
| Order | Story | Rationale |
|-------|-------|-----------|
| 4 | S13.1.1 | Pod formation — consumes the consent + trust gates from Sprint 1 |
| 5 | S13.1.2 | Join/leave/detail client surface — the direct fix for "pods form silently" |
| 6 | S13.1.3 | Health, promotion, archival — ongoing lifecycle management |

### Sprint 3: Reputation
| Order | Story | Rationale |
|-------|-------|-----------|
| 7 | S13.2.1 | Score computation + history — feeds mentor eligibility and leaderboards |
| 8 | S13.2.2 | `/reputation` page — charts, leaderboard, mentor discovery entry point |

### Sprint 4: Social Feed & Rewards
| Order | Story | Rationale |
|-------|-------|-----------|
| 9 | S13.3.1 | Feed writers + humanizer — core always-on event surfacing |
| 10 | S13.4.1 | Social rewards & XP bridge — publishes into the feed built in the prior story |

### Sprint 5: Mentors & Community Tiers
| Order | Story | Rationale |
|-------|-------|-----------|
| 11 | S13.5.1 | Mentor eligibility & promotion — closes the loop reputation computed but never assigned |
| 12 | S13.5.2 | Mentor discovery & group hierarchy tiers — user-facing surfacing of Sprint 5.1's output |

### Sprint 6: Staged-Rollout Enhancements (flag-gated, P1)
| Order | Story | Rationale |
|-------|-------|-----------|
| 13 | S13.3.2 | Feed fan-out + hot-page cache — scale optimization, no functional change at low scale |
| 14 | S13.6.2 | Embedding matching + weight tuning — candidate-quality upgrade, needs real acceptance data |
| 15 | S13.7.3 | Churn prediction & re-engagement nudges — needs A/B validation before full send |
| 16 | S13.8.1 | Autonomous Community Orchestrator — highest-autonomy layer, ships last in the sequence |

---

*Epic 13: Social Growth OS Stories Index | Balencia Platform | 2026-07-08*
