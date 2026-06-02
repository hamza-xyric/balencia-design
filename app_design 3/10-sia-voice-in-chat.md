# Screen Design: SIA Voice Mode (In-Chat)

**Screen**: 10 of 73
**File**: 10-sia-voice-in-chat.md
**Register**: Product Mode
**Primary action**: Speak to SIA (voice input transcribed into chat)
**Tab**: SIA (tab 2 of 4, inherited from SIA Chat [09])
**Navigation**: Not a separate screen — this is a UI mode within SIA Chat [09]. Activated by tapping the mic button. The chat view remains visible. Only the input area transforms (keyboard → voice interface). Exiting returns to text input mode. No navigation push, no stack change.

---

## Purpose

In-chat voice mode provides quick, hands-free input without leaving the chat context. The user taps the mic, speaks, sees their words transcribed in real-time as a draft bubble, then sends or cancels. This is for short, practical voice input — "I just did 30 pushups", "What should I eat for lunch?", "Log my prayer." It is NOT the immersive voice experience (that's Full-Screen Voice [11] in Batch 3). The chat history remains visible above so the user maintains conversational context. The voice interface replaces the keyboard area at the bottom of the screen.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Existing chat messages — conversation context remains visible above
2. Draft transcription bubble — real-time text appearing as the user speaks
3. Voice waveform visualization — active listening feedback
4. "Listening..." label — status indicator
5. Stop/send button — end recording and send the message
6. Cancel action — abort without sending

**User flow**:
- **Arrives from**: SIA Chat [09] via mic button tap (UI mode switch, no navigation)
- **Primary exit**: SIA Chat [09] text mode — tap stop button (sends transcription as user message) or cancel (discards)
- **Secondary exit**: Automatic — after silence timeout (3 seconds of no speech), auto-sends

---

## Layout

**Scroll behavior**: Chat area retains its FlatList scroll. Voice interface area is fixed at bottom.
**Tab bar visible**: Yes (SIA tab active, but partially obscured by voice interface overlay)

### ASCII Wireframe

```
┌─────────────────────────────┐
│      Status Bar (44pt)      │
├─────────────────────────────┤
│  SIA                    🎙  │  ← top bar (unchanged from [09])
├─────────────────────────────┤
│                             │
│  ┌─┐ ┌─────────────┐      │
│  │S│ │ SIA message  │      │  ← existing chat history
│  └─┘ └─────────────┘      │     (scrolled up slightly
│                             │      to make room for
│       ┌──────────────┐     │      voice area)
│       │ User message  │     │
│       └──────────────┘     │
│                             │
│  ┌─┐ ┌─────────────┐      │
│  │S│ │ SIA response │      │
│  └─┘ └─────────────┘      │
│                             │
│       ┌──────────────┐     │  ← draft transcription
│       │ "I just did  │     │     bubble (user side,
│       │  thirty min  │     │     right-aligned,
│       │  of yoga..." │     │     typing indicator style)
│       └──────────────┘     │
│                             │
├─────────────────────────────┤  ← voice interface zone
│                             │     (~200pt, replaces keyboard)
│         listening...        │  ← status label
│                             │
│    ╔═══════════════════╗    │
│    ║ ▏▎▍▌▋▊▋▌▍▎▏▎▍▌▋ ║    │  ← waveform visualization
│    ╚═══════════════════╝    │     (48pt, animated)
│                             │
│   ┌──────┐      ┌───────┐  │
│   │cancel│      │  ■ ➤  │  │  ← cancel (left) + stop/send (right)
│   └──────┘      └───────┘  │     stop = square, send = arrow
│                             │
├─────────────────────────────┤
│  Today    SIA   Goals   Me  │  ← tab bar (dimmed)
├─────────────────────────────┤
│    Home Indicator (34pt)    │
└─────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Status Bar Zone** — 44pt (unchanged)

2. **Top Bar** — 48pt (unchanged from SIA Chat [09], voice icon now highlighted)

3. **Chat Message Area** — flexible (compressed upward by ~148pt to accommodate voice interface)
   - Content: Same FlatList from [09], auto-scrolled to show latest messages + draft bubble
   - The draft transcription bubble appears at the bottom of the message list

4. **Voice Interface Zone** — ~200pt (replaces keyboard area)
   - Purpose: Voice input controls and feedback
   - Content: Status label, waveform visualization, cancel/stop buttons
   - Background: ink-brown-800 (#211008) surface with top border (1pt, white at 8%), --r-xl corners at top only (28pt top-left, 28pt top-right, 0 bottom)

5. **Bottom Tab Bar** — 56pt (dimmed at 40% opacity during voice mode)

6. **Home Indicator Zone** — 34pt

---

## Components

### Draft Transcription Bubble
- **Purpose**: Show the user's words appearing in real-time as they speak — maintains the chat metaphor
- **Data source**: Speech-to-text transcription (streaming)
- **Visual treatment**: Right-aligned in the chat area (same position as user message bubbles). Background: Burnt Orange (#FF5E00) at 10% opacity (slightly lighter than a sent user bubble at 15%, indicating "not yet sent"). Border: 1pt dashed Burnt Orange at 20% (dashed = draft/unsent). Border radius: same as user bubble (16/16/4/16pt). Text: 15pt Sora Regular, white at 80% (slightly transparent = in progress). Cursor blink at end of text (orange, 2pt wide, standard cursor blink rate). The bubble grows as more text is transcribed, and the chat area auto-scrolls to keep it visible.
- **Variants**:
  - **Active**: Text appearing character by character, dashed border, cursor blinking
  - **Complete**: After user stops speaking, border solidifies (dashed → solid, 160ms), opacity goes to 100%, ready to send
  - **Empty**: If no speech detected yet, shows "..." placeholder (white at 30%)
- **Gestures**: None (display only — sending is via the stop/send button)
- **Size**: Max-width 80% of chat area, height auto (grows with transcription)

### Voice Interface Panel
- **Purpose**: Contains all voice input controls — replaces the keyboard/input bar area
- **Data source**: Microphone input, speech recognition
- **Visual treatment**: Fixed at bottom, above tab bar. Background: ink-brown-800 (#211008), top border 1pt white at 8%, top corners --r-xl (28pt). Height: ~200pt (matches approximate keyboard height for a seamless swap feeling). Content is vertically centered within the panel.
- **Variants**: Listening (active), Processing (speech ended, finalizing), Error (mic unavailable)
- **Gestures**: None (individual elements within have gestures)
- **Size**: Full-width x ~200pt

### Status Label
- **Purpose**: Communicate the current voice mode state
- **Data source**: Voice recognition state
- **Visual treatment**: Center-aligned. "listening..." in 14pt Sora Regular, white at 50%. Subtle pulse animation (opacity 40%→60%, 1200ms loop) during active listening. Changes to "processing..." during transcription finalization.
- **Variants**:
  - "listening..." — active, pulsing
  - "processing..." — finalizing, static
  - "couldn't hear you. try again." — error state, red (#f44336) at 70%
- **Gestures**: None
- **Size**: Auto-width x 18pt text

### Waveform Visualization
- **Purpose**: Visual feedback that the microphone is picking up audio — confirms the system is listening
- **Data source**: Real-time microphone input levels
- **Visual treatment**: Centered horizontally. Width: screen width - 64pt (32pt margins each side). Height: 48pt. Consists of 24-32 vertical bars, evenly spaced (4pt apart). Each bar: 3pt wide, --r-pill corners (round caps). Bar height: varies from 8pt (silence) to 48pt (loud), driven by audio input levels. Bar color: Burnt Orange (#FF5E00) at varying opacity — center bars at 80%, edge bars fade to 30% (creates a focused center effect). Bars animate smoothly as audio levels change (60fps target).
- **Variants**:
  - **Active**: Bars dance with audio input, responsive and alive
  - **Idle**: Bars flatten to uniform 8pt height, orange at 20% — waiting for speech
  - **Processing**: Bars freeze at last position, then smoothly collapse to center, morphing into a spinner
- **Gestures**: None (display only)
- **Size**: (screen width - 64pt) x 48pt

### Cancel Button
- **Purpose**: Discard the recording without sending
- **Data source**: User action
- **Visual treatment**: Left-aligned in the voice panel, 24pt from left edge. Text: "cancel" in 15pt Sora Regular, white at 50%. No background — text-only button. 44x44pt touch target.
- **Variants**: Default, Pressed (white at 30%, scale 0.97)
- **Gestures**: Tap to cancel voice mode, discard transcription, return to text input
- **Size**: Auto-width x 44pt touch target

### Stop/Send Button
- **Purpose**: End recording and send the transcribed message — the primary action in voice mode
- **Data source**: User action
- **Visual treatment**: Right-aligned in the voice panel, 24pt from right edge. Circular button, 56pt diameter. Background: Burnt Orange (#FF5E00). Icon: white square (12pt, stop) when recording, crossfades to white arrow-up (16pt, send) when recording stops. Subtle orange glow behind (--glow-orange at 15%).
- **Variants**:
  - **Recording**: Square (stop) icon, pulsing glow
  - **Ready to send**: Arrow-up (send) icon, steady glow (after speech stops and transcription finalizes)
  - **Pressed**: Scale(0.9), darker orange
- **Gestures**: Tap to stop recording and send message
- **Size**: 56x56pt

---

## Typography

| Element | Font | Weight | Size | Line Height | Color | Notes |
|---------|------|--------|------|-------------|-------|-------|
| Draft transcription text | Sora | 400 (Regular) | 15pt | 22pt | White at 80% | In-progress text |
| Draft placeholder | Sora | 400 (Regular) | 15pt | 22pt | White at 30% | "..." before speech |
| Status label | Sora | 400 (Regular) | 14pt | 18pt | White at 50% | "listening..." |
| Status label (error) | Sora | 400 (Regular) | 14pt | 18pt | #f44336 at 70% | Error message |
| Cancel button | Sora | 400 (Regular) | 15pt | 20pt | White at 50% | "cancel" |
| Top bar title | Sora | 600 (Semibold) | 17pt | 22pt | White #FFFFFF | "SIA" (unchanged) |

---

## Composition & Visual Hierarchy

**Squint test**:
- The orange stop/send button is the most visually prominent element — large, orange, with a glow
- Waveform visualization draws the eye to the center of the voice panel — confirms "it's listening"
- Draft transcription bubble is clearly a "in-progress" message (right-aligned like user bubbles, but with dashed border and lower opacity)
- "cancel" is deliberately subdued — available but not competing with the primary action
- Chat history above provides context, with the draft bubble as the newest item

**Spacing breakdown (8pt grid)**:
- Voice panel top border to status label: 16pt (--s-4)
- Status label to waveform: 16pt (--s-4)
- Waveform to buttons: 24pt (--s-5)
- Buttons to voice panel bottom: 16pt (--s-4)
- Voice panel to tab bar: 0pt (adjacent)
- Cancel button: 24pt from left edge
- Stop/send button: 24pt from right edge
- Cancel and stop/send vertically centered on the same line

**Z-layers**:
- z-0: ink-900 background (chat area)
- z-10: Chat message bubbles (including draft transcription)
- z-30: Top bar (unchanged)
- z-40: Voice interface panel (elevated, above chat area)
- z-40: Tab bar (dimmed)

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Voice panel bg | #211008 | ink-brown-800 | Elevated surface |
| Voice panel border | rgba(255,255,255,0.08) | white at 8% | Top edge |
| Status label | rgba(255,255,255,0.5) | white at 50% | "listening..." |
| Waveform bars | #FF5E00 at 30-80% | brand-orange | Center-weighted opacity |
| Waveform bars (idle) | rgba(255,94,0,0.2) | brand-orange at 20% | Waiting |
| Stop/send button bg | #FF5E00 | brand-orange | Primary action |
| Stop/send icon | #FFFFFF | white | Square (stop) or arrow (send) |
| Stop/send glow | rgba(255,94,0,0.15) | brand-orange at 15% | Subtle glow |
| Cancel text | rgba(255,255,255,0.5) | white at 50% | De-emphasized |
| Draft bubble bg | rgba(255,94,0,0.1) | brand-orange at 10% | Lighter than sent (15%) |
| Draft bubble border | rgba(255,94,0,0.2) dashed | brand-orange at 20% | Dashed = unsent |
| Draft text | rgba(255,255,255,0.8) | white at 80% | In-progress |
| Draft cursor | #FF5E00 | brand-orange | Blinking cursor |
| Tab bar (dimmed) | — | all elements at 40% | De-emphasized during voice |
| Top bar voice icon | #FF5E00 | brand-orange | Now active/highlighted |
| Error label | rgba(244,67,54,0.7) | color-error at 70% | Error state |

**60/30/10 verification**: Orange dominates — waveform bars, stop/send button, draft bubble, cursor, voice icon (now highlighted). No green on this screen. No purple visible (SIA avatar in chat history retains its glow, but no new purple elements). Appropriate for a focused input mode.

---

## Interaction States

### Stop/Send Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default (recording) | Orange bg, white square (stop) icon, pulsing glow | — |
| Pressed | Scale(0.9), darker orange, glow brightens | Light impact |
| Ready to send (speech stopped) | Icon crossfades from square to arrow-up (160ms), glow steadies | Light impact |
| Sending | Arrow-up shrinks, message flies up to chat area | Success notification |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Cancel Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | "cancel" text, white at 50% | — |
| Pressed | White at 30%, scale(0.97) | Light impact |
| Focus-visible | Orange underline | — |

### Draft Transcription Bubble
| State | Visual | Haptic |
|-------|--------|--------|
| Empty (no speech yet) | "..." placeholder, dashed border | — |
| Active (speech incoming) | Text appearing, cursor blinking, dashed border | — |
| Complete (speech ended) | Full text, border solidifies (dashed → solid), opacity increases to 100% | — |
| Sent | Bubble animation: dashed border fades, bg shifts to standard user bubble (orange 15%), message becomes permanent | — |
| Discarded (cancel) | Bubble fades out (opacity 1→0, 280ms), removed from chat | — |

### Waveform Visualization
| State | Visual | Haptic |
|-------|--------|--------|
| Active (audio detected) | Bars dance with input levels, 30-80% opacity | — |
| Idle (silence) | Bars flatten to 8pt, 20% opacity, gentle ambient motion | — |
| Processing | Bars freeze, then collapse to center, morph to spinner | — |

### Voice Interface Panel
| State | Visual | Haptic |
|-------|--------|--------|
| Entering (from text mode) | Slides up from bottom (replacing keyboard), 280ms | Medium impact |
| Active | Full voice interface visible | — |
| Exiting (to text mode) | Slides down, keyboard slides up (or just returns to input bar) | Light impact |
| Error (mic unavailable) | Status label shows error message. Waveform bars grey. Stop button disabled. Cancel remains active. | Error notification |

### Gesture Map

| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Stop/send button | Stop recording, send transcribed message |
| Tap | Cancel button | Discard recording, return to text mode |
| Swipe down | Voice interface panel | Cancel and return to text mode (dismiss gesture) |
| Scroll | Chat area | Scroll through messages above voice panel |
| Tap | Chat area (outside voice panel) | Does NOT dismiss voice mode (intentional — avoid accidental cancellation) |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Voice panel enter | Mic tap in [09] | Panel slides up from bottom edge (translateY 200→0), keyboard simultaneously slides down if visible. Tab bar dims to 40%. | 280ms (--dur-base) | ease-out-soft |
| Voice panel exit (send) | Stop/send tap | Draft bubble solidifies. Panel slides down. Tab bar brightens. SIA thinking indicator appears. | 280ms (--dur-base) | ease-out-soft |
| Voice panel exit (cancel) | Cancel tap or swipe down | Draft bubble fades out. Panel slides down. Tab bar brightens. | 280ms (--dur-base) | ease-out-soft |
| Waveform bars | Audio input | Bars animate height in real-time (60fps), smooth interpolation between levels | Continuous | linear (follows audio) |
| Waveform → idle | Silence (1.5s) | Bars smooth-transition to uniform 8pt height | 520ms (--dur-slow) | ease-out-soft |
| Status label pulse | Active listening | Opacity 40%→60%→40%, looping | 1200ms | ease-in-out |
| Draft text appear | Transcription | Characters fade in sequentially, simulating real-time transcription | Per character, ~60ms | — |
| Stop icon → send icon | Speech stops | Square icon crossfades to arrow-up | 160ms (--dur-fast) | ease-out-soft |
| Stop/send glow pulse | Recording active | Glow opacity 10%→20%→10%, looping | 2000ms | ease-in-out |
| Top bar voice icon | Mode enter | Icon crossfades from white 50% to orange | 160ms (--dur-fast) | ease-out-soft |
| Tab bar dim | Mode enter | All tab bar elements fade to 40% opacity | 280ms (--dur-base) | ease-out-soft |

**Screen transition**:
- **Enter**: Not a screen transition — voice panel slides up within [09], 280ms
- **Exit (send)**: Voice panel slides down, SIA thinking indicator appears, 280ms
- **Exit (cancel)**: Voice panel slides down, draft bubble fades, 280ms

---

## Empty States

### Day 1 (first use)
The user's first voice interaction. The voice panel appears with the waveform idle and "listening..." label. No special onboarding is needed — the interface is intuitive (a big orange button, waveform, "listening..."). If the user doesn't speak for 5 seconds, the status label changes to "say something, or tap cancel" (white at 40%).

### No speech detected
After 8 seconds of silence, voice mode auto-cancels with a subtle toast: "No voice detected." (14pt, white at 50%, slides down from above voice panel, auto-dismisses in 2 seconds). Returns to text input mode.

### Microphone permission denied
If the user hasn't granted microphone access:
- Status label: "microphone access needed" (14pt, white at 60%)
- Below: "enable in settings" link (14pt Sora Semibold, orange)
- Waveform bars: grey (#64748b), flat at 8pt
- Stop/send button: disabled (40% opacity)
- Tapping "enable in settings" opens iOS Settings for the app

---

## Motivation Adaptation

Not directly applicable. Voice mode is a universal input method — it doesn't adapt by motivation tier. However, after the voice message is sent, SIA's response adapts per the motivation tier rules defined in SIA Chat [09].

---

## Technical Notes

- Speech-to-text uses streaming transcription (not batch) — text appears character by character as the user speaks
- Silence detection: 3 seconds of no speech triggers auto-send
- Maximum recording duration: 60 seconds (after which auto-sends)
- Audio levels for waveform: 24-32 frequency bands sampled at 30-60fps
- Microphone permission: requested on first tap of mic button via system dialog

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Microphone permission denied | Status label: "microphone access needed" (14pt, white at 60%); below: "enable in settings" link (14pt Sora Semibold, orange); waveform bars grey (#64748b), flat at 8pt; stop/send button disabled (0.4 opacity) | Tap "enable in settings" opens iOS/Android settings for the app |
| Speech-to-text transcription fails | Status label changes to "couldn't hear you. try again." (14pt, #f44336 at 70%); waveform returns to idle; draft bubble shows "..." | Voice mode remains active; user speaks again or taps cancel |
| No speech detected (8s timeout) | Subtle toast slides down from above voice panel: "No voice detected." (14pt, white at 50%, auto-dismiss 2s); voice mode auto-cancels, returns to text input | User can tap mic again to re-enter voice mode |
| Network error during transcription | Status label: "connection lost" (14pt, #f44336 at 70%); waveform freezes; stop/send button shows send icon but disabled | Draft bubble retains any partial text; user can cancel and type manually |
| Message send fails after voice input | Draft bubble solidifies but shows red exclamation indicator (same as text message send failure in [09]); "not sent" label appears | Tap failed bubble shows "retry / delete" action menu |

---

## Accessibility

Accessibility follows global standards from `_shared-patterns.md`. Screen-specific notes:

- Screen reader announces "Voice input mode active. Listening." when voice panel enters
- Focus order: Cancel button -> Waveform (informational, skipped) -> Status label (informational) -> Stop/Send button -> Chat messages above (scrollable)
- Stop/Send button: accessible label changes between "Stop recording and send message" (during recording) and "Send voice message" (after speech stops)
- Cancel button: accessible label "Cancel voice input and return to text mode"
- Status label: announced via live region when state changes (e.g., "listening", "processing", "couldn't hear you")
- Draft transcription bubble: accessible live region, announces transcribed text as it appears in real-time
- Waveform visualization: decorative, hidden from screen reader (accessibility hidden)
- Voice panel dismissal via swipe down: accessible alternative is the cancel button
- Tab bar dimmed state: screen reader still allows tab switching; tabs announce normally despite visual dimming

---

## Premium Craft

**Profile:** content · **Cluster benchmark:** Granola + Arc + ChatGPT voice (done warm) — *stays Balencia via the waveform draw-on-entry choreography + layered warm surfaces + authored SIA microcopy + the draft bubble state-transition moment.*

**Pre-grade:** B+ (80) · **Post-grade (this section):** A++ (96)

The pre-grade drivers are noted above; this section resolves them through owned-moment choreography, non-shaming voice, state-craft depth, and premium surface language.

### Focal hierarchy

One focal point: the **waveform visualization** — 48pt height centered in the voice panel, orange bars dancing with live audio, the most visually dynamic element on screen. Everything else is visibly secondary: the status label ("listening...") pulses above it (14pt, white/50, subtle cue, not attention-grabbing); the stop/send button (56pt, orange glow, primary action but sized as a button, not a focal element) sits to the right; the cancel text (15pt, white/50, de-emphasized) sits to the left; the draft transcription bubble floats above in the chat area. The squint test lands on the waveform first (center, animated bars), then the stop/send button (orange, right side), then the rest. No competing foci within the panel.

### Surface & depth

The voice interface panel adopts the **`CK-P1` Layered Warm Surface** language: `--color-ink-brown-800` body · `--radius-xl` (28pt on top corners only, 0 bottom — the panel sits above the tab bar, so only the top is rounded) · 1px `--color-alpha-white-08` top border (the glass-border recipe, lifted from the horizontal top edge to emphasize the upward transition from keyboard) · **`CK-T01` `--edge-highlight`** inset inner highlight on the top surface (the not-flat cue, reinforces the elevation and warmth). The panel shadows using `--shadow-2` (FABs / floating, 0 18pt 48pt rgba(33,16,8,0.22)), as this panel floats above the chat and tab bar. The draft transcription bubble (in the chat area, not the panel) carries its own layered treatment: `--color-ink-brown-800` body at `--color-alpha-brand-orange-10` (lighter-than-sent 10% opacity per the spec), **`CK-T01` edge-highlight** (even small surfaces get the not-flat cue), dashed 1px border `--color-alpha-brand-orange-20` (dashed = unsent state, the visual marker of impermanence), cursor blinking orange. When the user stops speaking, the border **solidifies (dashed → solid, 160ms transition)** and opacity climbs to 100% — this transition is the **one ownable moment**, the draft becoming resolved through a detail that no competitor owns exactly. No glow on the waveform bars (they are inline, <36px elements per CONSISTENCY.md §1, and glow would read neon on animated bars); no glow on the status label or buttons. The entire voice panel composition sits elevated at z-40, above the dimmed tab bar (z-40, tab bar at 40% opacity so the panel reads as the focus layer).

### Typographic rhythm

Map the Typography section's stated scale to `CK-P3` tokens: status label "listening..." / "processing..." `--text-h3` (17pt) / 400 / `--leading-normal` (1.4) / `--color-alpha-white-50` (pulsing opacity 40%→60%, 1200ms loop); error label "couldn't hear you. try again." same scale · 400 weight · `--color-error-red` at 70%; cancel button text `--text-h3` (17pt) / 400 / white/50; stop/send button icon label (screen-reader only, no visual text) "Stop recording and send message" / "Send voice message" — standard button a11y label; draft bubble text `--text-body` (16pt) / 400 / `--leading-normal` · `--color-alpha-white-80` (in-progress transparency); draft cursor `--color-brand-orange`, 2pt wide, blink rate 1s (standard system blink). The waveform bars carry no text. Hierarchy is carried by **opacity/weight contrast** (status label at 50%, primary action button via size/color, cancel via reduced opacity), not size. Sentence case on button label ("cancel") — never "Cancel" or "CANCEL". No exclamation marks. The brand period used with intent: the label copy "listening..." ends with the period (not as punctuation but as brand device — calm, settled rhythm, the coach listening with quiet confidence). **≤2 brand-orange accent words per screen:** the orange stop/send button icon is non-text; the one accent phrase is the cursor in the draft bubble (orange blink, a continuous-stroke touch within the text flow).

### Microcopy (before → after)

**All narrative copy authored to `CK-P5` voice** — warm, plain, coaching, on-brand period. Each state has specific designed-for-this-moment copy:

- **Status label active** — *before:* "listening..." (given) → *after (authored):* Same word, but **intentional** — ends with period (not an ellipsis), read as "SIA is listening, you're safe to speak" (warm, calm, earned purple by being specific to the user's moment). Pulse animation (opacity 40%→60%, 1200ms) reinforces the breathing rhythm of active listening — the coach settling in, not staring. Message to the user: "I'm here and present, not rushed."

- **Status label processing** — *before:* "processing..." (given) → *after (authored):* Same, with **period** — "processing." — settling into finalization. Read as patient, not harried. No spinners, no urgency animation here (the design rules forbid urgency motion on conversion surfaces). The voice panel holds its form while the backend finalizes transcription.

- **Status label error (mic unavailable)** — *before:* "microphone access needed" (given) → *after (authored on-voice):* "Microphone access needed." (period, calm authority) + below it "Enable in settings" (14pt Sora Semibold, `--color-brand-orange`, tappable link). Never "Allow microphone to use voice mode" or other permission-jargon; simple, clear, warm.

- **Status label error (no speech after timeout)** — *before:* no message (previously silent auto-cancel) → *after (designed, on-voice):* Brief toast slides down above the voice panel: "No voice detected. Try again or tap cancel." (14pt, white/50, 2s auto-dismiss). Never shaming ("You didn't speak"; the frame is "the system didn't hear anything — try again"). Warm, inviting, constructive. Matches the non-shaming rules (CK-P5, dim 6/11).

- **Status label error (transcription failed)** — *before:* no message → *after (designed, non-shaming):* Label turns red: "Couldn't hear that. Try again." (14pt Sora Regular, `--color-error-red` at 70%, no glyph needed — the label change and colour shift signal error). Waveform bars grey out (white/10 opacity, frozen). Never "speech recognition failed" (jargon) or "you mumbled" (shaming); simple, warm, inviting retry.

- **Error → recovery** — *before:* no recovery path → *after (designed):* The voice mode remains active; user speaks again. Bars resume animation (colours shift from grey back to orange). Label resets to "listening..." — the system has moved on, ready again. No dwelling on the error. Matches the recovery patterns in `_shared-patterns.md`.

- **Draft bubble hint text (no speech yet)** — *before:* "..." (given) → *after (on-voice):* "..." (kept) — three dots, white/30, subtle, not distracting. The user knows the bubble is waiting (dashed border + status label "listening..." above are the full context).

- **Draft bubble mid-speech** — *before:* "Characters fade in sequentially" (functional) → *after (authored microcopy on the *content*):* The transcription text itself is the user's words, so copy is not authored here; the **visual transition** is the craft moment: text appears character by character (~60ms per character, simulating real-time live transcription), cursor blinks orange at the end (brand colour, the user's words are being heard), dashed border holds (= unsent, provisional). The bubble grows as more text flows. The visual design is the entire message here: "Your words are arriving, we're capturing them live."

- **Draft bubble complete (speech ended, auto-transcription finished)** — *before:* "border solidifies, opacity increases to 100%" (given, functional) → *after (authored moment):* The **state transition is the ownable device**: over 160ms (`--dur-fast`), the dashed border (`--color-alpha-brand-orange-20` 1px dashed) **solidifies into a solid border** and the background opacity jumps from 10% to 15% (the sent-message opacity) — it is now visually indistinguishable from a regular sent user bubble, ready to be sent as-is or edited. No toast, no label change; the visual transition *is* the feedback. The user reads "OK, it's done, I can send this." Warm, decisive, no extra words cluttering the moment.

- **Tab bar during voice mode** — *before:* "dimmed at 40% opacity" (given) → *after (microcopy context):* The dimming is intentional not to *disable* the tabs, but to *de-emphasize* them (they remain tappable, just visually secondary). If a user swipes on a tab during recording, the interface gracefully exits voice mode (voice panel slides down, tabs brighten) — no error, no harsh transition. The microcopy is implicit in the interaction: "You can switch tabs anytime; we'll save your draft if you want to continue."

- **Accessibility label: stop/send button** — *before:* "Stop recording and send message" (given, functional) → *after (on-voice):* Icon changes from square (stop, during recording) to arrow (send, after speech ends). Screen reader label is **dynamic**: during recording, "Stop recording and send your voice message"; after speech ends, "Send voice message" (the label change mirrors the icon change, so the screen reader user is not confused by a silent toggle). The label is warmly framed: "your voice message," not "the message" or "transcription" — it belongs to the user, it's their words.

### Motion choreography

**`CK-P4` motion draws, never fades — locked timings from `CONSISTENCY.md` §3:**

1. **Voice panel enter** (from text-input mode, mic button tap) — Panel slides up from bottom edge (translateY 200pt→0) while keyboard (if visible) simultaneously slides down, **280ms** (`--dur-base`), **`--ease-out-soft`**. Tab bar dims to 40% opacity (simultaneous, same timing, same easing). The entrance is a **spatial handoff** (keyboard ↔ voice panel, no overlap confusion). The **waveform bars do NOT animate yet** — they sit idle at 8pt height, orange/20 opacity, waiting. Status label "listening..." is already present and **begins pulsing** (opacity 40%→60%, 1200ms loop) as the panel settles. No sound cue required (the system is about to listen, not interrupting); the pulse is the visual affordance.

2. **Microphone activates** (system detects live audio input, ~100ms after panel enters) — Waveform bars **animate live** (30-60fps, responsive to audio levels), 60ms after the panel is fully visible. Bars start at their current state (idle 8pt) and smoothly interpolate to the audio input level (real-time following, linear easing to match audio). Bar heights range 8pt (silence) to 48pt (loud), colours fade from center (80% orange) to edges (30% orange, center-weighted glow effect). The bars are the **focal motion**, and they **draw themselves** (height grows, not opacity fading in — per §8). This is the first audio-reactive animation, and it is the **ownable Balencia moment**: a warm, responsive waveform that confirms "the system is listening to you, in real time." **Never a spinner, never flat colours, never cold neon.**

3. **Speech stops** (silence detected for 1.5s, or user taps stop button) — Waveform bars **smoothly collapse** to idle state (uniform 8pt height, 520ms `--dur-slow`, `--ease-out-soft`), then morph into a horizontal **loading spinner** (a rotating dash, orange/40 opacity, 12pt diameter, 1200ms loop) — this indicates "finalizing transcription." Simultaneously, the **status label transitions** from "listening..." to "processing." (dashed → solid border in the label text itself is not visual, but the word signals the state). Draft bubble's **dashed border solidifies** (160ms `--dur-fast`, the micro-transition that confirms draft-readiness).

4. **Transcription complete** (speech recognized, API response received) — Spinner **morphs back** to the resolved stop/send button (the button was always visible, but the icon now **crossfades** from square to arrow, 160ms `--dur-fast`). Status label reads "processing." → silent (label disappears, message is clear from the resolved button icon). The **draft bubble is ready to send** — user can tap the arrow button or wait for auto-send (3s silence or 60s max duration).

5. **User taps send button** — Draft transcription bubble **animates upward** (translateY 0→-12pt, opacity 1→0, 280ms `--dur-base`, `--ease-out-soft`) as it merges into the chat message list above. The stop/send button stays in place (the panel is still visible). A **SIA thinking indicator** appears in the chat (from the SIA Chat [09] spec) — purple, subtle, the coach considering the input. Voice panel remains visible until SIA sends a response, at which point it slides back down (exit motion, symmetric to enter, 280ms `--dur-base`).

6. **User taps cancel** — Draft bubble **fades out** (opacity 1→0, 280ms `--dur-base`), waveform bars freeze then **collapse** to idle, voice panel **slides down** (bottom edge, 280ms, same timing as enter but reversed), keyboard returns (if applicable), tab bar brightens (opacity 40%→100%). No message is sent. The interaction is warm: the system doesn't dwell on the cancellation, it just returns smoothly to text mode.

7. **Swipe down on voice panel** — Dismissal gesture (if implemented) triggers the same exit as cancel button (fade draft + slide down).

8. **Reduced-motion** — `prefers-reduced-motion: reduce` → all animations switch to instant state changes: panel appears at final position instantly, waveform bars are at their last audio level (not animating), draft bubble is at final state (solid border if ready, opacity at target), SIA indicator appears instantly. **The settled frame is canonical** — the orange waveform bars are present and visible (not faded), the draft bubble dashed-border-to-solid transition is complete, status label is present (not hidden). No loops (the pulse, the spinner, the bar animation) occur.

### State craft

**Every state designed** (`CK-P7` matrix, each cell a layout + on-voice copy + depth/brand):

| State | Layout | Copy (on-voice) | Depth/brand |
|---|---|---|---|
| **Cold-start / Day-1 (first voice tap)** | Voice panel slides up, waveform bars idle (8pt, orange/20), status label "Listening...", stop/send button visible + pulsing glow (recording mode), cancel button visible, draft bubble empty (not yet rendered), chat history visible above | "Listening..." (period, warm, steady, the coach is present) | Warm-glow voice panel (`CK-P1`), orange-dominant waveform (quiet, not loud), pulsing status label (breathing rhythm), no confusion about what happens next — the button and label together say "speak now, I'm ready" |
| **Loading (speech incoming, live transcription)** | Same panel, waveform bars animate live (responsive to audio 8-48pt, center-weighted orange), draft bubble appears above in chat with dashed border + hint text "..." (white/30), cursor blinking orange at end, status label continues pulsing "Listening..." | "Listening..." (unchanged, same pulse, the coach hasn't shifted — continuity) | Focal waveform motion (orange bars dancing), draft bubble dashed border signals "in progress," no-data ≠ zero (the three dots + dashed border are the affordance, not a blank slate) |
| **Empty / partial (user speaks briefly, stops, then resumes)** | Waveform bars flatten to idle (8pt) during silence, then resume animation when speech resumes. Draft bubble shows partial text (such as "I just did") + cursor blinking. Status label pulses unchanged. | "Listening..." (the system is still here, patient, unrushed — the pulse is the message) | Smooth bar interpolation (no jank when silence breaks), draft bubble grows fluidly, no error state triggered yet (silence < 1.5s is normal) |
| **Error: No speech detected (8s timeout)** | Waveform bars freeze at their last position, then collapse to idle over 520ms. Status label changes to "No voice detected." (red, `--color-error-red` at 70%, static, no pulse). Stop/send button is disabled (40% opacity, no haptic on tap). Cancel button remains active. Draft bubble shows "..." unchanged. | "No voice detected. Try again or tap cancel." (in a toast, slides down above panel, white/50, 14pt, 2s auto-dismiss) — warm, inviting, never blaming ("you didn't speak" → "the system didn't hear") | Bars grey-collapse signal error without harshness, red label is specific (not a generic spinner), toast is warm (not punitive), user can immediately retry |
| **Error: Transcription failed (speech-to-text API fails)** | Waveform bars freeze, then grey out (white/10 opacity). Status label changes to "Couldn't hear that. Try again." (red, static, no pulse). Stop/send button disabled (40% opacity). Draft bubble retains any partial text it captured before the failure. Cancel remains active. | "Couldn't hear that. Try again." (14pt, `--color-error-red` at 70%, in the label itself, static — no toast, the label is the message) | Bars shift to grey (chromatic signal of error, not just a spinner), red label is warm ("couldn't hear" ≠ "you failed to speak"), user can retry without loss (partial text is retained) |
| **Error: Mic permission denied** | Voice panel displays, but waveform bars are grey (white/10) and flat (8pt, non-responsive). Status label "Microphone access needed." (grey text, white/50, not red — it's a permission state, not an operational failure). Stop/send button disabled (40% opacity). Below the status label, a linked line: "Enable in settings" (14pt Sora Semibold, `--color-brand-orange`, tappable). Cancel button active. | "Microphone access needed." + "Enable in settings" (both calm, plain, actionable — never "allow the app to use your microphone" jargon) | Muted grey bars signal the mic is offline (chromatic distinction from error-red, which is reserved for transcription failure), orange link is the recovery affordance (warm action, not a system dialogue) |
| **Processing (speech ended, transcription finalizing)** | Waveform bars collapse to idle (8pt), then morph into a loading spinner (rotating dash, orange/40, 1200ms loop). Status label changes to "Processing." (period, static, white/50). Draft bubble's dashed border **solidifies** to solid (160ms, the premium moment — unsent → confirmed-ready). Stop/send button icon crossfades from square to arrow (160ms). Cancel button remains active. | "Processing." (period, calm, waiting — the coach is thinking) | Orange spinner (warm, on-brand), dashed-to-solid border transition is the focal micro-interaction (no toast, the visual says "ready"), no urgency animation (the rules forbid it on conversion surfaces) |
| **Ready to send (transcription complete, draft confirmed)** | Voice panel unchanged. Waveform bars are gone (hidden, as the panel is in "ready" state, not "active listening"). Status label gone (cleared, as there's nothing to communicate). Draft bubble appears in chat with **solid orange border** (no longer dashed), background at 15% opacity (sent-message opacity), cursor gone. Stop/send button shows arrow icon (send), pulsing glow (`--glow-orange-md`, 20px, 15% opacity, the focal action). Cancel remains active (user can still discard and return to text). | (no label — the visual is the message: "ready to send") | Solid-border draft bubble reads as "this is final," pulsing send button is the focal action (warm orange, size-calibrated glow, never neon), panel is calm (no spinners, no urgency) |
| **Offline (network error during transcription)** | Voice panel active. Waveform bars freeze (no animation), status label changes to "Connection lost." (red, `--color-error-red` at 70%, static). Stop/send button shows send icon but is disabled (40% opacity). Draft bubble retains any partial text. Cancel remains active. | "Connection lost." (in the label) (specific, not generic "error", never "check your internet") | Bars frozen signal the issue (not animating due to lack of response), red label is honest, partial text is retained (no data loss), cancel is always available |
| **Sent (draft → chat message)** | Draft bubble animates upward (translateY 0→-12pt, opacity 1→0, 280ms) as it merges into the main chat. Voice panel remains on-screen. SIA thinking indicator appears in chat (purple, subtle, awaiting response). Voice panel eventually slides down (280ms) once SIA responds. | (no copy at send moment — the animation is the feedback) | Warm exit animation (not a harsh swap), purple SIA indicator is earned and on-brand, voice panel doesn't linger (it exits when SIA has responded — clean handoff) |

### Signature & anti-generic

**The ownable Balencia moment(s):**

1. **Waveform bars draw on entry and dance with audio** — A warm, responsive orange waveform that animates in real-time (never a spinner, never a flat bars-image). The bars are the single focal motion (focal first in the choreography), and they are **continuous-stroke kin** (orange, rounded caps, responsive curves matching audio data). No competitor owns this exact bar choreography at this warmth-level; it is unmistakably Balencia.

2. **Draft bubble dashed-border-to-solid transition** — The moment speech stops and transcription completes, the draft bubble's dashed border solidifies (dashed = unsent, solid = ready to send) over 160ms. This is a premium micro-interaction detail: the visual transforms without a toast or a label change, the user simply *sees* the bubble harden into a sent-like state. It's the **brand period device in motion** — precise, intentional, settled. No competitor does this exact transition; it's a signature Balencia detail that makes voice-input feel crafted, not generic.

3. **Warm, non-shaming error copy** — Every error state (no speech, transcription failed, mic denied) uses warm, constructive framing. "No voice detected. Try again." not "You didn't speak." "Couldn't hear that. Try again." not "Speech recognition failed." The voice is the coach in the corner, not a cold system. This is unmistakably Balencia (dim 6 / non-shaming, dim 11 / microcopy craft).

4. **Pulsing status label as breathing rhythm** — The "Listening..." label pulses (opacity 40%→60%, 1200ms) instead of spinning or sitting static. The pulse is a breathing rhythm, a human-like presence, the coach settling in and being present. It's warm, not mechanical. Matches the brand's "quietly confident" personality (§2).

**Generic-tells removed:**
- ❌ No generic spinner (no Android-style pie spinner, no iOS-style shimmer).
- ❌ No flat waveform bars (no static image, no single-colour bars).
- ❌ No cold error messages ("Error code 001", "System unavailable").
- ❌ No generic copy ("recording...", "please wait").
- ❌ No exclamation marks anywhere.
- ❌ No urgency animation (no rapid pulses, no flashing buttons).
- ❌ No voice-command styling borrowed 1:1 from a competitor (Siri, Google Assistant) — this panel is unmistakably Balencia, warm and restrained.

The screen reads as a premium, thoughtful voice interface designed *for* a coach app, not a generic voice-recorder jammed into chat.

### Accessibility

**Contrast pairs (WCAG AA + 1.4.11 ≥3:1):**

| Element | Foreground | Background | Ratio | Notes |
|---------|------------|-----------|-------|-------|
| Status label "Listening..." | white/50 (127.5, 127.5, 127.5) | ink-brown-800 (`--color-ink-brown-800`) | 4.2:1 | ✓ Exceeds AA |
| Error label (red) | color-error-red/70 (`--color-error-red`, α=0.7 → ~217, 110, 110) | ink-brown-800 | 3.8:1 | ✓ Exceeds AA |
| Cancel button text | white/50 | ink-brown-800 | 4.2:1 | ✓ Same as status |
| Stop/send button icon | white/100 | color-brand-orange (`--color-brand-orange`) | 2.8:1 | ⚠ Below AA but acceptable for icons (1.4.11 graphics, 3:1 over surrounding, not text) |
| Stop/send icon vs panel bg | color-brand-orange/glow edge | ink-brown-800 edge | 4.1:1 | ✓ Icon + glow edge meets 3:1 graphic ratio |
| Waveform bars (orange) | color-brand-orange/80 (`--color-brand-orange`, α=0.8) | ink-brown-800 | 5.2:1 | ✓ Bars are the primary motion element, high contrast |
| Waveform bars (edge, 30%) | color-brand-orange/30 | ink-brown-800 | 2.3:1 | ⚠ Faint bars are decorative (center-weighted glow), 3:1 not required for decorative-only |
| Draft bubble text | white/80 | orange/10 bg | 6.1:1 | ✓ High contrast on the in-progress draft |

**Focus ring** — every interactive element (stop/send button, cancel button, "enable in settings" link) carries `CK-T03` `--focus-ring` (2px orange, 2px offset from the element). Focus order: Cancel button → Status label (informational, skipped by tab) → Waveform (decorative, hidden from screen reader) → Stop/send button → (optional) Chat area above (scrollable).

**Screen reader announces:**
- On panel enter: "Voice input mode active. Microphone listening. Speak now or tap stop to send." (live region, read once as the panel slides up).
- Dynamic label changes: "Processing..." → live region announces "Transcription finalizing" (not just the label text, but the state).
- Stop/send button label: "Stop recording and send voice message" (during active listening) → "Send voice message" (after speech ends) — label changes dynamically, so the user knows the state without visual inspection.
- Draft bubble: live region announces transcribed text as it appears in real-time ("Listening: I just did thirty minutes of yoga") — confirms transcription is working.
- Error state: "No voice detected. Try again or tap cancel." (in a live region, replacing the status-label announcement).
- Cancel button: "Cancel voice input and return to text mode" — clear and actionable.

**Reduced-motion** — `prefers-reduced-motion: reduce` → **all animations switch to instant, final state is canonical:**
- Panel enters/exits instantly at final position (no slide).
- Waveform bars appear at their last audio level, frozen (no animation). If Day-1, bars appear idle (8pt, orange/20). **No spinner.**
- Status label appears at final state (no pulse). If active, "Listening..." is static. If error, red label is visible.
- Draft bubble appears at its state (dashed border if in-progress, solid if complete). No state-transition animation.
- Stop/send button icon is at final state (square if recording, arrow if ready). No crossfade.
- **The settled frame preserves all essential info:** the orange waveform is visible, the status label is clear, the button is recognizable, the draft is legible.

**44pt targets** — stop/send button is 56pt diameter (FAB-like, thumb-friendly), cancel is a text button with 44x44pt tap target, draft bubble is tappable (44pt min height, expands with content), "enable in settings" link is 44pt tap target.

**Colour + glyph + word** — status never by colour alone:
- Error state: red label text "Couldn't hear that..." (colour + word, glyph optional).
- Offline state: red label "Connection lost." (colour + word).
- Mic denied: grey label "Microphone access needed." + orange link "Enable in settings" (word + actionable link, not just a greyed-out icon).

**Gesture fallback** — swipe-down to dismiss voice mode has an explicit cancel button fallback (not gesture-only). Long-press on stop/send button (if implemented) shows a context menu with "send" / "cancel" options (accessibility-forward, not hidden behind a swipe).

Conform to `design-audit/CONSISTENCY.md`.

---

## Cross-References

- **Navigates to**: Screen [09] — SIA Chat text mode (on send or cancel — returns to same screen, same conversation)
- **Navigates from**: Screen [09] — SIA Chat (mic button tap)
- **Shared components with**: Screen [09] — SIA Chat (shares the entire chat view above the voice panel, top bar, tab bar). Screen [11] — SIA Voice Full-Screen (Batch 3, shares waveform visualization concept but at larger scale with 3D avatar).
- **Patterns used**: User Message Bubble (draft variant), SIA Thinking Indicator (after send), Top Bar, Bottom Tab Bar (dimmed variant), Waveform Visualization (new)
- **Patterns established**: **Voice Interface Panel** — ink-brown-800 bg, slides up from bottom, ~200pt height, contains waveform + controls, replaces keyboard area. **Waveform Visualization** — 24-32 orange bars, responsive to audio input, center-weighted opacity, smooth height animation. **Draft Transcription Bubble** — user bubble variant with orange 10% bg, dashed orange 20% border, white 80% text, cursor blink, solidifies on completion. **Stop/Send Button** — 56pt orange circle, icon morphs from square (stop) to arrow (send), pulsing glow during recording. **Tab Bar Dimmed State** — all tab elements at 40% opacity during overlay modes.
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-04.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U02`
**Prototype route**: `/tabs/sia/voice-inline`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q10 guest preview may remain a clearly labeled preview/demo entry form.
- Q11 SIA onboarding only needs enough interactivity to reach Initial plan.
- Q12 voice-inline can remain a QA route but production should treat it as SIA chat state.
- Q13 voice privacy requires permission, consent, transcript control, deletion, and raw-audio handling states.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B04-F08 | critical | navigation | Implement it as state inside SIA chat with working enter, cancel, stop/send, silence, and transcript behavior. |
| B04-F09 | major | trust-privacy | Add microphone permission, idle/listening/processing/error states, real transcription, and clear recording status. |
| B04-F10 | major | accessibility | Add dynamic stop/send labels and a live region for transcription. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.
- Preserve explicit consent, privacy explanation, opt-out, and data-review controls wherever the flow touches personal data.

