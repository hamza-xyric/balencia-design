'use client'

import Link from 'next/link'
import { useState } from 'react'
import { CalendarDays, Check, Circle, Info, Plus, RotateCcw } from 'lucide-react'
import { Card } from '@/components/design-system/Card'
import { DomainDashboardHeader } from '@/components/domain/DomainDashboardHeader'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { ProgressRing } from '@/components/screens/ProgressRing'
import { SIACoachingNote } from '@/components/screens/SIACoachingNote'
import { careerDashboard } from '@/data/mock'

// Screen 32 of 78: Career & work dashboard
// Spec: /Users/hamza/yHealth/app_design 3/32-career-work-dashboard.md

function SectionTitle({ title, actionHref, actionLabel }: { title: string; actionHref?: string; actionLabel?: string }) {
  return (
    <div className="mb-3 flex h-8 items-center justify-between">
      <h2 className="text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/50">
        {title}
      </h2>
      {actionHref && actionLabel && (
        <Link href={actionHref} className="flex min-h-11 items-center text-caption leading-[18px] text-brand-orange">
          {actionLabel}
        </Link>
      )}
    </div>
  )
}

function CareerMissions() {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '160ms' }}>
      <SectionTitle title="Active missions" actionHref="/tabs/goals/detail" actionLabel="See all" />
      <Card variant="small" className="p-4">
        {careerDashboard.missions.map((mission, index) => (
          <Link
            href="/tabs/goals/detail"
            key={mission.name}
            className={[
              'flex min-h-[72px] items-center gap-3 py-3 transition-transform duration-[var(--dur-fast)] active:scale-[0.98]',
              index > 0 ? 'border-t border-white/[0.05]' : 'pt-0',
            ].join(' ')}
          >
            <ProgressRing progress={mission.progress} size={36} />
            <div className="min-w-0 flex-1">
              <div className="truncate text-[16px] font-semibold leading-[22px] text-white">{mission.name}</div>
              <div className="mt-0.5 text-caption leading-[18px] text-white/50">
                {mission.completed} of {mission.total} actions done - {Math.round(mission.progress * 100)}%
              </div>
              <div className="mt-1 truncate text-[15px] leading-5 text-brand-orange">
                Next: {mission.nextAction}
              </div>
            </div>
          </Link>
        ))}
      </Card>
    </section>
  )
}

function SuggestedActions() {
  const [done, setDone] = useState<string[]>([])
  const [skipped, setSkipped] = useState<string[]>([])
  const [toast, setToast] = useState('')
  const markDone = (name: string, xp: number) => {
    setDone((items) => items.includes(name) ? items : [...items, name])
    setToast(`Completed: +${xp} XP`)
    window.setTimeout(() => setToast(''), 2800)
  }

  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '240ms' }}>
      <SectionTitle title="Suggested actions" />
      <Card variant="small" className="p-4">
        {careerDashboard.actions.map((action, index) => (
          <div
            key={action.name}
            className={[
              'flex min-h-[56px] items-start gap-3 py-3',
              index > 0 ? 'border-t border-white/[0.05]' : 'pt-0',
            ].join(' ')}
          >
            <button type="button" onClick={() => markDone(action.name, action.xp)} className={['mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2', done.includes(action.name) ? 'border-forest-green bg-forest-green text-white' : 'border-white/30 text-white/30'].join(' ')} aria-pressed={done.includes(action.name)} aria-label={`Complete ${action.name}`}>
              {done.includes(action.name) ? <Check size={16} strokeWidth={2.4} /> : <Circle size={10} strokeWidth={2.4} />}
            </button>
            <div className="min-w-0 flex-1">
              <div className={['text-[15px] leading-5', done.includes(action.name) || skipped.includes(action.name) ? 'text-white/40 line-through' : 'text-white'].join(' ')}>{action.name}</div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.12em] text-white/40">
                  {action.type}
                </span>
                <span className="text-caption font-semibold leading-[18px] text-brand-orange">
                  +{action.xp} XP
                </span>
              </div>
              <div className="mt-2 flex gap-2">
                <button type="button" onClick={() => setSkipped((items) => items.includes(action.name) ? items : [...items, action.name])} className="flex min-h-11 min-w-11 items-center rounded-pill bg-ink-900 px-3 text-caption text-white/60">Skip</button>
                <button type="button" onClick={() => setToast('SIA suggested this because it advances your interview mission before Friday.')} className="flex min-h-11 min-w-11 items-center gap-1 rounded-pill bg-ink-900 px-3 text-caption text-white/60"><Info size={13} />Why</button>
              </div>
            </div>
          </div>
        ))}
      </Card>
      {toast && (
        <div className="mt-3 flex min-h-11 items-center justify-between rounded-pill bg-forest-green px-4 text-[14px] font-semibold text-white" role="status">
          <span>{toast}</span>
          <button type="button" onClick={() => { setDone([]); setToast('') }} className="flex h-9 items-center gap-1 rounded-pill px-2"><RotateCcw size={14} />Undo</button>
        </div>
      )}
    </section>
  )
}

function SkillsSnapshot() {
  const [selected, setSelected] = useState(careerDashboard.skills[0].name)

  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '320ms' }}>
      <SectionTitle title="Growth trajectory" />
      <Card variant="small" className="p-4">
        <div className="mb-4 text-[15px] font-semibold leading-5 text-white">Skills snapshot</div>
        <div className="flex gap-3 overflow-x-auto pb-1 hide-scrollbar">
          {careerDashboard.skills.map((skill) => (
            <button
              key={skill.name}
              type="button"
              onClick={() => setSelected(skill.name)}
              aria-pressed={selected === skill.name}
              className="flex h-[78px] min-w-[66px] flex-col items-center justify-center rounded-lg bg-domain-career/15 px-3 text-center"
            >
              <span className="text-caption font-semibold leading-[18px] text-white">{skill.name}</span>
              <span className="mt-1 text-h2 font-bold leading-[26px] text-white tabular-nums">{skill.level}</span>
            </button>
          ))}
        </div>
        <p className="mt-4 text-[15px] leading-5 text-white/70">{careerDashboard.assessment}</p>
        <div className="mt-3 rounded-md bg-ink-900 p-3 text-caption leading-[18px] text-white/55">
          {selected}: next detail includes practice tasks, evidence, and SIA assessment context.
        </div>
      </Card>
    </section>
  )
}

function UpcomingDeadlines() {
  const [selected, setSelected] = useState('')

  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '400ms' }}>
      <SectionTitle title="Upcoming" />
      <Card variant="small" className="p-4">
        {careerDashboard.deadlines.map((deadline, index) => (
          <button
            key={deadline.name}
            type="button"
            onClick={() => setSelected(selected === deadline.name ? '' : deadline.name)}
            aria-expanded={selected === deadline.name}
            className={[
              'flex min-h-[48px] w-full items-center gap-3 py-3 text-left',
              index > 0 ? 'border-t border-white/[0.05]' : 'pt-0',
            ].join(' ')}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-domain-career/15 text-domain-career">
              <CalendarDays size={17} strokeWidth={2.1} />
            </span>
            <div className="min-w-0">
              <div className="truncate text-[16px] font-semibold leading-[22px] text-white">{deadline.name}</div>
              <div className="mt-0.5 text-caption leading-[18px] text-white/50">
                {deadline.date} - {deadline.countdown}
              </div>
            </div>
            {selected === deadline.name && (
              <span className="ml-auto text-caption font-semibold text-brand-orange">Reschedule</span>
            )}
          </button>
        ))}
      </Card>
    </section>
  )
}

export default function CareerScreen() {
  return (
    <PhoneFrame>
      <ScreenShell
        header={<DomainDashboardHeader title="Career & work" domain="career" level={5} />}
        activeTab="me"
      >
        <main className="px-4 pb-20 pt-4">
          <SIACoachingNote
            message={careerDashboard.siaNote}
            actionLabel="Ask SIA"
            actionHref="/tabs/sia?context=career"
            className="animate-fade-up p-4"
          />

          <CareerMissions />
          <SuggestedActions />
          <SkillsSnapshot />
          <UpcomingDeadlines />

          <Link
            href="/tabs/goals/create"
            className="mt-6 flex h-[48px] items-center justify-center gap-2 rounded-pill border border-white/[0.06] bg-ink-brown-800 text-[15px] font-semibold leading-5 text-white shadow-1 transition-transform duration-[var(--dur-fast)] active:scale-[0.97]"
          >
            <Plus size={17} strokeWidth={2.3} />
            Add career mission
          </Link>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
