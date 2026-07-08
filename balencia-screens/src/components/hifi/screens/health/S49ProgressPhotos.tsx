import { Download, Image as ImageIcon, Lock, ShieldCheck, Trash2 } from 'lucide-react'
import {
  Chip,
  CIAInsightCard,
  cx,
  FloatingQuickLog,
  GlassCard,
  HifiShell,
  MetricPill,
  Provenance,
  SectionTitle,
  SolidCard,
  TopBar,
  TrendChart,
} from '@/components/hifi/kit'

// Private module inside Progress measurements, Fitness, and Today — stack-
// pushed, no tab bar of its own (showTabBar false). Chosen state: default,
// consent accepted, trend populated, two visible photo checkpoints plus one
// hidden by the member, compare enabled. Skeleton (geometry-matched
// shimmer), cold empty (consent card + ghost axis, no CIA note), sync/upload
// error, and privacy-revoked (AI labels stripped, originals kept) are
// documented in the source spec rather than duplicated here — static
// prototype, no handlers. The Sep 15 checkpoint below carries the
// low-confidence read; Aug 18 carries the member-hidden read.

const timeRanges = ['1M', '3M', '6M', '1Y']

const checkpoints = [
  { date: 'Oct 12', state: 'ready' as const, note: 'Analysis ready · via photo AI' },
  { date: 'Sep 15', state: 'low-confidence' as const, note: 'Estimated · low-confidence sample' },
  { date: 'Aug 18', state: 'hidden' as const, note: 'Hidden by you · encrypted original kept' },
]

export function S49ProgressPhotos() {
  return (
    <HifiShell
      header={<TopBar title="Progress photos" right={<Chip tone="you">Lv 12</Chip>} />}
      activeTab="today"
      atmosphere="you"
      showTabBar={false}
      bottomAction={<FloatingQuickLog label="Log weight or photo" />}
    >
      <main className="space-y-4 px-4 pb-4 pt-3">
        <GlassCard tone="muted">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-white/70">
              <ShieldCheck size={19} strokeWidth={1.9} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-semibold leading-5 text-white">Photos stay private</p>
              <p className="mt-1 text-[12px] leading-4 text-white/55">
                Encrypted storage and AI analysis are separate choices. Revoke analysis anytime without deleting your photos.
              </p>
            </div>
          </div>
          <button type="button" className="mt-3 flex min-h-11 items-center gap-1 text-[13px] font-semibold text-brand-orange">
            Manage privacy
          </button>
        </GlassCard>

        <CIAInsightCard provenance={['Weight via wearable', 'You logged']}>
          Weight is trending down alongside more consistent <span className="text-emphasis">photos</span>.
        </CIAInsightCard>

        <GlassCard tone="you">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-orange">Weight trend</p>
            <div role="tablist" aria-label="Trend range" className="flex items-center gap-1 rounded-pill border border-white/10 bg-white/[0.03] p-1">
              {timeRanges.map(range => (
                <button
                  key={range}
                  type="button"
                  role="tab"
                  aria-selected={range === '3M'}
                  className={cx('flex min-h-11 items-center justify-center rounded-pill px-2.5 text-[11px] font-medium', range === '3M' ? 'bg-white/10 text-white' : 'text-white/45')}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-[32px] font-semibold leading-9 text-white tabular-nums">72.0</span>
            <span className="text-[13px] text-white/45">kg</span>
            <span className="text-[12px] text-white/45">· target <span className="tabular-nums">70</span> kg</span>
          </div>
          <div className="mt-3">
            <TrendChart
              past={[74.2, 73.6, 73.1, 72.6, 72.3, 72.0]}
              projected={[71.4, 70.7, 70]}
              milestones={[5]}
              height={110}
              label="Weight trend, recent readings toward 72 kilograms, projection dashed"
            />
          </div>
          <div className="mt-2">
            <Chip>Illustrative range · anchored at 72.0 kg</Chip>
          </div>
          <div className="mt-3">
            <Provenance items={['Via wearable', 'You logged']} />
          </div>
        </GlassCard>

        <div className="grid grid-cols-3 gap-2">
          <MetricPill label="Weight" value="72.0 kg" tone="you" />
          <div>
            <MetricPill label="BMI" value="22.1" tone="muted" />
            <div className="mt-1.5 flex justify-center"><Chip>Calculated</Chip></div>
          </div>
          <div>
            <MetricPill label="Body fat" value="est. 18%" tone="muted" />
            <div className="mt-1.5 flex justify-center"><Chip>Via photo AI</Chip></div>
          </div>
        </div>

        <SectionTitle title="Measurements" meta="See all" />
        <SolidCard className="p-0">
          <div className="divide-y divide-white/[0.06]">
            <div className="flex min-h-11 items-center justify-between px-4 py-3">
              <span className="text-[14px] text-white/85">Waist <span className="tabular-nums">82.0 cm</span></span>
              <Chip>You logged</Chip>
            </div>
            <div className="flex min-h-11 items-center justify-between px-4 py-3">
              <span className="text-[14px] text-white/85">Arms <span className="tabular-nums">35.5 cm</span></span>
              <Chip>You logged</Chip>
            </div>
          </div>
        </SolidCard>

        <SectionTitle title="Progress photos" meta="Compare" />
        <SolidCard>
          <div>
            {checkpoints.map((checkpoint, index) => (
              <PhotoCheckpoint
                key={checkpoint.date}
                date={checkpoint.date}
                state={checkpoint.state}
                note={checkpoint.note}
                isLast={index === checkpoints.length - 1}
              />
            ))}
          </div>
        </SolidCard>

        <div className="grid grid-cols-1 gap-2">
          <button type="button" className="flex min-h-11 items-center justify-center gap-2 rounded-pill border border-white/10 text-[13px] font-medium text-white/70">
            <Download size={15} strokeWidth={1.9} /> Export photos
          </button>
          <button type="button" className="flex min-h-11 items-center justify-center gap-2 rounded-pill border border-white/10 text-[13px] font-medium text-white/70">
            <Trash2 size={15} strokeWidth={1.9} /> Delete set (3 photos)
          </button>
          <button type="button" className="flex min-h-11 items-center justify-center gap-2 rounded-pill border border-white/10 text-[13px] font-medium text-white/55">
            Turn analysis off
          </button>
        </div>

        <p className="px-2 text-center text-[11px] leading-4 text-white/55">
          Photo-based estimates support coaching, not diagnosis. Export and deletion always stay available, on every tier.
        </p>
      </main>
    </HifiShell>
  )
}

// NEW: PhotoTimelineTrack row. Each checkpoint is a styled placeholder panel
// (never a real photo) naming its encryption and analysis-confidence state
// before any estimate is trusted.
function PhotoCheckpoint({
  date,
  state,
  note,
  isLast = false,
}: {
  date: string
  state: 'ready' | 'low-confidence' | 'hidden'
  note: string
  isLast?: boolean
}) {
  const hidden = state === 'hidden'
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <span
          role="img"
          aria-label={hidden ? `Photo from ${date}, hidden by you, encrypted original kept` : `Encrypted photo checkpoint from ${date}`}
          className={cx(
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border',
            hidden ? 'border-white/10 bg-white/[0.03] text-white/40' : 'border-white/10 bg-white/[0.05] text-white/60',
          )}
        >
          <ImageIcon size={16} strokeWidth={1.8} />
        </span>
        {!isLast && <span className="mt-1 w-px flex-1 bg-white/10" aria-hidden="true" />}
      </div>
      <div className={cx('min-w-0 flex-1', !isLast && 'pb-4')}>
        <div className="flex items-center gap-2">
          <p className="text-[14px] font-semibold text-white">{date}</p>
          <span className="flex items-center gap-1 text-[11px] text-white/45">
            <Lock size={11} strokeWidth={2} /> Encrypted
          </span>
        </div>
        <p className="mt-1 text-[12px] leading-4 text-white/50">{note}</p>
      </div>
    </div>
  )
}
