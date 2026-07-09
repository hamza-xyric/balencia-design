# Packet MP9 — Mobile Unit Tests (Registration Flow, Forgot Normalize, Device ID, Next-Step Router, Mask Email)

## Objective

Add unit-test coverage (Vitest) for five already-landed, pure/logic mobile modules that currently
have **zero** direct tests: the `RegistrationFlow` reducer (ADR-8), the forgot-password
enumeration-normalization helper (ADR-10), the device-id/device-name service (ADR-11 item 4), the
`resolveNextStep` router (ADR-10), and the `maskEmail` helper inside the `balencia` kit (ADR-11
item 4 — PII masking). This is `MP9` in the BIOS-003 packet decomposition
(`architecture-plan.md` §7, Wave 6 — mobile tests, depends on MP1/MP2/MP3/MP5/MP6 all being
landed, which they are).

**This packet is test-authorship only.** It creates exactly five new `*.test.ts` files. It does
**not** modify any of the five modules under test, does not add new source files, does not touch
`package.json`, and does not touch any of the ten pre-existing test files (`session-machine.test.ts`,
`client.401.test.ts`, the seven `src/services/adapters/*.test.ts` files, `keys.test.ts`,
`dto.satisfies.test.ts`). Every reference test file below was written against this session's
**live** source (embedded verbatim below) and actually run — `npm run test`, `npm run lint`,
`npm run typecheck` all pass with these five files in place, alongside the ten pre-existing test
files (41 existing + 24 new = **65 total tests, 16 test files, all green**). This is not a
guessed contract; it is a verified one.

`registration-flow.tsx`, `forgot-normalize.ts`, `device.ts`, and `next-step.ts` are all pure or
near-pure (no React render tree) — three of the five target tests need no mocking beyond plain
imports. `device.test.ts` and `mask-email.test.ts` are the two exceptions: they are the **first**
test files in this codebase to `vi.mock()` a native module, because their subjects
(`device.ts`, and `auth-inputs.tsx` which houses `maskEmail`) transitively import
`react-native`/`expo-*` packages that cannot be parsed under Vitest's default Node
environment without a mock (verified failure mode documented in the Contract section — read
it before writing either of those two files, the fix is not optional).

## Target files

**CREATE (all five — no other files)**
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/features/auth/registration-flow.test.ts`
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/features/auth/forgot-normalize.test.ts`
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/services/auth/device.test.ts`
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/services/auth/next-step.test.ts`
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/components/balencia/mask-email.test.ts`

**DO NOT MODIFY (read-only inputs, embedded verbatim below for reference)**
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/features/auth/registration-flow.tsx`
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/features/auth/forgot-normalize.ts`
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/services/auth/device.ts`
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/services/auth/next-step.ts`
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/components/balencia/auth-inputs.tsx`
  (only the `maskEmail` function is under test; do not modify the file, and do not re-export or
  relocate `maskEmail` — import it from its existing path)
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/services/api/errors.ts`
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/vitest.config.ts`

**DO NOT TOUCH (pre-existing tests — must remain green, unmodified, byte-for-byte)**
- `src/services/auth/session-machine.test.ts`
- `src/services/api/client.401.test.ts`
- `src/services/adapters/cia.test.ts`, `overview.test.ts`, `life-areas.test.ts`, `missions.test.ts`,
  `trust.test.ts`, `fitness.test.ts`, `gamification.test.ts`
- `src/services/query/keys.test.ts`
- `src/services/api/dto/dto.satisfies.test.ts`

## Dependencies (lander installs)

**None.** No new npm packages. `vitest`, `@vitest/coverage-v8`, `eslint`, `eslint-config-expo`,
`typescript` are already devDependencies; `expo-secure-store`, `expo-crypto`, `expo-device` are
already dependencies (landed by MP1/MP4). Do not edit `package.json` or `package-lock.json` in
this packet.

## Embedded current source

### `src/features/auth/registration-flow.tsx` (current full content — DO NOT MODIFY)

```tsx
import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type Dispatch,
  type ReactNode,
} from 'react';

// ─── State & actions — PURE, exported for MP9 unit tests ──────────────────

export type RegistrationFlowStep = 'form' | 'otp';

export type RegistrationFlowState = {
  step: RegistrationFlowStep;
  email: string;
  activationToken: string | null;
  resendCooldownEndsAt: number | null;
};

export type RegistrationFlowAction =
  | { type: 'REGISTER_SUCCESS'; email: string; activationToken: string; cooldownEndsAt: number }
  | { type: 'RESEND_SUCCESS'; activationToken: string; cooldownEndsAt: number }
  | { type: 'RESET' };

export const initialRegistrationFlowState: RegistrationFlowState = {
  step: 'form',
  email: '',
  activationToken: null,
  resendCooldownEndsAt: null,
};

export function registrationFlowReducer(
  state: RegistrationFlowState,
  action: RegistrationFlowAction
): RegistrationFlowState {
  switch (action.type) {
    case 'REGISTER_SUCCESS': {
      return {
        step: 'otp',
        email: action.email,
        activationToken: action.activationToken,
        resendCooldownEndsAt: action.cooldownEndsAt,
      };
    }
    case 'RESEND_SUCCESS': {
      return {
        ...state,
        activationToken: action.activationToken,
        resendCooldownEndsAt: action.cooldownEndsAt,
      };
    }
    case 'RESET': {
      return initialRegistrationFlowState;
    }
    default: {
      return state;
    }
  }
}

// ─── Context + provider ─────────────────────────────────────────────────────

export type RegistrationFlowContextValue = {
  state: RegistrationFlowState;
  dispatch: Dispatch<RegistrationFlowAction>;
};

const RegistrationFlowContext = createContext<RegistrationFlowContextValue | null>(null);

export function RegistrationFlowProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(registrationFlowReducer, initialRegistrationFlowState);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return (
    <RegistrationFlowContext.Provider value={value}>{children}</RegistrationFlowContext.Provider>
  );
}

export function useRegistrationFlow(): RegistrationFlowContextValue {
  const ctx = useContext(RegistrationFlowContext);
  if (!ctx) {
    throw new Error('useRegistrationFlow must be used within a RegistrationFlowProvider');
  }
  return ctx;
}
```

Note: `registrationFlowReducer` and `initialRegistrationFlowState` are **pure** — no React import
is needed to test them; `RegistrationFlowProvider`/`useRegistrationFlow` (the context/provider
pair) are **out of scope** for this packet (see "Out of scope").

### `src/features/auth/forgot-normalize.ts` (current full content — DO NOT MODIFY)

```ts
// Pure, framework-free normalization for POST /auth/forgot-password outcomes.
//
// ADR-10 (BIOS-003 architecture-plan.md): the server 404s unknown emails by deliberate
// design (yhealth-app/server auth-session.controller.ts:217-222 — "explicit
// email-enumeration by design", scope-server-auth.md §4). Mobile closes the
// enumeration-safety gap client-side: a 404/NOT_FOUND is normalized to the IDENTICAL
// view-model as a 200, per canon COMPACT-CANON.md §8 ("Reset links use identical
// success framing for known and unknown emails"). Never special-case 404 differently
// from 200 anywhere above this function — always route both through here.

import { ApiError } from '@/services/api/errors';

export type ForgotPasswordOutcome =
  | { kind: 'sent' }
  | { kind: 'rate-limited'; retryAfterSeconds: number | null }
  | { kind: 'error'; message: string };

/**
 * Extracts a server-reported retry-after (seconds) from an ApiError's `details`
 * payload, if present. `details` may be an array (the server's `errors` field) or an
 * object depending on what the backend attached; this checks both shapes defensively.
 * NEVER fabricates a value — returns null when the server did not report one, so
 * callers can honestly render "try again in a few minutes" instead of inventing a
 * countdown (ADR-11 item 5).
 */
export function extractRetryAfterSeconds(details: unknown): number | null {
  if (details == null) {
    return null;
  }
  const candidate = Array.isArray(details) ? details[0] : details;
  if (
    candidate &&
    typeof candidate === 'object' &&
    'retryAfter' in candidate &&
    typeof (candidate as { retryAfter?: unknown }).retryAfter === 'number'
  ) {
    return (candidate as { retryAfter: number }).retryAfter;
  }
  return null;
}

/**
 * Normalizes a POST /auth/forgot-password result into an enumeration-safe, honest
 * view-model.
 *
 * - Pass the string literal 'ok' when the request resolved successfully (forgotPassword()
 *   returned without throwing — the resolved value is always `null`, nothing to inspect).
 * - Pass the caught ApiError when the request rejected.
 *
 * A 404 status OR a `NOT_FOUND` code (unknown email) normalizes to `{ kind: 'sent' }` —
 * bit-for-bit the same outcome object as a real 200 — so the UI layer can never be used
 * to probe whether an email has an account.
 */
export function normalizeForgotPasswordOutcome(result: 'ok' | ApiError): ForgotPasswordOutcome {
  if (result === 'ok') {
    return { kind: 'sent' };
  }

  if (result.status === 404 || result.code === 'NOT_FOUND') {
    return { kind: 'sent' };
  }

  if (result.status === 429) {
    return { kind: 'rate-limited', retryAfterSeconds: extractRetryAfterSeconds(result.details) };
  }

  return { kind: 'error', message: result.message || 'Something went wrong. Try again.' };
}
```

### `src/services/auth/device.ts` (current full content — DO NOT MODIFY)

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

Key facts pinned by this file that your tests must exercise exactly:
- SecureStore key is the literal string `'balencia.device.id'`.
- `getDeviceId()` is single-flight: two concurrent calls before the id is known share one
  `inFlightDeviceId` promise, so `Crypto.randomUUID()` and `SecureStore.setItemAsync()` each run
  **exactly once**, not twice.
- `getDeviceName()` never reads `Device.deviceName` — only `Device.osName`, `Device.osVersion`,
  `Device.modelName`, plus `Platform.OS`/`Platform.Version` as fallbacks.
- `getDeviceHeaders()` (combining both) is **not** covered by this packet — see "Out of scope".

### `src/services/auth/next-step.ts` (current full content — DO NOT MODIFY)

```ts
// Central next-step router (ADR-10, architecture-plan.md). Maps the server's
// `nextStep` field (see NextStep in @/services/api/dto/auth) to the mobile
// route it drives. Accepts `string` (not just the closed NextStep union) so a
// future server value degrades to onboarding rather than a dead end — never
// throw, never return an empty/invalid route.
//
// Pure function: no navigation side effects. Returns `Href` via assertion
// because Expo Router's typed-routes file (.expo/types/router.d.ts) is
// machine-local/regenerated tooling output — this module's typecheck must not
// depend on it. These are real, known route files, not an `any` escape hatch.
import type { Href } from 'expo-router';

export function resolveNextStep(nextStep: string): Href {
  switch (nextStep) {
    case 'consent':
      return '/(auth)/consent' as Href;
    case 'complete_profile':
      return '/(auth)/complete-profile' as Href;
    case 'whatsapp_enrollment':
      return '/(auth)/whatsapp' as Href;
    case 'assessment':
      return '/(auth)/onboarding' as Href;
    default:
      return '/(auth)/onboarding' as Href;
  }
}
```

Verified this session: comparing the returned `Href` against a plain string literal via
`expect(...).toBe('/(auth)/consent')` typechecks cleanly under this project's `tsc --noEmit` (no
`Href` narrowing issue) — `expo-router`'s `Href` type here resolves permissively because the
typed-routes augmentation file is not present in a fresh checkout, exactly as the module's own
comment states. Do not add an `as Href` cast or any type assertion in the test file; a plain
string literal is sufficient.

### `maskEmail` — the one function under test from `src/components/balencia/auth-inputs.tsx`
(embedded per-instruction: just the function + its export line; **do not** embed or reproduce the
rest of that 877-line file, and do not modify it)

```ts
export function maskEmail(email: string): string {
  const trimmed = email.trim();
  if (!trimmed) {
    return '';
  }
  const atIndex = trimmed.indexOf('@');
  if (atIndex === -1 || atIndex === 0) {
    const firstChar = trimmed.charAt(0);
    return `${firstChar}***`;
  }
  const localPart = trimmed.substring(0, atIndex);
  const domain = trimmed.substring(atIndex + 1);
  return `${localPart.charAt(0)}***@${domain}`;
}
```

Pinned behavior (verified this session by actually running the real function, not
re-derived from reading the source — see the exact mapping table in the Contract section):
trims whitespace first; empty (post-trim) string → `''`; no `'@'` present → `firstChar + '***'`
(no domain suffix); `'@'` at index 0 (empty local part, e.g. `'@x.com'`) → same
`firstChar + '***'` branch, so `'@x.com'` → `'@***'`; otherwise → `localPart.charAt(0) + '***@' + domain`,
which means a 1-character local part (e.g. `'j@x.com'`) produces the **same** output shape as a
multi-character one (`'j***@x.com'`) — `localPart.charAt(0)` on a 1-char string is just that
character, there is no special case.

### `src/services/api/errors.ts` (current full content — DO NOT MODIFY)

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

**Exact constructor usage** (this is the only correct call shape — a single options object, not
positional args): `new ApiError({ message: string, status: number, code?: string, requestId?: string, details?: unknown })`.
`code`, `requestId`, `details` are all optional — omit any you don't need for a given test case;
do not pass `undefined` explicitly (just omit the key).

### `src/services/auth/session-machine.test.ts` (current full content — embedded for **conventions
only**; this file is not touched, not extended, not imported by any MP9 test)

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

Conventions to mirror in `registration-flow.test.ts` and `next-step.test.ts`: `describe`/`it` from
`'vitest'` (no `test()` alias anywhere in this codebase), reducer tests build a `state` variable
and thread it through successive `reducer(state, action)` calls or (for MP9's smaller reducer)
independent `it` blocks per transition, `toBe` for reference-identity assertions (this codebase
cares that `RESET`/`NO_SESSION`-style "return to initial" actions return the **same object
reference**, not just an equal one — see `initialRegistrationFlowState` note in the Contract
section), `toEqual` for structural/value assertions. Two-space indent, single quotes, semicolons —
match `.prettierrc`/existing style (no explicit prettier config file was found; the codebase's own
files are the style authority — mirror this file's formatting exactly).

### `src/services/api/client.401.test.ts` (mock-setup region — top of file, lines 1–40; embedded
for the `vi.mock`/`vi.stubGlobal`/`beforeEach`/`afterEach` conventions)

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

  // ...test bodies omitted here (unrelated to MP9; full file is 84 lines, untouched)
});
```

**Important:** this file demonstrates `vi.fn()` + `vi.stubGlobal()`/`vi.unstubAllGlobals()` for
mocking a *global* (`fetch`) — it does **not** demonstrate `vi.mock(moduleSpecifier, factory)` for
mocking an *imported module*, because none of the ten pre-existing test files import
`react-native` or any `expo-*` package (verified by grep this session — zero `vi.mock(` calls
exist anywhere in the current test suite). `device.test.ts` and `mask-email.test.ts` are the
**first** files in this codebase to need `vi.mock()` of a module. There is no house convention to
copy for that pattern — the Contract section below gives you the exact, verified-working recipe;
follow it precisely, do not improvise a different mocking shape (module-shape mismatches at mock
time fail as opaque "X is not a function" errors deep inside React Native internals, not as clear
type errors).

### `vitest.config.ts` (current full content — DO NOT MODIFY)

```ts
import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
```

Two consequences: (1) `environment: 'node'` — there is no DOM, no `jsdom`, no React Native
runtime; nothing in this codebase renders components in tests, and neither should MP9 (2)
`include: ['src/**/*.test.ts']` — note the extension is `.test.ts`, **not** `.test.tsx`; even
though `mask-email.test.ts` imports from a `.tsx` source file, the test file itself must be named
`mask-email.test.ts` (no JSX is written in the test file itself, so `.ts` is correct and matches
every other test file in this codebase — there are currently zero `.test.tsx` files, do not be the
first).

## Contract

### The `react-native` parse-failure — verified this session, mandatory fix

Attempting to `import` anything from `device.ts` or `auth-inputs.tsx` (even transitively, e.g.
`await import('@/services/auth/device')`) **without** first calling `vi.mock('react-native', ...)`
fails with:

```
RollupError: Parse failure: Expected 'from', got 'typeOf'
At file: .../node_modules/react-native/index.js:27:7
  27 |  import typeof * as ReactNativePublicAPI from ".../index.js.flow";
```

This is because the installed `react-native@0.86.0` package's `index.js` entry point uses Flow
syntax (`import typeof`) that Vitest's Rollup-based transform cannot parse under the `node` test
environment this project uses (there is no Expo/Metro/React Native Jest preset wired into
`vitest.config.ts` — see embedded config above). This is **not** a bug in your test — it is the
expected, structural reason `vi.mock('react-native', ...)` is mandatory for these two files, and
it must be declared (via `vi.mock(...)` at the top of the test file, hoisted by Vitest before any
import runs) **before** the dynamic `import('@/services/auth/device')` /
`import('@/components/balencia/auth-inputs')` call.

### `device.test.ts` — exact mock shapes (verified working; 3 tests, all pass)

```ts
import { describe, it, expect, vi, beforeEach } from 'vitest';

const getItemAsync = vi.fn();
const setItemAsync = vi.fn();
const randomUUID = vi.fn();

vi.mock('react-native', () => ({
  Platform: { OS: 'ios', Version: '18.0' },
}));

vi.mock('expo-secure-store', () => ({
  getItemAsync: (...args: unknown[]) => getItemAsync(...args),
  setItemAsync: (...args: unknown[]) => setItemAsync(...args),
}));

vi.mock('expo-crypto', () => ({
  randomUUID: () => randomUUID(),
}));

vi.mock('expo-device', () => ({
  osName: 'iOS',
  osVersion: '18.0',
  modelName: 'iPhone 15 Pro',
  // deviceName is the user-assigned nickname (PII, e.g. "Hamza's iPhone") — device.ts must
  // NEVER read it for the server's device_name column (ADR-11 item 4). Deliberately set to a
  // distinctive value here so getDeviceName's assertion below would fail loudly if it leaked.
  deviceName: "Hamza's iPhone",
}));

beforeEach(() => {
  vi.resetModules();
  getItemAsync.mockReset();
  setItemAsync.mockReset().mockResolvedValue(undefined);
  randomUUID.mockReset().mockReturnValue('generated-uuid');
});

describe('getDeviceId', () => {
  it('generates and persists a new id exactly once even for two concurrent callers', async () => {
    getItemAsync.mockResolvedValue(null);
    const { getDeviceId } = await import('@/services/auth/device');

    const [first, second] = await Promise.all([getDeviceId(), getDeviceId()]);

    expect(first).toBe('generated-uuid');
    expect(second).toBe('generated-uuid');
    expect(randomUUID).toHaveBeenCalledTimes(1);
    expect(setItemAsync).toHaveBeenCalledTimes(1);
    expect(setItemAsync).toHaveBeenCalledWith('balencia.device.id', 'generated-uuid');
  });

  it('returns the stored id without generating or persisting a new one', async () => {
    getItemAsync.mockResolvedValue('existing-device-id');
    const { getDeviceId } = await import('@/services/auth/device');

    const id = await getDeviceId();

    expect(id).toBe('existing-device-id');
    expect(randomUUID).not.toHaveBeenCalled();
    expect(setItemAsync).not.toHaveBeenCalled();
  });
});

describe('getDeviceName', () => {
  it('never returns Device.deviceName (PII) — only osName/osVersion/modelName', async () => {
    const { getDeviceName } = await import('@/services/auth/device');

    const name = getDeviceName();

    expect(name).toBe('iOS 18.0 · iPhone 15 Pro');
    expect(name).not.toContain("Hamza's iPhone");
  });
});
```

**Why `vi.resetModules()` + dynamic `await import(...)` per test, not a static top-level
import:** `device.ts` has module-scope mutable state (`cachedDeviceId`, `inFlightDeviceId`, both
declared with `let` at the top of the file). A single static `import { getDeviceId } from
'@/services/auth/device'` at the top of the test file would share **one** module instance across
every `it()` block — the first test's generated id would still be cached when the second test
("stored id" case) runs, making it impossible to test the "no stored id" and "stored id" branches
independently in the same file. `vi.resetModules()` inside `beforeEach` clears Vitest's module
registry so each `await import(...)` call gets a **fresh** module evaluation (fresh `let
cachedDeviceId = null`), while the `vi.fn()` mock instances themselves (`getItemAsync`,
`setItemAsync`, `randomUUID`) are declared once at file scope and only have their call history /
return values reset (`mockReset()`), not recreated — recreating them would break the mock
factories above, which close over these exact references and are only evaluated once (`vi.mock`
factories run once per module-registry generation, not once per `resetModules()` call in the way
you might expect; wiring the mocked module's exports to call through to the outer `vi.fn()`
via an arrow-function indirection, as done above, is what makes `mockReset()` on the outer
functions actually affect the freshly-imported module's behavior).

### `next-step.test.ts` — no mocking needed (verified working; 5 tests, all pass)

```ts
import { describe, it, expect } from 'vitest';
import { resolveNextStep } from '@/services/auth/next-step';

describe('resolveNextStep', () => {
  it('maps "consent" to the consent route', () => {
    expect(resolveNextStep('consent')).toBe('/(auth)/consent');
  });

  it('maps "complete_profile" to the complete-profile route', () => {
    expect(resolveNextStep('complete_profile')).toBe('/(auth)/complete-profile');
  });

  it('maps "whatsapp_enrollment" to the whatsapp route', () => {
    expect(resolveNextStep('whatsapp_enrollment')).toBe('/(auth)/whatsapp');
  });

  it('maps "assessment" to the onboarding route', () => {
    expect(resolveNextStep('assessment')).toBe('/(auth)/onboarding');
  });

  it('degrades any unrecognized value to onboarding rather than throwing or returning an invalid route', () => {
    expect(resolveNextStep('some_future_step')).toBe('/(auth)/onboarding');
    expect(resolveNextStep('')).toBe('/(auth)/onboarding');
  });
});
```

`next-step.ts` only imports a **type** (`Href` from `expo-router`), which TypeScript erases at
compile time and Vitest never has to load at runtime — no `vi.mock('expo-router', ...)` is needed
or permitted here.

### `registration-flow.test.ts` — no mocking needed (verified working; 3 tests, all pass)

```ts
import { describe, it, expect } from 'vitest';
import {
  registrationFlowReducer,
  initialRegistrationFlowState,
  type RegistrationFlowState,
} from '@/features/auth/registration-flow';

describe('registrationFlowReducer', () => {
  it('REGISTER_SUCCESS sets email, activationToken, step "otp", and cooldown', () => {
    const next = registrationFlowReducer(initialRegistrationFlowState, {
      type: 'REGISTER_SUCCESS',
      email: 'alex@example.com',
      activationToken: 'activation-token-1',
      cooldownEndsAt: 1_700_000_060_000,
    });

    const expected: RegistrationFlowState = {
      step: 'otp',
      email: 'alex@example.com',
      activationToken: 'activation-token-1',
      resendCooldownEndsAt: 1_700_000_060_000,
    };
    expect(next).toEqual(expected);
  });

  it('RESEND_SUCCESS replaces the activation token and resets the cooldown, keeping email and step', () => {
    const afterRegister: RegistrationFlowState = {
      step: 'otp',
      email: 'alex@example.com',
      activationToken: 'activation-token-1',
      resendCooldownEndsAt: 1_700_000_060_000,
    };

    const next = registrationFlowReducer(afterRegister, {
      type: 'RESEND_SUCCESS',
      activationToken: 'activation-token-2',
      cooldownEndsAt: 1_700_000_120_000,
    });

    const expected: RegistrationFlowState = {
      step: 'otp',
      email: 'alex@example.com',
      activationToken: 'activation-token-2',
      resendCooldownEndsAt: 1_700_000_120_000,
    };
    expect(next).toEqual(expected);
  });

  it('RESET returns the exact initial state object', () => {
    const dirtied: RegistrationFlowState = {
      step: 'otp',
      email: 'alex@example.com',
      activationToken: 'activation-token-2',
      resendCooldownEndsAt: 1_700_000_120_000,
    };

    const next = registrationFlowReducer(dirtied, { type: 'RESET' });

    expect(next).toBe(initialRegistrationFlowState);
    const expected: RegistrationFlowState = {
      step: 'form',
      email: '',
      activationToken: null,
      resendCooldownEndsAt: null,
    };
    expect(next).toEqual(expected);
  });
});
```

The `RESET` test's `expect(next).toBe(initialRegistrationFlowState)` (reference identity, not just
structural equality) is deliberate and matches the `session-machine.test.ts` convention embedded
above (that file also asserts `toBe` on user-object references, not just `toEqual`) — the reducer
literally `return`s the module-level `initialRegistrationFlowState` constant on `RESET` (see the
embedded source), not a freshly-constructed equal object, so `toBe` is the correct, stronger
assertion and must not be weakened to `toEqual`.

### `forgot-normalize.test.ts` — no mocking needed (verified working; 7 tests, all pass)

```ts
import { describe, it, expect } from 'vitest';
import { normalizeForgotPasswordOutcome } from '@/features/auth/forgot-normalize';
import { ApiError } from '@/services/api/errors';

describe('normalizeForgotPasswordOutcome', () => {
  it('maps the resolved "ok" case to {kind: "sent"}', () => {
    expect(normalizeForgotPasswordOutcome('ok')).toEqual({ kind: 'sent' });
  });

  it('normalizes a 404 ApiError to the IDENTICAL outcome object as "ok" (enumeration-safe)', () => {
    const okResult = normalizeForgotPasswordOutcome('ok');
    const notFoundResult = normalizeForgotPasswordOutcome(
      new ApiError({ message: 'No account found', status: 404 })
    );

    // Deep-equal to the 'ok' result, not just structurally coincidental — this is the
    // enumeration-safety invariant (canon §8): a 404 (unknown email) must be
    // indistinguishable from a 200 (known email) at the view-model layer.
    expect(notFoundResult).toEqual(okResult);
    expect(notFoundResult).toEqual({ kind: 'sent' });
  });

  it('normalizes code NOT_FOUND with a non-404 status (400) to {kind: "sent"}', () => {
    const result = normalizeForgotPasswordOutcome(
      new ApiError({ message: 'No account found', status: 400, code: 'NOT_FOUND' })
    );
    expect(result).toEqual({ kind: 'sent' });
  });

  it('maps a 429 with a details array [{retryAfter}] to rate-limited with the reported seconds', () => {
    const result = normalizeForgotPasswordOutcome(
      new ApiError({ message: 'Too many requests', status: 429, details: [{ retryAfter: 272 }] })
    );
    expect(result).toEqual({ kind: 'rate-limited', retryAfterSeconds: 272 });
  });

  it('maps a 429 with no details to rate-limited with retryAfterSeconds: null (never fabricated)', () => {
    const result = normalizeForgotPasswordOutcome(
      new ApiError({ message: 'Too many requests', status: 429 })
    );
    expect(result).toEqual({ kind: 'rate-limited', retryAfterSeconds: null });
  });

  it('maps a 429 with a details OBJECT (non-array) {retryAfter: 60} to rate-limited: 60', () => {
    const result = normalizeForgotPasswordOutcome(
      new ApiError({ message: 'Too many requests', status: 429, details: { retryAfter: 60 } })
    );
    expect(result).toEqual({ kind: 'rate-limited', retryAfterSeconds: 60 });
  });

  it('maps any other error status (500) to {kind: "error", message}', () => {
    const result = normalizeForgotPasswordOutcome(
      new ApiError({ message: 'Internal error', status: 500 })
    );
    expect(result).toEqual({ kind: 'error', message: 'Internal error' });
  });
});
```

### `mask-email.test.ts` — exact mock shape (verified working; 6 tests, all pass)

```ts
import { describe, it, expect, vi } from 'vitest';

// auth-inputs.tsx pulls in `react-native` (module-level `StyleSheet.create(...)` at the bottom
// of the file) and `@/constants/theme` (which itself imports `Platform` for `Fonts`/
// `BottomTabInset`). The real `react-native` package cannot be parsed under Vitest's default
// (Rollup/esbuild) transform — its entry file uses a Flow `import typeof` construct that is not
// valid TypeScript/ESM syntax, so any test that imports auth-inputs.tsx (directly or
// transitively) WITHOUT mocking `react-native` first fails with a Rollup parse error, not a
// logic error. This mock supplies just enough of the RN surface for the module to evaluate:
// `Platform.select` (theme.ts), `StyleSheet.create` (identity — the returned style objects are
// never asserted on here), and stub values for the component/API names auth-inputs.tsx
// references inside function bodies that this test never calls (AccessibilityInfo, Animated,
// Easing, Pressable, Text, TextInput, View) so those references resolve without throwing if
// anything at module scope happens to touch them.
vi.mock('react-native', () => ({
  Platform: {
    OS: 'ios',
    select: <T,>(spec: { ios?: T; android?: T; default?: T; web?: T }): T | undefined =>
      spec.ios ?? spec.default,
  },
  StyleSheet: {
    create: <T,>(styles: T): T => styles,
    absoluteFill: {},
  },
  AccessibilityInfo: {
    isReduceMotionEnabled: vi.fn(async () => false),
    addEventListener: vi.fn(() => ({ remove: vi.fn() })),
  },
  Animated: {
    Value: class {},
    Text: 'Animated.Text',
    View: 'Animated.View',
    timing: vi.fn(),
    parallel: vi.fn(() => ({ start: vi.fn() })),
  },
  Easing: {
    out: (fn: unknown) => fn,
    cubic: (t: number) => t,
  },
  Pressable: 'Pressable',
  Text: 'Text',
  TextInput: 'TextInput',
  View: 'View',
}));

describe('maskEmail', () => {
  it('masks a standard address to first-char + *** + @domain', async () => {
    const { maskEmail } = await import('@/components/balencia/auth-inputs');
    expect(maskEmail('john@x.com')).toBe('j***@x.com');
  });

  it('masks a 1-character local part the same way (first char + ***@domain)', async () => {
    const { maskEmail } = await import('@/components/balencia/auth-inputs');
    expect(maskEmail('j@x.com')).toBe('j***@x.com');
  });

  it('a string with no "@" falls back to firstChar + *** (no domain)', async () => {
    const { maskEmail } = await import('@/components/balencia/auth-inputs');
    expect(maskEmail('nodomain')).toBe('n***');
  });

  it('trims surrounding whitespace before masking', async () => {
    const { maskEmail } = await import('@/components/balencia/auth-inputs');
    expect(maskEmail('  spaced@x.com  ')).toBe('s***@x.com');
  });

  it('a leading "@" (empty local part) falls back to firstChar + *** (the "@" itself)', async () => {
    const { maskEmail } = await import('@/components/balencia/auth-inputs');
    expect(maskEmail('@x.com')).toBe('@***');
  });

  it('empty string returns empty string', async () => {
    const { maskEmail } = await import('@/components/balencia/auth-inputs');
    expect(maskEmail('')).toBe('');
  });
});
```

**A note on the `Animated.Value: class {}` mock:** an earlier draft used
`class { constructor(_value: number) {} }` to mirror the real `Animated.Value` constructor
signature. `npm run lint` flagged that as `@typescript-eslint/no-useless-constructor` (a
constructor that does nothing but exist is dead code by this codebase's lint config). Since
`maskEmail` and the module-level `StyleSheet.create(...)` call never actually construct an
`Animated.Value` (that only happens inside `ToastBanner`/`PasswordRequirementRow`'s function
bodies, which this test never renders or calls), the empty `class {}` — no constructor at all — is
both correct and lint-clean. Use exactly `Value: class {}`, verified lint-clean this session.

### Lint rules (binding — verbatim house patterns, required reading before writing any test file)

This codebase runs `eslint-config-expo` (flat config, `eslint.config.js`), which bundles
`eslint-plugin-react-hooks`'s React-Compiler-aligned rule set. Three rules are load-bearing
house convention and are non-negotiable across this codebase — reproduced verbatim from the
worker-rules used across every BIOS-003 mobile packet:

1. **No render-time ref access.** Never read or write a `ref.current` value during the render body
   (the function's synchronous top-level execution that produces JSX) — only inside `useEffect`
   bodies, event handlers, or other callbacks.

2. **`Animated.Value` must be constructed via the lazy `useState` initializer form —
   `useState(() => new Animated.Value(...))` — never `useRef(new Animated.Value(...)).current` and
   never a bare `new Animated.Value(...)` expression evaluated inline in the render body.** The
   `useRef(expr).current` form evaluates `expr` (the `new Animated.Value(...)` call) on **every**
   render even though React discards all but the first — that repeated construction of a new
   object during render is exactly what the purity-focused hooks rules flag. The function form
   passed to `useState` is guaranteed to run exactly once, on mount. Verbatim precedent (embedded
   above, `auth-inputs.tsx`): `const [opacity] = useState(() => new Animated.Value(0));`
   (`ToastBanner`) and `const [fadeAnim] = useState(() => new Animated.Value(met ? 1 : 0));`
   (`PasswordRequirementList`'s row component).

3. **No `Date.now()` (or any other non-deterministic/impure call) inside a component's render
   body.** Only call it inside event handlers, effects, or callback bodies — never inline while
   computing JSX or a `useState` initializer argument.

**Application to this packet:** MP9 writes zero React components — every target file is a plain
`.test.ts` module with no JSX, no hooks, no `Animated`, no render body of any kind. None of the
three rules has a **direct** application surface in this packet's own new code, exactly as MP7's
packet documented for its own inherited-context case. They are embedded here as binding
context for two reasons: (a) the `mask-email.test.ts` mock **does** construct a bare
`Animated: { Value: class {} }` stub inside a `vi.mock()` factory — this is a **mock module
factory**, not a component render body, so rule 2 does not apply to it (the factory runs once, at
mock-registration time, not per-render; there is no React reconciler involved at all in this
test), and this distinction must not be second-guessed into adding a `useState`-style wrapper
around the mock, which would be nonsensical outside a component; (b) if any future edit to this
packet's test files is tempted to add a helper React component (e.g. a wrapper to test a hook),
these three rules become directly binding at that point and must not be violated. No
`eslint-disable` comment of any kind appears in, or is needed for, this packet's five files —
if a draft adds one, that is a defect; remove it and fix the underlying code instead (per
`yhealth-app/CLAUDE.md` §1's `// reason:` convention for any unavoidable suppression — none is
warranted here).

## Design spec

Not applicable — MP9 is a test-authorship packet, not a screen packet. There is no visual surface
to build against a hi-fi spec. For traceability only (do not implement any of this — it is already
built, this packet only proves it):

- **ADR-8** (`architecture-plan.md`): defines the `RegistrationFlow` reducer's four-field
  in-memory state (`step`, `email`, `activationToken`, `resendCooldownEndsAt`) and the
  `activationToken`-never-persisted security requirement. `registration-flow.test.ts` proves the
  three state transitions the reducer exposes.
- **ADR-10**: defines both `resolveNextStep` (server `nextStep` → mobile route) and the
  client-side forgot-password enumeration-normalization rule ("a 404/`NOT_FOUND` normalizes to
  the IDENTICAL outcome as a 200"). `next-step.test.ts` and `forgot-normalize.test.ts` prove
  these respectively. The enumeration-safety rule is also stated in
  `scope-hifi-auth.md` §3 ("Consent & Safety", canon §8): *"Account enumeration safety: Sign-in
  errors never disclose whether an email has an account. Reset links use identical success
  framing for known and unknown emails."* — `forgot-normalize.test.ts`'s second test
  (`toEqual(okResult)`) is the mechanical proof of this exact sentence.
- **ADR-11 item 5** (token security review checklist): *"Client rate-limit handling — 429 → parse
  `Retry-After` when present, render live countdown ... never fabricate a countdown when the
  header is absent."* `forgot-normalize.test.ts`'s `retryAfterSeconds: null` test (429, no
  details) is the mechanical proof that this codebase never fabricates a countdown value.
- **ADR-11 item 4** (PII): *"email masked in UI via `MaskedDestinationLine` (`j***@…`)"* and
  *"device_name column... never `Device.deviceName`... that is PII and out of bounds."*
  `mask-email.test.ts` and `device.test.ts`'s `getDeviceName` case are the mechanical proof of
  each half of this item. `scope-hifi-auth.md` §3 independently states the same masking rule for
  S03b/S05: *"Email masking (S03b, S05): real = masked address (`j***@email.com`), honest-null =
  generic 'We sent a code to your email' (fabricated addresses forbidden)."*

## Acceptance criteria (mechanically checkable)

1. Exactly five new files exist at the paths listed under "Target files → CREATE", and no other
   file in the repository is modified (verify with `git status --short` — only five new/untracked
   `.test.ts` files, nothing else).
2. `cd /Users/hamza/Desktop/balencia-design/yhealth-app/mobile && npm run test` exits 0. This
   runs `node ./scripts/verify-mobile-source.mjs && vitest run --passWithNoTests` — the source
   verifier must also stay green (it scans all `src/**/*.ts(x)` including test files for the
   forbidden strings `SIA` and `Welcome to Expo|Expo Starter|Explore`; none of the five reference
   test files above contain any of those strings — do not introduce them).
3. Total suite is **65 passing tests across 16 test files** (41 pre-existing + 24 new: 3 in
   `registration-flow.test.ts` + 7 in `forgot-normalize.test.ts` + 3 in `device.test.ts` + 5 in
   `next-step.test.ts` + 6 in `mask-email.test.ts`). Zero failures, zero skipped.
4. All ten pre-existing test files still pass **unmodified** — `git diff` shows zero changes to
   any file under "Do not touch" above.
5. `cd /Users/hamza/Desktop/balencia-design/yhealth-app/mobile && npm run lint` (`expo lint`)
   exits 0 with **zero** warnings or errors on the five new files (this includes the
   `@typescript-eslint/no-useless-constructor` trap documented above — do not reintroduce it).
6. `cd /Users/hamza/Desktop/balencia-design/yhealth-app/mobile && npm run typecheck`
   (`tsc --noEmit`) exits 0. No `any`, no `@ts-ignore`/`@ts-expect-error` anywhere in the five new
   files.
7. `device.test.ts` and `mask-email.test.ts` each call `vi.mock('react-native', ...)` before any
   import of their subject module; `device.test.ts` additionally mocks `expo-secure-store`,
   `expo-crypto`, `expo-device`. Neither file's `vi.mock` factories reach into real Expo/RN
   modules at any point (no partial mock / `vi.importActual` — full replacement, as embedded
   above).
8. `device.test.ts`'s "two concurrent callers" test asserts `setItemAsync` and `randomUUID` were
   each called **exactly once** (`toHaveBeenCalledTimes(1)`), not merely that both concurrent
   calls resolved to the same value — the single-flight guard is the thing under test, and a
   test that only checks the return values would pass even if the guard were removed.
9. `forgot-normalize.test.ts`'s 404 case asserts `toEqual` against the **actual `'ok'` outcome
   object** returned by the same function (`normalizeForgotPasswordOutcome('ok')`), not against a
   hand-written `{ kind: 'sent' }` literal alone — both assertions are present (see the reference
   file: `expect(notFoundResult).toEqual(okResult)` AND `expect(notFoundResult).toEqual({ kind:
   'sent' })`), so a future change to the `'ok'` branch's shape would be caught by the same test
   that catches an enumeration-safety regression.
10. No test file imports, mocks, or otherwise references `session.ts`, `session-provider.tsx`,
    `session-machine.ts` (only `session-machine.test.ts` is embedded, for convention reference,
    and is not touched), `social.ts`, or any file under `src/app/(auth)/` — all out of scope (see
    below).

## Out of scope

- **Social sign-in service response mapping** (`src/services/auth/social.ts`, landed by MP3) —
  not one of the five files this packet's task assignment names; a future packet's job. Do not
  add a `social.test.ts`.
- **`session.adoptSession` / device-id persistence integration tests** (`session-provider.tsx`,
  `session.ts`) — not one of the five files this packet's task assignment names; a future
  packet's job. `device.test.ts` in this packet tests `device.ts` in isolation (mocked
  SecureStore/Crypto/Device), not its consumption by `session-provider.tsx`'s device-header
  injection. Do not add a `session-provider.test.ts` or `session.test.ts`.
- **`getDeviceHeaders()`** (the combinator at the bottom of `device.ts` that calls both
  `getDeviceId()` and `getDeviceName()`) — not explicitly required by this packet's task
  assignment; `getDeviceId` and `getDeviceName` are each tested directly and
  `getDeviceHeaders` is a trivial two-line composition of both with no independent branching
  logic to cover. Do not add a third `describe` block for it.
- **`RegistrationFlowProvider` / `useRegistrationFlow`** (the React context/provider half of
  `registration-flow.tsx`) — only the pure reducer (`registrationFlowReducer`,
  `initialRegistrationFlowState`) is in scope; the context plumbing has no independent logic
  (it is `useReducer` + `useMemo` + a thrown error on missing provider) and would require a React
  rendering harness this codebase does not have (`environment: 'node'`, no `@testing-library/react-native`
  dependency installed). Do not add one.
- **`extractRetryAfterSeconds`** as a separately-exported, separately-tested unit — it is
  exercised indirectly through `normalizeForgotPasswordOutcome`'s three 429 test cases (array,
  undefined, object), which is sufficient coverage of its three branches; a redundant direct-call
  test suite is not required and was not requested.
- **Any change to `errors.ts`, `vitest.config.ts`, `eslint.config.js`, `package.json`, or
  `tsconfig.json`** — all read-only for this packet.
- **New `it.each`/parametrized-table test helpers or a shared test-fixtures file** — each of the
  five target files is self-contained with inline literals (matching every existing test file's
  style, including `session-machine.test.ts`'s inline `mockUser`); do not introduce a
  `__fixtures__` dependency for these five files (the adapter tests' `__fixtures__` directory is
  for DTO-envelope fixtures unrelated to this packet's subject modules).
- **Coverage thresholds / `@vitest/coverage-v8` invocation** — `npm run test`/`test:unit` do not
  run `vitest run --coverage` today; do not add a coverage script or config change in this
  packet.
- **Server-side changes of any kind** — this is a mobile-only packet; nothing here touches
  `yhealth-app/server`.
