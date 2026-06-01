# Batch 06 - Call Summary And Missions

- Status: `reviewed`
- Screens: 5
- Reviewed: 2026-05-26
- Prototype URL: `http://localhost:3001` (existing Balencia Next dev server)
- Visual evidence: `/private/tmp/balencia-b06/*-phone.png`

| ID | Screen | Route | Spec | Status |
| --- | --- | --- | --- | --- |
| 79 | Call summary | `/tabs/sia/call-summary` | `../app_design 3/79-call-summary.md` | `reviewed` |
| 13 | Mission board | `/tabs/goals` | `../app_design 3/13-goals-list.md` | `reviewed` |
| 14 | Mission detail | `/tabs/goals/detail` | `../app_design 3/14-goal-detail.md` | `reviewed` |
| 15 | Create mission | `/tabs/goals/create` | `../app_design 3/15-create-edit-goal.md` | `reviewed` |
| 59 | Streak details | `/tabs/goals/streaks` | `../app_design 3/59-streak-details.md` | `reviewed` |

## Batch Focus

Validate how SIA outputs become action, mission clarity, creation friction, and streak motivation.

## Batch Summary

- Ship-ready: None.
- Must-fix: 79 Call summary, 13 Mission board, 14 Mission detail, 15 Create mission, 59 Streak details.
- Redesign candidates: 15 Create mission needs to return to the input-first SIA planning model; 59 Streak details should preserve source tab context with Me/RPG as the canonical deep-link owner.
- Resolved decisions:
  - Reuse the same follow-up scheduling sheet as Voice call history, prefilled from Call summary.
  - Create mission should start with blank natural-language intent input; demo examples can be chips or fixtures.
  - Streak details should preserve source tab context, with Me/RPG as the canonical deep-link owner.

## Screen Notes

### 79 - Call summary

- Five-second read: A calm SIA post-call debrief with a strong summary hero, captured action items, transcript highlights, and a bottom scheduling CTA.
- Primary action clarity: Schedule follow-up is visually dominant, but the CTA and follow-through content are not functional.
- Emotional tone: Premium, reassuring, and appropriately reflective after a coaching call.
- Screenshot: `/private/tmp/balencia-b06/tabs-sia-call-summary-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | Turning a voice call into durable action and reviewable highlights is exactly the right post-call job. |
| User friction | 2 | The screen reads well, but users cannot schedule, convert action items, or open transcript lines. |
| Visual appeal | 4 | The purple SIA hero, orange CTA, and warm cards feel polished. |
| Brand fit | 4 | Purple is correctly limited to SIA/call context and orange owns the scheduling action. |
| Mobile ergonomics | 4 | Header and bottom CTA are reachable; action rows need real touch targets once interactive. |
| Accessibility | 2 | Live route exposes only one button, no links, and no inputs inside the phone frame. |
| Trust/privacy | 3 | The Private signal is visible, but it does not explain summary storage, transcript privacy, or retention. |
| Industry best practice | 2 | Post-call summaries should make actions, transcript review, and follow-up scheduling immediately operable. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | retention | Scoped live check found `0` inputs, `1` button, and `0` links. Clicking `Schedule follow-up` left `/tabs/sia/call-summary` unchanged with no dialog or text change. Action items and transcript highlights render as static content. | Users cannot turn the coaching call into a scheduled follow-up, task, mission update, or expanded transcript review. | Wire Schedule follow-up to the scheduling sheet, make action rows open task/mission conversion, and make transcript cards open an expanded transcript anchored to the selected line. | proposed |
| major | trust-privacy | The `Private` pill is static, and no control explains who can see the call summary, transcript, or stored SIA memory. | A voice-call summary can feel sensitive; unclear storage and privacy boundaries weaken trust after a coaching session. | Make privacy/status pills accessible buttons or tooltips, add a concise privacy explanation, and reuse SIA memory redaction/retention rules. | proposed |

Decision: Must fix before launch; the visual direction is strong, but the debrief does not yet create durable action.

### 13 - Mission board

- Five-second read: A polished mission command center with filters, life-area overview, pinned missions, SIA suggestions, mission cards, and a creation FAB.
- Primary action clarity: Tapping a mission card and the create FAB are clear, but filtering and suggestions appear actionable while staying static.
- Emotional tone: Motivating and organized, with RPG framing that still feels mature.
- Screenshot: `/private/tmp/balencia-b06/tabs-goals-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | A mission board as the Goals root is the right architecture for scanning priorities and progress. |
| User friction | 2 | Users can navigate to visible missions, but cannot refine the list or inspect SIA suggestions. |
| Visual appeal | 4 | Mission cards, progress rings, and the orange FAB create a strong first viewport. |
| Brand fit | 4 | Orange action hierarchy and domain tags are balanced; RPG language stays restrained. |
| Mobile ergonomics | 3 | Main navigation targets are comfortable, but filter/status controls are compact. |
| Accessibility | 2 | Type filters lack selected semantics, status tabs are visually 26px tall, and filter state is static. |
| Trust/privacy | 4 | No sensitive ask; SIA suggestions are present but not overbearing. |
| Industry best practice | 2 | List controls should visibly filter, expand, and open sheets in a mission-management screen. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| major | information-architecture | Clicking `Side`, `Done`, `Filter by domain`, and `SIA suggestions` left `/tabs/goals` unchanged with no text, state, sheet, or route change. | Users cannot narrow a growing mission list, open the domain filter, or inspect SIA-generated mission ideas. | Implement type filter state, status tab state, the domain filter bottom sheet, and expandable SIA suggestions with accept/modify/dismiss actions. | proposed |
| major | mobile-ergonomics | Live measurements: the `All` type chip is 52x36 and the active status tab is 110x26. Type chips also do not expose pressed/selected state. | Frequent list controls are below the 44px touch gate and weaker for assistive technology. | Preserve the compact look with 44px hit boxes, `aria-pressed` or tab semantics, and visible state changes on selection. | proposed |

Decision: Must fix before launch; keep the board composition, but make its filtering and suggestion layers real.

### 14 - Mission detail

- Five-second read: A focused mission deep-dive with hero progress, mission identity, stats, SIA coaching, the next action, expandable sections, and an Ask SIA shortcut.
- Primary action clarity: The next action is prominent, but completing it is a no-op.
- Emotional tone: Encouraging and purposeful; SIA feels like a coach rather than decoration.
- Screenshot: `/private/tmp/balencia-b06/tabs-goals-detail-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | The screen solves the right problem: progress, context, and the next thing to do. |
| User friction | 1 | The primary completion task, pin toggle, and progressive disclosure sections do not work. |
| Visual appeal | 4 | The progress ring and centered identity block are clean and premium. |
| Brand fit | 4 | Orange progress/action, purple SIA note, and domain chips are used appropriately. |
| Mobile ergonomics | 2 | The next-action checkbox is visually 28x28 and sits in a dense card near the tab bar. |
| Accessibility | 2 | Expanders announce collapsed but never expand; the primary checkbox target is below 44px. |
| Trust/privacy | 4 | No sensitive ask; SIA reasoning is present but hidden behind static expanders. |
| Industry best practice | 1 | Detail screens need stateful completion, expandable detail, pin/edit management, and progress updates. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | retention | Clicking `Complete next action: 5K tempo run` left `/tabs/goals/detail` unchanged with no text or progress change; the ring still reads `68`. | Users cannot perform the screen's primary mission-progress action. | Implement action completion, success feedback, progress/stat updates, next-action replacement, undo, and failure/offline handling. | proposed |
| major | information-architecture | Clicking `All actions, collapsed` and `Pinned mission` left the route and text unchanged. All six detail sections remain inaccessible in the live route. | Users cannot inspect actions, milestones, mission chains, SIA reasoning, cross-domain links, or pin state from the detail screen. | Wire expandable sections, pin/unpin state with max-pinned handling, and persisted detail-state changes. | proposed |
| major | mobile-ergonomics | The primary next-action checkbox measures 28x28. | The most important action is harder to tap than Balencia's 44x44 mobile quality gate. | Keep the 28px visual circle but wrap it in a 44x44 labeled touch target with focus and completion state. | proposed |

Decision: Must fix before launch; the screen has the right shape, but the mission-progress loop is not operable.

### 15 - Create mission

- Five-second read: A structured generated mission review sheet, already filled with a half-marathon plan.
- Primary action clarity: Create mission chain is visible, but the screen skips the natural-language input state and the commit action does nothing.
- Emotional tone: Smart and SIA-assisted, but more like a static demo than a creation flow.
- Screenshot: `/private/tmp/balencia-b06/tabs-goals-create-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 2 | The structured result belongs after SIA planning, but the actual create-from-intent step is missing. |
| User friction | 1 | Users cannot type their own mission, generate a plan, edit rows, or save/dismiss the sheet. |
| Visual appeal | 3 | The plan review is attractive, but the first viewport is dense and clipped horizontally. |
| Brand fit | 3 | SIA planning is implied, but the missing input state weakens the AI-coach magic moment. |
| Mobile ergonomics | 2 | Small chips, switches, and horizontally clipped type controls make editing feel cramped. |
| Accessibility | 1 | There are no text inputs for mission creation, and multiple controls are below target size. |
| Trust/privacy | 4 | No sensitive data ask; user control is the main missing trust cue. |
| Industry best practice | 1 | Creation flows need input, generation/loading/error, edit controls, cancel, and save states. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | conversion | Live route has `0` text inputs/textarea controls and opens directly on a prefilled `"Run a half marathon"` structured result. The spec's natural-language input and `let SIA plan this` state are absent. | Users cannot create their own mission or experience SIA transforming intent into a plan. | Restore the input-first state with a real multi-line field, enabled/disabled SIA planning CTA, processing state, generated result, and timeout/error handling. | proposed |
| critical | conversion | Clicking `Close modal`, `add action`, `Daily`, and `Create mission chain` left `/tabs/goals/create` unchanged with no text or state change. | Users cannot dismiss, edit, classify, add actions, or commit the generated mission. | Wire modal dismissal, editable generated sections, type/domain/action/milestone controls, strictness state, chain toggle, and create/save navigation. | proposed |
| major | mobile-ergonomics | Live measurements: `Add` domain chip is 58x24 and tracking switch labels are 34x20; type pills are 36px tall and `Life` is clipped at the right edge in the first viewport. | Editing a plan on mobile becomes fiddly, especially for users with larger fingers or assistive tech. | Give chips/switches 44px hit areas, avoid clipping the type row, and expose edit/remove actions with accessible labels. | proposed |

Decision: Must fix and redesign candidate; this should start as an intent-entry flow before showing the generated plan.

### 59 - Streak details

- Five-second read: A warm streak trophy screen with a strong 42-day hero, month calendar, freeze state, rewards, leaderboard, and history further down.
- Primary action clarity: Use freeze is the clearest management action, but it and the supporting controls are static.
- Emotional tone: Motivating and premium; the orange/green streak visuals feel rewarding without being childish.
- Screenshot: `/private/tmp/balencia-b06/tabs-goals-streaks-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 3 | Streak details are valuable, but the route/tab ownership conflicts with the source spec and reward math. |
| User friction | 2 | Users can read the current streak, but cannot navigate months, use freezes, or open leaderboard details. |
| Visual appeal | 4 | The hero card and calendar are visually strong and emotionally clear. |
| Brand fit | 4 | Orange motivation and green completion are well aligned with Balencia's RPG system. |
| Mobile ergonomics | 3 | Layout is readable, but calendar cells and chevrons are below 44px. |
| Accessibility | 2 | Calendar cells are noninteractive spans, month chevrons are unlabeled 32px buttons, and no day tooltips are reachable. |
| Trust/privacy | 5 | No sensitive ask. |
| Industry best practice | 2 | Streak screens should support calendar navigation, day detail, freeze usage, reward accuracy, and leaderboard drill-in. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | retention | Clicking `Use freeze`, `See full leaderboard`, and the previous-month chevron left `/tabs/goals/streaks` unchanged with no text change. Calendar day cells are static spans rather than tooltip buttons. | Users cannot manage streak protection, inspect day-level streak status, or reach the leaderboard from the screen's main interactive areas. | Implement month navigation, day tooltips, freeze confirmation/used states, leaderboard navigation, loading/error/offline states, and streak-history drill-in. | proposed |
| major | information-architecture | The spec defines Streak details as a Me/RPG/Home/Habits stack screen with Me tab active, while the live registry and route place it at `/tabs/goals/streaks` with Goals active. | Users arriving from Me or Today may lose navigation context, and streaks may feel incorrectly owned by missions rather than the broader RPG identity layer. | Preserve source-tab context and treat Me/RPG as the canonical deep-link owner for streak details. | proposed |
| major | product-sense | The spec says the maximum 2.0x streak multiplier starts at 30+ days; the live implementation shows a 42-day streak as `1.5x XP multiplier` with `Next: 2.0x at 60 days`. | Reward logic feels inconsistent and can make the RPG system feel arbitrary or unfair. | Align multiplier tiers, progress math, and copy with the XP reward table; at 42 days show max-tier messaging unless the reward model has changed. | proposed |
| major | accessibility | Live measurements: month chevrons are 32x32 and calendar day cells are 32x32; day cells have no button semantics or descriptive labels. | Users with touch or screen-reader needs cannot reliably explore the calendar or understand daily streak states. | Use 44x44 semantic buttons for month controls and day cells, with labels such as completed/freeze/missed/today and tooltip/focus behavior. | proposed |

Decision: Must fix before launch; source-tab preservation is the resolved navigation direction, with Me/RPG as the canonical deep-link owner.
