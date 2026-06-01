'use client'

import { useMemo, useState } from 'react'
import { Check, Heart, Plus, Search, ShoppingCart, SlidersHorizontal, Utensils, X } from 'lucide-react'
import { Card } from '@/components/design-system/Card'
import { DomainDashboardHeader } from '@/components/domain/DomainDashboardHeader'
import { RecipeCard } from '@/components/domain/RecipeCard'
import type { RecipeCardData } from '@/components/domain/RecipeCard'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { recipesLibrary } from '@/data/mock'

// Screen 56 of 78: Recipes
// Spec: /Users/hamza/yHealth/app_design 3/56-recipes.md

function RecipeSearch({ query, onQuery }: { query: string; onQuery: (query: string) => void }) {
  return (
    <label className="flex h-[52px] items-center gap-3 rounded-md border border-white/10 bg-ink-brown-800 px-4 shadow-1 animate-fade-up">
      <Search size={20} className="shrink-0 text-white/40" strokeWidth={1.9} />
      <input value={query} onChange={(event) => onQuery(event.target.value)} placeholder="Search recipes..." className="min-w-0 flex-1 bg-transparent text-body leading-[22px] text-white outline-none placeholder:text-white/40" />
      <SlidersHorizontal size={20} className="shrink-0 text-white/50" strokeWidth={1.9} />
    </label>
  )
}

function FilterRows({ active, onChange }: { active: string[]; onChange: (filter: string) => void }) {
  return (
    <div className="mt-3 space-y-2 animate-fade-up" style={{ animationDelay: '80ms' }}>
      {[recipesLibrary.categoryFilters, recipesLibrary.attributeFilters].map((row, rowIndex) => (
        <div key={rowIndex} className="-mx-4 flex gap-2 overflow-x-auto px-4 hide-scrollbar">
          {row.map((filter) => (
            <button
              type="button"
              key={filter}
              onClick={() => onChange(filter)}
              aria-pressed={active.includes(filter)}
              className={[
                'min-h-11 shrink-0 rounded-pill border px-3 py-2 text-caption font-semibold leading-[18px]',
                active.includes(filter) ? 'border-brand-orange bg-brand-orange text-white' : 'border-white/10 bg-ink-brown-800 text-white/60',
              ].join(' ')}
            >
              {filter}
            </button>
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

function RecipeButton({ recipe, compact, onOpen, favorite, onFavorite }: { recipe: RecipeCardData; compact?: boolean; onOpen: () => void; favorite: boolean; onFavorite: () => void }) {
  return (
    <div className={compact ? 'relative w-[156px] shrink-0' : 'relative'}>
      <button type="button" onClick={onOpen} className="block w-full text-left" aria-label={`Open ${recipe.name}`}>
        <RecipeCard recipe={{ ...recipe, favorite }} compact={compact} imageIcon={<Utensils size={28} strokeWidth={1.9} />} />
      </button>
      <button type="button" onClick={onFavorite} aria-pressed={favorite} aria-label={`${favorite ? 'Remove' : 'Save'} ${recipe.name}`} className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-full text-brand-orange">
        <Heart size={17} fill={favorite ? 'currentColor' : 'none'} />
      </button>
    </div>
  )
}

function HorizontalRecipeSection({
  title,
  recipes,
  delay,
  openRecipe,
  favorites,
  toggleFavorite,
  onSeeAll,
}: {
  title: string
  recipes: RecipeCardData[]
  delay: number
  openRecipe: (recipe: RecipeCardData) => void
  favorites: string[]
  toggleFavorite: (id: string) => void
  onSeeAll?: () => void
}) {
  return (
    <section className="mt-5 animate-fade-up" style={{ animationDelay: `${delay}ms` }}>
      <div className="mb-3 flex h-8 items-center justify-between px-1">
        <h2 className="text-[18px] font-semibold leading-6 text-white">{title}</h2>
        {title !== 'SIA suggestions' && <button type="button" onClick={onSeeAll} className="min-h-11 px-2 text-caption leading-[18px] text-brand-orange">See all</button>}
      </div>
      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 hide-scrollbar">
        {recipes.map((recipe) => (
          <RecipeButton key={recipe.id} recipe={recipe} compact onOpen={() => openRecipe(recipe)} favorite={favorites.includes(recipe.id)} onFavorite={() => toggleFavorite(recipe.id)} />
        ))}
      </div>
    </section>
  )
}

function DietPlanSection({ recipes, onOpen, onSeeAll }: { recipes: RecipeCardData[]; onOpen: (recipe: RecipeCardData) => void; onSeeAll: () => void }) {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '400ms' }}>
      <div className="mb-3 flex h-8 items-center justify-between px-1">
        <h2 className="text-[18px] font-semibold leading-6 text-white">From your diet plan</h2>
        <button type="button" onClick={onSeeAll} className="min-h-11 px-2 text-caption leading-[18px] text-brand-orange">See all</button>
      </div>
      <Card variant="small" className="rounded-md p-0">
        {recipes.map((recipe, index) => (
          <button type="button" key={recipe.id} onClick={() => onOpen(recipe)} className={['flex min-h-12 w-full items-center gap-2 px-4 py-3 text-left', index > 0 ? 'border-t border-white/10' : ''].join(' ')}>
            <span className="rounded-sm bg-domain-nutrition/15 px-2 py-1 text-small font-semibold leading-3 text-domain-nutrition">In plan</span>
            <span className="min-w-0 flex-1 truncate text-[15px] leading-5 text-white">{recipe.name}</span>
            <span className="shrink-0 text-[15px] font-semibold leading-5 text-white/50">{recipe.calories} cal</span>
          </button>
        ))}
        {recipes.length === 0 && <div className="p-4 text-[15px] leading-5 text-white/55">No diet-plan recipes match the current filters.</div>}
      </Card>
    </section>
  )
}

function AllRecipesGrid({ recipes, openRecipe, favorites, toggleFavorite, onSeeAll }: { recipes: RecipeCardData[]; openRecipe: (recipe: RecipeCardData) => void; favorites: string[]; toggleFavorite: (id: string) => void; onSeeAll: () => void }) {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '480ms' }}>
      <div className="mb-3 flex h-8 items-center justify-between px-1">
        <h2 className="text-[18px] font-semibold leading-6 text-white">All recipes</h2>
        <button type="button" onClick={onSeeAll} className="min-h-11 px-2 text-caption leading-[18px] text-brand-orange">See all</button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {recipes.map((recipe) => (
          <RecipeButton key={recipe.id} recipe={recipe} onOpen={() => openRecipe(recipe)} favorite={favorites.includes(recipe.id)} onFavorite={() => toggleFavorite(recipe.id)} />
        ))}
      </div>
    </section>
  )
}

function CreateRecipeFab({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="mx-auto flex h-[48px] items-center justify-center gap-2 rounded-pill border border-white/[0.06] bg-ink-brown-800 px-6 text-[15px] font-semibold leading-5 text-white shadow-2">
      <Plus size={16} strokeWidth={2.4} />
      Create recipe
    </button>
  )
}

const mealFilterIds: Record<string, string[]> = {
  Breakfast: ['oatmeal', 'egg-muffins', 'greek-bowl'],
  Lunch: ['greek-bowl', 'wrap', 'wrap-plan', 'tofu-bowl', 'turkey-chili'],
  Dinner: ['stir-fry', 'lentil-soup', 'salmon', 'turkey-chili', 'shrimp-tacos'],
  Snack: ['yogurt-plan', 'egg-muffins', 'oatmeal'],
}

function recipeAttributes(recipe: RecipeCardData) {
  const attrs = new Set<string>()
  if (recipe.protein >= 30) attrs.add('High protein')
  if (recipe.difficulty === 'easy' || Number.parseInt(recipe.time, 10) <= 25) attrs.add('Easy')
  if (['tofu-bowl', 'lentil-soup', 'oatmeal'].includes(recipe.id)) attrs.add('Vegan')
  if ((recipe.carbs ?? 99) <= 25 || ['salmon', 'egg-muffins'].includes(recipe.id)) attrs.add('Low carb')
  if (['salmon', 'egg-muffins'].includes(recipe.id)) attrs.add('Keto')
  if (['salmon', 'greek-bowl', 'tofu-bowl', 'turkey-chili'].includes(recipe.id)) attrs.add('Gluten-free')
  return attrs
}

function recipeMatches(recipe: RecipeCardData, query: string, filters: string[]) {
  const normalized = query.trim().toLowerCase()
  const matchesQuery = !normalized || recipe.name.toLowerCase().includes(normalized)
  const mealFilters = filters.filter((filter) => recipesLibrary.categoryFilters.includes(filter))
  const attrFilters = filters.filter((filter) => recipesLibrary.attributeFilters.includes(filter))
  const matchesMeal = mealFilters.length === 0 || mealFilters.some((filter) => mealFilterIds[filter]?.includes(recipe.id))
  const attrs = recipeAttributes(recipe)
  const matchesAttrs = attrFilters.length === 0 || attrFilters.every((filter) => attrs.has(filter))
  return matchesQuery && matchesMeal && matchesAttrs
}

function uniqueRecipes(recipes: RecipeCardData[]) {
  const map = new Map<string, RecipeCardData>()
  recipes.forEach((recipe) => map.set(recipe.id, recipe))
  return Array.from(map.values())
}

export default function RecipesScreen() {
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<string[]>(['Lunch'])
  const [favorites, setFavorites] = useState<string[]>(recipesLibrary.favorites.map((recipe) => recipe.id).concat('greek-bowl'))
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeCardData | null>(null)
  const [createOpen, setCreateOpen] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [createdRecipes, setCreatedRecipes] = useState<RecipeCardData[]>([])
  const [sectionSheet, setSectionSheet] = useState<{ title: string; recipes: RecipeCardData[] } | null>(null)
  const [newName, setNewName] = useState('')
  const [newIngredients, setNewIngredients] = useState('')
  const [newCalories, setNewCalories] = useState('420')
  const [newProtein, setNewProtein] = useState('32')
  const allRecipes = useMemo(() => uniqueRecipes([...createdRecipes, ...recipesLibrary.aiPicks, ...recipesLibrary.favorites, ...recipesLibrary.all]), [createdRecipes])
  const filteredRecipes = allRecipes.filter((recipe) => recipeMatches(recipe, query, filters))
  const siaSuggestions = recipesLibrary.aiPicks.filter((recipe) => recipeMatches(recipe, query, filters))
  const favoriteRecipes = allRecipes.filter((recipe) => favorites.includes(recipe.id) && recipeMatches(recipe, query, filters))
  const dietPlanRecipes: RecipeCardData[] = recipesLibrary.dietPlan.map((recipe) => ({ ...recipe, protein: recipe.id === 'wrap-plan' ? 40 : 28, carbs: recipe.id === 'wrap-plan' ? 46 : 34, fat: 12, time: recipe.id === 'wrap-plan' ? '15 min' : '10 min', difficulty: 'easy', dietPlan: true })).filter((recipe) => recipeMatches(recipe, query, filters))
  const toggleFilter = (filter: string) => setFilters((items) => items.includes(filter) ? items.filter((item) => item !== filter) : [...items, filter])
  const toggleFavorite = (id: string) => setFavorites((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id])
  const canCreate = newName.trim().length >= 3 && newIngredients.trim().length >= 3 && Number(newCalories) > 0 && Number(newProtein) >= 0
  const saveCreatedRecipe = () => {
    if (!canCreate) return
    const recipe: RecipeCardData = {
      id: `custom-${Date.now()}`,
      name: newName.trim(),
      calories: Number(newCalories),
      protein: Number(newProtein),
      carbs: 30,
      fat: 12,
      time: 'custom',
      difficulty: 'easy',
    }
    setCreatedRecipes((items) => [recipe, ...items])
    setCreateOpen(false)
    setNewName('')
    setNewIngredients('')
    setFeedback(`${recipe.name} saved to recipes`)
  }

  return (
    <PhoneFrame>
      <ScreenShell
        header={<DomainDashboardHeader title="Recipes" domain="nutrition" level={8} backHref="/domains/nutrition" />}
        activeTab="me"
        bottomAction={<CreateRecipeFab onClick={() => setCreateOpen(true)} />}
      >
        {selectedRecipe && (
          <div className="absolute inset-x-0 bottom-0 z-50 rounded-t-2xl border border-white/[0.06] bg-ink-brown-800 p-5 shadow-3 animate-fade-up" role="dialog" aria-modal="true" aria-label={`${selectedRecipe.name} recipe detail`}>
            <button type="button" onClick={() => setSelectedRecipe(null)} aria-label="Close recipe detail" className="ml-auto flex h-11 w-11 items-center justify-center rounded-full text-white/50"><X size={18} /></button>
            <h2 className="text-h2 font-semibold text-white">{selectedRecipe.name}</h2>
            <p className="mt-2 text-caption text-white/60">{selectedRecipe.calories} cal . {selectedRecipe.protein}g protein . {selectedRecipe.time}</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button type="button" onClick={() => { setFeedback(`${selectedRecipe.name} added to shopping list`); setSelectedRecipe(null) }} className="h-12 rounded-pill bg-brand-orange text-caption font-semibold text-white"><ShoppingCart className="mr-1 inline" size={15} />Add to list</button>
              <button type="button" onClick={() => { setFeedback(`${selectedRecipe.name} ready to log as meal`); setSelectedRecipe(null) }} className="h-12 rounded-pill border border-white/10 text-caption font-semibold text-white">Log as meal</button>
            </div>
          </div>
        )}
        {sectionSheet && (
          <div className="absolute inset-0 z-50 flex items-end bg-black/45 px-3 pb-[84px]" role="presentation">
            <section className="max-h-[76%] w-full overflow-y-auto rounded-xl border border-white/[0.06] bg-ink-brown-800 p-4 shadow-3" role="dialog" aria-modal="true" aria-label={sectionSheet.title}>
              <div className="flex items-center justify-between">
                <h2 className="text-h3 font-semibold leading-[22px] text-white">{sectionSheet.title}</h2>
                <button type="button" onClick={() => setSectionSheet(null)} className="flex h-11 w-11 items-center justify-center rounded-full text-white/60" aria-label="Close recipe list"><X size={18} /></button>
              </div>
              <div className="mt-3 space-y-2">
                {sectionSheet.recipes.map((recipe) => (
                  <button key={recipe.id} type="button" onClick={() => { setSelectedRecipe(recipe); setSectionSheet(null) }} className="flex min-h-[58px] w-full items-center gap-3 rounded-md bg-ink-900 px-3 text-left">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-domain-nutrition/10 text-domain-nutrition"><Utensils size={18} /></span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[15px] font-semibold leading-5 text-white">{recipe.name}</span>
                      <span className="block text-small leading-[14px] text-white/40">{recipe.calories} cal . {recipe.protein}g protein</span>
                    </span>
                  </button>
                ))}
                {sectionSheet.recipes.length === 0 && <p className="rounded-md bg-ink-900 p-4 text-[15px] leading-5 text-white/55">No recipes match the current filters.</p>}
              </div>
            </section>
          </div>
        )}
        {createOpen && (
          <div className="absolute inset-0 z-50 flex items-end bg-black/45 px-3 pb-[84px]" role="presentation">
            <section className="max-h-[78%] w-full overflow-y-auto rounded-xl border border-white/[0.06] bg-ink-brown-800 p-4 shadow-3" role="dialog" aria-modal="true" aria-label="Create recipe">
              <div className="flex items-center justify-between">
                <h2 className="text-h3 font-semibold leading-[22px] text-white">Create recipe</h2>
                <button type="button" onClick={() => setCreateOpen(false)} className="flex h-11 w-11 items-center justify-center rounded-full text-white/60" aria-label="Cancel create recipe"><X size={18} /></button>
              </div>
              <label className="mt-3 block text-caption font-semibold leading-[18px] text-white/50">Recipe name
                <input value={newName} onChange={(event) => setNewName(event.target.value)} className="mt-1 h-11 w-full rounded-md border border-white/10 bg-ink-900 px-3 text-[15px] text-white outline-none" placeholder="High-protein dinner bowl" />
              </label>
              <label className="mt-3 block text-caption font-semibold leading-[18px] text-white/50">Ingredients
                <textarea value={newIngredients} onChange={(event) => setNewIngredients(event.target.value)} className="mt-1 min-h-[86px] w-full rounded-md border border-white/10 bg-ink-900 p-3 text-[15px] text-white outline-none" placeholder="Chicken, rice, greens..." />
              </label>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <label className="block text-caption font-semibold leading-[18px] text-white/50">Calories
                  <input value={newCalories} onChange={(event) => setNewCalories(event.target.value)} inputMode="numeric" className="mt-1 h-11 w-full rounded-md border border-white/10 bg-ink-900 px-3 text-[15px] text-white outline-none" />
                </label>
                <label className="block text-caption font-semibold leading-[18px] text-white/50">Protein
                  <input value={newProtein} onChange={(event) => setNewProtein(event.target.value)} inputMode="numeric" className="mt-1 h-11 w-full rounded-md border border-white/10 bg-ink-900 px-3 text-[15px] text-white outline-none" />
                </label>
              </div>
              <p className="mt-3 rounded-md bg-royal-purple/10 p-3 text-caption leading-[18px] text-white/65">SIA macro analysis is shown as a review state before sharing or logging.</p>
              <button type="button" disabled={!canCreate} onClick={saveCreatedRecipe} className="mt-4 h-12 w-full rounded-pill bg-brand-orange text-caption font-semibold text-white disabled:opacity-50">Save recipe</button>
            </section>
          </div>
        )}
        {feedback && (
          <div className="absolute inset-x-4 bottom-[96px] z-40 flex min-h-11 items-center gap-2 rounded-pill bg-forest-green px-4 text-[14px] font-semibold text-white shadow-2" role="status">
            <Check size={16} />{feedback}
          </div>
        )}
        <main className="px-4 pb-6 pt-4">
          <RecipeSearch query={query} onQuery={setQuery} />
          <FilterRows active={filters} onChange={toggleFilter} />
          <div className="mt-3 text-caption leading-[18px] text-white/45">{filteredRecipes.length} recipes match current filters</div>
          <SiaRecipeNote />
          <HorizontalRecipeSection title="SIA suggestions" recipes={siaSuggestions} delay={240} openRecipe={setSelectedRecipe} favorites={favorites} toggleFavorite={toggleFavorite} />
          <HorizontalRecipeSection title="Favorites" recipes={favoriteRecipes.slice(0, 3)} delay={320} openRecipe={setSelectedRecipe} favorites={favorites} toggleFavorite={toggleFavorite} onSeeAll={() => setSectionSheet({ title: 'Favorite recipes', recipes: favoriteRecipes })} />
          <DietPlanSection recipes={dietPlanRecipes} onOpen={setSelectedRecipe} onSeeAll={() => setSectionSheet({ title: 'Diet plan recipes', recipes: dietPlanRecipes })} />
          <AllRecipesGrid recipes={filteredRecipes.slice(0, 6)} openRecipe={setSelectedRecipe} favorites={favorites} toggleFavorite={toggleFavorite} onSeeAll={() => setSectionSheet({ title: 'All matching recipes', recipes: filteredRecipes })} />
          {filteredRecipes.length === 0 && <Card variant="small" className="mt-4 p-5 text-center text-[15px] leading-5 text-white/60">No recipes match those filters. Clear one filter or search for another ingredient.</Card>}
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
