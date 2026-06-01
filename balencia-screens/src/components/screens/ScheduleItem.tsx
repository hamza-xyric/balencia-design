import type { HTMLAttributes } from 'react'
import { DomainTag } from '@/components/design-system/DomainTag'
import type { ScheduleEvent } from '@/data/mock'

type ScheduleItemProps = HTMLAttributes<HTMLDivElement> & {
  event: ScheduleEvent
}

export function ScheduleItem({ event, className = '', ...props }: ScheduleItemProps) {
  return (
    <div
      className={[
        'flex min-h-11 items-center gap-3 border-b border-alpha-white-05 py-3 last:border-b-0',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      <span className="w-14 shrink-0 text-caption font-semibold leading-[18px] text-brand-orange">
        {event.time}
      </span>
      <span className="min-w-0 flex-1 truncate text-[15px] leading-5 text-white">
        {event.name}
      </span>
      <DomainTag domain={event.domain} showDot={false} className="shrink-0" />
    </div>
  )
}
