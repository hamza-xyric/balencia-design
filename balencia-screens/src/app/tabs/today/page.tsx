'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Check, ChevronRight, Footprints, HeartPulse, Moon } from 'lucide-react'
import { MomentumBar } from '@/components/charts/MomentumBar'
import { DomainTag } from '@/components/design-system/DomainTag'
import { LevelBadge } from '@/components/design-system/LevelBadge'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { ActionCard } from '@/components/screens/ActionCard'
import { LifeBalanceCard } from '@/components/screens/LifeBalanceCard'
import { MetricCard } from '@/components/screens/MetricCard'
import { MissionCard } from '@/components/screens/MissionCard'
import { QuickActionsRow } from '@/components/screens/QuickActionsRow'
import { ScheduleItem } from '@/components/screens/ScheduleItem'
import { SectionHeader } from '@/components/screens/SectionHeader'
import { SIACoachingNote } from '@/components/screens/SIACoachingNote'
import {
  domainProgress,
  domainStats,
  healthMetrics,
  homeBalanceRead,
  homeInsight,
  homeMoodChips,
  missions,
  quickActions,
  recentActivity,
  schedule,
  todayActions,
  user,
} from '@/data/mock'

// Screen 12 of 78: Home screen
// Spec: app_design 3/12-home-screen.md (## Premium Craft + ## Visualization)

const metricMeta = {
  'heart-rate': { icon: HeartPulse, label: 'Heart rate' },
  steps: { icon: Footprints, label: 'Steps' },
  sleep: { icon: Moon, label: 'Sleep' },
} as const

function HomeHeader() {
  return (
    <header className="z-30 flex h-[64px] shrink-0 items-center justify-between bg-ink-900/80 px-4 backdrop-blur-[16px]">
      <div>
        <h1 className="text-h2 font-semibold leading-[var(--leading-snug)] text-white">
          Good morning, {user.firstName}
        </h1>
        <p className="mt-1 text-caption leading-[var(--leading-normal)] text-white/50">
          Tuesday, May 20
        </p>
      </div>
      <Link
        href="/tabs/me/rpg"
        className="focus-ring rounded-pill"
        aria-label={`Level ${user.level}, view RPG character`}
      >
        <LevelBadge level={user.level} />
      </Link>
    </header>
  )
}

function InsightCard({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="focus-ring block w-full rounded-xl border border-white/[0.06] border-t-2 border-t-brand-orange bg-ink-brown-800 p-6 text-left transition-transform duration-[var(--dur-fast)] active:scale-[0.98]"
      style={{ boxShadow: 'var(--edge-highlight), var(--shadow-1)' }}
      aria-label="Open SIA insight conversation"
    >
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-eyebrow font-semibold uppercase tracking-[var(--tracking-eyebrow)] text-brand-orange">
            {homeInsight.eyebrow}
          </p>
          <p className="mt-2 text-body leading-[var(--leading-normal)] text-white/90">
            {homeInsight.text}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {homeInsight.domains.map((domain) => (
              <DomainTag key={domain} domain={domain} />
            ))}
          </div>
        </div>
        <ChevronRight size={16} className="mt-1 shrink-0 text-white/40" strokeWidth={1.8} />
      </div>
    </button>
  )
}

function AllDoneState() {
  return (
    <div className="surface-warm flex flex-col items-center px-6 py-8 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-green">
        <Check size={24} className="text-white" strokeWidth={2.4} aria-hidden="true" />
      </span>
      <p className="mt-4 text-h3 font-semibold leading-[var(--leading-snug)] text-white">
        Nothing left today
      </p>
      <p className="mt-1 text-body leading-[var(--leading-normal)] text-white/50">
        Rest, explore, or add more.
      </p>
      <p className="mt-2 text-caption leading-[var(--leading-normal)] text-white/70">
        Solid day. You earned it.
      </p>
    </div>
  )
}

function ActivityFeed({
  expanded,
  onToggle,
}: {
  expanded: boolean
  onToggle: () => void
}) {
  const visibleItems = expanded ? recentActivity : recentActivity.slice(0, 2)

  return (
    <div className="space-y-2">
      {visibleItems.map((item) => (
        <div key={item.id} className="flex h-9 items-center gap-2">
          <span className="w-[58px] shrink-0 text-small font-semibold leading-[14px] text-brand-orange tabular-nums">
            +{item.xp} XP
          </span>
          <span className="min-w-0 flex-1 truncate text-[14px] leading-[var(--leading-normal)] text-white/70">
            {item.description}
          </span>
          <span className="text-[12px] leading-4 text-white/30">{item.timestamp}</span>
        </div>
      ))}
      {expanded && (
        <div className="rounded-md border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-caption leading-[var(--leading-normal)] text-white/50">
          Full activity history is shown for this prototype session. Older entries load here before SIA uses them in coaching.
        </div>
      )}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="focus-ring mt-1 min-h-11 rounded-md text-[14px] font-semibold leading-[18px] text-brand-orange"
      >
        {expanded ? 'Show less' : 'View all'}
      </button>
    </div>
  )
}

export default function HomeScreen() {
  const router = useRouter()
  const [actions, setActions] = useState(todayActions)
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [expandedAction, setExpandedAction] = useState<string | null>(null)
  const [activityExpanded, setActivityExpanded] = useState(false)
  const [toast, setToast] = useState('')
  const visibleActions = actions.slice(0, 3)
  const completedCount = actions.filter((action) => action.completed).length
  const earnedXp = actions.filter((action) => action.completed).reduce((sum, action) => sum + action.xp, 0)
  const allDone = completedCount === actions.length
  const pinnedMissions = missions.filter((mission) => mission.pinned).slice(0, 2)
  const upcomingSchedule = schedule.slice(1, 4)
  const quickRoutes = {
    breathe: '/features/breathing',
    water: '/tabs/today/water-intake',
    journal: '/features/journal',
    'check-in': '/tabs/today/daily-checkin',
    'quick-note': '/features/quick-notes',
  }
  const metricRoutes = {
    'heart-rate': '/domains/fitness',
    steps: '/domains/fitness',
    sleep: '/features/sleep',
  }

  const toggleAction = (id: string) => {
    setActions((current) => current.map((action) => action.id === id ? { ...action, completed: !action.completed } : action))
    const action = actions.find((item) => item.id === id)
    setToast(action?.completed ? 'Action reopened.' : `Completed ${action?.name}. +${action?.xp} XP`)
    window.setTimeout(() => setToast(''), 2200)
  }

  return (
    <PhoneFrame>
      <ScreenShell header={<HomeHeader />} activeTab="today">
        <main className="px-4 pb-16 pt-4">
          <div className="animate-fade-up">
            <SIACoachingNote
              message="You followed through yesterday. What's worth your attention today?"
              moodChips={homeMoodChips}
              selectedMood={selectedMood}
              onMoodSelect={(label) => {
                setSelectedMood(label)
                setToast(`Mood captured: ${label}`)
                window.setTimeout(() => setToast(''), 2000)
              }}
            />
          </div>

          {/* S12-V01 — Life Balance hero (the one focal point above the fold) */}
          <div className="mt-4 animate-fade-up" style={{ animationDelay: '80ms' }}>
            <LifeBalanceCard
              stats={domainStats}
              progress={domainProgress}
              lifePower={user.lifePower}
              siaRead={homeBalanceRead}
              onOpen={() => router.push('/tabs/me/life-areas')}
            />
          </div>

          {/* S12-V02 — Metric cards with status sign + Living-Line sparkline */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            {healthMetrics.map((metric, index) => {
              const meta = metricMeta[metric.id]
              return (
                <div key={metric.id} className="animate-fade-up" style={{ animationDelay: `${160 + index * 80}ms` }}>
                  <MetricCard
                    icon={meta.icon}
                    label={meta.label}
                    value={metric.value}
                    unit={metric.unit}
                    trend={metric.trend}
                    status={metric.status}
                    milestone={metric.milestone}
                    onClick={() => router.push(metricRoutes[metric.id])}
                    className="w-full"
                  />
                </div>
              )
            })}
          </div>

          <div className="mt-3 animate-fade-up" style={{ animationDelay: '400ms' }}>
            <QuickActionsRow actions={quickActions} onAction={(id) => router.push(quickRoutes[id])} />
          </div>

          {toast && (
            <div className="mt-3 rounded-md border border-forest-green/25 bg-forest-green/10 px-4 py-3 text-caption font-semibold leading-[var(--leading-normal)] text-forest-green" role="status">
              {toast}
            </div>
          )}

          <section className="mt-8">
            <SectionHeader title="Today's actions" />
            {/* S12-V03 — MomentumBar: continuous orange→green, non-shaming */}
            <MomentumBar
              className="mb-4"
              value={completedCount}
              max={actions.length}
              caption={`${completedCount} of ${actions.length} · +${earnedXp} XP`}
            />
            {allDone ? (
              <AllDoneState />
            ) : (
              <div className="space-y-3">
                {visibleActions.map((action, index) => (
                  <ActionCard
                    key={action.id}
                    action={action}
                    expanded={expandedAction === action.id}
                    onOpen={() => setExpandedAction((current) => current === action.id ? null : action.id)}
                    onToggleComplete={() => toggleAction(action.id)}
                    className="animate-fade-up"
                    style={{ animationDelay: `${240 + index * 80}ms` }}
                  />
                ))}
              </div>
            )}
          </section>

          <section className="mt-8">
            <SectionHeader
              title="Pinned missions"
              action={
                <a href="/tabs/goals" className="focus-ring inline-flex min-h-11 items-center rounded-md text-caption font-semibold leading-[18px] text-brand-orange">
                  View all missions
                </a>
              }
            />
            <div className="space-y-3">
              {pinnedMissions.map((mission, index) => (
                <Link
                  key={mission.id}
                  href={`/tabs/goals/detail?mission=${mission.id}&source=today`}
                  className="focus-ring block rounded-xl"
                  aria-label={`Open mission details for ${mission.name}`}
                >
                  <MissionCard
                    mission={mission}
                    className="animate-fade-up"
                    style={{ animationDelay: `${480 + index * 80}ms` }}
                  />
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-8">
            <SectionHeader title="Coming up" />
            <div
              className="rounded-xl border border-white/[0.06] bg-ink-brown-800 px-6 py-3"
              style={{ boxShadow: 'var(--edge-highlight), var(--shadow-1)' }}
            >
              {upcomingSchedule.map((event) => (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => router.push('/tabs/today/schedule')}
                  className="focus-ring block w-full rounded-md text-left"
                  aria-label={`Open schedule item ${event.name}`}
                >
                  <ScheduleItem event={event} />
                </button>
              ))}
            </div>
          </section>

          <div className="mt-8 animate-fade-up">
            <InsightCard onOpen={() => router.push('/tabs/sia')} />
          </div>

          <section className="mt-8">
            <SectionHeader title="Recent activity" />
            <ActivityFeed expanded={activityExpanded} onToggle={() => setActivityExpanded((current) => !current)} />
          </section>

          <div className="h-4" />
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
