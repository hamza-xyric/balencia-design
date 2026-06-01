# Update Batch U01 - Auth entry, consent, and account recovery

- Status: `prototype-implemented`
- Updated: 2026-05-26
- Scope: 10 `app_design 3` screen-spec files
- Prototype scope: implemented in `balencia-screens`
- Audit sources: `batch-01.md`, `batch-02.md` plus `findings-ledger.md` and `deferred-decisions.md`

## Screen Specs

| ID | Screen | Spec | Route | Findings | Audit refs | Status |
| --- | --- | --- | --- | --- | --- | --- |
| 01 | Splash screen | `01-splash-screen.md` | `/auth/splash` | 1 (0 critical, 0 major, 1 minor) | B01 | deferred-minor |
| 02 | Motion carousel | `02-motion-carousel.md` | `/auth/carousel` | 1 (1 critical, 0 major, 0 minor) | B01 | implemented |
| 03 | Sign up | `03-welcome-sign-up.md` | `/auth/sign-up` | 3 (1 critical, 2 major, 0 minor) | B01 | implemented |
| 03b | OTP verification | `03b-otp-verification.md` | `/auth/otp` | 1 (1 critical, 0 major, 0 minor) | B01 | implemented |
| 03c | Consent | `03c-consent.md` | `/auth/consent` | 2 (1 critical, 1 major, 0 minor) | B01 | implemented |
| 03d | Complete profile | `03d-complete-profile.md` | `/auth/complete-profile` | 2 (1 critical, 1 major, 0 minor) | B02 | implemented |
| 03e | WhatsApp enrollment | `03e-whatsapp-enrollment.md` | `/auth/whatsapp` | 2 (1 critical, 1 major, 0 minor) | B02 | implemented |
| 04 | Sign in | `04-sign-in.md` | `/auth/sign-in` | 3 (1 critical, 2 major, 0 minor) | B02 | implemented |
| 05 | Forgot password | `05-forgot-password.md` | `/auth/forgot-password` | 2 (1 critical, 0 major, 1 minor) | B02 | implemented |
| 05b | Reset password | `05b-reset-password.md` | `/auth/reset-password` | 1 (1 critical, 0 major, 0 minor) | B02 | implemented |

## Completion Note

Spec integration was completed first. This pass implemented the matching `balencia-screens` prototype routes for U01 and preserved the existing Balencia auth visual system.

- `01-splash-screen.md`
- `02-motion-carousel.md`
- `03-welcome-sign-up.md`
- `03b-otp-verification.md`
- `03c-consent.md`
- `03d-complete-profile.md`
- `03e-whatsapp-enrollment.md`
- `04-sign-in.md`
- `05-forgot-password.md`
- `05b-reset-password.md`

## Prototype Implementation

Changed prototype files:

- `balencia-screens/src/app/auth/carousel/page.tsx`
- `balencia-screens/src/app/auth/sign-up/page.tsx`
- `balencia-screens/src/app/auth/otp/page.tsx`
- `balencia-screens/src/app/auth/consent/page.tsx`
- `balencia-screens/src/app/auth/complete-profile/page.tsx`
- `balencia-screens/src/app/auth/whatsapp/page.tsx`
- `balencia-screens/src/app/auth/sign-in/page.tsx`
- `balencia-screens/src/app/auth/forgot-password/page.tsx`
- `balencia-screens/src/app/auth/reset-password/page.tsx`
- `balencia-screens/src/components/design-system/SocialAuthButton.tsx`

Implemented behavior:

- Motion carousel now has stateful Next/Get started behavior, active dots, and Skip navigation to Sign up.
- Sign up is reduced to minimal email/password account creation, with validation-gated submit and official-looking Google/Apple provider marks.
- OTP uses empty numeric inputs with completion-gated Verify, paste/backspace support, resend state, and Consent navigation.
- Consent required checkboxes default unchecked, are user-controlled, expose checkbox semantics, use policy links, and gate Continue until both are accepted.
- Complete profile no longer blocks social-auth users with DOB/gender before first SIA value; sensitive profile details are optional with a Skip path.
- WhatsApp enrollment now has real phone input, country code selection, explicit optionality/frequency/STOP/settings trust copy, send-code phase, 6-digit verification, resend state, skip navigation, and SIA onboarding exit.
- Sign in validates email/password, defaults Remember me off, supports explicit persistence choice, and routes successful sign-in/social sign-in to Today.
- Forgot password validates email, shows masked-email confirmation, supports resend feedback, and returns to Sign in.
- Reset password has live requirements, matching validation, enabled submit, success state, and expired-link fixture via `?state=expired`.

Findings addressed:

- B01-F02, B01-F03, B01-F04, B01-F05, B01-F06, B01-F07, B01-F08
- B02-F01, B02-F02, B02-F03, B02-F04, B02-F05, B02-F06, B02-F07, B02-F08, B02-F09, B02-F10

Findings deferred:

- B01-F01 splash symbol-first reveal remains deferred as minor brand-fidelity polish; the existing splash route was already ship-ready in audit and was not part of the critical auth conversion/trust implementation pass.

Verification results:

- `npx eslint` on all touched U01 auth files and `SocialAuthButton.tsx`: passed.
- `npm run check`: superseded by P00 foundation verification on 2026-05-26; full repo check now passes.
- `npm run build`: superseded by P00 foundation verification on 2026-05-26; production build now passes after the reset-password Suspense fix.
- Browser QA: historical U01 browser checks verified Sign up, OTP, Consent, Reset password, Carousel state, and Sign up route transition. Full auth traversal is scheduled for P01/P02.

## Accepted Recommendation Themes

- accessibility
- brand-fit
- conversion
- navigation
- onboarding-friction
- trust-privacy

## Resolved Decisions Applied

- Q06 minimal auth: remove DOB as account-creation legal gate.
- Q07 social auth profile completion must not block first SIA value.
- Q08 move first-name collection into SIA onboarding.
- Q09 WhatsApp is optional coaching/reminder opt-in with STOP/settings controls.

## Deferred Questions

- None open for this batch. Previously deferred product decisions are resolved in `../findings/deferred-decisions.md`.

## Prototype Implications

- Prototype implementation is complete for the U01 critical and major auth findings, with the minor splash brand-fidelity item intentionally deferred.
- P00 cleared the repo-wide check/build blockers. P01/P02 now own end-to-end browser traversal across Carousel -> Sign up -> OTP -> Consent -> WhatsApp -> SIA onboarding plus Sign in and recovery flows.
