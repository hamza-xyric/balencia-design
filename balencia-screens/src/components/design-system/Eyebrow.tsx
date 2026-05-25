import type { HTMLAttributes } from 'react'

export function Eyebrow({ className = '', children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={[
        'text-eyebrow font-semibold uppercase tracking-[0.12em] text-white/40',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </p>
  )
}
