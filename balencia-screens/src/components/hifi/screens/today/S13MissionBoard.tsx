'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { BookOpen, Check, Flag, Plus, SlidersHorizontal, WifiOff } from 'lucide-react'
import {
  Chip,
  DEFAULT_LIFE_DOMAINS,
  FloatingQuickLog,
  GlassCard,
  HifiShell,
  IconButton,
  LifePowerRadar,
  MetricPill,
  ProgressBar,
  SectionTitle,
  SolidCard,
  TopBar,
  cx,
} from '@/components/hifi/kit'

type MissionBoardState = 'default' | 'skeleton' | 'empty' | 'filtered-empty' | 'error' | 'offline' | 'success'
type StatusFilter = 'Active' | 'Done' | 'All'
type MissionType = 'Life' | 'Main' | 'Side' | 'Weekly' | 'Daily' | 'Group'
type MissionIdentity = 'sunlight' | 'q3-report' | 'run-5k' | 'hydrate'

const BOARD_STATES: MissionBoardState[] = ['default', 'skeleton', 'empty', 'filtered-empty', 'error', 'offline', 'success']
const STATUS_FILTERS: StatusFilter[] = ['Active', 'Done', 'All']
const MISSION_TYPES: MissionType[] = ['Life', 'Main', 'Side', 'Weekly', 'Daily', 'Group']

// Registry domain names only (LIFE_DOMAIN_ORDER). Mission type is a separate
// axis — "Daily" is a mission type, never a domain.
const missions: Array<{ id: MissionIdentity; name: string; progress: number; type: MissionType; domain: string }> = [
  { id: 'sunlight', name: 'Morning sunlight', progress: 72, type: 'Daily', domain: 'Wellbeing' },
  { id: 'q3-report', name: 'Finalize Q3 report', progress: 46, type: 'Main', domain: 'Career' },
  { id: 'run-5k', name: 'Run 5K', progress: 61, type: 'Side', domain: 'Fitness' },
  { id: 'hydrate', name: 'Hydrate', progress: 100, type: 'Daily', domain: 'Wellbeing' },
]

function BoardSegmentedControl({
  label,
  options,
  value,
  onChange,
  disabled = false,
  describedBy,
}: {
  label: string
  options: readonly StatusFilter[]
  value: StatusFilter
  onChange: (next: StatusFilter) => void
  disabled?: boolean
  describedBy?: string
}) {
  const refs = useRef<Array<HTMLButtonElement | null>>([])
  const handleKeyDown = (event: React.KeyboardEvent) => {
    const focusedIndex = refs.current.findIndex(element => element === document.activeElement)
    const index = focusedIndex >= 0 ? focusedIndex : options.indexOf(value)
    let next = -1
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % options.length
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + options.length) % options.length
    else return
    event.preventDefault()
    onChange(options[next])
    refs.current[next]?.focus()
  }
  return (
    <div role="group" aria-label={label} onKeyDown={handleKeyDown} className="grid grid-cols-3 gap-1 rounded-xl bg-white/[0.04] p-1">
      {options.map((option, index) => (
        <button
          key={option}
          ref={element => { refs.current[index] = element }}
          type="button"
          aria-pressed={option === value}
          disabled={disabled}
          aria-describedby={disabled ? describedBy : undefined}
          onClick={() => onChange(option)}
          className={cx(
            'focus-ring flex h-11 items-center justify-center rounded-lg text-[12px] font-medium disabled:opacity-40',
            option === value ? 'bg-white/10 text-paper-100' : 'text-paper-100/60',
          )}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

export function S13MissionBoard() {
  const [screenState, setScreenState] = useState<MissionBoardState>('default')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All')
  const [typeFilter, setTypeFilter] = useState<MissionType[]>([])
  const [completed, setCompleted] = useState<Record<string, boolean>>({})
  const [filtersOpen, setFiltersOpen] = useState(true)
  const [status, setStatus] = useState('Mission board visual fixture ready. Counts read from the missions ledger fixture — nothing was fetched.')

  useEffect(() => {
    const fixture = new URLSearchParams(window.location.search).get('state') as MissionBoardState | null
    if (!fixture || !BOARD_STATES.includes(fixture)) return
    const timer = window.setTimeout(() => {
      setScreenState(fixture)
      if (fixture === 'filtered-empty') setTypeFilter(['Group'])
      if (fixture === 'success') setCompleted({ 'run-5k': true })
      setStatus(
        fixture === 'skeleton'
          ? 'Loading the mission board skeleton. Filters and the new-mission action are disabled until it resolves.'
          : fixture === 'empty'
            ? 'No missions yet in this preview. Board metrics show honest nulls until your first mission exists.'
            : fixture === 'filtered-empty'
              ? 'Group filter applied — no missions match. Clear a filter to see the board again.'
              : fixture === 'error'
                ? 'Couldn’t load your missions — showing the cached board. No network request was made.'
                : fixture === 'offline'
                  ? 'Offline — showing your last synced board, 2 hours ago. Completions queue locally.'
                  : fixture === 'success'
                    ? '+40 XP preview · “Run 5K” completed in this local preview. Undo by tapping its ring.'
                    : `${fixture} mission board fixture loaded.`,
      )
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  const isDone = (mission: (typeof missions)[number]) => completed[mission.id] ?? mission.progress === 100
  const controlsLocked = screenState === 'skeleton' || screenState === 'offline'

  const toggleComplete = (mission: (typeof missions)[number]) => {
    const nowDone = !isDone(mission)
    setCompleted(current => ({ ...current, [mission.id]: nowDone }))
    const queued = screenState === 'offline' ? ' Queued locally — will sync when back online.' : ''
    setStatus(
      nowDone
        ? `+40 XP preview · “${mission.name}” completed in this local preview. Undo by tapping its ring.${queued}`
        : `“${mission.name}” reopened locally — the +40 XP preview was removed.${queued}`,
    )
  }

  const toggleType = (type: MissionType) => {
    setTypeFilter(current => {
      const next = current.includes(type) ? current.filter(entry => entry !== type) : [...current, type]
      setStatus(next.length === 0 ? 'Type filters cleared — showing every mission type.' : `Filtering by ${next.join(', ')} missions.`)
      return next
    })
  }

  const visible = missions.filter(mission => {
    const done = isDone(mission)
    if (statusFilter === 'Active' && done) return false
    if (statusFilter === 'Done' && !done) return false
    if (typeFilter.length > 0 && !typeFilter.includes(mission.type)) return false
    return true
  })

  const activeCount = missions.filter(mission => !isDone(mission)).length
  const doneCount = missions.length - activeCount
  const boardEmpty = screenState === 'empty'
  const dataState: MissionBoardState =
    screenState === 'filtered-empty' && visible.length > 0
      ? 'default'
      : (screenState === 'default' || screenState === 'success') && visible.length === 0
        ? 'filtered-empty'
        : screenState
  const showFilteredEmpty = dataState === 'filtered-empty'

  return (
    <div className="flex-shrink-0 [&_[aria-label=Primary]_span]:text-[12px]">
    <HifiShell
      header={
        <TopBar
          title="Mission Board"
          eyebrow="Synced 2h ago"
          back={false}
          right={
            <div className="flex items-center gap-1">
              <Link
                href="/screens/73"
                aria-label="Open mission journal"
                className="focus-ring flex h-11 w-11 items-center justify-center rounded-full text-paper-100/70 transition-colors hover:text-paper-100"
              >
                <BookOpen size={19} strokeWidth={1.9} />
              </Link>
              <IconButton
                label="Filter"
                aria-expanded={filtersOpen}
                aria-controls="board-filters"
                aria-describedby={controlsLocked ? 'board-status' : undefined}
                disabled={controlsLocked}
                className="disabled:opacity-40"
                onClick={() => {
                  setFiltersOpen(open => {
                    setStatus(open ? 'Filter controls hidden.' : 'Filter controls shown.')
                    return !open
                  })
                }}
              >
                <SlidersHorizontal size={18} strokeWidth={1.9} />
              </IconButton>
            </div>
          }
        />
      }
      activeTab="goals"
      bottomAction={
        boardEmpty ? undefined : controlsLocked ? (
          <button
            type="button"
            disabled
            aria-describedby="board-status"
            className="hifi-action flex min-h-[52px] w-full items-center justify-between rounded-pill border border-brand-orange/20 bg-ink-brown-800 px-3 py-2 text-left opacity-40"
          >
            <span className="text-[13px] font-semibold text-paper-100/80">
              {screenState === 'offline' ? 'New mission — unavailable offline' : 'New mission — waiting for the board to load'}
            </span>
            <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full bg-cta-ember/60 text-paper-100">
              <Plus size={18} strokeWidth={2.4} />
            </span>
          </button>
        ) : (
          <FloatingQuickLog label="New mission" href="/screens/15" />
        )
      }
    >
      <main className="space-y-4 px-4 pb-4 pt-3 [&_[data-chip-interactive]]:text-[12px]" data-mission-board-state={dataState} aria-busy={screenState === 'skeleton'}>
        {screenState === 'offline' && (
          <div className="flex items-start gap-2 rounded-xl border border-white/10 bg-surface-2 px-3 py-2 text-[12px] leading-4 text-paper-100/70">
            <WifiOff aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
            Offline — showing your last synced board, 2h ago. Pull-to-refresh is unavailable.
          </div>
        )}
        {screenState === 'error' && (
          <div className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-surface-2 px-3 py-2">
            <p className="text-[12px] leading-4 text-paper-100/70">Couldn’t load your missions — showing the cached board.</p>
            <button
              type="button"
              className="focus-ring flex min-h-11 shrink-0 items-center rounded-pill px-3 text-[12px] font-semibold text-brand-orange"
              onClick={() => setStatus('Retry preview selected. No network request was made — the cached board stays.')}
            >
              Retry
            </button>
          </div>
        )}

        {screenState === 'skeleton' ? (
          <div className="space-y-3" aria-label="Loading mission board">
            <div className="grid grid-cols-3 gap-2">
              <div className="skeleton-block h-20 rounded-lg" />
              <div className="skeleton-block h-20 rounded-lg" />
              <div className="skeleton-block h-20 rounded-lg" />
            </div>
            <div className="skeleton-block h-40 rounded-[22px]" />
            <div className="skeleton-block h-11 rounded-xl" />
            <div className="skeleton-block h-24 rounded-xl" />
            <div className="skeleton-block h-24 rounded-xl" />
          </div>
        ) : boardEmpty ? (
          <>
            <section aria-label="Board summary">
              <div className="grid grid-cols-3 gap-2 [&>div>p:first-child]:text-[12px]">
                <MetricPill label="Active" value="--" />
                <MetricPill label="Done" value="--" />
                <MetricPill label="Streak" value="--" />
              </div>
              <p className="mt-1.5 px-1 text-[12px] leading-4 text-paper-100/60">Not enough data yet — metrics appear with your first mission.</p>
            </section>
            <div className="flex flex-col items-center gap-3 px-2 pb-2 pt-8 text-center">
              <h2 className="text-[24px] font-semibold leading-8 text-paper-100">No missions yet.</h2>
              <p className="text-[14px] leading-5 text-paper-100/70">
                Start with what matters most to you — <span className="text-emphasis">CIA</span> can help.
              </p>
              <Link
                href="/screens/15"
                className="focus-ring hifi-action hifi-action-primary mt-2 inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-pill px-6 text-[16px] font-semibold"
              >
                Create your first mission
              </Link>
              <div className="mt-1 flex flex-wrap justify-center gap-2" aria-label="Starter mission ideas">
                {['Run 5K', 'Save $5,000', 'Meditate daily'].map(idea => (
                  <Chip key={idea} interactive href="/screens/15" aria-label={`Start the ${idea} mission draft`}>
                    {idea}
                  </Chip>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <section aria-label="Board summary">
              <div className="grid grid-cols-3 gap-2 [&>div>p:first-child]:text-[12px]">
                <MetricPill label="Active" value={String(activeCount).padStart(2, '0')} tone="you" />
                <MetricPill label="Done" value={String(doneCount).padStart(2, '0')} tone="done" />
                <MetricPill label="Streak" value="07d" />
              </div>
              <p className="mt-1.5 px-1 text-[12px] leading-4 text-paper-100/60">
                Via missions ledger · {screenState === 'offline' ? 'last synced 2h ago' : 'synced 2h ago'}
              </p>
            </section>

            <GlassCard>
              <div className="grid grid-cols-[1fr_120px] gap-4">
                <div>
                  <p className="text-[12px] font-semibold uppercase text-paper-100/60">Whole-life map</p>
                  <h2 className="mt-2 text-[20px] font-semibold leading-6 text-white">Missions across <span className="text-emphasis">every</span> domain.</h2>
                  <p className="mt-2 text-[13px] leading-[18px] text-white/55">The board favors effort in progress, then completion.</p>
                </div>
                <div className="[&_[data-domain-count]_span:last-child]:text-[12px]">
                  <LifePowerRadar domains={DEFAULT_LIFE_DOMAINS} compact size={116} />
                </div>
              </div>
            </GlassCard>

            {filtersOpen && (
              <div id="board-filters" className="space-y-2">
                <BoardSegmentedControl
                  label="Mission status"
                  options={STATUS_FILTERS}
                  value={statusFilter}
                  disabled={controlsLocked}
                  describedBy="board-status"
                  onChange={next => {
                    setStatusFilter(next)
                    setStatus(`Showing ${next.toLowerCase()} missions.`)
                  }}
                />
                <div className="flex flex-wrap gap-2" role="group" aria-label="Mission type filters">
                  {MISSION_TYPES.map(type => (
                    <Chip
                      key={type}
                      interactive
                      pressed={typeFilter.includes(type)}
                      tone={typeFilter.includes(type) ? 'you' : 'muted'}
                      disabled={controlsLocked}
                      aria-describedby={controlsLocked ? 'board-status' : undefined}
                      className="disabled:opacity-40"
                      onClick={() => toggleType(type)}
                    >
                      {type}
                    </Chip>
                  ))}
                </div>
              </div>
            )}

            <SectionTitle title="Pinned" meta={`${visible.length} shown`} />
            {showFilteredEmpty ? (
              <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-8 text-center">
                <p className="text-[14px] font-medium text-paper-100/80">No missions here yet.</p>
                <p className="mt-1 text-[12px] leading-4 text-paper-100/60">Clear a status or type filter to see the board again.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {visible.map(mission => {
                  const done = isDone(mission)
                  const shownProgress = done ? 100 : mission.progress
                  return (
                    <SolidCard key={mission.id} className="py-3">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          aria-pressed={done}
                          aria-label={done ? `Reopen ${mission.name}` : `Mark ${mission.name} complete`}
                          onClick={() => toggleComplete(mission)}
                          className={cx(
                            'focus-ring flex h-11 w-11 shrink-0 items-center justify-center rounded-full',
                            done ? 'bg-forest-green text-white' : 'bg-brand-orange/15 text-brand-orange',
                          )}
                        >
                          {done ? <Check size={16} /> : <Flag size={15} />}
                        </button>
                        <Link
                          href={`/screens/14?mission=${encodeURIComponent(mission.id)}`}
                          aria-label={`Open ${mission.name} mission detail`}
                          className="focus-ring flex min-w-0 flex-1 items-center gap-3 rounded-lg"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[14px] font-semibold text-white">{mission.name}</p>
                            <p className="mt-1 flex flex-wrap gap-1.5">
                              <span className="rounded-pill border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[12px] font-medium leading-4 text-paper-100/65">
                                {mission.type} mission
                              </span>
                              <span className="rounded-pill border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[12px] font-medium leading-4 text-paper-100/65">
                                {mission.domain}
                              </span>
                            </p>
                          </div>
                          <span className="text-[13px] tabular-nums text-paper-100/60">{shownProgress}%</span>
                        </Link>
                      </div>
                      <div className="mt-3"><ProgressBar value={shownProgress} tone={done ? 'done' : 'you'} /></div>
                    </SolidCard>
                  )
                })}
              </div>
            )}
          </>
        )}

        <p id="board-status" role="status" aria-live="polite" aria-atomic="true" className="min-h-5 text-[12px] leading-5 text-paper-100/70">{status}</p>
      </main>
    </HifiShell>
    </div>
  )
}
