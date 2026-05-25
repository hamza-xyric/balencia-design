type MoodOption = {
  emoji: string
  label: string
}

type MoodSelectorProps = {
  options: MoodOption[]
  selectedLabel: string
  className?: string
}

export function MoodSelector({ options, selectedLabel, className = '' }: MoodSelectorProps) {
  return (
    <div
      className={[
        'rounded-xl border border-white/[0.06] bg-ink-brown-800 p-4 shadow-1',
        className,
      ].filter(Boolean).join(' ')}
    >
      <div className="grid grid-cols-6 gap-1">
        {options.map((option) => {
          const selected = option.label === selectedLabel

          return (
            <button
              key={option.label}
              type="button"
              className={[
                'flex h-[64px] min-w-0 flex-col items-center justify-center rounded-md transition-transform duration-[var(--dur-fast)] active:scale-95',
                selected ? 'bg-domain-wellbeing/15 opacity-100' : 'opacity-50',
              ].filter(Boolean).join(' ')}
              aria-pressed={selected}
            >
              <span className={['text-[28px] leading-8', selected ? 'scale-110' : ''].join(' ')} aria-hidden="true">
                {option.emoji}
              </span>
              <span className={['mt-1 max-w-full truncate text-small leading-[14px]', selected ? 'text-white/70' : 'text-white/40'].join(' ')}>
                {option.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
