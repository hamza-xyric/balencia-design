# 52-stress-management - A+++ hi-fi mobile spec

## Header
- **Source ID:** 52
- **Source spec:** `Balencia-New-Screens/screens/52-stress-management.md`
- **Evidence:** screens/52-stress-management.md, work/briefs/52.md, work/drafts/52.md, Functional Content Brief (Batch 15)
- **Route(s):** `/wellbeing/stress`
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Provide a centralized, honest command center for stress.
- **Premium Visual Director:** make Stress management hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Stress management names health category, source, freshness, confidence, retention, export, revoke, and delete before synced values or photo-derived reads are trusted.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+--------------------------------------+ 844px
|    Stress management         Lv.5  | TopBar
+--------------------------------------+
|+------------------------------------+|
||  CURRENT STRESS LEVEL             || Hero Card
||       +--------+                  || (GlassCard)
||      |   3.2   | Mod               ||
||       +--------+                  ||
||  B: 2.1  S: 4.5  Beh: 3.0          ||
||  Mental capacity left today        ||
||  ###################  60%          ||
|+------------------------------------+|
|                                      |
|+------------------------------------+|
|| QUICK LOG                          || Quick Log
|| How are you feeling right now?     || (SolidCard)
|| oooooooooo  (Slider)               ||
|| [Work] [Time] [Fin] [Other...]     ||
|| +--------------------------------+ ||
|| | add a note                     | ||
|| +------------------------------  | ||
||           [ Log stress ]          ||
|+------------------------------------+|
|                                      |
|+------------------------------------+|
|| Work stress has been your top    || CIA Note
||trigger this week. A 5-min breathing|| (GlassCard)
||exercise after lunch could help.    ||
||      [ ask CIA ]   [ ignore ]      ||
|+------------------------------------+|
|                                      |
|+------------------------------------+|
|| STRESS TREND            [7d][14d]  || Trend Card
|| avg: 4.8        v12% vs last wk    || (SolidCard)
||                                ||
||         - - -                  ||
||                                ||
|+------------------------------------+|
|                                      |
|+------------------------------------+|
|| MENTAL RECOVERY      of 100        || Recovery
||     +-----+                        || (SolidCard)
||    |  72  | improving              ||
||     +-----+                        ||
|| Sleep: 78 ########                  ||
|| Emot:  68 #######                   ||
|+------------------------------------+|
|                                      |
|  RELIEF TOOLS                        |
| +------+ +------+ +------+           |
| |Breathe| |Med   | | Yoga | >        |
| +------+ +------+ +------+           |
|                                      |
| +----------------------------------+ |
| |  Today   CIA   Goals   Me        | |
| +----------------------------------+ |
+--------------------------------------+ 0px

Route handling: `/wellbeing/stress`
```

## Focal Hierarchy
- **Dominant focal moment:** Stress management hero; it should be visually singular, not one tile among many.
- **Secondary layer:** TopBar with CIA only when the source supports a synthesized read.
- **Operational layer:** Stress Hero, Quick Log, CIA Note, Stress Trend.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*management*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar** (Catalog) - Transparent transitioning to `.glass-pill` on scroll.
- **GlassCard** (Catalog) - `hero` variant for Stress Level.
- **SolidCard** (Catalog) - Used for Quick Log, Trend, and Recovery (data density).
- **CIAInsightCard** (Catalog) - For the AI coaching note.
- **ProgressRing** (Catalog) - For the composite stress dial and recovery ring.
- **ChargeMeter** (Catalog) - NEW alias mapping for Mental Capacity (Depletable capacity).
- **GlassPillInput** (Catalog) - For the notes field.
- **Slider** (Catalog) - For the 1-10 stress check-in.
- **ChipDomainTag** (Catalog) - For standard trigger selection.
- **ChipProvenance** (Catalog) - For "via WHOOP" and sync labels.
- **TrendChart** (Catalog) - `7d/14d/30d` variants.
- **CalendarStrip** (Catalog) - Used in High Motivation variant.
- **BtnPrimary / BtnSecondary / BtnGhost** (Catalog) - Standard interactions.
- **SafetyResourceCard** (Catalog) - Pinned in the overflow menu of the TopBar per Canon 8 (crisis/safety layer on wellbeing screens).

## Data Honesty
- *Every metric ships 3 states. No fabricated numbers.*
- **Metric 1: Composite Stress Score (1-10)**
- - **Real:** "3.2" + ChipProvenance "via WHOOP".
- - **Low-confidence:** "3.2" (64% opacity text) + "estimated  low confidence".
- - **Honest-null:** Center dial reads "-" with sub-copy "log your first check-in below".
- **Metric 2: Mental Capacity (%)**
- - **Real:** "60%" + ChipProvenance "derived today".
- - **Low-confidence:** "60%" (64% opacity text) + "estimated  low confidence".
- - **Honest-null:** Bar track is empty. Sub-copy: "restores after sleep".
- **Metric 3: WHOOP HRV (ms)**

## Consent and Safety
- Stress management names health category, source, freshness, confidence, retention, export, revoke, and delete before synced values or photo-derived reads are trusted.
- Stress management keeps privacy-first language and SafetyResourceCard reachable for journal, mood, stress, sleep, energy, voice, and wellbeing-adjacent moments.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- Keep navigation targets aligned to `/wellbeing/stress`. Do not add alternate vanity routes.

## States
- **Default:** Fully populated with real data and provenance chips.
- **Skeleton:** Shimmer blocks (`--surface-3` base) matching layout. Hero arc gauge sweeps a ghost line that morphs into the orange fill. Trend chart axis draws flat, then resolves into the curve.
- **Empty (Cold Start):** Hero gauge is ghosted. Quick Log card promoted. Trigger Analysis entirely omitted. Recovery ring ghosted. No fabricated zeros.
- **Error:** Localized per card. E.g., Biometric card shows "Could not load WHOOP data + retry". Failed log submission triggers a subtle red border flash on the CTA + ErrorState toast.
- **Success:** CTA flashes green glow (600ms). Card content crossfades, inputs clear, and the Hero gauge re-sweeps to the new score.
- **Disabled:** Quick Log CTA is disabled (40% opacity) immediately after logging, displaying the countdown timer.

## Motion
- **Draw-first choreography:** On load, the Hero `ProgressRing` sweeps from 0 to score (520ms). Quick Log and CIA note rise sequentially (staggered fade 150ms delay).
- **Charting:** Trend line draws itself left-to-right (1200ms). The dashed CIA projection draws *after* the actual line completes.
- **Easing:** Physical easing only (no linear).
- **Feedback:** 150-250ms scale/spring. Slider snapping fires light haptics. Trigger chip selection fires medium haptic.
- **Glow behavior:** Hero `glow-you` breathes subtly (4s ease). CIA note glows steady.
- **FAB Behavior:** Fades out and translates down (+20pt) when scrolling down; fades back in on scroll up.
- **Reduced-motion path:** All sweeping charts and glowing pulses revert to instant opacity fades. FAB movement is disabled (remains fixed).

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/wellbeing/stress`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **AA+ contrast:** Paper-100 (#FEFAF3) on `--surface-2` (#211008) and `--bg-base` (#0A0A0F) exceeds WCAG AA.; **Color-blind safe:** Trend direction relies on line style (solid vs dashed) and shape (), not just color.; **Targets:** All chips, sliders, and tabs respect 44px minimum touch targets.
