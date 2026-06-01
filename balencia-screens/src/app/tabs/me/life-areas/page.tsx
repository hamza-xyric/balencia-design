'use client'

import Link from 'next/link'
import { useState } from 'react'
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

function TimeRangeSelector({ active, onChange }: { active: string; onChange: (value: string) => void }) {
  return (
    <div className="mx-auto grid min-h-[52px] w-[280px] grid-cols-3 rounded-pill border border-white/10 bg-ink-brown-800 p-1 shadow-1">
      {['Current', 'Vs week', 'Vs month'].map((label) => (
        <button
          key={label}
          type="button"
          onClick={() => onChange(label)}
          className={['flex min-h-11 items-center justify-center gap-1 rounded-pill text-[14px] font-semibold leading-[18px]', active === label ? 'bg-brand-orange text-white' : 'text-white/40'].join(' ')}
          aria-pressed={active === label}
        >
          {label}
          {label !== 'Current' && <Lock size={10} strokeWidth={2} aria-label="Plus history required" />}
        </button>
      ))}
    </div>
  )
}

function DomainRow({ stat, delta, comparison }: { stat: (typeof domainStats)[number]; delta?: number; comparison?: boolean }) {
  const tone = domainToneClasses[stat.domain]
  const progress = domainProgress.find((item) => item.domain === stat.domain)
  const activeMissions = progress?.activeMissions ?? 0

  return (
    <Link
      href={domainRoutes[stat.domain]}
      className="grid min-h-[72px] grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-white/[0.05] px-4 py-3 transition-colors duration-[var(--dur-fast)] last:border-b-0 active:bg-ink-brown-800"
      aria-label={`${domains[stat.domain].label}, ${stat.stat} stat score, ${activeMissions} active missions${comparison && typeof delta === 'number' ? `, ${formatDelta(delta)} comparison delta` : ''}`}
    >
      <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${tone.dot}`} aria-hidden="true" />
      <div className="min-w-0">
        <div className="flex items-center justify-between gap-3">
          <span className="min-w-0 truncate text-[15px] font-semibold leading-5 text-white">
            {domains[stat.domain].label}
          </span>
          <span className="shrink-0 text-[20px] font-semibold leading-[26px] text-white tabular-nums">
            {stat.stat}
          </span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-pill bg-white/[0.08]">
          <div className={`h-full rounded-pill ${tone.bar}`} style={{ width: `${(stat.stat / 99) * 100}%` }} />
        </div>
        <div className="mt-2 flex items-center justify-between gap-3 text-[12px] leading-4">
          <span className="truncate text-white/50">
            {activeMissions > 0 ? `${activeMissions} ${activeMissions === 1 ? 'mission' : 'missions'}` : 'No missions'}
          </span>
          {comparison && typeof delta === 'number' && (
            <span className={['shrink-0 font-semibold tabular-nums', deltaTone(delta)].join(' ')}>
              {formatDelta(delta)}
            </span>
          )}
        </div>
      </div>
      <ChevronRight size={12} className="shrink-0 text-white/25" strokeWidth={2} />
    </Link>
  )
}

function formatDelta(value: number) {
  if (value > 0) return `+${value}`
  return `${value}`
}

function deltaTone(value: number) {
  if (value > 0) return 'text-forest-green'
  if (value < 0) return 'text-stalled-amber'
  return 'text-white/40'
}

export default function LifeAreasScreen() {
  const [range, setRange] = useState('Current')
  const sortedStats = [...domainStats].sort((a, b) => b.stat - a.stat)

  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Life areas" showBack />} activeTab="me">
        <main className="px-4 pb-16 pt-1">
          <section className="relative animate-fade-up">
            <RadarChart stats={domainStats} />
            <div className="absolute inset-x-6 top-4 grid grid-cols-3 gap-2" aria-label="Open domain dashboards from radar">
              {sortedStats.slice(0, 6).map((stat) => (
                <Link key={stat.domain} href={domainRoutes[stat.domain]} className="min-h-11 rounded-pill bg-transparent text-[0px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange/70">
                  {domains[stat.domain].label}
                </Link>
              ))}
            </div>
          </section>

          <LifePowerDisplay
            value={user.lifePower}
            className="animate-fade-up"
            style={{ animationDelay: '560ms' }}
          />

          <div className="mt-5 animate-fade-up" style={{ animationDelay: '640ms' }}>
            <Link href="/tabs/sia/direct" aria-label="Open SIA chat about Life areas insight">
              <SIACoachingNote
                message="Your fitness and nutrition are thriving. Career could use attention when the week opens up."
                className="p-5"
              />
            </Link>
          </div>

          <div className="mt-5 animate-fade-up" style={{ animationDelay: '720ms' }}>
            <TimeRangeSelector active={range} onChange={setRange} />
            {range !== 'Current' && (
              <p className="mt-2 text-center text-[12px] leading-4 text-white/45">
                Plus comparison unlocks after 14 days of history. Preview deltas are shown below.
              </p>
            )}
          </div>

          <section className="mt-5 animate-fade-up" style={{ animationDelay: '800ms' }}>
            <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-ink-900">
              {sortedStats.map((stat) => {
                const delta = domainProgress.find((item) => item.domain === stat.domain)?.[range === 'Vs week' ? 'weekDelta' : 'monthDelta'] ?? 0

                return (
                  <DomainRow key={stat.domain} stat={stat} delta={delta} comparison={range !== 'Current'} />
                )
              })}
            </div>
          </section>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
