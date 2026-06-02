import type { HTMLAttributes } from 'react'

// VK-004 · MomentumBar — the horizontal Living Line. A SINGLE continuous
// orange→green fill (path-of-progress), never segmented. Frames forward momentum;
// a low bar reads as "room to move," never a failure state (non-shaming).
type MomentumBarProps = HTMLAttributes<HTMLDivElement> & {
  value: number
  max: number
  /** Visible caption above the bar, e.g. "3 of 6 · +90 XP". */
  caption?: string
  /** Trailing percentage label. */
  showPercent?: boolean
  animate?: boolean
}

export function MomentumBar({
  value,
  max,
  caption,
  showPercent = true,
  animate = true,
  className = '',
  ...props
}: MomentumBarProps) {
  const ratio = max > 0 ? Math.max(0, Math.min(value / max, 1)) : 0
  const percent = Math.round(ratio * 100)

  return (
    <div className={['w-full', className].filter(Boolean).join(' ')} {...props}>
      {(caption || showPercent) && (
        <div className="mb-2 flex items-baseline justify-between gap-3">
          {caption && (
            <span className="text-caption leading-[var(--leading-normal)] text-white/60">
              {caption}
            </span>
          )}
          {showPercent && (
            <span className="text-caption font-semibold tabular-nums leading-[var(--leading-normal)] text-white/80">
              {percent}%
            </span>
          )}
        </div>
      )}
      <div
        className="relative h-2 w-full overflow-hidden rounded-pill bg-alpha-white-08"
        style={{ boxShadow: 'inset 0 1px 2px var(--track-inset)' }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={caption ?? `${percent}% complete`}
      >
        <div
          className={['h-full rounded-pill', animate ? 'momentum-animate' : ''].filter(Boolean).join(' ')}
          style={{
            width: `${ratio * 100}%`,
            // Anchor the orange→green gradient to the FULL track range, not the fill box, so
            // green only emerges as the bar approaches arrival — a 33% bar reads pure-orange,
            // never a false green tip (VK-016 colour law: green = arrival only).
            backgroundImage: 'var(--grad-progress)',
            backgroundSize: `${ratio > 0 ? 100 / ratio : 100}% 100%`,
            backgroundPosition: 'left center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </div>
    </div>
  )
}
