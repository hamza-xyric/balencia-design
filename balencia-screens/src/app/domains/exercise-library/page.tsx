'use client'

import { useEffect, useMemo, useState } from 'react'
import { Check, Dumbbell, Search, X } from 'lucide-react'
import { Button } from '@/components/design-system/Button'
import { Card } from '@/components/design-system/Card'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { exerciseLibrary } from '@/data/mock'

// Screen 70 of 78: Exercise library
// Spec: /Users/hamza/yHealth/app_design 3/70-exercise-library.md

function FilterRow({ items, selected, delay, onSelect, label }: { items: string[]; selected: string; delay: number; onSelect: (item: string) => void; label: string }) {
  return (
    <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1 hide-scrollbar animate-fade-up" style={{ animationDelay: `${delay}ms` }} role="group" aria-label={label}>
      {items.map((item) => (
        <button key={item} type="button" onClick={() => onSelect(item)} aria-pressed={item === selected} className={['flex h-11 shrink-0 items-center rounded-pill border px-4 text-caption font-semibold', item === selected ? 'border-brand-orange bg-brand-orange/15 text-brand-orange' : 'border-white/10 bg-ink-brown-800 text-white/55'].join(' ')}>
          {item}
        </button>
      ))}
    </div>
  )
}

function DifficultyDots({ level }: { level: number }) {
  return (
    <div className="mt-2 flex gap-1">
      {Array.from({ length: 3 }).map((_, index) => (
        <span key={index} className={['h-2 w-2 rounded-full', index < level ? 'bg-brand-orange' : 'bg-white/15'].join(' ')} />
      ))}
    </div>
  )
}

function ExerciseCard({ exercise, delay, onOpen }: { exercise: (typeof exerciseLibrary.exercises)[number]; delay: number; onOpen: () => void }) {
  return (
    <button type="button" onClick={onOpen} className="rounded-xl text-left" aria-label={`${exercise.name}, ${exercise.muscle}, ${exercise.equipment}`}>
    <Card variant="small" className="overflow-hidden rounded-xl p-0 animate-fade-up" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex h-[104px] items-center justify-center bg-ink-900 text-white/20">
        <Dumbbell size={34} strokeWidth={1.8} />
      </div>
      <div className="p-4">
        <h2 className="line-clamp-2 min-h-10 text-[15px] font-semibold leading-5 text-white">{exercise.name}</h2>
        <p className="mt-1 text-caption leading-[18px] text-white/50">{exercise.muscle}</p>
        <p className="mt-1 text-small leading-[14px] text-white/30">{exercise.equipment}</p>
        <DifficultyDots level={exercise.difficulty} />
      </div>
    </Card>
    </button>
  )
}

export default function ExerciseLibraryScreen() {
  const [query, setQuery] = useState('')
  const [muscle, setMuscle] = useState(exerciseLibrary.muscleFilters[0])
  const [equipment, setEquipment] = useState(exerciseLibrary.equipmentFilters[0])
  const [selected, setSelected] = useState<(typeof exerciseLibrary.exercises)[number] | null>(null)
  const [toast, setToast] = useState('')
  const [source, setSource] = useState<'standalone' | 'fitness' | 'goals' | 'today' | 'workout'>('standalone')
  const planningContext = source === 'workout' || source === 'goals'
  const activeTab = source === 'goals' ? 'goals' : source === 'today' || source === 'fitness' || source === 'workout' ? 'today' : 'me'
  const backHref = source === 'goals' ? '/tabs/goals/create' : source === 'today' || source === 'fitness' || source === 'workout' ? '/domains/fitness' : '/tabs/me/explore'
  const results = useMemo(() => {
    return exerciseLibrary.exercises.filter((exercise) => {
      const matchesQuery = !query || exercise.name.toLowerCase().includes(query.toLowerCase()) || exercise.muscle.toLowerCase().includes(query.toLowerCase())
      const matchesMuscle = muscle === exerciseLibrary.muscleFilters[0] || exercise.muscle === muscle
      const matchesEquipment = equipment === exerciseLibrary.equipmentFilters[0] || exercise.equipment === equipment
      return matchesQuery && matchesMuscle && matchesEquipment
    })
  }, [equipment, muscle, query])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.search)
      const rawSource = params.get('source') || params.get('context')
      if (rawSource === 'goals' || rawSource === 'today' || rawSource === 'fitness' || rawSource === 'workout') {
        setSource(rawSource)
      }
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Exercise library" showBack backHref={backHref} />} activeTab={activeTab}>
        <main className="px-4 pb-20 pt-4">
          <div className="mb-3 rounded-md border border-white/[0.06] bg-ink-brown-800 px-4 py-3 text-caption leading-[18px] text-white/55 animate-fade-up">
            {planningContext
              ? source === 'goals'
                ? 'Adding to the mission workout plan. Selected exercises will return to the Goals stack.'
                : 'Adding to the active workout plan. Selected exercises will return to Fitness.'
              : 'Browsing the exercise library. Open from a workout plan to add exercises.'}
          </div>
          <div className="flex h-11 items-center gap-3 rounded-md border border-white/10 bg-ink-brown-800 px-4 shadow-1 animate-fade-up">
            <Search size={16} className="shrink-0 text-white/40" strokeWidth={1.9} />
            <label className="sr-only" htmlFor="exercise-search">Search exercises</label>
            <input id="exercise-search" value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 bg-transparent text-[15px] leading-5 text-white outline-none placeholder:text-white/40" placeholder="Search exercises..." />
          </div>
          <FilterRow items={exerciseLibrary.muscleFilters} selected={muscle} onSelect={setMuscle} delay={80} label="Muscle filters" />
          <FilterRow items={exerciseLibrary.equipmentFilters} selected={equipment} onSelect={setEquipment} delay={160} label="Equipment filters" />

          <div className="mt-4 text-caption leading-[18px] text-white/40 animate-fade-up" style={{ animationDelay: '240ms' }}>
            {results.length} of {exerciseLibrary.count} exercises
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            {results.map((exercise, index) => (
              <ExerciseCard key={exercise.name} exercise={exercise} delay={320 + index * 60} onOpen={() => setSelected(exercise)} />
            ))}
          </div>
          {results.length === 0 && (
            <Card variant="small" className="mt-4 p-5 text-center text-[15px] leading-5 text-white/60">No exercises match these filters. Clear search or choose All.</Card>
          )}
        </main>
        {selected && (
          <div className="absolute inset-x-0 bottom-[84px] z-20 mx-3 max-h-[74%] overflow-y-auto rounded-xl border border-white/10 bg-ink-brown-800 p-4 shadow-2" role="dialog" aria-label={`${selected.name} details`}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-[20px] font-bold leading-6 text-white">{selected.name}</h2>
                <p className="mt-1 text-caption leading-[18px] text-white/50">{selected.muscle} - {selected.equipment}</p>
              </div>
              <button type="button" onClick={() => setSelected(null)} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white/60" aria-label="Close exercise details"><X size={18} /></button>
            </div>
            <div className="mt-4 flex h-[140px] items-center justify-center rounded-lg bg-ink-900 text-white/20"><Dumbbell size={42} /></div>
            <div className="mt-4 space-y-3 text-[15px] leading-5 text-white/70">
              <p><strong className="text-white">Instructions:</strong> Brace, move with control, pause at the end range, and keep breathing steady.</p>
              <p><strong className="text-white">Variation:</strong> Use lighter load or shorten range if form changes.</p>
            </div>
            {planningContext ? (
              <Button onClick={() => { setSelected(null); setToast(`${selected.name} added to workout`) }} fullWidth variant="completion" className="mt-4">Add to workout</Button>
            ) : (
              <div className="mt-4 rounded-md bg-ink-900 p-3 text-caption leading-[18px] text-white/55">
                Add to workout appears only when this library is opened from an active plan.
              </div>
            )}
          </div>
        )}
        {toast && <div className="absolute inset-x-4 bottom-[96px] z-30 flex min-h-11 items-center gap-2 rounded-pill bg-forest-green px-4 text-[14px] font-semibold text-white shadow-2" role="status"><Check size={16} />{toast}</div>}
      </ScreenShell>
    </PhoneFrame>
  )
}
