# Packet MP6 — Forgot/Reset Password Screens (S05 / S05b)

## Objective

Ship the mobile "forgot password" and "reset password" flows against the **real** server
contract (email + 4-digit OTP, not a link token), with two hard non-negotiables:

1. **ADR-10 enumeration normalization** — the server 404s an unknown email by deliberate
   design. Mobile must render the **identical** success view-model for a real 200 and for
   a 404/`NOT_FOUND`, via one pure, exported, unit-testable function
   (`normalizeForgotPasswordOutcome`). No branch in any screen may treat 404 differently
   from 200.
2. **ADR-9 honest S05b adaptation** — the hi-fi spec for S05b assumes a link-token
   recovery flow. The server has no such endpoint. The reset screen must honestly render
   an OTP entry (`OTPCluster`) + masked-email confirmation that the original mock does
   not show, with a header comment in the source explaining why, so nobody "fixes" it
   back to a link-only layout later.

This packet is pre-auth (no session is created or touched) — both `forgotPassword` and
`resetPassword` calls use `skipAuth: true` already baked into `services/api/auth.ts`
(embedded below, already landed by MP2 — do not modify it).

## Target files (exact absolute paths — all CREATE, nothing modified)

- **CREATE** `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/features/auth/forgot-normalize.ts`
- **CREATE** `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/features/auth/forgot-password-screen.tsx`
- **CREATE** `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/features/auth/reset-password-screen.tsx`
- **CREATE** `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/app/(auth)/forgot-password.tsx`
- **CREATE** `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/app/(auth)/reset-password.tsx`

Nothing else changes. Do not touch `src/features/auth/sign-in-screen.tsx` (wiring a
"Forgot password?" link there is MP7's job, out of scope here — see "Out of scope").

## Dependencies (lander installs)

**None.** Every import used below already exists in `package.json` (verified live,
2026-07-09) and in the already-landed kit/services:

- `expo-router`, `react`, `react-native`, `react-native-safe-area-context` — already deps.
- `expo-apple-authentication` / `expo-auth-session` are present (MP3 landed) but **not**
  used by this packet.
- `@/components/balencia` exports (`GlassPillInput`, `OTPCluster`, `ChargeMeter`,
  `PasswordRequirementList`, `MaskedDestinationLine`, `BalenciaButton`, `ErrorState`,
  `StatusChip`, `useReducedMotion`) all already exist (MP4 landed) — embedded verbatim
  below.
- `@/services/api/auth.ts` (`forgotPassword`, `resetPassword`) and
  `@/services/api/dto/auth.ts` (`ForgotPasswordRequest`, `ResetPasswordRequest`) already
  exist (MP2 landed) — embedded verbatim below.

Do **not** add anything to `package.json`. If a worker believes a dependency is missing,
stop and flag it — do not silently add one.

---

## Embedded current source

Everything below is the **live, current** content of files this packet imports from (all
already landed by earlier packets in this batch). Match these names/shapes exactly — do
not invent alternate prop names or re-derive types from memory.

### `src/services/api/dto/auth.ts` (full file, MP2-landed — DO NOT MODIFY)

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

### `src/services/api/auth.ts` (full file, MP2-landed — DO NOT MODIFY)

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

Note: `forgotPassword`/`resetPassword` both resolve to `null` on success (the envelope's
`data` field) — that's why `normalizeForgotPasswordOutcome` takes the literal string
`'ok'` on success rather than the resolved value; there's nothing meaningful in the
payload to normalize.

### `src/services/api/errors.ts` (full file — DO NOT MODIFY)

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

`ApiError.details` is typed `unknown`. In practice the client builds it from the error
envelope's `errors` field: `client.ts` does
`throw new ApiError({ message: parsed.message, status: response.status, code: parsed.code, requestId: parsed.requestId, details: parsed.errors })`
where `parsed.errors?: unknown[]`. So `details` may be an array, an object, or absent —
never assume a shape without a runtime type-guard (see `extractRetryAfterSeconds` in the
Contract section).

### `src/components/balencia/index.ts` (full file — DO NOT MODIFY)

```ts
export * from './button';
export * from './card';
export * from './charts';
export * from './chips';
export * from './screen';
export * from './states';
export * from './auth-inputs';
```

### `src/components/balencia/auth-inputs.tsx` — exported members used by this packet (MP4-landed, DO NOT MODIFY)

Full current file was read and verified live. The exact exported signatures this packet
relies on:

```ts
export function useReducedMotion(): boolean;

export type GlassPillInputVariant = 'text' | 'email' | 'password';

export type GlassPillInputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  variant?: GlassPillInputVariant;
  placeholder?: string;
  error?: string;              // STRING caption, not boolean
  disabled?: boolean;
  autoFocus?: boolean;
  returnKeyType?: 'done' | 'next' | 'go' | 'send';
  onSubmitEditing?: () => void;
  testID?: string;
};
export function GlassPillInput(props: GlassPillInputProps): JSX.Element;
// variant="password" already renders a "Show"/"Hide" eye toggle internally — do not
// build a separate eye-toggle affordance.

export type OTPClusterProps = {
  length?: number;              // default 4
  value: string;
  onChangeText: (value: string) => void;
  onComplete?: (code: string) => void;
  disabled?: boolean;
  error?: boolean;               // BOOLEAN here (different from GlassPillInput.error)
  autoFocus?: boolean;           // default true
  testID?: string;
};
export function OTPCluster(props: OTPClusterProps): JSX.Element;

export type ChargeMeterProps = {
  deadline?: number | null;      // epoch ms; null/undefined => component renders null
  durationSeconds?: number;      // default 60, used only for the fill-percentage math
  onComplete?: () => void;
  formatLabel?: (secondsRemaining: number) => string; // default "M:SS" tabular
  testID?: string;
};
export function ChargeMeter(props: ChargeMeterProps): JSX.Element | null;

export type PasswordRequirementListProps = {
  password: string;
  testID?: string;
};
export function PasswordRequirementList(props: PasswordRequirementListProps): JSX.Element;
// Renders 5 rows: 8+ characters / uppercase letter / lowercase letter / number /
// special character. The rule-check array (PASSWORD_RULES) is a MODULE-PRIVATE const —
// it is NOT exported. Any screen that needs to gate a CTA on "all rules pass" must
// duplicate the same 5 checks locally (done in reset-password-screen.tsx below) —
// do not attempt `import { PASSWORD_RULES }`, it does not exist.

export function maskEmail(email: string): string; // exported helper, "j***@domain.com"

export type MaskedDestinationLineProps = {
  email: string;
  prefix?: string;   // default 'We sent a code to '
  testID?: string;
};
export function MaskedDestinationLine(props: MaskedDestinationLineProps): JSX.Element;
// Masks internally via maskEmail() — pass the RAW email, never pre-mask it yourself.
```

### `src/components/balencia/button.tsx` (full file — DO NOT MODIFY)

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

export function BalenciaButton({
  children,
  onPress,
  tone = 'primary',
  disabled,
  accessibilityLabel,
}: BalenciaButtonProps) {
  /* ... renders a Pressable pill; tone="primary" = orange fill (this packet's BtnPrimary
     equivalent), tone="quiet" = transparent/hairline border (this packet's BtnGhost
     equivalent for "request a new code" / "Back to sign in" secondary actions where a
     BalenciaButton, rather than a bare Pressable+Text, is used) ... */
}
```

**IMPORTANT naming note:** the RN kit has **no** `BtnPrimary`/`BtnGhost`/`BtnSecondary`
components. The hi-fi specs and canon docs (embedded below) use those names as *design*
vocabulary; the shipped implementation is a single `BalenciaButton` with a `tone` prop.
Map: canon "BtnPrimary" → `<BalenciaButton tone="primary">`; canon "BtnGhost" → either
`<BalenciaButton tone="quiet">` (when a boxed pill reads better) or a plain `Pressable` +
`Text` styled as a text-only link (used below for small inline actions like "request a
new code" and the resend link, matching the ghost-link treatment already used elsewhere
in this codebase, e.g. `sign-in-screen.tsx`'s "Forgot password?" ghost link pattern).

### `src/components/balencia/states.tsx` — relevant exports (excerpt, DO NOT MODIFY)

```tsx
export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  // renders a bordered card: "Needs attention" title, `message` body, and — only if
  // `onRetry` is passed — a "Try again" button that calls onRetry.
}
```

Only `ErrorState` is used by this packet (imported from `@/components/balencia`).
`OfflineBanner`, `SkeletonState`, `HonestNullState`, `LockedFeatureState`,
`ProvenanceChip` also live in this file and are exported but **not used** here.

### `src/components/balencia/chips.tsx` (full file — DO NOT MODIFY)

```tsx
import { StyleSheet, Text, View } from 'react-native';

import { BalenciaColors, Radius, Spacing } from '@/constants/theme';

type ChipTone = 'orange' | 'green' | 'purple' | 'warning' | 'muted';

type ChipProps = {
  label: string;
  tone?: ChipTone;
};

export function StatusChip({ label, tone = 'muted' }: ChipProps) {
  /* pill chip; used here with tone="warning" for the rate-limit "system cooldown" label */
}

export function LegacyProvenanceChip({ label = 'Backend contract pending' }: Partial<ChipProps>) { /* unused here */ }
export function ReadinessBadge({ status }: { status: 'ready' | 'flagged' | 'waiver' }) { /* unused here */ }
```

There is **no** `ChipProvenance` component in the live kit (the canon docs' name for
it) — the shipped equivalent is `StatusChip`. Use `<StatusChip label="system cooldown" tone="warning" />`
wherever the canon spec says `ChipProvenance` "system cooldown".

### `src/constants/theme.ts` (full file — DO NOT MODIFY)

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
(`Colors`, `ThemeColor`, `Fonts` also exported, unused by this packet.)

### `src/services/auth/session-provider.tsx` — `adoptSession` (context only, NOT called by this packet)

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

Included for context/consistency only — the forgot/reset flow is **pre-auth**; neither
screen in this packet calls `useSession()` or `adoptSession()`. `resetPassword` changes
the password but does not return tokens (`ResetPasswordResponse = null`), so after a
successful reset the user is routed to `/(auth)/sign-in` to authenticate normally, not
auto-signed-in.

### `src/features/auth/sign-in-screen.tsx` (full file — style precedent, NOT modified)

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
        {/* ...form... */}
      </BalenciaScreen>
    </KeyboardAvoidingView>
  );
}
```

Note: `BalenciaScreen` (from `@/components/balencia/screen.tsx`) takes a required
`title: string` and renders a **left-aligned**, single-string header — it cannot express
S05b's centered header or a mixed-style (regular + italic) title. **This packet's two
screens build their own header block directly** (`SafeAreaView` + `ScrollView`, same
skeleton as `sign-in-screen.tsx`'s `KeyboardAvoidingView` wrapper) instead of using
`BalenciaScreen`, so the S05 back-chevron and S05b centered/no-back-button layouts can be
expressed exactly. This is a screen-local composition choice, not a new kit primitive —
consistent with `sign-in-screen.tsx` already hand-rolling its own `TextInput`s rather
than only ever using kit primitives.

### `src/app/(auth)/_layout.tsx` (full file — DO NOT MODIFY, confirms no per-route registration needed)

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

This `<Stack />` has no `<Stack.Screen>` children — Expo Router file-based routing means
simply adding `src/app/(auth)/forgot-password.tsx` and `reset-password.tsx` registers the
routes automatically. No `_layout.tsx` change is needed or permitted.

### Existing simple route-file pattern (for the two new route files)

```tsx
// src/app/(auth)/sign-in.tsx
import { SignInScreen } from '@/features/auth/sign-in-screen';

export default SignInScreen;
```
```tsx
// src/app/(auth)/onboarding.tsx
import { CiaOnboardingScreen } from '@/features/cia/cia-onboarding-screen';

export default CiaOnboardingScreen;
```

The two new route files must follow this exact one-import/one-export shape.

---

## Contract (exact types/props/signatures — verbatim)

### 1. `src/features/auth/forgot-normalize.ts` — full required contents

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

This file must have **zero** React/React Native imports and **zero** side effects — it
is imported directly by MP9's unit tests as a pure function.

### 2. `src/features/auth/forgot-password-screen.tsx` — component contract

- Named export: `export function ForgotPasswordScreen(): JSX.Element` (no props — the
  route file wraps it as the default export, matching the `sign-in.tsx` pattern).
- Internal `ScreenState = 'form' | 'error' | 'rate-limited' | 'sent'`.
- Must call `normalizeForgotPasswordOutcome('ok')` on a successful `forgotPassword()`
  call and `normalizeForgotPasswordOutcome(caughtApiError)` in the catch branch — **both
  paths must feed the same function** so the 404≈200 guarantee is structural, not just
  incidental.
- Full reference implementation (adapt only where explicitly marked; this is the
  intended shipped shape, not a rough sketch):

```tsx
import { useCallback, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, type Href } from 'expo-router';

import {
  BalenciaButton,
  ChargeMeter,
  ErrorState,
  GlassPillInput,
  MaskedDestinationLine,
  StatusChip,
  useReducedMotion,
} from '@/components/balencia';
import { BalenciaColors, Radius, Spacing, TouchTarget } from '@/constants/theme';
import { forgotPassword } from '@/services/api/auth';
import { ApiError } from '@/services/api/errors';
import { normalizeForgotPasswordOutcome } from './forgot-normalize';

const RESEND_COOLDOWN_MS = 60_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ScreenState = 'form' | 'error' | 'rate-limited' | 'sent';

export function ForgotPasswordScreen() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  const [email, setEmail] = useState('');
  const [screenState, setScreenState] = useState<ScreenState>('form');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [retryAfterSeconds, setRetryAfterSeconds] = useState<number | null>(null);
  const [rateLimitDeadline, setRateLimitDeadline] = useState<number | null>(null);
  const [resendDeadline, setResendDeadline] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const checkScale = useRef(new Animated.Value(0.5)).current;

  const isEmailValid = EMAIL_PATTERN.test(email.trim());

  const runCheckAnimation = useCallback(() => {
    if (reduceMotion) {
      checkScale.setValue(1);
      return;
    }
    checkScale.setValue(0.5);
    Animated.timing(checkScale, {
      toValue: 1,
      duration: 150,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [checkScale, reduceMotion]);

  const submit = useCallback(async () => {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      await forgotPassword({ email: email.trim() });
      const outcome = normalizeForgotPasswordOutcome('ok');
      if (outcome.kind === 'sent') {
        setScreenState('sent');
        setResendDeadline(Date.now() + RESEND_COOLDOWN_MS);
        runCheckAnimation();
      }
    } catch (caught) {
      if (caught instanceof ApiError) {
        const outcome = normalizeForgotPasswordOutcome(caught);
        if (outcome.kind === 'sent') {
          setScreenState('sent');
          setResendDeadline(Date.now() + RESEND_COOLDOWN_MS);
          runCheckAnimation();
        } else if (outcome.kind === 'rate-limited') {
          setRetryAfterSeconds(outcome.retryAfterSeconds);
          setRateLimitDeadline(
            outcome.retryAfterSeconds != null ? Date.now() + outcome.retryAfterSeconds * 1000 : null
          );
          setScreenState('rate-limited');
        } else {
          setErrorMessage(outcome.message);
          setScreenState('error');
        }
      } else {
        setErrorMessage('Something went wrong. Try again.');
        setScreenState('error');
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [email, runCheckAnimation]);

  const handleResend = useCallback(() => {
    if (resendDeadline != null && Date.now() < resendDeadline) {
      return;
    }
    void submit();
  }, [resendDeadline, submit]);

  const handleEnterCode = useCallback(() => {
    // Typed routes (app.json experiments.typedRoutes=true) regenerate
    // .expo/types/router.d.ts from the files under src/app/ — that file is gitignored
    // and only reflects routes that existed the last time Metro/Expo CLI ran. Cast the
    // literal Href so `tsc --noEmit` doesn't fail before that regeneration happens for
    // this brand-new route; do NOT use `any`.
    router.push({ pathname: '/(auth)/reset-password', params: { email: email.trim() } } as Href);
  }, [router, email]);

  const showForm = screenState === 'form' || screenState === 'error';

  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', default: undefined })} style={styles.flex}>
      <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeArea}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}>
          <View style={styles.headerRow}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Back"
              hitSlop={8}
              style={styles.backButton}
              onPress={() => (router.canGoBack() ? router.back() : router.replace('/(auth)/sign-in'))}>
              <Text style={styles.backGlyph}>{'‹'}</Text>
            </Pressable>
            <Text style={styles.brand}>Balencia</Text>
            <View style={styles.backButton} />
          </View>

          {screenState !== 'sent' ? (
            <View style={styles.header}>
              <Text style={styles.title}>
                Reset your <Text style={styles.titleEmphasis}>password</Text>
              </Text>
              <Text style={styles.subtitle}>
                Enter your email and we&apos;ll send reset instructions if it matches.
              </Text>
            </View>
          ) : null}

          {screenState === 'rate-limited' ? (
            <View style={styles.rateLimitedBlock} accessibilityRole="alert">
              <StatusChip label="system cooldown" tone="warning" />
              <Text style={styles.rateLimitedText}>
                {retryAfterSeconds != null
                  ? 'Too many attempts. You can try again once the timer below finishes.'
                  : 'Too many attempts. Try again in a few minutes.'}
              </Text>
              {rateLimitDeadline != null ? (
                <ChargeMeter
                  deadline={rateLimitDeadline}
                  durationSeconds={retryAfterSeconds ?? 60}
                  onComplete={() => {
                    setScreenState('form');
                    setRateLimitDeadline(null);
                  }}
                />
              ) : null}
            </View>
          ) : null}

          {showForm ? (
            <View style={styles.form}>
              {screenState === 'error' ? (
                <ErrorState message={errorMessage ?? 'Something went wrong. Try again.'} onRetry={submit} />
              ) : null}
              <GlassPillInput
                testID="forgot-password-email"
                label="Email"
                value={email}
                onChangeText={setEmail}
                variant="email"
                placeholder="you@example.com"
                returnKeyType="go"
                onSubmitEditing={() => {
                  if (isEmailValid && !isSubmitting) void submit();
                }}
              />
              <BalenciaButton
                tone="primary"
                disabled={!isEmailValid || isSubmitting}
                onPress={submit}
                accessibilityLabel="Send reset code">
                {isSubmitting ? 'Sending' : 'Send reset code'}
              </BalenciaButton>
            </View>
          ) : null}

          {screenState === 'sent' ? (
            <View style={styles.successBlock}>
              <Animated.Text
                style={[styles.successCheck, { transform: [{ scale: checkScale }] }]}
                accessibilityLabel="Request sent">
                {'✓'}
              </Animated.Text>
              <Text style={styles.successTitle}>Check your email</Text>
              <Text style={styles.successBody}>
                If that email matches an account, a reset code will arrive.
              </Text>
              <MaskedDestinationLine email={email} prefix="Code sent to " testID="forgot-password-masked-email" />
              <BalenciaButton tone="primary" onPress={handleEnterCode} accessibilityLabel="Enter code">
                Enter code
              </BalenciaButton>
              <View style={styles.resendRow}>
                <Text style={styles.resendLabel}>didn&apos;t receive it?</Text>
                {resendDeadline != null && Date.now() < resendDeadline ? (
                  <ChargeMeter
                    testID="forgot-password-resend-meter"
                    deadline={resendDeadline}
                    durationSeconds={60}
                    onComplete={() => setResendDeadline(null)}
                  />
                ) : (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Send code again"
                    onPress={handleResend}
                    style={styles.resendButton}>
                    <Text style={styles.resendLabelAction}>send again</Text>
                  </Pressable>
                )}
              </View>
            </View>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: BalenciaColors.ink900 },
  safeArea: { flex: 1, backgroundColor: BalenciaColors.ink900 },
  content: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 560,
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.six,
    gap: Spacing.four,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  backButton: { width: TouchTarget, height: TouchTarget, alignItems: 'center', justifyContent: 'center' },
  backGlyph: { color: BalenciaColors.paper100, fontSize: 28, fontWeight: '600' },
  brand: {
    color: BalenciaColors.paper70,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  header: { gap: Spacing.two },
  title: { color: BalenciaColors.paper100, fontSize: 30, fontWeight: '800', lineHeight: 36 },
  titleEmphasis: { fontStyle: 'italic', fontWeight: '600' },
  subtitle: { color: BalenciaColors.paper70, fontSize: 16, lineHeight: 22 },
  form: { gap: Spacing.three },
  rateLimitedBlock: {
    gap: Spacing.two,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(245, 181, 71, 0.3)',
    backgroundColor: 'rgba(245, 181, 71, 0.08)',
    padding: Spacing.three,
  },
  rateLimitedText: { color: BalenciaColors.paper70, fontSize: 14, lineHeight: 20 },
  successBlock: { alignItems: 'center', gap: Spacing.three, paddingTop: Spacing.four },
  successCheck: { color: BalenciaColors.green, fontSize: 40, fontWeight: '800' },
  successTitle: { color: BalenciaColors.paper100, fontSize: 26, fontWeight: '800' },
  successBody: { color: BalenciaColors.paper70, fontSize: 15, lineHeight: 21, textAlign: 'center' },
  resendRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.two, minHeight: TouchTarget },
  resendButton: { minHeight: TouchTarget, justifyContent: 'center', paddingHorizontal: Spacing.two },
  resendLabel: { color: BalenciaColors.paper70, fontSize: 14 },
  resendLabelAction: { color: BalenciaColors.orange, fontSize: 14, fontWeight: '700' },
});
```

### 3. `src/features/auth/reset-password-screen.tsx` — component contract

- Named export: `export function ResetPasswordScreen(): JSX.Element` (no props).
- Must open with the ADR-9 deviation header comment (verbatim, see below).
- Internal `ScreenState = 'form' | 'otp-error' | 'rate-limited' | 'success'`.
- `email` comes **only** from `useLocalSearchParams<{ email?: string }>()` — prefill and
  masked display, never edited, never re-derived.
- CTA disabled until: all 5 password rules pass (local duplicate of the kit's rule set —
  `PasswordRequirementList`'s internal rules are not exported) AND `password ===
  confirmPassword` AND `otp.length === 4`.
- On a non-429 `ApiError` from `resetPassword`, render an honest inline error (the
  server's own `message`, not a fabricated classification — the traced contract has no
  machine-readable code distinguishing wrong-vs-expired OTP, scope-server-auth.md §4) +
  a "request a new code" ghost action that goes back to `/(auth)/forgot-password`.

Full reference implementation:

```tsx
import { useCallback, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, type Href } from 'expo-router';

import {
  BalenciaButton,
  ChargeMeter,
  ErrorState,
  GlassPillInput,
  MaskedDestinationLine,
  OTPCluster,
  PasswordRequirementList,
  StatusChip,
  useReducedMotion,
} from '@/components/balencia';
import { BalenciaColors, Radius, Spacing, TouchTarget } from '@/constants/theme';
import { resetPassword } from '@/services/api/auth';
import { ApiError } from '@/services/api/errors';
import { extractRetryAfterSeconds } from './forgot-normalize';

// ADR-9 (BIOS-003 architecture-plan.md): the hi-fi spec for S05b
// (Balencia-New-Screens/hifi-screens/05b-reset-password.md) assumes a LINK-TOKEN
// recovery flow — no email or OTP fields, just password fields, reached from an
// emailed link. The actual server contract
// (`POST /auth/reset-password {email, otp, password, confirmPassword}`,
// scope-server-auth.md §1/§4) is email + 4-digit-OTP based; there is no link-token
// endpoint. This screen honestly adapts the S05b layout by adding an OTPCluster and a
// masked-email confirmation line that the original mock does not show, because the
// server has no other way to prove code possession. Do not "fix" this back to a
// link-only layout — the OTP field is load-bearing, not decorative.

const PASSWORD_CHECKS: Array<(pw: string) => boolean> = [
  (pw) => pw.length >= 8,
  (pw) => /[A-Z]/.test(pw),
  (pw) => /[a-z]/.test(pw),
  (pw) => /[0-9]/.test(pw),
  (pw) => /[^A-Za-z0-9]/.test(pw),
];

// Mirrors PasswordRequirementList's internal PASSWORD_RULES
// (components/balencia/auth-inputs.tsx) — that array is module-private and not
// exported, so the 5 checks are intentionally duplicated here to gate the submit
// button. Keep this in sync if the kit's rule set ever changes.
function isPasswordValid(password: string): boolean {
  return PASSWORD_CHECKS.every((check) => check(password));
}

type ScreenState = 'form' | 'otp-error' | 'rate-limited' | 'success';

export function ResetPasswordScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ email?: string }>();
  const reduceMotion = useReducedMotion();

  // Prefill only — never re-derived from anything but the navigation/deep-link param.
  const email = typeof params.email === 'string' ? params.email : '';

  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [screenState, setScreenState] = useState<ScreenState>('form');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [retryAfterSeconds, setRetryAfterSeconds] = useState<number | null>(null);
  const [rateLimitDeadline, setRateLimitDeadline] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const checkScale = useRef(new Animated.Value(0.5)).current;

  const passwordsMatch = password.length > 0 && password === confirmPassword;
  const canSubmit = isPasswordValid(password) && passwordsMatch && otp.length === 4 && !isSubmitting;

  const runCheckAnimation = useCallback(() => {
    if (reduceMotion) {
      checkScale.setValue(1);
      return;
    }
    checkScale.setValue(0.5);
    Animated.timing(checkScale, {
      toValue: 1,
      duration: 150,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [checkScale, reduceMotion]);

  const handleSubmit = useCallback(async () => {
    if (!canSubmit) return;
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      await resetPassword({ email, otp, password, confirmPassword });
      setScreenState('success');
      runCheckAnimation();
    } catch (caught) {
      if (caught instanceof ApiError && caught.status === 429) {
        const seconds = extractRetryAfterSeconds(caught.details);
        setRetryAfterSeconds(seconds);
        setRateLimitDeadline(seconds != null ? Date.now() + seconds * 1000 : null);
        setScreenState('rate-limited');
      } else if (caught instanceof ApiError) {
        setErrorMessage(caught.message || 'That code did not work.');
        setScreenState('otp-error');
      } else {
        setErrorMessage('Something went wrong. Try again.');
        setScreenState('otp-error');
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [canSubmit, email, otp, password, confirmPassword, runCheckAnimation]);

  const handleRequestNewCode = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      // See the Href-cast note in forgot-password-screen.tsx — same typed-routes reason.
      router.replace('/(auth)/forgot-password' as Href);
    }
  }, [router]);

  const handleBackToSignIn = useCallback(() => {
    router.replace('/(auth)/sign-in');
  }, [router]);

  const showForm = screenState === 'form' || screenState === 'otp-error';

  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', default: undefined })} style={styles.flex}>
      <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeArea}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}>
          {/* No back chevron per hi-fi S05b spec ("no back button"); centered brand mark. */}
          <Text style={styles.brandCentered}>Balencia</Text>

          {screenState !== 'success' ? (
            <View style={styles.headerCentered}>
              <Text style={styles.titleCentered}>
                Set a new <Text style={styles.titleEmphasis}>password</Text>
              </Text>
              <Text style={styles.subtitleCentered}>Choose something strong and unique.</Text>
              {email ? (
                <MaskedDestinationLine email={email} prefix="Code sent to " testID="reset-password-masked-email" />
              ) : null}
            </View>
          ) : null}

          {screenState === 'rate-limited' ? (
            <View style={styles.rateLimitedBlock} accessibilityRole="alert">
              <StatusChip label="system cooldown" tone="warning" />
              <Text style={styles.rateLimitedText}>
                {retryAfterSeconds != null
                  ? 'Too many attempts. You can try again once the timer below finishes.'
                  : 'Too many attempts. Try again in a few minutes.'}
              </Text>
              {rateLimitDeadline != null ? (
                <ChargeMeter
                  deadline={rateLimitDeadline}
                  durationSeconds={retryAfterSeconds ?? 60}
                  onComplete={() => {
                    setScreenState('form');
                    setRateLimitDeadline(null);
                  }}
                />
              ) : null}
            </View>
          ) : null}

          {showForm ? (
            <View style={styles.form}>
              {screenState === 'otp-error' ? (
                <View style={styles.otpErrorBlock}>
                  <ErrorState message={errorMessage ?? 'That code did not work.'} />
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Request a new code"
                    style={styles.ghostButton}
                    onPress={handleRequestNewCode}>
                    <Text style={styles.ghostButtonLabel}>request a new code</Text>
                  </Pressable>
                </View>
              ) : null}

              <OTPCluster
                testID="reset-password-otp"
                value={otp}
                onChangeText={setOtp}
                disabled={isSubmitting}
                error={screenState === 'otp-error'}
              />

              <GlassPillInput
                testID="reset-password-new"
                label="New password"
                value={password}
                onChangeText={setPassword}
                variant="password"
                placeholder="New password"
                returnKeyType="next"
              />
              <GlassPillInput
                testID="reset-password-confirm"
                label="Confirm password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                variant="password"
                placeholder="Confirm password"
                returnKeyType="go"
                error={confirmPassword.length > 0 && !passwordsMatch ? 'passwords do not match' : undefined}
                onSubmitEditing={() => {
                  if (canSubmit) void handleSubmit();
                }}
              />

              <PasswordRequirementList password={password} testID="reset-password-requirements" />

              <BalenciaButton
                tone="primary"
                disabled={!canSubmit}
                onPress={handleSubmit}
                accessibilityLabel="Reset password">
                {isSubmitting ? 'Resetting' : 'Reset password'}
              </BalenciaButton>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Back to sign in"
                style={styles.ghostButton}
                onPress={handleBackToSignIn}>
                <Text style={styles.ghostButtonLabel}>Back to sign in</Text>
              </Pressable>
            </View>
          ) : null}

          {screenState === 'success' ? (
            <View style={styles.successBlock}>
              <Animated.Text
                style={[styles.successCheck, { transform: [{ scale: checkScale }] }]}
                accessibilityLabel="Password reset">
                {'✓'}
              </Animated.Text>
              <Text style={styles.successTitle}>Password reset</Text>
              <Text style={styles.successBody}>Your password has been changed. Sign in with your new password.</Text>
              <BalenciaButton tone="primary" onPress={handleBackToSignIn} accessibilityLabel="Back to sign in">
                Back to sign in
              </BalenciaButton>
            </View>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: BalenciaColors.ink900 },
  safeArea: { flex: 1, backgroundColor: BalenciaColors.ink900 },
  content: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 560,
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.four,
    paddingBottom: Spacing.six,
    gap: Spacing.four,
  },
  brandCentered: {
    color: BalenciaColors.paper70,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  headerCentered: { gap: Spacing.two, alignItems: 'center' },
  titleCentered: { color: BalenciaColors.paper100, fontSize: 30, fontWeight: '800', lineHeight: 36, textAlign: 'center' },
  titleEmphasis: { fontStyle: 'italic', fontWeight: '600' },
  subtitleCentered: { color: BalenciaColors.paper70, fontSize: 16, lineHeight: 22, textAlign: 'center' },
  rateLimitedBlock: {
    gap: Spacing.two,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(245, 181, 71, 0.3)',
    backgroundColor: 'rgba(245, 181, 71, 0.08)',
    padding: Spacing.three,
  },
  rateLimitedText: { color: BalenciaColors.paper70, fontSize: 14, lineHeight: 20 },
  form: { gap: Spacing.three },
  otpErrorBlock: { gap: Spacing.two },
  ghostButton: { minHeight: TouchTarget, alignItems: 'center', justifyContent: 'center' },
  ghostButtonLabel: { color: BalenciaColors.orange, fontSize: 14, fontWeight: '700' },
  successBlock: { alignItems: 'center', gap: Spacing.three, paddingTop: Spacing.four },
  successCheck: { color: BalenciaColors.green, fontSize: 40, fontWeight: '800' },
  successTitle: { color: BalenciaColors.paper100, fontSize: 26, fontWeight: '800' },
  successBody: { color: BalenciaColors.paper70, fontSize: 15, lineHeight: 21, textAlign: 'center' },
});
```

### 4. Route files — full required contents

`src/app/(auth)/forgot-password.tsx`:
```tsx
import { ForgotPasswordScreen } from '@/features/auth/forgot-password-screen';

export default ForgotPasswordScreen;
```

`src/app/(auth)/reset-password.tsx`:
```tsx
import { ResetPasswordScreen } from '@/features/auth/reset-password-screen';

export default ResetPasswordScreen;
```

---

## Design spec (hi-fi spec verbatim + canon rules)

### S05 — Forgot Password (`Balencia-New-Screens/hifi-screens/05-forgot-password.md`, verbatim from scope-hifi-auth.md)

> **Layout:** TopBar (back chevron 44px) → Balencia wordmark → "Reset your *password*"
> (Display 30) → "Enter your email and we'll send reset instructions if it matches." →
> email field → BtnPrimary "Send reset link" → [Success state:] green check badge →
> "Check your email" (Display 30) → "If that email matches an account, reset
> instructions will arrive." → BtnPrimary "Back to sign in" → "didn't receive it? send
> again (0:47)" (resend link + ChargeMeter).
>
> **Components:** `TopBar` (back, transparent), Balencia wordmark, `GlassPillInput`
> (email, Figma light-auth override: white, warm-gray border, 14–16 radius),
> `BtnPrimary` (initial "Send reset link" / post-success "Back to sign in"),
> `ChargeMeter` (resend cooldown 60s), `BtnGhost` (resend, disabled while meter drains),
> `ChipProvenance` ("you entered" for email, "system cooldown" for timer), NEW
> `MaskedDestinationLine` (confirmation shows masked address, never raw), `OfflineBanner`
> (offline branch).
>
> **Copy:** "Reset your *password*" (Tiempos italic on password). "Enter your email and
> we'll send reset instructions if it matches." (account-enumeration safe phrasing).
> Success: "Check your email" (green check, same format for known and unknown emails).
> "If that email matches an account, reset instructions will arrive." Resend: "didn't
> receive it? send again (0:47)". Account existence never disclosed.
>
> **States:** Default (empty email, CTA disabled 40% until format valid), skeleton
> (N/A), error (invalid format inline before submit; network failure → ErrorState + form
> intact), success (confirmation replaces form, masked destination + green check, resend
> row below), offline (OfflineBanner, submit disabled), disabled (send/resend 40%
> opacity for invalid input or cooldown).
>
> **Motion:** Tap focus email, send request, "Back to sign in", resend. Return key
> submits when valid. Default form crossfades to confirmation; check scales in 150ms.
> ChargeMeter drains once per resend window. Reduced-motion: crossfade → instant swap;
> check scale + cooldown animation → static text.

**This packet's literal task deviations from the spec text above** (both deliberate,
both directed by the batch orchestrator's task spec for MP6 — treat as authoritative
over the hi-fi doc's exact copy):
- CTA label is **"Send reset code"**, not "Send reset link" (the server issues an OTP,
  never a link — see ADR-9/ADR-10; using "link" language would be dishonest).
- Success copy is **"If that email matches an account, a reset code will arrive."**
  (code, not "reset instructions").
- Success CTA is **"Enter code"** (routes to the reset-password screen with `email`),
  not "Back to sign in" — "Back to sign in" only appears as a secondary/ghost action on
  the reset-password screen itself, once the reset actually completes.
- No `TopBar`/`ChipProvenance`/`OfflineBanner` components exist in the live kit (see
  Embedded current source) — back-chevron and "system cooldown" labeling are built
  locally using `Pressable`/`Text` and `StatusChip` respectively; offline-specific UX is
  out of scope for this packet (the generic `error` branch already covers a
  `NetworkError`, which is what a real offline attempt throws).

### S05b — Reset Password (`Balencia-New-Screens/hifi-screens/05b-reset-password.md`, verbatim from scope-hifi-auth.md)

> **Layout:** Balencia wordmark center (no back button) → "Set a new *password*"
> (Display 30) → "Choose something strong and unique." → new-password field (lock icon,
> eye toggle) → confirm-password field (lock icon, eye toggle) → five-item requirement
> checklist (8+ chars, uppercase, lowercase, number, special char) → ProgressBar
> (optional high-density) → ChipProvenance ("typed live") → BtnPrimary "Reset password"
> → BtnGhost "Back to sign in" → [expiry state:] "expired" warning → "Request new link"
> (reachable endpoint).
>
> **Components:** Balencia wordmark, `GlassPillInput` (password, confirm variants;
> Figma light-auth override: white, warm-gray border, leading lock, eye toggles, 14–16
> radius), NEW `PasswordRequirementList` (five deterministic rule rows: icon + label +
> met/unmet state), `ProgressBar` (high density only), `BtnPrimary` ("Reset password" /
> "Request new link" / "Back to sign in"), `BtnGhost` ("secondary Back to sign in"),
> `ChipProvenance` ("server token" for validation, "typed live" for strength), NEW
> `PrivacyFooter` (concise token/security note).
>
> **Copy:** "Set a new *password*" (Tiempos italic on password). "Choose something
> strong and unique." Requirements: "8+ characters" / "uppercase letter" / "lowercase
> letter" / "number" / "special character". Password match states (real = exact
> equality). Expired: "request new link" (recovery endpoint). Privacy footer:
> token/security note.
>
> **States:** Default (valid token, empty fields, CTA disabled until all rules + match
> pass), skeleton (validation status holds layout while token check resolves),
> error-missing-token (HonestNullState + recovery link), error-invalid-token (named
> state), error-expired-token (warning state, "request new link" action),
> error-mismatch (fields show mismatch signal), error-weak-password (requirement
> checklist indicates unmet rules), error-rate-limit (separate state, retry-after
> countdown), loading (CTA width locked, label→spinner), success (terminal success icon
> `--glow-done` + "Back to sign in"), offline (fields editable, submit disabled +
> OfflineBanner).
>
> **Motion:** Typing: requirement rows crossfade unmet↔met in 160ms. Reveal: eye toggle
> swaps masked/unmasked, no layout shift. Submit: CTA width locks, spinner replaces
> label, success terminal crossfades in. Expired: warning fades in without bounce (avoid
> alarm). Reduced-motion: checklist, crossfades, success glow → instant state changes.

**This packet's literal ADR-9 deviations from the spec text above** (the "honest S05b
adaptation" the packet title refers to — required, not optional):
- The screen is **not** reached via a "token" at all (no `?token=` link, no
  missing/invalid/expired-token states as literally named above) — it is reached via
  `email` param (from S05's "Enter code" button, or a `balencia://reset-password?email=`
  deep link). Add an **`OTPCluster`** (4 cells) the original mock doesn't show, and a
  **masked-email confirmation line** (`MaskedDestinationLine`), because the server has
  no other mechanism to prove code possession. This is the deviation the header comment
  in `reset-password-screen.tsx` documents.
- "Request new link" becomes **"request a new code"**, and it routes back to
  `/(auth)/forgot-password` (via `router.back()` when possible, else `router.replace`),
  not to a link-recovery endpoint (none exists).
- "error-invalid-token"/"error-expired-token" collapse into a single honest
  `otp-error` state, because the traced server contract (embedded scope-server-auth.md
  §4 excerpt below) exposes no machine-readable distinction between "wrong code" and
  "expired code" — only `crypto.timingSafeEqual` comparison + a `MAX_RESET_ATTEMPTS = 5`
  counter that burns the code after too many wrong attempts. Surface the server's own
  error message; do not invent an "expired" vs "wrong" label the server doesn't give you.
- No `ProgressBar`/`PrivacyFooter` components exist in the live kit — omitted (they were
  flagged in scope-hifi-auth.md's Appendix as candidates for future catalog promotion,
  not yet built).

### Canon rules (from `Balencia-New-Screens/canon/COMPACT-CANON.md` + `COMPONENT-CATALOG.md`, verbatim excerpts via scope-hifi-auth.md §3)

> **GlassPillInput**: `.glass-pill` material, height 52, placeholder paper-40%, focus =
> 1px orange border + subtle orange glow. Variants: text, email, password (eye toggle),
> search (leading glyph), multiline (radius 20). Figma light-auth override: white fill,
> warm-gray border, 14–16px radius, 48–52px height for sign-up/sign-in auth family.
>
> **BtnPrimary**: orange `#FF5E00` fill, paper-50 label (NM Medium 16), radius 999,
> height 52, press = scale .98 + darken 6%. One per composition. Disabled = 40% opacity;
> loading = label→spinner, width locked.
>
> **BtnGhost**: no fill, orange label, 44px target. Auth use: "Forgot password?" /
> "Sign in" / "Guest mode" links.
>
> **Resend cooldown** (S03b, S05): real = server/local timer + `ChipProvenance` "system
> cooldown", low-confidence = missing retry-after → "try again in a few minutes" (never
> fabricated countdown), honest-null = hidden before any resend attempt.
>
> **Email masking** (S03b, S05): real = masked address (`j***@email.com`), honest-null =
> generic "We sent a code to your email" (fabricated addresses forbidden).
>
> **Account enumeration safety**: Sign-in errors never disclose whether an email has an
> account. Reset links use identical success framing for known and unknown emails. OTP
> rate-limit messages never reveal account existence.
>
> **44px minimum targets**: all interactive elements meet 44×44px. Inputs 52px height,
> buttons 44–52px height, icon toggles 44–56px.
>
> **Sentence case everywhere. No exclamation marks.** Emphasis = Tiempos Medium italic
> only (never color, never bold). One emphasis word per moment max.
>
> **Reduced-motion path**: all transitions become instant cuts; shakes skipped;
> breathing/pulsing glows → fixed static borders.

### Server contract excerpt (`scope-server-auth.md` §4, verbatim — the ADR-9 authority)

> **Forgot password / reset password (also OTP, but this one IS DB-stored)**:
> - `POST /forgot-password` — generates a 4-digit `crypto.randomInt` code, SHA-256
>   hashes it, stores hash + 10-minute expiry + resets `password_reset_attempts = 0` on
>   the `users` row, emails it via `emailService.sendPasswordResetOTPEmail` — **return
>   value of the email send is not checked**, so the endpoint reports success even if
>   the email silently failed. Also: if the email is not registered, the endpoint throws
>   `404 ApiError.notFound` (explicit email-enumeration by design).
> - `POST /reset-password` — looks up by email + unexpired `password_reset_token`,
>   enforces `MAX_RESET_ATTEMPTS = 5` with a counter column, uses
>   `crypto.timingSafeEqual` for constant-time OTP comparison, burns the code after too
>   many wrong attempts, and on success updates `password` (bcrypt-hashed) and clears
>   all reset-state columns.
>
> `/forgot-password` and `/reset-password` both use `strictLimiter`: 5 requests/hour,
> IP-keyed.

### ADR-9 / ADR-10 / ADR-11 (`architecture-plan.md`, verbatim)

> **ADR-9 — Forgot/reset adaptation (S05b honest deviation).** Adapt S05b from its
> **link-token** spec assumption to the **actual server contract**: `POST
> /reset-password {email, otp(4-digit), password, confirmPassword}`. S05b renders
> `OTPCluster` (4 cells) + `PasswordRequirementList` (5 rules) + confirm, carrying
> `email` from S05 (or a `balencia://reset-password?email=` deep link prefill). "Request
> new link" → returns to S05 (`/forgot-password`) to request a fresh code. **Deviation
> documented** in the spec + batch record: server has no reset link-token path; OTP is
> the real mechanism.
>
> **ADR-10 — Enumeration normalization + nextStep routing** (enumeration half only is
> relevant to MP6). Resolve the conflict **client-side on mobile**, do not change the
> server. Server `/forgot-password` 404s unknown emails (deliberate per
> `auth-session.controller.ts:217-222` comment...). Mobile treats **both 200 and 404
> (`NOT_FOUND` / "No account found")** as the **identical** account-enumeration-safe
> confirmation ("If that email matches an account, reset instructions will arrive.")
> per canon §8. 429 (rate-limit) and network errors still surface honestly. Residual
> server-side enumeration (other clients, timing) is flagged **OQ-A** for a future
> server-consent batch — not fabricated as fixed.
>
> **ADR-11 — Token security review checklist** (items relevant to this packet): (4)
> **PII** — email masked in UI via `MaskedDestinationLine` (`j***@…`); no raw email in
> navigation params or deep-link display beyond prefill purposes; deep link carries
> email only for prefill, never a token. (5) **Client rate-limit handling** — 429 →
> parse retry-after when present, render live countdown; never fabricate a countdown
> when it is absent ("try again in a few minutes").

---

## Acceptance criteria (mechanically checkable)

1. `npm run typecheck` (`tsc --noEmit`, from `yhealth-app/mobile/`) passes with these 5
   files added and no other files changed.
2. `npm run lint` (`expo lint`) reports no new errors attributable to these 5 files.
3. `src/features/auth/forgot-normalize.ts`:
   - Exports `normalizeForgotPasswordOutcome` and `ForgotPasswordOutcome` (named
     exports); has no `react`/`react-native`/`expo-router` imports.
   - `normalizeForgotPasswordOutcome('ok')` returns `{ kind: 'sent' }`.
   - `normalizeForgotPasswordOutcome(new ApiError({ message: 'x', status: 404 }))`
     returns an object **deep-equal** to the 'ok' case: `{ kind: 'sent' }` (this is the
     mechanically-checkable form of "404==200 identical VM").
   - `normalizeForgotPasswordOutcome(new ApiError({ message: 'x', status: 404, code: 'NOT_FOUND' }))`
     also returns `{ kind: 'sent' }`.
   - `normalizeForgotPasswordOutcome(new ApiError({ message: 'x', status: 429, details: [{ retryAfter: 120 }] }))`
     returns `{ kind: 'rate-limited', retryAfterSeconds: 120 }`.
   - `normalizeForgotPasswordOutcome(new ApiError({ message: 'x', status: 429 }))` (no
     `details`) returns `{ kind: 'rate-limited', retryAfterSeconds: null }` — never a
     fabricated number.
   - `normalizeForgotPasswordOutcome(new ApiError({ message: 'Network request failed', status: 0 }))`
     returns `{ kind: 'error', message: 'Network request failed' }`.
4. `ForgotPasswordScreen` (default-exported via `src/app/(auth)/forgot-password.tsx`):
   renders a `GlassPillInput` (variant `"email"`) + a primary CTA labeled "Send reset
   code" (or "Sending" while in flight) that is disabled until the email matches a
   basic email-format check.
5. On a successful `forgotPassword()` call **or** a caught `ApiError` with `status ===
   404` (or `code === 'NOT_FOUND'`), `ForgotPasswordScreen` renders the same success
   block: a check glyph, "Check your email", the literal copy "If that email matches an
   account, a reset code will arrive.", a `MaskedDestinationLine`, and an "Enter code"
   CTA — the code path must be provably identical (both call
   `normalizeForgotPasswordOutcome` and branch only on its `kind`, never on the raw
   status/error object).
6. On a caught `ApiError` with `status === 429`, `ForgotPasswordScreen` renders a
   rate-limited block showing a live `ChargeMeter` countdown when
   `retryAfterSeconds` is non-null, and the static copy "Too many attempts. Try again in
   a few minutes." when it is null — never a fabricated countdown.
7. On any other caught error, `ForgotPasswordScreen` renders `ErrorState` with a retry
   action, and the email `GlassPillInput`'s value is unchanged (form intact — the email
   state is never cleared on error).
8. `ResetPasswordScreen` (default-exported via `src/app/(auth)/reset-password.tsx`):
   - Reads `email` only from `useLocalSearchParams<{ email?: string }>()`; there is no
     other input, prop, or state path that sets `email`.
   - Renders an `OTPCluster` (4 cells, default `length`), two `variant="password"`
     `GlassPillInput`s, and a `PasswordRequirementList`.
   - The "Reset password" `BalenciaButton` (`tone="primary"`) is `disabled` unless all
     5 password rules pass, `password === confirmPassword`, and `otp.length === 4`.
9. On success, `resetPassword({ email, otp, password, confirmPassword })` is called with
   exactly those 4 fields; the screen then shows a terminal success block with "Back to
   sign in" that calls `router.replace('/(auth)/sign-in')`.
10. On a non-429 `ApiError` from `resetPassword`, the screen shows `ErrorState` (message
    = the server's own `error.message`, no invented "expired"/"wrong code"
    classification) plus a "request a new code" action that calls `router.back()` when
    `router.canGoBack()` is true, else `router.replace('/(auth)/forgot-password')`.
11. On a 429 `ApiError` from `resetPassword`, the screen renders the same rate-limited
    pattern as `ForgotPasswordScreen` (reusing the exported `extractRetryAfterSeconds`
    from `forgot-normalize.ts` — no duplicate retry-after-parsing logic).
12. `reset-password-screen.tsx` contains a header comment naming ADR-9 and explicitly
    stating the server contract is email + 4-digit OTP, not a link token.
13. Neither screen file imports anything from a `yhealth-app/client` (web) path, and
    neither introduces a new export from `src/components/balencia/` — both consume only
    already-landed MP4 exports (`GlassPillInput`, `OTPCluster`, `ChargeMeter`,
    `PasswordRequirementList`, `MaskedDestinationLine`, `BalenciaButton`, `ErrorState`,
    `StatusChip`, `useReducedMotion`).
14. No raw (unmasked) email string is ever passed as `children`/`Text` content in either
    screen — grep both files for `{email}` / `${email}` usages and confirm every hit is
    either (a) a prop value passed to `MaskedDestinationLine`, or (b) inside a
    `forgotPassword(...)`/`resetPassword(...)` request-body object, or (c) the
    `useLocalSearchParams` read itself. No `<Text>{email}</Text>`-shaped raw render
    exists anywhere.
15. `src/app/(auth)/forgot-password.tsx` and `src/app/(auth)/reset-password.tsx` each
    contain exactly one import + one `export default`, matching the shape of the
    existing `src/app/(auth)/sign-in.tsx`.

---

## Out of scope

- Wiring a "Forgot password?" link from `src/features/auth/sign-in-screen.tsx` into
  `/(auth)/forgot-password` — that is MP7's job (social buttons + complete-profile +
  sign-in-screen changes). Do not modify `sign-in-screen.tsx` in this packet.
- Any change to `src/services/api/auth.ts` or `src/services/api/dto/auth.ts` — already
  landed by MP2, embedded verbatim above for reference only.
- Any new export added to `src/components/balencia/` (no new kit primitive) — that is
  MP4's territory; this packet only consumes what MP4 already shipped.
- `app.json` / native deep-link scheme configuration — `scheme: "balencia"` is already
  registered; Expo Router's file-based routing means `balencia://reset-password?email=…`
  resolves to `src/app/(auth)/reset-password.tsx` automatically once that file exists,
  with no additional linking config file needed. This packet does not touch `app.json`.
- Regenerating `.expo/types/router.d.ts` — it is gitignored and regenerated
  automatically by the Metro bundler / `expo` CLI the next time either runs; this packet
  uses `as Href` casts on the two brand-new-route navigations as a documented,
  intentional stopgap (see the Contract code comments) rather than editing that
  generated file or reaching for `any`.
- Server-side email-enumeration fix — flagged as `OQ-A` in the architecture plan for a
  future server-consent batch. This packet only normalizes the mobile view-model; the
  server still 404s unknown emails, by design.
- Unit tests for `normalizeForgotPasswordOutcome` / `extractRetryAfterSeconds` — owned
  by **MP9**. This packet's only job is to keep both functions pure, exported, and
  side-effect-free so MP9 can import and test them directly.
- Registration/OTP screens (S03/S03b/S03c — MP5), social sign-in + complete-profile
  (S04 changes, S03d — MP7), WhatsApp enrollment (S03e — MP8), and the token-security
  review (MP10) are all separate packets — not touched here.
- Offline-specific UX (`OfflineBanner`) — no such component exists in the live kit yet;
  a real offline attempt already surfaces through the generic `NetworkError` → `error`
  branch on both screens, which is the honest behavior available today.
