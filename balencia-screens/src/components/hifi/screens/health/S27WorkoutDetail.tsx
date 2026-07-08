import { Activity, ChevronRight, Dumbbell, Footprints, Pause, SkipForward, Square, Timer } from 'lucide-react'
import {
  BtnPrimary,
  Chip,
  CIAInsightCard,
  ConsentRail,
  GlassCard,
  GlassPillInput,
  HifiShell,
  IconButton,
  MomentumBar,
  ProgressRing,
  Provenance,
  SolidCard,
  TopBar,
} from '@/components/hifi/kit'

// Workout detail / active session, chosen state: default — set 3 of 5 live,
// heart rate real (via WHOOP), pace low-confidence (via Apple Watch), rest
// timer counting down. Skeleton (shimmer exercise + input geometry), empty
// manual-log, offline (queued set save), and post-workout summary are
// documented in the source spec and not rendered in parallel here, per catalog.

export function S27WorkoutDetail() {
  return (
    <HifiShell
      header={
        <TopBar
          title="Exercise 2 of 5"
          right={
            <div className="flex items-center gap-1">
              <span className="text-[13px] font-semibold text-white/70 tabular-nums">12:04</span>
              <IconButton label="Pause workout">
                <Pause size={18} strokeWidth={1.9} />
              </IconButton>
              <IconButton label="Stop workout">
                <Square size={17} strokeWidth={1.9} />
              </IconButton>
            </div>
          }
        />
      }
      atmosphere="you"
      showTabBar={false}
    >
      <main className="space-y-4 px-4 pb-6 pt-3">
        <SolidCard>
          <div className="flex items-center justify-between pb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-white/45">Set progress</span>
            <span className="text-[12px] font-medium text-white/60 tabular-nums">3 of 5 sets</span>
          </div>
          <MomentumBar value={60} label="Cumulative set progress, 60 percent, 3 of 5 sets complete" />
        </SolidCard>

        <div className="grid grid-cols-2 gap-3">
          <SolidCard className="flex min-h-[92px] flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-white/50">
                <Activity size={14} strokeWidth={2} /> Heart rate
              </span>
              <Chip tone="you">Via WHOOP</Chip>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[26px] font-semibold leading-none tracking-tight text-white tabular-nums">135</span>
              <span className="text-[13px] font-medium text-white/45">BPM</span>
            </div>
          </SolidCard>

          <SolidCard className="flex min-h-[92px] flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-white/50">
                <Footprints size={14} strokeWidth={2} /> Pace
              </span>
              <Chip>Via Apple Watch</Chip>
            </div>
            <div className="flex items-baseline gap-1.5 opacity-60">
              <span className="text-[22px] font-semibold leading-none tracking-tight text-white tabular-nums">8:30</span>
              <span className="text-[13px] font-medium text-white/45">/mi</span>
            </div>
            <span className="text-[10px] font-medium uppercase tracking-wide text-white/45">Estimated · low confidence</span>
          </SolidCard>
        </div>

        <GlassCard tone="you" className="avatar-breathe relative overflow-hidden">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45">Back squat</p>
              <h2 className="mt-1 text-[20px] font-semibold leading-6 text-white">Set 3 of 5</h2>
            </div>
            <span className="shrink-0 rounded-pill bg-domain-fitness/15 px-3 py-1 text-[11px] font-semibold text-domain-fitness">
              Fitness
            </span>
          </div>

          <div
            className="mt-4 flex h-[104px] items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]"
            role="img"
            aria-label="Back squat instructional thumbnail placeholder, privacy-safe, no identifiable person"
          >
            <Dumbbell size={24} strokeWidth={1.6} className="text-white/45" aria-hidden="true" />
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div>
              <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wide text-white/50">Weight (lbs)</span>
              <GlassPillInput placeholder="Weight" value="185" focused />
            </div>
            <div>
              <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wide text-white/50">Reps</span>
              <GlassPillInput placeholder="Reps" value="8" />
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="text-[12px] text-white/50">
              Last set: <span className="font-medium text-white/75 tabular-nums">185 x 8</span>
            </p>
            <Provenance items={['You logged']} />
          </div>

          <div className="mt-4">
            <BtnPrimary>Complete set</BtnPrimary>
          </div>
        </GlassCard>

        <div className="flex gap-3">
          <div className="flex-1 rounded-xl border border-white/10 bg-white/[0.02] p-3 opacity-40">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-white/45">Set 4</p>
            <p className="mt-1 text-[12px] leading-4 text-white/55">Locked until set 3 completes</p>
          </div>
          <div className="flex-1 rounded-xl border border-white/10 bg-white/[0.02] p-3 opacity-40">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-white/45">Set 5</p>
            <p className="mt-1 text-[12px] leading-4 text-white/55">Locked until set 4 completes</p>
          </div>
        </div>

        <GlassCard tone="you" className="flex items-center justify-between gap-3 p-3">
          <div className="flex items-center gap-3">
            <ProgressRing percent={75} value="45" label="Sec" size={48} tone="you" />
            <div>
              <p className="text-[15px] font-semibold leading-5 text-white tabular-nums">00:45 remaining</p>
              <p className="flex items-center gap-1 text-[11px] text-white/45">
                <Timer size={11} strokeWidth={2} /> Rest between sets
              </p>
            </div>
          </div>
          <button type="button" className="flex min-h-11 items-center gap-1 px-2 text-[13px] font-semibold text-white/70">
            Skip rest
            <SkipForward size={15} strokeWidth={2} />
          </button>
        </GlassCard>

        <CIAInsightCard
          provenance={['Form guidance']}
          actions={
            <div className="flex w-full items-center justify-between border-t border-white/10 pt-2 text-[12px] text-white/60">
              <span>
                Next up: <span className="font-medium text-white">Romanian deadlift</span>
              </span>
              <ChevronRight size={15} strokeWidth={1.9} />
            </div>
          }
        >
          <p>
            This <span className="text-emphasis">workout</span> stays honest to form. Stop for sharp pain, dizziness, faintness, or chest pain.
          </p>
        </CIAInsightCard>

        <p className="px-2 text-center text-[11px] leading-4 text-white/55">
          Coaching support, not medical advice. Pause anytime.
        </p>

        <ConsentRail compact />

        <div className="flex items-center gap-1.5 px-1 text-[11px] text-white/40">
          <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
          Offline: sets queue locally until reconnected.
        </div>
      </main>
    </HifiShell>
  )
}
