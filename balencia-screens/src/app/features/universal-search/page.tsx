'use client'

import { useMemo, useState } from 'react'
import { Clock3, Search, X } from 'lucide-react'
import { Chip } from '@/components/design-system/Chip'
import { DomainTag } from '@/components/design-system/DomainTag'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { universalSearch } from '@/data/mock'

// Screen 68 of 78: Universal search
// Spec: /Users/hamza/yHealth/app_design 3/68-universal-search.md

const filters = ['All', 'Goals', 'Habits', 'Recipes', 'Notes', 'Journal', 'Settings', 'Screens', 'Community']
const filterSectionAliases: Record<string, string> = {
  Goals: 'Missions',
  Notes: 'Quick notes',
}

function SearchHeader({ query, setQuery, filter, setFilter, onCancel }: { query: string; setQuery: (query: string) => void; filter: string; setFilter: (filter: string) => void; onCancel: () => void }) {
  return (
    <header className="sticky top-0 z-20 bg-ink-900 px-4 pt-2">
      <div className="flex h-12 items-center gap-3">
        <label className="flex h-11 min-w-0 flex-1 items-center gap-3 rounded-md border border-brand-orange/25 bg-ink-brown-800 px-4 shadow-1">
          <Search size={16} className="shrink-0 text-white/40" strokeWidth={1.9} />
          <input autoFocus aria-label="Search Balencia" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Balencia" className="min-w-0 flex-1 bg-transparent text-[15px] leading-5 text-white outline-none placeholder:text-white/35" />
          {query && <button type="button" aria-label="Clear search" onClick={() => setQuery('')} className="flex h-8 w-8 items-center justify-center rounded-full text-white/40"><X size={16} strokeWidth={1.9} /></button>}
        </label>
        <button type="button" onClick={onCancel} className="h-11 shrink-0 text-[15px] leading-5 text-white/60">Cancel</button>
      </div>
      <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-3 hide-scrollbar">
        {filters.map((item) => (
          <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)} className="min-h-11 shrink-0">
            <Chip selected={filter === item}>{item}</Chip>
          </button>
        ))}
      </div>
    </header>
  )
}

function SiaSuggestion() {
  return (
    <div className="mx-4 mt-1 rounded-xl border border-royal-purple/20 bg-ink-brown-800 p-4 shadow-1 animate-fade-up">
      <div className="flex items-start gap-3">
        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-royal-purple" />
        <div className="min-w-0">
          <div className="text-caption font-semibold leading-[18px] text-white/50">SIA thinks you want</div>
          <div className="mt-1 truncate text-[15px] font-semibold leading-5 text-white">{universalSearch.siaSuggestion}</div>
        </div>
      </div>
    </div>
  )
}

function ResultSection({ section, delay, onOpen }: { section: (typeof universalSearch.sections)[number]; delay: number; onOpen: (title: string) => void }) {
  return (
    <section className="mt-5 animate-fade-up" style={{ animationDelay: `${delay}ms` }}>
      <div className="mb-3 px-1 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">
        {section.title} ({section.count})
      </div>
      <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-ink-brown-800 shadow-1">
        {section.items.map((item, index) => (
          <button type="button" key={`${section.title}-${item.title}`} onClick={() => onOpen(item.title)} className={['flex min-h-[64px] w-full items-center gap-3 px-4 py-3 text-left', index > 0 ? 'border-t border-white/[0.05]' : ''].join(' ')}>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-ink-900 text-white/40">
              <Search size={17} strokeWidth={1.9} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[15px] font-semibold leading-5 text-white">{item.title}</div>
              <div className="mt-1 flex min-w-0 items-center gap-2">
                <span className="truncate text-caption leading-[18px] text-white/45">{item.meta}</span>
                <DomainTag domain={item.domain} showDot={false} className="shrink-0" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}

function RecentSearches({ onSelect }: { onSelect: (query: string) => void }) {
  return (
    <section className="px-4 pt-6">
      <div className="mb-3 px-1 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">Recent searches</div>
      <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-ink-brown-800">
        {universalSearch.recent.slice(0, 3).map((item, index) => (
          <button type="button" key={item} onClick={() => onSelect(item)} className={['flex min-h-12 w-full items-center gap-3 px-4 text-left', index > 0 ? 'border-t border-white/[0.05]' : ''].join(' ')}>
            <Clock3 size={16} className="text-white/35" strokeWidth={1.9} />
            <span className="min-w-0 flex-1 truncate text-[15px] leading-5 text-white/60">{item}</span>
            <X size={14} className="text-white/25" strokeWidth={2} />
          </button>
        ))}
      </div>
    </section>
  )
}

export default function UniversalSearchScreen() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')
  const [opened, setOpened] = useState('')
  const sections = useMemo(() => {
    if (!query.trim()) return []
    const targetSection = filterSectionAliases[filter] ?? filter
    return universalSearch.sections
      .filter((section) => filter === 'All' || section.title.toLowerCase() === targetSection.toLowerCase())
      .map((section) => ({
        ...section,
        items: section.items.filter((item) => `${item.title} ${item.meta} ${section.title}`.toLowerCase().includes(query.toLowerCase())),
        count: section.items.filter((item) => `${item.title} ${item.meta} ${section.title}`.toLowerCase().includes(query.toLowerCase())).length,
      }))
      .filter((section) => section.items.length > 0)
  }, [filter, query])
  const updateQuery = (value: string) => {
    setQuery(value)
    setOpened('')
  }
  const updateFilter = (value: string) => {
    setFilter(value)
    setOpened('')
  }
  const cancelSearch = () => {
    setQuery('')
    setOpened('')
    setFilter('All')
  }

  return (
    <PhoneFrame>
      <ScreenShell showTabBar={false}>
        <main className="min-h-full bg-ink-900 pb-6">
          <SearchHeader query={query} setQuery={updateQuery} filter={filter} setFilter={updateFilter} onCancel={cancelSearch} />
          {query && <SiaSuggestion />}
          {opened && <div className="mx-4 mt-3 rounded-lg border border-forest-green/20 bg-forest-green/10 p-3 text-caption leading-[18px] text-white/70" aria-live="polite">Opening {opened} detail...</div>}
          <div className="px-4">
            {query && sections.length === 0 && <div className="mt-8 text-center text-[15px] leading-5 text-white/50">No results for &quot;{query}&quot;.</div>}
            {query && sections.map((section, index) => (
              <ResultSection key={section.title} section={section} delay={80 + index * 80} onOpen={setOpened} />
            ))}
          </div>
          {!query && <RecentSearches onSelect={updateQuery} />}
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
