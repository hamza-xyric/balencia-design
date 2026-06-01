# Screen Review: 07 SIA Onboarding

## Screen

- ID: 07
- Name: SIA onboarding
- Route: `/auth/sia-onboarding`
- Spec: `../app_design 3/07-sia-onboarding-conversation.md`
- Batch: 03
- Reviewer: Codex
- Date: 2026-05-26

## First Impression

- Five-second read: A SIA-led goal conversation with visual brainstorming above the chat.
- Primary action clarity: The chips and send button are clear, but there is no real text input or progression.
- Emotional tone: Warm, but less magical than the spec's first-SIA moment.

## Rubric Scores

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | This is the right emotional and functional moment for SIA. |
| User friction | 1 | The user cannot converse or complete onboarding. |
| Visual appeal | 3 | Composition works, but the top visual area is small and static. |
| Brand fit | 4 | SIA tone is calm and aligned. |
| Mobile ergonomics | 4 | Main controls are reachable. |
| Accessibility | 2 | The composer is not an input element. |
| Trust/privacy | 3 | SIA claims are calm, but static behavior undermines trust. |
| Industry best practice | 2 | AI onboarding needs responsive chips/input and progress. |

## Findings

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | conversion | The live route has no input or textarea; `Run a half marathon` and `Send message` clicks leave the route and text unchanged. | Users cannot provide goals, answer SIA, or reach the initial plan summary. | Replace the static composer with a real input, wire suggestion chips into conversation state, and transition to `/auth/initial-plan` when onboarding is complete. | proposed |
| major | brand-fit | The spec calls for 9 animated domain bubbles and a ~40% visual brainstorming area; the live route shows 5 small initial-letter bubbles in a 232px card plus static goal cards. | Balencia's most important first-SIA moment may feel like a form preview rather than a creative collaboration. | Expand the visual area, include all core domains, and add stage-based motion/content changes that mirror the conversation. | proposed |

## Decision

- Ship-ready: No.
- Must fix: Conversational state and onboarding completion.
- Redesign candidate: Yes, for the first-SIA "wow" moment.
- Open questions: None.
