'use client'

import { useId } from 'react'
import { Lock } from 'lucide-react'
import { cx } from './core'

export function PaywallLock({
  children,
  title = 'Premium preview',
  description,
  action,
  className,
}: {
  children: React.ReactNode
  title?: string
  description: string
  action: React.ReactNode
  className?: string
}) {
  const titleId = useId()
  const descriptionId = useId()

  return (
    <section
      className={cx('glass-card relative min-h-[190px] overflow-hidden p-0', className)}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <div aria-hidden="true" inert className="paywall-blur pointer-events-none absolute inset-0 scale-[1.03] select-none p-5 opacity-75">
        {children}
      </div>
      <div className="absolute inset-0 grid place-items-center bg-ink-900/30 p-5">
        <div className="max-w-[250px] text-center">
          <span aria-hidden="true" className="mx-auto grid h-11 w-11 place-items-center rounded-full border border-royal-purple/35 bg-ink-900 text-royal-purple">
            <Lock className="h-5 w-5" />
          </span>
          <h2 id={titleId} className="mt-3 text-[16px] font-semibold text-paper-100">{title}</h2>
          <p id={descriptionId} className="mt-1 text-[13px] leading-5 text-paper-100/70">{description}</p>
          <div className="mt-4">{action}</div>
        </div>
      </div>
    </section>
  )
}
