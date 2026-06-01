# Batch 01 - Auth Entry And Consent

- Status: `reviewed`
- Screens: 5
- Reviewed: 2026-05-25
- Prototype URL: `http://localhost:3001` (`3000` was already in use)
- Visual evidence: `/private/tmp/balencia-qa/*-phone.png`

| ID | Screen | Route | Spec | Status |
| --- | --- | --- | --- | --- |
| 01 | Splash screen | `/auth/splash` | `../app_design 3/01-splash-screen.md` | `reviewed` |
| 02 | Motion carousel | `/auth/carousel` | `../app_design 3/02-motion-carousel.md` | `reviewed` |
| 03 | Sign up | `/auth/sign-up` | `../app_design 3/03-welcome-sign-up.md` | `reviewed` |
| 03b | OTP verification | `/auth/otp` | `../app_design 3/03b-otp-verification.md` | `reviewed` |
| 03c | Consent | `/auth/consent` | `../app_design 3/03c-consent.md` | `reviewed` |

## Batch Focus

Validate first impressions, account creation friction, social auth quality, OTP clarity, and consent timing.

## Batch Summary

- Ship-ready: 01 Splash screen, with one minor brand hierarchy note.
- Must-fix: 02 Motion carousel, 03 Sign up, 03b OTP verification, 03c Consent.
- Redesign candidates: 03 Sign up should be simplified before launch; 03c Consent needs an explicit-consent state model.
- Resolved decisions:
  - DOB is not an account-creation legal gate; defer it until a clear health or personalization need.
  - Move first name into SIA onboarding and keep account creation minimal.
  - Track visual/UX acceptance separately from implementation; no-op controls are not design-audit blockers but remain production findings.

## Screen Notes

### 01 - Splash screen

- Five-second read: Premium Balencia brand moment with a dark field, orange glow, logo, and continuous stroke.
- Primary action clarity: Passive screen; no user action expected.
- Emotional tone: Warm, polished, calm.
- Screenshot: `/private/tmp/balencia-qa/auth-splash-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | A short brand-loading moment makes sense before first-run onboarding. |
| User friction | 5 | No task burden. |
| Visual appeal | 4 | Strong composition; logo treatment is clean. |
| Brand fit | 4 | Uses the full wordmark lockup instead of the spec's symbol-dominant reveal. |
| Mobile ergonomics | 5 | Fixed viewport, no unsafe collisions. |
| Accessibility | 4 | Includes screen-reader loading text; reduced-motion behavior was not visible in the route. |
| Trust/privacy | 5 | No sensitive ask. |
| Industry best practice | 4 | Feels like a polished cold-start screen; route-level auto-advance is not represented. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| minor | brand-fit | Live route uses `BrandWordmark width={196}` plus the stroke; the spec calls for a 72pt symbol as the dominant element, then wordmark confirmation. | The screen still feels premium, but the intended symbol-first reveal is softened. | Decide whether the lockup is intentional. If not, use the 72pt symbol as the hero, then reveal the wordmark after the stroke. | proposed |

Decision: Ship-ready with minor brand-fidelity follow-up.

### 02 - Motion carousel

- Five-second read: Clear value proposition and premium domain-system visual.
- Primary action clarity: The CTA is prominent, but the rendered controls are not wired.
- Emotional tone: Cinematic and on-brand.
- Screenshot: `/private/tmp/balencia-qa/auth-carousel-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | The pitch sequence belongs here and supports the first-run arc. |
| User friction | 2 | Button-based advancement and skip are not functional in the live route. |
| Visual appeal | 4 | The first panel is composed and distinctive. |
| Brand fit | 4 | Strong use of orange and domain colors; SIA/purple is appropriately contained. |
| Mobile ergonomics | 4 | Targets are large and reachable, but button flow is inert. |
| Accessibility | 3 | Spec requires Next as the swipe alternative; the rendered button does not advance. |
| Trust/privacy | 5 | No sensitive ask. |
| Industry best practice | 2 | Carousel cannot reliably be completed via standard CTA controls. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | navigation | `Skip` renders as a plain button with no handler, and each panel CTA is a `Button` without an `onClick`; the route relies on horizontal overflow rather than stateful Next/Get started navigation. | Users who tap Next, Get started, or Skip cannot progress to sign-up, and users who cannot swipe lose the required alternative. | Add carousel state: Next advances the current panel, Get started and Skip navigate to `/auth/sign-up`, and dots reflect the active panel. | proposed |

Decision: Must fix before launch.

### 03 - Sign up

- Five-second read: Functional premium auth form, but dense for a first account step.
- Primary action clarity: CTA is visible but disabled in the rendered first viewport.
- Emotional tone: Warm enough visually, higher-friction than Balencia's simplicity principle.
- Screenshot: `/private/tmp/balencia-qa/auth-sign-up-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 3 | Account creation belongs here, but sensitive profile fields compete with low-friction registration. |
| User friction | 2 | Six fields before value delivery is a lot for first-run auth. |
| Visual appeal | 4 | Strong spacing, dark surfaces, clear orange CTA hierarchy. |
| Brand fit | 4 | Mostly aligned with auth template. |
| Mobile ergonomics | 3 | Form is scrollable; first viewport hides lower escape/legal links on 812px phone frame. |
| Accessibility | 3 | Placeholder-led inputs and letter-only social marks need stronger accessible labeling/trust cues. |
| Trust/privacy | 2 | DOB and gender appear before a clear explanation of need. |
| Industry best practice | 2 | Best consumer onboarding usually minimizes pre-value form fields and uses recognizable social auth. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| major | onboarding-friction | Live screen asks for first name, last name, email, password, date of birth, and gender before the user reaches OTP or SIA. The design direction says age/gender are deferred from onboarding. | Extra sensitive fields increase abandonment and make Balencia feel like another form-heavy tracker before it proves value. | Reduce the first step to the minimum account creation inputs, then defer DOB/gender until the app can explain the value or legal requirement. | proposed |
| critical | conversion | The primary `Sign up` button is rendered with `disabled`, while DOB and gender inputs are `readOnly` with no picker/sheet behavior in the live route. | The prototype cannot complete the primary account-creation task from this screen. | Wire field validation, DOB picker, gender selector, and enabled submit behavior once required fields are valid. | proposed |
| major | trust-privacy | Social auth buttons show placeholder `G` and `A` letters rather than official Google/Apple marks. | Unofficial-looking OAuth controls can reduce trust at the exact moment users are deciding whether to create an account. | Use platform-compliant Google and Apple marks, with accessible provider labels and balanced button styling. | proposed |

Decision: Must fix; redesign candidate for lower-friction registration.

### 03b - OTP verification

- Five-second read: The screen says verify email, but it appears prefilled rather than ready for input.
- Primary action clarity: Verify is clear, but the primary task has already been completed by the mock state.
- Emotional tone: Calm and focused.
- Screenshot: `/private/tmp/balencia-qa/auth-otp-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | OTP confirmation belongs after sign-up. |
| User friction | 2 | Static prefilled digits prevent assessing entry friction. |
| Visual appeal | 4 | Good focus and spacing. |
| Brand fit | 4 | Auth styling is consistent. |
| Mobile ergonomics | 3 | Visual target sizes are good, but there are no actual input targets. |
| Accessibility | 2 | OTP boxes are rendered as non-input divs; screen-reader/code-entry behavior is missing. |
| Trust/privacy | 4 | Masked email pattern is appropriate. |
| Industry best practice | 2 | OTP should support numeric keyboard, paste, backspace, resend, and disabled verify states. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | conversion | The code is hardcoded as `['4', '7', '2', '9']`, rendered in `div` boxes, and `Verify` is enabled; the resend button is also statically disabled. | Users cannot enter, paste, correct, resend, or verify their own OTP, blocking the registration task. | Render four empty numeric inputs with auto-focus, paste/backspace handling, disabled Verify until complete, and a real resend countdown state. | proposed |

Decision: Must fix before launch.

### 03c - Consent

- Five-second read: Clear legal pause, but it shows the user has already accepted required consents.
- Primary action clarity: Continue is obvious, but it is enabled before explicit consent.
- Emotional tone: Visually premium; trust model needs correction.
- Screenshot: `/private/tmp/balencia-qa/auth-consent-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | A consent gate after account creation is appropriate. |
| User friction | 3 | Simple layout, but consent state is not user-controlled. |
| Visual appeal | 4 | Clean grouping and strong CTA hierarchy. |
| Brand fit | 4 | Warm dark auth styling matches the system. |
| Mobile ergonomics | 4 | Fits comfortably and touch areas are mostly reachable. |
| Accessibility | 3 | Checkbox/toggle semantics exist, but required checkboxes are read-only and visual boxes are only 22px. |
| Trust/privacy | 1 | Required legal consent is pre-checked. |
| Industry best practice | 1 | Required legal consent must be explicit, reviewable, and gating. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | trust-privacy | Required Terms and Privacy rows are passed `checked`, checkbox inputs are `readOnly`, and `Continue` is enabled on first render. | This reads as pre-consent and creates a serious trust/compliance risk. | Default both required checkboxes to unchecked, make them user-controlled, and disable Continue until both are checked. | proposed |
| major | trust-privacy | Terms and Privacy links route to same-screen anchors, and the required checkbox label is only a 22px visual control rather than the 44px row behavior described by the spec. | Users cannot meaningfully review policies before accepting, and touch/focus behavior is less mobile-native. | Link to real in-app policy views and make the full non-link row a 44px checkbox toggle while preserving independent legal links. | proposed |

Decision: Must fix before launch.
