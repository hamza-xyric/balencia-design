import { cx } from './core'

// Static button surfaces (visual prototype — no interactivity). One BtnPrimary
// per composition; disabled renders at 40% with no glow.
export function BtnPrimary({
  children,
  disabled = false,
  className,
}: {
  children: React.ReactNode
  disabled?: boolean
  className?: string
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cx(
        'flex h-[52px] items-center justify-center rounded-pill bg-brand-orange px-6 text-[16px] font-semibold text-white',
        disabled ? 'opacity-40' : 'shadow-[var(--glow-orange-sm)]',
        className,
      )}
    >
      {children}
    </button>
  )
}

export function BtnSecondary({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <button type="button" className={cx('glass-pill flex h-12 items-center justify-center gap-2 px-5 text-[15px] font-medium text-white', className)}>
      {children}
    </button>
  )
}

export function BtnGhost({ children, quiet = false, className }: { children: React.ReactNode; quiet?: boolean; className?: string }) {
  return (
    <button type="button" className={cx('flex h-11 items-center justify-center px-4 text-[15px] font-medium', quiet ? 'text-white/50' : 'text-brand-orange', className)}>
      {children}
    </button>
  )
}

export function BtnCoach({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <button type="button" className={cx('flex h-[52px] items-center justify-center rounded-pill bg-royal-purple px-6 text-[16px] font-semibold text-white shadow-[var(--glow-purple-sm)]', className)}>
      {children}
    </button>
  )
}

export function BtnSuccess({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <button type="button" className={cx('flex h-[52px] items-center justify-center rounded-pill bg-forest-green px-6 text-[16px] font-semibold text-white shadow-[var(--glow-green-sm)]', className)}>
      {children}
    </button>
  )
}

// Dark glass input pill. `value` renders as typed text; otherwise the
// placeholder shows muted. Focused variant adds the orange border.
export function GlassPillInput({
  icon,
  placeholder,
  value,
  trailing,
  focused = false,
  className,
}: {
  icon?: React.ReactNode
  placeholder: string
  value?: string
  trailing?: React.ReactNode
  focused?: boolean
  className?: string
}) {
  return (
    <div
      className={cx(
        'glass-pill flex h-[52px] items-center gap-3 px-4',
        focused && 'border-brand-orange/60 shadow-[var(--glow-orange-sm)]',
        className,
      )}
    >
      {icon && <span className="shrink-0 text-white/45">{icon}</span>}
      <span className={cx('min-w-0 flex-1 truncate text-[15px]', value ? 'text-white' : 'text-white/40')}>
        {value ?? placeholder}
      </span>
      {trailing}
    </div>
  )
}

// Centered caption-level legal-link row — the quietest element on screen.
export function ComplianceFooter({ links = ['Terms of service', 'Privacy'] }: { links?: string[] }) {
  return (
    <div className="flex items-center justify-center gap-5 py-2">
      {links.map(link => (
        <span key={link} className="flex min-h-11 items-center text-[12px] text-white/55">{link}</span>
      ))}
    </div>
  )
}
