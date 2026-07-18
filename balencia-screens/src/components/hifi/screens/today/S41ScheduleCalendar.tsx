'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowUp, Plus, RefreshCw, WifiOff } from 'lucide-react'
import {
  BtnGhost,
  BtnSecondary,
  ChargeMeter,
  Chip,
  CIAInsightCard,
  ConsentRail,
  cx,
  DonutHub,
  GlassCard,
  HifiShell,
  IconButton,
  Provenance,
  SectionTitle,
  SolidCard,
  TopBar,
} from '@/components/hifi/kit'

// Schedule. `?state=` fixtures: default (synced day view), overpacked
// (near-full waking window, recovery-first CIA copy), cold-start
// (consent-first connect view, honest-null donut), stale-offline (cached
// list, adding paused), revoked (synced events hidden, manual tasks stay),
// and skeleton. All outcomes are local; no calendar request is ever made.

type ScheduleState = 'default' | 'overpacked' | 'cold-start' | 'stale-offline' | 'revoked' | 'skeleton'

const SCHEDULE_STATES: ScheduleState[] = ['default', 'overpacked', 'cold-start', 'stale-offline', 'revoked', 'skeleton']

const days = [
  { label: 'M', date: 4, name: 'Monday, May 4', today: false, done: true },
  { label: 'T', date: 5, name: 'Tuesday, May 5', today: false, done: true },
  { label: 'W', date: 6, name: 'Wednesday, May 6', today: false, done: false },
  { label: 'T', date: 7, name: 'Thursday, May 7', today: true, done: false },
  { label: 'F', date: 8, name: 'Friday, May 8', today: false, done: false },
  { label: 'S', date: 9, name: 'Saturday, May 9', today: false, done: false },
  { label: 'S', date: 10, name: 'Sunday, May 10', today: false, done: false },
] as const

const hours = ['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM'] as const
const scheduleTabs = ['Day', 'Week', 'Month'] as const

type UnscheduledItem = { id: string; title: string; meta: string; dotClass: string }

const initialUnscheduled: UnscheduledItem[] = [
  { id: 'deep-work', title: 'Deep work block', meta: '2h · Career', dotClass: 'bg-domain-career' },
  { id: 'read-pages', title: 'Read 10 pages', meta: '15m · Productivity', dotClass: 'bg-domain-productivity' },
]

const starterTasks: UnscheduledItem[] = [
  { id: 'starter-walk', title: 'Take a 10-minute walk', meta: 'CIA starter · Fitness', dotClass: 'bg-domain-fitness' },
  { id: 'starter-plan', title: 'Write tomorrow’s top task', meta: 'CIA starter · Productivity', dotClass: 'bg-domain-productivity' },
]

function ReadableProvenance({ items }: { items: string[] }) {
  return <div className="[&_span]:!text-[12px]"><Provenance items={items} /></div>
}

export function S41ScheduleCalendar() {
  const [screenState, setScreenState] = useState<ScheduleState>('default')
  const [activeView, setActiveView] = useState<(typeof scheduleTabs)[number]>('Day')
  const [selectedDay, setSelectedDay] = useState(3)
  const [unscheduled, setUnscheduled] = useState(initialUnscheduled)
  const [status, setStatus] = useState('Schedule visual fixture ready. Viewing Thursday. No calendar request was made.')
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  useEffect(() => {
    const fixture = new URLSearchParams(window.location.search).get('state') as ScheduleState | null
    if (!fixture || !SCHEDULE_STATES.includes(fixture)) return
    const timer = window.setTimeout(() => {
      setScreenState(fixture)
      setStatus(
        fixture === 'skeleton'
          ? 'Adding events is disabled while the schedule skeleton loads.'
          : fixture === 'cold-start'
            ? 'Calendar not connected. Nothing is read until you consent — CIA starter tasks only.'
            : fixture === 'stale-offline'
              ? 'Offline — showing your last sync, 2 hours ago. Adding events is paused.'
              : fixture === 'revoked'
                ? 'Calendar access revoked. Synced events are hidden; your manual tasks stay.'
                : fixture === 'overpacked'
                  ? 'Overpacked fixture — 13h 45m of your 16h waking window is scheduled.'
                  : 'Schedule fixture ready. Viewing Thursday. No calendar request was made.',
      )
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  const selectTab = (index: number) => {
    const view = scheduleTabs[index]
    setActiveView(view)
    tabRefs.current[index]?.focus()
    setStatus(
      view === 'Day'
        ? `Day view shown for ${days[selectedDay].name}.`
        : view === 'Week'
          ? 'Week view shown — Thursday is the only populated fixture day; every other day is explicitly empty.'
          : 'Month view shown — May 7 is the only populated fixture date; no daily timeline is borrowed.',
    )
  }

  const onTabKeyDown = (event: React.KeyboardEvent, index: number) => {
    const last = scheduleTabs.length - 1
    if (event.key === 'ArrowRight') selectTab(index === last ? 0 : index + 1)
    else if (event.key === 'ArrowLeft') selectTab(index === 0 ? last : index - 1)
    else if (event.key === 'Home') selectTab(0)
    else if (event.key === 'End') selectTab(last)
    else return
    event.preventDefault()
  }

  const moveUnscheduled = (index: number, direction: -1 | 1) => {
    setUnscheduled(current => {
      const target = index + direction
      if (target < 0 || target >= current.length) return current
      const next = [...current]
      ;[next[index], next[target]] = [next[target], next[index]]
      setStatus(`${current[index].title} moved ${direction === -1 ? 'up' : 'down'} · order saved in this preview only.`)
      return next
    })
  }

  const isOffline = screenState === 'stale-offline'
  const isRevoked = screenState === 'revoked'
  const isOverpacked = screenState === 'overpacked'
  const selectedDayHasFixture = selectedDay === 3
  const addDisabled = screenState === 'skeleton' || isOffline

  const syncChipText = screenState === 'skeleton'
    ? 'Syncing…'
    : isOffline
      ? 'Last sync 2h ago'
      : isRevoked || screenState === 'cold-start'
        ? 'Not connected'
        : 'Synced 2m ago'

  return (
    <div className="contents [&_[data-chip-interactive]]:!text-[12px] [&_nav_span]:!text-[12px]">
      <HifiShell
      header={
        <TopBar
          title="Schedule"
          right={
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                aria-label="Manage calendar connection"
                className="focus-ring flex min-h-11 items-center gap-1.5 rounded-pill border border-white/10 bg-white/[0.04] px-3 text-[12px] font-medium text-paper-100/65"
                onClick={() => setStatus('Manage calendar connection preview opened locally — provider, scope, last sync, retention, export, revoke, delete. No account change was made.')}
              >
                <RefreshCw size={12} strokeWidth={2} aria-hidden="true" /> {syncChipText}
              </button>
              <IconButton
                label={addDisabled ? 'Add event or task (unavailable right now)' : 'Add event or task'}
                disabled={addDisabled}
                className={cx(addDisabled && 'opacity-40')}
                onClick={() => setStatus('Add sheet preview: “Add event” or “Add unscheduled task”, saved in this preview only.')}
              >
                <Plus size={19} strokeWidth={2} />
              </IconButton>
            </div>
          }
        />
      }
      atmosphere="you"
      activeTab="today"
    >
      <main className="space-y-4 px-4 pb-4 pt-2" data-schedule-state={screenState} aria-busy={screenState === 'skeleton'}>
        {isOffline && (
          <div className="flex items-start gap-2 rounded-xl border border-white/10 bg-surface-2 px-3 py-2 text-[12px] leading-4 text-paper-100/70">
            <WifiOff aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
            Offline — showing your last sync, 2 hours ago. Adding events is paused until you reconnect.
          </div>
        )}
        {isRevoked && (
          <div className="rounded-xl border border-white/10 bg-surface-2 px-3 py-2.5">
            <p className="text-[12px] leading-4 text-paper-100/70">Calendar access revoked — synced events are hidden. Manual tasks stay on this device.</p>
            <BtnSecondary className="mt-2 h-11 px-4 text-[13px]" onClick={() => setStatus('Reconnect preview selected. Nothing is read until you consent. No calendar request was made.')}>
              Reconnect Google Calendar
            </BtnSecondary>
          </div>
        )}

        {screenState === 'skeleton' ? (
          <div className="space-y-4" aria-label="Loading schedule preview">
            <div className="skeleton-block h-11 rounded-pill" />
            <div className="skeleton-block h-14 rounded-2xl" />
            <div className="skeleton-block h-60 rounded-2xl" />
            <div className="skeleton-block h-36 rounded-2xl" />
            <div className="skeleton-block h-28 rounded-2xl" />
          </div>
        ) : screenState === 'cold-start' ? (
          <>
            <GlassCard tone="muted">
              <h2 className="text-[17px] font-semibold leading-6 text-paper-100">Connect Google Calendar</h2>
              <p className="mt-2 text-[13px] leading-5 text-paper-100/70">
                Balencia reads event times, titles, and categories to build this day view — nothing else, and nothing until you connect. Cached events are kept until you revoke or delete them.
              </p>
              <div className="mt-4 space-y-2" aria-label="Calendar connection choices">
                <BtnSecondary className="h-[52px] w-full" onClick={() => setStatus('Connect preview selected. No calendar request was made in this preview.')}>
                  Connect Google Calendar
                </BtnSecondary>
                <BtnSecondary className="h-[52px] w-full" onClick={() => setStatus('Declined for now — Schedule stays manual-only. Nothing was read.')}>
                  Not now
                </BtnSecondary>
              </div>
            </GlassCard>

            <SolidCard>
              <div className="flex items-center gap-4">
                <div className="flex h-[80px] w-[80px] shrink-0 items-center justify-center rounded-full border-4 border-dashed border-white/10" aria-hidden="true" />
                <p className="text-[13px] leading-5 text-paper-100/70">
                  Nothing scheduled yet — tap + or accept a CIA starter task below.
                </p>
              </div>
              <div className="mt-3 border-t border-white/[0.06] pt-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-[12px] font-semibold uppercase leading-4 text-paper-100/65">Day fullness</span>
                  <span className="text-[12px] font-medium text-paper-100/65">No wake-window data yet</span>
                </div>
                <div className="mt-2"><ChargeMeter ticks={16} filled={0} label="No waking hours scheduled yet" /></div>
                <p className="mt-2 text-[12px] font-medium text-brand-orange">Room to breathe today</p>
              </div>
            </SolidCard>

            <section>
              <SectionTitle title="Starter tasks" meta="Seeded by CIA" />
              <div className="mt-2 space-y-2">
                {starterTasks.map(item => (
                  <button
                    key={item.id}
                    type="button"
                    className="focus-ring flex min-h-14 w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-left"
                    onClick={() => setStatus(`${item.title} kept as an unscheduled task in this preview. No external action taken.`)}
                  >
                    <span className={cx('h-2 w-2 shrink-0 rounded-full', item.dotClass)} aria-hidden="true" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[14px] font-medium text-white">{item.title}</span>
                      <span className="block text-[12px] text-paper-100/65">{item.meta}</span>
                    </span>
                  </button>
                ))}
              </div>
            </section>

            <GlassCard tone="muted">
              <p className="text-[12px] leading-4 text-paper-100/65">
                Schedule reads calendar events and your sleep window to keep the day honest, not fabricated.
              </p>
              <div className="[&_a]:!text-[12px]"><ConsentRail compact /></div>
            </GlassCard>
          </>
        ) : (
          <>
            <div role="tablist" aria-label="Schedule view" className="flex h-[52px] items-center gap-1 rounded-pill border border-white/10 bg-white/[0.03] p-0.5">
              {scheduleTabs.map((view, index) => (
                <button
                  key={view}
                  ref={element => { tabRefs.current[index] = element }}
                  type="button"
                  role="tab"
                  id={`schedule-tab-${view.toLowerCase()}`}
                  aria-controls="schedule-view-panel"
                  aria-selected={view === activeView}
                  tabIndex={view === activeView ? 0 : -1}
                  className={cx('focus-ring flex h-full flex-1 items-center justify-center rounded-pill text-[13px] font-medium', view === activeView ? 'bg-white/10 text-white' : 'text-paper-100/65')}
                  onClick={() => selectTab(index)}
                  onKeyDown={event => onTabKeyDown(event, index)}
                >
                  {view}
                </button>
              ))}
            </div>

            {activeView === 'Day' && (
              <div className="flex items-center justify-between gap-1.5" role="group" aria-label="Week strip">
                {days.map((day, index) => (
                  <div key={day.name} className="flex flex-1 flex-col items-center gap-1">
                    <button
                      type="button"
                      aria-label={`View ${day.name}${day.done ? ', has completed actions' : ''}`}
                      aria-pressed={selectedDay === index}
                      aria-current={day.today ? 'date' : undefined}
                      className={cx(
                        'focus-ring flex h-11 w-11 items-center justify-center rounded-full text-[13px] font-medium',
                        day.today && 'border-2 border-brand-orange text-white',
                        !day.today && selectedDay === index && 'bg-white/10 text-white',
                        !day.today && selectedDay !== index && 'text-paper-100/65',
                      )}
                      onClick={() => {
                        setSelectedDay(index)
                        setStatus(
                          index === 3
                            ? `Viewing ${day.name}. Showing that date’s synced, projected, and missed fixture events.`
                            : `Viewing ${day.name}. No fixture events are available, so Thursday’s timeline is hidden.`,
                        )
                      }}
                    >
                      <span className="flex flex-col items-center gap-1 leading-none">
                        <span className="text-[12px] text-paper-100/70">{day.label}</span>
                        <span className="text-[13px] font-semibold tabular-nums">{day.date}</span>
                      </span>
                    </button>
                    <span className={cx('h-1 w-1 rounded-full', day.done ? 'bg-forest-green' : 'bg-transparent')} aria-hidden="true" />
                  </div>
                ))}
              </div>
            )}

            <section
              id="schedule-view-panel"
              role="tabpanel"
              aria-labelledby={`schedule-tab-${activeView.toLowerCase()}`}
              data-schedule-population={activeView.toLowerCase()}
              data-now-next={activeView === 'Day' && selectedDayHasFixture ? 'true' : undefined}
            >
              {activeView === 'Day' ? (
                <>
                  <SectionTitle title="Now / next" meta={`Viewing ${days[selectedDay].name}`} />
                  {isRevoked ? (
                    <p className="mt-2 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-[13px] leading-5 text-paper-100/70">
                      No synced events — calendar access was revoked. Your manual tasks below stay on this device.
                    </p>
                  ) : !selectedDayHasFixture ? (
                    <div className="mt-2 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-4">
                      <p className="text-[14px] font-medium text-paper-100">No fixture events for {days[selectedDay].name}</p>
                      <p className="mt-1 text-[12px] leading-5 text-paper-100/70">
                        Thursday&rsquo;s timeline is not reused here. Add a manual task below, or choose Thursday to view its synced population.
                      </p>
                    </div>
                  ) : (
                    <div className="relative mt-3 space-y-7 pl-11">
                      {hours.map((hour, index) => (
                        <div key={hour} className="relative">
                          <span className="absolute -left-11 top-[-6px] text-[12px] font-medium text-paper-100/65 tabular-nums">{hour}</span>
                          <div className="h-px w-full bg-white/[0.05]" />

                          {index === 1 && (
                            <button
                              type="button"
                              data-current-event="true"
                              className="focus-ring relative mt-2 block w-full rounded-2xl border-l-[3px] border-domain-career bg-white/[0.04] p-3 text-left shadow-[var(--glow-orange-sm)]"
                              onClick={() => setStatus('Team sync opened in this preview · 10 AM · via Google Calendar. No external action taken.')}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <div className="min-w-0">
                                  <span className="inline-flex items-center gap-1.5">
                                    <span className="inline-block rounded-pill border border-domain-career/35 bg-domain-career/15 px-2 py-0.5 text-[12px] font-semibold uppercase tracking-wide text-paper-100">Career</span>
                                    <span className="inline-block rounded-pill bg-brand-orange/20 px-2 py-0.5 text-[12px] font-semibold uppercase tracking-wide text-paper-100">Now</span>
                                  </span>
                                  <p className="mt-1 text-[14px] font-medium text-white">Team sync</p>
                                </div>
                                <ReadableProvenance items={['Via Google Calendar']} />
                              </div>
                            </button>
                          )}

                          {index === 4 && (
                            <button
                              type="button"
                              className="focus-ring relative mt-2 block w-full rounded-2xl border border-dashed border-royal-purple/50 bg-royal-purple/[0.05] p-3 text-left"
                              onClick={() => setStatus('Lunch walk is a CIA-projected slot, not a synced event. Accepting it stays local to this preview.')}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <div className="min-w-0">
                                  <span className="inline-flex items-center gap-1.5">
                                    <span className="inline-block rounded-pill border border-royal-purple/35 bg-royal-purple/15 px-2 py-0.5 text-[12px] font-semibold uppercase tracking-wide text-paper-100">CIA fit</span>
                                    <span className="inline-block rounded-pill bg-white/10 px-2 py-0.5 text-[12px] font-semibold uppercase tracking-wide text-paper-100/70">Next open</span>
                                  </span>
                                  <p className="mt-1 text-[14px] font-medium text-white">Lunch walk</p>
                                </div>
                                <Chip tone="cia" className="!text-[12px]">Projected</Chip>
                              </div>
                            </button>
                          )}

                          {index === 6 && (
                            <div className="relative mt-2 w-full rounded-2xl border border-dashed border-white/15 bg-white/[0.015] p-3">
                              <div className="flex items-center justify-between gap-2">
                                <div className="min-w-0">
                                  <span className="inline-block rounded-pill bg-white/10 px-2 py-0.5 text-[12px] font-semibold uppercase tracking-wide text-paper-100/70">Missed</span>
                                  <p className="mt-1 text-[14px] font-medium text-paper-100/70">1:1 with Aisha</p>
                                </div>
                                <button
                                  type="button"
                                  className="focus-ring flex min-h-11 items-center rounded-pill px-2 text-[12px] font-medium text-paper-100/65"
                                  onClick={() => setStatus('Reschedule sheet preview opened for 1:1 with Aisha. No calendar change was made.')}
                                >
                                  Reschedule
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : activeView === 'Week' ? (
                <>
                  <SectionTitle title="Week of May 4" meta="Bundled summary" />
                  <SolidCard>
                    {isRevoked ? (
                      <p className="text-[13px] leading-5 text-paper-100/70">No weekly calendar population is available after access was revoked. Manual tasks remain below.</p>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3 border-b border-white/[0.06] pb-3">
                          <div>
                            <p className="text-[14px] font-medium text-paper-100">Thursday, May 7</p>
                            <p className="mt-1 text-[12px] leading-4 text-paper-100/70">Team sync · 1:1 with Aisha · Lunch walk</p>
                          </div>
                          <span className="text-right text-[12px] font-medium text-paper-100/70">2 synced<br />1 CIA slot</span>
                        </div>
                        <p className="text-[12px] leading-5 text-paper-100/70">
                          Monday–Wednesday and Friday–Sunday have no fixture events. Their populations stay explicitly empty.
                        </p>
                        <ReadableProvenance items={['Via Google Calendar', 'CIA projection separated']} />
                      </div>
                    )}
                  </SolidCard>
                </>
              ) : (
                <>
                  <SectionTitle title="May 2026" meta="Calendar fixture" />
                  <SolidCard>
                    {isRevoked ? (
                      <p className="text-[13px] leading-5 text-paper-100/70">No monthly calendar population is available after access was revoked. Nothing is inferred from hidden data.</p>
                    ) : (
                      <div className="space-y-3">
                        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                          <p className="text-[14px] font-medium text-paper-100">May 7 · populated date</p>
                          <p className="mt-1 text-[12px] leading-5 text-paper-100/70">2 synced events and 1 separately labelled CIA-projected slot.</p>
                        </div>
                        <p className="text-[12px] leading-5 text-paper-100/70">
                          Every other May date is honest-null in this preview. No Thursday timeline is copied into another date.
                        </p>
                        <ReadableProvenance items={['Via Google Calendar']} />
                      </div>
                    )}
                  </SolidCard>
                </>
              )}
            </section>

            <SolidCard>
              {activeView !== 'Day' || !selectedDayHasFixture ? (
                <div
                  className="space-y-3"
                  data-schedule-summary-population={activeView === 'Day' ? `empty-${days[selectedDay].date}` : `${activeView.toLowerCase()}-not-aggregated`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-[80px] w-[80px] shrink-0 items-center justify-center rounded-full border-4 border-dashed border-white/10" aria-hidden="true" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[14px] font-medium text-paper-100">
                        {activeView === 'Day' ? `No schedule summary for ${days[selectedDay].name}` : `${activeView} totals are not inferred`}
                      </p>
                      <p className="mt-1 text-[12px] leading-5 text-paper-100/70">
                        {activeView === 'Day'
                          ? 'No event or waking-window fixture exists for this date, so Thursday’s domain split and fullness are hidden.'
                          : 'This preview has one populated date only. Open Thursday in Day view for its domain split and waking-window population.'}
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-white/[0.06] pt-3">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-[12px] font-semibold uppercase leading-4 text-paper-100/65">Scheduled population</span>
                      <span className="text-[12px] font-medium text-paper-100/65">Honest-null</span>
                    </div>
                    <p className="mt-2 text-[12px] leading-4 text-paper-100/65">No daily figures are borrowed across dates or promoted into week/month aggregates.</p>
                  </div>
                </div>
              ) : isRevoked ? (
                <div className="flex items-center gap-4">
                  <div className="flex h-[80px] w-[80px] shrink-0 items-center justify-center rounded-full border-4 border-dashed border-white/10" aria-hidden="true" />
                  <p className="text-[13px] leading-5 text-paper-100/70">Nothing synced — reconnect your calendar to see the domain split again.</p>
                </div>
              ) : (
                // Local legibility override: lift the kit donut label to the frozen 12px semantic-copy floor.
                <div className="flex items-center gap-4 [&_[role=img]_span:last-child]:!text-[12px] [&_[role=img]_span:last-child]:!text-paper-100/70">
                  <DonutHub
                    size={80}
                    value={isOverpacked ? '6h 30m' : '2h 15m'}
                    label="Scheduled"
                    segments={[
                      { percent: isOverpacked ? 73 : 66.7, className: 'stroke-domain-career', label: 'Career' },
                      { percent: isOverpacked ? 27 : 33.3, className: 'stroke-domain-fitness', label: 'Fitness' },
                    ]}
                  />
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="text-[12px] font-semibold text-paper-100/80">{isOverpacked ? '6h 30m · Scheduled focus (Career + Fitness)' : '2h 15m · Scheduled focus (Career + Fitness)'}</p>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 shrink-0 rounded-sm bg-domain-career" aria-hidden="true" />
                      <span className="text-[12px] text-white/70">Career</span>
                      <span className="text-[12px] font-medium text-paper-100/65 tabular-nums">{isOverpacked ? '4h 45m' : '1h 30m'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 shrink-0 rounded-sm bg-domain-fitness" aria-hidden="true" />
                      <span className="text-[12px] text-white/70">Fitness</span>
                      <span className="text-[12px] font-medium text-paper-100/65 tabular-nums">{isOverpacked ? '1h 45m' : '45m'}</span>
                    </div>
                    <ReadableProvenance items={['Via Google Calendar']} />
                  </div>
                </div>
              )}
              {activeView === 'Day' && selectedDayHasFixture && <div className="mt-3 border-t border-white/[0.06] pt-3" data-schedule-summary-population="day-7">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-[12px] font-semibold uppercase leading-4 text-paper-100/65">Day fullness</span>
                  <span className="text-[12px] font-medium text-paper-100/65 tabular-nums">
                    {isRevoked ? 'Honest-null' : isOverpacked ? '13h 45m of 16h waking window · includes routines' : '4h 30m of 16h waking window · includes routines'}
                  </span>
                </div>
                <div className="mt-2">
                  <ChargeMeter
                    ticks={16}
                    filled={isRevoked ? 0 : isOverpacked ? 14 : 4}
                    label={isRevoked ? 'No scheduled time known' : isOverpacked ? '13h 45m of 16 waking hours scheduled, includes routines' : '4h 30m of 16 waking hours scheduled, includes routines'}
                  />
                </div>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <span className="text-[12px] font-medium text-brand-orange">
                    {isRevoked ? 'Room to breathe today' : isOverpacked ? 'A full one — protect some recovery' : 'Room to breathe'}
                  </span>
                  {!isRevoked && <ReadableProvenance items={['Via sleep schedule']} />}
                </div>
                <p className="mt-2 text-[12px] leading-4 text-paper-100/65">
                  Scheduled focus counts calendar events only; the waking-window figure also includes routines like meals and commute.
                </p>
              </div>}
            </SolidCard>

            <section>
              <SectionTitle title="Unscheduled" meta={`${unscheduled.length} items`} />
              <div className="mt-2 space-y-2">
                {unscheduled.map((item, index) => (
                  <div key={item.id} className="flex min-h-14 items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] py-1.5 pl-4 pr-2">
                    <span className={cx('h-2 w-2 shrink-0 rounded-full', item.dotClass)} aria-hidden="true" />
                    <button
                      type="button"
                      className="focus-ring min-w-0 flex-1 rounded-lg py-1 text-left"
                      onClick={() => setStatus(`${item.title} opened in this preview. Drag-to-schedule is not part of this fixture; no external action taken.`)}
                    >
                      <span className="block text-[14px] font-medium text-white">{item.title}</span>
                      <span className="block text-[12px] text-paper-100/65">{item.meta}</span>
                    </button>
                    <button
                      type="button"
                      aria-label={index === 0 ? `Move ${item.title} up — unavailable, already first` : `Move ${item.title} up`}
                      disabled={index === 0}
                      className="focus-ring flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-paper-100/65 disabled:opacity-30"
                      onClick={() => moveUnscheduled(index, -1)}
                    >
                      <ArrowUp size={16} strokeWidth={2} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      aria-label={index === unscheduled.length - 1 ? `Move ${item.title} down — unavailable, already last` : `Move ${item.title} down`}
                      disabled={index === unscheduled.length - 1}
                      className="focus-ring flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-paper-100/65 disabled:opacity-30"
                      onClick={() => moveUnscheduled(index, 1)}
                    >
                      <ArrowDown size={16} strokeWidth={2} aria-hidden="true" />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {isRevoked || activeView !== 'Day' || !selectedDayHasFixture ? (
              <GlassCard tone="muted">
                <p className="text-[13px] leading-5 text-paper-100/70">
                  {isRevoked
                    ? 'CIA suggestions pause without calendar or wake-window access — nothing is inferred from hidden data.'
                    : activeView !== 'Day'
                      ? `CIA suggestions stay in the populated Day view; no ${activeView.toLowerCase()} pattern is inferred from one fixture date.`
                      : `No CIA suggestion for ${days[selectedDay].name} because this preview has no event or waking-window population for that date.`}
                </p>
              </GlassCard>
            ) : (
              <CIAInsightCard
                className="[&>div>div>div.mt-3>div>span]:!text-[12px] [&>div>div>p:first-child]:!text-[12px]"
                eyebrow="CIA suggestion"
                provenance={['Via Google Calendar + wake window']}
                actions={
                  <>
                    <BtnGhost quiet onClick={() => setStatus('CIA suggestion dismissed in this preview.')}>Dismiss</BtnGhost>
                    <BtnGhost onClick={() => setStatus(isOverpacked ? 'Recovery slot highlighted on the timeline in this preview.' : 'Suggested slot highlighted on the timeline — the dashed 1 PM block.')}>See it</BtnGhost>
                  </>
                }
              >
                <p className="text-[15px] leading-[21px] text-white">
                  {isOverpacked ? (
                    <>Your afternoon is packed. A 15-minute <span className="text-emphasis">wind-down</span> before your 6 PM block protects tomorrow&rsquo;s energy.</>
                  ) : (
                    <>Open time this afternoon for a short <span className="text-emphasis">walk</span> &mdash; see below.</>
                  )}
                </p>
              </CIAInsightCard>
            )}

            <GlassCard tone="muted">
              <p className="text-[12px] leading-4 text-paper-100/65">
                Schedule reads calendar events and your sleep window to keep the day honest, not fabricated.
              </p>
              <div className="[&_a]:!text-[12px]"><ConsentRail compact /></div>
            </GlassCard>
          </>
        )}

        <p className="min-h-5 text-[12px] leading-5 text-paper-100/70" role="status" aria-live="polite" aria-atomic="true">{status}</p>
      </main>
      </HifiShell>
    </div>
  )
}
