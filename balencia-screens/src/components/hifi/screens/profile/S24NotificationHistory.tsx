'use client'

import { useEffect, useRef, useState } from 'react'
import { AlertTriangle, Archive, Bell, Check, MoreHorizontal, RefreshCw, RotateCcw, ShieldCheck, Trash2, WifiOff, X } from 'lucide-react'
import { HifiShell, SolidCard, TopBar, TrendChart } from '@/components/hifi/kit'

const NOTIFICATION_STATES = ['default', 'skeleton', 'empty', 'sparse', 'error', 'offline', 'success', 'disabled'] as const
const NOTIFICATION_FILTERS = ['all', 'cia', 'reminders', 'social'] as const
const NOTIFICATION_PANELS = ['closed', 'row-menu', 'controls'] as const
const NOTIFICATION_CONTROLS = ['Category', 'Source', 'Scope', 'Freshness', 'Retention', 'Export', 'Revoke', 'Delete'] as const
const SEVEN_DAY_COUNTS = [1, 0, 2, 1, 0, 1, 1] as const
const SPARSE_SEVEN_DAY_COUNTS = [0, 0, 0, 0, 0, 1, 1] as const
const NOTIFICATION_GROUPS = [
  { label: 'Today · Jul 11', id: 'jul-11' },
  { label: 'Yesterday · Jul 10', id: 'jul-10' },
  { label: 'Jul 8', id: 'jul-08' },
  { label: 'Jul 7', id: 'jul-07' },
  { label: 'Jul 5', id: 'jul-05' },
] as const

type NotificationState = (typeof NOTIFICATION_STATES)[number]
type NotificationFilter = (typeof NOTIFICATION_FILTERS)[number]
type NotificationPanel = (typeof NOTIFICATION_PANELS)[number]
type NotificationCategory = Exclude<NotificationFilter, 'all'>
type NotificationGroup = (typeof NOTIFICATION_GROUPS)[number]['label']

const NOTIFICATION_STATE_STATUS: Record<NotificationState, string> = {
  default: 'Six bundled notifications over seven days. No live Notifications API is connected.',
  skeleton: 'Loading the bundled seven-day notification ledger. No Notifications API or network request is running.',
  empty: 'No notification history is available. No category count or activity row is inferred.',
  sparse: 'Two bundled notifications are available across a sparse seven-day history. No missing activity is inferred.',
  error: 'The bundled notification ledger failed to load. No Notifications API or network request occurred.',
  offline: 'Offline preview. Six cached notification rows remain visible with explicit last-sync context.',
  success: 'All six bundled notifications are read in this local preview. No API or stored state changed.',
  disabled: 'Notification interactions are disabled in this fixture. History and data-control context remain readable.',
}

type NotificationItem = {
  id: string
  category: NotificationCategory
  group: NotificationGroup
  label: string
  title: string
  body: string
  source: string
  time: string
  tagClass: string
  unread: boolean
}

const notificationFixture: NotificationItem[] = [
  {
    id: 'sleep-dip', category: 'cia', group: 'Today · Jul 11', label: 'Sleep', title: 'Sleep dipped to 6.2h', body: 'CIA linked the bundled sleep signal to today’s energy plan.', source: 'WHOOP fixture', time: '2m ago', tagClass: 'bg-domain-sleep/15 text-domain-sleep', unread: true,
  },
  {
    id: 'meal-reminder', category: 'reminders', group: 'Yesterday · Jul 10', label: 'Reminder', title: 'Time to log your morning meal', body: 'Nutrition reminder from your local schedule fixture.', source: 'You logged', time: '1d ago', tagClass: 'bg-domain-nutrition/15 text-domain-nutrition', unread: false,
  },
  {
    id: 'social-streak', category: 'social', group: 'Jul 8', label: 'Social', title: 'Alex finished a 7-day streak', body: 'Community update from the bundled social fixture.', source: 'Balencia fixture', time: '3d ago', tagClass: 'border border-domain-relationships/30 bg-domain-relationships/15 text-paper-100', unread: true,
  },
  {
    id: 'stress-trend', category: 'cia', group: 'Jul 7', label: 'CIA', title: 'Stress levels are trending down', body: 'CIA insight from a bundled wellbeing trend.', source: 'WHOOP fixture', time: '4d ago', tagClass: 'bg-royal-purple/15 text-paper-100', unread: true,
  },
  {
    id: 'mission-update', category: 'reminders', group: 'Jul 7', label: 'Mission', title: 'Half marathon mission updated', body: 'Your bundled mission fixture is at 68 percent.', source: 'You logged', time: '4d ago', tagClass: 'border border-domain-fitness/30 bg-domain-fitness/15 text-paper-100', unread: false,
  },
  {
    id: 'focus-window', category: 'cia', group: 'Jul 5', label: 'Career', title: 'Focus window begins at 2:00 pm', body: 'CIA surfaced a bundled calendar focus block.', source: 'Calendar fixture', time: '6d ago', tagClass: 'border border-domain-career/30 bg-domain-career/15 text-paper-100', unread: false,
  },
]

const initialReadIds = new Set(notificationFixture.filter(item => !item.unread).map(item => item.id))

function isNotificationState(value: string | null): value is NotificationState {
  return NOTIFICATION_STATES.includes(value as NotificationState)
}

function isNotificationFilter(value: string | null): value is NotificationFilter {
  return NOTIFICATION_FILTERS.includes(value as NotificationFilter)
}

function isNotificationPanel(value: string | null): value is NotificationPanel {
  return NOTIFICATION_PANELS.includes(value as NotificationPanel)
}

function NotificationOverlay({
  panel,
  notification,
  onClose,
  onAction,
}: {
  panel: Exclude<NotificationPanel, 'closed'>
  notification: NotificationItem
  onClose: () => void
  onAction: (action: string) => void
}) {
  const dialogRef = useRef<HTMLElement>(null)
  const [confirmation, setConfirmation] = useState<'Archive' | 'Delete' | 'Revoke' | null>(null)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => dialogRef.current?.querySelector<HTMLButtonElement>('[data-safe-exit]')?.focus())
    return () => window.cancelAnimationFrame(frame)
  }, [confirmation])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      if (confirmation) setConfirmation(null)
      else onClose()
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

  const title = confirmation
    ? panel === 'controls' ? `${confirmation} notification data preview?` : `${confirmation} notification preview?`
    : panel === 'controls'
      ? 'Notification controls'
      : `Actions for ${notification.title}`

  return (
    <div className="absolute inset-0 z-[70] flex items-end bg-ink-900/85 px-3 pb-[76px]" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) onClose() }}>
      <section
        ref={dialogRef}
        role={confirmation ? 'alertdialog' : 'dialog'}
        aria-modal="true"
        aria-labelledby="notifications-overlay-title"
        aria-describedby="notifications-overlay-description"
        className="action-sheet-surface glass-card relative isolate w-full p-5 shadow-3"
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-paper-100/65">Local ledger preview</p>
            <h2 id="notifications-overlay-title" className="mt-1 text-[18px] font-semibold leading-6 text-paper-100">{title}</h2>
          </div>
          <button type="button" className="focus-ring flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-paper-100/70" aria-label={`Close ${title.toLowerCase()}`} onClick={onClose}>
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

        {confirmation ? (
          <>
            <p id="notifications-overlay-description" className="mt-4 text-[13px] leading-5 text-paper-100/75">
              {panel === 'controls'
                ? confirmation === 'Delete'
                  ? 'Review the local notification-history Delete control? No row, source notification, OS setting, or account data will be deleted.'
                  : 'Review the local notification-category Revoke control? No row, source notification, OS permission, or account setting will change.'
                : confirmation === 'Archive'
                ? 'Hide this notification from the local ledger preview? Its source data remains unchanged.'
                : confirmation === 'Delete'
                  ? 'Remove this notification from the local ledger preview? No source notification or account data will be deleted.'
                  : 'Preview revoking this notification category? No OS or account permission will change.'}
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <button type="button" data-safe-exit className="hifi-action glass-pill h-[52px] w-full px-3 text-[14px] font-medium text-paper-100" onClick={() => setConfirmation(null)}>Keep it</button>
              <button type="button" className="hifi-action hifi-action-danger h-[52px] w-full rounded-pill px-3 text-[14px] font-semibold" onClick={() => onAction(panel === 'controls' ? `${confirmation} control` : confirmation)}>Preview {confirmation.toLowerCase()}</button>
            </div>
          </>
        ) : panel === 'controls' ? (
          <>
            <p id="notifications-overlay-description" className="mt-3 text-[13px] leading-5 text-paper-100/75">These eight controls affect only the bundled notification-ledger preview. No API, OS permission, export, or deletion capability is connected.</p>
            <div className="mt-4 grid grid-cols-2 gap-2" role="group" aria-label="Notification data controls">
              {NOTIFICATION_CONTROLS.map((control, index) => (
                <button
                  key={control}
                  type="button"
                  data-safe-exit={index === 0 || undefined}
                  className="focus-ring min-h-11 rounded-pill border border-white/10 bg-white/[0.03] px-3 text-[12px] font-medium text-paper-100/75"
                  onClick={() => {
                    if (control === 'Delete' || control === 'Revoke') setConfirmation(control)
                    else onAction(control)
                  }}
                >
                  {control}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <p id="notifications-overlay-description" className="mt-3 text-[13px] leading-5 text-paper-100/75">Choose a local ledger outcome for “{notification.title}”. Source data remains unchanged.</p>
            <div className="mt-4 grid gap-2">
              <button type="button" data-safe-exit className="focus-ring flex min-h-12 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-left text-[13px] text-paper-100/80" onClick={() => setConfirmation('Archive')}><Archive aria-hidden="true" className="h-4 w-4" />Archive from this preview</button>
              <button type="button" className="focus-ring flex min-h-12 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-left text-[13px] text-paper-100/80" onClick={() => setConfirmation('Delete')}><Trash2 aria-hidden="true" className="h-4 w-4 text-brand-orange" />Delete from this preview</button>
              <button type="button" className="focus-ring min-h-11 rounded-pill px-4 text-[13px] font-medium text-paper-100/70" onClick={onClose}>Done</button>
            </div>
          </>
        )}
      </section>
    </div>
  )
}

function NotificationSkeleton() {
  return (
    <div className="space-y-4" aria-label="Loading notification history">
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">Loading the bundled seven-day notification ledger. No Notifications API or network request is running.</p>
      <p id="mark-read-disabled-reason" className="sr-only">Mark all read is unavailable while notification history is loading.</p>
      <div className="skeleton-block h-20 rounded-xl" />
      <div className="flex gap-2">{Array.from({ length: 3 }).map((_, index) => <div key={index} className="skeleton-block h-11 w-28 rounded-pill" />)}</div>
      {Array.from({ length: 4 }).map((_, index) => <div key={index} className="skeleton-block h-24 rounded-xl" />)}
    </div>
  )
}

export function S24NotificationHistory() {
  const [notificationState, setNotificationState] = useState<NotificationState>('default')
  const [filter, setFilter] = useState<NotificationFilter>('all')
  const [panel, setPanel] = useState<NotificationPanel>('closed')
  const [selectedId, setSelectedId] = useState(notificationFixture[0].id)
  const [readIds, setReadIds] = useState(() => new Set(initialReadIds))
  const [archivedIds, setArchivedIds] = useState(() => new Set<string>())
  const [deletedIds, setDeletedIds] = useState(() => new Set<string>())
  const [markOutcome, setMarkOutcome] = useState<'none' | 'marked' | 'undone'>('none')
  const [status, setStatus] = useState(NOTIFICATION_STATE_STATUS.default)
  const returnFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const requestedState = params.get('state')
    const requestedFilter = params.get('filter')
    const requestedPanel = params.get('panel')
    const requestedRow = params.get('row')
    const requestedOutcome = params.get('outcome')
    const frame = window.requestAnimationFrame(() => {
      if (isNotificationState(requestedState)) {
        setNotificationState(requestedState)
        setStatus(NOTIFICATION_STATE_STATUS[requestedState])
      }
      if (isNotificationFilter(requestedFilter)) setFilter(requestedFilter)
      if (isNotificationPanel(requestedPanel)) setPanel(requestedPanel)
      if (notificationFixture.some(item => item.id === requestedRow)) setSelectedId(requestedRow ?? notificationFixture[0].id)
      if (requestedOutcome === 'undone') {
        setMarkOutcome('undone')
        setStatus('Mark all read undone. Original bundled read states were restored.')
      }
    })
    return () => window.cancelAnimationFrame(frame)
  }, [])

  const baseNotifications = notificationState === 'sparse' ? notificationFixture.slice(0, 2) : notificationFixture
  const availableNotifications = baseNotifications.filter(item => !archivedIds.has(item.id) && !deletedIds.has(item.id))
  const visibleNotifications = availableNotifications.filter(item => filter === 'all' || item.category === filter)
  const effectiveReadIds = notificationState === 'success' ? new Set(notificationFixture.map(item => item.id)) : readIds
  const unreadCount = availableNotifications.filter(item => !effectiveReadIds.has(item.id)).length
  const selectedNotification = notificationFixture.find(item => item.id === selectedId) ?? notificationFixture[0]
  const noHistory = notificationState === 'empty' || notificationState === 'error' || notificationState === 'skeleton'
  const interactionsDisabled = notificationState === 'disabled'
  const markDisabled = noHistory || interactionsDisabled || unreadCount === 0

  const categoryCounts = {
    cia: availableNotifications.filter(item => item.category === 'cia').length,
    reminders: availableNotifications.filter(item => item.category === 'reminders').length,
    social: availableNotifications.filter(item => item.category === 'social').length,
  }

  const openPanel = (nextPanel: Exclude<NotificationPanel, 'closed'>, notificationId?: string) => {
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    if (notificationId) setSelectedId(notificationId)
    setPanel(nextPanel)
  }

  const closePanel = () => {
    const returnFocus = returnFocusRef.current
    setPanel('closed')
    window.requestAnimationFrame(() => {
      if (returnFocus?.isConnected) returnFocus.focus()
      else document.querySelector<HTMLElement>('[data-notification-controls-trigger]')?.focus()
    })
  }

  const handlePanelAction = (action: string) => {
    const removesLastFilteredItem = filter !== 'all'
      && selectedNotification.category === filter
      && availableNotifications.filter(item => item.category === filter).length === 1
    if (action === 'Archive') {
      setArchivedIds(current => new Set(current).add(selectedNotification.id))
      if (removesLastFilteredItem) setFilter('all')
      setStatus(`Archived “${selectedNotification.title}” from this local preview. Source data was not changed.${removesLastFilteredItem ? ' The All filter was restored because that category is now empty.' : ''}`)
    } else if (action === 'Delete') {
      setDeletedIds(current => new Set(current).add(selectedNotification.id))
      if (removesLastFilteredItem) setFilter('all')
      setStatus(`Deleted “${selectedNotification.title}” from this local preview. No source or account data was deleted.${removesLastFilteredItem ? ' The All filter was restored because that category is now empty.' : ''}`)
    } else if (action === 'Revoke') {
      setStatus('Revoke control preview complete. No notification or OS permission changed.')
    } else if (action === 'Delete control') {
      setStatus('Delete notification-data control reviewed locally. No row, source notification, OS setting, account data, or stored data was deleted.')
    } else if (action === 'Revoke control') {
      setStatus('Revoke notification-category control reviewed locally. No row, source notification, OS permission, or account setting changed.')
    } else {
      setStatus(`${action} notification control reviewed locally. No API, export, permission, or stored data changed.`)
    }
    closePanel()
  }

  const markAllRead = () => {
    setReadIds(new Set(availableNotifications.map(item => item.id)))
    setMarkOutcome('marked')
    setStatus(`All ${availableNotifications.length === 6 ? 'six' : availableNotifications.length} bundled notifications marked read in this local view. No API or storage changed.`)
  }

  const undoMarkAllRead = () => {
    setReadIds(new Set(initialReadIds))
    setMarkOutcome('undone')
    setStatus('Mark all read undone. Original bundled read states were restored.')
  }

  const overlay = panel === 'closed' ? undefined : (
    <NotificationOverlay
      key={`${panel}-${selectedNotification.id}`}
      panel={panel}
      notification={selectedNotification}
      onClose={closePanel}
      onAction={handlePanelAction}
    />
  )

  return (
    <div className="contents [&_nav_span]:!text-[12px]">
    <HifiShell
      header={
        <TopBar
          title="Notifications"
          back
          right={
            <button
              type="button"
              disabled={markDisabled}
              aria-describedby={markDisabled ? 'mark-read-disabled-reason' : undefined}
              className="focus-ring flex min-h-11 items-center justify-center gap-2 rounded-pill px-3 text-[13px] font-medium text-brand-orange disabled:cursor-not-allowed disabled:text-paper-100/40"
              onClick={markAllRead}
            >
              <Check aria-hidden="true" className="h-4 w-4" />
              <span>Mark all read</span>
            </button>
          }
        />
      }
      activeTab="me"
      atmosphere="you"
      overlay={overlay}
    >
      <main
        className="space-y-4 px-4 pb-5 pt-3"
        data-notifications-state={notificationState}
        data-notification-filter={filter}
        data-notification-total={noHistory ? 0 : visibleNotifications.length}
        data-period="7d"
        data-notifications-panel={panel}
        aria-busy={notificationState === 'skeleton' || undefined}
      >
        {notificationState === 'skeleton' ? (
          <NotificationSkeleton />
        ) : (
          <>
            {notificationState === 'offline' && (
              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-surface-2 px-4 py-3 text-[13px] leading-5 text-paper-100/75">
                <WifiOff aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-paper-100/65" />
                <p>Offline · showing the bundled cached ledger. Read changes stay in this page only; nothing queues or syncs.</p>
              </div>
            )}
            {notificationState === 'success' && (
              <div className="flex items-start gap-3 rounded-2xl border border-forest-green/30 bg-forest-green/10 px-4 py-3 text-[13px] leading-5 text-paper-100" role="status">
                <Check aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-forest-green" />
                <p>All bundled notifications are read in this visual fixture. No API or storage state changed.</p>
              </div>
            )}
            {notificationState === 'disabled' && (
              <div id="notification-disabled-reason" className="rounded-2xl border border-white/10 bg-surface-2 px-4 py-3 text-[13px] leading-5 text-paper-100/75">Ledger actions are disabled in this fixture. Notification data controls remain available.</div>
            )}

            <section aria-labelledby="activity-history-heading">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-paper-100/65">Last 7 days</p>
                  <h2 id="activity-history-heading" className="mt-1 text-[24px] font-semibold leading-7 text-paper-100">Activity <span className="text-emphasis">history</span></h2>
                  <p className="mt-1 text-[12px] text-paper-100/65">{noHistory ? 'No frequency data in this state' : `${availableNotifications.length} notifications · one reconciled fixture`}</p>
                </div>
                {!noHistory && <div className="w-28 shrink-0">
                  {notificationState === 'sparse' ? (
                    <div className="flex h-12 items-center justify-between px-1" role="img" aria-label="Sparse notification frequency over the last 7 days: 0, 0, 0, 0, 0, 1, 1. 2 notifications total.">
                      {SPARSE_SEVEN_DAY_COUNTS.map((value, index) => <span key={index} className={`h-2.5 w-2.5 rounded-full ${value > 0 ? 'bg-brand-orange' : 'bg-white/15'}`} />)}
                    </div>
                  ) : (
                    <TrendChart past={[...SEVEN_DAY_COUNTS]} height={48} label="Notification frequency over the last 7 days: 1, 0, 2, 1, 0, 1, 1. 6 notifications total." />
                  )}
                </div>}
              </div>
              {!noHistory && <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-pill border border-white/10 bg-white/[0.03] px-3 py-2 text-[12px] text-paper-100/70">Source: Notifications API fixture</span>
                <span className="rounded-pill border border-white/10 bg-white/[0.03] px-3 py-2 text-[12px] text-paper-100/70">{notificationState === 'offline' ? 'Freshness: cached · last sync 2h ago' : 'Freshness: bundled 11 Jul 2026'}</span>
                <span className="rounded-pill border border-white/10 bg-white/[0.03] px-3 py-2 text-[12px] text-paper-100/70">Period: 7 days</span>
              </div>}
            </section>

            <button type="button" data-notification-controls-trigger className="focus-ring flex min-h-11 w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 text-left text-[13px] text-paper-100/80" onClick={() => openPanel('controls')}>
              <span className="flex items-center gap-2"><ShieldCheck aria-hidden="true" className="h-4 w-4 text-brand-orange" />Notification controls</span>
              <span className="text-[12px] text-paper-100/65">8 controls</span>
            </button>

            {notificationState === 'error' ? (
              <SolidCard className="py-8 text-center">
                <AlertTriangle aria-hidden="true" className="mx-auto h-7 w-7 text-brand-orange" />
                <h2 className="mt-3 text-[17px] font-semibold text-paper-100">Couldn’t load notifications</h2>
                <p className="mt-2 text-[13px] leading-5 text-paper-100/70">The bundled ledger fixture did not load. No Notifications API request was made.</p>
                <button type="button" className="focus-ring mt-4 inline-flex min-h-11 items-center gap-2 rounded-pill px-4 text-[13px] font-semibold text-brand-orange" onClick={() => { setNotificationState('default'); setStatus('Retry restored the bundled notification fixture. No network request occurred.') }}><RefreshCw aria-hidden="true" className="h-4 w-4" />Retry preview</button>
              </SolidCard>
            ) : notificationState === 'empty' ? (
              <SolidCard className="py-9 text-center">
                <Bell aria-hidden="true" className="mx-auto h-8 w-8 text-paper-100/55" />
                <h2 className="mt-3 text-[18px] font-semibold text-paper-100">You’re all caught up</h2>
                <p className="mt-2 text-[13px] leading-5 text-paper-100/70">No notification history is available. Category counts are omitted instead of showing zero.</p>
              </SolidCard>
            ) : (
              <>
                <div className="-mx-4 flex gap-2 overflow-x-auto px-4 hide-scrollbar" role="group" aria-label="Filter notification history">
                  {([
                    ['all', 'All', availableNotifications.length],
                    ['cia', 'CIA', categoryCounts.cia],
                    ['reminders', 'Reminders', categoryCounts.reminders],
                    ['social', 'Social', categoryCounts.social],
                  ] as const).filter(([, , count]) => count > 0).map(([value, label, count]) => (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={filter === value}
                      className={`focus-ring inline-flex min-h-11 shrink-0 items-center rounded-pill border px-4 text-[12px] font-semibold ${filter === value ? 'border-brand-orange/45 bg-brand-orange/15 text-paper-100' : 'border-white/10 bg-white/[0.03] text-paper-100/70'}`}
                      onClick={() => { setFilter(value); setStatus(`${label} filter selected. ${value === 'all' ? availableNotifications.length : count} bundled notifications shown.`) }}
                    >
                      {filter === value && <Check aria-hidden="true" data-filter-selected-marker className="h-3.5 w-3.5 shrink-0" />}
                      <span>{label} {count}</span>
                    </button>
                  ))}
                </div>

                <p className="text-[12px] leading-5 text-paper-100/70" role="status" aria-live="polite" aria-atomic="true">{visibleNotifications.length} {visibleNotifications.length === 1 ? 'notification' : 'notifications'} shown for {filter === 'all' ? 'all categories' : filter === 'cia' ? 'CIA' : filter === 'reminders' ? 'Reminders' : 'Social'}.</p>

                {NOTIFICATION_GROUPS.map(group => {
                  const grouped = visibleNotifications.filter(item => item.group === group.label)
                  if (!grouped.length) return null
                  return (
                    <section key={group.id} aria-labelledby={`notification-group-${group.id}`}>
                      <div className="sticky top-0 z-10 -mx-4 border-b border-white/10 bg-ink-900/90 px-4 py-3 backdrop-blur-md">
                        <h2 id={`notification-group-${group.id}`} className="text-[12px] font-semibold uppercase tracking-[0.14em] text-paper-100/70">{group.label}</h2>
                      </div>
                      <div className="mt-3 space-y-2">
                        {grouped.map(item => {
                          const read = effectiveReadIds.has(item.id)
                          const rowSource = notificationState === 'offline' ? `${item.source} · cached, last sync 2h ago` : item.source
                          return (
                            <SolidCard key={item.id} className={`p-0 ${read ? '' : 'border border-brand-orange/25'}`}>
                              <div className="flex min-h-[88px] items-stretch">
                                <button
                                  type="button"
                                  disabled={interactionsDisabled}
                                  aria-describedby={interactionsDisabled ? 'notification-disabled-reason' : undefined}
                                  aria-label={`${item.title}. ${item.body}. ${rowSource}, ${item.time}. ${read ? 'Read' : 'Unread'}.`}
                                  className="focus-ring flex min-w-0 flex-1 items-start gap-3 rounded-l-xl px-4 py-3 text-left disabled:cursor-not-allowed disabled:opacity-40"
                                  onClick={() => { setReadIds(current => new Set(current).add(item.id)); setStatus(`Opened “${item.title}” in this local preview and marked it read. No route or API opened.`) }}
                                >
                                  <span aria-hidden="true" className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${read ? 'bg-transparent' : 'bg-brand-orange shadow-[var(--glow-orange-sm)]'}`} />
                                  <span className="min-w-0 flex-1">
                                    <span className="flex flex-wrap items-center gap-2"><span className={`rounded px-2 py-1 text-[12px] font-semibold ${item.tagClass}`}>{item.label}</span><span className="text-[13px] font-semibold leading-5 text-paper-100">{item.title}</span></span>
                                    <span className="mt-1 block text-[13px] leading-5 text-paper-100/70">{item.body}</span>
                                    <span className="mt-2 flex flex-wrap gap-2 text-[12px] text-paper-100/65"><span>{rowSource}</span><span aria-hidden="true">·</span><span>{item.time}</span><span aria-hidden="true">·</span><span>{read ? 'Read' : 'Unread'}</span></span>
                                  </span>
                                </button>
                                <button
                                  type="button"
                                  disabled={interactionsDisabled}
                                  aria-describedby={interactionsDisabled ? 'notification-disabled-reason' : undefined}
                                  aria-label={`More actions for ${item.title}`}
                                  className="focus-ring flex min-h-11 w-12 shrink-0 items-center justify-center rounded-r-xl text-paper-100/60 disabled:cursor-not-allowed disabled:opacity-40"
                                  onClick={() => openPanel('row-menu', item.id)}
                                >
                                  <MoreHorizontal aria-hidden="true" className="h-5 w-5" />
                                </button>
                              </div>
                            </SolidCard>
                          )
                        })}
                      </div>
                    </section>
                  )
                })}
              </>
            )}

            {(markOutcome === 'marked' || markOutcome === 'undone') && (
              <div className="flex min-h-14 items-center justify-between gap-3 rounded-xl border border-white/10 bg-surface-2 px-4 py-2" role="status">
                <p className="text-[12px] leading-4 text-paper-100/75">{markOutcome === 'marked' ? 'All bundled notifications marked read locally.' : 'Mark all read undone; original states restored.'}</p>
                {markOutcome === 'marked' && <button type="button" className="focus-ring flex min-h-11 items-center gap-2 rounded-pill px-3 text-[12px] font-semibold text-brand-orange" onClick={undoMarkAllRead}><RotateCcw aria-hidden="true" className="h-4 w-4" />Undo</button>}
              </div>
            )}

            <p id="mark-read-disabled-reason" className={markDisabled ? 'text-[12px] leading-5 text-paper-100/70' : 'sr-only'}>{noHistory ? 'Mark all read is unavailable because no notification history is loaded.' : interactionsDisabled ? 'Mark all read is disabled in this fixture.' : 'All bundled notifications are already read.'}</p>
            <p className="min-h-5 text-[12px] leading-5 text-paper-100/70" role="status" aria-live="polite" aria-atomic="true">{status}</p>
          </>
        )}
      </main>
    </HifiShell>
    </div>
  )
}
