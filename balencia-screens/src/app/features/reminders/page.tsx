import { Bell, Check, ChevronDown, Plus, TriangleAlert } from 'lucide-react'
import { Card } from '@/components/design-system/Card'
import { DomainTag } from '@/components/design-system/DomainTag'
import { ToggleSwitch } from '@/components/design-system/ToggleSwitch'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { remindersTasks } from '@/data/mock'

// Screen 61 of 78: Reminders & tasks
// Spec: /Users/hamza/yHealth/app_design 3/61-reminders-tasks.md

type TaskItem = (typeof remindersTasks.today)[number]

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 px-1 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">
      {children}
    </div>
  )
}

function TaskRow({ item, divider = false }: { item: TaskItem; divider?: boolean }) {
  return (
    <div className={['flex min-h-[68px] items-center gap-3 px-4 py-3', divider ? 'border-t border-white/[0.05]' : ''].join(' ')}>
      {item.priority === 'high' ? (
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-xs border border-stalled-amber bg-stalled-amber/15 text-stalled-amber">
          <TriangleAlert size={14} strokeWidth={2.4} />
        </span>
      ) : (
        <span className={['flex h-6 w-6 shrink-0 items-center justify-center rounded-xs border', item.done ? 'border-brand-orange bg-brand-orange text-white' : 'border-white/20 text-transparent'].join(' ')}>
          <Check size={14} strokeWidth={2.6} />
        </span>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className={['min-w-0 flex-1 truncate text-[15px] font-semibold leading-5', item.done ? 'text-white/45' : 'text-white'].join(' ')}>
            {item.title}
          </span>
          <span className="shrink-0 text-caption leading-[18px] text-white/50">{item.time}</span>
        </div>
        <div className="mt-1 flex min-w-0 items-center gap-2">
          <DomainTag domain={item.domain} showDot={false} className="shrink-0" />
          <span className="truncate text-small leading-[14px] text-white/35">{item.meta}</span>
        </div>
      </div>
    </div>
  )
}

function TaskSection({ title, items, delay }: { title: string; items: TaskItem[]; delay: number }) {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: `${delay}ms` }}>
      <SectionEyebrow>{title}</SectionEyebrow>
      <Card variant="small" className="rounded-xl p-0">
        {items.map((item, index) => <TaskRow key={item.title} item={item} divider={index > 0} />)}
      </Card>
    </section>
  )
}

function ReminderRows() {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '240ms' }}>
      <SectionEyebrow>Reminders</SectionEyebrow>
      <Card variant="small" className="rounded-xl p-0">
        {remindersTasks.reminders.map((item, index) => (
          <div key={item.title} className={['flex min-h-[64px] items-center gap-3 px-4 py-3', index > 0 ? 'border-t border-white/[0.05]' : ''].join(' ')}>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand-orange/10 text-brand-orange">
              <Bell size={17} strokeWidth={2.1} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[15px] font-semibold leading-5 text-white">{item.title}</div>
              <div className="mt-1 truncate text-caption leading-[18px] text-white/45">{item.cadence} - {item.next}</div>
            </div>
            <ToggleSwitch checked={item.on} aria-label={`Toggle ${item.title}`} />
          </div>
        ))}
      </Card>
    </section>
  )
}

function CompletedTasks() {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '320ms' }}>
      <div className="mb-3 flex items-center gap-2 px-1 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">
        <ChevronDown size={14} strokeWidth={2} className="text-white/40" />
        <span>Completed ({remindersTasks.completed.length})</span>
      </div>
      <Card variant="small" className="rounded-xl p-0">
        {remindersTasks.completed.map((item, index) => (
          <div key={item} className={['flex h-11 items-center gap-3 px-4', index > 0 ? 'border-t border-white/[0.05]' : ''].join(' ')}>
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-xs bg-brand-orange text-white">
              <Check size={12} strokeWidth={2.5} />
            </span>
            <span className="min-w-0 flex-1 truncate text-caption leading-[18px] text-white/45">{item}</span>
            <span className="text-small leading-[14px] text-white/30">Done</span>
          </div>
        ))}
      </Card>
    </section>
  )
}

function SmartSuggestion() {
  return (
    <Card className="mt-6 animate-fade-up" style={{ animationDelay: '400ms' }}>
      <div className="flex items-start gap-3">
        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-royal-purple" />
        <div className="min-w-0">
          <div className="text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">SIA suggests</div>
          <p className="mt-2 text-[15px] leading-[22px] text-white/80">{remindersTasks.suggestion}</p>
          <div className="mt-4 flex gap-2">
            <button type="button" className="h-9 rounded-pill bg-brand-orange px-4 text-caption font-semibold leading-[18px] text-white">Add as task</button>
            <button type="button" className="h-9 rounded-pill border border-royal-purple/25 bg-royal-purple/10 px-4 text-caption font-semibold leading-[18px] text-royal-purple">Ask SIA</button>
          </div>
        </div>
      </div>
    </Card>
  )
}

function AddFab() {
  return (
    <button type="button" className="ml-auto flex h-[48px] items-center justify-center gap-2 rounded-pill bg-brand-orange px-5 text-[15px] font-semibold leading-5 text-white shadow-2 shadow-brand-orange/30">
      <Plus size={16} strokeWidth={2.4} />
      Add
    </button>
  )
}

export default function RemindersScreen() {
  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Reminders & tasks" showBack />} activeTab="today" bottomAction={<AddFab />}>
        <main className="px-4 pb-6 pt-4">
          <TaskSection title="Today" items={remindersTasks.today} delay={0} />
          <TaskSection title="Tomorrow" items={remindersTasks.tomorrow} delay={80} />
          <TaskSection title="This week" items={remindersTasks.week} delay={160} />
          <ReminderRows />
          <CompletedTasks />
          <SmartSuggestion />
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
