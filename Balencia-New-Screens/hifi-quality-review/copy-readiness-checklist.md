# Balencia hi-fi copy-readiness checklist

Date: 2026-07-07

Use this checklist before creating production-copy variants, duplicated screen packs, implementation tickets, or Figma build tasks from `Balencia-New-Screens/hifi-screens/`.

Current status: **Ready with waivers**.

## Required Unblock Checks

- [x] HQR-001 fixed: `12`, `16`, `26`, `28`, and `56` each include an explicit Tier B/C caveat inside `## Figma Reference Alignment`.
- [x] HQR-002 fixed: `_HIFI-QUALITY-REVIEW-PROMPT.md` moved out of `hifi-screens/`; raw legacy-token and TODO-style sweeps no longer hit the prompt.
- [x] No Critical findings are open.
- [x] All High findings are fixed or explicitly waived.
- [x] `_HIFI-LEDGER.md`, `REPORT.md`, and `findings-ledger.md` agree on readiness status.
- [x] Final review verdict is `Ready with waivers`.

## Verification Commands

Run and record before proceeding:

```bash
rg -n "\bSIA\b" Balencia-New-Screens/hifi-screens Balencia-New-Screens/_MASTER-LEDGER.md
node Balencia-New-Screens/work/validate-redesign.mjs --json
find Balencia-New-Screens/hifi-screens -maxdepth 1 -type f -name "*.md" | wc -l
rg -n "^## Figma Reference Alignment" Balencia-New-Screens/hifi-screens
rg -n "TODO|TBD|FIXME|REVIEW-NEEDED" Balencia-New-Screens/hifi-screens Balencia-New-Screens/hifi-screens/_HIFI-LEDGER.md
```

Recorded results:

- [x] Legacy coach-token sweep is clean: no matches.
- [x] `validate-redesign.mjs --json` reports `ledgerRows: 104`, `ledgerPass: 104`, `screenFiles: 104`, no missing files, no false PASS rows, and no uncovered live routes.
- [x] Raw markdown count is `107`; accepted waiver because the remaining three meta docs are `_FIGMA-MCP-REVISION-PROMPT.md`, `_HIFI-LEDGER.md`, and `_IMAGE-SLOTS.md`. Numbered hi-fi spec count is `104`.
- [x] Figma alignment sections found: 25. Supplemental evidence-tier check: `missingEvidenceTier: []`.
- [x] TODO/TBD/FIXME/REVIEW-NEEDED sweep is clean: no matches.
- [x] Generic-placeholder sweep is clean across 104 numbered hi-fi specs using `genericPhraseChecks` from `Balencia-New-Screens/work/validate-redesign.mjs`.

## Per-Screen Copy Gate

For each numbered hi-fi screen:

- [x] Header ID, screen name, source file, route/no-live-route truth, and tab/shell match `_HIFI-LEDGER.md` and `_MASTER-LEDGER.md`.
- [x] Functional content and IA still inherit from the local source spec unless a documented evidence-tier exception explains the change.
- [x] Figma alignment language does not imply live Tier A evidence.
- [x] Warm-light direction is explicitly scoped as a Figma evidence exception where used; otherwise the screen follows glass-dark v1 canon.
- [x] Component names use canonical `COMPONENT-CATALOG.md` names, or new primitives are marked `NEW:` with rationale.
- [x] Visible copy uses CIA, Missions, Mission Board, Life Power, Domain Stats, Squads, and Communities terminology correctly.
- [x] No unsupported diagnosis, certainty claim, fake metric, fabricated quote, or unproven personalization claim remains from this fix pass.
- [x] Each targeted metric/sensitive proof surface has real-data, low-confidence, and honest-null behavior with source/freshness.
- [x] Sensitive data surfaces include consent state plus export, revoke, delete, report, or block controls where relevant.
- [x] Wellbeing, mood, stress, journal, medication, social, and crisis-adjacent surfaces avoid gamifying distress and include calm safety resources where relevant.
- [x] Default, loading/skeleton, empty, error, success, disabled, offline/stale, and reduced-motion states are specified where relevant.
- [x] Accessibility notes cover readable contrast, focus order, hit targets, screen-reader labels, and non-motion alternatives on targeted preserved references.
- [x] Production copy can proceed without the five HQR blockers.

## Family-Specific Reminders

Auth/onboarding:

- [x] Normalize obvious visible action labels during the copy pass.
- [x] Keep consent and guest-mode limitations explicit and non-coercive.

Home/CIA/domain:

- [x] Resolve Figma evidence-tier labels for `12` and `16`.
- [x] Keep Life Power and Domain Stats honest about source freshness and confidence.

Fitness/nutrition/health data:

- [x] Resolve Figma evidence-tier labels for `26`, `28`, and `56`.
- [x] Keep workouts, recipes, nutrition, labs, sleep, and biomarkers clear about provenance and confidence.

Wellbeing/safety:

- [x] Preserve calm support language.
- [x] Avoid rewards or streak pressure around distress, medication, crisis-adjacent, or mood-repair flows.

Social/chat/community:

- [x] Add low-confidence, honest-null, export, report, block, revoke/delete, and consent details on preserved reference specs before implementation tickets.
- [x] Keep proof, photos, voice, and health data sharing consent-scoped.

Account/system/tail:

- [x] Preserve billing, privacy, data export, deletion, help, report, and force-update route truth.
- [x] Confirm no system-state screen implies unavailable backend behavior.

## Proceed Decision

- [ ] Proceed with no waivers.
- [x] Proceed only with named waivers.
- [ ] Pause for fixes.

Decision owner: Hamza / product-design owner

Decision date: 2026-07-07

Waivers:

1. Tier B/C Figma evidence only; no live MCP metadata or live MCP screenshots were obtained in this fix session.
2. Raw markdown count remains 107 because three approved meta docs remain in `hifi-screens/`; numbered screen count is 104.
