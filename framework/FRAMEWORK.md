# The Production Framework

**A reusable, domain-agnostic method for getting the most out of AI models on serious work — and the Balencia UI/UX build that proves it.**

> One-line thesis: *Ground in real references → capture intent in one self-contained brief → build the capability layer (skills/commands/teams) so the model starts higher → give the model the context it needs → plan before doing and slice the work → build against a gated template → verify with automated gates + adversarial review → persist state so multi-session work survives.* Large, undivided tasks break; small, gated, ledgered slices compound; and the tools you build once make every future task start at a higher floor.

This document has three parts:

- **Part A — The Operating Method** (project-agnostic): eight "moves" that apply to *any* AI-driven work — design, backend, research, content, infra.
- **Part B — The Balencia Reference Implementation** (the worked case study): the concrete 7-stage UI/UX pipeline that instantiates Part A, with real file paths as evidence.
- **Part C — Reusable Mechanics & Playbooks**: the on-ramp for a new project, the **Capability Engineering** playbook (when/how to build skills, commands, teams, subagents, hooks, MCP), the feedback loops, the "what to do when the task breaks" playbook, batch-sizing, ordering, ownership, quality-bar mechanics, and the artifact taxonomy.

A `framework/templates/` folder beside this file holds copy-paste starter files for every artifact named here. To start a new project: `cp -r framework/templates <new-project>/` and fill the `<PLACEHOLDER>` tokens. See `framework/README.md` for the quickstart.

---

# Part A — The Operating Method

The method is **eight moves**. They run roughly in order on a new project, but A2 (Equip), A3 (Reference), A6 (Verify), and A7 (Persist) also run *continuously* — Equip especially is *on-demand*, triggered whenever a pattern recurs (the "rule of three"). Each move below states: the **principle**, **why it works**, the **Balencia evidence** (proof it was actually done), and **apply outside UI/UX** (how to use the same move on non-design work).

The moves map to a single spine you can say out loud:

> **Ground → Capture → Equip → Reference → Plan & Slice → Build → Verify → Persist.**

---

## A0 · Ground — research-first, before deciding

**Principle.** Before any strategic or architectural decision, research the real landscape (industry practice, competitors, prior art, constraints) and ground recommendations in cited sources — never assumptions. No "common knowledge" shortcuts on decisions that matter.

**Why it works.** AI models confidently pattern-match to plausible-but-wrong defaults. Forcing 3+ independent, recent, credibility-rated sources per major claim converts a guess into a defensible decision and exposes contradictions early, when they're cheap.

**Balencia evidence.** The curated `research-first-workflow` skill (`.claude/skills/research-first-workflow.md`, internally "CORE-02 v2.1 | Adapted for Balencia") codifies a Query → Execute → Synthesize → Apply loop with a source-quality table and a "3+ sources, prefer <12 months, state limitations" rule. `app_design 3/competitor-analysis.md` is the artifact this produced for the product.

**Apply outside UI/UX.** Before an architecture decision record (ADR), research how comparable systems solved it and cite the sources in the ADR. Before a pricing model, research the market. Before a research report, run the source-sweep first. The deliverable of A0 is always *a cited findings doc*, not a conclusion pulled from the air.

---

## A1 · Capture — one self-contained founding brief

**Principle.** Put *all* intent into a single, self-contained founding artifact (~40–50KB) before producing anything. It carries: scope (what this IS and is NOT), the vocabulary, every token/constant value, every reusable pattern, the batch plan, the explicit anti-patterns, and the acceptance checklist. Capture decisions via a **questionnaire** where every decision is marked **FINAL** (locked, do not re-litigate) or **OPEN** (uncertain, enumerated as a risk).

**Why it works.** "Build for handoff — document as if you won't be there." A self-contained brief means a fresh session (or a new teammate, or a different model) can execute with **zero tribal knowledge**. FINAL/OPEN markers stop the single most expensive failure mode: silently re-debating settled decisions and drifting scope.

**Balencia evidence.** `CODEX-SESSION-PROMPT.md` (39KB) is the founding artifact: it states scope ("This IS / This is NOT"), the full RPG vocabulary table, exact tech stack, token hex values, and per-batch assignments — self-contained. The Vision-Questionnaire pattern (FINAL/OPEN) drove decision lock-in.

**Apply outside UI/UX.** A backend service starts from a single `SERVICE-BRIEF.md` (responsibilities, contracts, data model, non-goals, error budget, anti-patterns). A research project starts from a `RESEARCH-BRIEF.md` (question, scope, source policy, what an answer must contain). Template: `templates/FOUNDING-BRIEF.md` + `templates/VISION-QUESTIONNAIRE.md`.

---

## A2 · Equip — build your capability layer (skills, commands, teams, subagents, hooks, MCP)

**Principle.** Don't just *use* an AI model — deliberately build the tooling that makes every future task start at a higher floor. Turn recurring work and proven external practice into durable **capabilities**: **Skills** (a method/expertise the model loads on demand), **Commands** (repeatable multi-step operations), **Teams** (reviewer personas that wield the skills), **Subagents / Workflows** (isolated or parallel passes), **Hooks** (automated on-event behavior), and **MCP** (connections to outside systems). The trigger is the **rule of three**: the moment you're about to do something the *third* time — or a proven best practice exists and you don't have it — stop and build the capability instead of hand-crafting it again.

**Why it works.** A capability pays back its research-and-templatization cost over every later use, and it raises the floor of the whole system: the model stops re-deriving the same method and starts executing a *tested* one with a reliable trigger. Curating from real-world best practice (instead of improvising) means each skill encodes what actually works; an explicit trigger means it fires when relevant without being asked. This is the "sharpen the axe" move — an hour spent building a `/research` skill saves that same hour on every future decision, and the quality is consistent instead of mood-dependent.

**The build loop — research → extract → templatize → test → wire.** (1) **Hunt** 3+ independent best-practice sources for the recurring problem (this is move A0 applied to your own tooling). (2) **Extract** the invariant steps, decision points, and gates. (3) **Templatize** into a `SKILL.md` (or command / subagent) with the method, variants, and gotchas. (4) **Test** on a real scenario and capture a worked example. (5) **Wire** the trigger — write the `description` so the model knows *when* to invoke it (**the description IS the trigger**), and add it to the project's capability index. The decision table (Skill vs Command vs Subagent vs Hook vs MCP), the wiring diagram, and the templates live in Part C → *Capability Engineering*.

**Balencia evidence.** Skills curated from external best-practice and *adapted*: `research-first-workflow` ("CORE-02 v2.1 | Adapted for Balencia"), `product-manager` ("EXPERT-10"), plus `senior-frontend`, `software-architect`, `ux-ui-designer`, `design-auditor`. Custom skills that encode this project's *own* methods: `figma-build-auditor` (read-only grading, with a `--deep` multi-agent fan-out + completeness critic) and `figma-build-fixer` (plan-then-apply). Commands encode the lane lifecycles (`start-session → write-briefs → preflight → generate → close-session`) and the continuity ritual (`/handoff → /clear → /start-handoff`). Teams are the six reviewer personas in `balencia-screens-reviewed/teams/*.md`. *Untapped headroom this project has not yet exploited:* hooks, custom subagents (`.claude/agents/`), and packaging it all as a distributable plugin — see Part B → Stage 7.

**Apply outside UI/UX.** A backend team builds a `/new-endpoint` command (contract → validation → handler → tests → docs), a read-only `security-reviewer` subagent, a `PostToolUse` hook that runs the formatter on every edit, and an MCP connection to the issue tracker. A research team builds a `source-vet` skill (the credibility rubric) and a `/synthesize` command. Templates: `templates/capabilities/` (`SKILL.md`, `slash-command.md`, `subagent.md`, `hooks.settings.json`, `.mcp.json`, `capability-build-checklist.md`, `plugin.json`).

---

## A3 · Reference — context engineering, source hierarchy, shared canon

**Principle.** Give the model exactly the references and assets it needs, and remove ambiguity about which source wins. Three sub-moves:
1. **Context engineering** — assemble the specs, brand assets, prior art, and registries the task requires, and point to them explicitly.
2. **Source-of-truth hierarchy** — declare an ordered list of authorities with an explicit **tie-breaker** ("when docs disagree, the live X is reality").
3. **Shared canon** — extract every reusable pattern/token/decision *once* into a canonical registry; everything else links to it and never re-defines it (DRY, anti-drift).

**Why it works.** Most AI failure on real codebases is missing or conflicting context, not missing capability. A declared hierarchy resolves conflicts deterministically; a shared canon means one change propagates everywhere instead of drifting across N copies. "A developer should be able to implement any component from this document alone."

**Balencia evidence.** Root `CLAUDE.md` declares the workspace map *and* a numbered Source Hierarchy with the tie-breaker rule. `app_design 3/_shared-patterns.md` (4,305 lines, 27 sections) is the shared canon for components/tokens/motion. In the Figma lane, `figma-build-audit/RUBRIC.md` names the authority per layer and states "**Live truth always wins ties**" — the DS Figma file is reality, a doc that disagrees is itself a finding.

**Apply outside UI/UX.** For an API: the OpenAPI spec is canon; generated clients link to it. For data work: one schema/dictionary is canon. Always answer in writing: "If two sources disagree, which one is reality?" Templates: `templates/CLAUDE.md` (hierarchy section), `templates/_shared-canon.md`.

---

## A4 · Plan-first & slice — document the plan, then batch the work

**Principle.** Write the plan before doing the work, and **decompose into small batches** (a handful of items per session), never "do it all at once." Each batch is a named, bounded unit with an explicit scope, an exit gate, and a durable deliverable file.

**Why it works — and *why large tasks break*.** A single huge task accumulates undetected inconsistency, exceeds the window of serious attention, and produces thin, rushed output where the last items are worse than the first. Small batches force decision quality per item, allow a confirmation gate at each boundary, keep each unit inside a reliable context budget, and make progress legible. **The empirical lesson of this whole project: when you hand the model everything at once, quality collapses; when you slice it, quality compounds.**

**Balencia evidence.** Every lane is batched: spec authoring in batches of 5–6 (`app_design 3/_session-prompt.md` batch table), UX audit in `B01–B18`, remediation in `U01–U09`, polish in `P00–P18`, the elevated re-review in `R01–R18`, wireframes in 17 batches, creatives in `CP-00…CP-10`, Figma conversion in pilot phases. The audit rule is explicit: "**Do not batch-review all 90 screens in one pass.**" Plans live in `~/.claude/plans/` and are written/approved before execution.

**Apply outside UI/UX.** A 200-endpoint API migration → batch by resource group. A large refactor → batch by module with a green build between each. A literature review → batch by sub-question. Templates: `templates/batch-template.md`, `templates/_progress.md`. Sizing heuristics: Part C → *Batch-Sizing*.

---

## A5 · Build — gated per-item execution under per-lane rules

**Principle.** Execute each work-item through an identical **N-phase gated template**, announcing the phase as you go, with a self-QA gate at the end. Each lane (workspace) carries its own `AGENTS.md` defining that lane's discipline, boundaries, and "definition of done."

**Why it works.** A fixed per-item template makes output uniform (so consistency-checking is mechanical), forces concrete thinking at each phase (no hand-waving), and creates natural async review points. Per-lane `AGENTS.md` files stop one lane's rules ("audit-only, never edit") from leaking into another and prevent the model from improvising boundaries.

**Balencia evidence.** `app_design 3/_session-prompt.md` defines the **8-phase gated per-screen method** (Purpose → IA → Layout+ASCII wireframe → Typography → Composition → Color Map → Interaction States → Self-QA) ending in a 16-item checklist; the full method is reproduced in Part B. Every sub-workspace has its own `AGENTS.md` (`balencia-screens-reviewed/AGENTS.md`, `balencia-screens/AGENTS.md`, `balencia-creatives-production/AGENTS.md`) with that lane's discipline and boundaries.

**Load the skill, then build.** Build *consumes* what Equip (A2) produced. Before each item, check the capability index: if a Skill teaches part of this work, load it. The per-item template is the *skeleton* (the ordered phases); Skills fill the *content* of individual phases — e.g. Stage 1's Typography phase is filled by a frontend skill, its Composition phase by a UX skill. The template guarantees structure; the skills guarantee depth.

**Apply outside UI/UX.** A "new endpoint" template: contract → validation → handler → tests → error states → docs → self-QA. A "research finding" template: claim → evidence → counter-evidence → confidence → limitation. Templates: `templates/_session-prompt.md` (generic N-phase), `templates/AGENTS.md`.

---

## A6 · Verify — automated gates + multi-role adversarial audit + elevated re-review

**Principle.** Nothing is "done" on assertion. Three layers of verification:
1. **Automated gates** — fast (<15s), deterministic, fail-fast scripts that enforce structure, copy, and token/constant purity.
2. **Multi-role adversarial audit** — a *team* of specialized reviewer personas, each viewing the work through one lens, producing evidence-backed findings (severity + category + evidence + impact + recommendation + decision status).
3. **Elevated re-review** — after the first pass and remediation, a stricter second pass against a premium bar (every dimension maxed, no finding above the smallest severity, every visible element justified).
All of it rolls up into a **living, weighted-rubric grade report** with anti-inflation **grade caps**. *Truth is the deliverable* — never inflate a grade to show progress.

**Why it works.** A single reviewer misses whole categories of risk; a journey reviewer won't catch a contrast bug, a brand reviewer won't catch a broken build. Automated gates catch regressions mechanically so humans spend judgment on taste, not typos. A weighted rubric with caps produces an honest, comparable, non-gameable health signal; the second pass finds the deeper problems that only surface once the structure is sound.

**Balencia evidence.** Automated gates: `balencia-screens/scripts/verify-{routes,assets,copy,brand,visual}.mjs` run by `npm run check`; `figma-build-audit/scripts/consistency-check.mjs`. Multi-role audit: six personas in `balencia-screens-reviewed/teams/*.md` (UX Strategist, Competitive Reviewer, Content/Trust, Brand Guardian, Mobile Interaction QA, Release Readiness Verifier) with a shared finding format and 8-dimension 1–5 rubric (`AGENTS.md`). Elevated re-review: the `a-plus-plus-review/` `R01–R18` pass — "Do not award A++ unless all eight rubric dimensions score 5, fresh evidence exists, every visible control has a clear purpose, and no unresolved finding above nit remains." Living grade: `figma-build-audit/REPORT.md` + `RUBRIC.md` (9 weighted dimensions) + dated `history/` snapshots, with grade caps ("no A− with an open High; no above-B+ with an open Critical").

**Apply outside UI/UX.** Backend: `lint + typecheck + tests + contract-verify` as the gate; reviewer personas = Security, Performance, API-contract, Operability. Research: reviewer personas = Methodologist, Skeptic (tries to refute each claim), Source-checker. Always: findings are evidence-backed and have a decision status. Templates: `templates/rubric.md`, `templates/hard-gates.md`, `templates/findings-ledger.md`, `templates/teams/`, `templates/verify/`.

---

## A7 · Persist — ledgers, memory, and handoffs so sessions survive

**Principle.** Multi-session work must survive context loss. Persist state in exactly **three places** and nowhere else:
1. **Version control** — commits record *what changed and when* (decisions, by explicit path).
2. **Machine-readable metadata/registries** — the durable index of "what exists" (route registries, ID maps, asset metadata sidecars).
3. **Plan / ledger / memory docs** — append-only **ledgers** (findings, generation, progress) as durable memory; **memory facts** for what the project *is*; a **handoff** doc for the next session.
Changes that are hard to reverse go **plan-then-apply**: a dry-run plan (zero writes) verified against live state, human-approved, then executed with before/after evidence and a re-audit. End every meaningful session with a handoff ritual.

**Why it works.** "We decided X earlier" is not recoverable across a context reset — but a git commit, a JSON entry, or a ledger row is. Append-only ledgers prevent re-discovering the same issue and enable delta queries ("what's new since last pass?"). Plan-then-apply catches false-positives in the cheap phase (a planned fix that turns out unnecessary is dropped, not executed). The handoff ritual lets the next session start cold and correct.

**Balencia evidence.** Ledgers: `findings-ledger.md` (both audit lanes, append-only with stable IDs `B01-F01`, `X-013`, `C-032`), `balencia-creatives-production/ledger/{generation-ledger,accepted-assets}.md`, `app_design 3/_progress.md` (90/90 with status + batch + date), `app_design 3/_inconsistency-report.md`. Metadata/registries: `figma-mapping.json` (`screens_frames`), `balencia-screens/src/data/screens.ts`, per-asset `metadata.json`. Plan-then-apply: the `figma-build-fixer` skill (`FIX-PLAN.md` dry run → approval → `FIX-LOG.md` with before/after + re-audit). Handoffs: `~/.claude/plans/next-session-handoff.md` (START BY git-verify / NEXT UNIT OF WORK / DECISIONS TO FLAG / STATE AT END (SHAs) / RULES STILL IN FORCE / STOP CONDITIONS) and the `/handoff → /clear → /start-handoff` commands; memory facts in `~/.claude/.../memory/*.md` with a `MEMORY.md` index. Memory rule: facts are point-in-time; **when memory contradicts live code, trust the code and log the drift.**

**Apply outside UI/UX.** Any long migration: a `_progress.md` ledger + a `next-session-handoff.md` + commits by path. Any irreversible op (data migration, prod deploy, bulk delete): dry-run plan → approve → apply → verify. Templates: `templates/findings-ledger.md`, `templates/_progress.md`, `templates/next-session-handoff.md`.

---

## A · The thirteen cross-cutting principles (quick reference)

The eight moves rest on thirteen recurring principles. Memorize these; they are the framework's backbone.

| # | Principle | One-line definition | Why it works |
|---|-----------|---------------------|--------------|
| 1 | **One founding artifact** | All intent in a single self-contained brief | Handoff with zero tribal knowledge |
| 2 | **Source-of-truth hierarchy** | Ordered authorities + explicit tie-breaker | Conflicts resolve deterministically |
| 3 | **Batch / slice discipline** | Small bounded batches, never all-at-once | Large tasks accumulate hidden defects; small ones compound quality |
| 4 | **Shared canon prevents drift** | Extract reusable patterns once; link, never copy | One change propagates; no N-way drift |
| 5 | **Per-lane AGENTS rules** | Each workspace declares its own discipline | Rules don't leak across lanes |
| 6 | **Ledgers as durable memory** | Append-only records, never deleted | No re-discovery; delta queries; accounting |
| 7 | **Multi-role adversarial audit** | Many personas, each one lens | A single reviewer misses whole risk classes |
| 8 | **Elevated re-review bar** | A second, stricter pass after remediation | Deeper defects surface once structure is sound |
| 9 | **Automated verify gates** | Fast deterministic fail-fast scripts | Mechanical catch frees humans for taste |
| 10 | **Plan-then-apply** | Dry-run → approve → apply + re-verify | False-positives die cheap; no destructive surprises |
| 11 | **Session handoffs + memory** | Distill state to a predictable doc; facts persist | Cold-start the next session, correctly |
| 12 | **Living weighted-rubric grades** | Re-scored report, letter bands, grade caps | Honest, comparable, non-inflatable health signal |
| 13 | **Equip — build the capability layer** | Turn recurring work + best practice into skills/commands/teams (rule of three) | Pays back over every reuse; raises the floor of every future task |

---

# Part B — The Balencia Reference Implementation (case study)

Balencia is a premium AI life-coaching mobile app with deep RPG gamification. Its design workspace instantiates Part A as a **7-stage production pipeline (Stages 0–6) plus a continuous capability-audit stage (Stage 7)**. Each production stage consumes the prior stage's *verified* output; the **exit gate** is the contract between stages. Stages can also loop back via gap-audits (see Part C → *Feedback Loops*).

> Read this as: "Here is exactly how the abstract method was made concrete, with the real files." To reuse on a non-design project, keep the *shape* of each stage and swap the *content*.

### Stage 0 — Discovery (strategy bootstrap) · *implements Ground (A0), Capture (A1)*
- **Purpose**: capture all design intent in one self-contained founding artifact before a single screen exists.
- **Inputs**: market/competitor research; product vision; the RPG and life-correlation domain models.
- **Outputs**: `CODEX-SESSION-PROMPT.md` (founding brief); the 5-layer source hierarchy (Strategy → Vision → Specification → Implementation → Execution); `competitor-analysis.md`; Vision Questionnaire with FINAL/OPEN markers; `RPG_SYSTEM_DESIGN.md`, `LIFE_CORRELATION_MATRIX.md`, `Features.md` (the foundational domain docs built *before* screens).
- **Exit gate**: founding artifact self-contained (all token hex, patterns, batch table, anti-patterns, checklists present); every decision FINAL or OPEN; every decision traceable to research/user-mental-model.
- **Tools/roles**: research-first skill; product owner confirms; read-only.
- **Feeds →** Stage 1.

### Stage 1 — Screen-Spec Authoring · *implements Plan & Slice (A4), Build (A5), Reference (A3)*
- **Purpose**: produce 90 self-contained screen specs via the 8-phase gated method, implementable without clarification.
- **Inputs**: `app_design 3/_session-prompt.md` (the method), founding brief, brand docs, previously completed batches (for cross-ref accuracy), backend route/schema audits.
- **Outputs**: `app_design 3/01-…md … 85-…md` (+ lettered sub-screens); `_shared-patterns.md` (canon); `_progress.md` (ledger, 90/90); `_tier-matrix.md`; `_xp-reward-table.md`; `_inconsistency-report.md`.
- **Exit gate (per screen)**: 8-phase template complete; mobile-native only (no web-isms); brand compliance (60/30/10, purple ≤2 elements); 8pt grid; ≥44pt touch targets; all 8 interaction states; cross-refs verified; new patterns extracted to `_shared-patterns.md` (never duplicated). Post-batch consistency check + ledger update.
- **Tools/roles**: AI designer authors; PM confirms batch scope.
- **Feeds →** Stage 2 (wireframes) and Stage 4 (prototype), both consume specs + canon.

### Stage 2 — Wireframes (low-fidelity HTML) · *implements Plan & Slice (A4)*
- **Purpose**: translate specs into low-fi HTML wireframes (17 batches) to de-risk IA cheaply before high-fidelity build.
- **Inputs**: `Wireframes/WIREFRAME-PROMPT.md`, `Wireframes/balencia-foundation.css` (shared CSS canon), the spec `.md` files.
- **Outputs**: `Wireframes/batch-01-…/ … batch-17-…/`; `Wireframes/AUDIT-REPORT.md` (severity-ranked findings).
- **Exit gate**: all screens accounted; foundation CSS linked with zero duplication; sentence-case; 44px targets; frame constraint; carousel/deep-link works.
- **Feeds →** the Figma DS build and the prototype.

### Stage 3 — UX Audit & Review (with A++ gate) · *implements Verify (A6)*
- **Purpose**: multi-role 90-screen audit → findings ledger → remediation → elevated A++ re-review to reach Figma-ready quality.
- **Inputs**: `balencia-screens-reviewed/{README,AGENTS,audit-config.json}`, six `teams/*.md` personas, `app_design 3/`, the live prototype at `localhost:3000`.
- **Outputs**: `findings/findings-ledger.md` (B-IDs), `accepted-improvements.md`, `deferred-decisions.md`; update batches `U01–U09`; polish `P00–P18`; A++ `R01–R18`; `a-plus-plus-review/{final-rollup,consolidated-cross-check}.md`; Playwright capture scripts in `scripts/`.
- **Exit gate**: compiled batch completeness (five-second read + primary action + emotional tone + screenshot + 8-dim rubric + findings table + decision line per screen); A++ requires all 8 dims = 5 + fresh evidence + control-purpose honesty + no finding above nit; verify commands recorded.
- **Tools/roles**: six reviewer personas; Playwright evidence; npm gates.
- **Feeds →** accepted findings drive U-batches (spec updates) + P-batches (prototype polish); opportunities feed Stage 5.

### Stage 4 — High-Fidelity Prototype (visual-only Next.js) · *implements Build (A5), Verify (A6)*
- **Purpose**: render 90+ iPhone screens in a phone frame from a design-system library — the design-to-code source of truth. Zero API/state.
- **Inputs**: spec `.md` files; brand assets; `globals.css` (token canon); `screens.ts` registry; `figma-{components,tokens}-map.json`.
- **Outputs**: `balencia-screens/` (Next.js + React + Tailwind + Code Connect); per-screen `page.tsx`; DS components each paired with a `.figma.tsx`; the five verify scripts.
- **Exit gate**: `npm run check` exits 0 (`lint → typecheck → verify:routes → verify:assets → verify:copy → verify:brand`); visual-only (no `useState`/Redux/server actions); token-first (no stray hex outside `globals.css`/`domains.ts`); spec-driven copy; every component has a `.figma.tsx`.
- **Feeds →** Stage 6 (Figma) consumes React as source of truth; Stage 5 integrates accepted creatives into `public/`.

### Stage 5 — Creative Asset Production (parallel) · *implements Build (A5), Verify (A6), Persist (A7)*
- **Purpose**: generate + QA premium visual assets via an image/video MCP, gate them, hand off into the prototype.
- **Inputs**: `creative-opportunities.md` (from Stage 3); `CREATIVE-REFERENCE.md` (brand authority); official `logos/`; `registry/{opportunities,product-decisions}.json`; `briefs/_brief-template.md`.
- **Outputs**: `batches/CP-XX-*.md`; `briefs/CRE-*.md`; `ledger/generation-ledger.md` (append-only) + `ledger/accepted-assets.md` (QA-passed only); `qa/creative-rubric.md` (8 dims) + `qa/brand-gates.md` (hard-fails); a `metadata.json` per accepted file.
- **Exit gate**: all rubric dims ≥4 + zero brand-gate hard-fails; ≤6 briefs/session; cost-preflight before generation; every job in the generation ledger; `metadata.json` for each accepted file.
- **Lifecycle commands**: `start-session → write-briefs → preflight → generate → close-session` (`balencia-creatives-production/commands/`).
- **Feeds →** accepted assets → `balencia-screens/public/`.

### Stage 6 — Figma Design-System Conversion (audit → remediate → verify) · *implements Reference (A3), Verify (A6), Persist (A7)*
- **Purpose**: port the React prototype into a paired Figma DS file + Screens consumer, governed by a living weighted-rubric grade and a read-only auditor + plan-then-apply fixer.
- **Inputs**: React components (source of truth), `globals.css`, `_shared-patterns.md`, the DS Figma file, `figma-mapping.json`, `figma-{components,tokens}-map.json`, `RUBRIC.md`/`REPORT.md`/`findings-ledger.md`.
- **Outputs**: `figma-build-audit/REPORT.md` (living grade), `findings-ledger.md` (X-/C- IDs), `RUBRIC.md` (9 weighted dims), `FIX-PLAN.md`, `FIX-LOG.md`, dated `history/<date>-<sha>.md` snapshots, `scripts/consistency-check.mjs`.
- **Exit gate**: `get_metadata` confirms node types (no assumptions); token gate (zero raw values for A+++); `consistency-check.mjs` green; grade caps enforced; re-audit after fixer shows grade rose + finding resolved + `history/` snapshot written.
- **Tools/roles**: `figma-build-auditor` (read-only), `figma-build-fixer` (plan-then-apply), Figma MCP.
- **Feeds →** a healthy graded DS feeds screen composition; integration-only gotchas (e.g. variable-rebind not propagating to pre-placed instances; opacity-strip on bind) loop back as **durable memory facts**.

### Stage 7 — Capability Audit & Equip (continuous, cross-cutting) · *implements Equip (A2)*
- **Purpose**: periodically pause production to ask "what did we hand-build 3+ times, and what proven external practice are we missing?" — then turn the answers into reusable capabilities. This stage is *not* sequential; it fires on the rule of three throughout the project.
- **Inputs**: the recurring patterns surfaced across lanes; external best-practice research (move A0 applied to tooling); the existing `.claude/skills/` index.
- **Outputs**: curated/custom **Skills** in `.claude/skills/*` (e.g. `research-first-workflow`, `product-manager`, `figma-build-auditor`, `figma-build-fixer`); per-lane **Commands** in `commands/` (the creative session lifecycle; the `/handoff` ritual); reviewer **Teams** in `balencia-screens-reviewed/teams/*`; the project `CLAUDE.md` and **Memory** facts.
- **Exit gate**: each new capability is researched (3+ sources), templatized, tested on a real scenario, and **wired with a trigger** (its `description` says *when* to invoke it); it's added to the capability index.
- **Headroom (explicitly not yet exploited in Balencia)**: **Hooks** (e.g. a `PostToolUse` formatter, a `SessionEnd` memory-write), **custom Subagents** (`.claude/agents/`), and **packaging the whole capability layer as a distributable plugin** for reuse across projects. These are the next leverage points — see Part C → *Capability Engineering*.
- **Feeds →** every other stage: a better-equipped capability layer raises the floor of all production work.

### The 8-phase per-screen method (reproduced verbatim — the Stage-1 build template)

This is the gated execution template at the heart of Stage 1. It is the concrete instance of move **Build (A5)**. For a non-design project, replace the phases with your domain's phases but keep the shape: *ordered phases, announced as you go, ending in an explicit self-QA gate.*

1. **Purpose** — the screen's single most important job; the user problem; the primary action; data sources; design register (Product vs Brand mode).
2. **Information Architecture** — all content items prioritized; visual hierarchy (first/second/third); where the user came from / goes next; navigation method.
3. **Layout (mobile-native)** — frame 375–428pt; safe areas (44pt status / 34pt home / 48–56pt tab); scroll behavior; vertical stack; **an ASCII wireframe of major zones**; ≥44×44pt touch targets.
4. **Typography** — Sora at mobile scale (title 24–28 / heading 18–20 / card 16–17 / body 15–16 / caption 12–13 / eyebrow 11–12); sentence case; no exclamation marks; ≤2 orange accent words.
5. **Composition & visual hierarchy** — squint test (CTA, headings vs body, groups); 8pt grid (4/8/12/16/24/32/48/64); z-layer system (z-0 bg … z-60 toasts); no two adjacent elements share weight.
6. **Color Map** — map 60/30/10 to *this* screen (orange 60% actions, green 30% success, purple 10% AI only — ≤2 elements); domain colors on tags only; neutrals for surfaces/text.
7. **Interaction states & gestures** — every interactive element defines all 8 states (default, hover, pressed, focus-visible, disabled, loading, error, success); gesture map; haptic points.
8. **Self-QA (16-item checklist)** — all colors from palette / 60-30-10 holds / Sora mobile scale / 8pt grid / 8 states each / ≥44pt targets / dark-mode primary / mobile-native patterns / cross-refs accurate / navigation specified / empty states described / motivation-tier adaptation / ASCII wireframe present / no web-isms / (+ accessibility labels) / (+ patterns extracted to canon).

---

# Part C — Reusable Mechanics & Playbooks

The mechanics that make Part A executable on a new project. This is where the framework becomes *operational*.

## C1 · New-Project On-Ramp (the bootstrap sequence)

Do these **in order** before any production work. This is the single most important section for reuse — it is the start sequence the Balencia origin proves was decisive (the domain models were built *before* screens).

1. **Write the workspace map first.** Create `CLAUDE.md` at the repo root: what each directory is for, the **Source-of-Truth Hierarchy** (ordered authorities + the explicit tie-breaker — decide *now* which file is "reality"), and the cross-cutting agent rules. Template: `templates/CLAUDE.md`.
2. **Ground (A0).** Run the research-first loop for the strategic questions; produce a cited findings doc. Don't skip this for "obvious" decisions.
3. **Capture (A1).** Author the founding brief via the questionnaire; mark every decision **FINAL** or **OPEN**. Templates: `templates/FOUNDING-BRIEF.md`, `templates/VISION-QUESTIONNAIRE.md`.
4. **Audit capability gaps & Equip (A2).** Now that you know the work, ask: *what will this project do repeatedly, and which proven practices do we lack?* Produce a short **capability-gaps list** (Skills / Commands / Teams / Hooks / MCP to build), and build the highest-leverage ones *before* production — don't start with an empty `.claude/`. At minimum: a research skill, the per-item method skill, the reviewer-team personas, and the `/handoff` command. Use the build loop (research → extract → templatize → test → wire). Templates: `templates/capabilities/` + `capability-build-checklist.md`. (See Part C → *Capability Engineering*.)
5. **Build the foundational domain models** that downstream work depends on (Balencia built the RPG system + correlation matrix + feature inventory before screens). Name them in the source hierarchy.
6. **Stand up empty infrastructure.** Create the empty ledgers (`_progress.md`, `findings-ledger.md`), the per-lane `AGENTS.md` files, the rubric and hard-gates, and the batch plan/index. Templates: the `templates/` folder, copied wholesale.
7. **Define the lanes and their order** (see C5). Only now begin Stage 1.

**Discovery → first-build handoff contract.** Stage 1 may not begin until the handoff payload is complete: (a) the self-contained founding brief, (b) the list of FINAL decisions, (c) the source hierarchy with tie-breaker, (d) the initial batch table (which items in which batch), (e) the anti-pattern list. **Acceptance check:** every decision that blocks the first build is FINAL; all OPEN decisions are enumerated as explicit risks.

## C2 · Feedback Loops (make them first-class)

Findings don't just get recorded — they re-enter the pipeline. Three loops, each with a **trigger → artifact → re-entry → re-verify** shape. *A loop is not closed until the fix is re-verified.*

| Loop | Trigger | Artifact | Re-entry point | Close condition |
|------|---------|----------|----------------|-----------------|
| **Audit → Spec/Prototype** | Reviewer accepts a finding | `findings-ledger.md` → `accepted-improvements.md` (vs `deferred-decisions.md`) | `U01–U09` update batches edit specs (dated "Audit Feedback Integration" section) and/or `P00–P18` polish the prototype | re-run `npm run check` / re-screenshot; mark finding resolved with evidence |
| **Backend gap-audit → Spec** | Routes/tables/controllers compared to specs | `_inconsistency-report.md` | missing feature = new spec created; mismatch = spec updated | spec ↔ implementation reconciled; `_progress.md` updated |
| **Integration → DS / Memory** | Integration-only defect surfaces during composition (e.g. token/opacity/rebind gotcha) | `figma-build-audit/findings-ledger.md` (X-/C- IDs) **and** a memory fact | fix in the DS source + republish; record the durable gotcha | re-audit shows grade rose + finding resolved; memory fact written |

**Who decides accept vs defer:** the product owner/PM (product gates) and the lane's reviewer personas (quality findings). Accepted → `accepted-improvements.md`; deferred → `deferred-decisions.md` with the reason.

## C3 · Failure-Mode Playbook — "what to do when the task breaks"

The most reusable knowledge from this project is how to respond when things go wrong. **Default response to any breakage: stop, don't push through red.**

| Symptom | Response |
|---------|----------|
| A **verify gate fails** (lint/typecheck/route/copy/brand) | Fix-then-re-run; **never proceed on red**. The gate is fail-fast for a reason. |
| **Build blockers** (e.g. framework integration errors, raw assets) appear across many items | Run a **foundation batch first** (Balencia's `P00`) to clear shared blockers *before* per-item polish. |
| A finding turns out to be a **false positive** | It's caught in the **plan phase** and **dropped, not executed** (plan-then-apply earns its keep here). Log why. |
| **MCP / external tool rate-limits or flakes** mid-run | Mark affected items **provisional**, grade from the evidence you already captured, re-read later. Don't fabricate. |
| **Memory/doc contradicts live code/state** | **Trust the live code/state**, log the drift as a finding, fix the doc. (Memory is point-in-time.) |
| A change **doesn't propagate** as expected (stale inherited state) | **Verify the actual bound state directly**, not via a cached/derived view; fix at the true source. |
| The **task is too big and output is degrading** | Stop and **re-slice** into smaller batches (this is the core lesson — see Plan & Slice, A4). |
| You're **hand-crafting the same pattern a 3rd time** | Stop and **Equip** (A2): turn it into a Skill/Command/Subagent so the 4th–Nth times are cheap and consistent. |
| A "one-off" looks like it wants to become a reusable component | **Stop and decide**: promote to the shared canon (and propagate) or keep it a local instance. Don't silently hand-build a near-duplicate. |
| You're **uncertain about an irreversible action** | Switch to **plan-then-apply**: dry-run, get approval, then execute with before/after evidence. |

## C4 · Batch-Sizing Heuristics (+ split triggers + gate cadence)

**Sizes actually used** (copy and adapt):

| Lane / work type | Batch size | Notes |
|------------------|-----------|-------|
| Spec authoring | **5–6 items/session** (~3–5 hrs) | enough to find shared patterns, small enough to stay consistent |
| Backend gap-audit | 4–8 | sequential |
| UX audit (first pass) | 5–12 screens | product-flow order |
| Remediation (update) | **exactly 10** | fixed size → clean 1:1 coverage accounting (9×10 = 90) |
| Polish | 5–12 | fresh QA each batch |
| Elevated re-review | **exactly 5** | fixed size → 18×5 = 90 |
| Wireframes | 2–6 screens | grouped by flow |
| Creative production | **≤6 briefs/session** (hard cap) | generation cost + QA attention |

**When to split a batch:** a single item exceeds the cap on its own; states multiply the deliverables beyond the item count; the work needs deeper review than the batch allows; or the rule "never do all N at once" applies. **Fixed sizes (10, 5)** are for *traceable 1:1 coverage* passes; **variable sizes** are for *exploratory* passes.

**Build-gate cadence:** run the full **`build`** gate on **every 3rd batch** plus the foundation batch (Balencia: `P00/P03/P06/P09/P12/P15/P18`); run the lighter **`check`** gate on **every** batch. Rationale: catch integration issues at a checkpoint cadence without blocking each iteration.

## C5 · Cross-Lane Ordering & Parallelism

Stages are not purely linear — encode the real dependency graph:

- **Stage 1 (specs)** is the root dependency; **Stage 2 (wireframes)** and **Stage 4 (prototype)** both depend on specs + the shared canon and **can run in parallel.**
- **Stage 3 (UX audit)** requires a **running prototype** (`localhost:3000`).
- **Stage 5 (creatives)** requires Stage 3 to have produced `creative-opportunities.md`; **creative integration into `public/` should land before** Stage 6 audits screens that display those assets.
- **Stage 6 (Figma)** requires the React prototype as source of truth and must run **after token definitions exist.**
- **The one true serialization:** *React (code) is the source of truth; Figma follows.* Never hand-patch Figma for something the code doesn't express — fix the code, then convert.

## C6 · Ownership (RACI) — who decides what

| Decision | Responsible (does it) | Approves (signs off) |
|----------|----------------------|----------------------|
| Batch scope for a session | AI agent proposes | **Product owner / PM** |
| Accept vs defer a finding | Reviewer persona proposes | **Product owner** (product) / lane lead (quality) |
| Introduce a new shared-canon pattern | AI designer | PM / design lead |
| Product/feature gate (tier, legality, sensitivity) | — | **Product owner** |
| Grade assignment | Auditor (read-only) | self-calibrating against the rubric |
| Apply a fix (esp. irreversible) | Fixer (after a `FIX-PLAN.md`) | **Human approves the plan first** |
| "Is the build true" sign-off | **Release Readiness Verifier** | — |

Hard rule encoded across lanes: **auditors never mutate; fixers mutate only after the plan is approved.**

## C7 · Traceability Chain

Every item is greppable end-to-end, and a verify gate enforces each link:

```
spec (.md)  ──verify:routes──▶  screen registry (screens.ts)  ──spec-comment + Code Connect──▶  React component (.tsx + .figma.tsx)  ──figma-mapping.json──▶  Figma node
```

So a reviewer can go from a finding on a Figma node back to the exact spec line, and a planner can confirm every spec'd screen actually exists in code and in Figma. Reproduce this chain in any project: *spec ID → registry entry → implementation file → deployed/rendered artifact*, with one gate per arrow.

## C8 · Quality-Bar Mechanics (operationalizing "premium / A+++")

- **Weighted rubric.** N dimensions, each weighted to sum 100, scored 0–100, converted to a letter, summed to an overall letter. Balencia's Figma rubric: Token Binding 20 / Structural 15 / Fidelity 15 / States 12 / Auto-Layout 10 / A11y 10 / Typography 8 / Naming 5 / Code Connect 5. The UX rubric is a parallel 8-dim 1–5 scale.
- **Concrete deductions.** Each failure deducts a fixed amount (e.g. −6 per distinct leaked raw-value type), so grades are reproducible, not vibes.
- **Grade caps (anti-inflation).** No A− with an open High finding; nothing above B+ with an open Critical; A++ only when *all* dims max + fresh evidence + every element justified + no finding above the smallest severity. **Never inflate a grade to show progress — truth is the deliverable.**
- **Evidence capture.** Screenshots/states captured by script (Playwright for routes/states; `get_screenshot`/`get_metadata` for Figma). A screenshot without observations is noise; an observation without evidence is opinion.
- **Control/element honesty** as a hard gate: every visible control must work, be honestly disabled, be clearly decorative, or have documented behavior — no misleading no-ops.
- **Grade-distribution smell-test.** Expect a spread (~20–30% top grade, a band of near-misses, a majority mid, 0–2 failing). **If the distribution skews** (e.g. *zero* top grades, everything mid-with-majors), suspect rubric mis-calibration or a *systemic foundation defect* — run **blocker-theme consolidation** (group duplicate findings) and fix the shared foundations *once* before per-item polish.

## C9 · Canon Governance & the Status Lifecycle

**Shared-canon governance (anti-regression).** The canon is **append/refine-only**: a later batch may add columns or edge-cases but must not break earlier items; fill "to be established" placeholders only when a real instance exists; every item links to a canon entry and never re-defines it. A consistency-check flags duplicate definitions.

**Status enum + definition of done.** Per-lane statuses differ; map them to one lifecycle:

```
not-started → in-progress → done → (updated)        # production items
proposed → accepted | deferred | rejected            # findings/decisions
```

A screen/item is **truly done across lanes** when: spec done **and** wireframe present **and** prototype `check` green **and** UX A++ (or a documented exception) **and** Figma node graded ≥ bar **and** creatives integrated. Until all hold, "done" means six different partial things — so always qualify which lane's "done."

## C10 · Artifact Taxonomy (the file *types* that recur in every lane)

| Type | Job | Naming convention |
|------|-----|-------------------|
| **Founding brief** | Encodes the full repeatable process for a lane | `FOUNDING-BRIEF.md`, `*-SESSION-PROMPT.md`, `WIREFRAME-PROMPT.md`, `methodology.md` |
| **AGENTS.md** | Per-lane discipline + deliverable standard | `AGENTS.md` per workspace |
| **Progress ledger / index** | Every item's status + batch + date; running totals | `_progress.md`, `*/index.md`; status enum above |
| **Per-item template** | One identical structure repeated per item | `_brief-template.md`, the N-phase method, the compiled-batch screen section |
| **Rubric + hard-gates** | Weighted scoring authority + hard-fail list | `RUBRIC.md`, `creative-rubric.md`, `brand-gates.md` |
| **Findings ledger (+accepted/deferred)** | Append-only record + approved + postponed subsets | `findings-ledger.md` (IDs `B01-F01`, `X-001`, `R01-F01`); `accepted-improvements.md`; `deferred-decisions.md` |
| **Batch file** | The durable session deliverable (not external notes) | `batch-NN-*/`, `P00…`, `R01…`, `U01…`, `CP-XX-*` |
| **Verify scripts** | Fast deterministic gates | `verify-*.mjs`, `consistency-check.mjs` |
| **History snapshots** | Date+SHA-stamped point-in-time grade | `history/<date>-<sha>[-fixer].md` |
| **Registry / mapping** | Machine-readable source-of-truth index | `screens.ts`, `*-mapping.json`, `audit-config.json`, `registry/*.json` |
| **Plan / handoff** | Dry-run plan + next-session kickoff | `FIX-PLAN.md`, `FIX-LOG.md`, `next-session-handoff.md` |
| **Metadata sidecar** | Provenance per accepted asset | `metadata.json` (source, license, job-id, prompt-hash, alt-text, integration-path) |

## C11 · Capability Engineering — build Skills, Commands, Teams, Subagents, Hooks, MCP

This is move **A2 · Equip** made operational. The capability layer is what makes the model start every task at a higher floor: instead of re-deriving a method each time, it loads a *tested* one with a reliable trigger. Treat building these as real work, governed by the rule of three (build on the 3rd repetition or when a proven external practice is missing). The templates for everything below are in `templates/capabilities/`.

### C11.1 — Which capability to build (decision table)

Pick the *smallest* capability that solves the problem. (Anatomy/locations are for Claude Code; the *ideas* port to any agent platform.)

| Capability | Use it for | Reach for it when | Lives at |
|------------|-----------|-------------------|----------|
| **CLAUDE.md memory** | Always-on facts: build commands, conventions, source hierarchy, workspace map | Every session must know it without loading anything | `CLAUDE.md` (project) / `~/.claude/CLAUDE.md` (personal) |
| **Skill** | A multi-step *method* or expertise loaded on demand (with supporting files/scripts) | A procedure recurs, or you want to encode a best practice with a trigger | `.claude/skills/<name>/SKILL.md` |
| **Slash command** | A quick, single repeatable action | Like a skill but no supporting files needed | `.claude/commands/<name>.md` |
| **Subagent** | An isolated task with its own context + restricted tools | A pass would pollute the main thread, or needs a different tool-set/system-prompt (e.g. read-only auditor) | `.claude/agents/<name>.md` |
| **Hook** | Deterministic automation at a fixed lifecycle event | "*Always* do X on event Y" regardless of what the model decides (lint on every edit, write memory on session end) | `settings.json` → `hooks` |
| **MCP server** | A connection to an outside system (Figma, image-gen, GitHub, DB, issue tracker) | The workflow must read/write an external service | `.mcp.json` (project) / `claude mcp add` |
| **Plugin** | A *bundle* of the above for distribution | You want to reuse the whole capability layer across projects/teams | `<plugin>/.claude-plugin/plugin.json` |

One-liner: *memory = always-on facts · skill = a method · command = a quick action · subagent = an isolated pass · hook = automatic-on-event · MCP = reach outside · plugin = ship the bundle.*

### C11.2 — The Skill-Creation Loop (research → extract → templatize → test → wire)

How you turn "best practice X" or "we keep doing Y" into a durable Skill:

1. **Hunt** — describe the recurring problem; gather **3+ independent best-practice sources** (this is move A0 applied to your own tooling). Note where they agree and disagree.
2. **Extract** — distill the *invariant* steps, the decision points, the gates, and the anti-patterns. Drop the source-specific fluff.
3. **Templatize** — write `SKILL.md`: frontmatter (`name`, `description`, optional `allowed-tools`/`argument-hint`) + the method as ordered steps + variants + gotchas. Keep it under ~500 lines and push detail into bundled reference files that load on demand (**progressive disclosure**).
4. **Test** — run it on a real scenario in the project; capture a worked example; refine where it under-specifies.
5. **Wire** — **the `description` IS the trigger.** Write it as *"\<what it does\>. Use when \<the situations + the words users actually say\>."* so the model auto-invokes it at the right moment. Add it to the capability index (and `/help`).

> Bad description (won't trigger): *"Summarizes code changes."*
> Good description (triggers reliably): *"Summarize uncommitted changes and flag risky patterns. Use when asked what changed, for a commit message, or to review the diff."*

Tip: the built-in `skill-creator` skill scaffolds and evaluates trigger accuracy. **Balencia proof:** `research-first-workflow` is a curated best-practice skill ("CORE-02 … Adapted for Balencia"); `figma-build-auditor`/`figma-build-fixer` are *custom* skills that encode this project's own audit/fix methods.

### C11.3 — Skill ↔ Team ↔ Command ↔ Subagent wiring (how the pieces compose)

The capabilities are not alternatives — they *layer*:

```
        SKILL                TEAM                 COMMAND / WORKFLOW         HOOK              MCP
   (teaches WHAT)      (WHO wields it)         (HOW it deploys & scales)  (WHEN, auto)   (REACH outside)
        │                    │                          │                     │                │
  a method the         a reviewer persona        a repeatable trigger     fires on an      a connection to
  model loads    ◀──▶  that applies the    ◀──▶  that runs the method  +  event without  +  Figma / image-gen /
  on demand            skill through one lens     over a batch / fan-out   being asked       GitHub / a DB
```

| Layer | Role | Balencia example |
|-------|------|------------------|
| **Skill** | teaches the method/expertise | `research-first-workflow`, `ux-ui-designer` |
| **Team (persona)** | a focused lens that *wields* skills during review | `teams/strategist.md`, `teams/brand-guardian.md` |
| **Command / Workflow** | deploys the method repeatably / at scale | `start-session…close-session`; `figma-build-auditor --deep` fan-out |
| **Hook** | runs something automatically on an event | *(headroom — e.g. `PostToolUse` formatter)* |
| **MCP** | extends reach to an external system | Figma MCP, image-gen MCP |
| **Memory / Plans** | persist what was learned / what's next | `memory/*.md`, `next-session-handoff.md` |

Worked row: the **`research-first` skill** (the method) is wielded by the **Strategist persona** (the lens that knows *when* grounding is needed), deployed via a **`/research` command or recalled in the founding brief** (the trigger), and its output is persisted as a **cited findings doc + memory fact**.

### C11.4 — Team-persona vs Subagent vs Workflow fan-out (decision checklist)

- **Use a Team persona** (a `teams/*.md` brief) when the role is a *supervisory review lens*, runs inline, and completeness is human-checked. Cheap; many per batch.
- **Use a Subagent** (`.claude/agents/<name>.md`) when the task is *self-contained*, benefits from an **isolated context** (so its search noise doesn't pollute the main thread), or needs a **restricted tool-set** (e.g. a read-only auditor that must never write).
- **Use a Workflow fan-out** when you need a *deterministic parallel pass* over many items with a verify/critic stage — e.g. `figma-build-auditor --deep` audits every component in parallel, then a completeness critic confirms none was skipped.

### C11.5 — Hooks & MCP as first-class capabilities

- **Hooks** = automation at fixed lifecycle events: `SessionStart`/`SessionEnd`, `UserPromptSubmit`, `PreToolUse`/`PostToolUse`, `Stop`, `SubagentStop`, `PreCompact`, … Each has a `matcher` (e.g. `Write|Edit`) and a `command`/`http`/`mcp_tool` handler. Use them to enforce gates mechanically (block `rm -rf`, run the formatter on every edit, write a memory fact on `SessionEnd`). Template: `templates/capabilities/hooks.settings.json`.
- **MCP servers** = typed connections to external systems. Project scope lives in a committable `.mcp.json` (shareable with the team) with `${ENV}` expansion for secrets. Wrap MCP calls *inside skills* (with guardrails) rather than calling them ad-hoc — Balencia's Figma skills require `fileKey` on every call and separate read-only (auditor) from write (fixer). Template: `templates/capabilities/.mcp.json`.

### C11.6 — Package it as a Plugin (cross-project reuse)

A **plugin** bundles skills + commands + agents + hooks + MCP configs behind one manifest (`.claude-plugin/plugin.json`), namespaced and versioned, installable across projects. This is the literal mechanism for *"make this framework repeatable for other projects"* — once your capability layer stabilizes, package it. Template: `templates/capabilities/plugin.json`.

### C11.7 — Memory taxonomy (what's worth persisting, and how)

Memory facts are point-in-time truths about *what the project is* — distinct from findings (about *what's wrong*). Keep a `MEMORY.md` index + one fact file per topic, with frontmatter (`name`, `description`, `metadata.type: user|feedback|project|reference`). Three high-value fact types:

- **Decision facts** — "we chose X over Y because \<reason/source\>; reversible? \<y/n\>." Stops re-litigation.
- **Integration gotchas** — "tool Z does W under condition C; workaround is …" (e.g. a variable-rebind that doesn't propagate to pre-placed instances). Stops re-discovery.
- **Capability learnings** — "the `/research` loop surfaced 3 approaches; we standardized on X."

Rule: facts are point-in-time; **when memory contradicts live code/state, trust the live state and log the drift.**

### C11.8 — The survivability contract (with a worked example)

State lives in **exactly three places** — git commits, machine-readable metadata/registries, and plan/ledger/memory docs. No "we decided X earlier" floating in chat. Each micro-session = *do one bounded unit → verify → commit by path → ledger-append → ✋ checkpoint → handoff.*

**Worked example — one decision surviving a context reset:**
1. *Found:* a reviewer (Brand Guardian persona) flags "purple accent words should be ≤2 per screen" → recorded as finding `B-047` in `findings-ledger.md`.
2. *Decided:* product owner accepts it → moved to `accepted-improvements.md`.
3. *Encoded:* the rule is added to the shared canon (`_shared-patterns.md` Color Map) so all future screens inherit it.
4. *Committed:* `git commit` "Accept B-047: purple-word cap ≤2/screen" (by explicit path).
5. *Remembered:* a memory fact (`project_brand-rules.md`) records the rule + the *why*.
6. *Handed off:* `next-session-handoff.md` lists it under RULES STILL IN FORCE.
7. *Next session* (cold start): reads the rule from memory, finds the evidence at the ledger ID, sees it enforced in the canon — **zero re-discovery, zero re-debate.**

## C12 · Making it project-agnostic — the swap checklist

This document is full of Balencia nouns. To reuse the framework, separate the **invariant structure** from the **project-specific instances** and swap only the latter.

| Framework-invariant (keep) | Balencia-specific instance (swap) |
|----------------------------|-----------------------------------|
| One founding artifact | `CODEX-SESSION-PROMPT.md`; RPG/SIA vocabulary |
| Source hierarchy + tie-breaker | "live Figma file wins"; the 5 layers |
| Batch discipline | B/U/P/R/CP batch names; sizes 5/10/5/6 |
| Shared canon | `_shared-patterns.md`; `globals.css` tokens; 60/30/10 |
| Per-lane AGENTS rules | the specific lane boundaries |
| Ledgers / memory / handoff | the specific IDs and file keys |
| Multi-role audit | the 6 named personas (rename to your risk lenses) |
| Weighted rubric + caps | the 9 Figma dims / 8 UX dims; the A+++ bar |
| Plan-then-apply | the `figma-build-fixer` specifics |
| Verify gates | `verify:{routes,assets,copy,brand,visual}` |
| Capability layer (Equip) | the named skills (`research-first-workflow`, `product-manager`, `figma-build-auditor/fixer`), the 6 personas, the lane commands |

**One-line instruction:** *Replace every brand/token/file-key/persona/vocabulary with your project's equivalents; keep the structure, the gates, and the build-your-own-capabilities habit.*

---

## Coverage checklist (how this document maps to the source)

This framework was reverse-engineered from the full workspace (8 production lanes harvested + synthesis + completeness critique). Coverage:

- **7 production lanes** → Part B Stages 0–6; the meta-tooling lane → **A2 · Equip** + **Part B Stage 7** + **C11 · Capability Engineering**. ✔
- **8 moves** (Ground · Capture · Equip · Reference · Plan & Slice · Build · Verify · Persist) + **13 principles** → Part A. ✔
- **Capability Engineering** (the "build your tooling" discipline) — decision table, skill-creation loop, Skill↔Team↔Command wiring, subagent checklist, hooks/MCP, plugin packaging → **C11**; real templates → `templates/capabilities/`. ✔
- **15 reusability gaps** from the critique, all folded in:
  - On-ramp + Discovery→Spec contract + capability-gap step → **C1** · Feedback loops → **C2** · Failure-mode playbook → **C3** · Batch-sizing + split triggers + gate cadence → **C4** · Cross-lane ordering/parallelism → **C5** · RACI ownership → **C6** · Traceability chain → **C7** · 8-phase method verbatim → **Part B** · Canon governance + status/DoD lifecycle → **C9** · Grade-distribution action → **C8** · Memory taxonomy + survivability worked example + handoff template → **C11** + `templates/next-session-handoff.md` · Glossary/agnostic checklist → **C12**. ✔
- **Templates** for every artifact type (C10) → `framework/templates/` (+ `templates/capabilities/` for the Equip layer). ✔

> Built from: `app_design 3/_session-prompt.md`, `_shared-patterns.md`, `_progress.md`; `balencia-screens-reviewed/{AGENTS.md,teams/*,findings/*,a-plus-plus-review/*}`; `Wireframes/WIREFRAME-PROMPT.md`; `balencia-screens/scripts/verify-*.mjs`; `balencia-creatives-production/{commands,qa,briefs,batches,ledger}/*`; `figma-build-audit/{RUBRIC,REPORT,methodology,findings-ledger}.md` + `.claude/skills/figma-build-{auditor,fixer}/SKILL.md`; `~/.claude/plans/next-session-handoff.md`; root `CLAUDE.md`.
