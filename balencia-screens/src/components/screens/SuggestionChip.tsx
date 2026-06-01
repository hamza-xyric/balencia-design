import type { ButtonHTMLAttributes } from 'react'
import type { DomainKey } from '@/data/domains'
import { domainToneClasses } from '@/components/design-system/Chip'

type SuggestionChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  domain?: DomainKey
}

export function SuggestionChip({
  domain,
  className = '',
  children,
  ...props
}: SuggestionChipProps) {
  const domainClasses = domain ? domainToneClasses[domain] : null

  return (
    <button
      className={[
        'inline-flex h-9 shrink-0 items-center justify-center rounded-pill border bg-ink-900 px-3 text-[14px] font-semibold leading-[18px] transition-all duration-[var(--dur-fast)] ease-[var(--ease-out-soft)] active:scale-[0.95]',
        domainClasses
          ? `${domainClasses.border} ${domainClasses.text}`
          : 'border-royal-purple/35 text-royal-purple',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </button>
  )
}
