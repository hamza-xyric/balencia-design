'use client'

import Link from 'next/link'
import { Suspense, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Archive, Camera, Check, FileText } from 'lucide-react'
import { Button } from '@/components/design-system/Button'
import { Chip } from '@/components/design-system/Chip'
import { DomainTag } from '@/components/design-system/DomainTag'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { MissionTypeBadge } from '@/components/screens/MissionTypeBadge'
import { missionJournal } from '@/data/mock'

// Screen 73 of 78: Mission journal
// Spec: /Users/hamza/yHealth/app_design 3/73-mission-journal.md

function FilterChips({ active, onChange }: { active: string; onChange: (filter: string) => void }) {
  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 hide-scrollbar animate-fade-up">
      {missionJournal.filters.map((filter) => (
        <Chip
          key={filter}
          type="button"
          selected={active === filter}
          onClick={() => onChange(filter)}
          aria-pressed={active === filter}
          className="min-h-11"
        >
          {filter}
        </Chip>
      ))}
    </div>
  )
}

function JournalEntryCard({ entry, delay, onPhotos }: { entry: (typeof missionJournal.months)[number]['entries'][number]; delay: number; onPhotos: () => void }) {
  const completed = entry.status === 'completed'
  const detailHref = `/tabs/goals/detail?source=journal&title=${encodeURIComponent(entry.name)}&status=${entry.status}&type=${entry.type}&domains=${entry.domain}&xp=${entry.xp}&progress=${completed ? '1' : '0.45'}&next=${encodeURIComponent(completed ? 'Review mission archive' : 'Resume or permanently archive this mission')}`

  return (
    <article
      className={[
        'rounded-xl border border-white/[0.06] bg-ink-brown-800 p-6 shadow-1 animate-fade-up',
        completed ? '' : 'opacity-80',
      ].join(' ')}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start gap-3">
        <span className={['mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full', completed ? 'bg-forest-green text-white' : 'bg-white/[0.06] text-white/40'].join(' ')}>
          {completed ? <Check size={14} strokeWidth={2.6} /> : <Archive size={14} strokeWidth={2.1} />}
        </span>
        <Link href={detailHref} className="min-w-0 flex-1 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange/70" aria-label={`Open mission details for ${entry.name}`}>
          <h2 className="text-body font-semibold leading-[22px] text-white">{entry.name}</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            <MissionTypeBadge type={entry.type} />
            <DomainTag domain={entry.domain} />
          </div>
          <div className="mt-2 text-caption leading-[18px] text-white/50">{entry.meta}</div>
          <div className="mt-1 text-caption font-semibold leading-[18px] text-brand-orange">
            +{entry.xp} XP {'partial' in entry && entry.partial && <span className="font-normal text-white/40">(partial)</span>}
          </div>
        </Link>
      </div>

      <p className="mt-4 text-[14px] leading-5 text-white/70">{entry.summary}</p>

      {'photos' in entry && entry.photos && (
        <button type="button" onClick={onPhotos} className="mt-4 flex min-h-11 items-center gap-2 rounded-md text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange/70">
          <Camera size={15} className="text-white/40" strokeWidth={2.1} />
          <div className="flex -space-x-1.5">
            {Array.from({ length: entry.photos }).map((_, index) => (
              <span key={index} className="h-8 w-8 rounded-full border border-ink-brown-800 bg-ink-900" />
            ))}
          </div>
          <span className="text-small leading-[14px] text-white/40">{entry.photos} photos</span>
        </button>
      )}

      {'note' in entry && entry.note && (
        <div className="mt-4 flex items-start gap-2 rounded-md bg-ink-900/70 p-3">
          <FileText size={14} className="mt-0.5 shrink-0 text-white/40" strokeWidth={2.1} />
          <p className="text-caption leading-[18px] text-white/50">{entry.note}</p>
        </div>
      )}
    </article>
  )
}

function MissionJournalContent() {
  const searchParams = useSearchParams()
  const source = searchParams.get('source')
  const fromMe = source === 'me'
  const [filter, setFilter] = useState('All')
  const [subFilter, setSubFilter] = useState('All')
  const [photoEntry, setPhotoEntry] = useState<string | null>(null)
  const subFilters = filter === 'By domain' ? ['All', 'fitness', 'nutrition', 'finance'] : filter === 'By type' ? ['All', 'main', 'side'] : []
  const filteredMonths = useMemo(() => missionJournal.months.map((month) => ({
    ...month,
    entries: month.entries.filter((entry) => {
      if (filter === 'All' || subFilter === 'All') return true
      if (filter === 'By domain') return entry.domain === subFilter
      if (filter === 'By type') return entry.type === subFilter
      return true
    }),
  })).filter((month) => month.entries.length > 0), [filter, subFilter])
  const updateFilter = (next: string) => {
    setFilter(next)
    setSubFilter('All')
  }

  return (
    <PhoneFrame>
      <ScreenShell
        header={<Header title="Mission journal" showBack backHref={fromMe ? '/tabs/me' : undefined} />}
        activeTab={fromMe ? 'me' : 'goals'}
      >
        <main className="px-4 pb-20 pt-4">
          <FilterChips active={filter} onChange={updateFilter} />
          {subFilters.length > 0 && (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 hide-scrollbar" aria-label={`${filter} filters`}>
              {subFilters.map((item) => (
                <button key={item} type="button" onClick={() => setSubFilter(item)} aria-pressed={subFilter === item} className={['min-h-11 rounded-pill border px-3 text-[13px] font-semibold capitalize', subFilter === item ? 'border-brand-orange bg-brand-orange text-white' : 'border-white/10 text-white/50'].join(' ')}>
                  {item}
                </button>
              ))}
            </div>
          )}
          {filteredMonths.map((month, monthIndex) => (
            <section key={month.label} className="mt-7">
              <div className="mb-3 px-1 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">{month.label}</div>
              <div className="space-y-3">
                {month.entries.map((entry, entryIndex) => (
                  <JournalEntryCard
                    key={`${month.label}-${entry.name}`}
                    entry={entry}
                    delay={80 + monthIndex * 120 + entryIndex * 80}
                    onPhotos={() => setPhotoEntry(entry.name)}
                  />
                ))}
              </div>
            </section>
          ))}
          {filteredMonths.length === 0 && (
            <div className="mt-6 rounded-xl border border-white/[0.06] bg-ink-brown-800 p-5 text-[14px] leading-5 text-white/55">
              No journal entries match this filter yet.
            </div>
          )}
        </main>
        {photoEntry && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 px-4 pb-4" role="dialog" aria-modal="true" aria-label="Mission photos">
            <div className="w-full max-w-[390px] rounded-t-xl border border-white/10 bg-ink-900 p-5 shadow-2">
              <h2 className="text-[18px] font-semibold leading-6 text-white">{photoEntry} photos</h2>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[1, 2, 3].map((item) => <div key={item} className="aspect-square rounded-lg bg-ink-brown-800" />)}
              </div>
              <Button fullWidth className="mt-5" onClick={() => setPhotoEntry(null)}>Close</Button>
            </div>
          </div>
        )}
      </ScreenShell>
    </PhoneFrame>
  )
}

function MissionJournalFallback() {
  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Mission journal" showBack />} activeTab="goals">
        <main className="px-4 pb-20 pt-4">
          <div className="rounded-xl border border-white/[0.06] bg-ink-brown-800 p-5 text-[14px] leading-5 text-white/55">
            Loading mission journal...
          </div>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}

export default function MissionJournalScreen() {
  return (
    <Suspense fallback={<MissionJournalFallback />}>
      <MissionJournalContent />
    </Suspense>
  )
}
