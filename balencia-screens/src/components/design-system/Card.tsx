import type { HTMLAttributes } from 'react'

type CardVariant = 'default' | 'small' | 'hero'

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant
}

const variantClasses: Record<CardVariant, string> = {
  default: 'rounded-xl p-6',
  small: 'rounded-md p-4',
  hero: 'rounded-2xl p-8',
}

export function Card({ variant = 'default', className = '', children, ...props }: CardProps) {
  return (
    <div
      className={[
        'bg-ink-brown-800 border border-alpha-white-06 shadow-1',
        variantClasses[variant],
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}
