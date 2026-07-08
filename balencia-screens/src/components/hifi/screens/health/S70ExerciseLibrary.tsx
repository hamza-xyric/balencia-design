import { Dumbbell, Search, SlidersHorizontal } from 'lucide-react'
import {
  Chip,
  ConsentRail,
  cx,
  GlassCard,
  GlassPillInput,
  HifiShell,
  IconButton,
  SolidCard,
  TopBar,
} from '@/components/hifi/kit'

// Exercise library, chosen state: default — 2-col grid populated from the
// local exercise cache, muscle filter on "All", equipment filter on "Any".
// Skeleton (shimmer grid), empty ("no exercises found"), offline error, and
// the /exercises/[id] detail half-sheet are documented in the source spec
// and not rendered in parallel here, per catalog. One exercise below carries
// the honest-null difficulty read and one carries a low-confidence form cue.

const muscleFilters = ['All', 'Upper body', 'Lower body', 'Core'] as const
const equipmentFilters = ['Any', 'Dumbbell', 'Barbell', 'Bodyweight'] as const

const exercises = [
  { name: 'Bench press', muscle: 'Chest', equipment: 'Barbell', difficulty: 3 as const, cue: 'default' as const },
  { name: 'Back squat', muscle: 'Legs', equipment: 'Barbell', difficulty: 3 as const, cue: 'default' as const },
  { name: 'Plank', muscle: 'Core', equipment: 'Bodyweight', difficulty: 1 as const, cue: 'default' as const },
  { name: 'Pull-up', muscle: 'Back', equipment: 'Bodyweight', difficulty: 2 as const, cue: 'low-confidence' as const },
  { name: 'Farmer carry', muscle: 'Full body', equipment: 'Dumbbell', difficulty: 0 as const, cue: 'default' as const },
  { name: 'Lateral raise', muscle: 'Shoulders', equipment: 'Dumbbell', difficulty: 1 as const, cue: 'default' as const },
]

function DifficultyMeter({ level }: { level: 0 | 1 | 2 | 3 }) {
  if (level === 0) {
    return (
      <div className="mt-2 flex items-center gap-2">
        <div className="flex gap-1" aria-hidden="true">
          {[0, 1, 2].map(index => (
            <span key={index} className="h-3 w-1.5 rounded-pill bg-white/10" />
          ))}
        </div>
        <span className="text-[10px] font-medium uppercase tracking-wide text-white/35">Unrated</span>
      </div>
    )
  }
  const word = level === 1 ? 'Beg' : level === 2 ? 'Int' : 'Adv'
  return (
    <div className="mt-2 flex items-center justify-between" role="img" aria-label={`Difficulty ${level} of 3, ${word}`}>
      <div className="flex gap-1" aria-hidden="true">
        {[1, 2, 3].map(index => (
          <span key={index} className={cx('h-3 w-1.5 rounded-pill', index <= level ? 'bg-brand-orange' : 'bg-white/10')} />
        ))}
      </div>
      <span className="text-[10px] font-semibold uppercase tracking-wide text-brand-orange/80">{word}</span>
    </div>
  )
}

function ExerciseTileCard({
  name,
  muscle,
  equipment,
  difficulty,
  cue,
}: {
  name: string
  muscle: string
  equipment: string
  difficulty: 0 | 1 | 2 | 3
  cue: 'default' | 'low-confidence'
}) {
  return (
    <button type="button" className="w-full text-left active:scale-[0.97]" aria-label={`${name}, ${muscle}, ${equipment}`}>
      <SolidCard>
        <div
          className="flex h-24 items-center justify-center rounded-xl border border-white/5 bg-white/[0.04]"
          role="img"
          aria-label={`${name} instructional thumbnail placeholder, privacy-safe, no identifiable person`}
        >
          <Dumbbell size={22} strokeWidth={1.6} className="text-white/25" aria-hidden="true" />
        </div>
        {cue === 'low-confidence' && (
          <p className="mt-2 text-[10px] font-medium uppercase tracking-wide text-white/45">Form cue · Estimated</p>
        )}
        <h3 className={cx('text-[14px] font-semibold leading-4 text-white', cue === 'low-confidence' ? 'mt-1' : 'mt-3')}>{name}</h3>
        <div className="mt-1 flex items-center justify-between text-[11px] text-white/45">
          <span>{muscle}</span>
          <span>{equipment}</span>
        </div>
        <DifficultyMeter level={difficulty} />
      </SolidCard>
    </button>
  )
}

export function S70ExerciseLibrary() {
  return (
    <HifiShell
      header={
        <TopBar
          title={
            <>
              Exercise <span className="text-emphasis">library</span>
            </>
          }
          right={<IconButton label="Sort and filter"><SlidersHorizontal size={18} strokeWidth={1.9} /></IconButton>}
        />
      }
      atmosphere="you"
      showTabBar={false}
    >
      <main className="space-y-4 px-4 pb-6 pt-3">
        <GlassPillInput icon={<Search size={16} strokeWidth={1.9} />} placeholder="Search exercises..." />

        <div role="tablist" aria-label="Muscle group filter" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
          {muscleFilters.map(muscle => (
            <button
              key={muscle}
              type="button"
              role="tab"
              aria-selected={muscle === 'All'}
              className={cx(
                'flex h-11 shrink-0 items-center justify-center rounded-pill px-4 text-[13px] font-medium',
                muscle === 'All'
                  ? 'bg-brand-orange text-white shadow-[var(--glow-orange-sm)]'
                  : 'border border-white/10 bg-white/[0.03] text-white/60',
              )}
            >
              {muscle}
            </button>
          ))}
        </div>

        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
          {equipmentFilters.map((equipment, index) => (
            <Chip key={equipment} interactive tone={index === 0 ? 'you' : 'muted'} pressed={index === 0}>
              {equipment}
            </Chip>
          ))}
        </div>

        <div className="flex items-center justify-between px-1">
          <span className="text-[13px] text-white/45 tabular-nums">532 exercises</span>
          <Chip>Local cache</Chip>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {exercises.map(exercise => (
            <ExerciseTileCard key={exercise.name} {...exercise} />
          ))}
        </div>

        <GlassCard tone="muted">
          <p className="text-[12px] font-semibold uppercase text-white/45">Data &amp; consent</p>
          <p className="mt-1 text-[12px] leading-4 text-white/55">
            Exercise database chips name source, version, and freshness. Saved selections stay exportable and deletable.
          </p>
          <ConsentRail compact />
        </GlassCard>

        <p className="px-2 text-center text-[11px] leading-4 text-white/55">
          Not medical advice. Consult a provider before new training.
        </p>
      </main>
    </HifiShell>
  )
}
