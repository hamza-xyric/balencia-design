import { ContinuousStroke } from '@/components/design-system/ContinuousStroke'
import { domainToneClasses } from '@/components/design-system/Chip'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { ChatInputBar } from '@/components/screens/ChatInputBar'
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
]

const progressDots = ['filled', 'filled', 'current', 'empty', 'empty', 'empty', 'empty']

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

function ProgressDots() {
  return (
    <div className="flex h-6 items-center gap-2 px-4">
      {progressDots.map((dot, index) => (
        <span
          key={`${dot}-${index}`}
          className={[
            'rounded-full transition-all duration-[var(--dur-base)]',
            dot === 'current'
              ? 'h-2 w-2 bg-brand-orange shadow-[var(--glow-orange)]'
              : dot === 'filled'
                ? 'h-1.5 w-1.5 bg-brand-orange'
                : 'h-1.5 w-1.5 border border-white/20',
          ].join(' ')}
        />
      ))}
    </div>
  )
}

export default function SiaOnboardingScreen() {
  return (
    <PhoneFrame>
      <ScreenShell
        showTabBar={false}
        composer={<ChatInputBar placeholder="Type a message" value="" />}
      >
        <div className="flex min-h-full flex-col bg-ink-900">
          <section
            className="relative mx-4 mt-2 h-[232px] overflow-hidden rounded-2xl border border-white/[0.06]"
            style={{ background: 'radial-gradient(circle at 50% 35%, var(--glow-orange-bg), transparent 58%)' }}
          >
            <div className="absolute left-5 top-4 opacity-80">
              <ContinuousStroke />
            </div>

            <div className="relative z-10 grid grid-cols-5 gap-2 px-5 pt-12">
              {visualDomains.map((item) => (
                <DomainBubble key={item.label} {...item} />
              ))}
            </div>

            <div className="absolute inset-x-5 bottom-4 grid gap-2">
              <MissionPreviewCard tone="border-l-4 border-l-domain-fitness">
                Run a half marathon
              </MissionPreviewCard>
              <MissionPreviewCard tone="border-l-4 border-l-domain-finance">
                Save $5,000 by December
              </MissionPreviewCard>
            </div>
          </section>

          <ProgressDots />
          <div className="h-px bg-white/[0.05]" />

          <section className="flex-1 px-4 py-2">
            <div className="space-y-3">
              <MessageBubble sender="sia">
                Hey Amira. I&apos;m SIA, your personal coach.
              </MessageBubble>
              <MessageBubble sender="sia">
                I&apos;m here to help you see your life as one connected system.
              </MessageBubble>
              <MessageBubble sender="user">
                Fitness, finance, and wellbeing matter most right now.
              </MessageBubble>
              <MessageBubble sender="sia">
                Good. What would make the next 90 days feel meaningful?
              </MessageBubble>
            </div>

            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
              <SuggestionChip domain="fitness">Run a half marathon</SuggestionChip>
              <SuggestionChip domain="finance">Save $5,000</SuggestionChip>
              <SuggestionChip>Something else</SuggestionChip>
            </div>
          </section>
        </div>
      </ScreenShell>
    </PhoneFrame>
  )
}
