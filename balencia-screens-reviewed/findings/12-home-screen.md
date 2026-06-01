# Screen Review: 12 Home Screen

## Screen

- ID: 12
- Name: Home screen
- Route: `/tabs/today`
- Spec: `../app_design 3/12-home-screen.md`
- Batch: 03
- Reviewer: Codex
- Date: 2026-05-26

## First Impression

- Five-second read: A polished Today command center with SIA greeting, actions, missions, schedule, insight, and activity.
- Primary action clarity: Today's action cards are obvious, but completion and shortcuts do not respond.
- Emotional tone: Premium, helpful, and motivating.

## Rubric Scores

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | The screen answers "what matters today?" well. |
| User friction | 2 | Primary actions and shortcuts are inert. |
| Visual appeal | 4 | Strong composition despite high content density. |
| Brand fit | 4 | Good use of SIA, orange actions, and restrained purple. |
| Mobile ergonomics | 2 | Several touch targets are below the 44px mobile gate. |
| Accessibility | 3 | Many controls are labeled, but small targets remain hard to operate. |
| Trust/privacy | 3 | SIA insight is useful, but static data and interactions reduce confidence. |
| Industry best practice | 2 | A daily task hub needs real completion, shortcut, and navigation behavior. |

## Findings

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | retention | Clicking `Mark Meditate 10 min as complete`, `Breathe`, or mood chip `Good` leaves the route and visible text unchanged. | The daily command center cannot support the core habit loop of completing or opening today's actions. | Wire action completion state, shortcut navigation, mood capture, and card expansion/deep-link behavior. | proposed |
| major | mobile-ergonomics | Completion checkboxes render at 24x24; mood chips are 32px tall; health metric pills are 36px tall; quick action pills are 40px tall. | The most frequent controls are below the 44px touch target gate and may be hard to tap reliably. | Increase hit areas to at least 44x44 without necessarily enlarging every visual glyph. | proposed |

## Decision

- Ship-ready: No.
- Must fix: Core daily interactions and touch-target sizing.
- Redesign candidate: No.
- Open questions: None.
