import { Database, Sparkles } from 'lucide-react'
import {
  ChargeMeter,
  Chip,
  CIAInsightCard,
  FloatingQuickLog,
  GlassCard,
  HeatGrid,
  HifiShell,
  Provenance,
  ProgressRing,
  SafetyCard,
  SectionTitle,
  SolidCard,
  TopBar,
  TrendChart,
} from '@/components/hifi/kit'

// Sleep tracking hub. Last-night summary is the hero (real wearable data with
// provenance); trend keeps its honesty caption — one unlogged night is stated,
// never interpolated. No moralizing about poor sleep.
export function S58SleepTracking() {
  return (
    <HifiShell
      atmosphere="cia"
      activeTab="today"
      header={
        <TopBar
          title={<>Sleep <span className="text-emphasis">tracking</span></>}
          right={<Chip tone="you">Lv 12</Chip>}
        />
      }
      bottomAction={<FloatingQuickLog label="Log sleep" />}
    >
      <main className="space-y-4 px-4 pb-4 pt-3">
        <CIAInsightCard
          eyebrow="CIA insight"
          provenance={['Via WHOOP', 'Via Health']}
          actions={
            <>
              <Chip interactive><Database size={12} aria-hidden="true" className="mr-1" />Data sources</Chip>
              <Chip tone="cia" interactive><Sparkles size={12} aria-hidden="true" className="mr-1" />Ask CIA</Chip>
            </>
          }
        >
          HRV dipped after the late session yesterday. An earlier wind-down tonight could help.
        </CIAInsightCard>

        <GlassCard tone="you">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">Last night</h2>
              <p className="mt-1 text-[20px] font-semibold text-white">Sleep summary</p>
            </div>
            <Chip tone="muted">Via wearable</Chip>
          </div>

          <div className="mt-4 flex flex-col items-center gap-4">
            <ProgressRing percent={82} value="82" label="Sleep score" size={120} tone="you" />
            <Provenance items={['Via Health', 'Synced 2h ago']} />
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">Duration</p>
              <p className="mt-1 text-[17px] font-semibold text-white tabular-nums">7.2 hrs</p>
            </div>
            <div className="border-x border-white/10 px-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">Recovery</p>
              <p className="mt-1 text-[17px] font-semibold text-white tabular-nums">64%</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">Span</p>
              <p className="mt-1 text-[17px] font-semibold text-white tabular-nums">10:45p–6:08a</p>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">Sleep reserve</p>
            <div className="mt-2">
              <ChargeMeter filled={3} ticks={4} label="Sleep reserve, 3 of 4" />
            </div>
          </div>
        </GlassCard>

        <div className="grid grid-cols-2 gap-3">
          <SolidCard>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">Sleep stages</h3>
            <div className="mt-3 space-y-3">
              <div>
                <p className="text-[14px] text-white">REM</p>
                <p className="text-[13px] text-white/65 tabular-nums">1h 20m</p>
              </div>
              <div>
                <p className="text-[14px] text-white">Deep</p>
                <p className="text-[13px] text-white/65 tabular-nums">1h 10m</p>
              </div>
            </div>
          </SolidCard>
          <SolidCard>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">Consistency</h3>
            <p className="mt-3 text-[14px] text-white">Around 10:45p</p>
            <div className="mt-3 flex h-16 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="h-2 w-2 rounded-full bg-domain-sleep opacity-80" />
                <span className="h-2 w-2 rounded-full bg-domain-sleep opacity-80" />
                <span className="h-2 w-2 rounded-full bg-domain-sleep" />
                <span className="h-2 w-2 rounded-full bg-domain-sleep opacity-60" />
                <span className="h-2 w-2 rounded-full bg-domain-sleep opacity-80" />
              </div>
            </div>
            <p className="mt-2 text-[11px] leading-4 text-white/45">5 of 7 nights within 30 min</p>
          </SolidCard>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <SectionTitle title="Duration trend" />
            <div role="tablist" aria-label="Trend range" className="flex rounded-full border border-white/10 bg-white/[0.04] p-1">
              <button type="button" role="tab" aria-selected className="min-h-11 rounded-full bg-brand-orange/20 px-3 text-[13px] text-brand-orange">7d</button>
              <button type="button" role="tab" aria-selected={false} className="min-h-11 px-3 text-[13px] text-white/45">14d</button>
              <button type="button" role="tab" aria-selected={false} className="min-h-11 px-3 text-[13px] text-white/45">30d</button>
            </div>
          </div>
          <SolidCard className="pt-5">
            <TrendChart
              past={[6.8, 7.1, 6.5, 7.5, 8.0, 7.2]}
              height={120}
              label="Sleep duration, six logged nights this week"
            />
            <p className="mt-3 text-[11px] leading-4 text-white/45">One night unlogged — not drawn, not estimated.</p>
          </SolidCard>
        </div>

        <div>
          <SectionTitle title="30-night heatmap" meta="Oct" />
          <SolidCard className="mt-2">
            <HeatGrid
              values={[1, 2, 2, 1, 3, 2, 1, 0, 2, 3, 1, 2, 0, 1, 2, 3, 2, 1, 2, 0, 1, 2, 3, 2, 2, 1, 3, 2, 0, 1]}
              columns={10}
              label="Sleep quality heatmap, last 30 nights"
            />
          </SolidCard>
        </div>

        <div>
          <SectionTitle title="Hygiene tips" />
          <div className="mt-2 space-y-2">
            <SolidCard className="py-3">
              <p className="text-[14px] font-semibold text-white">Wrap up exercise earlier</p>
              <p className="mt-1 text-[12px] leading-4 text-white/50">Evidence suggests late workouts may delay sleep onset for some.</p>
            </SolidCard>
            <SolidCard className="py-3">
              <p className="text-[14px] font-semibold text-white">Dim lights an hour before bed</p>
              <p className="mt-1 text-[12px] leading-4 text-white/50">Supports your natural circadian rhythm.</p>
            </SolidCard>
          </div>
        </div>

        <SafetyCard />
      </main>
    </HifiShell>
  )
}
