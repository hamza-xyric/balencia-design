import type { ButtonHTMLAttributes, ReactNode } from 'react'
import type { DomainKey } from '@/data/domains'

export const domainToneClasses: Record<DomainKey, { dot: string; selected: string; subtle: string; text: string; border: string; bar: string }> = {
  fitness: {
    dot: 'bg-domain-fitness',
    selected: 'border-domain-fitness bg-domain-fitness/20',
    subtle: 'bg-domain-fitness/15',
    text: 'text-domain-fitness',
    border: 'border-domain-fitness',
    bar: 'bg-domain-fitness',
  },
  sleep: {
    dot: 'bg-domain-sleep',
    selected: 'border-domain-sleep bg-domain-sleep/20',
    subtle: 'bg-domain-sleep/15',
    text: 'text-domain-sleep',
    border: 'border-domain-sleep',
    bar: 'bg-domain-sleep',
  },
  career: {
    dot: 'bg-domain-career',
    selected: 'border-domain-career bg-domain-career/20',
    subtle: 'bg-domain-career/15',
    text: 'text-domain-career',
    border: 'border-domain-career',
    bar: 'bg-domain-career',
  },
  nutrition: {
    dot: 'bg-domain-nutrition',
    selected: 'border-domain-nutrition bg-domain-nutrition/20',
    subtle: 'bg-domain-nutrition/15',
    text: 'text-domain-nutrition',
    border: 'border-domain-nutrition',
    bar: 'bg-domain-nutrition',
  },
  finance: {
    dot: 'bg-domain-finance',
    selected: 'border-domain-finance bg-domain-finance/20',
    subtle: 'bg-domain-finance/15',
    text: 'text-domain-finance',
    border: 'border-domain-finance',
    bar: 'bg-domain-finance',
  },
  faith: {
    dot: 'bg-domain-faith',
    selected: 'border-domain-faith bg-domain-faith/20',
    subtle: 'bg-domain-faith/15',
    text: 'text-domain-faith',
    border: 'border-domain-faith',
    bar: 'bg-domain-faith',
  },
  productivity: {
    dot: 'bg-domain-productivity',
    selected: 'border-domain-productivity bg-domain-productivity/20',
    subtle: 'bg-domain-productivity/15',
    text: 'text-domain-productivity',
    border: 'border-domain-productivity',
    bar: 'bg-domain-productivity',
  },
  relationships: {
    dot: 'bg-domain-relationships',
    selected: 'border-domain-relationships bg-domain-relationships/20',
    subtle: 'bg-domain-relationships/15',
    text: 'text-domain-relationships',
    border: 'border-domain-relationships',
    bar: 'bg-domain-relationships',
  },
  wellbeing: {
    dot: 'bg-domain-wellbeing',
    selected: 'border-domain-wellbeing bg-domain-wellbeing/20',
    subtle: 'bg-domain-wellbeing/15',
    text: 'text-domain-wellbeing',
    border: 'border-domain-wellbeing',
    bar: 'bg-domain-wellbeing',
  },
  meditation: {
    dot: 'bg-domain-meditation',
    selected: 'border-domain-meditation bg-domain-meditation/20',
    subtle: 'bg-domain-meditation/15',
    text: 'text-domain-meditation',
    border: 'border-domain-meditation',
    bar: 'bg-domain-meditation',
  },
  creativity: {
    dot: 'bg-domain-creativity',
    selected: 'border-domain-creativity bg-domain-creativity/20',
    subtle: 'bg-domain-creativity/15',
    text: 'text-domain-creativity',
    border: 'border-domain-creativity',
    bar: 'bg-domain-creativity',
  },
  learning: {
    dot: 'bg-domain-learning',
    selected: 'border-domain-learning bg-domain-learning/20',
    subtle: 'bg-domain-learning/15',
    text: 'text-domain-learning',
    border: 'border-domain-learning',
    bar: 'bg-domain-learning',
  },
}

type ChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  domain?: DomainKey
  selected?: boolean
  icon?: ReactNode
}

export function Chip({
  domain,
  selected = false,
  icon,
  className = '',
  children,
  ...props
}: ChipProps) {
  const domainClasses = domain ? domainToneClasses[domain] : null

  return (
    <button
      className={[
        'inline-flex h-9 items-center justify-center gap-2 rounded-pill border px-3 text-caption font-semibold transition-all duration-[var(--dur-fast)] ease-[var(--ease-out-soft)] active:scale-[0.96]',
        domainClasses
          ? selected
            ? `${domainClasses.selected} text-white`
            : `border-white/10 bg-ink-brown-800 text-white/70`
          : selected
            ? 'border-brand-orange bg-brand-orange/15 text-brand-orange'
            : 'border-white/10 bg-ink-brown-800 text-white/70',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {icon || (domainClasses && <span className={`h-2.5 w-2.5 rounded-full ${domainClasses.dot}`} aria-hidden="true" />)}
      <span>{children}</span>
    </button>
  )
}
