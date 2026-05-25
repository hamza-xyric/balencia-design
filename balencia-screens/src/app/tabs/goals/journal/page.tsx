import { Archive, Camera, Check, FileText } from 'lucide-react'
import { Chip } from '@/components/design-system/Chip'
import { DomainTag } from '@/components/design-system/DomainTag'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { MissionTypeBadge } from '@/components/screens/MissionTypeBadge'
import { missionJournal } from '@/data/mock'

// Screen 73 of 78: Mission journal
// Spec: /Users/hamza/yHealth/app_design 3/73-mission-journal.md

function FilterChips() {
  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 hide-scrollbar animate-fade-up">
      {missionJournal.filters.map((filter, index) => (
        <Chip key={filter} selected={index === 0}>{filter}</Chip>
      ))}
    </div>
  )
}

function JournalEntryCard({ entry, delay }: { entry: (typeof missionJournal.months)[number]['entries'][number]; delay: number }) {
  const completed = entry.status === 'completed'

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
        <div className="min-w-0 flex-1">
          <h2 className="text-body font-semibold leading-[22px] text-white">{entry.name}</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            <MissionTypeBadge type={entry.type} />
            <DomainTag domain={entry.domain} />
          </div>
          <div className="mt-2 text-caption leading-[18px] text-white/50">{entry.meta}</div>
          <div className="mt-1 text-caption font-semibold leading-[18px] text-brand-orange">
            +{entry.xp} XP {'partial' in entry && entry.partial && <span className="font-normal text-white/40">(partial)</span>}
          </div>
        </div>
      </div>

      <p className="mt-4 text-[14px] leading-5 text-white/70">{entry.summary}</p>

      {'photos' in entry && entry.photos && (
        <div className="mt-4 flex items-center gap-2">
          <Camera size={15} className="text-white/40" strokeWidth={2.1} />
          <div className="flex -space-x-1.5">
            {Array.from({ length: entry.photos }).map((_, index) => (
              <span key={index} className="h-8 w-8 rounded-full border border-ink-brown-800 bg-ink-900" />
            ))}
          </div>
          <span className="text-small leading-[14px] text-white/40">{entry.photos} photos</span>
        </div>
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

export default function MissionJournalScreen() {
  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Mission journal" showBack />} activeTab="goals">
        <main className="px-4 pb-20 pt-4">
          <FilterChips />
          {missionJournal.months.map((month, monthIndex) => (
            <section key={month.label} className="mt-7">
              <div className="mb-3 px-1 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">{month.label}</div>
              <div className="space-y-3">
                {month.entries.map((entry, entryIndex) => (
                  <JournalEntryCard
                    key={`${month.label}-${entry.name}`}
                    entry={entry}
                    delay={80 + monthIndex * 120 + entryIndex * 80}
                  />
                ))}
              </div>
            </section>
          ))}
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
