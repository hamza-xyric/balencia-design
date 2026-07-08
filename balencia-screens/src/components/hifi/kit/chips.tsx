import { cx, toneClass, type Tone } from './core'

export function Chip({ children, tone = 'muted' }: { children: React.ReactNode; tone?: Tone }) {
  return (
    <span className={cx('inline-flex min-h-8 items-center rounded-pill border px-3 text-[11px] font-semibold leading-4', toneClass[tone])}>
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
      {controls.map(item => <Chip key={item}>{item}</Chip>)}
    </div>
  )
}
