# Packet MP1 — Mobile session alignment: device identity, `adoptSession`, this-device logout

## Objective

BIOS-003 moves the server from a single-slot refresh token to per-device `user_sessions` (ADR-1/ADR-2/ADR-3, architecture-plan.md §3–§6). The server-side contract is **frozen and add-only** — `/login`, `/register`→`/verify-registration`, `/social`, `/refresh`, `/logout` all keep their exact current request/response shapes (scope-server-auth.md §1, §2, §5 of architecture-plan.md). Nothing in this packet changes any HTTP contract. This packet does three purely mobile things so the client is ready to participate in the per-device model and so two upcoming packets (MP5 registration/OTP, MP7 social sign-in) have a session-adoption entry point that does not require a second `/login` round-trip:

1. **Stable per-install device identity.** A `getDeviceId()` that generates a UUID once, persists it in SecureStore, and reuses it forever after — plus a best-effort, non-PII `getDeviceName()` label. Both are sent as `X-Device-Id` / `X-Device-Name` headers on every API request so the server's session-creating endpoints (SP5: login/register/social) can name the `user_sessions` row from the very first request (architecture-plan.md §7 SP5: "read `X-Device-Id`/`X-Device-Name`/`X-Client`/UA").
2. **`adoptSession(tokens, user)`** on `SessionProvider` — a session-establishing entry point distinct from `signIn(email, password)`, for flows that already have a token pair from a non-login endpoint: `POST /verify-registration` (ADR-8, returns `{user, tokens, nextStep}`) and `POST /social` (ADR-7, returns `{user, tokens, isNewUser, needsProfileCompletion, nextStep?}`). Both response shapes are traced in scope-server-auth.md §1 and match the existing `AuthTokensDto` / `PublicUserProfileDto` types already in `src/services/api/dto/auth.ts` — no DTO changes needed here.
3. **This-device sign-out semantics + stale-comment cleanup.** `signOut()` already issues a no-body `POST /auth/logout`, which is byte-for-byte what ADR-4 requires for "this-device" default (`{allDevices?: boolean}` optional, default `false`, server-side SP7 — out of scope here, but the client's existing no-body call is already correct and must not change). The BIOS-002-era comment in `session.ts` claiming a refresh mismatch means "another device rotated it" is now **factually wrong** once SP1–SP8 ship (each device has its own independent session row; a 401/expired here means *this* device's session was revoked or replayed, not cross-device contention) and must be corrected.

**Plan-vs-implementation issue found and resolved in this packet (flagged per task instructions):** architecture-plan.md §6 describes `adoptSession` as dispatching the existing `SIGN_IN_SUCCESS` event. Live `session-machine.ts`'s `SIGN_IN_SUCCESS` case is **guarded** — it only transitions when `state.status === 'authenticating'`:
```ts
case 'SIGN_IN_SUCCESS': {
  if (state.status !== 'authenticating') {
    return state;
  }
  return { status: 'authenticated', user: event.user, error: null };
}
```
`adoptSession` will be called from `verify-registration` (a screen flow driven by a *separate* `RegistrationFlow` reducer per ADR-8 — the `SessionProvider`'s own status is `'unauthenticated'` or `'booting'` at that point, never `'authenticating'`, because no `signIn()` call ever ran) and from social sign-in (same issue — no `SIGN_IN_START` was ever dispatched). Dispatching `SIGN_IN_SUCCESS` as literally specified would silently no-op due to this guard, leaving the app's session status stuck on `'unauthenticated'` after a real, valid token pair was saved — a real bug, not a hypothetical one. **Resolution:** this packet removes the `state.status !== 'authenticating'` guard so `SIGN_IN_SUCCESS` transitions to `'authenticated'` unconditionally, regardless of prior status (mirroring how `HYDRATED` already has no guard). This preserves the literal event name the plan specifies while making the transition actually fire from every legitimate caller. Verified safe against the existing test (`session-machine.test.ts` only ever dispatches `SIGN_IN_SUCCESS` from `'authenticating'`, so its assertions are unaffected by widening the guard).

## Target files (exact absolute paths, create vs modify)

**Create:**
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/services/auth/device.ts` — new module: `getDeviceId()`, `getDeviceName()`, `getDeviceHeaders()`. Not explicitly named as a target file in architecture-plan.md §7's one-line MP1 stub, but required to implement contract item (1) without cramming device concerns into `session.ts` (which owns session *storage*, not device identity) or `client.ts` (which must stay transport-only and receive device data via an injected provider, mirroring the existing `authTokenProvider` pattern). This is the same "provider pattern" `client.ts` already uses for tokens — see Embedded current source below.

**Modify:**
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/services/api/client.ts` — add `setDeviceHeadersProvider`, inject `X-Device-Id` / `X-Device-Name` headers in `attemptFetch`.
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/services/auth/session-provider.tsx` — add `adoptSession`, register the device-headers provider, update the `signOut` comment.
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/services/auth/session-machine.ts` — widen the `SIGN_IN_SUCCESS` guard (see "Plan-vs-implementation issue" above).
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/services/auth/session.ts` — comment-only change: replace the stale "another device rotated it" caveat.
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/package.json` — add one new dependency, `expo-crypto` (justification below).

**Do not touch (read-only context, embedded below so names/shapes are exact):**
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/services/api/errors.ts`
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/services/api/dto/auth.ts`
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/config/env.ts`
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/app/_layout.tsx` (context only — shows how `SessionProvider` is consumed; do not modify)

**New dependency decision (`expo-crypto`) — resolves an ambiguity in the task brief.** The brief asked to check package.json and pin whichever of "`expo-crypto`'s `randomUUID`" or "global `crypto.randomUUID` in Hermes" actually exists. Verified live: `package.json` has **no** `expo-crypto`, **no** `react-native-get-random-values`, **no** `uuid`/polyfill package of any kind, and no existing `crypto`/`randomUUID` usage anywhere under `src/` (confirmed by repo-wide grep). React Native 0.86 / Hermes does not guarantee a spec-compliant global `crypto.randomUUID` without a polyfill, and the brief explicitly rules out a `Math.random()`-based hand-rolled UUID (not cryptographically strong — wrong tool for a value that will be persisted server-side as `user_sessions.device_id`). architecture-plan.md ADR-7 already establishes the precedent of adding small, justified, Expo-Go-compatible Expo modules for this exact batch (`expo-apple-authentication`, `expo-auth-session`) rather than hand-rolling security-adjacent primitives (this mirrors ADR-5's `jose`-over-hand-rolled-JWKS reasoning). **Decision: add `expo-crypto` (`~57.0.0`, matching the SDK-57 pin pattern every other `expo-*` dependency in this file already uses) and call its synchronous `Crypto.randomUUID()`.** This is a one-line, Expo-Go-compatible addition, not a new native-module risk (`expo-crypto` has no config-plugin/native-linking requirement beyond the standard Expo autolinking already in use). Per `yhealth-app/CLAUDE.md` §1 "Stack rule": this is the one-line justification for the new dependency.

## Embedded current source

### FULL file: `src/services/auth/session.ts` (151 lines, verified live)

```ts
import * as SecureStore from 'expo-secure-store';

import { apiFetch } from '@/services/api/client';
import { ApiError, SessionExpiredError } from '@/services/api/errors';
import type {
  AuthTokensDto,
  LoginResponseDto,
  MeResponseDto,
  PublicUserProfileDto,
} from '@/services/api/dto/auth';

const SESSION_KEY = 'balencia.mobile.session.v1';
const SKEW_MS = 60_000;
const SCHEMA_VERSION = 1;

export type StoredSession = {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
  user: PublicUserProfileDto;
  storedAt: string;
  schemaVersion: 1;
};

function hasRequiredFields(value: unknown): value is StoredSession {
  if (typeof value !== 'object' || value === null) return false;
  const s = value as Record<string, unknown>;
  return (
    typeof s.accessToken === 'string' &&
    typeof s.refreshToken === 'string' &&
    typeof s.accessTokenExpiresAt === 'number' &&
    typeof s.user === 'object' &&
    s.user !== null &&
    typeof s.storedAt === 'string' &&
    s.schemaVersion === SCHEMA_VERSION
  );
}

export async function saveSession(input: {
  user: PublicUserProfileDto;
  tokens: AuthTokensDto;
}): Promise<StoredSession> {
  const expiresInMs = (input.tokens.expiresIn ?? 900) * 1000;
  const session: StoredSession = {
    accessToken: input.tokens.accessToken,
    refreshToken: input.tokens.refreshToken,
    accessTokenExpiresAt: Date.now() + expiresInMs,
    user: input.user,
    storedAt: new Date().toISOString(),
    schemaVersion: 1,
  };
  await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(session));
  return session;
}

export async function getStoredSession(): Promise<StoredSession | null> {
  const raw = await SecureStore.getItemAsync(SESSION_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (hasRequiredFields(parsed)) {
      return parsed;
    }
  } catch {
    // fall through to clear
  }

  await clearSession();
  return null;
}

export async function clearSession(): Promise<void> {
  await SecureStore.deleteItemAsync(SESSION_KEY);
}

export function isTokenStale(s: StoredSession, skewMs: number = SKEW_MS): boolean {
  return Date.now() >= s.accessTokenExpiresAt - skewMs;
}

// Single-flight refresh logic shared with the API client
let inFlightRefresh: Promise<boolean> | null = null;

export async function refreshSession(): Promise<boolean> {
  if (inFlightRefresh) {
    return inFlightRefresh;
  }

  inFlightRefresh = (async () => {
    const session = await getStoredSession();
    if (!session || !session.refreshToken) {
      return false;
    }

    try {
      const data = await apiFetch<{ tokens: AuthTokensDto }>('/auth/refresh', {
        method: 'POST',
        skipAuth: true,
        body: { refreshToken: session.refreshToken },
      });

      await saveSession({
        user: session.user,
        tokens: data.tokens,
      });

      return true;
    } catch (error) {
      const isMismatchOrExpired =
        error instanceof SessionExpiredError ||
        (error instanceof ApiError && error.status === 401);

      if (isMismatchOrExpired) {
        // Multi-device caveat: server stores ONE refresh token per user.
        // A mismatch means another device rotated it. We transition to expired.
        await clearSession();
      }
      return false;
    } finally {
      inFlightRefresh = null;
    }
  })();

  return inFlightRefresh;
}

// Re-exporting types and functions used elsewhere to maintain backwards compatibility if needed
export async function getAccessToken(): Promise<string | null> {
  const session = await getStoredSession();
  return session?.accessToken ?? null;
}

export async function updateStoredUser(user: PublicUserProfileDto): Promise<void> {
  const session = await getStoredSession();
  if (!session) {
    return;
  }
  await saveSession({
    user,
    tokens: {
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
      expiresIn: Math.max(0, Math.floor((session.accessTokenExpiresAt - Date.now()) / 1000)),
    },
  });
}

export type { LoginResponseDto, MeResponseDto };
```

**Required edit to `session.ts` (comment only — no other line changes):** replace the `isMismatchOrExpired` block's comment:
```ts
      if (isMismatchOrExpired) {
        // Multi-device caveat: server stores ONE refresh token per user.
        // A mismatch means another device rotated it. We transition to expired.
        await clearSession();
      }
```
with:
```ts
      if (isMismatchOrExpired) {
        // Per-device sessions (BIOS-003): each device now has its own independent
        // user_sessions row server-side. A 401/expired here means THIS device's
        // session was revoked (explicit logout, session-cap eviction) or its
        // refresh token was already rotated away and reused (server-side reuse
        // detection revokes the row) — never cross-device contention. Expire
        // locally; other devices' sessions are unaffected.
        await clearSession();
      }
```
Nothing else in this file changes. `refreshSession()`'s request body (`{refreshToken: session.refreshToken}`) and the `/auth/refresh` call shape are **unchanged** — the server's dual-read (ADR-3) is entirely transparent to this function.

### FULL file: `src/services/auth/session-provider.tsx` (205 lines, verified live)

```tsx
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from 'react';

import {
  apiFetch,
  setAuthTokenProvider,
  setRefreshHandler,
  setSessionExpiredHandler,
  setStaleGuard,
} from '@/services/api/client';
import { ApiError, SessionExpiredError } from '@/services/api/errors';
import type {
  LoginResponseDto,
  MeResponseDto,
  PublicUserProfileDto,
} from '@/services/api/dto/auth';

import {
  clearSession,
  getAccessToken,
  getStoredSession,
  isTokenStale,
  refreshSession,
  saveSession,
  updateStoredUser,
} from '@/services/auth/session';
import {
  initialSessionState,
  sessionReducer,
  type SessionStatus,
} from '@/services/auth/session-machine';

export type SessionContextValue = {
  status: SessionStatus;
  user: PublicUserProfileDto | null;
  error: string | null;
  signIn(email: string, password: string): Promise<void>;
  signOut(): Promise<void>;
  refreshUser(): Promise<void>;
};

export type { SessionStatus };

const Context = createContext<SessionContextValue | null>(null);

export function SessionProvider(props: {
  children: ReactNode;
  onSignedIn?: () => void;
  onAuthCleared?: () => void;
}): React.JSX.Element {
  const [state, dispatch] = useReducer(sessionReducer, initialSessionState);
  const onSignedInRef = useRef(props.onSignedIn);
  const onAuthClearedRef = useRef(props.onAuthCleared);

  useEffect(() => {
    onSignedInRef.current = props.onSignedIn;
    onAuthClearedRef.current = props.onAuthCleared;
  }, [props.onSignedIn, props.onAuthCleared]);

  const handleAuthCleared = useCallback(() => {
    onAuthClearedRef.current?.();
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const data = await apiFetch<MeResponseDto>('/auth/me', { method: 'GET' });
      await updateStoredUser(data.user);
      dispatch({ type: 'USER_UPDATED', user: data.user });
    } catch (error) {
      if (error instanceof SessionExpiredError) {
        dispatch({ type: 'REFRESH_FAILURE' });
        handleAuthCleared();
      } else {
        throw error;
      }
    }
  }, [handleAuthCleared]);

  useEffect(() => {
    let mounted = true;

    async function boot() {
      const stored = await getStoredSession();
      if (!mounted) return;

      if (!stored) {
        dispatch({ type: 'NO_SESSION' });
        return;
      }

      // Optimistically hydrate
      dispatch({ type: 'HYDRATED', user: stored.user });

      // Background validate
      try {
        const data = await apiFetch<MeResponseDto>('/auth/me', { method: 'GET' });
        if (!mounted) return;
        await updateStoredUser(data.user);
        dispatch({ type: 'USER_UPDATED', user: data.user });
      } catch (error) {
        if (!mounted) return;
        if (error instanceof SessionExpiredError) {
          dispatch({ type: 'REFRESH_FAILURE' });
          handleAuthCleared();
        }
        // Other errors leave user in optimistically hydrated authenticated state
      }
    }

    boot();

    return () => {
      mounted = false;
    };
  }, [handleAuthCleared]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      dispatch({ type: 'SIGN_IN_START' });
      try {
        const data = await apiFetch<LoginResponseDto>('/auth/login', {
          method: 'POST',
          skipAuth: true,
          body: { email, password },
        });

        await saveSession({ user: data.user, tokens: data.tokens });
        dispatch({ type: 'SIGN_IN_SUCCESS', user: data.user });
        onSignedInRef.current?.();
      } catch (error) {
        const message =
          error instanceof ApiError || error instanceof Error ? error.message : 'Sign in failed';
        dispatch({ type: 'SIGN_IN_FAILURE', error: message });
        throw error;
      }
    },
    []
  );

  const signOut = useCallback(async () => {
    try {
      await apiFetch<null>('/auth/logout', { method: 'POST', retry: false });
    } catch {
      // Swallow errors during best-effort logout
    }

    await clearSession();
    dispatch({ type: 'SIGNED_OUT' });
    handleAuthCleared();
  }, [handleAuthCleared]);

  // Register P1 Client Hooks
  useEffect(() => {
    setAuthTokenProvider(getAccessToken);
    setRefreshHandler(refreshSession);
    setStaleGuard(async () => {
      const s = await getStoredSession();
      if (s && isTokenStale(s)) {
        try {
          await refreshSession();
        } catch {
          // Swallow: if it fails, the API request will naturally 401 and handle it
        }
      }
    });
    // A SessionExpiredError from ANY call site (not just /auth/me) must expire the
    // whole app: state -> 'expired' (tab layout redirects to sign-in) + cache purge.
    setSessionExpiredHandler(() => {
      void clearSession();
      dispatch({ type: 'REFRESH_FAILURE' });
      handleAuthCleared();
    });
  }, [handleAuthCleared]);

  const value = useMemo<SessionContextValue>(
    () => ({
      status: state.status,
      user: state.user,
      error: state.error,
      signIn,
      signOut,
      refreshUser,
    }),
    [state, signIn, signOut, refreshUser]
  );

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
}

export function useSession(): SessionContextValue {
  const ctx = useContext(Context);
  if (!ctx) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return ctx;
}
```

**Consumer context (do not modify, confirms `onSignedIn`/`onAuthCleared` wiring you must preserve):** `src/app/_layout.tsx` renders `<SessionProvider onSignedIn={onSignedIn} onAuthCleared={onAuthCleared}>` (imported from `@/services/query/client`). `adoptSession` must fire the same `onSignedInRef.current?.()` callback that `signIn` fires today, so query-cache wiring behaves identically regardless of which entry point established the session.

### FULL file: `src/services/auth/session-machine.ts` (89 lines, verified live)

```ts
import type { PublicUserProfileDto } from '@/services/api/dto/auth';

export type SessionStatus =
  | 'booting'
  | 'unauthenticated'
  | 'authenticating'
  | 'authenticated'
  | 'refreshing'
  | 'expired';

export type SessionState = {
  status: SessionStatus;
  user: PublicUserProfileDto | null;
  error: string | null;
};

export type SessionEvent =
  | { type: 'HYDRATED'; user: PublicUserProfileDto }
  | { type: 'NO_SESSION' }
  | { type: 'SIGN_IN_START' }
  | { type: 'SIGN_IN_SUCCESS'; user: PublicUserProfileDto }
  | { type: 'SIGN_IN_FAILURE'; error: string }
  | { type: 'REFRESH_START' }
  | { type: 'REFRESH_SUCCESS' }
  | { type: 'REFRESH_FAILURE' }
  | { type: 'USER_UPDATED'; user: PublicUserProfileDto }
  | { type: 'SIGNED_OUT' };

export const initialSessionState: SessionState = {
  status: 'booting',
  user: null,
  error: null,
};

export function sessionReducer(state: SessionState, event: SessionEvent): SessionState {
  switch (event.type) {
    case 'HYDRATED': {
      return { status: 'authenticated', user: event.user, error: null };
    }
    case 'NO_SESSION': {
      return { status: 'unauthenticated', user: null, error: null };
    }
    case 'SIGN_IN_START': {
      if (state.status === 'authenticated' || state.status === 'authenticating') {
        return state;
      }
      return { status: 'authenticating', user: null, error: null };
    }
    case 'SIGN_IN_SUCCESS': {
      if (state.status !== 'authenticating') {
        return state;
      }
      return { status: 'authenticated', user: event.user, error: null };
    }
    case 'SIGN_IN_FAILURE': {
      if (state.status !== 'authenticating') {
        return state;
      }
      return { status: 'unauthenticated', user: null, error: event.error };
    }
    case 'REFRESH_START': {
      if (state.status !== 'authenticated') {
        return state;
      }
      return { ...state, status: 'refreshing', error: null };
    }
    case 'REFRESH_SUCCESS': {
      if (state.status !== 'refreshing') {
        return state;
      }
      return { ...state, status: 'authenticated', error: null };
    }
    case 'REFRESH_FAILURE': {
      return { status: 'expired', user: state.user, error: 'session-expired' };
    }
    case 'USER_UPDATED': {
      if (state.status !== 'authenticated' && state.status !== 'refreshing') {
        return state;
      }
      return { ...state, user: event.user };
    }
    case 'SIGNED_OUT': {
      return { status: 'unauthenticated', user: null, error: null };
    }
    default: {
      return state;
    }
  }
}
```

**Required edit (the ONLY logic change in this packet — see "Plan-vs-implementation issue" above):**
```ts
    case 'SIGN_IN_SUCCESS': {
      if (state.status !== 'authenticating') {
        return state;
      }
      return { status: 'authenticated', user: event.user, error: null };
    }
```
becomes:
```ts
    case 'SIGN_IN_SUCCESS': {
      // Unconditional (unlike the old 'authenticating'-only guard): this event
      // now also fires from adoptSession() for flows that never dispatched
      // SIGN_IN_START (verify-registration, social sign-in — MP5/MP7). A valid
      // token pair + user profile is authoritative regardless of prior status,
      // mirroring HYDRATED, which already has no guard.
      return { status: 'authenticated', user: event.user, error: null };
    }
```
No other case changes. Every other event keeps its exact existing guard.

### FULL file: `src/services/api/client.ts` (263 lines, verified live)

```ts
import { Env } from '@/config/env';
import { ApiError, NetworkError, SessionExpiredError } from '@/services/api/errors';

export type ApiFetchOptions = {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
  skipAuth?: boolean;
  retry?: boolean;
  timeoutMs?: number;
};

export const API_BASE_URL = Env.apiUrl;

type AuthTokenProvider = () => Promise<string | null>;
type RefreshHandler = () => Promise<boolean>;
type StaleGuard = () => Promise<void>;
type SessionExpiredHandler = () => void;

let authTokenProvider: AuthTokenProvider | null = null;
let refreshHandler: RefreshHandler | null = null;
let staleGuard: StaleGuard | null = null;
let sessionExpiredHandler: SessionExpiredHandler | null = null;

export function setAuthTokenProvider(fn: AuthTokenProvider): void {
  authTokenProvider = fn;
}

export function setRefreshHandler(fn: RefreshHandler): void {
  refreshHandler = fn;
}

export function setStaleGuard(fn: StaleGuard): void {
  staleGuard = fn;
}

// Global session-death signal: the provider registers a handler so a
// SessionExpiredError thrown from ANY call site transitions the app to the
// expired state (cache purge + sign-in redirect), not only /auth/me paths.
export function setSessionExpiredHandler(fn: SessionExpiredHandler): void {
  sessionExpiredHandler = fn;
}

function notifySessionExpired(error: SessionExpiredError): SessionExpiredError {
  try {
    sessionExpiredHandler?.();
  } catch {
    // Never let the notifier mask the original error.
  }
  return error;
}

interface Envelope<T> {
  success: true;
  message?: string;
  timestamp?: string;
  data: T;
}

interface ErrorEnvelope {
  success: false;
  message: string;
  code: string;
  errors?: unknown[];
  timestamp?: string;
  requestId?: string;
}

function isEnvelope<T>(value: unknown): value is Envelope<T> {
  return (
    typeof value === 'object' &&
    value !== null &&
    'success' in value &&
    (value as { success: unknown }).success === true &&
    'data' in value
  );
}

function isErrorEnvelope(value: unknown): value is ErrorEnvelope {
  return (
    typeof value === 'object' &&
    value !== null &&
    'success' in value &&
    (value as { success: unknown }).success === false
  );
}

function parseJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function attemptFetch(
  path: string,
  options: Required<Omit<ApiFetchOptions, 'skipAuth' | 'retry' | 'body'>> & {
    body?: unknown;
    skipAuth: boolean;
  }
): Promise<Response> {
  const token = !options.skipAuth && authTokenProvider ? await authTokenProvider() : null;

  const baseHeaders: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Client': 'mobile',
    ...options.headers,
  };

  if (token) {
    baseHeaders.Authorization = `Bearer ${token}`;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), options.timeoutMs);

  try {
    const response = await fetch(`${API_BASE_URL}${normalizedPath}`, {
      method: options.method,
      headers: baseHeaders,
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
      signal: controller.signal,
    });
    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    const isTimeout = error instanceof Error && error.name === 'AbortError';
    throw new NetworkError({
      message: isTimeout ? `Request timed out after ${options.timeoutMs}ms` : 'Network request failed',
      status: 0,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

async function processResponse<T>(response: Response): Promise<T> {
  const text = await response.text();
  const parsed = text ? parseJson(text) : null;

  if (!response.ok) {
    if (isErrorEnvelope(parsed)) {
      throw new ApiError({
        message: parsed.message,
        status: response.status,
        code: parsed.code,
        requestId: parsed.requestId,
        details: parsed.errors,
      });
    }
    throw new ApiError({
      message: parsed && typeof parsed === 'object' && 'message' in parsed && typeof (parsed as { message: unknown }).message === 'string'
        ? (parsed as { message: string }).message
        : `Request failed with ${response.status}`,
      status: response.status,
      details: parsed,
    });
  }

  if (isEnvelope<T>(parsed)) {
    return parsed.data;
  }

  // Fallback for non-enveloped successful responses
  return parsed as T;
}

let inFlightRefresh: Promise<boolean> | null = null;

async function refreshSession(): Promise<boolean> {
  if (!refreshHandler) {
    return false;
  }

  if (!inFlightRefresh) {
    inFlightRefresh = refreshHandler().finally(() => {
      inFlightRefresh = null;
    });
  }

  return inFlightRefresh;
}

export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  const method = options.method ?? 'GET';
  const skipAuth = options.skipAuth ?? false;
  const shouldRetry = options.retry ?? method === 'GET';
  const timeoutMs = options.timeoutMs ?? 15000;

  if (!skipAuth && staleGuard) {
    await staleGuard();
  }

  const fetchOptions = {
    method,
    headers: options.headers ?? {},
    body: options.body,
    skipAuth,
    timeoutMs,
  };

  let lastError: Error | null = null;
  let attempts = 0;
  const maxAttempts = 3;
  const delays = [1000, 2000, 4000];

  while (attempts < maxAttempts) {
    attempts++;

    try {
      const response = await attemptFetch(path, fetchOptions);

      // Reactive 401 handling. The server uses code UNAUTHORIZED both for dead tokens and
      // for business-logic denials (e.g. wrong delete-account password), so:
      // - refresh fails => the session itself is dead => SessionExpiredError
      // - refresh succeeds but the retry still 401s => valid session, real domain 401 =>
      //   propagate the ORIGINAL server error (message/code intact), never a fake expiry.
      if (response.status === 401 && !skipAuth) {
        const refreshed = await refreshSession();
        if (refreshed) {
          const retryResponse = await attemptFetch(path, fetchOptions);
          return processResponse<T>(retryResponse);
        }

        throw notifySessionExpired(
          new SessionExpiredError({
            message: 'Session expired',
            status: 401,
          })
        );
      }

      return processResponse<T>(response);
    } catch (error) {
      if (error instanceof SessionExpiredError) {
        throw error;
      }

      lastError = error instanceof Error ? error : new Error(String(error));

      const isNetworkError = error instanceof NetworkError;
      const isServerError = error instanceof ApiError && error.status >= 500;

      if (shouldRetry && attempts < maxAttempts && (isNetworkError || isServerError)) {
        await sleep(delays[attempts - 1]);
        continue;
      }

      throw error;
    }
  }

  throw lastError ?? new Error('Request failed');
}
```

### FULL file: `src/services/api/errors.ts` (25 lines, verified live — DO NOT MODIFY, import reference only)

```ts
export class ApiError extends Error {
  readonly status: number;
  readonly code?: string;
  readonly requestId?: string;
  readonly details?: unknown;

  constructor(args: {
    message: string;
    status: number;
    code?: string;
    requestId?: string;
    details?: unknown;
  }) {
    super(args.message);
    this.name = 'ApiError';
    this.status = args.status;
    this.code = args.code;
    this.requestId = args.requestId;
    this.details = args.details;
  }
}

export class SessionExpiredError extends ApiError {}

export class NetworkError extends ApiError {}
```

### FULL file: `src/services/api/dto/auth.ts` (49 lines, verified live — DO NOT MODIFY, import reference only; MP2 owns adding new DTOs)

```ts
// Vendored from server/src/controllers/auth/* — captured 2026-07-08 (BIOS-002). Do not edit without re-verifying against the live server.

export interface PublicUserProfileDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string | null;
  gender: string | null;
  phone: string | null;
  role: string;
  avatarUrl: string | null;
  isEmailVerified: boolean;
  onboardingStatus: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokensDto {
  accessToken: string;
  refreshToken: string;
  expiresIn: number; // seconds (900)
}

export interface LoginResponseDto {
  user: PublicUserProfileDto;
  tokens: AuthTokensDto;
}

export interface MeResponseDto {
  user: PublicUserProfileDto;
}

export interface OnboardingStatusDto {
  currentStep: string;
  steps: {
    registered: boolean;
    consent: boolean;
    whatsApp: boolean;
    assessment: boolean;
    goals: boolean;
    preferences: boolean;
    plan: boolean;
  };
  isComplete: boolean;
  completedAt: string | null;
}

export type LogoutResponseDto = null;
```

### FULL file: `src/config/env.ts` (32 lines, verified live — DO NOT MODIFY, import reference only)

```ts
const DEV_API_URL = 'http://localhost:5000/api';
const DEV_SOCKET_URL = 'http://localhost:5000';

function deriveSocketUrl(apiUrl: string): string {
  return apiUrl.replace(/\/api\/?$/, '');
}

function readPublicEnv() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL ?? DEV_API_URL;
  const socketUrl = process.env.EXPO_PUBLIC_SOCKET_URL ?? deriveSocketUrl(apiUrl) ?? DEV_SOCKET_URL;

  validateUrl('EXPO_PUBLIC_API_URL', apiUrl);
  validateUrl('EXPO_PUBLIC_SOCKET_URL', socketUrl);

  return {
    apiUrl,
    socketUrl,
    googleClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
    googleWebClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID ?? process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
    googleIosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  };
}

function validateUrl(name: string, value: string) {
  try {
    new URL(value);
  } catch {
    throw new Error(`Invalid runtime config ${name}: ${value}`);
  }
}

export const Env = readPublicEnv();
```

### Existing tests that MUST stay green, unmodified (embedded verbatim so GLM does not need to touch or "fix" them)

**FULL file: `src/services/auth/session-machine.test.ts` (60 lines)**

```ts
import { describe, it, expect } from 'vitest';
import { sessionReducer, initialSessionState, type SessionState } from '@/services/auth/session-machine';
import type { PublicUserProfileDto } from '@/services/api/dto/auth';

const mockUser: PublicUserProfileDto = {
  id: '1', email: 'test@test.com', firstName: 'Test', lastName: 'User',
  dateOfBirth: null, gender: null, phone: null, role: 'user', avatarUrl: null,
  isEmailVerified: true, onboardingStatus: 'completed',
  createdAt: '2026-07-08T00:00:00.000Z', updatedAt: '2026-07-08T00:00:00.000Z',
};

describe('Session Reducer', () => {
  it('transitions states correctly', () => {
    let state: SessionState = initialSessionState;

    state = sessionReducer(state, { type: 'HYDRATED', user: mockUser });
    expect(state.status).toBe('authenticated');
    expect(state.user).toBe(mockUser);

    state = initialSessionState;
    state = sessionReducer(state, { type: 'NO_SESSION' });
    expect(state.status).toBe('unauthenticated');

    state = sessionReducer(state, { type: 'SIGN_IN_START' });
    expect(state.status).toBe('authenticating');

    state = sessionReducer(state, { type: 'SIGN_IN_SUCCESS', user: mockUser });
    expect(state.status).toBe('authenticated');
    expect(state.user).toBe(mockUser);

    state = sessionReducer(state, { type: 'REFRESH_START' });
    expect(state.status).toBe('refreshing');

    state = sessionReducer(state, { type: 'REFRESH_SUCCESS' });
    expect(state.status).toBe('authenticated');

    state = sessionReducer(state, { type: 'REFRESH_FAILURE' });
    expect(state.status).toBe('expired');

    state = initialSessionState;
    state = sessionReducer(state, { type: 'SIGN_IN_START' });
    state = sessionReducer(state, { type: 'SIGN_IN_FAILURE', error: 'fail' });
    expect(state.status).toBe('unauthenticated');
    expect(state.error).toBe('fail');

    state = { status: 'authenticated', user: mockUser, error: null };
    state = sessionReducer(state, { type: 'USER_UPDATED', user: { ...mockUser, firstName: 'Updated' } });
    expect(state.user?.firstName).toBe('Updated');

    state = sessionReducer(state, { type: 'SIGNED_OUT' });
    expect(state.status).toBe('unauthenticated');
    expect(state.user).toBe(null);
  });

  it('ignores irrelevant events', () => {
    const unauthState: SessionState = { status: 'unauthenticated', user: null, error: null };
    const newState = sessionReducer(unauthState, { type: 'REFRESH_SUCCESS' });
    expect(newState).toBe(unauthState);
  });
});
```

Verify before/after the `SIGN_IN_SUCCESS` guard edit: every `SIGN_IN_SUCCESS` dispatch in this file happens from a state whose `status` is `'authenticating'` (line 24→27), so removing the guard cannot change any assertion's outcome. The second test (`'ignores irrelevant events'`) dispatches `REFRESH_SUCCESS`, not `SIGN_IN_SUCCESS` — untouched by this packet's change.

**FULL file: `src/services/api/client.401.test.ts` (84 lines)**

```ts
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  apiFetch,
  setAuthTokenProvider,
  setRefreshHandler,
  setSessionExpiredHandler,
  setStaleGuard,
} from '@/services/api/client';
import { ApiError, SessionExpiredError } from '@/services/api/errors';

function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

const businessDenial = {
  success: false,
  message: 'Password is incorrect',
  code: 'UNAUTHORIZED',
};

describe('apiFetch 401 semantics (review finding: business 401 vs session death)', () => {
  const fetchMock = vi.fn<typeof fetch>();
  const expiredHandler = vi.fn();

  beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock);
    fetchMock.mockReset();
    expiredHandler.mockReset();
    setAuthTokenProvider(async () => 'token-abc');
    setStaleGuard(async () => undefined);
    setSessionExpiredHandler(expiredHandler);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('propagates the ORIGINAL server error when refresh succeeds but the retry still 401s', async () => {
    setRefreshHandler(async () => true);
    fetchMock
      .mockResolvedValueOnce(jsonResponse(401, businessDenial))
      .mockResolvedValueOnce(jsonResponse(401, businessDenial));

    const err = await apiFetch('/v1/users/me', { method: 'DELETE', body: {} }).catch((e) => e);

    expect(err).toBeInstanceOf(ApiError);
    expect(err).not.toBeInstanceOf(SessionExpiredError);
    expect((err as ApiError).message).toBe('Password is incorrect');
    expect((err as ApiError).code).toBe('UNAUTHORIZED');
    expect(fetchMock).toHaveBeenCalledTimes(2); // original + one retry, no loop
    expect(expiredHandler).not.toHaveBeenCalled();
  });

  it('throws SessionExpiredError and fires the global handler when refresh itself fails', async () => {
    setRefreshHandler(async () => false);
    fetchMock.mockResolvedValueOnce(jsonResponse(401, businessDenial));

    const err = await apiFetch('/gamification/stats').catch((e) => e);

    expect(err).toBeInstanceOf(SessionExpiredError);
    expect(expiredHandler).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledTimes(1); // no retry without a fresh token
  });

  it('never runs the refresh dance for skipAuth requests', async () => {
    const refresh = vi.fn(async () => true);
    setRefreshHandler(refresh);
    fetchMock.mockResolvedValueOnce(jsonResponse(401, businessDenial));

    const err = await apiFetch('/auth/login', {
      method: 'POST',
      skipAuth: true,
      body: { email: 'x@y.z', password: 'nope' },
    }).catch((e) => e);

    expect(err).toBeInstanceOf(ApiError);
    expect(refresh).not.toHaveBeenCalled();
    expect(expiredHandler).not.toHaveBeenCalled();
  });
});
```

This test file **never calls `setDeviceHeadersProvider`**. Your `attemptFetch` change MUST treat an unregistered device-headers provider as a no-op (module-level `deviceHeadersProvider` variable defaults to `null`, exactly like `authTokenProvider`/`refreshHandler`/`staleGuard`/`sessionExpiredHandler` already do) — do not throw, do not add headers, do not change any of this file's 3 assertions or its `fetchMock` call counts.

### Relevant `package.json` dependency block (verified live)

```json
{
  "name": "@balencia/mobile",
  "main": "expo-router/entry",
  "version": "1.0.0",
  "dependencies": {
    "@expo/ui": "~57.0.4",
    "@tanstack/react-query": "^5.90.12",
    "expo": "~57.0.4",
    "expo-constants": "~57.0.3",
    "expo-device": "~57.0.0",
    "expo-font": "~57.0.0",
    "expo-glass-effect": "~57.0.0",
    "expo-image": "~57.0.0",
    "expo-linking": "~57.0.2",
    "expo-router": "~57.0.4",
    "expo-secure-store": "~57.0.0",
    "expo-splash-screen": "~57.0.2",
    "expo-status-bar": "~57.0.0",
    "expo-symbols": "~57.0.0",
    "expo-system-ui": "~57.0.0",
    "expo-updates": "~57.0.6",
    "expo-web-browser": "~57.0.0",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "react-native": "0.86.0",
    "react-native-gesture-handler": "~2.32.0",
    "react-native-reanimated": "4.5.0",
    "react-native-safe-area-context": "~5.7.0",
    "react-native-screens": "4.25.2",
    "react-native-web": "~0.21.0",
    "react-native-worklets": "0.10.0"
  },
  "devDependencies": {
    "@types/react": "~19.2.2",
    "@vitest/coverage-v8": "^3.0.0",
    "eslint": "^9.39.4",
    "eslint-config-expo": "~57.0.0",
    "typescript": "~6.0.3",
    "vitest": "^3.0.0"
  },
  "scripts": {
    "start": "expo start",
    "reset-project": "node ./scripts/reset-project.js",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "lint": "expo lint",
    "typecheck": "tsc --noEmit",
    "test": "node ./scripts/verify-mobile-source.mjs && vitest run --passWithNoTests",
    "test:unit": "vitest run --passWithNoTests",
    "test:watch": "vitest",
    "eas:build:ios": "bash ./eas-build.sh",
    "eas:build:ios:only": "EAS_AUTO_SUBMIT=0 bash ./eas-build.sh",
    "eas:submit:ios": "npx eas submit --platform ios --profile production --latest",
    "eas:build:simulator": "npx eas build --platform ios --profile simulator",
    "eas:update:production": "npx eas update --channel production --environment production"
  },
  "private": true
}
```

`expo-device` (`~57.0.0`) is **already installed** — use it for `getDeviceName()`, do not add a redundant dependency. Note there is no `expo-crypto`, no `uuid`, no `react-native-get-random-values` — add exactly one line, `"expo-crypto": "~57.0.0"` (alphabetically between `"expo-constants"` and `"expo-device"`, matching this file's existing sort order), nothing else.

## Contract (exact types/signatures/DTO names — verbatim)

### NEW file `src/services/auth/device.ts`

```ts
import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

/** SecureStore key for the stable per-install device id. Generated once, reused forever. */
const DEVICE_ID_KEY = 'balencia.device.id';

let cachedDeviceId: string | null = null;
let inFlightDeviceId: Promise<string> | null = null;

/**
 * Returns this install's stable device id, generating and persisting a UUID v4
 * (via expo-crypto's cryptographically-strong randomUUID) on first call, then
 * reading + memoizing it on every call thereafter. Single-flight guarded so
 * concurrent early callers (e.g. multiple in-flight requests during app boot)
 * never race and generate two different ids.
 */
export async function getDeviceId(): Promise<string> {
  if (cachedDeviceId) {
    return cachedDeviceId;
  }
  if (inFlightDeviceId) {
    return inFlightDeviceId;
  }

  inFlightDeviceId = (async () => {
    const existing = await SecureStore.getItemAsync(DEVICE_ID_KEY);
    if (existing) {
      cachedDeviceId = existing;
      return existing;
    }

    const generated = Crypto.randomUUID();
    await SecureStore.setItemAsync(DEVICE_ID_KEY, generated);
    cachedDeviceId = generated;
    return generated;
  })();

  try {
    return await inFlightDeviceId;
  } finally {
    inFlightDeviceId = null;
  }
}

/**
 * Best-effort, non-PII device label for the server's user_sessions.device_name
 * column (e.g. "iOS 18 · iPhone"). Deliberately uses expo-device's hardware
 * `modelName`, never `Device.deviceName` (the user-assigned nickname, e.g.
 * "Hamza's iPhone" — that is PII and out of bounds per ADR-11 item 4).
 */
export function getDeviceName(): string {
  const osLabel = Device.osName ?? (Platform.OS === 'ios' ? 'iOS' : Platform.OS);
  const osVersion = Device.osVersion ?? (Platform.Version ? String(Platform.Version) : '');
  const model = Device.modelName ?? 'device';
  const osPart = osVersion ? `${osLabel} ${osVersion}` : osLabel;
  return `${osPart} · ${model}`;
}

/** Combinator handed to client.ts via setDeviceHeadersProvider. */
export async function getDeviceHeaders(): Promise<{ deviceId: string; deviceName: string }> {
  const deviceId = await getDeviceId();
  return { deviceId, deviceName: getDeviceName() };
}
```

### `src/services/api/client.ts` additions (exact names)

Add alongside the existing provider types/setters (same file, same pattern — `authTokenProvider`/`setAuthTokenProvider` is the model to mirror exactly):

```ts
type DeviceHeadersProvider = () => Promise<{ deviceId: string; deviceName: string }>;

let deviceHeadersProvider: DeviceHeadersProvider | null = null;

export function setDeviceHeadersProvider(fn: DeviceHeadersProvider): void {
  deviceHeadersProvider = fn;
}
```

Inside `attemptFetch`, immediately after the existing `if (token) { baseHeaders.Authorization = ... }` block and before `const normalizedPath = ...`, add:

```ts
  if (deviceHeadersProvider) {
    try {
      const { deviceId, deviceName } = await deviceHeadersProvider();
      if (!baseHeaders['X-Device-Id']) {
        baseHeaders['X-Device-Id'] = deviceId;
      }
      if (!baseHeaders['X-Device-Name']) {
        baseHeaders['X-Device-Name'] = deviceName;
      }
    } catch {
      // Device headers are best-effort session labeling only — never block or
      // fail a request because SecureStore/device-info lookup hiccupped.
    }
  }
```

**Runs for every request, including `skipAuth: true` calls** (login/register/social) — this is intentional and required: SP5 reads `X-Device-Id`/`X-Device-Name` on exactly those endpoints to name the newly-created `user_sessions` row (architecture-plan.md §7 SP5). Do not gate this block behind `!options.skipAuth` — that gate is specific to the `Authorization` header/token logic above it and must not be reused here. If a caller already put `X-Device-Id`/`X-Device-Name` into `options.headers` explicitly, the spread (`...options.headers` in `baseHeaders`) already wins — the `if (!baseHeaders['X-Device-Id'])` guards preserve that precedence.

### `src/services/auth/session-provider.tsx` additions (exact names)

Import addition:
```ts
import { getDeviceHeaders } from '@/services/auth/device';
import {
  apiFetch,
  setAuthTokenProvider,
  setDeviceHeadersProvider,
  setRefreshHandler,
  setSessionExpiredHandler,
  setStaleGuard,
} from '@/services/api/client';
import type {
  AuthTokensDto,
  LoginResponseDto,
  MeResponseDto,
  PublicUserProfileDto,
} from '@/services/api/dto/auth';
```
(`AuthTokensDto` is a new import into this file — it was previously only imported by `session.ts`.)

`SessionContextValue` gains one member (exact signature, matches the task brief verbatim):
```ts
export type SessionContextValue = {
  status: SessionStatus;
  user: PublicUserProfileDto | null;
  error: string | null;
  signIn(email: string, password: string): Promise<void>;
  signOut(): Promise<void>;
  refreshUser(): Promise<void>;
  adoptSession(tokens: AuthTokensDto, user: PublicUserProfileDto): Promise<void>;
};
```

New callback, defined alongside `signIn`/`signOut` (same `useCallback` pattern, empty deps — it closes over nothing but `dispatch` and the stable ref, exactly like `signIn`):
```ts
  const adoptSession = useCallback(async (tokens: AuthTokensDto, user: PublicUserProfileDto) => {
    await saveSession({ user, tokens });
    dispatch({ type: 'SIGN_IN_SUCCESS', user });
    onSignedInRef.current?.();
  }, []);
```

Add `setDeviceHeadersProvider(getDeviceHeaders);` to the existing "Register P1 Client Hooks" `useEffect` (same effect that already calls `setAuthTokenProvider`/`setRefreshHandler`/`setStaleGuard`/`setSessionExpiredHandler` — one more line, same dependency array `[handleAuthCleared]`, unchanged):
```ts
  useEffect(() => {
    setAuthTokenProvider(getAccessToken);
    setDeviceHeadersProvider(getDeviceHeaders);
    setRefreshHandler(refreshSession);
    setStaleGuard(async () => {
      const s = await getStoredSession();
      if (s && isTokenStale(s)) {
        try {
          await refreshSession();
        } catch {
          // Swallow: if it fails, the API request will naturally 401 and handle it
        }
      }
    });
    setSessionExpiredHandler(() => {
      void clearSession();
      dispatch({ type: 'REFRESH_FAILURE' });
      handleAuthCleared();
    });
  }, [handleAuthCleared]);
```

Add `adoptSession` to the memoized context value and its dependency array:
```ts
  const value = useMemo<SessionContextValue>(
    () => ({
      status: state.status,
      user: state.user,
      error: state.error,
      signIn,
      signOut,
      refreshUser,
      adoptSession,
    }),
    [state, signIn, signOut, refreshUser, adoptSession]
  );
```

`signOut` comment update (behavior unchanged — this is documentation only, confirming ADR-4's this-device default is already satisfied):
```ts
  const signOut = useCallback(async () => {
    // This-device logout (ADR-4): no body => server defaults allDevices:false and
    // revokes only this device's user_sessions row. Do NOT add a body here without
    // an explicit "sign out everywhere" UI affordance — that is out of scope.
    try {
      await apiFetch<null>('/auth/logout', { method: 'POST', retry: false });
    } catch {
      // Swallow errors during best-effort logout
    }

    await clearSession();
    dispatch({ type: 'SIGNED_OUT' });
    handleAuthCleared();
  }, [handleAuthCleared]);
```

### Who calls `adoptSession` (informational — NOT built in this packet, out of scope; listed so the contract's shape is justified)

- MP5 (`POST /verify-registration` → `{user, tokens, nextStep}`, scope-server-auth.md §1): `await adoptSession(data.tokens, data.user)` then route via `resolveNextStep(data.nextStep)`.
- MP7 (`POST /social` → `{user, tokens, isNewUser, needsProfileCompletion, nextStep?}`, scope-server-auth.md §1): same call.

Both response shapes' `tokens`/`user` fields are exactly `AuthTokensDto`/`PublicUserProfileDto` as already defined in `dto/auth.ts` (embedded above) — MP2 will formalize `VerifyRegistrationResponse`/`SocialAuthResponse` as named types that structurally match, but MP1's `adoptSession(tokens: AuthTokensDto, user: PublicUserProfileDto)` signature does not need to change when those land.

## Design spec

Not applicable — MP1 is a service/session-layer packet with no UI screens, so scope-hifi-auth.md's screen specs (S03–S05b etc.) do not apply here. The one canon rule that *does* reach into this packet is the PII-minimization principle underlying ADR-11 item 4 (email/PII must never be over-exposed) — applied above by name (`getDeviceName()` explicitly avoids `Device.deviceName`, the user's personal device nickname, in favor of the anonymous hardware `modelName`). No visual, motion, or copy work is in scope for MP1.

## Acceptance criteria (mechanically checkable)

1. `npm run typecheck` (`tsc --noEmit`) exits 0 with these 5 files touched plus the new `device.ts` — no `any`, no `@ts-ignore`.
2. `npm run test` (`node ./scripts/verify-mobile-source.mjs && vitest run --passWithNoTests`) exits 0. Specifically:
   - `src/services/auth/session-machine.test.ts` — both `it(...)` blocks pass unmodified (file is not edited).
   - `src/services/api/client.401.test.ts` — all 3 `it(...)` blocks pass unmodified (file is not edited), including the exact `fetchMock` call-count assertions (`toHaveBeenCalledTimes(2)`, `toHaveBeenCalledTimes(1)`, `toHaveBeenCalledTimes(1)`).
3. `src/services/auth/device.ts` exports `getDeviceId(): Promise<string>`, `getDeviceName(): string`, `getDeviceHeaders(): Promise<{deviceId: string; deviceName: string}>`.
4. Calling `getDeviceId()` twice in the same process returns the identical string both times (memoized), and — starting from an empty SecureStore — `SecureStore.setItemAsync` for key `'balencia.device.id'` is invoked at most once across any number of concurrent/sequential `getDeviceId()` calls in that process lifetime (single-flight + cache).
5. `SessionContextValue` (exported type from `session-provider.tsx`) includes `adoptSession(tokens: AuthTokensDto, user: PublicUserProfileDto): Promise<void>`, and the object returned by `useSession()` exposes it.
6. Calling `adoptSession(tokens, user)`: (a) persists the session via `saveSession` (same as `signIn` does), (b) results in `useSession().status === 'authenticated'` and `useSession().user === user` regardless of the `SessionProvider`'s status immediately prior (verify from `'unauthenticated'` — not just from `'authenticating'`), (c) invokes the `onSignedIn` prop callback exactly once.
7. `session-machine.ts`'s `SIGN_IN_SUCCESS` case has no `state.status !== 'authenticating'` guard (grep negative match) and unconditionally returns `{ status: 'authenticated', user: event.user, error: null }`.
8. `client.ts` exports `setDeviceHeadersProvider`; once registered, every `fetch(...)` call `attemptFetch` issues — for both `skipAuth: true` and `skipAuth: false` requests — includes `X-Device-Id` and `X-Device-Name` headers, UNLESS the caller's own `options.headers` already set those keys (caller wins).
9. `client.ts` with `deviceHeadersProvider` never registered (its default `null` state) issues requests with no `X-Device-Id`/`X-Device-Name` headers and never throws — this is the exact condition `client.401.test.ts` runs under, so criterion 2 already re-proves this, but state it explicitly as a standalone check too.
10. `session.ts` no longer contains the strings `"Multi-device caveat"` or `"another device rotated it"` (grep negative match); the replacement comment is present and the `isMismatchOrExpired` branch's runtime behavior (call `clearSession()`, return `false`) is byte-identical to before.
11. `package.json` contains exactly one new line, `"expo-crypto": "~57.0.0"`, correctly sorted alphabetically between `"expo-constants"` and `"expo-device"`; no other dependency added, removed, or version-bumped.
12. Grep across the 5 touched files for `console.log`, `console.warn`, `console.error`, or any logger call finds none newly introduced (ADR-11 item 2 — no token/id logging; device id is not secret but keep the file clean regardless).
13. The `/auth/refresh` request body in `refreshSession()` (`session.ts`) is unchanged: still exactly `{ refreshToken: session.refreshToken }` — no `sid`/`deviceId` added to the body (device identity travels as headers, not in this endpoint's JSON body, per architecture-plan.md §5's "response + cookies unchanged" contract for `/refresh`).

## Out of scope

- Any change to `src/services/api/dto/auth.ts` (new DTOs for register/verify-registration/social/forgot-password/reset-password/consent/complete-profile/whatsapp) — that is MP2.
- The social sign-in service (`src/services/auth/social.ts`, `expo-apple-authentication`, `expo-auth-session`) — that is MP3.
- Any `src/components/balencia/*` kit work — that is MP4.
- Any screen/route file under `src/app/(auth)/*` (sign-up, verify, consent, forgot-password, reset-password, complete-profile, whatsapp) — those are MP5/MP6/MP7/MP8. This packet must not create or modify anything under `src/app/`.
- Dedicated new unit tests for `getDeviceId()`/`getDeviceName()`/`adoptSession()` behavior (e.g. a new `device.test.ts` or `session-provider.test.tsx`) — those are explicitly MP9's target ("session adoptSession/device-id" per architecture-plan.md §7 MP9). MP1's job is to make the surface exist and keep the *existing* suite green; MP9 proves the new surface with new tests.
- The full ADR-11 token-security-review checklist (log grep across the whole app, Authorization redaction, 429 countdown handling, email masking, deep-link token audit) — that is MP10. This packet's acceptance criteria 12 is a narrow, local version scoped only to the 5 files this packet touches, not a substitute for MP10's full sweep.
- Server-side session model (SP1–SP10: `user_sessions` table, `sid` JWT claim, dual-read `/refresh`, this-device/all-devices `/logout`, Apple JWKS/Google hardening) — entirely server-side, already-frozen contract this packet consumes but does not implement. MP1 does not assume any server packet has shipped yet: every mobile change here is forward-compatible with the *current* (pre-BIOS-003) server, because `X-Device-Id`/`X-Device-Name` are headers the current server simply ignores (no route reads them yet), and `/auth/refresh`'s request/response shape is untouched.
- Session-list / device-management UI (OQ-B, deferred to a future batch) — not built here; this packet only sends `device_id`/`device_name` as headers for the server to store, it does not surface a "manage devices" screen.
- Any change to `signIn`'s or `refreshSession`'s (in `session.ts`) request bodies, retry policy, or error classification — both are functionally untouched (session.ts gets a comment-only edit; session-provider.tsx's `signIn` is untouched except that `adoptSession` is added as a new, separate function beside it).
