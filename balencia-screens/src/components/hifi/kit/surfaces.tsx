import { cx, type Tone } from './core'

export function GlassCard({
  children,
  className,
  tone = 'you',
}: {
  children: React.ReactNode
  className?: string
  tone?: Tone
}) {
  const shadow = tone === 'cia'
    ? 'shadow-[var(--glow-purple-sm)]'
    : tone === 'done'
      ? 'shadow-[var(--glow-green-sm)]'
      : 'shadow-[var(--glow-orange-sm)]'

  return (
    <section className={cx('surface-hero rounded-2xl p-5', shadow, className)}>
      {children}
    </section>
  )
}

export function SolidCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={cx('surface-warm rounded-xl p-4', className)}>
      {children}
    </section>
  )
}
