---
type: story
id: S11.1.1
title: Whole-Life Scope & Rebrand (Cia → SIA)
epic: E11
epic_name: SIA Cognitive OS & Provenance
feature: F11.1
feature_name: Whole-Life Scope & Rebrand
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S11.1.1: Whole-Life Scope & Rebrand (Cia → SIA)

## User Story

**As a** Whole-Life Optimizer,
**I want to** have my AI coach reason across every part of my life — not just workouts and meals — under one consistent, intentional identity everywhere I interact with it (chat, WhatsApp, voice, dashboard),
**So that** coaching feels like one coherent relationship with a system that understands my whole self, not a fragmented health tracker wearing a placeholder name.

---

## Story Type

- [x] Feature
- [ ] Enhancement
- [x] Technical
- [ ] Integration

## Priority

- [x] Must Have (P0)
- [ ] Should Have (P1)

---

## Scope Description

**What shipped:**
- Full rename of the coach's persona from the legacy placeholder "Cia" to **"SIA"** across every server default, prompt template, and client UI surface.
- Broadening of the coach's system-prompt construction from a health-only frame (fitness/nutrition/wellbeing) to a whole-life frame that also reasons across finance, career, relationships, and spirituality in the same conversation.
- A database migration that normalizes existing users' saved assistant names without touching genuinely user-chosen custom names.

**Rebrand surface (server):**

| File | Role |
|------|------|
| `server/src/services/langgraph-chatbot.service.ts` | Core system prompt persona references |
| `server/src/services/comprehensive-user-context.service.ts` | Context-builder persona framing |
| `server/src/services/proactive-messaging.service.ts`, `schedule-automation.service.ts`, `rag-chatbot.service.ts`, `activity-automation.service.ts` | Persona references across messaging/automation |
| `server/src/services/response-optimization/{types,self-learning.service,response-context.adapter}.ts` | Persona metadata in response-optimization pipeline |
| `server/src/controllers/preferences.controller.ts` + `server/src/validators/preferences.validator.ts` | `voice_assistant_name` preference handling |

**Rebrand migration** (`20260630151000_set_voice_assistant_name_default.sql`):
```sql
ALTER TABLE user_preferences
  ALTER COLUMN voice_assistant_name SET DEFAULT 'Sia';

UPDATE user_preferences
SET voice_assistant_name = 'Sia'
WHERE voice_assistant_name IS NULL
   OR voice_assistant_name IN ('Cia', 'SIA');
```
Idempotent and non-destructive: only touches rows that were `NULL` or held one of the two known legacy/placeholder values (`'Cia'`, uppercase `'SIA'` typo-variant). Any genuinely user-chosen custom name is excluded from the `UPDATE`.

**Whole-life scope broadening:** the system-prompt construction (built per-turn in `langgraph-chatbot.service.ts` from `ComprehensiveUserContext`) was expanded so the domain list driving reasoning includes career and finance signals (`otherDomainGoals` sourced from `career`/`finance` — `comprehensive-user-context.service.ts:1861,1867`) and relationship/spirituality context alongside the original fitness/nutrition/wellbeing triad.

**Flexibility modes:**

| Mode | Experience |
|------|------------|
| Light | SIA is the default display name everywhere (chat header, WhatsApp signature, voice greeting, dashboard); whole-life scope operates silently. |
| Deep | User can override the display name via `user_preferences.voice_assistant_name` (custom names persist across the rebrand); underlying whole-life reasoning scope is unaffected by the display name and cannot be narrowed back to health-only. |

---

## Acceptance Criteria

```gherkin
Scenario: SIA is the default coach identity everywhere
  Given a user with no custom voice_assistant_name set
  When they interact via chat, WhatsApp, voice, or the dashboard
  Then the coach identifies itself as "SIA" consistently across every channel

Scenario: Existing custom assistant name is preserved
  Given a user who previously set voice_assistant_name to a custom value (not 'Cia' or 'SIA')
  When the rebrand migration runs
  Then their custom name is left untouched

Scenario: Legacy placeholder name is normalized
  Given a user whose voice_assistant_name is NULL, 'Cia', or the uppercase 'SIA' typo-variant
  When the rebrand migration runs
  Then their voice_assistant_name is set to 'Sia'

Scenario: Migration is safe to re-run
  Given the migration has already run once
  When it is executed again
  Then the WHERE clause no-ops on already-migrated rows and nothing changes

Scenario: Whole-life domain reasoning
  Given a user with logged data in finance, career, or relationship domains
  When they have a coaching conversation
  Then the coach references relevant non-health domains without being explicitly asked to configure this

Scenario: No fabrication when a domain has no data
  Given a user with no finance or career records
  When the context assembler builds the prompt
  Then that domain's section is omitted entirely rather than filled with placeholder content
```

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Legacy name leakage | 0% of active conversations reference "Cia" post-migration | Grep-based CI check + prod log scan |
| Whole-life domain coverage | Coach references non-health domains in >90% of conversations where the user has data in those domains | Turn Intelligence Contract stage coverage (F11.5) |
| Custom-name preservation | 100% of users with a pre-existing custom `voice_assistant_name` retain it post-migration | Migration audit query (pre/post row diff) |
| Cross-surface consistency | Same name shown in chat, WhatsApp, voice, and dashboard for a given user | Manual + integration test across channels |

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Migration must be idempotent | No auth surface change | No new data collected | N/A (identity/copy change) | All client surfaces (chat/WhatsApp/voice/dashboard) |
| No added round-trip latency to prompt construction | Backfill excludes non-matching rows by construction | Custom names remain user-controlled | | Server + client, all supported platforms |

---

## Dependencies

- **Prerequisite Stories:** None (foundation for the epic)
- **Related Stories:** S11.2.1 (Provenance v2 builds on this scope), all downstream stories reason across the domains this unlocks
- **External Dependencies:** `user_preferences` table (`voice_assistant_name` column), E02 Voice Coaching (greeting surface)

---

## Edge Cases & Errors

| Scenario | Expected Behavior |
|----------|-------------------|
| User already renamed their assistant to something custom | Migration `WHERE` clause excludes the row — value untouched |
| Client caches stale "Cia" branding after deploy | Cache-busted asset hashes on deploy force new bundle fetch; resolves on next page load |
| New domain has no data for whole-life reasoning (e.g., no finance/career records) | Context assembler omits the domain section entirely rather than fabricating filler |
| Legacy migration re-run against already-migrated data | `WHERE` clause no-ops (value already matches or excluded) — safe to re-run |

---

## Open Questions

- Full grep-based CI guard preventing reintroduction of "Cia" in new server/client code is tracked but not yet automated.

---

## Definition of Done

- [x] All server-side prompt defaults, persona references, and hardcoded strings renamed from "Cia" to "SIA"
- [x] All client UI components (chat header, onboarding, settings, voice) renamed from "Cia" to "SIA"
- [x] `voice_assistant_name` column default changed to `'Sia'`
- [x] Migration backfills NULL and known legacy values (`'Cia'`, `'SIA'`) without touching custom user-chosen names
- [x] System prompt construction broadened to reason across fitness, nutrition, wellbeing, finance, career, relationships, spirituality
- [x] Career and finance domain goals surfaced into coaching context (`otherDomainGoals`) alongside the original three pillars
- [ ] Full grep-based CI guard preventing reintroduction of "Cia" in new server/client code (tracked, not yet automated)

---

*Story S11.1.1 | Epic E11 | Product: Balencia Platform*
