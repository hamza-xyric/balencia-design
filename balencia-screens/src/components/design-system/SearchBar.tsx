import type { HTMLAttributes } from 'react'
import { Search, X } from 'lucide-react'

type SearchBarProps = HTMLAttributes<HTMLDivElement> & {
  placeholder?: string
  value?: string
  showClear?: boolean
}

export function SearchBar({
  placeholder = 'Search...',
  value = '',
  showClear = false,
  className = '',
  ...props
}: SearchBarProps) {
  const hasValue = value.length > 0

  return (
    <div
      className={[
        'flex h-11 items-center gap-3 rounded-pill border border-white/10 bg-ink-brown-800 px-4 text-[15px] leading-5 shadow-1',
        className,
      ].filter(Boolean).join(' ')}
      role="search"
      {...props}
    >
      <Search size={16} className="shrink-0 text-white/40" strokeWidth={1.8} />
      <span className={hasValue ? 'min-w-0 flex-1 truncate text-white' : 'min-w-0 flex-1 truncate text-white/40'}>
        {hasValue ? value : placeholder}
      </span>
      {(hasValue || showClear) && (
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/40" aria-hidden="true">
          <X size={16} strokeWidth={1.8} />
        </span>
      )}
    </div>
  )
}
