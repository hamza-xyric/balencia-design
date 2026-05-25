export type HeatmapIntensity = 0 | 1 | 2 | 3 | 4 | 'future'

export interface HeatmapCell {
  id: string
  intensity: HeatmapIntensity
  isToday?: boolean
  ariaLabel?: string
}

type CalendarHeatmapProps = {
  dayLabels: string[]
  rows: HeatmapCell[][]
  tone?: 'brand' | 'creativity' | 'learning'
  cellSize?: 28 | 32
  monthLabel?: string
  summaryLeft?: string
  summaryRight?: string
  className?: string
}

const toneClasses = {
  brand: {
    levels: ['bg-white/[0.05]', 'bg-brand-orange/20', 'bg-brand-orange/50', 'bg-brand-orange/75', 'bg-brand-orange'],
    border: 'border-brand-orange',
    text: 'text-brand-orange',
  },
  creativity: {
    levels: ['bg-white/[0.05]', 'bg-domain-creativity/30', 'bg-domain-creativity/60', 'bg-domain-creativity/80', 'bg-domain-creativity'],
    border: 'border-domain-creativity',
    text: 'text-domain-creativity',
  },
  learning: {
    levels: ['bg-white/[0.05]', 'bg-domain-learning/30', 'bg-domain-learning/60', 'bg-domain-learning/80', 'bg-domain-learning'],
    border: 'border-domain-learning',
    text: 'text-domain-learning',
  },
} as const

export function CalendarHeatmap({
  dayLabels,
  rows,
  tone = 'brand',
  cellSize = 28,
  monthLabel,
  summaryLeft,
  summaryRight,
  className = '',
}: CalendarHeatmapProps) {
  const toneClass = toneClasses[tone]
  const sizeClass = cellSize === 32 ? 'h-8 w-8' : 'h-7 w-7'

  function cellClass(cell: HeatmapCell) {
    const fill = cell.intensity === 'future'
      ? 'bg-white/[0.03]'
      : toneClass.levels[cell.intensity]

    return [
      sizeClass,
      'rounded-xs border transition-transform duration-[var(--dur-fast)] active:scale-110',
      fill,
      cell.isToday ? `${toneClass.border} border-dashed` : 'border-transparent',
    ].join(' ')
  }

  return (
    <div className={className}>
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: `repeat(${dayLabels.length}, minmax(0, 1fr))` }}
      >
        {dayLabels.map((label, index) => (
          <div key={`${label}-${index}`} className="text-center text-small font-normal leading-[14px] text-white/30">
            {label}
          </div>
        ))}
      </div>

      <div className="mt-2 space-y-1.5">
        {rows.map((row, rowIndex) => (
          <div
            key={`heatmap-row-${rowIndex}`}
            className="grid gap-1"
            style={{ gridTemplateColumns: `repeat(${dayLabels.length}, minmax(0, 1fr))` }}
          >
            {row.map((cell) => (
              <div key={cell.id} className="flex justify-center">
                <span className={cellClass(cell)} aria-label={cell.ariaLabel} />
              </div>
            ))}
          </div>
        ))}
      </div>

      {(monthLabel || summaryLeft || summaryRight) && (
        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="text-[13px] leading-[18px] text-white/40">
            {monthLabel || summaryLeft}
          </div>
          {summaryRight && (
            <div className={`text-caption font-semibold leading-[18px] ${tone === 'brand' ? 'text-forest-green' : toneClass.text}`}>
              {summaryRight}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
