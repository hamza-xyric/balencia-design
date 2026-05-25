import type { HTMLAttributes } from 'react'
import { Droplet, HeartPulse, NotebookPen, PencilLine, Wind } from 'lucide-react'

export type QuickAction = {
  id: 'breathe' | 'water' | 'journal' | 'check-in' | 'quick-note'
  label: string
  isSIASuggested?: boolean
}

const quickActionIcons = {
  breathe: Wind,
  water: Droplet,
  journal: PencilLine,
  'check-in': HeartPulse,
  'quick-note': NotebookPen,
} as const

type QuickActionsRowProps = HTMLAttributes<HTMLDivElement> & {
  actions: QuickAction[]
}

export function QuickActionsRow({ actions, className = '', ...props }: QuickActionsRowProps) {
  return (
    <div
      className={['flex gap-2 overflow-x-auto pb-1 hide-scrollbar', className].filter(Boolean).join(' ')}
      {...props}
    >
      {actions.map((action) => {
        const Icon = quickActionIcons[action.id]
        return (
          <button
            key={action.id}
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-pill border border-white/[0.08] bg-ink-brown-800 px-4 text-caption font-semibold leading-[18px] text-white shadow-1"
            aria-label={`${action.label}, tap to open`}
          >
            {action.isSIASuggested && <span className="h-1 w-1 rounded-full bg-royal-purple" aria-hidden="true" />}
            <Icon size={16} className="text-brand-orange" strokeWidth={1.9} />
            <span>{action.label}</span>
          </button>
        )
      })}
    </div>
  )
}
