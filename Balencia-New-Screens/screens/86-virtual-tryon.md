# 86-virtual-tryon - hi-fi glass spec

### 1. Header
- **ID:** 86
- **Name:** Virtual try-on
- **Route(s) covered:** /wellbeing/virtual-tryon
- **Tab:** Wellbeing
- **Source:** Archive/2026-07-06/features.md, Archive/2026-07-06/routes.csv, canon/COMPACT-CANON.md, canon/COMPONENT-CATALOG.md
- **Batch:** 17

### 2. Purpose
Virtual try-on lets a member upload or capture a photo, preview an AI-generated look, compare before/after, and delete both source and generated image data. It is a photo-consent surface first and a styling tool second: the screen must make retention, provenance, confidence, and revoke controls visible before the user creates an image.

### 3. Entry & exit
- **Entry paths:** Wellbeing hub card, Today recommendation, profile/body-image utility link, generated-look history empty state, and the direct live route /wellbeing/virtual-tryon.
- **Primary exit:** Back returns to the Wellbeing stack or previous recommendation surface without losing an in-progress upload draft.
- **Action exits:** `Generate preview` starts the stepper; `Use camera` opens the native capture sheet; `Open history` routes to 87; `Delete photo data` opens a destructive confirmation sheet; `Ask CIA why this look` opens the coach with image metadata only after consent.
- **Failure exit:** Upload, generation, or consent failure keeps the last safe state visible and offers retry, delete, or System states [98] when the route cannot render.

### 4. Layout anatomy
**Regions, top to bottom:**
1. **TopBar** with back, title, and overflow actions for history and privacy.
2. **ConsentCard** explaining photo use, retention, generated output, revoke, and delete.
3. **Try-on preview stage** with source photo slot, generated look slot, before/after scrubber, and ChipProvenance on each image.
4. **Generation Stepper** for upload, safety scan, style prompt, render, and review.
5. **CIAInsightCard** that explains styling guidance only when image consent and at least one preference signal exist.
6. **Control strip** for retake, choose photo, generate, save, share, retry, and delete.
7. **Safe footer** with privacy copy and no bottom-tab chrome while generation is active.

**ASCII wireframe (390x844):**
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
```

### 5. Components
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

### 6. Visual treatment
- **Atmosphere:** `--bg-base #0A0A0F` with warm top radial glow, 3-4% grain, and a restrained purple pool only behind the CIA card.
- **Glass tiering:** Consent and preview stage use FrostCard/GlassCard; generation logs and saved prompts use SolidCard on `--surface-2 #211008`.
- **Semantic glows:** Consent card uses no glow; active upload and preview controls use `--glow-you #FF5E00`; completed render and saved look use `--glow-done #34A853`; CIA guidance uses `--glow-cia #7F24FF`.
- **Type:** Neue Montreal for all UI; the hero line may read `Try a *look* safely`, with the italic word set in Tiempos.
- **60/30/10:** orange = member action, green = saved/completed render, purple = AI interpretation. Skin, outfit, or body imagery never becomes chrome color.

### 7. Content & copy
- **H1:** Try a *look* safely
- **Consent headline:** Photos are used to generate this preview only.
- **Consent body:** You can revoke camera access or delete source and generated images at any time.
- **Preview labels:** Source photo; generated look; safety scan; render confidence.
- **CIA line:** CIA can explain the look using your saved color notes and style preferences after consent.
- **Primary CTA:** Generate preview
- **Secondary CTAs:** Use camera; Choose photo; Open history; Delete source photo
- **Empty copy:** Add a photo when you are ready. Nothing is generated until you approve photo use.
- **Error copy:** This image could not be processed. Keep your photo, retry, or delete it now.
- **Share warning:** Shared try-on images leave Balencia protection once exported.

### 8. Data & honesty states
- **Photo source:** real = local upload or camera capture plus ChipProvenance; low-confidence = file type or safety scan uncertain; honest-null = no photo slot with upload options.
- **Generation status:** real = job id, step, and render timestamp; low-confidence = render confidence muted with reason; honest-null = no generation started.
- **Style signal:** real = saved preference, plan note, or manual prompt with provenance; low-confidence = single weak preference; honest-null = CIA says it needs a preference before giving styling guidance.
- **Retention state:** real = explicit deletion date; low-confidence = pending sync to deletion queue; honest-null = no stored photo data.
- **CIA recommendation:** real only after consent plus evidence; low-confidence when based on one preference; honest-null when image or preference consent is missing.

### 9. All states
- **Default:** consent accepted, preview stage ready, stepper idle, and clear generate/delete controls.
- **Skeleton:** source and preview slots shimmer with the same dimensions; no placeholder body image is invented.
- **Empty:** HonestNullState shows upload and camera choices, retention copy, and no CIA claim.
- **Error:** failed upload or render keeps the photo visible if safe, names the failed step, and offers retry or delete.
- **Success:** generated look lands with `--glow-done`, provenance chips, save/share/delete actions, and history handoff.
- **Disabled:** generate is 40% opacity with reason when photo consent, camera permission, connectivity, content safety, or entitlement is unavailable.

### 10. Motion & interaction
- **Load:** ConsentCard appears first; preview stage rises 8px over 200ms after consent state is known.
- **Preview:** before/after scrubber tracks finger position; double tap resets split; pinch zoom is bounded inside each image pane.
- **Generation:** Stepper advances with labeled progress; if reduced-motion is enabled, progress jumps discretely without shimmer sweeps.
- **Press:** media controls scale to .98 for 150ms; destructive delete requires confirmation and no haptic until confirmed.
- **Reduced-motion:** disables glow breathing, scrubber flourish, and stepper shimmer while preserving clear state changes.

### 11. Motivation-tier adaptation
- **Low:** show consent, one upload choice, and one generate button; hide style prompt tuning and share.
- **Medium:** default preview, stepper, CIA evidence, save/share/delete, and history link.
- **High:** add prompt history, side-by-side comparison metadata, retention log, and render confidence details.

### 12. Accessibility
- **Contrast:** paper text on `#0A0A0F` and `#211008` clears AA+; image overlays use scrims rather than text directly on busy pixels.
- **Targets:** camera, upload, scrubber handle, delete, and share controls maintain 44px minimum hit areas.
- **Screen readers:** generated image announces source, consent state, render confidence, and retention before actions.
- **Photo data controls:** ConsentCard, revoke, delete source, delete generated image, and export warning are always reachable.
- **Safety:** body-image copy avoids judgment; sensitive distress copy links to wellbeing support and SafetyResourceCard when a user reports harm.
- **Reduced-motion:** mirrors Section 10 and honors OS preference.

### 13. Premium checklist
1. **Source-specific:** route /wellbeing/virtual-tryon, photo upload, generation, consent, delete, and before/after review are present.
2. **Honest:** real, low-confidence, and honest-null states exist for photo, render, preference, retention, and CIA.
3. **Premium:** one media stage, clear consent, no generic stacked cards.
4. **Warm-dark:** radial atmosphere, glass tiers, and restrained grain specified.
5. **Semantic glow:** orange action, green saved render, purple CIA are named.
6. **60/30/10:** action/completion/AI colors do not become body styling chrome.
7. **Type:** Neue Montreal with one Tiempos italic emphasis word.
8. **All states:** Default, Skeleton, Empty, Error, Success, and Disabled are designed.
9. **Motivation tiers:** low, medium, high density changes are defined.
10. **Accessibility:** 44px targets, labels, contrast, reduced-motion, and image narration are covered.
11. **Consent:** photo revoke and delete controls are explicit.
12. **Catalog:** catalog components reused; TryOnPreviewCanvas is marked NEW with rationale.
13. **CIA voice:** calm, evidenced, consent-aware, and never body-shaming.

