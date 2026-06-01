'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowUp } from 'lucide-react'
import { ContinuousStroke } from '@/components/design-system/ContinuousStroke'
import { domainToneClasses } from '@/components/design-system/Chip'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { MessageBubble } from '@/components/screens/MessageBubble'
import { SuggestionChip } from '@/components/screens/SuggestionChip'
import type { DomainKey } from '@/data/domains'

// Screen 07 of 78: SIA onboarding
// Spec: /Users/hamza/yHealth/app_design 3/07-sia-onboarding-conversation.md

const visualDomains: { label: string; domain: DomainKey; selected?: boolean }[] = [
  { label: 'Fitness', domain: 'fitness', selected: true },
  { label: 'Nutrition', domain: 'nutrition' },
  { label: 'Finance', domain: 'finance', selected: true },
  { label: 'Career', domain: 'career' },
  { label: 'Wellbeing', domain: 'wellbeing', selected: true },
  { label: 'Sleep', domain: 'sleep' },
  { label: 'Faith', domain: 'faith' },
  { label: 'Learning', domain: 'learning' },
  { label: 'Creative', domain: 'creativity' },
]

type Message = { id: string; sender: 'sia' | 'user'; text: string }

const initialMessages: Message[] = [
  { id: 'm1', sender: 'sia', text: "Hey Amira. I'm SIA, your personal coach." },
  { id: 'm2', sender: 'sia', text: "I'm here to help you see your life as one connected system." },
  { id: 'm3', sender: 'user', text: 'Fitness, finance, and wellbeing matter most right now.' },
  { id: 'm4', sender: 'sia', text: 'Good. What would make the next 90 days feel meaningful?' },
]

const suggestions = [
  'Run a half marathon',
  'Save $5,000',
  'Sleep better',
  'Something else',
]

function DomainBubble({ label, domain, selected }: { label: string; domain: DomainKey; selected?: boolean }) {
  const tone = domainToneClasses[domain]

  return (
    <div className="flex min-w-0 flex-col items-center">
      <div
        className={[
          'flex h-11 w-11 items-center justify-center rounded-full border text-small font-semibold text-white shadow-1',
          selected ? `${tone.selected} shadow-[var(--glow-orange)]` : `${tone.border} ${tone.subtle}`,
        ].join(' ')}
      >
        {label.slice(0, 2)}
      </div>
      <span className="mt-1 max-w-[58px] truncate text-center text-[10px] font-semibold leading-3 text-white/60">
        {label}
      </span>
    </div>
  )
}

function MissionPreviewCard({ children, tone }: { children: React.ReactNode; tone: string }) {
  return (
    <div className={['rounded-sm border border-white/[0.06] bg-ink-brown-800 px-3 py-2 text-caption leading-[18px] text-white shadow-1', tone].join(' ')}>
      {children}
    </div>
  )
}

function ProgressDots({ step }: { step: number }) {
  return (
    <div className="flex h-6 items-center gap-2 px-4">
      {Array.from({ length: 7 }).map((_, index) => {
        const dot = index < step ? 'filled' : index === step ? 'current' : 'empty'

        return (
        <span
          key={index}
          className={[
            'rounded-full transition-all duration-[var(--dur-base)]',
            dot === 'current'
              ? 'h-2 w-2 bg-brand-orange shadow-[var(--glow-orange)]'
              : dot === 'filled'
                ? 'h-1.5 w-1.5 bg-brand-orange'
                : 'h-1.5 w-1.5 border border-white/20',
          ].join(' ')}
        />
        )
      })}
    </div>
  )
}

export default function SiaOnboardingScreen() {
  const router = useRouter()
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [generating, setGenerating] = useState(false)
  const [step, setStep] = useState(2)
  const sentCount = useMemo(() => messages.filter((message) => message.sender === 'user').length, [messages])

  const sendMessage = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || generating) return

    setInput('')
    setMessages((current) => [...current, { id: `user-${Date.now()}`, sender: 'user', text: trimmed }])
    setStep((current) => Math.min(current + 1, 5))
    setGenerating(true)

    window.setTimeout(() => {
      if (sentCount >= 2) {
        setMessages((current) => [
          ...current,
          { id: `sia-${Date.now()}`, sender: 'sia', text: 'I love this. I have enough to shape your first plan.' },
        ])
        setGenerating(false)
        window.setTimeout(() => router.push('/auth/initial-plan'), 550)
        return
      }

      setMessages((current) => [
        ...current,
        { id: `sia-${Date.now()}`, sender: 'sia', text: 'Great. What support would make that easier to follow through on this week?' },
      ])
      setGenerating(false)
    }, 500)
  }

  return (
    <PhoneFrame>
      <ScreenShell
        showTabBar={false}
        composer={
          <form className="px-4 pb-4" onSubmit={(event) => { event.preventDefault(); sendMessage(input) }}>
            <label className="sr-only" htmlFor="sia-onboarding-message">Type a message to SIA</label>
            <div className="relative h-[52px] rounded-pill border border-white/10 bg-ink-brown-800">
              <input
                id="sia-onboarding-message"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Type a message"
                className="h-full w-full rounded-pill bg-transparent px-4 pr-14 text-[14px] text-white outline-none placeholder:text-white/30"
              />
              <button
                type="submit"
                disabled={!input.trim() || generating}
                className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-brand-orange text-white shadow-[var(--glow-orange)] disabled:opacity-40"
                aria-label="Send message"
              >
                <ArrowUp size={16} strokeWidth={2.4} />
              </button>
            </div>
          </form>
        }
      >
        <div className="flex min-h-full flex-col bg-ink-900">
          <section
            className="relative mx-4 mt-2 overflow-hidden rounded-2xl border border-white/[0.06]"
            style={{ background: 'radial-gradient(circle at 50% 35%, var(--glow-orange-bg), transparent 58%)' }}
          >
            <div className="absolute left-5 top-4 opacity-80">
              <ContinuousStroke />
            </div>

            <div className="relative z-10 grid grid-cols-3 gap-x-4 gap-y-2 px-5 pb-3 pt-9">
              {visualDomains.map((item) => (
                <DomainBubble key={item.label} {...item} />
              ))}
            </div>

            <div className="relative z-10 grid gap-2 px-5 pb-4">
              <MissionPreviewCard tone="border-l-4 border-l-domain-fitness">
                Run a half marathon
              </MissionPreviewCard>
              <MissionPreviewCard tone="border-l-4 border-l-domain-finance">
                Save $5,000 by December
              </MissionPreviewCard>
            </div>
          </section>

          <ProgressDots step={step} />
          <div className="h-px bg-white/[0.05]" />

          <section className="flex-1 px-4 py-2">
            <div className="space-y-3">
              {messages.map((message) => (
                <MessageBubble key={message.id} sender={message.sender}>
                  {message.text}
                </MessageBubble>
              ))}
              {generating && (
                <div className="pl-8 text-caption leading-[18px] text-white/40" role="status">
                  SIA is shaping your plan...
                </div>
              )}
            </div>

            <div className="mt-3 flex gap-2 overflow-x-auto pb-3 hide-scrollbar">
              {suggestions.map((suggestion, index) => (
                <SuggestionChip
                  key={suggestion}
                  domain={index === 0 ? 'fitness' : index === 1 ? 'finance' : undefined}
                  onClick={() => sendMessage(suggestion)}
                  className="min-h-11"
                >
                  {suggestion}
                </SuggestionChip>
              ))}
            </div>
          </section>
        </div>
      </ScreenShell>
    </PhoneFrame>
  )
}
