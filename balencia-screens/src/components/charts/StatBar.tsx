import { ArrowDown, ArrowUp, ChevronRight, Minus } from 'lucide-react'
import type { CSSProperties } from 'react'
import { domains, type DomainKey } from '@/data/domains'

// VK-006 · StatBar — a ranked domain stat row on a zero-baseline, shared 0–99 scale with a
// beveled --track-inset recess. Two tones: 'domain' (bar = domain identity, for multi-domain
// comparison — sanctioned on Life Areas [16] / RPG [19]) and 'orange' (bar = orange data-ink +
// domain dot, for the Me [17] composition preview). Decline = stalled-amber, never alarm-red.
// No-data ≠ zero: a null value renders a ghosted empty track + "—" + an invite, never a real 0.
type StatBarProps = {
  domain: DomainKey
  value: number | null
  max?: number
  tone?: 'domain' | 'orange'
  delta?: number
  meta?: string
  emptyHint?: string
  size?: 'full' | 'compact'
  showChevron?: boolean
  animate?: boolean
  className?: string
}

export function StatBar({
  domain,
  value,
  max = 99,
  tone = 'domain',
  delta,
  meta,
  emptyHint = 'Tap to explore',
  size = 'full',
  showChevron = false,
  animate = true,
  className = '',
}: StatBarProps) {
  const dotColor = `var(--color-domain-${domain})`
  const barColor = tone === 'orange' ? 'var(--color-brand-orange)' : dotColor
  const started = value != null
  const ratio = started ? Math.max(0, Math.min(value / max, 1)) : 0
  const label = domains[domain].label
  const trackStyle = { boxShadow: 'inset 0 1px 2px var(--track-inset)' } as CSSProperties

  const fill = (height: string) => (
    <div className={`overflow-hidden rounded-pill bg-alpha-white-08 ${height}`} style={trackStyle}>
      {started && (
        <div
          className={['h-full rounded-pill', animate ? 'momentum-animate' : ''].filter(Boolean).join(' ')}
          style={{ width: `${ratio * 100}%`, background: barColor }}
        />
      )}
    </div>
  )

  if (size === 'compact') {
    return (
      <div className={['flex items-center gap-3', started ? '' : 'opacity-60', className].filter(Boolean).join(' ')}>
        <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: dotColor }} aria-hidden="true" />
        <span className="w-24 shrink-0 truncate text-caption leading-[var(--leading-normal)] text-white/50">{label}</span>
        <div className="min-w-0 flex-1">{fill('h-1.5')}</div>
        <span className="w-7 shrink-0 text-right text-caption font-semibold tabular-nums leading-none text-white">
          {started ? value : '—'}
        </span>
      </div>
    )
  }

  const deltaGlyph =
    typeof delta === 'number'
      ? delta > 0
        ? { Icon: ArrowUp, cls: 'text-forest-green', text: `+${delta}` }
        : delta < 0
          ? { Icon: ArrowDown, cls: 'text-stalled-amber', text: `${delta}` }
          : { Icon: Minus, cls: 'text-white/30', text: 'no change' }
      : null

  return (
    <div className={['grid min-h-[64px] grid-cols-[auto_1fr_auto] items-center gap-3', started ? '' : 'opacity-50', className].filter(Boolean).join(' ')}>
      <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: dotColor }} aria-hidden="true" />
      <div className="min-w-0">
        <div className="flex items-center justify-between gap-3">
          <span className="min-w-0 truncate text-body font-semibold leading-[var(--leading-snug)] text-white">{label}</span>
          <span className={`shrink-0 text-h2 font-semibold tabular-nums leading-none ${started ? 'text-white' : 'text-white/30'}`}>
            {started ? value : '—'}
          </span>
        </div>
        <div className="mt-2">{fill('h-1.5')}</div>
        <div className="mt-2 flex items-center justify-between gap-3 text-caption leading-4">
          <span className="truncate text-white/50">{started ? meta : emptyHint}</span>
          {deltaGlyph && (
            <span className={`inline-flex shrink-0 items-center gap-1 font-semibold tabular-nums ${deltaGlyph.cls}`}>
              <deltaGlyph.Icon size={12} strokeWidth={2.2} aria-hidden="true" />
              {deltaGlyph.text}
            </span>
          )}
        </div>
      </div>
      {showChevron && <ChevronRight size={14} className="shrink-0 text-white/25" strokeWidth={2} aria-hidden="true" />}
    </div>
  )
}
