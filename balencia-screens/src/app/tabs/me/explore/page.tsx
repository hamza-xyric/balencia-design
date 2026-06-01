'use client'

import { useMemo, useState } from 'react'
import { domainToneClasses } from '@/components/design-system/Chip'
import { SearchBar } from '@/components/design-system/SearchBar'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { ModuleCard } from '@/components/screens/ModuleCard'
import { domains } from '@/data/domains'
import { exploreDomainSections, standaloneFeatures, suggestedModules, type ExploreModule } from '@/data/mock'

// Screen 18 of 78: Explore section
// Spec: /Users/hamza/yHealth/app_design 3/18-explore-section.md

const userTier = 'Plus'

function moduleMatches(module: ExploreModule, query: string) {
  const haystack = `${module.name} ${module.description} ${module.domain ?? ''} ${module.lockedTier ?? ''}`.toLowerCase()
  return haystack.includes(query.toLowerCase())
}

function isLocked(module: ExploreModule) {
  return module.lockedTier === 'Pro' || (module.lockedTier === 'Plus' && userTier !== 'Plus')
}

function moduleForTier(module: ExploreModule) {
  if (userTier === 'Plus' && module.lockedTier === 'Plus') return { ...module, lockedTier: undefined }
  if (isLocked(module)) return { ...module, route: '/features/paywall' }
  return module
}

function SuggestedSection() {
  return (
    <section className="mt-4 animate-fade-up" style={{ animationDelay: '80ms' }}>
      <h2 className="mb-4 px-4 text-eyebrow font-semibold uppercase tracking-[0.12em] text-white/50">
        Suggested for you
      </h2>
      <div className="overflow-x-auto px-4 pb-2 hide-scrollbar">
        <div className="flex gap-3">
          {suggestedModules.map((module, index) => (
            <ModuleCard
              key={module.id}
              module={moduleForTier(module)}
              variant="suggested"
              className="animate-fade-up"
              style={{ animationDelay: `${160 + index * 80}ms` }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function DomainSection({ section, index }: { section: (typeof exploreDomainSections)[number]; index: number }) {
  const tone = domainToneClasses[section.domain]

  return (
    <section className="mt-5 animate-fade-up" style={{ animationDelay: `${300 + index * 70}ms` }}>
      <div className="sticky top-0 z-10 flex h-8 items-center gap-2 bg-ink-900 px-4">
        <span className={`h-2 w-2 rounded-full ${tone.dot}`} aria-hidden="true" />
        <h2 className="text-[14px] font-semibold leading-[18px] text-white/70">
          {section.title}
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-3 px-4">
        {section.modules.map((module) => (
          <ModuleCard key={module.id} module={moduleForTier(module)} />
        ))}
      </div>
    </section>
  )
}

function MoreFeaturesSection() {
  return (
    <section className="mt-6 px-4 pb-2 animate-fade-up" style={{ animationDelay: '920ms' }}>
      <div className="mb-5 h-px bg-white/[0.08]" />
      <h2 className="mb-4 text-eyebrow font-semibold uppercase tracking-[0.12em] text-white/50">
        More features
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {standaloneFeatures.map((module) => (
          <ModuleCard key={module.id} module={moduleForTier(module)} />
        ))}
      </div>
    </section>
  )
}

export default function ExploreScreen() {
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim()
  const filteredModules = useMemo(() => {
    const allModules = [...suggestedModules, ...exploreDomainSections.flatMap((section) => section.modules), ...standaloneFeatures]
    return allModules.filter((module) => moduleMatches(module, normalizedQuery))
  }, [normalizedQuery])

  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Explore" showBack />} activeTab="me">
        <main className="pb-16 pt-3">
          <div className="px-4 animate-fade-up">
            <SearchBar
              placeholder="Search modules..."
              value={query}
              onValueChange={setQuery}
              onClear={() => setQuery('')}
              inputLabel="Search Explore modules"
            />
          </div>

          {normalizedQuery ? (
            <section className="mt-5 px-4" aria-live="polite">
              <h2 className="mb-3 text-eyebrow font-semibold uppercase tracking-[0.12em] text-white/50">
                Search results
              </h2>
              {filteredModules.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {filteredModules.map((module) => (
                    <ModuleCard key={module.id} module={moduleForTier(module)} />
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-white/[0.06] bg-ink-brown-800 p-5 text-[14px] leading-5 text-white/55">
                  No modules match &ldquo;{normalizedQuery}&rdquo;. Try a domain, habit, sleep, or finance.
                </div>
              )}
            </section>
          ) : (
            <>
              <SuggestedSection />

              {exploreDomainSections.map((section, index) => (
                <DomainSection key={section.id} section={section} index={index} />
              ))}

              <MoreFeaturesSection />
            </>
          )}


          <div className="sr-only">
            {exploreDomainSections.map((section) => (
              <span key={section.id}>{domains[section.domain].label}</span>
            ))}
          </div>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
