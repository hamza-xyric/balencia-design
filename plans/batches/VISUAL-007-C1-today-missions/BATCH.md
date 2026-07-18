# VISUAL-007-C1-today-missions — batch contract

- Opened: 2026-07-11
- Parent goal: finalize C1→I1 visual-prototype families + R11 one-SHA certification (approved plan `~/.claude/plans/balencia-104-screen-finalization-zazzy-map.md`)
- Prior checkpoint: B1 accepted under DVF-13 (VISUAL-006, closed 2026-07-10)
- Status: **closed with waivers 2026-07-11 — Sol accepted under DVF-14; D1 is the only next wave**

## Runtime intake

```
goal_lifecycle: /goal (historical Fable intake; superseded for continuation below)
execution_mode: multi-agent
wait_policy: none
loop_primitive_legacy: n/a
runtime_profile: claude-native
model_routing_policy: explicit-fable5-glm — GLM UNAVAILABLE this batch (see below)
orchestrator_role: Fable 5 root orchestrator/final acceptor
orchestrator_model: claude-fable-5 (harness-reported)
orchestrator_effort: strongest supported deliberate setting (harness-managed; exact numeric effort unexposed — W-MODEL)
worker_backend: RECORDED SUBSTITUTION — Claude Fable-native subagents (Explore/general-purpose)
worker_backend_reason: ./scripts/glm-worker.sh --ping → HTTP 429 rate_limit_error code 1310,
  "Weekly/Monthly Limit Exhausted", resets 2026-07-13 19:05:16 (request 202607110443213fddf1b74d2649ba).
  Per goal contract: GLM failure recorded; GLM is NOT claimed as used; Fable-only/native-subagent
  work continues within the approved batch without concealing the unavailable worker.
provider: n/a (GLM/Z.ai unavailable); Anthropic harness subagents
worker_model: inherits session model (claude-fable-5 harness) — W-MODEL applies
endpoint_class: harness-native subagent
max_threads: 4 total
max_depth: 1
active_lane: Balencia visual prototype finalization
active_root: balencia-screens
excluded_lane: yhealth-app and production mobile development
verify_command: see Verification gates below
evidence_path: plans/batches/VISUAL-007-C1-today-missions/evidence/
usage_guard: bounded packet scope; ≤4 concurrent workers; 2-strike repair rule
closeout_writes: batch, verification matrix, evidence, remediation ledger, findings,
  decisions (DVF if needed), implementation plan, audit index, plans/next-session-handoff.md
```

### Codex continuation intake — 2026-07-11

```yaml
goal_lifecycle: /goal (native Codex durable goal; exactly one active goal)
execution_mode: multi-agent
wait_policy: monitor (fresh :3002 production build/server readiness and bounded verifier runs only)
loop_primitive_legacy: n/a
runtime_profile: codex-native (project profile: codex-gpt56)
model_routing_policy: gpt56-tiered
orchestrator_role: Sol root orchestrator/final acceptor
orchestrator_model: gpt-5.6-sol
orchestrator_effort: ultra
worker_backend: native Codex agents; Luna read-only inventory and Terra implementation/review
provider: Codex
model: gpt-5.6-sol
worker_agent_type: scope_scout (Luna) / builder, design_reviewer, test_verifier (Terra), as packeted
worker_model: gpt-5.6-luna or gpt-5.6-terra per .codex/agents/*.toml; spawned-thread runtime proof remains W-MODEL
worker_effort: Luna medium; Terra high
endpoint_class: native
max_threads: 4 total
max_depth: 1
active_lane: Balencia visual prototype finalization
active_root: balencia-screens
excluded_lane: yhealth-app and production mobile development
verify_command: fresh npm run build + next start -p 3002; verify-c1-today.mjs; npm run check; strict 11/11; root validator; root/submodule diff checks
evidence_path: plans/batches/VISUAL-007-C1-today-missions/evidence/
usage_guard: one durable goal; bounded worker packets; <=4 concurrent agents; 2-strike repair rule
worker_task_packet: existing plans/batches/VISUAL-007-C1-today-missions/workers/*.md; fresh review packets required before review delegation
worker_output_path: plans/batches/VISUAL-007-C1-today-missions/evidence/
saved_workflow: n/a
closeout_writes:
  - BATCH.md + VERIFICATION-LOG.md
  - REMEDIATION-LEDGER.md
  - VISUAL-001/DECISIONS.md
  - VISUAL-001/IMPLEMENTATION-PLAN.md
  - VISUAL-001/AUDIT-INDEX.md
  - plans/next-session-handoff.md
```

### Continuation pre-development gate

- Active/tie-breaker sources: latest founder brief + continuation contract, live `balencia-screens` code/verifier, frozen C1 batch/matrix, current specs/canon/RPG authority; archived and retired sources remain non-authoritative.
- Selected gates: targeted TypeScript/lint, fresh production build/server on `:3002`, hardened 89-PNG verifier, strict 11/11, root 104/104 validator, root/submodule whitespace checks, three independent non-builder reviews, Sol rendered inspection.
- Worker readiness: project role configs map Luna/Terra responsibilities; GLM re-ping returned HTTP 429 code 1310 with reset `2026-07-13 19:05:16`, so GLM is not claimed and native Luna/Terra substitution remains explicit.
- Waivers carried without expanding product acceptance: `W-MODEL`, `W-AT`/`AXE-01`, `W-SHA`/`RW-VF-06`, `W-PROGRESS`, `W-TRUNC-40`, `W-TRUNC-80`.
- Gate: **READY WITH WAIVERS**. No source conflict, destructive action, unavailable deterministic gate, or cross-lane dependency blocks the C1 verifier repair.

## Frozen scope

**Family IDs (11):** `12,13,14,15,41,44,45,59,61,73,97`
**Pilot sentinel:** `12` — verification-only; reimplementation forbidden absent demonstrated shared regression with rendered evidence.
**Implementation targets (10):** `13,14,15,41,44,45,59,61,73,97`

### Mutable files (disjoint worker ownership)

| Owner | Files |
|---|---|
| builder-a | `balencia-screens/src/components/hifi/screens/today/S13MissionBoard.tsx`, `S14MissionDetail.tsx`, `S15CreateEditMission.tsx` |
| builder-b | `balencia-screens/src/components/hifi/screens/today/S41ScheduleCalendar.tsx`, `S44WaterIntake.tsx`, `S45DailyCheckin.tsx` |
| builder-c | `balencia-screens/src/components/hifi/screens/today/S59StreakDetails.tsx`, `S61RemindersTasks.tsx` |
| builder-d | `balencia-screens/src/components/hifi/screens/today/S73MissionJournal.tsx`, `S97PlansLibrary.tsx` |
| Fable only (serialized) | shared kit (`src/components/hifi/kit/*`), `src/app/globals.css`, registries (`today/index.ts`, `screens/registry.ts`, `src/data/screens.ts`), new verifier `balencia-screens/scripts/verify-c1-today.mjs`, all ledgers/decisions/handoff/batch docs |
| Forbidden | `yhealth-app/**`, accepted A1/A2/B1/pilot screen files, accepted asset bytes (HIFI-26-01/80-01/75-01), package files, `.env*` |

### Source authority (this family)

1. Current code `balencia-screens/` + `src/data/screens.ts` + registry/routes
2. Specs: `Balencia-New-Screens/hifi-screens/{12-home-screen,13-goals-list,14-goal-detail,15-create-edit-goal,41-schedule-calendar,44-water-intake,45-daily-checkin,59-streak-details,61-reminders-tasks,73-mission-journal,97-plans-library}.md`, `_HIFI-LEDGER.md`, `_IMAGE-SLOTS.md`
3. Visual: `globals.css` → hifi kit → COMPACT-CANON → COMPONENT-CATALOG → REFERENCE-DIRECTION
4. RPG: `RPG_SYSTEM_DESIGN.md` — streak multiplier 1.0×(<7d)/1.5×(7–29d)/**2.0×(30+d, so 42d ⇒ 2.0×)**; recovery **1.3×** next active day after deliberate rest, stacks, **caps 2.0× total**
5. Overrides in force: DVF-07 (all-caps `CIA`; audit "Cia" recommendations void), DVF-08/09 (references resolved), ten-domain starting set, Life Power, accepted shared primitives = operational baseline (stale "globally inert" audit claims must be re-verified against current code)

### Audit intake

`VISUAL-001/audit/C1-today-missions.md` (2026-07-10): 7 systemic roots (2 Blocker, 4 Critical, 1 Major); dispositions Block×8 / conditional×1 (14) / rework×2 (44,73). S12 "Block" superseded by DVF-10 pilot acceptance. Every audit claim must be reconciled against current code before repair (shared foundation landed after this audit).

## Required outcomes (frozen item contract)

- **12 (verify only):** one ten-domain payload drives radar, labels, accessible summary, completeness, Life Power.
- **13:** data-bound Life Power/domain summary; native mission filters, mission rows, creation/navigation actions; complete mission taxonomy (Life/Main/Side/Weekly/Daily/Group); source/freshness/null states.
- **14:** native back; correct domain destinations; readable KPI provenance (no sub-floor type); streak/XP tied to current Mission/RPG rules.
- **15:** native multiline prompt, examples, domain removal, switch and keyboard reorder; one modal exit model; sticky/staged validity-aware CTA with loading/offline/success states.
- **41:** usable timeline/current event in first viewport; native tabs/date controls; operable events and reorder alternatives; reconcile scheduled-time populations; cite calendar/wake evidence.
- **44:** operable Quick Log; visible ≥44px delete with exact confirmation/undo; activity source/freshness disclosure; pending/offline/success states.
- **45:** native mood/stress sliders, reflection, context and dismiss controls; persistent validity-aware Save; reachable safety/data controls; one passive CIA orb; specific evidence/confidence detail.
- **59:** multipliers derived from current RPG rules (42d ⇒ 2.0×; recovery 1.3× after deliberate rest, cap 2.0×); accessible gauge (role+name+value); freeze eligibility/confirmation/undo; canonical lock treatment.
- **61:** native checkbox/switch with pending/error/undo; no opacity-stacked low contrast (completed ≥4.5:1 via strike/check); registry-backed domain names; "Missions" in reminder counts.
- **73:** reconcile 12-week vs six-week copy; source each metric; privacy-safe thumbnail or explicit hidden/null media state; truthful storage/sync; hide/delete and safety actions.
- **97:** ≥44px filters; operable plan rows; canonical PaywallLock; edit/pause/stop/archive/delete/export/share/revoke actions; per-plan state/provenance.

## Asset dispositions (frozen)

- `HIFI-12-01` (optional, accepted screen 12): **no new raster**; record explicit disposition in ASSET-DISPOSITION.md.
- Screen 73 media: **no new slot minted**; explicit privacy-safe code-native/honest-null disposition recorded.
- No other C1 screen has an image slot in `_IMAGE-SLOTS.md`.
- ImageGen: not planned for C1.

## Verification gates

From `balencia-screens/`:
1. Targeted lint/type on touched files
2. `npm run check`
3. `npm run build`
4. Strict: `node scripts/verify-visual-104.mjs --strict --only 12,13,14,15,41,44,45,59,61,73,97 --screenshots` → **11/11**, zero issues/warnings/missing frames/console errors
5. Dedicated hardened verifier `scripts/verify-c1-today.mjs` (inherits verify-b1-cia.mjs pattern: fresh isolated context+nonce per case, storage cleared, 390×844, reduced-motion default, fonts/images awaited, two rAF, pass-atomic exact-name staging, product/verifier/authority fingerprints, zero console/page errors, zero forbidden capability events, 125% text sentinels, focus traps, ≥44px targets, ≥16px editable fields, contrast, mutually exclusive states, formula/count assertions incl. S59 multiplier)

From workspace root:
6. `node Balencia-New-Screens/work/validate-redesign.mjs --json` → 104/104, no defects/uncovered
7. `git diff --check` + `git -C yhealth-app diff --check`

Acceptance additionally requires:
8. Independent code/correctness review (non-builder)
9. Independent design/source review (non-builder)
10. Independent accessibility/trust review (non-builder)
11. Fable rendered inspection; zero unresolved Critical/High/Medium

## Screenshot/state contract

Exact expected filename list and count frozen in `VERIFICATION-MATRIX.md` after reconciliation (before implementation begins). Strict defaults: `12,13,14,15,41,44,45,59,61,73,97` (11). State PNGs: per-matrix under `evidence/states/`.

## Stop conditions

- Same failure twice after materially equivalent repair → stop, shrink slice or escalate.
- Any required change crossing shared-kit boundary → pause workers, Fable serializes, sentinel check (accepted pilot/A1/A2/B1 screens unchanged), resume.
- Any change touching `yhealth-app`/Figma/Railway/backend → hard stop.
- Destructive/irreversible action or git commit → user authorization required.

## Log

- 2026-07-11: batch opened; GLM ping failed (HTTP 429, quota reset 2026-07-13 19:05:16) — recorded; Fable-native subagent substitution in force. Pre-C1 doc reconciliation completed (IMPLEMENTATION-PLAN, AUDIT-INDEX, handoff); root validator 104/104; diff checks clean.
- 2026-07-11: 4-worker read-only reconciliation complete (evidence/worker-recon-{a..d}.md). S12 sentinel: NO regressions. Most systemic audit claims resolved by accepted shared foundation; matrix frozen (VERIFICATION-MATRIX.md, 89-PNG contract).
- 2026-07-11: Fable-serialized kit edits: ArcGauge role="img" (data.tsx), GlassPillInput multiline variant, radar micro "Life Power" label 10→11px. Default render paths unchanged for existing consumers; tsc clean.
- 2026-07-11: 4 builders (Fable-native subagents) implemented the 10 target screens per packets; disjoint ownership honored; zero escalations. Deviations logged in builder reports (accepted by Fable: S15 edit-row drop, S15 no post-discard undo, S13 default-All filter truth, S59 60-day milestone).
- 2026-07-11: Fable integration repairs: S15 placeholder copy rule, S44 unused import + Goal→Target brand language, S41+S97 tab height 34→44px, S41 timeline in-flow layout collision fix. `npm run check` PASS; `npm run build` PASS.
- 2026-07-11: strict `--only` 11/11 PASS, zero issues/warnings (evidence/c1-strict.json + after/ PNGs) against fresh prod server :3002. Dev-server-3001 stale-chunk false-alarm documented (first run showed CSS 404s; NOT a product defect). Fable rendered inspection of 12/13/15/41/45/59/97: PASS after S41 layout repair.
- 2026-07-11: hardened verifier installed (scripts/verify-c1-today.mjs, drafted by worker, Fable-integrated: scrollable-ancestor overflow false-positive fix). Integration repair loop running.
- 2026-07-11: HARNESS HANDOFF — Claude monthly spend limit hit mid-verifier-loop. Loop progress: repairs applied through the S44 cases (S13/S15/S44/S97 touched post-builder); last known failing assertion = S45 selected "Career" context chip contrast 3.59:1 (< 4.5). Continuation prompt for Codex GPT-5.6 Sol written to `plans/codex-continuation-prompt.md`. Verify only against fresh prod server :3002 (dev :3001 stale-chunk hazard documented above).
- 2026-07-11: Codex Sol Ultra resumed exactly one durable goal at HEAD `5e933f6`; worktree caution and `yhealth-app` prohibition reaffirmed. Required GLM re-ping returned HTTP 429 code 1310 (same reset), so native Luna/Terra substitution stays recorded. Current `c1-interactions.json` has progressed beyond the historical Career-chip contrast failure; its first failure is now S45 Energy range focus evidence. Continuation pre-development gate is READY WITH WAIVERS.
- 2026-07-11: S45 range focus repaired screen-locally by moving the existing focus ring to the focused range's wrapper (`focus-within`); fresh build PASS. Next verifier run passed `45-default` and failed on S45 error wording. Sol adjudicated a verifier false-positive: rendered/spec-authorized “Couldn’t save…” + “Try again” was excluded by `/retry|failed|didn/`; assertion expanded narrowly to recognize `couldn`/`try again` without weakening the required save-failure truth.
- 2026-07-11: Rerun cleared every S45 fixture and interaction. Next failure moved to S59 active calendar-day numerals at `4.49:1` in normal/hover/pressed, below the frozen `4.5:1` floor. Smallest screen-local repair: preserve orange active-day tint and use opaque `paper-100` for the 11px numeral.
- 2026-07-11: Active-day repair passed. Next distinct failure: S59 missed-day numeral at `4.37:1`; raised the 11px numeral from 45% white to the established `paper-100/70`, preserving the muted surface and redundant X/accessible-name state cues.
- 2026-07-11: Both S59 calendar contrast repairs passed. Next S59 RPG assertion was a verifier-scope false-positive: `SolidCard` renders a nested `<section>`, so `ArcGauge.closest('section')` selected only the gauge card and could never include the adjacent recovery card. Verifier now reads the direct parent two-card multiplier section; all frozen `2.0x`/`1.3x`/deliberate-rest/cap/no-fake-unlock assertions remain intact.
- 2026-07-11: Scoped RPG assertion passed; all S59 and S61 fixtures/interactions then passed. First S73 failure was valid duplicate accessible control names (`Hide`, `Delete`) across two private photo tiles. Added exact per-photo accessible names while preserving concise visible labels.
- 2026-07-11: Per-photo names passed. S73 empty state then exposed a privacy-copy gap: the global media note mentioned product photos without stating the no-media fixture is hidden/private. Tightened the note to “Journal photos are hidden in this prototype” and “photos stay private on your device unless you choose to export them.”
- 2026-07-11: S73 then cleared in full. S97's first shelf tab rendered at 42px because its 52px track lost 2px to borders plus 8px to padding. Increased only that screen-local segmented track to 54px, yielding true 44px filter targets while preserving the existing layout and interaction model.
- 2026-07-11: True 44px S97 tabs passed. The next PaywallLock canonicity assertion was a verifier-scope false-positive: `section:has(.paywall-blur)` matched both the kit component's own section and the outer Plan shelf ancestor. Narrowed the selector to `section:has(> .paywall-blur)`, requiring the canonical marker to be the section's direct child while retaining the unique-marker, operable-unlock, equal-exit, and target-size assertions.
- 2026-07-11: Hardened verifier PASS on fresh production :3002 — 89/89 pass-atomically promoted PNGs, 89 isolated contexts/unique nonces, 106 checks, zero console/page/capability events, stable product/API/authority start-end digests, and byte-locked S12 SHA `107b59b58bca73a05045dfd90a68cdf4219176f72aa7e6dcf48b59165f75df67` unchanged.
- 2026-07-11: Post-verifier `npm run check` exposed one valid C1 brand-copy gate: S44 success text still said “Daily goal complete.” Replaced it with the screen's own hydration-target language (“Daily hydration target complete”); because this changes the product digest, the fresh production build and hardened verifier are rerun before acceptance.
- 2026-07-11: Three independent Terra review passes rejected the first clean gate set with 0 Critical and multiple High/Medium findings across code/correctness, design/source, and accessibility/trust (`evidence/review-{code,design-source,accessibility-trust}.md`); Sol also confirmed the clipped S97 Paywall actions as a High rendered defect. Sol opened three disjoint bounded repair packets and hardened the verifier to prove mission identity/create routing, schedule view/data agreement, honest-null check-in/streak states, modal/destructive focus continuity, complete pressed-button filter semantics, meaningful non-undo screenshots, static semantic contrast, and actual 125% text-only enlargement on all 11 screens.
- 2026-07-11: S12 type-floor adjudication recorded: the byte-locked accepted pilot contains an 11px radar micro-label, so the verifier enforces 11px for S12 only plus exact SHA and 125% enlargement, while retaining the frozen 12px floor for every mutable C1 screen. This explicit sentinel-source exception does not waive or weaken any mutable implementation target.
- 2026-07-11: Hardened first-failure loop completed on fresh production `:3002`. Sol repaired genuine product issues and narrowed only proven verifier false-positives. Final verifier coverage is 100 isolated contexts/nonces: 89 exact canonical 390×844 PNGs plus 11 screenshot-free 125% text proofs, 147 checks, zero console/page/capability events, empty storage/cookies, pass-atomic promotion, and stable start/end product/API/authority fingerprints. S12 stayed byte-identical at `107b59b58bca73a05045dfd90a68cdf4219176f72aa7e6dcf48b59165f75df67` throughout.
- 2026-07-11: Verifier hardening closed two independent review gaps without weakening the contract: DOM Range line-box padding is normalized to measured glyph-ink bounds with CSS text-transform accounted for; the S15 125% bottom capture scrolls only authored `screen-content`, pins outer shell scrollers, and requires Unit/Strictness/XP/data-controls/status/CTA visibility. Independent adversarial controls prove authored non-collisions pass while real/uppercase collisions fail.
- 2026-07-11: Final accessibility repairs replaced incomplete S13/S15 tab semantics with labelled exclusive `aria-pressed` button groups retaining arrow focus, and grouped S15 Metric/Imperial radios under a native `Unit` fieldset/legend. S73 removed an unsupported device-only product-storage guarantee and now states product storage/sync is unrepresented in the local preview. The verifier proves all three contracts.
- 2026-07-11: Three fresh independent non-builder Terra reviews now PASS with `0 Critical / 0 High / 0 Medium`: code/correctness, design/source, and accessibility/trust. Review-found S73 storage truth, S13/S15 AX semantics, Unit grouping, and blank S15 enlarged-bottom evidence were repaired and re-reviewed before acceptance.
- 2026-07-11: Final deterministic gates PASS: targeted ESLint/typecheck; full `npm run check` (one unrelated pre-existing `DomainDashboardHeader.figma.tsx` warning, zero errors); fresh `npm run build`; strict C1 `11/11` with zero issues/warnings/missing frames/console errors; root validator `104/104`; root and `yhealth-app` `git diff --check`; Sol full-resolution inspection of mission creation/filter, schedule honest-null, destructive sheets, check-in empty, streak freeze, tasks success, journal privacy, plan actions, and enlarged-text states.
- 2026-07-11: C1 accepted under DVF-14. Product digest before authority persistence is `013bea5d034ab47df29de461b1791d037f988e0bb98aefbfcf6a2d4b26fb397e`; verifier SHA is `3301f9efeaf41c751abdce9720f988f68507d4b498794521d873d801b505f958`; production build is `EeCHMg26d0yGZbyL-aWUG`. This closed BATCH, the three final reports, and DVF-14 form the final authority snapshot; the post-persistence verifier bind and exact final authority digest are recorded in `evidence/VERIFICATION-LOG.md` without mutating this snapshot afterward.
