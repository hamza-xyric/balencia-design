import { Mic, ShieldCheck, X } from 'lucide-react'
import {
  BtnGhost,
  BtnPrimary,
  ChatBubble,
  ConsentRail,
  GlassCard,
  HifiShell,
  Provenance,
  TopBar,
} from '@/components/hifi/kit'

// Voice input replacing the keyboard inside CIA Chat [09] — the composer
// slot becomes the VoiceInterfacePanel while the chat above dims to a
// static, reduced-opacity base (overlay composition, not a live route).
export function S10CiaVoiceInChat() {
  return (
    <HifiShell
      atmosphere="cia"
      activeTab="cia"
      header={
        <TopBar
          title="CIA."
          back={false}
          right={
            <span className="flex items-center gap-1.5 text-[12px] font-semibold text-brand-orange">
              <span className="relative flex h-2 w-2">
                <span className="voice-status-pulse absolute inset-0 rounded-full bg-brand-orange" />
                <span className="relative h-2 w-2 rounded-full bg-brand-orange" />
              </span>
              Voice on
            </span>
          }
        />
      }
      composer={
        <GlassCard tone="cia" className="!p-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-[13px] font-semibold text-white">
              <span className="relative flex h-2 w-2">
                <span className="voice-status-pulse absolute inset-0 rounded-full bg-brand-orange" />
                <span className="relative h-2 w-2 rounded-full bg-brand-orange" />
              </span>
              Listening.
            </span>
            <span className="text-[12px] tabular-nums text-white/40">0:03</span>
          </div>

          <div className="mt-4 flex h-12 items-center justify-center gap-[3px]" role="img" aria-label="Microphone input level">
            {[6, 11, 18, 26, 20, 30, 16, 22, 10, 15, 8, 24, 12].map((barHeight, index) => (
              <span
                key={index}
                className="w-[3px] rounded-pill bg-brand-orange"
                style={{ height: barHeight, opacity: 0.45 + (barHeight / 30) * 0.55 }}
              />
            ))}
          </div>

          <div className="mt-4 flex items-center justify-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-orange/15 text-brand-orange shadow-[var(--glow-orange-sm)]" aria-label="Recording active">
              <Mic size={18} strokeWidth={2} />
            </span>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <BtnGhost quiet className="flex-1 justify-center">
              Cancel
            </BtnGhost>
            <BtnPrimary className="flex-1">
              Send
            </BtnPrimary>
          </div>

          <p className="mt-3 text-center text-[11px] leading-4 text-white/55">
            Voice becomes text &middot; Delete later
          </p>
        </GlassCard>
      }
    >
      <main className="space-y-4 px-4 pb-2 pt-3">
        <div className="space-y-4 opacity-55 saturate-50">
          <ChatBubble speaker="CIA" tone="cia">
            What would help right now?
          </ChatBubble>

          <div className="flex justify-end">
            <div className="max-w-[280px] rounded-xl border border-brand-orange/25 bg-brand-orange/10 px-4 py-3">
              <p className="mb-1 text-[11px] font-semibold uppercase leading-3 text-brand-orange/80">You</p>
              <p className="text-[14px] italic leading-5 text-white/85">Draft voice transcript&hellip;</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            aria-label="Discard draft transcript before sending"
            className="flex h-11 items-center gap-1.5 rounded-pill border border-white/10 bg-white/[0.04] px-3 text-[12px] font-medium text-white/50"
          >
            <X size={13} strokeWidth={2} />
            Discard draft
          </button>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2">
            <ShieldCheck size={15} className="text-royal-purple" strokeWidth={2} />
            <h2 className="text-[13px] font-semibold text-white">Voice consent</h2>
          </div>
          <p className="mt-2 text-[12px] leading-4 text-white/55">
            Microphone and transcript, via device microphone and OS speech-to-text, sent to CIA. Kept in your{' '}
            <span className="text-emphasis">chat</span> history until you delete it.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Provenance items={['Via OS speech-to-text']} />
          </div>
          <div className="mt-3">
            <ConsentRail compact />
          </div>
        </div>

        <button
          aria-label="Open crisis support and safety resources"
          className="flex h-11 w-full items-center justify-center gap-2 rounded-pill border border-white/10 bg-white/[0.04] text-[13px] text-white/60"
        >
          Crisis support
        </button>
      </main>
    </HifiShell>
  )
}
