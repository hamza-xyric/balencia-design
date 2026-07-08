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

# 2. Lane B — iOS development (BIOS-002 CLOSED)

> Status: **BIOS-002 CLOSED 2026-07-09 — all gates green, app runs live against the real backend in the iOS Simulator** · Next: **BIOS-003 auth hardening**
> Batch record: `plans/batches/BIOS-002-ios-simulator-contracts/BATCH.md` · Verification: `evidence/verification.md` · Roadmap: `plans/batches/ROADMAP.md`.

## What Changed (BIOS-002-ios-simulator-contracts)

- **Local backend runs** (see `evidence/local-backend.md`): docker `balencia-postgres` (pgvector, :5433) + `balencia-redis` (:6380), server :9090, 15 seeded test users (`john.doe@balancia.test` / `Test1234!`). Fresh-DB sequence: `db:setup` → `db:migrate` → `db:migrate:auto` → manual `139-life-area-checkins.sql`. Local LLM provider = GLM via Z.ai Anthropic-compatible endpoint (`ANTHROPIC_*` in server/.env, dev only) — real Cia completions work locally.
- **Mobile contract layer rebuilt** (submodule commits `00922b87..f2bdefd4`): vendored DTO mirror, honest adapters (canon §7 enforced by an anti-fabrication test walker — old fake fitness/lifePower numbers deleted), SessionProvider state machine (SecureStore v1 schema, proactive+reactive refresh, rotation replay → global expired state), TanStack Query conventions, non-streaming Cia chat with Idempotency-Key + 4 distinct gated states, trust center (real export w/ truncation honesty, exact-phrase hard delete, optimistic privacy toggles).
- **Server fix shipped**: gamification routes read `req.user.userId` (was `.id` = undefined → zero stats for every user; proven live before/after). 3 upstream server findings documented in `evidence/local-backend.md`.
- **Simulator smoke (Maestro 2.6.1 + Expo Go)**: full walk of sign-in → onboarding (live Cia calibration chat) → Today (honest-null Life Power/pulse) → Cia live reply → Missions → Me (real Level 5/1,200 XP/streak 7) → Life Areas → Fitness → Data Controls (live toggles + real export counts) → boot hydration. 14 screenshots in `evidence/simulator/`. Two real bugs found by smoke and fixed: hidden-NativeTabs routes were unreachable via router.push (now root Stack pushes w/ native headers); eyebrow style uppercased "Cia" → visible "CIA" (eyebrows now "Coach").
- **Review panel**: 4 Sonnet lenses, 19 adversarially-confirmed findings, all fixed (notably: business-401s no longer collapsed into SessionExpiredError; session expiry now propagates globally; purple stripped from non-Cia surfaces; AA-safe purpleText token; keyboard avoidance on input screens).
- **Tests**: Vitest infra + 41 tests green (`npm run test` = manifest verifier + vitest).
- GLM 5.2 drafted 100% of the 12 implementation packets (`packets/`), per the token-routing policy; Fable did seam/review fixes only.

## Manual Items Still Needed From Hamza (unchanged + one urgency bump)

1. **Replace `mobile/.env` with EXPO_PUBLIC_*-only content — urgency bumped:** expo/npm auto-load it and echo all var NAMES to logs every run (values never printed).
2. Confirm Apple team type intent (EAS showed Individual).
3. Provide TestFlight privacy policy URL + feedback email (before external testers only).
4. Decide QA account approach for production (local dev uses seeded users; production QA still undecided).
5. **BIOS-003 entry decision (OQ-1):** single-refresh-token-per-user silently logs out other devices — approve a backend session-table change or accept the limitation.

## Next Batch (Lane B): BIOS-003 — Auth hardening + multi-device

Per `plans/batches/ROADMAP.md`. Scope: backend session model (OQ-1), Google/Apple sign-in,
registration/OTP/forgot-password screens, token security review. Entry: OQ-1 decision from Hamza.
Follow the Per-Batch Operating Procedure in `plans/BIOS-DEV-MASTER-PROMPT.md`; local backend
setup is reproducible from `BIOS-002 .../evidence/local-backend.md`. Open questions OQ-1..5 in
`evidence/architecture-plan.md` §6.

## Standing Constraints (Lane B)

- Design truth: `Balencia-New-Screens/hifi-screens/` + `canon/` (CIA naming — becomes **Cia** after Lane A R1, warm-dark glass, 44px targets, purple = Cia/AI only). W-007: 40 screens triaged FIX-FILED in Lane A R0 (see `remediation-2026-07/R0/reviews/`) — don't treat their specs as final until remediation lands.
- Backend-gated features (WhatsApp, Finance, compliance, barcode, PWA/offline, PSTN) stay visible-but-gated with provenance states.
- `yhealth-app-main` is historical reference only.
- Never read/print/commit secret values; `.p8` stays local-only.
