# 53-breathing-exercises - A+++ hi-fi mobile spec

## Header
- **Source ID:** 53
- **Source spec:** `Balencia-New-Screens/screens/53-breathing-exercises.md`
- **Evidence:** screens/53-breathing-exercises.md, work/briefs/53.md, work/drafts/53.md, Functional Content Brief: Breathing Exercises
- **Route(s):** `/wellbeing/breathing`
- **Frame:** 390x844 native mobile
- **Priority:** converted with asset slots

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: A whole-life coach's approach to acute stress reduction.
- **Premium Visual Director:** make Breathing exercises hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Breathing exercises names health category, source, freshness, confidence, retention, export, revoke, and delete before synced values or photo-derived reads are trusted.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+---------------------------------------------+|
|  [<-]  Breathing exercises            [X]   | <- TopBar
+---------------------------------------------+
| .radial warm glow atmosphere.................|
|                                             |
|  +---------------------------------------+  |
|  | OVR: PRACTICE SUMMARY                 |  | <- GlassStatCard (hero)
|  |                                       |  |
|  |  42        210        8        box    |  |
|  | sessions  minutes  day strk  most used|  |
|  | [via local app] [you logged]          |  |
|  | ..................................... |  |
|  | (Expand chart path / HonestNullState) |  |
|  +---------------------------------------+  |
|                                             |
|  OVR: EXERCISES                             |
|                                             |
|  ( all ) ( sleep ) ( stress ) ( energy ) -> | <- Filter chips
|                                             |
|  +---------------------------------------+  |
|  | [Icon]  Box breathing                 |  | <- SolidCard
|  |         4-4-4-4 pattern  5 min       |  |
|  |         Good for acute focus          |  |
|  +---------------------------------------+  |
|  +---------------------------------------+  |
|  | [Icon]  4-7-8 breathing               |  | <- SolidCard
|  |         4-7-8 pattern  5 min         |  |
|  |         Good for falling asleep       |  |
|  +---------------------------------------+  |
|  +---------------------------------------+  |
|  | [Icon]  Wim Hof                       |  | <- SolidCard
|  |         ...                           |  |
|  +---------------------------------------+  |
|                                             |
|                    (o) quick log            | <- FABQuickLog
| [ Today   CIA   Goals   Me ]                | <- GlassNavBar
+---------------------------------------------+

Route handling: `/wellbeing/breathing`
```

## Focal Hierarchy
- **Dominant focal moment:** Breathing exercises hero; it should be visually singular, not one tile among many.
- **Secondary layer:** Atmosphere with CIA only when the source supports a synthesized read.
- **Operational layer:** TopBar, Hero Summary, Filter Rail, Exercise List.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*exercises*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar** (transparent variant)
- **GlassStatCard** (hero variant, expandable)
- **ChipChoice** (for horizontal filters)
- **SolidCard** (for dense exercise list)
- **FABQuickLog**
- **GlassNavBar**
- **Sheet** (`half` variant for post-session rating)
- **GlassPillInput** (for rating notes)
- **BtnPrimary** / **BtnSecondary** / **BtnGhost**
- **NEW: BreathingPacer**
- *Rationale:* The core immersive tool. A pure visual orb that scales geometrically in sync with physical breath phases (e.g., 160px to 240px scale). Requires custom symmetric physical easing that standard UI sliders cannot achieve safely.

## Data Honesty
- **Metric 1: Total Sessions (KPI 1)**
- *Real:* `42`  `via local app` chip
- *Low-confidence:* `~40`  `estimated  low confidence` label
- *Honest-null:* `0`  `Not enough data yet - start a session` (no fabricated streaks)
- **Metric 2: Total Minutes (KPI 2)**
- *Real:* `210`  `you logged` chip
- *Low-confidence:* `~200`  `estimated  low confidence` label
- *Honest-null:* `--`  `choose a technique`
- **Metric 3: Consistency (Expanded view)**
- *Real:* Solid orange grid blocks based on local logs.

## Consent and Safety
- Breathing exercises names health category, source, freshness, confidence, retention, export, revoke, and delete before synced values or photo-derived reads are trusted.
- Breathing exercises keeps privacy-first language and SafetyResourceCard reachable for journal, mood, stress, sleep, energy, voice, and wellbeing-adjacent moments.
- Breathing exercises treats media as consent-gated: no identifiable face, body, home, document, provider logo, or private text appears without explicit permission.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- Keep navigation targets aligned to `/wellbeing/breathing`. Do not add alternate vanity routes.

## States
- **Default:** List view with 5 base techniques, top-most (Box breathing) carrying a subtle "CIA recommended" badge.
- **Skeleton:** `--surface-3` blocks hold the layout geometry. Sparkline shows a ghost axis line that draws flat.
- **Empty (Cold-start):** Stats show 0 and "--", exercise list intact. `HonestNullState` rests in the chart area.
- **Error (Library):** Stats blur gently with `ErrorState`: "Couldn't load your stats - pull to retry. Exercises available." (List remains fully interactive).
- **Error (Rating Sheet):** Soft shake on save. `couldn't save rating. try again.`
- **Success (Session End):** BreathingPacer flashes `--glow-done` (green) three times. Modal auto-presents.
- **Disabled:** 10-minute duration selector shows `.glass-pill` with 40% opacity + lock glyph + sub-copy: "10 min available in Plus".

## Motion
- **Easing & Feedback:** Custom cubic-bezier for the `BreathingPacer` mimicking lung capacity (ease-in to hold, ease-out to release). UI haptics fire 150ms sharp taps on phase changes.
- **Glow behavior:** The `--glow-cia` attached to the `BreathingPacer` expands and contracts concentrically with the orb's scale, creating a halo effect.
- **Reduced-motion path:** The scaling animation halts. The pacer rests at mid-scale (200px). Phase changes are communicated strictly via high-contrast text swaps ("INHALE" -> "HOLD") and haptic pulses.

## Image Slots
- `HIFI-53-01` - content proof or instructional media slot; screen-specific; privacy-safe, non-diagnostic, no identifiable person. Prompt: Breathing exercises instructional media thumbnails, Balencia warm-dark glass UI asset, privacy-safe, no brand logos, no readable UI text.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/wellbeing/breathing`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** Paper-100 (#FEFAF3) on `--surface-2` (#211008) yields > 16:1 (AAA). Overline Paper-50 at 64% opacity yields ~7:1 (AAA).; **Targets:** Filter chips grow to 44px min height hit-zones despite visual 32px height. List cards easily exceed 44px depth. The BreathingPacer is entirely tap-to-toggle (massive target).; **Screen-reader:** The custom pacer orb intercepts VoiceOver focus as a single element: "Breathing pacer. Tap to pause. Current phase: Inhale. 4 seconds remaining." Updates every minute on the timer.
