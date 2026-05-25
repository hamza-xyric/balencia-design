import type { HTMLAttributes } from 'react'

type ProgressRingProps = HTMLAttributes<HTMLDivElement> & {
  progress: number
  size?: 36 | 48 | 96
  label?: string
  complete?: boolean
}

const ringSettings = {
  36: { stroke: 4, radius: 15, text: 'text-[11px]' },
  48: { stroke: 4, radius: 20, text: 'text-[13px]' },
  96: { stroke: 8, radius: 42, text: 'text-h2' },
} as const

export function ProgressRing({
  progress,
  size = 36,
  label,
  complete = progress >= 1,
  className = '',
  ...props
}: ProgressRingProps) {
  const normalized = Math.max(0, Math.min(progress, 1))
  const settings = ringSettings[size]
  const circumference = 2 * Math.PI * settings.radius
  const targetOffset = circumference * (1 - normalized)
  const percentage = Math.round(normalized * 100)

  return (
    <div
      className={['relative inline-flex items-center justify-center shrink-0', className].filter(Boolean).join(' ')}
      style={{ width: size, height: size }}
      aria-label={label || `${percentage}% complete`}
      {...props}
    >
      <svg className="-rotate-90" width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={settings.radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={settings.stroke}
          className="text-white/10"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={settings.radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={settings.stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          className={`ring-animate ${complete ? 'text-forest-green' : 'text-brand-orange'}`}
          style={{
            '--ring-circumference': circumference,
            '--ring-target': targetOffset,
          } as React.CSSProperties}
        />
      </svg>
      <span className={`absolute font-semibold leading-none text-white ${settings.text}`}>
        {percentage}
      </span>
    </div>
  )
}
