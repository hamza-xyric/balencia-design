import { Camera, Lock, Plus } from 'lucide-react'
import {
  Chip,
  CIAInsightCard,
  ConsentRail,
  cx,
  GlassCard,
  HifiShell,
  IconButton,
  Provenance,
  SolidCard,
  TopBar,
  TrendChart,
} from '@/components/hifi/kit'

// Progress measurements, chosen state: default — weekly weight trend with a
// real 6-week decline, a purple projection toward the target band, consented
// photo bridge open, and a multi-signal CIA read. Skeleton (ghost chart
// only), empty (honest-null "log your first measurement"), stale/offline
// (cached chart, provider retry), success (green measurement toast), and the
// yearly/photo-compare paywall are documented in the source spec and not
// rendered in parallel here, per catalog.

const metricTabs = ['Weight', 'BMI', 'Measurements'] as const
const history = [
  { date: 'Jul 6', value: '176.4 lb', source: 'Smart scale' },
  { date: 'Jun 29', value: '177.1 lb', source: 'Smart scale' },
  { date: 'Jun 22', value: '177.8 lb', source: 'Manual entry' },
] as const

export function S90ProgressMeasurements() {
  return (
    <HifiShell
      header={<TopBar title="Progress" right={<IconButton label="Add measurement"><Plus size={19} strokeWidth={1.9} /></IconButton>} />}
      atmosphere="you"
      activeTab="me"
    >
      <main className="space-y-4 px-4 pb-4 pt-3">
        <div role="tablist" aria-label="Timeframe" className="flex h-11 items-center gap-1 rounded-pill border border-white/10 bg-white/[0.03] p-1">
          <button type="button" role="tab" aria-selected={true} className="flex h-full flex-1 items-center justify-center rounded-pill bg-white/10 text-[13px] font-semibold text-white">
            Weekly
          </button>
          <button type="button" role="tab" aria-selected={false} className="flex h-full flex-1 items-center justify-center rounded-pill text-[13px] font-medium text-white/45">
            Monthly
          </button>
          <button type="button" role="tab" aria-selected={false} aria-disabled="true" className="flex h-full flex-1 items-center justify-center gap-1 rounded-pill text-[13px] font-medium text-white/30">
            <Lock size={11} strokeWidth={2} /> Yearly
          </button>
        </div>

        <GlassCard tone="you">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-orange">Weight trend</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-[36px] font-semibold leading-10 text-white tabular-nums">176.4</span>
            <span className="text-[14px] text-white/45">{'lb'}</span>
          </div>
          <p className="mt-1 text-[13px] text-white/60">Down 1.2 this month</p>
          <div className="mt-2"><Provenance items={['Via smart scale', 'Jul 6']} /></div>
          <div className="mt-4">
            <TrendChart
              past={[179, 178.4, 177.8, 177.5, 177.1, 176.8, 176.4]}
              projected={[176, 175.6, 175.2]}
              milestones={[6]}
              height={110}
              label="Weight trend from May to July, real values declining from 179 to 176.4 pounds, projected toward a 175 pound target"
            />
          </div>
          <div role="tablist" aria-label="Metric" className="mt-4 flex h-11 items-center gap-1 rounded-pill border border-white/10 bg-ink-900 p-1">
            {metricTabs.map(tab => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={tab === 'Weight'}
                className={cx('flex h-full flex-1 items-center justify-center rounded-pill text-[12px] font-medium', tab === 'Weight' ? 'bg-white/10 text-white' : 'text-white/45')}
              >
                {tab}
              </button>
            ))}
          </div>
        </GlassCard>

        <div className="grid grid-cols-2 gap-3">
          <SolidCard>
            <p className="text-[11px] font-semibold uppercase text-white/45">BMI</p>
            <p className="mt-1 text-[22px] font-semibold text-white tabular-nums">24.8</p>
            <p className="mt-1 text-[11px] text-white/40">Estimated · height + weight</p>
          </SolidCard>
          <SolidCard>
            <p className="text-[11px] font-semibold uppercase text-white/45">Waist</p>
            <p className="mt-1 text-[22px] font-semibold text-white tabular-nums">33.1 in</p>
            <p className="mt-1 text-[11px] text-white/40">Body missions: waist target 62%</p>
          </SolidCard>
        </div>

        <SolidCard>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-[13px] text-white/70">
              <Camera size={15} strokeWidth={1.9} className="text-white/45" /> Photos 4
            </span>
            <Chip tone="done">Last sync 2h ago</Chip>
          </div>
        </SolidCard>

        <SolidCard>
          <p className="text-[15px] font-semibold text-white">Photos are private by default</p>
          <p className="mt-1 text-[12px] leading-4 text-white/50">
            Encrypted storage, no model training, no human review unless you ask for support.
          </p>
          <div className="mt-3 flex gap-2">
            <button type="button" className="flex h-11 flex-1 items-center justify-center rounded-pill border border-white/15 bg-white/[0.04] text-[13px] font-semibold text-white">
              Open
            </button>
            <button type="button" className="flex h-11 flex-1 items-center justify-center rounded-pill border border-white/10 text-[13px] font-medium text-white/60">
              Privacy
            </button>
          </div>
        </SolidCard>

        <CIAInsightCard provenance={['Weight via smart scale', 'Sleep via Health']}>
          <p>
            Weight changed alongside sleep. Keep the <span className="text-emphasis">pace</span> steady.
          </p>
        </CIAInsightCard>

        <SolidCard>
          <p className="px-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">History</p>
          <div className="mt-2 space-y-1.5">
            {history.map(row => (
              <div key={row.date} className="flex min-h-11 items-center justify-between rounded-lg bg-white/[0.03] px-3">
                <span className="text-[12px] text-white/50">{row.date}</span>
                <span className="text-[13px] font-medium text-white/85 tabular-nums">{row.value}</span>
                <span className="text-[10px] uppercase tracking-wide text-white/40">{row.source}</span>
              </div>
            ))}
          </div>
        </SolidCard>

        <GlassCard tone="muted">
          <p className="text-[12px] font-semibold uppercase text-white/45">Data & consent</p>
          <p className="mt-1 text-[12px] leading-4 text-white/55">
            Health source chips link to manage your provider. Coaching support, not medical advice.
          </p>
          <ConsentRail compact />
        </GlassCard>
      </main>
    </HifiShell>
  )
}
