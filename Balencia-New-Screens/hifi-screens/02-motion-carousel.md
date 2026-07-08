# 02-motion-carousel - A+++ hi-fi mobile spec

## Header
- **Source ID:** 02
- **Source spec:** `Balencia-New-Screens/screens/02-motion-carousel.md`
- **Evidence:** screens/02-motion-carousel.md, work/briefs/02.md, work/drafts/02.md, app_design 3/02-motion-carousel.md plus ascii_wireframes/02-motion-carousel.md.
- **Route(s):** no live route; pre-auth brand carousel between Splash [01] and Welcome sign-up [03].
- **Frame:** 390x844 native mobile
- **Priority:** converted with asset slots

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Balencia's four-panel carousel is the 5-10 second brand hook before authentication.
- **Premium Visual Director:** make brand story carousel the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Motion carousel treats media as consent-gated: no identifiable face, body, home, document, provider logo, or private text appears without explicit permission.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+--------------------------------------+
| Status bar                            |
+--------------------------------------+
|                                skip  |
|                                      |
|        PANEL 1 motion stage          |
|     *    o       life dots       *   |
|        \   \   /   /                 |
|          \  (hub)  /                 |
|     o ---- continuous stroke ---- o  |
|                                      |
|        One life, not modules.        |
|        Everything connects. Finally. |
|                                      |
|              [====]  o  o  o         |
|                                      |
|  +--------------------------------+  |
|  |              next              |  |
|  +--------------------------------+  |
|                                      |
| Home indicator                       |
+--------------------------------------+
| Panel 2: Meet CIA, your coach.       |
| Panel 3: Everything connects.        |
| Panel 4: Your life, gamified.        |
+--------------------------------------+

Route handling: no live route; pre-auth brand carousel between Splash [01] and Welcome sign-up [03].
```

## Focal Hierarchy
- **Dominant focal moment:** brand story carousel; it should be visually singular, not one tile among many.
- **Secondary layer:** Motion stage, 60 percent of the screen height, no card frame. with CIA only when the source supports a synthesized read.
- **Operational layer:** Panel headline and subtext, centered and limited to two lines., Pagination dots with current index announced as "Slide X of 4.", ASCII wireframe :, Panel 1.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*carousel*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **BtnPrimary** - final forward action; orange fill, locked width, loading spinner if navigation takes longer than 400ms.
- **BtnGhost** - `skip`, text-only but with a 44px hit area and visible focus ring.
- **ProgressRing** - panel 4 XP ring; green completion dots only after earned milestones.
- **CIAInsightCard** - panel 3 mini insight surface, purple-tinted only because it is coach synthesis.
- **ChipDomainTag** - panel 1 and panel 4 domain labels, used as tiny identity marks rather than chrome.
- **SkeletonState / ErrorState / HonestNullState** - adapted for static assets and animation bundles.
- **NEW: MotionStage** - full-bleed animation viewport; needed because this pre-auth brand surface intentionally avoids cards around the hero art.

## Data Honesty
- **Static brand copy:** real = approved carousel copy from source; low-confidence does not apply to copy and is replaced by asset provenance; honest-null = animation keyframe fallback with the same headline.
- **Animation assets:** real = bundled Rive or Lottie asset with asset-version ChipProvenance; low-confidence = static keyframe if playback support is uncertain; honest-null = no motion file, but the authored keyframe and copy still render.
- **Panel 3 insight:** real = demo insight with `demo` provenance chip, never shown as personal data; low-confidence = label as "example pattern"; honest-null = omit the insight card rather than invent a personalized correlation.
- **Panel 4 XP:** real = demo XP counter labeled as sample; low-confidence = no count-up, only ring outline; honest-null = quest card says "XP unlocks after sign-up."

## Consent and Safety
- Motion carousel treats media as consent-gated: no identifiable face, body, home, document, provider logo, or private text appears without explicit permission.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- This is documented as a modal, overlay, utility, or source-only surface; do not invent a live route.

## States
- **Default:** four panels page horizontally, panel copy and motion are complete, and the current slide is announced.
- **Skeleton:** motion stage shows warm shimmer geometry, not a blank gray box; CTA is Disabled until the first panel can be read.
- **Empty:** missing animation bundle keeps the static keyframe and copy visible; this is an asset empty state, not a user-data empty state.
- **Error:** ErrorState appears only after repeated asset failure; `skip` and `Get started` remain usable.
- **Success:** final CTA press crossfades the CTA glow to `--glow-done` before pushing [03].
- **Disabled:** CTA is disabled only during navigation handoff; screen-reader reason says "Opening sign-up."

## Motion
- **Panel 1:** continuous stroke draws through nine domain dots over 1200ms, then rests with a subtle pulse.
- **Panel 2:** CIA presence blooms from warm purple, breathes slowly, and never looks robotic.
- **Panel 3:** correlation line pulses once, then the CIAInsightCard fades up with evidence chips.
- **Panel 4:** XP ProgressRing fills from zero to sample progress, then the quest card settles under it.
- **Pager:** swipe follows native paging physics; CTA advances one panel at a time.
- **Reduced-motion:** disables stroke draw, bloom, pulse, and XP count-up; each panel loads as a final still with opacity-only transitions.

## Image Slots
- `HIFI-02-01` - above-fold brand motion area; screen-specific; premium warm-dark product placeholder. Prompt: Motion carousel brand-motion frames, Balencia warm-dark glass UI asset, privacy-safe, no brand logos, no readable UI text.

## Implementation Notes
- Route header must stay aligned with the repaired source: no live route; pre-auth brand carousel between Splash [01] and Welcome sign-up [03]..
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** paper text on `#0A0A0F` and `#211008` meets AA+; inactive pagination is decorative and paired with the slide announcement.; **Targets:** `skip`, CTA, and pager affordances maintain 44px touch targets.; **Screen readers:** each panel has a single summary; animation internals are not read as separate noise.
