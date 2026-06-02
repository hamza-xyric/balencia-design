import type { CSSProperties, HTMLAttributes } from 'react'
import type { DomainKey } from '@/data/domains'
import { domains } from '@/data/domains'
import type { DomainStat } from '@/data/mock'

// VK-005 · ConstellationRadar — the 10–12-domain life profile rendered as a "life
// constellation," not a default radar: a gradient orange polygon that DRAWS itself
// (never the legacy radar-grow scale, §8), glowing domain star-dots, and Life Power
// as the central glowing "sun" hub. The cross-domain differentiator no health app shows.
type ConstellationRadarProps = HTMLAttributes<HTMLDivElement> & {
  stats: DomainStat[]
  size?: number
  /** Center hub value (Life Power). Pass null for the cold-start "calibrating" state. */
  lifePower?: number | null
  /** Shown in the hub when lifePower is null (cold-start). */
  coldLabel?: string
  animate?: boolean
}

const MAX_STAT = 99
const RINGS = [20, 40, 60, 80, 99]

export function ConstellationRadar({
  stats,
  size = 160,
  lifePower = null,
  coldLabel = 'Building your balance',
  animate = true,
  className = '',
  ...props
}: ConstellationRadarProps) {
  const center = size / 2
  const radius = size / 2 - 10
  const n = stats.length

  const vertex = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / n - Math.PI / 2
    const r = radius * (value / MAX_STAT)
    return { x: center + Math.cos(angle) * r, y: center + Math.sin(angle) * r }
  }

  const dataPoints = stats.map((s, i) => vertex(i, s.stat))
  const polygon = dataPoints.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')

  const top = [...stats].sort((a, b) => b.stat - a.stat)[0]
  const ariaLabel = lifePower == null
    ? `Life balance constellation, calibrating. ${coldLabel}.`
    : `Life balance constellation. Life Power ${lifePower}. Strongest area ${domains[top.domain].label} at ${top.stat} of 99.`

  const hubDiameter = Math.round(size * 0.36)

  return (
    <div
      className={['relative inline-flex items-center justify-center', className].filter(Boolean).join(' ')}
      style={{ width: size, height: size }}
      role="img"
      aria-label={ariaLabel}
      {...props}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <defs>
          <radialGradient id="radarFill" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-brand-orange)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--color-brand-orange)" stopOpacity="0.08" />
          </radialGradient>
        </defs>

        {/* Backplate + rings */}
        {RINGS.map((ring) => (
          <polygon
            key={ring}
            points={stats.map((_, i) => {
              const p = vertex(i, ring)
              return `${p.x.toFixed(1)},${p.y.toFixed(1)}`
            }).join(' ')}
            fill="none"
            stroke="var(--color-alpha-white-05)"
            strokeWidth="1"
          />
        ))}

        {/* Axes */}
        {stats.map((s, i) => {
          const end = vertex(i, MAX_STAT)
          return (
            <line
              key={s.domain}
              x1={center}
              y1={center}
              x2={end.x}
              y2={end.y}
              stroke="var(--color-alpha-white-05)"
              strokeWidth="1"
            />
          )
        })}

        {/* Gradient fill area (arrives with the stroke — an area, not a line) */}
        <polygon
          points={polygon}
          fill="url(#radarFill)"
          className={animate ? 'area-in' : undefined}
        />

        {/* The drawn polygon stroke (§8 — draws itself, never scales/fades) */}
        <polygon
          points={polygon}
          pathLength={1}
          fill="none"
          stroke="var(--color-brand-orange)"
          strokeLinejoin="round"
          strokeLinecap="round"
          className={animate ? 'line-draw' : undefined}
          style={{ strokeWidth: 'var(--stroke-thin)', filter: 'var(--glow-drop-orange-md)' }}
        />

        {/* Domain star-dots */}
        <g style={{ filter: 'var(--glow-drop-orange-sm)' }}>
          {stats.map((s, i) => {
            const p = dataPoints[i]
            return (
              <circle
                key={s.domain}
                cx={p.x}
                cy={p.y}
                r="3"
                fill={`var(--color-domain-${s.domain as DomainKey})`}
                className={animate ? 'radar-dot' : undefined}
                style={animate ? ({ animationDelay: `${420 + i * 40}ms` } as CSSProperties) : undefined}
              />
            )
          })}
        </g>
      </svg>

      {/* Sun hub — Life Power, the glowing center */}
      <div
        className="absolute flex flex-col items-center justify-center rounded-full border border-alpha-white-08 bg-ink-brown-800 text-center"
        style={{ width: hubDiameter, height: hubDiameter, boxShadow: 'var(--glow-orange)' }}
      >
        {lifePower == null ? (
          <span className="px-1 text-[10px] font-medium leading-[var(--leading-snug)] text-white/60">
            {coldLabel}
          </span>
        ) : (
          <>
            <span className="text-h2 font-bold leading-none tabular-nums text-white">{lifePower}</span>
            <span className="mt-0.5 text-[9px] font-semibold uppercase leading-none tracking-[0.12em] text-white/40">
              Power
            </span>
          </>
        )}
      </div>
    </div>
  )
}
