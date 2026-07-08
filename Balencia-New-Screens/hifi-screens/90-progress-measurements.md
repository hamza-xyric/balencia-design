# 90 Progress measurements - A+++ hi-fi mobile spec

## Header
- **Source ID:** 90
- **Source spec:** `Balencia-New-Screens/screens/90-progress-measurements.md`
- **Evidence:** `Archive/2026-07-06/features.md`, `Archive/2026-07-06/routes.csv`, `work/briefs/90.md`
- **Route:** `/progress`
- **Frame:** 390x844 native mobile
- **Priority:** convert-now

## Reviewer Synthesis
- **Source Fidelity Reviewer:** keep Add measurement, timeframe, Weight/BMI/Body measurements, chart scrub, goals, history, and photo handoff.
- **Premium Visual Director:** make the trend chart a calm focal stage; avoid shame-coded deltas.
- **Interaction and State Designer:** chart scrub, add sheet, success toast, locked yearly, and stale sync states are required.
- **Trust and Safety Reviewer:** body metrics and photos need privacy, consent, delete, and non-diagnostic copy.
- **GLM directions considered:** chart-first tracker, body-goal ledger, photo-compare studio. **Chosen:** chart-first tracker with private photo bridge.

## Final Composition

```text
+--------------------------------------+
| Progress                    add gear |
| [Weekly] [Monthly] [Yearly locked]   |
|                                      |
| +----------------------------------+ |
| | WEIGHT TREND                    | |
| | 176.4 lb                         | |
| | down 1.2 this month              | |
| | via smart scale · Jul 6          | |
| |                                  | |
| | 180 |      orange user line      | |
| | 176 | --- purple projected line  | |
| | 172 |  green goal dots           | |
| |      May      Jun        Jul      | |
| | Weight   BMI   Measurements      | |
| +----------------------------------+ |
| BMI 24.8     Waist 33.1 in          |
| Body goals: waist target 62%         |
| Photos 4     Last sync 2h ago       |
| +----------------------------------+ |
| | Photos are private by default    | |
| | [Open] [Privacy]                 | |
| +----------------------------------+ |
| CIA: weight changed alongside sleep. |
| Keep the *pace* steady.              |
| History: Jul 6, Jun 29, Jun 22       |
| Today        CIA       Goals    Me   |
+--------------------------------------+
```

## Focal Hierarchy
- **Dominant focal moment:** `TrendStageHero` with large current value and honest chart.
- **Active goals:** body goals sit above the photo privacy card so the screen stays measurement-led, not photo-led.
- **Privacy layer:** progress photos card is secondary and consent-gated.
- **CIA layer:** evidence-based interpretation only after enough data exists.
- **History:** compact ledger, secondary.

## Visual System
- Hero card uses orange `--glow-you` for tracked effort.
- Chart follows canon: solid orange real line, dashed purple projection, green milestone dots.
- Photo consent card uses `SolidCard`; no revealing thumbnails until consent and local privacy pass.
- Neue Montreal; Tiempos italic word: "*pace*".

## Components
- `TopBar`, `SegmentedTabs`, `GlassStatCard.hero`, `TrendChart`, `KPIRow`, `ChipProvenance`, `ConsentCard`, `CIAInsightCard`, `ListRow`, `PaywallLock`, `SyncStatus`.
- `NEW: TrendStageHero` - combines main value, timeframe, chart, and metric tabs without fragmenting the focal moment.

## Data Honesty
- Weight: real scale/manual value plus date; low-confidence stale/imported; honest-null "Not enough data yet - 3 more days."
- BMI: calculated from height and weight; low-confidence if height or recent weight is missing; honest-null links to profile height.
- Body measurements: manual source; no fake inferred circumferences.
- Photos: consented private media; upload pending state; no thumbnails in honest-null state; retention and backups labeled.
- CIA: no causal claims without multi-signal evidence. Premium trend windows and CIA body-pattern analysis use `PaywallLock`; the locked preview is generic unless consent and entitlement both exist.

## Consent and Safety
- Add sheet explains what is stored and how it can be deleted.
- Progress photos privacy sheet includes open, revoke access, delete selected photos, export, retention window, encrypted storage/backups, "not used for model training", "no human review by default", and no default sharing.
- Body language avoids shame, diagnosis, and moral scoring.
- Health source chips link to revoke/delete provider data.

## States
- **Default:** hero chart, KPI row, photo privacy card, CIA insight, history.
- **Skeleton:** chart axes and ghost line render, no fake values.
- **Empty:** "Log your first measurement to start tracking your trends." with Add measurement.
- **Error:** cached chart remains with provider-specific retry.
- **Success:** logged measurement appends history, updates chart, and shows green confirmation.
- **Disabled:** Yearly trend and photo compare use PaywallLock or consent reason copy.

## Motion
- Chart line draws after value appears; scrub pill follows finger with date/source/confidence.
- Metric tabs crossfade chart series; reduced motion shows final line instantly.
- Add measurement sheet locks units and source labels to avoid layout shift.

## Image Slots
- `HIFI-90-01` progress photo compare placeholder.

## Implementation Notes
- Route stays `/progress`.
- Do not surface `/goals/body` as a live route; goal progress remains an embed linking to the repaired Goals route later.
