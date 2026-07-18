'use client'

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from 'react'
import Link from 'next/link'
import { Check, ChevronRight, Flame, ShieldCheck, Snowflake, Sparkles, X } from 'lucide-react'
import {
  BtnSecondary,
  CIAPresenceOrb,
  GlassCard,
  HifiShell,
  LifePowerRadar,
  ProgressBar,
  Provenance,
  SectionTitle,
  SolidCard,
  TopBar,
  calculateLifePower,
  type LifeDomainDatum,
} from '@/components/hifi/kit'
import { persona } from '@/data/hifi/persona'

const RPG_STATES = ['default', 'low-confidence', 'skeleton', 'empty', 'error', 'success', 'disabled', 'offline'] as const
const RPG_PANELS = ['closed', 'domain', 'ranked', 'data-controls'] as const
const DATA_CONTROLS = ['Category', 'Source', 'Scope', 'Freshness', 'Retention', 'Export', 'Revoke', 'Delete'] as const

type RpgState = (typeof RPG_STATES)[number]
type RpgPanel = (typeof RPG_PANELS)[number]

type CharacterDomain = LifeDomainDatum & {
  color: string
  bar: string
}

// This is the single frozen D2 payload. Every score, chart, card, summary,
// ranking, and accessible alternative below derives from this array.
const LIFE_DOMAINS = [
  { name: 'Fitness', shortLabel: 'Fit', value: 74, source: 'RPG stats', color: 'text-domain-fitness', bar: 'bg-domain-fitness' },
  { name: 'Sleep', shortLabel: 'Sleep', value: 42, source: 'RPG stats', color: 'text-domain-sleep', bar: 'bg-domain-sleep' },
  { name: 'Career', shortLabel: 'Career', value: 55, source: 'RPG stats', color: 'text-paper-100', bar: 'bg-domain-career' },
  { name: 'Nutrition', shortLabel: 'Nutr.', value: 51, source: 'RPG stats', color: 'text-domain-nutrition', bar: 'bg-domain-nutrition' },
  { name: 'Finance', shortLabel: 'Finance', value: 48, source: 'RPG stats', color: 'text-domain-finance', bar: 'bg-domain-finance' },
  { name: 'Faith', shortLabel: 'Faith', value: 28, source: 'RPG stats', color: 'text-domain-faith', bar: 'bg-domain-faith' },
  { name: 'Productivity', shortLabel: 'Focus', value: 33, source: 'RPG stats', color: 'text-domain-productivity', bar: 'bg-domain-productivity' },
  { name: 'Relationships', shortLabel: 'People', value: 30, source: 'RPG stats', color: 'text-domain-relationships', bar: 'bg-domain-relationships' },
  { name: 'Wellbeing', shortLabel: 'Well.', value: 62, source: 'RPG stats', color: 'text-domain-wellbeing', bar: 'bg-domain-wellbeing' },
  { name: 'Meditation', shortLabel: 'Medit.', value: 21, source: 'RPG stats', color: 'text-domain-meditation', bar: 'bg-domain-meditation' },
] satisfies CharacterDomain[]

const DOMAIN_RANKING = [...LIFE_DOMAINS].sort((a, b) => b.value - a.value)
const STRONGEST_DOMAIN = DOMAIN_RANKING[0]
const GROWTH_DOMAIN = DOMAIN_RANKING[DOMAIN_RANKING.length - 1]
const LIFE_POWER_RESULT = calculateLifePower(LIFE_DOMAINS.map(domain => domain.value))
const LIFE_POWER = LIFE_POWER_RESULT.score
const MISSION_HISTORY = [
  { id: 'morning-mobility', name: 'Morning mobility foundation', domain: 'Fitness', progress: 100, completedAt: 'Completed 8 Jul 2026' },
  { id: 'weekly-reflection', name: 'Weekly reflection reset', domain: 'Wellbeing', progress: 100, completedAt: 'Completed 4 Jul 2026' },
] as const

function isRpgState(value: string | null): value is RpgState {
  return RPG_STATES.some(state => state === value)
}

function isRpgPanel(value: string | null): value is RpgPanel {
  return RPG_PANELS.some(panel => panel === value)
}

function findDomain(value: string | null) {
  if (!value) return LIFE_DOMAINS[0]
  return LIFE_DOMAINS.find(domain => domain.name.toLowerCase() === value.toLowerCase()) ?? LIFE_DOMAINS[0]
}

function DialogFrame({
  title,
  titleId,
  onClose,
  returnFocusRef,
  skipRestoreRef,
  children,
}: {
  title: string
  titleId: string
  onClose: () => void
  returnFocusRef: { current: HTMLElement | null }
  skipRestoreRef: { current: boolean }
  children: ReactNode
}) {
  const dialogRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const returnFocus = returnFocusRef.current ?? previousFocus
    dialogRef.current?.querySelector<HTMLElement>('[data-initial-focus], button:not(:disabled), [href]')?.focus()
    skipRestoreRef.current = false
    return () => {
      if (skipRestoreRef.current) return
      if (returnFocus?.isConnected) returnFocus.focus()
    }
  }, [returnFocusRef, skipRestoreRef])

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
      return
    }
    if (event.key !== 'Tab') return

    const focusable = [...(dialogRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled), [href]') ?? [])]
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

  return (
    <div
      className="absolute inset-0 z-[70] flex items-end bg-ink-900/90 p-3 pb-[72px]"
      role="presentation"
    >
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="glass-card max-h-[690px] w-full overflow-y-auto p-5 shadow-3"
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center justify-between gap-3">
          <h2 id={titleId} className="text-[18px] font-semibold text-paper-100">{title}</h2>
          <button
            type="button"
            data-initial-focus
            className="focus-ring flex h-11 w-11 items-center justify-center rounded-full text-paper-100/70"
            aria-label={`Close ${title.toLowerCase()}`}
            onClick={onClose}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        {children}
      </section>
    </div>
  )
}

function StateBanner({ state, onRetry }: { state: RpgState; onRetry: () => void }) {
  if (state === 'default' || state === 'empty' || state === 'skeleton' || state === 'success') return null

  const messages: Partial<Record<RpgState, string>> = {
    'low-confidence': 'Sleep is still syncing. Life Power 487 uses the cached score and is marked low confidence until that source settles.',
    error: 'One source could not refresh. Cached RPG stats remain visible; no network request is running in this prototype.',
    disabled: 'Domain and Mission links are disabled in this fixture. No account or RPG data can change here.',
    offline: 'Offline preview · cached RPG stats from 2 hours ago. Local details remain available, but refresh and dashboard links are unavailable.',
  }
  const message = messages[state]
  if (!message) return null

  return (
    <div
      className="rounded-xl border border-brand-orange/25 bg-brand-orange/10 px-4 py-3 text-[12px] leading-5 text-paper-100/80"
      role={state === 'error' ? 'alert' : 'status'}
    >
      <p>{message}</p>
      {state === 'error' && (
        <button type="button" className="focus-ring mt-2 min-h-11 rounded-pill border border-white/15 px-4 text-[12px] font-semibold text-paper-100" onClick={onRetry}>
          Restore cached preview
        </button>
      )}
    </div>
  )
}

function LocalLevelArrival() {
  return (
    <section
      className="relative overflow-hidden rounded-[28px] border border-forest-green/35 bg-forest-green/10 p-4"
      aria-labelledby="rpg-arrival-title"
      data-rpg-success-arrival="level-12"
      data-reduced-motion-path="static"
    >
      <span className="absolute inset-x-6 top-0 h-px bg-forest-green" aria-hidden="true" />
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-forest-green/45 bg-ink-900/55 text-forest-green" aria-hidden="true">
          <Check className="h-5 w-5" strokeWidth={2.4} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-paper-100/70">Local milestone preview</p>
          <h2 id="rpg-arrival-title" className="mt-1 text-[20px] font-semibold leading-6 text-paper-100">Level 12, confirmed</h2>
          <p className="mt-1 text-[12px] leading-5 text-paper-100/75">This restrained arrival uses the bundled RPG fixture only. No reward, haptic, account, device, or network state changed.</p>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2" aria-hidden="true">
        <span className="h-2 w-2 rounded-full border border-forest-green bg-ink-900" />
        <span className="h-px flex-1 bg-forest-green/45" />
        <Sparkles className="h-4 w-4 text-forest-green" strokeWidth={1.9} />
        <span className="h-px flex-1 bg-forest-green/45" />
        <span className="h-2 w-2 rounded-full bg-forest-green" />
      </div>
    </section>
  )
}

function SkeletonContent() {
  return (
    <div className="space-y-4" aria-label="Loading Life World preview">
      <div className="skeleton-block h-40 rounded-[28px]" />
      <div className="skeleton-block mx-auto h-60 w-60 rounded-full" />
      <div className="grid grid-cols-2 gap-2.5">
        {LIFE_DOMAINS.map(domain => <div key={domain.name} className="skeleton-block h-[84px] rounded-xl" />)}
      </div>
    </div>
  )
}

function GhostRadar() {
  return (
    <div
      className="relative mx-auto flex h-56 w-56 items-center justify-center rounded-full border border-dashed border-white/15"
      role="img"
      aria-label="Building your balance. Ten domains are unstarted."
    >
      <div className="absolute inset-7 rounded-full border border-dashed border-white/10" aria-hidden="true" />
      <div className="absolute inset-14 rounded-full border border-dashed border-white/10" aria-hidden="true" />
      <div className="relative max-w-28 text-center text-[13px] leading-5 text-paper-100/70">Building your balance</div>
    </div>
  )
}

export function S19RpgCharacter() {
  const [screenState, setScreenState] = useState<RpgState>('default')
  const [panel, setPanel] = useState<RpgPanel>('closed')
  const [selectedDomain, setSelectedDomain] = useState<CharacterDomain>(LIFE_DOMAINS[0])
  const [selectedControl, setSelectedControl] = useState<(typeof DATA_CONTROLS)[number] | null>(null)
  const [status, setStatus] = useState('Life World uses bundled RPG fixtures only. No account, device, or network capability is active.')
  const panelReturnFocusRef = useRef<HTMLElement | null>(null)
  const skipPanelRestoreRef = useRef(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const requestedState = params.get('state')
    const requestedPanel = params.get('panel')
    const requestedDomain = params.get('domain')
    queueMicrotask(() => {
      if (isRpgState(requestedState)) setScreenState(requestedState)
      if (isRpgPanel(requestedPanel)) setPanel(requestedPanel)
      setSelectedDomain(findDomain(requestedDomain))
    })
  }, [])

  const closePanel = () => setPanel('closed')
  const isSkeleton = screenState === 'skeleton'
  const isEmpty = screenState === 'empty'
  const isDisabled = screenState === 'disabled'
  const dashboardUnavailable = isDisabled || screenState === 'offline'
  const missionHistoryIsCached = screenState === 'low-confidence' || screenState === 'offline'
  const missionHistoryVisibleFreshness = screenState === 'low-confidence'
    ? 'Cached · low confidence'
    : screenState === 'offline'
      ? 'Cached 2h ago · offline'
      : null
  const missionHistoryAccessibleFreshness = screenState === 'low-confidence'
    ? 'Cached, low confidence'
    : screenState === 'offline'
      ? 'Cached 2 hours ago, offline'
      : null
  const rewardFreshness = screenState === 'low-confidence'
    ? 'Streak & rewards · cached while Sleep syncs · low confidence'
    : screenState === 'offline'
      ? 'Streak & rewards · cached 2 hours ago · offline'
      : screenState === 'error'
        ? 'Streak & rewards · cached after refresh error'
        : 'Streak & rewards · bundled current fixture'
  const selectedDomainFreshness = screenState === 'offline'
    ? 'Cached 2 hours ago'
    : screenState === 'error'
      ? 'Cached after source refresh error'
      : screenState === 'low-confidence' && selectedDomain.name === 'Sleep'
        ? 'Cached while Sleep syncs'
        : 'Bundled current fixture'

  const openDomain = (domain: CharacterDomain, trigger: HTMLButtonElement) => {
    panelReturnFocusRef.current = trigger
    setSelectedDomain(domain)
    setPanel('domain')
  }

  const openRanked = (trigger: HTMLButtonElement) => {
    panelReturnFocusRef.current = trigger
    setPanel('ranked')
  }

  const handoffDomainToRanked = () => {
    skipPanelRestoreRef.current = true
    setPanel('ranked')
  }

  const openDataControls = (trigger: HTMLButtonElement) => {
    panelReturnFocusRef.current = trigger
    setPanel('data-controls')
  }

  const overlay = panel === 'domain' ? (
    <DialogFrame key="domain" title={`${selectedDomain.name} domain details`} titleId="rpg-domain-title" onClose={closePanel} returnFocusRef={panelReturnFocusRef} skipRestoreRef={skipPanelRestoreRef}>
      <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <p className={`text-[12px] font-semibold uppercase tracking-[0.08em] ${selectedDomain.color}`}>{selectedDomain.name}</p>
        {isEmpty ? (
          <>
            <p className="mt-2 text-[28px] font-semibold text-paper-100">--</p>
            <p className="mt-2 text-[12px] leading-5 text-paper-100/70">No score yet. Log one entry to begin; this preview will not create one.</p>
          </>
        ) : (
          <>
            <p className="mt-2 text-[32px] font-semibold tabular-nums text-paper-100">{selectedDomain.value}<span className="text-[14px] text-paper-100/65"> / 99</span></p>
            <p className="mt-2 text-[12px] leading-5 text-paper-100/70">
              Source: {selectedDomain.source} · Freshness: {selectedDomainFreshness} · Confidence: {screenState === 'low-confidence' && selectedDomain.name === 'Sleep' ? 'Low while Sleep syncs' : 'High'}
            </p>
          </>
        )}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button type="button" className="focus-ring min-h-12 rounded-pill border border-white/15 px-3 text-[13px] font-medium text-paper-100" onClick={handoffDomainToRanked}>View ranking</button>
        <button type="button" className="focus-ring min-h-12 rounded-pill border border-white/15 px-3 text-[13px] font-medium text-paper-100" onClick={closePanel}>Done</button>
      </div>
    </DialogFrame>
  ) : panel === 'ranked' ? (
    <DialogFrame key="ranked" title="All-domain ranking" titleId="rpg-ranked-title" onClose={closePanel} returnFocusRef={panelReturnFocusRef} skipRestoreRef={skipPanelRestoreRef}>
      <p className="mt-3 text-[12px] leading-5 text-paper-100/70">
        Life Power {LIFE_POWER} is calculated from all ten scores with a {LIFE_POWER_RESULT.balanceMultiplier.toFixed(2)} balance multiplier. Character XP is separate.
      </p>
      <ol className="mt-4 divide-y divide-white/[0.06]" aria-label="All ten domains ranked by score">
        {DOMAIN_RANKING.map((domain, index) => (
          <li key={domain.name} className="flex min-h-12 items-center gap-3 py-2">
            <span className="w-6 text-[12px] tabular-nums text-paper-100/60">{index + 1}</span>
            <span className={`min-w-0 flex-1 text-[13px] font-medium ${domain.color}`}>{domain.name}</span>
            <span className="text-[14px] font-semibold tabular-nums text-paper-100">{domain.value}</span>
          </li>
        ))}
      </ol>
      <BtnSecondary className="mt-4 w-full" onClick={closePanel}>Close ranking</BtnSecondary>
    </DialogFrame>
  ) : panel === 'data-controls' ? (
    <DialogFrame key="data-controls" title="Life World data controls" titleId="rpg-data-title" onClose={closePanel} returnFocusRef={panelReturnFocusRef} skipRestoreRef={skipPanelRestoreRef}>
      <p className="mt-3 text-[12px] leading-5 text-paper-100/70">
        These eight controls affect this local preview only. Nothing is exported, revoked, deleted, stored, or sent.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2" role="group" aria-label="Life World data controls">
        {DATA_CONTROLS.map(control => {
          const selected = selectedControl === control
          return (
            <button
              key={control}
              type="button"
              data-data-control={control.toLowerCase()}
              aria-pressed={selected}
              className={`focus-ring flex min-h-12 items-center justify-center gap-2 rounded-xl border px-3 text-[12px] font-semibold ${selected ? 'border-brand-orange bg-brand-orange/15 text-paper-100' : 'border-white/15 bg-white/[0.03] text-paper-100/75'}`}
              onClick={() => {
                setSelectedControl(control)
                setStatus(`${control} selected for this local preview. No member data, account permission, file, or network state changed.`)
              }}
            >
              <Check className={`h-4 w-4 ${selected ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true" data-selected-marker={selected || undefined} />
              {control}
            </button>
          )
        })}
      </div>
      <p className="mt-3 min-h-10 text-[12px] leading-5 text-paper-100/70" role="status" aria-live="polite">
        {selectedControl ? `${selectedControl} is selected. This is a reversible local-only preview.` : 'Choose one control to preview its local-only outcome.'}
      </p>
      <BtnSecondary className="mt-3 w-full" onClick={closePanel}>Keep current data</BtnSecondary>
    </DialogFrame>
  ) : undefined

  return (
    <div className="contents [&_nav_span]:!text-[12px] [&_[role=img]>div>span:last-child]:!text-[12px]">
      <HifiShell
        header={<TopBar title="Life world" back backHref="/screens/17" right={<CIAPresenceOrb size={24} state="idle" />} />}
        activeTab="me"
        atmosphere="you"
        showTabBar
        overlay={overlay}
      >
      <main
        className="space-y-4 px-4 pb-6 pt-3"
        data-state-surface={screenState}
        data-rpg-state={screenState}
        data-rpg-panel={panel}
        data-domain-count={LIFE_DOMAINS.length}
        data-life-power={LIFE_POWER}
        data-domain-ranking-count={DOMAIN_RANKING.length}
        data-route="/life-world"
        aria-busy={isSkeleton || undefined}
      >
        <StateBanner
          state={screenState}
          onRetry={() => {
            setScreenState('default')
            setStatus('Cached RPG stats restored locally. No network request, sync, or account change occurred.')
          }}
        />

        {screenState === 'success' && <LocalLevelArrival />}

        {isSkeleton ? (
          <SkeletonContent />
        ) : (
          <>
            <GlassCard tone="you">
              <div className="flex items-start gap-4">
                <div className="flex w-16 shrink-0 flex-col items-center gap-2">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-[18px] font-semibold text-paper-100">AM</span>
                  <span className="whitespace-nowrap rounded-pill bg-brand-orange px-2 py-0.5 text-[12px] font-bold text-ink-900 shadow-[var(--glow-orange-sm)]">
                    Lv {isEmpty ? 1 : persona.level}
                  </span>
                </div>
                <div className="min-w-0 flex-1 space-y-1 pt-1">
                  <h2 className="text-[18px] font-semibold leading-6 text-paper-100">{persona.firstName}, {isEmpty ? 'beginner explorer' : 'dedicated explorer'}</h2>
                  <p className="text-[13px] leading-5 text-paper-100/70">Your <span className="text-emphasis">character</span> across every domain of life.</p>
                </div>
              </div>
              <div className="mt-5 space-y-2">
                <div className="flex items-start justify-between gap-3 text-[12px] uppercase tracking-wide text-paper-100/65">
                  <span>Character XP</span>
                  <span className="text-right text-[12px] font-medium normal-case tabular-nums text-paper-100/80">{isEmpty ? 'No XP yet' : '2,450 / 5,809 XP'}</span>
                </div>
                <div
                  role="progressbar"
                  aria-label={isEmpty ? 'Character XP has not started. Independent of Life Power.' : 'Character XP 2,450 of 5,809, 42 percent. Independent of Life Power.'}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={isEmpty ? 0 : 42}
                >
                  <ProgressBar value={isEmpty ? 0 : 42} tone="you" />
                </div>
                <div className="[&_span]:!text-[12px]"><Provenance items={isEmpty ? ['Balencia RPG · not started'] : [screenState === 'low-confidence' ? 'Balencia RPG · estimated · low confidence' : 'Balencia RPG · independent of Life Power']} /></div>
              </div>
            </GlassCard>

            <SolidCard className="flex flex-col items-center gap-3 py-5">
              {isEmpty ? <GhostRadar /> : (
                <div className="[&_svg_text]:!text-[12px]" data-radar-label-floor="12">
                  <LifePowerRadar domains={LIFE_DOMAINS} size={280} />
                </div>
              )}
              <p className="max-w-[280px] text-center text-[13px] leading-5 text-paper-100/70">
                {isEmpty ? 'Log one entry in any domain to begin your balance.' : `Strongest in ${STRONGEST_DOMAIN.name}. ${GROWTH_DOMAIN.name} has room to grow.`}
              </p>
              {!isEmpty && <div className="[&_span]:!text-[12px]"><Provenance items={screenState === 'low-confidence' ? ['Via RPG stats · Sleep syncing'] : ['Via RPG stats']} /></div>}
              <button
                type="button"
                className="focus-ring min-h-11 rounded-pill border border-white/15 px-4 text-[12px] font-semibold text-paper-100"
                disabled={isDisabled}
                aria-describedby={isDisabled ? 'rpg-disabled-reason' : undefined}
                onClick={event => openRanked(event.currentTarget)}
              >
                Open ranked breakdown
              </button>
            </SolidCard>

            {!isEmpty && (
              <ol className="sr-only" aria-label={`All ten domains ranked by score. Life Power ${LIFE_POWER}.`}>
                {DOMAIN_RANKING.map((domain, index) => <li key={domain.name}>{index + 1}. {domain.name}, {domain.value} from {domain.source}</li>)}
              </ol>
            )}

            <section className="space-y-3" aria-labelledby="rpg-domain-skills-title">
              <div id="rpg-domain-skills-title"><SectionTitle title="Domain skills" meta={`${LIFE_DOMAINS.length} domains`} /></div>
              <div className="grid grid-cols-2 gap-2.5">
                {LIFE_DOMAINS.map(domain => (
                  <button
                    key={domain.name}
                    type="button"
                    data-domain-control={domain.name.toLowerCase()}
                    className="focus-ring surface-warm min-h-[88px] rounded-xl p-3 text-left"
                    disabled={isDisabled}
                    aria-describedby={isDisabled ? 'rpg-disabled-reason' : undefined}
                    aria-label={isEmpty
                      ? `${domain.name}, no score yet. Log one entry to begin.`
                      : `${domain.name}, ${domain.value} out of 99${screenState === 'low-confidence' && domain.name === 'Sleep' ? ', estimated, low confidence' : ''}. Open domain details.`}
                    onClick={event => openDomain(domain, event.currentTarget)}
                  >
                    <span className={`text-[12px] font-semibold uppercase tracking-wide ${domain.color}`}>{domain.name}</span>
                    <span className="mt-1.5 block text-[20px] font-semibold tabular-nums text-paper-100">{isEmpty ? '--' : domain.value}</span>
                    <span className={`mt-2 block h-1.5 w-full overflow-hidden rounded-pill bg-white/[0.08] ${screenState === 'low-confidence' && domain.name === 'Sleep' ? 'border border-dashed border-paper-100/50' : ''}`} aria-hidden="true">
                      <span className={`block h-full rounded-pill ${domain.bar}`} style={{ width: `${isEmpty ? 0 : domain.value}%` }} />
                    </span>
                    {isEmpty && <span className="mt-1.5 block text-[12px] text-paper-100/65">Log one entry to begin</span>}
                    {screenState === 'low-confidence' && domain.name === 'Sleep' && <span className="mt-1.5 block text-[12px] text-paper-100/70">Estimated · low confidence</span>}
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="focus-ring flex min-h-12 w-full items-center justify-between rounded-xl border border-white/12 bg-white/[0.03] px-4 text-left"
                disabled={isDisabled}
                aria-describedby={isDisabled ? 'rpg-disabled-reason' : undefined}
                onClick={event => openDataControls(event.currentTarget)}
              >
                <span className="flex items-center gap-3 text-[13px] font-medium text-paper-100"><ShieldCheck className="h-5 w-5 text-paper-100/70" aria-hidden="true" />Review data controls</span>
                <ChevronRight className="h-4 w-4 text-paper-100/60" aria-hidden="true" />
              </button>
            </section>

            {!isEmpty && (
              <section className="space-y-3" aria-labelledby="rpg-ranked-section-title">
                <div id="rpg-ranked-section-title"><SectionTitle title="Ranked" meta="All domains" /></div>
                <SolidCard className="!p-0">
                  <ol className="divide-y divide-white/[0.06]" aria-label="Visible all-domain ranking">
                    {DOMAIN_RANKING.map((domain, index) => (
                      <li key={domain.name} className="flex min-h-11 items-center gap-3 px-4 py-2">
                        <span className="w-5 text-[12px] tabular-nums text-paper-100/60">{index + 1}</span>
                        <span className={`w-24 shrink-0 text-[12px] font-medium ${domain.color}`}>{domain.name}</span>
                        <span className="h-2 flex-1 overflow-hidden rounded-pill bg-white/[0.08]" aria-hidden="true"><span className={`block h-full rounded-pill ${domain.bar}`} style={{ width: `${domain.value}%` }} /></span>
                        <span className="w-7 text-right text-[12px] font-semibold tabular-nums text-paper-100">{domain.value}</span>
                      </li>
                    ))}
                  </ol>
                </SolidCard>
              </section>
            )}

            <section className="space-y-3" aria-labelledby="rpg-rewards-title">
              <div id="rpg-rewards-title"><SectionTitle title="Streak & rewards" /></div>
              {isEmpty ? (
                <SolidCard><p className="text-[13px] leading-5 text-paper-100/70">No active streak — start a new one today.</p></SolidCard>
              ) : (
                <div className="grid grid-cols-3 gap-2.5">
                  <SolidCard className="flex flex-col items-center gap-1.5 py-3.5 text-center"><Flame className="h-4 w-4 text-brand-orange" aria-hidden="true" /><span className="text-[15px] font-semibold tabular-nums text-paper-100">42 days</span></SolidCard>
                  <SolidCard className="flex flex-col items-center gap-1.5 py-3.5 text-center"><Sparkles className="h-4 w-4 text-brand-orange" aria-hidden="true" /><span className="text-[15px] font-semibold tabular-nums text-paper-100">2.5&times; XP</span></SolidCard>
                  <SolidCard className="flex flex-col items-center gap-1.5 py-3.5 text-center"><Snowflake className="h-4 w-4 text-paper-100/70" aria-hidden="true" /><span className="text-[15px] font-semibold tabular-nums text-paper-100">2 freezes</span></SolidCard>
                </div>
              )}
              {!isEmpty && <div data-reward-freshness={screenState} className="[&_span]:!text-[12px]"><Provenance items={[rewardFreshness]} /></div>}
            </section>

            <section className="space-y-2.5" aria-labelledby="rpg-history-title">
              <div className="flex items-center justify-between gap-3">
                <div id="rpg-history-title"><SectionTitle title="Mission history" /></div>
                {dashboardUnavailable ? (
                  <button type="button" disabled aria-describedby="rpg-dashboard-disabled-reason" className="flex min-h-11 items-center gap-1 px-2 text-[13px] font-medium text-paper-100/50">View all <ChevronRight className="h-4 w-4" aria-hidden="true" /></button>
                ) : (
                  <Link href="/screens/13" className="focus-ring flex min-h-11 items-center gap-1 rounded-sm px-2 text-[13px] font-medium text-brand-orange">View all <ChevronRight className="h-4 w-4" aria-hidden="true" /></Link>
                )}
              </div>
              {isEmpty ? (
                <SolidCard><p className="text-[13px] leading-5 text-paper-100/70">Completed Missions will appear here.</p></SolidCard>
              ) : (
                <div className="overflow-hidden rounded-2xl border border-white/[0.08]">
                  {MISSION_HISTORY.map((mission, index) => dashboardUnavailable ? (
                    <button key={mission.id} type="button" disabled aria-describedby="rpg-dashboard-disabled-reason" aria-label={`${mission.name}, ${mission.domain} Mission, completed at ${mission.progress} percent, ${missionHistoryAccessibleFreshness ?? mission.completedAt}`} data-mission-history-row={mission.id} data-mission-progress={mission.progress} className={`flex min-h-14 w-full items-center justify-between gap-3 px-4 py-3 text-left disabled:opacity-60 ${index > 0 ? 'border-t border-white/[0.06]' : ''}`}>
                      <span><span className="block text-[14px] font-medium text-paper-100">{mission.name}</span><span className="mt-0.5 block text-[12px] text-paper-100">{mission.domain} Mission · {missionHistoryVisibleFreshness ?? mission.completedAt}</span></span>
                      <span className="flex items-center gap-1.5 text-[13px] font-semibold tabular-nums text-paper-100/70"><Check className="h-4 w-4 text-forest-green" aria-hidden="true" />{mission.progress}%</span>
                    </button>
                  ) : (
                    <Link key={mission.id} href={`/screens/14?mission=${encodeURIComponent(mission.id)}`} aria-label={`${mission.name}, ${mission.domain} Mission, completed at ${mission.progress} percent, ${missionHistoryAccessibleFreshness ?? mission.completedAt}`} data-mission-history-row={mission.id} data-mission-progress={mission.progress} className={`focus-ring flex min-h-14 w-full items-center justify-between gap-3 px-4 py-3 text-left ${missionHistoryIsCached ? 'opacity-70' : ''} ${index > 0 ? 'border-t border-white/[0.06]' : ''}`}>
                      <span><span className="block text-[14px] font-medium text-paper-100">{mission.name}</span><span className="mt-0.5 block text-[12px] text-paper-100">{mission.domain} Mission · {missionHistoryVisibleFreshness ?? mission.completedAt}</span></span>
                      <span className="flex items-center gap-2"><span className="flex items-center gap-1.5 text-[13px] font-semibold tabular-nums text-paper-100/70"><Check className="h-4 w-4 text-forest-green" aria-hidden="true" />{mission.progress}%</span><ChevronRight className="h-4 w-4 text-paper-100/55" aria-hidden="true" /></span>
                    </Link>
                  ))}
                </div>
              )}
            </section>

            {isDisabled && <p id="rpg-disabled-reason" className="text-[12px] leading-5 text-paper-100/70">Controls are intentionally unavailable in this disabled fixture. No RPG or account data can change.</p>}
            {dashboardUnavailable && <p id="rpg-dashboard-disabled-reason" className="text-[12px] leading-5 text-paper-100/70">Mission dashboard navigation is unavailable in this {screenState} fixture.</p>}
          </>
        )}

        <p className="min-h-10 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-[12px] leading-5 text-paper-100/70" role="status" aria-live="polite" aria-atomic="true">
          {status}
        </p>
      </main>
      </HifiShell>
    </div>
  )
}
