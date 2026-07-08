---
type: story
id: S11.2.1
title: Provenance v2 (Honesty Layer)
epic: E11
epic_name: SIA Cognitive OS & Provenance
feature: F11.2
feature_name: Provenance v2 (Honesty Layer)
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S11.2.1: Provenance v2 (Honesty Layer)

## User Story

**As a** Health-Conscious Skeptic,
**I want to** have my AI coach be honest about which numbers are real device measurements and which are the app's own estimates,
**So that** I can trust its confident claims and never feel misled by a "worried" tone that's actually reacting to a guess.

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

**What shipped:** the direct fix for the 2026-06-16 audit's most damning finding — "fabricated sophistication: deterministic-looking tables silently polluted with LLM content" — where numbers that read as measured/clinical/device-sourced were in fact app-computed estimates.

**Daily Health Score labeling** (`comprehensive-user-context.service.ts:3554-3558`):
```
// Provenance: the Daily Health Score is an app-computed aggregate, never a device measurement.
"- SOURCE: This is an app-computed wellness score from logged activity + check-ins,
   NOT a measured or clinical value — refer to it as their 'wellness score', never
   as a biometric reading. The Biometrics sub-score is an ESTIMATE derived from app
   data, not a wearable reading — do not cite it as device-measured recovery/HRV/sleep."
```
This single system-prompt seam reaches every proactive template (~17) without per-template edits — reused by `proactive/wellness-score-provenance.util.ts` for the proactive messaging system prompt (commit `2692bced`).

**RiskFlag source tagging:** every `RiskFlag` object carries a `source` field distinguishing measured/derived/self-report origin, so downstream tone logic (e.g., "worried" framing) is conditioned on evidentiary strength instead of firing uniformly regardless of how the flag was computed.

**Greeting provenance** (`coach/greeting-provenance.util.ts`): the morning/session-opening greeting no longer cites specific wearable numbers (HRV, recovery %, sleep hours) when there is no fresh device reading for that day — it falls back to non-numeric, honest framing instead of stale or fabricated figures.

**Cross-domain inference honesty** (commit `98fe77c8`): cross-domain signals spanning stress/spending/mood are explicitly framed in the system prompt as **inferred hypotheses to verify with the user**, never as measured facts.

**Flexibility modes:**

| Mode | Experience |
|------|------------|
| Light | Provenance framing is invisible by default — the coach simply never overstates certainty, no extra UI or user action required. |
| Deep | User-visible language distinguishes "measured", "derived", and "self-report" throughout coaching responses and risk-flag explanations — surfaced further by the Transparency Prompt Controller (F11.6) and Memory Explorer (F11.7). |

---

## Acceptance Criteria

```gherkin
Scenario: Daily Health Score is never narrated as a clinical measurement
  Given the coach references the user's Daily Health Score
  When it generates a response
  Then it calls the score a "wellness score" and never a measured/clinical/biometric reading

Scenario: Biometrics sub-score is labeled an estimate
  Given the Biometrics sub-score is derived from app data (not a wearable reading)
  When the coach cites it
  Then it is explicitly labeled an ESTIMATE, never presented as device-measured recovery/HRV/sleep

Scenario: RiskFlag tone reflects its source
  Given a RiskFlag with source "derived" and no corroborating system
  When the coach selects a response tone
  Then it uses neutral, informational language rather than "worried" framing

Scenario: Greeting omits stale or fabricated wearable numbers
  Given a user has no fresh wearable reading for today (WHOOP not connected or no reading yet)
  When the coach generates a session-opening greeting
  Then it uses qualitative, non-numeric framing instead of citing a specific number

Scenario: Cross-domain correlation framed as hypothesis
  Given a cross-domain signal spanning stress, spending, and mood
  When the coach surfaces the correlation
  Then it is phrased as a question to verify ("I'm noticing X — does that match your experience?"), never as settled fact

Scenario: Proactive channel reuses the same guardrail
  Given the same Daily Health Score guardrail used in live chat
  When a proactive WhatsApp/push message is generated
  Then it reuses the identical provenance seam, with no per-template drift across the ~17 templates
```

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Measured-vs-derived accuracy | 0 instances of app-computed data narrated as device-measured | Prompt-text audit / Turn Intelligence Contract `transparencyObject` stage |
| Risk-flag tone correctness | "Worried" tone only fires on flags with a `measured` or corroborated `derived` source | Unit tests on tone-selection logic |
| Wearable-greeting honesty | 0 greetings citing specific biometric numbers with no fresh reading that day | `greeting-provenance.util` unit tests |
| Cross-domain claim framing | 100% of cross-domain (stress/spending/mood) claims use hypothesis language, not assertion | Prompt-template regression tests |

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| No added latency (static prompt seam) | N/A | No new PII collected | Applies uniformly to text-, voice-, and WhatsApp-delivered coaching | Chat, WhatsApp, voice, proactive push |
| Single seam reused (~17 templates), avoids per-template drift | | | | |

---

## Dependencies

- **Prerequisite Stories:** S11.1.1 (whole-life scope this honesty layer applies across)
- **Related Stories:** S11.6.1 (Transparency Prompt Controller is the live enforcement arm of this feature), S11.4.2 (baseline framing follows the same honesty discipline)
- **External Dependencies:** E08 F8.3 (Holistic Health Score, the score this feature labels), E09 (wearable connection/freshness state)

---

## Edge Cases & Errors

| Scenario | Expected Behavior |
|----------|-------------------|
| No wearable connected, greeting would need a number | Greeting omits the number, uses qualitative framing ("Ready for today?") |
| RiskFlag has no clear source | Defaults to non-alarming, neutral tone (fail-safe, not fail-worried) |
| Cross-domain signal is strong but unverified by user | Framed as a question, not a statement |
| Biometrics sub-score computed with partial app data | Still labeled ESTIMATE explicitly; never silently upgraded to "measured" |
| Gap D suspicion (training-intensity recovery provenance) | Confirmed true no-op: `trainingIntensity` is only built when `whoop.isConnected && lastRecovery.score != null`, so recovery% was always correctly device-gated |

---

## Open Questions

None outstanding — this feature is fully shipped with no tracked gaps.

---

## Definition of Done

- [x] Daily Health Score system-prompt section explicitly labels the score as app-computed, never clinical/measured
- [x] Biometrics sub-score explicitly labeled an estimate when derived (not wearable-sourced)
- [x] `RiskFlag` carries a `source` field; tone logic reads it before selecting "worried"/concerned framing
- [x] Greeting logic suppresses specific wearable numbers absent a fresh reading for that day
- [x] Cross-domain (stress/spending/mood) correlations framed as hypotheses to verify, not measured fact
- [x] Proactive messaging system prompt reuses the same provenance guardrail (single seam, ~17 templates covered)
- [x] Fix verified as a true no-op for the previously-suspected "Gap D" (training-intensity recovery provenance)

---

*Story S11.2.1 | Epic E11 | Product: Balencia Platform*
