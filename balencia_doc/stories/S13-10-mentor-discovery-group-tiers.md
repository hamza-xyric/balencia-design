---
type: story
id: S13.5.2
title: Mentor Discovery & Group Hierarchy Tiers
epic: E13
epic_name: Social Growth OS
feature: F13.5
feature_name: Mentors & Community Tiers
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S13.5.2: Mentor Discovery & Group Hierarchy Tiers

## User Story

**As a** new pod member,
**I want to** browse a directory of active/eligible mentors in my pillar and see the group hierarchy (pod → circle → community) as pods graduate,
**So that** I can find real guidance and understand where my group stands in the broader community.

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

**Mentor discovery** (`reputation.service.ts:getMentors()`): queries `user_reputation` for `mentor_status IN ('active','eligible')`, opt-in gated, trust-gated (excludes flagged/blocked accounts — shared exclusion with S13.6.1/S13.7.2), shared-pillar-first ordering, excludes self and existing connections.

- Endpoint: `GET /reputation/mentors`
- Client: `MentorsSection.tsx`, rendered inside `/reputation` (S13.2.2)
- Also exposed as an AI-coach agentic tool: `getMentorSuggestions` (`server/src/services/langgraph-tools/domains/social.ts`)

**Group hierarchy tier** (recap of the mechanism built in S13.1.3): `growth_groups.tier IN ('pod','circle','community')` + `parent_group_id`, promoted by `promotePodsToCircles()` / `promoteCirclesToCommunities()`. Membership always stays pod-level; circle/community "membership" is a roll-up view, not a separate join table.

Client: `TierCards.tsx` (`CirclesPanel` / `CommunitiesPanel`), rendered inside `/groups` (S13.1.2), conditionally visible only once the user belongs to a group at that tier.

---

## Acceptance Criteria

```gherkin
Scenario: Mentor discovery excludes trust-flagged/blocked accounts
  Given a mentor-eligible user has user_trust_signals.status = 'blocked'
  When getMentors() is called
  Then that user does not appear in the results

Scenario: Mentor cards are shared-pillar-first ordered
  Given a requesting user's primary pillar is "fitness"
  When they view the Mentors tab
  Then mentors active in the "fitness" pillar are ordered ahead of mentors from other pillars
  (not global-random ordering)

Scenario: Mentor discovery respects consent
  Given a user has not opted in to buddy discovery
  When getMentors() evaluates their eligibility as a discoverable mentor
  Then they are excluded from other users' mentor discovery results

Scenario: Self and existing connections excluded
  Given a requesting user is already connected to a mentor, or the "mentor" is themselves
  When getMentors() is called
  Then that entry is excluded from the returned list

Scenario: No mentors available in a pillar
  Given zero eligible/active mentors exist for a user's pillar
  When they view the Mentors tab
  Then an empty state is shown: "No mentors in this area yet — check back as the community grows."

Scenario: Circles/Communities tabs appear only when earned
  Given a user has zero circle-tier groups
  Then the Circles tab is not rendered on /groups
  When their pod graduates to circle tier
  Then the Circles tab appears showing that group
```

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Mentor discovery engagement | 30% of new pod members view the Mentors tab within 14 days | Page-view analytics |
| Mentor-initiated contact rate | 20% of mentor-card views result in a message/connection | Client interaction tracking |
| Pod → Circle → Community graduation | 20% pod→circle within 90 days, 10% circle→community within 180 days | Promotion job output (shared with S13.1.3) |

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| `readLimiter` on `GET /reputation/mentors` | Trust/consent exclusion applied server-side, never client-filtered | Mentor cards show only public-facing profile info | Mentor cards keyboard-navigable, "message" action has visible focus state | Responsive 360px–ultrawide |
| | AI-coach tool (`getMentorSuggestions`) applies the identical filter as the HTTP endpoint | | | |

---

## Dependencies

- **Prerequisite Stories:** S13.5.1 (mentor eligibility/promotion), S13.1.3 (group tier promotion mechanics)
- **Related Stories:** S13.2.2 (hosts the Mentors tab), S13.6.1/S13.7.2 (trust/consent exclusion)
- **External Dependencies:** AI-coach `langgraph-tools/domains/social.ts`

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|--------------------|---------------------|
| No mentors available in a pillar | `getMentors()` returns zero rows for the filter | Show empty state, not an error | "No mentors in this area yet — check back as the community grows." |
| Client/server tier threshold drift | Automated test comparing `STATUS_TIERS` constants (shared with S13.2.2) | Build-time failure, not a runtime bug | N/A — caught before ship |
| Mentor discovery requested via AI-coach tool for an opted-out requester | `getMentorSuggestions` applies the same consent/trust filter as the HTTP path | Tool returns an honest empty/limited result, never bypasses the filter | Coach explains discovery requires buddy-discovery consent |
| Circle exists but has zero remaining active pods (all archived) | Roll-up query finds no active pod children | Circle shown with a "no active pods" indicator rather than disappearing entirely | Transparent state, not a silent hide |

---

## Open Questions

- None outstanding — mentor discovery and group hierarchy tiers are fully shipped and always-on (no flag).

---

## Definition of Done

- [x] Acceptance criteria met
- [x] Trust/consent exclusion verified identical between HTTP endpoint and AI-coach tool
- [x] Shared-pillar-first ordering tested
- [x] Circles/Communities tab conditional visibility tested
- [x] Unit + integration tests green (server + client suites)

---

*Story S13.5.2 | Epic E13 | Product: Balencia Platform*
