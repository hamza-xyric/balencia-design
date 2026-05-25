import { Check, Minus } from 'lucide-react'

type TierFeature = {
  label: string
  included?: boolean
}

type TierCardProps = {
  name: string
  price: string
  cadence: string
  features: TierFeature[]
  current?: boolean
  recommended?: boolean
  actionVariant?: 'upgrade' | 'downgrade'
  ctaLabel: string
  className?: string
}

export function TierCard({
  name,
  price,
  cadence,
  features,
  current = false,
  recommended = false,
  actionVariant = 'upgrade',
  ctaLabel,
  className = '',
}: TierCardProps) {
  const isDowngrade = actionVariant === 'downgrade'

  return (
    <article
      className={[
        'flex h-[330px] w-[260px] shrink-0 flex-col rounded-xl border bg-ink-brown-800 p-6 shadow-1',
        current ? 'border-2 border-brand-orange' : 'border-white/[0.06]',
        className,
      ].filter(Boolean).join(' ')}
    >
      <div className="h-5 text-center">
        {recommended && (
          <span className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.12em] text-brand-orange">
            Recommended
          </span>
        )}
      </div>
      <h2 className="mt-1 text-center text-[18px] font-semibold leading-6 text-white">{name}</h2>
      <div className="mt-2 text-center">
        <span className="text-[32px] font-bold leading-9 text-white">{price}</span>
        <span className="ml-1 text-[15px] leading-5 text-white/50">{cadence}</span>
      </div>

      <ul className="mt-5 space-y-2">
        {features.map((feature) => {
          const included = feature.included !== false
          const Icon = included ? Check : Minus
          return (
            <li key={feature.label} className="flex items-start gap-2">
              <Icon
                size={14}
                className={included ? 'mt-0.5 shrink-0 text-brand-orange' : 'mt-0.5 shrink-0 text-white/20'}
                strokeWidth={2.2}
              />
              <span className={included ? 'text-[13px] leading-[18px] text-white/70' : 'text-[13px] leading-[18px] text-white/30 line-through'}>
                {feature.label}
              </span>
            </li>
          )
        })}
      </ul>

      <button
        className={[
          'mt-auto h-11 rounded-pill px-4 text-[15px] font-semibold leading-5',
          current
            ? 'bg-ink-700 text-white/50'
            : isDowngrade
              ? 'border border-white/10 text-white/80'
              : 'bg-brand-orange text-white',
        ].join(' ')}
      >
        {ctaLabel}
      </button>
    </article>
  )
}
