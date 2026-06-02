'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Lock } from 'lucide-react'
import { ConstellationRadar } from '@/components/charts/ConstellationRadar'
import { Sparkline } from '@/components/charts/Sparkline'
import { StatBar } from '@/components/charts/StatBar'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { KPIStatTile } from '@/components/screens/KPIStatTile'
import { SIACoachingNote } from '@/components/screens/SIACoachingNote'
import { domains, type DomainKey } from '@/data/domains'
import { domainProgress, domainStats, lifePowerHistory, user } from '@/data/mock'

// Screen 16 of 78: Life areas overview
// Spec: app_design 3/16-life-areas-overview.md (## Premium Craft + ## Visualization)

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

// Domains the user hasn't started yet — shown as ghosted "tap to explore" rows (no-data ≠ zero).
const unstartedDomains: DomainKey[] = ['creativity', 'learning']

function TimeRangeSelector({ active, onChange }: { active: string; onChange: (value: string) => void }) {
  return (
    <div className="mx-auto grid min-h-[52px] w-[280px] grid-cols-3 rounded-pill border border-white/10 bg-ink-brown-800 p-1 shadow-1">
      {['Current', 'Vs week', 'Vs month'].map((label) => (
        <button
          key={label}
          type="button"
          onClick={() => onChange(label)}
          className={['focus-ring flex min-h-11 items-center justify-center gap-1 rounded-pill text-[14px] font-semibold leading-[18px]', active === label ? 'bg-brand-orange text-white' : 'text-white/40'].join(' ')}
          aria-pressed={active === label}
        >
          {label}
          {label !== 'Current' && <Lock size={10} strokeWidth={2} aria-label="Plus history required" />}
        </button>
      ))}
    </div>
  )
}

export default function LifeAreasScreen() {
  const [range, setRange] = useState('Current')
  const comparison = range !== 'Current'
  const sortedStats = [...domainStats].sort((a, b) => b.stat - a.stat)
  const avgStat = Math.round(sortedStats.reduce((sum, s) => sum + s.stat, 0) / sortedStats.length)
  const avgDelta = Math.round(domainProgress.reduce((sum, p) => sum + p.weekDelta, 0) / domainProgress.length)

  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Life areas" showBack />} activeTab="me">
        <main className="px-4 pb-16 pt-1">
          {/* S16-V01 — Constellation Radar hero with the Life-Power sun hub */}
          <section className="surface-hero animate-fade-up flex justify-center p-6">
            <ConstellationRadar stats={domainStats} lifePower={user.lifePower} size={268} />
          </section>

          {/* S16-V02 — Balance trajectory: 7-week Life-Power sparkline + average-stat KPI */}
          <div className="surface-warm mt-4 flex items-center justify-between gap-4 p-5 animate-fade-up" style={{ animationDelay: '120ms' }}>
            <div className="min-w-0">
              <p className="text-eyebrow font-semibold uppercase tracking-[var(--tracking-eyebrow)] text-white/40">Life Power</p>
              <div className="mt-2">
                <Sparkline points={lifePowerHistory} width={120} height={32} milestone />
              </div>
            </div>
            <KPIStatTile label="Average stat" value={avgStat} delta={avgDelta} align="start" />
          </div>

          <div className="mt-4 animate-fade-up" style={{ animationDelay: '200ms' }}>
            <Link href="/tabs/sia/direct" className="focus-ring block rounded-xl" aria-label="Open SIA chat about your life balance">
              <SIACoachingNote message="Sleep and meditation are your anchors right now. Career dipped this week — want to set a small goal there?" />
            </Link>
          </div>

          <div className="mt-5 animate-fade-up" style={{ animationDelay: '280ms' }}>
            <TimeRangeSelector active={range} onChange={setRange} />
            {comparison && (
              <p className="mt-2 text-center text-[12px] leading-4 text-white/45">
                Plus comparison unlocks after 14 days of history. Preview deltas are shown below.
              </p>
            )}
          </div>

          {/* S16-V03 — Domain StatBars list (all domains, ranked; un-started ghosted) */}
          <section className="mt-5 animate-fade-up" style={{ animationDelay: '360ms' }}>
            <div className="surface-warm divide-y divide-white/[0.05] overflow-hidden px-4">
              {sortedStats.map((stat) => {
                const progress = domainProgress.find((p) => p.domain === stat.domain)
                const missionCount = progress?.activeMissions ?? 0
                const delta = comparison ? (range === 'Vs week' ? progress?.weekDelta : progress?.monthDelta) : undefined
                return (
                  <Link
                    key={stat.domain}
                    href={domainRoutes[stat.domain]}
                    className="focus-ring block"
                    aria-label={`${domains[stat.domain].label}, ${stat.stat} of 99, ${missionCount} active missions`}
                  >
                    <StatBar
                      domain={stat.domain}
                      value={stat.stat}
                      delta={delta ?? undefined}
                      meta={missionCount > 0 ? `${missionCount} ${missionCount === 1 ? 'mission' : 'missions'}` : 'No missions'}
                      showChevron
                    />
                  </Link>
                )
              })}
              {unstartedDomains.map((domain) => (
                <Link
                  key={domain}
                  href={domainRoutes[domain]}
                  className="focus-ring block"
                  aria-label={`${domains[domain].label}, not started yet, tap to explore`}
                >
                  <StatBar domain={domain} value={null} showChevron />
                </Link>
              ))}
            </div>
          </section>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
