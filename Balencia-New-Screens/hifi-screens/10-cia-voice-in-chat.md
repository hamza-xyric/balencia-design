# 10-cia-voice-in-chat - A+++ hi-fi mobile spec

## Header
- **Source ID:** 10
- **Source spec:** `Balencia-New-Screens/screens/10-cia-voice-in-chat.md`
- **Evidence:** screens/10-cia-voice-in-chat.md, work/briefs/10.md, work/drafts/10.md, work/briefs/10.md, Balencia canon, component catalog.
- **Route(s):** No live route; in-chat voice state inside CIA Chat [09].
- **Frame:** 390x844 native mobile
- **Priority:** converted with asset slots

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Adds short, practical voice input inside the existing CIA chat without changing routes.
- **Premium Visual Director:** make CIA voice in chat composer the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** CIA voice in chat keeps privacy-first language and SafetyResourceCard reachable for journal, mood, stress, sleep, energy, voice, and wellbeing-adjacent moments.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+--------------------------------------+
| CIA.                         voice on |
| CIA  What would help right now?       |
| You  [draft voice transcript...]      |
|                                      |
| +----------------------------------+ |
| | listening.                       | |
| |    #                   | |
| | [cancel]              [send]     | |
| | voice becomes text  delete later| |
| +----------------------------------+ |
| Today        CIA       Goals      Me  |
+--------------------------------------+

Route handling: No live route; in-chat voice state inside CIA Chat [09].
```

## Focal Hierarchy
- **Dominant focal moment:** CIA voice in chat composer; it should be visually singular, not one tile among many.
- **Secondary layer:** CIA Chat TopBar, unchanged except voice icon active. with CIA only when the source supports a synthesized read.
- **Operational layer:** Compressed chat history with latest messages visible., Draft transcription bubble in the chat list., VoiceInterfacePanel replacing keyboard area., Status label, waveform, cancel, and stop/send..
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*chat*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
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

## Data Honesty
- **Transcript:** real = visible text plus `ChipProvenance` "via OS speech-to-text"; low-confidence = words underlined/dimmed with `estimated  low confidence`; honest-null = "not enough audio yet."
- **Audio input level:** real = waveform from device microphone; low-confidence = permissions or noisy input state, waveform muted; honest-null = flat baseline before audio.
- **Silence and max duration timers:** real = local timer; low-confidence not applicable; honest-null = no active recording.
- **Consent controls:** data category = microphone and transcript; source = device microphone/OS speech-to-text; scope = sending text to CIA; retention = transcript in chat history until deletion; export, revoke mic, and delete transcript are named.
- **Raw audio:** not stored. If implementation changes, a new ConsentCard variant is required before release.

## Consent and Safety
- CIA voice in chat keeps privacy-first language and SafetyResourceCard reachable for journal, mood, stress, sleep, energy, voice, and wellbeing-adjacent moments.
- CIA voice in chat exposes audience, visibility, report, mute, block, and own-content delete controls before sharing or social comparison.
- CIA voice in chat lets every CIA evidence chip explain why the source was used, mark low-confidence synthesis, and delete recommendation history.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- This is documented as a modal, overlay, utility, or source-only surface; do not invent a live route.

## States
- **Default:** panel slides up, waveform idle, status says "listening."
- **Skeleton:** audio engine boot shows panel geometry and static waveform placeholders for under 500ms.
- **Empty:** no speech after 8 seconds auto-cancels and shows silence toast.
- **Error:** permission denied, transcription failed, network lost, and max-duration reached are separate states with retry/cancel.
- **Success:** transcript solidifies into a sent user bubble, `--glow-done` flashes, CIA thinking indicator appears.
- **Disabled:** send is dimmed when transcript is empty, offline, or permission-blocked.
- **Offline:** partial transcript stays local; send disabled until connection returns or text can be copied.

## Motion
- **Entry:** panel slides up 200pt over 280ms; nav dims simultaneously.
- **Recording:** waveform bars update with audio amplitude; draft text streams into the bubble.
- **Stop/send:** stop icon crossfades to send, then bubble commits.
- **Cancel/swipe:** panel slides down and draft disappears.
- **Tab tap:** exits voice mode before switching tabs.
- **Reduced-motion:** panel appears instantly, waveform becomes static level bars, draft updates by whole phrases.

## Image Slots
- `HIFI-10-01` - avatar or message attachment slot; screen-specific; privacy-safe, non-diagnostic, no identifiable person. Prompt: CIA voice in chat avatar or social proof placeholders, Balencia warm-dark glass UI asset, privacy-safe, no brand logos, no readable UI text.

## Implementation Notes
- Route header must stay aligned with the repaired source: No live route; in-chat voice state inside CIA Chat [09]..
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** status, draft, and controls clear AA+ against panel frost and warm dark.; **Targets:** cancel, stop/send, settings, nav tabs, and mic affordance meet 44px.; **Screen readers:** transcript updates in a polite live region; cancel/send labels state consequences.
