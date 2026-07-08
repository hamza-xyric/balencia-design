# 67-image-viewer - A+++ hi-fi mobile spec

## Header
- **Source ID:** 67
- **Source spec:** `Balencia-New-Screens/screens/67-image-viewer.md`
- **Evidence:** screens/67-image-viewer.md, app_design 3/67-image-viewer.md plus ascii_wireframes/67-image-viewer.md
- **Route(s):** No live route; full-screen image viewer overlay launched from Progress Photos [49], Journal [37], chat attachments, and try-on history [87].
- **Frame:** 390x844 native mobile
- **Priority:** converted with asset slots

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Image viewer is a z-50 immersive overlay for inspecting photos and images at full resolution.
- **Premium Visual Director:** make Image viewer command surface the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Image viewer treats media as consent-gated: no identifiable face, body, home, document, provider logo, or private text appears without explicit permission.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

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

Route handling: No live route; full-screen image viewer overlay launched from Progress Photos [49], Journal [37], chat attachments, and try-on history [87].
```

## Focal Hierarchy
- **Dominant focal moment:** Image viewer command surface; it should be visually singular, not one tile among many.
- **Secondary layer:** ASCII wireframe : with CIA only when the source supports a synthesized read.
- **Operational layer:** Chrome, Comparison, Privacy toast, Load failure.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*viewer*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **ModalOverlay** - full-screen presentation above app chrome.
- **TopBar** - adapted as a gradient chrome scrim with close, counter, and share glyphs.
- **ChipProvenance** - source context, encrypted/local/CDN, upload date, confidence.
- **BtnGhost** - text/glyph-only Done, retry, and source-owned delete/report actions.
- **Sheet** - share warning, delete/report handoff, decrypt failure help.
- **ErrorState / SkeletonState / HonestNullState** - image load, decrypt, and missing image states.
- **NEW: ImageCanvas** - full-viewport pan/zoom image surface. Rationale: catalog cards do not model immersive gesture media.
- **NEW: ComparisonSlider** - before/after photo divider with date pills. Rationale: progress-photo comparison requires a specialized media control.

## Data Honesty
- **Image source:** real = URL or encrypted local key plus ChipProvenance; low-confidence = source context missing; honest-null = no image payload.
- **Gallery index:** real = current index and total; low-confidence = gallery count still syncing; honest-null = single-image viewer hides counter.
- **Zoom/comparison state:** real = local gesture state; low-confidence = comparison dates missing; honest-null = comparison controls hidden.
- **Download/share state:** real = native share/download completion when available; low-confidence = OS handoff opened but completion unknown; honest-null = disabled until image loaded.
- **Delete/report state:** real = owner surface supports action; low-confidence = owner unavailable; honest-null = no delete/report shown rather than pretending control exists.

## Consent and Safety
- Image viewer treats media as consent-gated: no identifiable face, body, home, document, provider logo, or private text appears without explicit permission.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- This is documented as a modal, overlay, utility, or source-only surface; do not invent a live route.

## States
- **Default:** image loaded, chrome visible for 3 seconds, share/counter/dots available.
- **Skeleton:** blurred thumbnail or neutral canvas fills exact image bounds while high-res loads.
- **Empty:** HonestNullState with close action and source retry instruction.
- **Error:** close remains available, share/download disabled, retry shown for load failure, and decrypt copy shown without retry when appropriate.
- **Success:** share/download handoff shows factual toast; comparison Done returns to normal viewer.
- **Disabled:** share, download, delete, or report dims to 40% with reason when image, consent, ownership, or platform support is missing.

## Motion
- **Chrome:** tap toggles scrim; auto-hide after 3 seconds; fade plus translateY over 200ms.
- **Gestures:** pinch 1x-5x, double tap 1x/2x, pan when zoomed, swipe-down dismiss, swipe left/right at 1x.
- **Comparison:** slider follows finger, date selector scrolls horizontally, active date pills use border plus label.
- **Toasts:** appear above safe area, auto-dismiss after share sheet opens or after 3 seconds.
- **Reduced-motion:** disables chrome translation, image crossfade, and slider handle flourish; gestures remain.

## Image Slots
- `HIFI-67-01` - content proof or instructional media slot; screen-specific; premium warm-dark product placeholder. Prompt: Image viewer privacy-safe photo placeholders, Balencia warm-dark glass UI asset, privacy-safe, no brand logos, no readable UI text.

## Implementation Notes
- Route header must stay aligned with the repaired source: No live route; full-screen image viewer overlay launched from Progress Photos [49], Journal [37], chat attachments, and try-on history [87]..
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** chrome/toast text clears AA+ on dark scrim and `#211008`.; **Targets:** close, share, Done, retry, delete, report, and slider handle have 44px hit areas.; **Screen readers:** on mount, announce source, position, instructions, and privacy context; gestures have alternate buttons.
