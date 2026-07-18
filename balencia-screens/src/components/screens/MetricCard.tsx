import type { CSSProperties } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Check } from 'lucide-react'
import { Sparkline } from '@/components/charts/Sparkline'

// VK-003 · MetricCard — a crafted metric tile: icon + status sign + big value + unit
// + a 7-point Living-Line sparkline. In-range is a green dot PLUS a visible check
// (never colour alone). Replaces the flat text pill.
type MetricCardProps = {
  icon: LucideIcon
  label: string
  value: string
  unit: string
  trend: number[]
  status?: 'in-range' | 'neutral'
  milestone?: boolean
  onClick?: () => void
  className?: string
}

const surfaceShadow = { boxShadow: 'var(--edge-highlight), var(--shadow-1)' } as CSSProperties

export function MetricCard({
  icon: Icon,
  label,
  value,
  unit,
  trend,
  status = 'neutral',
  milestone = false,
  onClick,
  className = '',
}: MetricCardProps) {
  const inRange = status === 'in-range'

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'focus-ring flex min-h-11 flex-col items-start gap-1.5 rounded-md border border-alpha-white-06 bg-ink-brown-800 p-3 text-left transition-transform duration-[var(--dur-fast)] active:scale-[0.97]',
        className,
      ].filter(Boolean).join(' ')}
      style={surfaceShadow}
      aria-label={`${label}: ${value} ${unit}${inRange ? ', in range' : ''}`}
    >
      <div className="flex w-full items-center justify-between">
        <Icon size={14} className="shrink-0 text-white/50" strokeWidth={1.8} aria-hidden="true" />
        {inRange && (
          <span className="inline-flex items-center gap-1" aria-hidden="true">
            <span className="h-1.5 w-1.5 rounded-full bg-forest-green" />
            <Check size={11} className="text-forest-green" strokeWidth={2.6} />
          </span>
        )}
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-h2 font-semibold leading-none tabular-nums text-white">{value}</span>
        <span className="text-caption leading-none text-white/40">{unit}</span>
      </div>
      <Sparkline points={trend} milestone={milestone} className="mt-0.5" />
    </button>
  )
}
