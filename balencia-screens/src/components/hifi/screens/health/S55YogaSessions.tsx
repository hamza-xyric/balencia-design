import { Check, Flame, Lock, Play } from 'lucide-react'
import {
  Chip,
  CIAInsightCard,
  ConsentRail,
  GlassCard,
  HeatGrid,
  HifiShell,
  ProgressRing,
  Provenance,
  SafetyCard,
  SectionTitle,
  SolidCard,
  TopBar,
} from '@/components/hifi/kit'

export function S55YogaSessions() {
  return (
    <HifiShell
      header={
        <TopBar
          title={<>Yoga <span className="text-emphasis">sessions</span></>}
          right={<Chip tone="you">Lv 12</Chip>}
        />
      }
      activeTab="today"
      showTabBar
      atmosphere="you"
    >
      <main className="space-y-5 px-4 pb-6 pt-3">
        {/* Focal: Streak Hero */}
        <GlassCard tone="you" className="p-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-brand-orange" aria-label="Practice streak" />
              <span className="text-2xl font-semibold tabular-nums text-white">12 days</span>
            </div>
            <Provenance items={['Via yoga logs']} />
          </div>
          <p className="mt-1 text-sm text-white/45">
            Longest streak <span className="tabular-nums text-white/70">18 days</span>
          </p>
          <div className="mt-4 space-y-2">
            <HeatGrid values={[3, 2, 3, 0, 2, 3, 3]} columns={7} />
            <div className="flex justify-between px-1">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                <span key={i} className="text-[10px] uppercase tracking-wide text-white/30">{d}</span>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* CIA Coaching Note */}
        <CIAInsightCard
          provenance={['Via yoga logs', 'Via wellbeing log']}
          actions={<Chip tone="cia" interactive>Start session</Chip>}
        >
          Morning yoga sets the tone for steadier energy through the day.
        </CIAInsightCard>

        {/* Difficulty Filter */}
        <div role="tablist" aria-label="Difficulty filter" className="hide-scrollbar -mx-4 flex items-center gap-2 overflow-x-auto px-4">
          <button type="button" role="tab" aria-selected={false} className="min-h-11 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-3.5 text-[13px] font-medium text-white/85">All</button>
          <button type="button" role="tab" aria-selected className="min-h-11 whitespace-nowrap rounded-full bg-white px-3.5 text-[13px] font-medium text-ink-900">Beginner</button>
          <button type="button" role="tab" aria-selected={false} className="min-h-11 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-3.5 text-[13px] font-medium text-white/85">Intermediate</button>
          <button type="button" role="tab" aria-selected={false} className="min-h-11 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-3.5 text-[13px] font-medium text-white/85">Advanced</button>
        </div>

        {/* Session Catalog */}
        <div className="space-y-3">
          <SessionCard
            title="Morning flow"
            duration="30 min"
            poses="12 poses"
            status="start"
          />
          <SessionCard
            title="Evening wind-down"
            duration="15 min"
            poses="8 poses"
            status="completed"
          />
        </div>

        {/* Pose Library */}
        <div>
          <SectionTitle title="Pose library" meta="See all" />
          <div className="flex gap-3 overflow-x-auto pb-2">
            <PoseCard name="Downward dog" difficulty="Beginner" area="Full body" />
            <PoseCard name="Child's pose" difficulty="Beginner" area="Hips" />
            <PoseCard name="Mountain pose" difficulty="Beginner" area="Core" />
          </div>
        </div>

        {/* Stats */}
        <div>
          <SectionTitle title="Your stats" />
          <div className="grid grid-cols-2 gap-3">
            <SolidCard className="flex flex-col items-center justify-center p-4">
              <ProgressRing percent={84} value="42" label="Of 50" size={96} tone="you" />
              <p className="mt-2 text-xs text-white/45">Poses mastered</p>
              <div className="mt-2">
                <Provenance items={['You logged']} />
              </div>
            </SolidCard>
            <SolidCard className="p-4">
              <div className="space-y-3">
                <div>
                  <p className="text-2xl font-semibold tabular-nums text-white">12</p>
                  <p className="text-xs text-white/45">Sessions this month</p>
                </div>
                <div className="h-px bg-white/5" />
                <div>
                  <p className="text-2xl font-semibold tabular-nums text-white">4.5 h</p>
                  <p className="text-xs text-white/45">Total practice time</p>
                </div>
              </div>
            </SolidCard>
          </div>
        </div>

        {/* Safety + Consent */}
        <div className="space-y-3 pt-2">
          <p className="px-2 text-[11px] leading-4 text-white/55">If practice brings up stress or discomfort, support is one tap away.</p>
          <SafetyCard />
          <ConsentRail compact />
        </div>
      </main>
    </HifiShell>
  )
}

function SessionCard({
  title,
  duration,
  poses,
  status
}: {
  title: string
  duration: string
  poses: string
  status: 'start' | 'completed' | 'loading'
}) {
  const completed = status === 'completed'
  return (
    <SolidCard className="flex h-[112px] items-stretch overflow-hidden">
      {/* Thumbnail slot */}
      <div className="relative w-24 shrink-0 bg-ink-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center">
            {completed ? (
              <Check className="h-4 w-4 text-forest-green" aria-label="Completed" />
            ) : (
              <Play className="h-4 w-4 text-white/70" fill="currentColor" />
            )}
          </div>
        </div>
        {completed && (
          <span className="absolute bottom-1 left-1 rounded bg-forest-green/15 px-1.5 py-0.5 text-[9px] uppercase tracking-wide text-forest-green">
            Done
          </span>
        )}
      </div>
      {/* Details */}
      <div className="flex flex-1 flex-col justify-between py-3 pl-3 pr-2">
        <div>
          <h3 className="text-[15px] font-medium text-white">{title}</h3>
          <p className="mt-0.5 text-xs text-white/45 tabular-nums">{duration} · {poses}</p>
        </div>
        <div className="flex justify-end">
          {completed ? (
            <span className="flex items-center gap-1 text-xs text-forest-green">
              <Check className="h-3 w-3" /> Completed
            </span>
          ) : (
            <button
              type="button"
              disabled={status === 'loading'}
              className="flex min-h-11 items-center gap-1.5 rounded-full bg-white/[0.06] px-3 text-xs font-medium text-white disabled:opacity-40"
              aria-label={`Start ${title}`}
            >
              <Play className="h-3 w-3" fill="currentColor" /> Start
            </button>
          )}
        </div>
      </div>
    </SolidCard>
  )
}

function PoseCard({
  name,
  difficulty,
  area
}: {
  name: string
  difficulty: string
  area: string
}) {
  return (
    <SolidCard className="flex w-[110px] shrink-0 flex-col overflow-hidden">
      <div className="relative h-20 w-full bg-ink-900">
        <div className="absolute inset-0 flex items-center justify-center text-white/20">
          <Lock className="h-4 w-4" aria-label="Tutorial unavailable" />
        </div>
      </div>
      <div className="p-2.5">
        <p className="text-xs font-medium text-white">{name}</p>
        <p className="mt-0.5 text-[10px] text-white/40">{difficulty}</p>
        <p className="text-[10px] text-white/40">{area}</p>
      </div>
    </SolidCard>
  )
}