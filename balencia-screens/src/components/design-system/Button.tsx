import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'completion' | 'skip' | 'ghost'
type ButtonSize = 'auth' | 'card' | 'compact'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-brand-orange text-white hover:shadow-[var(--glow-orange)]',
  completion: 'bg-forest-green text-white hover:shadow-[var(--glow-green)]',
  skip: 'bg-ink-700 text-white/70 hover:bg-ink-brown-800',
  ghost: 'bg-transparent text-white/70 hover:bg-white/5 hover:text-white',
}

const sizeClasses: Record<ButtonSize, string> = {
  auth: 'h-[56px] px-6 text-[17px]',
  card: 'h-[48px] px-5 text-body',
  compact: 'h-11 px-4 text-caption',
}

export function Button({
  variant = 'primary',
  size = 'card',
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        'inline-flex items-center justify-center gap-2 rounded-pill font-semibold transition-all duration-[var(--dur-base)] ease-[var(--ease-out-soft)] disabled:cursor-not-allowed disabled:opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {leftIcon}
      <span>{children}</span>
      {rightIcon}
    </button>
  )
}
