'use client'

import { useEffect, useRef, useState } from 'react'
import { Search, Settings2, Trash2, Upload } from 'lucide-react'
import { BtnGhost, BtnPrimary, BtnSecondary, ConsentRail, GlassCard, GlassPillInput, HifiShell, IconButton, Provenance, SectionTitle, SolidCard, TopBar, cx } from '@/components/hifi/kit'
import { E1Modal } from './E1Modal'

const chapters = ['You', 'Preferences', 'Patterns', 'Correlations', 'Missions', 'Life'] as const
type Chapter = typeof chapters[number]
type Panel = 'node' | 'edit' | 'delete' | 'upload' | 'citation' | 'settings' | null

export function S20CiaMemory() {
  const [requested, setRequested] = useState('default')
  const [chapter, setChapter] = useState<Chapter>('Correlations')
  const [query, setQuery] = useState('')
  const [panel, setPanel] = useState<Panel>(null)
  const [notice, setNotice] = useState('')
  const opener = useRef<HTMLButtonElement | null>(null)
  const offline = requested === 'offline'
  const error = requested === 'error'
  const empty = requested === 'empty'

  useEffect(() => {
    const state = new URLSearchParams(window.location.search).get('state') ?? 'default'
    queueMicrotask(() => {
      setRequested(state)
      setQuery(state === 'search' ? 'sleep' : '')
      setPanel(state === 'node-detail' ? 'node' : state === 'edit' ? 'edit' : state === 'delete-confirm' ? 'delete' : state === 'upload' ? 'upload' : state === 'citation-medical' ? 'citation' : null)
      setNotice(state === 'success' ? 'Memory saved' : '')
    })
  }, [])

  function closePanel() {
    setPanel(null)
    requestAnimationFrame(() => { if (opener.current?.isConnected) opener.current.focus() })
  }
  function openPanel(next: Exclude<Panel, null>, trigger: HTMLButtonElement) { opener.current = trigger; setPanel(next) }

  return <HifiShell header={<TopBar title={<>Book of <span className="text-emphasis">life</span></>} right={<IconButton label="Wiki data and consent settings" onClick={event => openPanel('settings', event.currentTarget)}><Settings2 size={19} /></IconButton>} />} activeTab="me" atmosphere="cia" overlay={panel ? <WikiPanel panel={panel} onClose={closePanel} onSuccess={message => { setNotice(message); closePanel() }} /> : undefined}>
    <main className="space-y-4 px-4 pb-6 pt-2" data-state={requested}>
      {offline && <p role="status" className="glass-pill px-4 py-3 text-[13px] text-paper-100/75">Offline — showing last sync 2h ago. Search and queued edits remain available.</p>}
      {notice && <p role="status" className="rounded-lg border border-forest-green/40 bg-forest-green/10 px-4 py-3 text-[13px] text-paper-100">{notice}</p>}
      {error && <SolidCard><p role="alert" className="text-[14px]">Couldn&rsquo;t load memories — cached entries remain safe.</p><BtnSecondary className="mt-3">Try again</BtnSecondary></SolidCard>}
      <div className="flex items-center gap-2"><div className="min-w-0 flex-1"><GlassPillInput type="search" label="Search memories" icon={<Search size={16} />} placeholder="Search memories" value={query} onChange={event => setQuery(event.currentTarget.value)} /></div>{query && <button type="button" className="focus-ring min-h-11 rounded-pill px-3 text-[13px] text-brand-orange" onClick={() => setQuery('')}>Clear</button>}</div>
      <div role="tablist" aria-label="Wiki chapters" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
        {chapters.map(item => <button key={item} type="button" role="tab" aria-selected={chapter === item} onClick={() => setChapter(item)} className={cx('focus-ring flex min-h-11 shrink-0 items-center rounded-pill border px-4 text-[13px] font-medium', chapter === item ? 'border-transparent bg-surface-3 text-brand-orange' : 'border-white/10 text-white/60')}>{item}</button>)}
      </div>
      <SectionTitle title={empty ? '0 entries' : query ? '2 results' : '18 entries'} meta="Last updated 2h ago" />

      {empty ? <SolidCard><h2 className="text-[18px] font-semibold">Nothing here yet</h2><p className="mt-2 text-[13px] text-paper-100/65">Patterns appear only after you add or connect a source.</p><button type="button" className="hifi-action glass-pill focus-ring relative mt-4 inline-flex h-12 items-center justify-center gap-2 px-5 text-[15px] font-medium text-paper-100" onClick={event => openPanel('upload', event.currentTarget)}><Upload size={16} /> Add a document</button></SolidCard> : <>
        <GlassCard tone="cia" className="rounded-[40px]">
          <div role="img" aria-label="Correlation map. Confirmed non-causal co-variation between sleep and fiber, 28 paired days, updated 2 days ago, 78 percent confidence. CIA-inferred sleep and spend connection needs more data." className="relative mx-auto h-[154px] max-w-[260px]">
            <svg viewBox="0 0 260 154" className="h-full w-full" aria-hidden="true"><path d="M130 34 L68 112" className="stroke-brand-orange" strokeWidth="2"/><path d="M130 34 L198 112" className="stroke-royal-purple" strokeWidth="2" strokeDasharray="5 5"/><circle cx="130" cy="34" r="8" className="fill-brand-orange"/><circle cx="68" cy="112" r="8" className="fill-brand-orange"/><circle cx="198" cy="112" r="8" className="fill-royal-purple"/></svg>
            <button type="button" onClick={event => openPanel('node', event.currentTarget)} className="focus-ring absolute left-1/2 top-3 min-h-11 -translate-x-1/2 rounded-pill px-3 text-[12px] text-paper-100">Sleep</button><span className="absolute bottom-1 left-4 text-[12px] text-paper-100/75">Fiber</span><span className="absolute bottom-1 right-3 text-[12px] text-paper-100/75">Spend</span>
          </div>
          <div className="flex flex-wrap justify-between gap-2 border-t border-white/[0.06] pt-3 text-[11px] text-white/65"><span>━━ Confirmed co-variation</span><span>┄┄ CIA-inferred</span></div>
        </GlassCard>

        <MemoryCard title="Gut health & sleep" body="Across 28 paired days, higher-fiber breakfasts co-varied with deeper sleep that night. This observation does not establish cause." confidence="78% high confidence" provenance={['Meal logs + Health sleep', '28 paired days · 8 weeks', 'Updated 2d ago']} onEdit={trigger => openPanel('edit', trigger)} onDelete={trigger => openPanel('delete', trigger)} onFlag={() => setNotice('Flag recorded for review')} />
        <MemoryCard title="Workout skips & sleep debt" body="There is not enough evidence to describe a personal pattern yet." confidence="Needs more data to score" provenance={['Workout log + Health sleep', '9 paired days · updated 2d ago']} onEdit={trigger => openPanel('edit', trigger)} onDelete={trigger => openPanel('delete', trigger)} onFlag={() => setNotice('Flag recorded for review')} />
      </>}

      {query && !empty && <SolidCard><p className="text-[13px] text-paper-100/70">Showing two cached matches for “{query}”. Results span Correlations and Patterns.</p></SolidCard>}
      <div className="grid grid-cols-2 gap-2"><BtnSecondary onClick={event => openPanel('upload', event.currentTarget)}><Upload size={16}/> Upload document</BtnSecondary><BtnGhost onClick={event => openPanel('citation', event.currentTarget)}>Citation preview</BtnGhost></div>
      <GlassCard tone="muted"><p className="text-[12px] leading-4 text-white/65">CIA memory reads only consented logs, documents, and wearables. Entries can be corrected or removed.</p><ConsentRail compact /></GlassCard>
    </main>
  </HifiShell>
}

function MemoryCard({ title, body, confidence, provenance, onEdit, onFlag, onDelete }: { title: string; body: string; confidence: string; provenance: string[]; onEdit: (trigger: HTMLButtonElement) => void; onFlag: () => void; onDelete: (trigger: HTMLButtonElement) => void }) {
  return <SolidCard className="space-y-3"><div><h2 className="text-[15px] font-semibold">{title}</h2><p className="mt-1 text-[13px] leading-[19px] text-white/70">{body}</p></div><div><p className="text-[11px] font-semibold uppercase text-white/55">Confidence</p><p className="mt-1 text-[12px]">{confidence}</p><Provenance items={provenance}/></div><div className="flex flex-wrap items-center gap-1"><button type="button" className="hifi-action focus-ring relative inline-flex min-h-11 items-center justify-center rounded-pill px-4 text-[15px] font-medium text-paper-100/70" onClick={event => onEdit(event.currentTarget)}>Edit</button><BtnGhost quiet onClick={onFlag}>This is wrong</BtnGhost><IconButton label={`Delete ${title}`} onClick={event => onDelete(event.currentTarget)}><Trash2 size={16}/></IconButton></div></SolidCard>
}

function WikiPanel({ panel, onClose, onSuccess }: { panel: Exclude<Panel, null>; onClose: () => void; onSuccess: (message: string) => void }) {
  const titles: Record<Exclude<Panel, null>, string> = { node: 'Correlation evidence', edit: 'Edit memory', delete: 'Delete memory?', upload: 'Document preview', citation: 'Citation and medical boundary', settings: 'Wiki data controls' }
  return <E1Modal label={titles[panel]} onClose={onClose}><h2 className="text-[20px] font-semibold">{titles[panel]}</h2>
    {panel === 'node' && <div className="mt-3 space-y-2 text-[13px] text-paper-100/70"><p>Meal logs + Health sleep · 28 paired days over 8 weeks</p><p>Updated 2 days ago · 78% confidence using paired-day observation.</p><p>Non-causal: this co-variation does not prove fiber changed sleep.</p></div>}
    {panel === 'edit' && <div className="mt-3 space-y-3"><GlassPillInput multiline label="Memory text" placeholder="Memory text" value="Higher-fiber breakfasts co-varied with deeper sleep."/><BtnPrimary onClick={() => onSuccess('Memory saved')}>Save changes</BtnPrimary></div>}
    {panel === 'delete' && <div className="mt-3"><p className="text-[13px] text-paper-100/70">This removes the memory and its recommendation history. Source data is unchanged.</p><BtnPrimary className="mt-4" onClick={() => onSuccess('Memory deleted · Undo available')}>Delete memory</BtnPrimary></div>}
    {panel === 'upload' && <div className="mt-3 space-y-3 text-[13px] text-paper-100/70"><p>1. Select a local document</p><p>2. Processing preview — no file leaves this prototype</p><p>3. Review extracted citations before adding anything to your wiki</p><BtnSecondary onClick={() => onSuccess('Document processed locally · review citations')}>Preview processing</BtnSecondary></div>}
    {panel === 'citation' && <div className="mt-3 space-y-3 text-[13px] text-paper-100/70"><p>Source: uploaded care plan · page 3 · paragraph 2</p><p>Medical boundary: this extracted text is informational and is not medical advice or a diagnosis.</p><p>Nothing is added to CIA memory until you approve the cited excerpt.</p><BtnSecondary onClick={() => onSuccess('Citation approved for wiki preview')}>Approve cited excerpt</BtnSecondary></div>}
    {panel === 'settings' && <div className="mt-3 space-y-2 text-[13px] text-paper-100/70"><p>Categories: logs, documents, wearables</p><p>Scope: memory and correlations · freshness shown per entry</p><p>Retention: 12 months · export, revoke and delete remain reachable</p><ConsentRail /></div>}
    <BtnGhost className="mt-4" onClick={onClose}>Close</BtnGhost>
  </E1Modal>
}
