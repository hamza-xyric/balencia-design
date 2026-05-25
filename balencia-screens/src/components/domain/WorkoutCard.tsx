import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ArrowRight } from 'lucide-react'
import { Card } from '@/components/design-system/Card'
import { Eyebrow } from '@/components/design-system/Eyebrow'

type WorkoutCardProps = {
  name: string
  type: string
  duration: string
  exercises: string[]
  overflowCount?: number
  href?: string
  className?: string
  style?: CSSProperties
}

export function WorkoutCard({
  name,
  type,
  duration,
  exercises,
  overflowCount = 0,
  href = '/domains/workout',
  className = '',
  style,
}: WorkoutCardProps) {
  return (
    <Card className={className} style={style}>
      <Eyebrow>Today&apos;s workout</Eyebrow>
      <h2 className="mt-4 text-h3 font-semibold leading-[22px] text-white">{name}</h2>
      <p className="mt-1 text-caption leading-[18px] text-white/50">
        {type} · {duration}
      </p>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
        {exercises.map((exercise) => (
          <span
            key={exercise}
            className="inline-flex h-8 shrink-0 items-center rounded-sm bg-ink-900 px-3 text-caption leading-[18px] text-white"
          >
            {exercise}
          </span>
        ))}
        {overflowCount > 0 && (
          <span className="inline-flex h-8 shrink-0 items-center rounded-sm bg-white/[0.08] px-3 text-caption font-semibold leading-[18px] text-white/70">
            +{overflowCount}
          </span>
        )}
      </div>

      <Link
        href={href}
        className="mt-5 flex h-[48px] w-full items-center justify-center gap-2 rounded-pill bg-brand-orange px-5 text-body font-semibold text-white transition-transform duration-[var(--dur-fast)] active:scale-[0.97]"
      >
        <span>Start workout</span>
        <ArrowRight size={17} strokeWidth={2.2} />
      </Link>
    </Card>
  )
}
