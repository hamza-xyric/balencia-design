import { LoaderCircle } from 'lucide-react'
import { cx } from './core'

type BaseButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  loading?: boolean
  loadingLabel?: string
}

function ButtonContent({
  children,
  loading,
  loadingLabel = 'Working',
}: {
  children: React.ReactNode
  loading?: boolean
  loadingLabel?: string
}) {
  return (
    <>
      <span aria-hidden={loading || undefined} className={cx('inline-flex items-center justify-center gap-2', loading && 'invisible')}>
        {children}
      </span>
      {loading && (
        <span className="absolute inset-0 inline-flex items-center justify-center gap-2">
          <LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin motion-reduce:animate-none" />
          <span>{loadingLabel}</span>
        </span>
      )}
    </>
  )
}

export function BtnPrimary({ children, disabled = false, loading = false, loadingLabel, className, ...props }: BaseButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cx(
        'hifi-action hifi-action-primary relative inline-flex h-[52px] items-center justify-center gap-2 rounded-pill px-6 text-[16px] font-semibold',
        className,
      )}
      {...props}
    >
      <ButtonContent loading={loading} loadingLabel={loadingLabel}>{children}</ButtonContent>
    </button>
  )
}

export function BtnSecondary({ children, loading = false, loadingLabel, className, disabled, ...props }: BaseButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cx(
        'hifi-action glass-pill relative inline-flex h-12 items-center justify-center gap-2 px-5 text-[15px] font-medium text-paper-100',
        className,
      )}
      {...props}
    >
      <ButtonContent loading={loading} loadingLabel={loadingLabel}>{children}</ButtonContent>
    </button>
  )
}

export function BtnGhost({ children, quiet = false, loading = false, loadingLabel, className, disabled, ...props }: BaseButtonProps & { quiet?: boolean }) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cx(
        'hifi-action relative inline-flex min-h-11 items-center justify-center gap-2 rounded-pill px-4 text-[15px] font-medium',
        quiet ? 'text-paper-100/70' : 'text-brand-orange',
        className,
      )}
      {...props}
    >
      <ButtonContent loading={loading} loadingLabel={loadingLabel}>{children}</ButtonContent>
    </button>
  )
}

export function BtnCoach({ children, loading = false, loadingLabel, className, disabled, ...props }: BaseButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cx(
        'hifi-action relative inline-flex h-[52px] items-center justify-center gap-2 rounded-pill border border-royal-purple/70 bg-royal-purple px-6 text-[16px] font-semibold text-paper-100 hover:shadow-[var(--glow-purple-sm)]',
        className,
      )}
      {...props}
    >
      <ButtonContent loading={loading} loadingLabel={loadingLabel}>{children}</ButtonContent>
    </button>
  )
}

export function BtnSuccess({ children, loading = false, loadingLabel, className, disabled, ...props }: BaseButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cx(
        'hifi-action hifi-action-success relative inline-flex h-[52px] items-center justify-center gap-2 rounded-pill px-6 text-[16px] font-semibold',
        className,
      )}
      {...props}
    >
      <ButtonContent loading={loading} loadingLabel={loadingLabel}>{children}</ButtonContent>
    </button>
  )
}

export function BtnDestructive({ children, loading = false, loadingLabel, className, disabled, ...props }: BaseButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cx(
        'hifi-action hifi-action-danger relative inline-flex h-[52px] items-center justify-center gap-2 rounded-pill px-6 text-[16px] font-semibold',
        className,
      )}
      {...props}
    >
      <ButtonContent loading={loading} loadingLabel={loadingLabel}>{children}</ButtonContent>
    </button>
  )
}

export function ComplianceFooter({
  links = [
    { label: 'Terms of service', href: '/legal/terms' },
    { label: 'Privacy', href: '/legal/privacy' },
  ],
  ariaLabel,
}: {
  links?: Array<string | { label: string; href: string }>
  ariaLabel?: string
}) {
  const resolvedLinks = links.map(link => {
    if (typeof link !== 'string') return link
    const normalized = link.toLowerCase()
    const href = normalized.includes('terms')
      ? '/legal/terms'
      : normalized.includes('privacy')
        ? '/legal/privacy'
        : `/screens/84?control=${encodeURIComponent(normalized)}`
    return { label: link, href }
  })
  const resolvedAriaLabel = ariaLabel ?? (resolvedLinks.every(link => link.href.startsWith('/legal/')) ? 'Legal' : 'Data and privacy links')
  return (
    <nav className="flex items-center justify-center gap-5 py-2" aria-label={resolvedAriaLabel}>
      {resolvedLinks.map(link => (
        <a key={link.href} href={link.href} className="focus-ring flex min-h-11 items-center rounded-sm px-1 text-[12px] text-paper-100/70">
          {link.label}
        </a>
      ))}
    </nav>
  )
}
