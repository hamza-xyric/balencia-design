import { Mic, Plus, Send, Sparkles } from 'lucide-react'
import { cx, toneClass, type Tone } from './core'
import { GlassCard, SolidCard } from './surfaces'
import { Provenance } from './chips'
import { MetricPill } from './data'

// Purple-tinted glass insight card — CIA's synthesized read. Leads with
// meaning; provenance names the evidence; actions stay quiet.
export function CIAInsightCard({
  eyebrow = 'CIA note',
  children,
  provenance,
  actions,
  className,
}: {
  eyebrow?: string
  children: React.ReactNode
  provenance?: string[]
  actions?: React.ReactNode
  className?: string
}) {
  return (
    <GlassCard tone="cia" className={className}>
      <div className="flex items-start gap-3">
        <Sparkles size={18} className="mt-0.5 shrink-0 text-royal-purple" />
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-royal-purple">{eyebrow}</p>
          <div className="mt-2 text-[15px] leading-[21px] text-white">{children}</div>
          {provenance && <div className="mt-3"><Provenance items={provenance} /></div>}
          {actions && <div className="mt-3 flex flex-wrap gap-2">{actions}</div>}
        </div>
      </div>
    </GlassCard>
  )
}

// Breathing purple presence orb — the hero of onboarding and full-screen voice.
export function CIAPresenceOrb({ size = 96, state = 'idle' }: { size?: number; state?: 'idle' | 'listening' | 'thinking' }) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }} role="img" aria-label={`CIA presence, ${state}`}>
      <div className="absolute inset-0 rounded-full bg-royal-purple/25 blur-xl" />
      <div className="quiet-pulse absolute inset-[10%] rounded-full bg-royal-purple/40 blur-md" />
      <div className="absolute inset-[24%] rounded-full bg-royal-purple shadow-[var(--glow-purple-md)]" />
      <div className="absolute inset-[40%] rounded-full bg-white/80 blur-[2px]" />
    </div>
  )
}

// Composer variant with the glowing voice mic present (voice available, not required).
export function VoiceComposer({ placeholder = 'Type a message' }: { placeholder?: string }) {
  return (
    <div className="flex h-[54px] items-center gap-2 rounded-pill border border-white/10 bg-ink-brown-800 p-1">
      <span className="flex h-11 w-11 items-center justify-center rounded-full text-white/45">
        <Plus size={18} strokeWidth={2} />
      </span>
      <span className="min-w-0 flex-1 text-[14px] leading-5 text-white/45">{placeholder}</span>
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-orange/15 text-brand-orange shadow-[var(--glow-orange-sm)]" aria-label="Voice input">
        <Mic size={17} strokeWidth={2} />
      </span>
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-orange text-white" aria-label="Send">
        <Send size={16} strokeWidth={2.2} />
      </span>
    </div>
  )
}

export function Composer({ placeholder = 'Message CIA' }: { placeholder?: string }) {
  return (
    <div className="flex h-[54px] items-center gap-2 rounded-pill border border-white/10 bg-ink-brown-800 p-1">
      <span className="flex h-11 w-11 items-center justify-center rounded-full text-white/45">
        <Plus size={18} strokeWidth={2} />
      </span>
      <span className="min-w-0 flex-1 text-[14px] leading-5 text-white/45">{placeholder}</span>
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-orange text-white shadow-[var(--glow-orange-sm)]">
        <Send size={16} strokeWidth={2.2} />
      </span>
    </div>
  )
}

export function ChatBubble({ speaker, children, tone = 'muted' }: { speaker: string; children: React.ReactNode; tone?: Tone }) {
  const isUser = speaker === 'You'
  return (
    <div className={cx('flex', isUser ? 'justify-end' : 'justify-start')}>
      <div className={cx('max-w-[280px] rounded-xl border px-4 py-3', isUser ? toneClass.you : toneClass[tone])}>
        <p className="mb-1 text-[11px] font-semibold uppercase leading-3 opacity-75">{speaker}</p>
        <div className="text-[14px] leading-5 text-white/85">{children}</div>
      </div>
    </div>
  )
}

export function InlineArtifact() {
  return (
    <SolidCard className="border-royal-purple/20">
      <div className="flex items-center justify-between">
        <h3 className="text-[14px] font-semibold text-white">Connection spotted</h3>
        <Sparkles size={16} className="text-royal-purple" strokeWidth={2} />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <MetricPill label="Sleep" value="6h 12m" />
        <MetricPill label="Load" value="8/10" />
      </div>
      <Provenance items={['Via Health', 'You logged']} />
    </SolidCard>
  )
}
