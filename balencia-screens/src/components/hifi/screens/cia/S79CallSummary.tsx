'use client'

import { useEffect, useState } from 'react'
import { Check, Clock, Info, ListChecks, ShieldCheck, Sparkles, TrendingUp, WifiOff } from 'lucide-react'
import {
  BtnSecondary,
  ChatBubble,
  CIAInsightCard,
  GlassCard,
  HifiShell,
  IconButton,
  Provenance,
  SafetyCard,
  SolidCard,
  TopBar,
} from '@/components/hifi/kit'

type CallSummaryState = 'default' | 'skeleton' | 'partial' | 'error' | 'offline' | 'success'
type ActionId = 'fitness' | 'nutrition' | 'sleep'

const CALL_SUMMARY_STATES: CallSummaryState[] = ['default', 'skeleton', 'partial', 'error', 'offline', 'success']
const actionItems: Array<{ id: ActionId; label: string; domain: string; className: string }> = [
  { id: 'fitness', label: 'Check resting HRV tomorrow', domain: 'Fitness', className: 'border-domain-fitness/25 bg-domain-fitness/15 text-domain-fitness' },
  { id: 'nutrition', label: 'Adjust pre-workout nutrition', domain: 'Nutrition', className: 'border-domain-nutrition/25 bg-domain-nutrition/15 text-domain-nutrition' },
  { id: 'sleep', label: 'Log wind-down time before 10 pm', domain: 'Sleep', className: 'border-domain-sleep/25 bg-domain-sleep/15 text-domain-sleep' },
]

function ToneGauge({ value, label }: { value: number; label: string }) {
  const radius = 46
  const circumference = 2 * Math.PI * radius
  return (
    <div className="relative mx-auto flex h-36 w-36 items-center justify-center" role="img" aria-label={`Synthesized tone score ${value} of 100, ${label}`}>
      <svg viewBox="0 0 108 108" className="h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="54" cy="54" r={radius} fill="none" strokeWidth="7" className="stroke-white/[0.08]" />
        <circle cx="54" cy="54" r={radius} fill="none" strokeWidth="7" strokeLinecap="round" className="stroke-brand-orange motion-reduce:transition-none" strokeDasharray={`${(value / 100) * circumference} ${circumference}`} />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-[40px] font-semibold leading-none tabular-nums text-paper-100">{value}</span>
        <span className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-brand-orange">{label}</span>
      </div>
    </div>
  )
}

function Metric({ icon, label, value, note }: { icon: React.ReactNode; label: string; value: string; note: string }) {
  return (
    <div className="min-w-0 px-1.5 first:pl-0 last:pr-0">
      <div className="flex items-center gap-1 text-paper-100/65">{icon}<span className="text-[12px] font-semibold uppercase tracking-wide">{label}</span></div>
      <p className="mt-1 text-[15px] font-semibold tabular-nums text-paper-100">{value}</p>
      <p className="mt-1 text-[12px] leading-4 text-paper-100/65">{note}</p>
    </div>
  )
}

export function S79CallSummary() {
  const [screenState, setScreenState] = useState<CallSummaryState>('default')
  const [checked, setChecked] = useState<Record<ActionId, boolean>>({ fitness: false, nutrition: false, sleep: false })
  const [topic, setTopic] = useState<'recovery' | 'pace' | 'fueling'>('recovery')
  const [showToneInfo, setShowToneInfo] = useState(false)
  const [showEvidence, setShowEvidence] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [status, setStatus] = useState('Call summary visual fixture ready. No transcript, provider, or calendar request was made.')

  useEffect(() => {
    const fixture = new URLSearchParams(window.location.search).get('state') as CallSummaryState | null
    if (!fixture || !CALL_SUMMARY_STATES.includes(fixture)) return
    const timer = window.setTimeout(() => {
      setScreenState(fixture)
      setChecked({ fitness: fixture === 'success', nutrition: false, sleep: false })
      setStatus(
        fixture === 'offline'
          ? 'Offline — showing your last bundled sync, 2 hours ago. Scheduling is unavailable.'
          : fixture === 'skeleton'
            ? 'Follow-up scheduling is disabled while the call summary skeleton loads.'
          : fixture === 'partial'
            ? 'Partial fixture. Duration and tone are available; transcript-derived modules are still unavailable.'
            : fixture === 'error'
              ? 'CIA could not summarize this bundled call fixture. No transcript-derived claim is shown.'
              : `${fixture} call summary fixture loaded.`,
      )
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  const toggleAction = (id: ActionId) => {
    setChecked(current => {
      const next = !current[id]
      setStatus(
        id === 'fitness'
          ? next ? '+40 XP · Fitness action completed in this local preview.' : 'Fitness action reopened and the +40 XP preview was undone.'
          : next ? `${actionItems.find(item => item.id === id)?.domain} action completed locally. No XP was added.` : `${actionItems.find(item => item.id === id)?.domain} action reopened locally.`,
      )
      return { ...current, [id]: next }
    })
  }

  const transcriptReady = screenState !== 'partial' && screenState !== 'error'
  const summaryReady = screenState !== 'error'
  const completedCount = Object.values(checked).filter(Boolean).length

  return (
    <HifiShell
      atmosphere="cia"
      showTabBar={false}
      header={
        <TopBar
          title={<>Call <span className="text-emphasis">summary</span></>}
          right={
            <IconButton label="Voice privacy controls" aria-expanded={showPrivacy} onClick={() => setShowPrivacy(value => !value)}>
              <ShieldCheck className="h-5 w-5" strokeWidth={1.9} />
            </IconButton>
          }
        />
      }
      bottomAction={
        <BtnSecondary
          className="w-full"
          disabled={screenState === 'offline' || screenState === 'error' || screenState === 'skeleton' || screenState === 'partial'}
          aria-describedby="call-summary-live-status"
          onClick={() => setStatus('Follow-up scheduling preview opened locally. No calendar or provider request was made.')}
        >
          Schedule follow-up call
        </BtnSecondary>
      }
    >
      <main className="space-y-3 px-4 pb-4 pt-3" data-call-summary-state={screenState} aria-busy={screenState === 'skeleton'}>
        {screenState === 'offline' && (
          <div className="flex items-start gap-2 rounded-xl border border-white/10 bg-surface-2 px-3 py-2 text-[12px] leading-4 text-paper-100/70">
            <WifiOff aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />offline — showing your last sync, 2h ago
          </div>
        )}

        {screenState === 'skeleton' ? (
          <div className="space-y-3" aria-label="Loading call summary preview">
            <div className="skeleton-block h-72 rounded-[28px]" />
            <div className="skeleton-block h-24 rounded-[22px]" />
            <div className="skeleton-block h-32 rounded-[22px]" />
            <div className="skeleton-block h-48 rounded-[22px]" />
          </div>
        ) : screenState === 'error' ? (
          <>
            <GlassCard tone="cia" className="px-5 py-8 text-center">
              <Info aria-hidden="true" className="mx-auto h-7 w-7 text-brand-orange" />
              <h2 className="mt-3 text-[18px] font-semibold text-paper-100">CIA couldn’t summarize this call</h2>
              <p className="mt-2 text-[13px] leading-5 text-paper-100/70">Try again or review the transcript manually. Metrics and transcript-derived claims remain hidden.</p>
              <BtnSecondary className="mt-4" onClick={() => setStatus('Retry preview selected. No transcript or network request was made.')}>Retry</BtnSecondary>
            </GlassCard>
            <SolidCard className="space-y-3 opacity-50" aria-label="Summary metrics unavailable">
              <div className="skeleton-block h-5 rounded" />
              <div className="skeleton-block h-12 rounded" />
            </SolidCard>
          </>
        ) : (
          <>
            <GlassCard tone="cia" className="px-5 pb-5 pt-5 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-paper-100/60">Morning coaching call · bundled fixture</p>
              <button type="button" aria-label="Tone 72, warm" aria-expanded={showToneInfo} className="focus-ring mx-auto mt-2 block rounded-full" onClick={() => setShowToneInfo(value => !value)}><ToneGauge value={72} label="Warm" /></button>
              <p className="mt-1 text-[18px] leading-snug text-paper-100/90">A clear tone for a tempo day.</p>
              <p className="mt-2 inline-flex min-h-11 items-center gap-2 text-[12px] font-medium text-paper-100/70"><Info aria-hidden="true" className="h-4 w-4" />Tap tone to review how it was estimated</p>
              {showToneInfo && <p className="mt-2 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-left text-[12px] leading-5 text-paper-100/70">Interpretive fixture derived from transcript pacing and word choice. It is not a diagnosis, completion score, or live provider result.</p>}
            </GlassCard>

            {showPrivacy && (
              <div role="region" aria-labelledby="voice-privacy-title">
                <GlassCard tone="muted" className="!p-4">
                  <h2 id="voice-privacy-title" className="text-[16px] font-semibold text-paper-100">Voice privacy controls</h2>
                  <p className="mt-1 text-[12px] leading-5 text-paper-100/70">Source: bundled transcript fixture · raw audio: not stored or connected · retention: no audio retained · audience: private to you.</p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {['Export summary', 'Revoke CIA analysis', 'Delete transcript', 'Delete summary'].map(action => (
                      <BtnSecondary key={action} className="min-h-12 h-auto px-3 py-2 text-[12px]" onClick={() => setStatus(`${action} preview selected. No stored data or account state changed.`)}>{action}</BtnSecondary>
                    ))}
                  </div>
                  <div className="mt-3"><SafetyCard title="Private wellbeing support" /></div>
                </GlassCard>
              </div>
            )}

            <GlassCard tone="done" className="!p-4">
              <div className="grid grid-cols-3 divide-x divide-white/10">
                <Metric icon={<Clock aria-hidden="true" className="h-3 w-3" />} label="Duration" value="12m 04s" note="Bundled" />
                <Metric icon={<ListChecks aria-hidden="true" className="h-3 w-3" />} label="Actions" value={transcriptReady ? '3 items' : 'Pending'} note={transcriptReady ? 'CIA-detected' : 'Transcript unavailable'} />
                <Metric icon={<TrendingUp aria-hidden="true" className="h-3 w-3" />} label="Shift" value={transcriptReady ? '15%' : 'Pending'} note={transcriptReady ? 'Estimated' : 'Transcript unavailable'} />
              </div>
            </GlassCard>

            {transcriptReady ? <SolidCard className="!p-4">
              <div className="flex items-center justify-between"><h2 className="text-[12px] font-semibold uppercase tracking-wider text-paper-100/65">Call topics</h2><span className="text-[11px] text-paper-100/60">12m fixture</span></div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {([
                  ['recovery', 'Recovery', '5m'],
                  ['pace', 'Pace', '3m'],
                  ['fueling', 'Fueling', '4m'],
                ] as const).map(([value, label, duration]) => (
                  <button key={value} type="button" aria-pressed={topic === value} className={`focus-ring min-h-[52px] rounded-xl border px-2 text-[11px] ${topic === value ? 'border-brand-orange bg-brand-orange/15 text-brand-orange' : 'border-white/10 bg-white/[0.03] text-paper-100/70'}`} onClick={() => { setTopic(value); setStatus(`${label} topic selected · ${duration} in bundled transcript fixture.`) }}>
                    <span className="block font-semibold">{label}</span><span className="mt-0.5 block tabular-nums">{duration}</span>
                  </button>
                ))}
              </div>
            </SolidCard> : <GlassCard tone="muted" className="!p-4">
              <h2 className="text-[13px] font-semibold text-paper-100">Call topics pending</h2>
              <p className="mt-1 text-[12px] leading-5 text-paper-100/65">Topic labels and durations stay hidden until the transcript fixture is available.</p>
            </GlassCard>}

            {transcriptReady ? (
              <CIAInsightCard eyebrow="CIA insight" provenance={['Bundled transcript', 'Bundled meal log']}>
                <p>Your pacing held because fueling happened early.</p>
                <button type="button" className="focus-ring mt-3 inline-flex min-h-11 items-center gap-2 rounded-pill border border-white/10 px-3 text-[12px] text-paper-100/75" aria-expanded={showEvidence} onClick={() => setShowEvidence(value => !value)}><Sparkles aria-hidden="true" className="h-4 w-4 text-royal-purple" />Review CIA evidence</button>
                {showEvidence && <p className="mt-2 text-[12px] leading-5 text-paper-100/70">Evidence is limited to this bundled transcript and meal-log fixture. Freshness and confidence are not connected.</p>}
              </CIAInsightCard>
            ) : (
              <GlassCard tone="muted" className="!p-4"><p className="text-[13px] font-semibold text-paper-100">Transcript analysis pending</p><p className="mt-1 text-[12px] text-paper-100/65">CIA insight and evidence stay hidden until the transcript fixture is available.</p></GlassCard>
            )}

            {transcriptReady ? <section aria-labelledby="call-actions-title" className="space-y-2">
              <div className="flex items-center justify-between px-1"><h2 id="call-actions-title" className="text-[11px] font-semibold uppercase tracking-wider text-paper-100/65">Action items</h2><span className="text-[12px] tabular-nums text-paper-100/60">{completedCount} of 3</span></div>
              {actionItems.map(item => (
                <label key={item.id} className="focus-within:shadow-[var(--focus-ring)] flex min-h-[56px] cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <input type="checkbox" aria-label={item.label} className="h-6 w-6 shrink-0 cursor-pointer accent-forest-green" checked={checked[item.id]} onChange={() => toggleAction(item.id)} />
                  <span className="min-w-0 flex-1 text-[13px] text-paper-100/85">{item.label}</span>
                  <span className={`inline-flex shrink-0 rounded-pill border px-2 py-1 text-[12px] font-semibold ${item.className}`}>{item.domain}</span>
                </label>
              ))}
              {checked.fitness && <p className="rounded-xl border border-forest-green/25 bg-forest-green/10 px-3 py-2 text-[12px] font-medium text-paper-100"><Check aria-hidden="true" className="mr-2 inline h-4 w-4 text-forest-green" />+40 XP · Fitness · undo by unchecking</p>}
            </section> : <section aria-labelledby="call-actions-pending-title">
              <GlassCard tone="muted" className="!p-4">
                <h2 id="call-actions-pending-title" className="text-[13px] font-semibold text-paper-100">Action items pending</h2>
                <p className="mt-1 text-[12px] leading-5 text-paper-100/65">No actions, completion count, or XP can be derived until the transcript fixture is available.</p>
              </GlassCard>
            </section>}

            {transcriptReady ? (
              <section aria-labelledby="transcript-title" className="space-y-2">
                <h2 id="transcript-title" className="px-1 text-[11px] font-semibold uppercase tracking-wider text-paper-100/65">Transcript highlight</h2>
                <ChatBubble speaker="CIA" tone="cia" messageId="call-summary-highlight" status="sent" source="Bundled transcript fixture" audience="private-to-you" timestamp="10:14 am" dateTime="2026-07-10T10:14:00+05:00">
                  Let’s lock in that pacing rule.
                </ChatBubble>
              </section>
            ) : (
              <section aria-labelledby="transcript-title-partial" className="space-y-2">
                <h2 id="transcript-title-partial" className="px-1 text-[11px] font-semibold uppercase tracking-wider text-paper-100/65">Transcript highlight</h2>
                <ChatBubble speaker="CIA" tone="cia" messageId="call-summary-highlight-pending" status="thinking" source="Transcript not captured" audience="private-to-you" timestamp="Pending" dateTime="2026-07-10T10:14:00+05:00">
                  Transcript highlight unavailable in this partial fixture.
                </ChatBubble>
              </section>
            )}

            <div className="flex justify-center"><Provenance items={['Bundled fixture', summaryReady ? 'Summary available' : 'Unavailable', 'Private-to-you']} /></div>
          </>
        )}

        <p id="call-summary-live-status" className="min-h-5 text-[12px] leading-5 text-paper-100/70" role="status" aria-live="polite" aria-atomic="true">{status}</p>
      </main>
    </HifiShell>
  )
}
