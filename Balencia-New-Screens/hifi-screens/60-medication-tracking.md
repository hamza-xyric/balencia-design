# 60-medication-tracking - A+++ hi-fi mobile spec

## Header
- **Source ID:** 60
- **Source spec:** `Balencia-New-Screens/screens/60-medication-tracking.md`
- **Evidence:** screens/60-medication-tracking.md, work/briefs/60.md, work/drafts/60.md, Functional Content Brief (Medications v1)
- **Route(s):** No live app route; source-only medication surface.
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Acts as the user's daily medication management hub.
- **Premium Visual Director:** make Medication tracking hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Medication tracking names health category, source, freshness, confidence, retention, export, revoke, and delete before synced values or photo-derived reads are trusted.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
[  ]  Medication tracking  [  ]
      ----------------------------------
      .  (Warm orange atmosphere)   .  .
      .                             .  .
      +-----------------------------+   .
      |                             .   .
      |        (96px Ring)          .   .
      |           75%               .   .
      |    3 of 4 doses today       .   .
      |                             .   .
      +-----------------------------+   .
      .                             .   .
      +-----------------------------+   .
      |  o CIA Coach                .   .
      |  today's a *fresh* start.   .   .
      |  [Learn how CIA helps]  >   .   .
      +-----------------------------+   .
      .                             .   .
      [   consult your doctor before changing dosages ]
      .                             .   .
      MORNING                       .   .
      | o [x] Vitamin D      500mg  .   .
      | |       taken at 08:12 AM   .   .
      | o [x] Magnesium      250mg  .   .
      | |       taken at 08:12 AM   .   .
      AFTERNOON                     .   .
      | o [ ] Adderall XR    10mg   .   .
      | |       overdue  take when .   .
      EVENING                       .   .
      | o [ ] Melatonin      3mg    .   .
      .                             .   .
      +-----------------------------+   .
      | All medications             .   .
      |  Vitamin D    [] 92%   .   .
      |  Magnesium    [] 88%   .   .
      |  Adderall XR  [] 95%   .   .
      +-----------------------------+   .
      .                             .   .
      +-----------------------------+   .
      | Adherence history           .   .
      |                      .   .
      |                      .   .
      |                      .   .
      |                      .   .
      | start tracking to build...  .   .
      +-----------------------------+   .
      .                             .   .
      . your medication data is en. .
      .                             .   .
      +-----------------------------+   .
      |  Today   CIA   Goals   Me   |   |
      +-----------------------------+   |
                              ( + ) --+

Route handling: No live app route; source-only medication surface.
```

## Focal Hierarchy
- **Dominant focal moment:** Medication tracking hero; it should be visually singular, not one tile among many.
- **Secondary layer:** TopBar with CIA only when the source supports a synthesized read.
- **Operational layer:** Hero Card, CIA Insight Card, Safety ListRow, Timeline Agenda.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*tracking*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar** (Catalog): Back chevron, title, 1 trailing glyph.
- **GlassStatCard** (Catalog): Hero variant for daily completion metric.
- **CIAInsightCard** (Catalog): Rendered behind PaywallLock for free tier.
- **ListRow** (Catalog): Used for safety banner.
- **NEW: TimelineAgenda** (Replaces flat checklist per brief correction): Renders temporal medications as a continuous vertical stroke. Drawing the line top-to-bottom fulfills the "draw, don't fade" motion intent.
- **SolidCard** (Catalog): Holds medication roster and heatmap for data-density.
- **ProgressRing** (Catalog): 96px ring inside the hero card.
- **TrendChart** (Catalog): Sparkline variant used inline in medication list.
- **NEW: AdherenceHeatmap** (Calendar variant): 4x7 grid of rounded squares mapping daily completion. Needs a custom implementation to meet the 4-week historical view.
- **PaywallLock** (Catalog): Used on the CIA card for free users.
- **GlassNavBar** (Catalog): Global navigation.
- **FABQuickLog** (Catalog): Glyph updated to `+` for Add Medication.

## Data Honesty
- *Every metric ships 3 states.*
- **Metric 1: Daily Adherence Rate (Hero Ring)**
- **Real:** `75%` + `3 of 4 doses today` (ChipProvenance: `you logged`).
- **Low-confidence:** N/A (Local dose toggles are explicit logs).
- **Honest-null:** `0%` (Ring displays ghosted track). Copy: "no medications tracked yet. add your first one below."
- **Metric 2: Medication Roster Adherence (Sparklines)**
- **Real:** `[] 92%` (ChipProvenance: `you logged`).
- **Low-confidence:** `[] estimated  low confidence` (Data synced from secondary pharmacy API with delay).
- **Honest-null:** Empty sparkline track. Copy: "not enough data yet - 3 more days".
- **Metric 3: 4-Week History (Heatmap)**

## Consent and Safety
- Medication tracking names health category, source, freshness, confidence, retention, export, revoke, and delete before synced values or photo-derived reads are trusted.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- This is documented as a modal, overlay, utility, or source-only surface; do not invent a live route.

## States
- **Default:** 75% complete, afternoon dose pending.
- **Skeleton:** Depth-preserving layout (rings, cells, outlines). Charts load as axes + ghost lines that draw into place. Never blank discs.
- **Empty (Cold-start):** FAB-led. Hero ring 0%. CIA note: "tracking medications helps CIA understand your wellbeing better." Schedule, roster, and heatmap hidden. Privacy notice remains.
- **Error (Partial failure):** Cached data shown. If heatmap fails: explicit "couldn't load - tap to retry" copy inside the SolidCard without breaking the rest of the screen.
- **Success (100%):** Hero ring fills with `--glow-done`. Continuous-stroke line motif completes. CIA shifts to success copy.
- **Disabled:** BtnPrimary "Save" inside Add Med modal remains disabled until required fields are met.

## Motion
- **Easing & Feedback:** Physical easing (spring/cubic-bezier). Feedback animations map to 150-250ms range.
- **Glow behavior:** Hero card glows softly. When 100% is reached, glow color crossfades to green over 400ms.
- **Drawing the timeline:** As the day progresses or doses are taken, the vertical path "draws" downward using a sweep animation.
- **Haptics:** Light haptic on dose toggle.
- **Reduced-motion path:** Glows breathe statically. Timeline draws instantly. Continuous strokes fade in without path-drawing.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: No live app route; source-only medication surface..
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** Paper-100 (#FEFAF3) on `--surface-2` (#211008) and `--bg-base` (#0A0A0F) exceeds AA+ (16:1).; **Targets:** All timeline checkboxes and medication list rows meet 44px min target height.; **Screen-reader labels:** Timeline dots have aria-labels ("Take Magnesium, 250mg, due 8:00 PM. Overdue."). Plus glyph in header is labeled "Add medication".
