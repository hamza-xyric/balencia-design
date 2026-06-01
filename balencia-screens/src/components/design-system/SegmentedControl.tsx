'use client'

type SegmentOption = {
  label: string
  value: string
}

type SegmentedControlProps = {
  options: SegmentOption[]
  activeValue: string
  onValueChange?: (value: string) => void
  ariaLabel?: string
  className?: string
  size?: 'sm' | 'md'
}

export function SegmentedControl({
  options,
  activeValue,
  onValueChange,
  ariaLabel,
  className = '',
  size = 'sm',
}: SegmentedControlProps) {
  const heightClass = size === 'md' ? 'h-[56px]' : 'min-h-[52px]'
  const textClass = size === 'md' ? 'text-[14px]' : 'text-caption'

  return (
    <div
      className={[
        'grid rounded-pill border border-white/10 bg-ink-brown-800 p-1',
        heightClass,
        className,
      ].filter(Boolean).join(' ')}
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
      role="tablist"
      aria-label={ariaLabel}
    >
      {options.map((option) => {
        const active = option.value === activeValue
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onValueChange?.(option.value)}
            className={[
              'flex h-full min-h-11 items-center justify-center rounded-pill font-semibold leading-[18px] transition-colors duration-[var(--dur-base)] ease-[var(--ease-out-soft)]',
              textClass,
              active ? 'bg-brand-orange text-white' : 'text-white/50',
            ].filter(Boolean).join(' ')}
            aria-selected={active}
            role="tab"
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
