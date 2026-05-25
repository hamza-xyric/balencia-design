import { Pause, SkipForward, Square } from 'lucide-react'
import { Card } from '@/components/design-system/Card'
import { Chip } from '@/components/design-system/Chip'
import { DomainDashboardHeader } from '@/components/domain/DomainDashboardHeader'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { meditationLibrary } from '@/data/mock'

// Screen 54 of 78: Meditation
// Spec: /Users/hamza/yHealth/app_design 3/54-meditation-mindfulness.md

function FilterChips() {
  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 hide-scrollbar animate-fade-up">
      {meditationLibrary.filters.map((filter, index) => (
        <Chip key={filter} domain="wellbeing" selected={index === 0} className="shrink-0">
          {filter}
        </Chip>
      ))}
    </div>
  )
}

function SiaRecommendation() {
  return (
    <Card className="mt-4 p-5 animate-fade-up" style={{ animationDelay: '80ms' }}>
      <div className="flex gap-3">
        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-royal-purple" />
        <div className="min-w-0 flex-1">
          <p className="text-[15px] leading-[22px] text-white">{meditationLibrary.siaNote}</p>
          <div className="mt-3 text-right text-caption font-semibold leading-[18px] text-brand-orange">Begin session</div>
        </div>
      </div>
    </Card>
  )
}

function CategoryTag({ category }: { category: string }) {
  const classes =
    category === 'Quick reset' ? 'bg-brand-orange/15 text-brand-orange' :
    category === 'Evening' ? 'bg-domain-wellbeing/10 text-domain-wellbeing/80' :
    'bg-domain-wellbeing/15 text-domain-wellbeing'

  return <span className={`rounded-sm px-2 py-1 text-small font-semibold leading-3 ${classes}`}>{category}</span>
}

function PracticeCard({ practice, index }: { practice: (typeof meditationLibrary.practices)[number]; index: number }) {
  return (
    <Card className="p-5 animate-fade-up" style={{ animationDelay: `${160 + index * 80}ms` }}>
      <div className="flex items-start justify-between gap-3">
        <h2 className="min-w-0 flex-1 text-body font-semibold leading-[22px] text-white">{practice.name}</h2>
        <span className="shrink-0 text-caption leading-[18px] text-white/50">{practice.duration}</span>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <CategoryTag category={practice.category} />
        {practice.recommended && <span className="rounded-pill bg-brand-orange/15 px-2 py-1 text-small font-semibold leading-3 text-brand-orange">New</span>}
      </div>
      <p className="mt-3 line-clamp-2 text-caption leading-[18px] text-white/70">{practice.why}</p>
      <p className="mt-3 text-small leading-[14px] text-white/40">{practice.when}</p>
    </Card>
  )
}

function MindfulnessStreak() {
  return (
    <section className="mt-7 animate-fade-up" style={{ animationDelay: '520ms' }}>
      <div className="mb-3 px-1 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">
        Mindfulness streak
      </div>
      <Card>
        <div className="grid grid-cols-7 gap-2">
          {meditationLibrary.streakDays.map((day, index) => (
            <div key={`${day.day}-${index}`} className="text-center">
              <div className="text-small leading-[14px] text-white/40">{day.day}</div>
              <span className={['mx-auto mt-2 block h-3 w-3 rounded-full', day.done ? 'bg-domain-wellbeing' : index === 5 ? 'border border-dashed border-white/30 bg-white/10' : 'bg-white/10'].join(' ')} />
            </div>
          ))}
        </div>
        <div className="mt-5 text-[15px] font-semibold leading-5 text-brand-orange">14 days</div>
      </Card>
    </section>
  )
}

function StatsSection() {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '600ms' }}>
      <div className="mb-3 px-1 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">
        Your stats
      </div>
      <div className="grid grid-cols-3 gap-2">
        {meditationLibrary.stats.map((stat) => (
          <Card key={stat.label} variant="small" className="rounded-md p-3 text-center">
            <div className="text-h2 font-semibold leading-[26px] text-white">{stat.value}</div>
            <div className="mt-1 text-small leading-[14px] text-white/50">{stat.label}</div>
          </Card>
        ))}
      </div>
      <Card variant="small" className="mt-2 rounded-md p-3">
        <div className="flex justify-between gap-3 text-caption leading-[18px]">
          <span className="text-white/50">favorite: {meditationLibrary.favorite}</span>
          <span className="font-semibold text-white/70">{meditationLibrary.favoriteShare}</span>
        </div>
      </Card>
    </section>
  )
}

function ActiveSessionSnapshot() {
  return (
    <Card className="mt-7 p-5 animate-fade-up" style={{ animationDelay: '680ms' }}>
      <div className="relative mx-auto flex h-[150px] w-[150px] items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-domain-wellbeing/20 quiet-pulse" aria-hidden="true" />
        <div className="absolute inset-[-20px] rounded-full bg-domain-wellbeing/10 blur-2xl" aria-hidden="true" />
      </div>
      <div className="mt-4 text-center">
        <div className="text-display-l font-bold leading-10 text-white tabular-nums">7:23</div>
        <p className="mt-1 text-[15px] leading-5 text-white/50">Body scan meditation</p>
      </div>
      <div className="mt-6 flex justify-center gap-4 text-white/60">
        <button type="button" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-ink-900" aria-label="Pause">
          <Pause size={18} strokeWidth={2.2} />
        </button>
        <button type="button" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-ink-900" aria-label="Skip">
          <SkipForward size={18} strokeWidth={2.2} />
        </button>
        <button type="button" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-ink-900" aria-label="End">
          <Square size={16} strokeWidth={2.2} />
        </button>
      </div>
      <div className="mt-6 rounded-lg border border-white/[0.06] bg-ink-900 p-4 text-center">
        <div className="text-h3 font-semibold leading-[22px] text-white">Session complete</div>
        <div className="mx-auto mt-3 w-fit rounded-pill bg-brand-orange/15 px-4 py-2 text-h3 font-semibold leading-[22px] text-brand-orange shadow-[var(--glow-orange)]">+50 XP</div>
        <div className="mt-4 flex justify-center gap-3">
          {[1, 2, 3, 4, 5].map((rating) => (
            <span key={rating} className={['flex h-9 w-9 items-center justify-center rounded-full border text-caption font-semibold', rating <= 4 ? 'border-domain-wellbeing bg-domain-wellbeing text-white' : 'border-white/20 bg-white/10 text-white'].join(' ')}>
              {rating}
            </span>
          ))}
        </div>
        <button type="button" className="mt-4 h-12 w-full rounded-pill bg-brand-orange text-body font-semibold leading-[22px] text-white">Done</button>
      </div>
    </Card>
  )
}

export default function MeditationScreen() {
  return (
    <PhoneFrame>
      <ScreenShell header={<DomainDashboardHeader title="Meditation" domain="wellbeing" level={4} />} activeTab="me">
        <main className="px-4 pb-20 pt-4">
          <FilterChips />
          <SiaRecommendation />
          <section className="mt-6">
            <div className="mb-3 px-1 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">
              Practices
            </div>
            <div className="space-y-4">
              {meditationLibrary.practices.map((practice, index) => (
                <PracticeCard key={practice.id} practice={practice} index={index} />
              ))}
            </div>
          </section>
          <MindfulnessStreak />
          <StatsSection />
          <ActiveSessionSnapshot />
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
