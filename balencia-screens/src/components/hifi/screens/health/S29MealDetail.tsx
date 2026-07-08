import { AlertTriangle, Check, ChevronRight, Pencil, Plus, ReceiptText, ScanBarcode, Utensils } from 'lucide-react'
import {
  BtnSuccess,
  Chip,
  CIAInsightCard,
  ConsentRail,
  cx,
  DonutHub,
  GlassCard,
  GlassPillInput,
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
  { name: 'Greek yogurt dressing', portion: '2 tbsp · portion estimated', calories: 80, verified: false },
]

const recentFoods = [
  { name: 'Raw almonds', detail: '1 oz · 160 cal · Food database' },
  { name: 'Granny smith apple', detail: '1 medium · 95 cal · Food database' },
]

export function S29MealDetail() {
  return (
    <HifiShell
      atmosphere="you"
      header={
        <TopBar
          title="Lunch"
          right={<IconButton label="Edit meal"><Pencil size={18} strokeWidth={1.9} /></IconButton>}
        />
      }
      showTabBar={false}
    >
      <main className="space-y-4 px-4 pb-10 pt-3">
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
              <Chip interactive tone="muted">Log photo</Chip>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Chip tone="muted">Dairy allergy</Chip>
            <Chip tone="muted">Gluten</Chip>
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

          <p className="mt-4 border-t border-white/[0.06] pt-3 text-[11px] text-white/45">435 from macros</p>
        </SolidCard>

        <CIAInsightCard provenance={['Ingredient macros']}>
          <p>
            Good balance. This <span className="text-emphasis">logger</span> entry covers 29% of today&apos;s protein mission.
          </p>
        </CIAInsightCard>

        <SolidCard>
          <SectionTitle title="Ingredients" meta="2 items" />
          <div className="mt-3 flex items-start gap-2 rounded-lg bg-white/[0.03] p-2.5 text-[11px] text-white/60">
            <AlertTriangle size={14} strokeWidth={1.9} className="mt-[1px] shrink-0 text-brand-orange" />
            <span>Contained gluten and dairy — flagged before logging.</span>
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

        <div>
          <div className="mb-3 flex items-center gap-2">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] uppercase tracking-wide text-white/30">Add to lunch</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <GlassPillInput placeholder="Search foods..." />

          <div className="mt-2 flex gap-2">
            <button
              type="button"
              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] text-[13px] text-white/80"
            >
              <ScanBarcode size={16} strokeWidth={1.9} /> Barcode
            </button>
            <button
              type="button"
              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] text-[13px] text-white/80"
            >
              <ReceiptText size={16} strokeWidth={1.9} /> Receipt
            </button>
          </div>

          <div role="tablist" aria-label="Meal type" className="mt-4 flex gap-1 rounded-xl bg-white/[0.04] p-1">
            {(['Breakfast', 'Lunch', 'Dinner', 'Snack'] as const).map(meal => (
              <button
                key={meal}
                type="button"
                role="tab"
                aria-selected={meal === 'Lunch'}
                className={cx(
                  'flex min-h-11 flex-1 items-center justify-center rounded-lg text-[12px] font-medium',
                  meal === 'Lunch' ? 'bg-brand-orange text-white shadow-[var(--glow-orange-sm)]' : 'text-white/60',
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
                  <IconButton label={`Add ${food.name}`}>
                    <Plus size={16} className="text-brand-orange" strokeWidth={2.2} />
                  </IconButton>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between rounded-2xl border border-domain-fitness/30 bg-domain-fitness/[0.06] p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-domain-fitness/20">
                <Check size={16} strokeWidth={2.2} className="text-domain-fitness" />
              </div>
              <div>
                <p className="text-[14px] font-medium text-white/95">Chicken breast added</p>
                <p className="text-[11px] text-white/50">4 oz · 180 cal · Queued offline</p>
              </div>
            </div>
            <BtnSuccess className="h-10 px-4 text-[13px]">Added</BtnSuccess>
          </div>
        </div>

        <ConsentRail compact />

        <div className="!mt-3 flex items-center justify-between text-[11px] text-white/40">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
            Offline: manual entry stays, scanners disabled
          </span>
          <button type="button" className="flex items-center gap-1">
            Source controls <ChevronRight size={13} strokeWidth={1.9} />
          </button>
        </div>
      </main>
    </HifiShell>
  )
}
