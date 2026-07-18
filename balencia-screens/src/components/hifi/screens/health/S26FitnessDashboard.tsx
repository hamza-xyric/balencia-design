'use client'

import Image from 'next/image'
import { Dumbbell } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  BtnGhost,
  BtnPrimary,
  ChargeMeter,
  Chip,
  CIAInsightCard,
  ConsentRail,
  FloatingQuickLog,
  FULL_DATA_CONTROLS,
  GlassCard,
  HeatGrid,
  HifiShell,
  MetricPill,
  ProgressBar,
  ProgressRing,
  Provenance,
  SectionTitle,
  SolidCard,
  TopBar,
  TrendChart,
  VolumeBars,
} from '@/components/hifi/kit'

const recovery = {
  percent: 78,
  sleepPercent: 84,
  hrvMs: 52,
  intensityPercent: 78,
  source: 'WHOOP',
  freshness: 'Synced 2h ago',
}

const activeMissions = [
  { label: 'Bench press 125kg', value: 80 },
  { label: 'Run 5k under 25m', value: 40 },
]

const weeklyMetrics = [
  { label: 'Workouts', value: '4' },
  { label: 'Active min', value: '120' },
  { label: 'Kcal est.', value: '950' },
]

const weeklyVolume = {
  current: [3, 2, 4, 3, 5, 2, 4],
  previous: [2, 3, 3, 2, 4, 3, 3],
  labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
}

const activityTrend = {
  past: [2, 4, 3, 5, 4, 6, 5],
  projected: [6, 7, 8],
  milestones: [2, 5],
}

const consistency = [
  0, 1, 2, 3, 2, 1, 0,
  1, 2, 3, 3, 2, 1, 1,
  2, 3, 3, 2, 1, 2, 3,
  3, 3, 2, 3, 3, 2, 3,
]

const intensityTicks = 10

export function S26FitnessDashboard() {
  const [state, setState] = useState('default')
  const low = state === 'low-confidence'
  const empty = state === 'empty'
  const error = state === 'error'
  const offline = state === 'offline'
  const disabled = state === 'disabled'
  useEffect(() => {
    const next = new URLSearchParams(window.location.search).get('state') ?? 'default'
    queueMicrotask(() => setState(next))
  }, [])
  return (
    <HifiShell
      header={<TopBar title={<>Fitness & <span className="text-emphasis">workouts</span></>} back={false} right={<Chip>Lv 12 · profile</Chip>} />}
      activeTab="today"
      bottomAction={<FloatingQuickLog label="Log workout" href="/screens/26?action=log-workout" />}
    >
      <main className="space-y-4 px-4 pb-4 pt-3" data-state={state}>
        {offline && <p role="status" className="glass-pill px-4 py-3 text-[13px] text-paper-100/75">Offline — showing last sync 2h ago</p>}
        {error && <SolidCard><p role="alert" className="text-[14px] text-paper-100">Couldn&rsquo;t load WHOOP data.</p><BtnGhost className="mt-3" onClick={() => setState('default')}>Retry locally</BtnGhost></SolidCard>}
        {state === 'success' && <p role="status" className="rounded-xl border border-forest-green/30 bg-forest-green/10 px-4 py-3 text-[13px] text-paper-100">Workout preview started locally.</p>}
        <CIAInsightCard
          provenance={[`Recovery + sleep · ${recovery.source}`, recovery.freshness]}
          actions={<Chip tone="cia" interactive onClick={() => setState('success')}>Ask CIA</Chip>}
        >
          {empty ? 'Connect or log a workout to build a recovery view.' : 'Based on recovery and sleep, today may suit more intensity if you feel well.'}
        </CIAInsightCard>

        <SolidCard>
          <div className="flex items-center gap-4">
            <ProgressRing percent={empty || error ? 0 : recovery.percent} value={empty || error ? '—' : `${low ? '~' : ''}${recovery.percent}%`} label={empty ? 'Recovery not synced' : 'Recovery'} size={110} />
            <div className="min-w-0 flex-1 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <MetricPill label="Sleep" value={empty || error ? '—' : `${low ? '~' : ''}${recovery.sleepPercent}%`} tone="you" />
                <MetricPill label="HRV" value={empty || error ? '—' : `${low ? '~' : ''}${recovery.hrvMs}ms`} tone="you" />
              </div>
              <div>
                <p className="mb-1.5 text-[11px] font-semibold uppercase leading-4 text-paper-100/65">
                  Intensity charge {empty || error ? 'not available' : `${recovery.intensityPercent}%`}
                </p>
                <ChargeMeter
                  ticks={intensityTicks}
                  percent={empty || error ? 0 : recovery.intensityPercent}
                  label={`Intensity charge ${recovery.intensityPercent} percent`}
                />
              </div>
            </div>
          </div>
          <div className="mt-3">
            <Provenance items={[
              `Recovery ${recovery.percent}% · ${recovery.source} · ${recovery.freshness.toLowerCase()}`,
              `Sleep ${recovery.sleepPercent}% · ${recovery.source} · ${recovery.freshness.toLowerCase()}`,
              `HRV ${recovery.hrvMs}ms · ${recovery.source} · ${recovery.freshness.toLowerCase()}`,
            ]} />
          </div>
        </SolidCard>

        <GlassCard tone="you">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase leading-3 text-paper-100/65">Today&apos;s workout</p>
              <p className="mt-1 text-[17px] font-semibold leading-6 text-paper-100">Upper body strength · 45m</p>
            </div>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 text-brand-orange" aria-hidden="true">
              <Dumbbell size={19} strokeWidth={1.9} />
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <Chip>Back</Chip>
            <Chip>Chest</Chip>
            <Chip>Arms</Chip>
          </div>
          <figure className="mt-3 overflow-hidden rounded-xl border border-white/10 bg-ink-900">
            <Image
              src="/hifi-assets/HIFI-26-01-fitness-prep-v2.png"
              alt="Three-stage workout preparation with a mat, dumbbell, resistance band, and water bottle"
              width={1200}
              height={800}
              sizes="(max-width: 430px) 340px, 380px"
              className="aspect-[3/2] w-full object-cover"
            />
            <figcaption className="border-t border-white/10 px-3 py-2 text-[11px] leading-4 text-paper-100/65">
              Preparation preview · equipment only · no personal media
            </figcaption>
          </figure>
          <p className="mt-3 text-[11px] leading-4 text-paper-100/60">Plan · workout library · updated today</p>
          <div className="mt-4">
            <BtnPrimary className="w-full" disabled={disabled || error} onClick={() => setState('success')}>{disabled ? 'Workout unavailable' : 'Start workout'}</BtnPrimary>
          </div>
        </GlassCard>

        <SectionTitle
          title="Active missions"
          action={<BtnGhost quiet className="-mr-3 px-3 text-[12px]" onClick={() => setState('success')}>View all</BtnGhost>}
        />
        <SolidCard className="space-y-4">
          {activeMissions.map(mission => (
            <div key={mission.label}>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-[13px] leading-4 text-paper-100/80">{mission.label}</span>
                <span className="text-[12px] leading-4 text-paper-100/65 tabular-nums">{mission.value}%</span>
              </div>
              <ProgressBar value={mission.value} />
            </div>
          ))}
          <p className="text-[11px] leading-4 text-paper-100/60">Progress · Missions ledger · updated today</p>
        </SolidCard>

        <SectionTitle title="This week" />
        <div className="grid grid-cols-3 gap-2">
          {weeklyMetrics.map(metric => (
            <MetricPill key={metric.label} label={metric.label} value={empty || error ? (metric.label === 'Workouts' ? '0' : '—') : metric.value} tone="you" />
          ))}
        </div>
        <Provenance items={[
          'Workouts + active min · workout log · updated today',
          'Kcal estimate · wearable + workout log · updated today',
        ]} />

        <details open={state === 'data-controls'} className="surface-warm rounded-xl p-4">
          <summary className="focus-ring flex min-h-11 cursor-pointer list-none items-center justify-between rounded-lg px-1 text-left">
            <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-paper-100/75">Data sources</span>
            <span className="text-[12px] text-paper-100/60">9 controls</span>
          </summary>
          <p className="mt-2 text-[12px] leading-[18px] text-paper-100/70">
            Health & fitness · WHOOP plus workout log · recovery, sleep, HRV, activity and workout scope · synced 2h ago.
          </p>
          <ConsentRail compact controls={FULL_DATA_CONTROLS} />
        </details>

        {!empty && !error ? <SolidCard>
          <h3 className="mb-3 text-[14px] font-semibold leading-5 text-paper-100">Weekly volume</h3>
          <div role="img" aria-label={`Weekly workout volume from workout log, updated today. This week: ${weeklyVolume.current.join(', ')}. Previous week: ${weeklyVolume.previous.join(', ')}.`}>
            <VolumeBars
              current={weeklyVolume.current}
              previous={weeklyVolume.previous}
              labels={weeklyVolume.labels}
            />
          </div>
          <div className="mt-3"><Provenance items={['Workout log · updated today']} /></div>
        </SolidCard> : <SolidCard><h3 className="text-[14px] font-semibold">Weekly volume</h3><p className="mt-2 text-[13px] text-paper-100/70">No workout history yet. Log your first workout.</p></SolidCard>}

        {!empty && !error ? <SolidCard>
          <h3 className="mb-3 text-[14px] font-semibold leading-5 text-paper-100">Activity trend</h3>
          <TrendChart
            past={activityTrend.past}
            projected={activityTrend.projected}
            milestones={activityTrend.milestones}
            height={130}
            label="Activity index from workout log: 7 days logged, followed by 3 low-confidence CIA projections"
          />
          <div className="mt-3">
            <Provenance items={['Logged activity · workout log · updated today', 'Projection · CIA · low confidence']} />
          </div>
        </SolidCard> : <SolidCard><h3 className="text-[14px] font-semibold">Activity trend</h3><p className="mt-2 text-[13px] text-paper-100/70">Not enough data yet.</p></SolidCard>}

        {!empty && !error ? <SolidCard>
          <h3 className="mb-3 text-[14px] font-semibold leading-5 text-paper-100">Consistency</h3>
          <HeatGrid values={consistency} columns={7} label="Consistency from workout log, last 4 weeks, updated today" />
          <div className="mt-3"><Provenance items={['Workout log · updated today']} /></div>
        </SolidCard> : <SolidCard><h3 className="text-[14px] font-semibold">Consistency</h3><p className="mt-2 text-[13px] text-paper-100/70">Your consistency starts with the first logged workout.</p></SolidCard>}

        <p className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-3 text-center text-[12px] leading-[18px] text-paper-100/75">
          Coaching support, not medical advice. Stop and seek help for chest pain, dizziness, faintness, or sharp pain.
        </p>
      </main>
    </HifiShell>
  )
}
