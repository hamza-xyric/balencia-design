---
type: story
id: S13.3.1
title: Activity Feed Writers & Humanizer
epic: E13
epic_name: Social Growth OS
feature: F13.3
feature_name: Social Feed
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S13.3.1: Activity Feed Writers & Humanizer

## User Story

**As a** Busy Professional,
**I want to** see a lightweight, tasteful stream of my pod's and friends' real wins — a streak milestone, a competition win, a pod join —
**So that** I feel part of something without being pulled into a noisy, addictive social feed.

---

## Story Type

- [x] Feature
- [ ] Enhancement
- [ ] Technical
- [ ] Integration

## Priority

- [x] Must Have (P0)
- [ ] Should Have (P1)

---

## Scope Description

This story fixes the audit's finding that the feed had only 2 of ~6 declared event types ever actually written, and no client page existed to read it at all.

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

**Client surface:** `/feed` (`FeedExperience.tsx`) — cinematic live-stat hero, dynamic filter tabs, keyset-paginated day-grouped timeline with seamless infinite scroll, backed by `useFeed.ts`.

**Kudos reactions:** idempotent per user/feed-item via a unique constraint on `activity_feed_reactions`.

**Publish process (high-level):**
```
1. Triggering service calls socialFeedService.publish(actorUserId, { eventType, visibility, payload })
2. INSERT INTO activity_feed (actor_id, event_type, visibility, payload, created_at)
3. Client humanizes each row via feed-content.ts EVENT_META map before rendering
   — server never ships pre-rendered prose
```

---

## Acceptance Criteria

```gherkin
Scenario: All six event types have live writers
  Given each of the six declared FeedEventTypes
  Then a real user action (pledge, achievement, streak tier, competition win, pod join, tier promotion) triggers a corresponding activity_feed write
  And no declared event type among the wired set is a dead writer

Scenario: Humanizer never crashes on unknown event type
  Given an activity_feed row with an event_type not present in EVENT_META
  When the client renders it
  Then fallbackMeta() is used
  And no raw enum value is shown to the user

Scenario: Malformed feed row is dropped, not rendered broken
  Given a feed row fails FeedItemSchema.safeParse
  When the feed is fetched
  Then that row is dropped and logged
  And the rest of the feed renders normally

Scenario: Kudos reaction is idempotent
  Given a user has already reacted to a feed item
  When they react again (double-tap race)
  Then the second insert no-ops via the unique constraint
  And the reaction count stays correct with no error shown

Scenario: Visibility respected
  Given a feed event has visibility='pod'
  When a user outside that pod requests the feed
  Then that event never appears in their feed

Scenario: Feed page is keyset-paginated and day-grouped
  Given a user scrolls the feed
  Then pagination uses a keyset cursor, never an offset
  And items are grouped by day with seamless infinite scroll
```

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Feed events per active user/week | ≥1 real event surfaced per pod member/week | `activity_feed` write-rate by event type |
| Kudos engagement | 25% of feed viewers react to at least one item | `activity_feed_reactions` / page views |

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Feed page load (cache off) <500ms keyset query | Feed content passes through `sanitizeUserText()` (S13.7.1) where user-generated text is involved | Friends-only and pod-only events never leak to unrelated users | Filter tabs keyboard-navigable | Responsive 360px–ultrawide |
| Kudos reactions idempotent under race | Feed is itself a `content_reports` reportable type (S13.7.1) | | | |

---

## Dependencies

- **Prerequisite Stories:** S13.1.1/S13.1.3 (pod join/tier events), S13.4.1 (pledge/reward events)
- **Related Stories:** S13.3.2 (scale optimizations layered on top of this writer path), S13.7.1 (sanitization/reporting shared infrastructure)
- **External Dependencies:** `user_follows` (friends visibility), `growth_group_members` (pod visibility)

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|--------------------|---------------------|
| Unknown/future event type reaches client | `EVENT_META` lookup miss | Render `fallbackMeta()` generic card | Neutral, non-technical copy — no raw enum shown |
| Malformed feed row from DB | `FeedItemSchema.safeParse` fails | Drop the row, log, continue rendering the rest | Feed simply has one fewer item, no error banner |
| Kudos double-tap (race) | Unique constraint on `activity_feed_reactions` | Second insert no-ops, returns existing state | Reaction count stays correct, no error shown |
| Feed publish fails after a triggering action already committed (e.g. XP awarded) | Exception in `publish()` | XP/pledge state stands; feed publish retried async, never silently lost | User still sees reward toast; feed item may appear with slight delay |

---

## Open Questions

- None outstanding for the core writer/humanizer path — fully shipped and always-on (no flag).
- **Rollout Status:** Two scale optimizations layered on top of this writer path (`ENABLE_FEED_CACHE`, `ENABLE_FEED_FANOUT`) are shipped but default off — see S13.3.2. This story's read path works identically with or without those flags.

---

## Definition of Done

- [x] Acceptance criteria met
- [x] All six event types verified with a real live caller (no dead writers)
- [x] Humanizer fallback and malformed-row-drop behavior unit tested
- [x] Kudos idempotency verified under concurrent requests
- [x] Visibility (friends/pod/public) enforced end-to-end, tested
- [x] Keyset pagination verified (no offset-based queries)
- [x] Unit + integration tests green (server + client suites)

---

*Story S13.3.1 | Epic E13 | Product: Balencia Platform*
