
# Auth Surface Trace — `yhealth-app/server`

All citations are `file:line` from the current working tree (branch `hifi-build`, submodule `yhealth-app`). No `.env` files were read.

---

## 1. Routes (`src/routes/auth.routes.ts`)

Mounted under `/api/auth` (prefix defined by `env.api.prefix`, not read here). Controllers live in `src/controllers/auth/*`, re-exported through `src/controllers/auth/index.ts` and (legacy compat) `src/controllers/auth.controller.ts:6-26`.

| Method | Path | Middleware (in order) | Body (Zod schema) | Handler |
|---|---|---|---|---|
| POST | `/register` | `authLimiter`, `validate(registerSchema)` | `{email, password, firstName, lastName, dateOfBirth, gender}` | `register` — routes.ts:53-58 |
| POST | `/verify-registration` | `authLimiter`, `validate(verifyRegistrationSchema)` | `{activationToken, activationCode(4-digit)}` | `verifyRegistration` — routes.ts:61-66 |
| POST | `/resend-registration-otp` | `strictLimiter`, `validate(resendRegistrationOTPSchema)` | `{activationToken}` | `resendRegistrationOTP` — routes.ts:69-74 |
| POST | `/social` | `authLimiter`, `validate(socialAuthSchema)` | `{provider: 'google'\|'apple', email, providerId?, idToken?, name?, firstName?, lastName?, avatar?, accessToken?}` | `socialAuth` — routes.ts:77-82 |
| POST | `/login` | `authLimiter`, `validate(loginSchema)` | `{email, password, rememberMe?}` | `login` — routes.ts:85-90 |
| POST | `/refresh` | `authLimiter`, `verifyRefreshToken` | `{refreshToken?}` (or cookie) | `refreshToken` — routes.ts:93-98 |
| POST | `/forgot-password` | `strictLimiter`, `validate(forgotPasswordSchema)` | `{email}` | `forgotPassword` — routes.ts:101-106 |
| POST | `/reset-password` | `strictLimiter`, `validate(resetPasswordSchema)` | `{email, otp(4-digit), password, confirmPassword}` | `resetPassword` — routes.ts:109-114 |
| POST | `/verify-email` | `validate(verifyEmailSchema)` (no rate limiter) | `{token}` | `verifyEmail` — routes.ts:117-121 |
| POST | `/complete-profile` | `authenticate`, `validate(completeSocialProfileSchema)` | `{dateOfBirth, gender, firstName?, lastName?}` | `completeSocialProfile` — routes.ts:128-133 |
| POST | `/consent` | `authenticate`, `validate(consentSchema)` | `{termsOfService, privacyPolicy, emailMarketing?, whatsAppCoaching?}` | `submitConsent` — routes.ts:136-141 |
| POST | `/whatsapp/enroll` | `authenticate`, `strictLimiter`, `validate(...)` | `{phoneNumber, countryCode}` | `enrollWhatsApp` — routes.ts:144-150 |
| POST | `/whatsapp/verify` | `authenticate`, `validate(...)` | `{code(6-digit)}` | `verifyWhatsApp` — routes.ts:153-158 |
| POST | `/whatsapp/skip` | `authenticate` | none | `skipWhatsApp` — routes.ts:161-165 |
| POST | `/change-password` | `authenticate`, `strictLimiter`, `validate(...)` | `{currentPassword, newPassword, confirmPassword}` | `changePassword` — routes.ts:168-174 |
| POST | `/logout` | `authenticate` | none | `logout` — routes.ts:177-181 |
| GET | `/me` | `authenticate`, `createRateLimiter({windowMs:60s,max:30,keyGenerator:'user'})` | — | `getCurrentUser` — routes.ts:184-193 |
| GET | `/onboarding-status` | `authenticate` | — | `getOnboardingStatus` — routes.ts:196-200 |
| PATCH | `/profile` | `authenticate`, `validate(updateProfileSchema)` | `{firstName?, lastName?, phone?, avatar?, dateOfBirth?, gender?}` | `updateProfile` — routes.ts:203-208 |

**Response envelope** (all success responses via `ApiResponse.success`/`.created`): `{success: true, message, timestamp, data?, meta?, requestId?}` — `src/utils/ApiResponse.ts:38-48`. Errors thrown as `ApiError` serialize to `{success:false, error:{code, message, ...}}` via `ApiError.toJSON()` — `src/utils/ApiError.ts:57-61` (truncated in read but structure confirmed).

**Actual `data` payloads, traced to service returns:**
- `register` → `{activationToken, message}` — `auth-registration.controller.ts:90-97`
- `verifyRegistration` → `{user: getPublicProfile(user), tokens: getAuthTokenPayload(req,tokens), nextStep:'consent'}` — `auth-registration.controller.ts:232-240`
- `resendRegistrationOTP` → `{activationToken, message}` — `auth-registration.controller.ts:305-311`
- `socialAuth` → `{user, tokens, isNewUser, needsProfileCompletion, nextStep?}` — `auth-registration.controller.ts:491-511`
- `login` → `{user: getPublicProfile(user), tokens: getAuthTokenPayload(req,tokens)}` — `auth-session.controller.ts:89-96`
- `refreshToken` → same shape as login — `auth-session.controller.ts:172-179`
- `forgotPassword`/`resetPassword`/`verifyEmail` → `data: null` — `auth-session.controller.ts:249-253,331,374`
- `changePassword` → `data: null` — `auth-session.controller.ts:424`
- `logout` → `data: null` — `auth-session.controller.ts:200`
- `completeSocialProfile` → `{user, nextStep:'consent'}` — `auth-registration.controller.ts:547-554`
- `submitConsent` → `{user, nextStep:'whatsapp_enrollment'}` — `auth-onboarding.controller.ts:114-121`
- `enrollWhatsApp` → `{expiresIn}` — `auth-onboarding.controller.ts:180-186`
- `verifyWhatsApp` → `{user, nextStep:'assessment'}` — `auth-onboarding.controller.ts:259-266`
- `skipWhatsApp` → `{nextStep:'assessment'}` — `auth-onboarding.controller.ts:286-292`
- `getCurrentUser` → `{user: getPublicProfile(user)}` — `auth-onboarding.controller.ts:316-318`
- `getOnboardingStatus` → `{currentStep, steps:{registered,consent,whatsApp,assessment,goals,preferences,plan}, isComplete, completedAt}` — `auth-onboarding.controller.ts:355-382`
- `updateProfile` → `{user}` — `auth-onboarding.controller.ts:452-457`

`getPublicProfile(user)` returns `{id, email, firstName, lastName, dateOfBirth, gender, phone, role, avatarUrl, isEmailVerified, onboardingStatus, createdAt, updatedAt}` — `src/utils/user.helpers.ts:164-180` (password/refreshToken never included).

`getAuthTokenPayload(req, tokens)`: if request header `X-Client` (case-insensitive) equals `mobile`, returns full `{accessToken, refreshToken, expiresIn}`; otherwise returns only `{expiresIn}` (web clients rely on HttpOnly cookies, not body tokens) — `src/controllers/auth/auth.types.ts:88-95`. Header is registered as an allowed CORS header at `src/app.ts:93`.

---

## 2. Refresh token model

**Storage**: single column on the `users` table — `refresh_token TEXT` — `src/database/tables/02-users.sql:39`. There is no separate refresh-token or sessions table; **one active refresh token per user at a time** (not per-device).

**What's stored is a hash, not the raw token**: `hashRefreshToken()` = `crypto.createHash('sha256').update(token).digest('hex')` — `src/middlewares/auth.middleware.ts:87-89`. Written on login (`auth-session.controller.ts:80-84`), registration (`auth-registration.controller.ts:217-221`), social auth (`auth-registration.controller.ts:482-486`), and on every refresh (`auth-session.controller.ts:161-165`). Cleared to `NULL` on logout (`auth-session.controller.ts:191-194`).

**Rotation**: on `POST /refresh`, `verifyRefreshToken` middleware first JWT-verifies the refresh token against `env.jwt.refreshSecret` (`auth.middleware.ts:265-293`), then the `refreshToken` controller re-derives the user by `userId` from the token, re-fetches the current DB role, generates a **brand-new** access+refresh token pair via `generateTokens()`, and overwrites `users.refresh_token` with the new hash (`auth-session.controller.ts:106-181`). Old refresh token is invalidated by being overwritten (rotation-on-use).

**"Refresh token mismatch" 401**: `auth-session.controller.ts:150-152` — inside the `refreshToken` handler, after JWT-verifying the presented token, the code re-fetches `users.refresh_token` and compares `hashRefreshToken(refreshTokenFromRequest)` against the stored hash; on mismatch it throws `ApiError.unauthorized('Refresh token mismatch')`. This guards against reuse of a refresh token that's been superseded by a later rotation or invalidated by logout.

**TTLs** (from `src/config/env.config.ts:82-89`, names only, defaults shown are code fallbacks not secrets):
- Access token: `env.jwt.expiresIn` = `JWT_EXPIRES_IN` env var, default `'15m'`
- Refresh token: `env.jwt.refreshExpiresIn` = `JWT_REFRESH_EXPIRES_IN` env var, default `'7d'`
- Signing secrets: `JWT_SECRET` (access) and `JWT_REFRESH_SECRET` (refresh) — both in `requiredEnvVars` so the server fails fast at boot without them (`env.config.ts:9-16`), except under `NODE_ENV=test` (`env.config.ts:56-58`).
- Issuer/audience: `JWT_ISSUER` (default `'balencia-api'`), `JWT_AUDIENCE` (default `'balencia-client'`) — checked on every `jwt.verify` call (`auth.middleware.ts:38-41,277-280`).
- Cookie `refresh_token` maxAge is hardcoded to `7 * 24 * 60 * 60 * 1000` (7 days) independent of `env.jwt.refreshExpiresIn` — `auth.middleware.ts:107-113` (a literal, not derived from the JWT's actual `exp`).
- Access cookie maxAge = `tokens.expiresIn * 1000`, where `expiresIn` is computed from the actual JWT `exp` claim minus now — `generateTokens()`, `auth.middleware.ts:315-319`.

**JWT payload fields**: `IJwtPayload extends JwtPayload { userId, email, role, sessionId? }` — `src/types/index.ts:33-38`. `generateTokens()` signs `{userId, email, role}` for both access and refresh tokens identically (`auth.middleware.ts:298-313`) — `sessionId` is declared in the type but never populated anywhere in the traced auth code (grep found no writer). There is **no separate mobile-vs-web JWT payload shape** — the payload is identical; only the HTTP transport differs (see below).

**`X-Client` header handling**: the header does **not** change the JWT contents. It only changes what `getAuthTokenPayload()` puts in the JSON response body: `X-Client: mobile` → full token pair in `data.tokens` (so a native app without cookie jars can store them); any other/absent value → only `{expiresIn}` in the body, because web clients are expected to rely on the HttpOnly cookies set by `setAuthCookies()` — `src/controllers/auth/auth.types.ts:88-95`. **Both client types still get the same `Set-Cookie: access_token` / `Set-Cookie: refresh_token` HttpOnly cookies regardless of `X-Client`** — `setAuthCookies()` unconditionally sets both cookies (`auth.middleware.ts:91-114`), called from every token-issuing handler before `getAuthTokenPayload` is computed.

**Cookie config**: `access_token` — httpOnly, `secure: env.isProduction`, `sameSite:'strict'`, path `/`, maxAge = access-token TTL in ms. `refresh_token` — same flags, but path scoped to `${env.api.prefix}/auth/refresh` only, maxAge hardcoded 7 days — `auth.middleware.ts:91-114`. `clearAuthCookies()` clears both the current and a legacy `/api`-scoped `access_token` path (migration note in comment) — `auth.middleware.ts:116-120`.

---

## 3. Social auth (Google / Apple)

**Route**: `POST /api/auth/social` → `socialAuth` — `src/routes/auth.routes.ts:77-82` → `src/controllers/auth/auth-registration.controller.ts:320-512`. Validator `socialAuthSchema` accepts `provider: z.enum(['google','apple'])` — `src/validators/auth.validator.ts:50-60`.

**Verification library**: `src/services/oauth.service.ts` (singleton `OAuthService`), exposing `verifyGoogleToken`, `verifyAppleToken`, `verifySocialToken(provider, idToken, userData?)`.

- **Google**: `verifyGoogleToken()` dynamically imports `google-auth-library` if available (`oauth.service.ts:63-77`); if the client ID env var is set, it verifies the ID token's signature/audience/expiry via `OAuth2Client.verifyIdToken` against each configured audience (`oauth.service.ts:110-141`), falling back to Google's `tokeninfo` HTTP endpoint if the library isn't installed (`oauth.service.ts:180-204`). Also checks `email_verified === true` (`oauth.service.ts:154-157`).
- **Apple**: `verifyAppleToken()` only **decodes** the JWT (`jwt.decode(idToken, {complete:true})`) — it does **not** verify the signature against Apple's public keys. The comment says so explicitly: *"In production, fetch Apple's public keys and verify the signature... For now, we'll decode and trust the token"* — `oauth.service.ts:214-224`.
- **Critical finding — Apple path is not wired into the controller at all**: `socialAuth()` only calls `oauthService.verifySocialToken(...)` when `provider === 'google' && data.idToken`  (`auth-registration.controller.ts:337-345`). For `provider === 'apple'`, there is **no call into `oauthService`** anywhere in `socialAuth()` — `verifiedProfile` stays `null`, and the handler falls straight through to using the client-submitted `data.email`/`data.providerId`/`data.name` fields unverified (`auth-registration.controller.ts:357-361`). So although `oauth.service.ts` has an Apple verification method, and it's exported via `verifySocialToken`, the auth route never invokes it for Apple sign-in — Apple identity is trusted entirely from client-supplied JSON with zero cryptographic check server-side.

**First-time social user**: `socialAuth()` looks up by `email` (`auth-registration.controller.ts:364-367`). If found → updates `auth_provider`, `provider_id`, `avatar`, `last_login`, forces `is_email_verified = true` (account **linking** by email match, not by provider+providerId) — `auth-registration.controller.ts:377-393`. If not found → creates a new `users` row with `auth_provider`, `provider_id`, `onboarding_status:'consent_pending'`, `is_email_verified:true`, default role, plus a `user_preferences` row, in a DB transaction — `auth-registration.controller.ts:401-430`. New users get: signup credits via `ensureWallet` (non-blocking, `.catch()`'d) — line 438-445; a non-blocking welcome email — line 448-456; a welcome notification (awaited) — line 459; added to the community chat group (non-blocking) — line 462-467. Response includes `needsProfileCompletion: !user.dateOfBirth || !user.gender` (line 495), driving the client to `/complete-profile` before onboarding continues.

**Required env/config names (names only)**: `GOOGLE_CLIENT_ID`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_ID_WEB` (all accepted as valid audiences — `oauth.service.ts:79-94`). No Apple-specific env var is read anywhere in `oauth.service.ts` (no `APPLE_CLIENT_ID`/`APPLE_TEAM_ID`/key-related config exists in this file).

**ABSENT**: Neither provider is "absent" in the sense of missing routes/schema (both are declared in `socialAuthSchema`), but **Apple sign-in has no server-side cryptographic verification path wired to the route** — it is effectively unauthenticated trust of client-submitted identity data, unlike Google which has a real (if config-dependent) verification path.

---

## 4. Registration / OTP / Password

**Registration is a 2-step, stateless-OTP flow (no OTP DB table)**:
1. `POST /register` — checks email uniqueness (`auth-registration.controller.ts:47-57`), hashes the password (`bcrypt` via `helper/encryption.js`, line 60), then `createActivationToken()` signs a JWT containing the **entire pending user payload + a 4-digit `activationCode`**, `expiresIn: '10m'` (`auth.types.ts:100-121`). The OTP is never written to the DB — it lives only inside this short-lived JWT, mailed to the user via `mailHelper.sendRegistrationOTPEmail` (`auth-registration.controller.ts:74-79`).
2. `POST /verify-registration` — `jwt.verify(activationToken, env.jwt.secret)`, compares `decoded.activationCode === activationCode` from the request body (`auth-registration.controller.ts:110-126`), then INSERTs the `users` row (+ `user_preferences`) inside a DB transaction, relying on the `users.email` unique constraint to catch races (Postgres error `23505` → 409) — `auth-registration.controller.ts:130-173`. Grants signup credits (non-blocking), sends welcome email (non-blocking), sends welcome notification (awaited), adds to community chat group (non-blocking), then issues tokens and sets cookies.
3. `POST /resend-registration-otp` — re-verifies the still-valid `activationToken`, re-checks the email isn't already registered, mints a fresh `activationCode` and a new 10-minute token (`auth-registration.controller.ts:248-314`).

**Separate `/verify-email` endpoint appears orphaned**: `verifyEmail()` looks up a user by `email_verification_token`/`email_verification_expires` columns on `users` (`auth-session.controller.ts:339-376`). Grep across `src/` found **no code path that ever writes `email_verification_token`**, and the mail-helper methods that would generate/send it (`sendVerificationEmail`, `resendVerificationEmail` — `src/helper/mail.ts:130-131,527-558`) are **never called** from any controller in the traced auth surface. Registration instead sets `is_email_verified = true` directly at account-creation time (OTP confirmation *is* the verification) — `auth-registration.controller.ts:151`. So `/verify-email` is a live, validated route with a real DB query, but nothing in the current codebase ever produces a token it could successfully match.

**Forgot password / reset password (also OTP, but this one IS DB-stored)**:
- `POST /forgot-password` — generates a 4-digit `crypto.randomInt` code, SHA-256 hashes it, stores hash + 10-minute expiry + resets `password_reset_attempts = 0` on the `users` row (`auth-session.controller.ts:226-237`), emails it via `emailService.sendPasswordResetOTPEmail` — **return value of the email send is not checked**, so the endpoint reports success even if the email silently failed (`auth-session.controller.ts:240-253`). Also: if the email is not registered, the endpoint throws `404 ApiError.notFound` (explicit email-enumeration by design — comment at `auth-session.controller.ts:217-219` acknowledges the tradeoff).
- `POST /reset-password` — looks up by email + unexpired `password_reset_token`, enforces `MAX_RESET_ATTEMPTS = 5` with a counter column, uses `crypto.timingSafeEqual` for constant-time OTP comparison, burns the code after too many wrong attempts, and on success updates `password` (bcrypt-hashed) and clears all reset-state columns (`auth-session.controller.ts:261-333`).
- `POST /change-password` (authenticated) — requires current password match, rejects if new === current, updates password, then best-effort emails a "password changed" notice (`try/catch`, logged but not thrown on failure) — `auth-session.controller.ts:382-426`.

**How emails are sent / worker-queue**: No queue/BullMQ worker in this path — email sending is a **direct, synchronous call inside the request handler** via `mailHelper`/`emailService` (nodemailer SMTP transporter) — `src/helper/mail.ts`. `emailService` (`src/services/email.service.ts`) is a `Proxy` around `mailHelper`: a small allowlist of lifecycle emails (`sendWelcomeEmail`, `sendAssessmentReminderEmail`, `sendIntegrationReminderEmail`, `sendGoalSetEmail`, `sendWeeklyProgressEmail`, `sendStreakMilestoneEmail`) is routed through `emailEngine` for dedup/throttling/quiet-hours (`email.service.ts:48-168,229-243`); everything else — including `sendRegistrationOTPEmail`, `sendPasswordResetOTPEmail`, `sendPasswordChangedEmail` — passes straight through to `mailHelper` unmodified.

**Failure mode when no email provider is configured** (traced, not read from `.env`):
- `MailHelper` computes `isConfigured = !!(env.smtp.host && env.smtp.user && env.smtp.pass)` at construction (`src/helper/mail.ts:210`).
- `send()`: if `!this.transporter || !this.isConfigured` → logs a warning and **returns `false`** immediately, without throwing (`mail.ts:383-390`). (If it *is* configured but running outside production without `FORCE_EMAIL_IN_DEV=true`, it instead logs and returns `true` without actually hitting SMTP — `mail.ts:392-403` — a distinct "simulated success" path, not the "unconfigured" path.)
- **`register` (`POST /register`) checks the return value**: `if (!emailSent && !env.isTest) throw ApiError.serviceUnavailable('Unable to send verification email right now...')` — `auth-registration.controller.ts:81-86`. So with no SMTP configured, in a non-test, non-forced environment, **registration step 1 fails end-to-end with a 503** — the API call does *not* succeed.
- `resendRegistrationOTP` has the identical check/throw — `auth-registration.controller.ts:296-301`.
- **`forgotPassword` does NOT check the return value** of `emailService.sendPasswordResetOTPEmail` (`auth-session.controller.ts:240-245`) — the API call **succeeds with 200** and the generic "A reset code has been sent" message even if SMTP is fully unconfigured and the email was silently dropped.
- Non-blocking welcome emails (`.catch()`'d in both registration paths) never affect the response regardless of SMTP config.

---

## 5. Logout + session model

**Logout** (`POST /api/auth/logout`, `authenticate` required): sets `users.refresh_token = NULL` for the current user, clears both cookies, returns `{data: null}` — `auth-session.controller.ts:187-202`. This is a **global, single-session logout** — because there's only one `refresh_token` column per user (no per-device row), logging out invalidates the one stored refresh token for *all* of that user's clients simultaneously; there is no per-device/session targeting.

**No sessions/devices table exists.** Grep of `src/database/tables/` for `sessions|devices|user_sessions|login_attempts|account_lockout` found none — confirmed by directory listing (only unrelated tables like `voice-journal-sessions`, `ai-coach-sessions`, `yoga-sessions` etc. matched the substring "session", none of which are auth-session tables).

**Account lockout**: no dedicated lockout table or persistent failed-login counter for `login` itself. The only throttle on `/login` is the shared `authLimiter`: 10 requests per 15-minute window, **IP-keyed** (default `express-rate-limit` key generator, not user-keyed) — `src/middlewares/rateLimiter.middleware.ts:58-66`. `/forgot-password`, `/reset-password`, `/whatsapp/enroll`, `/change-password` use `strictLimiter`: 5 requests/hour, also IP-keyed — `rateLimiter.middleware.ts:72-80`. `/me` uses a custom **user-keyed** limiter (30/min) — `routes/auth.routes.ts:187-191`, `rateLimiter.middleware.ts:117-144`. Password-reset OTP brute-force is separately guarded in-app by the `password_reset_attempts` counter + `MAX_RESET_ATTEMPTS = 5` logic in `resetPassword` (see §4), not by the rate limiter.
**Rate limiter storage**: no `store` option is passed to any `rateLimit(...)` call in `rateLimiter.middleware.ts` — confirmed by grep (no `store`/`RedisStore` reference in the file) — so all limiters use `express-rate-limit`'s default **in-memory** store: per-process, not shared across multiple server instances, and reset on process restart. All limiters are also globally bypassed under `env.isTest` via `skip: () => env.isTest` (e.g. `rateLimiter.middleware.ts:51,65,79`).

---

## 6. Test infra

**Runner**: Jest via `ts-jest` ESM preset — `npm test` = `cross-env NODE_OPTIONS=--experimental-vm-modules jest` (`package.json:18`); config in `jest.config.js:1-40`, `testMatch` covers `**/*.test.ts`, `**/*.spec.ts`, `**/__tests__/**`.

**CI variant**: `test:ci` = `jest --ci --coverage --runInBand` with a bumped heap (`--max-old-space-size=5120`) — `package.json:23`. The `jest.config.js` coverage-threshold comment states CI "runs the full suite... against a provisioned Postgres (pgvector) and Redis" (`jest.config.js:~55-60`, comment text).

**Global test setup** (`tests/setup.ts:1-56`): loads `.env` via `dotenv` so real `DATABASE_URL`/credentials are available (not read by me), then overrides `NODE_ENV=test` and sets deterministic `JWT_SECRET`/`JWT_REFRESH_SECRET`/`JWT_EXPIRES_IN`/`JWT_REFRESH_EXPIRES_IN`/`JWT_ISSUER`/`JWT_AUDIENCE` test values directly in `process.env` (`tests/setup.ts:14-20`) — these are hardcoded test literals in the file, not secrets.

**Existing auth test files**:
- `tests/integration/auth.integration.test.ts` (279 lines) — **hits a real Postgres**: imports `query` from `../../src/database/pg.js` directly (`auth.integration.test.ts:14`) and drives the real Express app via `supertest`/`createApp()` (`auth.integration.test.ts:12-24`), inserting test users straight into the DB via `createTestUser`/`createAuthenticatedUser` helpers (comment at `auth.integration.test.ts:4-10` explicitly notes registration is tested at the HTTP layer for step 1 only, with DB-seeded users used for login/me/consent/refresh/logout since the 2-step OTP flow makes full HTTP-only setup awkward). Confirms `hashRefreshToken` is imported directly for assertions (`auth.integration.test.ts:16`).
- `tests/unit/controllers/auth.controller.test.ts` (18 lines) — trivial: just asserts the legacy `auth.controller.ts` compat shim re-exports the same function references as `controllers/auth/index.ts` (no DB, no HTTP).
- `tests/unit/controllers/auth-cookies.test.ts` (277 lines) — **fully mocked DB**: uses `jest.unstable_mockModule` to stub `middlewares/auth.middleware.js`, `helper/encryption.js`, and `controllers/auth/auth.types.js`, plus a shared `setupControllerMocks()` harness (`auth-cookies.test.ts:1-40`) — no real Postgres involved.
- `tests/unit/middlewares/auth.middleware.test.ts` (515 lines) and `tests/unit/validators/auth.validator.test.ts` (313 lines) — unit-level, not inspected line-by-line here but co-located with the mocked-DB pattern used by the sibling controller unit tests.

**DB used by tests**: mixed by design — **unit tests mock the DB module** (`jest.unstable_mockModule` against `config/database.config.js`/`auth.types.js`), while **`tests/integration/*` hit a real PostgreSQL instance** via `src/database/pg.js`'s `query()`, expected to be provisioned (locally or in CI) with the actual schema/migrations from `src/database/tables/` and `src/database/schema.sql` — no in-memory/sqlite substitute was found anywhere in the auth test files.

---

## Notable structural findings (not requested but load-bearing for correctness review)

1. **Apple sign-in has zero server-side token verification wired into the route** — `oauth.service.ts` has a `verifyAppleToken()` method that itself only decodes (doesn't cryptographically verify) the Apple identity token, and `socialAuth()` never even calls it for `provider==='apple'` (§3). Google, meanwhile, is at least conditionally verified.
2. **`/verify-email` is a dead-letter endpoint** — validated and DB-backed, but nothing in the codebase currently writes the `email_verification_token`/`email_verification_expires` columns it reads (§4).
3. **`forgotPassword` silently succeeds even when email delivery fails** (return value of `emailService.sendPasswordResetOTPEmail` is never checked), while `register`/`resendRegistrationOTP` correctly surface a 503 on the same failure (§4).
4. **Refresh tokens are single-slot per user** (one `refresh_token` column on `users`, no per-device table) — logging in on a second device silently invalidates the first device's stored hash on the next refresh cycle, and logout is global across all of a user's clients (§2, §5).
