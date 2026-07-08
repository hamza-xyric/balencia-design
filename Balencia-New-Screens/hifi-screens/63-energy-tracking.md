# 63-energy-tracking - A+++ hi-fi mobile spec

## Header
- **Source ID:** 63
- **Source spec:** `Balencia-New-Screens/screens/63-energy-tracking.md`
- **Evidence:** screens/63-energy-tracking.md, work/briefs/63.md, work/drafts/63.md, Functional Content Brief: Energy Tracking
- **Route(s):** `/wellbeing/energy`
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Serve as the user's personal energy observatory, allowing frictionless logging of energy levels throughout the day to detect chronotypes, identify peak productive windows, and reveal cross-domain life correlations.
- **Premium Visual Director:** make Energy Tracking hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Energy Tracking names health category, source, freshness, confidence, retention, export, revoke, and delete before synced values or photo-derived reads are trusted.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+----------------------------------------------------+ |
|  < [back]       Energy tracking        [overflow]   | |- TopBar (transparent -> glass on scroll)
+----------------------------------------------------+ |
|                                                    | |
|  +----------------------------------------------+  | |
|  |  . . . . . . . . . . . . . . . . . . . . .   |  | |- GlassCard (Hero, radius 40)
|  |  .   CURRENT ENERGY                    .   . |  | |  glow-you (effort)
|  |  .             7.5                        .   |  | |
|  |  .         [ Arc Gauge ]                  .   |  | |
|  |  .                                        .   |  | |
|  |  . . . . . . . . . . . . . . . . . . . . .    |  | |
|  +----------------------------------------------+  | |
|                                                    | |
|  QUICK LOG                                         | |- SectionHeader
|  +----------------------------------------------+  | |
|  | [ ==============o===================== ] 7.5  |  | |- SolidCard (Log Zone)
|  | (morning) (post-workout) (post-meal)         |  | |  ChipRow
|  | [how are you feeling. (optional)         ]   |  | |  GlassPillInput
|  |             ( log energy )                   |  | |  BtnPrimary
|  +----------------------------------------------+  | |
|                                                    | |
|  TODAY'S ENERGY                            avg: 6.2|- SectionHeader
|  +----------------------------------------------+  | |
|  |   /\        /\                               |  | |- SolidCard
|  |  /  \      /  \      5 logs today            |  | |  TrendChart (Sparkline)
|  +----------------------------------------------+  | |
|                                                    | |
|  ===============================================  | |- PaywallLock / Blur Gate
|  || Peak Hours             (LOCKED PREMIUM)     ||  | |  (Hides lower content for Free users)
|  || Chronotype             (LOCKED PREMIUM)     ||  | |
|  || Correlations           (LOCKED PREMIUM)     ||  | |
|  ===============================================  | |
|                                                    | |
|  +----------------------------------------------+  | |
|  | ()  *golden* window for deep work...        |  | |- CIAInsightCard
|  |      [ ask CIA more ]                        |  | |  glow-cia
|  +----------------------------------------------+  | |
|                                                    | |
+----------------------------------------------------+ |
|         [ Today ] [ CIA ] [ Goals ] [ Me ]         | |- GlassNavBar
+----------------------------------------------------+ |

Route handling: `/wellbeing/energy`
```

## Focal Hierarchy
- **Dominant focal moment:** Energy Tracking hero; it should be visually singular, not one tile among many.
- **Secondary layer:** Hero / Current Energy Display with CIA only when the source supports a synthesized read.
- **Operational layer:** Quick Log Card, Today's Energy Timeline, Peak Hours Card, Chronotype Badge.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*tracking*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Figma Reference Alignment
- **Language-derived evidence:** no direct Energy Tracking frame was visible in the supplied Figma screenshots; inherit the warm-light wellbeing/dashboard card language rather than the dark-only hero.
- **Shell/anatomy:** mirror Home/Nutrition compact cards: top title row, 3-4 metric cards with sparklines, segmented time rail, a solid quick-log card, and an honest empty-state illustration when no logs exist.
- **Semantic color:** orange = logged energy/action, green = stable/restored energy window, purple = CIA pattern/projection. Do not make purple the dominant energy color unless the card is explicitly an AI insight.
- **Density:** the quick-log slider should feel like the Figma engagement-level/preference rows: clear label, value pill, selected chips, and one full-width orange action.

## Components
- `TopBar`: Transparent background, transitions to `.glass-pill` on scroll.
- `GlassCard` (variant `hero`): Radius 40, holds the Arc Gauge. Glow: `--glow-you`.
- `SolidCard`: Data-dense cards for Quick Log, Today's Energy, and Correlations to ensure legibility.
- `SectionHeader`: Overline + H2 title + trailing metadata.
- `GlassPillInput` (variant `text`): For optional logging notes.
- `ChipDomainTag`: For single-select logging context.
- `BtnPrimary`: Main "log energy" CTA.
- `CIAInsightCard`: Purple-tinted glass for final coaching note. Glow: `--glow-cia`.
- `TrendChart`: Line chart for today's timeline and multi-day trends.
- `SegmentedTabs`: Today / Week / Month / Patterns, using the Figma orange active tab and muted inactive labels.
- `PaywallLock`: Inline tile blurring premium analytics for free users.
- `NEW: ArcGaugeDial`: An open 240 radial dial replacing the standard closed `ProgressRing` to better represent depletable/recoverable capacity (ChargeMeter concept). Replaces standard ring UI in the Hero.
- `NEW: ImpactBarRow`: A horizontal bar component used in the Correlations card mapping positive (green) and negative (orange) impacts with domain tags and chevrons, optimized for narrow mobile widths compared to standard tables.
- `FeatureGridDomainCard`: compact premium cards for Peak Hours, Chronotype, and Correlations; locked cards stay readable with a lock glyph, 40% opacity, and a clear unlock action rather than a blurred dead zone.

## Data Honesty
- Every metric renders through the 3-state honesty invariant. No fabricated numbers.
- **1. Current Energy (Hero Gauge)**
- *Real:* `7.5` + chip `you logged`.
- *Low-confidence:* (Greyed value) + `estimated  low confidence`.
- *Honest-null:* `--` + `no energy logged today`.
- **2. Today's Average Energy**
- *Real:* `avg: 6.2` + `synced locally`.
- *Low-confidence:* `~6` + `estimated  low confidence`.
- *Honest-null:* `avg: --` + `log today to see this`.
- **3. Today's Log Count**

## Consent and Safety
- Energy Tracking names health category, source, freshness, confidence, retention, export, revoke, and delete before synced values or photo-derived reads are trusted.
- Energy Tracking keeps privacy-first language and SafetyResourceCard reachable for journal, mood, stress, sleep, energy, voice, and wellbeing-adjacent moments.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- Keep navigation targets aligned to `/wellbeing/energy`. Do not add alternate vanity routes.

## States
- **Default:** Fully populated screen for established premium user with real-time data.
- **Skeleton:** ArcGauge ghost track pulses. Chart lines draw as `--surface-3` blocks. CIA copy reads `CIA is reading your week - one moment.` Shimmer sweep 1.2s.
- **Empty (Day 1 / Cold Start):** Hero gauge shows `--` with ghosted track. Sparkline is a flat dashed purple line. History/trend sections replaced with constructive `EmptyState` components containing starter CTAs. The Quick Log card pulses subtly.
- **Error:** Specific error `ErrorState` blocks replace failed chart components (e.g., `could not load trends` + `retry` BtnSecondary). Log CTA submission failure flashes red and displays toast `could not log -- try again`. Never blames the user.
- **Success:** Log CTA flashes green (`BtnSuccess`) with `--glow-done` sweeping the Hero Card. ArcGauge re-sweeps to new value (520ms). Timeline chart updates with new point.
- **Offline:** `OfflineBanner` appears under TopBar: `offline - showing last sync 2h ago`. Quick Log CTA remains active; logs queue locally with a `queued` chip.
- **Disabled:** Rate-limiting disables Log CTA (40% opacity) and displays: `You logged recently. Next log available in Xm.`

## Motion
- **Screen Enter/Exit:** Standard iOS stack push/pop slide (280ms).
- **Hero Gauge & Charts:** `ArcGaugeDial` sweeps 0->value (520ms) using physical spring easing. `TrendChart` line draws left-to-right (1200ms). `ScatterPlot` dots stagger in (40ms delay). Correlation bars rise (60ms stagger).
- **Quick Log Slider:** Drag to adjust. Thumb scales 1.2x. Floating value bubble appears using tabular-nums. Haptic light impact on integer snaps.
- **Log CTA Success:** 600ms green glow flash, 520ms gauge re-sweep.
- **Glow Breathe:** The Hero `--glow-you` utilizes a continuous 4s ease-in-out "breathe" opacity shift to signify a live metric.
- **Reduced Motion (`prefers-reduced-motion`):** All chart draw-ins and scrubbing animations snap instantly (0ms). Glow breathe is static. Haptics remain unchanged.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/wellbeing/energy`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **AA+ Contrast:** Text strictly adheres to the paper-100/64/40% opacity tokens against warm dark surfaces (`--surface-2`, `.glass-card`).; **44px Targets:** All chips, the log slider thumb hitbox, and CTAs maintain a minimum 44x44px interactive area.; **Screen-reader Labels:** Glyph-only buttons in the `TopBar` have `aria-labels` (e.g., "Back", "Overflow settings").
