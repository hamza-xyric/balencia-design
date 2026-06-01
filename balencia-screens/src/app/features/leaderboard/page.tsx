'use client'

import Link from 'next/link'
import { useState } from 'react'
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

function FilterToggle({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="mt-3 flex min-h-11 items-start gap-3 animate-fade-up" style={{ animationDelay: '240ms' }} role="tablist" aria-label="Leaderboard visibility">
      <button type="button" onClick={() => onChange('global')} aria-pressed={value === 'global'} className={`relative h-11 px-2 text-[14px] font-semibold leading-5 ${value === 'global' ? 'text-white' : 'text-white/50'}`}>
        Global
        {value === 'global' && <span className="absolute bottom-1 left-2 right-2 h-0.5 rounded-pill bg-brand-orange" aria-hidden="true" />}
      </button>
      <button type="button" onClick={() => onChange('friends')} aria-pressed={value === 'friends'} className={`relative h-11 px-2 text-[14px] font-semibold leading-5 ${value === 'friends' ? 'text-white' : 'text-white/50'}`}>
        Friends
        {value === 'friends' && <span className="absolute bottom-1 left-2 right-2 h-0.5 rounded-pill bg-brand-orange" aria-hidden="true" />}
      </button>
    </div>
  )
}

type LeaderboardEntry = (typeof leaderboard)[number]

const scopedEntries: Record<string, LeaderboardEntry[]> = {
  global: leaderboard,
  competitions: [
    { rank: 1, name: 'Maya J.', avatar: 'M', level: 18, xp: 1860, topDomain: 'fitness' },
    { rank: 2, name: 'Sarah K.', avatar: 'S', level: 23, xp: 1810, topDomain: 'fitness' },
    { rank: 3, name: 'Ahmed R.', avatar: 'A', level: 21, xp: 1740, topDomain: 'faith' },
    { rank: 4, name: 'Amira H.', avatar: 'A', level: 14, xp: 1690, topDomain: 'learning' },
  ],
  country: [
    { rank: 1, name: 'Zain A.', avatar: 'Z', level: 24, xp: 3980, topDomain: 'productivity' },
    { rank: 2, name: 'Ayesha N.', avatar: 'A', level: 22, xp: 3720, topDomain: 'learning' },
    { rank: 3, name: 'Omar B.', avatar: 'O', level: 19, xp: 3410, topDomain: 'finance' },
    { rank: 4, name: 'Amira H.', avatar: 'A', level: 14, xp: 2340, topDomain: 'learning' },
  ],
}

const friendEntries: Record<string, LeaderboardEntry[]> = {
  global: [
    { rank: 1, name: 'Sarah K.', avatar: 'S', level: 23, xp: 4120, topDomain: 'fitness' },
    { rank: 2, name: 'Ahmed R.', avatar: 'A', level: 21, xp: 3890, topDomain: 'faith' },
    { rank: 3, name: 'Omar B.', avatar: 'O', level: 19, xp: 3410, topDomain: 'finance' },
  ],
  competitions: [
    { rank: 1, name: 'Sarah K.', avatar: 'S', level: 23, xp: 1810, topDomain: 'fitness' },
    { rank: 2, name: 'Ahmed R.', avatar: 'A', level: 21, xp: 1740, topDomain: 'faith' },
  ],
  country: [
    { rank: 1, name: 'Ayesha N.', avatar: 'A', level: 22, xp: 3720, topDomain: 'learning' },
    { rank: 2, name: 'Omar B.', avatar: 'O', level: 19, xp: 3410, topDomain: 'finance' },
  ],
}

const periodOffset: Record<string, number> = {
  week: 0,
  month: 320,
  'all-time': 1400,
}

function rankingEntries(type: string, visibility: string, period: string, blockedNames: string[]) {
  const source = visibility === 'friends' ? friendEntries[type] : scopedEntries[type]
  return source
    .filter((entry) => !blockedNames.includes(entry.name))
    .map((entry, index) => ({
      ...entry,
      rank: index + 1,
      xp: entry.xp + periodOffset[period],
    }))
}

export default function LeaderboardScreen() {
  const [type, setType] = useState('global')
  const [period, setPeriod] = useState('week')
  const [visibility, setVisibility] = useState('global')
  const [profile, setProfile] = useState<LeaderboardEntry | null>(null)
  const [profileMode, setProfileMode] = useState<'profile' | 'report' | 'reported' | 'block'>('profile')
  const [reportReason, setReportReason] = useState('Harassment or unwanted contact')
  const [blockedNames, setBlockedNames] = useState<string[]>([])
  const [blockedNotice, setBlockedNotice] = useState<string | null>(null)
  const [toast, setToast] = useState('')
  const typeLabel = type === 'global' ? 'Global' : type === 'competitions' ? 'Competitions' : 'Country'
  const periodLabel = period === 'week' ? 'This week' : period === 'month' ? 'This month' : 'All time'
  const visibleEntries = rankingEntries(type, visibility, period, blockedNames)
  const openProfile = (entry: LeaderboardEntry) => {
    setProfile(entry)
    setProfileMode('profile')
    setReportReason('Harassment or unwanted contact')
  }

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
            activeValue={type}
            onValueChange={setType}
            className="animate-fade-up"
            size="md"
          />

          <SegmentedControl
            options={[
              { label: 'This week', value: 'week' },
              { label: 'This month', value: 'month' },
              { label: 'All time', value: 'all-time' },
            ]}
            activeValue={period}
            onValueChange={setPeriod}
            className="mt-3 animate-fade-up"
            size="md"
          />
          <p className="mt-2 px-1 text-caption leading-[18px] text-white/45" aria-live="polite">
            Showing {visibleEntries.length} {visibility === 'friends' ? 'friends-only' : typeLabel.toLowerCase()} rankings for {periodLabel.toLowerCase()}.
          </p>

          <section className="mt-4">
            <OwnRankCard />
          </section>

          <FilterToggle value={visibility} onChange={setVisibility} />

          {blockedNotice && (
            <div className="mt-3 flex items-center justify-between gap-3 rounded-md border border-forest-green/20 bg-forest-green/10 p-3 text-[12px] leading-4 text-forest-green" role="status">
              <span>{blockedNotice} is hidden from this leaderboard.</span>
              <button
                type="button"
                onClick={() => {
                  setBlockedNames((names) => names.filter((name) => name !== blockedNotice))
                  setBlockedNotice(null)
                }}
                className="min-h-11 shrink-0 rounded-pill px-3 font-semibold text-white"
              >
                Undo
              </button>
            </div>
          )}

          <section className="mt-3 animate-fade-up" style={{ animationDelay: '320ms' }}>
            <Card variant="small" className="rounded-lg p-0">
              {visibleEntries.map((entry, index) => (
                <LeaderboardRow
                  key={`${entry.rank}-${entry.name}`}
                  rank={entry.rank}
                  name={entry.name}
                  avatar={entry.avatar}
                  level={entry.level}
                  xp={entry.xp}
                  topDomain={entry.topDomain}
                  withDivider={index > 0}
                  onClick={() => openProfile(entry)}
                />
              ))}
              {visibleEntries.length === 0 && (
                <div className="p-4 text-[13px] leading-[18px] text-white/55">
                  No visible rankings in this scope yet. Switch scope or invite friends privately.
                </div>
              )}
            </Card>
          </section>
          <div className="sr-only" role="status" aria-live="polite">{toast}</div>
        </main>

        {profile && (
          <div className="absolute inset-0 z-40 flex items-end bg-ink-900/70 px-4 pb-4" role="dialog" aria-modal="true" aria-label={`${profile.name} profile`}>
            <div className="w-full rounded-xl border border-white/[0.08] bg-ink-brown-800 p-5 shadow-3">
              {profileMode === 'profile' && (
                <>
                  <h2 className="text-h3 font-semibold leading-[22px] text-white">{profile.name}</h2>
                  <p className="mt-1 text-caption leading-[18px] text-white/50">Limited profile. Visible: rank, level, XP, streak, and top domain only.</p>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-md bg-ink-900 p-3 text-caption text-white/60"><strong className="block text-white">#{profile.rank}</strong> Rank</div>
                    <div className="rounded-md bg-ink-900 p-3 text-caption text-white/60"><strong className="block text-white">Lv. {profile.level}</strong> Level</div>
                    <div className="rounded-md bg-ink-900 p-3 text-caption text-white/60"><strong className="block text-white">{profile.xp.toLocaleString()}</strong> XP</div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button type="button" onClick={() => setProfileMode('report')} className="h-11 flex-1 rounded-pill border border-white/10 text-[15px] font-semibold leading-5 text-white/70">Report</button>
                    <button type="button" onClick={() => setProfileMode('block')} className="h-11 flex-1 rounded-pill border border-error-red/30 text-[15px] font-semibold leading-5 text-error-red">Block</button>
                  </div>
                  <button type="button" onClick={() => setProfile(null)} className="mt-3 h-11 w-full rounded-pill bg-brand-orange text-[15px] font-semibold leading-5 text-white">Done</button>
                </>
              )}
              {profileMode === 'report' && (
                <>
                  <h2 className="text-h3 font-semibold leading-[22px] text-white">Report {profile.name}</h2>
                  <p className="mt-1 text-caption leading-[18px] text-white/50">Balencia reviews leaderboard reports. Reporting does not block this person unless you choose Block separately.</p>
                  <div className="mt-4 grid gap-2">
                    {['Harassment or unwanted contact', 'Unsafe health advice', 'Fake or spam profile'].map((reason) => (
                      <button
                        key={reason}
                        type="button"
                        aria-pressed={reportReason === reason}
                        onClick={() => setReportReason(reason)}
                        className={[
                          'min-h-11 rounded-md border px-3 text-left text-[13px] font-semibold leading-[18px]',
                          reportReason === reason ? 'border-brand-orange bg-brand-orange/10 text-white' : 'border-white/10 bg-ink-900 text-white/65',
                        ].join(' ')}
                      >
                        {reason}
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <button type="button" onClick={() => setProfileMode('profile')} className="h-11 rounded-pill border border-white/10 text-[15px] font-semibold leading-5 text-white/70">Cancel</button>
                    <button
                      type="button"
                      onClick={() => {
                        setToast(`${profile.name} reported for ${reportReason}`)
                        setProfileMode('reported')
                      }}
                      className="h-11 rounded-pill bg-brand-orange text-[15px] font-semibold leading-5 text-white"
                    >
                      Submit report
                    </button>
                  </div>
                </>
              )}
              {profileMode === 'reported' && (
                <>
                  <h2 className="text-h3 font-semibold leading-[22px] text-white">Report submitted</h2>
                  <p className="mt-2 rounded-md bg-forest-green/10 p-3 text-caption font-semibold leading-[18px] text-forest-green" role="status">
                    {profile.name} was reported for review. They can still appear unless you block them.
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <button type="button" onClick={() => setProfileMode('block')} className="h-11 rounded-pill border border-error-red/30 text-[15px] font-semibold leading-5 text-error-red">Block user</button>
                    <button type="button" onClick={() => setProfile(null)} className="h-11 rounded-pill bg-brand-orange text-[15px] font-semibold leading-5 text-white">Done</button>
                  </div>
                </>
              )}
              {profileMode === 'block' && (
                <>
                  <h2 className="text-h3 font-semibold leading-[22px] text-white">Block {profile.name}?</h2>
                  <p className="mt-2 text-caption leading-[18px] text-white/55">Blocking hides this person from leaderboards and prevents profile opens from your social surfaces. It does not submit a report.</p>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <button type="button" onClick={() => setProfileMode('profile')} className="h-11 rounded-pill border border-white/10 text-[15px] font-semibold leading-5 text-white/70">Cancel</button>
                    <button
                      type="button"
                      onClick={() => {
                        setBlockedNames((names) => [...names, profile.name])
                        setBlockedNotice(profile.name)
                        setToast(`${profile.name} blocked`)
                        setProfile(null)
                      }}
                      className="h-11 rounded-pill border border-error-red/30 text-[15px] font-semibold leading-5 text-error-red"
                    >
                      Block user
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </ScreenShell>
    </PhoneFrame>
  )
}
