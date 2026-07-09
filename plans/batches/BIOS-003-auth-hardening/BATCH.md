# BIOS-003-auth-hardening — Auth Hardening + Multi-Device

- Status: `closed` (2026-07-09; all gates green or explicitly waived — see completion gate)
- Theme: Backend session model for multi-device refresh (OQ-1, pre-approved by Hamza), Google/Apple sign-in, registration/OTP/forgot-password flows per hi-fi screens, token security review.
- Session cap: 5 slices — (1) server session-table multi-refresh + migrations + tests, (2) mobile refresh alignment to new model, (3) Apple/Google sign-in, (4) registration + OTP + forgot-password screens/flows, (5) token security review. No widening to non-auth screens.
- Build gate this batch? yes (UI batch — simulator smoke of every auth flow mandatory; no EAS build this batch, next EAS milestone is BIOS-004)
- Active roots: `yhealth-app/mobile` (primary), `yhealth-app/server` (session model — IN SCOPE per standing decision 2: backend changes needed to properly port mobile features, tested and committed; NO production deploy actions)
- Source links: `plans/batches/ROADMAP.md` (row BIOS-003), `plans/BIOS-DEV-MASTER-PROMPT.md`, `plans/batches/BIOS-002-ios-simulator-contracts/BATCH.md` + `evidence/local-backend.md` + `evidence/architecture-plan.md` §6 (OQ-1), `Balencia-New-Screens/canon/COMPACT-CANON.md` + `COMPONENT-CATALOG.md` + `_MASTER-LEDGER.md` (auth screen rows), `yhealth-app/server/src/routes/auth.routes.ts` + token/session services, `yhealth-app/client` auth pages (evidence only)
- Handoff status target: CLOSED, all gates green or explicitly waived
- Pre-development doc gate: READY WITH WAIVERS (see gate block)
- Documentation evidence path: `plans/batches/BIOS-003-auth-hardening/evidence/`
- Loop primitive: `ultracode:` (bounded batch; Workflow orchestration; `/loop` only for genuinely external waits)
- Runtime profile: `claude-native` (Fable orchestrator) + GLM sub-worker inside Workflow scripts per `runbooks/glm-workflow-worker.md`
- Orchestrator role: Claude (Fable) — owns acceptance, verification, commits
- Worker backend: GLM 5.2 (primary implementer), Sonnet (reviews), Haiku (read-only sweeps), Opus (architecture)
- Provider: Z.ai (GLM via `scripts/glm-worker.sh`) + Claude native
- Model: glm-5.2 (worker) / claude-fable-5 (orchestrator) / opus (architecture) / sonnet (review) / haiku (sweeps)
- Endpoint class: provider-api (GLM) + native (Claude)
- Worker task packet: `plans/batches/BIOS-003-auth-hardening/packets/` (authored in Move D)
- Worker output path: `plans/batches/BIOS-003-auth-hardening/evidence/glm-drafts/`
- Saved workflow: inline Workflow scripts persisted under session dir (paths recorded in evidence)
- Usage guard: `scripts/glm-worker.sh --ping` → `OK model=glm-5.2 reply=pong` (2026-07-09, this session)
- Verify command: mobile `npm run lint && npm run typecheck && npm run test && npx expo config --type public && npx expo export --platform web --output-dir dist-smoke` + server `npm run typecheck && npm test` (session-model scope) + simulator smoke of all auth flows + real-endpoint exercise log

## Pre-development gate (before status `in progress`)
- [x] Active docs + tie-breaker hierarchy: hifi-screens+canon > server routes > client (evidence) > yhealth-app-main (historical). Tie-breaker: live code + canon.
- [x] Source links resolve (handoff, master prompt, ROADMAP, BIOS-002 batch+evidence read this session)
- [ ] Blueprint marker — n/a
- [x] Verification gates selected (header verify command; server gates added for session-model scope)
- [x] Deterministic verify command + evidence path recorded (header)
- [x] Loop primitive + runtime profile recorded (header)
- [x] Worker smoke-test evidence: GLM ping OK 2026-07-09 this session
- [ ] Worker task packets — authored in Move D before any GLM delegation (gate for Move E)
- [x] Worker output path recorded (header)
- [x] `ultracode:` guard: scope cap = 5 slices; small first run = inventory workflow before implementation; stop conditions = scope expansion beyond auth, GLM failure after 2 attempts + packet refinement → Sonnet/Fable fallback with lesson recorded, destructive/credential decisions
- [x] Blockers, drift, waivers recorded (below)
- [x] Gate result: **READY WITH WAIVERS**

### Waivers / blockers carried into this batch (owner → closure)
| # | Item | Owner | Closure condition | Why development may begin |
|---|------|-------|-------------------|---------------------------|
| W1 | `mobile/.env` server-grade env hygiene | Hamza | Replaced with EXPO_PUBLIC_*-only | Gitignored; never read/printed; app reads only EXPO_PUBLIC_* (standing decision 4) |
| W2 | Apple team type unconfirmed | Hamza | Decision recorded | No store submission this batch |
| W3 | TestFlight beta metadata empty | Hamza | Privacy URL + feedback email | External testers out of scope |
| W4 | Production QA account decision | Hamza | OTP vs seeded chosen | Local seeded dev users only (standing decision 3) |
| W5 | W-007: 40 hi-fi screens FIX-FILED (Lane A) | Design lane | R-batches close | Auth screens checked against triage list at Move B; canon + current hi-fi followed |
| W6 | Backend-gated features | — | Backend matures | Visible-but-gated with provenance |
| B1 | Apple Sign-In full verification requires Apple-issued identity tokens; simulator/dev signature verification limits | This batch → possibly waiver | Inventory traces server social-auth path; implement to the depth verifiable locally; document waiver for device-only/prod-only verification steps | Contract + UI implementable and testable locally; anything requiring Apple manual action is waivered per standing decision 8 |
| B2 | OTP/email delivery locally (email worker needs provider) | This batch | Inventory confirms server OTP behavior without real email provider; exercise via DB/API where possible; document honest gating otherwise | Registration/OTP contract verifiable via API + seeded DB inspection |

### OQ-1 standing decision (pre-approved by Hamza — recorded here as batch entry evidence)
Implement the backend session table (multi-refresh-token, per-device sessions) in `yhealth-app/server` with full migrations + unit/integration tests, **backward compatible with the web client**. No production deployment actions. This closes OQ-1 from BIOS-002 architecture plan §6.

## Runtime intake block
```yaml
loop_primitive: "ultracode:"
runtime_profile: claude-native
orchestrator_role: Claude (Fable) orchestrates through Forgeflow artifacts
worker_backend: GLM (implementation) + Sonnet (review) + Haiku (sweeps) + Opus (architecture)
provider: Z.ai + Claude
model: glm-5.2 / claude-fable-5 / opus / sonnet / haiku
endpoint_class: provider-api + native
verify_command: mobile lint+typecheck+test+expo config+export smoke; server typecheck+test; simulator auth-flow smoke; endpoint exercise
evidence_path: plans/batches/BIOS-003-auth-hardening/evidence/
usage_guard: glm-worker.sh --ping OK (2026-07-09)
worker_task_packet: plans/batches/BIOS-003-auth-hardening/packets/
worker_output_path: plans/batches/BIOS-003-auth-hardening/evidence/glm-drafts/
saved_workflow: session-dir workflow scripts (recorded in evidence)
closeout_writes:
  - plans/batches/BIOS-003-auth-hardening/BATCH.md
  - plans/batches/BIOS-003-auth-hardening/evidence/
  - yhealth-app/.agent/specs/balencia-ios-foundation.md
  - plans/batches/ROADMAP.md
  - plans/next-session-handoff.md
  - yhealth-app submodule commits + pinned SHA update
```

## Item checklist
| Item | Locator | Status |
|------|---------|--------|
| BIOS-003-01 Server session model: `user_sessions` table (146-*.sql + registered migration), atomic-CAS rotation, reuse detection→revoke, LRU cap 10, `sid` claim, dual-read `/refresh` + lazy migration, this-device/all-devices logout, `jti` uniqueness fix; 117 auth tests green (unit + real-PG integration incl. web-compat regression) | `yhealth-app/server` | **done** |
| BIOS-003-02 Mobile session aligned: `getDeviceId` (SecureStore, single-flight) + `X-Device-Id/Name` headers, `adoptSession`, this-device sign-out, per-device replay semantics re-verified live (exercise steps 3–6) | `yhealth-app/mobile/src/services/auth/` | **done** |
| BIOS-003-03 Social sign-in: server Apple JWKS verification (sig/iss/aud/exp + email_verified) wired, Google verification required for ALL callers (X-Client bypass closed), fail-closed; mobile `expo-apple-authentication` + `expo-auth-session` with honest gated fallback (isAvailableAsync / client-id gates) — forged/absent tokens 401 live | server `oauth.service.ts` + `auth-registration.controller.ts`; mobile `social.ts` + screens | **done** (real-device Apple E2E waivered — B1) |
| BIOS-003-04 Registration + OTP + consent + whatsapp-gated + forgot/reset flows per hi-fi S03/S03b/S03c/S03e/S05/S05b (S05b OTP adaptation = ADR-9 documented deviation); full server round-trips proven live w/ mailpit OTPs | `yhealth-app/mobile/src/app/(auth)/` + `src/features/auth/` | **done** |
| BIOS-003-05 Token security review: ADR-11 checklist **5/5 pass** (`evidence/security-review-mobile.md`) + review-panel security fixes (SEC-1..3) | evidence + fixes | **done** |
| BIOS-003-06 Simulator smoke: 12 screenshots covering boot-expired redirect, S04/S05/S05b/S03 all states incl. error states, live UI sign-in through the new session model; 17-step endpoint exercise log; 1 render-crash bug found+fixed by smoke | `evidence/simulator/`, `evidence/endpoint-samples/` | **done** (automation limitation on secure-field typing documented in verification.md; API-level E2E covers the gap) |

## Architecture decisions (Move C — ACCEPTED 2026-07-09)

- Plan: `evidence/architecture-plan.md` (Opus, high effort; ADR-1..12 binding). Review: `evidence/architecture-plan-review.json` (Sonnet, adversarial) — verdict **reject** (3 blockers, 3 majors, 2 minors). Fable verified every finding against source and **ACCEPTED the plan WITH AMENDMENTS A1–A7** (plan §11). Highlights:
  - **A1** table file is `146-user-sessions.sql` (03 taken; highest existing prefix 145 — verified `ls tables/`).
  - **A2** `auto-migrate.ts` discovers nothing: `user_sessions` must be registered in `EXPECTED_TABLES` + migration mapping (verified lines 11/1112/1394) — the `139-*` gap class.
  - **A3** Expo Go Apple-audience contradiction resolved: `APPLE_CLIENT_IDS` env list (dev-only Expo Go audience possible w/o code change), mobile gates on `isAvailableAsync()`, verifier proven via injected-JWKS unit tests; real-device Apple E2E waivered (B1).
  - **A4** verified web client NEVER calls `POST /auth/refresh` (only a cookie-path attribute) — lazy migration is mobile-only in practice; web-only legacy rows are the column-drop batch's explicit problem.
  - **A5** `rotateSession` = atomic CAS UPDATE; concurrent-refresh integration test added.
  - **A6** `/logout` has no validator today → create `logoutSchema`, optional body preserved.
  - **A7** packet-composition rules: exact `jose` error class names; re-derive controller line numbers from live source.
- Infra landed during Move C (config-only): mailpit mail sink + SMTP env names + `FORCE_EMAIL_IN_DEV=true`; register→OTP-email proven live (`evidence/local-backend-delta.md`).

## Packet lessons (running log)
- **SP2 (GLM escalation #1, 2026-07-09):** GLM asked to "full-file replace" a large `package.json` + `oauth.service.ts` hallucinated both (invented package name, dropped ~35 real deps, non-existent `../utils/logger.js` import, wrong ApiError ctor shape) across two attempts despite the packet embedding full live content. Lander refused the draft and applied the packet's own authoritative Contract C1+C2 verbatim (typecheck green; Fable verified the landed diff). **Lessons:** (1) never ask a worker to re-emit `package.json` — packet should specify the single dependency line and let the lander run `npm install <pkg>`; (2) for full-file replaces the packet should embed the EXACT target file content to output, making the draft a copy task, or use anchored region edits; (3) wrapper-agent drift: the SP1 haiku shell-runner wrote files itself instead of only relaying stdout — outcome verified byte-identical to contract, but future glm() wrappers should be reminded they must not use file tools.

## Batch summary
- **Ship-ready: all 6 items.** OQ-1 CLOSED: per-device `user_sessions` model live (rotation, reuse-detection→revoke, LRU cap, this-device logout, legacy dual-read + lazy migration, web byte-compat proven by integration test + unchanged cookie flow). Two real security holes closed beyond plan: Apple sign-in had ZERO server-side verification (now full JWKS w/ email_verified); Google verification was bypassable via the client-controlled X-Client header (now required for all callers, fail-closed — web client verified to send id_token on every sign-in). `jti` added to refresh tokens after SP10 integration tests exposed 1-second-iat rotation degeneracy (identical-token rotation defeated replay detection inside the window).
- **Mobile**: full auth flow suite per hi-fi (S03/S03b/S03c/S03e/S04/S05/S05b + complete-profile), kit primitives (GlassPillInput/OTPCluster/ChargeMeter/PasswordRequirementList/ConsentCheckbox/MaskedDestinationLine/ToastBanner/SocialAuthButton), RegistrationFlow reducer (activationToken in-memory only), next-step router, device identity, adoptSession. Tests 41→66.
- **Review panel**: 16 findings → 14 adversarially confirmed → all fixed (2 blockers, incl. a genuine end-to-end social-auth breaker: mobile sent `email:''`, server schema rejected it). 2 refuted with evidence.
- **Verification**: `evidence/verification.md` — every hard gate green; server full-suite OOM is pre-existing upstream debt (waived, auth suites 117/117); simulator smoke 12 screenshots + 1 render-crash bug found & fixed in-batch (Google auth-session hook throw without client ids).
- **GLM-vs-Claude split (token routing policy):** GLM drafted the packets for SP1–SP10 + MP2–MP8 waves; landers verified/applied. GLM carried DB/service/controller/tests drafting for most server packets (SP3/SP5–SP8/SP10 drafts landed, some on revision). **Escalations to Claude after 2 failed GLM attempts: SP2 (hallucinated full-file rewrites), MP1, MP6, MP7, MP9, MP10 (bridge dropped oversized packets — GLM generated against imaginary codebases)** — implemented by Fable from the packets' own contracts. Claude also did all review-panel fixes (fix < packet). **Packet lessons (binding for BIOS-004):** (1) the glm-worker heredoc bridge truncates/drops packets beyond ~50KB — packets must either stay small or be delivered by file-path reference with a bridge that reads from disk; (2) never ask GLM to re-emit `package.json` or any large existing file — anchored edits or dependency-line lists only; (3) haiku shell-runner wrappers must be explicitly forbidden from using file tools (two went rogue and applied drafts themselves); (4) landers applying "packet Contract verbatim" content is an acceptable fallback but records as Claude-implemented.
- **Waivers carried forward:** W1 mobile/.env hygiene (Hamza), W2 Apple team type, W3 TestFlight metadata, W4 production QA account, W5 W-007 Lane A, W6 backend-gated features, B1 real-device Apple E2E (unblock: physical device or TestFlight build ≥ BIOS-004). New upstream findings for server backlog: full-suite jest OOM under plain `npm test`; `tests/globalTeardown.ts` deletes ALL `%@balancia.test` users (wipes the 15 seeded dev users on every integration run — re-seed required; recipe updated in `evidence/local-backend-delta.md` + endpoint-exercise notes).
- **Local infra added:** mailpit mail sink (`balencia-mailpit` docker, SMTP :1025 / API+UI :8025) + `FORCE_EMAIL_IN_DEV=true` — registration/OTP/forgot-reset fully exercisable locally (`evidence/local-backend-delta.md`).
- **OQ statuses:** OQ-1 closed (this batch). New OQ-A (server-side forgot-password enumeration 404 — product decision, owner Hamza), OQ-B (session-list/device-management UX — BIOS-009/BIOS-010 candidate), OQ-C (`APPLE_CLIENT_IDS` production values — config, owner Hamza/ops).

## Completion gate (before status `closed`) — ALL CHECKED
- [x] Every worked item has notes in THIS file (item table + evidence files)
- [x] Worker packets (`packets/SP1..SP10, MP1..MP10 + MP5/MP6/MP7 composer packets`) + output paths (`evidence/glm-drafts/`) recorded; every landed draft verified by orchestrator (landers + Fable diff review + gates)
- [x] Verify command run and result recorded → `evidence/verification.md` (ALL GREEN; 2 explicit waivers w/ owners: server full-suite OOM upstream, real-device Apple E2E)
- [x] Simulator screenshots + endpoint exercise log in `evidence/`
- [x] GLM-vs-Claude implementation split + packet lessons recorded (above)
- [x] Spec + ROADMAP + handoff updated; submodule committed; pinned SHA updated (see closeout commits)
