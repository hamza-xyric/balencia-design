import type { SVGProps } from 'react'

// VK-016 · The Living Line (miniature) — a tiny, axis-less, curved orange stroke
// that draws itself on entry. Re-bases the brand's continuous-stroke signature at
// metric-card scale. Solid orange (no gradient at this size, per CONSISTENCY); a
// green end dot only when the latest point is a milestone/arrival. No axes, no glow.
type SparklineProps = Omit<SVGProps<SVGSVGElement>, 'points'> & {
  points: number[]
  width?: number
  height?: number
  milestone?: boolean
  /** Disable the draw-in (e.g. when already settled). */
  animate?: boolean
}

// Catmull-Rom → cubic-bezier, so the line reads as one smooth continuous stroke
// (round-joined), never a segmented "equalizer" of straight hops.
function smoothPath(pts: { x: number; y: number }[]) {
  if (pts.length < 2) return ''
  let d = `M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)}`
  for (let i = 0; i < pts.length - 1; i += 1) {
    const p0 = pts[i - 1] ?? pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] ?? pts[i + 1]
    const cp1x = p1.x + (p2.x - p0.x) / 6
    const cp1y = p1.y + (p2.y - p0.y) / 6
    const cp2x = p2.x - (p3.x - p1.x) / 6
    const cp2y = p2.y - (p3.y - p1.y) / 6
    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`
  }
  return d
}

export function Sparkline({
  points,
  width = 64,
  height = 24,
  milestone = false,
  animate = true,
  className = '',
  ...props
}: SparklineProps) {
  const padX = 2
  const padY = 3
  const min = Math.min(...points)
  const max = Math.max(...points)
  const span = max - min || 1
  const stepX = (width - padX * 2) / Math.max(points.length - 1, 1)

  const coords = points.map((value, index) => ({
    x: padX + index * stepX,
    // Invert: higher value sits higher on screen.
    y: padY + (height - padY * 2) * (1 - (value - min) / span),
  }))
  const d = smoothPath(coords)
  const end = coords[coords.length - 1]

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path
        d={d}
        pathLength={1}
        stroke="var(--color-brand-orange)"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animate ? 'line-draw-slow' : undefined}
        style={{ strokeWidth: 'var(--stroke-thin)' }}
      />
      {milestone && (
        <circle cx={end.x} cy={end.y} r="2.5" fill="var(--color-forest-green)" />
      )}
    </svg>
  )
}
