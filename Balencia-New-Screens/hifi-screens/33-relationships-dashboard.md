# 33-relationships-dashboard - A+++ hi-fi mobile spec

## Header
- **Source ID:** 33
- **Source spec:** `Balencia-New-Screens/screens/33-relationships-dashboard.md`
- **Evidence:** screens/33-relationships-dashboard.md, work/briefs/33.md, work/drafts/33.md, Batch 14
- **Route(s):** `/people`
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: The Relationships Dashboard helps users intentionally nurture personal connections by tracking quality time, cadence, and connection health.
- **Premium Visual Director:** make Relationships Dashboard hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Relationships Dashboard uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+-------------------------------------+ 4px
|    Relationships           [Lv 6]  |  TopBar (Transparent)
+-------------------------------------+
| ####### Pink Domain Accent Line ### |
|                                     |
| +---------------------------------+ |
| |  CIA                   ask CIA | |  CIAInsightCard
| | You feel more *energized*...    | |
| +---------------------------------+ |
|                                     |
| +--------+ +--------+ +--------+    |
| | TIME   | |SESSIO | | PEOPLE |    |  KPI Strip
| | 4.5h   | |   5    | |   3    |    |
| +--------+ +--------+ +--------+    |
|                                     |
| +---------------------------------+ |
| |                                | |  GlassStatCard
| |        84                      | |  (Hero Gauge)
| |                 in touch       | |
| +---------------------------------+ |
|                                     |
| CHECK IN                            |
| +---------------------------------+ |
| | Ahmed on your mind? 2 weeks   | |  ListRow
| +---------------------------------+ |
|                                     |
| KEY PEOPLE                  view all|
| +---------------------------------+ |
| | o Portfolio Donut               | |
| | ------------------------------  | |
| | o Ahmed      [gauge] in touch   | |  ListRow
| | o Mom        [gauge] today      | |  ListRow
| | o Sarah      [gauge] reach out  | |  ListRow
| +---------------------------------+ |
|                                     |
| RECENT QUALITY TIME                 |
| +---------------------------------+ |
| |  Dinner with Mom      2h ago    | |
| +---------------------------------+ |
|                                     |
| +---------------------------------+ |
| |  CIA suggests                  | |  CIAInsightCard
| | Exercising with Ahmed...        | |
| |              [skip]   [do it]   | |
| +---------------------------------+ |
|                                     |
+-------------------------------------+
|              [ + ]                  | FABQuickLog
|  Today    CIA    Goals    Me        | GlassNavBar
+-------------------------------------+

Route handling: `/people`
```

## Focal Hierarchy
- **Dominant focal moment:** Relationships Dashboard hero; it should be visually singular, not one tile among many.
- **Secondary layer:** TopBar with CIA only when the source supports a synthesized read.
- **Operational layer:** CIA Coaching Note, Weekly KPI Strip, Connection Strength Hero Gauge, Check In.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*dashboard*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar**: Transparent over atmosphere; right action uses `NEW: BadgeRPGTile` (a compact 32x32 pill showing "Lv 6" in tabular-nums, tapping routes to Screen 19).
- **CIAInsightCard**: Used for the coaching note and CIA Suggests sections.
- **SolidCard**: Wrapper for Key People list and Weekly KPI strip (prioritizes legibility over atmosphere).
- **KPIRow**: Shares one SolidCard for time, sessions, and people.
- **GlassStatCard**: Hero focal point for the 96px connection gauge (`variant: ring`).
- **ProgressRing**: 96px hero ring and 48px satellite rings in person rows.
- **ListRow**: Base component for reminders, people, recent quality time, and dates.
- **FABQuickLog**: Opens a `Sheet` (variant: `action`) to choose person/activity.
- **GlassNavBar**: Bottom floating navigation.
- **NEW: CadenceHeatmap**: A 6x4 grid representing weekly touchpoints (replaces generic charts for dense mobile rows). Rationale: A heatmap natively fits the 8pt grid inside a `ListRow` without breaking horizontal scroll constraints.
- **NEW: DomainAccentLine**: A 2px high `--surface-3` background with a 60% width `#ec4899` fill directly under the TopBar. Rationale: Maintains premium minimalism while permanently anchoring the screen's domain context.

## Data Honesty
- *Every metric ships 3 states. No fabricated numbers.*
- **Connection Strength Score (Hero Gauge)**
- - **Real:** "84" (paper-100) + ChipProvenance: `CIA sync`.
- - **Low-confidence:** "84" (paper-64%) + ChipProvenance: `estimated  low confidence`.
- - **Honest-null:** Dashed ghost arc track + Copy: "getting to know this connection".
- **Weekly Time/Session/People (KPI Strip)**
- - **Real:** "4.5h" + ChipProvenance: `you logged`.
- - **Low-confidence:** "4.5h" (paper-64%) + `estimated`.
- - **Honest-null:** "0" (paper-40%) + Copy: "calibrating - building your connection rhythm".
- **Outreach Cadence (Heatmap)**

## Consent and Safety
- Relationships Dashboard uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- Keep navigation targets aligned to `/people`. Do not add alternate vanity routes.

## States
- **Default:** Full dashboard rendered, gauge drawn.
- **Skeleton:** Depth-preserving shimmer blocks. Gauge track visible with radial sweep (`SkeletonState`). Copy: "CIA is reading your relationships - one moment."
- **Empty:** `EmptyState` card replaces Key People list. Focus shifts to `BtnPrimary` ("+ add person").
- **Error:** `ErrorState` inline replaces Check In list. Copy: "Couldn't load your reminders - pull to refresh." KPIs remain if cached.
- **Success:** After logging via FAB, `StreakCard` logic applies a brief green glow (`glow-done`) on the FAB. "Skip" success dims CIA Suggests card to 40% opacity.
- **Disabled:** FAB and swipe gestures disabled offline; `OfflineBanner` appears.

## Motion
- **Physical Easing:** `cubic-bezier(0.32, 0.72, 0, 1)` standard UI easing (250ms).
- **Draw-first Hierarchy:** Hero gauge fills clockwise (520ms) -> KPI counts up (280ms) -> Person rows stagger in bottom-up (40ms offset per row).
- **Living Line Draw:** The projected cadence trend line (if sparkline is toggled) draws left-to-right (1200ms) followed by the dashed CIA projection.
- **Expand/Collapse:** Tapping a person row smoothly expands height (280ms) to reveal the `CadenceHeatmap`, simultaneously retargeting the 96px hero gauge with a radial number roll animation.
- **Gestures:** Swipe Left (Dismiss / Skip), Swipe Right (Mark Done / Log). Long-press for an accessible `Sheet` menu.
- **Haptics:** Light impact on gauge retarget; medium impact on successful log.
- **Reduced Motion:** All draws and staggers bypass to simple opacity fades (150ms). Gauge renders final state instantly.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/people`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **AA+ Contrast:** All primary text (`#FEFAF3`) on `--bg-base` and `--surface-2` exceeds 16:1. Secondary text (`#FEFAF3` at 64%) meets AA for normal text.; **Targets:** All interactive elements (chevrons, add person, FAB, list rows) enforce a strict 44x44px minimum touch target, maintaining the 8pt grid.; **Screen Reader:** Glyph-only FAB and gauge controls provide explicit `aria-labels` (e.g., "Log quality time", "Connection score: 84 out of 99"). Cadence heatmaps expose data as an aria-list array rather than a raw graphic.
