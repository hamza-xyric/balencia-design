'use client'

import type { InputHTMLAttributes } from 'react'

type ToggleSwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> & {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export function ToggleSwitch({
  checked,
  defaultChecked = false,
  onCheckedChange,
  className = '',
  disabled,
  id,
  ...props
}: ToggleSwitchProps) {
  const inputId = id || props.name
  const isControlled = checked !== undefined

  return (
    <label className={['relative inline-flex h-5 w-[34px] shrink-0 items-center', disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'].join(' ')}>
      <input
        id={inputId}
        type="checkbox"
        role="switch"
        checked={isControlled ? checked : undefined}
        defaultChecked={isControlled ? undefined : defaultChecked}
        readOnly={isControlled && !onCheckedChange ? true : undefined}
        disabled={disabled}
        className="peer sr-only"
        onChange={(event) => onCheckedChange?.(event.currentTarget.checked)}
        {...props}
      />
      <span
        className={[
          'inline-flex h-5 w-[34px] rounded-pill bg-white/15 outline-none transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out-soft)] peer-checked:bg-brand-orange peer-focus-visible:ring-2 peer-focus-visible:ring-brand-orange/70',
          className,
        ].filter(Boolean).join(' ')}
      />
      <span className="pointer-events-none absolute h-4 w-4 translate-x-0.5 rounded-full bg-white transition-transform duration-[var(--dur-fast)] ease-[var(--ease-flow)] peer-checked:translate-x-[16px]" />
    </label>
  )
}
