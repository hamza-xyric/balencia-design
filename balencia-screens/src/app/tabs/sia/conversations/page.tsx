'use client'

import Link from 'next/link'
import { AudioLines, Plus, Search, Sparkles } from 'lucide-react'
import { useMemo, useState } from 'react'
import { SearchBar } from '@/components/design-system/SearchBar'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import {
  ConversationAvatar,
  ConversationRow,
  SignalPill,
} from '@/components/screens/ConversationSuite'
import { SectionHeader } from '@/components/screens/SectionHeader'
import { conversationFilters, conversationPreviews } from '@/data/mock'

// Screen 74 of 82: Conversations hub

function ConversationsHeader({ onSearchFocus }: { onSearchFocus: () => void }) {
  return (
    <Header
      title="Conversations"
      rightAction={
        <div className="flex items-center gap-1">
          <button className="flex h-11 w-11 items-center justify-center text-white/50" aria-label="Search conversations" onClick={onSearchFocus}>
            <Search size={20} strokeWidth={1.8} />
          </button>
          <Link href="/tabs/sia/voice-fullscreen" className="flex h-11 w-11 items-center justify-center text-royal-purple" aria-label="Start voice coaching">
            <AudioLines size={21} strokeWidth={1.9} />
          </Link>
        </div>
      }
    />
  )
}

function SiaHero() {
  const sia = conversationPreviews[0]

  return (
    <Link
      href="/tabs/sia"
      className="block animate-fade-up rounded-xl border border-royal-purple/25 bg-[radial-gradient(circle_at_88%_18%,rgba(127,36,255,0.34),transparent_32%),linear-gradient(145deg,rgba(127,36,255,0.18),rgba(33,16,8,0.96)_62%)] p-3 shadow-2"
    >
      <div className="flex items-start gap-3">
        <ConversationAvatar
          initials={sia.initials}
          domain={sia.domain}
          active={sia.active}
          isSia
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-eyebrow font-semibold uppercase tracking-[0.12em] text-royal-purple">Pinned coach</p>
              <h2 className="mt-0.5 text-[18px] font-semibold leading-[23px] text-white">SIA coach</h2>
            </div>
            <Sparkles size={20} className="text-royal-purple" strokeWidth={2.2} />
          </div>
          <p className="mt-1.5 text-[13px] leading-[18px] text-white/60">
            Today: recovery, budget stress, and breakfast timing are linked.
          </p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <SignalPill tone="purple">3 live signals</SignalPill>
        <SignalPill tone="orange">1 draft plan</SignalPill>
        <SignalPill tone="green">Ready to call</SignalPill>
      </div>
    </Link>
  )
}

function FilterRail({ active, onChange }: { active: string; onChange: (filter: string) => void }) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 pb-1 hide-scrollbar">
      <div className="flex gap-2" role="tablist" aria-label="Conversation filters">
        {conversationFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            role="tab"
            aria-selected={filter === active}
            onClick={() => onChange(filter)}
            className={[
              'flex h-11 shrink-0 items-center rounded-pill border px-4 text-caption font-semibold leading-[18px] transition-transform duration-[var(--dur-fast)] active:scale-95',
              filter === active
                ? 'border-brand-orange bg-brand-orange text-white'
                : 'border-white/10 bg-ink-brown-800 text-white/60',
            ].join(' ')}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  )
}

function NewChatButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-pill bg-brand-orange px-5 text-[15px] font-semibold leading-5 text-white shadow-[var(--glow-orange)] transition-transform duration-[var(--dur-fast)] active:scale-[0.96]"
    >
      <Plus size={17} strokeWidth={2.4} />
      <span>Start new chat</span>
    </button>
  )
}

export default function ConversationsHubScreen() {
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')
  const [pickerOpen, setPickerOpen] = useState(false)

  const filteredConversations = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    const kindFilter = activeFilter === 'People' ? 'direct' : activeFilter === 'Groups' ? 'group' : activeFilter === 'Rooms' ? 'room' : activeFilter.toLowerCase()
    return conversationPreviews
      .filter((conversation) => conversation.kind !== 'sia')
      .filter((conversation) => activeFilter === 'All' || conversation.kind === kindFilter)
      .filter((conversation) => !normalized || `${conversation.name} ${conversation.subtitle}`.toLowerCase().includes(normalized))
  }, [activeFilter, query])

  const pinned = filteredConversations.filter((conversation) => conversation.pinned)
  const recent = filteredConversations.filter((conversation) => !conversation.pinned)

  return (
    <PhoneFrame>
      <ScreenShell
        header={<ConversationsHeader onSearchFocus={() => document.getElementById('conversation-search')?.focus()} />}
        activeTab="sia"
        bottomAction={<NewChatButton onClick={() => setPickerOpen(true)} />}
      >
        <main className="space-y-4 px-4 pb-6 pt-3">
          <SiaHero />
          <SearchBar id="conversation-search" placeholder="Search people, rooms, and SIA memory" value={query} onValueChange={setQuery} showClear={query.length > 0} />
          <FilterRail active={activeFilter} onChange={setActiveFilter} />

          <section className="animate-fade-up" style={{ animationDelay: '80ms' }}>
            <SectionHeader title="Pinned" />
            <div className="space-y-3">
              {pinned.map((conversation) => (
                <ConversationRow key={conversation.id} conversation={conversation} />
              ))}
              {pinned.length === 0 && <p className="text-caption leading-[18px] text-white/40">No pinned conversations match this filter.</p>}
            </div>
          </section>

          <section className="animate-fade-up" style={{ animationDelay: '150ms' }}>
            <SectionHeader title="Recent" />
            <div className="space-y-3">
              {recent.map((conversation) => (
                <ConversationRow key={conversation.id} conversation={conversation} />
              ))}
              {recent.length === 0 && <p className="text-caption leading-[18px] text-white/40">No recent conversations found.</p>}
            </div>
          </section>
        </main>
        {pickerOpen && (
          <section className="absolute inset-x-0 bottom-0 z-40 rounded-t-xl border border-white/[0.06] bg-ink-brown-800 px-4 pb-8 pt-3 shadow-3 animate-fade-up" role="dialog" aria-label="Start new conversation">
            <div className="mx-auto mb-4 h-1 w-9 rounded-pill bg-white/20" />
            <h2 className="text-h3 font-semibold leading-[22px] text-white">Start new conversation</h2>
            <div className="mt-4 grid gap-2">
              <Link href="/tabs/sia/direct" className="flex h-12 items-center rounded-lg border border-white/[0.06] px-4 text-[15px] font-semibold text-white">Message a trusted contact</Link>
              <Link href="/tabs/sia/group" className="flex h-12 items-center rounded-lg border border-white/[0.06] px-4 text-[15px] font-semibold text-white">Create group thread</Link>
              <Link href="/tabs/sia/voice-fullscreen" className="flex h-12 items-center rounded-lg border border-royal-purple/20 px-4 text-[15px] font-semibold text-royal-purple">Start voice coaching</Link>
              <button type="button" className="h-11 text-caption font-semibold text-white/50" onClick={() => setPickerOpen(false)}>Cancel</button>
            </div>
          </section>
        )}
      </ScreenShell>
    </PhoneFrame>
  )
}
