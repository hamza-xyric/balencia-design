# 55-yoga-sessions - A+++ hi-fi mobile spec

## Header
- **Source ID:** 55
- **Source spec:** `Balencia-New-Screens/screens/55-yoga-sessions.md`
- **Evidence:** screens/55-yoga-sessions.md, work/briefs/55.md, work/drafts/55.md, Functional Content Brief: Yoga Sessions Screen
- **Route(s):** `/yoga`
- **Frame:** 390x844 native mobile
- **Priority:** converted with asset slots

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Yoga sessions provide a guided practice gateway for browsing sessions, starting a full-screen active practice, and saving a post-session summary.
- **Premium Visual Director:** make Yoga sessions hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Yoga sessions names health category, source, freshness, confidence, retention, export, revoke, and delete before synced values or photo-derived reads are trusted.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+-------------------------------------------+
| <- Yoga sessions                  [Lv.8]  |
|                                           |
| +---------------------------------------+ |
| | 12-day streak                   flame | |
| | longest 18                           | |
| | M T W T F S S  heatmap cells         | |
| +---------------------------------------+ |
|                                           |
| +---------------------------------------+ |
| | CIA                                   | |
| | Morning yoga sets the *tone*.         | |
| | [fitness] [wellbeing]  Start session  | |
| +---------------------------------------+ |
|                                           |
| [All] [Beginner] [Intermediate] [Advanced]|
|                                           |
| +---------------------------------------+ |
| | image  Morning flow       30 min      | |
| |        12 poses           start       | |
| +---------------------------------------+ |
| +---------------------------------------+ |
| | image  Evening wind-down  15 min      | |
| |        8 poses            completed   | |
| +---------------------------------------+ |
|                                           |
| POSE LIBRARY                       see all|
| +----------+ +----------+ +----------+    |
| | pose     | | pose     | | pose     |    |
| +----------+ +----------+ +----------+    |
|                                           |
| YOUR STATS                                |
| +----------------+ +-------------------+  |
| | poses mastered | | sessions / hours  |  |
| | 42 of 50       | | 12 / 4.5          |  |
| +----------------+ +-------------------+  |
|                         Today CIA Goals Me|
+-------------------------------------------+

Route handling: `/yoga`
```

## Focal Hierarchy
- **Dominant focal moment:** Yoga sessions hero; it should be visually singular, not one tile among many.
- **Secondary layer:** TopBar with CIA only when the source supports a synthesized read.
- **Operational layer:** Streak hero, CIA coaching note, Difficulty filters, Guided sessions.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*sessions*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar:** Transparent header with back, title, and RPGBadge.
- **GlassCard:** Hero streak card only.
- **CalendarHeatmap:** Seven-day practice cells with true zero and skipped-day states.
- **CIAInsightCard:** Purple glass card with evidence chips and one action.
- **ChipProvenance:** Appears beside streak, mastery, weekly practice, and XP values when they come from synced or logged data.
- **SegmentedTabs:** Difficulty filter.
- **NEW: SessionCard:** SolidCard optimized for media thumbnail, duration, pose count, completion badge, and Start session action. Rationale: standard ListRow is too text-heavy for guided media sessions.
- **PoseCard:** Compact pose preview with image or safe illustration, difficulty, and target area.
- **ProgressRing:** Poses mastered.
- **KPIRow:** Sessions and hours.
- **TrendChart:** Weekly practice minutes.
- **Sheet:** Pose detail and post-session summary.
- **NEW: PoseTimerRing:** Large countdown ring for active holds. Rationale: active yoga needs a glanceable timer larger than the catalog ring.
- **GlassPillInput:** Optional summary notes.

## Data Honesty
- **Practice streak:** Real uses `yoga_session_logs` with ChipProvenance `via yoga logs`; low-confidence shows a muted approximate value only when logs are partially synced; honest-null says "your practice starts today" with no fake streak.
- **RPG level:** Real uses the user RPG profile with ChipProvenance `via RPG profile`; low-confidence is muted with `estimated - low confidence`; honest-null hides the badge or reads "level pending."
- **Poses mastered:** Real shows `42 of 50` plus ChipProvenance `you logged`; low-confidence shows muted count after partial sync; honest-null says "Log a session to begin mastery tracking."
- **Weekly practice:** Real uses solid orange line from practice minutes with ChipProvenance `via session history`; low-confidence labels partial sync; honest-null keeps only axes and a prompt to practice a few days.
- **Session completion:** Real completion updates streak and XP; honest-null summary omits XP if the reward service did not return a value.
- **Video media:** Pose videos are instructional assets; if unavailable, instructions remain visible and the video slot shows "tutorial unavailable."

## Consent and Safety
- Yoga sessions names health category, source, freshness, confidence, retention, export, revoke, and delete before synced values or photo-derived reads are trusted.
- Yoga sessions treats media as consent-gated: no identifiable face, body, home, document, provider logo, or private text appears without explicit permission.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- Keep navigation targets aligned to `/yoga`. Do not add alternate vanity routes.

## States
- **Default:** Beginner filter selected, streak and sessions loaded, pose library preview visible, stats condensed.
- **Skeleton:** Streak cells, session cards, pose cards, and stat rings shimmer in place with no fake values.
- **Empty:** Three beginner sessions and six foundational poses remain available; stats show true zero with non-shaming copy.
- **Error:** Each section can fail independently; active timer remains local and usable.
- **Success:** Completing a pose flashes green on the timer; finishing a session opens Summary sheet and updates streak after save.
- **Disabled:** Done button remains at 40% opacity until the user selects a rating; Start session is disabled only while content is loading.
- **Paused:** Active screen dims, timer freezes, and Pause changes to Resume.

## Motion
- **Browse entry:** Streak cells populate sequentially, SessionCards rise 12px, and chart lines draw left-to-right.
- **Active practice:** Pose transitions crossfade over 280ms; PoseTimerRing sweeps counterclockwise; CIA cues rotate no more than every 30 seconds.
- **Summary:** XP badge and streak update scale gently with green completion glow.
- **Gestures:** Tap cards and filters, edge-swipe back, drag sheets down, pull to refresh browse data.
- **Haptics:** Light on filters and pose transitions, medium on completion.
- **Reduced motion:** Crossfades become instant cuts, rings jump to final states, glows stop breathing, and count-ups are skipped.

## Image Slots
- `HIFI-55-01` - content proof or instructional media slot; screen-specific; privacy-safe, non-diagnostic, no identifiable person. Prompt: Yoga sessions instructional media thumbnails, Balencia warm-dark glass UI asset, privacy-safe, no brand logos, no readable UI text.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/yoga`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** Paper text on warm dark and SolidCard surfaces meets AA+; orange is used for non-text progress or large controls.; **Targets:** Filters, session actions, pose cards, close, skip, pause, and Done all maintain 44px minimum hit targets.; **Screen readers:** Flame, level badge, pose timer, rating circles, and completion badges include explicit labels and selected states.
