# Screen Review: 08 Initial Plan

## Screen

- ID: 08
- Name: Initial plan
- Route: `/auth/initial-plan`
- Spec: `../app_design 3/08-initial-plan-summary.md`
- Batch: 03
- Reviewer: Codex
- Date: 2026-05-26

## First Impression

- Five-second read: SIA presents a structured starter plan with RPG status and mission cards.
- Primary action clarity: Strong, but the primary CTA and customize path are inert.
- Emotional tone: Encouraging and credible at a glance.

## Rubric Scores

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | The reveal moment is valuable and well placed. |
| User friction | 2 | The user cannot accept or customize the plan. |
| Visual appeal | 4 | Clear card stack and strong CTA. |
| Brand fit | 4 | Good use of SIA, RPG, and domain color. |
| Mobile ergonomics | 4 | Scroll and CTA sizing work. |
| Accessibility | 3 | Edit icons have no accessible action name. |
| Trust/privacy | 2 | The plan appears generic and inconsistent with the previous onboarding route. |
| Industry best practice | 2 | Plan acceptance/customization must be interactive. |

## Findings

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | conversion | Clicking `Start your journey` or `Customize` leaves `/auth/initial-plan` unchanged. Domain chips and edit icons also do not enter edit mode. | Users cannot finish onboarding or adjust SIA's proposed plan. | Wire plan acceptance to root-reset into `/tabs/today`, and make customize/edit controls expose inline editing. | proposed |
| major | trust-privacy | The previous live onboarding message says the user chose fitness, finance, and wellbeing; this plan includes fitness, finance, and learning, with no wellbeing goal. | The reveal can feel generic instead of "SIA got me." | Keep the plan consistent with collected onboarding inputs, or clearly explain why SIA added/replaced a life area. | proposed |

## Decision

- Ship-ready: No.
- Must fix: Plan acceptance, customize/edit mode, and input-to-plan consistency.
- Redesign candidate: No.
- Open questions: None.
