'use client'

import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from 'react'
import { ChevronRight, FileText, LifeBuoy, MessageCircle, Search, Sparkles, X } from 'lucide-react'
import { BtnPrimary, BtnSecondary, ComplianceFooter, GlassCard, HifiShell, SolidCard, TopBar } from '@/components/hifi/kit'

const HELP_STATES = ['default', 'skeleton', 'empty', 'error', 'offline', 'success'] as const
const HELP_PANELS = ['closed', 'cia-consent', 'contact', 'article'] as const
const DATA_CONTROLS = ['Category', 'Source', 'Scope', 'Freshness', 'Retention', 'Export', 'Revoke', 'Delete'] as const

type HelpState = (typeof HELP_STATES)[number]
type HelpPanel = (typeof HELP_PANELS)[number]
type SearchState = 'idle' | 'results' | 'empty'
type HandoffContext = 'none' | 'query-only'
type TicketState = 'none' | 'local-preview'
type CategoryId = 'getting-started' | 'cia-coach' | 'missions' | 'billing' | 'privacy' | 'troubleshooting'
type SupportMode = 'standard' | 'crisis'

const HELP_STATE_STATUS: Record<HelpState, string> = {
  default: 'Six bundled help categories are available. No support or CIA action has occurred.',
  skeleton: 'Loading six bundled help categories. No support, CIA, ticket, or network action is running.',
  empty: 'The bundled help index has no articles in this fixture. Search remains available; CIA consent becomes available after a query, and Contact support remains available.',
  error: 'The help index could not refresh. Bundled categories remain available, and no network retry was attempted.',
  offline: 'Offline preview. Bundled help articles remain searchable; CIA handoff and Contact support are disabled.',
  success: 'Local help outcome prepared. No conversation, support request, network call, or ticket was created.',
}

type HelpCategory = {
  id: CategoryId
  title: string
  meta: string
  articleTitle: string
  articleBody: string
  updated: string
}

const HELP_CATEGORIES: readonly HelpCategory[] = [
  { id: 'getting-started', title: 'Getting started', meta: 'Setup and onboarding', articleTitle: 'Start with your first Balencia plan', articleBody: 'Review the local onboarding sequence, then choose the next setup step that fits your preview.', updated: 'Updated Jun 2026' },
  { id: 'cia-coach', title: 'CIA and AI coach', meta: 'Handoffs and context', articleTitle: 'How CIA help context works', articleBody: 'Help handoff context is limited to the query you explicitly approve. Mission, tracking, profile, and conversation history are not included.', updated: 'Updated Jul 2026' },
  { id: 'missions', title: 'Missions and tracking', meta: 'Progress and inputs', articleTitle: 'Understand Mission progress', articleBody: 'Mission progress in this prototype comes from bundled fixtures or values you enter locally. No live account data is changed.', updated: 'Updated Jun 2026' },
  { id: 'billing', title: 'Billing and subscription', meta: 'Plans and invoices', articleTitle: 'Review plans and billing previews', articleBody: 'Billing surfaces are visual previews. Purchases, cancellations, invoices, and payment methods are never changed here.', updated: 'Updated Jul 2026' },
  { id: 'privacy', title: 'Privacy and data', meta: 'Sources and controls', articleTitle: 'Review your data controls', articleBody: 'Category, source, scope, freshness, retention, export, revoke, and delete remain visible as contextual local controls.', updated: 'Updated Jul 2026' },
  { id: 'troubleshooting', title: 'Troubleshooting', meta: 'Sync and fixes', articleTitle: 'Troubleshoot a visual fixture', articleBody: 'Retry actions on this screen update only local preview state. They do not contact a provider or support service.', updated: 'Updated Jun 2026' },
]

function isHelpState(value: string | null): value is HelpState {
  return HELP_STATES.some(state => state === value)
}

function isHelpPanel(value: string | null): value is HelpPanel {
  return HELP_PANELS.some(panel => panel === value)
}

function isCategoryId(value: string | null): value is CategoryId {
  return HELP_CATEGORIES.some(category => category.id === value)
}

function ModalFrame({ title, titleId, onClose, children }: { title: string; titleId: string; onClose: () => void; children: ReactNode }) {
  const dialogRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    dialogRef.current?.querySelector<HTMLElement>('input, textarea, button:not(:disabled), [href]')?.focus()
    return () => {
      if (previousFocus?.isConnected) previousFocus.focus()
    }
  }, [])

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
      return
    }
    if (event.key !== 'Tab') return
    const focusable = [...(dialogRef.current?.querySelectorAll<HTMLElement>('input:not(:disabled), textarea:not(:disabled), button:not(:disabled), [href]') ?? [])]
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
    <div className="absolute inset-0 z-[70] flex items-end bg-ink-900/90 p-3 pb-[72px]" role="presentation" onMouseDown={event => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={titleId} className="glass-card max-h-[690px] w-full overflow-y-auto p-5 shadow-3" onKeyDown={handleKeyDown}>
        <div className="flex items-center justify-between gap-3">
          <h2 id={titleId} className="text-[18px] font-semibold text-paper-100">{title}</h2>
          <button type="button" className="focus-ring flex h-11 w-11 items-center justify-center rounded-full text-paper-100/70" aria-label={`Close ${title.toLowerCase()}`} onClick={onClose}>
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        {children}
      </section>
    </div>
  )
}

function StateBanner({ state }: { state: HelpState }) {
  const message = state === 'default' ? undefined : HELP_STATE_STATUS[state]
  if (!message) return null
  return (
    <div className={`rounded-xl border px-4 py-3 text-[12px] leading-5 text-paper-100/80 ${state === 'success' ? 'border-forest-green/30 bg-forest-green/10' : 'border-brand-orange/25 bg-brand-orange/10'}`} role={state === 'error' ? 'alert' : 'status'}>
      {message}
    </div>
  )
}

export function S25HelpCenter() {
  const searchRef = useRef<HTMLInputElement>(null)
  const crisisDestinationRef = useRef<HTMLElement>(null)
  const [helpState, setHelpState] = useState<HelpState>('default')
  const [panel, setPanel] = useState<HelpPanel>('closed')
  const [query, setQuery] = useState('')
  const [activeArticleId, setActiveArticleId] = useState<CategoryId>('getting-started')
  const [handoffContext, setHandoffContext] = useState<HandoffContext>('none')
  const [approvedQuery, setApprovedQuery] = useState('')
  const [ticketState, setTicketState] = useState<TicketState>('none')
  const [selectedControl, setSelectedControl] = useState<(typeof DATA_CONTROLS)[number] | null>(null)
  const [consentStatus, setConsentStatus] = useState('Review the query-only disclosure before continuing.')
  const [supportIssue, setSupportIssue] = useState('')
  const [contactStatus, setContactStatus] = useState('No network request or support ticket has been created.')
  const [status, setStatus] = useState(HELP_STATE_STATUS.default)
  const [supportMode, setSupportMode] = useState<SupportMode>('standard')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const requestedState = params.get('state')
    const requestedPanel = params.get('panel')
    const requestedArticle = params.get('article')
    const requestedQuery = params.get('q') ?? params.get('query')
    const requestedSupport = params.get('support')
    queueMicrotask(() => {
      if (isHelpState(requestedState)) {
        setHelpState(requestedState)
        setStatus(HELP_STATE_STATUS[requestedState])
        if (requestedState === 'success') setTicketState('local-preview')
      }
      if (isHelpPanel(requestedPanel)) setPanel(requestedPanel)
      if (isCategoryId(requestedArticle)) setActiveArticleId(requestedArticle)
      if (requestedQuery !== null) setQuery(requestedQuery)
      if (requestedSupport === 'crisis') {
        setSupportMode('crisis')
        setStatus('Crisis and local support guidance is open. No call, text, location lookup, or outreach has been started.')
      }
    })
  }, [])

  useEffect(() => {
    if (supportMode === 'crisis') crisisDestinationRef.current?.focus()
  }, [supportMode])

  const normalizedQuery = query.trim().toLowerCase()
  const matches = helpState === 'empty' ? [] : HELP_CATEGORIES.filter(category => {
    if (!normalizedQuery) return false
    return `${category.title} ${category.meta} ${category.articleTitle} ${category.articleBody}`.toLowerCase().includes(normalizedQuery)
  })
  const searchState: SearchState = normalizedQuery
    ? matches.length > 0 ? 'results' : 'empty'
    : helpState === 'empty' ? 'empty' : 'idle'
  const activeArticle = HELP_CATEGORIES.find(category => category.id === activeArticleId) ?? HELP_CATEGORIES[0]
  const offline = helpState === 'offline'
  const ciaUnavailableReasonId = offline ? 'help-offline-actions' : !normalizedQuery ? 'help-cia-query-required' : undefined

  const openArticle = (id: CategoryId) => {
    setActiveArticleId(id)
    setPanel('article')
    setStatus('Opened a bundled help article locally. No route, account, or network state changed.')
  }

  const clearSearch = () => {
    setQuery('')
    setStatus('Search cleared. Six help categories restored.')
    searchRef.current?.focus()
  }

  const closePanel = () => setPanel('closed')

  const overlay = panel === 'cia-consent' ? (
    <ModalFrame title="Share this query with CIA?" titleId="help-cia-consent-title" onClose={closePanel}>
      <p className="mt-3 text-[13px] leading-5 text-paper-100/80">
        Only your current help query will enter the local CIA preview: <span className="font-semibold text-paper-100">{query.trim() || 'No query entered'}</span>.
      </p>
      <p className="mt-2 text-[12px] leading-5 text-paper-100/70">
        Mission history, tracking data, profile fields, account data, and prior conversations are not included. No conversation or network request is created.
      </p>
      {!query.trim() && <p id="help-cia-consent-query-required" className="mt-2 text-[12px] leading-5 text-paper-100/70">Enter a help query before approving this query-only handoff.</p>}
      <div className="mt-4 grid grid-cols-2 gap-2" role="group" aria-label="CIA help handoff data controls">
        {DATA_CONTROLS.map(control => (
          <button
            key={control}
            type="button"
            aria-pressed={selectedControl === control}
            className={`focus-ring min-h-12 rounded-xl border px-3 text-[12px] font-semibold ${selectedControl === control ? 'border-royal-purple bg-royal-purple/15 text-paper-100' : 'border-white/12 bg-white/[0.03] text-paper-100/75'}`}
            onClick={() => {
              setSelectedControl(control)
              setConsentStatus(`${control} reviewed for this query-only local handoff. No data or permission changed.`)
            }}
          >
            {control}
          </button>
        ))}
      </div>
      <p className="mt-3 min-h-10 text-[12px] leading-5 text-paper-100/70" role="status" aria-live="polite">{consentStatus}</p>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <button type="button" className="focus-ring min-h-12 rounded-pill border border-white/15 px-3 text-[13px] font-medium text-paper-100" onClick={closePanel}>Stay in Help Center</button>
        <button
          type="button"
          disabled={!query.trim()}
          aria-describedby={!query.trim() ? 'help-cia-consent-query-required' : undefined}
          className="focus-ring min-h-12 rounded-pill border border-white/15 px-3 text-[13px] font-medium text-paper-100 disabled:cursor-not-allowed disabled:opacity-40"
          onClick={() => {
            const consentedQuery = query.trim()
            if (!consentedQuery) {
              setConsentStatus('A non-empty query is required before this query-only handoff can be approved.')
              return
            }
            setApprovedQuery(consentedQuery)
            setHandoffContext('query-only')
            setHelpState('success')
            setStatus('CIA handoff preview consented with query-only context. No conversation, mission data, tracking history, or network request was created.')
            closePanel()
          }}
        >
          Share query locally
        </button>
      </div>
    </ModalFrame>
  ) : panel === 'contact' ? (
    <ModalFrame title="Contact support preview" titleId="help-contact-title" onClose={closePanel}>
      <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <p className="text-[13px] font-semibold text-paper-100">No ticket yet</p>
        <p className="mt-1 text-[12px] text-paper-100/70">No current SLA</p>
      </div>
      <form className="mt-4 space-y-3" onSubmit={event => {
        event.preventDefault()
        if (helpState === 'offline' || helpState === 'error') {
          setContactStatus('Could not prepare the local support outcome in this fixture. Your typed issue is preserved; no network request or ticket was created.')
          return
        }
        setTicketState('local-preview')
        setHelpState('success')
        setContactStatus('Local support preview prepared. No network request or support ticket was created.')
        setStatus('Support issue retained in this local preview only. No request, network call, or ticket was created.')
      }}>
        <label htmlFor="help-support-issue" className="block text-[12px] font-medium text-paper-100/75">What do you need help with?</label>
        <textarea
          id="help-support-issue"
          rows={4}
          className="focus-ring w-full resize-none rounded-xl border border-white/12 bg-white/[0.04] p-3 text-[16px] leading-6 text-paper-100 outline-none placeholder:text-paper-100/55"
          placeholder="Describe the issue"
          value={supportIssue}
          onChange={event => setSupportIssue(event.target.value)}
        />
        <p id="help-support-required" className="text-[12px] leading-5 text-paper-100/70">Describe an issue to enable the local support outcome. Nothing is submitted.</p>
        <p className="min-h-10 text-[12px] leading-5 text-paper-100/70" role="status" aria-live="polite">{contactStatus}</p>
        <div className="grid grid-cols-2 gap-3">
          <button type="button" className="focus-ring min-h-12 rounded-pill border border-white/15 px-3 text-[13px] font-medium text-paper-100" onClick={closePanel}>Keep draft</button>
          <button type="submit" disabled={!supportIssue.trim()} aria-describedby={!supportIssue.trim() ? 'help-support-required' : undefined} className="hifi-action hifi-action-primary min-h-12 rounded-pill px-3 text-[13px] font-semibold disabled:cursor-not-allowed disabled:opacity-45">Preview support outcome</button>
        </div>
      </form>
    </ModalFrame>
  ) : panel === 'article' ? (
    <ModalFrame title={activeArticle.articleTitle} titleId="help-article-title" onClose={closePanel}>
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="rounded-pill border border-white/12 px-3 py-1.5 text-[12px] text-paper-100/70">{activeArticle.title}</span>
        <span className="rounded-pill border border-white/12 px-3 py-1.5 text-[12px] text-paper-100/70">{activeArticle.updated}</span>
      </div>
      <p className="mt-4 text-[14px] leading-6 text-paper-100/80">{activeArticle.articleBody}</p>
      <p className="mt-3 text-[12px] leading-5 text-paper-100/70">Source: bundled Balencia help index · local article fixture</p>
      <button type="button" className="focus-ring mt-4 min-h-12 w-full rounded-pill border border-white/15 px-4 text-[13px] font-medium text-paper-100" onClick={closePanel}>Back to Help Center</button>
    </ModalFrame>
  ) : undefined

  return (
    <div className="contents [&_nav_span]:!text-[12px]">
    <HifiShell header={<TopBar title="Help center" titleLevel="div" back />} activeTab="me" overlay={overlay}>
      <main
        className="space-y-5 px-4 pb-6 pt-3"
        data-help-state={helpState}
        data-search-state={searchState}
        data-help-panel={panel}
        data-handoff-context={handoffContext}
        data-ticket-state={ticketState}
        aria-busy={helpState === 'skeleton' || undefined}
      >
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-paper-100/70">Support</p>
          <h1 className="mt-1 text-[26px] leading-tight text-paper-100">Find your help <span className="text-emphasis">center</span></h1>
        </div>

        {supportMode === 'crisis' && (
          <section
            ref={crisisDestinationRef}
            tabIndex={-1}
            data-support-mode="crisis"
            aria-labelledby="help-crisis-title"
            className="rounded-2xl border border-brand-orange/25 bg-white/[0.04] p-4 outline-none focus-visible:shadow-[var(--focus-ring)]"
          >
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-paper-100/70">Immediate support</p>
            <h2 id="help-crisis-title" className="mt-1 text-[20px] font-semibold leading-snug text-paper-100">Crisis and local support</h2>
            <p className="mt-3 text-[14px] leading-6 text-paper-100/85">If you may be in immediate danger, contact your local emergency services now.</p>
            <p className="mt-2 text-[13px] leading-5 text-paper-100/75">We cannot determine your location in this visual prototype. If you are unsure which emergency number applies, use a verified local helpline or ask a trusted person nearby for help.</p>
            <ul className="mt-3 space-y-2 text-[13px] leading-5 text-paper-100/80">
              <li className="rounded-xl border border-white/10 bg-ink-900/35 px-3 py-3">Call your local emergency number directly if there is immediate danger.</li>
              <li className="rounded-xl border border-white/10 bg-ink-900/35 px-3 py-3">Call or text a local crisis service directly, or ask a trusted person to stay with you while you reach support.</li>
            </ul>
            <p className="mt-3 text-[12px] leading-5 text-paper-100/70">Balencia cannot place calls, send texts, determine your location, or contact anyone for you.</p>
            <a
              href="https://findahelpline.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring mt-4 flex min-h-12 items-center justify-center rounded-pill border border-brand-orange/45 bg-brand-orange/10 px-4 text-center text-[13px] font-semibold text-paper-100"
            >
              Find verified local helplines
            </a>
            <button
              type="button"
              className="focus-ring mt-3 min-h-12 w-full rounded-pill border border-white/15 px-4 text-[13px] font-medium text-paper-100"
              onClick={() => {
                setSupportMode('standard')
                setStatus('Returned to the bundled Help Center. No call, text, location lookup, or outreach has been started.')
                requestAnimationFrame(() => searchRef.current?.focus())
              }}
            >
              Return to Help Center
            </button>
          </section>
        )}

        <StateBanner state={helpState} />

        <div className="space-y-2">
          <label htmlFor="help-search" className="text-[12px] font-medium text-paper-100/75">Search help topics</label>
          <div className="glass-pill flex min-h-[52px] items-center gap-2 px-3 focus-within:border-brand-orange focus-within:shadow-[var(--focus-ring)]">
            <Search className="h-4 w-4 shrink-0 text-paper-100/65" aria-hidden="true" />
            <input
              ref={searchRef}
              id="help-search"
              type="search"
              className="h-11 min-w-0 flex-1 bg-transparent text-[16px] text-paper-100 outline-none placeholder:text-paper-100/55"
              placeholder="Search help topics"
              value={query}
              aria-describedby="help-search-status"
              onChange={event => setQuery(event.target.value)}
            />
            {query.length > 0 && <button type="button" className="focus-ring flex h-11 min-w-11 items-center justify-center rounded-pill px-3 text-[12px] font-semibold text-paper-100/75" onClick={clearSearch}>Clear</button>}
          </div>
          <p id="help-search-status" className="min-h-5 text-[12px] text-paper-100/70" role="status" aria-live="polite" aria-atomic="true">
            {searchState === 'results' ? `${matches.length} ${matches.length === 1 ? 'result' : 'results'} for “${query}”` : searchState === 'empty' ? normalizedQuery ? `No help results for “${query}”` : 'No help articles are available in this fixture' : '6 help categories available'}
          </p>
        </div>

        <GlassCard tone="cia">
          <div className="flex items-start gap-3">
            <span aria-hidden="true" className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-royal-purple/15 text-royal-purple"><Sparkles className="h-5 w-5" /></span>
            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-paper-100">Ask CIA</p>
              <h2 className="mt-1 text-[17px] leading-snug text-paper-100">Get help from your coach</h2>
              <p className="mt-2 text-[13px] leading-5 text-paper-100/75">CIA knows the Balencia help index. Only your current search query can be shared, and only after you consent.</p>
              <BtnPrimary className="mt-3" disabled={Boolean(ciaUnavailableReasonId)} aria-describedby={ciaUnavailableReasonId} onClick={() => setPanel('cia-consent')}>
                <span className="flex items-center gap-2"><MessageCircle className="h-4 w-4" aria-hidden="true" />Ask CIA</span>
              </BtnPrimary>
              {!offline && !normalizedQuery && <p id="help-cia-query-required" className="mt-2 text-[12px] leading-5 text-paper-100/70">Enter a help query before sharing query-only context with CIA.</p>}
              {handoffContext === 'query-only' && (
                <div className="mt-3">
                  <p className="text-[12px] leading-5 text-paper-100/70">Approved query: {approvedQuery}</p>
                  <a href={`/screens/09?help=${encodeURIComponent(approvedQuery)}`} className="focus-ring mt-2 flex min-h-11 items-center justify-center rounded-pill border border-royal-purple/40 px-4 text-[13px] font-medium text-paper-100">Open consented CIA preview</a>
                </div>
              )}
            </div>
          </div>
        </GlassCard>

        <section className="space-y-3" aria-labelledby="help-results-title">
          <div className="flex min-h-11 items-center justify-between gap-3 px-1">
            <h2 id="help-results-title" className="text-[12px] font-semibold uppercase tracking-[0.1em] text-paper-100/70">{searchState === 'idle' ? 'Frequently asked' : 'Search results'}</h2>
            <span className="text-[12px] text-paper-100/65">{searchState === 'idle' ? '6 categories' : `${matches.length} found`}</span>
          </div>

          {helpState === 'skeleton' ? (
            <div className="space-y-2" aria-label="Loading help categories">{HELP_CATEGORIES.map(category => <div key={category.id} className="skeleton-block h-[68px] rounded-xl" />)}</div>
          ) : searchState === 'empty' ? (
            <SolidCard className="py-7 text-center">
              <FileText className="mx-auto h-6 w-6 text-paper-100/60" aria-hidden="true" />
              <p className="mt-3 text-[14px] font-semibold text-paper-100">No matching help article</p>
              <p className="mt-1 text-[12px] leading-5 text-paper-100/70">Try another query, ask CIA with consent, or contact support. No result is fabricated.</p>
            </SolidCard>
          ) : searchState === 'results' ? (
            <div className="space-y-3" role="list" aria-label="Grouped help search results">
              {matches.map(category => (
                <section key={category.id} role="listitem" aria-labelledby={`help-result-${category.id}`}>
                  <h3 id={`help-result-${category.id}`} className="mb-2 px-1 text-[12px] font-semibold text-paper-100/70">{category.title}</h3>
                  <SolidCard className="!p-0">
                    <button type="button" className="focus-ring flex min-h-[68px] w-full items-center gap-3 rounded-lg px-4 py-3 text-left hover:bg-white/[0.03]" onClick={() => openArticle(category.id)}>
                      <span className="min-w-0 flex-1"><span className="block text-[14px] font-medium text-paper-100">{category.articleTitle}</span><span className="mt-0.5 block text-[12px] text-paper-100/70">{category.updated}</span></span>
                      <span className="text-[12px] font-medium text-paper-100/65">Open article</span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-paper-100/55" aria-hidden="true" />
                    </button>
                  </SolidCard>
                </section>
              ))}
            </div>
          ) : (
            <SolidCard className="!p-0">
              <ul role="list" className="divide-y divide-white/[0.06]">
                {HELP_CATEGORIES.map(category => (
                  <li key={category.id}>
                    <button type="button" className="focus-ring flex min-h-[68px] w-full items-center gap-3 rounded-lg px-4 py-3 text-left hover:bg-white/[0.03]" onClick={() => openArticle(category.id)}>
                      <span className="min-w-0 flex-1"><span className="block text-[14px] font-medium text-paper-100">{category.title}</span><span className="mt-0.5 block text-[12px] text-paper-100/70">{category.meta}</span></span>
                      <span className="text-[12px] font-medium text-paper-100/65">Open article</span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-paper-100/55" aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            </SolidCard>
          )}
        </section>

        <GlassCard tone="muted">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-paper-100/70">Escalation</p>
              <h2 className="mt-1 text-[15px] font-semibold text-paper-100">Still need help?</h2>
              <div className="mt-2 flex flex-wrap gap-2"><span className="rounded-pill border border-white/12 px-3 py-1.5 text-[12px] text-paper-100/70">No ticket yet</span><span className="rounded-pill border border-white/12 px-3 py-1.5 text-[12px] text-paper-100/70">No current SLA</span></div>
            </div>
            <BtnSecondary disabled={offline} aria-describedby={offline ? 'help-offline-actions' : undefined} onClick={() => setPanel('contact')}><span className="flex items-center gap-2"><LifeBuoy className="h-4 w-4" aria-hidden="true" />Contact</span></BtnSecondary>
          </div>
        </GlassCard>

        {offline && <p id="help-offline-actions" className="text-[12px] leading-5 text-paper-100/70">CIA and support actions require a connection. Local article search remains available.</p>}

        <p className="min-h-10 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-[12px] leading-5 text-paper-100/70" role="status" aria-live="polite" aria-atomic="true">{status}</p>
        <ComplianceFooter />
      </main>
    </HifiShell>
    </div>
  )
}
