import type { CSSProperties } from 'react'

type ContinuousStrokeProps = {
  className?: string
  animated?: boolean
}

export function ContinuousStroke({ className = '', animated = true }: ContinuousStrokeProps) {
  return (
    <svg
      width="128"
      height="48"
      viewBox="0 0 128 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 22C20 6 42 6 54 21C66 36 86 42 124 12"
        className={animated ? 'stroke-brand-orange stroke-animate' : 'stroke-brand-orange'}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: 160,
          '--stroke-length': 160,
        } as CSSProperties}
      />
    </svg>
  )
}
