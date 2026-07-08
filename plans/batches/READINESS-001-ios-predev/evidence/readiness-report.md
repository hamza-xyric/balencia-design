# READINESS-001-ios-predev — Readiness Report

Date: 2026-07-08 (evening, PKT)
Orchestrator: Claude (Fable 5), claude-native profile, `ultracode:` bounded audit
Decision: **READY WITH WAIVERS**

## 1. Status

**Ready with waivers.** All deterministic gates pass; EAS/TestFlight state is precisely known;
no secrets exposed or tracked; skills/model routing confirmed; bounded next scope defined.
Non-blocking waivers documented below with owner + closure condition.

## 2. Manual items complete

- Apple Developer agreement (team 9X562Q83JN): inferred complete — ASC API 200s, June uploads succeeded.
- Expo account `xyric-it` has access to @xyric-it/balencia (`eas whoami` + build list).
- Bundle `ai.xyric.balencia`, EAS project `33ff58af-a986-4355-ad55-2ceb98f45ec1`, ASC app `6776583651`
  all match app.json/eas.json and the live ASC record (`Balencia AI`).
- Remote iOS credentials active — production store build 10 finished 2026-07-08 21:41 PKT.
- Internal TestFlight group exists: "Internal Balencia Testing".
- `.local-secrets/AuthKey_7N3LKBDJZU.p8` present, PEM-shaped, gitignored (`*.p8`); never read as value.
- `mobile/.env` exists (gitignored). `mobile/.env.example` created (was missing).
- Production API + socket URLs pinned in all eas.json profiles (Railway).
- Local backend setup documented (`yhealth-app/README.md`, `server/.env.example`, migrations/seeds).
- GLM bridge ready: `scripts/glm-worker.sh --ping` → `OK model=glm-5.2 reply=pong`; `~/.xyric/framework.env` present (value untouched).
- No secret-shaped files tracked by git in either repo (`git ls-files` sweeps).
- Capabilities, QA/OTP limitations, backend caveats documented in `yhealth-app/mobile/docs/READINESS.md`.

## 3. Manual items still needed from Hamza

1. **Replace `mobile/.env`** with EXPO_PUBLIC_*-only content (currently a full server-grade env — high-risk hygiene finding; values were never read/printed).
2. ~~Confirm submission aa6ed762~~ **RESOLVED during audit**: build 10 arrived in ASC at 22:12 PKT, processingState VALID — submission succeeded. Only remaining step: confirm internal testers can install.
3. **Confirm Apple team type** (EAS showed Individual) — fine for TestFlight; decide if org migration is wanted before public App Store release.
4. **Provide TestFlight metadata**: privacy policy URL + feedback email (beta app localizations are empty; needed before external testers/beta review, not for internal group).
5. **QA account decision**: OTP throwaway accounts vs deliberately seeded dev account (no production login exists; no passwords recorded anywhere).

## 4. Skills / agents

Available:
- Codex: all 10 `source-command-*` skills + software-architect, senior-frontend, ux-ui-designer,
  code-review in `.agents/skills/`; expo plugin skills (building-native-ui, native-data-fetching,
  expo-deployment, expo-dev-client + 9 more) in Codex openai-curated plugin cache.
- Claude/Fable: equivalent skills loaded natively this session (software-architect, senior-frontend,
  ux-ui-designer, code-review, Forgeflow command set).

Missing → mitigated:
- `release-readiness-verifier` agent not imported; its behavior is ported as the "Release Gate"
  section of `yhealth-app/mobile/docs/READINESS.md` (documented-checklist option satisfied).
- Historical `docs/SKILLS_REQUIREMENTS.md` turned out to be a human hiring/competency doc, not an
  agent-skills list — no gate impact.

## 5. Model routing (confirmed + documented)

Fable orchestrator · Opus architecture authority · GLM 5.2 bounded implementation worker
(smoke-tested) · Sonnet review/quality gates · Haiku read-only sweeps. Recorded in READINESS.md and
the foundation spec. Sonnet is never the architecture authority.

## 6. TestFlight / EAS current status

- EAS: build `63265de5-d280-428e-b44c-f539f3c01352` **finished** (production/store, SDK 57, v1.0.0
  build 10). Previous store builds: #5 (June 16, SDK 56), #4, #3.
- ASC (via ASC API, JWT signed locally, no secrets printed): initially showed #5 as latest; final
  poll at audit close: **build 10 VALID in ASC** (id `572896eb`, uploaded 22:12 PKT) — submission
  `aa6ed762` **succeeded**.
- Internal group "Internal Balencia Testing" exists; beta review never submitted (internal-only so far).
- Note: `eas-cli` has no `submit:list`/`submission:list` command — submission state must be checked
  via the expo.dev URL or ASC API.

## 7. Docs updated

- `yhealth-app/mobile/docs/READINESS.md` — created (canonical checklist + release gate + routing).
- `yhealth-app/mobile/.env.example` — created (missing; EXPO_PUBLIC_* keys only).
- `yhealth-app/.agent/specs/balencia-ios-foundation.md` — readiness audit section appended.
- `plans/batches/BIOS-001-mobile-foundation/evidence/verification.md` — re-verification + slug drift correction.
- `plans/batches/BIOS-001-mobile-foundation/evidence/yhealth-app-main-config-import.md` — .env.example correction + .env finding.
- `plans/next-session-handoff.md` — rewritten for BIOS-002 kickoff.
- `plans/batches/READINESS-001-ios-predev/BATCH.md` — this batch's record.

## 8. Verification commands and results

| Command | Result |
| --- | --- |
| `npm --prefix yhealth-app/mobile run lint` | PASS — "ESLint: No issues found" |
| `npm --prefix yhealth-app/mobile run typecheck` | PASS |
| `npm --prefix yhealth-app/mobile run test` | PASS — `mobile-source-ok routes=11 files=38` |
| `npm exec -- expo config --type public` (mobile) | PASS — resolves, SDK 57.0.0, correct identity |
| `npx eas whoami` | `xyric-it` |
| `npx eas build:list --limit 5 --platform ios` | Latest: 63265de5 finished (build 10) |
| `npx eas submit:list` / `submission:list` | Command does not exist in eas-cli — ASC API used instead |
| ASC API builds/betaGroups/metadata | Build 5 latest VALID; internal group exists; beta metadata empty |
| `scripts/glm-worker.sh --ping` | `OK model=glm-5.2 reply=pong` |
| Secret sweeps (`git ls-files`, shape checks) | Clean — nothing secret-shaped tracked |

## 9. Blockers / waivers

No hard blockers. Waivers (owner → closure):
1. ~~Submission aa6ed762~~ CLOSED during audit — build 10 VALID in ASC 22:12 PKT.
2. mobile/.env server-grade content (Hamza → EXPO_PUBLIC_*-only file).
3. Apple team type confirmation (Hamza → decision recorded).
4. TestFlight beta metadata empty (Hamza → URLs/email provided; pre-external-testing only).
5. QA account decision (Hamza → OTP or seeded account).
6. iOS Simulator smoke not yet run (BIOS-002 first gate).
7. W-007: 40 hi-fi screens await independent re-review (design lane R-batches; mobile build must not
   treat those 40 screens' specs as final until cleared).
8. Backend-gated features (WhatsApp, Finance, compliance, barcode, PWA/offline, PSTN) stay
   visible-but-gated with provenance states; never marked production-ready client-side.

## 10. Next autonomous development prompt

Use after Hamza clears (or accepts) waivers 1–2:

> /goal Implement BIOS-002-ios-simulator-contracts: using the existing Expo mobile foundation at
> yhealth-app/mobile, real backend contracts where available, and documented waivers where backend
> capability is not production-ready — (1) run /runtime-profiles + /start-batch + /pre-development-check,
> (2) start the local backend and run the app in iOS Simulator with sign-in via a real mobile token
> (OTP or seeded dev account per READINESS.md), (3) harden auth/session, (4) integrate Cia
> onboarding/chat, Today home data, Missions, Life Areas, and the Fitness dashboard against real
> responses with confirmed DTO adapters, (5) implement trust/privacy/data controls with provenance
> states, (6) capture simulator screenshots + smoke evidence, and (7) close the batch with green
> mobile gates and updated handoff. Design truth: Balencia-New-Screens/hifi-screens + canon.
> Routing: Opus for architecture decisions, GLM 5.2 for bounded packets, Sonnet for reviews,
> Haiku for sweeps. Do not widen beyond these slices.
