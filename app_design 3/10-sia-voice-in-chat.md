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

## Cross-References

- **Navigates to**: Screen [09] — SIA Chat text mode (on send or cancel — returns to same screen, same conversation)
- **Navigates from**: Screen [09] — SIA Chat (mic button tap)
- **Shared components with**: Screen [09] — SIA Chat (shares the entire chat view above the voice panel, top bar, tab bar). Screen [11] — SIA Voice Full-Screen (Batch 3, shares waveform visualization concept but at larger scale with 3D avatar).
- **Patterns used**: User Message Bubble (draft variant), SIA Thinking Indicator (after send), Top Bar, Bottom Tab Bar (dimmed variant), Waveform Visualization (new)
- **Patterns established**: **Voice Interface Panel** — ink-brown-800 bg, slides up from bottom, ~200pt height, contains waveform + controls, replaces keyboard area. **Waveform Visualization** — 24-32 orange bars, responsive to audio input, center-weighted opacity, smooth height animation. **Draft Transcription Bubble** — user bubble variant with orange 10% bg, dashed orange 20% border, white 80% text, cursor blink, solidifies on completion. **Stop/Send Button** — 56pt orange circle, icon morphs from square (stop) to arrow (send), pulsing glow during recording. **Tab Bar Dimmed State** — all tab elements at 40% opacity during overlay modes.
