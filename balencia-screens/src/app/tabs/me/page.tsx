import Link from 'next/link'
import {
  Bell,
  BookOpen,
  Camera,
  Flame,
  HelpCircle,
  Images,
  Link2,
  NotebookTabs,
  Settings,
  Shield,
  Star,
  Trophy,
} from 'lucide-react'
import { MomentumBar } from '@/components/charts/MomentumBar'
import { StatBar } from '@/components/charts/StatBar'
import { CountUp } from '@/components/CountUp'
import { LevelBadge } from '@/components/design-system/LevelBadge'
import { Eyebrow } from '@/components/design-system/Eyebrow'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { ModuleCard } from '@/components/screens/ModuleCard'
import { StatTile } from '@/components/screens/StatTile'
import { domainDashboardRoutes } from '@/data/domains'
import { domainStats, missionsCompleted, suggestedModules, type ExploreModule, user } from '@/data/mock'

// Screen 17 of 78: Me main
// Spec: /Users/hamza/yHealth/app_design 3/17-me-main.md

const quickLinks = [
  { label: 'RPG character', subtitle: 'Lv.14 explorer', route: '/tabs/me/rpg', Icon: Shield },
  { label: 'Mission journal', subtitle: '14 completed', route: '/tabs/goals/journal?source=me', Icon: NotebookTabs },
  { label: 'Book of life', subtitle: 'What SIA knows', route: '/tabs/me/personal-wiki', Icon: BookOpen },
  { label: 'Connected apps', subtitle: '3 connected', route: '/tabs/me/connected-services', Icon: Link2 },
  { label: 'Subscription', subtitle: 'Plus plan', route: '/tabs/me/subscription', Icon: Star },
  { label: 'Progress photos', subtitle: '12 entries', route: '/tabs/me/progress-photos', Icon: Images },
  { label: 'Streaks', subtitle: '42 days', route: '/tabs/goals/streaks', Icon: Flame, orange: true },
  { label: 'Achievements', subtitle: '47 earned', route: '/tabs/me/achievements', Icon: Trophy, new: true },
  { label: 'Notifications', subtitle: '12 new', route: '/tabs/me/notifications', Icon: Bell, unread: true },
  { label: 'Help center', subtitle: 'FAQ and guides', route: '/tabs/me/help', Icon: HelpCircle },
]

const userTier = 'Plus'

function isLocked(module: ExploreModule) {
  return module.lockedTier === 'Pro' || (module.lockedTier === 'Plus' && userTier !== 'Plus')
}

function moduleForTier(module: ExploreModule) {
  if (userTier === 'Plus' && module.lockedTier === 'Plus') return { ...module, lockedTier: undefined }
  if (isLocked(module)) return { ...module, route: '/features/paywall' }
  return module
}

function ProfileSection() {
  return (
    <section className="flex flex-col items-center pt-4 text-center">
      <Link href="/tabs/me/profile-edit" className="focus-ring relative block rounded-full">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/20 bg-ink-brown-800 text-[24px] font-bold text-white shadow-1">
          {user.avatar}
        </div>
        <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-ink-brown-800 text-white/80">
          <Camera size={14} strokeWidth={1.8} />
        </span>
      </Link>

      <h1 className="mt-3 text-h2 font-semibold leading-[var(--leading-snug)] text-white">{user.name}</h1>
      <Link href="/tabs/me/rpg" className="focus-ring mt-2 flex min-h-11 items-center justify-center rounded-pill px-3" aria-label={`Level ${user.level}, view RPG character`}>
        <LevelBadge level={user.level} />
      </Link>

      {/* XP as the Living-Line bar (the one focal viz on this hub) */}
      <div className="mt-3 w-[calc(100%-64px)]">
        <MomentumBar
          value={user.currentLevelXP}
          max={user.nextLevelXP}
          showPercent={false}
          aria-label={`${user.currentLevelXP.toLocaleString()} of ${user.nextLevelXP.toLocaleString()} XP to level ${user.level + 1}`}
        />
        <div className="mt-1 text-right text-[12px] leading-4 text-white/50">
          {user.currentLevelXP.toLocaleString()} / {user.nextLevelXP.toLocaleString()} XP
        </div>
      </div>

      <p className="mt-2 text-[13px] leading-[18px] text-white/40">Member since May 2026</p>
    </section>
  )
}

function LifePowerComposition() {
  const top = [...domainStats].sort((a, b) => b.stat - a.stat).slice(0, 5)

  return (
    <section className="surface-warm p-5">
      <Eyebrow>Life Power is made of</Eyebrow>
      <div className="mt-3 space-y-3">
        {top.map((stat) => (
          <Link key={stat.domain} href={domainDashboardRoutes[stat.domain]} className="focus-ring block rounded-md">
            <StatBar domain={stat.domain} value={stat.stat} tone="orange" size="compact" />
          </Link>
        ))}
      </div>
      <Link href="/tabs/me/rpg" className="focus-ring mt-3 inline-flex min-h-11 items-center rounded-md text-caption font-semibold leading-[18px] text-brand-orange">
        See all 10 areas
      </Link>
    </section>
  )
}

function StatsRow() {
  return (
    <Link
      href="/tabs/me/rpg"
      className="focus-ring flex h-20 items-center rounded-lg border border-white/[0.06] bg-ink-brown-800 p-4 transition-transform duration-[var(--dur-fast)] active:scale-[0.97]"
      style={{ boxShadow: 'var(--edge-highlight), var(--shadow-1)' }}
      aria-label="Open RPG character"
    >
      <StatTile value={user.currentStreak} label="Day streak" />
      <StatTile value={missionsCompleted} label="Completed" />
      <StatTile
        value={<span className="inline-flex items-center justify-center gap-1"><span className="text-brand-orange">◆</span><CountUp value={user.lifePower} durationMs={520} /></span>}
        label="Life Power"
      />
      <StatTile value={user.totalXP.toLocaleString()} label="Total XP" />
    </Link>
  )
}

function QuickLinksGrid() {
  return (
    <section className="grid grid-cols-2 gap-3">
      {quickLinks.map(({ label, subtitle, route, Icon, orange, unread, new: isNew }, index) => (
        <Link
          key={label}
          href={route}
          className="focus-ring relative flex min-h-[72px] flex-col rounded-md border border-white/[0.06] bg-ink-brown-800 p-4 transition-transform duration-[var(--dur-fast)] active:scale-[0.97] animate-fade-up"
          style={{ boxShadow: 'var(--edge-highlight), var(--shadow-1)', animationDelay: `${220 + index * 45}ms` }}
        >
          <Icon size={22} className={orange ? 'text-brand-orange' : 'text-white/70'} strokeWidth={1.8} />
          <span className="mt-2 text-[15px] font-semibold leading-5 text-white">{label}</span>
          <span className="mt-1 truncate text-[13px] leading-[18px] text-white/40">{subtitle}</span>
          {unread && <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-brand-orange" aria-hidden="true" />}
          {isNew && <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-forest-green" aria-hidden="true" />}
        </Link>
      ))}
    </section>
  )
}

function ExplorePreview() {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <Eyebrow>Suggested for you</Eyebrow>
        <Link href="/tabs/me/explore" className="focus-ring flex min-h-11 items-center rounded-md px-1 text-[14px] font-semibold leading-[18px] text-brand-orange">
          See all
        </Link>
      </div>
      <div className="-mx-4 overflow-x-auto px-4 pb-2 hide-scrollbar">
        <div className="flex gap-3">
          {suggestedModules.map((module, index) => (
            <ModuleCard
              key={module.id}
              module={moduleForTier(module)}
              variant="suggested"
              className="animate-fade-up"
              style={{ animationDelay: `${700 + index * 60}ms` }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function MeMainScreen() {
  return (
    <PhoneFrame>
      <ScreenShell activeTab="me">
        <main className="relative px-4 pb-16 pt-2">
          <Link
            href="/tabs/me/settings"
            className="focus-ring absolute right-2 top-2 z-10 flex h-11 w-11 items-center justify-center rounded-full text-white/60 transition-transform duration-[var(--dur-fast)] active:scale-90"
            aria-label="Settings"
          >
            <Settings size={22} strokeWidth={1.8} />
          </Link>

          <div className="animate-fade-up">
            <ProfileSection />
          </div>

          <div className="mt-6 animate-fade-up" style={{ animationDelay: '100ms' }}>
            <StatsRow />
          </div>

          <div className="mt-4 animate-fade-up" style={{ animationDelay: '160ms' }}>
            <LifePowerComposition />
          </div>

          <div className="mt-6">
            <QuickLinksGrid />
          </div>

          <div className="mt-8">
            <ExplorePreview />
          </div>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
