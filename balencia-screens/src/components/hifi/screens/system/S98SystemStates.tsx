'use client'

import {
  Check,
  CloudOff,
  Database,
  Info,
  LifeBuoy,
  Lock,
  RefreshCw,
  ShieldAlert,
  Sparkles,
  Wrench,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import {
  BtnCoach,
  BtnDestructive,
  BtnGhost,
  BtnPrimary,
  BtnSecondary,
  BtnSuccess,
  Chip,
  CIAPresenceOrb,
  CorrelationIcon,
  CiaIntelligenceIcon,
  DomainIcon,
  GlassCard,
  HifiShell,
  IconButton,
  LifePowerIcon,
  MissionIcon,
  ProgressionIcon,
  ProgressRing,
  Provenance,
  SectionTitle,
  SolidCard,
  TopBar,
} from '@/components/hifi/kit'
import { E1Modal } from '../intelligence/E1Modal'
import { I1TextScaleScope } from './I1TextScaleScope'

const S98_STATES = [
  'catalog',
  'offline',
  'maintenance',
  'forbidden',
  'unauthorized',
  'coming-soon',
  'cache-skeleton',
  'cache-empty',
  'retrying',
  'retry-success',
  'disabled',
  'support',
  'data-controls',
  'capability-matrix',
] as const

type S98State = (typeof S98_STATES)[number]
type RouteKind = 'offline' | 'maintenance' | 'forbidden' | 'unauthorized' | 'coming-soon'
type Panel = 'support' | 'data' | 'capabilities' | null
type PanelReturnState = {
  screenState: S98State
  activeRoute: RouteKind
  notice: string
}

function stateForPanel(panel: Exclude<Panel, null>): S98State {
  if (panel === 'support') return 'support'
  if (panel === 'data') return 'data-controls'
  return 'capability-matrix'
}

const ORB_STATES = ['idle', 'listening', 'thinking', 'speaking', 'success'] as const

const SIGNATURE_ICONS = [
  { name: 'Mission', Icon: MissionIcon },
  { name: 'Life Power', Icon: LifePowerIcon },
  { name: 'CIA intelligence', Icon: CiaIntelligenceIcon },
  { name: 'Correlation', Icon: CorrelationIcon },
  { name: 'Progression', Icon: ProgressionIcon },
  { name: 'Domain', Icon: DomainIcon },
] as const

const ROUTES: Record<RouteKind, `/${string}`> = {
  offline: '/offline',
  maintenance: '/maintenance',
  forbidden: '/forbidden',
  unauthorized: '/unauthorized',
  'coming-soon': '/coming-soon',
}

function isS98State(value: string | null): value is S98State {
  return value !== null && S98_STATES.includes(value as S98State)
}

function routeForState(state: S98State): RouteKind {
  if (state === 'maintenance') return 'maintenance'
  if (state === 'forbidden') return 'forbidden'
  if (state === 'unauthorized') return 'unauthorized'
  if (state === 'coming-soon') return 'coming-soon'
  return 'offline'
}

function noticeForState(state: S98State) {
  if (state === 'catalog') return 'Review catalog. Every example is bundled and local; it is not product-wide capability evidence.'
  if (state === 'retrying') return 'Checking a local transition only. No network request or status probe was sent.'
  if (state === 'retry-success') return 'Local retry preview completed. No connection, route, or account changed.'
  if (state === 'cache-skeleton') return 'Only the unresolved cache panel is loading. Route copy remains immediate.'
  if (state === 'cache-empty') return 'Honest null: this fixture has no cached snapshot to show.'
  if (state === 'disabled') return 'Recovery is disabled with a visible reason in this fixture.'
  if (state === 'support') return 'Support guidance is a local dialog. No contact or external navigation is available.'
  if (state === 'data-controls') return 'Cached-data controls affect this in-memory fixture only.'
  if (state === 'capability-matrix') return 'Capability matrix opened. Component examples are not product-wide support claims.'
  if (state === 'maintenance') return 'Maintenance fixture with no published service window or live status endpoint.'
  if (state === 'forbidden') return 'Permission fixture. The reason is bundled; no role or account was checked.'
  if (state === 'unauthorized') return 'Sign-in fixture. No authentication attempt is available in this prototype.'
  if (state === 'coming-soon') return 'Release fixture. No notification request or external update was created.'
  return 'Offline fixture with a fixed local snapshot. No live connection or cache mutation occurred.'
}

function RouteStateCard({
  route,
  state,
  onPrimary,
  onSecondary,
}: {
  route: RouteKind
  state: S98State
  onPrimary: () => void
  onSecondary: () => void
}) {
  const isSuccess = state === 'retry-success'
  const isRetrying = state === 'retrying'
  const isDisabled = state === 'disabled'

  const content = route === 'maintenance'
    ? {
        title: 'Balencia is under maintenance',
        body: 'No service window is published in this bundled fixture. No live status endpoint was checked.',
        Icon: Wrench,
        iconTone: 'text-paper-100/75 bg-white/[0.05]',
        primary: 'Review status note',
        secondary: 'Support preview',
      }
    : route === 'forbidden'
      ? {
          title: 'Permission needed',
          body: 'This bundled role fixture does not include this view. No account or permission was inspected.',
          Icon: ShieldAlert,
          iconTone: 'text-paper-100/75 bg-white/[0.05]',
          primary: 'Review access reason',
          secondary: 'Return to catalog',
        }
      : route === 'unauthorized'
        ? {
            title: 'Sign in required',
            body: 'This route example represents an expired session. It cannot authenticate or change an account.',
            Icon: Lock,
            iconTone: 'text-paper-100/75 bg-white/[0.05]',
            primary: 'Review sign-in guidance',
            secondary: 'Return to catalog',
          }
        : route === 'coming-soon'
          ? {
              title: 'Feature not released',
              body: 'This bundled module is unavailable. No release date, person, provider, or notification is promised.',
              Icon: Sparkles,
              iconTone: 'text-paper-100/75 bg-white/[0.05]',
              primary: 'Review release note',
              secondary: 'Return to catalog',
            }
          : isSuccess
            ? {
                title: 'Connection restored in this preview',
                body: 'The local state changed successfully. No network connection was tested and no route was replaced.',
                Icon: Check,
                iconTone: 'text-forest-green bg-forest-green/10',
                primary: 'Return to catalog',
                secondary: 'Review capability limits',
              }
            : isRetrying
              ? {
                  title: 'Checking the local connection state',
                  body: 'Route copy stays readable while the local retry transition runs. No request leaves this page.',
                  Icon: RefreshCw,
                  iconTone: 'text-brand-orange bg-brand-orange/10',
                  primary: 'Checking local preview',
                  secondary: 'Cancel local check',
                }
              : isDisabled
                ? {
                    title: 'Recovery action unavailable',
                    body: 'This fixture has no confirmed connection or cached destination. The reason remains visible.',
                    Icon: CloudOff,
                    iconTone: 'text-paper-100/75 bg-white/[0.05]',
                    primary: 'Retry unavailable',
                    secondary: 'Support preview',
                  }
                : {
                    title: 'You’re offline',
                    body: 'Showing a bundled snapshot fixed at 8:42 AM, 2 hours old. No live connection was checked.',
                    Icon: CloudOff,
                    iconTone: 'text-brand-orange bg-brand-orange/10',
                    primary: 'Retry connection preview',
                    secondary: 'View cached fixture',
                  }

  const { Icon } = content
  const titleId = `s98-${state}-title`
  const reasonId = `s98-${state}-disabled-reason`

  return (
    <section data-route-card={ROUTES[route]} data-i1-route-state={state} aria-labelledby={titleId}>
      <GlassCard tone={isSuccess ? 'done' : 'muted'}>
        <div className="flex items-start gap-3">
          <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${content.iconTone}`} aria-hidden="true">
            <Icon className={`h-5 w-5 ${isRetrying ? 'motion-safe:animate-spin motion-reduce:animate-none' : ''}`} />
          </span>
          <div className="min-w-0 flex-1">
            <Chip tone={isSuccess ? 'done' : 'muted'}>{ROUTES[route]}</Chip>
            <h2 id={titleId} className="mt-3 text-[28px] font-semibold leading-[32px] tracking-[-0.02em] text-paper-100">{content.title}</h2>
            <p className="mt-2 text-[14px] leading-5 text-paper-100/75">{content.body}</p>
          </div>
        </div>
        <div className="mt-4 grid gap-2">
          {isSuccess ? (
            <BtnSuccess className="w-full" onClick={onPrimary}>{content.primary}</BtnSuccess>
          ) : isRetrying ? (
            <BtnPrimary className="w-full" loading loadingLabel={content.primary}>Retry connection preview</BtnPrimary>
          ) : (
            <BtnPrimary className="w-full" disabled={isDisabled} aria-describedby={isDisabled ? reasonId : undefined} onClick={onPrimary}>{content.primary}</BtnPrimary>
          )}
          <BtnGhost quiet className="w-full" onClick={onSecondary}>{content.secondary}</BtnGhost>
          {isDisabled && <p id={reasonId} className="text-center text-[12px] leading-4 text-paper-100/70">No confirmed route is available in this fixture. Review support or capability limits.</p>}
        </div>
      </GlassCard>
    </section>
  )
}

function CachedSnapshot({ onDataControls }: { onDataControls: () => void }) {
  return (
    <section className="space-y-3" aria-labelledby="s98-cache-title">
      <SectionTitle title="Last safe snapshot" meta="Bundled local fixture" />
      <SolidCard>
        <div className="flex items-center justify-between gap-3">
          <div><h2 id="s98-cache-title" className="text-[16px] font-semibold leading-5 text-paper-100">Today actions</h2><p className="mt-1 text-[12px] leading-4 text-paper-100/70">Fixed at 8:42 AM</p></div>
          <Chip tone="muted">2h old</Chip>
        </div>
        <div className="mt-4 flex items-center gap-4">
          <ProgressRing percent={68} value="68%" size={72} tone="you" label="Run mission fixture" />
          <dl className="min-w-0 flex-1 space-y-3 text-[13px] leading-5">
            <div className="flex justify-between gap-3"><dt className="text-paper-100/70">Steps</dt><dd className="tabular-nums text-paper-100">8.2k</dd></div>
            <div className="flex justify-between gap-3"><dt className="text-paper-100/70">Sleep</dt><dd className="tabular-nums text-paper-100">7.5h</dd></div>
          </dl>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <Provenance items={['Bundled cache fixture', 'Stale health labels']} />
          <BtnGhost className="px-2" quiet onClick={onDataControls}>Data controls</BtnGhost>
        </div>
      </SolidCard>
    </section>
  )
}

function CacheSkeleton() {
  return (
    <section className="space-y-3" aria-labelledby="s98-cache-loading-title">
      <SectionTitle title="Last safe snapshot" meta="Checking local fixture" />
      <div aria-busy="true">
      <SolidCard className="space-y-3">
        <h2 id="s98-cache-loading-title" className="text-[16px] font-semibold leading-5 text-paper-100">Checking cached panel</h2>
        <p className="text-[12px] leading-4 text-paper-100/70">Only this unresolved panel uses a loading treatment.</p>
        <div className="skeleton-block h-5 w-3/4 rounded-lg motion-reduce:animate-none" />
        <div className="skeleton-block h-4 w-full rounded-lg motion-reduce:animate-none" />
        <div className="skeleton-block h-11 w-full rounded-lg motion-reduce:animate-none" />
      </SolidCard>
      </div>
    </section>
  )
}

function CacheEmpty({ onDataControls }: { onDataControls: () => void }) {
  return (
    <section className="space-y-3" aria-labelledby="s98-cache-empty-title">
      <SectionTitle title="Last safe snapshot" meta="Honest null" />
      <SolidCard>
        <Database className="h-6 w-6 text-paper-100/65" aria-hidden="true" />
        <h2 id="s98-cache-empty-title" className="mt-3 text-[17px] font-semibold leading-6 text-paper-100">No cached snapshot available</h2>
        <p className="mt-2 text-[13px] leading-5 text-paper-100/75">No values or timestamps are invented. Retry the local state or review data controls.</p>
        <BtnGhost className="mt-3 px-0" quiet onClick={onDataControls}>Review data controls</BtnGhost>
      </SolidCard>
    </section>
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

export function S98SystemStates() {
  const [screenState, setScreenState] = useState<S98State>('catalog')
  const [activeRoute, setActiveRoute] = useState<RouteKind>('offline')
  const [panel, setPanel] = useState<Panel>(null)
  const [notice, setNotice] = useState(noticeForState('catalog'))
  const [panelStatus, setPanelStatus] = useState('')
  const retryTimer = useRef<number | null>(null)
  const retryGeneration = useRef(0)
  const panelReturnState = useRef<PanelReturnState | null>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const requested = new URLSearchParams(window.location.search).get('state')
      const state = isS98State(requested) ? requested : 'catalog'
      const requestedPanel: Panel = state === 'support' ? 'support' : state === 'data-controls' ? 'data' : state === 'capability-matrix' ? 'capabilities' : null
      const returnState: S98State = requestedPanel === 'capabilities' ? 'catalog' : requestedPanel ? 'offline' : state
      const returnRoute = routeForState(returnState)
      setScreenState(returnState)
      setActiveRoute(returnRoute)
      setNotice(noticeForState(state))
      setPanelStatus('')
      panelReturnState.current = requestedPanel
        ? { screenState: returnState, activeRoute: returnRoute, notice: noticeForState(returnState) }
        : null
      setPanel(requestedPanel)
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => () => {
    retryGeneration.current += 1
    if (retryTimer.current !== null) window.clearTimeout(retryTimer.current)
  }, [])

  const cancelPendingRetry = () => {
    retryGeneration.current += 1
    if (retryTimer.current !== null) window.clearTimeout(retryTimer.current)
    retryTimer.current = null
  }

  const selectState = (state: S98State, route = routeForState(state), nextNotice = noticeForState(state)) => {
    cancelPendingRetry()
    panelReturnState.current = null
    setPanelStatus('')
    setPanel(null)
    setScreenState(state)
    setActiveRoute(route)
    setNotice(nextNotice)
  }

  const openPanel = (nextPanel: Exclude<Panel, null>) => {
    const wasRetrying = screenState === 'retrying'
    cancelPendingRetry()
    if (panel === null) {
      panelReturnState.current = wasRetrying
        ? {
            screenState: 'offline',
            activeRoute: 'offline',
            notice: 'Local retry preview was cancelled before opening this dialog. No connection was checked.',
          }
        : { screenState, activeRoute, notice }
    }

    setPanelStatus('')
    if (wasRetrying) {
      setScreenState('offline')
      setActiveRoute('offline')
    }
    setNotice(noticeForState(stateForPanel(nextPanel)))
    setPanel(nextPanel)
  }

  const closePanel = () => {
    cancelPendingRetry()
    const returnState = panelReturnState.current
    panelReturnState.current = null
    setPanelStatus('')
    setPanel(null)
    setScreenState(returnState?.screenState ?? 'offline')
    setActiveRoute(returnState?.activeRoute ?? 'offline')
    setNotice(returnState?.notice ?? noticeForState('offline'))
  }

  const handleRetry = () => {
    cancelPendingRetry()
    panelReturnState.current = null
    setPanelStatus('')
    setPanel(null)
    setScreenState('retrying')
    setActiveRoute('offline')
    setNotice(noticeForState('retrying'))
    const generation = retryGeneration.current
    retryTimer.current = window.setTimeout(() => {
      if (retryGeneration.current !== generation) return
      retryTimer.current = null
      setScreenState('retry-success')
      setActiveRoute('offline')
      setNotice(noticeForState('retry-success'))
    }, 700)
  }

  const cancelRetry = () => {
    selectState(
      'offline',
      'offline',
      'Local retry preview was cancelled. No connection or status endpoint was checked.',
    )
  }

  const handlePrimary = () => {
    if (screenState === 'retry-success') { selectState('catalog'); return }
    if (activeRoute === 'offline') { handleRetry(); return }
    if (activeRoute === 'maintenance') { setNotice('No live status endpoint exists in this prototype. The no-ETA note is the complete fixture.'); return }
    if (activeRoute === 'forbidden') { setNotice('The bundled role reason is visible. No permission or account was changed.'); return }
    if (activeRoute === 'unauthorized') { openPanel('support'); return }
    setNotice('This release note is local. No notification or external update was requested.')
  }

  const handleSecondary = () => {
    if (screenState === 'retrying') { cancelRetry(); return }
    if (screenState === 'retry-success') { openPanel('capabilities'); return }
    if (screenState === 'disabled' || activeRoute === 'maintenance' || activeRoute === 'unauthorized') { openPanel('support'); return }
    if (activeRoute === 'forbidden' || activeRoute === 'coming-soon') { selectState('catalog'); return }
    setNotice('The resolved cache fixture is shown below. Nothing was read from device or network storage.')
  }

  const showCatalog = screenState === 'catalog'
  const showResolvedCache = !showCatalog && activeRoute === 'offline' && !['cache-skeleton', 'cache-empty', 'retry-success', 'disabled'].includes(screenState)
  const visibleState = panel ? stateForPanel(panel) : screenState

  const overlay = panel ? (
    <E1Modal
      label={panel === 'support' ? 'Support preview' : panel === 'data' ? 'Cached data controls' : 'Capability matrix'}
      onClose={closePanel}
      className="!bg-ink-brown-800 !backdrop-blur-none"
    >
      {panel === 'support' && (
        <>
          <DialogHeader title="Support preview" onClose={closePanel} />
          <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <LifeBuoy className="h-6 w-6 text-paper-100/70" aria-hidden="true" />
            <p className="mt-3 text-[14px] font-semibold leading-5 text-paper-100">Route and recovery guidance remains visible</p>
            <p className="mt-2 text-[13px] leading-5 text-paper-100/75">This prototype cannot contact support, open a status page, authenticate, or navigate externally. The visible route name and local recovery choices are the complete preview.</p>
          </div>
          <BtnGhost className="mt-4 w-full" quiet onClick={closePanel}>Close support preview</BtnGhost>
        </>
      )}

      {panel === 'data' && (
        <>
          <DialogHeader title="Cached data controls" onClose={closePanel} />
          <p className="mt-2 text-[13px] leading-5 text-paper-100/75">These controls change only this in-memory visual fixture. No provider, account, device cache, or file is touched.</p>
          <dl className="mt-4 grid grid-cols-2 gap-2 text-[12px] leading-4">
            {[
              ['Category', 'Health labels and mission progress'],
              ['Source', 'Bundled cache fixture'],
              ['Scope', 'This offline review only'],
              ['Audience', 'Private preview; never shared'],
              ['Freshness', 'Fixed at 8:42 AM · 2h old'],
              ['Confidence', 'Demo label; not verified'],
              ['Retention', 'In memory for this mount'],
              ['Correction', 'Replace with honest null'],
            ].map(([term, value]) => (
              <div key={term} className="rounded-lg border border-white/10 bg-white/[0.03] p-3"><dt className="font-semibold text-paper-100">{term}</dt><dd className="mt-1 text-paper-100/70">{value}</dd></div>
            ))}
          </dl>
          <div className="mt-4 grid gap-2">
            <BtnSecondary onClick={() => setPanelStatus('Local export preview prepared. No file was created or opened.')}>Preview export</BtnSecondary>
            <BtnGhost quiet onClick={() => selectState('cache-empty', 'offline', 'Local cache consent revoked. No account or device setting changed.')}>Revoke local cache use</BtnGhost>
            <BtnGhost quiet onClick={() => setPanelStatus('Correction preview selected. The fixed values remain unchanged until an honest-null state is chosen.')}>Preview correction</BtnGhost>
            <BtnDestructive onClick={() => selectState('cache-empty', 'offline', 'Bundled cache values removed from this in-memory preview only.')}>Preview delete cache</BtnDestructive>
          </div>
          <p
            className="mt-3 min-h-11 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-[12px] leading-4 text-paper-100/75"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {panelStatus || 'Export and correction outcomes stay inside this local dialog.'}
          </p>
        </>
      )}

      {panel === 'capabilities' && (
        <>
          <DialogHeader title="Capability matrix" onClose={closePanel} />
          <p className="mt-2 text-[13px] leading-5 text-paper-100/75">These examples document component states. They do not prove product-wide support.</p>
          <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
            <table className="w-full text-left text-[12px] leading-4">
              <thead className="bg-white/[0.05] text-paper-100"><tr><th className="px-3 py-3 font-semibold">Example</th><th className="px-3 py-3 font-semibold">Boundary</th></tr></thead>
              <tbody className="divide-y divide-white/10 text-paper-100/70">
                <tr><td className="px-3 py-3 align-top">Offline and cache</td><td className="px-3 py-3">Bundled presentation only; no offline guarantee or cache mutation.</td></tr>
                <tr><td className="px-3 py-3 align-top">Retry and status</td><td className="px-3 py-3">Local transition only; no request, provider, or status endpoint.</td></tr>
                <tr><td className="px-3 py-3 align-top">Access and sign-in</td><td className="px-3 py-3">Route-copy examples only; no role, session, or account change.</td></tr>
                <tr><td className="px-3 py-3 align-top">Release and support</td><td className="px-3 py-3">No date, notification, contact action, or external navigation.</td></tr>
              </tbody>
            </table>
          </div>
          <BtnGhost className="mt-4 w-full" quiet onClick={closePanel}>Close capability matrix</BtnGhost>
        </>
      )}
    </E1Modal>
  ) : undefined

  return (
    <HifiShell
      header={
        <TopBar
          title="System states"
          eyebrow={showCatalog ? 'Balencia review catalog' : ROUTES[activeRoute]}
          back={false}
          right={<IconButton label="Open support preview" onClick={() => openPanel('support')}><LifeBuoy className="h-5 w-5" /></IconButton>}
        />
      }
      showTabBar={false}
      overlay={overlay}
    >
      <main data-i1-state={`98-${visibleState}`} className="hide-scrollbar space-y-5 px-4 pb-6 pt-3 motion-reduce:scroll-auto">
        <I1TextScaleScope />

        {showCatalog ? (
          <>
            <GlassCard tone="muted">
              <Chip tone="muted">Review-only catalog</Chip>
              <h2 className="mt-3 text-[30px] font-semibold leading-[34px] tracking-[-0.02em] text-paper-100">Calm, honest recovery states</h2>
              <p className="mt-2 text-[14px] leading-5 text-paper-100/75">Examples may coexist here only. Each route fixture below renders by itself and uses no real provider, cache, account, status, or external action.</p>
            </GlassCard>

            <section className="space-y-3" aria-labelledby="s98-actions-heading">
              <SectionTitle title="Action contract" meta="Normal · loading · disabled" />
              <h2 id="s98-actions-heading" className="sr-only">Action contract</h2>
              <SolidCard className="space-y-3">
                <BtnPrimary className="w-full" onClick={() => setNotice('Primary action preview pressed. No product action occurred.')}>Primary action</BtnPrimary>
                <BtnPrimary className="w-full" loading loadingLabel="Saving locally">Save preview</BtnPrimary>
                <BtnPrimary className="w-full" disabled aria-describedby="s98-catalog-disabled">Unavailable</BtnPrimary>
                <p id="s98-catalog-disabled" className="text-[12px] leading-4 text-paper-100/70">Disabled examples always keep a visible reason.</p>
                <div className="grid grid-cols-2 gap-2">
                  <BtnCoach onClick={() => setNotice('CIA action preview pressed. No service was contacted.')}>CIA action</BtnCoach>
                  <BtnSuccess onClick={() => setNotice('Success action preview pressed. No record changed.')}>Complete</BtnSuccess>
                  <BtnDestructive className="col-span-2" onClick={() => setNotice('Delete preview pressed. No data was removed.')}>Delete preview</BtnDestructive>
                </div>
              </SolidCard>
            </section>

            <section className="space-y-3" data-testid="cia-state-grid" aria-labelledby="s98-orb-heading">
              <SectionTitle title="CIA presence states" meta="32px reference" />
              <h2 id="s98-orb-heading" className="sr-only">CIA presence states</h2>
              <SolidCard>
                <div className="grid grid-cols-5 gap-2">
                  {ORB_STATES.map(state => (
                    <div key={state} className="flex min-w-0 flex-col items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] px-1 py-3">
                      <CIAPresenceOrb size={32} state={state} amplitude={0.72} />
                      <span className="text-center text-[11px] font-medium capitalize leading-3 text-paper-100/70">{state}</span>
                    </div>
                  ))}
                </div>
              </SolidCard>
            </section>

            <section className="space-y-3" data-testid="signature-icon-grid" aria-labelledby="s98-icons-heading">
              <SectionTitle title="Signature icon registry" meta="Outline · active" />
              <h2 id="s98-icons-heading" className="sr-only">Signature icon registry</h2>
              <SolidCard className="grid grid-cols-2 gap-2">
                {SIGNATURE_ICONS.map(({ name, Icon }) => (
                  <div key={name} className="flex min-h-14 items-center justify-between gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2">
                    <span className="min-w-0 text-[12px] font-medium leading-4 text-paper-100/75">{name}</span>
                    <span role="img" aria-label={`${name}, outline and active`} className="flex shrink-0 items-center gap-2 text-paper-100/70"><Icon size={20} /><Icon active size={20} className="text-brand-orange" /></span>
                  </div>
                ))}
              </SolidCard>
            </section>

            <section className="space-y-3" aria-labelledby="s98-routes-heading">
              <SectionTitle title="Route fixtures" meta="One route per state" />
              <h2 id="s98-routes-heading" className="sr-only">Route fixtures</h2>
              <SolidCard className="grid gap-2">
                {(Object.keys(ROUTES) as RouteKind[]).map(route => (
                  <button key={route} type="button" data-route-choice={route} onClick={() => selectState(route, route)} className="focus-ring flex min-h-11 items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-3 text-left text-[13px] text-paper-100/80">
                    <span>{ROUTES[route]}</span><ChevronLabel />
                  </button>
                ))}
              </SolidCard>
            </section>

            <SolidCard className="border border-white/10">
              <div className="flex gap-3">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-paper-100/70" aria-hidden="true" />
                <div className="min-w-0 flex-1"><h2 className="text-[16px] font-semibold leading-5 text-paper-100">Capability boundary</h2><p className="mt-2 text-[13px] leading-5 text-paper-100/75">Offline, cache, retry, access, maintenance, and release are component examples—not proof of product-wide support.</p><BtnGhost className="mt-2 px-0" quiet onClick={() => openPanel('capabilities')}>Open capability matrix</BtnGhost></div>
              </div>
            </SolidCard>
          </>
        ) : (
          <>
            <RouteStateCard route={activeRoute} state={screenState} onPrimary={handlePrimary} onSecondary={handleSecondary} />

            {screenState === 'cache-skeleton' && <CacheSkeleton />}
            {screenState === 'cache-empty' && <CacheEmpty onDataControls={() => openPanel('data')} />}
            {showResolvedCache && <CachedSnapshot onDataControls={() => openPanel('data')} />}

            <SolidCard className="border border-white/10">
              <div className="flex items-start gap-3">
                <Database className="mt-0.5 h-5 w-5 shrink-0 text-paper-100/70" aria-hidden="true" />
                <div className="min-w-0 flex-1"><h2 className="text-[16px] font-semibold leading-5 text-paper-100">Fixture contract</h2><p className="mt-2 text-[13px] leading-5 text-paper-100/75">Route: {ROUTES[activeRoute]}. Bundled local state only. No provider, account, network, cache mutation, status page, or external navigation.</p></div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <BtnGhost quiet className="px-2" onClick={() => openPanel('support')}>Support</BtnGhost>
                <BtnGhost quiet className="px-2" onClick={() => openPanel('data')}>Privacy</BtnGhost>
                <BtnGhost quiet className="px-2" onClick={() => selectState('catalog')}>Catalog</BtnGhost>
              </div>
            </SolidCard>
          </>
        )}

        <p className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-[12px] leading-4 text-paper-100/70" role="status" aria-live="polite" data-testid="s98-live-status">{notice}</p>
      </main>
    </HifiShell>
  )
}

function ChevronLabel() {
  return <span aria-hidden="true" className="text-[16px] text-paper-100/60">›</span>
}
