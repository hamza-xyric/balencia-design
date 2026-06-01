'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Check, ChevronLeft, Pause, Square } from 'lucide-react'
import { Button } from '@/components/design-system/Button'
import { Card } from '@/components/design-system/Card'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { workoutDetail } from '@/data/mock'

// Screen 27 of 78: Workout detail / active workout
// Spec: /Users/hamza/yHealth/app_design 3/27-workout-detail-active-workout.md

function ActiveWorkoutTopBar({ mode, onPause, onEnd }: { mode: string; onPause: () => void; onEnd: () => void }) {
  const session = workoutDetail.activeSession

  return (
    <header className="flex h-[48px] shrink-0 items-center justify-between bg-ink-900 px-4">
      <div>
        <div className="text-caption font-semibold leading-[18px] text-white">
          Exercise {session.exerciseIndex} of {session.totalExercises}
        </div>
        <div className="mt-0.5 text-caption leading-[18px] text-white/50">
          {session.elapsed}
        </div>
      </div>
      <div className="flex items-center gap-1">
        <button className="flex h-11 w-11 items-center justify-center rounded-full text-white" type="button" onClick={onPause} aria-label={mode === 'paused' ? 'Resume workout' : 'Pause workout'}>
          <Pause size={20} strokeWidth={2.1} />
        </button>
        <button type="button" onClick={onEnd} className="flex h-11 items-center gap-1.5 rounded-full px-2 text-[15px] font-semibold leading-5 text-white/50">
          <Square size={13} strokeWidth={2.1} />
          End
        </button>
      </div>
    </header>
  )
}

function WorkoutSummaryTopBar() {
  return (
    <header className="flex h-[56px] shrink-0 items-center bg-ink-900 px-4">
      <Link href="/domains/fitness" className="-ml-2 flex h-11 w-11 items-center justify-center rounded-full text-white" aria-label="Back to fitness">
        <ChevronLeft size={20} strokeWidth={2.1} />
      </Link>
      <h1 className="ml-1 text-[17px] font-semibold leading-[22px] text-white">Workout summary</h1>
    </header>
  )
}

function TrackerInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  const id = `workout-${label.toLowerCase()}`
  return (
    <div className="min-w-0 flex-1">
      <label htmlFor={id} className="mb-1 block text-[11px] font-semibold uppercase leading-[14px] tracking-[0.12em] text-white/40">
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        inputMode="decimal"
        className="flex h-[52px] w-full items-center rounded-md border border-white/10 bg-ink-900 px-2 text-center text-h2 font-semibold leading-[26px] text-white outline-none focus:border-brand-orange"
      />
    </div>
  )
}

function SetTrackerCard({ weight, reps, onWeight, onReps, onComplete }: { weight: string; reps: string; onWeight: (value: string) => void; onReps: (value: string) => void; onComplete: () => void }) {
  const session = workoutDetail.activeSession

  return (
    <Card className="mt-6 p-4 animate-fade-up" style={{ animationDelay: '160ms' }}>
      <div className="flex gap-2">
        <TrackerInput label="Weight" value={weight} onChange={onWeight} />
        <TrackerInput label="Reps" value={reps} onChange={onReps} />
      </div>
      <div className="mt-3 text-caption leading-[18px] text-white/40">
        Last set: {session.lastSet}
      </div>
      <Button
        variant="completion"
        fullWidth
        rightIcon={<Check size={17} strokeWidth={2.3} />}
        className="mt-4"
        onClick={onComplete}
        disabled={!weight.trim() || !reps.trim()}
      >
        Complete set
      </Button>
    </Card>
  )
}

function RestTimer({ active, onSkip }: { active: boolean; onSkip: () => void }) {
  const radius = 52
  const circumference = 2 * Math.PI * radius
  const progress = 0.62
  const dashOffset = circumference * (1 - progress)

  return (
    <Card className="mt-4 p-4 text-center animate-fade-up" style={{ animationDelay: '240ms' }}>
      <div className="text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">
        Rest
      </div>
      <div className="relative mx-auto mt-3 h-[120px] w-[120px]">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="var(--color-brand-orange)"
            strokeLinecap="round"
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-display-l font-bold leading-[40px] text-white tabular-nums">
        {active ? workoutDetail.activeSession.restRemaining : '0:00'}
      </div>
      </div>
      <button className="mt-2 min-h-11 rounded-full px-4 text-[15px] leading-5 text-white/50" type="button" onClick={onSkip}>
        Skip rest
      </button>
    </Card>
  )
}

function SiaRealTimeNote() {
  return (
    <div className="mt-4 flex min-h-10 items-center rounded-xl border border-white/[0.06] bg-ink-brown-800 px-4 animate-fade-up" style={{ animationDelay: '320ms' }}>
      <span className="mr-3 h-1.5 w-1.5 shrink-0 rounded-full bg-royal-purple" aria-hidden="true" />
      <p className="truncate text-caption leading-[18px] text-white">
        {workoutDetail.activeSession.siaNote}
      </p>
    </div>
  )
}

function NextExercisePreview() {
  return (
    <div className="mt-5 animate-fade-up" style={{ animationDelay: '400ms' }}>
      <div className="text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">
        Next
      </div>
      <div className="mt-1 text-h3 font-semibold leading-[22px] text-white">
        {workoutDetail.activeSession.nextExercise}
      </div>
      <div className="mt-1 text-caption leading-[18px] text-white/50">
        {workoutDetail.activeSession.nextDetails}
      </div>
    </div>
  )
}

export default function WorkoutDetailScreen() {
  const session = workoutDetail.activeSession
  const [mode, setMode] = useState<'active' | 'rest' | 'paused' | 'confirm-end' | 'summary'>('active')
  const [setIndex, setSetIndex] = useState(session.setIndex)
  const [weight, setWeight] = useState(session.weight.replace(/[^\d.]/g, ''))
  const [reps, setReps] = useState(session.reps)
  const [toast, setToast] = useState('')

  function completeSet() {
    if (setIndex >= session.totalSets) {
      setMode('summary')
      return
    }
    setSetIndex((current) => current + 1)
    setMode('rest')
    setToast(`Set ${setIndex} saved. Rest timer started.`)
  }

  const sessionControlOpen = mode === 'paused' || mode === 'confirm-end'

  return (
    <PhoneFrame>
      <ScreenShell
        header={mode === 'summary'
          ? <WorkoutSummaryTopBar />
          : <ActiveWorkoutTopBar mode={mode} onPause={() => setMode(mode === 'paused' ? 'active' : 'paused')} onEnd={() => setMode('confirm-end')} />}
        showTabBar={mode === 'summary'}
        activeTab="me"
      >
        {mode === 'summary' ? (
          <main className="flex min-h-full flex-col px-4 pb-8 pt-7">
            <section className="rounded-xl border border-white/[0.06] bg-ink-brown-800 p-6 text-center shadow-1 animate-fade-up">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-forest-green/15 text-forest-green shadow-[var(--glow-green)]">
                <Check size={34} strokeWidth={2.3} />
              </div>
              <h1 className="mt-5 text-[24px] font-bold leading-[30px] text-white">Workout complete</h1>
              <p className="mt-2 text-[15px] leading-5 text-white/55">3 sets saved, +{workoutDetail.summary.xpEarned} XP, recovery note stored in your fitness timeline.</p>
              <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                {[
                  { label: 'Duration', value: `${workoutDetail.summary.duration}m` },
                  { label: 'Exercises', value: workoutDetail.summary.exercises },
                  { label: 'Calories', value: workoutDetail.summary.calories },
                ].map((item) => (
                  <div key={item.label} className="rounded-md bg-ink-900/70 p-3">
                    <div className="text-[17px] font-semibold leading-[22px] text-white">{item.value}</div>
                    <div className="mt-1 text-small leading-[14px] text-white/40">{item.label}</div>
                  </div>
                ))}
              </div>
              <Link href="/domains/fitness" className="mt-6 flex h-12 items-center justify-center rounded-pill bg-brand-orange text-[15px] font-semibold text-white">Back to fitness</Link>
            </section>
          </main>
        ) : (
          <>
            <main className="flex min-h-full flex-col px-4 pb-4 pt-7" aria-hidden={sessionControlOpen}>
              <section className="text-center animate-fade-up">
                <h1 className="text-[24px] font-bold leading-[30px] text-white">{session.currentExercise}</h1>
                <p className="mt-2 text-[15px] leading-5 text-white/50">
                  Set {setIndex} of {session.totalSets}
                </p>
              </section>

              <SetTrackerCard weight={weight} reps={reps} onWeight={setWeight} onReps={setReps} onComplete={completeSet} />
              <RestTimer active={mode === 'rest'} onSkip={() => { setMode('active'); setToast('Rest skipped. Next set ready.') }} />
              <SiaRealTimeNote />
              <NextExercisePreview />
              {toast && <p className="mt-4 rounded-md bg-forest-green/10 p-3 text-[12px] font-semibold leading-4 text-forest-green" aria-live="polite">{toast}</p>}
            </main>
            {sessionControlOpen && (
              <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/55 px-4" role="presentation">
                {mode === 'paused' && (
                  <section className="w-full rounded-lg border border-white/10 bg-ink-brown-800 p-5 text-center shadow-3" role="dialog" aria-modal="true" aria-label="Workout paused">
                    <h2 className="text-[18px] font-semibold leading-6 text-white">Workout paused</h2>
                    <p className="mt-2 text-[13px] leading-[18px] text-white/55">Your current set is saved locally for this session.</p>
                    <Button className="mt-4" fullWidth onClick={() => setMode('active')}>Resume</Button>
                  </section>
                )}
                {mode === 'confirm-end' && (
                  <section className="w-full rounded-lg border border-white/10 bg-ink-brown-800 p-5 text-center shadow-3" role="dialog" aria-modal="true" aria-label="End workout">
                    <h2 className="text-[18px] font-semibold leading-6 text-white">End workout?</h2>
                    <p className="mt-2 text-[13px] leading-[18px] text-white/55">You can save partial progress or return to the active set.</p>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <Button variant="skip" onClick={() => setMode('active')}>Cancel</Button>
                      <Button onClick={() => setMode('summary')}>Save end</Button>
                    </div>
                  </section>
                )}
              </div>
            )}
          </>
        )}
      </ScreenShell>
    </PhoneFrame>
  )
}
