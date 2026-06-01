'use client'

import Link from 'next/link'
import { Info, Plus, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { ChatInputBar } from '@/components/screens/ChatInputBar'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import {
  MembersRail,
  SignalPill,
  ThreadMessage,
  TypingIndicator,
} from '@/components/screens/ConversationSuite'
import { groupConversationMessages } from '@/data/mock'
import type { ConversationThreadMessage } from '@/data/mock'

// Screen 76 of 82: Group chat

function GroupHeader({ onAdd, onInfo }: { onAdd: () => void; onInfo: () => void }) {
  return (
    <Header
      showBack
      backHref="/tabs/sia/conversations"
      title="Morning crew"
      rightAction={
        <div className="flex items-center gap-1">
          <button className="flex h-11 w-11 items-center justify-center text-white/50" aria-label="Add member" onClick={onAdd}>
            <Plus size={20} strokeWidth={1.9} />
          </button>
          <button className="flex h-11 w-11 items-center justify-center text-white/50" aria-label="Group info" onClick={onInfo}>
            <Info size={19} strokeWidth={1.9} />
          </button>
        </div>
      }
    />
  )
}

function GroupMissionCard() {
  return (
    <Link href="/tabs/goals/detail" className="block animate-fade-up rounded-xl border border-domain-fitness/25 bg-[linear-gradient(145deg,rgba(239,68,68,0.16),rgba(33,16,8,0.94)_62%)] p-4 shadow-2">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-eyebrow font-semibold uppercase tracking-[0.12em] text-domain-fitness">Room mission</p>
          <h2 className="mt-2 text-[19px] font-semibold leading-[24px] text-white">Tempo run together</h2>
          <p className="mt-2 text-[13px] leading-[19px] text-white/55">
            Two pace groups, one shared XP target, and aggregate SIA pacing unless members opt in.
          </p>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-domain-fitness/20 text-domain-fitness">
          <Sparkles size={18} strokeWidth={2.2} />
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <SignalPill tone="orange">120 group XP</SignalPill>
        <SignalPill tone="green">4 joining</SignalPill>
        <SignalPill tone="purple">Aggregate SIA pacing</SignalPill>
      </div>
    </Link>
  )
}

function MemberSummary() {
  return (
    <section className="animate-fade-up rounded-lg border border-white/[0.06] bg-white/[0.03] p-3" style={{ animationDelay: '80ms' }}>
      <div className="flex items-center justify-between gap-3">
        <MembersRail
          members={[
            { initials: 'S', domain: 'fitness', active: true },
            { initials: 'O', domain: 'wellbeing' },
            { initials: 'AK', domain: 'fitness', active: true },
            { initials: 'A', domain: 'fitness', active: true },
          ]}
        />
        <div className="text-right">
          <p className="text-[13px] font-semibold leading-[18px] text-white">5 members</p>
          <p className="mt-0.5 text-[11px] leading-[14px] text-white/40">3 online now</p>
        </div>
      </div>
    </section>
  )
}

export default function GroupChatScreen() {
  const safeInitialMessages = groupConversationMessages.map((message) => (
    message.id === 'group-2'
      ? { ...message, text: 'Based on opt-in group signals, SIA suggests two pace groups. No member health data is named without permission.' }
      : message
  ))
  const [draft, setDraft] = useState('')
  const [messages, setMessages] = useState<ConversationThreadMessage[]>(safeInitialMessages)
  const [panel, setPanel] = useState<'add' | 'info' | 'members' | null>(null)
  const [status, setStatus] = useState('SIA group insights use aggregate signals unless each member opts in.')

  const sendMessage = () => {
    const text = draft.trim()
    if (!text) return
    setMessages((current) => [
      ...current,
      {
        id: `group-local-${current.length + 1}`,
        sender: 'user',
        author: 'You',
        avatar: 'A',
        text,
        timestamp: 'now',
        status: navigator.onLine ? 'sent' : undefined,
      },
    ])
    setDraft('')
    setStatus(navigator.onLine ? 'Message sent to Morning crew.' : 'Offline. Message queued and will retry automatically.')
  }

  return (
    <PhoneFrame>
      <ScreenShell
        header={<GroupHeader onAdd={() => setPanel('add')} onInfo={() => setPanel('info')} />}
        activeTab="sia"
        composer={<ChatInputBar placeholder="Message Morning crew" action="send" value={draft} onValueChange={setDraft} onSend={sendMessage} />}
      >
        <main className="space-y-4 px-4 pb-4 pt-4">
          <GroupMissionCard />
          <button type="button" className="block w-full text-left" onClick={() => setPanel('members')} aria-label="Open Morning crew member list"><MemberSummary /></button>

          <div className="flex items-center gap-3 py-1">
            <div className="h-px flex-1 bg-white/[0.05]" />
            <span className="text-[12px] leading-4 text-white/30">Today</span>
            <div className="h-px flex-1 bg-white/[0.05]" />
          </div>

          <section className="space-y-4">
            {messages.map((message, index) => (
              <div key={message.id} className="animate-fade-up" style={{ animationDelay: `${index * 70}ms` }}>
                {message.id === 'group-2' ? (
                  <Link href="/tabs/sia/message-actions" className="block rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-royal-purple" aria-label="Open message actions for SIA group pacing note">
                    <ThreadMessage message={message} />
                  </Link>
                ) : (
                  <ThreadMessage message={message} />
                )}
              </div>
            ))}
          </section>

          <TypingIndicator label="SIA is preparing pace groups" />
          <p className="text-caption leading-[18px] text-white/40" aria-live="polite">{status}</p>
        </main>
        {panel && (
          <section className="absolute inset-x-0 bottom-0 z-40 rounded-t-xl border border-white/[0.06] bg-ink-brown-800 px-4 pb-8 pt-3 shadow-3 animate-fade-up" role="dialog" aria-label="Group controls">
            <div className="mx-auto mb-4 h-1 w-9 rounded-pill bg-white/20" />
            <h2 className="text-h3 font-semibold leading-[22px] text-white">
              {panel === 'add' ? 'Add member' : panel === 'members' ? 'Members' : 'Group privacy'}
            </h2>
            <p className="mt-2 text-caption leading-[18px] text-white/55">
              {panel === 'add'
                ? 'Invite a trusted contact to this mission room.'
                : 'Members can see messages and opted-in group mission progress. Health and recovery signals stay aggregate by default.'}
            </p>
            {panel === 'info' ? (
              <div className="mt-5 grid gap-2">
                <button className="h-11 rounded-pill bg-brand-orange text-[15px] font-semibold text-white" onClick={() => { setStatus('Group insights remain aggregate. No member health data is named.'); setPanel(null) }}>
                  Keep aggregate only
                </button>
                <button className="h-11 rounded-pill border border-white/[0.06] bg-white/[0.04] text-[15px] font-semibold text-white/70" onClick={() => { setStatus('Member opt-in requests prepared. SIA waits for each person before showing individual signals.'); setPanel(null) }}>
                  Request member opt-ins
                </button>
              </div>
            ) : (
              <button className="mt-5 h-11 w-full rounded-pill bg-brand-orange text-[15px] font-semibold text-white" onClick={() => setPanel(null)}>
                {panel === 'add' ? 'Send invite' : 'Done'}
              </button>
            )}
          </section>
        )}
      </ScreenShell>
    </PhoneFrame>
  )
}
