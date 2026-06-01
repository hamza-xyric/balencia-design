# Screen Review: 05b Reset Password

## Screen

- ID: 05b
- Name: Reset password
- Route: `/auth/reset-password`
- Spec: `../app_design 3/05b-reset-password.md`
- Batch: 02
- Reviewer: Codex
- Date: 2026-05-26

## First Impression

- Five-second read: New password form with requirements.
- Primary action clarity: Clear, but permanently disabled.
- Emotional tone: Functional and appropriately quiet.

## Rubric Scores

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | The form matches the deep-link recovery need. |
| User friction | 1 | Users cannot submit a valid password. |
| Visual appeal | 4 | Strong form hierarchy. |
| Brand fit | 4 | Fits the auth family. |
| Mobile ergonomics | 4 | Fields and CTA are touch-friendly. |
| Accessibility | 3 | Password toggles are not ideal but mostly labeled. |
| Trust/privacy | 3 | Requirements are visible, but token states are missing. |
| Industry best practice | 2 | Reset flows need live validation and token-expired handling. |

## Findings

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | conversion | After filling `StrongPass1!` into both password fields, the `Reset password` button remains disabled. The route also exposes no success or expired-link state. | A user who arrives from a reset email cannot complete password recovery. | Drive requirements from input state, enable submit when valid and matching, validate the token on mount, and add success / expired-link states. | proposed |

## Decision

- Ship-ready: No.
- Must fix: Live validation and reset-token states.
- Redesign candidate: No.
- Open questions: None.
