=== FILE: /Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/components/balencia/auth-inputs.tsx ===
import { useEffect, useRef, useState } from 'react';
import type { JSX } from 'react';
import {
  AccessibilityInfo,
  Animated,
  Easing,
  LayoutChangeEvent,
  LayoutRectangle,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';

import { BalenciaColors, Radius, Spacing, TouchTarget } from '@/constants/theme';

// ─── Hook: useReducedMotion ─────────────────────────────────────────────
export function useReducedMotion(): boolean {
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    const handle = (isReducedMotion: boolean) => setReduceMotion(isReducedMotion);
    AccessibilityInfo.isReduceMotionEnabled().then(handle);
    const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', handle);
    return () => sub.remove();
  }, []);
  return reduceMotion;
}

// ─── 1. GlassPillInput ──────────────────────────────────────────────────
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

export function GlassPillInput(props: GlassPillInputProps): JSX.Element {
  const {
    label,
    value,
    onChangeText,
    variant = 'text',
    placeholder,
    error,
    disabled = false,
    autoFocus = false,
    returnKeyType = 'done',
    onSubmitEditing,
    testID,
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const reduceMotion = useReducedMotion();

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const isPassword = variant === 'password';

  const dynamicInputStyle: ViewStyle = {
    borderColor: error ? BalenciaColors.danger : isFocused ? BalenciaColors.orange : BalenciaColors.hairline,
    borderWidth: 1,
    ...(isFocused && !error && !reduceMotion
      ? {
          shadowColor: BalenciaColors.orange,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 2,
        }
      : {}),
  };

  const keyboardType = variant === 'email' ? 'email-address' : 'default';

  return (
    <View testID={testID} style={styles.glassPillContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.input, dynamicInputStyle]}>
        <TextInput
          testID={`${testID ?? label}-input`}
          style={styles.textInput}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={BalenciaColors.paper55}
          editable={!disabled}
          autoFocus={autoFocus}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={isPassword && !showPassword}
          keyboardType={keyboardType}
          textContentType={isPassword ? 'password' : variant === 'email' ? 'emailAddress' : 'none'}
          autoCapitalize={variant === 'email' ? 'none' : 'sentences'}
        />
        {isPassword && (
          <Pressable
            testID={`${testID ?? label}-toggle`}
            accessibilityRole="button"
            accessibilityLabel={showPassword ? 'hide password' : 'show password'}
            style={styles.eyeToggle}
            onPress={() => setShowPassword((prev) => !prev)}
            disabled={disabled}
          >
            <Text style={styles.eyeToggleText}>{showPassword ? 'Hide' : 'Show'}</Text>
          </Pressable>
        )}
      </View>
      {error && (
        <Text style={styles.errorCaption} accessibilityRole="alert">
          {error}
        </Text>
      )}
    </View>
  );
}

// ─── 2. OTPCluster + OTPDigitCell ──────────────────────────────────────
export type OTPClusterProps = {
  length?: number;
  value: string;
  onChangeText: (value: string) => void;
  onComplete?: (code: string) => void;
  disabled?: boolean;
  error?: boolean;
  autoFocus?: boolean;
  testID?: string;
};

export function OTPCluster(props: OTPClusterProps): JSX.Element {
  const {
    length = 4,
    value,
    onChangeText,
    onComplete,
    disabled = false,
    error = false,
    autoFocus = true,
    testID,
  } = props;

  const [isFocused, setIsFocused] = useState(autoFocus);
  const [layout, setLayout] = useState<LayoutRectangle | null>(null);

  const completedRef = useRef(false);

  useEffect(() => {
    if (value.length === length) {
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete?.(value);
      }
    } else {
      completedRef.current = false;
    }
  }, [value, length, onComplete]);

  const handleLayout = (e: LayoutChangeEvent) => {
    setLayout(e.nativeEvent.layout);
  };

  const handleChangeText = (text: string) => {
    const cleanText = text.replace(/[^0-9]/g, '').slice(0, length);
    onChangeText(cleanText);
  };

  const activeIndex = value.length < length ? value.length : length - 1;

  return (
    <View testID={testID} style={styles.otpClusterContainer} onLayout={handleLayout}>
      <View style={styles.otpRow}>
        {Array.from({ length }).map((_, index) => (
          <OTPDigitCell
            key={index}
            index={index}
            length={length}
            digit={value[index] ?? ''}
            active={index === activeIndex && isFocused}
            error={error}
          />
        ))}
      </View>
      <TextInput
        testID={`${testID ?? 'otp-cluster'}-input`}
        style={[StyleSheet.absoluteFill, styles.hiddenOtpInput, { width: layout?.width, height: layout?.height }]}
        value={value}
        onChangeText={handleChangeText}
        editable={!disabled}
        autoFocus={autoFocus}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        keyboardType="number-pad"
        maxLength={length}
        textContentType="oneTimeCode"
        caretHidden
        selectTextOnFocus
      />
    </View>
  );
}

export type OTPDigitCellProps = {
  index: number;
  length: number;
  digit: string;
  active: boolean;
  error?: boolean;
  testID?: string;
};

export function OTPDigitCell(props: OTPDigitCellProps): JSX.Element {
  const { index, length, digit, active, error = false, testID } = props;

  const dynamicCellStyle = [
    styles.otpCell,
    {
      borderColor: error ? BalenciaColors.orange : active ? BalenciaColors.orange : BalenciaColors.hairline,
      borderWidth: active && !error ? 1.5 : 1,
    },
  ];

  return (
    <View
      testID={testID}
      style={dynamicCellStyle}
      accessibilityLabel={`Digit ${index + 1} of ${length}`}
      accessibilityValue={{ text: digit ? digit : 'empty' }}
    >
      <Text style={styles.otpDigit}>{digit}</Text>
    </View>
  );
}

// ─── 3. ChargeMeter ────────────────────────────────────────────────────
export type ChargeMeterProps = {
  deadline?: number | null;
  durationSeconds?: number;
  onComplete?: () => void;
  formatLabel?: (secondsRemaining: number) => string;
  testID?: string;
};

export function ChargeMeter(props: ChargeMeterProps): JSX.Element | null {
  const {
    deadline,
    durationSeconds = 60,
    onComplete,
    formatLabel = (sec) => {
      const m = Math.floor(sec / 60);
      const s = sec % 60;
      return `${m}:${s.toString().padStart(2, '0')}`;
    },
    testID,
  } = props;

  const [now, setNow] = useState(() => Date.now());
  const completedRef = useRef(false);

  useEffect(() => {
    if (deadline === undefined || deadline === null) {
      completedRef.current = false;
      return;
    }

    completedRef.current = false;
    setNow(Date.now());

    const intervalId = setInterval(() => {
      const remainingMs = Math.max(0, (deadline ?? 0) - Date.now());
      setNow(Date.now());

      if (remainingMs === 0) {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [deadline]);

  useEffect(() => {
    if (deadline === undefined || deadline === null) return;
    if (now >= deadline && !completedRef.current) {
      completedRef.current = true;
      onComplete?.();
    }
  }, [now, deadline, onComplete]);

  if (deadline === undefined || deadline === null) {
    return null;
  }

  const remainingMs = Math.max(0, deadline - now);
  const remainingSeconds = Math.floor(remainingMs / 1000);
  const percentage = Math.max(0, Math.min(1, remainingMs / 1000 / durationSeconds));

  return (
    <View testID={testID} style={styles.chargeMeterTrack}>
      <View
        style={[
          styles.chargeMeterFill,
          {
            width: `${percentage * 100}%`,
          },
        ]}
      />
      <Text style={styles.chargeMeterText}>{formatLabel(remainingSeconds)}</Text>
    </View>
  );
}

// ─── 4. PasswordRequirementList ────────────────────────────────────────
export type PasswordRequirementRuleId = 'length' | 'uppercase' | 'lowercase' | 'number' | 'special';

export type PasswordRequirementListProps = {
  password: string;
  testID?: string;
};

type PasswordRule = {
  id: PasswordRequirementRuleId;
  label: string;
  test: (pw: string) => boolean;
};

const PASSWORD_RULES: PasswordRule[] = [
  { id: 'length', label: '8+ characters', test: (pw) => pw.length >= 8 },
  { id: 'uppercase', label: 'uppercase letter', test: (pw) => /[A-Z]/.test(pw) },
  { id: 'lowercase', label: 'lowercase letter', test: (pw) => /[a-z]/.test(pw) },
  { id: 'number', label: 'number', test: (pw) => /[0-9]/.test(pw) },
  { id: 'special', label: 'special character', test: (pw) => /[^A-Za-z0-9]/.test(pw) },
];

function PasswordRequirementRow({ rule, met }: { rule: PasswordRule; met: boolean }) {
  const reduceMotion = useReducedMotion();
  const fadeAnimRef = useRef<Animated.Value | null>(null);
  if (!fadeAnimRef.current) {
    fadeAnimRef.current = new Animated.Value(met ? 1 : 0);
  }
  const fadeAnim = fadeAnimRef.current;

  useEffect(() => {
    if (!fadeAnim) return;
    if (reduceMotion) {
      fadeAnim.setValue(met ? 1 : 0);
    } else {
      Animated.timing(fadeAnim, {
        toValue: met ? 1 : 0,
        duration: 160,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }).start();
    }
  }, [met, reduceMotion, fadeAnim]);

  return (
    <View style={styles.passwordRow}>
      <View style={styles.passwordIconContainer}>
        {met ? (
          <Animated.Text
            style={[
              styles.passwordCheckIcon,
              {
                opacity: reduceMotion ? 1 : fadeAnim,
              },
            ]}
          >
            ✓
          </Animated.Text>
        ) : (
          <Animated.Text
            style={[
              styles.passwordUnmetIcon,
              {
                opacity: reduceMotion ? 1 : fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }),
              },
            ]}
          >
            ○
          </Animated.Text>
        )}
      </View>
      <Text
        style={[
          styles.passwordLabel,
          {
            color: met ? BalenciaColors.paper100 : BalenciaColors.paper55,
          },
        ]}
      >
        {rule.label}
      </Text>
    </View>
  );
}

export function PasswordRequirementList(props: PasswordRequirementListProps): JSX.Element {
  const { password, testID } = props;

  return (
    <View testID={testID} style={styles.passwordListContainer}>
      {PASSWORD_RULES.map((rule) => (
        <PasswordRequirementRow key={rule.id} rule={rule} met={rule.test(password)} />
      ))}
    </View>
  );
}

// ─── 5. ConsentCheckbox ─────────────────────────────────────────────────
export type ConsentCheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
  testID?: string;
};

export function ConsentCheckbox(props: ConsentCheckboxProps): JSX.Element {
  const { checked, onChange, label, disabled = false, testID } = props;

  return (
    <Pressable
      testID={testID}
      style={styles.consentContainer}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      accessibilityLabel={label}
      onPress={() => onChange(!checked)}
      disabled={disabled}
    >
      <View
        style={[
          styles.consentBox,
          {
            backgroundColor: checked ? BalenciaColors.orange : 'transparent',
            borderColor: checked ? BalenciaColors.orange : BalenciaColors.hairlineStrong,
          },
        ]}
      >
        {checked && <Text style={styles.consentGlyph}>✓</Text>}
      </View>
      <Text style={styles.consentLabel}>{label}</Text>
    </Pressable>
  );
}

// ─── 6. MaskedDestinationLine + maskEmail ──────────────────────────────
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

export type MaskedDestinationLineProps = {
  email: string;
  prefix?: string;
  testID?: string;
};

export function MaskedDestinationLine(props: MaskedDestinationLineProps): JSX.Element {
  const { email, prefix = 'We sent a code to ', testID } = props;
  const maskedEmail = maskEmail(email);

  return (
    <View testID={testID} style={styles.maskedLineContainer}>
      <Text style={styles.maskedLineText}>
        {prefix}
        <Text style={styles.maskedEmailText}>{maskedEmail}</Text>
      </Text>
    </View>
  );
}

// ─── 7. ToastBanner ────────────────────────────────────────────────────
export type ToastBannerTone = 'error' | 'info';

export type ToastBannerProps = {
  message?: string | null;
  tone?: ToastBannerTone;
  onDismiss?: () => void;
  testID?: string;
};

export function ToastBanner(props: ToastBannerProps): JSX.Element | null {
  const { message, tone = 'error', onDismiss, testID } = props;

  const reduceMotion = useReducedMotion();
  const opacityRef = useRef<Animated.Value | null>(null);
  if (!opacityRef.current) {
    opacityRef.current = new Animated.Value(0);
  }
  const opacity = opacityRef.current;

  const translateYRef = useRef<Animated.Value | null>(null);
  if (!translateYRef.current) {
    translateYRef.current = new Animated.Value(-10);
  }
  const translateY = translateYRef.current;

  useEffect(() => {
    if (!opacity || !translateY) return;

    if (message) {
      if (reduceMotion) {
        opacity.setValue(1);
        translateY.setValue(0);
      } else {
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
            easing: Easing.out(Easing.cubic),
          }),
          Animated.timing(translateY, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
            easing: Easing.out(Easing.cubic),
          }),
        ]).start();
      }
    } else {
      opacity.setValue(0);
      translateY.setValue(-10);
    }
  }, [message, reduceMotion, opacity, translateY]);

  if (!message) {
    return null;
  }

  const toneStyles = {
    error: {
      backgroundColor: 'rgba(255, 107, 107, 0.12)',
      borderColor: 'rgba(255, 107, 107, 0.3)',
      textColor: BalenciaColors.danger,
    },
    info: {
      backgroundColor: BalenciaColors.inkBrown700,
      borderColor: BalenciaColors.hairlineStrong,
      textColor: BalenciaColors.paper100,
    },
  };

  const activeToneStyle = toneStyles[tone];

  return (
    <Animated.View
      testID={testID}
      style={[
        styles.toastContainer,
        {
          backgroundColor: activeToneStyle.backgroundColor,
          borderColor: activeToneStyle.borderColor,
          opacity: reduceMotion ? 1 : opacity,
          transform: [{ translateY: reduceMotion ? 0 : translateY }],
        },
      ]}
      accessibilityRole="alert"
    >
      <View style={styles.toastContent}>
        <Text style={[styles.toastMessage, { color: activeToneStyle.textColor }]}>{message}</Text>
      </View>
      {onDismiss && (
        <Pressable
          testID={`${testID ?? 'toast-banner'}-dismiss`}
          accessibilityRole="button"
          accessibilityLabel="Dismiss"
          style={styles.toastDismissButton}
          onPress={onDismiss}
        >
          <Text style={styles.toastDismissIcon}>✕</Text>
        </Pressable>
      )}
    </Animated.View>
  );
}

// ─── 8. SocialAuthButton ───────────────────────────────────────────────
export type SocialAuthProvider = 'google' | 'apple';

export type SocialAuthButtonProps = {
  provider: SocialAuthProvider;
  onPress?: () => void;
  disabled?: boolean;
  gated?: boolean;
  gatedCaption?: string;
  testID?: string;
};

export function SocialAuthButton(props: SocialAuthButtonProps): JSX.Element {
  const { provider, onPress, disabled = false, gated = false, gatedCaption, testID } = props;

  const providerInfo = {
    google: {
      label: 'Google',
      glyph: 'G',
    },
    apple: {
      label: 'Apple',
      glyph: '',
    },
  }[provider];

  const isInteractive = !gated && !disabled;
  const accessibilityLabel = `continue with ${providerInfo.label}`;

  return (
    <View testID={testID}>
      <Pressable
        style={({ pressed }) => [
          styles.socialButton,
          {
            backgroundColor: BalenciaColors.inkBrown700,
            borderColor: BalenciaColors.hairlineStrong,
            opacity: !isInteractive ? 0.55 : pressed ? 0.86 : 1,
          },
        ]}
        onPress={isInteractive ? onPress : undefined}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ disabled: !isInteractive }}
      >
        <View style={styles.socialIconBadge}>
          <Text style={styles.socialIconText}>{providerInfo.glyph}</Text>
        </View>
        <Text style={styles.socialLabel}>Continue with {providerInfo.label}</Text>
      </Pressable>
      {gated && gatedCaption && (
        <Text style={styles.socialGatedCaption} accessibilityLabel={gatedCaption}>
          {gatedCaption}
        </Text>
      )}
    </View>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  glassPillContainer: {
    width: '100%',
    gap: Spacing.two,
  },
  label: {
    color: BalenciaColors.paper70,
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    height: 52,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BalenciaColors.inkBrown800,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: Spacing.three,
    gap: Spacing.two,
  },
  textInput: {
    flex: 1,
    height: '100%',
    color: BalenciaColors.paper100,
    fontSize: 16,
  },
  eyeToggle: {
    minWidth: TouchTarget,
    minHeight: TouchTarget,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyeToggleText: {
    color: BalenciaColors.paper70,
    fontSize: 14,
    fontWeight: '600',
  },
  errorCaption: {
    color: BalenciaColors.danger,
    fontSize: 12,
  },
  otpClusterContainer: {
    width: '100%',
    alignItems: 'center',
  },
  otpRow: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
  },
  otpCell: {
    width: 56,
    height: 64,
    borderRadius: 14,
    backgroundColor: BalenciaColors.inkBrown800,
    borderWidth: 1,
    borderColor: BalenciaColors.hairline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpDigit: {
    color: BalenciaColors.paper100,
    fontSize: 24,
    fontWeight: 'bold',
  },
  hiddenOtpInput: {
    opacity: 0,
  },
  chargeMeterTrack: {
    height: 24,
    width: '100%',
    backgroundColor: BalenciaColors.inkBrown800,
    borderRadius: Radius.sm,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: BalenciaColors.hairline,
  },
  chargeMeterFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: BalenciaColors.orangeSoft,
  },
  chargeMeterText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: BalenciaColors.paper100,
    fontVariant: ['tabular-nums'],
  },
  passwordListContainer: {
    width: '100%',
    gap: Spacing.two,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    minHeight: TouchTarget,
  },
  passwordIconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  passwordCheckIcon: {
    color: BalenciaColors.green,
    fontSize: 18,
    fontWeight: 'bold',
  },
  passwordUnmetIcon: {
    color: BalenciaColors.paper55,
    fontSize: 18,
  },
  passwordLabel: {
    fontSize: 14,
  },
  consentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    minHeight: TouchTarget,
    minWidth: TouchTarget,
  },
  consentBox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  consentGlyph: {
    color: BalenciaColors.paper100,
    fontSize: 16,
    fontWeight: 'bold',
  },
  consentLabel: {
    flex: 1,
    color: BalenciaColors.paper100,
    fontSize: 14,
  },
  maskedLineContainer: {
    width: '100%',
  },
  maskedLineText: {
    color: BalenciaColors.paper70,
    fontSize: 14,
  },
  maskedEmailText: {
    color: BalenciaColors.paper100,
    fontWeight: '600',
  },
  toastContainer: {
    width: '100%',
    minHeight: TouchTarget,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  toastContent: {
    flex: 1,
  },
  toastMessage: {
    fontSize: 14,
  },
  toastDismissButton: {
    minWidth: TouchTarget,
    minHeight: TouchTarget,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toastDismissIcon: {
    color: BalenciaColors.paper70,
    fontSize: 16,
  },
  socialButton: {
    minHeight: 48,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: Spacing.three,
  },
  socialIconBadge: {
    width: 24,
    height: 24,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: BalenciaColors.hairline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIconText: {
    color: BalenciaColors.paper100,
    fontWeight: 'bold',
    fontSize: 14,
  },
  socialLabel: {
    color: BalenciaColors.paper100,
    fontSize: 15,
    fontWeight: '600',
  },
  socialGatedCaption: {
    color: BalenciaColors.paper55,
    fontSize: 12,
    textAlign: 'center',
    marginTop: Spacing.two,
  },
});
=== END FILE ===

=== FILE: /Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/components/balencia/index.ts ===
export * from './button';
export * from './card';
export * from './charts';
export * from './chips';
export * from './screen';
export * from './states';
export * from './auth-inputs';
=== END FILE ===
