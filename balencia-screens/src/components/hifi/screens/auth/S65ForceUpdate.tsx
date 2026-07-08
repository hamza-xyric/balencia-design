import { ArrowUpCircle } from 'lucide-react'
import { BtnPrimary, GlassCard, HifiShell, Provenance } from '@/components/hifi/kit'

// Cold-start / day-one render: everything local (icon, badge, title, version
// caption) is bundled and must never show a skeleton; the server-driven
// "What's new" list is fully populated here. Loading/error/offline/success
// resets are documented in the source spec rather than duplicated as dead
// branches (static prototype, no handlers, no back-gesture affordance —
// this is a system gate above the tab shell, not a live route). The one
// Tiempos emphasis lands on "update" inside the hero title per the Visual
// System line; the subtitle repeats the word in plain type.
const whatsNew = ['Faster CIA coaching responses', 'New workout plans and exercises', 'Bug fixes and performance improvements']

export function S65ForceUpdate() {
  return (
    <HifiShell
      showTabBar={false}
      bottomAction={
        <div className="flex flex-col items-center gap-3 pb-1">
          <div className="relative w-full">
            <div aria-hidden="true" className="quiet-pulse pointer-events-none absolute inset-x-6 -inset-y-2 rounded-pill bg-brand-orange/40 blur-2xl" />
            <BtnPrimary className="relative w-full">Update now</BtnPrimary>
          </div>
          <p className="text-[12px] tabular-nums text-white/45">Version 2.1.0 → 3.0.0 required</p>
          <Provenance items={['Via device build config']} />
        </div>
      }
    >
      <main className="flex flex-col items-center px-6 pb-4 pt-6 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logos/Balencia white PNG.png" alt="Balencia" className="h-5 w-auto opacity-80" />

        <div className="relative mt-9 mb-7">
          <div className="flex h-24 w-24 items-center justify-center rounded-[24px] border border-white/10 bg-ink-brown-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/Logo Mark.svg" alt="" className="h-12 w-12" />
          </div>
          <span
            role="img"
            aria-label="Update required"
            className="absolute -bottom-1.5 -right-1.5 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-ink-900"
          >
            <ArrowUpCircle size={20} strokeWidth={2} className="text-brand-orange" />
          </span>
        </div>

        <h1 className="text-[34px] font-semibold leading-[1.15] tracking-[-0.02em] text-white">
          An important security <span className="text-emphasis">update</span> is available
        </h1>
        <p className="mx-auto mt-4 max-w-[280px] text-[16px] leading-[1.4] text-white/60">
          This update includes important security improvements to keep your data safe.
        </p>

        <GlassCard tone="muted" className="mt-8 w-full text-left">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/55">What&apos;s new</p>
          <ul className="mt-3 space-y-2.5">
            {whatsNew.map(item => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-white/45" />
                <span className="text-[14px] leading-[1.4] text-white/80">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3">
            <Provenance items={['Via server release notes']} />
          </div>
        </GlassCard>
      </main>
    </HifiShell>
  )
}
