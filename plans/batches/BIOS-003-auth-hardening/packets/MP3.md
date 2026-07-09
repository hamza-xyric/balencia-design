# Packet MP3 — Social Sign-In Service + Expo Go Fallback

## Objective

Create a single new module, `src/services/auth/social.ts`, that wraps Apple and Google native sign-in for the mobile app per ADR-7 (mobile social-auth libraries + Expo Go fallback) and amendment A3 (Expo Go/simulator Apple-audience gate). It exposes:

- `appleSignIn()` — a plain async function using `expo-apple-authentication`, gated behind `AppleAuthentication.isAvailableAsync()` so Expo Go / simulators-without-a-signed-in-Apple-ID never render or attempt a broken button path.
- `useGoogleSignIn()` — a React hook wrapping `expo-auth-session`'s Google id-token provider, returning an `available` flag the UI uses to render either a real "continue with Google" button or the canon honest visible-but-gated state — **never a fake success**.

Both paths call the already-landed `socialAuth()` from `src/services/api/auth.ts` (MP2, landed) and return a typed result union so calling UI code (MP7, not this packet) never has to guess success/failure/cancellation/unavailability apart.

This is `MP3` in the BIOS-003 packet decomposition (`architecture-plan.md` §7, Wave 4 — mobile foundation, depends on MP2). MP2 is landed; its `socialAuth()` function and `SocialAuthRequest`/`SocialAuthResponse` types are embedded verbatim below and MUST be imported, not redeclared. Amendment A3 (`architecture-plan.md` §11) is binding and reproduced in full under "Contract" below — it supersedes any looser "Apple works natively in Expo Go" framing that appears earlier in the plan body.

## Target files (exact absolute paths)

**CREATE (only file this packet writes):**
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/services/auth/social.ts` — new file, full contents specified under "Contract" below.

**DO NOT MODIFY / DO NOT CREATE:**
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/package.json` — do not add `expo-apple-authentication` or `expo-auth-session` here. List them only under "Dependencies (lander installs)" below; the lander installs them before this packet's code is typechecked.
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/services/api/auth.ts` — import `socialAuth` from it. Do not edit it (MP2 already landed it).
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/services/api/dto/auth.ts` — import `SocialAuthRequest`/`SocialAuthResponse` from it. Do not edit it.
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/config/env.ts` — import `Env` from it. Do not edit it.
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/app.json` — read-only reference (confirms the Google reversed-client-id URL scheme is already registered natively; no app.json edit is needed for this packet — `expo-apple-authentication` needs no Info.plist entry, and the Google iOS URL scheme is already present). Do not edit it.
- Any file under `src/app/(auth)/` or `src/features/auth/` — screen wiring that consumes this service is MP7's scope, not this packet's.

## Dependencies (lander installs)

Before this packet's code is typechecked, the lander must run (from `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile`):

```bash
npx expo install expo-apple-authentication expo-auth-session
```

Using `expo install` (not raw `npm install`) is required so the versions resolve against the pinned Expo SDK 57 (`"expo": "~57.0.4"` in `package.json`) instead of latest-arbitrary. Do **not** hand-edit version strings into `package.json` — let the Expo CLI resolve them.

Both packages are Expo-Go-compatible (no custom native module / no dev-build requirement), per ADR-7. Their peer dependencies (`expo-web-browser`, `expo-crypto`) are already present in `package.json` (`expo-web-browser: ~57.0.0`, `expo-crypto: ~57.0.0`) — no additional installs needed for those.

No other `package.json` change is in scope for this packet.

## Embedded current source

All of the following is the **current, landed** content of files this packet imports from. Import names/paths must match exactly — do not invent alternate names.

### `src/services/api/auth.ts` (landed by MP2 — import `socialAuth` from here, do not modify)

```ts
import { apiFetch } from '@/services/api/client';
import type {
  CompleteProfileRequest,
  CompleteProfileResponse,
  ConsentRequest,
  ConsentResponse,
  ForgotPasswordRequest,
  RegisterRequest,
  RegisterResponse,
  ResendRegistrationOtpRequest,
  ResendRegistrationOtpResponse,
  ResetPasswordRequest,
  SkipWhatsAppResponse,
  SocialAuthRequest,
  SocialAuthResponse,
  VerifyRegistrationRequest,
  VerifyRegistrationResponse,
} from '@/services/api/dto/auth';

export function register(payload: RegisterRequest) {
  return apiFetch<RegisterResponse>('/auth/register', {
    method: 'POST',
    body: payload,
    skipAuth: true,
  });
}

export function verifyRegistration(payload: VerifyRegistrationRequest) {
  return apiFetch<VerifyRegistrationResponse>('/auth/verify-registration', {
    method: 'POST',
    body: payload,
    skipAuth: true,
  });
}

export function resendRegistrationOtp(payload: ResendRegistrationOtpRequest) {
  return apiFetch<ResendRegistrationOtpResponse>('/auth/resend-registration-otp', {
    method: 'POST',
    body: payload,
    skipAuth: true,
  });
}

export function socialAuth(payload: SocialAuthRequest) {
  return apiFetch<SocialAuthResponse>('/auth/social', {
    method: 'POST',
    body: payload,
    skipAuth: true,
  });
}

export function forgotPassword(payload: ForgotPasswordRequest) {
  return apiFetch<null>('/auth/forgot-password', {
    method: 'POST',
    body: payload,
    skipAuth: true,
  });
}

export function resetPassword(payload: ResetPasswordRequest) {
  return apiFetch<null>('/auth/reset-password', {
    method: 'POST',
    body: payload,
    skipAuth: true,
  });
}

export function submitConsent(payload: ConsentRequest) {
  return apiFetch<ConsentResponse>('/auth/consent', {
    method: 'POST',
    body: payload,
  });
}

export function completeProfile(payload: CompleteProfileRequest) {
  return apiFetch<CompleteProfileResponse>('/auth/complete-profile', {
    method: 'POST',
    body: payload,
  });
}

export function skipWhatsApp() {
  return apiFetch<SkipWhatsAppResponse>('/auth/whatsapp/skip', {
    method: 'POST',
  });
}
```

**Import you need from this file:** `import { socialAuth } from '@/services/api/auth';`

### `src/services/api/dto/auth.ts` (landed by MP2 — import types from here, do not modify)

Full current file (relevant excerpt — every symbol below already exists verbatim; import only what you need):

```ts
// Vendored from server/src/controllers/auth/* — captured 2026-07-08 (BIOS-002). Do not edit without re-verifying against the live server.
// BIOS-003 additions (2026-07-09): registration/OTP, social auth, forgot/reset password,
// consent, complete-profile, whatsapp-skip DTOs — verified against server auth.validator.ts
// + controller return shapes (see plans/batches/BIOS-003-auth-hardening/evidence/scope-server-auth.md §1).

export type Gender = 'male' | 'female' | 'non_binary' | 'prefer_not_to_say';

export type NextStep = 'consent' | 'complete_profile' | 'whatsapp_enrollment' | 'assessment';

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

// ... (LoginResponseDto, MeResponseDto, OnboardingStatusDto, LogoutResponseDto,
//      RegisterRequest/Response, VerifyRegistrationRequest/Response,
//      ResendRegistrationOtpRequest/Response — unchanged, omitted here for brevity;
//      not needed by this packet)

export interface SocialAuthRequest {
  email: string;
  provider: 'apple' | 'google';
  providerId?: string;
  idToken?: string;
  firstName?: string;
  lastName?: string;
}

export interface SocialAuthResponse {
  nextStep?: NextStep;
  isNewUser: boolean;
  needsProfileCompletion: boolean;
  user: PublicUserProfileDto;
  tokens: AuthTokensDto;
}

// ... (ForgotPasswordRequest/Response, ResetPasswordRequest/Response, ConsentRequest/Response,
//      CompleteProfileRequest/Response, SkipWhatsAppResponse — unchanged, omitted here;
//      not needed by this packet)
```

**Imports you need from this file:** `import type { SocialAuthResponse } from '@/services/api/dto/auth';` (you do NOT import `SocialAuthRequest` as a type annotation — you construct object literals matching its shape inline when calling `socialAuth(...)`; TypeScript structurally checks them against the imported function's parameter type automatically).

**CRITICAL — do not redeclare `SocialAuthRequest`, `SocialAuthResponse`, or `Gender`/`NextStep` in your new file.** Import, never duplicate.

### `src/config/env.ts` (FULL file — import `Env` from here, do not modify)

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

**Verified exact property names on `Env`:** `apiUrl`, `socketUrl`, `googleClientId`, `googleWebClientId`, `googleIosClientId` — all `string | undefined` except `apiUrl`/`socketUrl` (always `string`, validated at module load). **The task brief's assumption is confirmed correct**: `Env.googleIosClientId` and `Env.googleWebClientId` exist exactly as named. Use only these two for the Google hook (per Contract below) — do **not** use `Env.googleClientId` (that's the legacy/generic fallback source for `googleWebClientId`, not a separate id to pass anywhere).

**Import you need:** `import { Env } from '@/config/env';`

### `app.json` (relevant regions — read-only, confirms native config already in place)

```json
{
  "expo": {
    "scheme": "balencia",
    "ios": {
      "bundleIdentifier": "ai.xyric.balencia",
      "infoPlist": {
        "CFBundleURLTypes": [
          {
            "CFBundleURLSchemes": [
              "com.googleusercontent.apps.567394348304-nt0jprqnd9gjh67j8hv52me2rln2of58"
            ]
          }
        ]
      }
    }
  }
}
```

This confirms: (a) the Google iOS OAuth reversed-client-id URL scheme is **already registered** natively — `expo-auth-session`'s Google provider redirect will resolve without any app.json change from this packet; (b) the app's own custom scheme is `balencia` (not used directly by this packet, relevant only as background — social sign-in redirects use the Google reversed-client-id scheme above, not `balencia://`); (c) `expo-apple-authentication` requires no `Info.plist`/`app.json` entry to function — the "Sign in with Apple" entitlement is a build-capability concern (EAS build profile), not an app.json field, and is out of scope for this packet.

### `src/services/api/errors.ts` (reference only — for typing awareness, do not import in your new file unless you need `ApiError` for a narrower catch)

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

`socialAuth()` (via `apiFetch`) throws `ApiError`/`SessionExpiredError`/`NetworkError` on non-2xx or network failure. Your `appleSignIn()`/`useGoogleSignIn().signIn()` implementations must catch these (they surface as generic JS `Error` instances, since `ApiError extends Error`) and map them to `{kind:'error', message: error.message}` — `error.message` is the server's/ apiFetch's own message text (never raw token/credential data, since `apiFetch` never echoes request bodies into error messages).

### `tsconfig.json` path alias (confirms `@/` import convention used above)

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

So `@/services/api/auth`, `@/services/api/dto/auth`, `@/config/env` resolve to the files embedded above. Use these aliases, not relative `../../` paths (matches the house style already used in every file embedded above).

## Contract (exact types/props/signatures — verbatim)

Write `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/services/auth/social.ts` implementing exactly this surface:

```ts
export type SocialSignInResult =
  | { kind: 'success'; response: SocialAuthResponse }
  | { kind: 'unavailable'; reason: string }
  | { kind: 'cancelled' }
  | { kind: 'error'; message: string };

export function appleSignIn(): Promise<SocialSignInResult>;

export type UseGoogleSignInResult = {
  available: boolean;
  reason?: string;
  signIn(): Promise<SocialSignInResult>;
};

export function useGoogleSignIn(): UseGoogleSignInResult;
```

### ADR-7 + amendment A3 (binding — reproduced verbatim from `architecture-plan.md`)

**ADR-7 decision (mobile social-auth libraries):**
> **Apple:** `expo-apple-authentication` (native)... `AppleAuthentication.signInAsync` yields `identityToken` → POST `/auth/social` `{provider:'apple', idToken, email?, firstName?, lastName?}` (Apple returns name/email only on first consent — persist from the first response).
> **Google:** `expo-auth-session/providers/google` + `expo-web-browser`... System-browser OAuth → `id_token` → POST `/auth/social` `{provider:'google', idToken, ...}`. Configure iOS + web client ids from `EXPO_PUBLIC_GOOGLE_*`.
> **Fallback (honest, not faked):** the risk in Expo Go is the OAuth **redirect/client-id** config, not module availability. If a verifiable Google `id_token` cannot be obtained in Expo Go, render the "continue with Google" button as **visible-but-gated**... never a fake success, never a dead end.

**Amendment A3 (binding, supersedes any looser "Apple works in Expo Go via Expo Go's own entitlement" claim elsewhere in the plan):**
> ADR-7's "Apple works in Expo Go via Expo Go's own entitlement" is retracted as a primary-path claim; if Expo Go issues the token, `aud` would be Expo Go's identifier and ADR-5's audience check (bundle id `ai.xyric.balencia`) would 401 it. Resolution: (a) server verifier reads audiences from env `APPLE_CLIENT_IDS`... (b) **mobile gates Apple sign-in behind `AppleAuthentication.isAvailableAsync()` → if unavailable (Expo Go/simulator), render the canon honest gated state, never a fake button path**; (c) server-side verification correctness is proven by unit tests...; real-device Apple E2E is **waivered**.

Item (b) is this packet's job: `appleSignIn()` MUST call `AppleAuthentication.isAvailableAsync()` first and return `{kind:'unavailable', reason:'apple-auth-unavailable'}` without attempting `signInAsync` when it resolves `false`. This is a **runtime gate inside the service function**, not a UI concern — MP7 (screen wiring, not this packet) is responsible for rendering the gated state when it receives `{kind:'unavailable', ...}`, but the gate check itself lives here so every caller gets the honest behavior for free.

### `appleSignIn()` — exact behavior

1. `const available = await AppleAuthentication.isAvailableAsync();`
   - `false` → return `{ kind: 'unavailable', reason: 'apple-auth-unavailable' }` immediately. Do not call `signInAsync`.
2. Otherwise, call:
   ```ts
   const credential = await AppleAuthentication.signInAsync({
     requestedScopes: [
       AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
       AppleAuthentication.AppleAuthenticationScope.EMAIL,
     ],
   });
   ```
3. `credential.identityToken === null` → return `{ kind: 'error', message: 'Apple did not return an identity token.' }`.
4. Otherwise call `socialAuth(...)` (imported from `@/services/api/auth`) with:
   ```ts
   {
     provider: 'apple',
     email: credential.email ?? '',
     idToken: credential.identityToken,
     firstName: credential.fullName?.givenName ?? undefined,
     lastName: credential.fullName?.familyName ?? undefined,
     providerId: credential.user,
   }
   ```
   On success, `await` the response and return `{ kind: 'success', response }`.
   **NOTE (from the task brief, binding):** Apple returns `email`/`fullName` ONLY on first consent — the server verifies the email from the ID token itself (ADR-5, JWKS `iss`/`aud`/`exp` + signature check), so an empty string for `email` is acceptable in the request: the server overrides from the verified token, it does not trust this client-supplied field for Apple. Do not add any client-side "require non-empty email" validation before this call — that would incorrectly block legitimate returning-user sign-ins (Apple omits email on subsequent consents).
5. On thrown error from `isAvailableAsync`/`signInAsync`/`socialAuth`:
   - If `(error as { code?: string })?.code === 'ERR_REQUEST_CANCELED'` → return `{ kind: 'cancelled' }`.
   - Otherwise → return `{ kind: 'error', message }` where `message` is `error instanceof Error ? error.message : 'Apple sign-in failed.'`. **Never** include `credential.identityToken`, `credential.authorizationCode`, or any other credential/token field inside this message string — construct the message from `error.message` only, never by interpolating request/credential data (ADR-11 item 2: no token/OTP in logs, and this message may be surfaced to logging/telemetry by the caller).

### `useGoogleSignIn()` — exact behavior

A React hook (must be called from a component/another hook, per React's rules of hooks — it is not safe to call from a plain async utility function). Implementation:

```ts
const [request, , promptAsync] = Google.useIdTokenAuthRequest({
  iosClientId: Env.googleIosClientId,
  webClientId: Env.googleWebClientId,
});
```

(Note: the hook's middle tuple element — the live `response` state — is intentionally skipped via the empty destructure slot; `promptAsync()`'s own resolved value carries the result you need, so the stale re-render-driven `response` state is not used.)

- If `request` is falsy, OR `Env.googleIosClientId` is falsy, OR `Env.googleWebClientId` is falsy → return:
  ```ts
  {
    available: false,
    reason: 'google-client-id-missing',
    signIn: async () => ({ kind: 'unavailable', reason: 'google-client-id-missing' }),
  }
  ```
  (`signIn` must still be a callable async function even when unavailable — callers should never need an `if (available)` guard before calling `signIn()`; the honest-unavailable result flows through the same call shape.)
- Otherwise return `{ available: true, signIn }` where `signIn` is:
  ```ts
  async (): Promise<SocialSignInResult> => {
    try {
      const result = await promptAsync();

      if (result.type === 'success') {
        const idToken = result.params?.id_token;
        if (!idToken) {
          return { kind: 'error', message: 'Google did not return an identity token.' };
        }
        const response = await socialAuth({ provider: 'google', email: '', idToken });
        return { kind: 'success', response };
      }

      if (result.type === 'cancel' || result.type === 'dismiss') {
        return { kind: 'cancelled' };
      }

      return { kind: 'error', message: 'Google sign-in failed.' };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Google sign-in failed.';
      return { kind: 'error', message };
    }
  }
  ```
  `result.params.id_token` is the Google implicit-flow ID-token field (`Google.useIdTokenAuthRequest` requests `response_type=id_token`, so the OAuth redirect returns `id_token` as a query param surfaced at `AuthSessionResult.params.id_token` on `type: 'success'`). Do not read `result.authentication?.idToken` instead — for the ID-token-only flow this field is not populated. **No fake success path**: never construct a `{kind:'success', ...}` result without an actual `idToken` obtained from `promptAsync()`'s real resolved value.

- Module-side-effect requirement: call `WebBrowser.maybeCompleteAuthSession();` once at module scope (top level of `social.ts`, outside any function/component) — this is the standard `expo-auth-session` + `expo-web-browser` requirement so the redirect-back-to-app promise resolves instead of hanging. `expo-web-browser` is already an installed dependency (`~57.0.0`), no install action needed for it.

### Required imports (exact module specifiers)

```ts
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useMemo } from 'react';

import { socialAuth } from '@/services/api/auth';
import type { SocialAuthResponse } from '@/services/api/dto/auth';
import { Env } from '@/config/env';
```

Wrap the `useGoogleSignIn` return value construction in `useMemo` (deps: `[request, promptAsync]`) so the hook doesn't hand back a new function identity on every render (avoids unnecessary re-renders in consuming components — MP7's screens will pass `signIn` into event handlers).

Naming collision guard: inside `signIn`'s implementation, name the `socialAuth(...)` result something other than `response` (e.g. `const apiResponse = await socialAuth(...)`) so it does not shadow the outer scope's skipped `response` slot and stays unambiguous under lint. Apply the same care in `appleSignIn` — no shadowed identifiers.

## Design spec

Not applicable — this is a pure service module with no rendered UI (no screen, no component). ADR-7's "visible-but-gated" and "never a fake success/dead end" rules are **behavioral contracts on this service's return values** (the `unavailable`/`cancelled`/`error` result kinds above exist specifically so MP7's screens can render the canon honest states correctly); this packet does not render any `LockedFeatureState`/chip/button itself. Do not add any React Native `View`/`Text`/style code to `social.ts` — if you find yourself importing from `react-native` or `@/components/balencia`, stop: that belongs in MP7, not here.

## Acceptance criteria (mechanically checkable)

1. `npx tsc --noEmit` (or the project's `npm run typecheck`) passes with `social.ts` included — no `any`, no `@ts-ignore` without a `// reason:` comment (house rule, `yhealth-app/CLAUDE.md` §1).
2. `social.ts` exports exactly: `SocialSignInResult` (type), `appleSignIn` (function), `UseGoogleSignInResult` (type), `useGoogleSignIn` (function) — matching the signatures under "Contract" verbatim.
3. `appleSignIn()`'s first statement of substance is the `isAvailableAsync()` check; `signInAsync` is never reachable when it resolves `false` (static-readable from the code: the `unavailable` branch must `return` before any call to `signInAsync`).
4. `useGoogleSignIn()` never returns `available: true` when either `Env.googleIosClientId` or `Env.googleWebClientId` is falsy, and never returns a `{kind:'success', ...}` result without a real non-empty `idToken` string obtained from `promptAsync()`.
5. Grep gate (ADR-11 item 2): `grep -rnE "console\.(log|warn|error|info)" src/services/auth/social.ts` must return either nothing, or only lines whose interpolated values are drawn from `error.message`/a hardcoded string — never `credential.identityToken`, `credential.authorizationCode`, `idToken`, `result.params`, or any other token-shaped value. (Simplest compliant implementation: no `console.*` calls in this file at all.)
5b. No token value (`identityToken`, `authorizationCode`, `idToken`, raw `credential`/`result` objects) is ever interpolated into any `Error`/string constructed in this file — messages are limited to the two literal strings specified in Contract (`'Apple did not return an identity token.'`, `'Google did not return an identity token.'`, `'Google sign-in failed.'`) plus `error.message` from caught errors.
6. Existing tests remain green: `npm run test` (Vitest, per `yhealth-app/mobile` conventions) — this packet adds no test file itself (MP9's scope) but must not break `client.401.test.ts`, `session-machine.test.ts`, or `dto.satisfies.test.ts`.
7. `npm run lint` (`expo lint`) passes on the new file — no unused imports (in particular, do not import `SocialAuthRequest` if you never reference it as a type; you may omit it entirely per the "Imports you need" note above), no shadowed variable warnings.
8. The file imports `socialAuth` from `@/services/api/auth` and `SocialAuthResponse` from `@/services/api/dto/auth` — it does not redeclare either.
9. `package.json` is untouched by this packet's diff (dependency additions happen only via the lander's `npx expo install` step, tracked separately from this packet's file diff).

## Out of scope

- Wiring `appleSignIn`/`useGoogleSignIn` into any screen, button, or the sign-in/sign-up UI (`S03`/`S04`) — that is MP7 ("Social buttons + complete-profile").
- Rendering the canon `LockedFeatureState`/gated-chip UI for the `unavailable` result — MP7.
- `package.json` edits of any kind — lander's job (see "Dependencies" above); do not touch this file.
- `app.json` edits (e.g. adding an `expo-apple-authentication` config plugin entry, Android `googleServicesFile`, or Android OAuth client ids) — the Google iOS URL scheme is already present; no other native config change is in this packet's scope. Android social sign-in is not addressed by this packet or by ADR-7 (iOS Simulator/Expo Go is the batch's target per `yhealth-app/AGENTS.md`).
- Server-side Apple JWKS verification, `APPLE_CLIENT_IDS` env wiring, or Google audience hardening — SP2/SP8 (server packets), already contracted separately.
- Unit tests for this service's response mapping (fixtures for success/cancelled/unavailable/error) — MP9's scope explicitly lists "social service response mapping" as its own deliverable; do not add a `social.test.ts` in this packet.
- Any change to `src/services/auth/session.ts`, `session-provider.tsx`, or `session-machine.ts` (MP1, already landed) — `appleSignIn`/`useGoogleSignIn` return `SocialAuthResponse` (containing `tokens`/`user`); calling `useSession().adoptSession(response.tokens, response.user)` after a `{kind:'success', ...}` result is MP7's job, not this packet's.
- Device-id / `X-Device-Id` header concerns — handled transparently by `apiFetch` (via MP1's device-headers provider), not this packet.
