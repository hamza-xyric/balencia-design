'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { screens } from '@/data/screens'

export function ScreenNav() {
  const pathname = usePathname()
  const currentIndex = screens.findIndex(screen => screen.route === pathname)

  if (currentIndex < 0) return null

  const previous = screens[currentIndex - 1]
  const next = screens[currentIndex + 1]

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
      {previous && (
        <Link
          href={previous.route}
          className="flex h-11 w-11 items-center justify-center rounded-pill border border-white/[0.06] bg-ink-brown-800 text-white/70 shadow-1 transition-colors hover:text-white"
          aria-label={`Previous screen: ${previous.name}`}
        >
          <ChevronLeft size={20} aria-hidden="true" />
        </Link>
      )}
      {next && (
        <Link
          href={next.route}
          className="flex h-11 w-11 items-center justify-center rounded-pill border border-white/[0.06] bg-ink-brown-800 text-white/70 shadow-1 transition-colors hover:text-white"
          aria-label={`Next screen: ${next.name}`}
        >
          <ChevronRight size={20} aria-hidden="true" />
        </Link>
      )}
    </div>
  )
}
