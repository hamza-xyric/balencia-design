import { Apple, Briefcase, ChevronLeft, Dumbbell, Pencil, Plus } from 'lucide-react'
import {
  BtnGhost,
  BtnPrimary,
  CIAInsightCard,
  GlassCard,
  HifiShell,
  IconButton,
  ProgressRing,
  Provenance,
  SectionTitle,
  SolidCard,
} from '@/components/hifi/kit'

// Day-one handoff, fully populated: 2 assessed Domain Stats (Fitness real,
// Career estimated) plus 3 ghosted-unassessed axes on the radar, one
// established mission with a milestone rail. Minimal/editing/error/offline
// states are documented in the source spec rather than duplicated here
// (static prototype, no handlers). Route: /onboarding. The screen's one
// Tiempos emphasis lands on "plan" in the CIA line — the spec's ASCII draft
// also italicises "grows" and "Today", but the cheat-sheet's one-emphasis
// gate means those two render as plain, deliberate type.
const radarAxes = [
  { key: 'fitness', label: 'Fitness', angle: -90, assessed: true, value: 18, projected: 55 },
  { key: 'career', label: 'Career', angle: -18, assessed: true, value: 22, projected: 46 },
  { key: 'nutrition', label: 'Nutrition', angle: 54, assessed: false, value: 0, projected: 0 },
  { key: 'wellbeing', label: 'Wellbeing', angle: 126, assessed: false, value: 0, projected: 0 },
  { key: 'relationships', label: 'Relationships', angle: 198, assessed: false, value: 0, projected: 0 },
] as const

const CENTER = 100
const AXIS_R = 74
const SCALE_MAX = 99

function toXY(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180
  return { x: CENTER + radius * Math.cos(rad), y: CENTER + radius * Math.sin(rad) }
}

// NEW: radial multi-axis plot of simultaneous Domain Stat baselines around
// the Life Power center — TrendChart is a line-over-time, this is a
// radial-over-domains shape. Assessed axes get a solid-orange baseline
// wedge plus a dashed-purple 90-day projection; unassessed axes render as
// ghosted dashed spokes, never a fabricated zero point.
function ConstellationRadar() {
  const assessed = radarAxes.filter(axis => axis.assessed)
  const baselinePoints = assessed.map(axis => toXY(axis.angle, AXIS_R * (axis.value / SCALE_MAX)))
  const projectedPoints = assessed.map(axis => toXY(axis.angle, AXIS_R * (axis.projected / SCALE_MAX)))
  const baselinePath = `M ${CENTER} ${CENTER} ${baselinePoints.map(point => `L ${point.x} ${point.y}`).join(' ')} Z`
  const projectedPath = `M ${CENTER} ${CENTER} ${projectedPoints.map(point => `L ${point.x} ${point.y}`).join(' ')} Z`
  const summary = radarAxes
    .map(axis => {
      if (!axis.assessed) return `${axis.label} not yet assessed`
      return axis.key === 'career' ? `${axis.label} estimated ${axis.value}, low confidence` : `${axis.label} baseline ${axis.value}`
    })
    .join('. ')

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[220px]" role="img" aria-label={`Life power radar. ${summary}.`}>
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <circle cx={CENTER} cy={CENTER} r={AXIS_R} fill="none" className="stroke-white/8" strokeWidth="1" />
        <circle cx={CENTER} cy={CENTER} r={AXIS_R * 0.66} fill="none" className="stroke-white/8" strokeWidth="1" />
        <circle cx={CENTER} cy={CENTER} r={AXIS_R * 0.33} fill="none" className="stroke-white/8" strokeWidth="1" />

        {radarAxes.map(axis => {
          const tip = toXY(axis.angle, AXIS_R)
          return (
            <line
              key={axis.key}
              x1={CENTER}
              y1={CENTER}
              x2={tip.x}
              y2={tip.y}
              className={axis.assessed ? 'stroke-white/15' : 'stroke-white/5'}
              strokeWidth="1"
              strokeDasharray={axis.assessed ? undefined : '2 4'}
            />
          )
        })}

        <path d={projectedPath} fill="none" className="stroke-royal-purple/60" strokeWidth="1.5" strokeDasharray="4 3" strokeLinejoin="round" />
        <path d={baselinePath} className="fill-brand-orange/18 stroke-brand-orange" strokeWidth="2" strokeLinejoin="round" />

        {radarAxes.map(axis => {
          const tip = toXY(axis.angle, AXIS_R)
          if (!axis.assessed) {
            return <circle key={axis.key} cx={tip.x} cy={tip.y} r="2" className="fill-white/15" />
          }
          const point = toXY(axis.angle, AXIS_R * (axis.value / SCALE_MAX))
          return <circle key={axis.key} cx={point.x} cy={point.y} r="3" className="fill-brand-orange" />
        })}
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <ProgressRing percent={72} value="72" label="Life Power" size={84} tone="you" />
        <span className="mt-1 text-[10px] tabular-nums text-white/40">Day one</span>
      </div>
    </div>
  )
}

// NEW: discrete future-step sequence with an explicit "you are here" node.
// MomentumBar/ProgressBar communicate continuous fill, not a current-position
// marker among discrete milestones — this needs its own shape.
function MilestoneTimeline() {
  const steps = ['Week 1', 'Week 4', 'Week 8', 'Week 12', 'Day 90']
  const current = 1
  return (
    <div role="img" aria-label={`Milestone ${current + 1} of ${steps.length}, current`} className="py-1">
      <div className="relative flex items-center justify-between">
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/10" />
        {steps.map((step, index) => (
          <span key={step} className="relative z-10 flex h-3 w-3 items-center justify-center">
            {index === current ? (
              <span className="relative flex h-3 w-3 items-center justify-center">
                <span className="quiet-pulse absolute inset-0 rounded-full bg-brand-orange/40" />
                <span className="h-2.5 w-2.5 rounded-full bg-brand-orange shadow-[var(--glow-orange-sm)]" />
              </span>
            ) : index < current ? (
              <span className="h-2.5 w-2.5 rounded-full bg-forest-green" />
            ) : (
              <span className="h-2 w-2 rounded-full border border-white/20 bg-white/10" />
            )}
          </span>
        ))}
      </div>
      <div className="mt-1.5 flex justify-between text-[9px] uppercase tracking-[0.08em] text-white/30">
        {steps.map((step, index) => (
          <span key={step} className={index === current ? 'font-semibold text-brand-orange' : undefined}>
            {index === current ? 'You are here' : step}
          </span>
        ))}
      </div>
    </div>
  )
}

export function S08InitialPlanSummary() {
  return (
    <HifiShell
      showTabBar={false}
      bottomAction={
        <div className="space-y-2.5 pb-1">
          <BtnPrimary>Enter Today</BtnPrimary>
          <BtnGhost>Customize</BtnGhost>
        </div>
      }
    >
      <main className="space-y-4 px-4 pb-2 pt-1">
        <h1 className="sr-only">Your plan</h1>
        <header className="flex h-11 items-center">
          <IconButton label="Back">
            <ChevronLeft size={20} strokeWidth={1.9} />
          </IconButton>
        </header>

        <CIAInsightCard eyebrow="CIA plan" provenance={['Via onboarding calc']}>
          <p>
            Here&apos;s your <span className="text-emphasis">plan</span>. I&apos;ve broken down your missions into daily
            actions across 3 life areas. Let&apos;s go.
          </p>
        </CIAInsightCard>

        <GlassCard tone="you" className="!rounded-[40px]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">Life Power</span>
            <Provenance items={['Via onboarding calc']} />
          </div>
          <div className="pt-3">
            <ConstellationRadar />
          </div>
          <p className="pt-3 text-center text-[12px] leading-4 text-white/45">Day one — this grows with you.</p>
        </GlassCard>

        <SolidCard className="glow-inner-you p-0">
          <div className="grid grid-cols-3 divide-x divide-white/10">
            <div className="px-3 py-3 text-center">
              <p className="text-[10px] uppercase tracking-[0.1em] text-white/40">Plan</p>
              <p className="mt-0.5 text-[14px] font-semibold text-white">Ready</p>
            </div>
            <div className="px-3 py-3 text-center">
              <p className="text-[10px] uppercase tracking-[0.1em] text-white/40">Areas</p>
              <p className="mt-0.5 text-[14px] font-semibold tabular-nums text-white">3</p>
            </div>
            <div className="px-3 py-3 text-center">
              <p className="text-[10px] uppercase tracking-[0.1em] text-white/40">First action</p>
              <p className="mt-0.5 text-[14px] font-semibold text-white">5 min</p>
            </div>
          </div>
          <div className="flex justify-center border-t border-white/[0.06] px-3 py-2">
            <Provenance items={['Your answers', 'CIA-generated']} />
          </div>
        </SolidCard>

        <div>
          <SectionTitle title="Your domain stats" />
          <div className="mt-2 space-y-2">
            <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-domain-fitness/15 text-domain-fitness">
                <Dumbbell size={16} strokeWidth={1.9} />
              </span>
              <span className="min-w-0 flex-1 text-[14px] font-semibold text-white">Fitness</span>
              <span className="text-[17px] font-semibold tabular-nums text-white">18</span>
              <Provenance items={['Via you logged']} />
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-domain-career/15 text-domain-career">
                <Briefcase size={16} strokeWidth={1.9} />
              </span>
              <span className="min-w-0 flex-1 text-[14px] font-semibold text-white">Career</span>
              <span className="text-[17px] font-semibold tabular-nums text-white/60">~22</span>
              <Provenance items={['Estimated · low confidence']} />
            </div>
          </div>
        </div>

        <div>
          <SectionTitle title="Your missions" />
          <SolidCard className="glow-inner-done mt-2 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-pill border border-domain-fitness/25 bg-domain-fitness/15 px-3 py-1.5 text-[11px] font-semibold text-domain-fitness">
                <Dumbbell className="h-3 w-3" strokeWidth={2} />
                Fitness
              </span>
              <button
                type="button"
                aria-label="Edit mission: run a half marathon"
                className="flex h-11 w-11 shrink-0 items-center justify-center text-white/40"
              >
                <Pencil size={14} strokeWidth={1.9} />
              </button>
            </div>
            <div>
              <h2 className="text-[16px] font-semibold text-white">Run a half marathon</h2>
              <div className="mt-1 flex items-center gap-2">
                <Provenance items={['You selected']} />
              </div>
            </div>
            <div className="space-y-1.5">
              <p className="flex items-center gap-2 text-[12px] text-white/70">
                <span className="h-1 w-1 rounded-full bg-brand-orange" />
                Run 3x per week
              </p>
              <p className="flex items-center gap-2 text-[12px] text-white/70">
                <span className="h-1 w-1 rounded-full bg-brand-orange" />
                Stretch nightly
              </p>
              <p className="flex items-center gap-1.5 pl-3 text-[11px] text-white/45">
                <Plus size={10} strokeWidth={2} />
                And 2 more actions
              </p>
            </div>
            <MilestoneTimeline />
            <div className="flex items-center gap-1.5 border-t border-white/[0.06] pt-3">
              <span className="text-[10px] text-white/40">Connects to</span>
              <span className="inline-flex items-center gap-1.5 rounded-pill border border-domain-nutrition/25 bg-domain-nutrition/15 px-3 py-1.5 text-[11px] font-semibold text-domain-nutrition">
                <Apple className="h-3 w-3" strokeWidth={2} />
                Nutrition
              </span>
            </div>
          </SolidCard>
        </div>
      </main>
    </HifiShell>
  )
}
