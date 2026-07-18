import { cx, toneClass, type Tone } from './core'

export function ProgressBar({ value, tone = 'you' }: { value: number; tone?: Tone }) {
  const color = tone === 'done' ? 'bg-forest-green' : tone === 'cia' ? 'bg-royal-purple' : 'bg-brand-orange'
  return (
    <div className="h-2 overflow-hidden rounded-pill bg-white/[0.08]">
      <div className={cx('h-full rounded-pill', color)} style={{ width: `${value}%` }} />
    </div>
  )
}

export function MetricPill({ label, value, tone = 'muted' }: { label: string; value: string; tone?: Tone }) {
  return (
    <div className={cx('rounded-lg border p-3', toneClass[tone])}>
      <p className="text-[11px] font-semibold uppercase leading-3 text-white/60">{label}</p>
      <p className="mt-2 text-[20px] font-semibold leading-6 text-white">{value}</p>
    </div>
  )
}

export const LIFE_DOMAIN_ORDER = [
  'Fitness',
  'Sleep',
  'Career',
  'Nutrition',
  'Finance',
  'Faith',
  'Productivity',
  'Relationships',
  'Wellbeing',
  'Meditation',
] as const

export type LifeDomainDatum = {
  name: (typeof LIFE_DOMAIN_ORDER)[number]
  shortLabel: string
  value: number
  source: string
}

export const DEFAULT_LIFE_DOMAINS = [
  { name: 'Fitness', shortLabel: 'Fit', value: 58, source: 'WHOOP' },
  { name: 'Sleep', shortLabel: 'Sleep', value: 50, source: 'Health' },
  { name: 'Career', shortLabel: 'Career', value: 46, source: 'Calendar' },
  { name: 'Nutrition', shortLabel: 'Nutr.', value: 43, source: 'You logged' },
  { name: 'Finance', shortLabel: 'Finance', value: 38, source: 'You logged' },
  { name: 'Faith', shortLabel: 'Faith', value: 32, source: 'You logged' },
  { name: 'Productivity', shortLabel: 'Focus', value: 49, source: 'Calendar' },
  { name: 'Relationships', shortLabel: 'People', value: 44, source: 'You logged' },
  { name: 'Wellbeing', shortLabel: 'Well.', value: 40, source: 'Mood check-ins' },
  { name: 'Meditation', shortLabel: 'Medit.', value: 33, source: 'Session log' },
] satisfies LifeDomainDatum[]

export function assertCompleteLifeDomains(domains: LifeDomainDatum[]): void {
  const complete = domains.length === LIFE_DOMAIN_ORDER.length
    && domains.every((domain, index) => domain.name === LIFE_DOMAIN_ORDER[index])
    && new Set(domains.map(domain => domain.name)).size === LIFE_DOMAIN_ORDER.length
    && domains.every(domain => Number.isFinite(domain.value))

  if (!complete) {
    throw new Error(`Life Power requires exactly these ten domains in canon order: ${LIFE_DOMAIN_ORDER.join(', ')}`)
  }
}

export function calculateLifePower(values: number[]) {
  if (!values.length) return { score: 0, balanceMultiplier: 1, coefficientOfVariation: 0 }
  const normalized = values.map(value => Math.max(0, Math.min(99, value)))
  const sum = normalized.reduce((total, value) => total + value, 0)
  const mean = sum / normalized.length
  const variance = mean === 0
    ? 0
    : normalized.reduce((total, value) => total + ((value - mean) ** 2), 0) / normalized.length
  const coefficientOfVariation = mean === 0 ? 0 : Math.sqrt(variance) / mean
  const balanceMultiplier = 1 + 0.15 * (1 - coefficientOfVariation)
  return {
    score: Math.round(sum * balanceMultiplier),
    balanceMultiplier,
    coefficientOfVariation,
  }
}

function polarPoint(index: number, count: number, radius: number, center = 120) {
  const angle = -Math.PI / 2 + (index / count) * Math.PI * 2
  return {
    x: center + Math.cos(angle) * radius,
    y: center + Math.sin(angle) * radius,
  }
}

function polygonPoints(values: number[], radius: number) {
  return values.map((value, index) => {
    const point = polarPoint(index, values.length, radius * (Math.max(0, Math.min(99, value)) / 99))
    return `${point.x.toFixed(1)},${point.y.toFixed(1)}`
  }).join(' ')
}

export function LifePowerRadar({
  domains,
  compact = false,
  size,
}: {
  domains: LifeDomainDatum[]
  compact?: boolean
  size?: number
}) {
  assertCompleteLifeDomains(domains)
  const safeDomains = domains.map(domain => ({
    ...domain,
    value: Math.max(0, Math.min(99, domain.value)),
  }))
  const values = safeDomains.map(domain => domain.value)
  const { score, balanceMultiplier } = calculateLifePower(values)
  const summary = safeDomains.map(domain => `${domain.name} ${domain.value} from ${domain.source}`).join(', ')
  const radius = 70
  const resolvedSize = size ?? (compact ? 172 : 240)
  const micro = resolvedSize < 140

  return (
    <div
      className="relative mx-auto"
      style={{ width: resolvedSize, height: resolvedSize }}
      role="img"
      aria-label={`Life Power ${score}. ${safeDomains.length} active domains. ${summary}. Balance multiplier ${balanceMultiplier.toFixed(2)}.`}
      data-domain-count={safeDomains.length}
    >
      <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden="true">
        {[0.33, 0.66, 1].map(scale => (
          <polygon
            key={scale}
            points={Array.from({ length: safeDomains.length }, (_, index) => {
              const point = polarPoint(index, safeDomains.length, radius * scale)
              return `${point.x},${point.y}`
            }).join(' ')}
            fill="none"
            className="stroke-brand-orange"
            strokeOpacity={scale === 1 ? 0.22 : 0.11}
            strokeWidth="1"
          />
        ))}
        {!compact && safeDomains.map((domain, index) => {
          const outer = polarPoint(index, safeDomains.length, radius)
          const label = polarPoint(index, safeDomains.length, 96)
          return (
            <g key={domain.name}>
              <line x1="120" y1="120" x2={outer.x} y2={outer.y} className="stroke-brand-orange" strokeOpacity="0.14" strokeWidth="1" />
              <text
                x={label.x}
                y={label.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-paper-100 text-[10px] font-medium"
                fillOpacity="0.62"
              >
                {domain.shortLabel}
              </text>
            </g>
          )
        })}
        <polygon className="area-in fill-brand-orange/15 stroke-brand-orange" points={polygonPoints(values, radius)} strokeWidth="2.4" strokeLinejoin="round" />
        {values.map((value, index) => {
          const point = polarPoint(index, values.length, radius * (Math.max(0, Math.min(99, value)) / 99))
          return <circle key={safeDomains[index].name} cx={point.x} cy={point.y} r="2.8" className="fill-brand-orange" />
        })}
        <circle cx="120" cy="120" r="27" className="fill-ink-900 stroke-brand-orange" strokeWidth="2" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className={cx('font-semibold text-paper-100 tabular-nums', micro ? 'text-[21px] leading-6' : 'text-[28px] leading-8')}>{score}</span>
        <span className="text-[11px] text-paper-100/70">Life Power</span>
      </div>
    </div>
  )
}

// Backwards-compatible radar entry point for legacy consumers. It now uses
// the same ten-domain payload and Life Power calculation as the full radar.
export function MiniRadar({ labels = false }: { labels?: boolean }) {
  return <LifePowerRadar domains={DEFAULT_LIFE_DOMAINS} compact={!labels} />
}

export function ArcGauge({ value, label }: { value: string; label: string }) {
  return (
    <div className="relative mx-auto h-[160px] w-[160px]" role="img" aria-label={`${label} ${value}`}>
      <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90 text-brand-orange" aria-hidden="true">
        <circle cx="80" cy="80" r="62" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="14" strokeLinecap="round" />
        <circle cx="80" cy="80" r="62" fill="none" stroke="currentColor" strokeWidth="14" strokeDasharray="300 390" strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-[38px] font-semibold leading-10 text-white tabular-nums">{value}</span>
        <span className="mt-1 text-[12px] text-white/45">{label}</span>
      </div>
    </div>
  )
}

// Single-stroke progress ring. Fill is orange; flips green at 100%.
export function ProgressRing({
  percent,
  value,
  label,
  size = 96,
  tone,
  ghost = false,
}: {
  percent: number
  value: string
  label?: string
  size?: number
  tone?: Tone
  ghost?: boolean
}) {
  const radius = 42
  const circumference = 2 * Math.PI * radius
  const resolved = tone ?? (percent >= 100 ? 'done' : 'you')
  const stroke = resolved === 'done' ? 'stroke-forest-green' : resolved === 'cia' ? 'stroke-royal-purple' : 'stroke-brand-orange'
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }} role="img" aria-label={`${label ?? 'Progress'} ${value}`}>
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle cx="50" cy="50" r={radius} fill="none" className="stroke-white/10" strokeWidth="9" strokeDasharray={ghost ? '3 6' : undefined} />
        {!ghost && (
          <circle
            cx="50" cy="50" r={radius} fill="none"
            className={stroke}
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={`${(Math.min(percent, 100) / 100) * circumference} ${circumference}`}
          />
        )}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-[20px] font-semibold leading-6 text-white tabular-nums">{value}</span>
        {label && <span className="text-[10px] text-white/45">{label}</span>}
      </div>
    </div>
  )
}

// Cumulative momentum fill (builds, never drains) with a glow that narrates progress.
export function MomentumBar({ value, label }: { value: number; label?: string }) {
  return (
    <div className="h-2 overflow-hidden rounded-pill bg-white/[0.08]" role="img" aria-label={label ?? `Progress ${value} percent`}>
      <div className="h-full rounded-pill bg-brand-orange shadow-[var(--glow-orange-sm)]" style={{ width: `${value}%` }} />
    </div>
  )
}

// Segmented depletable-capacity meter (VK-020 tokens). Filled ticks run the
// orange->green progress ramp; off ticks stay alpha-white.
export function ChargeMeter({
  ticks = 10,
  filled = 0,
  percent,
  label,
}: {
  ticks?: number
  filled?: number
  percent?: number
  label?: string
}) {
  const normalizedPercent = percent === undefined ? undefined : Math.max(0, Math.min(100, percent))
  const filledUnits = normalizedPercent === undefined ? Math.max(0, Math.min(ticks, filled)) : (normalizedPercent / 100) * ticks
  const defaultLabel = normalizedPercent === undefined
    ? `${filled} of ${ticks} charged`
    : `${normalizedPercent} percent charged`

  return (
    <div className="flex items-center" style={{ gap: 'var(--charge-gap)' }} role="img" aria-label={label ?? defaultLabel}>
      {Array.from({ length: ticks }).map((_, index) => {
        const tickFill = Math.max(0, Math.min(1, filledUnits - index))
        return (
          <span
            key={index}
            className="h-3 flex-1 overflow-hidden bg-[var(--charge-tick-off)]"
            style={{ borderRadius: 'var(--charge-radius)' }}
          >
            <span
              aria-hidden="true"
              className={cx('block h-full', index >= ticks - 2 ? 'bg-forest-green' : 'bg-brand-orange')}
              style={{ width: `${tickFill * 100}%` }}
            />
          </span>
        )
      })}
    </div>
  )
}

function toPoints(values: number[], min: number, max: number, x0: number, x1: number, height: number) {
  const span = max - min || 1
  return values.map((valueAt, index) => {
    const x = x0 + ((x1 - x0) * index) / Math.max(values.length - 1, 1)
    const y = 8 + (height - 16) * (1 - (valueAt - min) / span)
    return `${x},${y}`
  })
}

// Canon trend chart: past = solid orange, projection = dashed purple,
// milestones = green dots. Never gradients, never a fabricated value.
export function TrendChart({
  past,
  projected = [],
  milestones = [],
  height = 80,
  label,
}: {
  past: number[]
  projected?: number[]
  milestones?: number[]
  height?: number
  label?: string
}) {
  const all = [...past, ...projected]
  const min = Math.min(...all)
  const max = Math.max(...all)
  const width = 240
  const splitX = projected.length
    ? (width * (past.length - 1)) / (past.length + projected.length - 1)
    : width
  const pastPoints = toPoints(past, min, max, 0, splitX, height)
  const projectedPoints = projected.length
    ? toPoints([past[past.length - 1], ...projected], min, max, splitX, width, height)
    : []
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ height }} role="img" aria-label={label ?? 'Trend chart'}>
      <polyline points={pastPoints.join(' ')} fill="none" className="stroke-brand-orange" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {projectedPoints.length > 0 && (
        <polyline points={projectedPoints.join(' ')} fill="none" className="stroke-royal-purple" strokeWidth="2" strokeDasharray="5 5" strokeLinecap="round" />
      )}
      {milestones.filter(index => index >= 0 && index < pastPoints.length).map(index => {
        const [x, y] = pastPoints[index].split(',')
        return <circle key={index} cx={x} cy={y} r="3.5" className="fill-forest-green" />
      })}
    </svg>
  )
}

// GitHub-style consistency grid. Intensity 0-3; 3 = completed (green).
export function HeatGrid({ values, columns = 7, label }: { values: number[]; columns?: number; label?: string }) {
  const cell = ['bg-white/[0.05]', 'bg-brand-orange/25', 'bg-brand-orange/50', 'bg-forest-green/55']
  return (
    <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }} role="img" aria-label={label ?? 'Consistency grid'}>
      {values.map((valueAt, index) => (
        <span key={index} className={cx('h-6 rounded-sm', cell[Math.max(0, Math.min(3, valueAt))])} />
      ))}
    </div>
  )
}

// Compact volume bars: this week solid, last week as ghost dashed ticks.
export function VolumeBars({
  current,
  previous,
  labels,
  height = 72,
}: {
  current: number[]
  previous: number[]
  labels?: string[]
  height?: number
}) {
  const max = Math.max(...current, ...previous, 1)
  return (
    <div>
      <div className="flex items-end gap-2" style={{ height }}>
        {current.map((valueAt, index) => (
          <div key={index} className="relative flex-1">
            <div
              className="absolute inset-x-1 border-t-2 border-dashed border-white/20"
              style={{ bottom: `${(previous[index] / max) * (height - 8)}px` }}
            />
            <div
              className="rounded-t-md bg-brand-orange/80"
              style={{ height: `${(valueAt / max) * (height - 8)}px` }}
            />
          </div>
        ))}
      </div>
      {labels && (
        <div className="mt-2 flex gap-2">
          {labels.map((labelAt, index) => (
            <span key={index} className="flex-1 text-center text-[10px] text-white/35">{labelAt}</span>
          ))}
        </div>
      )}
    </div>
  )
}

// Multi-segment part-of-whole donut with a center KPI hub.
export function DonutHub({
  segments,
  value,
  label,
  size = 120,
}: {
  segments: Array<{ percent: number; className: string; label?: string }>
  value: string
  label?: string
  size?: number
}) {
  const radius = 42
  const circumference = 2 * Math.PI * radius
  const lengths = segments.map(segment => (segment.percent / 100) * circumference)
  const offsets = lengths.map((_, index) => lengths.slice(0, index).reduce((sum, length) => sum + length + 2, 0))
  const segmentSummary = segments
    .filter(segment => segment.label)
    .map(segment => `${segment.label} ${segment.percent} percent`)
    .join(', ')
  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${label ?? 'Total'} ${value}${segmentSummary ? `. ${segmentSummary}` : ''}`}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle cx="50" cy="50" r={radius} fill="none" className="stroke-white/[0.07]" strokeWidth="10" />
        {segments.map((segment, index) => {
          const length = lengths[index]
          const dashOffset = -offsets[index]
          return (
            <circle
              key={index}
              cx="50" cy="50" r={radius} fill="none"
              className={segment.className}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${Math.max(length - 2, 1)} ${circumference}`}
              strokeDashoffset={dashOffset}
            />
          )
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-[22px] font-semibold leading-7 text-white tabular-nums">{value}</span>
        {label && <span className="text-[10px] text-white/45">{label}</span>}
      </div>
    </div>
  )
}

export function Sparkline({
  tone = 'you',
  values = [62, 66, 68, 65, 70, 72, 74],
  label = 'Seven-point trend',
}: {
  tone?: Tone
  values?: number[]
  label?: string
}) {
  const stroke = tone === 'cia' ? 'stroke-royal-purple' : tone === 'done' ? 'stroke-forest-green' : 'stroke-brand-orange'
  const points = toPoints(values, Math.min(...values), Math.max(...values), 4, 236, 64).join(' ')
  const areaPoints = `4,70 ${points} 236,70`
  return (
    <svg viewBox="0 0 240 70" className="h-[70px] w-full" role="img" aria-label={`${label}: ${values.join(', ')}`}>
      <polygon points={areaPoints} className="fill-brand-orange/10" />
      <polyline points={points} fill="none" className={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
