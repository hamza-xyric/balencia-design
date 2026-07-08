# BIOS-002 — iOS Simulator + Real Backend Contracts — Batch Technical Plan

**Authority:** Architecture Authority (software-architect framing) · **Batch:** BIOS-002 · **Status:** in progress
**Active root:** `yhealth-app/mobile` (Expo SDK 57 / Expo Router / RN 0.86 / React 19 / TanStack Query v5, TS strict)
**Backend:** local Express 5 at `http://127.0.0.1:9090/api`, envelope `{success, message?, timestamp?, data, requestId?}`
**Source hierarchy (tie-break):** hifi-screens + canon > server routes/types > client evidence > yhealth-app-main (historical). Honesty invariant (canon §7) is non-negotiable and outranks convenience.

This plan freezes the contract before any GLM code is written. The contract is the lock: workers build against it in parallel; a contract change pauses dependents and returns to the orchestrator.

---

## 1. Executive summary

The current mobile app is a **pilot shell**: a single generic `apiFetch`, a session module that stores a refresh token it never uses, no adapter layer, no query keys/invalidation, no test framework, and — the load-bearing defect — **fabricated numbers** in `getFitnessDashboard` (`score:74`, `weeklyMinutes = plans.length*38`, `recovery:68`) plus a `GamificationStats` type (`{level, xp, streak, lifePower}`) that does not match the server (`{totalXP, currentLevel, currentStreak, longestStreak, levelProgress}`, **no `lifePower`**). These violate canon §7 and must be removed this batch.

BIOS-002 replaces the shell with a **honest, typed, testable contract layer**: a session state machine with proactive-expiry + 401→refresh→retry-once, a vendored server-DTO mirror, an adapter/view-model layer that maps every field to `real | low-confidence | honest-null` (never invented), TanStack Query conventions, non-streaming Cia handling, canon-faithful state components, a real unit/contract test runner (Vitest), and the trust/data-controls slice keyed off the four verified endpoints. Visual work stays minimal — reuse the existing kit, add only the missing state primitives.

**Seven slices in scope** (BATCH cap): auth/session, Cia onboarding+chat, Today, Missions, Life Areas, Fitness, data-controls — plus simulator smoke. No widening to the other 104 screens.

---

## 2. Verified backend contract snapshot (the ground truth these adapters target)

All samples captured from a fresh seeded account (`john.doe@balancia.test`) — **empty/default states are deliberate DTO truth for loading/empty/honest-null design.**

| Endpoint | Verified shape (fresh account) | Design consequence |
|---|---|---|
| `POST /auth/login` (`X-Client: mobile`) | `data:{user:PublicUserProfile, tokens:{accessToken, refreshToken, expiresIn:900}}` | mobile-only raw tokens; `expiresIn` is **seconds** (900 = 15 min) |
| `POST /auth/refresh` | full rotation; new pair; **old refresh replay → 401 `"Refresh token mismatch"`**; single stored token/user | multi-device caveat (§Decision 2) |
| `POST /auth/logout` | nulls stored refresh token; access token **not** revocable (15 min TTL, no JTI denylist) | sign-out UX must assume access token lives ≤15 min |
| `GET /auth/me` | `data:{user:PublicUserProfile}` | session hydration source |
| `GET /auth/onboarding-status` | `data:{currentStep, steps:{registered,consent,whatsApp,assessment,goals,preferences,plan}, isComplete, completedAt}` | gates onboarding route |
| `GET /v1/overview/dashboard` | fully typed `OverviewDashboardResponse` (honest-null built in: `lifeScore.totalScore:null`, `pulse.*.value:null`, `domains[].status:'no_data'`, `meta.has*:false`) | **Today home source** (§Decision 1) |
| `GET /v1/goals/unified` | `data:{goals:UnifiedGoal[], summary}` | Missions source |
| `GET /gamification/stats` | `data:{stats:{totalXP, currentLevel, currentStreak, longestStreak, lastActivityDate, levelProgress:{currentLevel,currentXP,xpForCurrentLevel,xpForNextLevel,progressPercent}}}` | Missions/Me stats; **no `lifePower`** |
| `GET /life-areas/summary` | `data:{activeAreaCount, totalLinks, averageMomentum, areas:[{id, display_name, domain_type, link_count, momentum, checkin_streak, last_checkin_date}]}` — **snake_case** | Life Areas source; no per-area `trend`/`drivers` server-side |
| `GET /workouts/plans` | `data:{plans:WorkoutPlan[]}` (JSONB-heavy, unpaginated) | Fitness source — **no fitness score / recovery / minutes fields exist** |
| `POST /ai-coach/chat` | **synchronous** `data:{sessionId, message, phase, insights:[], isComplete, suggestedActions?, historicalContextUsed, routingChip}` (fresh: `routingChip:null`) | Cia is not streaming (§Decision 5) |
| `GET /v1/users/me/export` | `data:UserDataExport{exportedAt, user, data, counts}` | trust: real |
| `DELETE /v1/users/me` | body `{password?, confirmation}`; **confirmation literal = `"DELETE MY ACCOUNT"`** (traced: `server/src/validators/user.validator.ts:42`); password required iff account has a password; hard delete, no undo | trust: real, destructive |
| `PATCH /preferences/privacy` | `{shareProgressWithCoach?, allowAnonymousDataForResearch?, showInLeaderboards?, profileVisibility?, healthProfileVisibility?, healthProfileAllowedUsers?}` | trust: real |
| `GET /preferences` | `data:{preferences:{notifications, coaching, display, privacy, integrations, voiceAssistant}}` | privacy read; **note `voiceAssistant.assistantName:"Sia"` is legacy DB data — never render as coach name; visible copy is `Cia`** |

**Error shape** (thrown `ApiError` via global handler): `{success:false, message, code, errors?, timestamp, requestId?}`.

---

## 3. Architecture Decision Records

### ADR-1 — Today home data source: single `/v1/overview/dashboard`

**Decision.** Today renders from **one** call to `GET /v1/overview/dashboard`. Do **not** compose Today from separate domain endpoints.

**Why.** It is a purpose-built, server-cached (`overview:dashboard:<userId>`) aggregation whose shared type (`server/shared/types/domain/overview.ts` → `OverviewDashboardResponse`) already encodes the honesty invariant we are legally required to honor: `totalScore:null` / `status:'no_data'` / `meta.has*:false` when a domain has no signal. It gives us `lifeScore` (Life Power source), `pulse` (energy/recovery/stress hero with per-metric `source: whoop|self_report|computed`), `momentum` (streak/xp/level), `domains`, `priorities`, and `meta` flags in one round-trip — exactly the Today canon surface. Composing separately would re-derive this honesty logic client-side (the current shell's cardinal sin) and multiply failure surfaces.

**Alternatives rejected.** (a) Compose `overview/life-score` + `overview/life-pulse` + `gamification/stats` + `goals/unified` — rejected: 4× latency, 4× partial-failure states, and we would have to re-implement the null/status rules the server already ships. (b) Client-side aggregation of raw domain tables — rejected outright: it is the fabrication path.

**Consequence.** `momentum.level/xp/streak` on Today comes from the overview payload; the **Missions/Me** tabs keep using `/gamification/stats` (their canonical source) — accept minor redundancy rather than cross-wiring tabs. Life Power = `lifeScore.totalScore` (honest-null when null).

---

### ADR-2 — Auth/session architecture: a `SessionProvider` state machine over SecureStore

**Decision.** Introduce a single `SessionProvider` React context wrapping the app, backed by a small explicit state machine, replacing the scattered `useState(hasSession)` pattern in `use-pilot-data`.

States: `booting → unauthenticated → authenticating → authenticated → refreshing → expired`.

- **SecureStore schema** (key unchanged for compat: `balencia.mobile.session.v1`):
  ```ts
  type StoredSession = {
    accessToken: string;
    refreshToken: string;          // now REQUIRED (was optional & unused)
    accessTokenExpiresAt: number;  // epoch ms = storedAt + expiresIn*1000  (NEW — derived at store time)
    user: PublicUserProfileVM;
    storedAt: string;              // ISO
    schemaVersion: 1;
  };
  ```
- **Proactive expiry.** `expiresIn:900` s. Treat token as stale `SKEW_MS = 60_000` before `accessTokenExpiresAt`. The API client checks staleness *before* firing a request and refreshes first when possible (cheaper than a guaranteed 401 round-trip on a 15-min token).
- **Reactive 401.** If a request 401s anyway, the client runs **refresh → retry-once** (mirrors the web client's `reinstallBackendSession` pattern). A single in-flight refresh is shared (`refreshInFlight` promise) so concurrent 401s don't stampede rotation.
- **Rotation + single-token caveat.** Refresh is full-rotation; the server stores one refresh token per user, so a second device silently invalidates the first. **We do not solve multi-device this batch** — we detect it: a refresh that returns 401 `"Refresh token mismatch"` transitions to `expired` and routes to sign-in with a canon session-expired notice ("Your session ended. Sign in to continue."). Logged as **Open Question OQ-1** for backend (session table) — not invented client-side.
- **Sign-out.** `POST /auth/logout` (best-effort; ignore network failure) → `clearSession()` → `queryClient.clear()` → route to `(auth)/sign-in`.
- **Boot hydration.** On launch, read SecureStore; if present, optimistically `authenticated`, then validate via `GET /auth/me` (updates stored user; 401 → refresh → else `expired`).

**Why.** A provider gives one source of truth for auth, one place to invalidate the query cache on sign-in/out, and a testable pure reducer. The proactive+reactive combo is the industry pattern and matches confirmed client evidence.

**Alternatives rejected.** (a) Keep hook-local `hasSession` — rejected: no cache invalidation, race-prone, untestable. (b) Redux/Zustand — **banned by constraints**; context + Query suffice. (c) Access-token denylist on logout — impossible (server has no JTI); rely on 15-min natural expiry, documented.

---

### ADR-3 — DTO adapter layer: vendored server types → mobile view models, with honesty mapping and fixture contract tests

**Decision.** Three-layer boundary:

1. **`src/services/api/dto/` — vendored server DTO types.** Hand-mirrored TS interfaces of the server response shapes (envelope-inner), sourced from `server/shared/types/domain/*` and the traced controllers. These are the *wire contract*, snake_case preserved where the server emits it (life-areas). They are not imported from the server package (no monorepo path); they are copied with a header comment pinning the source file + date. Drift is caught by contract tests (below).
2. **`src/services/adapters/` — pure mapper functions** `toXView(dto): XView`. All camelCasing, null-handling, and provenance derivation happens here and **only** here. Screens never touch DTOs.
3. **`src/viewmodels/` — mobile view-model types** consumed by screens, each field carrying provenance where canon §7 applies.

**Provenance mapping (canon §7 — the core of this batch):**
```ts
type Provenance =
  | { kind: 'real'; source: 'whoop' | 'self_report' | 'computed' | 'server'; label: string }  // "via WHOOP" / "you logged"
  | { kind: 'low'; label: string }        // "estimated · low confidence"
  | { kind: 'null'; label: string };      // "Not enough data yet"  — value MUST be null

type Metric<T = number> = { value: T | null; display: string; provenance: Provenance };
```
Rules the adapters MUST enforce:
- Server `null` + `status:'no_data'` → `provenance.kind:'null'`, `value:null`, display `"—"`. **Never** substitute a number.
- `pulse.metrics[].source` maps directly to provenance source; `hasWearable:false` forces recovery/stress to honest-null.
- **The fabrications die here:** Fitness `score/recovery/weeklyMinutes` become honest-null (no such server field). Gamification `lifePower` is **removed** from the type; Life Power comes from `overview.lifeScore.totalScore` (honest-null when null).

**Contract tests** run each adapter against the **recorded real fixtures** in `evidence/endpoint-samples/*.json` (copied into `src/**/__fixtures__/`), asserting: (a) adapter accepts the exact recorded shape without throwing, (b) fresh-account fixtures produce honest-null view models with zero invented numbers, (c) no adapter output contains a hardcoded literal number where the fixture value was null.

**Why.** DTO→VM mapping is the §8 pattern that prevents backend drift from reaching UI, and it is the only place honesty can be enforced by test. Fixture-pinned contract tests convert "backend changed and we didn't notice" into a red bar.

**Alternatives rejected.** (a) Use raw responses in screens (current shell) — rejected: fabrication + drift. (b) Codegen from OpenAPI — no server OpenAPI exists; vendoring + contract tests is the pragmatic equivalent. (c) Zod runtime validation at the boundary — deferred: adds a dep and is heavier than needed for read-only fixtures this batch; contract tests cover it. Flagged as a future batch enhancement.

---

### ADR-4 — Data fetching: TanStack Query v5 conventions

**Decision.** Centralize a `queryKeys` factory and per-domain hooks; the API client owns retry/backoff/dedupe/401.

- **Query keys** (hierarchical, user-scoped for correct invalidation):
  ```ts
  queryKeys = {
    all: ['balencia'] as const,
    overview: () => [...all, 'overview'] as const,
    missions: (f?) => [...all, 'missions', f ?? 'all'] as const,
    gamification: () => [...all, 'gamification'] as const,
    lifeAreas: () => [...all, 'life-areas'] as const,
    fitness: () => [...all, 'fitness'] as const,
    preferences: () => [...all, 'preferences'] as const,
    onboardingStatus: () => [...all, 'onboarding-status'] as const,
  }
  ```
- **staleTime.** Dashboard/domain reads `60_000` ms (server caches anyway); `preferences` `300_000`; `onboarding-status` `Infinity` per session (invalidate on relevant mutations).
- **Invalidation.** `SessionProvider` calls `queryClient.clear()` on sign-out and `invalidateQueries({queryKey: queryKeys.all})` on sign-in. Data-controls mutations (privacy PATCH) `invalidateQueries(queryKeys.preferences())`.
- **Retry/backoff.** Global `QueryClient` default: `retry: (count, err) => err.status >= 500 && count < 3`, `retryDelay: 2**count*1000` (1s→2s→4s, matches confirmed client evidence). **Never retry 4xx** (401 handled at fetch layer, not Query layer). Mutations `retry:0`.
- **Dedupe.** Query already dedupes identical in-flight keys; the fetch client additionally shares the single refresh promise.
- **Error surfaces.** Each hook returns `{status:'pending'|'error'|'success', data, error}`; screens map to canon state components (ADR-7). `throwOnError:false`.

**Why.** These are the v5 idioms; centralizing keys makes invalidation correct and testable.

**Alternatives rejected.** Ad-hoc `useQuery` per screen with string keys (current shell) — rejected: no invalidation on auth transitions, cache leaks across users (a real security/privacy hazard).

---

### ADR-5 — Cia chat: non-streaming, session-stateful, entitlement-aware

**Decision.** Treat `POST /ai-coach/chat` as a **synchronous request/response** (confirmed: no SSE/socket on this route). No streaming consumer.

- **Contract handled:** send `{sessionId?, message, goal, isOnboarding}`; receive `{sessionId, message, phase, insights, isComplete, suggestedActions?, historicalContextUsed, routingChip}`. `routingChip` is **opaque** (fresh: `null`) — store, never branch on it.
- **Conversation state:** local `useReducer` message list `{id, role:'user'|'cia', text, phase?, pending?, failed?}`. `sessionId` from the first response is threaded into subsequent sends (single Cia session per screen mount). `phase` may drive a subtle header label but no logic branches on the un-traced enum values (OQ-2).
- **Optimistic send:** append user message + a `pending` Cia bubble immediately (<100ms feedback, §7.1), replace on response, mark `failed` with retry affordance on error.
- **Onboarding flow:** onboarding calibration sends `isOnboarding:true` (free assessment coach — entitlement gate skipped server-side). The live Cia tab sends `isOnboarding:false`.
- **Entitlement 402:** if the live tab returns `402 {code:'FEATURE_DISABLED'}`, render a canon locked-feature state (blurred preview + single unlock CTA per canon §8) — **never** a dead end, never a faked reply. The current shell's "I can draft the next mission step locally…" fallback is replaced with an honest gated state.
- **Naming:** all visible copy is **`Cia`**. The `voiceAssistant.assistantName:"Sia"` field from `/preferences` is legacy data and is never surfaced as the coach name.

**Why.** The endpoint is genuinely synchronous; pretending otherwise invents a transport. Honest gating beats a fabricated local reply.

**Alternatives rejected.** (a) Socket.IO streaming via `chat.routes.ts`/`socket.service.ts` — **not traced**, out of scope, flagged **OQ-3** (is the production coach a different transport?). (b) Client-side canned fallback replies — rejected: fabrication.

---

### ADR-6 — Navigation: keep the current 4-tab + hidden routes structure; no widening

**Decision.** Keep the existing Expo Router layout: visible `NativeTabs` **Today · Cia · Missions · Me**, with `life-areas`, `fitness`, `data-controls` as hidden routes reached from **Me**. This maps to canon GlassNavBar (canon lists "Today · CIA · Goals · Me"; per project RPG terminology **Goals = Missions**, and coach copy is **Cia** not CIA — the tab is `Missions`, the coach is `Cia`).

**Why.** Canon's 4-tab bar is satisfied; the three secondary surfaces are in the 7-slice scope but are not top-level tabs. Restructuring routing is out of scope for a contracts batch (BIOS-004+ deepens screen parity).

**Alternatives rejected.** Promoting Life Areas/Fitness to tabs — rejected: diverges from canon's 4-tab bar and widens scope. Rebuilding `NativeTabs` as a custom GlassNavBar — deferred to a visual batch.

---

### ADR-7 — Error/loading/empty states: canon primitives as native components

**Decision.** Extend `src/components/balencia/states.tsx` to the full canon set, replacing the current 3 (`LoadingState/EmptyState/ErrorState`):

| Component | Canon role | Props |
|---|---|---|
| `SkeletonState` | loading via skeleton (not spinner, §7.1) | `{lines?, variant?:'card'|'hero'|'list'}` |
| `ErrorState` | failure + retry | `{message, onRetry?}` |
| `HonestNullState` | canon §7 designed empty | `{title, detail}` e.g. "Not enough data yet — start tracking" |
| `ProvenanceChip` | §7 real-source chip | `{provenance: Provenance}` → "via WHOOP" / "you logged" / "estimated · low confidence" |
| `OfflineBanner` | degraded network | `{onRetry?}` |
| `LockedFeatureState` | §8 gated preview | `{title, onUnlock}` |

All follow existing kit tokens (`BalenciaColors`, `Radius`, `Spacing`), 44px targets, reduced-motion-safe. Keep `LoadingState` as a thin alias to `SkeletonState` for back-compat during migration, then remove.

**Why.** Screens currently render blank on load and swallow query errors; canon requires designed states for every metric and surface.

---

### ADR-8 — Test infrastructure: Vitest for pure-TS unit/contract tests

**Decision.** Add **Vitest** as the unit/contract runner for pure-TS logic (adapters, session reducer, query-key factory, provenance mapping). **No** React Native component rendering, **no** e2e this batch.

- **devDependencies:** `vitest@^3`, `@vitest/coverage-v8@^3`. (No `jsdom` — logic is pure TS; environment `node`.)
- **Config** `vitest.config.ts`: `test.environment:'node'`, `include:['src/**/*.test.ts']`, path alias `@` → `src` (mirror `tsconfig`), `test.exclude` RN/Expo entry points. Guard against RN imports by keeping adapters/session-reducer free of `react-native` imports (pure modules).
- **package.json scripts:** `"test": "node ./scripts/verify-mobile-source.mjs && vitest run"` — the existing manifest verifier stays as an **additional gate** (routes/tokens/forbidden-copy) and runs first; `"test:unit": "vitest run"`, `"test:watch": "vitest"`.
- **Coverage** meaningful-paths only (adapters + session), not a target.

**Why.** Vitest is the lightest runner compatible with the ESM/TS toolchain, needs no Metro/RN transform for pure modules, and satisfies CLAUDE.md §3 "prove it" for the logic that carries the honesty invariant. Jest would drag in `babel-jest`/RN preset config we don't need for pure TS.

**Alternatives rejected.** (a) `jest-expo` — heavier, RN-transform overhead, unnecessary for pure logic. (b) `react-native-testing-library` component tests — out of scope (no component rendering this batch); flagged for BIOS-004+. (c) No tests / keep manifest-only — rejected: violates §3 and leaves honesty unproven.

---

### ADR-9 — Trust/data-controls slice: real vs gated-with-provenance

**Decision.** Data-controls surfaces are split by verified capability:

| Capability | Status | Handling |
|---|---|---|
| Data export (`GET /v1/users/me/export`) | **REAL** | trigger export, show `counts.exported/total` honestly (surface truncation), offer share/save of JSON |
| Account delete (`DELETE /v1/users/me`) | **REAL, destructive** | two-step: type-to-confirm the **exact** phrase `DELETE MY ACCOUNT` (pinned constant) + password field (shown iff account has password; hidden for OAuth-only); **no undo** — copy must NOT promise a grace period (server has none, OQ-4); on success clear session + route to sign-in |
| Privacy prefs (`PATCH /preferences/privacy`, read via `GET /preferences`) | **REAL** | toggles for `shareProgressWithCoach`, `showInLeaderboards`, `allowAnonymousDataForResearch`, `profileVisibility`, `healthProfileVisibility`; optimistic + invalidate `preferences` |
| Session clear (local) | REAL | wipe SecureStore + query cache |
| Finance / WhatsApp / documents / wearable (W6) | **GATED** | render visible-but-gated with `ProvenanceChip`/`LockedFeatureState`; never faked, never a dead end |
| Consent history / audit log | **GAP** | no endpoint exists — render honest "not available yet" state, flag OQ-5; do not fabricate a log |

**Why.** These four endpoints are the only verified trust surfaces; W6 features stay gated with provenance per the batch waiver.

**Alternatives rejected.** Implying an undo window or a consent audit trail — rejected: backend has neither; promising them is a §7 honesty violation.

---

### ADR-10 — Batch roadmap: confirm BIOS-002…BIOS-012

**Decision.** Confirm the roadmap, BIOS-002 in progress. See §5 ROADMAP table. Adjustments from evidence: (a) a dedicated **BIOS-003 auth-hardening** slice absorbs multi-device/session-table work (OQ-1) rather than forcing it into 002; (b) streaming-coach transport investigation (OQ-3) is explicitly a BIOS-005 entry criterion, not silently assumed.

---

## 4. Packet decomposition (GLM implements ALL code)

Each packet is self-contained: a GLM worker receives only the packet text (it cannot browse). Contracts and input file contents are embedded in the packet body when authored in Move D; below is the decomposition, ordering, targets, and acceptance. Orchestrator (Fable) verifies every packet output; Sonnet reviews; Vitest + typecheck + lint are the machine gate.

**Pipeline stages (parallelism):**

```
Stage 0 (parallel, no deps):        P1  P2  P8
Stage 1 (needs P1,P2):              P3  P4
Stage 2 (needs P2; P5 needs P4):    P5  P6  P9   P7(needs nothing but tokens)
Stage 3 (needs P3,P4,P5,P7):        P10 P11
Stage 4 (needs all):                P12
```

---

### P1 — Typed API client: envelope, retry/backoff, dedupe, 401→refresh→retry-once
- **Target files:** modify `src/services/api/client.ts`; create `src/services/api/errors.ts`.
- **Embed:** current `client.ts` contents; envelope `{success,message?,timestamp?,data,requestId?}`; error `{success:false,message,code,errors?,requestId?}`; the refresh-retry-once contract (call `refreshSession()` injected via a setter to avoid a session import cycle; share one in-flight refresh promise; retry the original request once with the new token; on refresh failure throw `SessionExpiredError`).
- **Contracts embedded:** `ApiError{message,status,code?,details?,requestId?}`; `SessionExpiredError extends ApiError`; `apiFetch<T>(path, opts)` unwraps `data`, throws typed errors, injects `X-Client:mobile` + Bearer, proactive-staleness hook (calls `ensureFreshToken()` before request).
- **Acceptance:** typechecks strict; unwraps envelope; 5xx surfaces `ApiError.status`; a simulated 401 triggers exactly one refresh + one retry; no infinite loop on repeated 401.
- **Out of scope:** the session module itself (P3 injects `refreshSession`/`ensureFreshToken` via setters), Query wiring.
- **Deps:** none.

### P2 — Vendored server DTO type mirror
- **Target files:** create `src/services/api/dto/{overview.ts, goals.ts, gamification.ts, life-areas.ts, workouts.ts, ai-coach.ts, auth.ts, preferences.ts, user-self.ts, envelope.ts, index.ts}`.
- **Embed:** the exact recorded fixtures (`evidence/endpoint-samples/*.json`) + the traced type descriptions from scope-map `domainDtos`/`authContracts`. Each file header pins source path + capture date `2026-07-08`.
- **Contracts embedded:** `PublicUserProfile`, `AuthTokens{accessToken,refreshToken,expiresIn}`, `OverviewDashboardResponse` (full), `UnifiedGoal`+`UnifiedGoalsSummary`, `UserGamificationStats`, `LifeAreasDashboardSummary` (snake_case), `WorkoutPlan`, `AiCoachChatResponse`, `PreferencesBundle`, `UserDataExport`, `Envelope<T>`, `ApiErrorBody`.
- **Acceptance:** every recorded fixture JSON is assignable to its DTO type (proven by a `satisfies` test in P12); snake_case preserved for life-areas; no `any`.
- **Out of scope:** adapters, view models.
- **Deps:** none.

### P3 — Session state machine + SecureStore + refresh
- **Target files:** modify `src/services/auth/session.ts`; create `src/services/auth/session-machine.ts` (pure reducer), `src/services/auth/session-provider.tsx`; modify `src/types/pilot.ts` (session type).
- **Embed:** current `session.ts`; ADR-2 schema + state machine; `login/refresh/logout/me` DTO shapes from P2; the `expiresIn:900`→`accessTokenExpiresAt` derivation; `SKEW_MS`; refresh-mismatch → `expired`; wire `apiFetch` setters (`setRefreshHandler`, `setStaleGuard`).
- **Contracts embedded:** `StoredSession` (ADR-2); `sessionReducer(state, event)` pure; `SessionProvider` exposing `{status, user, signIn, signOut, refresh}` via context; `ensureFreshToken()`, `refreshSession()`.
- **Acceptance:** reducer is pure (unit-tested P12); refresh rotates and re-stores; replay of an old refresh (401 mismatch) → `expired`; sign-out nulls server token best-effort + clears store; boot hydrates then validates via `/auth/me`.
- **Out of scope:** UI screens, query invalidation calls (P4 provides `queryClient`).
- **Deps:** P1, P2.

### P4 — TanStack Query keys, provider integration, domain hooks scaffold
- **Target files:** create `src/services/query/keys.ts`, `src/services/query/client.ts`; modify `src/app/_layout.tsx` (wrap `SessionProvider` inside `QueryClientProvider`); create `src/hooks/{use-overview.ts, use-missions.ts, use-gamification.ts, use-life-areas.ts, use-fitness.ts, use-preferences.ts, use-onboarding-status.ts}` (return typed VM + status; call adapters from P5 — import type only until P5 lands, stub `queryFn` to raw DTO fetch).
- **Embed:** ADR-4 keys, staleTimes, retry policy; current `_layout.tsx`; the sign-in/out invalidation contract (`SessionProvider` receives `queryClient`).
- **Acceptance:** keys factory typed `as const`; `QueryClient` retry only 5xx ×3 exp; sign-out clears cache; hooks compile.
- **Out of scope:** adapter bodies (P5), screen wiring.
- **Deps:** P1, P2 (P3 for provider order).

### P5 — Adapter layer + view models (Today, Missions, Life Areas, Fitness, Gamification)
- **Target files:** create `src/services/adapters/{overview.ts, missions.ts, life-areas.ts, fitness.ts, gamification.ts, provenance.ts}`; create `src/viewmodels/{index.ts}`; modify `src/services/api/pilot.ts` (**delete `getFitnessDashboard` fabrication**; endpoints return raw DTOs, adapters map).
- **Embed:** DTO types (P2); `Provenance`/`Metric` (ADR-3); **explicit mapping tables**: overview→TodayVM (Life Power = `lifeScore.totalScore` honest-null; pulse metrics carry `source`), unified-goal→MissionVM (**tier derivation: `isPrimary && source==='life'`→'life'; `isPrimary`→'main'; else by `source`/`cadence`; status map `active/in_progress→active`, `paused→blocked`, `completed→complete`** — documented, deterministic, no invention), life-areas snake_case→LifeAreaVM (`display_name→name`, `momentum→score` honest-null, **no server `trend`/`drivers` → honest-null, not zeros**), workouts→FitnessVM (`plans` count real; **score/recovery/minutes → honest-null**, no fabrication), gamification→StatsVM (`currentLevel→level`, `totalXP→xp`, `currentStreak→streak`; **`lifePower` removed** — sourced from overview).
- **Acceptance (hard):** grep proves **zero** hardcoded metric literals; every fresh-fixture field that is `null` maps to `provenance.kind:'null'` with `value:null`; contract tests (P12) green against recorded fixtures.
- **Out of scope:** Cia (P6), trust (P9), UI.
- **Deps:** P2 (P4 for hook signatures).

### P6 — Cia chat contract + hook + conversation reducer
- **Target files:** modify `src/services/api/pilot.ts` (`postCiaChat` → typed `AiCoachChatResponse`, threads `sessionId`, `isOnboarding` param); create `src/hooks/use-cia-chat.ts`, `src/services/adapters/cia.ts`.
- **Embed:** `AiCoachChatResponse` (P2); ADR-5 (non-streaming, session-stateful, optimistic pending, 402 gated state, `Cia` naming, `routingChip` opaque); current `postCiaChat`.
- **Contracts embedded:** `CiaMessageVM{id,role,text,phase?,pending?,failed?}`; `sendMessage(text, {isOnboarding})`; reducer for optimistic append/replace/fail.
- **Acceptance:** synchronous response mapped to a Cia bubble; `sessionId` threaded across turns; 402 yields `gated` state not a fake reply; no streaming consumer; visible copy `Cia`.
- **Out of scope:** streaming/socket transport (OQ-3), onboarding UI layout.
- **Deps:** P2.

### P7 — Canon state components (native)
- **Target files:** modify `src/components/balencia/states.tsx`; export via `src/components/balencia/index.ts`.
- **Embed:** current `states.tsx`; theme tokens; ADR-7 component table + `Provenance` type (P5 or duplicate the type locally to avoid cycle — embed the type).
- **Acceptance:** `SkeletonState/ErrorState(onRetry)/HonestNullState/ProvenanceChip/OfflineBanner/LockedFeatureState` render with kit tokens; 44px targets; reduced-motion safe; `LoadingState` aliased for back-compat.
- **Out of scope:** screen wiring.
- **Deps:** none (tokens only).

### P8 — Vitest test infrastructure
- **Target files:** create `vitest.config.ts`; modify `package.json` (devDeps + scripts per ADR-8); create `src/services/adapters/__fixtures__/` (copy the 10 endpoint-sample JSONs).
- **Embed:** ADR-8 config, script strings, fixture file list.
- **Acceptance:** `npm run test:unit` runs (0 tests OK initially); `npm run test` runs manifest verifier **then** vitest; `@`→`src` alias resolves; environment `node`.
- **Out of scope:** writing the tests (P12).
- **Deps:** none.

### P9 — Trust/data-controls services + adapters
- **Target files:** create `src/services/api/trust.ts` (`exportMyData`, `deleteMyAccount`, `getPreferences`, `updatePrivacy`), `src/services/adapters/trust.ts`, `src/hooks/use-trust.ts`.
- **Embed:** DTO shapes (P2); ADR-9 table; **pinned constant `DELETE_ACCOUNT_CONFIRMATION = 'DELETE MY ACCOUNT'`**; export truncation honesty (`counts`); W6 gated list.
- **Contracts embedded:** `deleteMyAccount({password?, confirmation})`; `PrivacyPrefsVM`; export result VM with truncation flag.
- **Acceptance:** delete sends exact confirmation phrase; password field logic (required iff password account); privacy PATCH invalidates `preferences`; gated features render provenance, never faked.
- **Out of scope:** UI layout (P11), consent audit (gap OQ-5).
- **Deps:** P2 (P4 hooks).

### P10 — Wire Today / Missions / Life Areas / Fitness screens to adapters + states
- **Target files:** modify `src/features/today/today-screen.tsx`, `src/features/missions/missions-screen.tsx`, `src/features/life-areas/life-areas-screen.tsx`, `src/features/fitness/fitness-screen.tsx`; retire `src/hooks/use-pilot-data.ts` fabrication path (replace `apiReady?data:fixture` with real hooks + honest states; keep demo fixture only behind an explicit `demo` flag, not as a silent fallback for errors).
- **Embed:** the four hooks' return types (P4/P5); state components (P7); canon layout notes per screen (skim `hifi-screens/`); the rule that **query error → `ErrorState` with retry, empty/null → `HonestNullState`, loading → `SkeletonState`** (no silent fixture substitution).
- **Acceptance:** each screen renders pending/error/honest-null/real from live data; Life Power shows honest-null on fresh account; **no fabricated fitness numbers on screen**; `usePilotData` fabrication removed.
- **Out of scope:** Cia/onboarding, sign-in, data-controls (P11).
- **Deps:** P4, P5, P7.

### P11 — Wire Cia + onboarding, Sign-in/session UX, Data-controls
- **Target files:** modify `src/features/cia/cia-screen.tsx`, `src/features/cia/cia-onboarding-screen.tsx`, `src/features/auth/sign-in-screen.tsx`, `src/features/trust/data-controls-screen.tsx`, `src/features/trust/me-screen.tsx`, `src/app/(auth)/sign-in.tsx`.
- **Embed:** `use-cia-chat` (P6), `use-trust` (P9), `SessionProvider` (P3); session-expired UX copy; 402 gated state; delete two-step confirm; ADR-5 `Cia` naming; onboarding gated by `/auth/onboarding-status`.
- **Acceptance:** sign-in drives `SessionProvider.signIn`; expired session routes to sign-in with canon notice; Cia optimistic + honest error/gated; delete requires exact phrase + password; privacy toggles persist.
- **Out of scope:** the four data-driven screens (P10).
- **Deps:** P3, P6, P9, P7.

### P12 — Contract + unit tests (adapters, session reducer, provenance)
- **Target files:** create `src/services/adapters/*.test.ts`, `src/services/auth/session-machine.test.ts`, `src/services/query/keys.test.ts`, `src/services/api/dto/dto.satisfies.test.ts`.
- **Embed:** ADR-3 contract-test rules; fixture paths (P8); adapters (P5/P9); reducer (P3).
- **Acceptance (hard gate):** every recorded fixture parses into its adapter without throwing; fresh-account fixtures assert honest-null (value `null` + provenance `null`); a test asserts **no adapter emits a number for a fixture-null field** (the anti-fabrication test); session reducer transitions proven incl. refresh-mismatch→expired; `vitest run` green; `tsc --noEmit` clean.
- **Out of scope:** RN component rendering, e2e.
- **Deps:** all.

---

## 5. ROADMAP (BIOS-002…BIOS-012)

| ID | Title | Scope summary | Entry criteria | Key risks |
|---|---|---|---|---|
| **BIOS-002** | Simulator + real backend contracts | *(in progress)* Local backend up; 7 slices wired to live DTOs via honest adapters; session machine; Vitest; simulator smoke | READINESS-001 waivers; local backend booted | Backend drift; honesty regressions; GLM packet under-specification |
| BIOS-003 | Auth hardening + multi-device | Session table / multi-refresh (OQ-1); social (Google/Apple) sign-in; token security review | 002 closed; backend session-model decision (Hamza/OQ-1) | Backend refresh-token model change; OAuth verification spoof risk (server risk noted) |
| BIOS-004 | Today + Missions hi-fi parity | Deepen visual parity to hifi-screens; GlassNavBar; motion; density tiers | 002 adapters stable; W-007 re-review of affected screens | Design canon drift (W5); reanimated perf |
| BIOS-005 | Cia coach full experience | Streaming transport decision (OQ-3); insights/suggestedActions UI; image analysis; MCQ onboarding | Socket/`chat.routes` traced; entitlement plan confirmed | Streaming transport unknown; credit/entitlement 402 flows |
| BIOS-006 | Life Areas + LCM | `/v1/intelligence/lcm` 10-domain matrix; per-area trend/drivers (needs backend) | LCM contract traced; life-areas trend source decided | No server trend/drivers today (gap) |
| BIOS-007 | Fitness + wearable | Real workout plans render (JSONB), today's workout, consistency heatmap, WHOOP provenance | Workout JSONB types traced; wearable contract | Free-form JSONB; wearable data absent |
| BIOS-008 | Gamification + leaderboards | XP history, level progress, daily-score, leaderboards | gamification/leaderboard contracts traced | `req.user.id` vs `.userId` inconsistency (server risk) |
| BIOS-009 | Trust center + consent | Export UX, privacy, consent history (needs backend), account delete polish | Consent-audit endpoint exists (OQ-5) | No consent audit endpoint today (gap) |
| BIOS-010 | Social / squads / communities | Feed, pledges, reputation, groups | social-growth contracts traced | Large surface; MVP-optional |
| BIOS-011 | Offline + resilience | Cache persistence, offline banner behavior, retry policy hardening | Query persistence strategy chosen | No offline layer today |
| BIOS-012 | Store readiness | EAS build/submit, TestFlight metadata (W2/W3), privacy URLs | Apple team + metadata (Hamza) | W2/W3 waivers unresolved |

---

## 6. Open questions / waivers carried (never silent)

- **OQ-1 (Hamza/backend):** single refresh-token-per-user silently logs out other devices. This batch **detects** (expired→sign-in), does not solve. Backend session table = BIOS-003.
- **OQ-2 (backend):** `ConversationPhase` enum values un-traced — no UI branches on `phase` this batch.
- **OQ-3 (backend):** is the production coach a socket/streaming transport (`chat.routes.ts`/`socket.service.ts`)? `/ai-coach/chat` is confirmed synchronous; streaming is a BIOS-005 entry criterion.
- **OQ-4 (backend):** account delete is immediate hard-delete, no grace period — copy must not promise undo.
- **OQ-5 (backend):** no consent-audit/history endpoint exists — data-controls renders an honest "not available yet" state, no fabrication.
- **OQ-6 (backend):** `req.user.id` (gamification) vs `req.user.userId` (elsewhere) inconsistency — verify one-line type before trusting gamification userId (BIOS-008 risk).
- **W1 (Hamza):** `mobile/.env` server-grade env hygiene — app reads only `EXPO_PUBLIC_*`; never read/printed this batch.
- **W4:** local dev-DB seeded account only; production QA account untouched.
- **W5:** 40 hi-fi screens await Lane A re-review; slices follow canon + current hi-fi; FIX-FILED screens not treated as final.
- **W6:** finance/WhatsApp/documents/wearable stay visible-but-gated with provenance; never faked.
- **GLM-boot caveat:** local backend needs an LLM provider (module-scope singleton); dev uses GLM via Z.ai Anthropic-compatible base URL — **local dev only**, synthetic seeded data only, never a production posture.

---

## 7. Verification gate (this batch)

`npm run lint && npm run typecheck && npm run test` (manifest verifier + `vitest run`) `&& npx expo config --type public && npx expo export --platform web --output-dir dist-smoke` — from `yhealth-app/mobile`; plus iOS Simulator smoke (screenshots of all 7 slices, empty-state truth) + a real-endpoint exercise log against `127.0.0.1:9090`. **Definition of done:** strict typecheck clean · lint clean · contract + unit tests green against recorded fixtures · zero fabricated numbers (anti-fabrication test passes) · simulator screenshots captured · GLM-vs-Claude split recorded · spec + ROADMAP + handoff updated · submodule committed + pinned SHA updated.