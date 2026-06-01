# Higgsfield generate loop

Prerequisite: completed brief in `briefs/{brief-id}.md` and [higgsfield-preflight.md](higgsfield-preflight.md) for the session.

## Reference uploads

When the brief uses reference files:

1. `media_upload` — local file
2. `media_confirm` — obtain UUID
3. Pass UUID in `generate_*` `medias[].value` with correct `role` from `models_explore`

## Image generation

Tool: `generate_image`

```json
{
  "params": {
    "model": "marketing_studio_image",
    "prompt": "<from brief, with style guide>",
    "count": 2,
    "aspect_ratio": "9:16"
  }
}
```

See [../prompts/model-routing.md](../prompts/model-routing.md) for model selection.

## Video generation

Tool: `generate_video`

- Motion carousel, breathing loops: `seedance_2_0` or `kling3_0` per brief
- Marketing product clips: follow `show_marketing_studio` flow when using `marketing_studio_video`

Inspect `duration` and `medias[].roles` via `models_explore` before submit.

## Poll until complete

1. `job_status` with returned `id`
2. Or `reveal_generation` / `show_generations` as needed
3. On `completed`, download from `results.rawUrl` (or `minUrl` for review) into:

`outputs/<package-id>/<brief-id>/variant-NN.ext`

## Ledger

Append row to [../ledger/generation-ledger.md](../ledger/generation-ledger.md):

- Date, Brief ID, Tool, Model, Job ID, Status, Credits, note, export path

## QA

Score with [../qa/creative-rubric.md](../qa/creative-rubric.md) and [../qa/brand-gates.md](../qa/brand-gates.md).

- **accepted** → [../ledger/accepted-assets.md](../ledger/accepted-assets.md) + batch brief notes
- **iterate** → new prompt variant, new job row
- **rejected** → document reason; do not integrate

Before accepting a final, add `outputs/<package-id>/<brief-id>/metadata.json` with:

- `brief_id`, `asset_type`, `route`, `screen`, and `placement`
- `source` and `license_or_permission`
- `job_id`, `model`, and `prompt_hash_or_note`
- `aspect_ratio`, `dimensions`, and `accepted_variant`
- `alt_text`, `reduced_motion_fallback`, and `integration_path`

## Soul Character training

Use `show_characters(action='train')` **only** when the user explicitly wants a reusable SIA identity and provides 5–20 reference photos. Otherwise use one-off `soul_cast` / `soul_2` per CQ01 direction.

## Do not

- Generate official provider logos (CP-09)
- Generate, redraw, or approximate the Balencia logo; use official logo files only
- Exceed 6 briefs per session without user approval
- Skip `get_cost` before large multi-variant runs
