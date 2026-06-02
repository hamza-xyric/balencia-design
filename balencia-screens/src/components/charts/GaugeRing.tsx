import type { CSSProperties, HTMLAttributes } from 'react'

// VK-002 · GaugeRing — circular progress with premium depth. Upgrades ProgressRing
// with an arc-FOLLOWING gradient stroke (conic-gradient behind a circular mask — an
// SVG linearGradient cannot sweep along an arc), a beveled --track-inset track,
// size-calibrated glow (never neon), and round end-caps that track the fill.
type GaugeTone = 'orange' | 'green' | 'domain'

type GaugeRingProps = HTMLAttributes<HTMLDivElement> & {
  progress: number
  size?: 36 | 48 | 96 | 120
  tone?: GaugeTone
  /** CSS color for domain tone, e.g. "var(--color-domain-fitness)". */
  domainColor?: string
  /** Center label; defaults to the integer percentage. */
  valueText?: string
  showValue?: boolean
  label?: string
  animate?: boolean
}

const sizeConfig = {
  36: { stroke: 4, text: 'text-[11px]', glow: 'sm' },
  48: { stroke: 4, text: 'text-caption', glow: 'md' },
  96: { stroke: 8, text: 'text-h2', glow: 'lg' },
  120: { stroke: 10, text: 'text-h1', glow: 'lg' },
} as const

const glowToken: Record<GaugeTone, Record<'sm' | 'md' | 'lg', string>> = {
  orange: { sm: 'var(--glow-orange-sm)', md: 'var(--glow-orange-md)', lg: 'var(--glow-orange)' },
  green: { sm: 'var(--glow-green-sm)', md: 'var(--glow-green-md)', lg: 'var(--glow-green)' },
  domain: { sm: 'none', md: 'none', lg: 'none' },
}

export function GaugeRing({
  progress,
  size = 36,
  tone = 'orange',
  domainColor = 'var(--color-brand-orange)',
  valueText,
  showValue = true,
  label,
  animate = true,
  className = '',
  ...props
}: GaugeRingProps) {
  const normalized = Math.max(0, Math.min(progress, 1))
  const percent = Math.round(normalized * 100)
  const { stroke, text, glow } = sizeConfig[size]
  const complete = normalized >= 1

  // Arrival recolours to green unless the gauge is explicitly carrying a domain identity.
  const effectiveTone: GaugeTone = complete && tone !== 'domain' ? 'green' : tone
  const startColor =
    effectiveTone === 'green'
      ? 'var(--color-forest-green)'
      : effectiveTone === 'domain'
        ? domainColor
        : 'var(--color-brand-orange)'
  const endColor =
    effectiveTone === 'green'
      ? 'var(--color-forest-green)'
      : effectiveTone === 'domain'
        ? domainColor
        : 'var(--orange-light)'

  const sweepDeg = normalized * 360
  const rMid = (size - stroke) / 2
  const capTop = size / 2 - rMid - stroke / 2
  const capLeft = size / 2 - stroke / 2

  // Mask uses the alpha channel; `black` (alpha 1) reveals the ring band, `transparent` hides the disc.
  const annulusMask = `radial-gradient(farthest-side, transparent calc(100% - ${stroke}px), black calc(100% - ${stroke}px))`
  const trackBg = `radial-gradient(farthest-side, transparent calc(100% - ${stroke}px), var(--track-inset) calc(100% - ${stroke}px), var(--color-alpha-white-10) 100%)`
  const conicBg = `conic-gradient(${startColor} 0deg, ${endColor} var(--gauge-sweep), transparent var(--gauge-sweep) 360deg)`
  const restingSweep = { '--gauge-sweep': 'var(--gauge-target)' } as CSSProperties
  const glowValue = glowToken[effectiveTone][glow]

  return (
    <div
      className={['relative inline-flex shrink-0 items-center justify-center', className].filter(Boolean).join(' ')}
      style={{ width: size, height: size, '--gauge-target': `${sweepDeg}deg` } as CSSProperties}
      role="img"
      aria-label={label ?? `${percent}% complete`}
      {...props}
    >
      {glowValue !== 'none' && normalized > 0 && (
        <span className="absolute inset-0 rounded-full" style={{ boxShadow: glowValue }} aria-hidden="true" />
      )}
      {/* Beveled recessed track */}
      <span className="absolute inset-0 rounded-full" style={{ background: trackBg }} aria-hidden="true" />
      {/* Arc-following gradient fill (conic behind annulus mask) */}
      <span
        className={['absolute inset-0 rounded-full', animate ? 'gauge-animate' : ''].filter(Boolean).join(' ')}
        style={{
          background: conicBg,
          maskImage: annulusMask,
          WebkitMaskImage: annulusMask,
          ...restingSweep,
        }}
        aria-hidden="true"
      />
      {/* Round caps */}
      {normalized > 0 && (
        <span
          className="absolute rounded-full"
          style={{ width: stroke, height: stroke, top: capTop, left: capLeft, background: startColor }}
          aria-hidden="true"
        />
      )}
      {normalized > 0 && !complete && (
        <span
          className={['absolute inset-0', animate ? 'gauge-cap-animate' : ''].filter(Boolean).join(' ')}
          style={{ transformOrigin: 'center', transform: 'rotate(var(--gauge-sweep))', ...restingSweep }}
          aria-hidden="true"
        >
          <span
            className="absolute rounded-full"
            style={{ width: stroke, height: stroke, top: capTop, left: capLeft, background: endColor }}
          />
        </span>
      )}
      {showValue && (
        <span className={`absolute font-semibold leading-none tabular-nums text-white ${text}`}>
          {valueText ?? percent}
        </span>
      )}
    </div>
  )
}
