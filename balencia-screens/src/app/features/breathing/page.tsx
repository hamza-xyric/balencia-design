'use client'

import { useState } from 'react'
import { Brain, ChevronDown, Flame, Pause, Wind } from 'lucide-react'
import { Card } from '@/components/design-system/Card'
import { Chip } from '@/components/design-system/Chip'
import { BreathingVisual } from '@/components/domain/BreathingVisual'
import { DomainDashboardHeader } from '@/components/domain/DomainDashboardHeader'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { breathingExercises } from '@/data/mock'

// Screen 53 of 78: Breathing exercises
// Spec: /Users/hamza/yHealth/app_design 3/53-breathing-exercises.md

type BreathingExercise = (typeof breathingExercises.exercises)[number]

function getFilteredExercises(activeFilter: string) {
  if (activeFilter === 'All') return breathingExercises.exercises
  return breathingExercises.exercises.filter((exercise) => exercise.tags.includes(activeFilter))
}

function StatsCard() {
  return (
    <Card className="animate-fade-up p-4">
      <div className="grid grid-cols-2 gap-3">
        {breathingExercises.stats.map((stat) => (
          <div key={stat.label} className="rounded-md bg-ink-900/70 p-3">
            <div className="flex items-center gap-1 text-h2 font-semibold leading-[26px] text-white">
              {stat.label.toLowerCase().includes('streak') && <Flame size={18} className="text-brand-orange" fill="currentColor" strokeWidth={2.1} />}
              <span>{stat.value}</span>
            </div>
            <div className="mt-1 text-small leading-[14px] text-white/50">{stat.label}</div>
          </div>
        ))}
      </div>
    </Card>
  )
}

function FilterTags({ active, onChange }: { active: string; onChange: (value: string) => void }) {
  return (
    <div className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 hide-scrollbar animate-fade-up" style={{ animationDelay: '80ms' }}>
      {breathingExercises.filters.map((filter) => (
        <Chip key={filter} domain="wellbeing" selected={active === filter} onClick={() => onChange(filter)} aria-pressed={active === filter} className="h-11 shrink-0 capitalize">
          {filter}
        </Chip>
      ))}
    </div>
  )
}

function ExerciseCard({ exercise, index, onStart }: { exercise: BreathingExercise; index: number; onStart: () => void }) {
  return (
    <button type="button" onClick={onStart} className="block w-full rounded-lg border border-white/[0.06] bg-ink-brown-800 p-4 text-left shadow-1 animate-fade-up" style={{ animationDelay: `${160 + index * 80}ms` }}>
      <div className="flex gap-3">
        {index === 0 ? (
          <BreathingVisual size="mini" />
        ) : (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-domain-wellbeing/15 text-domain-wellbeing">
            {index === 1 ? <Brain size={22} strokeWidth={1.9} /> : <Wind size={22} strokeWidth={1.9} />}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-h3 font-semibold leading-[22px] text-white">{exercise.name}</h2>
            {exercise.recommended && (
              <span className="shrink-0 rounded-pill bg-brand-orange/15 px-2 py-1 text-small font-semibold leading-3 text-brand-orange">
                Recommended
              </span>
            )}
          </div>
          <p className="mt-1 text-caption leading-[18px] text-white/60">{exercise.pattern}</p>
          <p className="mt-1 line-clamp-1 text-caption leading-[18px] text-white/50">{exercise.description}</p>
          <div className="mt-3 flex items-end justify-between gap-3">
            <div className="flex flex-wrap gap-1.5">
              {exercise.tags.map((tag) => (
                <span key={tag} className="rounded-sm bg-domain-wellbeing/10 px-2 py-1 text-small leading-3 text-domain-wellbeing">
                  {tag}
                </span>
              ))}
            </div>
            <span className="shrink-0 text-small leading-[14px] text-white/40">{exercise.durations}</span>
          </div>
        </div>
      </div>
    </button>
  )
}

function ActiveSession({ exercise, paused, duration, onPause, onDuration, onClose, onComplete }: { exercise: BreathingExercise; paused: boolean; duration: string; onPause: () => void; onDuration: () => void; onClose: () => void; onComplete: () => void }) {
  return (
    <main className="flex min-h-full flex-col bg-ink-900 px-4 pb-6 pt-4 text-center">
      <div className="flex items-center justify-between">
        <button type="button" onClick={onClose} className="h-11 rounded-pill px-3 text-[15px] font-semibold leading-5 text-white/60">Close</button>
        <div className="min-w-0">
          <h1 className="truncate text-h3 font-semibold leading-[22px] text-white">{exercise.name}</h1>
          <p className="mt-1 text-caption leading-[18px] text-white/40">{exercise.pattern}</p>
        </div>
        <button type="button" onClick={onPause} aria-label={paused ? 'Resume breathing session' : 'Pause breathing session'} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-ink-900 text-white">
          <Pause size={18} strokeWidth={2.2} />
        </button>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <BreathingVisual size="compact" phase={paused ? 'hold' : 'inhale'} seconds={paused ? 'paused' : '3.2s'} />
      </div>
      <div>
        <div className="text-h2 font-semibold leading-[26px] text-white/80 tabular-nums">{duration} remaining</div>
        <p className="mt-2 text-body leading-[22px] text-white/50">{paused ? 'Paused' : 'Breathe in slowly...'}</p>
      </div>
      <div className="mt-5 flex items-center justify-center gap-4">
        <button type="button" onClick={onPause} className="h-11 rounded-pill border border-white/10 bg-ink-900 px-5 text-[15px] font-semibold leading-5 text-white">
          {paused ? 'Resume' : 'Pause'}
        </button>
        <button type="button" onClick={onDuration} className="flex h-11 items-center gap-2 rounded-pill border border-white/10 bg-ink-900 px-5 text-[15px] font-semibold leading-5 text-white">
          {duration}
          <ChevronDown size={14} className="text-white/40" strokeWidth={2.2} />
        </button>
      </div>
      <button type="button" onClick={onComplete} className="mt-4 h-12 w-full rounded-pill bg-brand-orange text-body font-semibold leading-[22px] text-white">Complete and save</button>
    </main>
  )
}

export default function BreathingExercisesScreen() {
  const [filter, setFilter] = useState('All')
  const [active, setActive] = useState<BreathingExercise | null>(null)
  const [paused, setPaused] = useState(false)
  const [duration, setDuration] = useState('3 min')
  const [complete, setComplete] = useState('')
  const [ratingExercise, setRatingExercise] = useState('')
  const [rating, setRating] = useState(0)
  const [ratingNote, setRatingNote] = useState('')
  const filteredExercises = getFilteredExercises(filter)

  return (
    <PhoneFrame>
      <ScreenShell header={active ? undefined : <DomainDashboardHeader title="Breathing exercises" domain="wellbeing" level={5} />} activeTab="me" showTabBar={!active}>
        {active ? (
          <ActiveSession
            exercise={active}
            paused={paused}
            duration={duration}
            onPause={() => setPaused((value) => !value)}
            onDuration={() => setDuration((value) => value === '3 min' ? '5 min' : '3 min')}
            onClose={() => setActive(null)}
            onComplete={() => {
              setComplete(`${active.name} saved. +20 XP`)
              setRatingExercise(active.name)
              setRating(0)
              setRatingNote('')
              setActive(null)
            }}
          />
        ) : (
        <main className="px-4 pb-20 pt-4">
          <StatsCard />
          <FilterTags active={filter} onChange={setFilter} />
          {complete && <p className="mt-3 rounded-md bg-forest-green/15 p-3 text-caption font-semibold leading-[18px] text-forest-green" role="status">{complete}</p>}
          <section className="mt-5">
            <div className="mb-3 flex items-center justify-between gap-3 px-1">
              <h2 className="text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">
                Exercises
              </h2>
              <span className="text-small font-semibold leading-3 text-white/45" aria-live="polite">
                {filteredExercises.length} {filteredExercises.length === 1 ? 'match' : 'matches'}
              </span>
            </div>
            {filteredExercises.length > 0 ? (
              <div className="space-y-3">
                {filteredExercises.map((exercise, index) => (
                  <ExerciseCard key={exercise.id} exercise={exercise} index={index} onStart={() => { setActive(exercise); setPaused(false) }} />
                ))}
              </div>
            ) : (
              <div className="rounded-md border border-white/[0.06] bg-ink-brown-800 p-4 text-caption leading-[18px] text-white/55">
                No breathing exercises match this context yet.
              </div>
            )}
          </section>
        </main>
        )}
        {ratingExercise && !active && (
          <div className="absolute inset-x-0 bottom-[84px] z-30 mx-3 rounded-xl border border-white/10 bg-ink-brown-800 p-4 shadow-2" role="dialog" aria-label="Rate breathing session">
            <h2 className="text-[17px] font-semibold leading-[22px] text-white">How effective was it?</h2>
            <p className="mt-2 text-caption leading-[18px] text-white/55">SIA will use this prototype rating to recommend better breathing sessions after {ratingExercise}.</p>
            <div className="mt-4 grid grid-cols-5 gap-2" role="radiogroup" aria-label="Effectiveness rating">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={rating === value}
                  onClick={() => setRating(value)}
                  className={['min-h-11 rounded-md border text-[15px] font-semibold', rating === value ? 'border-brand-orange bg-brand-orange text-white' : 'border-white/10 bg-ink-900 text-white/60'].join(' ')}
                >
                  {value}
                </button>
              ))}
            </div>
            <label className="mt-3 block text-caption leading-[18px] text-white/50">
              Optional note
              <textarea
                value={ratingNote}
                onChange={(event) => setRatingNote(event.currentTarget.value)}
                className="mt-1 min-h-[72px] w-full rounded-md border border-white/10 bg-ink-900 p-3 text-[15px] text-white outline-none"
                placeholder="What helped or did not help?"
              />
            </label>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button type="button" onClick={() => setRatingExercise('')} className="min-h-11 rounded-pill text-[15px] font-semibold text-white/50">Skip</button>
              <button
                type="button"
                disabled={rating === 0}
                onClick={() => {
                  setComplete(`Effectiveness rating saved for ${ratingExercise}.`)
                  setRatingExercise('')
                }}
                className="min-h-11 rounded-pill bg-brand-orange text-[15px] font-semibold text-white disabled:bg-white/10 disabled:text-white/35"
              >
                Save rating
              </button>
            </div>
          </div>
        )}
      </ScreenShell>
    </PhoneFrame>
  )
}
