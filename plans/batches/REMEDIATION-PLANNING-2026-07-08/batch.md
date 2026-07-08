# REMEDIATION-PLANNING-2026-07-08 — B+ → A+++ remediation & finalization plan

- Status: `READY` (closed 2026-07-08)
- Theme: Synthesize the 2026-07-08 audit + locked founder decisions into `REMEDIATION-PLAN.md` — the operating plan that takes the 104-screen hifi package from B+ (84) to A+++ development-handoff readiness without shrinking the product.
- Session cap: one document + persistence artifacts (planning batch; no prototype code or spec edits).
- Reviewed date / evidence path: 2026-07-08 / `plans/batches/REMEDIATION-PLANNING-2026-07-08/`
- Build gate this batch? no — docs-only batch
- Active root: `Balencia-New-Screens/build-progress/audit-2026-07-08/`
- Source links: `audit-2026-07-08/REPORT.md`, `SCREEN-COVERAGE-MATRIX.md`, `evidence/strict-warning-list.txt`, `build-progress/BUILD-LEDGER.md`, `canon/COMPACT-CANON.md`, `canon/COMPONENT-CATALOG.md`, `hifi-screens/_HIFI-LEDGER.md`, `_IMAGE-SLOTS.md`, `balencia-screens/src/`, `balencia_doc/{MODULES-AND-FEATURES,Missing-Features,Product_vision}.md`, approved session plan `~/.claude/plans/fable-prompt-harmonic-wigderson.md`
- Handoff status target: READY
- Pre-development doc gate: READY
- Loop primitive: `ultracode:` (bounded planning sweep; small first runs = recon agents already complete this session)
- Runtime profile: `claude-native`
- Orchestrator role: Claude (Fable 5) orchestrates through Forgeflow artifacts
- Worker backend: GLM 5.2 workflow sub-worker, evidence only (bulk finding→batch classification cross-check)
- Provider: Z.ai (worker only)
- Model: `glm-5.2` (worker); `claude-fable-5` (orchestrator)
- Endpoint class: native (orchestrator) / provider-api (worker)
- Worker task packet: inline prompt (bounded excerpt: A24 finding one-liners + batch skeleton; no founder-personal or user data)
- Worker output path: `plans/batches/REMEDIATION-PLANNING-2026-07-08/glm-crosscheck.md`
- Saved workflow: n/a
- Usage guard: `./scripts/glm-worker.sh --ping` passed 2026-07-08 (`OK model=glm-5.2 reply=pong`); 529-backoff rule if >4 concurrency (single call planned)
- Verify command: deterministic doc gate — grep REMEDIATION-PLAN.md for all 11 required section headings, all 18 A24 IDs, 8 founder decisions, S-01..S-08; plus count sweeps logged below
- Evidence path: `plans/batches/REMEDIATION-PLANNING-2026-07-08/`

## Pre-development gate
- [x] Active docs and tie-breaker source identified (canon/ = visual authority; balencia_doc/ = capability evidence; CREATIVE-REFERENCE/logo/CSS tokens canonical)
- [x] Source links resolve to active docs and live code paths
- [x] Deterministic verify command and evidence path recorded
- [x] Loop primitive and runtime profile recorded
- [x] Worker smoke test recorded (GLM ping pass)
- [x] Worker packet scope bounded (excerpts only; GLM output evidence-only)
- [x] Blockers/waivers: none for this docs-only batch
- [x] Gate result: READY

## Item checklist
| Item | Locator | Status |
|------|---------|--------|
| Fresh count verification sweeps | logged below | done |
| GLM cross-check (finding→batch matrix) | `glm-crosscheck.md` | done — 26/26 mapped, no empty batches; divergences resolved by orchestrator (A24-009→R1; S-05/S-08→R4) |
| REMEDIATION-PLAN.md (11 sections) | `audit-2026-07-08/REMEDIATION-PLAN.md` | done — 347 lines, 39 RW rows |
| Final reviewer attack + revisions | 14 findings (1 dead-end closure path, 1 unachievable acceptance, 1 ladder contradiction, 11 med/low) — ALL applied | done |
| /verify + /close-batch + /handoff + memory | this file, `plans/next-session-handoff.md` | done |

## Verification log
| Command / check | Result | Notes |
|-----------------|--------|-------|
| `./scripts/glm-worker.sh --ping` | pass | `OK model=glm-5.2 reply=pong` |
| grep SIA hifi | 0 | hifi layer SIA-clean, confirmed fresh |
| grep CIA src/ | 470 occurrences | visible-copy rename scope confirmed |
| grep Cia strays hifi | 3 (S35 ×1, S81 ×2) | become the norm post-R1 |
| grep royal-purple hifi | 156 occurrences | R4 classification scope confirmed |
| grep 255,122 src/ | 4 matches (S67 ×2, S71 ×2) | A24-017 scope confirmed |
| grep paywall/premium/locked + unlock hifi screens | 14 screens + profile/index.ts | S15,S22,S27,S32,S43,S47,S59,S63,S71,S83,S90,S92,S93,S97 |
| grep PaywallLock src/ | 0 files | component absent, confirmed |
| grep '^| HIFI-' _IMAGE-SLOTS.md | **35 rows** | audit figure 35 correct; earlier recon "38" was an overcount — plan uses 35 |
| GLM cross-check output | pass | table complete, no unmapped findings |
| Final reviewer attack (independent, Fable subagent) | 14 findings filed | all fixes applied to REMEDIATION-PLAN.md; clean vectors: finding coverage, dependency graph, ≤10 caps, GLM scope |
| Doc gate (deterministic grep) | pass | 11/11 sections, 18/18 A24, 8/8 S, 8/8 founder decisions, scope sentence, 39 RW rows |
| chrome.tsx:80 nav label check | `label: 'Missions'` already in code | D8 code-side pre-shipped; remaining = "CIA"→"Cia" label + canon §6 |
