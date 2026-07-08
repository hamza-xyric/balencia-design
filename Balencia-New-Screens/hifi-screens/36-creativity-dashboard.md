# 36-creativity-dashboard - A+++ hi-fi mobile spec

## Header
- **Source ID:** 36
- **Source spec:** `Balencia-New-Screens/screens/36-creativity-dashboard.md`
- **Evidence:** screens/36-creativity-dashboard.md, app_design 3/36-creativity-dashboard.md and ascii_wireframes/36-creativity-dashboard.md.
- **Route(s):** no live route; legacy Explore domain dashboard.
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Creativity is the practice hub for projects, prompts, idea capture, gallery/portfolio progress, and session history.
- **Premium Visual Director:** make Creativity dashboard hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Creativity dashboard uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+--------------------------------------+
| < Creativity                     ... |
| amber identity line                   |
| CIA: best work happens in morning     |
| ACTIVE PROJECTS                       |
| Short film script [########---] 45%   |
| Photography portfolio [#########]72%  |
| PROMPT: make with materials nearby    |
| THIS WEEK: _ # # _ # _ _              |
| CREATIVE PRACTICE heatmap grid        |
| KPIs: sessions 3, hours 4.5, streak 8 |
| GOALS: Film 55, Photo 80, Write 30    |
| GALLERY: first draft -> demo -> film  |
| [ + log session ]                     |
| Today | CIA | Goals | Me              |
+--------------------------------------+

Route handling: no live route; legacy Explore domain dashboard.
```

## Focal Hierarchy
- **Dominant focal moment:** Creativity dashboard hero; it should be visually singular, not one tile among many.
- **Secondary layer:** Domain TopBar with amber identity accent. with CIA only when the source supports a synthesized read.
- **Operational layer:** CIA coaching note about best creative time., Active projects card with progress bars and sparkline., Inspiration prompt with start creating and reflect actions., This-week strip and large CalendarHeatmap practice hero..
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*dashboard*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar** - creativity title and overflow.
- **CIAInsightCard** - creative pattern note.
- **GlassCard** - active projects and inspiration prompt.
- **MomentumBar / TrendChart / ProgressRing** - project progress, session trend, goals.
- **KPIRow** - sessions, hours, streak.
- **ChipProvenance** - `you logged`, `project update`, `journal prompt`, `estimated`.
- **ListRow** - recent activity.
- **NEW: PortfolioTimeline** - horizontal gallery timeline for creative milestones; needed because catalog lacks a portfolio-specific sequence component.
- **SkeletonState / ErrorState / HonestNullState** - states.

## Data Honesty
- **Projects:** real = user project and milestone progress; low-confidence = imported or stale update; honest-null = add-project prompt.
- **Prompt:** real = CIA-generated from recent practice; low-confidence = starter prompt; honest-null = static prompt labeled starter.
- **Heatmap:** real = logged sessions; low-confidence = local unsynced session; honest-null = empty grid with no shame.
- **Gallery:** real = user milestones; low-confidence = upload pending; honest-null = timeline hidden until first milestone.
- **Controls:** images, project files, journal prompts, CIA inference, and third-party imports expose consent/revoke/delete.

## Consent and Safety
- Creativity dashboard uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- This is documented as a modal, overlay, utility, or source-only surface; do not invent a live route.

## States
- **Default:** CIA note, projects, prompt, heatmap, KPIs, goals, gallery, activity, and FAB render.
- **Skeleton:** project rows, heatmap cells, KPI row, timeline, and activity rows shimmer.
- **Empty:** welcome note, prompt, empty heatmap, and start-project CTA.
- **Error:** failed import or upload names source and keeps cached project rows.
- **Success:** logged session updates heatmap, KPIs, streak, and activity with green confirmation.
- **Disabled:** gallery upload, prompt saving, or CIA suggestions dim when consent blocks them.

## Motion
- **Load:** project bars draw, prompt fades in, heatmap cells stagger, timeline line draws.
- **Log session:** FAB opens Sheet for writing, sketch, recording, editing, or other.
- **Prompt:** start creating opens session timer; reflect opens Journal [37].
- **Gallery:** milestone tap opens Image Viewer [67] or project detail.
- **Trend:** session chart scrub shows minutes, project, source, confidence.
- **Reduced-motion:** cells, line, and count-ups appear settled.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: no live route; legacy Explore domain dashboard..
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** paper text on `#0A0A0F` and `#211008` meets AA+.; **Targets:** project rows, prompt buttons, heatmap cells, gallery items, and FAB are 44px minimum.; **Screen readers:** heatmap summarizes sessions, hours, source count, and confidence before cells.
