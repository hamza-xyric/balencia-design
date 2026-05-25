import Link from 'next/link'
import type { CSSProperties } from 'react'
import { Check } from 'lucide-react'
import { Card } from '@/components/design-system/Card'
import { Eyebrow } from '@/components/design-system/Eyebrow'
import type { Meal } from '@/data/mock'

type MealCardProps = {
  meals: Meal[]
  href?: string
  className?: string
  style?: CSSProperties
}

const mealLabels: Record<Meal['mealType'], string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  snack: 'Snacks',
}

export function MealCard({ meals, href = '/domains/meal', className = '', style }: MealCardProps) {
  return (
    <Card className={className} style={style}>
      <Eyebrow>Today&apos;s meals</Eyebrow>
      <div className="mt-4">
        {meals.map((meal, index) => {
          const logged = meal.mealType === 'breakfast' || meal.mealType === 'lunch'

          return (
            <Link
              href={href}
              key={meal.id}
              className={[
                'block py-3 transition-transform duration-[var(--dur-fast)] active:scale-[0.98]',
                index === 0 ? 'pt-0' : 'border-t border-white/10',
              ].join(' ')}
            >
              <div className="flex items-center gap-2">
                {logged && (
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-forest-green text-white" aria-hidden="true">
                    <Check size={10} strokeWidth={2.4} />
                  </span>
                )}
                <span className="text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">
                  {mealLabels[meal.mealType]}
                </span>
              </div>
              <div className="mt-1 truncate text-body font-semibold leading-[22px] text-white">
                {meal.name}
              </div>
              <div className="mt-1 truncate text-[12px] leading-4 text-white/50">
                {meal.calories} cal · {meal.protein}g P · {meal.carbs}g C · {meal.fat}g F
              </div>
            </Link>
          )
        })}
      </div>
    </Card>
  )
}
