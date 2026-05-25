import Link from 'next/link'
import { Check, Pause, Square } from 'lucide-react'
import { Button } from '@/components/design-system/Button'
import { Card } from '@/components/design-system/Card'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { workoutDetail } from '@/data/mock'

// Screen 27 of 78: Workout detail / active workout
// Spec: /Users/hamza/yHealth/app_design 3/27-workout-detail-active-workout.md

function ActiveWorkoutTopBar() {
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
        <button className="flex h-11 w-11 items-center justify-center rounded-full text-white" type="button" aria-label="Pause workout">
          <Pause size={20} strokeWidth={2.1} />
        </button>
        <Link href="/domains/fitness" className="flex h-11 items-center gap-1.5 rounded-full px-2 text-[15px] font-semibold leading-5 text-white/50">
          <Square size={13} strokeWidth={2.1} />
          End
        </Link>
      </div>
    </header>
  )
}

function TrackerInput({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 flex-1">
      <div className="mb-1 text-[11px] font-semibold uppercase leading-[14px] tracking-[0.12em] text-white/40">
        {label}
      </div>
      <div className="flex h-[52px] items-center justify-center rounded-md border border-white/10 bg-ink-900 px-2 text-h2 font-semibold leading-[26px] text-white">
        {value}
      </div>
    </div>
  )
}

function SetTrackerCard() {
  const session = workoutDetail.activeSession

  return (
    <Card className="mt-6 p-4 animate-fade-up" style={{ animationDelay: '160ms' }}>
      <div className="flex gap-2">
        <TrackerInput label="Weight" value={session.weight} />
        <TrackerInput label="Reps" value={session.reps} />
      </div>
      <div className="mt-3 text-caption leading-[18px] text-white/40">
        Last set: {session.lastSet}
      </div>
      <Button
        variant="completion"
        fullWidth
        rightIcon={<Check size={17} strokeWidth={2.3} />}
        className="mt-4"
      >
        Complete set
      </Button>
    </Card>
  )
}

function RestTimer() {
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
          {workoutDetail.activeSession.restRemaining}
        </div>
      </div>
      <button className="mt-2 h-9 text-[15px] leading-5 text-white/50" type="button">
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

  return (
    <PhoneFrame>
      <ScreenShell header={<ActiveWorkoutTopBar />} showTabBar={false}>
        <main className="flex min-h-full flex-col px-4 pb-4 pt-7">
          <section className="text-center animate-fade-up">
            <h1 className="text-[24px] font-bold leading-[30px] text-white">{session.currentExercise}</h1>
            <p className="mt-2 text-[15px] leading-5 text-white/50">
              Set {session.setIndex} of {session.totalSets}
            </p>
          </section>

          <SetTrackerCard />
          <RestTimer />
          <SiaRealTimeNote />
          <NextExercisePreview />
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
