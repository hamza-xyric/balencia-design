# 73-mission-journal - A+++ hi-fi mobile spec

## Header
- **Source ID:** 73
- **Source spec:** `Balencia-New-Screens/screens/73-mission-journal.md`
- **Evidence:** screens/73-mission-journal.md, work/briefs/73.md, work/drafts/73.md, Functional Content Brief: Mission Journal
- **Route(s):** No live route; stack-pushed retrospective mission journal opened from Mission Board, Life World, or Me quick links.
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Mission Journal is the retrospective companion to the Mission Board.
- **Premium Visual Director:** make mission-journal timeline the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** mission-journal keeps privacy-first language and SafetyResourceCard reachable for journal, mood, stress, sleep, energy, voice, and wellbeing-adjacent moments.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+--------------------------------------+
|   Mission journal                   |
| [All] [By domain] [By type]          |
| +----------------------------------+ |
| | 18 completed   8,420 XP   4 pivots| |
| +----------------------------------+ |
| MAY 2026                             |
| |                                    |
| o +--------------------------------+ |
| | | Finished emergency fund        | |
| | | 12 weeks  1,200 XP            | |
| | | Six weeks of discipline. Your  | |
| | | fund is real now.              | |
| | | [Finance]  via rewards ledger  | |
| | +--------------------------------+ |
| |                                    |
| o +--------------------------------+ |
|   | Pivoted recipe challenge       | |
|   | partial XP  your archive note | |
|   | You explored eight recipes     | |
|   | before life shifted focus.     | |
|   +--------------------------------+ |
+--------------------------------------+

Route handling: No live route; stack-pushed retrospective mission journal opened from Mission Board, Life World, or Me quick links.
```

## Focal Hierarchy
- **Dominant focal moment:** mission-journal timeline; it should be visually singular, not one tile among many.
- **Secondary layer:** TopBar with CIA only when the source supports a synthesized read.
- **Operational layer:** Filter chips, All-time summary, Month sections, Journey spine.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*journal*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
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

## Data Honesty
- **All-time completions:** real = count from missions system with ChipProvenance "via missions"; low-confidence = muted cached count while syncing; honest-null = summary card hidden if no entries exist.
- **XP earned:** real = rewards ledger total; low-confidence = "estimated  low confidence" while rewards sync is partial; honest-null = "--" with "No mission rewards yet."
- **Mission duration:** real = start/end dates; low-confidence = approximate weeks if one date is inferred; honest-null = "dates unavailable."
- **CIA summary:** real = generated from specific mission data; low-confidence = summary dimmed with provenance "draft from partial data"; honest-null = "Summary generating..." and the card keeps all non-CIA facts visible.
- **Photos:** real = thumbnails from Progress Photos [49]; low-confidence not applicable because media attachment is binary; honest-null = photo row omitted.
- **Photo privacy:** real = every thumbnail exposes source and mission date range in Image Viewer [67]; low-confidence not applicable; honest-null = no thumbnails and no empty media rail. Delete or hide removes the thumbnail from this journal card immediately.
- **Archive note:** real = user-authored note; low-confidence not applicable; honest-null = label "No note added" rather than invented rationale.

## Consent and Safety
- mission-journal keeps privacy-first language and SafetyResourceCard reachable for journal, mood, stress, sleep, energy, voice, and wellbeing-adjacent moments.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- This is documented as a modal, overlay, utility, or source-only surface; do not invent a live route.

## States
- **Default:** filters, summary, month sections, journey spine, and mixed completed/pivoted cards render.
- **Skeleton:** path skeleton draws top-to-bottom; cards show text and thumbnail placeholders.
- **Empty:** filters and spine are hidden; centered empty state explains how entries appear.
- **Filtered Empty:** active filters remain visible; month sections are replaced by filtered empty copy.
- **Error:** cached entries remain if available; ErrorState offers Retry or pull-to-refresh.
- **Success:** filter apply shows a quiet "Journal refreshed" toast and path redraws to the filtered set.
- **Disabled:** filter chips disable at 40% while a refresh is in flight, with "Syncing your journey..." beside them.
- **Offline:** cached entries render with OfflineBanner "offline - showing last synced data."

## Motion
- Timeline spine stroke-draws from top to bottom; cards rise in as the path reaches each node.
- Filter secondary row slides down; selected chips press-scale to .98.
- Photo thumbnails open Image Viewer with shared-element scale.
- Pull-to-refresh redraws only new nodes, not the entire history.
- Haptics: light on filter selection, none on scroll.
- **Reduced-motion path:** path and cards render instantly, secondary filter row appears without slide, and thumbnails open with a fade.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: No live route; stack-pushed retrospective mission journal opened from Mission Board, Life World, or Me quick links..
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: Back, filters, card rows, and photo thumbnails meet 44px minimum targets.; Timeline nodes have text labels: completed, pivoted, or archived.; Screen readers announce month headers before cards.
