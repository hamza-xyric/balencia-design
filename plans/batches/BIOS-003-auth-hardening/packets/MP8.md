# Packet MP8 — WhatsApp Enrollment Gated Screen (S03e, W6)

**Batch:** BIOS-003 auth hardening · **Wave:** 5 (mobile screens) · **Depends on:** MP2 (DTOs/api, landed), MP4 (balencia kit, landed) · **Blocks:** MP9 (unit tests), SMK (simulator smoke)

You are a worker model with NO repository access. Everything you need — current file contents, exact types, design spec text, and acceptance criteria — is embedded verbatim below. Do not assume any file content not shown here. Do not invent API shapes, colors, component props, or import paths beyond what is embedded.

---

## Objective

Build the WhatsApp enrollment screen (hi-fi S03e) as an **honest, visible-but-gated** surface (waiver W6, `BATCH.md`) rather than the real phone-number/OTP enrollment flow the hi-fi spec's ASCII composition depicts. The server *does* expose `/auth/whatsapp/enroll` and `/auth/whatsapp/verify` routes, but this batch deliberately does not wire them — ADR-10 (`architecture-plan.md` §3) scopes S03e to a locked-feature card with a single working action: **skip**. This is the same honesty pattern ADR-7 uses for the Google-sign-in Expo-Go fallback: never fabricate an interactive affordance the build cannot actually deliver.

Concretely: an authenticated user lands on this screen mid-onboarding (server sent `nextStep: 'whatsapp_enrollment'` from a prior call). They see a locked-feature card explaining WhatsApp coaching is not available in this build, and a single primary button, "Skip for now", that calls `POST /auth/whatsapp/skip` and routes to whatever `nextStep` the server returns next (in the current server implementation, always `'assessment'` → the existing onboarding screen).

---

## Target files

**CREATE**
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/features/auth/whatsapp-screen.tsx` — the screen component (named export `WhatsAppScreen`).
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/app/(auth)/whatsapp.tsx` — the Expo Router route file (thin re-export, matches the existing `sign-in.tsx`/`onboarding.tsx` pattern below).
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/features/auth/next-step.ts` — the shared `resolveNextStep(nextStep)` router (ADR-10). **Why this packet creates it:** ADR-10 calls for one canonical `resolveNextStep` helper, and `architecture-plan.md` §7 assigns its construction to "MP5–MP8" collectively. At the time this packet (MP8) was composed, packet **MP5 had not yet been authored or landed** (no `src/features/auth/*` registration/OTP files exist yet, no `next-step.ts` exists yet — verified by direct filesystem check, not assumption). MP8 cannot ship a working "skip → route to next step" flow without this helper, so it creates the file now, scoped to exactly the ADR-10 mapping. **Reconciliation note for the orchestrator:** if a later-landed MP5 (or MP6/MP7) also creates `src/features/auth/next-step.ts`, the two implementations must be byte-identical in behavior (both are the ADR-10 mapping below) — reconcile to one file at merge time; this is not this packet's job to detect, since it cannot see packets that don't exist yet.

**DO NOT MODIFY (import from only)**
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/services/api/auth.ts` — import `skipWhatsApp`.
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/services/api/dto/auth.ts` — import `NextStep`, `SkipWhatsAppResponse` (not needed directly, `skipWhatsApp()`'s return type already carries it).
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/services/api/errors.ts` — import `ApiError`.
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/services/auth/session-provider.tsx` — import `useSession`.
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/services/auth/session-machine.ts` — reference only (`SessionStatus` literals, re-exported by `session-provider.tsx`).
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/components/balencia/index.ts`, `screen.tsx`, `button.tsx`, `states.tsx`, `auth-inputs.tsx` — import components from the `@/components/balencia` barrel only. **Do not add new components to the kit** — everything this screen needs (`BalenciaScreen`, `BalenciaButton`, `LockedFeatureState`, `ProvenanceChip`, `SkeletonState`, `ToastBanner`) already exists (MP4 landed).
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/constants/theme.ts` — import tokens only.
- `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/app/(auth)/_layout.tsx` — already wraps every `(auth)` route in a headerless `Stack`; no change needed for the new route to appear.

---

## Dependencies (lander installs)

None. This packet introduces no new npm packages. `expo-router` (~57.0.4), `react`, `react-native` (0.86.0) are already installed (verified in `package.json`). Do not touch `package.json`.

---

## Embedded current source

### `src/constants/theme.ts` (FULL)

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
  // AA-safe purple for small text on purpleSoft/dark surfaces (base purple is ~2.8:1 there)
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

### `src/components/balencia/states.tsx` (FULL — `LockedFeatureState`, `ProvenanceChip`, `SkeletonState` live here)

```tsx
import { useEffect, useState } from 'react';
import { AccessibilityInfo, Animated, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { BalenciaColors, Radius, Spacing, TouchTarget } from '@/constants/theme';

// Canon provenance type
export type Provenance =
  | { kind: 'real'; source: 'whoop' | 'self_report' | 'computed' | 'server'; label: string }
  | { kind: 'low'; label: string }
  | { kind: 'null'; label: string };

// Reduced motion safe hook
function useReducedMotion() {
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    const handle = (isReducedMotion: boolean) => setReduceMotion(isReducedMotion);
    AccessibilityInfo.isReduceMotionEnabled().then(handle);
    const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', handle);
    return () => sub.remove();
  }, []);
  return reduceMotion;
}

export function SkeletonState({ lines = 3, variant = 'card' }: { lines?: number; variant?: 'card' | 'hero' | 'list' }) {
  const reduceMotion = useReducedMotion();
  const [opacity] = useState(() => new Animated.Value(0.4));

  useEffect(() => {
    if (reduceMotion) return;

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.8,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();
    return () => animation.stop();
  }, [opacity, reduceMotion]);

  const animatedStyle: Animated.WithAnimatedValue<ViewStyle> = {
    opacity: reduceMotion ? 0.6 : opacity,
  };

  const baseColor = BalenciaColors.inkBrown700;

  const renderItem = (key: string | number, style: StyleProp<ViewStyle>) => (
    <Animated.View key={key} style={[styles.skeletonBlock, { backgroundColor: baseColor }, animatedStyle, style]} />
  );

  if (variant === 'hero') {
    return <View style={styles.state}>{renderItem('hero', styles.heroBlock)}</View>;
  }

  if (variant === 'list') {
    return (
      <View style={styles.state}>
        {Array.from({ length: lines }).map((_, i) => (
          <View key={i} style={styles.listRow}>
            {renderItem(`avatar-${i}`, styles.avatarBlock)}
            <View style={styles.listContent}>
              {renderItem(`title-${i}`, styles.lineBlock)}
              {renderItem(`subtitle-${i}`, [styles.lineBlock, styles.shortLine])}
            </View>
          </View>
        ))}
      </View>
    );
  }

  // card variant
  return (
    <View style={styles.state}>
      {renderItem('title', styles.titleLine)}
      {renderItem('line1', styles.lineBlock)}
      {renderItem('line2', [styles.lineBlock, styles.shortLine])}
    </View>
  );
}

export function LoadingState({ label = 'Loading Balencia data' }: { label?: string }) {
  return (
    <View accessible accessibilityLabel={label} accessibilityRole="text" style={styles.state}>
      <SkeletonState />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

export function EmptyState({ title, detail }: { title: string; detail: string }) {
  return (
    <View style={styles.state}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.label}>{detail}</Text>
    </View>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <View style={[styles.state, styles.error]}>
      <Text style={styles.title}>Needs attention</Text>
      <Text style={styles.label}>{message}</Text>
      {onRetry && (
        <Pressable
          style={({ pressed }) => [styles.retryButton, pressed && styles.buttonPressed]}
          accessibilityRole="button"
          accessibilityLabel="Try again"
          onPress={onRetry}
        >
          <Text style={styles.retryText}>Try again</Text>
        </Pressable>
      )}
    </View>
  );
}

export function HonestNullState({ title, detail }: { title: string; detail?: string }) {
  return (
    <View style={styles.state}>
      <Text style={styles.title}>{title}</Text>
      {detail ? <Text style={styles.label}>{detail}</Text> : null}
    </View>
  );
}

export function ProvenanceChip({ provenance }: { provenance: Provenance }) {
  let toneStyles;
  switch (provenance.kind) {
    case 'real':
      toneStyles = styles.provReal;
      break;
    case 'low':
      toneStyles = styles.provLow;
      break;
    case 'null':
      toneStyles = styles.provNull;
      break;
  }

  return (
    <View
      style={[styles.provenanceChip, toneStyles]}
      accessibilityRole="text"
      accessibilityLabel={`Provenance: ${provenance.label}`}
    >
      <Text style={[styles.provenanceText, toneStyles]}>{provenance.label}</Text>
    </View>
  );
}

export function OfflineBanner({ lastSyncLabel, onRetry }: { lastSyncLabel?: string; onRetry?: () => void }) {
  const accessibleLabel = `Offline. Showing last sync ${lastSyncLabel ?? 'unknown'}`;
  return (
    <View
      style={styles.banner}
      accessibilityRole="alert"
      accessibilityLabel={accessibleLabel}
    >
      <View style={styles.bannerContent}>
        <Text style={styles.bannerIcon} accessibilityLabel="Offline indicator">
          ⚠️
        </Text>
        <Text style={styles.bannerText}>
          Offline — showing last sync {lastSyncLabel ?? 'unknown'}
        </Text>
      </View>
      {onRetry && (
        <Pressable
          style={({ pressed }) => [styles.retryButton, styles.bannerButton, pressed && styles.buttonPressed]}
          accessibilityRole="button"
          accessibilityLabel="Retry connection"
          onPress={onRetry}
        >
          <Text style={styles.retryText}>Retry</Text>
        </Pressable>
      )}
    </View>
  );
}

export function LockedFeatureState({
  title,
  detail,
  onUnlock,
  unlockLabel = 'Unlock',
}: {
  title: string;
  detail?: string;
  onUnlock?: () => void;
  unlockLabel?: string;
}) {
  return (
    <View style={[styles.state, styles.lockedState]}>
      <View style={styles.lockedHeader}>
        <Text style={styles.lockIcon} accessibilityLabel="Locked feature">
          🔒
        </Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      {detail ? <Text style={styles.label}>{detail}</Text> : null}
      <Pressable
        disabled={!onUnlock}
        style={({ pressed }) => [
          styles.unlockButton,
          !onUnlock && styles.disabledButton,
          pressed && styles.buttonPressed,
        ]}
        accessibilityRole="button"
        accessibilityLabel={unlockLabel}
        accessibilityState={{ disabled: !onUnlock }}
        onPress={onUnlock}
      >
        <Text style={styles.unlockText}>{unlockLabel}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  state: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: BalenciaColors.hairline,
    backgroundColor: BalenciaColors.inkBrown800,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  error: {
    borderColor: 'rgba(255, 107, 107, 0.3)',
  },
  lockedState: {
    opacity: 0.9,
  },
  lockedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  title: {
    color: BalenciaColors.paper100,
    fontSize: 16,
    fontWeight: '800',
  },
  label: {
    color: BalenciaColors.paper70,
    fontSize: 14,
    lineHeight: 20,
  },
  skeletonBlock: {
    borderRadius: Radius.sm,
  },
  heroBlock: {
    width: '100%',
    height: 120,
  },
  titleLine: {
    width: '50%',
    height: 16,
  },
  lineBlock: {
    width: '100%',
    height: 12,
  },
  shortLine: {
    width: '70%',
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.one,
  },
  avatarBlock: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  listContent: {
    flex: 1,
    gap: Spacing.one,
  },
  retryButton: {
    minHeight: TouchTarget,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: BalenciaColors.hairlineStrong,
    backgroundColor: BalenciaColors.inkBrown700,
    paddingHorizontal: Spacing.three,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  buttonPressed: {
    opacity: 0.7,
  },
  retryText: {
    color: BalenciaColors.paper100,
    fontSize: 14,
    fontWeight: '800',
  },
  banner: {
    width: '100%',
    minHeight: TouchTarget,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: 'rgba(245, 181, 71, 0.3)',
    backgroundColor: 'rgba(245, 181, 71, 0.12)',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    flex: 1,
  },
  bannerIcon: {
    fontSize: 14,
  },
  bannerText: {
    color: BalenciaColors.warning,
    fontSize: 13,
    fontWeight: '700',
    flexShrink: 1,
  },
  bannerButton: {
    minHeight: 36,
    paddingHorizontal: Spacing.two,
    borderColor: 'rgba(245, 181, 71, 0.4)',
  },
  lockIcon: {
    fontSize: 14,
  },
  unlockButton: {
    minHeight: TouchTarget,
    borderRadius: Radius.md,
    backgroundColor: BalenciaColors.orange,
    paddingHorizontal: Spacing.three,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  disabledButton: {
    backgroundColor: BalenciaColors.inkBrown700,
  },
  unlockText: {
    color: BalenciaColors.paper100,
    fontSize: 14,
    fontWeight: '800',
  },
  provenanceChip: {
    minHeight: 24,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: Spacing.two,
    paddingVertical: 3,
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },
  provenanceText: {
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 14,
  },
  provReal: {
    backgroundColor: BalenciaColors.greenSoft,
    borderColor: 'rgba(52, 168, 83, 0.3)',
    color: BalenciaColors.green,
  },
  provLow: {
    backgroundColor: 'rgba(245, 181, 71, 0.12)',
    borderColor: 'rgba(245, 181, 71, 0.3)',
    color: BalenciaColors.warning,
  },
  provNull: {
    backgroundColor: 'rgba(254, 250, 243, 0.05)',
    borderColor: BalenciaColors.hairline,
    color: BalenciaColors.paper55,
  },
});
```

**Key point:** `LockedFeatureState` renders its internal "unlock" `Pressable` **unconditionally**, but as `disabled` whenever `onUnlock` is omitted (`disabled={!onUnlock}`, `accessibilityState={{ disabled: !onUnlock }}`, `styles.disabledButton` applied instead of the orange fill). Passing no `onUnlock` and an honest `unlockLabel` (e.g. `"Not available in this build"`) turns this into a **disabled status pill that states its own unavailability** — not an interactive affordance that silently does nothing. This is the mechanism this packet uses to satisfy "no fake enroll affordance."

### `src/components/balencia/screen.tsx` (FULL — `BalenciaScreen`)

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
  safeArea: {
    flex: 1,
    backgroundColor: BalenciaColors.ink900,
  },
  scroll: {
    flex: 1,
  },
  content: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
  },
  header: {
    gap: Spacing.two,
    paddingBottom: Spacing.three,
  },
  eyebrow: {
    color: BalenciaColors.orange,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  title: {
    color: BalenciaColors.paper100,
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 0,
    lineHeight: 38,
  },
  subtitle: {
    color: BalenciaColors.paper70,
    fontSize: 16,
    lineHeight: 23,
  },
  body: {
    gap: Spacing.three,
  },
  footer: {
    paddingTop: Spacing.four,
  },
});
```

`children` are stacked vertically inside `body` (gap `Spacing.three` = 16). `footer` is a separate optional slot below `body` — this packet does not use it; the primary button is the last child of `body`, matching the existing `sign-in-screen.tsx` convention (see below).

### `src/components/balencia/button.tsx` (FULL — `BalenciaButton`)

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

`tone` defaults to `'primary'` — this is the RN kit's mapping of the canon's `BtnPrimary` (orange fill, one per composition, `minHeight: TouchTarget` = 44px, press = scale 0.98 + opacity dip). There is no separately-named `BtnPrimary` component in this codebase; `<BalenciaButton>` (default tone) **is** `BtnPrimary`.

### `src/components/balencia/index.ts` (FULL — barrel; import everything from `@/components/balencia`, never from a sub-file)

```ts
export * from './button';
export * from './card';
export * from './charts';
export * from './chips';
export * from './screen';
export * from './states';
export * from './auth-inputs';
```

### `src/components/balencia/auth-inputs.tsx` — `ToastBanner` export only (full file is 886 lines; this is the relevant slice, re-exported through `index.ts` above — do not redeclare it)

```tsx
// ─── 7. ToastBanner ────────────────────────────────────────────────────
export type ToastBannerTone = 'error' | 'info';

export type ToastBannerProps = {
  message?: string | null;
  tone?: ToastBannerTone;
  onDismiss?: () => void;
  testID?: string;
};

export function ToastBanner(props: ToastBannerProps): JSX.Element | null {
  // ... renders null when `message` is falsy; otherwise a top glass-pill banner,
  // tone 'error' = warm-red translucent surface + BalenciaColors.danger text,
  // accessibilityRole="alert". If `onDismiss` is provided, a 44px dismiss (✕)
  // control renders. Entry/exit crossfades 200ms, reduced-motion safe.
}
```

`ToastBanner` returns `null` (renders nothing) whenever `message` is `null`/`undefined`/`''` — you can render it unconditionally with `message={error}` and it self-hides when there is no error; no need for an `{error ? <ToastBanner/> : null}` wrapper.

### `src/services/api/dto/auth.ts` (FULL — current landed state; `NextStep` and `SkipWhatsAppResponse` are the two symbols this packet needs)

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

### `src/services/api/auth.ts` (FULL — current landed state; import `skipWhatsApp` from here)

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

`skipWhatsApp()` takes **no arguments**, sends `POST /auth/whatsapp/skip` with **no body**, and does **not** set `skipAuth` — it is an authenticated call (the client's `apiFetch` attaches the stored access token via `authTokenProvider` automatically; see `client.ts` excerpt below). Returns `Promise<SkipWhatsAppResponse>` = `Promise<{ nextStep: NextStep }>`.

### `src/services/api/client.ts` — relevant excerpt (reference only, do not modify)

```ts
export type ApiFetchOptions = {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
  skipAuth?: boolean;
  retry?: boolean;
  timeoutMs?: number;
};

export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  // ... method defaults 'GET'; skipAuth defaults false; shouldRetry defaults
  // (options.retry ?? method === 'GET') — so skipWhatsApp()'s POST does NOT
  // auto-retry on failure. On non-2xx, throws ApiError (or SessionExpiredError
  // on an unrecoverable 401). On network failure/timeout, throws NetworkError
  // (which extends ApiError). Unwraps the server's { success, data } envelope
  // and returns `data` directly — skipWhatsApp() callers get the bare
  // { nextStep } object, never the envelope wrapper.
}
```

Because `skipWhatsApp()` does not auto-retry, this packet's own UI-level retry (re-tapping "Skip for now" after a failure) is the correct and complete retry mechanism — do not add client-level retry logic here.

### `src/services/api/errors.ts` (FULL)

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

`ApiError.message` is already the server's human-readable `message` field (or a network/timeout-specific message) — safe to render directly in `ToastBanner`. `SessionExpiredError` and `NetworkError` both extend `ApiError`, so a single `instanceof ApiError` check covers all three.

### `src/services/auth/session-machine.ts` (FULL — `SessionStatus` literal union)

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
```

### `src/services/auth/session-provider.tsx` (FULL — `useSession` hook; import only, do not modify)

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
  // ... full reducer wiring (boot/hydrate, signIn, adoptSession, signOut,
  // refreshUser) — not reproduced here; irrelevant to this packet beyond the
  // public contract below.
  const value = {} as SessionContextValue; // placeholder — actual implementation is in the live file
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

**Public contract this packet uses:** `const { status } = useSession();` — `status` is one of the six `SessionStatus` literals above. This packet reads `status` only; it does not call `signIn`, `signOut`, `refreshUser`, or `adoptSession`.

### Route-file conventions (all FULL, current landed state — reference only, do not modify)

`src/app/(auth)/_layout.tsx`:
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
This already wraps every route file under `src/app/(auth)/` in a headerless `Stack` — adding `whatsapp.tsx` there is enough for it to appear in the stack; no change to this file is needed.

`src/app/(auth)/sign-in.tsx` (thin route → feature-screen pattern to copy exactly):
```tsx
import { SignInScreen } from '@/features/auth/sign-in-screen';

export default SignInScreen;
```

`src/app/(auth)/onboarding.tsx` (same pattern):
```tsx
import { CiaOnboardingScreen } from '@/features/cia/cia-onboarding-screen';

export default CiaOnboardingScreen;
```

`src/app/index.tsx` (FULL — status-based `Redirect` guard pattern to copy):
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
  container: {
    flex: 1,
    backgroundColor: BalenciaColors.ink900,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

`src/app/(tabs)/_layout.tsx` — excerpt (the guard shape this packet mirrors for "requires authenticated session"):
```tsx
import { Redirect } from 'expo-router';
import { useSession } from '@/services/auth/session-provider';

export default function TabsLayout() {
  const { status } = useSession();

  if (status === 'unauthenticated' || status === 'expired') {
    return <Redirect href="/(auth)/sign-in" />;
  }

  // ... renders the tab navigator
}
```

This packet's guard is the union of both patterns: `'booting'` → loading skeleton (from `index.tsx`), `'unauthenticated' | 'expired'` → `<Redirect href="/(auth)/sign-in" />` (from `(tabs)/_layout.tsx`), anything else (`'authenticating' | 'authenticated' | 'refreshing'`) → render the screen.

### Typed routes — a gotcha you must account for

`app.json` sets `"expo": { "experiments": { "typedRoutes": true } }`. Expo Router generates `.expo/types/router.d.ts` (gitignored, machine-local) from the files under `src/app/`, and `useRouter().replace(...)` / `<Redirect href=.../>` only accept `Href` string literals that exist in that generated union **at the time it was last generated**. That file is regenerated by Expo's own tooling (dev server / `expo export`), **not** by a bare `tsc --noEmit` — so there is no guarantee it has been regenerated between this packet's file creation and whoever next runs `npm run typecheck`.

Consequences for this packet:
- `<Redirect href="/(auth)/sign-in" />` is safe unchanged — that route already exists today (confirmed in the current `.expo/types/router.d.ts`).
- `resolveNextStep`'s return value is used as `router.replace(resolveNextStep(...))` for **four** possible destinations, two of which (`/(auth)/consent`, `/(auth)/complete-profile`) belong to packets that have not landed yet, and one of which (`/(auth)/whatsapp`) is created **by this very packet** (so its presence in the generated file depends on typegen having re-run after this packet's files were written — not guaranteed). To make `next-step.ts` typecheck deterministically regardless of typegen timing, **every** branch's return value is asserted through the imported `Href` type (`as Href`) rather than relying on literal-type inference. This is a routing-table entry for known, real destinations — not an `any` escape hatch.

---

## Design spec

### Hi-fi spec source: `Balencia-New-Screens/hifi-screens/03e-whatsapp-enrollment.md` (FULL, verbatim)

```markdown
# 03e-whatsapp-enrollment - A+++ hi-fi mobile spec

## Header
- **Source ID:** 03e
- **Source spec:** `Balencia-New-Screens/screens/03e-whatsapp-enrollment.md`
- **Evidence:** screens/03e-whatsapp-enrollment.md, work/briefs/03e.md, work/drafts/03e.md, work/briefs/03e.md, Balencia canon, component catalog.
- **Route(s):** `/onboarding`
- **Frame:** 390x844 native mobile
- **Priority:** converted with asset slots

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Offers an optional WhatsApp coaching channel for reminders, check-ins, and CIA tips.
- **Premium Visual Director:** make WhatsApp enrollment command surface the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** WhatsApp enrollment keeps required consent unchecked until explicit action, optional consent skippable, and route handoff limited to `/onboarding`.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+--------------------------------------+
|                              skip    |
|                 Balencia             |
|                                      |
|        Get CIA on *WhatsApp*         |
|  Reminders and check-ins in chat.    |
|                                      |
| +----------------------------------+ |
| | You can turn this off in Settings | |
| | or reply STOP. [data controls]    | |
| +----------------------------------+ |
| [+1 v] [ phone number             ] |
| [ send code                      ]  |
| - daily reminders                  |
| - check-in prompts                 |
| - CIA coaching tips                |
|                                      |
| phase 2: [1][2][3][4][5][6]        |
| resend code (0:47) [######----]     |
+--------------------------------------+

Route handling: `/onboarding`
```

## Focal Hierarchy
- **Dominant focal moment:** WhatsApp enrollment command surface; it should be visually singular, not one tile among many.
- **Secondary layer:** Skip link and optional phase-2 back chevron. with CIA only when the source supports a synthesized read.
- **Operational layer:** Brand symbol., Value proposition and privacy reassurance., Consent/control card., Phase 1 phone input.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*enrollment*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar** - phase 2 back chevron; phase 1 uses only skip.
- **GlassPillInput** - phone and OTP cell material.
- **Sheet** - country code picker.
- **BtnPrimary** - send code / verify code.
- **BtnGhost** - skip and resend.
- **ChargeMeter** - resend countdown.
- **ConsentCard** - WhatsApp channel data controls before phone entry.
- **ChipProvenance** - phone source "you entered", timer source "system cooldown."
- **OfflineBanner, ErrorState, SkeletonState, HonestNullState** - state components.
- **NEW: OTPCluster6** - six-cell code entry adapted from the OTP pattern for SMS verification.

## Data Honesty
- **Phone number:** real = member input with `ChipProvenance` "you entered"; low-confidence = locally valid but server not yet verified; honest-null = empty phone field.
- **Masked phone:** real = generated from the submitted number; low-confidence = pending SMS delivery; honest-null = generic "your phone" if mask cannot be built.
- **SMS code:** real = six user-entered digits verified by backend; low-confidence is not applicable after server response; honest-null = empty cells.
- **Resend and spam cooldowns:** real = server/local timers; low-confidence = missing retry-after, generic wait copy; honest-null = hidden before first code send.
- **WhatsApp controls:** data category = phone and message channel; source = user-entered phone and WhatsApp delivery events; scope = reminders, check-ins, CIA tips; retention = until revoke or account deletion; export, revoke, delete phone, and STOP instructions are visible before collection.

## Consent and Safety
- WhatsApp enrollment keeps required consent unchecked until explicit action, optional consent skippable, and route handoff limited to `/onboarding`.
- WhatsApp enrollment exposes audience, visibility, report, mute, block, and own-content delete controls before sharing or social comparison.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- Keep navigation targets aligned to `/onboarding`. Do not add alternate vanity routes.

## States
- **Default:** phase 1, empty phone, skip visible, CTA disabled until valid phone.
- **Skeleton:** SMS delivery and verification preserve input geometry with shimmer; no fake code.
- **Empty:** no phone or code entered; ConsentCard still visible.
- **Error:** invalid phone, send fail, invalid code, expired code, network fail, and spam lockout use plain copy.
- **Success:** verify CTA flashes `--glow-done`, then routes to [07].
- **Disabled:** send/verify/resend dim to 40 percent during invalid input, loading, cooldown, or lockout.
- **Offline:** phone/code values persist; network actions disabled; skip remains active.

## Motion
- **Phase transition:** phone entry crossfades to code entry; brand mark stays fixed.
- **OTP:** auto-advance, backspace, paste six digits, and tap-to-focus are supported.
- **Country code:** picker opens as a searchable Sheet.
- **Resend:** ChargeMeter drains; resend flash confirms new code sent.
- **Haptics:** light on digit entry, medium on verified, none on disabled controls.
- **Reduced-motion:** crossfade becomes instant swap; countdown ring becomes text-only.

## Image Slots
- `HIFI-03e-01` - content proof or instructional media slot; screen-specific; premium warm-dark product placeholder. Prompt: WhatsApp enrollment provider-neutral WhatsApp status art, Balencia warm-dark glass UI asset, privacy-safe, no brand logos, no readable UI text.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/onboarding`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** paper text and orange controls clear AA+ against warm dark surfaces.; **Targets:** skip, back, country picker, phone field, OTP cells, resend, and CTA meet 44px.; **Screen readers:** OTP cells announce "digit N of 6"; ConsentCard summarizes opt-out, revoke, retention, export, and delete controls.
```

### Why this packet does NOT build the phase-1/phase-2 phone+OTP flow above

The hi-fi spec's `Final Composition` assumes a real, working phone-number-entry + 6-digit-SMS-OTP flow (`GlassPillInput` phone field, `send code` CTA, `OTPCluster6`, `ChargeMeter` resend). **`architecture-plan.md` ADR-10 explicitly overrides this for BIOS-003:**

> "WhatsApp S03e stays **visible-but-gated (W6)** with the primary action being **skip** → `POST /whatsapp/skip` → `assessment`." (§3, ADR-10)

> `(auth)/whatsapp` | S03e (W6 gated) | `POST /whatsapp/skip` (primary), `/whatsapp/enroll` (gated) | requires session (§6, mobile flow map)

> **MP8 — WhatsApp gated + skip.** Targets: create `src/app/(auth)/whatsapp.tsx`. Embed: W6 gated; primary skip→`/whatsapp/skip`→assessment; provenance chip. Acceptance: visible-but-gated enroll, working skip. (§7, packet decomposition)

And `BATCH.md`'s waiver ledger:

> | W6 | Backend-gated features | — | Backend matures | Visible-but-gated with provenance |

This is a **deliberate batch-scope decision**, not a missing feature: the server routes `/auth/whatsapp/enroll` and `/auth/whatsapp/verify` exist and are traced in `scope-server-auth.md` §1, but wiring a live SMS-OTP UI is out of this batch's 5-slice cap. The honest adaptation — same pattern ADR-7 uses for the Google/Expo-Go fallback — is: show the real value proposition, be explicit that it is not available yet, and give the user exactly one working action (skip). **Do not build the phone input, country-code picker, or `OTPCluster6`.** Doing so would be a fake affordance: a control that looks interactive but has no real backend wiring behind it in this build.

### Canon rules that apply (from `scope-hifi-auth.md` §3, `COMPACT-CANON.md`/`COMPONENT-CATALOG.md`)

- **Data honesty invariant:** "Every metric ships 3 states: real (value + provenance chip), low-confidence (muted value + `estimated · low confidence` label), honest-null (designed empty state...)." The gated card is the honest-null state for WhatsApp enrollment as a whole — there is no real/low-confidence variant to render because the capability itself does not exist in this build.
- **44px minimum targets:** "all interactive elements meet 44×44px." `BalenciaButton` and `LockedFeatureState`'s internal pressable both already satisfy this (`minHeight: TouchTarget` in their embedded source above) — do not introduce any new custom-sized touch target.
- **Typography — sentence case everywhere, no exclamation marks:** applies to every new copy string in this packet (title, subtitle, detail text, button labels).
- **Semantic color roles (60/30/10):** orange = primary CTA only (`BalenciaButton` default tone) — do not tint the locked-card or provenance chip orange; `ProvenanceChip` with `kind: 'null'` already renders in the neutral/muted tone (see `styles.provNull` in `states.tsx` above), which is correct here (this is an honest-null provenance state, not a real or low-confidence one).
- **Naming:** per `yhealth-app/mobile/AGENTS.md` — "Visible AI coach copy is `Cia`. Do not introduce legacy naming in mobile UI." The hi-fi spec's literal copy says "CIA" (all-caps); this packet uses "Cia" instead, matching the mobile-specific naming rule, which takes precedence over the older hi-fi copy for mobile screens (same class of honest adaptation already established for S05b in this batch).

### Exact copy used in this packet (sentence case, no exclamation marks, "Cia" not "CIA")

| Element | Copy |
|---|---|
| `eyebrow` | `Onboarding` |
| `title` | `Get Cia on WhatsApp.` |
| `subtitle` | `Reminders and check-ins in chat.` (verbatim from hi-fi spec's composition line) |
| `LockedFeatureState.title` | `WhatsApp coaching` |
| `LockedFeatureState.detail` | `Daily reminders, check-in prompts, and Cia coaching tips over WhatsApp — not available in this build.` |
| `LockedFeatureState.unlockLabel` | `Not available in this build` |
| `ProvenanceChip` label | `not available in this build` (lowercase — matches the existing short-tag convention used by other provenance labels in this codebase, e.g. "you entered", "system cooldown"; this is a chip micro-copy convention, not a full sentence) |
| Primary button (idle) | `Skip for now` |
| Primary button (in flight) | `Skipping` |
| Generic network-failure toast fallback | `Could not reach Balencia. Check your connection and try again.` |

The parenthesized phrase **"not available in this build"** is used verbatim in two places (the locked-card detail sentence and the `ProvenanceChip` label) per the task's explicit instruction to surface this exact honest provenance caption.

---

## Contract (exact types/props/signatures — verbatim)

### `src/features/auth/next-step.ts` (CREATE — full file)

```ts
// BIOS-003 ADR-10 (architecture-plan.md §3 "Decision (routing)", §6 mobile flow
// map) — the single router consumed after any session-adopting or
// step-advancing server call. Owned here because packet MP5 (registration/OTP
// screens, which also needs this helper) had not been composed or landed at
// the time this packet (MP8) was authored — verified by direct filesystem
// check (no src/features/auth/next-step.ts, no src/app/(auth)/consent.tsx,
// no src/app/(auth)/complete-profile.tsx exist yet). If a later-landed MP5 (or
// MP6/MP7) also creates this file, the orchestrator reconciles to ONE
// canonical implementation at merge time — both must express the exact same
// ADR-10 mapping below, so reconciliation should be a no-op / pure dedupe,
// never a behavior change.
import type { Href } from 'expo-router';

import type { NextStep } from '@/services/api/dto/auth';

// Every branch is asserted through `Href` rather than relying on literal-type
// inference. Reason: Expo Router's typed-routes file
// (.expo/types/router.d.ts, gitignored, machine-local) is regenerated by
// Expo's own tooling (dev server / `expo export`), not by `tsc --noEmit` —
// this file's typecheck must not depend on whether that regeneration has run
// recently, nor on packet-landing order (two of these four destinations,
// `/(auth)/consent` and `/(auth)/complete-profile`, belong to packets MP5 and
// MP6/MP7 respectively and do not exist as route files yet). This is a
// routing-table of known, real destinations — not an `any` escape hatch.
export function resolveNextStep(nextStep: NextStep): Href {
  switch (nextStep) {
    case 'consent':
      return '/(auth)/consent' as Href;
    case 'complete_profile':
      return '/(auth)/complete-profile' as Href;
    case 'whatsapp_enrollment':
      return '/(auth)/whatsapp' as Href;
    case 'assessment':
      return '/(auth)/onboarding' as Href;
    default: {
      // Exhaustiveness guard: NextStep is a closed 4-literal union today
      // (src/services/api/dto/auth.ts). If the server ever sends a value
      // outside that union, route to sign-in rather than crash or silently
      // no-op — an honest fallback, not a fabricated destination.
      const _exhaustiveCheck: never = nextStep;
      return '/(auth)/sign-in' as Href;
    }
  }
}
```

**Signature:** `resolveNextStep(nextStep: NextStep): Href`. Pure function, no side effects, no React dependency — importable from any screen.

### `src/features/auth/whatsapp-screen.tsx` (CREATE — full file)

```tsx
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Redirect, useRouter } from 'expo-router';

import {
  BalenciaButton,
  BalenciaScreen,
  LockedFeatureState,
  ProvenanceChip,
  SkeletonState,
  ToastBanner,
} from '@/components/balencia';
import { BalenciaColors, Spacing } from '@/constants/theme';
import { skipWhatsApp } from '@/services/api/auth';
import { ApiError } from '@/services/api/errors';
import { useSession } from '@/services/auth/session-provider';

import { resolveNextStep } from './next-step';

export function WhatsAppScreen() {
  const router = useRouter();
  const { status } = useSession();
  const [isSkipping, setIsSkipping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 'booting' = session-provider still hydrating from SecureStore; hold a
  // skeleton rather than flash a redirect. Matches src/app/index.tsx.
  if (status === 'booting') {
    return (
      <View style={styles.loadingContainer}>
        <SkeletonState variant="hero" />
      </View>
    );
  }

  // This screen only makes sense mid-onboarding for an authenticated user —
  // the server only ever sends nextStep: 'whatsapp_enrollment' to a
  // session-holding caller (scope-server-auth.md §1, submitConsent response).
  // Matches src/app/(tabs)/_layout.tsx's guard shape exactly.
  if (status === 'unauthenticated' || status === 'expired') {
    return <Redirect href="/(auth)/sign-in" />;
  }

  async function handleSkip() {
    setError(null);
    setIsSkipping(true);
    try {
      const data = await skipWhatsApp();
      router.replace(resolveNextStep(data.nextStep));
    } catch (skipError) {
      // Honest failure surface — never silently succeed or fabricate a route.
      // Re-enabling the button in `finally` below IS the retry path: the
      // user taps "Skip for now" again; no separate retry control is
      // invented (skipWhatsApp() does not auto-retry — see client.ts notes).
      setError(
        skipError instanceof ApiError
          ? skipError.message
          : 'Could not reach Balencia. Check your connection and try again.'
      );
    } finally {
      setIsSkipping(false);
    }
  }

  return (
    <BalenciaScreen
      eyebrow="Onboarding"
      title="Get Cia on WhatsApp."
      subtitle="Reminders and check-ins in chat."
      withTabPadding={false}>
      <ToastBanner
        message={error}
        tone="error"
        onDismiss={() => setError(null)}
        testID="whatsapp-skip-error"
      />

      <LockedFeatureState
        title="WhatsApp coaching"
        detail="Daily reminders, check-in prompts, and Cia coaching tips over WhatsApp — not available in this build."
        unlockLabel="Not available in this build"
      />

      <View style={styles.provenanceRow}>
        <ProvenanceChip provenance={{ kind: 'null', label: 'not available in this build' }} />
      </View>

      <BalenciaButton onPress={handleSkip} disabled={isSkipping} accessibilityLabel="Skip for now">
        {isSkipping ? 'Skipping' : 'Skip for now'}
      </BalenciaButton>
    </BalenciaScreen>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: BalenciaColors.ink900,
    alignItems: 'center',
    justifyContent: 'center',
  },
  provenanceRow: {
    flexDirection: 'row',
    paddingTop: Spacing.two,
  },
});
```

**Contract:** `WhatsAppScreen(): JSX.Element` — named export, zero props (reads session/router/api internally, same shape as `SignInScreen` in `sign-in-screen.tsx`). No default export in this file.

### `src/app/(auth)/whatsapp.tsx` (CREATE — full file, thin route re-export, matches `sign-in.tsx`/`onboarding.tsx` exactly)

```tsx
import { WhatsAppScreen } from '@/features/auth/whatsapp-screen';

export default WhatsAppScreen;
```

---

## Acceptance criteria (mechanically checkable)

1. All three files exist at their exact target paths and contain exactly the code given in the Contract section above (or behaviorally identical code — no required literal match beyond compiling to the same behavior, but do not deviate from the given structure without reason).
2. `src/features/auth/next-step.ts` exports `resolveNextStep(nextStep: NextStep): Href` and no other symbol. All four `NextStep` literals (`'consent' | 'complete_profile' | 'whatsapp_enrollment' | 'assessment'`) are handled by name (no fallthrough/default-only implementation), plus an exhaustiveness-guarded default branch.
3. `src/features/auth/whatsapp-screen.tsx` exports named `WhatsAppScreen` and has no default export.
4. `src/app/(auth)/whatsapp.tsx` is a two-line thin re-export (`import` + `export default`), nothing else — no logic in the route file itself.
5. Guard behavior, exactly: `status === 'booting'` → renders `<SkeletonState variant="hero" />` inside a centered `flex-1` `ink900` container (no redirect, no gated card yet). `status === 'unauthenticated' || status === 'expired'` → renders `<Redirect href="/(auth)/sign-in" />` and nothing else. Any other status → renders the full gated screen.
6. **Zero fake affordances:** `grep -c "TextInput\|OTPCluster\|GlassPillInput\|phone" src/features/auth/whatsapp-screen.tsx` = `0` (no phone/OTP input anywhere in this file). The only `onPress`/interactive control in the rendered tree is the "Skip for now" `BalenciaButton`. `LockedFeatureState` is invoked without an `onUnlock` prop (its internal pressable is therefore `disabled`, per the embedded source).
7. Primary action, exactly: `handleSkip` calls `skipWhatsApp()` (no arguments), then on success calls `router.replace(resolveNextStep(data.nextStep))` — the route is never a hardcoded string; it is always the return value of `resolveNextStep` applied to the server's actual response.
8. Failure path: any thrown error from `skipWhatsApp()` is caught, converted to a human string (`ApiError.message` when `instanceof ApiError`, else the generic network fallback string), and passed to `<ToastBanner message={error} tone="error" .../>`. `isSkipping` resets to `false` in a `finally` block so the "Skip for now" button is tappable again immediately after a failure (this is the retry path — no separate retry button is added).
9. 44px targets: no new custom-sized `Pressable`/`TouchableOpacity` is introduced by this packet — the only interactive elements are `BalenciaButton` (`minHeight: TouchTarget` in `button.tsx`) and `LockedFeatureState`'s internal pressable (`minHeight: TouchTarget` in `states.tsx`), both already compliant pre-existing components.
10. Sentence case, no exclamation marks, "Cia" not "CIA", in every new copy string introduced by this packet (see the copy table above) — `grep -c "CIA\b" src/features/auth/whatsapp-screen.tsx` = `0`, `grep -c "!" src/features/auth/whatsapp-screen.tsx` = `0`.
11. No `any` anywhere in any of the three new files. No `@ts-ignore`/`@ts-expect-error` without a `// reason:` comment (the `as Href` assertions in `next-step.ts` are typed assertions to a specific imported type, not `any`, and are already commented with their reason).
12. `cd /Users/hamza/Desktop/balencia-design/yhealth-app/mobile && npm run typecheck` (`tsc --noEmit`) exits `0`.
13. `cd /Users/hamza/Desktop/balencia-design/yhealth-app/mobile && npm run lint` (`expo lint`) exits `0` with no new warnings attributable to these three files.
14. No modification to any file outside the three CREATE targets — `git diff --stat` (once staged) shows only additions for `src/features/auth/next-step.ts`, `src/features/auth/whatsapp-screen.tsx`, `src/app/(auth)/whatsapp.tsx`.

---

## Out of scope

- Real WhatsApp phone-number entry, country-code picker, 6-digit SMS OTP verification (`OTPCluster6`), and resend `ChargeMeter` — explicitly waived this batch (W6, `BATCH.md`; ADR-10, `architecture-plan.md` §3). The server routes `POST /auth/whatsapp/enroll` and `POST /auth/whatsapp/verify` exist (`scope-server-auth.md` §1) but are not called anywhere in this packet.
- `/(auth)/consent` route/screen — packet MP5.
- `/(auth)/complete-profile` route/screen — packets MP6/MP7.
- `RegistrationFlow` reducer, activation-token state machine — packet MP5.
- Social sign-in service (`src/services/auth/social.ts`), Apple/Google buttons — packet MP3 (landed)/MP7.
- Any modification to `src/services/api/auth.ts`, `dto/auth.ts`, `errors.ts`, `client.ts`, `session-provider.tsx`, `session-machine.ts`, or any file under `src/components/balencia/` — all are import-only dependencies for this packet.
- Reconciling a duplicate `src/features/auth/next-step.ts` if packet MP5 (or MP6/MP7) independently creates one — flagged above for the orchestrator to resolve at merge time; not something this packet's own acceptance check can detect in isolation.
- Unit tests for `resolveNextStep` or `WhatsAppScreen` — packet MP9 ("session adoptSession/device-id", "enumeration normalization", etc. — MP9's stated scope does not currently list this screen either; if MP9's packet is composed after this one, it should add WhatsApp-skip coverage explicitly).
- Simulator smoke screenshots — packet SMK.
- Any server-side change — the server contract is already frozen (`architecture-plan.md` §5); `/auth/whatsapp/skip`'s `{nextStep}` response shape is consumed as-is.
