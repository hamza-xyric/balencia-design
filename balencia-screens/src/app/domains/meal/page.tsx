import Link from 'next/link'
import { Camera, ChevronDown, ChevronLeft, Plus, ReceiptText, Search } from 'lucide-react'
import { Button } from '@/components/design-system/Button'
import { Card } from '@/components/design-system/Card'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import type { FoodItem } from '@/data/mock'
import { mealDetail } from '@/data/mock'

// Screen 29 of 78: Meal detail / food logger
// Spec: /Users/hamza/yHealth/app_design 3/29-meal-detail-food-logger.md

function DetailHeader() {
  return (
    <header className="flex h-[56px] shrink-0 items-center bg-ink-900 px-4">
      <Link href="/domains/nutrition" className="-ml-2 flex h-11 w-11 items-center justify-center rounded-full text-white" aria-label="Back">
        <ChevronLeft size={20} strokeWidth={2.1} />
      </Link>
      <h1 className="ml-1 flex-1 text-[17px] font-semibold leading-[22px] text-white">Log food</h1>
      <Link href="/domains/nutrition" className="flex h-11 items-center text-[15px] font-semibold leading-5 text-brand-orange">
        Done
      </Link>
    </header>
  )
}

function FoodSearchInput() {
  return (
    <div className="flex h-[52px] items-center gap-3 rounded-md border border-white/10 bg-ink-brown-800 px-4 shadow-1 animate-fade-up">
      <Search size={20} className="shrink-0 text-white/40" strokeWidth={1.8} />
      <span className="min-w-0 flex-1 truncate text-body leading-6 text-white/40">Search food...</span>
      <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white/50" type="button" aria-label="Scan barcode">
        <Camera size={20} strokeWidth={1.8} />
      </button>
      <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white/50" type="button" aria-label="Scan receipt">
        <ReceiptText size={20} strokeWidth={1.8} />
      </button>
    </div>
  )
}

function MealTypeSelector() {
  const options = ['Breakfast', 'Lunch', 'Dinner', 'Snack']

  return (
    <div className="mt-2 grid h-10 grid-cols-4 rounded-md border border-white/10 bg-ink-brown-800 p-1 animate-fade-up" style={{ animationDelay: '80ms' }}>
      {options.map((option) => {
        const active = option === 'Lunch'

        return (
          <button
            key={option}
            type="button"
            className={[
              'min-w-0 rounded-sm px-1 text-[12px] font-semibold leading-4 transition-colors duration-[var(--dur-base)]',
              active ? 'bg-ink-900 text-white' : 'text-white/50',
            ].join(' ')}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}

function FoodRow({ item, expanded = false }: { item: FoodItem; expanded?: boolean }) {
  return (
    <div className="border-b border-white/10 py-3 last:border-b-0">
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <div className="truncate text-[15px] leading-5 text-white">{item.name}</div>
          <div className="mt-1 truncate text-[12px] leading-4 text-white/50">
            {item.calories} cal{item.protein ? ` · ${item.protein}g protein` : ''}
          </div>
        </div>
        <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-ink-900 text-white" type="button" aria-label={`Add ${item.name}`}>
          <Plus size={16} strokeWidth={2.3} />
        </button>
      </div>

      {expanded && (
        <div className="mt-4 rounded-md bg-ink-900 p-3">
          <div className="flex h-11 items-center justify-between rounded-md border border-white/10 px-3 text-[14px] leading-[18px] text-white">
            <span>1 serving</span>
            <ChevronDown size={15} className="text-white/40" strokeWidth={1.9} />
          </div>
          <div className="mt-2 text-[12px] leading-4 text-white/50">
            {item.calories} cal · {item.protein}g P · {item.carbs ?? 0}g C · {item.fat ?? 0}g F
          </div>
          <Button variant="completion" fullWidth size="compact" className="mt-3">
            Add to lunch
          </Button>
        </div>
      )}
    </div>
  )
}

function FoodSection({
  title,
  items,
  delay,
  expandedFirst = false,
}: {
  title: string
  items: FoodItem[]
  delay: string
  expandedFirst?: boolean
}) {
  return (
    <section className="mt-4 animate-fade-up" style={{ animationDelay: delay }}>
      <h2 className="mb-3 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">
        {title}
      </h2>
      <Card variant="small">
        {items.map((item, index) => (
          <FoodRow key={item.name} item={item} expanded={expandedFirst && index === 0} />
        ))}
      </Card>
    </section>
  )
}

function ManualEntryButton() {
  return (
    <button
      type="button"
      className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-pill border border-white/10 bg-ink-brown-800 text-[15px] font-semibold leading-5 text-white shadow-1 animate-fade-up"
      style={{ animationDelay: '400ms' }}
    >
      <Plus size={16} strokeWidth={2.3} />
      Add manually
    </button>
  )
}

export default function MealDetailScreen() {
  return (
    <PhoneFrame>
      <ScreenShell header={<DetailHeader />} activeTab="me">
        <main className="px-4 pb-16 pt-3">
          <FoodSearchInput />
          <MealTypeSelector />
          <FoodSection title="Recent" items={mealDetail.recentFoods} delay="160ms" expandedFirst />
          <FoodSection title="Frequent" items={mealDetail.frequentFoods} delay="280ms" />
          <ManualEntryButton />
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
