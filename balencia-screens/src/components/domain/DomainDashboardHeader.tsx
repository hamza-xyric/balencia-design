import Link from 'next/link'
import type { ReactNode } from 'react'
import { ChevronLeft, MoreHorizontal } from 'lucide-react'
import { domainToneClasses } from '@/components/design-system/Chip'
import type { DomainKey } from '@/data/domains'

type DomainDashboardHeaderProps = {
  title: string
  domain: DomainKey
  level?: number
  backHref?: string
  variant?: 'compact' | 'expanded'
  rightAction?: ReactNode
}

export function DomainDashboardHeader({
  title,
  domain,
  level,
  backHref = '/tabs/me/explore',
  variant = 'compact',
  rightAction,
}: DomainDashboardHeaderProps) {
  const tone = domainToneClasses[domain]

  if (variant === 'expanded') {
    return (
      <header className="z-30 flex h-[88px] shrink-0 flex-col bg-ink-900/95 backdrop-blur-md">
        <div className="relative flex h-11 items-center px-4">
          <Link
            href={backHref}
            className="-ml-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition-transform duration-[var(--dur-fast)] active:scale-95"
            aria-label="Back"
          >
            <ChevronLeft size={20} strokeWidth={2.1} />
          </Link>

          <h1 className="absolute left-1/2 max-w-[210px] -translate-x-1/2 truncate text-h3 font-semibold leading-[22px] text-white/0">
            {title}
          </h1>

          <div className="ml-auto flex h-11 w-11 items-center justify-center rounded-full text-white">
            {rightAction || <MoreHorizontal size={20} strokeWidth={2.1} />}
          </div>
        </div>

        <div className={`h-[3px] w-full ${tone.bar} opacity-80`} aria-hidden="true" />

        <div className="flex h-[41px] items-center px-6">
          <h2 className="truncate text-h1 font-bold leading-[34px] text-white">{title}</h2>
          <span className={`ml-2 h-2 w-2 shrink-0 rounded-full ${tone.dot}`} aria-hidden="true" />
        </div>
      </header>
    )
  }

  return (
    <header className="z-30 flex h-[56px] shrink-0 items-center bg-ink-900/95 px-4 backdrop-blur-md">
      <Link
        href={backHref}
        className="-ml-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition-transform duration-[var(--dur-fast)] active:scale-95"
        aria-label="Back"
      >
        <ChevronLeft size={20} strokeWidth={2.1} />
      </Link>

      <div className="min-w-0 flex-1">
        <h1 className="truncate text-h2 font-semibold leading-[26px] text-white">
          {title}
        </h1>
        <div className={`mt-1 h-0.5 w-[64%] rounded-pill ${tone.bar}`} aria-hidden="true" />
      </div>

      {rightAction ? (
        <div className="ml-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white/60 transition-colors duration-[var(--dur-fast)] active:bg-white/[0.05] active:text-white">
          {rightAction}
        </div>
      ) : typeof level === 'number' && (
        <Link
          href="/tabs/me/rpg"
          className={`ml-3 inline-flex h-7 shrink-0 items-center rounded-pill px-3 text-caption font-semibold leading-[18px] ${tone.subtle} ${tone.text} transition-transform duration-[var(--dur-fast)] active:scale-95`}
        >
          Lv.{level}
        </Link>
      )}
    </header>
  )
}
