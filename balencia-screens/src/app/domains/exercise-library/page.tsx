import { Dumbbell, Search } from 'lucide-react'
import { Card } from '@/components/design-system/Card'
import { Chip } from '@/components/design-system/Chip'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { exerciseLibrary } from '@/data/mock'

// Screen 70 of 78: Exercise library
// Spec: /Users/hamza/yHealth/app_design 3/70-exercise-library.md

function FilterRow({ items, selectedIndex, delay }: { items: string[]; selectedIndex: number; delay: number }) {
  return (
    <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1 hide-scrollbar animate-fade-up" style={{ animationDelay: `${delay}ms` }}>
      {items.map((item, index) => (
        <Chip key={item} selected={index === selectedIndex}>{item}</Chip>
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

function ExerciseCard({ exercise, delay }: { exercise: (typeof exerciseLibrary.exercises)[number]; delay: number }) {
  return (
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
  )
}

export default function ExerciseLibraryScreen() {
  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Exercise library" showBack />} activeTab="me">
        <main className="px-4 pb-20 pt-4">
          <div className="flex h-11 items-center gap-3 rounded-md border border-white/10 bg-ink-brown-800 px-4 shadow-1 animate-fade-up">
            <Search size={16} className="shrink-0 text-white/40" strokeWidth={1.9} />
            <span className="text-[15px] leading-5 text-white/40">Search exercises...</span>
          </div>
          <FilterRow items={exerciseLibrary.muscleFilters} selectedIndex={0} delay={80} />
          <FilterRow items={exerciseLibrary.equipmentFilters} selectedIndex={0} delay={160} />

          <div className="mt-4 text-caption leading-[18px] text-white/40 animate-fade-up" style={{ animationDelay: '240ms' }}>
            {exerciseLibrary.count} exercises
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            {exerciseLibrary.exercises.map((exercise, index) => (
              <ExerciseCard key={exercise.name} exercise={exercise} delay={320 + index * 60} />
            ))}
          </div>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
