# Screen Review: 03e WhatsApp Enrollment

## Screen

- ID: 03e
- Name: WhatsApp enrollment
- Route: `/auth/whatsapp`
- Spec: `../app_design 3/03e-whatsapp-enrollment.md`
- Batch: 02
- Reviewer: Codex
- Date: 2026-05-26

## First Impression

- Five-second read: Optional WhatsApp coaching setup with skip, phone number, and value bullets.
- Primary action clarity: Clear, but the phone number area is not an input and actions do not move the flow.
- Emotional tone: Friendly and low-pressure, though trust framing is thin for a phone-number ask.

## Rubric Scores

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | Optional WhatsApp setup makes sense after consent. |
| User friction | 2 | The enrollment and skip paths are inert. |
| Visual appeal | 4 | Pleasant, simple auth layout. |
| Brand fit | 4 | SIA/WhatsApp value is framed without too much AI ornament. |
| Mobile ergonomics | 4 | Primary controls are easy to reach. |
| Accessibility | 3 | Phone placeholder is a static div, not an announced input. |
| Trust/privacy | 2 | Phone-number collection lacks opt-out and message-frequency reassurance. |
| Industry best practice | 2 | SMS/WhatsApp enrollment needs entry, verification, skip, and resend states. |

## Findings

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | conversion | The phone number is static text, not an input; clicking `Send code` or `Skip` leaves `/auth/whatsapp` unchanged. No SMS verification state is reachable. | Users cannot enroll in WhatsApp coaching or intentionally skip it. | Add a real phone input, country selector, send-code transition, 6-digit verification state, resend cooldown, and skip navigation to SIA onboarding. | proposed |
| major | trust-privacy | The screen asks for a phone number with only value bullets: `Daily reminders`, `Check-in prompts`, and `SIA coaching tips`. It does not say how often messages arrive, that this is optional, or that it can be turned off later. | Users may hesitate to share a phone number for an external messaging channel. | Add concise trust copy such as message frequency, opt-out/edit-later language, and where WhatsApp settings live. | proposed |

## Decision

- Ship-ready: No.
- Must fix: Phone input, send/verify state, skip behavior, and opt-out copy.
- Redesign candidate: No.
- Resolved decision: WhatsApp is optional coaching and reminder delivery with explicit opt-in, message types, approximate frequency, STOP opt-out, country code support, and a Settings disable path.
