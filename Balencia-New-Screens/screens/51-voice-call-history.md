# 51-voice-call-history - hi-fi glass spec

### 1. Header
- **ID:** 51
- **Name:** Voice call history
- **Route(s) covered:** /voice-call
- **Frame:** Native mobile, 390x844 reference.
- **Tab:** CIA / Me voice surfaces.
- **Source:** app_design 3/51-voice-call-history.md and ascii_wireframes/51-voice-call-history.md.
- **Batch:** 17

### 2. Purpose
Voice call history turns temporary voice coaching into a reviewable record: scheduled calls, past recordings, summaries, transcripts, action items, and emotional trend reads. It preserves trust by labeling recording availability, transcript provenance, and delete controls clearly.

### 3. Entry & exit
- **Entry:** CIA Chat [09], Voice Full Screen [11], Me quick link, or post-call summary [79].
- **Primary exit:** open a call detail, schedule a call, or return to the origin stack.
- **Action exits:** action items can become tasks, call summaries can open CIA chat, and recordings can play when retained.
- **Privacy exit:** transcript, recording, summary, and voice-data delete controls live in call detail overflow.
- **Failure exit:** cached summaries remain visible with SyncStatus.

### 4. Layout anatomy
**Regions, top to bottom:**
1. TopBar with "Voice sessions", back, and schedule plus.
2. SegmentedTabs for History and Action items.
3. Cadence strip for calls per week.
4. Upcoming call card and Schedule call CTA.
5. Date-grouped call history cards with sentiment sparkline, summary, transcript, recording state, and delete entry.
6. Action Items tab with filters, MomentumBar, and task rows.
7. GlassNavBar.

**ASCII wireframe (390x844):**
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
```

### 5. Components
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

### 6. Visual treatment
- **Atmosphere:** `#0A0A0F` warm dark, purple pool only on CIA-generated summary areas.
- **Semantic glows:** schedule CTA uses `--glow-you #FF5E00`; completed action items use `--glow-done #34A853`; transcript summaries use `--glow-cia #7F24FF`.
- **Cards:** dense lists use SolidCard on `#211008`; call detail summary can use GlassCard.
- **Color:** orange action, green completed/readiness, purple CIA synthesis.
- **Type:** Neue Montreal with one Tiempos italic word in the detail summary, such as "your *voice* record."

### 7. Content & copy
- **H1:** "Voice sessions."
- **CTA:** "Schedule a call."
- **Call cards:** "Morning check-in", "Quick question", "Evening reflection."
- **Metadata:** "18min", "recording available", "transcript ready", "summary by CIA."
- **Delete copy:** "Delete recording and transcript."
- **Action items:** "Meditate for 10min", "Review weekly budget."
- **Empty copy:** "No voice sessions yet. Schedule a check-in when you want to talk it through."

### 8. Data & honesty states
- **Call log:** real = call time, duration, session type, and source; low-confidence = local cached call awaiting sync; honest-null = no sessions prompt.
- **Transcript:** real = generated text plus provenance; low-confidence = partial transcript label; honest-null = "Transcript not available."
- **Recording:** real = retained audio with expiry; low-confidence = processing; honest-null = "Recording deleted or not retained."
- **Action items:** real = extracted and user-confirmed; low-confidence = CIA draft; honest-null = no tasks.
- **Controls:** voice data includes consent, revoke, export, recording delete, transcript delete, and summary delete.

### 9. All states
- **Default:** tabs, upcoming call, history cards, transcripts, recordings, and actions render.
- **Skeleton:** tabs, cadence strip, upcoming card, and four call rows shimmer in final geometry.
- **Empty:** no calls shows scheduling CTA and voice-data explanation.
- **Error:** cached rows stay; failed transcript or recording names its source.
- **Success:** scheduled call appears in Upcoming; deleted recording removes playback and logs provenance.
- **Disabled:** schedule, playback, transcript, or delete actions dim when entitlement, retention, or consent blocks them.

### 10. Motion & interaction
- **Load:** cadence strip draws, then upcoming and call cards fade by date group.
- **Schedule:** plus opens Sheet with recurring call options.
- **Call detail:** row opens stack detail with emotional trend, summary, transcript, action items, and recording controls.
- **Action items:** checkbox animates green and updates MomentumBar.
- **Delete:** destructive confirmation requires explicit text label and keeps cached summary unless separately deleted.
- **Reduced-motion:** disables chart draw and row stagger; content appears settled.

### 11. Motivation-tier adaptation
- **Low:** show upcoming call, latest summary, and one confirmed action item.
- **Medium:** default two-tab history.
- **High:** expose cadence chart, transcript search, recording freshness, and action-item filters.

### 12. Accessibility
- **Contrast:** paper text on `#0A0A0F` and `#211008` meets AA+.
- **Targets:** back, plus, tabs, rows, playback, delete, and checkboxes are 44px minimum.
- **Screen readers:** call rows announce title, time, duration, transcript status, recording status, and delete availability.
- **Safety:** crisis language in transcript surfaces SafetyResourceCard and never gamifies the event.
- **Data controls:** voice, transcript, summary, CIA inference, and third-party calendar data expose consent/revoke/delete.
- **Reduced-motion:** mirrors Section 10.

### 13. Premium checklist
1. **Connects:** voice sessions link coaching, tasks, calendar, and summaries.
2. **Honest:** recording, transcript, and summary provenance are explicit.
3. **Premium:** calm record, not a call-center log.
4. **Warm-dark:** canon surfaces used.
5. **Semantic glow:** action, completion, and CIA meanings stated.
6. **60/30/10:** orange action, green completion, purple CIA.
7. **Type:** Neue Montreal plus one Tiempos italic word.
8. **States:** Default, Skeleton, Empty, Error, Success, Disabled covered.
9. **Motivation tiers:** low, medium, high specified.
10. **Accessibility:** labels, 44px targets, safety, reduced-motion covered.
11. **Honesty triple:** real, low-confidence, honest-null defined.
12. **Catalog:** canon components used; CallHistoryCard marked NEW.
13. **CIA voice:** summaries are sourced and deletable.
