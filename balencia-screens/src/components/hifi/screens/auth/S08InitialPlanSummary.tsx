'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AlertCircle, Apple, Briefcase, Check, ChevronLeft, Dumbbell, Pencil, Plus, WifiOff } from 'lucide-react'
import {
  BtnGhost,
  BtnPrimary,
  BtnSecondary,
  BtnSuccess,
  CIAInsightCard,
  GlassCard,
  HifiShell,
  ProgressRing,
  Provenance,
  SectionTitle,
  SolidCard,
} from '@/components/hifi/kit'

type PlanState = 'default' | 'minimal' | 'editing' | 'error' | 'offline' | 'success'

type PlanDomain = {
  name: 'Fitness' | 'Sleep' | 'Career' | 'Nutrition' | 'Finance' | 'Faith' | 'Productivity' | 'Relationships' | 'Wellbeing' | 'Meditation'
  value: number | null
  projected: number | null
  confidence: 'real' | 'low' | 'unassessed'
}

type PlanPayload = {
  stageLabel: string
  selectedAreaCount: number | null
  planStatusLabel: string
  areasLabel: string
  firstActionDuration: string
  readinessProvenance: string[]
  lifePower: { value: number | null; provenance: string }
  domains: PlanDomain[]
  milestones: Array<{ label: string; dateLabel: string }>
  currentMilestoneIndex: number
  mission: {
    title: string
    actions: string[]
    provenance: string
    connectedDomain: string
  }
}

const PLAN_STATES: PlanState[] = ['default', 'minimal', 'editing', 'error', 'offline', 'success']

// One explicit payload owns every displayed progress fact. The ten Domain Stat
// axes stay in the accepted canon order; null axes remain ghosted and are never
// converted into fabricated zeroes.
const PLAN_PAYLOAD: PlanPayload = {
  stageLabel: 'Day one',
  selectedAreaCount: 3,
  planStatusLabel: 'Ready',
  areasLabel: '3',
  firstActionDuration: '5 min',
  readinessProvenance: ['Your answers', 'CIA-generated'],
  lifePower: { value: 72, provenance: 'Via onboarding calc' },
  domains: [
    { name: 'Fitness', value: 18, projected: 55, confidence: 'real' },
    { name: 'Sleep', value: null, projected: null, confidence: 'unassessed' },
    { name: 'Career', value: 22, projected: 46, confidence: 'low' },
    { name: 'Nutrition', value: null, projected: null, confidence: 'unassessed' },
    { name: 'Finance', value: null, projected: null, confidence: 'unassessed' },
    { name: 'Faith', value: null, projected: null, confidence: 'unassessed' },
    { name: 'Productivity', value: null, projected: null, confidence: 'unassessed' },
    { name: 'Relationships', value: null, projected: null, confidence: 'unassessed' },
    { name: 'Wellbeing', value: null, projected: null, confidence: 'unassessed' },
    { name: 'Meditation', value: null, projected: null, confidence: 'unassessed' },
  ],
  milestones: [
    { label: 'Week 1', dateLabel: 'July 10' },
    { label: 'Week 4', dateLabel: 'July 31' },
    { label: 'Week 8', dateLabel: 'August 28' },
    { label: 'Week 12', dateLabel: 'September 25' },
    { label: 'Day 90', dateLabel: 'October 8' },
  ],
  currentMilestoneIndex: 0,
  mission: {
    title: 'Run a half marathon',
    actions: ['Run 3x per week', 'Stretch nightly', 'Add one easy recovery walk', 'Review pace each Sunday'],
    provenance: 'You selected',
    connectedDomain: 'Nutrition',
  },
}

const MINIMAL_PLAN_PAYLOAD: PlanPayload = {
  stageLabel: 'Starting point',
  selectedAreaCount: null,
  planStatusLabel: 'Starter',
  areasLabel: 'Not set',
  firstActionDuration: '5 min',
  readinessProvenance: ['CIA starter', 'Estimated'],
  lifePower: { value: null, provenance: 'Not enough context yet' },
  domains: PLAN_PAYLOAD.domains.map(domain => ({
    ...domain,
    value: null,
    projected: null,
    confidence: 'unassessed' as const,
  })),
  milestones: PLAN_PAYLOAD.milestones,
  currentMilestoneIndex: 0,
  mission: {
    title: 'Build a steady running rhythm',
    actions: ['Take a five-minute easy walk'],
    provenance: 'CIA starter · estimated',
    connectedDomain: 'Fitness',
  },
}

const CENTER = 100
const AXIS_RADIUS = 74
const SCALE_MAX = 99

function toXY(index: number, count: number, radius: number) {
  const angle = -Math.PI / 2 + (index / count) * Math.PI * 2
  return { x: CENTER + radius * Math.cos(angle), y: CENTER + radius * Math.sin(angle) }
}

function ConstellationRadar({ plan }: { plan: PlanPayload }) {
  const assessed = plan.domains
    .map((domain, index) => ({ domain, index }))
    .filter(({ domain }) => domain.value !== null)
  const baselinePoints = assessed.map(({ domain, index }) => toXY(index, plan.domains.length, AXIS_RADIUS * ((domain.value ?? 0) / SCALE_MAX)))
  const projectedPoints = assessed.map(({ domain, index }) => toXY(index, plan.domains.length, AXIS_RADIUS * ((domain.projected ?? 0) / SCALE_MAX)))
  const baselinePath = `M ${CENTER} ${CENTER} ${baselinePoints.map(point => `L ${point.x} ${point.y}`).join(' ')} Z`
  const projectedPath = `M ${CENTER} ${CENTER} ${projectedPoints.map(point => `L ${point.x} ${point.y}`).join(' ')} Z`
  const domainSummary = plan.domains.map(domain => {
    if (domain.value === null) return `${domain.name} not yet assessed`
    if (domain.confidence === 'low') return `${domain.name} estimated ${domain.value}, low confidence`
    return `${domain.name} baseline ${domain.value}`
  }).join('. ')

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[220px]"
      role="img"
      aria-label={`${plan.lifePower.value === null ? 'Life Power not yet assessed' : `Life Power ${plan.lifePower.value}, ${plan.lifePower.provenance}`}. Ten-domain radar. ${domainSummary}.`}
      data-domain-count={plan.domains.length}
    >
      <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
        {[0.33, 0.66, 1].map(scale => (
          <polygon
            key={scale}
            points={plan.domains.map((_, index) => {
              const point = toXY(index, plan.domains.length, AXIS_RADIUS * scale)
              return `${point.x},${point.y}`
            }).join(' ')}
            fill="none"
            className="stroke-white/10"
            strokeWidth="1"
          />
        ))}

        {plan.domains.map((domain, index) => {
          const tip = toXY(index, plan.domains.length, AXIS_RADIUS)
          return (
            <line
              key={domain.name}
              x1={CENTER}
              y1={CENTER}
              x2={tip.x}
              y2={tip.y}
              className={domain.value === null ? 'stroke-white/5' : 'stroke-white/15'}
              strokeWidth="1"
              strokeDasharray={domain.value === null ? '2 4' : undefined}
            />
          )
        })}

        {projectedPoints.length > 0 && (
          <path d={projectedPath} fill="none" className="stroke-royal-purple/60" strokeWidth="1.5" strokeDasharray="4 3" strokeLinejoin="round" />
        )}
        {baselinePoints.length > 0 && (
          <path d={baselinePath} className="fill-brand-orange/18 stroke-brand-orange" strokeWidth="2" strokeLinejoin="round" />
        )}

        {plan.domains.map((domain, index) => {
          if (domain.value === null) {
            const tip = toXY(index, plan.domains.length, AXIS_RADIUS)
            return <circle key={domain.name} cx={tip.x} cy={tip.y} r="1.75" className="fill-white/15" />
          }
          const point = toXY(index, plan.domains.length, AXIS_RADIUS * (domain.value / SCALE_MAX))
          return <circle key={domain.name} cx={point.x} cy={point.y} r="3" className="fill-brand-orange" />
        })}
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        {plan.lifePower.value === null ? (
          <div className="flex h-[84px] w-[84px] flex-col items-center justify-center rounded-full border border-dashed border-white/15 bg-ink-900/75 text-center">
            <span className="text-[24px] font-semibold text-paper-100/70">—</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-paper-100/55">Life Power</span>
            <span className="mt-0.5 text-[9px] text-paper-100/50">Not scored</span>
          </div>
        ) : (
          <ProgressRing
            percent={plan.lifePower.value}
            value={String(plan.lifePower.value)}
            label="Life Power"
            size={84}
            tone="you"
          />
        )}
        <span className="mt-1 text-[11px] font-medium tabular-nums text-paper-100/70">{plan.stageLabel}</span>
      </div>
    </div>
  )
}

function MilestoneTimeline({ plan }: { plan: PlanPayload }) {
  const current = plan.milestones[plan.currentMilestoneIndex]
  const accessibleSummary = `Plan timeline. ${plan.stageLabel}. Milestone ${plan.currentMilestoneIndex + 1} of ${plan.milestones.length}, ${current.label}, ${current.dateLabel}, current.`

  return (
    <div
      role="img"
      aria-label={accessibleSummary}
      data-current-index={plan.currentMilestoneIndex}
      data-current-label={`${current.label} · ${current.dateLabel}`}
      className="rounded-2xl border border-white/[0.06] bg-black/10 px-3 py-3"
    >
      <div aria-hidden="true">
        <div className="mb-2 flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-paper-100/65">{plan.stageLabel}</p>
            <p className="mt-1 text-[12px] font-medium text-paper-100">{current.label} · {current.dateLabel}</p>
          </div>
          <span className="rounded-pill border border-brand-orange/30 bg-brand-orange/10 px-2.5 py-1 text-[10px] font-semibold text-brand-orange">Current</span>
        </div>
        <div className="relative flex items-center justify-between">
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/10" />
          {plan.milestones.map((milestone, index) => (
            <span key={milestone.label} className="relative z-10 flex h-5 w-5 items-center justify-center rounded-full bg-ink-brown-800">
              {index === plan.currentMilestoneIndex ? (
                <span className="h-3 w-3 rounded-full border-2 border-brand-orange bg-ink-brown-800" />
              ) : index < plan.currentMilestoneIndex ? (
                <span className="h-2.5 w-2.5 rounded-full bg-forest-green" />
              ) : (
                <span className="h-2 w-2 rounded-full border border-white/25 bg-white/10" />
              )}
            </span>
          ))}
        </div>
        <div className="mt-1 flex justify-between text-[10px] font-medium text-paper-100/60">
          {plan.milestones.map(milestone => <span key={milestone.label}>{milestone.label.replace('Week ', 'W')}</span>)}
        </div>
      </div>
    </div>
  )
}

export function S08InitialPlanSummary() {
  const [screenState, setScreenState] = useState<PlanState>('default')
  const [planMode, setPlanMode] = useState<'full' | 'minimal'>('full')
  const [mission, setMission] = useState(PLAN_PAYLOAD.mission)
  const [draftTitle, setDraftTitle] = useState(PLAN_PAYLOAD.mission.title)
  const [draftAction, setDraftAction] = useState(PLAN_PAYLOAD.mission.actions[0])
  const [status, setStatus] = useState('')

  useEffect(() => {
    const fixture = new URLSearchParams(window.location.search).get('state') as PlanState | null
    if (!fixture || !PLAN_STATES.includes(fixture)) return
    const fixtureTimer = window.setTimeout(() => {
      setScreenState(fixture)
      if (fixture === 'minimal') {
        setPlanMode('minimal')
        setMission(MINIMAL_PLAN_PAYLOAD.mission)
        setDraftTitle(MINIMAL_PLAN_PAYLOAD.mission.title)
        setDraftAction(MINIMAL_PLAN_PAYLOAD.mission.actions[0])
      }
    }, 0)
    return () => window.clearTimeout(fixtureTimer)
  }, [])

  const activePlan: PlanPayload = {
    ...(planMode === 'minimal' ? MINIMAL_PLAN_PAYLOAD : PLAN_PAYLOAD),
    mission,
  }
  const assessedDomains = activePlan.domains.filter(domain => domain.value !== null)

  const startEditing = () => {
    setDraftTitle(mission.title)
    setDraftAction(mission.actions[0])
    setScreenState('editing')
    setStatus('Editing locally. No plan data has been sent.')
  }

  const saveEditing = () => {
    const nextTitle = draftTitle.trim() || mission.title
    const nextAction = draftAction.trim() || mission.actions[0]
    setMission(current => ({ ...current, title: nextTitle, actions: [nextAction, ...current.actions.slice(1)] }))
    setScreenState(planMode === 'minimal' ? 'minimal' : 'default')
    setStatus('Plan changes saved in this visual preview only.')
  }

  const cancelEditing = () => {
    setDraftTitle(mission.title)
    setDraftAction(mission.actions[0])
    setScreenState(planMode === 'minimal' ? 'minimal' : 'default')
    setStatus('Local edits cancelled.')
  }

  const enterToday = () => {
    if (screenState === 'offline') {
      setStatus('Offline. Your move to Today is queued locally and will finish when you reconnect.')
      return
    }
    setScreenState('success')
    setStatus('Today hand-off preview complete. No backend transition was requested.')
  }

  const displayedMission = activePlan.mission

  const bottomAction = screenState === 'error' ? (
    <BtnSecondary className="w-full" onClick={() => {
      setScreenState('default')
      setStatus('Plan preview restored locally.')
    }}>
      Retry plan preview
    </BtnSecondary>
  ) : screenState === 'editing' ? (
    <div className="space-y-2">
      <BtnPrimary className="w-full" onClick={saveEditing}>Save plan changes</BtnPrimary>
      <BtnGhost className="w-full" quiet onClick={cancelEditing}>Cancel edits</BtnGhost>
    </div>
  ) : screenState === 'success' ? (
    <BtnSuccess className="w-full" onClick={() => setStatus('Plan hand-off preview is already complete.')}>
      <Check aria-hidden="true" className="h-4 w-4" />
      Ready for Today
    </BtnSuccess>
  ) : (
    <div className="space-y-2">
      <BtnPrimary className="w-full" onClick={enterToday}>Enter Today</BtnPrimary>
      <BtnGhost className="w-full" onClick={startEditing}>Customize plan</BtnGhost>
    </div>
  )

  return (
    <HifiShell showTabBar={false} bottomAction={bottomAction} atmosphere="cia">
      <main className="space-y-4 px-4 pb-2 pt-1" data-plan-state={screenState}>
        <header className="flex h-11 items-center">
          <Link
            href="/screens/07"
            aria-label="Return to CIA onboarding"
            className="focus-ring flex h-11 w-11 items-center justify-center rounded-full text-paper-100/75"
          >
            <ChevronLeft aria-hidden="true" size={20} strokeWidth={1.9} />
          </Link>
          <h1 className="sr-only">Your initial plan summary</h1>
        </header>

        {screenState === 'offline' && (
          <div className="flex items-start gap-2 rounded-pill border border-white/10 bg-surface-2 px-4 py-3 text-left" role="status">
            <WifiOff aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-paper-100/70" />
            <p className="text-[12px] leading-4 text-paper-100/75">Offline · showing this local plan preview. Entering Today will queue locally.</p>
          </div>
        )}

        {status && (
          <p className="rounded-2xl border border-white/10 bg-surface-2 px-4 py-3 text-[12px] leading-4 text-paper-100/75" role="status" aria-live="polite">
            {status}
          </p>
        )}

        {screenState === 'error' ? (
          <GlassCard tone="muted" className="mt-8 text-center">
            <AlertCircle aria-hidden="true" className="mx-auto h-6 w-6 text-paper-100/70" strokeWidth={1.8} />
            <h2 className="mt-4 text-[20px] font-semibold text-paper-100">Your plan preview paused</h2>
            <p className="mt-2 text-[14px] leading-5 text-paper-100/70">Nothing was lost. Retry to restore the local day-one plan.</p>
          </GlassCard>
        ) : (
          <>
            <CIAInsightCard eyebrow="CIA plan" provenance={[activePlan.lifePower.provenance]}>
              <p>
                {planMode === 'minimal' ? (
                  <>Here&apos;s one small <span className="text-emphasis">starting point</span>. It is an estimated CIA starter, not a score built from your answers.</>
                ) : (
                  <>Here&apos;s your <span className="text-emphasis">plan</span>. I&apos;ve broken your mission into daily actions across {activePlan.selectedAreaCount} life areas.</>
                )}
              </p>
            </CIAInsightCard>

            {screenState === 'minimal' && (
              <div className="rounded-2xl border border-royal-purple/25 bg-royal-purple/10 px-4 py-3">
                <p className="text-[13px] font-medium text-paper-100">A small starting point</p>
                <p className="mt-1 text-[12px] leading-4 text-paper-100/70">One CIA starter mission is ready. It can grow as you add context.</p>
              </div>
            )}

            <GlassCard tone="you" className="!rounded-[40px]">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-paper-100/70">Life Power</span>
                <Provenance items={[activePlan.lifePower.provenance]} />
              </div>
              <div className="pt-3"><ConstellationRadar plan={activePlan} /></div>
              <p className="pt-3 text-center text-[12px] leading-4 text-paper-100/70">{activePlan.stageLabel} · this grows with you.</p>
            </GlassCard>

            <SolidCard className="glow-inner-you p-0">
              <div className="grid grid-cols-3 divide-x divide-white/10">
                <div className="px-3 py-3 text-center">
                  <p className="text-[10px] uppercase tracking-[0.1em] text-paper-100/65">Plan</p>
                  <p className="mt-0.5 text-[14px] font-semibold text-paper-100">{activePlan.planStatusLabel}</p>
                </div>
                <div className="px-3 py-3 text-center">
                  <p className="text-[10px] uppercase tracking-[0.1em] text-paper-100/65">Areas</p>
                  <p className="mt-0.5 text-[14px] font-semibold tabular-nums text-paper-100">{activePlan.areasLabel}</p>
                </div>
                <div className="px-3 py-3 text-center">
                  <p className="text-[10px] uppercase tracking-[0.1em] text-paper-100/65">First action</p>
                  <p className="mt-0.5 text-[14px] font-semibold text-paper-100">{activePlan.firstActionDuration}</p>
                </div>
              </div>
              <div className="flex justify-center border-t border-white/[0.06] px-3 py-2">
                <Provenance items={activePlan.readinessProvenance} />
              </div>
            </SolidCard>

            <section>
              <SectionTitle title="Your domain stats" />
              <div className="mt-2 space-y-2">
                {assessedDomains.map(domain => (
                  <div key={domain.name} className="flex min-h-14 items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-3">
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${domain.name === 'Fitness' ? 'bg-domain-fitness/15 text-domain-fitness' : 'bg-domain-career/15 text-domain-career'}`}>
                      {domain.name === 'Fitness'
                        ? <Dumbbell aria-hidden="true" size={24} strokeWidth={1.9} />
                        : <Briefcase aria-hidden="true" size={24} strokeWidth={1.9} />}
                    </span>
                    <span className="min-w-0 flex-1 text-[14px] font-semibold text-paper-100">{domain.name}</span>
                    <span className={`text-[17px] font-semibold tabular-nums ${domain.confidence === 'low' ? 'text-paper-100/70' : 'text-paper-100'}`}>
                      {domain.confidence === 'low' ? '~' : ''}{domain.value}
                    </span>
                    <Provenance items={[domain.confidence === 'low' ? 'Estimated · low confidence' : 'Via you logged']} />
                  </div>
                ))}
                {assessedDomains.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-4 py-4">
                    <p className="text-[13px] font-semibold text-paper-100">No Domain Stats yet</p>
                    <p className="mt-1 text-[12px] leading-4 text-paper-100/65">Add context when you are ready. Unassessed areas stay unscored.</p>
                  </div>
                )}
              </div>
            </section>

            <section>
              <SectionTitle title="Your missions" />
              <SolidCard className="glow-inner-done mt-2 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="inline-flex min-h-8 items-center gap-1.5 rounded-pill border border-domain-fitness/25 bg-domain-fitness/15 px-3 py-1.5 text-[11px] font-semibold text-domain-fitness">
                    <Dumbbell aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
                    Fitness
                  </span>
                  <button
                    type="button"
                    aria-label={`Edit mission: ${displayedMission.title}`}
                    className="focus-ring flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-paper-100/70"
                    onClick={startEditing}
                  >
                    <Pencil aria-hidden="true" size={18} strokeWidth={1.9} />
                  </button>
                </div>

                {screenState === 'editing' ? (
                  <div className="space-y-3 rounded-2xl border border-brand-orange/30 bg-black/15 p-3">
                    <label htmlFor="plan-mission-title" className="block text-[12px] font-semibold text-paper-100/75">Mission name</label>
                    <input
                      id="plan-mission-title"
                      name="mission-title"
                      value={draftTitle}
                      onChange={event => setDraftTitle(event.currentTarget.value)}
                      className="focus-ring h-12 w-full rounded-[14px] border border-white/15 bg-ink-900/60 px-4 text-[16px] text-paper-100 outline-none"
                      autoComplete="off"
                    />
                    <label htmlFor="plan-first-action" className="block text-[12px] font-semibold text-paper-100/75">First action</label>
                    <input
                      id="plan-first-action"
                      name="first-action"
                      value={draftAction}
                      onChange={event => setDraftAction(event.currentTarget.value)}
                      className="focus-ring h-12 w-full rounded-[14px] border border-white/15 bg-ink-900/60 px-4 text-[16px] text-paper-100 outline-none"
                      autoComplete="off"
                    />
                    <p className="text-[11px] leading-4 text-paper-100/65">Edits stay inside this visual prototype.</p>
                  </div>
                ) : (
                  <>
                    <div>
                      <h2 className="text-[16px] font-semibold text-paper-100">{displayedMission.title}</h2>
                      <div className="mt-1"><Provenance items={[displayedMission.provenance]} /></div>
                    </div>
                    <div className="space-y-1.5">
                      {displayedMission.actions.slice(0, 2).map(action => (
                        <p key={action} className="flex items-center gap-2 text-[12px] text-paper-100/75">
                          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
                          {action}
                        </p>
                      ))}
                      {displayedMission.actions.length > 2 && (
                        <p className="flex items-center gap-1.5 pl-3 text-[11px] text-paper-100/65">
                          <Plus aria-hidden="true" size={12} strokeWidth={2} />
                          And {displayedMission.actions.length - 2} more actions
                        </p>
                      )}
                    </div>
                  </>
                )}

                <MilestoneTimeline plan={activePlan} />
                <div className="flex items-center gap-1.5 border-t border-white/[0.06] pt-3">
                  <span className="text-[11px] text-paper-100/65">Connects to</span>
                  <span className="inline-flex min-h-8 items-center gap-1.5 rounded-pill border border-domain-nutrition/25 bg-domain-nutrition/15 px-3 py-1.5 text-[11px] font-semibold text-domain-nutrition">
                    <Apple aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
                    {activePlan.mission.connectedDomain}
                  </span>
                </div>
              </SolidCard>
            </section>
          </>
        )}
      </main>
    </HifiShell>
  )
}
