'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState, type ChangeEvent, type KeyboardEvent, type MutableRefObject } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  AlertTriangle,
  Check,
  Footprints,
  History,
  RefreshCw,
  Salad,
  Search,
  Target,
  Trash2,
  WifiOff,
  X,
} from 'lucide-react'
import { BtnCoach, BtnGhost, CIAInsightCard, Chip, HifiShell, SectionTitle, cx } from '@/components/hifi/kit'

type SearchState = 'default' | 'first-use' | 'results' | 'loading' | 'zero-results' | 'error' | 'offline'
type SearchCategory = 'all' | 'missions' | 'habits' | 'recipes'
type SearchPanel = 'closed' | 'result'
type HistoryState = 'present' | 'deleted'
type CiaSuggestionState = 'visible' | 'dismissed'

type SearchResult = {
  id: string
  category: Exclude<SearchCategory, 'all'>
  title: string
  domain: 'Fitness' | 'Nutrition'
  domainClass: string
  metric: string
  provenance: string
  confidence: 'real' | 'low-confidence' | 'honest-null'
  icon: LucideIcon
  href: string
}

const SEARCH_STATES: SearchState[] = ['default', 'first-use', 'results', 'loading', 'zero-results', 'error', 'offline']
const SEARCH_CATEGORIES: SearchCategory[] = ['all', 'missions', 'habits', 'recipes']
const SEARCH_PANELS: SearchPanel[] = ['closed', 'result']
const DATA_CONTROLS = ['Category', 'Source', 'Scope', 'Freshness', 'Retention', 'Export', 'Revoke', 'Delete'] as const

const SEARCH_RESULTS: SearchResult[] = [
  {
    id: 'run-5k',
    category: 'missions',
    title: 'Run a 5k',
    domain: 'Fitness',
    domainClass: 'border-domain-fitness/35 bg-domain-fitness/15 text-paper-100',
    metric: '60% progress',
    provenance: 'Via Missions',
    confidence: 'real',
    icon: Target,
    href: '/screens/14',
  },
  {
    id: 'morning-run-prep',
    category: 'habits',
    title: 'Morning run prep',
    domain: 'Fitness',
    domainClass: 'border-domain-fitness/35 bg-domain-fitness/15 text-paper-100',
    metric: '~4-day rhythm',
    provenance: 'Estimated · low confidence',
    confidence: 'low-confidence',
    icon: Footprints,
    href: '/screens/38',
  },
  {
    id: 'post-run-stretch',
    category: 'habits',
    title: 'Post-run stretch',
    domain: 'Fitness',
    domainClass: 'border-domain-fitness/35 bg-domain-fitness/15 text-paper-100',
    metric: 'Not enough data yet',
    provenance: 'No data yet',
    confidence: 'honest-null',
    icon: Footprints,
    href: '/screens/38',
  },
  {
    id: 'post-run-bowl',
    category: 'recipes',
    title: 'Post-run bowl',
    domain: 'Nutrition',
    domainClass: 'border-domain-nutrition/35 bg-domain-nutrition/15 text-paper-100',
    metric: '450 cal',
    provenance: 'Via saved recipes',
    confidence: 'real',
    icon: Salad,
    href: '/screens/56',
  },
]

const CATEGORY_LABELS: Record<SearchCategory, string> = {
  all: 'All',
  missions: 'Missions',
  habits: 'Habits',
  recipes: 'Recipes',
}

function resultsMatchingQuery(query: string, source: readonly SearchResult[] = SEARCH_RESULTS) {
  const normalizedQuery = query.trim().toLowerCase()
  const bundledAliases: Record<string, readonly string[]> = {
    'morning routine': ['morning-run-prep'],
    'healthy lunch': ['post-run-bowl'],
  }
  const aliasedIds = bundledAliases[normalizedQuery]
  if (aliasedIds) return source.filter(result => aliasedIds.includes(result.id))
  const terms = normalizedQuery.split(/\s+/).filter(Boolean)
  if (terms.length === 0) return []
  return source.filter(result => {
    const haystack = [
      result.title,
      result.domain,
      CATEGORY_LABELS[result.category],
      result.category,
      result.provenance,
    ].join(' ').toLowerCase()
    return terms.every(term => haystack.includes(term))
  })
}

const STATE_STATUS: Record<SearchState, string> = {
  default: 'Search is ready. Recent local queries are available and no result rows are shown.',
  'first-use': 'Search is ready for first use. Suggestions are available and no search history exists.',
  results: 'Four bundled results are available for run.',
  loading: 'Searching the bundled local fixture. No network request is running.',
  'zero-results': 'No bundled results match yoga mat.',
  error: 'Some results may be missing. Three local fallback rows remain available and no request failed.',
  offline: 'Offline preview. Three local rows are available; recipes and Community are omitted.',
}

function SearchResultDialog({
  result,
  onClose,
  returnFocusRef,
}: {
  result: SearchResult
  onClose: () => void
  returnFocusRef: MutableRefObject<HTMLElement | null>
}) {
  const dialogRef = useRef<HTMLElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const returnFocus = returnFocusRef.current
    const frame = window.requestAnimationFrame(() => closeRef.current?.focus())
    return () => {
      window.cancelAnimationFrame(frame)
      window.requestAnimationFrame(() => returnFocus?.isConnected && returnFocus.focus())
    }
  }, [returnFocusRef])

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
      return
    }
    if (event.key !== 'Tab') return
    const focusable = [...(dialogRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled), a[href]') ?? [])]
    if (!focusable.length) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <div className="absolute inset-0 z-[70] flex items-end bg-ink-900/85 p-4" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) onClose() }}>
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-result-title"
        aria-describedby="search-result-description"
        className="action-sheet-surface glass-card w-full p-5 shadow-3"
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-paper-100/70">Local result preview</p>
            <h2 id="search-result-title" className="mt-1 text-[18px] font-semibold leading-6 text-paper-100">{result.title}</h2>
          </div>
          <button ref={closeRef} type="button" className="focus-ring flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-paper-100/75" aria-label="Close result preview" onClick={onClose}>
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
        <p id="search-result-description" className="mt-3 text-[13px] leading-5 text-paper-100/75">
          This bundled preview shows where the result would open. No search request, history write, or external navigation occurred.
        </p>
        <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] p-3">
          <p className="text-[13px] font-medium text-paper-100">{result.metric}</p>
          <p className="mt-1 text-[12px] leading-4 text-paper-100/70">{result.provenance}</p>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button type="button" className="focus-ring glass-pill min-h-12 px-3 text-[13px] font-medium text-paper-100" onClick={onClose}>Stay in search</button>
          <Link href={result.href} className="focus-ring glass-pill flex min-h-12 items-center justify-center px-3 text-center text-[13px] font-semibold text-paper-100">Open screen</Link>
        </div>
      </section>
    </div>
  )
}

function ResultRow({ result, onOpen }: { result: SearchResult; onOpen: (result: SearchResult, trigger: HTMLButtonElement) => void }) {
  const Icon = result.icon
  return (
    <button
      type="button"
      data-search-result={result.id}
      data-result-category={result.category}
      data-result-confidence={result.confidence}
      className="focus-ring flex min-h-[72px] w-full items-center gap-3 rounded-xl px-4 py-3 text-left"
      aria-label={`${result.title}. ${result.domain}. ${result.metric}. ${result.provenance}. Open local preview.`}
      onClick={event => onOpen(result, event.currentTarget)}
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-paper-100/70" aria-hidden="true">
        <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="text-[15px] font-medium leading-5 text-paper-100">{result.title}</span>
          <span className={cx('inline-flex min-h-6 items-center rounded-pill border px-2.5 text-[12px] font-semibold', result.domainClass)}>{result.domain}</span>
        </span>
        <span className="mt-1.5 flex flex-wrap items-center gap-2">
          <span className={cx('text-[12px] leading-4 text-paper-100/75', result.confidence === 'low-confidence' && 'opacity-70')}>{result.metric}</span>
          <Chip className="!min-h-6 !px-2.5 !text-[12px]">{result.provenance}</Chip>
        </span>
      </span>
    </button>
  )
}

function SkeletonRows() {
  return (
    <div className="surface-warm divide-y divide-white/[0.06] overflow-hidden" aria-label="Four local search results are loading">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="flex min-h-[72px] items-center gap-3 px-4 py-3">
          <span className="skeleton-block h-11 w-11 shrink-0 rounded-full" />
          <span className="min-w-0 flex-1 space-y-2">
            <span className="skeleton-block block h-3.5 w-1/2" />
            <span className="skeleton-block block h-3 w-3/4" />
          </span>
        </div>
      ))}
    </div>
  )
}

export function S68UniversalSearch() {
  const [searchState, setSearchState] = useState<SearchState>('default')
  const [selectedCategory, setSelectedCategory] = useState<SearchCategory>('all')
  const [panel, setPanel] = useState<SearchPanel>('closed')
  const [historyState, setHistoryState] = useState<HistoryState>('present')
  const [ciaSuggestion, setCiaSuggestion] = useState<CiaSuggestionState>('visible')
  const [query, setQuery] = useState('')
  const [selectedResult, setSelectedResult] = useState<SearchResult>(SEARCH_RESULTS[0])
  const [selectedControl, setSelectedControl] = useState<(typeof DATA_CONTROLS)[number] | null>(null)
  const [status, setStatus] = useState(STATE_STATUS.default)
  const inputRef = useRef<HTMLInputElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)
  const debounceRef = useRef<number | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const requestedState = params.get('state') as SearchState | null
    const requestedCategory = (params.get('category') ?? params.get('filter')) as SearchCategory | null
    const requestedPanel = params.get('panel') as SearchPanel | null
    const requestedHistory = params.get('history')
    const requestedCia = params.get('cia') ?? params.get('suggestion')
    const requestedQuery = params.get('query')
    const requestedResult = params.get('result')

    const frame = window.requestAnimationFrame(() => {
      const nextState = requestedState && SEARCH_STATES.includes(requestedState) ? requestedState : 'default'
      setSearchState(nextState)
      setStatus(STATE_STATUS[nextState])
      if (requestedCategory && SEARCH_CATEGORIES.includes(requestedCategory)) setSelectedCategory(requestedCategory)
      if (requestedPanel && SEARCH_PANELS.includes(requestedPanel)) setPanel(requestedPanel)
      if (requestedHistory === 'deleted' || nextState === 'first-use') setHistoryState('deleted')
      if (requestedCia === 'dismissed') setCiaSuggestion('dismissed')
      const fixtureQuery = requestedQuery ?? (
        nextState === 'results' || nextState === 'error' || nextState === 'offline' ? 'run'
          : nextState === 'loading' ? 'morning'
            : nextState === 'zero-results' ? 'yoga mat'
              : ''
      )
      setQuery(fixtureQuery)
      const fixtureResult = SEARCH_RESULTS.find(result => result.id === requestedResult)
      if (fixtureResult) setSelectedResult(fixtureResult)
    })

    return () => {
      window.cancelAnimationFrame(frame)
      if (debounceRef.current !== null) window.clearTimeout(debounceRef.current)
    }
  }, [])

  const isFallbackState = searchState === 'error' || searchState === 'offline'
  const showsResults = searchState === 'results' || isFallbackState
  const availableResults = useMemo(() => {
    if (!showsResults) return []
    const source = isFallbackState ? SEARCH_RESULTS.filter(result => result.category !== 'recipes') : SEARCH_RESULTS
    const queryMatches = resultsMatchingQuery(query, source)
    return selectedCategory === 'all' ? queryMatches : queryMatches.filter(result => result.category === selectedCategory)
  }, [isFallbackState, query, selectedCategory, showsResults])

  const groupedResults = useMemo(() => SEARCH_CATEGORIES.slice(1).map(category => ({
    category: category as Exclude<SearchCategory, 'all'>,
    rows: availableResults.filter(result => result.category === category),
  })).filter(group => group.rows.length > 0), [availableResults])

  const setDebouncedResults = (nextQuery: string, nextCategory: SearchCategory = selectedCategory) => {
    if (debounceRef.current !== null) window.clearTimeout(debounceRef.current)
    if (isFallbackState) {
      debounceRef.current = null
      const source = SEARCH_RESULTS.filter(result => result.category !== 'recipes')
      const queryMatches = resultsMatchingQuery(nextQuery, source)
      const resultCount = nextCategory === 'all' ? queryMatches.length : queryMatches.filter(result => result.category === nextCategory).length
      const fixtureLabel = searchState === 'offline' ? 'Offline preview' : 'Cached error preview'
      setStatus(nextQuery.trim()
        ? `${fixtureLabel}. ${resultCount} bundled local ${resultCount === 1 ? 'result matches' : 'results match'} “${nextQuery}”; recipes remain unavailable and no network request ran.`
        : `${fixtureLabel}. Local search cleared; recipes remain unavailable and no network request ran.`)
      return
    }
    if (!nextQuery.trim()) {
      setSearchState(historyState === 'present' ? 'default' : 'first-use')
      setStatus(historyState === 'present' ? STATE_STATUS.default : STATE_STATUS['first-use'])
      return
    }
    setSearchState('loading')
    setStatus(`Searching for “${nextQuery}” in the bundled local fixture. No network request is running.`)
    debounceRef.current = window.setTimeout(() => {
      const queryMatches = resultsMatchingQuery(nextQuery)
      const resultCount = nextCategory === 'all' ? queryMatches.length : queryMatches.filter(result => result.category === nextCategory).length
      const zeroResults = resultCount === 0
      setSearchState(zeroResults ? 'zero-results' : 'results')
      setStatus(zeroResults ? `No bundled results match “${nextQuery}”.` : `${resultCount} bundled ${resultCount === 1 ? 'result matches' : 'results match'} “${nextQuery}”.`)
      debounceRef.current = null
    }, 300)
  }

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextQuery = event.target.value
    setQuery(nextQuery)
    setDebouncedResults(nextQuery)
  }

  const runStoredQuery = (nextQuery: string) => {
    setQuery(nextQuery)
    setSelectedCategory('all')
    setDebouncedResults(nextQuery, 'all')
    window.requestAnimationFrame(() => inputRef.current?.focus())
  }

  const clearSearch = () => {
    if (debounceRef.current !== null) window.clearTimeout(debounceRef.current)
    debounceRef.current = null
    setQuery('')
    setSelectedCategory('all')
    if (isFallbackState) {
      setStatus(`${searchState === 'offline' ? 'Offline preview' : 'Cached error preview'}. Local search cleared; recipes remain unavailable and no network request ran.`)
    } else {
      setSearchState(historyState === 'present' ? 'default' : 'first-use')
      setStatus('Search cleared. No search history, result, or external state changed.')
    }
    window.requestAnimationFrame(() => inputRef.current?.focus())
  }

  const openResult = (result: SearchResult, trigger: HTMLButtonElement) => {
    returnFocusRef.current = trigger
    setSelectedResult(result)
    setPanel('result')
    setStatus(`Opened a local preview for “${result.title}”. No navigation or history write occurred.`)
  }

  const closeResult = () => setPanel('closed')

  const selectCategory = (category: SearchCategory) => {
    setSelectedCategory(category)
    if (searchState === 'loading') {
      setDebouncedResults(query, category)
      return
    }
    const source = isFallbackState ? SEARCH_RESULTS.filter(result => result.category !== 'recipes') : SEARCH_RESULTS
    const queryMatches = resultsMatchingQuery(query, source)
    const count = category === 'all' ? queryMatches.length : queryMatches.filter(result => result.category === category).length
    if (searchState === 'zero-results') {
      if (count > 0) setSearchState('results')
      setStatus(`${CATEGORY_LABELS[category]} filter selected. ${count > 0
        ? `${count} bundled ${count === 1 ? 'row is' : 'rows are'} visible.`
        : `0 bundled rows match “${query}”.`}`)
      return
    }
    setStatus(`${CATEGORY_LABELS[category]} filter selected. ${showsResults
      ? `${count} bundled ${count === 1 ? 'row is' : 'rows are'} visible.`
      : 'No result rows are visible until a query runs.'}`)
  }

  const deleteHistory = () => {
    setHistoryState('deleted')
    setStatus('Recent search history removed from this page preview. No account or stored data was deleted.')
  }

  const retryLocalFixture = () => {
    setQuery(query.trim() || 'run')
    setSearchState('loading')
    setStatus('Restoring the bundled result fixture. No network retry is running.')
    if (debounceRef.current !== null) window.clearTimeout(debounceRef.current)
    debounceRef.current = window.setTimeout(() => {
      setSearchState('results')
      setStatus('Bundled result fixture restored. No network request occurred.')
      debounceRef.current = null
    }, 300)
  }

  const overlay = panel === 'result' ? (
    <SearchResultDialog result={selectedResult} onClose={closeResult} returnFocusRef={returnFocusRef} />
  ) : undefined

  return (
    <div className="contents [&_[data-chip-interactive]]:!text-[12px]">
      <HifiShell atmosphere="cia" showTabBar={false} overlay={overlay}>
        <main
          className="space-y-5 px-4 pb-7 pt-3"
          data-state-surface
          data-search-state={searchState}
          data-selected-category={selectedCategory}
          data-search-panel={panel}
          data-history-state={historyState}
          data-cia-suggestion={ciaSuggestion}
          data-query={query}
          data-result-count={availableResults.length}
          aria-busy={searchState === 'loading' || undefined}
        >
          <h1 className="sr-only">Search everything</h1>
          <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{status}</p>

          <div className="flex items-center gap-2">
            <div className="glass-pill focus-within:ring-2 focus-within:ring-brand-orange flex min-h-12 min-w-0 flex-1 items-center gap-2 px-3">
              <Search aria-hidden="true" className="h-[18px] w-[18px] shrink-0 text-paper-100/70" strokeWidth={1.9} />
              <label htmlFor="universal-search-input" className="sr-only">Search everything</label>
              <input
                ref={inputRef}
                id="universal-search-input"
                type="search"
                autoFocus
                autoComplete="off"
                spellCheck={false}
                value={query}
                placeholder="Search everything"
                className="focus-ring min-h-11 min-w-0 flex-1 rounded-md bg-transparent text-[16px] text-paper-100 outline-none placeholder:text-paper-100/55"
                onChange={handleQueryChange}
              />
              {query && (
                <button type="button" data-search-clear className="focus-ring flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-paper-100/70" aria-label="Clear search" onClick={clearSearch}>
                  <X aria-hidden="true" className="h-4 w-4" />
                </button>
              )}
            </div>
            <Link href="/screens/17" data-search-cancel className="focus-ring flex min-h-11 shrink-0 items-center rounded-pill px-2 text-[14px] font-medium text-paper-100/80" aria-label="Cancel search and return to Me">Cancel</Link>
          </div>

          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 hide-scrollbar" role="group" aria-label="Filter search results">
            {SEARCH_CATEGORIES.map(category => {
              const selected = selectedCategory === category
              return (
                <button
                  key={category}
                  type="button"
                  data-search-filter={category}
                  aria-pressed={selected}
                  className={cx(
                    'focus-ring inline-flex min-h-11 shrink-0 items-center gap-2 rounded-pill border px-4 text-[13px] font-semibold',
                    selected ? 'border-brand-orange bg-brand-orange/15 text-paper-100' : 'border-white/15 bg-white/[0.04] text-paper-100/75',
                  )}
                  onClick={() => selectCategory(category)}
                >
                  {selected && <Check data-selected-marker aria-hidden="true" className="h-4 w-4" strokeWidth={2.5} />}
                  {CATEGORY_LABELS[category]}
                </button>
              )
            })}
          </div>

          {searchState === 'loading' ? (
            <section aria-labelledby="search-loading-title">
              <div id="search-loading-title"><SectionTitle title="Searching" meta={`“${query}” · 300ms`} /></div>
              <SkeletonRows />
            </section>
          ) : searchState === 'zero-results' ? (
            <section className="surface-warm flex flex-col items-center gap-3 px-6 py-10 text-center" aria-labelledby="zero-search-title">
              <Search aria-hidden="true" className="h-7 w-7 text-paper-100/60" strokeWidth={1.7} />
              <h2 id="zero-search-title" className="text-[17px] font-semibold text-paper-100">No results for “{query}”</h2>
              <p className="text-[13px] leading-5 text-paper-100/70">Try a different spelling or search term.</p>
            </section>
          ) : searchState === 'default' ? (
            <section className="space-y-3" aria-labelledby="recent-searches-title">
              <div className="flex min-h-11 items-center justify-between gap-3">
                <h2 id="recent-searches-title" className="text-[12px] font-semibold uppercase tracking-[0.08em] text-paper-100/70">Recent searches</h2>
                {historyState === 'present' && (
                  <button type="button" data-history-delete className="focus-ring flex min-h-11 items-center gap-2 rounded-pill px-3 text-[12px] font-medium text-paper-100/75" onClick={deleteHistory}>
                    <Trash2 aria-hidden="true" className="h-4 w-4" />Delete history
                  </button>
                )}
              </div>
              {historyState === 'present' ? (
                <div className="flex flex-wrap gap-2">
                  {['run', 'morning routine', 'healthy lunch'].map(item => (
                    <button key={item} type="button" className="focus-ring glass-pill flex min-h-11 items-center gap-2 px-4 text-[13px] text-paper-100/80" onClick={() => runStoredQuery(item)}>
                      <History aria-hidden="true" className="h-4 w-4" />{item}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[13px] leading-5 text-paper-100/70">Recent history was removed from this page preview. No stored account data changed.</p>
              )}
            </section>
          ) : searchState === 'first-use' ? (
            <section className="surface-warm p-5" aria-labelledby="first-search-title">
              <Search aria-hidden="true" className="h-6 w-6 text-brand-orange" />
              <h2 id="first-search-title" className="mt-3 text-[18px] font-semibold text-paper-100">Find something in Balencia</h2>
              <p className="mt-2 text-[13px] leading-5 text-paper-100/70">Try searching for a mission, habit, or recipe. No search history exists yet.</p>
              <div className="mt-4 flex flex-wrap gap-2" aria-label="Suggested searches">
                {['Missions', 'Habits', 'Recipes', 'Journal'].map(item => (
                  <button key={item} type="button" aria-label={`Search for ${item}`} className="focus-ring min-h-11 rounded-pill border border-white/15 bg-white/[0.04] px-4 text-[13px] font-medium text-paper-100/80" onClick={() => runStoredQuery(item.toLowerCase())}>{item}</button>
                ))}
              </div>
            </section>
          ) : (
            <>
              {searchState === 'offline' && (
                <div className="glass-pill flex items-start gap-3 px-4 py-3" role="status">
                  <WifiOff aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-paper-100/70" />
                  <p className="text-[13px] leading-5 text-paper-100/75">Offline — showing local results only. Community and recipes need a connection. This preview did not inspect your connection.</p>
                </div>
              )}
              {searchState === 'error' && (
                <div className="surface-warm flex items-start gap-3 p-4" role="alert">
                  <AlertTriangle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] leading-5 text-paper-100/80">Some results may be missing right now. Three local rows remain available. This is a local error fixture; no network request failed.</p>
                    <button type="button" data-search-retry className="focus-ring mt-3 inline-flex min-h-11 items-center gap-2 rounded-pill px-3 text-[13px] font-semibold text-brand-orange" onClick={retryLocalFixture}>
                      <RefreshCw aria-hidden="true" className="h-4 w-4" />Retry local fixture
                    </button>
                  </div>
                </div>
              )}

              {searchState === 'results' && ciaSuggestion === 'visible' && availableResults.some(result => result.id === 'morning-run-prep') && (
                <CIAInsightCard
                  eyebrow="CIA thinks you’re looking for"
                  provenance={['Based on 6 Tuesdays', 'Estimated · low confidence']}
                  className="!p-4 [&>div>div>p]:!text-[12px] [&_span]:!text-[12px]"
                  actions={(
                    <>
                      <BtnCoach
                        className="h-11 px-4 text-[13px]"
                        onClick={event => openResult(SEARCH_RESULTS[1], event.currentTarget)}
                      >
                        Open routine
                      </BtnCoach>
                      <BtnGhost
                        data-cia-dismiss
                        className="px-4 text-[13px]"
                        aria-label="Dismiss CIA suggestion"
                        onClick={() => {
                          setCiaSuggestion('dismissed')
                          setStatus('CIA suggestion dismissed from this page. No recommendation history changed.')
                        }}
                      >
                        Not now
                      </BtnGhost>
                    </>
                  )}
                >
                  <h2 id="cia-search-title" className="text-[17px] font-semibold leading-6 text-paper-100">Morning run prep</h2>
                  <p className="mt-1 text-[13px] leading-5 text-paper-100/70">
                    A low-confidence local suggestion from six bundled Tuesday <span className="text-emphasis">examples</span>.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2" aria-label="Fitness domain evidence">
                    <span data-domain-tag="fitness" className="inline-flex min-h-6 items-center gap-2 rounded-pill border border-domain-fitness/35 bg-domain-fitness/15 px-2.5 text-[12px] font-semibold text-paper-100">
                      <span className="h-2 w-2 rounded-full bg-domain-fitness" aria-hidden="true" />Fitness
                    </span>
                  </div>
                </CIAInsightCard>
              )}

              {groupedResults.length > 0 ? groupedResults.map(group => (
                <section key={group.category} className="space-y-2" aria-labelledby={`search-${group.category}-title`}>
                  <div id={`search-${group.category}-title`}><SectionTitle title={CATEGORY_LABELS[group.category]} meta={`${group.rows.length} ${group.rows.length === 1 ? 'result' : 'results'}`} /></div>
                  <div className="surface-warm divide-y divide-white/[0.06] overflow-hidden">
                    {group.rows.map(result => <ResultRow key={result.id} result={result} onOpen={openResult} />)}
                  </div>
                </section>
              )) : (
                <section className="surface-warm p-6 text-center" aria-labelledby="filtered-search-empty-title">
                  <h2 id="filtered-search-empty-title" className="text-[17px] font-semibold text-paper-100">{selectedCategory === 'all' ? (query.trim() ? `No local results for “${query}”` : 'Local search cleared') : `No ${CATEGORY_LABELS[selectedCategory].toLowerCase()} in this local view`}</h2>
                  <p className="mt-2 text-[13px] leading-5 text-paper-100/70">{isFallbackState ? 'This fallback uses bundled local rows only. Recipes and server-only results remain unavailable; no request ran.' : 'Choose another category. The bundled local result model is unchanged.'}</p>
                </section>
              )}
            </>
          )}

          <section className="surface-warm p-4" aria-labelledby="search-data-controls-title">
            <h2 id="search-data-controls-title" className="text-[12px] font-semibold uppercase tracking-[0.08em] text-paper-100/70">Search data controls</h2>
            <p className="mt-2 text-[12px] leading-5 text-paper-100/70">These eight buttons preview local control outcomes. No source, export, revocation, deletion, storage, or network state changes here.</p>
            <div className="mt-3 grid grid-cols-2 gap-2" role="group" aria-label="Search data controls">
              {DATA_CONTROLS.map(control => {
                const selected = selectedControl === control
                return (
                  <button
                    key={control}
                    type="button"
                    data-data-control={control.toLowerCase()}
                    aria-pressed={selected}
                    className={cx('focus-ring flex min-h-11 items-center justify-center gap-2 rounded-pill border px-3 text-center text-[12px] font-medium', selected ? 'border-brand-orange bg-brand-orange/15 text-paper-100' : 'border-white/10 bg-white/[0.03] text-paper-100/75')}
                    onClick={() => {
                      setSelectedControl(control)
                      setStatus(`${control} selected for this local search preview. No source, account, file, permission, stored history, or network state changed.`)
                    }}
                  >
                    {selected && <Check data-selected-marker aria-hidden="true" className="h-4 w-4" />}
                    {control}
                  </button>
                )
              })}
            </div>
          </section>
        </main>
      </HifiShell>
    </div>
  )
}
