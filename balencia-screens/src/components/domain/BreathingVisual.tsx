import type { HTMLAttributes } from 'react'

type BreathingVisualProps = HTMLAttributes<HTMLDivElement> & {
  phase?: 'inhale' | 'hold' | 'exhale'
  seconds?: string
  size?: 'mini' | 'compact' | 'large'
}

export function BreathingVisual({
  phase = 'inhale',
  seconds = '3.2s',
  size = 'large',
  className = '',
  ...props
}: BreathingVisualProps) {
  const diameter = size === 'large' ? 'h-[240px] w-[240px]' : size === 'compact' ? 'h-[160px] w-[160px]' : 'h-12 w-12'
  const phaseLabel = phase === 'inhale' ? 'INHALE' : phase === 'exhale' ? 'EXHALE' : 'HOLD'

  return (
    <div
      className={[
        'relative flex shrink-0 items-center justify-center rounded-full',
        diameter,
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      <div className="absolute inset-0 rounded-full bg-domain-wellbeing/10 blur-2xl quiet-pulse" aria-hidden="true" />
      <div className="breathing-guide absolute inset-0 rounded-full border-[3px] border-domain-wellbeing/60 bg-domain-wellbeing/10" aria-hidden="true" />
      <div className={['relative z-10 text-center', size === 'mini' ? 'hidden' : ''].filter(Boolean).join(' ')}>
        <div className="text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/70">
          {phaseLabel}
        </div>
        <div className="mt-2 text-h1 font-bold leading-[34px] text-white tabular-nums">
          {seconds}
        </div>
      </div>
    </div>
  )
}
