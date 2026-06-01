'use client'

import Link from 'next/link'
import type { CSSProperties } from 'react'
import { useState } from 'react'
import { Check, Flame, Plus, RefreshCw, X } from 'lucide-react'
import { Button } from '@/components/design-system/Button'
import { Card } from '@/components/design-system/Card'
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
    <Link href="/tabs/sia?context=learning" className="block animate-fade-up">
    <Card variant="small" className="rounded-lg p-6">
      <div className="flex items-start gap-3">
        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-royal-purple" aria-hidden="true" />
        <p className="text-[15px] leading-[21px] text-white/90">{learningDashboard.siaNote}</p>
      </div>
    </Card>
    </Link>
  )
}

function CurrentBookCard({ onOpen }: { onOpen: (title: string) => void }) {
  const item = learningDashboard.currentItem

  return (
    <button type="button" onClick={() => onOpen(item.title)} className="mt-4 block w-full text-left animate-fade-up" style={{ animationDelay: '80ms' }} aria-label={`Open learning item ${item.title}`}>
    <Card variant="small" className="rounded-lg p-6">
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
    </button>
  )
}

function LearningPathCard() {
  const [completed, setCompleted] = useState(learningDashboard.suggestions.filter((item) => item.completed).map((item) => item.id))
  const [toast, setToast] = useState('')

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
            <button
              type="button"
              onClick={() => {
                const nextDone = !completed.includes(action.id)
                setCompleted((items) => nextDone ? [...items, action.id] : items.filter((item) => item !== action.id))
                setToast(nextDone ? `Completed: +${action.xp} XP` : 'Suggestion reopened')
                window.setTimeout(() => setToast(''), 2600)
              }}
              className={[
                'flex h-11 w-11 shrink-0 items-center justify-center rounded-xs border',
                completed.includes(action.id) ? 'border-domain-learning bg-domain-learning text-white' : 'border-white/20 text-transparent',
              ].join(' ')}
              aria-pressed={completed.includes(action.id)}
              aria-label={`Complete ${action.name}`}
            >
              <Check size={13} strokeWidth={2.6} />
            </button>
            <span className={`min-w-0 flex-1 text-[15px] leading-5 ${completed.includes(action.id) ? 'text-white/40 line-through' : 'text-white/80'}`}>
              {action.name}
            </span>
            {completed.includes(action.id) && (
              <span className="shrink-0 text-small font-semibold leading-[14px] text-forest-green">
                +{action.xp} XP
              </span>
            )}
          </div>
        ))}
        <button type="button" onClick={() => setToast('SIA refreshed the next study action set.')} className="mt-2 flex h-11 w-full items-center justify-center gap-2 border-t border-white/[0.05] text-caption font-semibold text-brand-orange">
          <RefreshCw size={14} />Refresh suggestions
        </button>
      </Card>
      {toast && <div className="mt-3 rounded-pill bg-forest-green px-4 py-3 text-caption font-semibold text-white" role="status">{toast}</div>}
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
            href={`/tabs/goals/detail?source=learning&title=${encodeURIComponent(mission.name)}&type=weekly&domains=learning&progress=${mission.progress}&next=${encodeURIComponent('Continue next learning session')}`}
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
  const [selectedId, setSelectedId] = useState('')
  const [showAll, setShowAll] = useState(false)
  const visibleItems = showAll
    ? learningDashboard.library.concat([{ id: 'systems-thinking', title: 'Systems Thinking', status: 'queued', progress: 0.05 }])
    : learningDashboard.library

  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '400ms' }}>
      <Eyebrow>Your library</Eyebrow>
      <Card variant="small" className="rounded-lg p-0">
        {visibleItems.map((item, index) => (
          <button
            type="button"
            onClick={() => setSelectedId(selectedId === item.id ? '' : item.id)}
            aria-expanded={selectedId === item.id}
            key={item.id}
            className={[
              'w-full px-4 py-3 text-left',
              index > 0 ? 'border-t border-white/[0.05]' : '',
            ].join(' ')}
          >
            <div className="flex min-h-14 items-center gap-3">
              <DomainProgressCircle progress={item.progress} size={32} label={'completed' in item && item.completed ? <Check size={13} strokeWidth={2.5} /> : undefined} />
              <div className="min-w-0 flex-1">
                <div className="truncate text-[15px] font-semibold leading-5 text-white">{item.title}</div>
                <div className="mt-0.5 text-caption leading-[18px] text-white/40">{item.status}</div>
              </div>
              <div className={`text-[15px] leading-5 ${'completed' in item && item.completed ? 'text-forest-green' : 'text-white/50'} tabular-nums`}>
                {'completed' in item && item.completed ? <Check size={16} strokeWidth={2.4} /> : `${Math.round(item.progress * 100)}%`}
              </div>
            </div>
            {selectedId === item.id && (
              <div className="mt-3 rounded-md bg-ink-900 p-3 text-caption leading-[18px] text-white/55">
                Learning detail: progress, notes, and next study action stay inside Learning rather than sending you to Journal.
              </div>
            )}
          </button>
        ))}
        <button type="button" onClick={() => setShowAll((current) => !current)} aria-expanded={showAll} className="flex h-11 w-full items-center justify-center border-t border-white/[0.05] text-caption font-semibold leading-[18px] text-brand-orange">
          {showAll ? 'Show fewer' : 'See all'}
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
          href={`/features/journal?source=learning&prompt=${encodeURIComponent(learningDashboard.prompt)}`}
          className="mt-3 inline-flex min-h-11 items-center rounded-pill border border-white/10 bg-ink-brown-800 px-4 text-caption font-semibold leading-[18px] text-white/70"
        >
          Reflect
        </Link>
      </div>
    </section>
  )
}

export default function LearningScreen() {
  const [sheetOpen, setSheetOpen] = useState(false)
  const [learningDetail, setLearningDetail] = useState('')
  const [type, setType] = useState('Read')
  const [duration, setDuration] = useState('')
  const [toast, setToast] = useState('')
  const save = () => {
    setSheetOpen(false)
    setToast('Learning session logged: +20 XP')
    window.setTimeout(() => setToast(''), 3000)
  }

  return (
    <PhoneFrame>
      <ScreenShell
        header={<DomainDashboardHeader title="Learning & growth" domain="learning" variant="expanded" />}
        activeTab="me"
        bottomAction={<button type="button" onClick={() => setSheetOpen(true)} className="mx-auto flex h-[48px] w-fit items-center justify-center gap-2 rounded-pill bg-brand-orange px-6 text-[15px] font-semibold leading-5 text-white shadow-2 shadow-brand-orange/30" aria-label="Log learning session"><Plus size={16} strokeWidth={2.4} />Log session</button>}
      >
        <main className="px-4 pb-6 pt-4">
          <SiaDotNote />
          <CurrentBookCard onOpen={setLearningDetail} />
          <LearningPathCard />
          <ActiveMissions />
          <StreakTracker />
          <LibraryCard />
          <ActivityLog />
          <StudyPrompt />
        </main>
        {sheetOpen && (
          <div className="absolute inset-x-0 bottom-[84px] z-20 mx-3 rounded-xl border border-white/10 bg-ink-brown-800 p-4 shadow-2" role="dialog" aria-label="Log learning session">
            <div className="flex items-center justify-between">
              <h2 className="text-[17px] font-semibold text-white">Log session</h2>
              <button type="button" onClick={() => setSheetOpen(false)} className="flex h-11 w-11 items-center justify-center rounded-full text-white/60" aria-label="Cancel"><X size={18} /></button>
            </div>
            <label className="mt-3 block text-caption leading-[18px] text-white/50">Activity type
              <select value={type} onChange={(event) => setType(event.target.value)} className="mt-1 h-11 w-full rounded-md border border-white/10 bg-ink-900 px-3 text-[15px] text-white outline-none">
                <option>Read</option><option>Course</option><option>Practice</option>
              </select>
            </label>
            <label className="mt-3 block text-caption leading-[18px] text-white/50">Duration minutes
              <input value={duration} onChange={(event) => setDuration(event.target.value)} type="number" className="mt-1 h-11 w-full rounded-md border border-white/10 bg-ink-900 px-3 text-[15px] text-white outline-none" />
            </label>
            <label className="mt-3 block text-caption leading-[18px] text-white/50">Notes
              <textarea className="mt-1 min-h-[72px] w-full rounded-md border border-white/10 bg-ink-900 p-3 text-[15px] text-white outline-none" defaultValue={`${type}: ${learningDashboard.currentItem.title}`} />
            </label>
            <Button disabled={!Number(duration)} onClick={save} fullWidth variant="completion" className="mt-3">Save session</Button>
          </div>
        )}
        {learningDetail && (
          <div className="absolute inset-x-0 bottom-[84px] z-20 mx-3 rounded-xl border border-white/10 bg-ink-brown-800 p-4 shadow-2" role="dialog" aria-label="Learning item detail">
            <div className="flex items-center justify-between">
              <h2 className="text-[17px] font-semibold text-white">{learningDetail}</h2>
              <button type="button" onClick={() => setLearningDetail('')} className="flex h-11 w-11 items-center justify-center rounded-full text-white/60" aria-label="Close learning item detail"><X size={18} /></button>
            </div>
            <p className="mt-2 text-caption leading-[18px] text-white/55">Reading progress, daily target, notes, and next study action are handled in this Learning detail state.</p>
            <div className="mt-3 rounded-md bg-ink-900 p-3 text-caption leading-[18px] text-white/60">Next: read 15 pages and add one note. Journal reflection stays optional after the session.</div>
            <Button onClick={() => setLearningDetail('')} fullWidth variant="completion" className="mt-3">Done</Button>
          </div>
        )}
        {toast && <div className="absolute inset-x-4 bottom-[96px] z-30 rounded-pill bg-forest-green px-4 py-3 text-[14px] font-semibold text-white shadow-2" role="status">{toast}</div>}
      </ScreenShell>
    </PhoneFrame>
  )
}
