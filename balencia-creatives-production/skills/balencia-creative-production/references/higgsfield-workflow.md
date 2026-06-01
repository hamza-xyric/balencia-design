# Higgsfield workflow

## Tool order

| Step | Tool | When |
| --- | --- | --- |
| 1 | `balance` | Session start / after billing error |
| 2 | `models_explore` | New model or reference roles |
| 3 | `media_upload` + `media_confirm` | Local reference files |
| 4 | `generate_image` / `generate_video` | With `get_cost: true` first |
| 5 | `job_status` | Poll pending jobs |
| 6 | `reveal_generation` / `show_generations` | Retrieve URLs if needed |

## Image defaults

- UI/product still → `marketing_studio_image`
- SIA character one-off → `soul_cast` or `soul_2` + medias
- Badges, detailed illustration → `nano_banana_pro`

## Video defaults

- Motion panel with reference still → `seedance_2_0`
- Multi-beat narrative → `kling3_0` if parameters allow
- Marketing clip → `show_marketing_studio` then `marketing_studio_video`

## Billing recovery

On `recovery_tool: show_plans_and_credits`:

```json
{ "intent": "topup" }
```

Call immediately with `recovery_tool_args`. Pause generation until resolved.

## Logging

Every job → `ledger/generation-ledger.md` with `request_id` if returned (support/debug).

## Export

Download `results.rawUrl` to:

`outputs/{package-id}/{brief-id}/variant-{nn}.{ext}`

Do not commit binaries; document path in accepted-assets.
