import Link from 'next/link'
import { ChevronLeft, ChevronRight, MessageCircle, Pencil, Pin } from 'lucide-react'
import { DomainTag } from '@/components/design-system/DomainTag'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { MissionTypeBadge } from '@/components/screens/MissionTypeBadge'
import { ProgressRing } from '@/components/screens/ProgressRing'
import { missionActions, missionConnections, missionMilestones, missions } from '@/data/mock'

// Screen 14 of 78: Mission detail
// Spec: /Users/hamza/yHealth/app_design 3/14-goal-detail.md

const mission = missions[0]
const nextAction = missionActions.find((action) => action.completed === false) ?? missionActions[0]

function DetailNav() {
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
          className="flex h-11 w-11 items-center justify-center rounded-full text-brand-orange transition-transform duration-[var(--dur-fast)] active:scale-90"
          aria-label="Pinned mission"
        >
          <Pin size={20} fill="currentColor" strokeWidth={1.8} />
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

function StatsCard() {
  const difficulty = mission.difficulty ?? 'moderate'
  const difficultyClass = {
    easy: 'bg-forest-green',
    moderate: 'bg-brand-orange',
    hard: 'bg-error-red',
  }[difficulty]

  return (
    <section className="rounded-md border border-white/[0.06] bg-ink-brown-800 p-5 shadow-1">
      <p className="text-[14px] leading-[18px] text-white/70">
        {mission.actionsCompleted} actions across {mission.lifeAreas} life areas
      </p>
      <div className="mt-2 flex items-center gap-4 text-[14px] font-semibold leading-[18px]">
        <span className="text-white/70">🔥 {mission.streak}d</span>
        <span className="text-brand-orange">⚡ {mission.xp} XP</span>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${difficultyClass}`} />
        <span className="text-caption leading-[18px] text-white/60">{difficulty}</span>
      </div>
    </section>
  )
}

function SiaMissionNote() {
  return (
    <section className="rounded-xl border border-white/[0.06] border-l-[3px] border-l-royal-purple/60 bg-ink-brown-800 p-6 shadow-1">
      <p className="text-small font-semibold uppercase leading-[14px] text-white/40">SIA</p>
      <p className="mt-2 text-[15px] leading-5 text-white/80">
        {mission.siaNote}
      </p>
    </section>
  )
}

function NextActionCard() {
  return (
    <section>
      <p className="mb-2 text-eyebrow font-semibold uppercase tracking-[0.12em] text-white/40">
        next up
      </p>
      <article className="rounded-xl border border-white/[0.06] bg-ink-brown-800 p-6 shadow-1">
        <div className="flex gap-3">
          <button
            type="button"
            className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-white/30"
            aria-label={`Complete next action: ${nextAction.name}`}
          />
          <div className="min-w-0 flex-1">
            <h2 className="text-body font-semibold leading-[22px] text-white">
              {nextAction.name}
            </h2>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-caption leading-[18px] text-white/50">
              <DomainTag domain={nextAction.domain} />
              <span>{nextAction.timeEstimate}</span>
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

function SectionToggle({ title, counter }: { title: string; counter?: string }) {
  return (
    <button
      type="button"
      className="flex h-12 w-full items-center gap-2 border-b border-white/[0.05] text-left transition-colors duration-[var(--dur-fast)] active:bg-white/[0.03]"
      aria-label={`${title}, collapsed`}
    >
      <ChevronRight size={14} className="text-white/40" strokeWidth={2} />
      <span className="min-w-0 flex-1 text-[15px] font-semibold leading-5 text-white/80">
        {title}
      </span>
      {counter && <span className="text-small leading-[14px] text-white/40">{counter}</span>}
    </button>
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
  const domains = mission.domains ?? [mission.domain]

  return (
    <PhoneFrame>
      <ScreenShell header={<DetailNav />} activeTab="goals">
        <main className="px-4 pb-16 pt-8">
          <section className="flex flex-col items-center animate-fade-up">
            <ProgressRing progress={mission.progress} size={96} label={`${mission.name} progress`} />
            <h2 className="mt-5 max-w-[300px] text-center text-h2 font-semibold leading-[26px] text-white">
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

          <div className="mt-6 animate-fade-up" style={{ animationDelay: '80ms' }}>
            <StatsCard />
          </div>

          <div className="mt-4 animate-fade-up" style={{ animationDelay: '160ms' }}>
            <SiaMissionNote />
          </div>

          <div className="mt-6 animate-fade-up" style={{ animationDelay: '240ms' }}>
            <NextActionCard />
          </div>

          <section className="mt-8 animate-fade-up" style={{ animationDelay: '320ms' }}>
            <SectionToggle title="All actions" counter={`${mission.actionsCompleted}/${mission.totalActions} done`} />
            <SectionToggle title="Milestones" counter={`${missionMilestones.length}`} />
            <SectionToggle title="Mission chain" counter={`${mission.chainPosition?.current} of ${mission.chainPosition?.total}`} />
            <SectionToggle title="SIA's reasoning" />
            <SectionToggle title="Cross-domain links" counter={`${missionConnections.length}`} />
            <SectionToggle title="Progress over time" />
          </section>

          <div className="mt-8 animate-fade-up" style={{ animationDelay: '400ms' }}>
            <AskSiaCard />
          </div>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
