'use client'

import { Check, Flame, Lock, Moon, Snowflake, Trophy, Zap } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Card } from '@/components/design-system/Card'
import { Button } from '@/components/design-system/Button'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { streakDetails } from '@/data/mock'

// Screen 59 of 78: Streak details
// Spec: /Users/hamza/yHealth/app_design 3/59-streak-details.md

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 px-1 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">
      {children}
    </div>
  )
}

function StreakHero() {
  const percent = Math.round((streakDetails.current / streakDetails.longest) * 100)

  return (
    <Card className="animate-fade-up overflow-hidden p-8 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-orange/15 text-brand-orange shadow-[var(--glow-orange)]">
        <Flame size={34} fill="currentColor" strokeWidth={1.8} />
      </div>
      <div className="mt-4 text-display-xl font-bold leading-[48px] text-white tabular-nums">{streakDetails.current}</div>
      <div className="text-h3 font-semibold leading-[22px] text-white/70">Days strong</div>
      <div className="mt-5 flex items-center justify-between text-caption leading-[18px]">
        <span className="text-white/50">Longest: {streakDetails.longest} days</span>
        <span className="font-semibold text-brand-orange">{percent}%</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-pill bg-white/[0.08]">
        <div className="h-full rounded-pill bg-brand-orange" style={{ width: `${percent}%` }} />
      </div>
      <p className="mt-2 text-small leading-[14px] text-white/30">Of longest streak</p>
    </Card>
  )
}

function StreakCalendar({ monthOffset, onMonth, onDay }: { monthOffset: number; onMonth: (delta: number) => void; onDay: (label: string) => void }) {
  const stateClass: Record<string, string> = {
    active: 'bg-forest-green border-forest-green',
    freeze: 'bg-freeze-blue/25 border-freeze-blue text-freeze-blue',
    missed: 'bg-white/[0.06] border-white/10',
    future: 'bg-transparent border-white/[0.04]',
  }
  const monthLabel = monthOffset === 0 ? 'May 2026' : monthOffset < 0 ? 'April 2026' : 'June 2026'

  return (
    <Card className="mt-4 animate-fade-up" style={{ animationDelay: '80ms' }}>
      <div className="mb-4 flex items-center justify-between">
        <button type="button" onClick={() => onMonth(-1)} className="h-11 w-11 rounded-full text-white/40" aria-label="Previous month">‹</button>
        <h2 className="text-h3 font-semibold leading-[22px] text-white">{monthLabel}</h2>
        <button type="button" onClick={() => onMonth(1)} className="h-11 w-11 rounded-full text-white/40" aria-label="Next month">›</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-small leading-[14px] text-white/30">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => <span key={`${day}-${index}`}>{day}</span>)}
      </div>
      <div className="mt-3 space-y-2">
        {streakDetails.calendar.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-7 gap-2">
            {row.map((state, index) => {
              const dayNumber = rowIndex * 7 + index + 1
              const stateLabel = state === 'active' ? 'completed' : state === 'freeze' ? 'protected by freeze' : state === 'missed' ? 'missed' : 'future'
              return (
                <button
                  key={`${rowIndex}-${index}`}
                  type="button"
                  onClick={() => onDay(`${monthLabel} day ${dayNumber}: ${stateLabel}.`)}
                  aria-label={`${monthLabel} day ${dayNumber}, ${stateLabel}`}
                  className={[
                    'flex h-11 w-11 items-center justify-center rounded-xs border text-small font-semibold',
                    stateClass[state],
                  ].join(' ')}
                >
                  {state === 'freeze' ? <Snowflake size={13} strokeWidth={2.3} /> : state === 'missed' ? 'Miss' : ''}
                </button>
              )
            })}
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-center gap-4 text-small leading-[14px] text-white/40">
        <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-forest-green" /> Active</span>
        <span className="inline-flex items-center gap-1"><Snowflake size={12} className="text-freeze-blue" /> Freeze</span>
        <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full border border-white/20" /> Miss</span>
      </div>
    </Card>
  )
}

function MultiplierCards() {
  const activeMultiplier = streakDetails.current >= 30 ? 2.0 : streakDetails.current >= 14 ? 1.5 : 1.2
  const progress = Math.min((streakDetails.current / 30) * 100, 100)

  return (
    <div className="mt-4 space-y-4">
      <Card variant="small" className="rounded-xl p-5 animate-fade-up" style={{ animationDelay: '160ms' }}>
        <div className="flex items-start gap-3">
          <Zap size={22} className="mt-0.5 text-brand-orange" fill="currentColor" strokeWidth={1.8} />
          <div className="min-w-0 flex-1">
            <h2 className="text-h3 font-semibold leading-[22px] text-white">{activeMultiplier.toFixed(1)}x XP multiplier</h2>
            <p className="mt-1 text-caption leading-[18px] text-white/50">30+ day maximum tier active</p>
            <div className="mt-3 h-2 overflow-hidden rounded-pill bg-white/[0.08]">
              <div className="h-full rounded-pill bg-brand-orange" style={{ width: `${Math.min(progress, 100)}%` }} />
            </div>
            <p className="mt-2 text-small leading-[14px] text-white/40">Maximum XP multiplier reached. Next milestone: +500 XP at 60 days.</p>
          </div>
        </div>
      </Card>

      <Card variant="small" className="rounded-xl p-5 animate-fade-up" style={{ animationDelay: '240ms' }}>
        <div className="flex items-start gap-3">
          <Moon size={22} className="mt-0.5 text-white/70" strokeWidth={2} />
          <div>
            <h2 className="text-h3 font-semibold leading-[22px] text-white">Recovery multiplier</h2>
            <p className="mt-1 text-caption font-semibold leading-[18px] text-white/70">Rest day bonus: 1.3x XP tomorrow</p>
            <p className="mt-3 border-t border-white/[0.06] pt-3 text-caption leading-[18px] text-white/50">
              Take a deliberate rest day or use a streak freeze, then earn boosted XP on your next active day.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

function FreezeCard({ count, onUse }: { count: number; onUse: () => void }) {
  return (
    <Card className="mt-4 animate-fade-up" style={{ animationDelay: '320ms' }}>
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-freeze-blue/15 text-freeze-blue">
          <Snowflake size={22} strokeWidth={2.2} />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-h3 font-semibold leading-[22px] text-white">Streak freezes</h2>
          <p className="mt-1 text-h2 font-bold leading-[26px] text-white tabular-nums">{count} available</p>
          <p className="mt-3 text-caption leading-[18px] text-white/50">
            Use a freeze to protect your streak on rest days. Earn 1 freeze per 7 days.
          </p>
          <Button className="mt-5" fullWidth disabled={count === 0} onClick={onUse}>Use freeze</Button>
        </div>
      </div>
    </Card>
  )
}

function FreezeConfirmation({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <section className="absolute inset-x-0 bottom-0 z-40 rounded-t-xl border border-white/[0.06] bg-ink-brown-800 px-4 pb-8 pt-3 shadow-3 animate-fade-up" role="dialog" aria-label="Confirm streak freeze">
      <div className="mx-auto mb-4 h-1 w-9 rounded-pill bg-white/20" />
      <h2 className="text-h3 font-semibold leading-[22px] text-white">Protect the next missed day?</h2>
      <p className="mt-2 text-caption leading-[18px] text-white/55">
        One freeze will be held for your next rest or missed day. You can still earn regular XP on active days.
      </p>
      <div className="mt-5 grid grid-cols-2 gap-2">
        <Button variant="ghost" onClick={onCancel}>Keep freeze</Button>
        <Button onClick={onConfirm}>Confirm</Button>
      </div>
    </section>
  )
}

function Milestones() {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '400ms' }}>
      <SectionEyebrow>Milestones</SectionEyebrow>
      <Card variant="small" className="rounded-xl p-0">
        {streakDetails.milestones.map((milestone, index) => {
          const earned = milestone.state === 'earned'
          const next = milestone.state === 'next'
          return (
            <div key={milestone.days} className={['flex h-12 items-center gap-3 px-4', index > 0 ? 'border-t border-white/[0.05]' : ''].join(' ')}>
              <span className={[
                'flex h-6 w-6 items-center justify-center rounded-full border',
                earned ? 'border-forest-green bg-forest-green text-white' : next ? 'border-brand-orange text-brand-orange' : 'border-white/10 text-white/25',
              ].join(' ')}>
                {earned ? <Check size={14} strokeWidth={2.5} /> : next ? <Trophy size={13} strokeWidth={2.2} /> : <Lock size={12} strokeWidth={2.2} />}
              </span>
              <span className={['min-w-0 flex-1 text-[15px] font-semibold leading-5', earned || next ? 'text-white' : 'text-white/40'].join(' ')}>
                {milestone.days} days
              </span>
              <span className={['text-[14px] font-semibold leading-5 tabular-nums', earned ? 'text-forest-green' : next ? 'text-brand-orange' : 'text-white/25'].join(' ')}>
                +{milestone.xp.toLocaleString()} XP
              </span>
            </div>
          )
        })}
      </Card>
    </section>
  )
}

function Leaderboard() {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '480ms' }}>
      <SectionEyebrow>Streak leaderboard</SectionEyebrow>
      <Card variant="small" className="rounded-xl p-0">
        {streakDetails.leaderboard.map((row, index) => (
          <div key={row.rank} className={['flex h-14 items-center gap-3 px-4', index > 0 ? 'border-t border-white/[0.05]' : '', row.name === 'You' ? 'bg-brand-orange/10' : ''].join(' ')}>
            <span className="w-7 text-caption font-semibold leading-[18px] text-white/40">#{row.rank}</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-900 text-small font-semibold text-white">{row.avatar}</span>
            <span className="min-w-0 flex-1 truncate text-[15px] font-semibold leading-5 text-white">{row.name}</span>
            <span className="text-caption font-semibold leading-[18px] text-brand-orange">{row.days} days</span>
          </div>
        ))}
        <Link href="/features/leaderboard" className="flex min-h-11 w-full items-center justify-center border-t border-white/[0.05] py-3 text-center text-caption font-semibold leading-[18px] text-brand-orange">
          See full leaderboard
        </Link>
      </Card>
    </section>
  )
}

function History() {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '560ms' }}>
      <SectionEyebrow>Streak history</SectionEyebrow>
      <Card variant="small" className="rounded-xl p-0">
        {streakDetails.history.map((item, index) => (
          <div key={`${item.length}-${item.dates}`} className={['px-4 py-4', index > 0 ? 'border-t border-white/[0.05]' : ''].join(' ')}>
            <div className="flex items-center justify-between">
              <div className="text-h3 font-semibold leading-[22px] text-white">{item.length} days</div>
              <span className={['rounded-pill px-2.5 py-1 text-small font-semibold leading-3', item.label === 'Active' ? 'bg-forest-green/15 text-forest-green' : 'bg-white/[0.06] text-white/40'].join(' ')}>
                {item.label}
              </span>
            </div>
            <p className="mt-1 text-caption leading-[18px] text-white/50">{item.dates}</p>
            <p className="mt-1 text-small leading-[14px] text-white/30">{item.note}</p>
          </div>
        ))}
      </Card>
    </section>
  )
}

export default function StreakDetailsScreen() {
  const [monthOffset, setMonthOffset] = useState(0)
  const [freezeCount, setFreezeCount] = useState(streakDetails.freezeCount)
  const [notice, setNotice] = useState('')
  const [confirmFreeze, setConfirmFreeze] = useState(false)

  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Streak details" showBack backHref="/tabs/me/rpg" />} activeTab="me">
        <main className="px-4 pb-20 pt-4">
          <StreakHero />
          <StreakCalendar monthOffset={monthOffset} onMonth={(delta) => { setMonthOffset((value) => Math.max(-1, Math.min(1, value + delta))); setNotice('Month changed.') }} onDay={(label) => setNotice(label)} />
          <MultiplierCards />
          <FreezeCard count={freezeCount} onUse={() => { if (freezeCount > 0) setConfirmFreeze(true) }} />
          {notice && <p className="mt-3 text-caption leading-[18px] text-freeze-blue" aria-live="polite">{notice}</p>}
          <Milestones />
          <Leaderboard />
          <History />
        </main>
        {confirmFreeze && (
          <FreezeConfirmation
            onCancel={() => setConfirmFreeze(false)}
            onConfirm={() => {
              setFreezeCount((count) => Math.max(0, count - 1))
              setNotice('Freeze reserved. Your next missed day will be protected.')
              setConfirmFreeze(false)
            }}
          />
        )}
      </ScreenShell>
    </PhoneFrame>
  )
}
