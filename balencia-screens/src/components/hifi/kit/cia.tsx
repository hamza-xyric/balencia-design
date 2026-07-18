import { cx, toneClass, type Tone } from './core'
import { GlassCard, SolidCard } from './surfaces'
import { Provenance } from './chips'
import { MetricPill } from './data'
import { CiaIntelligenceIcon } from './signature-icons'

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
        <CiaIntelligenceIcon active size={20} className="mt-0.5 shrink-0 text-royal-purple" />
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-paper-100/80">{eyebrow}</p>
          <div className="mt-2 text-[15px] leading-[21px] text-paper-100">{children}</div>
          {provenance && <div className="mt-3"><Provenance items={provenance} /></div>}
          {actions && <div className="mt-3 flex flex-wrap gap-2">{actions}</div>}
        </div>
      </div>
    </GlassCard>
  )
}

type MessageStatus = 'read' | 'delivered' | 'sent' | 'queued' | 'failed' | 'draft' | 'thinking'

export function ChatBubble({
  speaker,
  children,
  tone = 'muted',
  messageId,
  status,
  source,
  audience,
  timestamp,
  dateTime,
  live,
}: {
  speaker: string
  children: React.ReactNode
  tone?: Tone
  messageId?: string
  status?: MessageStatus
  source?: string
  audience?: string
  timestamp?: string
  dateTime?: string
  live?: 'polite' | 'assertive' | 'off'
}) {
  const isUser = speaker === 'You'
  const meta = [timestamp, status, source, audience].filter(Boolean)
  const accessibleSummary = meta.length > 0
    ? `${speaker}. ${timestamp ?? 'Time unavailable'}. ${status ?? 'Status unavailable'}. Source: ${source ?? 'not provided'}. Audience: ${audience ?? 'not provided'}.`
    : undefined

  return (
    <div className={cx('flex', isUser ? 'justify-end' : 'justify-start')}>
      <article
        aria-label={accessibleSummary}
        aria-live={live === 'off' ? undefined : live}
        data-message-id={messageId}
        data-message-speaker={messageId ? speaker.toLowerCase().replace(/\s+/g, '-') : undefined}
        data-message-status={status}
        data-message-source={source}
        data-message-audience={audience}
        className={cx('max-w-[280px] rounded-xl border px-4 py-3', isUser ? toneClass.you : toneClass[tone])}
      >
        <p className="mb-1 text-[11px] font-semibold uppercase leading-3 opacity-80">{speaker}</p>
        <div className="text-[14px] leading-5 text-paper-100/90">{children}</div>
        {meta.length > 0 && (
          <p aria-hidden="true" className="mt-2 flex flex-wrap gap-x-1 text-[11px] leading-4 text-paper-100/70">
            {timestamp && <time dateTime={dateTime}>{timestamp}</time>}
            {timestamp && status && <span>·</span>}
            {status && <span className="capitalize">{status}</span>}
            {(timestamp || status) && source && <span>·</span>}
            {source && <span>{source}</span>}
            {(timestamp || status || source) && audience && <span>·</span>}
            {audience && <span>{audience}</span>}
          </p>
        )}
      </article>
    </div>
  )
}

export function InlineArtifact() {
  return (
    <SolidCard className="border-royal-purple/20">
      <div className="flex items-center justify-between">
        <h3 className="text-[14px] font-semibold text-paper-100">Connection spotted</h3>
        <CiaIntelligenceIcon size={17} className="text-royal-purple" />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <MetricPill label="Sleep" value="6h 12m" />
        <MetricPill label="Load" value="8/10" />
      </div>
      <Provenance items={['Via Health', 'You logged']} />
    </SolidCard>
  )
}
