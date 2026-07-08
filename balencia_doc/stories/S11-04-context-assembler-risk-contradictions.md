---
type: story
id: S11.4.1
title: "Context Assembler: Accountability Risk & Contradictions"
epic: E11
epic_name: SIA Cognitive OS & Provenance
feature: F11.4
feature_name: Context Assembler (Wave 1)
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S11.4.1: Context Assembler — Accountability Risk & Contradictions

## User Story

**As a** Returning Struggling User,
**I want to** have the coach notice when I'm at real risk of disengaging or when my logged signals genuinely conflict with each other,
**So that** its concern feels earned and personal instead of defaulting to generic encouragement.

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

**What shipped (Slice 1 of the Context Assembler, commit `b98d4aa1`):** intelligence the platform already computed — the user's disengagement-risk tier from the commitment-contract/accountability system, and the top critical/high cross-pillar contradictions — surfaced directly into the live system prompt SIA reasons from on every turn, instead of living only in dashboards or background jobs.

**Contradictions context** (`comprehensive-user-context.service.ts`):
- `context.contradictions?: Array<{ pillarA: string; pillarB: string; severity: 'critical'|'high'; aiCorrection: string | null }>` — populated by `getContradictionsContext()` (`comprehensive-user-context.service.ts:3045`), already severity-sorted, lazy-fetched, and **omitted entirely when empty** (no filler text).

**Batched fetch:** behavioral tier and accountability risk are fetched in parallel with wellbeing signals, accountability contracts, and personal baselines (`comprehensive-user-context.service.ts:632`) — a single `Promise.all` batch, avoiding sequential round-trips.

**Prompt rendering:** rendered into the prompt at `comprehensive-user-context.service.ts:3370`; contradictions inject an explicit "here's what conflicts" section the coach can cite directly.

**Flexibility modes:**

| Mode | Experience |
|------|------------|
| Light | Risk tier and contradictions influence tone and urgency automatically; the user experiences this as the coach "getting it" without seeing the underlying tier/contradiction data. |
| Deep | Contradictions list (`pillarA`, `pillarB`, `severity`, `aiCorrection`) inspectable via the Memory Explorer and Life Operating Map (F11.7). |

---

## Acceptance Criteria

```gherkin
Scenario: Disengagement-risk tier reaches the live prompt
  Given a user has an elevated disengagement-risk tier from the accountability system
  When the context assembler builds this turn's prompt
  Then the risk tier is injected with tone/urgency implications for the coach

Scenario: Contradictions are surfaced severity-sorted
  Given a user has both critical and high-severity cross-pillar contradictions
  When the context assembler builds the contradictions section
  Then critical contradictions are listed ahead of high-severity ones, each with pillar pair and AI correction text

Scenario: No contradictions means no filler
  Given a user has zero detected contradictions
  When the context assembler builds the prompt
  Then the contradictions section is omitted entirely — no empty placeholder text is rendered

Scenario: All Slice 1 fetches are batched
  Given a turn requires behavioral tier, wellbeing signals, accountability contracts, risk tier, and contradictions
  When the context assembler fetches this data
  Then all fields are fetched in one Promise.all batch, not sequential per-field queries

Scenario: Contradiction with no AI correction still surfaces
  Given a contradiction has aiCorrection: null
  When it is rendered into the prompt
  Then the coach surfaces the conflict and invites user input rather than fabricating a canned correction
```

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Risk-tier reach rate | 100% of turns for at-risk users include disengagement-risk tier in the assembled context | Turn Intelligence Contract `prompt_evidence` role check |
| Contradiction surfacing | Critical/high contradictions appear in the prompt within 1 turn of detection | Integration test on `getContradictionsContext` freshness |
| Context-fetch latency | Parallel batch completes without added round-trip latency vs. pre-Wave-1 | Query-count assertion in integration tests |

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Single `Promise.all` batch — no added round-trip | Server-side only, user-scoped | Risk tier/contradictions never exposed cross-user | N/A | Backend, all chat/WhatsApp/voice channels via shared context builder |

---

## Dependencies

- **Prerequisite Stories:** S11.1.1 (whole-life domain scope), S11.2.1 (baseline honesty framing)
- **Related Stories:** S11.3.1 (contradictions feed `multiSystemAgreement` axis), S11.6.2 (Accountability Prompt Controller consumes risk tier + due commitments)
- **External Dependencies:** Commitment Contract / Accountability system (risk tier source), E08 F8.1 (Pattern Correlation / LCM contradiction detection)

---

## Edge Cases & Errors

| Scenario | Expected Behavior |
|----------|-------------------|
| No contradictions exist for user | Field omitted from context object entirely (`...(contradictions ? {contradictions} : {})`) |
| Contradiction has a null `aiCorrection` | Coach surfaces the conflict without a canned correction, invites user input |
| Accountability risk tier fetch fails | Falls back gracefully; context assembler does not block prompt construction on this single field |

---

## Open Questions

None outstanding for this slice.

---

## Definition of Done

- [x] Disengagement-risk tier fetched and injected into system prompt with tone/urgency implications
- [x] Top critical/high contradictions (severity-sorted) injected, each with pillar pair + AI correction text
- [x] Contradictions section omitted entirely (not rendered as empty/placeholder) when the user has none
- [x] Slice 1 fetches batched in one parallel `Promise.all`, not sequential per-field queries

---

*Story S11.4.1 | Epic E11 | Product: Balencia Platform*
