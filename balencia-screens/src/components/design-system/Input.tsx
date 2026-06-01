'use client'

import type { InputHTMLAttributes, ReactNode } from 'react'
import { useState } from 'react'
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
  const [passwordVisible, setPasswordVisible] = useState(false)
  const inputId = id || props.name
  const usesPasswordToggle = showPasswordToggle && type === 'password'
  const renderedRightIcon = usesPasswordToggle ? null : rightIcon
  const inputClassName = [
    'h-[52px] w-full rounded-md border bg-ink-brown-800 px-4 text-body text-white outline-none transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out-soft)] placeholder:text-white/40',
    error ? 'border-2 border-error-red' : 'border-white/10 focus:border-2 focus:border-brand-orange',
    renderedRightIcon ? 'pr-12' : '',
    usesPasswordToggle ? 'pr-14' : '',
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
        <input
          id={inputId}
          type={usesPasswordToggle && passwordVisible ? 'text' : type}
          aria-invalid={error ? true : undefined}
          className={inputClassName}
          {...props}
        />
        {usesPasswordToggle && (
          <button
            type="button"
            aria-label={passwordVisible ? 'Hide password' : 'Show password'}
            aria-pressed={passwordVisible}
            onClick={() => setPasswordVisible((visible) => !visible)}
            className="absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white/50 outline-none transition-colors duration-[var(--dur-fast)] hover:text-white/70 focus-visible:ring-2 focus-visible:ring-brand-orange/70"
          >
            {passwordVisible ? <Eye size={20} aria-hidden="true" /> : <EyeOff size={20} aria-hidden="true" />}
          </button>
        )}
        {renderedRightIcon && (
          <span className="pointer-events-none absolute right-4 top-1/2 flex -translate-y-1/2 text-white/50">
            {renderedRightIcon}
          </span>
        )}
      </span>
      {(error || helperText) && (
        <span className={['mt-2 block text-caption', error ? 'text-error-red' : 'text-white/70'].join(' ')}>
          {error || helperText}
        </span>
      )}
    </div>
  )
}
