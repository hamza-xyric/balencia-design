import { ChevronRight } from 'lucide-react'
import { ConstellationRadar } from '@/components/charts/ConstellationRadar'
import { Eyebrow } from '@/components/design-system/Eyebrow'
import { domains } from '@/data/domains'
import type { DomainProgress, DomainStat } from '@/data/mock'
import { KPIStatTile } from './KPIStatTile'

// S12-V01 · Life Balance Card — the Home hero (CK-P2 focal block). The cross-domain
// differentiator: a Constellation Radar with the Life-Power sun hub, the top domains
// ranked beside it, an honest average-stat + weekly-delta footer, and one warm SIA read.
type LifeBalanceCardProps = {
  stats: DomainStat[]
  progress: DomainProgress[]
  // null = cold-start / Day-1 "calibrating" state (radar hub shows the calibrating label).
  lifePower: number | null
  siaRead: string
  onOpen?: () => void
  className?: string
}

function mean(values: number[]) {
  if (values.length === 0) return 0
  return values.reduce((sum, v) => sum + v, 0) / values.length
}

export function LifeBalanceCard({
  stats,
  progress,
  lifePower,
  siaRead,
  onOpen,
  className = '',
}: LifeBalanceCardProps) {
  const top = [...stats].sort((a, b) => b.stat - a.stat).slice(0, 3)
  const avg = Math.round(mean(stats.map((s) => s.stat)))
  const avgDelta = Math.round(mean(progress.map((p) => p.weekDelta)))

  return (
    <button
      type="button"
      onClick={onOpen}
      className={[
        'focus-ring surface-hero w-full p-6 text-left transition-transform duration-[var(--dur-fast)] active:scale-[0.99]',
        className,
      ].filter(Boolean).join(' ')}
      aria-label="Life balance. Tap to open life areas."
    >
      <div className="flex items-center justify-between">
        <Eyebrow>Life balance</Eyebrow>
        <ChevronRight size={16} className="text-white/40" strokeWidth={1.8} aria-hidden="true" />
      </div>

      {/* One warm SIA read (the lone purple cue on this card) */}
      <div className="mt-2 flex items-start gap-2">
        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-royal-purple" aria-hidden="true" />
        <p className="text-caption leading-[var(--leading-normal)] text-white/70">{siaRead}</p>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <ConstellationRadar stats={stats} lifePower={lifePower} size={150} />
        <ul className="min-w-0 flex-1 space-y-2.5">
          {top.map((s) => (
            <li key={s.domain} className="flex items-center gap-2">
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ background: `var(--color-domain-${s.domain})` }}
                aria-hidden="true"
              />
              <span className="min-w-0 flex-1 truncate text-caption leading-[var(--leading-normal)] text-white/70">
                {domains[s.domain].label}
              </span>
              <span className="text-h3 font-semibold tabular-nums leading-none text-white">{s.stat}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex items-end justify-between border-t border-alpha-white-06 pt-4">
        <KPIStatTile label="Average stat" value={avg} delta={avgDelta} />
        <span className="text-caption leading-[var(--leading-normal)] text-white/30">
          across {stats.length} areas
        </span>
      </div>
    </button>
  )
}
