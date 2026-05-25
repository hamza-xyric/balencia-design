import { Plus } from 'lucide-react'
import { Button } from '@/components/design-system/Button'
import { Card } from '@/components/design-system/Card'
import { MoodSelector } from '@/components/domain/MoodSelector'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { dailyCheckin } from '@/data/mock'

// Screen 45 of 78: Daily check-in
// Spec: /Users/hamza/yHealth/app_design 3/45-daily-checkin.md

function ModalHeader() {
  return (
    <header className="h-[56px] shrink-0 bg-ink-900 px-4">
      <div className="mx-auto mt-2 h-1 w-9 rounded-pill bg-white/20" />
      <div className="mt-2 flex h-10 items-center justify-between">
        <button type="button" className="text-[15px] leading-5 text-white/60">Cancel</button>
        <button type="button" className="text-[15px] font-semibold leading-5 text-brand-orange">Save</button>
      </div>
    </header>
  )
}

function Eyebrow({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={['mb-3 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40', className].filter(Boolean).join(' ')}>
      {children}
    </div>
  )
}

function SliderPreview({
  label,
  lowLabel,
  value,
}: {
  label: string
  lowLabel: string
  value: number
}) {
  const percent = Math.max(10, Math.min(value * 10, 100))

  return (
    <section className="animate-fade-up">
      <Eyebrow>{label}</Eyebrow>
      <div className="px-1">
        <div className="mb-3 flex items-center justify-between text-caption leading-[18px] text-white/30">
          <span>{lowLabel}</span>
          <span>High</span>
        </div>
        <div className="relative h-7">
          <div className="absolute left-0 right-0 top-1/2 h-1.5 -translate-y-1/2 rounded-pill bg-white/[0.08]" />
          <div
            className="absolute left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-pill bg-domain-wellbeing"
            style={{ width: `${percent}%` }}
          />
          <div
            className="absolute top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-white text-small font-bold leading-none text-ink-900 shadow-1"
            style={{ left: `calc(${percent}% - 12px)` }}
          >
            {value}
          </div>
        </div>
      </div>
    </section>
  )
}

function IntentionInput() {
  return (
    <section className="animate-fade-up" style={{ animationDelay: '240ms' }}>
      <div className="flex h-[52px] items-center rounded-md border border-domain-wellbeing/40 bg-ink-brown-800 px-4 text-body leading-[22px] text-white">
        {dailyCheckin.intention}
      </div>
    </section>
  )
}

function EmotionTags() {
  return (
    <section className="animate-fade-up" style={{ animationDelay: '320ms' }}>
      <Eyebrow>How would you describe it?</Eyebrow>
      <div className="flex flex-wrap gap-2">
        {dailyCheckin.emotionTags.map((tag) => (
          <button
            key={tag.label}
            type="button"
            className={[
              'h-8 rounded-pill border px-3 text-caption leading-[18px]',
              tag.selected
                ? 'border-domain-wellbeing/30 bg-domain-wellbeing/15 font-semibold text-domain-wellbeing'
                : 'border-white/[0.08] bg-ink-brown-800 text-white/50',
            ].join(' ')}
          >
            {tag.label}
          </button>
        ))}
      </div>
    </section>
  )
}

function ContextNote() {
  return (
    <button
      type="button"
      className="flex h-8 items-center gap-2 text-[14px] font-semibold leading-5 text-white/50 animate-fade-up"
      style={{ animationDelay: '400ms' }}
    >
      <Plus size={14} className="text-white/40" strokeWidth={2.2} />
      <span>Add a note</span>
    </button>
  )
}

export default function DailyCheckinScreen() {
  return (
    <PhoneFrame>
      <ScreenShell header={<ModalHeader />} showTabBar={false}>
        <main className="px-4 pb-12 pt-6">
          <section className="animate-fade-up">
            <h1 className="text-h2 font-bold leading-[26px] text-white">{dailyCheckin.greeting}</h1>
            <p className="mt-1 text-[15px] leading-5 text-white/60">{dailyCheckin.subtext}</p>
            <p className="mt-2 text-caption leading-[18px] text-domain-wellbeing">{dailyCheckin.streakNote}</p>
          </section>

          <section className="mt-6 animate-fade-up" style={{ animationDelay: '80ms' }}>
            <Eyebrow>How are you feeling?</Eyebrow>
            <MoodSelector options={dailyCheckin.moods} selectedLabel={dailyCheckin.selectedMood} />
          </section>

          <div className="mt-6 space-y-5">
            <SliderPreview label="Energy" lowLabel="low" value={dailyCheckin.energy} />
            <SliderPreview label="Stress" lowLabel="calm" value={dailyCheckin.stress} />
          </div>

          <section className="mt-6">
            <Eyebrow>Daily intention</Eyebrow>
            <IntentionInput />
          </section>

          <div className="mt-6 space-y-5">
            <EmotionTags />
            <ContextNote />
          </div>

          <Card variant="small" className="mt-8 rounded-md border-domain-wellbeing/20 p-4 animate-fade-up" style={{ animationDelay: '440ms' }}>
            <div className="text-[15px] font-semibold leading-5 text-white">Wellbeing XP</div>
            <div className="mt-1 text-caption leading-[18px] text-white/50">
              Submit this check-in to earn +{dailyCheckin.xpReward} XP.
            </div>
          </Card>

          <section className="mt-5 animate-fade-up" style={{ animationDelay: '520ms' }}>
            <Button size="auth" fullWidth>
              check in
            </Button>
          </section>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
