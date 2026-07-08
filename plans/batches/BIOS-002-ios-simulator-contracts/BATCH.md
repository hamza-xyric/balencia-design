# BIOS-002-ios-simulator-contracts — Simulator + Real Backend Contracts

- Status: `closed` (2026-07-09; all gates green, no gate waived)
- Theme: Local backend up, app in iOS Simulator, real sign-in with mobile token payload, five pilot slices exercised against live responses with confirmed DTO adapters, trust/provenance states, simulator evidence.
- Session cap: 7 slices (auth/session, Cia onboarding+chat, Today, Missions, Life Areas, Fitness, data controls) — no widening to other screens.
- Build gate this batch? yes (first simulator batch — `expo export` smoke + simulator run mandatory)
- Active root: `yhealth-app/mobile`
- Source links: `yhealth-app/mobile/docs/READINESS.md`, `yhealth-app/.agent/specs/balencia-ios-foundation.md`, `plans/batches/READINESS-001-ios-predev/evidence/readiness-report.md` §10, `Balencia-New-Screens/hifi-screens/` + `canon/COMPACT-CANON.md` + `canon/COMPONENT-CATALOG.md`, `yhealth-app/server/src/routes/`
- Handoff status target: READY WITH WAIVERS
- Pre-development doc gate: READY WITH WAIVERS (see gate block)
- Documentation evidence path: `plans/batches/BIOS-002-ios-simulator-contracts/evidence/`
- Loop primitive: `ultracode:` (bounded batch; Workflow orchestration per master prompt; `/loop` only for long external waits)
- Runtime profile: `claude-native` (Fable orchestrator) + GLM sub-worker inside Workflow scripts per `runbooks/glm-workflow-worker.md`
- Orchestrator role: Claude (Fable) orchestrates through Forgeflow artifacts; owns acceptance, verification, commits
- Worker backend: GLM (primary implementer), Sonnet (reviews), Haiku (read-only sweeps), Opus (architecture)
- Provider: Z.ai (GLM via `scripts/glm-worker.sh`) + Claude native
- Model: glm-5.2 (worker) / claude-fable-5 (orchestrator) / opus (architecture) / sonnet (review) / haiku (sweeps)
- Endpoint class: provider-api (GLM) + native (Claude)
- Worker task packet: `plans/batches/BIOS-002-ios-simulator-contracts/packets/` (authored in Move D)
- Worker output path: `plans/batches/BIOS-002-ios-simulator-contracts/evidence/glm-drafts/`
- Saved workflow: inline Workflow scripts, persisted under session dir (paths recorded in evidence)
- Usage guard: `scripts/glm-worker.sh --ping` → `OK model=glm-5.2 reply=pong` (2026-07-08, this session); Claude native session active
- Verify command: `npm run lint && npm run typecheck && npm run test && npx expo config --type public && npx expo export --platform web --output-dir dist-smoke` (from `yhealth-app/mobile`) + simulator smoke + real-endpoint exercise log

## Pre-development gate (before status `in progress`)
- [x] Active docs, archived docs, and tie-breaker source identified — hierarchy: hifi-screens+canon > server routes > client (evidence) > yhealth-app-main (historical). Tie-breaker: live code + canon.
- [x] Source links resolve to active docs (READINESS.md, foundation spec, readiness report §10, canon, server routes — all read this session)
- [ ] Blueprint marker — n/a (not Blueprint-backed)
- [x] Verification gates selected: mobile lint/typecheck/test, expo config, expo export smoke, simulator run + screenshots, real-endpoint exercise
- [x] Deterministic verify command and evidence path recorded (header)
- [x] Loop primitive and runtime profile recorded (header)
- [x] Worker smoke-test evidence: GLM ping OK 2026-07-08 this session
- [ ] Worker task packets — authored in Move D before any GLM delegation (gate for Move E)
- [x] Worker output path recorded (header)
- [x] `ultracode:` guard: scope cap = 7 slices above; small first run = inventory workflow before any implementation; stop conditions = scope expansion, repeated GLM failure after 2 attempts + packet refinement, destructive/credential decisions
- [x] Blockers, drift, and waivers recorded (below)
- [x] Gate result: **READY WITH WAIVERS**

### Waivers / blockers carried into this batch (owner → closure)
| # | Item | Owner | Closure condition | Why development may begin |
|---|------|-------|-------------------|---------------------------|
| W1 | `mobile/.env` contains server-grade env (high-risk hygiene) | Hamza | Replaced with EXPO_PUBLIC_*-only per `.env.example` | File is gitignored; batch never reads/prints its values; app reads only EXPO_PUBLIC_* |
| W2 | Apple team type unconfirmed (Individual shown) | Hamza | Decision recorded | No store submission in this batch |
| W3 | TestFlight beta metadata empty | Hamza | Privacy URL + feedback email provided | External testers out of scope this batch |
| W4 | QA account decision (production) | Hamza | OTP vs seeded account chosen | This batch uses a LOCAL dev-DB seeded account only — production QA untouched |
| W5 | W-007: 40 hi-fi screens await independent re-review (Lane A) | Design lane | R-batches close | Mobile slices follow canon + current hi-fi; any spec later remediated gets a parity re-check; screens flagged FIX-FILED are not treated as final |
| W6 | Backend-gated features (WhatsApp, Finance, compliance, barcode, PWA/offline, PSTN) | — | Backend matures | Visible-but-gated with provenance states; never faked |
| B1 | `server/.env` missing — local backend cannot boot yet | This batch (Fable) | Local dev env created (generated dev-only values, gitignored, never printed), migrations + seed run, `/auth/login` returns mobile tokens | In-batch setup task, reversible, local-only |
| B2 | Cia chat may need real AI provider key server-side | This batch → possibly Hamza | Inventory confirms server behavior without keys; if real completion impossible locally, exercise contract against Railway or record waiver | Contract verification is the goal; documented waiver path exists |

## Runtime intake block
```yaml
loop_primitive: "ultracode:"
runtime_profile: claude-native
orchestrator_role: Claude (Fable) orchestrates through Forgeflow artifacts
worker_backend: GLM (implementation) + Sonnet (review) + Haiku (sweeps) + Opus (architecture)
provider: Z.ai + Claude
model: glm-5.2 / claude-fable-5 / opus / sonnet / haiku
endpoint_class: provider-api + native
verify_command: mobile lint+typecheck+test+expo config+export smoke; simulator run; endpoint exercise
evidence_path: plans/batches/BIOS-002-ios-simulator-contracts/evidence/
usage_guard: glm-worker.sh --ping OK (2026-07-08); /status claude-native
worker_task_packet: plans/batches/BIOS-002-ios-simulator-contracts/packets/
worker_output_path: plans/batches/BIOS-002-ios-simulator-contracts/evidence/glm-drafts/
saved_workflow: session-dir workflow scripts (recorded in evidence)
closeout_writes:
  - plans/batches/BIOS-002-ios-simulator-contracts/BATCH.md
  - plans/batches/BIOS-002-ios-simulator-contracts/evidence/
  - yhealth-app/.agent/specs/balencia-ios-foundation.md
  - plans/batches/ROADMAP.md
  - plans/next-session-handoff.md
  - yhealth-app submodule commits + pinned SHA update
```

## Item checklist
| Item | Locator | Status |
|------|---------|--------|
| BIOS-002-01 Local backend up (env, DB, Redis, migrate, seed, mobile login proof) | `yhealth-app/server` + `evidence/local-backend.md` | **done** |
| BIOS-002-02 Auth/session vs real backend (sign-in, token persist, refresh rotation, replay rejection, sign-out, expired-session UX, boot hydration) | `src/services/auth/`, `src/services/api/client.ts` | **done** |
| BIOS-002-03 Cia onboarding + chat vs `/ai-coach/chat` (real LLM replies; idempotency; 4 gated states) | `src/features/cia/`, `src/hooks/use-cia-chat.ts` | **done** |
| BIOS-002-04 Today home vs `/v1/overview/dashboard` (ADR-1; honest-null Life Power/pulse) | `src/features/today/`, `src/services/adapters/overview.ts` | **done** |
| BIOS-002-05 Missions vs `/v1/goals/unified` + `/gamification/stats` (tier rule A4; server userId bug fixed A1) | `src/features/missions/`, `src/services/adapters/missions.ts` | **done** |
| BIOS-002-06 Life Areas vs `/life-areas/summary` (snake_case boundary; migration gap fixed) | `src/features/life-areas/`, `src/services/adapters/life-areas.ts` | **done** |
| BIOS-002-07 Fitness dashboard vs `/workouts/plans` (fabrications deleted → honest-null) | `src/features/fitness/`, `src/services/adapters/fitness.ts` | **done** |
| BIOS-002-08 Trust/data controls (real export w/ truncation honesty, hard-delete two-step, optimistic privacy, gated features, honest consent-history gap) | `src/features/trust/`, `src/services/api/trust.ts` | **done** |
| BIOS-002-09 Simulator smoke: all 7 slices + boot hydration, 14 screenshots + endpoint exercise log | `evidence/simulator/`, `evidence/verification.md` | **done** |

## Batch summary
- **Ship-ready:** all 9 items. 12 GLM packets landed over 6 waves; 4-lens Sonnet review panel (23 findings → 19 adversarially confirmed → all fixed); simulator smoke found 2 more real bugs (unreachable hidden-tab routes; visible all-caps CIA eyebrow) — fixed and re-proven live.
- **Server-side fixes shipped (in yhealth-app):** gamification `req.user.userId` (6 sites, empirically proven), plus 3 documented upstream findings (fresh-install migration gaps incl. manual `139-life-area-checkins.sql`, SQL statement-splitter bugs, boot requires an LLM provider) — owners: server backlog.
- **GLM-vs-Claude split (token routing policy):** GLM drafted 100% of the 12 implementation packets (~55 files); Claude (Fable) did integration seam fixes, review-finding fixes (fix < packet), and the two simulator-found structural fixes. Packet lessons: embed DTO names verbatim and forbid re-derivation (P5 drift); packets composed before dependencies land get MISSING markers that induce stray file creation (P9 provenance.ts); test packets need exact fixture nesting spelled out (P12).
- **Waivers carried forward:** W1 mobile/.env hygiene (Hamza — urgency reconfirmed: toolchain auto-loads it, names visible in logs), W2 Apple team type, W3 TestFlight metadata, W4 production QA account, W5 W-007 40 screens (Lane A), W6 backend-gated features. B2 resolved (GLM-as-provider gives real Cia completions locally).
- **Open questions for Hamza:** OQ-1 multi-device refresh (BIOS-003 entry), founder acks for Lane A R1 (separate lane).

## Completion gate (before status `closed`) — ALL CHECKED
- [x] Every worked item has a full notes section in THIS file (item table + evidence files)
- [x] Pre-development gate result recorded before implementation
- [x] Worker packets (`packets/P1..P12.md` + compiled) + output paths (`evidence/glm-drafts/`) recorded; every GLM draft reviewed/fixed/verified by orchestrator
- [x] Verify command run and result recorded → `evidence/verification.md` (ALL GREEN, 41/41 tests)
- [x] Simulator screenshots + endpoint exercise log in `evidence/`
- [x] GLM-vs-Claude implementation split recorded (above)
- [x] Spec + ROADMAP + handoff updated; submodule committed; pinned SHA updated

## Architecture decisions (Move C — ACCEPTED 2026-07-08)

- Plan: `evidence/architecture-plan.md` (Opus, high effort). Review: `evidence/architecture-plan-review.json` (Sonnet, adversarial) — verdict **approve-with-changes**. Fable acceptance: **ACCEPTED with amendments A1–A5** below. ADR-1..10 in the plan are binding for this batch.
- **A1 (review blocker → fixed in-batch):** `server/src/routes/gamification.routes.ts` used `req.user!.id` (never set; `loadAuthenticatedUser` returns only `userId`) → every user got default zero stats. Empirically proven (seeded user with XP 1200/L5/streak 7 returned zeros), fixed (6 sites → `req.user!.userId`), re-proven live (real values flow), server `tsc --noEmit` clean. Evidence: `evidence/endpoint-samples/gamification-stats-after-fix.json`. Plan OQ-6 closed. Server-side test debt noted in findings.
- **A2 (major):** Packet P6 amended — live (non-onboarding) Cia chat POST sends an `Idempotency-Key` header; gated-state UI branches on error `code`: `FEATURE_DISABLED` vs `CREDITS_EXHAUSTED` vs `PLAN_UPGRADE_REQUIRED` vs `MISSING_IDEMPOTENCY_KEY`, each with distinct honest copy (entitlement default is shadow mode today; enforcement flip is planned server-side).
- **A3 (major):** Packet stage graph fixed — P4 depends on P3. Dispatch waves: W1 P1,P2,P7,P8 → W2 P3,P6 → W3 P4 → W4 P5,P9 → W5 P10,P11 → W6 P12.
- **A4 (major):** Mission tier derivation pinned after tracing `goals-aggregator.service.ts:41-99`: `cadence` is `target_unit` (free-form measurement unit; null for career/finance) — NOT periodicity. Rule: `isPrimary && source==='life'` → `life`; `isPrimary` → `main`; **else → `side`** (documented simplification; `daily`/`weekly`/`group` tiers only when backend ships periodicity — no invention).
- **A5 (minor):** P3 amended — SecureStore read validates `schemaVersion === 1`; missing/other → treat session as absent (clear + route to sign-in).

## Batch summary
_(filled at close)_

## Completion gate (before status `closed`)
- [ ] Every worked item has a full notes section in THIS file
- [ ] Pre-development gate result recorded before implementation (done above)
- [ ] Worker packets + output paths recorded; GLM output verified by orchestrator
- [ ] Verify command run and result recorded
- [ ] Simulator screenshots + endpoint exercise log in `evidence/`
- [ ] GLM-vs-Claude implementation split recorded
- [ ] Spec + ROADMAP + handoff updated; submodule committed; pinned SHA updated
