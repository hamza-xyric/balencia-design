# R04 - Daily Actions And SIA Voice

- Status: `reviewed`
- Reviewed: 2026-05-27
- Prototype URL: `http://localhost:3000`
- Screens: `44`, `45`, `09`, `10`, `11`
- Routes: `/tabs/today/water-intake`, `/tabs/today/daily-checkin`, `/tabs/sia`, `/tabs/sia/voice-inline`, `/tabs/sia/voice-fullscreen`
- Sources: `../batches/batch-04.md`, `../update-batches/batch-u02.md`, `../screen-iteration-batches/P04-daily-actions-sia-voice.md`
- Evidence directory: `../../balencia-screens/output/a-plus-plus-review/R04/`
- Build gate: no
- Finding IDs: `R04-F01+`

## Focus

Validate lightweight daily logging, check-in emotional safety, SIA chat, inline voice, and full-screen voice. A++ requires working state, premium SIA presence, clear privacy expectations, and excellent mobile interaction quality.

## Required Review Output

- Fresh evidence for every route and important SIA/voice states.
- Five-second read, primary action clarity, emotional tone, control inventory, rubric scores, A++ grade, findings, and decision for every screen.
- `npm run check` result before close.

## Batch Summary

- A++: none.
- A+: none.
- A: 44 Water intake, 45 Daily check-in, 09 SIA chat, 10 Voice mode (in-chat), 11 Voice mode (full).
- Needs polish: all five R04 screens are coherent and safer than B04, but fresh R04 evidence found data-accuracy, trust/privacy, and mobile safe-area blockers that prevent A+ or A++.
- Redesign candidates: none, though 11 Full-screen voice needs the visible prototype state-advance control removed or replaced before Figma handoff.
- User decisions: none. Existing Q12/Q13 voice decisions are sufficient.
- Verification: `npm run check` passed from `balencia-screens` on 2026-05-27; R04 build gate is not required.
- State evidence: `../../balencia-screens/output/a-plus-plus-review/R04/r04-interaction-evidence.json` captured 24 interaction states with zero console errors.

## Screen Notes

### 44 - Water intake

- Five-second read: A strong hydration tracker with a clear progress ring, one-tap presets, drink log, weekly context, stats, and target settings.
- Screen purpose and journey fit: Fits Today as a low-friction daily habit surface and supports the wellbeing loop from quick action, habit, or SIA reminder.
- Primary action clarity: `1 glass`, `250 ml`, `500 ml`, and `custom ml` are obvious and now update visible state; delete and undo are also visible after logging.
- Emotional tone: Calm, satisfying, and rewarding without over-celebrating a small daily action.
- Screenshot/evidence: baseline `../../balencia-screens/output/a-plus-plus-review/R04/44-tabs-today-water-intake-phone.png`; fresh states `44-r04-water-initial.png`, `44-r04-water-add-one.png`, `44-r04-water-delete-new.png`, `44-r04-water-undo.png`, `44-r04-water-custom-dialog.png`, `44-r04-water-custom-logged.png`, `44-r04-water-target-settings.png`; JSON `r04-interaction-evidence.json`.
- Grade: A
- Grade cap: major data-accuracy finding R04-F01 prevents A+ and A++.
- Control inventory: Back returns to Today; settings opens target sheet; quick-add buttons log preset/custom intake; delete buttons remove log rows; Undo restores deletion; custom sheet input accepts ml and `Log water`; target sheet slider changes daily glasses target and `Save target` closes the sheet. All visible controls have a purpose, but custom ml accounting is inaccurate.

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | The screen solves the right daily hydration task and belongs in Today/wellbeing. |
| User friction | 4 | Preset, custom, delete, undo, and target settings are present, but custom entry accuracy breaks confidence. |
| Visual appeal | 5 | Ring, teal wellbeing accents, cards, and reward state are polished. |
| Brand fit | 5 | Orange actions, teal wellbeing, and green achievement state are well balanced. |
| Mobile ergonomics | 4 | Main controls are touch-safe; target slider and modal escape behavior are less refined than the primary flow. |
| Accessibility | 4 | Labels are strong for core controls, but custom/target settings need stronger Figma handoff around range semantics and cancel/escape behavior. |
| Trust/privacy | 3 | Hydration is not sensitive, but the screen overstates consumed ml and goal achievement after custom logging. |
| Industry best practice | 3 | Habit trackers must keep totals, units, and rewards mathematically consistent. |

| Finding | Severity | Category | Evidence | User Impact | Recommendation | Status | Grade cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R04-F01 | major | data-accuracy | Fresh state `44-r04-water-custom-logged.png` and `r04-interaction-evidence.json` show the flow at 6 / 8 glasses, then logging custom `375 ml` produces `8 / 8`, `2000 ml`, `Target achieved`, and a log row reading `375 ml 2 glasses`. | Users can receive false progress and XP because custom ml is rounded into glasses and the displayed ml total no longer matches the actual logged volume. | Store ml as the source of truth, derive glasses consistently, support partial glasses, and trigger target achievement only when actual ml reaches the target ml. | proposed | Prevents A+ and A++ |

Decision: needs polish.

### 45 - Daily check-in

- Five-second read: A gentle check-in form with mood, energy, stress, intention, emotion tags, note, privacy copy, and disabled submit.
- Screen purpose and journey fit: Fits the morning Today ritual and gives SIA emotional context without a heavy survey.
- Primary action clarity: `check in` is disabled until mood plus intention are provided, then submits and routes back to Today.
- Emotional tone: Reflective, warm, and safe; the preselected emotion tags make the fresh ritual feel less self-authored.
- Screenshot/evidence: baseline `../../balencia-screens/output/a-plus-plus-review/R04/45-tabs-today-daily-checkin-phone.png`; fresh states `45-r04-checkin-initial.png`, `45-r04-checkin-save-empty.png`, `45-r04-checkin-filled-ready.png`, `45-r04-checkin-after-submit.png`; JSON `r04-interaction-evidence.json`.
- Grade: A
- Grade cap: major emotional-data accuracy finding R04-F02 prevents A+ and A++.
- Control inventory: Cancel routes back to Today; Save creates draft status; six mood buttons set one mood; energy/stress sliders adjust 1-10 values; Daily intention field collects the required intention; emotion chips toggle multi-select state; Add/Hide note reveals note textarea; `check in` is honestly disabled until required inputs are present and then submits to Today. The initial selected emotion tags and blank Save behavior need correction.

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | A daily emotional pulse is foundational to SIA and Today. |
| User friction | 4 | The flow is concise and submit gating works, but the enabled blank Save path adds confusion. |
| Visual appeal | 5 | The sheet composition, mood card, sliders, and tag rhythm are polished. |
| Brand fit | 5 | Wellbeing teal supports the reflective task; orange is reserved for save/action. |
| Mobile ergonomics | 5 | Main visible controls meet the 44px target gate in fresh evidence. |
| Accessibility | 5 | Mood buttons, sliders, note disclosure, text input, and submit state expose useful labels/states. |
| Trust/privacy | 3 | A fresh check-in silently starts with four emotional tags selected and allows an empty draft save. |
| Industry best practice | 4 | Validation and submission are working, but self-report forms should not pre-answer subjective emotions. |

| Finding | Severity | Category | Evidence | User Impact | Recommendation | Status | Grade cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R04-F02 | major | trust-privacy | Fresh initial evidence `45-r04-checkin-initial.png` and metrics show `Grateful`, `Calm`, `Hopeful`, and `Focused` at `aria-pressed=true` before the user selects a mood or intention; `45-r04-checkin-save-empty.png` shows `Save` recording a draft status while the required submit remains disabled. | Users may unknowingly submit or save emotional descriptors they did not choose, weakening trust in SIA memory and mood analytics. | Start fresh check-ins with all subjective controls empty unless in explicit update mode; disable or relabel Save until there is meaningful draft data; if loading an existing check-in, change header and action copy to update mode. | proposed | Prevents A+ and A++ |

Decision: needs polish.

### 09 - SIA chat

- Five-second read: A premium SIA conversation with live context, rich cards, text input, suggestion chips, deep links, and voice entry.
- Screen purpose and journey fit: This is the core coach surface and correctly connects Today, goals, meals, workouts, and voice.
- Primary action clarity: Message input, send button, suggestion chips, and inline voice entry all work; top voice icon links to full-screen voice; search is honestly disabled.
- Emotional tone: Smart, supportive, and product-defining, with calm privacy copy in the voice permission state.
- Screenshot/evidence: baseline `../../balencia-screens/output/a-plus-plus-review/R04/09-tabs-sia-phone.png`; fresh states `09-r04-sia-initial.png`, `09-r04-sia-text-send.png`, `09-r04-sia-suggestion-send.png`, `09-r04-sia-voice-permission.png`, `09-r04-sia-voice-ready.png`, `09-r04-sia-voice-sent.png`; JSON `r04-interaction-evidence.json`.
- Grade: A
- Grade cap: major mobile-ergonomics finding R04-F03 prevents A+ and A++.
- Control inventory: Conversations icon and hub link route to conversations; disabled search is honest prototype scope; full-screen voice link routes to `/tabs/sia/voice-fullscreen`; rich-card CTAs route to intelligence, goals, meal, and workout screens; suggestion chips send messages; message field accepts typed input; send appears when text exists; mic opens inline voice permission, then transcript ready state and voice send. Inline voice controls need safe-area repair.

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | SIA is the correct center of the product and cross-domain intelligence is visible. |
| User friction | 4 | Text, chips, deep links, and voice work, but inline voice's final control placement creates avoidable friction. |
| Visual appeal | 5 | Conversation rhythm, rich cards, and SIA context feel premium. |
| Brand fit | 5 | Purple stays in SIA/AI space while orange drives actions. |
| Mobile ergonomics | 3 | The inline voice ready state clips the primary send and cancel controls into the bottom safe area. |
| Accessibility | 4 | Labels and disabled states are clear, but overlapped voice controls reduce practical accessibility. |
| Trust/privacy | 4 | Permission copy is explicit, but the clipped send state undermines confidence at the moment of consent. |
| Industry best practice | 4 | Chat behavior and links meet expectations; voice panel layout does not. |

| Finding | Severity | Category | Evidence | User Impact | Recommendation | Status | Grade cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R04-F03 | major | mobile-ergonomics | Fresh screenshot `09-r04-sia-voice-ready.png` shows the inline voice panel after permission with `Cancel` at the bottom edge and the orange send button partially clipped by the home indicator/tab area. | The primary voice send action is visually obstructed at the moment users need to trust and complete voice input. | Add safe-area padding and place the voice panel above the tab bar, or hide the tab bar during inline voice while preserving a fully visible 56px send target and 44px cancel target. | proposed | Prevents A+ and A++ |

Decision: needs polish.

### 10 - Voice mode (in-chat)

- Five-second read: A direct QA route for SIA inline voice with chat context, permission copy, waveform, transcript, cancel, and send.
- Screen purpose and journey fit: The spec says this should be a mode inside SIA chat; the direct route is acceptable for QA, but it still needs to behave like a trustworthy voice state.
- Primary action clarity: `Allow mic`, `Cancel`, and `Send voice message` work, but the route shows a draft transcript before permission and the ready controls collide with the bottom bar.
- Emotional tone: Useful and focused after permission; trust is weakened by pre-permission transcript text.
- Screenshot/evidence: baseline `../../balencia-screens/output/a-plus-plus-review/R04/10-tabs-sia-voice-inline-phone.png`; fresh states `10-r04-inline-permission.png`, `10-r04-inline-ready.png`, `10-r04-inline-after-send.png`; JSON `r04-interaction-evidence.json`.
- Grade: A
- Grade cap: major trust/mobile finding R04-F04 prevents A+ and A++.
- Control inventory: Conversations and full-screen voice links remain available; disabled search is honest; rich-card links still route; `Cancel` exits to SIA chat; `Allow mic` unlocks voice state; ready-state `Cancel` and `Send voice message` return to SIA chat. The direct permission state exposes a transcript too early and the ready-state controls are clipped.

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | Inline voice is valuable, but the standalone QA route still leaks mode-specific artifacts. |
| User friction | 3 | Permission and send work, yet bottom control collision makes the primary path feel cramped. |
| Visual appeal | 4 | The panel and waveform are attractive, but the bottom composition is not settled. |
| Brand fit | 5 | Orange primary and purple SIA state are aligned. |
| Mobile ergonomics | 3 | Ready-state cancel/send controls overlap the tab/home-indicator area. |
| Accessibility | 4 | Labels are strong, but clipped controls are harder to use. |
| Trust/privacy | 2 | A draft transcript is visible before microphone permission on the direct route. |
| Industry best practice | 3 | Voice permission should precede any transcript and primary controls must clear safe areas. |

| Finding | Severity | Category | Evidence | User Impact | Recommendation | Status | Grade cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R04-F04 | major | trust-privacy | `10-r04-inline-permission.png` shows the draft text `I just did thirty minutes of yoga...` before `Allow mic`; `10-r04-inline-ready.png` shows ready-state Cancel/send controls pushed into the tab bar/home-indicator area. | Users may think Balencia has captured speech before permission, then see the primary send action partially obstructed after permission. | Hide draft transcripts until permission and real/declared transcription state exist; add safe-area padding and position the inline voice panel above, not through, the dimmed tab bar. | proposed | Prevents A+ and A++ |

Decision: needs polish.

### 11 - Voice mode (full)

- Five-second read: A calm full-screen SIA voice environment with permission gate, avatar, waveform, mute/unmute, close, and state changes.
- Screen purpose and journey fit: The immersive SIA voice concept belongs here, but the visible `Send thought`/`Listen again` control makes the screen feel like a prototype state machine rather than a voice-only conversation.
- Primary action clarity: Permission, mute/unmute, close, and simulated speaking all work; the extra state-advance button is not a real user action defined by the spec.
- Emotional tone: Premium-adjacent and intimate, but the artificial control interrupts the "just talk to SIA" promise.
- Screenshot/evidence: baseline `../../balencia-screens/output/a-plus-plus-review/R04/11-tabs-sia-voice-fullscreen-phone.png`; fresh states `11-r04-full-permission.png`, `11-r04-full-listening.png`, `11-r04-full-muted.png`, `11-r04-full-speaking.png`; JSON `r04-interaction-evidence.json`.
- Grade: A
- Grade cap: major product/interaction finding R04-F05 prevents A+ and A++.
- Control inventory: Close returns to SIA chat; Allow microphone opens listening state; mute toggles muted/unmuted with accessible state; `Send thought` advances to thinking/speaking and becomes `Listen again`. The latter works as a prototype driver, but it has no clear user value in the intended full-screen voice product.

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | Immersive SIA voice is a premium differentiator, but visible QA mechanics weaken the product model. |
| User friction | 3 | Users should speak naturally, not decide whether to tap a state-advance CTA. |
| Visual appeal | 4 | The purple environment, waveform, and avatar are composed, though the `S` mark still reads more placeholder than final embodiment. |
| Brand fit | 4 | Purple-dominant SIA space is appropriate, but the CTA-heavy simulation interrupts the quiet voice register. |
| Mobile ergonomics | 5 | Close, mute, and state controls are touch-safe and clear of the home indicator. |
| Accessibility | 4 | Labels and mute state work; the state-advance button is semantically artificial. |
| Trust/privacy | 4 | Permission and raw-audio copy are clear; transcript review/delete remains a handoff dependency after returning to chat. |
| Industry best practice | 3 | Voice assistants should expose listening/speaking/processing states without user-facing debug controls. |

| Finding | Severity | Category | Evidence | User Impact | Recommendation | Status | Grade cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R04-F05 | major | product-sense | Fresh screenshots `11-r04-full-listening.png` and `11-r04-full-speaking.png` show a visible `Send thought` / `Listen again` button with accessible label `Advance voice session state`; the spec defines full-screen voice as voice-only with close and mute as the visible controls. | Users and Figma reviewers get an artificial interaction model instead of the intended immersive voice conversation. | Remove the prototype-only state button from the production/Figma state, or document it as hidden QA tooling; drive listening, thinking, speaking, and return-to-chat transcript handoff through real voice/session states. | proposed | Prevents A+ and A++ |

Decision: needs polish.

## Verification

| Date | Command | Result | Notes |
| --- | --- | --- | --- |
| 2026-05-27 | `node scripts/capture-r04-states.mjs` | passed | Captured 24 fresh R04 interaction states into `../../balencia-screens/output/a-plus-plus-review/R04/` with zero console errors. |
| 2026-05-27 | `npm run check` from `balencia-screens` | passed | lint, typecheck, `verify:routes` (90 screens / 90 specs), `verify:assets` (14 logo assets), `verify:copy` (170 files), and `verify:brand` (170 files) passed. |
| 2026-05-27 | `npm run build` | not run | R04 build gate is `no`. |
