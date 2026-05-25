import Link from 'next/link'
import { AudioLines, Plus, Search, Sparkles } from 'lucide-react'
import { Chip } from '@/components/design-system/Chip'
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

function ConversationsHeader() {
  return (
    <Header
      title="Conversations"
      rightAction={
        <div className="flex items-center gap-1">
          <button className="flex h-11 w-11 items-center justify-center text-white/50" aria-label="Search conversations">
            <Search size={20} strokeWidth={1.8} />
          </button>
          <button className="flex h-11 w-11 items-center justify-center text-royal-purple" aria-label="Start voice coaching">
            <AudioLines size={21} strokeWidth={1.9} />
          </button>
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
      className="block animate-fade-up rounded-xl border border-royal-purple/25 bg-[radial-gradient(circle_at_88%_18%,rgba(127,36,255,0.38),transparent_34%),linear-gradient(145deg,rgba(127,36,255,0.18),rgba(33,16,8,0.96)_62%)] p-4 shadow-2"
    >
      <div className="flex items-start gap-3">
        <ConversationAvatar
          initials={sia.initials}
          domain={sia.domain}
          active={sia.active}
          isSia
          size="large"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-eyebrow font-semibold uppercase tracking-[0.12em] text-royal-purple">Pinned coach</p>
              <h2 className="mt-1 text-[20px] font-semibold leading-[26px] text-white">SIA coach</h2>
            </div>
            <Sparkles size={20} className="text-royal-purple" strokeWidth={2.2} />
          </div>
          <p className="mt-2 text-[13px] leading-[19px] text-white/60">
            Recovery, budget stress, and breakfast timing are moving together today.
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <SignalPill tone="purple">3 live signals</SignalPill>
        <SignalPill tone="orange">1 draft plan</SignalPill>
        <SignalPill tone="green">Ready to call</SignalPill>
      </div>
    </Link>
  )
}

function FilterRail() {
  return (
    <div className="-mx-4 overflow-x-auto px-4 pb-1 hide-scrollbar">
      <div className="flex gap-2">
        {conversationFilters.map((filter, index) => (
          <Chip key={filter} selected={index === 0}>
            {filter}
          </Chip>
        ))}
      </div>
    </div>
  )
}

function NewChatButton() {
  return (
    <button
      type="button"
      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-pill bg-brand-orange px-5 text-[15px] font-semibold leading-5 text-white shadow-[var(--glow-orange)] transition-transform duration-[var(--dur-fast)] active:scale-[0.96]"
    >
      <Plus size={17} strokeWidth={2.4} />
      <span>Start new chat</span>
    </button>
  )
}

export default function ConversationsHubScreen() {
  const pinned = conversationPreviews.filter((conversation) => conversation.pinned && conversation.kind !== 'sia')
  const recent = conversationPreviews.filter((conversation) => !conversation.pinned && conversation.kind !== 'sia')

  return (
    <PhoneFrame>
      <ScreenShell header={<ConversationsHeader />} activeTab="sia" bottomAction={<NewChatButton />}>
        <main className="space-y-5 px-4 pb-6 pt-4">
          <SiaHero />
          <SearchBar placeholder="Search people, rooms, and SIA memory" />
          <FilterRail />

          <section className="animate-fade-up" style={{ animationDelay: '80ms' }}>
            <SectionHeader title="Pinned" />
            <div className="space-y-3">
              {pinned.map((conversation) => (
                <ConversationRow key={conversation.id} conversation={conversation} />
              ))}
            </div>
          </section>

          <section className="animate-fade-up" style={{ animationDelay: '150ms' }}>
            <SectionHeader title="Recent" />
            <div className="space-y-3">
              {recent.map((conversation) => (
                <ConversationRow key={conversation.id} conversation={conversation} />
              ))}
            </div>
          </section>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
