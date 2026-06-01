'use client'

import type { HTMLAttributes } from 'react'
import { Search, X } from 'lucide-react'

type SearchBarProps = HTMLAttributes<HTMLDivElement> & {
  placeholder?: string
  value?: string
  showClear?: boolean
  onValueChange?: (value: string) => void
  onClear?: () => void
  inputLabel?: string
}

export function SearchBar({
  placeholder = 'Search...',
  value = '',
  showClear = false,
  className = '',
  onValueChange,
  onClear,
  inputLabel,
  ...props
}: SearchBarProps) {
  const hasValue = value.length > 0

  return (
    <div
      className={[
        'flex h-[52px] items-center gap-3 rounded-pill border border-white/10 bg-ink-brown-800 px-4 text-[15px] leading-5 shadow-1',
        className,
      ].filter(Boolean).join(' ')}
      role="search"
      {...props}
    >
      <Search size={16} className="shrink-0 text-white/40" strokeWidth={1.8} />
      <input
        value={value}
        onChange={(event) => onValueChange?.(event.currentTarget.value)}
        placeholder={placeholder}
        readOnly={!onValueChange}
        className="h-full min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-white/40"
        aria-label={inputLabel ?? placeholder}
      />
      {(hasValue || showClear) && (
        <button
          type="button"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange/70"
          aria-label="Clear search"
          onClick={() => (onClear ? onClear() : onValueChange?.(''))}
        >
          <X size={16} strokeWidth={1.8} />
        </button>
      )}
    </div>
  )
}
