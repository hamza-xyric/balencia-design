'use client'

import Link from 'next/link'
import { Info, Phone, Sparkles } from 'lucide-react'
import { useState } from 'react'
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
import type { ConversationThreadMessage } from '@/data/mock'

// Screen 75 of 82: Direct chat

function DirectHeader({ onCall, onInfo }: { onCall: () => void; onInfo: () => void }) {
  return (
    <Header
      showBack
      backHref="/tabs/sia/conversations"
      title="Aisha Khan"
      rightAction={
        <div className="flex items-center gap-1">
          <button className="flex h-11 w-11 items-center justify-center text-white/50" aria-label="Start call" onClick={onCall}>
            <Phone size={19} strokeWidth={1.9} />
          </button>
          <button className="flex h-11 w-11 items-center justify-center text-white/50" aria-label="Conversation info" onClick={onInfo}>
            <Info size={19} strokeWidth={1.9} />
          </button>
        </div>
      }
    />
  )
}

function CoachingStrip({
  assistEnabled,
  onOpenOptions,
}: {
  assistEnabled: boolean
  onOpenOptions: () => void
}) {
  return (
    <section className="animate-fade-up rounded-xl border border-royal-purple/20 bg-ink-brown-800 p-4 shadow-1">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-royal-purple text-white shadow-[var(--glow-purple)]">
          <Sparkles size={18} strokeWidth={2.2} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-eyebrow font-semibold uppercase tracking-[0.12em] text-royal-purple">SIA assist</p>
          <p className="mt-2 text-[13px] leading-[19px] text-white/65">
            SIA can suggest replies only after you opt in. Summaries and mission saves ask again before storing private chat context.
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={onOpenOptions} className="h-11 rounded-pill border border-royal-purple/25 bg-royal-purple/10 px-3 text-[11px] font-semibold text-royal-purple" aria-pressed={assistEnabled}>
          {assistEnabled ? 'Review SIA options' : 'Enable SIA assist'}
        </button>
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
  const [draft, setDraft] = useState('')
  const [messages, setMessages] = useState<ConversationThreadMessage[]>(directConversationMessages)
  const [status, setStatus] = useState('Private thread. SIA cannot read new messages unless assist is enabled.')
  const [panel, setPanel] = useState<'call' | 'info' | 'assist' | null>(null)
  const [assistEnabled, setAssistEnabled] = useState(false)

  const sendMessage = () => {
    const text = draft.trim()
    if (!text) return
    setMessages((current) => [
      ...current,
      {
        id: `direct-local-${current.length + 1}`,
        sender: 'user',
        author: 'You',
        avatar: 'A',
        text,
        timestamp: 'now',
        status: navigator.onLine ? 'sent' : undefined,
      },
    ])
    setDraft('')
    setStatus(navigator.onLine ? 'Message sent. SIA still needs your explicit assist choice before reading it.' : 'Offline. Message queued and will retry automatically.')
  }

  const runAssistAction = (message: string) => {
    setAssistEnabled(true)
    setStatus(message)
    setPanel(null)
  }

  return (
    <PhoneFrame>
      <ScreenShell
        header={<DirectHeader onCall={() => setPanel('call')} onInfo={() => setPanel('info')} />}
        activeTab="sia"
        composer={<ChatInputBar placeholder="Message Aisha" action="send" value={draft} onValueChange={setDraft} onSend={sendMessage} />}
      >
        <main className="space-y-4 px-4 pb-4 pt-4">
          <ProfileRail />
          <CoachingStrip assistEnabled={assistEnabled} onOpenOptions={() => setPanel('assist')} />

          <div className="flex items-center gap-3 py-1">
            <div className="h-px flex-1 bg-white/[0.05]" />
            <span className="text-[12px] leading-4 text-white/30">Today</span>
            <div className="h-px flex-1 bg-white/[0.05]" />
          </div>

          <section className="space-y-4">
            {messages.map((message, index) => (
              <div key={message.id} className="animate-fade-up" style={{ animationDelay: `${index * 70}ms` }}>
                {message.id === 'direct-4' ? (
                  <Link href="/tabs/sia/message-actions" className="block rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange" aria-label="Open message actions for Aisha's route photo">
                    <ThreadMessage message={message} />
                  </Link>
                ) : (
                  <ThreadMessage message={message} />
                )}
              </div>
            ))}
          </section>

          <TypingIndicator label="Aisha is looking at the route photo" />
          <p className="text-caption leading-[18px] text-white/40" aria-live="polite">{status}</p>
        </main>
        {panel && (
          <section className="absolute inset-x-0 bottom-0 z-40 rounded-t-xl border border-white/[0.06] bg-ink-brown-800 px-4 pb-8 pt-3 shadow-3 animate-fade-up" role="dialog" aria-label={panel === 'call' ? 'Call setup' : panel === 'assist' ? 'SIA assist options' : 'Conversation info'}>
            <div className="mx-auto mb-4 h-1 w-9 rounded-pill bg-white/20" />
            <h2 className="text-h3 font-semibold leading-[22px] text-white">{panel === 'call' ? 'Start a private call?' : panel === 'assist' ? 'Choose what SIA can help with' : 'Thread privacy'}</h2>
            <p className="mt-2 text-caption leading-[18px] text-white/55">
              {panel === 'call'
                ? 'Calls stay between you and Aisha unless you explicitly invite SIA to summarize afterward.'
                : panel === 'assist'
                  ? 'SIA can read only the selected context for the action you choose. It will ask again before saving anything to memory or missions.'
                  : 'Aisha can see this thread. SIA sees only messages you select for assist, summarize, or mission-save actions.'}
            </p>
            {panel === 'assist' ? (
              <div className="mt-5 grid gap-2">
                <button className="h-11 rounded-pill bg-brand-orange text-[15px] font-semibold text-white" onClick={() => runAssistAction('SIA assist enabled for a suggested reply. Private chat memory remains off.')}>
                  Suggest reply
                </button>
                <button className="h-11 rounded-pill border border-white/[0.06] bg-white/[0.04] text-[15px] font-semibold text-white/70" onClick={() => runAssistAction('SIA will summarize only selected messages, then ask before saving.')}>
                  Summarize selected
                </button>
                <button className="h-11 rounded-pill border border-white/[0.06] bg-white/[0.04] text-[15px] font-semibold text-white/70" onClick={() => runAssistAction('Mission save staged. Review the update before it reaches your mission.')}>
                  Save to mission
                </button>
                <button className="h-11 rounded-pill text-caption font-semibold text-white/45" onClick={() => setPanel(null)}>
                  Not now
                </button>
              </div>
            ) : (
              <button className="mt-5 h-11 w-full rounded-pill bg-brand-orange text-[15px] font-semibold text-white" onClick={() => setPanel(null)}>
                {panel === 'call' ? 'Set up call' : 'Done'}
              </button>
            )}
          </section>
        )}
      </ScreenShell>
    </PhoneFrame>
  )
}
