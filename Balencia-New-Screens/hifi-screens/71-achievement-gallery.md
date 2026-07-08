# 71-achievement-gallery - A+++ hi-fi mobile spec

## Header
- **Source ID:** 71
- **Source spec:** `Balencia-New-Screens/screens/71-achievement-gallery.md`
- **Evidence:** screens/71-achievement-gallery.md, work/briefs/71.md, work/drafts/71.md, Functional Content Brief (Achievement Gallery)
- **Route(s):** `/achievements`
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: A visual trophy room displaying all badges and milestones earned across all 9 life domains.
- **Premium Visual Director:** make Achievement Gallery hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Achievement Gallery uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
[ 71-achievement-gallery  390x844 ]
    +-----------------------------------------+
    |                        Achievements    | <- TopBar
    +-----------------------------------------+
    | +-------------------------------------+ |
    | |  o 39%     +3 earned this mo.      | | <- Hero GlassCard
    | |  47/120   12 total                  | |
    | |  ---------------------------------  | |
    | |    Your streak starts today - 0 | |
    | +-------------------------------------+ |
    | +-------------------------------------+ |
    | |  Fitness [12]  Nutrition [8]  +More | | <- Coverage Strip
    | +-------------------------------------+ |
    |                                         |
    |  [ All  ]  [ Fit ]  [ Nutri ]  [ $$$ ] | <- Filter Chips
    | --------------------------------------| |
    |  +----------+  +----------+            |
    |  |  [Badge] |  |  [Badge] |            |
    |  |          |  |          |            | <- Grid Body
    |  |  Earned  |  | 15 of 30 |            |
    |  +----------+  +----------+            |
    |  +----------+  +----------+            |
    |  |  [Badge] |  |  [Badge] |            |
    |  +----------+  +----------+            |
    +-----------------------------------------+
    |      [ Today ] [ CIA ] [ Goals ] [Me]   | <- GlassNavBar
    +-----------------------------------------+

Route handling: `/achievements`
```

## Focal Hierarchy
- **Dominant focal moment:** Achievement Gallery hero; it should be visually singular, not one tile among many.
- **Secondary layer:** TopBar with CIA only when the source supports a synthesized read.
- **Operational layer:** Summary Hero Region, Domain Coverage Strip, Domain Filter Chips, Achievement Grid.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*gallery*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar**: Transparent/scroll variant.
- **GlassCard**: Hero variant for the summary region.
- **GlassStatCard**: Used for the "Earned This Month" KPI inside the hero card.
- **ProgressRing**: Used for the total completion visual.
- **MomentumBar**: Used for the current streak status.
- **SectionHeader**: Overline labels for grid sections.
- **ChipDomainTag**: Used for filter chips.
- **BadgeTile**: Achievement cell (earned, locked, to-discover).
- **Sheet**: Bottom sheet for achievement details.
- **ListRow**: For formatting unlock requirements in the detail sheet.
- **SolidCard**: For the domain coverage strip.
- **GlassNavBar**: Global navigation.
- **NEW: CoverageStripRow**: A `SolidCard` containing `ChipDomainTag`s that feature a 2px micro-arc outline tracking domain density. *Rationale:* The catalog lacks a dedicated component for horizontally surfacing categorical density arcs.
- **Correction (CIA):** Per the critical brief flag, all purple UI elements (specifically the proposed "Ask CIA" button in the Detail Sheet) are **omitted entirely** to preserve the 60/30/10 register of this pure gamification screen. Purple `--glow-cia` is removed from this surface.

## Data Honesty
- **Total Earned / Completion %:**
- - *Real:* `47 / 120` (`39%`) + chip text `balencia summary`.
- - *Low-confidence:* `47 / 120` rendered at 64% opacity + chip text `estimated  low confidence`.
- - *Honest-null:* Ghosted ring track visible with `0` in center + text `Not enough data yet`.
- **Earned This Month & Delta:**
- - *Real:* `12` (`+3`) + chip text `balencia summary`.
- - *Low-confidence:* `12` rendered at 64% opacity + `estimated  low confidence`.
- - *Honest-null:* `-` + `Not enough data yet`.
- **Streak Count / Days to Next:**
- - *Real:* `[X] days to the 60-day legend` + chip text `synced today`.

## Consent and Safety
- Achievement Gallery uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- Keep navigation targets aligned to `/achievements`. Do not add alternate vanity routes.

## States
- **Default:** Hero data drawn, grid loaded, earned badges sorted by date, in-progress by %.
- **Skeleton:** Depth-preserving shimmer blocks matching layout. Hero ring shows axis/ghost track, grid tiles show ghost circles.
- **Empty (First-use):** Gauge at 0%, KPI shows 0, streak reads `Your streak starts today`. All tiles are "to discover" (ghosted rarity-outlined silhouettes, not padlocks) sorted by closeness-to-unlock.
- **Empty (Filtered):** Centered domain icon with text: `No [domain] achievements yet`.
- **Error:** Graceful degradation prioritizing cached data. Error toasts appear warm/non-alarming (`Couldn't load summary.`, `Check your connection and try again`). Badge image failure falls back to a domain-colored circle.
- **Success (New Badge Arrival):** Grid tile scales 0.8 -> 1.0 with particle burst colored identically to the badge's rarity tier (restrained, no generic gold flashing).
- **Offline:** `OfflineBanner` (`glass-pill`) below filter chips reads `You're offline - showing cached achievements`. Pull-to-refresh visibly disabled.

## Motion
- **Physical easing:** `cubic-bezier(0.32, 0.72, 0, 1)` for all UI framing and sheets.
- **Feedback (150-250ms):** Filter chips crossfade the grid in 150ms. Cards scale to `.98` on press.
- **Glow behavior:** Earned BadgeTiles have a steady, soft `--glow-done` breathe (4s ease loop). In-progress tiles feature a `--glow-you` breathe.
- **Draw-First Choreography:** On mount, the Hero completion ring draws 0 -> final `%` while the center number counts up. Grid tiles cascade in with a staggered fade-up; in-progress micro-arcs fill *after* their host tile lands.
- **Haptics:** Light impact on card/chip press. Medium impact on "go to [domain]" CTA press.
- **Reduced-motion path:** Particle bursts and hero count-ups disabled (data simply fades in). Glow breathe static.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/achievements`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **AA+ contrast pairs:** `--paper-100` (#FEFAF3) over `--bg-base` (#0A0A0F) and `--surface-2` (#211008). Paper-64% used strictly for secondary metadata.; **44px targets:** All `ChipDomainTag` filters and `BadgeTile` cards meet the 44px minimum tap target (grid spacing provides ample separation).; **Screen-reader labels:** The Rarity micro-arc and the Hero ProgressRing center percentage are grouped with explicit `aria-label` text (e.g., "47 out of 120 achievements earned. 39 percent complete.") so glyph-only data is legible to VoiceOver/TalkBack.
