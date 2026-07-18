# 06-guest-mode-preview - A+++ hi-fi mobile spec

## Header
- **Source ID:** 06
- **Source spec:** `Balencia-New-Screens/screens/06-guest-mode-preview.md`
- **Evidence:** screens/06-guest-mode-preview.md, work/briefs/06.md, work/drafts/06.md, Balencia Glass Canon (glass-dark v1), Component Catalog (v1), Functional Brief
- **Route(s):** No live route; pre-auth guest preview handoff from the account entry flow.
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: To answer the pre-signup hesitation "what would this actually look like for me?" by letting a hesitant visitor stand up a personalized, *illustrative* preview with almost no friction - a name and 1-3 life areas.
- **Premium Visual Director:** make Guest Mode Preview hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Guest Mode Preview keeps required consent unchecked until explicit action, optional consent skippable, and route handoff limited to No live route; pre-auth guest preview handoff from the account entry flow..
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
[ Screen atmosphere: warm-dark base, orange top glow (CANON 1) + purple pool
  behind the radar at ~45% height (CANON 3 glow-cia), 3-4% grain ]
+-------------------------------------------------+
|                                                 |  -- TopBar, transparent
|                                                   |
|                    (  )                         |  -- Balencia mark, 28px
|                                                   |
|              take a *look* around                |  -- Display 34, 1 emphasis
|        tell us your name and pick a few          |  -- Body-light 16
|             areas you care about.                |
|                                                   |
|  +---------------------------------------------+ |
|  |  your name                                  | |  -- GlassPillInput, text
|  +---------------------------------------------+ |
|                                                   |
|        +-------------------------------+         |
|        |         ConstellationRadar   |         |  -- FrostCard r40, glow-cia
|        |          (domain-tinted       |         |     mesh; empty = quiet dot
|        |        star nodes)            |         |
|        |        [demo  illustrative]    |         |  -- ChipProvenance, forced
|        +-------------------------------+         |     once 1 node lights
|                                                   |
|  life areas                        (0 selected)  |  -- Overline (caps via CSS)
|  +---------+  +---------+  +---------+           |
|  | Fitness |  |Nutrition|  | Mental  |           |  -- ChipDomainTag x9
|  +---------+  +---------+  +---------+           |     rest = domain 16% tint
|  +---------+  +---------+  +---------+           |     (44px touch target
|  | Finance |  | Career  |  |Relation-|           |      wraps 36px visual pill)
|  |         |  |         |  | ships   |           |
|  +---------+  +---------+  +---------+           |
|  +---------+  +---------+  +---------+           |
|  |Spiritua-|  |Learning |  |Creativ- |           |
|  |lity     |  |         |  |ity      |           |
|  +---------+  +---------+  +---------+           |
|                                                   |
|  +---------------------------------------------+ |
|  |                  Explore                   | |  -- BtnPrimary, 40% opacity
|  +---------------------------------------------+ |     until valid (see 9)
|                                                   |
|         Already have an account? Sign in         |  -- BtnGhost
+-------------------------------------------------+

Route handling: No live route; pre-auth guest preview handoff from the account entry flow.
```

## Focal Hierarchy
- **Dominant focal moment:** Guest Mode Preview hero; it should be visually singular, not one tile among many.
- **Secondary layer:** Top navigation - transparent back chevron . with CIA only when the source supports a synthesized read.
- **Operational layer:** Brand anchor - Balencia symbol mark, centered, paper-100., Contextual copy - Display heading + Body-light sub-copy., Data entry - GlassPillInput for name capture., Primary action area - BtnPrimary + BtnGhost escape hatch..
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*preview*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar** (transparent variant) - back chevron only, no trailing glyphs.
- **GlassPillInput** (text variant) - name capture; focus = 1px orange border + subtle orange glow per catalog.
- **FrostCard** - substrate for the radar; radius 40 (`--r-2xl`, hero-tier per CANON 6), blur 48 / sat 130% / border `.16` / inset top-light `.40`. Legal usage per catalog ("never used on data-dense screens") since this surface is explicitly non-data.
- **NEW: ConstellationRadar** - illustrative, non-metric hero visual. *Purpose:* give a hesitant guest a tangible cross-pillar "map" without ever implying it was measured. *Anatomy:* FrostCard substrate + up to 9 axis points (one per life domain, tinted in each domain's catalog color per CANON 4) arranged in a circle + connecting mesh rendered in `glow-cia` purple at reduced opacity (the mesh, not the nodes, carries the "AI/projection" meaning) + center anchor point. *Variants:* `empty` (0 nodes, single quiet glyph) / `building` (1-3 domain-colored nodes lit as chips are picked, mesh animates in per node). *State rule:* once 1 node is lit it carries a persistent `ChipProvenance` reading `demo  illustrative` - never omitted, so the preview can never be mistaken for a real Life Power reading. *Rationale for NEW:* the catalog has no immersive, non-data "hero" visual for onboarding; `TrendChart`'s honesty discipline (CANON 7) is reused, not its line-chart geometry. Flag for promotion into the catalog if reused by another onboarding screen.
- **ChipDomainTag** - repurposed here as a multi-select control (catalog defines it as a display tag; this screen extends it with selection states, see 6 correction). 3x3 grid, all 9 canon domains, 44px touch target wrapping a ~36px visual pill.
- **BtnPrimary** - "Explore." One per composition. Disabled state per catalog (40% opacity) is the default/cold-start state.
- **BtnGhost** - "Sign in" escape hatch, 44px target.
- **Not applicable - ConsentCard:** this screen collects only a display name and non-health category preferences, not health data, photos, voice, or third-party sourced data - CANON 8's consent trigger doesn't fire here. Justified omission, not an oversight.
- **Not applicable - GlassNavBar / FABQuickLog:** pre-Today auth flow; both are Today-tab-only per catalog.

## Data Honesty
- This screen carries no real metric - nothing has been measured or synced yet, so it maps onto the honesty triple as a fully justified non-standard case rather than forced compliance:
- **Real:** not applicable. Rationale: the honesty invariant governs metrics that claim measurement; this screen precedes any data collection entirely (no account, no logged data, no connected source).
- **Low-confidence:** not applicable. Rationale: nothing is being estimated or projected from signal - the radar's nodes are placeholder amplitude tied only to which chips are tapped, not a computed confidence value.
- **Honest-null:** the default and *only* live state. Radar renders empty (quiet glyph, no nodes) until 1 domain is selected. Empty copy: "pick a few areas to see your map."
- **Illustrative-preview guard (screen-specific addition to the honesty pattern):** once chips are selected and nodes light up, the radar is not a null state anymore visually - so it must carry an explicit `ChipProvenance` reading `demo  illustrative` at all times from first node onward. This is the mechanism that stops a populated, glowing chart from silently reading as a real Life Power visualization. Never omit this chip once any node is lit.

## Consent and Safety
- Guest Mode Preview keeps required consent unchecked until explicit action, optional consent skippable, and route handoff limited to No live route; pre-auth guest preview handoff from the account entry flow..
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- This is documented as a modal, overlay, utility, or source-only surface; do not invent a live route.

## States
- **Default (cold-start):** empty name field, all 9 chips unselected, radar empty, "Explore" at 40% opacity, non-interactive.
- **Partial validation:** name entered, 0 chips selected (or vice versa) - CTA stays disabled. Both a name (1 character) and 1 domain are required.
- **Valid:** CTA reaches full opacity, interactive, once both conditions are met.
- **Cap-reached error:** tapping a 4th chip triggers a 150ms shake on the tapped chip + toast "pick up to 3 areas." The chip does not select; the other 3 stay as selected.
- **Loading:** BtnPrimary label swaps to spinner, width locked - *correction:* the draft additionally swapped the label to literal text "Loading," which contradicts the catalog's BtnPrimary loading spec (label->spinner only). Removed the redundant text.
- **Network/init failure:** quiet `ErrorState` banner surfaces above the CTA - glyph + plain-language Body line ("couldn't start your preview - check your connection") + `BtnSecondary` "retry." *Correction:* the draft used a blocking toast with CTA-text mutation; aligned to the catalog's `ErrorState` component instead, which is the canonical quiet-failure pattern (never blames the user, never a raw error code).
- **Success / handoff:** entry form crossfades out (opacity 1->0) while the Guest Demo Session (Today tab, guest-flagged) crossfades in, seeded per 11.
- **Gate coverage lock:** Default, Skeleton, Empty, Error, Success, and Disabled states are explicitly covered for implementation; any state with no visible UI is marked not applicable with rationale rather than omitted.

## Motion
- **Form mount:** staggered fade + translateY (12->0px), 200ms stagger: back chevron -> mark -> heading -> sub-copy -> input -> radar -> chip grid -> CTA -> ghost link.
- **Chip select:** spring scale oscillation (1 -> 1.05 -> 1), bg/border crossfade from rest-tint to selected-tint over ~150ms.
- **Chip deselect:** spring scale (1 -> 0.95 -> 1), reverse crossfade.
- **Radar reaction:** on each selection, the corresponding domain node draws in via continuous-stroke path (500ms ease-out, domain color); the connecting mesh (purple, `glow-cia`) redraws to include the new node.
- **Radar ambient:** `glow-cia` breathes on the mesh, opacity 50%<->70%, 4s ease-in-out infinite - the screen's one "breathing hero glow" per CANON 6.
- **Haptics:** light selection tick on chip tap; medium success tap on CTA press.
- **Reduced-motion path:** all translateY/scale oscillations become instant opacity crossfades; the radar's continuous-stroke draw becomes an instant reveal; the breathing glow becomes a static mid-opacity glow (no infinite loop).

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: No live route; pre-auth guest preview handoff from the account entry flow..
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast - *correction applied, both directions:*** the draft asserted "5.2:1" for the Explore button (paper-50 `#FDFDFB` on burnt orange `#FF5E00`) without showing real math. Computed against WCAG relative luminance, the actual ratio is **3.0:1** - it clears the 3:1 floor for large-scale/bold text and for non-text UI-component boundaries, but falls short of the 4.5:1 threshold that applies to the button's normal-weight 16px label text. This is an inherited property of the canon-wide `BtnPrimary` token (orange fill + paper-50 label used across every screen), not something this single spec can silently redesign - flagging it honestly here as accessibility debt rather than asserting false compliance. Mitigations to evaluate at the token level: bump CTA label to 18px+ (crosses into WCAG large-text territory) or accept as a documented brand exception given short, high-legibility single-word labels at 52px height. For the ghost link: orange `#FF5E00` label on `--surface-1` `#140A05` computes to **6.4:1**, comfortably clearing 4.5:1 (the draft's "4.5:1" claim understated this).; **Touch targets:** the visual chip is ~36px tall; each sits inside a 44px invisible touch container (padding, not visual bloat) to meet the iOS HIG / WCAG 44px floor without disrupting the 3x3 grid's density. Grid math at ~24px side margins and 12px gutters yields chip cells 104-110px wide - comfortable headroom for the 44px target in both axes.; **Color independence:** domain identity never depends on color alone - every `ChipDomainTag` and every radar node pairs its color with a distinct icon glyph and a text label, so a colorblind user can distinguish all 9 domains without relying on hue.
