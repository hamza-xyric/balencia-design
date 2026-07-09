# Packet MP4 — Extend balencia kit with native auth primitives

**Batch:** BIOS-003 auth hardening · **Wave:** 4.5 (mobile kit) · **Depends on:** none (tokens only) · **Blocks:** MP5, MP6, MP7, MP8 (all consume these primitives)

You are a worker model with NO repository access. Everything you need — current file contents, exact types, design spec text, and acceptance criteria — is embedded verbatim below. Do not assume any file content not shown here. Do not invent API shapes, colors, or import paths beyond what is embedded.

---

## Objective

Add eight new presentational, stateless-where-possible React Native components (plus one hook and one pure string util) to the existing `balencia` component kit at `yhealth-app/mobile/src/components/balencia/`, so that downstream screen packets (MP5 registration/OTP, MP6 forgot/reset, MP7 social + complete-profile, MP8 WhatsApp) can compose real auth screens without inventing ad hoc styling.

This packet ships **primitives only** — no screens, no navigation, no API calls, no server contract usage. Every component is a pure function of its props; state (form values, timers-as-deadlines, error strings) is owned by the caller (a future MP5–MP8 screen), except small internal UI state each component legitimately owns itself (focus, secure-text toggle, per-tick countdown re-render).

**Components to build** (exported names, exact):
`GlassPillInput`, `OTPCluster`, `OTPDigitCell`, `ChargeMeter`, `PasswordRequirementList`, `ConsentCheckbox`, `MaskedDestinationLine`, `maskEmail`, `ToastBanner`, `SocialAuthButton`.

Plus a local `useReducedMotion` hook (exported from the new file — see Contract).

---

## Target files

| Path | Action |
|---|---|
| `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/components/balencia/auth-inputs.tsx` | **CREATE** — all 8 components + `maskEmail` + `useReducedMotion`, in this single file |
| `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/components/balencia/index.ts` | **MODIFY** — add one export line for the new file |

Do not create any other file. Do not modify `theme.ts`, `button.tsx`, `card.tsx`, `chips.tsx`, `charts.tsx`, `screen.tsx`, or `states.tsx` — they are embedded below **for reference only** (naming/style conventions and the exact token names you must import), not as edit targets.

**Why one file, not a split:** eight components is a lot for one file, but this packet is implemented by a worker with no cross-file visibility guarantees; a single file avoids import-path guessing between sibling new files. Internal organization inside the file (grouped with comment headers, one group per component) is at your discretion as long as every symbol below is exported from `auth-inputs.tsx`.

---

## Embedded current source

### `src/constants/theme.ts` (FULL — import from this; do not invent tokens not listed here)

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

**Note (important, resolved conflict):** `Colors.light` and `Colors.dark` are currently *identical* — the app has one warm-dark palette only, no separate light theme exists yet. The hi-fi spec (embedded below) calls for a "Figma light-auth override" (white fill, warm-gray border, 14–16px radius) on several auth inputs. **That override is NOT implemented in this packet** — there is no white/warm-gray token in `theme.ts`, and every existing kit component (below) uses only the dark warm-ink tokens. Per this packet's own constraint ("theme tokens only, no hex literals except the tokens file"), inventing new hex literals for a white variant would violate the constraint. Build every component below against the existing dark tokens only, exactly like every other kit component does. This is a deliberate, documented scope decision — not a silent gap. Adding true light-auth tokens is out of scope for MP4 (would require a `theme.ts` change, which is not a target file here).

### `src/components/balencia/index.ts` (FULL — current state before your edit)

```ts
export * from './button';
export * from './card';
export * from './charts';
export * from './chips';
export * from './screen';
export * from './states';
```

Your edit: add exactly one line, `export * from './auth-inputs';`, anywhere in this file (append at the end is fine). Do not reorder or touch the existing five lines.

### `src/components/balencia/button.tsx` (FULL — reference for press/disabled/style conventions)

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

**Do not import or wrap `BalenciaButton`** for `SocialAuthButton` below — it has no `style` override escape hatch and a fixed 44px `minHeight`, but the spec needs 48px + icon/label row layout. Build `SocialAuthButton` standalone, reusing only the *tone* (colors) convention shown above (`secondary` tone = `inkBrown700` bg / `hairlineStrong` border / `paper100` text), not the component itself.

### `src/components/balencia/states.tsx` (FULL — reference for the reduced-motion hook pattern, glyph-icon convention, and banner/chip conventions)

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

  // ...rest of SkeletonState omitted here (variant rendering); not relevant to your task.
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

const styles = StyleSheet.create({
  state: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: BalenciaColors.hairline,
    backgroundColor: BalenciaColors.inkBrown800,
    padding: Spacing.three,
    gap: Spacing.two,
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
  // ...remaining style keys omitted (retryButton, buttonPressed, retryText, bannerContent, bannerIcon,
  // bannerText, provenanceChip, etc.) — not relevant to your task, shown partially only to establish
  // the StyleSheet.create + tone-object convention used throughout the kit.
});
```

**Key conventions to copy exactly:**
1. `useReducedMotion()` is defined **privately per-file** (not exported from `states.tsx`, not imported cross-file). You must define your **own** copy of this exact hook body inside `auth-inputs.tsx` (see Contract) — do not attempt `import { useReducedMotion } from './states'` (it does not exist as an export and `states.tsx` is not a target file).
2. Icons are plain glyph characters in `<Text>` (⚠️, 🔒 elsewhere in the file), never an icon library. No icon-library dependency exists in this kit today — see package.json below.
3. Every interactive element gets `accessibilityRole` + `accessibilityLabel`; banners use `accessibilityRole="alert"`.
4. All colors come from `BalenciaColors.*`; all radii from `Radius.*` where the value matches the scale (`sm:8, md:12, lg:18, xl:24`) — components needing an exact spec dimension not on that scale (e.g. `52`, `56×64`, `14`, `24`, `6`, `48`, `999`) use a bare numeric literal, which is fine (the "no hex literals except tokens file" rule is about **colors**, not spacing/radius numbers).
5. `TouchTarget = 44` is the shared minimum-tap-target constant.

### `package.json` dependencies (relevant excerpt — confirms what is and is NOT installed)

```json
{
  "dependencies": {
    "@expo/ui": "~57.0.4",
    "@tanstack/react-query": "^5.90.12",
    "expo": "~57.0.4",
    "expo-constants": "~57.0.3",
    "expo-device": "~57.0.0",
    "expo-font": "~57.0.0",
    "expo-glass-effect": "~57.0.0",
    "expo-image": "~57.0.0",
    "expo-linking": "~57.0.2",
    "expo-router": "~57.0.4",
    "expo-secure-store": "~57.0.0",
    "expo-splash-screen": "~57.0.2",
    "expo-status-bar": "~57.0.0",
    "expo-symbols": "~57.0.0",
    "expo-system-ui": "~57.0.0",
    "expo-updates": "~57.0.6",
    "expo-web-browser": "~57.0.0",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "react-native": "0.86.0",
    "react-native-gesture-handler": "~2.32.0",
    "react-native-reanimated": "4.5.0",
    "react-native-safe-area-context": "~5.7.0",
    "react-native-screens": "4.25.2",
    "react-native-web": "~0.21.0",
    "react-native-worklets": "0.10.0"
  }
}
```

**You may only import from:** `react`, `react-native` (core: `View`, `Text`, `TextInput`, `Pressable`, `StyleSheet`, `Animated`, `AccessibilityInfo`, `Platform` if needed), and `@/constants/theme`. **Do not** import `expo-glass-effect`, `expo-symbols`, `react-native-reanimated`, or any other package for this packet — even though some are installed, no existing kit component uses them (confirmed: `button.tsx`, `card.tsx`, `chips.tsx`, `charts.tsx`, `states.tsx` import only `react`, `react-native`, and `@/constants/theme`), and this packet adds **zero new dependencies**. `tsconfig.json` defines the `@/*` → `./src/*` path alias used by every existing import; `strict: true` is on.

---

## Contract (exact types/props/signatures — verbatim)

Implement exactly these exported symbols from `auth-inputs.tsx`. Prop names, optionality, and defaults are normative; internal implementation (state, styles) is yours to write, subject to the Design spec and Acceptance criteria below.

```ts
// ── Hook ────────────────────────────────────────────────────────────────
// Identical behavior to the private hook in states.tsx (see embedded source above),
// duplicated locally since states.tsx does not export one and is not a target file.
export function useReducedMotion(): boolean;

// ── 1. GlassPillInput ──────────────────────────────────────────────────
export type GlassPillInputVariant = 'text' | 'email' | 'password';

export type GlassPillInputProps = {
  label: string;                      // persistent label rendered ABOVE the field — never placeholder-only
  value: string;
  onChangeText: (text: string) => void;
  variant?: GlassPillInputVariant;    // default 'text'
  placeholder?: string;
  error?: string;                     // presence => error state; string is the caption text rendered below the field
  disabled?: boolean;
  autoFocus?: boolean;
  returnKeyType?: 'done' | 'next' | 'go' | 'send';
  onSubmitEditing?: () => void;
  testID?: string;
};

export function GlassPillInput(props: GlassPillInputProps): JSX.Element;

// ── 2. OTPCluster + OTPDigitCell ──────────────────────────────────────
export type OTPClusterProps = {
  length?: number;                       // default 4
  value: string;                         // controlled numeric string, length constrained to `length`
  onChangeText: (value: string) => void;
  onComplete?: (code: string) => void;   // fires exactly once per completion, when value.length === length
  disabled?: boolean;
  error?: boolean;
  autoFocus?: boolean;                   // default true
  testID?: string;
};

export function OTPCluster(props: OTPClusterProps): JSX.Element;

export type OTPDigitCellProps = {
  index: number;      // 0-based position
  length: number;      // total cell count, for the accessibility label ("Digit N of length")
  digit: string;       // '' or a single character
  active: boolean;     // true = this is the next cell to be filled AND the cluster is focused
  error?: boolean;
  testID?: string;
};

export function OTPDigitCell(props: OTPDigitCellProps): JSX.Element;

// ── 3. ChargeMeter ─────────────────────────────────────────────────────
export type ChargeMeterProps = {
  deadline?: number | null;    // epoch ms when the cooldown ends. Absent/null => render null (NEVER fabricate a countdown)
  durationSeconds?: number;    // default 60 — total window, used only to compute drain-fill percentage
  onComplete?: () => void;     // fires exactly once when remaining seconds reaches 0
  formatLabel?: (secondsRemaining: number) => string; // default: "M:SS" (e.g. 59 -> "0:59", 125 -> "2:05")
  testID?: string;
};

export function ChargeMeter(props: ChargeMeterProps): JSX.Element | null;

// ── 4. PasswordRequirementList ────────────────────────────────────────
export type PasswordRequirementRuleId = 'length' | 'uppercase' | 'lowercase' | 'number' | 'special';

export type PasswordRequirementListProps = {
  password: string;
  testID?: string;
};

export function PasswordRequirementList(props: PasswordRequirementListProps): JSX.Element;

// The 5 deterministic rules, exact ids + exact copy (verbatim from S05b spec — see Design spec):
//   { id: 'length',    label: '8+ characters',     test: (pw) => pw.length >= 8 }
//   { id: 'uppercase', label: 'uppercase letter',   test: (pw) => /[A-Z]/.test(pw) }
//   { id: 'lowercase', label: 'lowercase letter',   test: (pw) => /[a-z]/.test(pw) }
//   { id: 'number',    label: 'number',             test: (pw) => /[0-9]/.test(pw) }
//   { id: 'special',   label: 'special character',  test: (pw) => /[^A-Za-z0-9]/.test(pw) }
// Rendered in exactly this order.

// ── 5. ConsentCheckbox ─────────────────────────────────────────────────
export type ConsentCheckboxProps = {
  checked: boolean;               // STRICTLY CONTROLLED — no defaultChecked prop exists on this type,
  onChange: (checked: boolean) => void;   // by construction the component cannot start pre-checked
  label: string;
  disabled?: boolean;
  testID?: string;
};

export function ConsentCheckbox(props: ConsentCheckboxProps): JSX.Element;

// ── 6. MaskedDestinationLine + maskEmail ──────────────────────────────
export function maskEmail(email: string): string;
// Rules (deterministic, exported so a future test packet — MP9 — can unit-test it directly):
//   - trim the input first
//   - if there is no '@' or the local part (before '@') is empty: return '' for an empty/blank input,
//     otherwise return `${firstChar}***` (no fabricated domain)
//   - otherwise return `${firstCharOfLocalPart}***@${domain}` — e.g. "hamza@example.com" -> "h***@example.com"
//   - NEVER return the raw/full input unless it was already fully masked by the rule above

export type MaskedDestinationLineProps = {
  email: string;
  prefix?: string;    // default: 'We sent a code to '
  testID?: string;
};

export function MaskedDestinationLine(props: MaskedDestinationLineProps): JSX.Element;
// MUST render prefix + maskEmail(email) only. MUST NOT interpolate the raw `email` prop anywhere in output.

// ── 7. ToastBanner ─────────────────────────────────────────────────────
export type ToastBannerTone = 'error' | 'info';

export type ToastBannerProps = {
  message?: string | null;   // falsy (undefined/null/'') => component renders null (hidden)
  tone?: ToastBannerTone;    // default 'error'
  onDismiss?: () => void;    // if provided, render a dismiss control with a >=44x44 tap target
  testID?: string;
};

export function ToastBanner(props: ToastBannerProps): JSX.Element | null;
// This is the presentational primitive only — it renders as a full-width glass-pill row.
// Screen-level fixed/absolute top-of-viewport placement is the CALLING SCREEN's job (MP5/MP6/MP7), not this component's.

// ── 8. SocialAuthButton ────────────────────────────────────────────────
export type SocialAuthProvider = 'google' | 'apple';

export type SocialAuthButtonProps = {
  provider: SocialAuthProvider;
  onPress?: () => void;
  disabled?: boolean;
  gated?: boolean;           // true = visible-but-gated (ADR-7 fallback state): non-interactive, gatedCaption shown, never hidden
  gatedCaption?: string;     // honest caption shown only when gated=true, e.g. "available in the next build"
  testID?: string;
};

export function SocialAuthButton(props: SocialAuthButtonProps): JSX.Element;
// accessibilityLabel is ALWAYS exactly "continue with Google" or "continue with Apple" (computed from `provider`,
// never a prop) — including in the gated state, so a screen reader user still knows what the control represents.
```

---

## Design spec

Everything in this section is embedded **verbatim** from `evidence/scope-hifi-auth.md` (the hi-fi screen spec + canon inventory), except where marked `[note]` — those are resolved conflicts/clarifications you must follow.

### GlassPillInput — spec basis (S03, S04, S05, S05b + canon §3)

> **GlassPillInput** (`COMPONENT-CATALOG.md` §2): `.glass-pill` material, height 52, placeholder paper-40%, focus = 1px orange border + subtle orange glow. Variants: text, email, password (eye toggle), search (leading glyph), multiline (radius 20). Figma light-auth override: white fill, warm-gray border, 14–16px radius, 48–52px height for sign-up/sign-in auth family.

> **Focus indicators** (`COMPACT-CANON.md` §6): 1px orange border (`--glow-you`); focus = subtle orange glow.

> **Screen-reader labels**: password eye toggle → "show password" / "hide password".

> S04 field error: "fields border `rgba(255,255,255,.16)`, paper-100 error glyph, Caption 'that email or password doesn't match.'" — S03 field error: "border red #ef4444, caption 'that email looks invalid'".

**[note] Resolved conflicts for GlassPillInput:**
- **Radius:** build only the non-light-auth variant (see theme.ts note above) — since this component is literally named "glass-**pill**" and the OTP spec explicitly calls itself out as *"not 999 pill radius"* (implying `.glass-pill`'s default IS a full pill), use radius `999` (a bare literal — `Radius` scale tops out at `xl:24` and has no pill value) for `GlassPillInput`. Do not build the 14–16px "light-auth" radius variant (no token for its required white/warm-gray colors exists — see theme.ts note above).
- **Error border color:** canon prose says `#ef4444`, but that hex is not a token in `theme.ts` (it is a *domain-tag* color used elsewhere, unrelated to auth error borders) — use `BalenciaColors.danger` (`#FF6B6B`) for the error border instead, per the "theme tokens only" constraint. Note this substitution is intentional.
- **Glow:** implement focus's "subtle orange glow" using `shadowColor`/`shadowOpacity`/`elevation` sparingly if you want, but it is **not** required for acceptance — the mechanically-checked requirement is the 1px orange border on focus. Error state must have **no glow** ("border + caption, no glow" per this packet's task list) — do not add any shadow/elevation style when `error` is set.
- **Eye toggle glyph:** use text labels **"Show" / "Hide"** (not emoji) as the visible toggle control content — unambiguous, matches the kit's plain-text-and-glyph convention, and the `accessibilityLabel` values are fixed regardless: `"show password"` when the field is currently masked (tap reveals it), `"hide password"` when currently visible (tap masks it again).

### OTPCluster / OTPDigitCell — spec basis (S03b + canon Appendix)

> **S03b—OTP Verification.** Layout: ...four circular OTP cells (56×64 each, 12px gaps)... `OTPCluster/OTPDigitCell` (`.glass-pill` material at radius 14, not 999 pill radius; white circular cells for Figma light-auth override)... **States:** Default (cell 1 auto-focused, numeric keyboard, meter draining, CTA disabled), partial entry (digit scale 0.5→1.0), ... error-invalid (cells 2px orange border, shake 3 oscillations on 3rd miss only), error-expired (solid orange border, no shake, meter jumps empty, resend enabled)...
> **Motion:** ...Digit auto-advance on entry; backspace steps back; clipboard paste of 4-digit code fills all at once...

> Appendix: **OTPCluster / OTPDigitCell** (S03b): `.glass-pill` material at radius 14 (not 999 pill radius). Four cells 56×64px, gap 12px.

> **Focus indicators**: OTP cells: 1.5px burnt-orange border, soft bottom-anchored glow bleed.

**[note]** The paste-friendly single-hidden-`TextInput` mechanism is not itself dictated by the hi-fi spec (which is Figma-visual, not implementation-level) — build it as: one absolutely-positioned `TextInput` (`keyboardType="number-pad"`, `maxLength={length}`, `textContentType="oneTimeCode"` for iOS SMS autofill, `caretHidden`, `value`, `onChangeText`) covering the full cluster bounds with `opacity: 0`, so any tap anywhere in the row opens the keyboard and pasted/autofilled codes land correctly; the visible `OTPDigitCell` row underneath is purely decorative/derived from `value`. Digit auto-advance and backspace-steps-back are automatic side effects of driving all four cells from one text value — no per-cell focus management needed. Shake-on-3rd-miss and the glow-bleed breathing animation are screen/orchestration-level motion (require attempt-counting state) and are **out of scope for this packet** — implement only the static 1.5px active-cell border and the `error` boolean's static border-color swap.

### ChargeMeter — spec basis (S03b, S05 + canon §3)

> ChargeMeter cooldown "Resend code (0:59)" with depleting fill ... `ChargeMeter` (60s orange depletion) ... "Resend cooldown (S03b, S05): real = server/local timer + `ChipProvenance` 'system cooldown', low-confidence = missing retry-after → 'try again in a few minutes' (never fabricated countdown), honest-null = hidden before any resend attempt."

> Resend copy uses `tabular-nums` for countdown sync.

**[note]** `ChargeMeter` renders **only** the track + drain fill + countdown text (e.g. `"0:59"`) — the surrounding `"Resend code (...)"` label and the actual resend `BtnGhost` action are composed by the calling screen (MP5/MP6), matching the catalog which lists `ChargeMeter` and `BtnGhost` (resend) as two separate composable pieces in S03b's component list. The **"honest-null = hidden before any resend attempt"** rule is what `deadline` being absent/null must satisfy — return `null`, render nothing, don't show a `0:00` or any placeholder timer.

### PasswordRequirementList — spec basis (S05b + canon)

> S05b Layout: ...five-item requirement checklist (8+ chars, uppercase, lowercase, number, special char)...
> Copy: "Requirements: '8+ characters' / 'uppercase letter' / 'lowercase letter' / 'number' / 'special character'."
> **Motion:** "Typing: requirement rows crossfade unmet↔met in 160ms." **Reduced-motion:** "checklist ... crossfades ... → instant state changes."
> Appendix: **PasswordRequirementList** (S05b): five deterministic rule rows (icon + label + met/unmet state) for password strength checklist.

Use exactly the copy strings quoted above (see Contract for the rule table). Met rows: green check glyph (`"✓"`, color `BalenciaColors.green`) + `paper100` label. Unmet rows: neutral glyph (`"○"`) + `paper55`/`paper70` label. The met↔unmet transition crossfades over 160ms via `Animated` when `useReducedMotion()` is `false`; when `true`, the state change must be instant (no animation — set the end style directly, duration `0`, or skip `Animated` entirely for that render).

### ConsentCheckbox — spec basis (S03c + canon §8)

> `ConsentCheckbox` (24px visual, orange fill when checked, paper-50 glyph, 6px radius, 44×44pt tap target)... Legal affirmation semantics (vs. Toggle = preference).
> "Required consent unchecked until explicit action. Terms/Privacy checkboxes start empty; never pre-checked."
> Appendix: **ConsentCheckbox** (S03c): 24px visual box, orange fill when checked, paper-50 glyph, 6px radius (square, not pill). 44×44pt tap target independent of containing row.

Implement as: outer `Pressable` with `minWidth: 44, minHeight: 44` (the tap target), centering an inner 24×24 box with `borderRadius: 6`. Unchecked: `backgroundColor: 'transparent'`, `borderWidth: 1`, `borderColor: BalenciaColors.hairlineStrong`. Checked: `backgroundColor: BalenciaColors.orange`, a checkmark glyph (`"✓"`) in `BalenciaColors.paper100` (closest available token to spec's "paper-50" — `paper100` is the only solid paper token in `theme.ts`; there is no separate `paper50` export even though the design doc references "paper-50" as a shade name — use `paper100`). `accessibilityRole="checkbox"`, `accessibilityState={{ checked, disabled }}`, `accessibilityLabel={label}`.

### MaskedDestinationLine — spec basis (S03b, S05 + canon §3, §8)

> "Email masking (S03b, S05): real = masked address (`j***@email.com`), honest-null = generic 'We sent a code to your email' (fabricated addresses forbidden)."
> Appendix: **MaskedDestinationLine** (S05, S03b): renders only masked address, never raw email. Confirmation pattern.
> "We sent a 4-digit code to j***@..." (masked, never raw).

### ToastBanner — spec basis (S03 + canon Appendix)

> `ToastBanner` (non-field errors) ... system error (ToastBanner "We found an existing account")...
> Appendix: **ToastBanner** (S03): top-deploying glass-pill system toast for non-field errors (account-exists, etc.). Distinct from XPToast (gamification-only) and OfflineBanner (connectivity-only); general error-message slot.
> **Motion** (S03): entry stagger not applicable to system toast — use canon default feedback timing: 150–250ms. **[note]** the "slide down 10px + fade" entrance requirement in your task list is this packet's chosen concrete interpretation of that timing budget: `translateY` from `-10` to `0` plus `opacity` from `0` to `1` over `200ms`, `Animated.parallel`, gated by `useReducedMotion()` → instant (`duration: 0`) when reduced motion is on.

### SocialAuthButton — spec basis (canon §8, Button Hierarchy)

> **BtnSecondary** (`COMPONENT-CATALOG.md` §2): `.glass-pill` bg, paper-100 label, 1px border `.10`. Social login use: Google/Apple rounded pills with icon + label, equal visual weight (neither ranked above other per canon 8).
> **Social Authentication Rules (CANON §8):** Google/Apple buttons render as `.glass-pill` rounded pills with icon + label, 44–48px height, **equal visual weight** — neither ranked, no preselection. No social login ranked above another.
> **Screen-reader labels**: Google/Apple buttons → `aria-label="continue with Google"` / `"continue with Apple"`.
> ADR-7 (architecture-plan.md §3): "Fallback (honest, not faked): ... render the 'continue with Google' button as **visible-but-gated** ... 'available in the next build' ... never a fake success, never a dead end."

**[note] Icon placeholder:** no icon-asset library or SF Symbols usage exists anywhere in this kit today (confirmed above — `expo-symbols` is installed but unused by any kit component; every existing icon is a plain-text glyph). This packet does not add an icon dependency. Render a minimal letterform badge as the icon placeholder: a small circle (`~24px`, `borderRadius: 999`, subtle `hairline` border) containing a single bold letter — `"G"` for Google, `""` for Apple, colored `paper100`. This is an explicit, documented placeholder, not a silent gap; swapping in a real brand icon asset is out of scope for MP4. Visible label text beside the badge: `"Google"` / `"Apple"`. Height `48` (`minHeight: 48`), `borderRadius: 999` (full pill), background/border/text using the same `secondary`-tone colors as `button.tsx`'s `toneStyles.secondary` (`inkBrown700` / `hairlineStrong` / `paper100`) so both providers are styled from one shared style function — this is what "equal visual weight" mechanically means here: no per-provider color/size branching beyond the badge letter, label text, and `accessibilityLabel`.

**Gated state:** when `gated` is `true`, the button is non-interactive (`disabled` behavior: `onPress` never fires even if passed, `accessibilityState={{ disabled: true }}`), rendered at reduced opacity (`0.55`, matching `button.tsx`'s disabled convention) but **always visible** (never `return null` / never conditionally unmounted) and shows `gatedCaption` as a small caption line (`paper55`, `fontSize: 12`) beneath the pill.

### Canon rules that apply to every component in this packet

> **Semantic Color Roles (CANON §4, 60/30/10):** Burnt Orange `#FF5E00` (60%) — primary CTA, input focus borders. Forest Green `#34A853` (30%) — completion/success. Royal Purple `#7F24FF` (10%) — CIA voice / AI-projected data ONLY. **None of the components in this packet represent Cia/AI data** — do not use `BalenciaColors.purple`, `.purpleSoft`, or `.purpleText` anywhere in `auth-inputs.tsx`.

> **44px minimum targets** (`COMPONENT-CATALOG.md` usage rules): all interactive elements meet 44×44px. Inputs 52px height, buttons 44–52px height, icon toggles 44–56px.

> **Reduced-motion path** (`prefers-reduced-motion: reduce`): all transitions become instant cuts; shakes skipped; breathing/pulsing glows → fixed static borders.

> **Typography (CANON §5):** Sentence case everywhere. No exclamation marks. All copy strings embedded above must be reproduced exactly as quoted (sentence case, no trailing punctuation beyond what's shown).

> **Motion Primitives (CANON §6):** Easing always physical, never linear; feedback timing 150–250ms for button press/field focus/checkbox-toggle. (This packet's components use plain `Animated.timing` with a fixed duration inside that budget — RN's `Animated` does not require a bezier easing function argument for a simple linear-value `duration`-only tween to satisfy this at the primitive level; if you do pass an `easing` function, use `Easing.out(Easing.cubic)` or similar from `react-native`'s built-in `Easing` module, which is part of `react-native` core, not a new dependency.)

---

## Acceptance criteria (mechanically checkable)

1. `npx tsc --noEmit` (i.e. `npm run typecheck` from `yhealth-app/mobile/`) passes with zero new errors.
2. `src/components/balencia/index.ts` contains exactly six `export * from './...'` lines: the five original ones unchanged, plus `export * from './auth-inputs';`.
3. `auth-inputs.tsx` exports, by name, exactly: `useReducedMotion`, `GlassPillInput`, `GlassPillInputProps`, `GlassPillInputVariant`, `OTPCluster`, `OTPClusterProps`, `OTPDigitCell`, `OTPDigitCellProps`, `ChargeMeter`, `ChargeMeterProps`, `PasswordRequirementList`, `PasswordRequirementListProps`, `PasswordRequirementRuleId`, `ConsentCheckbox`, `ConsentCheckboxProps`, `maskEmail`, `MaskedDestinationLine`, `MaskedDestinationLineProps`, `ToastBanner`, `ToastBannerProps`, `ToastBannerTone`, `SocialAuthButton`, `SocialAuthButtonProps`, `SocialAuthProvider`.
4. Zero new entries in `package.json` `dependencies`/`devDependencies`; `grep -n "^import" auth-inputs.tsx` shows only `react` and `react-native` value/type imports plus one `@/constants/theme` import line.
5. `grep -n "BalenciaColors\.purple" auth-inputs.tsx` returns no matches (no `purple`, `purpleSoft`, `purpleText` usage anywhere in the file).
6. `grep -n "#[0-9a-fA-F]\{3,6\}" auth-inputs.tsx` returns no matches — no raw hex color literals; every color comes through `BalenciaColors.*`.
7. `ConsentCheckboxProps` has no `defaultChecked` field (grep confirms) — `checked` is the only boolean-state prop, required.
8. `ChargeMeter({ deadline: undefined })` and `ChargeMeter({ deadline: null })` both return `null` (no track/text rendered) — verify by reading the function's early-return path.
9. `maskEmail('hamza@example.com') === 'h***@example.com'`; `maskEmail('') === ''`; `maskEmail('notanemail')` does not contain the full original string unmasked (i.e. is exactly `` `n***` `` per the Contract rule) — verify by reading the implementation against the exact rule text in Contract §6 (a future MP9 packet will add an actual unit test file against this same rule).
10. `MaskedDestinationLine` implementation never interpolates the raw `email` prop directly into a `<Text>` child — every rendered string derives from `maskEmail(email)`.
11. `SocialAuthButton`'s computed `accessibilityLabel` is exactly `"continue with Google"` for `provider="google"` and exactly `"continue with Apple"` for `provider="apple"`, in both `gated` and non-`gated` states (grep the two literal strings in the file).
12. Every component that renders an interactive control (`GlassPillInput`'s eye toggle, `ConsentCheckbox`, `SocialAuthButton`, `ToastBanner`'s dismiss control when `onDismiss` is passed) sizes that control's tap area to `>= 44` in both dimensions (`minWidth: 44, minHeight: 44` or equivalent, e.g. `SocialAuthButton`'s `minHeight: 48` already clears the floor).
13. Every component accepts and forwards an optional `testID?: string` prop to its root-rendered element.
14. `useReducedMotion` is defined once in `auth-inputs.tsx`, matches the behavior of the private hook in `states.tsx` (subscribes to `AccessibilityInfo.isReduceMotionEnabled()` and the `'reduceMotionChanged'` event, cleans up the subscription), and every animated component (`PasswordRequirementList`, `ToastBanner`, optionally `ChargeMeter`'s fill) calls it and branches its animation duration/behavior on the result.
15. `OTPCluster` drives all visible cells from a single `TextInput` (grep: exactly one `<TextInput` element in the whole file, since `GlassPillInput` also renders a `TextInput` — confirm by counting: `GlassPillInput` contributes one `TextInput` per instance, `OTPCluster` contributes exactly one more; there must be no per-digit `TextInput`).
16. `npm run lint` (`expo lint`) passes with zero new errors/warnings attributable to `auth-inputs.tsx`.

---

## Out of scope

- Any screen (`src/app/(auth)/*.tsx`) or navigation wiring — that's MP5/MP6/MP7/MP8.
- Any API/service call (`register`, `verifyRegistration`, `forgotPassword`, etc.) — that's MP2 (DTOs) and MP5/MP6/MP7 (wiring).
- `MomentumBar` — not in this packet's component list (the architecture plan's §7 shorthand groups it with `PasswordRequirementList`, but this packet's explicit task scope does not include it; it does not currently exist anywhere in `src/` — confirmed via repo-wide grep — so a future packet must add it if/when S03's password-strength meter is built).
- Shake-on-3rd-miss animation, breathing glow-bleed on OTP focus, and any attempt-counter state for OTP error escalation — screen-level orchestration state, not a primitive concern.
- The Figma "light-auth" white/warm-gray input variant — no backing tokens exist in `theme.ts` (not a target file here).
- `expo-glass-effect` / real native blur — no existing kit component uses it; this packet does not introduce it.
- Unit tests for any of these components or for `maskEmail` — that is MP9's job (Wave 6, depends on MP1/MP2/MP3/MP5/MP6).
- `ChipProvenance` — referenced in the design spec ("system cooldown", "typed live" provenance chips) but not in this packet's component list; it is presumably an existing or future component elsewhere in the kit, out of scope here.
- Any change to `theme.ts`, `button.tsx`, `card.tsx`, `chips.tsx`, `charts.tsx`, `screen.tsx`, or `states.tsx`.
