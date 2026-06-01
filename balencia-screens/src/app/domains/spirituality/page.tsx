 'use client'

import { useState } from 'react'
import { Bell, BookOpen, Brain, Check, Circle, Flame, MessageCircle, Moon, Sparkles, X } from 'lucide-react'
import { Button } from '@/components/design-system/Button'
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

const generalPractices = [
  { name: 'Morning meditation', time: '7:00 AM', completed: true },
  { name: 'Gratitude journal', time: '7:30 AM', completed: true },
  { name: 'Mindful walk', time: '12:00 PM', completed: false },
  { name: 'Evening reflection', time: '8:00 PM', completed: false },
  { name: 'Reading', time: '9:00 PM', completed: false },
]

const generalReading = {
  title: 'Meditations',
  position: 'Marcus Aurelius',
  page: 'page 68 of 254',
  progress: 0.27,
  dailyTarget: '10 pages',
}

function PracticeTracker({ onOpenStreak, belief }: { onOpenStreak: () => void; belief: string }) {
  const practices = belief === 'muslim' ? spiritualityDashboard.practices : generalPractices
  const [completedNames, setCompletedNames] = useState(practices.filter((practice) => practice.completed).map((practice) => practice.name))
  const [toast, setToast] = useState('')
  const completed = completedNames.length
  const total = practices.length

  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '160ms' }}>
      <SectionTitle title="Today's practice" counter={`${completed}/${total}`} />
      <Card variant="small" className="p-4">
        {practices.map((practice, index) => {
          const complete = completedNames.includes(practice.name)

          return (
          <button
            key={practice.name}
            type="button"
            onClick={() => {
              setCompletedNames((items) => complete ? items.filter((item) => item !== practice.name) : [...items, practice.name])
              setToast(complete ? 'Practice marked missed' : 'Practice complete: +10 XP')
              window.setTimeout(() => setToast(''), 2600)
            }}
            aria-pressed={complete}
            className={[
              'flex min-h-[52px] w-full items-center gap-3 py-2.5 text-left',
              index > 0 ? 'border-t border-white/[0.05]' : 'pt-0',
            ].join(' ')}
          >
            <span
              className={[
                'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2',
                complete ? 'border-brand-orange bg-brand-orange text-white' : 'border-white/30 text-white/30',
              ].join(' ')}
            >
              {complete ? <Check size={14} strokeWidth={2.4} /> : <Circle size={10} strokeWidth={2.4} />}
            </span>
            <div className={`min-w-0 flex-1 text-[16px] font-semibold leading-[22px] text-white ${complete ? 'opacity-50 line-through' : ''}`}>
              {practice.name}
            </div>
            <div className="shrink-0 text-[15px] leading-5 text-white/50 tabular-nums">{practice.time}</div>
          </button>
          )
        })}
        <button
          type="button"
          onClick={onOpenStreak}
          className="mt-2 flex min-h-9 items-center gap-2 rounded-pill text-[15px] font-semibold leading-5 text-brand-orange"
        >
          <Flame size={18} strokeWidth={2.1} />
          {spiritualityDashboard.streak} day streak
        </button>
        {toast && <div className="mt-3 rounded-pill bg-forest-green px-4 py-3 text-caption font-semibold text-white" role="status">{toast}</div>}
      </Card>
    </section>
  )
}

function ReadingProgress({ onLog, belief }: { onLog: () => void; belief: string }) {
  const reading = belief === 'muslim' ? spiritualityDashboard.reading : generalReading

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
          <button type="button" onClick={onLog} className="flex h-11 items-center text-[15px] leading-5 text-brand-orange">
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

function ReflectionCard({ onWrite }: { onWrite: () => void }) {
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
          <button type="button" onClick={onWrite} className="flex h-11 items-center text-[15px] leading-5 text-brand-orange">
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
        <div className="mt-3 rounded-md bg-ink-900 p-3 text-caption leading-[18px] text-white/50">
          Source: demo location, Muslim World League method. Enable location only after consent.
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

const generalTimers = [
  { label: 'Meditate', duration: '10 min' },
  { label: 'Breathwork', duration: '5 min' },
]

function TimerShortcuts({ onStart, belief }: { onStart: (label: string) => void; belief: string }) {
  const timers = belief === 'muslim' ? spiritualityDashboard.timers : generalTimers

  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '560ms' }}>
      <SectionTitle title="Contemplation" />
      <div className="grid grid-cols-2 gap-3">
        {timers.map((timer, index) => {
          const Icon = index === 0 ? Brain : Sparkles

          return (
            <button key={timer.label} type="button" onClick={() => onStart(timer.label)} className="rounded-lg text-center">
            <Card variant="small" className="flex h-[92px] flex-col items-center justify-center p-4 text-center">
              <Icon size={28} className="text-white/70" strokeWidth={2.1} />
              <div className="mt-2 text-[15px] font-semibold leading-5 text-white">{timer.label}</div>
              <div className="mt-0.5 text-caption leading-[18px] text-white/50">{timer.duration}</div>
            </Card>
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default function SpiritualityScreen() {
  const [belief, setBelief] = useState<'muslim' | 'unconfigured' | 'general'>('unconfigured')
  const [sheet, setSheet] = useState<'reading' | 'reflection' | null>(null)
  const [streakOpen, setStreakOpen] = useState(false)
  const [timer, setTimer] = useState('')
  const [toast, setToast] = useState('')
  const save = (message: string) => {
    setSheet(null)
    setToast(message)
    window.setTimeout(() => setToast(''), 3000)
  }

  return (
    <PhoneFrame>
      <ScreenShell
        header={<DomainDashboardHeader title="Spirituality" domain="faith" level={4} />}
        activeTab="me"
      >
        <main className="px-4 pb-20 pt-4">
          <SIACoachingNote
            message={belief === 'unconfigured' ? 'Choose a belief or reflection style before SIA personalizes spiritual practice suggestions.' : belief === 'general' ? 'Your morning contemplation streak is building a strong foundation. Try adding a gratitude journal entry today.' : spiritualityDashboard.siaNote}
            actionLabel="Ask SIA"
            actionHref="/tabs/sia?context=spirituality"
            className="animate-fade-up p-4"
          />
          <div className="mt-3 grid grid-cols-3 gap-2 animate-fade-up" role="group" aria-label="Belief mode">
            {[
              ['muslim', 'Muslim'],
              ['general', 'General'],
              ['unconfigured', 'Set up'],
            ].map(([value, label]) => (
              <button key={value} type="button" onClick={() => setBelief(value as typeof belief)} aria-pressed={belief === value} className={['h-11 rounded-pill border text-caption font-semibold', belief === value ? 'border-brand-orange bg-brand-orange/15 text-brand-orange' : 'border-white/10 text-white/55'].join(' ')}>{label}</button>
            ))}
          </div>

          {belief === 'unconfigured' ? (
            <Card variant="small" className="mt-6 p-5 text-[15px] leading-5 text-white/70">
              Spirituality is private by default. Pick a tradition or a secular reflection style to configure labels, qualified references, and location-sensitive features.
            </Card>
          ) : (
            <>
              <PracticeTracker onOpenStreak={() => setStreakOpen(true)} belief={belief} />
              <ReadingProgress onLog={() => setSheet('reading')} belief={belief} />
              {belief === 'muslim' && <FastingTracker />}
              <ReflectionCard onWrite={() => setSheet('reflection')} />
              {belief === 'muslim' && <PrayerScheduleCard />}
              <TimerShortcuts onStart={setTimer} belief={belief} />
            </>
          )}
        </main>
        {sheet && (
          <div className="absolute inset-x-0 bottom-[84px] z-20 mx-3 rounded-xl border border-white/10 bg-ink-brown-800 p-4 shadow-2" role="dialog" aria-label={sheet === 'reading' ? 'Log reading' : 'Write reflection'}>
            <div className="flex items-center justify-between">
              <h2 className="text-[17px] font-semibold text-white">{sheet === 'reading' ? 'Log reading' : 'Write reflection'}</h2>
              <button type="button" onClick={() => setSheet(null)} className="flex h-11 w-11 items-center justify-center rounded-full text-white/60" aria-label="Cancel"><X size={18} /></button>
            </div>
            <textarea className="mt-3 min-h-[112px] w-full rounded-md border border-white/10 bg-ink-900 p-3 text-[15px] text-white outline-none placeholder:text-white/30" placeholder={sheet === 'reading' ? 'Pages, passage, or notes' : 'What did this bring up?'} />
            <Button onClick={() => save(sheet === 'reading' ? 'Reading logged' : 'Reflection saved')} fullWidth variant="completion" className="mt-3">Save</Button>
          </div>
        )}
        {streakOpen && (
          <div className="absolute inset-x-0 bottom-[84px] z-20 mx-3 rounded-xl border border-white/10 bg-ink-brown-800 p-4 shadow-2" role="dialog" aria-label="Spiritual streak history">
            <div className="flex items-center justify-between">
              <h2 className="text-[17px] font-semibold text-white">{spiritualityDashboard.streak} day streak</h2>
              <button type="button" onClick={() => setStreakOpen(false)} className="flex h-11 w-11 items-center justify-center rounded-full text-white/60" aria-label="Close streak history"><X size={18} /></button>
            </div>
            <p className="mt-2 text-caption leading-[18px] text-white/55">Practice streak counts checked-off reading, reflection, and configured practice reminders.</p>
            <div className="mt-3 grid grid-cols-6 gap-2">
              {['M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                <div key={`${day}-${index}`} className="rounded-md bg-forest-green/15 px-2 py-3 text-center text-caption font-semibold text-forest-green">
                  {day}
                </div>
              ))}
            </div>
            <Button onClick={() => setStreakOpen(false)} fullWidth variant="completion" className="mt-4">Done</Button>
          </div>
        )}
        {timer && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-ink-900 p-8 text-center" role="dialog" aria-label={`${timer} timer active`}>
            <Sparkles size={36} className="text-brand-orange" />
            <h2 className="mt-4 text-[24px] font-bold text-white">{timer}</h2>
            <p className="mt-2 text-[15px] leading-5 text-white/55">05:00 remaining. Timer runs as a focused modal.</p>
            <Button onClick={() => { setTimer(''); setToast('Session complete: +15 XP') }} className="mt-6">Complete session</Button>
          </div>
        )}
        {toast && <div className="absolute inset-x-4 bottom-[96px] z-40 rounded-pill bg-forest-green px-4 py-3 text-[14px] font-semibold text-white shadow-2" role="status">{toast}</div>}
      </ScreenShell>
    </PhoneFrame>
  )
}
