'use client'

import { useEffect, useRef, useState } from 'react'
import { Bell, CalendarClock, Check, ChevronDown, ChevronRight, Info, Plus, WifiOff } from 'lucide-react'
import {
  BtnGhost,
  BtnSecondary,
  CIAInsightCard,
  ConsentRail,
  GlassCard,
  HifiShell,
  IconButton,
  ProgressBar,
  Provenance,
  SectionTitle,
  SolidCard,
  TopBar,
  cx,
} from '@/components/hifi/kit'

// Stack-pushed execution ledger opened from Home, Schedule, Me, or CIA Chat —
// it has no live route of its own, so no tab bar renders. All toggles below
// mutate local component state only: nothing syncs, persists, or leaves this
// preview. The wind-down reminder renders its honest real default (off, no
// delivery channel chosen yet) and refuses to switch on until a channel
// exists, rather than pretending it could deliver.

type RemindersState = 'default' | 'skeleton' | 'empty' | 'error' | 'offline' | 'success'
type TaskId = 'medication' | 'walk' | 'journal' | 'hrv'
type TaskStatus = 'open' | 'pending' | 'done' | 'queued'
type ReminderId = 'medication' | 'movement' | 'hydration' | 'winddown'

const REMINDERS_STATES: RemindersState[] = ['default', 'skeleton', 'empty', 'error', 'offline', 'success']

const TASKS: Array<{ id: TaskId; time: string; title: string; domain: string; domainClass: string; meta: string }> = [
  { id: 'medication', time: '9:30', title: 'Take medication', domain: 'Wellbeing', domainClass: 'border border-domain-wellbeing/30 bg-domain-wellbeing/15 text-paper-100', meta: 'Daily' },
  { id: 'walk', time: '12:45', title: 'Walk after lunch', domain: 'Fitness', domainClass: 'border border-domain-fitness/30 bg-domain-fitness/15 text-paper-100', meta: '15 minutes' },
  { id: 'journal', time: '21:30', title: 'Start wind-down journal', domain: 'Sleep', domainClass: 'bg-domain-sleep/15 text-domain-sleep', meta: 'Evening' },
  { id: 'hrv', time: '8:00', title: 'Check resting HRV', domain: 'Wellbeing', domainClass: 'bg-domain-wellbeing/15 text-domain-wellbeing', meta: 'Synced' },
]

// 5 earlier completions + the 4 rows above = 9 tasks today, so the "6 of 9
// done" band always matches what the list actually shows.
const COMPLETED_EARLIER: Array<{ time: string; title: string }> = [
  { time: '7:10', title: 'Morning stretch' },
  { time: '7:35', title: 'Log breakfast' },
  { time: '8:20', title: 'Plan top mission for today' },
  { time: '10:05', title: 'Inbox to zero' },
  { time: '11:30', title: 'Refill water bottle' },
]

const TOTAL_TODAY = TASKS.length + COMPLETED_EARLIER.length

// All 4 reminders render so the "3 of 4 on" roll-up matches the visible list.
const REMINDERS: Array<{ id: ReminderId; label: string; detail: string; initialOn: boolean; channelSet: boolean }> = [
  { id: 'medication', label: 'Medication reminder', detail: 'Push · 9:00 am · You allowed', initialOn: true, channelSet: true },
  { id: 'movement', label: 'Movement reminder', detail: 'Push · every 2 hours · You allowed', initialOn: true, channelSet: true },
  { id: 'hydration', label: 'Hydration reminder', detail: 'SMS · 3 times daily · You allowed', initialOn: true, channelSet: true },
  { id: 'winddown', label: 'Wind-down reminder', detail: 'Choose a delivery channel', initialOn: false, channelSet: false },
]

const INITIAL_TASK_STATUS: Record<TaskId, TaskStatus> = { medication: 'open', walk: 'open', journal: 'open', hrv: 'done' }
const ALL_DONE_TASK_STATUS: Record<TaskId, TaskStatus> = { medication: 'done', walk: 'done', journal: 'done', hrv: 'done' }
const INITIAL_REMINDERS_ON: Record<ReminderId, boolean> = { medication: true, movement: true, hydration: true, winddown: false }

export function S61RemindersTasks() {
  const [screenState, setScreenState] = useState<RemindersState>('default')
  const [taskStatus, setTaskStatus] = useState<Record<TaskId, TaskStatus>>(INITIAL_TASK_STATUS)
  const [remindersOn, setRemindersOn] = useState<Record<ReminderId, boolean>>(INITIAL_REMINDERS_ON)
  const [earlierOpen, setEarlierOpen] = useState(false)
  const [status, setStatus] = useState('Reminders and tasks visual fixture ready. Toggles change this preview only — nothing syncs or sends.')
  const timersRef = useRef<number[]>([])

  useEffect(() => {
    const fixture = new URLSearchParams(window.location.search).get('state') as RemindersState | null
    if (!fixture || !REMINDERS_STATES.includes(fixture)) return
    const timer = window.setTimeout(() => {
      setScreenState(fixture)
      if (fixture === 'success') setTaskStatus(ALL_DONE_TASK_STATUS)
      setStatus(
        fixture === 'offline'
          ? 'Offline — showing your last sync, 10 minutes ago. Changes queue locally and nothing sends.'
          : fixture === 'skeleton'
            ? 'Tasks and reminders are loading. Controls are disabled while the skeleton renders.'
            : fixture === 'error'
              ? 'Tasks did not sync in this fixture. Cached rows stay visible and queued changes are preserved.'
              : fixture === 'empty'
                ? 'No tasks or reminders yet in this fixture. New task and Ask CIA start the board.'
                : fixture === 'success'
                  ? 'All 9 tasks are done today in this local preview. Nothing left on the board.'
                  : `${fixture} reminders fixture loaded.`,
      )
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const timers = timersRef.current
    return () => timers.forEach(id => window.clearTimeout(id))
  }, [])

  const isOffline = screenState === 'offline'

  const toggleTask = (id: TaskId) => {
    const task = TASKS.find(candidate => candidate.id === id)
    if (!task) return
    setTaskStatus(current => {
      const state = current[id]
      if (state === 'pending') return current
      if (state === 'done') {
        setStatus(`${task.title} reopened. The completion was undone in this preview.`)
        return { ...current, [id]: 'open' }
      }
      if (state === 'queued') {
        setStatus(`${task.title} removed from the local queue. It is open again and nothing was sent.`)
        return { ...current, [id]: 'open' }
      }
      if (isOffline) {
        setStatus(`${task.title} queued locally — it saves when you're back online. No external action taken.`)
        return { ...current, [id]: 'queued' }
      }
      const timer = window.setTimeout(() => {
        setTaskStatus(inner => (inner[id] === 'pending' ? { ...inner, [id]: 'done' } : inner))
        setStatus(`${task.title} marked done in this local preview · undo by unchecking.`)
      }, 650)
      timersRef.current.push(timer)
      setStatus(`${task.title} is syncing in this preview…`)
      return { ...current, [id]: 'pending' }
    })
  }

  const toggleReminder = (id: ReminderId) => {
    const reminder = REMINDERS.find(candidate => candidate.id === id)
    if (!reminder) return
    if (!reminder.channelSet && !remindersOn[id]) {
      setStatus(`${reminder.label} needs a delivery channel before it can turn on. Nothing changed.`)
      return
    }
    setRemindersOn(current => {
      const next = !current[id]
      setStatus(
        isOffline
          ? `${reminder.label} turned ${next ? 'on' : 'off'} locally — queued until you're back online. No external action taken.`
          : `${reminder.label} turned ${next ? 'on' : 'off'} in this local preview. No notification settings changed.`,
      )
      return { ...current, [id]: next }
    })
  }

  const doneVisible = TASKS.filter(task => taskStatus[task.id] === 'done').length
  const queuedCount = TASKS.filter(task => taskStatus[task.id] === 'queued').length
  const doneCount = COMPLETED_EARLIER.length + doneVisible
  const openCount = TOTAL_TODAY - doneCount - queuedCount
  const percent = Math.round((doneCount / TOTAL_TODAY) * 100)
  const allDone = doneCount === TOTAL_TODAY
  const onCount = REMINDERS.filter(reminder => remindersOn[reminder.id]).length
  const openVisible = TASKS.filter(task => taskStatus[task.id] === 'open').length

  return (
    <HifiShell
      header={
        <TopBar
          title={<>Reminders &amp; <span className="text-emphasis">tasks</span></>}
          eyebrow={isOffline ? 'Last synced 10 minutes ago · offline' : 'Synced 10 minutes ago'}
          right={
            <IconButton
              label="Create task or reminder"
              onClick={() => setStatus('The create task or reminder sheet opens here. Preview only — nothing was created.')}
            >
              <Plus className="h-5 w-5" strokeWidth={2} />
            </IconButton>
          }
        />
      }
      showTabBar={false}
    >
      <main className="space-y-5 px-4 pb-8 pt-3" data-reminders-state={screenState} aria-busy={screenState === 'skeleton'}>
        {isOffline && (
          <div className="flex items-start gap-2 rounded-xl border border-white/10 bg-surface-2 px-3 py-2 text-[12px] leading-4 text-paper-100/70">
            <WifiOff aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
            offline — cached lists stay interactive; changes save when you reconnect
          </div>
        )}

        {screenState === 'skeleton' ? (
          <div className="space-y-4" aria-label="Loading reminders and tasks preview">
            <div className="skeleton-block h-36 rounded-[28px]" />
            <div className="skeleton-block h-56 rounded-[22px]" />
            <div className="skeleton-block h-20 rounded-[22px]" />
            <div className="skeleton-block h-48 rounded-[22px]" />
            <div className="skeleton-block h-32 rounded-[22px]" />
          </div>
        ) : screenState === 'empty' ? (
          <GlassCard tone="you" className="px-5 py-8 text-center">
            <CalendarClock aria-hidden="true" className="mx-auto h-7 w-7 text-brand-orange" />
            <h2 className="mt-3 text-[18px] font-semibold text-paper-100">No tasks for today yet</h2>
            <p className="mt-2 text-[13px] leading-5 text-paper-100/70">
              Your execution board is empty. Add a first task, or ask CIA to suggest one from your Missions and schedule.
            </p>
            <p className="mt-2 text-[12px] leading-4 text-paper-100/65">No active reminders yet.</p>
            <div className="mt-4 flex justify-center gap-2">
              <BtnSecondary onClick={() => setStatus('New task sheet opens here. Preview only — nothing was created.')}>
                <Plus className="mr-1.5 h-4 w-4" strokeWidth={2} />
                New task
              </BtnSecondary>
              <BtnGhost onClick={() => setStatus('Ask CIA opens the chat with this board as context. Preview only.')}>Ask CIA</BtnGhost>
            </div>
          </GlassCard>
        ) : (
          <>
            {screenState === 'error' && (
              <GlassCard tone="muted" className="px-5 py-5 text-center">
                <Info aria-hidden="true" className="mx-auto h-6 w-6 text-brand-orange" />
                <h2 className="mt-2 text-[16px] font-semibold text-paper-100">Tasks didn’t sync</h2>
                <p className="mt-1 text-[12px] leading-5 text-paper-100/70">
                  Cached rows below stay visible and any queued changes are preserved.
                </p>
                <BtnSecondary className="mt-3" onClick={() => setStatus('Retry preview selected. No sync request was made from this visual fixture.')}>
                  Retry
                </BtnSecondary>
              </GlassCard>
            )}

            <GlassCard tone={allDone ? 'done' : 'you'}>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-wide text-paper-100/70">Today</p>
                  <p className="mt-1 text-[19px] font-semibold leading-6 text-white">
                    <span className="tabular-nums">{doneCount}</span> of <span className="tabular-nums">{TOTAL_TODAY}</span> done
                  </p>
                </div>
                <span className={cx('text-[30px] font-semibold leading-8 tabular-nums', allDone ? 'text-forest-green' : 'text-brand-orange')}>
                  {percent}%
                </span>
              </div>
              <div className="mt-3">
                <ProgressBar value={percent} tone={allDone ? 'done' : 'you'} />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-4 text-[13px] text-white/70">
                  <span>Done <span className="font-semibold tabular-nums text-white">{doneCount}</span></span>
                  <span>Open <span className="font-semibold tabular-nums text-white">{openCount}</span></span>
                  {queuedCount > 0 && (
                    <span>Queued <span className="font-semibold tabular-nums text-white">{queuedCount}</span></span>
                  )}
                </div>
                <div className="[&_span]:!text-[12px]">
                  <Provenance items={[screenState === 'error' ? 'Via tasks sync · cached' : 'Via tasks sync']} />
                </div>
              </div>
              {allDone && (
                <p className="mt-3 rounded-xl border border-forest-green/25 bg-forest-green/10 px-3 py-2 text-[13px] font-medium leading-5 text-paper-100">
                  <Check aria-hidden="true" className="mr-2 inline h-4 w-4 text-forest-green" />
                  All {TOTAL_TODAY} done today. Well earned — nothing left on the board.
                </p>
              )}
            </GlassCard>

            <section className="space-y-2.5">
              <SectionTitle title="Today" meta={`${openVisible} open`} />
              <SolidCard className="p-0">
                <div className="divide-y divide-white/[0.06]">
                  {TASKS.map(task => (
                    <TaskRow key={task.id} {...task} status={taskStatus[task.id]} onToggle={() => toggleTask(task.id)} />
                  ))}
                </div>
              </SolidCard>
            </section>

            <section className="space-y-2.5">
              <SectionTitle title="Upcoming" meta="Tomorrow" />
              <SolidCard className="p-0">
                <button
                  type="button"
                  aria-label="Book lab follow-up, tomorrow, unscheduled"
                  className="focus-ring flex min-h-[64px] w-full items-center gap-3 p-4 text-left"
                  onClick={() => setStatus('Book lab follow-up opens its task detail here. Preview only — nothing was scheduled.')}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-white/50">
                    <CalendarClock className="h-5 w-5" strokeWidth={1.9} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] text-white">Book lab follow-up</span>
                    <span className="mt-0.5 block text-[12px] text-paper-100/70">Tomorrow &middot; unscheduled</span>
                  </span>
                  <ChevronRight className="h-5 w-5 shrink-0 text-white/30" strokeWidth={1.9} />
                </button>
              </SolidCard>
            </section>

            <section className="space-y-2.5">
              <SectionTitle title="Active reminders" meta={`${onCount} of ${REMINDERS.length} on`} />
              <SolidCard className="p-0">
                <div className="divide-y divide-white/[0.06]">
                  {REMINDERS.map(reminder => (
                    <ReminderRow
                      key={reminder.id}
                      id={reminder.id}
                      label={reminder.label}
                      detail={remindersOn[reminder.id] || reminder.channelSet ? reminder.detail : 'Choose a delivery channel'}
                      on={remindersOn[reminder.id]}
                      disabled={!reminder.channelSet && !remindersOn[reminder.id]}
                      onToggle={() => toggleReminder(reminder.id)}
                    />
                  ))}
                </div>
              </SolidCard>
            </section>

            <section className="space-y-2.5">
              <SectionTitle title="Completed today" meta={`${doneCount} done`} />
              <SolidCard className="p-0">
                <button
                  type="button"
                  aria-expanded={earlierOpen}
                  className="focus-ring flex min-h-[56px] w-full items-center gap-3 p-4 text-left"
                  onClick={() => setEarlierOpen(open => !open)}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-forest-green/35 bg-forest-green/15 text-forest-green">
                    <Check className="h-4 w-4" strokeWidth={2.4} />
                  </span>
                  <span className="min-w-0 flex-1 text-[14px] text-white/85">
                    {COMPLETED_EARLIER.length} completed earlier today
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className={cx('h-5 w-5 shrink-0 text-white/40 transition-transform motion-reduce:transition-none', earlierOpen && 'rotate-180')}
                    strokeWidth={1.9}
                  />
                </button>
                {earlierOpen && (
                  <ul className="divide-y divide-white/[0.06] border-t border-white/[0.06]">
                    {COMPLETED_EARLIER.map(item => (
                      <li key={item.title} className="flex min-h-11 items-center gap-3 px-4 py-2.5">
                        <span className="text-[13px] font-semibold tabular-nums text-paper-100/70">{item.time}</span>
                        <span className="min-w-0 flex-1 text-[14px] text-paper-100/70 line-through decoration-white/25">{item.title}</span>
                        <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-forest-green" strokeWidth={2.4} />
                      </li>
                    ))}
                  </ul>
                )}
              </SolidCard>
            </section>

            <CIAInsightCard
              eyebrow="CIA suggests"
              provenance={['Via schedule + missions']}
              className="[&>div>div>div.mt-3>div>span]:!text-[12px] [&>div>div>p:first-child]:!text-[12px]"
              actions={
                <>
                  <BtnSecondary onClick={() => setStatus('Five-minute stretch added as a local preview task idea. Nothing was saved to your board.')}>
                    <Plus className="mr-1.5 h-4 w-4" strokeWidth={2} />
                    Add task
                  </BtnSecondary>
                  <BtnGhost onClick={() => setStatus('Ask CIA opens the chat with this suggestion as context. Preview only.')}>Ask CIA</BtnGhost>
                </>
              }
            >
              A five-minute stretch fits before your appointment.
            </CIAInsightCard>
          </>
        )}

        <div className="pt-1">
          <p className="text-center text-[12px] leading-4 text-paper-100/70">
            Reminders sync from your Missions and schedule. Manage sources anytime.
          </p>
          <div className="mt-3 flex justify-center [&_a]:!text-[12px]">
            <ConsentRail compact />
          </div>
        </div>

        <p
          id="reminders-live-status"
          className="min-h-5 text-[12px] leading-5 text-paper-100/70"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {status}
        </p>
      </main>
    </HifiShell>
  )
}

// CheckboxControl row backed by a real native <input type="checkbox"> (sr-only,
// with the 44px tile as its visual). State is announced as not done / syncing /
// queued / done — never by color alone. Done rows keep full-contrast layout:
// no container opacity; the title drops to paper-100/70 with a line-through
// and the green check carries completion.
function TaskRow({
  time,
  title,
  domain,
  domainClass,
  meta,
  status,
  onToggle,
}: {
  time: string
  title: string
  domain: string
  domainClass: string
  meta: string
  status: TaskStatus
  onToggle: () => void
}) {
  const done = status === 'done'
  const pending = status === 'pending'
  const queued = status === 'queued'
  const stateLabel = done ? 'done' : pending ? 'syncing' : queued ? 'queued, saving when online' : 'not done'
  return (
    <div className="flex min-h-[64px] items-center gap-3 p-4">
      <label
        className={cx(
          'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border focus-within:shadow-[var(--focus-ring)]',
          pending ? 'cursor-wait' : 'cursor-pointer',
          done
            ? 'border-forest-green/40 bg-forest-green/15 text-forest-green shadow-[var(--glow-green-sm)]'
            : pending || queued
              ? 'border-white/25 bg-white/[0.05] text-white/60'
              : 'border-white/15 bg-white/[0.03]',
        )}
      >
        <input
          type="checkbox"
          className="sr-only"
          checked={done}
          disabled={pending}
          aria-busy={pending || undefined}
          aria-label={`${time}, ${title}, ${stateLabel}`}
          onChange={onToggle}
        />
        {done && <Check aria-hidden="true" className="h-5 w-5" strokeWidth={2.6} />}
        {pending && <CalendarClock aria-hidden="true" className="h-5 w-5" strokeWidth={2} />}
        {queued && <WifiOff aria-hidden="true" className="h-5 w-5" strokeWidth={2} />}
      </label>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-[13px] font-semibold tabular-nums text-brand-orange">{time}</span>
          <span className={cx('text-[15px]', done ? 'text-paper-100/70 line-through decoration-white/25' : 'text-white')}>{title}</span>
        </div>
        <div className="mt-1 flex items-center gap-2">
          <span className={cx('rounded-pill px-2 py-0.5 text-[12px] font-semibold', domainClass)}>{domain}</span>
          <span className="text-[12px] text-paper-100/70">{pending ? 'Syncing…' : queued ? 'Saving when online' : meta}</span>
        </div>
      </div>
    </div>
  )
}

// Reminder toggle row with a real native <button role="switch">. Off state
// names the reason inline ("choose a delivery channel") instead of hiding the
// row — consent honesty over a tidy list. Announces channel and trigger time.
function ReminderRow({
  id,
  label,
  detail,
  on,
  disabled,
  onToggle,
}: {
  id: ReminderId
  label: string
  detail: string
  on: boolean
  disabled: boolean
  onToggle: () => void
}) {
  const detailId = `reminder-${id}-detail`
  return (
    <div className="flex min-h-[64px] items-center gap-3 p-4">
      <span
        className={cx(
          'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl',
          on ? 'bg-brand-orange/15 text-brand-orange' : 'border border-white/10 bg-white/[0.03] text-white/35',
        )}
      >
        <Bell className="h-5 w-5" strokeWidth={1.9} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[15px] text-white">{label}</p>
        <p id={detailId} className="mt-0.5 text-[12px] text-white/55">{detail}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={`${label}, ${detail}, currently ${on ? 'on' : 'off'}${disabled ? ', unavailable until a delivery channel is chosen' : ''}`}
        aria-describedby={disabled ? detailId : undefined}
        disabled={disabled}
        className="focus-ring flex h-11 w-12 shrink-0 items-center rounded-pill disabled:cursor-not-allowed"
        onClick={onToggle}
      >
        <span
          aria-hidden="true"
          className={cx('relative flex h-7 w-12 items-center rounded-pill p-1', on ? 'bg-brand-orange shadow-[var(--glow-orange-sm)]' : 'bg-white/10')}
        >
          <span className={cx('h-5 w-5 rounded-full bg-paper-50 transition-transform motion-reduce:transition-none', on ? 'translate-x-5' : 'translate-x-0')} />
        </span>
      </button>
    </div>
  )
}
