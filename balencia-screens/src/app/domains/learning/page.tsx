import Link from 'next/link'
import type { CSSProperties } from 'react'
import { Check, Flame, Plus } from 'lucide-react'
import { Card } from '@/components/design-system/Card'
import { FAB } from '@/components/design-system/FAB'
import { DomainDashboardHeader } from '@/components/domain/DomainDashboardHeader'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { learningDashboard } from '@/data/mock'

// Screen 35 of 78: Learning & growth dashboard
// Spec: /Users/hamza/yHealth/app_design 3/35-learning-growth-dashboard.md

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">
      {children}
    </div>
  )
}

function ProgressBar({ progress, className = 'bg-domain-learning' }: { progress: number; className?: string }) {
  return (
    <div className="h-2 overflow-hidden rounded-xs bg-white/[0.08]">
      <div className={`h-full rounded-xs ${className}`} style={{ width: `${Math.round(progress * 100)}%` }} />
    </div>
  )
}

function DomainProgressCircle({
  progress,
  size = 64,
  label,
}: {
  progress: number
  size?: 32 | 64
  label?: React.ReactNode
}) {
  const radius = size === 64 ? 28 : 13
  const stroke = size === 64 ? 4 : 3
  const circumference = 2 * Math.PI * radius
  const targetOffset = circumference * (1 - progress)
  const percent = Math.round(progress * 100)

  return (
    <div className="relative inline-flex shrink-0 items-center justify-center text-domain-learning" style={{ width: size, height: size }}>
      <svg className="-rotate-90" width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" strokeWidth={stroke} className="text-white/10" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          className="ring-animate"
          style={{
            '--ring-circumference': circumference,
            '--ring-target': targetOffset,
          } as CSSProperties}
        />
      </svg>
      <span className={`${size === 64 ? 'text-[16px]' : 'text-small'} absolute font-semibold leading-none text-white`}>
        {label ?? percent}
      </span>
    </div>
  )
}

function SiaDotNote() {
  return (
    <Card variant="small" className="rounded-lg p-6 animate-fade-up">
      <div className="flex items-start gap-3">
        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-royal-purple" aria-hidden="true" />
        <p className="text-[15px] leading-[21px] text-white/90">{learningDashboard.siaNote}</p>
      </div>
    </Card>
  )
}

function CurrentBookCard() {
  const item = learningDashboard.currentItem

  return (
    <Card variant="small" className="mt-4 rounded-lg p-6 animate-fade-up" style={{ animationDelay: '80ms' }}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="truncate text-h3 font-semibold leading-[22px] text-white">{item.title}</h2>
          <p className="mt-1 text-caption leading-[18px] text-white/50">{item.author}</p>
        </div>
        <span className="text-caption font-semibold leading-[18px] text-white/70 tabular-nums">
          {Math.round(item.progress * 100)}%
        </span>
      </div>
      <div className="mt-4">
        <ProgressBar progress={item.progress} />
      </div>
      <div className="mt-3 text-caption leading-[18px] text-white/50">{item.dailyTarget} target</div>
      <div className="mt-2 inline-flex items-center gap-1.5 text-caption font-semibold leading-[18px] text-white/70">
        <Flame size={16} className="text-brand-orange" strokeWidth={2.2} />
        {item.streak}-day reading streak
      </div>
    </Card>
  )
}

function LearningPathCard() {
  return (
    <section className="mt-4 animate-fade-up" style={{ animationDelay: '160ms' }}>
      <Eyebrow>SIA suggests</Eyebrow>
      <Card variant="small" className="rounded-lg p-4">
        {learningDashboard.suggestions.map((action, index) => (
          <div
            key={action.id}
            className={[
              'flex min-h-12 items-center gap-3 py-2',
              index > 0 ? 'border-t border-white/[0.05]' : '',
            ].filter(Boolean).join(' ')}
          >
            <span
              className={[
                'flex h-6 w-6 shrink-0 items-center justify-center rounded-xs border',
                action.completed ? 'border-domain-learning bg-domain-learning text-white' : 'border-white/20 text-transparent',
              ].join(' ')}
              aria-hidden="true"
            >
              <Check size={13} strokeWidth={2.6} />
            </span>
            <span className={`min-w-0 flex-1 text-[15px] leading-5 ${action.completed ? 'text-white/40 line-through' : 'text-white/80'}`}>
              {action.name}
            </span>
            {action.completed && (
              <span className="shrink-0 text-small font-semibold leading-[14px] text-forest-green">
                +{action.xp} XP
              </span>
            )}
          </div>
        ))}
      </Card>
    </section>
  )
}

function ActiveMissions() {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '240ms' }}>
      <Eyebrow>Active missions</Eyebrow>
      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 hide-scrollbar">
        {learningDashboard.activeMissions.map((mission) => (
          <Link
            href="/tabs/goals/detail"
            key={mission.id}
            className="flex min-h-[120px] min-w-[100px] flex-col items-center justify-start rounded-lg border border-white/[0.06] bg-ink-brown-800 px-3 py-4 shadow-1"
          >
            <DomainProgressCircle progress={mission.progress} />
            <span className="mt-3 line-clamp-2 text-center text-caption leading-[18px] text-white/70">
              {mission.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}

function StreakTracker() {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '320ms' }}>
      <Eyebrow>Consistency</Eyebrow>
      <Card variant="small" className="rounded-lg p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 text-h3 font-semibold leading-[22px] text-white">
            <Flame size={20} className="text-brand-orange" strokeWidth={2.2} />
            {learningDashboard.streak.current}-day streak
          </div>
          <div className="text-caption leading-[18px] text-white/40">best: {learningDashboard.streak.best}</div>
        </div>
        <div className="mt-4 grid grid-cols-7 gap-2">
          {learningDashboard.streak.days.map((day) => (
            <div key={day.label + day.state} className="flex flex-col items-center gap-2">
              <span
                className={[
                  'flex h-8 w-8 items-center justify-center rounded-full border text-white',
                  day.state === 'complete' ? 'border-domain-learning bg-domain-learning' : '',
                  day.state === 'missed' ? 'border-transparent bg-white/[0.08]' : '',
                  day.state === 'today' ? 'border-domain-learning border-dashed bg-white/[0.15]' : '',
                ].join(' ')}
              >
                {day.state === 'complete' && <Check size={13} strokeWidth={2.5} />}
              </span>
              <span className="text-small leading-[14px] text-white/30">{day.label}</span>
            </div>
          ))}
        </div>
      </Card>
    </section>
  )
}

function LibraryCard() {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '400ms' }}>
      <Eyebrow>Your library</Eyebrow>
      <Card variant="small" className="rounded-lg p-0">
        {learningDashboard.library.map((item, index) => (
          <div
            key={item.id}
            className={[
              'flex min-h-14 items-center gap-3 px-4 py-3',
              index > 0 ? 'border-t border-white/[0.05]' : '',
            ].join(' ')}
          >
            <DomainProgressCircle progress={item.progress} size={32} label={item.completed ? <Check size={13} strokeWidth={2.5} /> : undefined} />
            <div className="min-w-0 flex-1">
              <div className="truncate text-[15px] font-semibold leading-5 text-white">{item.title}</div>
              <div className="mt-0.5 text-caption leading-[18px] text-white/40">{item.status}</div>
            </div>
            <div className={`text-[15px] leading-5 ${item.completed ? 'text-forest-green' : 'text-white/50'} tabular-nums`}>
              {item.completed ? <Check size={16} strokeWidth={2.4} /> : `${Math.round(item.progress * 100)}%`}
            </div>
          </div>
        ))}
        <button type="button" className="flex h-11 w-full items-center justify-center border-t border-white/[0.05] text-caption font-semibold leading-[18px] text-brand-orange">
          See all
        </button>
      </Card>
    </section>
  )
}

function ActivityLog() {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '480ms' }}>
      <Eyebrow>Recent activity</Eyebrow>
      <Card variant="small" className="rounded-lg p-0">
        {learningDashboard.activity.map((entry, index) => (
          <div
            key={entry.id}
            className={[
              'flex min-h-14 items-center gap-3 px-4 py-3',
              index > 0 ? 'border-t border-white/[0.05]' : '',
            ].join(' ')}
          >
            <div className="w-[72px] shrink-0 text-caption leading-[18px] text-white/40">{entry.date}</div>
            <div className="min-w-0 flex-1 truncate text-[15px] leading-5 text-white/90">{entry.description}</div>
            {entry.xp && (
              <div className="shrink-0 text-small font-semibold leading-[14px] text-forest-green">+{entry.xp} XP</div>
            )}
          </div>
        ))}
      </Card>
    </section>
  )
}

function StudyPrompt() {
  return (
    <section className="mt-4 animate-fade-up" style={{ animationDelay: '560ms' }}>
      <div className="rounded-lg border border-dashed border-white/10 bg-ink-900 p-6">
        <p className="text-[15px] italic leading-[21px] text-white/70">{learningDashboard.prompt}</p>
        <Link
          href="/features/journal"
          className="mt-3 inline-flex h-8 items-center rounded-pill border border-white/10 bg-ink-brown-800 px-4 text-caption font-semibold leading-[18px] text-white/70"
        >
          Reflect
        </Link>
      </div>
    </section>
  )
}

export default function LearningScreen() {
  return (
    <PhoneFrame>
      <ScreenShell
        header={<DomainDashboardHeader title="Learning & growth" domain="learning" variant="expanded" />}
        activeTab="me"
        bottomAction={
          <FAB
            label="Log session"
            icon={<Plus size={16} strokeWidth={2.4} />}
            display="pill"
          />
        }
      >
        <main className="px-4 pb-6 pt-4">
          <SiaDotNote />
          <CurrentBookCard />
          <LearningPathCard />
          <ActiveMissions />
          <StreakTracker />
          <LibraryCard />
          <ActivityLog />
          <StudyPrompt />
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
