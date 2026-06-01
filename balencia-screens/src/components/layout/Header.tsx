'use client'

import { ChevronLeft } from 'lucide-react'

interface HeaderProps {
  title?: string
  showBack?: boolean
  backHref?: string
  fallbackHref?: string
  rightAction?: React.ReactNode
}

export function Header({ title, showBack = false, backHref, fallbackHref = '/', rightAction }: HeaderProps) {
  const goBack = () => {
    if (backHref) {
      window.location.href = backHref
      return
    }

    if (window.history.length > 1) {
      window.history.back()
      return
    }

    window.location.href = fallbackHref
  }

  return (
    <div className="flex items-center h-[56px] px-4 bg-ink-900 relative">
      {showBack && (
        <button
          type="button"
          onClick={goBack}
          className="w-[44px] h-[44px] flex items-center justify-center rounded-full transition-transform duration-[var(--dur-fast)] active:scale-90"
          aria-label="Back"
        >
          <ChevronLeft size={20} className="text-white" />
        </button>
      )}

      {title && (
        <h1 className="absolute left-1/2 -translate-x-1/2 text-[17px] font-semibold text-white truncate max-w-[200px]">
          {title}
        </h1>
      )}

      {rightAction && (
        <div className="ml-auto">
          {rightAction}
        </div>
      )}
    </div>
  )
}
