import { MessageCircle, Pencil, Search as SearchIcon } from 'lucide-react'
import { Card } from '@/components/design-system/Card'
import { SearchBar } from '@/components/design-system/SearchBar'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { wikiChapters, wikiEntries, type WikiEntry } from '@/data/mock'

// Screen 20 of 78: Personal wiki / SIA memory
// Spec: /Users/hamza/yHealth/app_design 3/20-personal-wiki-sia-memory.md

const activeChapter = 'patterns'

const confidenceClasses: Record<NonNullable<WikiEntry['confidence']>, string> = {
  high: 'bg-forest-green/15 text-forest-green',
  medium: 'bg-brand-orange/15 text-brand-orange',
  low: 'bg-white/10 text-white/40',
}

function ChapterTabs() {
  return (
    <div className="overflow-x-auto px-4 pb-3 hide-scrollbar">
      <div className="flex gap-2" role="tablist" aria-label="Book of life chapters">
        {wikiChapters.map((chapter) => {
          const active = chapter.id === activeChapter
          return (
            <button
              key={chapter.id}
              className={[
                'h-8 shrink-0 rounded-pill border px-3 text-[13px] leading-[18px]',
                active
                  ? 'border-brand-orange bg-brand-orange font-semibold text-white'
                  : 'border-white/10 bg-transparent text-white/50',
              ].join(' ')}
              role="tab"
              aria-selected={active}
            >
              {chapter.label} <span className={active ? 'text-white/60' : 'text-white/30'}>({chapter.count})</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function SourceRow({ entry }: { entry: WikiEntry }) {
  const sourceMap = {
    conversation: { Icon: MessageCircle, label: 'From conversation' },
    data: { Icon: SearchIcon, label: 'Detected from data' },
    edited: { Icon: Pencil, label: 'Edited by you' },
  } as const
  const source = sourceMap[entry.source]
  const Icon = source.Icon

  return (
    <div className="mt-3 flex items-center gap-1.5 text-[12px] leading-4 text-white/40">
      <Icon size={12} strokeWidth={1.8} />
      <span>{source.label} - {entry.date}</span>
    </div>
  )
}

function EntryCard({ entry, index }: { entry: WikiEntry; index: number }) {
  return (
    <Card
      variant="small"
      className="animate-fade-up"
      style={{ animationDelay: `${220 + index * 60}ms` }}
    >
      <div className="flex items-start gap-3">
        <h2 className="min-w-0 flex-1 truncate text-[15px] font-semibold leading-5 text-white">
          {entry.title}
        </h2>
        {entry.confidence && (
          <span className={`shrink-0 rounded-pill px-2.5 py-1 text-[10px] font-semibold leading-[14px] ${confidenceClasses[entry.confidence]}`}>
            {entry.confidence} confidence
          </span>
        )}
      </div>

      <p className="mt-1 line-clamp-3 text-[14px] leading-[18px] text-white/70">
        {entry.content}{' '}
        <span className="font-semibold text-brand-orange">Show more</span>
      </p>

      <SourceRow entry={entry} />

      <div className="mt-4 flex items-center gap-2 text-[13px] font-semibold leading-[18px]">
        <button className="h-8 text-white/50">Edit</button>
        <span className="text-white/15" aria-hidden="true">|</span>
        <button className="h-8 text-error-red">This is wrong</button>
      </div>
    </Card>
  )
}

export default function PersonalWikiScreen() {
  const entries = wikiEntries

  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Book of life" showBack />} activeTab="me">
        <main className="pb-16 pt-3">
          <div className="px-4 animate-fade-up">
            <SearchBar placeholder="Search memories..." />
          </div>

          <div className="mt-3 animate-fade-up" style={{ animationDelay: '80ms' }}>
            <ChapterTabs />
          </div>

          <div className="px-4">
            <div className="border-t border-white/[0.08] pt-4">
              <p className="text-[12px] leading-4 text-white/40 animate-fade-up" style={{ animationDelay: '140ms' }}>
                7 entries - last updated today
              </p>

              <section className="mt-4 space-y-3">
                {entries.map((entry, index) => (
                  <EntryCard key={entry.id} entry={entry} index={index} />
                ))}
              </section>
            </div>
          </div>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
