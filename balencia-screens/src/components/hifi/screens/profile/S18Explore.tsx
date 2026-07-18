'use client'

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import Link from 'next/link'
import { BookOpen, ChevronRight, Compass, Dumbbell, Flower2, Moon, Repeat, Search, Sparkles, WifiOff, X } from 'lucide-react'
import { GlassCard, HifiShell, PaywallLock, ProgressBar, Provenance, SectionTitle, SolidCard, TopBar } from '@/components/hifi/kit'

type ExploreState = 'default' | 'partial' | 'empty' | 'error' | 'offline' | 'locked'
type SearchState = 'idle' | 'results' | 'empty'
type RadarState = 'real' | 'partial' | 'null'
type ExplorePanel = 'closed' | 'data-controls' | 'module'
type DataControl = 'Category' | 'Source' | 'Scope' | 'Freshness' | 'Retention' | 'Export' | 'Revoke' | 'Delete'

const EXPLORE_STATES: ExploreState[] = ['default', 'partial', 'empty', 'error', 'offline', 'locked']
const EXPLORE_PANELS: ExplorePanel[] = ['closed', 'data-controls', 'module']
const DATA_CONTROLS: DataControl[] = ['Category', 'Source', 'Scope', 'Freshness', 'Retention', 'Export', 'Revoke', 'Delete']

const domainMix = [
  { name: 'Fitness', percent: 30, source: 'WHOOP', dotClass: 'bg-domain-fitness', fillClass: 'fill-domain-fitness' },
  { name: 'Sleep', percent: 25, source: 'Health', dotClass: 'bg-domain-sleep', fillClass: 'fill-domain-sleep' },
  { name: 'Meditation', percent: 20, source: 'Session log', dotClass: 'bg-domain-meditation', fillClass: 'fill-domain-meditation' },
  { name: 'Wellbeing', percent: 15, source: 'You logged', dotClass: 'bg-domain-wellbeing', fillClass: 'fill-domain-wellbeing' },
  { name: 'Career', percent: 10, source: 'Calendar', dotClass: 'bg-domain-career', fillClass: 'fill-domain-career' },
] as const

const catalogModules = [
  { title: 'Journal', description: 'Reflect with a guided entry', href: '/screens/37', keywords: 'journal wellbeing reflection', icon: BookOpen },
  { title: 'Sleep', description: 'Review your sleep signals', href: '/screens/58', keywords: 'sleep health recovery', icon: Moon },
  { title: 'Workouts', description: '12 sessions · 68% active', href: '/screens/26', keywords: 'fitness workout movement', icon: Dumbbell },
  { title: 'Yoga', description: 'No activity yet', href: '/screens/55', keywords: 'fitness yoga movement', icon: Flower2 },
  { title: 'Habits', description: 'No activity yet', href: '/screens/38', keywords: 'wellbeing habits repeat', icon: Repeat },
  { title: 'Meditation', description: 'Open the mindfulness catalog', href: '/screens/54', keywords: 'meditation mindfulness calm', icon: Sparkles },
] as const

const stateStatus: Record<ExploreState, string> = {
  default: 'Explore catalog ready. Search filters this local catalog only.',
  partial: 'One domain is cached with low confidence. The 100% mix remains labelled and reviewable.',
  empty: 'No active-domain history yet. Popular modules remain available without a personalized claim.',
  error: 'Suggestions could not refresh. The local catalog remains available and no request was retried.',
  offline: 'Offline preview. Cached modules remain available and freshness is shown on each suggestion.',
  locked: 'Plan-gated previews are visible below. No purchase or entitlement change occurs here.',
}

const controlOutcomes: Record<DataControl, string> = {
  Category: 'Explore uses catalog, domain, recommendation, and entitlement categories.',
  Source: 'Visible sources include recent activity, WHOOP, Health, Calendar, and information you logged.',
  Scope: 'This control explains Explore only. It does not change another Balencia surface.',
  Freshness: 'Each personalized suggestion names whether it is current, cached, or a popular fallback.',
  Retention: 'Retention is an explanation in this preview. No preference was changed.',
  Export: 'Export is a local preview. No file was created or downloaded.',
  Revoke: 'Revoke is a local preview. No source or entitlement was disconnected.',
  Delete: 'Delete is a local preview. No catalog, history, or recommendation was deleted.',
}

function ReadableProvenance({ items }: { items: string[] }) {
  return <div className="[&_span]:!text-[12px]"><Provenance items={items} /></div>
}

function PreviewDialog({
  title,
  description,
  onClose,
  returnFocusRef,
  children,
}: {
  title: string
  description: string
  onClose: () => void
  returnFocusRef: React.MutableRefObject<HTMLElement | null>
  children: React.ReactNode
}) {
  const dialogRef = useRef<HTMLElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const returnFocus = returnFocusRef.current
    const timer = window.setTimeout(() => closeRef.current?.focus(), 0)
    return () => {
      window.clearTimeout(timer)
      window.setTimeout(() => returnFocus?.focus(), 0)
    }
  }, [returnFocusRef])

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
        role="dialog"
        aria-modal="true"
        aria-labelledby="explore-dialog-title"
        aria-describedby="explore-dialog-description"
        className="action-sheet-surface glass-card w-full p-5 shadow-3"
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 id="explore-dialog-title" className="text-[18px] font-semibold leading-6 text-paper-100">{title}</h2>
            <p id="explore-dialog-description" className="mt-1 text-[13px] leading-5 text-paper-100/70">{description}</p>
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

const RADAR_CENTER = 100
const RADAR_RADIUS = 66
const RADAR_MAX = Math.max(...domainMix.map(domain => domain.percent))

function radarPoint(index: number, value: number) {
  const angle = -Math.PI / 2 + (index / domainMix.length) * Math.PI * 2
  const radius = RADAR_RADIUS * (value / RADAR_MAX)
  return {
    x: RADAR_CENTER + Math.cos(angle) * radius,
    y: RADAR_CENTER + Math.sin(angle) * radius,
  }
}

function axisPoint(index: number, scale = 1) {
  const angle = -Math.PI / 2 + (index / domainMix.length) * Math.PI * 2
  return {
    x: RADAR_CENTER + Math.cos(angle) * RADAR_RADIUS * scale,
    y: RADAR_CENTER + Math.sin(angle) * RADAR_RADIUS * scale,
  }
}

function ActiveDomainRadar({ state }: { state: RadarState }) {
  const total = domainMix.reduce((sum, domain) => sum + domain.percent, 0)
  const summary = domainMix.map((domain, index) => `${domain.name} ${domain.percent} percent from ${domain.source}${state === 'partial' && index === domainMix.length - 1 ? ', cached low confidence' : ''}`).join('. ')

  if (state === 'null') {
    return (
      <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.03] p-5 text-center" data-domain-count="0" data-domain-total="0" role="status">
        <p className="text-[18px] font-semibold text-paper-100">No active-domain mix yet</p>
        <p className="mt-2 text-[13px] leading-5 text-paper-100/70">Connect or log a domain to build this view. No percentages are inferred.</p>
      </div>
    )
  }

  const points = domainMix.map((domain, index) => radarPoint(index, domain.percent))
  const polygon = points.map(point => `${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(' ')

  return (
    <div className="grid items-center gap-4 sm:grid-cols-[150px_1fr]" data-domain-count={domainMix.length} data-domain-total={total}>
      <div className="relative mx-auto h-[150px] w-[150px]" role="img" aria-label={`Five active domains total ${total} percent. ${summary}.`}>
        <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
          {[0.34, 0.67, 1].map(scale => (
            <polygon key={scale} points={domainMix.map((_, index) => { const point = axisPoint(index, scale); return `${point.x.toFixed(1)},${point.y.toFixed(1)}` }).join(' ')} fill="none" className="stroke-white/15" strokeWidth="1" />
          ))}
          {domainMix.map((domain, index) => {
            const tip = axisPoint(index)
            const lowConfidence = state === 'partial' && index === domainMix.length - 1
            return <line key={domain.name} x1={RADAR_CENTER} y1={RADAR_CENTER} x2={tip.x} y2={tip.y} className={lowConfidence ? 'stroke-white/25' : 'stroke-white/15'} strokeDasharray={lowConfidence ? '3 4' : undefined} strokeWidth="1" />
          })}
          <polygon points={polygon} className="fill-brand-orange/15 stroke-brand-orange radar-grow" strokeWidth="2" strokeLinejoin="round" />
          {points.map((point, index) => {
            const lowConfidence = state === 'partial' && index === points.length - 1
            return <circle key={domainMix[index].name} cx={point.x} cy={point.y} r={lowConfidence ? 4 : 3} className={`${domainMix[index].fillClass} ${lowConfidence ? 'opacity-40' : ''}`} stroke={lowConfidence ? 'currentColor' : 'none'} strokeDasharray={lowConfidence ? '2 2' : undefined} />
          })}
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-[24px] font-semibold text-paper-100 tabular-nums">100%</span>
          <span className="text-[12px] text-paper-100/70">Active mix</span>
        </div>
      </div>
      <div className="space-y-2" aria-label="Active-domain legend">
        {domainMix.map((domain, index) => {
          const lowConfidence = state === 'partial' && index === domainMix.length - 1
          return (
            <div key={domain.name} className="flex min-h-8 items-center gap-2" data-domain={domain.name.toLowerCase()} data-domain-percent={domain.percent}>
              <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${domain.dotClass} ${lowConfidence ? 'opacity-40 ring-1 ring-white/40 ring-offset-2 ring-offset-ink-brown-800' : ''}`} aria-hidden="true" />
              <span className="text-[12px] font-medium text-paper-100/80">{domain.name}</span>
              <span className="ml-auto text-[12px] font-semibold tabular-nums text-paper-100/75">{domain.percent}%</span>
              {lowConfidence && <span className="sr-only">Cached, low confidence</span>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function SuggestionCard({
  title,
  subtitle,
  icon: Icon,
  provenance,
  href,
  onOpen,
}: {
  title: string
  subtitle: string
  icon: typeof BookOpen
  provenance: string[]
  href?: string
  onOpen?: (trigger: HTMLButtonElement) => void
}) {
  const content = (
    <GlassCard tone="muted" className="flex h-full flex-col p-4">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]" aria-hidden="true">
        <Icon className="h-4 w-4 text-brand-orange" />
      </div>
      <h3 className="text-[14px] font-medium text-paper-100">{title}</h3>
      <p className="mt-1 text-[12px] leading-4 text-paper-100/70">{subtitle}</p>
      <div className="mt-3"><ReadableProvenance items={provenance} /></div>
    </GlassCard>
  )

  if (href) return <Link href={href} className="focus-ring block rounded-xl" aria-label={`${title}. ${subtitle}. ${provenance.join('. ')}`}>{content}</Link>
  return <button type="button" className="focus-ring block rounded-xl text-left" aria-label={`${title}. ${subtitle}. ${provenance.join('. ')}`} onClick={event => onOpen?.(event.currentTarget)}>{content}</button>
}

function ModuleCard({ title, meta, href, icon: Icon, progress }: { title: string; meta: string; href: string; icon: typeof BookOpen; progress: number | null }) {
  return (
    <Link href={href} className="focus-ring block rounded-xl text-left" aria-label={`${title}. ${meta}`}>
      <SolidCard className="flex h-full flex-col p-4">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]" aria-hidden="true"><Icon className="h-4 w-4 text-brand-orange" /></div>
        <h3 className="text-[14px] font-medium text-paper-100">{title}</h3>
        <p className="mt-1 text-[12px] leading-4 text-paper-100/70">{meta}</p>
        {progress === null ? (
          <p className="mt-3 text-[12px] font-medium text-paper-100/70">No active effort recorded</p>
        ) : (
          <div className="mt-3" role="progressbar" aria-label={`${title} activity ${progress} percent`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><ProgressBar value={progress} tone="you" /></div>
        )}
      </SolidCard>
    </Link>
  )
}

export function S18Explore() {
  const [screenState, setScreenState] = useState<ExploreState>('default')
  const [panel, setPanel] = useState<ExplorePanel>('closed')
  const [query, setQuery] = useState('')
  const [selectedControl, setSelectedControl] = useState<DataControl>('Category')
  const [selectedModule, setSelectedModule] = useState({ title: 'Sleep', href: '/screens/58' })
  const [status, setStatus] = useState(stateStatus.default)
  const searchRef = useRef<HTMLInputElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const requestedState = params.get('state') as ExploreState | null
    const requestedPanel = params.get('panel') as ExplorePanel | null
    const requestedSearchState = params.get('search-state') as SearchState | null
    const requestedQuery = params.get('query') ?? params.get('search') ?? ''
    const timer = window.setTimeout(() => {
      if (requestedState && EXPLORE_STATES.includes(requestedState)) {
        setScreenState(requestedState)
        setStatus(stateStatus[requestedState])
      }
      if (requestedPanel && EXPLORE_PANELS.includes(requestedPanel)) setPanel(requestedPanel)
      if (requestedQuery) setQuery(requestedQuery)
      else if (requestedSearchState === 'results') setQuery('journal')
      else if (requestedSearchState === 'empty') setQuery('no matching module')
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  const filteredModules = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return catalogModules
    return catalogModules.filter(module => `${module.title} ${module.description} ${module.keywords}`.toLowerCase().includes(normalized))
  }, [query])

  const searchState: SearchState = query.trim() ? (filteredModules.length ? 'results' : 'empty') : 'idle'
  const radarState: RadarState = screenState === 'partial' ? 'partial' : screenState === 'empty' ? 'null' : 'real'
  const noPersonalStats = screenState === 'empty' || screenState === 'error'
  const moduleFreshness = screenState === 'offline' ? ' · cached 14m ago' : ''

  const openPanel = (nextPanel: Exclude<ExplorePanel, 'closed'>, trigger: HTMLElement) => {
    returnFocusRef.current = trigger
    setPanel(nextPanel)
  }

  const openModule = (module: { title: string; href: string }, trigger: HTMLButtonElement) => {
    setSelectedModule(module)
    openPanel('module', trigger)
  }

  const closePanel = () => setPanel('closed')
  const clearSearch = () => {
    setQuery('')
    setStatus('Search cleared. Six local modules are visible again.')
    window.setTimeout(() => searchRef.current?.focus(), 0)
  }

  const suggestionProvenance = screenState === 'offline'
    ? ['Local catalog', 'Cached 14m ago', 'Low confidence']
    : screenState === 'empty' || screenState === 'error'
      ? ['Popular with Balencia', 'Static catalog', 'No personal signal']
      : ['Recent activity', 'Updated now', screenState === 'partial' ? 'Low confidence' : 'High confidence']

  const overlay = panel === 'data-controls' ? (
    <PreviewDialog title="Explore data controls" description="Choose a control to review its local scope. No source, recommendation, or history changes." onClose={closePanel} returnFocusRef={returnFocusRef}>
      <div className="mt-4 grid grid-cols-2 gap-2" role="group" aria-label="Explore data controls">
        {DATA_CONTROLS.map(control => (
          <button
            key={control}
            type="button"
            data-data-control={control.toLowerCase()}
            aria-pressed={selectedControl === control}
            className={`focus-ring min-h-11 rounded-pill border px-3 text-[12px] font-semibold ${selectedControl === control ? 'border-brand-orange bg-brand-orange/15 text-paper-100' : 'border-white/15 bg-white/[0.04] text-paper-100/75'}`}
            onClick={() => setSelectedControl(control)}
          >
            {control}
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] p-3" role="status" data-control-outcome={selectedControl.toLowerCase()}>
        <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-paper-100/70">{selectedControl}</p>
        <p className="mt-1 text-[13px] leading-5 text-paper-100/75">{controlOutcomes[selectedControl]}</p>
      </div>
      <button type="button" className="focus-ring glass-pill mt-4 min-h-11 w-full px-4 text-[14px] font-medium text-paper-100" onClick={closePanel}>Done</button>
    </PreviewDialog>
  ) : panel === 'module' ? (
    <PreviewDialog title={`${selectedModule.title} preview`} description="This local preview explains the next destination. No session, request, or network activity started." onClose={closePanel} returnFocusRef={returnFocusRef}>
      <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] p-3">
        <p className="text-[13px] leading-5 text-paper-100/75">Open the full {selectedModule.title.toLowerCase()} screen, or stay in Explore. Both choices are same-origin and reversible.</p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button type="button" className="focus-ring glass-pill min-h-12 px-3 text-[13px] font-medium text-paper-100" onClick={closePanel}>Stay here</button>
        <Link href={selectedModule.href} className="focus-ring glass-pill flex min-h-12 items-center justify-center px-3 text-center text-[13px] font-medium text-paper-100">Open module</Link>
      </div>
    </PreviewDialog>
  ) : undefined

  return (
    <div className="contents [&_[data-chip-interactive]]:!text-[12px] [&_nav_span]:!text-[12px]">
      <HifiShell activeTab="me" atmosphere="cia" header={<TopBar title="Explore" eyebrow="Amira · Lv 12" back backHref="/screens/17" />} overlay={overlay}>
        <main
          className="space-y-5 px-4 pb-6 pt-3"
          data-explore-state={screenState}
          data-search-state={searchState}
          data-radar-state={radarState}
          data-explore-panel={panel}
        >
          <div
            role={screenState === 'error' ? 'alert' : 'status'}
            className={`flex min-h-11 items-start gap-2 rounded-xl border px-3 py-2.5 text-[12px] leading-4 ${screenState === 'error' ? 'border-error-red/35 bg-error-red/10 text-paper-100' : 'border-white/10 bg-white/[0.04] text-paper-100/75'}`}
          >
            {screenState === 'offline' ? <WifiOff className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /> : <Compass className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />}
            <span>{status}</span>
          </div>

          <div className="relative">
            <label htmlFor="explore-search" className="sr-only">Search modules</label>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-paper-100/70" aria-hidden="true" />
            <input
              ref={searchRef}
              id="explore-search"
              type="search"
              value={query}
              placeholder="Search modules"
              className="focus-ring h-12 w-full rounded-full border border-white/10 bg-white/[0.04] pl-11 pr-14 text-[16px] text-paper-100 outline-none placeholder:text-paper-100/60"
              onChange={event => setQuery(event.target.value)}
            />
            {query && (
              <button type="button" aria-label="Clear module search" className="focus-ring absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-paper-100/75" onClick={clearSearch}>
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
          <p className="sr-only" role="status" aria-live="polite">{searchState === 'idle' ? 'Six modules available.' : searchState === 'results' ? `${filteredModules.length} module${filteredModules.length === 1 ? '' : 's'} found.` : 'No modules found.'}</p>

          {searchState !== 'idle' ? (
            <section className="space-y-3" aria-labelledby="explore-results-title">
              <div className="flex min-h-11 items-center justify-between gap-3 px-1">
                <h2 id="explore-results-title" className="text-[12px] font-semibold uppercase tracking-[0.08em] text-paper-100/70">Search results</h2>
                <span className="text-[12px] font-medium text-paper-100/70">{filteredModules.length} found</span>
              </div>
              {filteredModules.length ? (
                <div className="space-y-2">
                  {filteredModules.map(module => (
                    <Link key={module.title} href={module.href} className="focus-ring flex min-h-14 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4" aria-label={`${module.title}. ${module.description}`}>
                      <module.icon className="h-5 w-5 text-brand-orange" aria-hidden="true" />
                      <span className="min-w-0 flex-1"><span className="block text-[14px] font-semibold text-paper-100">{module.title}</span><span className="mt-0.5 block text-[12px] text-paper-100/70">{module.description}</span></span>
                      <ChevronRight className="h-4 w-4 text-paper-100/60" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              ) : (
                <SolidCard className="text-center">
                  <p className="text-[18px] font-semibold text-paper-100">No matching modules</p>
                  <p className="mt-2 text-[13px] leading-5 text-paper-100/70">Try a broader term or clear the search to restore all six local modules.</p>
                  <button type="button" className="focus-ring mt-3 min-h-11 rounded-pill px-4 text-[13px] font-semibold text-brand-orange" onClick={clearSearch}>Browse all modules</button>
                </SolidCard>
              )}
            </section>
          ) : (
            <>
              <section className="space-y-3">
                <h2 className="px-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-paper-100/70">Suggested for <span className="text-emphasis">you</span></h2>
                <div className="grid grid-cols-2 gap-3">
                  <SuggestionCard title="Journal" subtitle={screenState === 'empty' || screenState === 'error' ? 'Popular starting point' : 'Continue your reflection'} icon={BookOpen} provenance={suggestionProvenance} href="/screens/37" />
                  <SuggestionCard title="Sleep" subtitle={screenState === 'empty' || screenState === 'error' ? 'Popular starting point' : 'Suggested from recovery'} icon={Moon} provenance={suggestionProvenance} onOpen={trigger => openModule({ title: 'Sleep', href: '/screens/58' }, trigger)} />
                </div>
              </section>

              <section className="space-y-3">
                <SectionTitle title="Your active domains" meta={radarState === 'null' ? 'No synced mix' : '5 domains · 100%'} />
                <SolidCard><ActiveDomainRadar state={radarState} /></SolidCard>
                {radarState === 'partial' && <p className="px-1 text-[12px] leading-4 text-paper-100/70">Career is cached and shown with a dashed, low-confidence cue; the exact source value remains 10%.</p>}
                {screenState === 'offline' && <p className="px-1 text-[12px] leading-5 text-paper-100/70">Source: bundled activity mix · Freshness: cached 14m ago · Offline. Percentages remain source values, not new inference.</p>}
              </section>

              <section className="space-y-3">
                <SectionTitle title="Fitness and movement" />
                <div className="grid grid-cols-2 gap-3">
                  <ModuleCard title="Workouts" meta={noPersonalStats ? 'No history yet' : `12 sessions${moduleFreshness}`} href="/screens/26" icon={Dumbbell} progress={noPersonalStats ? null : 68} />
                  <ModuleCard title="Yoga" meta="Included" href="/screens/55" icon={Flower2} progress={null} />
                </div>
              </section>

              <section className="space-y-3">
                <SectionTitle title="Wellbeing" />
                <div className="grid grid-cols-2 gap-3">
                  <ModuleCard title="Journal" meta={noPersonalStats ? 'No history yet' : `4 entries${moduleFreshness}`} href="/screens/37" icon={BookOpen} progress={noPersonalStats ? null : 32} />
                  <ModuleCard title="Habits" meta="Included" href="/screens/38" icon={Repeat} progress={null} />
                </div>
              </section>

              <section className="space-y-3" data-paywall-count="2">
                <SectionTitle title="More features" meta="Plan previews" />
                <PaywallLock
                  className="!min-h-[240px]"
                  title="Advanced insights · Pro"
                  description="Preview the real insight layout before deciding. No entitlement changes here."
                  action={<Link href="/screens/43?trigger=advanced-insights" data-paywall-trigger="advanced-insights" aria-label="View Pro options for Advanced insights" className="focus-ring inline-flex min-h-11 items-center rounded-pill px-4 text-[13px] font-semibold text-brand-orange">View Pro options</Link>}
                >
                  <div className="space-y-3"><div className="h-4 w-28 rounded bg-white/20" /><div className="grid grid-cols-3 gap-2">{[48, 70, 36].map(value => <div key={value} className="flex h-20 items-end rounded-lg bg-white/[0.05] p-2"><span className="w-full rounded bg-brand-orange/50" style={{ height: `${value}%` }} /></div>)}</div></div>
                </PaywallLock>
                <PaywallLock
                  className="!min-h-[240px]"
                  title="Guided journeys · Pro"
                  description="Preview the guided sequence and choose from the full plan screen. No journey starts here."
                  action={<Link href="/screens/43?trigger=guided-journeys" data-paywall-trigger="guided-journeys" aria-label="View Pro options for Guided journeys" className="focus-ring inline-flex min-h-11 items-center rounded-pill px-4 text-[13px] font-semibold text-brand-orange">View Pro options</Link>}
                >
                  <div className="space-y-3"><div className="flex items-center gap-3"><span className="h-10 w-10 rounded-full border border-white/20" /><span className="h-4 flex-1 rounded bg-white/20" /></div><div className="h-12 rounded-xl bg-white/[0.07]" /></div>
                </PaywallLock>
              </section>

              <button type="button" className="focus-ring min-h-11 w-full rounded-pill border border-white/15 bg-white/[0.04] px-4 text-[13px] font-semibold text-paper-100" onClick={event => openPanel('data-controls', event.currentTarget)}>Review eight data controls</button>
            </>
          )}
        </main>
      </HifiShell>
    </div>
  )
}
