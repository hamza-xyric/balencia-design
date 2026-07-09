# BIOS-003 Evidence — Move F Review Panel (2026-07-09)

4 Sonnet lenses (code / design-parity / accessibility / security-trust), workflow `wf_5a7488e8-d3b`.
**16 findings → adversarial per-finding verification → 14 CONFIRMED, 2 REFUTED.** All 14 fixed by the
orchestrator in-batch; gates re-run green after fixes (server 8 suites / 117 tests; mobile 16 files / 66 tests; lint 0; typecheck clean both sides).

## Confirmed → fixed

| ID | Sev | Finding | Fix applied |
|----|-----|---------|-------------|
| code:F1 + security:SEC-3 | blocker | Mobile social sent `email: ''`; server `socialAuthSchema` required a valid email → every real social sign-in 400'd before verification | `socialAuthSchema.email` now optional (empty string normalized to absent); controller derives email from the VERIFIED token, 400s only when neither source has one; mobile omits the field when the provider doesn't supply it |
| security:SEC-1 | blocker | Google verification strength was gated on the client-supplied `X-Client` header — any caller could omit it and mint a session via the unverified NextAuth-profile fallback | Fallback removed entirely: Google requires a server-verified idToken for ALL callers (verified: the web client sends `account.id_token` on every sign-in — `client/lib/auth.ts` signIn callback — so nothing breaks); fail-closed on verification failure |
| security:SEC-2 | major | `verifyAppleToken` ignored `email_verified` (Google path rejects unverified) | Rejects `email_verified === false \|\| 'false'` with reason-coded log |
| design:F1 | major | Forgot-password flow unreachable — no link on sign-in | "Forgot password?" link (44px target) under the password field |
| design:F2 | major | Sign-in still showed dev/pilot copy ("Balencia iOS pilot", API notes card) | S04 spec copy ("Welcome back. Let's pick up your *momentum*." w/ italic emphasis); dev-facing GlassCard removed |
| design:F3 | major | Apple social pill had an empty-string glyph (blank badge vs Google's "G") | U+F8FF Apple logo glyph (iOS-only app) |
| design:F4 | major | S03b verify screen had no primary CTA (auto-submit only) | BtnPrimary "Verify code" (disabled until 4 digits; auto-submit retained) |
| design:F5 | minor | Canon §5 italic-emphasis moments missing on BalenciaScreen-based titles | `BalenciaScreen.title` accepts ReactNode; emphasis applied on S03 ("*Cia*") + S04 ("*momentum*") |
| a11y:A11Y-1 | blocker | GlassPillInput's TextInput had no accessible name | `accessibilityLabel={label}` forwarded |
| a11y:A11Y-2 | major | OTP hidden input unlabeled; decoy cells polluted the a11y tree | Hidden input labeled ("Verification code, N digits" + accessibilityValue); decorative cell row hidden (`no-hide-descendants` + `accessibilityElementsHidden`) |
| a11y:A11Y-3 | major | No screen-reader announcements anywhere (errors/toasts appear silently) | `AccessibilityInfo.announceForAccessibility` on OTP failure, forgot/reset errors, and every ToastBanner show + `accessibilityLiveRegion="polite"` on the banner |
| a11y:A11Y-4 | minor | Gender radios lacked a radiogroup container | `accessibilityRole="radiogroup"` + label on sign-up + complete-profile |
| code:F3 | minor | ADR-11 item 5 "live countdown" was dead code — client never read the HTTP `Retry-After` header (verifier: the server DOES send it via express-rate-limit standardHeaders) | `client.ts` parses `Retry-After` on 429 into `ApiError.retryAfterSeconds`; `forgot-normalize` prefers it; regression test added |

## Refuted (evidence recorded, no action)

- **code:F2** — concurrent-refresh CAS-loser revoking the shared session: the exact tradeoff accepted in amendment A5/R5 and covered by SP10 Case 9; mobile single-flight refresh prevents it in practice.
- **design:F6** — "silent" ComplianceFooter/ConnectsPreviewRow drop on S03: documented at build time in `packets/MP5.md` (§resolved deviations) — not silent. Follow-up noted: no ToS/Privacy document viewer exists anywhere in the auth flow yet (S03c labels only) — carried as a BIOS-010 trust-center candidate.

## Test-contract updates required by the fixes (fix-the-test-correctness, not deletions)
- `server/tests/unit/validators/auth.validator.test.ts`: "reject missing email" → replaced by 3 tests pinning the NEW contract (missing ok, empty-string normalized, malformed still rejected).
- `server/tests/unit/controllers/auth-cookies.test.ts`: earlier in Move E, suite updated for the session model (session.service stubbed; login asserts per-device issuance + no `users.refresh_token` write; Apple-without-idToken 401 case added).
- `mobile/src/features/auth/forgot-normalize.test.ts`: + Retry-After header precedence case.
