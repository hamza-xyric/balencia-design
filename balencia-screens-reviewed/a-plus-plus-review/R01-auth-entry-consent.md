# R01 - Auth Entry And Consent

- Status: `reviewed`
- Reviewed: 2026-05-27
- Prototype URL: `http://localhost:3000`
- Screens: `01`, `02`, `03`, `03b`, `03c`
- Routes: `/auth/splash`, `/auth/carousel`, `/auth/sign-up`, `/auth/otp`, `/auth/consent`
- Sources: `../batches/batch-01.md`, `../update-batches/batch-u01.md`, `../screen-iteration-batches/P01-auth-entry-consent.md`
- Evidence directory: `../../balencia-screens/output/a-plus-plus-review/R01/`
- Build gate: no
- Finding IDs: `R01-F01+`

## Focus

Validate the first brand impression, onboarding value pitch, account creation, OTP, and consent as Figma-ready screens. A++ requires low-friction entry, trustworthy auth controls, explicit consent, and no ambiguous tappable elements.

## Required Review Output

- Fresh evidence for every route.
- Five-second read, primary action clarity, emotional tone, control inventory, rubric scores, A++ grade, findings, and decision for every screen.
- `npm run check` result before close.

## Batch Summary

- A++: 01 Splash screen, 02 Motion carousel, 03b OTP verification, 03c Consent.
- A+: 03 Sign up.
- Needs polish: 03 Sign up legal-footer readability before A++.
- Redesign candidates: none.
- User decisions: none.
- Verification: `npm run check` passed on 2026-05-27 before close; R01 build gate is not required.
- State evidence: `../../balencia-screens/output/a-plus-plus-review/R01/states/r01-state-capture.json` recorded carousel, sign-up, OTP, and consent progression with zero console errors.

## Screen Notes

### 01 - Splash screen

- Five-second read: A premium, calm Balencia brand moment with symbol-first focus, warm glow, and continuous-stroke motion.
- Primary action clarity: Passive screen; no user action is expected.
- Emotional tone: Warm, quiet, polished.
- Screenshot: `../../balencia-screens/output/a-plus-plus-review/R01/01-auth-splash-phone.png`
- Grade: A++
- Grade cap: none.
- Control inventory: no visible controls; screen is intentionally passive.

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | A short brand-loading moment belongs before first-run onboarding. |
| User friction | 5 | No task burden. |
| Visual appeal | 5 | Symbol, glow, and stroke are composed and premium. |
| Brand fit | 5 | Symbol-first treatment now matches the intended Balencia brand hierarchy. |
| Mobile ergonomics | 5 | No unsafe collisions or interactive target needs. |
| Accessibility | 5 | Includes screen-reader loading text and no blocked task. |
| Trust/privacy | 5 | No sensitive ask. |
| Industry best practice | 5 | Strong cold-start brand moment; transition behavior is documented in the spec. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| none | none | Fresh evidence shows no controls, console errors, target issues, or overlap flags. | No user-facing issue found. | No change needed for Figma handoff. | accepted |

Decision: A++ / Figma-ready.

### 02 - Motion carousel

- Five-second read: Clear first-run value pitch: Balencia connects life domains rather than treating them as modules.
- Primary action clarity: `Next` advances panels; final `Get started` exits to sign-up; `Skip` provides an escape hatch.
- Emotional tone: Cinematic, energetic, and still controlled.
- Screenshot: `../../balencia-screens/output/a-plus-plus-review/R01/02-auth-carousel-phone.png`
- State evidence: `../../balencia-screens/output/a-plus-plus-review/R01/states/02-carousel-final-panel.png`
- Grade: A++
- Grade cap: none.
- Control inventory: `Skip` routes to sign-up; `Next carousel panel` advances until the final panel; `Get started` routes to sign-up; pagination dots are decorative position indicators.

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | The carousel establishes Balencia's connected-life thesis before account creation. |
| User friction | 5 | Users can advance, skip, or start without unnecessary fields. |
| Visual appeal | 5 | Domain nodes, motion graphics, and CTA hierarchy feel premium. |
| Brand fit | 5 | Orange leads the action system; domain colors support without overwhelming. |
| Mobile ergonomics | 5 | Controls are reachable, 44px-safe, and visually stable. |
| Accessibility | 5 | Button labels are clear; nonessential dots are decorative. |
| Trust/privacy | 5 | No sensitive ask. |
| Industry best practice | 5 | Meets expected onboarding patterns while differentiating with Balencia's domain system. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| none | none | Initial and final-panel evidence show working progression with no console errors, small-target flags, nested controls, or overlaps. | No user-facing issue found. | No change needed for Figma handoff. | accepted |

Decision: A++ / Figma-ready.

### 03 - Sign up

- Five-second read: A minimal, premium account-creation form with email/password first and secondary social/guest paths.
- Primary action clarity: `Sign up` is disabled until valid email and password, then routes to OTP.
- Emotional tone: Warm and focused, with less friction than the first audit.
- Screenshot: `../../balencia-screens/output/a-plus-plus-review/R01/03-auth-sign-up-phone.png`
- State evidence: `../../balencia-screens/output/a-plus-plus-review/R01/states/03-sign-up-valid.png`, `../../balencia-screens/output/a-plus-plus-review/R01/states/03-sign-up-submit-to-otp.png`
- Grade: A+
- Grade cap: minor accessibility/readability finding R01-F01.
- Control inventory: email field collects account email; password field and show/hide button support credential entry; disabled/enabled `Sign up` gates submission; Google and Apple create social-auth paths; `Sign in`, `Guest mode`, Terms, and Privacy links provide expected alternatives.

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | Account creation is minimal and correctly placed before OTP/consent. |
| User friction | 5 | Only email and password are required before value delivery. |
| Visual appeal | 5 | Strong hierarchy, clean field treatment, and polished provider buttons. |
| Brand fit | 5 | Auth styling, orange CTA, and restrained brand mark are aligned. |
| Mobile ergonomics | 5 | All captured controls meet practical touch target expectations. |
| Accessibility | 4 | Legal footer links are small and low-contrast relative to the rest of the screen. |
| Trust/privacy | 5 | Sensitive DOB/gender asks are removed; legal links are present. |
| Industry best practice | 5 | Matches modern low-friction auth expectations. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| minor | accessibility | Screenshot shows `Terms of service / Privacy policy` at 12px and white/30 near the bottom, making legal links much less readable than other auth options. | Users with low vision or screen glare may miss legal routes before account creation. | Raise footer link contrast to at least the secondary text level and consider separating the links slightly while preserving low visual priority. | proposed |

Decision: A+ / needs minor polish before A++.

### 03b - OTP verification

- Five-second read: Clear email-verification task with four focused digit boxes and one dominant Verify action.
- Primary action clarity: `Verify` is disabled until all four digits are entered; completed state routes to Consent.
- Emotional tone: Calm, quick, and confidence-building.
- Screenshot: `../../balencia-screens/output/a-plus-plus-review/R01/03b-auth-otp-phone.png`
- State evidence: `../../balencia-screens/output/a-plus-plus-review/R01/states/03b-otp-complete.png`, `../../balencia-screens/output/a-plus-plus-review/R01/states/03b-otp-submit-to-consent.png`
- Grade: A++
- Grade cap: none.
- Control inventory: Back returns to sign-up; four numeric inputs collect the code with focus progression; resend is honestly disabled during cooldown; Verify submits only when complete.

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | OTP verification is the right next step after sign-up. |
| User friction | 5 | Four large inputs, auto-focus, paste/backspace support, and gated submit reduce friction. |
| Visual appeal | 5 | Focus state, spacing, and CTA treatment are composed. |
| Brand fit | 5 | Auth template and orange action hierarchy are consistent. |
| Mobile ergonomics | 5 | Digit boxes and buttons are reachable and touch-safe. |
| Accessibility | 5 | Inputs have descriptive labels and numeric input mode. |
| Trust/privacy | 5 | Masked email gives enough confirmation without overexposing data. |
| Industry best practice | 5 | Meets standard OTP expectations for entry, paste, resend, and disabled state. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| none | none | Initial and completed evidence show working code entry, gated verify, and no console errors or layout flags. | No user-facing issue found. | No change needed for Figma handoff. | accepted |

Decision: A++ / Figma-ready.

### 03c - Consent

- Five-second read: A clear consent pause with required legal acceptance and optional email updates separated honestly.
- Primary action clarity: `Continue` is disabled until both required consents are accepted, then routes to WhatsApp enrollment.
- Emotional tone: Respectful and trustworthy.
- Screenshot: `../../balencia-screens/output/a-plus-plus-review/R01/03c-auth-consent-phone.png`
- State evidence: `../../balencia-screens/output/a-plus-plus-review/R01/states/03c-consent-accepted.png`, `../../balencia-screens/output/a-plus-plus-review/R01/states/03c-consent-continue-to-whatsapp.png`
- Grade: A++
- Grade cap: none.
- Control inventory: required Terms row toggles consent and keeps an independent legal link; required Privacy row does the same; optional email switch is off by default; Continue is honestly disabled until required consent is complete.

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | Legal consent belongs here before SIA onboarding. |
| User friction | 5 | Only required policies gate progress; optional marketing is clearly separate. |
| Visual appeal | 5 | Consent cards are calm, readable, and visually grouped. |
| Brand fit | 5 | Warm dark surfaces and orange legal/action emphasis fit the auth system. |
| Mobile ergonomics | 5 | Visible rows and links are large enough; automated 1x1 input flags are hidden semantic inputs inside full rows. |
| Accessibility | 5 | Checkbox and switch semantics are present, with independent policy links. |
| Trust/privacy | 5 | Required and optional consents are not preselected and are clearly labeled. |
| Industry best practice | 5 | Meets explicit-consent and non-dark-pattern expectations. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| none | none | Initial and accepted evidence show unchecked defaults, independent legal links, disabled/enabled Continue behavior, and zero targeted-flow console errors. | No user-facing issue found. | No change needed for Figma handoff. | accepted |

Decision: A++ / Figma-ready.
