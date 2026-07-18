# 09-cia-chat - A+++ hi-fi mobile spec

## Header
- **Source ID:** 09
- **Source spec:** `Balencia-New-Screens/screens/09-cia-chat.md`
- **Evidence:** screens/09-cia-chat.md, work/briefs/09.md, work/drafts/09.md, work/briefs/09.md, Balencia canon, component catalog.
- **Route(s):** `/ai-coach`
- **Frame:** 390x844 native mobile
- **Priority:** converted with asset slots

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Serves as Balencia's core coaching surface: a text conversation where CIA can answer, ask, log, and embed rich artifacts from every life domain.
- **Premium Visual Director:** make CIA chat composer the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** CIA chat exposes audience, visibility, report, mute, block, and own-content delete controls before sharing or social comparison.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+--------------------------------------+
| CIA.                         search mic |
| today                                  |
| CIA  Good morning, Amira. Your *sleep* |
|      and workout load are connected.   |
| +----------------------------------+  |
| | Connection spotted               |  |
| | sleep 6h 12m  via Health         |  |
| | workout load 8/10 via you logged |  |
| | [fitness] [wellbeing]            |  |
| +----------------------------------+  |
| You  What should I change today?       |
| CIA is thinking...                     |
| (tell me more) (show goals) (log meal) |
| [ message CIA                    mic ] |
| Today        CIA       Goals      Me   |
+--------------------------------------+

Route handling: `/ai-coach`
```

## Focal Hierarchy
- **Dominant focal moment:** CIA chat composer; it should be visually singular, not one tile among many.
- **Secondary layer:** Inverted chat list with day separators. with CIA only when the source supports a synthesized read.
- **Operational layer:** CIAChatBubble and user bubbles., Suggestion chip rail below latest CIA turn., ChatComposer fixed above GlassNavBar., GlassNavBar with CIA active..
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*chat*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar** - transparent until scroll; search opens SearchOverlay, voice opens [11] or [10] based on gesture.
- **CIAChatBubble** - CIA glass bubble and user orange bubble.
- **InlineArtifactCard** - embedded charts, goal cards, meal plans, financial summaries, workout previews, and log confirmations.
- **TrendChart, ProgressRing, KPIRow, GlassStatCard** - used only inside artifacts when real data exists.
- **ChipDomainTag** - domain chips inside messages and artifacts.
- **ChipProvenance** - every artifact value and transcript-derived claim carries source.
- **ChatComposer** - text input, send, VoiceMicGlow.
- **SearchOverlay, Sheet, GlassNavBar, OfflineBanner, SkeletonState, ErrorState, HonestNullState** - reused components.
- **ConsentCard** - appears before voice capture or third-party data handoff if consent is missing.

## Data Honesty
- **Messages:** real = stored conversation turns with source `CIA response` or `you sent`; low-confidence = CIA draft or uncertain transcription marked `estimated  low confidence`; honest-null = no history, with day-one greeting.
- **Inline artifacts:** real = value plus `ChipProvenance`; low-confidence = muted artifact plus confidence label; honest-null = artifact omitted or HonestNullState inside the card.
- **Cross-domain insight:** real only with at least two evidence chips; low-confidence when one weak signal exists; honest-null = no insight card, not a filler message.
- **Conversational logs:** real = saved to domain source with `you logged`; low-confidence = queued parse awaiting confirmation; honest-null = CIA asks a clarifying question instead of guessing.
- **AI and data controls:** every artifact opens a source sheet with category, source, scope, retention, export, revoke, delete, and "why CIA used this" explanation.
- **Voice controls:** if [10]/[11] is invoked, ConsentCard names microphone, transcript, retention, export, revoke, and delete before capture.

## Consent and Safety
- CIA chat exposes audience, visibility, report, mute, block, and own-content delete controls before sharing or social comparison.
- CIA chat lets every CIA evidence chip explain why the source was used, mark low-confidence synthesis, and delete recommendation history.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- Keep navigation targets aligned to `/ai-coach`. Do not add alternate vanity routes.

## States
- **Default:** chat history, suggestion chips, composer, and active nav render.
- **Skeleton:** message rows and artifact geometry shimmer while older history or cards load.
- **Empty:** no prior messages; CIA greeting and one starter chip show.
- **Error:** failed sends, failed logs, failed cards, and pull-to-load failure each preserve existing history and expose retry/delete.
- **Success:** sent message lands, log confirmation flashes `--glow-done`, artifact updates in place.
- **Disabled:** composer dims to 40 percent when offline, rate-limited, permission-blocked, or a destructive action sheet is open.
- **Offline:** cached history remains readable; sends queue only when the user explicitly retries.

## Motion
- **Message send:** text flies from composer to user bubble; input clears after persistence.
- **Artifact draw:** charts stroke in after bubble lands; reduced-motion renders final state.
- **Chips:** selected suggestion fills orange then becomes a user message.
- **Voice:** tap mic enters in-chat voice [10]; long-press opens full-screen voice [11].
- **Search:** TopBar search opens SearchOverlay with autofocus.
- **Gestures:** pull to load older history; long-press message opens action Sheet.
- **Reduced-motion:** message fly, chart draw, chip flight, and thinking dots become opacity-only transitions.

## Image Slots
- `HIFI-09-01` - avatar or message attachment slot; screen-specific; premium warm-dark product placeholder. Prompt: CIA chat avatar or social proof placeholders, Balencia warm-dark glass UI asset, privacy-safe, no brand logos, no readable UI text.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/ai-coach`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** paper text on chat bubbles, SolidCards, and dark base clears AA+.; **Targets:** composer, send, mic, chips, TopBar glyphs, artifact cards, and nav meet 44px.; **Screen readers:** bubbles announce speaker, timestamp, status, and whether an artifact has source evidence.
