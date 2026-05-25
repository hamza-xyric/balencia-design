import Link from 'next/link'
import { BookOpen, ChevronRight, Funnel } from 'lucide-react'
import { FAB } from '@/components/design-system/FAB'
import { SegmentedControl } from '@/components/design-system/SegmentedControl'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { MissionCard } from '@/components/screens/MissionCard'
import { MissionTypeBadge } from '@/components/screens/MissionTypeBadge'
import { DomainTag } from '@/components/design-system/DomainTag'
import { domainStats, missionSuggestions, missions } from '@/data/mock'

// Screen 13 of 78: Mission board
// Spec: /Users/hamza/yHealth/app_design 3/13-goals-list.md

const typeFilters = [
  { label: 'All', value: 'all' },
  { label: 'Life', value: 'life' },
  { label: 'Main', value: 'main' },
  { label: 'Side', value: 'side' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Daily', value: 'daily' },
]

function TypeFilterRow() {
  return (
    <div className="-mx-4 overflow-x-auto px-4 pb-2 hide-scrollbar">
      <div className="flex gap-2">
        {typeFilters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            className={[
              'h-9 shrink-0 rounded-pill border px-4 text-caption font-semibold leading-[18px] transition-transform duration-[var(--dur-fast)] active:scale-95',
              filter.value === 'all'
                ? 'border-brand-orange bg-brand-orange text-white'
                : 'border-white/10 bg-ink-brown-800 text-white/60',
            ].join(' ')}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function MiniRadar() {
  const points = domainStats.slice(0, 6).map((stat, index) => {
    const angle = (Math.PI * 2 * index) / 6 - Math.PI / 2
    const radius = 18 * (stat.stat / 99)
    return `${20 + Math.cos(angle) * radius},${20 + Math.sin(angle) * radius}`
  }).join(' ')

  return (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
      <polygon points="20,2 35.6,11 35.6,29 20,38 4.4,29 4.4,11" fill="none" stroke="currentColor" className="text-white/10" strokeWidth="1" />
      <polygon points={points} fill="var(--color-brand-orange)" fillOpacity="0.18" stroke="var(--color-brand-orange)" strokeWidth="1.5" />
      {domainStats.slice(0, 6).map((stat, index) => {
        const angle = (Math.PI * 2 * index) / 6 - Math.PI / 2
        return (
          <line
            key={stat.domain}
            x1="20"
            y1="20"
            x2={20 + Math.cos(angle) * 18}
            y2={20 + Math.sin(angle) * 18}
            stroke="currentColor"
            className="text-white/10"
            strokeWidth="1"
          />
        )
      })}
    </svg>
  )
}

function LifeAreasPreview() {
  return (
    <Link
      href="/tabs/me/life-areas"
      className="flex h-16 items-center gap-3 rounded-xl border border-white/[0.06] bg-ink-brown-800 px-6 shadow-1 transition-transform duration-[var(--dur-fast)] active:scale-[0.98]"
      aria-label="Life areas overview"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.03]">
        <MiniRadar />
      </div>
      <span className="min-w-0 flex-1 text-[15px] font-semibold leading-5 text-white">
        Life areas overview
      </span>
      <ChevronRight size={16} className="text-white/40" strokeWidth={1.8} />
    </Link>
  )
}

function SiaSuggestionsCollapsed() {
  return (
    <section>
      <button
        type="button"
        className="flex h-12 w-full items-center gap-2 rounded-md text-left transition-colors duration-[var(--dur-fast)] active:bg-white/[0.03]"
        aria-label="SIA suggestions collapsed"
      >
        <ChevronRight size={14} className="text-white/40" strokeWidth={2} />
        <span className="text-eyebrow font-semibold uppercase tracking-[0.12em] text-white/40">
          SIA suggestions
        </span>
        <span className="text-eyebrow leading-4 text-white/30">
          ({missionSuggestions.length})
        </span>
      </button>
      <div className="sr-only">
        {missionSuggestions.map((suggestion) => (
          <div key={suggestion.id}>
            {suggestion.name}
            <MissionTypeBadge type={suggestion.type} />
            {suggestion.domains.map((domain) => (
              <DomainTag key={domain} domain={domain} />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

export default function MissionBoardScreen() {
  const pinnedMissions = missions.filter((mission) => mission.pinned).slice(0, 3)
  const listedMissions = missions.filter((mission) => mission.pinned === false)

  return (
    <PhoneFrame>
      <ScreenShell activeTab="goals" bottomAction={<FAB href="/tabs/goals/create" />}>
        <main className="px-4 pb-6 pt-4">
          <header className="flex h-11 items-center justify-between">
            <h1 className="text-h1 font-bold leading-[34px] text-white">
              Your missions
            </h1>
            <div className="flex items-center gap-2">
              <Link
                href="/tabs/goals/journal"
                className="flex h-11 w-11 items-center justify-center rounded-full text-white/60 transition-transform duration-[var(--dur-fast)] active:scale-90"
                aria-label="Mission journal"
              >
                <BookOpen size={20} strokeWidth={1.8} />
              </Link>
              <button
                type="button"
                className="relative flex h-11 w-11 items-center justify-center rounded-full text-white/60 transition-transform duration-[var(--dur-fast)] active:scale-90"
                aria-label="Filter by domain"
              >
                <Funnel size={20} strokeWidth={1.8} />
                <span className="absolute right-2.5 top-2.5 h-1 w-1 rounded-full bg-brand-orange" />
              </button>
            </div>
          </header>

          <div className="mt-2 animate-fade-up">
            <TypeFilterRow />
          </div>

          <div className="mt-2 animate-fade-up" style={{ animationDelay: '80ms' }}>
            <SegmentedControl
              options={[
                { label: 'Active', value: 'active' },
                { label: 'Done', value: 'done' },
                { label: 'All', value: 'all' },
              ]}
              activeValue="active"
            />
          </div>

          <div className="mt-4 animate-fade-up" style={{ animationDelay: '160ms' }}>
            <LifeAreasPreview />
          </div>

          {pinnedMissions.length > 0 && (
            <section className="mt-4">
              <p className="mb-2 text-eyebrow font-semibold uppercase tracking-[0.12em] text-white/40">
                pinned
              </p>
              <div className="space-y-3">
                {pinnedMissions.map((mission, index) => (
                  <Link key={mission.id} href="/tabs/goals/detail" className="block">
                    <MissionCard
                      mission={mission}
                      className="animate-fade-up"
                      style={{ animationDelay: `${240 + index * 80}ms` }}
                    />
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div className="mt-4 animate-fade-up" style={{ animationDelay: '420ms' }}>
            <SiaSuggestionsCollapsed />
          </div>

          <section className="mt-4 space-y-3">
            {listedMissions.map((mission, index) => (
              <Link key={mission.id} href="/tabs/goals/detail" className="block">
                <MissionCard
                  mission={mission}
                  className="animate-fade-up"
                  style={{ animationDelay: `${500 + index * 80}ms` }}
                />
              </Link>
            ))}
          </section>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
