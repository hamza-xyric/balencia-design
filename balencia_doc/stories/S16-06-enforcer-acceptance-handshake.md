---
type: story
id: S16.4.1
title: Enforcer Acceptance Handshake
epic: E16
epic_name: Accountability Contract Hardening, Witness Verification & Analytics Engine
feature: F16.4
feature_name: Enforcer Acceptance Handshake
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S16.4.1: Enforcer Acceptance Handshake

## User Story

**As** someone a friend has added as their accountability enforcer,
**I want to** be asked and explicitly accept before I start receiving alerts about their contract violations,
**So that** I'm never surprised by a role I never agreed to play.

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

**Remediates:** C-7 (social consequences structurally impossible — the consent half), R-6 (recipients of alerts never consented)

**Problem (pre-remediation):** Social consequences were structurally impossible to fire safely: consent defaults (`allow_failure_alerts`, `allow_sos_alerts`, per-contact `allow_failure`, `is_emergency_contact`) all defaulted to `false` with no UI path to turn them on, contacts could be added unilaterally with no acceptance step, and trigger messages were sent in the user's own first-person voice (misrepresenting authorship to the recipient).

**What shipped:**
- Consent service, `server/src/services/accountability-consent.service.ts`, managing `ConsentSettings` (`enabled`, `allow_motivation_reminders`, `allow_failure_alerts`, `allow_sos_alerts`, `sos_inactivity_days`, `sos_message`, `ai_intervene_first`, `global_cooldown_hours`) and `AccountabilityContact` (now including `accepted_at: Date | null`).
- Three-step handshake flow:
  1. `addContact(userId, contact)` (line ~292) creates the contact row with `accepted_at = NULL` and fires an invitation notification to the invitee.
  2. `getPendingInvitations(invoteeId)` (line ~435) surfaces outstanding invitations to the invited person.
  3. `respondToInvitation(userId, contactId, accept)` (line ~467) — the invitee explicitly accepts or declines; only on accept does `accepted_at` get set.
- Enforcement point (shared with S16.1.2): `notifyEnforcers` requires `accepted_at IS NOT NULL` before any contact can be targeted — a contact who never responded, or who declined, is invisible to the notification query by construction.
- Pre-existing active contacts at the time of this migration were grandfathered in (not silently dropped); any **new** contact added after the fix requires the full handshake.
- Per-contact `allow_failure` / `is_emergency_contact` flags are independently configurable post-acceptance (Deep Mode).
- Distinguished from `accountability-partner.service.ts`, a separate accountability-*partner* matchmaking/discovery feature (opt-in via `buddy_discovery_consent`) — not part of the enforcer handshake and has no bearing on alert delivery.

---

## Acceptance Criteria

```gherkin
Scenario: New contact starts unaccepted
  Given a contract owner adds a new accountability contact
  When addContact runs
  Then the contact row is created with accepted_at = NULL
  And an invitation notification is sent to the invitee

Scenario: Invitee accepts
  Given a pending invitation for an invitee
  When the invitee calls respondToInvitation with accept: true
  Then accepted_at is set to the current timestamp
  And the contact becomes eligible for future violation notifications

Scenario: Invitee declines
  Given a pending invitation for an invitee
  When the invitee calls respondToInvitation with accept: false
  Then accepted_at remains NULL permanently
  And the contact is permanently excluded from notification targeting
  And the inviter is not alerted of the decline (avoids pressuring the invitee)

Scenario: Unresponded contact never receives an alert
  Given a contact whose accepted_at is still NULL
  When a contract violation occurs that would otherwise notify this contact
  Then notifyEnforcers excludes this contact from the query result entirely

Scenario: Per-contact consent flags are configurable post-acceptance
  Given an accepted contact
  When the owner updates allow_failure or is_emergency_contact for that contact
  Then the update is independently persisted per-contact, not globally
```

---

## Success Metrics

- Alerts delivered to a contact with `accepted_at IS NULL`: 0 (query-level guarantee + integration test)
- Contacts added without a subsequent invitation notification: 0
- FK-violation (`23503`) rate on enforcer notification inserts: 0 (down from silent failures pre-fix)

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Invitation notification delivery <2s | Consent gate enforced at the SQL query level (`accepted_at IS NOT NULL`), not just app logic — a future regression cannot silently bypass it | Declined invitations remain queryable for inviter transparency but excluded from any notification targeting | Invitation UI has clear accept/decline actions with accessible labels | Grandfathered pre-migration contacts preserved without breaking existing user data |

---

## Dependencies

- **Prerequisite Stories:** S16.1.2 (shares the ID-resolution/notification query)
- **Related Stories:** S16.5.1 (SOS emergency-contact flag reuses this same handshake), S16.8.1 (witness invitation reuses the identical accept-before-participate pattern)
- **External Dependencies:** Epic 13 (Social Growth OS) shared consent/handshake conventions
- **Remediates:** C-7 (consent half), R-6

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| Contact never responds to invitation | `accepted_at` stays `NULL` indefinitely | Contact remains permanently excluded from notifications | Inviter sees "Pending" status in their contact list |
| Contact declines invitation | `respondToInvitation(accept=false)` | Contact marked declined, excluded from notifications | Inviter is not alerted per-decline (avoids pressuring the invitee) |
| Contract violated with zero accepted enforcers | `notifyEnforcers` query returns empty set | No notification sent, `enforcers_notified` correctly left `false` | Contract owner sees violation recorded but no social alert claim |
| Invitee accepts, then later revokes | `revoke-all` consent endpoint | Future notifications immediately stop targeting them | Contact removed from active enforcer set on next lookup |

---

## Open Questions

None — handshake is fully specified and grandfathering behavior for pre-migration contacts was an explicit, documented decision.

---

## Definition of Done

- [x] `addContact` always creates the contact with `accepted_at = NULL` and sends an invitation notification
- [x] `respondToInvitation` is the only code path that sets `accepted_at`
- [x] `notifyEnforcers` filters on `accepted_at IS NOT NULL AND is_active = true` before resolving any recipient
- [x] Notification recipient always resolved via `accountability_contacts.contact_user_id`, never the contact row's own `id`
- [x] Declined invitations remain queryable but permanently excluded from targeting
- [x] Per-contact `allow_failure` / `is_emergency_contact` flags independently configurable post-acceptance
- [x] Grandfathered pre-migration contacts not silently dropped; new contacts require full handshake
- [x] Integration tests passing: contact accept → violation → notification delivery with FK integrity verified

---

*Story S16.4.1 | Epic E16 | Product: Balencia Platform*
