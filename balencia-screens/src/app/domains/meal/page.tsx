'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { Camera, Check, ChevronDown, ChevronLeft, Plus, ReceiptText, RotateCcw, Search, X } from 'lucide-react'
import { Button } from '@/components/design-system/Button'
import { Card } from '@/components/design-system/Card'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import type { FoodItem } from '@/data/mock'
import { mealDetail } from '@/data/mock'

// Screen 29 of 78: Meal detail / food logger
// Spec: /Users/hamza/yHealth/app_design 3/29-meal-detail-food-logger.md

function DetailHeader({ mode, onModeChange }: { mode: 'view' | 'log'; onModeChange: (mode: 'view' | 'log') => void }) {
  return (
    <header className="flex h-[56px] shrink-0 items-center bg-ink-900 px-4">
      <Link href="/domains/nutrition" className="-ml-2 flex h-11 w-11 items-center justify-center rounded-full text-white" aria-label="Back">
        <ChevronLeft size={20} strokeWidth={2.1} />
      </Link>
      <h1 className="ml-1 flex-1 text-[17px] font-semibold leading-[22px] text-white">{mode === 'view' ? 'Meal detail' : 'Log food'}</h1>
      <button
        type="button"
        onClick={() => onModeChange(mode === 'view' ? 'log' : 'view')}
        className="mr-1 flex h-11 min-w-11 items-center justify-center rounded-full px-2 text-[13px] font-semibold leading-[18px] text-white/50"
      >
        {mode === 'view' ? 'Log' : 'View'}
      </button>
      <Link href="/domains/nutrition" className="flex h-11 min-w-11 items-center justify-center text-[15px] font-semibold leading-5 text-brand-orange">
        Done
      </Link>
    </header>
  )
}

function FoodSearchInput({
  query,
  onQueryChange,
  onScanner,
}: {
  query: string
  onQueryChange: (value: string) => void
  onScanner: (mode: 'barcode' | 'receipt') => void
}) {
  return (
    <div className="flex h-[52px] items-center gap-3 rounded-md border border-white/10 bg-ink-brown-800 px-4 shadow-1 animate-fade-up">
      <Search size={20} className="shrink-0 text-white/40" strokeWidth={1.8} />
      <label className="sr-only" htmlFor="food-search">Search food</label>
      <input
        id="food-search"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        className="min-w-0 flex-1 bg-transparent text-body leading-6 text-white outline-none placeholder:text-white/40"
        placeholder="Search food..."
      />
      <button onClick={() => onScanner('barcode')} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white/50" type="button" aria-label="Scan barcode">
        <Camera size={20} strokeWidth={1.8} />
      </button>
      <button onClick={() => onScanner('receipt')} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white/50" type="button" aria-label="Scan receipt">
        <ReceiptText size={20} strokeWidth={1.8} />
      </button>
    </div>
  )
}

function MealTypeSelector({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const options = ['Breakfast', 'Lunch', 'Dinner', 'Snack']

  return (
    <div className="mt-2 grid min-h-[52px] grid-cols-4 rounded-md border border-white/10 bg-ink-brown-800 p-1 animate-fade-up" style={{ animationDelay: '80ms' }}>
      {options.map((option) => {
        const active = option === value

        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            aria-pressed={active}
            className={[
              'min-h-11 min-w-0 rounded-sm px-1 text-[12px] font-semibold leading-4 transition-colors duration-[var(--dur-base)]',
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

function FoodRow({
  item,
  expanded,
  onToggle,
  onAdd,
  mealType,
}: {
  item: FoodItem
  expanded: boolean
  onToggle: () => void
  onAdd: (item: FoodItem) => void
  mealType: string
}) {
  return (
    <div className="border-b border-white/10 py-3 last:border-b-0">
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <div className="truncate text-[15px] leading-5 text-white">{item.name}</div>
          <div className="mt-1 truncate text-[12px] leading-4 text-white/50">
            {item.calories} cal{item.protein ? ` · ${item.protein}g protein` : ''}
          </div>
        </div>
        <button onClick={onToggle} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-ink-900 text-white" type="button" aria-expanded={expanded} aria-label={`Choose portion for ${item.name}`}>
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
          <Button onClick={() => onAdd(item)} variant="completion" fullWidth size="compact" className="mt-3 min-h-11">
            Add to {mealType.toLowerCase()}
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
  expandedId,
  onToggle,
  onAdd,
  mealType,
}: {
  title: string
  items: FoodItem[]
  delay: string
  expandedId: string
  onToggle: (name: string) => void
  onAdd: (item: FoodItem) => void
  mealType: string
}) {
  return (
    <section className="mt-4 animate-fade-up" style={{ animationDelay: delay }}>
      <h2 className="mb-3 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">
        {title}
      </h2>
      <Card variant="small">
        {items.map((item, index) => (
          <FoodRow
            key={item.name}
            item={item}
            expanded={expandedId === item.name || (!expandedId && index === 0 && title === 'Recent')}
            onToggle={() => onToggle(item.name)}
            onAdd={onAdd}
            mealType={mealType}
          />
        ))}
      </Card>
    </section>
  )
}

function ManualEntryButton({ open, onToggle, onAdd }: { open: boolean; onToggle: () => void; onAdd: () => void }) {
  return (
    <section className="animate-fade-up" style={{ animationDelay: '400ms' }}>
      <button
        type="button"
        onClick={onToggle}
        className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-pill border border-white/10 bg-ink-brown-800 text-[15px] font-semibold leading-5 text-white shadow-1"
        aria-expanded={open}
      >
        <Plus size={16} strokeWidth={2.3} />
        Add manually
      </button>
      {open && (
        <Card variant="small" className="mt-3 space-y-3 p-4">
          <label className="block text-caption leading-[18px] text-white/50">
            Food name
            <input className="mt-1 h-11 w-full rounded-md border border-white/10 bg-ink-900 px-3 text-[15px] text-white outline-none" defaultValue="Greek yogurt bowl" />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-caption leading-[18px] text-white/50">
              Calories
              <input type="number" className="mt-1 h-11 w-full rounded-md border border-white/10 bg-ink-900 px-3 text-[15px] text-white outline-none" defaultValue={220} />
            </label>
            <label className="block text-caption leading-[18px] text-white/50">
              Protein
              <input type="number" className="mt-1 h-11 w-full rounded-md border border-white/10 bg-ink-900 px-3 text-[15px] text-white outline-none" defaultValue={18} />
            </label>
          </div>
          <Button onClick={onAdd} fullWidth variant="completion" size="compact" className="min-h-11">Save food</Button>
        </Card>
      )}
    </section>
  )
}

function MealView({ onLog }: { onLog: () => void }) {
  const meal = mealDetail.meal

  return (
    <main className="px-4 pb-16 pt-3">
      <section className="rounded-xl border border-white/[0.06] bg-ink-brown-800 p-5 shadow-1 animate-fade-up">
        <div className="flex h-[154px] items-center justify-center rounded-lg bg-gradient-to-br from-domain-nutrition/20 via-ink-900 to-ink-brown-800 text-domain-nutrition/70">
          <ReceiptText size={42} strokeWidth={1.6} />
        </div>
        <div className="mt-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-[24px] font-bold leading-[30px] text-white">{meal.name}</h2>
            <p className="mt-1 text-caption leading-[18px] text-white/50">{mealDetail.date} . {meal.time} . {meal.mealType}</p>
          </div>
          <span className="rounded-pill bg-domain-nutrition/15 px-3 py-1 text-small font-semibold leading-3 text-domain-nutrition">Logged</span>
        </div>
        <p className="mt-4 rounded-md bg-royal-purple/10 p-3 text-caption leading-[18px] text-white/70">
          {mealDetail.siaInsight}
        </p>
      </section>

      <section className="mt-4 grid grid-cols-4 gap-2 animate-fade-up" style={{ animationDelay: '80ms' }}>
        {[
          { label: 'Cal', value: meal.calories },
          { label: 'Protein', value: `${meal.protein}g` },
          { label: 'Carbs', value: `${meal.carbs}g` },
          { label: 'Fat', value: `${meal.fat}g` },
        ].map((macro) => (
          <Card key={macro.label} variant="small" className="rounded-md p-3 text-center">
            <div className="text-[17px] font-semibold leading-[22px] text-white">{macro.value}</div>
            <div className="mt-1 text-small leading-[14px] text-white/40">{macro.label}</div>
          </Card>
        ))}
      </section>

      <section className="mt-5 animate-fade-up" style={{ animationDelay: '160ms' }}>
        <h2 className="mb-3 px-1 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">Ingredients</h2>
        <Card variant="small" className="rounded-md p-0">
          {mealDetail.ingredients.map((item, index) => (
            <div key={item.name} className={['flex min-h-[58px] items-center gap-3 px-4 py-3', index > 0 ? 'border-t border-white/[0.05]' : ''].join(' ')}>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[15px] font-semibold leading-5 text-white">{item.name}</div>
                <div className="mt-1 text-small leading-[14px] text-white/40">{item.protein}g P . {item.carbs}g C . {item.fat}g F</div>
              </div>
              <span className="text-[15px] font-semibold leading-5 text-white/60">{item.calories}</span>
            </div>
          ))}
        </Card>
      </section>

      <div className="mt-5 grid grid-cols-2 gap-2 animate-fade-up" style={{ animationDelay: '240ms' }}>
        <Button type="button" variant="skip" onClick={onLog}>Edit foods</Button>
        <Button type="button" onClick={onLog}>Log another</Button>
      </div>
    </main>
  )
}

export default function MealDetailScreen() {
  const [mode, setMode] = useState<'view' | 'log'>('log')
  const [query, setQuery] = useState('')
  const [mealType, setMealType] = useState('Lunch')
  const [expandedId, setExpandedId] = useState('')
  const [scanner, setScanner] = useState<'barcode' | 'receipt' | null>(null)
  const [manualOpen, setManualOpen] = useState(false)
  const [toast, setToast] = useState('')
  const foods = useMemo(() => {
    const all = [...mealDetail.recentFoods, ...mealDetail.frequentFoods]
    return query ? all.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())) : null
  }, [query])
  const confirm = (name: string) => {
    setToast(`${name} added to ${mealType.toLowerCase()}`)
    window.setTimeout(() => setToast(''), 3200)
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.search)
      setMode(params.get('mode') === 'view' ? 'view' : 'log')
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <PhoneFrame>
      <ScreenShell header={<DetailHeader mode={mode} onModeChange={setMode} />} activeTab="me">
        {mode === 'view' ? (
          <MealView onLog={() => setMode('log')} />
        ) : (
        <main className="px-4 pb-16 pt-3">
          <FoodSearchInput query={query} onQueryChange={setQuery} onScanner={setScanner} />
          <MealTypeSelector value={mealType} onChange={setMealType} />
          {foods ? (
            <FoodSection title={`${foods.length} search results`} items={foods} delay="160ms" expandedId={expandedId} onToggle={(name) => setExpandedId(expandedId === name ? '' : name)} onAdd={(item) => confirm(item.name)} mealType={mealType} />
          ) : (
            <>
              <FoodSection title="Recent" items={mealDetail.recentFoods} delay="160ms" expandedId={expandedId} onToggle={(name) => setExpandedId(expandedId === name ? '' : name)} onAdd={(item) => confirm(item.name)} mealType={mealType} />
              <FoodSection title="Frequent" items={mealDetail.frequentFoods} delay="280ms" expandedId={expandedId} onToggle={(name) => setExpandedId(expandedId === name ? '' : name)} onAdd={(item) => confirm(item.name)} mealType={mealType} />
            </>
          )}
          {foods && foods.length === 0 && (
            <Card variant="small" className="mt-4 p-5 text-center text-[15px] leading-5 text-white/60">No foods found. Add it manually or scan a label.</Card>
          )}
          <ManualEntryButton open={manualOpen} onToggle={() => setManualOpen(!manualOpen)} onAdd={() => confirm('Manual entry')} />
        </main>
        )}
        {scanner && (
          <div className="absolute inset-x-0 bottom-[84px] z-20 mx-3 rounded-xl border border-white/10 bg-ink-brown-800 p-4 shadow-2" role="dialog" aria-label={`${scanner} scanner`}>
            <div className="flex items-center justify-between">
              <div className="text-[17px] font-semibold text-white">{scanner === 'barcode' ? 'Barcode scanner' : 'Receipt scanner'}</div>
              <button type="button" onClick={() => setScanner(null)} className="flex h-11 w-11 items-center justify-center rounded-full text-white/60" aria-label="Close scanner"><X size={18} /></button>
            </div>
            <div className="mt-3 flex h-[160px] items-center justify-center rounded-lg border border-dashed border-white/15 bg-ink-900 text-white/50">
              {scanner === 'barcode' ? <Camera size={34} /> : <ReceiptText size={34} />}
            </div>
            <p className="mt-3 text-caption leading-[18px] text-white/50">Demo scanner ready. Camera access would be requested only after this action.</p>
            <Button onClick={() => { setScanner(null); confirm(scanner === 'barcode' ? 'Scanned protein bar' : 'Receipt items') }} fullWidth size="compact" className="mt-3">Use detected item</Button>
          </div>
        )}
        {toast && (
          <div className="absolute inset-x-4 bottom-[96px] z-30 flex min-h-11 items-center justify-between gap-3 rounded-pill bg-forest-green px-4 text-[14px] font-semibold text-white shadow-2" role="status">
            <span className="inline-flex items-center gap-2"><Check size={16} />{toast}</span>
            <button type="button" onClick={() => setToast('')} className="flex h-9 items-center gap-1 rounded-pill px-2" aria-label="Undo add food"><RotateCcw size={14} />Undo</button>
          </div>
        )}
      </ScreenShell>
    </PhoneFrame>
  )
}
