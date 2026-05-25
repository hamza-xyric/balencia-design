import type { HTMLAttributes } from 'react'
import { domainToneClasses } from '@/components/design-system/Chip'
import { domains } from '@/data/domains'
import type { DomainStat } from '@/data/mock'

type DomainSkillCardProps = HTMLAttributes<HTMLDivElement> & {
  stat: DomainStat
}

export function DomainSkillCard({ stat, className = '', ...props }: DomainSkillCardProps) {
  const tone = domainToneClasses[stat.domain]
  const progress = stat.nextLevelXP > 0 ? Math.max(0, Math.min(stat.currentXP / stat.nextLevelXP, 1)) : 0

  return (
    <div
      className={[
        'flex h-[78px] min-w-0 flex-col rounded-md border border-white/[0.06] bg-ink-brown-800 p-2.5 shadow-1 transition-transform duration-[var(--dur-fast)] active:scale-95',
        className,
      ].filter(Boolean).join(' ')}
      aria-label={`${domains[stat.domain].label}, stat score ${stat.stat}, level ${stat.level}`}
      {...props}
    >
      <div className="flex min-w-0 items-center gap-1.5">
        <span className={`h-2 w-2 shrink-0 rounded-full ${tone.dot}`} aria-hidden="true" />
        <span className="min-w-0 truncate text-[11px] leading-[14px] text-white/50">
          {domains[stat.domain].label}
        </span>
      </div>
      <div className="mt-1 text-center text-[24px] font-bold leading-[28px] text-white tabular-nums">
        {stat.stat}
      </div>
      <div className="text-center text-[12px] font-semibold leading-4 text-white/60 tabular-nums">
        Lv.{stat.level}
      </div>
      <div className="mt-auto h-[3px] overflow-hidden rounded-pill bg-white/[0.08]">
        <div className={`h-full rounded-pill ${tone.bar}`} style={{ width: `${progress * 100}%` }} />
      </div>
    </div>
  )
}
