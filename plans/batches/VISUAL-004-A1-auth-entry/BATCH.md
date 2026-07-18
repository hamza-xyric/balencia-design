# VISUAL-004 — A1 Auth / Entry family

- Status: `closed with waivers 2026-07-10 — Sol accepted`
- Theme: Apply the accepted Quiet orbit / burnished ember foundation to A1 screens `01,02,03b,03c,03d,03e,04`; verify accepted pilot screen `03` unchanged.
- Session cap: 6 bounded items
- Build gate this batch: yes — first family after the foundation
- Active lane: `Balencia visual prototype finalization`
- Active root: `balencia-screens/`
- Source links: `VISUAL-001/audit/A1-auth-entry.md`; `VISUAL-001/{DECISIONS,REFERENCE-DIRECTION,IMPLEMENTATION-PLAN,FINDINGS-ADDENDUM}.md`; current hifi specs `01,02,03b,03c,03d,03e,04`; current canon/catalog; live locked foundation.
- Tie-breaker: latest user direction → DVF decisions/reference direction → live code for operational truth → current hifi specs for intended content/state → canon/catalog.
- Archived-source rule: retired light-shell/Figma-exception language, old `Cia`/`SIA`, old routes and historical B+/84 evidence cannot override DVF-01 warm-dark or DVF-07 all-caps `CIA`.
- Handoff status: `READY WITH WAIVERS` for A2 only; A1 is closed
- Pre-development doc gate: `READY WITH WAIVERS`
- Documentation evidence path: `plans/batches/VISUAL-004-A1-auth-entry/evidence/`
- Goal lifecycle: `/goal` — active 104-screen visual-finalization outcome
- Execution mode: `multi-agent`
- Wait policy: `monitor` only for local port-3001 readiness, 5-second cadence, 2-minute maximum
- Legacy loop primitive: `n/a`
- Runtime profile: `codex-native`
- Model-routing policy: `gpt56-tiered`
- Orchestrator role: Codex root / Sol; sole shared-file, verifier, ledger and handoff writer
- Orchestrator model / effort: project requests `gpt-5.6-sol` / `ultra`; exact current runtime provenance is not exposed
- Worker backend: native Codex collaboration agents
- Provider / endpoint: Codex / native
- Worker agent type / model / effort: implementation worker / requested `gpt-5.6-terra` (exact runtime model unexposed) / high
- Worker task packets: `workers/builder-a.md`, `workers/builder-b.md`; reviewer packet follows after integration
- Worker output paths: `evidence/worker-builder-a.md`, `evidence/worker-builder-b.md`
- Saved workflow: `n/a`
- Usage guard: root + at most two disjoint builders; one independent reviewer after integration; depth one; no parallel shared writes
- Verify commands: `npm run check`; `npm run build`; strict `--only 01,02,03,03b,03c,03d,03e,04`; `verify-a1-auth.mjs`; root validator; diff checks
- Closeout writes: this batch, evidence, remediation ledger, implementation status, and `plans/next-session-handoff.md`

## Pre-development gate

- [x] Root/lane guidance, current handoff, active DVF decisions/reference direction, A1 audit, seven current specs and canon/catalog read.
- [x] Active versus archived sources and tie-breaker are explicit; DVF-01 resolves stale warm-light auth exceptions in favor of warm-dark.
- [x] A1 is not Blueprint-backed; no `BUILD_READY` marker or Blueprint traceability matrix is required.
- [x] Every target route/file exists; accepted S03 is verification-only.
- [x] Deterministic code, build, strict visual, interaction/state, validator and diff gates are recorded before implementation.
- [x] Runtime intake fields, usage guard, worker packets/output paths and serialized shared ownership are recorded.
- [x] Builder packets have disjoint allowed files and deny shared kit/tokens/docs/ledger/handoff edits.
- [x] Existing dirty worktree and forbidden `yhealth-app` submodule are understood and preserved.
- [x] Gate result: `READY WITH WAIVERS`.

Waivers:

| Owner | Gap | Blocked work | Next action | Closure condition | Why A1 may proceed |
|---|---|---|---|---|---|
| Sol | Exact spawned model/effort is not exposed | provenance-perfect worker record | Record requested role, runtime agent ID, packet, output and root verification | runtime exposes exact provenance or limitation remains explicit | file ownership and deterministic/root review remain available |
| R11 owner | Device AT/enlarged-text and broad Axe are unavailable here | final certificate/production-readiness only | Preserve semantic/keyboard checks; run external gates at R11 | durable results or explicit release waiver | family prototype acceptance does not claim production readiness |
| Sol | Root founding brief and `_progress.md` are absent | canonical framework progress artifact | Use remediation ledger + batch + handoff as status set | artifacts added or project retains waiver | existing remediation lane has current authority and evidence |

## Scope and ownership

| Item | Locator | Owner | Required proof | Status |
|---|---|---|---|---|
| A1-01 brand entry | `S01Splash.tsx`, `S02MotionCarousel.tsx` | Builder A | official asset, four operable panels, reduced motion, full-width AA CTA | completed |
| A1-02 OTP security gate | `S03bOtpVerification.tsx` | Builder A + Sol repair | native OTP/paste/backspace, cooldown honesty/expiry/announcement, loading/error/rate-limit states | completed |
| A1-03 legal consent gate | `S03cConsent.tsx` | Builder A + Sol repair | native unchecked required consent, distinct policy links, optional marketing off, gate/stale-state logic | completed |
| A1-04 profile/channel choice | `S03dCompleteProfile.tsx`, `S03eWhatsappEnrollment.tsx` | Builder B + Sol repair | native fields/pickers/phone/OTP; explicit reversible consent; honest unavailable-provider state; no clipping | completed |
| A1-05 returning sign-in | `S04SignIn.tsx` | Builder B + Sol repair | native auth controls; remember off; truthful separate default/offline/429/error/loading states; equal exits | completed |
| A1-06 integration and acceptance | routes `01,02,03,03b,03c,03d,03e,04` | Sol + three independent reviewers | check/build, strict 8/8, state interaction suite, current PNGs, no unwaived High/Critical/Medium | completed |

## Acceptance details

- S01 uses an official logo/lockup asset only, exposes one concise `Balencia. Loading.` status, and keeps the reveal decorative/reduced-motion safe.
- S02 implements all four panels as real local UI state with slide announcement, Skip and one full-width Next/Get started action. Example/demo claims are labelled and no reference-board raster is shipped.
- S03 remains unchanged except if a proven shared-root regression requires serialized Sol repair.
- S03b uses a native accessible OTP model, disables resend during cooldown, preserves values offline, and proves default/partial/loading/invalid/expired/rate-limited/resend-success states without account enumeration.
- S03c begins at 0/2; native required checkboxes and optional marketing switch are keyboard/screen-reader operable; policy reading is a distinct link/sheet action; Continue remains disabled until both required consents are explicit.
- S03d distinguishes optional/null choices from selection, matches provenance to source, keeps Save/Skip reachable, and exposes full privacy controls without implying social sharing.
- S03e is optional and provider-neutral: no WhatsApp logo or launch-ready claim, explicit opt-in before collection, equally operable skip, native phone/OTP, clear STOP/revoke/delete, and honest prototype/unavailable feedback.
- S04 default does not conflate offline, wrong-credentials and rate-limit states. Native fields, reveal, remember, forgot/sign-up/guest/support and social actions are operable with 44px targets; CTA is full-width and width-locked while loading.
- All new interactive inputs use at least 16px text, visible authored focus and non-color state copy. Tiny semantic copy reaches AA; no raw orange+paper action pair is introduced.

## Verification matrix

See `VERIFICATION-MATRIX.md`. Canonical evidence paths:

- `evidence/a1-after.json` and `evidence/after/`
- `evidence/a1-interactions.json` and `evidence/states/`
- `evidence/worker-builder-{a,b}.md`
- `evidence/review-design-accessibility.md`

## Stop conditions

- Any builder touches an unlisted/shared file, S03, docs, ledger, handoff, `yhealth-app`, Figma, Railway, backend/API/auth services, production data or generated logo.
- A source conflict is not resolved by the recorded hierarchy.
- A screen implies real provider/auth/biometric/offline capability that the visual prototype cannot establish.
- Required consent is preselected, decline is less operable, or account-enumeration/security copy appears.
- `npm run check`, build, strict capture or interaction verifier fails and cannot be repaired within this batch.
- Another family begins before A1 independent acceptance.

## Completion gate

- [x] Both worker outputs reviewed against their packets; edits remained disjoint and in scope until serialized Sol integration.
- [x] Every A1 finding is closed, dispositioned by exact code-native asset slot, or explicitly waived with owner/trigger.
- [x] `npm run check` and `npm run build` pass.
- [x] Strict A1 capture is 8/8 with zero issues/warnings, missing frames and console errors.
- [x] A1 interaction/state verifier passes native control, consent, cooldown/expiry, offline/rate-limit separation, contrast, focus, target, swipe, paste/Backspace and reduced-motion assertions.
- [x] Current default and 42 isolated exercised-state PNGs pass independent code, design/source and accessibility/trust review.
- [x] Accepted pilot S03 remains conformant.
- [x] Root validator and diff checks pass; forbidden submodule state is preserved.
- [x] Sol accepted A1 and serialized the remediation ledger, implementation plan, DVF decision and next handoff with exactly one next slice: A2.

## Closeout outcome

Sol accepts A1 at the visual-prototype family bar. Final evidence is `8/8` strict with no issues/warnings and an eight-group interaction suite with nine isolated OTP fixtures, 42 state/focus captures and no console/page errors. Three independent reviewers accepted after their timer provenance/expiry, screenshot replay/isolation, provider-feedback, picker/provenance, copy/swipe, live-announcement and evidence-framing findings were repaired. `HIFI-02-01`, `HIFI-03d-01` and `HIFI-03e-01` have explicit code-native dispositions in `evidence/ASSET-DISPOSITION.md`.

Residual waivers are evidence limits only: exact spawned runtime provenance, device AT/enlarged text, broad Axe and the final immutable one-SHA 104-screen capture. They do not waive a known A1 product defect. The durable goal remains active; only A2 may start next.
