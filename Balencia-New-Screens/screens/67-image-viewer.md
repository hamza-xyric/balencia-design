# 67-image-viewer - hi-fi glass spec

### 1. Header
- **ID:** 67
- **Name:** Image viewer
- **Route(s) covered:** No live route; full-screen image viewer overlay launched from Progress Photos [49], Journal [37], chat attachments, and try-on history [87].
- **Tab:** None
- **Source:** app_design 3/67-image-viewer.md plus ascii_wireframes/67-image-viewer.md
- **Batch:** 20

### 2. Purpose
Image viewer is a z-50 immersive overlay for inspecting photos and images at full resolution. The source design is intentionally minimal: the image is the focal surface, chrome appears on tap, gestures map to physical viewing, and comparison mode exists for progress photos. The redesign keeps that intent while adding provenance, privacy, share warning, and source-owned delete/report handoffs.

### 3. Entry & exit
- **Entry paths:** progress-photo thumbnail, journal attachment, chat/media attachment, try-on generated look, or any source that passes an encrypted image key plus context.
- **Primary exit:** swipe down, close glyph, Android back, or Escape returns to the presenting screen with matched dismissal.
- **Action exits:** share opens native share after privacy warning; gallery swipe changes image; comparison `Done` returns to viewer; source-owned `Delete photo` or `Report image` routes back to the owning screen's action sheet.
- **Failure exit:** failed load/decrypt keeps close available, disables share, and allows retry when the source is recoverable.

### 4. Layout anatomy
**Regions, top to bottom:**
1. **Gradient chrome scrim** with close, image counter, and share; no card chrome.
2. **Image canvas** fills the viewport with aspect-fit photo/image, letterboxed on `#0A0A0F`.
3. **Gesture layer** handles zoom, pan, double tap, swipe-down dismiss, and gallery swipe.
4. **Pagination dots** appear only when chrome is visible and gallery has multiple items.
5. **Comparison mode** swaps share for Done and adds before/after slider, date labels, and date selector.
6. **Toast region** for encrypted-share warning, share failure, delete/report handoff, and load/decrypt notices.

**ASCII wireframe (390x844):**
```text
+--------------------------------------+
| status bar                           |
| x        2 of 7              share   |
| gradient scrim fades to photo        |
|                                      |
|                                      |
|        +------------------+          |
|        |                  |          |
|        |      PHOTO       |          |
|        |                  |          |
|        +------------------+          |
|                                      |
|        pinch 1x-5x | pan | zoom      |
|                                      |
|             o o O o o o o            |
|                                      |
|     toast: Photo shares unencrypted  |
+--------------------------------------+
| home indicator safe area             |
+--------------------------------------+
```

### 5. Components
- **ModalOverlay** - full-screen presentation above app chrome.
- **TopBar** - adapted as a gradient chrome scrim with close, counter, and share glyphs.
- **ChipProvenance** - source context, encrypted/local/CDN, upload date, confidence.
- **BtnGhost** - text/glyph-only Done, retry, and source-owned delete/report actions.
- **Sheet** - share warning, delete/report handoff, decrypt failure help.
- **ErrorState / SkeletonState / HonestNullState** - image load, decrypt, and missing image states.
- **NEW: ImageCanvas** - full-viewport pan/zoom image surface. Rationale: catalog cards do not model immersive gesture media.
- **NEW: ComparisonSlider** - before/after photo divider with date pills. Rationale: progress-photo comparison requires a specialized media control.

### 6. Visual treatment
- **Atmosphere:** pure `#0A0A0F` letterbox with no decorative card behind the image.
- **Glass tiering:** no GlassCard around the photo; chrome is a gradient scrim. Toasts use SolidCard on `#211008`.
- **Semantic glows:** image canvas has no glow; active comparison handle uses `--glow-you #FF5E00`; successful share/download handoff uses `--glow-done #34A853`; CIA-related image explanation from source screens uses `--glow-cia #7F24FF` only outside this overlay.
- **Type:** Neue Montreal for counter and toasts; comparison title can read `Compare *progress*` with one Tiempos italic word.
- **60/30/10:** orange is focus/action, green is completed handoff, purple is absent unless the source explicitly invokes CIA after dismissal.

### 7. Content & copy
- **Chrome:** Close image viewer; `2 of 7`; Share image.
- **Comparison:** Compare *progress*; Before; After; Done.
- **Privacy toast:** Photo will be shared unencrypted.
- **Load failure:** Couldn't load this image. Retry.
- **Decrypt failure:** Couldn't decrypt this photo. It may be unavailable after a password change.
- **Source actions:** Delete photo; Report image; Download image; Share image.
- **Empty copy:** No image was provided. Return to the source screen and try again.

### 8. Data & honesty states
- **Image source:** real = URL or encrypted local key plus ChipProvenance; low-confidence = source context missing; honest-null = no image payload.
- **Gallery index:** real = current index and total; low-confidence = gallery count still syncing; honest-null = single-image viewer hides counter.
- **Zoom/comparison state:** real = local gesture state; low-confidence = comparison dates missing; honest-null = comparison controls hidden.
- **Download/share state:** real = native share/download completion when available; low-confidence = OS handoff opened but completion unknown; honest-null = disabled until image loaded.
- **Delete/report state:** real = owner surface supports action; low-confidence = owner unavailable; honest-null = no delete/report shown rather than pretending control exists.

### 9. All states
- **Default:** image loaded, chrome visible for 3 seconds, share/counter/dots available.
- **Skeleton:** blurred thumbnail or neutral canvas fills exact image bounds while high-res loads.
- **Empty:** HonestNullState with close action and source retry instruction.
- **Error:** close remains available, share/download disabled, retry shown for load failure, and decrypt copy shown without retry when appropriate.
- **Success:** share/download handoff shows factual toast; comparison Done returns to normal viewer.
- **Disabled:** share, download, delete, or report dims to 40% with reason when image, consent, ownership, or platform support is missing.

### 10. Motion & interaction
- **Chrome:** tap toggles scrim; auto-hide after 3 seconds; fade plus translateY over 200ms.
- **Gestures:** pinch 1x-5x, double tap 1x/2x, pan when zoomed, swipe-down dismiss, swipe left/right at 1x.
- **Comparison:** slider follows finger, date selector scrolls horizontally, active date pills use border plus label.
- **Toasts:** appear above safe area, auto-dismiss after share sheet opens or after 3 seconds.
- **Reduced-motion:** disables chrome translation, image crossfade, and slider handle flourish; gestures remain.

### 11. Motivation-tier adaptation
- **Low:** chrome, zoom, close, and privacy toast only.
- **Medium:** default gallery, share/download, comparison where source supports it.
- **High:** show provenance overlay, source-owned delete/report handoff, date selector, and encrypted-share detail.

### 12. Accessibility
- **Contrast:** chrome/toast text clears AA+ on dark scrim and `#211008`.
- **Targets:** close, share, Done, retry, delete, report, and slider handle have 44px hit areas.
- **Screen readers:** on mount, announce source, position, instructions, and privacy context; gestures have alternate buttons.
- **Photo controls:** share warning, download/share, delete/report handoff, and source provenance are exposed when supported.
- **Reduced-motion:** mirrors Section 10.

### 13. Premium checklist
1. **Source-specific:** image viewer, photo/image canvas, zoom, share/download, comparison, delete/report are present.
2. **Honest:** real, low-confidence, and honest-null states cover image, gallery, share, and ownership.
3. **Premium:** immersive media overlay, not a generic card stack.
4. **Warm-dark:** dark cinema surface and gradient scrim are specified.
5. **Semantic glow:** no decorative image glow; action/completion/AI meanings are scoped.
6. **60/30/10:** media colors never become chrome.
7. **Type:** Neue Montreal plus one Tiempos italic comparison moment.
8. **All states:** Default, Skeleton, Empty, Error, Success, Disabled covered.
9. **Motivation tiers:** low, medium, high variants.
10. **Accessibility:** 44px targets, labels, gesture alternatives, contrast, reduced-motion.
11. **Consent:** photo share/delete/report boundaries are explicit.
12. **Catalog:** catalog components reused; ImageCanvas and ComparisonSlider are NEW with rationale.
13. **CIA voice:** absent in overlay unless source surface supplies context after dismissal.

