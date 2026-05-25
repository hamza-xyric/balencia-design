import { Check, ChevronLeft, ChevronRight, Cloud, Plus } from 'lucide-react'
import { Card } from '@/components/design-system/Card'
import { DomainTag } from '@/components/design-system/DomainTag'
import { FAB } from '@/components/design-system/FAB'
import { SegmentedControl } from '@/components/design-system/SegmentedControl'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { ScheduleCalendarGrid } from '@/components/screens/ScheduleCalendarGrid'
import { schedule, scheduleUnscheduled } from '@/data/mock'

// Screen 41 of 78: Schedule / calendar
// Spec: /Users/hamza/yHealth/app_design 3/41-schedule-calendar.md

function HeaderActions() {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        className="flex h-11 w-11 items-center justify-center rounded-full text-white/40 transition-colors duration-[var(--dur-fast)] active:bg-white/[0.05]"
        aria-label="Calendar synced"
      >
        <Cloud size={16} strokeWidth={2.2} />
      </button>
      <button
        type="button"
        className="flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors duration-[var(--dur-fast)] active:bg-white/[0.05]"
        aria-label="Add schedule item"
      >
        <Plus size={20} strokeWidth={2.2} />
      </button>
    </div>
  )
}

function DateNavigator() {
  return (
    <div className="mt-3 flex h-10 items-center justify-between animate-fade-up" style={{ animationDelay: '80ms' }}>
      <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full text-white/60">
        <ChevronLeft size={20} strokeWidth={2.2} />
      </button>
      <div className="flex flex-col items-center">
        <div className="text-body font-semibold leading-[22px] text-white">Tue, May 20, 2026</div>
        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-orange" aria-hidden="true" />
      </div>
      <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full text-white/60">
        <ChevronRight size={20} strokeWidth={2.2} />
      </button>
    </div>
  )
}

function UnscheduledTasks() {
  return (
    <section className="mt-3 animate-fade-up" style={{ animationDelay: '160ms' }}>
      <div className="border-t border-white/[0.08] pt-3">
        <div className="mb-2 flex items-center justify-between px-1">
          <h2 className="text-caption font-semibold leading-[18px] text-white/60">Unscheduled ({scheduleUnscheduled.length})</h2>
          <span className="text-small leading-[14px] text-white/30">Drag into day</span>
        </div>
        <Card variant="small" className="rounded-md p-0">
          {scheduleUnscheduled.map((task, index) => (
            <div
              key={task.id}
              className={[
                'flex min-h-11 items-center gap-3 px-4 py-2.5',
                index > 0 ? 'border-t border-white/[0.05]' : '',
              ].filter(Boolean).join(' ')}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-xs border border-white/20 text-transparent">
                <Check size={12} strokeWidth={2.6} />
              </span>
              <span className="min-w-0 flex-1 truncate text-[15px] leading-5 text-white">{task.name}</span>
              <DomainTag domain={task.domain} showDot={false} className="shrink-0" />
            </div>
          ))}
        </Card>
      </div>
    </section>
  )
}

export default function ScheduleScreen() {
  return (
    <PhoneFrame>
      <ScreenShell
        header={<Header title="Schedule" showBack rightAction={<HeaderActions />} />}
        activeTab="today"
        bottomAction={<FAB label="Add schedule item" icon={<Plus size={24} strokeWidth={2.2} />} />}
      >
        <main className="px-4 pb-6 pt-2">
          <SegmentedControl
            options={[
              { label: 'Day', value: 'day' },
              { label: 'Week', value: 'week' },
              { label: 'Month', value: 'month' },
            ]}
            activeValue="day"
            className="animate-fade-up"
            size="md"
          />

          <DateNavigator />
          <UnscheduledTasks />
          <ScheduleCalendarGrid events={schedule} className="mt-5" />
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
