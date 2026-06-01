import type { HTMLAttributes } from 'react'
import { Check } from 'lucide-react'
import { DomainTag } from '@/components/design-system/DomainTag'
import type { TodayAction } from '@/data/mock'

type ActionCardProps = HTMLAttributes<HTMLDivElement> & {
  action: TodayAction
  expanded?: boolean
  onOpen?: () => void
  onToggleComplete?: () => void
}

export function ActionCard({ action, expanded = false, onOpen, onToggleComplete, className = '', ...props }: ActionCardProps) {
  return (
    <article
      className={[
        'rounded-xl border border-alpha-white-06 bg-ink-brown-800 p-6 shadow-1 transition-transform duration-[var(--dur-fast)] active:scale-[0.98]',
        action.completed ? 'opacity-55' : '',
        className,
      ].filter(Boolean).join(' ')}
      aria-label={`${action.name}, ${action.domain}, ${action.timeEstimate}, tap to expand, swipe right to complete`}
      {...props}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <button
            type="button"
            onClick={onOpen}
            className="block w-full rounded-md text-left"
            aria-expanded={expanded}
          >
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
          </button>
        </div>
        <button
          className={[
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-transform duration-[var(--dur-base)] active:scale-90',
            action.completed ? 'border-brand-orange bg-brand-orange' : 'border-white/30',
          ].join(' ')}
          aria-label={`Mark ${action.name} as complete`}
          aria-pressed={action.completed}
          onClick={onToggleComplete}
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-current">
            {action.completed && <Check size={14} className="text-white" strokeWidth={2.4} />}
          </span>
        </button>
      </div>
      {expanded && (
        <div className="mt-4 rounded-md border border-alpha-white-06 bg-alpha-white-04 p-3 text-caption leading-[18px] text-white/60">
          SIA picked this because it supports today&apos;s momentum. Open the related screen for details or mark it complete here.
        </div>
      )}
    </article>
  )
}
