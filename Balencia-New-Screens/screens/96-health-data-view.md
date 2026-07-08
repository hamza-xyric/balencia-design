# 96-health-data-view - hi-fi glass spec

### 1. Header
- **ID:** 96
- **Name:** Health data view
- **Route(s) covered:** /whoop
- **Tab:** Today / Health and fitness
- **Source:** Archive/2026-07-06/features.md, Archive/2026-07-06/routes.csv, canon/COMPACT-CANON.md, canon/COMPONENT-CATALOG.md, functional brief 96
- **Batch:** 12

### 2. Purpose
Health data view is a provider-neutral wearable dashboard on the live /whoop route. It surfaces recovery, strain, sleep, HRV, RHR, device sync, consent, and revoke/delete controls while keeping WHOOP-specific metrics distinct from the Balencia composite readiness score.

### 3. Entry & exit
- **Entry paths:** Health and fitness navigation, Today readiness card, device sync prompt, OAuth success from auth/whoop/callback, or direct route /whoop.
- **Primary exit:** Talk to CIA opens coach with health context after consent.
- **Secondary exits:** manage devices, revoke WHOOP access, delete synced records, open metric detail, or return to Today.
- **Failure exit:** sync failure keeps cached health data with stale provenance and offers retry, manage devices, or System states [98].

### 4. Layout anatomy
**Regions, top to bottom:**
1. **TopBar** with Health connections title, manual sync, and device settings.
2. **Readiness hero GlassCard** with composite score, recovery state, and provider provenance.
3. **Vital metric bento** for recovery, strain, HRV, RHR, sleep, and respiratory rate.
4. **CIAInsightCard** bridging provider-neutral health data to daily plan.
5. **Trend tabs** for readiness, sleep, strain, and recovery history.
6. **ConsentCard / data source list** for WHOOP, Apple Health, Oura, native bridge status, revoke, delete, and primary device selection.
7. **Footer** with OfflineBanner / SyncStatus and export/delete controls.

**ASCII wireframe (390x844):**
```text
+--------------------------------------+
| <  Health connections        sync ...|
+--------------------------------------+
| +----------------------------------+ |
| | House readiness              84  | |
| | recovery high | via WHOOP + app | |
| | provider-neutral composite      | |
| +----------------------------------+ |
| +-------------+ +----------------+   |
| | HRV 42 ms   | | Strain 14.2    |   |
| | via WHOOP   | | via WHOOP      |   |
| +-------------+ +----------------+   |
| +-------------+ +----------------+   |
| | RHR 52 bpm  | | Sleep 7h 12m   |   |
| | via Health  | | via wearable   |   |
| +-------------+ +----------------+   |
| +----------------------------------+ |
| | CIA: recovery is high; today's  | |
| | cognitive load can be heavier.  | |
| +----------------------------------+ |
| [Readiness] [Sleep] [Strain]         |
| HEALTH DATA SOURCES                  |
| WHOOP primary [Revoke] [Delete data] |
+--------------------------------------+
```

### 5. Components
- **TopBar** - title, sync, settings.
- **GlassCard** - readiness hero.
- **ProgressRing** - readiness score.
- **GlassStatCard** - HRV, RHR, strain, sleep, respiratory rate.
- **BentoGrid** - provider-neutral vital metric layout.
- **CIAInsightCard** - coach interpretation with evidence.
- **SegmentedTabs** - readiness, sleep, strain, recovery.
- **TrendChart** - historical health trends with projections clearly labeled.
- **ConsentCard** - provider data use, revoke, delete, retention.
- **ListRow** - WHOOP and other source rows with primary device control.
- **OfflineBanner / SyncStatus** - stale sync status.
- **ChipProvenance** - WHOOP, Apple Health, Oura, manual, estimated.
- **NEW: PrimaryDeviceToggle** - row-level mutually exclusive primary provider selector. Rationale: catalog lacks conflict-resolution control for multiple wearable sources.

### 6. Visual treatment
- **Atmosphere:** warm dark `#0A0A0F`, radial glow, grain, and faint purple pool only behind CIA.
- **Glass tiering:** readiness hero and CIA card use GlassCard; metric bento and source rows use SolidCard on `#211008`.
- **Semantic glows:** readiness/strain action uses `--glow-you #FF5E00`; recovery-ready/completed sync uses `--glow-done #34A853`; CIA interpretation uses `--glow-cia #7F24FF`.
- **Type:** Neue Montreal; hero line can read `House *readiness*` with Tiempos italic word.
- **60/30/10:** orange = effort/load, green = recovery/connected, purple = CIA. Provider logos never recolor the screen.

### 7. Content & copy
- **H1:** Health connections
- **Hero overline:** House *readiness*
- **Hero number:** 84
- **Metrics:** Recovery; Strain; HRV; RHR; Sleep; Respiratory rate.
- **CIA line:** Your recovery is high. CIA can scale today's cognitive load to match your capacity.
- **Primary CTA:** Talk to CIA
- **Secondary CTAs:** Manage devices; Revoke WHOOP; Delete synced records; Retry sync
- **Source copy:** Data provenance is preserved. You may revoke access or delete synced records at any time.
- **Empty copy:** Connect a provider to populate your whole health picture.
- **Error copy:** Sync failed. Cached values are marked stale and remain editable through data controls.

### 8. Data & honesty states
- **Readiness score:** real = Balencia composite with WHOOP/other provenance; low-confidence = estimated from partial providers; honest-null = no composite score.
- **Recovery:** real = provider recovery value and ChipProvenance; low-confidence = stale sync; honest-null = no recovery source.
- **Strain:** real = strain value plus WHOOP or wearable source; low-confidence = day still syncing; honest-null = no strain logged.
- **HRV/RHR/Sleep:** real = provider value with timestamp; low-confidence = baseline incomplete; honest-null = no metric.
- **Consent/source state:** real = connected/revoked/deleting plus retention; low-confidence = revoke pending; honest-null = no provider data stored.
- **CIA recommendation:** real = two or more current health signals; low-confidence = one stale signal; honest-null = no health coaching claim.

### 9. All states
- **Default:** connected provider, real metrics, readiness hero, CIA card, trends, and ConsentCard render.
- **Skeleton:** hero ring, bento cards, and source rows hold shape; no fake health numbers appear.
- **Empty:** HonestNullState prompts Connect device and explains provider-neutral data.
- **Error:** SyncFailureBanner keeps cached metrics with stale provenance and retry/manage devices.
- **Success:** sync/revoke/delete updates source row with `--glow-done` and timestamp.
- **Disabled:** Talk to CIA, sync, trend, revoke, or delete dims to 40% with reason when consent, provider, bridge, entitlement, or connectivity blocks action.

### 10. Motion & interaction
- **Load:** readiness hero fades in; metric bento follows in 50ms stagger.
- **Sync:** manual sync shows bounded spinner and updates provenance chips.
- **Charts:** trend lines draw only from real data; projections are dashed and labeled.
- **Sources:** revoke/delete opens confirmation Sheet naming provider and record scope.
- **Reduced-motion:** disables ring sweep, chart draw, metric cascade, and glow breathing.

### 11. Motivation-tier adaptation
- **Low:** readiness hero, recovery, strain, consent/source state, Talk to CIA.
- **Medium:** default bento, CIA card, trend tabs, provider controls.
- **High:** six-metric bento, micro-trends, primary device conflict detail, export/delete audit.

### 12. Accessibility
- **Contrast:** text and charts clear AA+ on dark and solid surfaces.
- **Targets:** sync, metric cards, tabs, Talk to CIA, revoke, delete, and provider rows are 44px minimum.
- **Screen readers:** metrics announce value, unit, source, confidence, and timestamp before trend points.
- **Consent/health data:** provider consent, revoke, delete synced records, export, and retention are visible.
- **Medical safety:** health data is informational and not a diagnosis; urgent symptoms route to appropriate care guidance.
- **Reduced-motion:** mirrors Section 10.

### 13. Premium checklist
1. **Source-specific:** /whoop, provider-neutral, WHOOP, recovery, strain, consent, revoke/delete are present.
2. **Honest:** real, low-confidence, honest-null states cover readiness, recovery, strain, vitals, consent, CIA.
3. **Premium:** provider dashboard is specific and source-aware.
4. **Warm-dark:** glass hero, solid bento, and radial atmosphere specified.
5. **Semantic glow:** orange effort, green recovery/sync, purple CIA.
6. **60/30/10:** provider colors do not dominate.
7. **Type:** Neue Montreal plus one Tiempos italic word.
8. **All states:** Default, Skeleton, Empty, Error, Success, Disabled covered.
9. **Motivation tiers:** low, medium, high variants.
10. **Accessibility:** 44px targets, labels, health disclaimer, contrast, reduced-motion.
11. **Consent:** provider revoke/delete/export and retention controls are explicit.
12. **Catalog:** canon components reused; PrimaryDeviceToggle is NEW with rationale.
13. **CIA voice:** health guidance is evidenced and never diagnostic.

