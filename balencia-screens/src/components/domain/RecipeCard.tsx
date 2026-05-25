import type { ReactNode } from 'react'
import { Clock, Heart, Utensils } from 'lucide-react'
import { Card } from '@/components/design-system/Card'

type RecipeDifficulty = 'easy' | 'medium' | 'hard'

export type RecipeCardData = {
  id: string
  name: string
  calories: number
  protein: number
  carbs?: number
  fat?: number
  time: string
  difficulty: RecipeDifficulty | string
  favorite?: boolean
  siaPick?: boolean
  dietPlan?: boolean
}

type RecipeCardProps = {
  recipe: RecipeCardData
  compact?: boolean
  className?: string
  imageIcon?: ReactNode
}

const difficultyClasses: Record<RecipeDifficulty, string> = {
  easy: 'bg-forest-green/15 text-forest-green',
  medium: 'bg-stalled-amber/15 text-stalled-amber',
  hard: 'bg-error-red/15 text-error-red',
}

export function RecipeCard({ recipe, compact = false, className = '', imageIcon }: RecipeCardProps) {
  return (
    <Card
      variant="small"
      className={[
        'overflow-hidden p-0',
        recipe.dietPlan ? 'border-l-2 border-l-domain-nutrition' : '',
        compact ? 'w-[156px] shrink-0 rounded-lg' : 'rounded-md',
        className,
      ].filter(Boolean).join(' ')}
    >
      <div className={['relative bg-gradient-to-br from-domain-nutrition/15 via-ink-brown-800 to-ink-900', compact ? 'h-[92px]' : 'h-[112px]'].join(' ')}>
        <div className="absolute inset-0 flex items-center justify-center text-white/20" aria-hidden="true">
          {imageIcon || <Utensils size={28} strokeWidth={1.9} />}
        </div>
        {recipe.siaPick && (
          <span className="absolute left-2 top-2 rounded-pill bg-royal-purple/15 px-2 py-1 text-small font-semibold leading-3 text-royal-purple">
            SIA pick
          </span>
        )}
        <span className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-ink-900/80 text-brand-orange">
          <Heart size={16} fill={recipe.favorite ? 'currentColor' : 'none'} strokeWidth={2.1} />
        </span>
      </div>
      <div className={compact ? 'p-3' : 'p-3'}>
        <h3 className="line-clamp-2 min-h-[38px] text-[15px] font-semibold leading-5 text-white">
          {recipe.name}
        </h3>
        <p className="mt-1 truncate text-small leading-[14px] text-white/50">
          {recipe.calories} cal . {recipe.protein}g P{recipe.carbs ? ` . ${recipe.carbs}g C` : ''}
        </p>
        {!compact && (
          <div className="mt-3 flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1 text-small leading-[14px] text-white/40">
              <Clock size={12} strokeWidth={2.1} />
              {recipe.time}
            </span>
            <span className={`rounded-sm px-2 py-1 text-small font-semibold leading-3 ${difficultyClasses[recipe.difficulty as RecipeDifficulty] || 'bg-white/10 text-white/50'}`}>
              {recipe.difficulty}
            </span>
          </div>
        )}
      </div>
    </Card>
  )
}
