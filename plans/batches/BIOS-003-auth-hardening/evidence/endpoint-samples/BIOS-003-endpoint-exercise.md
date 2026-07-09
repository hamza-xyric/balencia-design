# BIOS-003 Evidence — Live Endpoint Exercise (2026-07-09)

Local backend :9090 (see `evidence/local-backend-delta.md` — mailpit sink for OTP retrieval).
Script: `exercise.py` (curl-based; tokens redacted in the JSON log). All steps against the
REAL server + docker Postgres, seeded user `john.doe@balancia.test` + a fresh registration.

| # | Step | Result |
|---|------|--------|
| 1 | `POST /auth/login` (X-Client mobile, X-Device-Id device-A) | 200 — `user_sessions` row created: `device-A｜mobile｜active` |
| 2 | Second login, X-Device-Id device-B | 200 — 2 independent active session rows |
| 3 | `POST /auth/refresh` device A | 200 — new pair issued (rotation; refresh token differs — jti uniqueness) |
| 4 | Replay of the pre-rotation device-A refresh token | **401 "Refresh token mismatch"** + session `revoked_at` set (reuse detection) |
| 5 | `POST /auth/refresh` device B after A's rotation+revocation | 200 — sessions independent (BIOS-002's single-slot invalidation gone; OQ-1 closed) |
| 6 | `POST /auth/logout` device B, **no body** | 200 — this-device semantics: B's refresh → 401; device A unaffected |
| 7 | `POST /auth/register` (`bios003.smoke@balancia.test`) | 200 — activationToken returned; OTP email → mailpit |
| 8 | OTP retrieved via mailpit API | 4-digit code |
| 9 | `POST /auth/verify-registration` (X-Device-Id device-C) | 201 — user created, tokens issued (sid pair, session row), `nextStep=consent` |
| 10 | `POST /auth/consent` (terms+privacy) | 200 — `nextStep=whatsapp_enrollment` |
| 11 | `POST /auth/whatsapp/skip` | 200 — `nextStep=assessment` |
| 12 | `POST /auth/forgot-password` (known email) | 200 — reset OTP email → mailpit |
| 13 | `POST /auth/forgot-password` (unknown email) | 404 (server enumeration behavior by design — mobile normalizes both to identical success framing, ADR-10; residual server leak = OQ-A) |
| 14 | `POST /auth/reset-password` (mailpit OTP + new password) | 200 |
| 15 | Login with the new password | 200 |
| 16 | `POST /auth/social` apple + **forged idToken** | **401** (JWKS verification — the BIOS-003 security fix live) |
| 17 | `POST /auth/social` apple **without idToken** | **401** (no client-trust fallback remains) |

Rate limiting observed live: the first exercise run tripped `authLimiter` (10/15min/IP) at step 15 → 429s (limiter works; in-memory, reset by server restart).

Raw request/response log (tokens redacted): `exercise-log.json` in the session tmp dir; key samples preserved in this directory.

## Upstream finding (recorded, not fixed here)
- `tests/globalTeardown.ts` deletes ALL `%@balancia.test` users (only 2 hardcoded emails protected) — running the server integration suite wipes the 15 seeded dev users. **Recipe addition: re-run `npm run db:seed:test-users` after any server integration-test run.** Owner: server backlog (suggest protecting the seeded-user list or using a distinct test-only domain).
