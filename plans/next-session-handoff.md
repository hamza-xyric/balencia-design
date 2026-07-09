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

# 2. Lane B — iOS development (BIOS-004 CLOSED · next BIOS-005)

> Status: **BIOS-004 CLOSED 2026-07-09 (same-day full batch, unattended run). First EAS/TestFlight internal build SHIPPED (build 13). Next: BIOS-005 Cia coach full experience.**
> Submodule pinned @6a18c8e5 (pushed). Batch record: `plans/batches/BIOS-004-today-missions-parity/BATCH.md` (+ evidence/). Roadmap: `plans/batches/ROADMAP.md`.

## RESUME HERE — open BIOS-005 (Cia coach full experience)

Move A per master prompt: `/runtime-profiles` → `/start-batch BIOS-005-cia-coach` → `/pre-development-check` → GLM ping. Entry criteria from ROADMAP: trace the streaming transport (OQ-3: socket layer vs SSE in `server/src/.../chat.routes` + socket services), confirm entitlement/402 enforcement plan. Scope: streaming chat transport decision, insights/suggestedActions UI, image analysis, MCQ onboarding; plus the BIOS-004 deferral line (S41/S45/S61/S73/S93 + ScheduleDonut/TimelineGrid/MoodEmojiPicker/TimelineSpine/EventCard/ImageThumbnailRow/ExpandableList-list-variant/ConstellationRadar + CIA-planning create result state + S13 journal glyph + canon CapacityMeter) — pull into 005/006 as the architecture plan decides.

## BIOS-004 closeout facts (what a fresh session must know)

- Screens S12/S13/S14/S15/S42 at hi-fi parity, on UNCHANGED BIOS-002 adapters. Composition kit (`composition-kit.tsx`): ChipDomainTag (+`domain` canon tint), SegmentedTabs, FABQuickLog, CIAInsightCard (Cia-only purple; `gated`), ExpandableSection (`gated` lock), FrostCard (breathe hero-only). Mobile tests 165, lint/typecheck 0.
- **XP honesty implementation** (do not regress): complete → per-mission optimistic flip (`mission-mutation-logic.ts` applyOptimisticComplete/revertGoal; mutation `scope:{id:'complete-mission'}`) → forced stats refetch → `computeXpDelta` → celebration ONLY on positive delta, payload via `celebration-gate.ts` in-memory single-use gate (30s TTL) — **route params carry no XP**; forged deep links land in the honest no-XP branch (simulator-proven screenshot in evidence).
- **EAS build 13** (v1.0.0) FINISHED + auto-submitted to "Internal Balencia Testing". Builds 11/12 failed: stale profile lacked Sign In with Apple. NON-INTERACTIVE repair recipe (repeatable, in `evidence/eas/build-13-record.md`): ASC API enable `APPLE_ID_AUTH` w/ `PRIMARY_APP_CONSENT` setting → delete stale portal profile → `eas credentials` "All: Set up" via expect w/ `EXPO_ASC_*` env (profile regen works with API-key auth; capability SYNC is cookie/Apple-ID-only — eas-cli hard limit). NEVER `yes | eas build` (forces non-interactive, skips validation).
- Disclosures for Hamza: (1) repair created a NEW Apple distribution cert (serial 44FBDA8E…, exp 2027-07-09); old cert 32A29646… still portal-side — revoke or keep is his call (Individual account cert slots are limited). (2) Team-type prompt answered "Individual" (mirrors existing team record); W2 store-metadata decision still open. (3) Build 13 content = submodule @4eff877a; the domain-humanize + pinned-missions polish (@458f0b9a) ships with the next build.
- ASC state check: `scripts/verify-asc-state.sh [builds|groups]` (local ES256 JWT from eas.json creds; read-only). At close, build 13 was uploaded + submitted; ASC processing to VALID typically lands within ~15 min — verify at next session start.
- B1 (real-device Apple sign-in E2E) is now UNBLOCKED via TestFlight build 13 — needs Hamza's device.
- Known cosmetic follow-ups (BIOS-005 backlog): S14 due-date raw ISO slice; consider excluding source chip tint on S14; Expo Go "Continue to Today" onboarding gate (BIOS-002 surface) requires a Cia reply before enabling — smoke used "Skip for now".

## GLM bridge + packet discipline (unchanged, proven at scale this batch)

File-path bridge: `cat packets/_worker-rules.md packets/<id>.md | ./scripts/glm-worker.sh -t 24576`, haiku shell-runners forbidden from file tools, drafts to `evidence/glm-drafts/`. BIOS-004 result: **6/6 GLM first-attempt successes** — packet recipe that did it: byte-exact current-source embeds + verbatim import-surface interfaces + a pre-verified reference implementation + explicit out-of-scope list. Sonnet landers verify/apply; mechanical-fix-only mandate. Packet-AC lesson: anchor grep checks to `^import` (comment text false-positives).

## Manual Items Still Needed From Hamza

1. `mobile/.env` EXPO_PUBLIC_*-only (W1). 2. Apple team type / store metadata (W2, W3). 3. Production QA account (W4). 4. OQ-A (forgot-password 404 enumeration), OQ-C (`APPLE_CLIENT_IDS` prod values). 5. NEW: distribution-cert cleanup decision (see disclosures). 6. B1 real-device Apple sign-in E2E on build 13.

## Standing Constraints (Lane B — unchanged)

Design truth `Balencia-New-Screens/hifi-screens/` + `canon/`; rendered reference `balencia-screens/`. Cia naming, warm-dark glass, 44px, purple = Cia only, honesty invariant everywhere. Backend-gated stays visible-but-gated. Never read/print `mobile/.env` or secret values. Boot: `docker start balencia-postgres balencia-redis balencia-mailpit`; server `npm run dev` (:9090); re-seed `npm run db:seed:test-users` after integration suites; full server `npm test` OOMs (scoped suites only).
