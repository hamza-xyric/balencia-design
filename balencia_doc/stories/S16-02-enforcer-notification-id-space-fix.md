---
type: story
id: S16.1.2
title: Enforcer Notification ID-Space Resolution Fix
epic: E16
epic_name: Accountability Contract Hardening, Witness Verification & Analytics Engine
feature: F16.1
feature_name: Contract Lifecycle State Machine
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S16.1.2: Enforcer Notification ID-Space Resolution Fix

## User Story

**As a** user whose accountability contract has just been violated,
**I want to** the system to resolve my enforcer's real, verified account ID before attempting to notify them — never a raw contact-record ID,
**So that** notifications reliably reach the right person instead of silently failing behind a masked false-success flag.

---

## Story Type

- [ ] Feature
- [ ] Enhancement
- [x] Technical
- [ ] Integration

## Priority

- [x] Must Have (P0)
- [ ] Should Have (P1)

---

## Scope Description

**Remediates:** C-7 (social consequences structurally impossible — partial, the ID-space half), discovered during the F16.1 lifecycle/ownership review.

**Problem (pre-remediation):** The enforcer-notification path was passing an `accountability_contacts` row ID into a code path that required a `users` row ID, causing silent notification-insert failures (Postgres `23503` foreign-key violation). Critically, the code still recorded `enforcers_notified=true` regardless — a false audit record layered directly on top of a broken reference. This is a wrong-ID-space bug, **not** a cross-user access hole; contract ownership scoping was separately confirmed airtight (S16.1.1).

**What shipped:** `accountability-contract.service.ts:1330-1335`, inside `notifyEnforcers`, now resolves a verified `users.id` before any notification insert is attempted:

```sql
SELECT contact_user_id FROM accountability_contacts
WHERE id = $1 AND user_id = $2 AND is_active = true AND accepted_at IS NOT NULL
```

- The notification insert never fires against an unresolved or invalid ID — if the query returns no row, the notification is silently skipped (no `23503`, no crash).
- `enforcers_notified` is only ever set `true` when the actual notified-count is `> 0` (co-owned with S16.7.2's audit-honesty work, since this is the same underlying counter).
- The `accepted_at IS NOT NULL` predicate baked into this exact query is also the consent-gate enforcement point for S16.4.1 (Enforcer Acceptance Handshake) — the ID-resolution fix and the consent gate are the same line of code by design, so a future regression cannot reintroduce the ID-space bug without also reopening the consent hole (and vice versa), making the two mistakes structurally coupled to fix together.

---

## Acceptance Criteria

```gherkin
Scenario: Notification resolves a real users.id before insert
  Given a contract violation that should notify an enforcer
  When notifyEnforcers runs
  Then it resolves contact_user_id via accountability_contacts, never the contact row's own id
  And the notification insert targets that resolved users.id

Scenario: Unresolved or invalid contact is skipped, not crashed
  Given an enforcer contact whose contact_user_id cannot be resolved (inactive, unaccepted, or missing)
  When notifyEnforcers runs
  Then no notification insert is attempted for that contact
  And no 23503 foreign-key violation occurs
  And enforcers_notified is not set true on the strength of this contact alone

Scenario: enforcers_notified reflects only real sends
  Given zero enforcers were successfully notified for a violation
  When the violation record is finalized
  Then enforcers_notified is false, not assumed true
```

---

## Success Metrics

- Enforcer notifications with unresolved/invalid `users.id`: 0 (down from silent 100% failure pre-fix)
- `23503` FK-violation rate on `notifications` insert from the accountability path: 0
- `enforcers_notified=true` records where zero enforcers were actually notified: 0

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Enforcer notification delivery <2s per accepted contact | Consent gate (`accepted_at IS NOT NULL`) enforced at the query level, not just app logic | Notification targets only a resolved, verified `users.id` | N/A (backend fix) | No schema change; query-level fix only |

---

## Dependencies

- **Prerequisite Stories:** S16.1.1 (shares the contract lifecycle context that triggers this path)
- **Related Stories:** S16.4.1 (same query enforces the consent gate), S16.7.2 (shares `enforcers_notified` honesty requirement)
- **External Dependencies:** `accountability_contacts` table, `notifications` insert pipeline
- **Remediates:** C-7 (ID-space half)

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| Enforcer notification targets an unaccepted/invalid contact | `contact_user_id` resolves to `NULL` or row not found | Notification silently skipped, no FK violation, no false `enforcers_notified=true` | None sent to invitee; contract owner sees accurate enforcer-notified count in Deep Mode |
| Notification send throws for one enforcer but succeeds for another | Per-recipient try/catch in `notifyEnforcers` | `enforcers_notified` reflects partial success accurately (count > 0 from successful sends) | Owner's audit view shows accurate notified-count, not all-or-nothing |
| Regression reintroduces the ID-space mistake in a new notification path | Would require deliberately duplicating the vulnerable pattern | N/A — mitigated by design (ID-resolution and consent-gate are the same query) | N/A |

---

## Open Questions

None — this is a closed, verified bug fix with regression coverage.

---

## Definition of Done

- [x] Acceptance criteria met
- [x] `notifyEnforcers` resolves a verified `users.id` via `accountability_contacts.contact_user_id` before any notification insert
- [x] `23503` FK-violation rate on the notifications insert path confirmed at 0 in prod monitoring
- [x] `enforcers_notified` never assumed true; set only on actual successful send count > 0
- [x] Regression test covers unresolved/invalid contact skip path
- [x] No dead code, no console logs

---

*Story S16.1.2 | Epic E16 | Product: Balencia Platform*
