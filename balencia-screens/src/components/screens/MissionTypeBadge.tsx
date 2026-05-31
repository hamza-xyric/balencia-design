import type { HTMLAttributes } from 'react'
import type { MissionType } from '@/data/mock'

// bg binds the alpha-baked -subtle token (15%) to mirror the Figma DS
// color/mission/*-subtle fills — see X-012/X-014. Text + border stay full-tone.
const missionTypeClasses: Record<MissionType, string> = {
  life: 'bg-mission-gold-subtle text-mission-gold border-mission-gold/35',
  main: 'bg-mission-silver-subtle text-mission-silver border-mission-silver/35',
  side: 'bg-mission-bronze-subtle text-mission-bronze border-mission-bronze/35',
  weekly: 'bg-mission-steel-subtle text-mission-steel border-mission-steel/35',
  daily: 'bg-mission-sage-subtle text-mission-sage border-mission-sage/35',
  group: 'bg-mission-copper-subtle text-mission-copper border-mission-copper/35',
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
