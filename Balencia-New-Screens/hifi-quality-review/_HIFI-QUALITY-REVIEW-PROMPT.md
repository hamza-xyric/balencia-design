# Balencia hi-fi quality review prompt

Date: 2026-07-07

Use this prompt before creating production-copy variants, duplicated screen packs, or downstream implementation tickets from the numbered specs in `Balencia-New-Screens/hifi-screens/`.

```text
You are working in /Users/hamza/Desktop/balencia-design.

Objective:
Run a review-only quality gate over `Balencia-New-Screens/hifi-screens/` and verify that the current hi-fi specs fully account for:
- `Balencia-New-Screens/Balencia-Glass-Redesign-Plan (1).md`
- `Balencia-New-Screens/canon/COMPACT-CANON.md`
- `Balencia-New-Screens/canon/COMPONENT-CATALOG.md`
- `Balencia-New-Screens/_MASTER-LEDGER.md`
- `Balencia-New-Screens/hifi-screens/_HIFI-LEDGER.md`
- `Balencia-New-Screens/hifi-screens/_FIGMA-MCP-REVISION-PROMPT.md`
- The local source specs in `Balencia-New-Screens/screens/`
- Every target spec in `Balencia-New-Screens/hifi-screens/*.md`

This is a review gate, not a rewrite pass. Do not edit hi-fi screen specs unless the user explicitly asks for fixes after the report. Produce a clear readiness verdict before any copies are made.

## Source hierarchy and known conflict

1. `Balencia-Glass-Redesign-Plan (1).md` sections 0-6, `COMPACT-CANON.md`, and `COMPONENT-CATALOG.md` define the glass-dark v1 source of truth: dark-only, warm-dark base, selective glass, semantic inner-glow, CIA naming, data honesty, states, motion, accessibility, and premium/done criteria.
2. `_MASTER-LEDGER.md` and each screen header define route truth, including live-route and no-live-route status.
3. `_HIFI-LEDGER.md` defines conversion inventory, hand-converted reference files, asset needs, run log, and prior gate evidence.
4. `_FIGMA-MCP-REVISION-PROMPT.md` defines the later Figma-backed alignment request and its caveats.

Important: the Figma revision prompt introduced screenshot-derived warm-light direction for visible Figma-backed screens, while the glass plan and compact canon remain dark-only glass v1. Treat warm-light Figma alignment as an evidence-tier exception that must be explicitly documented per affected screen. Flag any unlabelled theme drift, any silent replacement of glass-dark canon, or any live-Figma claim unsupported by actual MCP metadata.

## Evidence tiers

- Tier A: live Figma MCP metadata/screenshots from node `0:1` and drilled visible screen groups.
- Tier B: user-supplied screenshots plus `_FIGMA-MCP-REVISION-PROMPT.md` when MCP is unavailable.
- Tier C: local plan, canon, ledgers, source specs, and hi-fi specs only.

If the Figma MCP still cannot provide metadata, record the failure and use Tier B/C only. Current recorded caveats:
- Earlier 2026-07-07 MCP attempts timed out during startup.
- Later 2026-07-07 MCP retry reached the file but returned an edit-access error for node `0:1`; debug UUID `70fbf888-1be9-4da6-abac-b63a1203e515`.

Do not make live Figma claims unless Tier A evidence is available in this review session.

## Required reviewers

1. Codex orchestrator
- Owns the source hierarchy, final verdict, file/report writes, and verification command results.
- Reads `AGENTS.md`, the glass redesign plan, compact canon, component catalog, master ledger, hi-fi ledger, Figma revision prompt, and representative source specs before scoring.

2. Source and planning reviewer
- Checks whether the produced hi-fi package follows the plan's 5-by-5 loop intent, per-screen template, consistency mechanism, and definition of premium/done.
- Flags missing documentation, stale caveats, ledger contradictions, and unclear evidence tiers.

3. Visual system and component reviewer
- Checks dark glass canon, documented warm-light Figma exceptions, component names, semantic glow meaning, 60/30/10 color roles, typography, spacing, radii, data-viz treatment, state coverage, motion, and accessibility.

4. Route, IA, and implementation-readiness reviewer
- Checks every route header against `_MASTER-LEDGER.md`, no-live-route truth, source screen inheritance, cross-screen navigation, asset slots, screen IDs, and whether the spec is ready to hand to implementation or copy production.

5. Trust, safety, and copy-readiness reviewer
- Checks CIA naming, Mission terminology, data honesty, provenance, source freshness, consent, export/revoke/delete controls, crisis support where relevant, report/block flows, and no unsupported medical, financial, or certainty claims.

GLM may be used only for breadth suggestions or checklist ideation. GLM output is evidence, never durable truth, and must be verified against the local source hierarchy before inclusion.

## Audit procedure

1. Inventory the package.
- Confirm 104 hi-fi screen files exist, one per `_MASTER-LEDGER.md` row.
- Confirm `_HIFI-LEDGER.md` reflects all files, hand-converted reference screens, asset needs, Figma caveats, and run-log status.
- Confirm screen IDs, names, and source files are stable before copy production.

2. Build the review checklist from source.
- Extract requirements from the glass plan's locked decisions, design language, per-screen template, working process, and definition of premium/done.
- Extract canonical component names and usage rules from `COMPONENT-CATALOG.md`.
- Extract cross-cutting safety, consent, data honesty, and voice rules from `COMPACT-CANON.md`.

3. Review every hi-fi spec.
- Header: ID, name, source file, route(s), tab/shell, and live-route/no-live-route truth match the ledgers.
- Source inheritance: functional content and IA still match the local source spec unless a documented Figma evidence tier justifies the change.
- Figma alignment: revised screens include `## Figma Reference Alignment`; non-visible screens say "language-derived, no direct frame evidence" if using Figma design language.
- Visual system: glass-dark canon is followed, or warm-light Figma treatment is explicitly scoped as an evidence-tier exception.
- Components: canonical component names are used verbatim; any new component is marked `NEW:` with rationale.
- Data honesty: every metric has real, low-confidence, and honest-null behavior plus source/provenance and freshness.
- Trust and control: health data, photos, voice, third-party data, chat/social, and reports expose consent state plus export/revoke/delete or report/block where relevant.
- Safety: mood, stress, journal, wellbeing, medication, social, and crisis-adjacent surfaces have calm safety resources and avoid gamifying distress.
- States: default, loading/skeleton, empty, error, success, disabled, offline/stale where relevant, and reduced-motion are specified.
- Copy readiness: CIA voice is concrete, mission terminology is canonical, no generic filler remains, no fake metrics are present, and copy can be lifted into the next production-copy pass without guessing.

4. Review by screen family.
- Auth/onboarding: `03`, `03b`, `03c`, `03d`, `03e`, `04`, `05`, `05b`, `06`, `07`, `08`, `66`.
- Home/CIA/domain: `09`, `10`, `11`, `12`, `16`, `20`, `24`, `41`, `48`, `68`, `72`.
- Fitness/nutrition/health data: `26`, `27`, `28`, `29`, `44`, `49`, `55`, `56`, `57`, `58`, `70`, `84`, `90`, `96`.
- Wellbeing/safety: `37`, `38`, `45`, `52`, `53`, `54`, `60`, `63`, `89`, `93`.
- Social/chat/community: `39`, `40`, `46`, `47`, `64`, `74`, `75`, `76`, `77`, `82`, `83`, `91`, `94`, `95`, `99`.
- Account/system/tail: all remaining screens, including settings, billing, paywall, force update, app rating, help, reports, media, and system states.

## Scoring rubric

Score 100 points:
- Source and plan coverage: 15
- Visual system and Figma evidence discipline: 15
- Component catalog fidelity: 10
- Route, IA, and implementation readiness: 10
- Data honesty and provenance: 15
- Consent, safety, and non-manipulation: 15
- States, motion, accessibility: 10
- Copy-production readiness: 10

Grade caps:
- Any Critical finding: package is Blocked for copy production.
- Any High finding: affected screens are Blocked; package cannot be marked Ready without explicit waiver.
- Any unlabelled warm-light/dark-canon conflict: High minimum.
- Any `SIA` hit, fabricated metric, unsupported diagnosis, missing live-route truth, or missing consent controls on sensitive data: Critical.
- Missing verification command results: verdict cannot exceed "Ready with review gaps."

## Findings format

Write findings as:

| ID | Severity | Screen/file | Requirement source | Evidence | Why it matters | Recommended fix | Copy-blocking |
|---|---|---|---|---|---|---|---|
| HQR-001 | Critical/High/Medium/Low | `NN-file.md` | plan/canon/ledger/Figma tier | exact local evidence | user/product risk | concise fix | yes/no |

Severity definitions:
- Critical: unsafe, dishonest, route-breaking, source-hierarchy-breaking, or blocks copy production globally.
- High: blocks one or more screens from copy production.
- Medium: should be fixed before implementation, but copy can proceed with clear note.
- Low: polish, wording, or documentation cleanup.

## Deliverables

Create or refresh:
- `Balencia-New-Screens/hifi-quality-review/REPORT.md`
- `Balencia-New-Screens/hifi-quality-review/findings-ledger.md`
- `Balencia-New-Screens/hifi-quality-review/copy-readiness-checklist.md`

The report must include:
- Evidence tier used for this session.
- Overall verdict: `Ready`, `Ready with waivers`, `Ready with review gaps`, or `Blocked`.
- Score and grade.
- Screen-family score table.
- Top copy-production blockers.
- Source-hierarchy conflicts.
- Verification commands run and exact pass/fail summaries.
- Recommendation: proceed to copies or pause for fixes.

## Required verification

Run or record:

```bash
rg -n "\bSIA\b" Balencia-New-Screens/hifi-screens Balencia-New-Screens/_MASTER-LEDGER.md
node Balencia-New-Screens/work/validate-redesign.mjs --json
find Balencia-New-Screens/hifi-screens -maxdepth 1 -type f -name "*.md" | wc -l
rg -n "^## Figma Reference Alignment" Balencia-New-Screens/hifi-screens
rg -n "TODO|TBD|FIXME|REVIEW-NEEDED" Balencia-New-Screens/hifi-screens Balencia-New-Screens/hifi-screens/_HIFI-LEDGER.md
```

Also run the repository's forbidden generic-placeholder sweep against `Balencia-New-Screens/hifi-screens` without embedding the forbidden phrase list in this prompt or in the review report. Cite the rule source or script used.

Manual review must explicitly cover:
- Route drift.
- Figma evidence drift.
- Glass-dark versus warm-light exception drift.
- Consent/safety drift.
- Data-honesty drift.
- Copy-production readiness.

## Exit criteria before making copies

Do not proceed to copy production until:
- All Critical findings are fixed.
- All High findings are fixed or explicitly waived by the user with screen IDs.
- `SIA` sweep is clean.
- Generic-placeholder sweep is clean.
- Route/live-route truth is stable.
- Evidence tiers and Figma caveats are documented.
- `_HIFI-LEDGER.md` and review deliverables agree on package status.
- Final recommendation says `Ready` or `Ready with waivers`.
```
