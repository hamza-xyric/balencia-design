import { useId, type ReactNode } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'

type BottomSheetProps = {
  title: string
  children: ReactNode
  className?: string
  contentClassName?: string
  closeHref?: string
  closeLabel?: string
  onClose?: () => void
  variant?: 'route' | 'modal'
}

type PhoneModalLayerProps = {
  children: ReactNode
  className?: string
  placement?: 'bottom' | 'center'
}

export function PhoneModalLayer({ children, className = '', placement = 'bottom' }: PhoneModalLayerProps) {
  return (
    <div
      className={[
        'fixed inset-0 z-40 flex justify-center bg-ink-900/72 backdrop-blur-[2px]',
        placement === 'center' ? 'items-center px-4' : 'items-end',
        className,
      ].filter(Boolean).join(' ')}
      data-testid="phone-modal-layer"
    >
      {children}
    </div>
  )
}

export function BottomSheet({
  title,
  children,
  className = '',
  contentClassName = '',
  closeHref,
  closeLabel = 'Close modal',
  onClose,
  variant = 'route',
}: BottomSheetProps) {
  const titleId = useId()
  const baseClassName = variant === 'modal'
    ? 'flex max-h-[calc(100%-56px)] min-h-0 w-full flex-col rounded-t-lg border border-alpha-white-08 bg-ink-900 pb-7 shadow-3'
    : 'flex min-h-full flex-col rounded-t-lg bg-ink-900'

  return (
    <section
      className={[
        baseClassName,
        className,
      ].filter(Boolean).join(' ')}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className="flex h-8 shrink-0 items-center justify-center">
        <div className="h-1 w-9 rounded-pill bg-white/20" />
      </div>

      <header className="relative flex h-11 shrink-0 items-center justify-center px-4">
        {closeHref ? (
          <Link
            href={closeHref}
            className="absolute left-4 flex h-11 w-11 items-center justify-center rounded-full text-white/60 transition-transform duration-[var(--dur-fast)] active:scale-90"
            aria-label={closeLabel}
          >
            <X size={18} strokeWidth={2} />
          </Link>
        ) : onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="absolute left-4 flex h-11 w-11 items-center justify-center rounded-full text-white/60 transition-transform duration-[var(--dur-fast)] active:scale-90"
            aria-label={closeLabel}
          >
            <X size={18} strokeWidth={2} />
          </button>
        ) : null}
        <h1 id={titleId} className="max-w-[220px] truncate text-[17px] font-semibold leading-[22px] text-white">
          {title}
        </h1>
      </header>

      <div className={['flex-1 overflow-y-auto hide-scrollbar', contentClassName].filter(Boolean).join(' ')}>
        {children}
      </div>
    </section>
  )
}
