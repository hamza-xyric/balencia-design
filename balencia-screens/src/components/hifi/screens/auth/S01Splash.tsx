import { HifiShell } from '@/components/hifi/kit'

// The launch surface has one job: make the official identity legible while
// the app performs its invisible cold-start handshake. The status is exposed
// once; every visual reveal beat is deliberately decorative.
export function S01Splash() {
  return (
    <HifiShell showTabBar={false} atmosphere="cia">
      <main className="flex h-full flex-col items-center justify-center px-8">
        <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">
          Balencia. Loading.
        </p>
        <BrandClusterReveal />
      </main>
    </HifiShell>
  )
}

function BrandClusterReveal() {
  return (
    <div className="relative flex h-52 w-full max-w-[286px] items-center justify-center" aria-hidden="true">
      <span className="absolute h-44 w-44 rounded-full bg-brand-orange/14 blur-3xl" />
      <span className="absolute h-36 w-36 translate-x-12 translate-y-7 rounded-full bg-royal-purple/10 blur-3xl" />

      <svg
        className="absolute inset-x-0 top-1/2 h-28 w-full -translate-y-1/2 overflow-visible text-brand-orange/60"
        viewBox="0 0 286 112"
        fill="none"
      >
        <path
          d="M27 72C53 24 112 14 161 30c35 11 65 38 98 24"
          pathLength={1}
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          className="line-draw-slow"
          style={{ animationDelay: '150ms', animationDuration: '900ms' }}
        />
        <circle cx="27" cy="72" r="3" className="fill-brand-orange animate-fade-up" style={{ animationDelay: '900ms' }} />
        <circle cx="259" cy="54" r="2" className="fill-paper-100 animate-fade-up" style={{ animationDelay: '960ms' }} />
      </svg>

      <div className="relative z-10 animate-fade-up" style={{ animationDelay: '1050ms', animationDuration: '450ms' }}>
        {/* Official 200×50 wide lockup; never redrawn, recolored, or generated. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logos/Frame 2147239943.svg" alt="" className="block h-auto w-[220px] max-w-full" />
      </div>
    </div>
  )
}
