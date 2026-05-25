import type { HTMLAttributes } from 'react'
import { Footprints, HeartPulse, Moon } from 'lucide-react'

export type HealthMetric = {
  id: 'heart-rate' | 'steps' | 'sleep'
  value: string
  unit: string
}

const metricIcons = {
  'heart-rate': HeartPulse,
  steps: Footprints,
  sleep: Moon,
} as const

type HealthMetricsStripProps = HTMLAttributes<HTMLDivElement> & {
  metrics: HealthMetric[]
}

export function HealthMetricsStrip({ metrics, className = '', ...props }: HealthMetricsStripProps) {
  if (metrics.length === 0) return null

  return (
    <div
      className={['grid grid-cols-3 gap-2', className].filter(Boolean).join(' ')}
      {...props}
    >
      {metrics.map((metric) => {
        const Icon = metricIcons[metric.id]
        return (
          <button
            key={metric.id}
            className="flex h-9 min-w-0 items-center justify-center gap-1 rounded-pill border border-white/[0.08] bg-ink-brown-800 px-2 shadow-1"
            aria-label={`${metric.id}: ${metric.value} ${metric.unit}`}
          >
            <Icon size={14} className="shrink-0 text-white/50" strokeWidth={1.8} />
            <span className="min-w-0 text-[14px] font-semibold leading-5 text-white">
              {metric.value}
            </span>
            <span className="shrink-0 text-[10px] leading-4 text-white/40">{metric.unit}</span>
          </button>
        )
      })}
    </div>
  )
}
