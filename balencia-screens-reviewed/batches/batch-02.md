# Batch 02 - Profile And Account Recovery

- Status: `reviewed`
- Screens: 5
- Reviewed: 2026-05-26
- Prototype URL: `http://localhost:3001` (`3000` was already in use)
- Visual evidence: `/private/tmp/balencia-b02-b03-focused/*-phone.png`

| ID | Screen | Route | Spec | Status |
| --- | --- | --- | --- | --- |
| 03d | Complete profile | `/auth/complete-profile` | `../app_design 3/03d-complete-profile.md` | `reviewed` |
| 03e | WhatsApp enrollment | `/auth/whatsapp` | `../app_design 3/03e-whatsapp-enrollment.md` | `reviewed` |
| 04 | Sign in | `/auth/sign-in` | `../app_design 3/04-sign-in.md` | `reviewed` |
| 05 | Forgot password | `/auth/forgot-password` | `../app_design 3/05-forgot-password.md` | `reviewed` |
| 05b | Reset password | `/auth/reset-password` | `../app_design 3/05b-reset-password.md` | `reviewed` |

## Batch Focus

Validate progressive profile asks, notification enrollment trust, returning-user ease, and recovery flow clarity.

## Batch Summary

- Ship-ready: None.
- Must-fix: 03d Complete profile, 03e WhatsApp enrollment, 04 Sign in, 05 Forgot password, 05b Reset password.
- Redesign candidates: 03d should defer DOB/gender until a contextual health or personalization moment; 03e needs opt-in and channel-trust framing before implementation, but the structure can remain lightweight.
- Resolved decisions:
  - DOB and gender should not block social-auth users before SIA; collect them later with context.
  - WhatsApp is optional coaching and reminder delivery with explicit opt-in, message types, approximate frequency, STOP opt-out, country code support, and a Settings disable path.
  - Track static no-op controls as production findings while keeping design-audit acceptance focused on visual quality and UX flow.

## Screen Notes

### 03d - Complete profile

- Five-second read: A brief follow-up profile step asking for date of birth and gender after social auth.
- Primary action clarity: The orange Continue CTA is clear, but the fields look already completed and cannot be edited.
- Emotional tone: Warm and concise; the SIA note softens the sensitive data ask.
- Screenshot: `/private/tmp/balencia-b02-b03-focused/auth-complete-profile-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | The screen belongs after incomplete OAuth if DOB/gender are truly required for age gating or health coaching. |
| User friction | 2 | The task is short, but the live controls do not let the user provide or change the requested data. |
| Visual appeal | 4 | The auth composition is clean, focused, and aligned with the Batch 01 auth template. |
| Brand fit | 4 | Dark-first, warm, and restrained; SIA is present without becoming a second task. |
| Mobile ergonomics | 4 | Field and CTA sizes are comfortable in the 375px phone frame. |
| Accessibility | 3 | Placeholder-led fields and read-only controls weaken form semantics. |
| Trust/privacy | 3 | The screen explains personalization, but not the stronger reason for DOB/gender at this exact step. |
| Industry best practice | 2 | A required profile-completion gate must have editable, validated controls and a working submit path. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | conversion | Live DOB and gender fields render as read-only, prefilled values (`15 March 1995`, `Female`), and clicking `Continue` leaves `/auth/complete-profile` unchanged. | Social-auth users cannot complete the missing profile data this screen exists to collect. | Render empty editable DOB and gender controls, open the date picker / selector, validate age, and navigate to Consent after valid submit. | proposed |
| major | trust-privacy | The copy says only `We need this to personalize your experience` before asking for DOB and gender. | Users may not understand why Balencia needs sensitive identity/health-adjacent data before they have reached the product value. | Do not block social-auth users with DOB/gender before SIA; defer these fields until a contextual health or personalization moment with a concise reason-for-ask. | proposed |

Decision: Must fix before launch; DOB/gender should not block social-auth users before SIA and should be collected later with context.

### 03e - WhatsApp enrollment

- Five-second read: Optional WhatsApp coaching setup with skip, phone number, and clear value bullets.
- Primary action clarity: Send code and Skip are visible, but neither progresses the flow.
- Emotional tone: Friendly and low-pressure; trust framing is thinner than the phone-number ask deserves.
- Screenshot: `/private/tmp/balencia-b02-b03-focused/auth-whatsapp-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | Optional proactive coaching can make sense after consent if it is clearly skippable. |
| User friction | 2 | The screen appears lightweight, but the live phone input and skip/verify flow are not functional. |
| Visual appeal | 4 | Strong hierarchy, clear CTA, and useful value-preview list. |
| Brand fit | 4 | SIA is framed as coaching value rather than an over-decorated AI moment. |
| Mobile ergonomics | 4 | Skip, country code, and CTA targets are reachable. |
| Accessibility | 3 | The phone number area is static text rather than an announced input field. |
| Trust/privacy | 2 | Phone-number collection needs stronger optionality, frequency, and opt-out context. |
| Industry best practice | 2 | WhatsApp/SMS enrollment needs phone entry, verification, resend, skip, and recovery states. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | conversion | `Phone number` is static text, not an input. Clicking `Send code` or `Skip` leaves `/auth/whatsapp` unchanged, and the SMS verification state is unreachable. | Users can neither enroll in WhatsApp coaching nor intentionally skip it. | Add real phone input, country selector, send-code transition, 6-digit verification, resend cooldown, and skip navigation to SIA onboarding. | proposed |
| major | trust-privacy | The screen lists `Daily reminders`, `Check-in prompts`, and `SIA coaching tips`, but does not explain frequency, optionality, opt-out, or how to disable WhatsApp later. | Users may hesitate to give a phone number for an external messaging channel, especially in onboarding. | Add concise trust copy: optional channel, approximate cadence, opt-out/edit-later language, and Settings recovery path. | proposed |

Decision: Must fix before launch; keep the lightweight layout, but strengthen trust and wire the two-phase flow.

### 04 - Sign in

- Five-second read: Familiar returning-user sign-in screen with email, password, recovery, social auth, and biometrics.
- Primary action clarity: Sign in is dominant, but it is enabled with empty credentials and does nothing.
- Emotional tone: Warm and familiar; visual quality is close to the intended auth standard.
- Screenshot: `/private/tmp/balencia-b02-b03-focused/auth-sign-in-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | Returning-user sign-in belongs here and the IA is familiar. |
| User friction | 2 | Core sign-in behavior is not wired, so the route cannot perform the task. |
| Visual appeal | 4 | Good hierarchy, spacing, and scan order. |
| Brand fit | 3 | Auth styling is strong, but placeholder social marks reduce polish and trust. |
| Mobile ergonomics | 4 | Inputs and primary CTA are comfortable; biometric button is a good optional shortcut. |
| Accessibility | 3 | Most controls are named, but hidden password-toggle inputs create extra control noise. |
| Trust/privacy | 2 | `Remember me` defaults on, and social provider buttons do not look official. |
| Industry best practice | 2 | Empty credential submit should be gated and authentication paths should complete or show errors. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | conversion | `Sign in` is enabled with empty email/password; clicking it leaves `/auth/sign-in` and the visible text unchanged. | Returning users cannot get back into Balencia through the primary path. | Disable until required fields are valid, show validation errors, submit credentials, and root-reset to Today on success. | proposed |
| major | trust-privacy | `Remember me` renders checked by default, while the spec describes the default as a standard session. | Users may get a persistent session without explicitly choosing it. | Default `Remember me` to off and make the full 44px row toggle the switch. | proposed |
| major | brand-fit | Social auth buttons use placeholder `G` and `A` letter marks instead of official Google and Apple provider marks. | OAuth options look less official at a high-trust moment. | Use platform-compliant provider marks with accessible labels and polished OAuth button styling. | proposed |

Decision: Must fix before launch.

### 05 - Forgot password

- Five-second read: Simple email reset utility with one input and one action.
- Primary action clarity: Very clear, but no confirmation state appears after submit.
- Emotional tone: Calm, reassuring, and appropriately sparse.
- Screenshot: `/private/tmp/balencia-b02-b03-focused/auth-forgot-password-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | Single-purpose recovery screen is exactly right here. |
| User friction | 2 | The task cannot complete because no submission or confirmation state is wired. |
| Visual appeal | 4 | Clean and quiet; no unnecessary content. |
| Brand fit | 4 | Fits the established auth template. |
| Mobile ergonomics | 4 | Input and CTA are reachable and comfortable. |
| Accessibility | 3 | The icon-only back button lacks an accessible name. |
| Trust/privacy | 3 | Default copy is reassuring, but no masked-email confirmation is reachable. |
| Industry best practice | 2 | Password recovery needs confirmation, resend, cooldown/rate-limit, and clear return to sign-in. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | conversion | Clicking `Send reset link` leaves `/auth/forgot-password` unchanged and does not show the spec's `Check your email` confirmation state. | Users receive no proof that recovery started and have no next step. | Wire reset submission, show masked-email confirmation, provide `back to sign in`, and add resend/cooldown behavior. | proposed |
| minor | accessibility | The back button is an icon-only button with no accessible label. | Screen reader users encounter an unnamed control at the top of a sensitive recovery flow. | Add `aria-label="Back"` and ensure it performs stack pop. | proposed |

Decision: Must fix before launch.

### 05b - Reset password

- Five-second read: New password form with visible strength requirements.
- Primary action clarity: Clear, but the reset button remains disabled even after valid matching input.
- Emotional tone: Functional and appropriately quiet for recovery.
- Screenshot: `/private/tmp/balencia-b02-b03-focused/auth-reset-password-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | Deep-linked password reset form belongs here. |
| User friction | 1 | Users cannot submit a new password in the live route. |
| Visual appeal | 4 | Strong form hierarchy and compact requirements list. |
| Brand fit | 4 | Auth styling is consistent with the flow. |
| Mobile ergonomics | 4 | Fields, toggles, and CTA are appropriately sized visually. |
| Accessibility | 3 | Password visibility controls are labeled, though duplicated hidden fields make the DOM noisy. |
| Trust/privacy | 3 | Requirements are visible, but token-valid/success/expired states are missing. |
| Industry best practice | 2 | Reset flows need live validation, token validation, success, and expired-link recovery. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | conversion | After filling `StrongPass1!` into both password fields, `Reset password` remains disabled. The route exposes no success or expired-link state. | A user who arrives from a reset email cannot complete account recovery. | Drive requirements from input state, enable submit when valid and matching, validate the token on mount, and add success / expired-link states. | proposed |

Decision: Must fix before launch.
