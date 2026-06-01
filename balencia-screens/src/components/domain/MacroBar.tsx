import type { HTMLAttributes } from 'react'

type MacroBarProps = HTMLAttributes<HTMLDivElement> & {
  label: string
  current: number
  target?: number
  unit?: string
  tone?: 'primary' | 'muted' | 'soft'
  percent?: number
}

const fillClasses = {
  primary: 'bg-brand-orange',
  muted: 'bg-white/40',
  soft: 'bg-white/20',
}

export function MacroBar({
  label,
  current,
  target,
  unit = '',
  tone = 'muted',
  percent,
  className = '',
  ...props
}: MacroBarProps) {
  const progress = percent ?? (target ? current / target : 0)
  const width = `${Math.max(0, Math.min(progress, 1)) * 100}%`
  const value = `${current.toLocaleString()}${unit}`
  const targetLabel = target ? `${current.toLocaleString()} / ${target.toLocaleString()}${unit}` : value

  return (
    <div className={className} {...props}>
      <div className="mb-2 flex items-center justify-between gap-3 text-[15px] leading-5">
        <span className="truncate text-white">{label}</span>
        <span className="shrink-0 font-semibold text-white tabular-nums">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-pill bg-alpha-white-08">
        <div className={`h-full rounded-pill ${fillClasses[tone]}`} style={{ width }} />
      </div>
      {target && (
        <div className="mt-1 text-[12px] leading-4 text-white/40 tabular-nums">
          {targetLabel}
        </div>
      )}
    </div>
  )
}
