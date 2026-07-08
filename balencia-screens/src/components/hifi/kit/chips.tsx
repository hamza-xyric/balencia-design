import { cx, toneClass, type Tone } from './core'

// `interactive` marks a chip that acts as a button/selector: 44px hit area.
// The 32px badge default is for status/provenance display only. `pressed`
// only renders aria-pressed on interactive chips that are actual toggles —
// leave it undefined for chips that merely trigger an action (e.g. "show more").
export function Chip({ children, tone = 'muted', interactive = false, pressed }: { children: React.ReactNode; tone?: Tone; interactive?: boolean; pressed?: boolean }) {
  const className = cx('inline-flex items-center justify-center rounded-pill border text-[11px] font-semibold leading-4', interactive ? 'min-h-11 px-4' : 'min-h-8 px-3', toneClass[tone])
  if (interactive) {
    return (
      <button type="button" className={className} aria-pressed={pressed}>
        {children}
      </button>
    )
  }
  return (
    <span className={className}>
      {children}
    </span>
  )
}

export function Provenance({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map(item => <Chip key={item}>{item}</Chip>)}
    </div>
  )
}

export function ConsentRail({ compact = false }: { compact?: boolean }) {
  const controls = ['Source', 'Retention', 'Export', 'Revoke', 'Delete']
  return (
    <div className={cx('flex flex-wrap gap-2', compact ? 'mt-3' : 'mt-4')}>
      {controls.map(item => <Chip key={item} interactive>{item}</Chip>)}
    </div>
  )
}
