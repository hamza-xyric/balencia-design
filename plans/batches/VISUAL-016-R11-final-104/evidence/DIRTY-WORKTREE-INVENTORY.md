# R11 dirty-worktree inventory

## Authorized `origin/main` integration candidate — 2026-07-18

The founder-authorized candidate is assembled in `/private/tmp/balencia-r11-main` on `codex/r11-main-integration`, whose HEAD and fetched `origin/main` are both `601f575ac16d7beef00df540958c1ea3eed78677`. The original dirty `hifi-build` worktree remains untouched and unstaged.

The exact NUL-delimited pre-stage manifest contains **759 paths**: 196 under `balencia-screens/`, 194 under `Balencia-New-Screens/`, and 369 under `plans/`. Relative to `origin/main`, 24 are tracked modifications and 735 are additions; there are no deletions, renames, submodules, symlinks, or executable files. The sorted path-list SHA-256 is `bfc1b53c32fa2570610ba8936f473fc60c88849c1bdf43dd603227ebe1305f24`.

The candidate is **15.35 MiB** excluding this self-describing inventory file. Its content-manifest SHA-256 is `003b08c4a72c6b7dea2d26f0a363613d05504bdc78b7a78a29af0beed5633f04`, computed over the other 758 sorted `per-file SHA-256 + TAB + path + LF` records after mechanical removal of legacy trailing whitespace/excess EOF blank lines required by `git diff --cached --check`. The only files over 1 MiB are the four explicitly accepted hi-fi PNG assets and `h1-acceptance-final-v4.json`; all are below the authorized 2 MiB ceiling. Secret-pattern, banned-path, file-type, mode, and dependency-closure scans are clean.

The candidate deliberately excludes `Balencia-New-Screens/screens/**`, `Archive/2026-07-06/routes.csv`, and `Balencia-New-Screens/work/validate-redesign.mjs`. That legacy validator hard-depends on the two retired inputs. Current-source 104/104 coverage is instead enforced by `npm run verify:routes` and the dedicated R11 verifier's exact `src/data/screens.ts` ↔ hi-fi registry proof.

The 552-file record below is retained as historical pre-authorization evidence. It described dirty files eligible atop `hifi-build`; it was never safe to transplant onto `origin/main` because it omitted clean route/registry/kit/data dependencies.

Snapshot command: `git status --porcelain=v1 --untracked-files=all` at observed HEAD `5e933f6`.

## Snapshot totals

| Set | Total | Tracked modified | Untracked |
|---|---:|---:|---:|
| Entire dirty worktree after the pre-authorization packet and waiver correction | 4,424 | 178 | 4,246 |
| Current proposed certified-source scope | 552 | 126 | 426 |
| Explicitly outside proposed R11 scope | 3,872 | 52 | 3,820 |

The current 552-file pre-authorization candidate is 13.63 MiB. Its sorted path-list SHA-256 is `461ff14df335142cd735ab1cbffcbf254106f7aa85df294c64db231fb7d4f206`. To avoid a self-referential digest, the content manifest covers the other 551 files and excludes this inventory file itself; its SHA-256 is `e1443648e809fc43e6717851edeb27766efb1ce9fb7df1238dbb235bd026c12d`, computed over sorted `path + NUL + per-file SHA-256` records. The immediately preceding 542-file/pre-batch checkpoint was 13.59 MiB with content-manifest `91aa9b7381b406a6e97e81131751daf2032c5913e26ba15e03630b80b6e07d6f`. These are inventory checkpoints, not the final staged manifest; source-side R11 harness preparation may change the final count/digests within the declared policy.

## Tracked dirty entries outside R11 (52)

These remain untouched and unstaged:

```text
AGENTS.md
CLAUDE.md
balencia-screens/.claude/skills/balencia-visual-prototype/SKILL.md
framework/AGENTS.md
framework/CHANGELOG.md
framework/CLAUDE.md
framework/FRAMEWORK.md
framework/README.md
framework/START-HERE.md
framework/VERSION
framework/starter/.agents/skills/forgeflow-runtime-profiles/SKILL.md
framework/starter/.claude/commands/runtime-profiles.md
framework/starter/AGENTS.md
framework/starter/CLAUDE.md
framework/starter/runbooks/close-batch.md
framework/starter/runbooks/gateway-router.md
framework/starter/runbooks/glm-workflow-worker.md
framework/starter/runbooks/pre-development-check.md
framework/starter/runbooks/runtime-profiles.md
framework/starter/runbooks/saved-workflows.md
framework/starter/runbooks/start-batch.md
framework/starter/runbooks/verify.md
framework/starter/runbooks/worker-task-packets.md
framework/starter/scripts/glm-worker.sh
framework/templates/batch-template.md
framework/templates/capabilities/README.md
framework/templates/capabilities/SKILL.md
framework/templates/capabilities/claude-saved-workflow.md
framework/templates/capabilities/hooks.settings.json
framework/templates/capabilities/subagent.md
framework/templates/teams/README.md
framework/templates/verification-matrix.md
framework/templates/worker-task-packet.md
framework/verify/portability-check.mjs
memory/MEMORY.md
memory/feedback_agent-workflow-rules.md
memory/project_source-hierarchy.md
memory/project_workspace-map.md
memory/reference_verify-commands.md
plans/BIOS-DEV-MASTER-PROMPT.md
plans/batches/BIOS-006-life-areas-lcm/BATCH.md
plans/batches/ROADMAP.md
runbooks/close-batch.md
runbooks/gateway-router.md
runbooks/glm-workflow-worker.md
runbooks/pre-development-check.md
runbooks/runtime-profiles.md
runbooks/saved-workflows.md
runbooks/start-batch.md
runbooks/verify.md
runbooks/worker-task-packets.md
yhealth-app
```

`yhealth-app` is a dirty submodule and forbidden. Only read-only `git -C yhealth-app diff --check` is permitted.

## Untracked/excluded groups

| Group | Entries | Disposition |
|---|---:|---|
| Intermediate/debug visual evidence under prior `VISUAL-*` batches or VISUAL-001 raster baselines | 3,175 | leave untracked; R11 retains only canonical family JSON/text and regenerates final captures |
| Superseded `BVF-2026-07-10/**` and `BAL-VIS-FINAL-01-ground-audit/**` | 214 | leave untracked; current VISUAL-001 authority supersedes them |
| Browser state: root and prototype `.playwright-cli/**` | 169 | leave untracked; never commit browser profiles/snapshots |
| Framework/tooling/skills/hooks/config | 151 | unrelated; leave untouched |
| `Archive/**` | 100 | historical and read-only; leave untracked |
| Other plans | 58 | BIOS, Forgeflow, visual-rollout prompt experiments, and other non-R11 planning remain unstaged |
| Other root files | 4 | unrelated; leave unstaged |

Two superficially related exclusions are deliberate:

- `balencia-screens/.claude/skills/balencia-visual-prototype/SKILL.md` is tooling guidance, not product/handoff source; its current dirty rewrite still instructs verification on stale dev `:3001`, so it belongs in a separate lane-tooling reconciliation rather than the certified source SHA.
- `plans/prompts/balencia-visual-rollout/**` is a frozen A1-era prompt-construction package whose resume checkpoint and server guidance are historical. The current continuation prompt, VISUAL-001 authority, and R11 batch supersede it.

The grouped counts plus the 52 tracked entries equal the 3,872-entry excluded set. A fresh inventory must be generated immediately before staging; any new path is excluded by default unless it matches `COMMIT-SCOPE.md` and is required by a named R11 output.

## Safety assertions

- No normalization, deletion, cleanup, stash, reset, or restore is authorized.
- No excluded file is required to become clean before R11.
- Git staging must use an exact generated manifest, never `git add .`, `git add -A`, or a broad root path.
- After staging, compare the staged list against this inventory and the scope policy; any mismatch is a hard stop.
