import { Plus, Send, Sparkles } from 'lucide-react'
import { cx, toneClass, type Tone } from './core'
import { SolidCard } from './surfaces'
import { Provenance } from './chips'
import { MetricPill } from './data'

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
