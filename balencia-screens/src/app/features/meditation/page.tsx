'use client'

import { useState } from 'react'
import { Pause, Play, SkipForward, Square } from 'lucide-react'
import { Card } from '@/components/design-system/Card'
import { Chip } from '@/components/design-system/Chip'
import { DomainDashboardHeader } from '@/components/domain/DomainDashboardHeader'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { meditationLibrary } from '@/data/mock'

// Screen 54 of 78: Meditation
// Spec: /Users/hamza/yHealth/app_design 3/54-meditation-mindfulness.md

function FilterChips({ active, onChange }: { active: string; onChange: (filter: string) => void }) {
  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 hide-scrollbar animate-fade-up">
      {meditationLibrary.filters.map((filter) => (
        <button key={filter} type="button" aria-pressed={active === filter} onClick={() => onChange(filter)} className="min-h-11 shrink-0">
        <Chip domain="wellbeing" selected={active === filter} className="shrink-0">
          {filter}
        </Chip>
        </button>
      ))}
    </div>
  )
}

function SiaRecommendation({ onBegin }: { onBegin: () => void }) {
  return (
    <Card className="mt-4 p-5 animate-fade-up" style={{ animationDelay: '80ms' }}>
      <div className="flex gap-3">
        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-royal-purple" />
        <div className="min-w-0 flex-1">
          <p className="text-[15px] leading-[22px] text-white">{meditationLibrary.siaNote}</p>
          <button type="button" onClick={onBegin} className="mt-3 min-h-11 w-full rounded-pill bg-brand-orange px-4 text-caption font-semibold leading-[18px] text-white">
            Begin session
          </button>
        </div>
      </div>
    </Card>
  )
}

function CategoryTag({ category }: { category: string }) {
  const classes =
    category === 'Quick reset' ? 'bg-brand-orange/15 text-brand-orange' :
    category === 'Evening' ? 'bg-domain-wellbeing/10 text-domain-wellbeing/80' :
    'bg-domain-wellbeing/15 text-domain-wellbeing'

  return <span className={`rounded-sm px-2 py-1 text-small font-semibold leading-3 ${classes}`}>{category}</span>
}

function PracticeCard({ practice, index, onBegin }: { practice: (typeof meditationLibrary.practices)[number]; index: number; onBegin: () => void }) {
  return (
    <button type="button" onClick={onBegin} className="block w-full text-left" aria-label={`Begin ${practice.name}`}>
    <Card className="p-5 animate-fade-up transition-colors hover:border-brand-orange/30" style={{ animationDelay: `${160 + index * 80}ms` }}>
      <div className="flex items-start justify-between gap-3">
        <h2 className="min-w-0 flex-1 text-body font-semibold leading-[22px] text-white">{practice.name}</h2>
        <span className="shrink-0 text-caption leading-[18px] text-white/50">{practice.duration}</span>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <CategoryTag category={practice.category} />
        {practice.recommended && <span className="rounded-pill bg-brand-orange/15 px-2 py-1 text-small font-semibold leading-3 text-brand-orange">New</span>}
      </div>
      <p className="mt-3 line-clamp-2 text-caption leading-[18px] text-white/70">{practice.why}</p>
      <p className="mt-3 text-small leading-[14px] text-white/40">{practice.when}</p>
      <div className="mt-4 flex h-11 items-center justify-center rounded-pill border border-brand-orange/30 bg-brand-orange/10 text-caption font-semibold text-brand-orange">
        Begin session
      </div>
    </Card>
    </button>
  )
}

function MindfulnessStreak() {
  return (
    <section className="mt-7 animate-fade-up" style={{ animationDelay: '520ms' }}>
      <div className="mb-3 px-1 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">
        Mindfulness streak
      </div>
      <Card>
        <div className="grid grid-cols-7 gap-2">
          {meditationLibrary.streakDays.map((day, index) => (
            <div key={`${day.day}-${index}`} className="text-center">
              <div className="text-small leading-[14px] text-white/40">{day.day}</div>
              <span className={['mx-auto mt-2 block h-3 w-3 rounded-full', day.done ? 'bg-domain-wellbeing' : index === 5 ? 'border border-dashed border-white/30 bg-white/10' : 'bg-white/10'].join(' ')} />
            </div>
          ))}
        </div>
        <div className="mt-5 text-[15px] font-semibold leading-5 text-brand-orange">14 days</div>
      </Card>
    </section>
  )
}

function StatsSection() {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '600ms' }}>
      <div className="mb-3 px-1 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">
        Your stats
      </div>
      <div className="grid grid-cols-3 gap-2">
        {meditationLibrary.stats.map((stat) => (
          <Card key={stat.label} variant="small" className="rounded-md p-3 text-center">
            <div className="text-h2 font-semibold leading-[26px] text-white">{stat.value}</div>
            <div className="mt-1 text-small leading-[14px] text-white/50">{stat.label}</div>
          </Card>
        ))}
      </div>
      <Card variant="small" className="mt-2 rounded-md p-3">
        <div className="flex justify-between gap-3 text-caption leading-[18px]">
          <span className="text-white/50">favorite: {meditationLibrary.favorite}</span>
          <span className="font-semibold text-white/70">{meditationLibrary.favoriteShare}</span>
        </div>
      </Card>
    </section>
  )
}

function ActiveSessionSnapshot({
  practice,
  complete,
  paused,
  rating,
  onPause,
  onSkip,
  onEnd,
  onRate,
  onDone,
}: {
  practice: (typeof meditationLibrary.practices)[number]
  complete: boolean
  paused: boolean
  rating: number
  onPause: () => void
  onSkip: () => void
  onEnd: () => void
  onRate: (rating: number) => void
  onDone: () => void
}) {
  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-ink-900 px-4 pb-8 pt-[70px] animate-fade-up" role="dialog" aria-modal="true" aria-label={`${practice.name} session`}>
      <div className="relative mx-auto flex h-[150px] w-[150px] items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-domain-wellbeing/20 quiet-pulse" aria-hidden="true" />
        <div className="absolute inset-[-20px] rounded-full bg-domain-wellbeing/10 blur-2xl" aria-hidden="true" />
        <span className="relative text-display-l font-bold text-white">{complete ? 'Done' : paused ? 'Paused' : 'Breathe'}</span>
      </div>
      <div className="mt-4 text-center">
        <div className="text-display-l font-bold leading-10 text-white tabular-nums" aria-live="polite">{complete ? '0:00' : paused ? '7:23' : '7:22'}</div>
        <p className="mt-1 text-[15px] leading-5 text-white/50">{practice.name}</p>
      </div>
      {!complete && <div className="mt-6 flex justify-center gap-4 text-white/60">
        <button type="button" onClick={onPause} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-ink-brown-800" aria-label={paused ? 'Resume session' : 'Pause session'}>
          {paused ? <Play size={18} strokeWidth={2.2} /> : <Pause size={18} strokeWidth={2.2} />}
        </button>
        <button type="button" onClick={onSkip} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-ink-brown-800" aria-label="Skip guidance">
          <SkipForward size={18} strokeWidth={2.2} />
        </button>
        <button type="button" onClick={onEnd} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-ink-brown-800" aria-label="End session">
          <Square size={16} strokeWidth={2.2} />
        </button>
      </div>}
      {complete && <div className="mt-6 rounded-lg border border-white/[0.06] bg-ink-brown-800 p-4 text-center">
        <div className="text-h3 font-semibold leading-[22px] text-white">Session complete</div>
        <div className="mx-auto mt-3 w-fit rounded-pill bg-brand-orange/15 px-4 py-2 text-h3 font-semibold leading-[22px] text-brand-orange shadow-[var(--glow-orange)]">+50 XP</div>
        <div className="mt-4 flex justify-center gap-3">
          {[1, 2, 3, 4, 5].map((value) => (
            <button type="button" key={value} onClick={() => onRate(value)} aria-pressed={value <= rating} aria-label={`Rate ${value} out of 5`} className={['flex h-11 w-11 items-center justify-center rounded-full border text-caption font-semibold', value <= rating ? 'border-domain-wellbeing bg-domain-wellbeing text-white' : 'border-white/20 bg-white/10 text-white'].join(' ')}>
              {value}
            </button>
          ))}
        </div>
        <button type="button" onClick={onDone} className="mt-4 h-12 w-full rounded-pill bg-brand-orange text-body font-semibold leading-[22px] text-white">Done</button>
      </div>
      }
    </div>
  )
}

export default function MeditationScreen() {
  const [filter, setFilter] = useState('All')
  const [activePractice, setActivePractice] = useState<(typeof meditationLibrary.practices)[number] | null>(null)
  const [complete, setComplete] = useState(false)
  const [paused, setPaused] = useState(false)
  const [rating, setRating] = useState(4)
  const practices = meditationLibrary.practices.filter((practice) => filter === 'All' || practice.category === filter)
  const begin = (practice = meditationLibrary.practices[0]) => {
    setActivePractice(practice)
    setComplete(false)
    setPaused(false)
  }

  return (
    <PhoneFrame>
      <ScreenShell header={activePractice ? undefined : <DomainDashboardHeader title="Meditation" domain="wellbeing" level={4} />} activeTab="me" showTabBar={!activePractice}>
        {activePractice && (
          <ActiveSessionSnapshot
            practice={activePractice}
            complete={complete}
            paused={paused}
            rating={rating}
            onPause={() => setPaused((value) => !value)}
            onSkip={() => { setPaused(false); setComplete(true) }}
            onEnd={() => { setPaused(false); setComplete(true) }}
            onRate={setRating}
            onDone={() => setActivePractice(null)}
          />
        )}
        {!activePractice && <main className="px-4 pb-20 pt-4">
          <FilterChips active={filter} onChange={setFilter} />
          <SiaRecommendation onBegin={() => begin()} />
          <section className="mt-6">
            <div className="mb-3 px-1 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">
              Practices
            </div>
            <div className="space-y-4">
              {practices.map((practice, index) => (
                <PracticeCard key={practice.id} practice={practice} index={index} onBegin={() => begin(practice)} />
              ))}
            </div>
          </section>
          <MindfulnessStreak />
          <StatsSection />
        </main>}
      </ScreenShell>
    </PhoneFrame>
  )
}
