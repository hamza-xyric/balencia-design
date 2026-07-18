'use client'

import { useEffect, useState } from 'react'
import { Download, Image as ImageIcon, ShieldCheck, Trash2, X } from 'lucide-react'
import { Chip, CIAInsightCard, ConsentRail, FULL_DATA_CONTROLS, GlassCard, HifiShell, MetricPill, Provenance, SectionTitle, SolidCard, TopBar, TrendChart, cx } from '@/components/hifi/kit'
import { E1Modal } from '../intelligence/E1Modal'

const STATES = ['default-demo', 'personal-consented', 'empty-unconsented', 'low-confidence', 'privacy-revoked', 'delete-confirm', 'error-upload', 'offline', 'privacy-controls'] as const
type PhotoState = (typeof STATES)[number]
function isState(value: string | null): value is PhotoState { return STATES.some(state => state === value) }

function Dialog({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return <E1Modal label={title} onClose={onClose}><div className="flex min-h-11 items-center justify-between"><h2 className="text-[18px] font-semibold">{title}</h2><button type="button" aria-label={`Close ${title}`} className="focus-ring flex h-11 w-11 items-center justify-center rounded-full" onClick={onClose}><X /></button></div>{children}</E1Modal>
}

const photos = [
  { date: 'Oct 12', state: 'ready', note: 'Analysis ready · high confidence' },
  { date: 'Sep 15', state: 'low', note: 'Estimated · low confidence' },
  { date: 'Aug 18', state: 'hidden', note: 'Hidden by you · encrypted original kept' },
] as const

export function S49ProgressPhotos() {
  const [state, setState] = useState<PhotoState>('default-demo')
  const [range, setRange] = useState('3M')
  const [status, setStatus] = useState('Demo fixture only. No personal photo, file picker, account, provider, or network capability is active.')
  const [panel, setPanel] = useState<'closed' | 'privacy-controls' | 'delete-confirm' | 'compare'>('closed')
  useEffect(() => { const value = new URLSearchParams(window.location.search).get('state'); queueMicrotask(() => { if (isState(value)) { setState(value); if (value === 'privacy-controls' || value === 'delete-confirm') setPanel(value) } }) }, [])

  const personal = state === 'personal-consented' || state === 'low-confidence'
  const empty = state === 'empty-unconsented' || state === 'privacy-revoked'
  const low = state === 'low-confidence'
  const close = () => setPanel('closed')
  const overlay = panel === 'privacy-controls' ? <Dialog title="Photo privacy controls" onClose={close}><p className="mt-2 text-[13px] leading-5 text-paper-100/75">Health photos · local visual preview · analysis separate from encrypted storage · no bitmap or identifiable person.</p><ConsentRail controls={FULL_DATA_CONTROLS} /><p className="mt-3 text-[12px] leading-5 text-paper-100/70">Retention: encrypted originals remain until deletion. Revoke removes analysis labels immediately. Export and deletion are available on every tier.</p></Dialog>
    : panel === 'delete-confirm' ? <Dialog title="Delete progress photo set?" onClose={close}><p className="mt-2 text-[13px] leading-5 text-paper-100/75">This removes 3 encrypted photo checkpoints and 2 analysis records from this local preview. This cannot be undone.</p><div className="mt-4 grid grid-cols-2 gap-2"><button type="button" className="focus-ring min-h-11 rounded-pill bg-red-500/90 px-3 font-semibold text-white" onClick={() => { setState('empty-unconsented'); setPanel('closed'); setStatus('3 demo photos and 2 demo analysis records deleted locally.') }}>Delete 3 photos</button><button type="button" className="focus-ring min-h-11 rounded-pill border border-white/15" onClick={close}>Keep photos</button></div></Dialog>
    : panel === 'compare' ? <Dialog title="Private comparison" onClose={close}><div className="mt-3 grid grid-cols-2 gap-3">{['Sep 15', 'Oct 12'].map(label => <div key={label} role="img" aria-label={`${label} neutral code-native encrypted checkpoint`} className="flex aspect-square items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]"><ImageIcon className="text-paper-100/45" /><span className="sr-only">No body image</span></div>)}</div><p className="mt-3 text-[12px] leading-5 text-paper-100/70">Code-native neutral checkpoints; no face, body, home, file, or diagnostic image.</p></Dialog> : undefined

  return <HifiShell header={<TopBar title="Progress photos" right={<Chip tone="you">Lv 12</Chip>} />} atmosphere="you" showTabBar={false} overlay={overlay}>
    <main className="space-y-4 px-4 pb-6 pt-3" data-progress-photo-state={state} data-analysis-consent={personal ? 'accepted' : state === 'privacy-revoked' ? 'revoked' : 'not-accepted'} data-asset-disposition="HIFI-49-01-code-native-no-identifiable-person">
      <GlassCard tone="muted"><div className="flex items-start gap-3"><ShieldCheck className="mt-1 shrink-0 text-forest-green" /><div><p className="text-[15px] font-semibold">{personal ? 'Personal preview · analysis opted in' : state === 'default-demo' ? 'Demo data · not your photos' : 'Photos stay private'}</p><p className="mt-1 text-[12px] leading-5 text-paper-100/70">Encrypted storage and AI analysis are separate choices. This prototype uses neutral code-native checkpoints only.</p></div></div><button type="button" className="focus-ring mt-2 min-h-11 rounded-pill px-2 text-[13px] font-semibold text-brand-orange" onClick={() => setPanel('privacy-controls')}>Manage privacy</button></GlassCard>
      {(state === 'offline' || state === 'error-upload') && <SolidCard><p role="status" className="text-[13px] font-semibold">{state === 'offline' ? 'Offline · cached demo values only' : 'Upload failed · encrypted local checkpoint kept'}</p><p className="mt-1 text-[12px] text-paper-100/70">{state === 'offline' ? 'Analysis and provider refresh are unavailable.' : 'Retry is a local visual action; no file is accessed.'}</p></SolidCard>}
      {state === 'privacy-revoked' && <SolidCard><p className="text-[14px] font-semibold">Analysis revoked</p><p className="mt-1 text-[12px] leading-5 text-paper-100/70">AI labels were removed immediately. Encrypted originals remain until you export or delete them.</p></SolidCard>}
      {!empty ? <>
        <CIAInsightCard provenance={personal ? ['Consented photo timeline', low ? 'Low confidence' : 'High confidence', 'Fresh Oct 12'] : ['Demo fixture', 'Not personal data']}><p>{personal ? 'Weight and checkpoint timing moved alongside each other in this sample.' : 'This demonstrates how a consented trend could appear.'} This is <span className="text-emphasis">observational</span>, not diagnostic.</p></CIAInsightCard>
        <SolidCard><div className="flex flex-wrap items-center justify-between gap-2"><p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-orange">Weight trend</p><div role="tablist" aria-label="Trend range" className="grid grid-cols-4 gap-1">{['1M','3M','6M','1Y'].map(item => <button key={item} type="button" role="tab" aria-selected={range === item} className={cx('focus-ring min-h-11 min-w-11 rounded-pill px-2 text-[11px]', range === item ? 'bg-white/10 text-white' : 'text-paper-100/65')} onClick={() => setRange(item)}>{item}</button>)}</div></div><div className="mt-2 flex flex-wrap items-baseline gap-2"><span className="text-[32px] font-semibold tabular-nums">72.0</span><span className="text-[13px] text-paper-100/65"><span>kg</span> · Target 70 kg</span></div><TrendChart past={[74.2,73.6,73.1,72.6,72.3,72]} projected={[71.4,70.7,70]} height={100} label={`${range} ${personal ? 'personal consented' : 'demo'} weight trend, 72 kilograms, ${low ? 'low' : 'high'} confidence`} /><div className="mt-3"><Provenance items={[personal ? 'Personal consented' : 'Demo fixture', 'Fresh Oct 12', low ? 'Low confidence' : 'High confidence']} /></div></SolidCard>
        <div className="grid grid-cols-1 gap-2 min-[350px]:grid-cols-3"><MetricPill label="Weight" value="72.0 kg" tone="you" /><MetricPill label="BMI" value="22.1 · calc" tone="muted" /><MetricPill label="Body fat" value={`${low ? '~' : 'est. '}18%`} tone="muted" /></div>
        <SectionTitle title="Progress photos" action={<button type="button" className="focus-ring min-h-11 rounded-pill px-3 text-[12px] font-semibold text-brand-orange" onClick={() => setPanel('compare')}>Compare</button>} />
        <SolidCard><div className="divide-y divide-white/10">{photos.map(photo => <button key={photo.date} type="button" className="focus-ring flex min-h-14 w-full items-center gap-3 rounded-lg py-2 text-left" aria-label={`${photo.date}, encrypted, ${photo.note}`} onClick={() => setStatus(`${photo.date} selected. ${photo.note}. Local preview only.`)}><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]"><ImageIcon size={16} /></span><span><strong className="text-[14px]">{photo.date}</strong><span className="block text-[12px] text-paper-100/70">Encrypted · {photo.note}</span></span></button>)}</div></SolidCard>
      </> : <SolidCard><p className="text-[17px] font-semibold">{state === 'privacy-revoked' ? 'Analysis is off' : 'Add your first private checkpoint'}</p><p className="mt-2 text-[13px] leading-5 text-paper-100/70">No fabricated values, thumbnails, or CIA inference appear before consent and evidence.</p></SolidCard>}
      <div className="grid grid-cols-1 gap-2 min-[350px]:grid-cols-2"><button type="button" className="focus-ring min-h-11 rounded-pill border border-white/15 text-[13px]" onClick={() => setStatus('Export prepared locally. No file was created.')}><Download className="mr-2 inline h-4 w-4" />Export</button><button type="button" className="focus-ring min-h-11 rounded-pill border border-white/15 text-[13px]" onClick={() => setPanel('delete-confirm')}><Trash2 className="mr-2 inline h-4 w-4" />Delete set</button></div>
      <button type="button" className="focus-ring min-h-11 w-full rounded-pill border border-white/15 text-[13px]" onClick={() => { setState('privacy-revoked'); setStatus('Analysis revoked locally; encrypted originals retained.') }}>Turn analysis off</button>
      <p className="text-[12px] leading-5 text-paper-100/70" role="status">{status}</p>
    </main>
  </HifiShell>
}
