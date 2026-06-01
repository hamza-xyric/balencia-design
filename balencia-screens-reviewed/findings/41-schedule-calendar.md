# Screen Review: 41 Schedule / Calendar

## Screen

- ID: 41
- Name: Schedule / calendar
- Route: `/tabs/today/schedule`
- Spec: `../app_design 3/41-schedule-calendar.md`
- Batch: 03
- Reviewer: Codex
- Date: 2026-05-26

## First Impression

- Five-second read: A day calendar with unscheduled tasks, event cards, SIA suggestion, and add affordances.
- Primary action clarity: Viewing the day is clear; changing views and adding are not functional.
- Emotional tone: Practical and product-mode appropriate.

## Rubric Scores

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | A time-based planning view is valuable from Today. |
| User friction | 3 | Day view is readable, but controls are static. |
| Visual appeal | 4 | Calendar cards and SIA suggestion are clear. |
| Brand fit | 4 | Domain colors and SIA styling are restrained. |
| Mobile ergonomics | 3 | Header and FAB targets are good; some calendar controls need refinement. |
| Accessibility | 2 | Date chevrons are unlabeled and duplicate add labels are ambiguous. |
| Trust/privacy | 3 | Sync icon is present but does not expose status detail. |
| Industry best practice | 2 | Calendar views should switch, date nav should move, and add should open a modal. |

## Findings

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| major | navigation | Clicking `Week`, `Month`, or `Day` leaves the same day-view text in place; add controls do not open a modal, and unscheduled tasks say `Drag into day` without drag behavior. | Users cannot use the calendar modes or planning actions promised by the UI. | Implement local view state for day/week/month, date navigation, add-event modal, and task drag/placement behavior. | proposed |
| major | accessibility | The previous/next date buttons have no accessible names, while two separate buttons share the same `Add schedule item` label. | Screen reader users cannot distinguish date navigation from other unlabeled buttons or know which add control they are using. | Label date controls (`Previous day`, `Next day`) and disambiguate header add versus floating add if both remain. | proposed |

## Decision

- Ship-ready: No.
- Must fix: View switching, date/add behavior, and accessible control labels.
- Redesign candidate: No.
- Open questions: None.
