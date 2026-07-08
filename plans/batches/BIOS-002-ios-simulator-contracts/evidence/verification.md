# BIOS-002 Verification Record (/verify)

Date: 2026-07-09 (early AM PKT). All mobile commands from `yhealth-app/mobile`.
Submodule HEAD at verification: `f2bdefd4`.

## Hard gates

| Gate | Command | Result |
| --- | --- | --- |
| Lint | `npm run lint` | **PASS** — ESLint: No issues found |
| Typecheck | `npm run typecheck` | **PASS** — tsc --noEmit, 0 errors (strict) |
| Tests | `npm run test` | **PASS** — manifest verifier `mobile-source-ok routes=11 files=85` + Vitest **41/41** (contract satisfies-tests, adapter honesty/anti-fabrication walker, session reducer transition table, Cia gate classification, 401-semantics regression suite) |
| Expo config | `npx expo config --type public` | **PASS** — resolves, SDK 57, identity unchanged |
| Web export smoke | `npx expo export --platform web --output-dir dist-smoke` | **PASS** — 2.0M bundle |
| Server typecheck (touched: gamification fix) | `npm run typecheck` in `yhealth-app/server` | **PASS** |

## iOS Simulator smoke (iPhone 17 Pro, Expo Go SDK 57, Metro w/ `EXPO_PUBLIC_API_URL=http://127.0.0.1:9090/api`)

Driven with Maestro 2.6.1 (installed this session + OpenJDK 21 via brew). Screenshots in `evidence/simulator/`:

| Evidence | What it proves |
| --- | --- |
| `02-signin.png`, `02b-filled.png` | Sign-in screen (purple Cia identity card), filled form, enabled CTA |
| `03-post-signin.png`, `03b-onboarding.png` | REAL login via `/auth/login` (X-Client: mobile) → routed to Cia onboarding; live onboarding-status steps card |
| `04-onboarding-cia.png` | Onboarding quick-calibration chat: real `/ai-coach/chat` (isOnboarding), optimistic pending bubble, composer |
| `05-today.png` | Today from `/v1/overview/dashboard`: Life Power **honest-null** ("isn't calibrated yet" + "Not enough data yet" chip), pulse metrics all `—` with per-metric provenance ("Connect a wearable"), purple Cia briefing card |
| `07-cia-reply.png` | Cia tab live conversation — user message + real LLM reply through local backend |
| `08-missions.png` | Mission Board (live `/v1/goals/unified`, honest empty) |
| `09-me.png` | Me hub with **real** gamification data: Level 5 / 1,200 XP / Streak 7 (values seeded in DB — proves the `req.user.userId` server fix end-to-end) |
| `10-life-areas.png` | Life Areas (Domain Stats) via stack push |
| `11-fitness.png` | Fitness dashboard (honest-null score/recovery/minutes) |
| `12-data-controls.png`, `13-export-result.png` | Trust center: live privacy toggles (state matches earlier PATCH), real export with per-table exported/total counts |
| `14-boot-hydration.png` | Cold relaunch boots straight into authenticated state from SecureStore + /auth/me validation |

## Real-endpoint exercise (local backend :9090, from server access log)

POST /auth/login 200×9 · POST /auth/refresh 200×2 + **401×1 (replay rejection proof)** ·
GET /auth/me 200×6 + 401×2 (invalid-token proof) · GET /v1/overview/dashboard 200×6 ·
GET /v1/goals/unified 200×2 + **304×4 (app-side ETag revalidation)** · GET /gamification/stats 200×4 + 304×4 ·
GET /life-areas/summary 200×2 (+500×2 pre-fix, see local-backend.md) · GET /workouts/plans 200×2 ·
POST /ai-coach/chat 200×3 (real LLM completions) · GET /auth/onboarding-status 200×2 ·
GET /preferences 200×2 · PATCH /preferences/privacy 200×1 · GET /v1/users/me/export 200×2 ·
POST /auth/login 400×1 (malformed-input during flow debugging — server validation held).

## Bugs found BY the simulator smoke (fixed in-batch, commit f2bdefd4)

1. **Secondary surfaces unreachable**: expo-router NativeTabs silently ignores `router.push` to hidden triggers — Life Areas / Fitness / Data Controls could never be opened by tap. Moved to root Stack pushes with native dark header + back. Re-proven live (10/11/12/13 screenshots).
2. **Visible all-caps "CIA"**: screen eyebrow style uppercases text, so `eyebrow="Cia"` rendered "CIA" (canon violation). Cia screens now use "Coach"/"Coach onboarding" eyebrows; body copy keeps `Cia`.

## Gate verdict

**ALL GREEN.** No gate waived. Simulator smoke covers all 7 slices + boot hydration + destructive-flow UI (delete confirm not executed — account preservation; UI verified visually per screenshots).
