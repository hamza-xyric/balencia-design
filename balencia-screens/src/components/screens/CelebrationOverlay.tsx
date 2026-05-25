import { ShieldCheck, Share2 } from 'lucide-react'
import { ContinuousStroke } from '@/components/design-system/ContinuousStroke'
import { domainToneClasses } from '@/components/design-system/Chip'
import type { DomainKey } from '@/data/domains'

type CelebrationOverlayProps = {
  xp: number
  title: string
  description: string
  message: string
  attribution?: string
  domain: DomainKey
  badgeLabel?: string
  className?: string
}

const particles = [
  { left: 13, top: 4, delay: 0, duration: 3600, size: 'h-1.5 w-1.5 rounded-full', color: 'bg-brand-orange/80' },
  { left: 26, top: 10, delay: 120, duration: 3200, size: 'h-1 w-3 rounded-pill', color: 'bg-forest-green/60' },
  { left: 42, top: 5, delay: 240, duration: 3800, size: 'h-1.5 w-1.5 rounded-xs', color: 'bg-stalled-amber/60' },
  { left: 58, top: 11, delay: 90, duration: 3400, size: 'h-1 w-3 rounded-pill', color: 'bg-white/20' },
  { left: 75, top: 5, delay: 180, duration: 3600, size: 'h-1.5 w-1.5 rounded-full', color: 'bg-brand-orange/70' },
  { left: 86, top: 14, delay: 300, duration: 3300, size: 'h-1.5 w-1.5 rounded-xs', color: 'bg-forest-green/50' },
  { left: 18, top: 22, delay: 360, duration: 3700, size: 'h-1 w-3 rounded-pill', color: 'bg-stalled-amber/50' },
  { left: 67, top: 24, delay: 480, duration: 3500, size: 'h-1.5 w-1.5 rounded-full', color: 'bg-brand-orange/70' },
]

export function CelebrationOverlay({
  xp,
  title,
  description,
  message,
  attribution = 'SIA',
  domain,
  badgeLabel = 'XP',
  className = '',
}: CelebrationOverlayProps) {
  const tone = domainToneClasses[domain]

  return (
    <section
      className={[
        'relative flex h-full min-h-[724px] flex-col items-center overflow-hidden bg-ink-900 px-6 text-center',
        className,
      ].filter(Boolean).join(' ')}
      aria-label="Achievement celebration"
    >
      <div className="absolute inset-0 bg-brand-orange/5" aria-hidden="true" />
      <div className="absolute inset-x-12 top-24 h-64 rounded-full bg-brand-orange/10 blur-3xl" aria-hidden="true" />

      <div className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
        {particles.map((particle, index) => (
          <span
            key={`${particle.left}-${index}`}
            className={[
              'celebration-particle absolute',
              particle.size,
              particle.color,
            ].join(' ')}
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}ms`,
              animationDuration: `${particle.duration}ms`,
            }}
          />
        ))}
      </div>

      <div className="relative z-20 flex flex-1 flex-col items-center justify-center pt-8">
        <div
          className={[
            'celebration-badge-pop flex h-24 w-24 items-center justify-center rounded-full border-2 bg-ink-brown-800 shadow-2',
            tone.border,
            tone.subtle,
          ].join(' ')}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ink-900">
            <ShieldCheck size={26} className={tone.text} strokeWidth={2.2} />
          </div>
          <span className="absolute -bottom-2 rounded-pill border border-white/[0.06] bg-ink-900 px-3 py-1 text-small font-semibold leading-[14px] text-white">
            {badgeLabel}
          </span>
        </div>

        <div className="mt-8 animate-fade-up" style={{ animationDelay: '520ms' }}>
          <div className="inline-flex items-baseline justify-center gap-2 rounded-pill bg-brand-orange/10 px-5 py-2 shadow-[var(--glow-orange)]">
            <span className="text-[20px] leading-7 text-white/60">+</span>
            <span className="text-[36px] font-bold leading-10 text-white tabular-nums">{xp}</span>
            <span className="text-[20px] font-semibold leading-7 text-brand-orange">XP</span>
          </div>
        </div>

        <div className="mt-7 max-w-[300px] animate-fade-up" style={{ animationDelay: '760ms' }}>
          <h1 className="text-h2 font-semibold leading-[26px] text-white">{title}</h1>
          <p className="mt-2 text-body leading-6 text-white/70">&quot;{description}&quot;</p>
        </div>

        <ContinuousStroke className="mt-8 w-[160px] opacity-80" />

        <div className="mt-6 max-w-[288px] animate-fade-up" style={{ animationDelay: '1040ms' }}>
          <p className="text-[15px] italic leading-[22px] text-white/80">&quot;{message}&quot;</p>
          <div className="mt-3 inline-flex items-center justify-center gap-2 text-caption font-semibold leading-[18px] text-royal-purple/70">
            <span className="h-1.5 w-1.5 rounded-full bg-royal-purple/70" aria-hidden="true" />
            <span>- {attribution}</span>
          </div>
        </div>

        <button
          type="button"
          className="mt-8 inline-flex h-11 w-40 items-center justify-center gap-2 rounded-pill border border-white/20 bg-transparent text-[15px] font-semibold leading-5 text-white transition-transform duration-[var(--dur-fast)] active:scale-95"
        >
          <Share2 size={16} strokeWidth={2.2} />
          <span>Share</span>
        </button>
      </div>

      <p className="celebration-hint relative z-20 pb-7 text-caption leading-[18px] text-white/40">
        tap anywhere to continue
      </p>
    </section>
  )
}
