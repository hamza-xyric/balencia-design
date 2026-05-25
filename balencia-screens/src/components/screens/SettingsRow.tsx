import Link from 'next/link'
import type { HTMLAttributes, ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'
import { Eyebrow } from '@/components/design-system/Eyebrow'
import { ToggleSwitch } from '@/components/design-system/ToggleSwitch'

type SettingsRowVariant = 'display' | 'navigation' | 'toggle' | 'destructive'

type SettingsRowProps = {
  label: string
  value?: string
  href?: string
  variant?: SettingsRowVariant
  checked?: boolean
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

function SettingsRowContent({
  label,
  value,
  variant = 'navigation',
  checked,
  icon,
  right,
}: Omit<SettingsRowProps, 'href'>) {
  const isDestructive = variant === 'destructive'

  return (
    <>
      {icon && !isDestructive && (
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-white/60">
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
          {variant === 'toggle' && <ToggleSwitch checked={checked} aria-label={`Toggle ${label}`} />}
          {variant === 'navigation' && <ChevronRight size={15} className="text-white/30" strokeWidth={2} />}
        </span>
      )}
    </>
  )
}

export function SettingsRow({ href, variant = 'navigation', className = '', ...props }: SettingsRowProps) {
  const isDestructive = variant === 'destructive'
  const rowClassName = [
    'flex min-h-[52px] w-full items-center gap-3 border-b border-white/[0.05] px-4 py-3 text-left transition-transform duration-[var(--dur-fast)] last:border-b-0 active:scale-[0.99]',
    isDestructive
      ? 'justify-center rounded-md border-b-0 bg-ink-brown-800 text-error-red'
      : 'bg-ink-brown-800 text-white',
    className,
  ].filter(Boolean).join(' ')

  if (href) {
    return (
      <Link href={href} className={rowClassName}>
        <SettingsRowContent variant={variant} {...props} />
      </Link>
    )
  }

  if (variant === 'display' || variant === 'toggle') {
    return (
      <div className={rowClassName}>
        <SettingsRowContent variant={variant} {...props} />
      </div>
    )
  }

  return (
    <button
      type="button"
      className={rowClassName}
    >
      <SettingsRowContent variant={variant} {...props} />
    </button>
  )
}

export function SettingsGroup({ children, className = '', ...props }: SettingsGroupProps) {
  return (
    <div
      className={[
        'overflow-hidden rounded-xl border border-white/[0.06] bg-ink-brown-800 shadow-1',
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
