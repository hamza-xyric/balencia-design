# Write asset briefs

## Per brief

1. Copy [../briefs/_brief-template.md](../briefs/_brief-template.md) → `briefs/{brief-id}.md`.
2. Fill placement, asset type, aspect ratio, and creative direction from:
   - [../../balencia-screens-reviewed/findings/creative-opportunities.md](../../balencia-screens-reviewed/findings/creative-opportunities.md)
   - [../../Balencia/Balencia-Creatives-Reference/CREATIVE-REFERENCE.md](../../Balencia/Balencia-Creatives-Reference/CREATIVE-REFERENCE.md) as the current creative authority
   - Screen spec in `app_design 3/` when needed
3. Draft Higgsfield prompt using [../prompts/prompt-style-guide.md](../prompts/prompt-style-guide.md).
4. Pick model from [../prompts/model-routing.md](../prompts/model-routing.md).
5. Set source policy and license/permission:
   - official Balencia/provider marks use source files only
   - sensitive people/body/trust surfaces use real/licensed/owned or non-identifiable demo fixtures
   - generated imagery is allowed for abstract, food, poster, empty/system, gamification, and demo content when credible
6. Set `higgsfield_allowed: false` for CP-09 and CP-10 minimal screens.

## Link registry

Update `brief_path` in `registry/opportunities.json` only when the brief is ready for generation (or run `node scripts/build-registry.mjs` after manual JSON edit — script overwrites paths; prefer editing opportunity row by hand for `brief_path`).

## Batch file

Add a `### {brief-id}` section stub in the active `batches/CP-XX-*.md` for each brief in this session.

## Review before generate

- [ ] Must-include / must-avoid filled
- [ ] No brand-gate conflicts called out in direction
- [ ] Source policy and license/permission filled
- [ ] Official logos are referenced by source path, not generation prompt
- [ ] User approved sensitive subjects (progress photos, spirituality) if applicable
