'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowUp, ArrowUpRight, Mic, Sparkles } from 'lucide-react'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { MessageBubble } from '@/components/screens/MessageBubble'
import { SiaChatTopBar } from '@/components/screens/SiaChatTopBar'
import { SiaConversation } from '@/components/screens/SiaConversation'
import { SuggestionChip } from '@/components/screens/SuggestionChip'
import { VoiceInterfacePanel } from '@/components/screens/VoiceInterfacePanel'
import { SignalPill } from '@/components/screens/ConversationSuite'

// Screen 09 of 78: SIA chat
// Spec: /Users/hamza/yHealth/app_design 3/09-sia-chat.md

export default function SiaChatScreen() {
  const conversationEndRef = useRef<HTMLDivElement>(null)
  const [message, setMessage] = useState('')
  const [sentMessages, setSentMessages] = useState<{ id: string; text: string; sender: 'user' | 'sia' }[]>([])
  const [thinking, setThinking] = useState(false)
  const [voiceMode, setVoiceMode] = useState<'off' | 'permission' | 'listening' | 'ready'>('off')
  const [voiceTranscript, setVoiceTranscript] = useState('')

  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ block: 'end' })
  }, [sentMessages, thinking, voiceMode])

  const send = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setSentMessages((current) => [...current, { id: `u-${Date.now()}`, sender: 'user', text: trimmed }])
    setMessage('')
    setThinking(true)
    window.setTimeout(() => {
      setSentMessages((current) => [
        ...current,
        { id: `s-${Date.now()}`, sender: 'sia', text: 'Got it. I logged the context and updated your next suggested action.' },
      ])
      setThinking(false)
    }, 650)
  }

  const enterVoice = () => {
    setVoiceMode('permission')
    setVoiceTranscript('')
  }

  const allowVoice = () => {
    setVoiceMode('listening')
    setVoiceTranscript('')
    window.setTimeout(() => {
      setVoiceTranscript('I just did thirty minutes of yoga and my energy feels steadier')
      setVoiceMode('ready')
    }, 900)
  }

  const sendVoice = () => {
    send(voiceTranscript || 'Voice note')
    setVoiceMode('off')
  }

  return (
    <PhoneFrame>
      <ScreenShell
        header={<SiaChatTopBar subtitle="Adaptive coach online" />}
        activeTab="sia"
        composer={voiceMode === 'off' ? (
          <form className="px-4 pb-4" onSubmit={(event) => { event.preventDefault(); send(message) }}>
            <label className="sr-only" htmlFor="sia-message">Message SIA</label>
            <div className="relative h-[52px] rounded-pill border border-white/10 bg-ink-brown-800">
              <input
                id="sia-message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Message SIA"
                className="h-full w-full rounded-pill bg-transparent px-4 pr-14 text-[14px] text-white outline-none placeholder:text-white/30"
              />
              {message.trim() ? (
                <button type="submit" className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-brand-orange text-white shadow-[var(--glow-orange)]" aria-label="Send message">
                  <ArrowUp size={16} strokeWidth={2.4} />
                </button>
              ) : (
                <button type="button" onClick={enterVoice} className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 text-white/60" aria-label="Voice input. Tap for in-chat voice.">
                  <Mic size={18} strokeWidth={1.9} />
                </button>
              )}
            </div>
          </form>
        ) : undefined}
      >
        <main className="px-4 py-3">
          <section className="animate-fade-up rounded-xl border border-royal-purple/20 bg-[linear-gradient(145deg,rgba(127,36,255,0.22),rgba(255,94,0,0.08)_48%,rgba(33,16,8,0.92))] p-4 shadow-2">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-eyebrow font-semibold uppercase tracking-[0.12em] text-royal-purple">Live context</p>
                <h2 className="mt-2 text-[19px] font-semibold leading-[24px] text-white">
                  SIA has recovery, schedule, and missions in view.
                </h2>
              </div>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-royal-purple text-white shadow-[var(--glow-purple)]">
                <Sparkles size={18} strokeWidth={2.2} />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <SignalPill tone="purple">3 opted-in signals</SignalPill>
              <SignalPill tone="orange">42-day streak</SignalPill>
              <SignalPill tone="green">Plan updated</SignalPill>
            </div>
            <Link
              href="/tabs/sia/conversations"
              className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-pill border border-white/[0.08] bg-white/[0.05] px-3 text-[12px] font-semibold leading-none text-white/70 transition-colors hover:text-white"
            >
              <span>Open conversations hub</span>
              <ArrowUpRight size={14} strokeWidth={2} />
            </Link>
          </section>
          <SiaConversation showSuggestions={false} />
          {sentMessages.map((item) => (
            <div key={item.id} className="mt-4">
              <MessageBubble sender={item.sender}>{item.text}</MessageBubble>
            </div>
          ))}
          {thinking && (
            <div className="mt-4 pl-8 text-caption leading-[18px] text-white/40" role="status">
              SIA is thinking...
            </div>
          )}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 pl-8 hide-scrollbar">
            {['Tell me more', 'Show my missions', 'Log a meal'].map((label) => (
              <SuggestionChip key={label} onClick={() => send(label)} className="min-h-11">
                {label}
              </SuggestionChip>
            ))}
            <Link href="/tabs/goals/detail" className="inline-flex min-h-11 shrink-0 items-center rounded-pill border border-brand-orange/30 bg-ink-brown-800 px-3 text-[14px] font-semibold text-brand-orange">
              View mission
            </Link>
            <Link href="/domains/workout" className="inline-flex min-h-11 shrink-0 items-center rounded-pill bg-brand-orange px-3 text-[14px] font-semibold text-white">
              Start workout
            </Link>
          </div>
          <div ref={conversationEndRef} />
        </main>
        {voiceMode !== 'off' && (
          <div className="absolute inset-x-3 bottom-[104px] z-40">
            {voiceMode === 'permission' ? (
              <section className="rounded-xl border border-white/[0.08] bg-ink-brown-800 px-6 py-5 shadow-3">
                <p className="text-[15px] font-semibold text-white">Allow microphone for voice input?</p>
                <p className="mt-2 text-caption leading-[18px] text-white/50">
                  Nothing starts until you allow it. Raw audio is discarded, and this transcript can be edited or deleted before it becomes SIA memory. It is not used for model training or human review.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button type="button" onClick={() => setVoiceMode('off')} className="h-12 rounded-pill border border-white/[0.08] text-[15px] font-semibold text-white/60">Cancel</button>
                  <button type="button" onClick={allowVoice} className="h-12 rounded-pill bg-brand-orange text-[15px] font-semibold text-white">Allow</button>
                </div>
              </section>
            ) : (
              <VoiceInterfacePanel
                readyToSend={voiceMode === 'ready'}
                status={voiceMode === 'ready' ? 'transcript ready' : 'listening...'}
                transcript={voiceMode === 'ready' ? voiceTranscript : ''}
                onCancel={() => setVoiceMode('off')}
                onPrimary={sendVoice}
              />
            )}
          </div>
        )}
      </ScreenShell>
    </PhoneFrame>
  )
}
