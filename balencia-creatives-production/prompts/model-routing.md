# Higgsfield model routing

Defaults for Balencia packages. Always confirm with `models_explore` before first use — parameters and `medias[].roles` change by model.

**Status:** reviewed and approved for CP-01+ (2026-05-26). Preflight: 719 credits, plan `plus`.

## Preflight snapshot (2026-05-26)

| Model | Output | Aspect ratios (subset) | Credits | Confirmed params |
| --- | --- | --- | --- | --- |
| `marketing_studio_image` | image | 1:1, 3:2, 2:3, 9:16, 16:9 | ~18 / image | `quality`: fast \| max-quality |
| `soul_cast` | image | 1:1, 2:3, 3:2, 9:16, 16:9, 4:3 | ~0.75 / image | `quality`: basic \| high; text-only SIA |
| `nano_banana_pro` | image | 1:1 … 21:9 (see explore) | ~12.5 / image | `resolution` 1K\|2K\|4K; up to 4 ref images |
| `seedance_2_0` | video | 1:1, 3:2, 2:3, 9:16, 16:9 | ~2.25 / second | `duration` 4–15s; `sound` on\|off; refs optional |

Re-check `soul_2`, `kling3_0`, `marketing_studio_video` via `models_explore` before CP-01 motion or CP-02 refined SIA briefs.

## Quick reference

| Asset need | Tool | Default model | Notes |
| --- | --- | --- | --- |
| SIA avatar / character (one-off) | `generate_image` | `soul_cast` | Text-only character; no Soul training unless user requests |
| SIA avatar (refined one-off) | `generate_image` | `soul_2` | With reference `medias` |
| Reusable SIA identity | `show_characters` train | Soul Character | 5–20 photos, ~10 min; explicit user request only |
| Product / UI still, food, lifestyle | `generate_image` | `marketing_studio_image` | Commercial-quality stills |
| Top detail, diagrams, badges | `generate_image` | `nano_banana_pro` | 4K-capable; badges, icons |
| Motion carousel panel | `generate_video` | `seedance_2_0` | Reference-driven motion |
| Multi-shot / audio motion | `generate_video` | `kling3_0` | When model supports scene beats |
| UGC-style product clip | `generate_video` | `marketing_studio_video` | Call `show_marketing_studio` first when required |

## By package

| Package | Primary models |
| --- | --- |
| `sia-identity` | `soul_cast`, `soul_2`, `nano_banana_pro` |
| `onboarding-motion` | `marketing_studio_image`, `seedance_2_0` |
| `domain-content` | `marketing_studio_image`, `nano_banana_pro` |
| `media-content` | `marketing_studio_image` |
| `gamification` | `nano_banana_pro` |
| `empty-system` | `nano_banana_pro` |
| `provider-logo` | _none — official assets_ |

## Variant count

| Priority | Suggested `count` |
| --- | --- |
| P0 signature | 3–4 |
| P1 content | 2–3 |
| P2 polish | 1–2 |

## Cost discipline

1. `get_cost: true` on first prompt per model/brief
2. Iterate prompt before increasing `count`
3. Log credits in generation ledger

## Adjustments

If the server returns `adjustments`, note fallback model/ratio in the brief and ledger — do not silently discard.
