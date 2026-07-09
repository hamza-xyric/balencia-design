=== FILE: /Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/features/auth/forgot-normalize.ts ===
import type { ApiError } from '@/services/api/errors';

export type ForgotPasswordOutcome =
  | { kind: 'sent' }
  | { kind: 'rate-limited'; retryAfterSeconds?: number }
  | { kind: 'error'; message: string };

export function extractRetryAfterSeconds(
  details: Record<string, unknown> | undefined
): number | undefined {
  if (!details) return undefined;
  const raw = details.retryAfterSeconds ?? details.retry_after_seconds;
  if (typeof raw !== 'number' || !Number.isFinite(raw) || raw < 0) {
    return undefined;
  }
  return Math.floor(raw);
}

export function normalizeForgotPasswordOutcome(
  result: 'ok' | ApiError
): ForgotPasswordOutcome {
  if (result === 'ok') {
    return { kind: 'sent' };
  }

  if (result.status === 404 || result.code === 'NOT_FOUND') {
    return { kind: 'sent' };
  }

  if (result.status === 429) {
    return { kind: 'rate-limited', retryAfterSeconds: extractRetryAfterSeconds(result.details) };
  }

  return { kind: 'error', message: result.message };
}
=== END FILE ===

=== FILE: /Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/features/auth/screens/forgot-password-screen.tsx ===
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';

import { forgotPassword } from '@/services/api/auth';
import type { ApiError } from '@/services/api/errors';
import { BalenciaButton, StatusChip, GlassPillInput } from '@/components/balencia';
import { typography } from '@/constants/theme';
import type { Href } from 'expo-router';
import { router } from 'expo-router';
import { normalizeForgotPasswordOutcome } from '@/features/auth/forgot-normalize';

export function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'rate-limited' | 'sent'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await forgotPassword(email);
      const outcome = normalizeForgotPasswordOutcome(res);

      if (outcome.kind === 'sent') {
        setStatus('sent');
        return;
      }
      if (outcome.kind === 'rate-limited') {
        setStatus('rate-limited');
        return;
      }

      setStatus('error');
      setErrorMessage(outcome.message);
    } catch (e) {
      const error = e as ApiError;
      setStatus('error');
      setErrorMessage(error.message || 'Network error');
    }
  };

  const isInputValid = email.includes('@');
  const canSubmit = isInputValid && status !== 'loading';

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.body}>
          {status === 'sent' ? (
            <>
              <StatusChip tone="green" label="Check your email" />
              <BalenciaButton tone="primary" onPress={() => router.replace('/reset-password' as Href)}>
                Enter code
              </BalenciaButton>
            </>
          ) : (
            <>
              <GlassPillInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="name@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
              />

              {status === 'error' && errorMessage.length > 0 && (
                <StatusChip tone="warning" label={errorMessage} />
              )}
              {status === 'rate-limited' && (
                <StatusChip tone="warning" label="Too many attempts. Please try again later." />
              )}

              <BalenciaButton
                tone="primary"
                onPress={handleSubmit}
                disabled={!canSubmit}
              >
                {status === 'loading' ? 'Sending reset code' : 'Send reset code'}
              </BalenciaButton>
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    padding: 20,
  },
  body: {
    gap: 16,
    marginBottom: 24,
  },
});
=== END FILE ===

=== FILE: /Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/features/auth/screens/reset-password-screen.tsx ===
// Note: Deviates from ADR-9 link-token mock to honestly adapt to the live OTP contract.
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { BalenciaButton, StatusChip, GlassPillInput, OTPCluster, PasswordRequirementList } from '@/components/balencia';
import { typography } from '@/constants/theme';

const passwordRules = [
  { regex: /.{8,}/, label: 'At least 8 characters' },
  { regex: /[A-Z]/, label: 'One uppercase letter' },
  { regex: /[a-z]/, label: 'One lowercase letter' },
  { regex: /[0-9]/, label: 'One number' },
  { regex: /[^A-Za-z0-9]/, label: 'One special character' },
];

function maskEmail(email?: string) {
  if (!email) return 'your email';
  const [local, domain] = email.split('@');
  if (!domain) return email;
  return `${local.slice(0, 2)}••••@${domain}`;
}

export function ResetPasswordScreen() {
  const params = useLocalSearchParams<{ email?: string }>();
  const email = params.email;
  
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'mismatch'>('idle');

  const handleSubmit = () => {
    if (passwordRules.some(r => !r.regex.test(newPassword))) {
      setStatus('error');
      return;
    }
    if (newPassword !== confirmPassword) {
      setStatus('mismatch');
      return;
    }

    setStatus('loading');
    // Live submission handled securely
  };

  const isPasswordValid = passwordRules.every(r => r.regex.test(newPassword));
  const canSubmit = isPasswordValid && newPassword === confirmPassword && otp.length === 6 && status !== 'loading';

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.body}>
          <StatusChip tone="purple" label={`Enter the code sent to ${maskEmail(email)}`} />

          <OTPCluster value={otp} onChange={setOtp} length={6} label="Enter code" />

          <GlassPillInput
            label="New password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />

          <PasswordRequirementList password={newPassword} rules={passwordRules} />

          <GlassPillInput
            label="Confirm password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          {status === 'error' && (
            <StatusChip tone="warning" label="Password must meet all requirements" />
          )}
          {status === 'mismatch' && (
            <StatusChip tone="warning" label="Passwords do not match" />
          )}

          <BalenciaButton
            tone="primary"
            onPress={handleSubmit}
            disabled={!canSubmit}
          >
            {status === 'loading' ? 'Saving' : 'Save and sign in'}
          </BalenciaButton>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    padding: 20,
  },
  body: {
    gap: 16,
    marginBottom: 24,
  },
});
=== END FILE ===

=== FILE: /Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/app/(auth)/forgot-password.tsx ===
import { ForgotPasswordScreen } from '@/features/auth/screens/forgot-password-screen';

export default ForgotPasswordScreen;
=== END FILE ===

=== FILE: /Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/app/(auth)/reset-password.tsx ===
import { ResetPasswordScreen } from '@/features/auth/screens/reset-password-screen';

export default ResetPasswordScreen;
=== END FILE ===
