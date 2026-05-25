import type { HTMLAttributes } from 'react'
import { DomainTag } from '@/components/design-system/DomainTag'
import type { DomainKey } from '@/data/domains'

type LeaderboardRowProps = HTMLAttributes<HTMLDivElement> & {
  rank: number
  name: string
  avatar: string
  level: number
  xp: number
  topDomain: DomainKey
  withDivider?: boolean
  isOwn?: boolean
}

function rankClass(rank: number) {
  if (rank === 1) return 'text-podium-gold'
  if (rank === 2) return 'text-podium-silver'
  if (rank === 3) return 'text-podium-bronze'
  return 'text-white'
}

export function LeaderboardRow({
  rank,
  name,
  avatar,
  level,
  xp,
  topDomain,
  withDivider = false,
  isOwn = false,
  className = '',
  ...props
}: LeaderboardRowProps) {
  return (
    <article
      className={[
        'relative flex min-h-[72px] items-center gap-3 px-4 py-3 transition-colors duration-[var(--dur-fast)] active:bg-white/[0.05]',
        withDivider ? 'border-t border-white/[0.05]' : '',
        isOwn ? 'before:absolute before:left-0 before:top-3 before:h-12 before:w-1 before:rounded-r-pill before:bg-brand-orange' : '',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      <div className={`w-9 shrink-0 text-[17px] font-bold leading-[22px] tabular-nums ${rankClass(rank)}`}>
        #{rank}
      </div>
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-pill bg-white/[0.08] text-[14px] font-semibold text-white">
        {avatar}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h2 className="truncate text-[15px] font-semibold leading-5 text-white">{name}</h2>
          <span className="shrink-0 rounded-pill border border-white/20 bg-ink-900 px-2 py-1 text-small font-semibold leading-[14px] text-white">
            Lv. {level}
          </span>
        </div>
        <div className="mt-1 flex min-w-0 items-center gap-2">
          <span className="shrink-0 text-caption leading-[18px] text-white/50 tabular-nums">
            {xp.toLocaleString()} XP
          </span>
          <DomainTag domain={topDomain} showDot={false} className="max-w-[112px] shrink-0" />
        </div>
      </div>
    </article>
  )
}
