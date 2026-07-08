# 07-cia-onboarding-conversation - hi-fi glass spec

### 1. Header
- **ID:** 07
- **Name:** CIA onboarding conversation
- **Route(s) covered:** `/onboarding`
- **Tab:** None; onboarding stack before the authenticated tab shell.
- **Source:** `work/briefs/07.md`, `work/drafts/07.md`, Balencia canon, component catalog.
- **Batch:** 1

### 2. Purpose
Creates the first "it gets me" moment without pretending CIA knows the member yet. The screen uses a conversational flow and a living brainstorm canvas to collect baseline feelings, life domains, goals, coaching style, and optional integrations, then hands the gathered signals to Initial plan summary [08].

### 3. Entry & exit
- **Entry:** stack push from Consent [03c] after required policies are accepted.
- **Primary exit:** crossfade to Initial plan summary [08] after the final preference answer is saved.
- **Action exits:** optional provider prompts for Apple Health, WHOOP, Oura, Fitbit, or Garmin open consent-first OAuth sheets and return to the same step.
- **Skip exits:** users can skip health integrations and continue with self-reported answers; CIA acknowledges the lower context without shame.
- **Failure exit:** locally cached answers remain visible with retry; if save cannot recover, System states [98] handles the route safely.

### 4. Layout anatomy
**Regions, top to bottom:**
1. Warm dark atmosphere with a purple CIA pool behind the hero canvas.
2. BrainstormCanvas hero, showing domain bubbles, goal cards, and the continuous-stroke connection motif.
3. CIAPresenceOrb wrapped by a seven-step ProgressRing plus a text fallback.
4. Chat transcript with CIA and user bubbles.
5. Suggestion chip rail for domains, integrations, and coaching style.
6. ChatComposer fixed above the safe area.
7. Privacy and safety footer as compact links inside the transcript overflow.

**ASCII wireframe (390x844):**
```text
+--------------------------------------+
| 9:41                                  |
|         fitness        career         |
|    wellbeing    ( CIA orb )   sleep   |
|        \____ continuous line ____/    |
|            step 2 of 7                |
|--------------------------------------|
| CIA  Hey Alex. I'm CIA, your coach.   |
|      I can help you see your *whole*  |
|      life as one connected system.    |
|                                      |
| You  I want steadier energy.          |
|                                      |
| CIA  Which areas deserve attention?   |
| (fitness) (nutrition) (finance)       |
| (relationships) (skip health data)    |
| [privacy controls] [crisis support]   |
| +----------------------------------+ |
| | type a message             mic > | |
+--------------------------------------+
```

### 5. Components
- **CIAPresenceOrb** - breathing purple-core orb; listening, thinking, and idle states.
- **CIAChatBubble** - CIA left glass bubble, user right orange bubble.
- **ChatComposer** - GlassPillInput, VoiceMicGlow, send action, attachment sheet.
- **ProgressRing** - seven onboarding stages, with hidden text fallback.
- **ChipDomainTag** - domain suggestion chips, multi-select.
- **ConsentCard** - health/provider permission sheets before OAuth or voice use.
- **SafetyResourceCard** - always reachable from baseline, mood, stress, and free-text moments.
- **OfflineBanner / SyncStatus, SkeletonState, ErrorState, HonestNullState** - state components.
- **NEW: BrainstormCanvas** - source-specific interactive constellation of domain bubbles and goal cards that can morph into chat selections.
- **NEW: ContinuousStrokeOnboardingLine** - signature line connecting selected bubbles, used only in this hero canvas.

### 6. Visual treatment
- **Atmosphere:** `#0A0A0F` base, mandatory orange radial glow, 3-4 percent grain, plus a restrained `--glow-cia #7F24FF` pool behind the orb.
- **Hero hierarchy:** the canvas/orb is the only focal moment; the transcript stays operational.
- **Semantic glows:** `--glow-cia` on the orb means CIA synthesis; `--glow-you #FF5E00` on selected domain chips means member choice; `--glow-done #34A853` appears only when a stage is saved.
- **Glass:** transcript bubbles and composer use glass; dense privacy rows use SolidCard for legibility.
- **Type:** Neue Montreal throughout; the first CIA message uses one Tiempos italic word: *whole*.

### 7. Content & copy
- **CIA greeting:** "Hey Alex. I'm CIA, your personal coach."
- **Vision line:** "I can help you see your *whole* life as one connected system."
- **Baseline prompt:** "Before we build anything, tell me what's on your mind right now."
- **Domain prompt:** "Which areas deserve your attention first?"
- **Goal prompt:** "What's one thing you'd like to shift there?"
- **Integration prompt:** "Health data can help me compare patterns faster. You can skip it and connect later."
- **Skip acknowledgment:** "Got it. We'll work with what you tell me."
- **Saving line:** "I'm building your starting plan from what you shared."
- **Error copy:** "I hit a snag saving that. Try again."
- **Offline copy:** "offline - your answers are saved on this device"

### 8. Data & honesty states
- **Onboarding progress:** real = current step with `ChipProvenance` "your answers"; low-confidence is not applicable because the step is deterministic; honest-null = step zero, "starting now."
- **Selected domains:** real = selected chips with source "your taps"; low-confidence = free-text domain inferred by CIA, labeled "estimated · low confidence"; honest-null = "no focus areas chosen yet."
- **Health integrations:** real = provider connected plus category, source, scope, retention, export, revoke, and delete controls; low-confidence = provider selected but OAuth incomplete; honest-null = no provider connected, with "connect later" preserved.
- **Voice input:** real = explicit mic permission and transcript source; honest-null = text-only composer; delete transcript is named before recording starts.

### 9. All states
- **Default:** canvas idle, first CIA greeting, empty composer, suggestion chips visible.
- **Skeleton:** transcript placeholders and canvas anchor dots preserve geometry while saved context loads; no fake answers.
- **Empty:** first-run state shows no selected domains and gives one prompt, not a dashboard.
- **Error:** save, tap, generation, and OAuth failures stay inline with retry chips and cached answers.
- **Success:** stage save flashes `--glow-done`, progress advances, final stage crossfades to [08].
- **Disabled:** composer and chips dim to 40 percent during OAuth, voice permission, or save-in-flight, with screen-reader reason.
- **Offline:** answers queue locally; provider connection buttons are disabled until online, self-report remains available.

### 10. Motion & interaction
- **Canvas:** domain bubbles drift subtly; selected chips fly into the transcript as user bubbles.
- **Typing:** suggestion chips insert text into ChatComposer; send posts as a user message.
- **Provider consent:** integration chip opens a ConsentCard before any OAuth handoff.
- **Gestures:** transcript scroll, tap chips, tap goal cards to prefill, swipe sheet down to dismiss.
- **Haptics:** light on selection, medium on send, no haptic for disabled controls.
- **Reduced-motion:** canvas drift, fly-morph, and orb breathing resolve to static positions with opacity-only transitions.

### 11. Motivation-tier adaptation
- **Low:** three large domain chips at a time, shorter CIA turns, integrations deferred.
- **Medium:** default density with six chips, canvas hero, and current-stage context.
- **High:** all domains visible, goal examples expanded, evidence chips shown sooner.

### 12. Accessibility
- **Contrast:** paper text on `#0A0A0F` and `#211008` clears AA+; domain colors are paired with labels.
- **Targets:** chips, composer buttons, mic, and canvas objects all expose 44px minimum hit areas.
- **Screen readers:** orb and canvas summarize step, selected domains, and next prompt before individual chips.
- **Safety:** SafetyResourceCard is one tap from baseline, stress, mood, and journal-like prompts; crisis resources are never gamified.
- **Data controls:** health, voice, and CIA-memory chips open category, source, scope, retention, export, revoke, and delete controls.
- **Reduced-motion:** mirrors Section 10.

### 13. Premium checklist
1. **Connects:** domains, goals, preferences, and optional health sources are collected as one connected graph.
2. **Honest:** CIA uses only stated answers or explicitly low-confidence inference.
3. **Premium:** one immersive canvas focal moment, restrained transcript density, no template cards.
4. **Warm-dark:** canon atmosphere and selective glass used.
5. **Semantic glow:** CIA, member action, and saved completion colors are separated.
6. **Type:** Neue Montreal plus one Tiempos italic word.
7. **States:** default, skeleton, empty, error, success, disabled, offline, and OAuth-in-progress are covered.
8. **Consent:** health/provider/voice controls include scope, retention, export, revoke, and delete.
9. **Safety:** sensitive baseline prompts keep crisis support reachable.
10. **A11y:** 44px targets, labels, contrast, and reduced-motion covered.
11. **No shame:** skip paths preserve agency and never weaken the member's standing.
12. **Catalog:** all reused components are named; new canvas primitives are flagged.
13. **CIA voice:** calm, sentence case, precise, and coach name locked to CIA.
