# 90-progress-measurements - hi-fi glass spec

### 1. Header
- **ID:** 90
- **Name:** Progress measurements
- **Route(s) covered:** /progress
- **Frame:** Native mobile, 390x844 reference.
- **Tab:** Fitness / Progress primary nav.
- **Source:** Archive/2026-07-06/features.md, Archive/2026-07-06/routes.csv, and Balencia-New-Screens/canon.
- **Batch:** 11

### 2. Purpose
Progress measurements is the honest body-measurement and trend surface for weight, BMI, body measurements, progress photos, and fitness changes. It must avoid shame: trends are framed as information, not moral score, and every value shows source, confidence, and date.

### 3. Entry & exit
- **Entry:** primary nav Progress, Home vitals, Fitness dashboard, progress photos, CIA insight, or notification.
- **Primary exit:** add measurement, inspect TrendChart, or open progress photos.
- **Data exit:** manage body metrics, photo consent, wearable source, import, export, and delete.
- **Coaching exit:** CIA insight opens chat with evidence chips, not a diagnosis.
- **Failure exit:** cached trends remain visible with SyncStatus and route-level retry.

### 4. Layout anatomy
**Regions, top to bottom:**
1. TopBar with "Progress", add button, and data settings.
2. Hero GlassCard with current weight trend and source date.
3. KPIRow for weight, BMI, waist, and change window.
4. TrendChart for weight/BMI/body measurement timeline.
5. Progress photos preview with consent and privacy controls.
6. CIAInsightCard about pacing or recovery evidence.
7. Measurement history rows and GlassNavBar.

**ASCII wireframe (390x844):**
```text
+--------------------------------------+
| Progress                    add gear |
+--------------------------------------+
| +----------------------------------+ |
| | WEIGHT TREND                    | |
| | 176.4 lb     -1.2 this month    | |
| | via smart scale · Jul 6         | |
| +----------------------------------+ |
| [BMI 24.8] [Waist 33.1] [Photos 4] |
| +----------------------------------+ |
| | TrendChart                      | |
| | 180 |      user line            | |
| | 176 | --- projected line        | |
| | 172 |  green goal dots          | |
| +----------------------------------+ |
| +----------------------------------+ |
| | Progress photos                 | |
| | consent on · compare May/July   | |
| | [Open photos] [Revoke access]   | |
| +----------------------------------+ |
| CIA: weight dipped after sleep     |
| improved. Keep the pace steady.    |
| History: Jul 6, Jun 29, Jun 22     |
| Today | CIA | Goals | Me           |
+--------------------------------------+
```

### 5. Components
- **TopBar** - add measurement and data settings.
- **GlassStatCard** - hero weight trend with ChipProvenance.
- **KPIRow** - BMI, waist, photo count, and freshness.
- **TrendChart** - solid orange user line, dashed purple projection, green milestones.
- **ChipProvenance** - smart scale, manual log, progress photo, estimated.
- **ConsentCard** - progress photos, health metrics, imports, revoke/delete.
- **CIAInsightCard** - coaching read with evidence chips.
- **ListRow** - measurement history.
- **SyncStatus / HonestNullState / SkeletonState / ErrorState** - source states.

### 6. Visual treatment
- **Atmosphere:** `#0A0A0F` with warm radial glow; fitness red appears only inside ChipDomainTag.
- **Hero:** weight trend GlassStatCard uses `--glow-you #FF5E00` for current effort.
- **Chart:** TrendChart follows canon: orange real line, purple projected line, green goal dots, no decorative gradients.
- **Completion:** goal measurements use `--glow-done #34A853`; CIA projection uses `--glow-cia #7F24FF`.
- **Type:** Neue Montreal with one Tiempos italic word in the hero, such as "steady *pace*."

### 7. Content & copy
- **H1:** "Progress."
- **Hero:** "176.4 lb. Down 1.2 this month."
- **BMI row:** "BMI 24.8." "Waist 33.1 in." "Photos 4."
- **Photo copy:** "Progress photos are private by default."
- **CTA labels:** "Add measurement", "Open photos", "Revoke access."
- **CIA line:** "Weight dipped after sleep improved. Keep the pace steady."
- **Empty copy:** "No measurements yet. Add weight, waist, or a photo when you are ready."

### 8. Data & honesty states
- **Weight:** real = scale or manual value plus date; low-confidence = stale/imported value; honest-null = no number and add-measurement CTA.
- **BMI:** real = computed from height and weight; low-confidence = missing recent weight; honest-null = "Needs height and weight."
- **Measurements:** real = user-entered waist/chest/hip/other value; low-confidence = old value; honest-null = no row.
- **Progress photos:** real = consented photos with local/private provenance; low-confidence = upload pending; honest-null = no thumbnails and consent explainer.
- **CIA insight:** real = multi-signal trend; low-confidence = single-signal note; honest-null = no causal claim.

### 9. All states
- **Default:** hero, KPI row, TrendChart, photos, CIA insight, and history render.
- **Skeleton:** stat cards, chart axes, photo frame, and history rows shimmer without fake values.
- **Empty:** no metric values; HonestNullState invites manual measurement and keeps photo consent clear.
- **Error:** source-specific failure preserves cached chart and names the failed provider.
- **Success:** new measurement flashes green, updates TrendChart, and appends history.
- **Disabled:** photo compare, imports, and delete actions dim when consent or storage blocks them.

### 10. Motion & interaction
- **Load:** hero fades, chart draws orange line, then projection and goal dots appear.
- **Add:** add button opens Sheet for weight, BMI source, body measurements, or photo.
- **Chart scrub:** drag reveals date, value, source, and confidence in a glass pill.
- **Photo compare:** opens progress photos with consent reminder and delete path.
- **CIA evidence:** opens chips for sleep, workout, and measurement source.
- **Reduced-motion:** chart renders at final state; no count-up or glow breathing.

### 11. Motivation-tier adaptation
- **Low:** show hero, one chart summary, and add-measurement CTA; hide comparison rows.
- **Medium:** default layout.
- **High:** show multiple measurement series, photo compare, freshness warnings, and source filters.

### 12. Accessibility
- **Contrast:** text on `#0A0A0F` and `#211008` meets AA+; trend colors have labels and patterns.
- **Targets:** add, chart points, photo controls, history rows, and revoke/delete are 44px minimum.
- **Screen readers:** TrendChart announces current value, trend window, source, and confidence before point details.
- **Data control:** health and photo consent, revoke, export, and delete controls are visible.
- **Safety:** copy avoids shame and diagnosis; body metrics never trigger crisis-style gamification.
- **Reduced-motion:** mirrors Section 10.

### 13. Premium checklist
1. **Connects:** measurements link fitness, sleep, photos, and CIA coaching.
2. **Honest:** all values have source, date, confidence, or honest-null.
3. **Premium:** body data is calm, private, and non-shaming.
4. **Warm-dark:** canon glass and chart treatment applied.
5. **Semantic glow:** effort, completion, and projection meanings stated.
6. **60/30/10:** orange user trend, green milestones, purple projection.
7. **Type:** Neue Montreal plus one Tiempos italic word.
8. **States:** Default, Skeleton, Empty, Error, Success, Disabled covered.
9. **Motivation tiers:** low, medium, high variants defined.
10. **Accessibility:** 44px targets, labels, contrast, reduced-motion included.
11. **Honesty triple:** real, low-confidence, honest-null defined for all measurements.
12. **Catalog:** canon components used.
13. **CIA voice:** evidence-based coaching, no diagnosis or shame.
