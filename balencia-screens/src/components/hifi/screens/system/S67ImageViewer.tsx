import { X, Share2, EllipsisVertical, Download, Trash2, Flag, ShieldCheck, ChevronLeft, ChevronRight, RotateCw } from 'lucide-react'
import { HifiShell, GlassCard, Chip, ConsentRail } from '@/components/hifi/kit'

export function S67ImageViewer() {
  return (
    <HifiShell showTabBar={false} atmosphere="you">
      <main className="relative h-[844px] w-full max-w-[390px] overflow-hidden bg-ink-900 text-white">
        {/* Ambient base glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,122,0,0.05),_transparent_60%)]" />

        {/* Dimmed context backdrop */}
        <div className="absolute inset-0 bg-ink-900/95 backdrop-blur-md" />

        {/* Top chrome scrim */}
        <div className="absolute top-0 inset-x-0 z-20 bg-gradient-to-b from-ink-900/90 to-transparent pb-12">
          <div className="flex h-14 items-center justify-between px-4">
            <button type="button" aria-label="Close viewer" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.06] border border-white/10 active:scale-95 transition-transform">
              <X className="h-5 w-5 text-white" />
            </button>
            
            <span className="flex items-center gap-2">
              <span className="text-sm font-medium tracking-wide text-white/90 tabular-nums">2 Of 7</span>
              <span className="flex items-center gap-1 rounded-full bg-white/[0.06] border border-white/10 px-2.5 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
                <span className="text-[10px] uppercase tracking-[0.12em] text-white/80">Encrypted</span>
              </span>
            </span>

            <button type="button" aria-label="Share photo" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.06] border border-white/10 active:scale-95 transition-transform">
              <Share2 className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>

        {/* Image Canvas (HIFI-67-01) */}
        <div className="absolute inset-0 z-10 flex items-center justify-center px-4">
          <div className="relative aspect-[3/4] w-full max-w-[320px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.02] shadow-[var(--glow-orange-md)]">
            {/* Placeholder geometric abstract composition */}
            <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(255,122,0,0.08),_transparent_50%)]" />
            <div className="absolute -top-8 -left-8 h-40 w-40 rounded-full bg-brand-orange/10 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-royal-purple/10 blur-3xl" />
            
            {/* Abstract silhouette / abstract forms */}
            <svg viewBox="0 0 100 120" fill="none" className="absolute inset-0 h-full w-full opacity-60">
              <path d="M 20 100 Q 30 50 50 50 Q 70 50 80 100 L 80 120 L 20 120 Z" fill="rgba(255,255,255,0.03)" />
              <circle cx="50" cy="35" r="15" fill="rgba(255,255,255,0.04)" />
              <rect x="0" y="90" width="100" height="30" fill="rgba(33,16,8,0.55)" />
            </svg>
            
            {/* Grain overlay */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')" }} />

            {/* HUD: Gesture Indicators */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-3 py-1 backdrop-blur-md border border-white/5">
              <span className="text-[10px] uppercase tracking-[0.1em] text-white/80 tabular-nums">1x · Pinch To Zoom</span>
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="absolute bottom-44 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
          <button type="button" aria-label="Previous photo" className="flex h-11 w-11 items-center justify-center rounded-full text-white/60">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <button type="button" aria-label="Next photo" className="flex h-11 w-11 items-center justify-center rounded-full text-white/60">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Bottom Action Glass Sheet */}
        <div className="absolute inset-x-0 bottom-0 z-30 px-4 pb-6 pt-4">
          <GlassCard tone="you">
            <div className="p-4 space-y-4">
              {/* Metadata Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="text-[1.05rem] font-semibold leading-tight tracking-tight text-white">
                    Progress <span className="text-emphasis">viewer</span>
                  </h2>
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    <Chip tone="you">Source: Progress Photos</Chip>
                    <Chip tone="muted">Oct 24, 2025</Chip>
                  </div>
                </div>
                <button type="button" aria-label="More options" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/[0.04] border border-white/5 text-white/70">
                  <EllipsisVertical className="h-5 w-5" />
                </button>
              </div>

              {/* Privacy Toast / Media Retention Note */}
              <div className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.02] p-3">
                <ShieldCheck className="h-4 w-4 shrink-0 text-royal-purple" />
                <p className="text-xs leading-relaxed text-white/70">
                  Shares unencrypted outside CIA. Media retention is governed by your source settings.
                </p>
              </div>

              {/* Consent Controls */}
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl bg-white/[0.02] py-2.5 pl-3 pr-2 text-sm text-white/80">
                  Data sources
                  <ChevronRight className="h-4 w-4 text-white/40 transition-transform group-open:rotate-90" />
                </summary>
                <div className="pt-3">
                  <ConsentRail compact />
                </div>
              </details>

              {/* Action Grid */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                <div className="flex flex-col items-center gap-1.5">
                  <button type="button" aria-label="Download photo" className="flex h-12 w-full items-center justify-center rounded-xl bg-white/[0.04] border border-white/10 text-white/90 active:scale-95 transition-transform">
                    <Download className="h-5 w-5" />
                  </button>
                  <span className="text-[10px] uppercase tracking-wider text-white/50">Save</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <button type="button" aria-label="Delete photo" className="flex h-12 w-full items-center justify-center rounded-xl bg-white/[0.04] border border-white/10 text-white/90 active:scale-95 transition-transform">
                    <Trash2 className="h-5 w-5" />
                  </button>
                  <span className="text-[10px] uppercase tracking-wider text-white/50">Delete</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <button type="button" aria-label="Report photo" className="flex h-12 w-full items-center justify-center rounded-xl bg-white/[0.04] border border-white/10 text-white/90 active:scale-95 transition-transform">
                    <Flag className="h-5 w-5" />
                  </button>
                  <span className="text-[10px] uppercase tracking-wider text-white/50">Report</span>
                </div>
              </div>

              {/* Disabled Action Example */}
              <div className="flex items-center justify-between border-t border-white/5 pt-3 opacity-40">
                <div className="flex items-center gap-2 text-white/60">
                  <RotateCw className="h-4 w-4" />
                  <span className="text-xs">Retry high-res load</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-white/40">Offline</span>
              </div>
            </div>
          </GlassCard>
        </div>

      </main>
    </HifiShell>
  )
}