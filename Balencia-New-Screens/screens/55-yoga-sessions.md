# 55-yoga-sessions

## 1. Header
- **Screen ID:** 55
- **Name:** Yoga sessions
- **Route(s) covered:** `/yoga`
- **Tab:** Today / Fitness / Wellbeing
- **Source:** Functional Content Brief: Yoga Sessions Screen
- **Batch:** 12

## 2. Purpose
Yoga sessions provide a guided practice gateway for browsing sessions, starting a full-screen active practice, and saving a post-session summary. The screen balances streak momentum, pose education, and CIA coaching while keeping the first action calm: choose a session and begin.

## 3. Entry & exit
- **Entry paths:** Explore [18], Fitness dashboard [26], Home [12], Wellbeing hub [89], and CIA Chat [09] deep-links can open the Yoga route.
- **Primary exit:** Start session transitions into the active practice takeover with the tab bar hidden.
- **Secondary exits:** Back returns to the origin stack; CIA card opens CIA Chat [09]; level badge opens RPG Character [19]; pose cards open Pose Detail sheet; Done from summary returns to Browse mode.
- **Failure exit:** Active practice keeps running on the device timer if the network drops; failed content sections remain isolated so the user can still practice.

## 4. Layout anatomy
Top-to-bottom regions:
1. **TopBar:** Back chevron, title, and RPG level badge. It gains a glass-pill backing on scroll.
2. **Streak hero:** GlassCard with current streak, longest streak, and seven-day CalendarHeatmap.
3. **CIA coaching note:** Context-aware recommendation with evidence chips and Start session action.
4. **Difficulty filters:** SegmentedTabs for all, beginner, intermediate, and advanced.
5. **Guided sessions:** Vertical SessionCards with thumbnail, duration, pose count, difficulty, and state.
6. **Pose library:** Horizontal or grid preview of foundational poses, with a sheet for detail.
7. **Stats section:** SolidCards for poses mastered, sessions, hours, weekly practice line, and library mix.
8. **Active practice takeover:** Full-screen timer, current pose media, instructions, next pose preview, pause/resume, skip, and end controls.
9. **Summary sheet:** Session completion, rating, notes, streak update, XP, and Done CTA.
10. **Navigation:** GlassNavBar in browse mode, hidden during active practice.

**ASCII Wireframe (390x844):**
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
```

## 5. Components
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
- **BtnPrimary, BtnSecondary, BtnGhost:** Start, pause/resume, skip, and Done.

## 6. Visual treatment
- **Atmosphere:** Warm radial glow over `#0A0A0F`; a subtle purple pool sits behind the CIA card only.
- **Selective glass:** TopBar on scroll, streak hero, CIA note, sheets, FAB, and nav use glass. Sessions, stats, pose lists, and charts use SolidCard.
- **Semantic glow:** Streak hero uses `--glow-you` for active practice momentum; CIA note uses `--glow-cia`; mastery and summary completion use `--glow-done`.
- **Timer treatment:** PoseTimerRing uses burnt orange progress, not a separate yoga accent color, preserving the global data-ink rule.
- **Hero type moment:** "12-day streak" is the largest type moment; CIA copy uses one italic word, *tone*, when evidence supports the suggestion.
- **Color discipline:** Orange for practice progress and active controls, green for completion, purple for CIA context.

## 7. Content & copy
- **H1:** Yoga sessions
- **Streak:** "12-day streak", "your longest streak: 18", "your practice starts today"
- **CIA browse note:** "Morning yoga sets the *tone* for your day. 15 minutes is enough."
- **CIA cold-start note:** "Yoga builds strength and calm. Start with a beginner session."
- **Filters:** "All", "Beginner", "Intermediate", "Advanced"
- **Sessions:** "Morning flow", "Evening wind-down", "30 min", "12 poses", "Start session", "completed"
- **Pose library:** "Pose library", "Master your first poses", "see all", "search poses", "no poses found"
- **Active practice:** "pose 2 of 12", "Downward dog", "hold for 45 seconds", "breathe deeply", "Skip pose", "Pause", "Resume"
- **Summary:** "Session complete", "How did that feel?", "too easy", "just right", "too hard", "session notes (optional)", "Done"
- **Errors:** "Couldn't load your streak. Pull to refresh.", "No sessions at this level right now. Try beginner or refresh.", "Select a rating to continue."

## 8. Data & honesty states
- **Practice streak:** Real uses `yoga_session_logs` with ChipProvenance `via yoga logs`; low-confidence shows a muted approximate value only when logs are partially synced; honest-null says "your practice starts today" with no fake streak.
- **RPG level:** Real uses the user RPG profile with ChipProvenance `via RPG profile`; low-confidence is muted with `estimated - low confidence`; honest-null hides the badge or reads "level pending."
- **Poses mastered:** Real shows `42 of 50` plus ChipProvenance `you logged`; low-confidence shows muted count after partial sync; honest-null says "Log a session to begin mastery tracking."
- **Weekly practice:** Real uses solid orange line from practice minutes with ChipProvenance `via session history`; low-confidence labels partial sync; honest-null keeps only axes and a prompt to practice a few days.
- **Session completion:** Real completion updates streak and XP; honest-null summary omits XP if the reward service did not return a value.
- **Video media:** Pose videos are instructional assets; if unavailable, instructions remain visible and the video slot shows "tutorial unavailable."

## 9. All states
- **Default:** Beginner filter selected, streak and sessions loaded, pose library preview visible, stats condensed.
- **Skeleton:** Streak cells, session cards, pose cards, and stat rings shimmer in place with no fake values.
- **Empty:** Three beginner sessions and six foundational poses remain available; stats show true zero with non-shaming copy.
- **Error:** Each section can fail independently; active timer remains local and usable.
- **Success:** Completing a pose flashes green on the timer; finishing a session opens Summary sheet and updates streak after save.
- **Disabled:** Done button remains at 40% opacity until the user selects a rating; Start session is disabled only while content is loading.
- **Paused:** Active screen dims, timer freezes, and Pause changes to Resume.

## 10. Motion & interaction
- **Browse entry:** Streak cells populate sequentially, SessionCards rise 12px, and chart lines draw left-to-right.
- **Active practice:** Pose transitions crossfade over 280ms; PoseTimerRing sweeps counterclockwise; CIA cues rotate no more than every 30 seconds.
- **Summary:** XP badge and streak update scale gently with green completion glow.
- **Gestures:** Tap cards and filters, edge-swipe back, drag sheets down, pull to refresh browse data.
- **Haptics:** Light on filters and pose transitions, medium on completion.
- **Reduced motion:** Crossfades become instant cuts, rings jump to final states, glows stop breathing, and count-ups are skipped.

## 11. Motivation-tier adaptation
- **Low density:** Hides pose library and stats; shows streak hero, one CIA suggestion, and one beginner session.
- **Medium density:** Default layout with session list, six pose cards, and condensed stats.
- **High density:** Shows nine pose cards, last ten sessions, library mix donut, and deeper trend detail.

## 12. Accessibility
- **Contrast:** Paper text on warm dark and SolidCard surfaces meets AA+; orange is used for non-text progress or large controls.
- **Targets:** Filters, session actions, pose cards, close, skip, pause, and Done all maintain 44px minimum hit targets.
- **Screen readers:** Flame, level badge, pose timer, rating circles, and completion badges include explicit labels and selected states.
- **Active practice:** Timer label announces remaining seconds without over-announcing every tick.
- **Reduced motion:** Matches Section 10 and preserves readability for active practice.

## 13. Premium checklist
1. **Connects:** CIA can reference fitness recovery or wellbeing state before recommending a practice.
2. **Honest:** Streaks, mastery, XP, and video availability never fabricate values.
3. **Premium:** Guided practice feels warm, focused, and native, with clear browse and active states.
4. **Route truth:** `/yoga` is the only live route named.
5. **Selective glass:** Hero and overlays use glass; dense lists and stats use solid surfaces.
6. **Semantic glow:** Orange, green, and purple each carry one meaning.
7. **One hero type moment:** Streak or active pose title owns the visual focus.
8. **All states:** Default, skeleton, empty, error, success, disabled, and paused states are covered.
9. **Motion:** Timer and session transitions have physical easing and reduced-motion paths.
10. **A11y:** Active controls, ratings, timer, and media have labels and 44px targets.
11. **Motivation tiers:** Low, medium, and high density variants preserve the same core task.
12. **Source fidelity:** Browse, active session, summary sheet, pose detail, filters, and stats are preserved.
13. **Premium gating:** Core guided practice remains available; personalized CIA depth may be gated without blocking practice.
14. **Voice:** Sentence case, calm copy, no exclamation marks.
