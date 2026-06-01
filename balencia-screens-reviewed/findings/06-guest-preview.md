# Screen Review: 06 Guest Preview

## Screen

- ID: 06
- Name: Guest preview
- Route: `/auth/guest-preview`
- Spec: `../app_design 3/06-guest-mode-preview.md`
- Batch: 03
- Reviewer: Codex
- Date: 2026-05-26

## First Impression

- Five-second read: Lightweight demo personalization before account creation.
- Primary action clarity: Clear, but it does not enter the demo.
- Emotional tone: Welcoming and low-pressure.

## Rubric Scores

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | A guest preview directly answers pre-signup hesitation. |
| User friction | 2 | The entry form is static and skips the promised demo phase. |
| Visual appeal | 4 | Good auth-screen composition. |
| Brand fit | 4 | Domain colors are controlled and the tone is accessible. |
| Mobile ergonomics | 3 | Domain chips are 36px high, below the 44px touch target gate. |
| Accessibility | 3 | Chip state is visual only and not announced as selected/unselected. |
| Trust/privacy | 3 | Low-data ask is appropriate, but prefilled mock data is confusing. |
| Industry best practice | 2 | Guest/demo entry should transition into browsable demo content. |

## Findings

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | conversion | Clicking `Explore` leaves `/auth/guest-preview` unchanged. The live route never enters the spec's phase-2 demo browsing mode or any clearly labeled placeholder/demo continuation. | Hesitant users cannot preview the product before creating an account, and the current placeholder does not honestly set expectations. | For this prototype, keep the entry-form placeholder if needed, but label it as preview/demo and provide a clear continuation; full browsable demo tabs can wait. | proposed |
| major | onboarding-friction | The live form starts with `Amira` prefilled and `Fitness` / `Wellbeing` already selected. Chip taps do not visibly change the entry state. | The preview feels like a canned mock instead of a user's lightweight customization step. | Start empty, require a name and 1-3 domain choices, expose selected state accessibly, and enforce the max selection count. | proposed |

## Decision

- Ship-ready: No.
- Must fix: Demo entry transition and real chip selection state.
- Redesign candidate: No for this prototype scope; the entry-form placeholder is acceptable if it is clearly labeled as preview/demo.
- Resolved decision: Guest preview can remain an entry-form placeholder for this prototype; full phase-2 demo browsing is not required for this pass.
