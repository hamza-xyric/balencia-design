import { Dumbbell } from 'lucide-react'
import {
  BtnPrimary,
  ChargeMeter,
  Chip,
  CIAInsightCard,
  FloatingQuickLog,
  GlassCard,
  HeatGrid,
  HifiShell,
  MetricPill,
  ProgressBar,
  ProgressRing,
  Provenance,
  SectionTitle,
  SolidCard,
  TopBar,
  TrendChart,
  VolumeBars,
} from '@/components/hifi/kit'

const activeMissions = [
  { label: 'Bench press 125kg', value: 80 },
  { label: 'Run 5k under 25m', value: 40 },
]

const consistency = [
  0, 1, 2, 3, 2, 1, 0,
  1, 2, 3, 3, 2, 1, 1,
  2, 3, 3, 2, 1, 2, 3,
  3, 3, 2, 3, 3, 2, 3,
]

export function S26FitnessDashboard() {
  return (
    <HifiShell
      header={<TopBar title={<>Fitness & <span className="text-emphasis">workouts</span></>} back={false} right={<Chip tone="you">Lv 12</Chip>} />}
      activeTab="today"
      bottomAction={<FloatingQuickLog label="Log workout" />}
    >
      <main className="space-y-4 px-4 pb-4 pt-3">
        <CIAInsightCard provenance={['Via WHOOP']} actions={<Chip tone="cia" interactive>Ask CIA</Chip>}>
          Recovery is high. Good day for intensity.
        </CIAInsightCard>

        <SolidCard>
          <div className="flex items-center gap-4">
            <ProgressRing percent={78} value="78%" label="Recovery" size={110} />
            <div className="min-w-0 flex-1 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <MetricPill label="Sleep" value="84%" tone="you" />
                <MetricPill label="HRV" value="52ms" tone="you" />
              </div>
              <div>
                <p className="mb-1.5 text-[11px] font-semibold uppercase leading-3 text-white/45">Intensity charge 78%</p>
                <ChargeMeter filled={8} label="Intensity charge, 78 percent" />
              </div>
            </div>
          </div>
          <div className="mt-3">
            <Provenance items={['Via WHOOP', 'Synced 2h ago']} />
          </div>
        </SolidCard>

        <GlassCard tone="you">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase leading-3 text-white/45">Today&apos;s workout</p>
              <p className="mt-1 text-[17px] font-semibold leading-6 text-white">Upper body strength · 45m</p>
            </div>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 text-brand-orange">
              <Dumbbell size={19} strokeWidth={1.9} />
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <Chip>Back</Chip>
            <Chip>Chest</Chip>
            <Chip>Arms</Chip>
          </div>
          <div className="mt-4">
            <BtnPrimary className="w-full">Start workout</BtnPrimary>
          </div>
        </GlassCard>

        <SectionTitle title="Active missions" meta="View all" />
        <SolidCard className="space-y-4">
          {activeMissions.map(mission => (
            <div key={mission.label}>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-[13px] leading-4 text-white/75">{mission.label}</span>
                <span className="text-[12px] leading-4 text-white/45 tabular-nums">{mission.value}%</span>
              </div>
              <ProgressBar value={mission.value} />
            </div>
          ))}
        </SolidCard>

        <SectionTitle title="This week" />
        <div className="grid grid-cols-3 gap-2">
          <MetricPill label="Workouts" value="4" tone="you" />
          <MetricPill label="Active min" value="120" tone="you" />
          <MetricPill label="Kcal" value="950" tone="you" />
        </div>
        <div className="flex justify-end px-1">
          <Chip interactive>Data sources</Chip>
        </div>

        <SolidCard>
          <h3 className="mb-3 text-[14px] font-semibold leading-5 text-white">Weekly volume</h3>
          <VolumeBars
            current={[3, 2, 4, 3, 5, 2, 4]}
            previous={[2, 3, 3, 2, 4, 3, 3]}
            labels={['M', 'T', 'W', 'T', 'F', 'S', 'S']}
          />
        </SolidCard>

        <SolidCard>
          <h3 className="mb-3 text-[14px] font-semibold leading-5 text-white">Activity trend</h3>
          <TrendChart
            past={[2, 4, 3, 5, 4, 6, 5]}
            projected={[6, 7, 8]}
            milestones={[2, 5]}
            height={130}
            label="Activity trend, 7 days logged plus 3 days projected"
          />
        </SolidCard>

        <SolidCard>
          <h3 className="mb-3 text-[14px] font-semibold leading-5 text-white">Consistency</h3>
          <HeatGrid values={consistency} columns={7} label="Consistency, last 4 weeks" />
        </SolidCard>

        <p className="px-2 pt-1 text-center text-[11px] leading-4 text-white/55">
          Coaching support, not medical advice. Stop for chest pain, dizziness, or sharp pain.
        </p>
      </main>
    </HifiShell>
  )
}
