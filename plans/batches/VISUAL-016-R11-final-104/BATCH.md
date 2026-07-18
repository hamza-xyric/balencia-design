# VISUAL-016-R11-final-104 — final 104-screen certification

- Opened: 2026-07-17
- Parent goal: finalize D1→I1 Balencia visual-prototype families and produce the final verified 104-screen development-handoff package
- Status: **founder-authorized; preparing one certified fast-forward commit for `origin/main`**
- Family intake: pilot through I1 accepted under DVF-10 through DVF-22; `104/104` routes family-accepted
- Active lane/root: Balencia visual prototype finalization / `balencia-screens/`
- Session cap: one cross-family certification batch; no parallel family or product lane
- Evidence root: `plans/batches/VISUAL-016-R11-final-104/evidence/`
- Commit authorization request: `R11-AUTH-01` in `evidence/COMMIT-SCOPE.md`
- Excluded: `yhealth-app/**`, backend/API/auth/global-state, Figma writes, Railway/deploy, production data, external accounts, logo generation/modification, dev `:3001`, destructive Git, unrelated dirty work, and noncanonical/debug capture artifacts

## Runtime intake

```yaml
goal_lifecycle: /goal
execution_mode: multi-agent
wait_policy: monitor
monitor_scope: fresh build, production-server readiness, serialized 104-screen captures only
runtime_profile: codex-native
model_routing_policy: gpt56-tiered
orchestrator_role: Codex / Sol root orchestrator and final acceptor
orchestrator_model: gpt-5.6-sol (project-configured; live /status provenance unavailable)
orchestrator_effort: ultra (project-configured)
worker_backend: native Codex agents
provider: Codex
worker_agent_type: Terra-style independent read-only reviewers; Luna-style mechanical inventory only
worker_model: intended gpt-5.6-terra review / gpt-5.6-luna inventory; spawned runtime provenance remains W-MODEL unless surfaced
endpoint_class: native
max_threads: 4 total including root
max_depth: 1
worker_task_packet: plans/batches/VISUAL-016-R11-final-104/workers/*.md
worker_output_path: plans/batches/VISUAL-016-R11-final-104/evidence/review-*.md and unfamiliar-engineer-dry-run.md
verify_command: npm run check; fresh npm run build + next start -p 3002; built-in verify:visual; two serialized strict 104 captures at identical SHA/config; dedicated R11 audit with exact 104 route/spec/registry equality; asset/copy/brand; sentinel/asset hashes; root diff checks and exact unchanged yhealth-app tree
evidence_path: plans/batches/VISUAL-016-R11-final-104/evidence/
usage_guard: one durable goal; one candidate commit only; exact authorized scope; two-strike repair rule; no dev :3001
saved_workflow: n/a
closeout_writes: final coverage, finding status, asset manifest, W007 closure, environment manifest, verification log, waiver status, certificate, development handoff, unfamiliar-engineer dry-run, authority/ledger/handoff persist
```

## Authority and source hierarchy

`plans/codex-continuation-prompt.md` §7 and the approved Step 10 plan require a precise visual-finalization scope, a separate unrelated-dirty inventory, and explicit founder authorization before any stage or commit. Live code/contracts and active specs win operational ties; current canon and DVF decisions govern visual/copy/trust semantics; archived and superseded BVF material is context only. The historical Step 10 `:3001` command is superseded by the accepted fresh-production `:3002` hazard control recorded from C1 through I1.

## Authorization gate

Founder authorization was supplied in this Codex task on 2026-07-18: `git commit and push the balencia screens design into main`. This authorizes one certified visual-design commit and a non-force, fast-forward push to `origin/main`. It does not authorize a merge of the 53-commit `hifi-build` history, a force push, tag, reset, stash, clean, amend, second commit, deployment, submodule normalization, or any `yhealth-app/**` change.

Because `origin/main` does not contain the 104-screen hi-fi source tree, the former dirty-only manifest is not self-contained when applied to `main`. The authorized scope is therefore dependency-closed in `evidence/COMMIT-SCOPE.md`: the integration commit is built in an isolated worktree directly from freshly fetched `origin/main`, receives the complete current prototype source plus the canonical 104-screen specifications and curated handoff evidence, and preserves all unrelated dirty work in the original worktree.

## Pre-development gate

- Active authority, exact 104-route scope, source hierarchy, fresh-production `:3002` rule, deterministic gates, evidence targets, runtime controls, reviewer packets, stop conditions, and closeout writes are frozen.
- Pilot through I1 are durably accepted under DVF-10 through DVF-22; R11 does not reopen a family absent a demonstrated final-SHA regression.
- The proposed certified-source scope is canonical-only: intermediate/debug evidence, browser state, superseded precursor audits, unrelated framework/mobile/planning work, and the dirty production submodule are inventoried separately and excluded.
- Physical-device AT/system Dynamic Type, broad Axe, Figma Tier A, exact worker provenance, remaining slot disposition, W-PROGRESS, and W-TRUNC-40/80 remain final-evidence or founder-waiver gates.
- Worker packets are frozen but no final reviewer is delegated before the immutable SHA exists.
- Gate result: **PASS for immutable execution.** Authorization includes the direct `main` push requested by the founder. The source manifest still must pass dependency, mode, size, secret, staged-tree, build, deterministic visual, and fast-forward safety checks before publication.

After authorization, Sol will:

1. finish any source-side R11 harness preparation inside the authorized policy, re-inventory the dependency-closed integration worktree, and reject any path outside that policy;
2. stage only the exact certified-source manifest on a temporary branch based at the fetched `origin/main`, inspect `git diff --cached --check`, staged names, modes, sizes, and staged tree ID;
3. create one certified-source commit with message `feat(visual): finalize 104-screen Balencia handoff`;
4. run all R11 gates at the resulting `certified_source_sha` and generate the final evidence package, each artifact recording that SHA and its own hashes;
5. push that exact commit to `origin/main` only if `origin/main` is still its parent and every required publication gate passes; otherwise stop without force-pushing.

Post-SHA runtime evidence cannot self-contain the commit that it certifies and is not falsely claimed as part of the certified-source commit. It remains a SHA-bound workspace package; committing it later would require separate founder authorization and would not replace the certified source SHA. A product, verifier, source-scope, or configuration change after the candidate commit invalidates that SHA and requires renewed founder authorization before any replacement commit.

## Final certification items

| Item | Required result | Status |
|---|---|---|
| R11-01 authorization and scope integrity | Founder authorizes the dependency-closed `R11-AUTH-01`; staged manifest is a subset of the declared scope with zero unrelated paths | authorized; staging audit pending |
| R11-02 environment and immutable binding | SHA/tree, Node/npm/Next/Playwright/browser, build ID, viewport, DPR, motion, thresholds, verifier/config and accepted-asset hashes pinned | pending |
| R11-03 deterministic 104 proof | Check/build/production server; built-in visual; strict `104/104` twice with exact agreement; validator and repository gates pass | pending |
| R11-04 independent closure audits | W-007 per screen; affordance/glass/honesty/system audits; challenge and reference sets re-certified; C0/H0/M0 | pending |
| R11-05 final package | Coverage, findings, assets, W007, environment, verification, waiver status, certificate, standalone handoff, dry-run persisted | pending |
| R11-06 one-SHA confirmation | One local commit only; immutable post-commit confirmation matches committed evidence | pending |

## Required final outputs

- `evidence/FINAL-COVERAGE-MATRIX.md`
- `evidence/FINDING-STATUS.md`
- `evidence/REPORT-ADDENDUM.md`
- `evidence/ASSET-MANIFEST.md`
- `evidence/W007-CLOSURE.md`
- `evidence/AFFORDANCE-AUDIT.md`
- `evidence/GLASS-TIER-AUDIT.md`
- `evidence/HONESTY-STATE-AUDIT.md`
- `evidence/REFERENCE-RECERTIFICATION.md`
- `evidence/DEPENDENCY-MAP.md`
- `evidence/COMPLIANCE-NOTES.md`
- `evidence/ENVIRONMENT-MANIFEST.md`
- `evidence/VERIFICATION-LOG.md`
- `evidence/WAIVER-STATUS.md`
- `evidence/CERTIFICATE.md`
- `evidence/HANDOFF-PACKET.md`
- `evidence/DEVELOPMENT-HANDOFF.md`
- `evidence/UNFAMILIAR-ENGINEER-DRY-RUN.md`
- `evidence/r11-strict-pass-1.json`, `evidence/r11-strict-pass-2.json`, and their exact capture manifests
- independent `review-clear-final.md`, `review-design-source-final.md`, and `review-accessibility-trust-final.md`

The certificate must contain exactly:

> A+++ here means design-handoff readiness of the 104-screen package — NOT product/production readiness.

## Persistent limits requiring closure or founder waiver

- physical-device VoiceOver/TalkBack and system Dynamic Type (`W-AT` / `AXE-01`)
- broad Axe coverage
- Figma Tier A evidence
- exact spawned-worker model provenance (`W-MODEL`)
- remaining asset-slot disposition, if any
- historical `W-PROGRESS`
- `W-TRUNC-40` and `W-TRUNC-80` reaffirmation or supersession

No known Critical, High, Medium, or Low I1 defect is waived. No final A+++ certificate may be issued while an unwaived Critical, High, or Medium R11 finding remains.

## Stop conditions

- any ambiguity or contradiction in the recorded founder authorization;
- any staged path outside `COMMIT-SCOPE.md`, any `yhealth-app` mutation, or any unrelated tracked/untracked normalization;
- source, safety, privacy, provider, or capability conflict the hierarchy cannot resolve;
- nondeterministic capture or verifier unable to run without an explicit waiver;
- two materially equivalent failures after equivalent repairs;
- product/verifier/config change after the candidate commit;
- request for force push, amend, second commit, destructive Git, Figma, Railway, backend, or production action without new authority.

## Log

- 2026-07-17: I1 closed under DVF-22 at `104/104` family acceptance. R11 opened as the only remaining batch.
- 2026-07-17: pre-authorization scope was reduced to product/source, current authority, canonical family evidence, and R11 source-side contracts/harness. Post-SHA R11 runtime outputs bind the certified source SHA but are not falsely claimed as contained in it. Browser state, superseded BVF/BAL-VIS material, unrelated framework/mobile/planning work, and intermediate/debug visual evidence are excluded.
- 2026-07-17: batch is intentionally stopped at the founder authorization gate. No Git stage, commit, push, reset, stash, clean, amend, or branch mutation occurred.
- 2026-07-18: founder explicitly requested commit and push of the Balencia screens design to `main`. Fetch showed `hifi-build` is 53 commits ahead and 2 behind `origin/main`, so history merge/cherry-pick was rejected. A clean temporary integration branch was created from `origin/main`; the manifest policy was expanded only enough to make the 104-screen prototype and handoff dependency-closed. Direct push remains conditioned on an exact-parent fast-forward check and full certification.
- 2026-07-18: the first local pre-push SHA was invalidated and withheld after independent review proved that `SafetyCard` and `ConsentRail` linked to query parameters their destinations ignored. S25 now opens and focuses static unknown-locale crisis guidance; S84 maps all nine controls to focused named local-preview panels with no-file export truth and source-specific destructive confirmations. A dedicated click-through verifier and no-index/robots safeguards were added, and every commit-bound gate/capture must restart on the replacement one-commit tree.
- 2026-07-18: the next local pre-push SHA was also invalidated and withheld when delta review exercised transitions that direct-query coverage missed: crisis dismissal and WHOOP index-to-detail navigation dropped focus, and privacy sheets were too translucent. S25 now restores focus to Help Center search, S84 refocuses inside the existing trapped modal on every panel transition, and the privacy sheet is opaque. The click-through verifier now asserts both transition paths, Tab containment, and modal opacity before another immutable SHA may be accepted.
