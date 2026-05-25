import type { HTMLAttributes } from 'react'
import { Check, Flame } from 'lucide-react'
import { DomainTag } from '@/components/design-system/DomainTag'
import type { DomainKey } from '@/data/domains'

type HabitRowProps = HTMLAttributes<HTMLDivElement> & {
  name: string
  domain: DomainKey
  streak: number
  completed: boolean
  withDivider?: boolean
}

export function HabitRow({
  name,
  domain,
  streak,
  completed,
  withDivider = false,
  className = '',
  ...props
}: HabitRowProps) {
  return (
    <div
      className={[
        'flex min-h-16 items-center gap-3 px-4 py-3',
        withDivider ? 'border-t border-white/[0.05]' : '',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      <span
        className={[
          'flex h-6 w-6 shrink-0 items-center justify-center rounded-xs border transition-transform duration-[var(--dur-fast)] active:scale-95',
          completed ? 'border-brand-orange bg-brand-orange text-white' : 'border-white/20 bg-transparent text-transparent',
        ].join(' ')}
        aria-hidden="true"
      >
        <Check size={14} strokeWidth={2.6} />
      </span>

      <div className="min-w-0 flex-1">
        <div className={`truncate text-body leading-[22px] ${completed ? 'text-white/50' : 'text-white'}`}>
          {name}
        </div>
        <div className="mt-1 flex min-w-0 items-center gap-2">
          {streak > 0 && (
            <span className="inline-flex shrink-0 items-center gap-1 text-small font-semibold leading-[14px] text-white/60">
              <Flame size={14} className="text-brand-orange" strokeWidth={2.2} />
              {streak} days
            </span>
          )}
          <DomainTag domain={domain} showDot={false} className="shrink-0" />
        </div>
      </div>
    </div>
  )
}
