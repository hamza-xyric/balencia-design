# VISUAL-009-D2-profile-commercial — batch contract

- Opened: 2026-07-12
- Parent goal: finalize D1→I1 Balencia visual-prototype families and produce the final verified 104-screen development-handoff package (R11), preserving accepted pilot/A1/A2/B1/C1/D1 work
- Prior checkpoint: D1 accepted under DVF-15 and durably closed
- Status: **closed with evidence-only waivers 2026-07-16 — Sol accepted; E1 is the only next wave**
- Theme: RPG character, celebration, accepted commercial sentinel, universal search, achievements, buddy profile, and reputation
- Session cap: 7 screens
- Active lane: Balencia visual prototype finalization
- Active root: `balencia-screens/`
- Excluded lanes/actions: `yhealth-app/**`, backend work, Figma, Railway, commits, staging, reset, stash, destructive git operations, and dev `:3001`
- Evidence root: `plans/batches/VISUAL-009-D2-profile-commercial/evidence/`

## Runtime intake

```yaml
goal_lifecycle: /goal (same native Codex durable goal for D1→I1 then R11)
execution_mode: multi-agent
wait_policy: monitor (fresh production build/server readiness and bounded verifier runs only)
loop_primitive_legacy: n/a
runtime_profile: codex-native (project profile: codex-gpt56)
model_routing_policy: gpt56-tiered
orchestrator_role: Sol root orchestrator and final acceptor
orchestrator_model: gpt-5.6-sol
orchestrator_effort: ultra
worker_backend: native Codex agents; Luna read-only reconciliation, Terra disjoint implementation and independent review
provider: Codex
model: gpt-5.6-sol
worker_agent_type: scope_scout (Luna) / builder, design_reviewer, test_verifier (Terra), as packeted
worker_model: gpt-5.6-luna or gpt-5.6-terra per project role; spawned-thread runtime proof remains W-MODEL
worker_effort: Luna medium; Terra high
endpoint_class: native
max_threads: 4 total including root
max_depth: 1
worker_task_packet: plans/batches/VISUAL-009-D2-profile-commercial/workers/*.md
worker_output_path: plans/batches/VISUAL-009-D2-profile-commercial/evidence/
saved_workflow: n/a
verify_command: fresh npm run build + next start -p 3002; dedicated verify-d2-profile-commercial.mjs; strict 7/7; npm run check; root 104-screen validator; accepted-sentinel hashes; root/submodule diff checks
evidence_path: plans/batches/VISUAL-009-D2-profile-commercial/evidence/
usage_guard: one durable goal; <=4 concurrent agents; bounded packets; 2-strike repair rule; never use dev :3001
closeout_writes:
  - BATCH.md and frozen VERIFICATION-MATRIX.md
  - evidence/VERIFICATION-LOG.md and three review reports plus any bounded runtime-delta rechecks
  - evidence/ASSET-DISPOSITION.md
  - Balencia-New-Screens/build-progress/remediation-2026-07/REMEDIATION-LEDGER.md
  - VISUAL-001/DECISIONS.md, IMPLEMENTATION-PLAN.md, and AUDIT-INDEX.md
  - plans/next-session-handoff.md
```

### Provider availability

- No external worker backend is selected. Native Codex collaboration is the only worker surface for this batch.
- `W-MODEL` remains in force because the collaboration surface does not expose a worker-thread model attestation; packeted role/model intent and task provenance are recorded.
- Worker output remains evidence until Sol independently verifies it.

## Pre-development gate

- Active docs: current handoff, root/lane guidance, live prototype code/routes, D2 audit and contact sheet, seven current hi-fi specs, `_HIFI-LEDGER.md`, `_IMAGE-SLOTS.md`, compact canon, component catalog, RPG authority, and accepted D1 closeout.
- Archived/retired docs: context only. Live code and current `Balencia-New-Screens/` authority win operational ties.
- Tie-breaker: current route/registry and code truth first for operability; repaired hi-fi screen specs for intended behavior; current RPG authority for the ten-domain registry and achievement language; current canon/catalog/tokens for shared visual behavior; continuation contract for scope and sequencing.
- Missing named source: no `_shared-patterns.md` exists under `Balencia-New-Screens/`; compact canon, component catalog, current shared kit, and accepted D1 precedent are the active substitutes. No source is invented.
- Source links resolve and the batch is bounded to seven D2 screens in one active root.
- Planned gates: immutable before-source/baseline evidence, exact frozen state/interaction/PNG matrix, targeted TypeScript/ESLint, fresh production build on `:3002`, dedicated hardened D2 verifier, `npm run check`, strict 7/7, 104/104 validator, accepted-sentinel/source hashes, root/submodule diff checks, three independent Terra reviews, and Sol rendered inspection.
- Deterministic evidence path: this batch's `evidence/` tree.
- Worker readiness: three complete Luna read-only packets exist; no Luna may edit files, run/restart a server, or decide acceptance.
- Implementation prerequisites: complete. The exact matrix, strict before evidence, source adjudications, 47-file accepted-family set, asset disposition, and three disjoint Terra packets are frozen.
- Carried evidence-only waivers expected at acceptance: `W-MODEL`, `W-AT`/`AXE-01`, `W-SHA`/`RW-VF-06`, `W-PROGRESS`, and the already documented missing Design Auditor reference bundle. None may weaken product acceptance.
- Gate result: **READY WITH WAIVERS for implementation.** Evidence-only waivers do not weaken D2 product acceptance.

| Owner | Blocked work | Next action | Closure condition | Why reconciliation may begin |
|---|---|---|---|---|
| Sol | none | Run three disjoint Terra builders, independently diff-inspect, then author the dedicated verifier | Assigned files satisfy the frozen matrix without shared/S43/forbidden edits | Deterministic gates, baseline, sentinels, and serialized shared ownership are available |

## Frozen family scope

**Family IDs:** `19,42,43,68,71,83,92`

| ID | Product file | Active spec | Disposition |
|---|---|---|---|
| 19 | `balencia-screens/src/components/hifi/screens/profile/S19RpgCharacter.tsx` | `Balencia-New-Screens/hifi-screens/19-rpg-character.md` | implement and verify |
| 42 | `balencia-screens/src/components/hifi/screens/profile/S42CelebrationOverlay.tsx` | `Balencia-New-Screens/hifi-screens/42-celebration-overlay.md` | implement and verify |
| 43 | `balencia-screens/src/components/hifi/screens/profile/S43Paywall.tsx` | `Balencia-New-Screens/hifi-screens/43-paywall-upgrade.md` | accepted pilot sentinel; verify only; exact SHA `134d064bfef7d1d9a4b77f6ac4558a8c80beaa14fe42167501396797dd6e39c3` |
| 68 | `balencia-screens/src/components/hifi/screens/profile/S68UniversalSearch.tsx` | `Balencia-New-Screens/hifi-screens/68-universal-search.md` | implement and verify |
| 71 | `balencia-screens/src/components/hifi/screens/profile/S71AchievementGallery.tsx` | `Balencia-New-Screens/hifi-screens/71-achievement-gallery.md` | implement and verify |
| 83 | `balencia-screens/src/components/hifi/screens/profile/S83BuddyProfile.tsx` | `Balencia-New-Screens/hifi-screens/83-social-buddy-profile.md` | implement and verify |
| 92 | `balencia-screens/src/components/hifi/screens/profile/S92Reputation.tsx` | `Balencia-New-Screens/hifi-screens/92-reputation.md` | implement and verify |

## Required outcomes

- **19:** one exact ten-domain payload drives the constellation, computed Life Power, visible cards, ranking, and nonvisual ordered exposure; no stale nine-domain taxonomy or actionless cards.
- **42:** both actions clear at 390×844 and 125% text; a code-native neutral badge emblem replaces the numeral; no nested glass; Fitness/Finance evidence tags remain explicit.
- **43:** accepted pilot sentinel is exercised in the D2 verifier but remains byte-identical.
- **68:** native labelled search and conditional clear; category counts equal rendered rows; loading, first-use/empty, zero-results, error, offline, and results are mutually exclusive.
- **71:** 47/120 and 39% agree without collision; `Achievement` terminology and current ten-domain registry; code-native BadgeTile semantics/tokens; populated data never coexists with first-use streak truth.
- **83:** active count equals rendered shared-mission rows; media remains consent-first; `HIFI-83-01` initials fallback stays unless a privacy-safe image materially improves the screen; empty/shared states never coexist.
- **92:** canonical `PaywallLock`; metric rows are native controls opening explanations; default, offline, and sync-error are separated; cached/error truth and due-process controls remain explicit.

## Asset disposition target

- D2 requires no external raster by default.
- `HIFI-83-01` remains the privacy-first `AK` initials fallback unless reconciliation demonstrates a material, consent-safe reason for a screen-specific bitmap. No real person, logo approximation, or generic stock avatar is permitted.
- S42's badge emblem is code-native component/iconography, not an image slot.

## Planned ownership

Reconciliation is read-only. Intended implementation split, to be frozen after reconciliation:

| Builder | Product files |
|---|---|
| Terra A | `S19RpgCharacter.tsx`, `S42CelebrationOverlay.tsx` |
| Terra B | `S68UniversalSearch.tsx`, `S71AchievementGallery.tsx` |
| Terra C | `S83BuddyProfile.tsx`, `S92Reputation.tsx` |
| Sol only | `S43Paywall.tsx` sentinel custody, shared kit/globals/registries/routes, verifier, all evidence/ledger/decision/handoff files |

## Stop conditions

- Same materially equivalent failure twice: stop repetition, shrink/re-ground/escalate.
- Any shared-kit or global-token change: pause product writers, Sol serializes, then rerun accepted-family sentinel checks.
- Any source conflict not resolved by the hierarchy, privacy/safety decision, unavailable deterministic verification path, or scope expansion: stop and escalate.
- Any touch to `yhealth-app`, Figma, Railway, backend, commit/stage/reset/stash, destructive action, or dev `:3001`: hard stop.
- Any attempted edit to S43 absent a demonstrated regression and Sol-owned escalation: hard stop.

## Log

- 2026-07-12: D2 opened after D1 durable closure. Seven specs and the D2 audit selected; no batch-ID collision. Product/source SHA baseline recorded in `evidence/BEFORE-SOURCE.md`.
- 2026-07-12: Forgeflow batch-start and pre-development checks completed. Gate is READY WITH WAIVERS for read-only reconciliation and BLOCKED for implementation pending the frozen matrix, production before capture, accepted sentinels, and Terra packets.
- 2026-07-12: fresh production build `4DIYzXDGWaIiSUi5HAbHZ` served on `:3002`; strict baseline rendered 7/7 with zero issues/warnings/missing frames/console errors. Seven immutable PNGs and the JSON report are integrity-recorded in `evidence/BEFORE-CAPTURE-MANIFEST.md`; Sol inspected every baseline frame at native pixels.
- 2026-07-12: three Luna reconciliations completed and were persisted as `evidence/recon-{a,b,c}.md`. Sol retired stale S19/S43/S71 audit claims, resolved persona/event/taxonomy/shared-boundary ties, validated 47 unique accepted files, recorded the no-raster disposition, and froze `VERIFICATION-MATRIX.md` at exactly 73 PNGs/80 isolated contexts before the first D2 product edit. Three disjoint Terra packets are complete; the implementation gate is READY WITH WAIVERS.
- 2026-07-12: three disjoint Terra builders returned their assigned S19/S42, S68/S71, and S83/S92 files with targeted ESLint reported clean. Their boundary reports and handoff hashes are persisted in `evidence/builder-{a,b,c}.md`; all output remains evidence until Sol's source inspection, fresh production verifier, rendered inspection, and independent reviews accept it.
- 2026-07-12: final-v2 source candidate was rebound and independently accepted by design/source, accessibility/trust, and CLEAR reviewers at 0 Critical / 0 High / 0 Medium with no eight-hash drift. All four repair packets and three final review reports are persisted. `npm run check` passed (104 routes/specs, 14 assets, 384 copy files, 384 brand files; one unrelated pre-existing unused-import warning), accepted sentinels passed 47/47 with exact manifest/S12/S43 locks, `git diff --check` passed, and fresh production build `1iPY5HfzgAm0kPfEEZZnM` completed. D2 remains open because approval to launch the fresh production server on `:3002` was rejected earlier and has not yet been explicitly renewed; 80/80 runtime, 73 PNGs, strict 7/7, root 104/104, and Sol rendered inspection are pending.
- 2026-07-16: renewed local launch authorization allowed final acceptance on fresh production build `BkBidMSJRPC2-G9ymoOyL`. The hardened D2 verifier passed `80/80` isolated contexts/nonces, `106` checks, exactly `73/73` promoted PNGs, seven 125% proofs, zero console/page/capability events, empty storage/cookies, unchanged integrity, and exact S43/accepted-family locks. Strict passed `7/7` at zero issues/warnings; `npm run check`, root `104/104`, manifest, and root/submodule diff gates passed. Sol inspected final native-pixel defaults and accepted D2. Final-v2 independent reviews remain `0 Critical / 0 High / 0 Medium`. D2 closes with evidence-only waivers; E1 is the sole next slice.
