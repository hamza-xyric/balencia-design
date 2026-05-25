import { Check, ChevronRight, Flame, Flower2, Leaf, Pause } from 'lucide-react'
import { Card } from '@/components/design-system/Card'
import { Chip } from '@/components/design-system/Chip'
import { DomainDashboardHeader } from '@/components/domain/DomainDashboardHeader'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { yogaSessions } from '@/data/mock'

// Screen 55 of 78: Yoga sessions
// Spec: /Users/hamza/yHealth/app_design 3/55-yoga-sessions.md

const difficultyClasses: Record<string, string> = {
  beginner: 'bg-domain-wellbeing/15 text-domain-wellbeing',
  intermediate: 'bg-stalled-amber/15 text-stalled-amber',
  advanced: 'bg-domain-fitness/15 text-domain-fitness',
}

const difficultyLabels: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

function sentenceLabel(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function StreakBanner() {
  return (
    <Card className="relative overflow-hidden p-5 animate-fade-up">
      <div className="absolute inset-x-0 top-0 h-10 bg-domain-wellbeing/10 blur-xl" aria-hidden="true" />
      <div className="relative flex items-center gap-3">
        <Flame size={24} className="shrink-0 text-brand-orange" fill="currentColor" strokeWidth={2.1} />
        <div>
          <h2 className="text-h2 font-bold leading-[26px] text-white">{yogaSessions.streak.current}</h2>
          <p className="mt-1 text-caption leading-[18px] text-white/50">{yogaSessions.streak.longest}</p>
        </div>
      </div>
    </Card>
  )
}

function SiaYogaNote() {
  return (
    <Card className="mt-4 p-5 animate-fade-up" style={{ animationDelay: '80ms' }}>
      <div className="flex gap-3">
        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-royal-purple" />
        <p className="text-[15px] leading-[22px] text-white">{yogaSessions.siaNote}</p>
      </div>
    </Card>
  )
}

function DifficultyFilters() {
  return (
    <div className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 hide-scrollbar animate-fade-up" style={{ animationDelay: '160ms' }}>
      {yogaSessions.filters.map((filter, index) => (
        <Chip key={filter} selected={index === 0} className="shrink-0">
          {sentenceLabel(filter)}
        </Chip>
      ))}
    </div>
  )
}

function SessionCard({ session, index }: { session: (typeof yogaSessions.sessions)[number]; index: number }) {
  return (
    <Card className="p-5 animate-fade-up" style={{ animationDelay: `${240 + index * 80}ms` }}>
      <div className="h-20 rounded-md bg-gradient-to-br from-domain-wellbeing/20 via-ink-brown-800 to-ink-900 p-4">
        <div className="flex h-full items-center justify-center text-domain-wellbeing/80">
          <Flower2 size={34} strokeWidth={1.6} />
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-h3 font-semibold leading-[22px] text-white">{session.name}</h2>
          <p className="mt-1 text-caption leading-[18px] text-white/50">{session.duration} . {session.poses} poses</p>
        </div>
        <span className={`rounded-pill px-2.5 py-1 text-small font-semibold leading-3 ${difficultyClasses[session.difficulty]}`}>
          {difficultyLabels[session.difficulty] ?? session.difficulty}
        </span>
      </div>
      {session.completed ? (
        <div className="mt-4 flex h-12 items-center justify-center gap-2 rounded-pill border border-forest-green/20 bg-forest-green/10 text-body font-semibold leading-[22px] text-forest-green">
          <Check size={16} strokeWidth={2.4} />
          Completed
        </div>
      ) : (
        <button type="button" className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-pill bg-brand-orange text-body font-semibold leading-[22px] text-white">
          Start session
          <ChevronRight size={16} strokeWidth={2.2} />
        </button>
      )}
    </Card>
  )
}

function PoseLibrary() {
  return (
    <section className="mt-7 animate-fade-up" style={{ animationDelay: '520ms' }}>
      <div className="mb-3 flex h-8 items-center justify-between px-1">
        <h2 className="text-[18px] font-semibold leading-6 text-white">Pose library</h2>
        <button type="button" className="text-caption leading-[18px] text-brand-orange">See all</button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {yogaSessions.poses.map((pose) => (
          <Card key={pose.id} variant="small" className="rounded-md p-2 text-center">
            <div className="flex aspect-square items-center justify-center rounded-sm bg-domain-wellbeing/10 text-domain-wellbeing">
              <Leaf size={22} strokeWidth={1.8} />
            </div>
            <div className="mt-2 truncate text-small font-semibold leading-[14px] text-white">{pose.name}</div>
            <span className={['mx-auto mt-1 block h-1.5 w-1.5 rounded-full', pose.difficulty === 'beginner' ? 'bg-domain-wellbeing' : pose.difficulty === 'intermediate' ? 'bg-stalled-amber' : 'bg-domain-fitness'].join(' ')} />
          </Card>
        ))}
      </div>
    </section>
  )
}

function StatsSection() {
  return (
    <section className="mt-7 animate-fade-up" style={{ animationDelay: '600ms' }}>
      <div className="mb-3 px-1 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">
        Your stats
      </div>
      <div className="grid grid-cols-3 gap-2">
        {yogaSessions.stats.slice(0, 3).map((stat) => (
          <Card key={stat.label} variant="small" className="rounded-md p-3 text-center">
            <div className="text-h2 font-semibold leading-[26px] text-white">{stat.value}</div>
            <div className="mt-1 text-small leading-[14px] text-white/50">{stat.label}</div>
          </Card>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {yogaSessions.stats.slice(3).map((stat) => (
          <Card key={stat.label} variant="small" className="rounded-md p-3 text-center">
            <div className="text-h2 font-semibold leading-[26px] text-white">{stat.value}</div>
            <div className="mt-1 text-small leading-[14px] text-white/50">{stat.label}</div>
          </Card>
        ))}
      </div>
    </section>
  )
}

function ActiveSessionPreview() {
  return (
    <Card className="mt-7 p-5 animate-fade-up" style={{ animationDelay: '680ms' }}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-h3 font-semibold leading-[22px] text-white">Yoga session</h2>
          <p className="mt-1 text-caption leading-[18px] text-white/50">Pose 4 of 12</p>
        </div>
        <span className="text-[15px] font-semibold leading-5 text-brand-orange tabular-nums">03:42</span>
      </div>
      <div className="mt-4 rounded-lg bg-gradient-to-br from-domain-wellbeing/20 via-ink-brown-800 to-ink-900 p-5 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-domain-wellbeing/15 text-domain-wellbeing">
          <Flower2 size={30} strokeWidth={1.7} />
        </div>
        <h3 className="mt-3 text-h2 font-semibold leading-[26px] text-white">Warrior II</h3>
        <p className="mt-1 text-[15px] leading-5 text-white/50">Hold for 45 seconds</p>
      </div>
      <div className="mx-auto mt-5 flex h-28 w-28 items-center justify-center rounded-full border-[6px] border-domain-wellbeing bg-domain-wellbeing/10 text-display-l font-semibold leading-10 text-white tabular-nums">
        0:32
      </div>
      <Card variant="small" className="mt-5 rounded-md p-4">
        <div className="text-caption font-semibold leading-[18px] text-white/50">Instructions:</div>
        <p className="mt-1 line-clamp-3 text-[14px] leading-5 text-white/70">
          Stand with feet wide apart. Extend arms parallel to the floor. Bend front knee to 90 degrees.
        </p>
      </Card>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button type="button" className="h-12 rounded-pill border border-white/10 bg-ink-900 text-[15px] font-semibold leading-5 text-white/60">
          Skip pose
        </button>
        <button type="button" className="flex h-12 items-center justify-center gap-2 rounded-pill border border-white/10 bg-ink-900 text-[15px] font-semibold leading-5 text-white">
          <Pause size={15} fill="currentColor" strokeWidth={2.1} />
          Pause
        </button>
      </div>
      <div className="mt-4 flex gap-2 text-caption leading-[18px] text-white/70">
        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-royal-purple" />
        <span>Breathe deeply. Keep your shoulders relaxed.</span>
      </div>
    </Card>
  )
}

export default function YogaSessionsScreen() {
  return (
    <PhoneFrame>
      <ScreenShell header={<DomainDashboardHeader title="Yoga sessions" domain="wellbeing" level={8} />} activeTab="me">
        <main className="px-4 pb-20 pt-4">
          <StreakBanner />
          <SiaYogaNote />
          <DifficultyFilters />
          <section className="mt-5">
            <div className="mb-3 px-1 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">
              Guided sessions
            </div>
            <div className="space-y-3">
              {yogaSessions.sessions.map((session, index) => (
                <SessionCard key={session.id} session={session} index={index} />
              ))}
            </div>
          </section>
          <PoseLibrary />
          <StatsSection />
          <ActiveSessionPreview />
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
