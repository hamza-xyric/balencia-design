'use client'

import Link from 'next/link'
import type { CSSProperties } from 'react'
import { useState } from 'react'
import { Check, Flame, Plus, X } from 'lucide-react'
import { CalendarHeatmap } from '@/components/charts/CalendarHeatmap'
import { Button } from '@/components/design-system/Button'
import { Card } from '@/components/design-system/Card'
import { DomainDashboardHeader } from '@/components/domain/DomainDashboardHeader'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { creativityDashboard } from '@/data/mock'

// Screen 36 of 78: Creativity dashboard
// Spec: /Users/hamza/yHealth/app_design 3/36-creativity-dashboard.md

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">
      {children}
    </div>
  )
}

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="h-1.5 overflow-hidden rounded-xs bg-white/[0.08]">
      <div className="h-full rounded-xs bg-domain-creativity" style={{ width: `${Math.round(progress * 100)}%` }} />
    </div>
  )
}

function CreativityProgressCircle({ progress }: { progress: number }) {
  const size = 64
  const radius = 28
  const circumference = 2 * Math.PI * radius
  const targetOffset = circumference * (1 - progress)

  return (
    <div className="relative inline-flex h-16 w-16 shrink-0 items-center justify-center text-domain-creativity">
      <svg className="-rotate-90" width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle cx={32} cy={32} r={radius} fill="none" stroke="currentColor" strokeWidth="4" className="text-white/10" />
        <circle
          cx={32}
          cy={32}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          className="ring-animate"
          style={{
            '--ring-circumference': circumference,
            '--ring-target': targetOffset,
          } as CSSProperties}
        />
      </svg>
      <span className="absolute text-[16px] font-semibold leading-none text-white">
        {Math.round(progress * 100)}
      </span>
    </div>
  )
}

function SiaDotNote() {
  return (
    <Link href="/tabs/sia?context=creativity" className="block animate-fade-up">
    <Card variant="small" className="rounded-lg p-6">
      <div className="flex items-start gap-3">
        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-royal-purple" aria-hidden="true" />
        <p className="text-[15px] leading-[21px] text-white/90">{creativityDashboard.siaNote}</p>
      </div>
    </Card>
    </Link>
  )
}

function ActiveProjects() {
  const [expanded, setExpanded] = useState('')
  const [all, setAll] = useState(false)

  return (
    <section className="mt-4 animate-fade-up" style={{ animationDelay: '80ms' }}>
      <Eyebrow>Active projects</Eyebrow>
      <Card variant="small" className="rounded-lg p-4">
        {creativityDashboard.projects.concat(all ? [{ id: 'archive', name: 'Sketch archive', milestone: 'Select strongest pieces', progress: 0.34, due: 'Jun' }] : []).map((project, index) => (
          <button
            key={project.id}
            type="button"
            onClick={() => setExpanded(expanded === project.id ? '' : project.id)}
            aria-expanded={expanded === project.id}
            className={[
              'w-full py-3 text-left',
              index > 0 ? 'border-t border-white/[0.05]' : 'pt-0',
            ].join(' ')}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="truncate text-[16px] font-semibold leading-[22px] text-white">{project.name}</h2>
                <p className="mt-1 truncate text-caption leading-[18px] text-white/50">▸ {project.milestone}</p>
              </div>
              {project.due && <span className="shrink-0 text-small leading-[14px] text-white/30">{project.due}</span>}
            </div>
            <div className="mt-3">
              <div className="mb-1 text-right text-caption leading-[18px] text-white/70 tabular-nums">
                {Math.round(project.progress * 100)}%
              </div>
              <ProgressBar progress={project.progress} />
            </div>
            {expanded === project.id && <div className="mt-3 rounded-md bg-ink-900 p-3 text-caption leading-[18px] text-white/55">Project detail: next milestone, notes, and session history. Tap Log session to attach time here.</div>}
          </button>
        ))}
        <button type="button" onClick={() => setAll(!all)} className="flex h-11 w-full items-center justify-center border-t border-white/[0.05] text-caption font-semibold leading-[18px] text-brand-orange" aria-expanded={all}>
          See all
        </button>
      </Card>
    </section>
  )
}

function InspirationPrompt({ onStart }: { onStart: (context: string) => void }) {
  return (
    <section className="mt-4 animate-fade-up" style={{ animationDelay: '160ms' }}>
      <div className="rounded-lg border border-white/[0.06] bg-ink-brown-800 p-6 shadow-1">
        <div className="flex items-start gap-3">
          <span className="mt-1 text-[12px] leading-4 text-royal-purple" aria-hidden="true">✦</span>
          <div className="min-w-0">
            <p className="text-body leading-[22px] text-white/85">{creativityDashboard.prompt}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" onClick={() => onStart('Prompt: ' + creativityDashboard.prompt)} className="inline-flex h-11 items-center rounded-pill bg-domain-creativity/15 px-4 text-caption font-semibold leading-[18px] text-domain-creativity">
                Start creating
              </button>
              <Link
                href={`/features/journal?prompt=${encodeURIComponent(creativityDashboard.prompt)}`}
                className="inline-flex h-11 items-center rounded-pill border border-white/10 bg-ink-brown-800 px-4 text-caption font-semibold leading-[18px] text-white/60"
              >
                Reflect on this
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PracticeHeatmap() {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '240ms' }}>
      <Eyebrow>This week</Eyebrow>
      <Card variant="small" className="rounded-lg p-6">
        <CalendarHeatmap
          dayLabels={['M', 'T', 'W', 'T', 'F', 'S', 'S']}
          rows={[creativityDashboard.practiceWeek.cells]}
          tone="creativity"
          cellSize={32}
          summaryLeft={creativityDashboard.practiceWeek.total}
          summaryRight={creativityDashboard.practiceWeek.trend}
        />
      </Card>
    </section>
  )
}

function ActiveMissions() {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '320ms' }}>
      <Eyebrow>Active missions</Eyebrow>
      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 hide-scrollbar">
        {creativityDashboard.activeMissions.map((mission) => (
          <Link
            href="/tabs/goals/detail"
            key={mission.id}
            className="flex min-h-[120px] min-w-[100px] flex-col items-center justify-start rounded-lg border border-white/[0.06] bg-ink-brown-800 px-3 py-4 shadow-1"
          >
            <CreativityProgressCircle progress={mission.progress} />
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
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '400ms' }}>
      <Eyebrow>Consistency</Eyebrow>
      <Card variant="small" className="rounded-lg p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 text-h3 font-semibold leading-[22px] text-white">
            <Flame size={20} className="text-brand-orange" strokeWidth={2.2} />
            {creativityDashboard.streak.current}-day streak
          </div>
          <div className="text-caption leading-[18px] text-white/40">best: {creativityDashboard.streak.best}</div>
        </div>
        <div className="mt-4 grid grid-cols-7 gap-2">
          {creativityDashboard.streak.days.map((day, index) => (
            <div key={`${day.label}-${day.state}-${index}`} className="flex flex-col items-center gap-2">
              <span
                className={[
                  'flex h-8 w-8 items-center justify-center rounded-full border text-white',
                  day.state === 'complete' ? 'border-domain-creativity bg-domain-creativity' : '',
                  day.state === 'missed' ? 'border-transparent bg-white/[0.08]' : '',
                  day.state === 'today' ? 'border-domain-creativity border-dashed bg-white/[0.15]' : '',
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

function PortfolioTimeline() {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '480ms' }}>
      <Eyebrow>Creative journey</Eyebrow>
      <div className="-mx-4 overflow-x-auto px-4 pb-1 hide-scrollbar">
        <div className="relative flex min-w-[420px] items-center justify-between py-8">
          <div className="absolute left-8 right-8 top-1/2 h-px bg-domain-creativity/30" aria-hidden="true" />
          {creativityDashboard.timeline.map((milestone) => (
            <div key={milestone.id} className="relative z-10 flex w-20 flex-col items-center text-center">
              <div className="mb-3 h-8 w-8 rounded-xs border border-white/[0.06] bg-ink-brown-800" />
              <div className="min-h-[36px] text-caption leading-[18px] text-white/70">{milestone.label}</div>
              <span className="my-2 h-3 w-3 rounded-full bg-domain-creativity" aria-hidden="true" />
              <div className="text-small leading-[14px] text-white/30">{milestone.date}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ActivityLog() {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '560ms' }}>
      <Eyebrow>Recent activity</Eyebrow>
      <Card variant="small" className="rounded-lg p-0">
        {creativityDashboard.activity.map((entry, index) => (
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

export default function CreativityScreen() {
  const [sheetOpen, setSheetOpen] = useState(false)
  const [context, setContext] = useState('')
  const [minutes, setMinutes] = useState('')
  const [toast, setToast] = useState('')
  const openSheet = (value = '') => {
    setContext(value)
    setSheetOpen(true)
  }
  const save = () => {
    setSheetOpen(false)
    setToast('Creative session logged: +25 XP')
    window.setTimeout(() => setToast(''), 3000)
  }

  return (
    <PhoneFrame>
      <ScreenShell
        header={<DomainDashboardHeader title="Creativity" domain="creativity" variant="expanded" />}
        activeTab="me"
        bottomAction={<button type="button" onClick={() => openSheet()} className="mx-auto flex h-[48px] w-fit items-center justify-center gap-2 rounded-pill bg-brand-orange px-6 text-[15px] font-semibold leading-5 text-white shadow-2 shadow-brand-orange/30" aria-label="Log creative session"><Plus size={16} strokeWidth={2.4} />Log session</button>}
      >
        <main className="px-4 pb-6 pt-4">
          <SiaDotNote />
          <ActiveProjects />
          <InspirationPrompt onStart={openSheet} />
          <PracticeHeatmap />
          <ActiveMissions />
          <StreakTracker />
          <PortfolioTimeline />
          <ActivityLog />
        </main>
        {sheetOpen && (
          <div className="absolute inset-x-0 bottom-[84px] z-20 mx-3 rounded-xl border border-white/10 bg-ink-brown-800 p-4 shadow-2" role="dialog" aria-label="Log creative session">
            <div className="flex items-center justify-between">
              <h2 className="text-[17px] font-semibold text-white">Log creative session</h2>
              <button type="button" onClick={() => setSheetOpen(false)} className="flex h-11 w-11 items-center justify-center rounded-full text-white/60" aria-label="Cancel"><X size={18} /></button>
            </div>
            <label className="mt-3 block text-caption leading-[18px] text-white/50">Project or prompt
              <input value={context} onChange={(event) => setContext(event.target.value)} className="mt-1 h-11 w-full rounded-md border border-white/10 bg-ink-900 px-3 text-[15px] text-white outline-none" placeholder="Film edit, sketch, draft..." />
            </label>
            <label className="mt-3 block text-caption leading-[18px] text-white/50">Minutes
              <input value={minutes} onChange={(event) => setMinutes(event.target.value)} type="number" className="mt-1 h-11 w-full rounded-md border border-white/10 bg-ink-900 px-3 text-[15px] text-white outline-none" />
            </label>
            <div className="mt-3 rounded-md bg-ink-900 p-3 text-caption leading-[18px] text-white/55">Save attaches this session to your creative heatmap and selected project context.</div>
            <Button disabled={!context.trim() || !Number(minutes)} onClick={save} fullWidth variant="completion" className="mt-3">Save session</Button>
          </div>
        )}
        {toast && <div className="absolute inset-x-4 bottom-[96px] z-30 rounded-pill bg-forest-green px-4 py-3 text-[14px] font-semibold text-white shadow-2" role="status">{toast}</div>}
      </ScreenShell>
    </PhoneFrame>
  )
}
