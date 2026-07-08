# 11-cia-voice-full-screen - A+++ hi-fi mobile spec

## Header
- **Source ID:** 11
- **Source spec:** `Balencia-New-Screens/screens/11-cia-voice-full-screen.md`
- **Evidence:** screens/11-cia-voice-full-screen.md, work/briefs/11.md, work/drafts/11.md, Brief: CIA Voice Full Screen
- **Route(s):** `/voice-assistant`, `/voice-call`
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: A distraction-free, full-screen conversation with *CIA* - the app's only surface that replaces dashboards entirely with presence.
- **Premium Visual Director:** make cia-voice-full-screen hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** cia-voice-full-screen keeps privacy-first language and SafetyResourceCard reachable for journal, mood, stress, sleep, energy, voice, and wellbeing-adjacent moments.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
(0,0) +-------------------------------------------+ (390,0)
      | ############ system status bar ########### |
   44 |   support (quiet)            x close      |
      |                                             |
      |                                        |
      |                                             |
      |              +---------------+              |
  128 |              |               |              |
      |             |  CIA PRESENCE |             |
      |              |  (breathing)  |              |
  328 |              +---------------+              |
      |                                         |
      |                                             |
      |    +-----------------------------------+    |
  344 |    |  "Hey. I'm here. You can talk to   |    |
      |    |   me about anything - or just      |    |
      |    |   think out loud."                 |    |
  456 |    +-----------------------------------+    |
      |           (GlassCard  280pt max width)      |
      |                                             |
  480 |+-----------------------------------------+  |  <- VoiceControlDock
      ||        #                       |  |    (.glass-frost,
      ||        WaveformAmplitude  280pt          |  |     top-radius 28,
  560 ||                                           |  |     slides up on entry)
      ||                +---------+                |  |
      ||  (keyboard)    |       |   (speaker)    |  |
  660 ||   BtnGhost     +---------+    BtnGhost    |  |
      ||                VoiceMicGlow                |  |
      ||                                           |  |
      ||          home-indicator safe area          |  |
  844 |+-----------------------------------------+  |
(0,844)+-------------------------------------------+(390,844)

Route handling: `/voice-assistant`, `/voice-call`
```

## Focal Hierarchy
- **Dominant focal moment:** cia-voice-full-screen hero; it should be visually singular, not one tile among many.
- **Secondary layer:** Top bar zone  - transparent. Leading with CIA only when the source supports a synthesized read.
- **Operational layer:** CIA presence zone  - CIAPresenceOrb, 200px, centered., - 5a. Waveform zone - WaveformAmplitude, 280pt wide., - 5b. Control zone - BtnGhost ., First entry greeting.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*screen*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar** - *variant: modal-close.* No back chevron, no title (full-screen exit pattern, not a stack push). Leading quiet support glyph, trailing x.
- **CIAPresenceOrb** - the 200px focal point. *Correction: the draft invented `NEW: AvatarStage` for this exact job. The catalog already names this component - "breathing purple-core orb reacts to voice amplitude hero of onboarding + full-screen voice" - verbatim this screen. Using the invented name would have forked a component that already exists.* Catalog defines idle/listening/thinking states; this screen needs a fourth (see 6) - flagged as a proposed extension, not a new component.
- **GlassCard** - *variant: default.* Houses the live transcription line. *Correction: the draft also listed `CIAInsightCard` for this same zone. Wrong component - `CIAInsightCard` carries evidence rows, `BtnCoach`/`BtnGhost` actions, and cross-pillar `ChipDomainTag` pairs; a live transcript is none of those. Removed it; `GlassCard` alone (subtle enough at `rgba(255,255,255,.045)` + blur 28 to read as soft glass, not a hard box) does the job.*
- **NEW: VoiceControlDock** - persistent `.glass-frost` bottom panel (top-radius 28) housing `WaveformAmplitude`, `VoiceMicGlow`, and the two flanking `BtnGhost` controls. *Rationale: distinct from `Sheet` (no grabber, no scrim, not drag-dismissible) and from `GlassNavBar` (not tab navigation) - full-screen voice needs fixed control chrome, not a modal.*
- **NEW: WaveformAmplitude** - dual-color amplitude bars: solid orange (`#FF5E00`) for the user's live input, dashed-cadence purple (`#7F24FF`) for CIA's output - reusing CANON 7's chart color duality (user=solid orange, AI=purple) rather than inventing a new color language for audio. *Rationale: no catalog component maps amplitude-over-time to bar height; nearest neighbors (`MomentumBar`/`ChargeMeter`) are for cumulative/depletable values, not raw audio.*
- **VoiceMicGlow** - *variant: tap-to-toggle* (not tap-and-hold - this is hands-free continuous conversation, not push-to-talk). 64px glass-pill, orange core glow while capturing.
- **BtnGhost** x2 - leading: switch to keyboard (drops to text input inline, session continues); trailing: mute CIA's spoken output (keeps transcript, silences audio - for quiet environments).
- **ConsentCard** - first-run only, before the mic ever opens (see 8).
- **SafetyResourceCard** - reachable via the quiet support glyph, and auto-surfaced as a `ModalOverlay` if CIA detects crisis language mid-conversation (see 8, 9).
- **ErrorState / HonestNullState / SkeletonState** - per 9.
- **N/A - FABQuickLog**: catalog scopes this to Today-tab screens; full-screen voice hides all persistent nav/FAB by design (checklist 13). Honest omission, not an oversight.

## Data Honesty
- This screen carries no numeric KPIs - its "data" is the conversation itself, its sync state, and the capture quality of what CIA heard. Honesty is applied to those three, not decorated onto them.
- **Conversation payload (sync):**
- - **Real:** `saved locally`, surfaced via a quiet `SyncStatus` glass-pill banner (catalog) only when offline - e.g. `offline - will sync when reconnected`. Never shown when online; showing a "synced" badge for every routine save would be noise, not honesty.
- - **Low-confidence:** N/A - a local write is binary (it happened or it didn't). Forcing a "low confidence save" state would be fake precision, not honesty.
- - **Honest null:** mid-write, `saving` with the same `SyncStatus` treatment.
- **Speech capture (live transcript):**
- - **Real:** transcribed text, provenance `via OS speech-to-text`.
- - **Low-confidence:** transcript rendered at 64% opacity + Caption `estimated  low confidence` under the line (per `GlassStatCard`'s low-confidence pattern, reused here since the honesty-triple applies to this too, even though it isn't a KPI).
- - **Honest null:** `HonestNullState` - "Not enough audio yet." Action: "Speak a little louder."
- - **On the persistent `ChipProvenance` chip:** deliberately *not* rendered inline next to the live transcript. A provenance pill hovering over an intimate, real-time conversation line would break the "just talk" premise this screen exists for. The provenance is disclosed once, up front, in the `ConsentCard` ("becomes text joins your history"), and resurfaces as a standard `ChipProvenance` on each turn once it lands in CIA Chat [09]'s history view - where chips belong. Honest, justified narrower application of CANON 7, not a skipped one.

## Consent and Safety
- cia-voice-full-screen keeps privacy-first language and SafetyResourceCard reachable for journal, mood, stress, sleep, energy, voice, and wellbeing-adjacent moments.
- cia-voice-full-screen lets every CIA evidence chip explain why the source was used, mark low-confidence synthesis, and delete recommendation history.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- Keep navigation targets aligned to `/voice-assistant`, `/voice-call`. Do not add alternate vanity routes.

## States
- **Default (idle):** `CIAPresenceOrb` breathing, 4s ease, greeting line shown once per session start.
- **First-run:** `ConsentCard` overlay blocks the mic until accept/decline.
- **Skeleton (<500ms):** `SkeletonState` shimmer on the orb container and transcript area while the audio engine boots.
- **Listening:** orange ring pulse on orb; `WaveformAmplitude` orange bars react to input; transcript fills in live.
- **Thinking (processing):** rotation shimmer on orb, purple-tinted; waveform quiets; Caption "connecting to CIA" if it runs past 3s.
- **Speaking:** orb core brightens/pulses with `--glow-cia`; waveform purple bars react to CIA's output; transcript shows CIA's reply.
- **Success (turn complete):** orb flashes `--glow-done` (#34A853) for 250ms, then returns to idle breathing - a quiet acknowledgment, not a celebration; this is a conversation, not a completed mission.
- **Muted (mic paused):** `VoiceMicGlow` loses its core glow, drops to 40% opacity (canon's standard disabled treatment) - this is a user-initiated pause via the mic toggle itself, distinct from the network/permission error states below.
- **Empty - mic permission denied:** `HonestNullState`, styled in the same calm, non-alarming register as `SafetyResourceCard` (surface-2, no red, no error tone) - *not* the crisis component itself, just borrowing its restraint for a permission block, which is annoying, not a crisis. `BtnPrimary` "Open settings."
- **Error - network/API:** `ErrorState`. Orb freezes mid-breath, waveform dims to 20% opacity, recovery copy per 7, `BtnSecondary` "Try again."

## Motion
- **Physical easing:** `cubic-bezier(0.32, 0.72, 0, 1)` for screen entry, orb scale changes, and the control dock's slide-up.
- **Feedback:** 150-250ms press scale (.98) on the mic toggle, x, and both ghost controls.
- **Glow behavior - "draw, don't fade":** on entry, the dock slides up as the orb scales in and its glow expands outward as the signature moment (CANON 6). State-to-state glow transitions (orange<->purple) crossfade over 280ms ease-out-soft - never a hard cut.
- **Particles:** slow drift, no easing curve needed (ambient, not interactive); tint follows the active glow.
- **Haptics:** light `HapticImpact` on listening->thinking transition; `HapticNotification` (success-weight) when a turn completes and the orb flashes green.
- **Reduced-motion path:** breathing disabled (static orb, held at whichever color the state implies); particles frozen; transcript words appear as whole-line fades instead of sequential reveal; swipe-to-dismiss replaced entirely by the x tap target (never rely on the gesture alone).

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/voice-assistant`, `/voice-call`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** paper-100 (`#FEFAF3`) on `--bg-base` (`#0A0A0F`) for the transcript - comfortably clears the 4.5:1 AA floor; the design is built to keep it there even with glow and particles layered underneath, not merely hoped to.; **Targets:** support glyph, x, mic toggle, and both ghost controls all meet the 44px minimum; the background itself is not a tap-to-speak target (avoids accidental triggers from incidental touches).; **Screen reader:** glyph-only controls carry labels - `Close voice mode`, `Toggle microphone`, `Get support`, `Switch to keyboard`, `Mute CIA's voice`.
