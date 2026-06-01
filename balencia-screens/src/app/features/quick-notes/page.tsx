'use client'

import { useState } from 'react'
import { ArrowUp, Search } from 'lucide-react'
import { Card } from '@/components/design-system/Card'
import { Chip } from '@/components/design-system/Chip'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { quickNotes } from '@/data/mock'

// Screen 62 of 78: Quick notes
// Spec: /Users/hamza/yHealth/app_design 3/62-quick-notes.md

const tagClasses: Record<string, string> = {
  nutrition: 'bg-domain-nutrition/15 text-domain-nutrition',
  workout: 'bg-domain-fitness/15 text-domain-fitness',
  health: 'bg-domain-wellbeing/15 text-domain-wellbeing',
  mood: 'bg-domain-meditation/15 text-domain-meditation',
  idea: 'bg-domain-creativity/15 text-domain-creativity',
}

function FilterRow({ active, onChange }: { active: string; onChange: (filter: string) => void }) {
  return (
    <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1 hide-scrollbar animate-fade-up" style={{ animationDelay: '80ms' }}>
      {quickNotes.filters.map((filter) => (
        <button key={filter} type="button" onClick={() => onChange(filter)} aria-pressed={active === filter} className="min-h-11 shrink-0">
          <Chip selected={active === filter}>{filter}</Chip>
        </button>
      ))}
    </div>
  )
}

function QuickAddBar({ className = '', value, onChange, onSave }: { className?: string; value: string; onChange: (value: string) => void; onSave: () => void }) {
  return (
    <form onSubmit={(event) => { event.preventDefault(); onSave() }} className={['flex h-[52px] items-center gap-2 rounded-lg border border-white/10 bg-ink-brown-800 px-3 shadow-1', className].join(' ')}>
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder="What is on your mind..." className="min-w-0 flex-1 truncate bg-transparent text-[15px] leading-5 text-white outline-none placeholder:text-white/40" />
      <button type="submit" disabled={!value.trim()} aria-label="Save quick note" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-orange text-white disabled:opacity-50">
        <ArrowUp size={17} strokeWidth={2.4} />
      </button>
    </form>
  )
}

function NoteCard({ note, delay, onAsk }: { note: (typeof quickNotes.notes)[number]; delay: number; onAsk: () => void }) {
  return (
    <Card variant="small" className="rounded-xl p-4 animate-fade-up" style={{ animationDelay: `${delay}ms` }}>
      <p className="text-[15px] leading-[22px] text-white/85">{note.text}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {note.tags.map((tag) => {
          const key = tag.toLowerCase()
          return <span key={tag} className={['rounded-sm px-2 py-1 text-small font-semibold leading-3', tagClasses[key] || 'bg-white/[0.06] text-white/50'].join(' ')}>
            {tag}
          </span>
        })}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-small leading-[14px] text-white/35">{note.time}</span>
        <button type="button" onClick={onAsk} className="min-h-11 px-2 text-small font-semibold leading-[14px] text-royal-purple">Ask SIA</button>
      </div>
    </Card>
  )
}

function DateSection({ title, notes, offset, onAsk }: { title: string; notes: typeof quickNotes.notes; offset: number; onAsk: () => void }) {
  return (
    <section className="mt-5">
      <div className="mb-3 px-1 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">{title}</div>
      <div className="space-y-3">
        {notes.map((note, index) => <NoteCard key={note.text} note={note} delay={offset + index * 80} onAsk={onAsk} />)}
      </div>
    </section>
  )
}

export default function QuickNotesScreen() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')
  const [draft, setDraft] = useState('')
  const [notes, setNotes] = useState(quickNotes.notes)
  const [notice, setNotice] = useState('')
  const filtered = notes.filter((note) => {
    const matchesQuery = note.text.toLowerCase().includes(query.toLowerCase())
    const matchesFilter = filter === 'All' || note.tags.some((tag) => tag.toLowerCase() === filter.toLowerCase())
    return matchesQuery && matchesFilter
  })
  const save = () => {
    if (!draft.trim()) return
    setNotes((items) => [{ text: draft.trim(), tags: ['Idea'], time: 'Just now' }, ...items])
    setDraft('')
    setNotice('Note saved')
  }

  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Quick notes" showBack />} activeTab="today" bottomAction={<QuickAddBar value={draft} onChange={setDraft} onSave={save} />}>
        <main className="px-4 pb-6 pt-4">
          <label className="flex h-11 items-center gap-3 rounded-md border border-white/10 bg-ink-brown-800 px-4 shadow-1 animate-fade-up">
            <Search size={16} className="shrink-0 text-white/40" strokeWidth={1.9} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search notes..." className="min-w-0 flex-1 truncate bg-transparent text-[15px] leading-5 text-white outline-none placeholder:text-white/40" />
          </label>

          {notice && <div className="mt-3 rounded-md bg-forest-green/10 px-3 py-2 text-caption text-forest-green" role="status">{notice}</div>}
          <FilterRow active={filter} onChange={setFilter} />
          <DateSection title="Today" notes={filtered.slice(0, 2)} offset={160} onAsk={() => setNotice('Opening SIA with note context')} />
          <DateSection title="Archive" notes={filtered.slice(2)} offset={320} onAsk={() => setNotice('Opening SIA with note context')} />
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
