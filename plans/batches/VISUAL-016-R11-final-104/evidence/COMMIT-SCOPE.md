# R11-AUTH-01 — authorized one-SHA `main` integration scope

## Recorded authorization

The founder supplied the following instruction in this Codex task on 2026-07-18:

```text
git commit and push the balencia screens design into main
```

Sol interprets this as authorization to stage the dependency-closed visual-design policy below in an isolated worktree based directly on the latest fetched `origin/main`, create exactly one commit:

```text
feat(visual): finalize 104-screen Balencia handoff
```

and push that exact commit to `origin/main` only as a non-force fast-forward. It includes no merge/cherry-pick of the 53-commit `hifi-build` history, tag, amend, second commit, reset, stash, clean, unrelated deletion, submodule normalization, Figma/Railway/backend/deployment action, or any publication other than the requested Git push.

The earlier dirty-only policy was valid only for a commit atop `hifi-build`. It is superseded here because `origin/main` lacks the hi-fi route, registry, screens, data, and supporting kit. Omitting those clean dependencies would create a broken and falsely certified snapshot.

## Included product/source paths

The current file contents of the following dependency-closed prototype paths are eligible, whether they were tracked, untracked, clean, or dirty on `hifi-build`:

```text
balencia-screens/**
```

This is a source snapshot, not a directory dump. Only Git-tracked project files plus current files under `src/**`, `scripts/**`, and the four accepted `public/hifi-assets/**` PNGs are eligible. Explicit exclusions are `.claude/**`, `.playwright-cli/**`, `.next/**`, `node_modules/**`, `output/**`, `dev/logs/**`, environment files, browser state, caches, generated runtime output, and any unlisted public asset. Existing official `public/logos/**` files may remain as inherited `origin/main` dependencies; unchanged files are not restaged.

## Included specs and visual authority

```text
Balencia-New-Screens/*.md
Balencia-New-Screens/canon/**
Balencia-New-Screens/hifi-screens/**
Balencia-New-Screens/hifi-quality-review/**
Balencia-New-Screens/build-progress/BUILD-LEDGER.md
Balencia-New-Screens/build-progress/KIT-CHEATSHEET.md
Balencia-New-Screens/build-progress/remediation-2026-07/REMEDIATION-LEDGER.md
Balencia-New-Screens/build-progress/remediation-2026-07/WAIVERS.md
Balencia-New-Screens/build-progress/remediation-2026-07/R0/**/*.md
Balencia-New-Screens/build-progress/remediation-2026-07/R0/*.json
Balencia-New-Screens/build-progress/remediation-2026-07/R0/*.txt
Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/**
plans/codex-continuation-prompt.md
plans/next-session-handoff.md
```

Inside the Balencia authority paths, Markdown, JSON, text, scripts, and provenance are eligible. PNG/JPG/JPEG/WebP/GIF files, `.DS_Store`, logs, and command-output files are excluded except for the four named prototype assets because R11 regenerates final canonical captures. The superseded `BVF-2026-07-10/**`, old `screens/**`, Figma packets, historical screenshots/audit tree, and `work/**` remain excluded. The legacy redesign validator is not transplanted because it hard-depends on those retired screens and `Archive/2026-07-06/routes.csv`; current-source 104/104 equality is enforced by `verify:routes` and `verify-r11-final.mjs` instead.

## Included family-batch record

For `plans/batches/VISUAL-001-*` through `VISUAL-015-*`, include:

- every Markdown contract, worker packet/output, review, asset disposition, and verification log;
- every accepted `*.sha256` sentinel manifest;
- only the following canonical machine JSON files:

```text
VISUAL-003-seven-screen-pilot/evidence/foundation-sentinels.json
VISUAL-004-A1-auth-entry/evidence/a1-after.json
VISUAL-004-A1-auth-entry/evidence/a1-interactions.json
VISUAL-005-A2-auth-recovery/evidence/a2-after.json
VISUAL-005-A2-auth-recovery/evidence/a2-interactions.json
VISUAL-006-B1-cia-chat-voice/evidence/b1-after.json
VISUAL-006-B1-cia-chat-voice/evidence/b1-interactions.json
VISUAL-007-C1-today-missions/evidence/c1-strict.json
VISUAL-007-C1-today-missions/evidence/c1-interactions.json
VISUAL-008-D1-profile-settings-core/evidence/d1-final-strict.json
VISUAL-008-D1-profile-settings-core/evidence/d1-verifier.json
VISUAL-009-D2-profile-commercial/evidence/strict-7-final.json
VISUAL-009-D2-profile-commercial/evidence/d2-verifier-final.json
VISUAL-010-E1-life-intelligence/evidence/e1-strict-final.json
VISUAL-010-E1-life-intelligence/evidence/e1-acceptance.json
VISUAL-011-F1-health-fitness-nutrition/evidence/f1-strict-final-v2.json
VISUAL-011-F1-health-fitness-nutrition/evidence/f1-acceptance-final.json
VISUAL-012-F2-health-care-media/evidence/f2-strict-final-v2.json
VISUAL-012-F2-health-care-media/evidence/f2-acceptance-final-v2.json
VISUAL-013-G1-domains-finance-growth/evidence/g1-strict-final-v5.json
VISUAL-013-G1-domains-finance-growth/evidence/g1-acceptance-final-v7.json
VISUAL-014-H1-social-community/evidence/h1-strict-final-v4.json
VISUAL-014-H1-social-community/evidence/h1-acceptance-final-v4.json
VISUAL-015-I1-system-media/evidence/i1-strict-final.json
VISUAL-015-I1-system-media/evidence/i1-acceptance-final.json
```

The paths above are relative to `plans/batches/`. All earlier pass/debug JSON, draft verifier files, intermediate/baseline/failed screenshots, and duplicated capture directories are excluded.

## Included R11 source-side record

The certified-source commit may include the R11 batch contract, verification matrix, authorization/inventory/scope/environment documents, frozen worker packets, and the dedicated source-side R11 verifier under `balencia-screens/scripts/verify-*.mjs`.

Final strict JSON/PNG captures, reviews, matrices, certificate, final handoff, waiver disposition, and dry-run are generated only after the source commit exists. They record `certified_source_sha` plus their own hashes and are not falsely claimed as contained in that commit. A later evidence-only commit is outside `R11-AUTH-01` and requires separate authorization.

## Staging invariant

Before commit, Sol must generate a sorted staged-name manifest and require:

- every staged path matches this document and is required by the self-contained prototype/spec/handoff snapshot;
- no deletion, rename, submodule entry, executable-mode surprise, symlink, browser state, secret, or file over the final evidence size policy is present;
- `git diff --cached --check` passes;
- the staged tree ID and manifest digest are recorded;
- the staged path list is shown to the founder in the closeout evidence.

The four accepted prototype PNG assets and already-curated canonical family JSON may exceed 1 MiB; each must be named in the size audit and remain under 2 MiB. Every other staged file must be at most 1 MiB. If a required path falls outside this policy, stop and request revised authorization. If an eligible path is unnecessary for the final package, it may remain unstaged; authorization is a ceiling, not a requirement to stage everything.

Immediately before push, fetch `origin/main` and require it to equal the commit parent. Push is `git push origin <certified_source_sha>:main` without `--force`; any remote movement is a hard stop and requires rebuilding the integration commit on the new parent.

## Explicit exclusions

- `yhealth-app` and every submodule mutation
- root `AGENTS.md`, `CLAUDE.md`, framework, runbooks, memory, skills, hooks, agent config, and Forgeflow adoption work; `balencia-screens/.claude/**` is also excluded
- BIOS/mobile and other nonvisual plans
- `Archive/**`, `.craft-build/**`, root/browser `.playwright-cli/**`
- superseded `BVF-2026-07-10/**`, `BAL-VIS-FINAL-01-ground-audit/**`, and `plans/prompts/balencia-visual-rollout/**`
- intermediate/debug visual evidence not explicitly selected above
- any file that appears after authorization outside the declared policy

## Snapshot note

The 552-file dirty-only pre-authorization checkpoint in `DIRTY-WORKTREE-INVENTORY.md` is historical and explicitly non-transplantable to `origin/main`. Sol must recalculate and record the exact dependency-closed staged manifest in the clean integration worktree before the one commit. Post-SHA evidence is a separately hashed workspace package, not part of that staged manifest.
