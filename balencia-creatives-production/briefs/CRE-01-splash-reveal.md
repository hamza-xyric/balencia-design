# Brief: CRE-01-splash-reveal

- Status: `iterate`
- Opportunity: `CRE-01` — see [../registry/opportunities.json](../registry/opportunities.json)
- Screen: 01 — Splash screen
- Route: `/auth/splash`
- Package: `onboarding-motion`
- Priority: `P0`
- Production batch: `CP-01`

## Placement

Centered hero cluster (~72pt symbol zone): official Balencia logo mark from `../Balencia/Balencia-Creatives-Reference/logos/Logo Mark.svg` or `logo mark png.png`, composited/coded directly in the app. Use a subtle warm hero glow and a separate continuous-stroke reveal accent, but do **not** wrap the stroke around the logo. Wordmark, if shown later in the sequence, must use the official lockup file or UI component, not generated text.

## Asset specification

| Field | Value |
| --- | --- |
| Asset type | `official-mark` + `motion-still` support |
| Source policy | `official` for logo; `generated` allowed only for optional background/atmosphere support |
| License / permission | Official Balencia source files in `Balencia/Balencia-Creatives-Reference/logos/` |
| Constraints | Symbol-first reveal; official mark only; continuous stroke must not wrap around the logo |
| Aspect ratio | `9:16` |
| Target dimensions | 1170×2532 px reference (@3x mobile) |
| States / variants | Idle mark, reveal start, reveal mid, reveal complete, reduced-motion still |

## Creative direction

**Must include:**

- Balencia warm dark UI context (`#211008`, `#140A05`), burnt orange `#FF5E00` accent on stroke only
- Official Balencia logo mark dominant, sourced directly from `Logo Mark.svg` / `logo mark png.png`
- Continuous expressive stroke (round caps) as a separate side/underlay reveal accent, not an orbit or enclosure around the symbol
- Subtle warm hero glow (not neon), premium intentional brand handshake
- One hero color on surface (orange stroke); no purple (reserved for SIA elsewhere)

**Must avoid:**

- Generated or approximate Balencia marks, generated wordmark text, UI chrome, status bars, fake gibberish text
- Stroke wrapping around the logo mark, enclosing it, or implying a different logo system
- Cold clinical stock, gym-bro, wellness-influencer, pure black `#000`, pure white `#fff`
- Childish cartoon, black photo overlays, watermarks

## Higgsfield plan

| Field | Value |
| --- | --- |
| Allowed | partial — do not generate the logo; only optional background/atmosphere support |
| Tool | Prefer coded/Rive/Lottie/CSS composition; `generate_image` only for non-logo atmospheric background if needed |
| Model | `marketing_studio_image` only for optional non-logo background |
| Prompt draft | Optional background only: Balencia mobile splash atmosphere, warm ink-brown vertical background #211008 and #140A05, soft burnt-orange glow offset behind where an official logo will be composited later, one separate continuous stroke accent entering from lower left and easing toward the center without enclosing any logo, no logos, no wordmarks, no readable text, no UI chrome, premium grounded life-coach mood, 9:16. Avoid: generated logos, fake Balencia marks, text gibberish, stock clichés, gym bro, clinical, cartoon, black overlays, watermarks, cold blue grading. |
| Count | 1–2 only if coded background is insufficient |
| Reference medias | Official logo files may be used for placement reference only; output must not redraw or bake in the logo |
| Preflight credits | Required before any new optional background generation |

## Variants

| Variant | Job ID | Notes | Selected |
| --- | --- | --- | --- |
| 01 | f4227c5d-9b49-499e-8424-e453099f42b8 | Rejected: generated an invented non-Balencia mark and stroke-orbit treatment | no |
| 02 | 9665df1f-1386-492d-9e9d-ffc0489a0f29 | Rejected: generated an invented non-Balencia mark and stroke wrapping/enclosing treatment | no |

## QA

| Dimension | Score (1–5) | Notes |
| --- | --- | --- |
| Brand fit | 1 | Both variants invent non-Balencia marks instead of using official source files. |
| Placement fit | 2 | Warm splash mood is close, but the mark and stroke behavior violate the placement intent. |
| Trust and sensitivity | 4 | No sensitive subject risk. |
| Mobile legibility | 3 | Variants are legible as marks, but not the correct mark. |
| Package consistency | 1 | Breaks official Balencia logo system. |
| Production readiness | 1 | Cannot integrate because the brand mark is generated/incorrect. |
| Source and licensing | 1 | Logo source was not official; no acceptable logo provenance. |
| Accessibility and motion fallback | 3 | Static review only; reduced-motion fallback still needs official-mark composition. |

| Brand gate | Pass |
| --- | --- |
| [../qa/brand-gates.md](../qa/brand-gates.md) | fail — Balencia mark generated/approximated; stroke wraps around mark |

## Export

- Path: `outputs/onboarding-motion/CRE-01-splash-reveal/`
- Metadata: required after an official-mark-based candidate is accepted
- Accepted file: none
- Alt text: `Balencia logo mark appearing on a warm dark splash screen`
- Reduced-motion fallback: official static mark on warm ink background
- Integration target: `balencia-screens/public/creatives/onboarding-motion/splash/` (when approved)

## Decision

`iterate`

**Rationale:** Existing generated variants are rejected because they invented brand marks. Next iteration should be a coded/Rive/Lottie/CSS composition using the official logo directly, with optional generated background atmosphere only if needed.
