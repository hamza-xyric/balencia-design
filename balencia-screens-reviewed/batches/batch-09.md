# Batch 09 - Me Utilities And Achievement

- Status: `reviewed`
- Screens: 5
- Reviewed: 2026-05-26
- Prototype URL: `http://localhost:3001` (`3000` was not usable in this session)
- Visual evidence: `/private/tmp/balencia-b09/*-phone.png`

| ID | Screen | Route | Spec | Status |
| --- | --- | --- | --- | --- |
| 24 | Notification history | `/tabs/me/notifications` | `../app_design 3/24-notification-history.md` | `reviewed` |
| 25 | Help center | `/tabs/me/help` | `../app_design 3/25-help-center.md` | `reviewed` |
| 49 | Progress photos | `/tabs/me/progress-photos` | `../app_design 3/49-progress-photos.md` | `reviewed` |
| 50 | Profile edit | `/tabs/me/profile-edit` | `../app_design 3/50-profile-edit.md` | `reviewed` |
| 71 | Achievement gallery | `/tabs/me/achievements` | `../app_design 3/71-achievement-gallery.md` | `reviewed` |

## Batch Focus

Validate utility clarity, sensitive photo trust, profile editing, and achievement motivation quality.

## Batch Summary

- Ship-ready: None.
- Must-fix: 24 Notification history, 25 Help center, 49 Progress photos, 50 Profile edit, 71 Achievement gallery.
- Redesign candidates: 49 Progress photos needs the resolved privacy, AI-analysis, and no-sharing state model before body photos can feel trustworthy; 71 Achievement gallery needs motivation-adaptive locked-badge handling plus a real filter/detail/state model.
- Resolved decisions:
  - Progress photos are encrypted in transit and at rest, private by default, never used for human review or model training, user-deletable with a backup-deletion target, and AI body analysis is premium opt-in.
  - Low-motivation users should see only earned/near-next achievements; hide most locked badges.
  - Track Me utility visual fidelity separately from launch readiness; inert controls remain production findings.

## Screen Notes

### 24 - Notification history

- Five-second read: A clean notification archive grouped by Today, Yesterday, and This Week, with unread dots and category-colored icons.
- Primary action clarity: Rows look tappable and Mark all read is obvious, but neither changes route or read state.
- Emotional tone: Calm and utilitarian; the SIA/reminder/check-in color coding feels consistent with Balencia.
- Screenshot: `/private/tmp/balencia-b09/tabs-me-notifications-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | A revisit log for missed SIA nudges and reminders belongs in Me as a lightweight utility. |
| User friction | 2 | The list is easy to scan, but the core row and read-management actions are inert. |
| Visual appeal | 4 | Strong grouped cards, readable hierarchy, and restrained accent use. |
| Brand fit | 4 | Orange, green, and purple map correctly to unread/action, check-in, and SIA categories. |
| Mobile ergonomics | 3 | Notification rows are comfortably large, but the back affordance is not interactive. |
| Accessibility | 2 | Rows are buttons, but read/unread/category labels are not explicitly exposed and Back is visual only. |
| Trust/privacy | 3 | Personal insights are brief and plausible, but read state and notification management need real behavior. |
| Industry best practice | 2 | Notification centers need deep links, read-state mutation, refresh, and stack navigation. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | navigation | Scoped live check found `0` links. Clicking the first `SIA insight` row left `/tabs/me/notifications` unchanged, with `unreadDots` still `2` and no dialog. | Users cannot revisit the screen or insight that a notification refers to, which is the screen's primary job. | Give every notification a deep-link target, mark tapped unread rows as read, and support error handling when the target is unavailable. | proposed |
| major | retention | Clicking `Mark all read` left the route, text length, and unread-dot count unchanged (`2` before and after). | Users cannot clear unread state, so the notification archive feels decorative rather than manageable. | Implement optimistic mark-all-read behavior with loading, success fade-out, retry toast, and disabled all-read state. | proposed |
| major | accessibility | The header chevron is rendered by `Header showBack` as a non-interactive `div`; live controls omit Back and the route has no links. Row buttons also rely on visible dots instead of an explicit unread label. | Keyboard and screen-reader users lack a reliable back action and may miss read/unread status. | Make Back a labeled link/button, expose rows as `[Unread/Read], [category], [title], [preview], [timestamp]`, and keep section headings semantic. | proposed |

Decision: Must fix before launch; the visual system is solid, but notification rows and read-state controls need real navigation and state.

### 25 - Help center

- Five-second read: A polished support surface with search, an Ask SIA hero card, FAQ rows, and a contact-support fallback.
- Primary action clarity: Ask SIA is clear and successfully routes to SIA; search, FAQ categories, and Contact support do not function.
- Emotional tone: Warm, reassuring, and appropriately SIA-first.
- Screenshot: `/private/tmp/balencia-b09/tabs-me-help-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | SIA-first help with FAQ fallback is the right hierarchy for Balencia. |
| User friction | 2 | The fastest path works, but users who search, browse, or need human support hit dead ends. |
| Visual appeal | 4 | The Ask SIA card, FAQ group, and contact card are composed and premium. |
| Brand fit | 4 | Purple identifies SIA while orange remains the action color. |
| Mobile ergonomics | 3 | FAQ rows are large, but Ask SIA and Contact support CTAs are only 36px tall. |
| Accessibility | 2 | Search is a `role="search"` div, not a text field; several controls lack state or routes. |
| Trust/privacy | 3 | Help content is low-risk, but support fallback reliability matters for trust. |
| Industry best practice | 2 | Help centers need real search, category navigation, support contact, and no-results handling. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| major | information-architecture | Live stats show `0` inputs and one `role="search"` div. Clicking `Search help topics` and `Getting started` left `/tabs/me/help` unchanged with no input, results, route, or dialog. | Users who do not want to ask SIA cannot find or browse help answers. | Render a real search input with result/no-result states, and make FAQ rows push category sub-screens or expand accordions. | proposed |
| major | retention | `Contact support` is a 291x36 button; clicking it left `/tabs/me/help` unchanged with no mail composer, form, fallback email, or error state. | Users with billing, privacy, or account problems cannot escalate beyond self-service. | Wire contact support to an in-app support form or mail flow, with unavailable-mail fallback copy. | proposed |
| major | accessibility | The only working support navigation is the `Ask SIA` link, which measures 109x36. The search control is not focusable as a text field, and the header Back chevron is not exposed as a control. | Touch, keyboard, and screen-reader users get an incomplete help experience despite visible controls. | Use semantic input/link/button elements, add a labeled Back control, and expand compact CTA hit areas to at least 44px. | proposed |

Decision: Must fix before launch; the SIA-first design is good, but a help center cannot ship with search, FAQ, and support fallback inert.

### 49 - Progress photos

- Five-second read: A fitness progress dashboard with SIA coaching, weight trend chart, stats, measurements, progress-photo placeholders, AI analysis, privacy notice, and Add progress CTA.
- Primary action clarity: Add progress and Compare are obvious, but no logging, photo, comparison, or range-changing behavior is available.
- Emotional tone: Premium and data-rich, but sensitive body-photo trust is weakened by static placeholders and an unearned AI analysis claim.
- Screenshot: `/private/tmp/balencia-b09/tabs-me-progress-photos-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | A body composition hub makes sense for Me/Fitness and connects data, photos, and SIA coaching. |
| User friction | 1 | The screen cannot log weight, take photos, add measurements, compare photos, or change chart range. |
| Visual appeal | 4 | The chart, stat row, and fitness-red hierarchy are visually strong. |
| Brand fit | 4 | Fitness red stays in domain labels, orange drives action, and purple is limited to SIA/AI. |
| Mobile ergonomics | 2 | Main FAB is reachable, but range pills and text links are below 44px. |
| Accessibility | 2 | Time range lacks selected semantics, photo thumbnails are not focusable, and compact links are tiny targets. |
| Trust/privacy | 2 | Photos are sensitive; AI analysis and encryption claims need provenance, controls, and explanation. |
| Industry best practice | 1 | Progress-photo tools need camera/photo permissions, delete, compare, logging, privacy detail, and error states. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | retention | Scoped live check found `0` inputs. Clicking `Add progress`, `Compare`, `See all`, and `1M` left `/tabs/me/progress-photos` unchanged with `dialogs: 0` and the same text length. | Users cannot add body data or use the comparison features that justify the screen. | Implement the Add Progress bottom sheet, weight/measurement forms, camera/photo flow, comparison modal, chart range state, and save/error states. | proposed |
| major | trust-privacy | Scrolled screenshot shows photo placeholders with camera icons while the screen claims `AI analysis: 18% BF` and `Muscle gain detected`; photo thumbnails are not buttons and the privacy notice has no tooltip/control. | Users may see body-analysis claims without understanding source, consent, encryption, deletion, or who can access photos. | Define and expose photo privacy, consent, analysis provenance/status, delete/expiry controls, and encryption explanation before showing AI body composition results. | proposed |
| major | mobile-ergonomics | Live measurements: time range pills are 32px tall; `See all` is 43x18; `Compare` is 61x18; selected range state has no `aria-pressed` or `aria-selected`. | Frequent controls are hard to tap and weak for assistive tech, especially around sensitive photo actions. | Add 44px hit areas, semantic selected state, focus labels, and make thumbnails/links operable buttons. | proposed |

Decision: Must fix before launch; the dashboard direction is strong, but body-photo actions and privacy/AI analysis states need a real trust model.

### 50 - Profile edit

- Five-second read: A neat edit-profile form with avatar, identity fields, verified email, phone/timezone, Save changes, and Delete account.
- Primary action clarity: Save changes is dominant, but the fields are static display blocks and Save does not submit or exit.
- Emotional tone: Calm and focused; visually this is one of the cleaner utility screens.
- Screenshot: `/private/tmp/balencia-b09/tabs-me-profile-edit-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | A focused profile editor is necessary and belongs under Me. |
| User friction | 1 | None of the profile fields can be edited, and save/delete/photo controls do nothing. |
| Visual appeal | 4 | Excellent dark form rhythm, clear avatar focus, and strong orange CTA. |
| Brand fit | 4 | Brand Mode is restrained and uses orange, green, and red appropriately. |
| Mobile ergonomics | 3 | Visible controls are large, but the form lacks keyboard, picker, and bottom-sheet states. |
| Accessibility | 1 | There are zero inputs and most visible fields are static divs without label/focus behavior. |
| Trust/privacy | 2 | Account deletion and personal-data editing need confirmation, validation, and reliable state. |
| Industry best practice | 1 | Profile editors need editable fields, dirty tracking, validation, save states, and destructive confirmation. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | retention | Live stats show `0` inputs and only four buttons: avatar, `Change photo`, `Save changes`, and `Delete account`. Clicking `Change photo` and `Save changes` left `/tabs/me/profile-edit` unchanged with no dialog, input, or route change. | Users cannot update profile data or avatar from the profile-edit screen. | Replace display blocks with controlled fields/selectors, add avatar action sheet, dirty tracking, validation, loading/error/success states, and stack-pop after save. | proposed |
| major | trust-privacy | Clicking `Delete account` left the route unchanged with `dialogs: 0`; the required confirmation modal and `DELETE` input are absent. | Users cannot access the account-deletion path, which is a trust and compliance expectation for account management. | Implement the destructive confirmation modal with explicit typed confirmation, cancel path, loading/error states, and root reset on success. | proposed |
| major | accessibility | The route has `0` links and the Back chevron is not exposed as a control. DOB, Gender, Phone, and Timezone are static divs rather than labeled inputs/selectors. | Keyboard and screen-reader users cannot operate the form, and all users miss picker/bottom-sheet affordances. | Make Back a labeled control, use semantic fields with associated labels, support DOB/gender/country/timezone sheets, and expose read-only email/copy behavior. | proposed |

Decision: Must fix before launch; keep the visual form direction, but make it an actual editable profile workflow.

### 71 - Achievement gallery

- Five-second read: A polished trophy room with summary stats, horizontal domain filters, and a two-column badge grid.
- Primary action clarity: Filters and achievement cards look tappable, but filters do not change the grid and cards do not open detail sheets.
- Emotional tone: Motivating and premium; earned badges feel good, but the data mismatch and static grid reduce credibility.
- Screenshot: `/private/tmp/balencia-b09/tabs-me-achievements-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 3 | Achievements belong in Me, but summary and visible grid data do not match. |
| User friction | 2 | Browsing the visible grid is easy; filtering and details are unavailable. |
| Visual appeal | 4 | Badge cards, summary strip, and orange/green status treatment are satisfying. |
| Brand fit | 4 | Gamification stays premium and avoids excessive purple. |
| Mobile ergonomics | 2 | Filter chips are 36px tall and achievement cards are not interactive targets. |
| Accessibility | 2 | Filters lack selected semantics and cards lack button labels/detail access. |
| Trust/privacy | 4 | Low sensitive-data risk; mostly a motivation and data-integrity surface. |
| Industry best practice | 2 | Trophy rooms need filtering, detail sheets, progress requirements, and consistent counts. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | retention | Clicking `Fitness`, `First workout`, and `30-day streak` left `/tabs/me/achievements` unchanged with `dialogs: 0`; live stats show only the filter chips as buttons and no card controls. | Users cannot inspect badge details, filter by domain, share earned achievements, or navigate toward locked ones. | Make filter chips stateful, render achievement cards as buttons, and implement the achievement detail bottom sheet with earned/progress/locked variants. | proposed |
| major | product-sense | Summary shows `47` earned out of `120`, but the live grid renders six achievement cards with only two earned cards and no loading/pagination explanation. | The trophy room feels like sample data rather than a trustworthy account of the user's progress. | Load the full achievement set or make the summary match the visible/cached data; add loading, partial-load, and offline states. | proposed |
| major | accessibility | Filter chips measure 36px tall and expose no `aria-pressed` or `aria-selected`; achievement cards are static cards, not focusable elements with progress labels. | Touch and assistive-tech users cannot reliably filter or understand badge state. | Increase chip hit areas to 44px, expose selected state, and give each card an accessibility label with name, domain, state, and progress. | proposed |

Decision: Must fix before launch; the visual trophy-room direction is good, but motivation depends on real filter/detail/data behavior.
