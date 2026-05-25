import type { HTMLAttributes } from 'react'
import type { MissionType } from '@/data/mock'

const missionTypeClasses: Record<MissionType, string> = {
  life: 'bg-mission-gold/20 text-mission-gold border-mission-gold/35',
  main: 'bg-mission-silver/20 text-mission-silver border-mission-silver/35',
  side: 'bg-mission-bronze/20 text-mission-bronze border-mission-bronze/35',
  weekly: 'bg-mission-steel/20 text-mission-steel border-mission-steel/35',
  daily: 'bg-mission-sage/20 text-mission-sage border-mission-sage/35',
  group: 'bg-mission-copper/20 text-mission-copper border-mission-copper/35',
}

const missionTypeLabels: Record<MissionType, string> = {
  life: 'Life',
  main: 'Main',
  side: 'Side',
  weekly: 'Weekly',
  daily: 'Daily',
  group: 'Group',
}

type MissionTypeBadgeProps = HTMLAttributes<HTMLDivElement> & {
  type: MissionType
}

export function MissionTypeBadge({ type, className = '', ...props }: MissionTypeBadgeProps) {
  return (
    <div
      className={[
        'inline-flex h-6 items-center rounded-pill border px-2.5 text-small font-semibold leading-[14px]',
        missionTypeClasses[type],
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {missionTypeLabels[type]}
    </div>
  )
}
