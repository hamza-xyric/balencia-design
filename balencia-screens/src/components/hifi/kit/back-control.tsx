'use client'

import { ChevronLeft } from 'lucide-react'

export function BackControl({ fallbackHref = '/screens/12' }: { fallbackHref?: string }) {
  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back()
      return
    }
    window.location.assign(fallbackHref)
  }

  return (
    <button
      type="button"
      className="focus-ring flex h-11 w-11 items-center justify-center rounded-full text-paper-100/75"
      aria-label="Go back"
      onClick={goBack}
    >
      <ChevronLeft size={20} strokeWidth={1.9} />
    </button>
  )
}
