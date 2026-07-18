# VISUAL-008-D1-profile-settings-core — batch contract

- Opened: 2026-07-11
- Parent goal: finalize D1→I1 Balencia visual-prototype families and produce the final verified 104-screen development-handoff package (R11), preserving accepted pilot/A1/A2/B1/C1 work
- Prior checkpoint: C1 accepted under DVF-14 and durably closed
- Status: **closed with evidence-only waivers — Sol accepted; D2 is the only next family**
- Theme: profile, exploration, settings, connected services, billing, notification history, help, and profile editing
- Session cap: 8 screens
- Active lane: Balencia visual prototype finalization
- Active root: `balencia-screens/`
- Excluded lanes/actions: `yhealth-app/**`, backend work, Figma, Railway, commits, staging, reset, stash, and destructive git operations
- Evidence root: `plans/batches/VISUAL-008-D1-profile-settings-core/evidence/`

## Runtime intake

```yaml
goal_lifecycle: /goal (same native Codex durable goal opened for C1→I1 then R11)
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
worker_task_packet: plans/batches/VISUAL-008-D1-profile-settings-core/workers/*.md
worker_output_path: plans/batches/VISUAL-008-D1-profile-settings-core/evidence/
saved_workflow: n/a
verify_command: fresh npm run build + next start -p 3002; verify-d1-profile.mjs; strict 8/8; npm run check; root 104-screen validator; root/submodule diff checks
evidence_path: plans/batches/VISUAL-008-D1-profile-settings-core/evidence/
usage_guard: one durable goal; <=4 concurrent agents; bounded packets; 2-strike repair rule; never use dev :3001
closeout_writes:
  - BATCH.md and frozen VERIFICATION-MATRIX.md
  - evidence/VERIFICATION-LOG.md, three family review reports, and three final runtime-delta review reports
  - evidence/ASSET-DISPOSITION.md
  - Balencia-New-Screens/build-progress/remediation-2026-07/REMEDIATION-LEDGER.md
  - VISUAL-001/DECISIONS.md, IMPLEMENTATION-PLAN.md, and AUDIT-INDEX.md
  - plans/next-session-handoff.md
```

### Provider availability

- GLM is unavailable: the carried provider evidence is HTTP 429, code 1310, with reset `2026-07-13 19:05:16`.
- GLM is not claimed as used. Native Luna/Terra substitution is explicit for every delegated slice.
- `W-MODEL` remains in force because the collaboration surface does not expose a worker-thread model attestation; packeted role/model intent and task provenance are recorded.

## Pre-development gate

- Active docs: `plans/codex-continuation-prompt.md`, current handoff, live prototype code/routes, D1 audit, eight current hi-fi specs, `_HIFI-LEDGER.md`, `_IMAGE-SLOTS.md`, compact canon, component catalog, current design tokens, and the accepted C1 authority snapshot.
- Archived/retired docs: context only. Live code and current `Balencia-New-Screens/` authority win operational ties.
- Tie-breaker: current route/registry and code truth first; repaired hi-fi screen spec for intended behavior; current canon/catalog/tokens for shared visual behavior; continuation contract for scope and sequencing.
- Source links resolve and the batch is bounded to eight profile/settings screens in one active root.
- Selected gates: before/after strict visual capture, targeted TypeScript/ESLint, fresh production build on `:3002`, dedicated hardened D1 verifier with isolated contexts and exact PNG manifest, `npm run check`, strict 8/8, 104/104 validator, root/submodule diff checks, three independent Terra reviews, Sol rendered inspection.
- Deterministic evidence path: this batch's `evidence/` tree.
- Worker readiness: three complete Luna reconciliation packets are issued below; no worker may edit product files during reconciliation.
- Carried waivers: `W-MODEL`, `W-AT`/`AXE-01`, `W-SHA`/`RW-VF-06`, `W-PROGRESS`, `W-TRUNC-40`, and `W-TRUNC-80`. None weakens D1 product acceptance.
- Gate result: **READY WITH WAIVERS for implementation.** Three Luna reconciliations are persisted, the exact 91-PNG/99-context matrix is frozen, all source ambiguities are adjudicated, accepted-family hashes are recorded, and four disjoint Terra packets are complete.

| Owner | Blocked work | Next action | Closure condition | Why work may begin |
|---|---|---|---|---|
| Sol | none | Run disjoint Terra builder waves, then independently diff-inspect | Assigned files satisfy the frozen matrix without shared or forbidden edits | Deterministic gates and serialized shared ownership remain available |

## Frozen family scope

**Family IDs:** `17,18,21,22,23,24,25,50`

| ID | Product file | Active spec |
|---|---|---|
| 17 | `balencia-screens/src/components/hifi/screens/profile/S17MeMain.tsx` | `Balencia-New-Screens/hifi-screens/17-me-main.md` |
| 18 | `balencia-screens/src/components/hifi/screens/profile/S18Explore.tsx` | `Balencia-New-Screens/hifi-screens/18-explore-section.md` |
| 21 | `balencia-screens/src/components/hifi/screens/profile/S21Settings.tsx` | `Balencia-New-Screens/hifi-screens/21-settings.md` |
| 22 | `balencia-screens/src/components/hifi/screens/profile/S22ConnectedServices.tsx` | `Balencia-New-Screens/hifi-screens/22-connected-services.md` |
| 23 | `balencia-screens/src/components/hifi/screens/profile/S23SubscriptionBilling.tsx` | `Balencia-New-Screens/hifi-screens/23-subscription-billing.md` |
| 24 | `balencia-screens/src/components/hifi/screens/profile/S24NotificationHistory.tsx` | `Balencia-New-Screens/hifi-screens/24-notification-history.md` |
| 25 | `balencia-screens/src/components/hifi/screens/profile/S25HelpCenter.tsx` | `Balencia-New-Screens/hifi-screens/25-help-center.md` |
| 50 | `balencia-screens/src/components/hifi/screens/profile/S50ProfileEdit.tsx` | `Balencia-New-Screens/hifi-screens/50-profile-edit.md` |

No D1 pilot sentinel exists. Accepted pilot/A1/A2/B1/C1 product files remain read-only sentinels.

## Required outcomes

- **17:** distinguish 3 connected providers from 84 imported records; complete reversible data controls; complete truth states.
- **18:** one reconciled chart/legend totaling 100%; explicit radar disposition; canonical `PaywallLock`; per-suggestion provenance.
- **21:** notifications, background sync, and Face ID implemented or explicitly dispositioned; reversible data controls; honest safety capability.
- **22:** provider-specific consent and actions; coherent sync/retry truth; no internal-route copy; true disabled reasons; >=44px controls; reduced-motion progress.
- **23:** 80% equals 8/10; announce `800 of 1,000 used`; semantic comparison table; billing provenance and equal exits.
- **24:** no markup leakage; native filters and overflow; omit zero check-ins; reconciled chart scopes and domain tokens.
- **25:** real labelled search, clear, and result behavior; consent before CIA help handoff with equal exits; honest no-ticket state; operable footer actions.
- **50:** native text/tel/textarea fields; first-photo consent before picker; Save enabled only for valid dirty edits without completeness pressure; unsaved-exit confirmation.

## Asset disposition

- D1 requires no raster by default.
- `HIFI-50-01` is conditional: use a bitmap only if it is privacy-safe, screen-specific, and materially better than an honest-null avatar. Otherwise record an explicit honest-null/waiver disposition. Never approximate or generate the Balencia logo.

## Planned verification gates

From `balencia-screens/`:

1. Targeted TypeScript and ESLint for touched D1 files and verifier.
2. `npm run check`.
3. Fresh `npm run build`, then `next start -p 3002`; never dev `:3001`.
4. `node scripts/verify-visual-104.mjs --strict --only 17,18,21,22,23,24,25,50 --screenshots` => 8/8, zero issues/warnings/missing frames/console errors.
5. New hardened `scripts/verify-d1-profile.mjs`: fresh isolated context and nonce per case, storage/cookies cleared, 390x844, reduced-motion default, fonts/images awaited, pass-atomic exact-name screenshots, product/API/authority fingerprints, zero console/page/capability events, 125% text checks, focus traps/restoration, >=44px targets, >=16px editable fields, contrast, mutually exclusive states, D1-specific data/form/consent assertions.

From workspace root:

6. `node Balencia-New-Screens/work/validate-redesign.mjs --json` => 104/104 with no defects/uncovered screens.
7. `git diff --check` and `git -C yhealth-app diff --check`.
8. Three independent non-builder Terra reviews: code/correctness, design/source, accessibility/trust.
9. Sol full-resolution rendered inspection with zero unresolved Critical/High/Medium findings.

## Worker ownership plan

Reconciliation is read-only. Builder ownership will be frozen after reconciliation; the intended disjoint split is:

| Builder | Product files |
|---|---|
| Terra A | `S17MeMain.tsx`, `S18Explore.tsx` |
| Terra B | `S21Settings.tsx`, `S22ConnectedServices.tsx` |
| Terra C | `S23SubscriptionBilling.tsx`, `S24NotificationHistory.tsx` |
| Terra D | `S25HelpCenter.tsx`, `S50ProfileEdit.tsx` |
| Sol only | shared kit, globals, registries/routes, verifier, all ledgers/authority/handoff files |

With four total agent slots, builders run in bounded waves; no parallel writer may share a product file.

## Stop conditions

- Same materially equivalent failure twice: stop repetition, shrink/re-ground/escalate.
- Any shared-kit or global-token change: pause product writers, Sol serializes, then run accepted-family sentinel checks.
- Any source conflict not resolved by the hierarchy, privacy/safety decision, unavailable deterministic verification path, or scope expansion: stop and escalate.
- Any touch to `yhealth-app`, Figma, Railway, backend, commit/stage/reset/stash, or destructive action: hard stop.

## Log

- 2026-07-11: D1 opened after C1 durable closure. Eight specs and the D1 audit selected; no batch-ID collision. Source SHA baseline recorded in `evidence/BEFORE-SOURCE.md`.
- 2026-07-11: pre-development gate is READY WITH WAIVERS for read-only reconciliation; implementation remains held until the matrix is frozen.
- 2026-07-11: strict production baseline on `:3002` rendered 8/8 with zero issues and two warning screens: S22 one 36px target; S23 three 36px targets. Eight exact before PNGs and JSON report persisted; Sol inspected all eight at full resolution.
- 2026-07-11: three Luna reconciliations completed and persisted as `evidence/recon-{a,b,c}.md`. Sol rejected stale lowercase-Cia guidance under DVF-07, resolved S18 radar, S22 roster/entitlement, S24 data/token, and S50 asset/composition ambiguities, then froze `VERIFICATION-MATRIX.md` at exactly 91 PNGs/99 isolated contexts before the first D1 product edit.
- 2026-07-11: accepted pilot/A1/A2/B1/C1 source bytes frozen in `evidence/ACCEPTED-SENTINELS-BEFORE.sha256`; four disjoint Terra builder packets completed. Implementation pre-development gate is READY WITH WAIVERS.
- 2026-07-11: all four builder packets were integrated and independently reviewed. Three fresh read-only Terra reviews plus bounded rechecks reached zero unresolved Critical/High/Medium findings; Sol independently covered each reviewer's builder exclusion. Static review evidence is persisted as `evidence/review-{clear,design-source,a11y-trust}.md`.
- 2026-07-11: final static candidate passed targeted ESLint, verifier syntax, TypeScript, `npm run check` (104 routes, 14 assets, 384 copy files, 384 brand files), accepted-sentinel verification (39/39), S12 SHA lock, and `git diff --check`. The only lint warning is the unrelated pre-existing `DomainDashboardHeader.figma.tsx` unused import. Fresh production build `Jv0h5uMKnL3lRojN7rvAZ` completed successfully; verifier SHA is `51ec53a352a70ef1a15a6c81e681811de135aa0f1d740062bc49068dd1ef0bdc`.
- 2026-07-11 22:10 PKT: the approved `next start -p 3002` action was rejected by the automatic approval service because its usage limit is exhausted until 23:40 PKT. No dev `:3001`, alternate port, indirect listener, or sandbox workaround was attempted. Runtime verification remains pending explicit post-warning user authorization and successful approval-service execution.
- 2026-07-12: fresh root-owned production verification resumed on `:3002`. Runtime-first failures were repaired without weakening contracts: S24 tag contrast, valid slash-class selectors, a programmatic disabled reason, and visible CIA casing; S50's `Verified` floor; and S18 PaywallLock 125% clearance.
- 2026-07-12: final delta review found S18 honest-null metadata incorrectly exposed `0 domains / 100 total`. Sol changed it to exact `0/0`, preserved `5/100` real/partial truth, and tightened the assertion. Capture hardening now leaves product styles untouched, requires a neutral computed transform/filter, uses bundled Playwright Chromium, and promotes a PNG only after two consecutive byte-identical captures within five attempts; visual transforms still fail.
- 2026-07-12: accessibility review found S24's selected filter used color alone. Sol added a visible check marker and exact one-marker assertions for default, CIA-filter, and surviving-All states. The repaired current artifact passes fresh build `4nUT-X9OiQPkl5XA4LvFO`, hardened `99/99` contexts/nonces with `91/91` PNGs and `123` checks, strict `8/8`, full check, root `104/104`, accepted sentinels `39/39`, and root/submodule diff checks.
- 2026-07-12: an initial accessibility worker crossed its read-only no-runtime boundary. Sol rejected its output, interrupted it, terminated the resulting listener, rebuilt under root ownership, and used a fresh replacement reviewer. No worker source edit or forbidden-lane change was accepted.
- 2026-07-12: three final runtime-delta reviews and Sol's full-resolution inspection of all 91 stability-gated PNGs close at `0 Critical / 0 High / 0 Medium`. D1 is accepted under DVF-15. Product digest before authority persistence is `06004e81af243fd7c2aad37f5ce5e0c3f19dfa76c094efb66000666d5b3ae328`; stability-gated verifier SHA is `394d898c2514f4d5417c8bb4e5bb4bb7ea490d29c26c9dbd9f31b7c184e115ed`. The final post-persistence production/authority digest is recorded in `evidence/VERIFICATION-LOG.md` without mutating this authority snapshot afterward.

## Completion gate

- [x] Reconciliation outputs reviewed and persisted
- [x] Exact matrix frozen before first product edit
- [x] Before/after evidence complete and integrity-bound
- [x] Every required outcome implemented or explicitly dispositioned
- [x] Asset disposition recorded
- [x] Dedicated verifier, strict 8/8, check, build, validator, and diff gates pass
- [x] Three independent Terra review lenses plus final delta rechecks and Sol rendered inspection pass at 0 Critical/High/Medium
- [x] Remediation ledger, decisions, implementation plan, audit index, and next-session handoff updated
- [x] D1 accepted by Sol and only D2 opened next
