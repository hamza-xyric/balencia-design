---
type: story
id: S14.1.1
title: Add & Manage Personal Contacts
epic: E14
epic_name: Relationships CRM, Life Correlation Matrix & Knowledge Systems
feature: F14.1
feature_name: Relationships CRM (Social Health Pillar)
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S14.1.1: Add & Manage Personal Contacts

## User Story

**As a** Holistic Health Seeker,
**I want to** add, edit, and categorize the people who matter to me - family, friends, romantic partner, close colleagues,
**So that** my real-world relationships are tracked as data the AI coach can reason about, the same way it reasons about sleep or macros.

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

**User Experience:**
- User adds a personal contact with name, relationship type, and an optional closeness/notes entry
- Relationship type is a required categorical field: family, friend, romantic, professional
- User can edit or update any contact's details after creation
- User can log free-text notes and discrete interactions against a contact over time
- Duplicate contact detection warns the user before creating a near-identical record
- Contacts are private to the user - never shared or cross-user visible

**Data Model (PostgreSQL):**

| Table | Purpose |
|-------|---------|
| `personal_contacts` | User-entered relationship records: name, relationship type (family/friend/romantic/professional), closeness signal, last-contact tracking |
| `contact_notes` | Free-text notes a user logs against a specific contact over time |
| `contact_interactions` | Discrete logged interactions (calls, meetups, messages) per contact, used to derive last-contact-date and interaction frequency |

**API:**

| Method | Route | Purpose |
|--------|-------|---------|
| GET | `/api/people` | List personal contacts for the authenticated user (excludes archived) |
| POST | `/api/people` | Create a contact |
| PATCH | `/api/people/:id` | Update a contact |
| GET | `/api/people/:id` | Contact detail (+ notes + interactions) |
| DELETE | `/api/people/:id` | Archive a contact (soft delete) |
| POST | `/api/people/:id/notes` | Add a note |
| POST | `/api/people/:id/interactions` | Log an interaction (advances cadence) |
| GET | `/api/people/reach-out` | Prioritized "who to contact" ranker |

**Validation (Zod, boundary-enforced):**
- `name`: required, 2-100 characters
- `relationship_type`: required enum (`family` \| `friend` \| `romantic` \| `professional`)
- `closeness_signal`: optional numeric, 0.0-1.0
- Reject save with typed 400 if `name` or `relationship_type` missing

**Behaviors:**
- Contact list scoped strictly to `user_id` - no cross-user contact visibility under any circumstance
- Duplicate detection compares normalized `name` + `relationship_type` on create; collision returns typed 409 with a merge suggestion rather than silently creating a second record
- Deleting a contact does not delete historical `contact_notes`/`contact_interactions` rows outright - soft-delete pattern preserves history for the relationship-health signal (S14.1.3) while removing the contact from active lists

---

## Acceptance Criteria

```gherkin
Scenario: Create a personal contact
  Given a user on the Relationships CRM contact form
  When they submit a valid name and relationship type
  Then a new row is created in personal_contacts scoped to their user_id
  And the contact appears in their contact list

Scenario: Missing required field
  Given a user submits a contact with no relationship type selected
  When they attempt to save
  Then the request is rejected at the Zod validation boundary with a 400
  And the user sees "Add a name and relationship type to save this contact."

Scenario: Duplicate contact detected
  Given a user already has a contact named "Sam" typed as "friend"
  When they attempt to create another contact named "Sam" typed as "friend"
  Then the request is rejected with a typed 409
  And the user sees "You already have a contact like this - want to update it instead?"

Scenario: Update an existing contact
  Given a user has an existing contact
  When they edit the relationship type or closeness signal and save
  Then PATCH /api/people/:id updates the row
  And the change is reflected immediately in the contact list

Scenario: Contact isolation across users
  Given two different users each have contacts logged
  When either user requests GET /api/people
  Then only that user's own contacts are returned, never another user's
```

---

## Success Metrics

- Relationship logging adoption: 40% of active users log at least 1 relationship within first 14 days
- Validation error rate at save: <5% of submit attempts rejected by Zod boundary
- Duplicate-collision rate: tracked to confirm the 409 flow is a genuine assist, not a frequent false positive

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|----------------|
| Contact list fetch <500ms | User-scoped queries only (`user_id` on every read/write) | Contacts never shared or cross-user visible | 44x44pt tap targets on add/edit controls | Responsive 360px-1440px+ |
| Save round-trip <300ms | Zod validation at the edge before service layer | Notes/interactions treated as sensitive personal data | Screen reader labels on all form fields | |

---

## Dependencies

- **Prerequisite Stories:** None (entry point for F14.1)
- **Related Stories:** S14.1.2 (Relationship Hub reads this data), S14.1.3 (coach integration reads derived signal)
- **External Dependencies:** PostgreSQL (`personal_contacts`, `contact_notes`, `contact_interactions` tables), auth middleware for `user_id` scoping

---

## Edge Cases & Errors

| Scenario | Expected Behavior |
|----------|-------------------|
| Contact data incomplete (missing name/type) | Reject save at Zod validation boundary with typed 400 |
| Duplicate contact entry (name + relationship-type collision) | Reject with typed 409, suggest merge/update instead |
| Contact deleted while interactions/notes still reference it | Soft-delete preserves historical rows; contact excluded from active list only |
| Network failure mid-save | Client retries, no partial/duplicate row committed (single-transaction write) |

---

## Open Questions

- None outstanding for this story; merge-suggestion UX on duplicate collision may warrant a follow-up UX pass.

---

## Definition of Done

- [x] Acceptance criteria met
- [x] Error scenarios handled gracefully
- [x] Zod validation enforced at the API boundary
- [x] Duplicate detection returns typed 409 with merge suggestion
- [x] Contact list strictly user-scoped (no cross-user leakage)
- [x] Mobile UI responsive and accessible
- [x] Unit tests for validation and duplicate-detection logic

---

*Story S14.1.1 | Epic E14 | Product: Balencia Platform*
