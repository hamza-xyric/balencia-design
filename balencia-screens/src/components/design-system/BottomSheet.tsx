import type { ReactNode } from 'react'
import { X } from 'lucide-react'

type BottomSheetProps = {
  title: string
  children: ReactNode
  className?: string
}

export function BottomSheet({ title, children, className = '' }: BottomSheetProps) {
  return (
    <section
      className={[
        'flex min-h-full flex-col rounded-t-lg bg-ink-900',
        className,
      ].filter(Boolean).join(' ')}
      aria-label={`${title} modal`}
    >
      <div className="flex h-8 shrink-0 items-center justify-center">
        <div className="h-1 w-9 rounded-pill bg-white/20" />
      </div>

      <header className="relative flex h-11 shrink-0 items-center justify-center px-4">
        <button
          type="button"
          className="absolute left-4 flex h-11 w-11 items-center justify-center rounded-full text-white/60 transition-transform duration-[var(--dur-fast)] active:scale-90"
          aria-label="Close modal"
        >
          <X size={18} strokeWidth={2} />
        </button>
        <h1 className="max-w-[220px] truncate text-[17px] font-semibold leading-[22px] text-white">
          {title}
        </h1>
      </header>

      <div className="flex-1 overflow-y-auto hide-scrollbar">
        {children}
      </div>
    </section>
  )
}
