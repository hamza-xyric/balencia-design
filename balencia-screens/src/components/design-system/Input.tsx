'use client'

import type { InputHTMLAttributes, ReactNode } from 'react'
import { Eye, EyeOff } from 'lucide-react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
  helperText?: string
  rightIcon?: ReactNode
  showPasswordToggle?: boolean
}

export function Input({
  label,
  error,
  helperText,
  rightIcon,
  showPasswordToggle = false,
  className = '',
  id,
  type = 'text',
  ...props
}: InputProps) {
  const inputId = id || props.name
  const usesPasswordToggle = showPasswordToggle && type === 'password'
  const toggleId = `${inputId || 'password'}-visibility-toggle`
  const renderedRightIcon = usesPasswordToggle ? null : rightIcon
  const inputClassName = [
    'h-[52px] w-full rounded-md border bg-ink-brown-800 px-4 text-body text-white outline-none transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out-soft)] placeholder:text-white/40',
    error ? 'border-2 border-error-red' : 'border-white/10 focus:border-2 focus:border-brand-orange',
    renderedRightIcon || usesPasswordToggle ? 'pr-12' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <div className="block">
      {label && (
        <label htmlFor={inputId} className="mb-2 block text-caption font-semibold text-white/70">
          {label}
        </label>
      )}
      <span className="relative block">
        {usesPasswordToggle && (
          <input
            id={toggleId}
            type="checkbox"
            aria-label="Show password"
            className="peer sr-only"
          />
        )}
        <input
          id={inputId}
          type={type}
          className={[inputClassName, usesPasswordToggle ? 'peer-checked:hidden' : ''].filter(Boolean).join(' ')}
          {...props}
        />
        {usesPasswordToggle && (
          <>
            <input
              type="text"
              aria-hidden="true"
              tabIndex={-1}
              placeholder={props.placeholder}
              defaultValue={props.defaultValue as string | number | readonly string[] | undefined}
              className={[inputClassName, 'hidden peer-checked:block'].join(' ')}
              data-password-visible="true"
            />
            <label
              htmlFor={toggleId}
              className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-white/50 outline-none transition-colors duration-[var(--dur-fast)] hover:text-white/70 peer-checked:hidden peer-focus-visible:ring-2 peer-focus-visible:ring-brand-orange/70"
            >
              <EyeOff size={20} aria-hidden="true" />
            </label>
            <label
              htmlFor={toggleId}
              className="absolute right-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-white/50 outline-none transition-colors duration-[var(--dur-fast)] hover:text-white/70 peer-checked:flex peer-focus-visible:ring-2 peer-focus-visible:ring-brand-orange/70"
            >
              <Eye size={20} aria-hidden="true" />
            </label>
          </>
        )}
        {renderedRightIcon && (
          <span className="pointer-events-none absolute right-4 top-1/2 flex -translate-y-1/2 text-white/50">
            {renderedRightIcon}
          </span>
        )}
      </span>
      {(error || helperText) && (
        <span className={['mt-2 block text-caption', error ? 'text-error-red' : 'text-white/40'].join(' ')}>
          {error || helperText}
        </span>
      )}
    </div>
  )
}
