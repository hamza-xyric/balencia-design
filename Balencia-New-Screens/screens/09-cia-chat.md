# 09-cia-chat - hi-fi glass spec

### 1. Header
- **ID:** 09
- **Name:** CIA chat
- **Route(s) covered:** `/ai-coach`
- **Tab:** CIA root.
- **Source:** `work/briefs/09.md`, Balencia canon, component catalog.
- **Batch:** 4

### 2. Purpose
Serves as Balencia's core coaching surface: a text conversation where CIA can answer, ask, log, and embed rich artifacts from every life domain. It is not a dashboard in chat clothing; it is a conversation with source-aware inline evidence.

### 3. Entry & exit
- **Entry:** CIA tab root, Home CIA card, "ask CIA" shortcuts, and inline artifacts returning from other screens.
- **Primary exit:** tap rich InlineArtifactCard to open the relevant domain screen.
- **Secondary exits:** bottom nav to Today, Goals, or Me; conversation hub [74]; full-screen voice [11]; in-chat voice state [10].
- **Message exits:** long-press message opens copy, delete, report issue, and source controls where available.
- **Failure exit:** cached history remains; System states [98] only if the route cannot safely mount.

### 4. Layout anatomy
**Regions, top to bottom:**
1. TopBar with title `CIA`, search, conversation list, and voice glyph.
2. Inverted chat list with day separators.
3. CIAChatBubble and user bubbles.
4. InlineArtifactCards for charts, mission cards, workout previews, financial summaries, and log confirmations.
5. Suggestion chip rail below latest CIA turn.
6. ChatComposer fixed above GlassNavBar.
7. GlassNavBar with CIA active.

**ASCII wireframe (390x844):**
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
```

### 5. Components
- **TopBar** - transparent until scroll; search opens SearchOverlay, voice opens [11] or [10] based on gesture.
- **CIAChatBubble** - CIA glass bubble and user orange bubble.
- **InlineArtifactCard** - embedded charts, goal cards, meal plans, financial summaries, workout previews, and log confirmations.
- **TrendChart, ProgressRing, KPIRow, GlassStatCard** - used only inside artifacts when real data exists.
- **ChipDomainTag** - domain chips inside messages and artifacts.
- **ChipProvenance** - every artifact value and transcript-derived claim carries source.
- **ChatComposer** - text input, send, VoiceMicGlow.
- **SearchOverlay, Sheet, GlassNavBar, OfflineBanner, SkeletonState, ErrorState, HonestNullState** - reused components.
- **ConsentCard** - appears before voice capture or third-party data handoff if consent is missing.

### 6. Visual treatment
- **Atmosphere:** warm `#0A0A0F` base, orange radial glow, 3-4 percent grain, subtle purple pool behind the top chat region.
- **Glass tiers:** chat bubbles and composer use glass; dense artifacts use SolidCard interiors; CIA insight artifacts use purple-tinted GlassCard.
- **Semantic glows:** `--glow-cia #7F24FF` for CIA synthesis; `--glow-you #FF5E00` for member messages, sends, and logged actions; `--glow-done #34A853` for successful log confirmations.
- **Data-viz:** past/member lines are solid orange, CIA projections dashed purple, milestones green dots.
- **Type:** Neue Montreal throughout; one Tiempos italic word in the active CIA turn, e.g. *sleep*.

### 7. Content & copy
- **Title:** "CIA."
- **Input placeholder:** "message CIA"
- **Day-one greeting:** "Good morning, Amira. What's on your mind today."
- **Return greeting:** "Hey Amira. Want to catch up?"
- **Connection header:** "Connection spotted"
- **Suggestion chips:** "tell me more", "what about sleep?", "show goals", "log a meal", "start workout", "ask something else"
- **Thinking:** "CIA is thinking." / "CIA is checking your sources."
- **Card loading:** "CIA is reading your week - one moment."
- **Card error:** "Couldn't load this insight. Pull to refresh."
- **Send failure:** "not sent - try again"
- **Offline:** "offline - showing saved conversation"
- **Permission rationale:** "Voice becomes text. You control the transcript."

### 8. Data & honesty states
- **Messages:** real = stored conversation turns with source `CIA response` or `you sent`; low-confidence = CIA draft or uncertain transcription marked `estimated · low confidence`; honest-null = no history, with day-one greeting.
- **Inline artifacts:** real = value plus `ChipProvenance`; low-confidence = muted artifact plus confidence label; honest-null = artifact omitted or HonestNullState inside the card.
- **Cross-domain insight:** real only with at least two evidence chips; low-confidence when one weak signal exists; honest-null = no insight card, not a filler message.
- **Conversational logs:** real = saved to domain source with `you logged`; low-confidence = queued parse awaiting confirmation; honest-null = CIA asks a clarifying question instead of guessing.
- **AI and data controls:** every artifact opens a source sheet with category, source, scope, retention, export, revoke, delete, and "why CIA used this" explanation.
- **Voice controls:** if [10]/[11] is invoked, ConsentCard names microphone, transcript, retention, export, revoke, and delete before capture.

### 9. All states
- **Default:** chat history, suggestion chips, composer, and active nav render.
- **Skeleton:** message rows and artifact geometry shimmer while older history or cards load.
- **Empty:** no prior messages; CIA greeting and one starter chip show.
- **Error:** failed sends, failed logs, failed cards, and pull-to-load failure each preserve existing history and expose retry/delete.
- **Success:** sent message lands, log confirmation flashes `--glow-done`, artifact updates in place.
- **Disabled:** composer dims to 40 percent when offline, rate-limited, permission-blocked, or a destructive action sheet is open.
- **Offline:** cached history remains readable; sends queue only when the user explicitly retries.

### 10. Motion & interaction
- **Message send:** text flies from composer to user bubble; input clears after persistence.
- **Artifact draw:** charts stroke in after bubble lands; reduced-motion renders final state.
- **Chips:** selected suggestion fills orange then becomes a user message.
- **Voice:** tap mic enters in-chat voice [10]; long-press opens full-screen voice [11].
- **Search:** TopBar search opens SearchOverlay with autofocus.
- **Gestures:** pull to load older history; long-press message opens action Sheet.
- **Reduced-motion:** message fly, chart draw, chip flight, and thinking dots become opacity-only transitions.

### 11. Motivation-tier adaptation
- **Low:** fewer chips, shorter CIA turns, artifacts summarize one next step.
- **Medium:** default mix of text, chips, and compact artifacts.
- **High:** more source chips, expanded evidence rows, denser artifacts, and advanced domain chips.

### 12. Accessibility
- **Contrast:** paper text on chat bubbles, SolidCards, and dark base clears AA+.
- **Targets:** composer, send, mic, chips, TopBar glyphs, artifact cards, and nav meet 44px.
- **Screen readers:** bubbles announce speaker, timestamp, status, and whether an artifact has source evidence.
- **Safety:** because users may disclose distress in chat, crisis support is reachable from the TopBar/help sheet and auto-surfaces when crisis language is detected.
- **Data controls:** every sourced artifact and voice transcript exposes source, retention, export, revoke, and delete.
- **Reduced-motion:** mirrors Section 10.

### 13. Premium checklist
1. **Connects:** chat can connect fitness, wellbeing, finance, nutrition, schedule, and goals through sourced artifacts.
2. **Honest:** CIA claims require evidence chips or low-confidence language.
3. **Premium:** conversation-first hierarchy, no generic hero dashboard.
4. **Consent:** voice, third-party, health, and CIA-memory controls are concrete.
5. **Safety:** crisis support available and non-gamified.
6. **Semantic glow:** CIA synthesis, member action, and completion separated.
7. **States:** default, skeleton, empty, error, success, disabled, offline, low-confidence, and queued-send covered.
8. **A11y:** 44px targets, labels, contrast, and reduced motion included.
9. **Voice:** calm, sentence case, no unsupported certainty, CIA only.
