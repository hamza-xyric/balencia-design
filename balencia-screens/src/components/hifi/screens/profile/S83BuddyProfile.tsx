'use client'

import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import {
  AlertTriangle,
  Check,
  ChevronRight,
  Download,
  Eye,
  Flag,
  Lock,
  MessageSquare,
  MoreHorizontal,
  RotateCcw,
  Settings2,
  Shield,
  Sparkles,
  Trash2,
  UserMinus,
  UserPlus,
  UserX,
  VolumeX,
  WifiOff,
  X,
} from 'lucide-react'
import {
  BtnPrimary,
  BtnSecondary,
  Chip,
  CIAInsightCard,
  GlassCard,
  HifiShell,
  IconButton,
  ProgressBar,
  SectionTitle,
  SolidCard,
  TopBar,
  cx,
} from '@/components/hifi/kit'
import { persona } from '@/data/hifi/persona'

type BuddyState = 'default' | 'skeleton' | 'empty' | 'pending' | 'removed' | 'error' | 'success' | 'consent-missing' | 'offline'
type BuddyPanel = 'closed' | 'visibility' | 'safety' | 'mission' | 'avatar-consent'
type Confirmation = 'revoke shared domains' | 'delete shared history' | 'remove buddy' | 'report buddy' | 'block buddy'

const BUDDY_STATES: BuddyState[] = ['default', 'skeleton', 'empty', 'pending', 'removed', 'error', 'success', 'consent-missing', 'offline']
const BUDDY_PANELS: BuddyPanel[] = ['closed', 'visibility', 'safety', 'mission', 'avatar-consent']

const sharedMissions = [
  { title: 'Run a half marathon', status: 'On track', percent: 68, source: 'Via shared check-ins · updated 2h ago' },
  { title: 'Read 2 books this month', status: 'Building', percent: 35, source: 'Via shared updates · updated yesterday' },
] as const

const stateStatus: Record<BuddyState, string> = {
  default: 'Accepted connection preview. Shared details below come only from mutual consent and bundled local records.',
  skeleton: 'Buddy profile preview is loading. Shared controls are unavailable until this local fixture settles.',
  empty: 'No shared missions yet. Identity and relationship controls remain available without inventing progress.',
  pending: 'Connection pending. Messaging and shared mission details stay unavailable until both people accept.',
  removed: 'This connection was removed. Reconnect before messaging or viewing shared mission details.',
  error: 'Mission sync could not be represented. Aisha’s identity remains visible; no retry request has been made.',
  success: 'Visibility preview updated locally. No consent, profile, message, or network record changed.',
  'consent-missing': 'Mutual health consent is missing. No shared shape, health pattern, photo, or raw signal is shown.',
  offline: 'Offline preview. Two cached mission summaries remain labelled; messaging and consent changes need a connection.',
}

function BuddyDialog({
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
        aria-labelledby="buddy-dialog-title"
        aria-describedby="buddy-dialog-description"
        className="action-sheet-surface glass-card max-h-[76%] w-full overflow-y-auto p-5 shadow-3"
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 id="buddy-dialog-title" className="text-[18px] font-semibold leading-6 text-paper-100">{title}</h2>
            <p id="buddy-dialog-description" className="mt-1 text-[13px] leading-5 text-paper-100/70">{description}</p>
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

function AvatarInitials({ onOpen }: { onOpen: (trigger: HTMLButtonElement) => void }) {
  return (
    <button
      type="button"
      className="focus-ring relative flex h-20 w-20 items-center justify-center rounded-full"
      aria-label="AK initials avatar. Review photo consent before opening media."
      onClick={event => onOpen(event.currentTarget)}
    >
      <span className="flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-[20px] font-semibold text-paper-100">
        {persona.buddy.initials}
      </span>
    </button>
  )
}

function SharedDomainShape() {
  const nodes = ['Fitness', 'Learning'] as const
  return (
    <div className="mt-4 border-t border-white/10 pt-4" role="img" aria-label="Shared domain shape: Fitness and Learning are shared by mutual consent.">
      <div className="flex items-center justify-center">
        {nodes.map((label, index) => (
          <div key={label} className="flex items-center">
            {index > 0 && <span className="mb-5 h-px w-14 border-t border-dashed border-brand-orange/45" aria-hidden="true" />}
            <span className="flex flex-col items-center gap-1.5">
              <span className="quiet-pulse flex h-10 w-10 items-center justify-center rounded-full border border-brand-orange/40 bg-brand-orange/10" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-orange" />
              </span>
              <span className="text-[12px] font-medium text-paper-100/80">{label}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function MissionRow({ mission, onOpen }: { mission: (typeof sharedMissions)[number]; onOpen: (trigger: HTMLButtonElement) => void }) {
  return (
    <button
      type="button"
      className="focus-ring -mx-1 flex min-h-20 w-[calc(100%+0.5rem)] flex-col justify-center rounded-xl px-1 py-2 text-left"
      aria-label={`${mission.title}. ${mission.percent} percent. ${mission.status}. ${mission.source}. Open mission details.`}
      onClick={event => onOpen(event.currentTarget)}
    >
      <span className="flex w-full items-center justify-between gap-2">
        <span className="min-w-0 flex-1 text-[14px] font-medium text-paper-100">{mission.title}</span>
        <span className="shrink-0 text-[12px] tabular-nums text-paper-100/70">{mission.percent}% · {mission.status}</span>
      </span>
      <span className="mt-2 w-full" role="progressbar" aria-label={`${mission.title} progress`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={mission.percent}>
        <ProgressBar value={mission.percent} tone="you" />
      </span>
      <span className="mt-1.5 text-[12px] leading-4 text-paper-100/60">{mission.source}</span>
    </button>
  )
}

function BuddySkeleton() {
  return (
    <div className="space-y-4" aria-hidden="true">
      <div className="glass-card flex min-h-[280px] flex-col items-center gap-3 p-5">
        <div className="skeleton-block h-20 w-20 rounded-full" />
        <div className="skeleton-block h-6 w-32 rounded-md" />
        <div className="skeleton-block h-4 w-52 rounded-md" />
        <div className="skeleton-block h-16 w-full rounded-xl" />
      </div>
      <div className="skeleton-block h-28 rounded-xl" />
      <div className="skeleton-block h-44 rounded-xl" />
    </div>
  )
}

function StateBanner({ state, status }: { state: BuddyState; status: string }) {
  const Icon = state === 'offline' ? WifiOff : state === 'error' ? AlertTriangle : state === 'removed' ? UserMinus : Shield
  return (
    <div
      role={state === 'error' ? 'alert' : 'status'}
      className={cx(
        'flex min-h-11 items-start gap-2 rounded-xl border px-3 py-2.5 text-[12px] leading-4 text-paper-100',
        state === 'error' && 'border-error-red/35 bg-error-red/10',
        state === 'success' && 'border-forest-green/35 bg-forest-green/10',
        state !== 'error' && state !== 'success' && 'border-white/10 bg-white/[0.04]',
      )}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <span>{status}</span>
    </div>
  )
}

export function S83BuddyProfile() {
  const [buddyState, setBuddyState] = useState<BuddyState>('default')
  const [panel, setPanel] = useState<BuddyPanel>('closed')
  const [status, setStatus] = useState(stateStatus.default)
  const [selectedMission, setSelectedMission] = useState<(typeof sharedMissions)[number]>(sharedMissions[0])
  const [visibility, setVisibility] = useState({ Fitness: true, Learning: true })
  const [muted, setMuted] = useState(false)
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null)
  const [confirmationReturn, setConfirmationReturn] = useState<Confirmation | null>(null)
  const [messageOutcome, setMessageOutcome] = useState('')
  const returnFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const requestedState = params.get('state') as BuddyState | null
    const requestedPanel = params.get('panel') as BuddyPanel | null
    const requestedMission = params.get('mission')
    const timer = window.setTimeout(() => {
      if (requestedState && BUDDY_STATES.includes(requestedState)) {
        setBuddyState(requestedState)
        setStatus(stateStatus[requestedState])
        if (requestedState === 'consent-missing') setVisibility({ Fitness: false, Learning: false })
      }
      if (requestedPanel && BUDDY_PANELS.includes(requestedPanel)) setPanel(requestedPanel)
      if (requestedMission === 'books') setSelectedMission(sharedMissions[1])
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  const openPanel = (nextPanel: Exclude<BuddyPanel, 'closed'>, trigger?: HTMLElement) => {
    if (trigger) returnFocusRef.current = trigger
    setConfirmation(null)
    setConfirmationReturn(null)
    setPanel(nextPanel)
  }
  const closePanel = () => {
    setConfirmation(null)
    setConfirmationReturn(null)
    setPanel('closed')
  }
  const openMission = (mission: (typeof sharedMissions)[number], trigger: HTMLButtonElement) => {
    setSelectedMission(mission)
    openPanel('mission', trigger)
  }

  const hasMissions = buddyState === 'default' || buddyState === 'success' || buddyState === 'consent-missing' || buddyState === 'offline'
  const visibleMissions = hasMissions ? sharedMissions : []
  const interactionDisabled = buddyState === 'skeleton' || buddyState === 'pending' || buddyState === 'removed' || buddyState === 'offline'
  const messageReason = buddyState === 'pending'
    ? 'Messaging is unavailable while this connection is pending.'
    : buddyState === 'removed'
      ? 'Messaging requires an accepted connection. Reconnect first.'
      : buddyState === 'offline'
        ? 'Messaging needs a connection. No draft or message is sent from this preview.'
        : 'Controls are unavailable while the buddy profile preview is loading.'
  const inviteReason = buddyState === 'pending'
    ? 'Mission invitations are unavailable while this connection is pending.'
    : buddyState === 'removed'
      ? 'Mission invitations require an accepted connection. Reconnect first.'
      : 'Mission invitations need a connection. Nothing is queued while offline.'
  const showSharedSignals = buddyState !== 'consent-missing' && buddyState !== 'pending' && buddyState !== 'removed'
  const consentMissing = buddyState === 'consent-missing'
  const effectiveSharingInactive = consentMissing || buddyState === 'pending' || buddyState === 'removed'
  const sharingInactiveAccessibleReason = consentMissing
    ? 'mutual consent is missing'
    : buddyState === 'pending'
      ? 'the connection is pending'
      : 'the connection is no longer accepted'
  const visibilityEditingDisabled = buddyState === 'offline' || buddyState === 'pending' || buddyState === 'removed' || consentMissing

  const completeConfirmation = () => {
    if (!confirmation) return
    setStatus(`${confirmation[0].toUpperCase()}${confirmation.slice(1)} confirmed in this local preview. No consent, history, connection, report, moderation, or network record changed.`)
    setConfirmation(null)
  }

  const openConfirmation = (nextConfirmation: Confirmation) => {
    setConfirmationReturn(nextConfirmation)
    setConfirmation(nextConfirmation)
  }

  const confirmationReturnSelector = confirmationReturn
    ? `[data-buddy-confirm-trigger="${confirmationReturn}"]`
    : undefined

  const confirmationOverlay = confirmation ? (
    <BuddyDialog
      title={`Confirm ${confirmation}`}
      description="This is a reversible local interaction preview. Nothing is submitted, deleted, revoked, reported, or blocked."
      role="alertdialog"
      onClose={() => setConfirmation(null)}
      returnFocusRef={returnFocusRef}
      restoreFocusOnUnmount={false}
    >
      <div className="mt-4 rounded-xl border border-error-red/30 bg-error-red/10 p-3 text-[13px] leading-5 text-paper-100/80">
        Review this sensitive action before continuing. The confirmation only changes the status text on this screen.
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button type="button" className="focus-ring min-h-12 rounded-pill border border-white/15 px-3 text-[13px] font-medium text-paper-100" onClick={() => setConfirmation(null)}>Keep current access</button>
        <button type="button" data-buddy-confirm-action={confirmation} className="focus-ring min-h-12 rounded-pill border border-error-red/45 bg-error-red/15 px-3 text-[13px] font-semibold text-paper-100" onClick={completeConfirmation}>Preview {confirmation}</button>
      </div>
    </BuddyDialog>
  ) : undefined

  const overlay = confirmationOverlay ?? (panel === 'visibility' ? (
    <BuddyDialog
      title="Shared visibility"
      description="Review mutual domain visibility and connection-scoped data actions. No consent or stored data changes here."
      onClose={closePanel}
      returnFocusRef={returnFocusRef}
      initialFocusSelector={confirmationReturnSelector}
    >
      <fieldset className="mt-4 space-y-2" disabled={visibilityEditingDisabled} aria-describedby={visibilityEditingDisabled ? 'buddy-visibility-disabled-reason' : undefined}>
        <legend className="text-[12px] font-semibold uppercase tracking-[0.08em] text-paper-100/70">Shared domains</legend>
        {(Object.keys(visibility) as Array<keyof typeof visibility>).map(domain => (
          <label key={domain} className="focus-within:ring-focus flex min-h-11 items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3">
            <span className="text-[14px] font-medium text-paper-100">{domain}</span>
            <span className="flex items-center gap-2 text-[12px] text-paper-100/70">
              {effectiveSharingInactive ? 'Not shared' : visibility[domain] ? 'Shared' : 'Hidden'}
              <input
                type="checkbox"
                checked={effectiveSharingInactive ? false : visibility[domain]}
                className="h-5 w-5 accent-brand-orange"
                aria-label={effectiveSharingInactive ? `${domain} is not shared with Aisha because ${sharingInactiveAccessibleReason}` : `Share ${domain} with Aisha`}
                aria-describedby={visibilityEditingDisabled ? 'buddy-visibility-disabled-reason' : undefined}
                onChange={() => {
                  setVisibility(current => ({ ...current, [domain]: !current[domain] }))
                  setStatus(`${domain} visibility changed in this local preview. No consent or member record changed.`)
                }}
              />
            </span>
          </label>
        ))}
      </fieldset>
      {visibilityEditingDisabled && (
        <p id="buddy-visibility-disabled-reason" className="mt-2 text-[12px] leading-5 text-paper-100/70">
          {consentMissing
            ? 'Effective sharing is off because mutual consent is missing. This preview does not save a local preference or send a consent request.'
            : buddyState === 'pending'
              ? 'Effective sharing is off while this connection is pending. Any saved preference is inactive; this preview does not save a change or send an acceptance request.'
              : buddyState === 'removed'
                ? 'Effective sharing is off because this connection is no longer accepted. Any saved preference is inactive; this preview does not save a change or reconnect anyone.'
                : 'Cached accepted sharing remains visible, but visibility editing is unavailable while offline. No consent change can be queued.'}
        </p>
      )}
      <div className="mt-4 space-y-2" aria-label="Shared data actions">
        <button type="button" className="focus-ring flex min-h-11 w-full items-center gap-3 rounded-xl border border-white/10 px-3 text-left" onClick={() => setStatus('Export preview selected. No file was created or downloaded.')}>
          <Download className="h-4 w-4 text-paper-100/70" aria-hidden="true" /><span className="text-[13px] text-paper-100">Export shared data</span>
        </button>
        <button type="button" data-buddy-confirm-trigger="revoke shared domains" className="focus-ring flex min-h-11 w-full items-center gap-3 rounded-xl border border-white/10 px-3 text-left" onClick={() => openConfirmation('revoke shared domains')}>
          <RotateCcw className="h-4 w-4 text-paper-100/70" aria-hidden="true" /><span className="text-[13px] text-paper-100">Revoke shared domains</span>
        </button>
        <button type="button" data-buddy-confirm-trigger="delete shared history" className="focus-ring flex min-h-11 w-full items-center gap-3 rounded-xl border border-error-red/30 px-3 text-left" onClick={() => openConfirmation('delete shared history')}>
          <Trash2 className="h-4 w-4 text-error-red" aria-hidden="true" /><span className="text-[13px] text-paper-100">Delete shared history</span>
        </button>
      </div>
      <p className="mt-4 min-h-10 text-[12px] leading-5 text-paper-100/70" role="status" aria-live="polite">{status}</p>
      <button type="button" className="focus-ring glass-pill mt-3 min-h-11 w-full px-4 text-[14px] font-medium text-paper-100" onClick={closePanel}>Done</button>
    </BuddyDialog>
  ) : panel === 'safety' ? (
    <BuddyDialog
      title="Connection safety"
      description="Mute, remove, report, or block this local relationship fixture. Sensitive actions require confirmation."
      onClose={closePanel}
      returnFocusRef={returnFocusRef}
      initialFocusSelector={confirmationReturnSelector}
    >
      <div className="mt-4 space-y-2">
        <button
          type="button"
          aria-pressed={muted}
          className="focus-ring flex min-h-11 w-full items-center justify-between gap-3 rounded-xl border border-white/10 px-3 text-left"
          onClick={() => {
            setMuted(current => !current)
            setStatus(`${muted ? 'Unmute' : 'Mute'} preview selected. No notification, connection, or account setting changed.`)
          }}
        >
          <span className="flex items-center gap-3 text-[13px] text-paper-100"><VolumeX className="h-4 w-4 text-paper-100/70" aria-hidden="true" />Mute updates</span>
          <span className="flex items-center gap-1 text-[12px] text-paper-100/70">{muted && <Check className="h-4 w-4" aria-hidden="true" />}{muted ? 'Muted' : 'Not muted'}</span>
        </button>
        <button type="button" data-buddy-confirm-trigger="remove buddy" className="focus-ring flex min-h-11 w-full items-center gap-3 rounded-xl border border-white/10 px-3 text-left" onClick={() => openConfirmation('remove buddy')}><UserMinus className="h-4 w-4 text-paper-100/70" aria-hidden="true" /><span className="text-[13px] text-paper-100">Remove buddy</span></button>
        <button type="button" data-buddy-confirm-trigger="report buddy" className="focus-ring flex min-h-11 w-full items-center gap-3 rounded-xl border border-white/10 px-3 text-left" onClick={() => openConfirmation('report buddy')}><Flag className="h-4 w-4 text-paper-100/70" aria-hidden="true" /><span className="text-[13px] text-paper-100">Report buddy</span></button>
        <button type="button" data-buddy-confirm-trigger="block buddy" className="focus-ring flex min-h-11 w-full items-center gap-3 rounded-xl border border-error-red/30 px-3 text-left" onClick={() => openConfirmation('block buddy')}><UserX className="h-4 w-4 text-error-red" aria-hidden="true" /><span className="text-[13px] text-paper-100">Block buddy</span></button>
      </div>
      <p className="mt-4 min-h-10 text-[12px] leading-5 text-paper-100/70" role="status" aria-live="polite">{status}</p>
      <button type="button" className="focus-ring glass-pill mt-3 min-h-11 w-full px-4 text-[14px] font-medium text-paper-100" onClick={closePanel}>Keep connection</button>
    </BuddyDialog>
  ) : panel === 'mission' ? (
    <BuddyDialog
      title={selectedMission.title}
      description="Shared mission detail from the bundled local fixture. No progress, invite, or check-in is submitted."
      onClose={closePanel}
      returnFocusRef={returnFocusRef}
    >
      <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] p-4">
        <div className="flex items-center justify-between gap-3 text-[13px] text-paper-100"><span>{selectedMission.status}</span><span className="tabular-nums">{selectedMission.percent}%</span></div>
        <div className="mt-3" role="progressbar" aria-label={`${selectedMission.title} progress`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={selectedMission.percent}><ProgressBar value={selectedMission.percent} tone="you" /></div>
        <p className="mt-3 text-[12px] leading-5 text-paper-100/70">{selectedMission.source}. Scope: this mission only. Shared progress never exposes a raw health log.</p>
      </div>
      <button type="button" className="focus-ring glass-pill mt-4 min-h-11 w-full px-4 text-[14px] font-medium text-paper-100" onClick={closePanel}>Close mission detail</button>
    </BuddyDialog>
  ) : panel === 'avatar-consent' ? (
    <BuddyDialog
      title="Photo consent required"
      description="AK initials remain visible until Aisha and you have mutual profile-photo consent."
      onClose={closePanel}
      returnFocusRef={returnFocusRef}
    >
      <div className="mt-4 rounded-xl border border-royal-purple/30 bg-royal-purple/10 p-4">
        <p className="text-[13px] leading-5 text-paper-100">No photo, camera, library, file picker, or media permission was opened. The initials fallback remains privacy-safe.</p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button type="button" className="focus-ring min-h-12 rounded-pill border border-white/15 px-3 text-[13px] font-medium text-paper-100" onClick={closePanel}>Keep initials</button>
        <button type="button" className="focus-ring min-h-12 rounded-pill border border-brand-orange/40 bg-brand-orange/15 px-3 text-[13px] font-semibold text-paper-100" onClick={() => setStatus('Photo-consent request previewed locally. No request, media permission, file picker, or message was sent.')}>Preview request</button>
      </div>
      <p className="mt-3 min-h-10 text-[12px] leading-5 text-paper-100/70" role="status" aria-live="polite">{status}</p>
    </BuddyDialog>
  ) : undefined)

  return (
    <div className="contents [&_[data-chip-interactive]]:!text-[12px] [&_nav_span]:!text-[12px]">
      <HifiShell
        header={
          <TopBar
            title="Buddy profile"
            right={
              <IconButton
                label="Open connection safety"
                disabled={buddyState === 'skeleton'}
                aria-describedby={buddyState === 'skeleton' ? 'buddy-disabled-reason' : undefined}
                className="disabled:cursor-not-allowed disabled:opacity-40"
                onClick={event => openPanel('safety', event.currentTarget)}
              >
                <MoreHorizontal size={20} strokeWidth={1.9} />
              </IconButton>
            }
          />
        }
        activeTab="me"
        atmosphere="you"
        overlay={overlay}
        bottomAction={
          <div className="space-y-2">
            {messageOutcome && <p className="rounded-xl border border-forest-green/35 bg-forest-green/10 px-3 py-2 text-[12px] leading-4 text-paper-100" role="status" aria-live="polite" data-message-outcome="local">{messageOutcome}</p>}
            <div className="flex items-center gap-2">
              <BtnSecondary className="flex-1 !px-3" disabled={buddyState === 'skeleton'} aria-describedby={buddyState === 'skeleton' ? 'buddy-disabled-reason' : undefined} onClick={event => openPanel('visibility', event.currentTarget)}>
                <Settings2 size={16} strokeWidth={1.9} aria-hidden="true" />
                Visibility
              </BtnSecondary>
              <BtnPrimary
                className="flex-1 !px-3"
                disabled={interactionDisabled}
                aria-describedby={interactionDisabled ? 'buddy-disabled-reason' : undefined}
                onClick={() => {
                  const outcome = 'Message handoff prepared in this local preview. No conversation opened and no message was sent.'
                  setMessageOutcome(outcome)
                  setStatus(outcome)
                }}
              >
                <MessageSquare size={16} strokeWidth={1.9} aria-hidden="true" />
                Message
              </BtnPrimary>
            </div>
          </div>
        }
      >
        <main
          className="space-y-4 px-4 pb-5 pt-2"
          data-buddy-state={buddyState}
          data-buddy-panel={panel}
          data-shared-mission-count={visibleMissions.length}
          data-state-surface={buddyState}
          aria-busy={buddyState === 'skeleton' || undefined}
        >
          <StateBanner state={buddyState} status={status} />
          {interactionDisabled && <p id="buddy-disabled-reason" className="sr-only">{messageReason}</p>}
          {(buddyState === 'pending' || buddyState === 'removed' || buddyState === 'offline') && <p id="buddy-invite-disabled-reason" className="sr-only">{inviteReason}</p>}

          {buddyState === 'skeleton' ? <BuddySkeleton /> : (
            <>
              <GlassCard tone="muted">
                <div className="flex flex-col items-center gap-3 pb-1 pt-1 text-center">
                  <AvatarInitials onOpen={trigger => openPanel('avatar-consent', trigger)} />
                  <div>
                    <h2 className="text-[19px] font-semibold leading-6 text-paper-100">{persona.buddy.name}</h2>
                    <p className="mt-1 max-w-[280px] text-[14px] leading-5 text-paper-100/70">Running partner. We&apos;re training for the <span className="text-emphasis">half</span> together.</p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <Chip tone={buddyState === 'pending' || buddyState === 'removed' ? 'muted' : 'done'} className="!text-[12px]">
                      <span className="flex items-center gap-1.5"><Check size={12} strokeWidth={2.2} aria-hidden="true" />{buddyState === 'pending' ? 'Connection pending' : buddyState === 'removed' ? 'Connection removed' : 'Trusted partner'}</span>
                    </Chip>
                    {showSharedSignals && <Chip tone="cia" className="!text-[12px]"><span className="flex items-center gap-1.5"><Sparkles size={12} strokeWidth={2.2} aria-hidden="true" />Mutual insight</span></Chip>}
                  </div>
                </div>
                {showSharedSignals && <SharedDomainShape />}
              </GlassCard>

              {showSharedSignals ? (
                <CIAInsightCard eyebrow="Shared pattern" provenance={buddyState === 'offline' ? ['Mutual consent', 'Cached 14m ago'] : ['Mutual consent', 'Updated 2h ago']} className="[&>div>div>p]:!text-[12px] [&_span]:!text-[12px]">
                  <p className="text-[15px] leading-6 text-paper-100">On mutually shared run days, both sleep logs were higher.</p>
                  <div className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3 text-[12px] text-paper-100/70"><Lock size={13} className="shrink-0" aria-hidden="true" />CIA patterns are consented; raw health data is never shared here.</div>
                </CIAInsightCard>
              ) : buddyState === 'consent-missing' ? (
                <SolidCard className="border border-dashed border-white/15 text-center">
                  <Lock className="mx-auto h-6 w-6 text-paper-100/65" aria-hidden="true" />
                  <h2 className="mt-2 text-[17px] font-semibold text-paper-100">No shared insight yet</h2>
                  <p className="mt-1 text-[13px] leading-5 text-paper-100/70">Mutual category consent is required before CIA can show a shared pattern or domain shape.</p>
                  <button type="button" className="focus-ring mt-3 min-h-11 rounded-pill px-4 text-[13px] font-semibold text-brand-orange" onClick={event => openPanel('visibility', event.currentTarget)}>Review shared consent</button>
                </SolidCard>
              ) : null}

              <section className="space-y-3" aria-labelledby="buddy-missions-title">
                <div id="buddy-missions-title"><SectionTitle title="Shared missions" meta={`${visibleMissions.length} active`} /></div>
                {visibleMissions.length > 0 ? (
                  <SolidCard className="divide-y divide-white/[0.06]">
                    {visibleMissions.map(mission => <MissionRow key={mission.title} mission={mission} onOpen={trigger => openMission(mission, trigger)} />)}
                  </SolidCard>
                ) : buddyState === 'error' ? (
                  <SolidCard className="border border-error-red/30">
                    <div className="flex items-start gap-3"><AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-error-red" aria-hidden="true" /><div><h3 className="text-[15px] font-semibold text-paper-100">Shared missions unavailable</h3><p className="mt-1 text-[12px] leading-5 text-paper-100/70">Identity remains visible, but this local fixture has no mission rows to claim.</p></div></div>
                    <button type="button" className="focus-ring mt-3 min-h-11 rounded-pill px-4 text-[13px] font-semibold text-brand-orange" onClick={() => setStatus('Retry preview completed locally. No network request ran and no shared mission data changed.')}>Retry preview</button>
                  </SolidCard>
                ) : buddyState === 'empty' ? (
                  <SolidCard className="border border-dashed border-white/15 text-center">
                    <UserPlus className="mx-auto h-6 w-6 text-paper-100/65" aria-hidden="true" />
                    <h3 className="mt-2 text-[17px] font-semibold text-paper-100">No shared missions yet</h3>
                    <p className="mt-1 text-[13px] leading-5 text-paper-100/70">Invite Aisha without inventing progress or an active mission.</p>
                    <button type="button" className="focus-ring mt-3 min-h-11 rounded-pill px-4 text-[13px] font-semibold text-brand-orange" onClick={() => setStatus('Mission invitation preview prepared locally. No invitation, notification, or network request was sent.')}>Invite to mission</button>
                  </SolidCard>
                ) : (
                  <SolidCard className="border border-dashed border-white/15 text-center">
                    <p className="text-[13px] leading-5 text-paper-100/70">Shared missions stay hidden until this connection is accepted again.</p>
                    {buddyState === 'removed' && <button type="button" className="focus-ring mt-3 min-h-11 rounded-pill px-4 text-[13px] font-semibold text-brand-orange" onClick={() => setStatus('Reconnect preview selected. No connection request or notification was sent.')}>Preview reconnect</button>}
                  </SolidCard>
                )}
              </section>

              <section className="space-y-3" aria-labelledby="buddy-network-title">
                <div id="buddy-network-title"><SectionTitle title="Network" /></div>
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" className="focus-ring flex min-h-11 items-center justify-center gap-2 rounded-pill border border-white/10 bg-white/[0.03] px-3 text-[13px] font-medium text-paper-100/80" onClick={event => openPanel('visibility', event.currentTarget)}><Eye size={15} aria-hidden="true" />Permissions</button>
                  <button type="button" className="focus-ring flex min-h-11 items-center justify-center gap-2 rounded-pill border border-white/10 bg-white/[0.03] px-3 text-[13px] font-medium text-paper-100/80" onClick={event => openPanel('safety', event.currentTarget)}><Shield size={15} aria-hidden="true" />Safety</button>
                  {buddyState !== 'empty' && <button type="button" disabled={buddyState === 'pending' || buddyState === 'removed' || buddyState === 'offline'} aria-describedby={buddyState === 'pending' || buddyState === 'removed' || buddyState === 'offline' ? 'buddy-invite-disabled-reason' : undefined} className="focus-ring col-span-2 flex min-h-11 items-center justify-center gap-2 rounded-pill border border-white/10 bg-white/[0.03] px-3 text-[13px] font-medium text-paper-100/80 disabled:cursor-not-allowed disabled:opacity-40" onClick={() => setStatus('Mission invitation preview prepared locally. No invitation, notification, or network request was sent.')}><UserPlus size={15} aria-hidden="true" />Invite to another mission</button>}
                </div>
                <button type="button" disabled aria-describedby="buddy-photo-reason" className="flex min-h-14 w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-left opacity-40">
                  <Lock size={16} className="shrink-0 text-paper-100/60" aria-hidden="true" />
                  <span className="min-w-0 flex-1"><span className="block text-[13px] font-medium text-paper-100">Shared photo diary</span><span id="buddy-photo-reason" className="mt-0.5 block text-[12px] leading-4 text-paper-100/70">Disabled — mutual media consent is not present.</span></span>
                </button>
              </section>

              <button type="button" className="focus-ring block w-full rounded-xl text-left" onClick={event => openPanel('visibility', event.currentTarget)}>
                <SolidCard className="flex min-h-16 items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-royal-purple/15 text-royal-purple"><Shield size={17} aria-hidden="true" /></span>
                  <span className="min-w-0 flex-1"><span className="block text-[14px] font-medium text-paper-100">Shared-data controls</span><span className="mt-0.5 block text-[12px] leading-4 text-paper-100/70">Visibility, export, revoke, and delete history</span></span>
                  <ChevronRight className="h-4 w-4 text-paper-100/60" aria-hidden="true" />
                </SolidCard>
              </button>
            </>
          )}
        </main>
      </HifiShell>
    </div>
  )
}
