# Next-Session Handoff — Balencia (two active lanes)

Two lanes run in parallel in this workspace. Pick the lane you were invoked for;
do not cross lanes without founder direction.

- **Lane A — Design remediation** (this file section 1): R0 closed; **R1 gated on a founder decision** (stop condition fired).
- **Lane B — iOS development** (section 2): READINESS-001 complete, READY WITH WAIVERS; next `BIOS-002-ios-simulator-contracts`.

---

# 1. Lane A — Design remediation (B+ → A+++, plan: `Balencia-New-Screens/build-progress/audit-2026-07-08/REMEDIATION-PLAN.md`)

> Status: **R0 evidence-reset CLOSED · R1 Cia-convergence GATED on founder ack** · Updated: 2026-07-08 (night)
> Batch state: `Balencia-New-Screens/build-progress/remediation-2026-07/REMEDIATION-LEDGER.md`
> R0 batch record: `plans/batches/REMEDIATION-R0-evidence-reset/batch.md`

## ⚠️ Founder decision needed BEFORE R1 starts (plan stop condition, binding)

1. **Confirmed High on hand-converted reference screen 80 (Music Coach):** bottom
   `BtnPrimary` "Connect Spotify" contradicts the same screen's connected/playing
   state ("Via Spotify · Cached 2m ago" + Disconnect control). Verified in source
   (`S80MusicCoach.tsx:231`) AND in the spec's own ASCII (`80-music-coach.md:44`) —
   spec-originated; build followed the spec faithfully. Proposed fix (RW-R0-13):
   spec edit ("Manage provider"/"Refresh" persistent CTA for connected state) +
   matching build edit, executed in R4. **Ack/deny to unblock R1.**
2. **RW-R0-18 sizing decision:** triage found 12 spec-named components/modules never
   built (BreathingPacer, ComparisonSlider, ConsistencyCloud, CadenceHeatmap,
   ContextToggle, AvatarStack, ConstellationRadar substitution, 2 missing
   TrendCharts, S85 blocker module, S21 toggle rows, S42 badge emblem). Options:
   new R5b component-completeness sub-batch (build them) · demo-scope disposition
   notes per component · mix. Not silently waivable (§6 honesty).
3. FYI, not blocking: triage returned **40/40 FIX-FILED** (59 High / 101 Medium /
   70 Low → deduplicated to 19 items in `remediation-2026-07/R0/new-rw-items.md`).
   Most fold into existing R2–R5 lanes; R1 scope itself is unaffected.

## R0 achievements (all verified, evidence in `remediation-2026-07/R0/`)

- **Harness codified (RW-001):** `balencia-screens/scripts/verify-visual-104.mjs`
  (`npm run verify:visual104`), flags `--strict --screenshots --only --out`.
  Baseline reproduces the audit EXACTLY: 104 / 0 issues / 21 warnings, zero
  per-screen mismatches (warnings, issues, phoneRects). Scanner config pinned +
  hashed `e2fd6cba632724f3` (1440x1000, reducedMotion, <40px warn + <44px
  instrumentation, roles {checkbox,switch} + extended field, `<p>` overflow,
  phone-frame-content clip). Run against dev server on :3001.
- **Baseline captured (RW-002)** at SHA `737d5ad`: JSON + summary + 104 phone-frame
  screenshots. Instrumentation baselines: 90 screens visibly show all-caps CIA (R1
  scope); 143 visible purple elements / 65 screens (R4); **490 interactive elements
  = never-decrease gate baseline**; S45 hidden `div role=slider` (extended field).
- **W-007 TRIAGE (RW-003..006, non-closing):** 40/40 independent sonnet reviews in
  `R0/reviews/S<id>.md` via workflow `wf_350c5e4e-f83`. W-007/A24-001 stays open
  until R11 closure at final SHA.
- **Affordance inventory (S-03 first pass):** `R0/affordance-inventory.md` — 50
  bare-affordance rows; kit gap: `cia.tsx` Composer/VoiceComposer icon controls are
  bare spans (adds to R2 scope, RW-R0-02).
- **Waivers (RW-020):** W-TRUNC-40/80 in `remediation-2026-07/WAIVERS.md`; copy
  edits on those strings banned in R3.
- Gates at close: STRICT exact-reproduction pass · `npm run check` pass (1 known
  lint warning = A24-018) · VAL 104/104/104 · no-screen-edit scope check pass.

## Next batch: R1 Cia convergence (AFTER founder ack)

Work items RW-007..013 + D8 canon wording. **Order inside batch is load-bearing:**
(1) canon + gates FIRST — COMPACT-CANON §0/§5/§6/§10 → "Coach persona: Cia; never
SIA; all-caps CIA banned in visible copy; code identifiers exempt", nav spec
`Today · Cia · Missions · Me`, COMPONENT-CATALOG casing note,
`balencia-screens/AGENTS.md`, verify-copy Cia rule (lands red, proving detection);
(2) visible-copy rename by screen directory ≤10 files/pass (GLM-eligible per-file
diffs, non-GLM review, typecheck green — re-count occurrences with a quoted grep at
R1 entry per §7.2); (3) guard proof: verify-copy green repo-wide + STRICT
`visibleWrongCaseCiaScreens: []` + full strict-104 run. Note `chrome.tsx:80`
already has label "Missions" — D8 remaining scope = the `CIA`→`Cia` nav label,
canon §6 wording, gate coverage. Loop `/goal`; profile claude-native.

## Lane A constraints in force

- No-water-down rules (plan §6) binding every batch; 104-count gate at every close.
- Triage reviews in `R0/reviews/` are evidence: each fixing batch (R2–R5) reads its
  screens' reviews at /start-batch and re-verifies claims before editing.
- Dirty-worktree caution: Lane B session artifacts were present and uncommitted at
  R0 close (BIOS/READINESS batch files, `memory/MEMORY.md` +
  `memory/reference_asc-testflight-verification.md`, `plans/BIOS-DEV-MASTER-PROMPT.md`,
  `yhealth-app` submodule changes) — left for Lane B to commit; do not sweep them
  into Lane A commits.

---

# 2. Lane B — iOS development (BIOS-003 CLOSED · BIOS-004 IN PROGRESS mid Move-E)

> Status: **BIOS-003 CLOSED 2026-07-09. BIOS-004 (Today+Missions parity + first EAS build) IN PROGRESS — Moves A/B/C done, Move D/E ~60% (viz kit + missions data + GlassNavBar landed & gated green; screens + tests + review + build NOT done).**
> Submodule pinned @6acbb7a6 (WIP, all gates green: lint 0 / typecheck 0 / test 70/70). Batch record: `plans/batches/BIOS-004-today-missions-parity/BATCH.md`. Plan (accepted w/ A1–A6): `evidence/architecture-plan.md`. Roadmap: `plans/batches/ROADMAP.md`.

## RESUME HERE — BIOS-004 remaining work (Move E continuation)

Landed & green so far: `src/constants/theme.ts` (6 metal tier tokens) + `motion.ts`; viz kit `progress-ring/trend-chart/glass-stat-card/cia-presence-orb/momentum-bar.tsx` + kit `index.ts` exports; `services/adapters/missions.ts` (6-tier `mapTier`) + create/complete DTOs + `services/api/missions.ts` + `hooks/use-mission-mutations.ts` (optimistic + XP-delta honesty); `components/balencia/glass-nav-bar.tsx` + `app/(tabs)/_layout.tsx` (NativeTabs → expo-router js-tabs). Interim: `missions-screen.tsx` tier map stubbed to 6 tiers (rebuild in S2).

STILL TO BUILD (packets already partly composed in `packets/` — S1..S5, T1; A1/N1/V*/F1 packets exist):
1. **S1 — Today recompose** to hi-fi S12 parity on the UNCHANGED TodayVM adapter (new viz kit, density tiers, staggered motion, hero-only breathing, provenance chips, purple only on Cia).
2. **S2 — Missions board** to hi-fi S13: 6 metal-tier card colors from theme tokens (replace the interim stub), summary row, create entry point.
3. **S3 — Mission detail S14**: ALL FIVE accordions (A1 amendment: ALL ACTIONS + PROGRESS data-backed; MILESTONES honest-null-capable; CIA REASONING + CROSS-DOMAIN LINKS visible-but-gated). Root-Stack push route `app/mission/[id].tsx`.
4. **S4 — Create mission S15**: life-domain create via `POST /v1/journal/goals`, `VALID_CATEGORIES` (pin with a test), optimistic board update.
5. **S5 — Completion celebration S42**: XP-delta-only (three separate elements +120 / XP / "you earned it"); null-delta branch has NO XP number.
6. **T1 — screen/logic tests**; then **Move F** (4-lens review panel + adversarial verify + fix), **Move G** (simulator parity smoke vs hi-fi + **first EAS/TestFlight internal build** via /loop wait + ASC JWT verify script `scripts/verify-asc-state.sh` to author), **Move H** (close + commit + handoff + open BIOS-005).

Wave-1 EMPIRICAL GATE (A4, do at first simulator run): confirm Expo Go loads react-native-svg / expo-haptics / expo-linear-gradient; if the Go binary lacks any, pivot smoke to an EAS dev-client simulator build (documented, budget-approved).

## GLM bridge — FIXED (use it)

`scripts/glm-worker.sh` now streams the prompt via a temp file + `curl --data-binary @file` (committed) — proven with a 190KB round-trip. Deliver packets by file path: wrappers run `cat packets/_worker-rules.md packets/<id>.md | ./scripts/glm-worker.sh -t 16384` and the haiku shell-runner is forbidden from using file tools. `packets/_worker-rules.md` holds the standing output-format + lint + canon rules. Never ask a worker to re-emit package.json.

## What Changed earlier (BIOS-003-auth-hardening, CLOSED @14dd0302)

- OQ-1 CLOSED — per-device `user_sessions` (atomic-CAS rotation, reuse→revoke, dual-read legacy compat, `jti` on refresh tokens). Apple JWKS verification wired (was decode-only+unwired). Google verification required for all callers (X-Client bypass closed). Full mobile auth-flow suite per hi-fi (S03/S03b/S03c/S03e/S04/S05/S05b + complete-profile). Server 117/117 auth tests, mobile 66→70. Review panel 16→14 confirmed→fixed. Evidence: `plans/batches/BIOS-003-auth-hardening/`.
- Local dev: mailpit sink (`balencia-mailpit` docker :1025/:8025) + `FORCE_EMAIL_IN_DEV=true`. CAUTION: server integration suite teardown DELETES all `%@balancia.test` users — re-run `npm run db:seed:test-users` after; full-suite `npm test` OOMs (use scoped suites).

## Manual Items Still Needed From Hamza (unchanged)

1. Replace `mobile/.env` with EXPO_PUBLIC_*-only (W1). 2. Apple team type (W2). 3. TestFlight privacy URL + feedback email (W3). 4. Production QA account (W4). 5. OQ-A (server forgot-password 404 enumeration — keep or normalize?), OQ-C (`APPLE_CLIENT_IDS` prod values). B1: real-device Apple sign-in E2E — the BIOS-004 TestFlight build is the unblock vehicle.

## Standing Constraints (Lane B)

- Design truth: `Balencia-New-Screens/hifi-screens/` + `canon/`; rendered reference `balencia-screens/src/components/hifi/screens/`. Cia naming, warm-dark glass, 44px, purple = Cia/AI only, honesty invariant on every metric. W-007: 40 screens FIX-FILED in Lane A — no Today/Missions screens in that list (verified).
- Backend-gated features stay visible-but-gated with provenance. `yhealth-app-main` historical only. Never read/print/commit secret values. Boot: docker start balencia-postgres balencia-redis balencia-mailpit; server `npm run dev` (:9090).
