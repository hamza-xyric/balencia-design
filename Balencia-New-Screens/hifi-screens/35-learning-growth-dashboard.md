# 35-learning-growth-dashboard - A+++ hi-fi mobile spec

## Header
- **Source ID:** 35
- **Source spec:** `Balencia-New-Screens/screens/35-learning-growth-dashboard.md`
- **Evidence:** screens/35-learning-growth-dashboard.md, app_design 3/35-learning-growth-dashboard.md and ascii_wireframes/35-learning-growth-dashboard.md.
- **Route(s):** no live route; legacy Explore domain dashboard.
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Learning & growth tracks books, courses, lessons, study sessions, skill mastery, streaks, and reflection prompts.
- **Premium Visual Director:** make Learning & growth dashboard hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Learning & growth dashboard uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

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

Route handling: no live route; legacy Explore domain dashboard.
```

## Focal Hierarchy
- **Dominant focal moment:** Learning & growth dashboard hero; it should be visually singular, not one tile among many.
- **Secondary layer:** Domain TopBar with cyan identity accent. with CIA only when the source supports a synthesized read.
- **Operational layer:** CIA coaching note about reading pace., CIA suggested lesson/action checklist., Active goals rings, Skill mastery bars, Study time TrendChart., Consistency streak and course library..
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*dashboard*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar** - domain header and overflow.
- **CIAInsightCard** - study coaching note.
- **GlassCard** - current book/course hero.
- **KPIRow** - pages, minutes, streak.
- **ProgressRing / MomentumBar / TrendChart** - book progress, daily pages, study time.
- **ChipProvenance** - `you logged`, `course import`, `CIA projection`, `estimated`.
- **ListRow** - library and recent activity.
- **FABQuickLog** - adapted as `log session` action.
- **HonestNullState / SkeletonState / ErrorState** - data states.

## Data Honesty
- **Study sessions:** real = logged minutes/pages; low-confidence = imported partial session; honest-null = no session prompt.
- **Course/book progress:** real = user or provider progress; low-confidence = stale import; honest-null = empty library.
- **Skill mastery:** real = enough sessions and goals; low-confidence = inferred skill label; honest-null = "complete a few sessions to map skills."
- **CIA suggestions:** real = current learning plan; low-confidence = draft suggestion; honest-null = hidden until context exists.
- **Controls:** imported course data, journal reflection, CIA suggestions, and third-party sources expose consent/revoke/delete.

## Consent and Safety
- Learning & growth dashboard uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- This is documented as a modal, overlay, utility, or source-only surface; do not invent a live route.

## States
- **Default:** coaching note, hero, suggestions, goals, skills, chart, library, and FAB render.
- **Skeleton:** hero ring, KPI row, bars, chart axis, and library rows shimmer in place.
- **Empty:** welcome note, ghosted progress ring, add book/course CTA, no fake study data.
- **Error:** failed import names provider and keeps manual logs.
- **Success:** logged session updates progress, streak, and study time with green confirmation.
- **Disabled:** imports, projections, or journal handoff dim when consent or connectivity blocks them.

## Motion
- **Load:** hero ring fills, KPIs count, bars rise, chart draws actual then projection.
- **Log session:** FAB opens Sheet for reading, lesson, course, or reflection.
- **Suggestions:** checkable rows animate to green and can undo.
- **Chart scrub:** shows date, minutes, source, and confidence.
- **Prompt:** opens Journal [37] with prompt prefilled.
- **Reduced-motion:** all charts and count-ups render at final state.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: no live route; legacy Explore domain dashboard..
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** paper text on `#0A0A0F` and `#211008` meets AA+.; **Targets:** rows, FAB, chart points, suggestions, and tabs are 44px minimum.; **Screen readers:** charts summarize value, source, and confidence before points.
