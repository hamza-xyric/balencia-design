# BIOS-004 Architecture Plan — Today + Missions Hi-Fi Parity + First EAS Build

**Authority:** Architecture Authority (software-architect). **Date:** 2026-07-09.
**Root:** `yhealth-app/mobile` (Expo SDK 57.0.4, RN 0.86, expo-router 57.0.4, Reanimated 4.5). Server read-only unless a verified endpoint fix is required (none identified).
**Design authority:** `Balencia-New-Screens/canon/COMPACT-CANON.md` + `COMPONENT-CATALOG.md`; hi-fi specs S12/S13/S14/S15/S42; `balencia-screens/src/components/hifi/` as rendered reference.
**Binding process:** BIOS-003 GLM file-path bridge lessons (SP2) — packets embed contracts verbatim, never re-emit `package.json`, wrappers run `cat <packet> | ./scripts/glm-worker.sh` and use no file tools; full-file emits must embed exact target or use anchored edits.

---

## 1. Executive Summary

This batch brings **Today (S12)** and **Missions (S13 board + S14 detail + S15 create + S42 celebration)** to hi-fi parity, ships a native **canon viz kit** (TrendChart, ProgressRing, GlassStatCard, CIAPresenceOrb, plus the missing MomentumBar), replaces `NativeTabs` with a custom **GlassNavBar**, and produces the **first TestFlight-internal EAS build** of the integrated app.

Four load-bearing spot-checks changed the plan versus the mobile scout: (1) **react-native-svg / expo-haptics / expo-linear-gradient are all Expo-Go-compatible SDK-57 modules** (present in `node_modules/expo/bundledNativeModules.json`) — the "dev build needed" claim is wrong; all three run in a dev-client simulator build and are natively compiled into the EAS build. (2) expo-router exports a **JS `Tabs` navigator** (`withLayoutContext(BottomTabNavigator)`) that accepts a **custom `tabBar` prop** — this is the GlassNavBar path and it *fixes* the NativeTabs hidden-route limitation. (3) `/v1/goals/unified` is confirmed **read-only**; create/complete live on per-domain surfaces — **life** (`POST/PUT /v1/journal/goals`) is chosen as the primary in-scope write surface, health as documented secondary, career/finance deferred. (4) **XP is never surfaced in completion responses** and, for life/health missions, is mostly awarded by an async ≤15-min job — so the UI must **refetch `/gamification/stats` and celebrate only a confirmed delta**, never a fabricated toast.

Scope is held to the 4-slice cap by an explicit **defer line**: this batch delivers S12 (Today home), the Missions board + create/complete + detail + celebration, the 5 named viz components, and GlassNavBar. **S41/S45/S61/S73/S93 and their bespoke components (ScheduleDonut, TimelineGrid, MoodEmojiPicker, TimelineSpine, EventCard, ImageThumbnailRow, ExpandableList, ConstellationRadar) are deferred to BIOS-005** — building all of them would blow the cap and the premium bar. ConstellationRadar on S13 is rendered in a **deferred-but-honest** ghost state this batch.

Adapters keep their honesty core (`Metric<T>`/`Provenance`); the missions adapter is extended from 3→6 RPG tiers where the server signal supports it (copper/group deferred honestly). Delivery is waved: a lander lays the foundation (deps, tier tokens, motion constants), GLM implements leaf viz components and screen recompositions from verbatim contracts, Sonnet landers verify each wave, Fable verifies and commits. The EAS build uses the `production` profile (autoIncrement → build 11) with `--auto-submit`, waited on via `/loop`, verified VALID through a local-JWT ASC script.

---

## 2. Architecture Decision Records

### ADR-1 — Viz rendering: react-native-svg + Reanimated animatedProps (not Skia, not reanimated-only)
**Decision.** Render path/arc components (ProgressRing, TrendChart, and the deferred TimelineSpine/ContinuousStrokeDivider) with **react-native-svg@15.15.4**; animate SVG geometry via Reanimated `useAnimatedProps` on `Animated.createAnimatedComponent(Circle|Path|Line)` (ring sweep and line-draw = animated `strokeDashoffset`). Box/fill components (GlassStatCard, MomentumBar, StatBar reuse) are **pure Reanimated** (width/opacity/transform) with no SVG. **CIAPresenceOrb** is layered `View`s + a soft radial via **expo-linear-gradient** + Reanimated breathe (scale/opacity), no SVG.
**Why.** svg is the boring, proven RN vector primitive, is Expo-Go-compatible (bundledNativeModules), and `strokeDashoffset` gives clean ring/line draw. Reanimated is already installed (4.5). Gradient/haptics round out canon motion.
**Alternatives rejected.** @shopify/react-native-skia (heavier, not in the Expo Go bundled set, unnecessary for these forms). Reanimated-only rings (can't stroke a circular arc without SVG; hacks with borderRadius are fragile). Victory/Recharts (web-oriented, not RN-native, over-heavy).
**Verified.** `react-native-svg: 15.15.4`, `expo-haptics: ~57.0.0`, `expo-linear-gradient: ~57.0.0` all present in `node_modules/expo/bundledNativeModules.json`.

### ADR-2 — Chart/metric honesty mapping (canon §7 → viz props)
**Decision.** Every viz consumes a `Metric<T>` (or an explicit honesty `state`) and renders one of three states, derived from `provenance.kind`:
- `real` → full geometry (solid orange user line / filled ring / live value) + `ProvenanceChip`.
- `low` → muted geometry + `estimated · low confidence` label + optional purple `ConfidenceMeter` (AI-derived only).
- `null` → **HonestNullState** — no invented geometry: ring ghosted at 0% with "N more days" copy, TrendChart draws axes only, MomentumBar empty track. Never a fabricated number.
TrendChart rules: **<3 points ⇒ dots only, no connecting line**; solid orange = user actual; **dashed purple = projection/inference (Cia only)**; green dots = completion markers; gridlines `rgba(255,255,255,.05)`; no area-fill gradients.
**Why.** The honesty invariant is a critical non-negotiable and already lives in the adapters; components must not re-fabricate. Purple stays reserved for Cia/AI.
**Alternatives rejected.** Component-level formatting/fallbacks (would let a component invent a value the adapter deliberately nulled).

### ADR-3 — Today composition + density tiers (S12); adapters unchanged
**Decision.** Recompose `today-screen.tsx` to the S12 section order: TopBar (greeting + level) → CIA coach card (glow-cia, mood chips as **local UI state only**, no write this batch) → 3× GlassStatCard vitals (from `TodayVM.pulse.metrics`) → domain carousel (`TodayVM.domains` → ChipDomainTag, "View All" → root push `/life-areas`) → Today's Actions (MomentumBar + action rows from `TodayVM.priorities`) → Pinned Missions (2× ProgressRing sourced from **`useMissions()`**, not a TodayVM extension) → FABQuickLog (visual) + GlassNavBar. **Density tiers** (`low|medium|high`, default `medium`) are a screen-local prop gating sparkline presence and optional sections; no persistence this batch.
**Why.** `TodayVM` already carries lifePower, pulse (+provenance), priorities, momentum, domains — no adapter change needed. Pinned missions reuse the existing missions query rather than inflating TodayVM (honest, DRY). Constellation radar hero is a **deferred optional expansion** (ghost state), not built here.
**Alternatives rejected.** Extending `OverviewDashboardResponse`/`TodayVM` for missions (adds server-contract risk for data already available via `useMissions`).

### ADR-4 — Missions tiers + create/complete surfaces + optimistic updates + XP honesty
**Decision — tiers.** Extend the missions adapter from 3→6 RPG tiers using only real server signals (`isPrimary`, `source`, `cadence`):
`isPrimary && source==='life'` → **life (gold)**; `isPrimary` (other source) → **main (silver)**; `cadence==='weekly'` → **weekly (steel)**; `cadence==='daily'` → **daily (sage)**; default → **side (bronze)**. **copper/group is deferred** (no server squad/group signal) — documented, not faked. Metal tokens added to `theme.ts`.
**Decision — create.** Primary in-scope create surface is **life**: `POST /v1/journal/goals` (min body `{category, title}`; no Zod — client validates before send: non-empty title, category in the 14-value `VALID_CATEGORIES`). **Health** create (`POST /assessment/goals`, rich Zod + 3-active cap + safety checks) is documented as secondary/deferred; **career/finance create deferred**. S15 ships as a focused life-mission create (natural-language title + domain/category + type), not the full CIA-planning result state (that is S15-deferred surface area).
**Decision — complete.** `PUT /v1/journal/goals/:id {status:'completed'}` (life) / `PATCH /assessment/goals/:goalId {status:'completed'}` (health). Both idempotent-safe (no XP double-fire risk).
**Decision — optimistic.** TanStack Query mutations with `onMutate` (local status→complete / progress→100, snapshot), `onError` rollback, `onSettled` invalidate `queryKeys.missions()` **and** the gamification stats key.
**Decision — XP honesty.** Completion responses carry **no** XP (server-confirmed). After a successful complete: **refetch `GET /gamification/stats`**, diff `totalXP`/`currentLevel` against a pre-complete snapshot; **celebrate (S42 / XPToast, "you earned it") only on a confirmed positive delta**. For life/health missions XP is usually async (≤15-min achievement job) → completion shows the green done-state with **no XP promise**; never a fabricated toast. Career's sync XP is likewise not in its response → same refetch/diff path.
**Why.** Matches verified server truth; preserves the honesty invariant on the highest-risk (reward) surface.
**Alternatives rejected.** Fabricating an XP toast from client-side XP_VALUES (violates honesty; server values/multipliers not client-authoritative). Wiring a unified complete endpoint (does not exist).

### ADR-5 — GlassNavBar via expo-router JS `Tabs` custom tabBar; preserve root-Stack pushes
**Decision.** Replace `NativeTabs` in `src/app/(tabs)/_layout.tsx` with expo-router `<Tabs>` (the `withLayoutContext(BottomTabNavigator)` export), `screenOptions={{ headerShown:false, tabBarStyle:{display:'none'} }}` (default bar hidden), and `tabBar={(props) => <GlassNavBar {...props} />}`. `GlassNavBar` consumes `BottomTabBarProps` (state/descriptors/navigation), renders the 4-tab IA (Today · Cia · Missions · Me), glass material via **expo-glass-effect `GlassView`** with a translucent-`View` fallback, bottom safe-area via `useSafeAreaInsets`, 44px targets, active = orange filled icon + label (canon). Keep the `useSession` redirect guard. **Hidden/secondary routes stay root `Stack.Screen` pushes** (life-areas, fitness, data-controls, + new mission-detail/create/journal/celebration) — JS Tabs does **not** swallow `router.push` to root routes (unlike NativeTabs), so this migration also fixes the BIOS-002 hidden-route constraint. Modals: S14/S15/S45/S73 = root `Stack.Screen presentation:'modal'`; **S42 celebration = `presentation:'transparentModal'`**.
**Why.** JS Tabs is the standard, documented custom-tabBar API; coexists cleanly with the root Stack; preserves push architecture.
**Alternatives rejected.** Keeping NativeTabs + floating overlay bar (NativeTabs owns native chrome, can't restyle to canon glass; still swallows hidden pushes). Fully hand-rolled layout without a tabs navigator (loses focus/lazy/state restoration).
**Verified.** `exports.Tabs` present in `node_modules/expo-router/build/exports.js`; `TabsClient` is `withLayoutContext(BottomTabNavigator)`.

### ADR-6 — Shared motion system + reduced-motion
**Decision.** New `src/constants/motion.ts`: durations (feedback 150–250ms, sweep 520ms, draw 400ms), easings (`cubic-bezier(0.32,0.72,0,1)`), spring configs (badge `{stiffness:150,damping:15}`), breathe (4s, 55%↔100%). All animated components gate on the existing `useReducedMotion()` hook → **skip to final static state; text updates and haptics still occur**. Breathing is applied **only to hero cards** (one glow rhythm per screen). Animate **transform/opacity only** (no color/blur/shadow animation).
**Why.** One source of truth prevents drift across GLM-authored components; canon-accurate.
**Alternatives rejected.** Per-component magic numbers (drift, inconsistency across parallel packets).

### ADR-7 — Dependencies to add (Expo-Go-safe; lander installs, GLM never touches package.json)
**Decision.** Add exactly three: `react-native-svg`, `expo-haptics`, `expo-linear-gradient`, each via `npx expo install <pkg>` (pins the bundledNativeModules-compatible version). Installed by the **wave-0 lander**, never by GLM (BIOS-003 SP2 lesson: never ask a worker to re-emit package.json).
**Why.** All three are canon-required (svg charts, haptics, gradient orbs/fills) and Expo-Go-compatible; the EAS native build compiles them in.
**Alternatives rejected.** Skia/gesture-heavy alternates (unneeded). Deferring haptics (canon mandates haptic feedback with reduced-motion persistence).
**Verified.** All three present in `bundledNativeModules.json`; scout's "dev-build-needed" claim corrected.

### ADR-8 — EAS build + submit + `/loop` external wait
**Decision.** Local **simulator smoke first** (`simulator` profile dev-client, or dev-client build) exercising Today/Missions + create/complete against the local backend. Then the TestFlight build: `production` profile (`autoIncrement:true` → v1.0.0 build 11), `npx eas build --platform ios --profile production --auto-submit --no-wait`, submit via the existing `eas.json` `submit.production.ios` ASC config. Wait via **`/loop` self-paced wakeups** (external, ~41-min precedent) polling `eas build:list`/`eas submit` status. Verify ASC `processingState: VALID` via a **local-JWT ASC script** (`scripts/verify-asc-state.sh`, ES256 from the gitignored `.p8`) — eas-cli has no submission-list command. Version stays 1.0.0 (no OTA runtime bump; same runtime).
**Why.** Mirrors the proven build-10 flow; internal group needs no beta-review metadata (W3).
**Alternatives rejected.** `preview` profile (internal dist but not the store/TestFlight submit lane build-10 used). Blocking synchronous wait (Forgeflow forbids foreground sleep; `/loop` is the sanctioned external-wait primitive).

### ADR-9 — What does NOT change
Adapter honesty core (`Metric`/`Provenance`, `realMetric/nullMetric/lowMetric/fromNullable`); `TodayVM` shape; session gating + `useSession`; TanStack query keys/patterns; root providers; **all BIOS-003 auth flows and components**; the server (no route changes — none required). The existing `ChargeMeter` (OTP countdown in `auth-inputs.tsx`) is **untouched** and stays for auth.

### ADR-10 — Naming collision + component scope discipline
**Decision.** The canon **ChargeMeter** (depletable capacity, S41) collides with the existing OTP-countdown `ChargeMeter`; since S41 is deferred, **do not build the canon ChargeMeter this batch** — when built (BIOS-005) it ships as **`CapacityMeter`** to disambiguate. This batch builds exactly: **ProgressRing, TrendChart, GlassStatCard, CIAPresenceOrb, MomentumBar** (missing) + reuses **StatBar**; plus **GlassNavBar**. All other "NEW" catalog components map to deferred screens and are **out of scope**.
**Why.** Holds the 4-slice cap and the premium bar; avoids a name clash regression.

---

## 3. Component Contracts (exact props/types)

> All components: `'use client'`-free RN; import tokens from `@/constants/theme` and `@/constants/motion`; gate animation on `useReducedMotion()`; expose `testID?`; 44px min interactive targets; a11y labels on glyphs.

```ts
// src/components/balencia/viz/ProgressRing.tsx
export type Honesty = 'real' | 'low' | 'null';
export interface ProgressRingProps {
  progress: number;              // 0..100 (clamped internally)
  size?: number;                 // px, default 96
  stroke?: number;               // 6..8, default 8
  state?: Honesty;               // default 'real'
  centerLabel?: string | null;   // tabular-nums KPI; omit for ambient-frame variant
  glyph?: React.ReactNode;       // ambient-frame variant (badge instead of number)
  glow?: 'you' | 'done' | 'cia'; // default 'you'; orange until 100, green at 100
  animateOnMount?: boolean;      // default true; 0→progress sweep 520ms
  testID?: string;
}
// track rgba(255,255,255,.08); real=orange→green@100; null=ghost ring + honest copy via caller.
```
```ts
// src/components/balencia/viz/TrendChart.tsx
export interface TrendPoint { x: number|string; y: number|null; kind?: 'actual'|'projected'|'marker'; }
export interface TrendChartProps {
  points: TrendPoint[];          // <3 non-null actual points ⇒ dots only, no line
  height?: number;               // default 160
  state?: Honesty;               // low ⇒ muted; null ⇒ axes only + HonestNull caller copy
  showProjection?: boolean;      // dashed purple line for kind:'projected'
  onScrub?: (p: TrendPoint) => void; // long-press crosshair
  testID?: string;
}
// solid orange actual; dashed purple projected (Cia-only); green marker dots; gridlines rgba(255,255,255,.05); no area fill.
```
```ts
// src/components/balencia/viz/GlassStatCard.tsx
export interface GlassStatCardProps {
  overline: string;
  metric: Metric<number|string>;     // display + provenance drive real/low/null
  delta?: { value: string; tone: 'up'|'down'|'flat' } | null;
  variant?: 'metric' | 'ring' | 'sparkline'; // ring→embeds ProgressRing; sparkline→TrendChart mini
  glow?: 'you' | 'done' | 'cia';
  flush?: boolean;                    // celebration sub-mode: no border/blur/shadow
  sparkline?: number[];               // sparkline variant only
  testID?: string;
}
// renders ProvenanceChip from metric.provenance; null ⇒ '—' + honest-null label, never fabricated.
```
```ts
// src/components/balencia/viz/CIAPresenceOrb.tsx
export interface CIAPresenceOrbProps {
  state?: 'idle' | 'listening' | 'thinking'; // idle breathe 4s; listening ring pulse; thinking shimmer
  size?: number;                     // default 72
  testID?: string;
}
// purple-core radial (expo-linear-gradient) + Reanimated breathe; reduced-motion ⇒ static glow. Purple ONLY on Cia surfaces.
```
```ts
// src/components/balencia/viz/MomentumBar.tsx
export interface MomentumBarProps {
  value: number; max?: number;       // cumulative progress framing
  state?: Honesty;                   // null ⇒ empty track + honest copy
  label?: string;                    // tabular-nums value
  glow?: 'you' | 'done';             // default 'you'
  testID?: string;
}
```
```ts
// src/components/balencia/chrome/GlassNavBar.tsx  (consumes React Navigation BottomTabBarProps)
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
export function GlassNavBar(props: BottomTabBarProps): JSX.Element;
// 4 tabs Today·Cia·Missions·Me; active = orange filled icon+label, inactive paper55;
// expo-glass-effect GlassView (fallback translucent View); useSafeAreaInsets bottom pad; 44px targets;
// onPress → navigation.navigate(route.name) with focus de-dupe; Reanimated scale .96 press (reduced-motion safe).
```

---

## 4. Screen Composition Maps

### 4.1 Today (S12) — `src/features/today/today-screen.tsx`
| # | Section | Components | VM fields |
|---|---------|-----------|-----------|
| 1 | TopBar | greeting + level chip | `TodayVM.momentum.level`, meta |
| 2 | CIA coach card (glow-cia) | GlassCard.hero + CIAPresenceOrb + mood chips (local) | `TodayVM.dailyBrief.headline`, `coachPrompts` |
| 3 | Vital metrics ×3 | GlassStatCard(metric) + ProvenanceChip | `TodayVM.pulse.metrics[].metric` |
| 4 | Domain carousel | ChipDomainTag ×N + "View All"→push `/life-areas` | `TodayVM.domains` |
| 5 | Today's actions | MomentumBar + action rows w/ CheckboxControl | `TodayVM.priorities`, `momentum` |
| 6 | Pinned missions ×2 | GlassStatCard(ring) / ProgressRing | `useMissions()` primary missions (top 2) |
| 7 | Persistent | FABQuickLog (visual) + GlassNavBar | — |
**Copy (exact):** greeting "Good Morning, {name}"; coach "What needs your attention today?"; "View All"→/life-areas. Density: `medium` default (sparklines hidden at `low`). Motion: staggered entries 80ms; breathe **only** on the coach hero.

### 4.2 Missions board (S13) — `src/features/missions/missions-screen.tsx`
| # | Section | Components | VM fields |
|---|---------|-----------|-----------|
| 1 | TopBar "your missions" | journal + filter glyphs (44px) | — |
| 2 | Summary band | 3× GlassStatCard (ACTIVE/DONE/STREAK) + MomentumBar (XP→next tier) | `MissionsVM.summary`, gamification stats |
| 3 | Status tabs + filter chips | SegmentedTabs (active/done/all) + tier filter chips | local filter state |
| 4 | Life-areas radar | **ConstellationRadar ghost (deferred)** — honest-null placeholder | `TodayVM.domains` (later) |
| 5 | Mission list | SolidCard rows + embedded ProgressRing + tier metal StatusChip | `MissionsVM.missions[]` (6-tier) |
| 6 | Persistent | FABQuickLog (→ S15 create) + GlassNavBar | — |
**Tier colors (theme tokens):** life=gold, main=silver, side=bronze, weekly=steel, daily=sage, group=copper(deferred). Honest-null on all summary metrics.

### 4.3 Mission detail (S14) — root modal `src/app/mission-detail.tsx`
Hero ProgressRing (72% sweep on mount) → Display title + 2 ChipDomainTag → KPIRow (Actions/Streak/XP, per-stat provenance) → CIAInsightCard (glow-cia) → ActionCheckCard (complete action → optimistic mutation) → accordions read-only/collapsed (ALL ACTIONS / PROGRESS = TrendChart); other accordions deferred-ghost. Reads a `MissionVM` passed by id.

### 4.4 Create mission (S15) — root modal `src/app/mission-create.tsx`
GlassPillInput (title) → domain/category selector (ChipDomainTag → life `VALID_CATEGORIES`) → SegmentedTabs (mission type) → BtnPrimary "Create mission" (enabled when title + category valid) → `POST /v1/journal/goals`. CIA-planning result state deferred.

### 4.5 Celebration (S42) — root transparentModal `src/app/celebration.tsx`
Fired **only on confirmed gamification-stats delta** after a complete. FrostCard (glow-done) → ProgressRing frame + neutral badge → GlassStatCard(flush) "+{delta} XP · you earned it" → ContinuousStrokeDivider (deferred→simple line this batch) → CIAInsightCard → BtnPrimary "continue". Reduced-motion: no particles, instant, dismiss immediately.

---

## 5. Packet Decomposition for GLM (file-path bridge)

**Rules (BIOS-003 binding).** Each packet embeds its contract + motion/theme constants **verbatim**; targets a **new file** where possible (copy task) or specifies **anchored region edits** for shared files; **never emits package.json**; lists exact **dependency files** the lander must have landed first. Wrappers run `cat plans/batches/BIOS-004-today-missions-parity/packets/<packet>.md | ./scripts/glm-worker.sh` and use **no file tools**; drafts land in `evidence/glm-drafts/`. Sonnet landers verify + typecheck + apply; Fable verifies + commits.

| Wave | Packet | Owner | Target file(s) | Depends on |
|------|--------|-------|----------------|-----------|
| **0** | Foundation (deps + tokens + motion) | **Lander (not GLM)** | `npx expo install react-native-svg expo-haptics expo-linear-gradient`; add metal tier tokens to `constants/theme.ts`; create `constants/motion.ts` | — |
| **1a** | ProgressRing | GLM | `components/balencia/viz/ProgressRing.tsx` (+test) | W0 |
| **1b** | TrendChart | GLM | `components/balencia/viz/TrendChart.tsx` (+test) | W0 |
| **1c** | GlassStatCard | GLM | `components/balencia/viz/GlassStatCard.tsx` | W0, 1a, 1b |
| **1d** | CIAPresenceOrb | GLM | `components/balencia/viz/CIAPresenceOrb.tsx` | W0 |
| **1e** | MomentumBar | GLM | `components/balencia/viz/MomentumBar.tsx` | W0 |
| **1f** | viz barrel export | Lander | `components/balencia/viz/index.ts` + `components/balencia/index.ts` edit | 1a–1e |
| **2a** | GlassNavBar | GLM | `components/balencia/chrome/GlassNavBar.tsx` | W0 |
| **2b** | tabs layout rewrite | Lander | `app/(tabs)/_layout.tsx` (anchored: NativeTabs→Tabs+tabBar); root `_layout.tsx` add modal routes | 2a |
| **3a** | missions adapter 6-tier | GLM | `services/adapters/missions.ts` (anchored tier fn) + `missions.test.ts` | W0 |
| **3b** | mission mutations (create/complete optimistic + stats-diff) | GLM | `hooks/use-mission-mutations.ts` (+test) | 3a |
| **4a** | Today recompose | GLM | `features/today/today-screen.tsx` | 1*, 2* |
| **4b** | Missions board recompose | GLM | `features/missions/missions-screen.tsx` | 1*, 3* |
| **4c** | Mission detail + create + celebration modals | GLM | `app/mission-detail.tsx`, `app/mission-create.tsx`, `app/celebration.tsx` | 1*, 3* |

Waves 1a–1e are mutually independent (parallel fan-out, throttled per the 429 lesson). Shared files (`theme.ts`, both `_layout.tsx`, `missions.ts`) are single-owner packets to avoid write conflicts.

---

## 6. Test Plan

**Unit (Vitest, collocated).**
- `missions.test.ts` — 6-tier mapping table (life/main/side/weekly/daily; copper/group→documented default), status mapping, deep purity, no-fabrication (`collectMetrics`).
- `use-mission-mutations.test.ts` — optimistic set + rollback on error; `onSettled` invalidates missions + gamification keys; **XP honesty**: no XP emitted unless a positive stats delta is observed.
- Component logic tests where logic exists: ProgressRing clamp (>100, <0, null-ghost); TrendChart `<3 points ⇒ dots-only`; GlassStatCard null→`'—'`+honest label (never a number); tier→metal token resolution.
**Static gate.** `npm run lint && npm run typecheck && npm run test` + `node ./scripts/verify-mobile-source.mjs`.
**Config/export.** `npx expo config --type public`; `npx expo export --platform web --output-dir dist-smoke`.
**Simulator parity smoke (script `evidence/simulator/smoke.sh`).** Boot iOS sim (dev-client `simulator` profile), sign in seeded user against local backend, navigate Today→Missions→create→complete; capture screenshots vs `Balencia-New-Screens/.../screenshots/` for S12/S13; **exercise endpoints** (`POST /v1/journal/goals`, `PUT .../:id {status:'completed'}`, `GET /gamification/stats` before/after) and log the XP delta (proves no fabrication). Capture GlassNavBar + all 4 tabs + one hidden root push (life-areas) to prove push architecture intact.
**EAS evidence (`evidence/eas/`).** build id, submission id, ASC `processingState: VALID` from the JWT script, TestFlight internal-group availability.

---

## 7. Risks

1. **react-native-svg + Reanimated animatedProps on RN 0.86 new-arch** — verify `createAnimatedComponent(Circle)` + `useAnimatedProps(strokeDashoffset)` works before fanning out charts; fallback = Reanimated width-based ring approximation. *Mitigate in W1a first, gate W1b/1c on it.*
2. **expo-glass-effect `GlassView` availability/perf on simulator** — fallback translucent `View` + hairline border baked into GlassNavBar from the start.
3. **6-tier mapping under-determined** (no server squad/group or reliable weekly/daily cadence on all sources) — honest deferral of copper/group; document derivation; never guess a tier.
4. **XP async (≤15-min job)** means life/health completions usually show no immediate XP — UX must present the green done-state without implying a reward; celebration only on confirmed delta. *This is the highest honesty-risk surface.*
5. **NativeTabs→JS Tabs migration regressions** — deep links, hidden root pushes, session redirect. *Mitigate: smoke every root push + all 4 tabs.*
6. **EAS queue time** (~41-min precedent) — handled by `/loop` external wait; do not block.
7. **Scope creep** into deferred screens/components — the ADR-10 defer line is binding; stop-condition on any attempt to build S41/S45/S61/S73/S93 or their bespoke components.

---

## 8. Open Questions (genuinely undecidable — decided-with-flag, not blocking)

1. **Primary create surface = life (`/v1/journal/goals`).** Decided (simplest editable contract, matches life-domain "Missions" framing). *Flag: reversible to health if Hamza wants Zod-validated + safety-checked creation as the default; would swap the S15 mutation target only.*
2. **Defer S41/S45/S61/S73/S93 + ConstellationRadar/ScheduleDonut/TimelineGrid/MoodEmojiPicker/TimelineSpine to BIOS-005.** Decided to hold the 4-slice cap + premium bar. *Flag: if Hamza wants a specific one of these in-scope, it displaces an equal chunk of S14/S15 depth.*
3. **Apple team type (W2) / TestFlight beta metadata (W3)** — owner Hamza; not blocking internal-group build (precedent build 10). No action needed from this batch beyond the internal build.

---

## 11. Fable acceptance amendments (2026-07-09) — plan ACCEPTED WITH AMENDMENTS A1–A6

Sonnet adversarial review (`architecture-plan-review.json`): **approve-with-changes** (1 blocker, 4 majors, 5 minors). Adjudication:

- **A1 (B1 — S14 accordions):** ALL FIVE accordions render this batch. ALL ACTIONS + PROGRESS are data-backed. MILESTONES renders real milestones when the per-domain detail supplies them, else canon honest-null ("No milestones yet"). CIA REASONING and CROSS-DOMAIN LINKS render **visible-but-gated** with provenance copy (reasoning/LCM arrive with the Cia/LCM lanes — BIOS-005/006), per canon §8 — visible, honest, never fabricated, never silently dropped. scope-hifi §8 checklist amended accordingly.
- **A2 (M1):** `journal` removed from ADR-5's route list; the S13 TopBar journal glyph is hidden this batch (S73 → BIOS-005).
- **A3 (M2):** new lander task authors `scripts/verify-asc-state.sh` (local ASC JWT → API build/processing state; approach per READINESS-001 evidence). Fallback if the script can't be completed in-batch: `eas build:list` + documented manual ASC check (waiver-noted, not assumed).
- **A4 (M3):** Expo-Go-compatibility claim reworded to evidence level: versions confirmed in `bundledNativeModules.json` + package pins; **empirical gate at Wave-1 land** — Expo Go must load a screen importing react-native-svg/expo-haptics/expo-linear-gradient; if the Go binary lacks any, simulator smoke pivots to an EAS dev-client simulator build (documented fallback, budget-approved as part of the build slice).
- **A5 (M4):** Wave 4a depends-on corrected to `1*, 2*, 3a`.
- **A6 (minors, binding at packet composition):** import `Tabs` from `expo-router/js-tabs` (non-deprecated path); GlassNavBar contract gains explicit floating-pill geometry (margins/radius/width per catalog); S42 keeps Display "+120" / subcopy "XP" / ChipProvenance "you earned it" as three separate elements; client `VALID_CATEGORIES` pinned by a unit test against the server list (documented drift tripwire); ADR-4's career-XP sentence labeled a BIOS-005 forward note.
