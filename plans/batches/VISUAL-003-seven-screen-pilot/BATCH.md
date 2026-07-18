# VISUAL-003 — Shared foundation and seven-screen pilot

- Status: `closed with waivers 2026-07-10 — Sol accepted seven-screen pilot; bounded family rollout open`
- Theme: Implement and independently verify the accepted Quiet orbit / burnished ember direction across the shared foundation and pilot screens `03,07,11,12,26,43,80`.
- Session cap: 5 bounded items
- Build gate this batch: yes — shared foundation and representative pilot
- Active lane: `Balencia visual prototype finalization`
- Active root: `balencia-screens/`
- Source links: `VISUAL-001/REFERENCE-DIRECTION.md`; `VISUAL-001/{IMPLEMENTATION-PLAN,FINDINGS-ADDENDUM,DECISIONS}.md`; seven current hifi specs; A1/A2/B1/C1/F1/D2/I1 audits; current canon and live kit.
- Tie-breaker: latest user direction → active decisions/reference contract → live route/code for operational truth → current hifi specs for intended content/state → current canon/kit for system truth.
- Archived-source rule: retired light-shell, old `Cia`/`SIA`, old routes, and historic B+/84 evidence cannot override current warm-dark/all-caps `CIA` direction.
- Handoff status: `READY WITH WAIVERS` for the first bounded family rollout
- Pre-development doc gate: `READY WITH WAIVERS`
- Documentation evidence path: `plans/batches/VISUAL-003-seven-screen-pilot/evidence/`
- Goal lifecycle: `/goal` active for the complete 104-screen visual-finalization outcome; this batch is one bounded checkpoint
- Execution mode: `multi-agent`
- Wait policy: `monitor` for the local server only (5-second cadence, 2-minute readiness timeout)
- Legacy loop primitive: `n/a`
- Runtime profile: `codex-native`
- Model-routing policy: `gpt56-tiered`
- Orchestrator role: Codex root / Sol is sole shared-file writer and acceptor
- Orchestrator model / effort: project requests `gpt-5.6-sol` / `ultra`; actual current-thread model/effort is not exposed
- Worker backend: native Codex collaboration agents
- Provider: Codex
- Model: requested Terra implementation/review route; exact spawned model is not selectable or exposed
- Worker agent type / model / effort: implementation worker / requested `gpt-5.6-terra` / high
- Endpoint class: native
- Worker task packets: `workers/auth-voice.md`, `workers/today-health.md`, `workers/commercial-media.md`, `workers/independent-design-review.md`, `workers/independent-accessibility-review.md`
- Worker output path: `evidence/worker-*.md`
- Saved workflow: n/a
- Usage guard: maximum three workers plus root; depth one; one run per packet; no recursive fan-out
- Verify command: `npm run check`; `npm run build`; targeted strict 7-screen capture; strict 14-screen foundation capture; pilot/foundation interaction verifiers; state capture; root redesign validator; diff checks
- Closeout writes: this batch, worker evidence, VISUAL-001 decisions/status evidence, remediation ledger, and `plans/next-session-handoff.md`

## Pre-development gate

- [x] Root/lane guidance, handoff, source hierarchy, current canon, seven specs, seven family audits, open findings, drift, waivers, and reference contract read.
- [x] Active versus archived sources and tie-breaker are explicit.
- [x] The batch is not Blueprint-backed; no `BUILD_READY` marker or traceability matrix is required.
- [x] Verification matrix and deterministic commands are recorded before code changes.
- [x] Installed Next.js 16 Server/Client Component and accessibility guides were read before framework-sensitive edits.
- [x] No Framer Motion skill was exposed in this session. The accepted CIA motion therefore remains a narrow client SVG/CSS island with explicit reduced-motion and page-visibility behavior; no motion dependency was added.
- [x] Shared files are Sol-owned; three worker packets have disjoint screen-file ownership.
- [x] Worker availability is confirmed by the native collaboration runtime; exact spawned model/effort is not exposed and is not falsely claimed.
- [x] Dirty worktree is understood; no commit, stage, reset, stash, clean, deploy, Figma write, Railway change, or `yhealth-app` edit is authorized.
- [x] Gate result: `READY WITH WAIVERS`.

Waivers:

| Owner | Limited evidence | Next action | Closure condition | Why implementation may proceed |
|---|---|---|---|---|
| Sol | Current/spawned model and effort provenance not exposed | Record requested profile, runtime agent ID/status, packet, and output | Tool surface exposes exact provenance or limitation remains explicit | File ownership, source checking, deterministic verification, and Sol acceptance remain available |
| Sol | Root founding brief and root `_progress.md` are absent | Use root/lane guidance and the remediation ledger as active project/status authority | Ledger, batch, evidence, and handoff remain mutually consistent | This is an existing remediation lane, not a new product-definition effort |
| R11 owner | Manual VoiceOver/TalkBack, device enlarged-text and broad Axe evidence are unavailable in this desktop prototype batch | Preserve semantic/keyboard/contrast evidence now; run the device/automated accessibility gates at final closure | Device AT/enlarged-text and AXE-01 evidence is recorded or explicitly release-waived | These missing external gates do not invalidate the visual-prototype pilot, but prevent a production-readiness claim |

## Items

| Item | Locator | Owner | Evidence | Status |
|---|---|---|---|---|
| PILOT-01 CTA/text/focus/motion foundation | globals + buttons/chrome | Sol | contrast matrix, scoped diff, screenshots | completed |
| PILOT-02 CIA orb and signature-icon foundation | CIA kit + signature registry | Sol | compact/hero/reduced-motion captures | completed |
| PILOT-03 Life Power and PaywallLock foundations | data/paywall kit | Sol | formula assertions + screens 12/43 | completed |
| PILOT-04 Seven disjoint screen integrations | 03,07,11,12,26,43,80 | three Terra workers; Sol verifies | worker evidence + before/after | completed |
| PILOT-05 Deterministic and independent acceptance | all changed routes + sentinels | independent reviewers + Sol | verification log and decision | completed |

## Stop conditions

- Any worker touches a shared or unlisted file.
- Source conflict cannot be resolved by the recorded hierarchy.
- A pilot route loses visible product ambition or a safety/privacy/exit path.
- `npm run check` or targeted strict capture finds an unwaived pilot High/Critical regression.
- Browser evidence cannot be obtained and no exact accountable waiver is recorded.
- Work would require Figma, Railway, API/auth/backend, production data, or `yhealth-app` changes.

## Closeout

- Sol decision: **ACCEPT**. `evidence/PILOT-COVERAGE.md` is the route-by-route coverage record.
- `npm run check`: PASS; one pre-existing unused-import warning, zero errors.
- `npm run build`: PASS; 200/200 static pages after the `/tabs/today` Suspense repair.
- Targeted strict final (`2026-07-10T06:40:33.815Z`): 7/7, 0 issues, 0 warnings, no missing frame/legacy SIA/console-error screen.
- Foundation strict final (`2026-07-10T06:40:52.091Z`): 14/14, 0 issues, 0 warnings.
- `verify-pilot-seven.mjs` final durable artifact (`2026-07-10T06:40:10.701Z`): PASS 7/7, including S03 default/loading/error and S07 composer/consent/focus-area behavior, with zero console/page errors.
- `verify-foundation-sentinels.mjs` final durable artifact (`2026-07-10T06:35:05.002Z`): PASS all eight contracts, including reduced-motion transitions, active-animation pause/resume, S45 native slider focus/math, Life Power, paywall ethics and the privacy-safe ConsentRail default.
- Independent visual/design: ACCEPT after original-detail inspection of every refreshed state capture; 0 open Critical/High/Medium.
- Independent accessibility/trust: ACCEPT after measured S07/S80 microtext repair; 0 open Critical/High/Medium.
- Independent foundation contract: ACCEPT after restoring the privacy-safe ConsentRail default; no PF-01…PF-06 blocker.
- Review repairs closed before acceptance: S03 truthful local loading/error states; S07/S11 input focus; S07 44px/16px operable composer, disabled unavailable attachment and stateful focus consent; S07/S80 AA microtext; S07 composer clearance; S45 native slider focus/range mapping; privacy-safe ConsentRail default; HIFI-26 UI-like overlay; stable forced-repaint Quick Log/orb-grid/focus/pressed/provider evidence.
- Browser-launch limitation closed by approved local Chrome evidence. Runtime model provenance, manual device AT/enlarged-text, broad Axe and final one-SHA 104-screen capture remain explicitly bounded downstream evidence limits.
- No commit, stage, reset, stash, clean, push, deploy, Figma write, backend/provider/billing mutation or `yhealth-app` edit occurred.

## Completion gate

- [x] Shared CTA, orb, signature icons, Life Power and PaywallLock contracts are implemented and source-checked.
- [x] All seven pilot screens meet their listed proof obligations.
- [x] Worker packets and outputs are reviewed; all accepted worker edits stay packet-scoped.
- [x] `npm run check` passes.
- [x] Targeted seven-screen strict screenshots and manual 390×844 review pass.
- [x] Focus, touch, text contrast, reduced motion, state honesty and official-logo checks pass; manual device AT/enlarged-text remains a named downstream evidence limit.
- [x] No unwaived pilot High/Critical finding remains.
- [x] Sol records pilot acceptance and opens only the bounded A1 rollout wave.
- [x] Remediation ledger and next-session handoff are updated with one exact next slice.
