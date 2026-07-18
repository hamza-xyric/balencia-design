'use client'

import { useEffect, useRef, useState } from 'react'
import { Activity, ArrowRight, Check, Music, Plus, ShieldCheck, X } from 'lucide-react'
import { BtnPrimary, Chip, FULL_DATA_CONTROLS, GlassCard, HifiShell, Provenance, SectionTitle, SolidCard, TopBar, cx } from '@/components/hifi/kit'
import { E1Modal } from './E1Modal'

const STATES = ['default', 'sync-failure', 'reconnect', 'consent', 'empty', 'offline', 'revoke', 'delete'] as const
type SourceState = (typeof STATES)[number]
function isState(value: string | null): value is SourceState { return STATES.some(item => item === value) }

const CONTROL_IDS = ['category', 'source', 'scope', 'freshness', 'confidence', 'retention', 'export', 'revoke', 'delete'] as const
type ControlId = (typeof CONTROL_IDS)[number]
function isControl(value: string | null): value is ControlId { return CONTROL_IDS.some(item => item === value) }

const CONTROL_DETAILS: Record<Exclude<ControlId, 'export' | 'revoke' | 'delete'>, { title: string; detail: string }> = {
  category: { title: 'WHOOP category', detail: 'Category: health. This bundled preview labels WHOOP recovery and strain as health data.' },
  source: { title: 'WHOOP source', detail: 'Source: WHOOP. This is a bundled dependency fixture, not a connected WHOOP account or provider session.' },
  scope: { title: 'WHOOP scope', detail: 'Scope: recovery and strain only. This preview does not claim access to any other WHOOP data.' },
  freshness: { title: 'WHOOP freshness', detail: 'Freshness: 8 minutes in this fixed preview. The screen does not run a sync or freshness check.' },
  confidence: { title: 'WHOOP confidence', detail: 'Confidence: high for the shown WHOOP fixture. Co-variations remain directional, not causal.' },
  retention: { title: 'WHOOP retention', detail: 'Retention: a 90-day rolling window in this local preview. Nothing is stored or scheduled for deletion.' },
}

type Panel = 'closed' | 'consent' | ControlId

function panelStatus(panel: Exclude<Panel, 'closed'>) {
  if (panel === 'export') return 'WHOOP export preview is local only. No file has been created, downloaded, or shared.'
  if (panel === 'revoke') return 'WHOOP revoke confirmation is local only. No provider or account action has occurred.'
  if (panel === 'delete') return 'WHOOP delete confirmation is local only. No provider or account data has changed.'
  return `WHOOP ${panel === 'consent' ? 'data controls' : `${panel} details`} opened in this local preview. No provider data changed.`
}

function Dialog({ title, panel, onClose, children }: { title: string; panel: Exclude<Panel, 'closed'>; onClose: () => void; children: React.ReactNode }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeButtonRef.current?.focus()
  }, [panel])

  return <E1Modal label={title} onClose={onClose} className="!bg-ink-900 border border-white/20 shadow-2xl"><div data-control-panel={panel}><div className="flex min-h-11 items-center justify-between"><h2 className="text-[18px] font-semibold">{title}</h2><button ref={closeButtonRef} type="button" aria-label={`Close ${title}`} className="focus-ring flex h-11 w-11 items-center justify-center rounded-full" onClick={onClose}><X/></button></div>{children}</div></E1Modal>
}

export function S84DataSources() {
  const [state, setState] = useState<SourceState>('default')
  const [panel, setPanel] = useState<Panel>('closed')
  const [routeControl, setRouteControl] = useState<ControlId | null>(null)
  const [status, setStatus] = useState('Bundled dependency demo only. No provider, account, OAuth, or network capability is active.')
  const returnFocus = useRef<HTMLButtonElement | null>(null)
  useEffect(() => { const params = new URLSearchParams(window.location.search); queueMicrotask(() => {
    const requestedControl = params.get('control')
    if (isControl(requestedControl)) { setRouteControl(requestedControl); setStatus(panelStatus(requestedControl)); setPanel(requestedControl) }
    if (isState(params.get('state'))) { const next = params.get('state') as SourceState; setState(next); if (!isControl(requestedControl) && (next === 'consent' || next === 'revoke' || next === 'delete')) setPanel(next) }
  }) }, [])

  const closePanel = () => { setPanel('closed'); requestAnimationFrame(() => { if (returnFocus.current?.isConnected) returnFocus.current.focus() }) }
  const openPanel = (next: Exclude<Panel, 'closed'>, trigger: HTMLButtonElement) => { returnFocus.current = trigger; setStatus(panelStatus(next)); setPanel(next) }
  const empty = state === 'empty' || state === 'delete'
  const failed = state === 'sync-failure'
  const reconnected = state === 'reconnect'
  const revoked = state === 'revoke'
  const offline = state === 'offline'
  const spotifyHealthy = reconnected
  const connected = empty ? 0 : revoked ? 1 : 2
  const healthy = empty ? 0 : spotifyHealthy ? 2 : 1
  const live = offline ? 0 : healthy
  const failedCount = empty || revoked || spotifyHealthy ? 0 : 1

  const overlay = panel === 'consent' ? <Dialog title="WHOOP data controls" panel="consent" onClose={closePanel}><p className="mt-2 text-[12px] leading-5 text-paper-100/75">Category: health · Source: WHOOP · Scope: recovery and strain · Freshness: 8 minutes · Confidence: high · Retention: 90-day rolling window.</p><div className="mt-4 grid grid-cols-2 gap-2">{FULL_DATA_CONTROLS.map(control => <button key={control} type="button" className="focus-ring min-h-11 rounded-xl border border-white/15 px-2 text-[12px]" onClick={event => { const next = control.toLowerCase(); if (isControl(next)) openPanel(next, event.currentTarget) }}>{control}</button>)}</div><p className="mt-3 text-[12px] text-paper-100/70" role="status">{status}</p></Dialog>
  : panel === 'revoke' ? <Dialog title="Revoke WHOOP access" panel="revoke" onClose={closePanel}><p className="mt-2 text-[13px] leading-5 text-paper-100/75">Revoking WHOOP stops future demo sync and removes its fixture from correlation inputs. This local preview cannot contact WHOOP or change an account.</p><button type="button" className="focus-ring mt-4 min-h-11 w-full rounded-pill bg-brand-orange px-4 font-semibold text-ink-900" onClick={() => { setState('revoke'); setStatus('WHOOP access revoked in this local preview. No external action fired.'); closePanel() }}>Confirm local WHOOP revoke</button><p className="mt-3 text-[12px] text-paper-100/70" role="status">{status}</p></Dialog>
  : panel === 'delete' ? <Dialog title="Delete WHOOP source data" panel="delete" onClose={closePanel}><p className="mt-2 text-[13px] leading-5 text-paper-100/75">Delete the bundled WHOOP source rows and derived preview patterns. This does not delete a WHOOP account or provider data; export remains a no-file preview.</p><button type="button" className="focus-ring mt-4 min-h-11 w-full rounded-pill border border-brand-orange/40 px-4 font-semibold text-brand-orange" onClick={() => { setState('delete'); setStatus('WHOOP source rows deleted from this local preview. No account or provider data changed.'); closePanel() }}>Confirm local WHOOP delete</button><p className="mt-3 text-[12px] text-paper-100/70" role="status">{status}</p></Dialog>
  : panel === 'export' ? <Dialog title="Export WHOOP preview" panel="export" onClose={closePanel}><p className="mt-2 text-[13px] leading-5 text-paper-100/75">Export would include only the bundled WHOOP recovery and strain fixture plus its stated freshness, confidence, and retention labels.</p><button type="button" className="focus-ring mt-4 min-h-11 w-full rounded-pill border border-white/15 px-4 font-semibold" onClick={() => setStatus('WHOOP export preview shown locally. No file was created, downloaded, or shared.')}>Preview local export</button><p className="mt-3 text-[12px] text-paper-100/70" role="status">{status}</p></Dialog>
  : panel !== 'closed' ? <Dialog title={CONTROL_DETAILS[panel].title} panel={panel} onClose={closePanel}><p className="mt-2 text-[13px] leading-5 text-paper-100/75">{CONTROL_DETAILS[panel].detail}</p><p className="mt-3 text-[12px] text-paper-100/70" role="status">{status}</p></Dialog> : undefined

  return <HifiShell header={<TopBar title="Data sources" backHref="/screens/22"/>} atmosphere="you" showTabBar={false} overlay={overlay}><main className="space-y-5 px-4 pb-6 pt-2" data-state-surface={state} data-source-state={state} data-route-control={routeControl ?? undefined} data-connected-count={connected} data-live-count={live} data-healthy-count={healthy} data-failed-count={failedCount} data-check-cadence="daily">
    {offline && <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-[12px] text-paper-100/75">Offline · source status cached 2 hours ago. No sync or reconnect is attempted.</div>}
    {failed && <div className="rounded-xl border border-brand-orange/30 bg-brand-orange/10 p-4"><h2 className="text-[15px] font-semibold">Spotify health check failed</h2><p className="mt-1 text-[12px] text-paper-100/70">Last successful status 2 days ago. Pull-to-refresh is represented by the local retry below.</p><button type="button" className="focus-ring mt-3 min-h-11 rounded-pill border border-brand-orange/40 px-4 text-[13px]" onClick={() => { setState('reconnect'); setStatus('Spotify reconnect succeeded in this local dependency preview.') }}>Retry locally</button></div>}
    {reconnected && <div className="rounded-xl border border-forest-green/30 bg-forest-green/10 p-3 text-[12px] text-paper-100/80" role="status"><Check className="mr-2 inline h-4 w-4 text-forest-green"/>Spotify reconnected locally. No OAuth or provider request fired.</div>}
    {revoked && <div className="rounded-xl border border-brand-orange/30 bg-brand-orange/10 p-3 text-[12px] text-paper-100/80" role="status">WHOOP access revoked locally; Spotify remains connected but unhealthy.</div>}
    {empty && <div className="rounded-[28px] border border-dashed border-white/15 p-6 text-center"><h2 className="text-[18px] font-semibold">{state === 'delete' ? 'Source data deleted' : 'Connect your first source'}</h2><p className="mt-2 text-[13px] leading-5 text-paper-100/65">No sources or patterns are shown, and no low-confidence values are fabricated.</p></div>}
    {!empty && <>
      <GlassCard tone="cia"><p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-royal-purple">Correlation engine · demo</p><h2 className="mt-2 text-[19px] leading-6">Every <span className="text-emphasis">source</span> becomes a signal, not clutter.</h2><div className="mt-4 grid grid-cols-2 gap-2">{[['Connected', connected], ['Live', live], ['Healthy', healthy], ['Failed', failedCount]].map(([label, value]) => <div key={label} className="rounded-xl border border-white/10 bg-white/[0.04] p-3"><p className="text-[22px] font-semibold tabular-nums">{value}</p><p className="mt-1 text-[11px] uppercase text-paper-100/65">{label}</p></div>)}</div><div className="mt-3"><Provenance items={['Bundled integrations demo', 'Daily health check']} /></div></GlassCard>
      <section className="space-y-2.5"><SectionTitle title="Connected sources" meta={`${connected} connected`} />
        {!revoked && <SolidCard className="p-0"><button type="button" className="focus-ring flex min-h-[68px] w-full items-center gap-3 p-4 text-left" onClick={event => openPanel('consent', event.currentTarget)}><span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10"><Activity/></span><span className="min-w-0 flex-1"><span className="flex flex-wrap items-center justify-between gap-2"><strong>WHOOP</strong><span className="text-[11px] font-semibold uppercase text-forest-green">Healthy</span></span><span className="mt-1 block text-[12px] text-paper-100/65">Recovery, strain · fresh 8m · high confidence</span></span></button><div className="flex flex-wrap gap-2 border-t border-white/[0.06] px-4 py-3"><Chip>Wearable</Chip><Chip>90d rolling</Chip><Chip>Daily check</Chip></div><div className="grid grid-cols-2 gap-2 border-t border-white/[0.06] p-3"><button type="button" className="focus-ring min-h-11 rounded-pill border border-white/15 text-[12px]" onClick={event => openPanel('revoke', event.currentTarget)}>Revoke access</button><button type="button" className="focus-ring min-h-11 rounded-pill border border-white/15 text-[12px]" onClick={event => openPanel('delete', event.currentTarget)}>Delete source</button></div></SolidCard>}
        <SolidCard className="p-0"><button type="button" aria-label={`${spotifyHealthy ? 'Review' : 'Reconnect'} Spotify. ${spotifyHealthy ? 'Connection healthy.' : 'Connection needs attention.'}`} className="focus-ring flex min-h-[68px] w-full items-center gap-3 p-4 text-left" onClick={() => { setState('reconnect'); setStatus('Spotify reconnect succeeded in this local dependency preview.') }}><span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10"><Music/></span><span className="min-w-0 flex-1"><span className="flex flex-wrap items-center justify-between gap-2"><strong>Spotify</strong><span className={cx('text-[11px] font-semibold uppercase', spotifyHealthy ? 'text-forest-green' : 'text-paper-100/65')}>{spotifyHealthy ? 'Healthy' : 'Needs attention'}</span></span><span className="mt-1 block text-[12px] text-paper-100/65">Music context · {spotifyHealthy ? 'fresh now' : 'sync failed · last success 2d ago'} · <span className="font-semibold text-brand-orange">{spotifyHealthy ? 'Review' : 'Reconnect'}</span></span></span></button><div className="flex flex-wrap gap-2 border-t border-white/[0.06] px-4 py-3"><Chip>Streaming</Chip><Chip>Daily check</Chip></div></SolidCard>
      </section>
      <section className="space-y-2.5"><SectionTitle title="Detected co-variations" meta="CIA synthesis"/><SolidCard><div className="flex flex-wrap items-center gap-2"><Chip>Sleep</Chip><ArrowRight aria-hidden="true" size={14}/><Chip>Music</Chip></div><p className="mt-3 text-[14px] font-medium">Sleep and music tempo moved together</p><StrengthMeter filled={4}/><p className="mt-2 text-[11px] leading-4 text-paper-100/65">WHOOP + Spotify · 14 paired days · 30-day window · WHOOP fresh 8m / Spotify stale 2d · medium confidence · co-variation, not causation.</p></SolidCard><SolidCard><div className="flex flex-wrap items-center gap-2"><Chip>Work</Chip><ArrowRight aria-hidden="true" size={14}/><Chip>Wellbeing</Chip></div><p className="mt-3 text-[14px] font-medium">Calendar density and stress moved together</p><StrengthMeter filled={2}/><p className="mt-2 text-[11px] leading-4 text-paper-100/65">Calendar + check-ins · 5 paired days · 14-day window · fresh 1d · low confidence · early co-variation, not causation.</p></SolidCard></section>
      <GlassCard tone="muted"><div className="flex items-start gap-3"><ShieldCheck className="mt-1 shrink-0 text-forest-green"/><div><p className="text-[13px] font-semibold">Source health is checked daily</p><p className="mt-1 text-[12px] leading-4 text-paper-100/65">This is a bundled dependency demo. Nothing syncs without consent; no continuous-monitoring claim is made.</p></div></div></GlassCard>
    </>}
    <BtnPrimary className="w-full" disabled={offline} onClick={() => setStatus('Connect-source chooser previewed locally. No OAuth flow opened.')}><Plus size={17}/>Connect source</BtnPrimary>
    <p className="text-[12px] leading-5 text-paper-100/65" role="status">{status}</p>
  </main></HifiShell>
}

function StrengthMeter({ filled }: { filled: number }) { return <div className="mt-2 flex h-2 gap-1" role="img" aria-label={`${filled} of 8 strength bars filled`}>{Array.from({ length: 8 }).map((_, index) => <span key={index} className={cx('h-full flex-1 rounded-pill', index < filled ? 'bg-royal-purple' : 'bg-white/10')}/>)}</div> }
