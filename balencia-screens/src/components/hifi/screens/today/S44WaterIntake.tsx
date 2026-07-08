import { Droplets, Info, Plus, Settings, Trash2 } from 'lucide-react'
import {
  ChargeMeter,
  Chip,
  CIAInsightCard,
  ConsentRail,
  FloatingQuickLog,
  GlassCard,
  HifiShell,
  IconButton,
  MomentumBar,
  Provenance,
  ProgressRing,
  SectionTitle,
  SolidCard,
  TopBar,
} from '@/components/hifi/kit'

// Weekly intake in glasses, out of an 8-glass target. `null` marks an
// honest-null day (no entry logged), rendered as a dashed empty column
// rather than a fabricated zero bar.
const weeklyIntake: Array<number | null> = [7, 6, 8, null, 5, 6, 5]
const weeklyLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const weeklyMax = 10
const weeklyTarget = 8

const todaysLog = [
  { amount: '1 glass', time: '7:40 AM', synced: true },
  { amount: '250 ml', time: '10:15 AM', synced: true },
  { amount: '250 ml', time: '11:30 AM', synced: true },
  { amount: '500 ml', time: '1:45 PM', synced: false },
]

export function S44WaterIntake() {
  return (
    <HifiShell
      atmosphere="you"
      activeTab="today"
      bottomAction={<FloatingQuickLog label="Log water" />}
      header={
        <TopBar
          title="Water intake"
          right={
            <IconButton label="Open target and unit settings">
              <Settings size={19} strokeWidth={1.9} />
            </IconButton>
          }
        />
      }
    >
      <main className="space-y-4 px-4 pb-4 pt-3">
        <GlassCard tone="you">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase leading-3 text-white/45">To target</p>
              <p className="mt-1 text-[20px] font-semibold leading-6 text-white tabular-nums">3 to go</p>
            </div>
            <button
              type="button"
              aria-label="View Apple Health data source details"
              className="flex min-h-11 items-center gap-2 rounded-pill border border-white/10 bg-white/[0.04] py-1.5 pl-2 pr-3"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-forest-green/15">
                <Droplets size={14} className="text-forest-green" strokeWidth={2} />
              </span>
              <span className="flex items-center gap-1 text-[12px] font-medium text-white/85">
                Via Apple Health
                <Info size={13} className="text-white/40" strokeWidth={2} />
              </span>
            </button>
          </div>

          <div className="mt-2 flex flex-col items-center py-3">
            <ProgressRing percent={63} value="63%" label="To target" size={180} tone="you" />
            <p className="mt-4 text-center text-[15px] leading-5 text-white/80">
              5 of 8 glasses toward today&apos;s <span className="text-emphasis">intake</span>
            </p>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
            <div>
              <p className="text-[11px] font-semibold uppercase leading-3 text-white/45">Volume</p>
              <p className="mt-1 text-[18px] font-semibold leading-6 text-white/90 tabular-nums">1250 ml</p>
              <p className="text-[12px] leading-4 text-white/45 tabular-nums">63% of daily target</p>
            </div>
            <div className="flex flex-col justify-end gap-2">
              <MomentumBar value={63} label="Momentum, 63 percent of daily target" />
              <ChargeMeter ticks={8} filled={5} label="Reserve to target, 5 of 8 glasses filled" />
            </div>
          </div>
        </GlassCard>

        <div className="grid grid-cols-4 gap-2">
          <button
            type="button"
            aria-label="Log 1 glass of water"
            className="flex min-h-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-1 text-[12px] font-medium text-white/90 tabular-nums"
          >
            1 glass
          </button>
          <button
            type="button"
            aria-label="Log 250 milliliters of water"
            className="flex min-h-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-1 text-[12px] font-medium text-white/90 tabular-nums"
          >
            250 ml
          </button>
          <button
            type="button"
            aria-label="Log 500 milliliters of water"
            className="flex min-h-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-1 text-[12px] font-medium text-white/90 tabular-nums"
          >
            500 ml
          </button>
          <button
            type="button"
            aria-label="Log a custom amount of water"
            className="flex min-h-11 items-center justify-center gap-1 rounded-xl border border-white/10 bg-white/[0.04] px-1 text-[12px] font-medium text-white/90"
          >
            <Plus size={13} strokeWidth={2.2} />
            Custom
          </button>
        </div>

        <SolidCard className="p-0">
          <div className="flex items-center justify-between p-4 pb-2">
            <SectionTitle title="Today's log" meta="4 entries" />
          </div>
          <div className="divide-y divide-white/[0.05]">
            {todaysLog.map(entry => (
              <div key={`${entry.amount}-${entry.time}`} className="group relative flex min-h-[52px] items-center justify-between px-4">
                <div className="flex items-center gap-3">
                  <Droplets size={15} className="text-white/40" strokeWidth={1.9} />
                  <span className="text-[14px] font-medium text-white/90 tabular-nums">{entry.amount}</span>
                </div>
                <div className="flex items-center gap-2 transition-opacity group-hover:opacity-0">
                  <span className="text-[12px] text-white/45 tabular-nums">{entry.time}</span>
                  <Chip tone={entry.synced ? 'done' : 'muted'}>{entry.synced ? 'Synced' : 'Pending'}</Chip>
                </div>
                <button
                  type="button"
                  aria-label={`Delete ${entry.amount} entry at ${entry.time}`}
                  className="absolute right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06] text-white/50 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100"
                >
                  <Trash2 size={15} strokeWidth={1.9} />
                </button>
              </div>
            ))}
          </div>
        </SolidCard>

        <SolidCard>
          <div className="flex items-center justify-between">
            <SectionTitle title="This week" />
            <Provenance items={['Via Apple Health']} />
          </div>
          <div
            className="relative mt-4 flex h-24 items-end justify-between gap-2"
            role="img"
            aria-label="Weekly water intake bar chart against an 8 glass daily target. Wednesday had no log."
          >
            <div
              className="absolute inset-x-0 border-t border-dashed border-white/20"
              style={{ bottom: `${(weeklyTarget / weeklyMax) * 100}%` }}
            />
            {weeklyIntake.map((glasses, index) => (
              <div key={weeklyLabels[index] + index} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex w-full flex-1 items-end justify-center">
                  {glasses === null ? (
                    <div className="h-[30%] w-full max-w-[22px] rounded-md border border-dashed border-white/15" />
                  ) : (
                    <div
                      className="w-full max-w-[22px] rounded-md bg-brand-orange/70"
                      style={{ height: `${(glasses / weeklyMax) * 100}%` }}
                    />
                  )}
                </div>
                <span className="text-[10px] font-semibold uppercase leading-3 text-white/45">{weeklyLabels[index]}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 border-t border-white/[0.05] pt-3 text-[11px] leading-4 text-white/45">
            Dashed line marks the daily target. Wednesday&apos;s gap means no entry was logged.
          </p>
        </SolidCard>

        <div className="space-y-2">
          <Provenance items={['Via Apple Health', 'All-time']} />
          <div className="grid grid-cols-3 gap-3">
            <SolidCard className="flex flex-col items-center py-3">
              <span className="text-[10px] font-semibold uppercase leading-3 text-white/45">Streak</span>
              <span className="mt-1.5 text-[19px] font-semibold leading-6 text-white tabular-nums">12</span>
              <span className="text-[11px] leading-4 text-white/45">Days</span>
            </SolidCard>
            <SolidCard className="flex flex-col items-center py-3">
              <span className="text-[10px] font-semibold uppercase leading-3 text-white/45">Average</span>
              <span className="mt-1.5 text-[19px] font-semibold leading-6 text-white tabular-nums">6.5</span>
              <span className="text-[11px] leading-4 text-white/45">Glasses</span>
            </SolidCard>
            <SolidCard className="flex flex-col items-center py-3">
              <span className="text-[10px] font-semibold uppercase leading-3 text-white/45">Best</span>
              <span className="mt-1.5 text-[19px] font-semibold leading-6 text-white tabular-nums">9</span>
              <span className="text-[11px] leading-4 text-white/45">Glasses</span>
            </SolidCard>
          </div>
        </div>

        <CIAInsightCard
          provenance={["Context: today's run"]}
          actions={
            <button
              type="button"
              aria-label="Log 250 milliliters after today's run"
              className="flex min-h-11 items-center gap-2 rounded-pill border border-white/10 bg-white/[0.04] px-4 text-[13px] font-medium text-white/90"
            >
              <Plus size={14} strokeWidth={2.2} />
              Log 250 ml
            </button>
          }
        >
          Add 250 ml after today&apos;s run to stay ahead of tomorrow&apos;s dehydration risk.
        </CIAInsightCard>

        <SolidCard>
          <SectionTitle title="Data and consent" meta="Apple Health" />
          <dl className="mt-3 space-y-2 text-[13px] leading-4">
            <div className="flex items-center justify-between border-b border-white/[0.05] pb-2">
              <dt className="text-white/50">Category</dt>
              <dd className="text-white/85">Hydration</dd>
            </div>
            <div className="flex items-center justify-between border-b border-white/[0.05] pb-2">
              <dt className="text-white/50">Scope</dt>
              <dd className="text-white/85">Water only</dd>
            </div>
            <div className="flex items-center justify-between border-b border-white/[0.05] pb-2">
              <dt className="text-white/50">Freshness</dt>
              <dd className="text-white/85 tabular-nums">Synced 2 minutes ago</dd>
            </div>
            <div className="flex items-center justify-between pb-1">
              <dt className="text-white/50">Retention</dt>
              <dd className="text-white/85">Until revoked</dd>
            </div>
          </dl>
          <ConsentRail compact />
          <p className="mt-3 text-[11px] leading-4 text-white/55">Coaching support, not medical advice.</p>
        </SolidCard>
      </main>
    </HifiShell>
  )
}
