# Higgsfield preflight

Run before the first generation in a workspace or after a billing error.

## MCP tools (plugin: higgsfield)

Read tool schemas under Cursor MCP descriptors before calling.

### Workspace and credits

1. `list_workspaces` — confirm active workspace if needed
2. `select_workspace` — when user specifies team/personal
3. `balance` — note available credits in batch session summary

### Model catalog

4. `models_explore` — for the chosen model ID:
   - `aspect_ratios`
   - `parameters`
   - `medias[].roles` for reference images

### Cost estimate

5. For each brief, call `generate_image` or `generate_video` with:

```json
{
  "params": {
    "model": "<model-id>",
    "prompt": "<draft>",
    "get_cost": true
  }
}
```

Log result in [../ledger/generation-ledger.md](../ledger/generation-ledger.md) with status `preflight`.

## Billing recovery

If any tool returns `recovery_tool: "show_plans_and_credits"`:

- Call `show_plans_and_credits` with `structuredContent.recovery_tool_args`
- Do not retry generation until the user resolves credits
- Show `checkout_url` or `primary_purchase_link` to the user when present

## CP-00 checklist

- [ ] Credits noted
- [ ] Default models confirmed in [../prompts/model-routing.md](../prompts/model-routing.md)
- [ ] CQ01 status recorded for CP-02 planning
