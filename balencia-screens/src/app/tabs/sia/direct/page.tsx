import { Info, Phone, Sparkles } from 'lucide-react'
import { ChatInputBar } from '@/components/screens/ChatInputBar'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import {
  ConversationAvatar,
  SignalPill,
  ThreadMessage,
  TypingIndicator,
} from '@/components/screens/ConversationSuite'
import { directConversationMessages } from '@/data/mock'

// Screen 75 of 82: Direct chat

function DirectHeader() {
  return (
    <Header
      showBack
      title="Aisha Khan"
      rightAction={
        <div className="flex items-center gap-1">
          <button className="flex h-11 w-11 items-center justify-center text-white/50" aria-label="Start call">
            <Phone size={19} strokeWidth={1.9} />
          </button>
          <button className="flex h-11 w-11 items-center justify-center text-white/50" aria-label="Conversation info">
            <Info size={19} strokeWidth={1.9} />
          </button>
        </div>
      }
    />
  )
}

function CoachingStrip() {
  return (
    <section className="animate-fade-up rounded-xl border border-royal-purple/20 bg-ink-brown-800 p-4 shadow-1">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-royal-purple text-white shadow-[var(--glow-purple)]">
          <Sparkles size={18} strokeWidth={2.2} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-eyebrow font-semibold uppercase tracking-[0.12em] text-royal-purple">SIA assist</p>
          <p className="mt-2 text-[13px] leading-[19px] text-white/65">
            SIA can suggest pacing, summarize decisions, and convert this thread into a mission update.
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <SignalPill tone="purple">Pace context</SignalPill>
        <SignalPill tone="green">Shared mission</SignalPill>
        <SignalPill tone="muted">Private chat</SignalPill>
      </div>
    </section>
  )
}

function ProfileRail() {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.03] p-3">
      <ConversationAvatar initials="AK" domain="fitness" active size="large" />
      <div className="min-w-0 flex-1">
        <h2 className="text-[15px] font-semibold leading-5 text-white">Aisha is training with you</h2>
        <p className="mt-1 text-[12px] leading-4 text-white/45">
          Shared mission: Run a half marathon
        </p>
      </div>
    </div>
  )
}

export default function DirectChatScreen() {
  return (
    <PhoneFrame>
      <ScreenShell
        header={<DirectHeader />}
        activeTab="sia"
        composer={<ChatInputBar placeholder="Message Aisha" action="send" />}
      >
        <main className="space-y-4 px-4 pb-4 pt-4">
          <ProfileRail />
          <CoachingStrip />

          <div className="flex items-center gap-3 py-1">
            <div className="h-px flex-1 bg-white/[0.05]" />
            <span className="text-[12px] leading-4 text-white/30">Today</span>
            <div className="h-px flex-1 bg-white/[0.05]" />
          </div>

          <section className="space-y-4">
            {directConversationMessages.map((message, index) => (
              <div key={message.id} className="animate-fade-up" style={{ animationDelay: `${index * 70}ms` }}>
                <ThreadMessage message={message} />
              </div>
            ))}
          </section>

          <TypingIndicator label="Aisha is looking at the route photo" />
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
