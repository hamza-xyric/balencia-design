import Link from 'next/link'
import { ArrowUp, Flame } from 'lucide-react'
import { Card } from '@/components/design-system/Card'
import { DomainTag } from '@/components/design-system/DomainTag'
import { SegmentedControl } from '@/components/design-system/SegmentedControl'
import { LeaderboardRow } from '@/components/domain/LeaderboardRow'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { leaderboard, leaderboardOwnRank } from '@/data/mock'

// Screen 39 of 78: Leaderboard
// Spec: /Users/hamza/yHealth/app_design 3/39-leaderboard.md

function OwnRankCard() {
  return (
    <Link href="/tabs/me/rpg" className="block animate-fade-up" style={{ animationDelay: '160ms' }}>
      <Card variant="small" className="rounded-lg border-brand-orange/40 p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="text-[24px] font-bold leading-8 text-white tabular-nums">
            #{leaderboardOwnRank.rank}
          </div>
          <div className="inline-flex items-center gap-1 text-caption font-semibold leading-[18px] text-forest-green">
            <ArrowUp size={14} strokeWidth={2.2} />
            3 this week
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-pill bg-brand-orange text-[16px] font-semibold text-white">
            {leaderboardOwnRank.avatar}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[16px] font-semibold leading-[22px] text-white">
              {leaderboardOwnRank.name}
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span className="rounded-pill border border-brand-orange bg-ink-900 px-2 py-1 text-caption font-semibold leading-[18px] text-brand-orange">
                Lv. {leaderboardOwnRank.level}
              </span>
              <DomainTag domain={leaderboardOwnRank.topDomain} showDot={false} />
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-4 text-caption leading-[18px] text-white/70">
          <span className="tabular-nums">{leaderboardOwnRank.xp.toLocaleString()} XP</span>
          <span className="inline-flex items-center gap-1 text-white/60">
            <Flame size={14} className="text-brand-orange" strokeWidth={2.2} />
            {leaderboardOwnRank.streak}-day streak
          </span>
        </div>
      </Card>
    </Link>
  )
}

function FilterToggle() {
  return (
    <div className="mt-3 flex h-8 items-start gap-6 animate-fade-up" style={{ animationDelay: '240ms' }}>
      <button type="button" className="relative h-8 text-[14px] font-semibold leading-5 text-white">
        Global
        <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-pill bg-brand-orange" aria-hidden="true" />
      </button>
      <button type="button" className="h-8 text-[14px] font-semibold leading-5 text-white/50">
        Friends
      </button>
    </div>
  )
}

export default function LeaderboardScreen() {
  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Leaderboard" showBack />} activeTab="me">
        <main className="px-4 pb-20 pt-4">
          <SegmentedControl
            options={[
              { label: 'Global', value: 'global' },
              { label: 'Competitions', value: 'competitions' },
              { label: 'Country', value: 'country' },
            ]}
            activeValue="global"
            className="animate-fade-up"
            size="md"
          />

          <SegmentedControl
            options={[
              { label: 'This week', value: 'week' },
              { label: 'This month', value: 'month' },
              { label: 'All time', value: 'all-time' },
            ]}
            activeValue="week"
            className="mt-3 animate-fade-up"
            size="md"
          />

          <section className="mt-4">
            <OwnRankCard />
          </section>

          <FilterToggle />

          <section className="mt-3 animate-fade-up" style={{ animationDelay: '320ms' }}>
            <Card variant="small" className="rounded-lg p-0">
              {leaderboard.map((entry, index) => (
                <LeaderboardRow
                  key={`${entry.rank}-${entry.name}`}
                  rank={entry.rank}
                  name={entry.name}
                  avatar={entry.avatar}
                  level={entry.level}
                  xp={entry.xp}
                  topDomain={entry.topDomain}
                  withDivider={index > 0}
                />
              ))}
            </Card>
          </section>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
