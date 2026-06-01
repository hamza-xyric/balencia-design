'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, ChevronLeft, ChevronRight, Cloud, Plus } from 'lucide-react'
import { Card } from '@/components/design-system/Card'
import { DomainTag } from '@/components/design-system/DomainTag'
import { FAB } from '@/components/design-system/FAB'
import { SegmentedControl } from '@/components/design-system/SegmentedControl'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { ScheduleCalendarGrid } from '@/components/screens/ScheduleCalendarGrid'
import { schedule, scheduleUnscheduled, type ScheduleEvent } from '@/data/mock'
import { domainDashboardRoutes } from '@/data/domains'

// Screen 41 of 78: Schedule / calendar
// Spec: /Users/hamza/yHealth/app_design 3/41-schedule-calendar.md

const baseDate = new Date(2026, 4, 20)

function getDateFromOffset(offset: number) {
  const date = new Date(baseDate)
  date.setDate(baseDate.getDate() + offset)
  return date
}

function formatDayLabel(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

function formatMonthLabel(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(date)
}

function formatWeekRange(date: Date) {
  const start = new Date(date)
  const mondayOffset = (start.getDay() + 6) % 7
  start.setDate(start.getDate() - mondayOffset)
  const end = new Date(start)
  end.setDate(start.getDate() + 6)

  const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'short' })
  return `${monthFormatter.format(start)} ${start.getDate()} - ${monthFormatter.format(end)} ${end.getDate()}, ${end.getFullYear()}`
}

function HeaderActions({ onAdd, onSync }: { onAdd: () => void; onSync: () => void }) {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={onSync}
        className="flex h-11 w-11 items-center justify-center rounded-full text-white/40 transition-colors duration-[var(--dur-fast)] active:bg-white/[0.05]"
        aria-label="Calendar synced 2 minutes ago. Open connected services"
      >
        <Cloud size={16} strokeWidth={2.2} />
      </button>
      <button
        type="button"
        onClick={onAdd}
        className="flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors duration-[var(--dur-fast)] active:bg-white/[0.05]"
        aria-label="Add schedule item from header"
      >
        <Plus size={20} strokeWidth={2.2} />
      </button>
    </div>
  )
}

function DateNavigator({ offset, view, onMove }: { offset: number; view: string; onMove: (step: number) => void }) {
  const selectedDate = getDateFromOffset(offset)
  const label = view === 'week' ? formatWeekRange(selectedDate) : view === 'month' ? formatMonthLabel(selectedDate) : formatDayLabel(selectedDate)
  const previousLabel = view === 'week' ? 'Previous week' : view === 'month' ? 'Previous month' : 'Previous day'
  const nextLabel = view === 'week' ? 'Next week' : view === 'month' ? 'Next month' : 'Next day'

  return (
    <div className="mt-3 flex h-10 items-center justify-between animate-fade-up" style={{ animationDelay: '80ms' }}>
      <button type="button" onClick={() => onMove(-1)} className="flex h-11 w-11 items-center justify-center rounded-full text-white/60" aria-label={previousLabel}>
        <ChevronLeft size={20} strokeWidth={2.2} />
      </button>
      <div className="flex flex-col items-center">
        <div className="text-body font-semibold leading-[22px] text-white">{label}</div>
        {offset === 0 && <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-orange" aria-hidden="true" />}
      </div>
      <button type="button" onClick={() => onMove(1)} className="flex h-11 w-11 items-center justify-center rounded-full text-white/60" aria-label={nextLabel}>
        <ChevronRight size={20} strokeWidth={2.2} />
      </button>
    </div>
  )
}

function UnscheduledTasks({
  tasks,
  onSchedule,
}: {
  tasks: typeof scheduleUnscheduled
  onSchedule: (id: string) => void
}) {
  return (
    <section className="mt-3 animate-fade-up" style={{ animationDelay: '160ms' }}>
      <div className="border-t border-white/[0.08] pt-3">
        <div className="mb-2 flex items-center justify-between px-1">
          <h2 className="text-caption font-semibold leading-[18px] text-white/60">Unscheduled ({tasks.length})</h2>
          <span className="text-small leading-[14px] text-white/30">Tap to place</span>
        </div>
        <Card variant="small" className="rounded-md p-0">
          {tasks.length === 0 && (
            <div className="px-4 py-3 text-caption leading-[18px] text-white/45">
              All loose tasks are scheduled for today.
            </div>
          )}
          {tasks.map((task, index) => (
            <button
              key={task.id}
              type="button"
              onClick={() => onSchedule(task.id)}
              className={[
                'flex min-h-11 w-full items-center gap-3 px-4 py-2.5 text-left',
                index > 0 ? 'border-t border-white/[0.05]' : '',
              ].filter(Boolean).join(' ')}
              aria-label={`Schedule task ${task.name}`}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-xs border border-white/20 text-transparent">
                <Check size={12} strokeWidth={2.6} />
              </span>
              <span className="min-w-0 flex-1 truncate text-[15px] leading-5 text-white">{task.name}</span>
              <DomainTag domain={task.domain} showDot={false} className="shrink-0" />
            </button>
          ))}
        </Card>
      </div>
    </section>
  )
}

function WeekView({
  selectedDate,
  events,
  onSelectDate,
  onOpenEvent,
}: {
  selectedDate: Date
  events: ScheduleEvent[]
  onSelectDate: (date: Date) => void
  onOpenEvent: (event: ScheduleEvent) => void
}) {
  const weekDays = useMemo(() => {
    const start = new Date(selectedDate)
    const mondayOffset = (start.getDay() + 6) % 7
    start.setDate(start.getDate() - mondayOffset)

    return Array.from({ length: 7 }).map((_, index) => {
      const day = new Date(start)
      day.setDate(start.getDate() + index)
      return day
    })
  }, [selectedDate])

  return (
    <section className="mt-5 animate-fade-up" style={{ animationDelay: '240ms' }}>
      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((day) => {
          const selected = day.toDateString() === selectedDate.toDateString()
          const offsetFromBase = Math.round((day.getTime() - baseDate.getTime()) / 86400000)

          return (
            <button
              key={day.toISOString()}
              type="button"
              onClick={() => onSelectDate(getDateFromOffset(offsetFromBase))}
              className={[
                'flex min-h-14 flex-col items-center justify-center rounded-md border text-center transition-colors duration-[var(--dur-fast)]',
                selected ? 'border-brand-orange/40 bg-brand-orange text-white' : 'border-white/[0.06] bg-ink-brown-800 text-white/55',
              ].join(' ')}
              aria-pressed={selected}
              aria-label={`Select ${formatDayLabel(day)}`}
            >
              <span className="text-[11px] font-semibold uppercase leading-3">{day.toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 1)}</span>
              <span className="mt-1 text-[15px] font-semibold leading-5">{day.getDate()}</span>
            </button>
          )
        })}
      </div>

      <Card className="mt-4 rounded-xl p-0">
        {events.map((event, index) => (
          <button
            key={event.id}
            type="button"
            onClick={() => onOpenEvent(event)}
            className={[
              'flex min-h-12 w-full items-center gap-3 px-4 py-2 text-left',
              index > 0 ? 'border-t border-white/[0.05]' : '',
            ].filter(Boolean).join(' ')}
            aria-label={`Open ${event.name}`}
          >
            <span className="w-[58px] shrink-0 text-caption font-semibold leading-[18px] text-brand-orange">{event.time}</span>
            <span className="min-w-0 flex-1 truncate text-[15px] leading-5 text-white">{event.name}</span>
            <DomainTag domain={event.domain} showDot={false} className="shrink-0" />
          </button>
        ))}
      </Card>
    </section>
  )
}

function MonthView({
  selectedDate,
  events,
  onSelectDate,
}: {
  selectedDate: Date
  events: ScheduleEvent[]
  onSelectDate: (date: Date) => void
}) {
  const monthDays = useMemo(() => {
    const year = selectedDate.getFullYear()
    const month = selectedDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const leadingBlanks = (firstDay.getDay() + 6) % 7
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    return [
      ...Array.from({ length: leadingBlanks }).map(() => null),
      ...Array.from({ length: daysInMonth }).map((_, index) => new Date(year, month, index + 1)),
    ]
  }, [selectedDate])

  return (
    <section className="mt-5 animate-fade-up" style={{ animationDelay: '240ms' }}>
      <div className="grid grid-cols-7 gap-1 text-center text-small font-semibold uppercase leading-[14px] text-white/45">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
          <span key={`${day}-${index}`}>{day}</span>
        ))}
      </div>

      <div className="mt-2 grid grid-cols-7 gap-1">
        {monthDays.map((day, index) => {
          if (!day) return <span key={`blank-${index}`} className="min-h-11" />
          const selected = day.toDateString() === selectedDate.toDateString()
          const isDemoDay = day.getDate() === 20 && day.getMonth() === 4 && day.getFullYear() === 2026

          return (
            <button
              key={day.toISOString()}
              type="button"
              onClick={() => onSelectDate(day)}
              className={[
                'flex min-h-11 flex-col items-center justify-center rounded-md border text-[14px] font-semibold leading-5 transition-colors duration-[var(--dur-fast)]',
                selected ? 'border-brand-orange bg-brand-orange text-white' : 'border-white/[0.05] bg-ink-brown-800 text-white/60',
              ].join(' ')}
              aria-pressed={selected}
              aria-label={`Select ${formatDayLabel(day)}`}
            >
              {day.getDate()}
              {isDemoDay && (
                <span className="mt-0.5 flex gap-0.5" aria-hidden="true">
                  <span className="h-1 w-1 rounded-full bg-domain-fitness" />
                  <span className="h-1 w-1 rounded-full bg-domain-career" />
                  <span className="h-1 w-1 rounded-full bg-domain-meditation" />
                </span>
              )}
            </button>
          )
        })}
      </div>

      <Card className="mt-4 rounded-xl p-0">
        <div className="px-4 py-3">
          <p className="text-[15px] font-semibold leading-5 text-white">{formatDayLabel(selectedDate)} - {events.length} events</p>
          <p className="mt-1 text-caption leading-[18px] text-white/45">Tap day view for the full timeline.</p>
        </div>
        {events.slice(0, 3).map((event) => (
          <div key={event.id} className="flex min-h-11 items-center gap-3 border-t border-white/[0.05] px-4 py-2">
            <span className="w-[58px] shrink-0 text-caption font-semibold leading-[18px] text-brand-orange">{event.time}</span>
            <span className="min-w-0 flex-1 truncate text-[15px] leading-5 text-white">{event.name}</span>
            <DomainTag domain={event.domain} showDot={false} className="shrink-0" />
          </div>
        ))}
      </Card>
    </section>
  )
}

export default function ScheduleScreen() {
  const router = useRouter()
  const [view, setView] = useState('day')
  const [dateOffset, setDateOffset] = useState(0)
  const [showAdd, setShowAdd] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null)
  const [newTitle, setNewTitle] = useState('')
  const [newEvents, setNewEvents] = useState<ScheduleEvent[]>([])
  const [scheduledTaskIds, setScheduledTaskIds] = useState<string[]>([])
  const [toast, setToast] = useState('')
  const selectedDate = getDateFromOffset(dateOffset)
  const allEvents = [...schedule, ...newEvents]
  const isDemoDay = dateOffset === 0
  const dateEvents = isDemoDay ? allEvents : newEvents.filter((event) => event.id.startsWith(`manual-`))
  const visibleUnscheduled = scheduleUnscheduled.filter((task) => !scheduledTaskIds.includes(task.id))

  const addEvent = () => {
    if (!newTitle.trim()) return
    setNewEvents((current) => [
      ...current,
      {
        id: `manual-${Date.now()}`,
        time: '4:00 PM',
        endTime: '4:30 PM',
        name: newTitle.trim(),
        domain: 'wellbeing',
        isSIASuggested: false,
        source: 'manual',
        startHour: 16,
        startMinute: 0,
        durationMinutes: 30,
      },
    ])
    setNewTitle('')
    setShowAdd(false)
    setToast('Added to your schedule.')
    window.setTimeout(() => setToast(''), 2000)
  }

  const placeTask = (id: string) => {
    if (scheduledTaskIds.includes(id)) return
    const task = scheduleUnscheduled.find((item) => item.id === id)
    if (!task) return
    setScheduledTaskIds((current) => [...current, id])
    setNewEvents((current) => [
      ...current,
      {
        id: `task-${id}`,
        time: '3:30 PM',
        endTime: '3:50 PM',
        name: task.name,
        domain: task.domain,
        isSIASuggested: false,
        source: 'manual',
        startHour: 15,
        startMinute: 30,
        durationMinutes: 20,
        xp: task.xp,
      },
    ])
    setToast(`${task.name} placed at 3:30 PM.`)
    window.setTimeout(() => setToast(''), 2000)
  }

  const moveDate = (step: number) => {
    const delta = view === 'week' ? step * 7 : view === 'month' ? step * 31 : step
    setDateOffset((current) => current + delta)
  }

  const selectDate = (date: Date) => {
    setDateOffset(Math.round((date.getTime() - baseDate.getTime()) / 86400000))
  }

  return (
    <PhoneFrame>
      <ScreenShell
        header={<Header title="Schedule" showBack rightAction={<HeaderActions onAdd={() => setShowAdd(true)} onSync={() => router.push('/tabs/me/connected-services')} />} />}
        activeTab="today"
        bottomAction={<FAB label="Add schedule item with floating button" icon={<Plus size={24} strokeWidth={2.2} />} onClick={() => setShowAdd(true)} />}
      >
        <main className="px-4 pb-6 pt-2">
          <SegmentedControl
            options={[
              { label: 'Day', value: 'day' },
              { label: 'Week', value: 'week' },
              { label: 'Month', value: 'month' },
            ]}
            activeValue={view}
            onValueChange={setView}
            className="animate-fade-up"
            size="md"
          />

          <DateNavigator offset={dateOffset} view={view} onMove={moveDate} />
          {toast && <div className="mt-3 rounded-md bg-forest-green/10 px-3 py-2 text-caption font-semibold text-forest-green" role="status">{toast}</div>}
          <UnscheduledTasks tasks={visibleUnscheduled} onSchedule={placeTask} />
          {dateEvents.length === 0 && view === 'day' && (
            <div className="mt-5 rounded-xl border border-white/[0.06] bg-ink-brown-800 p-5 text-center animate-fade-up">
              <p className="text-[15px] font-semibold leading-5 text-white/60">No events on this day</p>
              <p className="mt-1 text-caption leading-[18px] text-white/35">Tap + to add something, or navigate back to May 20 for the demo schedule.</p>
            </div>
          )}
          {view === 'day' ? (
            <ScheduleCalendarGrid events={dateEvents} className="mt-5" onEventSelect={setSelectedEvent} />
          ) : view === 'week' ? (
            <WeekView selectedDate={selectedDate} events={dateEvents} onSelectDate={selectDate} onOpenEvent={setSelectedEvent} />
          ) : (
            <MonthView selectedDate={selectedDate} events={dateEvents} onSelectDate={selectDate} />
          )}
        </main>

        {showAdd && (
          <div className="absolute inset-0 z-40 flex items-end bg-black/55 p-4" role="dialog" aria-modal="true" aria-label="Add event">
            <div className="w-full rounded-xl border border-white/[0.08] bg-ink-brown-800 p-5 shadow-3">
              <h2 className="text-h3 font-semibold text-white">Add event</h2>
              <label htmlFor="event-title" className="mt-4 block text-caption font-semibold text-white/60">Title</label>
              <input
                id="event-title"
                value={newTitle}
                onChange={(event) => setNewTitle(event.target.value)}
                placeholder="For example, Stretch break"
                className="mt-2 h-[52px] w-full rounded-md border border-white/10 bg-ink-900 px-4 text-body text-white outline-none placeholder:text-white/35 focus:border-brand-orange"
              />
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button type="button" onClick={() => setShowAdd(false)} className="h-12 rounded-pill border border-white/[0.08] text-[15px] font-semibold text-white/60">Cancel</button>
                <button type="button" onClick={addEvent} disabled={!newTitle.trim()} className="h-12 rounded-pill bg-brand-orange text-[15px] font-semibold text-white disabled:opacity-40">Create</button>
              </div>
            </div>
          </div>
        )}
        {selectedEvent && (
          <div className="absolute inset-0 z-40 flex items-end bg-black/55 p-4" role="dialog" aria-modal="true" aria-label={`${selectedEvent.name} schedule details`}>
            <div className="w-full rounded-xl border border-white/[0.08] bg-ink-brown-800 p-5 shadow-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-h3 font-semibold text-white">{selectedEvent.name}</h2>
                  <p className="mt-1 text-caption leading-[18px] text-white/50">
                    {selectedEvent.time}{selectedEvent.endTime ? ` - ${selectedEvent.endTime}` : ''} on {formatDayLabel(selectedDate)}
                  </p>
                </div>
                <DomainTag domain={selectedEvent.domain} showDot={false} />
              </div>
              <div className="mt-4 rounded-md bg-ink-900 p-3 text-caption leading-[18px] text-white/55">
                Source: {selectedEvent.source === 'sia' || selectedEvent.isSIASuggested ? 'SIA suggestion' : selectedEvent.source === 'synced' ? 'Synced calendar' : 'Manual schedule item'}. Quick actions are available in this prototype state.
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setToast(`${selectedEvent.name} marked done.`)
                    setSelectedEvent(null)
                    window.setTimeout(() => setToast(''), 2000)
                  }}
                  className="h-12 rounded-pill bg-forest-green text-[15px] font-semibold text-white"
                >
                  Mark done
                </button>
                <button
                  type="button"
                  onClick={() => router.push(domainDashboardRoutes[selectedEvent.domain])}
                  className="h-12 rounded-pill border border-white/[0.08] text-[15px] font-semibold text-brand-orange"
                >
                  Open domain
                </button>
              </div>
              <button type="button" onClick={() => setSelectedEvent(null)} className="mt-3 h-11 w-full rounded-pill text-[15px] font-semibold text-white/60">Close</button>
            </div>
          </div>
        )}
      </ScreenShell>
    </PhoneFrame>
  )
}
