'use client'

import Link from 'next/link'
import { Check, ChevronLeft, ChevronRight, MessageCircle, Pencil, Pin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { DomainTag } from '@/components/design-system/DomainTag'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { MissionTypeBadge } from '@/components/screens/MissionTypeBadge'
import { ProgressRing } from '@/components/screens/ProgressRing'
import { missionActions, missionChain, missionConnections, missionMilestones, missions, type Mission, type MissionAction, type MissionType } from '@/data/mock'
import type { DomainKey } from '@/data/domains'

// Screen 14 of 78: Mission detail
// Spec: /Users/hamza/yHealth/app_design 3/14-goal-detail.md

const defaultMission = missions[0]
const defaultNextAction = missionActions.find((action) => action.completed === false) ?? missionActions[0]

function DetailNav({ mission, pinned, onPin }: { mission: Mission; pinned: boolean; onPin: () => void }) {
  return (
    <header className="flex h-11 shrink-0 items-center justify-between bg-ink-900 px-2">
      <Link
        href="/tabs/goals"
        className="flex h-11 w-11 items-center justify-center rounded-full text-white transition-transform duration-[var(--dur-fast)] active:scale-95"
        aria-label="Back to mission board"
      >
        <ChevronLeft size={20} strokeWidth={2} />
      </Link>
      <h1 className="max-w-[190px] truncate text-[17px] font-semibold leading-[22px] text-white">
        {mission.name}
      </h1>
      <div className="flex items-center">
        <button
          type="button"
          onClick={onPin}
          className="flex h-11 w-11 items-center justify-center rounded-full text-brand-orange transition-transform duration-[var(--dur-fast)] active:scale-90"
          aria-label={pinned ? 'Unpin mission' : 'Pin mission'}
          aria-pressed={pinned}
        >
          <Pin size={20} fill={pinned ? 'currentColor' : 'none'} strokeWidth={1.8} />
        </button>
        <Link
          href="/tabs/goals/create"
          className="flex h-11 w-11 items-center justify-center rounded-full text-white transition-transform duration-[var(--dur-fast)] active:scale-90"
          aria-label="Edit mission"
        >
          <Pencil size={20} strokeWidth={1.8} />
        </Link>
      </div>
    </header>
  )
}

function StatsCard({ mission, actionsCompleted, xp }: { mission: Mission; actionsCompleted: number; xp: number }) {
  const difficulty = mission.difficulty ?? 'moderate'
  const difficultyClass = {
    easy: 'bg-forest-green',
    moderate: 'bg-brand-orange',
    hard: 'bg-error-red',
  }[difficulty]

  return (
    <section className="rounded-md border border-white/[0.06] bg-ink-brown-800 p-5 shadow-1">
      <p className="text-[14px] leading-[18px] text-white/70">
        {actionsCompleted} actions across {mission.lifeAreas} life areas
      </p>
      <div className="mt-2 flex items-center gap-4 text-[14px] font-semibold leading-[18px]">
        <span className="text-white/70">🔥 {mission.streak}d</span>
        <span className="text-brand-orange">⚡ {xp} XP</span>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${difficultyClass}`} />
        <span className="text-caption leading-[18px] text-white/60">{difficulty}</span>
      </div>
    </section>
  )
}

function SiaMissionNote({ mission }: { mission: Mission }) {
  return (
    <section className="rounded-xl border border-white/[0.06] border-l-[3px] border-l-royal-purple/60 bg-ink-brown-800 p-6 shadow-1">
      <p className="text-small font-semibold uppercase leading-[14px] text-white/40">SIA</p>
      <p className="mt-2 text-[15px] leading-5 text-white/80">
        {mission.siaNote}
      </p>
    </section>
  )
}

function NextActionCard({ action, complete, completed }: { action: MissionAction; complete: () => void; completed: boolean }) {
  return (
    <section>
      <p className="mb-2 text-eyebrow font-semibold uppercase tracking-[0.12em] text-white/40">
        next up
      </p>
      <article className="rounded-xl border border-white/[0.06] bg-ink-brown-800 p-6 shadow-1">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={complete}
            className={['mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2', completed ? 'border-forest-green bg-forest-green text-white' : 'border-white/30'].join(' ')}
            aria-label={`${completed ? 'Undo completion for' : 'Complete next action'}: ${action.name}`}
            aria-pressed={completed}
          >
            {completed && <Check size={18} strokeWidth={2.4} />}
          </button>
          <div className="min-w-0 flex-1">
            <h2 className="text-body font-semibold leading-[22px] text-white">
              {action.name}
            </h2>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-caption leading-[18px] text-white/50">
              <DomainTag domain={action.domain} />
              <span>{action.timeEstimate}</span>
            </div>
            <p className="mt-2 text-caption leading-[18px] text-white/50">
              This builds the endurance base.
            </p>
          </div>
        </div>
      </article>
    </section>
  )
}

function missionFromRouteParams(params: URLSearchParams): Mission | null {
  const missionId = params.get('mission')
  const matchedMission = missionId ? missions.find((item) => item.id === missionId) : undefined
  if (matchedMission) return matchedMission

  const title = params.get('title')?.trim()
  if (!title) return null

  const type = (params.get('type') || defaultMission.type) as MissionType
  const routeDomains = (params.get('domains') || defaultMission.domain)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean) as DomainKey[]
  const primaryDomain = routeDomains[0] ?? defaultMission.domain
  const status = params.get('status') === 'completed' ? 'completed' : params.get('status') === 'paused' ? 'paused' : 'active'
  const progress = status === 'completed' ? 1 : Number(params.get('progress') ?? 0)

  return {
    ...defaultMission,
    id: `route-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    name: title,
    type,
    domain: primaryDomain,
    domains: routeDomains,
    progress: Number.isFinite(progress) ? Math.max(0, Math.min(progress, 1)) : 0,
    xp: Number(params.get('xp') ?? 0),
    streak: Number(params.get('streak') ?? 0),
    pinned: params.get('source') === 'today',
    status,
    actionsCompleted: status === 'completed' ? 1 : 0,
    totalActions: Math.max(1, Number(params.get('totalActions') ?? 3)),
    lifeAreas: routeDomains.length,
    chainPosition: null,
    nextAction: params.get('next') || (status === 'completed' ? 'Review mission archive' : 'Review plan with SIA'),
    siaNote: status === 'completed'
      ? 'This archived mission detail is preserved from your journal history.'
      : 'Created from your SIA plan. Tracking starts today, and you can edit the plan before first check-in.',
  }
}

function SectionToggle({ title, counter, children }: { title: string; counter?: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-white/[0.05] last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-12 w-full items-center gap-2 text-left transition-colors duration-[var(--dur-fast)] active:bg-white/[0.03]"
        aria-expanded={open}
      >
        <ChevronRight size={14} className={['text-white/40 transition-transform', open ? 'rotate-90' : ''].join(' ')} strokeWidth={2} />
        <span className="min-w-0 flex-1 text-[15px] font-semibold leading-5 text-white/80">
          {title}
        </span>
        {counter && <span className="text-small leading-[14px] text-white/40">{counter}</span>}
      </button>
      {open && <div className="pb-4 pl-6 pr-2">{children}</div>}
    </div>
  )
}

function AskSiaCard() {
  return (
    <Link
      href="/tabs/sia"
      className="flex h-14 items-center gap-3 rounded-xl border border-white/[0.06] bg-ink-brown-800 px-6 shadow-1 transition-transform duration-[var(--dur-fast)] active:scale-[0.98]"
      aria-label="Ask SIA about this mission"
    >
      <MessageCircle size={20} className="text-brand-orange" strokeWidth={1.8} />
      <span className="min-w-0 flex-1 text-[15px] font-semibold leading-5 text-white">
        Ask SIA about this mission
      </span>
      <ChevronRight size={14} className="text-white/40" strokeWidth={1.8} />
    </Link>
  )
}

export default function MissionDetailScreen() {
  const [mission, setMission] = useState<Mission>(defaultMission)
  const domains = mission.domains ?? [mission.domain]
  const [pinned, setPinned] = useState(Boolean(mission.pinned))
  const [actionDone, setActionDone] = useState(false)
  const [notice, setNotice] = useState('')
  const nextAction: MissionAction = mission.id.startsWith('route-')
    ? {
      ...defaultNextAction,
      id: `${mission.id}-next`,
      name: mission.nextAction,
      domain: mission.domain,
      completed: false,
      timeEstimate: defaultNextAction.timeEstimate ?? '15 min',
      xp: defaultNextAction.xp ?? 25,
    }
    : defaultNextAction
  const baseCompleted = mission.actionsCompleted ?? 0
  const totalActions = mission.totalActions ?? missionActions.length
  const actionsCompleted = baseCompleted + (actionDone ? 1 : 0)
  const progress = actionDone ? Math.min(1, (baseCompleted + 1) / totalActions) : mission.progress
  const xp = mission.xp + (actionDone ? (nextAction.xp ?? 0) : 0)
  const displayActions = mission.id.startsWith('route-') ? [nextAction] : missionActions

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const routeMission = missionFromRouteParams(new URLSearchParams(window.location.search))
      if (!routeMission) return
      setMission(routeMission)
      setPinned(Boolean(routeMission.pinned))
      setActionDone(false)
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])
  const updatePin = () => {
    setPinned((current) => {
      const next = !current
      setNotice(next ? 'Mission pinned to Today.' : 'Mission unpinned from Today.')
      return next
    })
  }

  return (
    <PhoneFrame>
      <ScreenShell header={<DetailNav mission={mission} pinned={pinned} onPin={updatePin} />} activeTab="goals">
        <main className="px-4 pb-20 pt-3">
          <section className="flex flex-col items-center animate-fade-up">
            <ProgressRing progress={progress} size={96} label={`${mission.name} progress`} />
            <h2 className="mt-3 max-w-[300px] text-center text-h2 font-semibold leading-[26px] text-white">
              {mission.name}
            </h2>
            <div className="mt-2 flex justify-center">
              <MissionTypeBadge type={mission.type} />
            </div>
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              {domains.map((domain) => (
                <DomainTag key={domain} domain={domain} />
              ))}
            </div>
          </section>

          <div className="mt-4 animate-fade-up" style={{ animationDelay: '80ms' }}>
            <StatsCard mission={mission} actionsCompleted={actionsCompleted} xp={xp} />
          </div>

          <div className="mt-3 animate-fade-up" style={{ animationDelay: '160ms' }}>
            <SiaMissionNote mission={mission} />
          </div>

          <div className="mt-4 animate-fade-up" style={{ animationDelay: '240ms' }}>
            <NextActionCard action={nextAction} complete={() => { setActionDone(!actionDone); setNotice(actionDone ? 'Completion undone.' : 'Next action completed. Progress and XP updated.') }} completed={actionDone} />
            {notice && <p className="mt-3 text-caption leading-[18px] text-forest-green" aria-live="polite">{notice}</p>}
          </div>

          <section className="mt-8 animate-fade-up" style={{ animationDelay: '320ms' }}>
            <SectionToggle title="All actions" counter={`${actionsCompleted}/${totalActions} done`}>
              <div className="space-y-2">
                {displayActions.map((action) => {
                  const complete = action.completed || (action.id === nextAction.id && actionDone)
                  return (
                    <div key={action.id} className="flex min-h-11 items-center gap-3 rounded-md bg-white/[0.03] px-3 py-2">
                      <span className={['flex h-7 w-7 shrink-0 items-center justify-center rounded-full border', complete ? 'border-forest-green bg-forest-green text-white' : 'border-white/15 text-white/25'].join(' ')}>
                        {complete && <Check size={14} strokeWidth={2.4} />}
                      </span>
                      <span className={['min-w-0 flex-1 text-caption leading-[18px]', complete ? 'text-white/45 line-through' : 'text-white/70'].join(' ')}>{action.name}</span>
                      {action.xp && <span className="text-small font-semibold leading-[14px] text-brand-orange">+{action.xp}</span>}
                    </div>
                  )
                })}
              </div>
            </SectionToggle>
            <SectionToggle title="Milestones" counter={`${missionMilestones.length}`}>
              <div className="space-y-2">
                {missionMilestones.map((milestone) => (
                  <div key={milestone.id} className="rounded-md bg-white/[0.03] px-3 py-2">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-caption font-semibold leading-[18px] text-white/75">{milestone.name}</span>
                      <span className="text-small leading-[14px] text-white/40">{milestone.date}</span>
                    </div>
                    <p className="mt-1 text-small capitalize leading-[14px] text-brand-orange">{milestone.status}</p>
                  </div>
                ))}
              </div>
            </SectionToggle>
            <SectionToggle title="Mission chain" counter={mission.chainPosition ? `${mission.chainPosition.current} of ${mission.chainPosition.total}` : 'New'}>
              <div className="space-y-2">
                {missionChain.map((step) => (
                  <div key={step.id} className="flex min-h-11 items-center gap-3 rounded-md bg-white/[0.03] px-3 py-2">
                    <MissionTypeBadge type={step.type} />
                    <span className="min-w-0 flex-1 text-caption leading-[18px] text-white/70">{step.name}</span>
                    <span className="text-small capitalize leading-[14px] text-white/40">{step.status}</span>
                  </div>
                ))}
              </div>
            </SectionToggle>
            <SectionToggle title="SIA's reasoning">
              <p className="rounded-md bg-royal-purple/10 px-3 py-3 text-caption leading-[18px] text-white/60">
                Tempo work is the highest leverage next step because your recovery is steady and your long-run base is already consistent.
              </p>
            </SectionToggle>
            <SectionToggle title="Cross-domain links" counter={`${missionConnections.length}`}>
              <div className="space-y-2">
                {missionConnections.map((connection) => (
                  <div key={connection.id} className="rounded-md bg-white/[0.03] px-3 py-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-caption font-semibold leading-[18px] text-white/75">{connection.name}</span>
                      {connection.domains.map((domain) => <DomainTag key={domain} domain={domain} />)}
                    </div>
                    <p className="mt-2 text-caption leading-[18px] text-white/50">{connection.text}</p>
                  </div>
                ))}
              </div>
            </SectionToggle>
            <SectionToggle title="Progress over time">
              <div className="rounded-md bg-white/[0.03] px-3 py-3">
                <div className="h-2 overflow-hidden rounded-pill bg-white/[0.08]">
                  <div className="h-full rounded-pill bg-brand-orange" style={{ width: `${Math.round(progress * 100)}%` }} />
                </div>
                <p className="mt-2 text-caption leading-[18px] text-white/50">
                  {Math.round(progress * 100)}% complete. {actionDone ? 'Today added one action and 75 XP.' : 'One tempo run will move this mission to the final action.'}
                </p>
              </div>
            </SectionToggle>
          </section>

          <div className="mt-8 animate-fade-up" style={{ animationDelay: '400ms' }}>
            <AskSiaCard />
          </div>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
