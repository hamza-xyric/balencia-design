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

export function MiniRadar({ labels = false }: { labels?: boolean }) {
  return (
    <div className="relative mx-auto h-[172px] w-[172px]" role="img" aria-label="Life balance shape">
      <svg viewBox="0 0 172 172" className="h-full w-full text-brand-orange" aria-hidden="true">
        <circle cx="86" cy="86" r="68" fill="none" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" />
        <circle cx="86" cy="86" r="42" fill="none" stroke="currentColor" strokeOpacity="0.14" strokeWidth="1" />
        <path d="M86 16 L86 156 M16 86 L156 86 M37 37 L135 135 M135 37 L37 135" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" />
        <path className="area-in fill-brand-orange/15 stroke-brand-orange" d="M86 24 L132 48 L140 94 L106 136 L61 128 L36 88 L50 46 Z" strokeWidth="2" />
        <circle cx="86" cy="86" r="21" className="fill-ink-900 stroke-brand-orange" strokeWidth="2" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-[28px] font-semibold leading-8 text-white tabular-nums">487</span>
        <span className="text-[11px] text-white/45">Life Power</span>
      </div>
      {labels && (
        <div className="absolute inset-x-0 bottom-0 flex justify-between text-[10px] text-white/35">
          <span>Fitness</span>
          <span>Wellbeing</span>
        </div>
      )}
    </div>
  )
}

export function ArcGauge({ value, label }: { value: string; label: string }) {
  return (
    <div className="relative mx-auto h-[160px] w-[160px]" aria-label={`${label} ${value}`}>
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
export function ChargeMeter({ ticks = 10, filled, label }: { ticks?: number; filled: number; label?: string }) {
  return (
    <div className="flex items-center" style={{ gap: 'var(--charge-gap)' }} role="img" aria-label={label ?? `${filled} of ${ticks} charged`}>
      {Array.from({ length: ticks }).map((_, index) => (
        <span
          key={index}
          className={cx('h-3 flex-1', index < filled ? (index >= ticks - 2 ? 'bg-forest-green' : 'bg-brand-orange') : 'bg-[var(--charge-tick-off)]')}
          style={{ borderRadius: 'var(--charge-radius)' }}
        />
      ))}
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

export function Sparkline({ tone = 'you' }: { tone?: Tone }) {
  const stroke = tone === 'cia' ? 'stroke-royal-purple' : tone === 'done' ? 'stroke-forest-green' : 'stroke-brand-orange'
  return (
    <svg viewBox="0 0 240 70" className="h-[70px] w-full" aria-hidden="true">
      <path d="M4 52 C32 38 40 18 66 22 C98 28 94 58 126 48 C160 38 166 16 198 24 C218 29 226 24 236 18" fill="none" className={stroke} strokeWidth="3" strokeLinecap="round" />
      <path d="M4 70 L4 52 C32 38 40 18 66 22 C98 28 94 58 126 48 C160 38 166 16 198 24 C218 29 226 24 236 18 L236 70 Z" className="fill-brand-orange/10" />
    </svg>
  )
}
