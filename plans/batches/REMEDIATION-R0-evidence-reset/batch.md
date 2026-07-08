# REMEDIATION-R0-evidence-reset — Evidence reset: harness + baseline + W-007 triage

- Status: `closed` (2026-07-08) — **with founder stop-condition surface open, see below**
- Theme: Codify the strict-104 harness as repo code, capture the pre-remediation baseline (screenshots + JSON + affordance inventory) at a stable SHA, run the independent W-007 TRIAGE (non-closing) on the 40 limit-event screens, write W-TRUNC-40/80 waivers.
- Session cap: 4 work streams (RW-001, RW-002, RW-003..006 as one fan-out, RW-020) — no screen edits permitted in R0.
- Reviewed date / evidence path: 2026-07-08 / `Balencia-New-Screens/build-progress/remediation-2026-07/R0/`
- Build gate this batch? no — harness + evidence only; `npm run check` must stay green (no src edits expected)
- Active root: `balencia-screens/` (scripts only) + `Balencia-New-Screens/build-progress/remediation-2026-07/`
- Source links: `audit-2026-07-08/REMEDIATION-PLAN.md` §5 R0, §8 RW-001/002/003..006/020, §11; `audit-2026-07-08/REPORT.md`; `audit-2026-07-08/evidence/visual-104-pass-strict.json` (schema + baseline target); `evidence/strict-warning-list.txt`; `BUILD-LEDGER.md` W-007 rows; `canon/COMPACT-CANON.md`
- Handoff status target: READY
- Pre-development doc gate: READY
- Loop primitive: `/goal` — "R0 complete: harness codified, baseline + affordance inventory captured, 40/40 triage verdicts filed, W-TRUNC-40/80 waivers written"
- Runtime profile: `claude-native`
- Orchestrator role: Claude (Fable 5) orchestrates through Forgeflow artifacts
- Worker backend: sonnet subagents (W-007 triage reviewers — independent, none authored the reviewed screens; orchestrator authored none of the 40) + haiku scouts (counts). GLM: NOT used in R0 (no review authority per plan §7.1/D7).
- Provider: Claude (native)
- Model: `claude-fable-5` (orchestrator) / `sonnet` (triage reviewers) / `haiku` (scouts)
- Endpoint class: native
- Worker task packet: triage prompts embedded in Workflow script (per-screen: spec + source + strict JSON row + canon excerpt)
- Worker output path: `Balencia-New-Screens/build-progress/remediation-2026-07/R0/reviews/S<id>.md` ×40
- Saved workflow: session-persisted Workflow script (path recorded in verification log on run)
- Usage guard: /status Fable 5 active; GLM ping pass 2026-07-08 (`OK model=glm-5.2 reply=pong`, unused in R0); subagent fan-out ≤16 concurrent
- Verify command: `npm run check` (balencia-screens/) + `node scripts/verify-visual-104.mjs --strict` baseline diff vs `audit-2026-07-08/evidence/visual-104-summary-strict.txt` (must reproduce 104 / 0 issues / 21 warnings)

## Pre-development gate
- [x] Active docs + tie-breaker: REMEDIATION-PLAN.md (binding) > audit REPORT.md > canon/COMPACT-CANON.md; live code wins ties; claymorphism-era docs capability-evidence only
- [x] Source links resolve (plan, report, evidence JSON, warning list, BUILD-LEDGER W-007 rows, canon — all read this session)
- [x] Verification gates selected: CHECK + STRICT baseline reproduction + 104-count gate
- [x] Deterministic verify command and evidence path recorded (above)
- [x] Loop primitive + runtime profile recorded
- [x] Worker readiness: sonnet/haiku native (no smoke test needed); GLM ping green but excluded from R0 review authority
- [x] Worker output path recorded (`R0/reviews/`)
- [x] Blockers/drift: stray pre-remediation tracked mods committed as `737d5ad` (S04 partial hit-area rework keeps `span role=switch` → strict warning for 04 preserved; baseline reproduction unaffected). Audit's ad-hoc strict harness NOT in repo — RW-001 rebuilds it; stop condition fires if baseline (104/0/21) fails to reproduce.
- [x] Gate result: **READY**

## Baseline anchor
- Baseline SHA (tracked tree clean): `737d5ad`
- Baseline target: `screens: 104, issueScreens: 0, warningScreens: 21, totalIssues: 0, totalWarnings: 21, missingPhoneFrames: [], visibleSiaScreens: [], consoleErrorScreens: []` (audit evidence 2026-07-08T14:32:57Z)
- Warning set (21): 03c, 04, 15, 22, 23, 30, 34, 39, 40, 41, 45, 49, 51, 57, 60, 61, 80, 81, 90, 93, 97

## Item checklist
| Item | Locator | Status |
|------|---------|--------|
| RW-001 harness codification | `balencia-screens/scripts/verify-visual-104.mjs` + `package.json` `verify:visual104` | **done** — exact audit reproduction (see log) |
| RW-002 baseline capture + affordance inventory (S-03 first pass) | `remediation-2026-07/R0/` (JSON, screenshots, `affordance-inventory.md`, `new-rw-items.md`) | **done** — 50 inventory rows, 22/22 sweeps, findings filed as RW-R0-01..19 |
| RW-003 W-007 triage B5b (7): 52,53,54,55,58,60,62 | `R0/reviews/S<id>.md` | **done** — 7/7 FIX-FILED |
| RW-004 W-007 triage B6 (10): 18,30,31,32,33,34,35,36,37,38 | `R0/reviews/S<id>.md` | **done** — 10/10 FIX-FILED |
| RW-005 W-007 triage B7a (9): 39,40,42,46,47,71,82,94,95 | `R0/reviews/S<id>.md` | **done** — 9/9 FIX-FILED |
| RW-006 W-007 triage B7b (10+4): 21,22,23,24,25,43,64,67,69,78 · 80,81,85,98 | `R0/reviews/S<id>.md` | **done** — 14/14 FIX-FILED |
| RW-020 truncation waivers | `remediation-2026-07/WAIVERS.md` (W-TRUNC-40, W-TRUNC-80) | **done** |

## Harness reverse-engineering record (RW-001)
The audit's ad-hoc scanner was not in the repo; heuristics were recovered
empirically against `visual-104-pass-strict.json` until per-screen output
matched exactly (0 mismatches across warnings, issues, phoneRects):
- Viewport 1440x1000, deviceScaleFactor 1, reducedMotion reduce, settle 500ms.
- Visibility = raw rect ∩ every scroll/overflow ancestor clip ∩ phone-frame
  content region (390x844 minus the 34px home-indicator clearance band).
- Small targets: native interactive elements only (button/a[href]/input/
  select/textarea), warn when width<40 or height<40. Canon's 44px floor is
  tracked in the separate `smallTargets44` instrumentation field until R3.
- Non-native roles: warn set = {checkbox, switch} on non-native tags
  (audit-compatible); all other interactive roles land in
  `nonNativeRolesExtended` (found: S45 `div role=slider`).
- Overflow: `<p>` elements only, scrollWidth > clientWidth + 1.
- New instrumentation excluded from totals until R1/R4: 90 screens visibly
  render all-caps CIA; 143 visible purple elements across 65 screens;
  490 visible interactive elements (never-decrease gate baseline).
- Scanner config pinned + hashed in the report: `e2fd6cba632724f3`.

## Rules in force (plan §6 excerpts binding on R0)
- No screen edits in R0. Triage is non-closing: verdicts are PASS-triage or FIX-FILED (new RW items targeted at R1–R5); W-007 closure happens only at R11.
- Reviewer independence: fresh sonnet reviewers; GLM has no review authority; orchestrator prior output never used as a verdict.
- 104-count gate at close. New harness instrumentation (visible-name scan, purple counts, interactive-element counts) in separate JSON fields, excluded from issue/warning totals until R1/R4.

## Verification log
| Command / check | Result | Notes |
|-----------------|--------|-------|
| `./scripts/glm-worker.sh --ping` | pass | 2026-07-08, unused in R0 |
| STRICT baseline reproduction (`node scripts/verify-visual-104.mjs --strict --screenshots --out R0/visual-104-baseline-strict.json`) | **pass — exact** | 104 screens / 0 issues / 21 warnings; per-screen warnings, issues, phoneRects all identical to `audit-2026-07-08/evidence/visual-104-pass-strict.json`; 104 screenshots; SHA 737d5ad embedded |
| `npm run check` | pass | 1 pre-existing lint warning (unused `MoreHorizontal`) = A24-018, closes R10 |
| 104-count gate | pass | verify:routes: 104 screens, 104 specs; harness read 104 from screens.ts |
| `node Balencia-New-Screens/work/validate-redesign.mjs --json` (VAL) | pass | ledgerRows 104 / ledgerPass 104 / screenFiles 104; no missing/low/defect/falsePass rows |
| R0 no-screen-edit scope check | pass | `git status`: zero `.tsx`/spec modifications from this batch; only scripts/, package.json, evidence, ledger note, batch files |
| Worker-output verification (manual review, named as such) | done | orchestrator spot-verified token Highs (S33/S35 undefined tokens confirmed), S80 stop-condition High (source+spec), harness clip semantics (rect probes); remaining per-item verification owned by fixing batches at entry |
| Dirty-worktree caution | recorded | concurrent iOS-lane session artifacts present (READINESS-001, BIOS mods, memory/MEMORY.md, yhealth-app submodule) — NOT staged in R0 commit; named in handoff |

## Triage outcome (RW-003..006)
- 40/40 verdicts: **40 FIX-FILED, 0 PASS-triage**. Totals: 59 High / 101 Medium / 70 Low.
- Reviewers: independent sonnet subagents (workflow `wf_350c5e4e-f83`, 62 agents,
  ~4.5M subagent tokens; 3 API-failure re-runs: S52, S30, S40). None authored any
  diff on the reviewed screens; GLM not used.
- Orchestrator sample verification (worker output → verified evidence): S33
  `bg-domain-people` + S35 `text-brand-cyan` confirmed undefined in globals.css;
  S80 "Connect Spotify" contradiction confirmed in source AND traced to the spec's
  own ASCII (spec-originated); S04/S39 rect measurements confirmed harness clip
  semantics. High-severity claims on tokens/layout verified; per-item re-verification
  is each fixing batch's entry step.
- Defects clustered into 19 deduplicated items: `R0/new-rw-items.md` (RW-R0-01..19).
- NOTE: triage is non-closing. W-007/A24-001 stays open until R11 closure at final SHA.

## ⚠️ Founder stop-condition surface (blocking R1 start)
Plan stop condition: "Any High defect found on a hand-converted reference screen
(12,75,80,83,89,90,91,93,96,97) → surface to founder before proceeding."
- **Screen 80 (Music Coach, reference screen): confirmed High** — bottom
  `BtnPrimary` "Connect Spotify" contradicts the connected/playing Default state
  ("Via Spotify · Cached 2m ago" + Disconnect control on the same screen).
  Verified in source (`S80MusicCoach.tsx:231`) and spec (`80-music-coach.md:44`
  carries the same CTA inside a composition that also shows "via Spotify") —
  **the defect originates in the spec**, the build followed it faithfully.
  Filed under RW-R0-13. Fix requires a spec edit + build edit together.
- Also for founder attention at the same surface: RW-R0-18 (12 spec-named
  components/modules never built — sizing decision: build vs demo-scope
  disposition, not silently waivable) and the 40/40 FIX-FILED rate (triage
  quality bar was strict; most items fold into existing R2–R5 lanes).

## Completion gate (before status `closed`)
- [x] RW-001: harness reproduces audit summary 104/0/21 exactly; flags `--strict --screenshots --only --out` work
- [x] RW-002: full baseline artifacts at SHA 737d5ad in `R0/`; affordance inventory filed; new RW items RW-R0-01..19 created for R2/R3/R4(+founder) lanes
- [x] RW-003..006: 40/40 triage files with verdicts; REMEDIATION-LEDGER updated
- [x] RW-020: W-TRUNC-40/80 in WAIVERS.md with rationale
- [x] REMEDIATION-LEDGER.md updated; `plans/next-session-handoff.md` names R1 (gated on founder ack of stop-condition surface)
- [x] No screen edits made in R0 (git diff scope: scripts/, package.json, evidence, plans only)
- [x] Commit `R0 evidence-reset: <summary>` on hifi-build
