### 1. Header
- **ID:** 11
- **Name:** cia-voice-full-screen
- **Route(s) covered:** `/voice-assistant`, `/voice-call`
- **Tab:** CIA
- **Source:** Brief: CIA Voice Full Screen
- **Batch:** 4

### 2. Purpose
A distraction-free, full-screen conversation with *CIA* — the app's only surface that replaces dashboards entirely with presence. No stats, no cards competing for attention: one breathing presence, one line of transcript, one control dock. The premium promise here isn't density, it's restraint — proof that CIA can sit with you and just talk.

### 3. Entry & exit
- **Entry paths:** From CIA Chat [09] via the immersive voice button, or a long-press on the chat composer's mic. First-ever entry inserts a one-time `ConsentCard` (see §8) before the mic opens.
- **Exit paths:** Close (✕, top bar) or a full-screen swipe-down (>120pt, physical easing). Either exit transcribes the full exchange, writes it to local storage, and appends it to CIA Chat [09] history as `InlineArtifactCard`-style turns.
- **Not entered mid-conversation without consent**: if consent was declined on a prior visit, entry routes straight to the `ConsentCard` again rather than opening the mic silently.

### 4. Layout anatomy
**Regions, top to bottom:**
1. **Top bar zone** (y 0–88) — transparent. Leading: quiet support glyph (life-ring, 44px target, muted paper-40%, non-CTA styling). Trailing: ✕ close (44px target). *Correction: draft only placed a close button here; CANON §8's crisis cross-cutting rule applies to this screen (a voice check-in surface) and TopBar's own budget allows "up to 2 glyph actions" — added the second slot rather than bolting on an unrelated new control.*
2. **Atmosphere / hero zone** — full-bleed, behind every other region. Radial warm glow + grain (CANON §1), restrained ambient particles (see §6).
3. **CIA presence zone** (y ≈128–328) — `CIAPresenceOrb`, 200px, centered.
4. **Transcription zone** (y ≈344–456) — `GlassCard` default, center-aligned, max 3 lines, 280pt max width.
5. **Voice control dock** (y ≈480–844) — `.glass-frost` panel, top-radius 28, slides up 250ms on entry. Contains:
   - 5a. Waveform zone — `WaveformAmplitude`, 280pt wide.
   - 5b. Control zone — `BtnGhost` (keyboard) · `VoiceMicGlow` (64px) · `BtnGhost` (speaker).
   - 5c. Bottom safe-area padding above the home indicator.

*Correction: the draft called this bottom panel a "Sheet." It isn't — `Sheet` (catalog) implies a grabber, a dismiss-by-drag gesture, and a scrim over other content, none of which apply here; this dock is permanent chrome for the duration of the screen, dismissed only by the screen-level ✕/swipe-down. Renamed to a `.glass-frost` dock and flagged `NEW: VoiceControlDock` below rather than misusing `Sheet`.*

**ASCII wireframe (390×844):**
```text
(0,0) ┌───────────────────────────────────────────┐ (390,0)
      │ ░░░░░░░░░░░░ system status bar ░░░░░░░░░░░ │
   44 │  ⊙ support (quiet)            ✕ close      │
      │                                             │
      │        ˙     ·        ˙    ·      ˙         │
      │                                             │
      │              ╭───────────────╮              │
  128 │              │               │              │
      │          ·   │  CIA PRESENCE │   ·          │
      │              │  (breathing)  │              │
  328 │              ╰───────────────╯              │
      │        ·   ˙       ·      ˙    ·             │
      │                                             │
      │    ┌───────────────────────────────────┐    │
  344 │    │  "Hey. I'm here. You can talk to   │    │
      │    │   me about anything — or just      │    │
      │    │   think out loud."                 │    │
  456 │    └───────────────────────────────────┘    │
      │           (GlassCard · 280pt max width)      │
      │                                             │
  480 │╔═════════════════════════════════════════╗  │  ← VoiceControlDock
      │║      ▂ ▅ █ ▅ ▂     ▂ ▅ ▆ ▅ ▂            ║  │    (.glass-frost,
      │║        WaveformAmplitude · 280pt          ║  │     top-radius 28,
  560 │║                                           ║  │     slides up on entry)
      │║                ╭─────────╮                ║  │
      │║  (keyboard)    │   🎤    │   (speaker)    ║  │
  660 │║   BtnGhost     ╰─────────╯    BtnGhost    ║  │
      │║                VoiceMicGlow                ║  │
      │║                                           ║  │
      │║          home-indicator safe area          ║  │
  844 │╚═════════════════════════════════════════╝  │
(0,844)└───────────────────────────────────────────┘(390,844)
```

### 5. Components
- **TopBar** — *variant: modal-close.* No back chevron, no title (full-screen exit pattern, not a stack push). Leading quiet support glyph, trailing ✕.
- **CIAPresenceOrb** — the 200px focal point. *Correction: the draft invented `NEW: AvatarStage` for this exact job. The catalog already names this component — "breathing purple-core orb… reacts to voice amplitude… hero of onboarding + full-screen voice" — verbatim this screen. Using the invented name would have forked a component that already exists.* Catalog defines idle/listening/thinking states; this screen needs a fourth (see §6) — flagged as a proposed extension, not a new component.
- **GlassCard** — *variant: default.* Houses the live transcription line. *Correction: the draft also listed `CIAInsightCard` for this same zone. Wrong component — `CIAInsightCard` carries evidence rows, `BtnCoach`/`BtnGhost` actions, and cross-pillar `ChipDomainTag` pairs; a live transcript is none of those. Removed it; `GlassCard` alone (subtle enough at `rgba(255,255,255,.045)` + blur 28 to read as soft glass, not a hard box) does the job.*
- **NEW: VoiceControlDock** — persistent `.glass-frost` bottom panel (top-radius 28) housing `WaveformAmplitude`, `VoiceMicGlow`, and the two flanking `BtnGhost` controls. *Rationale: distinct from `Sheet` (no grabber, no scrim, not drag-dismissible) and from `GlassNavBar` (not tab navigation) — full-screen voice needs fixed control chrome, not a modal.*
- **NEW: WaveformAmplitude** — dual-color amplitude bars: solid orange (`#FF5E00`) for the user's live input, dashed-cadence purple (`#7F24FF`) for CIA's output — reusing CANON §7's chart color duality (user=solid orange, AI=purple) rather than inventing a new color language for audio. *Rationale: no catalog component maps amplitude-over-time to bar height; nearest neighbors (`MomentumBar`/`ChargeMeter`) are for cumulative/depletable values, not raw audio.*
- **VoiceMicGlow** — *variant: tap-to-toggle* (not tap-and-hold — this is hands-free continuous conversation, not push-to-talk). 64px glass-pill, orange core glow while capturing.
- **BtnGhost** ×2 — leading: switch to keyboard (drops to text input inline, session continues); trailing: mute CIA's spoken output (keeps transcript, silences audio — for quiet environments).
- **ConsentCard** — first-run only, before the mic ever opens (see §8).
- **SafetyResourceCard** — reachable via the quiet support glyph, and auto-surfaced as a `ModalOverlay` if CIA detects crisis language mid-conversation (see §8, §9).
- **ErrorState / HonestNullState / SkeletonState** — per §9.
- **N/A — FABQuickLog**: catalog scopes this to Today-tab screens; full-screen voice hides all persistent nav/FAB by design (checklist §13). Honest omission, not an oversight.

### 6. Visual treatment
- **Glass tiers:** `.glass-pill` for the mic and both ghost controls · `.glass-card` (default, unmodified) under the transcript · `.glass-frost` for the control dock. *Correction: the draft added an invented "60% opacity" modifier to the transcription `.glass-card`, presumably to boost legibility. That's not a canon token, and reducing a glass card's already-thin `.045` white tint toward 60% *element* opacity would wash the card out, not help it. Removed — canon's stock `.glass-card` (blur 28, sat 120%, border `.08`, inset top-light `.12`) already lifts paper-100 text off `--bg-base` well past AA+; no invented value needed.*
- **CIAPresenceOrb states** (extends the catalog's idle/listening/thinking set with a fourth, proposed for promotion):
  - **Idle** — breathing purple-tinted core, 4s ease, no ring. CIA's constant, quiet presence.
  - **Listening** (user speaking) — orange ring pulse around the purple core, `--glow-you`. Meaning: *your* active input, being captured.
  - **Thinking** (processing, >3s) — slow rotation shimmer, purple-tinted, no orange. Meaning: neutral, non-committal — CIA hasn't decided anything yet.
  - **Speaking** (CIA responding, *proposed extension*) — core brightens and pulses in sync with CIA's own output amplitude, `--glow-cia` intensified. Meaning: CIA intelligence, projected response.
  *Correction: the draft described this glow using CANON §3's bottom-anchored-radial card recipe ("anchored to the bottom of the AvatarStage"). That recipe is written for rectangular `GlassCard`s with a defined bottom edge — it doesn't map onto a circular hero orb. Replaced with the orb's own catalog-native states (ring pulse / rotation shimmer / core breathe), while keeping CANON §3's color-meaning mapping intact: orange=you/effort, purple=CIA/projected, one glow, one meaning, always stated.*
- **Transcription GlassCard: deliberately unlit.** No semantic glow on this card — the orb is the screen's one glowing focal point; a second light source competing for attention would undercut the "sit and just talk" premise this screen is built on.
- **Atmosphere:** `radial-gradient(90% 60% at 50% -10%, rgba(255,94,0,.18), transparent 60%)` at idle/listening (CANON §1, unmodified) — crossfades to a purple pool `rgba(127,36,255,.15)` while CIA speaks. *The purple sits slightly below the orange's `.18` (at `.15`) because royal purple reads more saturated at equal opacity — kept inside CANON §1's "soft warm glow" intent while shifting hue for the CIA-speaking moment.* Plus the mandatory 3–4% grain overlay, soft-light, at all times.
- **Ambient particles:** sparse (6–10 max), slow-drifting motes at ≤8% opacity, tinted toward whichever glow is active. This borrows CelebrationOverlay's own "particle restraint" principle (CANON §6) rather than inventing a separate particle language — justified here because `FrostCard`'s definition already names this screen's category ("immersive frost for onboarding and over-glow moments") as the one place restrained ornament earns its keep. Frozen entirely under reduced motion.
- **Hero type moment:** the live transcription line. *Correction: the draft set this in "Display size (34) NM Regular." CANON §5 ties Display strictly to NM Medium 500 — Regular isn't a Display weight. Fixed to Display, NM Medium 500, 34, paper-100 on `--bg-base`.* This is the screen's one Display moment (catalog rule: one Display moment per screen).

### 7. Content & copy
*Sentence case, no exclamations, one Tiempos-italic emphasis word per moment. Every "CIA" in the draft has been locked to CIA.*

- **First entry greeting:** "Hey. I'm here. You can talk to me about anything — goals, how your day went, or just think out loud. I'm *listening*."
- **Idle / silence prompt** (after ~8s of silence): "Take your time. I'm here when you're *ready*."
- **Processing** (>3s): "Connecting to *CIA*…"
- **Audio output fallback:** "Audio unavailable — using *text*."
- **Speech recognition failure:** "I couldn't catch that. Try *again*."
- **API timeout recovery** (no response after ~12s): "I got lost in thought. Could you say that *again*?"
- **Network error message:** "Connection lost. CIA can't hear you right *now*."
- **Network error action:** "Try again." *(Correction: draft had lowercase "try again" — CANON §5 is sentence case everywhere, including button labels; a mid-sentence lowercase fragment reads as a typo, not a style.)*
- **Mic permission denied message:** "Balencia needs microphone access for voice *mode*."
- **Mic permission action:** "Open settings."
- **Consent card title:** "CIA listens, but doesn't keep the *tape*."
- **Consent card body:** "Your voice becomes text and joins your conversation history. Nothing is stored as raw audio. Delete any conversation, anytime, from settings."
- **Consent accept:** "Start talking." **Consent decline:** "Not now." (equal visual prominence per `ConsentCard` spec; decline returns to CIA Chat [09] in text mode, not a dead end.)
- **Crisis auto-surface opener** (CIA-initiated, calm, no alarm): "I want to make sure you're *okay*. Here's some support if you need it."

### 8. Data & honesty states
This screen carries no numeric KPIs — its "data" is the conversation itself, its sync state, and the capture quality of what CIA heard. Honesty is applied to those three, not decorated onto them.

- **Conversation payload (sync):**
  - **Real:** `saved locally`, surfaced via a quiet `SyncStatus` glass-pill banner (catalog) only when offline — e.g. `offline — will sync when reconnected`. Never shown when online; showing a "synced" badge for every routine save would be noise, not honesty.
  - **Low-confidence:** N/A — a local write is binary (it happened or it didn't). Forcing a "low confidence save" state would be fake precision, not honesty.
  - **Honest null:** mid-write, `saving…` with the same `SyncStatus` treatment.
- **Speech capture (live transcript):**
  - **Real:** transcribed text, provenance `via OS speech-to-text`.
  - **Low-confidence:** transcript rendered at 64% opacity + Caption `estimated · low confidence` under the line (per `GlassStatCard`'s low-confidence pattern, reused here since the honesty-triple applies to this too, even though it isn't a KPI).
  - **Honest null:** `HonestNullState` — "Not enough audio yet." Action: "Speak a little louder."
  - **On the persistent `ChipProvenance` chip:** deliberately *not* rendered inline next to the live transcript. A provenance pill hovering over an intimate, real-time conversation line would break the "just talk" premise this screen exists for. The provenance is disclosed once, up front, in the `ConsentCard` ("becomes text… joins your history"), and resurfaces as a standard `ChipProvenance` on each turn once it lands in CIA Chat [09]'s history view — where chips belong. Honest, justified narrower application of CANON §7, not a skipped one.
- **Consent & data control** (CANON §8, mandatory for any voice-touching screen): `ConsentCard` gates first entry; revoke/delete path is named in its own copy (settings → delete conversation). *Correction: the draft never mentioned consent at all for a screen whose entire purpose is capturing voice — a direct miss against a cross-cutting rule. Added.*
- **Crisis/safety layer** (CANON §8, mandatory for check-in surfaces): quiet support glyph in the top bar, always reachable, plus a CIA-initiated `ModalOverlay` → `SafetyResourceCard` if crisis language is detected in the live transcript — teal-free, calm `--surface-2`, one-tap call/text, never gamified. *Correction: also missing from the draft. This screen is exactly the kind of open-ended emotional check-in surface CANON §8 has in mind ("how your day went… just think out loud") — added both the passive entry point and the active trigger.*

### 9. All states
- **Default (idle):** `CIAPresenceOrb` breathing, 4s ease, greeting line shown once per session start.
- **First-run:** `ConsentCard` overlay blocks the mic until accept/decline.
- **Skeleton (<500ms):** `SkeletonState` shimmer on the orb container and transcript area while the audio engine boots.
- **Listening:** orange ring pulse on orb; `WaveformAmplitude` orange bars react to input; transcript fills in live.
- **Thinking (processing):** rotation shimmer on orb, purple-tinted; waveform quiets; Caption "connecting to CIA…" if it runs past 3s.
- **Speaking:** orb core brightens/pulses with `--glow-cia`; waveform purple bars react to CIA's output; transcript shows CIA's reply.
- **Success (turn complete):** orb flashes `--glow-done` (#34A853) for 250ms, then returns to idle breathing — a quiet acknowledgment, not a celebration; this is a conversation, not a completed mission.
- **Muted (mic paused):** `VoiceMicGlow` loses its core glow, drops to 40% opacity (canon's standard disabled treatment) — this is a user-initiated pause via the mic toggle itself, distinct from the network/permission error states below.
- **Empty — mic permission denied:** `HonestNullState`, styled in the same calm, non-alarming register as `SafetyResourceCard` (surface-2, no red, no error tone) — *not* the crisis component itself, just borrowing its restraint for a permission block, which is annoying, not a crisis. `BtnPrimary` "Open settings."
- **Error — network/API:** `ErrorState`. Orb freezes mid-breath, waveform dims to 20% opacity, recovery copy per §7, `BtnSecondary` "Try again."
- **Crisis-triggered:** `ModalOverlay` → `SafetyResourceCard`, calm interrupt over the frozen conversation; dismiss returns to idle, conversation is not lost.

### 10. Motion & interaction
- **Physical easing:** `cubic-bezier(0.32, 0.72, 0, 1)` for screen entry, orb scale changes, and the control dock's slide-up.
- **Feedback:** 150–250ms press scale (.98) on the mic toggle, ✕, and both ghost controls.
- **Glow behavior — "draw, don't fade":** on entry, the dock slides up as the orb scales in and its glow expands outward as the signature moment (CANON §6). State-to-state glow transitions (orange↔purple) crossfade over 280ms ease-out-soft — never a hard cut.
- **Particles:** slow drift, no easing curve needed (ambient, not interactive); tint follows the active glow.
- **Haptics:** light `HapticImpact` on listening→thinking transition; `HapticNotification` (success-weight) when a turn completes and the orb flashes green.
- **Reduced-motion path:** breathing disabled (static orb, held at whichever color the state implies); particles frozen; transcript words appear as whole-line fades instead of sequential reveal; swipe-to-dismiss replaced entirely by the ✕ tap target (never rely on the gesture alone).

### 11. Motivation-tier adaptation
Visual density is intentionally constant across tiers — a breathing orb and one line of transcript can't be "denser." What adapts is conversational depth, which lives in CIA's copy behavior, not the layout:
- **Low:** simpler vocabulary, confirms basic context ("I hear you saying you're tired"), single-domain references only.
- **Medium:** integrates one domain's metric naturally ("I see your sleep was off last night").
- **High:** weaves multi-domain correlation into the reply ("Your sleep consistency is down, which tracks with the workouts you've skipped and the dip in your focus scores — let's adjust.").

### 12. Accessibility
- **Contrast:** paper-100 (`#FEFAF3`) on `--bg-base` (`#0A0A0F`) for the transcript — comfortably clears the 4.5:1 AA floor; the design is built to keep it there even with glow and particles layered underneath, not merely hoped to.
- **Targets:** support glyph, ✕, mic toggle, and both ghost controls all meet the 44px minimum; the background itself is not a tap-to-speak target (avoids accidental triggers from incidental touches).
- **Screen reader:** glyph-only controls carry labels — `Close voice mode`, `Toggle microphone`, `Get support`, `Switch to keyboard`, `Mute CIA's voice`.
- **Visual independence:** every audio-only signal has a text equivalent — waveform activity is paired with the live transcript itself (not a separate "processing…" label alone), so a Deaf or hard-of-hearing user always has the same information a hearing user gets from the waveform.
- **Voice-native crisis access:** because this is a voice interface, the crisis entry point isn't only the quiet top-bar glyph — saying "I need help" (or equivalent distress language) is always recognized and surfaces `SafetyResourceCard` immediately, regardless of conversational context.
- **Consent focus order:** `ConsentCard`'s two actions (`Start talking` / `Not now`) are keyboard/switch-navigable in equal order — neither is pre-focused to bias the choice.

### 13. Premium checklist
1. **Connects:** voice input feeds the same cross-pillar intelligence as every other surface — CIA's replies cite real domain data, not generic chat filler.
2. **Honest:** no fabricated transcript, no fake sync confirmation, no invented provenance; every honesty-triple gap is a stated, justified omission, not a silent one.
3. **Premium:** restraint *is* the premium signal here — one orb, one line, one dock; the "draw, don't fade" entrance is the only flourish spent.
4. **Hero color:** strict 60/30/10 — orange=you/effort, purple=CIA/projected, green=done, applied consistently across orb, waveform, and glow crossfades.
5. **Type:** Display, NM Medium 500, 34 for the transcript — the screen's single Display moment, corrected from the draft's invalid "NM Regular."
6. **Spacing:** 8pt grid maintained around the 280pt transcript and waveform bounding boxes; generous negative space above/below the orb.
7. **Glass:** `.glass-pill` for controls, `.glass-card` (unmodified) for the transcript, `.glass-frost` for the dock — no invented opacity values.
8. **Inner-glow:** exactly one glowing focal point at a time (the orb); the transcript card is deliberately unlit.
9. **Honest states:** capture explicitly shows low-confidence and honest-null without ever faking a transcript line.
10. **Motion:** physical easing throughout; 4s breathing sustains presence without becoming a distraction; particles restrained per CelebrationOverlay's own principle.
11. **Voice:** direct, warm, no exclamations, one italic emphasis per moment; every "CIA" corrected to CIA.
12. **A11y:** visual + textual redundancy for every audio state; voice-native crisis trigger on top of the tap-based one.
13. **Tab bar:** floating bottom nav intentionally absent — full-screen immersion overrides persistent chrome by design.
14. **Domain tags:** honest N/A — voice has no visual tag surface; CIA still references domains natively in speech. `FABQuickLog` is also honest N/A (Today-tab scope only).
15. **Consent & safety:** `ConsentCard` gates first use, revoke/delete path stated in its own copy; quiet always-reachable crisis entry plus a CIA-triggered `SafetyResourceCard` interrupt — the cross-cutting pattern the draft omitted entirely.
