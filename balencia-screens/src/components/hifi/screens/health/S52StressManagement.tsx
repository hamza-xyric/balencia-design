import { Shield, MoreHorizontal } from 'lucide-react'
import {
  HifiShell,
  TopBar,
  GlassCard,
  SolidCard,
  ProgressRing,
  ChargeMeter,
  GlassPillInput,
  BtnPrimary,
  BtnGhost,
  TrendChart,
  Chip,
  Provenance,
  SafetyCard
} from '@/components/hifi/kit'

export function S52StressManagement() {
  return (
    <HifiShell
      header={
        <TopBar
          title={<>Stress <span className="text-emphasis">management</span></>}
          right={
            <button
              type="button"
              aria-label="Overflow menu containing crisis resources"
              className="relative flex h-11 w-11 items-center justify-center text-white/60 hover:text-white"
            >
              <MoreHorizontal className="h-5 w-5" />
              <Shield className="absolute bottom-1.5 right-1.5 h-3 w-3 text-brand-orange" />
            </button>
          }
        />
      }
      activeTab="today"
      atmosphere="you"
      showTabBar
    >
      <main className="space-y-4 px-4 pb-6 pt-3">
        {/* HERO: COMPOSITE STRESS SCORE */}
        <GlassCard tone="you">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">Current stress level</span>
            <Chip tone="muted">3.2 out of 10</Chip>
          </div>

          <div className="mt-4 flex items-center gap-6">
            <ProgressRing
              percent={32}
              value="3.2"
              label="Mod"
              tone="you"
              size={120}
            />
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/50">Body</span>
                <span className="tabular-nums text-white">2.1</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/50">Sleep</span>
                <span className="tabular-nums text-white">4.5</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/50">Behavior</span>
                <span className="tabular-nums text-white">3.0</span>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/70">Mental capacity left today</span>
              <span className="tabular-nums text-sm text-white">60%</span>
            </div>
            <ChargeMeter filled={6} ticks={10} />
          </div>

          <div className="mt-4">
            <Provenance items={['Derived today', 'Via WHOOP']} />
          </div>
        </GlassCard>

        {/* QUICK LOG */}
        <SolidCard>
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">Quick log</h2>
          <p className="mt-2 text-[15px] leading-5 text-white">How are you feeling right now?</p>

          {/* Static Slider Representation */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-white/40">
              <span>Calm</span>
              <span className="text-white/60">5</span>
              <span>Overwhelmed</span>
            </div>
            <div className="relative mt-2 flex h-11 items-center" role="img" aria-label="Stress level slider at 5 of 10">
              <div className="h-1 w-full rounded-full bg-white/10" />
              <div className="absolute h-1 w-1/2 rounded-full bg-brand-orange" />
              <div className="absolute left-1/2 top-1/2 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-brand-orange bg-ink-900 shadow-[var(--glow-orange-sm)]" />
            </div>
          </div>

          {/* Trigger Chips */}
          <div className="mt-4">
            <div className="text-xs text-white/40">Triggers</div>
            <div className="mt-2 flex flex-wrap gap-2">
              <Chip interactive pressed={false}>Work</Chip>
              <Chip interactive pressed={false}>Time</Chip>
              <Chip interactive pressed={false}>Finance</Chip>
              <Chip interactive pressed={false}>Other</Chip>
            </div>
          </div>

          <div className="mt-4">
            <GlassPillInput placeholder="Add a note" />
          </div>

          <div className="mt-4">
            <BtnPrimary>Log stress</BtnPrimary>
          </div>
          <p className="mt-3 text-center text-xs text-white/55">
            Coaching support, not medical advice. Notes are private by default.
          </p>
        </SolidCard>

        {/* CIA NOTE */}
        <GlassCard tone="cia">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-royal-purple/80">CIA synthesis</span>
          <p className="mt-2 text-[15px] leading-5 text-white/90">
            Work stress has been your top trigger this week. A 5-min breathing exercise after lunch could help.
          </p>
          <div className="mt-4 flex gap-2">
            <BtnGhost>Ask CIA</BtnGhost>
            <BtnGhost quiet>Ignore</BtnGhost>
          </div>
        </GlassCard>

        {/* TREND CARD */}
        <SolidCard>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">Stress trend</span>
            <div className="flex gap-1">
              <Chip tone="you" interactive pressed>7d</Chip>
              <Chip interactive pressed={false}>14d</Chip>
            </div>
          </div>

          <div className="mt-3 flex items-baseline gap-3">
            <span className="text-[24px] font-semibold text-white tabular-nums">4.8</span>
            <span className="text-xs text-white/45">Avg</span>
            <div className="ml-auto flex items-center gap-1 text-xs text-forest-green">
              <span className="tabular-nums">12%</span>
              <span className="text-white/45">Vs last week</span>
            </div>
          </div>

          <div className="mt-4">
            <TrendChart
              past={[5.2, 6.1, 5.5, 4.8, 4.2, 4.9, 4.8]}
              projected={[4.5, 4.2, 3.9]}
              height={80}
              label="Stress level trend over 7 days with projection"
            />
          </div>
          
          <div className="mt-4">
            <Provenance items={['You logged', 'Via WHOOP']} />
          </div>
        </SolidCard>

        {/* RECOVERY CARD */}
        <SolidCard>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">Mental recovery</span>
            <span className="text-xs text-white/45">Of 100</span>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <ProgressRing percent={72} value="72" size={90} tone="done" />
            <div className="flex-1 space-y-3">
              <div className="text-sm text-forest-green">Improving</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-12 text-white/50">Sleep</span>
                  <div className="h-1.5 flex-1 rounded-full bg-white/10">
                    <div className="h-full w-[78%] rounded-full bg-forest-green/80" />
                  </div>
                  <span className="tabular-nums text-white">78</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-12 text-white/50">Emotion</span>
                  <div className="h-1.5 flex-1 rounded-full bg-white/10">
                    <div className="h-full w-[68%] rounded-full bg-forest-green/80" />
                  </div>
                  <span className="tabular-nums text-white">68</span>
                </div>
              </div>
            </div>
          </div>
        </SolidCard>

        {/* RELIEF TOOLS */}
        <div>
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45 mb-2">Relief tools</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <button type="button" className="flex h-24 w-32 shrink-0 flex-col justify-between rounded-xl border border-white/10 bg-white/[0.04] p-3 text-left">
              <span className="text-white/90 text-sm">Breathe</span>
              <span className="text-xs text-white/45">5 min</span>
            </button>
            <button type="button" className="flex h-24 w-32 shrink-0 flex-col justify-between rounded-xl border border-white/10 bg-white/[0.04] p-3 text-left">
              <span className="text-white/90 text-sm">Meditate</span>
              <span className="text-xs text-white/45">10 min</span>
            </button>
            <button type="button" className="flex h-24 w-32 shrink-0 flex-col justify-between rounded-xl border border-white/10 bg-white/[0.04] p-3 text-left">
              <span className="text-white/90 text-sm">Yoga</span>
              <span className="text-xs text-white/45">15 min</span>
            </button>
          </div>
        </div>

        {/* CRISIS / SAFETY LAYER */}
        <div className="pt-2">
          <SafetyCard />
        </div>
      </main>
    </HifiShell>
  )
}