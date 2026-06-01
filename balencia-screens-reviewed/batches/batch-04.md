# Batch 04 - Daily Actions And SIA Voice

- Status: `reviewed`
- Screens: 5
- Reviewed: 2026-05-26
- Prototype URL: `http://localhost:3001` (`3000` was already in use)
- Visual evidence: `/private/tmp/balencia-b04/*-phone.png`

| ID | Screen | Route | Spec | Status |
| --- | --- | --- | --- | --- |
| 44 | Water intake | `/tabs/today/water-intake` | `../app_design 3/44-water-intake.md` | `reviewed` |
| 45 | Daily check-in | `/tabs/today/daily-checkin` | `../app_design 3/45-daily-checkin.md` | `reviewed` |
| 09 | SIA chat | `/tabs/sia` | `../app_design 3/09-sia-chat.md` | `reviewed` |
| 10 | Voice mode (in-chat) | `/tabs/sia/voice-inline` | `../app_design 3/10-sia-voice-in-chat.md` | `reviewed` |
| 11 | Voice mode (full) | `/tabs/sia/voice-fullscreen` | `../app_design 3/11-sia-voice-full-screen.md` | `reviewed` |

## Batch Focus

Validate repeated daily actions, emotional check-in quality, SIA chat usefulness, and voice-mode trust.

## Batch Summary

- Ship-ready: None.
- Must-fix: 44 Water intake, 45 Daily check-in, 09 SIA chat, 10 Voice mode (in-chat), 11 Voice mode (full).
- Redesign candidates: 09 SIA chat needs a core interaction pass before visual polish can carry it; 10 and 11 need the resolved voice permission, recording, transcript, and deletion model before implementation; 45 should be revisited if the modal check-in pattern is required rather than a standalone route.
- Resolved decisions:
  - Screen 10 may remain directly routable for QA, but production should treat it as `/tabs/sia` state.
  - Request mic permission only on voice entry; retain transcripts/SIA memory only with clear consent, discard raw audio by default, allow delete/edit, and exclude voice data from model training or human review.
  - Track visual/UX acceptance separately from implementation; no-op controls are production findings rather than design-audit blockers.

## Screen Notes

### 44 - Water intake

- Five-second read: A polished hydration tracker with a large progress ring, quick-add presets, drink log, and weekly context.
- Primary action clarity: The 1 glass CTA is unmistakable, but quick add, custom amount, and target settings are not functional.
- Emotional tone: Satisfying, focused, and motivating; the teal domain treatment feels calm without losing Balencia warmth.
- Screenshot: `/private/tmp/balencia-b04/tabs-today-water-intake-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | A daily hydration command center fits Today and supports the quick habit loop. |
| User friction | 2 | The UI looks one-tap, but the core logging task does not update state. |
| Visual appeal | 4 | Strong progress-ring hero and clean dark composition; lower content is dense but readable. |
| Brand fit | 4 | Orange primary action and wellbeing teal are used appropriately. |
| Mobile ergonomics | 3 | Quick-add targets are 48px tall, but the visible gear setting is not an actual target. |
| Accessibility | 3 | Button labels are readable, but the progress/target controls and settings affordance need stronger semantics. |
| Trust/privacy | 4 | Low sensitive-data risk; static tracking weakens confidence more than privacy. |
| Industry best practice | 2 | A tracker must immediately log, undo/delete, custom-enter, and show success/error states. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | retention | After clicking `1 glass`, the live route still shows `5 / 8`, `1250 ml`, and `63% of daily target`; clicking `custom ml` opens no input, sheet, or dialog. | Users cannot perform the screen's primary habit action, so the hydration loop is only decorative. | Wire preset logging, custom numeric entry, success feedback, undo/delete, XP target celebration, and failure recovery. | proposed |
| major | accessibility | The header shows a gear icon, but the only interactive header element detected is `Back`; the gear is not a button or link. | Users cannot adjust the water target, and assistive technology users will not discover the setting. | Render the gear as a 44x44 button with an accessible label such as `Adjust water target` and open the target-setting sheet. | proposed |

Decision: Must fix before launch; visual direction is strong once logging and target settings work.

### 45 - Daily check-in

- Five-second read: A gentle morning check-in sheet with mood, energy, stress, intention, emotion tags, and XP.
- Primary action clarity: Check in is clear, but the form is prefilled and static rather than collectable.
- Emotional tone: Calm and reflective, though the canned intention makes the ritual feel less personal.
- Screenshot: `/private/tmp/balencia-b04/tabs-today-daily-checkin-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | A fast emotional pulse belongs in Today and gives SIA useful context. |
| User friction | 1 | Users cannot actually select, type, adjust, save, submit, or dismiss the check-in. |
| Visual appeal | 4 | The composition feels warm and premium; mood and slider sections are easy to scan. |
| Brand fit | 4 | Wellbeing teal stays in the domain role, with orange reserved for save/submit. |
| Mobile ergonomics | 2 | Several frequent controls are 20-32px tall, below the 44px target gate. |
| Accessibility | 2 | Mood state, sliders, and intention are visual previews rather than accessible form controls. |
| Trust/privacy | 2 | Prefilled emotional data and enabled submit actions can make the reflective ritual feel fake. |
| Industry best practice | 1 | Check-in flows need real form state, validation, submit/dismiss, and unsaved-change handling. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | retention | The route has `0` input/textarea/select elements; after tapping `Happy`, `aria-pressed` stays `false`, no mood is selected, and `Save` / `check in` leave `/tabs/today/daily-checkin` unchanged. | Users cannot record mood, energy, stress, intention, or complete the daily check-in. | Convert the screen to controlled form state: selectable mood buttons, accessible sliders, real text inputs, disabled submit until valid, save/submit persistence, and dismiss behavior. | proposed |
| major | mobile-ergonomics | `Cancel` and `Save` measure 53x20 and 37x20; emotion chips and `Add a note` are 32px tall. The spec requires 44x44pt interactive targets. | The most repeated check-in actions are harder to tap and less forgiving on mobile. | Expand hit areas to at least 44x44, keep the visual rhythm, and expose sliders with proper min/max/step semantics. | proposed |

Decision: Must fix before launch; keep the emotional tone, but replace preview controls with real check-in behavior.

### 09 - SIA chat

- Five-second read: A rich SIA conversation with inline meal, mission, workout, and connection cards.
- Primary action clarity: The composer and chips imply conversation, but text, suggestions, mic, and voice entry are inert.
- Emotional tone: Smart and product-defining, though the static behavior undermines the "SIA gets me" promise.
- Screenshot: `/private/tmp/balencia-b04/tabs-sia-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | This is the core Balencia experience and the right place for cross-domain intelligence. |
| User friction | 1 | Users cannot type, send, use suggestion chips, or enter voice from the chat. |
| Visual appeal | 4 | Rich inline cards are compelling and the chat rhythm is clear. |
| Brand fit | 3 | SIA and domain content are present, but purple suggestion chips diverge from the orange chip spec and the chat opens as a static showcase. |
| Mobile ergonomics | 2 | The composer mic is 36x36, suggestion chips are 36px tall, and inline action buttons can be 32px tall. |
| Accessibility | 2 | No real input field exists, and several action controls are below the touch target standard. |
| Trust/privacy | 3 | The live-context claim is useful, but static responses can make SIA feel scripted. |
| Industry best practice | 2 | AI chat needs real input, send states, streaming/thinking, chip behavior, and deep links. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | retention | The route has `0` real inputs; `Message SIA` is rendered as static text. Clicking `Voice input`, top-bar `Open full-screen voice mode`, and `Tell me more` leaves `/tabs/sia` unchanged and no voice panel appears. | Users cannot converse with the product's central coach by text, chip, or voice. | Implement a real chat input, send/streaming states, suggestion-chip-to-message behavior, mic-to-inline voice, and top-bar transition to full-screen voice. | proposed |
| major | navigation | Runtime interactives include the conversations links, but rich-card CTAs such as `View more`, `View mission`, and `Add to plan` are not navigational links; `Start workout` is a button with no observed navigation. | SIA appears to offer embedded app intelligence but cannot move users into the relevant task screens. | Make rich inline cards and CTAs deep-link to the appropriate domain, mission, meal, workout, or detail screens with clear pressed/loading states. | proposed |
| major | mobile-ergonomics | `Voice input` is 36x36, suggestion chips are 36px tall, and `Start workout` is 32px tall. | Core chat actions are below Balencia's 44x44 mobile quality gate. | Add 44px hit areas around composer icons, chips, and inline CTAs while preserving their compact visual size. | proposed |

Decision: Must fix before launch; the visual shell is promising, but SIA must become genuinely conversational and navigational.

### 10 - Voice mode (in-chat)

- Five-second read: A voice-input panel over the SIA chat with waveform, listening status, draft transcript, cancel, and stop.
- Primary action clarity: Stop and cancel are visible, but the mode is not reachable from SIA chat and does not exit or send.
- Emotional tone: Focused and useful at a glance; trust drops because it says it is listening without a real voice state.
- Screenshot: `/private/tmp/balencia-b04/tabs-sia-voice-inline-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | Short voice input inside chat is valuable, but the spec says this is a mode, not a separate screen. |
| User friction | 1 | Users cannot enter it from chat, cancel it, stop recording, or send a voice message. |
| Visual appeal | 4 | The panel, draft bubble, and dimmed tab bar communicate the intended mode clearly. |
| Brand fit | 3 | The visual treatment is polished, but the in-chat spec expects orange voice emphasis while the live waveform leans purple. |
| Mobile ergonomics | 3 | Main voice controls are large enough; a carried-over `Start workout` action remains 32px tall. |
| Accessibility | 2 | The orange stop/send button has no accessible label and the transcript is not a live region. |
| Trust/privacy | 2 | The UI claims `listening...` with a fabricated transcript before microphone permission or real capture is represented. |
| Industry best practice | 1 | Voice input needs permission, live transcription, cancel/send transitions, silence handling, and errors. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | navigation | In `/tabs/sia`, tapping the mic does not open this mode. On direct `/tabs/sia/voice-inline`, tapping `Cancel` and the stop button leaves the route unchanged. | Users cannot start, cancel, or send a short voice message from chat. | Implement voice as state inside `/tabs/sia`: mic tap opens the panel, cancel restores text mode, stop/send posts the transcript, and silence can auto-send or auto-cancel per policy. | proposed |
| major | trust-privacy | The direct route displays `listening...` and a draft transcript, but no microphone permission, real audio capture, permission-denied state, or no-speech state is present. | Users may think Balencia is recording when it is only showing a mock, or may not understand when recording actually starts. | Add microphone permission flow, idle/listening/processing/error states, real transcript source, no-speech timeout, and clear recording status. | proposed |
| major | accessibility | The primary orange stop/send button is unlabeled in the accessibility tree. | Screen reader users encounter a critical voice-control button without knowing what it does. | Add dynamic labels such as `Stop recording and send message` and `Send voice message`, plus a live region for transcription. | proposed |

Decision: Must fix before launch; use this as a visual reference, but integrate it as a real SIA chat mode.

### 11 - Voice mode (full)

- Five-second read: A quiet immersive SIA voice scene with a glowing avatar mark, waveform, close, and mute.
- Primary action clarity: Close is clear and mute is visible, but speaking and mute state are not functional.
- Emotional tone: Calm and premium-adjacent; the static `S` avatar feels below the intimacy promised by the spec.
- Screenshot: `/private/tmp/balencia-b04/tabs-sia-voice-fullscreen-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | Immersive SIA voice can be a premium differentiator if the conversation is real. |
| User friction | 2 | The surface is simple, but there is no actual voice interaction or mute state. |
| Visual appeal | 3 | The glow and spacing are attractive, but the avatar is a static placeholder. |
| Brand fit | 3 | Purple-dominant SIA space is appropriate; the SIA embodiment needs more craft. |
| Mobile ergonomics | 4 | Close and mute targets are comfortably sized. |
| Accessibility | 3 | Close and mute are labeled, but mute state does not change or announce. |
| Trust/privacy | 2 | Voice recording, permission, transcription, and transcript handling are not represented. |
| Industry best practice | 2 | Full-screen voice assistants need stateful listening/speaking/processing, permission, mute, and failure states. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | retention | The route has no input or voice state; tapping `Mute microphone` leaves text unchanged, `aria-pressed` remains absent, and the route stays static. | Users cannot have the immersive SIA voice conversation this screen exists to provide. | Build a voice-session state machine: permission, listening, processing, speaking, idle, muted/unmuted, transcription, close/minimize, and transcript handoff back to chat. | proposed |
| major | brand-fit | The live centerpiece is a static `S` inside circular rings rather than the spec's 3D avatar or reactive 2D fallback with listening/speaking/processing states. | Balencia's most intimate SIA moment can feel like a placeholder rather than a premium coach experience. | Create a state-reactive SIA avatar, particles, glow, and waveform behavior; use 2D fallback if 3D is not feasible for V1. | proposed |

Decision: Must fix before launch; keep the minimal immersive direction, but the SIA embodiment and voice trust model need a serious pass.
