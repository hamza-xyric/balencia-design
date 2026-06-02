import type { HTMLAttributes } from 'react'

export function Eyebrow({ className = '', children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={[
        'text-eyebrow font-semibold uppercase tracking-[var(--tracking-eyebrow)] text-white/40',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </p>
  )
}
