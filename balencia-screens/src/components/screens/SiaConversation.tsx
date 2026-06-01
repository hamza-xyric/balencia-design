import { DomainTag } from '@/components/design-system/DomainTag'
import { MessageBubble, SiaAvatarSmall } from '@/components/screens/MessageBubble'
import { RichInlineCard } from '@/components/screens/RichInlineCard'
import { SuggestionChip } from '@/components/screens/SuggestionChip'
import { meals, missions, workouts } from '@/data/mock'

type SiaConversationProps = {
  showDraft?: boolean
  showSuggestions?: boolean
  showThinking?: boolean
  className?: string
}

function DaySeparator() {
  return (
    <div className="flex items-center gap-3 py-4">
      <div className="h-px flex-1 bg-alpha-white-05" />
      <span className="text-[12px] leading-4 text-white/30">Today</span>
      <div className="h-px flex-1 bg-alpha-white-05" />
    </div>
  )
}

function ConnectionMessage() {
  return (
    <div className="flex w-full gap-2">
      <SiaAvatarSmall />
      <div className="max-w-[250px] rounded-[16px] rounded-bl-xs border border-alpha-white-08 bg-ink-brown-800 px-3 py-2.5 text-[15px] leading-[22px] text-white">
        <p className="mb-1 text-eyebrow font-semibold uppercase tracking-[0.12em] text-royal-purple">
          Connection spotted
        </p>
        <div>
          Your <DomainTag domain="fitness" className="mx-1 translate-y-[-1px]" /> and{' '}
          <DomainTag domain="sleep" className="mx-1 translate-y-[-1px]" /> patterns are moving together.
        </div>
      </div>
    </div>
  )
}

function ThinkingIndicator() {
  return (
    <div className="flex w-full gap-2">
      <SiaAvatarSmall className="animate-sia-avatar-pulse" />
      <div className="flex h-9 items-center gap-1 rounded-[16px] rounded-bl-xs border border-alpha-white-08 bg-ink-brown-800 px-4">
        {[0, 1, 2].map((dot) => (
          <span
            key={dot}
            className="sia-thinking-dot h-1.5 w-1.5 rounded-full bg-white/40"
            style={{ animationDelay: `${dot * 200}ms` }}
          />
        ))}
      </div>
    </div>
  )
}

function DraftBubble() {
  return (
    <div className="flex w-full justify-end">
      <div className="max-w-[250px] rounded-[16px] rounded-br-xs border border-dashed border-brand-orange/25 bg-brand-orange/10 px-3 py-2.5 text-[15px] leading-[22px] text-white/80">
        I just did thirty minutes of yoga and my energy feels steadier
        <span className="ml-1 inline-block h-[18px] w-0.5 translate-y-1 bg-brand-orange voice-cursor" />
      </div>
    </div>
  )
}

export function SiaConversation({
  showDraft = false,
  showSuggestions = true,
  showThinking = false,
  className = '',
}: SiaConversationProps) {
  return (
    <div className={['space-y-4', className].filter(Boolean).join(' ')}>
      <DaySeparator />

      <MessageBubble sender="sia">
        Good morning, Amira. Your recovery looks stronger after yesterday&apos;s run.
      </MessageBubble>

      <RichInlineCard type="chart" className="animate-fade-up" />

      <MessageBubble sender="user">
        Yeah, I felt great after the morning run.
      </MessageBubble>

      <ConnectionMessage />

      <RichInlineCard type="connection" className="animate-fade-up" />

      <MessageBubble sender="user">
        Can you move my runs earlier this week?
      </MessageBubble>

      <MessageBubble sender="sia">
        Done. I moved your training runs to 7:30 AM on Monday, Wednesday, and Friday.
      </MessageBubble>

      <RichInlineCard type="mission" mission={missions[0]} className="animate-fade-up" />

      <MessageBubble sender="sia">
        Keep breakfast simple after the run. This meal keeps protein high without slowing you down.
      </MessageBubble>

      <RichInlineCard type="meal" meal={meals[1]} className="animate-fade-up" />

      <RichInlineCard type="workout" workout={workouts[0]} className="animate-fade-up" />

      {showDraft && <DraftBubble />}

      {!showDraft && showThinking && <ThinkingIndicator />}

      {showSuggestions && (
        <div className="flex gap-2 overflow-x-auto pb-1 pl-8 hide-scrollbar">
          <SuggestionChip>Tell me more</SuggestionChip>
          <SuggestionChip>Show my missions</SuggestionChip>
          <SuggestionChip>Log a meal</SuggestionChip>
          <SuggestionChip className="border-white/30 text-white/50">Something else</SuggestionChip>
        </div>
      )}
    </div>
  )
}
