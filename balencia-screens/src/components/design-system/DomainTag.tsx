import type { HTMLAttributes } from 'react'
import { domainToneClasses } from './Chip'
import { domains, type DomainKey } from '@/data/domains'

type DomainTagProps = HTMLAttributes<HTMLDivElement> & {
  domain: DomainKey
  showDot?: boolean
}

export function DomainTag({
  domain,
  showDot = true,
  className = '',
  ...props
}: DomainTagProps) {
  const tone = domainToneClasses[domain]
  const label = domains[domain].label

  return (
    <div
      className={[
        'inline-flex h-6 items-center gap-1.5 rounded-sm px-2 text-small font-semibold leading-[14px]',
        tone.subtle,
        tone.text,
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {showDot && <span className={`h-1.5 w-1.5 rounded-full ${tone.dot}`} aria-hidden="true" />}
      <span>{label}</span>
    </div>
  )
}
