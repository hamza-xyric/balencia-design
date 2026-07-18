'use client'

import { useEffect, useRef, useState } from 'react'
import { FileText, Info, Minus, Plus, RotateCcw, Scan, X } from 'lucide-react'
import { BtnCoach, BtnGhost, CIAInsightCard, HifiShell, IconButton, Provenance, TopBar, cx } from '@/components/hifi/kit'
import { E1Modal } from './E1Modal'

const STATES = ['default', 'empty', 'error', 'offline'] as const
const PANELS = ['closed', 'node-detail', 'legend', 'document', 'citation-medical'] as const
type GraphState = (typeof STATES)[number]
type GraphPanel = (typeof PANELS)[number]

const NODES = [
  { id: 'sleep', label: 'Sleep', x: 30, y: 24, count: 4, source: 'WHOOP + Health', tone: 'border-domain-sleep text-domain-sleep' },
  { id: 'workout', label: 'Workout', x: 64, y: 24, count: 4, source: 'Workout log', tone: 'border-domain-fitness text-domain-fitness' },
  { id: 'zen', label: 'Zen', x: 10, y: 49, count: 1, source: 'You logged', tone: 'border-domain-meditation text-domain-meditation' },
  { id: 'productivity', label: 'Focus', x: 79, y: 49, count: 1, source: 'Estimated', tone: 'border-domain-productivity text-domain-productivity' },
  { id: 'deep-sleep', label: 'Deep', x: 20, y: 75, count: 1, source: 'Health', tone: 'border-domain-sleep text-domain-sleep' },
  { id: 'hrv', label: 'HRV', x: 43, y: 77, count: 1, source: 'Estimated', tone: 'border-domain-fitness text-domain-fitness' },
  { id: 'strain', label: 'Strain', x: 69, y: 75, count: 1, source: 'WHOOP', tone: 'border-domain-fitness text-domain-fitness' },
  { id: 'calories', label: 'Calories', x: 53, y: 91, count: 1, source: 'Estimated', tone: 'border-domain-nutrition text-domain-nutrition' },
] as const

const CONNECTIONS = [
  { label: 'Sleep', value: 78, kind: 'Confirmed', source: 'WHOOP + Health', confidence: 'High · 47 of 60 observations' },
  { label: 'Strain', value: 70, kind: 'Confirmed', source: 'WHOOP + workout log', confidence: 'High · 45 of 60 observations' },
  { label: 'Productivity', value: 54, kind: 'Estimated', source: 'Calendar + workout log', confidence: 'Low · 18 of 60 observations' },
  { label: 'Calories', value: 45, kind: 'Estimated', source: 'Nutrition + workout log', confidence: 'Low · 14 of 60 observations' },
] as const

function isState(value: string | null): value is GraphState { return STATES.some(item => item === value) }
function isPanel(value: string | null): value is GraphPanel { return PANELS.some(item => item === value) }

function Dialog({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <E1Modal label={title} onClose={onClose}>
        <div className="flex min-h-11 items-center justify-between gap-3"><h2 className="text-[18px] font-semibold text-paper-100">{title}</h2><button type="button" aria-label={`Close ${title}`} className="focus-ring flex h-11 w-11 items-center justify-center rounded-full" onClick={onClose}><X /></button></div>
        {children}
    </E1Modal>
  )
}

export function S72KnowledgeGraph() {
  const [state, setState] = useState<GraphState>('default')
  const [panel, setPanel] = useState<GraphPanel>('closed')
  const [selected, setSelected] = useState('workout')
  const [zoom, setZoom] = useState(100)
  const [status, setStatus] = useState('Bundled graph fixture ready. No member account, device, file, or network capability is active.')
  const returnFocus = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    queueMicrotask(() => {
      if (isState(params.get('state'))) setState(params.get('state') as GraphState)
      if (isPanel(params.get('panel'))) setPanel(params.get('panel') as GraphPanel)
      if (params.get('node') && NODES.some(node => node.id === params.get('node'))) setSelected(params.get('node')!)
    })
  }, [])

  const closePanel = () => { setPanel('closed'); requestAnimationFrame(() => { if (returnFocus.current?.isConnected) returnFocus.current.focus() }) }
  const openPanel = (next: GraphPanel, trigger: HTMLButtonElement) => { returnFocus.current = trigger; setPanel(next) }
  const selectNode = (id: string, trigger: HTMLButtonElement) => { setSelected(id); openPanel('node-detail', trigger); setStatus(`${NODES.find(node => node.id === id)?.label} selected. Detail sheet opened.`) }
  const adjustZoom = (next: number) => { setZoom(next); setStatus(`Graph zoom ${next}%.`) }
  const unavailable = state === 'empty' || state === 'error'

  const overlay = panel === 'legend' ? (
    <Dialog title="Graph legend" onClose={closePanel}><ul className="mt-3 space-y-3 text-[13px] leading-5 text-paper-100/75"><li><span className="text-brand-orange">Solid orange</span> — confirmed personal co-variation.</li><li><span className="text-royal-purple">Dashed purple</span> — estimated, low-confidence connection.</li><li>Node size represents connection count, not health or performance.</li></ul></Dialog>
  ) : panel === 'document' ? (
    <Dialog title="Document evidence" onClose={closePanel}><div data-document-status="processed" className="mt-3 rounded-xl border border-white/10 bg-white/[0.04] p-4"><FileText className="text-royal-purple" aria-hidden="true"/><h3 className="mt-2 text-[15px] font-semibold text-paper-100">Annual labs summary</h3><p className="mt-2 text-[12px] leading-5 text-paper-100/70">Processed locally for this bundled preview · imported 8 Jul · health category · 2 citations.</p><p className="mt-2 text-[12px] leading-5 text-paper-100/70">Document-derived connection · low confidence · no diagnosis.</p><button type="button" className="focus-ring mt-3 min-h-11 rounded-pill border border-brand-orange/40 px-4 text-[13px] text-brand-orange" onClick={() => setPanel('citation-medical')}>Review citations</button></div></Dialog>
  ) : panel === 'citation-medical' ? (
    <Dialog title="Citation and medical boundary" onClose={closePanel}><p className="mt-3 text-[13px] leading-5 text-paper-100/75">Citation 1: annual labs summary, page 2. Citation 2: member-entered sleep note, 8 Jul.</p><div className="mt-3 rounded-xl border border-brand-orange/30 bg-brand-orange/10 p-4 text-[12px] leading-5 text-paper-100/80">This preview organizes source material; it does not diagnose or replace a clinician. Nothing is added to your Book of Life without explicit confirmation.</div><div className="mt-3 grid grid-cols-2 gap-2"><button type="button" className="focus-ring min-h-11 rounded-pill border border-white/15 px-3 text-[12px]" onClick={() => setStatus('Document-to-wiki preview confirmed locally. Nothing was stored or uploaded.')}>Preview in wiki</button><button type="button" className="focus-ring min-h-11 rounded-pill border border-white/15 px-3 text-[12px]" onClick={() => setStatus('Document recommendation history deleted from this local preview only.')}>Delete history</button></div><p role="status" className="mt-3 text-[12px] text-paper-100/70">{status}</p></Dialog>
  ) : panel === 'node-detail' ? (
    <Dialog title={`${NODES.find(node => node.id === selected)?.label ?? 'Workout'} connections`} onClose={closePanel}>
      <p className="mt-2 text-[12px] leading-5 text-paper-100/70">Window: 30 days · sample: 47 paired days · freshness: 8 minutes ago · confidence: high for confirmed rows. Connections show co-variation, not causation.</p>
      <div className="mt-3 divide-y divide-white/[0.06]">{CONNECTIONS.map(row => <div key={row.label} className="py-3"><div className="flex items-center gap-2"><span className="min-w-20 text-[13px] text-paper-100">{row.label}</span><div className="h-2 min-w-16 flex-1 overflow-hidden rounded-pill bg-white/10" role="progressbar" aria-label={`${row.label} correlation strength`} aria-valuenow={row.value} aria-valuemin={0} aria-valuemax={100}><div className={cx('h-full rounded-pill', row.kind === 'Confirmed' ? 'bg-brand-orange' : 'bg-royal-purple')} style={{ width: `${row.value}%` }}/></div><span className="text-[12px] tabular-nums">{row.value}%</span></div><p className="mt-1 text-[11px] leading-4 text-paper-100/65">{row.kind} · {row.source} · {row.confidence}</p></div>)}</div>
      <CIAInsightCard className="mt-3" provenance={['WHOOP + Health', 'Workout log', '47 paired days', 'Fresh 8m', 'High confidence']} actions={<><BtnCoach disabled={state === 'offline'} onClick={() => setStatus('Ask CIA preview opened locally. No message was sent.')}>Ask CIA</BtnCoach><BtnGhost onClick={() => setStatus('Fitness navigation preview selected. Navigation stayed local.')}>Go to Fitness</BtnGhost></>}><p>Better sleep and workout performance moved together in this 30-day sample. This is an observation, not proof of cause.</p></CIAInsightCard>
      {state === 'offline' && <p className="mt-2 text-[12px] text-paper-100/70">Ask CIA is unavailable offline. Cached evidence remains inspectable.</p>}
      <p role="status" className="mt-2 text-[12px] text-paper-100/70">{status}</p>
    </Dialog>
  ) : undefined

  return <div className="contents [&_button]:text-[length:inherit]"><HifiShell header={<TopBar title={<>Knowledge <span className="text-emphasis">graph</span></>} backHref="/screens/48" right={<IconButton label="About the knowledge graph" onClick={event => openPanel('legend', event.currentTarget)}><Info size={19}/></IconButton>}/>} activeTab="me" atmosphere="cia" overlay={overlay}>
    <main className="space-y-4 px-4 pb-6 pt-2" data-state-surface={state} data-graph-state={state} data-graph-panel={panel} data-selected-node={selected} data-node-count={unavailable ? 0 : NODES.length} data-zoom={zoom}>
      {state === 'offline' && <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-[12px] text-paper-100/75">Offline · showing bundled evidence cached 8 minutes ago.</div>}
      {state === 'error' && <div className="rounded-xl border border-brand-orange/25 bg-brand-orange/10 p-4"><h2 className="text-[15px] font-semibold">Graph unavailable</h2><p className="mt-1 text-[12px] text-paper-100/70">Could not load connection evidence. No values are shown.</p><button type="button" className="focus-ring mt-3 min-h-11 rounded-pill border border-brand-orange/40 px-4 text-[13px]" onClick={() => setState('default')}>Retry locally</button></div>}
      {state === 'empty' && <div className="flex min-h-[300px] flex-col items-center justify-center rounded-[28px] border border-dashed border-white/15 p-6 text-center"><h2 className="text-[17px] font-semibold">No connections yet</h2><p className="mt-2 text-[13px] leading-5 text-paper-100/65">Keep tracking to discover connections. No estimates are fabricated.</p></div>}
      {!unavailable && <><section className="relative h-[300px] overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02]" aria-label="Interactive knowledge graph">
        <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute inset-0 h-full w-full transition-transform motion-reduce:transition-none" style={{ transform: `scale(${zoom / 100})` }}><line x1="30" y1="24" x2="64" y2="24" className="stroke-brand-orange" strokeWidth="1"/><line x1="30" y1="24" x2="10" y2="49" className="stroke-royal-purple" strokeDasharray="2 2"/><line x1="64" y1="24" x2="79" y2="49" className="stroke-royal-purple" strokeDasharray="2 2"/><line x1="30" y1="24" x2="20" y2="75" className="stroke-brand-orange"/><line x1="64" y1="24" x2="69" y2="75" className="stroke-brand-orange"/><line x1="64" y1="24" x2="43" y2="77" className="stroke-royal-purple" strokeDasharray="2 2"/></svg>
        {NODES.map(node => <button key={node.id} type="button" aria-pressed={selected === node.id} aria-label={`${node.label}, ${node.count} connections, ${node.source}`} className={cx('focus-ring absolute flex min-h-11 min-w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-ink-900/90 px-2 text-[11px] font-semibold', node.tone, selected === node.id && 'ring-2 ring-brand-orange')} style={{ left: `${node.x}%`, top: `${node.y}%` }} onClick={event => selectNode(node.id, event.currentTarget)}>{node.label}</button>)}
        <button type="button" className="focus-ring absolute bottom-3 left-3 min-h-11 rounded-pill border border-white/15 bg-ink-900/75 px-4 text-[12px]" onClick={event => openPanel('legend', event.currentTarget)}>Legend</button>
        <div className="absolute right-3 top-3 flex flex-col rounded-pill border border-white/15 bg-ink-900/75"><IconButton label="Zoom in" onClick={() => adjustZoom(Math.min(150, zoom + 10))}><Plus size={18}/></IconButton><IconButton label="Zoom out" onClick={() => adjustZoom(Math.max(50, zoom - 10))}><Minus size={18}/></IconButton><IconButton label="Reset view" onClick={() => adjustZoom(100)}><Scan size={18}/></IconButton></div>
      </section>
      <section aria-label="Linear graph controls"><h2 className="text-[12px] font-semibold uppercase tracking-wide text-paper-100/70">Explore nodes</h2><div className="mt-2 grid grid-cols-2 gap-2">{NODES.map(node => <button key={node.id} type="button" aria-pressed={selected === node.id} className="focus-ring min-h-11 rounded-xl border border-white/10 px-3 text-left text-[12px] text-paper-100/75" onClick={event => selectNode(node.id, event.currentTarget)}><span className="font-semibold text-paper-100">{node.label}</span><span className="block text-[11px]">{node.count} connections · {node.source}</span></button>)}</div></section>
      <div className="grid grid-cols-2 gap-2"><button type="button" className="focus-ring min-h-11 rounded-pill border border-white/15 px-3 text-[12px]" onClick={event => openPanel('document', event.currentTarget)}><FileText className="mr-2 inline h-4 w-4"/>Document evidence</button><button type="button" className="focus-ring min-h-11 rounded-pill border border-white/15 px-3 text-[12px]" onClick={() => adjustZoom(100)}><RotateCcw className="mr-2 inline h-4 w-4"/>Reset graph</button></div>
      <Provenance items={['Window 30 days', '47 paired days', 'Fresh 8m', 'Confirmed + estimated']} /></>}
      <p className="sr-only" role="status" aria-live="polite">{status}</p>
    </main>
  </HifiShell></div>
}
