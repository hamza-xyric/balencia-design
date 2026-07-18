# VISUAL-013-G1-domains-finance-growth — batch contract

- Opened: 2026-07-16
- Parent goal: finalize D1→I1 Balencia visual-prototype families and produce R11
- Status: **closed with evidence waivers — Sol accepted under DVF-20; H1 is the only next wave**
- Theme: finance, budget, career, relationships, spirituality, learning, creativity, journal, and habits
- Session cap: 9 screens (`30,31,32,33,34,35,36,37,38`)
- Active lane/root: Balencia visual prototype finalization / `balencia-screens/`
- Excluded: H1+, `yhealth-app/**`, accepted-family product edits, shared kit/globals without Sol adjudication, backend/API/auth, Figma, Railway, production data, external accounts, git mutation, and dev `:3001`
- Evidence root: `plans/batches/VISUAL-013-G1-domains-finance-growth/evidence/`

## Runtime intake

```yaml
goal_lifecycle: /goal
execution_mode: multi-agent
wait_policy: monitor
loop_primitive_legacy: /goal
runtime_profile: codex-native
model_routing_policy: gpt56-tiered
orchestrator_role: Codex / Sol root orchestrator and final acceptor
orchestrator_model: gpt-5.6-sol
orchestrator_effort: ultra
worker_backend: native Codex agents
provider: Codex
worker_agent_type: scope_scout (Luna) / builder and independent reviewer (Terra)
worker_model: gpt-5.6-luna for recon; gpt-5.6-terra for bounded writes/reviews
worker_effort: Luna medium; Terra high
endpoint_class: native
max_threads: 4 total including root
max_depth: 1
worker_task_packet: plans/batches/VISUAL-013-G1-domains-finance-growth/workers/*.md
worker_output_path: plans/batches/VISUAL-013-G1-domains-finance-growth/evidence/*.md
verify_command: fresh npm run build + next start -p 3002; dedicated hardened G1 verifier; strict 9/9; npm run check; root 104/104; accepted sentinels; root/submodule diff checks
evidence_path: plans/batches/VISUAL-013-G1-domains-finance-growth/evidence/
usage_guard: one durable goal; bounded packets; two-strike repair rule; no dev :3001
closeout_writes: BATCH, VERIFICATION-LOG, VISUAL-001 decisions/plan/index, remediation ledger, next-session handoff
```

## Source hierarchy and scope

Live code/contracts and active screen specs win operational ties; current creative/canon authority governs visuals; archived/retired material is context only. The active G1 audit is read-only evidence, not authority over newer specs/live contracts.

| ID | Product file | Active spec |
|---|---|---|
| 30 | `balencia-screens/src/components/hifi/screens/domains/S30FinanceMoneyMap.tsx` | `Balencia-New-Screens/hifi-screens/30-finance-money-map.md` |
| 31 | `balencia-screens/src/components/hifi/screens/domains/S31BudgetDetail.tsx` | `Balencia-New-Screens/hifi-screens/31-transaction-budget-detail.md` |
| 32 | `balencia-screens/src/components/hifi/screens/domains/S32CareerDashboard.tsx` | `Balencia-New-Screens/hifi-screens/32-career-work-dashboard.md` |
| 33 | `balencia-screens/src/components/hifi/screens/domains/S33RelationshipsDashboard.tsx` | `Balencia-New-Screens/hifi-screens/33-relationships-dashboard.md` |
| 34 | `balencia-screens/src/components/hifi/screens/domains/S34SpiritualityDashboard.tsx` | `Balencia-New-Screens/hifi-screens/34-spirituality-dashboard.md` |
| 35 | `balencia-screens/src/components/hifi/screens/domains/S35LearningDashboard.tsx` | `Balencia-New-Screens/hifi-screens/35-learning-growth-dashboard.md` |
| 36 | `balencia-screens/src/components/hifi/screens/domains/S36CreativityDashboard.tsx` | `Balencia-New-Screens/hifi-screens/36-creativity-dashboard.md` |
| 37 | `balencia-screens/src/components/hifi/screens/domains/S37Journal.tsx` | `Balencia-New-Screens/hifi-screens/37-journal.md` |
| 38 | `balencia-screens/src/components/hifi/screens/domains/S38Habits.tsx` | `Balencia-New-Screens/hifi-screens/38-habits.md` |

## Pre-development gate

- Active docs, tie-breakers, exact nine-screen scope, deterministic production gates, evidence path, runtime/routing controls, and bounded recon packets are named.
- Accepted-through-F2 bytes are immutable: the frozen guard is 81 unique files (71 inherited from F2 acceptance plus ten F2 additions), excluding all nine G1 targets. Shared/API/verifier surfaces require start/end fingerprints.
- Finance truth, ten-domain/Life Power/RPG values, privacy, destructive behavior, capability honesty, image-slot dispositions, exact state/PNG matrix, actual 125% proof, and disjoint Terra ownership remain Sol-owned freeze decisions.
- Worker availability: native Luna/Terra roles are configured under the trusted project layer; all output remains evidence until Sol verification.
- Waivers: physical-device AT/system Dynamic Type, broad Axe, exact spawned-worker runtime provenance, dirty-worktree immutable SHA, and final one-SHA R11 evidence remain downstream limits.
- Gate: **READY WITH WAIVERS for implementation.** Baseline, 81-file accepted guard, Sol taxonomy/finance/privacy decisions, no-raster disposition, exact 123-context/114-PNG matrix, hard assertions, and three disjoint Terra packets are frozen. Evidence-only waivers do not block local visual-prototype work.

## Stop conditions

- Stop on unresolved source/finance/privacy/RPG conflict, scope expansion, accepted regression, unavailable deterministic verification, or two equivalent failures.
- Hard stop on `yhealth-app`, external service, production data, Figma/Railway, destructive git, or dev `:3001` use.

## Log

- 2026-07-16: F2 closed under DVF-19 at 79/104 accepted. G1 opened at observed dirty-worktree HEAD `5e933f6`; root 104/104, `npm run check`, accepted 71/71 sentinels, and root/submodule diff gates pass. Read-only reconciliation is READY WITH WAIVERS; implementation remains blocked pending frozen intake evidence.
- 2026-07-16: production baseline on build `7nh9Nk_hp6hS-s36ayB3Y` is 9/9 with zero hard issues and two known small-target warnings (S30 Ask CIA, S34 Read more). The 81-file accepted-through-F2 guard is frozen. Three bounded Luna reconciliations are in flight; implementation remains blocked pending their matrix/asset/ownership freeze.
- 2026-07-16: three Luna reconciliations completed. Sol froze ten-domain alias/scoring rules, finance/provider/privacy truth, no-raster dispositions, exact 114-PNG plus nine 125% proof matrix, hard assertions, and three disjoint Terra ownership packets. Implementation is READY WITH WAIVERS.
- 2026-07-16: final build `wFfEvX-H_FYiSIyxbwKIT` passes `123/123` contexts, `114/114` distinct PNG proofs, nine 125% proofs, and `1494` checks with zero console/page/capability/external-request events. Strict is `9/9` with zero issues/warnings; check, root 104/104, 81 sentinels, and root/submodule diff gates pass. Three final-v4 reviews approve at C0/H0/M0/L0 after the S31 financial percentage, meter geometry, and ring-label defects were repaired. Sol accepts G1 under DVF-20; family acceptance is `88/104`; H1 is the sole next slice.
