# 78-reports-center

## 1. Header
- **Screen ID:** 78
- **Name:** Reports Center
- **Route(s) covered:** No live route; reports are an export module opened from Me, Intelligence, Help, and CIA contexts.
- **Tab:** Me
- **Source:** Functional Reports Center Brief
- **Batch:** 14

## 2. Purpose
Reports Center turns whole-life data into structured, shareable summaries such as weekly life reports, doctor summaries, and mission progress exports. It is editorial and privacy-first: the user reviews included domains, excluded private notes, data confidence, and share options before anything leaves the app.

## 3. Entry & exit
- **Entry paths:** Me Main [17], Intelligence Dashboard [48], Data Sources [84], Help Center [25], and CIA deep-links.
- **Primary exits:** Share opens native share sheet after privacy review; Screenshot guide opens export tips; back returns to origin.
- **Secondary exits:** Tap a report card opens Preview; tap CIA insight opens CIA Chat [09]; tap data source chip opens Data Sources [84].
- **Failure exit:** Failed export leaves the preview intact and surfaces retry without exposing raw data.

## 4. Layout anatomy
Top-to-bottom regions:
1. **TopBar:** Sticky title "Reports" with back.
2. **Report Builder Hero:** Editorial overline, title, description, and signal pills.
3. **Recent Reports:** ReportCards for Weekly life report, Doctor summary, and Mission progress.
4. **This Week:** Bento KPI summary for sleep consistency, work adherence, and stress load.
5. **CIA insight:** Plain-language context suggesting which report is worth building.
6. **Preview stack:** Full-screen preview with privacy review, KPI strip, comparison bars, trend line, coverage donut, and correlation matrix.
7. **Bottom actions:** Share and Screenshot guide, disabled until the preview is ready.

**ASCII Wireframe (390x844):**
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
```

## 5. Components
- **TopBar:** Sticky over scroll.
- **NEW: ReportBuilderHero:** Editorial block for the report-building proposition. Rationale: source requires a calm title/subtitle/pill composition, not a data card.
- **SectionHeader:** Recent Reports and This Week.
- **ReportCard:** Interactive GlassCard with sync ring, status, and preview action.
- **ProgressRing:** Report sync completeness.
- **BentoGrid:** Weekly KPI tiles.
- **GlassStatCard:** KPI tile with sparkline and provenance.
- **CIAInsightCard:** Report suggestion with evidence.
- **ChipProvenance:** `via wearable`, `you logged`, `6 of 7 days`, `estimated - low confidence`.
- **ModalOverlay:** Report Preview.
- **TrendChart, KPIRow, DonutChart:** Preview-only data visualizations.
- **BtnPrimary / BtnGhost:** Share, create weekly report, screenshot guide, retry.

## 6. Visual treatment
- **Atmosphere:** Warm dark base with top orange radial glow and soft grain.
- **Selective glass:** Report Builder Hero, ReportCards, CIA insight, and nav actions use glass; preview matrices and dense chart areas use SolidCard.
- **Semantic glow:** Ready report uses `--glow-you`; positive KPI deltas use `--glow-done`; CIA insight and projection use `--glow-cia`.
- **Privacy treatment:** Private notes excluded uses a lock glyph and plain text, not a scary warning banner.
- **Hero type moment:** "Build reports *CIA* helps you understand." gives *CIA* the single italic emphasis.
- **Data confidence:** Partial syncs retain the same card shape but use ghosted rings and source chips.

## 7. Content & copy
- **Hero eyebrow:** "Report builder"
- **Hero title:** "Build reports *CIA* helps you understand."
- **Hero sub:** "Review your data with CIA, choose what to share."
- **Hero pills:** "CIA summary", "Private by default", "Screenshot ready"
- **Reports:** "Weekly life report", "Doctor summary", "Mission progress export", "Ready", "Draft"
- **KPI labels:** "Sleep consistency", "Work adherence", "Stress load", "vs last week", "6 of 7 days"
- **CIA insight:** "Sleep firmed up most this *week*. Worth a report."
- **Privacy review:** "Private notes excluded", "Included domains", "Excluded data", "Review before sharing"
- **Empty:** "You haven't built a report yet. Start with a weekly summary."
- **Errors:** "Couldn't sync your latest data - pull to refresh.", "Export failed. Try again."
- **Actions:** "Share", "Screenshot guide", "Create weekly report", "Exported"

## 8. Data & honesty states
- **Report sync meta:** Real shows `6 of 7 days synced` and Ready; low-confidence shows Draft with missing days; honest-null shows first-report prompt and no preview.
- **Sleep consistency:** Real shows percent plus ChipProvenance `via wearable`; low-confidence muted with `estimated - low confidence`; honest-null says "Not enough data yet - 3 more days."
- **Work adherence:** Real uses logged task/mission completion; low-confidence labels partial sync; honest-null hides comparison.
- **Trend charts:** Real lines draw with source labels; low-confidence projections are dashed and labeled; honest-null keeps axes only.
- **Correlation matrix:** Real rows include strength and direction; low-confidence rows say "early signal"; honest-null ghost cells say "Correlations appear after 1-2 weeks."
- **Privacy:** Private notes, raw journal entries, and hidden photos are excluded by default and named in the review block.

## 9. All states
- **Default:** Hero, recent reports, weekly KPIs, and CIA insight visible.
- **Skeleton:** Report cards, KPI tiles, and preview charts shimmer with axes and rings only.
- **Empty:** Hero remains, Recent Reports shows first-report prompt, and This Week hides until data exists.
- **Error:** Failed charts or sync blocks show inline retry; report cards keep safe cached status.
- **Success:** Share label changes to "Exported" for 900ms, then returns to Share.
- **Disabled:** Share and screenshot guide dim until preview is generated or when offline export is unavailable.
- **Offline:** Cached report statuses remain with last-sync banner.

## 10. Motion & interaction
- **Report card tap:** Opens Preview with stacked card transition.
- **Preview draw:** Axes draw, KPI counts settle, trend line draws, donut arcs sweep, and matrix cells scale in.
- **Share:** Button scales to 0.98 and opens native share after privacy review acknowledgement.
- **Scrub:** Long-press trend chart shows crosshair and value tooltip.
- **Matrix interaction:** Tap cell reveals readable correlation pill.
- **Reduced motion:** Draws render final state instantly; glows stop breathing; preview transition becomes opacity-only.

## 11. Motivation-tier adaptation
- **Low density:** Shows one weekly report card, hides This Week KPIs and CIA insight.
- **Medium density:** Default two report cards, two KPI tiles, and one CIA insight.
- **High density:** Shows all report cards, four KPI tiles, and deeper intelligence timeline in Preview.

## 12. Accessibility
- **Contrast:** Paper text on glass and SolidCard surfaces meets AA+.
- **Targets:** Pills, report cards, Share, Screenshot guide, retry, and matrix cells maintain 44px minimums.
- **Screen readers:** Report cards announce title, status, synced days, and preview action.
- **Privacy review:** Included and excluded domains are read as explicit lists before share controls.
- **Reduced motion:** Matches Section 10 and keeps chart data summarized in text.

## 13. Premium checklist
1. **Connects:** Reports aggregate multiple domains and CIA context in one reviewable surface.
2. **Honest:** Partial sync, low confidence, and missing data are visible before share.
3. **Premium:** Editorial hero, selective glass, and preview data-viz create a calm export surface.
4. **Route truth:** Reports are documented as a module/preview stack, not a live route.
5. **Privacy:** Private notes excluded by default and named before sharing.
6. **Selective glass:** Hero/report cards use glass; dense preview data uses solid surfaces.
7. **Semantic glow:** Orange user effort, green improvement, purple CIA projection.
8. **One hero type moment:** Report Builder title owns first viewport.
9. **All states:** Default, skeleton, empty, error, success, disabled, and offline are covered.
10. **Source fidelity:** Hero, recent reports, KPIs, CIA insight, preview, privacy review, and share flow are preserved.
11. **A11y:** Report status, privacy lists, matrix cells, targets, and reduced motion are specified.
12. **Motion:** Draw-first preview path and reduced-motion fallback are defined.
13. **No raw dump:** Reports use reviewable summaries, not automatic raw-data export.
14. **Voice:** Sentence case, calm, no exclamation marks.
