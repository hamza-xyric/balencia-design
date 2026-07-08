import { Wind, Moon, Zap, Flame, Lock, ChevronRight } from 'lucide-react'
import {
  HifiShell,
  TopBar,
  SectionTitle,
  GlassCard,
  SolidCard,
  Chip,
  Provenance,
  ConsentRail,
  SafetyCard,
  FloatingQuickLog,
} from '@/components/hifi/kit'

export function S53BreathingExercises() {
  return (
    <HifiShell
      header={<TopBar title="Breathing exercises" eyebrow="Wellbeing" back />}
      activeTab="today"
      atmosphere="you"
      bottomAction={<FloatingQuickLog label="Quick log" />}
    >
      <main className="space-y-6 px-4 pb-4 pt-3">
        {/* Hero Summary */}
        <div className="space-y-3">
          <SectionTitle title="Practice summary" meta="All time" />
          <GlassCard tone="you">
            <div className="flex flex-col gap-5 p-5">
              <div className="flex items-end justify-between">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-semibold leading-none text-white tabular-nums">42</span>
                  <span className="text-sm text-white/45">Sessions</span>
                </div>
                <Provenance items={['Via local app', 'You logged']} />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div className="flex flex-col gap-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-semibold leading-none text-white tabular-nums">210</span>
                    <span className="text-xs text-white/45">Min</span>
                  </div>
                  <span className="text-xs text-white/45">Total logged</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-xs text-white/45">Most used technique</span>
                  <span className="text-sm text-white flex items-center gap-1.5">
                    <Wind className="h-4 w-4 text-brand-orange" />
                    Box breathing
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-wider text-white/50">Consistency (8 days)</span>
                  <span className="text-xs text-white/45 tabular-nums">5 of 8</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="h-7 flex-1 rounded-md bg-brand-orange shadow-[var(--glow-orange-sm)]" />
                  <div className="h-7 flex-1 rounded-md bg-white/[0.04]" />
                  <div className="h-7 flex-1 rounded-md bg-brand-orange shadow-[var(--glow-orange-sm)]" />
                  <div className="h-7 flex-1 rounded-md bg-brand-orange shadow-[var(--glow-orange-sm)]" />
                  <div className="h-7 flex-1 rounded-md bg-white/[0.04]" />
                  <div className="h-7 flex-1 rounded-md bg-brand-orange shadow-[var(--glow-orange-sm)]" />
                  <div className="h-7 flex-1 rounded-md bg-brand-orange shadow-[var(--glow-orange-sm)]" />
                  <div className="h-7 flex-1 rounded-md bg-brand-orange shadow-[var(--glow-orange-sm)]" />
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Filters */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight text-white">
              <span className="text-emphasis">Exercises</span>
            </h2>
            <span className="text-xs text-white/45">5 techniques</span>
          </div>
          <div className="flex gap-2 min-h-11 items-center overflow-x-auto -mx-4 px-4 pb-1">
            <Chip tone="you" interactive pressed>All</Chip>
            <Chip interactive pressed={false}>Sleep</Chip>
            <Chip interactive pressed={false}>Stress</Chip>
            <Chip interactive pressed={false}>Energy</Chip>
            <Chip interactive pressed={false}>Focus</Chip>
          </div>
        </div>

        {/* Exercise List */}
        <div className="space-y-3">
          <SolidCard>
            <button type="button" className="flex w-full items-start gap-3 p-4 min-h-[88px] text-left">
              <div className="h-11 w-11 rounded-xl bg-brand-orange/15 flex items-center justify-center shrink-0">
                <Wind className="h-5 w-5 text-brand-orange" />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white text-[15px]">Box breathing</span>
                  <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-royal-purple/20 text-royal-purple">
                    CIA suggested
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-white/50">
                  <span className="tabular-nums">4-4-4-4 pattern</span>
                  <span className="tabular-nums">5 min</span>
                </div>
                <span className="text-xs text-white/70">Good for acute focus</span>
              </div>
              <ChevronRight className="h-4 w-4 text-white/40 shrink-0 mt-1" aria-hidden="true" />
            </button>
          </SolidCard>

          <SolidCard>
            <button type="button" className="flex w-full items-start gap-3 p-4 min-h-[88px] text-left">
              <div className="h-11 w-11 rounded-xl bg-domain-sleep/15 flex items-center justify-center shrink-0">
                <Moon className="h-5 w-5 text-domain-sleep" />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <span className="font-semibold text-white text-[15px]">4-7-8 breathing</span>
                <div className="flex items-center gap-3 text-xs text-white/50">
                  <span className="tabular-nums">4-7-8 pattern</span>
                  <span className="tabular-nums">5 min</span>
                </div>
                <span className="text-xs text-white/70">Good for falling asleep</span>
              </div>
              <ChevronRight className="h-4 w-4 text-white/40 shrink-0 mt-1" aria-hidden="true" />
            </button>
          </SolidCard>

          <SolidCard>
            <button type="button" className="flex w-full items-start gap-3 p-4 min-h-[88px] text-left">
              <div className="h-11 w-11 rounded-xl bg-brand-orange/15 flex items-center justify-center shrink-0">
                <Zap className="h-5 w-5 text-brand-orange" />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <span className="font-semibold text-white text-[15px]">Coherent breathing</span>
                <div className="flex items-center gap-3 text-xs text-white/50">
                  <span className="tabular-nums">5-5 pattern</span>
                  <span className="tabular-nums">10 min</span>
                </div>
                <span className="text-xs text-white/70">Good for balancing stress</span>
              </div>
              <ChevronRight className="h-4 w-4 text-white/40 shrink-0 mt-1" aria-hidden="true" />
            </button>
          </SolidCard>

          <SolidCard>
            <button type="button" className="flex w-full items-start gap-3 p-4 min-h-[88px] text-left">
              <div className="h-11 w-11 rounded-xl bg-brand-orange/15 flex items-center justify-center shrink-0">
                <Flame className="h-5 w-5 text-brand-orange" />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <span className="font-semibold text-white text-[15px]">Wim Hof method</span>
                <div className="flex items-center gap-3 text-xs text-white/50">
                  <span className="tabular-nums">30 breaths</span>
                  <span className="tabular-nums">5 min</span>
                </div>
                <span className="text-xs text-white/70">Good for morning energy</span>
              </div>
              <ChevronRight className="h-4 w-4 text-white/40 shrink-0 mt-1" aria-hidden="true" />
            </button>
          </SolidCard>

          <SolidCard>
            <button type="button" className="flex w-full items-start gap-3 p-4 min-h-[88px] text-left">
              <div className="h-11 w-11 rounded-xl bg-brand-orange/15 flex items-center justify-center shrink-0">
                <Wind className="h-5 w-5 text-brand-orange" />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <span className="font-semibold text-white text-[15px]">Alternate nostril</span>
                <div className="flex items-center gap-3 text-xs text-white/50">
                  <span className="tabular-nums">4-4-4 pattern</span>
                  <span className="tabular-nums">5 min</span>
                </div>
                <span className="text-xs text-white/70">Good for centering</span>
              </div>
              <ChevronRight className="h-4 w-4 text-white/40 shrink-0 mt-1" aria-hidden="true" />
            </button>
          </SolidCard>
        </div>

        {/* Duration Selector (Featuring the Disabled State) */}
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-wider text-white/50">Session length</span>
          <div role="radiogroup" aria-label="Session length" className="grid grid-cols-3 gap-2">
            <button type="button" role="radio" aria-checked={false} tabIndex={-1} className="flex h-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-sm text-white tabular-nums">5 min</button>
            <button type="button" role="radio" aria-checked tabIndex={0} className="flex h-11 items-center justify-center rounded-xl border border-brand-orange bg-brand-orange/10 text-sm text-brand-orange tabular-nums">10 min</button>
            <button type="button" role="radio" aria-checked={false} tabIndex={-1} disabled className="flex h-11 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] opacity-40">
              <Lock className="h-3 w-3 text-white/60" aria-hidden="true" />
              <span className="text-sm text-white/60 tabular-nums">15 min</span>
            </button>
          </div>
          <span className="text-[10px] text-white/45 px-1">15 min available in Plus</span>
        </div>

        {/* Coaching Support Boundary */}
        <div className="px-1">
          <span className="text-xs text-white/55">
            Coaching support, not medical advice.
          </span>
        </div>

        <SafetyCard />

        <div className="pt-2">
          <ConsentRail />
        </div>
      </main>
    </HifiShell>
  )
}