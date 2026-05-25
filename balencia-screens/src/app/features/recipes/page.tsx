import { Plus, Search, SlidersHorizontal, Utensils } from 'lucide-react'
import { Card } from '@/components/design-system/Card'
import { DomainDashboardHeader } from '@/components/domain/DomainDashboardHeader'
import { RecipeCard } from '@/components/domain/RecipeCard'
import type { RecipeCardData } from '@/components/domain/RecipeCard'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { recipesLibrary } from '@/data/mock'

// Screen 56 of 78: Recipes
// Spec: /Users/hamza/yHealth/app_design 3/56-recipes.md

function RecipeSearch() {
  return (
    <div className="flex h-[52px] items-center gap-3 rounded-md border border-white/10 bg-ink-brown-800 px-4 shadow-1 animate-fade-up">
      <Search size={20} className="shrink-0 text-white/40" strokeWidth={1.9} />
      <span className="min-w-0 flex-1 text-body leading-[22px] text-white/40">Search recipes...</span>
      <SlidersHorizontal size={20} className="shrink-0 text-white/50" strokeWidth={1.9} />
    </div>
  )
}

function FilterRows() {
  return (
    <div className="mt-3 space-y-2 animate-fade-up" style={{ animationDelay: '80ms' }}>
      {[recipesLibrary.categoryFilters, recipesLibrary.attributeFilters].map((row, rowIndex) => (
        <div key={rowIndex} className="-mx-4 flex gap-2 overflow-x-auto px-4 hide-scrollbar">
          {row.map((filter, index) => (
            <span
              key={filter}
              className={[
                'shrink-0 rounded-pill border px-3 py-2 text-caption font-semibold leading-[18px]',
                rowIndex === 0 && index === 1 ? 'border-brand-orange bg-brand-orange text-white' : 'border-white/10 bg-ink-brown-800 text-white/60',
              ].join(' ')}
            >
              {filter}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

function SiaRecipeNote() {
  return (
    <Card className="mt-5 p-5 animate-fade-up" style={{ animationDelay: '160ms' }}>
      <div className="flex gap-3">
        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-royal-purple" />
        <p className="text-[15px] leading-[22px] text-white">{recipesLibrary.siaNote}</p>
      </div>
    </Card>
  )
}

function HorizontalRecipeSection({ title, recipes, delay }: { title: string; recipes: RecipeCardData[]; delay: number }) {
  return (
    <section className="mt-5 animate-fade-up" style={{ animationDelay: `${delay}ms` }}>
      <div className="mb-3 flex h-8 items-center justify-between px-1">
        <h2 className="text-[18px] font-semibold leading-6 text-white">{title}</h2>
        {title !== 'SIA suggestions' && <button type="button" className="text-caption leading-[18px] text-brand-orange">See all</button>}
      </div>
      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 hide-scrollbar">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} compact />
        ))}
      </div>
    </section>
  )
}

function DietPlanSection() {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '400ms' }}>
      <div className="mb-3 flex h-8 items-center justify-between px-1">
        <h2 className="text-[18px] font-semibold leading-6 text-white">From your diet plan</h2>
        <button type="button" className="text-caption leading-[18px] text-brand-orange">See all</button>
      </div>
      <Card variant="small" className="rounded-md p-0">
        {recipesLibrary.dietPlan.map((recipe, index) => (
          <div key={recipe.id} className={['flex min-h-12 items-center gap-2 px-4 py-3', index > 0 ? 'border-t border-white/10' : ''].join(' ')}>
            <span className="rounded-sm bg-domain-nutrition/15 px-2 py-1 text-small font-semibold leading-3 text-domain-nutrition">In plan</span>
            <span className="min-w-0 flex-1 truncate text-[15px] leading-5 text-white">{recipe.name}</span>
            <span className="shrink-0 text-[15px] font-semibold leading-5 text-white/50">{recipe.calories} cal</span>
          </div>
        ))}
      </Card>
    </section>
  )
}

function AllRecipesGrid() {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '480ms' }}>
      <div className="mb-3 flex h-8 items-center justify-between px-1">
        <h2 className="text-[18px] font-semibold leading-6 text-white">All recipes</h2>
        <button type="button" className="text-caption leading-[18px] text-brand-orange">See all</button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {recipesLibrary.all.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} imageIcon={<Utensils size={28} strokeWidth={1.9} />} />
        ))}
      </div>
    </section>
  )
}

function CreateRecipeFab() {
  return (
    <button type="button" className="mx-auto flex h-[48px] items-center justify-center gap-2 rounded-pill border border-white/[0.06] bg-ink-brown-800 px-6 text-[15px] font-semibold leading-5 text-white shadow-2">
      <Plus size={16} strokeWidth={2.4} />
      Create recipe
    </button>
  )
}

export default function RecipesScreen() {
  return (
    <PhoneFrame>
      <ScreenShell
        header={<DomainDashboardHeader title="Recipes" domain="nutrition" level={8} backHref="/domains/nutrition" />}
        activeTab="me"
        bottomAction={<CreateRecipeFab />}
      >
        <main className="px-4 pb-6 pt-4">
          <RecipeSearch />
          <FilterRows />
          <SiaRecipeNote />
          <HorizontalRecipeSection title="SIA suggestions" recipes={recipesLibrary.aiPicks} delay={240} />
          <HorizontalRecipeSection title="Favorites" recipes={recipesLibrary.favorites} delay={320} />
          <DietPlanSection />
          <AllRecipesGrid />
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
