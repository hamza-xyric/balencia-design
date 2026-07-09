# Packet MP7 — Social Sign-In Buttons (Sign-In / Sign-Up) + Complete-Profile Screen (S03d)

## Objective

Wire the already-landed social sign-in service (`MP3`, `src/services/auth/social.ts`) into the two
existing email/password auth screens — `sign-in-screen.tsx` (S04) and `sign-up-screen.tsx` (S03) —
by inserting a canon-compliant "or continue with" divider + equal-weight Google/Apple
`SocialAuthButton` row into each, per ADR-7 (mobile social-auth libraries + Expo Go fallback) and
amendment A3 (Expo Go/simulator Apple-audience gate). Both insertions are **surgical**: the existing
email/password form fields, validation, and submit handlers in each screen are untouched — only new
state, new handlers, and new JSX blocks are added.

Also **create** the S03d "Complete Profile" screen + route. Social sign-in (`POST /auth/social`)
returns `needsProfileCompletion: true` for a social user missing `dateOfBirth`/`gender` (server never
collected them because there was no password-form step) — per ADR-10's `resolveNextStep` map,
`complete_profile` routes to `/(auth)/complete-profile`, and MP7's own social handlers route there
directly on `needsProfileCompletion === true` before even consulting `nextStep`. This packet creates
that screen for the first time (it does not exist yet in this tree).

This is `MP7` in the BIOS-003 packet decomposition (`architecture-plan.md` §7, Wave 5 — mobile
screens, depends on MP3 + MP4, both landed). MP3's `appleSignIn`/`useGoogleSignIn` and MP4's
`SocialAuthButton`/`GlassPillInput`/`ToastBanner` kit primitives are embedded verbatim below and MUST
be imported, not redeclared or reimplemented.

## Target files (exact absolute paths)

**MODIFY (surgical insertions only — existing logic preserved):**
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/features/auth/sign-in-screen.tsx`
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/features/auth/sign-up-screen.tsx`

**CREATE:**
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/features/auth/complete-profile-screen.tsx`
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/app/(auth)/complete-profile.tsx`

**DO NOT MODIFY / DO NOT CREATE (import from, verbatim, as embedded below):**
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/services/auth/social.ts` (MP3, landed)
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/components/balencia/auth-inputs.tsx` (MP4, landed)
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/components/balencia/button.tsx`
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/components/balencia/card.tsx`
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/components/balencia/states.tsx`
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/components/balencia/index.ts`
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/services/api/auth.ts` (MP2, landed —
  `completeProfile` already exists)
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/services/api/dto/auth.ts` (MP2, landed)
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/services/api/errors.ts`
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/services/auth/session-provider.tsx` (MP1, landed)
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/services/auth/session-machine.ts` (MP1, landed)
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/services/auth/next-step.ts`
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/constants/theme.ts`
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/features/auth/consent-screen.tsx`
  (read-only style precedent for the `Redirect`-guard pattern)
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/features/auth/forgot-password-screen.tsx`
  and `reset-password-screen.tsx` (read-only style precedent for the `useState(() => new
  Animated.Value(...))` lint-safe pattern — see "Lint rules" under Contract)
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/features/auth/registration-flow.tsx`
  (sign-up-screen.tsx already imports `useRegistrationFlow` from it — untouched, not this packet's
  concern)
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/app/(auth)/_layout.tsx` (confirms no
  per-route registration needed — Expo Router file-based routing auto-registers
  `complete-profile.tsx`)
- `package.json` — no new dependency. `expo-apple-authentication` (`~57.0.0`) and
  `expo-auth-session` (`~57.0.2`) are **already installed** (landed by MP3, verified live in
  `package.json` this session). Do not touch this file.
- `app.json` — no change. The Google iOS OAuth reversed-client-id URL scheme and
  `expo-apple-authentication`'s no-Info.plist-entry requirement were already confirmed by MP3; this
  packet adds no new native capability.

Do not touch any other file under `src/app/(auth)/` or `src/features/auth/` (`verify.tsx`,
`consent.tsx`, `whatsapp.tsx`, `onboarding.tsx`, their `-screen.tsx` counterparts) — out of scope,
covered by MP5/MP6/MP8.

## Dependencies (lander installs)

**None.** Every package this packet imports is already installed:

- `expo-apple-authentication` `~57.0.0` — already a dependency (installed by MP3's lander step;
  verified live in `package.json` this session). Used here only for
  `AppleAuthentication.isAvailableAsync()` inside a mount effect (see Contract) — the actual
  sign-in call happens inside `social.ts`, not in these screens.
- `expo-auth-session`, `expo-web-browser`, `expo-router`, `react`, `react-native` — all already
  present.
- `@/components/balencia` exports (`SocialAuthButton`, `GlassPillInput`, `ToastBanner`,
  `BalenciaButton`, `BalenciaScreen`, `ErrorState`, `GlassCard`, `CardTitle`, `CardBody`) all
  already exist (MP4 landed) — embedded verbatim below.
- `@/services/auth/social.ts` (`appleSignIn`, `useGoogleSignIn`, `SocialSignInResult`) already
  exists (MP3 landed) — embedded verbatim below.
- `@/services/api/auth.ts` (`completeProfile`) and `@/services/api/dto/auth.ts`
  (`CompleteProfileRequest`, `CompleteProfileResponse`, `Gender`, `NextStep`,
  `SocialAuthResponse`) already exist (MP2 landed) — embedded verbatim below.
- `@/services/auth/next-step.ts` (`resolveNextStep`) already exists — embedded verbatim below.
- `@/services/auth/session-provider.tsx` (`useSession`, `adoptSession`) already exists (MP1
  landed) — embedded verbatim below.

Do **not** add anything to `package.json`. If a worker believes a dependency is missing, stop and
flag it — do not silently add one.

---

## Embedded current source

All of the following is the **live, current** content of files this packet reads from or modifies
(verified this session). Match names/shapes exactly — do not invent alternate prop names or
re-derive types from memory.

### `src/features/auth/sign-in-screen.tsx` (FULL current file — this packet MODIFIES it)

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

  // P11: The "pilot mode" bypass button was removed because authentication is now real.
  // All users must authenticate against the backend to access the app.

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
  flex: {
    flex: 1,
    backgroundColor: BalenciaColors.ink900,
  },
  form: {
    gap: Spacing.two,
  },
  label: {
    color: BalenciaColors.paper70,
    fontSize: 13,
    fontWeight: '800',
  },
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

**This screen has NO "Don't have an account? Sign up" link today** — confirmed by full-file read.
Adding it is in scope (see Contract).

### `src/features/auth/sign-up-screen.tsx` (FULL current file — this packet MODIFIES it)

```tsx
import { useState, type JSX } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter, type Href } from 'expo-router';

import {
  BalenciaButton,
  BalenciaScreen,
  GlassPillInput,
  PasswordRequirementList,
  ToastBanner,
} from '@/components/balencia';
import { BalenciaColors, Spacing, TouchTarget } from '@/constants/theme';
import { register } from '@/services/api/auth';
import { ApiError } from '@/services/api/errors';
import type { Gender } from '@/services/api/dto/auth';
import { useRegistrationFlow } from '@/features/auth/registration-flow';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DOB_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function formatDobInput(raw: string): string {
  const digitsOnly = raw.replace(/[^0-9]/g, '').slice(0, 8);
  let formatted = digitsOnly.slice(0, 4);
  if (digitsOnly.length > 4) formatted += `-${digitsOnly.slice(4, 6)}`;
  if (digitsOnly.length > 6) formatted += `-${digitsOnly.slice(6, 8)}`;
  return formatted;
}

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

function isPasswordValid(password: string): boolean {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
}

const GENDER_OPTIONS: { value: Gender; label: string }[] = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'non_binary', label: 'Non-binary' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' },
];

export function SignUpScreen(): JSX.Element {
  const router = useRouter();
  const { dispatch } = useRegistrationFlow();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState<Gender | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid =
    EMAIL_PATTERN.test(email.trim()) &&
    isPasswordValid(password) &&
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    isValidDob(dateOfBirth) &&
    gender !== null;

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

  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', default: undefined })} style={styles.flex}>
      <BalenciaScreen
        eyebrow="Balencia"
        title="Create your account with Cia"
        subtitle="Cia connects your life once there's enough history."
        withTabPadding={false}>
        {toast ? (
          <ToastBanner message={toast} tone="error" onDismiss={() => setToast(null)} />
        ) : null}

        <GlassPillInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          variant="email"
          placeholder="you@example.com"
        />
        <View>
          <GlassPillInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            variant="password"
          />
          <PasswordRequirementList password={password} />
        </View>
        <View style={styles.row}>
          <View style={styles.flex1}>
            <GlassPillInput
              label="First name"
              value={firstName}
              onChangeText={setFirstName}
              variant="text"
            />
          </View>
          <View style={styles.flex1}>
            <GlassPillInput
              label="Last name"
              value={lastName}
              onChangeText={setLastName}
              variant="text"
            />
          </View>
        </View>
        <GlassPillInput
          label="Date of birth"
          value={dateOfBirth}
          onChangeText={(text) => setDateOfBirth(formatDobInput(text))}
          variant="text"
          placeholder="YYYY-MM-DD"
        />

        <View style={styles.formGroup}>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.genderRow}>
            {GENDER_OPTIONS.map((option) => {
              const selected = gender === option.value;
              return (
                <Pressable
                  key={option.value}
                  onPress={() => setGender(option.value)}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: selected }}
                  accessibilityLabel={option.label}
                  style={[
                    styles.pill,
                    selected && styles.pillSelected,
                  ]}>
                  <Text style={[styles.pillText, selected && styles.pillTextSelected]}>
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <BalenciaButton
          disabled={!isFormValid || isSubmitting}
          onPress={handleSubmit}
          accessibilityLabel="Create account">
          {isSubmitting ? 'Creating account' : 'Create account'}
        </BalenciaButton>

        <Pressable
          onPress={() => router.push('/(auth)/sign-in' as Href)}
          accessibilityRole="link"
          style={styles.linkContainer}>
          <Text style={styles.linkText}>
            Already have an account? <Text style={styles.linkAccent}>Sign in</Text>
          </Text>
        </Pressable>

        <Text style={styles.caption}>
          By creating an account, you agree to our Terms and Privacy Policy.
        </Text>
      </BalenciaScreen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: BalenciaColors.ink900 },
  formGroup: { gap: Spacing.two },
  row: { flexDirection: 'row', gap: Spacing.two },
  flex1: { flex: 1 },
  label: { color: BalenciaColors.paper70, fontSize: 13, fontWeight: '800' },
  genderRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  pill: {
    minHeight: TouchTarget,
    minWidth: TouchTarget,
    paddingHorizontal: Spacing.three,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: BalenciaColors.hairlineStrong,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillSelected: {
    borderColor: BalenciaColors.orange,
    backgroundColor: BalenciaColors.orangeSoft,
  },
  pillText: {
    color: BalenciaColors.paper70,
    fontSize: 14,
    fontWeight: '600',
  },
  pillTextSelected: {
    color: BalenciaColors.paper100,
  },
  linkContainer: {
    paddingVertical: Spacing.two,
    alignItems: 'center',
  },
  linkText: {
    color: BalenciaColors.paper70,
    fontSize: 14,
  },
  linkAccent: {
    color: BalenciaColors.orange,
    fontWeight: '700',
  },
  caption: {
    color: BalenciaColors.paper55,
    fontSize: 12,
    textAlign: 'center',
  },
});
```

**This screen already has** the "Already have an account? Sign in" link (`Pressable` +
`styles.linkContainer`/`linkText`/`linkAccent`) — per the task brief, do not add a second one. Reuse
the existing `toast`/`setToast` state for social-auth errors too (see Contract) instead of adding a
second `ToastBanner`.

### `src/services/auth/social.ts` (FULL current file, MP3-landed — DO NOT MODIFY)

```ts
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useMemo } from 'react';

import { socialAuth } from '@/services/api/auth';
import type { SocialAuthResponse } from '@/services/api/dto/auth';
import { Env } from '@/config/env';

WebBrowser.maybeCompleteAuthSession();

export type SocialSignInResult =
  | { kind: 'success'; response: SocialAuthResponse }
  | { kind: 'unavailable'; reason: string }
  | { kind: 'cancelled' }
  | { kind: 'error'; message: string };

export async function appleSignIn(): Promise<SocialSignInResult> {
  try {
    const available = await AppleAuthentication.isAvailableAsync();
    if (!available) {
      return { kind: 'unavailable', reason: 'apple-auth-unavailable' };
    }

    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });

    if (credential.identityToken === null) {
      return { kind: 'error', message: 'Apple did not return an identity token.' };
    }

    const apiResponse = await socialAuth({
      provider: 'apple',
      email: credential.email ?? '',
      idToken: credential.identityToken,
      firstName: credential.fullName?.givenName ?? undefined,
      lastName: credential.fullName?.familyName ?? undefined,
      providerId: credential.user,
    });

    return { kind: 'success', response: apiResponse };
  } catch (error) {
    if ((error as { code?: string })?.code === 'ERR_REQUEST_CANCELED') {
      return { kind: 'cancelled' };
    }
    const message = error instanceof Error ? error.message : 'Apple sign-in failed.';
    return { kind: 'error', message };
  }
}

export type UseGoogleSignInResult = {
  available: boolean;
  reason?: string;
  signIn(): Promise<SocialSignInResult>;
};

export function useGoogleSignIn(): UseGoogleSignInResult {
  const [request, , promptAsync] = Google.useIdTokenAuthRequest({
    iosClientId: Env.googleIosClientId,
    webClientId: Env.googleWebClientId,
  });

  return useMemo<UseGoogleSignInResult>(() => {
    if (!request || !Env.googleIosClientId || !Env.googleWebClientId) {
      return {
        available: false,
        reason: 'google-client-id-missing',
        signIn: async () => ({ kind: 'unavailable', reason: 'google-client-id-missing' }),
      };
    }

    return {
      available: true,
      signIn: async (): Promise<SocialSignInResult> => {
        try {
          const result = await promptAsync();

          if (result.type === 'success') {
            const idToken = result.params?.id_token;
            if (!idToken) {
              return { kind: 'error', message: 'Google did not return an identity token.' };
            }
            const apiResponse = await socialAuth({ provider: 'google', email: '', idToken });
            return { kind: 'success', response: apiResponse };
          }

          if (result.type === 'cancel' || result.type === 'dismiss') {
            return { kind: 'cancelled' };
          }

          return { kind: 'error', message: 'Google sign-in failed.' };
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Google sign-in failed.';
          return { kind: 'error', message };
        }
      },
    };
  }, [request, promptAsync]);
}
```

**Note:** `appleSignIn()` already internally gates on `isAvailableAsync()` and returns
`{kind:'unavailable', reason:'apple-auth-unavailable'}` if the device/simulator has no signed-in
Apple ID or is running inside Expo Go with no entitlement. This packet's screens ALSO run their own
`isAvailableAsync()` check in a mount effect (see Contract) — that duplication is intentional: the
service-level check gates the actual sign-in attempt defensively; the screen-level check drives
**up-front rendering** of the gated button state (canon requires the button to visibly read as
gated before the user ever taps it, not only after a failed attempt).

### `src/components/balencia/auth-inputs.tsx` — exports used by this packet (MP4-landed, DO NOT MODIFY)

Full file was read and verified live (877 lines). The exact exported members this packet uses:

```ts
export function useReducedMotion(): boolean; // not used directly by this packet, listed for completeness

export type GlassPillInputVariant = 'text' | 'email' | 'password';
export type GlassPillInputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  variant?: GlassPillInputVariant;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  returnKeyType?: 'done' | 'next' | 'go' | 'send';
  onSubmitEditing?: () => void;
  testID?: string;
};
export function GlassPillInput(props: GlassPillInputProps): JSX.Element;

export type ToastBannerTone = 'error' | 'info';
export type ToastBannerProps = {
  message?: string | null;
  tone?: ToastBannerTone;
  onDismiss?: () => void;
  testID?: string;
};
export function ToastBanner(props: ToastBannerProps): JSX.Element | null;

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
```

`SocialAuthButton`'s exact interactivity rule (from the live implementation, for reference — do not
reimplement this, just know how it behaves): `isInteractive = !gated && !disabled`; `onPress` is
only wired when `isInteractive` is true (the component itself no-ops a tap when `gated` or
`disabled`, so callers do not need to guard `onPress` a second time). The button renders full-width
(`minHeight: 48, width: '100%'`) with an icon badge + `Continue with {label}` text — both providers
use the exact same component/styles, which is what gives them **equal visual weight** (canon §8: "no
social login ranked above another"). When `gated && gatedCaption`, a small caption line renders below
the button (`styles.socialGatedCaption`) — this is where `'available in the next build'` must be
passed.

`accessibilityLabel` is computed internally as `` `continue with ${providerInfo.label}` `` — do not
pass a separate `accessibilityLabel` prop (there isn't one in `SocialAuthButtonProps`).

### `src/components/balencia/index.ts` (FULL file — DO NOT MODIFY)

```ts
export * from './button';
export * from './card';
export * from './charts';
export * from './chips';
export * from './screen';
export * from './states';
export * from './auth-inputs';
```

So `SocialAuthButton`, `ToastBanner`, `GlassPillInput`, `BalenciaButton`, `BalenciaScreen`,
`ErrorState`, `GlassCard`, `CardTitle`, `CardBody` are all importable from the single barrel
`@/components/balencia` — exactly as `sign-in-screen.tsx` and `sign-up-screen.tsx` already do.

### `src/components/balencia/button.tsx` (FULL file — DO NOT MODIFY)

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

Default `tone="primary"` is the canon "one BtnPrimary per composition" orange fill — used for both
sign-in/sign-up's existing submit button (untouched) and the new complete-profile "Continue" button.

### `src/components/balencia/states.tsx` — `ErrorState` export used by this packet (excerpt, DO NOT MODIFY)

```tsx
export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  // renders a bordered card: "Needs attention" title + `message` body, optional "Try again" button.
}
```

Only used by `sign-in-screen.tsx`'s existing (untouched) `{error ? <ErrorState message={error} /> :
null}` and `{status === 'expired' ? <ErrorState .../> : null}` blocks — not used by this packet's new
code (social errors use `ToastBanner`, per the task Contract).

### `src/constants/theme.ts` (FULL file — DO NOT MODIFY)

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

### `src/services/api/dto/auth.ts` (FULL file, MP2-landed — DO NOT MODIFY)

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

### `src/services/api/auth.ts` (FULL file, MP2-landed — DO NOT MODIFY)

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

`completeProfile` is NOT `skipAuth` — it's called under the authenticated session (bearer token /
cookie already present from social sign-in's `adoptSession`), exactly like `submitConsent`.

### `src/services/api/errors.ts` (FULL file — DO NOT MODIFY)

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

### `src/services/auth/next-step.ts` (FULL file — DO NOT MODIFY)

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

`resolveNextStep` already returns `Href` — callers do not need to re-cast its return value with `as
Href`.

### `src/services/auth/session-provider.tsx` (FULL file, MP1-landed — DO NOT MODIFY)

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
  // ... reducer wiring, boot/hydrate effect, signIn, signOut, refreshUser (unchanged, not
  // reproduced here — none of it is touched or re-implemented by this packet) ...

  // Seed a session from an already-issued token pair (verify-registration, social
  // sign-in) — no second login round-trip. Dispatches SIGN_IN_SUCCESS directly;
  // the reducer accepts it from any state (see session-machine.ts).
  const adoptSession = useCallback(async (tokens: AuthTokensDto, user: PublicUserProfileDto) => {
    await saveSession({ user, tokens });
    dispatch({ type: 'SIGN_IN_SUCCESS', user });
    onSignedInRef.current?.();
  }, []);

  // ... signOut, client hook registration ...

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

(Full unabridged file was read this session; the elided middle section — `boot()` hydrate effect,
`signIn`, `signOut`, the P1 client-hook `useEffect` — is unchanged, not touched by this packet, and
not needed to implement MP7's contract. The **exact signature** this packet consumes is
`adoptSession(tokens: AuthTokensDto, user: PublicUserProfileDto): Promise<void>`, obtained via
`const { adoptSession } = useSession();` — same pattern already used by `verify-screen.tsx`.)

### `src/services/auth/session-machine.ts` (FULL file — DO NOT MODIFY)

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

// ... SessionEvent union, initialSessionState, sessionReducer — unchanged, not reproduced here ...
```

`adoptSession` dispatches `SIGN_IN_SUCCESS`, which the reducer handles **unconditionally** (comment
in the live reducer: "adoptSession (verify-registration / social sign-in) dispatches this directly
from 'unauthenticated' without a prior SIGN_IN_START") and always sets `status: 'authenticated'`. So
immediately after `await adoptSession(...)` resolves, `useSession().status === 'authenticated'` is
guaranteed on the next render — this is why `complete-profile-screen.tsx`'s `Redirect` guard (below)
is safe: a user who just came from a successful social sign-in with `needsProfileCompletion: true`
will pass the guard.

### `src/features/auth/consent-screen.tsx` (FULL file — style precedent for the `Redirect` guard, DO NOT MODIFY)

```tsx
import { useState, type JSX } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import { Redirect, useRouter, type Href } from 'expo-router';

import { BalenciaButton, BalenciaScreen, ConsentCheckbox, ToastBanner } from '@/components/balencia';
import { BalenciaColors, Spacing } from '@/constants/theme';
import { submitConsent } from '@/services/api/auth';
import { ApiError } from '@/services/api/errors';
import { useSession } from '@/services/auth/session-provider';
import { resolveNextStep } from '@/services/auth/next-step';

export function ConsentScreen(): JSX.Element {
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

  const requiredCount = Number(termsAccepted) + Number(privacyAccepted);
  const isGateReady = requiredCount === 2;

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

  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', default: undefined })} style={styles.flex}>
      <BalenciaScreen
        eyebrow="Balencia"
        title="Before we begin"
        subtitle="Review and accept our policies to continue."
        withTabPadding={false}>
        {toast ? (
          <ToastBanner message={toast} tone="error" onDismiss={() => setToast(null)} />
        ) : null}
        {/* ...checkboxes, status text, BalenciaButton — unchanged, not this packet's concern... */}
      </BalenciaScreen>
    </KeyboardAvoidingView>
  );
}
```

**This is the exact guard pattern `complete-profile-screen.tsx` must copy**: all `useState` hooks
run first (React rules of hooks — never call hooks conditionally), THEN `if (status !== 'authenticated')
return <Redirect href="/(auth)/sign-in" />;`, THEN the rest of the function body/JSX.

### `src/features/auth/forgot-password-screen.tsx` / `reset-password-screen.tsx` — lint-safe `Animated.Value` precedent (excerpt, DO NOT MODIFY)

Both screens construct an `Animated.Value` for their success-check-mark scale animation using the
**lazy `useState` initializer form**, never `useRef(new Animated.Value(...)).current`:

```tsx
// forgot-password-screen.tsx and reset-password-screen.tsx — identical pattern in both:
const [checkScale] = useState(() => new Animated.Value(0.5));

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
```

`auth-inputs.tsx`'s `ToastBanner` and `PasswordRequirementList`'s internal row component use the
identical form: `const [opacity] = useState(() => new Animated.Value(0));` /
`const [fadeAnim] = useState(() => new Animated.Value(met ? 1 : 0));`. **This packet does not add any
new `Animated.Value` usage** (no animated element is in scope for the social buttons or the
complete-profile screen), but this pattern is embedded because the "Lint rules" subsection under
Contract requires it verbatim as the binding precedent for any future `Animated` code in this file
family — do not introduce `useRef(new Animated.Value(...)).current` anywhere in this codebase.

---

## Contract

### 1. `sign-in-screen.tsx` — required changes (surgical diff, not a rewrite)

Keep every existing line (imports, `handleSignIn`, the `GlassCard`/`ErrorState`/form/`BalenciaButton`
JSX, all existing `styles` keys) **byte-for-byte**. Add:

**New imports** (merge into the existing import statements, do not duplicate):
```tsx
import { useEffect, useState } from 'react'; // was: import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'; // add Pressable
import { useRouter, type Href } from 'expo-router'; // was: import { useRouter } from 'expo-router';
import * as AppleAuthentication from 'expo-apple-authentication';

import {
  BalenciaButton,
  BalenciaScreen,
  CardBody,
  CardTitle,
  ErrorState,
  GlassCard,
  SocialAuthButton,
  ToastBanner,
} from '@/components/balencia'; // add SocialAuthButton, ToastBanner
import { BalenciaColors, Radius, Spacing, TouchTarget } from '@/constants/theme';
import { useSession } from '@/services/auth/session-provider';
import { useOnboardingStatus } from '@/hooks/use-onboarding-status';
import { appleSignIn, useGoogleSignIn, type SocialSignInResult } from '@/services/auth/social';
import { resolveNextStep } from '@/services/auth/next-step';
```

**New state + effect + handlers** (add inside `SignInScreen`, above the existing `handleSignIn`):
```tsx
export function SignInScreen() {
  const router = useRouter();
  const { status, signIn, adoptSession } = useSession(); // add adoptSession
  const { data: onboardingStatus } = useOnboardingStatus();
  const googleSignIn = useGoogleSignIn();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const isAuthenticating = status === 'authenticating';

  const [appleAvailable, setAppleAvailable] = useState<boolean | null>(null);
  const [socialError, setSocialError] = useState<string | null>(null);
  const [isSocialSubmitting, setIsSocialSubmitting] = useState(false);

  useEffect(() => {
    let mounted = true;
    AppleAuthentication.isAvailableAsync().then((available) => {
      if (mounted) {
        setAppleAvailable(available);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  async function handleSignIn() {
    // ...UNCHANGED, existing body...
  }

  async function handleSocialResult(result: SocialSignInResult) {
    if (result.kind === 'success') {
      await adoptSession(result.response.tokens, result.response.user);
      if (result.response.needsProfileCompletion) {
        router.replace('/(auth)/complete-profile' as Href);
      } else {
        router.replace(resolveNextStep(result.response.nextStep ?? 'assessment'));
      }
      return;
    }
    if (result.kind === 'error') {
      setSocialError(result.message);
    }
    // 'cancelled' and 'unavailable' are silent: 'unavailable' is already reflected by the
    // button's gated state (never reachable in practice once appleAvailable/googleSignIn.available
    // has resolved, since the button is non-interactive in that state); 'cancelled' is a
    // deliberate user dismissal of the native sheet, not an error worth surfacing.
  }

  async function handleAppleSignIn() {
    if (isSocialSubmitting) return;
    setSocialError(null);
    setIsSocialSubmitting(true);
    try {
      const result = await appleSignIn();
      await handleSocialResult(result);
    } finally {
      setIsSocialSubmitting(false);
    }
  }

  async function handleGoogleSignIn() {
    if (isSocialSubmitting) return;
    setSocialError(null);
    setIsSocialSubmitting(true);
    try {
      const result = await googleSignIn.signIn();
      await handleSocialResult(result);
    } finally {
      setIsSocialSubmitting(false);
    }
  }

  // P11: The "pilot mode" bypass button was removed because authentication is now real.
  // All users must authenticate against the backend to access the app.

  return (
    // ...
  );
}
```

**New JSX** — insert `{socialError ? <ToastBanner .../> : null}` as the FIRST child of
`<BalenciaScreen>` (before `<GlassCard tone="purple">`), and insert the divider + social row +
sign-up link AFTER the existing `<BalenciaButton>` (the last element currently in the tree), still
inside `<BalenciaScreen>`:

```tsx
<BalenciaScreen
  eyebrow="Balencia iOS pilot"
  title="Your life system, rebuilt for native iPhone."
  subtitle="Sign in against the existing yhealth backend or enter the pilot in flagged demo mode while contracts are verified."
  withTabPadding={false}>
  {socialError ? (
    <ToastBanner message={socialError} tone="error" onDismiss={() => setSocialError(null)} />
  ) : null}

  <GlassCard tone="purple">
    {/* ...UNCHANGED... */}
  </GlassCard>

  {/* ...UNCHANGED: expired ErrorState, error ErrorState, form View, BalenciaButton... */}

  <View style={styles.dividerRow}>
    <View style={styles.dividerLine} />
    <Text style={styles.dividerText}>or continue with</Text>
    <View style={styles.dividerLine} />
  </View>

  <View style={styles.socialColumn}>
    <SocialAuthButton
      provider="google"
      disabled={isSocialSubmitting}
      gated={!googleSignIn.available}
      gatedCaption={!googleSignIn.available ? 'available in the next build' : undefined}
      onPress={handleGoogleSignIn}
      testID="sign-in-google-button"
    />
    <SocialAuthButton
      provider="apple"
      disabled={isSocialSubmitting}
      gated={appleAvailable !== true}
      gatedCaption={appleAvailable !== true ? 'available in the next build' : undefined}
      onPress={handleAppleSignIn}
      testID="sign-in-apple-button"
    />
  </View>

  <Pressable
    onPress={() => router.push('/(auth)/sign-up' as Href)}
    accessibilityRole="link"
    style={styles.linkContainer}>
    <Text style={styles.linkText}>
      Don&apos;t have an account? <Text style={styles.linkAccent}>Sign up</Text>
    </Text>
  </Pressable>
</BalenciaScreen>
```

**New style keys** — append to the existing `styles = StyleSheet.create({...})` object (keep every
existing key — `flex`, `form`, `label`, `input` — unchanged):
```tsx
dividerRow: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: Spacing.two,
},
dividerLine: {
  flex: 1,
  height: StyleSheet.hairlineWidth,
  backgroundColor: BalenciaColors.hairlineStrong,
},
dividerText: {
  color: BalenciaColors.paper55,
  fontSize: 12,
  fontWeight: '600',
},
socialColumn: {
  gap: Spacing.two,
},
linkContainer: {
  paddingVertical: Spacing.two,
  alignItems: 'center',
},
linkText: {
  color: BalenciaColors.paper70,
  fontSize: 14,
},
linkAccent: {
  color: BalenciaColors.orange,
  fontWeight: '700',
},
```

`appleAvailable !== true` (rather than `appleAvailable === false`) is deliberate: while the check is
still in flight (`appleAvailable === null`), the button renders gated too — never show an
interactive-looking button before the availability check has actually resolved (canon honesty: no
state may claim capability it hasn't proven).

### 2. `sign-up-screen.tsx` — required changes (surgical diff, not a rewrite)

Keep every existing line byte-for-byte (imports, all four helper functions, `GENDER_OPTIONS`,
`handleSubmit`, the existing form JSX, the existing "Already have an account? Sign in" `Pressable`,
the compliance `caption` `Text`, all existing `styles` keys). Add:

**New imports** (merge into the existing import statements):
```tsx
import { useEffect, useState, type JSX } from 'react'; // was: import { useState, type JSX } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from 'react-native'; // unchanged (Pressable already imported)
import { useRouter, type Href } from 'expo-router'; // unchanged (already imported)
import * as AppleAuthentication from 'expo-apple-authentication';

import {
  BalenciaButton,
  BalenciaScreen,
  GlassPillInput,
  PasswordRequirementList,
  SocialAuthButton,
  ToastBanner,
} from '@/components/balencia'; // add SocialAuthButton (ToastBanner already imported)
import { BalenciaColors, Spacing, TouchTarget } from '@/constants/theme';
import { register } from '@/services/api/auth';
import { ApiError } from '@/services/api/errors';
import type { Gender } from '@/services/api/dto/auth';
import { useRegistrationFlow } from '@/features/auth/registration-flow';
import { useSession } from '@/services/auth/session-provider';
import { appleSignIn, useGoogleSignIn, type SocialSignInResult } from '@/services/auth/social';
import { resolveNextStep } from '@/services/auth/next-step';
```

**New state + effect + handlers** (add inside `SignUpScreen`, above the existing `isFormValid`):
```tsx
export function SignUpScreen(): JSX.Element {
  const router = useRouter();
  const { dispatch } = useRegistrationFlow();
  const { adoptSession } = useSession();
  const googleSignIn = useGoogleSignIn();

  const [email, setEmail] = useState('');
  // ...UNCHANGED: password, firstName, lastName, dateOfBirth, gender, toast, isSubmitting...

  const [appleAvailable, setAppleAvailable] = useState<boolean | null>(null);
  const [isSocialSubmitting, setIsSocialSubmitting] = useState(false);

  useEffect(() => {
    let mounted = true;
    AppleAuthentication.isAvailableAsync().then((available) => {
      if (mounted) {
        setAppleAvailable(available);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const isFormValid = /* ...UNCHANGED... */;

  async function handleSubmit() {
    // ...UNCHANGED, existing body...
  }

  async function handleSocialResult(result: SocialSignInResult) {
    if (result.kind === 'success') {
      await adoptSession(result.response.tokens, result.response.user);
      if (result.response.needsProfileCompletion) {
        router.replace('/(auth)/complete-profile' as Href);
      } else {
        router.replace(resolveNextStep(result.response.nextStep ?? 'assessment'));
      }
      return;
    }
    if (result.kind === 'error') {
      setToast(result.message);
    }
    // 'cancelled' and 'unavailable' are silent — see sign-in-screen.tsx for rationale
    // (identical pattern, deliberately duplicated per this codebase's screen-local-logic
    // convention rather than factored into a shared hook this packet was not asked to add).
  }

  async function handleAppleSignIn() {
    if (isSocialSubmitting) return;
    setToast(null);
    setIsSocialSubmitting(true);
    try {
      const result = await appleSignIn();
      await handleSocialResult(result);
    } finally {
      setIsSocialSubmitting(false);
    }
  }

  async function handleGoogleSignIn() {
    if (isSocialSubmitting) return;
    setToast(null);
    setIsSocialSubmitting(true);
    try {
      const result = await googleSignIn.signIn();
      await handleSocialResult(result);
    } finally {
      setIsSocialSubmitting(false);
    }
  }

  return (
    // ...
  );
}
```

Reuses the screen's EXISTING `toast`/`setToast` state for social errors — do not add a second
`ToastBanner`/error state. `setToast(null)` at the top of each social handler clears any stale
registration-form toast the same way `handleSubmit` already does.

**New JSX** — insert the divider + social row BETWEEN the existing `<BalenciaButton>` ("Create
account") and the existing "Already have an account? Sign in" `<Pressable>` — this matches the hi-fi
S03 spec order (CTA → divider → social → ghost links, see "Design spec" below):

```tsx
<BalenciaButton
  disabled={!isFormValid || isSubmitting}
  onPress={handleSubmit}
  accessibilityLabel="Create account">
  {isSubmitting ? 'Creating account' : 'Create account'}
</BalenciaButton>

<View style={styles.dividerRow}>
  <View style={styles.dividerLine} />
  <Text style={styles.dividerText}>or continue with</Text>
  <View style={styles.dividerLine} />
</View>

<View style={styles.socialColumn}>
  <SocialAuthButton
    provider="google"
    disabled={isSocialSubmitting}
    gated={!googleSignIn.available}
    gatedCaption={!googleSignIn.available ? 'available in the next build' : undefined}
    onPress={handleGoogleSignIn}
    testID="sign-up-google-button"
  />
  <SocialAuthButton
    provider="apple"
    disabled={isSocialSubmitting}
    gated={appleAvailable !== true}
    gatedCaption={appleAvailable !== true ? 'available in the next build' : undefined}
    onPress={handleAppleSignIn}
    testID="sign-up-apple-button"
  />
</View>

<Pressable
  onPress={() => router.push('/(auth)/sign-in' as Href)}
  accessibilityRole="link"
  style={styles.linkContainer}>
  <Text style={styles.linkText}>
    Already have an account? <Text style={styles.linkAccent}>Sign in</Text>
  </Text>
</Pressable>

<Text style={styles.caption}>
  By creating an account, you agree to our Terms and Privacy Policy.
</Text>
```

**New style keys** — append to the existing `styles = StyleSheet.create({...})` object (keep every
existing key unchanged):
```tsx
dividerRow: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: Spacing.two,
},
dividerLine: {
  flex: 1,
  height: StyleSheet.hairlineWidth,
  backgroundColor: BalenciaColors.hairlineStrong,
},
dividerText: {
  color: BalenciaColors.paper55,
  fontSize: 12,
  fontWeight: '600',
},
socialColumn: {
  gap: Spacing.two,
},
```

### 3. `complete-profile-screen.tsx` — full required contents (CREATE)

Named export `export function CompleteProfileScreen(): JSX.Element` — no props (route file wraps it
as the default export). Full reference implementation (adapt only where explicitly marked; this is
the intended shipped shape, not a rough sketch — it deliberately reuses the exact DOB-mask/gender-row
patterns from the embedded `sign-up-screen.tsx` above, per the task brief):

```tsx
import { useState, type JSX } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { Redirect, useRouter } from 'expo-router';

import { BalenciaButton, BalenciaScreen, GlassPillInput, ToastBanner } from '@/components/balencia';
import { BalenciaColors, Spacing, TouchTarget } from '@/constants/theme';
import { completeProfile } from '@/services/api/auth';
import { ApiError } from '@/services/api/errors';
import type { Gender } from '@/services/api/dto/auth';
import { useSession } from '@/services/auth/session-provider';
import { resolveNextStep } from '@/services/auth/next-step';

// DOB mask + validation and GENDER_OPTIONS are intentionally duplicated from
// sign-up-screen.tsx (neither is exported there) — mirrors the existing precedent in
// reset-password-screen.tsx, which duplicates PasswordRequirementList's internal rule set
// for the same reason. Keep in sync if either source ever changes its rules.
const DOB_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function formatDobInput(raw: string): string {
  const digitsOnly = raw.replace(/[^0-9]/g, '').slice(0, 8);
  let formatted = digitsOnly.slice(0, 4);
  if (digitsOnly.length > 4) formatted += `-${digitsOnly.slice(4, 6)}`;
  if (digitsOnly.length > 6) formatted += `-${digitsOnly.slice(6, 8)}`;
  return formatted;
}

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

const GENDER_OPTIONS: { value: Gender; label: string }[] = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'non_binary', label: 'Non-binary' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' },
];

export function CompleteProfileScreen(): JSX.Element {
  const router = useRouter();
  const { status, user } = useSession();

  const [firstName, setFirstName] = useState(user?.firstName ?? '');
  const [lastName, setLastName] = useState(user?.lastName ?? '');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState<Gender | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (status !== 'authenticated') {
    return <Redirect href="/(auth)/sign-in" />;
  }

  const isFormValid = isValidDob(dateOfBirth) && gender !== null;

  async function handleSubmit() {
    if (!isFormValid || isSubmitting) return;
    setToast(null);
    setIsSubmitting(true);
    try {
      const trimmedFirstName = firstName.trim();
      const trimmedLastName = lastName.trim();
      const data = await completeProfile({
        dateOfBirth,
        gender: gender as Gender,
        firstName: trimmedFirstName.length > 0 ? trimmedFirstName : undefined,
        lastName: trimmedLastName.length > 0 ? trimmedLastName : undefined,
      });
      router.replace(resolveNextStep(data.nextStep));
    } catch (submitError) {
      if (submitError instanceof ApiError) {
        setToast(submitError.message);
      } else {
        setToast('Something went wrong. Try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', default: undefined })} style={styles.flex}>
      <BalenciaScreen
        eyebrow="Balencia"
        title="A couple more details"
        subtitle="Cia needs your date of birth and gender to personalize your plan."
        withTabPadding={false}>
        {toast ? (
          <ToastBanner message={toast} tone="error" onDismiss={() => setToast(null)} />
        ) : null}

        <View style={styles.row}>
          <View style={styles.flex1}>
            <GlassPillInput
              label="First name"
              value={firstName}
              onChangeText={setFirstName}
              variant="text"
            />
          </View>
          <View style={styles.flex1}>
            <GlassPillInput
              label="Last name"
              value={lastName}
              onChangeText={setLastName}
              variant="text"
            />
          </View>
        </View>

        <GlassPillInput
          label="Date of birth"
          value={dateOfBirth}
          onChangeText={(text) => setDateOfBirth(formatDobInput(text))}
          variant="text"
          placeholder="YYYY-MM-DD"
        />

        <View style={styles.formGroup}>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.genderRow}>
            {GENDER_OPTIONS.map((option) => {
              const selected = gender === option.value;
              return (
                <Pressable
                  key={option.value}
                  onPress={() => setGender(option.value)}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: selected }}
                  accessibilityLabel={option.label}
                  style={[
                    styles.pill,
                    selected && styles.pillSelected,
                  ]}>
                  <Text style={[styles.pillText, selected && styles.pillTextSelected]}>
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <BalenciaButton
          disabled={!isFormValid || isSubmitting}
          onPress={handleSubmit}
          accessibilityLabel="Continue">
          {isSubmitting ? 'Saving' : 'Continue'}
        </BalenciaButton>
      </BalenciaScreen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: BalenciaColors.ink900 },
  formGroup: { gap: Spacing.two },
  row: { flexDirection: 'row', gap: Spacing.two },
  flex1: { flex: 1 },
  label: { color: BalenciaColors.paper70, fontSize: 13, fontWeight: '800' },
  genderRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  pill: {
    minHeight: TouchTarget,
    minWidth: TouchTarget,
    paddingHorizontal: Spacing.three,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: BalenciaColors.hairlineStrong,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillSelected: {
    borderColor: BalenciaColors.orange,
    backgroundColor: BalenciaColors.orangeSoft,
  },
  pillText: {
    color: BalenciaColors.paper70,
    fontSize: 14,
    fontWeight: '600',
  },
  pillTextSelected: {
    color: BalenciaColors.paper100,
  },
});
```

Notes:
- `useState(user?.firstName ?? '')` (a plain property read, not a constructor call) is fine as a
  non-lazy `useState` initializer — see "Lint rules" below for why this differs from the
  `Animated.Value` case.
- `dateOfBirth`/`gender` are deliberately NEVER prefilled from `user` — the whole reason this screen
  exists is that the server reported them missing (`needsProfileCompletion: true`); prefilling them
  from a `null` DTO field would be pointless and could mask a real gap.
- `resolveNextStep(data.nextStep)` needs no `as Href` — `data.nextStep` is the non-optional
  `NextStep` from `CompleteProfileResponse`, and `resolveNextStep` already returns `Href`.
- `firstName`/`lastName` are still user-editable (not read-only) — the task's "prefilled" instruction
  means the initial value only, matching how `sign-up-screen.tsx` itself never locks a field.

### 4. `src/app/(auth)/complete-profile.tsx` — full required contents (CREATE)

One-import/one-export route file, matching the existing pattern (`sign-in.tsx`, `sign-up.tsx`,
`consent.tsx` — all identically shaped, confirmed live):

```tsx
import { CompleteProfileScreen } from '@/features/auth/complete-profile-screen';

export default CompleteProfileScreen;
```

`src/app/(auth)/_layout.tsx`'s `<Stack />` has no `<Stack.Screen>` children — adding this file is
sufficient for Expo Router's file-based routing to register `/(auth)/complete-profile`; no
`_layout.tsx` edit is needed or permitted.

### Lint rules (binding — verbatim house patterns, verified live this session)

This codebase runs `eslint-config-expo` (flat config, `eslint.config.js`), which bundles
`eslint-plugin-react-hooks`'s React-Compiler-aligned rule set. Three rules are load-bearing for this
packet's new code and are non-negotiable — each is demonstrated by an already-landed file embedded
above:

1. **No render-time ref access.** Never read or write a `ref.current` value during the render body
   (the function's synchronous top-level execution that produces JSX) — only inside `useEffect`
   bodies, event handlers, or other callbacks. `session-provider.tsx`'s `onSignedInRef.current` /
   `onAuthClearedRef.current` are the live example: both are only ever touched inside a `useEffect`
   (to keep them current) or inside a callback (`onSignedInRef.current?.()` inside `adoptSession`) —
   never read inline during JSX construction. This packet introduces no new `useRef` at all (its
   mount-effect state uses `useState`, not `useRef` — see rule 2), so this rule is inherited context
   for the reviewer, not directly exercised by new code, but must not be violated if the
   implementation is adapted.

2. **`Animated.Value` must be constructed via the lazy `useState` initializer form —
   `useState(() => new Animated.Value(...))` — never `useRef(new Animated.Value(...)).current` and
   never a bare `new Animated.Value(...)` expression evaluated inline in the render body.** The
   `useRef(expr).current` form evaluates `expr` (the `new Animated.Value(...)` call) on **every**
   render even though React discards all but the first — that repeated construction of a new object
   during render is exactly what the purity-focused hooks rules flag. The function form passed to
   `useState` is guaranteed to run exactly once, on mount. Verbatim precedent (embedded above,
   `forgot-password-screen.tsx` / `reset-password-screen.tsx`): `const [checkScale] = useState(() =>
   new Animated.Value(0.5));`. `auth-inputs.tsx` follows the identical pattern for `ToastBanner`
   (`const [opacity] = useState(() => new Animated.Value(0));`) and
   `PasswordRequirementList`'s row component (`const [fadeAnim] = useState(() => new
   Animated.Value(met ? 1 : 0));`). **This packet adds no `Animated` code**, so this rule has no
   direct application surface here — it is embedded as the binding precedent in case the
   implementation is adapted to add any motion (it must not deviate from this form if so). A plain
   `useState(someExpression)` initializer where `someExpression` is a cheap, deterministic property
   read (e.g. this packet's own `useState(user?.firstName ?? '')`) is NOT the same hazard and does
   NOT need the lazy-function form — only expensive/impure constructors (`new Animated.Value(...)`,
   `Date.now()`, etc.) require it.

3. **No `Date.now()` (or any other non-deterministic/impure call) inside a component's render
   body.** Only call it inside event handlers, effects, or callback bodies — never inline while
   computing JSX or a `useState` initializer argument. This packet has no `Date.now()` usage (no
   cooldown timers are in scope), but the binding precedent is `sign-up-screen.tsx`'s own existing
   (unchanged) `handleSubmit`: `cooldownEndsAt: Date.now() + 60000` is called inside the async
   handler function, never inline in the JSX tree or as a bare top-level render-body statement.

**Corollary for this packet's actual new code** (the `AppleAuthentication.isAvailableAsync()` mount
effect): setting state from an **async continuation** (`.then((available) => setAppleAvailable(...))`)
is NOT the same as setting state synchronously inside the effect's own execution — it does not
trigger `react-hooks/set-state-in-effect`. Compare with the one place in this codebase that DOES need
an explicit lint escape hatch — `auth-inputs.tsx`'s `ChargeMeter`:
```tsx
useEffect(() => {
  if (deadline === undefined || deadline === null) {
    completedRef.current = false;
    return;
  }
  completedRef.current = false;
  // Deliberate sync setState: re-anchor the timer's "now" the moment a new
  // deadline arrives, before the first interval tick — a stale `now` would
  // render a wrong remaining-time for up to 1s (dishonest countdown).
  // eslint-disable-next-line react-hooks/set-state-in-effect
  setNow(Date.now());
  // ...
}, [deadline]);
```
`ChargeMeter` needs the disable comment because `setNow(Date.now())` runs **synchronously inside the
effect body itself**, in the same tick. This packet's mount effect is structurally different — the
`setAppleAvailable` call is inside a Promise `.then()` callback, which always runs in a later
microtask, never synchronously during the effect's own execution — so **no `eslint-disable` comment
is needed or permitted** for the `isAvailableAsync().then(...)` pattern used in both modified
screens. If a worker's draft adds an `eslint-disable-next-line react-hooks/set-state-in-effect` (or
any other disable comment) anywhere in this packet's diff, that is a defect — remove it and fix the
underlying code instead, per this codebase's `// reason:` comment convention for any unavoidable
`@ts-ignore`/lint suppression (`yhealth-app/CLAUDE.md` §1) — none is warranted here.

---

## Design spec

Source: `plans/batches/BIOS-003-auth-hardening/evidence/scope-hifi-auth.md` (embedded verbatim
below, the sections load-bearing for this packet).

### S03 — Welcome Sign-Up (relevant excerpt)

> **Layout:** Compact form: Balencia wordmark (quiet top) → Display 34 title "Create your account
> with *CIA*" (Tiempos italic on CIA) → compact future-tense caption → email/password fields →
> MomentumBar + ChipProvenance → BtnPrimary "Sign up" → divider "or continue with" → Google/Apple
> social buttons → BtnGhost links ("Sign in" + "Guest").
>
> **Components:** `GlassPillInput` (email, password with eye toggle), `MomentumBar` (password
> strength, cumulative), `ChipProvenance` ("typed live"), `BtnPrimary`, `BtnSecondary`
> (Google/Apple), `BtnGhost`, NEW `ComplianceFooter` (terms/privacy links), NEW `ToastBanner`
> (non-field errors), NEW `ConnectsPreviewRow` (four domain tags + connecting dots, future-tense
> caption).

*(Note: `MomentumBar`/`ChipProvenance`/`ConnectsPreviewRow` are not in this packet's scope — the
already-landed `sign-up-screen.tsx` uses `PasswordRequirementList` instead of `MomentumBar` for
password strength, an earlier packet's honest adaptation; this packet does not touch that. Only the
"divider → Google/Apple social buttons" region is this packet's job.)*

### S04 — Sign In (relevant excerpt)

> **Layout:** TopBar (back chevron, transparent) → [OfflineBanner if offline] → Balencia wordmark →
> "Welcome back. Let's pick up your *momentum*." (Display 30) → email field → password field →
> "Remember me" toggle + "Forgot password?" ghost link → BtnPrimary "Sign in" → divider "or continue
> with" → Google/Apple social pills (56px each, equal weight) → [biometric icon 56px circle
> glass-pill if enrolled] → footer "support and safety resources" (quiet link, opens full
> SafetyResourceCard Sheet) → "Don't have an account? Sign up".
>
> **Components:** ... `BtnSecondary` (Google/Apple icon+label rounded pills, 44–48px height) ...

*(Note: "Remember me" toggle, biometric icon, and the "support and safety resources" footer are NOT
in this packet's scope — the currently-landed `sign-in-screen.tsx` has none of that infrastructure
yet, and adding it is a different packet's job, not implied by this task's brief. This packet
delivers exactly the divider + social-buttons region + the "Don't have an account? Sign up" link,
matching the spec's own ordering: CTA → divider → social → account-switch link.)*

### Social Authentication Rules (CANON §8, verbatim)

> Google/Apple buttons render as `.glass-pill` rounded pills with icon + label, 44–48px height,
> **equal visual weight** — neither ranked, no preselection.
> No social login ranked above another. Divider: hairline + "or continue with" copy (never a visual
> event).
> Optional: biometric enrollment post-success in a Sheet, with accept/decline parity.

`SocialAuthButton` (embedded above) already satisfies "equal visual weight" structurally — both
`provider="google"` and `provider="apple"` render through the exact same component/style, so this
packet cannot introduce an imbalance by construction; it only needs to render both, side by side (in
this case stacked, since the component is `width: '100%'`), with identical props shape.

### Button Hierarchy (COMPONENT-CATALOG.md §2, via canon excerpt, verbatim)

> **BtnSecondary**: `.glass-pill` bg, paper-100 label, 1px border `.10`. Social login use:
> Google/Apple rounded pills with icon + label, equal visual weight (neither ranked above other per
> canon 8).

The shipped `SocialAuthButton` IS this codebase's `BtnSecondary`-for-social-login implementation —
do not invent a separate `BtnSecondary` component; none exists in the kit (confirmed: `grep` of
`components/balencia/*.tsx` — no `BtnSecondary` export anywhere).

### Typography (CANON §5, relevant line)

> **Sentence case everywhere.** No exclamation marks.

`"or continue with"` and `"available in the next build"` are already sentence case, no punctuation —
do not capitalize or add emphasis.

### S03d — Complete Profile (verbatim from scope-hifi-auth.md — thin spec, honestly noted)

> **Layout:** Review-route only. Assumed: form to capture additional profile fields post-consent
> (name, avatar, etc.).
> **Components:** Per spec detail.
> **States:** Default, loading, success, error states per spec.

The hi-fi spec for S03d is explicitly thin ("review-route only... Assumed"). This packet fills that
gap with the **actual server contract** (`POST /auth/complete-profile
{dateOfBirth, gender, firstName?, lastName?}` → `{nextStep, user}`, scope-server-auth.md §1) rather
than inventing an avatar-upload flow the server does not support — matching this batch's established
honest-adaptation precedent (ADR-9's S05b OTP adaptation is the model to follow: implement to the
depth the real contract supports, and do not build UI for fields the server does not accept).
`firstName`/`lastName` fields are included because `CompleteProfileRequest` accepts them (optional,
for a social user who wants to correct the name Apple/Google supplied) — not because the thin spec
names them; this is traceable to the DTO, not invented.

### Complete-profile trigger — from ADR-10 / plan §6, verbatim

> `complete_profile`→S03d. Complete-profile (`POST /complete-profile {dateOfBirth,gender,...}`) for
> social users missing DOB/gender.
>
> | Route | Screen (hi-fi) | Server call(s) | Guard |
> |---|---|---|---|
> | `(auth)/complete-profile` | S03d | `POST /complete-profile` | requires session +
> `needsProfileCompletion` |

The "requires session" half of the guard is what `useSession()`/`Redirect` enforces (this packet).
The "+ `needsProfileCompletion`" half is enforced **upstream**, at the point of navigation: both
modified screens' `handleSocialResult` only `router.replace('/(auth)/complete-profile' as Href)`
when `result.response.needsProfileCompletion === true`; the screen itself does not re-check that
flag (there is nowhere else it could come from once already authenticated — the DTO's
`needsProfileCompletion` is only present on the `SocialAuthResponse`, not re-fetchable from `/me`),
so a directly-deep-linked visit still safely renders the same form (worst case: a user who already
has DOB/gender re-submits it, which the server accepts idempotently — not a security or data
concern).

---

## Acceptance criteria (mechanically checkable)

1. `npm run lint` (`expo lint`, flat config `eslint-config-expo`) passes with **zero** new issues on
   `sign-in-screen.tsx`, `sign-up-screen.tsx`, `complete-profile-screen.tsx`,
   `app/(auth)/complete-profile.tsx`. In particular: no `react-hooks/set-state-in-effect` violation
   (or disable comment) anywhere in this packet's diff, no unused imports, no shadowed variables.
2. `npm run typecheck` (`tsc --noEmit`) passes — no `any`, no `@ts-ignore` without a `// reason:`
   comment (house rule, `yhealth-app/CLAUDE.md` §1).
3. `npm run test` (Vitest) remains green — this packet adds no test file itself (MP9's scope) but
   must not break `client.401.test.ts`, `session-machine.test.ts`, or `dto.satisfies.test.ts`.
4. **Byte-for-byte preservation**: a diff of `sign-in-screen.tsx` and `sign-up-screen.tsx` against
   the "Embedded current source" versions above shows ONLY additive changes (new imports merged in,
   new state/effect/handlers inserted, new JSX blocks inserted, new style keys appended) — every
   existing line (in particular `handleSignIn`'s body, `handleSubmit`'s body, all existing JSX
   elements, all existing style values) is unchanged character-for-character.
5. **Equal visual weight**: both `SocialAuthButton` usages (Google, Apple) on both screens pass the
   identical prop shape (`disabled`, `gated`, `gatedCaption`, `onPress`, `testID`) through the same
   component with no provider-specific styling override anywhere in this packet's diff.
6. **No fake success**: `handleSocialResult` only calls `adoptSession` + navigates on
   `result.kind === 'success'`; `'cancelled'` and `'unavailable'` never call `adoptSession` or
   navigate; `'error'` only sets a toast message, never navigates.
7. **Apple gating is honest and up-front**: `appleAvailable` starts `null`, the button is `gated`
   whenever `appleAvailable !== true` (covers both the loading and the confirmed-unavailable case —
   never `false` during the loading window), and `AppleAuthentication.isAvailableAsync()` is called
   exactly once per screen mount (inside the `useEffect` with `[]` deps), not on every render and not
   inside the button's `onPress`.
8. **Google gating**: `SocialAuthButton` for `provider="google"` is `gated` exactly when
   `!googleSignIn.available` (no separate mount effect — `useGoogleSignIn()`'s `available` field is
   already synchronously computed).
9. `needsProfileCompletion` routing: on a `'success'` result with
   `result.response.needsProfileCompletion === true`, the screen navigates to
   `/(auth)/complete-profile` and does **not** consult `nextStep` at all (checked before the
   `resolveNextStep` branch, per the Contract's exact `if/else` shape).
10. `complete-profile-screen.tsx` calls all its `useState` hooks before the `if (status !==
    'authenticated') return <Redirect .../>` guard — no conditional hook call (static-readable: the
    guard `return` statement is textually after every `useState(...)` call and before any other
    hook).
11. Grep gate (ADR-11 item 2, no token/OTP/password in logs): `grep -rnE
    "console\.(log|warn|error|info)"` over the four touched/created files must return either nothing,
    or only lines whose interpolated values are drawn from `error.message`/hardcoded strings — never
    `identityToken`, `idToken`, `accessToken`, `refreshToken`, `credential`, or `result.response`.
    (Simplest compliant implementation: no `console.*` calls in any of the four files at all — this
    matches the Contract's reference implementations exactly.)
12. `package.json` is untouched by this packet's diff (both social-auth deps already installed by
    MP3 — verified above).
13. `src/app/(auth)/complete-profile.tsx` is a two-line file matching the existing route-file
    convention exactly (`import { X } from '@/features/auth/...'; export default X;`) — no
    additional logic in the route file itself.

## Out of scope

- Wiring a "Forgot password?" link into `sign-in-screen.tsx`. **Flag for the orchestrator**: MP6's
  packet (`packets/MP6.md`, already landed) explicitly deferred that wiring to "MP7's job", but this
  packet's actual task brief only specifies the "Don't have an account? Sign up" link — it does not
  mention "Forgot password?". This packet does NOT add it, to stay inside its authorized scope; a
  follow-up packet (or an amendment to this one) is needed to close that gap. Do not silently add it
  here without an explicit go-ahead — that would be scope creep beyond this packet's brief.
- "Remember me" toggle, biometric sign-in icon/Sheet, and the "support and safety resources" footer
  link on S04 — not requested by this packet's brief; the currently-landed `sign-in-screen.tsx` has
  no supporting infrastructure for any of them (no `rememberMe` state, no biometric enrollment
  service call, no `SafetyResourceCard`/`Sheet` component in the kit). A future packet's job.
- `MomentumBar`/`ChipProvenance`/`ConnectsPreviewRow`/`ComplianceFooter` from the S03 spec — the
  landed `sign-up-screen.tsx` already made its own honest adaptations (e.g.
  `PasswordRequirementList` instead of `MomentumBar`) in an earlier packet; this packet does not
  revisit those decisions.
- `verify.tsx`/`verify-screen.tsx`, `consent.tsx`/`consent-screen.tsx`, `whatsapp.tsx`/
  `whatsapp-screen.tsx`, `onboarding.tsx`, `forgot-password.tsx`/`forgot-password-screen.tsx`,
  `reset-password.tsx`/`reset-password-screen.tsx`, `registration-flow.tsx` — all out of scope,
  covered by MP5/MP6/MP8 (already landed) or not this batch's concern.
- Server-side Apple JWKS verification, `APPLE_CLIENT_IDS` env wiring, Google audience hardening — SP2/
  SP8 (server packets), already contracted and landed separately.
- Any change to `src/services/auth/social.ts` (MP3), `src/components/balencia/auth-inputs.tsx` (MP4),
  `src/services/api/auth.ts`/`dto/auth.ts` (MP2), `src/services/auth/session-provider.tsx`/
  `session-machine.ts` (MP1) — all already landed, imported from only.
- Unit tests for the social-button handlers or the complete-profile screen — MP9's scope explicitly
  lists "social service response mapping" and related mobile unit tests as its own deliverable; do
  not add a `*.test.ts` file in this packet.
- `package.json`/`app.json` edits of any kind — both social-auth deps and native config are already
  in place (MP3); do not touch either file.
- Android social sign-in — out of scope per `yhealth-app/AGENTS.md` (iOS Simulator/Expo Go is the
  batch's target).
- Avatar upload, phone number capture, or any other profile field beyond
  `dateOfBirth`/`gender`/`firstName`/`lastName` on the complete-profile screen — `CompleteProfileRequest`
  does not accept any other field; do not invent one.
