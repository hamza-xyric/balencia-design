import type { HTMLAttributes } from 'react'
import { Flame, Pin } from 'lucide-react'
import { DomainTag } from '@/components/design-system/DomainTag'
import type { Mission } from '@/data/mock'
import { ChainProgressBar } from './ChainProgressBar'
import { MissionTypeBadge } from './MissionTypeBadge'
import { ProgressRing } from './ProgressRing'

type MissionCardProps = HTMLAttributes<HTMLDivElement> & {
  mission: Mission
}

export function MissionCard({ mission, className = '', ...props }: MissionCardProps) {
  const domains = mission.domains ?? [mission.domain]
  const difficulty = mission.difficulty ?? 'easy'
  const difficultyClass = {
    easy: 'bg-forest-green',
    moderate: 'bg-brand-orange',
    hard: 'bg-error-red',
  }[difficulty]

  return (
    <article
      className={[
        'relative rounded-xl border border-white/[0.06] bg-ink-brown-800 p-6 shadow-1 transition-transform duration-[var(--dur-fast)] active:scale-[0.98]',
        mission.status === 'completed' ? 'opacity-70' : '',
        mission.status === 'paused' ? 'opacity-60' : '',
        className,
      ].filter(Boolean).join(' ')}
      aria-label={`${mission.name}, ${Math.round(mission.progress * 100)}% complete, tap to view details`}
      {...props}
    >
      {mission.pinned && (
        <Pin size={12} className="absolute right-4 top-4 text-white/30" fill="currentColor" strokeWidth={1.6} />
      )}
      <div className="flex gap-3">
        <div className="flex w-16 shrink-0 items-center justify-center">
          <ProgressRing progress={mission.progress} size={36} />
        </div>
        <div className="min-w-0 flex-1 pr-2">
          <h2 className="text-body font-semibold leading-[22px] text-white">
            {mission.name}
          </h2>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <MissionTypeBadge type={mission.type} />
            {domains.map((domain) => (
              <DomainTag key={domain} domain={domain} />
            ))}
          </div>
          <p className="mt-2 truncate text-caption leading-[18px] text-white/70">
            Next: {mission.nextAction}
          </p>
          <p className="mt-1 truncate text-caption leading-[18px] text-white/50">
            {mission.siaNote}
          </p>
          <div className="mt-2 flex items-center gap-3 text-small font-semibold leading-[14px]">
            <span className="text-brand-orange">⚡ {mission.xp} XP</span>
            {mission.status === 'completed' ? (
              <span className="text-forest-green">Completed</span>
            ) : (
              <span className="inline-flex items-center gap-1 text-white/60">
                <Flame size={12} className="text-white/40" strokeWidth={1.8} />
                {mission.streak}d
              </span>
            )}
            <span className={`h-2 w-2 rounded-full ${difficultyClass}`} aria-label={`${difficulty} difficulty`} />
          </div>
          {mission.chainPosition && (
            <ChainProgressBar
              className="mt-3"
              current={mission.chainPosition.current}
              total={mission.chainPosition.total}
            />
          )}
        </div>
      </div>
    </article>
  )
}
