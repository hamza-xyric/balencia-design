# 07-cia-onboarding-conversation - A+++ hi-fi mobile spec

## Header
- **Source ID:** 07
- **Source spec:** `Balencia-New-Screens/screens/07-cia-onboarding-conversation.md`
- **Evidence:** screens/07-cia-onboarding-conversation.md, work/briefs/07.md, work/drafts/07.md, work/briefs/07.md, work/drafts/07.md, Balencia canon, component catalog.
- **Route(s):** `/onboarding`
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Creates the first "it gets me" moment without pretending CIA knows the member yet.
- **Premium Visual Director:** make CIA onboarding conversation hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** CIA onboarding conversation keeps required consent unchecked until explicit action, optional consent skippable, and route handoff limited to `/onboarding`.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+--------------------------------------+
| 9:41                                  |
|         fitness        career         |
|    wellbeing    ( CIA orb )   sleep   |
|        \____ continuous line ____/    |
|       Goal  Mode  Assessment  Plan  Preferences |
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

Route handling: `/onboarding`
```

## Focal Hierarchy
- **Dominant focal moment:** CIA onboarding conversation hero; it should be visually singular, not one tile among many.
- **Secondary layer:** Chat transcript with CIA and user bubbles. with CIA only when the source supports a synthesized read.
- **Operational layer:** ChatComposer fixed above the safe area., CIA greeting, Vision line, Baseline prompt.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*conversation*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Figma Reference Alignment
- **Direct Figma aliases:** onboarding `Get Started`, `Goal`, `Mode`, `Assessment`, `My Plan`, `Preferences`, and `Congratulations`.
- **Evidence tier / light-shell exception:** screenshot-derived Figma direction overrides the older compact canon's dark-only note for these onboarding frames. The CIA chat/orb treatment remains the focused `AI Guided Conversation` sub-state inside the 5-step onboarding rail.
- **Stepper requirement:** use the visible 5-step orange progress rail for onboarding states: `Goal`, `Mode`, `Assessment`, `My Plan`, `Preferences`. Completed steps render as orange filled circles with tiny check marks; current step is orange; future steps stay pale peach with gray labels.
- **Goal selection mapping:** the Figma `Select Your Life Goals to get started.` frame maps to Balencia mission discovery. Keep canonical copy as Missions where appropriate, but preserve the visible 2-column choice-card anatomy: icon square, title, one-line description, orange checkbox in the top-right, search pill, and `Load More`.
- **Mode selection mapping:** the Figma `Balencia Understand Your Needs?` frame maps to assessment depth. Use three large choice cards (`Quick Assessment`, `Deep Assessment`, `AI Guided Conversation`) with pastel tint bands, purple/green/orange icons, `Most Personalized` pill, and checklist bullets.
- **Assessment mapping:** the Figma `What is the biggest hurdle you face?` frame maps to obstacle intake. Use a compact progress line (`90%` at right), selectable answer rows with orange checkbox, and bottom orange `Next` CTA.

## Components
- **CIAPresenceOrb** - breathing purple-core orb; listening, thinking, and idle states.
- **CIAChatBubble** - CIA left glass bubble, user right orange bubble.
- **ChatComposer** - GlassPillInput, VoiceMicGlow, send action, attachment sheet.
- **NEW: StepperRail - rationale:** visible 5-step orange onboarding rail (Goal, Mode, Assessment, My Plan, Preferences) with completed/current/future step states; no catalog component covers this horizontal onboarding-progress anatomy.
- **ChipDomainTag** - domain suggestion chips, multi-select.
- **ConsentCard** - health/provider permission sheets before OAuth or voice use.
- **SafetyResourceCard** - always reachable from baseline, mood, stress, and free-text moments.
- **OfflineBanner / SyncStatus, SkeletonState, ErrorState, HonestNullState** - state components.
- **NEW: BrainstormCanvas** - source-specific interactive constellation of domain bubbles and goal cards that can morph into chat selections.
- **NEW: ContinuousStrokeOnboardingLine** - signature line connecting selected bubbles, used only in this hero canvas.

## Data Honesty
- **Onboarding progress:** real = current step with `ChipProvenance` "your answers"; low-confidence is not applicable because the step is deterministic; honest-null = step zero, "starting now."
- **Selected domains:** real = selected chips with source "your taps"; low-confidence = free-text domain inferred by CIA, labeled "estimated  low confidence"; honest-null = "no focus areas chosen yet."
- **Health integrations:** real = provider connected plus category, source, scope, retention, export, revoke, and delete controls; low-confidence = provider selected but OAuth incomplete; honest-null = no provider connected, with "connect later" preserved.
- **Voice input:** real = explicit mic permission and transcript source; honest-null = text-only composer; delete transcript is named before recording starts.

## Consent and Safety
- Health data, provider connections, microphone, and voice transcript are all skippable. `ConsentCard` appears before OAuth or mic access, with accept/decline parity.
- Before recording starts, the UI names transcript retention and delete transcript. CIA evidence chips explain why an answer/source was used and let the member delete recommendation history.
- Keep navigation targets aligned to `/onboarding`. Do not add alternate vanity routes.

## States
- **Default:** canvas idle, first CIA greeting, empty composer, suggestion chips visible.
- **Skeleton:** transcript placeholders and canvas anchor dots preserve geometry while saved context loads; no fake answers.
- **Empty:** first-run state shows no selected domains and gives one prompt, not a dashboard.
- **Error:** save, tap, generation, and OAuth failures stay inline with retry chips and cached answers.
- **Success:** stage save flashes `--glow-done`, progress advances, final stage crossfades to [08].
- **Disabled:** composer and chips dim to 40 percent during OAuth, voice permission, or save-in-flight, with screen-reader reason.
- **Offline:** answers queue locally; provider connection buttons are disabled until online, self-report remains available.
- **Figma step states:** every stepper stage preserves selected cards on back navigation; selected cards use orange checkboxes and a warmer border, unselected cards stay white/pastel, and locked premium/deep-assessment choices use 40% opacity plus a reason chip rather than a dead tap.

## Motion
- **Canvas:** domain bubbles drift subtly; selected chips fly into the transcript as user bubbles.
- **Typing:** suggestion chips insert text into ChatComposer; send posts as a user message.
- **Provider consent:** integration chip opens a ConsentCard before any OAuth handoff.
- **Gestures:** transcript scroll, tap chips, tap goal cards to prefill, swipe sheet down to dismiss.
- **Haptics:** light on selection, medium on send, no haptic for disabled controls.
- **Reduced-motion:** canvas drift, fly-morph, and orb breathing resolve to static positions with opacity-only transitions.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/onboarding`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** paper text on `#0A0A0F` and `#211008` clears AA+; domain colors are paired with labels.; **Targets:** chips, composer buttons, mic, and canvas objects all expose 44px minimum hit areas.; **Screen readers:** orb and canvas summarize step, selected domains, and next prompt before individual chips.
