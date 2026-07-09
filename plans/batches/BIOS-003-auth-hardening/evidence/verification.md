# BIOS-003 Evidence — Move G Verification (2026-07-09)

## Hard gates

| Gate | Command | Result |
| --- | --- | --- |
| Mobile lint | `npm run lint` | **PASS** — ESLint: No issues found |
| Mobile typecheck | `npm run typecheck` | **PASS** — tsc --noEmit strict, 0 errors |
| Mobile tests | `npm run test` | **PASS** — manifest verifier + Vitest **66/66** across 16 files (was 41/41 at batch entry; +25: RegistrationFlow reducer, forgot-normalize incl. enumeration-safety & Retry-After, device-id single-flight + PII, next-step router, maskEmail edge cases, retry-after precedence) |
| Expo config | `npx expo config --type public` | **PASS** |
| Web export smoke | `npx expo export --platform web --output-dir dist-smoke` | **PASS** — 2.4M bundle |
| Server typecheck | `npm run typecheck` (server) | **PASS** — 0 errors |
| Server auth suites | `npx jest` over the 8 auth-scoped suites (unit + integration on real PG :5433) | **PASS** — **117/117** (session service rotation/reuse/cap, Apple JWKS failure modes, middleware, validators incl. new social-email contract, cookie-delivery contract incl. per-device issuance + Apple-401 cases, full `auth-sessions` integration: login→row, rotation, replay→revoke, legacy lazy-migration, multi-device independence, logout matrix, forged-Apple 401, concurrent refresh) |
| Server full suite | `npm test` | **NOT RUN to completion — pre-existing upstream debt**: full-suite run crashes V8 OOM (observed in-batch by the gate agent: 553 suites ran, 544 passed, 9 failed before crash; failures incl. `whatsapp-voice-synth` — all outside auth scope). `test:ci` exists upstream with heap bump for CI. Waived for this batch scope (auth suites green); owner: server backlog. |
| Real-endpoint exercise | curl script vs live :9090 | **PASS — 17/17 steps** (`endpoint-samples/BIOS-003-endpoint-exercise.md`): multi-device sessions, rotation, replay→401+revoke, this-device logout, register→OTP(mailpit)→verify→consent→whatsapp-skip, forgot/reset incl. enumeration behavior, login-after-reset, forged/absent Apple idToken → 401, live rate-limiting |

## iOS Simulator smoke (iPhone 17 Pro, Expo Go SDK 57, Metro w/ `EXPO_PUBLIC_API_URL=http://127.0.0.1:9090/api`, Maestro 2.6.1)

Screenshots in `evidence/simulator/`:

| Evidence | What it proves |
| --- | --- |
| `01-boot-expired-redirect.png` | Boot with a dead stored session → expired handling → S04 sign-in (spec copy w/ italic *momentum*, Forgot password link, equal-weight Google/Apple pills with real Apple glyph, HONEST gated captions "available in the next build" — no client IDs/Apple auth in Expo Go, Sign up link) |
| `02/03-forgot-*.png` | S05 forgot-password form → enumeration-safe success ("If that email matches an account…", green check, `MaskedDestinationLine` b***@balancia.test, Enter code CTA, resend row) — live POST /auth/forgot-password + real mailpit email |
| `04/05-reset-*.png` | S05b honest OTP adaptation (ADR-9): masked line, 4 OTP cells (real mailpit code typed via automation), password fields w/ Show toggles, live 5-rule checklist all-green with valid password |
| `05b-reset-mismatch-error-state.png` | S05b inline validation: red border + "passwords do not match" error caption |
| `08/09/09b-signup-*.png` | S03 sign-up: spec copy w/ italic *Cia*, kit inputs, live requirement checklist, gender radiogroup (selection state), disabled-until-valid CTA (submit refused while form incomplete — proven), gated social pills, sign-in cross-link, compliance caption |
| `15-signin-filled.png`, `16-signed-in-onboarding.png` | **Live UI sign-in through the NEW per-device session model**: real POST /auth/login → session row → authenticated → routed to Coach Onboarding with REAL onboarding-status (5/7 steps) + honestly gated cards (Deep life map "Flag gated") |
| Today live render | verified at session start against live backend (honest-null Life Power/pulse; also BIOS-002 evidence) |

**Bug found BY this smoke and fixed in-batch:** `Google.useIdTokenAuthRequest` throws at render on iOS when `iosClientId` is undefined — MP3's availability guard ran only after the hook call → sign-in screen crashed in Expo Go without Google env. Fixed (placeholder client ids + `hasClientIds` hard gate on `available`); regression covered by the render evidence above.

**Automation limitation (documented, not an app defect):** Maestro 2.6.1 + RN 0.86 new-architecture text injection is flaky on secure/masked fields (input intermittently not delivered; taps on nested-Text links need point-taps/accessibility labels). Registration full-form UI submit and reset-success terminal could not be completed by automation in this run; those exact server round-trips are proven live at API level (exercise steps 7–15) and every screen state is screenshot-verified. Follow-up: BIOS-004 smoke should drive text via a dev-build (or Maestro update) — carried in the batch record.

## Review panel (Move F)

`evidence/review-panel.md` — 16 findings → 14 adversarially confirmed → all fixed (2 blockers incl. the X-Client Google-verification bypass; social empty-email 400; a11y labels/announcements; design parity incl. missing Forgot link + stale pilot copy) → all gates re-run green. 2 refuted with recorded evidence.

## Server behavior changes verified live
- Every social sign-in now requires a server-verified identity token (Apple JWKS w/ email_verified check; Google always — the web client already sends `id_token` on every sign-in, verified in `client/lib/auth.ts`). Fail-closed.
- `jti` claim added to refresh tokens (uniqueness inside 1-second `iat` windows — SP10 caught rotation degeneracy; now rotation/replay guarantees hold under rapid refresh).
- Legacy no-sid refresh tokens still work via dual-read + lazy migration (integration-proven); `/refresh` response + cookie shape unchanged (web-compat regression test green).
