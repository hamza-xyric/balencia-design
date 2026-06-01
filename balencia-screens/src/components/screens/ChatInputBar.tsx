'use client'

import { ArrowUp, Mic } from 'lucide-react'

type ChatInputBarProps = {
  placeholder?: string
  value?: string
  disabled?: boolean
  action?: 'send' | 'mic'
  className?: string
  onValueChange?: (value: string) => void
  onSend?: () => void
}

export function ChatInputBar({
  placeholder = 'Type a message',
  value = '',
  disabled = false,
  action = 'send',
  className = '',
  onValueChange,
  onSend,
}: ChatInputBarProps) {
  const isMic = action === 'mic' && !value
  const canSend = !disabled && (isMic || value.trim().length > 0)

  return (
    <form
      className={className}
      data-testid="chat-input-bar"
      onSubmit={(event) => {
        event.preventDefault()
        if (canSend) onSend?.()
      }}
    >
      <div
        className={[
          'relative h-[52px] rounded-pill border bg-ink-brown-800 transition-colors duration-[var(--dur-fast)]',
          disabled ? 'border-white/10 opacity-60' : 'border-white/10',
        ].filter(Boolean).join(' ')}
      >
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(event) => onValueChange?.(event.currentTarget.value)}
          className="h-full w-full rounded-pill bg-transparent px-4 pr-14 text-[14px] leading-[18px] text-white outline-none placeholder:text-white/50 disabled:cursor-not-allowed"
          aria-label={placeholder}
        />
        <button
          type="submit"
          disabled={!canSend}
          className={[
            'absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-[var(--dur-fast)]',
            isMic
              ? 'border border-white/10 bg-ink-brown-800 text-white/60'
              : 'bg-brand-orange text-white shadow-[var(--glow-orange)]',
            canSend ? 'opacity-100' : 'opacity-45',
          ].filter(Boolean).join(' ')}
          aria-label={isMic ? 'Voice input' : 'Send message'}
        >
          {isMic ? <Mic size={18} strokeWidth={1.9} /> : <ArrowUp size={16} strokeWidth={2.4} />}
        </button>
      </div>
    </form>
  )
}
