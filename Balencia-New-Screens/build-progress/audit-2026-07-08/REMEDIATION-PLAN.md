# Balencia Remediation & Finalization Plan — B+ → A+++ Development Handoff

Date: 2026-07-08
Author: Fable orchestrator (remediation-planning batch, `plans/batches/REMEDIATION-PLANNING-2026-07-08/`)
Baseline: `REPORT.md` (this directory) — B+ 84/100, "ready with waivers", findings A24-001..018
Branch: `hifi-build`
Scope sentence (binding, printed on every certificate produced under this plan): **A+++ here means design-handoff readiness of the 104-screen package — NOT product/production readiness.**

---

## 1. Executive Recommendation

**Current state.** B+ (84/100), ready with waivers. The 104-screen hifi shell is complete and stable: deterministic gates pass, all screens load, zero console errors, zero visible SIA in hifi routes. The open problems are evidence gaps (W-007: 40 screens only self-reviewed), semantic/a11y debt in shared chrome and 21 flagged screens, purple semantic drift, a missing canonical PaywallLock, naming drift (SIA/CIA/Cia), product-readiness honesty on WhatsApp/Finance/compliance surfaces, a 35-slot asset backlog, and Tier B/C Figma evidence.

**Target state.** A+++ final screen package ready for development handoff: every screen independently reviewed at the final SHA, all semantics native, all naming converged on **Cia**, purple meaning exactly Cia/AI/projected/premium, one canonical PaywallLock, every ambitious-but-unbuilt capability wrapped in a machine-checkable dependency map instead of a watered-down UI, assets produced or explicitly waived, and a handoff packet an unfamiliar engineer can build from.

**What changes:** semantics, casing, tokens, evidence, documentation, and one new kit component. **What does not change:** screen count (104, hard-gated), WhatsApp/Finance/premium ambition, the warm-dark glass language, and the honesty invariant. Findings whose root cause is backend immaturity (A24-005/006/007/012/013/014, largely A24-011) are closed by **dependency documentation**, not by UI removal — per founder decisions below.

**Route: 12 batches + one quarantine lane** (§5), each small, verifiable, and closing named findings. Estimated finding closure: 5 of 6 Highs by end of R6 (A24-001/W-007 closes at R11 by design — its closure evidence must be captured at the final SHA); all Mediums by end of R10; A+++ certification at R11.

---

## 2. The A+++ Quality Bar

"Fresh" = generated at the final remediation HEAD SHA, with that SHA recorded inside the artifact. Every criterion is a deterministic scan, a stored artifact, or an independent human note — never a self-assertion.

| # | Dimension | A+++ pass criterion | Evidence artifact |
|---|---|---|---|
| 1 | Visual polish | 104/104 independent per-screen review notes at final SHA (reviewer authored no post-review diff on that screen); 10 hand-converted reference screens (12, 75, 80, 83, 89, 90, 91, 93, 96, 97) re-certified vs pre-remediation baseline — "regression-clean" = every pixel delta explained by an enumerated per-screen expected-change list (rename, hit-area, PaywallLock, asset), countersigned by IND | `W007-CLOSURE.md` per-screen table + baseline/final screenshot pairs + expected-change lists |
| 2 | Glass/token fidelity | Zero raw color literals — hex, `rgb()`, `rgba()`, and Tailwind arbitrary values in `className` — in `src/components/hifi/**` outside a documented allowlist; glass tiers per COMPACT-CANON §2 (20-screen spot audit) | Extended `verify:brand` output + spot-audit notes |
| 3 | Cia naming | 0 visible `SIA`/`Sia`/all-caps `CIA` in rendered text + aria across the strict 104 scan; canon, AGENTS.md, and verify scripts all state "Cia"; identifier policy documented | Strict JSON visible-name assertion + grep report at final SHA + naming-policy note |
| 4 | A11y semantics | 0 non-native interactive-role warnings; chrome controls are real `button`/`a` with labels and `aria-current`; manual affordance inventory finds no visually-interactive bare `div`/`span` (scanner blind spot S-03) | Fresh strict JSON + affordance-inventory checklist |
| 5 | Touch targets | 0 small-target warnings, or per-entry waiver with a compensating ≥44px hit area proven by the scan | Fresh strict JSON + `WAIVERS.md` |
| 6 | Trust & data honesty | Canon §7 three-state (real + provenance / low-confidence / honest null) spot-audit on 20 screens incl. 30/31/03e/99/98; every depicted-unbuilt capability has a `DEPENDENCY-MAP.md` row; zero launch-ready language in package docs | `DEPENDENCY-MAP.md` + honesty spot-audit notes |
| 7 | Ambition preservation | 104-count invariant at every batch close (`screens.ts` = ledger = validator); remediation-range diff shows no removed module/card/action on WhatsApp/Finance/premium screens; filler grep clean | Count-gate logs + diff review note |
| 8 | Asset quality | All 35 tracked slots: produced privacy-safe asset with license recorded, or founder-signed P2 waiver by slot ID; no slot silently deleted | `_IMAGE-SLOTS.md` with status column + provenance manifest |
| 9 | Figma/evidence tier | Tier A = stored MCP artifacts (variable defs, screenshots, file keys, timestamps) under `evidence/figma-tierA/`; otherwise a founder-signed scope exclusion printed on the certificate — never a claimed pass | MCP artifact dir or signed exclusion note |
| 10 | Dev-handoff readiness | Handoff packet passes a dry-run: an engineer unfamiliar with the project answers "how do I build S60 and what blocks shipping it?" from the packet alone | `HANDOFF-README.md` + dry-run Q&A note |

### Tier ladder (consistent with Forgeflow grade caps: no A− with an open High; A++ only with all dimensions maxed + fresh evidence)

| Tier | Requirement | Blocked by |
|---|---|---|
| **A** | All 6 Highs (A24-001..006) closed with evidence; strict-104 rerun 0 issues | Any open High |
| **A+** | All Mediums closed or founder-waived by ID; 0 strict warnings except allowlisted intentional truncation; DEPENDENCY-MAP live and referenced | Open Medium without named waiver; un-allowlisted warning |
| **A++** | All 10 dimensions pass; only founder-signed scope exclusions remain; ALL evidence fresh at one SHA | Any stale artifact; any convenience waiver |
| **A+++** | A++ **plus** independent adversarial re-audit (auditor ≠ any fixer) finds 0 new High/Medium; reference-screen regression clean; handoff dry-run passes; certificate carries the scope sentence | New High/Medium in re-audit; reference regression; scope-sentence omission |

---

## 3. Decision Integration (founder decisions, locked)

| # | Decision | Plan consequence |
|---|---|---|
| D1 | Coach name = **Cia** user-facing | 3-way convergence: legacy `SIA` quarantined, canon `CIA` → `Cia` in all visible copy and docs; internal identifiers (`CIAInsightCard`, `S09CiaChat`, `key: 'cia'`) stay unless churn has clear benefit (R1) |
| D2 | Keep all created screens | 104-count hard gate at every batch close; 3 source-only + 33 review-route-only screens get explicit handoff dispositions, never deletion (§10) |
| D3 | WhatsApp + Finance stay as designed | Zero ambition change; A24-005/006 closed via dependency map + shell badges + spec footers (R6/R7) |
| D4 | Document Intelligence follows backend design | Minimal state additions on existing screens (S20, S72; S68 evaluated) — no new module (R8) |
| D5 | Figma Tier A best-effort | Live MCP attempt in R10; failure → explicit founder-signed waiver, never a claimed pass |
| D6 | Assets: privacy-sensitive + first-impression first, production-grade, official logo only | R9 wave order; per-asset privacy checklist; no generated logos |
| D7 | GLM 5.2 approved with necessary context sharing | GLM = bulk drafter/classifier on bounded excerpts; output is evidence until Fable verifies; never a reviewer or verifier |
| D8 | Nav tab label **"Goals" → "Missions"** (decided 2026-07-08 during plan approval) | Locked vocab "mission never goal" now applies to the bottom nav: one-line `chrome.tsx` navTabs change + canon §6 update, executed inside R1 |

---

## 4. Finding-by-Finding Remediation Matrix

Owner profiles: **FBL** Fable orchestrator · **SON-I** Sonnet implementation · **SON-UX** Sonnet UX/trust · **HKU** Haiku scout · **GLM** GLM 5.2 bulk worker (evidence-only) · **IND** independent reviewer (≠ any fixer) · **AST** asset pipeline. Verify shorthand: **CHECK** `npm run check` (balencia-screens/) · **STRICT** `node scripts/verify-visual-104.mjs --strict` vs localhost:3001 · **VAL** `node Balencia-New-Screens/work/validate-redesign.mjs --json`.

| ID | Sev | Finding | Screens/files | Founder-decision impact | Remediation | Owner | Verification evidence | Done criteria | Blocks |
|---|---|---|---|---|---|---|---|---|---|
| A24-001 | High | W-007 open: 40 screens self-reviewed only (B5b/B6/B7a/B7b, spend-cap limit event) | 40 screens: B5b 52,53,54,55,58,60,62 · B6 18,30–38 · B7a 39,40,42,46,47,71,82,94,95 · B7b 21–25,43,64,67,69,78,80,81,85,98 | — | **R0 triage** (independent, non-closing, files defects as RW items) + **R11 closure** (independent per-screen pass/fail at final SHA; bulk "all fine" invalid) | IND | `R0/reviews/S<id>.md` ×40 + `W007-CLOSURE.md` at final SHA | 40/40 closure verdicts recorded, ledger updated | A |
| A24-002 | High | Shared chrome not semantic: back = aria-hidden span (L46–50), nav tabs = divs (L95), quick-log = div (L112–121) | `balencia-screens/src/components/hifi/kit/chrome.tsx` | — | Zero-pixel native-element fixes (§5 R2); IconButton/SectionTitle/StepperRail already correct | SON-I | STRICT (0 chrome warnings) + sentinel screenshot diff (01,09,12,17,26,43) | Native button/aria-current/label semantics, no visual delta | A |
| A24-003 | High | Purple outside Cia/AI/projected/premium semantics | 156 `royal-purple` uses / 51 hifi files; worst S60 (×8, safety/error/pending), S54 (×5) | Premium stays purple-legitimate (PaywallLock) | Classify all 156 uses → `purple-checklist.md` (keep / recolor→error / →orange / →green / →neutral); fix violations; screens with a Cia insight keep ≥1 purple | SON-UX + FBL | Checklist artifact + CHECK + STRICT purple-count assist | 156/156 classified, 0 open VIOLATION rows; ≤2 purple elements/screen on non-Cia-primary screens — Cia-primary surfaces (e.g. 09, 10, 20) carry a documented purple budget in the checklist instead (the canon cap must not become the purge §6.8 forbids) | A |
| A24-004 | High | PaywallLock specced (COMPONENT-CATALOG §6, rule "never hide, never dead-end") but not implemented; inline gating scattered | 14 screens: S15,S22,S27,S32,S43,S47,S59,S63,S71,S83,S90,S92,S93,S97 (+ `screens/profile/index.ts`) | Premium gating = canonical pattern | New `kit/paywall.tsx`: blur-20 glass over REAL rendered layout, lock glyph, one-line value copy, BtnPrimary "Unlock with premium", fullscreen+inline variants; anchor S43; adopt across the 14 | SON-I | CHECK + STRICT + before/after screenshots proving never-hide | Component in kit; 0 ad-hoc lock treatments left in sweep | A |
| A24-005 | High | WhatsApp looks launch-ready; backend has 10 Critical + 5 High blockers, image/vision pipeline missing | 03e, 99 | **Keep design as-is** (D3) | DEPENDENCY-MAP rows DEP-WA-*; spec footers; shell-chrome badge outside the 390×844 frame; zero UI change | SON-UX | VAL + git-diff scope check (no .tsx changes) + map row present | Badge renders; map row has testable go-live criteria | A |
| A24-006 | High | Finance implies mature AI insight; backend 2.7/10, no insights writer, no LLM consent gate, plaintext-at-rest | 30, 31 | **Keep design as-is** (D3) | Same pattern: DEP-FIN-* rows + footers + badges; in-frame changes limited to already-required canon §7 honesty states | SON-UX | Same as A24-005 | Same | A |
| A24-007 | Med | Trust/compliance controls ahead of platform (PHI log, encryption, GDPR export/delete, 2FA, APM unstarted) | 20, 30, 31, 51, 72, 78, 84, 86, 99 | Preserve controls (no removal) | `COMPLIANCE-DEPENDENCY-MATRIX.md`: every visible trust control → backend status + blocker ref; feeds DEPENDENCY-MAP | SON-UX | Matrix rows citing `Missing-Features.md` sources | Each control mapped; no control removed | A+ |
| A24-008 | Med | Coach naming conflict (docs SIA, canon CIA, target Cia) | Canon docs, `balencia_doc/`, legacy `src/app` (226 SIA + 196 `sia`), hifi visible copy (470 CIA occ/164 files), 3 `Cia` strays | **Cia final** (D1) | R1 convergence: canon+gates first → visible-copy rename → guard; legacy quarantined (RQ), not renamed | FBL + GLM (mechanical) + SON-I (review) | verify:copy Cia rule green + STRICT `visibleWrongCaseCiaScreens: []` + grep at final SHA | 0 visible non-Cia coach tokens in guarded paths; canon states the rule | A+ |
| A24-009 | Med | Visual source truth split (glass-dark canon vs claymorphism-era docs) | `COMPACT-CANON.md`, `Product_vision.md` | Canon = visual authority | Authority statement written into canon + handoff packet during R1.9 doc sweep; `balencia_doc` marked capability-evidence-only | FBL | Canon diff + handoff packet section | Authority hierarchy stated in both places | A+ |
| A24-010 | Med | 21 strict warnings: 15 small-target, 4 non-native-role (03c,04,57,61), 2 truncation (40,80) | 15,22,23,30,34,39,41,45,49,51,60,81,90,93,97 + 03c,04,57,61 + 40,80 | — | R3: decoupled hit-area pattern (real ≥44px button, negative-margin layout cancellation); native checkbox/switch conversions; truncation → waivers W-TRUNC-40/80 with rationale | SON-I | STRICT: warnings 21 → ≤2 (waived only) | 0 unwaived warnings; interactive-element count per screen not decreased | A+ |
| A24-011 | Med | Document Intelligence under-covered vs backend design | 20, 72 (+68 eval) | **Minimal additions only** (D4) | States on existing screens: S20 upload-entry/processing/medical-gate-consent; S72 document-node/citation-chip/doc→wiki; S68 RAG-citation state (may be spec-note only). No new screens | SON-I + SON-UX | CHECK + STRICT(20,72,68) + VAL | States render; specs updated with §7/§8 patterns | A+ |
| A24-012 | Med | PWA/offline status screen could read as offline product support | 98 | Keep system-state design | Scoping note in COMPLIANCE matrix + DEP row: "state coverage, not offline capability" | SON-UX | Matrix row | Note present, screen unchanged | A+ |
| A24-013 | Med | Barcode logging designed; backend not started (note: MODULES line contradicts Missing-Features — record the doc contradiction) | 29 | Keep design | DEP row + spec footer: future/flag-gated; doc contradiction logged for backend team | SON-UX | Matrix row | Same | A+ |
| A24-014 | Med | Voice UI covered; PSTN not built | 10, 11, 51, 79 | Keep in-app voice design | DEP rows splitting in-app voice (built, flag-gated) from PSTN/home-widget (not started) | SON-UX | Matrix rows | Same | A+ |
| A24-015 | Med | Figma evidence Tier B/C; no live MCP capture | `figma-build-audit/`, `figma-tokens-map.json` | **Best-effort Tier A** (D5) | R10: `/figma-build-auditor` live-MCP run (DS `XF2diepp3IfcWuDWHwL4ez`, screens `jxoChLrvjIdHQh9Q95SHpi`) → `evidence/figma-tierA/`; else W-FIGMA-TIER waiver with retry conditions | FBL | MCP artifacts or signed waiver | Tier A evidence stored OR waiver printed on certificate | A++ (waivable) |
| A24-016 | Med | 35 tracked image slots, all placeholder | `hifi-screens/_IMAGE-SLOTS.md` | **Privacy-first order** (D6) | R9 waves: P0 privacy (HIFI-90,49,**67**,10,26,27,70,55,29,53,86 — 67 lifted to P0 per audit's own P0 table) → P1 privacy+no-face (87,88,91,75,83) + provider-neutral WhatsApp (03e,99) → first-impression (01,02,03d,09,50,12) → remainder: explicit disposition item RW-034b (produce or draft founder waiver per slot ID — never silent) | AST + FBL | `verify:assets` + per-asset privacy checklist + provenance manifest | ALL 35 slots dispositioned: shipped or founder-waived by ID; no slot deleted | A+ |
| A24-017 | Low | Off-token orange `rgba(255,122,0)` | `S67ImageViewer.tsx:9,39` (className gradients), `S71AchievementGallery.tsx:113,125` (SVG strokes) | — | Replace with token equivalents; extend `verify-brand.mjs` to fail ANY off-allowlist rgb()/rgba() incl. className arbitrary values (S-07) | SON-I | Extended verify:brand red pre-fix, green post-fix | Gate green; visual diff imperceptible | A+ |
| A24-018 | Low | Lint warning: unused `MoreHorizontal` | `DomainDashboardHeader.figma.tsx` | — | Remove import in R10 cleanup | SON-I | `npm run lint` 0 warnings | Lint clean | A+ |

### Supplemental findings (this session's adversarial pass — same discipline as A24 rows)

| ID | Sev | Finding | Remediation → batch |
|---|---|---|---|
| S-01 | High-adj | S60 clinical-safety copy: adherence-minimizing language ("Take when ready", "no pressure") on named Schedule-II demo med (Adderall XR) | Neutral demo medication + safety-reviewed coaching copy → R4 |
| S-02 | Med | S60 adherence section ships only an error state — violates canon §7 three-state honesty | Real/low-confidence/honest-null states → R4 |
| S-03 | Med | Zero-role affordances invisible to strict scanner (e.g. S60 dose rows are bare divs) | Inventory FIRST PASS in R0 (baseline, alongside RW-002); fixes filed as RW items into R3/R4 (S60 dose-row semantics folded into RW-025); R11 re-runs the inventory as verification only — never as first discovery |
| S-04 | Med | Title-Case copy drift (canon: sentence case) — S30 "Spend By Category", S98 "You're Offline" etc.; no gate catches it | Sweep + Title-Case heuristic in verify-copy → R4 |
| S-05 | Low | Weak provenance copy "Via Finance API" on S30 (canon idiom: `via WHOOP`) | Copy fix to canon idiom → R4 |
| S-06 | Med | Evidence contradiction: `verify-visual.mjs` passes `/tabs/sia/*` routes while package claims SIA-clean | Legacy quarantine → RQ |
| S-07 | Med | Color-literal drift extends into Tailwind arbitrary className values (S67 radial-gradient) beyond A24-017's rgb() cases | Lint scope extension → R4 (with A24-017) |
| S-08 | Low | `Provenance` component misused for non-provenance state labels on S98 | Correct component usage → R4 |

GLM 5.2 cross-check of this mapping: `plans/batches/REMEDIATION-PLANNING-2026-07-08/glm-crosscheck.md` — 26/26 findings mapped, no empty batches, divergences resolved by orchestrator (A24-009 → R1 doc sweep, not R10; S-05/S-08 stay R4 as code-copy fixes with DEP cross-references).

---

## 5. Batch Plan

```
R0  ─ Evidence reset: codify strict harness + baseline capture + W-007 TRIAGE (non-closing)
R1  ─ Cia convergence (canon+gates first → copy → guard) + nav "Goals"→"Missions"
R2  ─ Chrome semantics, kit-level (zero-pixel)
R3  ─ Touch targets + non-native roles + truncation waivers (21 screens)
R4  ─ Purple reclassification + color-literal cleanup + copy-case sweep + S60 safety/honesty
R5  ─ PaywallLock component + adoption (14 screens)
R7→R6 ─ Compliance matrix → dependency map + spec footers + shell badges (docs lane, ∥ R2–R5)
R8  ─ DocIntel minimal state additions (S20/S72, eval S68)
R9  ─ Assets (generation ∥ anytime after R0; wiring after R5)
R10 ─ Figma Tier A best-effort + tokens-map regen check + A24-018
RQ  ─ Legacy /tabs/sia quarantine (after R1, before R11)
R11 ─ Fresh strict-104 + screenshots + independent re-audit + W-007 CLOSURE + certificate/handoff packet
```

**Sequencing rationale.** W-007 *closure* lives in R11, not R0 — a closure review performed before R1 goes stale the moment the Cia rename touches those screens' visible copy; R0's independent pass is triage (surface latent defects early so they are fixed inside R1–R5, not discovered at R11). R4 strictly precedes R5 (purple semantics settled before PaywallLock bakes in premium styling). R7 feeds R6. Baseline screenshots at the start SHA are mandatory — the A+++ reference-regression check is unverifiable without them. Forgeflow sizing: every screen-touching sub-batch ≤10 screens.

**Per-batch detail** (screens, exact fixes, file paths, sub-batch splits) is specified in the work items (§8) and mirrors the approved session plan. Key mechanics:

- **R0.** Codify the audit's ad-hoc strict harness as `balencia-screens/scripts/verify-visual-104.mjs` + `verify:visual104` npm script (the harness is NOT in the repo today; without it every later "re-run strict" claim is unreproducible). Schema-compatible with `evidence/visual-104-pass-strict.json`; reads the screen list from `src/data/screens.ts`; checks: phone frame, console errors, <44px targets, non-native roles, overflow, PLUS new instrumentation — visible SIA/wrong-case-CIA scan, purple-element count, per-screen interactive-element count (the §6.6 gate's instrument). **New checks emit separate JSON fields (`visibleWrongCaseCiaScreens`, `purpleCounts`, `interactiveCounts`) excluded from issue/warning totals until their enforcement batches (R1/R4) close** — otherwise the RW-001 acceptance (reproduce 104/0/21) is unachievable, since every screen renders all-caps "CIA" in the nav at baseline. `--screenshots`, `--only <ids>`, non-zero exit on issues. Baseline run + full screenshots + **affordance-inventory first pass (S-03)** at start SHA. Truncation waivers W-TRUNC-40/80 written here (RW-020 — only dep is the harness). W-007 triage sub-batches: R0.1 (7) · R0.2 (10) · R0.3 (9) · R0.4 (10) · R0.5 (4); reviewer ≠ original author; GLM excluded from review authority.
- **R1.** Order inside the batch is load-bearing: (1) canon + gates first — `COMPACT-CANON.md` §0/§5/§6/§10 → "Coach persona: **Cia**. Never SIA; all-caps CIA banned in visible copy; code identifiers exempt", nav spec → `Today · Cia · Missions · Me`, `COMPONENT-CATALOG.md` casing note, `balencia-screens/AGENTS.md`, `verify-copy.mjs` Cia rule (lands red, proving detection) — otherwise any worker reading canon mid-batch reintroduces CIA; (2) visible-copy rename (guarded code paths measure 393 occurrences/94 files by reproducible grep; the 470/164 figure includes legacy+data — **re-count with a quoted command at R1 entry** per the scout rule §7.2; JSX text, string props, aria-label/alt/title — including the `chrome.tsx` nav label `CIA`→`Cia`; note the D8 "Missions" tab label is ALREADY in code at `chrome.tsx:80` — D8's remaining scope is canon §6 + gate coverage only; plus `kit/cia.tsx`, `src/data/screens.ts` display names, 104 spec files), sub-batched by screen directory ≤10 files per pass, GLM-eligible per-file diffs verified by the deterministic gate + typecheck; (3) guard proof: verify-copy green repo-wide, STRICT `visibleWrongCaseCiaScreens: []`. `validate-redesign.mjs` confirmed Cia-safe (coach regexes case-insensitive; SIA ban `\bSIA\b/i`).
- **R2.** Single file, 104-screen blast radius (TopBar 89 consumers, IconButton 48, FloatingQuickLog 19, GlassNavBar all). Exact zero-pixel fixes: back span → `<button type="button" aria-label="Back">` same classes (already 44×44); tab div → `<button type="button" aria-current={active?'page':undefined}>` same classes, icon aria-hidden, visible span = accessible name; quick-log outer div → `<button type="button" … w-full>` (only delta `w-full` — button shrink-wraps where div fills), whole pill is the ≥44px target. Sentinel screenshot diff: 01, 09, 12, 17, 26, 43.
- **R3.** Decoupled hit-area idiom: the interactive element is a transparent native `<button>` ≥44px whose extra size is cancelled with negative margins; the original visual box nests inside unchanged. NOT `::after` inset — it doesn't change the measured rect, making the fix unverifiable by the harness. R3.1 segmented controls (39,41,45,49,51,90,93,97) — fix once at kit level (`SegmentedControl`), `aria-pressed`/radiogroup; R3.2 text links + icon actions (15,22,23,30,34,60,81); R3.3 native semantics (03c,04,57,61): checkbox → `<label>` + `sr-only` native input + aria-hidden visual; switch → `<button role="switch" aria-checked>`; truncation 40/80 → W-TRUNC waivers, copy edits on those strings banned. Guard: per-screen interactive-element count must not decrease.
- **R4.** Purple checklist is human judgment (semantic classification), harness adds only a count assist. Includes A24-017 + S-07 lint-scope extension, S-01/S-02 S60 fixes, S-04 Title-Case sweep + heuristic, S-05, S-08.
- **R5.** `PaywallLock` built to catalog line-by-line; classification pass decides which of the 14 candidates' inline gates convert vs stay legitimate upsell copy; adoption sub-batched 9+5; before/after screenshots prove never-hide.
- **R6/R7 (docs lane, zero UI ambition change).** `COMPLIANCE-DEPENDENCY-MATRIX.md` → central `DEPENDENCY-MAP.md` (DEP-IDs; screens; depicted capability; blocker refs into `Missing-Features.md`; exact flag names; TESTABLE go-live criteria — "all 10 WA Critical blockers closed", never "when ready"; owner + review date; design status column always `final`) → 2-line per-spec footers (pointer only) → `deps:` field in `screens.ts` rendering a shell-chrome badge "design-final · build-blocked (DEP-XX)" OUTSIDE the 390×844 frame. Closure of A24-005/006/007/012/013/014 becomes machine-checkable: every flagged screen has ≥1 dep row.
- **R8.** DocIntel per backend design (upload→OCR→chunk→embed; RAG /ask + citation validator; doc→wiki; @mention; medical gate; graph tab; trends — built, flag-gated). States only, no new screens.
- **R9.** Generation parallel from R0; wiring after R5. Official logo assets only; per-asset privacy checklist (no identifiable faces, no third-party marks, license recorded) in `R9/asset-review.md`.
- **R10.** Live-MCP Figma attempt; `figma-tokens-map.json` regen check (R4 changes usage not `globals.css` values — expected no-op, verify); A24-018.
- **RQ.** Move `/tabs/sia/*` + `/auth/sia-onboarding` out of `verify-visual.mjs`'s package evidence into a separate `verify:legacy` list; `LEGACY-README` in `src/app/tabs/sia/` ("pre-rename reference, excluded from the 104-package and all Cia claims, do not extend"); NO mass rename of the 226 legacy occurrences (high churn, zero handoff value, would falsely make legacy look current).
- **R11.** Full fresh gate at ONE SHA recorded in every artifact: CHECK, VAL (104/104/104), strict-104 + full screenshots (scanner config pinned + hashed: 390×844, deviceScaleFactor, thresholds — config change invalidates baseline comparison), legacy `verify:visual`; independent adversarial re-audit (auditor ≠ any fixer); W-007 closure per-screen; reference-regression diff on the 10 hand-converted screens; re-grade under cap rules; `HANDOFF-PACKET.md` + certificate.

---

## 6. No-Water-Down Rules (binding on every batch)

1. **Do not remove screens to improve scores.** 104-count hard gate (`screens.ts` = `_MASTER-LEDGER` = validator) at every batch close; any count change is an automatic batch failure.
2. **Do not hide hard features by reducing ambition.** Remediation-range diff review: no module, card, or action removed from WhatsApp/Finance/premium screens.
3. **Do not convert WhatsApp/Finance into weak placeholders.** R6 changes zero pixels of ambition; A24-005/006 close via dependency rows + badges. `verify-copy.mjs` fillerBlacklist extended with `coming soon`, `beta placeholder`, `launching soon`.
4. **Do not weaken privacy/trust ambition.** Canon §7/§8 elements (provenance chips, consent rails, export/delete controls) are non-removable; backend gaps are documented in the compliance matrix, not designed away.
5. **Do not abandon the warm-dark premium glass direction.** Canon glass-dark v1 is visual authority (A24-009); claymorphism-era docs are capability evidence only.
6. **Do not overfit to automated warnings.** Intentional truncation (40, 80) is waived with rationale, not "fixed"; copy edits on those strings are banned in R3; hit areas grow — affordances are never deleted (interactive-element count gate; removing any affordance needs founder sign-off).
7. **Do not claim implementation readiness where docs say a dependency remains.** Certificate template: "Design-final. Build-blocked by: DEP-…"; the scope sentence is mandatory on every certificate.
8. **Purple is reclassified, never purged.** Per-use ledger with keep/recolor buckets; screens with a Cia insight retain ≥1 purple element; Cia-primary surfaces (09, 10, 20 class) carry a documented purple budget instead of the ≤2 cap.
9. **PaywallLock previews, never hides.** Blur over the real rendered layout; catalog rule "never hide, never dead-end" quoted in the batch brief.
10. **Rename is a case change only.** Protected-token list (component names, file paths, ledger IDs); no "Coach Cia" copy improvements smuggled in.
11. **Asset slots are never silently deleted.** Privacy-first constrains asset *content*, not asset *existence*; every slot ends produced or tracked/waived.
12. **GLM is additive/mechanical only.** Zero restyling authority; never a verifier; every GLM diff reviewed by a non-GLM reviewer; historical evidence files are never rewritten.

**False-readiness guards** (mirror image): Cia closure needs grep evidence across canon + scripts + screens at final SHA, not just screen copy; every artifact embeds its generation SHA and R11 rejects stale ones; Tier A only with stored MCP artifacts; W-007 reviewer independence (reviewer authored no diff on the reviewed screen since the last independent pass); coverage split (3 source-only + 33 review-route-only) printed on the certificate; `npm run check` is never cited for dimensions it doesn't measure; only founder-signed scope exclusions survive at A++/A+++.

---

## 7. Agent Work Packets

### 7.1 GLM 5.2 bulk classifier / mechanical drafter
- **Objective:** first-pass bulk work — per-file Cia rename diffs (R1), purple-use pre-classification draft (R4 input), finding→fix matrix drafts, asset-priority table drafts.
- **Files to read:** none directly — GLM receives bounded excerpts via `echo "<prompt>" | ./scripts/glm-worker.sh -m glm-5.2 -t 8192`.
- **Context allowed:** screen source files, audit finding one-liners, canon rule excerpts, screen lists. **Not allowed:** founder-personal data, user data, full internal ledgers, credentials.
- **Output required:** unified diffs or markdown tables to `plans/batches/<batch>/glm-*.md`.
- **Verification:** deterministic gates (typecheck, verify-copy, verify-brand) + non-GLM reviewer on every diff; GLM output is evidence until then.
- **Acceptance:** gate-green diffs only; any GLM classification row used in a decision is re-checked by FBL/SON. Rate limit: ≤4 concurrent calls; 15–30s backoff on 529s.

### 7.2 Haiku inventory scout (read-only)
- **Objective:** fast sweeps feeding batch entry/exit evidence: Cia/CIA/SIA counts, purple occurrences, rgb/rgba literals, PaywallLock references, small-target screen lists, asset-slot statuses, W-007 lists.
- **Files:** `balencia-screens/src/**`, `Balencia-New-Screens/**` (read-only).
- **Context allowed:** everything local; no external calls.
- **Output:** count tables with exact file:line paths, into the active batch dir.
- **Verification:** FBL re-runs any count that gates a closure decision.
- **Acceptance:** numbers reproducible by a single grep/rg command quoted in the output.

### 7.3 Sonnet implementation feasibility reviewer
- **Objective:** own R2/R3/R5 mechanics — chrome semantics under the visual-only constraint, decoupled hit-area pattern, PaywallLock component design, verify-script extensions (Cia rule, rgb-literal rule, Title-Case heuristic, harness codification).
- **Files:** `kit/chrome.tsx`, `kit/*.tsx`, target screen files, `scripts/verify-*.mjs`, `evidence/visual-104-pass-strict.json` (schema), COMPONENT-CATALOG.
- **Output:** implemented diffs + per-batch verification log rows.
- **Verification:** CHECK + STRICT + sentinel screenshot diffs.
- **Acceptance:** zero-pixel claims proven by screenshot diff; strict warnings resolved or waived; no new lint/type errors.

### 7.4 Sonnet UX/trust reviewer
- **Objective:** own R4 purple classification review, R6/R7 dependency artifacts, S-01 clinical-safety copy, honesty-state spot audits; protect ambition (rules §6) on WhatsApp/Finance/health/medication/social/voice/photo/AI surfaces.
- **Files:** audit REPORT.md, `balencia_doc/{MODULES-AND-FEATURES,Missing-Features}.md`, COMPACT-CANON §7/§8, target screens.
- **Output:** `purple-checklist.md` verdicts, `DEPENDENCY-MAP.md` + `COMPLIANCE-DEPENDENCY-MATRIX.md`, safety-copy review notes.
- **Verification:** every dep row cites a doc source; every go-live criterion is testable.
- **Acceptance:** zero ambition regressions (diff review); zero launch-ready language.

### 7.5 Asset producer (AST)
- **Objective:** produce the 35 slots per R9 waves using the creative pipeline (Higgsfield MCP generation + manual QA per `Balencia/Balencia-Creatives-Reference/CREATIVE-REFERENCE.md`); never AI-generate or approximate the Balencia logo — official assets from `Balencia/Balencia-Creatives-Reference/logos/` only.
- **Files to read:** `_IMAGE-SLOTS.md` (slot, placement, aspect, style, prompt idea), CREATIVE-REFERENCE.md, target screen for placement context.
- **Output:** assets into `balencia-screens/public/` per slot naming + `R9/asset-review.md` row per asset (privacy checklist: no identifiable faces, no third-party marks, no diagnostic imagery; license/provenance recorded).
- **Verification:** `npm run verify:assets` + FBL/SON-UX visual QA against the slot's style constraint.
- **Acceptance:** every generated asset passes its privacy checklist row before wiring; rejected assets logged, not silently replaced.

### 7.6 Final reviewer (strongest available; independent)
- **Objective:** attack each batch close and the R11 package: missed findings, watered-down fixes, stale evidence, scope creep, false-readiness claims.
- **Files:** batch artifacts, evidence JSONs, screenshots, this plan.
- **Constraint:** must not have authored any diff under review (W-007/A+++ independence rule).
- **Output:** findings list with severity; per-screen W-007 closure verdicts at R11.
- **Acceptance:** R11 certificate signs only when this reviewer files 0 new High/Medium.

---

## 8. Implementation Work Items

Verify shorthand as §4. All items land on `hifi-build`. Sub-batch caps per Forgeflow C4 (10).

| ID | Title | Batch | Screens/files | Acceptance criteria | Verify | Deps |
|---|---|---|---|---|---|---|
| RW-001 | Codify strict-104 harness | R0 | new `scripts/verify-visual-104.mjs`, `package.json` | Baseline reproduces audit summary (104 / 0 issues / 21 warnings) — new checks (visible-name scan, purple counts, interactive-element counts) emit separate JSON fields excluded from issue/warning totals until R1/R4 enforce them; `--screenshots`, `--only` | STRICT diff vs `evidence/visual-104-summary-strict.txt` | — |
| RW-002 | Baseline capture at start SHA + affordance inventory first pass (S-03) | R0 | all 104 + 10 references | Full screenshot set + JSON (incl. per-screen interactive-element counts) stored `remediation-2026-07/R0/` with SHA; inventory findings filed as RW items into R3/R4 | STRICT `--screenshots` + inventory artifact | RW-001 |
| RW-003 | W-007 triage B5b | R0 | 52,53,54,55,58,60,62 | 7 triage files, verdict PASS-triage / FIX-FILED (new RW items) | review files | RW-001 |
| RW-004 | W-007 triage B6 | R0 | 18,30,31,32,33,34,35,36,37,38 | 10 triage files | same | RW-001 |
| RW-005 | W-007 triage B7a | R0 | 39,40,42,46,47,71,82,94,95 | 9 triage files | same | RW-001 |
| RW-006 | W-007 triage B7b (split 10+4) | R0 | 21,22,23,24,25,43,64,67,69,78 · 80,81,85,98 | 14 triage files; triage explicitly non-closing | same | RW-001 |
| RW-007 | Cia casing gate | R1 | `scripts/verify-copy.mjs` | Fails non-`Cia` coach tokens in visible strings/JSX/aria in guarded paths; red on current tree proves detection | `npm run verify:copy` (expected fail pre-rename) | — |
| RW-008 | Canon/docs Cia convergence + authority statement | R1 | COMPACT-CANON §0/§5/§6/§10, COMPONENT-CATALOG note, `balencia-screens/AGENTS.md`, 104 spec files | "Cia never SIA; all-caps CIA banned visible; identifiers exempt"; nav spec `Today · Cia · Missions · Me`; glass-dark authority statement (A24-009) | VAL + diff review | RW-007 |
| RW-009 | Cia rename: auth+cia dirs | R1 | `screens/auth/*` (15), `screens/cia/*` (10) | Visible copy only; typecheck green (no identifier churn) | CHECK | RW-008 |
| RW-010 | Cia rename: domains+health | R1 | `screens/domains/*` (9), `screens/health/*` (20, split ≤10) | same | CHECK | RW-008 |
| RW-011 | Cia rename: intelligence+profile | R1 | `screens/intelligence/*` (8), `screens/profile/*` (15, split) | same | CHECK | RW-008 |
| RW-012 | Cia rename: social+system+today | R1 | `social/*` (10), `system/*` (6), `today/*` (11) — 27 files, split ≤10 per pass (3 passes) | same | CHECK | RW-008 |
| RW-013 | Cia rename: kit + screens.ts + D8 doc closure | R1 | `kit/chrome.tsx` (nav label `CIA`→`Cia`; "Missions" tab label VERIFIED already in code at `chrome.tsx:80` — D8 remaining scope = canon §6 wording + gate coverage), `kit/cia.tsx`, `kit/data.tsx`, `src/data/screens.ts` | verify:copy green repo-wide; STRICT `visibleWrongCaseCiaScreens: []` | CHECK + STRICT (full run — R1's blast radius is repo-wide) | RW-009..012 |
| RW-014 | TopBar back → native button | R2 | `kit/chrome.tsx:46-50` | §5 R2 exact fix; 0 chrome strict warnings | CHECK + STRICT + sentinels | RW-013 |
| RW-015 | Nav tabs → buttons + aria-current | R2 | `kit/chrome.tsx:88-110` | same | same | RW-013 |
| RW-016 | FloatingQuickLog → single button | R2 | `kit/chrome.tsx:112-121` | same + 19 consumer screens spot-diffed | same | RW-013 |
| RW-017 | Kit SegmentedControl + adoption | R3 | 39,41,45,49,51,90,93,97 | Decoupled hit-area ≥44px; small-target warnings on these = 0; screenshots unchanged | CHECK + STRICT | RW-014..016 |
| RW-018 | Text-link + icon-action hit areas | R3 | 15,22,23,30,34,60,81 | same | same | RW-014..016 |
| RW-019 | Native checkbox/switch semantics | R3 | 03c,04,57,61 | Non-native-role warnings = 0 | same | RW-014..016 |
| RW-020 | Truncation waivers | R0 | 40, 80 → `WAIVERS.md` | W-TRUNC-40/80 with rationale; no code change (only dep is the harness — lands with the baseline) | STRICT + waiver file | RW-001 |
| RW-021 | Purple classification | R4 | 51 hifi files, 156 uses | `purple-checklist.md`: 156/156 rows bucketed | checklist artifact | — |
| RW-022 | Purple violation fixes | R4 | S60 (×8), S54 (×5), + RW-021 findings ≤10 screens | 0 open VIOLATION rows; ≤2 purple/screen; Cia-insight screens keep ≥1 | CHECK + STRICT + checklist | RW-021, RW-017..019 |
| RW-023 | rgb-literal + className arbitrary-value gate | R4 | `scripts/verify-brand.mjs` | Any off-allowlist rgb()/rgba()/arbitrary color value fails (covers S-07); red on S67/S71 pre-fix | `npm run verify:brand` | — |
| RW-024 | Off-token orange fix | R4 | `S67ImageViewer.tsx:9,39`, `S71AchievementGallery.tsx:113,125` | Token equivalents; gate green | CHECK + screenshots | RW-023 |
| RW-025 | S60 safety + honesty + affordance fixes (S-01, S-02, S-03 hits) | R4 | `S60MedicationTracking.tsx` + spec 60 (+ affordance fixes filed by RW-002 inventory, ≤10 screens or split) | Neutral demo med; no adherence-minimizing copy; adherence section = 3-state per canon §7; dose rows + inventoried bare-div affordances get native/inert-native semantics | CHECK + STRICT(60) + SON-UX safety note | RW-018, RW-002 |
| RW-026 | Copy-case sweep + gate (S-04) + S-05 + S-08 | R4 | verify-copy heuristic; S30, S98 + sweep hits (if >10 screens hit, split into ≤10-screen waves) | Sentence case per canon §5; provenance idiom fixed; Provenance component used only for sources | CHECK | RW-007 |
| RW-027 | PaywallLock component + S43 anchor | R5 | new `kit/paywall.tsx`, `kit/index.ts`, `S43Paywall.tsx` | Matches catalog §6 line-by-line; fullscreen+inline variants | CHECK + STRICT(43) + screenshots | RW-022 |
| RW-028 | PaywallLock adoption wave 1 | R5 | S15,S22,S27,S32,S47,S59,S63,S71,S90 (9) | No ad-hoc lock treatments remain; never-hide proven by screenshots | CHECK + STRICT | RW-027 |
| RW-029 | PaywallLock adoption wave 2 | R5 | S83,S92,S93,S97 + `profile/index.ts` (5) | same + residual-gating grep = 0 | same | RW-027 |
| RW-030 | Compliance dependency matrix | R7 | `COMPLIANCE-DEPENDENCY-MATRIX.md`; screens 20,30,31,51,72,78,84,86,99,98,29,10,11,79 + **96 (integrations: Apple Health/Garmin/Oura not ready) + proactive-coaching surfaces** — dimension 6 covers every depicted-unbuilt capability, not just A24-flagged ones | ≥16 rows, each citing doc source | VAL | RW-008 |
| RW-031 | DEPENDENCY-MAP + spec footers + shell badges | R6 | `DEPENDENCY-MAP.md`, spec footers (03e,99,30,31 + matrix screens), `screens.ts` `deps:` field, shell badge (outside frame) | Every A24-005/006/007/012/013/014 screen has ≥1 dep row; testable go-live criteria; git diff shows no in-frame .tsx ambition change | VAL + git-diff scope check + badge render check | RW-030 |
| RW-032 | DocIntel state additions | R8 | `S20CiaMemory.tsx`, `S72KnowledgeGraph.tsx` (+S68 eval), specs 20/72 | States render; canon §7/§8 patterns; no new screens | CHECK + STRICT(20,72,68) + VAL | RW-028/029, RW-031 |
| RW-033 | Assets wave P0 privacy | R9 | slots HIFI-90,49,67,10,26,27,70,55,29,53,86 (67 lifted to P0 per audit P0 table) | Privacy checklist signed per asset; license recorded | `verify:assets` + review log | wiring after RW-029 |
| RW-034 | Assets wave P1 + first impression | R9 | HIFI-87,88,91,75,83,03e,99 then 01,02,03d,09,50,12 | same; official logo only | same | RW-033 |
| RW-034b | Remainder slot disposition | R9 | all remaining `_IMAGE-SLOTS.md` rows not covered by RW-033/034 | Every remaining slot explicitly dispositioned: produced OR founder-waiver drafted by slot ID (dimension 8 covers all 35 — nothing left implicit) | `_IMAGE-SLOTS.md` status column complete | RW-034 |
| RW-035 | Figma Tier A or waiver + A24-018 | R10 | `figma-build-audit/`, `figma-tokens-map.json`, `DomainDashboardHeader.figma.tsx` | MCP artifacts stored OR W-FIGMA-TIER waiver; lint 0 warnings | `figma:check` + auditor report + lint | RW-024 |
| RW-036 | Legacy /tabs/sia quarantine | RQ | `scripts/verify-visual.mjs`, new `verify:legacy`, `src/app/tabs/sia/LEGACY-README.md` | sia routes out of package evidence; README present; no renames | `npm run verify:visual` (package list) + `verify:legacy` | RW-013 |
| RW-037 | Affordance inventory (S-03) | R11 | 19 flagged screens + chrome | Manual checklist: no visually-interactive bare div/span | inventory artifact | RW-017..019 |
| RW-038 | Final sweep, W-007 closure, re-grade, handoff packet | R11 | all gates; `W007-CLOSURE.md`, `HANDOFF-PACKET.md`, `WAIVERS.md`, REPORT.md addendum, coverage-matrix regen | All gates green at ONE SHA; independent re-audit 0 new High/Med; 40/40 closure verdicts; reference-regression clean per expected-change lists; **plus the three dimension audits nobody else owns (owner IND): glass-tier 20-screen spot audit (dim 2), honesty-state 20-screen spot audit incl. 30/31/03e/99/98 (dim 6), handoff dry-run Q&A with a project-unfamiliar engineer (dim 10)**; certificate with scope sentence | full stack (§9) + three audit artifacts | all |

---

## 9. Verification Plan

| Gate | Command | Cadence |
|---|---|---|
| Deterministic stack | `npm run check` (lint, typecheck, routes, assets, copy, brand — from `balencia-screens/`) | Every code batch |
| Spec/ledger validation | `node Balencia-New-Screens/work/validate-redesign.mjs --json` (repo root) — expect `ledgerRows:104, ledgerPass:104, screenFiles:104` | Batches touching specs/ledger + final |
| Strict-104 harness | `npm run dev -- --port 3001` (bg) → `node scripts/verify-visual-104.mjs --strict --out <evidence>` | Full run after **R1** (repo-wide copy blast radius), R2, R3, R4, R5, **R6** (`screens.ts` deps field + shell badge touch all screens), R8, R9-wiring; `--only` smoke runs inside batches |
| Built-in visual (legacy) | `npm run verify:visual` (~34 routes after RQ removes the 7 sia routes) | R11 |
| Sentinel pixel diff | harness `--screenshots` on 01, 09, 12, 17, 26, 43 vs prior batch | R2, R3, R5 (every zero-pixel claim) |
| Cia sweep | verify-copy Cia rule + STRICT visible-name scan + grep at final SHA across canon/scripts/screens | R1 close + R11 |
| Purple semantic sweep | `purple-checklist.md` (human) + harness purple-count assist (>2/screen warns) | R4 close + re-verify touched files at R11 |
| Hardcoded-color sweep | extended `verify:brand` (rgb/rgba/className arbitrary values vs allowlist) | Every code batch from R4 |
| Touch-target/a11y sweep | STRICT small-target + role checks + affordance inventory (S-03) | R3 close + R11 |
| W-007 review | R0 triage files → R11 `W007-CLOSURE.md` (independent, per-screen, final SHA) | R0 + R11 |
| Asset slot review | `verify:assets` + per-asset privacy checklist + `_IMAGE-SLOTS.md` status column | R9 + R11 |
| Figma | `npm run figma:check` + `/figma-build-auditor` MCP artifacts | R10 |
| Glass-tier spot audit | 20-screen manual audit vs COMPACT-CANON §2 (dim 2) | R11, owner IND |
| Honesty-state spot audit | 20-screen manual audit vs canon §7 incl. 30/31/03e/99/98 (dim 6) | R11, owner IND |
| Handoff dry-run | Project-unfamiliar engineer answers build/blocker questions from packet alone (dim 10) | R11, owner IND |
| Final matrix update | Regenerate `SCREEN-COVERAGE-MATRIX.md`; REPORT.md addendum with re-grade | R11 |

Evidence root: `Balencia-New-Screens/build-progress/remediation-2026-07/` (`R0/…R11/`, `REMEDIATION-LEDGER.md`, `WAIVERS.md`). Every artifact embeds its generation SHA; scanner config pinned + hashed; R11 rejects any artifact whose SHA ≠ HEAD.

**Grade ladder mapping:** A24-001 stays formally open until R11 (its closure evidence must be at final SHA), so grades before R11 are **provisional with the named A24-001 waiver**: provisional A− once A24-002..006 close (requires R1+R2+R3+R4+R5+R6 — R4 depends on R3 items and RW-026 on the R1 gate, so the Highs cannot close out of order) → provisional A after R7+R8 (Mediums) → provisional A+ after R9+R10 → A++ at R11 first pass (all dims incl. A24-001 closure, fresh evidence, one SHA) → A+++ at R11 close (independent re-audit + packet + zero unwaivered findings).

---

## 10. Development Handoff Definition

Development starts only when ALL of the following exist in `HANDOFF-PACKET.md` (+ linked artifacts):

1. **Final screen list** — 104 screens with per-screen disposition. The 3 source-only screens (34 Spirituality, 54 Meditation, 60 Medication) are stated as: "no legacy route exists; the hifi screen is the only visual truth; production IA placement is a build-time decision with a named owner." The ~33 review-route-only screens: "designed and final; route creation is build scope, not design debt."
2. **Final route/source mapping** — hifi route ↔ production route truth ↔ spec file ↔ source, regenerated coverage matrix.
3. **Final design-system decisions** — canon authority statement (glass-dark v1; `Balencia-New-Screens/canon/` wins), token map, PaywallLock pattern, SegmentedControl pattern, chrome semantics.
4. **Final Cia naming convention** — visible copy = `Cia`; code identifiers exempt (`CIA*`/`Cia*` legal); legacy `/tabs/sia/*` quarantined reference-only; enforcement = verify-copy rule + strict scan.
5. **Open backend dependency notes** — `DEPENDENCY-MAP.md` with testable go-live criteria per DEP; compliance matrix; the "Design-final. Build-blocked by: DEP-…" statuses.
6. **Asset backlog status** — per-slot produced/waived state, provenance manifest, remaining P2 backlog.
7. **Verification evidence** — full gate stack at the final SHA, screenshots, W007-CLOSURE, re-grade.
8. **Known waivers** — `WAIVERS.md`: only founder-signed scope exclusions (candidates: W-FIGMA-TIER, W-TRUNC-40/80, asset P2, W-TT-49 if spacing-constrained).

---

## 11. Next Implementation Prompt (use after this plan is approved)

```text
You are Fable acting as remediation orchestrator for Balencia, executing batch R0 of
Balencia-New-Screens/build-progress/audit-2026-07-08/REMEDIATION-PLAN.md (approved).

Workspace: /Users/hamza/Desktop/balencia-design   Branch: hifi-build

Read first: REMEDIATION-PLAN.md (whole), audit REPORT.md, BUILD-LEDGER.md W-007 rows,
Balencia-New-Screens/build-progress/audit-2026-07-08/evidence/visual-104-pass-strict.json
(schema), balencia-screens/AGENTS.md, canon/COMPACT-CANON.md.

Method: Forgeflow. /runtime-profiles then /start-batch (R0-evidence-reset). Loop: /goal —
"R0 complete: harness codified, baseline + affordance inventory captured, 40/40 triage
verdicts filed, W-TRUNC-40/80 waivers written".

Scope (work items RW-001, RW-002, RW-003..006, RW-020):
1. RW-001: create balencia-screens/scripts/verify-visual-104.mjs + verify:visual104 npm script,
   schema-compatible with the strict evidence JSON above; core checks: phone frame, console
   errors, <44px targets, non-native roles, overflow. New instrumentation (visible
   SIA/wrong-case-CIA scan, purple counts, per-screen interactive-element counts) goes in
   SEPARATE JSON fields excluded from issue/warning totals until R1/R4 enforce them.
   Flags --strict --screenshots --only <ids> --out <path>; screen list from src/data/screens.ts.
   Acceptance: baseline run reproduces audit summary (104 screens / 0 issues / 21 warnings).
2. RW-002: baseline run + full screenshots + affordance-inventory first pass (S-03: manual
   sweep for visually-interactive bare div/span, starting with the 19 strict-flagged screens
   + chrome) at current SHA →
   Balencia-New-Screens/build-progress/remediation-2026-07/R0/ (record SHA inside artifacts);
   inventory findings filed as new RW items targeted at R3/R4.
3. RW-003..006: independent W-007 TRIAGE of the 40 screens (sub-batches 7/10/9/10+4).
   Reviewer independence: use fresh reviewer subagents (sonnet), never the build orchestrator's
   prior output as verdict; GLM is not a review authority. Verdicts: PASS-triage or FIX-FILED
   (file new RW items with screen, defect, severity). Triage does NOT close W-007 — closure
   happens at R11 on final-SHA evidence.
4. RW-020: write W-TRUNC-40/80 waivers into remediation-2026-07/WAIVERS.md with rationale.

Constraints: no screen edits in R0. No-water-down rules §6 of the plan are binding. 104-count
gate at close. npm run check must stay green.

Close: /verify (gates above) → /close-batch → update REMEDIATION-LEDGER.md + _MASTER-LEDGER note
→ /handoff naming R1 (Cia convergence, work items RW-007..013 + D8 nav "Missions") as the next
batch with its canon-first ordering rule.
```

---

*Cross-references: approved session plan `~/.claude/plans/fable-prompt-harmonic-wigderson.md` · batch artifact `plans/batches/REMEDIATION-PLANNING-2026-07-08/batch.md` · GLM cross-check `plans/batches/REMEDIATION-PLANNING-2026-07-08/glm-crosscheck.md`.*
