import Link from 'next/link'
import { Check, ChevronRight, Flame, Snowflake } from 'lucide-react'
import { Card } from '@/components/design-system/Card'
import { domainToneClasses } from '@/components/design-system/Chip'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { DomainSkillCard } from '@/components/screens/DomainSkillCard'
import { LifePowerDisplay } from '@/components/screens/LifePowerDisplay'
import { MissionTypeBadge } from '@/components/screens/MissionTypeBadge'
import { StatTile } from '@/components/screens/StatTile'
import { completedMissions, domainStats, missions, user } from '@/data/mock'

// Screen 19 of 78: RPG character
// Spec: /Users/hamza/yHealth/app_design 3/19-rpg-character-screen.md

function CharacterCard() {
  const progress = Math.max(0, Math.min(user.currentLevelXP / user.nextLevelXP, 1))

  return (
    <Card className="min-h-[258px] px-6 py-7 text-center animate-fade-up">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-[3px] border-brand-orange/50 bg-ink-900 text-[30px] font-bold text-white shadow-[var(--glow-orange)]">
        {user.avatar}
      </div>
      <h1 className="mt-3 text-h2 font-semibold leading-[26px] text-white">{user.name}</h1>
      <div className="mt-2 flex items-center justify-center gap-1.5 text-[16px] font-bold leading-[22px] text-white">
        <span className="text-brand-orange" aria-hidden="true">◆</span>
        Level {user.level}
      </div>
      <p className="mt-1 text-[14px] leading-[18px] text-white/50">{user.title}</p>

      <div className="mx-auto mt-6 w-[calc(100%-48px)]">
        <div className="h-2 overflow-hidden rounded-pill bg-white/[0.08]">
          <div className="h-full rounded-pill bg-brand-orange" style={{ width: `${progress * 100}%` }} />
        </div>
        <p className="mt-2 text-[12px] leading-4 text-white/50">
          {user.currentLevelXP.toLocaleString()} / {user.nextLevelXP.toLocaleString()} XP to level {user.level + 1}
        </p>
      </div>
    </Card>
  )
}

function StatsSummary() {
  return (
    <div className="flex h-20 items-center rounded-lg border border-white/[0.06] bg-ink-brown-800 p-4 shadow-1 animate-fade-up">
      <StatTile value={user.currentStreak} label="Day streak" />
      <StatTile value={completedMissions.length + 8} label="Missions done" />
      <StatTile value={missions.length} label="Active missions" />
      <StatTile value={user.lifePower} label="Life Power" />
    </div>
  )
}

function StreakRewards() {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '620ms' }}>
      <h2 className="mb-3 text-eyebrow font-semibold uppercase tracking-[0.12em] text-white/50">
        Streak & rewards
      </h2>
      <Card variant="small">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Flame size={20} className="text-brand-orange" strokeWidth={2} />
              <span className="text-[24px] font-bold leading-[30px] text-white tabular-nums">
                {user.currentStreak}
              </span>
              <span className="text-[12px] leading-4 text-white/50">Days</span>
            </div>
            <div className="mt-2 inline-flex h-7 items-center rounded-pill bg-brand-orange/15 px-3 text-[13px] font-semibold leading-[18px] text-brand-orange">
              {user.streakMultiplier.toFixed(1)}x XP
            </div>
          </div>

          <div className="flex items-center gap-1.5 pt-1 text-[13px] font-semibold leading-[18px] text-white">
            <Snowflake size={16} className="text-freeze-blue" strokeWidth={1.8} />
            2 freezes
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          {['7d', '30d', 'Fit'].map((reward, index) => (
            <span
              key={reward}
              className={[
                'flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold text-white',
                index === 0 ? 'bg-brand-orange' : index === 1 ? 'bg-forest-green' : 'bg-domain-fitness',
              ].join(' ')}
            >
              {reward}
            </span>
          ))}
          <Link href="/tabs/goals/streaks" className="ml-auto text-[13px] font-semibold leading-[18px] text-brand-orange">
            View all
          </Link>
        </div>
      </Card>
    </section>
  )
}

function MissionHistory() {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '700ms' }}>
      <h2 className="mb-2 text-eyebrow font-semibold uppercase tracking-[0.12em] text-white/50">
        Mission history
      </h2>
      <div>
        {completedMissions.map((mission) => (
          <Link
            key={mission.id}
            href="/tabs/goals/detail"
            className="flex min-h-16 items-center gap-3 border-b border-white/[0.05] py-3 transition-colors duration-[var(--dur-fast)] last:border-b-0 active:bg-ink-brown-800"
          >
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest-green text-white">
              <Check size={12} strokeWidth={2.4} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[15px] font-semibold leading-5 text-white">{mission.name}</div>
              <div className="mt-1 flex min-w-0 items-center gap-1.5 overflow-hidden">
                <MissionTypeBadge type={mission.type} className="h-5 px-2 text-[10px]" />
                {mission.domains.slice(0, 2).map((domain) => (
                  <span key={domain} className={`h-1.5 w-1.5 shrink-0 rounded-full ${domainToneClasses[domain].dot}`} aria-hidden="true" />
                ))}
                <span className="truncate text-[12px] leading-4 text-white/40">{mission.completedAt}</span>
              </div>
            </div>
            <span className="shrink-0 text-[14px] font-semibold leading-[18px] text-forest-green tabular-nums">
              +{mission.xpEarned} XP
            </span>
          </Link>
        ))}
      </div>
      <Link href="/tabs/goals/journal" className="mt-2 flex h-11 items-center justify-end gap-1 text-[15px] font-semibold leading-5 text-brand-orange">
        View full journal
        <ChevronRight size={14} className="text-white/40" strokeWidth={2} />
      </Link>
    </section>
  )
}

export default function RpgCharacterScreen() {
  const sortedStats = [...domainStats].sort((a, b) => b.stat - a.stat)

  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Your character" showBack />} activeTab="me">
        <main className="px-4 pb-16 pt-3">
          <CharacterCard />

          <LifePowerDisplay
            value={user.lifePower}
            layout="inline"
            className="mt-4 animate-fade-up"
            style={{ animationDelay: '320ms' }}
          />

          <section className="mt-6">
            <h2 className="mb-3 text-eyebrow font-semibold uppercase tracking-[0.12em] text-white/50">
              Domain skills
            </h2>
            <div className="grid grid-cols-3 gap-2">
              {sortedStats.map((stat, index) => (
                <DomainSkillCard
                  key={stat.domain}
                  stat={stat}
                  className="animate-fade-up"
                  style={{ animationDelay: `${380 + index * 40}ms` }}
                />
              ))}
            </div>
          </section>

          <div className="mt-6 animate-fade-up" style={{ animationDelay: '560ms' }}>
            <StatsSummary />
          </div>

          <StreakRewards />
          <MissionHistory />
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
