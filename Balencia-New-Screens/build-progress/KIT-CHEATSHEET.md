# Hi-Fi Build Cheat-Sheet — kit API + hard gates

Feed this to every drafting/building agent. Violations fail `npm run check`.

## Locked decisions
- **Dark glass only.** Ignore any "warm-light Figma parity" passage in specs — render the dark premium variant. (Founder decision 2026-07-08.)
- **CIA**, never SIA, in all visible copy, names, data.
- **"Mission(s)"**, never "goal(s)", in visible copy (RPG terminology). Spec headings like "ACTIVE GOALS" render as "Active missions".
- Persona coherence (from `src/data/hifi/persona.ts`): Amira, **Lv 12** (specs showing other levels are drift — use 12), 72 bpm via WHOOP, 8.2k steps you logged, 7.5h sleep via Health, missions "Run a half marathon" 68% / "Save $5,000 by December" 42%, buddy Aisha Khan.

## File shape
```tsx
import { SomeIcon } from 'lucide-react'
import { Chip, GlassCard, HifiShell, TopBar /* … */ } from '@/components/hifi/kit'

export function S26FitnessDashboard() {
  return (
    <HifiShell header={<TopBar title="…" />} activeTab="today" bottomAction={<FloatingQuickLog />}>
      <main className="space-y-4 px-4 pb-4 pt-3">…</main>
    </HifiShell>
  )
}
```
- File: `src/components/hifi/screens/<family>/S{id}{PascalName}.tsx`. Register in the family `index.ts` map (`'26': S26FitnessDashboard`).
- Server components only: **no `'use client'`, no framer-motion, no hooks, no event handlers.** Static compositions; motion via existing CSS classes only.
- Icons: **lucide-react only**, named imports.

## Kit API (import from `@/components/hifi/kit`)
- `HifiShell {header?, activeTab?: 'today'|'cia'|'goals'|'me', composer?, bottomAction?, showTabBar?, atmosphere?: 'you'|'cia'}` — the only screen wrapper. Never import PhoneFrame/ScreenShell.
- `TopBar {title, eyebrow?, right?, back?}` · `IconButton {label}` (aria) · `SectionTitle {title, meta?}` · `FloatingQuickLog {label?}` · `GlassNavBar` (via HifiShell) · `StepperRail {steps: string[], current}`
- `GlassCard {tone?: 'you'|'done'|'cia'|'muted'}` — canon glass + semantic inner glow, ONE per card, meaning-driven. `SolidCard` — data-dense surfaces.
- `Chip {tone?}` · `Provenance {items: string[]}` · `ConsentRail {compact?}`
- `BtnPrimary {disabled?}` (ONE per screen, h-52) · `BtnSecondary` · `BtnGhost {quiet?}` · `BtnCoach` · `BtnSuccess` · `GlassPillInput {icon?, placeholder, value?, trailing?, focused?}` · `ComplianceFooter {links?}`
- `CIAInsightCard {eyebrow?, provenance?: string[], actions?}` · `CIAPresenceOrb {size?, state?}` · `Composer {placeholder?}` · `VoiceComposer` · `ChatBubble {speaker, tone?}` · `InlineArtifact`
- Viz: `ProgressRing {percent, value, label?, size?, tone?, ghost?}` · `MomentumBar {value, label?}` · `ChargeMeter {ticks?, filled, label?}` · `TrendChart {past: number[], projected?, milestones?: number[], height?, label?}` · `HeatGrid {values: number[] /*0-3*/, columns?}` · `VolumeBars {current, previous, labels?}` · `DonutHub {segments: [{percent, className}], value, label?}` · `ProgressBar {value, tone?}` · `MetricPill {label, value, tone?}` · `MiniRadar` · `Sparkline {tone?}`
- `SafetyCard` — crisis resources (mandatory on mood/stress/journal/check-in surfaces).

## Color/style gates (verify:brand)
- **No raw hex or rgba() anywhere in components.** Tokens and Tailwind semantic classes only: `text-brand-orange`, `bg-forest-green`, `text-royal-purple`, `bg-ink-900`, `text-white/45`, `bg-white/[0.04]`, `border-white/10`.
- Shadows/glows only via vars: `shadow-[var(--glow-orange-sm)]` etc. Never `shadow-black` or rgba(0,0,0,…).
- Purple = CIA/AI/projected ONLY. Orange = user effort/CTA. Green = done/positive.
- Domain colors via `Chip` or `bg-domain-fitness/15 text-domain-fitness` classes — tags only, never chrome.

## Copy gates (verify:copy)
- Sentence case everywhere; every visible text fragment starts uppercase (mid-sentence emphasis spans are the only exception).
- **No exclamation marks.** No hype words: crush, hustle, dominate, finally, no excuses.
- Exactly ONE serif emphasis word per screen: `<span className="text-emphasis">word</span>` (the spec names it, e.g. *dashboard*).
- Numbers/stats get `tabular-nums` class.

## Never invent policy or privacy claims
NEVER write retention windows ("deleted within 24 hours", "kept 7 days"), processing-location claims ("processed locally", "never leaves your device"), or confidence percentages unless the spec literally states them. Name control CATEGORIES instead (source, retention, export, revoke, delete). Charts never announce fabricated series as "real values".

## Honesty invariant (canon §7)
Every metric shows one of: **real** (value + `Provenance` chip, e.g. "Via WHOOP", "You logged"), **estimate** (muted value + "Estimated · low confidence"), **honest-null** (designed empty: "Not enough data yet — 3 more days", never a fake number or bare zero-bar).

## A11y
- 44px min targets (`h-11`/`min-h-11` on interactive rows/buttons).
- `aria-label` on every glyph-only control (`IconButton` handles it).
- Charts carry `role="img"` + aria-label (kit viz components handle it).

## Consent & safety
- Health/photo/voice/3rd-party surfaces: visible "Data sources" entry + `ConsentRail` (source/retention/export/revoke/delete).
- Health advice boundary line where spec names it (quiet caption, e.g. "Coaching support, not medical advice").
- No gamified distress: streaks/XP never attach to mood, medication, crisis surfaces.
