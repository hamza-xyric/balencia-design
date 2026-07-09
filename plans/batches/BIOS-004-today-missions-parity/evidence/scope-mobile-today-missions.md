# BIOS-004: Mobile Implementation Inventory — Today & Missions Scope

**Date:** 2026-07-09  
**Workspace:** `yhealth-app/mobile` (Expo SDK 57, React Native 0.86, TypeScript strict)  
**Git:** Branch `hifi-build` pinned to yhealth-app submodule  

---

## 1. Feature Structure: `src/features/today/` & `src/features/missions/`

### 1.1 Today Screen
**File:** `src/features/today/today-screen.tsx`  
**Hook:** `useOverview()` (from `src/hooks/use-overview.ts`)  
**ViewModel type:** `TodayVM` (see §4)  

**Current UI sections:**
- **Hero card** (GlassCard tone="orange"): Life Power display (numeric + label) + Daily Momentum copy
- **Daily Pulse card**: Metric tiles grid (energy/recovery/stress), quality labels, provenance chips per metric
- **Cia briefing card** (GlassCard tone="purple"): headline copy + StatusChip(tone="purple")
- **Top Priorities card**: up to 3 CardBody rows (action text only)
- **Momentum metrics card**: StatBar-less MetricTiles grid (Streak, XP, Level)
- **Trust gates card**: "Ready when you are" + Status, button link to /data-controls

**Structure:** All cards wrapped in `BalenciaScreen` (eyebrow="Live backend", title="Today", subtitle). Scroll-safe, safe-area-aware.

**States rendered:**
- `pending`: SkeletonState(variant="hero")
- `error || !data`: ErrorState(message, onRetry)
- Success: full card tree

### 1.2 Missions Screen
**File:** `src/features/missions/missions-screen.tsx`  
**Hook:** `useMissions()` (from `src/hooks/use-missions.ts`)  
**ViewModel type:** `MissionsVM` (see §4)  

**Current UI sections:**
- **Summary card** (GlassCard): Summary stats row (active/complete/blocked counts as StatusChips)
- **Mission cards loop** (per mission):
  - View row: CardTitle(mission.title) + StatusChip(tier label, tierTone[tier])
  - CardBody(domain)
  - StatBar(label=mission.status, value=mission.progress, tone by status)
  - Status explanation text (small gray)
  - StatusChip(mission.status, statusTone[status])

**Tier mapping logic (hardcoded in component):**
```typescript
const tierTone = { life: 'orange', main: 'muted', side: 'warning' };
const tierLabel = { life: 'Life Mission', main: 'Main Mission', side: 'Side Mission' };
```

**Status mapping:**
- `active` → green tone
- `complete` → green tone (GlassCard also tinted green)
- `blocked` → warning tone

**States rendered:**
- `pending`: SkeletonState(variant="list", lines=3)
- `error || !data`: ErrorState(message, onRetry)
- `data.missions.length === 0`: HonestNullState ("No missions yet", "Create your first mission with Cia.")
- Success: summary + mission cards

---

## 2. Balencia Components Inventory

**Export path:** `src/components/balencia/index.ts`  
**All exports via re-export from sub-modules.**

### 2.1 Layout & Screen
- **BalenciaScreen** (screen.tsx)
  - Props: eyebrow?, title (ReactNode), subtitle?, children, footer?, withTabPadding?
  - Renders: SafeAreaView (top/left/right) → ScrollView (persistent taps) → header (eyebrow/title/subtitle) + body + footer
  - Applies BottomTabInset padding (auto via withTabPadding=true)
  - BG: ink900

### 2.2 Cards & Surface
- **GlassCard** (card.tsx)
  - Props: children, tone? ('default' | 'orange' | 'green' | 'purple')
  - Rendered: View with tone-specific border & background (hairline/soft tones)
  - Ex: orange → orangeSoft bg + rgba(255,94,0,0.32) border

- **CardTitle** (card.tsx): Text, paper100, fontSize 18, fontWeight 800

- **CardBody** (card.tsx): Text, paper70, fontSize 14, lineHeight 20

- **MetricTile** (card.tsx)
  - Props: label, value (string), detail?, tone?
  - Renders GlassCard(tone) with: label (paper55, 12px uppercase), value (paper100, 28px bold), detail (paper70, 13px)

### 2.3 Charts / Visualizations
- **StatBar** (charts.tsx)
  - Props: label, value (number), max? = 100, tone? = 'orange'
  - Renders: header (label left, rounded value right) + horizontal fill-bar (track height 10px, fill with tone color)
  - Tone colors: { orange: #FF5E00, green: #34A853, purple: #7F24FF }

- **TrendBars** (charts.tsx)
  - Props: values (number[]), tone? = 'green'
  - Renders: vertical bar chart (height 84px, 5 bars flex-spaced), each bar height = (value/max)*72 + 12px min, opacity = 0.48 + (value/max)*0.5
  - **MISSING (NOT YET BUILT):** TrendChart, ProgressRing, GlassStatCard, CIAPresenceOrb

### 2.4 State / Empty / Error / Loading
- **SkeletonState** (states.tsx)
  - Props: lines? = 3, variant? = 'card' | 'hero' | 'list'
  - Animated (useReducedMotion safe): opacity loop 0.4 ↔ 0.8 over 1200ms
  - Variants: hero (single tall block), list (rows w/ avatar + lines), card (title + 2 lines)

- **LoadingState** (states.tsx): SkeletonState + label text

- **ErrorState** (states.tsx)
  - Props: message, onRetry?
  - Renders: title "Needs attention" + message + retry Pressable (if onRetry provided)

- **HonestNullState** (states.tsx)
  - Props: title, detail?
  - Renders: title + optional detail (no CTA, just info)

- **EmptyState** (states.tsx): title + detail (alternative to HonestNullState, currently unused)

- **OfflineBanner** (states.tsx)
  - Props: lastSyncLabel?, onRetry?
  - Renders: warning bg (rgba(245,181,71,0.12)), alert icon, text, optional retry
  - Accessibility: role="alert"

- **LockedFeatureState** (states.tsx)
  - Props: title, detail?, onUnlock?, unlockLabel? = 'Unlock'
  - Renders: lock emoji + title, optional unlock button (Pressable, disabled if !onUnlock)

### 2.5 Chips & Status Indicators
- **StatusChip** (chips.tsx)
  - Props: label, tone? = 'muted'
  - Tones: orange | green | purple | warning | muted (each with soft bg + bold text)
  - Renders: View + Text, min height 24px, borderRadius sm

- **ProvenanceChip** (states.tsx)
  - Props: provenance (Provenance type from @/components/balencia/states)
  - Renders: StatusChip equivalent, tone by provenance.kind (real/low/null)
  - Labels baked into enum (e.g., "via WHOOP", "you logged", "computed")

- **LegacyProvenanceChip** (chips.tsx): StatusChip(warning, "Backend contract pending")

- **ReadinessBadge** (chips.tsx)
  - Props: status ('ready' | 'flagged' | 'waiver')
  - Renders StatusChip w/ label ("Live contract" | "Flag gated" | "Waiver required") + tone

### 2.6 Buttons
- **BalenciaButton** (button.tsx)
  - Props: children, onPress?, tone? = 'primary', disabled?, accessibilityLabel?
  - Tones: primary (orange bg), secondary (inkBrown700 border), quiet (transparent), danger (red 16%)
  - Behavior: 44px min height, scale on press (0.98), opacity on disabled (0.55)
  - All scale transforms use native driver (GPU)

### 2.7 Auth Inputs (BIOS-003 Additions)
**File:** `src/components/balencia/auth-inputs.tsx`

- **GlassPillInput**
  - Props: label, value, onChangeText, variant? = 'text', placeholder?, error?, disabled?, autoFocus?, returnKeyType?, onSubmitEditing?, testID?
  - Variants: text | email | password
  - Password: toggle Show/Hide Pressable
  - Focus states: orange glow (shadowColor, shadowOpacity 0.2, shadowRadius 8) if !error && !reduceMotion
  - Error: danger border color
  - Keyboard types: email-address for email variant, default else
  - Uses `useReducedMotion()` hook

- **OTPCluster**
  - Props: length? = 4, value, onChangeText, onComplete?, disabled?, error?, autoFocus? = true, testID?
  - Renders: 4 decorative OTPDigitCells + hidden TextInput (overlay)
  - Decorative cells: importantForAccessibility="no-hide-descendants"
  - Hidden input: textContentType="oneTimeCode", caretHidden, selectTextOnFocus
  - On complete: fires onComplete callback once

- **OTPDigitCell**
  - Props: index, length, digit, active, error?, testID?
  - Renders: 56x64 box, borderRadius 14, active/error orange border, digit text

- **ChargeMeter**
  - Props: deadline (ms timestamp | null), durationSeconds? = 60, onComplete?, formatLabel?, testID?
  - Renders: horizontal track (height 24, width 100%) with fill % overlay
  - Updates via setInterval (1000ms tick), respects deadlines exactly
  - `null` deadline → returns null (invisible)
  - Returns formatted remaining time (e.g., "1:23")

- **PasswordRequirementList**
  - Props: password, testID?
  - Renders 5 rules: length (8+) | uppercase | lowercase | number | special char
  - Each rule animates in (opacity 160ms, cubic-out) when met; respects reduceMotion
  - Met: green check, paper100 text; Unmet: circle, paper55 text

- **ConsentCheckbox**
  - Props: checked, onChange, label, disabled?, testID?
  - Renders: Pressable row (checkbox + label text)
  - Checked: orange box w/ check; Unchecked: transparent box, strong hairline border

- **MaskedDestinationLine**
  - Props: email, prefix? = 'We sent a code to ', testID?
  - Renders: prefix text + masked email (first char + *** + domain)
  - maskEmail() exported (utility function)

- **ToastBanner**
  - Props: message?, tone? = 'error', onDismiss?, testID?
  - Tones: error (red 12% bg) | info (inkBrown700)
  - Animates in (opacity + translateY, 200ms, cubic-out), respects reduceMotion
  - AccessibilityInfo.announceForAccessibility on show
  - Optional dismiss Pressable (✕ icon)

- **SocialAuthButton**
  - Props: provider ('google' | 'apple'), onPress?, disabled? = false, gated? = false, gatedCaption?, testID?
  - Renders: icon badge (G for google, Apple logo for apple) + label
  - States: interactive | disabled (opacity 0.55) | gated (shows gatedCaption)
  - 48px min height, flex row, gap

---

## 3. Navigation & Tab Bar

**File:** `src/app/(tabs)/_layout.tsx`  

**Current setup:**
- Uses **expo-router NativeTabs** (unstable_native_tabs)
- 4 triggers: today | cia | missions | me
- Each trigger has Label + Icon (SF Symbols or Material Icons fallback)

**NativeTabs config:**
```typescript
backgroundColor={BalenciaColors.inkBrown900}
blurEffect="systemChromeMaterialDark"
disableTransparentOnScrollEdge
iconColor={{ default: paper55, selected: orange }}
indicatorColor={orangeSoft}
labelStyle={{ default: {...}, selected: {...} }}
```

**Icon mapping:**
- today: SF 'sun.max' / 'sun.max.fill' (Material: 'wb_sunny')
- cia: SF 'sparkles' / 'sparkles' (Material: 'auto_awesome')
- missions: SF 'list.bullet.rectangle' / 'list.bullet.rectangle.fill' (Material: 'checklist')
- me: SF 'person.crop.circle' / 'person.crop.circle.fill' (Material: 'account_circle')

**Replacing with custom GlassNavBar implications:**
- Must remove `<NativeTabs>` wrapper
- Routes (`src/app/(tabs)/{today,cia,missions,me}.tsx`) are simple re-exports of screens; wrapping them requires:
  1. Layout that doesn't use NativeTabs (or custom tabBar prop per expo-router API)
  2. Custom component to render bottom nav (44px+ safe-area-aware, glassmorphic tone, touch targets 44px+)
  3. Navigation via useRouter().replace() on tab press (or linking)
  4. Active tab state management (via usePathname or internal state)
  5. Animation on tab switch (scale/opacity) via react-native-reanimated (already in stack)

**Expo Router 57 API note:** unstable_native_tabs was added in SDK 57; custom tabBar property is available but requires manual nav wiring.

---

## 4. View Models & Adapter Signatures

### 4.1 Overview Adapter → TodayVM

**File:** `src/services/adapters/overview.ts`  
**Input DTO:** `OverviewDashboardResponse` (from `/v1/overview/dashboard` endpoint)  
**Hook:** `useOverview()` (uses TanStack React Query, selector: toTodayView)

**TodayVM type:**
```typescript
type TodayVM = {
  lifePower: Metric<number>;
  pulse: {
    score: Metric<number>;
    metrics: {
      key: 'energy' | 'recovery' | 'stress';
      metric: Metric<number>;
      caption: string | null;
      qualityLabel: string | null;
    }[];
    tip: string | null;
    hasWearable: boolean;
  };
  dailyBrief: {
    headline: string | null;
    opportunity: string | null;
    risk: string | null;
    focusAreas: string[];
  };
  priorities: {
    id: string;
    action: string;
    pillar: string;
    priority: 'high' | 'medium' | 'low';
  }[];
  momentum: {
    streak: Metric<number>;
    xp: Metric<number>;
    level: Metric<number>;
    levelName: string | null;
  };
  domains: {
    key: string;
    label: string;
    score: Metric<number>;
    status: 'strong' | 'steady' | 'attention' | 'no_data';
  }[];
  coachPrompts: string[];
  meta: {
    generatedAt: string;
    hasLifeAreas: boolean;
    hasGoals: boolean;
  };
};
```

**Metric<T> type (shared):**
```typescript
type Metric<T = number> = {
  value: T | null;
  display: string;        // formatted string (or '—' for null)
  provenance: Provenance; // { kind: 'real' | 'low' | 'null', ... }
};
```

**Provenance type:**
```typescript
type Provenance =
  | { kind: 'real'; source: 'whoop' | 'self_report' | 'computed' | 'server'; label: string }
  | { kind: 'low'; label: string }
  | { kind: 'null'; label: string };
```

**Key adapter logic:**
- Pulse metrics: `hasWearable` gates whether recovery/stress show "Connect a wearable" vs "Not enough data yet"
- Metric helpers: `realMetric()`, `nullMetric()`, `lowMetric()`, `fromNullable()` (all re-exported from provenance.ts)
- Honesty invariant: never fabricate a number; if null, provenance.kind='null'

### 4.2 Missions Adapter → MissionsVM

**File:** `src/services/adapters/missions.ts`  
**Input DTO:** `UnifiedGoalsResponseDto` (from `/v1/goals/unified` endpoint)  
**Hook:** `useMissions()` (same TanStack Query pattern, selector: toMissionsView)

**MissionsVM type:**
```typescript
type MissionsVM = {
  missions: MissionVM[];
  summary: {
    total: number;
    active: number;
    completed: number;
    avgProgress: number;
  };
};

type MissionVM = {
  id: string;
  title: string;
  description: string | null;
  tier: 'life' | 'main' | 'side';
  status: 'active' | 'blocked' | 'complete';
  progress: number;        // 0–100
  domain: string;
  source: GoalSource;      // 'life' | 'health' | 'finance' | 'career' | ...
  isPrimary: boolean;
  dueDate: string | null;
  target: { current: number; target: number; unit: string } | null;
};
```

**Tier mapping (in adapter):**
- `isPrimary && source === 'life'` → 'life'
- `isPrimary` (other sources) → 'main'
- else → 'side'

**Status mapping:**
- `active | in_progress` → 'active'
- `paused` → 'blocked'
- `completed` → 'complete'

**Summary math:** active = summary.active + summary.inProgress (server groups them separately, adapter unifies)

### 4.3 Hook Patterns

Both hooks follow identical TanStack Query signature:
```typescript
export function useOverview() {
  const { status } = useSession();
  return useQuery({
    queryKey: queryKeys.overview(),
    queryFn: () => apiFetch<OverviewDashboardResponse>('/v1/overview/dashboard'),
    enabled: status === 'authenticated' || status === 'refreshing',
    staleTime: 60_000, // 1 minute
    select: toTodayView, // adapter function
  });
}
```

**Returns:** TanStack Query result: `{ data: TodayVM | undefined, status: 'pending' | 'error' | 'success', refetch }`

**useSession()** provider: tracks auth state, enables query only when authenticated/refreshing (not when unauthenticated/expired)

---

## 5. Animation & Graphics Stack

### 5.1 Available Libraries
**Installed (package.json 57.x stack):**
- ✅ `react-native-reanimated@4.5.0` — GPU-driven animations (Animated.View, Animated.Text, useSharedValue, etc.)
- ✅ `expo-glass-effect@~57.0.0` — glassmorphic blur (native iOS/Android material blur)
- ✅ `expo-symbols@~57.0.0` — SF Symbols on iOS (used in NativeTabs; fallback to Material on Android)
- ✅ `react-native-gesture-handler@~2.32.0` — gesture detection (underlying expo-router)
- ✅ `react-native-safe-area-context@~5.7.0` — SafeAreaView (used in BalenciaScreen)

**NOT installed (gaps):**
- ❌ `react-native-svg` — needed for custom SVG charts (TrendChart, ProgressRing), not yet added
- ❌ `expo-haptics` — needed for haptic feedback (press feedback), not yet added
- ❌ `expo-linear-gradient` — needed for gradient fills, not yet added

### 5.2 Current Animation Usage
**SkeletonState:** `Animated.loop(Animated.sequence([...timing...]))` (opacity pulse), respects useReducedMotion
**Auth components:** Animated opacity/scale on input focus, password requirement rows fade in (cubic-out 160ms), toast slides up (200ms)
**BalenciaButton:** scale(0.98) on press (transform, GPU-safe), no Animated wrapper (CSS-in-JS style)

### 5.3 Expo Go Limitations
**Available in Expo Go (no dev build needed):**
- react-native-reanimated (runtime included)
- expo-glass-effect (native module, built-in)
- expo-symbols (symbol lookup, built-in)
- All safe-area and gesture APIs

**Require dev build (not in Expo Go):**
- Custom native modules (react-native-svg if added)
- expo-haptics (native haptic API)
- expo-linear-gradient (native gradient rendering)

---

## 6. Test Structure

**Test framework:** Vitest (v3.0.0)  
**Location pattern:** `src/**/*.test.ts` (collocated with source)  
**Total test files:** 16 across adapters, auth, query, features

### 6.1 Adapter Tests
**Files:** `src/services/adapters/{overview,missions,*.test.ts}`

**Pattern:**
- Import fixture (from `__fixtures__/index.ts`)
- Unwrap DTO from Envelope<T>.data
- Call adapter function (e.g., toTodayView(dto))
- Assert: field shape, null handling, no fabrication

**Example (missions.test.ts):**
```typescript
describe('Missions Adapter', () => {
  it('correctly maps goal tiers based on source and primary', () => {
    tierCases.forEach(({ source, isPrimary, tier }) => {
      const vm = toMissionsView(mockGoalsDto({ source, isPrimary, status: 'active' }));
      expect(vm.missions[0].tier).toBe(tier);
    });
  });

  it('preserves null values without fabricating', () => {
    // Custom mock proving null handling
  });

  it('is deeply pure', () => {
    const vm1 = toMissionsView(dto);
    const vm2 = toMissionsView(dto);
    expect(vm1).toEqual(vm2); // same input, same output
  });
});
```

**Helper utilities:**
- `collectMetrics(vm)` — walks object tree, collects all Metric<T> fields (for honesty checking)
- `mockGoalsDto(overrides)` — partial goal factory for tier/status mapping tests
- `emptySummary()` — default summary for edge cases

### 6.2 Auth Tests
**Files:** `src/services/auth/{session-machine,device,next-step}.test.ts`  
**Pattern:** Unit tests for state machines, device info, auth step logic

### 6.3 Component Tests
**File:** `src/components/balencia/mask-email.test.ts`  
**Pattern:** Pure function tests (maskEmail utility)

### 6.4 Query & DTO Tests
**Files:** `src/services/query/keys.test.ts`, `src/services/api/dto/dto.satisfies.test.ts`  
**Pattern:** Query key generation, DTO contract validation (TypeScript satisfies)

### 6.5 Integration Test Entry
**Command:** `npm run test` (runs vitest + pre-flight verification script)  
**Pre-flight:** `node ./scripts/verify-mobile-source.mjs` (checks source structure, exports, routes)

---

## 7. Adapters Consumed by Today & Missions Screens

| Screen | Hook | Adapter | Input DTO | ViewModel |
|--------|------|---------|-----------|-----------|
| Today | useOverview | toTodayView | OverviewDashboardResponse | TodayVM |
| Missions | useMissions | toMissionsView | UnifiedGoalsResponseDto | MissionsVM |

Both use identical query pattern: TanStack Query (5.90.12) with 1-min staleTime, session gating, refetch on error.

---

## 8. Component Composition Matrix

### Today Screen hierarchy:
```
BalenciaScreen (eyebrow, title, subtitle, withTabPadding)
├─ GlassCard(tone="orange")
│  ├─ View heroRow
│  │  ├─ Text lifePowerValue
│  │  ├─ CardTitle + CardBody
│  └─ ProvenanceChip
├─ GlassCard
│  ├─ CardTitle "Daily Pulse"
│  ├─ View metrics (3× MetricTile)
│  └─ 3× ProvenanceChip rows
├─ GlassCard(tone="purple") [conditional]
│  ├─ CardTitle + CardBody
│  └─ StatusChip(tone="purple")
├─ GlassCard
│  ├─ CardTitle "Top Priorities"
│  └─ 3× CardBody
├─ GlassCard
│  ├─ CardTitle "Momentum"
│  └─ View metrics (3× MetricTile)
└─ GlassCard
   ├─ CardTitle + CardBody
   ├─ StatusChip(tone="green")
   └─ BalenciaButton(tone="quiet")
```

### Missions Screen hierarchy:
```
BalenciaScreen (eyebrow="Mission Board", title="Missions", subtitle)
├─ GlassCard
│  └─ View row (StatusChip × 3 for summary)
└─ Loop: GlassCard(tone by status)
   ├─ View row (CardTitle + StatusChip[tier])
   ├─ CardBody(domain)
   ├─ StatBar(progress)
   ├─ Text(status explanation)
   └─ StatusChip(mission.status)
```

---

## 9. Missing / Pending Viz Components (for BIOS-004 scope)

**Chart primitives NOT YET IMPLEMENTED:**
- TrendChart — multi-line or area chart (would need SVG or Skia rendering)
- ProgressRing — circular progress indicator (SVG-based)
- GlassStatCard — variant of MetricTile with background animation
- CIAPresenceOrb — Cia indicator orb (animated icon + presence state)

**These would require:**
- react-native-svg (or Skia module) for vector rendering
- Reanimated shared values for subtle animations
- Glassmorphic gradient/blur overlays via expo-glass-effect

---

## 10. Known Constraints & Honesty Invariants

1. **Null handling:** Adapters never fabricate metrics. If value=null, provenance.kind='null' with descriptive label ("Connect a wearable", "Not enough data yet", etc.)

2. **Metric display:** All Metric<T>.display is pre-formatted at adapter time (e.g., "45 bpm", "—"). No component formatting.

3. **NativeTabs tech debt:** Replacing with custom nav requires careful route wiring in expo-router 57; custom tabBar prop or manual Link/useRouter navigation.

4. **No offline sync yet:** useOverview/useMissions have no stale cache fallback. Offline users see ErrorState immediately.

5. **Reduced motion:** SkeletonState, auth components, and ToastBanner all respect AccessibilityInfo.isReduceMotionEnabled(); animations pause/disable accordingly.

6. **Safe area:** BalenciaScreen applies SafeAreaView (top/left/right); tab bar (BottomTabInset) managed via withTabPadding and theme constant.

7. **Provenance is NOT for branding:** Purple tone is reserved for Cia/AI only (per canon §10). Provenance chips use green (real), muted (low), gray (null) — never purple.

---

## Summary

- **Two primary features:** Today (hero metrics + brief + priorities) and Missions (mission board with tier/status/progress)
- **Component library:** 30+ Balencia UI primitives (cards, buttons, state indicators, auth inputs, animations)
- **View model pattern:** Adapters transform DTOs → view models with honesty provenances; hooks consume via TanStack Query
- **Animation stack:** react-native-reanimated 4.5.0 + expo-glass-effect; missing: svg/haptics/gradient libraries
- **Navigation:** NativeTabs ready to swap for custom GlassNavBar (requires route/state wiring)
- **Tests:** Adapter + auth + query layer; strong null/purity coverage
- **Gaps:** TrendChart, ProgressRing, CIAPresenceOrb not yet built; offline sync not implemented

