# VISUAL-015-I1-system-media — batch contract

- Opened: 2026-07-16
- Parent goal: finalize D1→I1 Balencia visual-prototype families and produce R11
- Status: **closed with evidence waivers — Sol accepted under DVF-22; R11 is the only next batch**
- Theme: image viewer, app rating, connected music, video library, obstacle coaching, and canonical system states
- Session cap: 6 screens (`67,69,80,81,85,98`)
- Active lane/root: Balencia visual prototype finalization / `balencia-screens/`
- Excluded: accepted-family product edits, I1 registry/shared-kit/globals edits without Sol adjudication, `yhealth-app/**`, backend/API/auth, Figma, Railway, production data, external accounts, git mutation, and dev `:3001`. Sol owns one I1-local compatibility file: `system/I1TextScaleScope.tsx`.
- Evidence root: `plans/batches/VISUAL-015-I1-system-media/evidence/`

## Runtime intake

```yaml
goal_lifecycle: /goal
execution_mode: multi-agent
wait_policy: none
loop_primitive_legacy: /goal
runtime_profile: codex-native
model_routing_policy: gpt56-tiered
orchestrator_role: Codex / Sol root orchestrator and final acceptor
orchestrator_model: gpt-5.6-sol (project-configured; active /status provenance unavailable)
orchestrator_effort: ultra (project-configured)
worker_backend: native Codex agents
provider: Codex
worker_agent_type: Luna-style read-only recon; Terra-style bounded builders/reviewers
worker_model: intended gpt-5.6-luna recon / gpt-5.6-terra implementation and review; spawned runtime provenance waived as W-MODEL
worker_effort: intended Luna medium / Terra high
endpoint_class: native
max_threads: 4 total including root
max_depth: 1
worker_task_packet: plans/batches/VISUAL-015-I1-system-media/workers/*.md
worker_output_path: plans/batches/VISUAL-015-I1-system-media/evidence/*.md
verify_command: fresh npm run build + next start -p 3002; dedicated hardened I1 verifier; strict 6/6; npm run check; root 104/104; accepted-through-H1 sentinels; root/submodule diff checks
evidence_path: plans/batches/VISUAL-015-I1-system-media/evidence/
usage_guard: one durable goal; six-screen cap; bounded packets; two-strike repair rule; no dev :3001
saved_workflow: n/a
closeout_writes: BATCH, VERIFICATION-LOG, VISUAL-001 decisions/plan/index, remediation ledger, next-session handoff
```

## Source hierarchy and scope

Live code/contracts and active screen specs win operational ties; current creative/canon and approved DVF decisions govern visuals, copy, provider truth, privacy, and state semantics; archived/retired material is context only. The 2026-07-10 I1 audit is defect evidence, not authority over newer live code/spec contracts. `plans/codex-continuation-prompt.md` is historical continuation guidance; its S80 verify-only note does not override current DVF-02 or the active I1 acceptance matrix. S80 remains byte-preserved unless recon or verification demonstrates a current defect.

| ID | Product file | Active spec |
|---|---|---|
| 67 | `balencia-screens/src/components/hifi/screens/system/S67ImageViewer.tsx` | `Balencia-New-Screens/hifi-screens/67-image-viewer.md` |
| 69 | `balencia-screens/src/components/hifi/screens/system/S69AppRating.tsx` | `Balencia-New-Screens/hifi-screens/69-app-rating.md` |
| 80 | `balencia-screens/src/components/hifi/screens/system/S80MusicCoach.tsx` | `Balencia-New-Screens/hifi-screens/80-music-coach.md` |
| 81 | `balencia-screens/src/components/hifi/screens/system/S81VideoLibrary.tsx` | `Balencia-New-Screens/hifi-screens/81-video-library.md` |
| 85 | `balencia-screens/src/components/hifi/screens/system/S85ObstacleCoach.tsx` | `Balencia-New-Screens/hifi-screens/85-obstacle-coach.md` |
| 98 | `balencia-screens/src/components/hifi/screens/system/S98SystemStates.tsx` | `Balencia-New-Screens/hifi-screens/98-system-states.md` |

## Pre-development gate

- Active docs, archived-source rule, tie-breakers, exact six-screen scope, deterministic production gates, evidence path, runtime/routing controls, and three bounded read-only recon packets are named.
- Accepted-through-H1 bytes are immutable: the 90-file accepted-through-G1 union plus ten H1 product additions are frozen as a 100-file manifest. Accepted pilot screen S80 is intentionally inside that union and is verify-only; the other five I1 product targets are excluded.
- Baseline production build `DNYHHOIU8VBdC8MyOBcND` is captured: strict 6/6 has zero issues and one expected S81 target warning (See all 36×16; bookmark 32×44). The 80-PNG/86-context matrix, hard assertions, 125% proofs, capability guards, asset dispositions, S80 byte lock, and disjoint write ownership are frozen.
- Worker availability: native agents are available in this thread tree; worker output remains evidence until Sol verification. Exact spawned-worker model provenance remains waived under W-MODEL.
- The lane-referenced `$balencia-visual-prototype` skill is unavailable; repo rules are applied directly with Senior Frontend, Design Auditor, code-review, and Playwright guidance.
- Waivers: physical-device AT/system Dynamic Type, broad Axe, exact spawned-worker runtime provenance, dirty-worktree immutable SHA, W-PROGRESS, W-TRUNC-40, W-TRUNC-80, and final one-SHA R11 evidence remain downstream limits.
- Gate: **READY WITH WAIVERS for bounded implementation**. The 100-file sentinel guard, baseline, exact state/PNG matrix, hard assertions, code-native asset dispositions, and three disjoint Terra packets are frozen. Evidence waivers do not authorize external capability or accepted-byte mutation.

## Stop conditions

- Stop on unresolved source/provider/privacy/safety conflict, scope expansion, accepted regression, unavailable deterministic verification, or two equivalent failures.
- Hard stop on `yhealth-app` mutation, external service, production data, Figma/Railway, destructive git, or dev `:3001` use.

## Log

- 2026-07-16: H1 closed under DVF-21 at 98/104 accepted. I1 opened at observed dirty-worktree HEAD `5e933f6`. Read-only reconciliation is READY WITH WAIVERS; implementation is blocked pending frozen intake evidence.
- 2026-07-16: baseline strict 6/6 records zero issues and one S81 target warning; accepted-through-H1 union is frozen at 100 files with S80 included; Sol freezes 80 PNGs + six actual 125% proofs, code-native S67/S81 media, five editable product files, immutable S80/HIFI-80 bytes, capability guards, and three disjoint builder packets. Implementation is READY WITH WAIVERS.
- 2026-07-17: final production build `Qn4oB4x3eDtW9xG-vnrPE` passes 86/86 isolated contexts, 80/80 fresh-browser deterministic PNGs, 2300/2300 checks, 51/51 transitions, nine exact focus restorations, the hardened 64-pixel/0.05 perceptual floor across all 3,160 pairs, strict 6/6 at zero issues/warnings, `npm run check`, root 104/104, accepted sentinels, and root/submodule diff checks. Three exact-final reviews accept C0/H0/M0/L0. Sol accepts I1 under DVF-22 at 104/104 family routes; R11 is the only next batch.
