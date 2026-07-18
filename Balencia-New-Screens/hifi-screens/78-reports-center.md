# 78-reports-center - A+++ hi-fi mobile spec

## Header
- **Source ID:** 78
- **Source spec:** `Balencia-New-Screens/screens/78-reports-center.md`
- **Evidence:** screens/78-reports-center.md, work/briefs/78.md, work/drafts/78.md, Functional Reports Center Brief
- **Route(s):** No live route; reports are an export module opened from Me, Intelligence, Help, and CIA contexts.
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Reports Center turns whole-life data into structured, shareable summaries such as weekly life reports, doctor summaries, and mission progress exports.
- **Premium Visual Director:** make Reports Center hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Reports Center uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+---------------------------------------------+
| <- Reports                                  |
|                                             |
| REPORT BUILDER                              |
| Build reports *CIA* helps you understand.   |
| Review your data with CIA, choose what to   |
| share.                                      |
| [CIA summary] [Private by default] [Ready]  |
|                                             |
| RECENT REPORTS                         New  |
| +-----------------------------------------+ |
| | Weekly life report       6 of 7 synced  | |
| | status: Ready             ring 86%      | |
| +-----------------------------------------+ |
| | Doctor summary           3 of 7 synced  | |
| | status: Draft             ring 43%      | |
| +-----------------------------------------+ |
|                                             |
| THIS WEEK                                   |
| +----------------+ +---------------------+ |
| | sleep 82%      | | work 64%            | |
| | via wearable   | | you logged          | |
| +----------------+ +---------------------+ |
| +-----------------------------------------+ |
| | CIA: Sleep firmed up most this *week*.  | |
| +-----------------------------------------+ |
|                    Share   Screenshot guide |
+---------------------------------------------+

Route handling: No live route; reports are an export module opened from Me, Intelligence, Help, and CIA contexts.
```

## Focal Hierarchy
- **Dominant focal moment:** Reports Center hero; it should be visually singular, not one tile among many.
- **Secondary layer:** TopBar with CIA only when the source supports a synthesized read.
- **Operational layer:** Report Builder Hero, Recent Reports, This Week, CIA insight.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*center*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar:** Sticky over scroll.
- **NEW: ReportBuilderHero:** Editorial block for the report-building proposition. Rationale: source requires a calm title/subtitle/pill composition, not a data card.
- **SectionHeader:** Recent Reports and This Week.
- **NEW: ReportCard - rationale:** interactive `GlassCard` pattern with report title, sync ring, export status, and preview/share actions; no catalog component combines report lifecycle and export affordances.
- **ProgressRing:** Report sync completeness.
- **BentoGrid:** Weekly KPI tiles.
- **GlassStatCard:** KPI tile with sparkline and provenance.
- **CIAInsightCard:** Report suggestion with evidence.
- **ChipProvenance:** `via wearable`, `you logged`, `6 of 7 days`, `estimated - low confidence`.
- **ModalOverlay:** Report Preview.
- **TrendChart, KPIRow, ProgressRing:** Preview-only data visualizations.
- **BtnPrimary / BtnGhost:** Share, create weekly report, screenshot guide, retry.

## Data Honesty
- **Report sync meta:** Real shows `6 of 7 days synced` and Ready; low-confidence shows Draft with missing days; honest-null shows first-report prompt and no preview.
- **Sleep consistency:** Real shows percent plus ChipProvenance `via wearable`; low-confidence muted with `estimated - low confidence`; honest-null says "Not enough data yet - 3 more days."
- **Work adherence:** Real uses logged task/mission completion; low-confidence labels partial sync; honest-null hides comparison.
- **Trend charts:** Real lines draw with source labels; low-confidence projections are dashed and labeled; honest-null keeps axes only.
- **Correlation matrix:** Real rows include strength and direction; low-confidence rows say "early signal"; honest-null ghost cells say "Correlations appear after 1-2 weeks."
- **Privacy:** Private notes, raw journal entries, and hidden photos are excluded by default and named in the review block.

## Consent and Safety
- Reports Center uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- This is documented as a modal, overlay, utility, or source-only surface; do not invent a live route.

## States
- **Default:** Hero, recent reports, weekly KPIs, and CIA insight visible.
- **Skeleton:** Report cards, KPI tiles, and preview charts shimmer with axes and rings only.
- **Empty:** Hero remains, Recent Reports shows first-report prompt, and This Week hides until data exists.
- **Error:** Failed charts or sync blocks show inline retry; report cards keep safe cached status.
- **Success:** Share label changes to "Exported" for 900ms, then returns to Share.
- **Disabled:** Share and screenshot guide dim until preview is generated or when offline export is unavailable.
- **Offline:** Cached report statuses remain with last-sync banner.

## Motion
- **Report card tap:** Opens Preview with stacked card transition.
- **Preview draw:** Axes draw, KPI counts settle, trend line draws, donut arcs sweep, and matrix cells scale in.
- **Share:** Button scales to 0.98 and opens native share after privacy review acknowledgement.
- **Scrub:** Long-press trend chart shows crosshair and value tooltip.
- **Matrix interaction:** Tap cell reveals readable correlation pill.
- **Reduced motion:** Draws render final state instantly; glows stop breathing; preview transition becomes opacity-only.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: No live route; reports are an export module opened from Me, Intelligence, Help, and CIA contexts..
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** Paper text on glass and SolidCard surfaces meets AA+.; **Targets:** Pills, report cards, Share, Screenshot guide, retry, and matrix cells maintain 44px minimums.; **Screen readers:** Report cards announce title, status, synced days, and preview action.
