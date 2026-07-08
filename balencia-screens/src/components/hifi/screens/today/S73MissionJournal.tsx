import { Camera, CheckCircle2, GitFork } from 'lucide-react'
import { ConsentRail, GlassCard, HifiShell, Provenance, SafetyCard, SectionTitle, SolidCard, TopBar } from '@/components/hifi/kit'

// Stack-pushed retrospective companion to the Mission Board, opened from
// Mission Board, Life World, or Me quick links — no live route, no active
// tab, no tab bar. Chosen state: default, populated, two months of history.
// Skeleton (path draws top to bottom, cards hold text and thumbnail
// placeholders), empty (filters and spine hidden, centered starter copy),
// filtered-empty (filters stay visible, months replaced by filtered-empty
// copy), error (cached entries stay visible, Retry offered), disabled-while-
// syncing (filter chips at 40% with a quiet "Syncing your journey" label),
// and offline (OfflineBanner above cached entries) are documented in the
// source spec rather than duplicated here — static prototype, no handlers.
export function S73MissionJournal() {
  return (
    <HifiShell
      header={<TopBar title={<>Mission <span className="text-emphasis">journal</span></>} />}
      showTabBar={false}
    >
      <main className="space-y-5 px-4 pb-8 pt-3">
        <div role="tablist" aria-label="Filter journal entries" className="-mx-1 flex gap-1.5 overflow-x-auto px-1">
          <button type="button" role="tab" aria-selected={true} className="flex h-11 shrink-0 items-center justify-center rounded-pill bg-white/10 px-4 text-[13px] font-semibold text-white">
            All
          </button>
          <button type="button" role="tab" aria-selected={false} className="flex h-11 shrink-0 items-center justify-center rounded-pill px-4 text-[13px] font-medium text-white/45">
            By domain
          </button>
          <button type="button" role="tab" aria-selected={false} className="flex h-11 shrink-0 items-center justify-center rounded-pill px-4 text-[13px] font-medium text-white/45">
            By type
          </button>
        </div>

        <GlassCard tone="you">
          <p className="text-[12px] font-semibold uppercase tracking-wide text-white/45">All-time journey</p>
          <div className="mt-2 flex items-end justify-between">
            <div>
              <span className="text-[28px] font-semibold leading-8 tabular-nums text-white">18</span>
              <span className="ml-2 text-[13px] text-white/55">Completed</span>
            </div>
            <div className="text-right">
              <span className="text-[19px] font-semibold tabular-nums text-white">8,420</span>
              <span className="ml-1.5 text-[12px] text-white/45">XP</span>
            </div>
            <div className="text-right">
              <span className="text-[19px] font-semibold tabular-nums text-white">4</span>
              <span className="ml-1.5 text-[12px] text-white/45">Pivots</span>
            </div>
          </div>
          <div className="mt-3">
            <Provenance items={['Via missions ledger']} />
          </div>
        </GlassCard>

        <section className="space-y-3">
          <SectionTitle title="May 2026" meta="2 entries" />
          <div className="relative space-y-4 pl-6">
            <span className="absolute bottom-2 left-[7px] top-2 w-px bg-white/10" aria-hidden="true" />

            <article className="relative">
              <span className="absolute -left-6 top-5 h-3 w-3 rounded-full border-2 border-ink-900 bg-forest-green shadow-[var(--glow-green-sm)]" aria-hidden="true" />
              <SolidCard>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-[16px] font-semibold leading-5 text-white">Finished emergency fund</h3>
                    <p className="mt-1 text-[13px] tabular-nums text-white/50">12 weeks &middot; 1,200 XP</p>
                  </div>
                  <span className="flex shrink-0 items-center gap-1 rounded-pill bg-forest-green/15 px-2.5 py-1 text-[11px] font-semibold text-forest-green">
                    <CheckCircle2 className="h-3 w-3" strokeWidth={2.2} />
                    Completed
                  </span>
                </div>
                <p className="mt-3 text-[14px] leading-5 text-white/80">Six weeks of discipline. Your fund is real now.</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="inline-flex items-center rounded-pill border border-domain-finance/25 bg-domain-finance/15 px-3 py-1 text-[11px] font-semibold text-domain-finance">
                    Finance
                  </span>
                  <Provenance items={['Via rewards ledger']} />
                </div>
                <div className="mt-3 flex items-start gap-2 border-t border-white/[0.06] pt-3">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-royal-purple" aria-hidden="true" />
                  <p className="text-[12px] leading-4 text-white/55">Consistent saves built momentum by week eight, ahead of the projected pace.</p>
                </div>
              </SolidCard>
            </article>

            <article className="relative">
              <span className="absolute -left-6 top-5 h-3 w-3 rounded-full border-2 border-ink-900 bg-brand-orange" aria-hidden="true" />
              <SolidCard>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-[16px] font-semibold leading-5 text-white">Pivoted recipe challenge</h3>
                    <p className="mt-1 text-[13px] text-white/50">Partial XP retained</p>
                  </div>
                  <span className="flex shrink-0 items-center gap-1 rounded-pill bg-brand-orange/15 px-2.5 py-1 text-[11px] font-semibold text-brand-orange">
                    <GitFork className="h-3 w-3" strokeWidth={2.2} />
                    Pivoted
                  </span>
                </div>
                <p className="mt-3 text-[14px] leading-5 text-white/80">You explored eight recipes before life shifted focus.</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="inline-flex items-center rounded-pill border border-domain-nutrition/25 bg-domain-nutrition/15 px-3 py-1 text-[11px] font-semibold text-domain-nutrition">
                    Nutrition
                  </span>
                  <Provenance items={['Your archive note']} />
                </div>
              </SolidCard>
            </article>
          </div>
        </section>

        <section className="space-y-3">
          <SectionTitle title="April 2026" meta="1 entry" />
          <div className="relative space-y-4 pl-6">
            <span className="absolute bottom-2 left-[7px] top-2 w-px bg-white/10" aria-hidden="true" />

            <article className="relative">
              <span className="absolute -left-6 top-5 h-3 w-3 rounded-full border-2 border-ink-900 bg-forest-green shadow-[var(--glow-green-sm)]" aria-hidden="true" />
              <SolidCard>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-[16px] font-semibold leading-5 text-white">30-day mobility reset</h3>
                    <p className="mt-1 text-[13px] tabular-nums text-white/50">4 weeks &middot; 600 XP</p>
                  </div>
                  <span className="flex shrink-0 items-center gap-1 rounded-pill bg-forest-green/15 px-2.5 py-1 text-[11px] font-semibold text-forest-green">
                    <CheckCircle2 className="h-3 w-3" strokeWidth={2.2} />
                    Completed
                  </span>
                </div>
                <div className="mt-3 flex gap-2">
                  <button type="button" aria-label="View progress photo from week 2" className="flex h-16 w-16 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <Camera className="h-4 w-4 text-white/35" strokeWidth={1.8} />
                  </button>
                  <button type="button" aria-label="View progress photo from week 4" className="flex h-16 w-16 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <Camera className="h-4 w-4 text-white/35" strokeWidth={1.8} />
                  </button>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="inline-flex items-center rounded-pill border border-domain-fitness/25 bg-domain-fitness/15 px-3 py-1 text-[11px] font-semibold text-domain-fitness">
                    Fitness
                  </span>
                  <Provenance items={['Via rewards ledger']} />
                </div>
              </SolidCard>
            </article>
          </div>
        </section>

        <SafetyCard />

        <div className="space-y-3 pt-1">
          <p className="text-center text-[12px] leading-4 text-white/45">Your archive stays private on this device unless you choose to export it.</p>
          <div className="flex justify-center">
            <ConsentRail compact />
          </div>
        </div>
      </main>
    </HifiShell>
  )
}
