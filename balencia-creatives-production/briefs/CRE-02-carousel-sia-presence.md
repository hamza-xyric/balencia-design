# Brief: CRE-02-carousel-sia-presence

- Status: `draft`
- Opportunity: `CRE-02` — see [../registry/opportunities.json](../registry/opportunities.json)
- Screen: 02 — Motion carousel (panel 2)
- Route: `/auth/carousel`
- Package: `onboarding-motion`
- Priority: `P0`
- Production batch: `CP-01`

## Placement

Motion graphic area for panel 2 — headline "Meet SIA, your coach." Abstract presence only (full SIA avatar is CP-02).

## Asset specification

| Field | Value |
| --- | --- |
| Asset type | `motion-loop` |
| Constraints | Abstract coach presence — not robotic, not a literal human portrait |
| Aspect ratio | `9:16` |
| Target dimensions | Carousel motion zone |
| States / variants | Warm responsive glow form; royal purple `#7F24FF` accent (~10% coach color) |

## Creative direction

**Must include:**

- Balencia warm dark background
- Abstract luminous coach presence: soft organic shape that subtly breathes/pulses
- Purple `#7F24FF` glow sparingly (coach/SIA moment only on this panel)
- Warmth and aliveness without showing a face or full character model

**Must avoid:**

- Robotic android, uncanny human face, stock portrait (CQ03)
- Orange+green+purple all saturated at once
- Text, logos, UI mockups in frame

## Higgsfield plan

| Field | Value |
| --- | --- |
| Allowed | yes |
| Tool | `generate_video` |
| Model | `seedance_2_0` |
| Prompt draft | Balencia onboarding motion panel 2: abstract warm coach presence as a soft glowing responsive organic form on dark warm brown background, gentle breathing pulse animation, subtle royal purple #7F24FF aura only around the form, feels alive and supportive not robotic, no human face, no text, premium mobile 9:16 motion graphic. Avoid: robot, stock portrait, cartoon, neon cyberpunk, text gibberish, multiple saturated brand colors at once. |
| Count | 1 |
| Reference medias | none |
| Preflight credits | 27 |
| Duration | 6s, `sound`: off |

## Variants

| Variant | Job ID | Notes | Selected |
| --- | --- | --- | --- |
| 01 | e50b2131-fed3-4683-bbdc-6a5d0fccde59 | Draft/reference only. | no |
| still-01 | 6e238ce2-23c8-4bf9-b79e-e6c2c6d2b661 | Draft/reference only. | no |
| controlled-start-frame | — | Draft controlled SVG created during continuation; not approved. | no |

## QA

| Dimension | Score (1–5) | Notes |
| --- | --- | --- |
| Brand fit | 3 | Purple restraint is close, but both variants need a more distinctive SIA-presence language. |
| Placement fit | 3 | Abstract coach presence is appropriate; current forms are too generic for a premium first-run carousel. |
| Trust and sensitivity | 5 | No face/avatar/person risk. |
| Mobile legibility | 3 | Simple and legible, but not meaningful enough. |
| Package consistency | 3 | Needs to connect to the domain kit and SIA color language without becoming an avatar. |
| Production readiness | 2 | Not accepted; use as prompt-learning only. |

| Brand gate | Pass |
| --- | --- |
| [../qa/brand-gates.md](../qa/brand-gates.md) | pass |

## Export

- Path: `outputs/onboarding-motion/CRE-02-carousel-sia-presence/`
- Accepted file:
- Draft/reference: `variant-01.mp4`, `reduced-motion-still-01.png`, `controlled-start-frame.svg`
- Integration target: carousel panel 2

## Decision

`draft/reference`

**Rationale:** Not in the user-approved set. Keep all SIA presence assets as draft/reference.
