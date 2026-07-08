import {
  Check,
  Copy,
  Download,
  EyeOff,
  FileText,
  Flag,
  Forward,
  Map,
  Pin,
  RotateCcw,
  Route,
  Shield,
  Sparkles,
  Star,
  Trash2,
} from 'lucide-react'
import { BtnPrimary, Chip, GlassCard, HifiShell, SectionTitle, TopBar } from '@/components/hifi/kit'

// Modal action surface over Direct Chat [75], long-pressed on Aisha Khan's
// hill-segment message. Chosen state: default — preview, privacy pills,
// reactions, actions, and media vault all resolved; "Useful" already
// reacted; forward disabled because the sender capped this thread to no
// forwarding. Skeleton (preview + rows shimmer in final geometry), empty
// (no shared media renders as a text label, not a fake tile), error
// ("Message no longer available", Done stays enabled), and offline (queued
// reaction, delete/forward disabled) are documented in the source spec
// rather than duplicated here — static prototype, no handlers. One Tiempos
// emphasis word: "actions".
export function S77MessageActions() {
  return (
    <HifiShell atmosphere="cia" showTabBar={false}>
      <div className="relative flex h-full flex-col overflow-hidden">
        {/* Dimmed Direct Chat [75] base — inert, not interactive */}
        <div aria-hidden="true" className="absolute inset-0 flex flex-col gap-3 px-4 pt-8 opacity-30">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-orange/15 text-[11px] font-semibold text-brand-orange">
              AK
            </span>
            <span className="text-[15px] font-semibold text-white">Aisha Khan</span>
          </div>
          <div className="flex justify-start">
            <div className="max-w-[75%] rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[13px] text-white/70">
              Perfect. I added the hill loop near the reservoir.
            </div>
          </div>
          <div className="flex justify-end">
            <div className="max-w-[75%] rounded-xl border border-brand-orange/15 bg-brand-orange/10 px-4 py-3 text-[13px] text-white/70">
              That climb is no joke.
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-ink-900/75 backdrop-blur-md" />

        {/* Message actions sheet */}
        <div className="relative z-10 mt-14 flex flex-1 flex-col overflow-hidden rounded-t-[28px] border-t border-white/10 bg-ink-900/90 backdrop-blur-2xl">
          <TopBar
            title={
              <>
                Message <span className="text-emphasis">actions</span>
              </>
            }
            right={
              <Chip tone="cia" interactive>
                <Sparkles className="mr-1 h-3 w-3" strokeWidth={2} />
                CIA synthesis
              </Chip>
            }
          />

          <div className="flex-1 space-y-4 px-4 pb-4 pt-1">
            <GlassCard tone="muted">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-[10px] font-semibold text-white/80">
                    AK
                  </span>
                  <span className="text-[13px] font-semibold text-white">Aisha Khan</span>
                  <span className="text-[12px] tabular-nums text-white/40">9:41</span>
                </div>
                <Chip tone="muted">
                  <EyeOff className="mr-1 h-3 w-3" strokeWidth={2} />
                  Private
                </Chip>
              </div>

              <p className="mt-3 text-[14px] leading-5 text-white/90">Perfect. I added the hill loop near the reservoir.</p>

              <div className="mt-3 flex flex-wrap gap-2">
                <Chip tone="cia">View-once, opens in viewer</Chip>
                <Chip tone="muted">CIA summarized</Chip>
              </div>

              <div className="mt-3 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-orange/15 text-brand-orange">
                  <Map className="h-4 w-4" strokeWidth={1.9} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium text-white">Hill segment</p>
                  <p className="mt-0.5 text-[11px] text-white/45">Shared 9:41, map data</p>
                </div>
              </div>
            </GlassCard>

            <section>
              <SectionTitle title="Quick reactions" meta="Synced" />
              <div className="mt-2 grid grid-cols-4 gap-2">
                <button
                  type="button"
                  aria-pressed={true}
                  className="flex min-h-11 items-center justify-center gap-1 rounded-xl border border-brand-orange bg-brand-orange/15 text-[12px] font-semibold text-brand-orange"
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={2.2} />
                  Useful
                </button>
                <button
                  type="button"
                  aria-pressed={false}
                  className="flex min-h-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[12px] text-white/70"
                >
                  Support
                </button>
                <button
                  type="button"
                  aria-pressed={false}
                  className="flex min-h-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[12px] text-white/70"
                >
                  Done
                </button>
                <button
                  type="button"
                  aria-pressed={false}
                  className="flex min-h-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[12px] text-white/70"
                >
                  Insight
                </button>
              </div>
            </section>

            <section>
              <SectionTitle title="Actions" />
              <div className="mt-2 grid grid-cols-4 gap-2">
                <button
                  type="button"
                  className="flex min-h-11 flex-col items-center justify-center gap-1 rounded-xl border border-white/10 bg-white/[0.04] text-[10px] font-medium text-white/70"
                >
                  <Pin className="h-4 w-4" strokeWidth={1.7} />
                  Pin
                </button>
                <button
                  type="button"
                  className="flex min-h-11 flex-col items-center justify-center gap-1 rounded-xl border border-white/10 bg-white/[0.04] text-[10px] font-medium text-white/70"
                >
                  <Star className="h-4 w-4" strokeWidth={1.7} />
                  Star
                </button>
                <button
                  type="button"
                  className="flex min-h-11 flex-col items-center justify-center gap-1 rounded-xl border border-white/10 bg-white/[0.04] text-[10px] font-medium text-white/70"
                >
                  <Copy className="h-4 w-4" strokeWidth={1.7} />
                  Copy
                </button>
                <button
                  type="button"
                  disabled
                  aria-label="Forward, off for this thread"
                  className="flex min-h-11 flex-col items-center justify-center gap-1 rounded-xl border border-white/5 bg-white/[0.02] text-[10px] font-medium text-white/25"
                >
                  <Forward className="h-4 w-4" strokeWidth={1.7} />
                  Forward
                </button>
              </div>

              <div className="mt-2 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                <button type="button" className="flex min-h-11 w-full items-center gap-3 px-4 py-3 text-left text-[13px] text-white/80">
                  <Flag className="h-4 w-4 text-white/40" strokeWidth={1.7} />
                  Report message
                </button>
                <div className="mx-4 border-t border-white/5" />
                <button type="button" className="flex min-h-11 w-full items-center gap-3 px-4 py-3 text-left text-[13px] text-white/80">
                  <Shield className="h-4 w-4 text-white/40" strokeWidth={1.7} />
                  Mute or block sender
                </button>
                <div className="mx-4 border-t border-white/5" />
                <button type="button" className="flex min-h-11 w-full items-center gap-3 px-4 py-3 text-left text-[13px] text-white/80">
                  <Download className="h-4 w-4 text-white/40" strokeWidth={1.7} />
                  Export thread data
                </button>
                <div className="mx-4 border-t border-white/5" />
                <button type="button" className="flex min-h-11 w-full items-center gap-3 px-4 py-3 text-left text-[13px] text-white/80">
                  <RotateCcw className="h-4 w-4 text-white/40" strokeWidth={1.7} />
                  Revoke CIA summary
                </button>
                <div className="mx-4 border-t border-white/5" />
                <button type="button" className="flex min-h-11 w-full items-center gap-3 px-4 py-3 text-left text-[13px] text-error-red">
                  <Trash2 className="h-4 w-4" strokeWidth={1.7} />
                  Delete own message
                </button>
              </div>
            </section>

            <section>
              <SectionTitle title="Shared media" meta="3 items" />
              <div className="mt-2 grid grid-cols-3 gap-2">
                <div className="flex min-h-[72px] flex-col justify-between rounded-xl border border-white/10 bg-white/[0.04] p-2.5">
                  <div className="flex items-start justify-between">
                    <Map className="h-4 w-4 text-white/40" strokeWidth={1.7} />
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-forest-green">
                      <Check className="h-3 w-3 text-ink-900" strokeWidth={3} />
                    </span>
                  </div>
                  <span className="text-[11px] text-white/60">Hill</span>
                </div>
                <div className="flex min-h-[72px] flex-col justify-between rounded-xl border border-white/10 bg-white/[0.04] p-2.5">
                  <div className="flex items-start justify-between">
                    <FileText className="h-4 w-4 text-white/40" strokeWidth={1.7} />
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-forest-green">
                      <Check className="h-3 w-3 text-ink-900" strokeWidth={3} />
                    </span>
                  </div>
                  <span className="text-[11px] text-white/60">Pace note</span>
                </div>
                <div className="flex min-h-[72px] flex-col justify-between rounded-xl border border-white/10 bg-white/[0.04] p-2.5">
                  <div className="flex items-start justify-between">
                    <Route className="h-4 w-4 text-white/40" strokeWidth={1.7} />
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-forest-green">
                      <Check className="h-3 w-3 text-ink-900" strokeWidth={3} />
                    </span>
                  </div>
                  <span className="text-[11px] text-white/60">Plan</span>
                </div>
              </div>
            </section>
          </div>

          <div className="border-t border-white/10 px-4 py-3">
            <BtnPrimary>Done</BtnPrimary>
          </div>
        </div>
      </div>
    </HifiShell>
  )
}
