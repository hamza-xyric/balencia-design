'use client'

import { useEffect, useRef, useState, type ComponentType, type KeyboardEvent } from 'react'
import Link from 'next/link'
import {
  AppWindow,
  Award,
  BookOpen,
  BrainCircuit,
  Camera,
  ChevronRight,
  Flame,
  Gauge,
  HeartPulse,
  Image as ImageIcon,
  Search,
  Settings,
  ShieldCheck,
  Star,
  Trophy,
  WifiOff,
  X,
} from 'lucide-react'
import {
  CIAInsightCard,
  GlassCard,
  HifiShell,
  ProgressBar,
  Provenance,
  SolidCard,
  TopBar,
} from '@/components/hifi/kit'
import { persona } from '@/data/hifi/persona'

type MeState = 'default' | 'skeleton' | 'empty' | 'error' | 'offline' | 'success' | 'disabled'
type MePanel = 'closed' | 'data-controls' | 'avatar-consent'
type DataControl = 'Category' | 'Source' | 'Scope' | 'Freshness' | 'Retention' | 'Export' | 'Revoke' | 'Delete'

const ME_STATES: MeState[] = ['default', 'skeleton', 'empty', 'error', 'offline', 'success', 'disabled']
const ME_PANELS: MePanel[] = ['closed', 'data-controls', 'avatar-consent']
const DATA_CONTROLS: DataControl[] = ['Category', 'Source', 'Scope', 'Freshness', 'Retention', 'Export', 'Revoke', 'Delete']

const stateStatus: Record<MeState, string> = {
  default: 'Profile preview ready. No profile, health, or network request was made.',
  skeleton: 'Profile preview is loading. Photo and refresh actions are unavailable.',
  empty: 'New profile preview. No imported history is claimed yet.',
  error: 'Profile refresh could not complete. Cached values from 14 minutes ago remain visible.',
  offline: 'Offline preview. Cached values remain visible and suggestions use the local catalog.',
  success: 'Stats refreshed in this local preview. No network request was made.',
  disabled: 'Profile photo access is unavailable in this permission-blocked preview.',
}

const controlOutcomes: Record<DataControl, string> = {
  Category: 'Profile, progression, health, and coaching categories are represented on this screen.',
  Source: 'Sources shown here include your profile, WHOOP, Health, and information you logged.',
  Scope: 'This preview covers the profile hub only. It does not change another Balencia surface.',
  Freshness: 'Profile values are current for the default fixture; cached fixtures name their age.',
  Retention: 'Retention choices open as a local explanation only. No policy was changed.',
  Export: 'Export is a local preview. No file was created or downloaded.',
  Revoke: 'Revoke is a local preview. No connection or permission was changed.',
  Delete: 'Delete is a local preview. No profile or imported record was deleted.',
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
    const focusable = [...(dialogRef.current?.querySelectorAll<HTMLElement>('a[href], button:not(:disabled), input:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])') ?? [])]
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
      className="absolute inset-0 z-[60] flex items-end bg-ink-900/85 p-4"
      role="presentation"
      onMouseDown={event => { if (event.target === event.currentTarget) onClose() }}
    >
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="me-dialog-title"
        aria-describedby="me-dialog-description"
        className="action-sheet-surface glass-card w-full p-5 shadow-3"
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 id="me-dialog-title" className="text-[18px] font-semibold leading-6 text-paper-100">{title}</h2>
            <p id="me-dialog-description" className="mt-1 text-[13px] leading-5 text-paper-100/70">{description}</p>
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

function AvatarUploader({ disabled, empty, onOpen }: { disabled: boolean; empty: boolean; onOpen: (trigger: HTMLButtonElement) => void }) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-describedby={disabled ? 'me-avatar-disabled-reason' : undefined}
      aria-label={empty ? 'Initials avatar is not configured. Review profile photo consent.' : `Initials avatar for ${persona.firstName}. Review profile photo consent before profile editing.`}
      className="focus-ring relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full disabled:cursor-not-allowed disabled:opacity-40"
      onClick={event => onOpen(event.currentTarget)}
    >
      <span className="flex h-full w-full items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-[22px] font-semibold text-paper-100/90">
        {empty ? '+' : 'AM'}
      </span>
      <span aria-hidden="true" className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-ink-900 bg-white/10">
        <Camera className="h-4 w-4 text-paper-100/85" strokeWidth={2} />
      </span>
    </button>
  )
}

function QuickLinkCard({ icon: Icon, title, subtitle, href }: { icon: ComponentType<{ className?: string; strokeWidth?: number; 'aria-hidden'?: boolean }>; title: string; subtitle: string; href: string }) {
  return (
    <Link href={href} aria-label={`${title}, ${subtitle}`} className="focus-ring block rounded-xl text-left">
      <GlassCard tone="muted" className="flex h-full flex-col justify-between gap-3 p-3.5">
        <div className="flex items-center justify-between" aria-hidden="true">
          <Icon className="h-4 w-4 text-paper-100/70" strokeWidth={1.9} />
          <ChevronRight className="h-4 w-4 text-paper-100/55" strokeWidth={1.9} />
        </div>
        <div>
          <p className="text-[14px] font-medium leading-tight text-paper-100">{title}</p>
          <p className="mt-1 text-[12px] leading-4 text-paper-100/70 tabular-nums">{subtitle}</p>
        </div>
      </GlassCard>
    </Link>
  )
}

function DataRow({ icon: Icon, title, meta, href }: { icon: ComponentType<{ className?: string; strokeWidth?: number; 'aria-hidden'?: boolean }>; title: string; meta: string; href: string }) {
  return (
    <Link href={href} aria-label={`${title}, ${meta}`} className="focus-ring flex min-h-11 w-full items-center justify-between gap-3 rounded-xl px-1 py-2 text-left">
      <span className="flex items-center gap-2.5">
        <Icon aria-hidden={true} className="h-4 w-4 shrink-0 text-paper-100/70" strokeWidth={1.8} />
        <span className="text-[14px] font-medium text-paper-100/90">{title}</span>
      </span>
      <span className="flex items-center gap-1.5 text-paper-100/70">
        <span className="text-[12px] tabular-nums">{meta}</span>
        <ChevronRight aria-hidden="true" className="h-4 w-4 text-paper-100/55" strokeWidth={1.8} />
      </span>
    </Link>
  )
}

function ProfileSkeleton() {
  return (
    <div className="space-y-4" aria-hidden="true">
      <div className="glass-card flex min-h-[320px] flex-col items-center gap-4 p-5">
        <div className="skeleton-block h-20 w-20 rounded-full" />
        <div className="skeleton-block h-6 w-32 rounded-md" />
        <div className="skeleton-block h-4 w-44 rounded-md" />
        <div className="skeleton-block mt-3 h-2 w-full rounded-pill" />
        <div className="skeleton-block h-12 w-full rounded-xl" />
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {Array.from({ length: 4 }).map((_, index) => <div key={index} className="skeleton-block h-28 rounded-xl" />)}
      </div>
      <div className="skeleton-block h-52 rounded-xl" />
    </div>
  )
}

function ProfileStatus({ state, message }: { state: MeState; message: string }) {
  const Icon = state === 'offline' ? WifiOff : state === 'error' ? ShieldCheck : Gauge
  return (
    <div
      id="me-status"
      role={state === 'error' ? 'alert' : 'status'}
      className={`flex min-h-11 items-start gap-2 rounded-xl border px-3 py-2.5 text-[12px] leading-4 ${state === 'error' ? 'border-error-red/35 bg-error-red/10 text-paper-100' : state === 'success' ? 'border-forest-green/35 bg-forest-green/10 text-paper-100' : 'border-white/10 bg-white/[0.04] text-paper-100/75'}`}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <span>{message}</span>
    </div>
  )
}

export function S17MeMain() {
  const [screenState, setScreenState] = useState<MeState>('default')
  const [panel, setPanel] = useState<MePanel>('closed')
  const [selectedControl, setSelectedControl] = useState<DataControl>('Category')
  const [status, setStatus] = useState(stateStatus.default)
  const returnFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const requestedState = params.get('state') as MeState | null
    const requestedPanel = params.get('panel') as MePanel | null
    const timer = window.setTimeout(() => {
      if (requestedState && ME_STATES.includes(requestedState)) {
        setScreenState(requestedState)
        setStatus(stateStatus[requestedState])
      }
      if (requestedPanel && ME_PANELS.includes(requestedPanel)) setPanel(requestedPanel)
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  const openPanel = (nextPanel: Exclude<MePanel, 'closed'>, trigger: HTMLElement) => {
    returnFocusRef.current = trigger
    setPanel(nextPanel)
  }

  const closePanel = () => setPanel('closed')
  const isSkeleton = screenState === 'skeleton'
  const isEmpty = screenState === 'empty'
  const isStale = screenState === 'offline' || screenState === 'error'
  const avatarDisabled = screenState === 'disabled' || screenState === 'offline' || isSkeleton

  const overlay = panel === 'data-controls' ? (
    <PreviewDialog
      title="Profile data controls"
      description="Choose a control to review its scope. These are local explanations; no profile data or policy changes."
      onClose={closePanel}
      returnFocusRef={returnFocusRef}
    >
      <div className="mt-4 grid grid-cols-2 gap-2" role="group" aria-label="Profile data controls">
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
  ) : panel === 'avatar-consent' ? (
    <PreviewDialog
      title="Profile photo consent"
      description="A profile photo is optional. This preview never opens a camera, photo library, or file picker."
      onClose={closePanel}
      returnFocusRef={returnFocusRef}
    >
      <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] p-3">
        <p className="text-[13px] leading-5 text-paper-100/75">If you continue, Profile Edit explains the same privacy choice before its local picker preview. Your initials remain visible if you decline.</p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button type="button" className="focus-ring glass-pill min-h-12 px-3 text-[13px] font-medium text-paper-100" onClick={closePanel}>Keep initials</button>
        <Link href="/screens/50?panel=photo-consent" className="focus-ring glass-pill flex min-h-12 items-center justify-center px-3 text-center text-[13px] font-medium text-paper-100">Continue to edit</Link>
      </div>
    </PreviewDialog>
  ) : undefined

  const quickLinks = (isEmpty
    ? [
        { icon: BookOpen, title: 'Mission journal', subtitle: 'No entries yet', href: '/screens/73' },
        { icon: ShieldCheck, title: 'Book of Life', subtitle: 'No facts yet', href: '/screens/20' },
        { icon: AppWindow, title: 'Connected services', subtitle: 'No providers yet', href: '/screens/22' },
        { icon: ImageIcon, title: 'Progress photos', subtitle: 'No photos yet', href: '/screens/49' },
        { icon: Award, title: 'Achievements', subtitle: 'Start your first mission', href: '/screens/71' },
      ]
    : [
        { icon: BookOpen, title: 'Mission journal', subtitle: '18 entries', href: '/screens/73' },
        { icon: ShieldCheck, title: 'Book of Life', subtitle: 'What CIA knows', href: '/screens/20' },
        { icon: AppWindow, title: 'Connected services', subtitle: '3 connected providers', href: '/screens/22' },
        { icon: ImageIcon, title: 'Progress photos', subtitle: '24 photos', href: '/screens/49' },
        { icon: Award, title: 'Achievements', subtitle: '31 earned', href: '/screens/71' },
      ]).map(link => isStale && !isEmpty ? { ...link, subtitle: `${link.subtitle} · cached 14m ago` } : link)

  return (
    <div className="contents [&_[data-chip-interactive]]:!text-[12px] [&_nav_span]:!text-[12px]">
      <HifiShell
        header={
          <TopBar
            title="Profile"
            back={false}
            right={
              <div className="flex items-center gap-1">
                <Link href="/screens/68" aria-label="Search profile" className="focus-ring flex h-11 w-11 items-center justify-center rounded-full text-paper-100/75">
                  <Search className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />
                </Link>
                <Link href="/screens/21" aria-label="Open Settings" className="focus-ring flex h-11 w-11 items-center justify-center rounded-full text-paper-100/75">
                  <Settings className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />
                </Link>
              </div>
            }
          />
        }
        activeTab="me"
        showTabBar
        atmosphere="you"
        overlay={overlay}
      >
        <main
          className="space-y-4 px-4 pb-6 pt-3"
          data-me-state={screenState}
          data-me-panel={panel}
          aria-busy={isSkeleton || undefined}
        >
          <ProfileStatus state={screenState} message={status} />

          {isSkeleton ? <ProfileSkeleton /> : (
            <>
              <GlassCard tone="you">
                <div className="flex flex-col items-center gap-4 text-center">
                  <AvatarUploader disabled={avatarDisabled} empty={isEmpty} onOpen={(trigger) => openPanel('avatar-consent', trigger)} />
                  <div>
                    <h2 className="text-[22px] font-semibold leading-7 text-paper-100">{isEmpty ? 'Add your name' : persona.firstName}</h2>
                    <p className="mt-1 text-[13px] font-medium text-paper-100/70">{isEmpty ? 'Level 1 · building momentum' : `Level ${persona.level} · dedicated explorer`}</p>
                  </div>
                  <div className="w-full space-y-2" role="progressbar" aria-label={isEmpty ? 'Experience 0 of 100 XP' : 'Experience 2,450 of 5,809 XP'} aria-valuemin={0} aria-valuemax={isEmpty ? 100 : 5809} aria-valuenow={isEmpty ? 0 : 2450}>
                    <div className="flex items-baseline justify-between text-[12px] font-semibold uppercase tracking-wide text-paper-100/70">
                      <span>Experience</span>
                      <span className="text-[13px] font-medium normal-case tabular-nums text-paper-100/80">{isEmpty ? '0 / 100 XP' : '2,450 / 5,809 XP'}</span>
                    </div>
                    <ProgressBar value={isEmpty ? 0 : 42} tone="you" />
                  </div>
                  <p className="text-[12px] text-paper-100/70">{isEmpty ? 'New member preview' : 'Member since May 2026'}</p>
                  <p className="max-w-[260px] text-[13px] leading-5 text-paper-100/75">
                    Your <span className="text-emphasis">main</span> hub for progress, missions, and what CIA has learned.
                  </p>
                  <ReadableProvenance items={[isEmpty ? 'Profile not configured' : isStale ? 'Via profile · cached 14m ago' : 'Via profile']} />
                  {avatarDisabled && <p id="me-avatar-disabled-reason" className="text-[12px] leading-4 text-paper-100/70">Photo consent is unavailable in this fixture; initials remain visible.</p>}
                </div>
              </GlassCard>

              <SolidCard className="!p-0 overflow-hidden" >
                <div className="grid grid-cols-2" role="group" aria-label="Profile progress summary">
                <div className="min-h-[120px] border-b border-r border-white/[0.06] p-3.5">
                  <div className="flex items-center gap-2 text-paper-100/70"><Flame className="h-4 w-4 text-brand-orange" strokeWidth={1.9} aria-hidden="true" /><span className="text-[12px] font-semibold uppercase tracking-wide">Streak</span></div>
                  <p className="mt-2 text-[20px] font-semibold leading-6 text-paper-100 tabular-nums">{isEmpty ? '0 days' : '42 days'}</p>
                  <div className="mt-2"><ReadableProvenance items={[isEmpty ? 'Nothing logged yet' : isStale ? 'You logged · cached 14m ago' : 'You logged']} /></div>
                </div>
                <div className="min-h-[120px] border-b border-white/[0.06] p-3.5">
                  <div className="flex items-center gap-2 text-paper-100/70"><Trophy className="h-4 w-4 text-brand-orange" strokeWidth={1.9} aria-hidden="true" /><span className="text-[12px] font-semibold uppercase tracking-wide">Completed</span></div>
                  <p className="mt-2 text-[20px] font-semibold leading-6 text-paper-100 tabular-nums">{isEmpty ? '0 missions' : '12 missions'}</p>
                  <div className="mt-2"><ReadableProvenance items={[isEmpty ? 'No mission history' : isStale ? 'Via profile · cached 14m ago' : 'Via profile']} /></div>
                </div>
                <Link href="/screens/16" aria-label={`Life Power, ${isEmpty ? 'building your balance' : `${persona.lifePower} points`}`} className="focus-ring block min-h-[120px] border-r border-white/[0.06] p-3.5">
                    <div className="flex items-center gap-2 text-paper-100/70"><Gauge className="h-4 w-4 text-brand-orange" strokeWidth={1.9} aria-hidden="true" /><span className="text-[12px] font-semibold uppercase tracking-wide">Life Power</span></div>
                    <p className="mt-2 text-[20px] font-semibold leading-6 text-paper-100 tabular-nums">{isEmpty ? 'Building' : `${persona.lifePower} points`}</p>
                    <div className="mt-2"><ReadableProvenance items={[isEmpty ? 'No domains scored' : isStale ? 'Calculated · cached 14m ago' : 'Calculated']} /></div>
                </Link>
                <div className="min-h-[120px] p-3.5">
                  <div className="flex items-center gap-2 text-paper-100/70"><Star className="h-4 w-4 text-brand-orange" strokeWidth={1.9} aria-hidden="true" /><span className="text-[12px] font-semibold uppercase tracking-wide">Total XP</span></div>
                  <p className="mt-2 text-[20px] font-semibold leading-6 text-paper-100 tabular-nums">{isEmpty ? '0 XP' : '8,450 XP'}</p>
                  <div className="mt-2"><ReadableProvenance items={[isEmpty ? 'No XP yet' : isStale ? 'Via profile · cached 14m ago' : 'Via profile']} /></div>
                </div>
                </div>
              </SolidCard>

              <SolidCard className="space-y-4 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-[12px] font-semibold uppercase tracking-wide text-paper-100/70">Composed of</p>
                  <Link href="/screens/16" className="focus-ring flex min-h-11 items-center gap-1 rounded-pill px-2 text-[12px] font-medium text-brand-orange">See all 10 <ChevronRight className="h-3 w-3" strokeWidth={1.9} aria-hidden="true" /></Link>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'Fitness', value: isEmpty ? 0 : 74, source: isEmpty ? 'Not scored' : isStale ? 'Via WHOOP · cached 14m ago' : 'Via WHOOP' },
                    { name: 'Wellbeing', value: isEmpty ? 0 : 62, source: isEmpty ? 'Not scored' : isStale ? 'Via Health · cached 14m ago' : 'Via Health' },
                    { name: 'Career', value: isEmpty ? 0 : 55, source: isEmpty ? 'Not scored' : isStale ? 'You logged · cached 14m ago' : 'You logged' },
                  ].map(domain => (
                    <div key={domain.name} role="progressbar" aria-label={`${domain.name} ${domain.value} of 99, ${domain.source}`} aria-valuemin={0} aria-valuemax={99} aria-valuenow={domain.value}>
                      <div className="mb-1.5 flex items-center justify-between"><span className="text-[13px] font-medium text-paper-100/85">{domain.name}</span><span className="text-[13px] font-semibold tabular-nums text-paper-100/75">{domain.value}</span></div>
                      <ProgressBar value={domain.value} tone="you" />
                      <div className="mt-1.5"><ReadableProvenance items={[domain.source]} /></div>
                    </div>
                  ))}
                </div>
              </SolidCard>

              <div className="grid grid-cols-2 gap-2.5">
                {quickLinks.map(link => <QuickLinkCard key={link.title} {...link} />)}
              </div>

              <SolidCard className="space-y-1 p-4">
                <p className="pb-1 text-[12px] font-semibold uppercase tracking-wide text-paper-100/70">Data &amp; consent</p>
                <div className="divide-y divide-white/[0.06]">
                  <DataRow icon={BrainCircuit} title="CIA memory" meta={isEmpty ? 'No facts yet' : isStale ? '20 facts · cached 14m ago' : '20 facts'} href="/screens/20" />
                  <DataRow icon={ShieldCheck} title="Data sources" meta={isEmpty ? 'No records yet' : isStale ? '84 imported records · cached 14m ago' : '84 imported records'} href="/screens/84" />
                  <DataRow icon={HeartPulse} title="Health view" meta={isEmpty ? 'No items yet' : isStale ? '96 items · cached 14m ago' : '96 items'} href="/screens/96" />
                </div>
                {!isEmpty && <p className="pt-1 text-[12px] leading-4 text-paper-100/70">Connected services: 3 connected providers. Imported profile history: 84 imported records.{isStale ? ' Cached 14m ago.' : ''}</p>}
                <p className="pt-1 text-[12px] leading-4 text-paper-100/70">Coaching support, not medical advice. Mood trends carry no XP or streak.</p>
                <button type="button" className="focus-ring mt-2 min-h-11 w-full rounded-pill border border-white/15 bg-white/[0.04] px-4 text-[13px] font-semibold text-paper-100" onClick={event => openPanel('data-controls', event.currentTarget)}>Review eight data controls</button>
              </SolidCard>

              <section className="space-y-2">
                <p className="px-1 text-[12px] font-semibold uppercase tracking-wide text-paper-100/70">Suggested for you</p>
                <CIAInsightCard
                  className="[&>div>div>p]:!text-[12px] [&_span]:!text-[12px]"
                  eyebrow={screenState === 'offline' ? 'Popular locally' : screenState === 'error' ? 'Popular fallback' : 'Grow your practice'}
                  provenance={[screenState === 'offline' ? 'Local catalog · offline' : screenState === 'error' ? 'Static catalog · refresh failed' : isEmpty ? 'Popular with Balencia' : 'Via recent activity']}
                  actions={<Link href="/screens/54" className="focus-ring flex min-h-11 items-center gap-1 rounded-pill text-[13px] font-medium text-brand-orange">Open meditation <ChevronRight className="h-4 w-4" strokeWidth={1.9} aria-hidden="true" /></Link>}
                >
                  <p>{isEmpty || isStale ? 'Explore a short meditation without a personalized claim.' : 'You have logged three sessions this month. A few more minutes daily could deepen your calm baseline.'}</p>
                </CIAInsightCard>
              </section>
            </>
          )}
        </main>
      </HifiShell>
    </div>
  )
}
