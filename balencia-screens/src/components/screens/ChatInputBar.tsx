import { ArrowUp, Mic } from 'lucide-react'

type ChatInputBarProps = {
  placeholder?: string
  value?: string
  disabled?: boolean
  action?: 'send' | 'mic'
  className?: string
}

export function ChatInputBar({
  placeholder = 'Type a message',
  value = '',
  disabled = false,
  action = 'send',
  className = '',
}: ChatInputBarProps) {
  const isMic = action === 'mic' && !value

  return (
    <div className={className} data-testid="chat-input-bar">
      <div
        className={[
          'relative h-[52px] rounded-pill border bg-ink-brown-800 transition-colors duration-[var(--dur-fast)]',
          disabled ? 'border-white/10 opacity-60' : 'border-white/10',
        ].filter(Boolean).join(' ')}
      >
        <div className="flex h-full items-center px-4 pr-14 text-[14px] leading-[18px] text-white/30">
          {value || placeholder}
        </div>
        <button
          className={[
            'absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-[var(--dur-fast)]',
            isMic
              ? 'border border-white/10 bg-ink-brown-800 text-white/60'
              : 'bg-brand-orange text-white shadow-[var(--glow-orange)]',
            disabled ? 'opacity-40' : value || isMic ? 'opacity-100' : 'opacity-45',
          ].filter(Boolean).join(' ')}
          aria-label={isMic ? 'Voice input' : 'Send message'}
        >
          {isMic ? <Mic size={18} strokeWidth={1.9} /> : <ArrowUp size={16} strokeWidth={2.4} />}
        </button>
      </div>
    </div>
  )
}
