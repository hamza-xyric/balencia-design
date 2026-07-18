'use client'

import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from 'react'
import { ChevronRight, CloudOff, RefreshCw, ShieldCheck, SlidersHorizontal, X } from 'lucide-react'
import { BtnGhost, CIAInsightCard, HifiShell, IconButton, SectionTitle, SolidCard, TopBar } from '@/components/hifi/kit'

const SERVICES_STATES = ['default', 'skeleton', 'unconnected', 'error', 'offline', 'success', 'disabled'] as const
const SERVICES_PANELS = ['closed', 'controls', 'connect', 'disconnect'] as const
const DATA_CONTROLS = ['Category', 'Source', 'Scope', 'Freshness', 'Retention', 'Export', 'Revoke', 'Delete'] as const

type ServicesState = (typeof SERVICES_STATES)[number]
type ServicesPanel = (typeof SERVICES_PANELS)[number]
type ProviderStatus = 'connected' | 'pending' | 'unconnected' | 'error' | 'disabled'
type ProviderGroup = 'wearables' | 'nutrition' | 'productivity' | 'lifestyle'
type ProviderId =
  | 'whoop'
  | 'apple-health'
  | 'fitbit'
  | 'garmin'
  | 'oura-ring'
  | 'samsung-health'
  | 'myfitnesspal'
  | 'cronometer'
  | 'lumen'
  | 'google-calendar'
  | 'spotify'

const SERVICES_STATE_STATUS: Record<ServicesState, string> = {
  default: 'Eleven provider cards use bundled fixtures. No provider account is connected by this prototype.',
  skeleton: 'Loading the bundled provider roster. No OAuth, provider, storage, or network request is running.',
  unconnected: 'New-member fixture: no provider is connected. Each card says what it would sync before consent.',
  error: 'Fitbit sync preview failed. WHOOP remains a separate fresh-connected fixture; no provider request occurred.',
  offline: 'Offline preview. Cached WHOOP freshness is visible; all provider actions are disabled.',
  success: 'Local connection preview updated. No OAuth, provider, account, storage, or network action occurred.',
  disabled: 'Provider actions are disabled in this fixture. Existing scopes and privacy exits remain visible.',
}

type Provider = {
  id: ProviderId
  name: string
  initials: string
  group: ProviderGroup
  scopes: string
  source: string
  defaultStatus: ProviderStatus
}

const PROVIDERS: readonly Provider[] = [
  { id: 'whoop', name: 'WHOOP', initials: 'WH', group: 'wearables', scopes: 'sleep, HRV, recovery', source: 'WHOOP API fixture', defaultStatus: 'connected' },
  { id: 'apple-health', name: 'Apple Health', initials: 'AH', group: 'wearables', scopes: 'steps, workouts', source: 'Apple Health fixture', defaultStatus: 'unconnected' },
  { id: 'fitbit', name: 'Fitbit', initials: 'FB', group: 'wearables', scopes: 'steps, heart rate', source: 'Fitbit fixture', defaultStatus: 'pending' },
  { id: 'garmin', name: 'Garmin', initials: 'GA', group: 'wearables', scopes: 'workouts, VO2 max', source: 'Garmin fixture', defaultStatus: 'disabled' },
  { id: 'oura-ring', name: 'Oura Ring', initials: 'OR', group: 'wearables', scopes: 'sleep, readiness', source: 'Oura fixture', defaultStatus: 'unconnected' },
  { id: 'samsung-health', name: 'Samsung Health', initials: 'SH', group: 'wearables', scopes: 'steps, activity', source: 'Samsung Health fixture', defaultStatus: 'unconnected' },
  { id: 'myfitnesspal', name: 'MyFitnessPal', initials: 'MF', group: 'nutrition', scopes: 'calories, macros', source: 'MyFitnessPal fixture', defaultStatus: 'unconnected' },
  { id: 'cronometer', name: 'Cronometer', initials: 'CR', group: 'nutrition', scopes: 'micronutrients', source: 'Cronometer fixture', defaultStatus: 'unconnected' },
  { id: 'lumen', name: 'Lumen', initials: 'LU', group: 'nutrition', scopes: 'metabolic rate', source: 'Lumen fixture', defaultStatus: 'unconnected' },
  { id: 'google-calendar', name: 'Google Calendar', initials: 'GC', group: 'productivity', scopes: 'events, meetings', source: 'Google Calendar fixture', defaultStatus: 'unconnected' },
  { id: 'spotify', name: 'Spotify', initials: 'SP', group: 'lifestyle', scopes: 'listening history', source: 'Spotify fixture', defaultStatus: 'unconnected' },
]

const PROVIDER_GROUPS: ReadonlyArray<{ id: ProviderGroup; title: string; count: number }> = [
  { id: 'wearables', title: 'Wearables & fitness', count: 6 },
  { id: 'nutrition', title: 'Nutrition', count: 3 },
  { id: 'productivity', title: 'Productivity', count: 1 },
  { id: 'lifestyle', title: 'Lifestyle', count: 1 },
]

function isServicesState(value: string | null): value is ServicesState {
  return SERVICES_STATES.some(state => state === value)
}

function isServicesPanel(value: string | null): value is ServicesPanel {
  return SERVICES_PANELS.some(panel => panel === value)
}

function isProviderId(value: string | null): value is ProviderId {
  return PROVIDERS.some(provider => provider.id === value)
}

function ModalFrame({
  title,
  titleId,
  role = 'dialog',
  onClose,
  children,
}: {
  title: string
  titleId: string
  role?: 'dialog' | 'alertdialog'
  onClose: () => void
  children: ReactNode
}) {
  const dialogRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    dialogRef.current?.querySelector<HTMLElement>('button:not(:disabled), [href]')?.focus()
    return () => {
      if (previousFocus?.isConnected) previousFocus.focus()
    }
  }, [])

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
      onMouseDown={event => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        ref={dialogRef}
        role={role}
        aria-modal="true"
        aria-labelledby={titleId}
        className="glass-card max-h-[690px] w-full overflow-y-auto p-5 shadow-3"
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center justify-between gap-3">
          <h2 id={titleId} className="text-[18px] font-semibold text-paper-100">{title}</h2>
          <button type="button" className="focus-ring flex h-11 w-11 items-center justify-center rounded-full text-paper-100/70" aria-label={`Close ${title.toLowerCase()}`} onClick={onClose}>
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        {children}
      </section>
    </div>
  )
}

function statusFor(provider: Provider, state: ServicesState, overrides: Partial<Record<ProviderId, ProviderStatus>>): ProviderStatus {
  const override = overrides[provider.id]
  if (override) return override
  if (state === 'disabled') return 'disabled'
  if (state === 'unconnected') return provider.id === 'garmin' ? 'disabled' : 'unconnected'
  if (state === 'error' && provider.id === 'fitbit') return 'error'
  return provider.defaultStatus
}

function statusLabel(status: ProviderStatus) {
  if (status === 'connected') return 'Connected'
  if (status === 'pending') return 'Sync pending'
  if (status === 'error') return 'Sync failed'
  if (status === 'disabled') return 'Unavailable'
  return 'Not connected'
}

function statusDetail(provider: Provider, status: ProviderStatus, state: ServicesState) {
  if (status === 'connected') {
    if (state === 'offline') return `Showing cached freshness: 2 hours ago · ${provider.source} · no live provider connection`
    if (state === 'success') return `Local refresh preview complete · ${provider.source} · no provider request was made`
    return `Bundled connected fixture · last sync 2 minutes ago · ${provider.source} · no live provider connection`
  }
  if (status === 'pending') return 'Retry preview pending in the bundled fixture · no provider request is running'
  if (status === 'error') return 'Sync preview failed. Review the fixture or try a local retry; no provider was contacted.'
  if (status === 'disabled') return 'Connection management is unavailable for this provider in the current visual fixture.'
  return 'Awaiting first connection · no provider account is linked'
}

function StateBanner({ state }: { state: ServicesState }) {
  const message = state === 'default' ? undefined : SERVICES_STATE_STATUS[state]
  if (!message) return null
  return (
    <div className={`rounded-xl border px-4 py-3 text-[12px] leading-5 text-paper-100/80 ${state === 'success' ? 'border-forest-green/30 bg-forest-green/10' : 'border-brand-orange/25 bg-brand-orange/10'}`} role={state === 'error' ? 'alert' : 'status'}>
      {message}
    </div>
  )
}

export function S22ConnectedServices() {
  const [servicesState, setServicesState] = useState<ServicesState>('default')
  const [panel, setPanel] = useState<ServicesPanel>('closed')
  const [activeProviderId, setActiveProviderId] = useState<ProviderId>('whoop')
  const [providerOverrides, setProviderOverrides] = useState<Partial<Record<ProviderId, ProviderStatus>>>({})
  const [selectedControl, setSelectedControl] = useState<(typeof DATA_CONTROLS)[number] | null>(null)
  const [dialogStatus, setDialogStatus] = useState('Choose a control to review its local-only outcome.')
  const [status, setStatus] = useState(SERVICES_STATE_STATUS.default)
  const returnFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const requestedState = params.get('state')
    const requestedProvider = params.get('provider')
    const requestedPanel = params.get('panel')
    queueMicrotask(() => {
      if (isServicesState(requestedState)) {
        setServicesState(requestedState)
        setStatus(SERVICES_STATE_STATUS[requestedState])
      }
      if (isProviderId(requestedProvider)) setActiveProviderId(requestedProvider)
      if (requestedPanel === 'provider-controls') setPanel('controls')
      else if (requestedPanel === 'connect-consent') setPanel('connect')
      else if (requestedPanel === 'disconnect-confirm') setPanel('disconnect')
      else if (isServicesPanel(requestedPanel)) setPanel(requestedPanel)
    })
  }, [])

  const activeProvider = PROVIDERS.find(provider => provider.id === activeProviderId) ?? PROVIDERS[0]
  const activeProviderStatus = statusFor(activeProvider, servicesState, providerOverrides)
  const allActionsDisabled = servicesState === 'offline' || servicesState === 'disabled'

  const openPanel = (nextPanel: Exclude<ServicesPanel, 'closed'>, providerId: ProviderId) => {
    if (panel === 'closed' && document.activeElement instanceof HTMLElement) returnFocusRef.current = document.activeElement
    setActiveProviderId(providerId)
    setSelectedControl(null)
    setDialogStatus('Choose a control to review its local-only outcome.')
    setPanel(nextPanel)
  }

  const closePanel = () => {
    setPanel('closed')
    window.requestAnimationFrame(() => returnFocusRef.current?.focus())
  }

  const overlay = panel === 'controls' ? (
    <ModalFrame key="controls" title={`${activeProvider.name} controls`} titleId="services-controls-title" onClose={closePanel}>
      <p className="mt-3 text-[12px] leading-5 text-paper-100/70">
        Category: external provider data · Source: {activeProvider.source} · Scope: {activeProvider.scopes}. These controls alter only this visual preview.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2" role="group" aria-label={`${activeProvider.name} data controls`}>
        {DATA_CONTROLS.map(control => (
          <button
            key={control}
            type="button"
            aria-pressed={selectedControl === control}
            className={`focus-ring min-h-12 rounded-xl border px-3 text-[12px] font-semibold ${selectedControl === control ? 'border-brand-orange bg-brand-orange/15 text-paper-100' : 'border-white/12 bg-white/[0.03] text-paper-100/75'}`}
            onClick={() => {
              setSelectedControl(control)
              setDialogStatus(`${control} selected for ${activeProvider.name}. No provider permission, export, revoke, or deletion occurred.`)
            }}
          >
            {control}
          </button>
        ))}
      </div>
      <p className="mt-3 min-h-10 text-[12px] leading-5 text-paper-100/70" role="status" aria-live="polite">{dialogStatus}</p>
      {activeProviderStatus === 'connected' && (
        <button type="button" className="focus-ring mt-2 flex min-h-12 w-full items-center justify-between rounded-xl border border-white/12 px-4 text-[13px] text-paper-100" onClick={() => setPanel('disconnect')}>
          Review disconnect scope
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
      {(activeProviderStatus === 'pending' || activeProviderStatus === 'error') && (
        <button
          type="button"
          className="focus-ring mt-2 min-h-12 w-full rounded-xl border border-white/12 px-4 text-[13px] text-paper-100"
          onClick={() => {
            setDialogStatus(`Local retry preview selected for ${activeProvider.name}. Status remains explicit; no provider request was sent.`)
            setStatus(`Reviewed ${activeProvider.name} retry locally. No sync or network request occurred.`)
          }}
        >
          Retry local preview
        </button>
      )}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button type="button" className="focus-ring min-h-12 rounded-pill border border-white/15 px-3 text-[13px] font-medium text-paper-100" onClick={closePanel}>Keep current choices</button>
        <button type="button" className="focus-ring min-h-12 rounded-pill border border-white/15 px-3 text-[13px] font-medium text-paper-100" onClick={() => {
          setStatus(`${activeProvider.name} control preview closed. No provider or member data changed.`)
          closePanel()
        }}>Apply local preview</button>
      </div>
    </ModalFrame>
  ) : panel === 'connect' ? (
    <ModalFrame key="connect" title={`Connect ${activeProvider.name} preview`} titleId="services-connect-title" onClose={closePanel}>
      <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-paper-100/70">Consent scope</p>
        <p className="mt-2 text-[13px] leading-5 text-paper-100">{activeProvider.scopes}</p>
        <p className="mt-2 text-[12px] leading-5 text-paper-100/70">Source: {activeProvider.source} · retention is unchanged until separately selected.</p>
      </div>
      <p className="mt-3 text-[12px] leading-5 text-paper-100/70">
        Continue only previews a connected outcome locally. No OAuth, sign-in, provider permission, storage, or network request will occur.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button type="button" className="focus-ring min-h-12 rounded-pill border border-white/15 px-3 text-[13px] font-medium text-paper-100" onClick={closePanel}>Not now</button>
        <button
          type="button"
          className="focus-ring min-h-12 rounded-pill border border-white/15 px-3 text-[13px] font-medium text-paper-100"
          onClick={() => {
            setProviderOverrides(current => ({ ...current, [activeProvider.id]: 'connected' }))
            setServicesState('success')
            setStatus(`${activeProvider.name} connected outcome previewed locally. No OAuth, provider, storage, or network action occurred.`)
            closePanel()
          }}
        >
          Continue local preview
        </button>
      </div>
    </ModalFrame>
  ) : panel === 'disconnect' ? (
    <ModalFrame key="disconnect" title={`Disconnect ${activeProvider.name}?`} titleId="services-disconnect-title" role="alertdialog" onClose={closePanel}>
      <p className="mt-3 text-[13px] leading-5 text-paper-100/80">
        This preview disconnects only the local {activeProvider.name} outcome. It does not delete imported history, revoke a real provider token, or contact {activeProvider.name}.
      </p>
      <p className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-[12px] leading-5 text-paper-100/70">
        Exact scope: {activeProvider.scopes}. Existing member data and every other provider remain unchanged.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button type="button" className="focus-ring min-h-12 rounded-pill border border-white/15 px-3 text-[13px] font-medium text-paper-100" onClick={closePanel}>Keep connected</button>
        <button
          type="button"
          className="focus-ring min-h-12 rounded-pill border border-white/15 px-3 text-[13px] font-medium text-paper-100"
          onClick={() => {
            setProviderOverrides(current => ({ ...current, [activeProvider.id]: 'unconnected' }))
            setServicesState('success')
            setStatus(`${activeProvider.name} disconnected outcome previewed locally. No provider token, history, storage, or network state changed.`)
            closePanel()
          }}
        >
          Disconnect local preview
        </button>
      </div>
    </ModalFrame>
  ) : undefined

  return (
    <div className="contents [&_nav_span]:!text-[12px]">
    <HifiShell
      header={
        <TopBar
          title="Connected services"
          eyebrow="Me · Amira · Lv 12"
          back
          right={<IconButton label="Review provider controls" onClick={() => openPanel('controls', 'whoop')}><SlidersHorizontal size={18} /></IconButton>}
        />
      }
      activeTab="me"
      atmosphere="you"
      overlay={overlay}
    >
      <main
        className="space-y-5 px-4 pb-6 pt-2"
        data-services-state={servicesState}
        data-services-panel={panel}
        data-provider={activeProvider.id}
        data-provider-status={statusFor(activeProvider, servicesState, providerOverrides)}
        aria-busy={servicesState === 'skeleton' || undefined}
      >
        <div className="px-1 pt-2">
          <h2 className="text-[22px] font-semibold leading-tight tracking-[-0.01em] text-paper-100">
            Manage your external <span className="text-emphasis">services</span>
          </h2>
          <p className="mt-2 text-[12px] leading-5 text-paper-100/70">11 providers · 6 wearables, 3 nutrition, 1 productivity, 1 lifestyle</p>
        </div>

        <StateBanner state={servicesState} />

        <CIAInsightCard className="[&>div>div>p]:!text-[12px] [&_span]:!text-[12px]" eyebrow="Coach note" provenance={['Via CIA · bundled fixture']}>
          <p className="text-[13px] leading-5 text-paper-100/75">
            Provider scopes can deepen recovery and effort comparisons. Review consent before previewing any connection.
          </p>
          <div className="mt-3"><BtnGhost onClick={() => openPanel('controls', 'whoop')}>Review provider privacy</BtnGhost></div>
        </CIAInsightCard>

        {servicesState === 'skeleton' ? (
          <div className="space-y-5" aria-label="Loading connected services preview">
            {PROVIDER_GROUPS.map(group => (
              <section key={group.id} className="space-y-3">
                <SectionTitle title={group.title} meta={`${group.count} ${group.count === 1 ? 'service' : 'services'}`} />
                {PROVIDERS.filter(provider => provider.group === group.id).map(provider => (
                  <div key={provider.id} role="group" data-integration-provider data-provider={provider.id} data-provider-status={statusFor(provider, servicesState, providerOverrides)} aria-label={`${provider.name} loading`}>
                    <div className="skeleton-block h-24 rounded-xl" />
                  </div>
                ))}
              </section>
            ))}
          </div>
        ) : (
          PROVIDER_GROUPS.map(group => (
            <section key={group.id} className="space-y-3" aria-labelledby={`services-${group.id}-title`}>
              <div id={`services-${group.id}-title`}><SectionTitle title={group.title} meta={`${group.count} ${group.count === 1 ? 'service' : 'services'}`} /></div>
              <div className="space-y-3">
                {PROVIDERS.filter(provider => provider.group === group.id).map(provider => {
                  const providerStatus = statusFor(provider, servicesState, providerOverrides)
                  const disabled = providerStatus === 'disabled' || allActionsDisabled
                  const disabledReason = allActionsDisabled ? 'services-actions-disabled-reason' : `${provider.id}-disabled-reason`
                  const connected = providerStatus === 'connected'
                  const pendingOrError = providerStatus === 'pending' || providerStatus === 'error'
                  return (
                    <div
                      key={provider.id}
                      role="group"
                      data-integration-provider
                      data-provider={provider.id}
                      data-provider-status={providerStatus}
                      aria-label={`${provider.name}, ${statusLabel(providerStatus)}, ${provider.scopes}`}
                    >
                      <SolidCard className={providerStatus === 'error' ? 'border border-brand-orange/35' : undefined}>
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex min-w-0 items-center gap-3">
                            <span aria-hidden="true" className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-[12px] font-semibold ${connected ? 'border-brand-orange/35 bg-brand-orange/15 text-brand-orange' : 'border-white/10 bg-white/[0.04] text-paper-100/70'}`}>{provider.initials}</span>
                            <div className="min-w-0">
                              <h3 className="truncate text-[14px] font-semibold text-paper-100">{provider.name}</h3>
                              <p className="mt-0.5 text-[12px] leading-4 text-paper-100/70">{connected ? `Connected fixture: ${provider.scopes}` : `Will sync: ${provider.scopes}`}</p>
                            </div>
                          </div>
                          <span className={`shrink-0 rounded-pill border px-2.5 py-1 text-[12px] font-semibold ${connected ? 'border-brand-orange/35 bg-brand-orange/15 text-paper-100' : providerStatus === 'error' ? 'border-brand-orange/40 bg-brand-orange/10 text-paper-100' : 'border-white/12 bg-white/[0.03] text-paper-100/75'}`}>
                            {statusLabel(providerStatus)}
                          </span>
                        </div>
                        <p className="mt-3 border-t border-white/[0.06] pt-3 text-[12px] leading-5 text-paper-100/70">{statusDetail(provider, providerStatus, servicesState)}</p>
                        <div className="mt-3">
                          <button
                            type="button"
                            disabled={disabled}
                            aria-label={providerStatus === 'disabled' ? `Notify me when ${provider.name} is available` : undefined}
                            aria-describedby={disabled ? disabledReason : undefined}
                            className="focus-ring flex min-h-11 w-full items-center justify-center gap-2 rounded-pill border border-white/12 px-4 text-[13px] font-medium text-paper-100 disabled:cursor-not-allowed disabled:opacity-45"
                            onClick={() => {
                              if (connected || pendingOrError) openPanel('controls', provider.id)
                              else openPanel('connect', provider.id)
                            }}
                          >
                            {providerStatus === 'disabled' ? 'Notify me when available' : connected ? `Manage ${provider.name}` : pendingOrError ? `Review ${provider.name} retry` : `Connect ${provider.name}`}
                            {!disabled && <ChevronRight className="h-4 w-4" aria-hidden="true" />}
                          </button>
                          {providerStatus === 'disabled' && !allActionsDisabled && (
                            <p id={`${provider.id}-disabled-reason`} className="mt-2 text-[12px] leading-4 text-paper-100/70">{provider.name} connection is unavailable in this visual fixture. No notification can be scheduled.</p>
                          )}
                        </div>
                      </SolidCard>
                    </div>
                  )
                })}
              </div>
            </section>
          ))
        )}

        {allActionsDisabled && (
          <p id="services-actions-disabled-reason" className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[12px] leading-5 text-paper-100/70">
            {servicesState === 'offline' ? 'Provider actions require a connection. Cached fixture details remain readable; no request is attempted.' : 'Provider actions are intentionally disabled in this deterministic fixture.'}
          </p>
        )}

        <SolidCard className="!p-4">
          <div className="flex items-start gap-3">
            {servicesState === 'offline' ? <CloudOff className="mt-0.5 h-5 w-5 shrink-0 text-paper-100/65" aria-hidden="true" /> : servicesState === 'success' ? <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-forest-green" aria-hidden="true" /> : <RefreshCw className="mt-0.5 h-5 w-5 shrink-0 text-paper-100/65 motion-reduce:transition-none" aria-hidden="true" />}
            <p id="services-live-status" className="text-[12px] leading-5 text-paper-100/70" role="status" aria-live="polite" aria-atomic="true">{status}</p>
          </div>
        </SolidCard>
      </main>
    </HifiShell>
    </div>
  )
}
