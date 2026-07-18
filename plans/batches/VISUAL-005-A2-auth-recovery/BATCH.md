# VISUAL-005 — A2 Auth recovery / onboarding / system permission

- Status: `closed with waivers 2026-07-10 — Sol accepted`
- Theme: apply the accepted Quiet orbit / burnished ember foundation to A2 screens `05,05b,06,08,65,66`; verify accepted pilot screen `07` unchanged.
- Session cap: 6 bounded items
- Build gate this batch: yes
- Active lane/root: `Balencia visual prototype finalization` / `balencia-screens/`
- Source links: `VISUAL-001/audit/A2-auth-recovery-onboarding.md`; DVF decisions/reference direction; current specs `05,05b,06,07,08,65,66`; canon/catalog; live accepted foundation.
- Tie-breaker: latest user direction → DVF decisions/reference direction → live code for operational truth → current spec content/state → canon/catalog.
- Conflict lock: DVF-01 warm-dark overrides stale warm-light/Figma-exception language; DVF-07 all-caps `CIA` overrides stale `Cia` audit/spec acceptance; accepted S07 is verification-only.
- Handoff target: `READY WITH WAIVERS` for B1 only; A2 is closed
- Pre-development gate: `READY WITH WAIVERS`
- Evidence path: `plans/batches/VISUAL-005-A2-auth-recovery/evidence/`
- Goal lifecycle: active durable `/goal` for all 104 screens
- Execution mode: `multi-agent`
- Wait policy: `monitor` only for local port-3001 readiness, 5-second cadence, 2-minute maximum
- Runtime profile: `codex-native`
- Model routing: `gpt56-tiered`; Sol/root integrates and accepts, Terra-class workers implement disjoint files, independent reviewers remain read-only
- Exact runtime model/effort: unexposed; requested roles, agent IDs, packets, outputs and Sol verification are recorded
- Worker packets: `workers/builder-a.md`, `workers/builder-b.md`
- Verify commands: full check/build; strict seven-route capture; dedicated A2 state verifier; root validator; root/submodule diff checks
- Closeout writes: this batch, verification/review evidence, DVF decision, remediation ledger, implementation plan and exactly-one-next-slice handoff

## Pre-development gate

- [x] Root/lane guidance, current A1 handoff/closeout, DVF decisions/reference direction, full A2 audit, seven current specs and canon/catalog read.
- [x] Active versus stale source conflicts are resolved by DVF-01 and DVF-07; no light-shell or `Cia` fork is permitted.
- [x] A2 is not Blueprint-backed; no `BUILD_READY` or Blueprint matrix is required.
- [x] All target modules/routes exist; accepted S07 is read-only unless Sol proves a shared regression.
- [x] Current shared `GlassPillInput`, actions, CIA orb/composer and HifiShell are read-only accepted APIs; no shared repair is pre-authorized.
- [x] Code/build/strict/state/validator/diff gates are recorded before implementation.
- [x] Worker ownership is disjoint; shared files/docs/verifiers/ledger/handoff remain serialized through Sol.
- [x] Existing dirty worktree and forbidden `yhealth-app` submodule are preserved.
- [x] Gate result: `READY WITH WAIVERS`.

Waivers are evidence-only: exact runtime provenance; device AT/enlarged-text; broad Axe; root founding brief/`_progress.md`; final immutable one-SHA 104-screen capture.

## Scope

| Item | Files/routes | Owner | Required proof | Status |
|---|---|---|---|---|
| A2-01 recovery request | `S05ForgotPassword.tsx` | Builder A + Sol repair | native email, mutually exclusive request/success/error/offline/cooldown, masked enumeration-safe copy, real local timer | completed |
| A2-02 reset token | `S05bResetPassword.tsx` | Builder A + Sol repair | native passwords/reveal/rules/match, honest missing/invalid/expired/rate-limit/offline/loading/success states | completed |
| A2-03 guest preview | `S06GuestModePreview.tsx` | Builder A | native name, nine 44px buttons, 1–3 cap/error, persistent CTA, illustrative provenance | completed |
| A2-04 plan truth | `S08InitialPlanSummary.tsx` | Builder B + Sol repair | one payload drives day-one/current marker/date/aria truth; operable local edit/customize states | completed |
| A2-05 force update | `S65ForceUpdate.tsx` | Builder B + Sol repair | official brand, honest config/release provenance, distinct release/store loading and retryable unavailable states | completed |
| A2-06 notification permission | `S66NotificationPermission.tsx` | Builder B + Sol repair | native equal-reach actions, neutral optional/revocable copy, honest OS-state/re-entry variants | completed |
| A2-07 integration/acceptance | routes `05,05b,06,07,08,65,66` | Sol + independent reviewers | check/build, strict 7/7, isolated state suite/PNGs, no unwaived Critical/High/Medium | completed |

## Acceptance contract

- Every visible action is native/keyboard operable with an effective 44px target, authored focus and truthful local feedback.
- Native inputs use at least 16px text and appropriate autocomplete/type metadata; loading preserves primary-action width.
- S05 never combines request and confirmation; success remains account-enumeration safe and its resend timer announces only start/expiry milestones.
- S05b never renders a reset token; deterministic local rules and match truth drive CTA state; token/server fixtures are explicitly visual-only.
- S06 starts honest-null, requires a name plus 1–3 areas, rejects a fourth without losing prior selections, and never presents its illustration as Life Power or measured data.
- S07 retains its accepted idle/listening, voice disclosure, text fallback, privacy/crisis and reduced-motion contract.
- S08 derives day-one marker, visible date/current copy and accessible sentence from one plan payload; no hard-coded milestone contradiction remains.
- S65 does not simulate a real store launch; retry/offline/unavailable feedback remains visible without turning the mandatory gate into a dead end.
- S66 says notifications are optional/changeable later, scopes group updates to opted-in Squads/Communities, keeps Not now equal, and never claims a real OS grant in the web prototype.
- Current burnished-ember action contrast and official logo rules hold; no raw orange+paper action or unofficial/provider logo is introduced.

## Stop conditions

- Builder touches an unlisted/shared file, S07, docs, verifier, ledger/handoff, package/lock, `yhealth-app`, Figma, Railway, backend/API/auth/global state, provider/OS service or production data.
- A stale light-shell or `Cia` direction is revived.
- A screen claims real email delivery, token validation, guest session creation, store launch or OS permission without explicit visual-prototype/unavailable truth.
- Required/OS consent is pre-granted, decline is less operable, or social/notification copy uses loss pressure.
- Check/build/strict/state gates fail and cannot be repaired within the bounded batch.
- B1 starts before A2 independent acceptance.

## Completion gate

- [x] Worker outputs reviewed against packets; edits remained disjoint/in scope until serialized Sol integration.
- [x] Every A2 audit row is closed, explicitly dispositioned or covered by the persistent evidence-only waivers.
- [x] `npm run check` and `npm run build` pass.
- [x] Strict A2 capture is 7/7 with zero issues/warnings/missing frames/console errors.
- [x] Hardened isolated A2 verifier passes controls, timers, query/hash states, live announcements, secret/capability guards, targets, focus, contrast and reduced motion.
- [x] Current seven defaults and 61 exercised-state PNGs pass independent code, design/source and accessibility/trust review.
- [x] S07 remains conformant and its interaction evidence is isolated per fresh fixture.
- [x] Root validator and both diff checks pass; forbidden submodule state is preserved.
- [x] Sol accepted A2 and opens only B1.

## Closeout outcome

Sol accepts A2 at the visual-prototype family bar. Final evidence is strict `7/7` with no issues/warnings plus a hardened seven-group interaction suite containing exactly `61` state PNGs across `62` storage-cleared query/hash nonces. Start/end product and accepted-API hashes match; there are zero console, page or forbidden-capability events. Three independent reviewers accepted after recovery live/action, reset announcement, minimal-plan truth, edit continuity, loading-source, duplicate-live-region and verifier false-pass findings were repaired.

All A2 specs declare no image slot, recorded in `evidence/ASSET-DISPOSITION.md`. Residual waivers are evidence limits only: exact spawned runtime provenance, device AT/enlarged text, broad Axe and final immutable one-SHA 104-screen capture. No known A2 Critical/High/Medium product defect is waived. The durable goal remains active; only B1 may start next.
