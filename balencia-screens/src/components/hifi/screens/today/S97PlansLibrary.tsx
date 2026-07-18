'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Check, Clock, Dumbbell, Filter, Info, Lock, Moon, MoreHorizontal, PiggyBank, WifiOff } from 'lucide-react'
import {
  BtnGhost,
  BtnPrimary,
  BtnSecondary,
  CIAInsightCard,
  ConsentRail,
  GlassCard,
  HifiShell,
  IconButton,
  PaywallLock,
  ProgressBar,
  SectionTitle,
  SolidCard,
  TopBar,
} from '@/components/hifi/kit'

// Live at /plans, placed under Missions/Growth rather than claimed as a
// primary tab route. States (?state= fixture): default, skeleton, empty
// (no active plan, CIA draft starter), error (cached plans stay, failed
// sync names the source), offline (banner, blocking actions disabled with
// a visible reason), success (a plan action applied locally with undo).
// All plan actions are local previews only — nothing leaves the prototype.
type PlansState = 'default' | 'skeleton' | 'empty' | 'error' | 'offline' | 'success'
type PlanId = 'strength' | 'wind-down'
type ShelfTab = 'All' | 'Active' | 'Completed' | 'Paused'
type PlanAction = 'Edit' | 'Pause' | 'Stop' | 'Archive' | 'Delete' | 'Export' | 'Share' | 'Revoke CIA memory'
type PlanRuntime = { status: 'Active' | 'Saved' | 'Paused' | 'Stopped'; archived: boolean; deleted: boolean; ciaRevoked: boolean }

const PLANS_STATES: PlansState[] = ['default', 'skeleton', 'empty', 'error', 'offline', 'success']
const SHELF_TABS: ShelfTab[] = ['All', 'Active', 'Completed', 'Paused']
const PLAN_ACTIONS: PlanAction[] = ['Edit', 'Pause', 'Stop', 'Archive', 'Delete', 'Export', 'Share', 'Revoke CIA memory']
const DESTRUCTIVE_ACTIONS: PlanAction[] = ['Stop', 'Archive', 'Delete', 'Revoke CIA memory']
const INITIAL_RUNTIME: Record<PlanId, PlanRuntime> = {
  strength: { status: 'Active', archived: false, deleted: false, ciaRevoked: false },
  'wind-down': { status: 'Saved', archived: false, deleted: false, ciaRevoked: false },
}
const PLAN_META: Record<PlanId, { name: string; meta: string }> = {
  strength: { name: 'Strength reset', meta: '4 weeks · beginner' },
  'wind-down': { name: 'Evening wind-down', meta: 'Daily ritual · 15 minutes' },
}

export function S97PlansLibrary() {
  const [screenState, setScreenState] = useState<PlansState>('default')
  const [planRuntime, setPlanRuntime] = useState<Record<PlanId, PlanRuntime>>(INITIAL_RUNTIME)
  const [shelfTab, setShelfTab] = useState<ShelfTab>('All')
  const [draftFilter, setDraftFilter] = useState(false)
  const [insight, setInsight] = useState<'visible' | 'dismissed' | 'accepted'>('visible')
  const [heroPaused, setHeroPaused] = useState(false)
  const [lockedHidden, setLockedHidden] = useState(false)
  const [menuFor, setMenuFor] = useState<PlanId | null>(null)
  const [confirm, setConfirm] = useState<{ action: PlanAction; plan: PlanId | null } | null>(null)
  const [lastUndo, setLastUndo] = useState<{ label: string; restore: () => void } | null>(null)
  const [status, setStatus] = useState('Plans library fixture ready. Every plan action is a local preview — nothing is sent or saved externally.')
  const menuRef = useRef<HTMLDivElement>(null)
  const confirmCancelRef = useRef<HTMLButtonElement>(null)
  const confirmActRef = useRef<HTMLButtonElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)
  const undoRef = useRef<HTMLButtonElement>(null)
  const planShelfRef = useRef<HTMLElement>(null)
  const statusRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const fixture = new URLSearchParams(window.location.search).get('state') as PlansState | null
    if (!fixture || !PLANS_STATES.includes(fixture)) return
    const timer = window.setTimeout(() => {
      setScreenState(fixture)
      if (fixture === 'success') {
        const prev = INITIAL_RUNTIME.strength
        setPlanRuntime(current => ({ ...current, strength: { ...current.strength, status: 'Paused' } }))
        setLastUndo({ label: '“Strength reset” paused', restore: () => setPlanRuntime(current => ({ ...current, strength: prev })) })
      }
      setStatus(
        fixture === 'skeleton'
          ? 'Plans skeleton loading. Plan actions are disabled while the library loads.'
          : fixture === 'empty'
            ? 'Empty plans fixture. No active plan — start from a mission or ask CIA to draft one.'
            : fixture === 'error'
              ? 'Plan sync failed · training plan source. Cached plans remain; no network request was made.'
              : fixture === 'offline'
                ? 'Offline — showing last synced plans from 2 hours ago. Resume, accept, and unlock are unavailable.'
                : fixture === 'success'
                  ? '“Strength reset” paused in this preview. Undo is available — no account state changed.'
                  : 'Default plans fixture loaded.',
      )
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  const restoreOpenerFocus = () => {
    window.setTimeout(() => {
      if (returnFocusRef.current?.isConnected) {
        returnFocusRef.current.focus()
      } else if (undoRef.current?.isConnected) {
        undoRef.current.focus()
      } else if (planShelfRef.current?.isConnected) {
        planShelfRef.current.focus()
      } else {
        statusRef.current?.focus()
      }
    }, 0)
  }

  const closeMenu = (message?: string) => {
    setMenuFor(null)
    if (message) setStatus(message)
    restoreOpenerFocus()
  }

  const closeConfirm = (message = 'Action canceled. Nothing changed.') => {
    setConfirm(null)
    setStatus(message)
    restoreOpenerFocus()
  }

  useEffect(() => {
    if (!menuFor) return
    const focusables = () => Array.from(menuRef.current?.querySelectorAll<HTMLButtonElement>('button') ?? [])
    focusables()[0]?.focus()
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setMenuFor(null)
        setStatus('Plan actions closed. Nothing changed.')
        window.setTimeout(() => returnFocusRef.current?.focus(), 0)
        return
      }
      if (event.key !== 'Tab') return
      const list = focusables()
      if (list.length === 0) return
      const first = list[0]
      const last = list[list.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuFor])

  useEffect(() => {
    if (!confirm) return
    confirmCancelRef.current?.focus()
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setConfirm(null)
        setStatus('Action canceled. Nothing changed.')
        window.setTimeout(() => returnFocusRef.current?.focus(), 0)
        return
      }
      if (event.key !== 'Tab') return
      const first = confirmCancelRef.current
      const last = confirmActRef.current
      if (!first || !last) return
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [confirm])

  const openMenu = (plan: PlanId) => {
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    setMenuFor(plan)
  }

  const applyPlanAction = (action: PlanAction, plan: PlanId) => {
    const name = PLAN_META[plan].name
    if (action === 'Edit') {
      setStatus(`Edit preview opened locally for “${name}”. No plan data changed.`)
      return
    }
    if (action === 'Export') {
      setStatus(`Export prepared locally for “${name}”. No file left this preview.`)
      return
    }
    if (action === 'Share') {
      setStatus(`Share preview for “${name}” opened locally. Nothing was sent and no audience was added.`)
      return
    }
    const prev = planRuntime[plan]
    const next: PlanRuntime = { ...prev }
    let label = ''
    if (action === 'Pause') {
      next.status = 'Paused'
      label = `“${name}” paused`
    } else if (action === 'Stop') {
      next.status = 'Stopped'
      label = `“${name}” stopped`
    } else if (action === 'Archive') {
      next.archived = true
      label = `“${name}” archived`
    } else if (action === 'Delete') {
      next.deleted = true
      label = `“${name}” deleted`
    } else {
      next.ciaRevoked = true
      label = `CIA memory revoked for “${name}”`
    }
    setPlanRuntime(current => ({ ...current, [plan]: next }))
    setLastUndo({ label, restore: () => setPlanRuntime(current => ({ ...current, [plan]: prev })) })
    if (screenState === 'default') setScreenState('success')
    setStatus(`${label} in this preview. Undo is available — no account state changed.`)
  }

  const runMenuAction = (action: PlanAction) => {
    if (!menuFor) return
    const plan = menuFor
    if (DESTRUCTIVE_ACTIONS.includes(action)) {
      setMenuFor(null)
      setConfirm({ action, plan })
      return
    }
    applyPlanAction(action, plan)
    setMenuFor(null)
    restoreOpenerFocus()
  }

  const confirmCurrentAction = () => {
    if (!confirm) return
    if (confirm.plan) {
      applyPlanAction(confirm.action, confirm.plan)
    } else {
      // Global revoke from the Controls section.
      const prevStrength = planRuntime.strength
      const prevInsight = insight
      setPlanRuntime(current => ({ ...current, strength: { ...current.strength, ciaRevoked: true } }))
      setInsight('dismissed')
      setLastUndo({
        label: 'CIA plan memory revoked',
        restore: () => {
          setPlanRuntime(current => ({ ...current, strength: prevStrength }))
          setInsight(prevInsight)
        },
      })
      if (screenState === 'default') setScreenState('success')
      setStatus('CIA plan memory revoked in this preview. Undo is available — no account state changed.')
    }
    setConfirm(null)
    restoreOpenerFocus()
  }

  const acceptInsightAdjustment = () => {
    const previousInsight = insight
    setInsight('accepted')
    setLastUndo({
      label: 'CIA schedule adjustment',
      restore: () => setInsight(previousInsight),
    })
    setStatus('Adjustment applied locally — the hard run moved one day later. Undo is available and restores tomorrow at 6:30 am.')
  }

  const undoLast = () => {
    if (!lastUndo) return
    lastUndo.restore()
    setStatus(`Undo applied — ${lastUndo.label.replace(/^“/, '“')} was reverted in this preview.`)
    setLastUndo(null)
    if (screenState === 'success') setScreenState('default')
    window.setTimeout(() => planShelfRef.current?.focus(), 0)
  }

  const skeleton = screenState === 'skeleton'
  const blocked = screenState === 'offline' || screenState === 'error'
  const blockedReason = screenState === 'offline' ? 'Unavailable offline — showing last synced plans.' : 'Unavailable while plan sync is failing — retry above.'
  const rowVisible = (plan: PlanId) => {
    const runtime = planRuntime[plan]
    if (runtime.deleted || runtime.archived || draftFilter) return false
    if (shelfTab === 'Active') return runtime.status === 'Active'
    if (shelfTab === 'Paused') return runtime.status === 'Paused'
    if (shelfTab === 'Completed') return false
    return true
  }
  const visibleRows = (['strength', 'wind-down'] as PlanId[]).filter(rowVisible)
  const showLockedTemplate = shelfTab === 'All' && !draftFilter

  const planRow = (plan: PlanId) => {
    const runtime = planRuntime[plan]
    const meta = PLAN_META[plan]
    const isStrength = plan === 'strength'
    return (
      <SolidCard key={plan} className="p-0">
        <div className="flex items-stretch">
          <button
            type="button"
            className="focus-ring flex min-w-0 flex-1 items-start gap-3 rounded-l-[inherit] p-4 text-left"
            onClick={() => setStatus(`“${meta.name}” detail preview opened locally · ${meta.meta}. No plan data changed.`)}
          >
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${isStrength ? 'bg-domain-fitness/15' : 'bg-domain-sleep/15'}`}>
              {isStrength ? (
                <Dumbbell className="h-5 w-5 text-domain-fitness" strokeWidth={1.9} />
              ) : (
                <Moon className="h-5 w-5 text-domain-sleep" strokeWidth={1.9} />
              )}
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-center gap-2">
                <span className="text-[15px] font-semibold text-white">{meta.name}</span>
                {isStrength && !runtime.ciaRevoked && (
                  <span className="rounded-pill border border-royal-purple/25 bg-royal-purple/15 px-2 py-0.5 text-[12px] font-semibold text-paper-100/80">Via CIA</span>
                )}
                {(!isStrength || runtime.ciaRevoked) && (
                  <span className="rounded-pill border border-white/15 bg-white/10 px-2 py-0.5 text-[12px] font-semibold text-white/55">Saved</span>
                )}
                {(runtime.status === 'Paused' || runtime.status === 'Stopped') && (
                  <span className="rounded-pill border border-white/15 bg-white/[0.06] px-2 py-0.5 text-[12px] font-semibold text-white/65">{runtime.status} locally</span>
                )}
              </span>
              <span className="mt-0.5 block text-[12px] tabular-nums text-paper-100/70">{meta.meta}</span>
              <span className="mt-1 block text-[12px] text-white/60">
                {isStrength
                  ? runtime.ciaRevoked
                    ? 'Saved by you · CIA memory revoked in this preview'
                    : 'Via CIA · from sleep + training plan · updated 2d ago'
                  : 'Saved by you · 3d ago'}
              </span>
              {isStrength && (
                <span className="mt-2 block">
                  <ProgressBar value={12} tone="you" />
                </span>
              )}
            </span>
          </button>
          <div className="flex items-start p-2">
            <IconButton
              label={`Plan actions for ${meta.name}`}
              aria-haspopup="dialog"
              aria-expanded={menuFor === plan}
              disabled={skeleton}
              aria-describedby={skeleton ? 'plans-status' : undefined}
              onClick={() => openMenu(plan)}
            >
              <MoreHorizontal className="h-5 w-5" strokeWidth={1.9} />
            </IconButton>
          </div>
        </div>
      </SolidCard>
    )
  }

  return (
    <div className="contents [&_nav_span]:!text-[12px]">
      <HifiShell
      header={
        <TopBar
          title="Plans"
          right={
            <IconButton
              label="Show draft plans only"
              aria-pressed={draftFilter}
              className={draftFilter ? 'bg-white/10 text-white' : undefined}
              disabled={skeleton}
              aria-describedby={skeleton ? 'plans-status' : undefined}
              onClick={() => {
                const next = !draftFilter
                setDraftFilter(next)
                setStatus(next ? 'Draft filter on — no draft plans exist in this preview.' : 'Draft filter off — showing the full plan shelf.')
              }}
            >
              <Filter className="h-5 w-5" strokeWidth={1.9} />
            </IconButton>
          }
        />
      }
      activeTab="goals"
    >
      <main className="space-y-5 px-4 pb-8 pt-3" data-plans-state={screenState} aria-busy={skeleton}>
        {screenState === 'offline' && (
          <div className="flex items-start gap-2 rounded-xl border border-white/10 bg-surface-2 px-3 py-2 text-[12px] leading-4 text-paper-100/70">
            <WifiOff aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
            offline — showing last synced plans, 2h ago
          </div>
        )}
        {screenState === 'error' && (
          <SolidCard className="flex items-start gap-3">
            <Info aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-semibold text-white">Plan sync failed &middot; training plan source</p>
              <p className="mt-1 text-[12px] leading-4 text-white/60">Showing cached plans from your last sync. Nothing was lost.</p>
              <BtnSecondary className="mt-3" onClick={() => setStatus('Retry preview selected. No network request was made in this prototype.')}>
                Retry
              </BtnSecondary>
            </div>
          </SolidCard>
        )}

        {skeleton ? (
          <div className="space-y-3" aria-label="Loading plans library">
            <div className="skeleton-block h-64 rounded-[28px]" />
            <div className="skeleton-block h-24 rounded-[22px]" />
            <div className="skeleton-block h-11 rounded-pill" />
            <div className="skeleton-block h-20 rounded-[18px]" />
            <div className="skeleton-block h-20 rounded-[18px]" />
            <div className="skeleton-block h-20 rounded-[18px]" />
          </div>
        ) : screenState === 'empty' ? (
          <>
            <GlassCard tone="muted" className="px-5 py-8 text-center">
              <p className="text-[12px] font-semibold uppercase tracking-wide text-paper-100/70">Active mission</p>
              <h2 className="mt-2 text-[18px] font-semibold text-white">No active plan yet</h2>
              <p className="mx-auto mt-2 max-w-[260px] text-[13px] leading-5 text-white/65">
                Start from a mission you already track, or ask CIA to draft an honest starting point from your data.
              </p>
            </GlassCard>
            <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-5 text-center">
              <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-royal-purple/30 bg-royal-purple/10">
                <ArrowRight className="h-5 w-5 text-royal-purple" strokeWidth={1.9} />
              </span>
              <p className="mt-3 text-[14px] font-semibold text-white">Ask CIA to draft your next mission</p>
              <p className="mx-auto mt-1 max-w-[240px] text-[12px] leading-4 text-white/60">Describe an outcome and CIA will propose an honest starting point.</p>
              <div className="mt-4 flex justify-center">
                <BtnPrimary onClick={() => setStatus('CIA draft sheet preview opened locally. The data it would use is disclosed before activation.')}>
                  Draft with CIA
                </BtnPrimary>
              </div>
            </div>
          </>
        ) : (
          <>
            <GlassCard tone="you">
              <div className="flex items-start justify-between gap-2">
                <p className="text-[12px] font-semibold uppercase tracking-wide text-paper-100/70">Active mission</p>
                {heroPaused && (
                  <span className="rounded-pill border border-white/15 bg-white/[0.06] px-2 py-0.5 text-[12px] font-semibold text-white/65">Paused in this preview</span>
                )}
              </div>
              <h2 className="mt-1 text-[19px] font-semibold leading-6 text-white">Run a half marathon</h2>
              <p className="mt-1 text-[13px] tabular-nums text-white/55">Week 3 of 8</p>

              <ActivePlanPath />

              <div className="mt-4 flex items-center gap-2 text-[13px] text-white/75">
                <Clock className="h-4 w-4 text-brand-orange" strokeWidth={1.9} />
                <span className="tabular-nums">{insight === 'accepted' ? 'In 2 days · 6:30 am' : 'Tomorrow · 6:30 am'}</span>
                <span aria-hidden="true" className="text-white/30">&middot;</span>
                <span className="text-white/55">Hard run{insight === 'accepted' ? ' · moved 1 day (local)' : ''}</span>
              </div>

              <div className="mt-4 flex gap-2">
                <BtnSecondary
                  className="flex-1"
                  disabled={blocked}
                  aria-describedby={blocked ? 'plans-blocked-reason' : undefined}
                  onClick={() => setStatus('Resume preview opened locally at week 3. No session was scheduled or synced.')}
                >
                  Resume plan
                </BtnSecondary>
                <BtnSecondary
                  className="flex-1"
                  disabled={blocked}
                  aria-describedby={blocked ? 'plans-blocked-reason' : undefined}
                  onClick={() => setStatus('Adjustment chat preview opened locally. No CIA request was sent.')}
                >
                  Adjust with CIA
                </BtnSecondary>
              </div>
              {blocked && (
                <p id="plans-blocked-reason" className="mt-2 text-[12px] leading-4 text-white/60">{blockedReason}</p>
              )}
            </GlassCard>

            {insight === 'visible' && (
              <CIAInsightCard
                eyebrow="CIA suggests"
                provenance={['Via sleep + training plan']}
                className="[&>div>div>div.mt-3>div>span]:!text-[12px] [&>div>div>p:first-child]:!text-[12px]"
                actions={
                  <>
                    <BtnSecondary onClick={() => { setInsight('dismissed'); setStatus('CIA suggestion dismissed. Your plan is unchanged.') }}>Dismiss</BtnSecondary>
                    <BtnGhost
                      disabled={blocked}
                      aria-describedby={blocked ? 'plans-blocked-reason' : undefined}
                      onClick={acceptInsightAdjustment}
                    >
                      Accept
                    </BtnGhost>
                  </>
                }
              >
                Sleep suggests moving the hard run one day later for better recovery.
              </CIAInsightCard>
            )}
            {insight === 'accepted' && (
              <div className="flex items-center gap-2 rounded-xl border border-forest-green/25 bg-forest-green/10 px-3 py-2 text-[12px] font-medium text-paper-100">
                <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-forest-green" />
                Adjustment applied locally — hard run moved one day later. Undo restores tomorrow at 6:30 am.
              </div>
            )}

            {lastUndo && (
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1">
                <span className="text-[12px] text-white/70">{lastUndo.label} &middot; local preview</span>
                <button
                  ref={undoRef}
                  type="button"
                  aria-label={`Undo ${lastUndo.label}`}
                  className="focus-ring flex min-h-11 items-center rounded-pill px-2.5 text-[13px] font-semibold text-brand-orange"
                  onClick={undoLast}
                >
                  Undo
                </button>
              </div>
            )}

            <div role="group" aria-label="Filter plans" className="flex h-[54px] items-center gap-1 rounded-pill border border-white/10 bg-white/[0.03] p-1">
              {SHELF_TABS.map(tab => (
                <button
                  key={tab}
                  id={`plans-tab-${tab}`}
                  type="button"
                  aria-pressed={shelfTab === tab}
                  className={`focus-ring flex h-full flex-1 items-center justify-center rounded-pill text-[13px] ${shelfTab === tab ? 'bg-white/10 font-semibold text-white' : 'font-medium text-paper-100/70'}`}
                  onClick={() => {
                    setShelfTab(tab)
                    setStatus(`Plan shelf filtered to ${tab.toLowerCase()} in this preview.`)
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            <section ref={planShelfRef} tabIndex={-1} className="focus-ring space-y-3 rounded-xl" aria-label="Plan shelf">
              {visibleRows.map(planRow)}

              {showLockedTemplate && (lockedHidden ? (
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-3 py-1">
                  <span className="text-[12px] text-white/60">Premium template hidden for now</span>
                  <button
                    type="button"
                    className="focus-ring flex min-h-11 items-center rounded-pill px-2.5 text-[13px] font-semibold text-white/75"
                    onClick={() => { setLockedHidden(false); setStatus('Premium template preview restored to the shelf.') }}
                  >
                    Show
                  </button>
                </div>
              ) : (
                <PaywallLock
                  className="!min-h-[310px]"
                  title="Premium mission"
                  description="Personalized previews need consent and entitlement. The generic 12-week structure stays visible beneath."
                  action={
                    <div className="flex flex-col items-stretch gap-2">
                      <BtnPrimary
                        className="w-full"
                        disabled={blocked}
                        aria-describedby={blocked ? 'plans-blocked-reason' : undefined}
                        onClick={() => setStatus('Upgrade sheet preview opened locally. No purchase flow or entitlement change was made.')}
                      >
                        <Lock className="h-4 w-4" strokeWidth={1.9} aria-hidden="true" />
                        Unlock with premium
                      </BtnPrimary>
                      <BtnGhost className="h-[52px] w-full" quiet onClick={() => { setLockedHidden(true); setStatus('Premium template hidden for now in this preview.') }}>
                        Not now
                      </BtnGhost>
                    </div>
                  }
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-domain-finance/15">
                      <PiggyBank className="h-5 w-5 text-domain-finance" strokeWidth={1.9} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-[15px] font-semibold text-white">Savings mission template</h3>
                        <span className="rounded-pill border border-white/15 bg-white/10 px-2 py-0.5 text-[12px] font-semibold text-white/55">Locked template</span>
                      </div>
                      <p className="mt-0.5 text-[12px] text-paper-100/70">12-week structure &middot; generic preview</p>
                    </div>
                  </div>
                </PaywallLock>
              ))}

              {visibleRows.length === 0 && !showLockedTemplate && (
                <SolidCard className="px-4 py-6 text-center">
                  <p className="text-[13px] leading-5 text-white/60">
                    {draftFilter ? 'No draft plans in this preview.' : `No ${shelfTab.toLowerCase()} plans in this fixture.`}
                  </p>
                </SolidCard>
              )}
              {visibleRows.length === 0 && showLockedTemplate && shelfTab === 'All' && !draftFilter && planRuntime.strength.deleted && planRuntime['wind-down'].deleted && (
                <p className="text-center text-[12px] text-white/60">All saved plans removed locally — undo above restores the last one.</p>
              )}
            </section>

            <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-5 text-center">
              <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-royal-purple/30 bg-royal-purple/10">
                <ArrowRight className="h-5 w-5 text-royal-purple" strokeWidth={1.9} />
              </span>
              <p className="mt-3 text-[14px] font-semibold text-white">Ask CIA to draft your next mission</p>
              <p className="mx-auto mt-1 max-w-[240px] text-[12px] leading-4 text-white/60">Describe an outcome and CIA will propose an honest starting point.</p>
              <div className="mt-4 flex justify-center">
                <BtnGhost onClick={() => setStatus('CIA draft sheet preview opened locally. The data it would use is disclosed before activation.')}>
                  Draft with CIA
                </BtnGhost>
              </div>
            </div>

            <section className="space-y-2">
              <SectionTitle title="Controls" meta="Pause &middot; export &middot; revoke" />
              <SolidCard className="space-y-1 p-0">
                <button
                  type="button"
                  className="focus-ring flex min-h-11 w-full items-center justify-between px-4 py-3 text-left text-[14px] text-white/80"
                  aria-pressed={heroPaused}
                  onClick={() => {
                    const next = !heroPaused
                    setHeroPaused(next)
                    setStatus(next ? 'Active mission paused in this preview. Press again to resume — honest recovery, never failure.' : 'Active mission resumed in this preview.')
                  }}
                >
                  <span>{heroPaused ? 'Resume active mission' : 'Pause active mission'}</span>
                  <span className="text-[12px] italic text-paper-100/70">Honest recovery, never failure</span>
                </button>
                <button
                  type="button"
                  className="focus-ring flex min-h-11 w-full items-center justify-between px-4 py-3 text-left text-[14px] text-white/80"
                  onClick={() => setStatus('Export prepared locally for all plans. No file left this preview.')}
                >
                  <span>Export mission data</span>
                  <ArrowRight className="h-4 w-4 text-white/30" strokeWidth={1.9} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="focus-ring flex min-h-11 w-full items-center justify-between px-4 py-3 text-left text-[14px] text-white/80"
                  aria-haspopup="dialog"
                  onClick={() => {
                    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
                    setConfirm({ action: 'Revoke CIA memory', plan: null })
                  }}
                >
                  <span>Revoke CIA memory</span>
                  <ArrowRight className="h-4 w-4 text-white/30" strokeWidth={1.9} aria-hidden="true" />
                </button>
              </SolidCard>
            </section>
          </>
        )}

        {!skeleton && (
          <div className="flex justify-center [&_a]:!text-[12px]">
            <ConsentRail compact />
          </div>
        )}

        <p ref={statusRef} id="plans-status" tabIndex={-1} className="min-h-5 text-[12px] leading-5 text-paper-100/70" role="status" aria-live="polite" aria-atomic="true">{status}</p>

        {menuFor && (
          <div className="absolute inset-0 z-50 flex items-end bg-ink-900/75 p-4" role="dialog" aria-modal="true" aria-labelledby="plan-actions-title">
            <div ref={menuRef} className="w-full rounded-[24px] border border-white/10 bg-ink-brown-800 p-4 shadow-2xl">
              <h2 id="plan-actions-title" className="text-[17px] font-semibold text-paper-100">Plan actions &middot; {PLAN_META[menuFor].name}</h2>
              <p className="mt-1 text-[12px] leading-4 text-paper-100/70">Local preview only. Destructive actions confirm first and can be undone.</p>
              <div className="mt-3 space-y-1">
                {PLAN_ACTIONS.map(action => (
                  <button
                    key={action}
                    type="button"
                    className="focus-ring flex min-h-11 w-full items-center justify-between rounded-xl px-3 py-2 text-left text-[14px] text-paper-100/85 hover:bg-white/[0.04]"
                    onClick={() => runMenuAction(action)}
                  >
                    <span>{action}</span>
                    {DESTRUCTIVE_ACTIONS.includes(action) && <span className="text-[12px] text-paper-100/70">Confirms first</span>}
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="focus-ring hifi-action glass-pill mt-3 h-12 w-full px-5 text-[15px] font-medium text-paper-100"
                onClick={() => closeMenu('Plan actions closed. Nothing changed.')}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {confirm && (
          <div
            className="absolute inset-0 z-50 flex items-end bg-ink-900/75 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="plan-confirm-title"
            aria-describedby="plan-confirm-desc"
          >
            <div className="w-full rounded-[24px] border border-white/10 bg-ink-brown-800 p-4 shadow-2xl">
              <h2 id="plan-confirm-title" className="text-[17px] font-semibold text-paper-100">
                {confirm.plan
                  ? confirm.action === 'Revoke CIA memory'
                    ? `Revoke CIA memory for “${PLAN_META[confirm.plan].name}”?`
                    : `${confirm.action} “${PLAN_META[confirm.plan].name}”?`
                  : 'Revoke CIA plan memory?'}
              </h2>
              <p id="plan-confirm-desc" className="mt-2 text-[12px] leading-5 text-paper-100/70">
                {confirm.plan
                  ? `Exact target: ${PLAN_META[confirm.plan].name}. This applies only inside this preview — no account or server state changes, and undo is available after confirming.`
                  : 'Exact target: CIA memory across your plans in this preview. The plan suggestion is dismissed and “Strength reset” loses its CIA link locally. Undo is available; no account state changes.'}
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  ref={confirmCancelRef}
                  type="button"
                  className="focus-ring hifi-action glass-pill h-12 w-full px-5 text-[15px] font-medium text-paper-100"
                  onClick={() => closeConfirm()}
                >
                  Cancel
                </button>
                <button
                  ref={confirmActRef}
                  type="button"
                  className="focus-ring hifi-action hifi-action-danger h-12 w-full rounded-pill px-5 text-[15px] font-semibold"
                  onClick={confirmCurrentAction}
                >
                  {confirm.action === 'Revoke CIA memory' ? 'Revoke memory' : `${confirm.action} plan`}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      </HifiShell>
    </div>
  )
}

// NEW: ActivePlanPath — a horizontal milestone spine with the current week,
// the next honest step, and its source. A layout primitive, not a chart.
function ActivePlanPath() {
  return (
    <div className="relative mt-4 px-1 pb-1" role="img" aria-label="Plan path: start done, week 3 current, 5K tempo next, week 8 upcoming">
      <div className="absolute left-4 right-4 top-[15px] h-[2px] rounded-pill bg-white/10" />
      <div className="absolute left-4 top-[15px] h-[2px] w-[40%] rounded-pill bg-brand-orange shadow-[var(--glow-orange-sm)]" />
      <div className="relative flex items-start justify-between">
        <div className="flex w-12 flex-col items-center gap-1.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest-green shadow-[var(--glow-green-sm)]">
            <Check className="h-4 w-4 text-ink-900" strokeWidth={3} />
          </span>
          <span className="text-[12px] font-semibold uppercase tracking-wide text-paper-100/70">Start</span>
        </div>
        <div className="flex w-14 flex-col items-center gap-1.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-brand-orange bg-ink-900 shadow-[var(--glow-orange-sm)]" />
          <span className="text-[12px] font-semibold tabular-nums text-brand-orange">Week 3</span>
        </div>
        <div className="flex w-20 flex-col items-center gap-1.5 text-center">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-orange/60 bg-white/[0.04]">
            <span className="h-2 w-2 rounded-full bg-brand-orange" />
          </span>
          <span className="text-[12px] font-semibold leading-4 text-white">5K tempo</span>
          <span className="text-[12px] leading-4 text-paper-100/70">Next <span className="text-emphasis text-brand-orange">right</span> step</span>
        </div>
        <div className="flex w-12 flex-col items-center gap-1.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/[0.03]" />
          <span className="text-[12px] font-semibold uppercase tracking-wide text-paper-100/70">Week 8</span>
        </div>
      </div>
    </div>
  )
}
