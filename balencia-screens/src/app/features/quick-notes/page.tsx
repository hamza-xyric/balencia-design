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

function FilterRow() {
  return (
    <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1 hide-scrollbar animate-fade-up" style={{ animationDelay: '80ms' }}>
      {quickNotes.filters.map((filter, index) => (
        <Chip key={filter} selected={index === 0}>{filter}</Chip>
      ))}
    </div>
  )
}

function QuickAddBar({ className = '' }: { className?: string }) {
  return (
    <div className={['flex h-[52px] items-center gap-2 rounded-lg border border-white/10 bg-ink-brown-800 px-3 shadow-1', className].join(' ')}>
      <span className="min-w-0 flex-1 truncate text-[15px] leading-5 text-white/40">What is on your mind...</span>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-orange text-white">
        <ArrowUp size={17} strokeWidth={2.4} />
      </span>
    </div>
  )
}

function NoteCard({ note, delay }: { note: (typeof quickNotes.notes)[number]; delay: number }) {
  return (
    <Card variant="small" className="rounded-xl p-4 animate-fade-up" style={{ animationDelay: `${delay}ms` }}>
      <p className="text-[15px] leading-[22px] text-white/85">{note.text}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {note.tags.map((tag) => (
          <span key={tag} className={['rounded-sm px-2 py-1 text-small font-semibold leading-3', tagClasses[tag] || 'bg-white/[0.06] text-white/50'].join(' ')}>
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-small leading-[14px] text-white/35">{note.time}</span>
        <button type="button" className="text-small font-semibold leading-[14px] text-royal-purple">Ask SIA</button>
      </div>
    </Card>
  )
}

function DateSection({ title, notes, offset }: { title: string; notes: typeof quickNotes.notes; offset: number }) {
  return (
    <section className="mt-5">
      <div className="mb-3 px-1 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">{title}</div>
      <div className="space-y-3">
        {notes.map((note, index) => <NoteCard key={note.text} note={note} delay={offset + index * 80} />)}
      </div>
    </section>
  )
}

export default function QuickNotesScreen() {
  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Quick notes" showBack />} activeTab="today" bottomAction={<QuickAddBar />}>
        <main className="px-4 pb-6 pt-4">
          <div className="flex h-11 items-center gap-3 rounded-md border border-white/10 bg-ink-brown-800 px-4 shadow-1 animate-fade-up">
            <Search size={16} className="shrink-0 text-white/40" strokeWidth={1.9} />
            <span className="min-w-0 flex-1 truncate text-[15px] leading-5 text-white/40">Search notes...</span>
          </div>

          <FilterRow />
          <DateSection title="Today" notes={quickNotes.notes.slice(0, 2)} offset={160} />
          <DateSection title="Yesterday" notes={quickNotes.notes.slice(2)} offset={320} />
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
