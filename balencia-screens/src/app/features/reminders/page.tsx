'use client'

import { useState } from 'react'
import { Bell, Check, ChevronDown, Plus, TriangleAlert } from 'lucide-react'
import { Card } from '@/components/design-system/Card'
import { DomainTag } from '@/components/design-system/DomainTag'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { remindersTasks } from '@/data/mock'

// Screen 61 of 78: Reminders & tasks
// Spec: /Users/hamza/yHealth/app_design 3/61-reminders-tasks.md

type TaskItem = (typeof remindersTasks.today)[number]
type ReminderItem = (typeof remindersTasks.reminders)[number]

function uniqueTaskTitles(titles: string[]) {
  return Array.from(new Set(titles))
}

function nextReminderCopy(item: ReminderItem, enabled: boolean) {
  if (!enabled) return 'paused'
  if (item.next === 'paused') return 'next: 9:00 PM tonight'
  return item.next
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 px-1 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">
      {children}
    </div>
  )
}

function TaskRow({ item, divider = false, done, onToggle }: { item: TaskItem; divider?: boolean; done: boolean; onToggle: () => void }) {
  return (
    <button type="button" onClick={onToggle} aria-pressed={done} className={['flex min-h-[68px] w-full items-center gap-3 px-4 py-3 text-left', divider ? 'border-t border-white/[0.05]' : ''].join(' ')}>
      {item.priority === 'high' ? (
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-xs border border-stalled-amber bg-stalled-amber/15 text-stalled-amber">
          <TriangleAlert size={14} strokeWidth={2.4} />
        </span>
      ) : (
        <span className={['flex h-6 w-6 shrink-0 items-center justify-center rounded-xs border', done ? 'border-brand-orange bg-brand-orange text-white' : 'border-white/20 text-transparent'].join(' ')}>
          <Check size={14} strokeWidth={2.6} />
        </span>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className={['min-w-0 flex-1 truncate text-[15px] font-semibold leading-5', done ? 'text-white/45' : 'text-white'].join(' ')}>
            {item.title}
          </span>
          <span className="shrink-0 text-caption leading-[18px] text-white/50">{item.time}</span>
        </div>
        <div className="mt-1 flex min-w-0 items-center gap-2">
          <DomainTag domain={item.domain} showDot={false} className="shrink-0" />
          <span className="truncate text-small leading-[14px] text-white/35">{item.meta}</span>
        </div>
      </div>
    </button>
  )
}

function TaskSection({ title, items, delay, completed, onToggle }: { title: string; items: TaskItem[]; delay: number; completed: string[]; onToggle: (title: string) => void }) {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: `${delay}ms` }}>
      <SectionEyebrow>{title}</SectionEyebrow>
      <Card variant="small" className="rounded-xl p-0">
        {items.map((item, index) => <TaskRow key={`${title}-${item.title}`} item={item} done={completed.includes(item.title)} onToggle={() => onToggle(item.title)} divider={index > 0} />)}
      </Card>
    </section>
  )
}

function SwitchVisual({ checked }: { checked: boolean }) {
  return (
    <span className={['relative inline-flex h-5 w-[34px] shrink-0 rounded-pill transition-colors', checked ? 'bg-brand-orange' : 'bg-white/15'].join(' ')} aria-hidden="true">
      <span className={['absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform', checked ? 'translate-x-[16px]' : 'translate-x-0.5'].join(' ')} />
    </span>
  )
}

function ReminderRows({ reminders, states, onToggle }: { reminders: ReminderItem[]; states: Record<string, boolean>; onToggle: (title: string) => void }) {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '240ms' }}>
      <SectionEyebrow>Reminders</SectionEyebrow>
      <Card variant="small" className="rounded-xl p-0">
        {reminders.map((item, index) => {
          const enabled = Boolean(states[item.title])
          const nextCopy = nextReminderCopy(item, enabled)

          return (
            <button
              type="button"
              key={item.title}
              onClick={() => onToggle(item.title)}
              role="switch"
              aria-checked={enabled}
              aria-label={`${item.title} reminder ${enabled ? 'on' : 'off'}, ${item.cadence}, ${nextCopy}`}
              className={['flex min-h-[64px] w-full items-center gap-3 px-4 py-3 text-left', index > 0 ? 'border-t border-white/[0.05]' : ''].join(' ')}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand-orange/10 text-brand-orange">
                <Bell size={17} strokeWidth={2.1} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[15px] font-semibold leading-5 text-white">{item.title}</div>
                <div className="mt-1 truncate text-caption leading-[18px] text-white/45">{item.cadence} - {nextCopy}</div>
              </div>
              <SwitchVisual checked={enabled} />
            </button>
          )
        })}
      </Card>
    </section>
  )
}

function CompletedTasks({ tasks }: { tasks: string[] }) {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '320ms' }}>
      <div className="mb-3 flex items-center gap-2 px-1 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">
        <ChevronDown size={14} strokeWidth={2} className="text-white/40" />
        <span>Completed ({tasks.length})</span>
      </div>
      <Card variant="small" className="rounded-xl p-0">
        {tasks.map((item, index) => (
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

function SmartSuggestion({ added, onAdd, onAsk }: { added: boolean; onAdd: () => void; onAsk: () => void }) {
  return (
    <Card className="mt-6 animate-fade-up" style={{ animationDelay: '400ms' }}>
      <div className="flex items-start gap-3">
        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-royal-purple" />
        <div className="min-w-0">
          <div className="text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">SIA suggests</div>
          <p className="mt-2 text-[15px] leading-[22px] text-white/80">{remindersTasks.suggestion}</p>
          <div className="mt-4 flex gap-2">
            <button type="button" onClick={onAdd} className="min-h-11 rounded-pill bg-brand-orange px-4 text-caption font-semibold leading-[18px] text-white">{added ? 'Added' : 'Add suggested task'}</button>
            <button type="button" onClick={onAsk} className="min-h-11 rounded-pill border border-royal-purple/25 bg-royal-purple/10 px-4 text-caption font-semibold leading-[18px] text-royal-purple">Ask SIA</button>
          </div>
        </div>
      </div>
    </Card>
  )
}

function AddFab({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="ml-auto flex h-[48px] items-center justify-center gap-2 rounded-pill bg-brand-orange px-5 text-[15px] font-semibold leading-5 text-white shadow-2 shadow-brand-orange/30">
      <Plus size={16} strokeWidth={2.4} />
      Add
    </button>
  )
}

export default function RemindersScreen() {
  const [customTasks, setCustomTasks] = useState<TaskItem[]>([])
  const [customReminders, setCustomReminders] = useState<ReminderItem[]>([])
  const [completed, setCompleted] = useState(uniqueTaskTitles([...remindersTasks.completed, ...remindersTasks.today.filter((item) => item.done).map((item) => item.title)]))
  const [reminderStates, setReminderStates] = useState(Object.fromEntries(remindersTasks.reminders.map((item) => [item.title, item.on])))
  const [suggestedAdded, setSuggestedAdded] = useState(false)
  const [notice, setNotice] = useState('')
  const [addOpen, setAddOpen] = useState(false)
  const [addType, setAddType] = useState<'task' | 'reminder'>('task')
  const [draftTitle, setDraftTitle] = useState('')
  const [draftTime, setDraftTime] = useState('')
  const todayItems = [...customTasks, ...remindersTasks.today]
  const reminderItems = [...remindersTasks.reminders, ...customReminders]
  const toggleTask = (title: string) => setCompleted((items) => items.includes(title) ? items.filter((item) => item !== title) : [...items, title])
  const closeAdd = () => {
    setAddOpen(false)
    setDraftTitle('')
    setDraftTime('')
    setAddType('task')
  }
  const saveAdd = () => {
    const title = draftTitle.trim()
    const time = draftTime.trim()
    if (!title || !time) return

    if (addType === 'task') {
      setCustomTasks((items) => [{ title, domain: 'wellbeing', time, meta: 'Added now', done: false }, ...items])
      setNotice(`Task added: ${title}`)
    } else {
      const reminder = { title, cadence: time, next: 'next scheduled', on: true }
      setCustomReminders((items) => [...items, reminder])
      setReminderStates((states) => ({ ...states, [title]: true }))
      setNotice(`Reminder added: ${title}`)
    }

    closeAdd()
  }

  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Reminders & tasks" showBack />} activeTab="today" bottomAction={<AddFab onClick={() => setAddOpen(true)} />}>
        <main className="px-4 pb-6 pt-4">
          {notice && <div className="mb-3 rounded-md bg-brand-orange/10 px-3 py-2 text-caption text-brand-orange" role="status">{notice}</div>}
          <TaskSection title="Today" items={todayItems} delay={0} completed={completed} onToggle={toggleTask} />
          <TaskSection title="Tomorrow" items={remindersTasks.tomorrow} delay={80} completed={completed} onToggle={toggleTask} />
          <TaskSection title="This week" items={remindersTasks.week} delay={160} completed={completed} onToggle={toggleTask} />
          <ReminderRows reminders={reminderItems} states={reminderStates} onToggle={(title) => setReminderStates((states) => ({ ...states, [title]: !states[title] }))} />
          <CompletedTasks tasks={completed} />
          <SmartSuggestion added={suggestedAdded} onAdd={() => { setSuggestedAdded(true); setCustomTasks((items) => items.some((item) => item.title === 'Thursday stretch session') ? items : [{ title: 'Thursday stretch session', domain: 'wellbeing', time: 'Thu 7:00 PM', meta: 'SIA suggested', done: false }, ...items]); setNotice('Suggested task added to Today') }} onAsk={() => setNotice('Opening SIA with task context')} />
        </main>

        {addOpen && (
          <div className="absolute inset-0 z-40 flex items-end bg-ink-900/70 px-4 pb-10" role="dialog" aria-modal="true" aria-label="Add task or reminder">
            <div className="w-full rounded-2xl border border-white/[0.08] bg-ink-brown-800 p-5 shadow-3">
              <h2 className="text-h3 font-semibold leading-[22px] text-white">Add task or reminder</h2>
              <p className="mt-2 text-caption leading-[18px] text-white/55">Choose whether this is a one-time task or an ongoing reminder.</p>
              <div className="mt-4 grid grid-cols-2 gap-2" role="tablist" aria-label="Add type">
                {(['task', 'reminder'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setAddType(type)}
                    aria-pressed={addType === type}
                    className={['h-11 rounded-pill text-[14px] font-semibold capitalize', addType === type ? 'bg-brand-orange text-white' : 'border border-white/10 text-white/60'].join(' ')}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <label className="mt-4 block text-caption font-semibold leading-[18px] text-white/60">
                Title
                <input
                  value={draftTitle}
                  onChange={(event) => setDraftTitle(event.target.value)}
                  className="mt-2 h-12 w-full rounded-md border border-white/10 bg-ink-900 px-3 text-[15px] text-white outline-none focus:border-brand-orange"
                  placeholder={addType === 'task' ? 'Book lab appointment' : 'Medication refill'}
                />
              </label>
              <label className="mt-3 block text-caption font-semibold leading-[18px] text-white/60">
                {addType === 'task' ? 'Time' : 'Cadence'}
                <input
                  value={draftTime}
                  onChange={(event) => setDraftTime(event.target.value)}
                  className="mt-2 h-12 w-full rounded-md border border-white/10 bg-ink-900 px-3 text-[15px] text-white outline-none focus:border-brand-orange"
                  placeholder={addType === 'task' ? 'Tomorrow 9:00 AM' : 'daily 9:00 PM'}
                />
              </label>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button type="button" onClick={closeAdd} className="h-12 rounded-pill border border-white/[0.08] text-[15px] font-semibold text-white/60">Cancel</button>
                <button type="button" onClick={saveAdd} disabled={!draftTitle.trim() || !draftTime.trim()} className="h-12 rounded-pill bg-brand-orange text-[15px] font-semibold text-white disabled:opacity-40">Save</button>
              </div>
            </div>
          </div>
        )}
      </ScreenShell>
    </PhoneFrame>
  )
}
