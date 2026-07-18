'use client'

import { useEffect, useRef, useState } from 'react'
import { Calendar, Flame, Info, Snowflake, Trophy, WifiOff, X } from 'lucide-react'
import {
  ArcGauge,
  BtnGhost,
  BtnPrimary,
  BtnSecondary,
  CIAInsightCard,
  ConsentRail,
  GlassCard,
  HifiShell,
  ProgressionIcon,
  Provenance,
  SectionTitle,
  SolidCard,
  TopBar,
} from '@/components/hifi/kit'

type StreakState = 'default' | 'skeleton' | 'empty' | 'error' | 'offline' | 'success'
type DayState = 'active' | 'freeze' | 'missed' | 'future' | 'blank'
type FreezeFlow = 'idle' | 'confirming' | 'used' | 'undone'

const STREAK_STATES: StreakState[] = ['default', 'skeleton', 'empty', 'error', 'offline', 'success']

// Streak XP multiplier rule table — mirrors RPG_SYSTEM_DESIGN.md:982:
// streak_multiplier = 1.0 at <7 days, 1.5 at 7-29 days, 2.0 at 30+ days.
// The whole bonus stack caps at 2.0x total (RPG_SYSTEM_DESIGN.md:984), so
// there is no higher streak tier — nothing "unlocks at 60 days".
const STREAK_MULTIPLIER_TIERS: Array<{ minDays: number; multiplier: number }> = [
  { minDays: 30, multiplier: 2.0 },
  { minDays: 7, multiplier: 1.5 },
  { minDays: 0, multiplier: 1.0 },
]

function multiplierForStreak(days: number): number {
  const tier = STREAK_MULTIPLIER_TIERS.find(candidate => days >= candidate.minDays)
  return tier ? tier.multiplier : 1.0
}

function multiplierCopyForStreak(days: number): string {
  const next = [...STREAK_MULTIPLIER_TIERS].reverse().find(candidate => days < candidate.minDays)
  if (!next) return 'Max multiplier · reached at 30 days'
  return `Next ${next.multiplier.toFixed(1)}x at ${next.minDays} days`
}

const may2026: Array<{ day: number; state: DayState }> = [
  { day: 1, state: 'blank' },
  ...Array.from({ length: 30 }, (_, index) => {
    const day = index + 2
    if (day === 10) return { day, state: 'freeze' as DayState }
    if (day === 18) return { day, state: 'missed' as DayState }
    if (day > 27) return { day, state: 'future' as DayState }
    return { day, state: 'active' as DayState }
  }),
]

const TONIGHT_DAY = 28

const milestones = [
  { threshold: 7, label: 'First week', earned: true },
  { threshold: 14, label: 'Fortnight', earned: true },
  { threshold: 30, label: 'One month', earned: true },
  { threshold: 60, label: 'Two months', earned: false },
]

export function S59StreakDetails() {
  const [screenState, setScreenState] = useState<StreakState>('default')
  const [freezeFlow, setFreezeFlow] = useState<FreezeFlow>('idle')
  const [freezesAvailable, setFreezesAvailable] = useState(2)
  const [status, setStatus] = useState('Streak details visual fixture ready. No sync or account request was made.')
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fixture = new URLSearchParams(window.location.search).get('state') as StreakState | null
    if (!fixture || !STREAK_STATES.includes(fixture)) return
    const timer = window.setTimeout(() => {
      setScreenState(fixture)
      if (fixture === 'success') {
        setFreezeFlow('used')
        setFreezesAvailable(1)
      }
      setStatus(
        fixture === 'offline'
          ? 'Offline — showing your last streak sync, 2 hours ago. Freeze is unavailable until you reconnect.'
          : fixture === 'skeleton'
            ? 'Streak details are loading. Freeze is disabled while the skeleton renders.'
            : fixture === 'error'
              ? 'Streak sync failed in this fixture. Cached streak data stays visible; freeze is disabled.'
              : fixture === 'empty'
                ? 'No streak yet in this fixture. Day one starts whenever you log your first action.'
                : fixture === 'success'
                  ? 'Freeze set for tonight in this local preview. 1 freeze left. Your 42-day streak is protected.'
                  : `${fixture} streak fixture loaded.`,
      )
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  // Focus trap + Escape for the freeze confirmation sheet.
  useEffect(() => {
    if (freezeFlow !== 'confirming') return
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    dialogRef.current?.querySelector<HTMLElement>('button:not(:disabled)')?.focus()
    return () => {
      if (previousFocus?.isConnected) previousFocus.focus()
    }
  }, [freezeFlow])

  const handleDialogKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      setFreezeFlow('idle')
      setStatus('Freeze confirmation closed. Nothing changed.')
      return
    }
    if (event.key !== 'Tab') return
    const focusable = [...(dialogRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled)') ?? [])]
    if (!focusable.length) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  const confirmFreeze = () => {
    setFreezeFlow('used')
    setFreezesAvailable(count => Math.max(0, count - 1))
    setStatus('Freeze set for tonight in this local preview. 1 freeze left. Your 42-day streak continues. No account change was made.')
  }

  const undoFreeze = () => {
    setFreezeFlow('undone')
    setFreezesAvailable(count => count + 1)
    setStatus('Freeze returned in this local preview. Tonight is unprotected again and 2 freezes are available.')
  }

  const isEmpty = screenState === 'empty'
  const currentStreak = isEmpty ? 0 : 42
  const multiplier = multiplierForStreak(currentStreak)
  const multiplierValue = `${multiplier.toFixed(1)}x`
  const freezeUsed = freezeFlow === 'used'
  const freezeDisabled =
    screenState === 'offline' || screenState === 'error' || isEmpty || freezesAvailable === 0 || freezeUsed
  const freezeDisabledReason =
    screenState === 'offline'
      ? 'Freeze needs a connection — it stays disabled while offline.'
      : screenState === 'error'
        ? 'Freeze is disabled while streak sync is failing.'
        : isEmpty
          ? 'Complete your first 7-day streak to earn a freeze.'
          : freezeUsed
            ? 'Freeze active for tonight — undo below if you logged after all.'
            : freezesAvailable === 0
              ? 'No freezes left this month. You earn more monthly.'
              : null

  return (
    <HifiShell
      atmosphere="you"
      showTabBar={false}
      header={
        <TopBar
          title={
            <>
              Streak <span className="text-emphasis">details</span>
            </>
          }
        />
      }
    >
      <main
        className="space-y-4 px-4 pb-8 pt-3"
        data-streak-state={screenState}
        data-freeze-flow={freezeFlow}
        aria-busy={screenState === 'skeleton'}
      >
        {screenState === 'offline' && (
          <div className="flex items-start gap-2 rounded-xl border border-white/10 bg-surface-2 px-3 py-2 text-[12px] leading-4 text-paper-100/70">
            <WifiOff aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
            offline — showing your last streak sync, 2h ago
          </div>
        )}

        {screenState === 'skeleton' ? (
          <div className="space-y-4" aria-label="Loading streak details preview">
            <div className="skeleton-block h-52 rounded-[28px]" />
            <div className="skeleton-block h-64 rounded-[22px]" />
            <div className="grid grid-cols-2 gap-3">
              <div className="skeleton-block h-44 rounded-[22px]" />
              <div className="skeleton-block h-44 rounded-[22px]" />
            </div>
            <div className="skeleton-block h-32 rounded-[22px]" />
            <div className="skeleton-block h-52 rounded-[22px]" />
          </div>
        ) : (
          <>
            <GlassCard tone="you" className="relative overflow-hidden">
              <div className="pointer-events-none absolute -top-20 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-brand-orange/20 blur-3xl" />
              <div className="relative flex flex-col items-center text-center">
                <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.15em] text-brand-orange">
                  <Flame size={13} strokeWidth={2.2} />
                  Current streak
                </span>
                <p className="mt-3 text-[56px] font-semibold leading-none tracking-tight text-white tabular-nums">{currentStreak}</p>
                <p className="mt-2 text-[17px] font-medium text-white/85">{isEmpty ? 'Your streak journey starts with day one' : 'Days strong'}</p>
                {!isEmpty && (
                  <div className="mt-3 flex items-center gap-2 text-[12px] text-white/55">
                    <span className="tabular-nums">Longest: 67</span>
                    <span className="h-3 w-px bg-white/15" />
                    <span className="tabular-nums">63% of best</span>
                  </div>
                )}
                <div className="mt-4 [&_span]:!text-[12px]">
                  <Provenance items={[screenState === 'error' ? 'Via streaks · cached' : 'Via streaks']} />
                </div>
              </div>
            </GlassCard>

            {screenState === 'error' ? (
              <GlassCard tone="muted" className="px-5 py-6 text-center">
                <Info aria-hidden="true" className="mx-auto h-6 w-6 text-brand-orange" />
                <h2 className="mt-2 text-[16px] font-semibold text-paper-100">Streak calendar didn’t sync</h2>
                <p className="mt-1 text-[12px] leading-5 text-paper-100/70">
                  Cached streak, milestones, and history stay visible below. Day-by-day detail returns after a retry.
                </p>
                <BtnSecondary className="mt-3" onClick={() => setStatus('Retry preview selected. No sync request was made from this visual fixture.')}>
                  Retry
                </BtnSecondary>
              </GlassCard>
            ) : (
              <section className="space-y-2">
                <div className="flex items-end justify-between">
                  <SectionTitle title="May 2026" />
                  <div className="flex items-center gap-3 text-[12px] uppercase tracking-wide text-paper-100/70">
                    <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-brand-orange" />Active</span>
                    <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-white/50" />Freeze</span>
                    <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-white/20" />Missed</span>
                  </div>
                </div>
                <SolidCard>
                  <div className="grid grid-cols-7 gap-1.5 text-center text-[12px] font-semibold uppercase text-paper-100/70">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((weekday, index) => (
                      <span key={index}>{weekday}</span>
                    ))}
                  </div>
                  <div className="mt-2 grid grid-cols-7 gap-1.5">
                    {may2026.map(({ day, state }) => {
                      const resolvedState: DayState = isEmpty && state !== 'blank' ? 'future' : state
                      if (resolvedState === 'blank') {
                        return (
                          <div
                            key={day}
                            role="img"
                            aria-label={isEmpty ? 'Day 1, no streak yet' : 'Day 1, before this streak began'}
                            className="aspect-square rounded-md border border-dashed border-white/10"
                          />
                        )
                      }
                      if (resolvedState === 'future') {
                        if (day === TONIGHT_DAY && freezeUsed && !isEmpty) {
                          return (
                            <button
                              key={day}
                              type="button"
                              aria-label={`Day ${day}, tonight, protected with a freeze`}
                              className="focus-ring flex aspect-square min-h-11 items-center justify-center rounded-md bg-white/[0.08] text-white/70"
                              onClick={() => setStatus(`Day ${day} — tonight, protected with the freeze you just set. Undo is in the freeze card.`)}
                            >
                              <Snowflake size={13} strokeWidth={2} />
                            </button>
                          )
                        }
                        return (
                          <div
                            key={day}
                            role="img"
                            aria-label={`Day ${day}, future`}
                            className="aspect-square rounded-md bg-white/[0.02]"
                          />
                        )
                      }
                      if (resolvedState === 'freeze') {
                        return (
                          <button
                            key={day}
                            type="button"
                            aria-label={`Day ${day}, protected with a freeze`}
                            className="focus-ring flex aspect-square min-h-11 items-center justify-center rounded-md bg-white/[0.08] text-white/70"
                            onClick={() => setStatus(`Day ${day} — protected with a freeze. The streak stayed intact.`)}
                          >
                            <Snowflake size={13} strokeWidth={2} />
                          </button>
                        )
                      }
                      if (resolvedState === 'missed') {
                        return (
                          <button
                            key={day}
                            type="button"
                            aria-label={`Day ${day}, missed`}
                            className="focus-ring relative flex aspect-square min-h-11 items-center justify-center rounded-md bg-white/[0.05] text-[12px] font-medium text-paper-100/70 tabular-nums"
                            onClick={() => setStatus(`Day ${day} — missed. Milestones already earned stayed yours.`)}
                          >
                            {day}
                            <X size={8} strokeWidth={2.5} className="absolute right-1 top-1 text-white/40" aria-hidden="true" />
                          </button>
                        )
                      }
                      return (
                        <button
                          key={day}
                          type="button"
                          aria-label={`Day ${day}, active streak day`}
                          className="focus-ring flex aspect-square min-h-11 items-center justify-center rounded-md bg-brand-orange/20 text-[12px] font-medium text-paper-100 tabular-nums"
                          onClick={() => setStatus(`Day ${day} — active streak day.`)}
                        >
                          {day}
                        </button>
                      )
                    })}
                  </div>
                </SolidCard>
              </section>
            )}

            <section className="grid grid-cols-2 gap-3">
              <SolidCard className="flex flex-col items-center py-4 [&_[role=img]_span:last-child]:!text-paper-100/70">
                {/* Value derived from the streak via the RPG_SYSTEM_DESIGN.md:982 rule
                    table above — at 42 days this reads 2.0x, the capped maximum. */}
                <ArcGauge value={multiplierValue} label="Current XP multiplier" />
                <p className="mt-2 px-2 text-center text-[12px] leading-4 text-white/65 tabular-nums">
                  {multiplierCopyForStreak(currentStreak)}
                </p>
              </SolidCard>
              {isEmpty ? (
                <SolidCard className="flex flex-col items-center justify-center gap-2 py-4 text-center">
                  <p className="text-[12px] font-semibold uppercase leading-4 text-paper-100/70">Recovery multiplier</p>
                  <p className="text-[16px] font-semibold leading-5 text-paper-100">Not active yet</p>
                  <p className="px-1 text-[12px] leading-4 text-paper-100/70">
                    Not applicable on day one. Recovery appears only after deliberate-rest eligibility; no bonus is active yet.
                  </p>
                </SolidCard>
              ) : (
                <SolidCard className="flex flex-col items-center justify-center gap-2 py-4 text-center">
                  {/* RPG_SYSTEM_DESIGN.md:280-281 (§2.7) — deliberate rest or freeze grants
                      1.3x on the next active day; stacks with streak; caps at 2.0x total.
                      This is a standing reward rule, not a locked or premium feature. */}
                  <p className="text-[12px] font-semibold uppercase leading-4 text-paper-100/70">Recovery multiplier</p>
                  <p className="text-[24px] font-semibold leading-7 text-white tabular-nums">1.3x</p>
                  <p className="px-1 text-[12px] leading-4 text-white/65">
                    1.3x XP on your next active day after a deliberate rest day. Stacks with your streak, capped at 2.0x total.
                  </p>
                  <div className="[&_span]:!text-[12px]">
                    <Provenance items={['Via rewards rules']} />
                  </div>
                </SolidCard>
              )}
            </section>

            <section className="space-y-2">
              <div className="flex items-center justify-between">
                <SectionTitle title="Streak freezes" meta="Protects a missed day" />
                <span className="rounded-pill bg-white/[0.06] px-2.5 py-1 text-[12px] font-medium text-white/80 tabular-nums">
                  {isEmpty ? 0 : freezesAvailable} available
                </span>
              </div>
              <SolidCard className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-white/70">
                    <Snowflake size={18} strokeWidth={1.9} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[14px] text-white/90">Use a freeze to protect today</p>
                    <p className="text-[12px] leading-4 text-white/55 tabular-nums">
                      {isEmpty
                        ? 'Freezes arrive with your first 7-day streak'
                        : `${freezesAvailable} ${freezesAvailable === 1 ? 'freeze' : 'freezes'} available · earned monthly`}
                    </p>
                  </div>
                </div>
                {freezeUsed && (
                  <div className="rounded-xl border border-forest-green/25 bg-forest-green/10 px-3 py-2 text-[12px] font-medium leading-4 text-paper-100">
                    <Snowflake aria-hidden="true" className="mr-2 inline h-4 w-4 text-forest-green" />
                    Freeze set for tonight in this preview. Your 42-day streak continues even if today goes unlogged.
                  </div>
                )}
                <BtnPrimary
                  className="w-full"
                  disabled={freezeDisabled}
                  aria-describedby="streak-live-status"
                  onClick={() => {
                    setFreezeFlow('confirming')
                    setStatus('Freeze confirmation open. Confirm to protect tonight, or cancel.')
                  }}
                >
                  {freezeUsed ? 'Freeze active tonight' : 'Use freeze'}
                </BtnPrimary>
                {freezeDisabledReason && (
                  <p className="text-[12px] leading-4 text-white/55">{freezeDisabledReason}</p>
                )}
                {freezeUsed && (
                  <BtnGhost className="w-full" onClick={undoFreeze}>
                    Undo freeze — return it to my balance
                  </BtnGhost>
                )}
              </SolidCard>
            </section>

            <section className="space-y-2">
              <SectionTitle title="Milestones" meta="Earned days stay yours" />
              <SolidCard className="divide-y divide-white/[0.06] p-0">
                {milestones.map(milestone => {
                  const earned = milestone.earned && !isEmpty
                  return (
                    <div key={milestone.threshold} className="flex min-h-11 items-center gap-3 px-4 py-3">
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-full border ${
                          earned
                            ? 'border-forest-green/35 bg-forest-green/15 text-forest-green'
                            : 'border-white/10 bg-white/[0.02] text-white/35'
                        }`}
                      >
                        {earned ? <Flame size={15} strokeWidth={2} /> : <ProgressionIcon size={15} aria-hidden="true" />}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className={`text-[14px] ${earned ? 'text-white' : 'text-white/55'}`}>
                          <span className="tabular-nums">{milestone.threshold}</span> days
                        </p>
                        <p className="text-[12px] leading-4 text-white/55">
                          {earned ? milestone.label : `${milestone.label} · Unlocks at ${milestone.threshold} days`}
                        </p>
                      </div>
                      {earned && (
                        <span className="rounded-pill bg-forest-green/10 px-2 py-0.5 text-[12px] font-semibold uppercase tracking-wide text-forest-green">
                          Earned
                        </span>
                      )}
                    </div>
                  )
                })}
              </SolidCard>
            </section>

            <section className="space-y-2">
              <SectionTitle title="Streak history" meta="Previous runs" />
              <SolidCard>
                {isEmpty ? (
                  <p className="text-[13px] leading-5 text-white/65">No previous runs yet — your first run starts with your first logged day.</p>
                ) : (
                  <div className="flex items-start gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/[0.04] text-brand-orange/70">
                      <Trophy size={17} strokeWidth={1.9} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between">
                        <span className="text-[16px] font-medium text-white tabular-nums">67 days</span>
                        <span className="text-[12px] text-paper-100/70">March 2026</span>
                      </div>
                      <p className="mt-0.5 text-[12px] leading-4 text-paper-100/70">Ended: travel</p>
                    </div>
                  </div>
                )}
              </SolidCard>
            </section>

            {!isEmpty && (
              <CIAInsightCard
                eyebrow="Streak support"
                provenance={['CIA synthesis']}
                className="[&>div>div>div.mt-3>div>span]:!text-[12px] [&>div>div>p:first-child]:!text-[12px]"
              >
                The March break did not erase the missions built during those 67 days. Showing up again is what
                keeps the pattern going, not an unbroken count.
              </CIAInsightCard>
            )}

            <SolidCard>
              <SectionTitle title="Data and consent" meta="Streaks" />
              <dl className="mt-3 space-y-2 text-[13px] leading-4">
                <div className="flex items-center justify-between border-b border-white/[0.05] pb-2">
                  <dt className="text-white/50">Category</dt>
                  <dd className="text-white/85">Consistency</dd>
                </div>
                <div className="flex items-center justify-between border-b border-white/[0.05] pb-2">
                  <dt className="text-white/50">Source</dt>
                  <dd className="text-white/85">Habit and mission logs</dd>
                </div>
                <div className="flex items-center justify-between border-b border-white/[0.05] pb-2">
                  <dt className="text-white/50">Scope</dt>
                  <dd className="text-white/85">Streak calendar only</dd>
                </div>
                <div className="flex items-center justify-between pb-1">
                  <dt className="text-white/50">Retention</dt>
                  <dd className="text-white/85">Until revoked</dd>
                </div>
              </dl>
              <div className="[&_a]:!text-[12px]">
                <ConsentRail compact />
              </div>
            </SolidCard>

            <div className="flex items-center justify-center gap-2 pt-1 text-[12px] text-paper-100/70">
              <Calendar size={13} strokeWidth={1.9} />
              Edge swipe back returns to where you opened this from.
            </div>
          </>
        )}

        <p
          id="streak-live-status"
          className="min-h-5 text-[12px] leading-5 text-paper-100/70"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {status}
        </p>

        {freezeFlow === 'confirming' && (
          <div className="absolute inset-0 z-[60] flex items-end bg-ink-900/85 px-3 pb-6" role="presentation">
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="freeze-confirm-title"
              aria-describedby="freeze-confirm-body"
              className="action-sheet-surface glass-card w-full p-5 shadow-3"
              onKeyDown={handleDialogKeyDown}
            >
              <div className="flex items-start justify-between gap-3">
                <h2 id="freeze-confirm-title" className="text-[18px] font-semibold text-paper-100">Use a freeze tonight?</h2>
                <button
                  type="button"
                  className="focus-ring flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-paper-100/70"
                  aria-label="Close freeze confirmation"
                  onClick={() => {
                    setFreezeFlow('idle')
                    setStatus('Freeze confirmation closed. Nothing changed.')
                  }}
                >
                  <X size={19} />
                </button>
              </div>
              <p id="freeze-confirm-body" className="mt-2 text-[14px] leading-5 text-paper-100/80">
                Freeze protects tonight only. Your 42-day streak continues.
              </p>
              <p className="mt-2 text-[12px] leading-4 text-paper-100/60 tabular-nums">
                {freezesAvailable} {freezesAvailable === 1 ? 'freeze' : 'freezes'} available · earned monthly · this preview changes nothing outside this screen.
              </p>
              <div className="mt-4 space-y-2">
                <BtnPrimary className="w-full" onClick={confirmFreeze}>
                  Confirm — freeze tonight
                </BtnPrimary>
                <BtnSecondary
                  className="w-full"
                  onClick={() => {
                    setFreezeFlow('idle')
                    setStatus('Freeze cancelled. Your freeze balance is unchanged.')
                  }}
                >
                  Cancel
                </BtnSecondary>
              </div>
            </div>
          </div>
        )}
      </main>
    </HifiShell>
  )
}
