# BIOS-003 — Auth Hardening + Multi-Device — Batch Technical Plan

**Authority:** Architecture Authority (software-architect framing) · **Batch:** BIOS-003 · **Status:** in progress
**Active roots:** `yhealth-app/server` (session model, IN SCOPE per standing decision 2 — tested + committed, NO prod deploy) · `yhealth-app/mobile` (Expo SDK 57 / Expo Router / RN 0.86 / React 19 / TanStack Query v5, TS strict)
**Backend:** local Express 5, envelope `{success, message?, timestamp?, data, requestId?}`; errors `{success:false, message, code, errors?, requestId?}`
**Source hierarchy (tie-break):** hifi-screens + canon > server routes/types > web client (backward-compat contract) > yhealth-app-main (historical). Canon §7 honesty invariant is non-negotiable.

This plan **freezes the contract before any GLM code is written** (BIOS-002 lesson: the contract is the lock; workers build in parallel against it; a contract change pauses dependents and returns to the orchestrator). All load-bearing claims below were spot-checked against source this session (`auth-session.controller.ts`, `oauth.service.ts`, `auth.middleware.ts`, `auth-registration.controller.ts`, `02-users.sql`).

---

## 1. Executive summary

BIOS-003 closes **OQ-1** by replacing the single-slot `users.refresh_token` column with a per-device `user_sessions` table (multi-refresh, rotation-on-use, refresh-token **reuse detection**, per-device revocation, session caps) — while staying **100% backward compatible** with the web NextAuth HttpOnly-cookie flow through the same `/auth/refresh` endpoint via a **dual-read + lazy-migration** path. The linkage is a `sid` claim inside the JWT (invisible to clients, transport-agnostic). Legacy pre-upgrade tokens (no `sid`) keep validating against `users.refresh_token` and migrate to a session row on their next refresh; that column becomes read-and-clear-only after upgrade, with column-drop deferred to a future batch (documented, not executed).

The batch also fixes the **critical Apple Sign-In hole** (server trusts client-supplied Apple identity JSON with zero crypto check) by wiring real **JWKS signature + iss + aud + exp** verification via **`jose`** (one justified ESM-native dep), hardens the Google path (require real idToken verification for `X-Client: mobile`, no NextAuth fallback), and delivers the mobile registration / OTP / consent / complete-profile / forgot-reset flows per hi-fi S03/S03b/S03c/S03d/S05/S05b — with **honest adaptations** where the server contract diverges from spec (S05b is OTP-based, not link-token). Social sign-in on mobile uses **`expo-apple-authentication`** (native, works in Expo Go on iOS) and **`expo-auth-session`** Google (system-browser, Expo-Go compatible) with an honest visible-but-gated fallback if the Expo Go OAuth redirect cannot yield a verifiable idToken. A token-security review (SecureStore, transport, logging hygiene, PII, client-side rate-limit handling) runs as the closing slice.

Server access-token semantics **do not change**: 15-min stateless access tokens (no per-request DB session lookup, no JTI denylist), bcrypt passwords, sha256 refresh hashing, response envelope, and the web cookie flow are all preserved. Local email is made exercisable via a **mailpit** docker sink (config-only; register's 503-on-email-failure is NOT weakened).

**Five slices (BATCH cap):** (1) server session model + migrations + tests, (2) mobile per-device refresh alignment, (3) Apple/Google sign-in (client + server verification), (4) registration/OTP/forgot-reset flows, (5) token security review. No widening to non-auth screens.

---

## 2. Verified ground truth (source-checked this session)

| Claim | Evidence | Consequence for design |
|---|---|---|
| Single refresh slot | `02-users.sql:39` `refresh_token TEXT` | New `user_sessions` table; column becomes legacy read-and-clear |
| Refresh rotates + mismatch check | `auth-session.controller.ts:150-165` — compares `hashRefreshToken(presented)` vs stored, only when a token is presented; overwrites on rotate | Dual-read: `sid` present → session row; absent → legacy column |
| JWT payload has no sid | `auth.middleware.ts:298-320` signs `{userId,email,role}`; `IJwtPayload.sessionId?` declared but never populated (`types/index.ts`) | Thread `sessionId` through `generateTokens`; carried in both tokens |
| Refresh middleware sets `req.user=decoded` | `auth.middleware.ts:277-282` | `sid` available to refresh + logout controllers |
| Apple never verified | `auth-registration.controller.ts:337` (`verifySocialToken` only for `google && idToken`); Apple falls through to `data.email/providerId/idToken` at `357-361`; `oauth.service.ts:216-224` only `jwt.decode`s Apple | Wire JWKS verification; Apple 401 on bad token (security fix) |
| Google conditionally verified w/ NextAuth fallback | `auth-registration.controller.ts:337-355`, `oauth.service.ts:110-204` | Keep web fallback (NextAuth did PKCE); require real verify for `X-Client: mobile` |
| Register 503 on email failure; forgot-password does NOT check send | `auth-registration.controller.ts:81-86`; `auth-session.controller.ts:240-253` | Config-only mailpit; do NOT change email behavior |
| forgot-password 404s unknown email (deliberate) | `auth-session.controller.ts:217-222` | Client-side enumeration normalization (see ADR-10) |
| Two migration runners | scope-db-schema §4: `db:setup` (tables/NN-*.sql auto-included) + `db:migrate:auto` (timestamped, `scripts/migrate.ts`) | Ship BOTH a table file and a timestamped migration |
| Web backward-compat contract | scope-web-client §7: 401→reinstall-or-logout, tokens in HttpOnly cookies, `sid` invisible inside JWT | Dual-read must not alter `/refresh` response shape or cookie behavior |

---

## 3. Architecture Decision Records

### ADR-1 — `user_sessions` table: per-device refresh with rotation, reuse detection, revocation, caps

**Decision.** Introduce `user_sessions` (DDL §4). One row per active device session. Stores the **sha256 hash** of the current refresh token (keep the existing `hashRefreshToken` pattern — never store raw). Rotation-on-use updates the hash in place (no history table). **Refresh-token reuse detection**: a presented token that JWT-verifies with a valid `sid` but whose hash does **not** match the row's current hash means the token was already rotated away (replay of a stolen/superseded token) → **revoke the entire session** (`revoked_at = now()`) and 401. Per-user **cap** of 10 active sessions; creating an 11th evicts the least-recently-used (delete the oldest by `last_used_at`). Per-device metadata (`device_id`, `device_name`, `client_type`, `user_agent`, `ip_address`) captured for future session-list UX (not surfaced this batch).

**Why.** This is the boring, proven refresh-token-rotation-with-reuse-detection pattern (OAuth BCP). Hash-only-at-rest matches the current security posture; in-place rotation + full-session-revoke-on-reuse gives replay protection without a token-history table. Caps bound table growth from a compromised/loop client.

**Alternatives rejected.** (a) Token-history/`rotated_from` chain table — heavier, unnecessary for reuse detection when we revoke the whole session. (b) Keeping single-slot + "last N tokens" JSON array on `users` — unindexable, race-prone, still one row to contend on. (c) Redis-backed sessions — adds infra + a shared store the auth path doesn't currently need; Postgres is the source of truth per yhealth-app §5.

### ADR-2 — `sid` claim links JWT ↔ session; access tokens stay stateless

**Decision.** Thread `sessionId` into `generateTokens(payload)` and sign it into **both** access and refresh JWTs. The **refresh** token's `sid` drives the session lookup on `/refresh` and identifies the session on `/logout`. The **access** token's `sid` is informational only — `authenticate` stays **stateless** (no per-request DB session lookup; 15-min natural expiry, no JTI denylist), exactly as BIOS-002 ADR-2 established.

**Why.** `sid` in the JWT is transport-agnostic (works for both mobile body-tokens and web HttpOnly cookies) and invisible to clients — zero web client change. Keeping access-token verification stateless preserves latency and the BIOS-002 contract.

**Alternatives rejected.** (a) Opaque server session id in a separate header — breaks the web cookie flow and needs client changes. (b) Stateful access tokens (DB lookup per request) — perf regression, contradicts BIOS-002.

### ADR-3 — `/refresh` dual-read + lazy migration (backward-compat GATE)

**Decision.** `verifyRefreshToken` JWT-verifies as today and sets `req.user=decoded`. The controller branches:
- **`decoded.sessionId` present (new model):** look up `user_sessions` by `sid`. Not found / revoked / expired → 401 (mobile → `expired`). Found → compare `hashRefreshToken(presented)` to row hash: match → rotate row + issue new `sid` pair; mismatch → **reuse detected**, revoke session, 401.
- **`decoded.sessionId` absent (legacy pre-upgrade token, e.g. an already-issued web cookie):** run the **current** `users.refresh_token` single-slot compare (unchanged logic). On success → **lazily migrate**: create a `user_sessions` row, issue a new `sid` pair, and clear `users.refresh_token` (one-time). The web client stores the new cookie transparently and is on the new model from then on.

All new token issuance (login/register/social, and the migrate step) goes through the session model; the server **stops writing `users.refresh_token`** after upgrade. `/refresh` response shape, cookie behavior, and `getAuthTokenPayload` are **unchanged**.

**Why.** This is the explicit transition the batch requires: existing web sessions keep working with no forced re-login; legacy tokens migrate silently within their 7-day window; the column is safe to drop in a later batch once no legacy tokens remain.

**Alternatives rejected.** (a) Force global re-login on deploy — violates the backward-compat gate. (b) Backfill all users into sessions in the migration — pointless (refresh tokens are per-login, not derivable from a column) and would invent sessions.

### ADR-4 — Logout: this-device by default, all-devices opt-in (add-only)

**Decision.** `POST /auth/logout` accepts an **optional** body `{ allDevices?: boolean }` (default `false`).
- `sid` present + `allDevices:false` → revoke only that session row.
- `allDevices:true` → revoke all the user's sessions **and** null `users.refresh_token` (kills any legacy token too).
- `sid` absent (legacy access token) → null `users.refresh_token` (current behavior).
Cookies cleared in all cases; response `{data:null}` unchanged.

**Why.** Mobile requires "sign-out revokes only this device". Web sends no body → this-device → for web's single session, behaviorally identical to today's global logout. No new endpoint, no web change.

**Alternatives rejected.** Separate `/auth/logout-all` route — unnecessary surface; a body flag is add-only and backward compatible.

### ADR-5 — Apple JWKS verification via `jose`

**Decision.** Rewrite `verifyAppleToken` to **cryptographically verify**: fetch Apple's JWKS from `https://appleid.apple.com/auth/keys` via `jose.createRemoteJWKSet` (cached, auto key-rotation), then `jose.jwtVerify(idToken, jwks, { issuer: 'https://appleid.apple.com', audience: APPLE_CLIENT_IDS })`, enforcing signature (RS256), `iss`, `aud`, and `exp`. Extract `sub` (stable Apple user id → `provider_id`) and `email`. Wire it into `socialAuth` for `provider==='apple' && data.idToken`. **No silent fallback for Apple** — verification failure → 401 (unlike Google's web NextAuth fallback, which is justified because NextAuth already completed a verified PKCE flow; Apple native has no such prior proof).

Config: `APPLE_CLIENT_IDS` (comma-separated) accepting the native bundle id `ai.xyric.balencia` (audience of an `expo-apple-authentication` identity token) and, if/when web adds Apple, the Service ID. Names only; no secrets in code.

**Dep choice — `jose` vs `jwks-rsa`.** Choose **`jose`**: ESM-native (the server runs ESM with `--experimental-vm-modules` and `.js` import specifiers), single dependency that does JWKS fetch + cache + verify in one modern async API, no CJS interop friction. `jwks-rsa` pairs with the CJS `jsonwebtoken` and uses a clunkier callback/client style under ESM. One new server dep, justified: it replaces a hand-rolled (and currently missing) JWKS path and can also verify Google if we later consolidate.

**Alternatives rejected.** (a) Keep decode-only — the security hole the batch exists to close. (b) `jwks-rsa`+`jsonwebtoken.verify` — works but worse ESM ergonomics. (c) Hand-roll JWKS fetch + `crypto.verify` — reinventing a solved, security-sensitive primitive.

### ADR-6 — Google path hardening

**Decision.** Keep the existing `google-auth-library` verification. Add the mobile iOS client id (`EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID`'s server-side counterpart) to the accepted-audiences set (`getGoogleClientIds`). **Harden:** when `X-Client: mobile`, require a real `verifiedProfile` (idToken verification must succeed) — do **not** allow the NextAuth-profile fallback (mobile has no NextAuth PKCE to trust). Web keeps its fallback. `email_verified` check retained.

**Why.** Mobile Google sign-in must be server-verified; the fallback exists only to trust NextAuth's completed OAuth, which mobile lacks. Minimal, justified change to `socialAuth`.

**Alternatives rejected.** Blanket-require verification for web too — would break the documented web resilience fallback for restrictive networks.

### ADR-7 — Mobile social-auth libraries + Expo Go fallback

**Decision.**
- **Apple:** `expo-apple-authentication` (native). It works in **Expo Go on iOS** because the Expo Go app itself declares the Sign in with Apple entitlement. Simulator caveat: requires an Apple ID signed into the Simulator; identity-token depth on Simulator is limited (B1 waiver) — implement fully, verify to the depth the Simulator allows, document device/prod-only steps as a waiver. `AppleAuthentication.signInAsync` yields `identityToken` → POST `/auth/social` `{provider:'apple', idToken, email?, firstName?, lastName?}` (Apple returns name/email only on first consent — persist from the first response).
- **Google:** `expo-auth-session/providers/google` + `expo-web-browser` (both Expo-Go compatible; `expo-web-browser` is already a dep). System-browser OAuth → `id_token` → POST `/auth/social` `{provider:'google', idToken, ...}`. Configure iOS + web client ids from `EXPO_PUBLIC_GOOGLE_*`.
- **Fallback (honest, not faked):** the risk in Expo Go is the OAuth **redirect/client-id** config, not module availability. If a verifiable Google `id_token` cannot be obtained in Expo Go, render the "continue with Google" button as **visible-but-gated** (`LockedFeatureState`/honest chip: "available in the next build") — never a fake success, never a dead end. Apple is the primary Expo-Go-verifiable social path.

New mobile deps (all Expo-Go compatible): `expo-apple-authentication`, `expo-auth-session`. `expo-web-browser` already present.

**Why.** Matches the batch constraint (Expo Go in the iOS Simulator; design the fallback if a native module is unavailable). Apple native is genuinely testable in Expo Go; Google via AuthSession avoids the dev-build-only native Google module.

**Alternatives rejected.** `@react-native-google-signin/google-signin` — custom native module, **not** in Expo Go (needs a dev build); out of scope this batch.

### ADR-8 — Mobile registration/OTP flow state machine

**Decision.** A dedicated `RegistrationFlow` context/reducer (separate from `SessionProvider`) holding `{ step, email, activationToken, resendCooldownEndsAt }` **in memory only** — `activationToken` is NEVER written to SecureStore and NEVER logged. Steps and server calls:

```
S03 signup form → POST /register {email,password,firstName,lastName,dateOfBirth,gender}
   → {activationToken, message}  (503 if email send fails — surface honest "try again")
S03b OTP (4 cells) → POST /verify-registration {activationToken, activationCode}
   → {user, tokens, nextStep:'consent'} → SessionProvider.adoptSession(tokens,user)
   resend → POST /resend-registration-otp {activationToken}  (60s ChargeMeter cooldown)
→ nextStep router (ADR-10) → S03c consent → S03e whatsapp(gated) → onboarding
```

On `verify-registration` success the returned `tokens` (mobile gets full pair via `X-Client: mobile`) seed the session directly — no second login round-trip.

**Why.** The 2-step stateless-OTP flow (OTP lives only inside the short-lived activation JWT server-side) maps cleanly to an in-memory client reducer. Keeping `activationToken` out of persistent storage is a security requirement.

**Alternatives rejected.** Persisting the flow to SecureStore for resume — the activation JWT expires in 10 min; persistence adds a token-at-rest leak for no real UX gain.

### ADR-9 — Forgot/reset adaptation (S05b honest deviation)

**Decision.** Adapt S05b from its **link-token** spec assumption to the **actual server contract**: `POST /reset-password {email, otp(4-digit), password, confirmPassword}`. S05b renders `OTPCluster` (4 cells) + `PasswordRequirementList` (5 rules) + confirm, carrying `email` from S05 (or a `balencia://reset-password?email=` deep link prefill). "Request new link" → returns to S05 (`/forgot-password`) to request a fresh code. **Deviation documented** in the spec + batch record: server has no reset link-token path; OTP is the real mechanism.

**Why.** Honest adaptation to the traced contract beats implementing a link flow the server cannot honor.

### ADR-10 — Enumeration normalization + nextStep routing

**Decision (enumeration).** Resolve the conflict **client-side on mobile**, do not change the server. Server `/forgot-password` 404s unknown emails (deliberate per `auth-session.controller.ts:217-222` comment; the web client would surface that 404 as an error toast today — changing the server to 200 would silently alter the web contract and override a stated product decision, out of scope for a mobile batch). Mobile treats **both 200 and 404 (`NOT_FOUND` / "No account found")** as the **identical** account-enumeration-safe confirmation ("If that email matches an account, reset instructions will arrive") per canon §8. 429 (rate-limit) and network errors still surface honestly. Residual server-side enumeration (other clients, timing) is flagged **OQ-A** for a future server-consent batch — not fabricated as fixed.

**Decision (routing).** A single `resolveNextStep(nextStep)` helper maps the server's `nextStep` field to the mobile route: `consent`→S03c, `complete_profile`→S03d, `whatsapp_enrollment`→S03e, `assessment`→onboarding (S07). Consent (`POST /consent`) requires both `termsOfService` + `privacyPolicy` true (canon: never pre-checked, count starts at zero). Complete-profile (`POST /complete-profile {dateOfBirth,gender,...}`) for social users missing DOB/gender. WhatsApp S03e stays **visible-but-gated (W6)** with the primary action being **skip** → `POST /whatsapp/skip` → `assessment`.

**Why.** Client-side normalization delivers canon enumeration-safety without touching the shared server behavior or the web contract. Centralized nextStep routing keeps the server as the single source of flow truth.

### ADR-11 — Token security review checklist (slice 5)

**Decision.** Auditable checklist, each item a grep-able or test-able gate:
1. **SecureStore only** for tokens (`balencia.mobile.session.v1`); `activationToken`/OTP/reset-code never persisted.
2. **No token/OTP in logs** — grep gate over `src/` for `console.*`/logger calls that could interpolate `accessToken|refreshToken|idToken|activationToken|otp|password|reset`; redact `Authorization` header in any request logging.
3. **Transport** — `EXPO_PUBLIC_API_URL` is the only base; `http` permitted for `127.0.0.1` dev only (documented), TLS in every other profile.
4. **PII** — email masked in UI via `MaskedDestinationLine` (`j***@…`); no raw email in navigation params or deep-link display; deep link carries email only for prefill, never a token.
5. **Client rate-limit handling** — 429 → parse `Retry-After` when present, render live countdown (canon `ChipProvenance` "system cooldown"); never fabricate a countdown when the header is absent ("try again in a few minutes").

**Why.** Slice 5 is a first-class deliverable; making each item mechanically checkable lets the orchestrator prove it.

### ADR-12 — What does NOT change

Web NextAuth session cookie flow + `/api/auth/backend-session` reinstall + 3-day session age; access-token **15-min TTL** and **stateless** verification (no session lookup, no JTI denylist); **bcrypt** password hashing; **sha256** refresh hashing at rest; response envelope + `getAuthTokenPayload` `X-Client` behavior; `/verify-email` dead endpoint (left as-is; out of scope); **register's 503-on-email-failure** (config-only mailpit fix, behavior untouched); `/forgot-password` server behavior (404 + unchecked send); the 4-tab mobile nav; TanStack Query conventions from BIOS-002.

---

## 4. `user_sessions` DDL + migration files

**Table file** — `src/database/tables/03-user-sessions.sql` (verify 03 is free; else next free NN **after** 02-users since the FK depends on `users`; register in `setup.ts` TABLE_FILES). Note the auto-include guard (setup.ts:224-235) will pick it up before triggers even if unlisted, but list it explicitly for determinism.

```sql
-- ============================================
-- USER SESSIONS TABLE  (per-device refresh tokens)
-- ============================================
-- One row per active device session. Stores the sha256 hash of the current
-- refresh token (never the raw token). Rotation updates the hash in place;
-- reuse of a superseded token revokes the whole session.

CREATE TABLE IF NOT EXISTS user_sessions (
    id                 UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id            UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    refresh_token_hash TEXT NOT NULL,               -- sha256(refresh JWT)
    device_id          TEXT,                          -- client-generated stable per-install id
    device_name        TEXT,                          -- best-effort label (e.g. "iOS 18 · balencia")
    client_type        VARCHAR(16) NOT NULL DEFAULT 'mobile', -- 'mobile' | 'web'
    user_agent         TEXT,
    ip_address         INET,
    created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_used_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at         TIMESTAMPTZ NOT NULL,          -- = created/rotated + JWT_REFRESH_EXPIRES_IN
    revoked_at         TIMESTAMPTZ                     -- non-null = revoked (logout or reuse-detected)
);

CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id     ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_active      ON user_sessions(user_id, revoked_at) WHERE revoked_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_sessions_expires_at  ON user_sessions(expires_at);
```

- **`updated_at` trigger:** not needed — `last_used_at` is maintained explicitly by the rotate path; do **not** add to `99-triggers.sql`.
- **Timestamps:** `TIMESTAMPTZ` per yhealth-app §5 (existing `users` uses `TIMESTAMP`; the session table is new, so use the correct type).

**Migration file (existing DBs)** — `src/database/migrations/YYYYMMDDHHMMSS_create_user_sessions.sql` containing the same idempotent `CREATE TABLE IF NOT EXISTS` + indexes. Discovered/run by `scripts/migrate.ts` (`npm run db:migrate:auto`). Because the table is auto-discovered, it does **not** need adding to the hardcoded `run-migrations.ts` array.

**Exact commands (documented; NOT executed as prod deploy this batch):**
- Fresh local DB: `npm run db:setup` (loads `tables/03-user-sessions.sql`).
- Existing local DB (docker `balencia-postgres :5433`): `npm run db:migrate:auto`.
- Verify applied: `npm run db:migrate:verify`.
- Known gap (memory): auto-migration has silently skipped a table before (`139-life-area-checkins.sql`) — **verify the table exists** (`\dt user_sessions`) after running; if absent, apply the SQL via `psql` and record it (mirrors the BIOS-002 lesson).

---

## 5. Endpoint contract changes (before → after; add-only where possible)

| Endpoint | Before | After | Client impact |
|---|---|---|---|
| `POST /login` | sets `users.refresh_token` | creates `user_sessions` row, signs `sid` into tokens; optional `X-Device-Id`/`X-Device-Name` headers name the session | **response unchanged** |
| `POST /register` → `/verify-registration` | sets `users.refresh_token` on verify | creates session + `sid` tokens | **response unchanged** |
| `POST /social` | Apple unverified; Google fallback for all | Apple JWKS-verified (401 on bad token); Google requires real verify for `X-Client:mobile`; creates session | **response unchanged**; Apple now correctly rejects forged tokens |
| `POST /refresh` | single-slot compare + rotate | dual-read: `sid`→session row (rotate / reuse-detect); legacy→`users.refresh_token` compare + lazy-migrate | **response + cookies unchanged**; web transparently migrates |
| `POST /logout` | nulls `users.refresh_token` (global) | optional body `{allDevices?}`; default revokes this session (`sid`), `allDevices:true` revokes all + nulls legacy column; legacy access token → null column | **response unchanged**; web (no body) = this-device |

Response envelope, `getAuthTokenPayload` `X-Client` split, and `setAuthCookies` behavior are untouched. No endpoints removed. No session-list endpoint this batch (flagged OQ-B).

---

## 6. Mobile flow map

**New/updated routes under `src/app/(auth)/`** (Expo Router; extend the existing group):

| Route | Screen (hi-fi) | Server call(s) | Guard |
|---|---|---|---|
| `(auth)/sign-in` | S04 | `POST /login` (+ social) | redirect to tabs if authenticated |
| `(auth)/sign-up` | S03 | `POST /register` (+ social) | — |
| `(auth)/verify` | S03b | `POST /verify-registration`, `/resend-registration-otp` | requires in-memory `activationToken` |
| `(auth)/consent` | S03c | `POST /consent` | requires session |
| `(auth)/complete-profile` | S03d | `POST /complete-profile` | requires session + `needsProfileCompletion` |
| `(auth)/whatsapp` | S03e (W6 gated) | `POST /whatsapp/skip` (primary), `/whatsapp/enroll` (gated) | requires session |
| `(auth)/forgot-password` | S05 | `POST /forgot-password` | — |
| `(auth)/reset-password` | S05b | `POST /reset-password` | email from param/deep link |
| `(auth)/onboarding` | S07 | (existing Cia) | requires session |

**Navigation guards / state:** `resolveNextStep(nextStep)` (ADR-10) is the single router after any session-adopting call. Deep link `balencia://reset-password?email=` prefills S05b (email only, never a token). `RegistrationFlow` reducer (ADR-8) owns pre-session steps; `SessionProvider` owns post-session state.

**Session machine changes (slice 2):** add `adoptSession(tokens,user)` (used by verify-registration + social) alongside `signIn`; add a stable **device id** (SecureStore key `balencia.device.id`, generated once) sent as `X-Device-Id` and a best-effort `X-Device-Name`; sign-out defaults to **this-device** (`POST /logout` no body); re-verify replay/expired semantics against the new model — a reuse-detected/revoked session now yields the same 401→`expired` UX (existing `client.401.test.ts` invariants still hold: business-401 stays a real `ApiError`, refresh-failure becomes `SessionExpiredError`). The BIOS-002 "single stored token / other device invalidated" caveat is **removed** — per-device sessions are now independent.

---

## 7. Packet decomposition (GLM implements ALL code)

Each packet is self-contained: exact target files, DTO/type names verbatim, embedded contracts, acceptance, out-of-scope. **No packet is composed before its dependencies land** (BIOS-002 lesson). Orchestrator (Fable) verifies every output; Sonnet reviews; typecheck+lint+tests are the machine gate. GLM output lands in `evidence/glm-drafts/`.

**Dependency waves:**

```
Wave 0 (server foundation, parallel):     SP1  SP2
Wave 1 (server session core):             SP3(needs SP1)  SP4
Wave 2 (server wiring):                    SP5 SP6 SP7 (need SP3,SP4)   SP8(needs SP2,SP4)
Wave 3 (server tests):                     SP9 SP10 (need SP3–SP8)
--- server contract frozen; mobile builds against it in parallel from here ---
Wave 4 (mobile foundation):               MP1(session) MP2(dto/api) MP3(social libs, needs MP2)
Wave 4.5 (mobile kit):                     MP4(balencia kit primitives)
Wave 5 (mobile screens, need MP1–MP4):     MP5(reg/otp) MP6(forgot/reset) MP7(social+profile) MP8(whatsapp)
Wave 6 (mobile tests + security):          MP9(unit) MP10(security review+fixes)
Wave 7:                                    SMK(simulator smoke)
```

### Server packets

**SP1 — user_sessions DDL + migrations (DB only).** Targets: create `src/database/tables/03-user-sessions.sql` (verify number free), `src/database/migrations/<ts>_create_user_sessions.sql`; modify `src/database/setup.ts` (TABLE_FILES). Embed: §4 DDL verbatim; runner facts. Acceptance: `npm run db:setup` on a fresh DB creates the table + indexes; `npm run db:migrate:auto` applies to an existing DB idempotently; `\dt user_sessions` confirms. Out: any TS logic. Deps: none.

**SP2 — Apple JWKS verifier + Google audience hardening (service, pure).** Targets: modify `src/services/oauth.service.ts`; add `jose` to `package.json`. Embed: ADR-5/6; Apple `iss/aud/exp` rules; `APPLE_CLIENT_IDS` + Google iOS client-id env names; `SocialProfileData` return shape verbatim. Acceptance: `verifyAppleToken` verifies signature via `createRemoteJWKSet`+`jwtVerify`, returns `{provider:'apple',providerId:sub,email,firstName?,lastName?}` or `null`; rejects bad sig / wrong aud / expired; Google accepts the added iOS audience. Out: controller wiring (SP8). Deps: none.

**SP3 — Session service (`src/services/session.service.ts`).** Targets: create the module. Embed: ADR-1/3 semantics; `hashRefreshToken` import path; `env.jwt.refreshExpiresIn` for `expires_at`; cap=10. Contracts (exact names): `createSession({userId, refreshToken, deviceId?, deviceName?, clientType, userAgent?, ip?}): Promise<{sessionId}>`; `rotateSession(sessionId, presentedToken, newRefreshToken): Promise<'rotated'|'reuse_detected'|'not_found'>`; `revokeSession(sessionId)`; `revokeAllForUser(userId)`; `findActiveSession(sessionId)`; `evictOldestIfOverCap(userId, cap)`. Acceptance: pure/queryable, integration-tested in SP10; reuse-detected revokes the row; cap eviction deletes LRU. Out: controllers. Deps: SP1.

**SP4 — `sid` threading in `generateTokens`.** Targets: modify `src/middlewares/auth.middleware.ts`. Embed: current `generateTokens` (§ verified); `IJwtPayload` includes `sessionId?`. Acceptance: `generateTokens({userId,email,role,sessionId?})` signs `sessionId` into both tokens when provided; omitted → no `sid` claim (legacy-compatible); `expiresIn` math unchanged. Out: session creation (callers in SP5–SP7). Deps: none.

**SP5 — Wire login/register/social to sessions.** Targets: modify `auth-session.controller.ts` (login), `auth-registration.controller.ts` (verifyRegistration, socialAuth token issuance). Embed: SP3 API, SP4 signature; read `X-Device-Id`/`X-Device-Name`/`X-Client`/UA; **stop writing `users.refresh_token`**; call `createSession` then `generateTokens({...,sessionId})`. Acceptance: each issues a `sid` pair backed by a `user_sessions` row; `users.refresh_token` no longer written on these paths; responses byte-compatible with before. Out: refresh (SP6), logout (SP7), Apple verify (SP8). Deps: SP3, SP4.

**SP6 — `/refresh` dual-read + lazy migration.** Targets: modify `refreshToken` in `auth-session.controller.ts`. Embed: ADR-3 full branch logic; SP3 API; legacy compare code (verbatim current) for the no-sid path; migrate = createSession + clear `users.refresh_token`. Acceptance: sid path rotates + reuse-detects; legacy path validates against `users.refresh_token`, migrates, clears column; `/refresh` response + cookies unchanged; integration-proven in SP10. Out: login/logout. Deps: SP3, SP4.

**SP7 — Logout this-device / all-devices.** Targets: modify `logout` in `auth-session.controller.ts`; add `allDevices?:boolean` to logout validator (`src/validators/auth.validator.ts`). Embed: ADR-4; SP3 revoke APIs. Acceptance: sid + no flag → revoke that session; `allDevices` → revokeAll + null legacy column; legacy access token → null column; cookies cleared; response unchanged. Deps: SP3, SP4.

**SP8 — socialAuth Apple/Google verification wiring.** Targets: modify `socialAuth` in `auth-registration.controller.ts`. Embed: ADR-5/6; SP2 API; the exact fall-through lines being replaced (`337-361`). Acceptance: `apple` calls `verifyAppleToken` (401 on failure, no fallback); `mobile` Google requires `verifiedProfile`; account-linking-by-email preserved. Deps: SP2, SP4 (SP5 for the session-issue tail).

**SP9 — Server unit tests.** Targets: create `tests/unit/services/session.service.test.ts` (mock DB module per existing `jest.unstable_mockModule` pattern), `tests/unit/services/oauth.service.apple.test.ts` (mock JWKS/`jose`). Cases: rotation match→rotated; superseded token→reuse_detected→revoked; cap eviction picks LRU; Apple bad-sig/wrong-aud/expired/missing-sub/missing-email → null; legacy-vs-sid branch selector. Fixtures spelled out (mock a decoded payload object; mock `jwtVerify` to throw the specific error classes). Deps: SP3, SP2.

**SP10 — Server integration tests (real PG :5433).** Targets: extend `tests/integration/auth.integration.test.ts` (or add `auth-sessions.integration.test.ts`), using `createAuthenticatedUser`/`query`/`hashRefreshToken` helpers. Cases (exact fixture nesting): login creates a `user_sessions` row; refresh rotates the row (hash changes, `last_used_at` bumps); replay of the pre-rotation token → 401 + session `revoked_at` set (reuse detection); **legacy fallback**: seed `users.refresh_token` + a no-sid refresh JWT → refresh succeeds, creates a session, clears the column (lazy migration); two devices refresh independently (no cross-invalidation); logout this-device revokes one row and leaves the other valid; `allDevices` revokes both; Apple `/social` with a forged token → 401. Deps: SP3–SP8, SP1.

### Mobile packets

**MP1 — Session alignment (per-device + this-device logout + replay re-verify).** Targets: modify `src/services/auth/session.ts`, `session-provider.tsx`, `session-machine.ts`. Embed: device-id SecureStore key `balencia.device.id`; `X-Device-Id`/`X-Device-Name` injection in `client.ts`; `adoptSession(tokens,user)`; sign-out no-body (this-device); remove the "other device invalidated" caveat comment; refresh contract unchanged. Acceptance: device id generated once + reused; adoptSession seeds session; existing `client.401.test.ts` + `session-machine.test.ts` still green; expired UX retained. Deps: server contract frozen.

**MP2 — DTO + api service additions.** Targets: create/modify `src/services/api/dto/auth.ts` (add `SocialAuthRequest`, `SocialAuthResponse`, `RegisterRequest`, `RegisterResponse`, `VerifyRegistrationRequest`, `VerifyRegistrationResponse`, `ForgotPasswordRequest`, `ResetPasswordRequest`, `ConsentRequest`, `CompleteProfileRequest`, `NextStep` union `'consent'|'complete_profile'|'whatsapp_enrollment'|'assessment'`); add functions to `src/services/api/auth.ts` (`register`, `verifyRegistration`, `resendRegistrationOtp`, `socialAuth`, `forgotPassword`, `resetPassword`, `submitConsent`, `completeProfile`, `skipWhatsApp`). Embed: exact server response shapes from scope-server-auth §1. Acceptance: typechecks strict; each maps the envelope `data`; no `any`. Deps: none (types).

**MP3 — Social sign-in service + Expo Go fallback.** Targets: add `expo-apple-authentication`, `expo-auth-session` to `package.json`; create `src/services/auth/social.ts`. Embed: ADR-7; env client-id names; Apple `signInAsync`→identityToken; Google AuthSession→id_token; gated-fallback rule. Acceptance: Apple returns idToken+profile; Google returns id_token or a typed `unavailable` result driving the gated UI; no fake success. Deps: MP2.

**MP4 — Extend balencia kit (native primitives).** Targets: modify `src/components/balencia/` (add `GlassPillInput` password/eye variant, `OTPCluster`/`OTPDigitCell`, `ChargeMeter`, `MomentumBar`/`PasswordRequirementList`, `ConsentCheckbox`, `MaskedDestinationLine`, `ToastBanner`, social `BtnSecondary`), export via `index.ts`. Embed: canon specs from scope-hifi-auth §3 (GlassPillInput 52px; BtnPrimary orange one-per-composition; 44px targets; OTPCluster 4 cells; ChargeMeter 60s; reduced-motion; purple=Cia only; sentence case, no exclamation marks). **Extend the RN kit — never import web components.** Acceptance: components render with theme tokens, 44px targets, reduced-motion safe; light-auth override (white fill, warm-gray border, 14–16 radius). Deps: none (tokens only).

**MP5 — Registration/OTP flow screens.** Targets: create `src/app/(auth)/sign-up.tsx`, `verify.tsx`, `consent.tsx`; `src/features/auth/*`; `RegistrationFlow` reducer. Embed: ADR-8; MP2 api; MP4 kit; `resolveNextStep`; activationToken in-memory-only rule. Acceptance: S03→S03b→S03c flow drives real endpoints; 60s resend cooldown; verify seeds session; 503 surfaces honest error. Deps: MP1, MP2, MP4.

**MP6 — Forgot/reset screens.** Targets: create `src/app/(auth)/forgot-password.tsx`, `reset-password.tsx`; deep-link handler. Embed: ADR-9/10; enumeration normalization (200==404 success framing); OTP+password contract; deep-link email prefill. Acceptance: S05 identical success framing for known/unknown; S05b OTP+password reset; "request new code" returns to S05; 429 honest countdown. Deps: MP1, MP2, MP4.

**MP7 — Social buttons + complete-profile.** Targets: modify `src/features/auth/sign-in-screen.tsx`, sign-up; create `complete-profile.tsx`. Embed: MP3 social service; ADR-7 gated fallback; equal-weight Google/Apple pills (canon §8); `needsProfileCompletion`→S03d. Acceptance: Apple native sign-in works in Expo Go to verifiable depth; Google real or honestly gated; complete-profile posts DOB/gender then routes via nextStep. Deps: MP3, MP4.

**MP8 — WhatsApp gated + skip.** Targets: create `src/app/(auth)/whatsapp.tsx`. Embed: W6 gated; primary skip→`/whatsapp/skip`→assessment; provenance chip. Acceptance: visible-but-gated enroll, working skip. Deps: MP2, MP4.

**MP9 — Mobile unit tests.** Targets: create `*.test.ts` for `RegistrationFlow` reducer, enumeration normalization, social service response mapping, session adoptSession/device-id. Embed: Vitest config from BIOS-002. Acceptance: transitions + normalization proven green. Deps: MP1, MP2, MP3, MP5, MP6.

**MP10 — Token security review + fixes.** Targets: audit `src/`; apply fixes. Embed: ADR-11 checklist. Acceptance: grep proves no token/OTP/password in logs; Authorization redaction; SecureStore-only; 429 handling; email masking; deep links carry no tokens. Deliver the checklist result as evidence. Deps: MP1–MP8.

**SMK — Simulator smoke.** Targets: `evidence/simulator/` script + screenshots. Cover every auth flow (sign-up→OTP→consent→whatsapp-skip→onboarding, sign-in, forgot→reset, Apple sign-in, Google or gated) + a real-endpoint exercise log (mailpit OTP retrieval). Deps: all.

---

## 8. Test plan

**Server unit (Jest ts-jest ESM, mocked DB per `jest.unstable_mockModule`):** session service rotation (match→rotated), reuse detection (superseded→reuse_detected→revoked), cap eviction (LRU), legacy-vs-sid branch selection; Apple verifier failure modes (bad signature, wrong `aud`, expired `exp`, missing `sub`, missing `email`) each → `null`, and success → mapped profile; `generateTokens` includes/omits `sid`.

**Server integration (real PG :5433):** the SP10 case list — login→session row; refresh rotation; **rotation replay → reuse detection → revoke**; **legacy fallback + lazy migration** (seed `users.refresh_token`, no-sid JWT → migrates, column cleared); multi-device independence; logout this-device vs all-devices; Apple forged-token → 401; **web-compat regression**: a no-sid refresh keeps the `/refresh` response shape + cookies identical.

**Mobile unit/contract (Vitest):** RegistrationFlow reducer transitions; enumeration normalization (404 body → success VM); social service response mapping + gated-fallback result; session `adoptSession` + device-id persistence; existing `client.401.test.ts` + `session-machine.test.ts` remain green (regression).

**Simulator smoke (SMK):** screenshot every flow end-to-end against the local backend; retrieve OTP/reset codes from the **mailpit** API to complete register/reset; log real request/response for each endpoint (tokens redacted).

**Local email (config-only, no code change):** run mailpit — `docker run -d --name balencia-mailpit -p 1025:1025 -p 8025:8025 axllent/mailpit` — and set in `server/.env`: `SMTP_HOST=127.0.0.1`, `SMTP_PORT=1025`, `SMTP_USER=dev`, `SMTP_PASS=dev`, `FORCE_EMAIL_IN_DEV=true` (so `mail.ts` actually transmits rather than simulating; register's 503-on-failure path is preserved because a real send now succeeds). Retrieve OTPs via `GET http://127.0.0.1:8025/api/v1/messages`. This does **not** change server email behavior — it configures the SMTP env the code already reads.

**Verify command (batch header):** mobile `npm run lint && npm run typecheck && npm run test && npx expo config --type public && npx expo export --platform web --output-dir dist-smoke` + server `npm run typecheck && npm test` + simulator auth-flow smoke + real-endpoint exercise log.

---

## 9. Risks + mitigations

| # | Risk | Mitigation |
|---|---|---|
| R1 | Dual-read regression forces web re-login (backward-compat gate breach) | SP10 web-compat regression test asserts no-sid `/refresh` response + cookies byte-identical; legacy path is the unchanged current code |
| R2 | Auto-migration silently skips `03-user-sessions.sql` (prior `139-*` gap) | Verify `\dt user_sessions` post-migrate; psql fallback documented; both table-file + timestamped migration shipped |
| R3 | Apple identity token unverifiable on iOS Simulator | B1 waiver; implement full JWKS verify, test with mocked JWKS (SP9) + real device/prod as a documented follow-up |
| R4 | Google idToken not obtainable in Expo Go (redirect/client-id) | ADR-7 honest visible-but-gated fallback; Apple is the primary Expo-Go-verifiable path |
| R5 | Reuse detection false-positive locks out a legit client mid-rotation | Mobile single-flight refresh (existing) prevents concurrent rotation; rotation is atomic hash-swap; test the concurrent case |
| R6 | `jose` ESM interop | ESM-native by design (the reason it was chosen over jwks-rsa/jsonwebtoken); typecheck gate |
| R7 | Enumeration still leaks server-side | Documented OQ-A (future server batch); mobile normalization is the in-scope client fix, not claimed as a server fix |
| R8 | GLM under-specifies a session-service edge | Packets embed exact contracts; orchestrator + Sonnet verify; 2-attempt cap → Sonnet/Fable fallback per BATCH stop conditions |

---

## 10. Open questions (genuinely undecidable / owner-gated only)

- **OQ-A (server, future batch):** `/forgot-password` server-side email enumeration (404 on unknown) is a stated product decision; mobile normalizes client-side this batch. A server-side consistent-response change needs product + web-client sign-off. Owner: Hamza/product.
- **OQ-B (future):** a `GET /auth/sessions` list + individual-revoke UX (device management screen) is deferred — not required for "sign-out this device." Owner: roadmap (BIOS-009 trust center candidate).
- **OQ-C (Hamza/ops):** Apple `APPLE_CLIENT_IDS` values (native bundle id confirmed `ai.xyric.balencia`; Service ID only needed if/when web adds Apple). Config, not code.

Everything else technical is decided above. Access-token TTL, hashing, envelope, web cookie flow, and the 4-tab nav explicitly do **not** change (ADR-12).

---

## 11. Fable acceptance amendments (2026-07-09) — plan ACCEPTED WITH AMENDMENTS A1–A7

Sonnet adversarial review (`architecture-plan-review.json`) returned **reject** with 3 blockers + 3 majors + 2 minors. Fable verified each finding against source and amends the plan as follows. The plan + these amendments are binding; packets are composed from the amended state.

- **A1 (B1 confirmed — table numbering):** `src/database/tables/03-user-sessions.sql` collides with existing `03-consent-records.sql`. Verified: highest prefix today is `145-resource-recommendations.sql`. The table file is **`146-user-sessions.sql`**. All packet references update accordingly.
- **A2 (B2 confirmed — auto-migrate registration):** `auto-migrate.ts` discovers nothing automatically: tables come from the hardcoded `EXPECTED_TABLES` array (line 11), supplementary SQL from `SUPPLEMENTARY_MIGRATIONS` (line 1112) and `migrationTableMap` (line 1394). SP1 (server session table packet) MUST also: add `'user_sessions'` to `EXPECTED_TABLES`, and register the migration per the `140-contract-witnesses.sql` convention (packet embeds the exact current array/map lines from source). Post-migrate verification (`\dt user_sessions` on both fresh and existing DB) is a hard acceptance criterion of that packet — this is the `139-*` gap class; do not reintroduce it.
- **A3 (B3 confirmed — Expo Go Apple audience contradiction):** ADR-7's "Apple works in Expo Go via Expo Go's own entitlement" is retracted as a primary-path claim; if Expo Go issues the token, `aud` would be Expo Go's identifier and ADR-5's audience check (bundle id `ai.xyric.balencia`) would 401 it. Resolution: (a) server verifier reads audiences from env `APPLE_CLIENT_IDS` (comma-separated; default = bundle id) so a dev-only `host.exp.Exponent` entry can be added locally without code change — documented as dev-only, never a production value; (b) mobile gates Apple sign-in behind `AppleAuthentication.isAvailableAsync()` → if unavailable (Expo Go/simulator), render the canon honest gated state, never a fake button path; (c) server-side verification correctness is proven by unit tests with an injected JWKS (generated test keypair) covering sig/iss/aud/exp/nonce failure modes; real-device Apple E2E is **waivered** (batch waiver B1, owner Fable→Hamza device pass, unblock = physical-device run or TestFlight build).
- **A4 (M1 confirmed — web never calls /auth/refresh):** verified: only reference in the web client is the cookie `path` attribute in `backend-session/route.ts:71`; no consumer route exists. ADR-3's silent-migration completeness claim is reframed: **lazy migration via dual-read applies to mobile (and any direct API consumer) only**; web-only legacy `users.refresh_token` rows may never migrate and MUST be handled explicitly by the future column-drop batch (documented in ADR-3; column-drop remains out of scope). Dual-read stays (cheap, safe, needed for any pre-upgrade token in flight).
- **A5 (M2 accepted — atomic rotation):** `rotateSession` is specified as a single atomic compare-and-swap: `UPDATE user_sessions SET refresh_token_hash=$new, last_used_at=now(), rotated_at=now() WHERE id=$sid AND refresh_token_hash=$old AND revoked_at IS NULL RETURNING id` — zero rows → treat as reuse/mismatch path. An explicit concurrent-refresh integration test (two parallel refreshes, same token: exactly one wins, loser gets 401, session not falsely revoked... per reuse policy) is added to the server integration test packet.
- **A6 (M3 accepted):** `/logout` currently has NO validator. Packet SP7 creates `logoutSchema` (`{allDevices?: boolean}` optional body, default false) and wires `validate(logoutSchema)` into the route (body remains optional — web's no-body request must keep working byte-for-byte).
- **A7 (N1+N2 accepted — packet composition rules):** when composing packets: embed exact `jose` error class names for each Apple failure mode; re-derive all `auth-registration.controller.ts` line numbers from live source at composition time, never from this plan's prose.
