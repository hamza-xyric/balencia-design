# 93 Mood trends - A+++ hi-fi mobile spec

## Header
- **Source ID:** 93
- **Source spec:** `Balencia-New-Screens/screens/93-mood-trends.md`
- **Evidence:** `Archive/2026-07-06/features.md`, `Archive/2026-07-06/routes.csv`, `work/briefs/93.md`
- **Route:** `/wellbeing/mood`
- **Frame:** 390x844 native mobile
- **Priority:** convert-now

## Reviewer Synthesis
- **Source Fidelity Reviewer:** keep mood log, time range, longitudinal chart, journal/check-in history, CIA handoff, safety.
- **Premium Visual Director:** make the mood trend chart the focal instrument, but keep it human and non-clinical.
- **Interaction and State Designer:** chart scrub, sparse-data dots, log sheet, and paywall variants need clear states.
- **Trust and Safety Reviewer:** crisis resources must stay top-level; insights must be non-diagnostic and evidence-labeled.
- **GLM directions considered:** safety-first journal chart, longitudinal mood observatory, low-density check-in path. **Chosen:** mood observatory with safety above the chart.

## Final Composition

```text
+--------------------------------------+
| Mood                         log help|
| [7D] [30D] [90D locked] [1Y locked]  |
|                                      |
| +----------------------------------+ |
| | TODAY FEELS *STEADY*             | |
| | 6 / 10                           | |
| | via check-in · Jul 7             | |
| +----------------------------------+ |
| +----------------------------------+ |
| | Crisis resources                 | |
| | Call, text, or view local help   | |
| +----------------------------------+ |
| +----------------------------------+ |
| | Mood trend                       | |
| | 8 |       orange mood line       | |
| | 5 | -- purple estimated context  | |
| | 2 |  green journal markers       | |
| |     Mon Tue Wed Thu Fri Sat Sun  | |
| +----------------------------------+ |
| CIA: mood has been higher on journal |
| days in this window.                 |
| Evidence: 4 check-ins, 3 entries     |
| [Discuss patterns with CIA]          |
| Recent: Jul 7 steady, Jul 6 low      |
|                            (+)       |
| Today        CIA       Goals    Me   |
+--------------------------------------+
```

## Focal Hierarchy
- **Dominant focal moment:** mood trend chart under today's mood.
- **Safety layer:** visible before the chart; not buried in settings.
- **CIA layer:** evidence-backed pattern, never diagnosis.
- **History:** recent check-ins and journal links.

## Visual System
- Today's mood card uses orange `--glow-you` for self-report effort.
- Safety card is solid, no glow, no gamification.
- Chart uses orange real line, dashed purple estimated context, green markers for completed check-ins or journal days.
- Neue Montreal; Tiempos italic word: "*steady*".

## Components
- `TopBar`, `SegmentedTabs`, `GlassStatCard`, `SafetyResourceCard`, `TrendChart`, `CIAInsightCard`, `ChipProvenance`, `ListRow`, `FABQuickLog`, `ConsentCard`, `SyncStatus`.

## Data Honesty
- Mood: real check-in; low-confidence journal tone inference; honest-null with "Log mood" CTA.
- Trend: needs at least three check-ins; one or two points render as dots with no line.
- Journal overlay: private entries can hide detail while keeping date marker.
- CIA: cautious wording for low-confidence, no pattern claim for honest-null.
- Correlation factors: sleep, stress, energy, journal, and nutrition appear only as labeled overlays with confidence.
- 90D, 1Y, advanced correlations, and CIA pattern handoff can use `PaywallLock`; the lock cannot obscure crisis access.

## Consent and Safety
- Crisis resources from top help and SafetyResourceCard.
- Mood, journal, voice notes, health context, journal-tone analysis, and CIA inference expose opt-in, opt-out, revoke, export, and delete in the evidence sheet.
- Log sheet includes skip option and support copy without pressure.

## States
- **Default:** today's mood, safety, chart, CIA insight, recent rows.
- **Skeleton:** chart axes render without invented points.
- **Empty:** safety remains; honest-null invites one mood log.
- **Partial:** sparse dots, no connecting line until enough data.
- **Error:** cached trend remains; failed source named.
- **Success:** mood log updates hero and adds green marker.
- **Disabled:** journal overlay, wearable context, or CIA projection dims when consent is revoked.

## Motion
- Chart axes draw first, line resolves, markers appear.
- Scrub opens date/value/source/confidence pill.
- Safety sheet opens instantly with no celebration.
- Reduced motion renders full chart immediately.

## Image Slots
- None required.

## Implementation Notes
- Route stays `/wellbeing/mood`.
- CTA routes: mood logging to `/wellbeing/emotional-checkin`, discussion to `/ai-coach`, source links to health settings.
