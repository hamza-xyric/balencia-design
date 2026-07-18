'use client'

import { useEffect, useRef, useState } from 'react'
import { AlertTriangle, Check, ChevronRight, CircleDot, Cloud, Download, RefreshCw, ShieldCheck, Smartphone, Trash2, Watch, X } from 'lucide-react'
import {
  BtnCoach,
  BtnGhost,
  BtnPrimary,
  Chip,
  CIAInsightCard,
  cx,
  GlassCard,
  HifiShell,
  IconButton,
  PaywallLock,
  ProgressRing,
  Provenance,
  SectionTitle,
  SolidCard,
  TopBar,
  TrendChart,
} from '@/components/hifi/kit'
import { E1Modal } from './E1Modal'

type HealthFixture = 'default' | 'formula-detail' | 'metric-detail' | 'cia-consent' | 'empty' | 'partial' | 'stale-offline' | 'sync-error' | 'bridge' | 'primary-conflict' | 'revoke-confirm' | 'delete-confirm' | 'premium-lock' | 'disabled' | 'skeleton'
type DialogKind = 'formula' | 'metric' | 'consent' | 'bridge' | 'primary' | 'revoke' | 'delete' | null

function resolveFixture(candidate: string | null): HealthFixture {
  const fixtures: HealthFixture[] = ['default', 'formula-detail', 'metric-detail', 'cia-consent', 'empty', 'partial', 'stale-offline', 'sync-error', 'bridge', 'primary-conflict', 'revoke-confirm', 'delete-confirm', 'premium-lock', 'disabled', 'skeleton']
  return fixtures.includes(candidate as HealthFixture) ? candidate as HealthFixture : 'default'
}

function initialDialog(fixture: HealthFixture): DialogKind {
  if (fixture === 'formula-detail') return 'formula'
  if (fixture === 'metric-detail') return 'metric'
  if (fixture === 'cia-consent') return 'consent'
  if (fixture === 'bridge') return 'bridge'
  if (fixture === 'primary-conflict') return 'primary'
  if (fixture === 'revoke-confirm') return 'revoke'
  if (fixture === 'delete-confirm') return 'delete'
  return null
}

const completeVitals = [
  { label: 'HRV', value: '42', unit: 'ms', source: 'Demo wearable', time: 'Jul 7 · 8:15 AM', confidence: 'High', input: '86' },
  { label: 'Strain', value: '14.2', unit: 'score', source: 'Demo wearable', time: 'Jul 7 · 8:12 AM', confidence: 'High', input: '84' },
  { label: 'RHR', value: '52', unit: 'bpm', source: 'Demo phone health', time: 'Jul 7 · 8:10 AM', confidence: 'Medium', input: '—' },
  { label: 'Sleep', value: '7h 12m', unit: 'duration', source: 'Demo wearable', time: 'Jul 7 · 7:58 AM', confidence: 'High', input: '82' },
] as const

const readinessTabs = ['Readiness', 'Sleep', 'Strain'] as const

function ProviderIcons() {
  const icons = [
    { label: 'Wearable device', Icon: Watch },
    { label: 'Smart ring', Icon: CircleDot },
    { label: 'Phone health bridge', Icon: Smartphone },
    { label: 'Cloud data source', Icon: Cloud },
  ] as const
  return <div aria-label="Provider-neutral health source types" className="grid grid-cols-4 gap-2">{icons.map(({ label, Icon }) => <div key={label} className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] px-1 text-paper-100/75"><Icon aria-hidden="true" size={18} strokeWidth={1.8} /><span className="text-center text-[10px] leading-3">{label}</span></div>)}</div>
}

export function S96HealthDataView() {
  const [fixture, setFixture] = useState<HealthFixture>('default')
  const [dialog, setDialog] = useState<DialogKind>(null)
  const [status, setStatus] = useState<string | null>(null)
  const [providerConnected, setProviderConnected] = useState(true)
  const [healthConsent, setHealthConsent] = useState(false)
  const [primary, setPrimary] = useState('Demo wearable')
  const [selectedTab, setSelectedTab] = useState<(typeof readinessTabs)[number]>('Readiness')
  const [selectedVital, setSelectedVital] = useState<(typeof completeVitals)[number]>(completeVitals[0])
  const returnFocus = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const state = resolveFixture(new URLSearchParams(window.location.search).get('state'))
    queueMicrotask(() => {
      setFixture(state)
      setDialog(initialDialog(state))
      setProviderConnected(state !== 'empty')
    })
  }, [])

  const empty = fixture === 'empty' || !providerConnected
  const partial = fixture === 'partial'
  const stale = fixture === 'stale-offline'
  const syncError = fixture === 'sync-error'
  const disabled = fixture === 'disabled'
  const skeleton = fixture === 'skeleton'
  const premium = fixture === 'premium-lock'
  const vitals = partial ? completeVitals.map((item, index) => index === 1 || index === 3 ? { ...item, value: 'Not available', unit: '', confidence: 'No current reading', input: '—' } : item) : completeVitals

  const openDialog = (kind: Exclude<DialogKind, null>, trigger?: HTMLButtonElement | null) => {
    returnFocus.current = trigger ?? null
    setDialog(kind)
  }
  const closeDialog = () => {
    setDialog(null)
    requestAnimationFrame(() => { if (returnFocus.current?.isConnected) returnFocus.current.focus() })
  }

  return (
    <HifiShell
      header={<TopBar title="Health connections" right={<IconButton label="Manual demo sync" disabled={disabled || empty} onClick={() => setStatus('Demo sync checked — no provider or external request fired. Updated Jul 7, 8:20 AM.')}><RefreshCw size={18} strokeWidth={1.9} /></IconButton>} />}
      atmosphere="you"
      activeTab="me"
    >
      <main className="space-y-4 px-4 pb-4 pt-3" data-fixture={fixture}>
        <div className="rounded-xl border border-white/15 bg-white/[0.02] px-3 py-2 text-[11px] leading-4 text-paper-100/75">
          Illustrative demo data only. Provider sync is not live and depends on OAuth token exchange plus the queued health-sync implementation.
        </div>

        {(stale || syncError || status) && <div role="status" className={cx('rounded-xl border px-3 py-2 text-[12px] leading-5', syncError ? 'border-brand-orange/40 bg-brand-orange/10 text-paper-100' : 'border-white/15 bg-white/[0.03] text-paper-100/80')}>{status ?? (stale ? 'Offline — showing cached demo values last synced Jul 7, 6:20 AM.' : 'Demo wearable sync failed: expired demo token. Cached values are shown; no external retry occurred.')}</div>}
        {disabled && <div role="status" className="rounded-xl border border-white/15 bg-white/[0.03] px-3 py-2 text-[12px] leading-5 text-paper-100/80">Health controls are disabled because demo-provider consent is paused. Sync, trends, CIA sharing, primary-source changes, revoke, and delete remain unavailable until consent is restored.</div>}

        {skeleton ? (
          <div aria-label="Loading health summary; no values available" className="space-y-3">
            <div className="skeleton h-44 rounded-2xl" />
            <div className="grid grid-cols-2 gap-3"><div className="skeleton h-28 rounded-xl" /><div className="skeleton h-28 rounded-xl" /><div className="skeleton h-28 rounded-xl" /><div className="skeleton h-28 rounded-xl" /></div>
          </div>
        ) : empty ? (
          <SolidCard>
            <p className="text-[18px] font-semibold text-paper-100">Connect your first demo source</p>
            <p className="mt-2 text-[13px] leading-5 text-paper-100/70">No readiness, metric, trend, or CIA health claim is available. Previewing connection makes no device or provider call.</p>
            <BtnPrimary className="mt-4 min-h-11" onClick={() => setStatus('Connection preview: scopes are HRV, sleep, strain and RHR; demo refresh hourly; local prototype storage; retain until deletion; primary-source conflicts require a choice; revoke, delete and export remain available.')}>Preview connection terms</BtnPrimary>
          </SolidCard>
        ) : (
          <GlassCard tone="you">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-[180px] flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-orange">Balencia readiness</p>
                <p className="mt-2 text-[15px] leading-5 text-white">A provider-neutral <span className="text-emphasis">readiness</span> demo composite.</p>
                <p className="mt-1 text-[12px] leading-5 text-paper-100/70">{stale || syncError ? '3 cached inputs · last sync Jul 7, 6:20 AM · freshness expired' : '3 current inputs · updated Jul 7, 8:20 AM · high confidence'}</p>
                <button type="button" onClick={event => openDialog('formula', event.currentTarget)} className="focus-ring mt-2 min-h-11 rounded-lg border border-white/15 px-3 text-left text-[12px] font-medium text-paper-100">View formula & sources</button>
              </div>
              <ProgressRing percent={84} value="84" label="Balencia" size={92} tone="you" />
            </div>
            <BtnCoach className="mt-4 min-h-11 text-[14px]" disabled={disabled} onClick={event => openDialog('consent', event.currentTarget)}>Talk to CIA</BtnCoach>
          </GlassCard>
        )}

        {!empty && !skeleton && (
          <div>
            <SectionTitle title="Vitals" meta={partial ? '2 of 4 current' : stale || syncError ? 'Cached demo' : '4 readings'} />
            <div className="mt-2 grid grid-cols-1 gap-3 min-[350px]:grid-cols-2">
              {vitals.map(vital => (
                <button key={vital.label} type="button" disabled={disabled || vital.value === 'Not available'} onClick={event => { setSelectedVital(vital as (typeof completeVitals)[number]); openDialog('metric', event.currentTarget) }} className="focus-ring min-h-[132px] rounded-xl text-left disabled:opacity-50">
                  <SolidCard className="h-full">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-paper-100/70">{vital.label}</p>
                    <p className="mt-1 flex flex-wrap items-baseline gap-1 text-[20px] font-semibold leading-6 text-white tabular-nums">{vital.value}{vital.unit && <span className="text-[12px] font-normal text-paper-100/70">{vital.unit}</span>}</p>
                    <p className="mt-2 text-[11px] leading-4 text-paper-100/70">{vital.source} · {vital.time}</p>
                    <Chip>{vital.confidence} confidence</Chip>
                  </SolidCard>
                </button>
              ))}
            </div>
            <div className="mt-2 flex min-h-11 flex-wrap items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2"><span className="text-[12px] text-paper-100/75">Device-native demo: WHOOP recovery <span className="font-semibold text-white tabular-nums">78</span></span><Chip>Separate score</Chip></div>
          </div>
        )}

        {!empty && !skeleton && !partial && !stale && !syncError && (
          <CIAInsightCard provenance={['HRV + sleep + strain', '3 current signals', 'Updated 8:20 AM', 'High confidence']}>
            <p>Current demo signals support a higher-capacity day. Consider a focus block if it still feels right. Informational, not diagnostic.</p>
          </CIAInsightCard>
        )}

        {!empty && !skeleton && !premium && (
          <div>
            <div role="tablist" aria-label="Trend metric" className="grid grid-cols-3 gap-1 rounded-pill border border-white/10 bg-white/[0.03] p-1">{readinessTabs.map(tab => <button key={tab} type="button" role="tab" aria-selected={selectedTab === tab} disabled={disabled} onClick={() => setSelectedTab(tab)} className={cx('focus-ring flex min-h-11 items-center justify-center rounded-pill px-2 text-[12px] font-medium', selectedTab === tab ? 'bg-white/10 text-white' : 'text-paper-100/70')}>{tab}</button>)}</div>
            <SolidCard className="mt-2"><TrendChart past={[62,58,66,70,74,79,84]} height={90} label={`${selectedTab} demo trend for seven days, values rising from 62 to 84; updated Jul 7, 8:20 AM; high confidence`} /><div className="mt-2"><Provenance items={['3 demo inputs', 'Jul 1–7', 'High confidence']} /></div></SolidCard>
          </div>
        )}

        {premium && (
          <PaywallLock title="Multi-source health patterns" description="Premium resolves multiple demo sources. This generic preview contains no health values and requires both consent and entitlement." action={<BtnPrimary className="min-h-11" onClick={() => setFixture('default')}>Preview Premium</BtnPrimary>}><div className="grid grid-cols-2 gap-3"><div className="h-24 rounded-xl bg-white/[0.05]" /><div className="h-24 rounded-xl bg-white/[0.05]" /></div></PaywallLock>
        )}

        <div>
          <SectionTitle title="Provider-neutral sources" meta="Code-native HIFI-96-01" />
          <div className="mt-2"><ProviderIcons /></div>
        </div>

        <div>
          <SectionTitle title="Health data sources" meta="Demo controls" />
          <SolidCard className="mt-2 divide-y divide-white/[0.08] p-0">
            <div className="flex flex-wrap items-center justify-between gap-3 p-4">
              <div><div className="flex items-center gap-2"><span className="text-[14px] font-medium text-white">Demo wearable</span><Chip tone="you">{primary === 'Demo wearable' ? 'Primary' : 'Secondary'}</Chip></div><span className="mt-1 flex items-center gap-1 text-[12px] text-paper-100/70"><Check size={12} className="text-forest-green" /> {providerConnected ? (stale || syncError ? 'Cached · Jul 7, 6:20 AM' : 'Demo · Jul 7, 8:20 AM') : 'Revoked'}</span></div>
              <div className="flex flex-wrap items-center gap-2"><button type="button" disabled={disabled || !providerConnected} onClick={event => openDialog('primary', event.currentTarget)} className="focus-ring min-h-11 rounded-lg border border-white/15 px-3 text-[12px] text-paper-100 disabled:opacity-50">Primary</button><button type="button" disabled={disabled || !providerConnected} onClick={event => openDialog('revoke', event.currentTarget)} className="focus-ring min-h-11 rounded-lg border border-white/15 px-3 text-[12px] text-paper-100 disabled:opacity-50">Revoke</button><IconButton label="Delete synced demo records" disabled={disabled || !providerConnected} onClick={event => openDialog('delete', event.currentTarget)}><Trash2 size={16} /></IconButton></div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 p-4"><div><p className="text-[14px] font-medium text-white/85">Phone health bridge</p><p className="mt-1 text-[12px] text-paper-100/70">Requires native app bridge · unavailable on web</p></div><button type="button" onClick={event => openDialog('bridge', event.currentTarget)} className="focus-ring min-h-11 rounded-lg border border-white/15 px-3 text-[12px] text-paper-100">Setup info <ChevronRight className="inline" size={13} /></button></div>
            <button type="button" onClick={() => setStatus('Export preview prepared locally. No file picker or external service opened.')} className="focus-ring flex min-h-14 w-full items-center justify-between p-4 text-left"><span className="flex items-center gap-2 text-[13px] text-paper-100/80"><Download size={16} /> Export demo data</span><ChevronRight size={16} /></button>
            <button type="button" onClick={() => setStatus('Demo records are retained locally until revoke or delete. No provider backup exists in this visual prototype.')} className="focus-ring flex min-h-14 w-full items-center justify-between p-4 text-left"><span className="flex items-center gap-2 text-[13px] text-paper-100/80"><ShieldCheck size={16} /> Retention info</span><ChevronRight size={16} /></button>
          </SolidCard>
        </div>

        <div className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-3"><AlertTriangle size={15} className="mt-0.5 shrink-0 text-paper-100/70" /><p className="text-[11px] leading-4 text-paper-100/70">Informational, not diagnostic. This local visual prototype cannot assess urgent symptoms; seek appropriate local care.</p></div>

        {dialog && (
          <E1Modal label={dialog === 'formula' ? 'Balencia readiness formula' : dialog === 'metric' ? `${selectedVital.label} evidence` : dialog === 'consent' ? 'Share health context with CIA?' : dialog === 'bridge' ? 'Native bridge limitation' : dialog === 'primary' ? 'Choose primary demo source' : dialog === 'revoke' ? 'Revoke demo source?' : 'Delete demo records?'} onClose={closeDialog}>
              <div className="flex items-start justify-between gap-3"><h2 className="text-[18px] font-semibold text-paper-100">{dialog === 'formula' ? 'Balencia readiness formula' : dialog === 'metric' ? `${selectedVital.label} evidence` : dialog === 'consent' ? 'Share health context with CIA?' : dialog === 'bridge' ? 'Native bridge limitation' : dialog === 'primary' ? 'Choose primary demo source' : dialog === 'revoke' ? 'Revoke demo source?' : 'Delete demo records?'}</h2><IconButton label="Close dialog" onClick={closeDialog}><X size={18} /></IconButton></div>

              {dialog === 'formula' && <div className="mt-3 space-y-2 text-[13px] leading-5 text-paper-100/75"><p><strong className="text-paper-100">84.1 rounds to 84</strong></p><p>HRV readiness: 86 × 40% = 34.4</p><p>Sleep readiness: 82 × 35% = 28.7</p><p>Strain readiness: 84 × 25% = 21.0</p><p>3 current demo inputs · Jul 7, 8:20 AM · high confidence. WHOOP recovery 78 is device-native and is not an input.</p></div>}
              {dialog === 'metric' && <div className="mt-3 space-y-2 text-[13px] leading-5 text-paper-100/75"><p><strong className="text-paper-100">{selectedVital.label} {selectedVital.value} {selectedVital.unit}</strong></p><p>{selectedVital.source} · captured {selectedVital.time} · synced 8:20 AM · {selectedVital.confidence.toLowerCase()} confidence.</p><p>{selectedVital.input === '—' ? `${selectedVital.label} is not a Balencia readiness input.` : `${selectedVital.label} readiness input ${selectedVital.input}.`} Informational, not diagnostic.</p></div>}
              {dialog === 'consent' && <div className="mt-3 text-[13px] leading-5 text-paper-100/75"><p>Share HRV, sleep, and strain demo values with CIA for this conversation. Purpose: a non-diagnostic reflection. Stored locally until deletion; export and revoke remain available. Decline sends nothing.</p><div className="mt-4 grid grid-cols-2 gap-2"><BtnGhost className="min-h-11" onClick={() => { setHealthConsent(false); setStatus('Declined — no health context was sent.'); closeDialog() }}>Decline</BtnGhost><BtnPrimary className="min-h-11" onClick={() => { setHealthConsent(true); setStatus('Consent recorded locally. CIA preview opened with 3 demo signals; no external request fired.'); closeDialog() }}>Accept</BtnPrimary></div>{healthConsent && <button type="button" onClick={() => setHealthConsent(false)} className="focus-ring mt-3 min-h-11 w-full rounded-lg border border-white/15 text-[13px] text-paper-100">Revoke CIA health consent</button>}</div>}
              {dialog === 'bridge' && <div className="mt-3 text-[13px] leading-5 text-paper-100/75"><p>Phone health data cannot sync from this web prototype. A native app bridge and completed OAuth/provider work are required. This setup preview opens no app, device capability, or external route.</p><BtnGhost className="mt-4 min-h-11" onClick={() => { setStatus('Native bridge setup preview acknowledged; no external action fired.'); closeDialog() }}>Acknowledge</BtnGhost></div>}
              {dialog === 'primary' && <div className="mt-3 text-[13px] leading-5 text-paper-100/75"><p>Only one demo source can be primary. Changing it affects future composite inputs; source-native history remains separate.</p><div className="mt-3 grid gap-2">{['Demo wearable','Demo ring'].map(source => <button key={source} type="button" aria-pressed={primary === source} onClick={() => setPrimary(source)} className="focus-ring min-h-11 rounded-lg border border-white/15 px-3 text-left text-paper-100 aria-pressed:border-brand-orange">{source}</button>)}</div><BtnPrimary className="mt-4 min-h-11" onClick={() => { setStatus(`${primary} is now the local demo primary. No provider call fired.`); closeDialog() }}>Confirm primary</BtnPrimary></div>}
              {dialog === 'revoke' && <div className="mt-3 text-[13px] leading-5 text-paper-100/75"><p>Revoking stops future demo sync and removes this source from future readiness calculations. Existing local demo records remain until deletion.</p><div className="mt-4 flex gap-2"><BtnGhost className="min-h-11" onClick={closeDialog}>Cancel</BtnGhost><BtnPrimary className="min-h-11" onClick={() => { setProviderConnected(false); setFixture('empty'); setStatus('Demo wearable revoked Jul 7, 8:22 AM. No external request fired.'); closeDialog() }}>Confirm revoke</BtnPrimary></div></div>}
              {dialog === 'delete' && <div className="mt-3 text-[13px] leading-5 text-paper-100/75"><p>Permanently delete local HRV, sleep, strain, RHR and readiness demo history. This prototype has no provider or cloud backup. Export first if needed.</p><div className="mt-4 flex gap-2"><BtnGhost className="min-h-11" onClick={closeDialog}>Cancel</BtnGhost><BtnPrimary className="min-h-11" onClick={() => { setProviderConnected(false); setFixture('empty'); setStatus('Local demo health records deleted Jul 7, 8:23 AM.'); closeDialog() }}>Delete records</BtnPrimary></div></div>}
          </E1Modal>
        )}
      </main>
    </HifiShell>
  )
}
