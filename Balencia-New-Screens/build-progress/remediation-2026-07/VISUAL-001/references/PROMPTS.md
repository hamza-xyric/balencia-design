# VISUAL-002 generated-reference prompts

- Date: 2026-07-10 PKT
- Tool path: Codex built-in image generation
- Exact model ID: not exposed by the current tool surface
- Output use: non-production visual-direction evidence
- Production constraint: no generated logo, no raster UI icon, no generated button asset

## Image 1 — CIA orb direction

Reference inputs:

- current screen 11 baseline: large CIA voice-orb scale and warm-dark context;
- current screen 07 baseline: compact CIA onboarding scale and warm-dark context.

```text
Use case: ui-mockup
Asset type: original visual-direction board for a premium mobile product design system
Input images: Image 1 is the current large CIA voice-orb screen; Image 2 is the current compact CIA onboarding screen. Use them only for Balencia's warm-dark palette, scale context, and restrained premium mood. Do not copy their orb.
Primary request: create one polished landscape concept board defining an original state-bearing CIA presence orb system at both compact and hero scale.
Scene/backdrop: warm ink-black #0A0A0F with a restrained brown #211008 atmospheric pool, subtle 3% grain, generous negative space.
Subject: five clearly distinct orb states in one horizontal family: IDLE, LISTENING, THINKING, SPEAKING, SUCCESS. Repeat them as a tiny 24px-size strip below to prove small-scale legibility.
Style/medium: realistic product-design direction board, crisp vector-like geometry rendered with controlled smoked-glass depth; not sci-fi concept art.
Visual language: royal purple #7F24FF is CIA-exclusive; asymmetric open continuous-stroke arcs with round caps; precise soft core; shallow glass depth; one controlled glow halo. State changes must be structural, not color-only: idle uses one quiet open crescent; listening uses paired receptive arcs plus sparse waveform ticks; thinking uses an offset orbit with three nodes; speaking uses a directional open wave; success resolves into a complete halo with a small check-shaped notch and one restrained forest-green #34A853 milestone point.
Composition/framing: 16:10 landscape design board, centered system specimens, one large hero example at the right, small-scale strip below; short labels only.
Text (verbatim): "IDLE", "LISTENING", "THINKING", "SPEAKING", "SUCCESS"
Constraints: original direction; production-feasible in CSS/SVG; strong silhouette without glow; reduced-motion-safe static reading; accessible warm-paper labels; no logo; no wordmark; no app screenshot chrome; no photographs; no watermark.
Avoid: generic neon sphere, four blurry circles, rainbow gradients, symmetric plasma ball, excessive bloom, glossy 3D toy, noisy glass, purple wallpaper, copied proprietary marks, additional text.
```

## Image 2 — CTA and signature-glyph direction

Reference inputs:

- current screen 03 baseline: auth CTA proportions and hierarchy;
- current screen 43 baseline: premium route-gate hierarchy;
- current screen 80 baseline: media-control and warm-dark system context.

Initial generation prompt:

```text
Use case: ui-mockup
Asset type: original visual-direction board for CTA surfaces and Balencia signature glyph language
Input images: Image 1 is the current Balencia account screen; Image 2 is the current premium upgrade screen; Image 3 is the current music-coach screen. Use them only for the established warm-dark palette, mobile proportions, pill geometry, and current hierarchy. Do not copy their buttons or icons.
Primary request: create one polished landscape product-design direction board that establishes a premium CTA family plus a small conceptual signature-glyph vocabulary.
Scene/backdrop: warm ink #0A0A0F with selective #211008 raised surfaces, restrained orange atmosphere, subtle fine grain.
CTA direction: a burnished ember primary pill derived from brand orange, deep enough for warm-paper text; fine #FF5E00 edge light; subtle inset top highlight; soft state-only shadow. Show default, pressed, focus-visible, loading, disabled, success, and destructive specimens. Pressed is visibly compressed/darker; focus uses a clear warm-paper gap plus orange outer ring; loading locks width; disabled stays legible without glow. Secondary is warm glass, coach action is royal purple only for CIA, success is forest green.
Signature-glyph direction: a small original conceptual row for Mission, Life Power, CIA intelligence, Correlation, Progression, and Domain. Use one 24px grid, approximately 2px rounded continuous strokes, asymmetrical open paths, one intentional filled/active detail, recognizable without color. These are direction sketches only, not production assets and not a logo.
Style/medium: realistic high-fidelity mobile design-system mood board, crisp vector-like specimens, quietly luxurious, grounded, not gaming chrome.
Composition/framing: 16:10 landscape board; CTA specimens occupy the upper two-thirds; conceptual glyph row occupies the lower third; short specimen labels only.
Text (verbatim): "DEFAULT", "PRESSED", "FOCUS", "LOADING", "DISABLED", "SUCCESS", "DESTRUCTIVE"
Constraints: original direction; accessible contrast; one hero color per control; production-feasible as CSS/SVG; no logo; no wordmark; no complete app screens; no photographs; no watermark.
Avoid: white text on bright #FF5E00, generic flat orange pill, purple on non-CIA actions, rainbow gradients, chrome/metal bevels, noisy neon, generic Lucide copies, mascot art, copied proprietary marks, additional text.
```

Targeted repair prompt applied once:

```text
Use case: precise-object-edit
Asset type: Balencia CTA and signature-glyph visual-direction board
Input images: Image 1 is the edit target.
Primary request: refine only the CTA specimens in the upper two-thirds. Keep the lower signature-glyph row, all specimen labels, background, framing, spacing, and border exactly unchanged.
CTA changes: make DEFAULT, FOCUS, and LOADING a deeper burnished ember surface around #9A3407 rather than bright orange; make PRESSED around #6E2406; reduce every orange outer glow by roughly 65% so it reads as a controlled state-only edge light, not neon. Add the exact warm-paper label "CONTINUE" centered in DEFAULT, PRESSED, and FOCUS. Keep LOADING as spinner-only. Add "CONTINUE" to DISABLED with strong legibility, "DONE" to SUCCESS, and "DELETE" to DESTRUCTIVE. Preserve the clear paper-gap plus orange outer focus ring.
Text (verbatim): "CONTINUE", "DONE", "DELETE"
Constraints: change only the buttons; maintain accessible warm-paper contrast; keep all existing top state labels and all lower icon labels verbatim; no logo; no wordmark; no new elements; no watermark.
Avoid: bright flat orange, excessive bloom, white-on-bright-orange, altered icons, altered layout, extra text.
```
