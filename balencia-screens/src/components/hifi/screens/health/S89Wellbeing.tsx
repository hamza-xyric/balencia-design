import { Activity, BatteryCharging, BookOpen, Check, HeartPulse, Info, Smile, Sparkles, Zap } from 'lucide-react'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { Chip, FloatingQuickLog, GlassCard, IconButton, MetricPill, SafetyCard, SolidCard, TopBar } from '@/components/hifi/kit'

export function S89Wellbeing() {
  const modules = [
    ['Journal', BookOpen],
    ['Mood', Smile],
    ['Breathing', HeartPulse],
    ['Stress', Activity],
    ['Habits', Check],
    ['Energy', BatteryCharging],
    ['Insights', Sparkles],
    ['Vision', Zap],
  ] as const

  return (
    <PhoneFrame>
      <ScreenShell header={<TopBar title="Wellbeing" eyebrow="Tuesday, Jul 7" back={false} right={<IconButton label="Help"><Info size={18} /></IconButton>} />} activeTab="today" bottomAction={<FloatingQuickLog />}>
        <main className="space-y-4 px-4 pb-4 pt-3">
          <p className="text-[22px] font-semibold leading-7 text-white">Your daily whole state</p>
          <GlassCard>
            <p className="text-[12px] font-semibold uppercase text-white/45">How your system feels</p>
            <div className="mt-4 flex items-center justify-center">
              <span className="rounded-pill border border-brand-orange/25 bg-brand-orange/10 px-6 py-3 text-[28px] font-bold text-white shadow-[var(--glow-orange-sm)]">Steady</span>
            </div>
            <div className="mt-5 grid grid-cols-4 gap-2">
              <MetricPill label="Mood" value="6" />
              <MetricPill label="Stress" value="4" />
              <MetricPill label="Sleep" value="7h" />
              <MetricPill label="Energy" value="5" />
            </div>
            <p className="mt-4 text-[13px] text-white/55">Via check-in and wearable. One breath session helped twice.</p>
          </GlassCard>
          <SafetyCard />
          <GlassCard tone="cia">
            <p className="text-[15px] leading-5 text-white">CIA noticed stress eased after two breathing sessions this week.</p>
            <div className="mt-3 flex gap-2"><Chip tone="you">Start breathing</Chip><Chip>View sources</Chip></div>
          </GlassCard>
          <div className="grid grid-cols-2 gap-3">
            {modules.map(([name, Icon]) => (
              <SolidCard key={name} className="min-h-[76px]">
                <Icon size={19} className="text-brand-orange" />
                <p className="mt-3 text-[14px] font-semibold text-white">{name}</p>
                <p className="mt-1 text-[11px] text-white/40">Fresh source</p>
              </SolidCard>
            ))}
          </div>
          <SolidCard className="py-3">
            <p className="text-[13px] text-white/55">Today: 5:30 walk, 1 quick note.</p>
          </SolidCard>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
