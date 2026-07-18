'use client'

import { useId } from 'react'
import { cx } from './core'

type GlassPillInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className' | 'value'> & {
  label?: string
  icon?: React.ReactNode
  placeholder: string
  value?: string
  trailing?: React.ReactNode
  focused?: boolean
  className?: string
  // Renders a native <textarea> in the same visual shell for prompt-length entry.
  multiline?: boolean
  rows?: number
}

// Native input inside the existing visual shell. `value` remains as a
// backwards-compatible static-prototype alias and is rendered as defaultValue.
export function GlassPillInput({
  id,
  label,
  icon,
  placeholder,
  value,
  defaultValue,
  trailing,
  focused = false,
  className,
  multiline = false,
  rows = 3,
  ...inputProps
}: GlassPillInputProps) {
  const generatedId = useId()
  const resolvedLabel = label ?? placeholder
  const resolvedId = id ?? generatedId

  return (
    <div className={cx('space-y-1.5', className)}>
      <label htmlFor={resolvedId} className="sr-only">{resolvedLabel}</label>
      <div
        className={cx(
          'glass-pill flex gap-3 px-4 transition-[border-color] duration-[var(--dur-fast)] focus-within:border-brand-orange focus-within:shadow-[var(--focus-ring)]',
          multiline ? 'items-start rounded-[20px] py-3' : 'h-[52px] items-center',
          focused && 'border-brand-orange shadow-[var(--focus-ring)]',
        )}
      >
        {icon && <span aria-hidden="true" className={cx('shrink-0 text-paper-100/65', multiline && 'mt-1')}>{icon}</span>}
        {multiline ? (
          <textarea
            id={resolvedId}
            rows={rows}
            className="min-w-0 flex-1 resize-none bg-transparent text-[16px] leading-6 text-paper-100 outline-none placeholder:text-paper-100/55"
            placeholder={placeholder}
            defaultValue={defaultValue ?? value}
            {...(inputProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            id={resolvedId}
            className="h-11 min-w-0 flex-1 bg-transparent text-[16px] text-paper-100 outline-none placeholder:text-paper-100/55"
            placeholder={placeholder}
            defaultValue={defaultValue ?? value}
            {...inputProps}
          />
        )}
        {trailing}
      </div>
    </div>
  )
}
