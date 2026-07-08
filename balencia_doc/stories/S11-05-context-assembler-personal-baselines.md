---
type: story
id: S11.4.2
title: "Context Assembler: Personal Baselines & Deviation Framing"
epic: E11
epic_name: SIA Cognitive OS & Provenance
feature: F11.4
feature_name: Context Assembler (Wave 1)
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S11.4.2: Context Assembler — Personal Baselines & Deviation Framing

## User Story

**As a** Returning Struggling User,
**I want to** have the coach judge whether today is genuinely unusual FOR ME — not just unusual compared to some average person,
**So that** its concern feels earned and personal instead of tone-deaf to my actual history.

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

**What shipped (Slice 2 of the Context Assembler, commit `25322f82`):** population-average framing replaced with the user's own 30-day personal baseline (mood, energy, stress, anxiety, plus WHOOP biometric baseline) and a today-vs-normal deviation, so "your stress seems high" is judged against the user's own history.

**Baseline computation:**
- `context.baseline30d?: { hrv, ...30-day personal averages }` (`comprehensive-user-context.service.ts:95-96`) computed alongside 7-day trend averages, only when the user is connected and has sufficient data (`:1074-1101`).
- Qualitative HRV status derived from latest-vs-30-day-baseline comparison (`deriveHrvStatus`, `:1101-1102`) rather than an absolute threshold.

**Prompt framing** (`comprehensive-user-context.service.ts:3208`):
> *"A value near their own normal is fine even if it looks 'low' by population standards; only flag a real deviation from THEIR baseline."*

**Deviation framing:** today-vs-normal deviation computed for calorie intake as one concrete instance (`todayCalorieDeviation`, `todayDeviationClass` in `{on_target, over, under}`, `:2424-2427`), following the same personal-baseline pattern used for the emotional/biometric baselines.

**Flexibility modes:**

| Mode | Experience |
|------|------------|
| Light | Baseline deviation influences tone automatically; the user experiences this as the coach "getting it" without seeing the underlying baseline numbers. |
| Deep | Baseline deltas inspectable via the Memory Explorer and Life Operating Map (F11.7), including the exact 30-day baseline values the coach is comparing today against. |

---

## Acceptance Criteria

```gherkin
Scenario: Coach judges today against the user's own 30-day baseline
  Given a user has 30+ days of mood/energy/stress/anxiety logging
  When the coach frames today's state
  Then it compares today to the user's own personal baseline, not a population average

Scenario: HRV status is relative, not absolute
  Given a user has a WHOOP-connected 30-day HRV baseline
  When the coach derives HRV status
  Then it compares latest HRV to the user's own baseline rather than an absolute cutoff

Scenario: Calorie deviation classified against personal baseline
  Given a user's logged calorie intake for today
  When the context assembler computes todayCalorieDeviation
  Then it classifies the result as on_target, over, or under relative to the user's own normal

Scenario: Insufficient data falls back to non-comparative framing
  Given a user has fewer than 30 days of mood/energy/stress logging
  When the context assembler builds the prompt
  Then the baseline section is omitted and the coach uses non-comparative framing instead

Scenario: No wearable connection means no fabricated HRV commentary
  Given WHOOP is not connected (no baseline30d.hrv)
  When the context assembler builds the prompt
  Then HRV status derivation is skipped entirely — no fabricated qualitative status is produced
```

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Baseline-vs-population accuracy | 0 instances of population-average framing where a 30-day personal baseline exists | Prompt regression test |
| Context-fetch latency | Baseline computation added to the same parallel batch, no added round-trip latency vs. pre-Wave-1 | Query-count assertion in integration tests |

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Baseline fetch included in the same `Promise.all` batch as Slice 1 | Server-side only, user-scoped | Baselines never exposed cross-user | N/A | Backend, all chat/WhatsApp/voice channels via shared context builder |

---

## Dependencies

- **Prerequisite Stories:** S11.4.1 (same batched fetch pattern), S11.2.1 (baseline claims follow the same honesty discipline — a derived 30-day average is never narrated as a clinical measurement)
- **Related Stories:** S11.6.2 (Life Correlation Controller and root-cause reasoning build on baseline deviation signals)
- **External Dependencies:** E09 (Data Integrations) — WHOOP connection state gating baseline availability

---

## Edge Cases & Errors

| Scenario | Expected Behavior |
|----------|-------------------|
| Insufficient data for 30-day baseline (<30 days of logging) | Baseline section omitted; coach falls back to non-comparative framing |
| WHOOP not connected, no baseline30d.hrv | HRV status derivation skipped; no fabricated qualitative status |
| Partial data for a given baseline metric | Only metrics with sufficient history are surfaced; missing metrics are omitted individually, not the whole section |

---

## Open Questions

None outstanding for this slice.

---

## Definition of Done

- [x] 30-day personal baseline (mood/energy/stress/anxiety) computed and available for prompt injection
- [x] WHOOP 30-day baseline (HRV, recovery, sleep) computed alongside emotional baseline
- [x] Prompt explicitly instructs the coach to judge today against the user's OWN baseline, not population norms
- [x] Slice 2 fetches batched into the same parallel `Promise.all`, not sequential per-field queries
- [x] Qualitative HRV status derived relative to personal baseline, not an absolute cutoff

---

*Story S11.4.2 | Epic E11 | Product: Balencia Platform*
