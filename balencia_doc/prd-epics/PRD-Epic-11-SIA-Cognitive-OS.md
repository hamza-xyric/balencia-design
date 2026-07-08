# Balencia Platform - Epic 11: SIA Cognitive OS & Provenance Overhaul

## EPIC OVERVIEW

### Epic Statement
SIA Cognitive OS & Provenance Overhaul is the epic that turns Balencia's AI coach from a health-only chatbot with a placeholder name into **SIA** — a whole-life reasoning system that tells the truth about what it knows, proves that every computed signal actually reaches the conversation, and exposes its own reasoning as first-class, inspectable product surfaces.

### Epic Goal
Close the **"compute-but-discard" gap**: the 2026-06-16 AI Intelligence Architecture Audit scored the platform 5.0/10 and found the single most repeated theme across every quality review — sophisticated engines (the Life Correlation Matrix, confidence scoring, predictive models) were computed and persisted to the database but never reached the live coaching conversation the user actually has. This epic wires every one of those engines into the system prompt that generates each response, adds a structural auditor that makes silent discarding provably impossible going forward, and surfaces the previously-buried intelligence as six new inspectable APIs plus a client dashboard.

### Core Philosophy
**"Compute-and-Use, Never Compute-and-Discard":**
1. **Whole-Life, Not Health-Only** — SIA reasons across fitness, nutrition, wellbeing, finance, career, relationships, and spirituality. Pillars are sensors on one life, not seven separate apps wearing one skin.
2. **Honesty Over Sophistication** — a number that LOOKS measured but is actually app-computed must say so. A "worried" tone must never fire on a risk flag that has no real evidentiary source. Confidence claims must be provably earned, not decorative.
3. **Provable Participation, Not Trust-Me Wiring** — every computed signal (confidence score, LCM correlation, prediction, risk flag, memory) must be traceable to a real role it played in the response — control, prompt evidence, provenance, or learning — or it must be explicitly flagged as discarded. No signal gets to silently do nothing while still being counted as "intelligence."
4. **Inspectable, Not Buried** — the sophisticated reasoning the platform already computes (root causes, ripple effects, future trajectories, memory, the life operating map) becomes a first-class product surface a user can open and read, not just training data trapped inside a system prompt.

### Strategic Importance
> "The compute-but-discard gap is why the platform can score 8/10 on individual engines and 5/10 overall — brilliant machinery, disconnected from the mouth that talks to the user."

This epic is the connective tissue between Epic 08 (Cross-Domain Intelligence, which builds the engines) and the actual coaching conversation. Without it, correlation engines, prediction models, and the Life Correlation Matrix (Epic 14) are impressive but invisible — sophistication the user pays for and never experiences. With it, every premium reasoning capability the platform owns becomes something SIA actually says, cites, and stands behind — and something the product can prove it said, not just claim.

### SIA Cognitive OS Scope (8 Features)

| Feature | Description | MVP Status |
|---------|-------------|------------|
| **F11.1** | Whole-Life Scope & Rebrand (Cia → SIA) | Core (Foundation) |
| **F11.2** | Provenance v2 (Honesty Layer) | Core (Trust) |
| **F11.3** | Evidence & Answerability Gate (Wave 0) | Core, partially dormant |
| **F11.4** | Context Assembler (Wave 1) | Core |
| **F11.5** | Turn Intelligence Contract | Core (Structural Guarantee) |
| **F11.6** | Intelligence Prompt Controllers (Wave 2) | Core, partially unflagged |
| **F11.7** | Intelligence API Suite | Core |
| **F11.8** | Client Cognitive OS Dashboard | Core |

---

## F11.1: WHOLE-LIFE SCOPE & REBRAND

### Description
The foundational identity and scope change everything else in this epic sits on top of. Two coupled changes: (1) the coach's core system prompt was broadened from a health-only frame to a whole-life frame — fitness, nutrition, wellbeing, finance, career, relationships, and spirituality are all first-class domains the coach reasons across in a single conversation, not siloed sub-bots; (2) the coach's name was fully rebranded from the legacy placeholder "Cia" to **"SIA"** across every server default, prompt template, and client UI surface, with a database migration normalizing existing users' saved assistant names.

### User Story
As a **Whole-Life Optimizer**, I want my AI coach to reason across every part of my life — not just workouts and meals — and to have one consistent, intentional identity everywhere I interact with it (chat, WhatsApp, voice, dashboard) so that coaching feels like one coherent relationship with a system that understands my whole self, not a fragmented health tracker wearing a placeholder name.

### Flexibility Modes

| Mode | Experience |
|------|------------|
| **Light** | SIA is the default display name everywhere (chat header, WhatsApp signature, voice greeting, dashboard). Whole-life scope operates silently — the user simply notices the coach references finance, career, or relationship context without being asked to configure anything. |
| **Deep** | User can override the display name via `user_preferences.voice_assistant_name` (any custom name persists across the rebrand and future defaults); the underlying whole-life reasoning scope is unaffected by the display name and cannot be narrowed back to health-only. |

### Technical Foundation

**Rebrand surface (server):**
- `server/src/services/langgraph-chatbot.service.ts` — core system prompt persona references
- `server/src/services/comprehensive-user-context.service.ts` — context-builder persona framing
- `server/src/services/proactive-messaging.service.ts`, `schedule-automation.service.ts`, `rag-chatbot.service.ts`, `activity-automation.service.ts` — persona references across the messaging/automation surface
- `server/src/services/response-optimization/{types,self-learning.service,response-context.adapter}.ts` — persona metadata in response-optimization pipeline
- `server/src/controllers/preferences.controller.ts` + `server/src/validators/preferences.validator.ts` — `voice_assistant_name` preference handling

**Rebrand migration:**
```sql
-- 20260630151000_set_voice_assistant_name_default.sql
ALTER TABLE user_preferences
  ALTER COLUMN voice_assistant_name SET DEFAULT 'Sia';

UPDATE user_preferences
SET voice_assistant_name = 'Sia'
WHERE voice_assistant_name IS NULL
   OR voice_assistant_name IN ('Cia', 'SIA');
```
The migration is written to be **idempotent and non-destructive**: it only touches rows that were NULL or held one of the two known legacy/placeholder values (`'Cia'`, uppercase `'SIA'` typo-variant); any genuinely user-chosen custom name is left untouched.

**Whole-life scope broadening:** the coach's system-prompt construction (built per-turn in `langgraph-chatbot.service.ts` from `ComprehensiveUserContext`) was expanded so the domain list driving reasoning includes career and finance signals (`otherDomainGoals` sourced from `career`/`finance` — see `comprehensive-user-context.service.ts:1861,1867`) and relationship/spirituality context alongside the original fitness/nutrition/wellbeing triad, instead of being scoped to only the three original pillars.

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Legacy name leakage | 0% of active conversations reference "Cia" post-migration | Grep-based CI check + prod log scan |
| Whole-life domain coverage | Coach references non-health domains (career/finance/relationships) in >90% of conversations where the user has data in those domains | Turn Intelligence Contract stage coverage (F11.5) |
| Custom-name preservation | 100% of users with a pre-existing custom `voice_assistant_name` retain it post-migration | Migration audit query (pre/post row diff) |
| Cross-surface consistency | Same name shown in chat, WhatsApp, voice, and dashboard for a given user | Manual + integration test across channels |

### Acceptance Criteria

- [x] All server-side prompt defaults, persona references, and hardcoded strings renamed from "Cia" to "SIA"
- [x] All client UI components (chat header, onboarding, settings, voice) renamed from "Cia" to "SIA"
- [x] `voice_assistant_name` column default changed to `'Sia'`
- [x] Migration backfills NULL and known legacy values (`'Cia'`, `'SIA'`) without touching custom user-chosen names
- [x] System prompt construction broadened to reason across fitness, nutrition, wellbeing, finance, career, relationships, spirituality — not gated to a fixed three-pillar list
- [x] Career and finance domain goals surfaced into coaching context (`otherDomainGoals`) alongside the original three pillars
- [ ] Full grep-based CI guard preventing reintroduction of "Cia" in new server/client code (tracked, not yet automated)

### Error Handling Scenarios

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| **User already renamed their assistant to something custom** | Existing `voice_assistant_name` not NULL and not in `('Cia','SIA')` | Migration `WHERE` clause excludes the row — value untouched | None needed; no visible change |
| **Client caches stale "Cia" branding after deploy** | Old bundle served from CDN/service-worker cache | Cache-busted asset hashes on deploy force new bundle fetch | None; resolves on next page load |
| **New domain has no data for whole-life reasoning** | e.g., user has no finance/career records | Context assembler omits the domain section entirely rather than fabricating filler | Coach simply doesn't mention that domain — no error surfaced |
| **Legacy migration re-run against already-migrated data** | `voice_assistant_name` already `'Sia'` | `WHERE` clause no-ops (value already matches or excluded) — safe to re-run | None |

### Rebrand & Scope-Broadening Process (High-Level)

```
Rebrand + Whole-Life Scope Rollout:

1. Server Audit:
   - Grep all persona-name string literals ("Cia") across services, prompts, tests
   - Classify each: hardcoded default vs. user-configurable preference
   - Rename hardcoded defaults; leave user preference paths untouched

2. Client Audit:
   - Grep chat/voice/onboarding/settings components for "Cia" references
   - Rename display strings, alt text, and voice-greeting copy to "SIA"/"Sia"

3. Database Normalization:
   - Migration sets column default to 'Sia'
   - Backfill targets ONLY: NULL rows OR rows matching known legacy literal values
   - Custom user-chosen names (anything else) explicitly excluded from UPDATE

4. Scope Broadening (System Prompt):
   - Extend ComprehensiveUserContext domain list beyond fitness/nutrition/wellbeing
   - Add career/finance goal sourcing (otherDomainGoals) into context assembly
   - Add relationship/spirituality context sections where user data exists
   - Ensure omission (not fabrication) when a domain has no user data

5. Verification:
   - Full-text search server + client for residual "Cia" literals (must be zero)
   - Cross-channel manual check: chat header, WhatsApp signature, voice greeting, dashboard
   - Migration dry-run against production snapshot to confirm custom-name preservation
```

### Cross-Pillar Connections

**To all seven life domains:**
- Whole-life scope is the prerequisite for every other feature in this epic — Provenance v2, Context Assembler, and the Intelligence API Suite all reason across domains this feature unlocked.

**To Epic 08 (Cross-Domain Intelligence):**
- Epic 08's correlation/prediction engines were built pillar-first (fitness/nutrition/wellbeing); this feature is what let those same engines' *outputs* be framed inside a genuinely whole-life conversation rather than a health-scoped one.

**To Life Correlation Matrix (Epic 14):**
- LCM's node set (career, finance, relationships, spirituality, plus the original three) only became reachable in live conversation once the system prompt stopped being health-scoped.

### Dependencies
- **E08 (Cross-Domain Intelligence):** this epic extends E08's engines into whole-life scope and live conversation
- **LCM / Epic 14 (Life Correlation Matrix):** whole-life node set this feature makes conversationally reachable
- **E02 (Voice Coaching):** voice greeting/persona name surface
- **Preferences system:** `user_preferences.voice_assistant_name`

### MVP Status
[X] Shipped — Waves 0-2, milestone M-016, completed 2026-07-03

---

## F11.2: PROVENANCE V2 (HONESTY LAYER)

### Description
The direct fix for the audit's single most damning finding — **"fabricated sophistication: deterministic-looking tables silently polluted with LLM content"** — where numbers that read as measured, clinical, or device-sourced were in fact app-computed estimates. Provenance v2 labels the Daily Health Score as an app-computed aggregate (never a measurement), tags every `RiskFlag` with a source so the coach's "worried" tone only fires on genuinely evidenced risk (not a derived-only signal dressed up as fact), and neutralizes wearable-greeting language when there is no fresh device reading to justify it.

### User Story
As a **Health-Conscious Skeptic**, I want my AI coach to be honest about which numbers are real device measurements and which are the app's own estimates so that I can trust its confident claims and never feel misled by a "worried" tone that's actually reacting to a guess.

### Flexibility Modes

| Mode | Experience |
|------|------------|
| **Light** | Provenance framing is invisible by default — the coach simply never overstates certainty ("your wellness score" instead of implying a clinical reading), with no extra UI or user action required. |
| **Deep** | User-visible language distinguishes "measured" (wearable-sourced), "derived" (app-computed from logged data), and "self-report" (user-entered) throughout coaching responses and risk-flag explanations — surfaced further by the Transparency Prompt Controller (F11.6) and Memory Explorer (F11.7). |

### Technical Foundation

**Daily Health Score labeling** (`comprehensive-user-context.service.ts:3554-3558`):
```
// Provenance: the Daily Health Score is an app-computed aggregate, never a device measurement.
"- SOURCE: This is an app-computed wellness score from logged activity + check-ins,
   NOT a measured or clinical value — refer to it as their 'wellness score', never
   as a biometric reading. The Biometrics sub-score is an ESTIMATE derived from app
   data, not a wearable reading — do not cite it as device-measured recovery/HRV/sleep."
```
This single system-prompt seam is the reason the fix reaches every proactive template (~17) without per-template edits — the same guardrail is reused by `proactive/wellness-score-provenance.util.ts` for the proactive messaging system prompt (Gap C, commit `2692bced`).

**RiskFlag source tagging:** every `RiskFlag` object carries a `source` field distinguishing measured/derived/self-report origin, so downstream tone logic (e.g., "worried" framing) can be conditioned on evidentiary strength instead of firing uniformly on any flag regardless of how it was computed.

**Greeting provenance** (`coach/greeting-provenance.util.ts`): the morning/session-opening greeting no longer cites specific wearable numbers (HRV, recovery %, sleep hours) when there is no fresh device reading for that day — it falls back to non-numeric, honest framing instead of stale or fabricated figures.

**Cross-domain inference honesty** (D5, commit `98fe77c8`): cross-domain signals spanning stress/spending/mood are explicitly framed in the system prompt as **inferred hypotheses to verify with the user**, not as measured facts — preventing the coach from asserting a cross-pillar causal claim with unwarranted confidence.

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Measured-vs-derived accuracy | 0 instances of app-computed data narrated as device-measured | Prompt-text audit / Turn Intelligence Contract `transparencyObject` stage |
| Risk-flag tone correctness | "Worried" tone only fires on flags with a `measured` or corroborated `derived` source | Unit tests on tone-selection logic |
| Wearable-greeting honesty | 0 greetings citing specific biometric numbers with no fresh reading that day | `greeting-provenance.util` unit tests |
| Cross-domain claim framing | 100% of cross-domain (stress/spending/mood) claims use hypothesis language, not assertion | Prompt-template regression tests |

### Acceptance Criteria

- [x] Daily Health Score system-prompt section explicitly labels the score as app-computed, never clinical/measured
- [x] Biometrics sub-score explicitly labeled an estimate when derived (not wearable-sourced)
- [x] `RiskFlag` carries a `source` field; tone logic reads it before selecting "worried"/concerned framing
- [x] Greeting logic suppresses specific wearable numbers absent a fresh reading for that day
- [x] Cross-domain (stress/spending/mood) correlations framed as hypotheses to verify, not measured fact
- [x] Proactive messaging system prompt reuses the same provenance guardrail (single seam, ~17 templates covered)
- [x] Fix verified as a true no-op for the previously-suspected "Gap D" (training-intensity recovery provenance) — confirmed `trainingIntensity` is only built when `whoop.isConnected && lastRecovery.score != null`, so recovery% was always correctly device-gated already

### Error Handling Scenarios

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| **No wearable connected, greeting would need a number** | `whoop.isConnected === false` or no fresh reading today | Greeting omits the number, uses qualitative framing | "Ready for today?" instead of a fabricated recovery % |
| **RiskFlag has no clear source** | Source field missing/unclassifiable | Defaults to non-alarming, neutral tone (fail-safe, not fail-worried) | Flag surfaced factually, without emotionally-loaded language |
| **Cross-domain signal is strong but unverified by user** | Correlation present but user hasn't confirmed the link | Framed as a question, not a statement | "I'm noticing your spending tends to rise on high-stress days — does that match your experience?" |
| **Biometrics sub-score computed with partial app data** | Missing inputs for the estimate | Still labeled ESTIMATE explicitly; not silently upgraded to "measured" once partial data exists | "Biometrics estimate (partial data)" framing preserved |

### Provenance Labeling Decision Process (High-Level)

```
Per-Turn Provenance Labeling:

1. For every numeric or qualitative health claim entering the prompt:
   a. Classify source: measured (wearable) | derived (app-computed) | self-report (user-entered)
   b. If measured: cite freely, with device/date context if relevant
   c. If derived: label explicitly ("wellness score", "estimate") — NEVER call it a reading
   d. If self-report: attribute to the user ("you logged...") — never assert as objective fact

2. RiskFlag Tone Gating:
   - Read flag.source before selecting response tone
   - measured or corroborated derived (multi-system agreement) → tone may reflect concern
   - single-source derived only → neutral, informational tone; no "worried" language

3. Greeting Construction:
   - Check for fresh wearable reading (today's date, connected device)
   - If present: may cite specific number
   - If absent: use qualitative, non-numeric framing — never reuse yesterday's number as today's

4. Cross-Domain Claim Framing:
   - Any correlation spanning stress/spending/mood/other cross-pillar signals
   - ALWAYS framed as hypothesis: "I'm noticing X — does that match how you experience it?"
   - NEVER framed as settled fact, regardless of correlation strength

5. Proactive Channel Reuse:
   - Same provenance guardrail text injected into proactive-messaging system prompt
   - Single source of truth avoids per-template drift across ~17 WhatsApp/push templates
```

### Cross-Pillar Connections

**To Holistic Health Score (E08 F8.3):**
- Directly labels the score this feature computes — the honesty layer sits on top of, not instead of, the existing scoring engine.

**To Fitness (E5) / Wearable Integrations (E9):**
- Governs when wearable-derived numbers may be cited vs. when the app must fall back to qualitative framing.

**To Proactive Interventions (E08 F8.6):**
- The same guardrail seam reaches the proactive WhatsApp/push channel, not just live chat.

**To Turn Intelligence Contract (F11.5):**
- The `transparencyObject` stage's required role (`provenance`) is this feature's structural enforcement mechanism.

**To Transparency Prompt Controller (F11.6):**
- Converts this feature's static labeling rules into a pre-generation, per-turn behavioral directive.

### Dependencies
- **E08 F8.3 (Holistic Health Score):** the score this feature labels
- **E09 (Data Integrations):** wearable connection/freshness state that gates measured-vs-derived framing
- **F11.6 (Transparency Prompt Controller):** downstream consumer that operationalizes this labeling pre-generation

### MVP Status
[X] Shipped — commits `66ce64d6` (D2, on `dbd43573`), `98fe77c8` (D5), `2692bced` (D6)

---

## F11.3: EVIDENCE & ANSWERABILITY GATE (WAVE 0)

### Description
Cross-system axis unification: before this feature, the confidence engine and the pre-response answerability gate each computed their own version of three shared confidence axes — multi-system agreement, historical pattern strength, and predictive reliability — from the same underlying signals (LCM edges, cross-pillar contradictions, prediction accuracy). That duplication meant the two systems could silently disagree about how confident the coach should be. Wave 0 extracts one pure, deterministic helper (`crossSystemAxes`) that both the post-response confidence engine and the pre-response answerability gate call, so a turn's evidentiary strength is scored identically everywhere it matters — and, critically, so the answerability gate can refuse to let the coach answer confidently when the underlying evidence genuinely isn't there.

### User Story
As a **Trust-First User**, I want the coach to be blocked from sounding confident about something it has no real cross-system evidence for so that its confident answers are always backed by actual agreement across my data, not by one engine's optimistic guess that another engine would have scored differently.

### Flexibility Modes

| Mode | Experience |
|------|------------|
| **Light** | Entirely invisible — the axis unification runs identically regardless of user tier; the user only experiences its effect as fewer overconfident claims once the gate-feed flag is enabled. |
| **Deep** | The axes (with their reasons for `null`) are inspectable via the confidence breakdown surfaced in coaching responses and the Memory Explorer's confidence/provenance fields (F11.7) once `ENABLE_GATE_CROSS_SYSTEM` is enabled. |

### Technical Foundation

**Single source of truth** (`server/src/services/confidence/cross-system-axes.util.ts`) — pure, no I/O, no `Date.now`, extracted verbatim from what previously lived inline in both `confidence-engine.service.ts` and `answerability-engine.service.ts`:

```typescript
export interface CrossSystemSignals {
  lcm: { edges: Array<{ domainA: string; domainB: string; confidence: number; evidenceCount: number }>;
         nodesWithData: string[] };
  contradictions: Array<{ pillarA: string; pillarB: string; severity: string }>;
  prediction: { overallAccuracy: number; totalTracked: number };
}

export interface CrossSystemAxes {
  multiSystemAgreement: ConfidenceAxis;
  historicalPattern: ConfidenceAxis;
  predictiveReliability: ConfidenceAxis;
}
```

**Real thresholds (grounded in shipped code):**
- `multiSystemAgreement`: scored only when **≥2 of 3 systems** (LCM edges, LCM nodes-with-data, contradictions) are present in the touched-domain scope; otherwise `score: null` with `reason: "Fewer than 2 systems have cross-domain data here"`. When scored, it's edge-confidence average minus a 0.25 penalty per high/critical-severity contradiction.
- `historicalPattern`: scored only when touched LCM edges exist; each edge contributes `evidenceCount / 10` (clamped 0-1); otherwise `null` with `reason: "Not enough cross-domain history learned yet"`.
- `predictiveReliability`: scored only when **≥7 tracked predictions** exist (`totalTracked >= 7`); otherwise `null` with `reason: "Fewer than 7 tracked predictions"`.

**Consumers:** `confidence/confidence-engine.service.ts`, `confidence/confidence-signals.service.ts` (post-response confidence), `reasoning/answerability-engine.service.ts`, `reasoning/discovery-gate.service.ts` (pre-response gate), `intelligence/turn-intelligence.service.ts` (per-turn memoized provider feeding both).

**Rollout flag:** `ENABLE_GATE_CROSS_SYSTEM` — **defaults OFF**. The axis unification itself is live (both engines already call the same helper — no scoring drift), but feeding the unified axes into the *pre-response answerability gate's blocking decision* is gated behind this flag, meaning the gate does not yet block live answers on cross-system evidence in production.

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Axis-scoring consistency | 100% agreement between confidence engine and answerability gate axis scores for the same turn | Unit test (`cross-system-axes.util.test.ts`) — same input, same output by construction |
| Null-honesty rate | Axes correctly return `null` (not a fabricated low score) when evidence thresholds aren't met | Boundary tests at `presentSystems<2`, `totalTracked<7`, zero touched edges |
| Gate-feed readiness | Live-PG E2E latency/mode check passes before flag flip | Tracked as exit criterion T9 in the SIA vNext tracker |
| Answer-blocking precision (once enabled) | Gate blocks confident answers only when axes are genuinely absent, not merely low | Post-enable A/B on answer-block rate vs. user-reported "coach seemed unsure without reason" |

### Acceptance Criteria

- [x] `crossSystemAxes()` extracted as pure function with no duplicated logic remaining inline in either engine
- [x] Both confidence engine and answerability gate call the identical helper for A2/A3/A4 axes
- [x] Each axis returns `score: null` with an explicit human-readable `reason` when its evidence threshold isn't met (never a fabricated placeholder score)
- [x] Per-turn memoized provider (`turn-intelligence.service.ts`) avoids recomputing axes multiple times within one turn
- [x] `ENABLE_GATE_CROSS_SYSTEM` flag gates the gate-feed behavior specifically (not the axis computation itself, which is always live)
- [ ] Live-PG E2E latency/mode validation completed before flipping `ENABLE_GATE_CROSS_SYSTEM` to `true` anywhere (tracked, not yet executed — T9)

### Error Handling Scenarios

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| **Fewer than 2 cross-system data sources present** | `presentSystems < 2` in scope | `multiSystemAgreement.score = null`, explicit reason recorded | No confidence claim made on this axis; coach doesn't imply cross-system agreement |
| **No LCM edges touched for this turn's domains** | `touchedEdges.length === 0` | `historicalPattern.score = null` | Coach doesn't cite "historical pattern" as evidence |
| **Fewer than 7 tracked predictions** | `totalTracked < 7` | `predictiveReliability.score = null` | Coach doesn't cite prediction-accuracy confidence |
| **Gate-feed flag enabled without live-PG E2E validation** | Manual deploy oversight | Flag remains OFF by default; enabling requires the T9 exit criterion | N/A — operational safeguard, not user-facing |

### Cross-System Axis Computation (High-Level)

```
crossSystemAxes(touchedDomains, signals):

1. Scope filtering:
   - touchedEdges = LCM edges where either domain is in touchedDomains AND evidenceCount > 0
   - touchedNodes = nodesWithData filtered to touchedDomains
   - touchedContras = contradictions where either pillar is in touchedDomains

2. multiSystemAgreement (A2):
   presentSystems = count of [hasEdges, hasNodes, hasContradictions] that are true
   IF presentSystems >= 2:
     edgeConf = average confidence across touchedEdges (default 0.5 if none)
     highContras = count of severity in {high, critical}
     score = clamp(edgeConf - 0.25 * highContras)
   ELSE:
     score = null, reason = "Fewer than 2 systems have cross-domain data here"

3. historicalPattern (A3):
   IF touchedEdges.length > 0:
     depth = average of clamp(evidenceCount / 10) across touchedEdges
     score = depth
   ELSE:
     score = null, reason = "Not enough cross-domain history learned yet"

4. predictiveReliability (A4):
   IF totalTracked >= 7:
     score = clamp(overallAccuracy / 100)
   ELSE:
     score = null, reason = "Fewer than 7 tracked predictions"

5. Consumption:
   - Confidence engine: axes feed the POST-response confidence breakdown shown to user
   - Answerability gate: axes feed the PRE-response decision to answer, hedge, or decline
     (live gate-feed behind ENABLE_GATE_CROSS_SYSTEM; axis computation itself always runs)
```

### Cross-Pillar Connections

**To Pattern Correlation Engine (E08 F8.1) / LCM (Epic 14):**
- LCM edges and evidence counts are the direct input to `multiSystemAgreement` and `historicalPattern`.

**To Predictive Insights (E08 F8.2):**
- Prediction accuracy/tracked-count feeds `predictiveReliability` directly.

**To Turn Intelligence Contract (F11.5):**
- `answerabilityAnalysis` and `confidenceAnalysis` stages both require `controller` + `provenance` roles — this feature is the shared evidentiary backbone both stages report against.

**To Answerability Recovery Controller (F11.6):**
- When the gate can't confidently score a turn, this controller injects the cautious directive — the direct behavioral consumer of a `null`-axis outcome.

### Dependencies
- **LCM / Epic 14 (Life Correlation Matrix):** source of edges/nodes/evidence counts
- **E08 F8.1 (Pattern Correlation), F8.2 (Predictive Insights):** source signals for the axes
- **F11.4 (Context Assembler):** contradictions data shared with this feature's `multiSystemAgreement` axis

### MVP Status
[X] Built + tested + committed (`24022021`) — axis computation live; gate-feed to live answer-blocking behind `ENABLE_GATE_CROSS_SYSTEM` (default OFF, not yet gating production answers — see Known Gaps)

---

## F11.4: CONTEXT ASSEMBLER (WAVE 1)

### Description
Two slices that surface intelligence the platform already computed — but that lived only in dashboards or background jobs — directly into the live system prompt SIA reasons from on every turn. Slice 1 gives the coach the user's disengagement-risk tier (from the commitment-contract/accountability system) and the top critical/high cross-pillar contradictions, so tone and urgency can reflect real risk instead of defaulting to generic encouragement. Slice 2 replaces population-average framing with the user's own 30-day personal baseline (mood, energy, stress, anxiety, plus WHOOP biometric baseline) and a today-vs-normal deviation, so "your stress seems high" is judged against the user's own history, not a generic norm.

### User Story
As a **Returning Struggling User**, I want the coach to notice when I'm at real risk of disengaging or when today is genuinely unusual FOR ME — not just unusual compared to some average person — so that its concern feels earned and personal instead of generic or, worse, tone-deaf to my actual history.

### Flexibility Modes

| Mode | Experience |
|------|------------|
| **Light** | Risk tier and baseline deviation influence tone and urgency automatically; the user experiences this as the coach "getting it" without ever seeing the underlying tier/baseline numbers. |
| **Deep** | Contradictions list (`pillarA`, `pillarB`, `severity`, `aiCorrection`) and baseline deltas are inspectable via the Memory Explorer and Life Operating Map (F11.7), including the exact 30-day baseline values the coach is comparing today against. |

### Technical Foundation

**Slice 1 — Accountability risk + contradictions** (`comprehensive-user-context.service.ts`, commit `b98d4aa1`):
- `context.contradictions?: Array<{ pillarA: string; pillarB: string; severity: 'critical'|'high'; aiCorrection: string | null }>` — populated by `getContradictionsContext()` (`comprehensive-user-context.service.ts:3045`), already severity-sorted, lazy-fetched, and **omitted entirely when empty** (no filler text).
- Behavioral tier and accountability risk are fetched in parallel with wellbeing signals, accountability contracts, and personal baselines (`comprehensive-user-context.service.ts:632`) — a single `Promise.all` batch, avoiding sequential round-trips.
- Rendered into the prompt at `comprehensive-user-context.service.ts:3370`, contradictions inject an explicit "here's what conflicts" section the coach can cite directly.

**Slice 2 — Personal baselines** (commit `25322f82`):
- `context.baseline30d?: { hrv, ...30-day personal averages }` (`comprehensive-user-context.service.ts:95-96`) computed alongside 7-day trend averages, only when the user is connected and has sufficient data (`:1074-1101`).
- Qualitative HRV status derived from latest-vs-30-day-baseline comparison (`deriveHrvStatus`, `:1101-1102`) rather than an absolute threshold.
- Prompt framing is explicit about judging against the user's OWN normal (`comprehensive-user-context.service.ts:3208`):
  > *"A value near their own normal is fine even if it looks 'low' by population standards; only flag a real deviation from THEIR baseline."*
- Today-vs-normal deviation computed for calorie intake as one concrete instance (`todayCalorieDeviation`, `todayDeviationClass` in `{on_target, over, under}`, `:2424-2427`), following the same personal-baseline pattern used for the emotional/biometric baselines.

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Risk-tier reach rate | 100% of turns for at-risk users include disengagement-risk tier in the assembled context | Turn Intelligence Contract `prompt_evidence` role check |
| Contradiction surfacing | Critical/high contradictions appear in the prompt within 1 turn of detection | Integration test on `getContradictionsContext` freshness |
| Baseline-vs-population accuracy | 0 instances of population-average framing where a 30-day personal baseline exists | Prompt regression test |
| Context-fetch latency | Parallel batch (behavioral tier + wellbeing + contracts + risk + contradictions + baselines) completes without added round-trip latency vs. pre-Wave-1 | Query-count assertion in integration tests |

### Acceptance Criteria

- [x] Disengagement-risk tier fetched and injected into system prompt with tone/urgency implications
- [x] Top critical/high contradictions (severity-sorted) injected, each with pillar pair + AI correction text
- [x] Contradictions section omitted entirely (not rendered as empty/placeholder) when the user has none
- [x] 30-day personal baseline (mood/energy/stress/anxiety) computed and available for prompt injection
- [x] WHOOP 30-day baseline (HRV, recovery, sleep) computed alongside emotional baseline
- [x] Prompt explicitly instructs the coach to judge today against the user's OWN baseline, not population norms
- [x] All Slice 1 + Slice 2 fetches batched in one parallel `Promise.all`, not sequential per-field queries
- [x] Qualitative HRV status derived relative to personal baseline, not an absolute cutoff

### Error Handling Scenarios

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| **No contradictions exist for user** | `getContradictionsContext` returns empty array | Field omitted from context object entirely (`...(contradictions ? {contradictions} : {})`) | Coach doesn't reference contradictions at all |
| **Insufficient data for 30-day baseline** | <30 days of mood/energy/stress logging | Baseline section omitted; coach falls back to non-comparative framing | "How are you feeling today?" instead of a deviation claim |
| **WHOOP not connected, no baseline30d.hrv** | `whoop.baseline30d` undefined | HRV status derivation skipped; no fabricated qualitative status | No HRV commentary in the greeting/context |
| **Contradiction has a null `aiCorrection`** | `aiCorrection: null` | Coach surfaces the conflict without a canned correction, invites user input | "I'm seeing X and Y point different directions — what's actually going on?" |

### Context Assembly Process (High-Level)

```
Per-Turn Context Assembly (Wave 1):

1. Parallel Batch Fetch (single Promise.all):
   - behavioralTier
   - wellbeingSignals
   - accountabilityContracts
   - accountabilityRisk (disengagement-risk tier)
   - contradictions (severity-sorted, critical/high only)
   - personalBaselines (30-day emotional + WHOOP)

2. Conditional Injection:
   - IF contradictions.length > 0: inject "Conflicting Signals" section with pillar pairs + corrections
   - IF accountabilityRisk indicates elevated tier: adjust tone/urgency directive
   - IF baseline30d available: inject "Your Normal" comparison framing
   - ELSE (any of the above absent): omit section — never render empty placeholders

3. Deviation Framing:
   - Compute today-vs-baseline delta per available metric
   - Classify: on_target | over | under (or equivalent per-metric bands)
   - Explicit instruction: deviation from THEIR baseline matters, not population norms

4. Prompt Rendering:
   - Contradictions rendered as an explicit conflict-resolution prompt to the coach
   - Baseline comparison rendered as "personal normal" framing, never generic thresholds
   - Both sections coexist with F11.2's provenance labeling (derived vs. measured baselines)
```

### Cross-Pillar Connections

**To Commitment Contract / Accountability system:**
- Disengagement-risk tier is sourced from the accountability/commitment-contract engine — this feature is the wire that gets it into live conversation.

**To Pattern Correlation Engine (E08 F8.1) / LCM (Epic 14):**
- Contradictions are cross-pillar conflicts detected by the correlation/LCM layer; this feature is their conversational delivery mechanism.

**To Provenance v2 (F11.2):**
- Baseline framing follows the same honesty discipline — a derived 30-day average is never narrated as a clinical measurement.

**To Evidence & Answerability Gate (F11.3):**
- Contradictions feed directly into the `multiSystemAgreement` axis computed by `cross-system-axes.util.ts`.

### Dependencies
- **E08 F8.1 (Pattern Correlation):** source of contradiction detection
- **LCM / Epic 14:** cross-pillar signal graph contradictions are drawn from
- **Commitment Contract audit findings:** accountability risk tier source
- **F11.2 (Provenance v2):** shared honesty framing for baseline claims
- **E09 (Data Integrations):** WHOOP connection state gating baseline availability

### MVP Status
[X] Shipped — Slice 1 committed `b98d4aa1`, Slice 2 committed `25322f82`

---

## F11.5: TURN INTELLIGENCE CONTRACT

### Description
The structural guarantee that makes "compute-but-discard" impossible going forward, rather than merely fixed once. A pure, deterministic per-turn auditor that tracks every computed intelligence stage (intent detection, memory/profile retrieval, life-correlation analysis, answerability, confidence, risk, prediction, opportunity detection, adaptive planning, recommendation generation, transparency, memory update) and asserts each stage either played a real, attributable role in the response — as a `controller` (drove a decision), `prompt_evidence` (appeared in the text sent to the LLM), `provenance` (labeled a claim's source), or `learner` (fed memory/profile updates) — or is explicitly recorded as `discarded`, `degraded`, or intentionally `disabled` (with a reason). This is not a fix for one gap; it is the mechanism that surfaces every future one automatically.

### User Story
As a **Product/Engineering Owner**, I want an automated, per-turn structural check that proves every computed intelligence signal either did something real in the response or is explicitly flagged as not participating, so that the "compute-but-discard" failure mode can never silently reappear as the system grows.

### Flexibility Modes

| Mode | Experience |
|------|------------|
| **Light** | Fully invisible to end users — this is an internal reliability mechanism, not a user-facing feature. It runs on every turn regardless of user tier. |
| **Deep** | Operationally inspectable via `GET /api/health/premium-intelligence` (aggregate, PII-free stage/status/action health) and `GET /api/health/premium-intelligence/alerts` (compact alert contract, HTTP 503 only for paging-worthy states) for engineering/on-call use. |

### Technical Foundation

**Core contract shape** (`server/src/services/intelligence/turn-intelligence-contract.service.ts`):

```typescript
export const TURN_INTELLIGENCE_STAGES = [
  'intentDetection', 'memoryRetrieval', 'profileRetrieval', 'lifeCorrelationAnalysis',
  'answerabilityAnalysis', 'confidenceAnalysis', 'riskAnalysis', 'predictionGeneration',
  'opportunityDetection', 'adaptivePlanning', 'recommendationGeneration',
  'transparencyObject', 'memoryUpdate',
] as const;

export type TurnSignalStatus = 'not_run' | 'ran' | 'degraded' | 'failed';
export type TurnSignalRole = 'controller' | 'prompt_evidence' | 'provenance' | 'learner';
export type TurnContractStatus = 'ready' | 'degraded' | 'failed_contract';

const REQUIRED_ROLES: Record<TurnIntelligenceStage, TurnSignalRole[]> = {
  intentDetection: ['controller'],
  memoryRetrieval: ['prompt_evidence'],
  profileRetrieval: ['prompt_evidence'],
  lifeCorrelationAnalysis: ['controller', 'prompt_evidence', 'provenance'],
  answerabilityAnalysis: ['controller', 'provenance'],
  confidenceAnalysis: ['controller', 'provenance'],
  riskAnalysis: ['controller', 'provenance'],
  predictionGeneration: ['controller', 'prompt_evidence', 'provenance'],
  opportunityDetection: ['controller', 'prompt_evidence'],
  adaptivePlanning: ['controller'],
  recommendationGeneration: ['controller'],
  transparencyObject: ['provenance'],
  memoryUpdate: ['learner'],
};
```

A stage is only counted as genuinely participating (`participatesInReasoning: true`) when its recorded `roles` cover its `REQUIRED_ROLES`; otherwise it is listed in `discardedSignals`. `TurnContractStatus` degrades from `ready` → `degraded` → `failed_contract` based on `STATUS_SEVERITY` merging across all stages.

**Supporting service cluster** (`server/src/services/intelligence/`):
- `turn-contract-runtime-policy.service.ts` — maps live env flags to `disabledStages` reasons (e.g., `ENABLE_CONFIDENCE_CONTROLLER !== "true"` → `confidenceAnalysis` and `opportunityDetection` disabled; `ENABLE_LCM_ROOT_CAUSE === "false"` → `lifeCorrelationAnalysis` disabled), so **deliberately dormant controllers are never misclassified as accidental discarded intelligence**.
- `turn-contract-metadata-persistence.service.ts` — writes the assessed contract to `rag_messages.metadata.turnIntelligenceContract` on the scoped assistant message only; non-blocking, degrades silently on DB write failure.
- `turn-contract-observability.service.ts` — bounded aggregate stage/status/action health with no user/conversation/message/prompt identifiers, exposed via `GET /api/health/premium-intelligence`; alert-routing variant at `GET /api/health/premium-intelligence/alerts` (HTTP 503 reserved for paging-worthy recovery states).
- `premium-intelligence-rollout-preflight.service.ts` — `npm run intelligence:preflight` checks answerability flags, controller rollout state, semantic-memory readiness, DB schema prerequisites, and recent turn-contract metadata evidence before any flag is flipped ON in an environment.
- `turn-contract-live-verifier.service.ts` — `npm run intelligence:verify-turn-contract`, a token-required authenticated live verifier that sends one real RAG chat turn and polls `rag_messages` for the resulting contract metadata.

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Discarded-signal detection | 100% of stages missing a required role are flagged, 0 false "discarded" on intentionally-disabled stages | Contract unit tests + runtime-policy tests |
| Contract persistence reliability | Metadata write failures never block the user-facing response | `turn-contract-metadata-persistence.service.test.ts` |
| Rollout-preflight coverage | Preflight catches all 5 rollout prerequisites (flags, controllers, semantic memory, DB schema, recent evidence) before flag-flip | `premium-intelligence-rollout-preflight.service.test.ts` |
| Prompt-evidence guard | Root-cause, predictive-outcome, accountability, and provenance directives provably present in prompt-facing text | `turn-intelligence-pipeline.integration.test.ts` |

### Acceptance Criteria

- [x] All 13 turn-intelligence stages defined with explicit required-role sets
- [x] `assess()` correctly computes `participatesInReasoning`, `missingRoles`, `discardedSignals`, `degradedStages` per stage
- [x] Runtime policy distinguishes intentionally-disabled stages (flag OFF) from genuinely discarded intelligence (flag ON, signal computed, but no role fulfilled)
- [x] Contract metadata persisted to the correct scoped assistant message only, non-blocking on failure
- [x] Aggregate observability endpoint exposes stage/status/action health with zero PII (no user/conversation/message/prompt identifiers)
- [x] Alert endpoint returns HTTP 503 only for genuinely paging-worthy states, not routine degradation
- [x] `npm run intelligence:preflight` checks flags, controller rollout, semantic-memory readiness, DB schema, and recent turn-contract evidence
- [x] `npm run intelligence:verify-turn-contract` provides an authenticated, token-required live verification path
- [ ] Live verifier executed with a real JWT in the target deployment environment (tracked, not yet executed)
- [ ] Alert endpoint wired into the actual production monitoring/on-call routing system (tracked, not yet executed)

### Error Handling Scenarios

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| **A computed signal never gets a required role fulfilled** | `assess()` finds `missingRoles.length > 0` for that stage | Stage added to `discardedSignals`; contract status degrades | None to end user — this is an internal reliability signal, not user-facing |
| **Controller deliberately disabled via flag** | `turn-contract-runtime-policy` sees `ENABLE_X_CONTROLLER !== 'true'` | Stage marked `disabled` with explicit reason string, excluded from `discardedSignals` | None — correctly distinguished from a bug |
| **Metadata persistence write fails** | DB write to `rag_messages.metadata` throws | Logged, swallowed, response still returned to user | None — failure is invisible to the conversation, only visible in observability |
| **Contract reaches `failed_contract` status** | Merged status severity crosses the failed threshold | Recorded in metadata + observability aggregate; response still generated (contract is an auditor, not a blocker) | None directly, but repeated `failed_contract` should trigger engineering alert via the alerts endpoint |

### Turn Contract Assessment Process (High-Level)

```
Per-Turn Contract Assessment:

1. Recording (during turn execution):
   FOR each pipeline stage that runs:
     recorder.markStage(stage, status, roles[], detail?)
   - status: not_run | ran | degraded | failed
   - roles: subset of [controller, prompt_evidence, provenance, learner] actually fulfilled

2. Runtime Disabled-Stage Resolution:
   disabledStages = getTurnContractDisabledStagesFromEnv(env)
   - Maps ENABLE_CONFIDENCE_CONTROLLER / ENABLE_TRANSPARENCY_CONTROLLER /
     ENABLE_LCM_ROOT_CAUSE (and others) to stage → reason string

3. Assessment (recorder.assess(options)):
   FOR each stage in TURN_INTELLIGENCE_STAGES:
     IF stage in disabledStages:
       mark disabled, record reason, EXCLUDE from discardedSignals
     ELSE:
       missingRoles = REQUIRED_ROLES[stage] - trace.roles
       participatesInReasoning = missingRoles.length === 0
       IF NOT participatesInReasoning AND status was 'ran':
         ADD stage to discardedSignals

4. Status Rollup:
   overallStatus = merge severity across all stage statuses
   premiumReadinessScore = computed from participation rate across non-disabled stages
   status = ready | degraded | failed_contract (by severity threshold)

5. Persistence + Observability:
   - Persist contract to rag_messages.metadata.turnIntelligenceContract (non-blocking)
   - Feed bounded, PII-free aggregate into turn-contract-observability
   - Aggregate exposed via /api/health/premium-intelligence (+ /alerts variant)
```

### Cross-Pillar Connections

**To every intelligence signal across the platform:**
- This feature is domain-agnostic by design — it audits fitness, nutrition, wellbeing, finance, career, relationship, and spirituality signals identically, since it operates on the abstract stage/role contract, not domain-specific logic.

**To Evidence & Answerability Gate (F11.3):**
- `answerabilityAnalysis` and `confidenceAnalysis` stages are directly audited by this contract, using F11.3's axes as their evidentiary basis.

**To Intelligence Prompt Controllers (F11.6):**
- Each of the 8 controllers is a direct producer of one or more stage traces this contract audits.

### Dependencies
- **F11.3 (Evidence & Answerability Gate):** axis computations this contract's `confidenceAnalysis`/`answerabilityAnalysis` stages reference
- **F11.6 (Intelligence Prompt Controllers):** the controllers whose participation this contract audits
- **E08 F8.1/F8.2 (Pattern Correlation, Predictive Insights):** source signals for `lifeCorrelationAnalysis` and `predictionGeneration` stages

### MVP Status
[🟡] Built + tested, wired into chat/stream (both LangGraph paths) — **operationally in progress**: live verifier not yet executed with a real JWT in target env, alert endpoint not yet wired to production on-call, DB-backed preflight not yet run in target deployment env (tracked as T7 in `SIA-VNEXT-MASTER-TRACKER.md`)

---

## F11.6: INTELLIGENCE PROMPT CONTROLLERS (WAVE 2)

### Description
Eight controllers that are the actual mechanism by which computed intelligence changes what SIA says — converting raw signals (confidence scores, LCM edges, prediction accuracy, due commitments, gate degradation, provenance state) into concrete, pre-generation behavioral directives injected into the system prompt before the LLM call, not post-hoc annotations after the fact.

| Controller | File | Behavior |
|---|---|---|
| **Confidence Controller** | `server/src/services/confidence/confidence-controller.service.ts` | Appends a calibration caveat to low-confidence answers instead of letting the response read as uniformly certain |
| **Accountability Prompt Controller** | `server/src/services/intelligence/accountability-prompt-controller.service.ts` | Converts due-commitment reminders into blocker-oriented coaching directives ("what's actually in the way?") instead of generic nagging |
| **Answerability Recovery Controller** | `server/src/services/intelligence/answerability-recovery-prompt-controller.service.ts` | Injects a cautious directive when the answerability gate can't confidently score a turn (fail-open via `onDegraded`) |
| **Life Correlation Controller** | `server/src/services/intelligence/life-correlation-controller.service.ts` | Converts high-confidence LCM edges + contradictions into root-cause reasoning directives — hypotheses, never fabricated causal claims |
| **Predictive Response Controller** | `server/src/services/intelligence/predictive-response-controller.service.ts` | Governs confident-forecast vs. hedge language based on live prediction-accuracy telemetry (needs ≥7 tracked predictions to speak confidently) |
| **Transparency Prompt Controller** | `server/src/services/intelligence/transparency-prompt-controller.service.ts` | Governs claim language (measured / derived / stale) pre-generation — the live enforcement arm of Provenance v2 (F11.2) |
| **Root-Cause Prompt Controller** | `server/src/services/intelligence/root-cause-prompt-controller.service.ts` | Composes the Life Correlation + Predictive controllers into one unified directive, with a 700ms fail-open timeout |
| **Turn Intelligence Contract Integration** | (see F11.5) | The auditor all 7 behavioral controllers above report their participation to |

### User Story
As a **Whole-Life Optimizer**, I want the coach's confidence, root-cause reasoning, forecasts, accountability nudges, and claim language to visibly change based on real evidence strength turn-by-turn so that its behavior earns my trust instead of sounding uniformly assertive regardless of how much it actually knows.

### Flexibility Modes

| Mode | Experience |
|------|------------|
| **Light** | Controllers operate invisibly — the user experiences the effect (a hedge when evidence is thin, a confident forecast when the coach has a track record) without any visible controller UI. |
| **Deep** | Confidence caveats, root-cause hypothesis framing, and prediction-reliability language are all directly visible in the response text itself — this is inherently a "Deep" feature since its entire output is the coaching language itself, not a separate panel. |

### Technical Foundation

**Wiring:** all 8 controllers are wired into `langgraph-chatbot.service.ts` (~335-line diff) and into `reasoning/discovery-gate.service.ts`'s `onDegraded` hook, so the Answerability Recovery Controller fires specifically when the gate can't score a turn.

**Root-Cause Prompt Controller composition and fail-open:**
```typescript
// server/src/services/intelligence/root-cause-prompt-controller.service.ts
enabled = process.env.ENABLE_LCM_ROOT_CAUSE !== 'false',   // defaults ON
timeoutMs = 700,                                            // fail-open bound
```
Composes Life Correlation + Predictive Response controller output into one directive; if composition exceeds 700ms, it fails open (returns no directive) rather than blocking the turn.

**Flag-gating status (as-shipped):**
| Controller | Flag | Default |
|---|---|---|
| Confidence Controller | *(none)* | **Always on — not flag-gated** |
| Transparency Prompt Controller | *(none)* | **Always on — not flag-gated** |
| Accountability Prompt Controller | `ENABLE_ACCOUNTABILITY_CONTROLLER` | OFF |
| Root-Cause Prompt Controller | `ENABLE_LCM_ROOT_CAUSE` | **ON** (reviewer recommended OFF) |
| Life Correlation Controller | *(gated indirectly via Root-Cause composition)* | Follows `ENABLE_LCM_ROOT_CAUSE` |
| Predictive Response Controller | *(gated indirectly via Root-Cause composition)* | Follows `ENABLE_LCM_ROOT_CAUSE` |
| Answerability Recovery Controller | *(fires on gate degradation, not a standalone flag)* | Always on when gate degrades |

**Fault isolation:** the Accountability Prompt Controller call is fault-isolated from the rest of the turn (a failure there cannot take down the whole response) — an explicit fix applied during the Wave 2 review pass.

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Directive reach rate | Root-cause, predictive-outcome, accountability, and provenance directives provably present in prompt-facing text when their preconditions are met | `turn-intelligence-pipeline.integration.test.ts` |
| Byte-identical flags-off behavior | 0 behavior change when a controller's flag is OFF vs. pre-Wave-2 baseline | Opus-reviewed re-verification: "byte-identical when flags off" |
| Predictive confidence gating | Predictive Response Controller never issues a confident forecast with <7 tracked predictions | `predictive-response-controller.service.test.ts` |
| Fail-open latency bound | Root-Cause composition never blocks a turn beyond 700ms | `root-cause-prompt-controller.service.test.ts` |
| Fault isolation | Accountability controller failure never produces a `failed_contract` or blocks the response | Turn-contract regression test on plain stream turns |

### Acceptance Criteria

- [x] All 8 controllers implemented, unit-tested (Confidence: n tests; Accountability: 4+; Answerability Recovery: 3; Life Correlation: 4; Predictive Response: 4; Root-Cause: 5; Transparency: 3; Turn Intelligence Contract: 6)
- [x] Root-Cause controller composes Life Correlation + Predictive Response with 700ms fail-open bound
- [x] Answerability Recovery controller wired to `discovery-gate.service.ts`'s `onDegraded` hook
- [x] Accountability, root-cause, and provenance directives verified present in prompt-facing text via integration test (not just unit-level)
- [x] Accountability controller call fault-isolated (cannot cascade-fail the turn)
- [x] Stream-vs-non-stream parity verified for accountability directive (present at both call sites)
- [x] Flags-off behavior independently re-verified as byte-identical to pre-Wave-2 baseline
- [ ] Confidence Controller and Transparency Prompt Controller shipped behind a feature flag (currently unflagged — tracked rollout-safety gap)
- [ ] `ENABLE_LCM_ROOT_CAUSE` default changed to OFF per reviewer recommendation (currently defaults ON — tracked rollout-safety gap)

### Error Handling Scenarios

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| **Root-cause composition exceeds 700ms** | Timeout bound hit | Fails open — no root-cause directive added, turn proceeds normally | Response generated without root-cause framing; no error surfaced |
| **Accountability controller throws** | Fault-isolated call boundary catches the error | Turn continues without the accountability directive; not marked `failed_contract` for this alone | No visible degradation to the user |
| **Confidence <7 tracked predictions but forecast requested** | Predictive Response Controller checks tracked count | Falls back to hedge language instead of confident forecast | "Early days on prediction accuracy for you — take this as a rough estimate" framing |
| **Gate degrades mid-turn (can't score answerability)** | `discovery-gate.service.ts` `onDegraded` fires | Answerability Recovery Controller injects cautious directive | Coach hedges explicitly rather than answering with false confidence |
| **Confidence/Transparency controllers ship unflagged and a regression appears** | No flag to instantly disable in production | Requires a code deploy to roll back (no runtime kill-switch) | Tracked as rollout-safety gap — see Known Gaps |

### Controller Directive Injection Process (High-Level)

```
Per-Turn Controller Pipeline (within langgraph-chatbot.service.ts):

1. Signal Gathering:
   - Confidence engine output (score, axes, reason for null axes)
   - Answerability gate output (ready/degraded)
   - Accountability contracts (due/overdue commitments)
   - LCM edges + contradictions (touched-domain scoped)
   - Prediction-accuracy telemetry (overallAccuracy, totalTracked)
   - Provenance state (measured/derived/self-report per claim)

2. Controller Invocation (in sequence, each fault-isolated):
   FOR each of the 8 controllers:
     TRY:
       directive = controller.compose(relevant signals)
       IF directive: append to system prompt directive block
       recorder.markStage(stage, 'ran', roles fulfilled)
     CATCH:
       recorder.markStage(stage, 'failed', [], error detail)
       continue — do not abort the turn

3. Root-Cause Composition (special case):
   IF ENABLE_LCM_ROOT_CAUSE !== 'false':
     race(composeRootCause(lifeCorrelation, predictive), timeout(700ms))
     IF timeout wins: fail open, no directive
     ELSE: inject composed root-cause directive

4. Flag Gating:
   FOR each flag-gated controller:
     IF flag OFF: skip entirely, mark stage 'disabled' with reason (not 'failed')
   Confidence + Transparency controllers currently have NO flag → always execute

5. Directive Assembly:
   - All surviving directives concatenated into the pre-generation system prompt
   - Turn Intelligence Contract records each controller's stage/status/roles
   - LLM call proceeds with the fully-composed, evidence-conditioned prompt
```

### Cross-Pillar Connections

**To Evidence & Answerability Gate (F11.3):**
- Confidence, Answerability Recovery, and Predictive Response controllers all consume F11.3's axis outputs directly.

**To Context Assembler (F11.4):**
- Accountability Prompt Controller consumes the disengagement-risk tier and due-commitment data Slice 1 assembled.

**To Provenance v2 (F11.2):**
- Transparency Prompt Controller is this feature's live enforcement of F11.2's static labeling rules.

**To Turn Intelligence Contract (F11.5):**
- Every controller here is a direct stage producer the contract audits for genuine participation.

**To LCM (Epic 14):**
- Life Correlation + Root-Cause controllers are the direct conversational consumers of LCM's edge/contradiction graph.

### Dependencies
- **F11.3 (Evidence & Answerability Gate):** confidence/answerability signal source
- **F11.4 (Context Assembler):** accountability risk + contradiction data source
- **F11.2 (Provenance v2):** transparency labeling rules this feature enforces live
- **F11.5 (Turn Intelligence Contract):** the auditor validating this feature's participation
- **LCM / Epic 14:** root-cause/life-correlation data source
- **Commitment Contract system:** accountability/due-commitment source

### MVP Status
[🟡] Complete, reviewed **APPROVE + fixes applied**, re-verified (478/478 unit suites, 6621 tests, 0 fail; typecheck 0; lint 0; Opus re-review CONFIRMED-SAFE-TO-LAND) — **shipped with 2 tracked rollout-safety gaps**: Confidence + Transparency controllers unflagged, `ENABLE_LCM_ROOT_CAUSE` defaults ON against reviewer recommendation (see Known Gaps)

---

## F11.7: INTELLIGENCE API SUITE

### Description
Six new first-class, inspectable REST endpoints that expose intelligence the platform previously only used to feed prompts or dashboards internally — now queryable directly, each with its own honest-null/degradation contract instead of ever fabricating a value for missing data.

| API | Endpoint | Purpose |
|---|---|---|
| **Executive Daily Briefing** | `GET /api/v1/intelligence/briefing` | Cross-pillar daily report: energy forecast, top risk/opportunity, accountability, workout readiness, recovery outlook, goal drift, prediction reliability, recommended actions |
| **Life Operating Map** | `GET /api/v1/intelligence/life-map` | Curated view of all LCM life-domain nodes, current signals, strongest relationships, leverage points |
| **Root Cause Explorer** | `GET /api/v1/intelligence/root-cause/:domain` | Per-domain upstream root-causes + downstream ripple forecast, walking LCM graph paths |
| **Ripple Simulator** | `GET /api/v1/intelligence/ripple/:domain?delta=` | "What-if" simulator projecting ranked downstream effects of a hypothetical delta on one domain |
| **Future Self Timeline** | `GET /api/v1/intelligence/future-self` | 7 / 30 / 90 / 365-day trajectory projections per metric |
| **Memory Explorer** | `GET /api/v1/intelligence/memory-explorer` | Inspectable, editable view of SIA's memories / profile facts / report intelligence with confidence + provenance per item |

### User Story
As an **Optimization Enthusiast**, I want to directly query the same sophisticated cross-pillar reasoning my coach uses in conversation — root causes, ripple effects, future trajectories, and even what it remembers about me — as first-class, always-available screens, not buried inside a chat transcript I'd have to ask the right question to surface.

### Flexibility Modes

| Mode | Experience |
|------|------------|
| **Light** | Executive Daily Briefing surfaces automatically as a proactive WhatsApp daily message (reusing the same briefing-building contract) — no need to open the app or query an API directly. |
| **Deep** | All six APIs directly queryable and rendered in the Client Cognitive OS Dashboard (F11.8); Root Cause Explorer and Ripple Simulator support per-domain drill-down and hypothetical "what-if" parameters. |

### Technical Foundation

**Executive Daily Briefing** (`server/src/services/intelligence/executive-daily-briefing.service.ts`) — real shipped shape:
```typescript
export interface ExecutiveDailyBriefing {
  energyForecast: ExecutiveBriefingItem;
  topRisk: ExecutiveBriefingItem | null;
  topOpportunity: ExecutiveBriefingItem | null;
  accountability: ExecutiveBriefingItem | null;
  workoutReadiness: ExecutiveBriefingItem;
  recoveryOutlook: ExecutiveBriefingItem;
  goalDrift: ExecutiveBriefingItem | null;
  predictionReliability: ExecutiveBriefingItem;
  recommendedActions: ExecutiveBriefingAction[];
}
```
Every nullable field (`topRisk`, `topOpportunity`, `accountability`, `goalDrift`) is genuinely `null` — not a fabricated placeholder — when the user has no signal for it (e.g., `topRisk` requires an actual daily-analysis report finding; `accountability` requires an actual due/overdue contract). `workoutReadiness`/`recoveryOutlook` fall back to `severity: 'neutral'`, `confidence: 'low'` framing when recovery data is missing, rather than guessing a score. The same contract is reused verbatim for the proactive WhatsApp daily-briefing surface — one source of truth, two delivery channels.

**Other five services** (`server/src/services/intelligence/{life-operating-map,root-cause-explorer,ripple-simulator,future-self-timeline,memory-explorer}.service.ts`) each export a `build*()` pure function plus a `get*(userId)` (or `get*(userId, domain[, delta])`) async wrapper — consistent pure-builder + IO-wrapper separation across all six services, enabling the builders to be unit-tested with fixture data independent of the database.

**Auth-scoping:** all six endpoints are user-scoped by the authenticated session; no domain/user parameter can be used to read another user's intelligence (IDOR-checked in the 3-reviewer pass at Wave 2 integration — see `intelligence-premium-routes.integration.test.ts`).

**Degradation contract:** `intelligence-premium-routes.integration.test.ts` proves upstream report/profile/LCM/memory service failures return an honest "unavailable" contract, never a bare 500, and never silently substitute fabricated data.

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Honest-null rate | 100% of nullable briefing/map/explorer fields are genuinely null (not fabricated) when their underlying signal is absent | `intelligence.controller.test.ts` + service unit tests |
| IDOR safety | 0 cross-user data leakage across all 6 endpoints | Integration test suite, 3-reviewer pass (Wave 2) |
| Degradation honesty | 0 bare 500s on upstream failure; all return typed unavailable contracts | `intelligence-premium-routes.integration.test.ts` |
| WhatsApp reuse fidelity | Executive Briefing WhatsApp message and `GET /briefing` response share the identical underlying contract (no drift) | Unit test comparing both call sites |

### Acceptance Criteria

- [x] All 6 endpoints implemented, auth-scoped to the requesting user, unit + integration tested
- [x] Executive Daily Briefing computes energy forecast, top risk/opportunity, accountability, workout readiness, recovery outlook, goal drift, prediction reliability, and recommended actions
- [x] Nullable briefing fields (`topRisk`, `topOpportunity`, `accountability`, `goalDrift`) genuinely null when unsupported by real data, never fabricated
- [x] Executive Briefing reused verbatim for the proactive WhatsApp daily-briefing surface (single contract, two channels)
- [x] Life Operating Map surfaces LCM nodes, current signals, strongest relationships, and leverage points
- [x] Root Cause Explorer walks LCM graph paths for per-domain upstream causes + downstream ripple forecast
- [x] Ripple Simulator accepts a `delta` query parameter and returns ranked, projected downstream effects
- [x] Future Self Timeline projects 7/30/90/365-day horizons per tracked metric
- [x] Memory Explorer exposes memories/profile facts/report intelligence with per-item confidence + provenance, and marked editable
- [x] All 6 services separate pure `build*()` logic from IO `get*()` wrappers for testability
- [x] Reviewed by 3 parallel reviewers; "confidence/predictive/life-correlation orphan" decorative-logic suspicion explicitly refuted — all 9 underlying services confirmed wired (2 transitively via root-cause)
- [x] Degradation tested: upstream report/profile/LCM/memory failures return typed unavailable contracts, not 500s

### Error Handling Scenarios

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| **No daily-analysis report exists for `topRisk`** | `report === null` in `topRisk()` builder | Field returns `null`, omitted from rendered briefing | Briefing simply doesn't show a "top risk" card |
| **User has no accountability contracts due** | `profile.currentState` has no due contract | `accountability` field returns `null` | No accountability card rendered |
| **Recovery/training data entirely missing** | `recovery == null` in `workoutReadiness()`/`recoveryOutlook()` | `severity: 'neutral'`, `confidence: 'low'`, explicit "data missing" detail text | "Workout readiness is limited because recovery/training data is missing." |
| **Upstream LCM/memory service throws** | Service-level exception during `get*()` | Caught, typed unavailable contract returned | "This section is temporarily unavailable" rather than a raw error or fabricated data |
| **Ripple Simulator called with an invalid domain** | Domain not in the known LCM node set | 400-class validation error, not a silent empty result | Explicit "unknown domain" error message |
| **`totalScore === 0` treated as a real zero rather than no-signal** | Tracked follow-up `B-m1` | Not yet fixed — flagged for honest-null polish | Currently may render as "score: 0" instead of "no data" (tracked gap) |

### Executive Daily Briefing Assembly Process (High-Level)

```
Executive Daily Briefing Build (representative of the API suite pattern):

1. Input Gathering:
   - Latest DailyAnalysisReport (may be null)
   - CoachingProfile currentState (biometrics, contracts, goals — may be partial/null)

2. Per-Section Builders (each independently null-safe):
   energyForecast   = energyDetail(report, profile)          — always returns a value (with confidence banding)
   topRisk          = topRisk(report, profile)                — null if no real finding
   topOpportunity   = topOpportunity(report, profile)          — null if no real finding
   accountability   = accountability(profile)                  — null if no due/overdue contract
   workoutReadiness = workoutReadiness(report, profile)         — neutral/low-confidence if recovery missing
   recoveryOutlook  = recoveryOutlook(report, profile)          — neutral/low-confidence if recovery missing
   goalDrift        = goalDrift(profile)                        — null if no tracked goal drift
   predictionReliability = predictionReliability(report, profile)

3. Recommended Actions:
   - Derived from gaps detected across the above builders (e.g., missing recovery data
     adds a "connect your wearable" action; goal drift adds a "revisit your goal" action)

4. Contract Assembly:
   - Combine all sections into ExecutiveDailyBriefing
   - Never substitute a fabricated value for a null section — omission is the honest default

5. Dual-Channel Delivery:
   - GET /api/v1/intelligence/briefing → client dashboard render
   - Same contract → proactive WhatsApp daily message formatter (single source of truth)
```

### Cross-Pillar Connections

**To LCM (Epic 14):**
- Life Operating Map, Root Cause Explorer, and Ripple Simulator are direct query surfaces over the LCM graph.

**To Predictive Insights (E08 F8.2):**
- Future Self Timeline and `predictionReliability` in the briefing directly surface the prediction engine's output and its own accuracy track record.

**To Turn Intelligence Contract (F11.5):**
- Memory Explorer surfaces the same confidence/provenance fields the contract enforces per-turn, now as a standing, browsable surface.

**To Provenance v2 (F11.2):**
- Every API in this suite follows the same honest-null discipline F11.2 established for the coaching conversation.

### Dependencies
- **LCM / Epic 14:** Life Operating Map, Root Cause Explorer, Ripple Simulator's graph source
- **E08 F8.2 (Predictive Insights):** Future Self Timeline, prediction-reliability data source
- **F11.2 (Provenance v2):** honest-null / labeling discipline this suite follows
- **F11.5 (Turn Intelligence Contract):** shares confidence/provenance data model with Memory Explorer
- **Proactive Messaging (E08 F8.6):** WhatsApp reuse of the Executive Briefing contract

### MVP Status
[X] Implemented, reviewed **LAND-AS-IS** (honest-null / IDOR / degradation all clean; decorative-logic suspicion refuted) — one tracked follow-up (`B-m1`: treat `totalScore === 0` as no-signal in `executive-daily-briefing.service.ts:110`)

---

## F11.8: CLIENT COGNITIVE OS DASHBOARD

### Description
`CognitiveOperatingSystem`, the first-screen client tab that unifies all six Intelligence API Suite (F11.7) endpoints into one console, mounted as the first sub-tab inside the existing Intelligence tab alongside the pre-existing insight/correlation/prediction/report/health-score tabs (which remain intact). Built on `Promise.allSettled` graceful degradation, so a failure in any single endpoint (e.g., the Ripple Simulator timing out) never hides or breaks the rest of the console.

### User Story
As a **Holistic Health Seeker**, I want one screen where I can see my executive briefing, my life operating map, root causes, ripple simulations, my future-self trajectory, and what SIA remembers about me — all at once, with each section resilient to the others failing — so that the platform's deepest reasoning is something I actually experience, not something buried behind the right chat prompt.

### Flexibility Modes

| Mode | Experience |
|------|------------|
| **Light** | Executive briefing and top recommended actions surface prominently at the top of the tab; deeper sections (Root Cause Explorer, Ripple Simulator) are collapsed/secondary until explicitly opened. |
| **Deep** | Full console: life operating map with leverage points, per-domain root-cause drill-down, interactive ripple "what-if" simulation, 7/30/90/365-day future-self timeline, and the memory explorer review queue — all live on one screen. |

### Technical Foundation

**Client contract** (`client/src/shared/services/intelligence.service.ts`, types in `client/shared/types/domain/intelligence.ts`):
```
getExecutiveBriefing()               -> /v1/intelligence/briefing
getLifeOperatingMap()                -> /v1/intelligence/life-map
getFutureSelfTimeline()              -> /v1/intelligence/future-self
getMemoryExplorer()                  -> /v1/intelligence/memory-explorer
getRootCauseExplorer(domain)         -> /v1/intelligence/root-cause/:domain
getRippleSimulation(domain, delta)   -> /v1/intelligence/ripple/:domain?delta=...
```
Shared domain types live in one file (`client/shared/types/domain/intelligence.ts`) specifically so future client surfaces reuse one contract instead of each screen inventing its own local payload shape.

**Component:** `client/app/(pages)/dashboard/components/tabs/intelligence/CognitiveOperatingSystem.tsx`, mounted from `IntelligenceTab.tsx` as the first sub-tab. Each of the six endpoints is fetched **independently** via `Promise.allSettled` — not a single combined request — so one failed call surfaces a per-section error state without hiding successfully-loaded sections.

**Review-driven fixes applied before landing:**
- Surfaced 4 briefing items that were initially dropped from the render (C1)
- Split the initial single combined fetch into independent per-endpoint fetches (I1)
- Added per-section error states instead of one tab-wide failure state (I2)
- Added a `NaN` guard on numeric rendering paths

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Graceful degradation | 1 failed endpoint out of 6 never hides the other 5 sections | `CognitiveOperatingSystem.test.tsx` degraded-state coverage |
| Render coverage | All 6 briefing sub-items + map + explorer + simulator + timeline + memory render correctly with real API shapes | `CognitiveOperatingSystem.test.tsx` render coverage |
| Load resilience | Independent per-section loading states (not one blocking spinner for all 6) | Component test on `Promise.allSettled` fan-out |
| Numeric safety | 0 `NaN` renders across all numeric displays (scores, deltas, percentages) | Regression test added post-review |

### Acceptance Criteria

- [x] `CognitiveOperatingSystem` mounted as the first sub-tab inside `IntelligenceTab.tsx`
- [x] Existing insight/correlation/prediction/report/health-score tabs remain fully intact and unaffected
- [x] All 6 intelligence endpoints fetched independently via `Promise.allSettled`
- [x] Executive briefing renders energy forecast + all recommended actions (previously-dropped 4 items now surfaced)
- [x] Per-section error state on individual endpoint failure (not one tab-wide error)
- [x] Life operating map renders nodes, signals, relationships, and leverage points
- [x] Root Cause Explorer and Ripple Simulator support per-domain interaction
- [x] Future Self Timeline renders all 4 horizons (7/30/90/365 days)
- [x] Memory Explorer renders the review queue with confidence + provenance per item
- [x] Shared domain types used (no locally-invented payload shapes)
- [x] `NaN` guard applied to all numeric render paths
- [x] Client Jest, lint, typecheck, and production build all green post-landing

### Error Handling Scenarios

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| **One endpoint (e.g., Ripple Simulator) times out or errors** | `Promise.allSettled` result has `status: 'rejected'` for that call | That section shows its own error state; other 5 sections render normally | "Ripple simulation unavailable right now" scoped to just that card |
| **All 6 endpoints fail (e.g., auth session expired)** | All settled promises rejected | Full-tab error/empty state, not 6 duplicate error cards | Single consolidated "reconnect" prompt |
| **Numeric field is `NaN` or `undefined`** | Render-time guard | Falls back to a dash/placeholder, never renders literal "NaN" | "—" instead of "NaN%" |
| **Memory Explorer item has no provenance data** | Missing `source`/`confidence` field | Item still renders with an explicit "provenance unavailable" tag | User can still see the memory, honestly labeled as unlabeled |

### Client Fan-Out Fetch Process (High-Level)

```
CognitiveOperatingSystem Mount:

1. Parallel Fetch (Promise.allSettled, NOT Promise.all):
   [briefing, lifeMap, futureSelf, memoryExplorer] = independent calls
   (rootCause/ripple fetched on-demand per user-selected domain, not on initial mount)

2. Per-Section Resolution:
   FOR each settled promise:
     IF status === 'fulfilled': render section with data
     IF status === 'rejected': render section-scoped error state, log for observability
   → no single failure blocks or hides any other section

3. Interactive Sub-Fetches (on user action):
   - Selecting a domain in Root Cause Explorer → getRootCauseExplorer(domain)
   - Adjusting delta in Ripple Simulator → getRippleSimulation(domain, delta)
   - Both independently loading/erroring within their own card

4. Render Safety:
   - NaN guard on every numeric display
   - Shared domain types ensure the renderer never receives an unexpected shape silently

5. Degradation Signal:
   - Section-level errors surfaced to observability (not just swallowed client-side)
   - Full-tab fallback only when ALL sections fail (auth/network-level issue, not a single API bug)
```

### Cross-Pillar Connections

**To Intelligence API Suite (F11.7):**
- Pure consumer — every section maps 1:1 to one of F11.7's six endpoints.

**To existing Analytics/Intelligence tabs:**
- Coexists with, and does not replace, the pre-existing insight/correlation/prediction/report/health-score tabs from Epic 08/10.

**To E10 (Analytics & Insights Dashboard):**
- This is the natural "next screen" extension of E10's existing dashboard shell, adding the Cognitive OS layer on top.

### Dependencies
- **F11.7 (Intelligence API Suite):** all 6 data sources
- **E10 (Analytics & Insights Dashboard):** existing dashboard shell/tab infrastructure this mounts into
- **E4 (Mobile App):** responsive rendering across the app's supported breakpoints

### MVP Status
[X] Built, reviewed **FIX-THEN-LAND → landed** (4 fixes applied: dropped-items surfacing, split fetch, per-section error, NaN guard); full client Jest (76 suites / 853 tests), lint, typecheck, and production build all green

---

## EPIC SUCCESS CRITERIA

### Launch Readiness (All Features)

- [x] Whole-life scope broadening and Cia → SIA rebrand complete across server + client, with a safe, idempotent backfill migration
- [x] Provenance v2 honesty layer live: Daily Health Score labeled app-computed, RiskFlags source-tagged, wearable-greeting language neutralized without a fresh reading, cross-domain claims framed as hypotheses
- [x] Cross-system axis unification (Wave 0) live as a single source of truth for both the confidence engine and the answerability gate
- [ ] Answerability gate actually blocking live answers on cross-system evidence gaps (behind `ENABLE_GATE_CROSS_SYSTEM`, default OFF — not yet enabled in production)
- [x] Context Assembler Slices 1+2 live: disengagement-risk tier, contradictions, and personal 30-day baselines reach the live system prompt
- [x] Turn Intelligence Contract wired into both LangGraph chat/stream paths, with runtime-policy disabled-stage handling, metadata persistence, and rollout preflight tooling
- [ ] Turn Intelligence Contract fully operational in target deployment env: live verifier run with a real JWT, alert endpoint wired to production on-call (tracked, not yet executed)
- [x] All 8 intelligence prompt controllers implemented, reviewed APPROVE, and re-verified byte-identical when flags off
- [ ] Confidence + Transparency controllers shipped behind a feature flag (currently unflagged — tracked rollout-safety gap)
- [ ] `ENABLE_LCM_ROOT_CAUSE` default changed to OFF per reviewer recommendation (currently defaults ON — tracked rollout-safety gap)
- [x] All 6 Intelligence APIs implemented, IDOR-safe, honest-null, and degradation-tested
- [x] Client Cognitive OS Dashboard live with graceful `Promise.allSettled` degradation across all 6 sections

### Quality Gates

| Gate | Criteria | Measurement |
|------|----------|-------------|
| **Server test suite** | 484 suites / 6761 tests passed, 3 skipped, 0 failed | Full server unit run (2026-06-25 broad-verification snapshot) |
| **Client test suite** | 76 suites / 853 tests passed | Full client Jest run, `--maxWorkers=50% --silent` |
| **Static analysis** | Server + client lint 0 warnings, typecheck 0 errors | CI gate |
| **Build** | Server + client production build green | CI gate |
| **No decorative logic** | 3-parallel-reviewer pass explicitly refuted the "confidence/predictive/life-correlation orphan" suspicion — all 9 underlying services confirmed wired | Wave 2 controllers review (`2026-06-25-wave2-controllers-review.md`) |
| **Flags-off safety** | Byte-identical behavior with all new controller flags OFF vs. pre-Wave-2 baseline | Independent Opus re-review, CONFIRMED-SAFE-TO-LAND |

### User Experience Validation

| Persona | Key Experience | Success Indicator |
|---------|---------------|-------------------|
| **Whole-Life Optimizer** | Coach reasons across finance/career/relationships, not just health, under one consistent SIA identity | Non-health domain references appear naturally without being prompted |
| **Health-Conscious Skeptic** | Never told an estimate is a measurement; risk tone matches real evidentiary strength | 0 measured-vs-derived mislabels in prompt audits |
| **Optimization Enthusiast** | Can directly query root causes, ripple effects, future trajectory, and memory as first-class screens | Cognitive OS dashboard used, not just chat |

---

## CROSS-EPIC DEPENDENCIES

### E02: Voice Coaching
- SIA persona name/greeting surfaces through the voice channel
- Provenance-honest greeting logic (F11.2) applies identically to voice session openings

### E08: Cross-Domain Intelligence
- This epic is E08's direct extension: E08 builds the correlation, prediction, health-score, and intervention engines; this epic is the wiring, honesty layer, and structural guarantee that gets those engines into the live conversation instead of leaving them buried
- F11.3's cross-system axes are computed from E08 F8.1 (Pattern Correlation) and F8.2 (Predictive Insights) signals
- F11.7's Executive Briefing and Future Self Timeline are first-class API surfaces over E08's existing engines

### E09: Data Integrations
- Wearable connection/freshness state gates measured-vs-derived framing throughout Provenance v2 and the Context Assembler's personal baselines

### E10: Analytics & Insights Dashboard
- Client Cognitive OS Dashboard (F11.8) mounts into E10's existing dashboard shell/tab infrastructure

### LCM / Epic 14: Life Correlation Matrix
- Direct graph source for the Life Operating Map, Root Cause Explorer, and Ripple Simulator APIs (F11.7)
- Direct signal source for the Life Correlation Controller and Root-Cause Prompt Controller (F11.6)
- Direct signal source for `multiSystemAgreement`/`historicalPattern` axes (F11.3)

### Commitment Contract System
- Direct source of the disengagement-risk tier and due/overdue contracts surfaced by the Context Assembler (F11.4) and Accountability Prompt Controller (F11.6)

---

## TECHNICAL CONSIDERATIONS

### API Endpoints (Intelligence Suite)

```
# Executive Briefing
GET    /api/v1/intelligence/briefing                  - Cross-pillar daily report

# Life Operating Map
GET    /api/v1/intelligence/life-map                  - LCM nodes, signals, relationships, leverage points

# Root Cause Explorer
GET    /api/v1/intelligence/root-cause/:domain         - Upstream causes + downstream ripple forecast

# Ripple Simulator
GET    /api/v1/intelligence/ripple/:domain?delta=      - What-if downstream effect projection

# Future Self Timeline
GET    /api/v1/intelligence/future-self                - 7/30/90/365-day trajectory projections

# Memory Explorer
GET    /api/v1/intelligence/memory-explorer            - Inspectable/editable memory + profile + report intelligence

# Operational Health (Turn Intelligence Contract)
GET    /api/health/premium-intelligence                - Aggregate stage/status/action health (PII-free)
GET    /api/health/premium-intelligence/alerts         - Compact alert contract, 503 for paging states
```

### Feature Flags (as-shipped)

| Flag | Default | Governs | Status |
|------|---------|---------|--------|
| `ENABLE_GATE_CROSS_SYSTEM` | **OFF** | Cross-system axes feeding the pre-response answerability gate's blocking decision (axis computation itself always runs) | Dormant by design — needs live-PG E2E (T9) before enable |
| `ENABLE_LCM_ROOT_CAUSE` | **ON** | Root-Cause Prompt Controller (composes Life Correlation + Predictive Response controllers) | **Rollout-safety gap** — reviewer recommended default-OFF for a dark first deploy |
| `ENABLE_ACCOUNTABILITY_CONTROLLER` | OFF | Accountability Prompt Controller | Standard flag-gated rollout |
| `ENABLE_CONFIDENCE_CONTROLLER` | *(no flag)* | Confidence Controller | **Rollout-safety gap** — always on, no runtime kill-switch |
| `ENABLE_TRANSPARENCY_CONTROLLER` | *(no flag)* | Transparency Prompt Controller | **Rollout-safety gap** — always on, no runtime kill-switch |
| `ENABLE_SEMANTIC_MEMORY` | OFF | Semantic memory write/retrieval/backfill (built + working, dormant) | Enablement is an ops task (flip flag → backfill → verify pgvector → E2E), not further code |

### Operational Tooling

```
npm run intelligence:preflight              - Checks flags, controller rollout state, semantic-memory
                                                readiness, DB schema prerequisites, recent turn-contract
                                                metadata evidence before any flag flip

npm run intelligence:verify-turn-contract    - Token-required authenticated live verifier: sends one
                                                real RAG chat turn, polls rag_messages for resulting
                                                turnIntelligenceContract metadata
```

### Data Model (Turn Intelligence Contract Metadata)

```json
{
  "turnIntelligenceContract": {
    "status": "ready",
    "premiumReadinessScore": 0.85,
    "stages": {
      "lifeCorrelationAnalysis": {
        "status": "ran",
        "roles": ["controller", "prompt_evidence", "provenance"],
        "requiredRoles": ["controller", "prompt_evidence", "provenance"],
        "missingRoles": [],
        "participatesInReasoning": true,
        "participationWaived": false
      },
      "confidenceAnalysis": {
        "status": "ran",
        "roles": ["controller", "provenance"],
        "requiredRoles": ["controller", "provenance"],
        "missingRoles": [],
        "participatesInReasoning": true
      }
    },
    "blockingStages": [],
    "discardedSignals": [],
    "degradedStages": [],
    "disabledStages": ["lifeCorrelationAnalysis"]
  }
}
```

### Performance Requirements

| Operation | Target Latency | Rationale |
|-----------|---------------|-----------|
| Cross-system axis computation | <5ms (pure, no I/O) | Runs on every turn inline with prompt construction |
| Root-cause controller composition | ≤700ms fail-open | Must never meaningfully delay the LLM call |
| Context Assembler parallel batch | No added round-trip vs. pre-Wave-1 baseline | Single `Promise.all`, not sequential per-field fetches |
| Turn contract metadata persistence | Non-blocking, best-effort | Never delays the user-facing response |
| Intelligence API endpoints (all 6) | Responsive dashboard load (existing E10 latency budget) | User-initiated query, not hot-path chat |

---

## KNOWN GAPS & ROLLOUT SAFETY (as-shipped)

This epic is documented honestly, including what shipped incomplete. These are tracked, not hidden:

1. **Confidence Controller and Transparency Prompt Controller ship without a feature flag.** Both are always-on with no runtime kill-switch — a regression in either requires a code deploy to roll back, not a flag flip. Tracked in `balencia_doc/Missing-Features.md` under "SIA Wave-2 Rollout Safety Gap."
2. **`ENABLE_LCM_ROOT_CAUSE` defaults ON, against the reviewer's explicit recommendation of default-OFF for a dark first deploy.** The Root-Cause Prompt Controller (and, transitively, the Life Correlation and Predictive Response controllers it composes) are therefore live in production today rather than behind an opt-in flag.
3. **`ENABLE_GATE_CROSS_SYSTEM` defaults OFF.** The cross-system axis unification (F11.3) is computed on every turn and consumed identically by both the confidence engine and the answerability gate, but the gate does not yet use it to actually block or hedge live answers in production — that live-PG E2E validation (T9 in the SIA vNext tracker) is still outstanding.
4. **Turn Intelligence Contract is code-complete but not fully operational.** The live verifier (`npm run intelligence:verify-turn-contract`) has not yet been run with a real JWT in the target deployment environment, and the alert endpoint (`/api/health/premium-intelligence/alerts`) is not yet wired into production monitoring/on-call routing.
5. **`totalScore === 0` in the Executive Daily Briefing is not yet distinguished from "no signal."** Tracked as follow-up `B-m1` against `executive-daily-briefing.service.ts:110`.
6. **Deeper Phase 8 (self-evolving memory) work remains.** Semantic memory itself is built, working, and correctly dormant behind `ENABLE_SEMANTIC_MEMORY` (an audit found the earlier "embeddings unwritten" diagnosis was wrong) — enabling it is an operational task (flip flag → backfill → verify pgvector → E2E), not further code. Unifying baselines across workout/nutrition/spend/prayer/communication domains and feeding learned baselines/correlations back into prediction updates remains open.
7. **Wave 1 tier classifier (fast/standard/deep per-turn intelligence depth) is blocked**, not shipped — it would collide with the Wave 2 LangGraph wiring if built unwired, which would itself be decorative (forbidden by this epic's own philosophy).

---

## RISKS & MITIGATIONS

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| **Unflagged Confidence/Transparency controller regression reaches production** | High | Low-Medium | No runtime kill-switch exists today; mitigation is fast-deploy rollback capability + close post-launch monitoring via the Turn Intelligence Contract's `discardedSignals`/`failed_contract` telemetry |
| **`ENABLE_LCM_ROOT_CAUSE` default-ON causes unexpected root-cause claims in production before full confidence** | Medium | Low | 700ms fail-open bound limits blast radius; reviewer recommendation to flip default is tracked and actionable in a single env-var change |
| **Turn Intelligence Contract silently degrades (metadata write failures) without anyone noticing** | Medium | Medium | Aggregate observability endpoint exists but alert routing to production on-call is not yet wired — tracked as the top operational follow-up |
| **Cross-system axis unification (Wave 0) diverges again in the future if a third consumer reimplements the logic inline** | Medium | Low | Single exported pure function (`cross-system-axes.util.ts`) with no I/O makes reimplementation unnecessary and easy to grep-detect in review |
| **Semantic memory enablement surfaces stale/incorrect embeddings if backfill isn't run correctly** | Medium | Low | Preflight tooling (`npm run intelligence:preflight`) explicitly checks semantic-memory readiness before any flag flip |
| **Whole-life scope broadening surfaces career/finance/relationship claims with the same confidence as well-established fitness/nutrition signals, despite thinner data history in newer domains** | Medium | Medium | Provenance v2's honesty discipline and F11.3's evidence thresholds apply uniformly across all domains, not just the original three pillars |

---

## ROADMAP & FUTURE ENHANCEMENTS

### Shipped (M-016, this epic)
Waves 0-2 as documented above: F11.1-F11.8

### Immediate Next (tracked in `SIA-VNEXT-MASTER-TRACKER.md`)
- **T9:** Live-PG E2E latency/mode validation, then flip `ENABLE_GATE_CROSS_SYSTEM` where appropriate
- Flag Confidence + Transparency controllers; reconsider `ENABLE_LCM_ROOT_CAUSE` default
- Execute the Turn Intelligence Contract live verifier with a real JWT in target env; wire alerts to production on-call
- **T3:** Wave 1 tier classifier (fast/standard/deep), now unblocked post-Wave-2 landing
- **T4 (deeper):** unify baselines across workout/nutrition/spend/prayer/communication; feed learned baselines/correlations into prediction updates
- **T8:** broader tool-call coverage (~110 tools, <10% today), LCM-rule coverage, live-PG RAG/LLM path E2E

### Post-MVP v1.1
- Multi-turn "what-if" chaining in the Ripple Simulator (compound hypothetical scenarios across domains)
- Voice-driven Cognitive OS queries: "Walk me through my root causes" as a spoken conversation, not just a dashboard read
- Memory Explorer inline editing surfaced directly in chat ("that's not quite right, here's the correction")

### Post-MVP v1.2
- Turn Intelligence Contract data feeding a public-facing (user-visible, simplified) "how confident am I in this answer" indicator per response
- Cross-user (fully anonymized) benchmark framing for Future Self Timeline projections

---

## DOCUMENT GOVERNANCE

**Review Schedule:** After `ENABLE_GATE_CROSS_SYSTEM` and `ENABLE_LCM_ROOT_CAUSE` flag decisions are finalized, and after the Turn Intelligence Contract's operational follow-ups (live verifier, alert routing) are executed
**Update Triggers:** Flag default changes, live-PG E2E completion, Confidence/Transparency controller flag-gating, semantic memory enablement, tier classifier (T3) landing
**Version Control:** All feature changes require version increment with rationale
**Ownership:** Product Team + AI/ML Team; rollout-safety gaps (Section "Known Gaps & Rollout Safety") owned jointly by Engineering + Product until resolved

---

*Balencia Platform - E11: SIA Cognitive OS & Provenance Overhaul PRD v1.0*
*Retroactive documentation of Milestone M-016 (completed 2026-07-03) — Waves 0-2*
*THE STRUCTURAL FIX FOR "COMPUTE-BUT-DISCARD" — Making Every Computed Signal Provably Earn Its Place in the Conversation*

---

*Document Classification: INTERNAL USE - Product Foundation*
*Created: 2026-07-08 | Retroactive Epic Specification, source: `SIA-VNEXT-MASTER-TRACKER.md`, `AUDIT-FINDINGS-AND-GAPS.md §10`, `M-016-sia-vnext-cognitive-os.md`, and shipped source (server/client)*
*Total Features: 8 | All MVP Core | 3 Tracked Rollout-Safety Gaps (see Known Gaps & Rollout Safety)*
