# Brief: CRE-02-carousel-rpg-progress

- Status: `accepted`
- Opportunity: `CRE-02` — see [../registry/opportunities.json](../registry/opportunities.json)
- Screen: 02 — Motion carousel (panel 4)
- Route: `/auth/carousel`
- Package: `onboarding-motion`
- Priority: `P0`
- Production batch: `CP-01`

## Placement

Motion graphic area for panel 4 — "Your life, gamified." Final carousel panel before Get started.

## Asset specification

| Field | Value |
| --- | --- |
| Asset type | `motion-loop` |
| Constraints | XP counter animates up; level ring fills; quest card appears — premium RPG, not cartoon |
| Aspect ratio | `9:16` |
| Target dimensions | Carousel motion zone |
| States / variants | Orange action + green progress accents; domain color tags on quest card (abstract) |

## Creative direction

**Must include:**

- Warm dark background, earned premium gamification feel
- XP number rising, circular level ring filling with green progress accent
- Quest/mission card materializing with soft domain color chips (no readable quest copy)
- Adult tone — Duolingo-level polish without childish mascots

**Must avoid:**

- Cartoon badges, loot-box neon, mobile game clutter text
- Shame/guilt visuals, aggressive exclamation energy

## Higgsfield plan

| Field | Value |
| --- | --- |
| Allowed | yes |
| Tool | `generate_video` |
| Model | `seedance_2_0` |
| Prompt draft | Balencia onboarding motion panel 4: premium life-RPG gamification on warm dark brown background, XP counter animates upward, circular level ring fills with forest green progress glow, a sleek quest card fades in with small abstract domain color tags, burnt orange for user action accents, mature premium wellness app not cartoon game, 9:16 mobile motion, no readable text, no childish mascots. Avoid: cartoon loot game, neon, stock people, text gibberish, gym bro, clinical. |
| Count | 1 |
| Reference medias | none |
| Preflight credits | 27 |
| Duration | 6s, `sound`: off |

## Variants

| Variant | Job ID | Notes | Selected |
| --- | --- | --- | --- |
| 01 | ee3eba7b-a59a-4b44-aca4-58423e80f2d1 | Draft/reference video only; generated `XP` text remains unsuitable. | no |
| still-01 | a182bce6-4896-419c-8db2-96ce4a87e32f | User-approved 2026-05-26 as the reduced-motion still for panel 4. | yes |
| controlled-start-frame | — | Draft controlled SVG created during continuation; not approved. | no |

## QA

| Dimension | Score (1–5) | Notes |
| --- | --- | --- |
| Brand fit | 4 | User-approved still carries the mature progress/RPG direction despite earlier chrome concerns. |
| Placement fit | 4 | Approved as a reduced-motion still for panel 4; video remains draft. |
| Trust and sensitivity | 5 | No people or sensitive content. |
| Mobile legibility | 4 | Progress ring and mission-card shape are readable at mobile scale. |
| Package consistency | 4 | Acceptable within the onboarding-motion package as a static reference/fallback. |
| Production readiness | 4 | Approved as static/reduced-motion creative; video loop remains draft. |

| Brand gate | Pass |
| --- | --- |
| [../qa/brand-gates.md](../qa/brand-gates.md) | pass |

## Export

- Path: `outputs/onboarding-motion/CRE-02-carousel-rpg-progress/`
- Accepted file: `reduced-motion-still-01.png`
- Draft/reference: `variant-01.mp4`, `controlled-start-frame.svg`
- Integration target: carousel panel 4

## Decision

`accepted`

**Rationale:** User approved `reduced-motion-still-01.png` on 2026-05-26. Keep the generated motion video and controlled SVG start frame as draft/reference only.
