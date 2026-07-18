# VISUAL-012-F2-health-care-media — batch contract

- Opened: 2026-07-16
- Parent goal: finalize D1→I1 Balencia visual-prototype families and produce R11
- Status: **closed with evidence waivers — Sol accepted under DVF-19; G1 is the only next wave**
- Theme: shopping, sleep, medication, notes, energy, exercise, virtual try-on, vision, and wellbeing
- Session cap: 10 screens (`57,58,60,62,63,70,86,87,88,89`)
- Active lane/root: Balencia visual prototype finalization / `balencia-screens/`
- Excluded: G1+, `yhealth-app/**`, accepted-family product edits, shared kit/globals without Sol adjudication, backend/API/auth, Figma, Railway, production data, external accounts, git mutation, and dev `:3001`
- Evidence root: `plans/batches/VISUAL-012-F2-health-care-media/evidence/`

## Runtime intake

```yaml
goal_lifecycle: /goal
execution_mode: multi-agent
wait_policy: monitor
runtime_profile: codex-native
model_routing_policy: gpt56-tiered
orchestrator_role: Sol root orchestrator and final acceptor
orchestrator_model: gpt-5.6-sol
orchestrator_effort: ultra
worker_backend: native Codex agents
worker_agent_type: scope_scout (Luna) / builder and independent reviewer (Terra)
worker_effort: Luna medium; Terra high
max_threads: 4 total including root
max_depth: 1
worker_task_packet: plans/batches/VISUAL-012-F2-health-care-media/workers/*.md
verify_command: fresh npm run build + next start -p 3002; dedicated hardened F2 verifier; strict 10/10; npm run check; root 104/104; accepted sentinels; root/submodule diff checks
usage_guard: one durable goal; bounded packets; 2-strike repair rule; no dev :3001
```

## Pre-development gate

- Current handoff, root/lane guidance, live `/screens/<id>` registry and product code, current ten specs, compact canon/catalog, RPG authority, `_HIFI-LEDGER.md`, `_IMAGE-SLOTS.md`, and accepted F1 record are active sources.
- Current specs and live contracts win over the old release-blocked F2 audit. Visible coach naming is `CIA`.
- Fresh production acceptance is restricted to `:3002`; prototype behavior remains local and visual-only.
- Medical and privacy decisions remain Sol-owned. Screen 60 uses a neutral demo medication fixture and safety-reviewed copy.
- Gate: **READY WITH WAIVERS for read-only reconciliation; BLOCKED for implementation** until the fresh baseline, accepted sentinel manifest, asset dispositions, exact state/PNG matrix, hard assertions, and disjoint Terra packets are frozen.

## Frozen family scope

| ID | Product file | Active spec |
|---|---|---|
| 57 | `balencia-screens/src/components/hifi/screens/health/S57ShoppingList.tsx` | `Balencia-New-Screens/hifi-screens/57-shopping-list.md` |
| 58 | `balencia-screens/src/components/hifi/screens/health/S58SleepTracking.tsx` | `Balencia-New-Screens/hifi-screens/58-sleep-tracking.md` |
| 60 | `balencia-screens/src/components/hifi/screens/health/S60MedicationTracking.tsx` | `Balencia-New-Screens/hifi-screens/60-medication-tracking.md` |
| 62 | `balencia-screens/src/components/hifi/screens/health/S62QuickNotes.tsx` | `Balencia-New-Screens/hifi-screens/62-quick-notes.md` |
| 63 | `balencia-screens/src/components/hifi/screens/health/S63EnergyTracking.tsx` | `Balencia-New-Screens/hifi-screens/63-energy-tracking.md` |
| 70 | `balencia-screens/src/components/hifi/screens/health/S70ExerciseLibrary.tsx` | `Balencia-New-Screens/hifi-screens/70-exercise-library.md` |
| 86 | `balencia-screens/src/components/hifi/screens/health/S86VirtualTryon.tsx` | `Balencia-New-Screens/hifi-screens/86-virtual-tryon.md` |
| 87 | `balencia-screens/src/components/hifi/screens/health/S87TryonHistory.tsx` | `Balencia-New-Screens/hifi-screens/87-tryon-history.md` |
| 88 | `balencia-screens/src/components/hifi/screens/health/S88VisionSuite.tsx` | `Balencia-New-Screens/hifi-screens/88-vision-suite.md` |
| 89 | `balencia-screens/src/components/hifi/screens/health/S89Wellbeing.tsx` | `Balencia-New-Screens/hifi-screens/89-wellbeing-hub.md` |

## Stop conditions

- Stop on unresolved source/privacy/health-safety conflict, scope expansion, accepted regression, unavailable deterministic verification, or repeated equivalent failure.
- Hard stop on `yhealth-app`, external service, production data, Figma/Railway, destructive git, or dev `:3001` use.

## Log

- 2026-07-16: F1 closed under DVF-18 at 69/104 accepted. F2 opened at baseline HEAD `5e933f6`; read-only reconciliation is READY WITH WAIVERS and implementation is blocked pending frozen intake evidence.
- 2026-07-16: three bounded Luna inventories completed. Fresh production build `OvYMe316EbkSyWfZwPscI` baseline is 10/10 with zero hard issues and two known warnings (S57 non-native checkboxes, S60 small CIA-help target). The 71-file accepted-through-F1 guard passes. Four slots are frozen code-native/no-raster. The exact matrix is 113 PNG fixtures plus ten true 125% proofs across 123 contexts; three disjoint Terra packets are frozen. Implementation is READY WITH WAIVERS.
- 2026-07-16: final build `7nh9Nk_hp6hS-s36ayB3Y` passes `123/123` contexts, `113/113` distinct top-and-lower-view phone proofs, ten 125% proofs, and `1341` checks with zero console/page/capability events. Strict is `10/10` with zero issues/warnings; check, root 104/104, 71 sentinels, and root/submodule diff gates pass. Three final-v2 reviews approve at C0/H0/M0/L0. Sol accepts F2 under DVF-19; family acceptance is `79/104`; G1 is the sole next slice.
