# 51-voice-call-history - A+++ hi-fi mobile spec

## Header
- **Source ID:** 51
- **Source spec:** `Balencia-New-Screens/screens/51-voice-call-history.md`
- **Evidence:** screens/51-voice-call-history.md, app_design 3/51-voice-call-history.md and ascii_wireframes/51-voice-call-history.md.
- **Route(s):** `/voice-call`
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Voice call history turns temporary voice coaching into a reviewable record: scheduled calls, past recordings, summaries, transcripts, action items, and emotional trend reads.
- **Premium Visual Director:** make Voice call history command surface the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Voice call history keeps privacy-first language and SafetyResourceCard reachable for journal, mood, stress, sleep, energy, voice, and wellbeing-adjacent moments.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+--------------------------------------+
| <        Voice sessions          +   |
| [History] [Action items]             |
| calls/week  _ _ __ ___ _             |
| UPCOMING                             |
| Thu May 22, 3 PM  Weekly check-in    |
| [schedule a call]                    |
| TODAY                                |
| 10:32 AM 18min Morning check-in      |
| sentiment line, summary, transcript  |
| recording available       delete ... |
| 8:15 AM 7min Quick question          |
| YESTERDAY                            |
| 6:45 PM 24min Evening reflection     |
| Today | CIA | Goals | Me             |
+--------------------------------------+

Route handling: `/voice-call`
```

## Focal Hierarchy
- **Dominant focal moment:** Voice call history command surface; it should be visually singular, not one tile among many.
- **Secondary layer:** TopBar with "Voice sessions", back, and schedule plus. with CIA only when the source supports a synthesized read.
- **Operational layer:** SegmentedTabs for History and Action items., Cadence strip for calls per week., Upcoming call card and Schedule call CTA., Action Items tab with filters, MomentumBar, and task rows..
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*history*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar** - back and schedule action.
- **SegmentedTabs** - History and Action items.
- **GlassCard** - upcoming call and call detail summary.
- **ListRow** - call cards and action-item rows.
- **TrendChart** - call detail emotional trend; no projected line because this is a record.
- **MomentumBar** - action-item completion.
- **ChipProvenance** - `recording retained`, `transcript generated`, `summary by CIA`, `you deleted`.
- **ConsentCard** - voice recording retention, transcript use, delete/export.
- **SafetyResourceCard** - shown when a transcript flags crisis language.
- **NEW: CallHistoryCard** - compact call row combining duration, session type, transcript, recording, summary snippet, and delete overflow.

## Data Honesty
- **Call log:** real = call time, duration, session type, and source; low-confidence = local cached call awaiting sync; honest-null = no sessions prompt.
- **Transcript:** real = generated text plus provenance; low-confidence = partial transcript label; honest-null = "Transcript not available."
- **Recording:** real = retained audio with expiry; low-confidence = processing; honest-null = "Recording deleted or not retained."
- **Action items:** real = extracted and user-confirmed; low-confidence = CIA draft; honest-null = no tasks.
- **Controls:** voice data includes consent, revoke, export, recording delete, transcript delete, and summary delete.

## Consent and Safety
- Voice call history keeps privacy-first language and SafetyResourceCard reachable for journal, mood, stress, sleep, energy, voice, and wellbeing-adjacent moments.
- Voice call history lets every CIA evidence chip explain why the source was used, mark low-confidence synthesis, and delete recommendation history.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- Keep navigation targets aligned to `/voice-call`. Do not add alternate vanity routes.

## States
- **Default:** tabs, upcoming call, history cards, transcripts, recordings, and actions render.
- **Skeleton:** tabs, cadence strip, upcoming card, and four call rows shimmer in final geometry.
- **Empty:** no calls shows scheduling CTA and voice-data explanation.
- **Error:** cached rows stay; failed transcript or recording names its source.
- **Success:** scheduled call appears in Upcoming; deleted recording removes playback and logs provenance.
- **Disabled:** schedule, playback, transcript, or delete actions dim when entitlement, retention, or consent blocks them.

## Motion
- **Load:** cadence strip draws, then upcoming and call cards fade by date group.
- **Schedule:** plus opens Sheet with recurring call options.
- **Call detail:** row opens stack detail with emotional trend, summary, transcript, action items, and recording controls.
- **Action items:** checkbox animates green and updates MomentumBar.
- **Delete:** destructive confirmation requires explicit text label and keeps cached summary unless separately deleted.
- **Reduced-motion:** disables chart draw and row stagger; content appears settled.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/voice-call`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** paper text on `#0A0A0F` and `#211008` meets AA+.; **Targets:** back, plus, tabs, rows, playback, delete, and checkboxes are 44px minimum.; **Screen readers:** call rows announce title, time, duration, transcript status, recording status, and delete availability.
