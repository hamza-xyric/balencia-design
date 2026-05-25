import { BarChart3, Droplets, Flame, Settings, Trophy } from 'lucide-react'
import { Card } from '@/components/design-system/Card'
import { DomainDashboardHeader } from '@/components/domain/DomainDashboardHeader'
import { WaterIntakeRing } from '@/components/domain/WaterIntakeRing'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { SectionHeader } from '@/components/screens/SectionHeader'
import { waterIntake } from '@/data/mock'

// Screen 44 of 78: Water intake
// Spec: /Users/hamza/yHealth/app_design 3/44-water-intake.md

function QuickAddButton({
  amount,
  unit,
  primary = false,
}: {
  amount: string
  unit: string
  primary?: boolean
}) {
  return (
    <button
      type="button"
      className={[
        'flex h-12 min-w-0 flex-1 flex-col items-center justify-center rounded-pill border text-center transition-transform duration-[var(--dur-fast)] active:scale-95',
        primary ? 'border-brand-orange bg-brand-orange text-white' : 'border-white/10 bg-ink-brown-800 text-white/70',
      ].join(' ')}
    >
      <span className="text-[15px] font-semibold leading-5">{amount}</span>
      <span className="text-[12px] leading-4">{unit}</span>
    </button>
  )
}

function DrinkLog() {
  return (
    <section className="mt-8 animate-fade-up" style={{ animationDelay: '160ms' }}>
      <SectionHeader
        title="Today's log"
        className="px-1"
        action={<span className="text-small leading-[14px] text-white/30">{waterIntake.entries.length} entries</span>}
      />
      <Card variant="small" className="rounded-lg p-0">
        {waterIntake.entries.map((entry, index) => (
          <div
            key={entry.id}
            className={[
              'flex min-h-[52px] items-center gap-3 px-4 py-3',
              index > 0 ? 'border-t border-white/[0.05]' : '',
            ].filter(Boolean).join(' ')}
          >
            <Droplets size={16} className="shrink-0 text-domain-wellbeing" strokeWidth={2.2} />
            <div className="min-w-0 flex-1 text-[15px] font-semibold leading-5 text-white">{entry.time}</div>
            <div className="text-right">
              <div className={['text-[15px] leading-5', entry.emphasized ? 'text-domain-wellbeing' : 'text-white'].join(' ')}>
                {entry.amount}
              </div>
              <div className="text-[12px] leading-4 text-white/40">{entry.secondary}</div>
            </div>
          </div>
        ))}
      </Card>
    </section>
  )
}

function WeeklyChart() {
  const max = Math.max(...waterIntake.week.map((day) => day.target))

  return (
    <section className="mt-8 animate-fade-up" style={{ animationDelay: '240ms' }}>
      <Card>
        <div className="mb-5 flex items-center justify-between">
          <div className="text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">
            This week
          </div>
          <div className="text-caption leading-[18px] text-white/50">Avg 6.2/day</div>
        </div>

        <div className="relative h-[132px]">
          <div className="absolute left-0 right-0 top-[36px] border-t border-dashed border-white/20" aria-hidden="true" />
          <div className="absolute right-0 top-[24px] text-[10px] leading-[14px] text-white/25">Target</div>
          <div className="flex h-full items-end justify-between gap-2">
            {waterIntake.week.map((day, index) => {
              const height = day.future ? 4 : Math.max(10, Math.round((day.glasses / max) * 92))

              return (
                <div key={`${day.day}-${index}`} className="flex h-full flex-1 flex-col items-center justify-end">
                  <div className="mb-2 text-small font-semibold leading-[14px] text-white/60 tabular-nums">
                    {day.future ? '' : day.glasses}
                  </div>
                  <div
                    className={[
                      'w-6 rounded-t-sm',
                      day.future ? 'bg-white/[0.03]' : day.met ? 'bg-domain-wellbeing' : 'bg-domain-wellbeing/60',
                    ].join(' ')}
                    style={{ height }}
                    aria-hidden="true"
                  />
                  <div className="mt-2 flex h-5 flex-col items-center gap-1">
                    <span className={['text-[12px] leading-4', day.today ? 'text-white' : 'text-white/40'].join(' ')}>
                      {day.day}
                    </span>
                    {day.today && <span className="h-1 w-1 rounded-full bg-domain-wellbeing" aria-hidden="true" />}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Card>
    </section>
  )
}

function HydrationStats() {
  const stats = [
    { id: 'streak', icon: Flame, value: waterIntake.stats.streak, label: 'Day streak', tone: 'text-brand-orange' },
    { id: 'average', icon: BarChart3, value: waterIntake.stats.average, label: 'Avg glasses/day', tone: 'text-domain-wellbeing' },
    { id: 'best', icon: Trophy, value: waterIntake.stats.bestDay, label: 'Best day', tone: 'text-stalled-amber' },
  ]

  return (
    <Card variant="small" className="mt-4 rounded-md p-4 animate-fade-up" style={{ animationDelay: '320ms' }}>
      <div className="grid grid-cols-3 divide-x divide-white/[0.05]">
        {stats.map((stat) => {
          const Icon = stat.icon

          return (
            <div key={stat.id} className="flex flex-col items-center px-2 text-center">
              <Icon size={16} className={stat.tone} strokeWidth={2.2} />
              <div className="mt-2 text-[24px] font-bold leading-7 text-white tabular-nums">{stat.value}</div>
              <div className="mt-1 text-[12px] leading-4 text-white/50">{stat.label}</div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

export default function WaterIntakeScreen() {
  return (
    <PhoneFrame>
      <ScreenShell
        header={
          <DomainDashboardHeader
            title="Water intake"
            domain="wellbeing"
            backHref="/tabs/today"
            rightAction={<Settings size={20} strokeWidth={2.1} />}
          />
        }
        activeTab="today"
      >
        <main className="px-4 pb-20 pt-4">
          <section className="animate-fade-up">
            <WaterIntakeRing
              consumedGlasses={waterIntake.consumedGlasses}
              targetGlasses={waterIntake.targetGlasses}
              milliliters={waterIntake.milliliters}
              xpReward={waterIntake.xpReward}
            />
          </section>

          <section className="mt-8 flex gap-2 animate-fade-up" style={{ animationDelay: '80ms' }}>
            <QuickAddButton amount="1" unit="glass" primary />
            <QuickAddButton amount="250" unit="ml" />
            <QuickAddButton amount="500" unit="ml" />
            <QuickAddButton amount="custom" unit="ml" />
          </section>

          <DrinkLog />
          <WeeklyChart />
          <HydrationStats />
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
