'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Plus } from 'lucide-react'
import { BottomSheet, PhoneModalLayer } from '@/components/design-system/BottomSheet'
import { Button } from '@/components/design-system/Button'
import { Card } from '@/components/design-system/Card'
import { DomainTag } from '@/components/design-system/DomainTag'
import { FAB } from '@/components/design-system/FAB'
import { DomainDashboardHeader } from '@/components/domain/DomainDashboardHeader'
import { WorkoutCard } from '@/components/domain/WorkoutCard'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { SIACoachingNote } from '@/components/screens/SIACoachingNote'
import { StatTile } from '@/components/screens/StatTile'
import { fitnessDashboard } from '@/data/mock'

// Screen 26 of 78: Fitness dashboard
// Spec: /Users/hamza/yHealth/app_design 3/26-fitness-workouts-dashboard.md

function WhoopRecoveryCard() {
  const metrics = [
    { label: 'Sleep', value: fitnessDashboard.whoop.sleep, suffix: '', state: 'good' },
    { label: 'HRV', value: fitnessDashboard.whoop.hrv, suffix: '', state: 'moderate' },
    { label: 'Recovery', value: fitnessDashboard.whoop.recovery, suffix: '%', state: 'good' },
  ]

  return (
    <Card className="animate-fade-up" style={{ animationDelay: '240ms' }}>
      <div className="mb-5 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">
        WHOOP recovery
      </div>
      <div className="grid grid-cols-3 gap-3">
        {metrics.map((metric) => (
          <div key={metric.label} className="text-center">
            <div className="text-h2 font-semibold leading-[26px] text-white tabular-nums">
              {metric.value}{metric.suffix}
            </div>
            <div className="mt-1 text-[12px] leading-4 text-white/50">{metric.label}</div>
            <span
              className={[
                'mx-auto mt-3 block h-2 w-2 rounded-full',
                metric.state === 'good' ? 'bg-forest-green' : 'bg-stalled-amber',
              ].join(' ')}
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
    </Card>
  )
}

function MissionProgressRow({ mission }: { mission: (typeof fitnessDashboard.activeMissions)[number] }) {
  return (
    <Link
      href="/tabs/goals/detail"
      className="block rounded-md border border-white/[0.06] bg-ink-brown-800 p-4 shadow-1 transition-transform duration-[var(--dur-fast)] active:scale-[0.97]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="truncate text-[15px] leading-5 text-white">{mission.name}</div>
          <div className="mt-3 h-2 overflow-hidden rounded-pill bg-white/[0.08]">
            <div className="h-full rounded-pill bg-brand-orange" style={{ width: `${mission.progress * 100}%` }} />
          </div>
          <div className="mt-2 text-caption font-semibold leading-[18px] text-white tabular-nums">
            {Math.round(mission.progress * 100)}%
          </div>
        </div>
        <DomainTag domain={mission.domain} />
      </div>
    </Link>
  )
}

function ActiveMissionsSection() {
  return (
    <section className="mt-4 animate-fade-up" style={{ animationDelay: '320ms' }}>
      <div className="mb-3 flex h-8 items-center justify-between">
        <h2 className="text-[18px] font-semibold leading-6 text-white">Active missions</h2>
        <Link href="/tabs/goals" className="flex h-8 items-center text-caption leading-[18px] text-brand-orange">
          See all
        </Link>
      </div>
      <div className="space-y-2">
        {fitnessDashboard.activeMissions.map((mission) => (
          <MissionProgressRow key={mission.name} mission={mission} />
        ))}
      </div>
    </section>
  )
}

function DayDot({ state }: { state: (typeof fitnessDashboard.week.days)[number]['state'] }) {
  if (state === 'rest') {
    return <span className="text-[14px] leading-4 text-white/20">-</span>
  }

  return (
    <span
      className={[
        'block h-3 w-3 rounded-full',
        state === 'complete' ? 'bg-brand-orange' : '',
        state === 'planned' ? 'border border-dashed border-white/30 bg-white/20' : '',
        state === 'today' ? 'animate-pulse bg-white/10 ring-1 ring-white/20' : '',
        state === 'future' ? 'bg-transparent' : '',
      ].join(' ')}
      aria-hidden="true"
    />
  )
}

function ThisWeekSection() {
  return (
    <section className="mt-4 animate-fade-up" style={{ animationDelay: '400ms' }}>
      <div className="mb-3 flex h-8 items-center justify-between">
        <h2 className="text-[18px] font-semibold leading-6 text-white">This week</h2>
        <Link href="/domains/exercise-library" className="flex h-8 items-center text-caption leading-[18px] text-brand-orange">
          See all
        </Link>
      </div>
      <Card>
        <div className="grid grid-cols-7 gap-2">
          {fitnessDashboard.week.days.map((day, index) => (
            <div key={`${day.label}-${day.state}-${index}`} className="flex flex-col items-center gap-2">
              <span className="text-[12px] leading-4 text-white/40">{day.label}</span>
              <DayDot state={day.state} />
            </div>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2">
          {fitnessDashboard.week.stats.map((stat) => (
            <div key={stat.label} className="flex h-[72px] min-w-0 items-center rounded-md bg-ink-900 px-2">
              <StatTile value={stat.value} label={stat.label} />
            </div>
          ))}
        </div>
      </Card>
    </section>
  )
}

export default function FitnessDashboardScreen() {
  const [logOpen, setLogOpen] = useState(false)
  const [message, setMessage] = useState('')

  return (
    <PhoneFrame>
      <ScreenShell
        header={<DomainDashboardHeader title="Fitness & workouts" domain="fitness" level={12} />}
        activeTab="me"
        bottomAction={<FAB label="Log workout" icon={<Plus size={16} strokeWidth={2.4} />} display="pill" onClick={() => setLogOpen(true)} />}
      >
        <main className="px-4 pb-6 pt-4">
          <Link href="/tabs/sia?context=fitness-workouts" className="block" aria-label="Ask SIA about fitness recovery and workouts">
            <SIACoachingNote
              message={fitnessDashboard.siaNote}
              className="animate-fade-up p-4"
            />
          </Link>

          <WorkoutCard
            name={fitnessDashboard.workout.name}
            type={fitnessDashboard.workout.type}
            duration={fitnessDashboard.workout.duration}
            exercises={fitnessDashboard.workout.exercises}
            overflowCount={fitnessDashboard.workout.overflowCount}
            className="mt-4 animate-fade-up"
            style={{ animationDelay: '160ms' }}
          />

          <WhoopRecoveryCard />
          <ActiveMissionsSection />
          <ThisWeekSection />
          {message && <p className="mt-4 rounded-md bg-forest-green/10 p-3 text-[12px] font-semibold leading-4 text-forest-green" aria-live="polite">{message}</p>}
          {logOpen && (
            <PhoneModalLayer>
              <BottomSheet
                title="Log workout"
                onClose={() => setLogOpen(false)}
                closeLabel="Close log workout"
                variant="modal"
                contentClassName="px-4 pb-1 pt-1"
              >
              <div className="grid grid-cols-2 gap-2">
                <Button variant="skip" onClick={() => { setMessage('Manual workout log saved.'); setLogOpen(false) }}>Manual log</Button>
                <Link href="/domains/workout" className="flex h-12 items-center justify-center rounded-pill bg-brand-orange text-[14px] font-semibold text-white">Start planned</Link>
              </div>
              <p className="mt-3 text-[12px] leading-4 text-white/45">Manual logging is separate from the immersive active workout tracker.</p>
              </BottomSheet>
            </PhoneModalLayer>
          )}
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
