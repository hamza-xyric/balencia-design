---
type: story
id: S13.6.2
title: Embedding Matching & Weight Tuning
epic: E13
epic_name: Social Growth OS
feature: F13.6
feature_name: Matching & Anti-Cheat
product: yhealth-platform
priority: P1
status: Done
created: 2026-07-08
---

# S13.6.2: Embedding Matching & Weight Tuning

## User Story

**As a** Busy Professional using buddy matching at scale,
**I want** candidate quality to widen via semantic retrieval and matching weights to self-tune from real acceptance outcomes,
**So that** suggestions stay relevant as the user base grows, without ever compromising the underlying consent/trust guarantees.

---

## Story Type

- [x] Feature
- [ ] Enhancement
- [x] Technical
- [ ] Integration

## Priority

- [ ] Must Have (P0)
- [x] Should Have (P1)

---

## Scope Description

Both layers are shipped and tested, **flag-gated off by default** — they upgrade candidate quality and matching-weight accuracy without changing the safety guarantees from S13.6.1.

**Embedding retrieve-then-rank matching** (flag `ENABLE_EMBEDDING_MATCHING`, default off) — `match-embedding.service.ts`:
```sql
user_match_embeddings (user_id PK, embedding vector(768), profile_text)
```
`retrieveSimilarUserIds()` does cosine-KNN (`ORDER BY embedding <=> ... LIMIT 60`) to shortlist candidates before the existing deterministic scorer ranks them. Falls back automatically and silently to the default `LIMIT`-based pool if pgvector is unavailable, embeddings are missing, or fewer than 10 neighbors are returned (`useKnn = knnIds.length >= 10`). Consent and trust filters apply identically to both paths.

**Matching-weight learning loop** (flag `ENABLE_MATCH_WEIGHT_TUNING`, default off): `matching-weights.service.ts` stores live weights (`DEFAULT_WEIGHTS = { goal:0.4, activity:0.25, streak:0.15, freshness:0.1, matrix:0.15 }`) in a singleton DB row (`matching_weights`) plus an audit trail (`matching_weight_history`, source `tuner|admin|reset`). `matching-weight-tuner.service.ts:tuneWeights()` computes `lift(feature) = mean(strength | accepted) − mean(strength | not accepted)` from `buddy_suggestions_cache`, nudges each weight by `STEP·tanh(lift/SCALE)` clamped to `[0.02, 0.6]`, and **refuses to act** below guardrail thresholds (`MIN_SHOWN=50`, `MIN_ACCEPTED=5`). Runs daily via `matching-weight-tuner.job.ts`, gated on `ENABLE_MATCH_WEIGHT_TUNING`, measured via a sticky A/B experiment (`matcher_tuned_weights`).

**Matching candidate generation process (high-level):**
```
1. Consent & Trust Filter (always applied, both retrieval paths):
   WHERE buddy_discovery_consent.allow_suggestions = true
     AND user_trust_signals.status != 'blocked'

2. Candidate Retrieval:
   IF ENABLE_EMBEDDING_MATCHING AND pgvector available:
     knnIds = cosine_KNN(user_embedding, limit=60)
     IF knnIds.length >= 10: candidatePool = knnIds
     ELSE: candidatePool = default_pool (fallback)
   ELSE:
     candidatePool = default LIMIT-based scan

3. Deterministic Scoring (applies to either pool):
   score = goal*W.goal + activity*W.activity + streak*W.streak
         + freshness*W.freshness + matrix*W.matrix

4. A/B Assignment (if ENABLE_MATCH_WEIGHT_TUNING):
   variant = experimentService.getVariant(userId, 'matcher_tuned_weights')
   control -> pin DEFAULT_WEIGHTS; treatment -> use live tuned weights

5. Rank & Return top-N shortlist

6. Nightly (if ENABLE_MATCH_WEIGHT_TUNING):
   FOR EACH feature:
     lift = mean(strength | accepted) - mean(strength | not accepted)
     newWeight = clamp(oldWeight + 0.03*tanh(lift/0.15), 0.02, 0.6)
   IF shown >= 50 AND accepted >= 5:
     UPDATE matching_weights; INSERT matching_weight_history(source='tuner')
   ELSE:
     no-op, log 'insufficient_data'
```

---

## Acceptance Criteria

```gherkin
Scenario: Embedding retrieval degrades gracefully when pgvector unavailable
  Given ENABLE_EMBEDDING_MATCHING is true and pgvector extension is not installed
  When candidate retrieval runs
  Then it falls back to the default LIMIT-based candidate pool
  And no error is surfaced to the user

Scenario: Embedding retrieval degrades gracefully on thin neighbor results
  Given ENABLE_EMBEDDING_MATCHING is true and cosine-KNN returns fewer than 10 neighbors
  When candidate retrieval runs
  Then useKnn is false and the default candidate pool is used instead

Scenario: Consent and trust filters apply identically to both retrieval paths
  Given a user has not opted in to buddy discovery
  Then they are excluded from candidate pools regardless of ENABLE_EMBEDDING_MATCHING state

Scenario: Weight tuner respects data-sufficiency guardrails
  Given fewer than 50 suggestions shown or fewer than 5 accepted in the tuning window
  When tuneWeights() runs
  Then it returns {changed:false, reason:'insufficient_data'} and makes no write

Scenario: Weight changes are audited
  Given the tuner successfully adjusts a weight
  Then matching_weight_history records the change with source='tuner'
  And each weight remains clamped to [0.02, 0.6]

Scenario: A/B assignment is sticky
  Given a user is assigned to the 'treatment' variant of matcher_tuned_weights
  When they are re-evaluated on a subsequent matching request within the experiment window
  Then they remain assigned to 'treatment' (sticky per user)

Scenario: Both flags off (default)
  Given ENABLE_EMBEDDING_MATCHING and ENABLE_MATCH_WEIGHT_TUNING are both false
  Then matching behaves identically to S13.6.1's baseline deterministic scoring
```

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Buddy-suggestion accept rate lift (once `ENABLE_MATCH_WEIGHT_TUNING` on) | +10% relative to baseline within 60 days | A/B experiment `matcher_tuned_weights` |
| Embedding-matching candidate quality (once `ENABLE_EMBEDDING_MATCHING` on) | Accept rate ≥ baseline pool (no regression) | A/B comparison |
| Embedding KNN retrieval latency | <200ms per query | pgvector cosine index instrumentation |

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Embedding KNN retrieval <200ms per query | Weight tuner never bypasses S13.6.1's consent/trust filters | Embeddings derive only from the user's own profile data | N/A (backend/matching layer) | Requires pgvector extension for embedding path; graceful fallback if absent |
| Weight tuner guardrails: `MIN_SHOWN=50`, `MIN_ACCEPTED=5` | Weight changes logged with source attribution (tuner/admin/reset) | | | |

---

## Dependencies

- **Prerequisite Stories:** S13.6.1 (consent gate + base deterministic scorer this layers on top of)
- **Related Stories:** S13.1.1 (consumer of the widened candidate pool)
- **External Dependencies:** pgvector PostgreSQL extension, platform vector-embedding service, `buddy_suggestions_cache`

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|--------------------|---------------------|
| pgvector extension unavailable | `CREATE EXTENSION IF NOT EXISTS vector` fails or embedding table absent | Silent fallback to default `LIMIT`-based candidate pool | No user-facing difference |
| Weight tuner has insufficient data | `shown < 50 OR accepted < 5` | `tuneWeights()` returns `{changed:false, reason:'insufficient_data'}`, no write | Silent — weights simply don't change that cycle |
| Embeddings missing for a specific user | KNN query returns no row for that user | Falls back to default candidate pool for that user only | No user-facing difference |
| Experiment service unavailable when `ENABLE_MATCH_WEIGHT_TUNING` is on | `getVariant()` throws/times out | Default to control (DEFAULT_WEIGHTS), never silently apply untested tuned weights | No user-facing difference |

---

## Open Questions

- **Rollout Status:** `ENABLE_EMBEDDING_MATCHING` and `ENABLE_MATCH_WEIGHT_TUNING` both default `false`. Per the PRD's recommended sequencing: `ENABLE_EMBEDDING_MATCHING` flips after `ENABLE_FEED_CACHE` validates; `ENABLE_MATCH_WEIGHT_TUNING` flips alongside starting the `matcher_tuned_weights` A/B experiment. Both are pending real acceptance-rate data before full rollout — this is an operational sequencing decision, not a build gap.
- No open build questions — code for both flag states is complete and tested.

---

## Definition of Done

- [x] Acceptance criteria met
- [x] pgvector-unavailable and thin-neighbor-result fallbacks tested
- [x] Consent/trust filter parity verified across both retrieval paths
- [x] Weight tuner guardrail thresholds (`MIN_SHOWN`, `MIN_ACCEPTED`) tested
- [x] Weight history audit trail (source attribution) verified
- [x] A/B experiment stickiness tested
- [x] Unit + integration tests green (server suite)
- [ ] Flags flipped in production (pending staged rollout — operational, not a build task)

---

*Story S13.6.2 | Epic E13 | Product: Balencia Platform*
