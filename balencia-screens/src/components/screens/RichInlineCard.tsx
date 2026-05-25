import type { CSSProperties, ReactNode } from 'react'
import { ArrowUpRight, Dumbbell, Utensils, WalletCards } from 'lucide-react'
import { DomainTag } from '@/components/design-system/DomainTag'
import { domainToneClasses } from '@/components/design-system/Chip'
import type { Meal, Mission, Workout } from '@/data/mock'

type RichInlineCardProps =
  | { type: 'chart'; className?: string }
  | { type: 'mission'; mission: Mission; className?: string }
  | { type: 'meal'; meal: Meal; className?: string }
  | { type: 'finance'; className?: string }
  | { type: 'workout'; workout: Workout; className?: string }
  | { type: 'connection'; className?: string }

function InlineCardShell({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={['flex w-full gap-2', className].filter(Boolean).join(' ')}>
      <div className="w-6 shrink-0" />
      <div className="w-full rounded-xl border border-white/[0.08] bg-ink-brown-800 p-4 shadow-1">
        {children}
      </div>
    </div>
  )
}

function CardLink({ children }: { children: ReactNode }) {
  return (
    <div className="mt-3 flex items-center justify-end gap-1 text-[12px] font-semibold leading-4 text-brand-orange">
      <span>{children}</span>
      <ArrowUpRight size={13} strokeWidth={2} />
    </div>
  )
}

function MiniLineChart() {
  return (
    <div className="mt-3 h-[112px] rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-3">
      <svg viewBox="0 0 240 88" className="h-full w-full" aria-hidden="true">
        <path d="M8 72 H232" className="stroke-white/10" strokeWidth="1" />
        <path d="M8 44 H232" className="stroke-white/10" strokeWidth="1" />
        <path d="M8 16 H232" className="stroke-white/10" strokeWidth="1" />
        <polyline
          points="8,62 38,58 68,46 98,50 128,34 158,28"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-brand-orange"
        />
        <polyline
          points="158,28 188,22 218,18 232,16"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="6 7"
          className="text-royal-purple"
        />
        <circle cx="128" cy="34" r="4" className="fill-forest-green" />
        <circle cx="158" cy="28" r="4" className="fill-forest-green" />
      </svg>
    </div>
  )
}

function MiniProgressRing({ mission }: { mission: Mission }) {
  const tone = domainToneClasses[mission.domain]
  const radius = 20
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - mission.progress)
  const percentage = Math.round(mission.progress * 100)

  return (
    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
      <svg className="-rotate-90" width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r={radius} fill="none" stroke="currentColor" strokeWidth="4" className="text-white/10" />
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={tone.text}
        />
      </svg>
      <span className="absolute text-[12px] font-semibold leading-none text-white">{percentage}</span>
    </div>
  )
}

function MacroPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-sm border border-white/[0.06] bg-white/[0.04] px-2 py-1">
      <span className="text-small font-semibold leading-[14px] text-white/50">{label}</span>
      <span className="ml-1 text-small font-semibold leading-[14px] text-white">{value}</span>
    </div>
  )
}

function FinanceRow({ label, value, positive }: { label: string; value: string; positive?: boolean }) {
  return (
    <div className="flex h-8 items-center justify-between border-b border-white/[0.05] last:border-b-0">
      <span className="text-caption leading-[18px] text-white/50">{label}</span>
      <span className={['text-caption font-semibold leading-[18px]', positive ? 'text-forest-green' : 'text-white'].join(' ')}>
        {value}
      </span>
    </div>
  )
}

export function RichInlineCard(props: RichInlineCardProps) {
  if (props.type === 'chart') {
    return (
      <InlineCardShell className={props.className}>
        <p className="text-[14px] font-semibold leading-[18px] text-white">Sleep vs exercise</p>
        <MiniLineChart />
        <p className="mt-2 text-[12px] leading-4 text-white/50">
          Morning workouts are tracking with better sleep consistency.
        </p>
        <CardLink>View more</CardLink>
      </InlineCardShell>
    )
  }

  if (props.type === 'mission') {
    return (
      <InlineCardShell className={props.className}>
        <div className="flex items-center gap-3">
          <MiniProgressRing mission={props.mission} />
          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-semibold leading-5 text-white">{props.mission.name}</p>
            <p className="mt-1 text-caption leading-[18px] text-white/50">
              {Math.round(props.mission.progress * 100)}% complete
            </p>
          </div>
        </div>
        <div className="mt-3 rounded-md border border-white/[0.06] bg-white/[0.04] p-3">
          <p className="text-caption leading-[18px] text-white/70">{props.mission.nextAction}</p>
        </div>
        <CardLink>View mission</CardLink>
      </InlineCardShell>
    )
  }

  if (props.type === 'meal') {
    return (
      <InlineCardShell className={props.className}>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-sm border border-domain-nutrition/30 bg-domain-nutrition/15 text-domain-nutrition">
            <Utensils size={16} strokeWidth={2} />
          </div>
          <p className="text-[14px] font-semibold leading-[18px] text-white">{props.meal.name}</p>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <MacroPill label="Cal" value={props.meal.calories.toString()} />
          <MacroPill label="Protein" value={`${props.meal.protein}g`} />
          <MacroPill label="Carbs" value={`${props.meal.carbs}g`} />
          <MacroPill label="Fat" value={`${props.meal.fat}g`} />
        </div>
        <CardLink>Add to plan</CardLink>
      </InlineCardShell>
    )
  }

  if (props.type === 'finance') {
    return (
      <InlineCardShell className={props.className}>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-sm border border-domain-finance/30 bg-domain-finance/15 text-domain-finance">
            <WalletCards size={16} strokeWidth={2} />
          </div>
          <p className="text-[14px] font-semibold leading-[18px] text-white">This month</p>
        </div>
        <div className="mt-3">
          <FinanceRow label="Income" value="$4,200" positive />
          <FinanceRow label="Expenses" value="$2,860" />
          <FinanceRow label="Net" value="$1,340" positive />
        </div>
        <CardLink>View finances</CardLink>
      </InlineCardShell>
    )
  }

  if (props.type === 'workout') {
    return (
      <InlineCardShell className={props.className}>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-sm border border-domain-fitness/30 bg-domain-fitness/15 text-domain-fitness">
            <Dumbbell size={16} strokeWidth={2} />
          </div>
          <div>
            <p className="text-[14px] font-semibold leading-[18px] text-white">{props.workout.name}</p>
            <p className="mt-0.5 text-[12px] leading-4 text-white/50">
              {props.workout.exercises.length} exercises - {props.workout.duration}
            </p>
          </div>
        </div>
        <button className="mt-3 h-8 rounded-pill bg-brand-orange px-4 text-[12px] font-semibold leading-4 text-white shadow-[var(--glow-orange)]">
          Start workout
        </button>
      </InlineCardShell>
    )
  }

  return (
    <InlineCardShell className={props.className}>
      <p className="text-eyebrow font-semibold uppercase tracking-[0.12em] text-royal-purple">
        Connection spotted
      </p>
      <p className="mt-2 text-[13px] leading-[18px] text-white/80">
        Your highest sleep scores follow days with morning movement and a complete protein target.
      </p>
      <div className="mt-3 flex items-center gap-2">
        <DomainTag domain="sleep" />
        <DomainTag domain="fitness" />
        <DomainTag domain="nutrition" />
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-pill bg-white/[0.08]">
        <div className="h-full rounded-pill bg-royal-purple" style={{ width: '72%' } as CSSProperties} />
      </div>
      <CardLink>Tell me more</CardLink>
    </InlineCardShell>
  )
}
