import { cx, type Tone } from './core'

// Canon glass card (.hifi .glass-card recipe) with the semantic inner-glow
// signature: one glow per card, meaning-driven — you/effort = orange,
// done/growth = green, CIA/AI = purple. tone="muted" renders glass without
// a glow for neutral surfaces.
export function GlassCard({
  children,
  className,
  tone = 'you',
}: {
  children: React.ReactNode
  className?: string
  tone?: Tone
}) {
  const glow = tone === 'cia'
    ? 'glow-inner-cia'
    : tone === 'done'
      ? 'glow-inner-done'
      : tone === 'muted'
        ? undefined
        : 'glow-inner-you'

  return (
    <section className={cx('glass-card p-5', glow, className)}>
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
