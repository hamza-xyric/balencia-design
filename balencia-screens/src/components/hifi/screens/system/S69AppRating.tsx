import { Star, X } from 'lucide-react'
import { HifiShell, TopBar, GlassCard, CIAPresenceOrb, Chip, Provenance } from '@/components/hifi/kit'

export function S69AppRating() {
  return (
    <HifiShell
      header={<TopBar title="Today" eyebrow="Amira · Lv 12" />}
      activeTab="today"
      showTabBar={false}
      atmosphere="you"
    >
      <main className="space-y-4 px-4 pb-4 pt-3 opacity-30 pointer-events-none select-none">
        <p className="text-[15px] leading-relaxed text-white/60">
          Mission pause. Run a half marathon sits at 68 percent, Save $5,000 by December sits at 42 percent. You logged 8.2k steps today with 7.5h sleep via Health.
        </p>
        <GlassCard tone="muted">
          <div className="p-4 space-y-2">
            <div className="h-3 w-1/3 rounded-full bg-white/10" />
            <div className="h-3 w-2/3 rounded-full bg-white/10" />
            <div className="h-3 w-1/2 rounded-full bg-white/10" />
          </div>
        </GlassCard>
      </main>

      <div className="absolute inset-0 z-40 flex items-end justify-center bg-ink-900/80 backdrop-blur-sm">
        <div
          className="relative w-full rounded-t-[28px] border-t border-white/10 bg-ink-900/95 px-5 pt-3 pb-6 shadow-[var(--glow-orange-sm)]"
          style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
        >
          <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-white/15" />

          <button
            type="button"
            aria-label="Dismiss"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/5 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full border border-white/10 bg-white/[0.04] p-1.5">
              <CIAPresenceOrb size={56} state="idle" />
            </div>

            <h2 className="text-[22px] leading-tight text-white">
              Enjoying <span className="text-emphasis">Balencia</span>?
            </h2>
            <p className="mt-2 text-[15px] leading-snug text-white/60">
              We&apos;d love to hear how you feel.
            </p>

            <div className="mt-7 flex w-full items-stretch justify-between gap-2">
              {[1, 2, 3, 4, 5].map((v) => (
                <button
                  key={v}
                  type="button"
                  aria-label={`${v} star${v > 1 ? 's' : ''}`}
                  className="group flex h-11 w-11 flex-col items-center justify-center gap-1"
                >
                  <Star
                    className={`h-6 w-6 transition-colors ${
                      v === 1
                        ? 'fill-brand-orange text-brand-orange'
                        : 'text-white/25 group-hover:text-white/50'
                    }`}
                  />
                  <span className="text-[11px] tabular-nums text-white/40">{v}</span>
                </button>
              ))}
            </div>

            <div className="mt-7 w-full space-y-3">
              <button
                type="button"
                className="flex h-12 w-full items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-[15px] font-medium text-white transition-colors hover:bg-white/[0.1]"
              >
                Not now
              </button>
              <button
                type="button"
                className="flex min-h-11 w-full items-center justify-center text-[14px] font-medium text-white/45 transition-colors hover:text-white/70"
              >
                Don&apos;t ask again
              </button>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5">
              <Chip tone="muted">Trigger · Mission milestone</Chip>
              <Chip tone="muted">Scope · This sheet</Chip>
              <Chip tone="muted">Retention · Local</Chip>
            </div>

            <div className="mt-3 w-full">
              <Provenance items={['Source · In-app event', 'Freshness · Just now']} />
            </div>

            <p className="mt-4 max-w-[280px] text-[11px] leading-relaxed text-white/30">
              Submit feedback to share private notes with the team. Delete removes your response and export copies it out.
            </p>
          </div>
        </div>
      </div>
    </HifiShell>
  )
}