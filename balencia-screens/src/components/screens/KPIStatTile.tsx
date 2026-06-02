import type { HTMLAttributes, ReactNode } from 'react'
import { ArrowDown, ArrowUp, Minus } from 'lucide-react'

// VK-008 · KPIStatTile — headline number + an honest, disclosed-window delta.
// Up = green (arrival); down = a NEUTRAL muted arrow (never red — a dip is not a danger);
// the glyph + number always read together, never colour alone.
type KPIStatTileProps = HTMLAttributes<HTMLDivElement> & {
  value: ReactNode
  label: string
  delta?: number
  /** Discloses the comparison window, e.g. "this week". */
  deltaWindow?: string
  align?: 'start' | 'center'
}

export function KPIStatTile({
  value,
  label,
  delta,
  deltaWindow = 'this week',
  align = 'start',
  className = '',
  ...props
}: KPIStatTileProps) {
  const hasDelta = typeof delta === 'number'
  const direction = !hasDelta ? 'flat' : delta > 0 ? 'up' : delta < 0 ? 'down' : 'flat'
  const Arrow = direction === 'up' ? ArrowUp : direction === 'down' ? ArrowDown : Minus
  const deltaColor = direction === 'up' ? 'text-forest-green' : 'text-white/40'
  const deltaWord = direction === 'up' ? 'up' : direction === 'down' ? 'down' : 'held'
  const alignClass = align === 'center' ? 'items-center text-center' : 'items-start text-left'

  return (
    <div
      className={['flex min-w-0 flex-col', alignClass, className].filter(Boolean).join(' ')}
      aria-label={
        hasDelta
          ? `${label}: ${typeof value === 'string' || typeof value === 'number' ? value : ''}, ${deltaWord} ${Math.abs(delta as number)} ${deltaWindow}`
          : undefined
      }
      {...props}
    >
      <span className="text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">
        {label}
      </span>
      <span className="mt-1 text-h2 font-bold leading-[var(--leading-snug)] tabular-nums text-white">
        {value}
      </span>
      {hasDelta && (
        <span className={`mt-1 inline-flex items-center gap-1 text-caption font-semibold leading-4 tabular-nums ${deltaColor}`}>
          <Arrow size={13} strokeWidth={2.2} aria-hidden="true" />
          {Math.abs(delta as number)}
          <span className="font-normal text-white/40">{deltaWindow}</span>
        </span>
      )}
    </div>
  )
}
