<!-- Self-review of the Production Framework. Audit + prioritized recommendations.
     This file changes nothing in framework/ — it is the spec for a future build session.
     Author: framework self-review · Date: 2026-05-31 · Reviews: FRAMEWORK.md, README.md, templates/. -->

# Framework — Review & Recommendations

**Date:** 2026-05-31 · **Scope:** audit only (no `framework/` files were modified to produce this) · **Target model for fixes:** copy-the-folder, self-contained (not a plugin).

> **The question this answers.** *Is there a clear, crisp guide for the framework — and will it survive being copied out of the balencia-design repo, where it has no memories, no plans, and none of the referenced files?*
>
> **Verdict.** The guide is strong. **Portability is the real weakness.** The framework today is a *map that points at territory it does not carry*: `FRAMEWORK.md` names capabilities and paths that live *outside* this folder, so copying it elsewhere leaves them dangling. The fixes below make the folder self-contained and self-activating without changing the method.

---

## 1. What's strong (keep as-is)

- **`FRAMEWORK.md` is well-architected.** Part A = 8 moves + 13 principles (zero project-specific nouns — fully general). Part B = the Balencia case study with real paths as evidence. Part C = the on-ramp (§C1), failure playbook (§C3), batch-sizing (§C4), capability engineering (§C11), and the swap checklist (§C12). Internal cross-references are accurate.
- **`README.md`** is a clean quickstart with the spine, the on-ramp `cp` sequence, and the eight non-negotiables.
- **`templates/` covers every artifact type** named in §C10, each with `<PLACEHOLDER>` tokens and a "how to use" comment.
- **All six reviewer personas exist** in `templates/teams/` — `strategist`, `brand-guardian`, `competitive`, `content-trust`, `interaction-qa`, `release-readiness`. *(Correction: an exploratory pass reported `content-trust.md` as missing. It is present. No action.)*
- **Two generic verify scripts ship** (`templates/verify/consistency-check.mjs`, `verify-template.mjs`).

---

## 2. The core problem — "map without territory"

`FRAMEWORK.md` references concrete capabilities and paths that the `framework/` folder does **not** contain. When the folder is copied into a fresh project (or onto another machine), these break. Verified against the live file:

| Referenced in `FRAMEWORK.md` (line) | In `framework/`? | Effect when copied out of this repo |
|---|---|---|
| `.claude/skills/research-first-workflow` (L33) — the on-ramp says build this **first** | ❌ only a blank `SKILL.md` skeleton | No grounding skill in the new project; must rebuild from scratch |
| `/handoff`, `/clear`, `/start-handoff` (L59, 132, 223, 254) — the survivability loop | ❌ not shipped | The mechanism that *preserves context across sessions* is absent |
| `~/.claude/.../memory/*.md` (L132) — the memory system | ❌ no scaffold | The exact "no memories" gap you named has no starting point |
| `~/.claude/plans/next-session-handoff.md` (L86, 132, 512) | ✅ template `next-session-handoff.md` | OK — covered |
| `~/.claude/CLAUDE.md` (L392) | n/a (illustrative) | OK if labeled |
| Part B real paths (`app_design 3/`, `balencia-screens/`, …) | n/a (case study) | OK, but label "illustrative — you won't have these" |

**Good news — the source material to ship from already exists locally**, so shipping is *generalize-and-place*, not build-from-scratch:
- `.claude/skills/research-first-workflow.md` (internally "CORE-02 v2.1 | Adapted for Balencia")
- `~/.claude/commands/handoff.md`
- `~/.claude/commands/start-handoff.md`

---

## 3. Secondary gaps

| # | Gap | Why it matters |
|---|-----|----------------|
| G1 | **No self-activating entry point** (no `CLAUDE.md`/`AGENTS.md` at framework root) | Nothing makes a fresh agent *act on* the method — it's passive paper. Claude Code auto-loads `./CLAUDE.md` / `./.claude/CLAUDE.md` and honors `@path` imports at launch, so a self-activating file genuinely works — this is the right lever, and matches the "like a CLAUDE.md" intuition. |
| G2 | **No one-screen `START-HERE` / index** | Reading order and "what do I do first" are buried in README prose. |
| G3 | **No memory scaffold** | §C11.7 *describes* a taxonomy but ships no `MEMORY.md` + fact-file skeleton. |
| G4 | **No VERSION / CHANGELOG** | A seeded project can't record which framework version/method produced it — provenance *is* the "what we did" record you want to survive. |
| G5 | **No "what's NOT in this folder" section, and no self-verify** | The framework preaches verify-gates and honesty but has neither for itself. |

---

## 4. Recommendations (the future build, prioritized)

All target the **copy-the-folder, self-contained** model. P0 closes the portability gap; P1 sharpens the guide; P2/P3 are dogfooding and polish.

### P0 — Make it self-contained

**P0.1 · Ship the four chosen capabilities as *working* files.** These are distinct from the empty `templates/capabilities/*` skeletons (which stay as templates for building *new* capabilities). Proposed layout — a ready-to-drop payload so one copy lands a working setup:

```
framework/starter/                          # NEW — copy into a new project root
├── .claude/
│   ├── skills/research-first/SKILL.md       # from .claude/skills/research-first-workflow.md (strip Balencia)
│   └── commands/
│       ├── handoff.md                        # from ~/.claude/commands/handoff.md (de-user-specific paths)
│       ├── start-handoff.md                  # from ~/.claude/commands/start-handoff.md
│       └── onboard.md                        # NEW — walks the §C1 on-ramp interactively
├── memory/
│   ├── MEMORY.md                             # index + frontmatter schema + "live code wins" rule
│   └── examples/{user,feedback,project,reference}-example.md
└── CLAUDE.md                                 # self-activating root (P0.2)
```

- **`research-first` skill** — base on the existing `research-first-workflow.md`; keep Query→Execute→Synthesize→Apply, the source-quality table, the "3+ sources, prefer <12 months, state limitations" rule; remove Balencia adaptation. The `description` is the trigger ("…use before any strategic or architectural decision…").
- **`/handoff` + `/start-handoff`** — copy the existing commands; replace hard-coded user paths with project-relative ones; they already pair with `templates/next-session-handoff.md`.
- **`/onboard`** — new slash command that runs §C1 interactively: fill `CLAUDE.md` → run research-first → author the founding brief via the questionnaire → equip → build domain models → stand up empty ledgers → batch plan. Uses `AskUserQuestion` at each decision and writes artifacts from `templates/`.

**P0.2 · Make it self-activating** (the "like a CLAUDE.md" point). Ship `framework/starter/CLAUDE.md` whose body tells the agent on session start: *this project follows the Production Framework — read `FRAMEWORK.md` Part A, run `/onboard` if the on-ramp isn't done, honor the rules below.* Wire memory via an `@memory/MEMORY.md` import so committed memory loads every session. Also add a short `framework/CLAUDE.md` at the framework root so opening the framework folder itself orients an agent ("you are reading the framework; here's how to use and extend it").

**P0.3 · Memory that travels** (the real antidote to "loses memories"). Recommend the **repo-committed `memory/` + CLAUDE.md `@import`** pattern over machine-local auto-memory (`~/.claude/projects/<id>/memory/`, which does **not** travel with the repo). Ship: the `MEMORY.md` index, the per-fact frontmatter schema (`type: user|feedback|project|reference`), the `[[name]]` linking convention, and the rule *"facts are point-in-time; when memory contradicts live code, trust the code and log the drift."*

**P0.4 · Close the references in `FRAMEWORK.md` + add a Dependencies section.** Repoint the dangling `~/.claude/...` / `/handoff` / `research-first-workflow` mentions to the shipped `framework/starter/...` copies. Add a **"What this folder assumes vs ships vs you build"** section — *assumes:* Claude Code + git; *ships:* the four capabilities + templates + the guide; *you build:* your domain models + project-specific skills. Label Part B's real paths "illustrative — your project won't have these."

### P1 — Make the guide crisp and provenanced

- **P1.1 · `framework/START-HERE.md`** (one screen): *New project →* `cp -r framework <project>/` then run `/onboard`. *Returning →* read your handoff. *Want the method →* `FRAMEWORK.md` Part A. *Building a capability →* `templates/capabilities/`. Include a one-line file-map (every file + when to use it).
- **P1.2 · `framework/VERSION`** (e.g. `1.0.0`) **+ `framework/CHANGELOG.md`** so a seeded project records which framework version/method produced it.

### P2 — Dogfood the verify discipline

- **P2.1 · `framework/verify/portability-check.mjs`** — scans a target project for dangling references: every skill/command/memory file the framework names exists; a `CLAUDE.md` is present; no unfilled `<PLACEHOLDER>` remains in committed artifacts. Fast, deterministic, exit 0/1. The framework preaches this gate; it should have one for itself.

### P3 — Optional polish

- **P3.1 · Worked-example fills** — one filled example beside each blank template (a filled rubric, a founding-brief excerpt) so users see target state, not just scaffold.
- **P3.2 · Plugin appendix (deferred)** — copy-the-folder was chosen, so keep a short "if you later want one-command install" appendix referencing current mechanics: a `.claude-plugin/plugin.json` + `.claude-plugin/marketplace.json`, installed via `/plugin marketplace add <owner/repo>` → `/plugin install <name>@<marketplace>`. Note: plugin skills auto-discover under `skills/<name>/SKILL.md` and are namespaced `/<plugin>:<name>`; omitting `version` makes every git commit a release. Not built now.

---

## 5. Execution checklist (for the build session you trigger later)

- [ ] P0.1 — create `framework/starter/` with the four working capabilities (base on the existing local sources)
- [ ] P0.2 — `framework/starter/CLAUDE.md` (self-activating, `@memory/MEMORY.md`) + `framework/CLAUDE.md` (framework-root orientation)
- [ ] P0.3 — `framework/starter/memory/` scaffold (index + schema + 4 example facts)
- [ ] P0.4 — edit `FRAMEWORK.md`: repoint dangling refs, add "assumes / ships / you build", label Part B paths illustrative
- [ ] P1.1 — `framework/START-HERE.md` + file-map
- [ ] P1.2 — `framework/VERSION` + `framework/CHANGELOG.md`
- [ ] P2.1 — `framework/verify/portability-check.mjs`
- [ ] P3 — (optional) worked-example fills; plugin appendix
- [ ] Update `README.md` on-ramp to a single `cp -r framework <project>/` + `/onboard`, and re-run `portability-check.mjs` until green

---

## 6. Appendix — verified facts behind this report

- **Dangling-reference lines** confirmed via `grep -n` in `FRAMEWORK.md`: L33, 59, 86, 132, 223, 254, 392, 512.
- **`framework/` inventory:** root = `FRAMEWORK.md`, `README.md`, `templates/` (no root `CLAUDE.md`). `templates/capabilities/` holds 7 skeleton files (18–54 lines each — templates, not working capabilities). `templates/teams/` holds all 6 personas + README. No `MEMORY.md`, no shipped skills/commands anywhere under `framework/`.
- **Local source files for shipping** confirmed to exist: `.claude/skills/research-first-workflow.md`, `~/.claude/commands/handoff.md`, `~/.claude/commands/start-handoff.md`.
- **Claude Code mechanics** (current): `./CLAUDE.md` / `./.claude/CLAUDE.md` auto-load each session and walk up the tree; `@path` imports expand at launch (→ P0.2 / P0.3 are sound). Auto-memory lives at `~/.claude/projects/<id>/memory/` and is machine-local — it does **not** travel with a repo, which is why P0.3 recommends committed memory + `@import`.
