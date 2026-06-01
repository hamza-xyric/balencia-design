'use client'

import { useMemo, useState } from 'react'
import { MessageCircle, Pencil, Search as SearchIcon } from 'lucide-react'
import { Button } from '@/components/design-system/Button'
import { Card } from '@/components/design-system/Card'
import { SearchBar } from '@/components/design-system/SearchBar'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { wikiChapters, wikiEntries, type WikiEntry } from '@/data/mock'

// Screen 20 of 78: Personal wiki / SIA memory
// Spec: /Users/hamza/yHealth/app_design 3/20-personal-wiki-sia-memory.md

const confidenceClasses: Record<NonNullable<WikiEntry['confidence']>, string> = {
  high: 'bg-forest-green/15 text-forest-green',
  medium: 'bg-brand-orange/15 text-brand-orange',
  low: 'bg-white/10 text-white/40',
}

function getChapterLabel(chapterId: string) {
  return wikiChapters.find((chapter) => chapter.id === chapterId)?.label ?? 'Memory'
}

function ChapterTabs({
  activeChapter,
  searchActive,
  chapterCounts,
  onChapterChange,
}: {
  activeChapter: string
  searchActive: boolean
  chapterCounts: Record<string, number>
  onChapterChange: (chapter: string) => void
}) {
  return (
    <div className="overflow-x-auto px-4 pb-3 hide-scrollbar">
      <div className="flex gap-2" role="tablist" aria-label="Book of life chapters">
        {wikiChapters.map((chapter) => {
          const active = !searchActive && chapter.id === activeChapter
          return (
            <button
              key={chapter.id}
              type="button"
              onClick={() => onChapterChange(chapter.id)}
              className={[
                'min-h-11 shrink-0 rounded-pill border px-3 text-[13px] leading-[18px]',
                active
                  ? 'border-brand-orange bg-brand-orange font-semibold text-white'
                  : 'border-white/10 bg-transparent text-white/50',
                searchActive ? 'opacity-60' : '',
              ].join(' ')}
              role="tab"
              aria-selected={active}
              aria-disabled={searchActive}
            >
              {chapter.label} <span className={active ? 'text-white/60' : 'text-white/30'}>({chapterCounts[chapter.id] ?? 0})</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function SourceRow({ entry }: { entry: WikiEntry }) {
  const sourceMap = {
    conversation: { Icon: MessageCircle, label: 'From conversation' },
    data: { Icon: SearchIcon, label: 'Detected from data' },
    edited: { Icon: Pencil, label: 'Edited by you' },
  } as const
  const source = sourceMap[entry.source]
  const Icon = source.Icon

  return (
    <div className="mt-3 flex items-center gap-1.5 text-[12px] leading-4 text-white/40">
      <Icon size={12} strokeWidth={1.8} />
      <span>{source.label} - {entry.date}</span>
    </div>
  )
}

function EntryCard({
  entry,
  index,
  onEdit,
  onWrong,
  editing,
  draftTitle,
  draftContent,
  searchActive,
  onDraftTitleChange,
  onDraftContentChange,
  onSave,
  onCancel,
  onDelete,
}: {
  entry: WikiEntry
  index: number
  onEdit: (entry: WikiEntry) => void
  onWrong: (entry: WikiEntry) => void
  editing: boolean
  draftTitle: string
  draftContent: string
  searchActive: boolean
  onDraftTitleChange: (value: string) => void
  onDraftContentChange: (value: string) => void
  onSave: () => void
  onCancel: () => void
  onDelete: (entry: WikiEntry) => void
}) {
  const [expanded, setExpanded] = useState(false)

  if (editing) {
    return (
      <Card
        variant="small"
        className="border-brand-orange/30 animate-fade-up"
        style={{ animationDelay: `${220 + index * 60}ms` }}
      >
        <label className="block text-[12px] font-semibold uppercase leading-4 tracking-[0.12em] text-white/40" htmlFor={`memory-title-${entry.id}`}>
          Title
        </label>
        <input
          id={`memory-title-${entry.id}`}
          value={draftTitle}
          onChange={(event) => onDraftTitleChange(event.currentTarget.value)}
          className="mt-2 h-11 w-full rounded-md border border-brand-orange/25 bg-ink-900 px-3 text-[15px] font-semibold leading-5 text-white outline-none focus:border-brand-orange"
        />
        <label className="mt-4 block text-[12px] font-semibold uppercase leading-4 tracking-[0.12em] text-white/40" htmlFor={`memory-content-${entry.id}`}>
          Memory
        </label>
        <textarea
          id={`memory-content-${entry.id}`}
          value={draftContent}
          onChange={(event) => onDraftContentChange(event.currentTarget.value)}
          className="mt-2 min-h-[104px] w-full rounded-md border border-brand-orange/25 bg-ink-900 p-3 text-[14px] leading-5 text-white outline-none focus:border-brand-orange"
        />
        <SourceRow entry={entry} />
        <div className="mt-4 flex flex-wrap items-center gap-2 text-[13px] font-semibold leading-[18px]">
          <button type="button" onClick={onSave} disabled={draftTitle.trim().length < 2 || draftContent.trim().length < 4} className="min-h-11 rounded-pill px-3 text-brand-orange disabled:opacity-40">Save</button>
          <span className="text-white/15" aria-hidden="true">|</span>
          <button type="button" onClick={onCancel} className="min-h-11 rounded-pill px-3 text-white/50">Cancel</button>
          <span className="text-white/15" aria-hidden="true">|</span>
          <button type="button" onClick={() => onDelete(entry)} className="min-h-11 rounded-pill px-3 text-error-red">Delete</button>
        </div>
      </Card>
    )
  }

  return (
    <Card
      variant="small"
      className="animate-fade-up"
      style={{ animationDelay: `${220 + index * 60}ms` }}
    >
      <div className="flex items-start gap-3">
        <h2 className="min-w-0 flex-1 truncate text-[15px] font-semibold leading-5 text-white">
          {entry.title}
        </h2>
        {entry.confidence && (
          <span className={`shrink-0 rounded-pill px-2.5 py-1 text-[10px] font-semibold leading-[14px] ${confidenceClasses[entry.confidence]}`}>
            {entry.confidence} confidence
          </span>
        )}
        {searchActive && (
          <span className="shrink-0 rounded-pill bg-white/10 px-2.5 py-1 text-[10px] font-semibold leading-[14px] text-white/45">
            {getChapterLabel(entry.chapter)}
          </span>
        )}
      </div>

      <p className={['mt-1 text-[14px] leading-[18px] text-white/70', expanded ? '' : 'line-clamp-3'].join(' ')}>
        {entry.content}
      </p>
      {entry.content.length > 72 && (
        <button type="button" onClick={() => setExpanded((current) => !current)} className="mt-1 min-h-11 text-[13px] font-semibold leading-[18px] text-brand-orange">
          {expanded ? 'Show less' : 'Show more'}
        </button>
      )}

      <SourceRow entry={entry} />

      <div className="mt-4 flex items-center gap-2 text-[13px] font-semibold leading-[18px]">
        <button type="button" onClick={() => onEdit(entry)} className="min-h-11 min-w-11 px-1 text-white/50">Edit</button>
        <span className="text-white/15" aria-hidden="true">|</span>
        <button type="button" onClick={() => onWrong(entry)} className="min-h-11 px-1 text-error-red">This is wrong</button>
      </div>
    </Card>
  )
}

export default function PersonalWikiScreen() {
  const [activeChapter, setActiveChapter] = useState('patterns')
  const [query, setQuery] = useState('')
  const [entries, setEntries] = useState(wikiEntries)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draftTitle, setDraftTitle] = useState('')
  const [draftContent, setDraftContent] = useState('')
  const [reviewing, setReviewing] = useState<WikiEntry | null>(null)
  const [deleting, setDeleting] = useState<WikiEntry | null>(null)
  const normalizedQuery = query.trim().toLowerCase()
  const searchActive = normalizedQuery.length > 0
  const chapterCounts = useMemo(() => {
    return wikiChapters.reduce<Record<string, number>>((counts, chapter) => {
      counts[chapter.id] = entries.filter((entry) => entry.chapter === chapter.id).length
      return counts
    }, {})
  }, [entries])
  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => {
      const searchMatch = !normalizedQuery || `${entry.title} ${entry.content} ${getChapterLabel(entry.chapter)}`.toLowerCase().includes(normalizedQuery)
      return searchActive ? searchMatch : entry.chapter === activeChapter
    })
  }, [activeChapter, entries, normalizedQuery, searchActive])

  const startEdit = (entry: WikiEntry) => {
    setEditingId(entry.id)
    setDraftTitle(entry.title)
    setDraftContent(entry.content)
  }

  const saveEdit = () => {
    if (!editingId) return
    setEntries((current) => current.map((entry) => (
      entry.id === editingId ? { ...entry, title: draftTitle.trim(), content: draftContent.trim(), source: 'edited', date: 'Today' } : entry
    )))
    setEditingId(null)
    setDraftTitle('')
    setDraftContent('')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setDraftTitle('')
    setDraftContent('')
  }

  const removeEntry = (entry: WikiEntry) => {
    setEntries((current) => current.filter((item) => item.id !== entry.id))
    if (editingId === entry.id) {
      cancelEdit()
    }
    setReviewing(null)
    setDeleting(null)
  }

  const editReviewedEntry = () => {
    if (!reviewing) return
    startEdit(reviewing)
    setReviewing(null)
  }

  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Book of life" showBack fallbackHref="/tabs/me" />} activeTab="me">
        <main className="pb-16 pt-3">
          <div className="px-4 animate-fade-up">
            <SearchBar
              placeholder="Search memories..."
              value={query}
              onValueChange={setQuery}
              onClear={() => setQuery('')}
              inputLabel="Search Book of life memories"
            />
          </div>

          <div className="mt-3 animate-fade-up" style={{ animationDelay: '80ms' }}>
            <ChapterTabs activeChapter={activeChapter} searchActive={searchActive} chapterCounts={chapterCounts} onChapterChange={setActiveChapter} />
          </div>

          <div className="px-4">
            <div className="border-t border-white/[0.08] pt-4">
              <p className="text-[12px] leading-4 text-white/40 animate-fade-up" style={{ animationDelay: '140ms' }}>
                {searchActive
                  ? `${filteredEntries.length} results across the book of life.`
                  : `${filteredEntries.length} entries - last updated today.`}{' '}
                You can edit, delete, or ask SIA to stop using a memory at any time.
              </p>

              <section className="mt-4 space-y-3" aria-live="polite">
                {filteredEntries.length > 0 ? filteredEntries.map((entry, index) => (
                  <EntryCard
                    key={entry.id}
                    entry={entry}
                    index={index}
                    onEdit={startEdit}
                    onWrong={setReviewing}
                    editing={editingId === entry.id}
                    draftTitle={draftTitle}
                    draftContent={draftContent}
                    searchActive={searchActive}
                    onDraftTitleChange={setDraftTitle}
                    onDraftContentChange={setDraftContent}
                    onSave={saveEdit}
                    onCancel={cancelEdit}
                    onDelete={setDeleting}
                  />
                )) : (
                  <Card variant="small" className="text-[14px] leading-5 text-white/55">
                    No memories found here. Search another phrase or choose a different chapter.
                  </Card>
                )}
              </section>
            </div>
          </div>
        </main>
        {reviewing && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 px-4 pb-4" role="dialog" aria-modal="true" aria-label="Review memory">
            <div className="w-full max-w-[390px] rounded-t-xl border border-white/10 bg-ink-900 p-5 shadow-2">
              <h2 className="text-[18px] font-semibold leading-6 text-white">Is this information wrong?</h2>
              <p className="mt-2 text-[14px] leading-5 text-white/60">
                SIA will stop using &ldquo;{reviewing.title}&rdquo; immediately if you remove it. You can also keep it and edit the wording directly.
              </p>
              <div className="mt-5 space-y-3">
                <Button fullWidth className="bg-error-red hover:bg-error-red" onClick={() => removeEntry(reviewing)}>Yes, remove it</Button>
                <Button fullWidth variant="ghost" onClick={editReviewedEntry}>Edit instead</Button>
                <Button fullWidth variant="skip" onClick={() => setReviewing(null)}>Cancel</Button>
              </div>
            </div>
          </div>
        )}
        {deleting && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 px-4 pb-4" role="dialog" aria-modal="true" aria-label="Delete memory confirmation">
            <div className="w-full max-w-[390px] rounded-t-xl border border-white/10 bg-ink-900 p-5 shadow-2">
              <h2 className="text-[18px] font-semibold leading-6 text-white">Delete this entry?</h2>
              <p className="mt-2 text-[14px] leading-5 text-white/60">
                This removes &ldquo;{deleting.title}&rdquo; from SIA memory for this prototype session.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <Button variant="ghost" onClick={() => setDeleting(null)}>Cancel</Button>
                <Button variant="skip" className="text-error-red" onClick={() => removeEntry(deleting)}>Delete</Button>
              </div>
            </div>
          </div>
        )}
      </ScreenShell>
    </PhoneFrame>
  )
}
