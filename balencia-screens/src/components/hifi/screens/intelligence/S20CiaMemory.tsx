import { Search, Settings2, Trash2 } from 'lucide-react'
import {
  BtnGhost,
  ConsentRail,
  GlassCard,
  GlassPillInput,
  HifiShell,
  IconButton,
  Provenance,
  SectionTitle,
  SolidCard,
  TopBar,
  cx,
} from '@/components/hifi/kit'

// Book of life, chosen state: default — Correlations chapter open, hero
// mini-map settled with a quiet breathing glow, one entry fully scored and
// one honest-null. Skeleton (shimmering tabs, ghost mini-map dots),
// empty Day 1 (ghosted placeholder nodes, no edges), node-tap reveal
// (a CIAInsightCard sliding in beneath the mini-map), search-active
// (dimmed tabs, flattened results), edit mode, offline (cached search,
// queued edits with a pending-sync dot), and the Flagging / Delete sheets
// are documented in the source spec rather than duplicated here — static
// prototype, no handlers.

const chapters = ['You', 'Preferences', 'Patterns', 'Correlations', 'Missions', 'Life'] as const

export function S20CiaMemory() {
  return (
    <HifiShell
      header={
        <TopBar
          title={<>Book of <span className="text-emphasis">life</span></>}
          right={
            <IconButton label="Wiki data and consent settings">
              <Settings2 size={19} strokeWidth={1.9} />
            </IconButton>
          }
        />
      }
      activeTab="me"
      atmosphere="cia"
    >
      <main className="space-y-4 px-4 pb-6 pt-2">
        <GlassPillInput icon={<Search size={16} strokeWidth={1.9} />} placeholder="Search memories" />

        <div
          role="tablist"
          aria-label="Wiki chapters"
          className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {chapters.map(chapter => {
            const active = chapter === 'Correlations'
            return (
              <button
                key={chapter}
                type="button"
                role="tab"
                aria-selected={active}
                className={cx(
                  'flex h-11 shrink-0 items-center rounded-pill border px-4 text-[13px] font-medium',
                  active ? 'border-transparent bg-surface-3 text-brand-orange' : 'border-white/10 text-white/50',
                )}
              >
                {chapter}
              </button>
            )
          })}
        </div>

        <SectionTitle title="18 entries" meta="Last updated 2h ago" />

        <GlassCard tone="cia" className="overflow-hidden rounded-[40px]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-10 top-4 h-32 rounded-full bg-royal-purple/10 blur-2xl quiet-pulse"
          />
          <div
            role="img"
            aria-label="Correlation map. Confirmed connection between sleep and fiber, high confidence. CIA-inferred connection between sleep and spend, low confidence."
            className="relative mx-auto h-[168px] w-full max-w-[260px]"
          >
            <svg viewBox="0 0 260 168" className="h-full w-full" aria-hidden="true">
              <path d="M130 38 L70 116" className="stroke-brand-orange" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M130 38 L198 116" className="stroke-royal-purple" strokeWidth="1.75" strokeDasharray="5 5" strokeLinecap="round" fill="none" />
              <circle cx="130" cy="38" r="8" className="fill-brand-orange" />
              <circle cx="70" cy="116" r="7" className="fill-brand-orange" />
              <circle cx="198" cy="116" r="7" className="fill-royal-purple" />
            </svg>
            <span className="absolute left-1/2 top-[8%] -translate-x-1/2 text-[11px] font-medium text-white/75">Sleep</span>
            <span className="absolute left-[14%] top-[72%] text-[11px] font-medium text-white/75">Fiber</span>
            <span className="absolute right-[8%] top-[72%] text-[11px] font-medium text-white/75">Spend</span>
          </div>
          <div className="relative mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3">
            <span className="flex items-center gap-1.5 text-[11px] text-white/55">
              <span className="h-[2px] w-4 rounded-pill bg-brand-orange" aria-hidden="true" /> Confirmed
            </span>
            <span className="flex items-center gap-1.5 text-[11px] text-white/55">
              <span className="h-[2px] w-4 rounded-pill border-t border-dashed border-royal-purple" aria-hidden="true" /> CIA-inferred
            </span>
          </div>
        </GlassCard>

        <SolidCard className="space-y-3">
          <div>
            <h2 className="text-[15px] font-semibold text-white">Gut health &amp; sleep</h2>
            <p className="mt-1 text-[13px] leading-[19px] text-white/65">High-fiber breakfasts correlate with deeper sleep on the same night.</p>
          </div>
          <div className="flex gap-2">
            <span className="rounded-pill bg-domain-nutrition/15 px-3 py-1 text-[11px] font-semibold text-domain-nutrition">Nutrition</span>
            <span className="rounded-pill bg-domain-wellbeing/15 px-3 py-1 text-[11px] font-semibold text-domain-wellbeing">Wellbeing</span>
          </div>
          <div className="border-t border-white/[0.06] pt-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-white/45">Confidence</span>
              <span className="text-[12px] font-semibold text-white tabular-nums">78% high</span>
            </div>
            <ConfidenceMeter filled={6} />
            <div className="mt-2"><Provenance items={['Detected from data · 2d ago']} /></div>
          </div>
          <div className="flex items-center gap-1">
            <BtnGhost quiet>Edit</BtnGhost>
            <BtnGhost quiet>This is wrong</BtnGhost>
            <IconButton label="Delete this memory">
              <Trash2 size={16} strokeWidth={1.8} />
            </IconButton>
          </div>
        </SolidCard>

        <SolidCard className="space-y-3">
          <div>
            <h2 className="text-[15px] font-semibold text-white">Workout skips &amp; sleep debt</h2>
            <p className="mt-1 text-[13px] leading-[19px] text-white/65">You skip workouts most often after nights under six hours of sleep.</p>
          </div>
          <div className="flex gap-2">
            <span className="rounded-pill bg-domain-fitness/15 px-3 py-1 text-[11px] font-semibold text-domain-fitness">Fitness</span>
            <span className="rounded-pill bg-domain-wellbeing/15 px-3 py-1 text-[11px] font-semibold text-domain-wellbeing">Wellbeing</span>
          </div>
          <div className="border-t border-white/[0.06] pt-3">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-white/45">Confidence</span>
            <p className="mt-1 text-[12px] text-white/40">Needs more data to score</p>
          </div>
          <div className="flex items-center gap-1">
            <BtnGhost quiet>Edit</BtnGhost>
            <BtnGhost quiet>This is wrong</BtnGhost>
            <IconButton label="Delete this memory">
              <Trash2 size={16} strokeWidth={1.8} />
            </IconButton>
          </div>
        </SolidCard>

        <GlassCard tone="muted">
          <p className="text-[12px] leading-4 text-white/55">CIA&rsquo;s memory reads from your logs and wearables. Every entry names its source and can be corrected or removed.</p>
          <ConsentRail compact />
        </GlassCard>
      </main>
    </HifiShell>
  )
}

// Purple-tinted 8-tick confidence bar — always purple since this metric is
// the one CIA-derived measure on the screen (see spec §6 correction).
function ConfidenceMeter({ filled, total = 8 }: { filled: number; total?: number }) {
  return (
    <div className="mt-2 flex h-1.5 gap-1" role="img" aria-label={`${filled} of ${total} confidence bars filled`}>
      {Array.from({ length: total }).map((_, index) => (
        <span key={index} className={cx('h-full flex-1 rounded-pill', index < filled ? 'bg-royal-purple' : 'bg-white/10')} />
      ))}
    </div>
  )
}
