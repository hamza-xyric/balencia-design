'use client'

import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import {
  AlertTriangle,
  Check,
  ChevronRight,
  Eye,
  FileCheck2,
  FileDown,
  Flag,
  Flame,
  Lock,
  MessageSquareHeart,
  RotateCcw,
  Shield,
  ShieldCheck,
  Sparkles,
  Trash2,
  Users,
  WifiOff,
  X,
} from 'lucide-react'
import {
  Chip,
  CIAInsightCard,
  GlassCard,
  HifiShell,
  IconButton,
  PaywallLock,
  ProgressBar,
  ProgressRing,
  SectionTitle,
  SolidCard,
  TopBar,
  TrendChart,
  cx,
} from '@/components/hifi/kit'
import { persona } from '@/data/hifi/persona'

type ReputationState = 'default' | 'skeleton' | 'empty' | 'offline' | 'sync-error' | 'flagged' | 'success' | 'disabled'
type ReputationPanel = 'closed' | 'metric' | 'premium' | 'safety' | 'tier'
type MetricKey = 'consistency' | 'helpfulness' | 'engagement' | 'accountability'
type SafetyConfirmation = 'block member' | 'delete own content' | 'revoke visibility access'

const REPUTATION_STATES: ReputationState[] = ['default', 'skeleton', 'empty', 'offline', 'sync-error', 'flagged', 'success', 'disabled']
const REPUTATION_PANELS: ReputationPanel[] = ['closed', 'metric', 'premium', 'safety', 'tier']
const METRIC_KEYS: MetricKey[] = ['consistency', 'helpfulness', 'engagement', 'accountability']

const metrics: Record<MetricKey, { label: string; value: number; source: string; freshness: string; confidence: string; icon: LucideIcon }> = {
  consistency: { label: 'Consistency', value: 84, source: 'Activity commitments', freshness: 'Updated 2h ago', confidence: 'High confidence', icon: Flame },
  helpfulness: { label: 'Helpfulness', value: 88, source: 'Community replies', freshness: 'Updated 1h ago', confidence: 'High confidence', icon: MessageSquareHeart },
  engagement: { label: 'Engagement', value: 74, source: 'Community participation', freshness: 'Cached 14m ago', confidence: 'Low confidence', icon: Users },
  accountability: { label: 'Accountability', value: 61, source: 'Shared contracts', freshness: 'Updated yesterday', confidence: 'Medium confidence', icon: FileCheck2 },
}

const historyEvents = [
  { label: 'Joined community', when: '4 months ago' },
  { label: 'First helpful reply', when: '3 months ago' },
  { label: 'Reached Mentor tier', when: '2 weeks ago' },
] as const

const stateStatus: Record<ReputationState, string> = {
  default: 'Reputation preview is current. Score sources, freshness, confidence, and due-process controls are reviewable below.',
  skeleton: 'Reputation preview is loading. Score, metric, tier, and appeal controls are unavailable.',
  empty: 'No trust score yet. Reputation begins after the first eligible community trust event; no value is inferred.',
  offline: 'Offline preview. Score 82 is cached from 14 minutes ago; report, appeal, and data changes are unavailable.',
  'sync-error': 'Reputation sync failed. Cached score 82 remains visible and no retry request has run.',
  flagged: 'Private review required. Evidence, policy context, and a local appeal preview are shown only to you.',
  success: 'A positive trust event is highlighted locally. No score, tier, community, or account record changed.',
  disabled: 'Appeal is unavailable while a previous review is processing. The reason remains attached to the disabled control.',
}

function ReputationDialog({
  title,
  description,
  role = 'dialog',
  onClose,
  returnFocusRef,
  initialFocusSelector,
  restoreFocusOnUnmount = true,
  children,
}: {
  title: string
  description: string
  role?: 'dialog' | 'alertdialog'
  onClose: () => void
  returnFocusRef: React.MutableRefObject<HTMLElement | null>
  initialFocusSelector?: string
  restoreFocusOnUnmount?: boolean
  children: React.ReactNode
}) {
  const dialogRef = useRef<HTMLElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const returnFocus = returnFocusRef.current
    const timer = window.setTimeout(() => {
      const initialFocus = initialFocusSelector
        ? dialogRef.current?.querySelector<HTMLElement>(initialFocusSelector)
        : closeRef.current
      initialFocus?.focus()
    }, 0)
    return () => {
      window.clearTimeout(timer)
      if (restoreFocusOnUnmount) window.setTimeout(() => returnFocus?.focus(), 0)
    }
  }, [initialFocusSelector, restoreFocusOnUnmount, returnFocusRef])

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
      return
    }
    if (event.key !== 'Tab') return
    const focusable = [...(dialogRef.current?.querySelectorAll<HTMLElement>('a[href], button:not(:disabled), input:not(:disabled), [tabindex]:not([tabindex="-1"])') ?? [])]
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
    <div className="absolute inset-0 z-[60] flex items-end bg-ink-900/85 p-4" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) onClose() }}>
      <section
        ref={dialogRef}
        role={role}
        aria-modal="true"
        aria-labelledby="reputation-dialog-title"
        aria-describedby="reputation-dialog-description"
        className="action-sheet-surface glass-card max-h-[78%] w-full overflow-y-auto p-5 shadow-3"
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 id="reputation-dialog-title" className="text-[18px] font-semibold leading-6 text-paper-100">{title}</h2>
            <p id="reputation-dialog-description" className="mt-1 text-[13px] leading-5 text-paper-100/70">{description}</p>
          </div>
          <button ref={closeRef} type="button" className="focus-ring flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-paper-100/75" aria-label={`Close ${title.toLowerCase()}`} onClick={onClose}>
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        {children}
      </section>
    </div>
  )
}

function ReputationSkeleton() {
  return (
    <div className="space-y-4" aria-hidden="true">
      <div className="skeleton-block h-14 rounded-xl" />
      <div className="glass-card flex h-[280px] flex-col items-center justify-center gap-4 p-5"><div className="skeleton-block h-36 w-36 rounded-full" /><div className="skeleton-block h-5 w-28 rounded-md" /><div className="skeleton-block h-2 w-full rounded-pill" /></div>
      <div className="skeleton-block h-64 rounded-xl" />
      <div className="skeleton-block h-40 rounded-xl" />
    </div>
  )
}

function StateBanner({ state, status }: { state: ReputationState; status: string }) {
  const Icon = state === 'offline' ? WifiOff : state === 'sync-error' || state === 'flagged' ? AlertTriangle : state === 'success' ? Sparkles : ShieldCheck
  return (
    <div
      role={state === 'sync-error' || state === 'flagged' ? 'alert' : 'status'}
      className={cx(
        'flex min-h-11 items-start gap-2 rounded-xl border px-3 py-2.5 text-[12px] leading-4 text-paper-100',
        (state === 'sync-error' || state === 'flagged') && 'border-error-red/35 bg-error-red/10',
        state === 'success' && 'border-forest-green/35 bg-forest-green/10',
        state !== 'sync-error' && state !== 'flagged' && state !== 'success' && 'border-white/10 bg-white/[0.04]',
      )}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <span>{status}</span>
    </div>
  )
}

function MetricRow({ metricKey, onOpen }: { metricKey: MetricKey; onOpen: (metric: MetricKey, trigger: HTMLButtonElement) => void }) {
  const metric = metrics[metricKey]
  const Icon = metric.icon
  const lowConfidence = metricKey === 'engagement'
  return (
    <button
      type="button"
      className="focus-ring flex min-h-[76px] w-full items-center gap-3 px-4 py-3 text-left"
      aria-label={`${metric.label}, ${metric.value} out of 100. ${metric.source}. ${metric.freshness}. ${metric.confidence}. Open explanation.`}
      onClick={event => onOpen(metricKey, event.currentTarget)}
    >
      <Icon className={cx('h-4 w-4 shrink-0', lowConfidence ? 'text-paper-100/60' : 'text-brand-orange')} strokeWidth={1.9} aria-hidden="true" />
      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-2"><span className="text-[14px] font-medium text-paper-100">{metric.label}</span><span className="text-[13px] tabular-nums text-paper-100/80">{metric.value}</span></span>
        <span
          className="mt-1.5 block"
          role="progressbar"
          aria-label={`${metric.label} score, ${metric.value} out of 100${lowConfidence ? ', low confidence' : ''}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={metric.value}
          data-confidence-treatment={lowConfidence ? 'muted-dashed' : 'standard'}
        >
          {lowConfidence ? (
            <span className="block h-2 overflow-hidden rounded-pill border border-dashed border-paper-100/45 bg-white/[0.03]">
              <span className="block h-full bg-paper-100/35" style={{ width: `${metric.value}%` }} />
            </span>
          ) : <ProgressBar value={metric.value} tone="you" />}
        </span>
        <span className="mt-1.5 flex items-center justify-between gap-2 text-[12px] leading-4 text-paper-100/65"><span>{metric.source}</span><span>{lowConfidence ? 'Low confidence' : metric.freshness}</span></span>
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-paper-100/55" aria-hidden="true" />
    </button>
  )
}

function PrivateReview({ disabled, onAppeal }: { disabled: boolean; onAppeal: () => void }) {
  return (
    <SolidCard className="border border-error-red/35">
      <div className="flex items-start gap-3">
        <Flag className="mt-0.5 h-5 w-5 shrink-0 text-error-red" aria-hidden="true" />
        <div className="min-w-0 flex-1"><h2 className="text-[16px] font-semibold text-paper-100">Private review</h2><p className="mt-1 text-[12px] leading-5 text-paper-100/70">Evidence: one community reply was marked for context review. This is visible only to you, not as a public badge.</p></div>
      </div>
      <Link href="/screens/25?topic=reputation-policy" className="focus-ring mt-3 flex min-h-11 items-center justify-between rounded-xl border border-white/10 px-3 text-[13px] text-paper-100/80"><span>Review community policy</span><ChevronRight className="h-4 w-4" aria-hidden="true" /></Link>
      <button type="button" disabled={disabled} aria-describedby={disabled ? 'reputation-appeal-disabled-reason' : undefined} className="focus-ring mt-2 min-h-11 w-full rounded-pill border border-white/15 px-4 text-[13px] font-semibold text-paper-100 disabled:cursor-not-allowed disabled:opacity-40" onClick={onAppeal}>{disabled ? 'Appeal unavailable' : 'Preview appeal'}</button>
      {disabled && <p id="reputation-appeal-disabled-reason" className="mt-2 text-[12px] leading-5 text-paper-100/70">Appeal is disabled because a prior review is still processing. No additional submission can be queued.</p>}
    </SolidCard>
  )
}

export function S92Reputation() {
  const [reputationState, setReputationState] = useState<ReputationState>('default')
  const [panel, setPanel] = useState<ReputationPanel>('closed')
  const [selectedMetric, setSelectedMetric] = useState<MetricKey | 'none'>('none')
  const [status, setStatus] = useState(stateStatus.default)
  const [premiumOutcome, setPremiumOutcome] = useState(false)
  const [safetyConfirmation, setSafetyConfirmation] = useState<SafetyConfirmation | null>(null)
  const [safetyConfirmationReturn, setSafetyConfirmationReturn] = useState<SafetyConfirmation | null>(null)
  const [muted, setMuted] = useState(false)
  const returnFocusRef = useRef<HTMLElement | null>(null)
  const premiumCloseRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const requestedState = params.get('state') as ReputationState | null
    const requestedPanel = params.get('panel') as ReputationPanel | null
    const requestedMetric = params.get('metric') as MetricKey | null
    const timer = window.setTimeout(() => {
      if (requestedState && REPUTATION_STATES.includes(requestedState)) {
        setReputationState(requestedState)
        setStatus(stateStatus[requestedState])
      }
      if (requestedPanel && REPUTATION_PANELS.includes(requestedPanel)) {
        setPanel(requestedPanel)
        if (requestedPanel === 'metric') setSelectedMetric(requestedMetric && METRIC_KEYS.includes(requestedMetric) ? requestedMetric : 'consistency')
      }
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (panel !== 'premium' || !premiumOutcome) return
    const frame = window.requestAnimationFrame(() => premiumCloseRef.current?.focus())
    return () => window.cancelAnimationFrame(frame)
  }, [panel, premiumOutcome])

  const openPanel = (nextPanel: Exclude<ReputationPanel, 'closed'>, trigger?: HTMLElement) => {
    if (trigger) returnFocusRef.current = trigger
    setSafetyConfirmation(null)
    setSafetyConfirmationReturn(null)
    setPanel(nextPanel)
  }
  const closePanel = () => {
    setPanel('closed')
    setSelectedMetric('none')
    setSafetyConfirmation(null)
    setSafetyConfirmationReturn(null)
    setPremiumOutcome(false)
  }
  const openMetric = (metric: MetricKey, trigger: HTMLButtonElement) => {
    setSelectedMetric(metric)
    openPanel('metric', trigger)
  }

  const hasScore = reputationState !== 'empty' && reputationState !== 'skeleton'
  const isFlagged = reputationState === 'flagged' || reputationState === 'disabled'
  const mutationDisabled = reputationState === 'offline'
  const selectedMetricDetail = selectedMetric === 'none' ? null : metrics[selectedMetric]

  const completeSafetyConfirmation = () => {
    if (!safetyConfirmation) return
    setStatus(`${safetyConfirmation[0].toUpperCase()}${safetyConfirmation.slice(1)} confirmed in this local preview. No member, content, visibility, moderation, or network record changed.`)
    setSafetyConfirmation(null)
  }

  const openSafetyConfirmation = (nextConfirmation: SafetyConfirmation) => {
    setSafetyConfirmationReturn(nextConfirmation)
    setSafetyConfirmation(nextConfirmation)
  }

  const safetyConfirmationReturnSelector = safetyConfirmationReturn
    ? `[data-reputation-confirm-trigger="${safetyConfirmationReturn}"]`
    : undefined

  const confirmationOverlay = safetyConfirmation ? (
    <ReputationDialog
      title={`Confirm ${safetyConfirmation}`}
      description="This sensitive action remains a local preview and has equal cancel and confirmation exits."
      role="alertdialog"
      onClose={() => setSafetyConfirmation(null)}
      returnFocusRef={returnFocusRef}
      restoreFocusOnUnmount={false}
    >
      <div className="mt-4 rounded-xl border border-error-red/30 bg-error-red/10 p-3 text-[13px] leading-5 text-paper-100/80">Nothing will be blocked, deleted, revoked, reported, or submitted.</div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button type="button" className="focus-ring min-h-12 rounded-pill border border-white/15 px-3 text-[13px] font-medium text-paper-100" onClick={() => setSafetyConfirmation(null)}>Keep current setting</button>
        <button type="button" data-reputation-confirm-action={safetyConfirmation} className="focus-ring min-h-12 rounded-pill border border-error-red/45 bg-error-red/15 px-3 text-[13px] font-semibold text-paper-100" onClick={completeSafetyConfirmation}>Preview {safetyConfirmation}</button>
      </div>
    </ReputationDialog>
  ) : undefined

  const overlay = confirmationOverlay ?? (panel === 'metric' && selectedMetricDetail ? (
    <ReputationDialog
      title={`${selectedMetricDetail.label} explained`}
      description="Metric value, source, freshness, and confidence from this bundled local reputation fixture."
      onClose={closePanel}
      returnFocusRef={returnFocusRef}
    >
      <dl className="mt-4 divide-y divide-white/[0.06] rounded-xl border border-white/10 bg-white/[0.03] px-4">
        {[
          ['Value', `${selectedMetricDetail.value} out of 100`],
          ['Source', selectedMetricDetail.source],
          ['Freshness', selectedMetricDetail.freshness],
          ['Confidence', selectedMetricDetail.confidence],
        ].map(([term, detail]) => <div key={term} className="flex min-h-11 items-center justify-between gap-3 py-2"><dt className="text-[12px] text-paper-100/65">{term}</dt><dd className="text-right text-[13px] font-medium text-paper-100">{detail}</dd></div>)}
      </dl>
      <p className="mt-3 text-[12px] leading-5 text-paper-100/70">This explanation does not recalculate a score or request fresh community data.</p>
      <button type="button" className="focus-ring glass-pill mt-4 min-h-11 w-full px-4 text-[14px] font-medium text-paper-100" onClick={closePanel}>Done</button>
    </ReputationDialog>
  ) : panel === 'premium' ? (
    <ReputationDialog
      title="Contract audit preview"
      description="Review the plan-gated interaction without purchasing, changing entitlement, or contacting a storefront."
      onClose={closePanel}
      returnFocusRef={returnFocusRef}
    >
      {premiumOutcome ? (
        <div className="mt-4 rounded-xl border border-forest-green/35 bg-forest-green/10 p-4" role="status" data-premium-outcome="local">
          <div className="flex items-center gap-2 text-[14px] font-semibold text-paper-100"><Check className="h-5 w-5" aria-hidden="true" />Plan preview complete</div>
          <p className="mt-2 text-[13px] leading-5 text-paper-100/75">No purchase, trial, subscription, entitlement, account, or storefront action occurred.</p>
        </div>
      ) : (
        <div className="mt-4 rounded-xl border border-royal-purple/30 bg-royal-purple/10 p-4">
          <p className="text-[14px] font-semibold text-paper-100">Plus plan preview</p>
          <p className="mt-1 text-[13px] leading-5 text-paper-100/75">Full audit detail would include event source, score effect, policy scope, and review path. This prototype does not assert eligibility or price.</p>
        </div>
      )}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button ref={premiumCloseRef} type="button" className="focus-ring min-h-12 rounded-pill border border-white/15 px-3 text-[13px] font-medium text-paper-100" onClick={closePanel}>{premiumOutcome ? 'Close preview' : 'Maybe later'}</button>
        {!premiumOutcome && <button type="button" className="focus-ring min-h-12 rounded-pill border border-brand-orange/40 bg-brand-orange/15 px-3 text-[13px] font-semibold text-paper-100" onClick={() => { setPremiumOutcome(true); setStatus('Plan unlock preview completed locally. No purchase, entitlement, account, or storefront action occurred.') }}>Continue locally</button>}
      </div>
    </ReputationDialog>
  ) : panel === 'safety' ? (
    <ReputationDialog
      title="Reputation privacy & safety"
      description="Eight member-facing controls show audience, visibility, and due-process exits. Mutating actions stay local."
      onClose={closePanel}
      returnFocusRef={returnFocusRef}
      initialFocusSelector={safetyConfirmationReturnSelector}
    >
      <div className="mt-4 grid grid-cols-2 gap-2" aria-label="Reputation privacy and safety controls">
        <button type="button" className="focus-ring min-h-12 rounded-xl border border-white/10 px-3 text-[12px] font-semibold text-paper-100" onClick={() => setStatus('Audience is You only for private flags and appeals in this local preview. No setting changed.')}><Eye className="mx-auto mb-1 h-4 w-4" aria-hidden="true" />Audience</button>
        <button type="button" className="focus-ring min-h-12 rounded-xl border border-white/10 px-3 text-[12px] font-semibold text-paper-100" onClick={() => setStatus('Visibility preview: score is member-facing; private reviews remain visible only to you. No setting changed.')}><Shield className="mx-auto mb-1 h-4 w-4" aria-hidden="true" />Visibility</button>
        <button type="button" disabled={mutationDisabled} aria-describedby={mutationDisabled ? 'reputation-offline-control-reason' : undefined} className="focus-ring min-h-12 rounded-xl border border-white/10 px-3 text-[12px] font-semibold text-paper-100 disabled:opacity-40" onClick={() => setStatus('Report path preview opened locally. No report or moderation request was submitted.')}><Flag className="mx-auto mb-1 h-4 w-4" aria-hidden="true" />Report</button>
        <button type="button" disabled={mutationDisabled} aria-describedby={mutationDisabled ? 'reputation-offline-control-reason' : undefined} aria-pressed={muted} className="focus-ring min-h-12 rounded-xl border border-white/10 px-3 text-[12px] font-semibold text-paper-100 disabled:opacity-40" onClick={() => { setMuted(current => !current); setStatus(`${muted ? 'Unmute' : 'Mute'} preview selected. No account or community setting changed.`) }}>{muted && <Check className="mx-auto mb-1 h-4 w-4" aria-hidden="true" />}{muted ? 'Muted' : 'Mute'}</button>
        <button type="button" data-reputation-confirm-trigger="block member" disabled={mutationDisabled} aria-describedby={mutationDisabled ? 'reputation-offline-control-reason' : undefined} className="focus-ring min-h-12 rounded-xl border border-white/10 px-3 text-[12px] font-semibold text-paper-100 disabled:opacity-40" onClick={() => openSafetyConfirmation('block member')}><Lock className="mx-auto mb-1 h-4 w-4" aria-hidden="true" />Block</button>
        <button type="button" data-reputation-confirm-trigger="delete own content" disabled={mutationDisabled} aria-describedby={mutationDisabled ? 'reputation-offline-control-reason' : undefined} className="focus-ring min-h-12 rounded-xl border border-white/10 px-3 text-[12px] font-semibold text-paper-100 disabled:opacity-40" onClick={() => openSafetyConfirmation('delete own content')}><Trash2 className="mx-auto mb-1 h-4 w-4" aria-hidden="true" />Delete own content</button>
        <button type="button" className="focus-ring min-h-12 rounded-xl border border-white/10 px-3 text-[12px] font-semibold text-paper-100" onClick={() => setStatus('Export preview selected. No file was created or downloaded.')}><FileDown className="mx-auto mb-1 h-4 w-4" aria-hidden="true" />Export</button>
        <button type="button" data-reputation-confirm-trigger="revoke visibility access" disabled={mutationDisabled} aria-describedby={mutationDisabled ? 'reputation-offline-control-reason' : undefined} className="focus-ring min-h-12 rounded-xl border border-white/10 px-3 text-[12px] font-semibold text-paper-100 disabled:opacity-40" onClick={() => openSafetyConfirmation('revoke visibility access')}><RotateCcw className="mx-auto mb-1 h-4 w-4" aria-hidden="true" />Revoke</button>
      </div>
      {mutationDisabled && <p id="reputation-offline-control-reason" className="mt-3 text-[12px] leading-5 text-paper-100/70">Connection-required controls are disabled offline. Nothing is queued for later.</p>}
      <p className="mt-3 min-h-10 text-[12px] leading-5 text-paper-100/70" role="status" aria-live="polite">{status}</p>
      <button type="button" className="focus-ring glass-pill mt-3 min-h-11 w-full px-4 text-[14px] font-medium text-paper-100" onClick={closePanel}>Done</button>
    </ReputationDialog>
  ) : panel === 'tier' ? (
    <ReputationDialog
      title="Mentor tier"
      description="Tier privileges and progress are textual and do not rely on color. No rank is changed here."
      onClose={closePanel}
      returnFocusRef={returnFocusRef}
    >
      <div className="mt-4 space-y-2">
        <div className="rounded-xl border border-forest-green/35 bg-forest-green/10 p-3"><p className="text-[13px] font-semibold text-paper-100">Current · Mentor</p><p className="mt-1 text-[12px] leading-5 text-paper-100/70">Community context and trust explanations are available.</p></div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3"><p className="text-[13px] font-semibold text-paper-100">Next · Guide</p><p className="mt-1 text-[12px] leading-5 text-paper-100/70">18 points remain. Progress is based on eligible trust events, not spending.</p></div>
      </div>
      <button type="button" className="focus-ring glass-pill mt-4 min-h-11 w-full px-4 text-[14px] font-medium text-paper-100" onClick={closePanel}>Close tier detail</button>
    </ReputationDialog>
  ) : undefined)

  return (
    <div className="contents [&_[data-chip-interactive]]:!text-[12px] [&_nav_span]:!text-[12px] [&_[role=img]>div>span:last-child]:!text-[12px] [&_[role=img]>div>span:last-child]:!text-paper-100/70">
      <HifiShell
        header={
          <TopBar
            title="Reputation"
            right={<IconButton label="Open reputation privacy and safety" disabled={reputationState === 'skeleton'} aria-describedby={reputationState === 'skeleton' ? 'reputation-skeleton-disabled-reason' : undefined} className="disabled:cursor-not-allowed disabled:opacity-40" onClick={event => openPanel('safety', event.currentTarget)}><ShieldCheck size={20} strokeWidth={1.9} /></IconButton>}
          />
        }
        activeTab="me"
        atmosphere="you"
        overlay={overlay}
      >
        <main
          className="space-y-4 px-4 pb-6 pt-2"
          data-reputation-state={reputationState}
          data-reputation-panel={panel}
          data-selected-metric={selectedMetric}
          data-score={hasScore ? 82 : 'none'}
          data-state-surface={reputationState}
          aria-busy={reputationState === 'skeleton' || undefined}
        >
          <StateBanner state={reputationState} status={status} />
          {reputationState === 'skeleton' && <p id="reputation-skeleton-disabled-reason" className="sr-only">Privacy and safety controls are unavailable while the reputation preview is loading.</p>}
          {reputationState === 'sync-error' && <button type="button" className="focus-ring min-h-11 w-full rounded-pill border border-white/15 px-4 text-[13px] font-semibold text-brand-orange" onClick={() => setStatus('Retry preview completed locally. No network request ran and cached score 82 remains unchanged.')}>Retry sync preview</button>}

          {reputationState === 'skeleton' ? <ReputationSkeleton /> : (
            <>
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-[13px] font-semibold text-paper-100/85">{persona.firstName.slice(0, 2).toUpperCase()}</span>
                  <div className="min-w-0"><p className="truncate text-[15px] font-medium leading-tight text-paper-100">{persona.firstName}</p><p className="text-[12px] leading-4 text-paper-100/65">Your <span className="text-emphasis">reputation</span>, explained</p></div>
                </div>
                {hasScore && <Chip tone="done" className="!text-[12px]"><span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5" aria-hidden="true" />Trusted</span></Chip>}
              </div>

              {hasScore ? (
                <GlassCard tone="you" className="flex flex-col items-center text-center">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-paper-100/65">Composite trust score</p>
                  <div className="mt-4"><ProgressRing percent={82} value="82" label="Trust score out of 100" size={148} tone="you" /></div>
                  <p className="mt-3 text-[14px] font-semibold text-paper-100">82 out of 100 · Mentor</p>
                  <button type="button" className="focus-ring mt-2 flex min-h-11 items-center gap-2 rounded-pill border border-white/12 px-4 text-[13px] font-semibold text-paper-100" onClick={event => openPanel('tier', event.currentTarget)}>View Mentor tier <ChevronRight className="h-4 w-4" aria-hidden="true" /></button>
                  <div className="mt-3 w-full space-y-2"><div className="flex items-center justify-between gap-2 text-[12px] text-paper-100/70"><span>18 points to Guide</span><span className="tabular-nums">82 / 100</span></div><div role="progressbar" aria-label="Tier progress, 82 out of 100" aria-valuemin={0} aria-valuemax={100} aria-valuenow={82}><ProgressBar value={82} tone="you" /></div></div>
                  <div className="mt-3"><Chip className="!text-[12px]">Via community + contracts</Chip></div>
                  {reputationState === 'offline' && <p className="mt-3 text-[12px] leading-5 text-paper-100/70">Cached 14 minutes ago · low freshness · no score refresh attempted</p>}
                </GlassCard>
              ) : (
                <SolidCard className="border border-dashed border-white/15 py-8 text-center">
                  <ShieldCheck className="mx-auto h-8 w-8 text-paper-100/60" aria-hidden="true" />
                  <h2 className="mt-3 text-[19px] font-semibold text-paper-100">No trust score yet</h2>
                  <p className="mx-auto mt-2 max-w-[270px] text-[13px] leading-5 text-paper-100/70">Your first eligible community trust event starts this view. No score, tier, trend, or CIA claim is inferred.</p>
                  <Link href="/screens/25?topic=reputation-basics" className="focus-ring mt-4 inline-flex min-h-11 items-center rounded-pill px-4 text-[13px] font-semibold text-brand-orange">Learn how to earn trust</Link>
                </SolidCard>
              )}

              {isFlagged && <PrivateReview disabled={reputationState === 'disabled'} onAppeal={() => setStatus('Appeal preview opened locally. No evidence, form, moderation request, or network submission was sent.')} />}

              {hasScore && (
                <section className="space-y-2" aria-labelledby="reputation-breakdown-title">
                  <div id="reputation-breakdown-title"><SectionTitle title="Breakdown" meta="Tap for source detail" /></div>
                  <div className="surface-warm divide-y divide-white/[0.06] overflow-hidden">
                    {METRIC_KEYS.map(metricKey => <MetricRow key={metricKey} metricKey={metricKey} onOpen={openMetric} />)}
                  </div>
                </section>
              )}

              {hasScore && (
                <section className="space-y-2" aria-labelledby="reputation-history-title">
                  <div id="reputation-history-title"><SectionTitle title="Reputation history" meta={reputationState === 'offline' || reputationState === 'sync-error' ? 'Cached 14m ago' : 'Past 30 days'} /></div>
                  <SolidCard><TrendChart past={[65, 70, 74, 78, 82]} height={72} label="Trust score trend from 65 to 82 over the past 30 days" /></SolidCard>
                  <div className="surface-warm space-y-2 p-4">
                    {reputationState === 'success' && <div className="flex min-h-11 items-center gap-3 rounded-xl border border-forest-green/35 bg-forest-green/10 px-3"><Check className="h-4 w-4 text-forest-green" aria-hidden="true" /><span className="text-[12px] font-medium text-paper-100">Helpful reply recognized · local success preview</span></div>}
                    {historyEvents.map(event => <div key={event.label} className="flex min-h-9 items-center gap-3"><span className="h-2 w-2 shrink-0 rounded-full bg-forest-green" aria-hidden="true" /><span className="min-w-0 flex-1 text-[13px] text-paper-100/80">{event.label}</span><span className="shrink-0 text-[12px] text-paper-100/60">{event.when}</span></div>)}
                  </div>
                </section>
              )}

              {hasScore && !isFlagged && <CIAInsightCard eyebrow="CIA insight" provenance={reputationState === 'offline' || reputationState === 'sync-error' ? ['Bundled history', 'Cached 14m ago'] : ['Score movement', 'Updated 1h ago']} className="[&>div>div>p]:!text-[12px] [&_span]:!text-[12px]"><p className="text-[14px] leading-6 text-paper-100">Your helpful replies are lifting trust this week.</p></CIAInsightCard>}
              {hasScore && isFlagged && <CIAInsightCard eyebrow="CIA context" provenance={['Private review', 'No public badge']} className="[&>div>div>p]:!text-[12px] [&_span]:!text-[12px]"><p className="text-[14px] leading-6 text-paper-100">A private review can affect confidence while due process remains open. CIA does not infer guilt.</p></CIAInsightCard>}

              {hasScore && (
                <section className="space-y-2" aria-labelledby="reputation-audit-title">
                  <div id="reputation-audit-title"><SectionTitle title="Contract audit trail" meta="Plus preview" /></div>
                  <PaywallLock
                    title="Full audit trail"
                    description="Review every eligible event, source, score effect, and policy scope in a plan preview."
                    className="!min-h-[230px]"
                    action={
                      <button type="button" disabled={mutationDisabled} aria-describedby={mutationDisabled ? 'reputation-premium-disabled-reason' : undefined} className="focus-ring min-h-11 rounded-pill border border-brand-orange/45 bg-brand-orange/15 px-4 text-[13px] font-semibold text-paper-100 disabled:opacity-40" onClick={event => openPanel('premium', event.currentTarget)}>Review plan preview</button>
                    }
                  >
                    <div className="space-y-2" aria-label="Audit trail preview layout">
                      {[
                        ['Helpful reply recognized', '+3 score effect', 'Community replies'],
                        ['Shared contract completed', '+2 score effect', 'Shared contracts'],
                        ['Participation window reviewed', 'No score change', 'Community activity'],
                      ].map(([event, effect, source]) => <div key={event} className="rounded-xl border border-white/10 bg-white/[0.04] p-3"><p className="text-[13px] font-semibold text-paper-100">{event}</p><p className="mt-1 text-[12px] text-paper-100/70">{effect} · {source}</p></div>)}
                    </div>
                  </PaywallLock>
                  {mutationDisabled && <p id="reputation-premium-disabled-reason" className="text-[12px] leading-5 text-paper-100/70">Plan preview is unavailable offline. No purchase or entitlement action can be queued.</p>}
                </section>
              )}

              <section className="space-y-2" aria-labelledby="reputation-transparency-title">
                <div id="reputation-transparency-title"><SectionTitle title="Privacy & safety" meta="Visible to you only" /></div>
                <SolidCard className="!p-0">
                  {hasScore && !isFlagged && <div className="flex min-h-12 items-center justify-between gap-3 px-4 py-2"><span className="text-[13px] text-paper-100/70">Flags</span><span className="flex items-center gap-2 text-[13px] text-paper-100"><Check className="h-4 w-4 text-forest-green" aria-hidden="true" />No active flags</span></div>}
                  {isFlagged && <div className="flex min-h-12 items-center justify-between gap-3 px-4 py-2"><span className="text-[13px] text-paper-100/70">Private review</span><span className="flex items-center gap-2 text-[13px] text-paper-100"><Flag className="h-4 w-4 text-error-red" aria-hidden="true" />Evidence available</span></div>}
                  <div className="border-t border-white/[0.06]" />
                  <button type="button" className="focus-ring flex min-h-14 w-full items-center justify-between gap-3 px-4 py-2 text-left" onClick={event => openPanel('safety', event.currentTarget)}><span><span className="block text-[14px] font-medium text-paper-100">Audience, visibility &amp; due process</span><span className="mt-0.5 block text-[12px] text-paper-100/65">Report, mute, block, delete, export, revoke</span></span><ChevronRight className="h-4 w-4 text-paper-100/55" aria-hidden="true" /></button>
                </SolidCard>
              </section>
            </>
          )}
        </main>
      </HifiShell>
    </div>
  )
}
