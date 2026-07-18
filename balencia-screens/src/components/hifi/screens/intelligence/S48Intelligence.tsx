'use client'

import { useEffect, useRef, useState } from 'react'
import { BtnGhost, BtnSecondary, Chip, GlassCard, HifiShell, ProgressBar, Provenance, SectionTitle, SolidCard, Sparkline, TopBar, cx } from '@/components/hifi/kit'
import { E1Modal } from './E1Modal'

const axes = ['Sleep', 'Fitness', 'Nutrition', 'Wellbeing', 'Finance'] as const
const cells = axes.flatMap((row, rowIndex) => axes.map((column, columnIndex) => ({
  row, column, diagonal: rowIndex === columnIndex,
  direction: (rowIndex + columnIndex) % 3 === 0 ? 'competing' : 'reinforcing',
  strength: 42 + ((rowIndex * 13 + columnIndex * 9) % 45),
})))
type Panel = 'manage' | 'legend' | 'contradiction' | null
type Timeframe = '7d' | '14d' | '30d'

export function S48Intelligence() {
  const [requested, setRequested] = useState('default')
  const [panel, setPanel] = useState<Panel>(null)
  const [timeframe, setTimeframe] = useState<Timeframe>('7d')
  const [contradictionVisible, setContradictionVisible] = useState(true)
  const [notice, setNotice] = useState('')
  const opener = useRef<HTMLButtonElement | null>(null)
  const low = requested === 'low-confidence'
  const empty = requested === 'empty'
  const error = requested === 'error'
  const offline = requested === 'offline'

  useEffect(() => {
    const state = new URLSearchParams(window.location.search).get('state') ?? 'default'
    queueMicrotask(() => {
      setRequested(state)
      setPanel(state === 'legend' ? 'legend' : state === 'contradiction' ? 'contradiction' : null)
      setTimeframe(state === 'timeframe' ? '30d' : '7d')
    })
  }, [])
  const score = low ? 64 : 87
  const trend: Record<Timeframe, number[]> = { '7d': [62,66,68,65,70,72,74], '14d': [58,61,63,62,66,68,70], '30d': [52,56,59,61,64,67,70] }

  function closePanel() { setPanel(null); requestAnimationFrame(() => { if (opener.current?.isConnected) opener.current.focus() }) }
  function openPanel(next: Exclude<Panel, null>, trigger: HTMLButtonElement) { opener.current = trigger; setPanel(next) }

  return <HifiShell header={<TopBar title="Intelligence" right={<button type="button" className="focus-ring min-h-11 rounded-pill px-3 text-[12px] font-semibold text-paper-100/75" onClick={event => openPanel('manage', event.currentTarget)}>Manage data</button>} />} activeTab="me" overlay={panel ? <IntelligencePanel panel={panel} onClose={closePanel} onResolve={() => { setContradictionVisible(false); setNotice('Contradiction resolved. CIA can use the selected sleep source.'); closePanel() }} /> : undefined}>
    <main className="space-y-4 px-4 pb-6 pt-3" data-state={requested}>
      {offline && <p role="status" className="glass-pill px-4 py-3 text-[13px] text-paper-100/75">Offline — showing last sync 2h ago</p>}
      {notice && <p role="status" className="rounded-lg border border-forest-green/40 bg-forest-green/10 px-4 py-3 text-[13px]">{notice}</p>}
      {error && <SolidCard><p role="alert" className="text-[14px]">Couldn&rsquo;t load intelligence. Other sections remain available.</p><BtnSecondary className="mt-3" onClick={() => setRequested('default')}>Retry locally</BtnSecondary></SolidCard>}
      {!error && <GlassCard>
        <p className="text-[12px] font-semibold uppercase text-white/65">Your daily intelligence</p>
        <div className="mt-4 grid grid-cols-[minmax(0,128px)_minmax(0,1fr)] items-center gap-3">
          <div className="relative aspect-square w-full max-w-[128px]" role="meter" aria-label={empty ? 'Intelligence score unavailable' : `Intelligence score ${score} out of 100`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={empty ? undefined : score}><svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden="true"><circle cx="60" cy="60" r="46" fill="none" className="stroke-brand-orange/15" strokeWidth="12"/><circle cx="60" cy="60" r="46" fill="none" className="stroke-brand-orange" strokeWidth="12" strokeDasharray={`${empty ? 0 : score * 2.89} 289`} strokeLinecap="round"/></svg><div className="absolute inset-0 flex flex-col items-center justify-center"><strong className="text-[30px] tabular-nums">{empty ? '—' : score}</strong><span className="text-[11px] text-paper-100/65">Score</span></div></div>
          <div className="min-w-0"><p className="text-[15px] font-semibold">{empty ? 'Not enough data yet' : low ? 'Estimated · low confidence' : '+3 from yesterday'}</p><p className="mt-2 text-[12px] leading-[17px] text-white/65">{empty ? 'Connect or log 3 more days.' : 'Formula: wearable 40% + logs 35% + mission activity 25%.'}</p></div>
        </div>
        {!empty && <div className="mt-3"><Provenance items={[low ? 'Low confidence' : 'High confidence', '3 source categories', offline ? 'Last sync 2h ago' : 'Updated 2h ago']} /></div>}
      </GlassCard>}

      {contradictionVisible && !empty && !error && <><SectionTitle title="Active contradictions"/><GlassCard tone="cia"><p className="text-[14px] leading-5">You logged 8h sleep, while WHOOP reports 5.5h. CIA will not use either value until you choose.</p><div className="mt-3 flex flex-wrap gap-2"><Chip>Sleep log · 8h</Chip><Chip>WHOOP · 5.5h</Chip></div><div className="mt-2 flex flex-wrap gap-1"><BtnGhost onClick={event => openPanel('contradiction', event.currentTarget)}>Resolve</BtnGhost><BtnGhost onClick={() => { setContradictionVisible(false); setNotice('Contradiction dismissed; both values remain excluded.') }}>Dismiss</BtnGhost></div></GlassCard></>}

      {!empty && !error && <><SectionTitle title="Cross-domain patterns" action={<button type="button" className="focus-ring min-h-11 rounded-pill px-3 text-[12px] text-brand-orange" onClick={event => openPanel('legend', event.currentTarget)}>Legend</button>} /><SolidCard><div className="grid grid-cols-[50px_repeat(5,minmax(0,1fr))] gap-1 text-center"><span/><>{axes.map(axis => <span key={axis} className="truncate text-[9px] text-paper-100/65" title={axis}>{axis.slice(0,3)}</span>)}</>{axes.map(row => <div key={row} className="contents"><span className="self-center truncate text-left text-[9px] text-paper-100/65">{row.slice(0,5)}</span>{cells.filter(cell => cell.row === row).map(cell => <span key={`${cell.row}-${cell.column}`} role="img" aria-label={cell.diagonal ? `${cell.row} with itself, not applicable` : `${cell.row} and ${cell.column}, ${cell.direction}, ${cell.strength} percent strength, 42 paired days over 8 weeks, updated 2 hours ago, medium confidence`} className={cx('h-8 rounded-sm border', cell.diagonal ? 'border-white/5 bg-white/[0.04]' : cell.direction === 'reinforcing' ? 'border-forest-green/30 bg-forest-green/40' : 'border-brand-orange/30 bg-brand-orange/35')}><span className="sr-only">{cell.diagonal ? 'N/A' : cell.direction === 'reinforcing' ? '+' : '−'}</span></span>)}</div>)}</div><p className="mt-4 text-[13px] leading-[18px] text-white/70">Across 42 paired days over 8 weeks, meditation and stress co-varied. Updated 2h ago · medium confidence · observation, not causation.</p></SolidCard></>}

      {!empty && !error && <><SectionTitle title="Trend"/><div className="grid grid-cols-3 gap-2" role="group" aria-label="Trend timeframe">{(['7d','14d','30d'] as Timeframe[]).map(item => <button key={item} type="button" aria-pressed={timeframe === item} onClick={() => setTimeframe(item)} className={cx('focus-ring min-h-11 rounded-pill border text-[12px]', timeframe === item ? 'border-brand-orange bg-surface-3 text-brand-orange' : 'border-white/10 text-paper-100/65')}>{item}</button>)}</div><SolidCard><Sparkline tone="cia" values={trend[timeframe]} label={`${timeframe} projected intelligence trend`} /><Provenance items={['Projected by CIA', low ? 'Low confidence' : 'Medium confidence']} /></SolidCard><SolidCard><p className="text-[12px] font-semibold uppercase text-white/55">Best day formula</p><p className="mt-2 text-[15px]">7h sleep, meditation, one workout, early meal.</p><div className="mt-3"><ProgressBar value={80} /></div><p className="mt-2 text-[12px] text-paper-100/65">4 of 5 factors · 28 observed days · updated 2h ago</p></SolidCard></>}
    </main>
  </HifiShell>
}

function IntelligencePanel({ panel, onClose, onResolve }: { panel: Exclude<Panel, null>; onClose: () => void; onResolve: () => void }) {
  const title = panel === 'manage' ? 'Manage intelligence data' : panel === 'legend' ? 'Matrix legend' : 'Resolve sleep source'
  return <E1Modal label={title} onClose={onClose}><h2 className="text-[20px] font-semibold">{title}</h2>{panel === 'manage' && <div className="mt-3 space-y-2 text-[13px] text-paper-100/70"><p>3 source categories: wearable, logs, mission activity</p><p>Scope: daily intelligence · updated 2h ago · retention 12 months</p><p>Export, revoke and delete are local prototype previews.</p></div>}{panel === 'legend' && <div className="mt-3 space-y-2 text-[13px] text-paper-100/70"><p>+ Reinforcing co-variation — green fill plus sign</p><p>− Competing co-variation — orange fill minus sign</p><p>N/A — neutral diagonal. Color is never the only signal.</p></div>}{panel === 'contradiction' && <div className="mt-3 space-y-3 text-[13px] text-paper-100/70"><p>Sleep log: 8h · WHOOP: 5.5h. Both updated today.</p><p>Selecting the wearable resolves this visual-only preview.</p><BtnSecondary onClick={onResolve}>Use WHOOP 5.5h</BtnSecondary></div>}<BtnGhost className="mt-4" onClick={onClose}>Close</BtnGhost></E1Modal>
}
