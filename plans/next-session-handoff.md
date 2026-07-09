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

# 2. Lane B — iOS development (BIOS-003 CLOSED)

> Status: **BIOS-003 CLOSED 2026-07-09 — all gates green (server 117/117 auth tests, mobile 66/66, 17-step live endpoint exercise, simulator smoke)** · Next: **BIOS-004 Today + Missions hi-fi parity + first EAS/TestFlight build**
> Batch record: `plans/batches/BIOS-003-auth-hardening/BATCH.md` · Verification: `evidence/verification.md` · Roadmap: `plans/batches/ROADMAP.md` · Submodule pinned @14dd0302.

## What Changed (BIOS-003-auth-hardening)

- **OQ-1 CLOSED — per-device sessions**: `user_sessions` table (146-*.sql + registered auto-migration), sha256-hashed refresh at rest, atomic-CAS rotation, reuse-detection→revoke, LRU cap 10, `sid` claim in both JWTs, `/refresh` dual-read + lazy legacy migration (web cookie flow byte-unchanged, integration-proven), `/logout {allDevices?}` (this-device default), `jti` uniqueness on refresh tokens (1-second-iat rotation degeneracy found by integration tests). BIOS-002's "second device logs out the first" caveat is gone — proven live (17-step exercise incl. multi-device independence + replay→revoke).
- **Social auth fail-closed**: Apple JWKS verification wired (was decode-only AND unwired — client JSON was trusted); Google verification required for ALL callers (the X-Client-gated NextAuth fallback was a bypass; web client verified to send id_token every sign-in); `socialAuthSchema.email` optional (derived from the verified token).
- **Mobile auth suite per hi-fi**: S03 sign-up → S03b OTP (in-memory activationToken) → S03c consent → S03e whatsapp-gated-skip → onboarding via `resolveNextStep`; S04 sign-in (spec copy, forgot link, gated equal-weight social pills); S05/S05b forgot/reset (honest OTP adaptation ADR-9, client-side enumeration normalization, real Retry-After handling); complete-profile for social users. New kit primitives (OTPCluster, ChargeMeter, PasswordRequirementList, ConsentCheckbox, MaskedDestinationLine, ToastBanner, SocialAuthButton, GlassPillInput) — a11y-labeled, announced errors, reduced-motion safe. `adoptSession`, per-install device id headers. Tests 41→66.
- **Review panel**: 16 findings → 14 adversarially confirmed → all fixed (blockers: social empty-email 400 breaker; Google X-Client verification bypass). 2 refuted with evidence (`evidence/review-panel.md`).
- **Local infra**: mailpit sink (`balencia-mailpit` docker, SMTP :1025, API/UI :8025) + `FORCE_EMAIL_IN_DEV=true` in server/.env → registration/OTP/reset emails exercisable locally (`evidence/local-backend-delta.md`).
- **Upstream findings (server backlog)**: full-suite `npm test` OOM (use scoped suites or `test:ci`); `tests/globalTeardown.ts` deletes ALL `%@balancia.test` users — **re-run `npm run db:seed:test-users` after any server integration run**; forgot-password 404-enumeration is a product decision (OQ-A, owner Hamza).

## GLM lessons (BINDING for BIOS-004 Move D/E)

1. **The glm-worker heredoc bridge drops/truncates packets beyond ~50KB** — GLM then hallucinates an imaginary codebase. Fix before heavy waves: pass packets by file path (bridge reads from disk) or keep packets small. Escalations this batch: SP2, MP1, MP6, MP7, MP9, MP10 (Fable implemented from the packets' own contracts).
2. Never ask a worker to re-emit `package.json`/large existing files — anchored edits or dependency lists only; landers install deps.
3. Haiku shell-runner wrappers must be explicitly forbidden from using file tools (two went rogue and applied drafts themselves).
4. Maestro 2.6.1 + RN new-arch: secure-field text injection is flaky; tap nested-Text links via points; buttons match by accessibilityLabel. Prefer a dev-build for BIOS-004 smoke automation.

## Manual Items Still Needed From Hamza (unchanged)

1. Replace `mobile/.env` with EXPO_PUBLIC_*-only content (W1 — names echo into logs every toolchain run).
2. Apple team type intent (W2). 3. TestFlight privacy URL + feedback email (W3). 4. Production QA account decision (W4).
5. NEW: OQ-A (server forgot-password enumeration 404 — keep or normalize?), OQ-C (`APPLE_CLIENT_IDS` production values).

## Next Batch (Lane B): BIOS-004 — Today + Missions hi-fi parity

Per `plans/batches/ROADMAP.md`: deep visual parity to `Balencia-New-Screens/hifi-screens/` (Today S12 family + Missions), GlassNavBar, canon viz components (TrendChart, ProgressRing, GlassStatCard, CIAPresenceOrb) native w/ Reanimated, motion + reduced-motion variants, density tiers, **first EAS/TestFlight build** (internal group; approved per standing decision 7). Entry: BIOS-002 adapters stable ✓; check W-007 re-review state for affected screens (Lane A `remediation-2026-07/R0/reviews/`). Local backend recipe: BIOS-002 `evidence/local-backend.md` + BIOS-003 `evidence/local-backend-delta.md` (mailpit). Boot: docker start balencia-postgres balencia-redis balencia-mailpit; server `npm run dev` (:9090); re-seed users if integration tests ran.

## Standing Constraints (Lane B)

- Design truth: `Balencia-New-Screens/hifi-screens/` + `canon/` (Cia naming, warm-dark glass, 44px targets, purple = Cia/AI only, honesty invariant). W-007: 40 screens FIX-FILED in Lane A — parity re-check when remediation lands.
- Backend-gated features stay visible-but-gated with provenance. `yhealth-app-main` historical only. Never read/print/commit secret values.
