import { Cloud, Sparkles } from 'lucide-react'
import { DomainTag } from '@/components/design-system/DomainTag'
import { domainToneClasses } from '@/components/design-system/Chip'
import type { ScheduleEvent } from '@/data/mock'

type ScheduleCalendarGridProps = {
  events: ScheduleEvent[]
  className?: string
}

const hours = [
  { label: '6 AM', hour: 6 },
  { label: '7 AM', hour: 7 },
  { label: '8 AM', hour: 8 },
  { label: '9 AM', hour: 9 },
  { label: '10 AM', hour: 10 },
  { label: '11 AM', hour: 11 },
  { label: '12 PM', hour: 12 },
  { label: '1 PM', hour: 13 },
  { label: '2 PM', hour: 14 },
  { label: '3 PM', hour: 15 },
  { label: '4 PM', hour: 16 },
  { label: '5 PM', hour: 17 },
  { label: '6 PM', hour: 18 },
  { label: '7 PM', hour: 19 },
]

const hourHeight = 64
const firstHour = 6

function EventCard({ event }: { event: ScheduleEvent }) {
  const tone = domainToneClasses[event.domain]
  const top = (((event.startHour ?? firstHour) - firstHour) * hourHeight) + (((event.startMinute ?? 0) / 60) * hourHeight) + 8
  const height = Math.max(48, ((event.durationMinutes ?? 45) / 60) * hourHeight - 8)
  const isSia = event.source === 'sia' || event.isSIASuggested

  return (
    <article
      className={[
        'absolute left-[56px] right-0 overflow-hidden rounded-md px-3 py-2 shadow-1',
        isSia
          ? 'border border-dashed border-brand-orange/40 bg-ink-900'
          : 'border border-white/10 bg-ink-brown-800',
      ].join(' ')}
      style={{ top, height }}
    >
      {!isSia && <span className={`absolute bottom-0 left-0 top-0 w-1 ${tone.bar}`} aria-hidden="true" />}
      <div className="flex min-w-0 items-start justify-between gap-2 pl-1">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            {isSia && <span className="h-2 w-2 shrink-0 rounded-full bg-royal-purple" aria-hidden="true" />}
            <h2 className="truncate text-[15px] font-semibold leading-5 text-white">{event.name}</h2>
          </div>
          <div className="mt-0.5 text-[12px] leading-4 text-white/50">
            {event.time}{event.endTime ? ` - ${event.endTime}` : ''}
          </div>
        </div>
        <DomainTag domain={event.domain} showDot={false} className="mt-0.5 shrink-0" />
      </div>
      <div className="mt-1 flex items-center gap-1.5 pl-1 text-[11px] font-semibold uppercase leading-4 tracking-[0.12em] text-white/35">
        {isSia ? <Sparkles size={12} className="text-royal-purple" /> : <Cloud size={12} />}
        <span>{isSia ? 'SIA suggested' : event.source === 'synced' ? 'Synced' : 'Manual'}</span>
      </div>
    </article>
  )
}

export function ScheduleCalendarGrid({ events, className = '' }: ScheduleCalendarGridProps) {
  return (
    <section
      className={[
        'relative min-h-[896px] pr-4 animate-fade-up',
        className,
      ].filter(Boolean).join(' ')}
      style={{ animationDelay: '240ms' }}
      aria-label="Day schedule"
    >
      {hours.map((slot) => (
        <div key={slot.hour} className="relative h-16">
          <div className="flex items-start gap-3">
            <span className="w-11 shrink-0 pt-0.5 text-[13px] leading-[18px] text-white/30">{slot.label}</span>
            <span className="mt-2 h-px flex-1 bg-white/[0.05]" aria-hidden="true" />
          </div>
        </div>
      ))}

      <div
        className="absolute left-[46px] right-4 z-10 flex items-center"
        style={{ top: 286 }}
        aria-label="Current time"
      >
        <span className="h-2 w-2 shrink-0 rounded-full bg-brand-orange" aria-hidden="true" />
        <span className="h-0.5 flex-1 rounded-pill bg-brand-orange" aria-hidden="true" />
      </div>

      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </section>
  )
}
