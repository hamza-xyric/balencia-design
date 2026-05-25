import { Bell, BookOpen, Brain, Check, Circle, Flame, MessageCircle, Moon, Sparkles } from 'lucide-react'
import { Card } from '@/components/design-system/Card'
import { DomainDashboardHeader } from '@/components/domain/DomainDashboardHeader'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { SIACoachingNote } from '@/components/screens/SIACoachingNote'
import { spiritualityDashboard } from '@/data/mock'

// Screen 34 of 78: Spirituality dashboard
// Spec: /Users/hamza/yHealth/app_design 3/34-spirituality-dashboard.md

function SectionTitle({ title, counter }: { title: string; counter?: string }) {
  return (
    <div className="mb-3 flex h-8 items-center justify-between">
      <h2 className="text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/50">
        {title}
      </h2>
      {counter && <span className="text-caption font-semibold leading-[18px] text-brand-orange">{counter}</span>}
    </div>
  )
}

function ProgressBar({ progress, tone = 'orange' }: { progress: number; tone?: 'orange' | 'green' }) {
  return (
    <div className="h-2 overflow-hidden rounded-pill bg-white/[0.08]">
      <div
        className={`h-full rounded-pill ${tone === 'green' ? 'bg-forest-green' : 'bg-brand-orange'}`}
        style={{ width: `${Math.round(Math.max(0, Math.min(progress, 1)) * 100)}%` }}
      />
    </div>
  )
}

function PracticeTracker() {
  const completed = spiritualityDashboard.practices.filter((practice) => practice.completed).length
  const total = spiritualityDashboard.practices.length

  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '160ms' }}>
      <SectionTitle title="Today's practice" counter={`${completed}/${total}`} />
      <Card variant="small" className="p-4">
        {spiritualityDashboard.practices.map((practice, index) => (
          <div
            key={practice.name}
            className={[
              'flex min-h-[52px] items-center gap-3 py-2.5',
              index > 0 ? 'border-t border-white/[0.05]' : 'pt-0',
            ].join(' ')}
          >
            <span
              className={[
                'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2',
                practice.completed ? 'border-brand-orange bg-brand-orange text-white' : 'border-white/30 text-white/30',
              ].join(' ')}
            >
              {practice.completed ? <Check size={14} strokeWidth={2.4} /> : <Circle size={10} strokeWidth={2.4} />}
            </span>
            <div className={`min-w-0 flex-1 text-[16px] font-semibold leading-[22px] text-white ${practice.completed ? 'opacity-50 line-through' : ''}`}>
              {practice.name}
            </div>
            <div className="shrink-0 text-[15px] leading-5 text-white/50 tabular-nums">{practice.time}</div>
          </div>
        ))}
        <button
          type="button"
          className="mt-2 flex min-h-9 items-center gap-2 rounded-pill text-[15px] font-semibold leading-5 text-brand-orange"
        >
          <Flame size={18} strokeWidth={2.1} />
          {spiritualityDashboard.streak} day streak
        </button>
      </Card>
    </section>
  )
}

function ReadingProgress() {
  const reading = spiritualityDashboard.reading

  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '240ms' }}>
      <SectionTitle title="Reading" />
      <Card variant="small" className="p-4">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-domain-faith/15 text-domain-faith">
            <BookOpen size={19} strokeWidth={2.1} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-[17px] font-semibold leading-[22px] text-white">{reading.title}</div>
            <div className="mt-1 text-[15px] leading-5 text-white/70">{reading.position}</div>
            <div className="mt-0.5 text-caption leading-[18px] text-white/50">{reading.page}</div>
          </div>
        </div>
        <div className="mt-4">
          <ProgressBar progress={reading.progress} tone="green" />
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-caption leading-[18px] text-white/50">Daily target: {reading.dailyTarget}</span>
          <button type="button" className="text-[15px] leading-5 text-brand-orange">
            Log reading
          </button>
        </div>
      </Card>
    </section>
  )
}

function FastingTracker() {
  const fasting = spiritualityDashboard.fasting

  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '320ms' }}>
      <SectionTitle title="Fasting" />
      <Card variant="small" className="p-4">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-domain-faith/15 text-domain-faith">
            <Moon size={19} strokeWidth={2.1} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-[17px] font-semibold leading-[22px] text-white">{fasting.title}</div>
            <div className="mt-1 text-[15px] leading-5 text-white/70">
              Started: {fasting.started}
            </div>
            <div className="text-[15px] leading-5 text-white/70">Iftar: {fasting.ends}</div>
          </div>
        </div>
        <div className="mt-4">
          <ProgressBar progress={fasting.progress} />
        </div>
        <div className="mt-2 text-center text-[17px] font-semibold leading-[22px] text-white tabular-nums">
          {fasting.remaining}
        </div>
      </Card>
    </section>
  )
}

function ReflectionCard() {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '400ms' }}>
      <SectionTitle title="Daily reflection" />
      <Card variant="small" className="p-4">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase leading-[14px] tracking-[0.12em] text-white/40">
          <MessageCircle size={16} strokeWidth={2.1} />
          SIA asks
        </div>
        <p className="mt-3 text-[15px] leading-5 text-white">{spiritualityDashboard.reflection}</p>
        <div className="mt-3 flex justify-end">
          <button type="button" className="text-[15px] leading-5 text-brand-orange">
            Write reflection
          </button>
        </div>
      </Card>
    </section>
  )
}

function PrayerScheduleCard() {
  const schedule = spiritualityDashboard.prayerSchedule

  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '480ms' }}>
      <SectionTitle title="Prayer schedule" />
      <Card variant="small" className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-domain-faith/15 text-domain-faith">
              <Bell size={18} strokeWidth={2.1} />
            </span>
            <div>
              <div className="text-[17px] font-semibold leading-[22px] text-white">Prayer times</div>
              <div className="mt-0.5 text-caption leading-[18px] text-white/50">{schedule.location}</div>
            </div>
          </div>
          <div className="rounded-pill bg-domain-wellbeing/10 px-3 py-1 text-caption font-semibold leading-[18px] text-white">
            {schedule.next}
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {schedule.rows.map((row) => (
            <div key={row.name} className="rounded-md bg-ink-900 p-2 text-center">
              <div className="text-caption font-semibold leading-[18px] text-white">{row.name}</div>
              <div className="mt-0.5 text-[12px] leading-4 text-white/50 tabular-nums">{row.time}</div>
            </div>
          ))}
        </div>
      </Card>
    </section>
  )
}

function TimerShortcuts() {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '560ms' }}>
      <SectionTitle title="Contemplation" />
      <div className="grid grid-cols-2 gap-3">
        {spiritualityDashboard.timers.map((timer, index) => {
          const Icon = index === 0 ? Brain : Sparkles

          return (
            <Card key={timer.label} variant="small" className="flex h-[92px] flex-col items-center justify-center p-4 text-center">
              <Icon size={28} className="text-white/70" strokeWidth={2.1} />
              <div className="mt-2 text-[15px] font-semibold leading-5 text-white">{timer.label}</div>
              <div className="mt-0.5 text-caption leading-[18px] text-white/50">{timer.duration}</div>
            </Card>
          )
        })}
      </div>
    </section>
  )
}

export default function SpiritualityScreen() {
  return (
    <PhoneFrame>
      <ScreenShell
        header={<DomainDashboardHeader title="Spirituality" domain="faith" level={4} />}
        activeTab="me"
      >
        <main className="px-4 pb-20 pt-4">
          <SIACoachingNote
            message={spiritualityDashboard.siaNote}
            actionLabel="Ask SIA"
            className="animate-fade-up p-4"
          />

          <PracticeTracker />
          <ReadingProgress />
          <FastingTracker />
          <ReflectionCard />
          <PrayerScheduleCard />
          <TimerShortcuts />
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
