# Screen Review: 05 Forgot Password

## Screen

- ID: 05
- Name: Forgot password
- Route: `/auth/forgot-password`
- Spec: `../app_design 3/05-forgot-password.md`
- Batch: 02
- Reviewer: Codex
- Date: 2026-05-26

## First Impression

- Five-second read: Simple email reset screen.
- Primary action clarity: Very clear, but no confirmation state appears after submit.
- Emotional tone: Calm and reassuring.

## Rubric Scores

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | Single-purpose recovery screen is right. |
| User friction | 2 | The recovery request does not complete. |
| Visual appeal | 4 | Clean, quiet, and appropriately sparse. |
| Brand fit | 4 | Fits the auth template well. |
| Mobile ergonomics | 4 | Input and CTA are comfortable. |
| Accessibility | 3 | Back icon button lacks an accessible name in the live route. |
| Trust/privacy | 3 | Good basic copy, but no masked-email confirmation is reachable. |
| Industry best practice | 2 | Recovery flows need confirmation, resend, and rate-limit states. |

## Findings

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | conversion | Clicking `Send reset link` leaves `/auth/forgot-password` unchanged and does not show the spec's `Check your email` confirmation state. | Users receive no proof that recovery started and have no path back to sign in from the success state. | Wire reset submission, show masked-email confirmation, provide `back to sign in`, and add resend/cooldown behavior. | proposed |
| minor | accessibility | The back button is an icon-only button with no accessible label. | Screen reader users hear an unnamed control at the top of a sensitive recovery flow. | Add `aria-label="Back"` and ensure the control performs stack pop. | proposed |

## Decision

- Ship-ready: No.
- Must fix: Submit confirmation and accessible back behavior.
- Redesign candidate: No.
- Open questions: None.
