# Screen Design: SIA Voice Mode (Full-Screen Immersive)

**Screen**: 11 of 73
**File**: 11-sia-voice-full-screen.md
**Register**: Product Mode
**Primary action**: Speak freely — conversational voice interaction with SIA
**Tab**: SIA (tab bar hidden — immersive overlay)
**Navigation**: z-50 full-screen overlay. Launched from SIA Chat [09] (Batch 2, not yet drafted) via immersive voice button or long-press on mic button. Close/minimize returns to SIA Chat [09] with conversation preserved.

---

## Purpose

The full-screen voice mode is Balencia's most intimate interaction — a cinematic, distraction-free space where the user and SIA converse by voice alone. No UI chrome, no cards, no lists — just the user's voice and SIA's animated presence. The 3D avatar makes SIA feel like a real coach sitting across from you: attentive when listening, expressive when speaking, thoughtful when processing. This screen should feel like a premium experience that justifies the subscription — the kind of interaction you can't get from typing.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. SIA avatar — the centerpiece, large and animated, demands attention
2. Ambient environment — atmospheric depth, motion, creates an emotional space
3. Waveform visualization — active feedback that someone (user or SIA) is speaking
4. Transcription text — minimal text grounding, confirms what was heard
5. Close/minimize button — escape hatch, deliberately low visual weight
6. Mute button — control, secondary to the conversation itself

**User flow**:
- **Arrives from**: SIA Chat [09] (Batch 2, not yet drafted) via immersive voice button or long-press mic button
- **Primary exit**: SIA Chat [09] — close/minimize returns to chat with full conversation preserved (voice exchange transcribed into chat history)
- **No secondary exits**: This is a focused, single-purpose screen. No navigation to other screens.

---

## Layout

**Scroll behavior**: None (fixed, single viewport — no scrollable content)
**Tab bar visible**: No (immersive overlay at z-50, above everything)

### ASCII Wireframe

```
┌─────────────────────────────┐
│      Status Bar (44pt)      │  ← light-content, transparent
├─────────────────────────────┤
│                        ✕    │  ← close button, top-right
│                             │
│                             │
│    ~ ~ ambient particles~ ~ │
│          ~ ~ ~              │
│     ╭─────────────────╮     │
│     │                 │     │
│     │                 │     │
│     │    SIA Avatar   │     │  ← 3D avatar, ~200pt zone
│     │    (animated)   │     │
│     │                 │     │
│     │                 │     │
│     ╰─────────────────╯     │
│       ◆ purple glow ◆      │  ← subtle glow behind avatar
│                             │
│                             │
│                             │
│   "Your sleep has been      │  ← transcription text
│    really consistent this   │
│    week..."                 │
│                             │  ← 24pt gap
│  ┌─────────────────────┐    │
│  │ ▁▂▃▅▃▂▁▂▃▅▇▅▃▂▁   │    │  ← waveform visualization
│  └─────────────────────┘    │
│                             │  ← 16pt gap
│          [🔇 mute]         │  ← mute button, centered
│                             │
├─────────────────────────────┤
│    Home Indicator (34pt)    │
└─────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Status Bar Zone** — 44pt
   - Content: Light-content style, fully transparent background. Time and indicators visible but unobtrusive.

2. **Close Button Zone** — 44pt
   - Purpose: Escape hatch to return to SIA Chat
   - Content: Close "✕" icon, top-right, 44x44pt

3. **Upper Ambient Zone** — flexible (~80pt)
   - Purpose: Atmospheric breathing room above avatar
   - Content: Ambient particle effects (sparse, floating, warm tones)

4. **SIA Avatar Container** — 200pt
   - Purpose: The centerpiece — SIA's visual presence
   - Content: 3D animated avatar with reactive behaviors

5. **Avatar Glow Zone** — 48pt
   - Purpose: Atmospheric depth behind and below avatar
   - Content: Radial purple glow (#7F24FF at 15-25% opacity, 200pt radius blur)

6. **Mid Spacer** — flexible (~40pt)
   - Purpose: Separation between avatar and text content

7. **Transcription Area** — ~64pt (3 lines max)
   - Purpose: Real-time text feedback of the conversation
   - Content: Current transcription text

8. **Waveform Visualization** — 48pt
   - Purpose: Audio feedback — visual proof of active listening/speaking
   - Content: Animated frequency bars

9. **Mute Button** — 44pt + 16pt gap above = 60pt
   - Purpose: Mic mute control
   - Content: Mute/unmute toggle button

10. **Bottom Safe Area** — 34pt

---

## Components

### Close Button
- **Purpose**: Return to SIA Chat with conversation preserved
- **Visual treatment**: "✕" icon, 20pt, white at 50% opacity (deliberately low-key — not competing with the avatar). 44x44pt touch target.
- **Position**: Top-right corner, 16pt from right edge, 8pt below status bar safe area
- **Behavior**: Tap → screen dismisses (slide down), returns to SIA Chat [09]. The voice conversation is transcribed and appended to the chat history as message bubbles.

### SIA Avatar Container
- **Purpose**: SIA's visual embodiment — the emotional core of voice mode
- **Visual treatment**: Circular container, 200pt diameter, centered horizontally. No visible border — the avatar itself and its glow define the space.
- **3D Avatar specifications** (target):
  - Rendering: React Native GLView or similar 3D rendering context
  - Model: SIA character (humanoid, stylized, not photorealistic — think Pixar-adjacent warmth)
  - Color palette: Warm neutrals for skin/form, purple (#7F24FF) accent elements (eyes, energy particles around form)
  - Ambient motion: Subtle breathing rhythm (slight scale pulse, 4-second cycle), gentle head tilt variations
- **2D Fallback** (if 3D is technically infeasible in V1):
  - Animated circular form with gradient layers
  - Concentric rings that pulse with SIA's speech
  - Abstract warm shape (not a static icon) with reactive morphing
  - Same behavioral states as 3D, simpler visual execution
- **Behavioral states** (4 states with distinct visual treatments):
  
  **Listening** (user is speaking):
  - Avatar: Attentive pose — head slightly tilted, eyes focused forward, still but present
  - Glow: Subtle, steady purple glow at 15% opacity
  - Particles: Minimal, slow-drifting toward avatar (drawn to SIA, representing listening)
  - Waveform: Orange (#FF5E00) bars — representing the user's voice
  
  **Speaking** (SIA is responding):
  - Avatar: Animated — lip sync with audio output, expressive gestures (subtle head nods, hand movements), eyes engaged
  - Glow: Active purple glow at 25% opacity, pulsing gently with speech rhythm
  - Particles: More active, emanating outward from avatar (SIA projecting)
  - Waveform: Purple (#7F24FF) bars — representing SIA's voice
  
  **Processing** (SIA is thinking before responding):
  - Avatar: Thoughtful pose — slight downward gaze, contemplative expression
  - Glow: Purple glow pulses slowly (2-second cycle, 15%→20%→15%)
  - Particles: Orbit around avatar in a slow spiral (representing computation)
  - Waveform: Flat (no audio), replaced by three pulsing dots (same as SIA Processing Animation from Screen 15 but in purple)
  
  **Idle** (no active conversation, brief pause):
  - Avatar: Relaxed breathing animation, neutral expression, occasional subtle movement (blink, slight shift)
  - Glow: Minimal, steady at 10% opacity
  - Particles: Very sparse, slow ambient drift
  - Waveform: Flat, very low amplitude noise visualization (ambient)

### Avatar Glow
- **Purpose**: Atmospheric depth and emotional warmth behind the avatar
- **Visual treatment**: Radial gradient centered on avatar position. Purple (#7F24FF) at center, fading to transparent at edges.
- **Size**: ~200pt radius blur, extends beyond avatar container
- **Behavior**: Opacity and intensity change with avatar state (see behavioral states above)
- **Note**: This purple glow is a dominant purple usage. Combined with purple waveform bars during SIA Speaking state, this screen is the exception to the "max 1-2 purple elements" guideline — voice mode is SIA's domain, and purple is SIA's color. The 60/30/10 rule adjusts here: orange appears only on close/mute and user waveform. Purple takes a larger role as befits a pure SIA experience.

### Ambient Particle System
- **Purpose**: Atmospheric depth — the screen should feel alive, not static
- **Visual treatment**: 15-25 small particles (2-4pt circles), warm tones (white at 5-10% opacity, occasional orange or purple at 5%). Slow, drifting movement with slight randomness. No sharp edges or bright elements — these are ambient and should not distract.
- **Performance**: Keep particle count low. Use Reanimated or similar for performant animation without bridge calls.
- **Behavior**: Direction and density change with avatar state (see behavioral states above)

### Waveform Visualization
- **Purpose**: Real-time audio feedback — visual proof that the system is listening or speaking
- **Visual treatment**: Horizontal bar visualization, centered, 280pt wide x 48pt tall. ~20-24 vertical bars, 4pt wide each, 4pt gap between, rounded caps (2pt radius).
- **Colors**:
  - User speaking: orange (#FF5E00) bars
  - SIA speaking: purple (#7F24FF) bars
  - Idle: white at 10% bars (very low, ambient noise floor)
- **Animation**: Bars react to audio amplitude in real-time. Heights range from 4pt (silence) to 48pt (loud). Smooth interpolation between values (60fps target, ~16ms per frame).
- **Position**: Centered horizontally, above mute button, below transcription text

### Transcription Text
- **Purpose**: Text confirmation of what's being said — grounds the conversation in readable form
- **Visual treatment**: 15pt Sora Regular, white at 70%, center-aligned. Max width: 280pt (prevents text from spanning full screen). Max 3 lines visible (older text fades upward).
- **Behavior**:
  - **User speaking**: Real-time transcription appears word by word as speech is recognized. Text is attributed silently (no "You:" prefix — the orange waveform provides attribution).
  - **SIA speaking**: SIA's response text appears in sync with speech output. Text is attributed silently (purple waveform provides attribution).
  - **Between turns**: Last transcription text remains visible for 3 seconds, then fades to 40% opacity.
- **Position**: Centered horizontally, vertically between avatar glow zone and waveform

### Mute Button
- **Purpose**: Toggle microphone on/off
- **Visual treatment**: Circular button, 48pt diameter, centered horizontally.
- **Sub-elements**:
  - Unmuted (default): Microphone icon, 22pt, white at 70%. Transparent bg with 1pt white at 10% border.
  - Muted: Microphone-off icon (slash through), 22pt, white at 40%. Red (#F44336) bg at 15% opacity, 1pt red at 20% border. "muted" label below (11pt Sora Regular, white at 30%).
- **Size**: 48pt diameter, 44pt touch target (48pt diameter exceeds 44pt minimum)
- **Position**: Centered horizontally, below waveform, 16pt gap

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Deep black base |
| Close button | #FFFFFF at 50% | white/50 | Low-key escape |
| Avatar glow (center) | #7F24FF at 15-25% | purple/15-25 | State-dependent intensity |
| Ambient particles | #FFFFFF at 5-10% | white/5-10 | Atmospheric, barely visible |
| Particle accents (rare) | #FF5E00 at 5%, #7F24FF at 5% | orange/5, purple/5 | Occasional color hints |
| Waveform (user) | #FF5E00 | orange | User voice attribution |
| Waveform (SIA) | #7F24FF | purple | SIA voice attribution |
| Waveform (idle) | #FFFFFF at 10% | white/10 | Ambient noise floor |
| Transcription text | #FFFFFF at 70% | white/70 | Readable but not dominant |
| Mute button (unmuted) | #FFFFFF at 70% icon, white/10 border | white/70 | Default mic state |
| Mute button (muted) bg | #F44336 at 15% | red/15 | Warning state for muted |
| Mute button (muted) icon | #FFFFFF at 40% | white/40 | De-emphasized when muted |
| "muted" label | #FFFFFF at 30% | white/30 | Confirmation text |

**60/30/10 note**: This screen is an exception to the standard ratio. Purple is dominant here (avatar glow, SIA waveform, avatar accent elements) because this is a pure SIA experience — SIA's domain, SIA's color. Orange appears on user waveform and close/mute interactive elements only. Green is absent (no completion states). The emotional palette is purple (SIA) + warm neutrals (ambient) with orange reserved for user-attributed elements. This is intentional and does not break the system — it reinforces that purple = SIA, and when you're in SIA's space, purple leads.

---

## Interaction States

### Close Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | "✕", white at 50% | — |
| Pressed | white at 30%, scale(0.9) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Mute Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default (unmuted) | Mic icon, white/70, transparent bg, white/10 border | — |
| Pressed | scale(0.93), bg white at 5% | light impact |
| Muted | Mic-off icon, white/40, red/15 bg, red/20 border, "muted" label | medium impact (on toggle to muted) |
| Unmuting | Mic icon restores, red bg fades out | medium impact (on toggle to unmuted) |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Avatar (state transitions)
| Transition | Visual | Haptic |
|------------|--------|--------|
| Idle → Listening | Avatar shifts to attentive pose (520ms ease-flow), glow steadies, waveform activates orange | — |
| Listening → Processing | Avatar shifts to thoughtful pose (520ms ease-flow), waveform flattens, processing dots appear | — |
| Processing → Speaking | Avatar animates to speaking (280ms ease-out-soft), glow intensifies, waveform activates purple | — |
| Speaking → Idle | Avatar relaxes (520ms ease-flow), glow dims, waveform settles to ambient | — |
| Speaking → Listening | Quick transition — avatar shifts attentive (280ms), waveform switches orange | — |

### Loading States
Voice mode uses real-time processing indicators rather than skeleton loading. On mode entry: waveform visualizer shows idle pulse animation while audio stream initializes (<500ms). SIA response generation shows the purple orb breathing animation (scale 0.95→1.05, 1.5s ease-in-out loop) as the processing state. Transcription text streams in word-by-word as recognized — no skeleton placeholder for text. If voice model takes >3s to initialize, a "Connecting to SIA..." label (14pt Sora Regular, white at 50%) appears below the orb.

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Close button | Dismiss overlay, return to SIA Chat [09] |
| Tap | Mute button | Toggle mic mute/unmute |
| Swipe down (>120pt) | Full screen | Dismiss overlay (same as close button) |
| Speak | Microphone | SIA listens and responds (primary interaction) |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Screen overlay | Open | Slide up from bottom (y: 100%→0), backdrop fades to ink-900 100% | 520ms | ease-flow |
| Screen overlay | Close | Slide down (y: 0→100%), fade out | 280ms | ease-out-soft |
| Avatar mount | Screen open (after overlay settles) | Scale(0.8→1) + fade-in, glow expands from center | 1200ms | ease-flow (signature) |
| Avatar breathing | Continuous (idle) | Subtle scale pulse (1→1.015→1), y offset (0→-2pt→0) | 4000ms per cycle | sinusoidal |
| Avatar lip sync | SIA speaking | Morph targets driven by audio amplitude | real-time | — |
| Avatar state change | State transition | Pose blend between states | 280-520ms | ease-flow |
| Glow intensity | State change | Opacity interpolation (e.g., 15%→25%) | 520ms | ease-out-soft |
| Glow pulse | Processing state | Opacity cycles (15%→20%→15%) | 2000ms per cycle | sinusoidal |
| Particles direction | State change | Particle velocity vectors adjust (toward avatar for Listening, outward for Speaking, orbital for Processing) | 520ms blend | ease-out-soft |
| Waveform bars | Audio input | Bar heights interpolate to audio amplitude values | ~16ms (60fps) | linear interpolation |
| Waveform color | State change (user↔SIA) | Color crossfade (orange↔purple) | 280ms | ease-out-soft |
| Transcription text | New word recognized | New word appends with fade-in | 160ms | ease-out-soft |
| Transcription fade | 3s after last speech | Text opacity 70%→40% | 520ms | ease-out-soft |
| Mute toggle | Tap mute | Icon crossfade (mic↔mic-off), bg color transition | 280ms | ease-out-soft |
| Processing dots | Processing state active | Three dots sequential scale pulse (1→1.4→1, 160ms stagger, loop) | 480ms per cycle | ease-out-soft |

**Screen transition**:
- **Enter**: Overlay slides up from bottom, 520ms ease-flow. Tab bar is hidden immediately. Avatar entrance is a signature moment — scale(0.8→1) + glow expansion, 1200ms ease-flow, begins after overlay settles (160ms delay).
- **Exit**: Overlay slides down, 280ms ease-out-soft. Tab bar reappears. SIA Chat [09] underneath receives transcribed conversation messages.

---

## Empty States

### First use
The user has never used voice mode before:
- Avatar enters with the signature animation (1200ms)
- SIA speaks first (no awkward silence): "Hey. I'm here. You can talk to me about anything — goals, how your day went, or just think out loud. I'm listening."
- Transcription shows SIA's words as they're spoken
- After SIA finishes, waveform switches to orange (Listening state), waiting for user

### Silence / no speech detected (10+ seconds)
- Avatar remains in Listening state for 10 seconds
- After 10s with no speech: Avatar transitions to gentle Idle, SIA speaks a soft prompt: "Take your time. I'm here when you're ready." (transcription shows this)
- No timeout or auto-dismiss — the user controls when to leave

### Microphone permission denied
- Avatar in Idle state
- Centered message (replaces transcription area): "Balencia needs microphone access for voice mode." — 15pt Sora Regular, white at 70%
- "Open settings" link: 15pt Sora Semibold, orange (#FF5E00), tappable → opens iOS Settings
- Close button still functional
- No waveform (static flat bars, white at 5%)

### Network error
- Avatar freezes in last pose, glow dims to 5%
- Transcription area shows: "Connection lost. SIA can't hear you right now." — 15pt Sora Regular, white at 50%
- "try again" button: 44pt tall, ink-brown-800 bg, orange text, pill shape, centered
- Auto-retry in background (3 attempts, 5-second intervals)

---

## Motivation Adaptation

- **Low motivation**: No changes. Voice mode is inherently low-effort (just talk). SIA adapts tone in her responses (gentler, less data-heavy), but the UI remains identical.
- **Medium motivation**: Default experience.
- **High motivation**: No changes. The interface is minimal by design. SIA adapts her conversational depth (more data-specific, more challenging questions), but the UI remains identical.

Note: Motivation-tier adaptation for voice mode is entirely in SIA's conversational tone and content, not in the visual interface. The screen's visual simplicity is its feature — it doesn't change.

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Transcription text | Sora | Regular (400) | 15pt | 20pt | #FFFFFF at 70% |
| Mute button "muted" label | Sora | Regular (400) | 11pt | 14pt | #FFFFFF at 30% |
| Mic permission message | Sora | Regular (400) | 15pt | 20pt | #FFFFFF at 70% |
| "Open settings" link | Sora | Semibold (600) | 15pt | 20pt | #FF5E00 |
| Network error message | Sora | Regular (400) | 15pt | 20pt | #FFFFFF at 50% |
| "Try again" button label | Sora | Semibold (600) | 15pt | 20pt | #FF5E00 |

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Network failure (mid-conversation) | Avatar freezes in last pose, glow dims to 5%. Transcription shows "Connection lost. SIA can't hear you right now." at white 50%. "try again" button appears (pill, ink-brown-800 bg, orange text). | Auto-retry in background (3 attempts, 5-second intervals). Manual "try again" button re-initiates connection. |
| Microphone permission denied | Avatar in Idle state, waveform flat (white at 5%). Centered message: "Balencia needs microphone access for voice mode." with "Open settings" link (orange). | Tap "Open settings" opens iOS Settings. Close button remains functional. |
| Speech recognition failure | Waveform shows activity but transcription stalls. After 5s, shows "I couldn't catch that. Try again?" | SIA re-enters Listening state automatically. User re-speaks. |
| Audio output failure (SIA can't speak) | Avatar enters Speaking pose but no audio. Transcription shows SIA's response as text. | Fallback to text-only mode. Subtle "audio unavailable" note below transcription. |
| API timeout (SIA processing >8s) | Processing dots continue for up to 8s. After timeout, SIA says "I got lost in thought. Could you say that again?" | SIA re-enters Listening state. User re-speaks or taps close to exit. |

---

## Accessibility

Accessibility follows global standards from `_shared-patterns.md`. Screen-specific notes:

- **Screen reader labels**:
  - Close button: "Close voice mode, return to SIA chat"
  - Mute button (unmuted): "Mute microphone"
  - Mute button (muted): "Unmute microphone, currently muted"
  - Transcription text: Announced dynamically as new text appears (live region)
  - Avatar state: Announced on state change ("SIA is listening", "SIA is speaking", "SIA is thinking")
- **Focus order**: Close button -> Mute button -> Transcription text (read-only)
- **Gesture alternatives**: Swipe down (>120pt) as alternative to tapping close button. All voice interactions have no gesture-based alternative by design (this is a voice-only screen), but close button provides exit.
- **Reduced motion**: When enabled, avatar breathing and particle animations are disabled. State transitions are instant crossfades. Waveform bars update without interpolation animation.
- **Voice Control**: "Close", "Mute", "Unmute" voice commands map to respective buttons.

---

## Cross-References

- **Navigates to**: SIA Chat [09] (Batch 2, not yet drafted) via close/minimize (conversation preserved)
- **Navigates from**: SIA Chat [09] (Batch 2, not yet drafted) via immersive voice button or long-press mic button
- **Shared components with**: None — this screen is visually self-contained. The SIA Processing Animation (three-dot pulse) concept is shared with Create/Edit Goal [15], but the visual treatment differs (purple dots here, orange there).
- **Patterns used**: Close Button (similar to modal close from Screen 15, but positioned differently), 8-State Interaction Model (adapted for 2 interactive elements only), Motion Tokens (160ms/280ms/520ms/1200ms)
- **Patterns established**: Full-Screen Immersive Overlay Template (z-50, tab bar hidden, slide up/down, ambient environment), SIA Avatar (3D/2D with 4 behavioral states), Waveform Visualization (user=orange, SIA=purple), Ambient Particle System, Voice Transcription Display (real-time word-by-word, max 3 lines, fade after silence), Avatar Glow (radial purple, state-reactive), Purple-Dominant Screen (exception to 60/30/10 for pure SIA experiences)
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-04.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U02`
**Prototype route**: `/tabs/sia/voice-fullscreen`
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
| B04-F11 | critical | retention | Build a full voice-session state machine with permission, mute, listening, processing, speaking, transcription, and chat handoff. |
| B04-F12 | major | brand-fit | Create a state-reactive SIA avatar, particles, glow, and waveform behavior; use 2D fallback if needed. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

