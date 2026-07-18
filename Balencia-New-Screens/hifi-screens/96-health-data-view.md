# 96 Health data view - A+++ hi-fi mobile spec

## Header
- **Source ID:** 96
- **Source spec:** `Balencia-New-Screens/screens/96-health-data-view.md`
- **Evidence:** `Archive/2026-07-06/features.md`, `Archive/2026-07-06/routes.csv`, `work/briefs/96.md`, `work/drafts/96.md`
- **Route:** `/whoop`
- **Frame:** 390x844 native mobile
- **Priority:** convert-now

## Reviewer Synthesis
- **Source Fidelity Reviewer:** live route is `/whoop`; UI must be provider-neutral and distinguish Balencia composite from device-native scores.
- **Premium Visual Director:** use one readiness dial as the focal instrument; avoid provider-logo dominance.
- **Interaction and State Designer:** manual sync, metric detail, chart scrub, primary device conflict, bridge limitation, revoke/delete states are required.
- **Trust and Safety Reviewer:** health data needs explicit consent, revoke, delete synced records, export, retention, and non-diagnostic copy.
- **GLM directions considered:** provider dashboard, readiness cockpit, compliance-first source manager. **Chosen:** readiness cockpit plus visible source manager.

## Final Composition

```text
+--------------------------------------+
| <  Health connections        sync ...|
| +----------------------------------+ |
| | BALENCIA *READINESS*           84| |
| | recovery high                    | |
| | house score, provider-neutral    | |
| | via WHOOP + app                  | |
| | [Talk to CIA]                    | |
| +----------------------------------+ |
| HRV 42 ms          Strain 14.2      |
| via WHOOP          via WHOOP        |
| RHR 52 bpm         Sleep 7h 12m     |
| via Health         via wearable     |
| Device-native: WHOOP recovery 78    |
| +----------------------------------+ |
| | CIA: recovery is high. Consider | |
| | a heavier focus block if it     | |
| | still feels right.              | |
| | Evidence: HRV, sleep, strain    | |
| +----------------------------------+ |
| [Readiness] [Sleep] [Strain]        |
| HEALTH DATA SOURCES                 |
| WHOOP primary      Revoke  Delete   |
| Apple Health       requires app     |
| Export data        Retention        |
| Today        CIA       Goals    Me   |
+--------------------------------------+
```

## Focal Hierarchy
- **Dominant focal moment:** provider-neutral Balencia Readiness dial, with source-native scores separated below.
- **Metric bento:** source-aware vitals below the hero.
- **CIA layer:** interpretation with evidence, not a medical claim.
- **Compliance layer:** sources, primary device, revoke/delete/export remain visible.

## Visual System
- Readiness hero uses orange `--glow-you` for current capacity and effort.
- Recovery/synced success uses green `--glow-done`.
- CIA interpretation uses purple `--glow-cia`.
- Provider colors never recolor chrome.
- Neue Montreal; Tiempos italic word: "*readiness*".

## Components
- `TopBar`, `GlassCard.hero`, `ProgressRing`, `GlassStatCard`, `BentoGrid`, `CIAInsightCard`, `SegmentedTabs`, `TrendChart`, `ConsentCard`, `ListRow`, `OfflineBanner`, `SyncStatus`, `ChipProvenance`.
- `NEW: PrimaryDeviceToggle` - mutually exclusive source selector.
- `NEW: SyncFailureBanner` - provider sync, expired token, or native bridge limitation state.

## Data Honesty
- Balencia readiness: house composite with source count; low-confidence partial providers; honest-null no composite.
- Device-native scores: clearly labeled as source-specific, for example `WHOOP recovery 78`; never mixed with the Balencia composite.
- HRV/RHR/Sleep/strain/respiratory rate: value, unit, source, timestamp, confidence.
- Apple/Samsung bridge: honest state "requires native app bridge" when web cannot sync.
- CIA insight: requires at least two current health signals; otherwise no claim.
- Free tier: one device and device-native scores. Premium: multi-device source resolution, Balencia readiness, longer trends, and CIA correlations. Locked states use generic previews until consent and entitlement both exist.

## Consent and Safety
- Connect preview names OAuth scope, sync frequency, storage, retention, provider, primary-device conflict handling, revoke access, delete synced records, and export data before connection.
- Talk to CIA opens health-context consent before sending data to coach.
- Health guidance is informational and not a diagnosis; urgent symptoms route to appropriate care guidance.
- Revoke/delete success uses green status and timestamp.

## States
- **Default:** connected provider, hero, bento, CIA, tabs, source list.
- **Skeleton:** hero ring and bento hold shape with no numbers.
- **Empty:** "Connect your first device to populate your whole health picture."
- **Partial:** missing metrics show honest-null cards, not zeroes.
- **Stale/offline:** cached metrics labeled with last sync.
- **Error:** SyncFailureBanner names provider or bridge limitation.
- **Bridge limitation:** Apple Health/Samsung Health rows state "requires native app bridge" and offer a non-web setup path.
- **Disabled:** sync, trends, CIA, revoke, or delete dim with reason when blocked.

## Motion
- Readiness ring sweeps once; bento cards stagger 50ms.
- Manual sync shows bounded spinner and provenance update.
- Trend lines draw only from real data; projections are dashed and labeled.
- Reduced motion renders final ring/chart and disables glow breathing.

## Image Slots
- `HIFI-96-01` provider-neutral wearable/source icon set.

## Implementation Notes
- Route header stays `/whoop`; do not rename the route to `/health-data`.
- UI copy can say "Health connections" and "provider-neutral composite" to resolve the live-route contradiction honestly.
