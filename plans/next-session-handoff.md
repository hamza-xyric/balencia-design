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

# 2. Lane B — iOS development (READINESS-001 complete)

> Status: **READINESS-001 COMPLETE — READY WITH WAIVERS for autonomous iOS development** · Updated: 2026-07-08 (evening)
> Pre-development readiness audit done. Canonical checklist: `yhealth-app/mobile/docs/READINESS.md`.
> Full report: `plans/batches/READINESS-001-ios-predev/evidence/readiness-report.md`.

## What Changed (READINESS-001-ios-predev)

- Re-verified all BIOS-001 gates green: mobile lint / typecheck / test (`mobile-source-ok routes=11 files=38`), Expo public config (SDK 57, correct identity).
- Verified EAS/TestFlight state: build `63265de5` (v1.0.0 **build 10**) finished on EAS 21:41 PKT; submission `aa6ed762` **succeeded** — build 10 VALID in ASC at 22:12 PKT. Internal group "Internal Balencia Testing" exists. TestFlight beta metadata (privacy URL, feedback email, review contact) is empty.
- Verified secrets posture: `.p8` local + gitignored, `mobile/.env` gitignored, nothing secret-shaped tracked in either repo.
- **High-risk finding (owner Hamza):** `mobile/.env` contains a full server-grade env — replace with `EXPO_PUBLIC_*`-only per new `mobile/.env.example`.
- Created `yhealth-app/mobile/docs/READINESS.md` (checklist + ported release-readiness-verifier gate + model routing) and `yhealth-app/mobile/.env.example` (was missing despite import doc claim).
- Confirmed skills: Codex `source-command-*` + architect/frontend/designer/review skills in `.agents/skills/`; expo plugin skills cached; Claude equivalents native. GLM bridge ping OK.
- Doc drift fixed: BIOS-001 evidence recorded slug `balencia-ios`; live app.json slug is `balencia`.
- Appended readiness section to `yhealth-app/.agent/specs/balencia-ios-foundation.md`; corrected BIOS-001 evidence files.

## Manual Items Still Needed From Hamza

1. Replace `mobile/.env` with EXPO_PUBLIC_*-only content (high-risk hygiene).
2. Confirm Apple team type intent (EAS showed Individual).
3. Provide TestFlight privacy policy URL + feedback email (before external testers only).
4. Decide QA account approach: OTP throwaway vs seeded dev account.
5. (Resolved during audit: submission `aa6ed762` succeeded — build 10 VALID in ASC; just confirm internal testers can install.)

## Next Batch (Lane B)

Start `BIOS-002-ios-simulator-contracts` with the exact /goal prompt in
`plans/batches/READINESS-001-ios-predev/evidence/readiness-report.md` §10. Bounded scope:
auth/session hardening, Cia onboarding/chat, Today data, Missions, Life Areas, Fitness dashboard,
trust/data controls, simulator smoke + screenshots. Routing: Fable orchestrates, Opus architecture,
GLM 5.2 bounded packets, Sonnet reviews, Haiku sweeps.

## Standing Constraints (Lane B)

- Design truth: `Balencia-New-Screens/hifi-screens/` + `canon/` (CIA naming — becomes **Cia** after Lane A R1, warm-dark glass, 44px targets, purple = Cia/AI only). W-007: 40 screens triaged FIX-FILED in Lane A R0 (see `remediation-2026-07/R0/reviews/`) — don't treat their specs as final until remediation lands.
- Backend-gated features (WhatsApp, Finance, compliance, barcode, PWA/offline, PSTN) stay visible-but-gated with provenance states.
- `yhealth-app-main` is historical reference only.
- Never read/print/commit secret values; `.p8` stays local-only.
