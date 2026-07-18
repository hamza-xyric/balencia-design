'use client'

import {
  AlertTriangle,
  Apple,
  CalendarDays,
  Check,
  ChevronRight,
  Clock,
  Database,
  HeartPulse,
  Info,
  MoreHorizontal,
  RotateCcw,
  ShieldCheck,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import {
  BtnDestructive,
  BtnGhost,
  BtnPrimary,
  BtnSecondary,
  BtnSuccess,
  Chip,
  CIAInsightCard,
  CIAPresenceOrb,
  GlassCard,
  HifiShell,
  IconButton,
  ProgressBar,
  Provenance,
  SectionTitle,
  SolidCard,
  TopBar,
} from '@/components/hifi/kit'
import { E1Modal } from '../intelligence/E1Modal'
import { I1TextScaleScope } from './I1TextScaleScope'

const S85_STATES = [
  'default',
  'blocker-time-accepted',
  'blocker-food-dismissed',
  'blocker-recovery-dismissed',
  'undo-restored',
  'detail-time',
  'detail-food',
  'detail-recovery',
  'data-controls',
  'dependencies',
  'plan-review',
  'plan-success',
  'plan-error',
  'skeleton',
  'empty',
  'offline',
  'disabled-consent',
  'safety-support',
] as const

type S85State = (typeof S85_STATES)[number]
type BlockerStatus = 'review' | 'accepted' | 'dismissed'

const BLOCKERS = [
  {
    id: 'time',
    title: 'Late meetings may have shifted runs',
    evidence: '3 missed run check-ins followed meetings ending after 7 PM.',
    nextStep: 'Review Tuesday at 6 AM as one possible alternative.',
    source: 'Bundled calendar and mission fixture',
    category: 'Schedule pattern',
    freshness: 'Fixed review date · July 14',
    confidence: 'Moderate · three matching fixture events',
    Icon: Clock,
    iconTone: 'text-brand-orange',
  },
  {
    id: 'food',
    title: 'Meal preparation may be one factor',
    evidence: '2 local nutrition entries were incomplete before planned runs.',
    nextStep: 'Consider preparing lunch before the next travel day.',
    source: 'Bundled nutrition-log fixture',
    category: 'Nutrition context',
    freshness: 'Fixed review date · July 13',
    confidence: 'Low · only two partial signals',
    Icon: Apple,
    iconTone: 'text-domain-nutrition',
  },
  {
    id: 'recovery',
    title: 'Travel notes may have narrowed recovery time',
    evidence: '2 private check-in dates mention low energy after travel.',
    nextStep: 'Review a lighter return step instead of increasing effort.',
    source: 'Bundled check-in-date fixture',
    category: 'Recovery context',
    freshness: 'Fixed review date · July 12',
    confidence: 'Low · no clinical or causal inference',
    Icon: HeartPulse,
    iconTone: 'text-domain-wellbeing',
  },
] as const

type BlockerId = (typeof BLOCKERS)[number]['id']
type Panel =
  | { kind: 'detail'; blockerId: BlockerId }
  | { kind: 'data' | 'dependencies' | 'plan' | 'safety' }
  | null

const DEFAULT_BLOCKER_STATUS: Record<BlockerId, BlockerStatus> = {
  time: 'review',
  food: 'review',
  recovery: 'review',
}

function isS85State(value: string | null): value is S85State {
  return value !== null && S85_STATES.includes(value as S85State)
}

function dialogForState(state: S85State): Panel {
  if (state === 'detail-time') return { kind: 'detail', blockerId: 'time' }
  if (state === 'detail-food') return { kind: 'detail', blockerId: 'food' }
  if (state === 'detail-recovery') return { kind: 'detail', blockerId: 'recovery' }
  if (state === 'data-controls') return { kind: 'data' }
  if (state === 'dependencies') return { kind: 'dependencies' }
  if (state === 'plan-review') return { kind: 'plan' }
  if (state === 'safety-support') return { kind: 'safety' }
  return null
}

function stateNotice(state: S85State) {
  if (state === 'blocker-time-accepted') return 'Time blocker accepted for this local preview. Nothing was scheduled or changed.'
  if (state === 'blocker-food-dismissed') return 'Food blocker dismissed locally. Undo remains available.'
  if (state === 'blocker-recovery-dismissed') return 'Recovery blocker dismissed locally. Undo remains available.'
  if (state === 'undo-restored') return 'All dismissed blockers restored to review. Accepted steps remain accepted.'
  if (state === 'plan-success') return 'Local reconnection preview is ready. No mission, provider, or calendar record changed.'
  if (state === 'plan-error') return 'The local plan preview could not be prepared. The evidence remains available.'
  if (state === 'offline') return 'Offline fixture. No source was refreshed and no sync was attempted.'
  if (state === 'disabled-consent') return 'Plan preview is unavailable until the local consent fixture is reviewed.'
  if (state === 'safety-support') return 'Safety support preview opened before any coaching-plan action.'
  return 'Three bundled suggestions are ready for review. They are possible patterns, not a diagnosis.'
}

function planBlockReasonForState(state: S85State) {
  if (state === 'skeleton') return 'The bundled fixture is still being prepared.'
  if (state === 'empty') return 'No recurring blocker pattern is available for a plan preview.'
  if (state === 'offline') return 'Offline fixture: evidence cannot refresh, so plan preview stays disabled.'
  if (state === 'disabled-consent') return 'Review the local data-use choice before previewing a plan.'
  if (state === 'safety-support') return 'Safety support stays in front of coaching actions.'
  return ''
}

function BlockerCard({
  blocker,
  status,
  onAccept,
  onDismiss,
  onDetails,
}: {
  blocker: (typeof BLOCKERS)[number]
  status: BlockerStatus
  onAccept: () => void
  onDismiss: () => void
  onDetails: () => void
}) {
  const { Icon } = blocker

  return (
    <SolidCard
      className={status === 'accepted' ? 'border border-forest-green/35' : 'border border-white/[0.06]'}
    >
      <div data-blocker-card data-blocker-row data-blocker-id={blocker.id} data-blocker-state={status} className="space-y-3">
        <button
          type="button"
          onClick={onDetails}
          className="focus-ring flex min-h-11 w-full items-start gap-3 rounded-lg text-left"
          aria-label={`Review evidence for ${blocker.title}`}
        >
          <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] ${blocker.iconTone}`} aria-hidden="true">
            <Icon className="h-5 w-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[16px] font-semibold leading-5 text-paper-100">{blocker.title}</span>
            <span className="mt-1 block text-[12px] leading-4 text-paper-100/70">{blocker.evidence}</span>
          </span>
          <ChevronRight className="mt-3 h-4 w-4 shrink-0 text-paper-100/65" aria-hidden="true" />
        </button>

        <p className="text-[14px] leading-5 text-paper-100/80">{blocker.nextStep}</p>
        <div className="flex flex-wrap items-center gap-2">
          <Chip tone={status === 'accepted' ? 'done' : 'muted'}>{status === 'accepted' ? 'Accepted locally' : blocker.confidence}</Chip>
          <Chip tone="muted">{blocker.source}</Chip>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <BtnSecondary className="min-h-11 px-3" disabled={status === 'accepted'} onClick={onAccept}>
            {status === 'accepted' ? 'Accepted' : 'Accept step'}
          </BtnSecondary>
          <BtnGhost quiet className="min-h-11 px-3" onClick={onDismiss}>Dismiss</BtnGhost>
        </div>
      </div>
    </SolidCard>
  )
}

function DialogHeader({ title, onClose }: { title: string; onClose: () => void }) {
  return (
    <div className="flex min-h-11 items-center justify-between gap-3">
      <h2 className="text-[20px] font-semibold leading-6 text-paper-100">{title}</h2>
      <IconButton label={`Close ${title.toLowerCase()}`} onClick={onClose}><X size={18} /></IconButton>
    </div>
  )
}

export function S85ObstacleCoach() {
  const [screenState, setScreenState] = useState<S85State>('default')
  const [blockerStatus, setBlockerStatus] = useState<Record<BlockerId, BlockerStatus>>(DEFAULT_BLOCKER_STATUS)
  const [panel, setPanel] = useState<Panel>(null)
  const [lastDismissed, setLastDismissed] = useState<BlockerId | null>(null)
  const [notice, setNotice] = useState(stateNotice('default'))
  const [dialogStatus, setDialogStatus] = useState('')
  const panelReturnRef = useRef<{ state: S85State; notice: string }>({
    state: 'default',
    notice: stateNotice('default'),
  })

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const requested = new URLSearchParams(window.location.search).get('state')
      const state = isS85State(requested) ? requested : 'default'
      const statuses = { ...DEFAULT_BLOCKER_STATUS }
      if (state === 'blocker-time-accepted' || state === 'plan-success') statuses.time = 'accepted'
      if (state === 'blocker-food-dismissed') statuses.food = 'dismissed'
      if (state === 'blocker-recovery-dismissed') statuses.recovery = 'dismissed'
      setScreenState(state)
      setBlockerStatus(statuses)
      setLastDismissed(
        state === 'blocker-food-dismissed'
          ? 'food'
          : state === 'blocker-recovery-dismissed'
            ? 'recovery'
            : null,
      )
      setNotice(stateNotice(state))
      const directPanel = dialogForState(state)
      setDialogStatus('')
      setPanel(directPanel)
      panelReturnRef.current = directPanel
        ? { state: 'default', notice: stateNotice('default') }
        : { state, notice: stateNotice(state) }
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  const visibleBlockers = BLOCKERS.filter(blocker => blockerStatus[blocker.id] !== 'dismissed')
  const dismissedBlockers = BLOCKERS.filter(blocker => blockerStatus[blocker.id] === 'dismissed')
  const acceptedCount = BLOCKERS.filter(blocker => blockerStatus[blocker.id] === 'accepted').length
  const selectedBlocker = panel?.kind === 'detail' ? BLOCKERS.find(blocker => blocker.id === panel.blockerId) : undefined
  const planCandidate = visibleBlockers.find(blocker => blockerStatus[blocker.id] === 'review') ?? visibleBlockers[0]
  const isEmpty = screenState === 'empty'
  const isSkeleton = screenState === 'skeleton'
  const planBlockReason = planBlockReasonForState(screenState)
  const planBlocked = Boolean(planBlockReason)

  const beginPanel = (nextPanel: Exclude<Panel, null>, nextState: S85State) => {
    panelReturnRef.current = { state: screenState, notice }
    setDialogStatus('')
    setScreenState(nextState)
    setNotice(stateNotice(nextState))
    setPanel(nextPanel)
  }

  const openDetail = (blockerId: BlockerId) => {
    const nextState = `detail-${blockerId}` as S85State
    beginPanel({ kind: 'detail', blockerId }, nextState)
  }

  const openPanel = (kind: 'data' | 'dependencies' | 'safety') => {
    const nextState: Record<typeof kind, S85State> = {
      data: 'data-controls',
      dependencies: 'dependencies',
      safety: 'safety-support',
    }
    beginPanel({ kind }, nextState[kind])
  }

  const openPlan = () => {
    if (planBlocked) {
      setNotice(planBlockReason)
      return
    }
    beginPanel({ kind: 'plan' }, 'plan-review')
  }

  const closePanel = () => {
    const restore = panelReturnRef.current
    setPanel(null)
    setDialogStatus('')
    setScreenState(restore.state)
    setNotice(restore.notice)
  }

  const acceptBlocker = (blockerId: BlockerId) => {
    const originState = panel?.kind === 'detail' ? panelReturnRef.current.state : screenState
    setBlockerStatus(current => ({ ...current, [blockerId]: 'accepted' }))
    if (blockerId === 'time' && !planBlockReasonForState(originState)) setScreenState('blocker-time-accepted')
    else setScreenState(originState)
    setNotice(`${BLOCKERS.find(blocker => blocker.id === blockerId)?.title ?? 'Blocker'} accepted for this local preview only.`)
  }

  const dismissBlocker = (blockerId: BlockerId) => {
    const originState = panel?.kind === 'detail' ? panelReturnRef.current.state : screenState
    const invalidatesReadyPreview = originState === 'plan-success' && blockerStatus[blockerId] === 'accepted'
    setBlockerStatus(current => ({ ...current, [blockerId]: 'dismissed' }))
    setLastDismissed(blockerId)
    if (invalidatesReadyPreview) setScreenState('default')
    else if (planBlockReasonForState(originState)) setScreenState(originState)
    else if (blockerId === 'food') setScreenState('blocker-food-dismissed')
    else if (blockerId === 'recovery') setScreenState('blocker-recovery-dismissed')
    else setScreenState(originState)
    setNotice(
      invalidatesReadyPreview
        ? `${BLOCKERS.find(blocker => blocker.id === blockerId)?.title ?? 'Blocker'} dismissed locally. The ready preview was cleared; undo is available.`
        : `${BLOCKERS.find(blocker => blocker.id === blockerId)?.title ?? 'Blocker'} dismissed locally. Undo is available.`,
    )
  }

  const undoDismissal = () => {
    const dismissedCount = dismissedBlockers.length
    setBlockerStatus(current => ({
      time: current.time === 'dismissed' ? 'review' : current.time,
      food: current.food === 'dismissed' ? 'review' : current.food,
      recovery: current.recovery === 'dismissed' ? 'review' : current.recovery,
    }))
    if (!planBlocked) setScreenState('undo-restored')
    setNotice(
      dismissedCount === 1
        ? 'Dismissed blocker restored to review. Accepted steps remain accepted.'
        : `${dismissedCount} dismissed blockers restored to review. Accepted steps remain accepted.`,
    )
    setLastDismissed(null)
  }

  const resetToEmpty = (message: string) => {
    setPanel(null)
    setDialogStatus('')
    setBlockerStatus(DEFAULT_BLOCKER_STATUS)
    setScreenState('empty')
    setNotice(message)
  }

  const bottomAction = (
    <div className="px-4 pb-1" data-testid="s85-bottom-action">
      {isSkeleton ? (
        <BtnPrimary className="w-full" disabled aria-describedby="s85-action-reason">Preparing local preview</BtnPrimary>
      ) : isEmpty ? (
        <BtnPrimary className="w-full" onClick={() => openPanel('dependencies')}>Review mission rhythm</BtnPrimary>
      ) : screenState === 'plan-error' ? (
        <BtnPrimary className="w-full" onClick={openPlan}>Try local preview again</BtnPrimary>
      ) : screenState === 'plan-success' ? (
        <BtnSuccess className="w-full" onClick={openPlan}>Review local plan preview</BtnSuccess>
      ) : planBlocked ? (
        <BtnPrimary className="w-full" disabled aria-describedby="s85-action-reason">Plan preview unavailable</BtnPrimary>
      ) : (
        <BtnPrimary className="w-full" onClick={openPlan}>Review reconnection steps</BtnPrimary>
      )}
      {planBlocked && (
        <p id="s85-action-reason" className="mt-2 text-center text-[12px] leading-4 text-paper-100/70">
          {planBlockReason}
        </p>
      )}
    </div>
  )

  const overlay = panel ? (
    <E1Modal
      label={
        panel.kind === 'detail'
          ? `${selectedBlocker?.title ?? 'Blocker'} evidence`
          : panel.kind === 'data'
            ? 'Obstacle data controls'
            : panel.kind === 'dependencies'
              ? 'Obstacle capability limits'
              : panel.kind === 'plan'
                ? 'Review reconnection steps'
                : 'Safety support preview'
      }
      onClose={closePanel}
      className="!bg-ink-brown-800 !backdrop-blur-none"
    >
      {panel.kind === 'detail' && selectedBlocker && (
        <>
          <DialogHeader title="Evidence detail" onClose={closePanel} />
          <p className="mt-3 text-[15px] font-semibold leading-5 text-paper-100">{selectedBlocker.title}</p>
          <p className="mt-2 text-[13px] leading-5 text-paper-100/75">{selectedBlocker.evidence}</p>
          <dl className="mt-4 grid gap-2 text-[13px] leading-5">
            {[
              ['Category', selectedBlocker.category],
              ['Source', selectedBlocker.source],
              ['Scope', 'This bundled obstacle fixture only'],
              ['Freshness', selectedBlocker.freshness],
              ['Confidence', selectedBlocker.confidence],
              ['Boundary', 'Possible coaching context, not a diagnosis or causal finding'],
            ].map(([term, value]) => (
              <div key={term} className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
                <dt className="font-semibold text-paper-100">{term}</dt>
                <dd className="text-paper-100/70">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <BtnSecondary onClick={() => { acceptBlocker(selectedBlocker.id); setDialogStatus(''); setPanel(null) }}>Accept step</BtnSecondary>
            <BtnGhost quiet onClick={() => { dismissBlocker(selectedBlocker.id); setDialogStatus(''); setPanel(null) }}>Dismiss</BtnGhost>
          </div>
        </>
      )}

      {panel.kind === 'data' && (
        <>
          <DialogHeader title="Data controls" onClose={closePanel} />
          <p className="mt-2 text-[13px] leading-5 text-paper-100/75">Every value below is a bundled visual fixture. No account, provider, or device data is connected.</p>
          <dl className="mt-4 grid grid-cols-2 gap-2 text-[12px] leading-4">
            {[
              ['Category', 'Schedule, nutrition, check-in dates'],
              ['Source', 'Bundled local fixture'],
              ['Scope', 'This obstacle review only'],
              ['Audience', 'Private preview; never shared'],
              ['Freshness', 'Fixed July 12–14'],
              ['Confidence', 'Moderate or low per row'],
              ['Retention', 'In memory for this mount'],
              ['Correction', 'Review source detail per row'],
            ].map(([term, value]) => (
              <div key={term} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                <dt className="font-semibold text-paper-100">{term}</dt>
                <dd className="mt-1 text-paper-100/70">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-4 grid gap-2">
            <BtnSecondary onClick={() => setDialogStatus('Local export preview prepared. No file was created or opened.')}>Preview export</BtnSecondary>
            <BtnGhost quiet onClick={() => { setPanel(null); setDialogStatus(''); setScreenState('disabled-consent'); setNotice('Local consent revoked. No source or account setting changed.') }}>Revoke local consent</BtnGhost>
            <BtnGhost quiet onClick={() => setDialogStatus('Correction preview opened locally. No source record changed.')}>Preview correction</BtnGhost>
            <BtnDestructive onClick={() => resetToEmpty('Recommendation history removed from this in-memory preview only.')}>Preview delete history</BtnDestructive>
          </div>
          <p className="mt-3 min-h-11 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-[12px] leading-4 text-paper-100/75" role="status" aria-live="polite">
            {dialogStatus || 'Choose a data action to preview its local, reversible outcome.'}
          </p>
        </>
      )}

      {panel.kind === 'dependencies' && (
        <>
          <DialogHeader title="Capability limits" onClose={closePanel} />
          <div className="mt-3 space-y-3 text-[13px] leading-5 text-paper-100/75">
            <p>This screen demonstrates obstacle-coaching states with bundled records. It does not run detection, diagnosis, or plan generation.</p>
            <p>Calendar, nutrition, and check-in labels are provenance examples only. No provider is connected and nothing can sync, schedule, mutate, or notify.</p>
            <p>Reconnection is a local step preview. It does not create a mission plan or navigate to a production flow.</p>
          </div>
          <BtnGhost className="mt-4 w-full" quiet onClick={closePanel}>Close capability limits</BtnGhost>
        </>
      )}

      {panel.kind === 'plan' && (
        <>
          <DialogHeader title="Review reconnection steps" onClose={closePanel} />
          <p className="mt-2 text-[13px] leading-5 text-paper-100/75">This is an editable-looking local preview, not a generated or saved plan.</p>
          <ol className="mt-4 space-y-2 text-[13px] leading-5">
            {visibleBlockers.map((blocker, index) => (
              <li key={blocker.id} className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-3 text-paper-100/80">
                <span className="font-semibold tabular-nums text-brand-orange">{index + 1}</span>
                <span>{blocker.nextStep}</span>
              </li>
            ))}
          </ol>
          {!planCandidate && <p id="s85-plan-empty-reason" className="mt-3 text-[12px] leading-4 text-paper-100/70">Restore at least one dismissed blocker before creating a local plan preview.</p>}
          <div className="mt-4 grid gap-2">
            <BtnPrimary
              disabled={!planCandidate}
              aria-describedby={!planCandidate ? 's85-plan-empty-reason' : undefined}
              onClick={() => {
                if (!planCandidate) return
                setPanel(null)
                setDialogStatus('')
                setScreenState('plan-success')
                setBlockerStatus(current => ({ ...current, [planCandidate.id]: 'accepted' }))
                setNotice(stateNotice('plan-success'))
              }}
            >
              Create local preview
            </BtnPrimary>
            <BtnGhost quiet onClick={closePanel}>Keep reviewing blockers</BtnGhost>
          </div>
        </>
      )}

      {panel.kind === 'safety' && (
        <>
          <DialogHeader title="Safety support preview" onClose={closePanel} />
          <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <ShieldCheck className="h-6 w-6 text-paper-100/75" aria-hidden="true" />
            <p className="mt-3 text-[14px] font-semibold leading-5 text-paper-100">Coaching pauses when safety support may be needed</p>
            <p className="mt-2 text-[13px] leading-5 text-paper-100/75">This visual prototype cannot assess risk, place a call, send a message, or choose a local service. In immediate danger, use local emergency services or contact a trusted person directly.</p>
          </div>
          <BtnGhost className="mt-4 w-full" quiet onClick={closePanel}>Close safety preview</BtnGhost>
        </>
      )}
    </E1Modal>
  ) : undefined

  return (
    <HifiShell
      header={
        <TopBar
          title="Obstacle coach"
          right={
            <IconButton
              label="Open plan review"
              disabled={planBlocked}
              aria-describedby={planBlocked ? 's85-action-reason' : undefined}
              className="disabled:cursor-not-allowed disabled:opacity-40"
              onClick={openPlan}
            >
              <MoreHorizontal size={18} />
            </IconButton>
          }
          back
        />
      }
      activeTab="goals"
      atmosphere="cia"
      bottomAction={bottomAction}
      overlay={overlay}
    >
      <main data-i1-state={`85-${screenState}`} className="hide-scrollbar space-y-5 px-4 pb-5 pt-3 motion-reduce:scroll-auto">
        <I1TextScaleScope />

        {isSkeleton ? (
          <>
            <div aria-label="Preparing obstacle review">
              <GlassCard tone="muted" className="space-y-4">
                <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-paper-100/70">Preparing obstacle review</p>
                <div className="skeleton-block h-8 w-4/5 rounded-lg motion-reduce:animate-none" />
                <div className="skeleton-block h-4 w-full rounded-lg motion-reduce:animate-none" />
                <div className="skeleton-block h-4 w-2/3 rounded-lg motion-reduce:animate-none" />
              </GlassCard>
            </div>
            <section className="space-y-3" aria-label="Loading blocker suggestions">
              <SectionTitle title="Possible blockers" meta="Preparing 3 rows" />
              {[0, 1, 2].map(index => (
                <div key={index} data-blocker-skeleton>
                  <SolidCard className="space-y-3">
                    <div className="skeleton-block h-5 w-3/4 rounded-lg motion-reduce:animate-none" />
                    <div className="skeleton-block h-4 w-full rounded-lg motion-reduce:animate-none" />
                    <div className="skeleton-block h-11 w-full rounded-lg motion-reduce:animate-none" />
                  </SolidCard>
                </div>
              ))}
            </section>
          </>
        ) : isEmpty ? (
          <>
            <div aria-labelledby="s85-empty-title">
              <GlassCard tone="muted" className="space-y-3">
                <Chip tone="muted">Honest null</Chip>
                <h2 id="s85-empty-title" className="text-[30px] font-semibold leading-[34px] tracking-[-0.02em] text-paper-100">No recurring blocker pattern yet</h2>
                <p className="text-[15px] leading-6 text-paper-100/75">The bundled fixture does not contain enough repeated evidence to name a root cause or recommend a time.</p>
                <Provenance items={['Bundled local fixture', 'No comparable pattern']} />
              </GlassCard>
            </div>
            <SolidCard>
              <h2 className="text-[17px] font-semibold leading-6 text-paper-100">A safe next step</h2>
              <p className="mt-2 text-[14px] leading-5 text-paper-100/75">Review the mission rhythm manually. Nothing is inferred, scheduled, or changed.</p>
            </SolidCard>
          </>
        ) : (
          <>
            <div aria-labelledby="s85-hero-title" aria-describedby="s85-hero-summary">
            <GlassCard tone={screenState === 'plan-success' ? 'done' : 'cia'} className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Chip tone={screenState === 'plan-success' ? 'done' : 'cia'}>{screenState === 'plan-success' ? 'Preview ready' : 'Pattern review'}</Chip>
                    <Chip tone="muted">{visibleBlockers.length === 3 ? '3 possible blockers' : `${visibleBlockers.length} active · ${3 - visibleBlockers.length} dismissed`}</Chip>
                    {dismissedBlockers.length === 1 && <Chip tone="muted">{dismissedBlockers[0].title} dismissed</Chip>}
                    {dismissedBlockers.length > 1 && <Chip tone="muted">{dismissedBlockers.length} blockers dismissed</Chip>}
                  </div>
                  <h2 id="s85-hero-title" className="text-[30px] font-semibold leading-[34px] tracking-[-0.02em] text-paper-100">Possible patterns behind missed runs</h2>
                  <p id="s85-hero-summary" className="text-[15px] leading-6 text-paper-100/75">
                    CIA found context worth reviewing in a bundled fixture. These are coaching suggestions, not a diagnosis or proof of cause.
                  </p>
                  <Provenance items={['Bundled mission fixture', 'July 12–14', 'Mixed confidence']} />
                </div>
                <CIAPresenceOrb size={48} state={screenState === 'plan-success' ? 'success' : 'thinking'} amplitude={0.52} />
              </div>
              {acceptedCount > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-[12px] leading-4 text-paper-100/70"><span>Reviewed steps</span><span className="tabular-nums">{acceptedCount} of 3</span></div>
                  <ProgressBar value={(acceptedCount / 3) * 100} tone={screenState === 'plan-success' ? 'done' : 'you'} />
                </div>
              )}
            </GlassCard>
            </div>

            {screenState === 'plan-error' && (
              <SolidCard className="border border-brand-orange/35">
                <div className="flex gap-3">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" aria-hidden="true" />
                  <div><h2 id="s85-error-title" className="text-[16px] font-semibold text-paper-100">Local plan preview unavailable</h2><p className="mt-1 text-[13px] leading-5 text-paper-100/75">The evidence remains visible. Review blockers or try the local preview again.</p></div>
                </div>
              </SolidCard>
            )}

            {screenState === 'plan-success' && (
              <SolidCard className="border border-forest-green/35">
                <div className="flex gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-forest-green" aria-hidden="true" />
                  <div><h2 id="s85-success-title" className="text-[16px] font-semibold text-paper-100">Local reconnection preview ready</h2><p className="mt-1 text-[13px] leading-5 text-paper-100/75">One reviewed step is highlighted. No plan, mission, calendar, or provider record was created.</p></div>
                </div>
              </SolidCard>
            )}

            {(screenState === 'offline' || screenState === 'disabled-consent') && (
              <SolidCard className="border border-white/10">
                <div className="flex gap-3">
                  <Database className="mt-0.5 h-5 w-5 shrink-0 text-paper-100/70" aria-hidden="true" />
                  <div><h2 id="s85-blocked-title" className="text-[16px] font-semibold text-paper-100">{screenState === 'offline' ? 'Offline fixture' : 'Consent review needed'}</h2><p className="mt-1 text-[13px] leading-5 text-paper-100/75">{screenState === 'offline' ? 'The bundled evidence stays visible, but refresh, scheduling, and plan preview are disabled.' : 'Evidence remains visible while plan preview is disabled. Open data controls to review the local choice.'}</p></div>
                </div>
              </SolidCard>
            )}

            {(lastDismissed || screenState === 'undo-restored') && (
              <div className="flex min-h-14 items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4" role="status" data-testid="s85-undo-toast">
                <p className="text-[13px] leading-5 text-paper-100/80">{screenState === 'undo-restored' ? 'All dismissed blockers restored; accepted steps were preserved.' : `${dismissedBlockers.length} ${dismissedBlockers.length === 1 ? 'blocker' : 'blockers'} dismissed from this local preview.`}</p>
                {lastDismissed && <BtnGhost className="shrink-0 px-3" onClick={undoDismissal}><RotateCcw className="h-4 w-4" aria-hidden="true" />Undo</BtnGhost>}
              </div>
            )}

            <section className="space-y-3" aria-labelledby="s85-blockers-heading">
              <SectionTitle title="Possible blockers" meta={`${visibleBlockers.length} for review`} />
              <h2 id="s85-blockers-heading" className="sr-only">Possible blockers</h2>
              {visibleBlockers.map(blocker => (
                <BlockerCard
                  key={blocker.id}
                  blocker={blocker}
                  status={blockerStatus[blocker.id]}
                  onAccept={() => acceptBlocker(blocker.id)}
                  onDismiss={() => dismissBlocker(blocker.id)}
                  onDetails={() => openDetail(blocker.id)}
                />
              ))}
            </section>

            <CIAInsightCard eyebrow="Timing to review" provenance={['Bundled schedule history', '3 comparable check-ins', 'Limited confidence']}>
              <div className="flex items-start gap-3 pt-1">
                <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-royal-purple" aria-hidden="true" />
                <p>Monday at 8:10 AM is one fixture-based option to review. It does not predict follow-through or schedule anything.</p>
              </div>
            </CIAInsightCard>

            <SolidCard className="border border-white/10">
              <div className="flex gap-3">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-paper-100/70" aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <h2 className="text-[16px] font-semibold leading-5 text-paper-100">Coaching support, not medical advice</h2>
                  <p className="mt-2 text-[13px] leading-5 text-paper-100/75">CIA can help reframe obstacles without diagnosing health or mental-health conditions. Safety support stays ahead of coaching actions.</p>
                  <BtnGhost className="mt-2 px-0" quiet onClick={() => openPanel('safety')}><ShieldCheck className="h-4 w-4" aria-hidden="true" />Review safety support</BtnGhost>
                </div>
              </div>
            </SolidCard>

            <section className="space-y-3" aria-label="Review and data actions">
              <SectionTitle title="Review controls" meta="Local preview only" />
              <div className="grid grid-cols-2 gap-2">
                <BtnSecondary onClick={() => openPanel('data')}>Data controls</BtnSecondary>
                <BtnSecondary onClick={() => openPanel('dependencies')}>Capability limits</BtnSecondary>
              </div>
            </section>
          </>
        )}

        <p className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-[12px] leading-4 text-paper-100/70" role="status" aria-live="polite" data-testid="s85-live-status">{notice}</p>
      </main>
    </HifiShell>
  )
}
