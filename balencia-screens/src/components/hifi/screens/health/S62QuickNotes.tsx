import { ArrowUp, Mic, Sparkles } from 'lucide-react'
import {
  Chip,
  ConsentRail,
  GlassCard,
  GlassPillInput,
  HifiShell,
  IconButton,
  Provenance,
  SafetyCard,
  SectionTitle,
  SolidCard,
  TopBar,
  TrendChart,
} from '@/components/hifi/kit'

// Quick notes — frictionless capture ledger. Default state shows today +
// yesterday entries with domain tags and honest source labels; CIA synthesis
// notes are visually distinct (purple) and name their derivation. Voice note
// and save actions live in the composer; save renders disabled (empty input).
export function S62QuickNotes() {
  return (
    <HifiShell
      header={
        <TopBar
          title={<>Quick <span className="text-emphasis">notes</span></>}
          right={<Chip tone="cia" interactive>Ask CIA</Chip>}
        />
      }
      activeTab="today"
      composer={
        <div className="flex items-center gap-2">
          <div className="min-w-0 flex-1">
            <GlassPillInput placeholder="What's on your mind" />
          </div>
          <IconButton label="Record voice note">
            <Mic size={18} strokeWidth={1.9} />
          </IconButton>
          <button
            type="button"
            aria-label="Save note"
            disabled
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-orange text-white opacity-40"
          >
            <ArrowUp size={18} strokeWidth={2.5} />
          </button>
        </div>
      }
    >
      <main className="space-y-5 px-4 pb-6 pt-3">
        <SolidCard>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45">Captured this month</p>
              <p className="text-2xl font-semibold text-white tabular-nums">12 <span className="text-sm font-normal text-white/50">This week</span></p>
              <Provenance items={['Derived locally']} />
            </div>
            <div className="h-12 w-24 shrink-0">
              <TrendChart past={[3, 5, 4, 7, 6, 9, 12]} label="12 notes this week, trending up" height={48} />
            </div>
          </div>
        </SolidCard>

        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 hide-scrollbar">
          <Chip tone="you" interactive pressed>Mood</Chip>
          <Chip interactive pressed={false}>Health</Chip>
          <Chip interactive pressed={false}>Workout</Chip>
          <Chip interactive pressed={false}>Idea</Chip>
          <Chip interactive pressed={false}>Nutrition</Chip>
        </div>

        <section className="space-y-3">
          <SectionTitle title="Today" />

          <GlassCard tone="you">
            <div className="space-y-3">
              <p className="text-[15px] leading-relaxed text-white/90">Felt a sharp pain in my left knee after the morning run. Going to rest it today.</p>
              <div className="flex items-center gap-2 text-[11px]">
                <span className="inline-flex min-h-8 items-center rounded-pill border border-domain-fitness/25 bg-domain-fitness/15 px-3 font-semibold text-domain-fitness">Health</span>
                <span className="text-white/50 tabular-nums">12 min ago</span>
                <span className="text-white/45">· You logged</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard tone="cia">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-royal-purple" />
                <p className="text-[15px] leading-relaxed text-white/90">
                  CIA noted: work stress has appeared in recent notes. This may connect to the sleep dip and evening tension.
                </p>
              </div>
              <div className="flex items-center gap-2 pl-6 text-[11px]">
                <span className="inline-flex min-h-8 items-center rounded-pill border border-royal-purple/25 bg-royal-purple/15 px-3 font-semibold text-royal-purple">Mood</span>
                <span className="text-white/50 tabular-nums">1 hr ago</span>
                <span className="text-white/45">· Derived from chat</span>
              </div>
            </div>
          </GlassCard>
        </section>

        <section className="space-y-3">
          <SectionTitle title="Yesterday" />

          <GlassCard tone="muted">
            <div className="space-y-3">
              <p className="text-[15px] leading-relaxed text-white/90">Hydrated well after lunch. Two full bottles before the afternoon meeting.</p>
              <div className="flex items-center gap-2 text-[11px]">
                <span className="inline-flex min-h-8 items-center rounded-pill border border-domain-nutrition/25 bg-domain-nutrition/15 px-3 font-semibold text-domain-nutrition">Nutrition</span>
                <span className="text-white/50">Mon</span>
                <span className="text-white/45">· You logged</span>
              </div>
            </div>
          </GlassCard>
        </section>

        <div className="space-y-3 pt-2">
          <p className="px-2 text-[11px] leading-4 text-white/55">Notes stay private. CIA reads them only with your consent.</p>
          <SafetyCard />
          <ConsentRail compact />
        </div>
      </main>
    </HifiShell>
  )
}
