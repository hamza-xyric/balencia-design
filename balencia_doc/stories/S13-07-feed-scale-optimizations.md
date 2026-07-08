---
type: story
id: S13.3.2
title: Feed Scale Optimizations (Fan-Out & Cache)
epic: E13
epic_name: Social Growth OS
feature: F13.3
feature_name: Social Feed
product: yhealth-platform
priority: P1
status: Done
created: 2026-07-08
---

# S13.3.2: Feed Scale Optimizations (Fan-Out & Cache)

## User Story

**As a** platform operator,
**I want** the feed to scale via write-time fan-out and a hot-page cache once user volume warrants it,
**So that** feed reads stay fast under real load without changing behavior for users at current scale.

---

## Story Type

- [ ] Feature
- [x] Enhancement
- [x] Technical
- [ ] Integration

## Priority

- [ ] Must Have (P0)
- [x] Should Have (P1)

---

## Scope Description

Both optimizations are shipped, tested, and **flag-gated off by default** — they change performance characteristics, not functionality.

**Fan-out-on-write** (flag `ENABLE_FEED_FANOUT`, default off): on `publish()`, resolves entitled recipients by visibility (friends via `user_follows`, pod via `growth_group_members`) and pushes the new feed id onto each recipient's Redis list `feed:fanout:<userId>` (capped 200 items, 30-day TTL, via `redisCacheService.listPushTrim`). Read path falls back to the normal keyset query automatically if the Redis list is empty.

**Hot-page cache** (flag `ENABLE_FEED_CACHE`, default off): caches only the first canonical feed page (no cursor/filter) under `feed:p1:<userId>`, 45-second TTL; invalidated immediately on a fresh kudos reaction so counts never go visibly stale.

**Read process (high-level):**
```
GET /feed:
  IF ENABLE_FEED_CACHE AND canonical first page requested:
    TRY Redis 'feed:p1:<userId>' (45s TTL) → return if hit
  IF ENABLE_FEED_FANOUT:
    TRY Redis 'feed:fanout:<userId>' list → merge with own/public events
    IF empty → fall back to keyset DB query
  ELSE:
    keyset DB query (getFeedRows), day-grouped
```

Both flags degrade gracefully: a Redis failure never blocks `publish()` (fan-out is best-effort), and cache misses fall straight through to the DB query with no user-visible impact.

---

## Acceptance Criteria

```gherkin
Scenario: Fan-out write is best-effort and non-blocking
  Given ENABLE_FEED_FANOUT is true and Redis is unavailable
  When socialFeedService.publish() is called
  Then the activity_feed row is still inserted successfully
  And no error is surfaced to the triggering action or the user

Scenario: Fan-out list empty falls back to keyset query
  Given ENABLE_FEED_FANOUT is true and a user's feed:fanout:<userId> Redis list is empty
  When GET /feed is called
  Then the read path falls through to the normal keyset DB query
  Regardless of flag state

Scenario: Hot-page cache hit
  Given ENABLE_FEED_CACHE is true and a cached feed:p1:<userId> entry exists (<45s old)
  When the canonical first page is requested
  Then the cached page is returned without hitting the DB

Scenario: Cache invalidation on new kudos
  Given ENABLE_FEED_CACHE is true and a user reacts to a feed item
  Then feed:p1:<actorUserId> is invalidated immediately
  So the next fetch reflects the updated reaction count

Scenario: Fan-out capped at 200 items with 30-day TTL
  Given a highly active recipient accumulates more than 200 fanned-out feed ids
  When listPushTrim runs
  Then the list is trimmed to the most recent 200 items

Scenario: Both flags off (default)
  Given ENABLE_FEED_CACHE and ENABLE_FEED_FANOUT are both false
  When GET /feed is called
  Then behavior is identical to S13.3.1's baseline keyset query path
```

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Page-1 cache hit rate (once `ENABLE_FEED_CACHE` on) | ≥70% at rollout scale | Redis hit/miss counters |
| Fan-out write amplification (once `ENABLE_FEED_FANOUT` on) | <5 recipient writes/publish at pod scale (3-8 members) | `fanOut()` call instrumentation |
| Feed page load (`ENABLE_FEED_CACHE` on) | <50ms on cache hit | Redis-served, 45s TTL |

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Cache TTL 45s, fan-out TTL 30 days | Redis keys scoped per-user, no cross-user leakage | Fan-out visibility resolution respects the same friends/pod rules as the base publish | N/A (backend optimization) | Requires Redis; graceful no-op if absent |
| Fan-out list capped at 200 items/recipient | | | | |

---

## Dependencies

- **Prerequisite Stories:** S13.3.1 (base writer/read path this layers on top of)
- **Related Stories:** None
- **External Dependencies:** Redis infrastructure (required for both flags; graceful no-op if absent)

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|--------------------|---------------------|
| Redis unavailable (fan-out/cache flags on) | Connection error on `listPushTrim`/`get` | Skip cache/fan-out silently, fall through to DB query | No user-visible impact, feed still loads |
| Cache serves stale reaction count outside the 45s window edge case | TTL expiry | Cache expires naturally at 45s; kudos invalidates immediately regardless | Reaction counts self-correct within 45s worst case |
| Fan-out recipient resolution changes mid-flight (e.g. user leaves pod during publish) | Race between membership change and fan-out write | Best-effort — recipient list is a point-in-time snapshot; next publish reflects updated membership | No user-facing impact, self-corrects on next event |

---

## Open Questions

- **Rollout Status:** Both `ENABLE_FEED_CACHE` and `ENABLE_FEED_FANOUT` default `false` in every environment. Per the PRD's recommended sequencing, `ENABLE_FEED_CACHE` is the first flag scheduled to flip (lowest-risk — pure scale optimization with no functional difference at current scale); `ENABLE_FEED_FANOUT` follows once cache behavior is validated in production.
- No open build questions — code for both flag states is complete and tested.

---

## Definition of Done

- [x] Acceptance criteria met
- [x] Redis-unavailable fallback tested for both fan-out and cache paths
- [x] Cache invalidation on kudos reaction verified
- [x] Fan-out list cap (200 items, 30-day TTL) verified
- [x] Both-flags-off baseline behavior verified identical to S13.3.1
- [x] Unit + integration tests green (server suite)
- [ ] Flags flipped in production (pending staged rollout — operational, not a build task)

---

*Story S13.3.2 | Epic E13 | Product: Balencia Platform*
