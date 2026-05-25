import type { HTMLAttributes } from 'react'

type XPBarProps = HTMLAttributes<HTMLDivElement> & {
  current: number
  total: number
  label?: string
}

export function XPBar({ current, total, label, className = '', ...props }: XPBarProps) {
  const progress = total > 0 ? Math.max(0, Math.min(current / total, 1)) : 0

  return (
    <div className={className} {...props}>
      {label && (
        <div className="mb-2 flex items-center justify-between text-small font-semibold leading-[14px] text-white/50">
          <span>{label}</span>
          <span>{current.toLocaleString()} / {total.toLocaleString()} XP</span>
        </div>
      )}
      <div className="h-2 overflow-hidden rounded-pill bg-white/[0.08]">
        <div
          className="h-full rounded-pill bg-brand-orange"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  )
}
