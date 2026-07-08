# 10-cia-voice-in-chat - hi-fi glass spec

### 1. Header
- **ID:** 10
- **Name:** CIA voice in chat
- **Route(s) covered:** No live route; in-chat voice state inside CIA Chat [09].
- **Tab:** CIA remains active; bottom nav visible but dimmed.
- **Source:** `work/briefs/10.md`, Balencia canon, component catalog.
- **Batch:** 4

### 2. Purpose
Adds short, practical voice input inside the existing CIA chat without changing routes. It captures speech, shows a draft transcript, lets the member cancel or send, and returns to text mode cleanly.

### 3. Entry & exit
- **Entry:** tap the mic in ChatComposer on CIA Chat [09].
- **Primary exit:** stop/send commits the transcript as a user message and returns to text chat.
- **Secondary exits:** cancel discards, swipe down cancels, tab tap exits voice mode before navigation.
- **Automatic exits:** 3 seconds of silence auto-sends a non-empty transcript; 8 seconds of total silence auto-cancels.
- **Failure exit:** permission and network errors keep partial transcript visible until cancel, settings, or retry.

### 4. Layout anatomy
**Regions, top to bottom:**
1. CIA Chat TopBar, unchanged except voice icon active.
2. Compressed chat history with latest messages visible.
3. Draft transcription bubble in the chat list.
4. VoiceInterfacePanel replacing keyboard area.
5. Status label, waveform, cancel, and stop/send.
6. GlassNavBar dimmed to 40 percent.

**ASCII wireframe (390x844):**
```text
+--------------------------------------+
| CIA.                         voice on |
| CIA  What would help right now?       |
| You  [draft voice transcript...]      |
|                                      |
| +----------------------------------+ |
| | listening.                       | |
| |  ▂ ▄ █ ▆ ▃   ▂ ▅ ▇ ▅ ▂          | |
| | [cancel]              [send]     | |
| | voice becomes text · delete later| |
| +----------------------------------+ |
| Today        CIA       Goals      Me  |
+--------------------------------------+
```

### 5. Components
- **ChatComposer** - replaced by VoiceInterfacePanel while voice is active.
- **VoiceMicGlow** - active mic state inside the panel.
- **NEW: VoiceInterfacePanel** - fixed `.glass-frost` keyboard replacement with status, waveform, and controls.
- **NEW: DraftTranscriptionBubble** - provisional user bubble that can be discarded before sending.
- **NEW: WaveformAmplitude** - orange microphone input bars.
- **BtnGhost** - cancel.
- **BtnPrimary** - stop/send, width locked.
- **ConsentCard** - first-use voice permission and transcript handling.
- **ChipProvenance** - `via OS speech-to-text` shown on transcript details.
- **OfflineBanner, ErrorState, HonestNullState, SkeletonState** - state components.

### 6. Visual treatment
- **Atmosphere:** inherited from CIA Chat: warm dark base, orange radial glow, grain, and a small CIA purple pool.
- **Glass tiers:** VoiceInterfacePanel uses `.glass-frost`; draft bubble uses user orange bubble styling until sent; controls use `.glass-pill`.
- **Semantic glows:** `--glow-you #FF5E00` on waveform and active mic because it is member speech; `--glow-cia #7F24FF` stays in the inherited chat atmosphere; `--glow-done #34A853` flashes when transcript is sent.
- **Type:** Neue Montreal; status label may use one Tiempos italic word only for calm state copy, e.g. *listening*.
- **Privacy note:** small but persistent, never hidden behind a tooltip while recording.

### 7. Content & copy
- **Status:** "listening." / "processing." / "say something, or tap cancel."
- **Cancel:** "cancel"
- **Send:** "send"
- **Permission:** "Microphone access needed."
- **Settings action:** "open settings"
- **Silence:** "No voice detected. Try again or tap cancel."
- **Transcription error:** "Couldn't hear that. Try again."
- **Network:** "Connection lost."
- **Privacy note:** "voice becomes text · delete later"
- **Screen reader entry:** "Voice input mode active. Microphone listening. Speak now or tap stop to send."

### 8. Data & honesty states
- **Transcript:** real = visible text plus `ChipProvenance` "via OS speech-to-text"; low-confidence = words underlined/dimmed with `estimated · low confidence`; honest-null = "not enough audio yet."
- **Audio input level:** real = waveform from device microphone; low-confidence = permissions or noisy input state, waveform muted; honest-null = flat baseline before audio.
- **Silence and max duration timers:** real = local timer; low-confidence not applicable; honest-null = no active recording.
- **Consent controls:** data category = microphone and transcript; source = device microphone/OS speech-to-text; scope = sending text to CIA; retention = transcript in chat history until deletion; export, revoke mic, and delete transcript are named.
- **Raw audio:** not stored. If implementation changes, a new ConsentCard variant is required before release.

### 9. All states
- **Default:** panel slides up, waveform idle, status says "listening."
- **Skeleton:** audio engine boot shows panel geometry and static waveform placeholders for under 500ms.
- **Empty:** no speech after 8 seconds auto-cancels and shows silence toast.
- **Error:** permission denied, transcription failed, network lost, and max-duration reached are separate states with retry/cancel.
- **Success:** transcript solidifies into a sent user bubble, `--glow-done` flashes, CIA thinking indicator appears.
- **Disabled:** send is dimmed when transcript is empty, offline, or permission-blocked.
- **Offline:** partial transcript stays local; send disabled until connection returns or text can be copied.

### 10. Motion & interaction
- **Entry:** panel slides up 200pt over 280ms; nav dims simultaneously.
- **Recording:** waveform bars update with audio amplitude; draft text streams into the bubble.
- **Stop/send:** stop icon crossfades to send, then bubble commits.
- **Cancel/swipe:** panel slides down and draft disappears.
- **Tab tap:** exits voice mode before switching tabs.
- **Reduced-motion:** panel appears instantly, waveform becomes static level bars, draft updates by whole phrases.

### 11. Motivation-tier adaptation
- **Low:** shorter auto-send window copy, fewer spoken suggestions, no evidence chips until after send.
- **Medium:** default voice panel and one privacy note.
- **High:** shows timer, transcript provenance, and source controls in the panel footer.

### 12. Accessibility
- **Contrast:** status, draft, and controls clear AA+ against panel frost and warm dark.
- **Targets:** cancel, stop/send, settings, nav tabs, and mic affordance meet 44px.
- **Screen readers:** transcript updates in a polite live region; cancel/send labels state consequences.
- **Privacy:** consent, revoke, export, and delete are reachable by keyboard/switch control.
- **Reduced-motion:** mirrors Section 10; audio state always has text equivalent.

### 13. Premium checklist
1. **Connects:** spoken logs and questions enter the same CIA chat intelligence as typed messages.
2. **Honest:** transcript confidence, source, storage, and raw-audio handling are explicit.
3. **Premium:** in-place voice panel, no fake route, no dashboard filler.
4. **Consent:** mic and transcript controls are concrete before capture.
5. **Safety:** distress language after send inherits CIA Chat safety handling.
6. **Semantic glow:** member speech, CIA atmosphere, and send completion separated.
7. **States:** default, skeleton, empty, error, success, disabled, offline, permission-denied, and silence covered.
8. **A11y:** live regions, text equivalents, 44px targets, and reduced motion included.
9. **Voice:** calm, precise, sentence case, CIA only.
