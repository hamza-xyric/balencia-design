import Link from 'next/link'
import type { ReactNode } from 'react'
import { Plus } from 'lucide-react'

type FABProps = {
  href?: string
  label?: string
  icon?: ReactNode
  display?: 'icon' | 'pill'
  tone?: 'primary' | 'neutral'
  className?: string
}

export function FAB({
  href,
  label = 'Create new mission',
  icon = <Plus size={24} strokeWidth={2.2} />,
  display = 'icon',
  tone = 'primary',
  className = '',
}: FABProps) {
  const visibleLabel = display === 'pill'
  const toneClasses = tone === 'primary'
    ? 'bg-brand-orange shadow-brand-orange/30'
    : 'border border-white/[0.06] bg-ink-brown-800'
  const classes = [
    'flex items-center justify-center text-white transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out-soft)] active:scale-[0.93]',
    visibleLabel
      ? `mx-auto h-[48px] w-fit gap-2 rounded-pill px-6 text-[15px] font-semibold leading-5 shadow-2 ${toneClasses}`
      : `ml-auto h-14 w-14 rounded-full shadow-2 ${toneClasses}`,
    className,
  ].filter(Boolean).join(' ')

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={label}>
        {icon}
        {visibleLabel && <span>{label}</span>}
      </Link>
    )
  }

  return (
    <button type="button" className={classes} aria-label={label}>
      {icon}
      {visibleLabel && <span>{label}</span>}
    </button>
  )
}
