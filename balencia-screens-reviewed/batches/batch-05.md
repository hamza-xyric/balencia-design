# Batch 05 - Conversation Suite

- Status: `reviewed`
- Screens: 5
- Reviewed: 2026-05-26
- Prototype URL: `http://localhost:3001` (`3000` was already in use)
- Visual evidence: `/private/tmp/balencia-b05/*-phone.png`

| ID | Screen | Route | Spec | Status |
| --- | --- | --- | --- | --- |
| 51 | Voice call history | `/tabs/sia/voice-history` | `../app_design 3/51-voice-call-history.md` | `reviewed` |
| 74 | Conversations hub | `/tabs/sia/conversations` | `../app_design 3/74-conversations-hub.md` | `reviewed` |
| 75 | Direct chat | `/tabs/sia/direct` | `../app_design 3/75-direct-chat.md` | `reviewed` |
| 76 | Group chat | `/tabs/sia/group` | `../app_design 3/76-group-chat.md` | `reviewed` |
| 77 | Message actions | `/tabs/sia/message-actions` | `../app_design 3/77-message-actions.md` | `reviewed` |

## Batch Focus

Validate SIA conversation architecture, direct and group chat readability, action safety, and privacy cues.

## Batch Summary

- Ship-ready: None.
- Must-fix: 51 Voice call history, 74 Conversations hub, 75 Direct chat, 76 Group chat, 77 Message actions.
- Redesign candidates: 76 Group chat needs explicit SIA invocation and health-signal consent controls before SIA can surface member recovery/strain in a shared room; 77 Message actions needs a real action/dismiss/protected-media state model.
- Resolved decisions:
  - SIA in direct and group chats should require explicit invocation, not always-on analysis.
  - Group health and recovery signals require explicit per-user permission; default to aggregate or non-sensitive guidance.
  - Track chat visual quality and interaction readiness separately in this prototype audit; inert controls remain production findings.

## Screen Notes

### 51 - Voice call history

- Five-second read: A polished SIA voice-session archive with upcoming call management, a history/action-items segmented control, and recent call cards.
- Primary action clarity: Schedule a call is dominant, but scheduling, edit/cancel, the Action items tab, and call-card drill-in are not functional.
- Emotional tone: Premium and coaching-oriented; the purple AI register is clear without feeling noisy.
- Screenshot: `/private/tmp/balencia-b05/tabs-sia-voice-history-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | A persistent voice-session archive belongs in SIA and strengthens the coaching relationship. |
| User friction | 2 | The screen suggests history, action items, and scheduling, but the main controls do not change state. |
| Visual appeal | 4 | Strong dark composition, clear cards, and a confident orange scheduling CTA. |
| Brand fit | 4 | Purple is used for SIA/AI context and orange is reserved for the primary action. |
| Mobile ergonomics | 3 | Main CTA and header targets are comfortable, but tabs and text links are undersized. |
| Accessibility | 2 | The segmented control lacks selected semantics, and edit/cancel targets are far below the 44pt gate. |
| Trust/privacy | 3 | Voice summaries are plausible, but call history needs detail, retention, and management affordances. |
| Industry best practice | 2 | Call history should support tab switching, scheduling, cancellation confirmation, and detail drill-in. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | retention | Scoped live check found `0` inputs; clicking `Action items`, `Schedule a call`, and `Cancel` left `/tabs/sia/voice-history` unchanged with no dialog. `Edit` timed out against an 18px-tall text target. | Users cannot schedule, reschedule, cancel, or review action items from the screen's primary surfaces. | Wire tab state, schedule modal, edit/reschedule flow, cancellation confirmation, and action-item completion/filtering. | proposed |
| major | navigation | The phone frame exposes only one link, `Back`; call history cards are static cards rather than links to Call Detail. | Users cannot review full summaries, insights, transcripts, or follow-up actions from past sessions. | Make call cards navigable to a call detail route/sheet with summary, insights, action items, listen-again, and SIA follow-up. | proposed |
| major | mobile-ergonomics | Live measurements: `History` and `Action items` buttons are 150x26; `Edit` is 27x18; `Cancel` is 46x18. | Frequent session-management actions are hard to tap and weak for assistive tech. | Preserve the visual compactness but expand hit areas to at least 44x44 and add tab/selected state semantics. | proposed |

Decision: Must fix before launch; the visual direction is strong, but the archive needs real scheduling, action-items, and call-detail behavior.

### 74 - Conversations hub

- Five-second read: A unified SIA inbox with a prominent pinned coach, search, filters, pinned group, recent threads, and a bottom start-new-chat CTA.
- Primary action clarity: Resume-thread links are clear and work, but search, filters, voice entry, and start-new-chat are static.
- Emotional tone: Smart, warm, and social without losing SIA as the center of gravity.
- Screenshot: `/private/tmp/balencia-b05/tabs-sia-conversations-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | A conversation command center is the right architecture for SIA plus accountability/social threads. |
| User friction | 2 | Users can resume rows, but cannot search, filter, start a new chat, or start voice from the header. |
| Visual appeal | 4 | The SIA hero and conversation rows are polished; first viewport feels premium. |
| Brand fit | 4 | Purple anchors SIA, orange marks unread/action, and domain colors stay secondary. |
| Mobile ergonomics | 3 | Rows are comfortably large, but the filter rail is 36px high and the bottom CTA is shorter than spec. |
| Accessibility | 2 | Search is a visual div, filters do not expose tab/pressed state, and chips are below target height. |
| Trust/privacy | 3 | Searching "SIA memory" is useful but needs clearer data scope once functional. |
| Industry best practice | 2 | Inboxes need real search mode, filter state, creation flow, loading/error, and long-press actions. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| major | information-architecture | Scoped live check found `0` inputs. Clicking `People`, `Search conversations`, `Start voice coaching`, and `Start new chat` left `/tabs/sia/conversations` unchanged with no dialog. The direct row link did navigate to `/tabs/sia/direct`. | Users can resume visible threads but cannot find, filter, create, or enter voice from the hub. | Implement search focus/query filtering, single-select filters, voice entry to full-screen voice, and a new-conversation picker sheet. | proposed |
| major | accessibility | The search bar is rendered as a `role="search"` div rather than an input; filter chips measure 36px tall and do not expose `aria-pressed` or tablist semantics. | Keyboard, screen-reader, and touch users cannot operate the main inbox controls reliably. | Render a real search input, make the filter rail a semantic tab/single-select group, and give every chip a 44px minimum hit area. | proposed |

Decision: Must fix before launch; keep the SIA-first inbox design, but wire the interaction layer.

### 75 - Direct chat

- Five-second read: A private Aisha chat with shared mission context, a SIA assist strip, message bubbles, attachment preview, typing indicator, and composer.
- Primary action clarity: The message composer is obvious, but it is static text with no real input and a no-op send button.
- Emotional tone: Supportive and human; SIA feels helpful, though privacy expectations are not explicit enough.
- Screenshot: `/private/tmp/balencia-b05/tabs-sia-direct-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | A trusted one-to-one accountability chat fits the SIA/social layer. |
| User friction | 1 | The core task, sending a message, cannot be performed. |
| Visual appeal | 4 | Message rhythm, SIA assist card, and private mission context are well composed. |
| Brand fit | 4 | SIA purple and human/social surfaces are balanced. |
| Mobile ergonomics | 2 | Composer overlays the thread and the send target is only 36x36. |
| Accessibility | 2 | There is no real input, the visual back chevron is not interactive, and long-press actions are absent. |
| Trust/privacy | 2 | SIA can summarize/convert a private thread, but there is no explicit opt-in or visibility scope. |
| Industry best practice | 1 | Direct chat needs text input, queued sends, retry, profile/call/info actions, and message action access. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | retention | Scoped live check found `0` input/textarea/select elements; clicking `Send message` left `/tabs/sia/direct` unchanged. The send target measures 36x36. | Users cannot send a direct message, so the screen is only a static transcript. | Replace the static composer with a real text input, enabled/disabled send state, optimistic send, retry/offline state, attachment/voice hooks, and 44px action target. | proposed |
| major | navigation | Clicking `Start call`, `Conversation info`, and the selected message preview caused no route, sheet, or dialog. The header back chevron is visual only because it is rendered as a div. | Users cannot call, inspect the contact, return to the previous screen, or reach Message Actions from the chat. | Wire back navigation, call setup, info/profile sheet, SIA-assist sheet, and long-press/tap-hold entry to Message Actions. | proposed |
| major | trust-privacy | The screen says SIA can summarize decisions and convert the private thread into a mission update while also showing `Private chat`; no control explains what SIA can read, save, or share. | Users may not understand whether a private human chat is being analyzed or summarized by default. | Define SIA visibility per thread, expose opt-in controls for summarize/suggest/save-to-mission, and clarify what remains private. | proposed |

Decision: Must fix before launch; the conversation UI is promising, but messaging, navigation, and SIA privacy controls must become real.

### 76 - Group chat

- Five-second read: A mission-anchored group room with shared XP, members, SIA pacing, group messages, and composer.
- Primary action clarity: Message Morning crew is clear, but the composer and group-management controls are inert.
- Emotional tone: Motivating and coordinated; the room mission gives the thread purpose.
- Screenshot: `/private/tmp/balencia-b05/tabs-sia-group-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | Small mission rooms can support accountability without becoming a generic social feed. |
| User friction | 1 | Users cannot send, add members, open group info, or enter the mission from the room. |
| Visual appeal | 4 | Mission card, member rail, and message rhythm are strong and readable. |
| Brand fit | 4 | Fitness red marks the room mission, purple marks SIA, and orange marks action/XP. |
| Mobile ergonomics | 2 | Main header targets are large, but the send target is 36x36 and the composer covers thread content. |
| Accessibility | 2 | No real input exists, the visual back control is not interactive, and the member rail is not operable. |
| Trust/privacy | 2 | SIA shares member recovery/strain signals without visible consent or anonymization. |
| Industry best practice | 1 | Group chat needs messaging state, membership controls, mission deep links, mentions, and failure states. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | retention | Scoped live check found `0` input/textarea/select elements; clicking `Send message` left `/tabs/sia/group` unchanged. The send button measures 36x36. | Users cannot coordinate in the mission room. | Implement a real group composer with text, mentions, attachments, queued sends, failure/retry states, and a 44px minimum send target. | proposed |
| major | navigation | Clicking `Add member`, `Group info`, and the `Room mission` card left the route unchanged with no sheet or dialog. The back chevron is also visual only. | Users cannot manage the room, inspect members, return to the origin screen, or open the active mission. | Wire add-member, group-info, members list, mission detail, back navigation, and long-press message actions. | proposed |
| major | trust-privacy | The SIA message says `Three members have high recovery and one has elevated strain` inside a shared group thread. | Sensitive health/recovery context may be exposed to other members without consent or clear scope. | Require explicit sharing consent, prefer aggregate/anonymized guidance by default, and show who can see SIA-generated group insights. | proposed |

Decision: Must fix before launch; the mission-room design works visually, but group messaging and health-signal privacy need implementation decisions.

### 77 - Message actions

- Five-second read: A focused message action surface with privacy/protection pills, selected message preview, reaction grid, action rows, shared media, and Done.
- Primary action clarity: Done is dominant and action rows are clear, but none of the actions actually apply, open, forward, or dismiss.
- Emotional tone: Serious and safety-aware; the view-once/privacy styling helps, but static behavior weakens trust.
- Screenshot: `/private/tmp/balencia-b05/tabs-sia-message-actions-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | A focused action surface is useful for dense chat threads and protected media. |
| User friction | 1 | Reactions, actions, media, back, and Done do not complete the user's intent. |
| Visual appeal | 4 | Strong selected-message card, clear privacy pills, and high-contrast bottom action. |
| Brand fit | 4 | Orange is used for completion/selected reaction and purple for SIA capability. |
| Mobile ergonomics | 4 | Reaction, action, and Done targets meet or exceed 44px. |
| Accessibility | 2 | Reaction selected state is visual only, back is not interactive, and duplicate `Done` buttons create ambiguity. |
| Trust/privacy | 2 | View-once media and SIA summarization are represented as static labels without protected-open states. |
| Industry best practice | 1 | Message actions need applied states, dismissal, protected media warnings, expiry, undo/retry, and accessible state. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | retention | Scoped live check showed `Support`, `Pin message`, and `Open view-once media` clicks left `/tabs/sia/message-actions` unchanged with no dialog or state change; `Done` did not dismiss the route. | Users cannot complete the action surface's core job or return to the thread from the primary CTA. | Implement reaction selection/save, pin/star/forward flows, protected media opening, Done/back dismissal to the origin thread, and failure/retry states. | proposed |
| major | trust-privacy | `Open view-once media` is a no-op, shared media cards are noninteractive divs, and no warning, opened, expired, or unavailable state exists. | Protected media may feel decorative and does not establish user trust around one-time access. | Add a warning/confirmation before view-once open, record opened/expired states, make media cards semantic buttons/links, and explain what SIA can summarize. | proposed |
| major | accessibility | Quick reactions do not expose selected state; the visual back chevron is not an interactive element; two buttons contain `Done` text, creating ambiguous targeting. | Screen-reader and keyboard users cannot reliably understand or exit the action surface. | Use `aria-pressed` for reactions, make back a labeled button, disambiguate reaction `Done` from bottom `Done`, and maintain focus order through dismissal. | proposed |

Decision: Must fix before launch; the layout is useful, but protected-message actions must become stateful and dismissible.
