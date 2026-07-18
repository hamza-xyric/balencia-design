'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { CheckCircle2, GitFork, ImageOff, Info, WifiOff } from 'lucide-react'
import {
  BtnSecondary,
  Chip,
  ConsentRail,
  GlassCard,
  HifiShell,
  Provenance,
  SafetyCard,
  SectionTitle,
  SolidCard,
  TopBar,
} from '@/components/hifi/kit'

// Stack-pushed retrospective companion to the Mission Board, opened from
// Mission Board, Life World, or Me quick links — no live route, no active
// tab, no tab bar. States (?state= fixture): default, skeleton, empty,
// filtered-empty, error (cached entries stay, Retry offered), offline
// (banner above cached entries). Filters actually filter the fixture
// entries; media renders as an honest private-media state (no raster).
type JournalState = 'default' | 'skeleton' | 'empty' | 'filtered-empty' | 'error' | 'offline'
type FilterTab = 'all' | 'domain' | 'type'
type DomainFilter = 'Finance' | 'Nutrition' | 'Fitness' | 'Sleep'
type TypeFilter = 'Completed' | 'Pivoted'
type PhotoId = 'week-2' | 'week-4'
type PhotoState = 'visible' | 'hidden' | 'deleted'

const JOURNAL_STATES: JournalState[] = ['default', 'skeleton', 'empty', 'filtered-empty', 'error', 'offline']
const FILTER_TABS: Array<{ id: FilterTab; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'domain', label: 'By domain' },
  { id: 'type', label: 'By type' },
]
const DOMAIN_FILTERS: DomainFilter[] = ['Finance', 'Nutrition', 'Fitness', 'Sleep']
const TYPE_FILTERS: TypeFilter[] = ['Completed', 'Pivoted']
const PHOTOS: Array<{ id: PhotoId; label: string }> = [
  { id: 'week-2', label: 'Week 2' },
  { id: 'week-4', label: 'Week 4' },
]

type Entry = {
  id: string
  month: string
  title: string
  type: TypeFilter
  metaLine: string
  body: string
  domain: Exclude<DomainFilter, 'Sleep'>
  domainClass: string
  provenance: string
  ciaNote?: string
  hasMedia?: boolean
}

const ENTRIES: Entry[] = [
  {
    id: 'emergency-fund',
    month: 'May 2026',
    title: 'Finished emergency fund',
    type: 'Completed',
    metaLine: '12 weeks · 1,200 XP',
    body: 'Twelve weeks of discipline. Your fund is real now.',
    domain: 'Finance',
    domainClass: 'border-domain-finance/25 bg-domain-finance/15 text-paper-100',
    provenance: 'Via rewards ledger',
    ciaNote: 'Consistent saves built momentum by week eight, ahead of the projected pace.',
  },
  {
    id: 'recipe-challenge',
    month: 'May 2026',
    title: 'Pivoted recipe challenge',
    type: 'Pivoted',
    metaLine: 'Partial XP retained',
    body: 'You explored eight recipes before life shifted focus.',
    domain: 'Nutrition',
    domainClass: 'border-domain-nutrition/25 bg-domain-nutrition/15 text-paper-100',
    provenance: 'Your archive note',
  },
  {
    id: 'mobility-reset',
    month: 'April 2026',
    title: '30-day mobility reset',
    type: 'Completed',
    metaLine: '4 weeks · 600 XP',
    body: '',
    domain: 'Fitness',
    domainClass: 'border-domain-fitness/25 bg-domain-fitness/15 text-paper-100',
    provenance: 'Via rewards ledger',
    hasMedia: true,
  },
]

export function S73MissionJournal() {
  const [screenState, setScreenState] = useState<JournalState>('default')
  const [filterTab, setFilterTab] = useState<FilterTab>('all')
  const [domainFilter, setDomainFilter] = useState<DomainFilter | null>(null)
  const [typeFilter, setTypeFilter] = useState<TypeFilter | null>(null)
  const [photoStates, setPhotoStates] = useState<Record<PhotoId, PhotoState>>({ 'week-2': 'visible', 'week-4': 'visible' })
  const [lastMediaAction, setLastMediaAction] = useState<{ id: PhotoId; label: string; verb: 'hidden' | 'deleted' } | null>(null)
  const [confirmPhoto, setConfirmPhoto] = useState<{ id: PhotoId; label: string } | null>(null)
  const [status, setStatus] = useState('Mission journal fixture ready. Entries, XP, and media states are local previews only.')
  const cancelRef = useRef<HTMLButtonElement>(null)
  const deleteRef = useRef<HTMLButtonElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)
  const mediaRegionRef = useRef<HTMLDivElement>(null)
  const mediaUndoRef = useRef<HTMLButtonElement>(null)
  const statusRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const fixture = new URLSearchParams(window.location.search).get('state') as JournalState | null
    if (!fixture || !JOURNAL_STATES.includes(fixture)) return
    const timer = window.setTimeout(() => {
      if (fixture === 'filtered-empty') {
        setFilterTab('domain')
        setDomainFilter('Sleep')
        setStatus('Filtered-empty fixture loaded. No Sleep entries exist in this journal preview.')
        return
      }
      setScreenState(fixture)
      setStatus(
        fixture === 'skeleton'
          ? 'Journal skeleton loading. Filters are disabled while your journey syncs.'
          : fixture === 'empty'
            ? 'Empty journal fixture loaded. Entries appear after you complete or pivot a mission.'
            : fixture === 'error'
              ? 'Journal sync failed in this fixture. Cached entries remain; no network request was made.'
              : fixture === 'offline'
                ? 'Offline — showing last synced journal entries. Media actions stay local.'
                : 'Default journal fixture loaded.',
      )
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  const focusSurvivingMediaTarget = () => {
    window.setTimeout(() => {
      if (mediaUndoRef.current?.isConnected) {
        mediaUndoRef.current.focus()
      } else if (mediaRegionRef.current?.isConnected) {
        mediaRegionRef.current.focus()
      } else {
        statusRef.current?.focus()
      }
    }, 0)
  }

  const restoreMediaOpenerOrFallback = useCallback(() => {
    window.setTimeout(() => {
      if (returnFocusRef.current?.isConnected) {
        returnFocusRef.current.focus()
      } else if (mediaUndoRef.current?.isConnected) {
        mediaUndoRef.current.focus()
      } else if (mediaRegionRef.current?.isConnected) {
        mediaRegionRef.current.focus()
      } else {
        statusRef.current?.focus()
      }
    }, 0)
  }, [])

  const closeConfirm = useCallback((message = 'Delete canceled. The photo tile is unchanged.') => {
    setConfirmPhoto(null)
    setStatus(message)
    restoreMediaOpenerOrFallback()
  }, [restoreMediaOpenerOrFallback])

  useEffect(() => {
    if (!confirmPhoto) return
    cancelRef.current?.focus()
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeConfirm()
        return
      }
      if (event.key !== 'Tab') return
      const first = cancelRef.current
      const last = deleteRef.current
      if (!first || !last) return
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [closeConfirm, confirmPhoto])

  const selectTab = (tab: FilterTab) => {
    setFilterTab(tab)
    setDomainFilter(null)
    setTypeFilter(null)
    setStatus(tab === 'all' ? 'Journal refreshed — showing all entries.' : `Filter group opened: ${tab === 'domain' ? 'by domain' : 'by type'}. Pick a chip to filter locally.`)
  }

  const hidePhoto = (photo: { id: PhotoId; label: string }) => {
    setPhotoStates(current => ({ ...current, [photo.id]: 'hidden' }))
    setLastMediaAction({ id: photo.id, label: photo.label, verb: 'hidden' })
    setStatus(`${photo.label} photo hidden from this journal card. Undo is available — nothing left this preview.`)
    focusSurvivingMediaTarget()
  }

  const requestDelete = (photo: { id: PhotoId; label: string }) => {
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    setConfirmPhoto(photo)
  }

  const confirmDelete = () => {
    if (!confirmPhoto) return
    setPhotoStates(current => ({ ...current, [confirmPhoto.id]: 'deleted' }))
    setLastMediaAction({ id: confirmPhoto.id, label: confirmPhoto.label, verb: 'deleted' })
    closeConfirm(`${confirmPhoto.label} photo deleted from this journal card in this preview. Undo is available; no stored media changed.`)
  }

  const undoMediaAction = () => {
    if (!lastMediaAction) return
    setPhotoStates(current => ({ ...current, [lastMediaAction.id]: 'visible' }))
    setStatus(`Undo applied — ${lastMediaAction.label} photo restored to this journal card.`)
    setLastMediaAction(null)
    window.setTimeout(() => mediaRegionRef.current?.focus(), 0)
  }

  const visibleEntries = ENTRIES.filter(entry => {
    if (filterTab === 'domain' && domainFilter) return entry.domain === domainFilter
    if (filterTab === 'type' && typeFilter) return entry.type === typeFilter
    return true
  })
  const months = ['May 2026', 'April 2026']
    .map(month => ({ month, entries: visibleEntries.filter(entry => entry.month === month) }))
    .filter(group => group.entries.length > 0)
  const activeFilterLabel = filterTab === 'domain' ? domainFilter : filterTab === 'type' ? typeFilter : null
  const filteredEmpty = screenState === 'default' && activeFilterLabel !== null && visibleEntries.length === 0
  const stateAttr: JournalState = filteredEmpty ? 'filtered-empty' : screenState
  const visiblePhotos = PHOTOS.filter(photo => photoStates[photo.id] === 'visible')
  const skeleton = screenState === 'skeleton'

  const renderEntry = (entry: Entry) => (
    <article key={entry.id} className="relative">
      <span
        className={`absolute -left-6 top-5 h-3 w-3 rounded-full border-2 border-ink-900 ${entry.type === 'Completed' ? 'bg-forest-green shadow-[var(--glow-green-sm)]' : 'bg-brand-orange'}`}
        aria-hidden="true"
      />
      <SolidCard>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-[16px] font-semibold leading-5 text-white">{entry.title}</h3>
            <p className="mt-1 text-[13px] tabular-nums text-white/50">{entry.metaLine}</p>
          </div>
          {entry.type === 'Completed' ? (
            <span className="flex shrink-0 items-center gap-1 rounded-pill bg-forest-green/15 px-2.5 py-1 text-[12px] font-semibold text-forest-green">
              <CheckCircle2 className="h-3 w-3" strokeWidth={2.2} />
              Completed
            </span>
          ) : (
            <span className="flex shrink-0 items-center gap-1 rounded-pill bg-brand-orange/15 px-2.5 py-1 text-[12px] font-semibold text-brand-orange">
              <GitFork className="h-3 w-3" strokeWidth={2.2} />
              Pivoted
            </span>
          )}
        </div>
        {entry.body && <p className="mt-3 text-[14px] leading-5 text-white/80">{entry.body}</p>}

        {entry.hasMedia && (
          <div ref={mediaRegionRef} tabIndex={-1} aria-label="Progress photos hidden in this preview" className="focus-ring mt-3 space-y-2 rounded-xl">
            {visiblePhotos.length > 0 ? (
              <>
                <p className="text-[12px] font-medium text-white/70">
                  {visiblePhotos.length} progress photo{visiblePhotos.length === 1 ? '' : 's'} &middot; hidden in this preview
                </p>
                <div className="flex gap-3">
                  {visiblePhotos.map(photo => (
                    <div key={photo.id} className="w-[136px]">
                      <div className="flex h-16 flex-col items-center justify-center gap-0.5 rounded-xl border border-dashed border-white/20 bg-white/[0.02]">
                        <ImageOff className="h-4 w-4 text-white/40" strokeWidth={1.8} aria-hidden="true" />
                        <span className="text-[12px] leading-4 text-white/55">Photo hidden &middot; private</span>
                      </div>
                      <p className="mt-1 text-center text-[12px] text-white/55">{photo.label}</p>
                      <div className="flex justify-center gap-1">
                        <button
                          type="button"
                          className="focus-ring flex min-h-11 items-center rounded-pill px-2.5 text-[12px] font-semibold text-white/70"
                          aria-label={`Hide ${photo.label} photo`}
                          onClick={() => hidePhoto(photo)}
                        >
                          Hide
                        </button>
                        <button
                          type="button"
                          className="focus-ring flex min-h-11 items-center rounded-pill px-2.5 text-[12px] font-semibold text-white/70"
                          aria-label={`Delete ${photo.label} photo`}
                          aria-haspopup="dialog"
                          onClick={() => requestDelete(photo)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-[12px] text-white/60">All progress photos removed from this card in this preview.</p>
            )}
            {lastMediaAction && (
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1">
                <span className="text-[12px] text-white/70">{lastMediaAction.label} photo {lastMediaAction.verb} &middot; local preview</span>
                <button
                  ref={mediaUndoRef}
                  type="button"
                  className="focus-ring flex min-h-11 items-center rounded-pill px-2.5 text-[13px] font-semibold text-brand-orange"
                  onClick={undoMediaAction}
                >
                  Undo
                </button>
              </div>
            )}
          </div>
        )}

        <div className="mt-3 flex items-center justify-between">
          <span className={`inline-flex items-center rounded-pill border px-3 py-1 text-[12px] font-semibold ${entry.domainClass}`}>{entry.domain}</span>
          <div className="[&_span]:!text-[12px]">
            <Provenance items={[entry.provenance]} />
          </div>
        </div>
        {entry.ciaNote && (
          <div className="mt-3 flex items-start gap-2 border-t border-white/[0.06] pt-3">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-royal-purple" aria-hidden="true" />
            <p className="text-[12px] leading-4 text-white/55">
              <span className="font-semibold text-paper-100/80">CIA</span> &middot; {entry.ciaNote}
            </p>
          </div>
        )}
      </SolidCard>
    </article>
  )

  return (
    <HifiShell
      header={<TopBar title={<>Mission <span className="text-emphasis">journal</span></>} />}
      showTabBar={false}
    >
      <main className="space-y-5 px-4 pb-8 pt-3" data-journal-state={stateAttr} aria-busy={skeleton}>
        {screenState === 'offline' && (
          <div className="flex items-start gap-2 rounded-xl border border-white/10 bg-surface-2 px-3 py-2 text-[12px] leading-4 text-paper-100/70">
            <WifiOff aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
            offline — showing last synced data
          </div>
        )}
        {screenState === 'error' && (
          <SolidCard className="flex items-start gap-3">
            <Info aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-semibold text-white">Journal sync failed &middot; missions ledger</p>
              <p className="mt-1 text-[12px] leading-4 text-white/60">Showing cached entries from your last sync. Nothing was lost.</p>
              <BtnSecondary className="mt-3" onClick={() => setStatus('Retry preview selected. No network request was made in this prototype.')}>
                Retry
              </BtnSecondary>
            </div>
          </SolidCard>
        )}

        {screenState !== 'empty' && (
          <div>
            <div role="group" aria-label="Filter journal entries" className="-mx-1 flex gap-1.5 overflow-x-auto px-1">
              {FILTER_TABS.map(tab => (
                <button
                  key={tab.id}
                  id={`journal-tab-${tab.id}`}
                  type="button"
                  aria-pressed={filterTab === tab.id}
                  disabled={skeleton}
                  aria-describedby={skeleton ? 'journal-filters-locked' : undefined}
                  className={`focus-ring flex h-11 shrink-0 items-center justify-center rounded-pill px-4 text-[13px] disabled:opacity-40 ${filterTab === tab.id ? 'bg-white/10 font-semibold text-white' : 'font-medium text-paper-100/70'}`}
                  onClick={() => selectTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            {skeleton && <p id="journal-filters-locked" className="mt-1 px-1 text-[12px] text-white/55">Syncing your journey — filters are disabled while the journal loads.</p>}
            {!skeleton && filterTab === 'domain' && (
              <div className="mt-2 flex flex-wrap gap-2 px-1" role="group" aria-label="Filter by domain">
                {DOMAIN_FILTERS.map(domain => (
                  <Chip
                    key={domain}
                    interactive
                    pressed={domainFilter === domain}
                    className="!text-[12px]"
                    onClick={() => {
                      const next = domainFilter === domain ? null : domain
                      setDomainFilter(next)
                      const count = next ? ENTRIES.filter(entry => entry.domain === next).length : ENTRIES.length
                      setStatus(next ? `Journal filtered to ${next} · ${count} ${count === 1 ? 'entry' : 'entries'}.` : 'Domain filter cleared — showing all entries.')
                    }}
                  >
                    {domain}
                  </Chip>
                ))}
              </div>
            )}
            {!skeleton && filterTab === 'type' && (
              <div className="mt-2 flex flex-wrap gap-2 px-1" role="group" aria-label="Filter by entry type">
                {TYPE_FILTERS.map(type => (
                  <Chip
                    key={type}
                    interactive
                    pressed={typeFilter === type}
                    className="!text-[12px]"
                    onClick={() => {
                      const next = typeFilter === type ? null : type
                      setTypeFilter(next)
                      const count = next ? ENTRIES.filter(entry => entry.type === next).length : ENTRIES.length
                      setStatus(next ? `Journal filtered to ${next.toLowerCase()} entries · ${count} shown.` : 'Type filter cleared — showing all entries.')
                    }}
                  >
                    {type}
                  </Chip>
                ))}
              </div>
            )}
          </div>
        )}

        {skeleton ? (
          <div className="space-y-3" aria-label="Loading mission journal">
            <div className="skeleton-block h-24 rounded-[22px]" />
            <div className="skeleton-block h-5 w-28 rounded" />
            <div className="relative space-y-4 pl-6">
              <span className="absolute bottom-2 left-[7px] top-2 w-px bg-white/10" aria-hidden="true" />
              <div className="skeleton-block h-36 rounded-[18px]" />
              <div className="skeleton-block h-28 rounded-[18px]" />
            </div>
          </div>
        ) : screenState === 'empty' ? (
          <GlassCard tone="muted" className="px-5 py-10 text-center">
            <h2 className="text-[17px] font-semibold text-white">No journal entries yet</h2>
            <p className="mx-auto mt-2 max-w-[260px] text-[13px] leading-5 text-white/65">
              Complete or pivot a mission and it appears here with its duration, XP, and your notes — your story, kept honestly.
            </p>
          </GlassCard>
        ) : (
          <>
            <GlassCard tone="you">
              <p className="text-[12px] font-semibold uppercase tracking-wide text-paper-100/70">All-time journey</p>
              <div className="mt-2 flex items-end justify-between">
                <div>
                  <span className="text-[28px] font-semibold leading-8 tabular-nums text-white">18</span>
                  <span className="ml-2 text-[13px] text-white/55">Completed</span>
                </div>
                <div className="text-right">
                  <span className="text-[19px] font-semibold tabular-nums text-white">8,420</span>
                  <span className="ml-1.5 text-[12px] text-paper-100/70">XP</span>
                </div>
                <div className="text-right">
                  <span className="text-[19px] font-semibold tabular-nums text-white">4</span>
                  <span className="ml-1.5 text-[12px] text-paper-100/70">Pivots</span>
                </div>
              </div>
              <div className="mt-3 [&_span]:!text-[12px]">
                <Provenance items={['Completed + pivots · via missions ledger', 'XP · via rewards ledger']} />
              </div>
            </GlassCard>

            {filteredEmpty ? (
              <SolidCard className="px-5 py-8 text-center">
                <p className="text-[15px] font-semibold text-white">No {activeFilterLabel?.toLowerCase()} entries yet</p>
                <p className="mx-auto mt-2 max-w-[250px] text-[13px] leading-5 text-white/60">
                  Nothing in your journal matches this filter. Missions you complete or pivot here will build this view.
                </p>
                <BtnSecondary
                  className="mt-4"
                  onClick={() => {
                    setDomainFilter(null)
                    setTypeFilter(null)
                    setStatus('Filter cleared — showing all journal entries.')
                  }}
                >
                  Clear filter
                </BtnSecondary>
              </SolidCard>
            ) : (
              months.map(group => (
                <section key={group.month} className="space-y-3">
                  <SectionTitle title={group.month} meta={`${group.entries.length} ${group.entries.length === 1 ? 'entry' : 'entries'}`} />
                  <div className="relative space-y-4 pl-6">
                    <span className="absolute bottom-2 left-[7px] top-2 w-px bg-white/10" aria-hidden="true" />
                    {group.entries.map(renderEntry)}
                  </div>
                </section>
              ))
            )}
          </>
        )}

        {!skeleton && (
          <>
            <SafetyCard />
            <div className="space-y-3 pt-1">
              <p className="text-center text-[12px] leading-4 text-white/60">
                Journal photos are hidden in this prototype. Product storage and sync are not represented in this local preview; use the data controls below to review retention, export, and revoke choices.
              </p>
              <div className="flex justify-center [&_a]:!text-[12px]">
                <ConsentRail compact />
              </div>
            </div>
          </>
        )}

        <p ref={statusRef} tabIndex={-1} className="min-h-5 text-[12px] leading-5 text-paper-100/70" role="status" aria-live="polite" aria-atomic="true">{status}</p>

        {confirmPhoto && (
          <div
            className="absolute inset-0 z-50 flex items-end bg-ink-900/75 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="journal-delete-title"
            aria-describedby="journal-delete-desc"
          >
            <div className="w-full rounded-[24px] border border-white/10 bg-ink-brown-800 p-4 shadow-2xl">
              <h2 id="journal-delete-title" className="text-[17px] font-semibold text-paper-100">Delete {confirmPhoto.label.toLowerCase()} photo?</h2>
              <p id="journal-delete-desc" className="mt-2 text-[12px] leading-5 text-paper-100/70">
                This removes the {confirmPhoto.label.toLowerCase()} photo tile from this journal card. Local preview only — no stored media or account state
                changes, and undo is available after deleting.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  ref={cancelRef}
                  type="button"
                  className="focus-ring hifi-action glass-pill h-12 w-full px-5 text-[15px] font-medium text-paper-100"
                  onClick={() => closeConfirm()}
                >
                  Cancel
                </button>
                <button
                  ref={deleteRef}
                  type="button"
                  className="focus-ring hifi-action hifi-action-danger h-12 w-full rounded-pill px-5 text-[15px] font-semibold"
                  onClick={confirmDelete}
                >
                  Delete photo
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </HifiShell>
  )
}
