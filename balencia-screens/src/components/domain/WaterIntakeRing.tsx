import type { CSSProperties } from 'react'

type WaterIntakeRingProps = {
  consumedGlasses: number
  targetGlasses: number
  milliliters: number
  xpReward?: number
  achievedAt?: string
  className?: string
}

export function WaterIntakeRing({
  consumedGlasses,
  targetGlasses,
  milliliters,
  xpReward,
  achievedAt,
  className = '',
}: WaterIntakeRingProps) {
  const progress = targetGlasses > 0 ? consumedGlasses / targetGlasses : 0
  const normalized = Math.max(0, Math.min(progress, 1))
  const achieved = progress >= 1
  const size = 200
  const stroke = 12
  const radius = 88
  const circumference = 2 * Math.PI * radius
  const targetOffset = circumference * (1 - normalized)
  const percentage = Math.round(normalized * 100)

  return (
    <div className={['flex flex-col items-center text-center', className].filter(Boolean).join(' ')}>
      <div className="relative flex h-[200px] w-[200px] items-center justify-center">
        <div
          className={[
            'absolute inset-4 rounded-full blur-2xl',
            achieved ? 'bg-forest-green/15' : 'bg-domain-wellbeing/15',
          ].join(' ')}
          aria-hidden="true"
        />

        <svg className="relative -rotate-90" width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            className="text-white/[0.06]"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            className={`ring-animate ${achieved ? 'text-forest-green' : 'text-domain-wellbeing'}`}
            style={{
              '--ring-circumference': circumference,
              '--ring-target': targetOffset,
            } as CSSProperties}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="flex items-baseline justify-center gap-1 tabular-nums">
            <span className="text-[36px] font-bold leading-10 text-white">{consumedGlasses}</span>
            <span className="text-[24px] font-normal leading-7 text-white/40">/</span>
            <span className="text-[36px] font-bold leading-10 text-white/50">{targetGlasses}</span>
          </div>
          <div className="mt-1 text-[14px] leading-[18px] text-white/50">Glasses</div>
          <div className={['mt-1 text-caption leading-[17px]', achieved ? 'text-forest-green' : 'text-domain-wellbeing/80'].join(' ')}>
            {milliliters} ml
          </div>
        </div>
      </div>

      {achieved ? (
        <div className="mt-3">
          <p className="text-[15px] font-semibold leading-5 text-forest-green">
            Target achieved +{xpReward} XP
          </p>
          {achievedAt && <p className="mt-1 text-caption leading-[18px] text-white/40">at {achievedAt}</p>}
        </div>
      ) : (
        <p className="mt-3 text-[15px] font-semibold leading-5 text-white/60">
          {percentage}% of daily target
        </p>
      )}
    </div>
  )
}
