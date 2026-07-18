'use client'

import { useEffect, useState } from 'react'
import { Check, Flame, Footprints, MessageCircle, Moon, Pause, Play, RotateCcw, Wind, X } from 'lucide-react'
import {
  BtnGhost, BtnPrimary, BtnSecondary, CIAInsightCard, Chip, ConsentRail, FULL_DATA_CONTROLS,
  HeatGrid, HifiShell, PaywallLock, Provenance, SafetyCard, SolidCard, TopBar, TrendChart,
} from '@/components/hifi/kit'
import { E1Modal } from '../intelligence/E1Modal'

type View = 'library' | 'active' | 'paused' | 'post' | 'success'
const actualMinutes = [15, 20, 10, 30, 25, 20, 25]
const actualTotal = actualMinutes.reduce((sum, value) => sum + value, 0)

export function S54Meditation() {
  const [fixture, setFixture] = useState('default-real')
  const [view, setView] = useState<View>('library')
  const [rating, setRating] = useState<number | null>(null)
  const [filter, setFilter] = useState('All')
  const [status, setStatus] = useState('Local visual fixture only. No health provider, account, call, payment, or network capability is active.')
  useEffect(() => {
    const next = new URLSearchParams(window.location.search).get('state') ?? 'default-real'
    queueMicrotask(() => {
      setFixture(next)
      setView(next === 'active-session' ? 'active' : next === 'paused' ? 'paused' : next === 'post-disabled' ? 'post' : next === 'post-success' ? 'success' : 'library')
      setRating(next === 'post-success' ? 4 : null)
      setFilter(next === 'filter-quick' ? 'Quick' : 'All')
    })
  }, [])
  const isLow = fixture === 'low-confidence'
  const isNull = fixture === 'honest-null'
  const isError = fixture === 'error-retry'
  const isOffline = fixture === 'offline'
  const controls = fixture === 'data-controls'
  const premium = fixture === 'premium-preview'

  const start = () => setView('active')
  const closeSession = () => setView('library')
  const sessionOverlay = view !== 'library' ? (
    <E1Modal label="Meditation session" onClose={closeSession} className="!bg-ink-900 border border-white/15 shadow-2xl">
        <div className="flex items-center justify-between">
          <div><p className="text-[12px] uppercase tracking-wider text-paper-100/65">5-minute practice</p><h2 id="meditation-session-title" className="mt-1 text-[22px] font-semibold text-paper-100">Body scan</h2></div>
          <button type="button" className="focus-ring grid h-11 w-11 place-items-center rounded-full" aria-label="Close session" onClick={closeSession}><X /></button>
        </div>
        {view === 'success' ? (
          <div className="py-8 text-center" role="status"><Check className="mx-auto h-10 w-10 text-forest-green" /><p className="mt-3 text-[18px] font-semibold text-paper-100">Practice saved</p><p className="mt-1 text-[13px] text-paper-100/70">5 minutes added to your local preview log.</p><BtnPrimary className="mt-5 w-full" onClick={closeSession}>Done</BtnPrimary></div>
        ) : view === 'post' ? (
          <div className="mt-5"><p className="text-[15px] text-paper-100">How do you feel now?</p><div className="mt-3 flex justify-between" role="radiogroup" aria-label="Session rating">{[1,2,3,4,5].map(value => <button key={value} type="button" role="radio" aria-checked={rating === value} onClick={() => setRating(value)} className={`focus-ring h-11 w-11 rounded-full border ${rating === value ? 'border-brand-orange bg-brand-orange text-ink-900' : 'border-white/15 text-paper-100'}`}>{value}</button>)}</div><label className="mt-4 block text-[13px] text-paper-100/70">Private note<textarea className="focus-ring mt-2 min-h-24 w-full rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-[16px] text-paper-100" /></label><BtnPrimary className="mt-4 w-full" disabled={rating === null} onClick={() => setView('success')}>Save feedback</BtnPrimary></div>
        ) : (
          <div className="mt-6 text-center"><div className="mx-auto grid h-44 w-44 place-items-center rounded-full border-8 border-brand-orange/70 bg-brand-orange/10 motion-safe:animate-pulse motion-reduce:animate-none" role="timer" aria-label={`${view === 'paused' ? 'Paused' : 'Body scan in progress'}, 4 minutes 32 seconds remaining`}><div><p className="text-[12px] uppercase tracking-widest text-paper-100/65">{view === 'paused' ? 'Paused' : 'Breathe naturally'}</p><p className="mt-2 text-[32px] font-semibold tabular-nums text-paper-100">4:32</p></div></div><div className="mt-6 flex justify-center gap-3"><BtnSecondary onClick={() => setView(view === 'paused' ? 'active' : 'paused')}>{view === 'paused' ? <Play /> : <Pause />}{view === 'paused' ? 'Resume' : 'Pause'}</BtnSecondary><BtnPrimary onClick={() => setView('post')}>Finish</BtnPrimary></div></div>
        )}
    </E1Modal>
  ) : undefined

  return (
    <HifiShell header={<TopBar title={<>Meditation &amp; <span className="text-emphasis">mindfulness</span></>} right={<Chip tone="muted">Mental · app log</Chip>} />} activeTab="today" atmosphere="you" overlay={sessionOverlay}>
      <main data-f1-state={`54-${fixture}`} className="space-y-4 px-4 pb-8 pt-3">
        <CIAInsightCard provenance={isLow ? ['App log · partial sync', 'Estimated · low confidence'] : ['App log · today', 'Sleep log · 7 days']} actions={<div className="flex flex-wrap gap-2"><BtnSecondary onClick={start}><Play /> Start 5-min body scan</BtnSecondary><BtnGhost onClick={() => setStatus('CIA question preview opened locally. No message, account data, or network request was sent.')}><MessageCircle /> Ask CIA</BtnGhost></div>}>
          {isNull ? 'No personal pattern yet. A five-minute body scan is available whenever it feels useful.' : isLow ? 'Your recent logs are incomplete. A short body scan may offer a quiet reset.' : 'Your recent check-ins show a busier week. A five-minute body scan may help you pause.'}
        </CIAInsightCard>
        <p className="text-[12px] leading-5 text-paper-100/70" role="status">{status}</p>
        <SafetyCard title="Wellbeing support" description="Open qualified local support guidance. This prototype does not diagnose stress or place calls." />

        <div role="tablist" aria-label="Practice filters" className="hide-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
          {['All','Meditation','Quick','Move'].map(item => <button key={item} type="button" role="tab" aria-selected={filter === item} onClick={() => setFilter(item)} className={`focus-ring min-h-11 shrink-0 rounded-full px-4 text-[13px] font-medium ${filter === item ? 'bg-paper-100 text-ink-900' : 'border border-white/10 text-paper-100/80'}`}>{item}</button>)}
        </div>

        {isError ? <SolidCard className="p-5 text-center"><p role="alert" className="text-[16px] font-semibold text-paper-100">Practices could not refresh</p><p className="mt-1 text-[13px] text-paper-100/70">Your cached body scan remains available.</p><BtnSecondary className="mt-4" onClick={start}><RotateCcw /> Retry</BtnSecondary></SolidCard> : <div className="space-y-2"><Practice icon={<Moon />} title="Body scan" duration="5 min" detail="Release tension · before sleep" onClick={start} /><Practice icon={<Wind />} title="Deep breathing" duration="3 min" detail="Anchor focus · anytime" onClick={start} />{filter !== 'Quick' && <Practice icon={<Footprints />} title="Walking meditation" duration="8 min" detail="Ground awareness · outdoors" onClick={start} />}</div>}

        {isOffline && <SolidCard className="p-4"><p role="status" className="font-semibold text-paper-100">Offline · cached practices</p><p className="mt-1 text-[13px] text-paper-100/70">Last app-log sync 2h ago. New feedback stays in this visual preview only.</p></SolidCard>}

        {premium ? <PaywallLock title="Advanced recommendation preview" description="Longer pattern analysis is a premium preview. Beginner practices stay included." action={<BtnPrimary onClick={() => setStatus('Premium information preview selected locally. No checkout, payment, account, or navigation action occurred.')}>View premium details</BtnPrimary>}><TrendChart past={actualMinutes} label="Blurred advanced practice trend" /></PaywallLock> : (
          <>
            <SolidCard className="p-4"><div className="flex items-center justify-between"><div className="flex items-center gap-2"><Flame className="text-brand-orange" /><h2 className="font-semibold text-paper-100">Mindfulness streak</h2></div><span className="text-[22px] font-semibold tabular-nums text-paper-100">{isNull ? '0 days' : '12 days'}</span></div><div className="mt-3"><HeatGrid values={isNull ? [0,0,0,0,0,0,0] : [3,3,0,2,3,2,3]} label={isNull ? 'No completed sessions this week' : 'Five completed practice days this week'} /></div><Provenance items={['App log · today']} /></SolidCard>
            <SolidCard className="p-4"><div className="flex flex-wrap items-start justify-between gap-2"><div><h2 className="font-semibold text-paper-100">Practice minutes</h2><p className={`mt-1 text-[24px] font-semibold tabular-nums ${isLow ? 'text-paper-100/65' : 'text-paper-100'}`}>{isNull ? 'Not enough data' : `${actualTotal} min`}</p><p className="text-[12px] text-paper-100/65">{isNull ? 'Complete one practice to begin' : 'Actual · this week'}</p></div><Provenance items={[isLow ? 'Partial app log' : 'App log · today']} /></div>{!isNull && <div className="mt-4"><TrendChart past={actualMinutes} projected={[30]} label={`Actual practice minutes total ${actualTotal}; projected next session 30 minutes, low confidence`} /><div className="mt-2 flex items-center gap-2 text-[11px] text-paper-100/65"><span className="w-8 border-t-2 border-dashed border-royal-purple" />Projected separately<Chip tone="cia">Low confidence</Chip></div></div>}</SolidCard>
          </>
        )}

        {controls ? <SolidCard className="p-4"><h2 className="font-semibold text-paper-100">Meditation data controls</h2><p className="mt-1 text-[13px] text-paper-100/70">Health category · app log · this practice only · refreshed today · confirmed · retained until deleted.</p><ConsentRail compact controls={FULL_DATA_CONTROLS} /></SolidCard> : <ConsentRail compact controls={FULL_DATA_CONTROLS} />}
      </main>
    </HifiShell>
  )
}

function Practice({ icon, title, duration, detail, onClick }: { icon: React.ReactNode; title: string; duration: string; detail: string; onClick: () => void }) {
  return <button type="button" onClick={onClick} className="focus-ring flex min-h-[72px] w-full items-center gap-3 rounded-2xl bg-ink-brown-800 p-3.5 text-left"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/[0.05] text-domain-meditation">{icon}</span><span className="min-w-0 flex-1"><span className="flex justify-between gap-2"><strong className="text-[15px] text-paper-100">{title}</strong><span className="shrink-0 text-[13px] text-paper-100/75">{duration}</span></span><span className="mt-1 block text-[12px] text-paper-100/65">{detail}</span></span></button>
}
