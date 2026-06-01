# Brief: CRE-02-domain-visual-kit

- Status: `accepted`
- Opportunity: `CRE-02` / `CRE-07` support asset
- Screen: 02 — Motion carousel; 07 — SIA onboarding
- Route: `/auth/carousel`, `/auth/sia-onboarding`
- Package: `onboarding-motion`
- Priority: `P0 support`
- Production batch: `CP-01`

## Placement

Reusable domain-symbol and connector language for onboarding carousel panels, SIA onboarding visual area, reduced-motion stills, and future coded app icons.

## Asset specification

| Field | Value |
| --- | --- |
| Asset type | `icon-set` + visual language kit |
| Constraints | UI-critical symbols should still become controlled SVG/code for app integration; raster sheet can be approved as creative reference |
| Aspect ratio | `16:9` reference sheet |
| Target dimensions | `1600x900` SVG viewBox |
| States / variants | Nine domain symbols; connector strokes; chips; mission badge shapes |

## Creative direction

**Must include:**

- Warm ink-brown base with Balencia orange, forest green, and restrained purple
- Nine consistent domain symbols: fitness, nutrition, sleep, finance, career, relationships, creativity, spirituality, learning
- Continuous-stroke connector language with round caps
- Extractable shapes suitable for controlled app SVG/components

**Must avoid:**

- Generated text or fake labels
- AI-generated logos or provider marks
- Overly 3D, toy-like, childish, or game-badge visual language
- Saturating all brand colors at full strength

## Higgsfield reference pass

| Field | Value |
| --- | --- |
| Allowed | yes, as reference only |
| Tool | `generate_image` |
| Requested model | `nano_banana_pro` |
| Actual model | `nano_banana_2` |
| Prompt draft | Balencia onboarding domain visual language kit, premium mobile UI reference sheet on warm ink-brown background. Create nine consistent unlabeled circular domain symbols for fitness, nutrition, sleep, finance, career, relationships, creativity, spirituality, and learning; include matching connector strokes, small chip shapes, and mission badge shapes as a coherent visual system. Use one hero color per cluster with burnt orange #FF5E00 for user/action, forest green #34A853 for progress, royal purple #7F24FF only as a tiny SIA/coach accent. Adult polished app icon style, rounded caps, warm shadows, no faces, no logos, no readable text, no letters, no fake UI words, no watermarks. Avoid: childish cartoon, neon cyberpunk, clinical hospital, stock photo, text gibberish, generated logos, cold blue grading. |
| Count | 2 |
| Preflight credits | 4 |

## Variants

| Variant | Job ID | Notes | Selected |
| --- | --- | --- | --- |
| 01 | 55f12015-35a5-486b-8007-64fc3f08052f | Draft/reference only. | no |
| 02 | a7008f6f-f73c-4684-838f-87c86b4e18a4 | User-approved 2026-05-26; more defined icons and stronger visual reference. | yes |
| controlled-svg | — | Draft coded SVG reference sheet with extractable symbols and connector language; not user-approved. | no |

## QA

| Dimension | Score (1–5) | Notes |
| --- | --- | --- |
| Brand fit | 4 | Variant 02 has stronger icon definition and a more premium direction for the domain language. |
| Placement fit | 5 | Directly supports carousel, SIA onboarding, and future reduced-motion frames. |
| Trust and sensitivity | 5 | No people, bodies, provider marks, or sensitive claims. |
| Mobile legibility | 4 | Symbols are large and extractable; individual app components should be tested after integration. |
| Package consistency | 4 | Establishes the CP-01 domain/icon language for the next motion pass. |
| Production readiness | 4 | Approved raster sheet is present; individual controlled component extraction is deferred to integration. |
| Source and licensing | 4 | Higgsfield reference generated under project account; coded SVG remains draft/reference. |
| Accessibility and motion fallback | 4 | Static raster reference can guide reduced-motion/source assets. |

| Brand gate | Pass |
| --- | --- |
| [../qa/brand-gates.md](../qa/brand-gates.md) | pass |

## Export

- Path: `outputs/onboarding-motion/CRE-02-domain-visual-kit/`
- Accepted file: `variant-02.png`
- Draft/reference: `variant-01.png`, `domain-visual-kit.svg`
- Metadata: `metadata.json`
- Integration target: Convert into controlled symbols/components when CP-01 is integrated into `balencia-screens`

## Decision

`accepted`

**Rationale:** User approved `variant-02.png` as the strongest raster creative reference because the icons are more defined. Keep variant 01 and the coded SVG as draft/reference.
