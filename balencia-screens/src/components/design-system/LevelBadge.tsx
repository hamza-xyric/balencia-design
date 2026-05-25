import type { HTMLAttributes } from 'react'

type LevelBadgeProps = HTMLAttributes<HTMLDivElement> & {
  level: number
}

export function LevelBadge({ level, className = '', ...props }: LevelBadgeProps) {
  return (
    <div
      className={[
        'inline-flex h-6 items-center gap-1 rounded-pill border border-brand-orange bg-ink-brown-800 px-2.5 text-caption font-semibold leading-[18px] text-brand-orange shadow-1',
        className,
      ].filter(Boolean).join(' ')}
      aria-label={`Level ${level}, tap to view RPG character`}
      {...props}
    >
      <span aria-hidden="true">◆</span>
      <span>Lv {level}</span>
    </div>
  )
}
