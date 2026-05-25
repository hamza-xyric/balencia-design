import type { HTMLAttributes } from 'react'
import { Check } from 'lucide-react'
import { DomainTag } from '@/components/design-system/DomainTag'
import type { TodayAction } from '@/data/mock'

type ActionCardProps = HTMLAttributes<HTMLDivElement> & {
  action: TodayAction
}

export function ActionCard({ action, className = '', ...props }: ActionCardProps) {
  return (
    <article
      className={[
        'rounded-xl border border-white/[0.06] bg-ink-brown-800 p-6 shadow-1 transition-transform duration-[var(--dur-fast)] active:scale-[0.98]',
        action.completed ? 'opacity-55' : '',
        className,
      ].filter(Boolean).join(' ')}
      aria-label={`${action.name}, ${action.domain}, ${action.timeEstimate}, tap to expand, swipe right to complete`}
      {...props}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <DomainTag domain={action.domain} />
          <h2
            className={[
              'mt-3 text-body font-semibold leading-[22px] text-white',
              action.completed ? 'line-through decoration-white/40' : '',
            ].filter(Boolean).join(' ')}
          >
            {action.name}
          </h2>
          <div className="mt-1 flex items-center gap-2 text-caption leading-[18px] text-white/50">
            <span>{action.timeEstimate}</span>
            <span aria-hidden="true">•</span>
            <span className="font-semibold text-brand-orange">+{action.xp} XP</span>
          </div>
        </div>
        <button
          className={[
            'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-transform duration-[var(--dur-base)] active:scale-90',
            action.completed ? 'border-brand-orange bg-brand-orange' : 'border-white/30',
          ].join(' ')}
          aria-label={`Mark ${action.name} as complete`}
        >
          {action.completed && <Check size={14} className="text-white" strokeWidth={2.4} />}
        </button>
      </div>
    </article>
  )
}
