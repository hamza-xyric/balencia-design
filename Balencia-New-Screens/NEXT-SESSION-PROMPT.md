# Next Session Prompt - Build Balencia Hi-Fi Screens in Prototype

Copy this prompt into Claude Code after attaching the Figma/mock screenshot direction.

```text
You are working in:

/Users/hamza/Desktop/balencia-design

Use Claude Code with Fable as the orchestrator. If the current model is not Fable, switch to Fable before beginning. Start a concrete `/goal` for the build session and use explicit quality loops for every phase and batch. Use a multi-agent approach with GLM 5.2 as the primary bulk build/drafting worker under Fable, Sonnet for complex implementation and review, and Haiku for cheap read-only discovery/sweeps. Keep Fable as the single source-of-truth planner, editor, verifier, and final reviewer.

Objective:
Build the Balencia hi-fi mobile screen package into the `balencia-screens/` Next.js visual prototype, using the 104 approved hi-fi specs in `Balencia-New-Screens/hifi-screens/`.

The user has attached screenshot(s) showing the Figma/mock visual direction. Treat attached screenshot(s) as Tier B visual reference only unless this session obtains live Figma MCP metadata or screenshots. Do not claim live Figma/Tier A evidence unless you actually capture it in this session.

## Current Truth

- Hi-fi package status: Ready with waivers.
- Review report: `Balencia-New-Screens/hifi-quality-review/REPORT.md`
- Findings ledger: `Balencia-New-Screens/hifi-quality-review/findings-ledger.md`
- Copy readiness: `Balencia-New-Screens/hifi-quality-review/copy-readiness-checklist.md`
- Hi-fi inventory: `Balencia-New-Screens/hifi-screens/_HIFI-LEDGER.md`
- Image slot inventory: `Balencia-New-Screens/hifi-screens/_IMAGE-SLOTS.md`
- Numbered hi-fi specs: 104.
- Validator truth: `node Balencia-New-Screens/work/validate-redesign.mjs --json` reports `screenFiles: 104`, `ledgerRows: 104`, `ledgerPass: 104`, no uncovered routes.
- Known waivers:
  1. Figma/mock direction is Tier B/C only unless live MCP succeeds now.
  2. Raw markdown count in `hifi-screens/` is 107 because three approved meta docs remain; numbered specs are 104.

## Read First

Read these before editing:

1. `AGENTS.md`
2. `balencia-screens/AGENTS.md`
3. `balencia-screens/.claude/skills/balencia-visual-prototype/SKILL.md`
4. `Balencia-New-Screens/Balencia-Glass-Redesign-Plan (1).md`
5. `Balencia-New-Screens/canon/COMPACT-CANON.md`
6. `Balencia-New-Screens/canon/COMPONENT-CATALOG.md`
7. `Balencia-New-Screens/hifi-quality-review/REPORT.md`
8. `Balencia-New-Screens/hifi-quality-review/findings-ledger.md`
9. `Balencia-New-Screens/hifi-quality-review/copy-readiness-checklist.md`
10. `Balencia-New-Screens/hifi-screens/_HIFI-LEDGER.md`
11. `Balencia-New-Screens/hifi-screens/_IMAGE-SLOTS.md`
12. The attached screenshot(s), as Tier B visual direction.
13. `balencia-screens/src/app/globals.css`
14. `balencia-screens/src/data/screens.ts`
15. Existing `balencia-screens/src/components/` primitives and current route/page structure.

Important source hierarchy:

1. `Balencia-New-Screens/hifi-screens/*.md` are the screen-level build specs.
2. `COMPACT-CANON.md` and `COMPONENT-CATALOG.md` govern design language and component naming.
3. The attached screenshot(s) guide visual polish, rhythm, density, and premium Figma/mock direction, but remain Tier B unless MCP succeeds.
4. `balencia-screens/` code is the implementation target and may reveal existing reusable components. Work with it; do not rewrite everything blindly.

## Runtime Profile

Record this at the top of the session notes or build ledger:

```yaml
loop_primitive: /goal
runtime_profile: fable-orchestrated-multiagent
orchestrator_role: Claude Code Fable orchestrates through Forgeflow artifacts
worker_backend: GLM 5.2 primary bulk worker under Fable; Sonnet targeted implementation/review; Haiku read-only inventory/sweeps
provider: Claude native plus explicit GLM worker bridge if configured
model: Fable orchestrator/planner; GLM 5.2 bulk drafts; Sonnet complex implementation and review; Haiku discovery and verification sweeps
endpoint_class: native Claude plus explicit GLM workflow worker
goal_statement: build scoped Balencia hi-fi screens into the visual prototype with verified route truth, glass canon, data honesty, accessibility, and no legacy coach token
quality_loop: ground -> plan -> delegate/build -> verify -> fix -> re-verify -> persist
verify_command: npm run check from balencia-screens/
evidence_path: Balencia-New-Screens/build-progress/ or an equivalent build ledger created this session
stop_condition: all scoped batch screens render, verification passes, progress ledger updated, and next handoff written
```

## Goal and Quality Loops

Fable must begin by defining the active `/goal` in the session notes or build ledger: scope, batch target, acceptance criteria, verification commands, evidence path, and stop condition. Do not let worker agents redefine the goal.

For each phase and each build batch, Fable runs this quality loop:

1. **Ground** - Re-read the relevant specs, route truth, canon, existing code, and known waivers for the batch.
2. **Plan** - Slice the batch into worker task packets with explicit files, screens, acceptance criteria, and forbidden changes.
3. **Build** - Use GLM 5.2 for bulk drafts, Sonnet for complex implementation/fixes, and Haiku for read-only support.
4. **Verify** - Run targeted checks, inspect rendered screens, scan for CIA/legacy-token/data-honesty/accessibility issues, and record evidence.
5. **Fix** - Repair any failed gate before widening scope. Route failures to Sonnet when judgment or code repair is needed.
6. **Re-verify** - Repeat checks after fixes. Do not advance on stale verification.
7. **Persist** - Update the build ledger, screen status, waivers, screenshots/evidence links, and next task packet.

Loop rule: no phase or batch is accepted after a single build pass. Each batch needs at least one verification pass and, when issues are found, a fix/re-verify pass before Fable marks it complete. If a blocker remains after reasonable loops, Fable records the blocker, exact command/output summary, affected files/screens, and next action instead of downgrading the standard.

## Model Routing and Worker Policy

Fable is the orchestrator. Fable owns source hierarchy, batch planning, worker task packets, architecture decisions, file edits, verification acceptance, ledger updates, and final handoff. Worker output is input evidence, not durable truth, until Fable reviews and applies it.

Use **GLM 5.2** as the main production worker under Fable supervision when the GLM workflow bridge is configured and smoke-tested. Assign GLM 5.2 the high-volume work: first-pass screen component drafts, repetitive screen family scaffolds, route/spec mapping tables, mock-data fixture drafts, component usage matrices, variant copy/rhythm proposals, and batch-by-batch implementation notes. GLM 5.2 must stay inside explicit task packets and must not independently mark work accepted, update ledgers as final truth, or override canon/spec requirements.

Use **Sonnet** for judgment-heavy implementation and review: shared component architecture, tricky React/Next.js/TypeScript work, Tailwind/design-token refactors, accessibility fixes, trust/safety/data-honesty review, visual polish decisions, verification failure diagnosis, and any screen with health, social, voice, crisis-adjacent, consent, export/revoke/delete, report/block, or low-confidence behavior.

Use **Haiku** for fast read-only support: repo inventory, `rg` sweeps, route/spec matching, component discovery, baseline issue summaries, screenshot observation notes, checklist creation, placeholder-copy scans, legacy token scans, and verification-output summaries. Haiku should not make durable edits.

If GLM 5.2 is unavailable, Fable must record that in the build ledger and route bulk drafting to Sonnet or do the pass directly. Do not silently pretend GLM evidence exists.

## Non-Negotiables

- Prototype is visual-only: no API calls, no auth logic, no backend state, no new state libraries.
- Do not introduce the legacy coach token. Use CIA in visible UI, data, component names, and new code.
- Preserve route truth from `_HIFI-LEDGER.md` and `src/data/screens.ts`.
- Build polished 390x844 mobile compositions inside the existing desktop review shell.
- Use existing design-system/layout/chart/domain components where they fit.
- Add new reusable components only when repeated or clearly required by specs.
- Use lucide-react icons only.
- Use design tokens/Tailwind semantic classes from `globals.css`; avoid raw one-off hex values in components.
- Every screen must include the visible states and trust controls specified in the hi-fi spec: real, low-confidence, honest-null, disabled, offline/stale, consent, export/revoke/delete/report/block where relevant.
- Health, photo, voice, social, AI, and third-party data surfaces must show consent state and concrete controls.
- Mood, stress, journal, check-in, medication, crisis-adjacent, social, and voice surfaces must avoid manipulative gamification and keep support/safety access calm and reachable.
- The attached screenshot direction should improve premium polish, compact rhythm, and Figma/mock fidelity. It cannot override safety, route truth, CIA naming, data honesty, or glass canon without an explicit scoped exception already present in the spec.

## Multi-Agent Roles

Use Task agents or the configured GLM workflow worker where available. If a worker path is unavailable, Fable runs the same pass directly and records the fallback.

1. **Fable Orchestrator**
   - Model: Fable.
   - Owns source hierarchy, batch plan, edits, verification, final acceptance, and ledger/handoff updates.
   - Starts and maintains the active `/goal`.
   - Runs the quality loop for every phase and batch.
   - Reads all required sources.
   - Decides architecture after inspecting existing `balencia-screens/`.
   - Writes worker task packets and acceptance criteria before delegating.
   - Integrates worker output only after verification.

2. **Haiku Inventory Scout**
   - Model: Haiku.
   - Read-only.
   - Maps the 104 hi-fi specs to current `balencia-screens/src/app/` routes and `src/data/screens.ts`.
   - Identifies existing pages/components that can be reused or refactored.
   - Produces route/spec/component inventories and gap lists for Fable.

3. **Sonnet Architecture and Design-System Agent**
   - Model: Sonnet.
   - Read-only first, implementation suggestions second.
   - Audits `globals.css`, `components/design-system`, `components/layout`, `components/charts`, `components/domain`, and `components/screens`.
   - Maps canonical components from `COMPONENT-CATALOG.md` to existing React components.
   - Proposes per-screen components, shared hifi primitives, route registry updates, batch order, and missing shared components before screen work starts.

4. **Visual Direction Agent**
   - Model: Sonnet for synthesis; Haiku may do first-pass screenshot observation notes.
   - Uses attached screenshot(s) as Tier B reference.
   - Extracts concrete visual guidance: theme mode, surface density, card rhythm, radius/shadow language, chart treatment, nav/header treatment, CTA styles, and typography hierarchy.
   - Must state which observations are screenshot-derived and which are local-canon-derived.

5. **GLM 5.2 Bulk Screen Build Worker**
   - Model: GLM 5.2.
   - Primary worker for high-volume screen drafting under Fable.
   - Builds assigned screen-family drafts only, using explicit Fable task packets.
   - For every screen, read the target hi-fi spec first.
   - Use hardcoded mock data, not API calls.
   - Draft reusable fixture data, component props, route updates, and screen layouts for Fable review.
   - Do not touch unrelated screens, invent source truth, or mark acceptance.

6. **Sonnet Implementation Specialist**
   - Model: Sonnet.
   - Handles complex screens, shared primitives, fragile TypeScript, responsive layout fixes, and verification failures.
   - Refines or repairs GLM drafts before Fable accepts them.
   - Takes over any batch where GLM output is too generic, unsafe, or inconsistent with canon.

7. **Trust, Safety, and Data Honesty Agent**
   - Model: Sonnet.
   - Reviews every batch for CIA naming, source chips, consent, export/revoke/delete, report/block, low-confidence/honest-null behavior, and unsafe claims.
   - Blocks build acceptance on fabricated data, unsupported diagnosis, or hidden controls.

8. **Accessibility and Interaction Agent**
   - Model: Sonnet.
   - Reviews every batch for 44px targets, screen-reader labels, focus order, reduced motion, contrast, disabled states, keyboard/touch behavior, and readable chart alternatives.

9. **Verification Agent**
   - Model: Haiku for read-only output summaries; Sonnet for failure diagnosis; Fable runs/accepts final gates.
   - Runs or coordinates verification under Fable.
   - Checks `npm run check` from `balencia-screens/`.
   - Runs targeted greps for legacy coach token and generic placeholder copy.
   - Captures visual evidence via browser/Playwright screenshots when possible.

## Build Strategy

Do not try to hand-build 104 screens in one giant edit. Build all screens through small verified batches.

Phase 0 - Intake and architecture:

1. Confirm the repo state and read required docs.
2. Inspect existing `balencia-screens/` architecture.
3. Create or update a build progress ledger, for example `Balencia-New-Screens/build-progress/BUILD-LEDGER.md`.
4. Decide the implementation architecture:
   - Prefer reusable hifi primitives and per-screen render modules over one massive component.
   - Keep existing `/screens/[id]` review route working.
   - Keep or improve existing per-route pages only when useful.
   - Preserve `src/data/screens.ts` as the review-shell registry.
5. Run baseline verification:
   - from repo root: `node Balencia-New-Screens/work/validate-redesign.mjs --json`
   - from repo root: `rg -n "\bSIA\b" Balencia-New-Screens/hifi-screens Balencia-New-Screens/_MASTER-LEDGER.md balencia-screens/src`
   - from `balencia-screens/`: `npm run check`
6. If baseline `npm run check` fails before edits, record the failure and classify it as baseline debt before implementing.

Phase 1 - Foundation batch:

Build or refine shared prototype foundations before mass screen work:

- Hifi phone-screen shell tuned for 390x844/375x812 review.
- Theme/surface primitives for dark glass and scoped warm-light Figma/mock shells.
- Top bars, bottom nav, section headers, cards, stat cards, provenance chips, CIA insight card, buttons, inputs, tabs, sheets, honest-null/error/skeleton/offline states.
- Chart primitives needed across batches: trend line, progress ring, macro bars, heatmap, radar/constellation, simple bars.
- Trust/data controls primitives: source chip, consent sheet, safety card, report/block sheet.
- Verify these foundations with one or two representative screens before continuing.

Phase 2 - Pilot batch:

Implement a small pilot set that proves the architecture across screen families:

- `03-welcome-sign-up.md`
- `07-cia-onboarding-conversation.md`
- `12-home-screen.md`
- `16-life-areas-overview.md`
- `26-fitness-workouts-dashboard.md`
- `28-nutrition-diet-dashboard.md`
- `75-direct-chat.md`
- `91-social-feed.md`

Run `npm run check`, inspect visually, and fix the shared primitives before expanding.

Phase 3 - Full build batches:

Proceed family by family. Suggested order:

1. Auth and onboarding: `01`, `02`, `03`, `03b`, `03c`, `03d`, `03e`, `04`, `05`, `05b`, `06`, `07`, `08`, `65`, `66`.
2. CIA, voice, conversations: `09`, `10`, `11`, `51`, `74`, `75`, `76`, `77`, `79`, `99`.
3. Today and missions: `12`, `13`, `14`, `15`, `41`, `44`, `45`, `59`, `61`, `73`, `97`.
4. Life intelligence and profile: `16`, `17`, `19`, `20`, `48`, `50`, `68`, `72`, `83`, `84`, `90`, `92`, `93`, `96`.
5. Health and wellbeing: `26`, `27`, `28`, `29`, `49`, `52`, `53`, `54`, `55`, `56`, `57`, `58`, `60`, `62`, `63`, `70`, `86`, `87`, `88`, `89`.
6. Domains, finance, career, relationships, growth: `18`, `30`, `31`, `32`, `33`, `34`, `35`, `36`, `37`, `38`.
7. Social/community/account/system/media/tail: `21`, `22`, `23`, `24`, `25`, `39`, `40`, `42`, `43`, `46`, `47`, `64`, `67`, `69`, `71`, `78`, `80`, `81`, `82`, `85`, `94`, `95`, `98`.

After each batch:

- Complete the Fable quality loop: verify, fix, re-verify, then persist.
- Update the build ledger.
- Mark screen statuses only after they render and pass checks.
- Run at least targeted type/lint checks; run full `npm run check` before closing each meaningful batch.
- Capture screenshots for representative screens.

## Per-Screen Build Checklist

For each screen:

1. Read the matching hi-fi spec in `Balencia-New-Screens/hifi-screens/`.
2. Confirm route/no-route truth from `_HIFI-LEDGER.md`.
3. Identify existing React components to reuse.
4. Build the screen visually with hardcoded mock data.
5. Preserve the screen's dominant focal moment.
6. Include provenance chips and honest states.
7. Include all privacy/data/safety controls the spec names.
8. Ensure 44px hit targets and screen-reader labels for glyph-only controls.
9. Respect reduced motion.
10. Avoid introducing old coach naming.
11. Check that the screen fits inside the phone frame without incoherent overlap.
12. Add/adjust mock data in `src/data/mock.ts` or a typed local fixture module, not scattered inline across every page.
13. Update `src/data/screens.ts` status only after the screen is genuinely implemented.

## Visual Direction From Screenshot(s)

At the start of the session, after reading the attached screenshot(s), write a short local note in the build ledger:

- screenshot count
- visible screen families
- visual DNA extracted
- which screens are directly represented
- which screens are language-derived only
- conflicts with glass-dark canon, if any
- how the build will resolve those conflicts

Do not add this as live Figma evidence. It is Tier B screenshot/mock direction.

## Verification Gates

Run from repo root:

```bash
node Balencia-New-Screens/work/validate-redesign.mjs --json
rg -n "\bSIA\b" Balencia-New-Screens/hifi-screens Balencia-New-Screens/_MASTER-LEDGER.md balencia-screens/src
```

Run from `balencia-screens/`:

```bash
npm run check
```

For visual QA, start the dev server and inspect representative screens:

```bash
npm run dev
```

Use Playwright/browser screenshots if available. Check at least:

- one auth/onboarding screen
- one Today/Home screen
- one CIA/chat screen
- one health/nutrition/workout screen
- one social/community screen
- one settings/system screen

## Acceptance Criteria

The build is acceptable only when:

- All 104 numbered hi-fi specs have corresponding rendered prototype screens or explicitly documented justified utility/modal handling.
- The `/screens/[id]` review route can access every numbered screen.
- `src/data/screens.ts` reflects current implementation status.
- `npm run check` passes from `balencia-screens/`.
- Legacy coach-token sweep is clean in new code.
- No generic placeholder copy is introduced.
- The build ledger records batches, verification, screenshots/evidence, and remaining waivers.
- A next-session handoff is written with the exact next batch if not all 104 are complete.

## Important Warnings

- Do not claim live Figma/Tier A evidence from the attached screenshot(s).
- Do not mass-rewrite the prototype without first mapping current components and routes.
- Do not mark all screens complete because specs exist; completion means rendered, visually inspected, and verified.
- Do not let worker agents edit ledgers independently. Fable orchestrator owns durable truth.
- Do not hide missing data behind fake metrics. Honest-null is a designed state.
- Do not gamify distress, medication, crisis, or sensitive social situations.

Begin now by reading the required sources, inspecting the attached screenshot(s), recording the runtime profile and screenshot evidence tier, then proposing the Phase 0 architecture and first pilot batch before editing code.
```
