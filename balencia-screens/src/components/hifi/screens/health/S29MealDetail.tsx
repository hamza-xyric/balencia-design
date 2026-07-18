'use client'

import { AlertTriangle, Check, ChevronRight, Pencil, Plus, ReceiptText, ScanBarcode, Utensils } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import {
  BtnSuccess,
  Chip,
  CIAInsightCard,
  ConsentRail,
  cx,
  DonutHub,
  GlassCard,
  GlassPillInput,
  FULL_DATA_CONTROLS,
  HifiShell,
  IconButton,
  ProgressBar,
  Provenance,
  SectionTitle,
  SolidCard,
  TopBar,
} from '@/components/hifi/kit'

// Meal detail / food logger, chosen state: default — logged lunch with real
// macro split (via ingredient math) and the logger mode woven in below the
// stable header. Skeleton (shimmer donut + bars), empty meal view (faint
// donut outline), and scanner sheets are documented in the source spec and
// not rendered in parallel here, per catalog.

const macros = [
  { label: 'Carbs', percent: 37, dot: 'bg-brand-orange', bar: 'you' as const },
  { label: 'Protein', percent: 32, dot: 'bg-forest-green', bar: 'done' as const },
  { label: 'Fat', percent: 31, dot: 'bg-white/40', bar: 'you' as const },
]

const ingredients = [
  { name: 'Whole wheat wrap', portion: '1 large · 110g', calories: 220, verified: true },
  { name: 'Dairy-free lemon dressing', portion: '2 tbsp · recipe verified', calories: 80, verified: true },
]

const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner', 'Snack'] as const
type MealType = (typeof MEAL_TYPES)[number]

const recentFoods = [
  { name: 'Raw almonds', detail: '1 oz · 160 cal · Food database' },
  { name: 'Granny smith apple', detail: '1 medium · 95 cal · Food database' },
]

export function S29MealDetail() {
  const [state, setState] = useState('detail')
  const [mealType, setMealType] = useState<MealType>('Lunch')
  const mealTabRefs = useRef<Array<HTMLButtonElement | null>>([])
  useEffect(() => {
    const next = new URLSearchParams(window.location.search).get('state') ?? 'detail'
    queueMicrotask(() => {
      setState(next)
      if (next === 'tab-change') setMealType('Dinner')
    })
  }, [])
  const logger = ['logger', 'scanner-unavailable', 'tab-change', 'success', 'offline', 'error'].includes(state)
  const offline = state === 'offline'
  const error = state === 'error'
  const empty = state === 'empty'
  return (
    <HifiShell
      atmosphere="you"
      header={
        <TopBar
          title="Lunch"
          right={<IconButton label="Edit meal" onClick={() => setState('logger')}><Pencil size={18} strokeWidth={1.9} /></IconButton>}
        />
      }
      showTabBar={false}
    >
      <main className="space-y-4 px-4 pb-10 pt-3" data-state={state}>
        {offline && <p role="status" className="glass-pill px-4 py-3 text-[13px] text-paper-100/75">Offline · manual entry remains available; camera and database search are unavailable.</p>}
        {error && <SolidCard><p role="alert" className="text-[14px]">Couldn&rsquo;t load food search.</p><button type="button" onClick={() => setState('logger')} className="focus-ring mt-3 min-h-11 rounded-pill border px-4 text-[13px]">Retry locally</button></SolidCard>}
        {state === 'scanner-unavailable' && <SolidCard><p role="status" className="text-[14px]">Scanner unavailable in this visual prototype. Enter the food manually.</p></SolidCard>}
        {state === 'media-consent' && <SolidCard><SectionTitle title="Meal photo consent" /><p className="mt-2 text-[13px] leading-5 text-paper-100/70">Photo category · meal only · local preview · no upload. Avoid faces, homes, documents, provider logos, and private text.</p><div className="mt-3 grid grid-cols-2 gap-2"><button type="button" className="focus-ring min-h-11 rounded-pill border px-3 text-[13px]" onClick={() => setState('detail')}>Decline</button><button type="button" className="focus-ring min-h-11 rounded-pill bg-cta-ember px-3 text-[13px]" onClick={() => setState('detail')}>Accept locally</button></div></SolidCard>}
        {empty && <SolidCard><h2 className="text-[18px] font-semibold">Meal not logged</h2><p className="mt-2 text-[13px] text-paper-100/70">Log this meal to see its calorie and macro split.</p><button type="button" className="focus-ring mt-4 min-h-11 rounded-pill bg-cta-ember px-4 text-[13px]" onClick={() => setState('logger')}>Log manually</button></SolidCard>}
        {!logger && !empty && <>
        <GlassCard tone="you">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06]"
                role="img"
                aria-label="Chicken salad wrap photo placeholder, privacy-safe, no identifiable person"
              >
                <Utensils size={19} strokeWidth={1.8} className="text-brand-orange" />
              </div>
              <div className="min-w-0">
                <h2 className="truncate text-[17px] font-semibold tracking-[-0.01em] text-white">Chicken salad wrap</h2>
                <div className="mt-1"><Provenance items={['12:30 PM', 'You logged']} /></div>
              </div>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1">
              <Chip tone="muted">No photo</Chip>
              <Chip interactive tone="muted" onClick={() => setState('media-consent')}>Log photo</Chip>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Chip tone="done">Dairy allergy checked</Chip>
            <Chip tone="muted">Contains gluten</Chip>
            <span className="text-[11px] text-white/55">Coaching support, not medical advice</span>
          </div>
        </GlassCard>

        <SolidCard>
          <div className="flex items-center justify-between">
            <SectionTitle title="Macros" />
            <Chip tone="done">Real · You logged</Chip>
          </div>

          <div className="mt-4 flex items-center gap-5">
            <DonutHub
              value="520"
              label="Cal"
              size={132}
              segments={macros.map(macro => ({
                percent: macro.percent,
                className: macro.dot.replace('bg-', 'stroke-'),
                label: macro.label,
              }))}
            />
            <div className="min-w-0 flex-1 space-y-3">
              {macros.map(macro => (
                <div key={macro.label}>
                  <div className="flex items-center justify-between text-[12px] text-white/70">
                    <span className="flex items-center gap-1.5">
                      <span className={cx('h-2 w-2 shrink-0 rounded-full', macro.dot)} />
                      {macro.label}
                    </span>
                    <span className="tabular-nums text-white/90">{macro.percent}%</span>
                  </div>
                  <div className="mt-1"><ProgressBar value={macro.percent} tone={macro.bar} /></div>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-4 border-t border-white/[0.06] pt-3 text-[11px] leading-4 text-white/60">520 total · 435 from macros · 85 kcal unattributed because the food database excerpt is incomplete.</p>
        </SolidCard>

        <CIAInsightCard provenance={['Ingredient macros']}>
          <p>
            Restrictions checked first. This <span className="text-emphasis">logger</span>{' '}entry is dairy-free and covers 29% of today&apos;s protein mission.
          </p>
        </CIAInsightCard>

        <SolidCard>
          <SectionTitle title="Ingredients" meta="2 shown · incomplete excerpt" />
          <div className="mt-3 flex items-start gap-2 rounded-lg bg-white/[0.03] p-2.5 text-[11px] text-white/60">
            <AlertTriangle size={14} strokeWidth={1.9} className="mt-[1px] shrink-0 text-brand-orange" />
            <span>Dairy allergy checked: the dressing is dairy-free. Contains gluten — flagged before logging.</span>
          </div>

          <div className="mt-2 divide-y divide-white/5">
            {ingredients.map(item => (
              <div key={item.name} className="flex min-h-11 items-center justify-between gap-3 py-2.5">
                <div className="min-w-0">
                  <p className="truncate text-[14px] text-white/90">{item.name}</p>
                  <p className="text-[11px] text-white/45">{item.portion}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="tabular-nums text-[12px] text-white/60">{item.calories} cal</span>
                  {item.verified ? (
                    <span className="flex items-center gap-1 rounded-pill bg-domain-fitness/15 px-2 py-0.5 text-[10px] text-domain-fitness">
                      <Check size={11} strokeWidth={2.4} /> Verified
                    </span>
                  ) : (
                    <span className="rounded-pill bg-white/5 px-2 py-0.5 text-[10px] text-white/50">Estimated</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </SolidCard>
        </>}

        {logger && <div>
          <div className="mb-3 flex items-center gap-2">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] uppercase tracking-wide text-white/30">Add to lunch</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <GlassPillInput label="Search foods or enter manually" placeholder="Search foods..." disabled={offline} />
          {offline && <GlassPillInput className="mt-2" label="Manual food entry" placeholder="Enter food manually" />}

          <div className="mt-2 flex gap-2">
            <button
              type="button"
              disabled={offline}
              onClick={() => setState('scanner-unavailable')}
              className="focus-ring flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] text-[13px] text-white/80 disabled:opacity-40"
            >
              <ScanBarcode size={16} strokeWidth={1.9} /> Barcode
            </button>
            <button
              type="button"
              disabled={offline}
              onClick={() => setState('scanner-unavailable')}
              className="focus-ring flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] text-[13px] text-white/80 disabled:opacity-40"
            >
              <ReceiptText size={16} strokeWidth={1.9} /> Receipt
            </button>
          </div>

          <div role="tablist" aria-label="Meal type" className="mt-4 flex gap-1 rounded-xl bg-white/[0.04] p-1">
            {MEAL_TYPES.map((meal, index) => (
              <button
                key={meal}
                type="button"
                role="tab"
                aria-selected={meal === mealType}
                tabIndex={meal === mealType ? 0 : -1}
                ref={node => { mealTabRefs.current[index] = node }}
                onClick={() => setMealType(meal)}
                onKeyDown={event => {
                  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
                  event.preventDefault()
                  const direction = event.key === 'ArrowRight' ? 1 : -1
                  const nextIndex = (index + direction + MEAL_TYPES.length) % MEAL_TYPES.length
                  setMealType(MEAL_TYPES[nextIndex])
                  mealTabRefs.current[nextIndex]?.focus()
                }}
                className={cx(
                  'flex min-h-11 flex-1 items-center justify-center rounded-lg text-[12px] font-medium',
                  meal === mealType ? 'bg-cta-ember text-paper-100 shadow-[var(--glow-orange-sm)]' : 'text-white/60',
                )}
              >
                {meal}
              </button>
            ))}
          </div>

          <div className="mt-4 space-y-2">
            <SectionTitle title="Recent foods" meta="Tap to add" />
            <div className="divide-y divide-white/5 rounded-2xl border border-white/10 bg-white/[0.03]">
              {recentFoods.map(food => (
                <div key={food.name} className="flex min-h-11 items-center justify-between gap-3 px-3">
                  <div className="min-w-0">
                    <p className="truncate text-[14px] text-white/90">{food.name}</p>
                    <p className="text-[11px] text-white/45">{food.detail}</p>
                  </div>
                  <IconButton label={`Add ${food.name}`} onClick={() => setState('success')}>
                    <Plus size={16} className="text-brand-orange" strokeWidth={2.2} />
                  </IconButton>
                </div>
              ))}
            </div>
          </div>

          {state === 'success' && <div role="status" className="mt-5 flex items-center justify-between rounded-2xl border border-forest-green/30 bg-forest-green/[0.06] p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-domain-fitness/20">
                <Check size={16} strokeWidth={2.2} className="text-domain-fitness" />
              </div>
              <div>
                <p className="text-[14px] font-medium text-white/95">Chicken breast added</p>
                <p className="text-[11px] text-white/50">4 oz · 180 cal · Queued offline</p>
              </div>
            </div>
            <BtnSuccess className="h-10 px-4 text-[13px]" onClick={() => setState('logger')}>Added</BtnSuccess>
          </div>}
        </div>}

        <ConsentRail compact controls={FULL_DATA_CONTROLS} />

        <div className="!mt-3 flex items-center justify-between text-[11px] text-white/40">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
            Offline: manual entry stays, scanners disabled
          </span>
          <button type="button" onClick={() => setState('media-consent')} className="focus-ring flex min-h-11 items-center gap-1 rounded-lg px-2">
            Source controls <ChevronRight size={13} strokeWidth={1.9} />
          </button>
        </div>
      </main>
    </HifiShell>
  )
}
