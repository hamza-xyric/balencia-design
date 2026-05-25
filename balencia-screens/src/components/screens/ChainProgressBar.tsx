import type { HTMLAttributes } from 'react'

type ChainProgressBarProps = HTMLAttributes<HTMLDivElement> & {
  current: number
  total: number
}

export function ChainProgressBar({ current, total, className = '', ...props }: ChainProgressBarProps) {
  const steps = Array.from({ length: total }, (_, index) => index + 1)

  return (
    <div
      className={['space-y-1', className].filter(Boolean).join(' ')}
      aria-label={`Mission chain, step ${current} of ${total}`}
      {...props}
    >
      <div className="flex justify-end">
        <span className="text-small leading-[14px] text-white/40">
          {current} of {total}
        </span>
      </div>
      <div className="relative flex h-3 items-center">
        <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-pill bg-white/[0.08]" />
        <div className="relative z-10 flex w-full items-center justify-between">
          {steps.map((step) => {
            const isComplete = step < current
            const isCurrent = step === current
            return (
              <span
                key={step}
                className={[
                  'rounded-full',
                  isCurrent ? 'h-2 w-2 bg-brand-orange shadow-[var(--glow-orange)]' : 'h-1.5 w-1.5',
                  isComplete ? 'bg-forest-green' : '',
                  !isComplete && !isCurrent ? 'bg-white/20' : '',
                ].filter(Boolean).join(' ')}
                aria-hidden="true"
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
