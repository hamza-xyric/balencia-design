# R02 - Profile And Account Recovery

- Status: `reviewed`
- Reviewed: 2026-05-27
- Prototype URL: `http://localhost:3000`
- Screens: `03d`, `03e`, `04`, `05`, `05b`
- Routes: `/auth/complete-profile`, `/auth/whatsapp`, `/auth/sign-in`, `/auth/forgot-password`, `/auth/reset-password`
- Sources: `../batches/batch-02.md`, `../update-batches/batch-u01.md`, `../screen-iteration-batches/P02-profile-recovery.md`
- Evidence directory: `../../balencia-screens/output/a-plus-plus-review/R02/`
- Interaction evidence summary: `../../balencia-screens/output/a-plus-plus-review/R02/r02-interaction-evidence-summary.md`
- Build gate: no
- Finding IDs: `R02-F01+`

## Focus

Validate optional profile completion, WhatsApp trust, sign-in, recovery, and reset flows. A++ requires clear user value, sensitive-data restraint, recovery confidence, and no misleading disabled or static controls.

## Required Review Output

- Fresh evidence for every route.
- Five-second read, primary action clarity, emotional tone, control inventory, rubric scores, A++ grade, findings, and decision for every screen.
- `npm run check` result before close.

## Batch Summary

- A++: 03d Complete profile, 05 Forgot password, 05b Reset password.
- A+: 03e WhatsApp enrollment.
- A: 04 Sign in.
- Needs polish: 03e resend countdown behavior before A++.
- Must fix before A+ / A++: 04 biometric sign-in control is enabled but has no behavior.
- Redesign candidates: none.
- User decisions: none.
- Verification: `npm run check` passed on 2026-05-27; R02 build gate is not required.
- Console/runtime: interaction capture recorded no error-level console output or page errors. Dev-mode output was limited to React DevTools/HMR logs and Chromium verbose password-field form notices.

## Screen Notes

### 03d - Complete profile

- Five-second read: A low-pressure optional profile details screen that clearly says age and gender can be added later with context.
- Screen purpose and journey fit: Fits the resolved P02 decision to avoid blocking first SIA value with DOB/gender while still offering an optional personalization path before Consent.
- Primary action clarity: `Continue` is clear; leaving both fields blank routes to Consent, while entered details are validated before progress.
- Emotional tone: Respectful, warm, and privacy-aware.
- Screenshot: `../../balencia-screens/output/a-plus-plus-review/R02/03d-auth-complete-profile-phone.png`
- State evidence: `../../balencia-screens/output/a-plus-plus-review/R02/03d-complete-profile-fresh-initial.png`, `../../balencia-screens/output/a-plus-plus-review/R02/03d-complete-profile-underage-validation.png`, `../../balencia-screens/output/a-plus-plus-review/R02/03d-complete-profile-empty-continue-consent.png`, `../../balencia-screens/output/a-plus-plus-review/R02/03d-complete-profile-skip-consent.png`
- Grade: A++
- Grade cap: none.
- Control inventory: Date of birth input is optional and validates 18+ if used; Gender select is optional and paired with DOB if used; `Continue` routes blank or valid optional details to Consent and shows validation for unsafe partial/underage details; `Skip for now` routes to Consent.

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | The screen now supports optional personalization instead of recreating the old sensitive-data gate. |
| User friction | 5 | Users can proceed immediately, skip explicitly, or provide details if they choose. |
| Visual appeal | 5 | The layout is calm, premium, and balanced inside the auth template. |
| Brand fit | 5 | SIA copy is restrained and the orange CTA remains the only dominant action. |
| Mobile ergonomics | 5 | Fields and buttons are 44px-safe with no overlap or small-target flags. |
| Accessibility | 5 | Inputs expose clear labels/placeholders and validation text appears near the relevant field. |
| Trust/privacy | 5 | Sensitive age/gender details are framed as optional and contextual. |
| Industry best practice | 5 | Matches progressive-profile best practice for social-auth follow-up. |

| Finding ID | Severity | Category | Evidence | User Impact | Recommendation | Status | Grade cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| none | none | none | Fresh baseline and interaction evidence show working optional submit, skip, and underage validation with no error-level console output. | No user-facing issue found. | No change needed for Figma handoff. | accepted | none |

Decision: A++ / Figma-ready.

### 03e - WhatsApp enrollment

- Five-second read: Optional WhatsApp setup with clear benefit, frequency, STOP opt-out, Settings recovery, phone entry, verification, and skip.
- Screen purpose and journey fit: Strong optional channel bridge after consent; it supports proactive SIA reminders without making WhatsApp a gate.
- Primary action clarity: `Send code` is disabled until a valid phone number, then opens a six-digit verification state; `Verify` is disabled until complete.
- Emotional tone: Helpful and low-pressure.
- Screenshot: `../../balencia-screens/output/a-plus-plus-review/R02/03e-auth-whatsapp-phone.png`
- State evidence: `../../balencia-screens/output/a-plus-plus-review/R02/03e-whatsapp-phone-filled.png`, `../../balencia-screens/output/a-plus-plus-review/R02/03e-whatsapp-verify-empty.png`, `../../balencia-screens/output/a-plus-plus-review/R02/03e-whatsapp-resend-ready-after-countdown-click.png`, `../../balencia-screens/output/a-plus-plus-review/R02/03e-whatsapp-code-filled.png`, `../../balencia-screens/output/a-plus-plus-review/R02/03e-whatsapp-verify-sia-onboarding.png`, `../../balencia-screens/output/a-plus-plus-review/R02/03e-whatsapp-skip-sia-onboarding.png`
- Grade: A+
- Grade cap: minor interaction-state finding R02-F01 prevents A++.
- Control inventory: `Skip` routes to SIA onboarding; Country code select changes dialing prefix; Phone number input enables `Send code` after 7+ digits; `Send code` opens verification; Back chevron returns to phone entry; six code fields collect one digit each; `Verify` routes to SIA onboarding once complete; `Resend code` gives feedback, but the countdown state is currently actionable before the timer completes.

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | Optional WhatsApp coaching is framed as a value-add and not a required gate. |
| User friction | 5 | Skip, phone entry, verification, and phase-back paths are all reachable. |
| Visual appeal | 5 | Hierarchy, spacing, and trust copy are composed and premium. |
| Brand fit | 5 | Orange remains primary and SIA is introduced through value rather than hype. |
| Mobile ergonomics | 5 | Phone, code, skip, back, and CTA targets are comfortable. |
| Accessibility | 5 | Inputs and code digits have clear accessible labels and disabled CTA states. |
| Trust/privacy | 4 | Frequency, STOP, and Settings copy are strong; resend cooldown behavior needs to match the displayed promise. |
| Industry best practice | 4 | The main two-phase enrollment works, but resend cooldown state is not yet honest enough for A++. |

| Finding ID | Severity | Category | Evidence | User Impact | Recommendation | Status | Grade cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R02-F01 | minor | interaction-state | In `03e-whatsapp-verify-empty.png`, `Resend code (0:47)` appears as a cooldown state. Clicking it immediately changes the UI to active `Resend code` in `03e-whatsapp-resend-ready-after-countdown-click.png`; the implementation at `balencia-screens/src/app/auth/whatsapp/page.tsx:141`-`157` keeps the countdown as an enabled button. | Users can bypass the implied cooldown, and Figma could inherit an unclear disabled/available resend contract. | Make the countdown state honestly disabled until the timer completes, then switch to an active orange `Resend code`; keep `Code sent` feedback after a real resend. | proposed | Prevents A++ |

Decision: needs polish.

### 04 - Sign in

- Five-second read: A polished returning-user sign-in screen with email/password, recovery, persistence, social auth, biometrics, and sign-up fallback.
- Screen purpose and journey fit: Correct returning-user route; credential, recovery, and social routes now work, but the biometric shortcut is not wired.
- Primary action clarity: `Sign in` is honestly disabled until valid credentials, then routes to Today.
- Emotional tone: Familiar, premium, and welcoming.
- Screenshot: `../../balencia-screens/output/a-plus-plus-review/R02/04-auth-sign-in-phone.png`
- State evidence: `../../balencia-screens/output/a-plus-plus-review/R02/04-sign-in-fresh-initial.png`, `../../balencia-screens/output/a-plus-plus-review/R02/04-sign-in-biometric-click-no-change.png`, `../../balencia-screens/output/a-plus-plus-review/R02/04-sign-in-remember-on.png`, `../../balencia-screens/output/a-plus-plus-review/R02/04-sign-in-valid-filled.png`, `../../balencia-screens/output/a-plus-plus-review/R02/04-sign-in-submit-today.png`, `../../balencia-screens/output/a-plus-plus-review/R02/04-sign-in-forgot-password-navigation.png`, `../../balencia-screens/output/a-plus-plus-review/R02/04-sign-in-google-today.png`
- Grade: A
- Grade cap: major visible-control finding R02-F02 prevents A+ and A++.
- Control inventory: Back routes to Sign up; Email and Password collect credentials; Show password toggles password visibility; Forgot password routes to recovery; Remember me toggles `aria-checked` and visible switch state; `Sign in` is disabled until valid credentials and routes to Today; Google and Apple route to Today as social-auth prototype exits; biometric button is visible and enabled but does not change state, navigate, open a prompt, or show an unavailable state; Sign up link provides a fallback after scrolling.

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | Returning-user sign-in belongs here and the core auth paths are present. |
| User friction | 4 | Credential, recovery, and social paths are low-friction, but the biometric shortcut wastes a tap. |
| Visual appeal | 5 | The screen is visually polished and consistent with the auth system. |
| Brand fit | 5 | Warm dark styling, official-looking provider marks, and orange action hierarchy fit Balencia. |
| Mobile ergonomics | 4 | Main controls are touch-safe; the lower fallback link requires scroll on the captured phone state. |
| Accessibility | 5 | Core controls have labels, switch semantics, and disabled states. |
| Trust/privacy | 4 | Remember me defaults off, but a nonfunctional biometric auth affordance weakens trust at a sensitive moment. |
| Industry best practice | 4 | Core sign-in standards are met; enabled biometric controls must either work or be withheld. |

| Finding ID | Severity | Category | Evidence | User Impact | Recommendation | Status | Grade cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R02-F02 | major | conversion | `04-sign-in-fresh-initial.png` shows an enabled fingerprint button. Clicking it leaves the screen unchanged in `04-sign-in-biometric-click-no-change.png`; the route implementation renders the button without an `onClick` at `balencia-screens/src/app/auth/sign-in/page.tsx:127`-`133`. | Returning users who choose the fastest re-entry path get no feedback or progress, which can make auth feel broken. | Wire the biometric control to the intended native prompt/prototype state, or remove/disable it with a clear unavailable state until biometric auth is supported. | proposed | Prevents A+ / A++ |

Decision: needs polish.

### 05 - Forgot password

- Five-second read: A focused password recovery utility with one email field, disabled submit until valid input, masked confirmation, resend feedback, and return to sign-in.
- Screen purpose and journey fit: Exactly the right single-purpose recovery screen from Sign in.
- Primary action clarity: `Send reset link` becomes active only after a valid email and swaps to a reassuring confirmation state.
- Emotional tone: Calm, supportive, and appropriately sparse.
- Screenshot: `../../balencia-screens/output/a-plus-plus-review/R02/05-auth-forgot-password-phone.png`
- State evidence: `../../balencia-screens/output/a-plus-plus-review/R02/05-forgot-password-email-filled.png`, `../../balencia-screens/output/a-plus-plus-review/R02/05-forgot-password-confirmation.png`, `../../balencia-screens/output/a-plus-plus-review/R02/05-forgot-password-resend-sent.png`, `../../balencia-screens/output/a-plus-plus-review/R02/05-forgot-password-back-to-sign-in.png`
- Grade: A++
- Grade cap: none.
- Control inventory: Back routes to Sign in; Email field collects reset email; `Send reset link` is honestly disabled until email is valid; confirmation `Back to sign in` routes to Sign in; resend button shows `Sent` feedback.

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | Single-purpose recovery belongs here and avoids extra friction. |
| User friction | 5 | One field, clear disabled state, masked confirmation, resend, and return path cover the task. |
| Visual appeal | 5 | The default and success states are clean and reassuring. |
| Brand fit | 5 | Orange CTA and green success use the brand system correctly. |
| Mobile ergonomics | 5 | Controls are reachable, large, and free of overlap. |
| Accessibility | 5 | Back, input, CTA, and success state are labeled clearly. |
| Trust/privacy | 5 | Confirmation masks the email while confirming the action. |
| Industry best practice | 5 | Meets expected password reset request, confirmation, resend, and return behaviors. |

| Finding ID | Severity | Category | Evidence | User Impact | Recommendation | Status | Grade cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| none | none | none | Fresh evidence shows valid-email gating, masked confirmation, resend feedback, return navigation, and no error-level console output. | No user-facing issue found. | No change needed for Figma handoff. | accepted | none |

Decision: A++ / Figma-ready.

### 05b - Reset password

- Five-second read: A clear deep-link reset form with live requirements, mismatch validation, success, and expired-link recovery.
- Screen purpose and journey fit: Correct account-recovery destination after email reset links, with both success and expired-token states represented.
- Primary action clarity: `Reset password` is disabled until requirements are met and passwords match, then switches to success.
- Emotional tone: Functional, safe, and confident.
- Screenshot: `../../balencia-screens/output/a-plus-plus-review/R02/05b-auth-reset-password-phone.png`
- State evidence: `../../balencia-screens/output/a-plus-plus-review/R02/05b-reset-password-mismatch.png`, `../../balencia-screens/output/a-plus-plus-review/R02/05b-reset-password-valid.png`, `../../balencia-screens/output/a-plus-plus-review/R02/05b-reset-password-success.png`, `../../balencia-screens/output/a-plus-plus-review/R02/05b-reset-password-expired.png`, `../../balencia-screens/output/a-plus-plus-review/R02/05b-reset-password-request-new-link.png`
- Grade: A++
- Grade cap: none.
- Control inventory: New password field collects and drives requirement states; Show password toggles visibility; Confirm password validates matching and exposes mismatch text; requirements checklist updates live; `Reset password` is honestly disabled until valid; success `Back to sign in` routes to Sign in; expired `Request new link` routes to Forgot password; expired `Back to sign in` routes to Sign in.

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | Deep-linked reset and expired-link recovery are both present and understandable. |
| User friction | 5 | Requirements, mismatch validation, enabled submit, and recovery exits are all direct. |
| Visual appeal | 5 | Default, error, success, and expired states are composed and polished. |
| Brand fit | 5 | Orange action, green success, and amber warning are used meaningfully. |
| Mobile ergonomics | 5 | Fields, visibility controls, checklist, and CTAs are touch-safe and readable. |
| Accessibility | 5 | Inputs, buttons, requirement labels, and status icons have clear semantics/copy. |
| Trust/privacy | 5 | Token-expired copy and password rules set clear expectations without overexposure. |
| Industry best practice | 5 | Covers reset validation, success, expired-link handling, and return paths. |

| Finding ID | Severity | Category | Evidence | User Impact | Recommendation | Status | Grade cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| none | none | none | Fresh evidence shows disabled initial CTA, mismatch error, valid success, expired-link recovery, navigation, and no error-level console output. | No user-facing issue found. | No change needed for Figma handoff. | accepted | none |

Decision: A++ / Figma-ready.
