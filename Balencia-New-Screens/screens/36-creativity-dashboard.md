# 36-creativity-dashboard - hi-fi glass spec

### 1. Header
- **ID:** 36
- **Name:** Creativity dashboard
- **Route(s) covered:** no live route; legacy Explore domain dashboard.
- **Frame:** Native mobile, 390x844 reference.
- **Tab:** Me / Explore legacy stack.
- **Source:** app_design 3/36-creativity-dashboard.md and ascii_wireframes/36-creativity-dashboard.md.
- **Batch:** 18

### 2. Purpose
Creativity is the practice hub for projects, prompts, idea capture, gallery/portfolio progress, and session history. CIA notices when creative work happens and suggests low-friction ways to keep making.

### 3. Entry & exit
- **Entry:** Explore Creativity card, CIA creative insight, or Me domain shortcut.
- **Primary exit:** log creative session.
- **Secondary exits:** Goal Detail [14], Journal [37], project detail, or CIA Chat [09].
- **Gallery exit:** open portfolio milestone or attached project image.
- **Failure exit:** cached project and gallery state stays visible.

### 4. Layout anatomy
**Regions, top to bottom:**
1. Domain TopBar with amber identity accent.
2. CIA coaching note about best creative time.
3. Active projects card with progress bars and sparkline.
4. Inspiration prompt with start creating and reflect actions.
5. This-week strip and large CalendarHeatmap practice hero.
6. KPI row, active goal rings, session trend, creative journey gallery timeline.
7. Recent activity and log-session FAB.

**ASCII wireframe (390x844):**
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
```

### 5. Components
- **TopBar** - creativity title and overflow.
- **CIAInsightCard** - creative pattern note.
- **GlassCard** - active projects and inspiration prompt.
- **MomentumBar / TrendChart / ProgressRing** - project progress, session trend, goals.
- **KPIRow** - sessions, hours, streak.
- **ChipProvenance** - `you logged`, `project update`, `journal prompt`, `estimated`.
- **ListRow** - recent activity.
- **NEW: PortfolioTimeline** - horizontal gallery timeline for creative milestones; needed because catalog lacks a portfolio-specific sequence component.
- **SkeletonState / ErrorState / HonestNullState** - states.

### 6. Visual treatment
- **Atmosphere:** `#0A0A0F`; amber `#f59e0b` is creativity identity only.
- **Semantic glows:** active project progress uses `--glow-you #FF5E00`; milestone completion uses `--glow-done #34A853`; CIA inspiration uses `--glow-cia #7F24FF`.
- **Hero:** practice heatmap is large but ambient; no neon cell glow.
- **Surfaces:** project and prompt glass; activity and timeline solid `#211008`.
- **Type:** Neue Montreal plus one Tiempos italic word, e.g. "make something *small*."

### 7. Content & copy
- **CIA note:** "Three creative sessions this week. Your best work happens in the morning."
- **Projects:** "Short film script", "Photography portfolio."
- **Prompt:** "Try creating something using only materials within arm's reach."
- **Gallery milestones:** "first draft", "demo recorded", "portfolio", "short film."
- **Activity:** "90 min writing", "45 min sketch", "120 min recording."
- **CTA:** "Log session."
- **Empty copy:** "Start your first creative project. One small session counts."

### 8. Data & honesty states
- **Projects:** real = user project and milestone progress; low-confidence = imported or stale update; honest-null = add-project prompt.
- **Prompt:** real = CIA-generated from recent practice; low-confidence = starter prompt; honest-null = static prompt labeled starter.
- **Heatmap:** real = logged sessions; low-confidence = local unsynced session; honest-null = empty grid with no shame.
- **Gallery:** real = user milestones; low-confidence = upload pending; honest-null = timeline hidden until first milestone.
- **Controls:** images, project files, journal prompts, CIA inference, and third-party imports expose consent/revoke/delete.

### 9. All states
- **Default:** CIA note, projects, prompt, heatmap, KPIs, goals, gallery, activity, and FAB render.
- **Skeleton:** project rows, heatmap cells, KPI row, timeline, and activity rows shimmer.
- **Empty:** welcome note, prompt, empty heatmap, and start-project CTA.
- **Error:** failed import or upload names source and keeps cached project rows.
- **Success:** logged session updates heatmap, KPIs, streak, and activity with green confirmation.
- **Disabled:** gallery upload, prompt saving, or CIA suggestions dim when consent blocks them.

### 10. Motion & interaction
- **Load:** project bars draw, prompt fades in, heatmap cells stagger, timeline line draws.
- **Log session:** FAB opens Sheet for writing, sketch, recording, editing, or other.
- **Prompt:** start creating opens session timer; reflect opens Journal [37].
- **Gallery:** milestone tap opens Image Viewer [67] or project detail.
- **Trend:** session chart scrub shows minutes, project, source, confidence.
- **Reduced-motion:** cells, line, and count-ups appear settled.

### 11. Motivation-tier adaptation
- **Low:** prompt, one active project, and log-session CTA.
- **Medium:** default dashboard.
- **High:** heatmap, gallery, trend, project filters, and source chips expanded.

### 12. Accessibility
- **Contrast:** paper text on `#0A0A0F` and `#211008` meets AA+.
- **Targets:** project rows, prompt buttons, heatmap cells, gallery items, and FAB are 44px minimum.
- **Screen readers:** heatmap summarizes sessions, hours, source count, and confidence before cells.
- **Safety:** creative rest days are neutral, not loss messages.
- **Data controls:** project media, journal, voice notes, CIA prompts, and third-party imports can be revoked/deleted.
- **Reduced-motion:** mirrors Section 10.

### 13. Premium checklist
1. **Connects:** creativity links projects, goals, journal, gallery, and CIA.
2. **Honest:** session, gallery, and prompt data carry provenance.
3. **Premium:** practice heatmap and project progress are specific.
4. **Warm-dark:** canon surfaces applied.
5. **Semantic glow:** effort, milestones, and CIA prompt meanings stated.
6. **60/30/10:** orange data, green completion, purple CIA.
7. **Type:** Neue Montreal plus one Tiempos italic word.
8. **States:** Default, Skeleton, Empty, Error, Success, Disabled covered.
9. **Motivation tiers:** low, medium, high specified.
10. **Accessibility:** labels, 44px targets, heatmap summary, reduced-motion covered.
11. **Honesty triple:** real, low-confidence, honest-null defined.
12. **Catalog:** canon components used; PortfolioTimeline marked NEW.
13. **CIA voice:** creative coaching is gentle and specific.
