# 26-fitness-workouts-dashboard - A+++ hi-fi mobile spec

## Header
- **Source ID:** 26
- **Source spec:** `Balencia-New-Screens/screens/26-fitness-workouts-dashboard.md`
- **Evidence:** screens/26-fitness-workouts-dashboard.md, work/briefs/26.md, work/drafts/26.md, Functional Content Brief (corrected for CIA persona and signature hierarchy)
- **Route(s):** `/activity`, `/workouts`
- **Frame:** 390x844 native mobile
- **Priority:** converted with asset slots

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: To serve as the physical command center, integrating CIA-generated workout prescriptions with honest wearable data (WHOOP).
- **Premium Visual Director:** make Fitness & workouts dashboard hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Fitness & workouts dashboard names health category, source, freshness, confidence, retention, export, revoke, and delete before synced values or photo-derived reads are trusted.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
[]    [Lv.12]    []
  Fitness & *workouts*        (Header: Transparent)

+------------------------------+
|   CIA Note                  |  (Glass, Purple Glow)
|  Recovery is high. Good day  |
|  for *intensity*.            |
|  [via WHOOP]   [Ask CIA ->]   |
+------------------------------+

+------------------------------+
| YOUR RECOVERY        [via ] |  (Solid, Warm Glow)
|      +-------+               |
|     |   78%   |              |
|      +-------+               |
|  +--------+  +--------+      |
|  | Sleep  |  |  HRV   |      |
|  |  84%   |  |  52ms  |      |
|  +--------+  +--------+      |
|  Intensity Charge: ##### 78% |
+------------------------------+

+------------------------------+  (Glass, Orange Glow)
| TODAY'S WORKOUT              |
| Upper body strength   45m   |
| [Back] [Chest] [Arms] ->      |
| +--------------------------+ |
| |      Start workout ->     | | (BtnPrimary)
| +--------------------------+ |
+------------------------------+

ACTIVE GOALS                 View all
  Bench press 125kg   ###### 80%
  Run 5k under 25m    ###### 40%

THIS WEEK
+-----------+-----------+------+
| Workouts  | Active m  | Kcal | (KPIRow)
|    4      |    120    | 950  |
|  up 1    |    -      |  40 |
+-----------+-----------+------+

+------------------------------+
| WEEKLY VOLUME                |  (SolidCard)
|                        |  (Ghost ticks vs solid bars)
+------------------------------+

+------------------------------+
| ACTIVITY TREND               |  (SolidCard)
|    -       - - o o o  |  (Living-Line + CIA projection)
+------------------------------+

+------------------------------+
| CONSISTENCY (last 4 weeks)   |  (SolidCard)
| ##########################  |  (Heatmap)
+------------------------------+

                  (   +   )    FAB (Quick-log)
 [Today] [CIA] [Goals] [Me]    Floating Glass Nav

Route handling: `/activity`, `/workouts`
```

## Focal Hierarchy
- **Dominant focal moment:** Fitness & workouts dashboard hero; it should be visually singular, not one tile among many.
- **Secondary layer:** TopBar with CIA only when the source supports a synthesized read.
- **Operational layer:** CIA Insight Region, Recovery Signature Region, Today's Plan Region, Goals Region.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Figma parity mode is the default for this pass: warm-light operational dashboard, compact metric cards, orange active tab, green completion states, and purple only for CIA/projection surfaces.
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain remain the premium analytical variant.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*dashboard*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Figma Reference Alignment
- **Direct Figma aliases:** `Workouts` plus tabs `Workout`, `My Plan`, `Weekly`, `Calendar`, `Analytics`; the surrounding domain grid frame is labeled `Features`.
- **Evidence tier / canon exception:** Tier B/C only. No live Figma MCP metadata or live MCP screenshot was available for this review/fix session; alignment comes from supplied mock/reference screens plus local prompt/ledger evidence. The warm-light Figma-derived workout dashboard is a scoped exception, not a replacement for glass-dark v1 canon. CIA naming, data honesty, and glass-redesign rules remain binding.
- **Shell/anatomy:** Figma workout screens use a warm-light operational dashboard: top back chevron, centered title `Workouts`, add button, four top metric cards with orange/green/purple sparklines (`Workout`, `Total Time`, `Burned`, `Streak`), then a segmented tab rail with the active tab filled orange.
- **Tab mapping:** `Workout` = plan-completed hero and manual-plan buttons; `My Plan` = exercise prescription list with category chips and edit/delete controls; `Weekly` = weekly progress check row plus this-week sessions; `Calendar` = month grid with orange current day and legend cards; `Analytics` = range selector (`7D`, `30D`, `500D`, `900D`, `TY`) and line/area trend chart.
- **Visual mode note:** keep RecoveryGaugeCluster as the premium analytical expansion, but default Figma parity should show the compact metric-card row and tab rail before any dense recovery module.

## Components
- **TopBar:** Back chevron, H1 title, level badge (tap target 44px).
- **CIAInsightCard:** Default purple-tinted glass variant.
- **NEW: RecoveryGaugeCluster:** A `SolidCard (elevated)` housing a `ProgressRing` (96px), two secondary 48px banded rings, and a `ChargeMeter`. *Rationale:* The brief designates this as the "signature" moment requiring bespoke atmospheric layout rather than standard discrete cards.
- **GlassCard:** `hero` variant (radius 40) for the workout plan.
- **BtnPrimary:** "Start workout" CTA.
- **SectionHeader:** Overline + H2 + trailing `BtnGhost` for goals.
- **ProgressBar:** 2-3 inline active goals.
- **KPIRow:** 3 mini-stats sharing a `SolidCard`.
- **NEW: VolumeBarChart:** Compact bar chart juxtaposing solid bars (this week) against ghosted dashed ticks (last week). *Rationale:* Canon mandates simple, honest data-viz without fabricated 3D gradients.
- **TrendChart:** `Living-Line` (orange solid) + CIA projection (dashed purple). Acts as a workhorse.
- **NEW: StreakHeatmap:** A `SolidCard` containing a GitHub-style 4-week consistency grid. *Rationale:* Native data-viz requirement not covered by standard catalog line/ring components.
- **FABQuickLog:** Routes to manual logging.
- **GlassNavBar:** 4-tab floating pill.

## Data Honesty
- Every metric respects the 3-state honesty invariant (Real, Low-confidence, Honest-null). Ghosted dashed arcs are used for missing wearable data, explicitly distinguishing it from low values.
- **Recovery (%):**
- - *Real:* "78%" + ChipProvenance `via WHOOP`
- - *Low-confidence:* "78%" (muted 64%) + `estimated  low confidence`
- - *Honest-null:* "-" (ghosted dashed ring) + `Not synced`
- **Sleep / HRV:** Follows exact same 3-state provenance architecture.
- **Weekly Stats (Workouts/Min/Kcal):**
- - *Real:* "4" + delta " up 1" (green).
- - *Low-confidence:* Delta muted out, showing only "-" if unverified.
- - *Honest-null:* "0" + Caption "Log your first workout".

## Consent and Safety
- Add a visible `Data sources` row/chip near the metric strip. It opens health-source controls: provider, category, source, freshness, confidence, retention, export workout data, revoke provider access, and delete cached workout/wearable reads.
- Fitness & workouts dashboard treats media as consent-gated: no identifiable face, body, home, document, provider logo, or private text appears without explicit permission.
- Workout recommendations include a quiet boundary line: not medical advice; stop and seek help for chest pain, dizziness, faintness, or sharp pain.
- Keep navigation targets aligned to `/activity`, `/workouts`. Do not add alternate vanity routes.

## States
- **Default:** Full dashboard rendered natively.
- **Skeleton:** Depth-preserving shimmer blocks. Gauge rings draw via radial shimmer. Trend chart line uses L-to-R wipe animation.
- **Empty / Cold-start:** CIA motivational card. Workout card displays starter prompt to [09]. Gauges render as ghosted dashed arcs (no-data  0%). Heatmap renders single dot: "Your streak starts today."
- **Error:** Failed cards retain physical depth and glow but show inline text links. WHOOP failure: "Could not load WHOOP data. *Retry*?" No harsh red errors, no user blame.
- **Offline:** Cached data retained. Top banner: `OfflineBanner` ("offline - showing last sync 2h ago"). Pull-to-refresh visually dimmed and disabled.
- **Success:** Initiating "Start workout" transitions the CTA to a brief green glow before routing.
- **Disabled:** BtnPrimary shows 40% opacity if data requirements for a workout are utterly unavailable.
- **Tab states:** each tab owns default, skeleton, empty, offline, error, success, and locked states. The segmented indicator slides under reduced motion as an instant orange fill swap; inactive tab labels remain muted gray. Calendar selected days use orange circles, completed days green checks, remaining sessions orange hourglass chips.

## Motion
- **Easing & Timing:** Physical easing only (never linear). Feedback animations restricted to 150-250ms.
- **Draw-First Order (On Load):** Recovery gauge fills via radial sweep (520ms) -> Secondary gauges draw -> KPIs count up -> Bar chart bars rise (300ms) -> 6-week TrendChart draws itself L-to-R (1200ms) -> Dashed CIA projection draws last -> Heatmap cells stagger in (40ms delay each).
- **Glow "Breathe":** The Recovery Signature card features a slow (4s) continuous subtle pulse of its orange `glow-you` to signal active physical energy.
- **Gestures:** Tap (UI), Edge swipe (back), Horizontal swipe (exercise chips), Long-press (trend chart crosshair).
- **Scroll Intent:** On scroll-down, the Quick-log FAB translates down 16px + fades to 0 opacity. Reverses instantly on scroll-up.
- **Haptics:** Light impact on CTA press, medium impact on long-press chart crosshair.
- **Reduced Motion:** All charts appear instantly at their final drawn state. The Living-Line trend is rendered fully static with its CIA projection visible. FAB scroll-hiding is disabled (remains fixed).

## Image Slots
- `HIFI-26-01` - content proof or instructional media slot; screen-specific; privacy-safe, non-diagnostic, no identifiable person. Prompt: Fitness & workouts dashboard instructional media thumbnails, Balencia warm-dark glass UI asset, privacy-safe, no brand logos, no readable UI text.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/activity`, `/workouts`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** Adheres to AA+. Paper-100 (#FEFAF3) on `--surface-2` (#211008) provides >12:1 contrast. Paper-50 on Glass is verified.; **Targets:** All interactive elements (chevrons, chips, CTAs) exceed the 44x44px minimum touch target, aided by invisible padding where glyphs are smaller.; **Screen-reader labels:** Glyph-only components (FAB, back chevron, settings gear) include explicit `aria-labels` (e.g., `Log workout`, `Navigate to previous screen`).
