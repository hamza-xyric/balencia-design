'use client'

import { useEffect, useRef, useState } from 'react'
import { Droplets, Info, Plus, Settings, Trash2, WifiOff } from 'lucide-react'
import {
  BtnSecondary,
  ChargeMeter,
  Chip,
  CIAInsightCard,
  ConsentRail,
  FloatingQuickLog,
  GlassCard,
  HifiShell,
  IconButton,
  MomentumBar,
  Provenance,
  ProgressRing,
  SectionTitle,
  SolidCard,
  TopBar,
} from '@/components/hifi/kit'

// Water intake. `?state=` fixtures: default, skeleton, empty (honest-null
// hero/log/chart/stats), error (sync failed, cached values + retry),
// offline (entries queue locally as Pending), success (8 of 8, ring flips
// green, XP honestly omitted). Quick-add and delete are local-only with
// confirm + undo; no Health, Strava, or network request is ever made.

type WaterState = 'default' | 'skeleton' | 'empty' | 'error' | 'offline' | 'success'

const WATER_STATES: WaterState[] = ['default', 'skeleton', 'empty', 'error', 'offline', 'success']

type LogEntry = { id: number; amount: string; ml: number; time: string; synced: boolean }

// Delete affordance + confirmation always name the exact ml target, even for glass-denominated rows.
const exactAmount = (entry: LogEntry) => (entry.amount.includes('ml') ? entry.amount : `${entry.amount} (${entry.ml} ml)`)

// Weekly intake stays day-keyed so the rendered bar, accessible summary,
// and visible honest-null explanation cannot drift onto different weekdays.
const weeklyIntake: Array<{ label: string; name: string; glasses: number | null }> = [
  { label: 'M', name: 'Monday', glasses: 7 },
  { label: 'T', name: 'Tuesday', glasses: 6 },
  { label: 'W', name: 'Wednesday', glasses: null },
  { label: 'T', name: 'Thursday', glasses: 8 },
  { label: 'F', name: 'Friday', glasses: 5 },
  { label: 'S', name: 'Saturday', glasses: 6 },
  { label: 'S', name: 'Sunday', glasses: 5 },
]
const weeklyGapDay = weeklyIntake.find(day => day.glasses === null) ?? weeklyIntake[0]
const weeklyMax = 10
const weeklyTarget = 8

const GLASS_ML = 250
const TARGET_GLASSES = 8
const TARGET_ML = TARGET_GLASSES * GLASS_ML

const defaultLog: LogEntry[] = [
  { id: 1, amount: '1 glass', ml: 250, time: '7:40 AM', synced: true },
  { id: 2, amount: '250 ml', ml: 250, time: '10:15 AM', synced: true },
  { id: 3, amount: '250 ml', ml: 250, time: '11:30 AM', synced: true },
  { id: 4, amount: '500 ml', ml: 500, time: '1:45 PM', synced: false },
]

const successLog: LogEntry[] = [
  ...defaultLog.map(entry => ({ ...entry, synced: true })),
  { id: 5, amount: '250 ml', ml: 250, time: '2:15 PM', synced: true },
  { id: 6, amount: '500 ml', ml: 500, time: '4:30 PM', synced: true },
]

function ReadableProvenance({ items }: { items: string[] }) {
  return <div className="[&_span]:!text-[12px]"><Provenance items={items} /></div>
}

export function S44WaterIntake() {
  const [screenState, setScreenState] = useState<WaterState>('default')
  const [entries, setEntries] = useState<LogEntry[]>(defaultLog)
  const [confirmingId, setConfirmingId] = useState<number | null>(null)
  const [lastDeleted, setLastDeleted] = useState<{ entry: LogEntry; index: number } | null>(null)
  const [nextId, setNextId] = useState(100)
  const [status, setStatus] = useState('Water intake visual fixture ready. No Apple Health or network request was made.')
  const deleteDialogRef = useRef<HTMLDivElement>(null)
  const cancelDeleteRef = useRef<HTMLButtonElement>(null)
  const confirmDeleteRef = useRef<HTMLButtonElement>(null)
  const deleteReturnFocusRef = useRef<HTMLButtonElement | null>(null)
  const undoDeleteRef = useRef<HTMLButtonElement>(null)
  const logFallbackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fixture = new URLSearchParams(window.location.search).get('state') as WaterState | null
    if (!fixture || !WATER_STATES.includes(fixture)) return
    const timer = window.setTimeout(() => {
      setScreenState(fixture)
      if (fixture === 'empty') setEntries([])
      if (fixture === 'success') setEntries(successLog)
      setStatus(
        fixture === 'skeleton'
          ? 'Quick add is disabled while the hydration skeleton loads.'
          : fixture === 'empty'
            ? 'Nothing logged yet — building capacity. Your drinks will appear here.'
            : fixture === 'error'
              ? 'Sync with Apple Health failed. Showing your last synced values, from 2 minutes ago.'
              : fixture === 'offline'
                ? 'Offline — new entries queue on this device and sync later.'
                : fixture === 'success'
                  ? 'Target reached — 8 of 8 glasses. No XP value was returned, so none is shown.'
                  : 'Water intake fixture loaded. No Apple Health or network request was made.',
      )
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (confirmingId === null) return
    const timer = window.setTimeout(() => cancelDeleteRef.current?.focus(), 0)
    return () => window.clearTimeout(timer)
  }, [confirmingId])

  const totalMl = entries.reduce((sum, entry) => sum + entry.ml, 0)
  const glassesEquivalent = Math.round((totalMl / GLASS_ML) * 10) / 10
  const percent = Math.round((totalMl / TARGET_ML) * 100)
  const goalReached = totalMl >= TARGET_ML
  const toGo = Math.max(0, Math.ceil((TARGET_ML - totalMl) / GLASS_ML))
  const isEmpty = entries.length === 0

  const addEntry = (label: string, ml: number) => {
    setEntries(current => [...current, { id: nextId, amount: label, ml, time: 'Just now', synced: false }])
    setNextId(id => id + 1)
    setStatus(
      screenState === 'offline'
        ? `${label} queued locally while offline — it will sync when you reconnect. Total is now ${totalMl + ml} ml.`
        : `${label} added in this preview — pending sync. Total is now ${totalMl + ml} ml.`,
    )
  }

  const openDeleteConfirmation = (entry: LogEntry, trigger: HTMLButtonElement) => {
    deleteReturnFocusRef.current = trigger
    setConfirmingId(entry.id)
    setStatus(`Delete confirmation opened for ${exactAmount(entry)} logged at ${entry.time}. Nothing has been deleted.`)
  }

  const closeDeleteConfirmation = () => {
    setConfirmingId(null)
    setStatus('Delete canceled. The water entry is unchanged.')
    window.setTimeout(() => {
      if (deleteReturnFocusRef.current?.isConnected) deleteReturnFocusRef.current.focus()
    }, 0)
  }

  const handleDeleteDialogKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      closeDeleteConfirmation()
      return
    }
    if (event.key !== 'Tab') return
    const first = cancelDeleteRef.current
    const last = confirmDeleteRef.current
    if (!first || !last) return
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  const confirmDelete = (entry: LogEntry) => {
    const index = entries.findIndex(item => item.id === entry.id)
    setLastDeleted({ entry, index: Math.max(0, index) })
    setEntries(current => current.filter(item => item.id !== entry.id))
    setConfirmingId(null)
    setStatus(`Deleted ${entry.amount} · ${entry.time} from this preview. Undo is available below.`)
    window.setTimeout(() => {
      const destination = undoDeleteRef.current ?? logFallbackRef.current
      destination?.focus()
    }, 0)
  }

  const undoDelete = () => {
    if (!lastDeleted) return
    const { entry, index } = lastDeleted
    setEntries(current => {
      const next = [...current]
      next.splice(Math.min(index, next.length), 0, entry)
      return next
    })
    setLastDeleted(null)
    setStatus(`Delete undone — ${entry.amount} · ${entry.time} restored.`)
  }

  const quickAddDisabled = screenState === 'skeleton'
  const confirmingEntry = confirmingId === null ? null : entries.find(entry => entry.id === confirmingId) ?? null

  return (
    <div className="contents [&_[data-chip-interactive]]:!text-[12px] [&_nav_span]:!text-[12px]">
      <HifiShell
      atmosphere="you"
      activeTab="today"
      bottomAction={screenState === 'skeleton' ? undefined : <FloatingQuickLog label="Log water" href="/screens/44?action=log-water" />}
      overlay={confirmingEntry ? (
        <div className="absolute inset-0 z-[60] flex items-end bg-ink-900/85 p-4" role="presentation">
          <div
            ref={deleteDialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="water-delete-title"
            aria-describedby="water-delete-description"
            className="action-sheet-surface glass-card w-full p-5 shadow-3"
            onKeyDown={handleDeleteDialogKeyDown}
          >
            <h2 id="water-delete-title" className="text-[18px] font-semibold leading-6 text-paper-100">
              Delete {exactAmount(confirmingEntry)}?
            </h2>
            <p id="water-delete-description" className="mt-2 text-[13px] leading-5 text-paper-100/70">
              This removes the {exactAmount(confirmingEntry)} entry logged at {confirmingEntry.time} from today&rsquo;s local preview. Undo remains available after deletion.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                ref={cancelDeleteRef}
                type="button"
                className="focus-ring hifi-action glass-pill h-12 w-full px-5 text-[15px] font-medium text-paper-100"
                onClick={closeDeleteConfirmation}
              >
                Cancel
              </button>
              <button
                ref={confirmDeleteRef}
                type="button"
                className="focus-ring hifi-action hifi-action-danger h-12 w-full rounded-pill px-5 text-[15px] font-semibold"
                onClick={() => confirmDelete(confirmingEntry)}
              >
                Delete entry
              </button>
            </div>
          </div>
        </div>
      ) : undefined}
      header={
        <TopBar
          title="Water intake"
          right={
            <IconButton label="Open target and unit settings" onClick={() => setStatus('Target and unit settings preview opened locally. Nothing was saved externally.')}>
              <Settings size={19} strokeWidth={1.9} />
            </IconButton>
          }
        />
      }
    >
      <main className="space-y-4 px-4 pb-4 pt-3" data-water-state={screenState} aria-busy={screenState === 'skeleton'}>
        {screenState === 'offline' && (
          <div className="flex items-start gap-2 rounded-xl border border-white/10 bg-surface-2 px-3 py-2 text-[12px] leading-4 text-paper-100/70">
            <WifiOff aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
            Offline — new entries queue on this device as pending and sync when you reconnect.
          </div>
        )}
        {screenState === 'error' && (
          <div className="rounded-xl border border-white/10 bg-surface-2 px-3 py-2.5">
            <p className="text-[12px] leading-4 text-paper-100/70">
              Couldn&rsquo;t sync with Apple Health — showing your last synced values, from 2 minutes ago. Local logging still works.
            </p>
            <BtnSecondary className="mt-2 h-11 px-4 text-[13px]" onClick={() => setStatus('Retry preview selected. No Apple Health or network request was made.')}>
              Try again
            </BtnSecondary>
          </div>
        )}

        {screenState === 'skeleton' ? (
          <div className="space-y-4" aria-label="Loading water intake preview">
            <div className="skeleton-block h-80 rounded-[28px]" />
            <div className="grid grid-cols-4 gap-2">
              {[0, 1, 2, 3].map(index => <div key={index} className="skeleton-block h-11 rounded-xl" />)}
            </div>
            <div className="skeleton-block h-44 rounded-2xl" />
            <div className="skeleton-block h-40 rounded-2xl" />
            <p className="text-[12px] leading-4 text-paper-100/65">Quick add unlocks once your target is known.</p>
          </div>
        ) : (
          <>
            <GlassCard tone={goalReached ? 'done' : 'you'}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[12px] font-semibold uppercase leading-4 text-paper-100/65">To target</p>
                  <p className="mt-1 text-[20px] font-semibold leading-6 text-white tabular-nums">
                    {isEmpty ? '8 to go' : goalReached ? 'Target reached' : `${toGo} to go`}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="View Apple Health data source details"
                  className="focus-ring flex min-h-11 items-center gap-2 rounded-pill border border-white/10 bg-white/[0.04] py-1.5 pl-2 pr-3"
                  onClick={() => setStatus('Apple Health source details preview: hydration category, water-only scope, synced 2 minutes ago, kept until revoked.')}
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-forest-green/15">
                    <Droplets size={14} className="text-forest-green" strokeWidth={2} aria-hidden="true" />
                  </span>
                  <span className="flex items-center gap-1 text-[12px] font-medium text-white/85">
                    Via Apple Health
                    <Info size={13} className="text-white/40" strokeWidth={2} aria-hidden="true" />
                  </span>
                </button>
              </div>

              {/* Local legibility override: lift the kit ring label to the frozen 12px semantic-copy floor. */}
              <div className="mt-2 flex flex-col items-center py-3 [&_[role=img]_span:last-child]:!text-[12px] [&_[role=img]_span:last-child]:!text-paper-100/70">
                <ProgressRing
                  percent={isEmpty ? 0 : percent}
                  value={isEmpty ? '0%' : `${percent}%`}
                  label="To target"
                  size={180}
                  tone={goalReached ? 'done' : 'you'}
                  ghost={isEmpty}
                />
                <p className="mt-4 text-center text-[15px] leading-5 text-white/80">
                  {isEmpty ? (
                    <>0 of 8 glasses &mdash; building capacity</>
                  ) : (
                    <>{glassesEquivalent} of 8 glasses toward today&apos;s <span className="text-emphasis">intake</span></>
                  )}
                </p>
                {goalReached && (
                  <p className="mt-1 text-center text-[13px] font-medium text-forest-green">Daily hydration target complete — nicely paced through the day.</p>
                )}
              </div>

              <div className="mt-3 grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
                <div>
                  <p className="text-[12px] font-semibold uppercase leading-4 text-paper-100/65">Volume</p>
                  <p className="mt-1 text-[18px] font-semibold leading-6 text-white/90 tabular-nums">{totalMl} ml</p>
                  <p className="text-[12px] leading-4 text-paper-100/65 tabular-nums">{percent}% of daily target</p>
                </div>
                <div className="flex flex-col justify-end gap-2">
                  <MomentumBar value={Math.min(percent, 100)} label={`Momentum, ${percent} percent of daily target`} />
                  <ChargeMeter ticks={8} filled={Math.min(Math.floor(totalMl / GLASS_ML), 8)} label={`Reserve to target, ${Math.min(Math.floor(totalMl / GLASS_ML), 8)} of 8 glasses filled`} />
                </div>
              </div>
            </GlassCard>

            <div className="grid grid-cols-4 gap-2">
              {([
                ['1 glass', 'Log 1 glass of water', 250],
                ['250 ml', 'Log 250 ml of water', 250],
                ['500 ml', 'Log 500 ml of water', 500],
              ] as const).map(([label, ariaLabel, ml]) => (
                <button
                  key={label}
                  type="button"
                  aria-label={ariaLabel}
                  disabled={quickAddDisabled}
                  className="focus-ring flex min-h-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-1 text-[12px] font-medium text-white/90 tabular-nums disabled:opacity-40"
                  onClick={() => addEntry(label, ml)}
                >
                  {label}
                </button>
              ))}
              <button
                type="button"
                aria-label="Log a custom amount of water"
                disabled={quickAddDisabled}
                className="focus-ring flex min-h-11 items-center justify-center gap-1 rounded-xl border border-white/10 bg-white/[0.04] px-1 text-[12px] font-medium text-white/90 disabled:opacity-40"
                onClick={() => setStatus('Custom amount sheet preview opened locally. Nothing was logged yet.')}
              >
                <Plus size={13} strokeWidth={2.2} aria-hidden="true" />
                Custom
              </button>
            </div>

            <SolidCard className="p-0">
              <div ref={logFallbackRef} tabIndex={-1} className="flex items-center justify-between p-4 pb-2">
                <SectionTitle title="Today's log" meta={`${entries.length} ${entries.length === 1 ? 'entry' : 'entries'}`} />
              </div>
              {isEmpty ? (
                <p className="px-4 pb-4 text-[13px] leading-5 text-paper-100/65">Your drinks will appear here.</p>
              ) : (
                <div className="divide-y divide-white/[0.05]">
                  {entries.map(entry => (
                    <div key={entry.id} className="min-h-[52px] px-4 py-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex min-w-0 items-center gap-3">
                          <Droplets size={15} className="shrink-0 text-white/40" strokeWidth={1.9} aria-hidden="true" />
                          <span className="text-[14px] font-medium text-white/90 tabular-nums">{entry.amount}</span>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                          <span className="text-[12px] text-paper-100/65 tabular-nums">{entry.time}</span>
                          <Chip tone={entry.synced ? 'done' : 'muted'} className="!text-[12px]">{entry.synced ? 'Synced' : 'Pending'}</Chip>
                          <button
                            type="button"
                            aria-label={`Delete ${exactAmount(entry)} logged at ${entry.time}`}
                            aria-expanded={confirmingId === entry.id}
                            aria-haspopup="dialog"
                            className="focus-ring flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.06] text-paper-100/65"
                            onClick={event => openDeleteConfirmation(entry, event.currentTarget)}
                          >
                            <Trash2 size={15} strokeWidth={1.9} aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </SolidCard>

            <SolidCard>
              <div className="flex items-center justify-between">
                <SectionTitle title="This week" />
                <ReadableProvenance items={['Via Apple Health']} />
              </div>
              {isEmpty ? (
                <div className="mt-4 flex h-24 items-center justify-center rounded-xl border border-dashed border-white/15">
                  <p className="text-[13px] text-paper-100/65">Log water to see your week.</p>
                </div>
              ) : (
                <>
                  <div
                    className="relative mt-4 flex h-24 items-end justify-between gap-2"
                    role="img"
                    aria-label={`Weekly water intake bar chart against an 8 glass daily target. ${weeklyGapDay.name} had no log.`}
                  >
                    <div
                      className="absolute inset-x-0 border-t border-dashed border-white/20"
                      style={{ bottom: `${(weeklyTarget / weeklyMax) * 100}%` }}
                    />
                    {weeklyIntake.map(day => (
                      <div key={day.name} className="flex flex-1 flex-col items-center gap-2">
                        <div className="flex w-full flex-1 items-end justify-center">
                          {day.glasses === null ? (
                            <div className="h-[30%] w-full max-w-[22px] rounded-md border border-dashed border-white/15" />
                          ) : (
                            <div
                              className="w-full max-w-[22px] rounded-md bg-brand-orange/70"
                              style={{ height: `${(day.glasses / weeklyMax) * 100}%` }}
                            />
                          )}
                        </div>
                        <span className="text-[12px] font-semibold uppercase leading-4 text-paper-100/65">{day.label}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 border-t border-white/[0.05] pt-3 text-[12px] leading-4 text-paper-100/65">
                    Dashed line marks the daily target. {weeklyGapDay.name}&apos;s gap means no entry was logged.
                  </p>
                </>
              )}
            </SolidCard>

            <div className="space-y-2">
              {!isEmpty && <ReadableProvenance items={['Via Apple Health', 'All-time']} />}
              <div className="grid grid-cols-3 gap-3">
                <SolidCard className="flex flex-col items-center py-3">
                  <span className="text-[12px] font-semibold uppercase leading-4 text-paper-100/65">Streak</span>
                  <span className="mt-1.5 text-[19px] font-semibold leading-6 text-white tabular-nums">{isEmpty ? '—' : '12'}</span>
                  <span className="text-[12px] leading-4 text-paper-100/65">Days</span>
                </SolidCard>
                <SolidCard className="flex flex-col items-center py-3">
                  <span className="text-[12px] font-semibold uppercase leading-4 text-paper-100/65">Average</span>
                  <span className="mt-1.5 text-[19px] font-semibold leading-6 text-white tabular-nums">{isEmpty ? '—' : '6.5'}</span>
                  <span className="text-[12px] leading-4 text-paper-100/65">Glasses</span>
                </SolidCard>
                <SolidCard className="flex flex-col items-center py-3">
                  <span className="text-[12px] font-semibold uppercase leading-4 text-paper-100/65">Best</span>
                  <span className="mt-1.5 text-[19px] font-semibold leading-6 text-white tabular-nums">{isEmpty ? '—' : '9'}</span>
                  <span className="text-[12px] leading-4 text-paper-100/65">Glasses</span>
                </SolidCard>
              </div>
              {isEmpty && <p className="text-[12px] leading-4 text-paper-100/65">Your hydration streak starts today.</p>}
            </div>

            {!isEmpty && (
              <CIAInsightCard
                className="[&>div>div>div.mt-3>div>span]:!text-[12px] [&>div>div>p:first-child]:!text-[12px]"
                provenance={['Via Strava run · today 7:05 am', 'Window: last 24h']}
                actions={
                  <button
                    type="button"
                    aria-label="Log 250 milliliters after today's run"
                    className="focus-ring flex min-h-11 items-center gap-2 rounded-pill border border-white/10 bg-white/[0.04] px-4 text-[13px] font-medium text-white/90"
                    onClick={() => addEntry('250 ml', 250)}
                  >
                    <Plus size={14} strokeWidth={2.2} aria-hidden="true" />
                    Log 250 ml
                  </button>
                }
              >
                You logged a run this morning. An extra 250 ml this afternoon usually helps you finish the day comfortably hydrated.
              </CIAInsightCard>
            )}

            <SolidCard>
              <SectionTitle title="Data and consent" meta="Apple Health" />
              <dl className="mt-3 space-y-2 text-[13px] leading-4">
                <div className="flex items-center justify-between border-b border-white/[0.05] pb-2">
                  <dt className="text-paper-100/65">Category</dt>
                  <dd className="text-white/85">Hydration</dd>
                </div>
                <div className="flex items-center justify-between border-b border-white/[0.05] pb-2">
                  <dt className="text-paper-100/65">Scope</dt>
                  <dd className="text-white/85">Water only</dd>
                </div>
                <div className="flex items-center justify-between border-b border-white/[0.05] pb-2">
                  <dt className="text-paper-100/65">Freshness</dt>
                  <dd className="text-white/85 tabular-nums">{screenState === 'error' || screenState === 'offline' ? 'Last synced 2 minutes ago' : 'Synced 2 minutes ago'}</dd>
                </div>
                <div className="flex items-center justify-between pb-1">
                  <dt className="text-paper-100/65">Retention</dt>
                  <dd className="text-white/85">Until revoked</dd>
                </div>
              </dl>
              <div className="[&_a]:!text-[12px]"><ConsentRail compact /></div>
              <p className="mt-3 text-[12px] leading-4 text-paper-100/65">Coaching support, not medical advice.</p>
            </SolidCard>
          </>
        )}

        <div className="flex items-start justify-between gap-2">
          <p className="min-h-5 flex-1 text-[12px] leading-5 text-paper-100/70" role="status" aria-live="polite" aria-atomic="true">{status}</p>
          {lastDeleted && (
            <button
              ref={undoDeleteRef}
              type="button"
              className="focus-ring flex min-h-11 shrink-0 items-center rounded-pill border border-white/15 bg-white/[0.06] px-4 text-[13px] font-semibold text-paper-100"
              onClick={undoDelete}
            >
              Undo delete
            </button>
          )}
        </div>
      </main>
      </HifiShell>
    </div>
  )
}
