---
type: story
id: S15.7.1
title: Virtual Try-On Photo Upload & Generation
epic: E15
epic_name: Document Intelligence, Reflection System & Virtual Try-On
feature: F15.7
feature_name: Virtual Try-On / AI Fashion Studio
product: yhealth-platform
priority: P1
status: Done
created: 2026-07-08
---

# S15.7.1: Virtual Try-On Photo Upload & Generation

## User Story

**As a** Balencia user exploring the AI Fashion Studio,
**I want to** upload a photo of myself and a photo of a garment and see an AI-composited "wearing it" image,
**So that** I can preview how an outfit would actually look on me before buying or wearing it.

*(Note: this feature does not map cleanly onto the platform's existing P1/P2/P3 persona set from Epic 01 — it is a distinct fashion/style use case, flagged rather than force-fit to an existing persona.)*

---

## Story Type

- [x] Feature
- [ ] Enhancement
- [ ] Technical
- [ ] Integration

## Priority

- [ ] Must Have (P0)
- [x] Should Have (P1)
- [ ] Could Have (P2)
- [ ] Won't Have (P3)

---

## Scope Description

**Flexibility Modes:**

| Mode | Experience |
|------|------------|
| Light | Upload person photo + garment photo → generate → save or discard. No wardrobe browsing. |
| Deep | Before/after comparison slider on generation result; feeds into Style Coach signal (S15.7.3). |

**Technical Foundation:**

- **Feature flag** — `VIRTUAL_TRYON_ENABLED` (`server/src/config/env.config.ts`), default off; companion env vars `VIRTUAL_TRYON_PROVIDER` (default `gemini`) and `VIRTUAL_TRYON_TIMEOUT_MS` (default 45000ms). Route guard in `server/src/routes/virtual-tryon.routes.ts` mirrors the Document Intelligence pattern — a 404 when the flag is off, checked *before* `authenticate`.

**Routes (base `/v1/virtual-tryon`):**

| Method | Path | Notes |
|---|---|---|
| GET | `/config` | client capability/limits config |
| POST | `/upload/person` | person photo upload |
| POST | `/upload/clothing` | garment photo upload |
| POST | `/generate` | **credit-metered**: `requireFeature('ai.tryon.generate')` + `consumeCredits(...)` reserves credits up-front, returns `402 CREDITS_EXHAUSTED` if the wallet is empty, auto-settles on completion of the 202-accepted async job |
| GET | `/sessions` | list (must precede `/sessions/:id` for route-matching correctness) |
| GET | `/sessions/:id` | session detail/status |
| POST | `/sessions/:id/cancel` | |
| DELETE | `/sessions/:id` | |

**Table: `virtual_try_on_assets`:** `id, user_id (FK cascade), type (person_photo | clothing_image | generated_result), storage_key, mime_type, width, height, file_size, garment_category, color_tags (JSONB), is_temporary (default true), expires_at, created_at, deleted_at`.

**Table: `virtual_try_on_sessions`:** `id, user_id (FK cascade), status (state machine: CREATED → VALIDATING → PREPROCESSING → GENERATING → POST_PROCESSING → READY → SAVED | FAILED | CANCELLED | EXPIRED), progress_stage, mode, person_asset_id, clothing_asset_id, generated_asset_id (FK → assets), idempotency_key, failure_category, error_message, model_version, prompt_version, pipeline_version, generation_version, retry_count, provider_latency_ms, duration_ms, provider, created_at, updated_at, completed_at, saved_at, expires_at, deleted_at`. A **partial unique index** enforces idempotency only among live sessions: `UNIQUE (user_id, idempotency_key) WHERE deleted_at IS NULL AND status NOT IN ('FAILED','CANCELLED','EXPIRED')` — a failed/cancelled/expired session doesn't block a legitimate retry with the same idempotency key.

**Table: `try_on_consent_logs`:** per-generation consent record (`consent_text`, `consented_at`) — try-on generation requires an explicit, logged consent, similar in spirit to the medical-document consent gate in S15.5.1.

**Provider** — `server/src/services/virtual-tryon/providers/gemini-tryon.provider.ts`, Gemini-based image generation (provider name configurable via `VIRTUAL_TRYON_PROVIDER` for future multi-provider support, though only Gemini ships today).

**Generation Flow (High-Level):**
```
1. POST /upload/person, POST /upload/clothing
     -> virtual_try_on_assets rows (type: person_photo / clothing_image)
     -> garment_category, color_tags extracted at validation time

2. POST /generate { personAssetId, clothingAssetId, idempotencyKey }
     - requireFeature('ai.tryon.generate') -- gate check
     - consumeCredits(...) -- reserve credits up-front
     - Check try_on_consent_logs for this user/session
     - INSERT virtual_try_on_sessions (status: CREATED, idempotency_key)
       -- partial unique index prevents duplicate live sessions --
     - Return 202 Accepted; async pipeline drives status forward:
         CREATED -> VALIDATING -> PREPROCESSING -> GENERATING
         -> POST_PROCESSING -> READY  (or FAILED/CANCELLED/EXPIRED)
     - On terminal failure: settle/refund reserved credits
```

---

## Acceptance Criteria

```gherkin
Scenario: Person and garment photo upload
  Given a user uploads a person photo and a clothing photo
  When each upload completes
  Then a virtual_try_on_assets row is created for each (type: person_photo / clothing_image) with garment_category and color_tags extracted at validation time

Scenario: Credit-metered generation
  Given a user has sufficient credits
  When they POST /generate with personAssetId, clothingAssetId, and idempotencyKey
  Then requireFeature('ai.tryon.generate') passes, consumeCredits reserves credits up-front, a session is created with status CREATED, and 202 Accepted is returned

Scenario: Insufficient credits blocks generation
  Given a user's credit wallet is empty
  When they POST /generate
  Then the request is rejected before any generation work starts, returning 402 CREDITS_EXHAUSTED

Scenario: Consent required before generation
  Given a user has not logged consent for this generation
  When they attempt to POST /generate
  Then generation is blocked until a try_on_consent_logs record exists

Scenario: Idempotent retry on a live session
  Given a session with idempotency_key "abc" is in status GENERATING
  When POST /generate is called again with the same idempotency_key
  Then the existing live session is returned, no duplicate session or charge is created (partial unique index enforcement)

Scenario: Retry after a terminal session with the same key
  Given a session with idempotency_key "abc" has status FAILED
  When POST /generate is called again with the same idempotency_key
  Then a new session is created cleanly (the partial index excludes terminal states)

Scenario: Generation exceeds timeout
  Given a session has been GENERATING for longer than VIRTUAL_TRYON_TIMEOUT_MS (45s default)
  When the timeout is reached
  Then the session transitions to FAILED, failure_category is set, and reserved credits are refunded

Scenario: Flag off, route probed directly
  Given VIRTUAL_TRYON_ENABLED is false
  When any /v1/virtual-tryon route is requested
  Then a 404 is returned before authenticate runs — no feature-existence leakage
```

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Generation success rate | ≥90% of `generate` requests reach `READY` without `FAILED` | Session status distribution |
| Generation latency (p95) | Within `VIRTUAL_TRYON_TIMEOUT_MS` (45s default) | `provider_latency_ms` / `duration_ms` on sessions |
| Idempotent retry safety | 0 duplicate charges for a retried generation with the same idempotency key | Partial unique index integrity + credit-consumption test |

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Hard `VIRTUAL_TRYON_TIMEOUT_MS` (45s default) on generation | Feature-flag 404 guard mirrors the Document Intelligence pattern — checked before `authenticate` | Explicit, logged consent required for every generation (`try_on_consent_logs`) | Generation progress states are announced, not silent spinners only | Reuses existing `requireFeature`/`consumeCredits` middleware — no parallel billing path |
| Async 202-accepted job, not a blocking request | Partial unique index scoped to live sessions only, preventing duplicate charges without blocking legitimate retries | | | Provider is swappable via `VIRTUAL_TRYON_PROVIDER`, though only Gemini ships today |

---

## Dependencies

- **Prerequisite Stories:** None (entry point for Track C)
- **Related Stories:** S15.7.2 (saved looks build on `READY`/`SAVED` sessions), S15.7.3 (Style Coach consumes generation outcomes)
- **External Dependencies:** Existing credit/entitlement middleware (`requireFeature`, `consumeCredits`), `VIRTUAL_TRYON_ENABLED` flag, Gemini image-generation provider

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| Generation exceeds timeout | `VIRTUAL_TRYON_TIMEOUT_MS` (45s) exceeded | Session → `FAILED`, `failure_category` set, credits refunded | "Generation took too long — try again?" |
| Insufficient credits | `consumeCredits` middleware pre-check | Request rejected before any generation work starts | `402 CREDITS_EXHAUSTED` |
| Duplicate generate request (same idempotency key, live session) | Partial unique index violation | Existing live session returned instead of creating a duplicate | No duplicate charge, no duplicate generation |
| Retry after a failed/cancelled/expired session with the same key | Partial index excludes terminal states | New session created cleanly | Retry succeeds as expected |
| Consent not given before generation | `try_on_consent_logs` check | Generation blocked | Consent prompt shown before any upload proceeds |
| Flag off, route probed directly | `flagGuard` middleware | 404 before `authenticate` even runs | Generic "Not found" — no feature-existence leakage |

---

## Open Questions

- No cross-user isolation test suite is independently confirmed complete for Try-On assets/sessions in the source material reviewed — confirm this is verified before `VIRTUAL_TRYON_ENABLED` go-live.

---

## Definition of Done

- [x] Person and garment photo upload, with generated-result compositing via Gemini
- [x] Full session state machine tracked (`CREATED` → ... → `READY`/`SAVED`/`FAILED`/`CANCELLED`/`EXPIRED`)
- [x] Credit-metered generation with up-front reservation and 402 on insufficient credits
- [x] Idempotency key prevents duplicate generation/charge on retry, scoped to non-terminal sessions only
- [x] Explicit, logged consent required for generation (`try_on_consent_logs`)
- [x] Feature-flag 404 guard mirrors the Document Intelligence pattern
- [ ] Cross-user isolation test suite — not independently confirmed complete

---

*Story S15.7.1 | Epic E15 | Product: Balencia Platform*
