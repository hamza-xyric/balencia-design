# Packet MP2 — Mobile Auth DTOs + API Service Functions

## Objective

Add the request/response DTO types and typed `apiFetch` wrapper functions needed by the BIOS-003 mobile registration / OTP / social-auth / forgot-reset / consent / complete-profile / WhatsApp-skip flows. This packet is **types + thin fetch wrappers only** — no screens, no state machines, no social-auth libraries, no UI. It unblocks MP3 (social lib service), MP5 (registration/OTP screens), MP6 (forgot/reset screens), MP7 (social buttons + complete-profile), MP8 (WhatsApp gated+skip), all of which import from the two files this packet creates/extends.

This is `MP2` in the BIOS-003 packet decomposition (`architecture-plan.md` §7, Wave 4 — mobile foundation, no dependencies, buildable in parallel with MP1). The plan's amendments (§11, A1–A7) do not touch MP2's scope; nothing here conflicts with them.

## Target files

**CREATE**
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/services/api/auth.ts` — new file. Nine typed functions wrapping `apiFetch` for the new auth endpoints.

**MODIFY (additive only — do not remove, rename, or reformat any existing exported symbol)**
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/services/api/dto/auth.ts` — append the new interfaces/types below the existing content. Every symbol currently exported from this file (`PublicUserProfileDto`, `AuthTokensDto`, `LoginResponseDto`, `MeResponseDto`, `OnboardingStatusDto`, `LogoutResponseDto`) must still exist, unchanged, byte-for-byte, after your edit.

**DO NOT MODIFY**
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/services/api/dto/index.ts` — it already does `export * from './auth';` (see embedded content below), so every new type/interface you add to `dto/auth.ts` is automatically re-exported through the `@/services/api/dto` barrel. No edit needed here.
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/services/api/client.ts` — import from it (`apiFetch`), do not change it.
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/services/api/dto/envelope.ts` — reference only.
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/services/auth/session.ts`, `session-provider.tsx`, `session-machine.ts` — these belong to MP1 (session alignment). Do not touch them, even though `session-provider.tsx` currently calls `apiFetch('/auth/login', ...)` inline rather than through an `api/auth.ts` function — that inconsistency is intentional and out of scope for MP2 (see "Out of scope").

## Embedded current source

### `src/services/api/dto/auth.ts` (current full content — MODIFY, append below this)

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

Keep the header comment. Your additions go after `LogoutResponseDto`; you may add a second header comment above the new block, e.g. `// BIOS-003 additions — registration/OTP/social/forgot-reset/consent/complete-profile/whatsapp. Captured 2026-07-09.`

### `src/services/api/dto/envelope.ts` (current full content — reference only, do not modify)

```ts
// Vendored from shared API wire contract — captured 2026-07-08 (BIOS-002). Do not edit without re-verifying against the live server.

export interface Envelope<T> {
  success: true;
  message?: string;
  timestamp?: string;
  data: T;
}

export interface ApiErrorBody {
  success: false;
  message: string;
  code: string;
  errors?: unknown[];
  timestamp?: string;
  requestId?: string;
}
```

### `src/services/api/dto/index.ts` (current full content — reference only, do not modify)

```ts
// Vendored from API type index — captured 2026-07-08 (BIOS-002). Do not edit without re-verifying against the live server.

export * from './envelope';
export * from './auth';
export * from './overview';
export * from './goals';
export * from './gamification';
export * from './life-areas';
export * from './workouts';
export * from './ai-coach';
export * from './preferences';
export * from './user-self';
```

### `src/services/api/client.ts` (current full content — IMPORT FROM, do not modify)

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

**Key facts your code depends on:**
- `apiFetch<T>(path, options)` already unwraps the envelope — it returns `Envelope<T>['data']` directly (see `processResponse`). Your wrapper functions must type their return as the bare response-data shape (`RegisterResponse`, not `Envelope<RegisterResponse>`).
- `apiFetch` already sets `X-Client: mobile` and `Content-Type: application/json` on every call — never set these headers yourself.
- `skipAuth: true` skips both the `staleGuard` pre-check and the `Authorization` header — use it for every pre-session call (register, verify, resend, social, forgot-password, reset-password). Omit it (defaults to `false`) for authenticated calls (consent, complete-profile, whatsapp/skip) — the `Authorization: Bearer <token>` header is attached automatically via the `authTokenProvider` registered by `SessionProvider` (MP1's territory, already wired for `/auth/me` etc.).
- `retry` defaults to `false` for every non-GET method (`shouldRetry = options.retry ?? method === 'GET'`) — all nine new functions are POST, so you do not need to pass `retry: false` explicitly; leaving it unset already yields no-retry.
- Paths are passed **without** an `/api` prefix, e.g. `'/auth/refresh'`, `'/auth/login'` (see `src/services/auth/session.ts:98` and `src/services/auth/session-provider.tsx:74,104,129,150` — `API_BASE_URL` already contains whatever prefix segment the deployed server needs). Follow the same convention: `'/auth/register'`, `'/auth/verify-registration'`, etc.

### `src/services/api/trust.ts` (existing sibling module — style precedent only, do not modify)

```ts
import { apiFetch } from '@/services/api/client';
import {
  DeleteAccountResponseDto,
  DELETE_ACCOUNT_CONFIRMATION,
  UserDataExportDto,
} from '@/services/api/dto/user-self';
import {
  PreferencesResponseDto,
  PrivacyPatchResponseDto,
  PrivacyPreferencesDto,
} from '@/services/api/dto/preferences';

export async function exportMyData(): Promise<UserDataExportDto> {
  return apiFetch<UserDataExportDto>('/v1/users/me/export', {
    method: 'GET',
    retry: false,
    timeoutMs: 30000,
  });
}

export async function deleteMyAccount(args: { password?: string }): Promise<DeleteAccountResponseDto> {
  const body: { password?: string; confirmation: typeof DELETE_ACCOUNT_CONFIRMATION } = {
    confirmation: DELETE_ACCOUNT_CONFIRMATION,
  };

  if (typeof args.password === 'string' && args.password.length > 0) {
    body.password = args.password;
  }

  return apiFetch<DeleteAccountResponseDto>('/v1/users/me', {
    method: 'DELETE',
    body,
    retry: false,
  });
}

export async function getPreferences(): Promise<PreferencesResponseDto> {
  return apiFetch<PreferencesResponseDto>('/preferences', {
    method: 'GET',
  });
}

export async function updatePrivacy(patch: Partial<PrivacyPreferencesDto>): Promise<PrivacyPatchResponseDto> {
  return apiFetch<PrivacyPatchResponseDto>('/preferences/privacy', {
    method: 'PATCH',
    body: patch,
  });
}
```

This is the house style for `src/services/api/*.ts` files: `import { apiFetch } from '@/services/api/client';` + `import type {...} from '@/services/api/dto/auth';` (type-only imports where possible — this codebase mixes `import type` and plain `import` for DTOs across files; use `import type` for the new file since every DTO import is type-only), one exported `async function` per endpoint, thin body — no business logic, no error handling beyond what `apiFetch`/`ApiError`/`SessionExpiredError` already provide. **`src/services/api/auth.ts` must follow this exact shape.**

### `src/validators/auth.validator.ts` (server, current full content — ground truth for request shapes, read-only reference)

This is the live Zod validator the server actually enforces (`/Users/hamza/Desktop/balencia-design/yhealth-app/server/src/validators/auth.validator.ts`), captured this session:

```ts
import { z } from 'zod';
import { commonSchemas } from '../middlewares/validate.middleware.js';

const genderEnum = z.enum(['male', 'female', 'non_binary', 'prefer_not_to_say']);

// S01.1.1: Core Account Registration
export const registerSchema = z.object({
  email: safeEmail,
  password: commonSchemas.password,
  firstName: z.string().trim().min(2).max(50),
  lastName: z.string().trim().min(2).max(50),
  dateOfBirth: dateOfBirth,       // string or Date; server requires age 18+
  gender: genderEnum,
});

// S01.1.2: Social Sign-In
export const socialAuthSchema = z.object({
  provider: z.enum(['google', 'apple']),
  email: z.string().email('Invalid email format'),   // REQUIRED — no .optional()
  providerId: z.string().optional(),
  idToken: z.string().optional(),
  name: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  avatar: z.string().url().optional().nullable(),
  accessToken: z.string().optional(),
});

// Social auth completion (for missing fields)
export const completeSocialProfileSchema = z.object({
  dateOfBirth: dateOfBirth,
  gender: genderEnum,
  firstName: z.string().trim().min(2).max(50).optional(),
  lastName: z.string().trim().min(2).max(50).optional(),
});

// S01.1.3: Privacy Consent
export const consentSchema = z.object({
  termsOfService: z.boolean().refine(val => val === true, '...'),
  privacyPolicy: z.boolean().refine(val => val === true, '...'),
  emailMarketing: z.boolean().optional().default(false),
  whatsAppCoaching: z.boolean().optional().default(false),
});

export const forgotPasswordSchema = z.object({ email: commonSchemas.email });

export const resetPasswordSchema = z.object({
  email: commonSchemas.email,
  otp: z.string().length(4).regex(/^\d{4}$/),
  password: commonSchemas.password,
  confirmPassword: z.string().min(1),
}).refine(data => data.password === data.confirmPassword, {...});

export const verifyRegistrationSchema = z.object({
  activationToken: z.string().min(1),
  activationCode: z.string().length(4).regex(/^\d{4}$/),
});

export const resendRegistrationOTPSchema = z.object({
  activationToken: z.string().min(1),
});
```

**IMPORTANT — resolved plan/live-source conflict:** the packet-composition instruction that generated this task described `SocialAuthRequest` with `email?` (optional). The live `socialAuthSchema` above (`src/validators/auth.validator.ts:52`) requires `email: z.string().email()` — **not optional**. Per the source hierarchy (live server validator wins over prose description), `SocialAuthRequest.email` is typed **required** (`email: string`) in the Contract section below, not optional. Callers in MP3/MP7 (the social sign-in service and its screen consumers) must always resolve a real email before calling `socialAuth()` — from Apple's identity payload on first consent (cached client-side for subsequent sign-ins, per ADR-7) or from the verified Google profile. This is noted here so MP3/MP7 composers do not get surprised by a 400 from the server.

## Contract (exact types/functions — verbatim, add these)

Append to `src/services/api/dto/auth.ts`, after the existing `LogoutResponseDto` line:

```ts
// BIOS-003 additions — registration/OTP/social/forgot-reset/consent/complete-profile/whatsapp.
// Server shapes traced in evidence/scope-server-auth.md §1 (auth-registration.controller.ts,
// auth-session.controller.ts, auth-onboarding.controller.ts) + src/validators/auth.validator.ts.
// Captured 2026-07-09.

export type Gender = 'male' | 'female' | 'non_binary' | 'prefer_not_to_say';

// The server's nextStep field is a small closed set today (see literals below), but this type
// is consumed by a router (resolveNextStep, built in MP5+) that must not crash on an
// unrecognized value from a future server change — treat any value outside the four known
// literals as "unknown" at the call site and fall back safely (do not assume exhaustiveness).
export type NextStep = 'consent' | 'complete_profile' | 'whatsapp_enrollment' | 'assessment';

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string; // ISO 8601 date, e.g. '1998-04-12'
  gender: Gender;
}

export interface RegisterResponse {
  activationToken: string;
  message: string;
}

export interface VerifyRegistrationRequest {
  activationToken: string;
  activationCode: string; // 4-digit numeric string
}

export interface VerifyRegistrationResponse {
  user: PublicUserProfileDto;
  tokens: AuthTokensDto;
  nextStep: NextStep; // always 'consent' in the current server implementation
}

export interface ResendRegistrationOtpRequest {
  activationToken: string;
}

export interface ResendRegistrationOtpResponse {
  activationToken: string;
  message: string;
}

export interface SocialAuthRequest {
  provider: 'google' | 'apple';
  email: string; // REQUIRED — see "resolved plan/live-source conflict" note above
  providerId?: string;
  idToken?: string;
  firstName?: string;
  lastName?: string;
}

export interface SocialAuthResponse {
  user: PublicUserProfileDto;
  tokens: AuthTokensDto;
  isNewUser: boolean;
  needsProfileCompletion: boolean;
  nextStep?: NextStep;
}

export interface ForgotPasswordRequest {
  email: string;
}

export type ForgotPasswordResponse = null;

export interface ResetPasswordRequest {
  email: string;
  otp: string; // 4-digit numeric string
  password: string;
  confirmPassword: string;
}

export type ResetPasswordResponse = null;

export interface ConsentRequest {
  termsOfService: boolean;
  privacyPolicy: boolean;
  emailMarketing?: boolean;
  whatsAppCoaching?: boolean;
}

export interface ConsentResponse {
  user: PublicUserProfileDto;
  nextStep: NextStep; // always 'whatsapp_enrollment' in the current server implementation
}

export interface CompleteProfileRequest {
  dateOfBirth: string; // ISO 8601 date
  gender: Gender;
  firstName?: string;
  lastName?: string;
}

export interface CompleteProfileResponse {
  user: PublicUserProfileDto;
  nextStep: NextStep; // always 'consent' in the current server implementation
}

export interface SkipWhatsAppResponse {
  nextStep: NextStep; // always 'assessment' in the current server implementation
}
```

Naming note: these new names deliberately do **not** carry the `Dto` suffix used by the pre-existing types in this file (`PublicUserProfileDto`, `LoginResponseDto`, etc.) — this matches the exact names specified in the BIOS-003 packet contract (`RegisterRequest`, `SocialAuthResponse`, ...) that MP3/MP5/MP6/MP7/MP8/MP9 will import by these exact identifiers. Do not rename the pre-existing `*Dto` types to match, and do not add a `Dto` suffix to the new ones — both conventions coexist in this file going forward.

Create `src/services/api/auth.ts` (new file):

```ts
import { apiFetch } from '@/services/api/client';
import type {
  RegisterRequest,
  RegisterResponse,
  VerifyRegistrationRequest,
  VerifyRegistrationResponse,
  ResendRegistrationOtpRequest,
  ResendRegistrationOtpResponse,
  SocialAuthRequest,
  SocialAuthResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  ConsentRequest,
  ConsentResponse,
  CompleteProfileRequest,
  CompleteProfileResponse,
  SkipWhatsAppResponse,
} from '@/services/api/dto/auth';

export function register(input: RegisterRequest): Promise<RegisterResponse> {
  return apiFetch<RegisterResponse>('/auth/register', {
    method: 'POST',
    skipAuth: true,
    body: input,
  });
}

export function verifyRegistration(
  input: VerifyRegistrationRequest
): Promise<VerifyRegistrationResponse> {
  return apiFetch<VerifyRegistrationResponse>('/auth/verify-registration', {
    method: 'POST',
    skipAuth: true,
    body: input,
  });
}

export function resendRegistrationOtp(
  input: ResendRegistrationOtpRequest
): Promise<ResendRegistrationOtpResponse> {
  return apiFetch<ResendRegistrationOtpResponse>('/auth/resend-registration-otp', {
    method: 'POST',
    skipAuth: true,
    body: input,
  });
}

export function socialAuth(input: SocialAuthRequest): Promise<SocialAuthResponse> {
  return apiFetch<SocialAuthResponse>('/auth/social', {
    method: 'POST',
    skipAuth: true,
    body: input,
  });
}

export function forgotPassword(input: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
  return apiFetch<ForgotPasswordResponse>('/auth/forgot-password', {
    method: 'POST',
    skipAuth: true,
    body: input,
  });
}

export function resetPassword(input: ResetPasswordRequest): Promise<ResetPasswordResponse> {
  return apiFetch<ResetPasswordResponse>('/auth/reset-password', {
    method: 'POST',
    skipAuth: true,
    body: input,
  });
}

export function submitConsent(input: ConsentRequest): Promise<ConsentResponse> {
  return apiFetch<ConsentResponse>('/auth/consent', {
    method: 'POST',
    body: input,
  });
}

export function completeProfile(
  input: CompleteProfileRequest
): Promise<CompleteProfileResponse> {
  return apiFetch<CompleteProfileResponse>('/auth/complete-profile', {
    method: 'POST',
    body: input,
  });
}

export function skipWhatsApp(): Promise<SkipWhatsAppResponse> {
  return apiFetch<SkipWhatsAppResponse>('/auth/whatsapp/skip', {
    method: 'POST',
  });
}
```

Exact endpoint paths (server routes traced in `scope-server-auth.md` §1, mounted under `/api/auth`; mobile calls them relative to `API_BASE_URL` without the `/api` segment, matching the existing `/auth/refresh`, `/auth/login`, `/auth/me`, `/auth/logout` call sites in `session.ts`/`session-provider.tsx`):

| Function | Path | Method | Auth |
|---|---|---|---|
| `register` | `/auth/register` | POST | `skipAuth: true` |
| `verifyRegistration` | `/auth/verify-registration` | POST | `skipAuth: true` |
| `resendRegistrationOtp` | `/auth/resend-registration-otp` | POST | `skipAuth: true` |
| `socialAuth` | `/auth/social` | POST | `skipAuth: true` |
| `forgotPassword` | `/auth/forgot-password` | POST | `skipAuth: true` |
| `resetPassword` | `/auth/reset-password` | POST | `skipAuth: true` |
| `submitConsent` | `/auth/consent` | POST | authed (default) |
| `completeProfile` | `/auth/complete-profile` | POST | authed (default) |
| `skipWhatsApp` | `/auth/whatsapp/skip` | POST | authed (default), no body |

## Design spec

Not applicable — MP2 is a types/API-contract packet, not a screen packet. There is no visual surface to build against a hi-fi spec here. For context only (do not implement any of this — it belongs to later packets):
- ADR-8 (`architecture-plan.md`) defines the registration/OTP call sequence these functions serve: `register` → `verifyRegistration` (± `resendRegistrationOtp`) → `resolveNextStep` routing, built in MP5.
- ADR-9 defines the forgot/reset flow as OTP-based (`forgotPassword` → `resetPassword`, both consumed in MP6) — a documented deviation from the hi-fi S05b spec's link-token assumption; you do not need to read the hi-fi spec to complete MP2, the DTO shapes above already reflect the OTP contract.
- ADR-10 defines `resolveNextStep(nextStep)` — the router that will consume the `NextStep` union and every `nextStep`/`nextStep?` field defined above (built in MP5–MP8, not this packet).

## Acceptance criteria

1. `src/services/api/dto/auth.ts` contains every pre-existing exported symbol unchanged (`PublicUserProfileDto`, `AuthTokensDto`, `LoginResponseDto`, `MeResponseDto`, `OnboardingStatusDto`, `LogoutResponseDto`) plus the 17 new exported symbols from the Contract section (`Gender`, `NextStep`, `RegisterRequest`, `RegisterResponse`, `VerifyRegistrationRequest`, `VerifyRegistrationResponse`, `ResendRegistrationOtpRequest`, `ResendRegistrationOtpResponse`, `SocialAuthRequest`, `SocialAuthResponse`, `ForgotPasswordRequest`, `ForgotPasswordResponse`, `ResetPasswordRequest`, `ResetPasswordResponse`, `ConsentRequest`, `ConsentResponse`, `CompleteProfileRequest`, `CompleteProfileResponse`, `SkipWhatsAppResponse`).
2. `src/services/api/auth.ts` exists and exports exactly nine functions with the exact names, parameter types, and return types given in the Contract section: `register`, `verifyRegistration`, `resendRegistrationOtp`, `socialAuth`, `forgotPassword`, `resetPassword`, `submitConsent`, `completeProfile`, `skipWhatsApp`.
3. Every function's return type is the bare response DTO (e.g. `Promise<RegisterResponse>`), never wrapped in `Envelope<T>` — `apiFetch` already unwraps it.
4. `register`, `verifyRegistration`, `resendRegistrationOtp`, `socialAuth`, `forgotPassword`, `resetPassword` pass `skipAuth: true`; `submitConsent`, `completeProfile`, `skipWhatsApp` do not set `skipAuth` (default `false`, authenticated).
5. No `any` anywhere in either file. No `@ts-ignore`/`@ts-expect-error`.
6. `cd /Users/hamza/Desktop/balencia-design/yhealth-app/mobile && npm run typecheck` (= `tsc --noEmit`) exits 0.
7. `cd /Users/hamza/Desktop/balencia-design/yhealth-app/mobile && npm run test:unit` (= `vitest run --passWithNoTests`) exits 0 with no regressions — specifically `src/services/api/dto/dto.satisfies.test.ts` and `src/services/api/client.401.test.ts` still pass unmodified (this packet must not touch either test file or the fixtures they import from `src/services/adapters/__fixtures__`).
8. `npm run lint` (`expo lint`) passes on both new/modified files with no new warnings.
9. `dto/index.ts` is untouched (`git diff` shows no change) — the barrel re-export already covers the new types via `export * from './auth'`.
10. `client.ts`, `envelope.ts`, `session.ts`, `session-provider.tsx`, `session-machine.ts` are untouched (`git diff` shows no change to any of them).

## Out of scope

- Any screen, component, or UI (`src/app/(auth)/*`, `src/features/auth/*`) — MP5/MP6/MP7/MP8.
- `RegistrationFlow` reducer / in-memory activation-token state machine — MP5.
- Social sign-in libraries (`expo-apple-authentication`, `expo-auth-session`) and the `src/services/auth/social.ts` service that resolves a real `email`/`idToken` before calling `socialAuth()` — MP3.
- `resolveNextStep(nextStep)` router implementation — MP5–MP8 (ADR-10).
- Any change to `session.ts`, `session-provider.tsx`, `session-machine.ts`, or the existing inline `apiFetch('/auth/login', ...)` call in `session-provider.tsx` — MP1. Do not "fix" that inconsistency by refactoring login through `api/auth.ts`; that is a deliberate non-goal of this packet.
- New unit tests for the new DTOs/functions (e.g. a `dto.satisfies.test.ts`-style fixture check, or a mock of `register`/`socialAuth`) — MP9 ("social service response mapping" etc.). This packet's bar is "typecheck strict, no `any`; existing tests stay green," not new test authorship.
- Any server-side change — the server contract is already frozen (architecture-plan.md §5); this packet only mirrors it client-side.
- `package.json` dependency changes — none needed for this packet (no new libraries).
