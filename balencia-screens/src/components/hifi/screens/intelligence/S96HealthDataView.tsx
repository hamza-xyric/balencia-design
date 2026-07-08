import { AlertTriangle, Check, ChevronRight, Download, RefreshCw, ShieldCheck, Trash2 } from 'lucide-react'
import {
  BtnCoach,
  Chip,
  CIAInsightCard,
  cx,
  GlassCard,
  HifiShell,
  IconButton,
  ProgressRing,
  Provenance,
  SectionTitle,
  SolidCard,
  TopBar,
  TrendChart,
} from '@/components/hifi/kit'

// Health data view, chosen state: default — WHOOP as primary source, one
// bridge-limited provider, and a two-signal CIA read above readiness 84.
// Skeleton (ring and bento hold shape, no numbers), partial (honest-null
// metric cards), stale/offline (cached metrics + last-sync caption), and the
// sync-failure banner are documented in the source spec and not rendered in
// parallel here, per catalog.

const vitals = [
  { label: 'HRV', value: '42', unit: 'ms', source: 'Via WHOOP' },
  { label: 'Strain', value: '14.2', unit: '', source: 'Via WHOOP' },
  { label: 'RHR', value: '52', unit: 'bpm', source: 'Via Health' },
  { label: 'Sleep', value: '7h 12m', unit: '', source: 'Via wearable' },
] as const

const readinessTabs = ['Readiness', 'Sleep', 'Strain'] as const

export function S96HealthDataView() {
  return (
    <HifiShell
      header={
        <TopBar
          title="Health connections"
          right={<IconButton label="Manual sync"><RefreshCw size={18} strokeWidth={1.9} /></IconButton>}
        />
      }
      atmosphere="you"
      activeTab="me"
    >
      <main className="space-y-4 px-4 pb-4 pt-3">
        <GlassCard tone="you">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-orange">Balencia readiness</p>
              <p className="mt-2 text-[15px] leading-5 text-white">
                Recovery is high. Your <span className="text-emphasis">readiness</span> is holding steady.
              </p>
              <p className="mt-1 text-[12px] leading-4 text-white/50">House score, provider-neutral, via WHOOP + app</p>
            </div>
            <ProgressRing percent={84} value="84" size={92} tone="you" />
          </div>
          <div className="mt-4">
            <BtnCoach className="h-11 text-[14px]">Talk to CIA</BtnCoach>
          </div>
        </GlassCard>

        <div>
          <SectionTitle title="Vitals" />
          <div className="mt-2 grid grid-cols-2 gap-3">
            {vitals.map(vital => (
              <SolidCard key={vital.label}>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-white/45">{vital.label}</p>
                <p className="mt-1 flex items-baseline gap-1 text-[20px] font-semibold leading-6 text-white tabular-nums">
                  {vital.value}{vital.unit && <span className="text-[12px] font-normal text-white/45">{vital.unit}</span>}
                </p>
                <div className="mt-2"><Chip>{vital.source}</Chip></div>
              </SolidCard>
            ))}
          </div>
          <div className="mt-2 flex min-h-11 items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] px-3">
            <span className="text-[12px] text-white/55">Device-native: WHOOP recovery <span className="font-semibold text-white tabular-nums">78</span></span>
          </div>
        </div>

        <CIAInsightCard provenance={['HRV', 'Sleep', 'Strain']}>
          <p>Recovery is high. Consider a heavier focus block if it still feels right.</p>
        </CIAInsightCard>

        <div>
          <div role="tablist" aria-label="Trend metric" className="flex h-11 items-center gap-1 rounded-pill border border-white/10 bg-white/[0.03] p-1">
            {readinessTabs.map(tab => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={tab === 'Readiness'}
                className={cx('flex h-full flex-1 items-center justify-center rounded-pill text-[12px] font-medium', tab === 'Readiness' ? 'bg-white/10 text-white' : 'text-white/45')}
              >
                {tab}
              </button>
            ))}
          </div>
          <SolidCard className="mt-2">
            <TrendChart
              past={[62, 58, 66, 70, 74, 79, 84]}
              height={90}
              label="Readiness trend for the last 7 days, real values rising from 62 to 84"
            />
            <div className="mt-2"><Provenance items={['Via WHOOP + app']} /></div>
          </SolidCard>
        </div>

        <div>
          <SectionTitle title="Health data sources" meta="Compliance" />
          <SolidCard className="mt-2 divide-y divide-white/[0.06] p-0">
            <div className="flex items-center justify-between gap-3 p-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-medium text-white">WHOOP</span>
                  <Chip tone="you">Primary</Chip>
                </div>
                <span className="mt-1 flex items-center gap-1 text-[12px] text-white/45">
                  <Check size={12} strokeWidth={2} className="text-forest-green" /> Synced 2h ago
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                <button type="button" className="flex min-h-11 items-center justify-center rounded-lg border border-white/10 px-3 text-[12px] text-white/70">Revoke</button>
                <IconButton label="Delete synced WHOOP records"><Trash2 size={16} strokeWidth={1.9} /></IconButton>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 p-4">
              <div className="min-w-0">
                <p className="text-[14px] font-medium text-white/80">Apple Health</p>
                <p className="mt-1 text-[12px] text-white/45">Requires native app bridge</p>
              </div>
              <button type="button" className="flex min-h-11 shrink-0 items-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] px-3 text-[12px] text-white/70">
                Setup <ChevronRight size={13} strokeWidth={1.9} />
              </button>
            </div>
            <button type="button" className="flex min-h-14 w-full items-center justify-between p-4">
              <span className="flex items-center gap-2 text-[13px] text-white/75"><Download size={16} strokeWidth={1.9} className="text-white/40" /> Export data</span>
              <ChevronRight size={16} strokeWidth={1.9} className="text-white/30" />
            </button>
            <button type="button" className="flex min-h-14 w-full items-center justify-between p-4">
              <span className="flex items-center gap-2 text-[13px] text-white/75"><ShieldCheck size={16} strokeWidth={1.9} className="text-white/40" /> Retention info</span>
              <ChevronRight size={16} strokeWidth={1.9} className="text-white/30" />
            </button>
          </SolidCard>
        </div>

        <div className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-3">
          <AlertTriangle size={15} strokeWidth={1.9} className="mt-0.5 shrink-0 text-white/45" />
          <p className="text-[11px] leading-4 text-white/55">
            Informational, not diagnostic. Urgent symptoms route to appropriate care guidance.
          </p>
        </div>
      </main>
    </HifiShell>
  )
}
