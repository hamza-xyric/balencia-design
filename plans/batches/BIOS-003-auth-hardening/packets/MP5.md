# Packet MP5 — Registration / OTP / consent screens (S03, S03b, S03c)

**Batch:** BIOS-003 auth hardening · **Wave:** 5 (mobile screens) · **Depends on:** MP1 (session alignment), MP2 (DTO + api service), MP4 (balencia kit primitives) — all three are LANDED, embedded fresh below · **Blocks:** MP9 (unit tests import `registrationFlowReducer` + `initialRegistrationFlowState` + `resolveNextStep` from files this packet creates)

You are a worker model with NO repository access. Everything you need — current file contents, exact types, design spec text, and acceptance criteria — is embedded verbatim below. Do not assume any file content not shown here. Do not invent API shapes, colors, import paths, or component props beyond what is embedded. Do not add any new npm dependency — this packet is buildable with what is already installed (see `## Dependencies` below — it is empty on purpose).

---

## Objective

Ship the registration → OTP verification → consent slice of the mobile auth flow (hi-fi S03 / S03b / S03c), wired to the real, already-landed server contract:

```
S03  sign-up form  →  POST /register              → {activationToken, message}
S03b OTP (4 cells)  →  POST /verify-registration    → {user, tokens, nextStep}
                        (resend) POST /resend-registration-otp → {activationToken, message}
S03c consent        →  POST /consent (authenticated) → {user, nextStep}
```

State that must never touch persistent storage: `activationToken`. It lives only in an in-memory React reducer (`RegistrationFlow`) for the lifetime of the sign-up → verify screens, is never written to SecureStore, never passed as a route param, and never logged.

---

## Target files (exact absolute paths)

| Path | Action |
|---|---|
| `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/services/auth/next-step.ts` | **CREATE** |
| `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/features/auth/registration-flow.tsx` | **CREATE** |
| `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/features/auth/sign-up-screen.tsx` | **CREATE** |
| `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/features/auth/verify-screen.tsx` | **CREATE** |
| `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/features/auth/consent-screen.tsx` | **CREATE** |
| `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/app/(auth)/sign-up.tsx` | **CREATE** |
| `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/app/(auth)/verify.tsx` | **CREATE** |
| `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/app/(auth)/consent.tsx` | **CREATE** |
| `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/app/(auth)/_layout.tsx` | **MODIFY** — additive only, see exact diff in Contract §7 |

Do not create any other file. Do not modify `src/components/balencia/auth-inputs.tsx`, `src/components/balencia/index.ts`, `src/services/api/dto/auth.ts`, `src/services/api/auth.ts`, `src/services/auth/session-provider.tsx`, `src/services/auth/session-machine.ts`, `src/constants/theme.ts`, or `src/features/auth/sign-in-screen.tsx` — they are embedded below **for reference only** (exact names/signatures you must import and match the style of), not as edit targets. Do not touch `package.json`.

---

## Dependencies (lander installs)

None. Every requirement (date-of-birth input masking, gender selection, form validation) is buildable with plain TypeScript/React Native already in the project — no date-picker library, no form library, no icon library.

---

## Embedded current source

All of the following is the **current, already-landed** state of these files (read fresh this session). Match these exactly — do not paraphrase or "improve" an embedded signature.

### `src/services/api/dto/auth.ts` (FULL — reference only, do not modify)

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

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: Gender;
}

export interface RegisterResponse {
  message: string;
  activationToken: string;
}

export interface VerifyRegistrationRequest {
  activationToken: string;
  activationCode: string;
}

export interface VerifyRegistrationResponse {
  nextStep: NextStep;
  user: PublicUserProfileDto;
  tokens: AuthTokensDto;
}

export interface ResendRegistrationOtpRequest {
  activationToken: string;
}

export interface ResendRegistrationOtpResponse {
  message: string;
  activationToken: string;
}

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

export interface ForgotPasswordRequest {
  email: string;
}

export type ForgotPasswordResponse = null;

export interface ResetPasswordRequest {
  email: string;
  otp: string;
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
  nextStep: NextStep;
  user: PublicUserProfileDto;
}

export interface CompleteProfileRequest {
  firstName?: string;
  lastName?: string;
  dateOfBirth: string;
  gender: Gender;
}

export interface CompleteProfileResponse {
  nextStep: NextStep;
  user: PublicUserProfileDto;
}

export interface SkipWhatsAppResponse {
  nextStep: NextStep;
}
```

### `src/services/api/auth.ts` (FULL — IMPORT FROM, do not modify)

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

`apiFetch<T>` resolves to the **unwrapped `data` field** of the envelope, typed `T` — every function above returns exactly the response shape you see in its generic, not a `{success, data}` wrapper. This is proven by the existing call sites in `session-provider.tsx` (`const data = await apiFetch<LoginResponseDto>(...)`, then `data.user`, `data.tokens` directly).

### `src/services/api/errors.ts` (FULL — reference only, do not modify)

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

`apiFetch` rejects with an `ApiError` (or `SessionExpiredError`/`NetworkError`, both subclasses) on any non-2xx response or transport failure. `error.status` is the HTTP status code (e.g. `503`, `409`). `error.message` is server-supplied human copy — safe to show as a last-resort fallback string, but this packet's specific 503/409 cases must use the exact copy given in the Screen contracts below, not `error.message`.

### `src/services/auth/session-provider.tsx` (FULL — IMPORT FROM, do not modify)

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
  setDeviceHeadersProvider,
  setRefreshHandler,
  setSessionExpiredHandler,
  setStaleGuard,
} from '@/services/api/client';
import { ApiError, SessionExpiredError } from '@/services/api/errors';
import type {
  AuthTokensDto,
  LoginResponseDto,
  MeResponseDto,
  PublicUserProfileDto,
} from '@/services/api/dto/auth';
import { getDeviceHeaders } from '@/services/auth/device';

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
  adoptSession(tokens: AuthTokensDto, user: PublicUserProfileDto): Promise<void>;
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

  // Seed a session from an already-issued token pair (verify-registration, social
  // sign-in) — no second login round-trip. Dispatches SIGN_IN_SUCCESS directly;
  // the reducer accepts it from any state (see session-machine.ts).
  const adoptSession = useCallback(async (tokens: AuthTokensDto, user: PublicUserProfileDto) => {
    await saveSession({ user, tokens });
    dispatch({ type: 'SIGN_IN_SUCCESS', user });
    onSignedInRef.current?.();
  }, []);

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

  // Register P1 Client Hooks
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
      adoptSession,
    }),
    [state, signIn, signOut, refreshUser, adoptSession]
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

**What you use from this file:** `useSession()` → `{ status, adoptSession }`. `status` is a `SessionStatus` (see next file). `adoptSession(tokens, user): Promise<void>` seeds the session directly from a token pair — call it from `verify-screen.tsx` after `verifyRegistration` succeeds, exactly as the doc comment says ("Seed a session from an already-issued token pair (verify-registration, social sign-in)").

### `src/services/auth/session-machine.ts` (FULL — reference only, do not modify)

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

### `src/components/balencia/index.ts` (FULL — reference only, do not modify)

```ts
export * from './button';
export * from './card';
export * from './charts';
export * from './chips';
export * from './screen';
export * from './states';
export * from './auth-inputs';
```

### `src/components/balencia/auth-inputs.tsx` — exported contract you consume (already landed; full source is 886 lines, reproduced as exact prop/behavior contract — do not re-derive or reimplement any of this, only import and use it)

```ts
export function useReducedMotion(): boolean;

export type GlassPillInputVariant = 'text' | 'email' | 'password';
export type GlassPillInputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  variant?: GlassPillInputVariant;      // default 'text'
  placeholder?: string;
  error?: string;                        // presence = error state; string is the caption rendered below
  disabled?: boolean;
  autoFocus?: boolean;
  returnKeyType?: 'done' | 'next' | 'go' | 'send';
  onSubmitEditing?: () => void;
  testID?: string;
};
export function GlassPillInput(props: GlassPillInputProps): JSX.Element;
// height 52, radius 999 pill. variant='password' renders a "Show"/"Hide" eye toggle automatically —
// you never manage secureTextEntry yourself. variant='email' sets keyboardType/autoCapitalize/textContentType.

export type OTPClusterProps = {
  length?: number;                        // default 4
  value: string;                          // controlled numeric string
  onChangeText: (value: string) => void;
  onComplete?: (code: string) => void;    // fires EXACTLY ONCE per completion, when value.length === length;
                                           // internally guarded so it will fire again if value is cleared then refilled
  disabled?: boolean;
  error?: boolean;                        // static border-color swap only, no shake/animation in this component
  autoFocus?: boolean;                    // default true
  testID?: string;
};
export function OTPCluster(props: OTPClusterProps): JSX.Element;
// Renders 4 (or `length`) 56x64 cells + one invisible absolutely-positioned TextInput
// (keyboardType="number-pad", textContentType="oneTimeCode") covering the cluster —
// tapping anywhere opens the keyboard; paste of a full code fills all cells at once automatically.

export type ChargeMeterProps = {
  deadline?: number | null;               // epoch ms. undefined/null => component returns null, renders nothing
  durationSeconds?: number;               // default 60 — only affects fill-percentage math
  onComplete?: () => void;                // fires exactly once when remaining reaches 0
  formatLabel?: (secondsRemaining: number) => string;  // default "M:SS" tabular-nums text inside the track
  testID?: string;
};
export function ChargeMeter(props: ChargeMeterProps): JSX.Element | null;
// Ticks its own internal 1s interval while `deadline` is set. Renders ONLY the track + fill + countdown text —
// the "Resend code" label and the actual resend button/action are the calling screen's responsibility.

export type PasswordRequirementListProps = { password: string; testID?: string };
export function PasswordRequirementList(props: PasswordRequirementListProps): JSX.Element;
// Renders exactly 5 rows in this order: "8+ characters", "uppercase letter", "lowercase letter",
// "number", "special character" — met/unmet computed internally from `password`, crossfades 160ms
// (instant when useReducedMotion() is true). You do not pass rule state; just pass the raw password string.

export type ConsentCheckboxProps = {
  checked: boolean;                       // STRICTLY CONTROLLED, no default — cannot start pre-checked
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
  testID?: string;
};
export function ConsentCheckbox(props: ConsentCheckboxProps): JSX.Element;
// 24px square box (6px radius) inside a 44x44 tap target. Tapping anywhere in the Pressable toggles it —
// there is no separate "tap label to open a Sheet" behavior built into this component; `label` is rendered
// as plain adjacent text and is part of the same tap target.

export function maskEmail(email: string): string;
// 'hamza@example.com' -> 'h***@example.com'; '' -> ''; a string with no '@' -> `${firstChar}***`.

export type MaskedDestinationLineProps = { email: string; prefix?: string; testID?: string };
// default prefix: 'We sent a code to '
export function MaskedDestinationLine(props: MaskedDestinationLineProps): JSX.Element;
// Renders `${prefix}${maskEmail(email)}` — never interpolates the raw email.

export type ToastBannerTone = 'error' | 'info';
export type ToastBannerProps = {
  message?: string | null;                // falsy => renders null (hidden)
  tone?: ToastBannerTone;                 // default 'error'
  onDismiss?: () => void;                 // if provided, renders a >=44x44 dismiss control
  testID?: string;
};
export function ToastBanner(props: ToastBannerProps): JSX.Element | null;
// Presentational only — full-width glass-pill row with slide+fade entrance (instant if reduced motion).
// Screen-level placement/positioning in your layout (inline in the scroll body — this packet does NOT
// require fixed/absolute top-of-viewport placement) is your job.

export type SocialAuthProvider = 'google' | 'apple';
export type SocialAuthButtonProps = {
  provider: SocialAuthProvider;
  onPress?: () => void;
  disabled?: boolean;
  gated?: boolean;
  gatedCaption?: string;
  testID?: string;
};
export function SocialAuthButton(props: SocialAuthButtonProps): JSX.Element;
// NOT USED IN THIS PACKET — S03's social row is MP7's scope (per architecture-plan.md §7, MP7 depends on
// MP3 + MP4 and modifies sign-in-screen.tsx + sign-up). Do not add SocialAuthButton to sign-up-screen.tsx
// here; leave that composition slot for MP7 to extend. This packet's S03 ships email/password + name/DOB/
// gender + the divider-free direct path to S03b only.
```

There is **no exported `Toggle` component and no exported segmented-control component anywhere in the kit** (confirmed: `chips.tsx` exports only `StatusChip`, `LegacyProvenanceChip`, `ReadinessBadge`; `button.tsx` exports only `BalenciaButton`). Two consequences, both resolved below in Contract §4–§5 — do not invent new kit components, this packet's target files do not include `auth-inputs.tsx`:
- S03c's "optional toggle" (marketing opt-in) is built with the same `ConsentCheckbox` used for the two required rows (it is a boolean on/off control either way — `ConsentCheckbox` is the only boolean-selection primitive in the kit).
- S03's gender selector is a plain `Pressable` row you build locally inside `sign-up-screen.tsx` (not a kit component) — see Contract §4.

### `src/constants/theme.ts` (FULL — import tokens from this, no raw hex literals)

```ts
import { Platform } from 'react-native';

export const BalenciaColors = {
  ink900: '#0A0A0F',
  ink950: '#050306',
  inkBrown900: '#120806',
  inkBrown800: '#211008',
  inkBrown700: '#32190E',
  paper100: '#FEFAF3',
  paper70: 'rgba(254, 250, 243, 0.72)',
  paper55: 'rgba(254, 250, 243, 0.55)',
  hairline: 'rgba(254, 250, 243, 0.12)',
  hairlineStrong: 'rgba(254, 250, 243, 0.2)',
  orange: '#FF5E00',
  orangeSoft: 'rgba(255, 94, 0, 0.18)',
  green: '#34A853',
  greenSoft: 'rgba(52, 168, 83, 0.18)',
  purple: '#7F24FF',
  purpleSoft: 'rgba(127, 36, 255, 0.2)',
  purpleText: '#C9A8FF',
  warning: '#F5B547',
  danger: '#FF6B6B',
} as const;

export const Colors = {
  light: {
    text: BalenciaColors.paper100,
    background: BalenciaColors.ink900,
    backgroundElement: BalenciaColors.inkBrown800,
    backgroundSelected: BalenciaColors.inkBrown700,
    textSecondary: BalenciaColors.paper70,
  },
  dark: {
    text: BalenciaColors.paper100,
    background: BalenciaColors.ink900,
    backgroundElement: BalenciaColors.inkBrown800,
    backgroundSelected: BalenciaColors.inkBrown700,
    textSecondary: BalenciaColors.paper70,
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const Radius = {
  sm: 8,
  md: 12,
  lg: 18,
  xl: 24,
} as const;

export const TouchTarget = 44;
export const BottomTabInset = Platform.select({ ios: 58, android: 76 }) ?? 0;
export const MaxContentWidth = 560;
```

### `src/components/balencia/button.tsx` (FULL — reference only, do not modify; `BalenciaButton` is your BtnPrimary/BtnGhost)

```tsx
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BalenciaColors, Radius, Spacing, TouchTarget } from '@/constants/theme';

type BalenciaButtonProps = {
  children: ReactNode;
  onPress?: () => void;
  tone?: 'primary' | 'secondary' | 'quiet' | 'danger';
  disabled?: boolean;
  accessibilityLabel?: string;
};

const toneStyles = {
  primary: {
    backgroundColor: BalenciaColors.orange,
    borderColor: BalenciaColors.orange,
    textColor: BalenciaColors.ink950,
  },
  secondary: {
    backgroundColor: BalenciaColors.inkBrown700,
    borderColor: BalenciaColors.hairlineStrong,
    textColor: BalenciaColors.paper100,
  },
  quiet: {
    backgroundColor: 'transparent',
    borderColor: BalenciaColors.hairline,
    textColor: BalenciaColors.paper70,
  },
  danger: {
    backgroundColor: 'rgba(255, 107, 107, 0.16)',
    borderColor: 'rgba(255, 107, 107, 0.32)',
    textColor: BalenciaColors.danger,
  },
};

export function BalenciaButton({
  children,
  onPress,
  tone = 'primary',
  disabled,
  accessibilityLabel,
}: BalenciaButtonProps) {
  const colors = toneStyles[tone];

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: colors.backgroundColor,
          borderColor: colors.borderColor,
          opacity: disabled ? 0.55 : pressed ? 0.86 : 1,
          transform: [{ scale: pressed && !disabled ? 0.98 : 1 }],
        },
      ]}>
      <View pointerEvents="none">
        <Text style={[styles.label, { color: colors.textColor }]}>{children}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: TouchTarget,
    borderWidth: 1,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  label: {
    fontSize: 15,
    fontWeight: '800',
    textAlign: 'center',
  },
});
```

`tone="primary"` = BtnPrimary (orange fill). `tone="quiet"` = closest match to BtnGhost (no fill, muted label) — use this tone for the resend action in S03b. There is no separate `BtnGhost` component; `tone="quiet"` is the canonical substitute already used elsewhere in this kit's conventions.

### `src/components/balencia/screen.tsx` (FULL — reference only, `BalenciaScreen` is your page shell)

```tsx
import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BalenciaColors, BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

type BalenciaScreenProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  withTabPadding?: boolean;
};

export function BalenciaScreen({
  eyebrow,
  title,
  subtitle,
  children,
  footer,
  withTabPadding = true,
}: BalenciaScreenProps) {
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeArea}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          withTabPadding && { paddingBottom: BottomTabInset + Spacing.five },
        ]}>
        <View style={styles.header}>
          {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        <View style={styles.body}>{children}</View>
        {footer ? <View style={styles.footer}>{footer}</View> : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: BalenciaColors.ink900 },
  scroll: { flex: 1 },
  content: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
  },
  header: { gap: Spacing.two, paddingBottom: Spacing.three },
  eyebrow: {
    color: BalenciaColors.orange,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  title: { color: BalenciaColors.paper100, fontSize: 32, fontWeight: '800', letterSpacing: 0, lineHeight: 38 },
  subtitle: { color: BalenciaColors.paper70, fontSize: 16, lineHeight: 23 },
  body: { gap: Spacing.three },
  footer: { paddingTop: Spacing.four },
});
```

### `src/features/auth/sign-in-screen.tsx` (FULL — style precedent, do not modify)

```tsx
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';

import { BalenciaButton, BalenciaScreen, CardBody, CardTitle, ErrorState, GlassCard } from '@/components/balencia';
import { BalenciaColors, Radius, Spacing, TouchTarget } from '@/constants/theme';
import { useSession } from '@/services/auth/session-provider';
import { useOnboardingStatus } from '@/hooks/use-onboarding-status';

export function SignInScreen() {
  const router = useRouter();
  const { status, signIn } = useSession();
  const { data: onboardingStatus } = useOnboardingStatus();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const isAuthenticating = status === 'authenticating';

  async function handleSignIn() {
    setError(null);
    try {
      await signIn(email.trim(), password);

      if (!onboardingStatus?.isComplete) {
        router.replace('/(auth)/onboarding');
      } else {
        router.replace('/(tabs)/today');
      }
    } catch (signInError) {
      setError(signInError instanceof Error ? signInError.message : 'Unable to sign in.');
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', default: undefined })} style={styles.flex}>
      <BalenciaScreen
        eyebrow="Balencia iOS pilot"
        title="Your life system, rebuilt for native iPhone."
        subtitle="Sign in against the existing yhealth backend or enter the pilot in flagged demo mode while contracts are verified."
        withTabPadding={false}>
        <GlassCard tone="purple">
          <CardTitle>Cia is ready to orient the day</CardTitle>
          <CardBody>
            Mobile login uses the existing `/auth/login` route with a mobile client header so the server returns tokens for SecureStore.
          </CardBody>
        </GlassCard>

        {status === 'expired' ? (
          <ErrorState message="Your session ended. Sign in to continue." />
        ) : null}

        {error ? <ErrorState message={error} /> : null}

        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            onChangeText={setEmail}
            placeholder="you@example.com"
            placeholderTextColor={BalenciaColors.paper55}
            style={styles.input}
            textContentType="emailAddress"
            value={email}
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            autoCapitalize="none"
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor={BalenciaColors.paper55}
            secureTextEntry
            style={styles.input}
            textContentType="password"
            value={password}
          />
        </View>

        <BalenciaButton
          disabled={!email || !password || isAuthenticating}
          onPress={handleSignIn}
          accessibilityLabel="Sign in to Balencia">
          {isAuthenticating ? 'Signing in' : 'Sign in'}
        </BalenciaButton>
      </BalenciaScreen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: BalenciaColors.ink900 },
  form: { gap: Spacing.two },
  label: { color: BalenciaColors.paper70, fontSize: 13, fontWeight: '800' },
  input: {
    minHeight: TouchTarget + 8,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: BalenciaColors.hairlineStrong,
    backgroundColor: BalenciaColors.inkBrown800,
    color: BalenciaColors.paper100,
    paddingHorizontal: Spacing.three,
    fontSize: 16,
  },
});
```

This is the reference for: `KeyboardAvoidingView` wrapper pattern, `BalenciaScreen` usage, error rendering, `useRouter()` + `router.replace(...)` with a literal string route, and file/component naming convention (`export function XScreen()`, default-exported from a thin `src/app/(auth)/x.tsx` route file — see next file).

### `src/app/(auth)/sign-in.tsx` (FULL — this is the EXACT pattern your 3 new route files must mirror)

```tsx
import { SignInScreen } from '@/features/auth/sign-in-screen';

export default SignInScreen;
```

### `src/app/(auth)/_layout.tsx` (FULL — current content, this is your MODIFY target)

```tsx
import { Stack } from 'expo-router';

import { BalenciaColors } from '@/constants/theme';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: BalenciaColors.ink900 },
      }}
    />
  );
}
```

### `src/app/index.tsx` (FULL — reference only; this is the project's existing `Redirect` usage pattern)

```tsx
import { Redirect } from 'expo-router';
import { View, StyleSheet } from 'react-native';

import { SkeletonState } from '@/components/balencia';
import { BalenciaColors } from '@/constants/theme';
import { useSession } from '@/services/auth/session-provider';

export default function IndexRoute() {
  const { status } = useSession();

  if (status === 'booting') {
    return (
      <View style={styles.container}>
        <SkeletonState variant="hero" />
      </View>
    );
  }

  if (status === 'authenticated' || status === 'refreshing') {
    return <Redirect href="/(tabs)/today" />;
  }

  return <Redirect href="/(auth)/sign-in" />;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BalenciaColors.ink900, alignItems: 'center', justifyContent: 'center' },
});
```

Hooks are called unconditionally at the top of the component; conditional `return <Redirect .../>` happens AFTER all hooks — this is the pattern your `verify-screen.tsx` and `consent-screen.tsx` guards must follow (call every hook first, then branch).

### `app.json` excerpt (confirms `typedRoutes` is ON — this changes how you must type route strings)

```json
"experiments": {
  "typedRoutes": true,
```

### `tsconfig.json` (FULL — confirms the `@/*` path alias)

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "resolveJsonModule": true,
    "paths": {
      "@/*": ["./src/*"],
      "@/assets/*": ["./assets/*"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx", ".expo/types/**/*.ts", "expo-env.d.ts"]
}
```

**Critical typing note (read this before writing any navigation call):** because `typedRoutes` is `true`, `expo-router`'s `router.push`, `router.replace`, and `<Redirect href=...>` all require their `href` argument to satisfy expo-router's generated `Href` union type, not a bare `string`. Literal string routes like `router.replace('/(auth)/sign-in')` typecheck fine because TypeScript narrows the literal. But `resolveNextStep(nextStep: string): string` (this packet's Contract §1) returns a **widened `string`**, which is NOT assignable to `Href`. Every call site that passes a `resolveNextStep(...)` result into `router.replace(...)` MUST cast it:

```ts
import type { Href } from 'expo-router';
// ...
router.replace(resolveNextStep(data.nextStep) as Href);
```

Do **not** change `resolveNextStep`'s return type to work around this (MP9 tests it as a plain pure `string`-returning function) — the cast belongs at each call site only, exactly as shown in the screen contracts below.

---

## Contract (exact types/props/signatures — verbatim)

### §1 — `src/services/auth/next-step.ts` (write this file's content EXACTLY as follows)

```ts
// Central next-step router (ADR-10, architecture-plan.md). Maps the server's
// `nextStep` field (see NextStep in @/services/api/dto/auth) to the mobile
// route it drives. Unrecognized/future values fall back to onboarding rather
// than a dead end — never throw, never return an empty/invalid route.
//
// Pure function: no navigation side effects. Callers pass the return value to
// expo-router's router.replace/router.push, casting to `Href` at the call
// site (typedRoutes is enabled — see the packet's typing note).

export function resolveNextStep(nextStep: string): string {
  switch (nextStep) {
    case 'consent':
      return '/(auth)/consent';
    case 'complete_profile':
      return '/(auth)/complete-profile';
    case 'whatsapp_enrollment':
      return '/(auth)/whatsapp';
    case 'assessment':
      return '/(auth)/onboarding';
    default:
      return '/(auth)/onboarding';
  }
}
```

Note: `/(auth)/complete-profile` and `/(auth)/whatsapp` are **not created by this packet** (they belong to MP7 and MP8 respectively, per architecture-plan.md §7). `resolveNextStep` still returns those path strings today — that is correct and intentional (the function is the single source of truth for the mapping regardless of which packet has landed the destination route yet); it is not this packet's job to gate on whether the destination file exists. Do not add existence checks or fallbacks beyond the switch above.

### §2 — `src/features/auth/registration-flow.tsx` (write this file's content EXACTLY as follows)

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

**Non-negotiable rules for this file (grep-checkable):**
- `activationToken` and `resendCooldownEndsAt` live ONLY in this in-memory `useReducer` state. Never write either to SecureStore, AsyncStorage, a route param, or any `console.*`/logging call, in this file or any file that consumes `useRegistrationFlow()`.
- `cooldownEndsAt` is always computed by the **caller** (`Date.now() + 60000`) and passed into the dispatch — the reducer itself must never call `Date.now()` (keeps it pure/deterministic for MP9).
- The reducer's `default` case returns `state` unchanged (exhaustive-ish safety net, matches the `sessionReducer` convention in the embedded `session-machine.ts` above).

### §3 — Screen contract: `src/features/auth/sign-up-screen.tsx` (S03)

**Export:** `export function SignUpScreen(): JSX.Element` (default export happens in the thin route file, not here — same pattern as `SignInScreen`).

**Imports required:**
```ts
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter, type Href } from 'expo-router';

import {
  BalenciaButton,
  BalenciaScreen,
  GlassPillInput,
  PasswordRequirementList,
  ToastBanner,
} from '@/components/balencia';
import { BalenciaColors, Radius, Spacing, TouchTarget } from '@/constants/theme';
import { register } from '@/services/api/auth';
import { ApiError } from '@/services/api/errors';
import type { Gender } from '@/services/api/dto/auth';
import { useRegistrationFlow } from '@/features/auth/registration-flow';
```

**Local state:** `email`, `password`, `firstName`, `lastName`, `dateOfBirth` (all `string`, all `useState('')`), `gender: Gender | null` (`useState<Gender | null>(null)`), `toast: string | null`, `isSubmitting: boolean`.

**DOB masking (no new deps) — implement these two pure helpers in this file, outside the component:**

```ts
function formatDobInput(raw: string): string {
  const digitsOnly = raw.replace(/[^0-9]/g, '').slice(0, 8);
  let formatted = digitsOnly.slice(0, 4);
  if (digitsOnly.length > 4) formatted += `-${digitsOnly.slice(4, 6)}`;
  if (digitsOnly.length > 6) formatted += `-${digitsOnly.slice(6, 8)}`;
  return formatted;
}

const DOB_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function isValidDob(value: string): boolean {
  if (!DOB_PATTERN.test(value)) return false;
  const [yearStr, monthStr, dayStr] = value.split('-');
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;
  const date = new Date(Date.UTC(year, month - 1, day));
  const isRealCalendarDate =
    date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
  if (!isRealCalendarDate) return false;
  const now = new Date();
  const minYear = now.getUTCFullYear() - 120;
  return year >= minYear && date.getTime() <= now.getTime();
}
```

Wire `GlassPillInput`'s `onChangeText` for the DOB field through `(text) => setDateOfBirth(formatDobInput(text))` — this auto-inserts dashes as the user types digits and rejects non-digit characters, with no external date-picker/masking library. Use `placeholder="YYYY-MM-DD"`.

**Email + password validation (also implement locally — `PASSWORD_RULES` is a private, non-exported const inside `auth-inputs.tsx`, so duplicate the equivalent boolean check here, do not import it):**

```ts
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isPasswordValid(password: string): boolean {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
}
```

**Gender row:** a plain `View` with `flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two` containing 4 `Pressable` pills, one per option:

```ts
const GENDER_OPTIONS: { value: Gender; label: string }[] = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'non_binary', label: 'Non-binary' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' },
];
```

Each pill: `minHeight: TouchTarget` (44), `minWidth: TouchTarget`, `paddingHorizontal: Spacing.three`, `borderRadius: 999`, `borderWidth: 1`. Selected state: `borderColor: BalenciaColors.orange`, `backgroundColor: BalenciaColors.orangeSoft`, text `BalenciaColors.paper100`. Unselected: `borderColor: BalenciaColors.hairlineStrong`, `backgroundColor: 'transparent'`, text `BalenciaColors.paper70`. `accessibilityRole="radio"`, `accessibilityState={{ checked: gender === option.value }}`, `accessibilityLabel={option.label}`, `onPress={() => setGender(option.value)}`.

**Form validity:**
```ts
const isFormValid =
  EMAIL_PATTERN.test(email.trim()) &&
  isPasswordValid(password) &&
  firstName.trim().length > 0 &&
  lastName.trim().length > 0 &&
  isValidDob(dateOfBirth) &&
  gender !== null;
```

`BtnPrimary` (`BalenciaButton tone="primary"`) `disabled={!isFormValid || isSubmitting}`.

**Submit handler (exact behavior):**
```ts
const router = useRouter();
const { dispatch } = useRegistrationFlow();

async function handleSubmit() {
  if (!isFormValid || isSubmitting) return;
  setToast(null);
  setIsSubmitting(true);
  try {
    const response = await register({
      email: email.trim(),
      password,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      dateOfBirth,
      gender: gender as Gender,
    });
    dispatch({
      type: 'REGISTER_SUCCESS',
      email: email.trim(),
      activationToken: response.activationToken,
      cooldownEndsAt: Date.now() + 60000,
    });
    router.push('/(auth)/verify' as Href);
  } catch (submitError) {
    if (submitError instanceof ApiError && submitError.status === 503) {
      setToast('we could not send the code — try again');
    } else if (submitError instanceof ApiError && submitError.status === 409) {
      setToast('We found an existing account with that email.');
    } else if (submitError instanceof ApiError) {
      setToast(submitError.message);
    } else {
      setToast('Something went wrong. Try again.');
    }
  } finally {
    setIsSubmitting(false);
  }
}
```

Note the exact casing of the two literal toast strings — `'we could not send the code — try again'` is lower-case-first exactly as specified (matches this packet's task instruction verbatim); `'We found an existing account with that email.'` is capitalized (matches the S03 hi-fi spec's quoted copy "We found an existing account", extended to a full sentence). Do not alter either string.

**Body composition (order matters, mirrors S03 layout — see Design spec for the full citation):**
1. `ToastBanner` (only if `toast` is set) — `tone="error"`, `onDismiss={() => setToast(null)}`.
2. `GlassPillInput` email (`variant="email"`, `label="Email"`).
3. `GlassPillInput` password (`variant="password"`, `label="Password"`) immediately followed by `PasswordRequirementList` (`password={password}`).
4. `GlassPillInput` first name (`variant="text"`, `label="First name"`), `GlassPillInput` last name (`variant="text"`, `label="Last name"`).
5. `GlassPillInput` date of birth (`variant="text"`, `label="Date of birth"`, `value={dateOfBirth}`, `onChangeText` wired to `formatDobInput` as shown above, `placeholder="YYYY-MM-DD"`).
6. Gender row (label `Text` "Gender" above it, `styles.label` matching `sign-in-screen.tsx`'s `label` style).
7. `BalenciaButton tone="primary"` "Create account" (submit).
8. A `Pressable`/`Text` link: "Already have an account? Sign in" → `onPress={() => router.push('/(auth)/sign-in' as Href)}`, orange text (`BalenciaColors.orange`), `accessibilityRole="link"`.
9. A static, non-interactive `Text` caption: "By creating an account, you agree to our Terms and Privacy Policy." — `styles.caption` (`color: BalenciaColors.paper55, fontSize: 12, textAlign: 'center'`). (The hi-fi spec's `ComplianceFooter` component is a future catalog-promotion item, not built in MP4 — this plain caption is the honest MP5-scope substitute; do not invent an interactive Sheet/document viewer here, out of scope.)

`BalenciaScreen` props: `eyebrow="Balencia"`, `title="Create your account with Cia"` (per AGENTS.md: the visible AI coach name in mobile UI is "Cia", never "CIA" — do not use the all-caps form used in the hi-fi doc's prose), `subtitle="Cia connects your life once there's enough history."`, `withTabPadding={false}`.

Wrap the whole screen in `<KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', default: undefined })} style={styles.flex}>` exactly as `sign-in-screen.tsx` does, `styles.flex = { flex: 1, backgroundColor: BalenciaColors.ink900 }`.

### §4 — Screen contract: `src/features/auth/verify-screen.tsx` (S03b)

**Export:** `export function VerifyScreen(): JSX.Element`.

**Imports required:**
```ts
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text } from 'react-native';
import { Redirect, useRouter, type Href } from 'expo-router';

import {
  BalenciaButton,
  BalenciaScreen,
  ChargeMeter,
  MaskedDestinationLine,
  OTPCluster,
  ToastBanner,
} from '@/components/balencia';
import { BalenciaColors } from '@/constants/theme';
import { resendRegistrationOtp, verifyRegistration } from '@/services/api/auth';
import { ApiError } from '@/services/api/errors';
import { useSession } from '@/services/auth/session-provider';
import { resolveNextStep } from '@/services/auth/next-step';
import { useRegistrationFlow } from '@/features/auth/registration-flow';
```

**Guard (mandatory, exact placement — hooks first, guard after, mirroring `src/app/index.tsx`'s pattern):**

```ts
export function VerifyScreen() {
  const router = useRouter();
  const { state, dispatch } = useRegistrationFlow();
  const { adoptSession } = useSession();

  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [canResend, setCanResend] = useState(
    () => state.resendCooldownEndsAt === null || Date.now() >= state.resendCooldownEndsAt
  );

  useEffect(() => {
    setCanResend(state.resendCooldownEndsAt === null || Date.now() >= state.resendCooldownEndsAt);
  }, [state.resendCooldownEndsAt]);

  if (!state.activationToken) {
    return <Redirect href="/(auth)/sign-up" />;
  }

  // ... handlers + JSX below
}
```

If `state.activationToken` is `null` (user deep-linked here or refreshed state without going through S03 first), render `<Redirect href="/(auth)/sign-up" />` — never render the OTP form without a token.

**`handleComplete` (auto-submit on 4th digit, wired to `OTPCluster`'s `onComplete`):**

```ts
async function handleComplete(activationCode: string) {
  if (isSubmitting) return;
  setError(null);
  setIsSubmitting(true);
  try {
    const data = await verifyRegistration({
      activationToken: state.activationToken as string,
      activationCode,
    });
    await adoptSession(data.tokens, data.user);
    router.replace(resolveNextStep(data.nextStep) as Href);
  } catch (submitError) {
    setCode('');
    if (submitError instanceof ApiError && submitError.message) {
      setError(submitError.message);
    } else {
      setError('That code did not match. Try again.');
    }
  } finally {
    setIsSubmitting(false);
  }
}
```

Cells reset (`setCode('')`) on any verify failure — matches the task's "wrong-code ApiError → inline honest error caption + cells reset (no glow)". `OTPCluster`'s `error` prop already renders only a static border-color swap (confirmed in the embedded contract above — no shake/glow animation exists in that component), so passing `error={!!error}` satisfies "no glow" with zero extra work; do not add any additional animation here.

**`handleResend`:**

```ts
async function handleResend() {
  if (!canResend || isResending) return;
  setIsResending(true);
  setToast(null);
  try {
    const data = await resendRegistrationOtp({ activationToken: state.activationToken as string });
    const cooldownEndsAt = Date.now() + 60000;
    dispatch({ type: 'RESEND_SUCCESS', activationToken: data.activationToken, cooldownEndsAt });
    setCanResend(false);
    setToast('Code sent.');
  } catch (resendError) {
    if (resendError instanceof ApiError && resendError.status === 503) {
      setToast('we could not send the code — try again');
    } else {
      setToast('Could not resend the code. Try again.');
    }
  } finally {
    setIsResending(false);
  }
}
```

**Body composition (order matters):**
1. `MaskedDestinationLine email={state.email}` (default prefix "We sent a code to " is correct — do not override it).
2. `ToastBanner` (only if `toast` set) — `tone="info"`, `onDismiss={() => setToast(null)}`.
3. `OTPCluster value={code} onChangeText={(text) => { setCode(text); if (error) setError(null); }} onComplete={handleComplete} disabled={isSubmitting} error={!!error}`.
4. Inline error `Text` (only if `error` set) — `accessibilityRole="alert"`, color `BalenciaColors.danger`, `fontSize: 13`.
5. `ChargeMeter deadline={canResend ? null : state.resendCooldownEndsAt} onComplete={() => setCanResend(true)}`.
6. `BalenciaButton tone="quiet" disabled={!canResend || isResending} onPress={handleResend} accessibilityLabel="Resend code"` — label text `{isResending ? 'Sending' : 'Resend code'}`.

`BalenciaScreen` props: `eyebrow="Balencia"`, `title="Verify your email"`, `withTabPadding={false}`. No back button/back navigation is required by this packet (S03b spec calls for a back chevron; expo-router's `Stack` default header is already `headerShown: false` per `_layout.tsx`, and building a custom back affordance mid-flow is not required for acceptance — out of scope, do not add manual back navigation that could let a user leave with a live `activationToken` half-verified).

### §5 — Screen contract: `src/features/auth/consent-screen.tsx` (S03c)

**Export:** `export function ConsentScreen(): JSX.Element`.

**Imports required:**
```ts
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import { Redirect, useRouter, type Href } from 'expo-router';

import { BalenciaButton, BalenciaScreen, ConsentCheckbox, ToastBanner } from '@/components/balencia';
import { BalenciaColors, Spacing } from '@/constants/theme';
import { submitConsent } from '@/services/api/auth';
import { ApiError } from '@/services/api/errors';
import { useSession } from '@/services/auth/session-provider';
import { resolveNextStep } from '@/services/auth/next-step';
```

**Guard (hooks first, guard after — same pattern as §4):**

```ts
export function ConsentScreen() {
  const router = useRouter();
  const { status } = useSession();

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  if (status !== 'authenticated') {
    return <Redirect href="/(auth)/sign-in" />;
  }

  // ... handlers + JSX below
}
```

`termsAccepted` and `privacyAccepted` both start `false` (`ConsentCheckbox` cannot start pre-checked by construction — see its embedded contract). `marketingOptIn` also starts `false` (optional, off by default per canon).

**Status line + gate:**
```ts
const requiredCount = Number(termsAccepted) + Number(privacyAccepted);
const isGateReady = requiredCount === 2;
```
Render `{isGateReady ? '2 of 2 ready' : \`${requiredCount} of 2 required\`}` — `fontVariant: ['tabular-nums']`. When `isGateReady`, text color `BalenciaColors.green` and `fontWeight: '700'`; otherwise `BalenciaColors.paper70`.

**Submit handler:**
```ts
async function handleSubmit() {
  if (!isGateReady || isSubmitting) return;
  setToast(null);
  setIsSubmitting(true);
  try {
    const data = await submitConsent({
      termsOfService: true,
      privacyPolicy: true,
      emailMarketing: marketingOptIn,
    });
    router.replace(resolveNextStep(data.nextStep) as Href);
  } catch (submitError) {
    if (submitError instanceof ApiError && submitError.message) {
      setToast(submitError.message);
    } else {
      setToast('Could not save your choices. Try again.');
    }
  } finally {
    setIsSubmitting(false);
  }
}
```

`termsOfService`/`privacyPolicy` are hardcoded `true` in the request body — the button is disabled until `isGateReady` is true, so by the time `handleSubmit` can run, both are guaranteed checked; the request always asserts `true` for both (never send `false` for a required field — if the gate isn't ready, the handler returns immediately without calling the API at all).

**Body composition (order matters, mirrors S03c layout):**
1. `ToastBanner` (only if `toast` set) — `tone="error"`, `onDismiss={() => setToast(null)}`.
2. A section: `Text` label "Required" (`fontSize: 12, fontWeight: '800', textTransform: 'uppercase', color: BalenciaColors.paper55`), then two `ConsentCheckbox`:
   - `checked={termsAccepted} onChange={setTermsAccepted} label="I agree to the Terms of Service" testID="consent-terms"`
   - `checked={privacyAccepted} onChange={setPrivacyAccepted} label="I agree to the Privacy Policy" testID="consent-privacy"`
3. A section: `Text` label "Optional" (same style as above), then one `ConsentCheckbox`:
   - `checked={marketingOptIn} onChange={setMarketingOptIn} label="Send me tips and updates" testID="consent-marketing"`
   (Using `ConsentCheckbox` here — not a `Toggle` — is intentional; see the "no exported Toggle" note in Embedded current source. This is a deliberate, documented adaptation, not a gap.)
4. The status line described above.
5. `BalenciaButton tone="primary" disabled={!isGateReady || isSubmitting} onPress={handleSubmit} accessibilityLabel="Agree and continue"` — label `{isSubmitting ? 'Saving' : 'Agree and continue'}`.

`BalenciaScreen` props: `eyebrow="Balencia"`, `title="Before we begin"`, `subtitle="Review and accept our policies to continue."`, `withTabPadding={false}`.

### §6 — Route files (mirror `src/app/(auth)/sign-in.tsx` exactly, only the imported screen changes)

**`src/app/(auth)/sign-up.tsx`:**
```tsx
import { SignUpScreen } from '@/features/auth/sign-up-screen';

export default SignUpScreen;
```

**`src/app/(auth)/verify.tsx`:**
```tsx
import { VerifyScreen } from '@/features/auth/verify-screen';

export default VerifyScreen;
```

**`src/app/(auth)/consent.tsx`:**
```tsx
import { ConsentScreen } from '@/features/auth/consent-screen';

export default ConsentScreen;
```

### §7 — `src/app/(auth)/_layout.tsx` MODIFY — exact surgical diff

Current file (reproduced above in Embedded current source) is 14 lines. Replace it with exactly this (additive only — the `Stack` element, its `screenOptions`, and the `BalenciaColors` import are byte-for-byte preserved; the only changes are one new import line and wrapping the returned JSX in `<RegistrationFlowProvider>`):

```tsx
import { Stack } from 'expo-router';

import { BalenciaColors } from '@/constants/theme';
import { RegistrationFlowProvider } from '@/features/auth/registration-flow';

export default function AuthLayout() {
  return (
    <RegistrationFlowProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: BalenciaColors.ink900 },
        }}
      />
    </RegistrationFlowProvider>
  );
}
```

Do not add, remove, or reorder anything else in this file. `SessionProvider` already wraps the entire app one level up in `src/app/_layout.tsx` (embedded for your awareness only — NOT a target file, do not touch it), so `useSession()` remains available inside `(auth)` screens without any change there.

---

## Design spec (embedded VERBATIM from `evidence/scope-hifi-auth.md`, plus canon rules)

### S03—Welcome Sign-Up

> **Layout:** Compact form: Balencia wordmark (quiet top) → Display 34 title "Create your account with *CIA*" (Tiempos italic on CIA) → compact future-tense caption → email/password fields → MomentumBar + ChipProvenance → BtnPrimary "Sign up" → divider "or continue with" → Google/Apple social buttons → BtnGhost links ("Sign in" + "Guest").
> **Components:** `GlassPillInput` (email, password with eye toggle), `MomentumBar` (password strength, cumulative), `ChipProvenance` ("typed live"), `BtnPrimary`, `BtnSecondary` (Google/Apple), `BtnGhost`, NEW `ComplianceFooter` (terms/privacy links), NEW `ToastBanner` (non-field errors), NEW `ConnectsPreviewRow` (four domain tags + connecting dots, future-tense caption).
> **Copy:** "CIA connects your life once there's enough history" (promise, no personalized insight pre-auth). Email/password only by default (name/confirm-password are expansion variants). "already have an account? Sign in" / "Try without an account."
> **States:** Default (empty fields, CTA disabled 40% opacity), focused (border orange 1px + subtle glow), field error (border red #ef4444, caption "that email looks invalid"), system error (ToastBanner "We found an existing account"), loading (fields 50% opacity read-only, CTA label→spinner), success (glow flash 600ms green, push to S03b), offline (OfflineBanner deployed, CTA dimmed).
> **Motion:** Entry stagger 12pt rise + fade, 200ms apart (logo → heading → form → CTA → social). Glow bleed widens per password rules met. Focus transitions 150ms physical easing. Success = single green glow flash (no stroke draw; that motif reserved for hero/celebration per canon).

**[note] Resolved deviations from this packet (documented, not silent):** `MomentumBar` is not part of the MP4 kit (only `PasswordRequirementList` was built for password strength — MP4's packet explicitly scoped `PasswordRequirementList`, not `MomentumBar`); this packet uses `PasswordRequirementList` instead. `ChipProvenance`/`ConnectsPreviewRow`/`ComplianceFooter` were NOT built by MP4 (confirmed against the embedded `auth-inputs.tsx` export contract above) — this packet substitutes a static caption for the compliance footer (§3 body composition item 9) and omits the provenance chip and domain-preview row entirely (no data-fetch dependency exists yet for a real preview). Social buttons (`BtnSecondary`/`SocialAuthButton`) are explicitly MP7's scope, not this packet's — S03 in this packet ends at email/password/name/DOB/gender + the sign-in link, no social row, no "Try without an account" guest link (no guest-mode route exists yet in this codebase). Name (first/last) and DOB/gender are collected on THIS screen rather than an "expansion variant" because the server's `/register` contract (embedded above) requires `firstName, lastName, dateOfBirth, gender` in the initial request body — there is no separate profile-completion step for organic (non-social) sign-up.

### S03b—OTP Verification

> **Layout:** Back chevron (44px) → Balencia brand → "Verify your *email*" title → masked destination "j***@..." → four circular OTP cells (56×64 each, 12px gaps) → status text zone → ChargeMeter cooldown "Resend code (0:59)" with depleting fill → BtnPrimary "verify." (disabled until all 4 cells filled).
> **Components:** `TopBar` (transparent, back chevron), NEW `OTPCluster/OTPDigitCell` (`.glass-pill` material at radius 14, not 999 pill radius; white circular cells for Figma light-auth override), `ChargeMeter` (60s orange depletion), `BtnGhost` (resend, disabled while meter drains), `BtnPrimary`, `OfflineBanner` (rate-limit variant), NEW `MaskedDestinationLine`.
> **Copy:** "We sent a 4-digit code to j***@..." (masked, never raw). "Error / Status Text" zone carries invalid/expired/rate-limit messages. Resend copy uses `tabular-nums` for countdown sync.
> **States:** Default (cell 1 auto-focused, numeric keyboard, meter draining, CTA disabled), partial entry (digit scale 0.5→1.0), loading (CTA label→spinner, cells non-editable, keyboard dismisses), error-invalid (cells 2px orange border, shake 3 oscillations on 3rd miss only), error-expired (solid orange border, no shake, meter jumps empty, resend enabled), error-rate-limited (OfflineBanner variant, cells/CTA 40% opacity non-responsive, live countdown), offline (OfflineBanner variant, entered digits preserved), resend-success (copy "Code sent", meter fills + green flash + orange drain resumes), success (CTA 600ms green pulse, push to S03c).
> **Motion:** Easing `cubic-bezier(0.22, 1, 0.36, 1)`. Focus/digit-scale 150–200ms. Glow breathe 4s ease loop on focus. Digit auto-advance on entry; backspace steps back; clipboard paste of 4-digit code fills all at once. Shake is 3 low-amplitude oscillations (error-invalid only, 3rd miss). Reduced-motion → instant cuts, no shake, static borders replacing breathing glows.

**[note]** This packet's S03b is **auto-submit on completion** (`OTPCluster`'s `onComplete` fires `verifyRegistration` directly), not a separate manually-tapped "verify." `BtnPrimary` — this matches the task instruction ("OTPCluster 4 cells onComplete auto-submit") and is a legitimate, common OTP UX pattern; there is no separate always-visible submit button in this packet's implementation. Per-attempt shake-after-3rd-miss requires attempt-counting state that `OTPCluster` does not track internally (confirmed in MP4's packet, which explicitly scoped that out) — this packet does not add attempt counting; every failed verify resets the cells and shows the caption, with no shake.

### S03c—Consent

> **Layout:** Balencia wordmark + 48pt symbol center → "Before we *begin*" (Display 34) → "Review and accept our policies to continue" (Body-light) → REQUIRED section (SolidCard #211008) with two ListRow checkboxes (Terms / Privacy, 56px height each) + hairline separators → OPTIONAL section (GlassCard with toggle "Send me tips and updates") → "0 of 2 required" status (Body-light, tabular-nums) → BtnPrimary "Continue" (disabled until both required checkboxes checked).
> **Components:** Balencia wordmark/symbol, NEW `ConsentCheckbox` (24px visual, orange fill when checked, paper-50 glyph, 6px radius, 44×44pt tap target), `SolidCard` (required container), `ListRow` (terms/privacy rows, 56px min height), `GlassCard` (optional), `Toggle` (marketing opt-in), `Sheet` (full, glass-frost; houses Terms/Privacy text), NEW `PrivacyFooter`, `BtnPrimary` ("Continue", 52px height, disabled 40% opacity).
> **Copy:** Title "Before we *begin*" (CIA voice, no exclamation). Overline "REQUIRED" / "OPTIONAL". Status line "0 of 2 required" → "2 of 2 ready" (turns forest green #34A853 when gate ready). No account enumeration risk (acceptance never pre-checked; count starts zero). Consent must be explicit, never pre-consented.
> **States:** Default (both unchecked, optional toggle off, CTA disabled 40% opacity), partial (1 checked, "1 of 2 required", CTA still disabled), gate-ready (both checked, "2 of 2 ready" green, CTA full opacity/interactive), loading (CTA label→spinner), success (250ms green flash CTA, push to S07), error (inlined: CTA shakes 10px, error line "Accept both to continue" slides down), network/offline (OfflineBanner, CTA swaps to "You need a *connection* to continue", checkbox state preserved).
> **Motion:** Easing `cubic-bezier(0.32, 0.72, 0, 1)` (native-feeling decel). Checkbox/toggle feedback 150–250ms per canon. Screen entrance stagger: wordmark (0ms) → header (50ms) → cards (100ms) → CTA (150ms). Checkbox row tap-anywhere (except label text) toggles; label text opens document Sheet. CTA enable/disable crossfade 200ms opacity + fill. Error slides down 10px + fade. Success 250ms green flash. Reduced-motion → instant opacity (no rise), instant banner appear, flat color swap (no glow sweep).

**[note]** `SolidCard`/`ListRow`/`Sheet`/`Toggle`/`PrivacyFooter` are not part of the MP4 kit contract (confirmed against the embedded export list above) — this packet renders the required/optional sections as plain `View` groups with `ConsentCheckbox` rows (§5 body composition), and does not open a document `Sheet` on label tap (label text is part of the same tap target as the checkbox itself, per `ConsentCheckbox`'s actual behavior documented above — this is a real component-capability constraint, not a corner cut). Push destination after success is `resolveNextStep(data.nextStep)`, NOT a hardcoded "S07" — the live server's `/consent` response drives the next screen dynamically (per architecture-plan.md ADR-10 and scope-server-auth.md §1: `submitConsent` → `{user, nextStep:'whatsapp_enrollment'}`), which supersedes this older hi-fi doc's hardcoded "push to S07".

### Canonical auth patterns (embedded verbatim, `scope-hifi-auth.md` §3)

> **Consent & Safety (CANON §8 cross-cutting patterns)**
> - Required consent unchecked until explicit action. Terms/Privacy checkboxes start empty; never pre-checked.
> - Consent is skippable where optional. Marketing email toggle can start off. Health/voice/provider permission gated by ConsentCard with accept/decline parity.
> - Account enumeration safety: Sign-in errors never disclose whether an email has an account. Reset links use identical success framing for known and unknown emails. OTP rate-limit messages never reveal account existence.

> **Typography (CANON §5)**
> Sentence case everywhere. No exclamation marks. Emphasis = Tiempos Medium italic only (never color, never bold). One emphasis word per moment max.
> Form labels (persistent, not placeholder): email/password labels remain visible; password eye toggle states announced.

**[note]** "Emphasis = Tiempos Medium italic" is a Figma-prototype typographic treatment; this native kit has no italic Tiempos font loaded anywhere (confirmed: `theme.ts`'s `Fonts` only exposes generic `sans/serif/rounded/mono` platform identifiers, no custom font family is registered in this codebase). Titles in this packet render as plain text via `BalenciaScreen`'s `title` prop — no italic styling is applied, and this is not a regression this packet introduces (the same is true of every already-landed screen, e.g. `sign-in-screen.tsx`'s title has no italic treatment either).

> **Keyboard Handling & Accessibility**
> 44px minimum targets (`COMPONENT-CATALOG.md` usage rules): all interactive elements meet 44×44px. Inputs 52px height, buttons 44–52px height, icon toggles 44–56px.
> Screen-reader labels: password eye toggle → "show password" / "hide password"; checkboxes and toggles announce state; timers use `aria-live="polite"` for countdown/retry-after announcements.
> Reduced-motion path (`prefers-reduced-motion: reduce`): all transitions become instant cuts; shakes skipped; breathing/pulsing glows → fixed static borders.

**[note]** All timer/reduced-motion behavior in this packet's screens is inherited automatically from the already-landed `ChargeMeter`/`OTPCluster`/`PasswordRequirementList`/`ToastBanner` components (each independently calls `useReducedMotion()` internally, per the embedded contract above) — this packet's own screen-level code (`sign-up-screen.tsx`, `verify-screen.tsx`, `consent-screen.tsx`) adds no new animation of its own, so there is nothing extra to gate on reduced-motion at the screen level.

---

## Acceptance criteria (mechanically checkable)

1. `npx tsc --noEmit` (i.e. `npm run typecheck` from `yhealth-app/mobile/`) passes with zero new errors.
2. `npm run lint` passes with zero new errors/warnings on the 9 target files.
3. `grep -rn "activationToken" src/features/auth/ src/services/auth/next-step.ts` shows it used only as an in-memory variable/reducer field/function parameter — zero matches against `SecureStore`, `AsyncStorage`, `console.`, or any route-param/query-string construction in the same files.
4. `grep -rn "console\." src/features/auth/sign-up-screen.tsx src/features/auth/verify-screen.tsx src/features/auth/consent-screen.tsx src/features/auth/registration-flow.tsx src/services/auth/next-step.ts` returns no matches.
5. `src/services/auth/next-step.ts` exports exactly one symbol, `resolveNextStep`, with the exact switch-case body given in Contract §1 (4 explicit cases + default, all returning the exact literal route strings shown).
6. `src/features/auth/registration-flow.tsx` exports exactly: `RegistrationFlowStep`, `RegistrationFlowState`, `RegistrationFlowAction`, `initialRegistrationFlowState`, `registrationFlowReducer`, `RegistrationFlowContextValue`, `RegistrationFlowProvider`, `useRegistrationFlow` — matching Contract §2 byte-for-byte in the reducer's action handling (three cases + default, exactly as shown).
7. `registrationFlowReducer(initialRegistrationFlowState, {type:'REGISTER_SUCCESS', email:'a@b.com', activationToken:'tok1', cooldownEndsAt:1000})` returns `{step:'otp', email:'a@b.com', activationToken:'tok1', resendCooldownEndsAt:1000}` (verify by reading the switch case — this exact shape is what MP9 will assert against).
8. `registrationFlowReducer(<state after REGISTER_SUCCESS above>, {type:'RESEND_SUCCESS', activationToken:'tok2', cooldownEndsAt:2000})` returns the same object with only `activationToken:'tok2'` and `resendCooldownEndsAt:2000` changed (`step` and `email` preserved).
9. `registrationFlowReducer(<any state>, {type:'RESET'})` returns an object deep-equal to `initialRegistrationFlowState`.
10. `src/app/(auth)/_layout.tsx` diff against the embedded current source is additive-only: one new import line + `<RegistrationFlowProvider>` wrapper tags around the existing `<Stack .../>` element — the `Stack`'s `screenOptions` object is byte-for-byte unchanged.
11. `src/app/(auth)/sign-up.tsx`, `verify.tsx`, `consent.tsx` each contain exactly 2 non-empty lines: one named import from the corresponding `@/features/auth/*-screen` module, and `export default <ScreenName>;` — matching the `sign-in.tsx` pattern exactly.
12. Every `router.push`/`router.replace` call whose argument is (or contains) a call to `resolveNextStep(...)` casts the result `as Href`, with `Href` imported `import type { Href } from 'expo-router'` — `grep -n "resolveNextStep(" src/features/auth/*.tsx` shows every match immediately followed by `as Href)` before the closing statement.
13. `grep -n "BalenciaColors.purple\|BalenciaColors.purpleSoft\|BalenciaColors.purpleText" src/features/auth/sign-up-screen.tsx src/features/auth/verify-screen.tsx src/features/auth/consent-screen.tsx` returns no matches (purple is Cia/AI-only per canon §4; none of these three screens represent Cia data).
14. `grep -n "#[0-9a-fA-F]\{3,6\}" src/features/auth/sign-up-screen.tsx src/features/auth/verify-screen.tsx src/features/auth/consent-screen.tsx src/features/auth/registration-flow.tsx src/services/auth/next-step.ts` returns no matches — no raw hex color literals; every color comes through `BalenciaColors.*`.
15. `ConsentCheckbox` usages in `consent-screen.tsx`: `grep -n "checked={" src/features/auth/consent-screen.tsx` shows exactly 3 matches, each bound to a `useState` boolean that is initialized to `false` (grep the corresponding `useState(false)` declarations for `termsAccepted`, `privacyAccepted`, `marketingOptIn`).
16. `package.json` is byte-for-byte unchanged (`git diff --stat package.json` shows nothing, since this packet declares zero new dependencies).
17. All interactive elements (buttons, checkboxes, the gender pills, the resend action) have `minHeight`/`minWidth` >= 44 either directly or via the underlying kit component's own guarantee (`GlassPillInput`=52, `ConsentCheckbox`=44x44 tap target, `BalenciaButton`=`TouchTarget`=44, gender pills=`TouchTarget`=44 as specified in Contract §3).
18. Sign-up → verify → consent flow, exercised manually or via the batch's simulator smoke evidence (SMK, later in the wave sequence — not this packet's job to produce that evidence, only to make the flow correct): submitting valid S03 data reaches S03b with a masked email destination; completing 4 OTP digits calls `verifyRegistration` and on success calls `adoptSession` then navigates via `resolveNextStep`; on `/consent` after landing there, checking both required boxes enables "Agree and continue", which calls `submitConsent` and navigates via `resolveNextStep` again.

---

## Out of scope

- Social sign-in buttons on S03 (Google/Apple) — MP7.
- `complete-profile.tsx` (S03d) and `whatsapp.tsx` (S03e/W6) route files/screens — MP7 and MP8 respectively. `resolveNextStep` may point at their paths before those packets land; that is expected and correct.
- Forgot/reset password (S05/S05b) — MP6.
- Any new component in `src/components/balencia/` (`MomentumBar`, `ChipProvenance`, `ComplianceFooter`, `ConnectsPreviewRow`, `SolidCard`, `ListRow`, `Sheet`, `Toggle`, `PrivacyFooter`) — not built by MP4, not this packet's job to add; documented substitutions are used instead (see the `[note]` blocks in Design spec).
- Attempt-counted shake-after-3rd-miss animation on OTP entry, breathing glow-bleed on focus, and 600ms/250ms success glow-pulse celebrations — the underlying kit primitives (MP4) do not implement per-attempt counting or celebration pulses; adding that state machine is out of scope for this packet.
- A guest-mode / "Try without an account" link — no such route exists yet anywhere in this codebase.
- Unit tests for `registrationFlowReducer`, `resolveNextStep`, or the screens — MP9's job. This packet only needs to produce code that is straightforwardly testable (pure reducer, pure route function), not the tests themselves.
- Token security review (log/SecureStore grep sweep across the whole app, `Authorization` header redaction, 429/`Retry-After` handling) — MP10, though this packet must not itself introduce a violation (see acceptance criteria 3–4).
- Any change to `src/components/balencia/*`, `src/services/api/dto/auth.ts`, `src/services/api/auth.ts`, `src/services/auth/session-provider.tsx`, `src/services/auth/session-machine.ts`, `src/constants/theme.ts`, `src/features/auth/sign-in-screen.tsx`, `src/app/(auth)/sign-in.tsx`, `src/app/_layout.tsx`, or `package.json`.
