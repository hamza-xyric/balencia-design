import Link from 'next/link'
import { ChevronRight, Lock } from 'lucide-react'
import { RadarChart } from '@/components/charts/RadarChart'
import { domainToneClasses } from '@/components/design-system/Chip'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { LifePowerDisplay } from '@/components/screens/LifePowerDisplay'
import { SIACoachingNote } from '@/components/screens/SIACoachingNote'
import { domains, type DomainKey } from '@/data/domains'
import { domainProgress, domainStats, user } from '@/data/mock'

// Screen 16 of 78: Life areas overview
// Spec: /Users/hamza/yHealth/app_design 3/16-life-areas-overview.md

const domainRoutes: Record<DomainKey, string> = {
  fitness: '/domains/fitness',
  sleep: '/features/sleep',
  career: '/domains/career',
  nutrition: '/domains/nutrition',
  finance: '/domains/finance',
  faith: '/domains/spirituality',
  productivity: '/features/habits',
  relationships: '/domains/relationships',
  wellbeing: '/features/stress',
  meditation: '/features/meditation',
  creativity: '/domains/creativity',
  learning: '/domains/learning',
}

function TimeRangeSelector() {
  return (
    <div className="mx-auto grid h-9 w-[280px] grid-cols-3 rounded-pill border border-white/10 bg-ink-brown-800 p-1 shadow-1">
      <button className="rounded-pill bg-brand-orange text-[14px] font-semibold leading-[18px] text-white">
        Current
      </button>
      {['Vs week', 'Vs month'].map((label) => (
        <button
          key={label}
          className="flex items-center justify-center gap-1 rounded-pill text-[14px] leading-[18px] text-white/40"
          aria-label={`${label}, locked with Plus`}
        >
          {label}
          <Lock size={10} strokeWidth={2} />
        </button>
      ))}
    </div>
  )
}

function DomainRow({ stat }: { stat: (typeof domainStats)[number] }) {
  const tone = domainToneClasses[stat.domain]
  const progress = domainProgress.find((item) => item.domain === stat.domain)
  const activeMissions = progress?.activeMissions ?? 0

  return (
    <Link
      href={domainRoutes[stat.domain]}
      className="flex min-h-14 items-center gap-3 border-b border-white/[0.05] px-4 py-3 transition-colors duration-[var(--dur-fast)] last:border-b-0 active:bg-ink-brown-800"
      aria-label={`${domains[stat.domain].label}, ${stat.stat} stat score, ${activeMissions} active missions`}
    >
      <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${tone.dot}`} aria-hidden="true" />
      <span className="min-w-0 flex-1 truncate text-[15px] font-semibold leading-5 text-white">
        {domains[stat.domain].label}
      </span>
      <span className="w-7 text-right text-[20px] font-semibold leading-[26px] text-white tabular-nums">
        {stat.stat}
      </span>
      <div className="h-1 w-[86px] overflow-hidden rounded-pill bg-white/[0.08]">
        <div className={`h-full rounded-pill ${tone.bar}`} style={{ width: `${(stat.stat / 99) * 100}%` }} />
      </div>
      <span className="w-[62px] text-right text-[13px] leading-[18px] text-white/50">
        {activeMissions > 0 ? `${activeMissions} ${activeMissions === 1 ? 'mission' : 'missions'}` : 'No missions'}
      </span>
      <ChevronRight size={12} className="shrink-0 text-white/25" strokeWidth={2} />
    </Link>
  )
}

export default function LifeAreasScreen() {
  const sortedStats = [...domainStats].sort((a, b) => b.stat - a.stat)

  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Life areas" showBack />} activeTab="me">
        <main className="px-4 pb-16 pt-1">
          <section className="animate-fade-up">
            <RadarChart stats={domainStats} />
          </section>

          <LifePowerDisplay
            value={user.lifePower}
            className="animate-fade-up"
            style={{ animationDelay: '560ms' }}
          />

          <div className="mt-5 animate-fade-up" style={{ animationDelay: '640ms' }}>
            <SIACoachingNote
              message="Your fitness and nutrition are thriving. Career could use attention when the week opens up."
              className="p-5"
            />
          </div>

          <div className="mt-5 animate-fade-up" style={{ animationDelay: '720ms' }}>
            <TimeRangeSelector />
          </div>

          <section className="mt-5 animate-fade-up" style={{ animationDelay: '800ms' }}>
            <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-ink-900">
              {sortedStats.map((stat) => (
                <DomainRow key={stat.domain} stat={stat} />
              ))}
            </div>
          </section>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
