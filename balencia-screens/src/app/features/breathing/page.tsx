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

function StatsCard() {
  return (
    <Card className="animate-fade-up p-4">
      <div className="grid grid-cols-2 gap-3">
        {breathingExercises.stats.map((stat, index) => (
          <div key={stat.label} className="rounded-md bg-ink-900/70 p-3">
            <div className="flex items-center gap-1 text-h2 font-semibold leading-[26px] text-white">
              {index === 2 && <Flame size={18} className="text-brand-orange" fill="currentColor" strokeWidth={2.1} />}
              <span>{stat.value}</span>
            </div>
            <div className="mt-1 text-small leading-[14px] text-white/50">{stat.label}</div>
          </div>
        ))}
      </div>
    </Card>
  )
}

function FilterTags() {
  return (
    <div className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 hide-scrollbar animate-fade-up" style={{ animationDelay: '80ms' }}>
      {breathingExercises.filters.map((filter, index) => (
        <Chip key={filter} domain="wellbeing" selected={index === 0} className="shrink-0 capitalize">
          {filter}
        </Chip>
      ))}
    </div>
  )
}

function ExerciseCard({ exercise, index }: { exercise: (typeof breathingExercises.exercises)[number]; index: number }) {
  return (
    <Card className="p-4 animate-fade-up" style={{ animationDelay: `${160 + index * 80}ms` }}>
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
    </Card>
  )
}

function ActiveSessionPreview() {
  return (
    <Card className="mt-6 p-5 animate-fade-up" style={{ animationDelay: '560ms' }}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-h3 font-semibold leading-[22px] text-white">Box breathing</h2>
          <p className="mt-1 text-caption leading-[18px] text-white/40">4-4-4-4 rhythm</p>
        </div>
        <button type="button" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-ink-900 text-white">
          <Pause size={18} strokeWidth={2.2} />
        </button>
      </div>
      <div className="mt-5 flex justify-center">
        <BreathingVisual size="compact" phase="inhale" seconds="3.2s" />
      </div>
      <div className="mt-5 text-center">
        <div className="text-h2 font-semibold leading-[26px] text-white/80 tabular-nums">2:47 remaining</div>
        <p className="mt-2 text-body leading-[22px] text-white/50">Breathe in slowly...</p>
      </div>
      <div className="mt-5 flex items-center justify-center gap-4">
        <button type="button" className="h-11 rounded-pill border border-white/10 bg-ink-900 px-5 text-[15px] font-semibold leading-5 text-white">
          Pause
        </button>
        <button type="button" className="flex h-11 items-center gap-2 rounded-pill border border-white/10 bg-ink-900 px-5 text-[15px] font-semibold leading-5 text-white">
          3 min
          <ChevronDown size={14} className="text-white/40" strokeWidth={2.2} />
        </button>
      </div>
    </Card>
  )
}

export default function BreathingExercisesScreen() {
  return (
    <PhoneFrame>
      <ScreenShell header={<DomainDashboardHeader title="Breathing exercises" domain="wellbeing" level={5} />} activeTab="me">
        <main className="px-4 pb-20 pt-4">
          <StatsCard />
          <FilterTags />
          <section className="mt-5">
            <div className="mb-3 px-1 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">
              Exercises
            </div>
            <div className="space-y-3">
              {breathingExercises.exercises.map((exercise, index) => (
                <ExerciseCard key={exercise.id} exercise={exercise} index={index} />
              ))}
            </div>
          </section>
          <ActiveSessionPreview />
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
