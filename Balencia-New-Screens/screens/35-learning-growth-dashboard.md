# 35-learning-growth-dashboard - hi-fi glass spec

### 1. Header
- **ID:** 35
- **Name:** Learning & growth dashboard
- **Route(s) covered:** no live route; legacy Explore domain dashboard.
- **Frame:** Native mobile, 390x844 reference.
- **Tab:** Me / Explore legacy stack.
- **Source:** app_design 3/35-learning-growth-dashboard.md and ascii_wireframes/35-learning-growth-dashboard.md.
- **Batch:** 18

### 2. Purpose
Learning & growth tracks books, courses, lessons, study sessions, skill mastery, streaks, and reflection prompts. CIA acts as a study coach by connecting reading pace to learning goals without turning study into punishment.

### 3. Entry & exit
- **Entry:** Explore learning card, CIA learning insight, or Me domain shortcut.
- **Primary exit:** log study session.
- **Secondary exits:** Goal Detail [14], Journal [37] reflection prompt, or CIA Chat [09].
- **Library exit:** book/course row opens progress detail.
- **Failure exit:** cached sessions and library rows stay visible.

### 4. Layout anatomy
**Regions, top to bottom:**
1. Domain TopBar with cyan identity accent.
2. CIA coaching note about reading pace.
3. Current book/course hero with ProgressRing, KPI row, and MomentumBar.
4. CIA suggested lesson/action checklist.
5. Active goals rings, Skill mastery bars, Study time TrendChart.
6. Consistency streak and course library.
7. Daily reflection prompt and log-session FAB.

**ASCII wireframe (390x844):**
```text
+--------------------------------------+
| < Learning & growth              ... |
| cyan identity line                    |
| CIA: 45 pages this week across books |
| Thinking, Fast and Slow               |
| progress 62%  pages 45 minutes 135   |
| today goal [#########------] 9/15     |
| CIA SUGGESTS: read ch.7, review notes |
| ACTIVE GOALS: Read 68%, Course 42%    |
| SKILL: critical thinking 78, data 54  |
| STUDY TIME: orange line, purple plan  |
| CONSISTENCY: 12-day streak            |
| LIBRARY: book, course, completed      |
| [ + log session ]                     |
| Today | CIA | Goals | Me              |
+--------------------------------------+
```

### 5. Components
- **TopBar** - domain header and overflow.
- **CIAInsightCard** - study coaching note.
- **GlassCard** - current book/course hero.
- **KPIRow** - pages, minutes, streak.
- **ProgressRing / MomentumBar / TrendChart** - book progress, daily pages, study time.
- **ChipProvenance** - `you logged`, `course import`, `CIA projection`, `estimated`.
- **ListRow** - library and recent activity.
- **FABQuickLog** - adapted as `log session` action.
- **HonestNullState / SkeletonState / ErrorState** - data states.

### 6. Visual treatment
- **Atmosphere:** warm `#0A0A0F`; learning cyan `#06b6d4` is identity only.
- **Semantic glows:** active book uses `--glow-you #FF5E00`; completed lesson uses `--glow-done #34A853`; CIA finish projection uses `--glow-cia #7F24FF`.
- **Data viz:** orange actual study time, dashed purple projected finish date, green milestone dots.
- **Surfaces:** hero glass; library and activity SolidCard on `#211008`.
- **Type:** Neue Montreal plus one Tiempos italic word in prompt, e.g. "what felt *new*?"

### 7. Content & copy
- **Hero title:** "Thinking, Fast and Slow."
- **Coach note:** "You've read 45 pages this week across 2 books."
- **Actions:** "Read chapter 7", "Review yesterday's notes", "Start module 3."
- **Skill labels:** "Critical thinking", "Data fluency", "Writing", "Focus."
- **Prompt:** "What was the most counterintuitive idea from your reading today?"
- **CTA:** "Log session."
- **Empty copy:** "Add your first book or course to start tracking."

### 8. Data & honesty states
- **Study sessions:** real = logged minutes/pages; low-confidence = imported partial session; honest-null = no session prompt.
- **Course/book progress:** real = user or provider progress; low-confidence = stale import; honest-null = empty library.
- **Skill mastery:** real = enough sessions and goals; low-confidence = inferred skill label; honest-null = "complete a few sessions to map skills."
- **CIA suggestions:** real = current learning plan; low-confidence = draft suggestion; honest-null = hidden until context exists.
- **Controls:** imported course data, journal reflection, CIA suggestions, and third-party sources expose consent/revoke/delete.

### 9. All states
- **Default:** coaching note, hero, suggestions, goals, skills, chart, library, and FAB render.
- **Skeleton:** hero ring, KPI row, bars, chart axis, and library rows shimmer in place.
- **Empty:** welcome note, ghosted progress ring, add book/course CTA, no fake study data.
- **Error:** failed import names provider and keeps manual logs.
- **Success:** logged session updates progress, streak, and study time with green confirmation.
- **Disabled:** imports, projections, or journal handoff dim when consent or connectivity blocks them.

### 10. Motion & interaction
- **Load:** hero ring fills, KPIs count, bars rise, chart draws actual then projection.
- **Log session:** FAB opens Sheet for reading, lesson, course, or reflection.
- **Suggestions:** checkable rows animate to green and can undo.
- **Chart scrub:** shows date, minutes, source, and confidence.
- **Prompt:** opens Journal [37] with prompt prefilled.
- **Reduced-motion:** all charts and count-ups render at final state.

### 11. Motivation-tier adaptation
- **Low:** current book, one suggestion, log-session CTA.
- **Medium:** default dashboard.
- **High:** skill bars, study TrendChart, library progress, projections, and filters.

### 12. Accessibility
- **Contrast:** paper text on `#0A0A0F` and `#211008` meets AA+.
- **Targets:** rows, FAB, chart points, suggestions, and tabs are 44px minimum.
- **Screen readers:** charts summarize value, source, and confidence before points.
- **Safety:** learning dips are framed as rest or context, never failure.
- **Data controls:** third-party courses, journal, CIA projections, and study history can be revoked/deleted.
- **Reduced-motion:** mirrors Section 10.

### 13. Premium checklist
1. **Connects:** learning ties books, courses, goals, journal, and CIA.
2. **Honest:** all study progress has source/confidence.
3. **Premium:** active book hero plus dense learning modules.
4. **Warm-dark:** canon surfaces applied.
5. **Semantic glow:** effort, completion, and projection meanings stated.
6. **60/30/10:** orange data, green completion, purple CIA.
7. **Type:** Neue Montreal plus one Tiempos italic word.
8. **States:** Default, Skeleton, Empty, Error, Success, Disabled covered.
9. **Motivation tiers:** low, medium, high specified.
10. **Accessibility:** labels, 44px targets, chart summaries, reduced-motion covered.
11. **Honesty triple:** real, low-confidence, honest-null defined.
12. **Catalog:** canon components used.
13. **CIA voice:** study guidance is specific and non-shaming.
