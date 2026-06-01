# Screen Review: 04 Sign In

## Screen

- ID: 04
- Name: Sign in
- Route: `/auth/sign-in`
- Spec: `../app_design 3/04-sign-in.md`
- Batch: 02
- Reviewer: Codex
- Date: 2026-05-26

## First Impression

- Five-second read: A conventional returning-user sign-in screen.
- Primary action clarity: Strong visually, but the primary action is enabled with empty credentials and does nothing.
- Emotional tone: Warm and familiar.

## Rubric Scores

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | This screen is essential and the IA is familiar. |
| User friction | 2 | Core sign-in behavior is not working. |
| Visual appeal | 4 | Good hierarchy and spacing. |
| Brand fit | 3 | Placeholder social marks reduce polish. |
| Mobile ergonomics | 4 | Inputs and primary button are sized well. |
| Accessibility | 3 | Hidden toggle inputs create extra control noise. |
| Trust/privacy | 2 | `Remember me` defaults on and social provider marks are not official. |
| Industry best practice | 2 | Empty credential submit should be gated and authentication paths should be real. |

## Findings

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | conversion | `Sign in` is enabled with empty email/password; clicking it leaves `/auth/sign-in` and visible text unchanged. | Returning users cannot get back into the app through the primary path. | Disable until required fields are valid, show validation errors, submit credentials, and root-reset to Today on success. | proposed |
| major | trust-privacy | The `Remember me` switch renders checked by default, while the spec says the default session should be off. | Users may get a persistent session without a deliberate choice. | Default `Remember me` to off and make the full 44pt row toggle the switch. | proposed |
| major | brand-fit | Social auth buttons use placeholder `G` and `A` marks instead of official Google and Apple provider marks. | OAuth options look less official and less trustworthy. | Use platform-compliant provider marks and accessible labels. | proposed |

## Decision

- Ship-ready: No.
- Must fix: Working credential submit and default-off session persistence.
- Redesign candidate: No.
- Resolved decision: Track visual/UX acceptance separately from implementation; static no-op controls remain production findings.
