# 58-sleep-tracking - A+++ hi-fi mobile spec

## Header
- **Source ID:** 58
- **Source spec:** `Balencia-New-Screens/screens/58-sleep-tracking.md`
- **Evidence:** screens/58-sleep-tracking.md, work/briefs/58.md, work/drafts/58.md, Functional Content Brief: Sleep Tracking
- **Route(s):** No live route; sleep tracking is a nested module opened from Today, Wellbeing, Explore, and CIA chat.
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Sleep tracking is the command center for last-night rest, long-term sleep patterns, and practical CIA coaching.
- **Premium Visual Director:** make Sleep tracking hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Sleep tracking names health category, source, freshness, confidence, retention, export, revoke, and delete before synced values or photo-derived reads are trusted.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+---------------------------------------------+
| <- Sleep                            [Lv.8]  |
|                                             |
| +-----------------------------------------+ |
| | CIA                                     | |
| | HRV dipped after a late *workout*.      | |
| | [fitness] [sleep]        Ask CIA        | |
| +-----------------------------------------+ |
|                                             |
| +-----------------------------------------+ |
| | LAST NIGHT                  via wearable| |
| |              82                         | |
| |        sleep score ring                 | |
| | 7.2 hrs   recovery 64%   10:45p-6:08a  | |
| | sleep reserve  =======---              | |
| +-----------------------------------------+ |
|                                             |
| +----------------+ +--------------------+  |
| | sleep stages   | | consistency        |  |
| | REM 1h 20m     | | tight 10:45p       |  |
| | Deep 1h 10m    | | cluster graphic    |  |
| +----------------+ +--------------------+  |
|                                             |
| DURATION TREND             [7d][14d][30d] |
| +-----------------------------------------+ |
| | living line with dashed gaps            | |
| +-----------------------------------------+ |
|                                             |
| 30-NIGHT HEATMAP                           |
| +-----------------------------------------+ |
| | cells: real nights, gaps, manual logs   | |
| +-----------------------------------------+ |
|                                             |
| HYGIENE TIPS                               |
| +-----------------------------------------+ |
| | wrap up exercise earlier                | |
| +-----------------------------------------+ |
|                    (+)   Today CIA Goals Me |
+---------------------------------------------+

Route handling: No live route; sleep tracking is a nested module opened from Today, Wellbeing, Explore, and CIA chat.
```

## Focal Hierarchy
- **Dominant focal moment:** Sleep tracking hero; it should be visually singular, not one tile among many.
- **Secondary layer:** TopBar with CIA only when the source supports a synthesized read.
- **Operational layer:** CIA coaching note, Last-night hero, Stages and consistency, Duration trend.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*tracking*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Figma Reference Alignment
- **Language-derived evidence:** no direct Sleep Tracking frame was visible in the supplied Figma screenshots; inherit the warm-light dashboard language from Home, Nutrition, and Workouts for compact card rhythm.
- **Compact chart cards:** Duration trend, stage summaries, consistency, and heatmap should be solid/light chart cards with 12-16px radii, quiet gray axes, orange user-data lines, green completion/restored states, and purple only for CIA projections.
- **Source-control entry:** place a small `data sources`/provider control near the top row or the hero provenance chip. It opens wearable/manual-data controls: category, source, scope, last sync, retention, export, revoke, delete.

## Components
- **TopBar:** Sticky header with back, title, and RPGBadge.
- **RPGBadge:** Compact glass-pill for Wellbeing skill level.
- **CIAInsightCard:** Purple glass with evidence chips and Ask CIA action.
- **GlassStatCard:** Hero summary with ProgressRing and ChargeMeter.
- **ProgressRing:** Sleep Score.
- **ChargeMeter:** Sleep Reserve.
- **BentoGrid:** Stages and consistency cards.
- **NEW: ConsistencyCloud:** Dots for bedtime and wake clusters. Rationale: variance needs a spatial cluster primitive, not a percentage bar.
- **TrendChart:** Duration and quality living lines.
- **SegmentedTabs:** 7, 14, and 30 day views.
- **CalendarHeatmap:** Thirty-night adherence grid.
- **ListRow:** Hygiene tips with expandable evidence.
- **FABQuickLog:** Opens Manual Sleep Log.
- **Sheet:** Manual Sleep Log with GlassPillInput and ChoiceCardFrost.

## Data Honesty
- **Sleep Score:** Real shows `82` plus `via wearable`; low-confidence shows muted approximate score with `estimated - low confidence`; honest-null shows a faint empty ring and "Not enough data yet."
- **Sleep Duration:** Real shows `7.2 hrs` plus provider or manual source; low-confidence shows a muted estimate when the wake time was inferred; honest-null shows "-- hrs" and a manual log action.
- **Recovery:** Real shows `64%` from connected health metrics; low-confidence is muted; honest-null hides the recovery module and shows a connect prompt.
- **Sleep stages:** Real uses provider stage data; low-confidence is not shown because stage detection must be provider-backed; honest-null hides stages completely.
- **Consistency:** Real uses bedtime and wake variance; low-confidence labels fewer than seven nights; honest-null shows "More data needed. Log sleep over a week to spot your rhythm."
- **Trends and heatmap:** Missing nights render as gaps or ghost cells, never as zero sleep.
- **CIA tips:** Real only when evidence exists; low-confidence tips are labeled; honest-null asks the user to log more sleep before claiming a pattern.

## Consent and Safety
- Sleep tracking names health category, source, freshness, confidence, retention, export, revoke, and delete before synced values or photo-derived reads are trusted.
- Sleep tracking keeps privacy-first language and SafetyResourceCard reachable for journal, mood, stress, sleep, energy, voice, and wellbeing-adjacent moments.
- Wearable/manual-source chips open a data-control sheet with category, source, scope, freshness, retention, export sleep data, revoke provider access, delete manual logs, and remove cached wearable reads.
- This is documented as a modal, overlay, utility, or source-only surface; do not invent a live route.

## States
- **Default:** Wearable connected, last-night hero visible, 7-day trend selected, and hygiene tips populated.
- **Skeleton:** Depth-preserving shimmer for ring, trend axes, bento cards, heatmap, and tips; no spinning loader.
- **Empty:** Hero ring is a faint track, wearable-only cards hidden, manual log CTA visible, and CIA note uses starter copy.
- **Error:** Cached values remain when safe; failed sync gaps are labeled; save failure preserves form entries.
- **Success:** Manual log sheet closes, hero updates if relevant, and a small XPToast may appear only if reward feedback is enabled and the copy avoids sleep shame or pressure to optimize every night.
- **Disabled:** FAB is disabled while offline if queueing is unavailable; Save is disabled until date, bedtime, and wake time are valid.
- **Manual-only:** Stages and recovery are hidden; trends and score rely only on manual duration and quality values.

## Motion
- **On mount:** Hero ring fills first, numbers settle, then SolidCards rise in 80ms stagger.
- **Chart draw:** Living Lines draw left-to-right on scroll; heatmap cells appear row-by-row.
- **Manual sheet:** Date and time fields use bottom-sheet focus states; quality choices scale on tap.
- **Tips:** Tapping a tip expands evidence and CTA in 200ms.
- **FAB behavior:** Hides on scroll-down and returns on scroll-up unless reduced motion is active.
- **Haptics:** Light on tabs, quality choice, and successful save.
- **Reduced motion:** No ring fills, line draws, count-ups, or breathing glows; all states render final positions.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: No live route; sleep tracking is a nested module opened from Today, Wellbeing, Explore, and CIA chat..
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** Paper text on dark and SolidCard surfaces meets AA+; orange is not used for small body text.; **Targets:** Back, badge, tabs, FAB, Save, quality choices, and tip rows maintain 44px hit areas.; **Screen readers:** Charts summarize score, duration, source, confidence, and missing-night gaps before individual points.
