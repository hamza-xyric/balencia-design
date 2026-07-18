# Balencia hi-fi Figma revision prompt

Date: 2026-07-07

Use this prompt for the next Figma-backed revision pass over `Balencia-New-Screens/hifi-screens/`.

```text
You are working in /Users/hamza/Desktop/balencia-design.

Objective:
Revise the hi-fi mobile specs in `Balencia-New-Screens/hifi-screens/` against the Balencia Figma file:
https://www.figma.com/design/WDbGM90Tqp4NoZI6fWJvyN/Balencia?node-id=0-1&p=f&t=RyDK7kyiPXGue9BO-0

Use the Figma MCP first. Inspect node `0:1` and drill into the visible screen groups before editing. If the MCP server cannot handshake, record the failure and proceed from the user-supplied screenshots only, clearly marking that as the evidence tier.

## Runtime and model mix

- Orchestrator/editor: Codex GPT-5.5, reasoning effort xhigh.
- Reviewer agents: Codex GPT-5.5, reasoning effort xhigh, split by screen family.
- GLM worker: GLM 5.2 via `scripts/glm-worker.sh` or the project Workflow bridge only for ideation drafts, variant sketches, and bulk first-pass suggestions.
- GLM output is evidence, never durable truth. Codex must verify it against Figma, local specs, canon, route truth, safety, consent, and data-honesty rules before any text lands in a hi-fi spec.
- Do not send secrets or private user data to GLM. For visual ideation, use screen names, component descriptions, and non-sensitive design observations only.

## Required multi-agent roles

1. Codex orchestrator
- Owns file edits, ledgers, source hierarchy, and final verification.
- Reads `AGENTS.md`, `Balencia-New-Screens/canon/COMPACT-CANON.md`, `Balencia-New-Screens/canon/COMPONENT-CATALOG.md`, `_HIFI-LEDGER.md`, and the target hi-fi specs.

2. Figma MCP reviewer
- Uses Figma MCP metadata/screenshots to name frames, tab states, component groups, spacing, colors, and missing states.
- Produces frame-specific evidence, not generic design advice.

3. Codex GPT-5.5 xhigh screen-family reviewers
- Auth/onboarding reviewer: `03`, `03b`, `04`, `05`, `05b`, `07`, `08`, `66`.
- Home/domain reviewer: `12`, `16`, `24`, `41`.
- Nutrition/workout reviewer: `26`, `27`, `28`, `29`, `56`, `58`, `70`.
- Chat/social reviewer: `74`, `75`, `76`, `77`, `99`.

4. GLM 5.2 ideation worker
- Produces 2-3 possible layout/copy directions per family:
  - exact Figma-faithful
  - premium Balencia-polished
  - dense operational/pro-user
- Must not edit files. Must not invent routes, metrics, medical claims, or new data sources.

5. Codex trust/safety reviewer
- Checks every change for consent controls, source chips, export/revoke/delete, crisis support where relevant, and no unsupported certainty.

## Figma visual direction to carry through

- Default shell for the Figma-backed screens is warm light, not dark-only: `#FFFFFF`/paper surface, blush peach corner atmosphere, soft pastel cards, subtle 1px borders, and gentle shadows.
- Brand action color remains `#FF5E00`: primary CTA fill, active stepper dots, active segmented tabs, add buttons, and current-day/calendar selections.
- Green is the health/nutrition/completion language: nutrition card imagery, protein/water cards, success chips, completed plans.
- Purple is reserved for CIA/AI/direct coaching signals: AI cards, coaching style, projections, chat/coach affordances.
- Use compact mobile cards with 12-16px radii, not oversized nested cards. Cards should feel like native iOS dashboard modules.
- Auth screens use labeled rounded inputs with leading icons, password-eye toggles, social login pills, password strength lines, checkbox consent, and bottom guest/sign-in links.
- Onboarding uses a 5-step orange progress stepper: Goal, Mode, Assessment, My Plan, Preferences. Keep the screen title and CTA aligned to the visible Figma flow.
- Home uses a friendly dashboard shell: `Good Morning, Amira`, CIA/bot prompt card, metric sparkline cards, feature carousel/cards, Today's Actions rows, and pinned missions.
- Domain feature surfaces use pastel 2-column cards with domain illustration slots and small diagonal-arrow affordances.
- Nutrition uses top macro stat cards, segmented tabs (`Analytics`, `Plan`, `Recipes`, `History`, `Today`), empty-state cards, hydration, meal history calendar, and analytics chart states.
- Workouts use top metric cards, segmented tabs (`Workout`, `My Plan`, `Weekly`, `Calendar`, `Analytics`), plan-completed, exercise list, weekly progress, calendar legend, and analytics chart states.

## Editing rules

- Preserve route headers and live-route/no-live-route truth.
- Preserve CIA naming in canonical docs even if the Figma artwork still uses a legacy AI-coach label.
- Add Figma evidence as a `## Figma Reference Alignment` section when revising an existing file.
- If a screen is not visible in the Figma file, do not pretend it is. Use the Figma design language only and mark it as "language-derived, no direct frame evidence."
- Keep data honesty concrete: real, low-confidence, honest-null, named source, freshness, scope, export, revoke, delete.
- No generic filler, no fake metrics, no unsupported diagnosis, no manipulative gamification.

## Verification

Run or record:
- `rg -n "\bSIA\b" Balencia-New-Screens/hifi-screens Balencia-New-Screens/_MASTER-LEDGER.md`
- Run the repository's forbidden generic-placeholder sweep across `Balencia-New-Screens/hifi-screens` without embedding the forbidden phrases in this prompt file.
- Review the changed files manually for route drift, Figma drift, and consent/safety drift.
```

## Current caveat

During the 2026-07-07 edit session, the Figma MCP connector was attempted twice and timed out during handshake. The first revision pass therefore used the user-supplied Figma screenshots as visual evidence and encoded this prompt so the next pass can re-run MCP inspection when the connector is healthy.

During the later 2026-07-07 MCP retry, the connector reached the file but returned an edit-access error for node `0:1` instead of metadata. Debug UUID: `70fbf888-1be9-4da6-abac-b63a1203e515`. The second revision pass therefore also used the screenshot-derived prompt direction as the evidence tier and did not make live Figma claims.
