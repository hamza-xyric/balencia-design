'use client'

import { useEffect, useMemo, useState } from 'react'
import { Lock, Mic, Plus, Search, X } from 'lucide-react'
import { Button } from '@/components/design-system/Button'
import { Card } from '@/components/design-system/Card'
import { SegmentedControl } from '@/components/design-system/SegmentedControl'
import { JournalEntryCard } from '@/components/domain/JournalEntryCard'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { journalEntries, journalPrompt, type JournalEntry } from '@/data/mock'

// Screen 37 of 78: Journal
// Spec: /Users/hamza/yHealth/app_design 3/37-journal.md

const checkIns = ['Morning mood: steady', 'Energy check-in: low afternoon', 'Sleep check-in: 7h 10m']

function ReflectionPrompt({ prompt, onWrite }: { prompt: string; onWrite: (prompt?: string) => void }) {
  return (
    <Card variant="small" className="rounded-lg p-6 animate-fade-up">
      <div className="flex items-start gap-3">
        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-royal-purple" aria-hidden="true" />
        <div className="min-w-0">
          <p className="text-h3 font-normal leading-6 text-white/90">{prompt}</p>
          <button
            type="button"
            onClick={() => onWrite(prompt)}
            className="mt-4 inline-flex min-h-11 items-center rounded-pill border border-white/10 bg-ink-brown-800 px-4 text-caption font-semibold leading-[18px] text-white/70"
          >
            Write about this
          </button>
        </div>
      </div>
    </Card>
  )
}

export default function JournalScreen() {
  const [mode, setMode] = useState<'entries' | 'check-ins'>('entries')
  const [entries, setEntries] = useState<JournalEntry[]>(journalEntries)
  const [query, setQuery] = useState('')
  const [routePrompt, setRoutePrompt] = useState('')
  const [sheetOpen, setSheetOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const [mood, setMood] = useState('Calm')
  const [tag, setTag] = useState('learning')
  const [siaMemory, setSiaMemory] = useState(false)
  const [voice, setVoice] = useState(false)
  const [detail, setDetail] = useState<{ kind: 'entry'; entry: JournalEntry } | { kind: 'check-in'; text: string } | null>(null)
  const [editing, setEditing] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [toast, setToast] = useState('')
  const activePrompt = routePrompt || journalPrompt
  const filteredEntries = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return entries
    return entries.filter((entry) => {
      const haystack = [entry.date, entry.preview, entry.mood, ...entry.domains].filter(Boolean).join(' ').toLowerCase()
      return haystack.includes(normalized)
    })
  }, [entries, query])
  const filteredCheckIns = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return normalized ? checkIns.filter((item) => item.toLowerCase().includes(normalized)) : checkIns
  }, [query])
  const openWriter = (prompt = '') => {
    setDraft(prompt)
    setSheetOpen(true)
  }
  const closeWriter = () => {
    if (draft.trim() && !window.confirm('Discard this unsaved draft?')) return
    setSheetOpen(false)
  }
  const save = () => {
    const trimmed = draft.trim()
    if (!trimmed) return
    setEntries((items) => [{
      id: `journal-${Date.now()}`,
      date: 'Today',
      preview: trimmed,
      domains: [tag as JournalEntry['domains'][number]],
      mood,
      voice,
    }, ...items])
    setSheetOpen(false)
    setDraft('')
    setToast('Journal entry saved')
    window.setTimeout(() => setToast(''), 3000)
  }
  const saveEdit = () => {
    if (!detail || detail.kind !== 'entry') return
    const trimmed = draft.trim()
    if (!trimmed) return
    const updated = { ...detail.entry, preview: trimmed, mood, voice, domains: [tag as JournalEntry['domains'][number]] }
    setEntries((items) => items.map((entry) => entry.id === updated.id ? updated : entry))
    setDetail({ kind: 'entry', entry: updated })
    setEditing(false)
    setToast('Journal entry updated')
    window.setTimeout(() => setToast(''), 3000)
  }
  const deleteEntry = () => {
    if (!detail || detail.kind !== 'entry') return
    setEntries((items) => items.filter((entry) => entry.id !== detail.entry.id))
    setDetail(null)
    setEditing(false)
    setDeleteConfirm(false)
    setToast('Journal entry deleted')
    window.setTimeout(() => setToast(''), 3000)
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const prompt = new URLSearchParams(window.location.search).get('prompt')
      if (!prompt) return
      setRoutePrompt(prompt)
      setDraft(prompt)
      setSheetOpen(true)
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <PhoneFrame>
      <ScreenShell
        header={<Header title="Journal" showBack />}
        activeTab="me"
        bottomAction={<button type="button" onClick={() => openWriter()} className="mx-auto flex h-[48px] w-fit items-center justify-center gap-2 rounded-pill bg-brand-orange px-6 text-[15px] font-semibold leading-5 text-white shadow-2 shadow-brand-orange/30" aria-label="Write new journal entry"><Plus size={16} strokeWidth={2.4} />Write</button>}
      >
        <main className="px-4 pb-6 pt-4">
          <ReflectionPrompt prompt={activePrompt} onWrite={openWriter} />
          <Card variant="small" className="mt-4 p-4 text-caption leading-[18px] text-white/55 animate-fade-up">
            <div className="flex items-center gap-2 text-white"><Lock size={15} />Private journal</div>
            <p className="mt-2">Basic writing, editing, deletion, and search are free. SIA prompts, memory ingestion, and voice transcription are Plus controls and stay off until you opt in.</p>
            <label className="mt-3 flex min-h-11 items-center justify-between rounded-md bg-ink-900 px-3">
              <span>Allow SIA to remember selected entries</span>
              <input type="checkbox" checked={siaMemory} onChange={(event) => setSiaMemory(event.target.checked)} />
            </label>
          </Card>
          <div className="mt-4 flex h-11 items-center gap-3 rounded-md border border-white/10 bg-ink-brown-800 px-4 shadow-1">
            <Search size={16} className="text-white/40" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 bg-transparent text-[15px] text-white outline-none placeholder:text-white/40" placeholder="Search journal..." aria-label="Search journal" />
            {query && (
              <button type="button" onClick={() => setQuery('')} className="flex h-8 w-8 items-center justify-center rounded-full text-white/45" aria-label="Clear journal search">
                <X size={15} />
              </button>
            )}
          </div>
          <p className="mt-2 px-1 text-caption leading-[18px] text-white/45" aria-live="polite">
            {mode === 'entries' ? filteredEntries.length : filteredCheckIns.length} result{(mode === 'entries' ? filteredEntries.length : filteredCheckIns.length) === 1 ? '' : 's'}{query ? ` for "${query}"` : ''}
          </p>

          <SegmentedControl
            options={[
              { label: 'Entries', value: 'entries' },
              { label: 'Check-ins', value: 'check-ins' },
            ]}
            activeValue={mode}
            onValueChange={(value) => setMode(value as 'entries' | 'check-ins')}
            className="mt-4 animate-fade-up"
            size="sm"
          />

          <section className="mt-4 animate-fade-up" style={{ animationDelay: '160ms' }}>
            <Card variant="small" className="rounded-lg p-0">
              {mode === 'entries' ? filteredEntries.map((entry, index) => (
                <button key={entry.id} type="button" onClick={() => { setDetail({ kind: 'entry', entry }); setEditing(false); setDeleteConfirm(false) }} className="w-full text-left" aria-label={`Open journal entry from ${entry.date}, mood ${entry.mood ?? 'not set'}`}>
                  <JournalEntryCard
                    date={entry.date}
                    preview={entry.preview}
                    domains={entry.domains}
                    mood={entry.mood}
                    voice={entry.voice}
                    withDivider={index > 0}
                  />
                </button>
              )) : filteredCheckIns.map((item, index) => (
                  <button key={item} type="button" onClick={() => { setDetail({ kind: 'check-in', text: item }); setEditing(false); setDeleteConfirm(false) }} className={['flex min-h-14 w-full items-center justify-between px-4 py-3 text-left', index > 0 ? 'border-t border-white/[0.05]' : ''].join(' ')}>
                    <span className="text-[15px] text-white">{item}</span>
                    <span className="text-caption text-white/40">Read only</span>
                  </button>
              ))}
              {((mode === 'entries' && filteredEntries.length === 0) || (mode === 'check-ins' && filteredCheckIns.length === 0)) && (
                <div className="p-5 text-center text-[15px] leading-5 text-white/55">
                  No journal results for &quot;{query}&quot;.
                </div>
              )}
            </Card>
          </section>
        </main>
        {sheetOpen && (
          <div className="absolute inset-x-0 bottom-[84px] z-20 mx-3 rounded-xl border border-white/10 bg-ink-brown-800 p-4 shadow-2" role="dialog" aria-label="New journal entry editor">
            <div className="flex items-center justify-between">
              <h2 className="text-[17px] font-semibold text-white">New entry</h2>
              <button type="button" onClick={closeWriter} className="flex h-11 w-11 items-center justify-center rounded-full text-white/60" aria-label="Cancel"><X size={18} /></button>
            </div>
            <textarea value={draft} onChange={(event) => setDraft(event.target.value)} className="mt-3 min-h-[132px] w-full rounded-md border border-white/10 bg-ink-900 p-3 text-[15px] text-white outline-none placeholder:text-white/30" placeholder="Write freely..." />
            <div className="mt-3 grid grid-cols-3 gap-2" role="group" aria-label="Mood">
              {['Happy', 'Calm', 'Neutral'].map((item) => <button key={item} type="button" onClick={() => setMood(item)} aria-pressed={mood === item} className={['h-11 rounded-pill border text-caption', mood === item ? 'border-brand-orange text-brand-orange' : 'border-white/10 text-white/55'].join(' ')}>{item}</button>)}
            </div>
            <label className="mt-3 block text-caption leading-[18px] text-white/50">Domain tag
              <select value={tag} onChange={(event) => setTag(event.target.value)} className="mt-1 h-11 w-full rounded-md border border-white/10 bg-ink-900 px-3 text-[15px] text-white outline-none">
                <option value="learning">Learning</option><option value="creativity">Creativity</option><option value="wellbeing">Wellbeing</option>
              </select>
            </label>
            <button type="button" onClick={() => setVoice(!voice)} aria-pressed={voice} className="mt-3 flex min-h-11 w-full items-center gap-2 rounded-md bg-ink-900 px-3 text-[15px] text-white/65"><Mic size={16} />{voice ? 'Recording in progress. Tap to stop.' : 'Plus voice transcription preview'}</button>
            <Button disabled={!draft.trim()} onClick={save} fullWidth variant="completion" className="mt-3">Save</Button>
          </div>
        )}
        {detail && (
          <div className="absolute inset-x-4 bottom-[112px] z-30 rounded-xl border border-white/10 bg-ink-brown-800 p-4 shadow-2" role="dialog" aria-label="Journal detail">
            <button type="button" onClick={() => { setDetail(null); setEditing(false); setDeleteConfirm(false) }} className="ml-auto flex h-11 w-11 items-center justify-center rounded-full text-white/60" aria-label="Close detail"><X size={18} /></button>
            {detail.kind === 'entry' ? (
              <>
                <div className="text-caption leading-[18px] text-white/40">{detail.entry.date}</div>
                {editing ? (
                  <>
                    <textarea value={draft} onChange={(event) => setDraft(event.target.value)} className="mt-3 min-h-[120px] w-full rounded-md border border-white/10 bg-ink-900 p-3 text-[15px] leading-5 text-white outline-none" aria-label="Edit journal entry" />
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <Button type="button" variant="skip" onClick={() => setEditing(false)}>Cancel</Button>
                      <Button type="button" variant="completion" disabled={!draft.trim()} onClick={saveEdit}>Save edit</Button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="mt-2 text-[15px] leading-5 text-white/75">{detail.entry.preview}</p>
                    {deleteConfirm ? (
                      <div className="mt-4 rounded-md border border-error-red/20 bg-error-red/10 p-3">
                        <p className="text-caption leading-[18px] text-white/75">Delete this private entry? This prototype removes it from the visible list.</p>
                        <div className="mt-3 grid grid-cols-2 gap-2">
                          <Button type="button" variant="skip" onClick={() => setDeleteConfirm(false)}>Keep</Button>
                          <button type="button" onClick={deleteEntry} className="h-[48px] rounded-pill bg-error-red text-caption font-semibold text-white">Delete</button>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <Button type="button" variant="skip" onClick={() => { setDraft(detail.entry.preview); setMood(detail.entry.mood ?? 'Calm'); setTag(detail.entry.domains[0] ?? 'learning'); setVoice(Boolean(detail.entry.voice)); setEditing(true) }}>Edit</Button>
                        <button type="button" onClick={() => setDeleteConfirm(true)} className="h-[48px] rounded-pill border border-error-red/30 bg-error-red/10 text-caption font-semibold text-error-red">Delete</button>
                      </div>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                <div className="text-caption leading-[18px] text-white/40">Check-in</div>
                <p className="mt-2 text-[15px] leading-5 text-white/75">{detail.text}</p>
              </>
            )}
          </div>
        )}
        {toast && <div className="absolute inset-x-4 bottom-[96px] z-40 rounded-pill bg-forest-green px-4 py-3 text-[14px] font-semibold text-white shadow-2" role="status">{toast}</div>}
      </ScreenShell>
    </PhoneFrame>
  )
}
