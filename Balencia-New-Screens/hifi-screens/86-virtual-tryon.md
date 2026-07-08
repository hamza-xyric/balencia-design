# 86-virtual-tryon - A+++ hi-fi mobile spec

## Header
- **Source ID:** 86
- **Source spec:** `Balencia-New-Screens/screens/86-virtual-tryon.md`
- **Evidence:** screens/86-virtual-tryon.md, Archive/2026-07-06/features.md, Archive/2026-07-06/routes.csv, canon/COMPACT-CANON.md, canon/COMPONENT-CATALOG.md
- **Route(s):** `/wellbeing/virtual-tryon`
- **Frame:** 390x844 native mobile
- **Priority:** converted with asset slots

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Virtual try-on lets a member upload or capture a photo, preview an AI-generated look, compare before/after, and delete both source and generated image data.
- **Premium Visual Director:** make Virtual try-on capture frame the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Virtual try-on names health category, source, freshness, confidence, retention, export, revoke, and delete before synced values or photo-derived reads are trusted.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+--------------------------------------+
| <  Virtual try-on             clock  |
+--------------------------------------+
| Consent for photos                   |
| +----------------------------------+ |
| | Photo use: preview only          | |
| | Retention: 30 days unless saved  | |
| | [Revoke access] [Delete all]     | |
| +----------------------------------+ |
|                                      |
| +----------------------------------+ |
| | SOURCE PHOTO       GENERATED LOOK| |
| | +------------+     +------------+| |
| | |  photo     | <-> |  preview   || |
| | +------------+     +------------+| |
| | via upload          AI render    | |
| | low-confidence if scan unclear   | |
| +----------------------------------+ |
|                                      |
| Upload -> safety scan -> render      |
| [===>-----------] step 2 of 4        |
|                                      |
| +----------------------------------+ |
| | CIA: this works with your saved  | |
| | color notes. Provenance: profile | |
| +----------------------------------+ |
|                                      |
| [Use camera] [Choose photo]          |
| [Generate preview]                   |
| Delete source photo                  |
+--------------------------------------+

Route handling: `/wellbeing/virtual-tryon`
```

## Focal Hierarchy
- **Dominant focal moment:** Virtual try-on capture frame; it should be visually singular, not one tile among many.
- **Secondary layer:** H1 with CIA only when the source supports a synthesized read.
- **Operational layer:** Consent headline, Consent body, Preview labels, CIA line.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*virtual*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar** - stacked title, back affordance, history glyph, and privacy overflow.
- **ConsentCard** - required photo data explanation with accept, revoke, and delete entry points.
- **Stepper** - upload, scan, prompt, render, review sequence with real progress labels.
- **FrostCard** - media stage around source and generated image previews.
- **ChipProvenance** - `via upload`, `AI render`, `saved preference`, and freshness labels.
- **CIAInsightCard** - optional explanation card with evidence chips and no medical or body-judgment language.
- **BtnPrimary / BtnSecondary / BtnGhost** - generate, choose/retake, and destructive-adjacent controls.
- **Sheet** - camera/source picker, privacy settings, destructive delete confirmation, and share warning.
- **ErrorState / SkeletonState / HonestNullState** - catalog states for generation, image load, and no-photo cases.
- **NEW: TryOnPreviewCanvas** - two-pane image scrubber with before/after reveal. Rationale: the catalog has image states but no AI before/after comparison control.

## Data Honesty
- **Photo source:** real = local upload or camera capture plus ChipProvenance; low-confidence = file type or safety scan uncertain; honest-null = no photo slot with upload options.
- **Generation status:** real = job id, step, and render timestamp; low-confidence = render confidence muted with reason; honest-null = no generation started.
- **Style signal:** real = saved preference, plan note, or manual prompt with provenance; low-confidence = single weak preference; honest-null = CIA says it needs a preference before giving styling guidance.
- **Retention state:** real = explicit deletion date; low-confidence = pending sync to deletion queue; honest-null = no stored photo data.
- **CIA recommendation:** real only after consent plus evidence; low-confidence when based on one preference; honest-null when image or preference consent is missing.

## Consent and Safety
- Virtual try-on names health category, source, freshness, confidence, retention, export, revoke, and delete before synced values or photo-derived reads are trusted.
- Virtual try-on treats media as consent-gated: no identifiable face, body, home, document, provider logo, or private text appears without explicit permission.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- Keep navigation targets aligned to `/wellbeing/virtual-tryon`. Do not add alternate vanity routes.

## States
- **Default:** consent accepted, preview stage ready, stepper idle, and clear generate/delete controls.
- **Skeleton:** source and preview slots shimmer with the same dimensions; no placeholder body image is invented.
- **Empty:** HonestNullState shows upload and camera choices, retention copy, and no CIA claim.
- **Error:** failed upload or render keeps the photo visible if safe, names the failed step, and offers retry or delete.
- **Success:** generated look lands with `--glow-done`, provenance chips, save/share/delete actions, and history handoff.
- **Disabled:** generate is 40% opacity with reason when photo consent, camera permission, connectivity, content safety, or entitlement is unavailable.

## Motion
- **Load:** ConsentCard appears first; preview stage rises 8px over 200ms after consent state is known.
- **Preview:** before/after scrubber tracks finger position; double tap resets split; pinch zoom is bounded inside each image pane.
- **Generation:** Stepper advances with labeled progress; if reduced-motion is enabled, progress jumps discretely without shimmer sweeps.
- **Press:** media controls scale to .98 for 150ms; destructive delete requires confirmation and no haptic until confirmed.
- **Reduced-motion:** disables glow breathing, scrubber flourish, and stepper shimmer while preserving clear state changes.

## Image Slots
- `HIFI-86-01` - content proof or instructional media slot; screen-specific; privacy-safe, non-diagnostic, no identifiable person. Prompt: Virtual try-on privacy-safe try-on imagery, Balencia warm-dark glass UI asset, privacy-safe, no brand logos, no readable UI text.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/wellbeing/virtual-tryon`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** paper text on `#0A0A0F` and `#211008` clears AA+; image overlays use scrims rather than text directly on busy pixels.; **Targets:** camera, upload, scrubber handle, delete, and share controls maintain 44px minimum hit areas.; **Screen readers:** generated image announces source, consent state, render confidence, and retention before actions.
