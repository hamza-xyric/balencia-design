# Update Batch U03 - Conversation suite, call summary, missions, and streaks

- Status: `prototype-implemented`
- Updated: 2026-05-26
- Scope: 10 `app_design 3` screen-spec files
- Prototype scope: implemented in `balencia-screens`; slower polish continues in P05/P06
- Audit sources: `batch-05.md`, `batch-06.md` plus `findings-ledger.md` and `deferred-decisions.md`

## Screen Specs

| ID | Screen | Spec | Route | Findings | Audit refs | Status |
| --- | --- | --- | --- | --- | --- | --- |
| 51 | Voice call history | `51-voice-call-history.md` | `/tabs/sia/voice-history` | 3 (1 critical, 2 major, 0 minor) | B05 | integrated |
| 74 | Conversations hub | `74-conversations-hub.md` | `/tabs/sia/conversations` | 2 (0 critical, 2 major, 0 minor) | B05 | integrated |
| 75 | Direct chat | `75-direct-chat.md` | `/tabs/sia/direct` | 3 (1 critical, 2 major, 0 minor) | B05 | integrated |
| 76 | Group chat | `76-group-chat.md` | `/tabs/sia/group` | 3 (1 critical, 2 major, 0 minor) | B05 | integrated |
| 77 | Message actions | `77-message-actions.md` | `/tabs/sia/message-actions` | 3 (1 critical, 2 major, 0 minor) | B05 | integrated |
| 79 | Call summary | `79-call-summary.md` | `/tabs/sia/call-summary` | 2 (1 critical, 1 major, 0 minor) | B06 | integrated |
| 13 | Mission board | `13-goals-list.md` | `/tabs/goals` | 2 (0 critical, 2 major, 0 minor) | B06 | integrated |
| 14 | Mission detail | `14-goal-detail.md` | `/tabs/goals/detail` | 3 (1 critical, 2 major, 0 minor) | B06 | integrated |
| 15 | Create mission | `15-create-edit-goal.md` | `/tabs/goals/create` | 3 (2 critical, 1 major, 0 minor) | B06 | integrated |
| 59 | Streak details | `59-streak-details.md` | `/tabs/goals/streaks` | 4 (1 critical, 3 major, 0 minor) | B06 | integrated |

## Completion Note

Updated the following specs with an `Audit Feedback Integration (2026-05-26)` section that carries ledger findings, resolved product decisions, and prototype implications into the implementation contract.

- `51-voice-call-history.md`
- `74-conversations-hub.md`
- `75-direct-chat.md`
- `76-group-chat.md`
- `77-message-actions.md`
- `79-call-summary.md`
- `13-goals-list.md`
- `14-goal-detail.md`
- `15-create-edit-goal.md`
- `59-streak-details.md`

## Accepted Recommendation Themes

- accessibility
- conversion
- information-architecture
- mobile-ergonomics
- navigation
- product-sense
- retention
- trust-privacy

## Resolved Decisions Applied

- Q14 SIA in chats requires explicit invocation.
- Q15 group health/recovery signals require per-user permission.
- Q23 call follow-up scheduling should reuse the voice-history scheduling sheet.
- Q24 create mission starts from blank natural-language intent.
- Q25 streak details preserve source tab context.

## Deferred Questions

- None open for this batch. Previously deferred product decisions are resolved in `../findings/deferred-decisions.md`.

## Prototype Implications

- Do not update `balencia-screens` during this spec-first pass.
- During the prototype phase, prioritize critical conversion, navigation, retention, trust/privacy, and accessibility findings before visual polish.
- Verify affected routes against the updated spec, then run `npm run check` inside `balencia-screens` and perform browser QA for mobile interaction states.

## Prototype Implementation Update

- Implementation status: `implemented` in `balencia-screens` on 2026-05-26.
- Changed prototype routes/files:
  - `src/app/tabs/sia/voice-history/page.tsx`
  - `src/app/tabs/sia/conversations/page.tsx`
  - `src/app/tabs/sia/direct/page.tsx`
  - `src/app/tabs/sia/group/page.tsx`
  - `src/app/tabs/sia/message-actions/page.tsx`
  - `src/app/tabs/sia/call-summary/page.tsx`
  - `src/app/tabs/goals/page.tsx`
  - `src/app/tabs/goals/detail/page.tsx`
  - `src/app/tabs/goals/create/page.tsx`
  - `src/app/tabs/goals/streaks/page.tsx`
  - `src/components/design-system/BottomSheet.tsx`
  - `src/components/design-system/SearchBar.tsx`
  - `src/components/design-system/SegmentedControl.tsx`
  - `src/components/screens/ChatInputBar.tsx`
- Findings addressed:
  - B05-F01, B05-F02, B05-F03
  - B05-F04, B05-F05
  - B05-F06, B05-F07, B05-F08
  - B05-F09, B05-F10, B05-F11
  - B05-F12, B05-F13, B05-F14
  - B06-F01, B06-F02
  - B06-F03, B06-F04
  - B06-F05, B06-F06, B06-F07
  - B06-F08, B06-F09, B06-F10
  - B06-F11, B06-F12, B06-F13, B06-F14
- Findings deferred: none for U03. Some interactions remain prototype-local rather than persisted to a backend, matching current `balencia-screens` conventions.
- Verification results:
  - `npm run lint -- <U03 changed files>`: passed.
  - `npm run typecheck`: passed.
  - `npm run verify:routes`: passed.
  - `npm run verify:assets`: passed.
  - `npm run check`: superseded by P00 foundation verification on 2026-05-26; full repo check now passes.
  - `npm run build`: superseded by P00 foundation verification on 2026-05-26; production build now passes after the reset-password Suspense fix.
  - Browser QA via Playwright against `http://localhost:3005`: passed conversations search/filter/new-chat sheet, direct/group composers and privacy states, message reactions/protected media, call scheduling, voice tabs/action items, mission filters/domain sheet, mission completion/section disclosure, create-mission planning flow, and streak month/freeze controls.
