import Link from 'next/link'
import { CalendarDays, Circle, Plus } from 'lucide-react'
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
        <Link href={actionHref} className="flex h-8 items-center text-caption leading-[18px] text-brand-orange">
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
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-white/30 text-white/30">
              <Circle size={10} strokeWidth={2.4} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[15px] leading-5 text-white">{action.name}</div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.12em] text-white/40">
                  {action.type}
                </span>
                <span className="text-caption font-semibold leading-[18px] text-brand-orange">
                  +{action.xp} XP
                </span>
              </div>
            </div>
          </div>
        ))}
      </Card>
    </section>
  )
}

function SkillsSnapshot() {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '320ms' }}>
      <SectionTitle title="Growth trajectory" />
      <Card variant="small" className="p-4">
        <div className="mb-4 text-[15px] font-semibold leading-5 text-white">Skills snapshot</div>
        <div className="flex gap-3 overflow-x-auto pb-1 hide-scrollbar">
          {careerDashboard.skills.map((skill) => (
            <div
              key={skill.name}
              className="flex h-[78px] min-w-[66px] flex-col items-center justify-center rounded-lg bg-domain-career/15 px-3 text-center"
            >
              <span className="text-caption font-semibold leading-[18px] text-white">{skill.name}</span>
              <span className="mt-1 text-h2 font-bold leading-[26px] text-white tabular-nums">{skill.level}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[15px] leading-5 text-white/70">{careerDashboard.assessment}</p>
      </Card>
    </section>
  )
}

function UpcomingDeadlines() {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '400ms' }}>
      <SectionTitle title="Upcoming" />
      <Card variant="small" className="p-4">
        {careerDashboard.deadlines.map((deadline, index) => (
          <div
            key={deadline.name}
            className={[
              'flex min-h-[48px] items-center gap-3 py-3',
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
          </div>
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
