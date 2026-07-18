'use client'

import { useEffect, useRef, useState } from 'react'
import { CircleHelp, Lock, Plus, Shield, X } from 'lucide-react'
import {
  BtnGhost,
  BtnPrimary,
  Chip,
  CIAInsightCard,
  ConsentRail,
  GlassCard,
  HifiShell,
  IconButton,
  PaywallLock,
  Provenance,
  SolidCard,
  TopBar,
  TrendChart,
} from '@/components/hifi/kit'
import { E1Modal } from './E1Modal'

type MoodFixture = 'default' | 'crisis' | 'offline-crisis' | 'log-sheet' | 'success' | 'empty' | 'error-cached' | 'paywall-90d'

function resolveFixture(candidate: string | null): MoodFixture {
  const fixtures: MoodFixture[] = ['default', 'crisis', 'offline-crisis', 'log-sheet', 'success', 'empty', 'error-cached', 'paywall-90d']
  return fixtures.includes(candidate as MoodFixture) ? candidate as MoodFixture : 'default'
}

const journalDays = [
  { day: 1, date: 'Jul 2', visibility: 'Private marker' },
  { day: 3, date: 'Jul 4', visibility: 'Private marker' },
  { day: 5, date: 'Jul 6', visibility: 'Private marker' },
] as const

const recent = [
  { date: 'Jul 7', mood: 'steady' },
  { date: 'Jul 6', mood: 'low' },
] as const

export function S93MoodTrends() {
  const [fixture, setFixture] = useState<MoodFixture>('default')
  const [crisisOpen, setCrisisOpen] = useState(false)
  const [crisisChoice, setCrisisChoice] = useState<string | null>(null)
  const [logOpen, setLogOpen] = useState(false)
  const [consentOpen, setConsentOpen] = useState(false)
  const [consentEnabled, setConsentEnabled] = useState(true)
  const [selectedMood, setSelectedMood] = useState(6)
  const [timeframe, setTimeframe] = useState<'7D' | '30D' | '90D' | '1Y'>('7D')
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [dataStatus, setDataStatus] = useState('')
  const returnFocus = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const state = resolveFixture(new URLSearchParams(window.location.search).get('state'))
    queueMicrotask(() => {
      setFixture(state)
      setCrisisOpen(state === 'crisis' || state === 'offline-crisis')
      setLogOpen(state === 'log-sheet')
      setTimeframe(state === 'paywall-90d' ? '90D' : '7D')
    })
  }, [])

  const empty = fixture === 'empty'
  const success = fixture === 'success'
  const offline = fixture === 'offline-crisis'
  const error = fixture === 'error-cached'
  const locked = fixture === 'paywall-90d'
  const checkInCount = success ? 5 : 4
  const mood = success ? 7 : 6
  const windowDays = timeframe === '30D' ? 30 : 7

  const restoreFocus = () => requestAnimationFrame(() => { if (returnFocus.current?.isConnected) returnFocus.current.focus() })
  const openCrisis = (trigger: HTMLButtonElement) => { returnFocus.current = trigger; setCrisisOpen(true) }
  const openLog = (trigger: HTMLButtonElement) => { returnFocus.current = trigger; setLogOpen(true) }
  const openConsent = (trigger: HTMLButtonElement) => { returnFocus.current = trigger; setConsentOpen(true) }
  const closeCrisis = () => { setCrisisOpen(false); restoreFocus() }
  const closeLog = () => { setLogOpen(false); restoreFocus() }
  const closeConsent = () => { setConsentOpen(false); setDeleteConfirm(false); restoreFocus() }

  return (
    <HifiShell
      header={
        <TopBar
          title="Mood"
          right={
            <div className="flex items-center gap-1">
              <button type="button" aria-label="Log mood" onClick={event => openLog(event.currentTarget)} className="focus-ring grid h-11 w-11 place-items-center rounded-full text-paper-100/80"><Plus size={18} strokeWidth={2} /></button>
              <button type="button" aria-label="Help and crisis resources" onClick={event => openCrisis(event.currentTarget)} className="focus-ring grid h-11 w-11 place-items-center rounded-full text-paper-100/80"><CircleHelp size={18} strokeWidth={1.9} /></button>
            </div>
          }
        />
      }
      atmosphere="you"
      activeTab="me"
    >
      <main className="space-y-4 px-4 pb-4 pt-3" data-fixture={fixture}>
        {(offline || error) && (
          <div role="status" className="rounded-xl border border-white/15 bg-ink-900 px-3 py-2 text-[12px] leading-5 text-paper-100/80">
            {offline ? 'Offline — crisis guidance remains available on this device. Mood trend cached Jul 7, 8:20 AM.' : 'Journal source unavailable — showing cached mood check-ins from Jul 7, 8:20 AM.'}
          </div>
        )}

        <div role="tablist" aria-label="Timeframe" className="grid grid-cols-4 gap-1 rounded-pill border border-white/10 bg-white/[0.03] p-1">
          {(['7D', '30D', '90D', '1Y'] as const).map(option => <button key={option} type="button" role="tab" aria-selected={timeframe === option} onClick={() => { setTimeframe(option); setFixture(option === '90D' || option === '1Y' ? 'paywall-90d' : 'default') }} className={`focus-ring flex min-h-11 items-center justify-center gap-1 rounded-pill px-1 text-[12px] font-medium ${timeframe === option ? 'bg-white/10 text-white' : 'text-white/70'}`}>{(option === '90D' || option === '1Y') && <Lock size={12} />}{option}</button>)}
        </div>

        {empty ? (
          <SolidCard>
            <p className="text-[16px] font-semibold text-paper-100">No mood check-ins yet</p>
            <p className="mt-1 text-[13px] leading-5 text-paper-100/70">Log how today feels when you are ready. No pattern is inferred from an empty history.</p>
            <BtnPrimary className="mt-4 min-h-11" onClick={event => openLog(event.currentTarget)}>Log mood</BtnPrimary>
          </SolidCard>
        ) : (
          <GlassCard tone="you">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-orange">Today feels</p>
              <span className="text-[12px] text-paper-100/70 tabular-nums">Jul 7 · 8:20 AM</span>
            </div>
            <div className="mt-2 flex flex-wrap items-baseline gap-2">
              <span className="text-[30px] font-semibold leading-9 text-white tabular-nums">{mood}</span>
              <span className="text-[14px] text-paper-100/70">/10</span>
              <span className="text-[17px] text-white/85"><span className="text-emphasis">{success ? 'hopeful' : 'steady'}</span></span>
            </div>
            <div className="mt-2"><Provenance items={['Check-in · high confidence']} /></div>
          </GlassCard>
        )}

        <SolidCard className="border-white/10">
          <button type="button" onClick={event => openCrisis(event.currentTarget)} className="focus-ring -m-2 flex min-h-14 w-[calc(100%+1rem)] items-center gap-3 rounded-lg p-2 text-left">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/[0.04] text-paper-100/80"><Shield size={19} /></span>
            <span className="min-w-0 flex-1">
              <span className="block text-[15px] font-semibold text-paper-100">Crisis resources</span>
              <span className="mt-1 block text-[12px] leading-4 text-paper-100/70">Call, text, or view local help — available offline in this prototype.</span>
            </span>
          </button>
        </SolidCard>

        {locked ? (
          <PaywallLock
            title="90-day mood patterns"
            description="Longer trends are a Premium feature. Crisis resources and mood logging always stay available."
            action={<BtnPrimary className="min-h-11" onClick={() => setFixture('default')}>Preview Premium</BtnPrimary>}
          >
            <div className="h-36 rounded-xl bg-white/[0.05]" />
          </PaywallLock>
        ) : !empty && (
          <SolidCard>
            <div className="flex items-center justify-between gap-3">
              <p className="text-[13px] font-semibold text-white">Mood trend</p>
              <span className="text-[11px] text-paper-100/70">{windowDays} days · {checkInCount} check-ins</span>
            </div>
            <div className="mt-3">
              <TrendChart
                past={success ? [5, 6, 5, 6, 7] : [5, 6, 5, 6]}
                projected={[6, 7]}
                milestones={journalDays.map(item => item.day)}
                height={100}
                label={`${windowDays}-day mood trend, ${checkInCount} real check-ins, 3 private journal-day markers, and 2 estimated context points. Mood values range from 5 to ${mood}.`}
              />
            </div>
            <div className="mt-2 grid grid-cols-7 text-center text-[10px] text-paper-100/60"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 border-t border-white/10 pt-3 text-[11px] text-paper-100/70">
              <span className="flex items-center gap-1.5"><span className="h-0.5 w-3 bg-brand-orange" /> Mood, real</span>
              <span className="flex items-center gap-1.5"><span className="h-0.5 w-3 border-t border-dashed border-royal-purple" /> Estimated context</span>
              <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-forest-green" /> Journal days · 3</span>
            </div>
          </SolidCard>
        )}

        {!empty && !locked && consentEnabled && (
          <CIAInsightCard provenance={[`${checkInCount} check-ins`, '3 private journal markers', `${windowDays}-day window`, 'Updated 8:20 AM', 'Medium confidence']} actions={<BtnGhost className="min-h-11 px-0" onClick={event => openConsent(event.currentTarget)}>Discuss patterns with CIA &rarr;</BtnGhost>}>
            <p>Mood was higher on journal days in this window. A non-causal observation, not a diagnosis.</p>
          </CIAInsightCard>
        )}

        {!empty && (
          <SolidCard>
            <p className="px-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-paper-100/70">Recent</p>
            <div className="mt-2 space-y-1.5">
              {recent.map(row => <button key={row.date} type="button" className="focus-ring flex min-h-11 w-full items-center justify-between rounded-lg bg-white/[0.03] px-3"><span className="text-[12px] text-paper-100/70 tabular-nums">{row.date}</span><Chip>{row.mood}</Chip></button>)}
              <button type="button" onClick={event => openLog(event.currentTarget)} className="focus-ring flex min-h-11 w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-white/20 text-[13px] font-medium text-brand-orange"><Plus size={15} /> Add note</button>
            </div>
          </SolidCard>
        )}

        <GlassCard tone="muted">
          <p className="text-[12px] font-semibold uppercase text-paper-100/70">Mood, journal & inference consent</p>
          <p className="mt-1 text-[12px] leading-5 text-paper-100/70">Scope: mood check-ins and private journal markers. No entry text. Updated on each check-in; retained until deletion. Export, revoke, or delete any time.</p>
          <button type="button" onClick={event => openConsent(event.currentTarget)} className="focus-ring mt-2 min-h-11 w-full rounded-lg border border-white/15 px-3 text-left text-[13px] text-paper-100">Manage consent & data</button>
          <ConsentRail compact />
        </GlassCard>

        {crisisOpen && (
          <E1Modal label="Crisis resources" onClose={closeCrisis} className="shadow-2xl">
              <div className="flex items-start justify-between gap-3"><div><h2 id="mood-crisis-title" className="text-[18px] font-semibold text-paper-100">Crisis resources</h2><p className="mt-1 text-[12px] leading-5 text-paper-100/70">Local prototype previews only. No call, text, navigation, or external service will open.</p></div><IconButton className="shrink-0" label="Close crisis resources" onClick={closeCrisis}><X size={18} /></IconButton></div>
              {offline && <p role="status" className="mt-3 rounded-lg bg-white/[0.04] p-3 text-[12px] text-paper-100/80">Offline — saved local guidance remains available.</p>}
              <div className="mt-4 grid gap-2">
                {['Call emergency help preview', 'Text crisis support preview', 'View saved local help'].map(choice => <button key={choice} type="button" onClick={() => setCrisisChoice(choice)} className="focus-ring min-h-12 rounded-xl border border-white/15 px-4 text-left text-[14px] font-medium text-paper-100">{choice}</button>)}
              </div>
              {crisisChoice && <p role="status" className="mt-3 text-[12px] leading-5 text-forest-green">{crisisChoice} selected. Prototype only — no external action fired.</p>}
          </E1Modal>
        )}

        {logOpen && (
          <E1Modal label="How do you feel?" onClose={closeLog}><div className="flex items-center justify-between"><h2 className="text-[18px] font-semibold text-paper-100">How do you feel?</h2><IconButton label="Close mood log" onClick={closeLog}><X size={18} /></IconButton></div><p className="mt-1 text-[12px] text-paper-100/70">Optional. Skip anytime; support remains available.</p><div className="mt-4 grid grid-cols-5 gap-2">{[2,4,6,8,10].map(value => <button key={value} type="button" aria-pressed={selectedMood === value} onClick={() => setSelectedMood(value)} className="focus-ring min-h-11 rounded-lg border border-white/15 text-[14px] text-paper-100 aria-pressed:border-brand-orange">{value}</button>)}</div><div className="mt-4 flex flex-wrap gap-2"><BtnPrimary className="min-h-11" onClick={() => { setFixture('success'); closeLog() }}>Save mood</BtnPrimary><BtnGhost className="min-h-11" onClick={closeLog}>Skip for now</BtnGhost></div></E1Modal>
        )}

        {consentOpen && (
          <E1Modal label="Mood data controls" onClose={closeConsent}><div className="flex items-center justify-between"><h2 className="text-[18px] font-semibold text-paper-100">{deleteConfirm ? 'Delete local mood data?' : 'Mood data controls'}</h2><IconButton label="Close data controls" onClick={closeConsent}><X size={18} /></IconButton></div>{deleteConfirm ? <><p className="mt-2 text-[13px] leading-5 text-paper-100/75">Permanently delete all local mood check-ins, journal-day markers, and inferred patterns. There is no cloud backup in this prototype. Export first if needed.</p><div className="mt-4 grid grid-cols-2 gap-2"><BtnGhost autoFocus onClick={() => setDeleteConfirm(false)}>Cancel</BtnGhost><BtnPrimary onClick={() => { setFixture('empty'); setDataStatus('Local mood data permanently deleted. No account, cloud, or provider data changed.'); closeConsent() }}>Delete mood data</BtnPrimary></div></> : <><p className="mt-2 text-[13px] leading-5 text-paper-100/75">CIA may use mood scores and journal dates—not private entry text—to discuss non-causal patterns. Revoke stops future inference. Export or permanently delete the local demo record.</p><div className="mt-4 grid gap-2"><button type="button" onClick={() => setConsentEnabled(value => !value)} className="focus-ring min-h-11 rounded-lg border border-white/15 px-3 text-left text-[13px] text-paper-100">{consentEnabled ? 'Revoke CIA inference' : 'Opt in to CIA inference'}</button><button type="button" onClick={() => setDataStatus('Mood data export preview prepared locally. No file opened.')} className="focus-ring min-h-11 rounded-lg border border-white/15 px-3 text-left text-[13px] text-paper-100">Export mood data preview</button><button type="button" onClick={() => setDeleteConfirm(true)} className="focus-ring min-h-11 rounded-lg border border-white/15 px-3 text-left text-[13px] text-paper-100">Delete local mood data</button></div></>}</E1Modal>
        )}
        {dataStatus && <p role="status" className="rounded-lg border border-forest-green/30 bg-forest-green/10 p-3 text-[12px] text-paper-100">{dataStatus}</p>}
      </main>
    </HifiShell>
  )
}
