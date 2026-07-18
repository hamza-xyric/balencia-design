'use client'

import Link from 'next/link'
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type KeyboardEvent, type MutableRefObject } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Compass,
  Footprints,
  Leaf,
  PiggyBank,
  RefreshCw,
  Sparkles,
  Sprout,
  Trophy,
  WifiOff,
  X,
} from 'lucide-react'
import { GlassCard, HifiShell, Provenance, SolidCard, TopBar, cx } from '@/components/hifi/kit'

type AchievementState = 'default' | 'skeleton' | 'first-use' | 'filtered-empty' | 'error' | 'offline' | 'success'
type AchievementFilter = 'all' | 'fitness' | 'nutrition' | 'finance' | 'meditation'
type AchievementPanel = 'closed' | 'badge'
type AchievementStatus = 'earned' | 'progress' | 'to-discover'
type AchievementRarity = 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary'

type Achievement = {
  id: string
  title: string
  domain: Exclude<AchievementFilter, 'all' | 'meditation'> | 'career'
  domainLabel: string
  domainClass: string
  iconClass: string
  status: AchievementStatus
  rarity: AchievementRarity
  detail: string
  provenance: string
  icon: LucideIcon
  href: string
}

const ACHIEVEMENT_STATES: AchievementState[] = ['default', 'skeleton', 'first-use', 'filtered-empty', 'error', 'offline', 'success']
const ACHIEVEMENT_FILTERS: AchievementFilter[] = ['all', 'fitness', 'nutrition', 'finance', 'meditation']
const ACHIEVEMENT_PANELS: AchievementPanel[] = ['closed', 'badge']
const DATA_CONTROLS = ['Category', 'Source', 'Scope', 'Freshness', 'Retention', 'Export', 'Revoke', 'Delete'] as const
const FILTER_VIEWPORT_INSET = 16

const RARITY_STYLES: Record<AchievementRarity, { rank: number; className: string; arcClassName: string; newRingClass: string }> = {
  Common: { rank: 1, className: 'border-rarity-common/40 bg-rarity-common-subtle text-paper-100', arcClassName: 'text-rarity-common', newRingClass: 'ring-rarity-common/65' },
  Uncommon: { rank: 2, className: 'border-rarity-uncommon/40 bg-rarity-uncommon-subtle text-paper-100', arcClassName: 'text-rarity-uncommon', newRingClass: 'ring-rarity-uncommon/65' },
  Rare: { rank: 3, className: 'border-rarity-rare/40 bg-rarity-rare-subtle text-paper-100', arcClassName: 'text-rarity-rare', newRingClass: 'ring-rarity-rare/65' },
  Epic: { rank: 4, className: 'border-rarity-epic/40 bg-rarity-epic-subtle text-paper-100', arcClassName: 'text-rarity-epic', newRingClass: 'ring-rarity-epic/65' },
  Legendary: { rank: 5, className: 'border-rarity-legendary/40 bg-rarity-legendary-subtle text-paper-100', arcClassName: 'text-rarity-legendary', newRingClass: 'ring-rarity-legendary/65' },
}

const DOMAIN_COVERAGE = [
  { name: 'Fitness', count: 12, dotClass: 'bg-domain-fitness', borderClass: 'border-domain-fitness/35' },
  { name: 'Sleep', count: 7, dotClass: 'bg-domain-sleep', borderClass: 'border-domain-sleep/35' },
  { name: 'Career', count: 3, dotClass: 'bg-domain-career', borderClass: 'border-domain-career/35' },
  { name: 'Nutrition', count: 8, dotClass: 'bg-domain-nutrition', borderClass: 'border-domain-nutrition/35' },
  { name: 'Finance', count: 5, dotClass: 'bg-domain-finance', borderClass: 'border-domain-finance/35' },
  { name: 'Faith', count: 2, dotClass: 'bg-domain-faith', borderClass: 'border-domain-faith/35' },
  { name: 'Productivity', count: 3, dotClass: 'bg-domain-productivity', borderClass: 'border-domain-productivity/35' },
  { name: 'Relationships', count: 2, dotClass: 'bg-domain-relationships', borderClass: 'border-domain-relationships/35' },
  { name: 'Wellbeing', count: 3, dotClass: 'bg-domain-wellbeing', borderClass: 'border-domain-wellbeing/35' },
  { name: 'Meditation', count: 2, dotClass: 'bg-domain-meditation', borderClass: 'border-domain-meditation/35' },
] as const

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-5k-run',
    title: 'First 5k Run',
    domain: 'fitness',
    domainLabel: 'Fitness',
    domainClass: 'border-domain-fitness/35 bg-domain-fitness/10',
    iconClass: 'text-domain-fitness',
    status: 'earned',
    rarity: 'Rare',
    detail: 'Earned 12 Oct · completed a verified 5 km activity.',
    provenance: 'Via activity history',
    icon: Trophy,
    href: '/screens/26',
  },
  {
    id: 'movement-rhythm',
    title: 'Movement Rhythm',
    domain: 'fitness',
    domainLabel: 'Fitness',
    domainClass: 'border-domain-fitness/35 bg-domain-fitness/10',
    iconClass: 'text-domain-fitness',
    status: 'earned',
    rarity: 'Uncommon',
    detail: 'Earned 10 Oct · seven active days in the bundled history.',
    provenance: 'Via habit history',
    icon: Footprints,
    href: '/screens/38',
  },
  {
    id: 'greens-week',
    title: 'Greens Week',
    domain: 'nutrition',
    domainLabel: 'Nutrition',
    domainClass: 'border-domain-nutrition/35 bg-domain-nutrition/10',
    iconClass: 'text-domain-nutrition',
    status: 'earned',
    rarity: 'Common',
    detail: 'Earned 8 Oct · seven logged servings in the bundled history.',
    provenance: 'Via nutrition log',
    icon: Leaf,
    href: '/screens/56',
  },
  {
    id: 'savings-builder',
    title: 'Savings Builder',
    domain: 'finance',
    domainLabel: 'Finance',
    domainClass: 'border-domain-finance/35 bg-domain-finance/10',
    iconClass: 'text-domain-finance',
    status: 'progress',
    rarity: 'Epic',
    detail: '42% complete · 21 of 50 bundled saving check-ins.',
    provenance: 'Via Finance check-ins',
    icon: PiggyBank,
    href: '/screens/30',
  },
  {
    id: 'career-compass',
    title: 'Career Compass',
    domain: 'career',
    domainLabel: 'Career',
    domainClass: 'border-domain-career/35 bg-domain-career/10',
    iconClass: 'text-domain-career',
    status: 'earned',
    rarity: 'Rare',
    detail: 'A newly highlighted item within the bundled set of 47 earned achievements.',
    provenance: 'Via Career reflection',
    icon: Compass,
    href: '/screens/32',
  },
  {
    id: 'steady-nourishment',
    title: 'Steady Nourishment',
    domain: 'nutrition',
    domainLabel: 'Nutrition',
    domainClass: 'border-domain-nutrition/35 bg-domain-nutrition/10',
    iconClass: 'text-domain-nutrition',
    status: 'to-discover',
    rarity: 'Legendary',
    detail: 'To discover · continue logging meals to reveal the local requirement.',
    provenance: 'Requirement not yet met',
    icon: Sprout,
    href: '/screens/56',
  },
]

const SUCCESS_ACHIEVEMENT = ACHIEVEMENTS.find(achievement => achievement.id === 'career-compass') ?? ACHIEVEMENTS[0]

const FILTER_LABELS: Record<AchievementFilter, string> = {
  all: 'All',
  fitness: 'Fitness',
  nutrition: 'Nutrition',
  finance: 'Finance',
  meditation: 'Meditation',
}

const STATE_STATUS: Record<AchievementState, string> = {
  default: 'Achievement gallery ready with 47 of 120 achievements earned and a populated streak.',
  skeleton: 'Loading the bundled achievement gallery. No request is running.',
  'first-use': 'First-use achievement gallery. Zero of 120 are earned and the streak starts today.',
  'filtered-empty': 'No Meditation achievements are available in this bundled view.',
  error: 'Could not refresh the summary. Cached achievements remain visible and no request failed.',
  offline: 'Offline preview. Cached achievements remain visible and refresh is disabled.',
  success: 'A newly arrived achievement is highlighted within the bundled set. No award or sync occurred.',
}

function RarityMark({ rarity }: { rarity: AchievementRarity }) {
  const style = RARITY_STYLES[rarity]
  const radius = 6
  const circumference = 2 * Math.PI * radius
  const arc = (style.rank / 5) * circumference

  return (
    <span
      className={cx('inline-flex min-h-7 items-center gap-1.5 rounded-pill border px-2.5 text-[12px] font-semibold', style.className)}
      role="img"
      aria-label={`${rarity} rarity, tier ${style.rank} of 5`}
      data-achievement-rarity={rarity.toLowerCase()}
      data-rarity-rank={style.rank}
    >
      <svg viewBox="0 0 16 16" className={cx('h-4 w-4 -rotate-90', style.arcClassName)} aria-hidden="true">
        <circle cx="8" cy="8" r={radius} fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.22" />
        <circle cx="8" cy="8" r={radius} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray={`${arc} ${circumference}`} />
      </svg>
      <span>{rarity}</span>
    </span>
  )
}

function AchievementDetailDialog({
  achievement,
  onClose,
  returnFocusRef,
}: {
  achievement: Achievement
  onClose: () => void
  returnFocusRef: MutableRefObject<HTMLElement | null>
}) {
  const dialogRef = useRef<HTMLElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const returnFocus = returnFocusRef.current
    const frame = window.requestAnimationFrame(() => closeRef.current?.focus())
    return () => {
      window.cancelAnimationFrame(frame)
      window.requestAnimationFrame(() => returnFocus?.isConnected && returnFocus.focus())
    }
  }, [returnFocusRef])

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
      return
    }
    if (event.key !== 'Tab') return
    const focusable = [...(dialogRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled), a[href]') ?? [])]
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

  const Icon = achievement.icon

  return (
    <div className="absolute inset-0 z-[70] flex items-end bg-ink-900/85 p-4" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) onClose() }}>
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="achievement-detail-title"
        aria-describedby="achievement-detail-description"
        className="action-sheet-surface glass-card w-full p-5 shadow-3"
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className={cx('flex h-12 w-12 shrink-0 items-center justify-center rounded-full border bg-white/[0.03]', achievement.domainClass)} aria-hidden="true">
              <Icon className={cx('h-6 w-6', achievement.iconClass)} strokeWidth={1.8} />
            </span>
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-paper-100/70">{achievement.domainLabel} Achievement</p>
              <h2 id="achievement-detail-title" className="mt-1 text-[18px] font-semibold leading-6 text-paper-100">{achievement.title}</h2>
              <div className="mt-2"><RarityMark rarity={achievement.rarity} /></div>
            </div>
          </div>
          <button ref={closeRef} type="button" className="focus-ring flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-paper-100/75" aria-label="Close achievement details" onClick={onClose}>
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
        <p id="achievement-detail-description" className="mt-4 text-[13px] leading-5 text-paper-100/75">{achievement.detail}</p>
        <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] p-3">
          <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-paper-100/70">Source and freshness</p>
          <p className="mt-1 text-[13px] leading-5 text-paper-100/75">{achievement.provenance} · bundled 11 Jul 2026. This is a local visual fixture.</p>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button type="button" className="focus-ring glass-pill min-h-12 px-3 text-[13px] font-medium text-paper-100" onClick={onClose}>Close details</button>
          <Link href={achievement.href} className="focus-ring glass-pill flex min-h-12 items-center justify-center px-3 text-center text-[13px] font-semibold text-paper-100">View domain</Link>
        </div>
      </section>
    </div>
  )
}

function CompletionRing({ earned, total }: { earned: number; total: number }) {
  const percent = Math.round((earned / total) * 100)
  const radius = 42
  const circumference = 2 * Math.PI * radius
  const progress = (percent / 100) * circumference

  return (
    <div className="relative h-[104px] w-[104px] shrink-0" role="img" aria-label={`${earned} out of ${total} achievements earned. ${percent} percent complete.`}>
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="50" cy="50" r={radius} fill="none" className="stroke-white/10" strokeWidth="8" />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          className="stroke-brand-orange"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${progress} ${circumference}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-[22px] font-semibold leading-6 tabular-nums text-paper-100">{percent}%</span>
        <span className="mt-1 text-[12px] text-paper-100/70">Complete</span>
      </div>
    </div>
  )
}

function AchievementTile({
  achievement,
  status,
  isNew,
  onOpen,
}: {
  achievement: Achievement
  status: AchievementStatus
  isNew: boolean
  onOpen: (achievement: Achievement, trigger: HTMLButtonElement) => void
}) {
  const Icon = achievement.icon
  const rarityStyle = RARITY_STYLES[achievement.rarity]
  const statusText = status === 'earned' ? 'Earned' : status === 'progress' ? achievement.detail.split(' · ')[0] : 'To discover'

  return (
    <button
      type="button"
      data-achievement-tile={achievement.id}
      data-achievement-status={status}
      data-new-arrival={isNew || undefined}
      className={cx(
        'focus-ring surface-warm flex min-h-[212px] w-full flex-col items-start rounded-xl border p-4 text-left',
        achievement.domainClass,
        isNew && cx('animate-fade-up motion-reduce:animate-none ring-2', rarityStyle.newRingClass),
      )}
      aria-label={`${achievement.title}. ${achievement.domainLabel} Achievement. ${achievement.rarity} rarity, tier ${rarityStyle.rank} of 5. ${statusText}. Open details.`}
      onClick={event => onOpen(achievement, event.currentTarget)}
    >
      <span className={cx('flex h-14 w-14 items-center justify-center rounded-full border border-current/25 bg-white/[0.04]', achievement.iconClass)} aria-hidden="true">
        <Icon className="h-7 w-7" strokeWidth={1.7} />
      </span>
      <span className="mt-4 text-[14px] font-semibold leading-5 text-paper-100">{achievement.title}</span>
      <span className="mt-1 text-[12px] leading-4 text-paper-100/70">{achievement.domainLabel}</span>
      <span className="mt-2"><RarityMark rarity={achievement.rarity} /></span>
      <span className="mt-auto flex items-center gap-1.5 pt-3 text-[12px] font-medium text-paper-100/80">
        {status === 'earned' && <CheckCircle2 aria-hidden="true" className="h-4 w-4 text-forest-green" />}
        {status === 'progress' && <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full border-2 border-brand-orange bg-transparent" />}
        {status === 'to-discover' && <Sparkles aria-hidden="true" className="h-4 w-4 text-paper-100/65" />}
        {statusText}
      </span>
    </button>
  )
}

function AchievementSkeleton() {
  return (
    <div className="space-y-4" aria-label="Loading the bundled achievement gallery">
      <div className="skeleton-block h-40 rounded-2xl" />
      <div className="flex gap-2 overflow-hidden">{Array.from({ length: 4 }).map((_, index) => <div key={index} className="skeleton-block h-14 w-24 shrink-0 rounded-xl" />)}</div>
      <div className="flex gap-2 overflow-hidden">{Array.from({ length: 4 }).map((_, index) => <div key={index} className="skeleton-block h-11 w-24 shrink-0 rounded-pill" />)}</div>
      <div className="grid grid-cols-2 gap-3">{Array.from({ length: 4 }).map((_, index) => <div key={index} className="skeleton-block h-[212px] rounded-xl" />)}</div>
    </div>
  )
}

export function S71AchievementGallery() {
  const [achievementState, setAchievementState] = useState<AchievementState>('default')
  const [filter, setFilter] = useState<AchievementFilter>('all')
  const [panel, setPanel] = useState<AchievementPanel>('closed')
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement>(ACHIEVEMENTS[0])
  const [selectedControl, setSelectedControl] = useState<(typeof DATA_CONTROLS)[number] | null>(null)
  const [status, setStatus] = useState(STATE_STATUS.default)
  const returnFocusRef = useRef<HTMLElement | null>(null)
  const filterScrollerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const requestedState = params.get('state') as AchievementState | null
    const requestedFilter = params.get('filter') as AchievementFilter | null
    const requestedPanel = params.get('panel') as AchievementPanel | null
    const requestedBadge = params.get('badge')
    const frame = window.requestAnimationFrame(() => {
      const nextState = requestedState && ACHIEVEMENT_STATES.includes(requestedState) ? requestedState : 'default'
      setAchievementState(nextState)
      setStatus(STATE_STATUS[nextState])
      if (requestedFilter && ACHIEVEMENT_FILTERS.includes(requestedFilter)) setFilter(requestedFilter)
      else if (nextState === 'filtered-empty') setFilter('meditation')
      if (requestedPanel && ACHIEVEMENT_PANELS.includes(requestedPanel)) setPanel(requestedPanel)
      const fixtureAchievement = ACHIEVEMENTS.find(achievement => achievement.id === requestedBadge)
      if (fixtureAchievement) setSelectedAchievement(fixtureAchievement)
      else if (nextState === 'success') setSelectedAchievement(SUCCESS_ACHIEVEMENT)
    })
    return () => window.cancelAnimationFrame(frame)
  }, [])

  useLayoutEffect(() => {
    const scroller = filterScrollerRef.current
    const selectedChip = scroller?.querySelector<HTMLElement>(`[data-achievement-filter-control="${filter}"]`)
    if (!scroller || !selectedChip) return

    const scrollerBounds = scroller.getBoundingClientRect()
    const selectedBounds = selectedChip.getBoundingClientRect()
    const visibleLeft = scrollerBounds.left + FILTER_VIEWPORT_INSET
    const visibleRight = scrollerBounds.right - FILTER_VIEWPORT_INSET

    if (selectedBounds.left < visibleLeft) {
      scroller.scrollLeft -= visibleLeft - selectedBounds.left
    } else if (selectedBounds.right > visibleRight) {
      scroller.scrollLeft += selectedBounds.right - visibleRight
    }
  }, [filter])

  const firstUse = achievementState === 'first-use'
  const earnedCount = firstUse ? 0 : 47
  const totalCount = 120
  const completionPercent = Math.round((earnedCount / totalCount) * 100)
  const coverageTotal = firstUse ? 0 : DOMAIN_COVERAGE.reduce((sum, domain) => sum + domain.count, 0)

  const filteredAchievements = useMemo(() => {
    if (achievementState === 'filtered-empty') return []
    const source = achievementState === 'success'
      ? ACHIEVEMENTS
      : ACHIEVEMENTS.filter(achievement => achievement.id !== 'career-compass')
    if (filter === 'all') return source
    return source.filter(achievement => achievement.domain === filter)
  }, [achievementState, filter])

  const openAchievement = (achievement: Achievement, trigger: HTMLButtonElement) => {
    returnFocusRef.current = trigger
    setSelectedAchievement(firstUse ? {
      ...achievement,
      status: 'to-discover',
      detail: 'To discover · no earned Achievement history exists in this first-use fixture.',
      provenance: 'First-use fixture · no history source',
    } : achievement)
    setPanel('badge')
    setStatus(`Opened local details for “${achievement.title}”. No achievement, source, or navigation state changed.`)
  }

  const closeAchievement = () => setPanel('closed')

  const selectFilter = (nextFilter: AchievementFilter) => {
    setFilter(nextFilter)
    const visibleCount = nextFilter === 'all'
      ? (achievementState === 'success' ? ACHIEVEMENTS.length : ACHIEVEMENTS.length - 1)
      : ACHIEVEMENTS.filter(achievement => achievement.id !== 'career-compass' && achievement.domain === nextFilter).length
    if (visibleCount === 0) {
      // A filter is presentation state, not account/connectivity truth. Preserve
      // first-use, offline, error, and success fixtures while showing zero tiles.
      if (achievementState === 'default' || achievementState === 'filtered-empty') setAchievementState('filtered-empty')
      setStatus(`No ${FILTER_LABELS[nextFilter]} achievements are available in this bundled view.`)
    } else if (achievementState === 'filtered-empty') {
      setAchievementState('default')
      setStatus(`${FILTER_LABELS[nextFilter]} filter selected. ${visibleCount} bundled ${visibleCount === 1 ? 'tile is' : 'tiles are'} visible.`)
    } else {
      setStatus(`${FILTER_LABELS[nextFilter]} filter selected. ${visibleCount} bundled ${visibleCount === 1 ? 'tile is' : 'tiles are'} visible in the current ${achievementState} fixture.`)
    }
  }

  const presentedAchievement = firstUse ? {
    ...selectedAchievement,
    status: 'to-discover' as const,
    detail: 'To discover · no earned Achievement history exists in this first-use fixture.',
    provenance: 'First-use fixture · no history source',
  } : selectedAchievement

  const overlay = panel === 'badge' ? (
    <AchievementDetailDialog achievement={presentedAchievement} onClose={closeAchievement} returnFocusRef={returnFocusRef} />
  ) : undefined

  return (
    <div className="contents [&_nav_span]:!text-[12px] [&_[data-chip-interactive]]:!text-[12px]">
      <HifiShell header={<TopBar title="Achievements" back backHref="/screens/17" />} activeTab="me" overlay={overlay}>
        <main
          className="space-y-4 px-4 pb-5 pt-3"
          data-state-surface
          data-achievement-state={achievementState}
          data-achievement-filter={filter}
          data-achievement-panel={panel}
          data-earned-count={earnedCount}
          data-total-count={totalCount}
          data-completion-percent={completionPercent}
          data-domain-count={DOMAIN_COVERAGE.length}
          data-domain-earned-total={coverageTotal}
          aria-busy={achievementState === 'skeleton' || undefined}
        >
          <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{status}</p>

          {achievementState === 'skeleton' ? (
            <AchievementSkeleton />
          ) : (
            <>
              {achievementState === 'error' && (
                <div className="surface-warm flex items-start gap-3 p-4" role="alert">
                  <AlertTriangle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] leading-5 text-paper-100/80">Couldn’t load the latest summary. Showing cached achievements from 11 Jul 2026. This is a local error fixture; no network request failed.</p>
                    <button type="button" data-achievement-retry className="focus-ring mt-3 inline-flex min-h-11 items-center gap-2 rounded-pill px-3 text-[13px] font-semibold text-brand-orange" onClick={() => { setAchievementState('default'); setStatus('Cached gallery fixture restored. No network request occurred.') }}>
                      <RefreshCw aria-hidden="true" className="h-4 w-4" />Retry local fixture
                    </button>
                  </div>
                </div>
              )}

              {achievementState === 'offline' && (
                <div className="glass-pill flex items-start gap-3 px-4 py-3" role="status">
                  <WifiOff aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-paper-100/70" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] leading-5 text-paper-100/80">You’re offline — showing cached achievements from 11 Jul 2026. This preview did not inspect your connection.</p>
                    <p id="achievement-refresh-disabled-reason" className="mt-1 text-[12px] leading-4 text-paper-100/70">Refresh is unavailable because this preview has no connection or sync capability.</p>
                    <button type="button" disabled aria-describedby="achievement-refresh-disabled-reason" className="mt-2 min-h-11 rounded-pill px-3 text-[12px] font-semibold text-paper-100/45">Refresh unavailable</button>
                  </div>
                </div>
              )}

              {achievementState === 'success' && (
                <div className="flex items-start gap-3 rounded-2xl border border-forest-green/35 bg-forest-green/10 px-4 py-3" role="status">
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-forest-green" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] leading-5 text-paper-100">Career Compass is highlighted as a {SUCCESS_ACHIEVEMENT.rarity} arrival within the bundled set of 47. No award or sync occurred.</p>
                    <div className="mt-2"><RarityMark rarity={SUCCESS_ACHIEVEMENT.rarity} /></div>
                    <button type="button" className="focus-ring mt-2 min-h-11 rounded-pill px-3 text-[12px] font-semibold text-paper-100/80" onClick={() => { setAchievementState('default'); setStatus('New-arrival highlight dismissed. The bundled achievement data is unchanged.') }}>Dismiss highlight</button>
                  </div>
                </div>
              )}

              <GlassCard tone="you" className="p-4">
                <div className="flex items-center gap-4">
                  <CompletionRing earned={earnedCount} total={totalCount} />
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-paper-100/70">Total earned</p>
                    <p className="mt-1 text-[26px] font-semibold leading-8 tabular-nums text-paper-100">{earnedCount} / {totalCount}</p>
                    <p className="mt-1 text-[13px] text-paper-100/75">{completionPercent}% complete</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-[12px] text-paper-100/70">This month</p>
                    <p className="mt-1 text-[24px] font-semibold tabular-nums text-paper-100">{firstUse ? 0 : 12}</p>
                    {!firstUse && <p className="text-[12px] font-semibold tabular-nums text-forest-green">+3 earned</p>}
                  </div>
                </div>
                <div className="mt-4 border-t border-white/10 pt-4">
                  {firstUse ? (
                    <>
                      <p className="text-[13px] font-medium text-paper-100">Your streak starts today</p>
                      <p className="mt-1 text-[12px] leading-4 text-paper-100/70">No achievement streak is inferred before your first earned item.</p>
                      <div className="mt-3 h-2 overflow-hidden rounded-pill bg-white/[0.08]" role="progressbar" aria-label="Achievement streak progress 0 percent" aria-valuemin={0} aria-valuemax={100} aria-valuenow={0} />
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-[13px] font-medium text-paper-100">18-day Achievement streak</p>
                        <p className="text-[12px] tabular-nums text-paper-100/70">42 days to legend</p>
                      </div>
                      <div className="mt-3 h-2 overflow-hidden rounded-pill bg-white/[0.08]" role="progressbar" aria-label="18 of 60 days toward the Achievement legend" aria-valuemin={0} aria-valuemax={60} aria-valuenow={18}>
                        <div className="h-full w-[30%] rounded-pill bg-brand-orange" />
                      </div>
                    </>
                  )}
                </div>
                <div className="mt-4 [&_span]:!text-[12px]"><Provenance items={[firstUse ? 'First-use fixture' : 'Balencia summary', achievementState === 'offline' || achievementState === 'error' ? 'Cached 11 Jul 2026' : 'Bundled 11 Jul 2026']} /></div>
              </GlassCard>

              <SolidCard className="p-3">
                <h2 className="px-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-paper-100/70">Ten-domain coverage</h2>
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1 hide-scrollbar" aria-label={`Achievement coverage across ten domains totals ${coverageTotal}`}>
                  {DOMAIN_COVERAGE.map(domain => (
                    <div key={domain.name} data-achievement-domain={domain.name.toLowerCase()} data-domain-earned={firstUse ? 0 : domain.count} className={cx('flex min-h-14 w-24 shrink-0 items-center gap-2 rounded-xl border bg-white/[0.03] px-3', domain.borderClass)}>
                      <span className={cx('h-2.5 w-2.5 shrink-0 rounded-full', domain.dotClass)} aria-hidden="true" />
                      <span className="min-w-0">
                        <span className="block truncate text-[12px] font-medium text-paper-100/75">{domain.name}</span>
                        <span className="block text-[14px] font-semibold tabular-nums text-paper-100">{firstUse ? 0 : domain.count}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </SolidCard>

              <div ref={filterScrollerRef} className="-mx-4 flex gap-2 overflow-x-auto px-4 hide-scrollbar" role="group" aria-label="Filter achievements by domain">
                {ACHIEVEMENT_FILTERS.map(item => {
                  const selected = filter === item
                  return (
                    <button
                      key={item}
                      type="button"
                      data-achievement-filter-control={item}
                      aria-pressed={selected}
                      className={cx(
                        'focus-ring inline-flex min-h-11 shrink-0 items-center gap-2 rounded-pill border px-4 text-[13px] font-semibold',
                        selected ? 'border-brand-orange bg-brand-orange/15 text-paper-100' : 'border-white/15 bg-white/[0.04] text-paper-100/75',
                      )}
                      onClick={() => selectFilter(item)}
                    >
                      {selected && <Check data-selected-marker aria-hidden="true" className="h-4 w-4" strokeWidth={2.5} />}
                      {FILTER_LABELS[item]}
                    </button>
                  )
                })}
              </div>

              {filteredAchievements.length === 0 ? (
                <section className="surface-warm py-10 text-center" aria-labelledby="empty-achievement-filter-title">
                  <Sparkles aria-hidden="true" className="mx-auto h-7 w-7 text-domain-meditation" />
                  <h2 id="empty-achievement-filter-title" className="mt-3 text-[17px] font-semibold text-paper-100">No {FILTER_LABELS[filter]} achievements yet</h2>
                  <p className="mx-auto mt-2 max-w-[260px] text-[13px] leading-5 text-paper-100/70">Choose another domain. This filter does not change the {firstUse ? '0 of 120 first-use summary' : '47 of 120 earned summary'}.</p>
                </section>
              ) : (
                <section aria-labelledby="achievement-grid-title">
                  <div className="flex min-h-11 items-center justify-between gap-3 px-1">
                    <h2 id="achievement-grid-title" className="text-[12px] font-semibold uppercase tracking-[0.08em] text-paper-100/70">Achievement gallery</h2>
                    <span className="text-[12px] text-paper-100/65">{firstUse ? 'To discover' : 'Earned first'}</span>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-3" data-visible-achievement-count={filteredAchievements.length}>
                    {filteredAchievements.map(achievement => (
                      <AchievementTile
                        key={achievement.id}
                        achievement={achievement}
                        status={firstUse ? 'to-discover' : achievement.status}
                        isNew={achievementState === 'success' && achievement.id === SUCCESS_ACHIEVEMENT.id}
                        onOpen={openAchievement}
                      />
                    ))}
                  </div>
                </section>
              )}

              <section className="surface-warm p-4" aria-labelledby="achievement-data-controls-title">
                <h2 id="achievement-data-controls-title" className="text-[12px] font-semibold uppercase tracking-[0.08em] text-paper-100/70">Achievement data controls</h2>
                <p className="mt-2 text-[12px] leading-5 text-paper-100/70">These eight buttons preview local control outcomes. No achievement, source, export, history, storage, or network state changes here.</p>
                <div className="mt-3 grid grid-cols-2 gap-2" role="group" aria-label="Achievement data controls">
                  {DATA_CONTROLS.map(control => {
                    const selected = selectedControl === control
                    return (
                      <button
                        key={control}
                        type="button"
                        data-data-control={control.toLowerCase()}
                        aria-pressed={selected}
                        className={cx('focus-ring flex min-h-11 items-center justify-center gap-2 rounded-pill border px-3 text-center text-[12px] font-medium', selected ? 'border-brand-orange bg-brand-orange/15 text-paper-100' : 'border-white/10 bg-white/[0.03] text-paper-100/75')}
                        onClick={() => {
                          setSelectedControl(control)
                          setStatus(`${control} selected for this local Achievement preview. No source, account, file, permission, history, or network state changed.`)
                        }}
                      >
                        {selected && <Check data-selected-marker aria-hidden="true" className="h-4 w-4" />}
                        {control}
                      </button>
                    )
                  })}
                </div>
              </section>
            </>
          )}
        </main>
      </HifiShell>
    </div>
  )
}
