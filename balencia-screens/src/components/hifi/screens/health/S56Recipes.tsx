import { ChefHat, Flame, Heart, Search, SlidersHorizontal } from 'lucide-react'
import {
  Chip,
  CIAInsightCard,
  ConsentRail,
  cx,
  FloatingQuickLog,
  GlassCard,
  GlassPillInput,
  HifiShell,
  IconButton,
  SectionTitle,
  SolidCard,
  TopBar,
} from '@/components/hifi/kit'

// Nested Nutrition module, no live route of its own — inherits the Nutrition
// tab rail (activeTab="today"). Chosen state: default browse view, populated
// carousel, favorites, and grid. Cold-start empty grid, "no search match,"
// and offline/disabled search are documented in the source spec rather than
// duplicated here — static prototype, no handlers. Low-confidence macros and
// the honest-null allergy read are woven into this default render instead.

const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks']
const attributes = ['Vegan', 'Keto', 'High-protein']

const suggested = [
  { name: 'Overnight oats & berries', calories: 320, tags: ['Vegan'], favorite: false, estimated: false },
  { name: 'Tempeh grain bowl', calories: 450, tags: ['High-protein'], favorite: true, estimated: true },
  { name: 'Grilled chicken plate', calories: 410, tags: ['Keto'], favorite: false, estimated: false },
] as const

const favorites = [
  { name: 'Berry smoothie', calories: 240 },
  { name: 'Avocado toast', calories: 280 },
] as const

const gridRecipes = [
  { name: 'Lentil stew', calories: 380, tags: ['Vegan'], favorite: true },
  { name: 'Pesto pasta', calories: 480, tags: [], favorite: false },
  { name: 'Spinach omelette', calories: 220, tags: ['Keto'], favorite: false },
  { name: 'Salmon & quinoa', calories: 520, tags: ['High-protein'], favorite: false },
] as const

export function S56Recipes() {
  return (
    <HifiShell
      header={<TopBar title="Recipes" right={<Chip tone="you">Lv 12</Chip>} />}
      activeTab="today"
      atmosphere="you"
      bottomAction={<FloatingQuickLog label="Create recipe" />}
    >
      <main className="space-y-4 px-4 pb-4 pt-3">
        <GlassPillInput
          icon={<Search size={16} strokeWidth={1.9} />}
          placeholder="Search recipes…"
          trailing={<IconButton label="Open advanced filters"><SlidersHorizontal size={17} strokeWidth={1.9} /></IconButton>}
        />

        <div role="tablist" aria-label="Recipe category" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
          {categories.map(category => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={category === 'All'}
              className={cx(
                'flex h-11 shrink-0 items-center justify-center rounded-pill px-4 text-[13px] font-medium',
                category === 'All' ? 'bg-brand-orange text-white' : 'border border-white/10 bg-white/[0.03] text-white/60',
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {attributes.map((attribute, index) => (
            <Chip key={attribute} interactive tone={index === 0 ? 'you' : 'muted'} pressed={index === 0}>{attribute}</Chip>
          ))}
          <Chip interactive tone="muted">+<span className="sr-only">Show more attribute filters</span></Chip>
        </div>

        <p className="px-1 text-[12px] leading-4 text-white/50">
          No restrictions added yet — allergy conflicts will show here once you add them.
        </p>

        <CIAInsightCard eyebrow="CIA suggestions" provenance={['Via food log + recipe DB']}>
          You are short on protein this week. These high-protein <span className="text-emphasis">recipes</span> can help close the gap.
        </CIAInsightCard>

        <SectionTitle title="For you" meta="Recipe DB" />
        <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1">
          {suggested.map(recipe => (
            <RecipeTile key={recipe.name} name={recipe.name} calories={recipe.calories} tags={[...recipe.tags]} favorite={recipe.favorite} estimated={recipe.estimated} />
          ))}
        </div>

        <SectionTitle title="Favorites" meta="See all" />
        <div className="grid grid-cols-2 gap-3">
          {favorites.map(recipe => (
            <RecipeTile key={recipe.name} name={recipe.name} calories={recipe.calories} favorite compact />
          ))}
        </div>

        <SectionTitle title="All recipes" />
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-3">
            <RecipeTile name={gridRecipes[0].name} calories={gridRecipes[0].calories} tags={[...gridRecipes[0].tags]} favorite={gridRecipes[0].favorite} compact />
            <RecipeTile name={gridRecipes[2].name} calories={gridRecipes[2].calories} tags={[...gridRecipes[2].tags]} favorite={gridRecipes[2].favorite} compact />
          </div>
          <div className="mt-6 flex flex-col gap-3">
            <RecipeTile name={gridRecipes[1].name} calories={gridRecipes[1].calories} tags={[...gridRecipes[1].tags]} favorite={gridRecipes[1].favorite} compact />
            <RecipeTile name={gridRecipes[3].name} calories={gridRecipes[3].calories} tags={[...gridRecipes[3].tags]} favorite={gridRecipes[3].favorite} compact />
          </div>
        </div>

        <GlassCard tone="muted">
          <p className="text-[12px] font-semibold uppercase text-white/45">Data &amp; consent</p>
          <p className="mt-1 text-[12px] leading-4 text-white/55">
            Recipe database chips link to source, freshness, and retention.
          </p>
          <ConsentRail compact />
        </GlassCard>

        <p className="px-2 text-center text-[11px] leading-4 text-white/55">
          Coaching support, not medical nutrition advice. Your allergies and restrictions outrank suggestions.
        </p>
      </main>
    </HifiShell>
  )
}

// NEW: RecipeTile. Image slot is a tinted glass placeholder (never a real
// food or people photo) with a nutrition glyph; the favorite toggle and
// calorie read both carry their own honesty state.
function RecipeTile({
  name,
  calories,
  tags = [],
  favorite = false,
  estimated = false,
  compact = false,
}: {
  name: string
  calories: number
  tags?: string[]
  favorite?: boolean
  estimated?: boolean
  compact?: boolean
}) {
  return (
    <SolidCard className={cx('overflow-hidden p-0', compact ? 'w-full' : 'w-[152px] shrink-0')}>
      <div className="relative aspect-[5/4] w-full bg-white/[0.05]">
        <div className="absolute inset-0 flex items-center justify-center" role="img" aria-label={`${name}, recipe thumbnail placeholder`}>
          <ChefHat size={26} strokeWidth={1.6} className="text-white/25" aria-hidden="true" />
        </div>
        <button
          type="button"
          aria-label={favorite ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
          aria-pressed={favorite}
          className={cx(
            'absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-full bg-ink-900/60 backdrop-blur-sm',
            favorite ? 'text-brand-orange' : 'text-white/60',
          )}
        >
          <Heart size={16} strokeWidth={2} fill={favorite ? 'currentColor' : 'none'} aria-hidden="true" />
        </button>
      </div>
      <div className="space-y-2 p-3">
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.map(tag => (
              <span key={tag} className="rounded-md bg-white/[0.06] px-1.5 py-0.5 text-[10px] font-medium text-white/55">
                {tag}
              </span>
            ))}
          </div>
        )}
        <h3 className="truncate text-[13px] font-semibold leading-4 text-white">{name}</h3>
        <div className="flex items-center justify-between gap-2">
          <span className={cx('flex items-center gap-1 text-[12px] tabular-nums', estimated ? 'text-white/45' : 'text-white/75')}>
            <Flame size={12} strokeWidth={2} /> {calories} cal
          </span>
          <Chip>{estimated ? 'Estimated' : 'Recipe DB'}</Chip>
        </div>
      </div>
    </SolidCard>
  )
}
