import Link from 'next/link'
import type { HTMLAttributes, ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'
import { Eyebrow } from '@/components/design-system/Eyebrow'

type SettingsRowVariant = 'display' | 'navigation' | 'toggle' | 'destructive'

type SettingsRowProps = {
  label: string
  value?: string
  href?: string
  variant?: SettingsRowVariant
  checked?: boolean
  disabled?: boolean
  onClick?: () => void
  icon?: ReactNode
  right?: ReactNode
  className?: string
}

type SettingsGroupProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
}

type SettingsSectionProps = HTMLAttributes<HTMLElement> & {
  title: string
  children: ReactNode
}

function SwitchIndicator({ checked = false, disabled = false }: { checked?: boolean; disabled?: boolean }) {
  return (
    <span
      className={[
        'relative inline-flex h-5 w-[34px] shrink-0 rounded-pill transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out-soft)]',
        checked ? 'bg-brand-orange' : 'bg-white/15',
        disabled ? 'opacity-50' : '',
      ].filter(Boolean).join(' ')}
      aria-hidden="true"
    >
      <span
        className={[
          'absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform duration-[var(--dur-fast)] ease-[var(--ease-flow)]',
          checked ? 'translate-x-[16px]' : 'translate-x-0.5',
        ].join(' ')}
      />
    </span>
  )
}

function SettingsRowContent({
  label,
  value,
  variant = 'navigation',
  checked,
  disabled,
  icon,
  right,
}: Omit<SettingsRowProps, 'href' | 'onClick'>) {
  const isDestructive = variant === 'destructive'

  return (
    <>
      {icon && !isDestructive && (
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-alpha-white-06 text-white/60">
          {icon}
        </span>
      )}
      <span className={isDestructive ? 'text-[15px] leading-5' : 'min-w-0 flex-1 truncate text-[15px] leading-5'}>
        {label}
      </span>
      {!isDestructive && (
        <span className="ml-auto flex shrink-0 items-center gap-2 text-[15px] leading-5 text-white/50">
          {value && <span className="max-w-[122px] truncate text-right">{value}</span>}
          {right}
          {variant === 'toggle' && <SwitchIndicator checked={checked} disabled={disabled} />}
          {variant === 'navigation' && <ChevronRight size={15} className="text-white/30" strokeWidth={2} />}
        </span>
      )}
    </>
  )
}

export function SettingsRow({ href, variant = 'navigation', className = '', disabled = false, onClick, ...props }: SettingsRowProps) {
  const isDestructive = variant === 'destructive'
  const rowClassName = [
    'flex min-h-[52px] w-full items-center gap-3 border-b border-alpha-white-05 px-4 py-3 text-left transition-transform duration-[var(--dur-fast)] last:border-b-0 active:scale-[0.99]',
    isDestructive
      ? 'justify-center rounded-md border-b-0 bg-ink-brown-800 text-error-red'
      : 'bg-ink-brown-800 text-white',
    disabled ? 'cursor-not-allowed opacity-45' : '',
    className,
  ].filter(Boolean).join(' ')

  if (href) {
    return (
      <Link href={href} className={rowClassName}>
        <SettingsRowContent variant={variant} disabled={disabled} {...props} />
      </Link>
    )
  }

  if (variant === 'display') {
    return (
      <div className={rowClassName}>
        <SettingsRowContent variant={variant} disabled={disabled} {...props} />
      </div>
    )
  }

  return (
    <button
      type="button"
      className={rowClassName}
      onClick={onClick}
      disabled={disabled}
      role={variant === 'toggle' ? 'switch' : undefined}
      aria-checked={variant === 'toggle' ? props.checked : undefined}
    >
      <SettingsRowContent variant={variant} disabled={disabled} {...props} />
    </button>
  )
}

export function SettingsGroup({ children, className = '', ...props }: SettingsGroupProps) {
  return (
    <div
      className={[
        'overflow-hidden rounded-xl border border-alpha-white-06 bg-ink-brown-800 shadow-1',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}

export function SettingsSection({ title, children, className = '', ...props }: SettingsSectionProps) {
  return (
    <section className={className} {...props}>
      <Eyebrow className="mb-3 px-1 text-white/50">{title}</Eyebrow>
      <SettingsGroup>{children}</SettingsGroup>
    </section>
  )
}

export function SiaSettingsNote({ children, className = '', ...props }: SettingsGroupProps) {
  return (
    <div
      className={['flex items-start gap-2 px-1 text-[13px] leading-[18px] text-white/40', className].filter(Boolean).join(' ')}
      {...props}
    >
      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-royal-purple" aria-hidden="true" />
      <p>{children}</p>
    </div>
  )
}
