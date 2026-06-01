type MessageBubbleProps = {
  sender: 'sia' | 'user'
  children: React.ReactNode
  className?: string
}

function SiaAvatar() {
  return (
    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-royal-purple/50 bg-royal-purple text-small font-semibold text-white shadow-[var(--glow-purple)]">
      S
    </div>
  )
}

export function MessageBubble({ sender, children, className = '' }: MessageBubbleProps) {
  const isSia = sender === 'sia'

  return (
    <div
      className={[
        'flex w-full gap-2',
        isSia ? 'justify-start' : 'justify-end',
        className,
      ].filter(Boolean).join(' ')}
    >
      {isSia && <SiaAvatar />}
      <div
        className={[
          'max-w-[250px] px-3 py-2.5 text-[15px] leading-[22px] text-white',
          isSia
            ? 'rounded-[16px] rounded-bl-xs border border-alpha-white-08 bg-ink-brown-800'
            : 'rounded-[16px] rounded-br-xs border border-brand-orange/20 bg-brand-orange/15',
        ].filter(Boolean).join(' ')}
      >
        {children}
      </div>
    </div>
  )
}

export function SiaAvatarSmall({ className = '' }: { className?: string }) {
  return (
    <div
      className={[
        'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-royal-purple/50 bg-royal-purple text-small font-semibold text-white shadow-[var(--glow-purple)]',
        className,
      ].filter(Boolean).join(' ')}
    >
      S
    </div>
  )
}
