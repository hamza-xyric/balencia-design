'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { ChatInputBar } from '@/components/screens/ChatInputBar'
import { SiaChatTopBar } from '@/components/screens/SiaChatTopBar'
import { SiaConversation } from '@/components/screens/SiaConversation'
import { SignalPill } from '@/components/screens/ConversationSuite'

// Screen 09 of 78: SIA chat
// Spec: /Users/hamza/yHealth/app_design 3/09-sia-chat.md

export default function SiaChatScreen() {
  const conversationEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ block: 'end' })
  }, [])

  return (
    <PhoneFrame>
      <ScreenShell
        header={<SiaChatTopBar subtitle="Adaptive coach online" />}
        activeTab="sia"
        composer={<ChatInputBar placeholder="Message SIA" action="mic" />}
      >
        <main className="px-4 py-3">
          <section className="animate-fade-up rounded-xl border border-royal-purple/20 bg-[linear-gradient(145deg,rgba(127,36,255,0.22),rgba(255,94,0,0.08)_48%,rgba(33,16,8,0.92))] p-4 shadow-2">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-eyebrow font-semibold uppercase tracking-[0.12em] text-royal-purple">Live context</p>
                <h2 className="mt-2 text-[19px] font-semibold leading-[24px] text-white">
                  SIA is watching recovery, schedule, and missions together.
                </h2>
              </div>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-royal-purple text-white shadow-[var(--glow-purple)]">
                <Sparkles size={18} strokeWidth={2.2} />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <SignalPill tone="purple">3 signals live</SignalPill>
              <SignalPill tone="orange">42-day streak</SignalPill>
              <SignalPill tone="green">Plan updated</SignalPill>
            </div>
            <Link
              href="/tabs/sia/conversations"
              className="mt-4 inline-flex h-9 items-center gap-2 rounded-pill border border-white/[0.08] bg-white/[0.05] px-3 text-[12px] font-semibold leading-none text-white/70 transition-colors hover:text-white"
            >
              <span>Open conversations hub</span>
              <ArrowUpRight size={14} strokeWidth={2} />
            </Link>
          </section>
          <SiaConversation />
          <div ref={conversationEndRef} />
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
