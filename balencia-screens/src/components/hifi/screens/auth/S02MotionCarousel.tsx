import { ArrowRight, Sparkles } from 'lucide-react'
import { BtnGhost, BtnPrimary, HifiShell, cx } from '@/components/hifi/kit'

// Pre-auth brand-hook carousel — panel 1 of 4, the single representative
// frame. Panels 2-4 introduce CIA, a demo correlation insight (labeled
// "demo", never personal data), and a sample XP ring per the source spec;
// they aren't re-rendered here since a static prototype file shows one
// canonical slide, matching this batch's convention of picking the fullest
// single frame rather than paging through every state. "Finally" is dropped
// from the source headline — it's on the copy gate's hype blacklist.
export function S02MotionCarousel() {
  return (
    <HifiShell
      atmosphere="cia"
      showTabBar={false}
      header={
        <div className="flex justify-end px-4 pt-2">
          <BtnGhost quiet>Skip</BtnGhost>
        </div>
      }
      bottomAction={
        <BtnPrimary>
          <span className="flex items-center justify-center gap-2">
            Next
            <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
          </span>
        </BtnPrimary>
      }
    >
      <main className="flex flex-col items-center gap-6 px-6 pb-2 pt-3">
        <MotionStage />

        <div className="flex flex-col items-center gap-4">
          <h1 className="max-w-[280px] text-balance text-center text-[22px] font-semibold leading-[1.3] text-white/90">
            One life, not modules. Everything connects in this <span className="text-emphasis">carousel</span>.
          </h1>

          <div className="flex items-center justify-center gap-2" role="group" aria-label="Slide 1 of 4">
            <span className="h-1.5 w-6 rounded-pill bg-brand-orange" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
          </div>
        </div>
      </main>
    </HifiShell>
  )
}

// Nine domain dots, one continuous connecting stroke — the "one life, not
// modules" idea made literal. Decorative motif only, no identifiable media.
const domainDots = [
  { cls: 'bg-domain-fitness', top: '12%', left: '32%' },
  { cls: 'bg-domain-career', top: '8%', left: '60%' },
  { cls: 'bg-domain-finance', top: '26%', left: '86%' },
  { cls: 'bg-domain-learning', top: '52%', left: '92%' },
  { cls: 'bg-domain-relationships', top: '78%', left: '80%' },
  { cls: 'bg-domain-wellbeing', top: '90%', left: '54%' },
  { cls: 'bg-domain-sleep', top: '80%', left: '18%' },
  { cls: 'bg-domain-nutrition', top: '52%', left: '6%' },
  { cls: 'bg-domain-productivity', top: '24%', left: '14%' },
] as const

// NEW: MotionStage — full-bleed animation viewport, deliberately card-less
// so this pre-auth brand surface never reads as a data tile.
function MotionStage() {
  return (
    <div
      className="relative flex h-[380px] w-full items-center justify-center overflow-hidden rounded-2xl"
      role="img"
      aria-label="Nine life domains connecting through one continuous line"
    >
      <div className="absolute h-56 w-56 rounded-full bg-brand-orange/10 blur-3xl" aria-hidden="true" />
      <svg className="absolute h-52 w-52 text-brand-orange/70" viewBox="0 0 100 100" fill="none" aria-hidden="true">
        <path
          d="M32 12 Q 60 8 86 26 Q 94 52 80 78 Q 54 90 18 80 Q 6 52 14 24 Q 20 14 32 12"
          pathLength={1}
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          className="line-draw-slow"
        />
      </svg>
      {domainDots.map(dot => (
        <span
          key={dot.cls}
          className={cx('absolute h-2.5 w-2.5 rounded-full', dot.cls)}
          style={{ top: dot.top, left: dot.left }}
        />
      ))}
      <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-ink-900/70 shadow-[var(--glow-orange-sm)]">
        <Sparkles className="h-6 w-6 text-brand-orange" strokeWidth={1.6} />
      </div>
    </div>
  )
}
