=== FILE: /Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/services/auth/next-step.ts ===
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
=== END FILE ===

=== FILE: /Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/features/auth/registration-flow.tsx ===
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
=== END FILE ===

=== FILE: /Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/features/auth/sign-up-screen.tsx ===
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter, type Href } from 'expo-router';
import type { JSX } from 'react';

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
=== END FILE ===

=== FILE: /Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/features/auth/verify-screen.tsx ===
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text } from 'react-native';
import { Redirect, useRouter, type Href } from 'expo-router';
import type { JSX } from 'react';

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

export function VerifyScreen(): JSX.Element {
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

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    setCanResend(state.resendCooldownEndsAt === null || Date.now() >= state.resendCooldownEndsAt);
  }, [state.resendCooldownEndsAt]);

  if (!state.activationToken) {
    return <Redirect href="/(auth)/sign-up" />;
  }

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

  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', default: undefined })} style={styles.flex}>
      <BalenciaScreen
        eyebrow="Balencia"
        title="Verify your email"
        withTabPadding={false}>
        <MaskedDestinationLine email={state.email} />

        {toast ? (
          <ToastBanner message={toast} tone="info" onDismiss={() => setToast(null)} />
        ) : null}

        <OTPCluster
          value={code}
          onChangeText={(text) => {
            setCode(text);
            if (error) setError(null);
          }}
          onComplete={handleComplete}
          disabled={isSubmitting}
          error={!!error}
        />

        {error ? (
          <Text accessibilityRole="alert" style={styles.errorText}>
            {error}
          </Text>
        ) : null}

        <ChargeMeter
          deadline={canResend ? null : state.resendCooldownEndsAt}
          onComplete={() => setCanResend(true)}
        />

        <BalenciaButton
          tone="quiet"
          disabled={!canResend || isResending}
          onPress={handleResend}
          accessibilityLabel="Resend code">
          {isResending ? 'Sending' : 'Resend code'}
        </BalenciaButton>
      </BalenciaScreen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: BalenciaColors.ink900 },
  errorText: {
    color: BalenciaColors.danger,
    fontSize: 13,
  },
});
=== END FILE ===

=== FILE: /Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/features/auth/consent-screen.tsx ===
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import { Redirect, useRouter, type Href } from 'expo-router';
import type { JSX } from 'react';

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

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Required</Text>
          <ConsentCheckbox
            checked={termsAccepted}
            onChange={setTermsAccepted}
            label="I agree to the Terms of Service"
            testID="consent-terms"
          />
          <ConsentCheckbox
            checked={privacyAccepted}
            onChange={setPrivacyAccepted}
            label="I agree to the Privacy Policy"
            testID="consent-privacy"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Optional</Text>
          <ConsentCheckbox
            checked={marketingOptIn}
            onChange={setMarketingOptIn}
            label="Send me tips and updates"
            testID="consent-marketing"
          />
        </View>

        <Text
          style={[
            styles.statusText,
            isGateReady ? styles.statusTextReady : null,
          ]}>
          {isGateReady ? '2 of 2 ready' : `${requiredCount} of 2 required`}
        </Text>

        <BalenciaButton
          disabled={!isGateReady || isSubmitting}
          onPress={handleSubmit}
          accessibilityLabel="Agree and continue">
          {isSubmitting ? 'Saving' : 'Agree and continue'}
        </BalenciaButton>
      </BalenciaScreen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: BalenciaColors.ink900 },
  section: {
    gap: Spacing.two,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    color: BalenciaColors.paper55,
  },
  statusText: {
    fontVariant: ['tabular-nums'],
    color: BalenciaColors.paper70,
    fontSize: 14,
  },
  statusTextReady: {
    color: BalenciaColors.green,
    fontWeight: '700',
  },
});
=== END FILE ===

=== FILE: /Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/app/(auth)/sign-up.tsx ===
import { SignUpScreen } from '@/features/auth/sign-up-screen';

export default SignUpScreen;
=== END FILE ===

=== FILE: /Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/app/(auth)/verify.tsx ===
import { VerifyScreen } from '@/features/auth/verify-screen';

export default VerifyScreen;
=== END FILE ===

=== FILE: /Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/app/(auth)/consent.tsx ===
import { ConsentScreen } from '@/features/auth/consent-screen';

export default ConsentScreen;
=== END FILE ===

=== FILE: /Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/app/(auth)/_layout.tsx ===
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
=== END FILE ===
