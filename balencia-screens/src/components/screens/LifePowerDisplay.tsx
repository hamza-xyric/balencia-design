import type { HTMLAttributes } from 'react'

type LifePowerDisplayProps = HTMLAttributes<HTMLDivElement> & {
  value: number
  layout?: 'stacked' | 'inline'
  label?: string
}

export function LifePowerDisplay({
  value,
  layout = 'stacked',
  label = 'Life Power',
  className = '',
  ...props
}: LifePowerDisplayProps) {
  if (layout === 'inline') {
    return (
      <div
        className={[
          'flex h-12 items-center justify-center gap-2 text-center',
          className,
        ].filter(Boolean).join(' ')}
        aria-label={`${value} ${label}`}
        {...props}
      >
        <span className="text-[18px] leading-none text-brand-orange" aria-hidden="true">◆</span>
        <span className="text-h1 font-bold leading-[34px] text-brand-orange tabular-nums">{value}</span>
        <span className="text-caption leading-[18px] text-white/50">{label}</span>
      </div>
    )
  }

  return (
    <div
      className={[
        'flex h-12 flex-col items-center justify-center text-center',
        className,
      ].filter(Boolean).join(' ')}
      aria-label={`${value} ${label}`}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        <span className="text-[18px] leading-none text-brand-orange" aria-hidden="true">◆</span>
        <span className="text-h1 font-bold leading-[34px] text-brand-orange tabular-nums">{value}</span>
      </div>
      <span className="mt-1 text-[12px] leading-4 text-white/50">{label}</span>
    </div>
  )
}
