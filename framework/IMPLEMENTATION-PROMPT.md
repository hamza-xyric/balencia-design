<!-- Kickoff prompt for a FRESH session that implements framework/REVIEW-AND-RECOMMENDATIONS.md.
     Usage: /clear, then paste the block below (everything under "=== PASTE BELOW ===").
     Or tell the current session "execute framework/IMPLEMENTATION-PROMPT.md". -->

# Implementation Prompt — make the framework self-contained & portable

This is a ready-to-paste kickoff prompt for a fresh session. It implements the audit in
`framework/REVIEW-AND-RECOMMENDATIONS.md` (the P0→P3 recommendations).

=== PASTE BELOW ===

You are implementing the approved recommendations in `framework/REVIEW-AND-RECOMMENDATIONS.md`. The goal: make the `framework/` folder **self-contained and self-activating** so it can be copied into any new project (`cp -r framework <project>/`) and drive a high-quality build without depending on this repo's memories, plans, or external `~/.claude/` files. Model = **copy-the-folder, self-contained** (NOT a plugin). Working dir: `/Users/hamza/Desktop/balencia-design`.

## Context — read these first (absolute paths)
1. `/Users/hamza/Desktop/balencia-design/framework/REVIEW-AND-RECOMMENDATIONS.md` — the spec you are executing. Follow its §4 (P0–P3) and §5 execution checklist.
2. `/Users/hamza/Desktop/balencia-design/framework/FRAMEWORK.md` — the master guide you will edit in P0.4. The dangling references to repoint are on **lines 33, 59, 86, 132, 223, 254, 392, 512** (verified). Also read §C1 (on-ramp), §C11.7 (memory taxonomy), §C12 (swap checklist).
3. `/Users/hamza/Desktop/balencia-design/framework/README.md` — update its on-ramp in the final step.
4. `/Users/hamza/Desktop/balencia-design/framework/templates/` — existing artifact templates + `capabilities/` skeletons (these STAY as blank templates; do not fill them) + `teams/` (all 6 personas already present).
5. **Source material to generalize-and-ship from (copy, then strip project-specifics):**
   - `/Users/hamza/Desktop/balencia-design/.claude/skills/research-first-workflow.md` (header "CORE-02 v2.1 | Adapted for Balencia")
   - `/Users/hamza/.claude/commands/handoff.md`
   - `/Users/hamza/.claude/commands/start-handoff.md`
6. Plan of record: `/Users/hamza/.claude/plans/do-we-have-users-hamza-desktop-balencia-tranquil-wall.md`.

## State at start
- `framework/` is currently **untracked** in git (`git status` → `?? framework/`). FIRST recommended action: `git add framework && git commit` it as a baseline, so the implementation diff is reviewable. Confirm with the user before the first commit.
- Claude Code mechanics already verified (don't re-research): `./CLAUDE.md` and `./.claude/CLAUDE.md` auto-load every session and honor `@path` imports at launch; auto-memory (`~/.claude/projects/<id>/memory/`) is machine-local and does NOT travel with a repo — so portable memory must be repo-committed + `@import`ed.

## Decisions to flag via AskUserQuestion BEFORE writing files
1. **Shipped-payload folder name** — Recommended: `framework/starter/` (a ready-to-drop payload: `.claude/` + `memory/` + `CLAUDE.md`). Alt: `framework/capabilities/` (risks confusion with `templates/capabilities/`), or `framework/.claude/`. Reason: `starter/` reads as "copy this into a new project."
2. **On-ramp copy model** — Recommended: a single `cp -r framework <project>/` drops the whole thing, then `/onboard` runs. Alt: two copies (templates + starter). Reason: one command is crisper and matches the "copy the folder" choice.
3. **Capability file format** — Recommended: ship `/onboard`, `/handoff`, `/start-handoff` as legacy `.claude/commands/*.md` (parity with the existing two, works today) and `research-first` as `.claude/skills/research-first/SKILL.md`. Alt: all as skills (the modern merged form). Reason: parity + lowest risk.
4. **Baseline commit** — Recommended: commit `framework/` as-is first, then implement in a second commit. Confirm.

## Scope — what "done" means (from the report §5)
**P0 (mandatory — closes the portability gap):**
- P0.1 — create the shipped working payload (per decision 1). Inside it:
  - `.../skills/research-first/SKILL.md` — based on the existing research-first-workflow skill; keep Query→Execute→Synthesize→Apply, the source-quality table, and "3+ sources, prefer <12 months, state limitations"; strip Balencia specifics; `description` = the trigger.
  - `.../commands/handoff.md` + `start-handoff.md` — copy the existing commands; replace hard-coded user paths (`/Users/hamza/...`) with project-relative ones.
  - `.../commands/onboard.md` — NEW. Walks FRAMEWORK.md §C1 interactively (fill CLAUDE.md → research-first → founding brief via the questionnaire → equip → domain models → stand up ledgers → batch plan), using AskUserQuestion at each decision and writing artifacts from `templates/`.
- P0.2 — self-activating `CLAUDE.md` in the payload (tells the agent on session start: this project follows the Production Framework — read `FRAMEWORK.md` Part A, run `/onboard` if the on-ramp isn't done) with an `@memory/MEMORY.md` import; plus a short `framework/CLAUDE.md` at the framework root that orients an agent opening the framework folder itself.
- P0.3 — memory scaffold in the payload: `memory/MEMORY.md` index + `memory/examples/{user,feedback,project,reference}-example.md`, with the frontmatter schema (`type:`), the `[[name]]` linking convention, and the "facts are point-in-time; when memory contradicts live code, trust the code and log the drift" rule.
- P0.4 — edit `FRAMEWORK.md`: repoint the dangling refs (lines above) to the shipped `framework/<payload>/...` copies; add a **"What this folder assumes vs ships vs you build"** section; label Part B's real paths "illustrative — your project won't have these."

**P1 (crispness + provenance):**
- P1.1 — `framework/START-HERE.md` (one screen + a one-line file-map of every file and when to use it).
- P1.2 — `framework/VERSION` (start at `1.0.0`) + `framework/CHANGELOG.md`.

**P2 (dogfood the verify discipline):**
- P2.1 — `framework/verify/portability-check.mjs` — scans a target project: every skill/command/memory file the framework names exists; a `CLAUDE.md` is present; no unfilled `<PLACEHOLDER>` remains in committed artifacts. Pure Node, no deps, fast, exit 0/1.

**P3 (optional, ask before doing):** worked-example fills; a short deferred "plugin appendix" (mechanics: `.claude-plugin/plugin.json` + `marketplace.json`; install via `/plugin marketplace add <owner/repo>` → `/plugin install <name>@<marketplace>`; plugin skills auto-discover at `skills/<name>/SKILL.md`, namespaced `/<plugin>:<name>`).

**Final step:** update `README.md`'s on-ramp to the single-copy + `/onboard` flow, then run `node framework/verify/portability-check.mjs framework/starter` (or the chosen path) until green.

## Rules still in force (do NOT re-litigate)
- Copy-the-folder model only — no plugin packaging is built (plugin is a documented appendix at most).
- `templates/` stays templates (blank, `<PLACEHOLDER>` tokens). The NEW payload holds *working* files. Keep the two clearly separated and explained.
- Don't change the method itself — Part A's 8 moves / 13 principles are stable. You're closing the map↔territory gap, not rewriting the framework.
- Truth is the deliverable: after edits, the dangling-ref table in the report must actually be resolved — verify, don't assert.
- Plan-then-apply for anything hard to reverse; commit by explicit path; flag irreversible decisions via AskUserQuestion.

## START BY (verify clean state on entry)
```bash
cd /Users/hamza/Desktop/balencia-design
git status --short framework/
sed -n '33p;59p;86p;132p;223p;254p;392p;512p' framework/FRAMEWORK.md   # confirm the dangling refs are still where the report says
ls framework/ framework/templates/capabilities/
```
Then read the six Context files above before writing anything.

## Stop conditions
- P0 complete + `portability-check.mjs` green → commit by path → ✋ checkpoint, show the user the diff, then continue to P1/P2.
- Any decision in the "Decisions to flag" list unresolved, or any irreversible action (first commit, large `FRAMEWORK.md` rewrite) → STOP + AskUserQuestion. Do not improvise folder names or copy models.
- If a source skill/command file is missing or unexpectedly project-coupled → STOP, report it, propose the generalized version for approval before shipping.

=== END PASTE ===
