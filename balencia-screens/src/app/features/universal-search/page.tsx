import { Clock3, Search, X } from 'lucide-react'
import { Chip } from '@/components/design-system/Chip'
import { DomainTag } from '@/components/design-system/DomainTag'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { universalSearch } from '@/data/mock'

// Screen 68 of 78: Universal search
// Spec: /Users/hamza/yHealth/app_design 3/68-universal-search.md

function SearchHeader() {
  return (
    <header className="sticky top-0 z-20 bg-ink-900 px-4 pt-2">
      <div className="flex h-12 items-center gap-3">
        <div className="flex h-11 min-w-0 flex-1 items-center gap-3 rounded-md border border-brand-orange/25 bg-ink-brown-800 px-4 shadow-1">
          <Search size={16} className="shrink-0 text-white/40" strokeWidth={1.9} />
          <span className="min-w-0 flex-1 truncate text-[15px] leading-5 text-white">{universalSearch.query}</span>
          <X size={16} className="shrink-0 text-white/40" strokeWidth={1.9} />
        </div>
        <button type="button" className="h-11 shrink-0 text-[15px] leading-5 text-white/60">Cancel</button>
      </div>
      <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-3 hide-scrollbar">
        {universalSearch.filters.map((filter, index) => (
          <Chip key={filter} selected={index === 0}>{filter}</Chip>
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

function ResultSection({ section, delay }: { section: (typeof universalSearch.sections)[number]; delay: number }) {
  return (
    <section className="mt-5 animate-fade-up" style={{ animationDelay: `${delay}ms` }}>
      <div className="mb-3 px-1 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">
        {section.title} ({section.count})
      </div>
      <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-ink-brown-800 shadow-1">
        {section.items.map((item, index) => (
          <div key={`${section.title}-${item.title}`} className={['flex min-h-[64px] items-center gap-3 px-4 py-3', index > 0 ? 'border-t border-white/[0.05]' : ''].join(' ')}>
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
          </div>
        ))}
      </div>
    </section>
  )
}

function RecentSearches() {
  return (
    <section className="px-4 pt-6">
      <div className="mb-3 px-1 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">Recent searches</div>
      <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-ink-brown-800">
        {universalSearch.recent.slice(0, 3).map((item, index) => (
          <div key={item} className={['flex h-12 items-center gap-3 px-4', index > 0 ? 'border-t border-white/[0.05]' : ''].join(' ')}>
            <Clock3 size={16} className="text-white/35" strokeWidth={1.9} />
            <span className="min-w-0 flex-1 truncate text-[15px] leading-5 text-white/60">{item}</span>
            <X size={14} className="text-white/25" strokeWidth={2} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default function UniversalSearchScreen() {
  return (
    <PhoneFrame>
      <ScreenShell showTabBar={false}>
        <main className="min-h-full bg-ink-900 pb-6">
          <SearchHeader />
          <SiaSuggestion />
          <div className="px-4">
            {universalSearch.sections.map((section, index) => (
              <ResultSection key={section.title} section={section} delay={80 + index * 80} />
            ))}
          </div>
          <RecentSearches />
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
