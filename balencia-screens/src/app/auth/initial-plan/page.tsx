import { Button } from '@/components/design-system/Button'
import { Chip, domainToneClasses } from '@/components/design-system/Chip'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { SiaAvatarSmall } from '@/components/screens/MessageBubble'
import type { DomainKey } from '@/data/domains'
import { Circle, Link2, Pencil } from 'lucide-react'

// Screen 08 of 78: Initial plan
// Spec: /Users/hamza/yHealth/app_design 3/08-initial-plan-summary.md

type MissionPlan = {
  title: string
  domain: DomainKey
  domainLabel: string
  actions: string[]
  milestones: string[]
  connection?: { label: string; domain: DomainKey }
}

const missionPlans: MissionPlan[] = [
  {
    title: 'Run a half marathon',
    domain: 'fitness',
    domainLabel: 'Fitness',
    actions: ['Run 3x per week', 'Build to 5K', 'Register for race day'],
    milestones: ['5K base', '10K long run', 'Race ready'],
    connection: { label: 'Nutrition', domain: 'nutrition' },
  },
  {
    title: 'Save $5,000 by December',
    domain: 'finance',
    domainLabel: 'Finance',
    actions: ['Track expenses nightly', 'Set a weekly budget', 'Auto-save $200 monthly'],
    milestones: ['$1K', '$2.5K', '$5K'],
    connection: { label: 'Career', domain: 'career' },
  },
  {
    title: 'Read 2 books this month',
    domain: 'learning',
    domainLabel: 'Learning',
    actions: ['Read 30 minutes daily', 'Capture 3 notes per session', 'Review notes every Sunday'],
    milestones: ['Book one', 'Book two', 'Review notes'],
  },
]

function RpgStatusBar() {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-ink-brown-800 p-4 shadow-1">
      <div className="flex items-center justify-between">
        <span className="text-eyebrow font-semibold uppercase tracking-[0.12em] text-brand-orange">
          Level 1
        </span>
        <span className="text-eyebrow font-semibold uppercase tracking-[0.12em] text-white/50">
          0 XP
        </span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-pill bg-white/[0.08]">
        <div className="h-full w-0 rounded-pill bg-brand-orange" />
      </div>
    </div>
  )
}

function MissionPlanCard({ plan, highlighted = false }: { plan: MissionPlan; highlighted?: boolean }) {
  const tone = domainToneClasses[plan.domain]

  return (
    <article className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-ink-brown-800 p-4 pl-5 shadow-1">
      <div className={`absolute left-0 top-0 h-full w-1 ${highlighted ? tone.bar : 'bg-white/20'}`} />

      <div className="flex items-start gap-2">
        <Chip domain={plan.domain} selected className="h-6 px-2 text-small">
          {plan.domainLabel}
        </Chip>
        <h2 className="min-w-0 flex-1 text-h3 font-semibold leading-[22px] text-white">
          {plan.title}
        </h2>
        <Pencil size={16} className="mt-1 shrink-0 text-white/30" strokeWidth={1.8} />
      </div>

      <div className="mt-3 space-y-2">
        {plan.actions.map((action) => (
          <div key={action} className="flex items-center gap-2 text-[14px] leading-5 text-white/80">
            <Circle size={18} className="shrink-0 text-white/20" strokeWidth={1.8} />
            <span>{action}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {plan.milestones.map((milestone) => (
          <div key={milestone} className="text-center">
            <div className="mx-auto h-2 w-2 rounded-full border border-white/20" />
            <div className="mt-1 text-small leading-[14px] text-white/40">{milestone}</div>
          </div>
        ))}
      </div>

      {plan.connection && (
        <div className="mt-3 flex items-center gap-1.5 text-[12px] leading-4 text-white/40">
          <Link2 size={13} className="text-white/30" />
          <span>Connects to</span>
          <span className={domainToneClasses[plan.connection.domain].text}>
            {plan.connection.label}
          </span>
        </div>
      )}
    </article>
  )
}

export default function InitialPlanScreen() {
  return (
    <PhoneFrame>
      <ScreenShell showTabBar={false}>
        <div className="min-h-full px-4 pb-12 pt-6">
          <header className="animate-fade-up">
            <div className="flex items-center gap-2">
              <SiaAvatarSmall />
              <h1 className="text-h2 font-bold leading-[26px] text-white">
                Here&apos;s your plan.
              </h1>
            </div>
            <p className="mt-2 text-[15px] leading-[22px] text-white/70">
              I&apos;ve broken down your missions into daily actions across 3 life areas. Let&apos;s start.
            </p>
          </header>

          <div className="mt-6 animate-fade-up" style={{ animationDelay: '120ms' }}>
            <RpgStatusBar />
          </div>

          <div className="mt-6 space-y-4">
            {missionPlans.map((plan, index) => (
              <div
                key={plan.title}
                className="animate-fade-up"
                style={{ animationDelay: `${220 + index * 90}ms` }}
              >
                <MissionPlanCard plan={plan} highlighted={index === 0} />
              </div>
            ))}
          </div>

          <div className="mt-8 animate-fade-up" style={{ animationDelay: '520ms' }}>
            <Button size="auth" fullWidth className="shadow-[var(--glow-orange)]">
              Start your journey
            </Button>
          </div>

          <button
            className="mx-auto mt-4 flex h-11 animate-fade-up items-center justify-center px-4 text-[15px] font-semibold leading-5 text-brand-orange"
            style={{ animationDelay: '600ms' }}
          >
            Customize
          </button>
        </div>
      </ScreenShell>
    </PhoneFrame>
  )
}
