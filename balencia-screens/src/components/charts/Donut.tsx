import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'

// VK-007 · Donut — part-of-whole composition (how a true total splits). Largest slice
// is orange; the rest are warm neutral tints (never rainbow, never purple unless SIA).
// Slices MUST sum to a true, nameable whole — a 0-value category is omitted, never a
// zero-width wedge. 2px gaps reveal the warm surface for carved separation.
export type DonutSegment = {
  label: string
  value: number
  /** Override slice colour (e.g. a domain identity tint). */
  color?: string
}

type DonutProps = HTMLAttributes<HTMLDivElement> & {
  segments: DonutSegment[]
  size?: number
  thickness?: number
  hubValue?: ReactNode
  hubLabel?: string
}

const neutralTints = [
  'var(--color-alpha-white-40)',
  'var(--color-alpha-white-25)',
  'var(--color-alpha-white-15)',
]

export function Donut({
  segments,
  size = 96,
  thickness = 12,
  hubValue,
  hubLabel,
  className = '',
  ...props
}: DonutProps) {
  const present = segments.filter((s) => s.value > 0)
  const total = present.reduce((sum, s) => sum + s.value, 0)
  const center = size / 2
  const radius = (size - thickness) / 2
  const circ = 2 * Math.PI * radius
  const gap = 2

  // Largest slice gets the orange data-ink; the rest take warm neutral tints by rank.
  const ranked = [...present].sort((a, b) => b.value - a.value)
  const colorFor = (seg: DonutSegment) => {
    if (seg.color) return seg.color
    const rank = ranked.indexOf(seg)
    if (rank === 0) return 'var(--color-brand-orange)'
    return neutralTints[(rank - 1) % neutralTints.length]
  }

  const arcs = present.map((seg, i) => {
    const fraction = total > 0 ? seg.value / total : 0
    const before = present.slice(0, i).reduce((sum, s) => sum + s.value, 0)
    const startAngle = (before / Math.max(total, 1)) * 360
    const arcLen = fraction * circ
    const color = colorFor(seg)
    return { seg, startAngle, arcLen, color, isPrimary: ranked.indexOf(seg) === 0, pct: Math.round(fraction * 100) }
  })

  const ariaLabel = total > 0
    ? `${arcs.map((a) => `${a.seg.label} ${a.pct}%`).join(', ')}${hubLabel ? ` of ${hubLabel}` : ''}`
    : 'No data yet'

  return (
    <div
      className={['relative inline-flex items-center justify-center', className].filter(Boolean).join(' ')}
      style={{ width: size, height: size }}
      role="img"
      aria-label={ariaLabel}
      {...props}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        {/* Recessed track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="var(--color-alpha-white-08)"
          strokeWidth={thickness}
        />
        {arcs.map((a) => (
          <circle
            key={a.seg.label}
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={a.color}
            strokeWidth={thickness}
            strokeLinecap="round"
            strokeDasharray={`${Math.max(a.arcLen - gap, 0.01)} ${circ}`}
            transform={`rotate(${a.startAngle - 90} ${center} ${center})`}
            style={a.isPrimary && size >= 48 ? ({ filter: 'var(--glow-drop-orange-lg)' } as CSSProperties) : undefined}
          />
        ))}
      </svg>
      {(hubValue != null || hubLabel) && (
        <div className="absolute flex flex-col items-center justify-center text-center">
          {hubValue != null && (
            <span className="text-h2 font-bold leading-none tabular-nums text-white">{hubValue}</span>
          )}
          {hubLabel && (
            <span className="mt-0.5 text-[10px] leading-none text-white/40">{hubLabel}</span>
          )}
        </div>
      )}
    </div>
  )
}
