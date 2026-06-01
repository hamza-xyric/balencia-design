# Update Batch U02 - Guest onboarding, Today entry, hydration/check-in, and SIA voice

- Status: `prototype-implemented`
- Updated: 2026-05-26
- Scope: 10 `app_design 3` screen-spec files
- Prototype scope: implemented in `balencia-screens`
- Audit sources: `batch-03.md`, `batch-04.md` plus `findings-ledger.md` and `deferred-decisions.md`

## Screen Specs

| ID | Screen | Spec | Route | Findings | Audit refs | Status |
| --- | --- | --- | --- | --- | --- | --- |
| 06 | Guest preview | `06-guest-mode-preview.md` | `/auth/guest-preview` | 2 (1 critical, 1 major, 0 minor) | B03 | integrated |
| 07 | SIA onboarding | `07-sia-onboarding-conversation.md` | `/auth/sia-onboarding` | 2 (1 critical, 1 major, 0 minor) | B03 | integrated |
| 08 | Initial plan | `08-initial-plan-summary.md` | `/auth/initial-plan` | 2 (1 critical, 1 major, 0 minor) | B03 | integrated |
| 12 | Home screen | `12-home-screen.md` | `/tabs/today` | 2 (1 critical, 1 major, 0 minor) | B03 | integrated |
| 41 | Schedule / calendar | `41-schedule-calendar.md` | `/tabs/today/schedule` | 2 (0 critical, 2 major, 0 minor) | B03 | integrated |
| 44 | Water intake | `44-water-intake.md` | `/tabs/today/water-intake` | 2 (1 critical, 1 major, 0 minor) | B04 | integrated |
| 45 | Daily check-in | `45-daily-checkin.md` | `/tabs/today/daily-checkin` | 2 (1 critical, 1 major, 0 minor) | B04 | integrated |
| 09 | SIA chat | `09-sia-chat.md` | `/tabs/sia` | 3 (1 critical, 2 major, 0 minor) | B04 | integrated |
| 10 | Voice mode (in-chat) | `10-sia-voice-in-chat.md` | `/tabs/sia/voice-inline` | 3 (1 critical, 2 major, 0 minor) | B04 | integrated |
| 11 | Voice mode (full) | `11-sia-voice-full-screen.md` | `/tabs/sia/voice-fullscreen` | 2 (1 critical, 1 major, 0 minor) | B04 | integrated |

## Completion Note

Updated the following specs with an `Audit Feedback Integration (2026-05-26)` section that carries ledger findings, resolved product decisions, and prototype implications into the implementation contract.

- `06-guest-mode-preview.md`
- `07-sia-onboarding-conversation.md`
- `08-initial-plan-summary.md`
- `12-home-screen.md`
- `41-schedule-calendar.md`
- `44-water-intake.md`
- `45-daily-checkin.md`
- `09-sia-chat.md`
- `10-sia-voice-in-chat.md`
- `11-sia-voice-full-screen.md`

## Accepted Recommendation Themes

- accessibility
- brand-fit
- conversion
- mobile-ergonomics
- navigation
- onboarding-friction
- product-sense
- retention
- trust-privacy

## Resolved Decisions Applied

- Q10 guest preview may remain a clearly labeled preview/demo entry form.
- Q11 SIA onboarding only needs enough interactivity to reach Initial plan.
- Q12 voice-inline can remain a QA route but production should treat it as SIA chat state.
- Q13 voice privacy requires permission, consent, transcript control, deletion, and raw-audio handling states.

## Deferred Questions

- None open for this batch. Previously deferred product decisions are resolved in `../findings/deferred-decisions.md`.

## Prototype Implications

- Implemented U02 prototype remediation for the affected auth, Today, hydration/check-in, schedule, and SIA voice routes.
- Prioritized conversion, navigation, retention, trust/privacy, accessibility, and 44px mobile touch targets over visual polish.
- No U02 findings deferred in this pass.

## Prototype Implementation Results

### Changed Prototype Routes / Files

- `balencia-screens/src/app/auth/guest-preview/page.tsx`
- `balencia-screens/src/app/auth/sia-onboarding/page.tsx`
- `balencia-screens/src/app/auth/initial-plan/page.tsx`
- `balencia-screens/src/app/tabs/today/page.tsx`
- `balencia-screens/src/app/tabs/today/schedule/page.tsx`
- `balencia-screens/src/app/tabs/today/water-intake/page.tsx`
- `balencia-screens/src/app/tabs/today/daily-checkin/page.tsx`
- `balencia-screens/src/app/tabs/sia/page.tsx`
- `balencia-screens/src/app/tabs/sia/voice-inline/page.tsx`
- `balencia-screens/src/app/tabs/sia/voice-fullscreen/page.tsx`
- Shared components updated for U02 behavior: `ActionCard.tsx`, `QuickActionsRow.tsx`, `SIACoachingNote.tsx`, `SiaChatTopBar.tsx`, `VoiceInterfacePanel.tsx`, `RichInlineCard.tsx`, `MoodSelector.tsx`.

### Findings Addressed

- B03-F01, B03-F02: Guest preview now starts empty, enforces name plus 1-3 selected life areas, exposes selected state/max-selection feedback, and opens a clearly labeled preview/demo continuation.
- B03-F03, B03-F04: SIA onboarding now has a real composer, chip-to-message behavior, conversation progression, animated/expanded domain area, and transition to Initial plan.
- B03-F05, B03-F06: Initial plan now routes acceptance to Today, supports edit/customize states, and keeps the plan aligned to onboarding-selected fitness, finance, and wellbeing.
- B03-F07, B03-F08: Today now captures mood, completes actions with feedback, expands action cards, routes quick actions, and uses larger action hit targets.
- B03-F09, B03-F10: Schedule now supports view switching, date movement, task placement, add-event modal, and disambiguated add/date labels.
- B04-F01, B04-F02: Water intake now supports preset/custom logging, delete/undo-style feedback, target achievement, and a labeled target settings control.
- B04-F03, B04-F04: Daily check-in now has controlled mood, range sliders, intention input, emotion tags, note expansion, save/check-in validation, and larger controls.
- B04-F05, B04-F06, B04-F07: SIA chat now supports text send, suggestion-chip send, streaming/thinking feedback, inline voice entry, full-screen voice entry, rich-card links, and 44px chat actions.
- B04-F08, B04-F09, B04-F10: Voice inline now includes permission, listening/ready states, transcript live text, cancel/send behavior, and dynamic accessible labels.
- B04-F11, B04-F12: Full-screen voice now includes permission, mute/unmute, listening/thinking/speaking states, live transcript/status, and a reactive 2D SIA avatar treatment.

### Findings Deferred

- None.

### Verification Results

- `npm run check` in `balencia-screens`: passed.
  - `lint`: passed.
  - `typecheck`: passed.
  - `verify:routes`: passed, 90 screens / 90 specs.
  - `verify:assets`: passed, 14 logo assets.
  - `verify:copy`: passed, 167 files scanned.
  - `verify:brand`: passed, 167 files scanned.
- Targeted lint for all U02 changed route/component files: passed.
- Browser QA via Playwright against `http://localhost:3005`: verified guest preview modal, onboarding progression and plan navigation, initial plan customize/editor visibility, Today mood/action feedback, schedule view/date/add behavior, water logging/settings, daily check-in submission, SIA text/voice, direct inline voice, and full-screen voice state changes.
