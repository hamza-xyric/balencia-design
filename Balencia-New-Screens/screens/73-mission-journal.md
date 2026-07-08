### 1. Header
- **Screen ID:** 73
- **Name:** mission-journal
- **Route(s) covered:** No live route; stack-pushed retrospective mission journal opened from Mission Board, Life World, or Me quick links.
- **Tab:** Goals / Me stack
- **Source:** Functional Content Brief: Mission Journal
- **Batch:** 6

### 2. Purpose
Mission Journal is the retrospective companion to the Mission Board. It turns completed, archived, and pivoted missions into a chronological record of growth without shaming unfinished work. The screen blends real mission metrics, CIA-written summaries, and photo memories into a timeline that feels earned rather than decorative.

### 3. Entry & exit
- **Entry paths:** Mission Board header journal glyph, Life World full-journal link, Me quick-link card.
- **Exit paths:** Back returns to origin. Tapping an entry pushes Mission Detail [14]. Tapping a photo thumbnail opens Image Viewer [67]. Filter changes stay on the page.
- **Photo data controls:** photo thumbnails inherit Progress Photos [49] consent. Long-press opens Image Viewer [67] with source, date range, export, delete, and hide-from-journal controls.

### 4. Layout anatomy
**Regions top-to-bottom:**
1. **TopBar:** back chevron and title.
2. **Filter chips:** All, By domain, By type; secondary row slides down for selected filter.
3. **All-time summary:** completion count, XP earned, and pivoted count.
4. **Month sections:** sticky month header, optional high-density summary.
5. **Journey spine:** continuous vertical path running through entry nodes.
6. **Completed mission cards:** title, date, duration, XP, CIA summary, tags, photos.
7. **Archived/pivoted cards:** partial XP, user archive note, and constructive status label.

**ASCII wireframe (390x844):**
```text
┌──────────────────────────────────────┐
│ ‹  Mission journal                   │
│ [All] [By domain] [By type]          │
│ ┌──────────────────────────────────┐ │
│ │ 18 completed   8,420 XP   4 pivots│ │
│ └──────────────────────────────────┘ │
│ MAY 2026                             │
│ │                                    │
│ ● ┌────────────────────────────────┐ │
│ │ │ Finished emergency fund        │ │
│ │ │ 12 weeks · 1,200 XP            │ │
│ │ │ Six weeks of discipline. Your  │ │
│ │ │ fund is real now.              │ │
│ │ │ [Finance]  via rewards ledger  │ │
│ │ └────────────────────────────────┘ │
│ │                                    │
│ ○ ┌────────────────────────────────┐ │
│   │ Pivoted recipe challenge       │ │
│   │ partial XP · your archive note │ │
│   │ You explored eight recipes     │ │
│   │ before life shifted focus.     │ │
│   └────────────────────────────────┘ │
└──────────────────────────────────────┘
```

### 5. Components
- **TopBar** with 44px back target.
- **ChipDomainTag** and **SegmentedTabs** for filters.
- **GlassStatCard** for all-time summary.
- **SectionHeader** for month grouping.
- **TimelineSpine** (NEW) for the drawn retrospective path; it is a layout primitive, not a chart.
- **SolidCard** for completed and pivoted entry cards.
- **ProgressBar** for XP and duration normalization.
- **CIAInsightCard** pattern inside cards for narrative summaries, rendered as an inline text block rather than a separate floating card.
- **ImageThumbnailRow** (NEW) for progress photos tied to the mission timeframe.
- **ChipProvenance, HonestNullState, SkeletonState, ErrorState, OfflineBanner, BtnSecondary** for data states.

### 6. Visual treatment
- **Atmosphere:** warm dark base, top radial glow, grain. The timeline path uses low-opacity paper until nodes become active.
- **Glass tiers:** filter row and summary use glass; entry cards use SolidCard to keep dates, metrics, notes, and thumbnails readable.
- **Semantic glow:** completed cards use glow-done because the mission closed successfully; pivoted cards use a muted glow-you because the user made a choice and still earned partial credit; CIA summaries use glow-cia only within the summary area. No card uses red as failure.
- **Timeline craft:** the path draws through months; nodes are green for completed, orange for pivoted, and neutral for archived without notes.

### 7. Content & copy
- **Title:** Mission journal
- **Filters:** All, By domain, By type.
- **Empty:** No entries yet. Complete or archive a mission and it will appear here with a summary of your journey.
- **Filtered empty:** No entries for this filter. Try another view.
- **Loading:** CIA is loading your journey - one moment.
- **Error:** Couldn't load your journal. Pull to refresh.
- **Partial sync:** Syncing your journey...
- **Summary failure:** Summary generating...
- **Completed narrative:** Six weeks of discipline. Your emergency fund is real now.
- **Pivot narrative:** You explored eight recipes before life shifted your focus.
- **Archive note label:** Your note.

### 8. Data & honesty states
- **All-time completions:** real = count from missions system with ChipProvenance "via missions"; low-confidence = muted cached count while syncing; honest-null = summary card hidden if no entries exist.
- **XP earned:** real = rewards ledger total; low-confidence = "estimated · low confidence" while rewards sync is partial; honest-null = "--" with "No mission rewards yet."
- **Mission duration:** real = start/end dates; low-confidence = approximate weeks if one date is inferred; honest-null = "dates unavailable."
- **CIA summary:** real = generated from specific mission data; low-confidence = summary dimmed with provenance "draft from partial data"; honest-null = "Summary generating..." and the card keeps all non-CIA facts visible.
- **Photos:** real = thumbnails from Progress Photos [49]; low-confidence not applicable because media attachment is binary; honest-null = photo row omitted.
- **Photo privacy:** real = every thumbnail exposes source and mission date range in Image Viewer [67]; low-confidence not applicable; honest-null = no thumbnails and no empty media rail. Delete or hide removes the thumbnail from this journal card immediately.
- **Archive note:** real = user-authored note; low-confidence not applicable; honest-null = label "No note added" rather than invented rationale.

### 9. All states
- **Default:** filters, summary, month sections, journey spine, and mixed completed/pivoted cards render.
- **Skeleton:** path skeleton draws top-to-bottom; cards show text and thumbnail placeholders.
- **Empty:** filters and spine are hidden; centered empty state explains how entries appear.
- **Filtered Empty:** active filters remain visible; month sections are replaced by filtered empty copy.
- **Error:** cached entries remain if available; ErrorState offers Retry or pull-to-refresh.
- **Success:** filter apply shows a quiet "Journal refreshed" toast and path redraws to the filtered set.
- **Disabled:** filter chips disable at 40% while a refresh is in flight, with "Syncing your journey..." beside them.
- **Offline:** cached entries render with OfflineBanner "offline - showing last synced data."

### 10. Motion & interaction
- Timeline spine stroke-draws from top to bottom; cards rise in as the path reaches each node.
- Filter secondary row slides down; selected chips press-scale to .98.
- Photo thumbnails open Image Viewer with shared-element scale.
- Pull-to-refresh redraws only new nodes, not the entire history.
- Haptics: light on filter selection, none on scroll.
- **Reduced-motion path:** path and cards render instantly, secondary filter row appears without slide, and thumbnails open with a fade.

### 11. Motivation-tier adaptation
- **Low:** hide all-time summary, show only month headers and simplified cards with title, date, status, and one narrative line.
- **Medium:** default timeline, metrics, narrative, and photo thumbnails.
- **High:** month headers add micro-donut and inline stats; cards show normalized XP/duration bars and more provenance.

### 12. Accessibility
- Back, filters, card rows, and photo thumbnails meet 44px minimum targets.
- Timeline nodes have text labels: completed, pivoted, or archived.
- Screen readers announce month headers before cards.
- Photo thumbnails include mission title and date in the label.
- Filter changes announce result counts.
- Completed and pivoted status are shown through text and glyph, never color alone.

### 13. Premium checklist
1. Retrospective timeline is source-specific, not a generic list.
2. Completed and pivoted missions are both respected.
3. CIA summaries are grounded and honesty-labeled.
4. Progress photos connect through Image Viewer with export, delete, and hide controls.
5. No no-live route is invented.
6. All metrics carry real, low-confidence, and honest-null handling where applicable.
7. Pivoted work avoids shame language.
8. Selective glass supports the summary and filters; dense cards stay solid.
9. Semantic glows map to done, user choice, and CIA summary.
10. Default, Skeleton, Empty, Error, Success, Disabled, Offline, and Filtered Empty states are explicit.
11. Reduced-motion path is defined.
12. 44px targets are specified.
13. Premium gating is scoped to advanced cross-domain comparisons, not base journal access.
14. Cross-links to Mission Detail and Image Viewer are preserved.
