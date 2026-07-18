'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronRight, Mic, MoreHorizontal, Pencil, Search, ShieldCheck, X } from 'lucide-react'
import Link from 'next/link'
import {
  BtnDestructive,
  BtnGhost,
  BtnSecondary,
  GlassCard,
  GlassPillInput,
  HifiShell,
  Provenance,
  SectionTitle,
  TopBar,
} from '@/components/hifi/kit'
import { persona } from '@/data/hifi/persona'

const CONVERSATION_STATES = ['default', 'skeleton', 'empty', 'error', 'success', 'disabled', 'offline', 'search', 'compose', 'manage', 'safety'] as const
const CONVERSATION_FILTERS = ['all', 'cia', 'people', 'groups', 'rooms'] as const

type ConversationsState = (typeof CONVERSATION_STATES)[number]
type ConversationsFilter = (typeof CONVERSATION_FILTERS)[number]
type ConversationsPanel = 'none' | 'search' | 'compose' | 'manage' | 'safety'

type Conversation = {
  id: string
  title: string
  kind: Exclude<ConversationsFilter, 'all' | 'cia'>
  description: string
  time: string
  unread: number
  href: string
  initials?: string
  members?: number
  domain?: string
}

const conversations: Conversation[] = [
  {
    id: 'aisha',
    title: persona.buddy.name,
    kind: 'people',
    description: 'See you at 6 for the river route?',
    time: '18m',
    unread: 1,
    href: '/screens/75',
    initials: persona.buddy.initials,
  },
  {
    id: 'iron-clinic',
    title: 'Iron Clinic',
    kind: 'groups',
    description: 'Next workout is at 7 am Saturday',
    time: '7m',
    unread: 3,
    href: '/screens/76',
    members: 4,
  },
  {
    id: 'run-club',
    title: 'Run Club',
    kind: 'rooms',
    description: 'Who’s in this week?',
    time: '1h',
    unread: 0,
    href: '/screens/76',
    domain: 'Finance',
  },
]

function isConversationsState(value: string | null): value is ConversationsState {
  return CONVERSATION_STATES.includes(value as ConversationsState)
}

function panelForState(state: ConversationsState): ConversationsPanel {
  if (state === 'search' || state === 'compose' || state === 'manage' || state === 'safety') return state
  return 'none'
}

function FocusedConversationPanel({
  panel,
  onClose,
  children,
}: {
  panel: Exclude<ConversationsPanel, 'none'>
  onClose: () => void
  children: React.ReactNode
}) {
  const panelRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const initialFocus = panel === 'search'
      ? panelRef.current?.querySelector<HTMLElement>('input')
      : panelRef.current?.querySelector<HTMLElement>('button, [href], input')
    initialFocus?.focus()
    return () => {
      if (previousFocus?.isConnected) previousFocus.focus()
    }
  }, [panel])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
      return
    }
    if (event.key !== 'Tab') return
    const focusable = [...(panelRef.current?.querySelectorAll<HTMLElement>('input:not(:disabled), button:not(:disabled), [href]:not([aria-disabled="true"])') ?? [])]
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
    <div className="absolute inset-0 z-[60] flex items-end bg-ink-900/85 px-3 pb-[72px]" role="presentation">
      <section
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`conversations-${panel}-title`}
        className="action-sheet-surface glass-card max-h-[650px] w-full overflow-y-auto p-4 shadow-3"
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center justify-between gap-3">
          <h2 id={`conversations-${panel}-title`} className="text-[18px] font-semibold text-paper-100">
            {panel === 'search' && 'Search conversations'}
            {panel === 'compose' && 'Start a conversation'}
            {panel === 'manage' && 'Manage conversation'}
            {panel === 'safety' && 'Safety and crisis guidance'}
          </h2>
          <button type="button" className="focus-ring flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-paper-100/70" aria-label={`Close ${panel} panel`} onClick={onClose}>
            <X size={19} />
          </button>
        </div>
        {children}
      </section>
    </div>
  )
}

export function S74ConversationsHub() {
  const [screenState, setScreenState] = useState<ConversationsState>('default')
  const [activeFilter, setActiveFilter] = useState<ConversationsFilter>('all')
  const [panel, setPanel] = useState<ConversationsPanel>('none')
  const [searchQuery, setSearchQuery] = useState('')
  const [managedThread, setManagedThread] = useState('Aisha Khan')
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [liveStatus, setLiveStatus] = useState('Conversations ready.')
  const lastPanelTrigger = useRef<HTMLElement | null>(null)
  const baseScreenState = useRef<ConversationsState>('default')
  const suppressSearchOpen = useRef(false)
  const loading = screenState === 'skeleton'
  const disabled = screenState === 'disabled'
  const offline = screenState === 'offline'

  useEffect(() => {
    const fixture = new URLSearchParams(window.location.search).get('state')
    if (!isConversationsState(fixture)) return
    const fixtureTimer = window.setTimeout(() => {
      const fixturePanel = panelForState(fixture)
      setScreenState(fixture)
      setPanel(fixturePanel)
      baseScreenState.current = fixturePanel === 'none' ? fixture : 'default'
      setLiveStatus(`Conversations fixture: ${fixture}.`)
    }, 0)
    return () => window.clearTimeout(fixtureTimer)
  }, [])

  const openPanel = (nextPanel: Exclude<ConversationsPanel, 'none'>, thread?: string) => {
    lastPanelTrigger.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    if (panel === 'none') baseScreenState.current = screenState
    if (thread) setManagedThread(thread)
    setConfirmDelete(false)
    setPanel(nextPanel)
    setScreenState(nextPanel)
    setLiveStatus(`${nextPanel} panel opened.`)
  }

  const closePanel = () => {
    const returnFocus = lastPanelTrigger.current
    const returnState = baseScreenState.current
    if (panel === 'search') suppressSearchOpen.current = true
    setPanel('none')
    setScreenState(returnState)
    setSearchQuery('')
    setConfirmDelete(false)
    setLiveStatus('Panel closed.')
    window.setTimeout(() => {
      if (returnFocus?.isConnected) returnFocus.focus()
    }, 0)
  }

  const selectFilter = (filter: ConversationsFilter) => {
    setActiveFilter(filter)
    setLiveStatus(`${filter === 'all' ? 'All conversations' : filter.toUpperCase() === 'CIA' ? 'CIA conversations' : `${filter[0].toUpperCase()}${filter.slice(1)}`} filter selected.`)
  }

  const handleFilterKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const lastIndex = CONVERSATION_FILTERS.length - 1
    const nextIndex = event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? lastIndex
        : event.key === 'ArrowRight'
          ? (index + 1) % CONVERSATION_FILTERS.length
          : (index - 1 + CONVERSATION_FILTERS.length) % CONVERSATION_FILTERS.length
    const nextFilter = CONVERSATION_FILTERS[nextIndex]
    selectFilter(nextFilter)
    document.getElementById(`conversation-filter-${nextFilter}`)?.focus()
  }

  const filteredConversations = conversations.filter(conversation => {
    const filterMatches = activeFilter === 'all' || conversation.kind === activeFilter
    const queryMatches = `${conversation.title} ${conversation.description}`.toLowerCase().includes(searchQuery.trim().toLowerCase())
    return filterMatches && queryMatches
  })

  const clearSearch = () => {
    setSearchQuery('')
    setLiveStatus('Search cleared.')
  }

  return (
    <HifiShell
      atmosphere="cia"
      activeTab="cia"
      header={
        <TopBar
          title="Conversations"
          back={false}
          right={
            <span aria-hidden={panel !== 'none' || undefined} inert={panel !== 'none' || undefined}>
              {disabled
                ? <button type="button" disabled aria-label="Open voice conversation" aria-describedby="conversations-disabled-reason" className="flex h-11 w-11 items-center justify-center rounded-full text-paper-100/40"><Mic size={20} strokeWidth={1.8} /></button>
                : <Link href="/screens/11" aria-label="Open voice conversation" className="focus-ring flex h-11 w-11 items-center justify-center rounded-full text-paper-100/70"><Mic size={20} strokeWidth={1.8} /></Link>}
            </span>
          }
        />
      }
      showTabBar={panel === 'none'}
    >
      <main
        className="relative space-y-4 px-4 pb-20 pt-2"
        data-conversations-state={screenState}
        data-conversations-filter={activeFilter}
        aria-busy={loading || undefined}
        aria-hidden={panel !== 'none' || undefined}
        inert={panel !== 'none' || undefined}
      >
        <p className="sr-only" aria-live="polite" aria-atomic="true">{liveStatus}</p>
        <p id="conversations-disabled-reason" className={disabled ? 'rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[12px] leading-4 text-paper-100/70' : 'sr-only'}>Conversation actions are disabled in this fixture. Existing privacy and safety guidance remains reachable.</p>
        <p id="conversations-loading-reason" className="sr-only">Conversation actions are unavailable while the conversation list is loading.</p>

        {(screenState === 'error' || offline || screenState === 'success') && (
          <div className={`rounded-xl border px-4 py-3 text-[13px] leading-5 ${screenState === 'success' ? 'border-forest-green/30 bg-forest-green/10 text-paper-100' : 'border-brand-orange/30 bg-brand-orange/10 text-paper-100/80'}`}>
            {screenState === 'error' && (
              <div className="flex items-center justify-between gap-3">
                <span>Message refresh failed. Cached conversations remain visible.</span>
                <button type="button" className="focus-ring min-h-11 rounded-pill px-3 font-semibold text-brand-orange" onClick={() => {
                  setScreenState('default')
                  setLiveStatus('Cached conversations refreshed for this preview.')
                }}>Retry</button>
              </div>
            )}
            {offline && 'Offline · cached conversations are 18 minutes old. Reading stays available; starting a conversation is disabled.'}
            {screenState === 'success' && 'Aisha Khan marked read in this local preview.'}
          </div>
        )}

        <GlassCard tone="cia" className="!rounded-[40px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-royal-purple">CIA coach</p>
          {screenState === 'empty' ? (
            <>
              <p className="mt-3 text-[19px] font-medium leading-6 text-paper-100">Catching up on your <span className="text-emphasis">day</span></p>
              <p className="mt-3 text-[13px] leading-5 text-paper-100/70">CIA is still syncing background data. No live-signal count is available yet.</p>
            </>
          ) : (
            <>
              <p className="mt-3 text-[19px] font-medium leading-6 text-paper-100">Recovery, budget, and <span className="text-emphasis">breakfast</span> timing today.</p>
              <p className="mt-3 text-[13px] leading-5 text-paper-100/75"><span className="tabular-nums">3</span> bundled signals · <span className="tabular-nums">1</span> private draft fixture</p>
              <div className="mt-3"><Provenance items={[offline ? 'Via CIA · cached fixture · 18m old' : 'Via CIA · bundled fixture · not live']} /></div>
            </>
          )}
        </GlassCard>

        <div onFocus={() => {
          if (suppressSearchOpen.current) {
            suppressSearchOpen.current = false
            return
          }
          if (!disabled) openPanel('search')
        }}>
          <GlassPillInput
            label="Search conversations"
            icon={<Search size={17} strokeWidth={2} />}
            placeholder="Search people, rooms, CIA memory"
            value=""
            readOnly
            data-focus-opens-dialog="true"
            disabled={disabled || loading}
            aria-describedby={disabled ? 'conversations-disabled-reason' : loading ? 'conversations-loading-reason' : undefined}
          />
        </div>

        <div role="tablist" aria-label="Conversation filters" className="-mx-1 flex gap-1.5 overflow-x-auto px-1">
          {CONVERSATION_FILTERS.map((filter, index) => (
            <button
              key={filter}
              id={`conversation-filter-${filter}`}
              role="tab"
              aria-label={filter === 'cia' ? 'CIA conversations' : undefined}
              aria-selected={activeFilter === filter}
              aria-controls="conversation-filter-panel"
              tabIndex={activeFilter === filter ? 0 : -1}
              type="button"
              disabled={disabled || loading}
              aria-describedby={disabled ? 'conversations-disabled-reason' : loading ? 'conversations-loading-reason' : undefined}
              className={`focus-ring flex min-h-11 shrink-0 items-center justify-center rounded-pill px-4 text-[13px] disabled:opacity-40 ${activeFilter === filter ? 'bg-white/10 font-semibold text-paper-100' : 'font-medium text-paper-100/65'}`}
              onClick={() => selectFilter(filter)}
              onKeyDown={event => handleFilterKeyDown(event, index)}
            >
              {filter === 'cia' ? 'CIA' : `${filter[0].toUpperCase()}${filter.slice(1)}`}
            </button>
          ))}
        </div>

        <div id="conversation-filter-panel" role="tabpanel" aria-labelledby={`conversation-filter-${activeFilter}`}>
        {loading ? (
          <section className="space-y-3" aria-label="Loading conversations">
            <div className="skeleton-block h-16" />
            <div className="skeleton-block h-16" />
            <div className="skeleton-block h-16" />
          </section>
        ) : screenState === 'empty' ? (
          <section className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-center">
            <h2 className="text-[16px] font-semibold text-paper-100">No conversations yet</h2>
            <p className="mt-2 text-[13px] leading-5 text-paper-100/70">Your CIA coach remains available. Start a local destination preview when you are ready.</p>
          </section>
        ) : (
          <>
            <ConversationSection
              title="Pinned"
              conversations={filteredConversations.filter(conversation => conversation.id !== 'run-club')}
              disabled={disabled}
              success={screenState === 'success'}
              onNavigate={title => setLiveStatus(`${title} opened. Its unread state is cleared locally.`)}
              onManage={title => openPanel('manage', title)}
            />
            <ConversationSection
              title="Recent"
              conversations={filteredConversations.filter(conversation => conversation.id === 'run-club')}
              disabled={disabled}
              success={screenState === 'success'}
              onNavigate={title => setLiveStatus(`${title} opened.`)}
              onManage={title => openPanel('manage', title)}
            />
            {filteredConversations.length === 0 && (
              <p className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center text-[13px] text-paper-100/70">No conversations match this filter.</p>
            )}
          </>
        )}
        </div>

        <button
          type="button"
          className="focus-ring flex min-h-11 w-full items-center justify-center gap-2 rounded-pill px-4 text-[13px] text-paper-100/70 disabled:opacity-40"
          disabled={loading}
          aria-describedby={loading ? 'conversations-loading-reason' : undefined}
          aria-expanded={panel === 'safety'}
          onClick={() => openPanel('safety')}
        >
          <ShieldCheck size={16} strokeWidth={1.8} /> Safety and crisis guidance
        </button>

        <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-end">
          <button
            type="button"
            aria-label="Start a new conversation"
            aria-describedby={offline ? 'compose-disabled-reason' : disabled ? 'conversations-disabled-reason' : loading ? 'conversations-loading-reason' : undefined}
            disabled={offline || disabled || loading}
            className="focus-ring pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange text-ink-900 shadow-[var(--glow-orange-sm)] disabled:cursor-not-allowed disabled:bg-cta-disabled disabled:text-cta-disabled-fg disabled:shadow-none"
            onClick={() => openPanel('compose')}
          >
            <Pencil size={20} strokeWidth={2.3} />
          </button>
        </div>
        {offline && <p id="compose-disabled-reason" className="text-center text-[12px] text-paper-100/70">Connect to start a new conversation. Cached threads remain available.</p>}
      </main>

      {panel === 'search' && (
        <FocusedConversationPanel panel="search" onClose={closePanel}>
          <div className="mt-3">
            <GlassPillInput
              id="conversation-search-query"
              label="Search conversations"
              icon={<Search size={17} />}
              placeholder="Search people, rooms, CIA memory"
              value={searchQuery}
              onChange={event => setSearchQuery(event.target.value)}
              autoFocus
              trailing={
                <button type="button" className="focus-ring flex h-11 w-11 items-center justify-center rounded-full text-paper-100/70 disabled:opacity-40" aria-label="Clear search" aria-describedby={!searchQuery ? 'conversation-search-empty-reason' : undefined} disabled={!searchQuery} onClick={clearSearch}>
                  <X size={17} />
                </button>
              }
            />
            <p id="conversation-search-empty-reason" className="sr-only">Enter a search term before clearing the field.</p>
          </div>
          <div className="mt-4 space-y-2" aria-label="Search results">
            {filteredConversations.length > 0 ? filteredConversations.map(conversation => (
              <Link key={conversation.id} href={conversation.href} className="focus-ring flex min-h-14 items-center justify-between rounded-xl border border-white/10 px-3 text-[13px] text-paper-100">
                <span><span className="font-semibold">{conversation.title}</span><span className="mt-0.5 block text-[12px] text-paper-100/70">{conversation.description}</span></span>
                <ChevronRight size={18} className="text-paper-100/60" />
              </Link>
            )) : <p className="rounded-xl border border-white/10 p-4 text-center text-[13px] text-paper-100/70">No matching people, groups or rooms.</p>}
          </div>
        </FocusedConversationPanel>
      )}

      {panel === 'compose' && (
        <FocusedConversationPanel panel="compose" onClose={closePanel}>
          <p className="mt-3 text-[13px] leading-5 text-paper-100/70">Choose a local prototype destination. This sheet does not create a thread, invite contacts or send a message.</p>
          <div className="mt-4 space-y-2">
            <Link href="/screens/75" className="focus-ring flex min-h-14 items-center justify-between rounded-xl border border-white/10 px-4 text-[14px] font-semibold text-paper-100">Preview direct chat <ChevronRight size={18} /></Link>
            <Link href="/screens/76" className="focus-ring flex min-h-14 items-center justify-between rounded-xl border border-white/10 px-4 text-[14px] font-semibold text-paper-100">Preview group chat <ChevronRight size={18} /></Link>
            <Link href="/screens/76" className="focus-ring flex min-h-14 items-center justify-between rounded-xl border border-white/10 px-4 text-[14px] font-semibold text-paper-100">Preview room conversation <ChevronRight size={18} /></Link>
          </div>
          <BtnSecondary className="mt-4 w-full" onClick={closePanel}>Cancel</BtnSecondary>
        </FocusedConversationPanel>
      )}

      {panel === 'manage' && (
        <FocusedConversationPanel panel="manage" onClose={closePanel}>
          <p className="mt-2 text-[13px] text-paper-100/70">{managedThread} · actions stay inside this local preview.</p>
          {confirmDelete ? (
            <div className="mt-4 rounded-xl border border-error-red/50 bg-error-red/10 p-4">
              <p className="text-[13px] leading-5 text-paper-100">Delete only the local unsent draft for {managedThread}? Conversation history and media remain unchanged.</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <BtnSecondary className="w-full" onClick={() => setConfirmDelete(false)}>Cancel</BtnSecondary>
                <BtnDestructive className="w-full px-3" onClick={() => {
                  setConfirmDelete(false)
                  setLiveStatus(`Local draft deletion confirmed for ${managedThread}. No persisted data was changed.`)
                }}>Delete draft</BtnDestructive>
              </div>
            </div>
          ) : (
            <div className="mt-4 space-y-2">
              {['Export conversation preview', 'Revoke CIA memory access', 'Report conversation preview', 'Mute or block preview'].map(action => (
                <BtnGhost key={action} quiet className="w-full justify-start border border-white/10" onClick={() => setLiveStatus(`${action} selected. No external or persisted action occurred.`)}>{action}</BtnGhost>
              ))}
              <BtnGhost quiet className="w-full justify-start border border-white/10 text-error-red" onClick={() => setConfirmDelete(true)}>Delete local draft</BtnGhost>
            </div>
          )}
        </FocusedConversationPanel>
      )}

      {panel === 'safety' && (
        <FocusedConversationPanel panel="safety" onClose={closePanel}>
          <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.04] p-4">
            <ShieldCheck size={20} className="text-paper-100/70" />
            <p className="mt-3 text-[13px] leading-5 text-paper-100/75">If you may be in immediate danger, contact local emergency services. This prototype does not place calls, send texts or share a conversation preview.</p>
          </div>
          <BtnSecondary className="mt-4 w-full" onClick={closePanel}>Done</BtnSecondary>
        </FocusedConversationPanel>
      )}
    </HifiShell>
  )
}

function ConversationSection({
  title,
  conversations: rows,
  disabled,
  success,
  onNavigate,
  onManage,
}: {
  title: string
  conversations: Conversation[]
  disabled: boolean
  success: boolean
  onNavigate: (title: string) => void
  onManage: (title: string) => void
}) {
  if (!rows.length) return null
  return (
    <section className="space-y-2.5">
      <SectionTitle title={title} />
      {rows.map(conversation => {
        const unread = success && conversation.id === 'aisha' ? 0 : conversation.unread
        const kindLabel = conversation.kind === 'people' ? 'direct message' : conversation.kind === 'groups' ? `group chat, ${conversation.members} members` : `room${conversation.domain ? `, linked to ${conversation.domain}` : ''}`
        const accessibleName = `${conversation.title}, ${kindLabel}, ${conversation.time}${unread ? `, ${unread} unread` : ''}`
        return (
          <div key={conversation.id} className="flex min-h-16 items-center gap-1 rounded-xl border border-white/10 bg-white/[0.04] p-2">
            {disabled ? (
              <button type="button" disabled aria-label={accessibleName} aria-describedby="conversations-disabled-reason" className="flex min-h-14 min-w-0 flex-1 items-center gap-3 rounded-lg p-1 text-left opacity-40">
                <ConversationVisual conversation={conversation} />
                <ConversationCopy conversation={conversation} unread={unread} />
              </button>
            ) : (
              <Link href={conversation.href} aria-label={accessibleName} className="focus-ring flex min-h-14 min-w-0 flex-1 items-center gap-3 rounded-lg p-1 text-left" onClick={() => onNavigate(conversation.title)}>
                <ConversationVisual conversation={conversation} />
                <ConversationCopy conversation={conversation} unread={unread} />
              </Link>
            )}
            <button type="button" aria-label={`Manage ${conversation.title}`} aria-describedby={disabled ? 'conversations-disabled-reason' : undefined} disabled={disabled} className="focus-ring flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-paper-100/65 disabled:opacity-40" onClick={() => onManage(conversation.title)}>
              <MoreHorizontal size={18} />
            </button>
          </div>
        )
      })}
    </section>
  )
}

function ConversationVisual({ conversation }: { conversation: Conversation }) {
  if (conversation.kind === 'people') {
    return <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 text-[13px] font-semibold text-brand-orange">{conversation.initials}</span>
  }
  if (conversation.kind === 'groups') {
    return (
      <span className="relative h-10 w-10 shrink-0" aria-hidden="true">
        <span className="absolute right-0 top-0 h-7 w-7 rounded-full border-2 border-ink-900 bg-royal-purple/70" />
        <span className="absolute bottom-0 left-0 h-7 w-7 rounded-full border-2 border-ink-900 bg-forest-green/70" />
      </span>
    )
  }
  return <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-domain-finance/15" aria-hidden="true"><span className="h-4 w-4 rounded-[4px] border border-domain-finance/70" /></span>
}

function ConversationCopy({ conversation, unread }: { conversation: Conversation; unread: number }) {
  return (
    <span className="min-w-0 flex-1">
      <span className="flex items-center justify-between gap-2">
        <span className="truncate text-[14px] font-semibold text-paper-100">{conversation.title}{conversation.members ? <span className="text-paper-100/65"> ({conversation.members})</span> : null}</span>
        <span className="shrink-0 text-[12px] tabular-nums text-paper-100/65">{conversation.time}</span>
      </span>
      <span className="mt-0.5 flex items-center justify-between gap-2">
        <span className="truncate text-[12px] text-paper-100/70">{conversation.description}</span>
        {unread > 0 && <span className="flex min-h-5 min-w-5 items-center justify-center rounded-pill bg-brand-orange px-1.5 text-[11px] font-bold tabular-nums text-ink-900">{unread}</span>}
      </span>
    </span>
  )
}
