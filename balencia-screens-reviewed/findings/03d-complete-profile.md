# Screen Review: 03d Complete Profile

## Screen

- ID: 03d
- Name: Complete profile
- Route: `/auth/complete-profile`
- Spec: `../app_design 3/03d-complete-profile.md`
- Batch: 02
- Reviewer: Codex
- Date: 2026-05-26
- Screenshot: `/private/tmp/balencia-b02-b03-focused/auth-complete-profile-phone.png`

## First Impression

- Five-second read: A brief profile completion step asking for date of birth and gender.
- Primary action clarity: Clear visually, but the fields are already filled and cannot be edited.
- Emotional tone: Warm and concise; the SIA note helps soften the ask.

## Rubric Scores

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | The screen belongs after incomplete social auth, assuming DOB/gender are truly required. |
| User friction | 2 | The user cannot enter or change the requested details in the live route. |
| Visual appeal | 4 | Clean auth composition with strong hierarchy. |
| Brand fit | 4 | Dark, warm, restrained SIA presence. |
| Mobile ergonomics | 4 | Field and CTA sizes meet the mobile bar. |
| Accessibility | 3 | Placeholder-only fields and read-only controls weaken form clarity. |
| Trust/privacy | 3 | The reason for DOB/gender is present but still broad. |
| Industry best practice | 2 | A required profile step must be editable and validated. |

## Findings

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | conversion | Live fields render as read-only with prefilled values `15 March 1995` and `Female`; clicking `Continue` leaves the route and text unchanged. | Social-auth users cannot complete the missing profile data the screen exists to collect. | Render empty editable DOB and gender controls, open the date picker / selector, validate 18+, and navigate to consent after a valid submit. | proposed |
| major | trust-privacy | The copy says only `We need this to personalize your experience` before asking for DOB and gender. | Users may not understand why Balencia needs sensitive identity/health-adjacent data before they have reached the product value. | Do not block social-auth users with DOB/gender before SIA; defer these fields until a contextual health or personalization moment with a concise reason-for-ask. | proposed |

## Decision

- Ship-ready: No.
- Must fix: Skip/defer path before SIA, plus editable profile fields and stronger reason-for-ask copy when DOB/gender are collected later.
- Redesign candidate: No.
- Resolved decision: DOB and gender should not block social-auth users before SIA; collect them later with context.
