import { HifiShell } from '@/components/hifi/kit'

// Cold-start system handshake — zero metrics, a single deliberate gesture
// behind which the app checks the cached session. This file renders the
// default happy-path hold frame (mark + connecting line + wordmark settled
// at 1.8s, per Section 10). Offline/auth-fail branches reuse the catalog
// OfflineBanner/SyncStatus pill low above the safe area, with the mark
// dropping to a slow opacity pulse instead of settling — not rendered here,
// since a splash screen has exactly one canonical resting frame, not a
// state machine to page through. No Tiempos-italic emphasis word is applied
// (per source: reserved for downstream screens with readable copy — this
// screen has none).
export function S01Splash() {
  return (
    <HifiShell showTabBar={false} atmosphere="cia">
      <main className="flex h-full flex-col items-center justify-center px-8">
        <h1 className="sr-only">Balencia</h1>
        <BrandClusterReveal />
      </main>
    </HifiShell>
  )
}

// Bespoke, splash-only composite: warm glow + a continuous decorative stroke
// (never the brand mark's own geometry — that stays untouched, per the
// house rule against approximating the logo) draws itself in, then the
// official lockup settles underneath.
function BrandClusterReveal() {
  return (
    <div className="relative flex h-36 w-36 animate-fade-up items-center justify-center">
      <div className="absolute inset-0 rounded-full bg-brand-orange/15 blur-3xl" aria-hidden="true" />
      <svg
        className="absolute inset-2 h-[calc(100%-16px)] w-[calc(100%-16px)] -rotate-90 text-brand-orange/55"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="50" cy="50" r="44" pathLength={1} stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className="line-draw-slow" />
      </svg>
      <div className="relative z-10 animate-fade-up" style={{ animationDelay: '900ms' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logos/Balencia white PNG.png" alt="Balencia." className="h-14 w-auto" />
      </div>
    </div>
  )
}
