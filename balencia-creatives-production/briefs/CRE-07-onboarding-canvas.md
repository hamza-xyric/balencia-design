# Brief: CRE-07-onboarding-canvas

- Status: `accepted`
- Opportunity: `CRE-07` — see [../registry/opportunities.json](../registry/opportunities.json)
- Screen: 07 — SIA onboarding
- Route: `/auth/sia-onboarding`
- Package: `onboarding-motion`
- Priority: `P0`
- Production batch: `CP-01`

## Placement

Visual brainstorming area (~40% of safe area, ~280pt on iPhone 15): animated domain bubbles, goal example cards, stage-based motion above chat. SIA avatar in chat is separate (24pt, CP-02).

## Asset specification

| Field | Value |
| --- | --- |
| Asset type | `illustration` + `motion-still` (hero key frame for domain-discovery stage) |
| Constraints | CQ03: custom illustration for system/canvas — no stock people |
| Aspect ratio | `9:16` (crop to wide top band in UI) |
| Target dimensions | ~390×280pt visual band reference |
| States / variants | Domain-discovery: multiple floating domain bubbles with soft connectors; goal cards as abstract pills |

## Creative direction

**Must include:**

- Balencia warm dark `#211008` canvas with subtle depth
- Eight to nine life domain bubbles (fitness, nutrition, sleep, finance, career, relationships, creativity, spirituality, learning) floating with gentle drift
- Sparse burnt orange and forest green accents on bubbles; purple only on a subtle SIA-coach hint if needed
- Supportive adult illustration tone — collaborative brainstorming, not form fields
- Room for UI to overlay chat below (no full-screen fake chat in asset)

**Must avoid:**

- Tiny illegible panel (current prototype gap — asset should feel expansive)
- Stock portraits, childish cartoon, readable chat bubbles in the render
- Pure black/white, clinical wireframe aesthetic

## Higgsfield plan

| Field | Value |
| --- | --- |
| Allowed | yes |
| Tool | `generate_image` |
| Model | `marketing_studio_image` |
| Prompt draft | Balencia mobile app SIA onboarding visual brainstorming canvas: warm dark brown background, eight floating rounded domain bubbles with soft icons for fitness nutrition sleep finance career relationships creativity spirituality learning, gentle connecting lines between selected bubbles, abstract goal example pills floating, collaborative premium life-coach illustration style, generous negative space in lower third for chat overlay, burnt orange and forest green accents sparingly, no human faces, no readable text, 9:16 vertical. Avoid: stock photos, cartoon childish, clinical, text gibberish, tiny cramped layout, black overlays, neon. |
| Count | 2 |
| Reference medias | none |
| Preflight credits | 2 (2 images) |

## Variants

| Variant | Job ID | Notes | Selected |
| --- | --- | --- | --- |
| 01 | 91856a42-8052-4974-9adf-7ad8d2790357 | Draft/reference only. | no |
| 02 | 0491ac66-abbe-4e81-a2e6-b26754d433d5 | User-approved 2026-05-26 as the SIA onboarding canvas direction. | yes |
| 03 | a1594a7b-1802-4aa5-a1b6-f0a8538780a4 | Draft/reference only. | no |
| 04 | 0e13ba1e-b6e3-412a-8ae9-5c5a11abb966 | Draft/reference only. | no |
| controlled-top-band | — | Draft controlled SVG created during continuation; not approved. | no |

## QA

| Dimension | Score (1–5) | Notes |
| --- | --- | --- |
| Brand fit | 4 | User-approved variant 02 has the strongest domain-bubble direction and warm onboarding mood. |
| Placement fit | 4 | Approved as SIA onboarding canvas creative; crop should be checked at integration. |
| Trust and sensitivity | 5 | No faces or sensitive imagery. |
| Mobile legibility | 4 | Large bubbles and connectors are readable enough for the onboarding top visual. |
| Package consistency | 4 | Matches the approved domain visual-kit direction closely enough for CP-01. |
| Production readiness | 4 | Approved as static canvas creative; final crop check remains for integration. |

| Brand gate | Pass |
| --- | --- |
| [../qa/brand-gates.md](../qa/brand-gates.md) | pass |

## Export

- Path: `outputs/onboarding-motion/CRE-07-onboarding-canvas/`
- Accepted file: `variant-02.png`
- Draft/reference: `variant-01.png`, `variant-03.png`, `variant-04.png`, `controlled-top-band.svg`
- Integration target: SIA onboarding visual area

## Decision

`accepted`

**Rationale:** User approved `variant-02.png` on 2026-05-26. Keep all other canvas variants and controlled SVG top-band as draft/reference only.
