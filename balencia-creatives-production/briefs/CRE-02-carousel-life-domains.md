# Brief: CRE-02-carousel-life-domains

- Status: `accepted`
- Opportunity: `CRE-02` — see [../registry/opportunities.json](../registry/opportunities.json)
- Screen: 02 — Motion carousel (panel 1)
- Route: `/auth/carousel`
- Package: `onboarding-motion`
- Priority: `P0`
- Production batch: `CP-01`

## Placement

Motion graphic area (~340pt tall, full width, center-aligned) above headline "One life, not modules." Abstract motion — not live-action people.

## Asset specification

| Field | Value |
| --- | --- |
| Asset type | `motion-loop` (+ optional `motion-still` poster) |
| Constraints | Panel 1: nine life domains unify into one system |
| Aspect ratio | `9:16` |
| Target dimensions | Full-width panel in carousel viewport |
| States / variants | Loop: scattered domain nodes → magnetic pull into circular system; orange continuous stroke threads through |

## Creative direction

**Must include:**

- Warm dark `#211008` cinematic background
- Nine abstract domain orbs/icons (fitness, nutrition, sleep, finance, career, relationships, creativity, spirituality, learning) starting scattered, converging into unified ring
- Burnt orange `#FF5E00` continuous stroke threading nodes — user/action color
- Curiosity tone: "everything connects" without readable UI text

**Must avoid:**

- Stock photos of people (CQ03: abstract/illustrated motion for onboarding)
- Cartoon RPG, neon cyberpunk, module-grid SaaS cliché
- Readable fake headlines in the render

## Higgsfield plan

| Field | Value |
| --- | --- |
| Allowed | yes |
| Tool | `generate_video` (poster still via `generate_image` if needed) |
| Model | `seedance_2_0` |
| Prompt draft | Balencia onboarding motion graphic panel 1: on warm dark brown mobile background, nine soft glowing domain orbs float apart then magnetically pull together into one unified circular life system, burnt-orange continuous stroke line threads through the orbs, smooth premium motion, dark-first wellness coach app aesthetic, 9:16, no text, no faces, abstract icons only. Avoid: stock people, gym bro, cartoon, neon, clinical, text gibberish, black overlays. |
| Count | 1 |
| Reference medias | optional `start_image` from panel still |
| Preflight credits | 27 |
| Duration | 6s, `sound`: off |

## Variants

| Variant | Job ID | Notes | Selected |
| --- | --- | --- | --- |
| 01 | 6b03b87c-a069-4cfd-8ffb-1944cf211109 | Draft/reference video only; too soft for final motion. | no |
| still-01 | 66843ab5-dbb4-4a28-9893-0192782cd63a | User-approved 2026-05-26 as the reduced-motion still for panel 1. | yes |
| controlled-start-frame | — | Draft controlled SVG created during continuation; not approved. | no |

## QA

| Dimension | Score (1–5) | Notes |
| --- | --- | --- |
| Brand fit | 4 | User-approved still has the warm/dark life-system mood and clear onboarding symbolism. |
| Placement fit | 4 | Approved still supports the panel-1 motion zone and reduced-motion fallback. |
| Trust and sensitivity | 5 | No people, identity, or sensitive content. |
| Mobile legibility | 4 | Large symbols and ring composition remain readable at mobile carousel scale. |
| Package consistency | 4 | Works alongside the approved domain visual-kit reference. |
| Production readiness | 4 | Approved as static/reduced-motion creative; video loop remains draft. |

| Brand gate | Pass |
| --- | --- |
| [../qa/brand-gates.md](../qa/brand-gates.md) | pass |

## Export

- Path: `outputs/onboarding-motion/CRE-02-carousel-life-domains/`
- Accepted file: `reduced-motion-still-01.png`
- Draft/reference: `variant-01.mp4`, `controlled-start-frame.svg`
- Integration target: carousel panel 1 asset slot

## Decision

`accepted`

**Rationale:** User approved `reduced-motion-still-01.png` on 2026-05-26. Keep the prior video and controlled SVG start frame as draft/reference only.
