# BIOS-004-today-missions-parity — Today + Missions Hi-Fi Parity + First EAS Build

- Status: `in progress` (opened 2026-07-09, unattended autonomous run, continues from BIOS-003 close)
- Theme: Deep visual parity of Today + Missions to `Balencia-New-Screens/hifi-screens/` — GlassNavBar, canon viz components native (TrendChart, ProgressRing, GlassStatCard, CIAPresenceOrb per COMPONENT-CATALOG), motion w/ reduced-motion variants, density tiers, 60/30/10 color roles, honesty invariant on every metric — plus the **first EAS/TestFlight build** of the integrated app (internal group; pre-approved, standing decision 7).
- Session cap: 4 slices — (1) canon viz component kit native (Reanimated), (2) Today screen family parity, (3) Missions board parity (6 tier colors, create/complete + XP against `/v1/goals/unified`), (4) GlassNavBar + motion polish; then EAS build+submit (internal). No widening to other tabs/screens.
- Build gate this batch? yes — EAS/TestFlight milestone build (internal group) + full simulator smoke
- Active root: `yhealth-app/mobile` (server changes only if a Missions flow needs a verified endpoint fix — same testing bar as BIOS-003)
- Source links: `plans/batches/ROADMAP.md` (BIOS-004 row), `plans/BIOS-DEV-MASTER-PROMPT.md`, BIOS-003 handoff (`plans/next-session-handoff.md` §2, GLM lessons BINDING), `Balencia-New-Screens/canon/COMPACT-CANON.md` + `COMPONENT-CATALOG.md` + `_MASTER-LEDGER.md` (Today/Missions rows), `balencia-screens/src/components/hifi/screens/` (rendered reference), `yhealth-app/mobile/docs/READINESS.md` (release gate)
- Handoff status target: CLOSED, all gates green or explicitly waived
- Pre-development doc gate: READY WITH WAIVERS (see gate block)
- Documentation evidence path: `plans/batches/BIOS-004-today-missions-parity/evidence/`
- Loop primitive: `ultracode:` + `/loop` self-paced wakeups ONLY for the EAS build wait (genuinely external)
- Runtime profile: `claude-native` + GLM sub-worker (with the FIXED file-path bridge — see lesson gate below)
- Orchestrator role: Claude (Fable) — owns acceptance, verification, commits
- Worker backend: GLM 5.2 (primary implementer), Sonnet (reviews/landers), Haiku (sweeps), Opus (architecture)
- Provider: Z.ai + Claude native
- Model: glm-5.2 / claude-fable-5 / opus / sonnet / haiku
- Endpoint class: provider-api + native
- Worker task packet: `plans/batches/BIOS-004-today-missions-parity/packets/`
- Worker output path: `plans/batches/BIOS-004-today-missions-parity/evidence/glm-drafts/`
- Saved workflow: session-dir scripts (paths recorded in evidence)
- Usage guard: `scripts/glm-worker.sh --ping` → `OK model=glm-5.2 reply=pong` (2026-07-09, post-BIOS-003-close)
- Verify command: mobile `npm run lint && npm run typecheck && npm run test && npx expo config --type public && npx expo export --platform web --output-dir dist-smoke` + simulator smoke of Today/Missions (screenshots vs hi-fi) + EAS build green + TestFlight internal submission + endpoint exercise log

## Pre-development gate (before status `in progress`)
- [x] Active docs + hierarchy: hifi-screens+canon > server routes > client evidence > yhealth-app-main. Rendered reference: `balencia-screens/`.
- [x] Source links resolve (ROADMAP, master prompt, canon paths verified this session)
- [ ] Blueprint marker — n/a
- [x] Verification gates selected (header; EAS build gate added per roadmap milestone)
- [x] Deterministic verify command + evidence path recorded
- [x] Loop primitive + runtime profile recorded (EAS wait = /loop external)
- [x] Worker smoke-test: GLM ping OK 2026-07-09
- [ ] Worker task packets — Move D gate. **Bridge lesson gate SATISFIED (2026-07-09): `scripts/glm-worker.sh` patched (prompt via temp file + `curl --data-binary @file`, no argv/heredoc ARG_MAX path) and PROVEN with a 190KB packet round-trip (`cat bigpacket | glm-worker.sh` → exact instructed reply). Move E rule: wrappers run `cat <packet file> | ./scripts/glm-worker.sh` — packets never embedded in wrapper prompts; no package.json re-emission; wrappers forbidden from file tools.**
- [x] Worker output path recorded
- [x] `ultracode:` guard: scope cap 4 slices + EAS; inventory workflow before implementation; stop conditions = scope expansion, 2-failed-GLM escalation w/ lesson, destructive/credential decisions, ASC manual actions (waiver, never fake)
- [x] W-007 check: FIX-FILED list (40 screens) inspected — **no Today/Missions-family screens present** (S12–S17 clear; nearest is S18) → current specs are design-final for this batch (W5 monitoring continues)
- [x] Blockers/waivers recorded (below)
- [x] Gate result: **READY WITH WAIVERS**

### Waivers / blockers carried into this batch (owner → closure)
| # | Item | Owner | Closure condition | Why development may begin |
|---|------|-------|-------------------|---------------------------|
| W1 | `mobile/.env` hygiene | Hamza | EXPO_PUBLIC_*-only | Gitignored; never read; EXPO_PUBLIC_* only consumed |
| W2 | Apple team type unconfirmed | Hamza | Decision recorded | EAS build w/ existing credentials (precedent: build 10); internal TestFlight only |
| W3 | TestFlight beta metadata empty | Hamza | Privacy URL + feedback email | Internal group needs no beta review metadata |
| W4 | Production QA account | Hamza | Decision | Local seeded users only |
| W5 | W-007 Lane A remediation open | Design lane | R-batches close | No Today/Missions screens in FIX-FILED list (verified this session) |
| W6 | Backend-gated features | — | Backend matures | Visible-but-gated w/ provenance |
| B1 | Real-device Apple sign-in E2E (from BIOS-003) | Fable→Hamza | TestFlight build of THIS batch enables device verification | Carried; this batch's build is the unblock vehicle |
| B2 | Maestro secure-field typing flakiness (RN new-arch) | This batch | Dev-build smoke or Maestro update; else point-tap/API-level fallback per BIOS-003 precedent | Smoke depth achievable; gaps covered by API evidence |

## Runtime intake block
```yaml
loop_primitive: "ultracode: + /loop (EAS wait only)"
runtime_profile: claude-native
orchestrator_role: Claude (Fable)
worker_backend: GLM (file-path bridge) + Sonnet + Haiku + Opus
provider: Z.ai + Claude
model: glm-5.2 / claude-fable-5 / opus / sonnet / haiku
endpoint_class: provider-api + native
verify_command: mobile lint+typecheck+test+expo config+export; simulator parity smoke; EAS build+submit (internal); endpoint exercise
evidence_path: plans/batches/BIOS-004-today-missions-parity/evidence/
usage_guard: glm-worker.sh --ping OK (2026-07-09)
worker_task_packet: plans/batches/BIOS-004-today-missions-parity/packets/
worker_output_path: plans/batches/BIOS-004-today-missions-parity/evidence/glm-drafts/
saved_workflow: session-dir workflow scripts
closeout_writes:
  - plans/batches/BIOS-004-today-missions-parity/BATCH.md + evidence/
  - yhealth-app/.agent/specs/balencia-ios-foundation.md
  - plans/batches/ROADMAP.md
  - plans/next-session-handoff.md
  - yhealth-app submodule commits + pinned SHA
```

## Item checklist
| Item | Locator | Status |
|------|---------|--------|
| BIOS-004-01 Canon viz kit native: TrendChart, ProgressRing, GlassStatCard, CIAPresenceOrb (+ MomentumBar/ChargeMeter reuse) w/ Reanimated, reduced-motion, 44px, honesty states | `mobile/src/components/balencia/` | pending |
| BIOS-004-02 Today family deep parity vs hi-fi S12 spec (layout, copy, density tiers, motion, provenance chips) | `mobile/src/features/today/` | pending |
| BIOS-004-03 Missions board parity: 6 tier colors per RPG terminology, create/complete flows, XP against `/v1/goals/unified` + `/gamification` | `mobile/src/features/missions/` | pending |
| BIOS-004-04 GlassNavBar (custom tab bar per canon) + cross-screen motion polish | `mobile/src/app/(tabs)/` | pending |
| BIOS-004-05 EAS build + TestFlight internal submission (milestone build) | `eas.json`, ASC | pending |
| BIOS-004-06 Simulator parity smoke (screenshots vs hi-fi refs) + endpoint exercise | `evidence/simulator/` | pending |

## Architecture decisions (Move C — ACCEPTED 2026-07-09)

- Plan: `evidence/architecture-plan.md` (Opus, high effort; 10 ADRs binding). Review: `evidence/architecture-plan-review.json` (Sonnet) — **approve-with-changes** (1 blocker, 4 majors, 5 minors); Fable **ACCEPTED WITH AMENDMENTS A1–A6** (plan §11).
- Highlights: viz kit = react-native-svg + Reanimated animatedProps (5 components: ProgressRing, TrendChart, GlassStatCard, CIAPresenceOrb, MomentumBar; canon ChargeMeter deferred as CapacityMeter — name collision with the OTP ChargeMeter); Today recomposed on the UNCHANGED BIOS-002 adapters; Missions = 6 metal-tier tokens + life-primary create (`POST /v1/journal/goals`) + complete via per-domain routes + **XP-delta-only celebration** (server returns no XP on completion — refetch `/gamification/stats`, celebrate only a confirmed delta; never a fabricated toast); GlassNavBar via expo-router JS `Tabs` custom tabBar (fixes the NativeTabs hidden-route class); S14 renders ALL 5 accordions (2 data-backed, milestones honest-null-capable, reasoning/links visible-but-gated → A1); first EAS build (production profile, autoIncrement → build 11, --auto-submit, /loop wait, ASC JWT verify script authored in-batch → A3); defer line to BIOS-005: S41/S45/S61/S73/S93 + bespoke components.
- Wave-1 empirical gate (A4): Expo Go must load svg/haptics/linear-gradient imports; else smoke pivots to EAS dev-client simulator build.

## Packet lessons (running log)
_(BIOS-003 lessons are binding preconditions — see pre-dev gate)_

## Batch summary
_(filled at close)_

## Completion gate (before status `closed`)
- [ ] Every worked item has notes in THIS file
- [ ] Worker packets + output paths recorded; worker output verified by orchestrator
- [ ] Verify command run and result recorded
- [ ] Simulator screenshots + EAS build/submission evidence in `evidence/`
- [ ] GLM-vs-Claude split recorded
- [ ] Spec + ROADMAP + handoff updated; submodule committed; pinned SHA updated
