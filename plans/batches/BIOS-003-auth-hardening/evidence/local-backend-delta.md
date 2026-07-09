# BIOS-003 Evidence — Local Backend Delta (on top of BIOS-002 local-backend.md)

Date: 2026-07-09. Base recipe unchanged: docker `balencia-postgres` (pgvector :5433) + `balencia-redis` (:6380), server `npm run dev` :9090, seeded test users.

## New: local mail sink (registration/OTP/forgot-password exercisable)

- **Why**: `MailHelper.send()` returns `false` when SMTP unconfigured → `POST /auth/register` throws 503 (`auth-registration.controller.ts:81-86`). Registration was un-exercisable locally in BIOS-002.
- **Container**: `docker run -d --name balencia-mailpit -e MP_SMTP_AUTH_ACCEPT_ANY=1 -e MP_SMTP_AUTH_ALLOW_INSECURE=1 -p 8025:8025 -p 1025:1025 axllent/mailpit` (v1.30.3)
- **server/.env additions (names only; values are local dummies, no secrets)**: `SMTP_HOST=127.0.0.1`, `SMTP_PORT=1025`, `SMTP_USER`/`SMTP_PASS` (dummy — mailpit accepts any auth), `SMTP_FROM=noreply@balencia.local`, `FORCE_EMAIL_IN_DEV=true` (required — without it `mail.ts:394-403` "simulates" success and logs email data instead of sending).
- **Server restart required** (transporter + `isConfigured` fixed at construction).
- **Proof (2026-07-09)**: `POST /api/auth/register` → 200 `{activationToken, message:"Please check your email for the verification code"}`; mailpit `GET /api/v1/messages` shows "Your Verification Code - Balencia" to `bios003.probe@balancia.test`.
- **OTP retrieval for smoke tests**: `curl -s http://127.0.0.1:8025/api/v1/message/<id>` (or `/api/v1/messages` + search) — 4-digit code in body. Mailpit UI at http://127.0.0.1:8025.
- Probe account `bios003.probe@balancia.test` NOT verified (no user row created until verify-registration) — activation JWT expires in 10m, harmless.
