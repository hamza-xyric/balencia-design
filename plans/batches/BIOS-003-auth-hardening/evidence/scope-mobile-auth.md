# Mobile Auth Implementation Inventory

## 1. Authentication Routes (src/app/(auth)/)

### Route Structure
- **src/app/(auth)/_layout.tsx** (1–14): Stack-based layout with `headerShown: false` and `ink900` background. Wraps both sign-in and onboarding routes.
- **src/app/(auth)/sign-in.tsx** (1–3): Routes to `SignInScreen` component.
- **src/app/(auth)/onboarding.tsx** (1–3): Routes to `CiaOnboardingScreen` component.

### Sign-In UI Structure
**src/app/(auth)/sign-in.tsx** → **src/features/auth/sign-in-screen.tsx** (10–119):
- Wraps in `KeyboardAvoidingView` with platform-specific padding behavior (iOS).
- Email/password inputs with secure text entry, placeholder colors from `BalenciaColors.paper55`.
- Form validation: email and password required to enable sign-in button.
- Error states: displays `ErrorState` component for expired session (`status === 'expired'`) or catch-block errors.
- Button disabled during `status === 'authenticating'`.
- On successful sign-in, checks `onboardingStatus?.isComplete` and redirects to `/(auth)/onboarding` or `/(tabs)/today`.

### Onboarding Route
**src/app/(auth)/onboarding.tsx** → **src/features/cia/cia-onboarding-screen.tsx** (10–174):
- Two onboarding modes: "Quick calibration" (ready, startsChat=true) and "Deep life map" (flagged, startsChat=false).
- Cia-driven chat interface with multi-message conversation.
- Dispatch to `/ai-coach/chat` endpoint via `sendCiaChat()`.
- Gate handling: `feature_disabled`, `plan_upgrade_required`, `credits_exhausted` states with corresponding UI branches.
- Continue button only enabled after Cia has replied (`hasCiaReplied`).
- "Skip for now" button allows bypass to `/(tabs)/today`.

---

## 2. SessionProvider State Machine

### File: src/services/auth/session-machine.ts (1–89)

**SessionStatus Type** (3–9):
```
'booting' | 'unauthenticated' | 'authenticating' | 'authenticated' | 'refreshing' | 'expired'
```

**SessionState Structure** (11–15):
```typescript
{
  status: SessionStatus;
  user: PublicUserProfileDto | null;
  error: string | null;
}
```

**SessionEvent Types** (17–27):
- `HYDRATED`: Optimistic restore from SecureStore.
- `NO_SESSION`: No stored session found at boot.
- `SIGN_IN_START` / `SIGN_IN_SUCCESS` / `SIGN_IN_FAILURE`: Sign-in flow.
- `REFRESH_START` / `REFRESH_SUCCESS` / `REFRESH_FAILURE`: Token refresh cycle.
- `USER_UPDATED`: Background fetch of `/auth/me` updates user profile.
- `SIGNED_OUT`: Clear session and transition to unauthenticated.

**State Transitions** (35–89):
- Initial: `booting` → `authenticated` (if hydrated) or `unauthenticated` (if no session).
- `REFRESH_FAILURE` transitions to `expired` (line 74) and triggers global session-death handler.
- Idempotent guards: `SIGN_IN_START` ignores if already `authenticating` or `authenticated` (line 44–46).
- `REFRESH_SUCCESS` only accepted from `refreshing` state (line 67–71).
- `USER_UPDATED` accepted from `authenticated` or `refreshing` (line 77).

### File: src/services/auth/session-provider.tsx (1–205)

**SessionContextValue API** (41–48):
```typescript
{
  status: SessionStatus;
  user: PublicUserProfileDto | null;
  error: string | null;
  signIn(email: string, password: string): Promise<void>;
  signOut(): Promise<void>;
  refreshUser(): Promise<void>;
}
```

**Boot Flow** (87–123):
1. `getStoredSession()` from SecureStore (line 91).
2. If none, dispatch `NO_SESSION` (line 95).
3. If found, dispatch `HYDRATED` with cached user (line 100) — **optimistic hydration**.
4. Background validation: `/auth/me` fetch (line 104). On `SessionExpiredError`, dispatch `REFRESH_FAILURE` (line 111).
5. Other errors don't clear session (line 114–115) — user stays optimistically authenticated.

**Sign-In Flow** (125–146):
1. Dispatch `SIGN_IN_START` (line 127).
2. POST to `/auth/login` with `skipAuth: true` (line 129–133).
3. On success: `saveSession()` with tokens and user, dispatch `SIGN_IN_SUCCESS`, fire `onSignedIn` callback (line 135–137).
4. On failure: dispatch `SIGN_IN_FAILURE` with error message, re-throw error (line 141–142).

**Sign-Out Flow** (148–158):
1. Best-effort POST to `/auth/logout` (line 150–152), swallow errors (line 152).
2. `clearSession()` from SecureStore (line 155).
3. Dispatch `SIGNED_OUT` (line 156), fire `onAuthCleared` callback (line 157).

**Reactive/Proactive Refresh Setup** (160–181):
- `setAuthTokenProvider(getAccessToken)`: Supplies access token to API client (line 162).
- `setRefreshHandler(refreshSession)`: Single-flight refresh orchestration (line 163).
- `setStaleGuard()`: Pre-request staleness check — if token expired within 60s skew, attempt refresh before the request (line 164–172).
- `setSessionExpiredHandler()`: Global signal — **any `SessionExpiredError` from any API call** transitions app to `expired` state, clears session, and fires `onAuthCleared` (line 176–180). This ensures a multi-device token rotation or universal session death is caught everywhere, not just in `/auth/me` flows.

---

## 3. API Client & Authentication

### File: src/services/api/client.ts (1–263)

**ApiFetchOptions** (4–11):
```typescript
{
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
  skipAuth?: boolean;        // For /auth/login, /auth/refresh, etc.
  retry?: boolean;           // Default: true for GET
  timeoutMs?: number;        // Default: 15000ms
}
```

**Base URL** (13): `API_BASE_URL = Env.apiUrl` from environment (see env.ts below).

**Header Injection** (108–118):
```
Accept: application/json
Content-Type: application/json
X-Client: mobile          // Line 112: marks requests as from mobile client
Authorization: Bearer ${token}  // If not skipAuth
```
Plus any user-supplied headers merged (line 113).

**401 Handling (Reactive)** (227–240):
1. On 401 response (line 227):
2. Call `refreshSession()` (line 228) — attempts `/auth/refresh` with stored refresh token.
3. If refresh **succeeds** (`refreshed === true`, line 229):
   - Retry the original request once (line 230).
   - If retry still 401s (business-logic denial), propagate **original** `ApiError` with server code/message intact (line 231–232). Never mask a real 401 as SessionExpiredError (line 50–56 test confirms this).
4. If refresh **fails** (line 232):
   - Throw `SessionExpiredError` (line 234–238).
   - Call `notifySessionExpired()` to fire the global handler (line 234).
   - Handler transitions app to `expired` state (session-provider.tsx line 176–180).

**Proactive Refresh** (199–201):
- Before each non-`skipAuth` request, call `staleGuard()` if registered (line 199–201).
- `staleGuard` checks if token expires within 60s (SKEW_MS = 60_000) and proactively calls `refreshSession()` (session-provider.tsx line 164–172).

**Retry Logic** (196, 213–259):
- GET requests retry by default; POST/PATCH/PUT/DELETE do not (line 196).
- Retries only on `NetworkError` or 5xx server errors (line 250–251).
- Max 3 attempts with exponential backoff: 1000ms, 2000ms, 4000ms (line 213–214).
- `SessionExpiredError` is **not retried** (line 244–245) — immediately thrown.

**Timeout** (121–143): AbortController-based, default 15s (line 122, 197). Wraps network errors as `NetworkError` (line 137).

---

### File: src/services/auth/session.ts (1–151)

**SecureStore Schema (v1)** (16–23):
```typescript
StoredSession {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;  // Absolute timestamp (Date.now() + expiresIn*1000)
  user: PublicUserProfileDto;
  storedAt: string;              // ISO string
  schemaVersion: 1;
}
```
Stored under key `'balencia.mobile.session.v1'` (line 12).

**Token Expiry Logic** (79–81):
- `isTokenStale(s, skewMs=60000)`: Returns true if `Date.now() >= accessTokenExpiresAt - skewMs`.
- Prevents request-in-flight race: checks 60s before actual expiry (line 80).

**Refresh Endpoint** (86–127):
- Single-flight in-app: `inFlightRefresh` promise (line 84, 185–186 in client.ts also).
- POST `/auth/refresh` with `{ refreshToken }` (line 98–101), `skipAuth: true`.
- Response shape: `{ tokens: AuthTokensDto }` (line 98).
- On success: save new tokens, keep old user object (line 104–107).
- **Multi-Device Caveat** (line 116–119): Server stores one refresh token per user. If token mismatch (another device rotated), session is cleared locally.
- On 401 or `SessionExpiredError` during refresh, clear session (line 111–119).

**Persistence** (39–77):
- `saveSession(input: { user, tokens })`: Calculates `accessTokenExpiresAt`, stores to SecureStore JSON (line 39–54).
- `getStoredSession()`: Retrieves, validates schema (line 56–73), clears on parse failure (line 71).
- `clearSession()`: Deletes from SecureStore (line 75–77).

---

### File: src/services/api/errors.ts (1–25)

**Error Hierarchy**:
```typescript
ApiError {
  message: string;
  status: number;
  code?: string;        // Server error code (e.g., "UNAUTHORIZED", "INVALID_CREDENTIALS")
  requestId?: string;   // From server envelope
  details?: unknown;    // Parsed response body errors array
}
SessionExpiredError extends ApiError {}
NetworkError extends ApiError {}
```

---

## 4. Authentication Tests

### Unit: src/services/auth/session-machine.test.ts (1–60)

**Assertions**:
- State transitions: `HYDRATED`, `NO_SESSION`, `SIGN_IN_START/SUCCESS/FAILURE`, `REFRESH_START/SUCCESS/FAILURE`, `USER_UPDATED`, `SIGNED_OUT` (line 13–52).
- Idempotent guards: `REFRESH_SUCCESS` on non-`refreshing` state is ignored (line 55–59).

### Integration: src/services/api/client.401.test.ts (1–84)

**Test Suite: "apiFetch 401 semantics"** — focuses on the business-logic vs session-death distinction.

- **Test 1** (42–56): Refresh succeeds, retry still 401s → **propagates original `ApiError`, not `SessionExpiredError`**. The expired handler should not fire.
- **Test 2** (58–67): Refresh itself fails → **throws `SessionExpiredError` and fires the global handler** (line 65). No retry without a fresh token (line 66).
- **Test 3** (69–83): `skipAuth: true` requests ignore the refresh dance. No refresh handler call, no expired handler call.

**Verification**: All tests use mocked `fetch` with mocked `setRefreshHandler`, `setSessionExpiredHandler`, `setStaleGuard` (line 30–35).

---

## 5. Design System Components (src/components/balencia/)

### Component Export Index: src/components/balencia/index.ts (1–6)

Exports from:
- `./button`: `BalenciaButton` (likely accepts `onPress`, `disabled`, `tone`; see sign-in-screen.tsx line 84–89).
- `./card`: `GlassCard`, `CardTitle`, `CardBody` (glassmorphism cards; see sign-in-screen.tsx line 45–50).
- `./charts`: Visualization components (Recharts-based, per CLAUDE.md tech stack).
- `./chips`: `StatusChip` (line 93 in onboarding-screen shows `tone` prop).
- `./screen`: `BalenciaScreen` (wraps full screens with eyebrow, title, subtitle).
- `./states`: `ErrorState`, `SkeletonState`, `LockedFeatureState`, `ReadinessBadge` (loading, error, and gated-feature states).

### Theme Tokens: src/constants/theme.ts (1–86)

**Balencia Color Palette**:
- `ink900: '#0A0A0F'` (screen background, line 4)
- `ink950: '#050306'`
- `inkBrown800: '#211008'` (card surfaces)
- `paper100: '#FEFAF3'` (primary text)
- `orange: '#FF5E00'` (brand primary, line 14)
- `green: '#34A853'` (success, line 16)
- `purple: '#7F24FF'` (AI/Cia indicator, line 18)
- `*Soft` variants: low-opacity overlays (e.g., `orangeSoft: 'rgba(255, 94, 0, 0.18)'`, line 15).

**Spacing Scale**:
- `half: 2, one: 4, two: 8, three: 16, four: 24, five: 32, six: 64` px (line 66–74).

**Radius**: `sm: 8, md: 12, lg: 18, xl: 24` (line 76–81).

**Touch Target**: 44px minimum (line 83, per MOBILE RULES in AGENTS.md).

**Safe Area Insets**: `BottomTabInset: ios 58 | android 76` (line 84).

**Font Families** (Platform.select):
- iOS: `system-ui`, `ui-serif`, `ui-rounded`, `ui-monospace`.
- Other: `serif`, `monospace` (line 45–64).

---

## 6. Deep-Link & OAuth Configuration

### app.json (1–79)

**URL Scheme** (8): `"scheme": "balencia"` — enables deep links like `balencia://auth/reset-password`.

**iOS OAuth Redirect** (20–26):
```json
"CFBundleURLTypes": [
  {
    "CFBundleURLSchemes": [
      "com.googleusercontent.apps.567394348304-nt0jprqnd9gjh67j8hv52me2rln2of58"
    ]
  }
]
```
Google OAuth client ID embedded for OAuth redirect callback (line 23–24).

**Bundle ID**: `ai.xyric.balencia` (line 12) — ASC identifier.

**Secure Store Plugin Config** (54–59):
- `configureAndroidBackup: true`: Enable encrypted backup on Android.
- Face ID permission prompt (line 57–58).

**Expo Updates** (72–77): OTA update endpoint configured (no custom deep-link rules beyond OAuth).

### eas.json (1–62)

**Build Profiles**:
- `development`, `simulator`, `preview`, `production` (line 5–49).
- Each sets `EXPO_PUBLIC_API_URL`, `EXPO_PUBLIC_SOCKET_URL`, `EXPO_PUBLIC_GOOGLE_CLIENT_ID` variants (line 19–24 for simulator).

**Submit Profile** (50–61):
- iOS only, production channel.
- ASC credentials (App Store Connect API key path, issuer, key ID) for automated TestFlight/ASC submission (line 52–59).

---

## 7. Authentication Dependencies

### package.json (1–59)

**Auth-Relevant Dependencies**:
- `expo-secure-store@~57.0.0` (line 16): Store tokens in encrypted device storage.
- `expo-linking@~57.0.2` (line 14): Handle deep links from password-reset emails, OAuth redirects.
- `expo-web-browser@~57.0.0` (line 22): For OAuth session opens (if used).
- `expo-router@~57.0.4` (line 15): File-based routing and protected route guards.
- `@tanstack/react-query@^5.90.12` (line 7): Server state management (used for `/auth/me` polling, onboarding status, etc.).
- `react-native-safe-area-context@~5.7.0` (line 28): Safe area handling for notches, home indicators.

**OAuth/Apple Auth**:
- **NOT present**: `expo-auth-session`, `expo-apple-authentication`, `@invertase/react-native-apple-authentication`.
- Current implementation is email/password only (line 84–89 in sign-in-screen.tsx).

---

## 8. Environment & Config

### src/config/env.ts (1–32)

**Public Env Variables** (read at runtime):
- `EXPO_PUBLIC_API_URL`: Backend base URL (default dev: `http://localhost:5000/api`).
- `EXPO_PUBLIC_SOCKET_URL`: WebSocket endpoint (derived from API URL if not set).
- `EXPO_PUBLIC_GOOGLE_CLIENT_ID`: Desktop OAuth client ID.
- `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID`: Web OAuth fallback.
- `EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID`: iOS-specific OAuth client ID.

**Validation** (24–30): URLs must be valid (line 26) or boot fails (line 28).

---

## 9. Session Management Wiring

### Root Layout: src/app/_layout.tsx (1–53)

- Wraps entire app in `SessionProvider` (line 32).
- Registers `onSignedIn` and `onAuthCleared` callbacks from query client (line 32).
- `onSignedIn` callback triggers cache invalidation (queryClient refetch/reset).
- `onAuthCleared` callback purges cached queries (line 10, from query/client).
- Fires `SplashScreen.hideAsync()` after boot (line 27).

### Root Index: src/app/index.tsx (1–34)

- Route guard: `booting` → skeleton, `authenticated/refreshing` → redirect to `/(tabs)/today`, else → redirect to `/(auth)/sign-in` (line 9–23).

### Tabs Layout: src/app/(tabs)/_layout.tsx (1–46)

- Route guard: `unauthenticated` or `expired` → redirect to `/(auth)/sign-in` (line 10–11).
- Renders `NativeTabs` only if authenticated (line 14–44).

---

## Summary

| Component | Location | Key Responsibility |
|-----------|----------|-------------------|
| **Session State Machine** | session-machine.ts | Finite state automaton (`booting` → `unauthenticated` ↔ `authenticating` ↔ `authenticated` ↔ `refreshing`; terminal: `expired`). |
| **SessionProvider** | session-provider.tsx | Hydration, sign-in/out, token refresh, global expiry handler registration. |
| **API Client** | client.ts | Base URL, header injection (`X-Client: mobile`), 401 interception, single-flight refresh, retry logic. |
| **SecureStore Schema** | session.ts | Versioned (`v1`) storage: accessToken, refreshToken, expiresAt, user profile. Multi-device awareness (refresh token rotation = local clear). |
| **Error Hierarchy** | errors.ts | `ApiError` (code, requestId, details) → `SessionExpiredError` → `NetworkError`. |
| **Sign-In Screen** | features/auth/sign-in-screen.tsx | Email/password form, keyboard safety, optimistic button disable, error + expired states. |
| **Onboarding Screen** | features/cia/cia-onboarding-screen.tsx | Cia-driven chat, mode selection, gating, consent baseline. |
| **Route Guards** | app/index.tsx, (tabs)/_layout.tsx | Redirect based on session status. |
| **Deep-Link Setup** | app.json, eas.json | URL scheme `balencia://`, iOS OAuth redirect, ASC submission config. |
| **Theme Tokens** | constants/theme.ts | Warm-dark palette (ink900, paper100, orange, green, purple), 44px touch target, spacing scale. |

---

## Gaps & Not Yet Implemented

- **OAuth providers** (`expo-auth-session`, Apple Sign-In): Environment configured in eas.json but not wired to UI.
- **Password reset deep-links**: URL scheme exists (`balencia://`) but no password-reset route in `src/app/` or link handler.
- **Logout success confirmation**: Logout fires best-effort POST but no feedback screen.
- **Rate limiting**: No client-side backoff or server rate-limit header handling.
- **Biometric unlock** (`expo-secure-store` Face ID plugin configured but no PIN/biometric sign-in flow).
