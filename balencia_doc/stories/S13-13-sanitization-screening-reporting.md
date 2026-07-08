---
type: story
id: S13.7.1
title: Message Sanitization, Content Screening & Reporting Pipeline
epic: E13
epic_name: Social Growth OS
feature: F13.7
feature_name: Trust & Safety
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S13.7.1: Message Sanitization, Content Screening & Reporting Pipeline

## User Story

**As a** Holistic Health Seeker joining a pod of strangers,
**I want** confidence that the platform actively filters out harmful markup and gives me a simple way to report anything that slips through,
**So that** a social feature never becomes the reason I feel unsafe using the app.

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

**Message sanitization** (`server/src/utils/sanitize.ts`, `sanitizeUserText()`): strips dangerous block tags (`script`, `style`, `iframe`, `object`, `embed`, `noscript`, `template`), void tags (`link`, `meta`, `base`), inline `on*=` handlers, and `javascript:`/`vbscript:`/`data:text/html` URIs. Applied on both message creation and edit in `message.service.ts`.

**Lightweight content screening** (`server/src/utils/content-screen.ts`, `screenText()`): regex-based severity classifier — `high` for threat/self-harm/harassment patterns, `low` for a mild profanity list. Explicitly documented as non-blocking by design: *"it intentionally does NOT block content on its own... For production-grade moderation, swap in a hosted toxicity model behind this interface."* Wired via `content-moderation.service.ts:screenAndAutoReport()`, which auto-inserts a system report (`reporter_id = NULL`, `reason='auto_screen'`) into `content_reports` when flagged.

**Report pipeline** (`content_reports` table, migration `20260611002000_content_reports.sql`): `contentType IN (message | community_post | community_reply | feed | user | group)`, `severity` auto-escalated to `high` for `harassment/hate/threat/self_harm/violence` reasons.

- Client: reusable `<ReportButton contentType contentId>` component, present on feed items, community content, and chat messages
- Server: `POST /moderation/report` (any authenticated user), `GET /moderation/reports` / `PATCH /moderation/reports/:id` (admin-only), `status IN (pending|reviewed|actioned|dismissed)`
- Admin UI: `/admin/moderation`

**Follow-request rate limit**: `followRequestLimiter` in `follow.routes.ts` — 30 requests/hour/user, applied to `POST /follow/:userId`.

---

## Acceptance Criteria

```gherkin
Scenario: Sanitization applied on create and edit
  Given a user submits a message containing a <script> tag
  When the message is created
  Then sanitizeUserText() strips the block tag before persistence
  And the same sanitization applies when the message is later edited

Scenario: Content screening is non-blocking
  Given a message contains a high-severity pattern (e.g. threat language)
  When it is submitted
  Then the message is still delivered (screenAndAutoReport is fire-and-forget)
  And a system report is auto-inserted into content_reports with reason='auto_screen'

Scenario: High-severity report reasons auto-escalate
  Given a user submits a report with reason='harassment'
  When it is inserted into content_reports
  Then severity is automatically set to 'high' without waiting for admin triage

Scenario: Report button available on every reportable type
  Given content of type message, community_post, community_reply, feed, user, or group
  Then a ReportButton is rendered wherever that content type appears in the UI

Scenario: Duplicate report blocked
  Given a user has already reported a specific piece of content
  When they attempt to report it again
  Then the second insert no-ops via the unique index: "You've already reported this."

Scenario: Follow-request rate limit enforced
  Given a user has sent 30 follow requests within the last hour
  When they attempt a 31st
  Then the request is rejected with 429: "Too many follow requests. Please slow down and try again later."

Scenario: Admin review action
  Given an admin views the moderation queue
  When they PATCH a report's status to 'actioned'
  Then the report status updates and is reflected in /admin/moderation
```

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Report resolution time | 90% of `high`-severity reports reviewed within 24h | `content_reports` timestamp delta |
| Report button coverage | 100% of reportable content types have a functioning ReportButton | Automated UI audit |

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| `screenAndAutoReport()` is fire-and-forget, never blocks the message send path | `sanitizeUserText()` applied server-side on every create/edit — never trusted client-side only | `content_reports` visible only to the reporter (their own reports) and admins | ReportButton is keyboard-accessible with clear labeling | N/A |
| Follow-request limiter: 30/hour/user | Duplicate reports blocked via unique index | | | |

---

## Dependencies

- **Prerequisite Stories:** None (foundational safety substrate)
- **Related Stories:** S13.3.1 (feed content is a reportable type, shares sanitization pattern), S13.7.2 (shares the trust-signal exclusion model)
- **External Dependencies:** Admin dashboard infrastructure (`/admin/moderation`)

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|--------------------|---------------------|
| Duplicate report on same content by same user | Unique index on `content_reports` | Second insert no-ops | "You've already reported this." |
| Content screen misses a genuinely harmful message | User report after the fact | Manual report path still available and takes priority over auto-screen | Standard report flow, reviewed by admin |
| Follow-request limiter hit | Rate limiter rejects | 429 with clear message, request not queued or silently dropped | "Too many follow requests. Please slow down and try again later." |
| Auto-screen false positive on benign content | `screenText()` regex over-triggers | Content is still delivered (non-blocking by design); auto-report simply adds a low-priority admin queue entry, dismissible | No user-facing impact — sender is never blocked or notified |
| Sanitization strips legitimate formatting the user intended | `sanitizeUserText()` over-strips | Accepted tradeoff — only dangerous tags/attributes are targeted; plain text and standard formatting pass through unaffected | N/A |

---

## Open Questions

- None outstanding — sanitization, screening, and the report pipeline are fully shipped and always-on (no flag).

---

## Definition of Done

- [x] Acceptance criteria met
- [x] Sanitization verified on both message create and edit paths
- [x] Content screening verified non-blocking (fire-and-forget)
- [x] High-severity auto-escalation tested
- [x] Duplicate-report unique-index behavior tested
- [x] Follow-request rate limit tested (30/hour/user)
- [x] Unit + integration tests green (server + client suites)

---

*Story S13.7.1 | Epic E13 | Product: Balencia Platform*
