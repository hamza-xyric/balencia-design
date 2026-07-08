import { Camera, Download, Filter, MoreHorizontal, RotateCcw, Trash2 } from 'lucide-react'
import {
  BtnGhost,
  Chip,
  CIAInsightCard,
  ConsentRail,
  cx,
  GlassCard,
  HifiShell,
  IconButton,
  Provenance,
  SectionTitle,
  SolidCard,
  TopBar,
  type Tone,
} from '@/components/hifi/kit'

const historyFilters = ['All', 'Saved', 'Shared', 'Deleting']

function LookThumb({ muted = false }: { muted?: boolean }) {
  return (
    <div
      className={cx('flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]', muted && 'opacity-50')}
      role="img"
      aria-label="Privacy-safe try-on thumbnail, no identifiable person shown"
    >
      <Camera size={18} strokeWidth={1.6} className="text-white/40" aria-hidden="true" />
    </div>
  )
}

function LookTimelineRow({
  name,
  sourceLabel,
  renderLabel,
  statusLabel,
  statusTone = 'muted',
  provenance,
  lowConfidence = false,
  actionLabel,
  ActionIcon,
}: {
  name: string
  sourceLabel: string
  renderLabel: string
  statusLabel: string
  statusTone?: Tone
  provenance: string[]
  lowConfidence?: boolean
  actionLabel: string
  ActionIcon: typeof RotateCcw
}) {
  return (
    <SolidCard>
      <div className="flex items-start gap-3">
        <LookThumb muted={lowConfidence} />
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className={cx('text-[15px] font-semibold leading-5 text-white', lowConfidence && 'text-white/50')}>{name}</h3>
            <IconButton label={`${name} options`}>
              <MoreHorizontal size={16} strokeWidth={1.9} />
            </IconButton>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <Chip>{sourceLabel}</Chip>
            <Chip>{renderLabel}</Chip>
            <Chip tone={statusTone}>{statusLabel}</Chip>
          </div>
          <Provenance items={provenance} />
          <div className="flex gap-2 pt-1">
            <BtnGhost quiet className="gap-1.5">
              <ActionIcon size={14} strokeWidth={1.9} aria-hidden="true" />
              {actionLabel}
            </BtnGhost>
            <BtnGhost quiet className="gap-1.5">
              <Trash2 size={14} strokeWidth={1.9} aria-hidden="true" />
              Delete look
            </BtnGhost>
          </div>
        </div>
      </div>
    </SolidCard>
  )
}

// Try-on history, default state: hero counts, filter row, three saved looks
// (one with a deleted source, one flagged low-confidence), a CIA read backed
// by 3 saved looks, and the privacy footer. Skeleton (shimmering thumbnails
// and counts, no invented numbers), empty (HonestNullState routes to Virtual
// try-on), and offline (cached rows + retry) are documented in the source
// spec and not rendered in parallel here, per catalog.

export function S87TryonHistory() {
  return (
    <HifiShell
      header={
        <TopBar
          title={
            <>
              Try-on <span className="text-emphasis">history</span>
            </>
          }
          right={
            <div className="flex items-center gap-1">
              <IconButton label="Filter try-on history">
                <Filter size={17} strokeWidth={1.9} />
              </IconButton>
              <IconButton label="More try-on history actions">
                <MoreHorizontal size={17} strokeWidth={1.9} />
              </IconButton>
            </div>
          }
        />
      }
      atmosphere="you"
      showTabBar={false}
    >
      <main className="space-y-4 px-4 pb-6 pt-3">
        <GlassCard tone="you">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">Try-on history</p>
          <h2 className="mt-1 text-[19px] font-semibold leading-6 text-white">Saved looks</h2>
          <div className="mt-4 grid grid-cols-3 gap-3 border-t border-white/10 pt-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/45">Saved looks</p>
              <p className="mt-1 text-[20px] font-semibold text-white tabular-nums">7</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/45">Oldest photo</p>
              <p className="mt-1 text-[20px] font-semibold text-white tabular-nums">18d</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/45">Delete queue</p>
              <p className="mt-1 text-[16px] font-semibold text-white">Clear</p>
            </div>
          </div>
          <div className="mt-4 border-t border-white/10 pt-3">
            <Provenance items={['Try-on history provenance']} />
          </div>
        </GlassCard>

        <div role="tablist" aria-label="Try-on history filters" className="flex items-center gap-1 rounded-pill border border-white/10 bg-white/[0.03] p-1">
          {historyFilters.map((filterLabel, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={index === 0}
              className={cx('flex min-h-11 flex-1 items-center justify-center rounded-pill text-[12px] font-medium', index === 0 ? 'bg-white/10 text-white' : 'text-white/45')}
            >
              {filterLabel}
            </button>
          ))}
        </div>

        <div>
          <SectionTitle title="May 21" meta="2 looks" />
          <div className="mt-2 space-y-3">
            <LookTimelineRow
              name="Linen evening look"
              sourceLabel="Source: upload"
              renderLabel="Render: 82%"
              statusLabel="Retained 2d"
              provenance={['Try-on v2.1', 'Generated May 21']}
              actionLabel="Reuse look"
              ActionIcon={RotateCcw}
            />
            <LookTimelineRow
              name="Workday clean fit"
              sourceLabel="Source: deleted"
              renderLabel="Render: 88%"
              statusLabel="Generated kept"
              statusTone="done"
              provenance={['Try-on v2.1', 'Source revoked']}
              actionLabel="Restore prompt"
              ActionIcon={RotateCcw}
            />
            <LookTimelineRow
              name="Studio neutral test"
              sourceLabel="Source: upload"
              renderLabel="Render: 64%"
              statusLabel="Low confidence"
              provenance={['Flagged by scan', 'Review needed']}
              lowConfidence
              actionLabel="Reuse look"
              ActionIcon={RotateCcw}
            />
          </div>
        </div>

        <CIAInsightCard provenance={['3 saved looks', 'Preference source']}>
          Your saved neutral palette matches three recent outfit notes.
        </CIAInsightCard>

        <ConsentRail />

        <div className="flex flex-col gap-2 pt-1">
          <BtnGhost className="gap-2">
            <Download size={16} strokeWidth={1.9} aria-hidden="true" />
            Export data
          </BtnGhost>
          <BtnGhost quiet className="gap-2">
            <Trash2 size={16} strokeWidth={1.9} aria-hidden="true" />
            Delete all try-on data
          </BtnGhost>
        </div>
      </main>
    </HifiShell>
  )
}
