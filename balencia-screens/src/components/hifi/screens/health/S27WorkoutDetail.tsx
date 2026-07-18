'use client'

import { Activity, ChevronRight, Dumbbell, Footprints, Pause, SkipForward, Square, Timer } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  BtnPrimary,
  Chip,
  CIAInsightCard,
  ConsentRail,
  FULL_DATA_CONTROLS,
  GlassCard,
  GlassPillInput,
  HifiShell,
  IconButton,
  MomentumBar,
  ProgressRing,
  Provenance,
  SolidCard,
  TopBar,
} from '@/components/hifi/kit'

// Workout detail / active session, chosen state: default — set 3 of 5 live,
// heart rate real (via WHOOP), pace low-confidence (via Apple Watch), rest
// timer counting down. Skeleton (shimmer exercise + input geometry), empty
// manual-log, offline (queued set save), and post-workout summary are
// documented in the source spec and not rendered in parallel here, per catalog.

export function S27WorkoutDetail() {
  const [state, setState] = useState('active')
  const [weight, setWeight] = useState('83.9')
  const [reps, setReps] = useState('8')
  useEffect(() => {
    const next = new URLSearchParams(window.location.search).get('state') ?? 'active'
    queueMicrotask(() => setState(next))
  }, [])
  if (state === 'summary') return <WorkoutOutcome state="summary" title="Workout complete" body="3 sets saved locally · recovery note previewed" action="Back to workout" onAction={() => setState('active')} />
  if (state === 'stopped') return <WorkoutOutcome state="stopped" title="Workout stopped" body="Your completed sets remain in this local preview." action="Resume workout" onAction={() => setState('active')} />
  const paused = state === 'paused'
  const sensorNull = state === 'sensor-null'
  const offline = state === 'offline'
  return (
    <HifiShell
      header={
        <TopBar
          title="Exercise 2 of 5"
          right={
            <div className="flex items-center gap-1">
              <span className="text-[13px] font-semibold text-white/70 tabular-nums">12:04</span>
              <IconButton label={paused ? 'Resume workout' : 'Pause workout'} onClick={() => setState(paused ? 'active' : 'paused')}>
                <Pause size={18} strokeWidth={1.9} />
              </IconButton>
              <IconButton label="Stop workout" onClick={() => setState('stopped')}>
                <Square size={17} strokeWidth={1.9} />
              </IconButton>
            </div>
          }
        />
      }
      atmosphere="you"
      showTabBar={false}
    >
      <main className="space-y-4 px-4 pb-6 pt-3" data-state={state}>
        {paused && <p role="status" className="glass-pill px-4 py-3 text-[13px] text-paper-100/75">Workout paused · timer and set inputs are paused</p>}
        {offline && <p role="status" className="glass-pill px-4 py-3 text-[13px] text-paper-100/75">Offline · local save preview only; server sync is unavailable</p>}
        {state === 'data-controls' && <SolidCard><h2 className="text-[15px] font-semibold">Workout data controls</h2><p className="mt-2 text-[12px] leading-5 text-paper-100/70">Health &amp; fitness · WHOOP and workout log · live session scope · updated now · mixed confidence · retained 12 months. Export, revoke, and delete are local prototype previews.</p></SolidCard>}
        {state === 'safety' && <SolidCard><h2 className="text-[15px] font-semibold">Stop guidance</h2><p className="mt-2 text-[13px] leading-5 text-paper-100/75">Stop immediately for sharp pain, dizziness, faintness, or chest pain. Seek urgent local help when symptoms are severe or persistent.</p></SolidCard>}
        {state === 'success' && <p role="status" className="rounded-xl border border-forest-green/30 bg-forest-green/10 px-4 py-3 text-[13px]">Rest skipped locally. Next exercise preview selected.</p>}
        <SolidCard>
          <div className="flex items-center justify-between pb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-white/45">Set progress</span>
            <span className="text-[12px] font-medium text-white/60 tabular-nums">3 of 5 sets</span>
          </div>
          <MomentumBar value={60} label="Cumulative set progress, 60 percent, 3 of 5 sets complete" />
        </SolidCard>

        <div className="grid grid-cols-2 gap-3">
          <SolidCard className="flex min-h-[92px] flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-white/50">
                <Activity size={14} strokeWidth={2} /> Heart rate
              </span>
              <Chip tone="you">Via WHOOP</Chip>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[26px] font-semibold leading-none tracking-tight text-white tabular-nums">{sensorNull ? '—' : '135'}</span>
              <span className="text-[13px] font-medium text-white/45">BPM</span>
            </div>
          </SolidCard>

          <SolidCard className="flex min-h-[92px] flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-white/50">
                <Footprints size={14} strokeWidth={2} /> Pace
              </span>
              <Chip>Via Apple Watch</Chip>
            </div>
            <div className="flex items-baseline gap-1.5 opacity-60">
              <span className="text-[22px] font-semibold leading-none tracking-tight text-white tabular-nums">{sensorNull ? '—' : '5:17'}</span>
              <span className="text-[13px] font-medium text-white/45">/km</span>
            </div>
            <span className="text-[10px] font-medium uppercase tracking-wide text-white/45">{sensorNull ? 'Sensor not available' : 'Estimated · low confidence'}</span>
          </SolidCard>
        </div>

        <GlassCard tone="you" className="avatar-breathe relative overflow-hidden">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45">Back squat</p>
              <h2 className="mt-1 text-[20px] font-semibold leading-6 text-white">Set 3 of 5</h2>
            </div>
            <span className="shrink-0 rounded-pill bg-domain-fitness/15 px-3 py-1 text-[11px] font-semibold text-domain-fitness">
              Fitness
            </span>
          </div>

          <div
            className="mt-4 flex h-[104px] items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]"
            role="img"
              aria-label="Back squat tutorial unavailable. Keep a neutral spine, brace comfortably, and stop for pain. Code-native fallback; no person imagery."
          >
            <Dumbbell size={24} strokeWidth={1.6} className="text-white/45" aria-hidden="true" />
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div>
              <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wide text-white/50">Weight (kg)</span>
              <GlassPillInput label="Weight in kilograms" placeholder="Weight" value={weight} inputMode="decimal" onChange={event => setWeight(event.currentTarget.value)} focused={state === 'input-edit'} disabled={paused} />
            </div>
            <div>
              <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wide text-white/50">Reps</span>
              <GlassPillInput label="Repetitions" placeholder="Reps" value={reps} inputMode="numeric" onChange={event => setReps(event.currentTarget.value)} disabled={paused} />
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="text-[12px] text-white/50">
              Last set: <span className="font-medium text-white/75 tabular-nums">83.9 kg × 8</span>
            </p>
            <Provenance items={['You logged']} />
          </div>

          <div className="mt-4">
            <BtnPrimary disabled={paused} onClick={() => setState('summary')}>Complete set</BtnPrimary>
          </div>
        </GlassCard>

        <div className="flex gap-3">
          <div className="flex-1 rounded-xl border border-white/10 bg-white/[0.02] p-3 opacity-40">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-white/45">Set 4</p>
            <p className="mt-1 text-[12px] leading-4 text-white/55">Locked until set 3 completes</p>
          </div>
          <div className="flex-1 rounded-xl border border-white/10 bg-white/[0.02] p-3 opacity-40">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-white/45">Set 5</p>
            <p className="mt-1 text-[12px] leading-4 text-white/55">Locked until set 4 completes</p>
          </div>
        </div>

        <GlassCard tone="you" className="flex items-center justify-between gap-3 p-3">
          <div className="flex items-center gap-3">
            <ProgressRing percent={75} value="45" label="Sec" size={48} tone="you" />
            <div>
              <p className="text-[15px] font-semibold leading-5 text-white tabular-nums">00:45 remaining</p>
              <p className="flex items-center gap-1 text-[11px] text-white/45">
                <Timer size={11} strokeWidth={2} /> Rest between sets
              </p>
            </div>
          </div>
          <button type="button" onClick={() => setState('success')} className="focus-ring flex min-h-11 items-center gap-1 rounded-lg px-2 text-[13px] font-semibold text-white/70">
            Skip rest
            <SkipForward size={15} strokeWidth={2} />
          </button>
        </GlassCard>

        <CIAInsightCard
          provenance={['Form guidance']}
          actions={
            <button type="button" onClick={() => setState('success')} className="focus-ring flex min-h-11 w-full items-center justify-between rounded-lg border-t border-white/10 pt-2 text-left text-[12px] text-white/60">
              <span>
                Next up: <span className="font-medium text-white">Romanian deadlift</span>
              </span>
              <ChevronRight size={15} strokeWidth={1.9} />
            </button>
          }
        >
          <p>
            This <span className="text-emphasis">workout</span> stays honest to form. Stop for sharp pain, dizziness, faintness, or chest pain.
          </p>
        </CIAInsightCard>

        <p className="px-2 text-center text-[11px] leading-4 text-white/55">
          Coaching support, not medical advice. Pause anytime.
        </p>

        <ConsentRail compact controls={FULL_DATA_CONTROLS} />

        <div className="flex items-center gap-1.5 px-1 text-[11px] text-white/40">
          <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
          Offline behavior is a local prototype preview; server sync requires an implemented dependency.
        </div>
      </main>
    </HifiShell>
  )
}

function WorkoutOutcome({ state, title, body, action, onAction }: { state: string; title: string; body: string; action: string; onAction: () => void }) {
  return <HifiShell showTabBar={false} header={<TopBar title={title} />}><main data-state={state} className="px-4 pt-8"><SolidCard><h2 className="text-[22px] font-semibold text-paper-100">{title}</h2><p className="mt-2 text-[14px] leading-5 text-paper-100/70">{body}</p><BtnPrimary className="mt-5" onClick={onAction}>{action}</BtnPrimary></SolidCard></main></HifiShell>
}
