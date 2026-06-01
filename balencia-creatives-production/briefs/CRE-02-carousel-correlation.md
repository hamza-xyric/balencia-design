# Brief: CRE-02-carousel-correlation

- Status: `draft`
- Opportunity: `CRE-02` — see [../registry/opportunities.json](../registry/opportunities.json)
- Screen: 02 — Motion carousel (panel 3)
- Route: `/auth/carousel`
- Package: `onboarding-motion`
- Priority: `P0`
- Production batch: `CP-01`

## Placement

Motion graphic area for panel 3 — "Everything connects." Correlation insight visualization.

## Asset specification

| Field | Value |
| --- | --- |
| Asset type | `motion-loop` |
| Constraints | Two domains connect; data pulses; insight card fades in (card can be composited in UI) |
| Aspect ratio | `9:16` |
| Target dimensions | Carousel motion zone |
| States / variants | Fitness + finance nodes; animated correlation lines; pulsing data points |

## Creative direction

**Must include:**

- Warm dark UI context
- Two domain icons (fitness + finance) linked by animated correlation lines
- Forest green `#34A853` for progress/data pulse accents sparingly
- Intelligent, calm — not dashboard clutter or force-graph wallpaper (CQ09 spirit)

**Must avoid:**

- Dense unreadable graph, stock photos, fake long paragraph text in image
- Clinical hospital charts, neon trading-floor aesthetic

## Higgsfield plan

| Field | Value |
| --- | --- |
| Allowed | yes |
| Tool | `generate_video` |
| Model | `seedance_2_0` |
| Prompt draft | Balencia onboarding motion panel 3: on warm dark brown background, fitness and finance domain icons connect with animated glowing correlation lines between them, subtle data points pulse along the lines, hint of a minimal insight card shape fading in without readable text, forest green accents for data pulse only, burnt orange user stroke motif, premium calm intelligence, 9:16 mobile motion, no faces, no stock photos. Avoid: dense force graph wallpaper, clinical charts, cartoon, text gibberish, neon, black overlays. |
| Count | 1 |
| Reference medias | none |
| Preflight credits | 27 |
| Duration | 6s, `sound`: off |

## Variants

| Variant | Job ID | Notes | Selected |
| --- | --- | --- | --- |
| 01 | 0997f41c-6b7d-4f4f-82da-befd8e5fc2fa | Draft/reference only. | no |
| still-01 | 65aaf58f-8d61-44ea-94b1-6b78bc3d2464 | Draft/reference only. | no |
| controlled-start-frame | — | Draft controlled SVG created during continuation; not approved. | no |

## QA

| Dimension | Score (1–5) | Notes |
| --- | --- | --- |
| Brand fit | 3 | Still has the right explainability concept, but silver icon treatments feel less Balencia-owned. |
| Placement fit | 3 | Sleep-to-finance relationship is visible; current video thumbnail is effectively blank at review frame. |
| Trust and sensitivity | 5 | No people, health claims, or sensitive imagery. |
| Mobile legibility | 3 | Still is legible; video needs a controlled start frame. |
| Package consistency | 3 | Should reuse the domain kit symbols instead of model-invented icons. |
| Production readiness | 2 | Not accepted; candidate is iteration input only. |

| Brand gate | Pass |
| --- | --- |
| [../qa/brand-gates.md](../qa/brand-gates.md) | pass |

## Export

- Path: `outputs/onboarding-motion/CRE-02-carousel-correlation/`
- Accepted file:
- Draft/reference: `variant-01.mp4`, `reduced-motion-still-01.png`, `controlled-start-frame.svg`
- Integration target: carousel panel 3

## Decision

`draft/reference`

**Rationale:** Not in the user-approved set. Keep all correlation assets as draft/reference.
