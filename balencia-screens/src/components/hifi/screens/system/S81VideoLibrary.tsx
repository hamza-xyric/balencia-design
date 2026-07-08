import { Play, Bookmark, BookmarkCheck, RotateCw, CircleAlert, Search as SearchIcon } from 'lucide-react'
import { HifiShell, TopBar, GlassCard, SolidCard, Chip, Provenance, CIAInsightCard, BtnPrimary, GlassPillInput } from '@/components/hifi/kit'

export function S81VideoLibrary() {
  return (
    <HifiShell
      header={
        <TopBar
          title="Video library"
          back
          right={
            <button type="button" aria-label="Search videos" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition hover:bg-white/[0.08]">
              <SearchIcon className="h-5 w-5" />
            </button>
          }
        />
      }
      activeTab="today"
      atmosphere="you"
    >
      <main className="space-y-4 px-4 pb-6 pt-3">
        <section>
          <GlassPillInput icon={<SearchIcon className="h-4 w-4" />} placeholder="Search coaching videos" />
        </section>

        <section aria-label="Category filters">
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 hide-scrollbar">
            <Chip tone="you">Mobility</Chip>
            <Chip tone="muted">Focus</Chip>
            <Chip tone="muted">Webinars</Chip>
            <Chip tone="muted">Saved</Chip>
          </div>
        </section>

        <section aria-label="Featured video">
          <GlassCard tone="cia">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-royal-purple">Cia pick</span>
                <Provenance items={['Mission matched']} />
              </div>

              <div className="relative flex h-44 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-ink-900">
                <div className="absolute inset-0 bg-gradient-to-br from-royal-purple/10 via-transparent to-transparent" />
                <button type="button" aria-label="Play post-run mobility video" className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition hover:scale-105 hover:bg-white/20">
                  <span className="absolute inset-0 rounded-full border border-white/20" />
                  <Play className="h-6 w-6 fill-white text-white" />
                </button>
                <div className="absolute bottom-2 right-2 rounded-md bg-black/60 px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-white/90 backdrop-blur-sm">
                  8 min
                </div>
              </div>

              <div>
                <h2 className="text-[17px] font-semibold leading-tight text-white">
                  Post-run <span className="text-emphasis">mobility</span>
                </h2>
                <p className="mt-1 text-sm text-white/55">
                  Chosen for tomorrow&apos;s run.
                </p>
              </div>

              <div className="flex h-11 gap-2">
                <button type="button" className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-brand-orange text-sm font-semibold text-ink-900 transition hover:brightness-110">
                  <Play className="h-4 w-4 fill-ink-900" />
                  Play
                </button>
                <button type="button" aria-label="Save post-run mobility" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/70 transition hover:bg-white/[0.08]">
                  <Bookmark className="h-5 w-5" />
                </button>
              </div>
            </div>
          </GlassCard>
        </section>

        <section aria-label="Next best videos" className="space-y-3">
          <div className="flex items-baseline justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">Next best videos</h3>
            <button type="button" className="text-xs text-white/40 transition hover:text-white/70">See all</button>
          </div>

          <SolidCard>
            <div className="flex w-full items-center gap-3 p-3 text-left">
              <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play className="h-5 w-5 fill-white/40 text-white/40" />
                </div>
                <div className="absolute bottom-1 right-1 rounded bg-ink-900/80 px-1 text-[10px] font-medium tabular-nums text-white/80">
                  5:20
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-medium uppercase tracking-wider text-brand-orange">Mobility</span>
                <p className="mt-0.5 truncate text-sm font-medium text-white">
                  5-minute hip reset
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[43%] rounded-full bg-brand-orange" />
                  </div>
                  <span className="text-[11px] tabular-nums text-white/50">43%</span>
                </div>
                <span className="mt-1 block text-[11px] text-white/35">Resume where you left off</span>
              </div>
              <button type="button" aria-label="Bookmark 5-minute hip reset" className="flex h-11 w-8 shrink-0 items-center justify-center text-white/60 transition hover:text-white">
                <Bookmark className="h-5 w-5" />
              </button>
            </div>
          </SolidCard>

          <SolidCard>
            <div role="listitem" className="flex w-full items-center gap-3 p-3 text-left">
              <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play className="h-5 w-5 fill-white/40 text-white/40" />
                </div>
                <div className="absolute bottom-1 left-1 rounded bg-royal-purple/80 px-1 text-[9px] font-semibold uppercase tracking-wide text-white">
                  Rec
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-medium uppercase tracking-wider text-royal-purple">Webinar</span>
                <p className="mt-0.5 truncate text-sm font-medium text-white">
                  Stress reset webinar
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[12%] rounded-full bg-royal-purple" />
                  </div>
                  <span className="text-[11px] tabular-nums text-white/50">12%</span>
                </div>
                <span className="mt-1 block text-[11px] text-white/35">Watch progress synced</span>
              </div>
              <button type="button" aria-label="Save stress reset webinar" className="flex h-11 w-8 shrink-0 items-center justify-center text-forest-green transition hover:text-forest-green/80">
                <BookmarkCheck className="h-5 w-5" />
              </button>
            </div>
          </SolidCard>

          <SolidCard>
            <div role="listitem" className="flex w-full items-center gap-3 p-3 text-left">
              <div className="relative flex h-16 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
                <CircleAlert className="h-5 w-5 text-white/30" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-medium uppercase tracking-wider text-white/30">Mobility</span>
                <p className="mt-0.5 truncate text-sm font-medium text-white/50">
                  Sleep wind-down stretch
                </p>
                <span className="mt-1 block text-[11px] text-white/30">Source unavailable</span>
              </div>
              <button type="button" aria-label="Retry loading video" className="flex h-11 w-8 shrink-0 items-center justify-center text-white/40 transition hover:text-white/70">
                <RotateCw className="h-4 w-4" />
              </button>
            </div>
          </SolidCard>
        </section>

        <CIAInsightCard
          eyebrow="Recommendation logic"
          provenance={['Mission match', 'Recovery state']}
        >
          Cia picks by mission and recovery.
        </CIAInsightCard>

        <section className="space-y-2 pt-1">
          <BtnPrimary>Search youtube</BtnPrimary>
          <p className="text-center text-[11px] text-white/35">
            Opens your browser. No data shared.
          </p>
        </section>
      </main>
    </HifiShell>
  )
}